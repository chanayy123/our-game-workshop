import test from 'node:test';
import assert from 'node:assert/strict';
import { createMap, PROP_RADIUS } from '../src/map.ts';
import { GameSimulation, blendScore, canOccupy, findPath, lineOfSight } from '../src/simulation.ts';
import { distance } from '../src/navigation.ts';
import type { Input, MapData, Vec } from '../src/types.ts';

const idle: Input = { x: 0, z: 0, sprint: false };
function run(sim: GameSimulation, seconds: number, input = idle) { for (let i = 0; i < Math.ceil(seconds * 10); i++) sim.update(.1, input); }
function arena(): MapData {
  return { props: [{ id: 0, kind: 'pot', x: -7, z: -7, angle: 0, zone: 'cafe', oddity: 0 }], walls: [], routes: [[{ x: 0, z: 4 }, { x: 0, z: -4 }, { x: 5, z: -4 }], [{ x: 3, z: 4 }, { x: 3, z: -4 }, { x: -5, z: -4 }]], spawn: { x: 0, z: 0 }, bounds: { x: 9, z: 9 } };
}
function search(sim: GameSimulation) { sim.start(); sim.beginSearch(); }

test('full lifecycle starts with preparation and resets every consumable', () => {
  const sim = new GameSimulation();
  assert.equal(sim.state.phase, 'intro'); assert.deepEqual(sim.state.cops.map(c => c.hp), [10, 10]);
  sim.start(); run(sim, 30.2); assert.equal(sim.state.phase, 'search');
  assert.ok(sim.smoke()); assert.equal(sim.state.player.smokeCharges, 1);
  sim.reset(); assert.equal(sim.state.phase, 'intro'); assert.equal(sim.state.player.smokeCharges, 2); assert.equal(sim.state.player.exposed, false); assert.equal(sim.state.round, 2);
  assert.equal(sim.state.events.length, 0); assert.deepEqual(sim.state.cops.map(c => c.hp), [10, 10]);
  sim.state.phase = 'lost'; sim.state.cops[0].hp = 2; sim.state.player.smokeCharges = 0;
  sim.start(); assert.equal(sim.state.phase, 'prepare'); assert.equal(sim.state.time, 30); assert.equal(sim.state.cops[0].hp, 10); assert.equal(sim.state.player.smokeCharges, 2);
});

test('movement, sprint stamina, nearby transforms and solid props use real footprints', () => {
  const map = arena(); map.spawn = { x: -7, z: -5.6 };
  const sim = new GameSimulation(map); sim.start();
  assert.equal(sim.nearestProp()?.id, 0); assert.ok(sim.transform()); assert.equal(sim.state.player.kind, 'pot');
  run(sim, 1, { x: 0, z: -1, sprint: false });
  assert.ok(distance(sim.state.player, map.props[0]) >= PROP_RADIUS.pot * 1.85 - .041);
  const before = sim.state.player.stamina; run(sim, 1, { x: 1, z: 0, sprint: true }); assert.ok(sim.state.player.stamina < before);
  assert.equal(sim.transform(0), false, 'far props cannot be copied');
  assert.ok(Math.abs(sim.state.player.x) < map.bounds.x);
});

test('LOS and pathfinding go around walls; no corners or props can be cut', () => {
  const map = arena(); map.walls = [{ x: 0, z: 0, w: 1, d: 8, h: 2, style: 'brick' }];
  const a = { x: -2, z: 0 }, b = { x: 2, z: 0 };
  assert.equal(lineOfSight(map, a, b), false);
  const path = findPath(map, a, b); assert.ok(path.length >= 2);
  let previous = a;
  for (const point of path) {
    const samples = Math.ceil(distance(previous, point) / .05);
    for (let i = 1; i <= samples; i++) assert.ok(canOccupy(map, { x: previous.x + (point.x - previous.x) * i / samples, z: previous.z + (point.z - previous.z) * i / samples }, .28));
    previous = point;
  }
  assert.ok(distance(previous, b) < .01);
});

