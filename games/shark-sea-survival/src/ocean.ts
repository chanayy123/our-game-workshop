import * as THREE from 'three';
import {seabedHeight} from './islands.ts';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import type { SeaFrame } from './contracts';

const TAU = Math.PI * 2;
const clamp = THREE.MathUtils.clamp;
const waveVertex = /* glsl */`
  float seaHeight(vec2 p, float t) {
    return sin(p.x * .039 + p.y * .051 + t * .73) * .58
         + sin(p.x * -.075 + p.y * .028 + t * .97) * .25
         + sin(p.x * .148 + p.y * .107 + t * 1.43) * .18
         + sin(p.x * -.30 + p.y * .235 + t * 1.90) * .043;
  }
`;

function rand(seed: number) {
  let n = seed >>> 0;
  return () => { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; return n / 4294967296; };
}

const skyVertex = /* glsl */`
varying vec3 vDirection;
void main() { vDirection = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }
`;
const skyFragment = /* glsl */`
precision highp float;
varying vec3 vDirection;
uniform vec3 sunDirection;
uniform float time;
uniform float submerged;
uniform vec3 underwaterColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p) { float f = 0., a=.5; for(int i=0;i<5;i++){f+=a*noise(p);p=p*2.04+vec2(7.1,3.2);a*=.5;} return f; }
void main(){
 vec3 d=normalize(vDirection); float h=max(0.,d.y);
 vec3 color=mix(vec3(.64,.73,.77),vec3(.19,.37,.53),pow(h,.55));
 float s=max(0.,dot(d,sunDirection));
 color+=vec3(.55,.41,.24)*pow(s,15.) + vec3(1.,.83,.53)*pow(s,280.)*.58;
 color+=vec3(5.8,4.8,3.2)*smoothstep(.99965,.99994,s);
 vec2 p=d.xz/(max(.075,d.y)+.13)*1.45+vec2(time*.0013,0.);
 float cloud=fbm(p); float wisps=fbm(p*2.8+cloud*3.);
 float cover=smoothstep(.405,.68,cloud*.83+wisps*.17)*smoothstep(.01,.19,d.y);
 vec3 cloudColor=mix(vec3(.38,.47,.53),vec3(.89,.90,.85),smoothstep(.43,.7,cloud));
 cloudColor+=vec3(.27,.19,.11)*pow(s,12.);
 color=mix(color,cloudColor,cover*.87);
 color=mix(vec3(.48,.64,.67),color,smoothstep(-.08,.045,d.y));
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 gl_FragColor.rgb=mix(gl_FragColor.rgb,underwaterColor,submerged);
}
`;

