import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { SharkEvents, SharkFrame, SharkInfo } from './contracts';
import {ISLANDS,seabedHeight} from './islands.ts';

/* All meshes in this file are original procedural artwork. Model units are metres.
 * The body is a hand-shaped, asymmetric set of elliptical cross sections; every
 * fin is a curved, double-sided solid with a rounded leading edge. */
const TAU = Math.PI * 2;
const clamp = THREE.MathUtils.clamp;
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const random = (n: number) => { const x = Math.sin(n * 173.172 + 12.76) * 43758.5453; return x - Math.floor(x); };
type State = 'cruise' | 'circle' | 'inspect' | 'warning' | 'rush' | 'retreat' | 'flee' | 'dead' | 'breach' | 'drag';
interface Animal {
  id: number; root: THREE.Group; position: THREE.Vector3; heading: number;
  pitch: number; health: number; state: State; length: number; scale: number;
  speed: number; phase: number; stateUntil: number; target: THREE.Vector3;
  swim: { value: number }; strength: { value: number }; flash: { value: number };
  active: boolean; contact: boolean; turn: number; deathAge: number;
  jaw:THREE.Group;gape:number;teeth:THREE.Material;cheeks:THREE.Mesh;cheekEdges:THREE.Vector3[];
  breach?: { start: THREE.Vector3; direction: THREE.Vector3; age: number; duration: number; velocity: number; launched: boolean };
}
const SECTION = [
  [-2.24, .075, .095, -.012], [-2.03, .106, .129, -.025], [-1.76, .151, .183, -.032],
  [-1.40, .224, .274, -.035], [-.96, .337, .371, -.025], [-.50, .470, .450, -.008],
  [0, .575, .526, .012], [.48, .647, .540, .016], [.96, .651, .502, .012],
  [1.39, .608, .445, .017], [1.77, .513, .360, .035], [2.04, .394, .272, .063],
  [2.26, .251, .171, .072], [2.42, .100, .078, .064], [2.48, .008, .007, .060],
];

function profile(z: number) {
  let j = 0;
  while (j < SECTION.length - 2 && z > SECTION[j + 1][0]) j++;
  const b = SECTION[j], c = SECTION[j + 1];
  const t = clamp((z - b[0]) / (c[0] - b[0]), 0, 1);
  // Hermite section interpolation avoids rings, faceting, and pointed cones.
  const a = SECTION[Math.max(0, j - 1)], d = SECTION[Math.min(SECTION.length - 1, j + 2)];
  const v: number[] = [];
  for (let n = 1; n < 4; n++) {
    const m0 = (c[n] - a[n]) / (c[0] - a[0]);
    const m1 = (d[n] - b[n]) / (d[0] - b[0]);
    const gap = c[0] - b[0];
    v.push((2*t*t*t-3*t*t+1)*b[n] + (t*t*t-2*t*t+t)*m0*gap + (-2*t*t*t+3*t*t)*c[n] + (t*t*t-t*t)*m1*gap);
  }
  return v;
}

function skinColor(x: number, y: number, z: number, underside = false) {
  const p = profile(clamp(z, -2.23, 2.47));
  const h = (y - p[2]) / Math.max(.09, p[1]);
  const boundary = -.26 + .055 * Math.sin(z * 9 + x * 11) + .025 * Math.sin(z * 24);
  const white = underside ? .97 : 1 - THREE.MathUtils.smoothstep(h, boundary - .08, boundary + .18);
  const speckle = .965 + .045 * random(x * 170 + y * 211 + z * 347);
  const back = new THREE.Color(.125, .190, .217);
  const belly = new THREE.Color(.76, .79, .70);
  back.lerp(belly, white).multiplyScalar(speckle);
  return back;
}

function mouthEdge(z:number,side:number){
  const [w,h,c]=profile(z),u=clamp((z-1.3)/.88,0,1),x=Math.min(w*.94,.55*Math.sqrt(1-u*u));
  return new THREE.Vector3(side*x,c-Math.sqrt(Math.max(0,1-x*x/(w*w)))*h*.90,z);
}
function bodyGeometry(lowerJaw=false) {
  const positions:number[]=[],colors:number[]=[],normals:number[]=[],indices:number[]=[];
  const zs=Array.from({length:77},(_,i)=>-2.24+4.72*i/76).concat([1.3,2.18]).sort((a,b)=>a-b),sides=40;
  for(let i=0;i<zs.length;i++){
    const z=zs[i],[width,height,center]=profile(z);
    const edge=z>=1.3?Math.PI-Math.asin(clamp(mouthEdge(z,1).x/width,0,1)):13/40*TAU;
    for(let j=0;j<=sides;j++){
      // Reparameterise the underside so the opening follows a U-shaped mouth,
      // leaving the conical nose intact above the lower mandible.
      const a=j<=13?j/13*edge:j<=27?edge+(j-13)/14*(TAU-2*edge):TAU-edge+(j-27)/13*edge;
      const x=Math.sin(a)*width,y=center+Math.cos(a)*height*(Math.cos(a)<0?.90:1.03);
      positions.push(x,y,z);const c=skinColor(x,y,z);colors.push(c.r,c.g,c.b);
      const za=Math.max(-2.24,z-.002),zb=Math.min(2.48,z+.002),pa=profile(za),pb=profile(zb),dz=zb-za;
      const hs=Math.cos(a)<0?.90:1.03,h=height*hs,dy=y-center;
      const n=new THREE.Vector3(x/(width*width),dy/(h*h),-x*x/(width*width*width)*(pb[0]-pa[0])/dz-dy*dy/(h*h*h)*(pb[1]-pa[1])*hs/dz-dy/(h*h)*(pb[2]-pa[2])/dz).normalize();normals.push(n.x,n.y,n.z);
      if(i<zs.length-1&&j<sides){const k=i*(sides+1)+j,jawPart=z>=1.3&&z<2.18&&j>=13&&j<27;
        if(jawPart===lowerJaw)indices.push(k,k+sides+1,k+1,k+1,k+sides+1,k+sides+2);
      }
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  g.setAttribute('skinRegion',new THREE.Float32BufferAttribute(new Float32Array(positions.length/3).fill(1),1));g.setIndex(indices);g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));return g;
}

