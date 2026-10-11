import { PROP_RADIUS } from './map.ts';
import { canOccupy, distance, findPath, lineOfSight, moveWithCollision } from './navigation.ts';
import type { GameState, MapData, Player, PropKind, Vec } from './types.ts';

interface Hide extends Vec { kind: PropKind; angle: number }

/** The opponent uses actual walkable hides, sight lines, stamina and two smoke charges. */
export class HiderAI {
  private hides: Hide[] = [];
  private goal: Hide | null = null;
  private path: Vec[] = [];
  private rethink = 0;
  private relocate = 25;
  private stunned = 0;
  private reaction = 0;
  private wasExposed = false;
  private map: MapData;
  private random: () => number;
  constructor(map: MapData, random: () => number, fit: (p: Player) => number) {
    this.map = map; this.random = random;
    for (const prop of map.props) for (const offset of [1.1, 1.6]) for (let i = 0; i < 8; i++) {
      const h = { x: prop.x + Math.sin(i * Math.PI / 4) * offset, z: prop.z + Math.cos(i * Math.PI / 4) * offset, kind: prop.kind, angle: Math.round(prop.angle / (Math.PI / 2)) * Math.PI / 2 };
      if (canOccupy(map, h, PROP_RADIUS[h.kind] * .85) && lineOfSight(map, h, prop) && fit({ ...h, moving: false, stillTime: 2 } as Player) >= 74) this.hides.push(h);
    }
  }
  place(p: Player): void {
    const h = this.hides[Math.floor(this.random() * this.hides.length)];
    if (h) Object.assign(p, h, { stillTime: 2, transformFlash: 0 });
    this.relocate += this.random() * 12;
  }
  interrupt(): void { this.stunned = .95; }
  update(s: GameState, dt: number): 'smoke' | 'transform' | null {
    const p = s.player, active = s.cops.filter(c => c.hp > 0);
    this.rethink -= dt; this.relocate -= dt; this.stunned = Math.max(0, this.stunned - dt);
    let effect: 'smoke' | 'transform' | null = null;
    if (p.exposed && !this.wasExposed) { this.reaction = .8; this.rethink = 0; this.goal = null; }
    this.wasExposed = p.exposed; this.reaction = Math.max(0, this.reaction - dt);
    if (p.exposed && this.reaction <= 0 && this.rethink <= 0) {
      this.chooseGoal(s, true); this.rethink = 1.8;
    } else if (!p.exposed && !this.goal && this.relocate <= 0 && !active.some(c => distance(c, p) < 8 && lineOfSight(this.map, c, p))) {
      this.chooseGoal(s, false); this.relocate = 25 + this.random() * 12;
    }
    if (p.exposed && this.reaction <= 0 && p.smokeTime <= 0 && p.smokeCharges > 0 && active.some(c => distance(c, p) < 2.8 && lineOfSight(this.map, c, p))) {
      p.smokeCharges--; p.smokeTime = 3.6; effect = 'smoke';
    }
    while (this.path.length && distance(p, this.path[0]) < .14) this.path.shift();
    const next = this.path[0]; p.moving = false; p.sprinting = false;
    if (next && this.reaction <= 0 && this.stunned <= 0) {
      const d = distance(p, next), speed = p.exposed && p.stamina > 3 ? 4.05 : 2.35;
      p.sprinting = speed > 3; const step = Math.min(d, speed * dt);
      p.moving = moveWithCollision(this.map, p, (next.x - p.x) / d * step, (next.z - p.z) / d * step, p.kind ? PROP_RADIUS[p.kind] * .85 : .28);
      if (!p.moving) { this.rethink = 0; this.path = []; this.goal = null; this.relocate = 2; }
    }
    if (this.goal && !this.path.length) {
      if (distance(p, this.goal) < .4 && canOccupy(this.map, p, PROP_RADIUS[this.goal.kind] * .85)) {
        if (p.kind !== this.goal.kind) { p.kind = this.goal.kind; p.transformFlash = .65; effect = 'transform'; s.stats.transforms++; }
        p.angle = this.goal.angle; this.goal = null;
        // Pause in cover so the normal lost-contact rule can clear exposure.
        this.rethink = 4; this.relocate = 25 + this.random() * 12;
      }
    }
    p.stamina = Math.max(0, Math.min(100, p.stamina + (p.sprinting && p.moving ? -20 : 17) * dt));
    p.stillTime = p.moving ? 0 : p.stillTime + dt;
    return effect;
  }
  private chooseGoal(s: GameState, fleeing: boolean): void {
    const p = s.player, radius = p.kind ? PROP_RADIUS[p.kind] * .85 : .28;
    const candidates = this.hides.filter(h => distance(h, p) > 3.5 && canOccupy(this.map, h, radius)).map(h => {
      const cops = s.cops.filter(c => c.hp > 0);
      const nearest = Math.min(20, ...cops.map(c => distance(h, c)));
      const occluded = cops.filter(c => !lineOfSight(this.map, c, h)).length;
      return { h, score: nearest + occluded * (fleeing ? 7 : 3) - distance(h, p) * .35 + this.random() * 4 };
    }).sort((a, b) => b.score - a.score);
    for (const { h } of candidates.slice(0, 24)) {
      const path = findPath(this.map, p, h, radius);
      if (path.length && distance(path[path.length - 1], h) < .3) { this.goal = h; this.path = path; return; }
    }
  }
}