test('all authored patrol waypoints are reachable without teleporting', () => {
  const map = createMap();
  for (const route of map.routes) for (let i = 0; i < route.length; i++) {
    const path = findPath(map, route[i], route[(i + 1) % route.length]);
    assert.ok(path.length, `unreachable route ${i}: ${JSON.stringify(route[i])}`);
    assert.ok(distance(path[path.length - 1], route[(i + 1) % route.length]) < .8);
  }
});

test('path planning rejects a near-tangent crate segment that would repeatedly stall a police officer', () => {
  const map = createMap();
  const start = { x: 7.755159233502238, z: -8.019949466262355 };
  const path = findPath(map, start, { x: 1, z: -9 });
  assert.ok(path.length > 0);
  let previous = start;
  for (const next of path) {
    const vx = next.x - previous.x, vz = next.z - previous.z, lengthSquared = vx * vx + vz * vz;
    for (const prop of map.props) {
      const t = Math.max(0, Math.min(1, ((prop.x - previous.x) * vx + (prop.z - previous.z) * vz) / Math.max(1e-12, lengthSquared)));
      const nearest = { x: previous.x + vx * t, z: previous.z + vz * t };
      assert.ok(distance(nearest, prop) >= .28 + PROP_RADIUS[prop.kind] - .04 - 1e-9, `path clips ${prop.id}/${prop.kind}`);
    }
    previous = next;
  }
});

test('all 55 authored objects have a reachable place to copy them with clear sight and valid footprint', () => {
  const map = createMap();
  assert.equal(map.props.length, 55);
  for (const prop of map.props) {
    let copyable = false;
    for (let i = 0; i < 32 && !copyable; i++) {
      const at = { x: prop.x + Math.sin(i * Math.PI / 16) * 1.8, z: prop.z + Math.cos(i * Math.PI / 16) * 1.8 };
      if (!canOccupy(map, at, .28) || !lineOfSight(map, at, prop)) continue;
      const path = findPath(map, map.spawn, at, .28);
      if (!path.length || distance(path[path.length - 1], at) > .1) continue;
      const sim = new GameSimulation(map); sim.start(); Object.assign(sim.state.player, at);
      copyable = sim.transform(prop.id);
      if (copyable) assert.ok(canOccupy(map, sim.state.player, PROP_RADIUS[prop.kind] * .85));
    }
    assert.ok(copyable, `unreachable or uncopyable ${prop.id}/${prop.kind}`);
  }
});

test('two officers independently lose exactly one HP when inspecting a suspicious ordinary object', () => {
  const map = arena(); map.spawn = { x: -7, z: -5.8 };
  map.props.push({ id: 1, kind: 'chair', x: 0, z: 0, angle: .5, zone: 'plaza', oddity: 1 });
  map.routes[1][0] = { x: 2, z: 3 };
  const sim = new GameSimulation(map); search(sim); sim.transform(0); run(sim, 12);
  assert.deepEqual(sim.state.cops.map(c => c.hp), [9, 9]);
  assert.equal(sim.state.stats.mistakes, 2); assert.equal(sim.state.player.exposed, false);
  assert.equal(sim.state.events.filter(event => event.type === 'wrong').length, 2);
  assert.ok(sim.state.cops.every(cop => cop.checked['1'] > sim.state.elapsed));
});

test('an exposed unhidden player is found, chased and captured through normal AI', () => {
  const sim = new GameSimulation(arena()); search(sim); run(sim, 14);
  assert.ok(sim.state.events.some(event => event.type === 'found'));
  assert.equal(sim.state.phase, 'lost'); assert.ok(sim.state.player.exposed);
  assert.ok(sim.state.cops.every(cop => cop.hp === 10), 'a correct identification never costs police HP');
});

test('a naturally placed stationary disguise can win a full round beside patrols', () => {
  const map = arena(); map.spawn = { x: -6, z: 6.1 };
  map.props = [{ id: 0, kind: 'crate', x: -6, z: 5, angle: 0, zone: 'cargo', oddity: 0 }];
  map.routes = [[{ x: -6, z: 8 }, { x: -3, z: 4 }, { x: -8, z: 3 }], [{ x: -3, z: 8 }, { x: -3, z: 2 }, { x: -8, z: 2 }]];
  const sim = new GameSimulation(map); sim.start(); assert.ok(sim.transform()); run(sim, 1); sim.beginSearch(); run(sim, 120.2);
  assert.equal(sim.state.phase, 'won'); assert.equal(sim.state.player.exposed, false);
  assert.ok(sim.state.stats.closeCalls > 0); assert.ok(sim.state.blend >= 75);
});