function finGeometry(leading: THREE.Vector3[], trailing: THREE.Vector3[], thickness: number, direction: THREE.Vector3, belly = false) {
  const lead = new THREE.CatmullRomCurve3(leading), trail = new THREE.CatmullRomCurve3(trailing);
  const positions: number[] = [], colors: number[] = [], indices: number[] = [];
  const rows = 18, cols = 10;
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i <= rows; i++) {
      const t = i / rows;
      const a = lead.getPoint(t), b = trail.getPoint(t);
      for (let j = 0; j <= cols; j++) {
        const u = j / cols;
        const p = a.clone().lerp(b, u);
        const bulge = Math.sin(Math.PI * u) * Math.pow(1 - t, .6) * thickness;
        p.addScaledVector(direction, (side ? -1 : 1) * bulge);
        positions.push(p.x, p.y, p.z);
        const c = belly && side ? new THREE.Color(.65, .69, .62) : new THREE.Color(.125, .190, .217);
        // The caudal fin remains slate-grey on both lobes. Countershading lives
        // on the body and the undersides of the paired horizontal fins.
        c.multiplyScalar(.93+.07*Math.sin(Math.PI*u));
        colors.push(c.r, c.g, c.b);
        if (i < rows && j < cols) {
          const k = side * (rows + 1) * (cols + 1) + i * (cols + 1) + j;
          if (side) indices.push(k, k+1, k+cols+1, k+1, k+cols+2, k+cols+1);
          else indices.push(k, k+cols+1, k+1, k+1, k+cols+1, k+cols+2);
        }
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setAttribute('skinRegion', new THREE.Float32BufferAttribute(new Float32Array(positions.length/3),1));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}
const V = (x: number, y: number, z: number) => new THREE.Vector3(x,y,z);
function finMeshes() {
  const fins: THREE.BufferGeometry[] = [];
  // The dorsal fin is thick at the root, swept, and slightly concave at the back.
  fins.push(finGeometry([V(0,.42,.62),V(0,.96,.25),V(0,1.39,-.36)], [V(0,.45,-.83),V(0,.78,-.43),V(0,1.39,-.36)], .073,V(1,0,0)));
  // Small second dorsal, pelvic fins and anal fin complete the silhouette.
  fins.push(finGeometry([V(0,.19,-1.48),V(0,.43,-1.63),V(0,.48,-1.79)], [V(0,.16,-1.90),V(0,.29,-1.83),V(0,.48,-1.79)], .032,V(1,0,0)));
  fins.push(finGeometry([V(0,-.18,-1.4),V(0,-.41,-1.68),V(0,-.45,-1.81)], [V(0,-.13,-1.95),V(0,-.25,-1.87),V(0,-.45,-1.81)], .025,V(1,0,0)));
  for (const side of [-1,1]) {
    fins.push(finGeometry([V(side*.51,-.16,1.03),V(side*1.14,-.30,.52),V(side*1.75,-.48,-.24)], [V(side*.39,-.24,-.16),V(side*.90,-.37,-.16),V(side*1.75,-.48,-.24)], .075,V(0,1,0),true));
    fins.push(finGeometry([V(side*.30,-.24,-.72),V(side*.64,-.34,-1.04),V(side*.74,-.39,-1.33)], [V(side*.18,-.23,-1.40),V(side*.51,-.37,-1.36),V(side*.74,-.39,-1.33)], .043,V(0,1,0),true));
    // Low peduncle keels stiffen the tail stock.
    fins.push(finGeometry([V(side*.11,-.01,-1.91),V(side*.19,-.01,-2.20),V(side*.12,-.01,-2.37)], [V(side*.09,-.01,-2.30),V(side*.14,-.01,-2.30),V(side*.12,-.01,-2.37)],.025,V(0,1,0)));
  }
  // Heterocercal caudal fin: crescent outline and a visibly longer upper lobe.
  fins.push(finGeometry([V(0,.02,-2.16),V(0,.70,-2.65),V(0,1.20,-3.02)], [V(0,-.03,-2.61),V(0,.59,-2.77),V(0,1.20,-3.02)], .073,V(1,0,0)));
  fins.push(finGeometry([V(0,-.02,-2.18),V(0,-.57,-2.57),V(0,-.89,-2.95)], [V(0,-.01,-2.61),V(0,-.43,-2.73),V(0,-.89,-2.95)], .065,V(1,0,0)));
  return fins;
}

function swimMaterial(swim: {value:number}, strength: {value:number}, flash: {value:number}, pattern:number) {
  const material = new THREE.MeshPhysicalMaterial({ vertexColors:true, roughness:.59, metalness:.015, clearcoat:.075, clearcoatRoughness:.55, side:THREE.DoubleSide });
  material.onBeforeCompile = shader => {
    shader.uniforms.uSwim = swim; shader.uniforms.uStrength = strength; shader.uniforms.uFlash = flash;shader.uniforms.uPattern={value:pattern};
    shader.vertexShader = 'uniform float uSwim; uniform float uStrength; attribute float skinRegion; varying vec3 vSkinPosition; varying float vSkinRegion;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      vSkinPosition = position;
      vSkinRegion = skinRegion;
      float tail = 1.0 - smoothstep(-2.95, 0.95, position.z);
      float bend = sin(uSwim + position.z * 1.45) * tail * tail * uStrength;
      transformed.x += bend;
      transformed.y += sin(uSwim * 0.53 + position.z) * tail * 0.022;
    `);
    shader.fragmentShader = `uniform float uFlash; uniform float uPattern;
      varying vec3 vSkinPosition; varying float vSkinRegion;
      float sharkHash(vec3 p) { return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453); }
      float sharkNoise(vec3 p) {
        vec3 a=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(sharkHash(a),sharkHash(a+vec3(1,0,0)),f.x),mix(sharkHash(a+vec3(0,1,0)),sharkHash(a+vec3(1,1,0)),f.x),f.y),mix(mix(sharkHash(a+vec3(0,0,1)),sharkHash(a+vec3(1,0,1)),f.x),mix(sharkHash(a+vec3(0,1,1)),sharkHash(a+vec3(1,1,1)),f.x),f.y),f.z);
      }
    ` + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      vec3 skinP=vSkinPosition;
      float mottle=sharkNoise(skinP*5.0+uPattern*3.1);
      float pores=sharkNoise(skinP*135.0+uPattern);
      diffuseColor.rgb *= .88 + .19*mottle + .05*pores;
      // Gill shadows are flush to the skin, with tapered tips and a soft edge;
      // there are no raised black tubes masquerading as anatomical incisions.
      float gill=0.0;
      float gillY=clamp((.29-skinP.y)/.522,0.0,1.0);
      float taper=sin(gillY*3.14159);
      for(int i=0;i<5;i++) {
        float line=1.22-float(i)*.155-.050*sin(gillY*3.14159);
        gill=max(gill,(1.0-smoothstep(.0015,.0055*taper+.0025,abs(skinP.z-line)))*taper);
      }
      gill*=smoothstep(.40,.49,abs(skinP.x))*vSkinRegion;
      diffuseColor.rgb *= 1.0-gill*.49;
      float scar=0.0;
      if(mod(uPattern,3.0)<.5) {
        float stripe=abs(skinP.z-.35-uPattern*.025-skinP.y*.68);
        scar=(1.0-smoothstep(.003,.011,stripe))*smoothstep(.09,.16,skinP.y)*(1.0-smoothstep(.30,.37,skinP.y))*smoothstep(.40,.49,skinP.x)*vSkinRegion;
      }
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.42,.41),scar*.35);
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.43,.14,.12),uFlash*.6);
    `);
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\n roughnessFactor=clamp(roughnessFactor+(pores-.5)*.12,.4,.8);');
  };
  return material;
}

