export type GamePhase = 'ready' | 'running' | 'paused' | 'won' | 'lost';
export type EntityKind = 'fish' | 'pearl' | 'cone' | 'log' | 'shell';

export interface RouteEntity {
  id: number;
  kind: EntityKind;
  lane: number;
  distance: number;
  active: boolean;
  /** Optional pickup centre above the road, in scene world units. */
  height?: number;
}

export interface GameState {
  phase: GamePhase;
  distance: number;
  totalDistance: number;
  speed: number;
  score: number;
  fish: number;
  pearls: number;
  jumpsCleared: number;
  maxCombo: number;
  comboRemaining: number;
  boostCount: number;
  hits: number;
  finishBonus: number;
  medal: 'none' | 'bronze' | 'silver' | 'gold';
  braking: boolean;
  hitSlowdown: number;
  lives: number;
  lane: number;
  lanePosition: number;
  jumpHeight: number;
  jumpCooldown: number;
  combo: number;
  multiplier: number;
  boostCharge: number;
  boostRemaining: number;
  invulnerable: number;
  shield: boolean;
  stage: number;
  entities: RouteEntity[];
  elapsed: number;
}

export interface GameEvent {
  type: 'fish' | 'pearl' | 'hit' | 'jump' | 'land' | 'comboLost' | 'boost' | 'stage' | 'win' | 'lose' | 'shell' | 'nearMiss';
  /** Fish/near-miss points; hit damage (0 = shield absorbed it); stage index. */
  value?: number;
}

export const STAGES = [
  { name: 'Palm promenade', start: 0, end: 300, speed: 9 },
  { name: 'Driftwood bay', start: 300, end: 600, speed: 10.2 },
  { name: 'Lighthouse climb', start: 600, end: 900, speed: 11.4 },
] as const;

const ROUTE_LENGTH = 900;
const JUMP_DURATION = 0.9;
const JUMP_COOLDOWN = JUMP_DURATION + 0.06;
const COMBO_DURATION = 6;
const BOOST_DURATION = 4;
const COLLISION_RADIUS = 0.38;
const PICKUP_RADIUS = 0.47;

/** Learnable phrases, not random walls. Fish mark safety; pearls mark a jump route. */
function createRoute(): RouteEntity[] {
  const entities: RouteEntity[] = [];
  const add = (kind: EntityKind, lane: number, distance: number, height?: number) => {
    entities.push({ id: entities.length, kind, lane, distance, active: true, ...(height === undefined ? {} : { height }) });
  };
  type Pattern = 'intro' | 'slalom' | 'gate' | 'double' | 'recovery';
  // Distance, clear lane, phrase. The opening gives time to learn each control.
  const phrases: [number, number, Pattern][] = [
    [32, 0, 'intro'], [78, 1, 'gate'], [122, -1, 'slalom'],
    [166, 0, 'gate'], [210, 1, 'recovery'], [250, 0, 'double'], [286, -1, 'gate'],
    [326, 1, 'double'], [362, 0, 'gate'], [398, -1, 'slalom'], [434, 1, 'gate'],
    [470, 0, 'recovery'], [506, -1, 'gate'], [542, 1, 'double'], [578, 0, 'gate'],
    [614, -1, 'double'], [646, 0, 'gate'], [678, 1, 'double'], [710, 0, 'gate'],
    [742, -1, 'recovery'], [774, 0, 'gate'], [806, 1, 'double'], [838, 0, 'gate'], [870, -1, 'gate'],
  ];
  for (const [distance, clearLane, pattern] of phrases) {
    const blocked = [-1, 0, 1].filter(lane => lane !== clearLane);
    if (pattern === 'gate') {
      // Adjacent detours leave twelve metres before and eight after to rejoin.
      const jumpLane = clearLane === 0 ? (distance % 4 ? 1 : -1) : 0;
      add('log', jumpLane, distance);
      add('pearl', jumpLane, distance, 2.25);
      if (distance > 100) add('cone', blocked.find(lane => lane !== jumpLane)!, distance);
      for (const offset of [-20, -12, 8]) add('fish', clearLane, distance + offset);
    } else {
      add('cone', pattern === 'intro' ? -1 : blocked[0], distance);
      if (pattern === 'double') add('cone', blocked[1], distance);
      for (const offset of [-20, -12, -4, 8]) add('fish', clearLane, distance + offset);
    }
    if (pattern === 'recovery') add('shell', clearLane, distance + 12);
  }
  return entities.sort((a, b) => a.distance - b.distance || a.id - b.id);
}

function initialState(): GameState {
  return {
    phase: 'ready', distance: 0, totalDistance: ROUTE_LENGTH, speed: 0,
    score: 0, fish: 0, lives: 3, lane: 0, lanePosition: 0,
    pearls: 0, jumpsCleared: 0, maxCombo: 0, comboRemaining: 0,
    boostCount: 0, hits: 0, finishBonus: 0, medal: 'none', braking: false, hitSlowdown: 0,
    jumpHeight: 0, jumpCooldown: 0, combo: 0, multiplier: 1,
    boostCharge: 0, boostRemaining: 0, invulnerable: 0, shield: false,
    stage: 0, entities: createRoute(), elapsed: 0,
  };
}

