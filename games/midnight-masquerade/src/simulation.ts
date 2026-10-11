import { createMap, PROP_NAMES, PROP_RADIUS, zoneAt } from './map.ts';
import { canOccupy, distance, findPath, lineOfSight, moveWithCollision } from './navigation.ts';
import { HiderAI } from './hider.ts';
import type { Cop, GameEvent, GameState, Input, MapData, Player, Prop, PropKind, Role, Simulation, Vec, Zone } from './types.ts';
export { canOccupy, findPath, lineOfSight } from './navigation.ts';

const PREPARE_TIME = 30, SEARCH_TIME = 120, PLAYER_ID = -1;
export const MAGIC_HICCUPS = [35, 75, 105] as const;
const TAU = Math.PI * 2;
const clamp = (n: number, low = 0, high = 1) => Math.max(low, Math.min(high, n));
const facing = (a: Vec, b: Vec) => Math.atan2(b.x - a.x, b.z - a.z);
const angleDelta = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const preferred: Record<PropKind, Zone[]> = { chair: ['cafe'], table: ['cafe'], pot: ['garden', 'cafe'], crate: ['cargo'], barrel: ['cargo'], bin: ['cargo', 'plaza'], lamp: ['plaza', 'garden'] };

/** A physical/contextual fit, shared by the HUD and each officer's visual judgement. */
export function blendScore(map: MapData, player: Pick<Player, 'x' | 'z' | 'kind' | 'angle' | 'moving' | 'stillTime'>): { score: number; text: string } {
  if (!player.kind) return { score: 0, text: '先靠近物体，按 E 复制外形' };
  const goodZone = preferred[player.kind].includes(zoneAt(player));
  const kin = map.props.filter(prop => prop.kind === player.kind).reduce((d, prop) => Math.min(d, distance(player, prop)), Infinity);
  const nearWall = map.walls.some(w => Math.hypot(Math.max(Math.abs(player.x - w.x) - w.w / 2, 0), Math.max(Math.abs(player.z - w.z) - w.d / 2, 0)) < 1.45);
  const aligned = Math.abs(Math.sin(player.angle * 2)) < .3;
  const central = Math.abs(player.x) < 2.7 && player.z > -8 && player.z < 8;
  let score = 28 + (goodZone ? 26 : 0) + (kin < 2.5 ? 24 : kin < 4 ? 10 : 0) + (nearWall ? 14 : 0) + (aligned ? 8 : 0) - (central ? 25 : 0);
  if (player.moving) score -= 30;
  if (player.stillTime < 1) score -= 8;
  score = Math.round(clamp(score, 0, 100));
  const text = player.moving ? '会走路的物体很可疑' : central ? '通道中央太显眼了' : !goodZone ? '这里放这种东西不太合理' : kin > 4 ? '有些孤零零，找同类靠近' : score >= 75 ? '融入环境了，保持安静' : nearWall ? '墙边有掩护，留意巡逻路线' : '试试靠墙，或与同类摆在一起';
  return { score, text };
}

interface CopBrain { sense: number; target: Vec | null; goal: Vec | null; repath: number; stalled: number; last: Vec; heard: number; abandon: number; look: number; closeCounted: boolean; movementEvidenceUntil: number; noisePoint: Vec | null; noiseEvidenceUntil: number; }

