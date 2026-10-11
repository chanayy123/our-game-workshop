import type { MapData, Prop, PropKind, Vec, Wall, Zone } from './types.ts';
export const PROP_NAMES: Record<PropKind,string> = { pot:'花盆',crate:'木箱',bin:'垃圾桶',barrel:'木桶',chair:'椅子',table:'咖啡桌',lamp:'路灯' };
export const PROP_RADIUS: Record<PropKind,number> = {pot:.38,crate:.48,bin:.42,barrel:.43,chair:.4,table:.72,lamp:.32};
export function zoneAt(p: Vec): Zone { return p.x < -2 ? (p.z < 1 ? 'cafe' : 'cargo') : p.x > 3 && p.z < 2 ? 'garden' : 'plaza'; }
export function createMap(): MapData {
 const props:Prop[]=[];
 const add=(kind:PropKind,x:number,z:number,angle=0,oddity=0)=>props.push({id:props.length,kind,x,z,angle,zone:zoneAt({x,z}),oddity});
 for(const [x,z] of [[-10,-6],[-5.5,-6],[-10,-2.3],[-5.5,-2.3]]) {add('table',x,z);add('chair',x-1.2,z,Math.PI/2);add('chair',x+1.2,z,-Math.PI/2);}
 for(const [x,z] of [[-12.8,-9.7],[-8,-9.7],[-3.3,-9.7],[-12.8,-.2],[-3.2,-.2],[5,-9.5],[9,-9.5],[12.5,-9.5],[12.5,-5],[5,-5.3],[8.5,-3],[12.5,-1]])add('pot',x,z);
 for(const [x,z] of [[-12,4],[-11,4],[-10,4],[-12,5.1],[-6,5],[-5,5],[-4,5],[-5,6],[-12,8.8],[-10.9,8.8]])add('crate',x,z);
 for(const [x,z] of [[-8,8],[-9,8],[-3.8,9.2],[-3.8,8.2],[11,7.6],[12,7.6]])add('barrel',x,z);
 for(const [x,z] of [[-12.7,1.6],[-2.8,3.6],[3,9.6],[12.4,4.2],[4.7,-.5]])add('bin',x,z);
 for(const [x,z] of [[-1,-9.5],[-1,1],[2,9],[12.5,-7.5],[10,3.1]])add('lamp',x,z);
 add('chair',1.8,-3.8,.5, .8);add('pot',-7.7,5.4,0,.65);add('crate',7.7,-7.3,.3,.72);add('bin',8.8,6.1,.35,.62);add('barrel',-.8,5.5,0,.6);
 const walls:Wall[]=[
 {x:-8,z:-11,w:12,d:1,h:2.7,style:'stall'}, {x:8.5,z:-11,w:10,d:1,h:2,style:'brick'},
 {x:-14,z:-4,w:.6,d:13,h:1,style:'brick'}, {x:14,z:0,w:.6,d:21,h:1.2,style:'brick'},
 {x:-8,z:1.3,w:7,d:.7,h:1.35,style:'hedge'}, {x:-2.7,z:-5,w:.6,d:6,h:1.3,style:'brick'},
 {x:4,z:-6.5,w:.7,d:5.5,h:1.55,style:'hedge'}, {x:9,z:-.2,w:6,d:.8,h:1.5,style:'hedge'},
 {x:-8,z:10.8,w:12,d:.8,h:1.6,style:'brick'}, {x:-8,z:6.5,w:3.5,d:1.5,h:1.9,style:'stall'},
 {x:7,z:6,w:2.1,d:2.1,h:1.1,style:'brick'}];
 return {props,walls,spawn:{x:0,z:7.5},bounds:{x:13.4,z:10.3},routes:[
 [{x:1,z:10},{x:1,z:3},{x:-3,z:1},{x:-11,z:-.7},{x:-11,z:-8},{x:-4,z:-8},{x:1,z:-7},{x:7,z:-8},{x:11,z:-3},{x:11,z:3},{x:4,z:8}],
 [{x:4,z:10},{x:10,z:9},{x:11,z:2},{x:11.2,z:-5},{x:7,z:-8},{x:1,z:-9},{x:1,z:0},{x:-4,z:3},{x:-11,z:6.5},{x:-5,z:9},{x:0,z:6}]]};
}