test('both police retiring yields a win; one retiring does not', () => {
  const sim = new GameSimulation(arena()); search(sim);
  sim.state.cops[0].hp = 0; run(sim, .1); assert.equal(sim.state.phase, 'search'); assert.equal(sim.state.cops[0].mode, 'retired');
  sim.state.cops[1].hp = 0; run(sim, .1); assert.equal(sim.state.phase, 'won');
});

test('the final false attack retires an officer, and both final mistakes end the round', () => {
  const map = arena(); map.spawn = { x: -7, z: -5.8 };
  map.props.push({ id: 1, kind: 'chair', x: 0, z: 0, angle: .5, zone: 'plaza', oddity: 1 });
  map.routes[1][0] = { x: 2, z: 3 };
  const sim = new GameSimulation(map); sim.start(); sim.transform(0); run(sim, 1); sim.beginSearch();
  for (const cop of sim.state.cops) cop.hp = 1;
  run(sim, 12);
  assert.equal(sim.state.phase, 'won'); assert.equal(sim.state.stats.mistakes, 2);
  assert.ok(sim.state.cops.every(cop => cop.hp === 0 && cop.mode === 'retired'));
});

test('police cannot discover or capture through a solid wall even at touching distance', () => {
  const map = arena(); map.spawn = { x: -.42, z: 0 };
  map.walls = [{ x: 0, z: 0, w: .2, d: 17.8, h: 2, style: 'brick' }];
  map.routes = [[{ x: .42, z: 0 }, { x: 2, z: 3 }], [{ x: 2, z: 0 }, { x: 2, z: -3 }]];
  const sim = new GameSimulation(map); search(sim); run(sim, 7);
  assert.equal(sim.state.player.exposed, false); assert.equal(sim.state.phase, 'search');
  sim.state.player.exposed = true; sim.state.cops[0].mode = 'chase'; sim.state.cops[0].lastSeen = { x: -.42, z: 0 };
  run(sim, 3); assert.equal(sim.state.phase, 'search');
});

test('smoke interrupts real pursuit and a still disguise can escape; charges and noise are bounded', () => {
  const map = arena(); map.spawn = { x: 0, z: 0 }; map.props = [{ id: 0, kind: 'crate', x: 1.1, z: 0, angle: 0, zone: 'plaza', oddity: 0 }];
  const sim = new GameSimulation(map); search(sim); assert.ok(sim.transform());
  for (let i = 0; i < 150 && !sim.state.player.exposed; i++) sim.update(.1, idle);
  assert.ok(sim.state.player.exposed); assert.ok(sim.smoke()); assert.equal(sim.smoke(), false);
  run(sim, 3.3); assert.equal(sim.state.player.exposed, false); assert.equal(sim.state.stats.escapes, 1);
  assert.ok(sim.distract({ x: 30, z: 30 })); assert.equal(sim.distract(), false); assert.ok(distance(sim.state.noise!, sim.state.player) <= 8.01);
});

test('contextual blend rewards a plausible cluster over blocking a central walkway', () => {
  const map = createMap();
  const good = blendScore(map, { x: -11.5, z: 3, kind: 'crate', angle: 0, moving: false, stillTime: 2 });
  const bad = blendScore(map, { x: 0, z: 3, kind: 'crate', angle: .4, moving: false, stillTime: 2 });
  assert.ok(good.score > bad.score + 35);
});

