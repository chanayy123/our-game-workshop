export type Tool = 'rock' | 'soil' | 'dig' | 'remove';
export type Health = 'healthy' | 'bitten' | 'recovering';
export interface PlayerView { x: number; z: number; angle: number; moving: boolean; health: Health; recovery: number; }
export interface SnakeView { x: number; z: number; angle: number; mood: 'calm' | 'alert' | 'chase'; }
export interface WorldFrame { player: PlayerView; snakes: SnakeView[]; hover: { index: number; tool: Tool; valid: boolean } | null; paused: boolean; }