function curveTube(points: THREE.Vector3[], radius: number, material: THREE.Material, segments = 16) {
  return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),segments,radius,5,false),material);
}

function sharkModel(id: number, length: number, geometry: THREE.BufferGeometry): Animal {
  const root = new THREE.Group(); root.name = `Great white ${id + 1}`;
  const swim = {value:0}, strength = {value:.31}, flash={value:0};
  const skin = swimMaterial(swim,strength,flash,id);
  const body = new THREE.Mesh(geometry,skin); body.castShadow=true; body.receiveShadow=true; root.add(body);
  const jaw=new THREE.Group();jaw.position.set(0,-.12,1.05);root.add(jaw);
  const jawGeo=bodyGeometry(true);jawGeo.translate(0,.12,-1.05);
  const jawSkin=new THREE.MeshPhysicalMaterial({vertexColors:true,roughness:.6,clearcoat:.08,side:THREE.DoubleSide});
  jaw.add(new THREE.Mesh(jawGeo,jawSkin));
  const gum=new THREE.MeshStandardMaterial({color:0x737d6c,roughness:.86});
  const gumline:THREE.Vector3[]=[];
  for(let i=0;i<=16;i++)gumline.push(mouthEdge(1.3+.88*i/16,-1));
  for(let i=15;i>=0;i--)gumline.push(mouthEdge(1.3+.88*i/16,1));
  const inner=new THREE.MeshStandardMaterial({color:0x3a443b,roughness:.95,side:THREE.DoubleSide});
  const innerPositions=[0,-.28,1.55],innerIndex:number[]=[];
  for(const p of gumline)innerPositions.push(p.x,p.y+.005,p.z);
  for(let i=0;i<gumline.length-1;i++)innerIndex.push(0,i+1,i+2);
  innerIndex.push(0,gumline.length,1);
  const palate=new THREE.BufferGeometry();palate.setAttribute('position',new THREE.Float32BufferAttribute(innerPositions,3));palate.setIndex(innerIndex);palate.computeVertexNormals();root.add(new THREE.Mesh(palate,inner));
  const floor=palate.clone();floor.translate(0,.12,-1.05);jaw.add(new THREE.Mesh(floor,inner));
  const upperGum=curveTube(gumline,.012,gum,30);root.add(upperGum);
  const lowerGum=curveTube(gumline.map(p=>p.clone().sub(jaw.position)),.012,gum,30);jaw.add(lowerGum);
  // Broad, flattened triangular teeth in two offset rows, rather than conical pegs.
  const enamel=new THREE.MeshStandardMaterial({color:0xd9d5be,roughness:.36});
  const toothGeo=new THREE.BufferGeometry();toothGeo.setAttribute('position',new THREE.Float32BufferAttribute([-.040,0,0,.04,0,0,0,-.072,.007,0,-.016,.021,0,-.016,-.009],3));toothGeo.setIndex([0,3,2,3,1,2,0,2,4,4,2,1,0,4,1,0,1,3]);toothGeo.computeVertexNormals();
  const arc=new THREE.CatmullRomCurve3(gumline);
  for(let row=0;row<2;row++)for(let k=0;k<23;k++)for(const lower of [false,true]){
    const p=arc.getPoint((k+.5+row*.2)/24);p.z-=row*.045;p.y-=row*.015;
    const tooth=new THREE.Mesh(toothGeo,enamel);tooth.position.copy(p);tooth.scale.setScalar(row? .68:1);
    if(lower){tooth.position.sub(jaw.position);tooth.rotation.z=Math.PI;jaw.add(tooth);}else root.add(tooth);
  }
  const dark = new THREE.MeshStandardMaterial({color:0x263438, roughness:.65});
  const eye = new THREE.MeshPhysicalMaterial({color:0x050a0b,roughness:.12,clearcoat:1});
  for (const side of [-1,1]) {
    const eyeSocket = new THREE.Mesh(new THREE.SphereGeometry(.060,12,8), dark);
    eyeSocket.scale.set(.40,.80,1); eyeSocket.position.set(side*.465,.115,1.88); root.add(eyeSocket);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(.039,12,10),eye);
    pupil.scale.set(.56,1,1); pupil.position.set(side*.479,.115,1.88); root.add(pupil);
    // Five curved gill incisions are shaded directly into the continuous skin.
    // Lateral-line scar and nostrils are restrained, readable only nearby.
    const nostril=new THREE.Mesh(new THREE.SphereGeometry(.030,8,6),dark);
    nostril.position.set(side*.238,-.042,2.26); nostril.scale.set(1,.24,.50); root.add(nostril);
  }
  // Detail meshes share four materials. Merge them once instead of submitting
  // individual draw calls for every tooth and gill on every visible animal.
  const detailGroups=new Map<THREE.Material,THREE.BufferGeometry[]>();
  for(const child of [...root.children]) {
    if(!(child instanceof THREE.Mesh)||child.material===skin)continue;
    child.updateMatrix();
    const material=child.material as THREE.Material;
    const list=detailGroups.get(material)||[];
    list.push(child.geometry.clone().applyMatrix4(child.matrix));detailGroups.set(material,list);
    root.remove(child);child.geometry.dispose();
  }
  for(const [material,geometries] of detailGroups) {
    const combined=mergeGeometries(geometries,false);
    if(combined)root.add(new THREE.Mesh(combined,material));
    geometries.forEach(g=>g.dispose());
  }
  const scale=length/5.5; root.scale.setScalar(scale);
  root.traverse(obj=>{obj.frustumCulled=true;});
  // Lower teeth and gum move as a single hinged mandible.
  const jawGroups=new Map<THREE.Material,THREE.BufferGeometry[]>();
  for(const c of [...jaw.children]){if(!(c instanceof THREE.Mesh))continue;c.updateMatrix();const m=c.material as THREE.Material,gs=jawGroups.get(m)||[];gs.push(c.geometry.clone().applyMatrix4(c.matrix));jawGroups.set(m,gs);jaw.remove(c);}
  for(const [m,gs] of jawGroups){const normalized=gs.map(g=>g.index?g.toNonIndexed():g);for(const g of normalized){g.deleteAttribute('uv');g.deleteAttribute('skinRegion');if(!g.getAttribute('color')&&m===jawSkin)g.setAttribute('color',new THREE.Float32BufferAttribute(new Float32Array(g.getAttribute('position').count*3).fill(.6),3));}const combined=mergeGeometries(normalized);if(combined)jaw.add(new THREE.Mesh(combined,m));}
  const cheekEdges=[gumline[0],gumline.at(-1)!];
  for(let k=0;k<gumline.length-1;k++)if(gumline[k].z<1.60&&gumline[k+1].z<1.60)cheekEdges.push(gumline[k],gumline[k+1]);
  const wall=new THREE.BufferGeometry();wall.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(cheekEdges.length*6),3));
  const wi:number[]=[];for(let k=0;k<cheekEdges.length;k+=2){const a=k*2;wi.push(a,a+1,a+2,a+1,a+3,a+2);}wall.setIndex(wi);
  const cheeks=new THREE.Mesh(wall,inner);cheeks.frustumCulled=false;root.add(cheeks);
  return {id,root,position:root.position,heading:0,pitch:0,health:100,state:'cruise',length,scale,speed:2.3,phase:id*1.9,stateUntil:0,target:V(0,0,0),swim,strength,flash,active:false,contact:false,turn:0,deathAge:0,jaw,gape:0,teeth:enamel,cheeks,cheekEdges};
}