const waterVertex = /* glsl */`
uniform float time;
varying vec3 vWorld;
${waveVertex}
void main(){
  vec4 world=modelMatrix*vec4(position,1.);
  world.y=seaHeight(world.xz,time);
  vWorld=world.xyz;
  gl_Position=projectionMatrix*viewMatrix*world;
}
`;
const waterFragment = /* glsl */`
precision highp float;
uniform float time;
uniform vec3 sunDirection;
uniform vec3 boat;
uniform float submerged;
uniform float farSurface;
uniform vec3 underwaterColor;
varying vec3 vWorld;
${waveVertex}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){ vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
vec3 reflectionSky(vec3 d){
 float h=max(0.,d.y);
 vec3 col=mix(vec3(.61,.72,.76),vec3(.19,.37,.53),pow(h,.5));
 float s=max(0.,dot(d,sunDirection));
 col+=vec3(.50,.36,.19)*pow(s,12.);
 float n=noise(d.xz/(max(.08,d.y)+.13)*7.);
 col=mix(col,vec3(.62,.69,.71),smoothstep(.30,.80,n)*.17);
 return col;
}
void main(){
 vec2 local=vWorld.xz-boat.xz;
 if(farSurface>.5 && max(abs(local.x),abs(local.y))<209.) discard;
 vec2 p=vWorld.xz;
 float e=.25;
 vec3 n=normalize(vec3(seaHeight(p-vec2(e,0.),time)-seaHeight(p+vec2(e,0.),time),2.*e,seaHeight(p-vec2(0.,e),time)-seaHeight(p+vec2(0.,e),time)));
 float dist=distance(cameraPosition,vWorld);
 float detail=1.-smoothstep(180.,900.,dist);
 vec2 q=p*.73+vec2(time*.21,-time*.15)+vec2(noise(p*.047),noise(p*.052+3.))*2.;
 n.x+=(noise(q+vec2(.09,0.))-noise(q-vec2(.09,0.)))*.86*detail;
 n.z+=(noise(q+vec2(0.,.09))-noise(q-vec2(0.,.09)))*.86*detail;
 n=normalize(n);
 vec3 eye=normalize(cameraPosition-vWorld);
 float facing=abs(dot(eye,n));
 float fresnel=.055+.945*pow(1.-facing,4.3);
 vec3 reflectDir=reflect(-eye,n);
 vec3 reflection=reflectionSky(reflectDir);
 float sun=pow(max(0.,dot(reflectDir,sunDirection)),650.);
 float broad=pow(max(0.,dot(reflectDir,sunDirection)),30.);
 vec3 base=mix(vec3(.004,.034,.051),vec3(.012,.079,.096),clamp(n.x*.8+n.z*.6+.45,0.,1.));
 vec3 col=mix(base,reflection,fresnel*.91);
 col+=vec3(2.4,1.9,1.17)*sun + vec3(.12,.095,.045)*broad;
 float crest=smoothstep(.52,.84,vWorld.y);
 float foam=crest*smoothstep(.57,.76,noise(p*.83+time*.12))*detail;
 col=mix(col,vec3(.59,.76,.76),foam*.37);
 float haze=1.-exp(-dist*.00031);
 col=mix(col,vec3(.57,.69,.73),haze);
 float alpha=mix(.72,.985,fresnel);
 alpha=mix(alpha,1.,smoothstep(95.,310.,dist));
 if(submerged>.5){
   vec3 ceiling=mix(vec3(.018,.10,.15),vec3(.09,.27,.31),pow(max(0.,dot(n,normalize(vec3(.2,1.,.3)))),12.));
   ceiling+=vec3(.29,.39,.29)*broad;
   col=ceiling;
   alpha=.77;
 }
 gl_FragColor=vec4(col,alpha);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 if(submerged>.5)gl_FragColor.rgb=mix(gl_FragColor.rgb,underwaterColor,1.-exp(-dist*.037));
}
`;

type SprayParticle = { position: THREE.Vector3; velocity: THREE.Vector3; life: number; total: number; size: number };

/** The sea is an actual displaced surface; the water volume uses world-space fog,
 * a separate seabed, drifting particles and a visible, lit water ceiling. */
export class OceanWorld {
  private scene: THREE.Scene;
  private sky: THREE.Mesh;
  private skyMaterial: THREE.ShaderMaterial;
  private waterMaterial: THREE.ShaderMaterial;
  private nearWater: THREE.Mesh;
  private farWater: THREE.Mesh;
  private deepBackdrop:THREE.Mesh;
  private deepObjects:THREE.Object3D[]=[];
  private sun = new THREE.Vector3(-.58,.36,.73).normalize();
  private sunlight: THREE.DirectionalLight;
  private hemi: THREE.HemisphereLight;
  private fog = new THREE.FogExp2(0x99b3bc,.00022);
  private motes: THREE.Points;
  private moteMaterial: THREE.ShaderMaterial;
  private beams: THREE.Group;
  private beamMaterial: THREE.ShaderMaterial;
  private spray: THREE.Points;
  private sprayGeometry: THREE.BufferGeometry;
  private sprayPool: SprayParticle[] = [];
  private sprayCursor = 0;
  private sprayClock = 0;
  private sprayRandom = rand(16821);
  private ripples: {mesh:THREE.Mesh; life:number; strength:number}[] = [];
  private rippleCursor=0;
  private buoys: THREE.Group[]=[];
  private kelpMaterial: THREE.ShaderMaterial;
  private fish: THREE.InstancedMesh;
  private fishOrigins: THREE.Vector3[]=[];
  private fishDummy = new THREE.Object3D();
  private lighthouseLamp: THREE.Mesh;
  private currentTime=0;
  private underwater=false;

