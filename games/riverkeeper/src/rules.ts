import type { PlayerView, SnakeView } from './contracts.ts';

export interface ExpeditionEnvironment {
  depthAt(x: number, z: number): number;
  surfaceAt(x: number, z: number): number;
  terrainAt(x: number, z: number): number;
  basinLevels(): [number, number];
}

export type ExpeditionPhase = 'ready' | 'playing' | 'paused' | 'won' | 'sandbox';

interface Snake extends SnakeView {
  anchorX: number;
  anchorZ: number;
  awareness: number;
  warning: number;
  cooldown: number;
  patrolOffset: number;
}

const DRY_DEPTH = 0.045;
const RECOVERY_SECONDS = 10;
const IMMUNITY_SECONDS = 12;
const EPSILON = 1e-7;
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

/** Deterministic game rules. The renderer only consumes these public views. */
export class Expedition {
  player: PlayerView = { x: -4, z: -3, angle: 0, moving: false, health: 'healthy', recovery: 0 };
  snakes: Snake[] = [];
  phase: ExpeditionPhase = 'ready';
  elapsed = 0;
  edits = 0;
  bites = 0;
  holdProgress = 0;
  readonly objectiveDuration = 12;

  private immunity = 0;
  private resumePhase: 'playing' | 'sandbox' = 'playing';
  private pondsReady = false;
  private pendingEvents: string[] = [];

  constructor() {
    this.reset();
  }

  reset(): void {
    this.player = { x: -4, z: -3, angle: 0, moving: false, health: 'healthy', recovery: 0 };
    this.snakes = [this.createSnake(0, 1, 0), this.createSnake(0.55, 7, 2.4)];
    this.phase = 'ready';
    this.resumePhase = 'playing';
    this.elapsed = 0;
    this.edits = 0;
    this.bites = 0;
    this.holdProgress = 0;
    this.immunity = 0;
    this.pondsReady = false;
    this.pendingEvents = [];
  }

  start(): void {
    if (this.phase === 'ready') this.phase = 'playing';
  }

  pause(): void {
    if (this.phase !== 'playing' && this.phase !== 'sandbox') return;
    this.resumePhase = this.phase;
    this.phase = 'paused';
    this.player.moving = false;
  }

  resume(): void {
    if (this.phase === 'paused') this.phase = this.resumePhase;
  }

  continueSandbox(): void {
    if (this.phase === 'won') this.phase = 'sandbox';
  }

  canBuild(): boolean {
    return this.isRunning() && this.player.health === 'healthy';
  }

  recordEdit(): void {
    if (this.canBuild()) this.edits += 1;
  }

  bite(): boolean {
    if (!this.isRunning() || this.player.health !== 'healthy' || this.immunity > EPSILON) return false;
    this.player.health = 'bitten';
    this.player.recovery = RECOVERY_SECONDS;
    this.bites += 1;
    for (const snake of this.snakes) {
      snake.mood = 'calm';
      snake.awareness = 0;
      snake.warning = 0;
      snake.cooldown = 7;
    }
    this.pendingEvents.push('bite');
    return true;
  }

  update(dt: number, input: { x: number; z: number }, env: ExpeditionEnvironment): string[] {
    if (!this.isRunning() || !Number.isFinite(dt) || dt <= 0) return [];
    const events = this.pendingEvents.splice(0);
    // Short steps keep collision and warning timing reliable after a slow frame.
    let remaining = dt;
    while (remaining > EPSILON && this.isRunning()) {
      const step = Math.min(0.05, remaining);
      this.elapsed += step;
      this.immunity = Math.max(0, this.immunity - step);
      this.movePlayer(step, input, env);
      this.updateRecovery(step, env, events);
      this.updateSnakes(step, env, events);
      events.push(...this.pendingEvents.splice(0));
      this.updateObjective(step, env, events);
      remaining -= step;
    }
    return events;
  }

  private isRunning(): boolean {
    return this.phase === 'playing' || this.phase === 'sandbox';
  }

