import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** All measurements are metres. The bow faces +Z; the working deck is at y=.65. */
export interface Vessel {
  root: THREE.Group; wheel: THREE.Group; propeller: THREE.Object3D;
  cable: THREE.Mesh; cage: THREE.Group; weapon: THREE.Group; knife: THREE.Group;
  update: (time:number, speed:number, steer:number, depth:number)=>void;
}

const UP = new THREE.Vector3(0, 1, 0);
const material = (color:THREE.ColorRepresentation, roughness=.65, metalness=0) =>
  new THREE.MeshStandardMaterial({color, roughness, metalness});

function mesh(geometry:THREE.BufferGeometry, mat:THREE.Material, parent:THREE.Object3D, x=0, y=0, z=0) {
  const m = new THREE.Mesh(geometry,mat); m.position.set(x,y,z);
  m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function tube(parent:THREE.Object3D, a:number[], b:number[], radius:number, mat:THREE.Material, sides=8) {
  const av=new THREE.Vector3(...a), bv=new THREE.Vector3(...b), delta=bv.clone().sub(av);
  const m=mesh(new THREE.CylinderGeometry(radius,radius,delta.length(),sides),mat,parent);
  m.position.copy(av.add(bv).multiplyScalar(.5)); m.quaternion.setFromUnitVectors(UP,delta.normalize()); return m;
}
function box(parent:THREE.Object3D, size:number[], position:number[], mat:THREE.Material) {
  return mesh(new THREE.BoxGeometry(...size),mat,parent,...position as [number,number,number]);
}
function curveTube(parent:THREE.Object3D, points:THREE.Vector3[], radius:number, mat:THREE.Material, segments=60) {
  return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),segments,radius,6,false),mat,parent);
}

function surfaceTexture(base:string, kind:'paint'|'wood'|'metal') {
  const canvas=document.createElement('canvas'); canvas.width=512; canvas.height=512;
  const ctx=canvas.getContext('2d')!; ctx.fillStyle=base; ctx.fillRect(0,0,512,512);
  let seed=719; const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  for(let i=0;i<3500;i++) {
    const light=random()>.5; ctx.fillStyle=light?'rgba(236,230,202,.08)':'rgba(27,36,37,.09)';
    const x=random()*512,y=random()*512;
    ctx.fillRect(x,y,kind==='wood'?1+random()*3:1+random()*6,kind==='wood'?10+random()*95:1+random()*10);
  }
  if(kind==='paint') for(let i=0;i<45;i++) {
    const x=random()*512,y=random()*512; ctx.fillStyle='rgba(116,70,31,.19)'; ctx.fillRect(x,y,random()*3+1,random()*35);
  }
  const texture=new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.anisotropy=4; return texture;
}
function namePlate(text:string, width=512, height=128) {
  const canvas=document.createElement('canvas'); canvas.width=width; canvas.height=height;
  const c=canvas.getContext('2d')!; c.fillStyle='#e4dfc9'; c.fillRect(0,0,width,height);
  c.fillStyle='#233a46'; c.textAlign='center'; c.font=`700 ${height*.55}px Georgia`; c.fillText(text,width/2,height*.7);
  const tex=new THREE.CanvasTexture(canvas); tex.colorSpace=THREE.SRGBColorSpace; return tex;
}

/** Preserve the silhouette/detail without paying a draw call for every welded bar. */
function batchStatic(parent:THREE.Group, animated:THREE.Object3D[]=[]) {
  parent.updateMatrixWorld(true);
  const groups=new Map<string,{material:THREE.Material;meshes:THREE.Mesh[];geometries:THREE.BufferGeometry[]}>();
  parent.traverse(object=>{
    if(!(object instanceof THREE.Mesh)||Array.isArray(object.material)||object.material.transparent) return;
    let ancestor:THREE.Object3D|null=object;
    while(ancestor&&ancestor!==parent) {if(animated.includes(ancestor)) return;ancestor=ancestor.parent;}
    const key=object.material.uuid+Object.keys(object.geometry.attributes).sort().join(',');
    let group=groups.get(key);if(!group) {group={material:object.material,meshes:[],geometries:[]};groups.set(key,group);}
    let geometry=object.geometry.clone().applyMatrix4(object.matrixWorld);
    // Shape/Extrude geometries are non-indexed while the hull and tubes are indexed.
    // Normalize topology before merging; seams and per-face normals remain intact.
    if(geometry.index) {const indexed=geometry;geometry=indexed.toNonIndexed();indexed.dispose();}
    group.meshes.push(object);group.geometries.push(geometry);
  });
  for(const group of groups.values()) {
    if(group.meshes.length<2) {for(const g of group.geometries)g.dispose();continue;}
    const geometry=mergeGeometries(group.geometries,false);
    for(const g of group.geometries)g.dispose();
    if(!geometry)continue;
    for(const m of group.meshes) {m.removeFromParent();m.geometry.dispose();}
    mesh(geometry,group.material,parent);
  }
}