interface Cloud { points:THREE.Points; age:number; velocity:Float32Array; }

export class SharkSystem {
  private animals: Animal[]=[];
  private scene:THREE.Scene;
  private onEvent:SharkEvents;
  private current?:SharkFrame;
  private firstBreach=false;
  private nextBreach=48;
  private nextThreat=18;
  private threatId=-1;
  private clouds:Cloud[]=[];
  private attackCount=0;
  private drag?:{animal:Animal;origin:THREE.Vector3;start:THREE.Vector3;direction:THREE.Vector3;age:number};
  constructor(scene:THREE.Scene,onEvent:SharkEvents) {
    this.scene=scene; this.onEvent=onEvent;
    const components=[bodyGeometry(),...finMeshes()];
    const body=mergeGeometries(components,false)!;
    components.forEach(g=>g.dispose());
    for(let i=0;i<15;i++) {
      const length=i===0?7.1:4.75+random(i+9)*1.65;
      const animal=sharkModel(i,length,body);
      this.animals.push(animal); scene.add(animal.root);
    }
    this.reset();
  }
  get sharks():SharkInfo[] { return this.animals.filter(s=>s.active).map(s=>({id:s.id,position:s.position.clone(),heading:s.heading,health:s.health,state:s.state,length:s.length})); }

