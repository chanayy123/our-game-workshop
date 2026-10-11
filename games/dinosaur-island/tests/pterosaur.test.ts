import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createPterosaur } from '../src/pterosaur.ts';

test('pterosaur has finite, visible membrane geometry and symmetric wingbeats that reset',()=>{
  const bird=createPterosaur(6.5),left=bird.root.getObjectByName('left-wing')!,right=bird.root.getObjectByName('right-wing')!;
  bird.update(0);bird.root.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(bird.root),size=box.getSize(new THREE.Vector3());
  assert.ok(size.x>6&&size.x<7);assert.ok(size.z>3&&size.z<4);
  let membranes=0;
  bird.root.traverse(o=>{
    if(!(o instanceof THREE.Mesh))return;
    assert.ok(Array.from(o.geometry.attributes.position.array).every(Number.isFinite));
    if(o.material instanceof THREE.MeshStandardMaterial&&o.material.side===THREE.DoubleSide)membranes++;
  });
  assert.ok(membranes>=2,'both wings need visible membranes from above and below');
  bird.update(.4);assert.ok(Math.abs(left.rotation.z)>.2);assert.equal(left.rotation.z,-right.rotation.z);
  const angle=left.rotation.z;bird.update(.4);assert.equal(left.rotation.z,angle);
  bird.update(0);assert.equal(Math.abs(left.rotation.z),0);assert.equal(Math.abs(right.rotation.z),0);
});
