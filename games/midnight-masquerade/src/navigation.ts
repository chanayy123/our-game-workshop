import { PROP_RADIUS } from './map.ts';
import type { MapData, Vec } from './types.ts';

export const distance = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.z - b.z);

/** Collision uses the same footprints for the player, police and path planner. */
export function canOccupy(map: MapData, p: Vec, radius = .3, ignorePropId?: number): boolean {
  if (Math.abs(p.x) > map.bounds.x - radius || Math.abs(p.z) > map.bounds.z - radius) return false;
  for (const w of map.walls) {
    const dx = Math.max(Math.abs(p.x - w.x) - w.w / 2, 0);
    const dz = Math.max(Math.abs(p.z - w.z) - w.d / 2, 0);
    if (dx * dx + dz * dz < radius * radius) return false;
  }
  for (const prop of map.props) {
    if (prop.id === ignorePropId) continue;
    if (distance(p, prop) < radius + PROP_RADIUS[prop.kind] - .04) return false;
  }
  return true;
}

/** Segment / axis-aligned wall intersection. Props are low enough to see over. */
export function lineOfSight(map: MapData, a: Vec, b: Vec): boolean {
  for (const w of map.walls) {
    let lo = 0, hi = 1;
    for (const axis of ['x', 'z'] as const) {
      const half = (axis === 'x' ? w.w : w.d) / 2 + .025;
      const delta = b[axis] - a[axis];
      if (Math.abs(delta) < .00001) {
        if (a[axis] < w[axis] - half || a[axis] > w[axis] + half) { lo = 2; break; }
      } else {
        const q1 = (w[axis] - half - a[axis]) / delta;
        const q2 = (w[axis] + half - a[axis]) / delta;
        lo = Math.max(lo, Math.min(q1, q2)); hi = Math.min(hi, Math.max(q1, q2));
      }
    }
    if (lo <= hi && hi > .015 && lo < .985) return false;
  }
  return true;
}

function walkableSegment(map: MapData, a: Vec, b: Vec, radius: number): boolean {
  // Sparse samples can miss a barely intersecting circle tangent. The mover then
  // stops at that contact forever even though A* keeps returning the same segment.
  const vx = b.x - a.x, vz = b.z - a.z, lengthSquared = vx * vx + vz * vz;
  if (lengthSquared > 1e-12) for (const prop of map.props) {
    const along = Math.max(0, Math.min(1, ((prop.x - a.x) * vx + (prop.z - a.z) * vz) / lengthSquared));
    // Allow moving away from an already-valid boundary contact at the start.
    if (along <= 1e-9) continue;
    const dx = a.x + vx * along - prop.x, dz = a.z + vz * along - prop.z;
    const clearance = radius + PROP_RADIUS[prop.kind] - .04 + 1e-6;
    if (dx * dx + dz * dz < clearance * clearance) return false;
  }
  const steps = Math.max(1, Math.ceil(distance(a, b) / .18));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    if (!canOccupy(map, { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t }, radius)) return false;
  }
  return true;
}

const GRID = .5;
type Grid = { w: number; h: number; minX: number; minZ: number; open: Uint8Array };
const grids = new WeakMap<MapData, Map<number, Grid>>();
function getGrid(map: MapData, radius: number): Grid {
  let cache = grids.get(map);
  if (!cache) { cache = new Map(); grids.set(map, cache); }
  let grid = cache.get(radius);
  if (grid) return grid;
  const minX = -map.bounds.x + radius, minZ = -map.bounds.z + radius;
  const w = Math.floor((map.bounds.x * 2 - radius * 2) / GRID) + 1;
  const h = Math.floor((map.bounds.z * 2 - radius * 2) / GRID) + 1;
  grid = { w, h, minX, minZ, open: new Uint8Array(w * h) };
  for (let z = 0; z < h; z++) for (let x = 0; x < w; x++) {
    grid.open[z * w + x] = canOccupy(map, { x: minX + x * GRID, z: minZ + z * GRID }, radius) ? 1 : 0;
  }
  cache.set(radius, grid);
  return grid;
}