  constructor(scene:THREE.Scene,renderer:THREE.WebGLRenderer){
    this.scene=scene;
    scene.background=new THREE.Color(0x93b3c3);
    scene.fog=this.fog;
    this.sunlight=new THREE.DirectionalLight(0xffe4b1,2.4);
    this.sunlight.position.copy(this.sun).multiplyScalar(300);
    this.sunlight.castShadow=true;
    this.sunlight.shadow.mapSize.set(1024,1024);
    this.sunlight.shadow.camera.left=-38;this.sunlight.shadow.camera.right=38;
    this.sunlight.shadow.camera.top=38;this.sunlight.shadow.camera.bottom=-38;
    this.sunlight.shadow.camera.near=1;this.sunlight.shadow.camera.far=650;
    this.sunlight.shadow.bias=-.0012;
    this.sunlight.shadow.normalBias=.06;
    scene.add(this.sunlight,this.sunlight.target);
    this.hemi=new THREE.HemisphereLight(0xb9d8e8,0x163d40,1.48);
    scene.add(this.hemi);

    this.skyMaterial=new THREE.ShaderMaterial({uniforms:{sunDirection:{value:this.sun},time:{value:0},submerged:{value:0},underwaterColor:{value:new THREE.Color(.015,.14,.17)}},vertexShader:skyVertex,fragmentShader:skyFragment,side:THREE.BackSide,depthWrite:false});
    this.sky=new THREE.Mesh(new THREE.SphereGeometry(8500,32,20),this.skyMaterial);
    this.sky.renderOrder=-100;this.sky.frustumCulled=false;scene.add(this.sky);
    // A single prefiltered sky gives the hull and animals coherent marine reflections.
    const environmentScene=new THREE.Scene();
    environmentScene.add(new THREE.Mesh(new THREE.SphereGeometry(200,32,16),this.skyMaterial));
    const pmrem=new THREE.PMREMGenerator(renderer);
    scene.environment=pmrem.fromScene(environmentScene,.1,.1,500).texture;
    scene.environmentIntensity=.72;
    pmrem.dispose();

    this.waterMaterial=new THREE.ShaderMaterial({uniforms:{time:{value:0},sunDirection:{value:this.sun},boat:{value:new THREE.Vector3()},submerged:{value:0},farSurface:{value:0},underwaterColor:{value:new THREE.Color(.015,.14,.17)}},vertexShader:waterVertex,fragmentShader:waterFragment,transparent:true,depthWrite:false,side:THREE.DoubleSide});
    // Concentric geometry has one continuous surface, keeping the distant LOD
    // and near waves watertight when viewed from below.
    const radial:number[]=[];for(let r=0;r<=210;r+=3)radial.push(r);radial.push(260,330,430,570,760,1020,1400,2000,3000,4700,7200,11500);
    const vertices:number[]=[],indices:number[]=[];const segments=256;
    for(const radius of radial)for(let i=0;i<=segments;i++){const a=i/segments*TAU;vertices.push(Math.sin(a)*radius,0,Math.cos(a)*radius);}
    for(let r=0;r<radial.length-1;r++)for(let i=0;i<segments;i++){const a=r*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}
    const nearGeo=new THREE.BufferGeometry();nearGeo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));nearGeo.setIndex(indices);
    this.nearWater=new THREE.Mesh(nearGeo,this.waterMaterial);this.nearWater.renderOrder=20;this.nearWater.frustumCulled=false;scene.add(this.nearWater);
    const farMat=this.waterMaterial.clone();farMat.uniforms.farSurface.value=1;
    const farGeo=new THREE.PlaneGeometry(23000,23000,100,100);farGeo.rotateX(-Math.PI/2);
    this.farWater=new THREE.Mesh(farGeo,farMat);this.farWater.visible=false;
    this.deepBackdrop=new THREE.Mesh(new THREE.PlaneGeometry(23000,23000),new THREE.MeshBasicMaterial({color:0x031720,fog:false}));this.deepBackdrop.rotation.x=-Math.PI/2;this.deepBackdrop.position.y=-145;scene.add(this.deepBackdrop);

    this.buildLand();
    this.lighthouseLamp=this.buildLighthouse();
    this.buildSeabed();
    this.kelpMaterial=this.buildKelp();
    this.fish=this.buildFish();
    for(const z of [95,440,860,1250,1620]) {
      this.buoys.push(this.makeBuoy(-48,z,0xb55933));
      if(z===95||z===1620)this.buoys.push(this.makeBuoy(48,z,0x407e64));
    }

    const random=rand(7123);
    const moteGeo=new THREE.BufferGeometry();const motePos=new Float32Array(840*3),moteSizes=new Float32Array(840);
    for(let i=0;i<840;i++){motePos[i*3]=(random()-.5)*72;motePos[i*3+1]=(random()-.5)*58;motePos[i*3+2]=(random()-.5)*72;moteSizes[i]=.5+random()*1.6;}
    moteGeo.setAttribute('position',new THREE.BufferAttribute(motePos,3));moteGeo.setAttribute('aSize',new THREE.BufferAttribute(moteSizes,1));
    this.moteMaterial=new THREE.ShaderMaterial({uniforms:{time:{value:0},opacity:{value:0}},vertexShader:`attribute float aSize;uniform float time;varying float vFade;void main(){vec3 p=position;p.x+=sin(time*.09+p.y)*.5;p.y=mod(p.y+time*.08+29.,58.)-29.;vec4 mv=modelViewMatrix*vec4(p,1.);vFade=clamp(1.-length(p)/40.,0.,1.);gl_PointSize=min(5.,aSize*80./max(1.,-mv.z));gl_Position=projectionMatrix*mv;}`,fragmentShader:`uniform float opacity;varying float vFade;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(.58,.82,.78,smoothstep(.5,.10,d)*opacity*vFade);}`,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
    this.motes=new THREE.Points(moteGeo,this.moteMaterial);this.motes.frustumCulled=false;this.motes.renderOrder=25;scene.add(this.motes);

    this.beamMaterial=new THREE.ShaderMaterial({uniforms:{time:{value:0},opacity:{value:0}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time;uniform float opacity;varying vec2 vUv;void main(){float a=pow(sin(vUv.x*3.14159),3.)*sin(vUv.y*3.14159);a*=.6+.4*sin(vUv.y*19.+time*.21);gl_FragColor=vec4(.26,.65,.64,a*opacity);}`,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
    this.beams=new THREE.Group();
    for(let i=0;i<7;i++){const b=new THREE.Mesh(new THREE.PlaneGeometry(8+i%3*4,70),this.beamMaterial);b.position.set((i%3-1)*33,-34,Math.floor(i/3)*37-45);b.rotation.z=-.23;b.rotation.y=i*1.3;this.beams.add(b);}scene.add(this.beams);

    this.sprayGeometry=new THREE.BufferGeometry();
    this.sprayGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(600*3),3));
    this.sprayGeometry.setAttribute('aLife',new THREE.BufferAttribute(new Float32Array(600),1));
    this.sprayGeometry.setAttribute('aSize',new THREE.BufferAttribute(new Float32Array(600),1));
    const sprayMaterial=new THREE.ShaderMaterial({vertexShader:`attribute float aLife;attribute float aSize;varying float vLife;void main(){vLife=aLife;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(aSize*420./max(1.,-mv.z),1.,48.);gl_Position=projectionMatrix*mv;}`,fragmentShader:`varying float vLife;void main(){float d=length(gl_PointCoord-.5);if(d>.5||vLife<=0.)discard;float a=smoothstep(.5,.05,d)*min(1.,vLife*3.);gl_FragColor=vec4(.72,.88,.90,a*.65);}`,transparent:true,depthWrite:false});
    this.spray=new THREE.Points(this.sprayGeometry,sprayMaterial);this.spray.frustumCulled=false;this.spray.renderOrder=24;scene.add(this.spray);
    for(let i=0;i<600;i++)this.sprayPool.push({position:new THREE.Vector3(),velocity:new THREE.Vector3(),life:0,total:1,size:.2});
    const rippleGeo=new THREE.PlaneGeometry(1,1);rippleGeo.rotateX(-Math.PI/2);
    for(let i=0;i<90;i++){
      const mat=new THREE.ShaderMaterial({uniforms:{opacity:{value:0}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float opacity;varying vec2 vUv;void main(){float d=length(vUv-.5)*2.;float ring=smoothstep(.60,.79,d)*(1.-smoothstep(.84,1.,d));float breakup=.62+.38*sin(atan(vUv.y-.5,vUv.x-.5)*19.+d*12.);gl_FragColor=vec4(.68,.84,.82,ring*opacity*breakup);}`,transparent:true,depthWrite:false,side:THREE.DoubleSide});
      const mesh=new THREE.Mesh(rippleGeo,mat);mesh.visible=false;mesh.renderOrder=23;scene.add(mesh);this.ripples.push({mesh,life:0,strength:1});
    }
  }

  heightAt(x:number,z:number,time:number):number{
    return Math.sin(x*.039+z*.051+time*.73)*.58+Math.sin(x*-.075+z*.028+time*.97)*.25+Math.sin(x*.148+z*.107+time*1.43)*.18+Math.sin(x*-.30+z*.235+time*1.90)*.043;
  }

  private rockGeometry(radius:number,seed:number){
    const random=rand(seed),geo=mergeVertices(new THREE.IcosahedronGeometry(radius,3)),p=geo.attributes.position;
    const colors=[];
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
      const r=1+Math.sin(x*5.2+seed)*Math.sin(z*4.3)*.17+Math.sin(y*7.4+x*2.7)*.12;
      p.setXYZ(i,x*r,y*r,z*r);
      const v=.15+random()*.06;const moss=clamp(y/radius,0,1)*.055;
      colors.push(v*.91-moss*.7,v+moss*.28,v*.98-moss*.65);
    }
    geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();return geo;
  }
  private buildLand(){
    const mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.96});
    const add=(x:number,y:number,z:number,sx:number,sy:number,sz:number,seed:number)=>{
      let geo:THREE.BufferGeometry;
      if(sx>65){
        geo=new THREE.PlaneGeometry(sx*2.4,sz*2.4,58,58);geo.rotateX(-Math.PI/2);const p=geo.attributes.position,colors=[];
        for(let i=0;i<p.count;i++){
          const px=p.getX(i),pz=p.getZ(i),u=px/sx,v=pz/sz,a=Math.atan2(v,u);
          const coast=.86+.10*Math.sin(a*3+seed)+.08*Math.cos(a*7+seed*.31)+.05*Math.sin(a*13);
          const radius=Math.sqrt(u*u+v*v)/coast;
          const plateau=1-THREE.MathUtils.smoothstep(radius,.48,1.08);
          const ridge=.56+.19*Math.sin(u*5.2+seed)*Math.cos(v*4.1)+.10*Math.sin(u*11.1+v*6.4+seed)+.07*Math.sin(v*22.5+u*9.8);
          const elevation=sy*(ridge*plateau-.20*Math.pow(clamp(radius-.7,0,1),.5));
          p.setY(i,elevation);
          const stratum=(Math.sin(elevation*.43+u*.8)+1)*.016;
          const grain=(Math.sin(u*71+v*37)*Math.cos(v*65-u*29)+1)*.012;
          const moss=THREE.MathUtils.smoothstep(plateau,.68,.92)*.018;
          colors.push(.105+stratum+grain+moss*.4,.116+stratum+grain+moss,.117+stratum+grain-moss);
        }
        geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
      }else{geo=this.rockGeometry(1,seed);geo.scale(sx,sy,sz);}
      const rock=new THREE.Mesh(geo,mat);rock.position.set(x,y,z);rock.castShadow=true;rock.receiveShadow=true;this.scene.add(rock);return rock;
    };
    add(85,-18,1985,135,76,115,3);add(-29,-12,1950,74,53,72,9);add(175,-12,1920,68,43,50,11);
    add(250,-16,2090,110,84,103,4);add(-155,-23,2040,96,46,97,16);
    add(22,15,1971,19,26,18,35);
    for(let i=0;i<16;i++){const r=rand(183+i);add(-185+r()*480,-3-r()*5,1880+r()*210,8+r()*18,5+r()*10,7+r()*18,30+i);}
    add(-135,-26,-225,170,62,96,41);add(120,-19,-255,149,58,83,42);add(20,-35,-350,210,88,130,43);
    add(-1040,-42,1040,250,110,500,48);add(1650,-60,1980,570,180,480,49);
  }
  private buildLighthouse(){
    const tower=new THREE.Group();tower.position.set(22,37,1971);
    const white=new THREE.MeshStandardMaterial({color:0xcbd0c8,roughness:.75});const dark=new THREE.MeshStandardMaterial({color:0x303b3e,metalness:.6,roughness:.4});
    const base=new THREE.Mesh(new THREE.CylinderGeometry(5.3,7,38,18),white);base.position.y=19;base.castShadow=true;tower.add(base);
    const band=new THREE.Mesh(new THREE.CylinderGeometry(5.65,5.8,7,18),new THREE.MeshStandardMaterial({color:0x915841,roughness:.8}));band.position.y=29;tower.add(band);
    const deck=new THREE.Mesh(new THREE.CylinderGeometry(7,7,1.4,18),dark);deck.position.y=39;tower.add(deck);
    const lantern=new THREE.Mesh(new THREE.CylinderGeometry(4.3,4.3,5.8,12),new THREE.MeshStandardMaterial({color:0xffe8b4,emissive:0xffc878,emissiveIntensity:1.5,metalness:.5,roughness:.13}));lantern.position.y=42.7;tower.add(lantern);
    for(let i=0;i<8;i++){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,6,5),dark);p.position.set(Math.cos(i/8*TAU)*4.5,42.8,Math.sin(i/8*TAU)*4.5);tower.add(p);}
    const roof=new THREE.Mesh(new THREE.ConeGeometry(6.3,5,12),dark);roof.position.y=48;tower.add(roof);
    this.scene.add(tower);return lantern;
  }
  private buildSeabed(){
    const geo=new THREE.PlaneGeometry(2100,3100,90,125);geo.rotateX(-Math.PI/2);
    const p=geo.attributes.position,colors=[];
    for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i)+880;const y=seabedHeight(x,z);p.setXYZ(i,x,y,z);const n=(Math.sin(x*.15+z*.27)*Math.sin(z*.16)+1)*.035;colors.push(.19+n,.26+n,.235+n);}
    geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
    const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));mesh.receiveShadow=true;this.scene.add(mesh);this.deepObjects.push(mesh);
    const random=rand(991);const rockGeo=this.rockGeometry(1,71);const rocks=new THREE.InstancedMesh(rockGeo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}),210);const dummy=new THREE.Object3D();
    for(let i=0;i<210;i++){const x=(random()-.5)*1150,z=-100+random()*2250;dummy.position.set(x,seabedHeight(x,z)+1,z);dummy.rotation.set(random()*.4,random()*TAU,random()*.5);dummy.scale.set(2+random()*8,2+random()*6,2+random()*9);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix);}this.scene.add(rocks);this.deepObjects.push(rocks);
    // A skeletal wreck is a quiet underwater depth reference, offset from the route.
    const wreck=new THREE.Group(),wreckMat=new THREE.MeshStandardMaterial({color:0x273d3b,roughness:1,metalness:.22});
    for(let i=0;i<10;i++){const rib=new THREE.Mesh(new THREE.TorusGeometry(4.7-i*.11,.17,4,16,Math.PI),wreckMat);rib.rotation.z=Math.PI;rib.position.set(0,1.5,i*2.1);wreck.add(rib);}
    const keel=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,24),wreckMat);keel.position.set(0,-2,10);wreck.add(keel);wreck.position.set(30,seabedHeight(30,780)+3,780);wreck.rotation.set(.12,.37,.17);this.scene.add(wreck);this.deepObjects.push(wreck);
  }
  private buildKelp(){
    const mat=new THREE.ShaderMaterial({uniforms:{time:{value:0},fogColor:{value:new THREE.Color(0x034653)},fogDensity:{value:.032}},vertexShader:`uniform float time;varying vec2 vUv;varying float depth;void main(){vUv=uv;vec3 p=position;p.x+=sin(time*.62+p.y*.4+instanceMatrix[3].x)*p.y*.047;p.z+=sin(time*.31+p.y*.36+instanceMatrix[3].z)*p.y*.035;vec4 mv=modelViewMatrix*instanceMatrix*vec4(p,1.);depth=-mv.z;gl_Position=projectionMatrix*mv;}`,fragmentShader:`uniform vec3 fogColor;uniform float fogDensity;varying vec2 vUv;varying float depth;void main(){float width=(.5+sin(vUv.y*31.)*.25)*(1.-vUv.y*.77);if(abs(vUv.x-.5)>width*.5)discard;vec3 c=mix(vec3(.025,.075,.045),vec3(.11,.19,.075),vUv.y);gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>
    #include <colorspace_fragment>
    gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,1.-exp(-fogDensity*fogDensity*depth*depth));
    }`,side:THREE.DoubleSide});
    // Shader preprocessor directives must start on their own lines.
    mat.fragmentShader=mat.fragmentShader.replace(';#include',';\n#include');
    const geo=new THREE.PlaneGeometry(2.2,10,1,14);geo.translate(0,5,0);
    const plants=new THREE.InstancedMesh(geo,mat,330),random=rand(321),dummy=new THREE.Object3D();
    for(let i=0;i<330;i++){const x=(random()-.5)*520,z=100+random()*1820;dummy.position.set(x,seabedHeight(x,z),z);dummy.rotation.set(0,random()*TAU,(random()-.5)*.25);dummy.scale.set(.5+random(),.35+random(),1);dummy.updateMatrix();plants.setMatrixAt(i,dummy.matrix);}this.scene.add(plants);this.deepObjects.push(plants);return mat;
  }
  private buildFish(){
    const geo=new THREE.BufferGeometry();const v=[0,0,1.1,.21,0,.1,0,.36,0, 0,0,1.1,0,.36,0,-.21,0,.1, 0,0,1.1,-.21,0,.1,0,-.28,0, 0,0,1.1,0,-.28,0,.21,0,.1, .21,0,.1,0,0,-.8,0,.36,0, -.21,0,.1,0,.36,0,0,0,-.8, 0,0,-.8,.21,0,.1,0,-.28,0,0,0,-.8,0,-.28,0,-.21,0,.1, 0,0,-.68,0,.35,-1.2,0,-.35,-1.2];
    geo.setAttribute('position',new THREE.Float32BufferAttribute(v,3));geo.computeVertexNormals();
    const fish=new THREE.InstancedMesh(geo,new THREE.MeshStandardMaterial({color:0x819eaa,metalness:.52,roughness:.44,side:THREE.DoubleSide}),95),random=rand(774);
    for(let i=0;i<95;i++)this.fishOrigins.push(new THREE.Vector3((random()-.5)*64,-13-random()*36,(random()-.5)*70));
    this.scene.add(fish);this.deepObjects.push(fish);return fish;
  }
  private makeBuoy(x:number,z:number,color:number){
    const g=new THREE.Group();const mat=new THREE.MeshStandardMaterial({color,roughness:.57,metalness:.2});
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.5,1.7,12),mat);body.position.y=.6;body.castShadow=true;g.add(body);
    const mast=new THREE.Mesh(new THREE.CylinderGeometry(.11,.15,3.7,6),mat);mast.position.y=2.2;g.add(mast);
    const cap=new THREE.Mesh(new THREE.ConeGeometry(.48,.8,8),mat);cap.position.y=4.2;g.add(cap);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.38,.16,6,18),new THREE.MeshStandardMaterial({color:0x25373a,roughness:.7}));ring.rotation.x=Math.PI/2;ring.position.y=.15;g.add(ring);
    g.position.set(x,0,z);this.scene.add(g);return g;
  }

  private emit(position:THREE.Vector3,velocity:THREE.Vector3,size:number,life:number){
    const p=this.sprayPool[this.sprayCursor++%this.sprayPool.length];p.position.copy(position);p.velocity.copy(velocity);p.life=life;p.total=life;p.size=size;
  }
  private ripple(position:THREE.Vector3,strength:number){
    const r=this.ripples[this.rippleCursor++%this.ripples.length];r.mesh.position.copy(position);r.mesh.position.y=this.heightAt(position.x,position.z,this.currentTime)+.035;r.strength=strength;r.life=1;r.mesh.visible=true;r.mesh.scale.setScalar(strength);r.mesh.rotation.y=this.sprayRandom()*TAU;
  }
  splash(position:THREE.Vector3,strength=1){
    const n=Math.min(130,Math.ceil(strength*37));
    for(let i=0;i<n;i++){const a=this.sprayRandom()*TAU,s=(.7+this.sprayRandom()*2.8)*strength;this.emit(new THREE.Vector3(position.x,Math.max(position.y,.12),position.z),new THREE.Vector3(Math.cos(a)*s,1.6+this.sprayRandom()*4*strength,Math.sin(a)*s),.16+this.sprayRandom()*.36,1+this.sprayRandom()*1.4);}
    this.ripple(position,Math.max(2,strength*2.5));
  }
  reset(){this.sprayClock=0;for(const p of this.sprayPool)p.life=0;for(const r of this.ripples){r.life=0;r.mesh.visible=false;}}

  update(frame:SeaFrame){
    const {time,dt,camera,boatPosition,boatHeading,speed,underwater,depth}=frame;this.currentTime=time;this.underwater=underwater;
    for(const object of this.deepObjects)object.visible=underwater;
    this.deepBackdrop.visible=!underwater;this.deepBackdrop.position.x=boatPosition.x;this.deepBackdrop.position.z=boatPosition.z;
    this.sky.position.copy(camera.position);this.skyMaterial.uniforms.time.value=time;this.skyMaterial.uniforms.submerged.value=underwater?1:0;
    // Follow continuously: the analytical wave uses world coordinates so moving
    // the high-detail patch never moves the actual waves beneath the boat.
    this.nearWater.position.set(boatPosition.x,0,boatPosition.z);
    this.farWater.position.set(boatPosition.x,0,boatPosition.z);
    for(const mat of [this.waterMaterial,this.farWater.material as THREE.ShaderMaterial]){mat.uniforms.time.value=time;mat.uniforms.boat.value.copy(boatPosition);mat.uniforms.submerged.value=underwater?1:0;}
    if(underwater){
      const deep=clamp(depth/47,0,1);this.fog.color.setRGB(.018-deep*.010,.20-deep*.105,.23-deep*.096);this.fog.density=.016+deep*.014;
      this.hemi.intensity=1.25-deep*.43;this.sunlight.intensity=1.9-deep*1.05;this.scene.environmentIntensity=.48;
    }else{this.fog.color.setRGB(.57,.69,.73);this.fog.density=.00025;this.hemi.intensity=1.48;this.sunlight.intensity=2.4;this.scene.environmentIntensity=.72;}
    this.skyMaterial.uniforms.underwaterColor.value.copy(this.fog.color).convertLinearToSRGB();this.waterMaterial.uniforms.underwaterColor.value.copy(this.fog.color).convertLinearToSRGB();
    this.sunlight.position.copy(boatPosition).addScaledVector(this.sun,300);this.sunlight.target.position.copy(boatPosition);
    this.motes.position.copy(camera.position);this.motes.visible=underwater;this.moteMaterial.uniforms.time.value=time;this.moteMaterial.uniforms.opacity.value=underwater?.28:0;
    this.beams.position.set(boatPosition.x,0,boatPosition.z);this.beams.visible=underwater;this.beamMaterial.uniforms.time.value=time;this.beamMaterial.uniforms.opacity.value=.028*(1-clamp(depth/95,0,.7));
    this.kelpMaterial.uniforms.time.value=time;this.kelpMaterial.uniforms.fogColor.value.copy(this.fog.color).convertLinearToSRGB();this.kelpMaterial.uniforms.fogDensity.value=this.fog.density;
    for(const b of this.buoys){b.position.y=this.heightAt(b.position.x,b.position.z,time)*.82;b.rotation.z=Math.sin(time*.7+b.position.z)*.07;b.rotation.x=Math.cos(time*.9+b.position.x)*.06;}
    (this.lighthouseLamp.material as THREE.MeshStandardMaterial).emissiveIntensity=1.8+Math.pow(Math.max(0,Math.cos(time*.9)),25)*2;
    for(let i=0;i<this.fishOrigins.length;i++){
      const o=this.fishOrigins[i],school=Math.floor(i/24),phase=time*.055+school*1.6;
      this.fishDummy.position.set(boatPosition.x+o.x+Math.sin(phase)*21,o.y+Math.sin(time*.7+i)*.13,boatPosition.z+o.z+Math.cos(phase)*21);
      this.fishDummy.rotation.set(0,phase+Math.PI/2+Math.sin(time*2+i)*.06,Math.sin(time+i)*.05);this.fishDummy.scale.setScalar(.28+(i%5)*.065);this.fishDummy.updateMatrix();this.fish.setMatrixAt(i,this.fishDummy.matrix);
    }this.fish.instanceMatrix.needsUpdate=true;
    this.sprayClock+=dt;
    if(Math.abs(speed)>.6&&this.sprayClock>.065){
      this.sprayClock=0;const f=new THREE.Vector3(Math.sin(boatHeading),0,Math.cos(boatHeading)),right=new THREE.Vector3(Math.cos(boatHeading),0,-Math.sin(boatHeading));
      for(const side of [-1,1]){
        const pos=boatPosition.clone().addScaledVector(f,3.0).addScaledVector(right,side*1.3);pos.y=this.heightAt(pos.x,pos.z,time)+.15;
        const v=right.clone().multiplyScalar(side*(.4+Math.abs(speed)*.09)).addScaledVector(f,-Math.abs(speed)*.25);v.y=.7+this.sprayRandom()*.9;
        this.emit(pos,v,.10+Math.abs(speed)*.011,.65+this.sprayRandom()*.35);
      }
      const stern=boatPosition.clone().addScaledVector(f,-4.4);this.ripple(stern,1.45+Math.abs(speed)*.095);
    }
    const positions=this.sprayGeometry.attributes.position as THREE.BufferAttribute,life=this.sprayGeometry.attributes.aLife as THREE.BufferAttribute,sizes=this.sprayGeometry.attributes.aSize as THREE.BufferAttribute;
    for(let i=0;i<this.sprayPool.length;i++){
      const p=this.sprayPool[i];if(p.life>0){p.life-=dt;p.velocity.y-=7*dt;p.position.addScaledVector(p.velocity,dt);if(p.position.y<-.7)p.life=0;positions.setXYZ(i,p.position.x,p.position.y,p.position.z);sizes.setX(i,p.size);life.setX(i,Math.max(0,p.life/p.total));}else life.setX(i,0);
    }positions.needsUpdate=true;life.needsUpdate=true;sizes.needsUpdate=true;
    this.spray.visible=!underwater;
    for(const r of this.ripples){if(r.life<=0)continue;r.life-=dt*.32;r.mesh.visible=r.life>0&&!underwater;r.mesh.position.y=this.heightAt(r.mesh.position.x,r.mesh.position.z,time)+.035;r.mesh.scale.setScalar(r.strength+(1-r.life)*r.strength*2.1);(r.mesh.material as THREE.ShaderMaterial).uniforms.opacity.value=Math.max(0,r.life)*.19;}
  }
}
