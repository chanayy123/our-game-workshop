/** Metres; one deterministic, bounded island. Shared by rendering and locomotion. */
export const ISLAND_SIZE = 420;
export const WATER_LEVEL = 0;
export function smoothstep(a: number, b: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
export function islandHeight(x: number, z: number): number {
  const coast = Math.sqrt((x / 153) ** 2 + (z / 171) ** 2);
  const edge = 1 - smoothstep(0.70, 1.02, coast);
  const ridge = 39 * Math.exp(-((x + 51) ** 2 / 2600 + (z + 65) ** 2 / 2500))
    + 53 * Math.exp(-((x - 31) ** 2 / 1900 + (z + 93) ** 2 / 1250))
    + 17 * Math.exp(-((x + 92) ** 2 / 1200 + (z - 5) ** 2 / 2500));
  const detail = Math.sin(x * .039 + z * .014) * 1.9 + Math.sin(z * .081 - x * .034) * 1.1
    + Math.sin(x * .18 + Math.cos(z * .07)) * Math.sin(z * .16) * .36;
  return -3.6 + edge * (8.7 + ridge + detail);
}
export function riverCenter(z:number):number { return 18+12*Math.sin(z*.035); }
export function riverHalfWidth(z:number):number { return (4.8+Math.sin(z*.06)**2*1.2)*smoothstep(-28,-12,z)*(1-smoothstep(148,159,z)); }
export function riverSurface(z:number):number { return Math.max(.055,(150-z)*.042); }
export function terrainHeight(x:number,z:number):number {
  const original=islandHeight(x,z),width=riverHalfWidth(z);
  if(width<.05)return original;
  const distance=Math.abs(x-riverCenter(z));
  const blend=1-smoothstep(width*.48,width+4,distance);
  const bed=riverSurface(z)-1.35+.15*Math.sin(z*.12);
  return original+(Math.min(original,bed)-original)*blend;
}
export function riverDepth(x:number,z:number):number {
  if(riverHalfWidth(z)<.05||Math.abs(x-riverCenter(z))>riverHalfWidth(z))return 0;
  return Math.max(0,riverSurface(z)-terrainHeight(x,z));
}
export function trailX(z: number): number { return 15 + Math.sin(z * .043) * 15; }
export function trailDistance(x: number, z: number): number { return Math.abs(x - trailX(z)); }
export function randomGenerator(seed = 7812): () => number {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