  private createSnake(x: number, z: number, patrolOffset: number): Snake {
    return { x, z, angle: 0, mood: 'calm', anchorX: x, anchorZ: z, awareness: 0, warning: 0, cooldown: 0, patrolOffset };
  }

  private movePlayer(dt: number, input: { x: number; z: number }, env: ExpeditionEnvironment): void {
    const x = Number.isFinite(input.x) ? input.x : 0;
    const z = Number.isFinite(input.z) ? input.z : 0;
    const magnitude = Math.hypot(x, z);
    this.player.moving = false;
    if (magnitude < EPSILON) return;
    const scale = 1 / Math.max(1, magnitude);
    const wet = env.depthAt(this.player.x, this.player.z) >= DRY_DEPTH;
    const speed = wet ? 2.55 : 4.2;
    const dx = x * scale * speed * dt;
    const dz = z * scale * speed * dt;
    const oldX = this.player.x;
    const oldZ = this.player.z;
    const nextX = clamp(oldX + dx, -10, 10);
    const nextZ = clamp(oldZ + dz, -12, 12);
    const height = env.terrainAt(oldX, oldZ);
    const canStep = (px: number, pz: number) => env.terrainAt(px, pz) - height <= 1.3;
    if (canStep(nextX, nextZ)) {
      this.player.x = nextX;
      this.player.z = nextZ;
    } else if (canStep(nextX, oldZ)) {
      this.player.x = nextX;
    } else if (canStep(oldX, nextZ)) {
      this.player.z = nextZ;
    }
    this.player.angle = Math.atan2(x, z);
    this.player.moving = Math.hypot(this.player.x - oldX, this.player.z - oldZ) > EPSILON;
  }

  private updateRecovery(dt: number, env: ExpeditionEnvironment, events: string[]): void {
    if (this.player.health === 'healthy') return;
    if (env.depthAt(this.player.x, this.player.z) >= DRY_DEPTH) {
      if (this.player.health === 'recovering') events.push('recovery-reset');
      this.player.health = 'bitten';
      this.player.recovery = RECOVERY_SECONDS;
      return;
    }
    if (this.player.health === 'bitten') {
      this.player.health = 'recovering';
      this.player.recovery = RECOVERY_SECONDS;
      events.push('recovery-start');
      return;
    }
    this.player.recovery = Math.max(0, this.player.recovery - dt);
    if (this.player.recovery <= EPSILON) {
      this.player.health = 'healthy';
      this.player.recovery = 0;
      this.immunity = IMMUNITY_SECONDS;
      events.push('recovered');
    }
  }

  private updateSnakes(dt: number, env: ExpeditionEnvironment, events: string[]): void {
    const playerWet = env.depthAt(this.player.x, this.player.z) >= DRY_DEPTH;
    const vulnerable = playerWet && this.player.health === 'healthy' && this.immunity <= EPSILON;
    for (const snake of this.snakes) {
      snake.cooldown = Math.max(0, snake.cooldown - dt);
      if (env.depthAt(snake.x, snake.z) < 0.025) {
        // A changing river can strand a swimmer. Retreat calmly to nearby water;
        // dry snakes never warn, pursue, or bite while making that journey.
        snake.mood = 'calm';
        snake.awareness = 0;
        snake.warning = 0;
        this.returnToWater(snake, dt, env);
        continue;
      }
      const distance = Math.hypot(this.player.x - snake.x, this.player.z - snake.z);
      if (!vulnerable || distance > 8) {
        snake.mood = 'calm';
        snake.awareness = 0;
        snake.warning = 0;
      } else if (snake.cooldown <= EPSILON) {
        if (snake.mood === 'calm') {
          snake.awareness = distance < 3.6 ? snake.awareness + dt : Math.max(0, snake.awareness - dt * 2);
          if (snake.awareness + EPSILON >= 3) {
            snake.mood = 'alert';
            snake.warning = 0;
            events.push('snake-alert');
          }
        } else if (snake.mood === 'alert') {
          if (distance > 5) {
            snake.mood = 'calm';
            snake.awareness = 0;
            snake.warning = 0;
          } else {
            snake.warning += dt;
            if (snake.warning + EPSILON >= 2) {
              snake.mood = 'chase';
              events.push('snake-chase');
            }
          }
        }
      }

      let targetX: number;
      let targetZ: number;
      let speed: number;
      if (snake.mood === 'chase') {
        targetX = this.player.x;
        targetZ = this.player.z;
        speed = 2.1;
      } else if (snake.mood === 'alert') {
        // The visible warning gives the player two full seconds to withdraw.
        snake.angle = Math.atan2(this.player.x - snake.x, this.player.z - snake.z);
        continue;
      } else {
        const cycle = this.elapsed * 0.52 + snake.patrolOffset;
        targetX = snake.anchorX + Math.sin(cycle) * 0.72;
        targetZ = snake.anchorZ + Math.cos(cycle) * 1.15;
        speed = 0.58;
      }
      this.swimToward(snake, targetX, targetZ, speed * dt, env);
      if (snake.mood === 'chase' && Math.hypot(this.player.x - snake.x, this.player.z - snake.z) <= 0.62) {
        this.bite();
      }
    }
  }

