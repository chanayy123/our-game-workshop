import * as T from 'three';
import {beach,terrainHeight} from './game';
import {mat,mesh,ellipsoid,box,link,palm} from './models';

function noiseTexture(kind:'sand'|'scale'){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const ctx=canvas.getContext('2d')!;let seed=49;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  if(kind==='sand'){
    const pixels=ctx.createImageData(512,512);for(let y=0;y<512;y++)for(let x=0;x<512;x++){const i=(y*512+x)*4;const n=198+random()*30+Math.sin(y*.16+Math.sin(x*.02)*2)*7;pixels.data[i]=n;pixels.data[i+1]=n*.95;pixels.data[i+2]=n*.8;pixels.data[i+3]=255;}ctx.putImageData(pixels,0,0);
    for(let i=0;i<1700;i++){ctx.fillStyle=random()>.5?'#fff8d245':'#6e634938';ctx.fillRect(random()*512,random()*512,1+random(),1+random());}
  }else{
    ctx.fillStyle='#7b8c65';ctx.fillRect(0,0,512,512);
    for(let y=-1;y<18;y++)for(let x=-1;x<18;x++){const px=x*32+(y%2)*16,py=y*31;ctx.beginPath();ctx.ellipse(px,py,15,14,0,0,Math.PI*2);ctx.fillStyle=`hsl(${76+random()*12} 17% ${43+random()*18}%)`;ctx.fill();ctx.strokeStyle='#394e38';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.ellipse(px-2,py-3,10,8,0,Math.PI,Math.PI*1.9);ctx.strokeStyle='#d4d8a936';ctx.lineWidth=1;ctx.stroke();}
  }
  const tex=new T.CanvasTexture(canvas);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=8;return tex;
}
export function skinTexture(){const t=noiseTexture('scale');t.repeat.set(2,3);return t;}
export function terrain(){
  const g=new T.PlaneGeometry(360,360,240,240);g.rotateX(-Math.PI/2);const a=g.attributes.position;const colors=[];const c=new T.Color();
  for(let i=0;i<a.count;i++){const x=a.getX(i),z=a.getZ(i),shore=z-beach(x);a.setY(i,terrainHeight(x,z));
    if(shore< -15)c.set('#798761');else if(shore< -12)c.set('#afae7e');else if(shore<-.6)c.set('#f4e6bc');else if(shore<3)c.set('#b7b58c');else c.set('#9cae92');
    const n=1+Math.sin(x*1.34+z*.84)*.025;c.multiplyScalar(n);colors.push(c.r,c.g,c.b);
  }
  g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.computeVertexNormals();const texture=noiseTexture('sand');texture.repeat.set(90,90);
  const material=new T.MeshStandardMaterial({map:texture,bumpMap:texture,bumpScale:.07,vertexColors:true,roughness:.96});
  material.onBeforeCompile=shader=>{shader.uniforms.tideTime={value:0};shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 groundPos;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\ngroundPos=(modelMatrix*vec4(transformed,1.0)).xyz;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 groundPos; uniform float tideTime;').replace('#include <dithering_fragment>',`if(groundPos.y<-.5){float a=sin(groundPos.x*2.8+tideTime*.7+sin(groundPos.z*2.1));float b=sin(groundPos.z*3.3-tideTime*.4+sin(groundPos.x*1.7));float caustic=pow(max(0.,1.-abs(a+b)*1.5),8.);gl_FragColor.rgb+=caustic*.12;}\n#include <dithering_fragment>`);material.userData.shader=shader;};
  const m=mesh(g,material);m.castShadow=false;return m;
}
export function sky(){
  const obj=new T.Mesh(new T.SphereGeometry(480,32,18),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{sun:{value:new T.Vector3(-.5,.5,-.7).normalize()}},vertexShader:'varying vec3 dir;void main(){dir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec3 dir;uniform vec3 sun;float hash(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}float fbm(vec2 q){return noise(q)*.5+noise(q*2.1)*.25+noise(q*4.3)*.125+noise(q*8.7)*.0625;}void main(){vec3 d=normalize(dir);float h=max(d.y,0.);vec3 c=mix(vec3(.86,.86,.71),vec3(.22,.53,.67),pow(h,.55));float s=max(dot(d,sun),0.);c+=vec3(1.,.77,.36)*pow(s,160.)*.65;c+=vec3(1.,.91,.61)*smoothstep(.9998,.99991,s)*3.;float cloud=fbm(d.xz/max(.08,d.y)*2.2);c=mix(c,vec3(.97,.96,.88),smoothstep(.43,.7,cloud)*smoothstep(.03,.17,h)*(1.-smoothstep(.55,.95,h))*.72);gl_FragColor=vec4(c,1.);}`}));obj.renderOrder=-10;return obj;
}
export function horizon(group:T.Group){
  const stone=mat('#78816b');const green=mat('#506c55');
  for(let i=0;i<14;i++){const x=-150+i*24;ellipsoid(group,i%3?green:stone,x,2,-65-Math.sin(i)*8,19,8+Math.sin(i*2)*4,15,2);}
  for(let i=0;i<34;i++){const tree=palm(i+100);tree.position.set(-102+i*6,1,-35-(i%4)*5);tree.scale.setScalar(1.2+(i%4)*.15);group.add(tree);}
  for(const x of [-43,8,47]){
    const wood=mat('#8f7758');const z=-24;
    for(const s of [-1,1])for(const d of [-1,1])box(group,wood,x+s*2,1.6,z+d*1.8,.16,3.2,.16);
    box(group,wood,x,2.15,z,4.4,.18,3.8);box(group,mat('#bfad77'),x,3.6,z,5,.18,4.5);
    const roof=mesh(new T.ConeGeometry(3.65,1.3,4),mat('#8a7555'),x,4.26,z);roof.rotation.y=Math.PI/4;group.add(roof);
    for(let j=0;j<5;j++)box(group,wood,x-1.2,.3+j*.4,z+2.7-j*.27,1.2,.18,.5);
  }
  // A distant lighthouse and offshore stacks give navigation landmarks at eye level.
  const tower=mesh(new T.CylinderGeometry(1.7,2.5,16,12),mat('#e7d8af'),-76,8,25);group.add(tower);const roof=mesh(new T.ConeGeometry(3,3,12),mat('#9c664f'),-76,17,25);group.add(roof);box(group,mat('#405e5e'),-76,14.6,26.6,1.5,1.2,.1);
  for(let i=0;i<8;i++)ellipsoid(group,stone,62+i*7,-1,56+Math.sin(i)*7,3+i%3,4+i%4,4,2);
}
export function underwaterDetails(group:T.Group){
  const coral=[mat('#9d8270'),mat('#69978a'),mat('#b3a58a')];
  for(let i=0;i<48;i++){const x=Math.sin(i*18.13)*53,z=7+((i*7.91)%32);const base=new T.Vector3(x,terrainHeight(x,z),z);
    for(let j=0;j<3;j++){const end=base.clone().add(new T.Vector3(Math.sin(j*2+i)*.4,.5+(i%4)*.18,Math.cos(j*2+i)*.35));link(group,coral[i%3],base,end,.1,.055);link(group,coral[i%3],end,end.clone().add(new T.Vector3(.28,.32,.1)),.055,.02);}
  }
  for(let i=0;i<12;i++){const x=-14+(i%4)*1.3,z=36+Math.floor(i/4)*.8;const plank=box(group,mat('#62716a'),x,-3.52,z,1.6,.14,.35);plank.rotation.y=i*.37;}
}
export function waterMaterial(){return new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:{time:{value:0},submerged:{value:0},eye:{value:new T.Vector3()}},vertexShader:`varying vec3 p;void main(){p=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);}`,fragmentShader:`
uniform float time;uniform float submerged;uniform vec3 eye;varying vec3 p;
float waves(vec2 q){return sin(q.x*.7+time*.75+sin(q.y*.36))*.045+sin(q.y*1.1-time*.65+sin(q.x*.55))*.032;}
void main(){float shore=sin(p.x*.075)*2.+sin(p.x*.19)*.7;float d=p.z-shore;if(d<-.1)discard;float h=waves(p.xz);vec3 n=normalize(vec3((h-waves(p.xz+vec2(.15,0.)))/.15,1.,(h-waves(p.xz+vec2(0.,.15)))/.15));vec3 v=normalize(eye-p);float fres=pow(1.-abs(dot(v,n)),3.);float depth=clamp(d/18.,0.,1.);vec3 c=mix(vec3(.28,.65,.52),vec3(.055,.28,.32),depth);c=mix(c,vec3(.55,.75,.73),fres*.75);float shine=pow(max(dot(reflect(normalize(vec3(.5,-.55,.7)),n),v),0.),150.);c+=vec3(1.,.89,.63)*shine*1.3;float wave=sin(d*4.-time*1.5+sin(p.x*.4))*.5+.5;float foam=(1.-smoothstep(.05,1.7,d))*smoothstep(.45,.8,wave);c=mix(c,vec3(.87,.91,.78),foam*.65);if(submerged>.5)c=mix(c,vec3(.11,.47,.47),.45);gl_FragColor=vec4(c,mix(.8+fres*.2,1.,submerged));}`});}