  reset() {
    this.firstBreach=false; this.nextBreach=48; this.nextThreat=18; this.threatId=-1; this.attackCount=0;
    this.clouds.forEach(c=>{this.scene.remove(c.points);c.points.geometry.dispose();(c.points.material as THREE.Material).dispose();}); this.clouds=[];
    this.current=undefined;this.drag=undefined;
    for(const s of this.animals) {
      s.health=100;s.state='cruise';s.stateUntil=0;s.breach=undefined;s.deathAge=0;s.flash.value=0;s.speed=2.8;
      s.jaw.rotation.x=0;s.gape=0;
      s.position.set((random(s.id+20)-.5)*95,-2-random(s.id+90)*12,26+random(s.id+31)*85);
      s.heading=-.5+random(s.id+40);s.pitch=0;s.root.rotation.set(0,s.heading,0);s.active=s.id<4;s.root.visible=s.active;
    }
  }

  update(frame:SharkFrame) {
    this.current=frame;
    const dt=Math.min(frame.dt,.06), time=frame.time;
    const count=Math.min(15,4+Math.floor(frame.progress*21+time*.016));
    const diving=frame.inCage&&frame.cageDepth>2.2;
    const center=diving?frame.cagePosition:frame.boatPosition;
    for(const s of this.animals) {
      if(!s.active && s.id<count) {s.active=true;s.root.visible=true;this.placeAhead(s,frame);}
      if(!s.active) continue;
      s.gape=THREE.MathUtils.damp(s.gape,s.state==='drag'?.65:s.state==='rush'?.44:s.state==='warning'?.035:0,6,dt);s.jaw.rotation.x=s.gape;s.teeth.visible=s.gape>.05;
      const mouthPositions=s.cheeks.geometry.getAttribute('position');
      for(let k=0;k<s.cheekEdges.length;k++){
        const p=s.cheekEdges[k],dy=p.y+.12,dz=p.z-1.05;
        mouthPositions.setXYZ(k*2,p.x,p.y,p.z);
        mouthPositions.setXYZ(k*2+1,p.x,-.12+dy*Math.cos(s.gape)-dz*Math.sin(s.gape),1.05+dy*Math.sin(s.gape)+dz*Math.cos(s.gape));
      }
      mouthPositions.needsUpdate=true;s.cheeks.geometry.computeVertexNormals();
      if(s.state==='drag'&&this.drag){this.updateDrag(dt);continue;}
      s.flash.value=Math.max(0,s.flash.value-dt*1.9);
      if(s.state==='dead') {
        s.deathAge+=dt;s.position.y-=dt*.42;s.position.addScaledVector(s.target,dt*.26);
        s.root.rotation.z=THREE.MathUtils.damp(s.root.rotation.z,Math.PI*.83,1,dt);
        s.root.rotation.x=THREE.MathUtils.damp(s.root.rotation.x,.18,1,dt);
        s.swim.value+=dt*.3;
        continue;
      }
      if(s.state==='breach'&&s.breach) {this.updateBreach(s,dt);continue;}
      if(s.position.distanceTo(frame.boatPosition)>170 && !diving) this.placeAhead(s,frame);
      const offset=s.id*2.399;
      let desiredSpeed=2.5+random(s.id+111)*1.8;
      if((s.state==='flee'||s.state==='retreat')&&time>s.stateUntil) s.state='cruise';
      if(s.state==='warning') {
        desiredSpeed=1.35;
        const radius=diving?8.5:12;
        const a=offset+time*.035;
        s.target.set(center.x+Math.sin(a)*radius,diving?center.y-.35:-1.5,center.z+Math.cos(a)*radius);
        if(time>s.stateUntil) {s.state='rush';s.stateUntil=time+4.8;s.contact=false;}
      }
      if(s.state==='rush') {
        desiredSpeed=diving?7.8:Math.max(10.5,frame.speed+3);s.target.copy(center);s.target.y=diving?center.y:-.55;
        if(time>s.stateUntil) this.retreat(s,frame);
      } else if(s.state==='flee'||s.state==='retreat') {
        desiredSpeed=s.state==='flee'?8.8:5.9;
      } else if(s.state!=='warning') {
        if(diving) {
          const radius=5.9+(s.id%6)*1.8;
          const orbit=offset+time*(s.id%2?-.13:.10);
          s.state=s.id%3?'circle':'inspect';
          s.target.set(center.x+Math.sin(orbit)*radius,center.y-1+Math.sin(time*.14+offset)*(3+s.id%4),center.z+Math.cos(orbit)*radius);
          desiredSpeed=2.2+s.id%3*.65;
        } else {
          const close=s.id<4||frame.speed<2.5;
          const radius=close?12+s.id*2.6:25+(s.id%6)*8;
          const a=offset+time*(s.id%2?-.075:.061);
          const ahead=frame.speed*2.4+Math.sin(offset+time*.03)*10;
          s.state=close?'circle':'cruise';
          s.target.set(center.x+Math.sin(a)*radius+Math.sin(frame.boatHeading)*ahead,-1.65-(s.id%5)*1.55+Math.sin(time*.28+offset)*.7,center.z+Math.cos(a)*radius+Math.cos(frame.boatHeading)*ahead);
          if(s.id===1||s.id===3) s.target.y=-.78+Math.sin(time*.28+offset)*.20;
          desiredSpeed+=Math.min(frame.speed*.45,3.2);
        }
      }
      this.steer(s,frame,desiredSpeed,dt);
      if(s.state==='rush') {
        const nose=s.position.clone().add(V(Math.sin(s.heading)*2.35*s.scale,0,Math.cos(s.heading)*2.35*s.scale));
        const threshold=diving?2.75:5.15;
        const horizontal=Math.hypot(nose.x-center.x,nose.z-center.z);
        if(!s.contact&&horizontal<threshold&&Math.abs(nose.y-center.y)<(diving?2.3:2.2)) {
          s.contact=true;
          if(!frame.safeHarbor)this.onEvent({type:'impact',position:nose,amount:diving?18:16,target:diving?'cage':'boat'});
          if((s.state as State)!=='drag')this.retreat(s,frame);
        }
      }
    }
    if(time>this.nextThreat && this.threatId<0 && (frame.progress>.12||diving)&&!frame.safeHarbor&&!this.drag) {
      const candidates=this.animals.filter(s=>s.active&&s.health>0&&s.state!=='breach'&&s.state!=='flee'&&s.state!=='retreat').sort((a,b)=>a.position.distanceToSquared(center)-b.position.distanceToSquared(center));
      const s=candidates[0];
      if(s) {
        s.state='warning';s.stateUntil=time+2.35;this.threatId=s.id;
        this.onEvent({type:'threat',position:s.position.clone(),target:diving?'cage':'boat',message:diving?'它正在转向你。准备防御。':'背鳍正在靠近船舷。保持航速。'});
      }
      this.nextThreat=time+(diving?8:17);
    }
    if(this.threatId>=0 && !['warning','rush'].includes(this.animals[this.threatId].state)) this.threatId=-1;
    if(!diving && !this.drag && !frame.safeHarbor && !this.animals.some(s=>s.state==='breach') && ((!this.firstBreach&&time>32&&frame.progress>.13)||(this.firstBreach&&time>this.nextBreach&&frame.progress>.26))) {
      this.beginBreach();
    }
    this.updateClouds(dt);
  }

