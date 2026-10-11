import type { Tool } from './contracts.ts';

/** A conservative, finite-volume shallow-water height field.
 * Terrain is the hydraulic bed: every edit participates in the same solver.
 * There are no scripted channels, basin fills, or redirection animations. */
export class WaterSimulation {
  readonly width = 41;
  readonly height = 49;
  readonly cellSize = 0.55;
  readonly terrain = new Float32Array(this.width * this.height);
  readonly baseTerrain = new Float32Array(this.terrain.length);
  readonly water = new Float32Array(this.terrain.length);
  readonly flowX = new Float32Array(this.terrain.length);
  readonly flowZ = new Float32Array(this.terrain.length);
  readonly rocks = new Uint8Array(this.terrain.length);
  readonly protectedCells = new Uint8Array(this.terrain.length);
  readonly basins = [
    { x: -6.05, z: 6.05, radius: 2.05, name: 'Fern hollow' },
    { x: 6.05, z: 6.05, radius: 2.05, name: 'Willow hollow' },
  ] as const;
  revision = 0;

  private readonly minimum = new Float32Array(this.terrain.length);
  private readonly outflow = new Float32Array(this.terrain.length);
  private readonly delta = new Float32Array(this.terrain.length);
  private readonly fluxX = new Float32Array(this.terrain.length);
  private readonly fluxZ = new Float32Array(this.terrain.length);
  private readonly sources: number[] = [];
  private readonly outlets: number[] = [];
  private readonly basinCells: [number[], number[]] = [[], []];

  constructor() {
    this.generateTerrain();
    this.reset();
  }

  index(col: number, row: number): number { return row * this.width + col; }

  coords(index: number): { x: number; z: number } {
    return {
      x: (index % this.width - (this.width - 1) / 2) * this.cellSize,
      z: (Math.floor(index / this.width) - (this.height - 1) / 2) * this.cellSize,
    };
  }

  cellAt(x: number, z: number): number {
    const col = Math.round(x / this.cellSize + (this.width - 1) / 2);
    const row = Math.round(z / this.cellSize + (this.height - 1) / 2);
    if (!Number.isFinite(x + z) || col < 0 || col >= this.width || row < 0 || row >= this.height) return -1;
    return this.index(col, row);
  }

  surfaceAt(x: number, z: number): number {
    const i = this.cellAt(x, z);
    return i < 0 ? 1.5 : this.terrain[i] + this.water[i];
  }

  depthAt(x: number, z: number): number {
    const i = this.cellAt(x, z);
    return i < 0 ? 0 : this.water[i];
  }

