import * as THREE from 'three';
import type { PropKind } from './types.ts';

const mats = new Map<string, THREE.MeshStandardMaterial>();
export function material(color: THREE.ColorRepresentation, roughness=.82, metalness=0): THREE.MeshStandardMaterial {
  const key=`${color}/${roughness}/${metalness}`;
  if(!mats.has(key)) mats.set(key,new THREE.MeshStandardMaterial({color,roughness,metalness}));
  return mats.get(key)!;
}
export function mesh(geometry:THREE.BufferGeometry,mat:THREE.Material,x=0,y=0,z=0):THREE.Mesh {
  const obj=new THREE.Mesh(geometry,mat);obj.position.set(x,y,z);obj.castShadow=true;obj.receiveShadow=true;return obj;
}
export function box(parent:THREE.Object3D,w:number,h:number,d:number,color:THREE.ColorRepresentation,x=0,y=0,z=0):THREE.Mesh {
 const m=mesh(new THREE.BoxGeometry(w,h,d),material(color),x,y,z);parent.add(m);return m;
}
export function cyl(parent:THREE.Object3D,top:number,bottom:number,height:number,color:THREE.ColorRepresentation,x=0,y=0,z=0,segments=12):THREE.Mesh {
 const m=mesh(new THREE.CylinderGeometry(top,bottom,height,segments),material(color),x,y,z);parent.add(m);return m;
}
export function orb(parent:THREE.Object3D,r:number,color:THREE.ColorRepresentation,x=0,y=0,z=0):THREE.Mesh {
 const m=mesh(new THREE.IcosahedronGeometry(r,1),material(color),x,y,z);parent.add(m);return m;
}
export function makeProp(kind:PropKind):THREE.Group {
 const g=new THREE.Group();
 if(kind==='pot') {
  cyl(g,.35,.24,.52,'#c77d64',0,.26);cyl(g,.39,.38,.12,'#e1a085',0,.5);cyl(g,.325,.325,.025,'#504133',0,.566);
  cyl(g,.045,.062,.56,'#80684a',0,.8);
  for(let i=0;i<6;i++) {const a=i*Math.PI/3;const leaf=orb(g,.23,i%2?'#5b9979':'#74b58a',Math.sin(a)*.2,1.05+(i%2)*.16,Math.cos(a)*.2);leaf.scale.set(.68,1.45,.8);leaf.rotation.z=-Math.sin(a)*.55;leaf.rotation.x=Math.cos(a)*.55;}
  orb(g,.24,'#a8c17e',0,1.34,0);
 } else if(kind==='crate') {
  box(g,.83,.74,.83,'#986b48',0,.37);
  for(let i=0;i<4;i++) {box(g,.85,.014,.18,i%2?'#d1a477':'#bc8e61',0,.746,-.315+i*.21);box(g,.014,.57,.18,'#c3996b',.423,.39,-.315+i*.21);box(g,.18,.57,.014,'#c3996b',-.315+i*.21,.39,.423);box(g,.18,.57,.014,'#bd8e64',-.315+i*.21,.39,-.423);}
  for(const z of [-.433,.433]) {box(g,.89,.13,.045,'#dec097',0,.12,z);box(g,.89,.13,.045,'#d2af83',0,.63,z);for(const x of [-.33,.33]) for(const y of [.12,.63])orb(g,.022,'#544d43',x,y,z+Math.sign(z)*.028);}
  for(const x of [-.432,.432]) {box(g,.045,.13,.9,'#d2af83',x,.12);box(g,.045,.13,.9,'#d2af83',x,.63);}
 } else if(kind==='bin') {
  box(g,.66,.87,.62,'#437a79',0,.48);box(g,.75,.11,.69,'#8db1a3',0,.98);box(g,.29,.065,.12,'#244b52',0,1.055);
  for(const x of [-.25,.25]) {cyl(g,.055,.055,.7,'#336269',x,.51,.317,6);orb(g,.075,'#253e45',x,.11,-.27);}
  box(g,.24,.21,.018,'#dce7cf',0,.65,.324);box(g,.14,.075,.021,'#438077',0,.65,.338);box(g,.09,.075,.021,'#438077',0,.72,.338);
 } else if(kind==='barrel') {
  const pts=[new THREE.Vector2(0,0),new THREE.Vector2(.33,0),new THREE.Vector2(.39,.12),new THREE.Vector2(.44,.44),new THREE.Vector2(.39,.78),new THREE.Vector2(.33,.89),new THREE.Vector2(0,.89)];
  g.add(mesh(new THREE.LatheGeometry(pts,12),material('#b08458')));
  for(const y of [.16,.7]) {cyl(g,.418,.418,.085,'#4c6665',0,y);}
  cyl(g,.347,.347,.035,'#d1ac79',0,.9);for(const z of [-.2,0,.2])box(g,.52,.014,.012,'#8a6749',0,.924,z);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;const stripe=box(g,.012,.55,.012,'#886448',Math.sin(a)*.428,.44,Math.cos(a)*.428);stripe.rotation.y=a;}
 } else if(kind==='chair') {
  box(g,.64,.115,.64,'#dbaa76',0,.53);
  for(const x of [-.25,.25])for(const z of [-.25,.25]) {const leg=box(g,.075,.52,.075,'#3e6869',x,.265,z);leg.rotation.z=-x*.09;}
  for(const x of [-.25,.25])box(g,.078,.71,.078,'#3e6869',x,.89,-.255);
  for(const y of [.92,1.1])box(g,.59,.14,.075,'#6b9e95',0,y,-.265);
  box(g,.52,.045,.04,'#386267',0,.22,.25);
 } else if(kind==='table') {
  cyl(g,.7,.7,.12,'#e9cba2',0,1.0,0,32);cyl(g,.07,.095,.95,'#3f6266',0,.48);cyl(g,.41,.41,.065,'#3f6266',0,.055,0,16);
  cyl(g,.115,.115,.025,'#efead9',.25,1.08,.17,16);cyl(g,.068,.048,.115,'#fbf1d8',.25,1.15,.17,12);cyl(g,.05,.05,.008,'#79513e',.25,1.21,.17,12);const cupHandle=mesh(new THREE.TorusGeometry(.046,.012,5,10),material('#fbf1d8'),.323,1.15,.17);g.add(cupHandle);
  const paper=box(g,.22,.006,.28,'#b96c5c',-.18,1.066,.1);paper.rotation.y=.3;
 } else if(kind==='lamp') {
  cyl(g,.19,.23,.15,'#254f57',0,.075,0,10);cyl(g,.065,.095,2.12,'#305c60',0,1.16,0,10);
  cyl(g,.28,.16,.16,'#335e5f',0,2.19,0,4);const light=mesh(new THREE.BoxGeometry(.31,.41,.31),new THREE.MeshStandardMaterial({color:'#ffe5a6',emissive:'#ffd69a',emissiveIntensity:1.5,roughness:.6}),0,2.42);g.add(light);
  for(const x of [-.18,.18])for(const z of [-.18,.18])box(g,.035,.48,.035,'#335e5f',x,2.43,z);
  const cap=cyl(g,0,.37,.25,'#3b6663',0,2.79,0,4);cap.rotation.y=Math.PI/4;cyl(g,.06,.08,.15,'#c9b581',0,2.93);
 }
 return g;
}

