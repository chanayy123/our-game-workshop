import * as T from 'three';

const materials=new Map<string,T.MeshStandardMaterial>();
export function mat(color:string,roughness=.83,metalness=0){const key=color+roughness+metalness;if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color,roughness,metalness}));return materials.get(key)!;}
export function mesh(g:T.BufferGeometry,m:T.Material,x=0,y=0,z=0){const a=new T.Mesh(g,m);a.position.set(x,y,z);a.castShadow=true;a.receiveShadow=true;return a;}
export function ellipsoid(root:T.Group,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number,detail=1){const a=mesh(new T.IcosahedronGeometry(1,detail),m,x,y,z);a.scale.set(sx,sy,sz);root.add(a);return a;}
export function box(root:T.Group,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const a=mesh(new T.BoxGeometry(sx,sy,sz),m,x,y,z);root.add(a);return a;}
export function link(root:T.Group,m:T.Material,a:T.Vector3,b:T.Vector3,r1:number,r2=r1){const d=b.clone().sub(a);const obj=mesh(new T.CylinderGeometry(r2,r1,d.length(),6),m);obj.position.copy(a).add(b).multiplyScalar(.5);obj.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());root.add(obj);return obj;}
export type Croc = {root:T.Group;tail:T.Group[];jaw:T.Group;legs:T.Group[]};
export function firstPersonMuzzle(texture:T.Texture){
  const root=new T.Group(),upper=new T.Group(),lower=new T.Group();root.add(upper,lower);
  const hide=new T.MeshStandardMaterial({color:'#a0ad85',map:texture,bumpMap:texture,bumpScale:.018,roughness:.69});
  const lip=mat('#3e5140');const ivory=mat('#f0e7c1');
  ellipsoid(upper,hide,0,0,-.6,.27,.13,.73,3);ellipsoid(upper,hide,0,.03,-.07,.35,.2,.4,2);
  ellipsoid(lower,mat('#a2aa7c'),0,-.16,-.59,.25,.057,.72,2);
  for(const side of [-1,1]){
    ellipsoid(upper,lip,side*.145,.079,-1.08,.039,.017,.057,2);
    for(let i=0;i<9;i++){
      const z=-.18-i*.113,xx=side*(.26-(i/9)*.067);
      const top=mesh(new T.ConeGeometry(.021,.065,6),ivory,xx,-.065,z);top.rotation.x=Math.PI;upper.add(top);
      lower.add(mesh(new T.ConeGeometry(.023,.075,6),ivory,xx,-.103,z-.045));
    }
  }
  for(let i=0;i<7;i++)for(const side of [-1,1])ellipsoid(upper,hide,side*.19,.072,-.16-i*.13,.035,.022,.051);
  root.position.set(0,-.48,-.62);root.scale.setScalar(.85);root.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=false;o.receiveShadow=false;}});
  return {root,upper,lower};
}
export function crocodile(ancient=false):Croc{
  const root=new T.Group();const skin=mat(ancient?'#526752':'#638553');const dark=mat(ancient?'#354a40':'#3d6547');const scute=mat(ancient?'#89906a':'#91a862');const belly=mat('#c7c593');const tooth=mat('#ffedbf');
  ellipsoid(root,skin,0,.34,-.18,.64,.4,1.17,2);ellipsoid(root,belly,0,.13,.05,.49,.15,.95);
  ellipsoid(root,skin,0,.35,1.02,.49,.29,.68);ellipsoid(root,skin,0,.28,1.7,.36,.17,.69);
  const jaw=new T.Group();jaw.position.set(0,.1,1.0);root.add(jaw);ellipsoid(jaw,belly,0,0,.67,.35,.08,.78);
  for(let i=0;i<6;i++)for(const side of [-1,1]){const t=mesh(new T.ConeGeometry(.047,.13,4),tooth,side*(.31-i*.008),.115,1.15+i*.2);t.rotation.z=Math.PI;root.add(t);}
  for(const side of [-1,1]){
    ellipsoid(root,dark,side*.36,.55,1.01,.17,.15,.22);ellipsoid(root,mat('#f2bf4f'),side*.405,.595,1.08,.077,.09,.09);
    ellipsoid(root,mat('#162b28'),side*.44,.6,1.12,.021,.063,.045);
    ellipsoid(root,dark,side*.2,.42,2.08,.07,.04,.09);
  }
  for(let row=0;row<7;row++)for(const side of [-1,0,1]){
    const p=mesh(new T.ConeGeometry(.13,.13,4),scute,side*.29,.69- Math.abs(row-3)*.027,.85-row*.3);p.rotation.y=Math.PI/4;root.add(p);
  }
  const tail:T.Group[]=[];let parent=root;
  for(let i=0;i<5;i++){
    const part=new T.Group();part.position.set(0,i?-.025:.3,i?-.51:-1.08);parent.add(part);const width=.4*(1-i/6);
    ellipsoid(part,skin,0,0,-.28,width,.21*(1-i/6),.47);const plate=mesh(new T.ConeGeometry(width*.42,.19*(1-i/6),4),dark,0,.15*(1-i/6),-.28);part.add(plate);tail.push(part);parent=part;
  }
  const legs:T.Group[]=[];
  for(const z of [-.7,.65])for(const s of [-1,1]){
    const leg=new T.Group();leg.position.set(s*.48,.24,z);root.add(leg);link(leg,skin,new T.Vector3(),new T.Vector3(s*.44,-.12,-.1),.17,.13);link(leg,skin,new T.Vector3(s*.44,-.12,-.1),new T.Vector3(s*.4,-.22,.28),.13,.1);ellipsoid(leg,dark,s*.41,-.23,.31,.2,.085,.2);legs.push(leg);
  }
  return {root,tail,jaw,legs};
}
export function person(index:number,police=false){
  const root=new T.Group();const shirts=['#ee8a62','#ece3be','#80b9b0','#d4b9da','#eabb55'];const skin=mat(['#c78f6b','#9e674e','#e8bc92'][index%3]);const top=mat(police?'#294b66':shirts[index%shirts.length]);const pants=mat(police?'#18354b':'#375c61');
  box(root,top,0,1.12,0,.52,.65,.3);ellipsoid(root,skin,0,1.7,0,.23,.27,.22);ellipsoid(root,mat('#3d3730'),0,1.88,-.025,.235,.115,.23);
  for(const side of [-1,1]){ellipsoid(root,mat('#303b36'),side*.079,1.755,.205,.027,.025,.014,2);ellipsoid(root,skin,side*.224,1.695,0,.044,.072,.055);}
  ellipsoid(root,skin,0,1.68,.225,.04,.055,.044,2);box(root,mat('#855d4c'),0,1.605,.218,.075,.012,.01);
  const legs:T.Group[]=[];
  for(const s of [-1,1]){
    const leg=new T.Group();leg.position.set(s*.15,.8,0);box(leg,pants,0,-.32,0,.18,.65,.21);box(leg,mat('#eee1bf'),0,-.67,.09,.2,.12,.33);root.add(leg);legs.push(leg);
    const arm=new T.Group();arm.position.set(s*.34,1.39,0);box(arm,skin,0,-.27,0,.15,.56,.16);root.add(arm);legs.push(arm);
  }
  const phone=box(legs[3],mat('#142c30'),0,-.5,.11,.15,.23,.06);phone.visible=false;
  const shield=new T.Group();root.add(shield);shield.visible=false;
  if(police){box(root,top,0,1.91,.02,.49,.15,.48);box(root,mat('#f4cf6a'),-.15,1.26,.17,.11,.12,.03);box(shield,mat('#496673',.4,.4),0,1.05,.42,.8,1.23,.09);box(shield,mat('#a4cbd3',.2,.3),0,1.36,.48,.6,.25,.035);box(shield,mat('#f1c072'),0,.97,.48,.62,.08,.035);}
  else if(index%4===0){const hat=mesh(new T.CylinderGeometry(.4,.4,.09,10),mat('#ead6a5'),0,1.94,0);root.add(hat);}
  return {root,legs,phone,shield};
}
export function shark(){
  const root=new T.Group();const body=mat('#688d94');const pale=mat('#cedbc7');
  ellipsoid(root,body,0,0,0,.57,.55,1.72,2);ellipsoid(root,pale,0,-.23,.45,.48,.22,1.15);ellipsoid(root,body,0,0,1.4,.4,.31,.65);
  ellipsoid(root,mat('#273c3f'),0,-.17,1.89,.25,.095,.12,2);
  for(let i=0;i<7;i++){const tooth=mesh(new T.ConeGeometry(.025,.09,4),mat('#f5ebd0'),-.18+i*.06,-.13,1.968-Math.abs(i-3)*.009);tooth.rotation.x=Math.PI;root.add(tooth);}
  const fin=mesh(new T.ConeGeometry(.62,1.28,3),body,0,.7,-.28);fin.scale.x=.28;fin.rotation.y=Math.PI/2;root.add(fin);
  for(const side of [-1,1]){const wing=mesh(new T.ConeGeometry(.48,1.25,3),body,side*.66,-.14,.12);wing.rotation.z=side*-1.2;wing.rotation.x=.6;root.add(wing);ellipsoid(root,mat('#102d32'),side*.31,.09,1.53,.055,.055,.07);}
  const tail=new T.Group();tail.position.z=-1.5;ellipsoid(tail,body,0,0,-.4,.24,.26,.66);const tf=mesh(new T.ConeGeometry(.73,.22,3),body,0,.18,-.96);tf.rotation.z=Math.PI/2;tf.rotation.x=Math.PI/2;tail.add(tf);root.add(tail);
  for(const side of [-1,1])for(let i=0;i<3;i++)box(root,mat('#456b75'),side*.505,.02,.58-i*.14,.025,.27,.038);
  return {root,tail};
}
export function palm(seed:number){
  const root=new T.Group();const trunk=mat('#a18657');const tall=5+seed%4;
  const tip=new T.Vector3(Math.sin(seed)*1.2,tall,Math.cos(seed)*.65);
  link(root,trunk,new T.Vector3(),tip,.27,.13);
  for(let i=0;i<7;i++){
    const angle=i/7*Math.PI*2+seed;const dir=new T.Vector3(Math.cos(angle),0,Math.sin(angle));const p0=tip;const p1=tip.clone().addScaledVector(dir,1.3).add(new T.Vector3(0,.5,0));const p2=tip.clone().addScaledVector(dir,3.4).add(new T.Vector3(0,-1.05,0));const cross=new T.Vector3(-dir.z,0,dir.x).multiplyScalar(.42);
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([...p0.toArray(),...p1.clone().add(cross).toArray(),...p2.toArray(),...p0.toArray(),...p2.toArray(),...p1.clone().sub(cross).toArray()],3));g.computeVertexNormals();
    const m=mat(i%2?'#42765b':'#63854d');m.side=T.DoubleSide;root.add(mesh(g,m));
  }
  for(let i=0;i<3;i++)ellipsoid(root,mat('#655943'),tip.x+Math.cos(i*2)*.25,tip.y-.2,tip.z+Math.sin(i*2)*.25,.21,.25,.21);
  return root;
}
