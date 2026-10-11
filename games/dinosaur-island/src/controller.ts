import { MathUtils, Object3D, PerspectiveCamera, Vector2, Vector3 } from 'three';

/** Cheap static collision proxies; y is the base, height is the cylinder height. */
export interface IslandObstacle {
  x: number;
  z: number;
  radius: number;
  y?: number;
  height?: number;
  active?: boolean;
}

export interface DinosaurControllerOptions {
  /** Unscaled actor root. Its visual child should face local +Z. */
  target: Object3D;
  camera: PerspectiveCamera;
  domElement: HTMLElement;
  terrainHeight: (x: number, z: number) => number;
  obstacles?: readonly IslandObstacle[];
  spawn?: { x: number; z: number; heading?: number };
  waterLevel?: number;
  /** Prevents the actor entering water deeper than this distance. */
  allowedWaterDepth?: number;
  playerRadius?: number;
  groundOffset?: number;
  walkSpeed?: number;
  runSpeed?: number;
  cameraHeight?: number;
  cameraDistance?: number;
  minCameraDistance?: number;
  maxCameraDistance?: number;
  roarDuration?: number;
  onRoar?: () => void;
  waterDepth?: (x:number,z:number)=>number;
}

export interface DinosaurMotionState {
  action: 'idle' | 'walk' | 'run' | 'roar' | 'attack' | 'eat';
  /** Actual speed after coast and obstacle collisions, in world units/second. */
  speed: number;
  running: boolean;
  turning: boolean;
  heading: number;
  roarRemaining: number;
  wading: boolean;
}

/** A bounded V0 controller for a height-field island, with no physics dependency. */
export class DinosaurController {
  readonly state: DinosaurMotionState = {
    action: 'idle', speed: 0, running: false, turning: false,
    heading: Math.PI, roarRemaining: 0, wading:false,
  };

  private readonly options: DinosaurControllerOptions;
  private readonly keys = new Set<string>();
  private readonly touchDirection=new Vector2();
  private touchRunning=false;
  private readonly velocity = new Vector2();
  private readonly direction = new Vector2();
  private readonly focus = new Vector3();
  private readonly desiredCamera = new Vector3();
  private readonly ray = new Vector3();
  private readonly candidate = new Vector2();
  private readonly playerRadius: number;
  private readonly walkSpeed: number;
  private readonly runSpeed: number;
  private readonly groundOffset: number;
  private readonly waterFloor: number;
  private readonly cameraHeight: number;
  private readonly initialSpawn: { x: number; z: number; heading?: number };
  private enabled = true;
  private dragging = false;
  private pointerId: number | null = null;
  private pointerX = 0;
  private pointerY = 0;
  private azimuth = 0;
  private elevation = 0.27;
  private distance: number;
  private safeDistance: number;
  private disposed = false;
  private interaction: 'attack'|'eat'|null=null;
  private interactionRemaining=0;