  private placeAhead(s:Animal,frame:SharkFrame) {
    const right=V(Math.cos(frame.boatHeading),0,-Math.sin(frame.boatHeading)), forward=V(Math.sin(frame.boatHeading),0,Math.cos(frame.boatHeading));
    s.position.copy(frame.boatPosition).addScaledVector(forward,55+random(s.id+frame.time)*65).addScaledVector(right,(random(s.id+frame.time+62)-.5)*100);
    s.position.y=-6-random(s.id+71)*12;s.heading=frame.boatHeading+Math.PI*.65;
  }

  private steer(s:Animal,frame:SharkFrame,desiredSpeed:number,dt:number) {
    const toward=s.target.clone().sub(s.position);
    // Nearby animals repel each other instead of turning into a stack of models.
    for(const other of this.animals) {
      if(other===s||!other.active||other.state==='dead'||other.state==='breach') continue;
      const away=s.position.clone().sub(other.position), distance=away.length();
      if(distance<5&&distance>.01) toward.addScaledVector(away,(5-distance)*2.8/distance);
    }
    const targetHeading=Math.atan2(toward.x,toward.z);
    const delta=wrap(targetHeading-s.heading);
    const maxTurn=(s.state==='rush'?1.2:.78)/Math.sqrt(s.scale);
    s.turn=clamp(delta,-maxTurn,maxTurn);s.heading+=s.turn*dt;
    // A shark slows before a tight turn; it never strafes or rotates in place.
    desiredSpeed*=1-.31*clamp(Math.abs(delta)/Math.PI,0,1);
    s.speed=THREE.MathUtils.damp(s.speed,desiredSpeed,1.65,dt);
    const desiredPitch=clamp(Math.atan2(toward.y,Math.max(4,Math.hypot(toward.x,toward.z))),-.33,.33);
    s.pitch=THREE.MathUtils.damp(s.pitch,desiredPitch,2.1,dt);
    s.position.x+=Math.sin(s.heading)*s.speed*dt;s.position.z+=Math.cos(s.heading)*s.speed*dt;
    s.position.y+=Math.sin(s.pitch)*s.speed*dt;
    s.position.y=Math.min(s.position.y,-.72);
    this.avoidSolids(s,frame);
    s.phase+=dt*(2.5+s.speed*.68);
    s.swim.value=s.phase;s.strength.value=.25+s.speed*.028;
    s.root.rotation.set(-s.pitch,s.heading,-s.turn*.09,'YXZ');
  }