/** Continuous lofted hull, with flared bow and an inset chine. */
function hullGeometry() {
  const positions:number[]=[], indices:number[]=[], uvs:number[]=[];
  const sections=40, ring=20;
  for(let j=0;j<=sections;j++) {
    const t=j/sections,z=-4.75+t*10.1;
    const bow=THREE.MathUtils.smoothstep(t,.64,1);
    const halfBeam=(1.56+.2*Math.sin(t*Math.PI))*Math.pow(1-bow,.55)+.035;
    const sheer=1.1+.36*Math.pow(t,4)+.1*Math.pow(1-t,3);
    for(let k=0;k<=ring;k++) {
      const angle=k/ring*Math.PI;
      const x=-Math.cos(angle)*halfBeam;
      const y=sheer-(1.94-.7*Math.pow(t,7))*Math.pow(Math.sin(angle),.72);
      positions.push(x,y,z); uvs.push(k/ring,t*2);
      if(j<sections&&k<ring) {const a=j*(ring+1)+k,b=a+ring+1;indices.push(a,a+1,b,a+1,b+1,b);}
    }
  }
  const geometry=new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2)); geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}
function deckShape() {
  const s=new THREE.Shape(); s.moveTo(-1.48,-4.55); s.lineTo(1.48,-4.55);
  s.bezierCurveTo(1.67,-2,1.64,1.6,1.2,3.25); s.bezierCurveTo(.98,4.1,.48,4.75,0,5.14);
  s.bezierCurveTo(-.48,4.75,-.98,4.1,-1.2,3.25); s.bezierCurveTo(-1.64,1.6,-1.67,-2,-1.48,-4.55); return s;
}

