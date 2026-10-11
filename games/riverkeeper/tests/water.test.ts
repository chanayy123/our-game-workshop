import test from 'node:test';
import assert from 'node:assert/strict';
import { WaterSimulation } from '../src/water.ts';

function advance(simulation: WaterSimulation, seconds: number): void {
  for (let i = 0; i < seconds * 30; i++) simulation.update(1 / 30);
}

function dam(simulation: WaterSimulation): void {
  for (const x of [-0.55, 0.55]) assert.equal(simulation.edit(simulation.cellAt(x, 0), 'rock'), true);
}

function openBranches(simulation: WaterSimulation): void {
  for (const x of [-1.65, 1.65]) {
    for (let dig = 0; dig < 2; dig++) assert.equal(simulation.edit(simulation.cellAt(x, -2.2), 'dig'), true);
  }
}

test('unmodified creek flows downstream while both objective hollows stay dry', () => {
  const simulation = new WaterSimulation();
  advance(simulation, 90);
  assert.ok(simulation.depthAt(0, -3) > 0.10);
  assert.ok(simulation.depthAt(0, 5) > 0.08);
  assert.ok(simulation.flowZ[simulation.cellAt(0, 5)] > 0);
  assert.deepEqual(simulation.basinLevels(), [0, 0]);
});

test('a real dam impounds upstream water and starves the downstream creek', () => {
  const simulation = new WaterSimulation();
  const upstreamBefore = simulation.depthAt(0, -1.1);
  dam(simulation);
  advance(simulation, 35);
  assert.ok(simulation.depthAt(0, -1.1) > upstreamBefore + 0.23);
  assert.ok(simulation.depthAt(0, 2.2) < 0.005);
});

test('digging both mud entrances sends actual water into both objective hollows', () => {
  const simulation = new WaterSimulation();
  dam(simulation);
  openBranches(simulation);
  advance(simulation, 42);
  const levels = simulation.basinLevels();
  assert.ok(levels.every(level => level > 0.24), `Expected both basins filled, got ${levels}`);
  assert.ok(Math.abs(levels[0] - levels[1]) < 0.025, 'The symmetric fork should share incoming water');
  assert.ok(simulation.depthAt(-4.4, 2.2) > 0.02, 'Water must travel the left channel');
  assert.ok(simulation.depthAt(4.4, 2.2) > 0.02, 'Water must travel the right channel');
});

test('removing a dam restores the original bed and releases stored water downstream', () => {
  const simulation = new WaterSimulation();
  dam(simulation);
  advance(simulation, 30);
  const retained = simulation.depthAt(0, -1.1);
  for (const x of [-0.55, 0.55]) simulation.edit(simulation.cellAt(x, 0), 'remove');
  advance(simulation, 12);
  assert.ok(simulation.depthAt(0, 2.2) > 0.10);
  assert.ok(simulation.depthAt(0, -1.1) < retained - 0.10);
  for (let i = 0; i < simulation.terrain.length; i++) {
    assert.equal(simulation.terrain[i], simulation.baseTerrain[i]);
    assert.equal(simulation.rocks[i], 0);
  }
});

test('soil, digging and reset have bounded reversible effects; protected inlets cannot be edited', () => {
  const simulation = new WaterSimulation();
  const i = simulation.cellAt(0, 1.1);
  const baseline = simulation.terrain[i];
  const version = simulation.revision;
  assert.equal(simulation.edit(i, 'soil'), true);
  assert.ok(simulation.terrain[i] > baseline + 0.25);
  assert.equal(simulation.edit(i, 'dig'), true);
  assert.ok(simulation.terrain[i] < baseline);
  for (let j = 0; j < 15; j++) simulation.edit(i, 'dig');
  assert.ok(simulation.terrain[i] > baseline - 1);
  assert.ok(simulation.revision > version);
  assert.equal(simulation.edit(simulation.cellAt(0, -12.65), 'rock'), false);
  assert.equal(simulation.edit(-1, 'rock'), false);
  simulation.reset();
  assert.equal(simulation.terrain[i], baseline);
  assert.deepEqual(simulation.basinLevels(), [0, 0]);
});

test('the finite-volume solver remains finite and nonnegative after rapid edits and long frames', () => {
  const simulation = new WaterSimulation();
  const tools = ['rock', 'soil', 'dig', 'remove'] as const;
  for (let n = 0; n < 220; n++) {
    const x = Math.sin(n * 3.31) * 6;
    const z = Math.cos(n * 1.81) * 8;
    simulation.edit(simulation.cellAt(x, z), tools[n % tools.length]);
    simulation.update(n % 7 === 0 ? 3 : 0.1);
  }
  assert.ok(simulation.water.some(depth => depth > 0.05));
  for (let i = 0; i < simulation.water.length; i++) {
    assert.ok(Number.isFinite(simulation.water[i]) && simulation.water[i] >= 0);
    assert.ok(Number.isFinite(simulation.flowX[i]) && Number.isFinite(simulation.flowZ[i]));
    assert.ok(simulation.water[i] < 5, 'No explosive accumulation from numerical instability');
  }
});

test('a sealed puddle conserves its water as a thin front spreads across dry ground', () => {
  const simulation = new WaterSimulation();
  simulation.terrain.fill(0);
  simulation.water.fill(0);
  const enclosed: number[] = [];
  for (let i = 0; i < simulation.terrain.length; i++) {
    const { x, z } = simulation.coords(i);
    const edge = Math.max(Math.abs(x), Math.abs(z));
    if (edge < 7.7) enclosed.push(i);
    else if (edge <= 8.25) simulation.terrain[i] = 4;
  }
  // This retaining wall isolates the puddle from the normal spring and outlet.
  simulation.water[simulation.cellAt(0, 0)] = 1;
  advance(simulation, 60);
  const remaining = enclosed.reduce((sum, i) => sum + simulation.water[i], 0);
  assert.ok(Math.abs(remaining - 1) < 0.0001, `Closed puddle lost water: ${remaining}`);
  assert.ok(simulation.depthAt(0, 0) < 0.01, 'The water must spread, rather than remain frozen');
});
