import assert from 'node:assert/strict';
import test from 'node:test';
import { Expedition } from '../src/rules.ts';
import type { ExpeditionEnvironment } from '../src/rules.ts';
import { WaterSimulation } from '../src/water.ts';

const still = { x: 0, z: 0 };

function world(): ExpeditionEnvironment & { water: number; levels: [number, number] } {
  return {
    water: 0,
    levels: [0, 0],
    depthAt() { return this.water; },
    terrainAt() { return 0; },
    surfaceAt() { return this.water; },
    basinLevels() { return this.levels; },
  };
}

test('a bite blocks construction until a full ten seconds on dry land', () => {
  const game = new Expedition();
  const env = world();
  env.water = 0.3;
  game.start();
  assert.equal(game.canBuild(), true);
  assert.equal(game.bite(), true);
  assert.equal(game.bite(), false);
  assert.equal(game.canBuild(), false);
  assert.equal(game.bites, 1);
  game.update(20, still, env);
  assert.equal(game.player.health, 'bitten');
  assert.equal(game.player.recovery, 10);
  env.water = 0;
  assert.deepEqual(game.update(0.05, still, env), ['recovery-start']);
  assert.equal(game.player.health, 'recovering');
  assert.equal(game.player.recovery, 10);
  game.update(9.95, still, env);
  assert.equal(game.player.health, 'recovering');
  assert.equal(game.canBuild(), false);
  const events = game.update(0.05, still, env);
  assert.equal(game.player.health, 'healthy');
  assert.equal(game.player.recovery, 0);
  assert.equal(game.canBuild(), true);
  assert.deepEqual(events, ['recovered']);
  assert.equal(game.bite(), false, 'recovery grants a grace period');
  game.update(12, still, env);
  assert.equal(game.bite(), true);
});

test('entering water during recovery resets the complete dry-land countdown', () => {
  const game = new Expedition();
  const env = world();
  game.start();
  game.bite();
  game.update(0.05, still, env);
  game.update(7, still, env);
  assert.ok(Math.abs(game.player.recovery - 3) < 0.0001);
  env.water = 0.2;
  assert.deepEqual(game.update(0.05, still, env), ['recovery-reset']);
  assert.equal(game.player.health, 'bitten');
  assert.equal(game.player.recovery, 10);
  env.water = 0;
  game.update(0.05, still, env);
  game.update(9.95, still, env);
  assert.equal(game.player.health, 'recovering');
  game.update(0.05, still, env);
  assert.equal(game.player.health, 'healthy');
});

test('ready and pause freeze movement, injury timers, snakes, and objective', () => {
  const game = new Expedition();
  const env = world();
  env.levels = [0.2, 0.2];
  game.update(5, { x: 1, z: 0 }, env);
  assert.equal(game.elapsed, 0);
  assert.equal(game.player.x, -4);
  game.start();
  game.bite();
  game.update(0.05, still, env);
  game.update(1, still, env);
  game.pause();
  const before = JSON.stringify({ player: game.player, snakes: game.snakes, elapsed: game.elapsed, hold: game.holdProgress });
  assert.deepEqual(game.update(30, { x: 1, z: 1 }, env), []);
  assert.equal(JSON.stringify({ player: game.player, snakes: game.snakes, elapsed: game.elapsed, hold: game.holdProgress }), before);
  assert.equal(game.canBuild(), false);
  game.resume();
  game.update(1, still, env);
  assert.ok(game.player.recovery < 9);
});

test('a nearby swimming player receives a warning before a physical snake bite', () => {
  const game = new Expedition();
  const env = world();
  env.water = 0.3;
  game.start();
  game.player.x = 0;
  game.player.z = 1;
  const beforeWarning = game.update(2.95, still, env);
  assert.equal(game.snakes[0].mood, 'calm');
  assert.equal(game.bites, 0);
  assert.equal(beforeWarning.includes('snake-alert'), false);
  assert.ok(game.update(0.05, still, env).includes('snake-alert'));
  assert.equal(game.snakes[0].mood, 'alert');
  game.update(1.95, still, env);
  assert.equal(game.snakes[0].mood, 'alert');
  assert.equal(game.bites, 0);
  const attackEvents = game.update(2, still, env);
  assert.ok(attackEvents.includes('snake-chase'));
  assert.ok(attackEvents.includes('bite'));
  assert.equal(game.bites, 1);
  assert.equal(game.player.health, 'bitten');
  assert.ok(Math.hypot(game.snakes[0].x - game.player.x, game.snakes[0].z - game.player.z) < 1.8);
});

test('snakes never attack a dry player or swim across a dry bank', () => {
  const game = new Expedition();
  const env = world();
  env.depthAt = (x) => Math.abs(x) < 0.5 ? 0.3 : 0;
  game.start();
  game.player.x = 0.55;
  game.player.z = 1;
  game.update(20, still, env);
  assert.equal(game.bites, 0);
  assert.equal(game.snakes[0].mood, 'calm');
  assert.ok(Math.abs(game.snakes[0].x) < 0.5);
});