  private avoidSolids(s:Animal,frame:SharkFrame) {
    for(const island of ISLANDS){const dx=s.position.x-island.x,dz=s.position.z-island.z,d=Math.hypot(dx,dz),r=island.radius+7;if(d<r){s.position.x=island.x+(d>.001?dx/d:island.side)*r;s.position.z=island.z+(d>.001?dz/d:0)*r;}}
    const sin=Math.sin(s.heading), cos=Math.cos(s.heading);
    const boatSin=Math.sin(frame.boatHeading), boatCos=Math.cos(frame.boatHeading);
    // Metre-space spheres cover the body, dorsal, pectorals and caudal tips.
    // Fin clearance matters: a centre-only collider lets the animal thread bars.
    const samples=[[-2.2,0,0,.20],[-1.2,0,0,.40],[0,0,0,.64],[1.1,0,0,.63],[2.2,0,.03,.28],[-.28,0,.96,.43],[.05,-1.19,-.34,.52],[.05,1.19,-.34,.52],[-2.80,0,.82,.40],[-2.75,0,-.61,.30]];
    for(let pass=0;pass<2;pass++) for(const [along,side,up,size] of samples) {
      const radius=size*s.scale;
      const x=s.position.x+(sin*along+cos*side)*s.scale,z=s.position.z+(cos*along-sin*side)*s.scale;
      const y=s.position.y+(up+Math.sin(s.pitch)*along)*s.scale;
      const bx=x-frame.boatPosition.x,bz=z-frame.boatPosition.z;
      const lx=bx*boatCos-bz*boatSin,lz=bx*boatSin+bz*boatCos;
      // Hull clearance applies to the whole body, not just the shark's centre.
      if(Math.abs(lx)<1.95+radius && Math.abs(lz)<5.15+radius && y+radius>frame.boatPosition.y-1.15) {
        s.position.y-=y+radius-(frame.boatPosition.y-1.19);
      }
      const cx=x-frame.cagePosition.x, cz=z-frame.cagePosition.z, cy=y-frame.cagePosition.y;
      if(frame.cageDepth>1 && Math.abs(cy)<1.45+radius) {
        const qx=cx*boatCos-cz*boatSin,qz=cx*boatSin+cz*boatCos;
        const limit=1.15+radius;
        if(Math.abs(qx)<limit&&Math.abs(qz)<limit) {
          const px=limit-Math.abs(qx), pz=limit-Math.abs(qz);
          if(px<pz) {const amount=(qx>=0?1:-1)*(px+.015);s.position.x+=boatCos*amount;s.position.z-=boatSin*amount;}
          else {const amount=(qz>=0?1:-1)*(pz+.015);s.position.x+=boatSin*amount;s.position.z+=boatCos*amount;}
        }
      }
    }
  }

  private retreat(s:Animal,frame:SharkFrame) {
    s.state='retreat';s.stateUntil=frame.time+6;
    const center=frame.inCage?frame.cagePosition:frame.boatPosition;
    let away=s.position.clone().sub(center);away.y=0;
    if(away.lengthSq()<.01) away.set(Math.sin(s.heading),0,Math.cos(s.heading));
    away.normalize().multiplyScalar(24);
    s.target.copy(center).add(away);s.target.y=center.y-5;
  }

  private beginBreach() {
    const frame=this.current;if(!frame)return;
    const s=this.animals.find(a=>a.health>0&&a.active&&a.state!=='flee');if(!s)return;
    const forward=V(Math.sin(frame.boatHeading),0,Math.cos(frame.boatHeading));
    const across=V(Math.cos(frame.boatHeading),0,-Math.sin(frame.boatHeading));
    const side=this.firstBreach?-1:1;
    const duration=2.65;
    const center=frame.boatPosition.clone().addScaledVector(forward,4.5+frame.speed*(duration*.5+.85));
    const start=center.clone().addScaledVector(across,-side*15);start.y=-2.3;
    // A continuous ballistic arc clears the complete hull at its apex. Lateral
    // momentum remains constant; pitch follows the tangent through re-entry.
    const direction=across.multiplyScalar(side);
    s.breach={start,direction,age:-.85,duration,velocity:14.65,launched:false};
    s.state='breach';s.heading=Math.atan2(direction.x,direction.z);s.speed=11.32;
    s.position.copy(start).addScaledVector(direction,-.85*s.speed);
    s.position.y=start.y-14.65*.85-5.53*.85*.85;
    this.firstBreach=true;this.nextBreach=frame.time+64+random(frame.time)*22;
    this.onEvent({type:'breach',position:start.clone(),amount:s.length,message:'船舷下方有急速上升的影子。'});
  }

  private updateBreach(s:Animal,dt:number) {
    const b=s.breach!;b.age+=dt;const t=b.age;
    s.position.copy(b.start).addScaledVector(b.direction,s.speed*t);
    s.position.y=b.start.y+b.velocity*t-5.53*t*t;
    const vy=b.velocity-11.06*t;
    s.pitch=Math.atan2(vy,s.speed);
    s.phase+=dt*7;s.swim.value=s.phase;s.strength.value=.17;
    s.root.rotation.set(-s.pitch,s.heading,Math.sin(t*2)*.08,'YXZ');
    if(t>=0&&!b.launched) {
      b.launched=true;
      this.onEvent({type:'splash',position:V(s.position.x,0,s.position.z),amount:1.5});
    }
    if(t>b.duration) {
      this.onEvent({type:'splash',position:V(s.position.x,0,s.position.z),amount:3});
      s.breach=undefined;s.state='retreat';s.stateUntil=(this.current?.time||0)+7;
      s.target.copy(s.position).addScaledVector(b.direction,30);s.target.y=-8;
      s.position.y=-2.8;
    }
  }