export class GameSimulation implements Simulation {
  map: MapData;
  state!: GameState;
  private brains: CopBrain[] = [];
  private eventId = 0;
  private seed = 0x13579;
  private noiseId = 0;
  private capture = 0;
  private searchAge = 0;
  private contactGrace = 0;
  private hider: HiderAI | null = null;
  constructor(map: MapData = createMap()) { this.map = map; this.reset(); }
  private random(): number { this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0; return this.seed / 4294967296; }
  reset(): void {
    const role = this.state?.role ?? 'hider'; this.hider = null;
    const round = (this.state?.round ?? 0) + 1;
    this.seed = 0x13579 + round * 71; this.capture = 0; this.searchAge = 0; this.contactGrace = 0; this.noiseId = 0;
    const player: Player = { ...this.map.spawn, kind: null, angle: 0, moving: false, sprinting: false, exposed: false, stamina: 100, smokeCharges: 2, smokeTime: 0, noiseCooldown: 0, transformFlash: 0, stillTime: 0, escapeTime: 0 };
    const cops: Cop[] = this.map.routes.map((route, id) => ({ ...(route[0] ?? { x: id * 2, z: 9 }), id, name: id === 0 ? '林警官' : '周警官', hp: 10, angle: Math.PI, mode: 'patrol', targetId: null, suspicion: 0, timer: 0, routeIndex: 1, path: [], lastSeen: null, unseenTime: 0, attackFlash: 0, hurtFlash: 0, speech: '', speechTime: 0, memory: {}, checked: {} }));
    this.state = { role, police: { attackCooldown: 0, whistleCooldown: 0, stamina: 100, clue: '', clueTime: 0, captureProgress: 0 }, phase: 'intro', time: PREPARE_TIME, elapsed: 0, round, player, cops, events: [], suspicion: 0, blend: 0, blendText: '靠近道具，复制外形', result: '', stats: { mistakes: 0, escapes: 0, transforms: 0, closeCalls: 0 }, noise: null };
    this.brains = cops.map(cop => ({ sense: 0, target: null, goal: null, repath: 0, stalled: 0, last: { ...cop }, heard: 0, abandon: 0, look: cop.angle, closeCounted: false, movementEvidenceUntil: 0, noisePoint: null, noiseEvidenceUntil: 0 }));
  }
  start(role: Role = this.state.role): void {
    if (this.state.phase !== 'intro') this.reset();
    this.state.role = role; this.state.phase = 'prepare'; this.state.time = role === 'police' ? 5 : PREPARE_TIME;
    if (role === 'police') {
      this.hider = new HiderAI(this.map, () => this.random(), p => blendScore(this.map, p).score);
      this.hider.place(this.state.player);
      this.state.cops[0].name = '你 · 林警官';
    }
  }
  beginSearch(): void {
    if (this.state.phase !== 'prepare') return;
    this.state.phase = 'search'; this.state.time = SEARCH_TIME; this.searchAge = 0;
    for (const cop of this.state.cops) this.speak(cop, cop.id ? '我走花园，你查咖啡店。' : '留意不该出现在这里的东西。', 4);
  }
  nearestProp(): Prop | null {
    let closest: Prop | null = null, d = 3.15;
    for (const prop of this.map.props) {
      const candidate = distance(this.state.player, prop);
      if (candidate < d && lineOfSight(this.map, this.state.player, prop)) { closest = prop; d = candidate; }
    }
    return closest;
  }
  policeTarget(id?: number): { id: number; kind: PropKind; angle: number; x: number; z: number } | null {
    if (this.state.role !== 'police' || this.state.phase !== 'search') return null;
    const cop = this.state.cops[0], p = this.state.player;
    const candidates = [...this.map.props, ...(p.kind ? [{ ...p, id: PLAYER_ID, kind: p.kind }] : [])];
    if (id === undefined && p.exposed && distance(cop, p) < 2.2 && lineOfSight(this.map, cop, p)) return { ...p, id: PLAYER_ID, kind: p.kind! };
    return candidates.filter(t => (id === undefined || t.id === id) && distance(cop, t) <= 2.2 && lineOfSight(this.map, cop, t))
      .sort((a, b) => distance(cop, a) - distance(cop, b))[0] ?? null;
  }
  aim(at: Vec): void { if (this.state.role === 'police') this.state.cops[0].angle = facing(this.state.cops[0], at); }
  inspectTarget(id?: number): boolean {
    const target = this.policeTarget(id); if (!target) return false;
    const s = this.state, cop = s.cops[0]; cop.angle = facing(cop, target);
    const fit = blendScore(this.map, { ...target, moving: false, stillTime: 2 }).score;
    const ordinary = target.id >= 0 ? this.map.props[target.id] : null;
    s.police.clue = target.id === PLAYER_ID && s.player.moving ? '刚才好像在移动……盯紧它！' : fit < 65 || (ordinary?.oddity ?? 0) > .5 ? `这个${PROP_NAMES[target.kind]}的摆放有些反常，但还不能下结论。` : `这个${PROP_NAMES[target.kind]}摆得挺自然。留意它会不会移动或发声。`;
    s.police.clueTime = 4; this.speak(cop, '先看看摆放，再决定要不要敲。', 2); return true;
  }
  attack(id?: number): boolean {
    const s = this.state, cop = s.cops[0];
    if (s.role !== 'police' || s.phase !== 'search' || cop.hp <= 0 || s.police.attackCooldown > 0) return false;
    const target = this.policeTarget(id); if (!target) return false;
    cop.angle = facing(cop, target); cop.attackFlash = .5; s.police.attackCooldown = .65;
    if (target.id === PLAYER_ID) {
      if (!s.player.exposed) {
        s.player.exposed = true; s.player.escapeTime = 0; this.contactGrace = 1.6;
        this.emit('found', target, '识破了！靠近抓住它，F 哨声可以打断逃跑。', cop.id);
      }
      this.startChase(cop); this.speak(cop, '就是你！站住！');
    } else {
      cop.hp--; cop.hurtFlash = .8; s.stats.mistakes++; cop.checked[String(target.id)] = s.elapsed + 65;
      this.emit('wrong', target, '普通物体！你的生命 −1', cop.id);
      this.speak(cop, '判断错了……得仔细点。');
      if (cop.hp <= 0) { cop.mode = 'retired'; this.finish(true, '你的 10 格生命耗尽了，伪装者逃过了搜查。'); }
    }
    return true;
  }
  whistle(): boolean {
    const s = this.state, cop = s.cops[0];
    if (s.role !== 'police' || s.phase !== 'search' || s.police.whistleCooldown > 0) return false;
    s.police.whistleCooldown = 15; this.emit('noise', cop, '哨声！已识破且在视线内的近处对手会短暂停步。');
    if (s.player.exposed && distance(cop, s.player) < 6 && this.sees(cop, s.player, true)) this.hider?.interrupt();
    return true;
  }
  transform(id?: number): boolean {
    if (this.state.role === 'police') return false;
    if (!['prepare', 'search'].includes(this.state.phase)) return false;
    const p = this.state.player, prop = id === undefined ? this.nearestProp() : this.map.props.find(candidate => candidate.id === id);
    if (!prop || distance(p, prop) > 3.15 || !lineOfSight(this.map, p, prop)) return false;
    const radius = PROP_RADIUS[prop.kind] * .85;
    if (!canOccupy(this.map, p, radius)) {
      // Let a wider copied shape settle into nearby free space without crossing a solid object.
      let settled: Vec | null = null;
      for (const offset of [.2, .4, .6]) {
        for (let a = 0; a < 12; a++) {
          const q = { x: p.x + Math.sin(a * TAU / 12) * offset, z: p.z + Math.cos(a * TAU / 12) * offset };
          if (!canOccupy(this.map, q, radius)) continue;
          const probe = { x: p.x, z: p.z };
          moveWithCollision(this.map, probe, q.x - p.x, q.z - p.z, p.kind ? PROP_RADIUS[p.kind] * .85 : .28);
          if (distance(probe, q) < .01) { settled = q; break; }
        }
        if (settled) break;
      }
      if (!settled) return false;
      p.x = settled.x; p.z = settled.z;
    }
    p.kind = prop.kind; p.angle = prop.angle; p.transformFlash = .65; p.stillTime = 0;
    this.state.stats.transforms++;
    this.emit('transform', p, `变成${PROP_NAMES[prop.kind]}`);
    return true;
  }
  rotate(): void {
    if (this.state.role === 'police') return;
    if (['prepare', 'search'].includes(this.state.phase)) {
      const p = this.state.player;
      p.angle = ((Math.floor((p.angle + .001) / (Math.PI / 2)) + 1) * Math.PI / 2 + TAU) % TAU;
    }
  }
  smoke(): boolean {
    if (this.state.role === 'police') return false;
    const p = this.state.player;
    if (this.state.phase !== 'search' || p.smokeCharges <= 0 || p.smokeTime > 0) return false;
    p.smokeCharges--; p.smokeTime = 3.6; this.emit('smoke', p, '烟幕！赶快绕过遮挡');
    for (const cop of this.state.cops) if (distance(cop, p) < 5) this.speak(cop, '咳！失去视线了！');
    return true;
  }
  distract(at?: Vec): boolean {
    if (this.state.role === 'police') return false;
    const p = this.state.player;
    if (this.state.phase !== 'search' || p.noiseCooldown > 0) return false;
    const target = at ?? { x: p.x + Math.sin(p.angle) * 5, z: p.z + Math.cos(p.angle) * 5 };
    const d = distance(p, target), limit = Math.min(1, 8 / Math.max(.001, d));
    const noise = { x: clamp(p.x + (target.x - p.x) * limit, -this.map.bounds.x + .5, this.map.bounds.x - .5), z: clamp(p.z + (target.z - p.z) * limit, -this.map.bounds.z + .5, this.map.bounds.z - .5), time: 3.5 };
    p.noiseCooldown = 13; this.state.noise = noise; this.noiseId++; this.emit('noise', noise, '叮当！把他们引去那边');
    return true;
  }
  update(dt: number, input: Input): void {
    if (!Number.isFinite(dt) || dt <= 0 || !['prepare', 'search'].includes(this.state.phase)) return;
    // A browser tab returning after suspension must not instantly consume a round.
    const duration = Math.min(dt, .25), steps = Math.ceil(duration / .04);
    for (let i = 0; i < steps; i++) { if (!['prepare', 'search'].includes(this.state.phase)) break; this.tick(duration / steps, input); }
  }
  private tick(dt: number, input: Input): void {
    const s = this.state, p = s.player;
    s.elapsed += dt; s.time = Math.max(0, s.time - dt); if (s.time < 1e-8) s.time = 0;
    p.transformFlash = Math.max(0, p.transformFlash - dt); p.smokeTime = Math.max(0, p.smokeTime - dt); p.noiseCooldown = Math.max(0, p.noiseCooldown - dt);
    if (s.noise) { s.noise.time -= dt; if (s.noise.time <= 0) s.noise = null; }
    if (s.role === 'police') {
      this.moveHumanCop(dt, input);
      if (s.phase === 'search') {
        const sawOpponent = this.sees(s.cops[0], p, true);
        const effect = this.hider?.update(s, dt);
        if (effect && sawOpponent) this.emit(effect, p, effect === 'smoke' ? '对手放了烟幕！去找最后看见它的地方。' : '它换了外形！');
      }
    } else {
    let ix = Number.isFinite(input.x) ? input.x : 0, iz = Number.isFinite(input.z) ? input.z : 0;
    const magnitude = Math.hypot(ix, iz); if (magnitude > 1) { ix /= magnitude; iz /= magnitude; }
    p.sprinting = input.sprint && magnitude > .01 && p.stamina > 1;
    const speed = p.sprinting ? 4.7 : p.kind ? 2.5 : 3.05;
    p.moving = moveWithCollision(this.map, p, ix * dt * speed, iz * dt * speed, p.kind ? PROP_RADIUS[p.kind] * .85 : .28);
    p.stamina = clamp(p.stamina + (p.sprinting && p.moving ? -27 : 17) * dt, 0, 100);
    p.stillTime = p.moving ? 0 : p.stillTime + dt;
    if (!p.kind && p.moving) p.angle = Math.atan2(ix, iz);
    }
    const fit = blendScore(this.map, p); s.blend = fit.score; s.blendText = fit.text;
    if (s.phase === 'prepare') { if (s.time <= 0) this.beginSearch(); return; }
    const previousAge = this.searchAge;
    this.searchAge += dt; this.contactGrace = Math.max(0, this.contactGrace - dt);
    // A periodic diegetic sound creates pressure without granting global visual knowledge.
    if (MAGIC_HICCUPS.some(at => previousAge < at && this.searchAge >= at)) {
      this.state.noise = { x: p.x, z: p.z, time: 3.5 }; this.noiseId++;
      this.emit('noise', p, '魔法打嗝！这个位置发出了声响，快换个地方。');
    }
    for (const cop of s.cops) if (!(s.role === 'police' && cop.id === 0)) this.updateCop(cop, dt);
    if (s.phase !== 'search') return;
    const active = s.cops.filter(cop => cop.hp > 0);
    if (!active.length) { this.finish(true, '两位警官的 10 格耐心全部耗尽，你骗过了所有人！'); return; }
    const seen = active.some(cop => cop.mode === 'chase' && this.sees(cop, p, true));
    if (p.exposed) {
      p.escapeTime = seen ? 0 : p.escapeTime + dt;
      if (p.escapeTime >= 3.15 && p.kind && !p.moving) {
        p.exposed = false; p.escapeTime = 0; this.capture = 0; s.stats.escapes++;
        for (const cop of active) { if (cop.mode === 'chase') { cop.mode = 'investigate'; cop.timer = 5; this.brains[cop.id].target = cop.lastSeen && { ...cop.lastSeen }; } cop.memory[String(PLAYER_ID)] = 0; }
        this.emit('escape', p, '甩掉了！重新融入环境');
      }
      const touching = this.contactGrace <= 0 && active.some(cop => cop.mode === 'chase' && distance(cop, p) < .8 && this.sees(cop, p, true));
      this.capture = touching ? this.capture + dt : Math.max(0, this.capture - dt * 2);
      s.police.captureProgress = clamp(this.capture / .45);
      if (this.capture >= .45) { this.finish(false, s.role === 'police' ? '成功抓住伪装者！你们完成了这次夜市搜查。' : '被警官抓住啦！烟幕和拐角可以帮你甩开追捕。'); return; }
    }
    s.suspicion = Math.round(Math.max(0, ...active.map(cop => cop.targetId === PLAYER_ID || cop.mode === 'chase' ? cop.suspicion : (cop.memory[String(PLAYER_ID)] ?? 0))));
    if (s.time <= 0) this.finish(true, s.role === 'police' ? '搜查时间结束，伪装者成功躲过了你们。' : '天亮收队！你成功藏到了最后。');
  }
  private moveHumanCop(dt: number, input: Input): void {
    const s = this.state, cop = s.cops[0], pc = s.police;
    pc.attackCooldown = Math.max(0, pc.attackCooldown - dt); pc.whistleCooldown = Math.max(0, pc.whistleCooldown - dt); pc.clueTime = Math.max(0, pc.clueTime - dt);
    cop.attackFlash = Math.max(0, cop.attackFlash - dt); cop.hurtFlash = Math.max(0, cop.hurtFlash - dt); cop.speechTime = Math.max(0, cop.speechTime - dt);
    let x = Number.isFinite(input.x) ? input.x : 0, z = Number.isFinite(input.z) ? input.z : 0;
    const n = Math.hypot(x, z); if (n > 1) { x /= n; z /= n; }
    const sprint = input.sprint && n > .01 && pc.stamina > 1, speed = sprint ? 4.7 : 3.25;
    if (moveWithCollision(this.map, cop, x * speed * dt, z * speed * dt, .28)) cop.angle = Math.atan2(x, z);
    pc.stamina = clamp(pc.stamina + (sprint ? -27 : 17) * dt, 0, 100);
    const visible = s.player.exposed && this.sees(cop, s.player, true);
    cop.mode = visible ? 'chase' : pc.clueTime > 0 ? 'inspect' : 'patrol';
    if (visible) { cop.lastSeen = { x: s.player.x, z: s.player.z }; cop.targetId = PLAYER_ID; }
    else cop.targetId = null;
    cop.suspicion = 0;
  }
  private sees(cop: Cop, target: Vec, chase = false): boolean {
    const d = distance(cop, target);
    if (d > (chase ? 9.5 : 8) || !lineOfSight(this.map, cop, target)) return false;
    if (target === this.state.player && this.state.player.smokeTime > 0) return false;
    return d < 1.8 || Math.abs(angleDelta(facing(cop, target), cop.angle)) < (chase ? 1.5 : 1.03);
  }
  private speak(cop: Cop, text: string, time = 2.8): void { cop.speech = text; cop.speechTime = time; }
  private emit(type: GameEvent['type'], at: Vec, text: string, copId?: number): void {
    this.state.events.push({ id: ++this.eventId, type, x: at.x, z: at.z, text, copId });
    if (this.state.events.length > 40) this.state.events.splice(0, this.state.events.length - 40);
  }
  private finish(won: boolean, text: string): void { const humanWon = this.state.role === 'police' ? !won : won; this.state.phase = humanWon ? 'won' : 'lost'; this.state.result = text; this.state.player.moving = false; this.emit(humanWon ? 'win' : 'lose', this.state.role === 'police' ? this.state.cops[0] : this.state.player, text); }
  private updateCop(cop: Cop, dt: number): void {
    const brain = this.brains[cop.id], p = this.state.player;
    cop.attackFlash = Math.max(0, cop.attackFlash - dt); cop.hurtFlash = Math.max(0, cop.hurtFlash - dt); cop.speechTime = Math.max(0, cop.speechTime - dt);
    if (cop.hp <= 0) { cop.hp = 0; cop.mode = 'retired'; cop.path = []; return; }
    brain.repath -= dt; brain.sense -= dt; brain.abandon -= dt;
    if (cop.mode === 'chase') { this.chase(cop, dt); return; }
    if (p.exposed && this.sees(cop, p)) { this.startChase(cop); return; }
    const noise = this.state.noise;
    if (noise && brain.heard !== this.noiseId && distance(cop, noise) < 11 && cop.mode !== 'inspect') {
      brain.heard = this.noiseId; cop.mode = 'investigate'; cop.targetId = null; cop.suspicion = 0; cop.timer = 6.5; brain.target = { x: noise.x, z: noise.z }; brain.goal = null;
      brain.noisePoint = { x: noise.x, z: noise.z }; brain.noiseEvidenceUntil = this.state.elapsed + 9;
      this.speak(cop, cop.id ? '听见了！我去看看。' : '那边有动静。');
    }
    if (brain.sense <= 0) { brain.sense = .25; this.perceive(cop); }
    if (cop.mode === 'observe') {
      if (cop.targetId !== null && brain.target) {
        cop.angle = facing(cop, brain.target); cop.timer -= dt;
        if (cop.timer <= 0) { cop.mode = 'inspect'; cop.timer = 1.75 + cop.id * .15; brain.goal = null; }
      } else {
        cop.timer -= dt; cop.angle = brain.look + Math.sin((1.5 - cop.timer) * 2.8) * 1.15;
        if (cop.timer <= 0) { cop.mode = 'patrol'; brain.goal = null; }
      }
      return;
    }
    if (cop.mode === 'inspect') { this.inspect(cop, dt); return; }
    if (cop.mode === 'investigate') {
      cop.timer -= dt;
      if (brain.target && distance(cop, brain.target) > .8) this.walk(cop, brain.target, 1.8, dt);
      else cop.angle += dt * .9;
      if (cop.timer <= 0) { cop.mode = 'patrol'; cop.targetId = null; brain.target = null; brain.goal = null; this.speak(cop, '只有风……换个地方看看。'); }
      return;
    }
    const route = this.map.routes[cop.id];
    if (!route?.length) return;
    const goal = route[cop.routeIndex % route.length];
    if (distance(cop, goal) < .7 || (brain.stalled > 1.8)) {
      cop.routeIndex = (cop.routeIndex + 1) % route.length; cop.mode = 'observe'; cop.targetId = null; cop.timer = 1.5; brain.look = cop.angle; brain.stalled = 0; brain.goal = null;
    } else this.walk(cop, goal, 1.55 + cop.id * .1, dt);
  }
  private perceive(cop: Cop): void {
    const p = this.state.player, brain = this.brains[cop.id];
    for (const key of Object.keys(cop.memory)) cop.memory[key] = Math.max(0, cop.memory[key] - 3.5);
    let best: { id: number; score: number; at: Vec; reason: string } | null = null;
    const consider = (id: number, at: Vec, value: number, reason: string) => {
      if (!this.sees(cop, at) || (cop.checked[String(id)] ?? -Infinity) > this.state.elapsed) return;
      const prior = cop.memory[String(id)] ?? 0;
      const soundBonus = brain.noisePoint && brain.noiseEvidenceUntil > this.state.elapsed && distance(at, brain.noisePoint) < 2.2 ? 27 : 0;
      const score = Math.min(100, Math.max(prior, value + soundBonus) + (prior > 0 ? 1.5 : 0));
      cop.memory[String(id)] = score;
      if ((!best || score > best.score) && score >= 46) best = { id, score, at, reason };
    };
    for (const prop of this.map.props) {
      const varied = ((prop.id * 17 + cop.id * 13) % 11) * 1.1;
      consider(prop.id, prop, 18 + prop.oddity * 55 + varied + Math.min(10, this.searchAge / 15), prop.oddity > .5 ? '这东西摆得有点奇怪。' : '等等，这个我还没检查过。');
    }
    const playerVisible = this.sees(cop, p);
    if (playerVisible && (p.moving || p.transformFlash > 0)) {
      brain.movementEvidenceUntil = this.state.elapsed + 7;
      delete cop.checked[String(PLAYER_ID)];
    }
    const fit = blendScore(this.map, p).score;
    const pValue = !p.kind ? 94 : p.moving ? 85 + (p.sprinting ? 13 : 0) : 18 + (100 - fit) * .64 + (p.transformFlash > 0 ? 50 : 0);
    consider(PLAYER_ID, p, pValue, p.moving ? '等等！刚才那个东西动了！' : !p.kind ? '那里有人！' : '这东西……原来就在这里吗？');
    if (cop.targetId === PLAYER_ID && this.sees(cop, p)) { brain.target = { x: p.x, z: p.z }; cop.suspicion = cop.memory[String(PLAYER_ID)] ?? cop.suspicion; }
    if (cop.mode === 'inspect' || (cop.mode === 'observe' && cop.targetId !== null) || brain.abandon > 0) return;
    // Explicit assignment avoids TypeScript's closure-narrowing limitation.
    const selected = best as { id: number; score: number; at: Vec; reason: string } | null;
    if (selected) {
      cop.targetId = selected.id; cop.suspicion = selected.score; cop.mode = 'observe'; cop.timer = .9; brain.target = { x: selected.at.x, z: selected.at.z }; brain.goal = null; brain.closeCounted = false;
      this.speak(cop, selected.reason, 3);
    } else if (this.sees(cop, p) && distance(cop, p) < 3 && !p.moving && p.kind && !brain.closeCounted) {
      brain.closeCounted = true; this.state.stats.closeCalls++; this.speak(cop, '嗯……看着倒挺正常。', 2.2);
    }
  }
  private inspect(cop: Cop, dt: number): void {
    const brain = this.brains[cop.id], p = this.state.player;
    if (!brain.target || cop.targetId === null) { cop.mode = 'patrol'; return; }
    const target = cop.targetId === PLAYER_ID ? p : this.map.props.find(prop => prop.id === cop.targetId);
    const visible = !!target && this.sees(cop, target);
    if (visible && target) brain.target = { x: target.x, z: target.z };
    if (distance(cop, brain.target) > 1.35 || !lineOfSight(this.map, cop, brain.target)) {
      this.walk(cop, brain.target, 1.9, dt);
      if (brain.stalled > 2.2) this.abandonTarget(cop, '绕不过去，先查别处。');
      return;
    }
    cop.angle = facing(cop, brain.target);
    if (!visible) { this.abandonTarget(cop, '咦？刚才那个东西呢？', true); return; }
    cop.timer -= dt; cop.suspicion = Math.min(100, cop.suspicion + dt * 15);
    if (cop.timer > 0) return;
    // Correctly placed, stationary disguises can survive a close visual inspection.
    if (cop.targetId === PLAYER_ID && p.kind && !p.moving && this.state.blend >= 70 && !p.exposed && p.transformFlash <= 0 && brain.movementEvidenceUntil < this.state.elapsed) {
      cop.checked[String(PLAYER_ID)] = this.state.elapsed + 8; cop.memory[String(PLAYER_ID)] = 10;
      this.state.stats.closeCalls++; this.abandonTarget(cop, '算了，应该只是个普通物件。'); return;
    }
    if (!target || distance(cop, target) > 1.8 || !lineOfSight(this.map, cop, target)) return;
    cop.attackFlash = .5;
    if (cop.targetId === PLAYER_ID) {
      if (!p.exposed) { p.exposed = true; p.escapeTime = 0; this.contactGrace = 1.6; this.emit('found', p, '被识破了！快跑，F 放烟幕', cop.id); }
      this.startChase(cop); this.speak(cop, '抓到会走路的物件了！快追！', 3);
    } else {
      cop.hp--; cop.hurtFlash = .8; cop.checked[String(cop.targetId)] = this.state.elapsed + 65; cop.memory[String(cop.targetId)] = 0;
      this.state.stats.mistakes++; this.emit('wrong', target, '判断错误 · −1', cop.id);
      if (cop.hp <= 0) { cop.mode = 'retired'; cop.targetId = null; cop.path = []; this.speak(cop, '十次全错……我先下班了。', 10); }
      else this.abandonTarget(cop, ['只是普通物件！扣一格……', '啧，猜错了。', '又误伤了，这里也太像了。'][Math.floor(this.random() * 3)]);
    }
  }
  private abandonTarget(cop: Cop, speech: string, investigate = false): void {
    const brain = this.brains[cop.id];
    cop.mode = investigate ? 'investigate' : 'patrol'; cop.targetId = null; cop.suspicion = 0; cop.timer = investigate ? 4 : 0;
    brain.abandon = 1.6; brain.goal = null; brain.stalled = 0; if (!investigate) brain.target = null;
    this.speak(cop, speech);
  }
  private startChase(cop: Cop): void {
    cop.mode = 'chase'; cop.targetId = PLAYER_ID; cop.suspicion = 100; cop.lastSeen = { x: this.state.player.x, z: this.state.player.z }; cop.unseenTime = 0;
    const brain = this.brains[cop.id]; brain.goal = null; brain.target = { ...cop.lastSeen };
  }
  private chase(cop: Cop, dt: number): void {
    const p = this.state.player, brain = this.brains[cop.id];
    if (this.sees(cop, p, true)) { cop.lastSeen = { x: p.x, z: p.z }; cop.unseenTime = 0; brain.target = { ...cop.lastSeen }; }
    else cop.unseenTime += dt;
    if (brain.target && distance(cop, brain.target) > .32) this.walk(cop, brain.target, 3.3, dt);
    else cop.angle += dt * 1.1;
    if (cop.unseenTime > 3.2) {
      cop.mode = 'investigate'; cop.targetId = null; cop.suspicion = 35; cop.timer = 6; brain.goal = null;
      this.speak(cop, '跟丢了！检查最后出现的位置。', 3);
    }
  }
  private walk(cop: Cop, goal: Vec, speed: number, dt: number): void {
    const brain = this.brains[cop.id];
    if (!brain.goal || distance(brain.goal, goal) > .8 || brain.repath <= 0) {
      cop.path = findPath(this.map, cop, goal); brain.goal = { ...goal }; brain.repath = cop.mode === 'chase' ? .45 : 1.8;
    }
    while (cop.path.length && distance(cop, cop.path[0]) < .14) cop.path.shift();
    if (!cop.path.length) { brain.stalled += dt; return; }
    const next = cop.path[0], d = distance(cop, next), step = Math.min(d, speed * dt);
    const moved = moveWithCollision(this.map, cop, (next.x - cop.x) / d * step, (next.z - cop.z) / d * step, .28);
    if (moved) { cop.angle = facing(brain.last, cop); brain.last = { x: cop.x, z: cop.z }; brain.stalled = 0; }
    else { brain.stalled += dt; brain.repath = Math.min(brain.repath, .1); }
  }
}
