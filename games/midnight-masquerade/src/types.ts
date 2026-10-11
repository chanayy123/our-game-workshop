export type Vec = { x: number; z: number };
export type PropKind = 'pot' | 'crate' | 'bin' | 'barrel' | 'chair' | 'table' | 'lamp';
export type Zone = 'cafe' | 'garden' | 'cargo' | 'plaza';
export interface Prop extends Vec { id: number; kind: PropKind; angle: number; zone: Zone; oddity: number }
export interface Wall extends Vec { w: number; d: number; h: number; style: 'hedge' | 'brick' | 'stall' }
export interface MapData { props: Prop[]; walls: Wall[]; routes: Vec[][]; spawn: Vec; bounds: { x: number; z: number } }
export type Phase = 'intro' | 'prepare' | 'search' | 'won' | 'lost';
export type Role = 'hider' | 'police';
export interface PoliceControls { attackCooldown: number; whistleCooldown: number; stamina: number; clue: string; clueTime: number; captureProgress: number }
export type CopMode = 'patrol' | 'observe' | 'inspect' | 'chase' | 'investigate' | 'retired';
export interface Player extends Vec { kind: PropKind | null; angle: number; moving: boolean; sprinting: boolean; exposed: boolean; stamina: number; smokeCharges: number; smokeTime: number; noiseCooldown: number; transformFlash: number; stillTime: number; escapeTime: number }
export interface Cop extends Vec { id: number; name: string; hp: number; angle: number; mode: CopMode; targetId: number | null; suspicion: number; timer: number; routeIndex: number; path: Vec[]; lastSeen: Vec | null; unseenTime: number; attackFlash: number; hurtFlash: number; speech: string; speechTime: number; memory: Record<string, number>; checked: Record<string, number> }
export interface GameEvent extends Vec { id: number; type: 'transform' | 'wrong' | 'found' | 'smoke' | 'noise' | 'escape' | 'win' | 'lose' | 'step'; text: string; copId?: number }
export interface GameState { role: Role; police: PoliceControls; phase: Phase; time: number; elapsed: number; round: number; player: Player; cops: Cop[]; events: GameEvent[]; suspicion: number; blend: number; blendText: string; result: string; stats: { mistakes: number; escapes: number; transforms: number; closeCalls: number }; noise: (Vec & { time: number }) | null }
export interface Input { x: number; z: number; sprint: boolean }
export interface Simulation { state: GameState; map: MapData; start(role?: Role): void; beginSearch(): void; update(dt: number, input: Input): void; transform(id?: number): boolean; rotate(): void; smoke(): boolean; distract(at?: Vec): boolean; nearestProp(): Prop | null; reset(): void }