  attack(origin:THREE.Vector3,direction:THREE.Vector3,weapon:'speargun'|'knife'):{hit:boolean;killed:boolean;distance:number} {
    const dir=direction.clone().normalize(),ray=new THREE.Ray(origin,dir);
    const maxDistance=weapon==='knife'?3.9:48;
    let closest:Animal|undefined, closestDistance=maxDistance;
    const hitPoint=new THREE.Vector3();
    for(const s of this.animals) {
      if(!s.active||s.health<=0)continue;
      const forward=V(Math.sin(s.heading)*Math.cos(s.pitch),Math.sin(s.pitch),Math.cos(s.heading)*Math.cos(s.pitch));
      // Ray/segment closest distance is ambiguous for a collinear animal: it
      // can report the midpoint, incorrectly missing a nose within knife reach.
      // Sample overlapping anatomical volumes and use their first intersections.
      for(const [along,radius] of [[-2.10,.16],[-1.50,.25],[-.80,.43],[0,.59],[.75,.59],[1.45,.44],[1.95,.30],[2.28,.16]]) {
        const center=s.position.clone().addScaledVector(forward,along*s.scale);
        const sphere=new THREE.Sphere(center,radius*s.scale+(weapon==='knife'?.18:0));
        const intersection=ray.intersectSphere(sphere,new THREE.Vector3());
        if(!intersection)continue;
        const distance=origin.distanceTo(intersection);
        if(distance<closestDistance) {
          closest=s;closestDistance=distance;hitPoint.copy(intersection);
        }
      }
    }
    if(!closest)return {hit:false,killed:false,distance:maxDistance};
    const s=closest;s.health=Math.max(0,s.health-(weapon==='knife'?38:56));s.flash.value=1;
    const killed=s.health<=0;this.attackCount++;
    this.bloodCloud(hitPoint,weapon==='knife'?20:34);
    this.onEvent({type:killed?'kill':'hit',position:hitPoint.clone(),amount:weapon==='knife'?38:56});
    if(killed) {
      s.state='dead';s.deathAge=0;s.target.set(Math.sin(s.heading),0,Math.cos(s.heading));s.strength.value=.03;
    } else {
      s.state='flee';s.stateUntil=(this.current?.time||0)+8;
      const away=s.position.clone().sub(origin).normalize();s.target.copy(s.position).addScaledVector(away,35);s.target.y-=5;
    }
    if(this.threatId===s.id)this.threatId=-1;
    return {hit:true,killed,distance:closestDistance};
  }

  private bloodCloud(position:THREE.Vector3,count:number) {
    const points=new Float32Array(count*3),velocity=new Float32Array(count*3);
    for(let i=0;i<count;i++) {
      points.set([position.x,position.y,position.z],i*3);
      velocity.set([(random(i+this.attackCount*41)-.5)*1.1,(random(i+80)-.3)*.65,(random(i+141)-.5)*1.1],i*3);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(points,3));
    const material=new THREE.PointsMaterial({color:0x48666b,size:.11,transparent:true,opacity:.65,depthWrite:false,sizeAttenuation:true});
    const cloud=new THREE.Points(geometry,material);this.scene.add(cloud);this.clouds.push({points:cloud,velocity,age:0});
  }
  private updateClouds(dt:number) {
    for(let c=this.clouds.length-1;c>=0;c--) {
      const cloud=this.clouds[c];cloud.age+=dt;
      const p=cloud.points.geometry.getAttribute('position') as THREE.BufferAttribute;
      for(let i=0;i<p.count;i++) {p.setXYZ(i,p.getX(i)+cloud.velocity[i*3]*dt,p.getY(i)+cloud.velocity[i*3+1]*dt,p.getZ(i)+cloud.velocity[i*3+2]*dt);}
      p.needsUpdate=true;
      const material=cloud.points.material as THREE.PointsMaterial;material.opacity=Math.max(0,.6-cloud.age*.17);material.size=.11+cloud.age*.05;
      if(cloud.age>3.6) {this.scene.remove(cloud.points);cloud.points.geometry.dispose();material.dispose();this.clouds.splice(c,1);}
    }
  }

  /** QA only: uses exactly the same ballistic event as the natural encounter. */
  debugForceBreach() { this.beginBreach(); }
  beginDrag(origin:THREE.Vector3){
    const s=this.animals.filter(s=>s.active&&s.health>0).sort((a,b)=>a.position.distanceToSquared(origin)-b.position.distanceToSquared(origin))[0];if(!s)return;
    const direction=origin.clone().sub(s.position);direction.y=0;if(direction.lengthSq()<.01)direction.set(0,0,1);direction.normalize();
    this.drag={animal:s,origin:origin.clone(),start:s.position.clone(),direction,age:0};s.state='drag';s.breach=undefined;s.heading=Math.atan2(direction.x,direction.z);this.threatId=-1;
  }
  private updateDrag(dt:number){
    const d=this.drag!;d.age+=dt;const s=d.animal,grip=d.origin.clone().addScaledVector(d.direction,-2.5*s.scale);
    if(d.age<1.2)s.position.copy(d.start).lerp(grip,Math.min(1,d.age/1.2));else{s.position.copy(grip).addScaledVector(d.direction,(d.age-1.2)*3.8);s.position.y-=this.dragDescent(d.age-1.2);}
    s.root.rotation.set(d.age>1.2?.24:0,s.heading,Math.sin(d.age*4)*.09);s.swim.value+=dt*8;s.strength.value=.42;
  }
  private dragDescent(t:number){
    const d=this.drag!,p=d.origin.clone().addScaledVector(d.direction,t*3.8);
    return Math.min(t*6.8,Math.max(0,d.origin.y-seabedHeight(p.x,p.z)-5));
  }
  get dragView(){
    if(!this.drag)return null;
    const d=this.drag,t=Math.max(0,d.age-1.2);
    // Keep the lens outside the snout while the animal grips and descends.
    return {position:d.origin.clone().addScaledVector(d.direction,2.0+t*3.8).add(V(d.direction.z*.8,-1.75-this.dragDescent(t),-d.direction.x*.8)),target:d.animal.position.clone().addScaledVector(d.direction,1.8*d.animal.scale).add(V(0,-.75,0))};
  }
  /** QA only: places one live shark on a collision-safe, visible cage approach. */
  debugThreatNearCage() {
    const frame=this.current;if(!frame)return;
    const s=this.animals.find(a=>a.health>0);if(!s)return;
    s.active=true;s.root.visible=true;s.state='warning';s.stateUntil=frame.time+2.5;
    s.position.copy(frame.cagePosition).add(V(0,0,7));s.heading=Math.PI;s.target.copy(frame.cagePosition);this.threatId=s.id;
    this.onEvent({type:'threat',position:s.position.clone(),target:'cage'});
  }
}
