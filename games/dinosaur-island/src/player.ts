import {createDinosaur,type DinosaurState} from './dinosaur';
import {createAnimal} from './animals';
import {terrainHeight} from './terrain';
import type {Group} from 'three';

export type PlayerKind='trex'|'raptor';
export const PLAYABLE={
  trex:{name:'霸王龙',latin:'TYRANNOSAURUS REX',walk:3.2,run:9.2,radius:1.25,cameraHeight:3.5,cameraDistance:15},
  raptor:{name:'迅猛龙',latin:'VELOCIRAPTOR',walk:4.4,run:12,radius:.7,cameraHeight:1.6,cameraDistance:10},
};
export type PlayerVisual={root:Group;clips:string[];actionDurations:Record<string,number>;update:(dt:number,state:DinosaurState)=>void;getPoseMetrics:()=>Record<string,number|boolean|string>};
export async function createPlayer(kind:PlayerKind):Promise<PlayerVisual>{
  if(kind==='trex')return createDinosaur({terrain:terrainHeight});
  const animal=await createAnimal('raptor',5.2);
  return {root:animal.root,clips:animal.clips,actionDurations:{roar:4},
    getPoseMetrics:()=>({rigReady:true,animation:animal.currentAction()}),
    update(dt,state){animal.update(dt,{mode:state.action==='run'?'run':state.action==='walk'?'walk':'idle',speed:state.speed,alive:state.action!=='dead',action:state.action});},
  };
}