export function createVessel():Vessel {
  const root=new THREE.Group(); root.name='Morrow — 10 metre fishing launch';
  const ivory=material('#cac5b0',.86); ivory.map=surfaceTexture('#c9c3ac','paint');
  const navy=material('#1c3845',.68); navy.map=surfaceTexture('#284754','paint');
  const wood=material('#746149',.95); wood.map=surfaceTexture('#837057','wood');
  const darkWood=material('#38382c',.92), brass=material('#a27c3d',.4,.58);
  const steel=material('#7c8885',.35,.72), darkSteel=material('#363f3d',.64,.7);
  const rope=material('#9b9576',1), black=material('#171d1d',.82), orange=material('#b85425',.73);
  const hull=mesh(hullGeometry(),ivory,root); hull.material.side=THREE.DoubleSide;
  const lowerHull=mesh(hullGeometry(),navy,root); lowerHull.scale.set(.988,.61,.999); lowerHull.position.y=-.44;
  // Transom closes the loft and carries the vessel's painted name.
  const transom=new THREE.Shape();transom.moveTo(-1.57,1.19);transom.lineTo(1.57,1.19);transom.quadraticCurveTo(1.3,-.56,0,-.78);transom.quadraticCurveTo(-1.3,-.56,-1.57,1.19);
  const stern=mesh(new THREE.ShapeGeometry(transom,16),ivory,root,0,0,-4.75); stern.rotation.y=Math.PI;
  const plaque=mesh(new THREE.PlaneGeometry(1.4,.35),new THREE.MeshStandardMaterial({map:namePlate('MORROW'),roughness:.85}),root,0,.7,-4.766);plaque.rotation.y=Math.PI;
  const deck=mesh(new THREE.ShapeGeometry(deckShape(),32),wood,root,0,.67,0);deck.rotation.x=Math.PI/2;deck.material.side=THREE.DoubleSide;
  // Inlaid caulking follows the narrowing bow, rather than a rectangular slab.
  for(let x=-1.4;x<=1.4;x+=.205) {
    const end=5.0-Math.pow(Math.abs(x)/1.46,1.9)*2.1;
    tube(root,[x,.68,-4.5],[x,.68,end],.0075,darkWood,4);
  }
  for(let z=-3.7;z<4;z+=1.55) for(let x=-1.3;x<1.3;x+=.41) {
    const zz=z+(Math.round(x*10)%2)*.4;
    tube(root,[x,.682,zz],[x+.2,.682,zz],.008,darkWood,4);
  }
  for(const side of [-1,1]) {
    const rim:THREE.Vector3[]=[];
    for(let j=0;j<=30;j++) {
      const t=j/30,bow=THREE.MathUtils.smoothstep(t,.64,1);
      rim.push(new THREE.Vector3(side*((1.56+.2*Math.sin(t*Math.PI))*Math.pow(1-bow,.55)+.035),1.1+.36*Math.pow(t,4)+.1*Math.pow(1-t,3),-4.75+t*10.1));
    }
    curveTube(root,rim,.074,darkWood); const rub=rim.map(v=>v.clone().add(new THREE.Vector3(side*.016,-.17,0)));curveTube(root,rub,.048,navy);
    // Forward safety rail leaves the aft work area open.
    const railPoints=[];
    for(let i=18;i<31;i++) railPoints.push(rim[i].clone().add(new THREE.Vector3(0,.55,0)));
    curveTube(root,railPoints,.025,steel);
    for(const j of [18,22,26,29]) tube(root,rim[j].toArray(),rim[j].clone().add(new THREE.Vector3(0,.55,0)).toArray(),.024,steel);
    for(const z of [-3.4,-.6]) {
      // Rubber fenders hanging against the topsides.
      const fender=mesh(new THREE.CapsuleGeometry(.15,.65,4,8),black,root,side*1.68,.49,z); fender.rotation.z=side*.15;
      tube(root,[side*1.62,1.16,z],[side*1.68,.9,z],.013,rope);
    }
    for(const z of [-4,3.5]) {tube(root,[side*1.07,.85,z],[side*1.07,1,z],.043,steel);tube(root,[side*.87,1,z],[side*1.27,1,z],.03,steel);}
  }
  tube(root,[-1.57,1.19,-4.75],[1.57,1.19,-4.75],.07,darkWood);

  // A compact open-backed wheel shelter: helm remains on the walkable deck.
  const cabin=new THREE.Group();root.add(cabin);
  const roofShape=new THREE.Shape();roofShape.moveTo(-1.1,-.8);roofShape.lineTo(1.1,-.8);roofShape.lineTo(1.15,.65);roofShape.quadraticCurveTo(0,1.12,-1.15,.65);roofShape.closePath();
  const roof=mesh(new THREE.ExtrudeGeometry(roofShape,{depth:.11,bevelEnabled:true,bevelSize:.06,bevelThickness:.035,bevelSegments:2,steps:1}),ivory,cabin,0,3.13,2.2);roof.rotation.x=Math.PI/2;
  for(const side of [-1,1]) {
    tube(cabin,[side*1.02,.72,1.45],[side*1.02,3.12,1.45],.047,ivory);
    tube(cabin,[side*.96,1.2,3.1],[side*.94,3.12,2.95],.045,ivory);
    tube(cabin,[side*1.02,1.68,1.45],[side*.96,1.68,3.1],.04,ivory);
    const window=mesh(new THREE.PlaneGeometry(1.39,1.14),new THREE.MeshPhysicalMaterial({color:'#83b2b6',transparent:true,opacity:.14,roughness:.16,metalness:.1,side:THREE.DoubleSide,depthWrite:false}),cabin,side*1.005,2.37,2.24);window.rotation.y=Math.PI/2;
    const nav=mesh(new THREE.SphereGeometry(.073,10,8),new THREE.MeshStandardMaterial({color:side===1?'#5faa67':'#c24b3e',emissive:side===1?'#246833':'#7e241a',emissiveIntensity:.7}),cabin,side*1.12,3.17,2.28);
    nav.castShadow=false;
  }
  const windscreen=mesh(new THREE.PlaneGeometry(1.78,1.27),new THREE.MeshPhysicalMaterial({color:'#9cc5c8',transparent:true,opacity:.12,roughness:.13,side:THREE.DoubleSide,depthWrite:false}),cabin,0,2.44,3.01);windscreen.rotation.x=-.085;
  tube(cabin,[0,1.81,3.06],[0,3.13,2.96],.025,ivory);
  // Sloped helm pedestal and dark instrument face.
  const console=box(cabin,[1.47,.63,.55],[0,1.18,2.62],ivory); console.rotation.x=-.08;
  const fascia=box(cabin,[1.4,.31,.08],[0,1.56,2.29],navy); fascia.rotation.x=-.22;
  for(const x of [-.44,-.13,.23]) {
    const dial=mesh(new THREE.CylinderGeometry(.088,.088,.018,24),black,cabin,x,1.58,2.24);dial.rotation.x=Math.PI/2;
    const face=mesh(new THREE.CircleGeometry(.066,24),material('#d9d6bd'),cabin,x,1.58,2.228);face.rotation.y=Math.PI;
    tube(cabin,[x,1.58,2.21],[x+.032,1.617,2.21],.004,black,4);
  }
  const wheel=new THREE.Group();wheel.position.set(0,1.66,2.02);wheel.rotation.x=-.15;cabin.add(wheel);
  mesh(new THREE.TorusGeometry(.26,.022,7,32),darkWood,wheel);
  mesh(new THREE.CylinderGeometry(.06,.06,.07,12),brass,wheel).rotation.x=Math.PI/2;
  for(let i=0;i<6;i++) {const a=i*Math.PI/3;tube(wheel,[0,0,0],[Math.sin(a)*.26,Math.cos(a)*.26,0],.013,steel);}
  tube(cabin,[.62,1.5,2.17],[.64,1.75,2.02],.014,steel);mesh(new THREE.SphereGeometry(.047,10,8),black,cabin,.64,1.75,2.02);
  // Working radio, mast, antenna and a very small radar dome.
  box(cabin,[.32,.15,.18],[-.58,1.78,2.53],black);box(cabin,[.17,.05,.01],[-.59,1.81,2.429],material('#678f76'));
  tube(cabin,[.65,3.2,2.35],[.7,4.67,2.35],.023,darkSteel);tube(cabin,[.7,4.67,2.35],[.7,5.33,2.35],.008,darkSteel);
  tube(cabin,[-.68,3.22,2.5],[-.73,4.15,2.5],.012,steel);
  const radar=mesh(new THREE.SphereGeometry(.26,20,12),ivory,cabin,0,3.37,2.5);radar.scale.set(1,.5,.7);

  // Starboard hydraulic davit, cable winch, open gangway.
  tube(root,[1.18,.72,-1.55],[1.18,4.73,-1.55],.095,ivory,10);
  tube(root,[1.18,4.73,-1.55],[3.5,5,-2],.085,ivory,10);
  tube(root,[1.18,2.7,-1.55],[2.56,4.88,-1.8],.051,steel,10);
  tube(root,[1.12,1,-1.55],[1.12,2.8,-1.55],.066,darkSteel,10);
  const pulley=mesh(new THREE.TorusGeometry(.17,.038,8,20),darkSteel,root,3.5,4.89,-2);pulley.rotation.y=Math.PI/2;
  const cable=mesh(new THREE.CylinderGeometry(.013,.013,1,6),darkSteel,root,3.5,3,-2);
  const winch=mesh(new THREE.CylinderGeometry(.18,.18,.35,16),darkSteel,root,1.17,1.44,-1.55);winch.rotation.z=Math.PI/2;
  const winchRope=mesh(new THREE.CylinderGeometry(.14,.14,.3,16),rope,root,1.17,1.44,-1.55);winchRope.rotation.z=Math.PI/2;
  box(root,[2,.1,.82],[2.29,.72,-2],darkSteel);
  for(let x=1.45;x<3.22;x+=.13) tube(root,[x,.785,-2.37],[x,.785,-1.63],.012,steel,5);
  for(const z of [-2.43,-1.57]) {tube(root,[1.57,.78,z],[1.57,1.5,z],.024,steel);tube(root,[3.15,.78,z],[3.15,1.5,z],.024,steel);tube(root,[1.57,1.5,z],[3.15,1.5,z],.024,steel);}

  // Weathered equipment and fishing lines are tucked away from the walking route.
  box(root,[.8,.4,.67],[-.93,.9,-3.4],ivory);box(root,[.84,.06,.7],[-.93,1.13,-3.4],navy);
  tube(root,[-1.25,1.17,-3.12],[-.63,1.17,-3.12],.016,steel);
  for(let i=0;i<4;i++) {
    const coil=mesh(new THREE.TorusGeometry(.28-i*.043,.018,5,30),rope,root,-.95,.72+i*.013,-1.52);coil.rotation.x=Math.PI/2;
  }
  curveTube(root,[new THREE.Vector3(-.7,.75,-1.5),new THREE.Vector3(-.3,.7,-1.3),new THREE.Vector3(-.4,.71,-.7),new THREE.Vector3(-.9,.72,-.5)],.016,rope,24);
  const lifeRing=new THREE.Group();lifeRing.position.set(-1.1,2.18,1.5);lifeRing.rotation.y=Math.PI/2;root.add(lifeRing);
  mesh(new THREE.TorusGeometry(.35,.094,10,32),orange,lifeRing);
  for(let i=0;i<4;i++) {const a=i*Math.PI/2;const band=mesh(new THREE.TorusGeometry(.35,.097,8,8,Math.PI/7),ivory,lifeRing);band.rotation.z=a;}
  const rodPoints=[new THREE.Vector3(-1.23,.86,-2.4),new THREE.Vector3(-1.6,2.2,-3.1),new THREE.Vector3(-1.78,3.4,-4.1),new THREE.Vector3(-1.67,4.2,-5)];
  curveTube(root,rodPoints,.015,darkSteel,32);tube(root,[-1.67,4.2,-5],[-1.72,.2,-6.1],.003,rope,3);
  for(let j=0;j<7;j++) for(let i=0;i<5;i++) {
    // Rolled seine net in the port aft corner.
    const xx=-1.35+i*.11, zz=-3.85+j*.13;
    tube(root,[xx,.8,zz],[xx+.09,.9,zz+.13],.008,rope,4);tube(root,[xx+.09,.9,zz],[xx,.8,zz+.13],.008,rope,4);
  }
  const propeller=new THREE.Group();propeller.position.set(0,-.64,-4.68);root.add(propeller);
  tube(root,[0,-.6,-3.8],[0,-.64,-4.68],.055,steel);
  mesh(new THREE.SphereGeometry(.11,12,8),brass,propeller);
  for(let i=0;i<3;i++) {const blade=mesh(new THREE.SphereGeometry(.18,12,6),brass,propeller);const a=i*Math.PI*2/3;blade.position.set(Math.sin(a)*.18,Math.cos(a)*.18,0);blade.scale.set(.62,1.1,.16);blade.rotation.z=-a+.5;}
  const rudder=box(root,[.055,.48,.42],[0,-.58,-4.96],navy);rudder.rotation.y=0;

  const cage=createCage(steel,darkSteel,orange);
  const {weapon,knife}=createWeapons(steel,darkSteel,wood,black);
  batchStatic(root,[wheel,propeller,cable,rudder,lifeRing]);
  batchStatic(cage);batchStatic(weapon);batchStatic(knife);
  return {root,wheel,propeller,cable,cage,weapon,knife,update(time,speed,steer,depth){
    wheel.rotation.z=-steer*.68;
    propeller.rotation.z=time*(2+Math.abs(speed)*4);
    rudder.rotation.y=steer*.4;
    const length=Math.max(.15,1.6+depth);cable.scale.y=length;cable.position.set(3.5,5-length/2,-2);
    // Rope and tackle subtly respond to motion without moving collision coordinates.
    lifeRing.rotation.z=Math.sin(time*1.37)*.015;
  }};
}