export interface Person { root:THREE.Group; torso:THREE.Group; head:THREE.Group; leftLeg:THREE.Group; rightLeg:THREE.Group; leftArm:THREE.Group; rightArm:THREE.Group; baton:THREE.Group; uniform:THREE.MeshStandardMaterial; }
export function makePerson(isCop:boolean,id=0):Person {
 const root=new THREE.Group(),torso=new THREE.Group(),head=new THREE.Group(),leftLeg=new THREE.Group(),rightLeg=new THREE.Group(),leftArm=new THREE.Group(),rightArm=new THREE.Group(),baton=new THREE.Group();
 root.add(torso);torso.position.y=.6;
 const color=isCop?(id===0?'#304e72':'#3e697b'):'#ea9b6b';
 const uniform=new THREE.MeshStandardMaterial({color,roughness:.86});
 const body=mesh(new THREE.CapsuleGeometry(.25,.34,4,10),uniform,0,.39);body.scale.set(1.15,1,.84);torso.add(body);
 box(torso,.57,.1,.4,isCop?'#182e49':'#655c63',0,.19);
 if(isCop){const badge=orb(torso,.065,'#efcb71',-.16,.53,.213);badge.scale.z=.2;box(torso,.12,.17,.04,'#63859d',.145,.47,.207);box(torso,.085,.045,.05,'#e6d595',0,.62,.21);}
 for(const [leg,x]of [[leftLeg,-.16],[rightLeg,.16]] as [THREE.Group,number][]){leg.position.set(x,.58,0);root.add(leg);cyl(leg,.1,.095,.4,isCop?'#263f5d':'#507a88',0,-.18,0,8);box(leg,.21,.12,.33,'#213941',0,-.49,.05);}
 for(const [arm,x]of [[leftArm,-.34],[rightArm,.34]] as [THREE.Group,number][]){arm.position.set(x,.55,0);torso.add(arm);cyl(arm,.09,.085,.34,color,0,-.14,0,8);orb(arm,.089,'#e9b995',0,-.36,0);}
 torso.add(head);head.position.y=.91;const face=orb(head,.255,'#edc09e',0,0);face.scale.set(.88,1,.87);orb(head,.048,'#d49678',0,-.02,.225);
 for(const x of [-.08,.08]) {const eye=orb(head,.022,'#243b42',x,.018,.203);eye.scale.z=.45;}
 if(isCop){cyl(head,.265,.25,.11,color,0,.195,0,12);box(head,.31,.05,.19,'#162c46',0,.16,.22);box(head,.077,.075,.028,'#ecc674',0,.219,.239);}
 else {const hair=orb(head,.252,'#485e67',0,.095,-.035);hair.scale.set(.93,.65,.94);box(head,.36,.065,.13,'#c1e2cc',0,.16,.17);}
 rightArm.add(baton);baton.position.set(0,-.38,.02);const stick=cyl(baton,.035,.035,.67,isCop?'#293c47':'#edc373',0,-.15,.14,8);stick.rotation.x=-.45;
 if(!isCop)baton.visible=false;
 return {root,torso,head,leftLeg,rightLeg,leftArm,rightArm,baton,uniform};
}
