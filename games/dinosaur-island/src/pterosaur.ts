import * as THREE from 'three';

/** Original low-poly pterosaur: membrane wings, long beak and backward head crest. */
export function createPterosaur(wingspan:number){
  const root=new THREE.Group(),body=new THREE.Group();
  root.name='pterosaur';root.add(body);body.scale.setScalar(wingspan/8);
  const skin=new THREE.MeshStandardMaterial({color:0x88654c,roughness:.9});
  const membrane=new THREE.MeshStandardMaterial({color:0xba825d,roughness:.95,side:THREE.DoubleSide});
  const beak=new THREE.MeshStandardMaterial({color:0xccad77,roughness:.88});
  const eye=new THREE.MeshStandardMaterial({color:0x171b13,roughness:.45});
  function ellipsoid(parent:THREE.Object3D,material:THREE.Material,at:number[],scale:number[]){
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),material);
    mesh.position.set(at[0],at[1],at[2]);mesh.scale.set(scale[0],scale[1],scale[2]);
    mesh.castShadow=true;parent.add(mesh);return mesh;
  }
  function bone(parent:THREE.Object3D,a:THREE.Vector3,b:THREE.Vector3,radius:number,material=skin){
    const delta=b.clone().sub(a);
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius*.6,radius,delta.length(),8),material);
    mesh.position.copy(a).add(b).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
    mesh.castShadow=true;parent.add(mesh);
  }
  function sheet(parent:THREE.Object3D,points:number[],indices:number[],material:THREE.Material){
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    geometry.setIndex(indices);geometry.computeVertexNormals();
    const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;parent.add(mesh);
  }
  ellipsoid(body,skin,[0,0,0],[.32,.28,.85]);
  bone(body,new THREE.Vector3(0,0,.5),new THREE.Vector3(0,.3,1.25),.18);
  ellipsoid(body,skin,[0,.32,1.25],[.19,.22,.38]);
  // A tapered beak and triangular crest distinguish it from the crows.
  bone(body,new THREE.Vector3(0,.31,1.4),new THREE.Vector3(0,.26,2.45),.17,beak);
  sheet(body,[0,.44,1.4, 0,.45,.8, 0,1.05,.25],[0,1,2],membrane);
  for(const side of [-1,1]){
    ellipsoid(body,eye,[side*.175,.4,1.36],[.042,.045,.045]);
    bone(body,new THREE.Vector3(side*.18,-.1,-.6),new THREE.Vector3(side*.26,-.24,-1.15),.065);
    bone(body,new THREE.Vector3(side*.26,-.24,-1.15),new THREE.Vector3(side*.26,-.34,-.95),.04);
  }
  bone(body,new THREE.Vector3(0,0,-.6),new THREE.Vector3(0,.02,-1.5),.1);
  const wings:THREE.Group[]=[];
  for(const side of [-1,1]){
    const wing=new THREE.Group();wing.name=side===-1?'left-wing':'right-wing';
    wing.position.set(side*.22,0,.25);wing.scale.x=side;body.add(wing);wings.push(wing);
    // Shoulder, elbow, wrist and elongated wing finger support the broad membrane.
    const points=[0,0,0, 1.1,.08,-.18, 1.85,0,.22, 3.78,-.08,-.5, 1.2,0,-1.05, 0,0,-.9];
    sheet(wing,points,[0,1,5, 1,4,5, 1,2,4, 2,3,4],membrane);
    const shoulder=new THREE.Vector3(),elbow=new THREE.Vector3(1.1,.08,-.18);
    const wrist=new THREE.Vector3(1.85,0,.22),tip=new THREE.Vector3(3.78,-.08,-.5);
    bone(wing,shoulder,elbow,.08);bone(wing,elbow,wrist,.06);bone(wing,wrist,tip,.04);
    bone(wing,wrist,new THREE.Vector3(1.8,.05,.48),.03,beak);
  }
  return {root,clips:['Flight'],currentAction:()=> 'Flight',update(time:number){
    // Use simulation time so wingbeats, banking and bobbing freeze and restart together.
    const flap=Math.sin(time*3.8)*.28;
    wings[0].rotation.z=-flap;wings[1].rotation.z=flap;
    body.rotation.z=.12;body.rotation.x=Math.sin(time*1.9)*.035;
  }};
}