function createCage(steel:THREE.MeshStandardMaterial,darkSteel:THREE.MeshStandardMaterial,orange:THREE.MeshStandardMaterial) {
  const cage=new THREE.Group();cage.name='Dive cage — 2.2 × 2.8 metres';
  for(const y of [-1.4,1.4]) for(const a of [-1,1]) {
    tube(cage,[-1.1,y,a*1.1],[1.1,y,a*1.1],.044,steel);
    tube(cage,[a*1.1,y,-1.1],[a*1.1,y,1.1],.044,steel);
  }
  for(const x of [-1.1,1.1]) for(const z of [-1.1,1.1]) tube(cage,[x,-1.4,z],[x,1.4,z],.048,steel);
  // Camera-height sight lines remain open while the outer rails keep animals out.
  for(const side of [-1,1]) {
    for(const t of [-.69,.69]) {
      tube(cage,[t,-1.4,side*1.1],[t,1.4,side*1.1],.023,steel);
      tube(cage,[side*1.1,-1.4,t],[side*1.1,1.4,t],.023,steel);
    }
    for(const y of [-.82,1]) {
      tube(cage,[-1.1,y,side*1.1],[1.1,y,side*1.1],.026,steel);
      tube(cage,[side*1.1,y,-1.1],[side*1.1,y,1.1],.026,steel);
    }
  }
  // Welded grate floor plus overhead cross brace and lifting bridle.
  for(let i=-1;i<=1.001;i+=.14) {tube(cage,[i,-1.38,-1.08],[i,-1.38,1.08],.019,darkSteel,5);tube(cage,[-1.08,-1.36,i],[1.08,-1.36,i],.012,steel,5);}
  tube(cage,[-1.1,1.4,-1.1],[1.1,1.4,1.1],.02,steel);
  tube(cage,[1.1,1.4,-1.1],[-1.1,1.4,1.1],.02,steel);
  for(const x of [-1.1,1.1]) for(const z of [-1.1,1.1]) tube(cage,[x,1.4,z],[0,2.35,0],.012,darkSteel,5);
  mesh(new THREE.TorusGeometry(.08,.02,6,16),steel,cage,0,2.4,0);
  // Port hatch hinges, latch, and handholds make this a built object at human scale.
  for(const y of [-.9,.85]) {const hinge=mesh(new THREE.CylinderGeometry(.053,.053,.18,10),darkSteel,cage,-1.11,y,-.69);hinge.rotation.z=Math.PI/2;}
  tube(cage,[-1.08,-.1,.69],[-1.08,.13,.69],.019,orange);
  for(const x of [-.93,.93]) {tube(cage,[x,-.2,-.94],[x,-.2,-.69],.025,orange);tube(cage,[x,-.2,-.69],[x,.15,-.69],.025,orange);}
  for(const x of [-1.12,1.12]) for(const z of [-1.12,1.12]) {
    const bumper=mesh(new THREE.CapsuleGeometry(.062,.45,3,6),material('#1c2729'),cage,x,-1.03,z);bumper.rotation.z=.15;
  }
  return cage;
}