  private returnToWater(snake: Snake, dt: number, env: ExpeditionEnvironment): void {
    // Search outward so the first wet sample is also the nearest sampled refuge.
    for (let radius = 0.25; radius <= 3; radius += 0.25) {
      for (let direction = 0; direction < 24; direction++) {
        const angle = direction * Math.PI / 12;
        const targetX = clamp(snake.x + Math.sin(angle) * radius, -10, 10);
        const targetZ = clamp(snake.z + Math.cos(angle) * radius, -12, 12);
        if (env.depthAt(targetX, targetZ) < 0.025) continue;
        snake.angle = Math.atan2(targetX - snake.x, targetZ - snake.z);
        const distance = Math.min(0.4 * dt, Math.hypot(targetX - snake.x, targetZ - snake.z));
        snake.x += Math.sin(snake.angle) * distance;
        snake.z += Math.cos(snake.angle) * distance;
        if (env.depthAt(snake.x, snake.z) >= 0.025) {
          snake.anchorX = snake.x;
          snake.anchorZ = snake.z;
        }
        return;
      }
    }
  }

  private swimToward(snake: Snake, targetX: number, targetZ: number, distance: number, env: ExpeditionEnvironment): void {
    const desired = Math.atan2(targetX - snake.x, targetZ - snake.z);
    let best: { x: number; z: number; angle: number; score: number } | undefined;
    const step = Math.min(distance, Math.hypot(targetX - snake.x, targetZ - snake.z));
    if (step < EPSILON) return;
    // Probe headings instead of crossing dry banks while chasing a player.
    for (const offset of [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4, 2, -2, Math.PI]) {
      const angle = desired + offset;
      const x = clamp(snake.x + Math.sin(angle) * step, -10, 10);
      const z = clamp(snake.z + Math.cos(angle) * step, -12, 12);
      if (env.depthAt(x, z) < 0.025) continue;
      const score = Math.hypot(targetX - x, targetZ - z) + Math.abs(offset) * 0.008;
      if (!best || score < best.score) best = { x, z, angle, score };
    }
    if (best) {
      snake.x = best.x;
      snake.z = best.z;
      snake.angle = best.angle;
    }
  }

  private updateObjective(dt: number, env: ExpeditionEnvironment, events: string[]): void {
    if (this.phase !== 'playing') return;
    const [left, right] = env.basinLevels();
    const ready = left >= 0.12 && right >= 0.12;
    if (ready && !this.pondsReady) events.push('pond-ready');
    if (!ready && this.pondsReady) events.push('pond-lost');
    this.pondsReady = ready;
    this.holdProgress = ready ? Math.min(this.objectiveDuration, this.holdProgress + dt) : 0;
    if (this.holdProgress + EPSILON >= this.objectiveDuration) {
      this.holdProgress = this.objectiveDuration;
      this.phase = 'won';
      this.player.moving = false;
      events.push('won');
    }
  }
}