/** Pure game simulation. Rendering, sound, and controls subscribe to its events. */
export class BicycleGame {
  readonly state: GameState = initialState();
  private jumpElapsed = -1;
  private jumpBuffer = 0;
  private nextEntity = 0;

  constructor(private readonly onEvent: (event: GameEvent) => void = () => {}) {}

  start(): void {
    if (this.state.phase === 'running' || this.state.phase === 'paused') return;
    this.restart();
  }

  restart(): void {
    // Preserve state identity so UI and scene references survive every restart.
    Object.assign(this.state, initialState());
    this.jumpElapsed = -1;
    this.jumpBuffer = 0;
    this.nextEntity = 0;
    this.state.phase = 'running';
    this.state.speed = STAGES[0].speed;
  }

  togglePause(): void {
    if (this.state.phase === 'running') this.pause();
    else if (this.state.phase === 'paused') {
      this.state.phase = 'running';
      this.state.speed = this.currentSpeed();
    }
  }

  pause(): void {
    if (this.state.phase !== 'running') return;
    this.state.phase = 'paused';
    this.state.speed = 0;
    this.state.braking = false;
  }

  steer(direction: -1 | 1): void {
    if (this.state.phase !== 'running') return;
    this.state.lane = Math.max(-1, Math.min(1, this.state.lane + direction));
  }

  jump(): void {
    if (this.state.phase !== 'running') return;
    if (this.state.jumpCooldown > 0) {
      // A single press just before landing survives the small ground recovery.
      if (this.jumpElapsed >= JUMP_DURATION - .15 || (this.jumpElapsed < 0 && this.state.jumpCooldown <= .15)) this.jumpBuffer = .24;
      return;
    }
    this.beginJump();
  }

  private beginJump(): void {
    this.jumpBuffer = 0;
    this.jumpElapsed = 0;
    this.state.jumpHeight = 0.01;
    this.state.jumpCooldown = JUMP_COOLDOWN;
    this.onEvent({ type: 'jump' });
  }

  setBraking(braking: boolean): void {
    if (this.state.phase !== 'running') return;
    // Braking always responds; the cost of a safety correction is the tailwind.
    if (braking) this.state.boostRemaining = 0;
    this.state.braking = braking;
    this.state.speed = this.currentSpeed();
  }

  boost(): void {
    if (this.state.phase !== 'running' || this.state.boostCharge < 100 || this.state.boostRemaining > 0) return;
    this.state.boostCharge = 0;
    this.state.boostRemaining = BOOST_DURATION;
    this.state.boostCount++;
    this.state.braking = false;
    this.state.speed = this.currentSpeed();
    this.onEvent({ type: 'boost', value: BOOST_DURATION });
  }

  update(dt: number): void {
    if (this.state.phase !== 'running' || !Number.isFinite(dt) || dt <= 0) return;
    // A suspended browser must not fast-forward the rider into unseen hazards.
    let remaining = Math.min(dt, 0.25);
    while (remaining > 0 && this.state.phase === 'running') {
      const step = Math.min(remaining, 1 / 120);
      this.step(step);
      remaining -= step;
    }
  }

  private currentSpeed(): number {
    const state = this.state;
    const recovery = state.hitSlowdown > 0 ? 1 - .45 * state.hitSlowdown / .7 : 1;
    return STAGES[state.stage].speed * (state.boostRemaining > 0 ? 1.5 : state.braking ? .65 : 1) * recovery;
  }

  private extendCombo(): void {
    const state = this.state;
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    state.multiplier = Math.min(4, 1 + Math.floor(state.combo / 5));
    state.comboRemaining = COMBO_DURATION;
  }

  private clearCombo(): void {
    const state = this.state;
    const previousCombo = state.combo;
    state.combo = 0;
    state.multiplier = 1;
    state.comboRemaining = 0;
    if (previousCombo > 0) this.onEvent({ type: 'comboLost', value: previousCombo });
  }

  private award(base: number): number {
    const points = base * this.state.multiplier * (this.state.boostRemaining > 0 ? 2 : 1);
    this.state.score += points;
    return points;
  }

  private step(dt: number): void {
    const state = this.state;
    const previousDistance = state.distance;
    const previousLane = state.lanePosition;
    const previousHeight = state.jumpHeight;
    const previousComboRemaining = state.comboRemaining;
    state.elapsed += dt;
    state.speed = this.currentSpeed();
    state.distance = Math.min(state.totalDistance, state.distance + state.speed * dt);
    state.score += Math.floor(state.distance) - Math.floor(previousDistance);
    state.lanePosition += (state.lane - state.lanePosition) * (1 - Math.exp(-13 * dt));
    state.jumpCooldown = Math.max(0, state.jumpCooldown - dt);
    state.invulnerable = Math.max(0, state.invulnerable - dt);
    state.boostRemaining = Math.max(0, state.boostRemaining - dt);
    state.hitSlowdown = Math.max(0, state.hitSlowdown - dt);
    this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);
    if (state.comboRemaining > 0) {
      state.comboRemaining = Math.max(0, state.comboRemaining - dt);
    }

