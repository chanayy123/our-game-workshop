import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

export interface DinosaurState {
  action: string;
  /** Forward movement speed in metres per second. */
  speed: number;
  wading?:boolean;
}

export interface Dinosaur {
  root: THREE.Group;
  clips: string[];
  actionDurations: Record<string, number>;
  height: number;
  length: number;
  update(dt: number, state: DinosaurState): void;
  getCurrentAction(): string;
  dispose(): void;
  getPoseMetrics():{headLift:number;jawOpening:number;rigReady:boolean;breathing:number;wetness:number;groundPitch:number;skinIor:number;roughness:number;breathingReady:boolean;chestScale:number};
}
let sharedAsset:Promise<GLTF>|undefined;

/**
 * Real textured/skinned CC-BY T. rex, facing +Z with feet at y=0.
 * `walk` reuses the supplied run cycle at a slower playback speed.
 * Attribution and the precise downloaded source are in assets/dinosaur/SOURCE.md.
 */
export async function createDinosaur(options:{length?:number;terrain?:(x:number,z:number)=>number}={}): Promise<Dinosaur> {
  const gltf = await (sharedAsset??=new GLTFLoader().loadAsync(
    `${import.meta.env.BASE_URL}assets/dinosaur/trex.glb`,
  ));
  const root = new THREE.Group();
  root.name = 'Player_Tyrannosaurus';
  const model = clone(gltf.scene);
  const alignment = new THREE.Group();
  const stance=new THREE.Group();root.add(stance);
  alignment.name = 'Dinosaur_visual_alignment';
  alignment.add(model);
  stance.add(alignment);
  const mixer = new THREE.AnimationMixer(model);
  const sourceClips = gltf.animations;
  const idle = sourceClips.find((clip) => clip.name === 'idle');
  if (!idle || !sourceClips.some((clip) => clip.name === 'run')) {
    throw new Error('Dinosaur asset is missing its idle or run animation.');
  }

  // Sample the rest pose that is actually shown in the demo before grounding it.
  mixer.clipAction(idle).play();
  mixer.update(0);
  root.updateMatrixWorld(true);
  let head: THREE.Object3D | undefined;
  let tail: THREE.Object3D | undefined;
  let neck:THREE.Object3D|undefined,jaw:THREE.Object3D|undefined,chest:THREE.Object3D|undefined;
  const skinMaterials:THREE.MeshPhysicalMaterial[]=[];
  model.traverse((object) => {
    if (/bn_Head/i.test(object.name)) head = object;
    if (/bn_Tail08/i.test(object.name)) tail = object;
    if (/bn_Neck[._]?7/i.test(object.name)) neck=object;
    if (/bn_Jaw/i.test(object.name)) jaw=object;
    if (/bn_Spine2/i.test(object.name)) chest=object;
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = true;
    // Animated tails and roars extend beyond the bind-pose bounds.
    if (object instanceof THREE.SkinnedMesh) object.frustumCulled = false;
    object.material=Array.isArray(object.material)?object.material.map(m=>m.clone()):object.material.clone();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = .85;
        // Preserve the authored albedo, normal, and roughness maps.
        material.roughness = .86;
        material.normalScale.set(1.15,1.15);
        material.aoMapIntensity=.78;
        for(const texture of [material.map,material.normalMap,material.roughnessMap])if(texture)texture.anisotropy=8;
        if(material instanceof THREE.MeshPhysicalMaterial){
          // The legacy spec/gloss conversion produced IOR=1000; skin is dielectric.
          material.ior=1.45;material.specularIntensity=.4;
          material.specularColor.set(0xffffff);material.specularColorMap=null;material.specularIntensityMap=null;
          material.clearcoat=.035;material.clearcoatRoughness=.5;skinMaterials.push(material);
        }
        // A restrained, earthy grade retains the source scales and stripes.
        material.onBeforeCompile = shader => {
          shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
            float skinLuma = dot(diffuseColor.rgb, vec3(.2126,.7152,.0722));
            vec3 earthSkin = vec3(skinLuma) * vec3(.88,.93,.70);
            diffuseColor.rgb = mix(earthSkin, diffuseColor.rgb * vec3(.86,.82,.57), .18);
          `);
        };
      }
    }
  });
  if (head && tail) {
    const direction = head.getWorldPosition(new THREE.Vector3())
      .sub(tail.getWorldPosition(new THREE.Vector3()));
    alignment.rotation.y = -Math.atan2(direction.x, direction.z);
  }
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root, true);
  const size = box.getSize(new THREE.Vector3());
  const scale = (options.length??11) / Math.max(size.x, size.z);
  alignment.scale.setScalar(scale);
  root.updateMatrixWorld(true);
  box.setFromObject(root, true);
  const center = box.getCenter(new THREE.Vector3());
  alignment.position.set(-center.x, -box.min.y, -center.z);
  root.updateMatrixWorld(true);
  box.setFromObject(root, true).getSize(size);

  const actions = new Map<string, THREE.AnimationAction>();
  const durations: Record<string, number> = {};
  for (const clip of sourceClips) {
    const action = mixer.clipAction(clip);
    if (['roar', 'bite', 'attack_tail'].includes(clip.name)) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }
    actions.set(clip.name, action);
    durations[clip.name] = clip.duration;
  }
  durations.roar=4;durations.bite=1.2;
  // Use a separate action so transitions between walking and running can blend.
  const walkClip = sourceClips.find((clip) => clip.name === 'run')!.clone();
  walkClip.name = 'walk_derived_from_run';
  const walkAction = mixer.clipAction(walkClip);
  actions.set('walk', walkAction);
  durations.walk = walkClip.duration / 0.48;

  let currentName = 'idle';
  let current = actions.get('idle')!;
  let requestedPrevious = 'idle';
  let completedOneShot = '';
  const transition = (name: string) => {
    if (currentName === name) return;
    const next = actions.get(name) ?? actions.get('idle')!;
    const previous = current;
    next.reset().setEffectiveWeight(1).setEffectiveTimeScale(1).play();
    previous.crossFadeTo(next, 0.3, false);
    current = next;
    currentName = actions.has(name) ? name : 'idle';
  };
  const onFinished = (event: { action: THREE.AnimationAction }) => {
    if (event.action !== current) return;
    completedOneShot = currentName;
    transition('idle');
  };
  mixer.addEventListener('finished', onFinished);
  const expressiveBones=[neck,head,jaw].filter((b):b is THREE.Object3D=>!!b);
  const neutral=new Map(expressiveBones.map(b=>[b,b.quaternion.clone()]));
  const basePose=new Map(expressiveBones.map(b=>[b,b.quaternion.clone()]));
  let expressionTime=0,lastState='idle',headLift=0,jawOpening=0,time=0,wetness=0,breathing=0,groundPitch=0;
  const chestScale=chest?.scale.clone();
  const axis=new THREE.Vector3(),parentRotation=new THREE.Quaternion(),delta=new THREE.Quaternion();
  function pitch(bone:THREE.Object3D|undefined,angle:number){
    if(!bone||!bone.parent)return;
    root.updateMatrixWorld(true);
    axis.set(1,0,0).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion()));
    parentRotation.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion())).invert();axis.applyQuaternion(parentRotation);
    delta.setFromAxisAngle(axis,angle);bone.quaternion.premultiply(delta);bone.updateMatrixWorld(true);
  }

  return {
    root,
    clips: sourceClips.map((clip) => clip.name),
    actionDurations: durations,
    height: size.y,
    length: Math.max(size.x, size.z),
    getCurrentAction: () => currentName,
    getPoseMetrics:()=>({headLift,jawOpening,rigReady:!!neck&&!!head&&!!jaw,breathing,wetness,groundPitch,skinIor:skinMaterials[0]?.ior??0,roughness:skinMaterials[0]?.roughness??0,breathingReady:!!chest,chestScale:chest?.scale.x??1}),
    update(dt, state) {
      time+=dt;
      if(state.action!==lastState){expressionTime=0;lastState=state.action;}else expressionTime+=dt;
      const requested = state.action === 'attack' ? 'bite' : ['eat','dead'].includes(state.action)?'idle':state.action;
      if (requested !== requestedPrevious) completedOneShot = '';
      requestedPrevious = requested;
      transition(requested === completedOneShot ? 'idle' : requested);
      if (currentName === 'walk') {
        current.setEffectiveTimeScale(THREE.MathUtils.clamp(Math.abs(state.speed) / 5.8, 0.28, 0.66));
      } else if (currentName === 'run') {
        current.setEffectiveTimeScale(THREE.MathUtils.clamp(Math.abs(state.speed) / 7.5, 0.72, 1.45));
      } else if(currentName==='roar'||currentName==='bite'){
        current.setEffectiveTimeScale(sourceClips.find(c=>c.name===currentName)!.duration/durations[currentName]);
      }
      for(const b of expressiveBones)b.quaternion.copy(basePose.get(b)!);
      if(chest&&chestScale)chest.scale.copy(chestScale);
      mixer.update(state.action==='dead'?0:Math.min(Math.max(dt, 0), 0.1));
      for(const b of expressiveBones)basePose.get(b)!.copy(b.quaternion);
      breathing=state.action==='dead'?0:Math.sin(time*(state.speed>5?3.4:1.6))*.012;
      if(chest){chest.scale.x*=1+breathing;chest.scale.z*=1+breathing*.65;}
      if(state.action==='idle'){pitch(neck,Math.sin(time*.6)*.012);pitch(head,Math.sin(time*.47)*.018);}
      wetness=THREE.MathUtils.damp(wetness,state.wading?1:0,state.wading?2:.12,dt);
      for(const m of skinMaterials){m.roughness=.86-wetness*.28;m.clearcoat=.035+wetness*.25;}
      if(options.terrain&&state.action!=='dead'){
        const {x,z}=root.position,h=root.rotation.y,fx=Math.sin(h)*2.1,fz=Math.cos(h)*2.1;
        const pitchTarget=-Math.atan2(options.terrain(x+fx,z+fz)-options.terrain(x-fx,z-fz),4.2);
        groundPitch=THREE.MathUtils.damp(groundPitch,THREE.MathUtils.clamp(pitchTarget,-.15,.15),3,dt);
        stance.rotation.x=groundPitch;
      }
      const envelope=state.action==='roar'?Math.min(1,expressionTime/.4)*Math.min(1,Math.max(0,(4-expressionTime)/.55)):0;
      headLift=envelope*1.1;jawOpening=envelope*1.08;
      if(envelope>0){
        for(const b of expressiveBones)b.quaternion.slerp(neutral.get(b)!,envelope);
        pitch(neck,-headLift*.58);pitch(head,-headLift*.42);pitch(jaw,jawOpening);
      }
      if(state.action==='eat'){const e=Math.min(1,expressionTime/.35);pitch(neck,e*.45);pitch(head,e*.48);pitch(jaw,e*(.18+Math.sin(expressionTime*12)*.12));}
      alignment.rotation.z=THREE.MathUtils.damp(alignment.rotation.z,state.action==='dead'?1.4:0,3,dt);
    },
    dispose() {
      mixer.removeEventListener('finished', onFinished);
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
      const textures = new Set<THREE.Texture>();
      const materials = new Set<THREE.Material>();
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        // Geometry and textures belong to the shared asset; NPCs still use them.
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          materials.add(material);
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) textures.add(value);
          }
        }
      });
      materials.forEach((material) => material.dispose());
      root.removeFromParent();
    },
  };
}
