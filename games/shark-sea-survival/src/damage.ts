import * as THREE from 'three';
export class VesselDamage {
  private cracks:THREE.Group;private patches:THREE.Group;private hull={value:0};private cage={value:0};private oar:THREE.Group;
  constructor(boat:THREE.Group,cage:THREE.Group){
    this.cracks=new THREE.Group();this.patches=new THREE.Group();boat.add(this.cracks,this.patches);
    const split=new THREE.MeshStandardMaterial({color:0x1c2525,roughness:1,side:THREE.DoubleSide});
    const timber=new THREE.MeshStandardMaterial({color:0x8a7351,roughness:.95});
    for(let i=0;i<10;i++){
      const side=i%2?1:-1,z=-3.4+Math.floor(i/2)*1.35;
      const shape=new THREE.Shape();shape.moveTo(0,-.25);shape.lineTo(.035,.08);shape.lineTo(.14,.12);shape.lineTo(.06,.38);shape.lineTo(.1,.55);shape.lineTo(.00,.26);shape.lineTo(-.1,.20);shape.lineTo(-.03,-.06);shape.closePath();
      const crack=new THREE.Mesh(new THREE.ShapeGeometry(shape),split);crack.rotation.y=side*Math.PI/2;crack.position.set(side*1.70,.1,z);this.cracks.add(crack);
      const patch=new THREE.Mesh(new THREE.BoxGeometry(.045,.20,.9),timber);patch.position.set(side*1.76,.38,z);patch.rotation.x=i%2*.09;this.patches.add(patch);
    }
    const materials=new Map<THREE.Material,THREE.Material>();
    cage.traverse(obj=>{if(!(obj instanceof THREE.Mesh))return;const old=obj.material as THREE.Material;if(!materials.has(old)){
      const mat=old.clone();mat.onBeforeCompile=shader=>{shader.uniforms.uBroken=this.cage;shader.vertexShader='uniform float uBroken;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      float bend=max(0.0,1.0-abs(position.y)/1.45);transformed.x+=sign(position.x)*uBroken*bend*(.25+smoothstep(.5,1.0,abs(position.z))*.95);
      transformed.y-=uBroken*bend*.14;`);};materials.set(old,mat);
    }obj.material=materials.get(old)!;});
    this.oar=new THREE.Group();this.oar.position.set(-1.9,1,-1.7);boat.add(this.oar);
    const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.034,.045,3.7,10),timber);shaft.rotation.z=.9;this.oar.add(shaft);
    const blade=new THREE.Mesh(new THREE.BoxGeometry(.22,.7,.055),timber);blade.position.set(-1.3,-1.15,0);blade.rotation.z=.9;this.oar.add(blade);
  }
  update(hull:number,cage:number,repairs:number,dragTime:number,time:number,speed:number){
    this.hull.value=1-hull/100;this.cage.value=Math.min(1,(1-cage/100)*.45+dragTime*.75);
    this.cracks.children.forEach((c,i)=>c.visible=i<this.hull.value*10);
    this.patches.children.forEach((c,i)=>c.visible=i<Math.min(repairs,10)&&i>=this.hull.value*10);
    this.oar.visible=hull<=0;this.oar.rotation.y=Math.sin(time*2.5)*.6;this.oar.rotation.x=Math.sin(time*2.5+1)*.2;
  }
}
