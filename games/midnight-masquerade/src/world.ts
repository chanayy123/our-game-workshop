import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { GameState, MapData, PropKind, Vec, GameEvent, Cop } from './types.ts';
import { box, cyl, orb, material, mesh, makeProp, makePerson, type Person } from './props.ts';

type Particle={node:THREE.Mesh;vx:number;vy:number;vz:number;life:number;total:number;spin:number;growth:number};
type Pulse={node:THREE.Mesh;life:number;total:number;size:number};
const PALETTE={cream:'#dfd3b4',teal:'#3e7b78',dark:'#1d4652',coral:'#d98c77',gold:'#f9d890'};

function canvasTexture(w:number,h:number,draw:(ctx:CanvasRenderingContext2D)=>void):THREE.CanvasTexture {
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;draw(canvas.getContext('2d')!);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;return tex;
}
function flatPlane(w:number,d:number,mat:THREE.Material,x:number,z:number,y=.018):THREE.Mesh {
 const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat);m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;return m;
}
const lerpAngle=(a:number,b:number,t:number)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,t);

export class GameWorld {
 readonly scene=new THREE.Scene();
 readonly camera=new THREE.OrthographicCamera(-24,24,18,-18,.1,150);
 readonly renderer:THREE.WebGLRenderer;
 private width=1;private height=1;private clock=0;
 private player=new THREE.Group();private playerKind:PropKind|null|undefined=undefined;private avatar:Person|null=null;
 private playerVisual=new THREE.Group();private playerRing:THREE.Mesh;private playerMarker:THREE.Sprite;
 private selectedRing:THREE.Mesh;private selectedId:number|null=null;
 private props=new Map<number,THREE.Group>();private targets:THREE.Object3D[]=[];
 private cops:Person[]=[];private copCones:THREE.Mesh[]=[];private copRings:THREE.Mesh[]=[];
 private particles:Particle[]=[];private pulses:Pulse[]=[];private lastEventId=-1;private lastRound=-1;
 private raycaster=new THREE.Raycaster();private pointer=new THREE.Vector2();private ground=new THREE.Plane(new THREE.Vector3(0,1,0),0);
 private shadowTexture:THREE.CanvasTexture;private shadowMaterial:THREE.MeshBasicMaterial;private lights:THREE.Mesh[]=[];private fountainWater:THREE.Mesh|null=null;
 private smokeMeshes:THREE.Mesh[]=[];private lampGlows:THREE.Sprite[]=[];
 private copPrevious=[{x:0,z:0},{x:0,z:0}];
 private state:GameState|null=null;