  edit(index: number, tool: Tool): boolean {
    if (!Number.isInteger(index) || index < 0 || index >= this.terrain.length || this.protectedCells[index]) return false;
    const centre = this.coords(index);
    const radius = tool === 'rock' ? 0.84 : 0.83;
    let changed = false;
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const col = index % this.width + dc;
        const row = Math.floor(index / this.width) + dr;
        if (col < 0 || row < 0 || col >= this.width || row >= this.height) continue;
        const i = this.index(col, row);
        const p = this.coords(i);
        const distance = Math.hypot(p.x - centre.x, p.z - centre.z);
        if (distance > radius || this.protectedCells[i]) continue;
        const previous = this.terrain[i];
        const previousRock = this.rocks[i];
        if (tool === 'rock') {
          this.rocks[i] = 1;
          // A rock's submerged bulk matters, including the edge cells.
          this.terrain[i] = Math.max(previous, this.baseTerrain[i] + 1.12 - distance * 0.14);
        } else if (tool === 'soil' && !this.rocks[i]) {
          this.terrain[i] = Math.min(this.baseTerrain[i] + 1.4, previous + 0.30);
        } else if (tool === 'dig' && !this.rocks[i]) {
          this.terrain[i] = Math.max(this.minimum[i], previous - 0.34);
        } else if (tool === 'remove') {
          this.terrain[i] = this.baseTerrain[i];
          this.rocks[i] = 0;
        }
        if (Math.abs(previous - this.terrain[i]) > 0.00001 || previousRock !== this.rocks[i]) changed = true;
      }
    }
    if (changed) this.revision++;
    return changed;
  }

  update(dt: number): void {
    if (!Number.isFinite(dt) || dt <= 0) return;
    // Two hydraulic seconds per real second make small edits readable promptly.
    const duration = Math.min(dt, 0.2) * 2;
    const steps = Math.ceil(duration / (1 / 60));
    for (let step = 0; step < steps; step++) this.step(duration / steps);
  }

  reset(): void {
    this.terrain.set(this.baseTerrain);
    this.rocks.fill(0);
    this.water.fill(0);
    this.flowX.fill(0);
    this.flowZ.fill(0);
    // Seed only the existing creek, then let the same solver settle it.
    for (let i = 0; i < this.water.length; i++) {
      const p = this.coords(i);
      const creek = this.creekProfile(p.z);
      if (Math.abs(p.x - creek.centre) < creek.halfWidth) this.water[i] = 0.14;
    }
    for (let t = 0; t < 1200; t++) this.step(1 / 60);
    this.revision++;
  }

  basinLevels(): [number, number] {
    return this.basinCells.map(cells => cells.reduce((sum, i) => sum + this.water[i], 0) / cells.length) as [number, number];
  }

  private generateTerrain(): void {
    for (let i = 0; i < this.terrain.length; i++) {
      const { x, z } = this.coords(i);
      const creekBed = 0.67 - (z + 12) * 0.026;
      const ripple = 0.012 * Math.sin(z * 1.8 + x * 0.7);
      const creek = this.creekProfile(z);
      const bank = Math.min(1, Math.max(0, (Math.abs(x - creek.centre) - creek.halfWidth) / 0.82));
      let h = creekBed + bank * 1.04 + ripple;
      let minimum = h - 0.68;

      for (const side of [-1, 1]) {
        const q = this.nearestPolyline(x, z, [[0, -3.3], [side * 2.75, -1.1], [side * 4.4, 2.2], [side * 6.05, 6.05]]);
        const channelBed = 0.64 - q.progress * 0.59;
        const channelBank = Math.min(1, Math.max(0, (q.distance - 0.47) / 0.58));
        let furrow = channelBed + channelBank * 1.05;
        // Raised mud plugs keep both hollows dry until the player opens them.
        if (q.progress > 0.058 && q.progress < 0.225) furrow = Math.max(furrow, 1.18 + channelBank * 0.18);
        if (furrow < h) {
          h = furrow;
          minimum = channelBed - 0.14 + channelBank * 0.65;
        }
      }

      for (let b = 0; b < this.basins.length; b++) {
        const basin = this.basins[b];
        const r = Math.hypot(x - basin.x, z - basin.z);
        if (r < basin.radius + 0.65) {
          const floor = -0.20 + Math.pow(r / basin.radius, 4) * 0.50;
          if (floor < h) { h = floor; minimum = floor - 0.38; }
        }
        if (r < 1.45) this.basinCells[b].push(i);
      }
      this.baseTerrain[i] = h;
      this.minimum[i] = minimum;
      const row = Math.floor(i / this.width);
      if (row <= 2 && Math.abs(x) < 0.85) {
        this.protectedCells[i] = 1;
        if (row === 1) this.sources.push(i);
      }
      if (row >= this.height - 2 || i % this.width === 0 || i % this.width === this.width - 1) {
        this.protectedCells[i] = 1;
        this.outlets.push(i);
      }
    }
  }

  private creekProfile(z: number): { centre: number; halfWidth: number } {
    // Let the banks wander while keeping the spring, fork and dam site legible.
    const endpoint = Math.max(0, Math.min(1, (12.1 - Math.abs(z)) / 2.1));
    const junction = Math.min(1, Math.abs(z) / 1.4) * Math.min(1, Math.abs(z + 3.3) / 1.7);
    return {
      centre: 0.40 * Math.sin(z * 0.43) * endpoint * junction,
      halfWidth: 0.82 + 0.09 * Math.sin(z * 0.73 + 0.8),
    };
  }

  private nearestPolyline(x: number, z: number, points: number[][]): { distance: number; progress: number } {
    const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    const total = lengths.reduce((a, b) => a + b, 0);
    let distance = Infinity;
    let progress = 0;
    let travelled = 0;
    for (let s = 0; s < lengths.length; s++) {
      const a = points[s], b = points[s + 1];
      const vx = b[0] - a[0], vz = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((x - a[0]) * vx + (z - a[1]) * vz) / (lengths[s] ** 2)));
      const d = Math.hypot(x - a[0] - vx * t, z - a[1] - vz * t);
      if (d < distance) { distance = d; progress = (travelled + lengths[s] * t) / total; }
      travelled += lengths[s];
    }
    return { distance, progress };
  }

  private step(dt: number): void {
    const water = this.water;
    this.outflow.fill(0);
    this.delta.fill(0);
    for (const i of this.sources) water[i] += 0.092 * dt;
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const i = this.index(col, row);
        if (col + 1 < this.width) {
          const f = this.edgeFlux(i, i + 1, dt);
          this.fluxX[i] = f;
          this.outflow[f > 0 ? i : i + 1] += Math.abs(f);
        }
        if (row + 1 < this.height) {
          const f = this.edgeFlux(i, i + this.width, dt);
          this.fluxZ[i] = f;
          this.outflow[f > 0 ? i : i + this.width] += Math.abs(f);
        }
      }
    }
    this.flowX.fill(0);
    this.flowZ.fill(0);
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const i = this.index(col, row);
        if (col + 1 < this.width) this.transfer(i, i + 1, this.fluxX[i], dt, this.flowX);
        if (row + 1 < this.height) this.transfer(i, i + this.width, this.fluxZ[i], dt, this.flowZ);
      }
    }
    for (let i = 0; i < water.length; i++) water[i] = Math.max(0, water[i] + this.delta[i]);
    for (const i of this.outlets) water[i] *= Math.exp(-6 * dt);
  }

  private edgeFlux(a: number, b: number, dt: number): number {
    const headA = this.terrain[a] + this.water[a];
    const headB = this.terrain[b] + this.water[b];
    const difference = headA - headB;
    const donor = difference > 0 ? a : b;
    if (this.water[donor] <= 0) return 0;
    const crest = Math.max(this.terrain[a], this.terrain[b]);
    const aboveCrest = Math.max(headA, headB) - crest;
    if (aboveCrest <= 0) return 0;
    const headDrop = Math.min(Math.abs(difference), aboveCrest);
    return Math.sign(difference) * 12 * headDrop * Math.sqrt(Math.min(aboveCrest, 1.5)) * dt;
  }

  private transfer(a: number, b: number, flux: number, dt: number, flow: Float32Array): void {
    const donor = flux > 0 ? a : b;
    // Scale all outgoing edges together, preserving mass even at a dry front.
    const available = this.outflow[donor] > 0 ? Math.min(1, this.water[donor] / this.outflow[donor]) : 0;
    const amount = flux * available;
    this.delta[a] -= amount;
    this.delta[b] += amount;
    const velocity = amount * this.cellSize / dt;
    flow[a] += velocity * 0.5;
    flow[b] += velocity * 0.5;
  }
}
