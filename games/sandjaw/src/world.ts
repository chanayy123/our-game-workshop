import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {Game,ANCIENT,HOME,beach,dist,terrainHeight} from './game';
import type {Obstacle} from './game';
import {mat,mesh,ellipsoid,box,link,crocodile,person,shark,palm,firstPersonMuzzle} from './models';
import {terrain,sky,horizon,underwaterDetails,waterMaterial,skinTexture} from './environment';
function optimize(group:T.Group){
  group.updateMatrixWorld(true);const batches=new Map<T.Material,T.BufferGeometry[]>();
  group.traverse(o=>{if(o instanceof T.Mesh&&!Array.isArray(o.material)){const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);g.deleteAttribute('uv');if(!g.hasAttribute('normal'))g.computeVertexNormals();const arr=batches.get(o.material)||[];arr.push(g);batches.set(o.material,arr);}});
  const out=new T.Group();batches.forEach((geometries,material)=>{const merged=mergeGeometries(geometries);if(merged){const m=mesh(merged,material);out.add(m);}geometries.forEach(g=>g.dispose());});return out;
}
export class World {
  scene=new T.Scene();camera=new T.PerspectiveCamera(82,innerWidth/innerHeight,.04,600);renderer:T.WebGLRenderer;player=crocodile();ancient=crocodile(true);disguise=person(99);
  viewScene=new T.Scene();viewCamera=new T.PerspectiveCamera(75,innerWidth/innerHeight,.015,8);muzzle=firstPersonMuzzle(skinTexture());
  ground=terrain();sky=sky();motes:T.Points;pitch=-.02;fov=82;comfortable=matchMedia('(prefers-reduced-motion: reduce)').matches;cameraY=.7;renderCalls=0;renderTriangles=0;
  obstacles:Obstacle[]=[];
  people=new Map<number,ReturnType<typeof person>>();cops=new Map<number,ReturnType<typeof person>>();sharks=new Map<number,ReturnType<typeof shark>>();foods=new Map<number,T.Group>();markers=new Map<number,T.Mesh>();fx=new Map<number,T.Mesh>();
  water:T.Mesh<T.PlaneGeometry,T.ShaderMaterial>;sand:T.Mesh;ring:T.Mesh;sun:T.DirectionalLight;clock=0;lastX=-31;lastZ=-5;fps=60;frameCount=0;frameTime=0;under=0;wasReady=true;
  constructor(canvas:HTMLCanvasElement){
    this.renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.13;
    this.scene.background=new T.Color('#164f55');this.scene.fog=new T.FogExp2('#b3c4b2',.008);
    this.scene.add(new T.HemisphereLight('#e3f2e7','#6d6946',2.15));this.sun=new T.DirectionalLight('#fff0cb',3.4);this.sun.position.set(-25,44,-25);this.sun.castShadow=true;this.sun.shadow.mapSize.set(2048,2048);Object.assign(this.sun.shadow.camera,{left:-36,right:36,top:36,bottom:-36,near:1,far:140});this.sun.shadow.bias=-.0005;this.sun.shadow.normalBias=.025;this.scene.add(this.sun,this.sun.target);
    this.scene.add(this.ground,this.sky);
    this.water=new T.Mesh(new T.PlaneGeometry(900,900),waterMaterial());this.water.rotation.x=-Math.PI/2;this.water.renderOrder=3;this.scene.add(this.water);
    this.viewScene.add(this.muzzle.root,new T.HemisphereLight('#f2f6df','#52634a',2));const muzzleLight=new T.DirectionalLight('#ffe2a8',2.3);muzzleLight.position.set(-3,4,1);this.viewScene.add(muzzleLight);
    const particleGeo=new T.BufferGeometry();const dots=[];for(let i=0;i<500;i++)dots.push(Math.sin(i*123.3)*60,-.3-((i*.712)%3.3),4+((i*1.327)%40));particleGeo.setAttribute('position',new T.Float32BufferAttribute(dots,3));
    this.motes=new T.Points(particleGeo,new T.PointsMaterial({color:'#c3e5c8',size:.035,transparent:true,opacity:.5,depthWrite:false}));this.scene.add(this.motes);
    const env=new T.Group();let seed=57;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<36;i++){const p=palm(i);p.position.set(-73+i*4.2,.1,-15-random()*12);p.scale.setScalar(.8+random()*.55);this.obstacles.push({x:p.position.x,z:p.position.z,radius:.32});env.add(p);}
    for(let i=0;i<52;i++){const x=-76+random()*150,z=-17-random()*19;ellipsoid(env,mat(i%2?'#718c70':'#607e69'),x,.7,z,1+random()*1.7,.8+random(),1+random()*1.4);}
    for(let i=0;i<12;i++){
      const x=-49+i*9;const z=beach(x)-8.5;const towel=box(env,mat(i%2?'#d98660':'#eae2bd'),x,.1,z,1.6,.045,2.9);towel.rotation.y=i*.48;
      if(i%2===0){link(env,mat('#916f49'),new T.Vector3(x+2,0,z-1),new T.Vector3(x+2,3.1,z-1),.055);const cloth=mat(i%4?'#e6b860':'#e8ddaf');cloth.side=T.DoubleSide;const umbrella=mesh(new T.ConeGeometry(2,1,8,1,true),cloth,x+2,3,z-1);env.add(umbrella);}
    }
    for(let x=-61;x<65;x+=2.2){box(env,mat('#b5986a'),x,.24,-15,2.1,.2,2.4);if(Math.round(x/2.2)%3===0){box(env,mat('#7d684d'),x,.6,-16,.12,1.2,.12);}}
    for(let i=0;i<8;i++){const x=-53+i*15;this.obstacles.push({x,z:-18.2,radius:1.15});box(env,mat('#776950'),x,.8,-18.2,2.3,.15,.55);box(env,mat('#776950'),x,1.2,-18.5,2.3,.5,.12);for(const s of [-1,1])box(env,mat('#3b514a'),x+s*.8,.4,-18.2,.13,.75,.45);}
    for(let i=0;i<55;i++){
      const x=-58+random()*116,z=6+random()*35;const rock=ellipsoid(env,mat(i%2?'#557b70':'#7a9280'),x,-3.7,z,.4+random()*1.2,.4+random(),.4+random()*1.3);rock.rotation.y=random()*6;this.obstacles.push({x,z,radius:Math.max(rock.scale.x,rock.scale.z)*.68,deep:true});
      if(i%3===0){for(let j=0;j<5;j++){const weed=mesh(new T.ConeGeometry(.13,1.3+random()*1.2,4),mat('#669a67'),x+(random()-.5)*1.4,-2.8,z+(random()-.5));weed.rotation.z=(random()-.5)*.6;env.add(weed);}}
    }
    for(let i=0;i<20;i++){const x=-62+random()*125,z=beach(x)-1-random()*8;const pebble=ellipsoid(env,mat('#c1b78d'),x,.16,z,.2+random()*.35,.15,.23);pebble.rotation.y=random()*4;}
    // A crescent of stones shelters the home pool, and a raised shoal belongs to the ancient.
    for(let i=0;i<9;i++){const a=i/9*4.4+.2;ellipsoid(env,mat('#7b8d70'),HOME.x+Math.cos(a)*5,-.2,HOME.z+Math.sin(a)*5,1.4,1.4,1.1);}
    ellipsoid(env,mat('#bdc195'),ANCIENT.x,-.18,ANCIENT.z,6.5,.5,4.9,2);
    for(let i=0;i<6;i++)ellipsoid(env,mat('#657d6e'),44+i*2,-.5,26+Math.sin(i)*1.5,1.4,1.8,1.3);
    horizon(env);underwaterDetails(env);this.scene.add(optimize(env));
    this.scene.add(this.player.root,this.ancient.root,this.disguise.root);this.disguise.root.visible=false;this.ancient.root.scale.setScalar(ANCIENT.length/5.5);this.ancient.root.position.set(ANCIENT.x,.22,ANCIENT.z);this.ancient.root.rotation.y=-1.3;
    this.sand=mesh(new T.SphereGeometry(1,24,12),mat('#cfbf8c'));this.sand.scale.set(1.1,.22,2);this.scene.add(this.sand);
    this.ring=new T.Mesh(new T.RingGeometry(2.2,2.27,64),new T.MeshBasicMaterial({color:'#e2f8a2',transparent:true,opacity:.45,depthWrite:false}));this.ring.rotation.x=-Math.PI/2;this.scene.add(this.ring);
    const homeRing=new T.Mesh(new T.RingGeometry(3.4,3.55,64),new T.MeshBasicMaterial({color:'#d3f48d',transparent:true,opacity:.6,depthWrite:false}));homeRing.rotation.x=-Math.PI/2;homeRing.position.set(HOME.x,.16,HOME.z);homeRing.renderOrder=4;this.scene.add(homeRing);
    this.addLabel('静水巢穴',HOME.x,2.8,HOME.z,'#dff3a8');this.addLabel('远古巨鳄 · 9 m',ANCIENT.x,3,ANCIENT.z,'#f1ce83');
    this.resize();window.addEventListener('resize',()=>this.resize());
  }
  resize(){const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h);this.camera.aspect=this.viewCamera.aspect=w/h;this.camera.updateProjectionMatrix();this.viewCamera.updateProjectionMatrix();}
  addLabel(text:string,x:number,y:number,z:number,color:string){const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d')!;ctx.fillStyle='#123830b3';ctx.beginPath();ctx.roundRect(8,10,496,72,20);ctx.fill();ctx.font='600 30px "Microsoft YaHei", sans-serif';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(text,256,58);const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;const sprite=new T.Sprite(new T.SpriteMaterial({map:texture,depthTest:false,transparent:true}));sprite.position.set(x,y,z);sprite.scale.set(7,1.31,1);this.scene.add(sprite);}
  reset(){for(const collection of [this.people,this.cops,this.sharks,this.foods]){for(const obj of collection.values()){const root='root' in obj?obj.root:obj;this.scene.remove(root);root.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose();});}collection.clear();}this.markers.forEach(m=>{this.scene.remove(m);m.geometry.dispose();(m.material as T.Material).dispose();});this.markers.clear();this.fx.forEach(m=>{this.scene.remove(m);m.geometry.dispose();(m.material as T.Material).dispose();});this.fx.clear();this.lastX=-31;this.lastZ=-5;this.pitch=-.02;this.cameraY=.7;this.under=0;}
  update(game:Game,dt:number){
    this.clock+=dt;this.frameTime+=dt;this.frameCount++;if(this.frameTime>1){this.fps=Math.round(this.frameCount/this.frameTime);this.frameTime=0;this.frameCount=0;}
    const t=this.clock;this.under=T.MathUtils.damp(this.under,game.submerged?1:0,4,dt);this.water.material.uniforms.time.value=t;this.water.material.uniforms.submerged.value=this.under;
    const fog=this.scene.fog as T.FogExp2;fog.color.set('#b3c4b2').lerp(new T.Color('#1b6668'),this.under);fog.density=.008+this.under*.047;this.sky.visible=this.under<.8;this.motes.visible=this.under>.3;this.motes.position.y=Math.sin(t*.15)*.1;
    const groundShader=this.ground.material.userData.shader;if(groundShader)groundShader.uniforms.tideTime.value=t;
    const moving=Math.hypot(game.x-this.lastX,game.z-this.lastZ)>.001;this.lastX=game.x;this.lastZ=game.z;
    const bodyHeight=Math.min(3.5,game.length/5.5*1.2);
    const y=game.submerged?terrainHeight(game.x,game.z)+(game.sandHidden?-.65:bodyHeight*.2):game.mode==='surface'?-.06:terrainHeight(game.x,game.z)+(game.sandHidden?-bodyHeight*.8:.08);
    this.player.root.position.set(game.x,y,game.z);this.player.root.rotation.y=game.heading;this.player.root.scale.set(game.length/5.5*1.3,bodyHeight,game.length/5.5);this.player.root.visible=!game.disguised;
    this.disguise.root.visible=game.disguised;this.disguise.root.position.set(game.x,terrainHeight(game.x,game.z),game.z);this.disguise.root.rotation.y=game.heading;this.disguise.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(t*7+i*Math.PI)*(moving?.42:0));
    this.player.jaw.rotation.x=-Math.sin(game.biteAnim/.42*Math.PI)*.55;
    this.player.tail.forEach((part,i)=>part.rotation.y=Math.sin(t*(moving?9:1.8)-i*.7)*(moving?.18:.04));
    this.player.legs.forEach((p,i)=>{p.rotation.y=Math.sin(t*10+i*Math.PI)*(moving?.4:.05);});
    this.sand.visible=game.sandHidden;this.sand.position.set(game.x,terrainHeight(game.x,game.z)-.07,game.z);this.sand.rotation.y=game.heading;this.sand.scale.set(game.length*.24,.22,game.length*.5);
    this.ring.visible=game.phase!=='ready';this.ring.position.set(game.x,game.submerged?terrainHeight(game.x,game.z)+.07:game.mode==='surface'?.1:terrainHeight(game.x,game.z)+.035,game.z);this.ring.scale.setScalar(game.disguised?.55:Math.min(3,game.length/4));this.ring.renderOrder=5;
    (this.ring.material as T.MeshBasicMaterial).color.set(game.sandHidden?'#ffe5a0':game.disguised?'#8be8e4':'#d8f7a0');
    this.ancient.tail.forEach((p,i)=>p.rotation.y=Math.sin(t*.9-i)*.04);
    for(const h of game.humans){
      let p=this.people.get(h.id);if(!p){p=person(h.id);this.people.set(h.id,p);this.scene.add(p.root);}
      p.root.visible=h.alive;if(!h.alive){const marker=this.markers.get(h.id);if(marker)marker.visible=false;
        if(p.root.userData.caughtAt===undefined)p.root.userData.caughtAt=t;
        const sink=(t-p.root.userData.caughtAt)/.65;p.root.visible=sink<1;p.root.position.y=(h.caught==='water'?-.1:terrainHeight(h.x,h.z))-sink*2;p.root.rotation.z=sink*.6;p.root.scale.setScalar(Math.max(.05,1-sink*.5));continue;
      }delete p.root.userData.caughtAt;p.root.scale.setScalar(1);p.root.rotation.z=0;p.root.position.set(h.x,h.state==='dragged'?terrainHeight(h.x,h.z)-.2:terrainHeight(h.x,h.z),h.z);p.root.rotation.y=h.state==='walk'?h.heading*Math.PI/2:h.heading;
      p.legs.forEach((l,i)=>l.rotation.x=h.state==='call'?0:Math.sin(t*(h.state==='flee'?14:6)+(i===0||i===3?0:Math.PI))*.45);
      p.phone.visible=h.state==='call';if(h.state==='call')p.legs[3].rotation.x=-2.3;
      let marker=this.markers.get(h.id);if(!marker){marker=mesh(new T.ConeGeometry(.22,.58,4),new T.MeshBasicMaterial({color:'#ee895c'}));marker.rotation.z=Math.PI;this.scene.add(marker);this.markers.set(h.id,marker);}
      marker.visible=h.state==='call';marker.position.set(h.x,2.7+Math.sin(t*8)*.1,h.z);marker.scale.setScalar(.8+(4.5-h.timer)*.15);
    }
    for(const [id,p] of this.cops)if(!game.police.some(c=>c.id===id)){this.scene.remove(p.root);p.root.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose();});this.cops.delete(id);}
    for(const c of game.police){let p=this.cops.get(c.id);if(!p){p=person(c.id,true);this.cops.set(c.id,p);this.scene.add(p.root);}p.shield.visible=game.powerfulPolice;p.root.position.set(c.x,Math.max(0,terrainHeight(c.x,c.z)),c.z);p.root.rotation.y=Math.atan2(game.x-c.x,game.z-c.z);p.legs.forEach((l,i)=>l.rotation.x=Math.sin(t*11+i*Math.PI)*.42);}
    for(const s of game.sharks){let p=this.sharks.get(s.id);if(!p){p=shark();this.sharks.set(s.id,p);this.scene.add(p.root);}p.root.visible=s.hp>0;p.root.position.set(s.x,game.submerged?-2.7:-.25,s.z);p.root.rotation.y=s.heading;p.tail.rotation.y=Math.sin(t*8)*.2;
      let ring=this.markers.get(s.id);if(!ring){ring=new T.Mesh(new T.RingGeometry(2.7,2.85,40),new T.MeshBasicMaterial({color:'#ff9b6d',transparent:true,opacity:.8,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.renderOrder=5;this.markers.set(s.id,ring);this.scene.add(ring);}ring.visible=s.hp>0&&(s.state==='windup'||s.state==='charge');ring.position.set(s.x,game.submerged?-3.4:.12,s.z);ring.scale.setScalar(1+Math.sin(t*15)*.05);
    }
    for(const f of game.foods){let obj=this.foods.get(f.id);if(!obj){obj=new T.Group();
      if(f.kind==='fish'){for(let i=0;i<3;i++){ellipsoid(obj,mat('#e5c279'),i*.5-.5,0,Math.sin(i)*.4,.12,.11,.38);const tail=mesh(new T.ConeGeometry(.18,.25,3),mat('#e4b268'),i*.5-.5,0,Math.sin(i)*.4-.4);tail.rotation.x=-Math.PI/2;obj.add(tail);}}
      else if(f.kind==='clam'){ellipsoid(obj,mat('#d5b5a1'),0,0,0,.48,.18,.38);box(obj,mat('#835f6b'),0,.025,0,.62,.055,.1);}
      else{const gem=mesh(new T.OctahedronGeometry(.6),mat('#b8f1c5',.24,.35),0,.5,0);obj.add(gem);const r=new T.Mesh(new T.RingGeometry(.85,1,32),new T.MeshBasicMaterial({color:'#e9f9ba',transparent:true,opacity:.8}));r.rotation.x=-Math.PI/2;r.position.y=.07;obj.add(r);}
      this.foods.set(f.id,obj);this.scene.add(obj);}
      obj.visible=f.active&&(!f.deep||game.submerged);obj.position.set(f.x,f.deep?terrainHeight(f.x,f.z)+.22:-.06,f.z);if(f.kind==='relic'){obj.children[0].rotation.y=t;obj.children[0].position.y=.6+Math.sin(t*2)*.15;}else if(!f.deep){obj.position.y+=Math.sin(t*3+f.id)*.025;obj.rotation.y=Math.sin(t+f.id)*.4;}
    }
    const liveEffects=new Set(game.effects.map(e=>e.id));for(const [id,fx]of this.fx)if(!liveEffects.has(id)){this.scene.remove(fx);fx.geometry.dispose();(fx.material as T.Material).dispose();this.fx.delete(id);}
    for(const e of game.effects){let fx=this.fx.get(e.id);if(!fx){fx=new T.Mesh(new T.RingGeometry(.7,1,20),new T.MeshBasicMaterial({color:e.kind==='hit'?'#f49775':e.kind==='sand'?'#f3da9a':'#e9f5bd',transparent:true,opacity:1,depthWrite:false,side:T.DoubleSide}));fx.rotation.x=-Math.PI/2;fx.renderOrder=6;this.fx.set(e.id,fx);this.scene.add(fx);}fx.position.set(e.x,game.submerged?terrainHeight(e.x,e.z)+.15:.4,e.z);fx.scale.setScalar(1+e.age*5);(fx.material as T.MeshBasicMaterial).opacity=(1-e.age)*.8;}
    const ready=game.phase==='ready';
    if(ready){this.camera.position.set(-35,1.8,3);this.camera.lookAt(-27,.65,-8);this.wasReady=true;}
    else{
      const distance=game.disguised?7:6+game.length*.85;
      const cx=game.x-Math.sin(game.heading)*distance,cz=game.z-Math.cos(game.heading)*distance;
      const targetY=game.disguised?terrainHeight(game.x,game.z)+1:game.sandHidden?terrainHeight(game.x,game.z)+.15:y+bodyHeight*.4;
      const rise=game.submerged?1.65:3.7+Math.max(0,game.length-6)*.28;
      const desiredY=game.submerged?Math.min(-.65,targetY+rise+Math.sin(this.pitch)*1.5):Math.max(terrainHeight(cx,cz)+1.2,targetY+rise+Math.sin(this.pitch)*4);
      this.cameraY=this.wasReady?desiredY:T.MathUtils.damp(this.cameraY,desiredY,8,dt);this.wasReady=false;
      this.camera.position.set(cx,this.cameraY,cz);this.camera.lookAt(game.x+Math.sin(game.heading)*1.2,targetY,game.z+Math.cos(game.heading)*1.2);
    }
    const targetFov=this.fov+(this.comfortable?0:game.dash*3);this.camera.fov=T.MathUtils.damp(this.camera.fov,targetFov,5,dt);this.camera.updateProjectionMatrix();
    this.sun.position.set(game.x-25,44,game.z-25);this.sun.target.position.set(game.x,0,game.z);this.sun.target.updateMatrixWorld();this.water.material.uniforms.eye.value.copy(this.camera.position);
    this.muzzle.root.visible=false;
    this.renderer.autoClear=true;this.renderer.render(this.scene,this.camera);this.renderCalls=this.renderer.info.render.calls;this.renderTriangles=this.renderer.info.render.triangles;
    if(this.muzzle.root.visible){this.renderer.autoClear=false;this.renderer.clearDepth();this.renderer.render(this.viewScene,this.viewCamera);this.renderCalls+=this.renderer.info.render.calls;this.renderTriangles+=this.renderer.info.render.triangles;this.renderer.autoClear=true;}
  }
  project(x:number,y:number,z:number){const p=new T.Vector3(x,y,z).project(this.camera);return{x:(p.x*.5+.5)*innerWidth,y:(-.5*p.y+.5)*innerHeight,visible:p.z>-1&&p.z<1};}
}
