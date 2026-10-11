import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {ISLANDS,TREES,landHeight} from './islands.ts';
import type {Game} from './game.ts';

const V=(x:number,y:number,z:number)=>new THREE.Vector3(x,y,z);
const rng=(seed:number)=>{let n=seed;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};};
function cylinder(parent:THREE.Object3D,a:THREE.Vector3,b:THREE.Vector3,r:number,mat:THREE.Material){const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.7,r,a.distanceTo(b),8),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());parent.add(m);return m;}
function barkTexture(){const c=document.createElement('canvas');c.width=256;c.height=512;const ctx=c.getContext('2d')!,r=rng(913);ctx.fillStyle='#60574a';ctx.fillRect(0,0,256,512);for(let i=0;i<2400;i++){ctx.fillStyle=r()>.45?'rgba(30,24,18,.32)':'rgba(169,160,130,.24)';ctx.fillRect(r()*256,r()*512,.5+r()*3,4+r()*80);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
function foliageTexture(){
  const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d')!,r=rng(125);
  ctx.clearRect(0,0,512,256);
  for(let branch=0;branch<19;branch++){
    const x=25+branch*24,spread=70*Math.sin(x/512*Math.PI)+12;
    for(const side of [-1,1]){
      const ex=x+45,ey=128+side*spread;
      ctx.strokeStyle='#5d6140';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,128);ctx.lineTo(ex,ey);ctx.stroke();
      for(let n=0;n<22;n++){
        const t=n/22,px=x+(ex-x)*t,py=128+(ey-128)*t;
        for(let k=0;k<5;k++){
          ctx.strokeStyle=`rgb(${48+r()*39},${75+r()*47},${39+r()*29})`;ctx.lineWidth=1.2+r()*1.3;
          ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+8+r()*13,py+(r()-.5)*36);ctx.stroke();
        }
      }
    }
  }
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function groundTexture(){
  const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d')!,r=rng(762);
  ctx.fillStyle='#a79e88';ctx.fillRect(0,0,512,512);
  for(let k=0;k<55000;k++){const v=90+r()*110;ctx.fillStyle=`rgba(${v},${v*.96},${v*.81},.45)`;ctx.fillRect(r()*512,r()*512,.6+r()*2,.6+r()*2);}
  for(let k=0;k<1000;k++){ctx.fillStyle='rgba(77,72,54,.32)';ctx.beginPath();ctx.ellipse(r()*512,r()*512,1+r()*3,.5+r()*1.6,r()*3,0,Math.PI*2);ctx.fill();}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(22,22);return t;
}
function batch(root:THREE.Group,exclude:THREE.Object3D[]=[]){
  root.updateMatrixWorld(true);const inv=root.matrixWorld.clone().invert(),groups=new Map<THREE.Material,{gs:THREE.BufferGeometry[];meshes:THREE.Mesh[]}>();
  root.traverse(o=>{if(!(o instanceof THREE.Mesh)||exclude.includes(o))return;const m=o.material as THREE.Material,g=groups.get(m)||{gs:[],meshes:[]};const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(inv.clone().multiply(o.matrixWorld));geo.deleteAttribute('uv1');g.gs.push(geo);g.meshes.push(o);groups.set(m,g);});
  for(const [mat,g] of groups){const uv=g.gs.every(x=>!!x.getAttribute('uv'));if(!uv)g.gs.forEach(x=>x.deleteAttribute('uv'));const merged=mergeGeometries(g.gs);if(!merged)continue;g.meshes.forEach(m=>m.removeFromParent());g.gs.forEach(x=>x.dispose());const mesh=new THREE.Mesh(merged,mat);mesh.receiveShadow=true;mesh.castShadow=true;root.add(mesh);}
}

export class ShoreWorld {
  private trees:{root:THREE.Group;foliage:THREE.Mesh;stump:THREE.Mesh;id:number}[]=[];
  private flags:THREE.Mesh[]=[];
  private chips:THREE.Points;private chipAge=10;private chipOrigin=new THREE.Vector3();
  readonly axe:THREE.Group;
  constructor(scene:THREE.Scene){
    const bark=barkTexture();bark.repeat.set(2,5);const wood=new THREE.MeshStandardMaterial({map:bark,bumpMap:bark,bumpScale:.035,roughness:.93});
    const plank=new THREE.MeshStandardMaterial({color:0x897357,map:bark,roughness:.89});
    const leaves=new THREE.MeshStandardMaterial({map:foliageTexture(),alphaTest:.32,side:THREE.DoubleSide,roughness:1,color:0xd5ddc6});
    const ground=groundTexture();const sand=new THREE.MeshStandardMaterial({vertexColors:true,map:ground,bumpMap:ground,bumpScale:.13,roughness:1});
    const rockmat=new THREE.MeshStandardMaterial({color:0x646a60,roughness:.98,flatShading:false});
    for(const island of ISLANDS){
      const g=new THREE.PlaneGeometry(island.radius*2.45,island.radius*2.45,80,80);g.rotateX(-Math.PI/2);
      const p=g.getAttribute('position'),colors=[];
      for(let k=0;k<p.count;k++){
        const x=p.getX(k),z=p.getZ(k),d=Math.hypot(x,z)/island.radius;
        const shore=1+.025*Math.sin(Math.atan2(z,x)*9+island.id);
        const h=d<.82?landHeight(island,x+island.x,z+island.z):THREE.MathUtils.lerp(landHeight(island,x+island.x,z+island.z),-8,THREE.MathUtils.smoothstep(d,.82,shore+.12))-30*THREE.MathUtils.smoothstep(d,shore+.08,1.22);
        p.setY(k,h);const grain=Math.sin(x*9+z*17)*Math.cos(z*8-x*13)*.018;
        const moss=Math.max(0,1-d/.77);colors.push(.52+grain-moss*.19,.49+grain-moss*.115,.37+grain-moss*.14);
      }
      g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();const terrain=new THREE.Mesh(g,sand);terrain.position.set(island.x,0,island.z);terrain.receiveShadow=true;scene.add(terrain);
      const rand=rng(74+island.id),rocks=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,1),rockmat,30),dummy=new THREE.Object3D();
      for(let k=0;k<30;k++){const a=rand()*Math.PI*2,r=island.radius*(.3+rand()*.67),x=island.x+Math.sin(a)*r,z=island.z+Math.cos(a)*r;dummy.position.set(x,landHeight(island,x,z)-.1,z);dummy.scale.set(.35+rand()*1.4,.2+rand()*.6,.4+rand());dummy.rotation.set(rand(),rand()*6,rand());dummy.updateMatrix();rocks.setMatrixAt(k,dummy.matrix);}scene.add(rocks);
      const dock=new THREE.Group();scene.add(dock);
      const length=Math.abs(island.dockX-island.landingX),mid=(island.dockX+island.landingX)/2;
      for(let k=0;k<Math.ceil(length/.43);k++){const board=new THREE.Mesh(new THREE.BoxGeometry(.4,.16,2.35),plank);board.position.set(island.landingX+island.side*k*.43,1.65,island.z);board.receiveShadow=true;dock.add(board);}
      for(const d of [-1,1])for(let k=0;k<4;k++){const x=island.landingX+island.side*k*length/3;cylinder(dock,V(x,-2,island.z+d*1.1),V(x,2.35,island.z+d*1.1),.13,wood);}
      cylinder(dock,V(mid,0,island.z+2),V(mid,6,island.z+2),.055,wood);
      const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.8,10,3),new THREE.MeshStandardMaterial({color:0xc5aa70,side:THREE.DoubleSide,roughness:1}));flag.position.set(mid+.9,5.5,island.z+2);dock.add(flag);this.flags.push(flag);
      const signcanvas=document.createElement('canvas');signcanvas.width=512;signcanvas.height=256;const ctx=signcanvas.getContext('2d')!;ctx.fillStyle='#263e38';ctx.fillRect(0,0,512,256);ctx.fillStyle='#dfd2ac';ctx.textAlign='center';ctx.font='36px Microsoft YaHei';ctx.fillText(island.name,256,77);ctx.font='25px Microsoft YaHei';ctx.fillText('木材 · 工具 · 避风锚地',256,139);ctx.fillText('B 靠岸 / 登船',256,196);
      const sign=new THREE.Mesh(new THREE.BoxGeometry(2.7,1.35,.08),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(signcanvas),roughness:.9}));sign.position.set(island.landingX,3.4,island.z+2);sign.rotation.y=island.side*Math.PI/2;dock.add(sign);
      const bench=new THREE.Mesh(new THREE.BoxGeometry(1.5,.14,.6),plank);bench.position.set(island.landingX,landHeight(island,island.landingX,island.z)+.75,island.z+1.8);dock.add(bench);
      for(let j=0;j<2;j++){const tool=createAxe();tool.scale.setScalar(.9);tool.rotation.z=Math.PI/2;tool.position.copy(bench.position).add(V(0,.18,(j-.5)*.25));dock.add(tool);}
      batch(dock,[flag]);
    }
    for(const t of TREES){
      const island=ISLANDS[t.islandId],rand=rng(t.id*271+123),height=6.8+rand()*3;
      const root=new THREE.Group();root.position.set(t.x,landHeight(island,t.x,t.z),t.z);scene.add(root);
      const curve=new THREE.CatmullRomCurve3([V(0,0,0),V(.05,height*.35,.03),V(.15,height*.75,.1),V(.28,height,.15)]);
      const trunk=new THREE.Mesh(new THREE.TubeGeometry(curve,16,.22,9,false),wood);root.add(trunk);trunk.castShadow=true;
      const geos:THREE.BufferGeometry[]=[];
      for(let layer=0;layer<8;layer++)for(let b=0;b<9;b++){
        const a=b/9*Math.PI*2+layer*.83;const width=2.6*(1-layer/9),y=height*.32+layer*height*.083;
        cylinder(root,V(0,y,0),V(Math.sin(a)*width,y-.28,Math.cos(a)*width),.025,wood);
        const card=new THREE.PlaneGeometry(width*1.9,1.4,1,1);const m=new THREE.Object3D();m.position.set(Math.sin(a)*width*.55,y+.13,Math.cos(a)*width*.55);m.rotation.set(-.2,a,Math.sin(a)*.18);m.updateMatrix();card.applyMatrix4(m.matrix);geos.push(card);
      }
      const merged=mergeGeometries(geos);geos.forEach(g=>g.dispose());const foliage=new THREE.Mesh(merged!,leaves);root.add(foliage);
      batch(root,[foliage]);
      const stump=new THREE.Mesh(new THREE.CylinderGeometry(.215,.29,.38,12),wood);stump.position.copy(root.position).add(V(0,.18,0));scene.add(stump);
      this.trees.push({root,foliage,stump,id:t.id});
    }
    this.axe=createAxe();
    const chips=new THREE.BufferGeometry();chips.setAttribute('position',new THREE.BufferAttribute(new Float32Array(28*3),3));this.chips=new THREE.Points(chips,new THREE.PointsMaterial({color:0xcdb88b,size:.045,transparent:true,opacity:.8}));this.chips.visible=false;scene.add(this.chips);
  }
  strike(x:number,z:number,islandId:number){this.chipOrigin.set(x,landHeight(ISLANDS[islandId],x,z)+1.1,z);this.chipAge=0;}
  update(game:Game,dt:number){
    for(const f of this.flags){const p=f.geometry.getAttribute('position');for(let i=0;i<p.count;i++)p.setZ(i,Math.sin(p.getX(i)*3+game.time*3)*.1*(p.getX(i)+.9));p.needsUpdate=true;}
    for(const t of this.trees){const state=game.trees[t.id];t.root.visible=!state.collected;const progress=state.felledAt<0?0:Math.min(1,(game.time-state.felledAt)/2.0);t.root.rotation.z=progress*progress*1.48*(t.id%2?1:-1);t.foliage.rotation.z=Math.sin(game.time*.65+t.id)*.011;t.root.position.y=landHeight(ISLANDS[state.islandId],state.x,state.z)-progress*.08;}
    this.chipAge+=dt;this.chips.visible=this.chipAge<.85;const p=this.chips.geometry.getAttribute('position');for(let i=0;i<p.count;i++){const a=i*2.399,t=this.chipAge;p.setXYZ(i,this.chipOrigin.x+Math.sin(a)*t*2,this.chipOrigin.y+t*(1+i%3)-t*t*5,this.chipOrigin.z+Math.cos(a)*t*2);}p.needsUpdate=true;
  }
}
export function createAxe(){
  const axe=new THREE.Group(),wood=new THREE.MeshStandardMaterial({color:0x7c6143,roughness:.85}),steel=new THREE.MeshStandardMaterial({color:0x849090,metalness:.85,roughness:.33});
  const handle=new THREE.Mesh(new THREE.CapsuleGeometry(.035,.66,5,10),wood);handle.rotation.x=-.5;handle.position.set(0,-.07,-.04);axe.add(handle);
  const shape=new THREE.Shape();shape.moveTo(-.035,-.055);shape.lineTo(.26,-.13);shape.quadraticCurveTo(.31,.015,.27,.14);shape.lineTo(-.035,.07);shape.closePath();
  const head=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.043,bevelEnabled:true,bevelSize:.015,bevelThickness:.012,bevelSegments:2,steps:1}),steel);head.position.set(-.05,.25,-.21);axe.add(head);
  const grip=new THREE.Mesh(new THREE.CapsuleGeometry(.055,.15,4,9),new THREE.MeshStandardMaterial({color:0x182c2c,roughness:.85}));grip.position.set(.025,-.20,.06);grip.rotation.x=-.5;axe.add(grip);
  return axe;
}
