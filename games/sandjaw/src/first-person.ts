/** Horizontal movement in world space. A heading of PI faces north (-Z). */
export function relativeMovement(forward:number,strafe:number,heading:number){
  return {x:Math.sin(heading)*forward-Math.cos(heading)*strafe,z:Math.cos(heading)*forward+Math.sin(heading)*strafe};
}
export function turnView(heading:number,pitch:number,dx:number,dy:number,sensitivity=.0022){
  return {heading:Math.atan2(Math.sin(heading-dx*sensitivity),Math.cos(heading-dx*sensitivity)),pitch:Math.max(-1.12,Math.min(1.08,pitch-dy*sensitivity))};
}
export function bearing(heading:number){return ((Math.PI-heading)*180/Math.PI%360+360)%360;}
export function relativeBearing(heading:number,x:number,z:number){return Math.atan2(Math.sin(Math.atan2(x,z)-heading),Math.cos(Math.atan2(x,z)-heading));}