function createWeapons(steel:THREE.Material,darkSteel:THREE.Material,wood:THREE.Material,black:THREE.Material) {
  const weapon=new THREE.Group();weapon.name='Pneumatic spear gun';
  tube(weapon,[0,0,.2],[0,0,-.89],.044,darkSteel,12);
  tube(weapon,[0,.025,.22],[0,.025,-1.3],.009,steel,6);
  const tip=mesh(new THREE.ConeGeometry(.022,.17,6),steel,weapon,0,.025,-1.37);tip.rotation.x=-Math.PI/2;
  box(weapon,[.08,.23,.12],[0,-.135,.1],wood).rotation.x=-.2;
  const triggerGuard=mesh(new THREE.TorusGeometry(.065,.008,5,14,Math.PI*1.7),steel,weapon,0,-.11,-.045);triggerGuard.rotation.y=Math.PI/2;
  for(const x of [-.06,.06]) {tube(weapon,[x,0,-.85],[x,.045,-.44],.012,black);tube(weapon,[x,.045,-.44],[0,.025,-.38],.012,black);}
  box(weapon,[.026,.034,.05],[0,.055,-.79],steel);
  const reel=mesh(new THREE.CylinderGeometry(.08,.08,.065,16),black,weapon,0,-.055,-.19);reel.rotation.z=Math.PI/2;
  const knife=new THREE.Group();knife.name='Dive knife';
  tube(knife,[0,0,.18],[0,0,-.07],.045,black,8);
  for(let i=0;i<6;i++) {const grip=mesh(new THREE.TorusGeometry(.045,.005,4,8),darkSteel,knife,0,0,.13-i*.031);}
  box(knife,[.18,.025,.04],[0,0,-.07],steel);
  const p=[-.047,0,-.09,.047,0,-.09,.043,0,-.38,0,0,-.57,-.047,0,-.38,0,.012,-.1,0,.012,-.39,0,-.012,-.1,0,-.012,-.39];
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex([0,5,4,4,5,6,4,6,3,3,6,2,2,6,1,1,6,5,1,5,0,0,4,7,4,8,7,4,3,8,3,2,8,2,1,8,1,7,8,1,0,7]);g.computeVertexNormals();mesh(g,steel,knife);
  addGlovedGrip(weapon,false);addGlovedGrip(knife,true);
  return {weapon,knife};
}