/** A* around props and walls, followed by collision-safe waypoint simplification. */
export function findPath(map: MapData, start: Vec, goal: Vec, radius = .28): Vec[] {
  if (canOccupy(map, goal, radius) && walkableSegment(map, start, goal, radius)) return [{ ...goal }];
  const grid = getGrid(map, radius);
  const point = (id: number): Vec => ({ x: grid.minX + (id % grid.w) * GRID, z: grid.minZ + Math.floor(id / grid.w) * GRID });
  const nearest = (p: Vec, requireLink: boolean) => {
    let best = -1, bestD = Infinity;
    for (let i = 0; i < grid.open.length; i++) {
      if (!grid.open[i]) continue;
      const q = point(i), d = distance(p, q);
      if (d >= bestD || (requireLink && !walkableSegment(map, p, q, radius))) continue;
      best = i; bestD = d;
    }
    return best;
  };
  const from = nearest(start, true), to = nearest(goal, false);
  if (from < 0 || to < 0) return [];
  const costs = new Float64Array(grid.open.length).fill(Infinity);
  const parent = new Int32Array(grid.open.length).fill(-1);
  const closed = new Uint8Array(grid.open.length);
  const pending = [from]; costs[from] = 0;
  let found = false;
  while (pending.length) {
    let bestIndex = 0, bestF = Infinity;
    for (let j = 0; j < pending.length; j++) {
      const f = costs[pending[j]] + distance(point(pending[j]), point(to));
      if (f < bestF) { bestF = f; bestIndex = j; }
    }
    const id = pending.splice(bestIndex, 1)[0];
    if (id === to) { found = true; break; }
    if (closed[id]) continue;
    closed[id] = 1;
    const x = id % grid.w, z = Math.floor(id / grid.w);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      if ((!dx && !dz) || x + dx < 0 || x + dx >= grid.w || z + dz < 0 || z + dz >= grid.h) continue;
      const next = (z + dz) * grid.w + x + dx;
      if (!grid.open[next] || closed[next]) continue;
      if (dx && dz && (!grid.open[z * grid.w + x + dx] || !grid.open[(z + dz) * grid.w + x])) continue;
      // Grid corners may graze circular props, so verify every new edge.
      if (!walkableSegment(map, point(id), point(next), radius)) continue;
      const cost = costs[id] + Math.hypot(dx, dz) * GRID;
      if (cost >= costs[next]) continue;
      costs[next] = cost; parent[next] = id; pending.push(next);
    }
  }
  if (!found) return [];
  const reverse: Vec[] = [];
  for (let i = to; i >= 0; i = parent[i]) { reverse.push(point(i)); if (i === from) break; }
  const raw = reverse.reverse();
  if (canOccupy(map, goal, radius) && walkableSegment(map, raw[raw.length - 1], goal, radius)) raw.push({ ...goal });
  const path: Vec[] = []; let last = start, index = 0;
  while (index < raw.length) {
    let farthest = index;
    for (let j = index; j < raw.length; j++) {
      if (walkableSegment(map, last, raw[j], radius)) farthest = j; else break;
    }
    path.push(raw[farthest]); last = raw[farthest]; index = farthest + 1;
  }
  return path;
}

export function moveWithCollision(map: MapData, p: Vec, dx: number, dz: number, radius: number): boolean {
  const before = { ...p };
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / .12));
  for (let i = 0; i < steps; i++) {
    if (canOccupy(map, { x: p.x + dx / steps, z: p.z + dz / steps }, radius)) { p.x += dx / steps; p.z += dz / steps; }
    else {
      if (canOccupy(map, { x: p.x + dx / steps, z: p.z }, radius)) p.x += dx / steps;
      if (canOccupy(map, { x: p.x, z: p.z + dz / steps }, radius)) p.z += dz / steps;
    }
  }
  return distance(before, p) > .0001;
}
