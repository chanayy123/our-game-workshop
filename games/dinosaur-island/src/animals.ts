import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import type { Creature } from './survival';

type ImportedKind='raptor'|'rhino'|'crow'|'diplodocus';
const assets=new Map<ImportedKind,Promise<GLTF>>();
const profiles={
  raptor:{head:/^Head_09$/,tail:/^Tail_10_/,idle:'Idle_01',walk:'Walk',run:'Sprint'},
  rhino:{head:/Bip01_Head_/,tail:/BN_Tail_02/,idle:'',walk:'CINEMA_4D_Principal',run:'CINEMA_4D_Principal'},
  crow:{head:/CROW_+Head_/,tail:/CrowTailRightFeatherB_/,idle:'',walk:'Flight',run:'Flight'},
  diplodocus:{head:/^Mouth1$/,tail:/^Tail11$/,idle:'Idle',walk:'Walk',run:'Walk'},
};
export type AnimalState=Pick<Creature,'mode'|'speed'|'alive'>&{action?:string};
export type AnimalVisual={root:THREE.Group;clips:string[];currentAction:()=>string;update:(dt:number,c:AnimalState)=>void};

/** Load authored meshes/rigs once; clones have independent skeletons and mixers. */
export async function createAnimal(kind:ImportedKind,length:number):Promise<AnimalVisual>{
  if(!assets.has(kind))assets.set(kind,new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}assets/animals/${kind}/model.glb`));
  const gltf=await assets.get(kind)!,profile=profiles[kind];
  const root=new THREE.Group(),alignment=new THREE.Group(),model=clone(gltf.scene);
  root.name=kind;root.add(alignment);alignment.add(model);
  const mixer=new THREE.AnimationMixer(model),actions=new Map<string,THREE.AnimationAction>();
  // The crow source includes standing and take-off. Loop only its airborne wingbeat.
  const clips=kind==='crow'?[new THREE.AnimationClip('Flight',.52,gltf.animations[0].tracks.map(track=>{
    const sampled=track.clone(),stride=track.getValueSize(),values=new Float32Array(14*stride);
    const interpolant=track instanceof THREE.QuaternionKeyframeTrack?new THREE.QuaternionLinearInterpolant(track.times,track.values,stride):new THREE.LinearInterpolant(track.times,track.values,stride);
    for(let i=0;i<14;i++)values.set(interpolant.evaluate(7.2+(i===13?0:i*.04)),i*stride);
    sampled.times=new Float32Array(Array.from({length:14},(_,i)=>i*.04));sampled.values=values;return sampled;
  }))]:gltf.animations;
  for(const clip of clips){const action=mixer.clipAction(clip);if(kind==='raptor'&&['Roar_01','Bite_01','Death_01'].includes(clip.name)){action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;}actions.set(clip.name,action);}
  let current=actions.has(profile.idle)?profile.idle:profile.walk;
  if(!actions.has(current))throw new Error(`${kind}: required animation ${current} is absent (${gltf.animations.map(c=>c.name)})`);
  actions.get(current)!.play();mixer.update(0);root.updateMatrixWorld(true);
  let head:THREE.Object3D|undefined,tail:THREE.Object3D|undefined;
  model.traverse(o=>{
    if(profile.head.test(o.name))head=o;if(profile.tail.test(o.name))tail=o;
    if(!(o instanceof THREE.Mesh))return;
    o.castShadow=kind!=='crow';o.receiveShadow=true;o.frustumCulled=false;
    o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();
    for(const m of Array.isArray(o.material)?o.material:[o.material])if(m instanceof THREE.MeshStandardMaterial){
      m.envMapIntensity=.65;m.roughness=kind==='crow'?.72:.87;m.metalness=0;
      if(m.map)m.map.anisotropy=4;
      if(m instanceof THREE.MeshPhysicalMaterial){m.ior=1.45;m.specularIntensity=.35;m.specularColorMap=null;m.specularIntensityMap=null;}
      if(kind==='raptor')m.color.multiply(new THREE.Color(.91,.94,.84));
    }
  });
  if(!head||!tail)throw new Error(`${kind}: head/tail orientation bones were not found`);
  const forward=head.getWorldPosition(new THREE.Vector3()).sub(tail.getWorldPosition(new THREE.Vector3()));
  alignment.rotation.y=-Math.atan2(forward.x,forward.z);
  root.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(root,true),size=box.getSize(new THREE.Vector3());
  alignment.scale.setScalar(length/Math.max(size.x,size.z));root.updateMatrixWorld(true);box.setFromObject(root,true);
  const center=box.getCenter(new THREE.Vector3());alignment.position.set(-center.x,-box.min.y,-center.z);
  let deadTilt=0;
  return {root,clips:clips.map(c=>c.name),currentAction:()=>current,update(dt,c){
    deadTilt=THREE.MathUtils.damp(deadTilt,c.alive?0:1.5,8,dt);alignment.rotation.z=deadTilt;
    if(!c.alive)return;
    let wanted=c.mode==='run'?profile.run:c.mode==='walk'?profile.walk:profile.idle||profile.walk;
    if(kind==='raptor'&&c.action)wanted=({roar:'Roar_01',attack:'Bite_01',eat:'Eat Prey'} as Record<string,string>)[c.action]??wanted;
    if(!actions.has(wanted))wanted=current;
    if(wanted!==current){const next=actions.get(wanted)!;next.reset().setEffectiveWeight(1).play();actions.get(current)!.crossFadeTo(next,.35,false);current=wanted;}
    const action=actions.get(current)!;
    action.setEffectiveTimeScale(kind==='rhino'?(c.speed>.1?c.speed/1.1:0):kind==='crow'?1:1);
    if(kind==='raptor'&&c.action&&['roar','attack','eat'].includes(c.action))action.setEffectiveTimeScale(action.getClip().duration/({roar:4,attack:1.2,eat:2.2}[c.action]??1));
    mixer.update(dt);
  }};
}