/** Tapered elliptical lofts make the neoprene read as a fitted glove, not stacked balls. */
function softLoft(parent:THREE.Object3D,points:number[][],radii:number[][],mat:THREE.Material,segments=28) {
  const path=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  const positions:number[]=[],uv:number[]=[],indices:number[]=[],sides=12;
  const cross=new THREE.Vector3(),along=new THREE.Vector3(),up=new THREE.Vector3();
  for(let j=0;j<=segments;j++) {
    const t=j/segments,center=path.getPoint(t);along.copy(path.getTangent(t));
    cross.set(1,0,0).addScaledVector(along,-along.x).normalize();
    if(cross.lengthSq()<.1)cross.set(0,1,0).addScaledVector(along,-along.y).normalize();
    up.crossVectors(along,cross).normalize();
    const n=t*(radii.length-1),i=Math.min(radii.length-2,Math.floor(n)),f=n-i;
    const rx=THREE.MathUtils.lerp(radii[i][0],radii[i+1][0],f),ry=THREE.MathUtils.lerp(radii[i][1],radii[i+1][1],f);
    for(let k=0;k<=sides;k++) {
      const a=k/sides*Math.PI*2,v=center.clone().addScaledVector(cross,Math.cos(a)*rx).addScaledVector(up,Math.sin(a)*ry);
      positions.push(v.x,v.y,v.z);uv.push(k/sides,t);
      if(j<segments&&k<sides){const v0=j*(sides+1)+k,v1=v0+sides+1;indices.push(v0,v0+1,v1,v0+1,v1+1,v1);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();
  return mesh(geometry,mat,parent);
}

function addGlovedGrip(parent:THREE.Group,isKnife:boolean) {
  const neoprene=material('#252e30',.91),reinforcement=material('#414b4c',.84),seam=material('#67706b',.9);
  const hand=new THREE.Group();hand.name='Right hand · stitched neoprene diving glove';parent.add(hand);
  if(isKnife) {
    // A forward grip around the knife's longitudinal handle; knuckles remain below the blade.
    softLoft(hand,[[.055,-.026,-.042],[.071,-.043,.018],[.072,-.044,.09],[.073,-.049,.158]],[[.004,.004],[.051,.047],[.054,.046],[.035,.036]],neoprene);
    for(let i=0;i<4;i++) {
      const z=-.025+i*.043;
      softLoft(hand,[[.085,-.047,z],[.047,-.069,z],[-.018,-.059,z],[-.056,-.025,z],[-.039,.022,z]],[[.019,.02],[.024,.023],[.022,.021],[.018,.019],[.009,.01]],neoprene,20);
    }
    softLoft(hand,[[.075,-.018,.102],[.068,.037,.071],[.027,.049,.002],[-.011,.039,-.022]],[[.025,.025],[.027,.026],[.023,.024],[.009,.012]],reinforcement,20);
    softLoft(hand,[[.08,-.042,.119],[.098,-.067,.185],[.155,-.124,.302],[.26,-.224,.48]],[[.034,.038],[.051,.049],[.068,.063],[.083,.073]],neoprene);
    softLoft(hand,[[.101,-.07,.193],[.111,-.081,.213],[.12,-.09,.233]],[[.055,.052],[.055,.052],[.054,.051]],reinforcement,6);
    curveTube(hand,[new THREE.Vector3(.116,-.018,.225),new THREE.Vector3(.169,-.06,.324),new THREE.Vector3(.248,-.141,.447)],.0022,seam,15);
  } else {
    // Pistol-style spear-gun grip: three wrapped fingers and an index on the trigger.
    softLoft(hand,[[.052,-.062,.128],[.075,-.11,.145],[.079,-.178,.166],[.064,-.218,.183]],[[.018,.025],[.048,.055],[.05,.057],[.033,.036]],neoprene);
    for(let i=0;i<3;i++) {
      const y=-.12-i*.038;
      softLoft(hand,[[.084,y,.11],[.06,y,.024],[-.001,y,.008],[-.053,y,.037],[-.046,y,.095]],[[.018,.02],[.021,.023],[.022,.023],[.019,.022],[.009,.013]],neoprene,20);
    }
    softLoft(hand,[[.074,-.081,.094],[.06,-.082,.012],[.028,-.084,-.058],[-.006,-.089,-.044]],[[.02,.02],[.021,.021],[.019,.019],[.009,.011]],neoprene,20);
    softLoft(hand,[[.051,-.151,.183],[-.012,-.107,.174],[-.055,-.071,.13],[-.047,-.069,.075]],[[.022,.025],[.026,.027],[.024,.025],[.01,.012]],reinforcement,20);
    softLoft(hand,[[.065,-.184,.16],[.077,-.214,.233],[.144,-.256,.355],[.261,-.335,.53]],[[.032,.033],[.05,.049],[.067,.061],[.082,.075]],neoprene);
    softLoft(hand,[[.078,-.215,.238],[.09,-.224,.26],[.101,-.231,.281]],[[.054,.053],[.055,.053],[.053,.051]],reinforcement,6);
    curveTube(hand,[new THREE.Vector3(.097,-.18,.273),new THREE.Vector3(.145,-.207,.362),new THREE.Vector3(.229,-.263,.49)],.0022,seam,15);
    // The rear pistol grip is partly below frame; the supporting hand visibly
    // cradles the barrel, grounding its scale while leaving the sight line clear.
    const support=new THREE.Group();support.position.set(0,-.006,-.51);hand.add(support);
    softLoft(support,[[-.051,-.029,-.03],[-.071,-.048,.03],[-.073,-.052,.1],[-.069,-.057,.145]],[[.012,.02],[.048,.045],[.049,.047],[.03,.035]],neoprene);
    for(let i=0;i<4;i++) {
      const z=-.025+i*.042;
      softLoft(support,[[-.079,-.045,z],[-.043,-.069,z],[.018,-.055,z],[.056,-.022,z],[.036,.024,z]],[[.018,.02],[.022,.022],[.021,.02],[.017,.018],[.008,.01]],neoprene,18);
    }
    softLoft(support,[[-.066,-.026,.1],[-.067,.027,.061],[-.03,.049,-.001],[.003,.039,-.02]],[[.023,.025],[.026,.025],[.021,.022],[.008,.01]],reinforcement,18);
    softLoft(support,[[-.068,-.047,.105],[-.096,-.081,.181],[-.178,-.158,.309],[-.297,-.291,.476]],[[.032,.034],[.047,.046],[.061,.057],[.073,.067]],neoprene);
    softLoft(support,[[-.097,-.083,.185],[-.11,-.096,.207],[-.123,-.108,.23]],[[.05,.049],[.052,.05],[.05,.048]],reinforcement,6);
    curveTube(support,[new THREE.Vector3(-.125,-.065,.23),new THREE.Vector3(-.192,-.125,.343),new THREE.Vector3(-.26,-.196,.44)],.0022,seam,15);
  }
}