test('both snakes spawn in water and patrol the actual creek', () => {
  const simulation = new WaterSimulation();
  const game = new Expedition();
  const env: ExpeditionEnvironment = {
    depthAt: (x, z) => simulation.depthAt(x, z),
    surfaceAt: (x, z) => simulation.surfaceAt(x, z),
    terrainAt: (x, z) => simulation.terrain[simulation.cellAt(x, z)],
    basinLevels: () => simulation.basinLevels(),
  };
  const initial = game.snakes.map(snake => ({ x: snake.x, z: snake.z }));
  for (const snake of game.snakes) assert.ok(env.depthAt(snake.x, snake.z) >= 0.025);
  game.start();
  for (let frame = 0; frame < 120; frame++) {
    simulation.update(1 / 60);
    game.update(1 / 60, still, env);
  }
  game.snakes.forEach((snake, index) => {
    assert.ok(Math.hypot(snake.x - initial[index].x, snake.z - initial[index].z) > 0.1);
    assert.ok(env.depthAt(snake.x, snake.z) >= 0.025);
  });

  const stranded = game.snakes[1];
  stranded.x = 1.4;
  stranded.z = 7;
  assert.equal(env.depthAt(stranded.x, stranded.z), 0);
  for (let frame = 0; frame < 240; frame++) {
    simulation.update(1 / 60);
    game.update(1 / 60, still, env);
  }
  assert.ok(env.depthAt(stranded.x, stranded.z) >= 0.025, 'A stranded snake crawls back into the real creek');
  assert.equal(game.bites, 0);
});

test('a stranded chasing snake calms down and cannot attack from dry ground', () => {
  const game = new Expedition();
  const env = world();
  env.depthAt = (x) => Math.abs(x) < 0.5 ? 0.3 : 0;
  game.start();
  const snake = game.snakes[0];
  snake.x = 0.8;
  snake.z = 1;
  snake.mood = 'chase';
  game.player.x = 0.4;
  game.player.z = 1;
  game.update(0.5, still, env);
  assert.ok(snake.x < 0.8, 'The snake should crawl toward nearby water');
  assert.equal(env.depthAt(snake.x, snake.z), 0, 'The snake is still on the dry bank');
  assert.equal(snake.mood, 'calm');
  assert.equal(game.bites, 0, 'Being within bite range is harmless while the snake is dry');
});

test('stranded snakes stay calm when no water refuge exists within three units', () => {
  const game = new Expedition();
  const env = world();
  game.start();
  const initial = game.snakes.map(snake => ({ x: snake.x, z: snake.z }));
  game.update(1, still, env);
  game.snakes.forEach((snake, index) => {
    assert.equal(snake.x, initial[index].x);
    assert.equal(snake.z, initial[index].z);
    assert.equal(snake.mood, 'calm');
  });
});

test('both ponds must hold the threshold continuously for twelve seconds', () => {
  const game = new Expedition();
  const env = world();
  game.start();
  env.levels = [0.13, 0.119];
  game.update(20, still, env);
  assert.equal(game.holdProgress, 0);
  env.levels = [0.12, 0.12];
  assert.deepEqual(game.update(6, still, env), ['pond-ready']);
  assert.ok(Math.abs(game.holdProgress - 6) < 0.0001);
  env.levels = [0.12, 0.11];
  assert.deepEqual(game.update(0.05, still, env), ['pond-lost']);
  assert.equal(game.holdProgress, 0);
  env.levels = [0.12, 0.12];
  game.update(11.95, still, env);
  assert.equal(game.phase, 'playing');
  assert.deepEqual(game.update(0.05, still, env), ['won']);
  assert.equal(game.phase, 'won');
  assert.equal(game.holdProgress, 12);
  assert.equal(game.canBuild(), false);
  game.continueSandbox();
  assert.equal(game.phase, 'sandbox');
  assert.equal(game.canBuild(), true);
  assert.deepEqual(game.update(20, still, env), []);
  game.pause();
  game.resume();
  assert.equal(game.phase, 'sandbox');
});

test('walking normalizes diagonals, slows in water, respects borders and high obstacles', () => {
  const game = new Expedition();
  const env = world();
  game.start();
  game.update(1, { x: 1, z: 1 }, env);
  assert.ok(Math.abs(Math.hypot(game.player.x + 4, game.player.z + 3) - 4.2) < 0.0001);
  const startX = game.player.x;
  env.water = 0.2;
  game.update(1, { x: 1, z: 0 }, env);
  assert.ok(Math.abs(game.player.x - startX - 2.55) < 0.0001);
  env.water = 0;
  game.player.x = 0;
  env.terrainAt = (x) => x > 0.5 ? 2 : 0;
  game.update(2, { x: 1, z: 0 }, env);
  assert.ok(game.player.x <= 0.5);
  env.terrainAt = () => 0;
  game.update(20, { x: 1, z: 1 }, env);
  assert.equal(game.player.x, 10);
  assert.equal(game.player.z, 12);
});
