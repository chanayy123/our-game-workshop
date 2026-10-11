export interface Island {id:number;name:string;x:number;z:number;radius:number;side:number;dockX:number;landingX:number;}
export const ISLANDS:Island[]=[[-65,220,30,'漂木岛'],[74,670,34,'海松岛'],[-70,1120,32,'避风岛'],[66,1510,29,'北岬林岛']].map(([x,z,r,name],id)=>{
  const side=-(Math.sign(Number(x)));return {id,name:String(name),x:Number(x),z:Number(z),radius:Number(r),side,dockX:Number(x)+side*(Number(r)+10),landingX:Number(x)+side*(Number(r)*.67)};
});
export function landHeight(island:Island,x:number,z:number){
  const dx=x-island.x,dz=z-island.z,r=Math.hypot(dx,dz)/island.radius;
  const base=1.25+Math.max(0,1-r*r)*3.2;
  return base+Math.sin(dx*.16)*Math.sin(dz*.14)*Math.max(0,1-r)*1.2;
}
export function treeLocations(island:Island){
  return Array.from({length:9},(_,i)=>{
    const angle=i*2.399+island.id*.7;
    const radius=i===0?island.radius*.48:8+(i%4)*3.7;
    return {id:island.id*9+i,islandId:island.id,x:i===0?island.x+island.side*radius:island.x+Math.sin(angle)*radius,z:i===0?island.z:island.z+Math.cos(angle)*radius};
  });
}
export const TREES=ISLANDS.flatMap(treeLocations);

export function seabedHeight(x:number,z:number){return -58+Math.sin(x*.007+z*.004)*8+Math.sin(z*.019)*4+Math.sin(x*.027+z*.016)*2.5;}
