import type * as THREE from 'three';

export interface SeaFrame {
  time: number; dt: number; camera: THREE.PerspectiveCamera;
  boatPosition: THREE.Vector3; boatHeading: number; speed: number;
  underwater: boolean; depth: number;
}
export interface SharkFrame {
  time: number; dt: number; boatPosition: THREE.Vector3; boatHeading: number; speed: number;
  cagePosition: THREE.Vector3; cageDepth: number; inCage: boolean; progress: number;
  safeHarbor?:boolean;
}
export type SharkEvent = {type:'splash'|'breach'|'threat'|'impact'|'hit'|'kill'; position:THREE.Vector3; amount?:number; target?:'boat'|'cage'; message?:string};
export interface SharkInfo { id:number; position:THREE.Vector3; heading:number; health:number; state:string; length:number; }
export type SharkEvents = (event:SharkEvent)=>void;
