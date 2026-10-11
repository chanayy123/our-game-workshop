import test from 'node:test';
import assert from 'node:assert/strict';
import { GameSimulation, canOccupy, lineOfSight } from '../src/simulation.ts';
import { distance } from '../src/navigation.ts';
import { PROP_RADIUS } from '../src/map.ts';

const idle = { x: 0, z: 0, sprint: false };
const advance = (sim: GameSimulation, seconds: number) => { for (let t = 0; t < seconds; t += .05) sim.update(.05, idle); };
test('both roles can be selected again on every round', () => {
  const sim = new GameSimulation(); sim.start('police'); assert.equal(sim.state.role, 'police'); assert.equal(sim.state.time, 5);
  assert.ok(sim.state.player.kind); assert.ok(canOccupy(sim.map, sim.state.player, PROP_RADIUS[sim.state.player.kind!] * .85));
  sim.start('hider'); assert.equal(sim.state.role, 'hider'); assert.equal(sim.state.time, 30); assert.equal(sim.state.player.kind, null);
  sim.start('police'); assert.equal(sim.state.role, 'police'); assert.deepEqual(sim.state.cops.map(c => c.hp), [10, 10]);
});
test('police input moves the officer without remotely moving the hidden opponent', () => {
  const sim = new GameSimulation(); sim.start('police'); const hidden = { ...sim.state.player }, cop = { ...sim.state.cops[0] };
  for (let i = 0; i < 10; i++) sim.update(.05, { x: -1, z: 0, sprint: true });
  assert.ok(distance(cop, sim.state.cops[0]) > 1); assert.equal(sim.state.player.x, hidden.x); assert.equal(sim.state.player.z, hidden.z);
  assert.ok(sim.state.police.stamina < 100); assert.equal(sim.transform(), false); assert.equal(sim.smoke(), false); assert.equal(sim.distract(), false);
});
test('free observation never reveals the identity or costs life; wrong attacks cost only the human officer', () => {
  const sim = new GameSimulation(); sim.start('police'); sim.beginSearch();
  const prop = sim.map.props[0]; Object.assign(sim.state.cops[0], { x: prop.x, z: prop.z + 1.5 });
  assert.ok(sim.inspectTarget(prop.id)); assert.equal(sim.state.cops[0].hp, 10); assert.equal(sim.state.player.exposed, false);
  assert.ok(sim.attack(prop.id)); assert.deepEqual(sim.state.cops.map(c => c.hp), [9, 10]);
  assert.equal(sim.attack(prop.id), false, 'cooldown prevents multiple attacks in one frame');
});
test('police attacks cannot find or hurt a target through a wall or from across the map', () => {
  const sim = new GameSimulation(); sim.start('police'); sim.beginSearch();
  Object.assign(sim.state.cops[0], { x: -8, z: .4 }); Object.assign(sim.state.player, { x: -8, z: 2.3, kind: 'pot' });
  assert.equal(lineOfSight(sim.map, sim.state.cops[0], sim.state.player), false); assert.equal(sim.attack(-1), false);
  assert.equal(sim.attack(0), false); assert.equal(sim.state.cops[0].hp, 10); assert.equal(sim.state.player.exposed, false);
});
test('ten actual wrong attacks lose the police round; timeout is also a police loss', () => {
  const sim = new GameSimulation(); sim.start('police'); sim.beginSearch(); const prop = sim.map.props[0];
  for (let i = 0; i < 10; i++) { Object.assign(sim.state.cops[0], { x: prop.x, z: prop.z + 1.5 }); sim.state.police.attackCooldown = 0; assert.ok(sim.attack(prop.id)); }
  assert.equal(sim.state.phase, 'lost'); assert.equal(sim.state.cops[0].hp, 0); assert.equal(sim.state.stats.mistakes, 10);
  sim.start('police'); sim.beginSearch(); advance(sim, 120.1); assert.equal(sim.state.phase, 'lost'); assert.equal(sim.state.time, 0);
});
test('human can discover, chase and actually capture the AI opponent', () => {
  const sim = new GameSimulation(); sim.start('police'); sim.beginSearch();
  Object.assign(sim.state.player, { x: 1, z: 5, kind: 'pot', smokeCharges: 0 }); Object.assign(sim.state.cops[0], { x: 1, z: 6.5 });
  assert.ok(sim.attack(-1)); assert.equal(sim.state.player.exposed, true); assert.equal(sim.state.cops[0].hp, 10);
  assert.ok(sim.whistle()); assert.equal(sim.whistle(), false);
  for (let i = 0; i < 600 && sim.state.phase === 'search'; i++) {
    const cop = sim.state.cops[0], p = sim.state.player, d = Math.max(.001, distance(cop, p));
    sim.update(.05, { x: (p.x - cop.x) / d, z: (p.z - cop.z) / d, sprint: true });
  }
  assert.equal(sim.state.phase, 'won'); assert.match(sim.state.result, /抓住/);
});