 constructor(private container:HTMLElement,private map:MapData){
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));this.renderer.setClearColor('#193844');
  this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.25;
  this.renderer.domElement.setAttribute('aria-label','午夜集市三维游戏地图');this.container.appendChild(this.renderer.domElement);
  this.camera.position.set(24,32,34);this.camera.lookAt(0,.15,0);
  this.scene.add(new THREE.HemisphereLight('#d8eff0','#6c7462',2.05));
  const sun=new THREE.DirectionalLight('#ffe3b0',3.05);sun.position.set(-9,20,12);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-22;sun.shadow.camera.right=22;sun.shadow.camera.top=19;sun.shadow.camera.bottom=-19;sun.shadow.camera.near=1;sun.shadow.camera.far=60;sun.shadow.normalBias=.055;sun.shadow.bias=-.00015;sun.shadow.radius=3;this.scene.add(sun);
  const rim=new THREE.DirectionalLight('#82c0ca',1.5);rim.position.set(12,10,-13);this.scene.add(rim);
  this.shadowTexture=canvasTexture(64,64,ctx=>{const grad=ctx.createRadialGradient(32,32,3,32,32,32);grad.addColorStop(0,'rgba(27,44,40,.5)');grad.addColorStop(.4,'rgba(27,44,40,.25)');grad.addColorStop(1,'rgba(27,44,40,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,64,64);});
  this.shadowMaterial=new THREE.MeshBasicMaterial({map:this.shadowTexture,transparent:true,depthWrite:false,opacity:.55});
  this.buildMap();
  this.batchStatic();
  this.player.add(this.playerVisual);this.scene.add(this.player);
  this.playerRing=new THREE.Mesh(new THREE.RingGeometry(.59,.65,48),new THREE.MeshBasicMaterial({color:'#a0f9db',transparent:true,opacity:.9,depthWrite:false}));this.playerRing.rotation.x=-Math.PI/2;this.playerRing.position.y=.055;this.player.add(this.playerRing);
  const marker=canvasTexture(128,128,ctx=>{ctx.translate(64,64);ctx.fillStyle='#edfff1';ctx.strokeStyle='#386b6b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,22);ctx.lineTo(-26,-18);ctx.quadraticCurveTo(0,-32,26,-18);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#46ba9a';ctx.beginPath();ctx.arc(0,-8,6,0,Math.PI*2);ctx.fill();});
  this.playerMarker=new THREE.Sprite(new THREE.SpriteMaterial({map:marker,depthTest:false,transparent:true}));this.playerMarker.scale.set(.72,.72,1);this.player.add(this.playerMarker);
  this.selectedRing=new THREE.Mesh(new THREE.RingGeometry(.6,.67,40),new THREE.MeshBasicMaterial({color:'#ffe9a5',transparent:true,opacity:.9,depthWrite:false}));this.selectedRing.rotation.x=-Math.PI/2;this.selectedRing.visible=false;this.scene.add(this.selectedRing);
  for(let i=0;i<2;i++){
   const person=makePerson(true,i);this.cops.push(person);this.scene.add(person.root);
   const cone=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial({color:i===0?'#ffe4a6':'#a6e6de',transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide}));cone.frustumCulled=false;this.copCones.push(cone);this.scene.add(cone);
   const ring=new THREE.Mesh(new THREE.RingGeometry(.35,.41,32),new THREE.MeshBasicMaterial({color:'#f6c87c',transparent:true,opacity:.4,depthWrite:false}));ring.rotation.x=-Math.PI/2;this.scene.add(ring);this.copRings.push(ring);
  }
  for(let i=0;i<12;i++){const cloud=mesh(new THREE.IcosahedronGeometry(.8,2),new THREE.MeshStandardMaterial({color:'#d1f2e4',transparent:true,opacity:.2,depthWrite:false,roughness:1}));cloud.castShadow=false;cloud.visible=false;this.scene.add(cloud);this.smokeMeshes.push(cloud);}
  this.resize();
 }

 private contact(parent:THREE.Object3D,w:number,d:number,x=0,z=0){const s=flatPlane(w,d,this.shadowMaterial,x,z,.029);parent.add(s);return s;}
 private batchStatic(){
  this.scene.updateMatrixWorld(true);
  const animated=new Set<THREE.Object3D>([...this.lights,...(this.fountainWater?[this.fountainWater]:[])]);
  const batches=new Map<string,{material:THREE.Material;cast:boolean;receive:boolean;meshes:THREE.Mesh[]}>();
  this.scene.traverse(node=>{if(!(node instanceof THREE.Mesh)||Array.isArray(node.material)||node.userData.propId!==undefined||animated.has(node))return;const key=`${node.material.uuid}/${node.castShadow}/${node.receiveShadow}`;if(!batches.has(key))batches.set(key,{material:node.material,cast:node.castShadow,receive:node.receiveShadow,meshes:[]});batches.get(key)!.meshes.push(node);});
  for(const batch of batches.values()){
   if(batch.meshes.length<2)continue;
   const geometries=batch.meshes.map(node=>{const geo=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();geo.applyMatrix4(node.matrixWorld);return geo;});
   const combined=mergeGeometries(geometries,false);for(const geo of geometries)geo.dispose();if(!combined)continue;
   const obj=new THREE.Mesh(combined,batch.material);obj.castShadow=batch.cast;obj.receiveShadow=batch.receive;this.scene.add(obj);
   for(const node of batch.meshes){node.removeFromParent();node.geometry.dispose();}
  }
  // Each prop keeps its own root/id, so batching never changes selection semantics.
  for(const [id,root]of this.props){
   root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert();const groups=new Map<string,THREE.Mesh[]>();
   root.traverse(node=>{if(!(node instanceof THREE.Mesh)||Array.isArray(node.material))return;const list=groups.get(node.material.uuid)??[];list.push(node);groups.set(node.material.uuid,list);});
   for(const nodes of groups.values()){
    if(nodes.length<2)continue;const geos=nodes.map(node=>{const geo=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();geo.applyMatrix4(inverse.clone().multiply(node.matrixWorld));return geo;});const combined=mergeGeometries(geos,false);for(const geo of geos)geo.dispose();if(!combined)continue;
    const node=new THREE.Mesh(combined,nodes[0].material);node.castShadow=true;node.receiveShadow=true;node.userData.propId=id;root.add(node);for(const old of nodes){old.removeFromParent();old.geometry.dispose();}
   }
  }
 }
 private label(text:string,w:number,h:number,color:string,bg:string):THREE.Mesh {
  const tex=canvasTexture(1024,256,ctx=>{ctx.fillStyle=bg;ctx.fillRect(0,0,1024,256);ctx.strokeStyle=color;ctx.lineWidth=3;ctx.strokeRect(18,18,988,220);ctx.font='bold 94px Georgia, serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,512,127);});
  return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:tex,roughness:1}));
 }

 private buildMap(){
  const platform=new THREE.Group();this.scene.add(platform);
  box(platform,29.1,.65,23.1,'#afaa92',0,-.43);box(platform,28.9,.16,22.9,'#efe2c0',0,-.07);
  box(platform,29.5,.25,23.5,'#315763',0,-.87);box(platform,29.8,.14,23.8,'#244b58',0,-1.06);
  const groundTex=canvasTexture(1024,1024,ctx=>{ctx.fillStyle='#d8ceb2';ctx.fillRect(0,0,1024,1024);let seed=13;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};for(let row=0;row<24;row++){for(let col=-1;col<16;col++){const x=col*68+(row%2)*34,y=row*43;const v=Math.floor(196+rand()*20);ctx.fillStyle=`rgb(${v+13},${v+6},${v-15})`;ctx.fillRect(x+1,y+1,65,40);ctx.fillStyle='rgba(255,255,239,.13)';ctx.fillRect(x+2,y+2,64,2);}}});groundTex.wrapS=groundTex.wrapT=THREE.RepeatWrapping;groundTex.repeat.set(2,1.6);groundTex.anisotropy=8;
  platform.add(flatPlane(28.8,22.8,new THREE.MeshStandardMaterial({map:groundTex,roughness:.95}),0,0,.018));
  const tileTex=canvasTexture(512,512,ctx=>{ctx.fillStyle='#bfafa0';ctx.fillRect(0,0,512,512);for(let y=0;y<8;y++)for(let x=0;x<8;x++){ctx.fillStyle=(x+y)%2?'#eadbc2':'#cad3bd';ctx.fillRect(x*64+2,y*64+2,60,60);}});tileTex.wrapS=tileTex.wrapT=THREE.RepeatWrapping;tileTex.repeat.set(3,2.7);platform.add(flatPlane(10.9,9.5,new THREE.MeshStandardMaterial({map:tileTex,roughness:1}),-8,-5.75,.023));
  const gardenTex=canvasTexture(512,512,ctx=>{ctx.fillStyle='#adc2a2';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#bdcbaa';ctx.lineWidth=3;for(let y=0;y<512;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();}for(let x=0;x<512;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke();}});gardenTex.wrapS=gardenTex.wrapT=THREE.RepeatWrapping;gardenTex.repeat.set(2.1,2.2);platform.add(flatPlane(9.0,10.1,new THREE.MeshStandardMaterial({map:gardenTex}),8.8,-5.75,.024));
  platform.add(flatPlane(10.6,8.7,new THREE.MeshStandardMaterial({color:'#c7bda1',roughness:1}),-8,5.8,.023));
  // Flush inset paving lines guide routes without adding invisible obstacles.
  for(const x of [-1.8,2.8])platform.add(flatPlane(.14,20.5,material('#eee1ba'),x,0,.027));
  for(const z of [1.9,10.2])platform.add(flatPlane(26,.14,material('#e5d6b1'),0,z,.028));
  for(let i=0;i<8;i++)platform.add(flatPlane(.4,1.15,material('#eee1bd'),-.5+i*.55,10.7,.03));
  for(const [x,z]of [[-12,2.5],[11,9],[-2,-9],[3,-2]]){const drain=flatPlane(.65,.32,material('#7e8d7e'),x,z,.032);platform.add(drain);for(let i=0;i<5;i++)platform.add(flatPlane(.045,.23,material('#4d6964'),x-.24+i*.12,z,.035));}
  for(const wall of this.map.walls){
   const g=new THREE.Group();g.position.set(wall.x,0,wall.z);this.scene.add(g);this.contact(g,wall.w+.7,wall.d+.7);
   if(wall.x===7&&wall.z===6){this.buildFountain(g);continue;}
   if(wall.style==='hedge'){
    box(g,wall.w,.28,wall.d,'#99a88e',0,.14);box(g,wall.w,wall.h-.25,wall.d,'#347466',0,wall.h*.5+.125);
    const long=Math.max(wall.w,wall.d);for(let i=0;i<Math.ceil(long/.5);i++){const p=-long/2+.27+i*.5;const shrub=orb(g,.38,i%2?'#4c8b72':'#5a9478',wall.w>wall.d?p:0,wall.h-.1,wall.d>wall.w?p:0);shrub.scale.set(wall.w>wall.d?1:.92,.56,wall.d>wall.w?1:.92);}
    for(let i=0;i<Math.ceil(long);i++){const p=-long/2+.5+i;const flower=orb(g,.07,i%2?'#efbd8e':'#e0d4b2',wall.w>wall.d?p:wall.w*.5+.035,.42,wall.d>wall.w?p:wall.d*.5+.035);flower.castShadow=false;}
   }else if(wall.style==='stall'){
    const main=wall.w>5;box(g,wall.w,wall.h,wall.d,main?'#487d77':'#68857b',0,wall.h/2);
    box(g,wall.w+.16,.13,wall.d+.14,'#e0c99e',0,.12);box(g,wall.w+.25,.13,wall.d+.1,'#d6b393',0,wall.h);
    if(main){
     for(const x of [-4,-.8,3.1]){box(g,2.25,1.4,.08,'#253e46',x,1.3,.54);box(g,2.0,1.2,.085,'#dfa86d',x,1.32,.59);box(g,.065,1.24,.085,'#426768',x,1.32,.65);box(g,2.07,.065,.085,'#426768',x,1.34,.65);box(g,2.45,.12,.37,'#dcc6a2',x,.58,.59);}
     const sign=this.label('CAFÉ MINUIT',7.6,.78,'#ffe9b6','#294f58');sign.position.set(-.15,2.62,.55);g.add(sign);
     const awning=new THREE.Group();awning.position.set(0,2.33,.54);awning.rotation.x=.1;g.add(awning);
     for(let i=0;i<24;i++){box(awning,.49,.09,1.0,i%2?'#f2d5ad':'#d38373',-5.75+i*.5,0,.48);const val=box(awning,.49,.22,.075,i%2?'#f2d5ad':'#d38373',-5.75+i*.5,-.1,.96);}
     for(const x of [-5.5,5.5]){cyl(g,.055,.055,.8,'#d5c08e',x,2.0,.6);orb(g,.12,'#ffe0a2',x,1.65,.65);}
    }else{
     for(let i=0;i<12;i++)box(g,.22,.8,.024,i%2?'#729288':'#8aa295',-1.45+i*.26,.92,wall.d/2+.02);
     const sign=this.label('DÉPÔT 07',2.85,.55,'#efdaad','#345760');sign.position.set(0,1.69,wall.d/2+.025);g.add(sign);
     for(let i=0;i<9;i++)box(g,.4,.08,wall.d+.25,i%2?'#bc886d':'#d7ad80',-1.6+i*.4,wall.h+.06);
    }
   }else{
    box(g,wall.w,wall.h,wall.d,'#c28f74',0,wall.h/2);box(g,wall.w+.08,.14,wall.d+.12,'#e2c9a4',0,wall.h+.04);
    const horizontal=wall.w>wall.d;const long=Math.max(wall.w,wall.d);for(let row=0;row<Math.floor(wall.h/.3);row++){if(horizontal){box(g,wall.w,.014,.013,'#dfbfa0',0,.27+row*.3,wall.d/2+.008);for(let i=0;i<Math.ceil(long/.75);i++)box(g,.012,.27,.014,'#dfbfa0',-long/2+(i+.5+(row%2)*.5)*.75,.14+row*.3,wall.d/2+.009);}else{box(g,.014,.014,wall.d,'#dfbfa0',wall.w/2+.008,.27+row*.3);for(let i=0;i<Math.ceil(long/.75);i++)box(g,.014,.27,.012,'#dfbfa0',wall.w/2+.009,.14+row*.3,-long/2+(i+.5+(row%2)*.5)*.75);}}
    if(wall.z===-11){for(let i=0;i<13;i++) {box(g,.06,.7,.06,'#35615f',-4.5+i*.75,wall.h+.42);orb(g,.075,'#e1c69b',-4.5+i*.75,wall.h+.8);}box(g,9.4,.07,.06,'#426c67',0,wall.h+.65);}
   }
  }
  for(const prop of this.map.props){const g=makeProp(prop.kind);g.position.set(prop.x,.034,prop.z);g.rotation.y=prop.angle;g.userData.propId=prop.id;g.traverse(o=>o.userData.propId=prop.id);this.scene.add(g);this.props.set(prop.id,g);this.targets.push(g);this.contact(this.scene,prop.kind==='table'?1.8:1.2,prop.kind==='table'?1.8:1.1,prop.x,prop.z);
   if(prop.kind==='lamp'){const glowTex=canvasTexture(64,64,ctx=>{const grad=ctx.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'rgba(255,230,162,.6)');grad.addColorStop(.2,'rgba(255,222,144,.16)');grad.addColorStop(1,'rgba(255,205,116,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,64,64);});const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.set(prop.x,2.45,prop.z);glow.scale.set(1.5,1.5,1.5);this.scene.add(glow);this.lampGlows.push(glow);const pool=flatPlane(3.6,3.6,new THREE.MeshBasicMaterial({map:glowTex,transparent:true,depthWrite:false,opacity:.24}),prop.x,prop.z,.04);this.scene.add(pool);}
  }
  this.buildStrings();this.buildBoundaryDetails();
 }

 private buildFountain(g:THREE.Group){
  box(g,2.1,.24,2.1,'#82948c',0,.12);cyl(g,1.01,1.01,.34,'#b9c9b2',0,.31,0,24);cyl(g,.91,.94,.18,'#d6ddbf',0,.53,0,24);cyl(g,.82,.84,.08,'#658f91',0,.57,0,32);
  this.fountainWater=cyl(g,.81,.81,.03,'#6fb5ae',0,.621,0,32);this.fountainWater.material=new THREE.MeshStandardMaterial({color:'#72c0b9',metalness:.35,roughness:.22,transparent:true,opacity:.9});
  cyl(g,.15,.24,.66,'#acc7b5',0,.67,0,12);cyl(g,.47,.16,.13,'#cbd8b8',0,1.03,0,20);cyl(g,.43,.43,.022,'#71bdb9',0,1.103,0,20);
  orb(g,.13,'#d6dcc0',0,1.21);const jet=cyl(g,.028,.018,.35,'#c1eadd',0,1.41);jet.material=new THREE.MeshStandardMaterial({color:'#c1f3e5',transparent:true,opacity:.7});
  for(let i=0;i<8;i++){const a=i*Math.PI/4;const drip=cyl(g,.014,.015,.48,'#bde4d4',Math.sin(a)*.35,.79,Math.cos(a)*.35,5);drip.material=new THREE.MeshStandardMaterial({color:'#bde4d4',transparent:true,opacity:.55});this.lights.push(drip);}
 }
 private buildStrings(){
  const strings=[{a:new THREE.Vector3(-13.4,3.5,-9.4),b:new THREE.Vector3(-2.7,3.2,-.3)},{a:new THREE.Vector3(-12.8,3.4,-1.1),b:new THREE.Vector3(-2.7,3.5,-9.4)},{a:new THREE.Vector3(4.3,3.2,-9.9),b:new THREE.Vector3(13.5,3.1,-1.5)}];
  const bulbMat=new THREE.MeshStandardMaterial({color:'#ffe5ac',emissive:'#ffd696',emissiveIntensity:2.3});
  for(const line of strings){const points:THREE.Vector3[]=[];for(let i=0;i<=30;i++){const t=i/30;const p=line.a.clone().lerp(line.b,t);p.y-=Math.sin(t*Math.PI)*.75;points.push(p);}
   const cable=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),32,.013,4,false),material('#435a59'));this.scene.add(cable);
   for(let i=2;i<30;i+=3){const p=points[i];const bulb=mesh(new THREE.SphereGeometry(.07,8,6),bulbMat,p.x,p.y-.12,p.z);bulb.castShadow=false;this.scene.add(bulb);const cord=cyl(this.scene,.016,.016,.12,'#53655b',p.x,p.y-.04,p.z,4);cord.castShadow=false;}
  }
 }
 private buildBoundaryDetails(){
  // Everything here stays on the rim, outside playable ground.
  for(const [x,z,scale]of [[-14.05,-10.35,1],[14,-10.8,.9],[14,10.8,.72],[-13.9,10.6,.78]]){
   const tree=new THREE.Group();tree.position.set(x,0,z);tree.scale.setScalar(scale);this.scene.add(tree);
   cyl(tree,.13,.2,2.1,'#7f8170',0,1.02,0,8);const branch=cyl(tree,.075,.11,1.15,'#7f8170',.23,1.69,0,7);branch.rotation.z=-.48;
   orb(tree,.78,'#2e695e',0,2.8,0);orb(tree,.66,'#4c8a70',.35,3.34,.07);orb(tree,.65,'#4a8870',-.39,2.97,.15);orb(tree,.5,'#66a081',.28,3.6,.13);this.contact(tree,2,2);
  }
  // Painted district names are surface markings, not game obstacles.
  const markings=[{text:'CAFÉ',x:-8,z:-.1,w:3.3},{text:'JARDIN',x:8.5,z:-1.6,w:3.3},{text:'LIVRAISON',x:-7.5,z:9.75,w:4.8},{text:'MINUIT',x:6.9,z:9.6,w:3.5}];
  for(const item of markings){const tex=canvasTexture(512,128,ctx=>{ctx.clearRect(0,0,512,128);ctx.fillStyle='#667d71';ctx.font='bold 68px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.text,256,64);});this.scene.add(flatPlane(item.w,.7,new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.62,depthWrite:false}),item.x,item.z,.037));}
  // Tiny leaves and paper scraps give the paving life without hiding collision surfaces.
  for(let i=0;i<65;i++){const x=Math.sin(i*53.61)*13.1,z=Math.cos(i*17.37)*10.1;const leaf=flatPlane(.045+.055*(i%3),.12,new THREE.MeshBasicMaterial({color:i%4===0?'#d7a96d':'#8d9f78'}),x,z,.039);leaf.rotation.z=i*1.5;this.scene.add(leaf);}
  const back=this.label('MARCHÉ DE MINUIT',7.4,.87,'#e9d6ac','#36626a');back.position.set(7.8,2.45,-10.43);this.scene.add(back);
 }

 resize(){
  this.width=this.container.clientWidth||window.innerWidth;this.height=this.container.clientHeight||window.innerHeight;
  this.renderer.setSize(this.width,this.height,false);
  const aspect=this.width/this.height;
  const h=aspect>1.55?33:Math.max(33,43/aspect);const w=h*aspect;
  this.camera.left=-w/2;this.camera.right=w/2;this.camera.top=h/2;this.camera.bottom=-h/2;
  // A small optical offset balances the landscape against the instruction card.
  this.camera.setViewOffset(this.width,this.height,-Math.min(76,this.width*.045),-12,this.width,this.height);this.camera.updateProjectionMatrix();
 }
 project(x:number,z:number,y=0){const v=new THREE.Vector3(x,y,z).project(this.camera);const rect=this.renderer.domElement.getBoundingClientRect();return{x:rect.left+(v.x*.5+.5)*this.width,y:rect.top+(-v.y*.5+.5)*this.height};}
 private pointerAt(clientX:number,clientY:number){const r=this.renderer.domElement.getBoundingClientRect();this.pointer.set((clientX-r.left)/r.width*2-1,-(clientY-r.top)/r.height*2+1);this.raycaster.setFromCamera(this.pointer,this.camera);}
 pick(clientX:number,clientY:number):number|null{this.pointerAt(clientX,clientY);const targets=this.state?.role==='police'&&this.player.visible?[...this.targets,this.playerVisual]:this.targets;const hit=this.raycaster.intersectObjects(targets,true)[0];return hit?Number(hit.object.userData.propId):null;}
 groundAt(clientX:number,clientY:number):Vec|null{this.pointerAt(clientX,clientY);const p=new THREE.Vector3();return this.raycaster.ray.intersectPlane(this.ground,p)?{x:p.x,z:p.z}:null;}
 setSelected(id:number|null){this.selectedId=id;}

 private playerForm(kind:PropKind|null){
  if(this.playerKind===kind)return;this.playerKind=kind;this.playerVisual.traverse(node=>{if(node instanceof THREE.Mesh)node.geometry.dispose();});this.avatar?.uniform.dispose();this.playerVisual.clear();this.avatar=null;
  if(kind){this.playerVisual.add(makeProp(kind));}else{this.avatar=makePerson(false);this.playerVisual.add(this.avatar.root);}
  this.playerVisual.traverse(node=>node.userData.propId=-1);
 }
 private animatePerson(person:Person,dt:number,speed:number,angle:number,inspect:boolean,attack=0){
  person.root.rotation.y=lerpAngle(person.root.rotation.y,angle,dt*10);
  const gait=Math.sin(this.clock*11)*Math.min(1,speed)*.53;person.leftLeg.rotation.x=gait;person.rightLeg.rotation.x=-gait;
  person.leftArm.rotation.x=-gait*.7;person.rightArm.rotation.x=gait*.7;
  person.torso.position.y=.6+Math.abs(Math.sin(this.clock*11))*Math.min(.055,speed*.055);
  person.head.rotation.y=inspect?Math.sin(this.clock*2.5)*.27:Math.sin(this.clock*1.7)*.09;
  person.torso.rotation.x=inspect?.1:0;
  if(attack>0){person.rightArm.rotation.x=-1.1-Math.sin(attack*12)*.9;person.rightArm.rotation.z=-.32;}
  else person.rightArm.rotation.z=0;
 }
 private updateCone(cop:Cop,index:number){
  const verts:number[]=[];const range=cop.mode==='chase'?9.5:8;const half=cop.mode==='chase'?1.5:1.03;
  const endpoints:THREE.Vector3[]=[];
  for(let i=0;i<=24;i++){
   const angle=cop.angle-half+i/24*half*2;const dx=Math.sin(angle),dz=Math.cos(angle);let len=range;
   if(Math.abs(dx)>1e-6)len=Math.min(len,((dx>0?14.35:-14.35)-cop.x)/dx);
   if(Math.abs(dz)>1e-6)len=Math.min(len,((dz>0?11.35:-11.35)-cop.z)/dz);
   for(const wall of this.map.walls){const minX=wall.x-wall.w/2,maxX=wall.x+wall.w/2,minZ=wall.z-wall.d/2,maxZ=wall.z+wall.d/2;const t1=(minX-cop.x)/dx,t2=(maxX-cop.x)/dx,t3=(minZ-cop.z)/dz,t4=(maxZ-cop.z)/dz;const near=Math.max(Math.min(t1,t2),Math.min(t3,t4)),far=Math.min(Math.max(t1,t2),Math.max(t3,t4));if(far>=Math.max(0,near)&&near>=0)len=Math.min(len,near);}
   endpoints.push(new THREE.Vector3(cop.x+dx*len,.046,cop.z+dz*len));
  }
  for(let i=0;i<24;i++){verts.push(cop.x,.046,cop.z,...endpoints[i].toArray(),...endpoints[i+1].toArray());}
  const cone=this.copCones[index];cone.geometry.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));cone.geometry.computeBoundingSphere();
  const mat=cone.material as THREE.MeshBasicMaterial;mat.color.set(cop.mode==='chase'?'#ff8c6c':index===0?'#ffe3a0':'#b7eee3');mat.opacity=cop.mode==='inspect'?.12:.075;
 }

 private pulse(x:number,z:number,color:string,size:number,life=1){
  const node=new THREE.Mesh(new THREE.RingGeometry(.92,1,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));node.rotation.x=-Math.PI/2;node.position.set(x,.095,z);this.scene.add(node);this.pulses.push({node,life,total:life,size});
 }
 private burst(event:GameEvent){
  const palette=event.type==='wrong'?['#ff9e80','#ffe1aa','#db7b68']:event.type==='found'||event.type==='lose'?['#ec836b','#ffe0a0','#e76364']:event.type==='win'?['#93e6b3','#ffe0a0','#eea58d']:['#97e6cc','#f8edb5','#a7dbe2'];
  this.pulse(event.x,event.z,palette[0],event.type==='noise'?4:2,event.type==='noise'?1.2:.8);
  const count=event.type==='step'?0:event.type==='noise'?7:event.type==='win'?48:24;
  for(let i=0;i<count;i++){
   const node=mesh(new THREE.IcosahedronGeometry(.05+(i%3)*.025,0),new THREE.MeshBasicMaterial({color:palette[i%palette.length],transparent:true,opacity:1}),event.x,.55+(i%4)*.16,event.z);node.castShadow=false;this.scene.add(node);
   const a=i*2.39996,v=.7+(i%5)*.35;this.particles.push({node,vx:Math.sin(a)*v,vy:1.1+(i%6)*.29,vz:Math.cos(a)*v,life:.6+(i%6)*.13,total:1.25,spin:i*.3,growth:0});
  }
 }

 update(state:GameState,dt:number){
  this.state=state;const police=state.role==='police';
  this.clock+=dt;
  if(state.round!==this.lastRound){this.lastRound=state.round;this.lastEventId=-1;for(const p of [...this.particles,...this.pulses]){this.scene.remove(p.node);p.node.geometry.dispose();(p.node.material as THREE.Material).dispose();}this.particles=[];this.pulses=[];}
  const player=state.player;this.playerForm(player.kind);this.player.position.set(player.x,.05,player.z);
  this.player.visible=!(police&&(state.phase==='prepare'||state.phase==='intro'));
  this.playerVisual.rotation.y=lerpAngle(this.playerVisual.rotation.y,player.angle,dt*14);
  this.playerVisual.position.y=player.moving?Math.abs(Math.sin(this.clock*(player.sprinting?18:12)))*(player.kind?.035:.045):Math.sin(this.clock*3)*.01;
  this.playerVisual.rotation.z=player.kind&&player.moving?Math.sin(this.clock*12)*.018:0;
  const flash=Math.max(0,Math.min(1,player.transformFlash));const bump=1+Math.sin(flash*Math.PI)*.18;this.playerVisual.scale.set(bump,1+Math.sin(flash*Math.PI)*.25,bump);
  if(this.avatar)this.animatePerson(this.avatar,dt,player.moving?(player.sprinting?1.6:1):0,0,false);
  (this.playerRing.material as THREE.MeshBasicMaterial).color.set(player.exposed?'#ff9985':'#9af2d5');(this.playerRing.material as THREE.MeshBasicMaterial).opacity=.62+Math.sin(this.clock*3)*.16;
  const markerHeight=player.kind==='lamp'?3.35:player.kind==='pot'?1.9:player.kind==='table'?1.67:player.kind==='chair'?1.72:player.kind?1.5:2.08;
  this.playerMarker.position.set(0,markerHeight+Math.sin(this.clock*3)*.08,0);this.playerMarker.visible=state.phase!=='intro';this.playerRing.visible=state.phase!=='intro';
  const markerParent=police?this.scene:this.player;
  if(this.playerMarker.parent!==markerParent){markerParent.add(this.playerMarker,this.playerRing);}
  if(police){this.playerMarker.position.set(state.cops[0].x,2.05,state.cops[0].z);this.playerRing.position.set(state.cops[0].x,.07,state.cops[0].z);(this.playerRing.material as THREE.MeshBasicMaterial).color.set('#9af2d5');}
  else this.playerRing.position.set(0,.055,0);
  for(let i=0;i<state.cops.length;i++){
   const cop=state.cops[i],person=this.cops[i];if(!person)continue;const visible=state.phase==='search'||state.phase==='won'||state.phase==='lost'||(police&&state.phase==='prepare');person.root.visible=visible;this.copCones[i].visible=visible&&cop.hp>0;this.copRings[i].visible=visible;
   const prev=this.copPrevious[i];const speed=dt>0?Math.min(2,Math.hypot(cop.x-prev.x,cop.z-prev.z)/Math.max(.001,dt)):0;prev.x=cop.x;prev.z=cop.z;
   person.root.position.set(cop.x,.04,cop.z);this.animatePerson(person,dt,speed,cop.angle,cop.mode==='inspect'||cop.mode==='observe',cop.attackFlash);
   person.uniform.color.set(cop.hurtFlash>0?'#b76760':i===0?'#304e72':'#3e697b');person.uniform.emissive.set(cop.hurtFlash>0?'#481a16':'#000000');
   person.root.rotation.z=cop.hp<=0?-.25:Math.sin(this.clock*45)*cop.hurtFlash*.065;person.torso.rotation.x=cop.hp<=0?.4:person.torso.rotation.x;
   this.copRings[i].position.set(cop.x,.065,cop.z);(this.copRings[i].material as THREE.MeshBasicMaterial).color.set(cop.mode==='chase'?'#ef806a':cop.mode==='inspect'?'#efcb80':'#689491');
   if(visible&&cop.hp>0)this.updateCone(cop,i);
  }
  const selected=this.selectedId===-1&&police?player:this.selectedId===null?undefined:this.map.props[this.selectedId];this.selectedRing.visible=!!selected&&state.phase!=='intro';if(selected){this.selectedRing.position.set(selected.x,.074,selected.z);const size=selected.kind==='table'?1.4:1;this.selectedRing.scale.setScalar(size*(1+Math.sin(this.clock*4)*.035));}
  for(const event of state.events){if(event.id>this.lastEventId){const hiddenEffect=police&&(event.type==='escape'||event.type==='transform'||event.type==='smoke'||(event.type==='noise'&&Math.hypot(event.x-state.cops[0].x,event.z-state.cops[0].z)>11));if(!hiddenEffect)this.burst(event);this.lastEventId=event.id;}}
  for(let i=this.particles.length-1;i>=0;i--){const p=this.particles[i];p.life-=dt;if(p.life<=0){this.scene.remove(p.node);p.node.geometry.dispose();(p.node.material as THREE.Material).dispose();this.particles.splice(i,1);continue;}p.vy-=dt*3.5;p.node.position.x+=p.vx*dt;p.node.position.y=Math.max(.1,p.node.position.y+p.vy*dt);p.node.position.z+=p.vz*dt;p.node.rotation.y+=dt*(2+p.spin);p.node.rotation.x+=dt*3;(p.node.material as THREE.MeshBasicMaterial).opacity=Math.min(1,p.life/.35);}
  for(let i=this.pulses.length-1;i>=0;i--){const p=this.pulses[i];p.life-=dt;if(p.life<=0){this.scene.remove(p.node);p.node.geometry.dispose();(p.node.material as THREE.Material).dispose();this.pulses.splice(i,1);continue;}const t=1-p.life/p.total;p.node.scale.setScalar(.1+t*p.size);(p.node.material as THREE.MeshBasicMaterial).opacity=(1-t)*.8;}
  for(let i=0;i<this.smokeMeshes.length;i++){const s=this.smokeMeshes[i];s.visible=player.smokeTime>0;if(s.visible){const a=i*2.39996+this.clock*.15;s.position.set(player.x+Math.sin(a)*(1+(i%3)*.65),.5+(i%4)*.4,player.z+Math.cos(a)*(1+(i%3)*.65));s.scale.setScalar(.8+Math.sin(this.clock+i)*.15);(s.material as THREE.MeshStandardMaterial).opacity=Math.min(.25,player.smokeTime*.2);}}
  if(this.fountainWater){(this.fountainWater.material as THREE.MeshStandardMaterial).color.setHSL(.46,.35,.54+Math.sin(this.clock*2)*.025);}
  for(let i=0;i<this.lights.length;i++)this.lights[i].scale.y=.94+Math.sin(this.clock*5+i)*.08;
  this.renderer.render(this.scene,this.camera);
 }
}
