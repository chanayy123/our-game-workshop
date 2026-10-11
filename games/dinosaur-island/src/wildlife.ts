import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { createDinosaur, type Dinosaur } from './dinosaur';
import { terrainHeight } from './terrain';
import { type SurvivalSimulation } from './survival';
import { createAnimal, type AnimalVisual } from './animals';
import { isHuntable } from './species';

export class Wildlife {
  private visuals=new Map<string,{root:THREE.Group;dinosaur?:Dinosaur;animal?:AnimalVisual;mixer?:THREE.AnimationMixer;actions?:Map<string,THREE.AnimationAction>;current?:string;body?:THREE.Group;marker?:THREE.Mesh}>();
  diagnostics(){return [...this.visuals].map(([id,v])=>({id,clips:v.animal?.clips??v.dinosaur?.clips??['Survey','Walk','Run'],animation:v.dinosaur?.getCurrentAction()??v.animal?.currentAction()??v.current,visible:v.root.visible,position:v.root.position.toArray()}));}
  async init(scene:THREE.Scene,simulation:SurvivalSimulation){
    const fox=await new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}assets/wildlife/fox.glb`);
    fox.scene.traverse(o=>{if(o instanceof THREE.Mesh){const geometry=o.geometry.clone();geometry.deleteAttribute('normal');o.geometry=mergeVertices(geometry);o.geometry.computeVertexNormals();const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials)if(m instanceof THREE.MeshStandardMaterial){m.color.multiply(new THREE.Color(0xb9a28a));m.roughness=1;}}});
    const markerGeo=new THREE.OctahedronGeometry(.18),markerMat=new THREE.MeshBasicMaterial({color:0xf1ce85});
    for(const c of simulation.creatures){
      if(c.kind==='dinosaur'){
        const d=await createDinosaur({length:c.size,terrain:terrainHeight});const marker=new THREE.Mesh(markerGeo,markerMat);marker.position.y=3;marker.visible=false;d.root.add(marker);scene.add(d.root);this.visuals.set(c.id,{root:d.root,dinosaur:d,marker});continue;
      }
      if(c.kind!=='fox'){
        const animal=await createAnimal(c.kind,c.size);
        const marker=new THREE.Mesh(markerGeo,markerMat);marker.position.y=1.5;marker.visible=false;animal.root.add(marker);
        scene.add(animal.root);this.visuals.set(c.id,{root:animal.root,animal,marker});continue;
      }
      const root=new THREE.Group(),body=new THREE.Group(),model=clone(fox.scene);body.add(model);root.add(body);
      const mixer=new THREE.AnimationMixer(model),actions=new Map<string,THREE.AnimationAction>();
      for(const clip of fox.animations)actions.set(clip.name,mixer.clipAction(clip));
      actions.get('Survey')!.play();mixer.update(0);root.updateMatrixWorld(true);
      let head:THREE.Object3D|undefined,tail:THREE.Object3D|undefined;
      model.traverse(o=>{if(o.name.includes('b_Head'))head=o;if(o.name.includes('b_Tail03'))tail=o;if(o instanceof THREE.Mesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;}});
      if(head&&tail){const v=head.getWorldPosition(new THREE.Vector3()).sub(tail.getWorldPosition(new THREE.Vector3()));model.rotation.y-=Math.atan2(v.x,v.z);}
      root.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(root,true),size=box.getSize(new THREE.Vector3());
      model.scale.multiplyScalar(c.size/Math.max(size.x,size.z));root.updateMatrixWorld(true);box.setFromObject(root,true);const center=box.getCenter(new THREE.Vector3());model.position.add(new THREE.Vector3(-center.x,-box.min.y,-center.z));
      const marker=new THREE.Mesh(markerGeo,markerMat);marker.position.y=1.5;marker.visible=false;root.add(marker);
      scene.add(root);this.visuals.set(c.id,{root,mixer,actions,body,marker,current:'Survey'});
    }
    this.update(0,simulation,0);
  }
  update(dt:number,simulation:SurvivalSimulation,time:number){
    for(const c of simulation.creatures){
      const v=this.visuals.get(c.id)!;v.root.visible=c.active;if(!c.active)continue;
      v.root.position.set(c.x,terrainHeight(c.x,c.z),c.z);
      const turn=Math.atan2(Math.sin(c.heading-v.root.rotation.y),Math.cos(c.heading-v.root.rotation.y));
      v.root.rotation.y+=turn*(dt===0?1:1-Math.exp(-dt*(c.kind==='diplodocus'?1.1:4)));
      if(c.kind==='crow')v.root.position.y=Math.max(terrainHeight(c.x,c.z),terrainHeight(c.home.x,c.home.z))+11+Math.sin(time*.6+Number(c.id.slice(-1)))*1.4;
      if(v.dinosaur){v.dinosaur.update(dt,{action:c.mode,speed:c.speed});v.marker!.visible=!c.alive;v.marker!.rotation.y=time;continue;}
      if(v.animal){v.animal.update(dt,c);v.marker!.visible=isHuntable(c)&&!c.alive;v.marker!.rotation.y=time;continue;}
      v.body!.rotation.z=THREE.MathUtils.damp(v.body!.rotation.z,c.alive?0:Math.PI*.48,8,dt);
      v.body!.position.y=c.alive?0:.32;
      v.marker!.visible=!c.alive;v.marker!.position.y=1.25+Math.sin(time*3)*.12;v.marker!.rotation.y=time;
      if(!c.alive)continue;
      const action=c.mode==='run'?'Run':c.mode==='walk'?'Walk':'Survey';
      if(action!==v.current){const next=v.actions!.get(action)!;next.reset().play();v.actions!.get(v.current!)!.crossFadeTo(next,.2,false);v.current=action;}
      v.mixer!.update(dt);
    }
  }
}