test('an officer remembers witnessed movement after a disguise stops in a plausible place', () => {
  const map = arena(); map.spawn = { x: -6, z: 6.1 };
  map.props = [{ id: 0, kind: 'crate', x: -6, z: 5, angle: .3, zone: 'cargo', oddity: 0 }];
  map.routes = [[{ x: -6, z: 8 }, { x: -3, z: 4 }], [{ x: -3, z: 8 }, { x: -3, z: 2 }]];
  const sim = new GameSimulation(map); sim.start(); assert.ok(sim.transform()); sim.rotate();
  assert.ok(Math.abs(Math.sin(sim.state.player.angle * 2)) < .01, 'Q straightens odd copied angles');
  run(sim, 1); sim.beginSearch(); run(sim, .4, { x: .5, z: 0, sprint: false }); run(sim, 8);
  assert.ok(sim.state.events.some(event => event.type === 'found'), 'stopping does not erase observed motion');
});

test('scheduled magic hiccups are audible locally and do not reveal through-wall or distant targets', () => {
  const map = arena(); map.bounds = { x: 20, z: 20 }; map.spawn = { x: 0, z: 0 };
  map.walls = [{ x: 2, z: 0, w: .3, d: 39.5, h: 2, style: 'brick' }];
  map.routes = [[{ x: 6, z: 0 }, { x: 7, z: 1 }, { x: 6, z: -1 }], [{ x: 16, z: 0 }, { x: 17, z: 1 }, { x: 16, z: -1 }]];
  const sim = new GameSimulation(map); search(sim); sim.state.player.kind = 'crate';
  run(sim, 34.9); assert.equal(sim.state.events.filter(event => event.type === 'noise').length, 0);
  run(sim, .3); assert.equal(sim.state.events.filter(event => event.type === 'noise').length, 1);
  assert.equal(sim.state.cops[0].mode, 'investigate'); assert.notEqual(sim.state.cops[1].mode, 'investigate');
  assert.equal(sim.state.player.exposed, false); assert.equal(sim.state.cops[0].targetId, null, 'sound is a location cue, not identification');
  run(sim, 40); run(sim, 30);
  assert.equal(sim.state.events.filter(event => event.type === 'noise').length, 3);
  assert.equal(sim.state.player.exposed, false);
});

test('an out-of-vision sound cue does not track the hidden player: identical cues give identical police paths', () => {
  const map = arena(); map.spawn = { x: -6, z: 0 };
  map.walls = [{ x: 0, z: 0, w: .4, d: 17.5, h: 2, style: 'brick' }];
  map.routes = [[{ x: 6, z: 0 }, { x: 6, z: 3 }], [{ x: 7, z: 1 }, { x: 7, z: -3 }]];
  const a = new GameSimulation(map), b = new GameSimulation(map);
  search(a); search(b); a.distract({ x: 2, z: 0 }); b.distract({ x: 2, z: 0 });
  b.state.player.z = -4; // Remains behind the same opaque wall, away from the sound.
  run(a, 4); run(b, 4);
  assert.deepEqual(a.state.cops.map(c => [c.x, c.z, c.mode]), b.state.cops.map(c => [c.x, c.z, c.mode]));
  for (const sim of [a, b]) {
    assert.equal(sim.state.player.exposed, false);
    assert.ok(sim.state.cops.every(cop => cop.targetId === null && cop.lastSeen === null && cop.memory['-1'] === undefined));
  }
});

test('production map AI searches continuously; finite values and bounded events persist', () => {
  const sim = new GameSimulation(); search(sim);
  sim.state.player.x = 12.4; sim.state.player.z = -8.4; sim.state.player.kind = 'pot'; sim.state.player.stillTime = 4;
  const starts: Vec[] = sim.state.cops.map(cop => ({ x: cop.x, z: cop.z }));
  const visited = [new Set<string>(), new Set<string>()];
  for (let i = 0; i < 1200 && sim.state.phase === 'search'; i++) {
    sim.update(.1, idle);
    sim.state.cops.forEach((cop, index) => { assert.ok(Number.isFinite(cop.x + cop.z + cop.suspicion)); visited[index].add(`${Math.round(cop.x)},${Math.round(cop.z)}`); });
  }
  assert.ok(visited.every(cells => cells.size >= 20), `search stalled: ${visited.map(cells => cells.size)}`);
  assert.ok(sim.state.stats.mistakes > 0); assert.ok(sim.state.events.length <= 40);
  assert.equal(sim.state.phase, 'won');
  assert.ok(sim.state.cops.some((cop, index) => distance(cop, starts[index]) > 3));
});