    if (this.jumpElapsed >= 0) {
      this.jumpElapsed += dt;
      if (this.jumpElapsed >= JUMP_DURATION) {
        this.jumpElapsed = -1;
        state.jumpHeight = 0;
        this.onEvent({ type: 'land' });
      } else {
        const progress = this.jumpElapsed / JUMP_DURATION;
        state.jumpHeight = 4 * progress * (1 - progress);
      }
    }

    // Interpolate the actual lane/height at the crossing, never the input target.
    while (this.nextEntity < state.entities.length && state.entities[this.nextEntity].distance <= state.distance) {
      const entity = state.entities[this.nextEntity++];
      if (!entity.active) continue;
      entity.active = false;
      const fraction = Math.max(0, Math.min(1, (entity.distance - previousDistance) / (state.distance - previousDistance || 1)));
      const lane = previousLane + (state.lanePosition - previousLane) * fraction;
      const height = previousHeight + (state.jumpHeight - previousHeight) * fraction;
      // A pickup just before the deadline keeps flow, even when both events
      // happen inside one simulation step. Later pickups start a fresh chain.
      if (state.combo > 0 && state.comboRemaining <= 1e-8 && fraction * dt > previousComboRemaining + 1e-8) this.clearCombo();
      this.crossEntity(entity, lane, height);
      if (state.phase !== 'running') return;
    }
    if (state.combo > 0 && state.comboRemaining <= 1e-8) this.clearCombo();

    const stage = Math.min(2, Math.floor(state.distance / 300));
    if (stage !== state.stage) {
      state.stage = stage;
      this.onEvent({ type: 'stage', value: stage });
    }
    state.speed = this.currentSpeed();
    if (this.jumpBuffer > 0 && state.jumpCooldown <= 0 && this.jumpElapsed < 0) this.beginJump();

    if (state.distance >= state.totalDistance) {
      state.phase = 'won';
      state.speed = 0;
      state.jumpHeight = 0;
      state.braking = false;
      state.finishBonus = 1000 + state.lives * 250 + Math.floor(Math.max(0, 100 - state.elapsed) * 35);
      state.score += state.finishBonus;
      state.medal = state.lives >= 2 && state.pearls >= 5 && state.score >= 18000 ? 'gold' : state.score >= 11000 ? 'silver' : 'bronze';
      this.onEvent({ type: 'win', value: state.score });
    }
  }

  private crossEntity(entity: RouteEntity, lane: number, height: number): void {
    const state = this.state;
    const separation = Math.abs(entity.lane - lane);
    if (entity.kind === 'fish' || entity.kind === 'pearl' || entity.kind === 'shell') {
      if (separation > PICKUP_RADIUS) return;
      if (entity.kind === 'fish' || entity.kind === 'pearl') {
        if (entity.kind === 'pearl' && height < .38) return;
        const pearl = entity.kind === 'pearl';
        if (pearl) state.pearls++; else state.fish++;
        this.extendCombo();
        const points = this.award(pearl ? 350 : 100);
        state.boostCharge = Math.min(100, state.boostCharge + (pearl ? 25 : 12.5));
        this.onEvent({ type: entity.kind, value: points });
      } else {
        state.shield = true;
        this.onEvent({ type: 'shell' });
      }
      return;
    }

    const clearedLog = entity.kind === 'log' && height >= .38;
    if (separation <= COLLISION_RADIUS && !clearedLog) {
      if (state.invulnerable > 0) return;
      state.invulnerable = 1.8;
      if (state.shield) {
        state.shield = false;
        this.onEvent({ type: 'hit', value: 0 });
        return;
      }
      state.lives--;
      state.hits++;
      state.hitSlowdown = .7;
      this.clearCombo();
      this.onEvent({ type: 'hit', value: 1 });
      if (state.lives <= 0) {
        state.phase = 'lost';
        state.speed = 0;
        state.jumpHeight = 0;
        state.braking = false;
        this.onEvent({ type: 'lose', value: state.score });
      }
    } else if ((clearedLog && separation <= COLLISION_RADIUS) || (separation > COLLISION_RADIUS && separation < 0.7)) {
      const jumpClear = clearedLog && separation <= COLLISION_RADIUS;
      if (jumpClear) { state.jumpsCleared++; this.extendCombo(); }
      const points = this.award(jumpClear ? 200 : 75);
      this.onEvent({ type: 'nearMiss', value: points });
    }
  }
}
