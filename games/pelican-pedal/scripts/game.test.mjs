import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';

// The model has no browser dependencies. Compile in memory for Node's test runner.
const source = readFileSync(new URL('../src/game.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
const { BicycleGame, STAGES } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`);

function advance(game, seconds, step = 1 / 60) {
  for (let elapsed = 0; elapsed < seconds - 1e-9; elapsed += step) game.update(Math.min(step, seconds - elapsed));
}

function fixture(entities) {
  const events = [];
  const game = new BicycleGame(event => events.push(event));
  game.start();
  game.state.entities = entities.map((entity, id) => ({ active: true, id, lane: 0, ...entity }));
  return { game, events };
}

test('ready, paused, and finished states reject gameplay actions; pausing freezes timers', () => {
  const game = new BicycleGame();
  const ready = structuredClone(game.state);
  game.steer(1); game.jump(); game.boost(); game.update(1);
  assert.deepEqual(game.state, ready);
  game.start(); game.jump();
  game.state.boostCharge = 100; game.boost();
  advance(game, 0.1); game.pause();
  const paused = structuredClone(game.state);
  game.steer(1); game.jump(); game.boost(); game.update(4); game.start();
  assert.deepEqual(game.state, paused);
  game.togglePause(); advance(game, 0.1);
  assert.ok(game.state.distance > paused.distance);
  assert.ok(game.state.boostRemaining < paused.boostRemaining);
});

test('collecting fish builds score, x4 streak, and a finite reusable boost', () => {
  const { game, events } = fixture(Array.from({ length: 16 }, (_, i) => ({ kind: 'fish', distance: i + 1 })));
  advance(game, 2);
  assert.equal(game.state.fish, 16);
  assert.equal(game.state.combo, 16);
  assert.equal(game.state.multiplier, 4);
  assert.equal(game.state.boostCharge, 100);
  assert.ok(game.state.score > 1600);
  const baseSpeed = game.state.speed;
  game.boost(); game.boost();
  assert.equal(events.filter(event => event.type === 'boost').length, 1);
  assert.equal(game.state.boostCharge, 0);
  assert.equal(game.state.speed, baseSpeed * 1.5);
  advance(game, 4.1);
  assert.equal(game.state.boostRemaining, 0);
  assert.equal(game.state.speed, baseSpeed);
});

test('jump clears low logs and awards skill points; cones require steering', () => {
  const log = fixture([{ kind: 'log', distance: 4 }]);
  log.game.jump(); advance(log.game, 0.5);
  assert.equal(log.game.state.lives, 3);
  assert.ok(log.events.some(event => event.type === 'nearMiss'));
  const cone = fixture([{ kind: 'cone', distance: 4 }]);
  cone.game.jump(); advance(cone.game, 0.5);
  assert.equal(cone.game.state.lives, 2);
  cone.game.jump();
  assert.equal(cone.events.filter(event => event.type === 'jump').length, 1);
  advance(cone.game, 0.7); cone.game.jump();
  assert.equal(cone.events.filter(event => event.type === 'jump').length, 2);
});

test('collisions use the actual continuous lane position, not the requested lane', () => {
  const tooLate = fixture([{ kind: 'cone', distance: 0.09 }]);
  tooLate.game.steer(1); advance(tooLate.game, 0.02);
  assert.equal(tooLate.game.state.lane, 1);
  assert.equal(tooLate.game.state.lives, 2, 'late lane input cannot teleport through an obstacle');
  const inTime = fixture([{ kind: 'cone', distance: 3 }]);
  inTime.game.steer(1); advance(inTime.game, 0.4);
  assert.equal(inTime.game.state.lives, 3);
});

test('shield absorbs one hit, immunity prevents rapid double damage, and three hits lose', () => {
  const { game, events } = fixture([
    { kind: 'shell', distance: 1 }, { kind: 'cone', distance: 2 },
    { kind: 'cone', distance: 3 }, { kind: 'cone', distance: 23 },
    { kind: 'cone', distance: 43 }, { kind: 'cone', distance: 63 },
  ]);
  advance(game, 0.5);
  assert.equal(game.state.shield, false);
  assert.equal(game.state.lives, 3);
  assert.equal(events.find(event => event.type === 'hit').value, 0);
  advance(game, 8);
  assert.equal(game.state.lives, 0);
  assert.equal(game.state.phase, 'lost');
  assert.equal(events.filter(event => event.type === 'lose').length, 1);
  const lost = structuredClone(game.state);
  game.steer(-1); game.jump(); game.boost(); game.togglePause(); advance(game, 3);
  assert.deepEqual(game.state, lost);
});

test('completing the route advances all chapters and wins exactly once', () => {
  const { game, events } = fixture([]);
  advance(game, 95);
  assert.equal(game.state.phase, 'won');
  assert.equal(game.state.distance, 900);
  assert.equal(game.state.stage, 2);
  assert.deepEqual(events.filter(event => event.type === 'stage').map(event => event.value), [1, 2]);
  assert.equal(events.filter(event => event.type === 'win').length, 1);
  assert.equal(game.state.score, 900 + game.state.finishBonus);
  assert.ok(game.state.finishBonus > 1750, 'quick finish adds a time reward');
  assert.equal(game.state.medal, 'bronze');
  assert.ok(game.state.elapsed > 87 && game.state.elapsed < 90);
  const won = structuredClone(game.state);
  advance(game, 4); game.jump(); game.boost(); game.steer(1);
  assert.deepEqual(game.state, won);
  assert.deepEqual(STAGES.map(stage => stage.name), ['Palm promenade', 'Driftwood bay', 'Lighthouse climb']);
});

test('generated route is reproducible, readable at boost speed, and always has a safe lane', () => {
  const route = new BicycleGame().state.entities;
  assert.deepEqual(route, new BicycleGame().state.entities);
  const rows = new Map();
  for (const entity of route) {
    assert.ok(entity.distance > 0 && entity.distance < 900);
    assert.ok([-1, 0, 1].includes(entity.lane));
    if (entity.kind === 'cone' || entity.kind === 'log') {
      if (!rows.has(entity.distance)) rows.set(entity.distance, []);
      rows.get(entity.distance).push(entity);
    }
  }
  let previousDistance = -100;
  for (const [distance, hazards] of rows) {
    assert.ok(distance - previousDistance >= 32, 'late hazard rows leave at least 1.87 seconds at full boost');
    assert.ok(new Set(hazards.map(entity => entity.lane)).size <= 2);
    const approachFish = route.find(entity => entity.kind === 'fish' && entity.distance === distance - 12);
    assert.ok(approachFish);
    assert.ok(hazards.every(hazard => hazard.lane !== approachFish.lane), 'fish line leads into an open lane');
    previousDistance = distance;
  }
  // Follow the advertised fish route for the entire course, including boosting.
  const game = new BicycleGame(); game.start();
  for (let step = 0; step < 60 * 100 && game.state.phase === 'running'; step++) {
    const nextFish = game.state.entities.find(entity => entity.active && entity.kind === 'fish');
    if (nextFish && nextFish.lane !== game.state.lane) game.steer(nextFish.lane > game.state.lane ? 1 : -1);
    if (game.state.boostCharge === 100) game.boost();
    game.update(1 / 60);
  }
  assert.equal(game.state.phase, 'won');
  assert.equal(game.state.lives, 3);
  assert.equal(game.state.fish, route.filter(entity => entity.kind === 'fish').length, 'every ordinary fish is reachable on the safe route');
  assert.equal(game.state.pearls, 0, 'safe completion never requires a jump');
  assert.equal(game.state.hits, 0);
});

test('restart resets every mutable mechanic and restores the original course', () => {
  const game = new BicycleGame();
  const reference = game.state;
  game.start(); game.steer(1); game.jump(); game.state.boostCharge = 100; game.boost();
  advance(game, 3); game.pause(); game.restart();
  const fresh = new BicycleGame(); fresh.start();
  assert.equal(game.state, reference);
  assert.deepEqual(game.state, fresh.state);
  // Crossing the first pickup verifies the internal route cursor was reset too.
  advance(game, 1.5);
  assert.equal(game.state.fish, 1);
});

test('the authored course requires play and reaches a loss without steering', () => {
  const game = new BicycleGame(); game.start();
  advance(game, 100);
  assert.equal(game.state.phase, 'lost');
  assert.equal(game.state.lives, 0);
  assert.ok(game.state.distance < game.state.totalDistance);
});

test('normal and low frame rates produce equivalent pickup and obstacle outcomes', () => {
  const course = [
    { kind: 'fish', distance: 1 }, { kind: 'fish', distance: 2 },
    { kind: 'cone', distance: 4 }, { kind: 'cone', distance: 5 },
    { kind: 'shell', distance: 8 }, { kind: 'cone', distance: 23 },
  ];
  const fast = fixture(course);
  const slow = fixture(course);
  advance(fast.game, 3, 1 / 120);
  advance(slow.game, 3, 1 / 15);
  assert.equal(fast.game.state.fish, slow.game.state.fish);
  assert.equal(fast.game.state.score, slow.game.state.score);
  assert.equal(fast.game.state.lives, slow.game.state.lives);
  assert.equal(fast.game.state.shield, slow.game.state.shield);
  assert.deepEqual(fast.events, slow.events);
  assert.ok(Math.abs(fast.game.state.distance - slow.game.state.distance) < 1e-9);
});

test('invalid or suspended frame times cannot skip the course or create invalid state', () => {
  const game = new BicycleGame(); game.start();
  game.update(NaN); game.update(Infinity); game.update(-1);
  assert.equal(game.state.distance, 0);
  game.update(60);
  assert.ok(Math.abs(game.state.distance - 2.25) < 1e-9);
});

test('sky pearls demand a real airborne crossing, and share a clearable log with a safe alternative', () => {
  const pair = [{ kind: 'log', distance: 4 }, { kind: 'pearl', distance: 4, height: 2.25 }];
  const grounded = fixture(pair); advance(grounded.game, .5);
  assert.equal(grounded.game.state.pearls, 0);
  assert.equal(grounded.game.state.lives, 2);
  const airborne = fixture(pair); airborne.game.jump(); advance(airborne.game, .5);
  assert.equal(airborne.game.state.pearls, 1);
  assert.equal(airborne.game.state.jumpsCleared, 1);
  assert.equal(airborne.game.state.lives, 3);
  assert.ok(airborne.events.some(event => event.type === 'pearl' && event.value === 350));
  const route = new BicycleGame().state.entities;
  const pearls = route.filter(entity => entity.kind === 'pearl');
  assert.ok(pearls.length >= 10);
  for (const pearl of pearls) {
    assert.equal(pearl.height, 2.25);
    assert.ok(route.some(entity => entity.kind === 'log' && entity.distance === pearl.distance && entity.lane === pearl.lane));
    const hazards = route.filter(entity => ['log', 'cone'].includes(entity.kind) && entity.distance === pearl.distance);
    assert.ok([-1, 0, 1].some(lane => hazards.every(entity => entity.lane !== lane)));
  }
  assert.equal(route.filter(entity => ['log', 'pearl'].includes(entity.kind) && entity.distance < 75).length, 0, 'opening first teaches steering');
});

test('boost doubles the awarded pickup and trick points, and is counted only once per activation', () => {
  const pair = [{ kind: 'log', distance: 4 }, { kind: 'pearl', distance: 4 }, { kind: 'fish', distance: 5 }];
  const normal = fixture(pair), boosted = fixture(pair);
  normal.game.jump(); boosted.game.state.boostCharge = 100; boosted.game.boost(); boosted.game.boost(); boosted.game.jump();
  advance(normal.game, .7); advance(boosted.game, .7);
  const points = result => result.events.filter(event => ['fish', 'pearl', 'nearMiss'].includes(event.type)).map(event => event.value);
  assert.deepEqual(points(boosted), points(normal).map(value => value * 2));
  assert.equal(boosted.game.state.boostCount, 1);
});

test('a six-second flow window expires once, remembers the best chain, and freezes when paused', () => {
  const { game, events } = fixture([{ kind: 'fish', distance: 1 }, { kind: 'fish', distance: 2 }]);
  advance(game, .3);
  assert.equal(game.state.combo, 2);
  assert.equal(game.state.maxCombo, 2);
  game.pause(); const timer = game.state.comboRemaining; advance(game, 8);
  assert.equal(game.state.comboRemaining, timer);
  game.togglePause(); advance(game, 6.2);
  assert.equal(game.state.combo, 0);
  assert.equal(game.state.multiplier, 1);
  assert.equal(game.state.maxCombo, 2);
  assert.equal(events.filter(event => event.type === 'comboLost').length, 1);
});

test('a late jump press buffers one hop, early presses cannot create automatic jumping', () => {
  const early = fixture([]); early.game.jump(); advance(early.game, .3); early.game.jump(); advance(early.game, 1.5);
  assert.equal(early.events.filter(event => event.type === 'jump').length, 1);
  assert.equal(early.events.filter(event => event.type === 'land').length, 1);
  const late = fixture([]); late.game.jump(); advance(late.game, .8); late.game.jump(); advance(late.game, .3);
  assert.equal(late.events.filter(event => event.type === 'jump').length, 2);
  assert.ok(late.game.state.jumpHeight > 0);
  advance(late.game, 2);
  assert.equal(late.events.filter(event => event.type === 'jump').length, 2);
  assert.equal(late.events.filter(event => event.type === 'land').length, 2);
});

test('combo expiry follows the actual pickup crossing time and listeners see its committed state', () => {
  function deadlineCase(distance) {
    let lostSnapshot;
    const game = new BicycleGame(event => {
      if (event.type === 'comboLost') lostSnapshot = { value: event.value, combo: game.state.combo, multiplier: game.state.multiplier, remaining: game.state.comboRemaining };
    });
    game.start();
    game.state.combo = 5; game.state.maxCombo = 5; game.state.multiplier = 2; game.state.comboRemaining = .001;
    game.state.entities = [{ id: 0, kind: 'fish', distance, lane: 0, active: true }];
    game.update(1 / 120);
    return { game, lostSnapshot };
  }
  const inTime = deadlineCase(.004); // 0.44 ms into a step whose expiry is 1 ms.
  assert.equal(inTime.game.state.combo, 6);
  assert.equal(inTime.game.state.score, 200);
  assert.equal(inTime.lostSnapshot, undefined);
  const late = deadlineCase(.03);
  assert.equal(late.game.state.combo, 1);
  assert.equal(late.game.state.score, 100);
  assert.deepEqual(late.lostSnapshot, { value: 5, combo: 0, multiplier: 1, remaining: 0 });
});

test('braking responds immediately by sacrificing active boost, and pause releases it', () => {
  const { game } = fixture([]);
  game.setBraking(true); assert.equal(game.state.braking, true); assert.equal(game.state.speed, 9 * .65);
  advance(game, 1); assert.ok(Math.abs(game.state.distance - 9 * .65) < 1e-9);
  game.state.boostCharge = 100; game.boost();
  assert.equal(game.state.braking, false); assert.equal(game.state.speed, 13.5);
  advance(game, .2); game.setBraking(true);
  assert.equal(game.state.braking, true); assert.equal(game.state.speed, 9 * .65);
  assert.equal(game.state.boostRemaining, 0, 'remaining tailwind is spent, not banked');
  assert.equal(game.state.boostCharge, 0);
  game.setBraking(false); advance(game, .2); assert.equal(game.state.speed, 9);
  game.setBraking(true); game.pause();
  assert.equal(game.state.braking, false); game.togglePause(); assert.equal(game.state.speed, 9);
});

test('a damaging hit slows the rider briefly, while an absorbed hit preserves flow and pace', () => {
  const damaged = fixture([{ kind: 'cone', distance: 1 }]); advance(damaged.game, .13);
  assert.equal(damaged.game.state.hits, 1);
  assert.ok(damaged.game.state.speed < 6);
  assert.ok(damaged.game.state.hitSlowdown > 0);
  advance(damaged.game, .8); assert.equal(damaged.game.state.speed, 9);
  const shielded = fixture([{ kind: 'fish', distance: .2 }, { kind: 'shell', distance: .4 }, { kind: 'cone', distance: 1 }]);
  advance(shielded.game, .3);
  assert.equal(shielded.game.state.hits, 0); assert.equal(shielded.game.state.combo, 1); assert.equal(shielded.game.state.speed, 9);
});

function rideCourse({ takePearls = false, useBoost = true, step = 1 / 60 } = {}) {
  const events = [];
  const game = new BicycleGame(event => events.push(event)); game.start();
  for (let frame = 0; frame < 130 / step && game.state.phase === 'running'; frame++) {
    if (useBoost && game.state.boostCharge >= 100) game.boost();
    const nextFish = game.state.entities.find(entity => entity.active && entity.kind === 'fish');
    const pearl = game.state.entities.find(entity => entity.active && entity.kind === 'pearl');
    const approachPearl = takePearls && pearl && pearl.distance - game.state.distance <= 11;
    const target = approachPearl ? pearl : nextFish;
    if (target && target.lane !== game.state.lane) game.steer(target.lane > game.state.lane ? 1 : -1);
    if (approachPearl && pearl.distance - game.state.distance <= game.state.speed * .45 && game.state.jumpCooldown === 0) game.jump();
    game.update(step);
  }
  return { game, events };
}

test('both the safe line and every optional pearl are achievable; choosing risk earns a gold medal', () => {
  const safe = rideCourse(), skill = rideCourse({ takePearls: true });
  for (const result of [safe, skill]) {
    assert.equal(result.game.state.phase, 'won');
    assert.equal(result.game.state.lives, 3);
    assert.equal(result.game.state.hits, 0);
    assert.equal(result.events.filter(event => event.type === 'comboLost').length, 0, 'the authored cadence preserves a skilled flow chain');
  }
  const expectedPearls = skill.game.state.entities.filter(entity => entity.kind === 'pearl').length;
  assert.equal(skill.game.state.pearls, expectedPearls);
  assert.equal(skill.game.state.jumpsCleared, expectedPearls);
  assert.equal(skill.game.state.fish, safe.game.state.fish, 'the air path can rejoin all ordinary fish');
  assert.equal(skill.game.state.medal, 'gold');
  assert.equal(safe.game.state.medal, 'silver', 'gold asks for a deliberate aerial challenge');
  assert.ok(skill.game.state.score > safe.game.state.score * 1.3, 'mastering the air path pays substantially more');
});

test('boosting rewards completion time and the unboosted safe route keeps its flow chain', () => {
  const relaxed = rideCourse({ useBoost: false }), fast = rideCourse();
  assert.equal(relaxed.game.state.phase, 'won');
  assert.equal(relaxed.game.state.lives, 3);
  assert.equal(relaxed.events.filter(event => event.type === 'comboLost').length, 0);
  assert.ok(fast.game.state.elapsed < relaxed.game.state.elapsed);
  assert.ok(fast.game.state.finishBonus > relaxed.game.state.finishBonus);
  assert.ok(fast.game.state.score > relaxed.game.state.score);
});

test('air-path play remains fair at low frame rates and repeated restarts have no lingering state', () => {
  const result = rideCourse({ takePearls: true, step: 1 / 15 });
  assert.equal(result.game.state.phase, 'won'); assert.equal(result.game.state.lives, 3); assert.equal(result.game.state.medal, 'gold');
  assert.equal(result.game.state.pearls, result.game.state.entities.filter(entity => entity.kind === 'pearl').length);
  for (let run = 0; run < 20; run++) {
    result.game.restart();
    result.game.jump(); advance(result.game, .8); result.game.jump();
    result.game.setBraking(true); result.game.state.boostCharge = 100; result.game.boost();
    result.game.restart();
    const reference = new BicycleGame(); reference.start();
    assert.deepEqual(result.game.state, reference.state);
    advance(result.game, 1.5);
    assert.equal(result.game.state.fish, 1);
    assert.equal(result.game.state.jumpHeight, 0);
  }
});
