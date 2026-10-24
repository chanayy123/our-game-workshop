import * as THREE from 'three';
import { createDinosaur, type Dinosaur } from './dinosaur';
import { terrainHeight } from './terrain';
import { type SurvivalSimulation } from './survival';
import { createAnimal, type AnimalVisual } from './animals';
import { isHuntable } from './species';
import { createPterosaur } from './pterosaur';

export class Wildlife {
  private visuals=new Map<string,{root:THREE.Group;dinosaur?:Dinosaur;animal?:AnimalVisual;pterosaur?:ReturnType<typeof createPterosaur>;marker?:THREE.Mesh}>();
  diagnostics(){return [...this.visuals].map(([id,v])=>({id,clips:v.pterosaur?.clips??v.animal?.clips??v.dinosaur?.clips??[],animation:v.pterosaur?.currentAction()??v.dinosaur?.getCurrentAction()??v.animal?.currentAction(),visible:v.root.visible,position:v.root.position.toArray(),...(v.pterosaur?{wingAngles:['left-wing','right-wing'].map(name=>v.root.getObjectByName(name)!.rotation.z)}:{})}));}
  async init(scene:THREE.Scene,simulation:SurvivalSimulation){
    const markerGeo=new THREE.OctahedronGeometry(.18),markerMat=new THREE.MeshBasicMaterial({color:0xf1ce85});
    for(const c of simulation.creatures){
      if(c.kind==='pterosaur'){
        const pterosaur=createPterosaur(c.size);scene.add(pterosaur.root);
        this.visuals.set(c.id,{root:pterosaur.root,pterosaur});continue;
      }
      if(c.kind==='dinosaur'){
        const d=await createDinosaur({length:c.size,terrain:terrainHeight});const marker=new THREE.Mesh(markerGeo,markerMat);marker.position.y=3;marker.visible=false;d.root.add(marker);scene.add(d.root);this.visuals.set(c.id,{root:d.root,dinosaur:d,marker});continue;
      }
      // The four small herbivores share the existing adult mesh and authored rig.
      const animal=await createAnimal(c.kind==='young-diplodocus'?'diplodocus':c.kind,c.size);
      const marker=new THREE.Mesh(markerGeo,markerMat);marker.position.y=1.5;marker.visible=false;animal.root.add(marker);
      scene.add(animal.root);this.visuals.set(c.id,{root:animal.root,animal,marker});
    }
    this.update(0,simulation,0);
  }
  update(dt:number,simulation:SurvivalSimulation,time:number){
    for(const c of simulation.creatures){
      const v=this.visuals.get(c.id)!;v.root.visible=c.active;if(!c.active)continue;
      v.root.position.set(c.x,terrainHeight(c.x,c.z),c.z);
      const turn=Math.atan2(Math.sin(c.heading-v.root.rotation.y),Math.cos(c.heading-v.root.rotation.y));
      v.root.rotation.y+=turn*(dt===0?1:1-Math.exp(-dt*(c.kind==='diplodocus'?1.1:4)));
      if(v.pterosaur){
        v.root.position.y=Math.max(terrainHeight(c.x,c.z),terrainHeight(c.home.x,c.home.z))+16+Math.sin(simulation.elapsed*.9)*.7;
        v.pterosaur.update(simulation.elapsed);continue;
      }
      if(c.kind==='crow')v.root.position.y=Math.max(terrainHeight(c.x,c.z),terrainHeight(c.home.x,c.home.z))+11+Math.sin(time*.6+Number(c.id.slice(-1)))*1.4;
      if(v.dinosaur){v.dinosaur.update(dt,{action:c.mode,speed:c.speed});v.marker!.visible=!c.alive;v.marker!.rotation.y=time;continue;}
      if(v.animal){v.animal.update(dt,c);v.marker!.visible=isHuntable(c)&&!c.alive;v.marker!.rotation.y=time;continue;}
    }
  }
}