  constructor(options: DinosaurControllerOptions) {
    this.options = options;
    this.playerRadius = options.playerRadius ?? 1.45;
    this.walkSpeed = options.walkSpeed ?? 4.6;
    this.runSpeed = options.runSpeed ?? 10.5;
    this.groundOffset = options.groundOffset ?? 0;
    this.waterFloor = (options.waterLevel ?? 0) - (options.allowedWaterDepth ?? 0.12);
    this.cameraHeight = options.cameraHeight ?? 3.1;
    this.distance = options.cameraDistance ?? 12;
    this.safeDistance = this.distance;
    this.initialSpawn = options.spawn ?? { x: options.target.position.x, z: options.target.position.z };

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.clearInput);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    options.domElement.addEventListener('pointerdown', this.onPointerDown);
    options.domElement.addEventListener('pointermove', this.onPointerMove);
    options.domElement.addEventListener('pointerup', this.onPointerUp);
    options.domElement.addEventListener('pointercancel', this.onPointerUp);
    options.domElement.addEventListener('lostpointercapture', this.onPointerUp);
    options.domElement.addEventListener('wheel', this.onWheel, { passive: false });
    options.domElement.addEventListener('contextmenu', this.onContextMenu);
    this.reset();
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) this.clearInput();
  }

  get isEnabled(): boolean { return this.enabled; }

  setTouchMovement(strafe:number,forward:number,running=false){
    if(!this.enabled||this.disposed||!Number.isFinite(strafe)||!Number.isFinite(forward))return;
    this.touchDirection.set(MathUtils.clamp(strafe,-1,1),MathUtils.clamp(forward,-1,1));this.touchRunning=running;
  }

  reset(spawn = this.initialSpawn): void {
    this.clearInput();
    const { target, terrainHeight } = this.options;
    target.position.set(spawn.x, terrainHeight(spawn.x, spawn.z) + this.groundOffset, spawn.z);
    this.state.heading = spawn.heading ?? Math.PI;
    target.rotation.y = this.state.heading;
    this.azimuth = this.state.heading + Math.PI;
    this.elevation = 0.27;
    this.velocity.set(0, 0);
    this.state.speed = 0;
    this.state.action = 'idle';
    this.state.running = false;
    this.state.turning = false;
    this.state.roarRemaining = 0;
    this.state.wading=false;
    this.interaction=null;this.interactionRemaining=0;
    this.focus.copy(target.position).y += this.cameraHeight;
    this.safeDistance = this.distance;
    this.updateCamera(1, true);
  }

  requestRoar(): boolean {
    if (!this.enabled || this.state.roarRemaining > 0 || this.interactionRemaining>0 || this.disposed) return false;
    this.state.roarRemaining = this.options.roarDuration ?? 2.8;
    this.state.action = 'roar';
    this.velocity.set(0, 0);
    this.options.onRoar?.();
    return true;
  }

  requestAction(action:'attack'|'eat',duration:number):boolean {
    if(!this.enabled||this.disposed||this.state.roarRemaining>0||this.interactionRemaining>0)return false;
    this.interaction=action;this.interactionRemaining=duration;this.state.action=action;this.velocity.set(0,0);return true;
  }

  get busy():boolean{return this.state.roarRemaining>0||this.interactionRemaining>0;}

  update(deltaSeconds: number): Readonly<DinosaurMotionState> {
    if (this.disposed || !this.enabled) return this.state;
    // Tab changes and frame stalls must never move the dinosaur across the island.
    const dt = MathUtils.clamp(deltaSeconds, 0, 0.05);
    if (dt === 0) return this.state;
    const { target, terrainHeight } = this.options;
    const oldX = target.position.x;
    const oldZ = target.position.z;
    const roaring = this.state.roarRemaining > 0;
    const interacting=this.interactionRemaining>0;
    this.interactionRemaining=Math.max(0,this.interactionRemaining-dt);
    this.state.roarRemaining = Math.max(0, this.state.roarRemaining - dt);
    const forward = Number(this.keys.has('KeyW') || this.keys.has('ArrowUp'))
      - Number(this.keys.has('KeyS') || this.keys.has('ArrowDown'))+this.touchDirection.y;
    const strafe = Number(this.keys.has('KeyD') || this.keys.has('ArrowRight'))
      - Number(this.keys.has('KeyA') || this.keys.has('ArrowLeft'))+this.touchDirection.x;
    this.direction.set(
      -Math.sin(this.azimuth) * forward + Math.cos(this.azimuth) * strafe,
      -Math.cos(this.azimuth) * forward - Math.sin(this.azimuth) * strafe,
    );
    if (roaring||interacting) this.direction.set(0, 0);
    const hasMovement = this.direction.lengthSq() > 0;
    const runRequested = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') || this.touchRunning;
    this.state.wading=(this.options.waterDepth?.(target.position.x,target.position.z)??0)>.15;
    const desiredSpeed = hasMovement ? (runRequested ? this.runSpeed : this.walkSpeed)*(this.state.wading?.52:1) : 0;
    this.direction.normalize();
    const acceleration = 1 - Math.exp(-(hasMovement ? 5 : 9) * dt);
    this.velocity.x = MathUtils.lerp(this.velocity.x, this.direction.x * desiredSpeed, acceleration);
    this.velocity.y = MathUtils.lerp(this.velocity.y, this.direction.y * desiredSpeed, acceleration);

    this.state.turning = false;
    if (hasMovement) {
      const desiredHeading = Math.atan2(this.direction.x, this.direction.y);
      const headingDelta = Math.atan2(Math.sin(desiredHeading - this.state.heading), Math.cos(desiredHeading - this.state.heading));
      this.state.turning = Math.abs(headingDelta) > 0.12;
      // A large animal takes a moment to turn; it never flips instantly at 180 degrees.
      this.state.heading += MathUtils.clamp(headingDelta, -2.9 * dt, 2.9 * dt);
      target.rotation.y = this.state.heading;
      // Slow translation while turning sharply to avoid sideways running.
      const alignment = 0.18 + 0.82 * Math.max(0, Math.cos(headingDelta));
      this.move(this.velocity.x * dt * alignment, this.velocity.y * dt * alignment);
    } else if (!roaring&&!interacting) {
      this.move(this.velocity.x * dt, this.velocity.y * dt);
    }

    const groundY = terrainHeight(target.position.x, target.position.z) + this.groundOffset;
    target.position.y = MathUtils.lerp(target.position.y, groundY, 1 - Math.exp(-18 * dt));
    // Never let smoothing sink feet below the height field when walking uphill.
    target.position.y = Math.max(target.position.y, groundY);
    this.state.speed = Math.hypot(target.position.x - oldX, target.position.z - oldZ) / dt;
    this.state.running = !roaring && this.state.speed > this.walkSpeed * 1.12;
    this.state.action = roaring ? 'roar' : interacting?this.interaction!:this.state.speed < 0.08 ? 'idle' : this.state.running ? 'run' : 'walk';
    this.updateCamera(dt);
    return this.state;
  }

  private move(dx: number, dz: number): void {
    const target = this.options.target;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / (this.playerRadius * 0.4)));
    for (let step = 0; step < steps; step++) {
      const startX = target.position.x;
      const startZ = target.position.z;
      this.candidate.set(startX + dx / steps, startZ + dz / steps);
      this.resolveObstacles(this.candidate);
      if (this.isWalkable(this.candidate.x, this.candidate.y)) {
        target.position.x = this.candidate.x;
        target.position.z = this.candidate.y;
        continue;
      }
      // Slide along coastlines instead of sticking when only one axis is blocked.
      this.candidate.set(startX + dx / steps, startZ);
      this.resolveObstacles(this.candidate);
      if (this.isWalkable(this.candidate.x, this.candidate.y)) {
        target.position.x = this.candidate.x;
        target.position.z = this.candidate.y;
      }
      this.candidate.set(target.position.x, target.position.z + dz / steps);
      this.resolveObstacles(this.candidate);
      if (this.isWalkable(this.candidate.x, this.candidate.y)) {
        target.position.x = this.candidate.x;
        target.position.z = this.candidate.y;
      }
    }
  }

  private isWalkable(x: number, z: number): boolean {
    const h = this.options.terrainHeight(x, z);
    const depth=this.options.waterDepth?.(x,z)??0;
    if (!Number.isFinite(h) || (h < this.waterFloor&&depth<=0) || depth>2) return false;
    for (const obstacle of this.options.obstacles ?? []) {
      if(obstacle.active===false)continue;
      const r = obstacle.radius + this.playerRadius - 0.015;
      if ((x - obstacle.x) ** 2 + (z - obstacle.z) ** 2 < r * r) return false;
    }
    return true;
  }

  private resolveObstacles(point: Vector2): void {
    // A few local relaxation passes handle overlapping rock/tree proxies.
    for (let pass = 0; pass < 3; pass++) {
      for (const obstacle of this.options.obstacles ?? []) {
        if(obstacle.active===false)continue;
        const dx = point.x - obstacle.x;
        const dz = point.y - obstacle.z;
        const radius = obstacle.radius + this.playerRadius;
        const lengthSq = dx * dx + dz * dz;
        if (lengthSq >= radius * radius) continue;
        const length = Math.sqrt(lengthSq);
        point.x = obstacle.x + (length > 1e-5 ? dx / length : 1) * radius;
        point.y = obstacle.z + (length > 1e-5 ? dz / length : 0) * radius;
      }
    }
  }

  private updateCamera(dt: number, snap = false): void {
    const { camera, target, terrainHeight } = this.options;
    const follow = snap ? 1 : 1 - Math.exp(-9 * dt);
    this.focus.x = MathUtils.lerp(this.focus.x, target.position.x, follow);
    this.focus.y = MathUtils.lerp(this.focus.y, target.position.y + this.cameraHeight, follow);
    this.focus.z = MathUtils.lerp(this.focus.z, target.position.z, follow);
    const horizontal = Math.cos(this.elevation);
    this.ray.set(Math.sin(this.azimuth) * horizontal, Math.sin(this.elevation), Math.cos(this.azimuth) * horizontal);
    let allowedDistance = this.distance;
    // Sample the line of sight against terrain and simple vertical collision proxies.
    const samples = Math.ceil(this.distance / 0.35);
    for (let i = 1; i <= samples; i++) {
      const along = (i / samples) * this.distance;
      const x = this.focus.x + this.ray.x * along;
      const y = this.focus.y + this.ray.y * along;
      const z = this.focus.z + this.ray.z * along;
      let collision = y < terrainHeight(x, z) + 0.45;
      if (!collision) {
        for (const obstacle of this.options.obstacles ?? []) {
          if(obstacle.active===false)continue;
          const base = obstacle.y ?? terrainHeight(obstacle.x, obstacle.z);
          if (y < base - 0.5 || y > base + (obstacle.height ?? 8) + 0.5) continue;
          if ((x - obstacle.x) ** 2 + (z - obstacle.z) ** 2 < (obstacle.radius + 0.4) ** 2) {
            collision = true;
            break;
          }
        }
      }
      if (collision) {
        allowedDistance = Math.max(0.6, along - 0.5);
        break;
      }
    }
    // Move inward immediately to prevent clipping; ease outward once clear.
    this.safeDistance = allowedDistance < this.safeDistance || snap
      ? allowedDistance : MathUtils.lerp(this.safeDistance, allowedDistance, 1 - Math.exp(-4 * dt));
    this.desiredCamera.copy(this.focus).addScaledVector(this.ray, this.safeDistance);
    this.desiredCamera.y = Math.max(this.desiredCamera.y, terrainHeight(this.desiredCamera.x, this.desiredCamera.z) + 0.45);
    camera.position.copy(this.desiredCamera);
    camera.lookAt(this.focus);
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.enabled || event.ctrlKey || event.metaKey || event.altKey || this.isTextInput(event.target)) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight', 'KeyR'].includes(event.code)) {
      event.preventDefault();
      this.keys.add(event.code);
    }
    if (event.code === 'KeyR' && !event.repeat) this.requestRoar();
  };

  private onKeyUp = (event: KeyboardEvent): void => { this.keys.delete(event.code); };

  private isTextInput(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (!this.enabled || (event.button !== 0 && event.button !== 2)) return;
    this.dragging = true;
    this.pointerId = event.pointerId;
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.options.domElement.setPointerCapture(event.pointerId);
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.enabled || !this.dragging || event.pointerId !== this.pointerId) return;
    this.azimuth -= (event.clientX - this.pointerX) * 0.004;
    this.elevation = MathUtils.clamp(this.elevation + (event.clientY - this.pointerY) * 0.0035, -0.08, 1.05);
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (event.pointerId !== this.pointerId) return;
    this.dragging = false;
    this.pointerId = null;
    if (this.options.domElement.hasPointerCapture(event.pointerId)) this.options.domElement.releasePointerCapture(event.pointerId);
  };

  private onWheel = (event: WheelEvent): void => {
    if (!this.enabled) return;
    event.preventDefault();
    this.distance = MathUtils.clamp(this.distance * Math.exp(MathUtils.clamp(event.deltaY, -150, 150) * 0.001),
      this.options.minCameraDistance ?? 6, this.options.maxCameraDistance ?? 23);
  };

  private onContextMenu = (event: Event): void => { event.preventDefault(); };
  private onVisibilityChange = (): void => { if (document.hidden) this.clearInput(); };
  private clearInput = (): void => {
    this.keys.clear();
    this.touchDirection.set(0,0);this.touchRunning=false;
    this.velocity.set(0, 0);
    this.dragging = false;
    if (this.pointerId !== null && this.options.domElement.hasPointerCapture(this.pointerId)) this.options.domElement.releasePointerCapture(this.pointerId);
    this.pointerId = null;
  };

  dispose(): void {
    this.disposed = true;
    this.clearInput();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.clearInput);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    const el = this.options.domElement;
    el.removeEventListener('pointerdown', this.onPointerDown);
    el.removeEventListener('pointermove', this.onPointerMove);
    el.removeEventListener('pointerup', this.onPointerUp);
    el.removeEventListener('pointercancel', this.onPointerUp);
    el.removeEventListener('lostpointercapture', this.onPointerUp);
    el.removeEventListener('wheel', this.onWheel);
    el.removeEventListener('contextmenu', this.onContextMenu);
  }
}
