import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { SharkSystem } from '../src/sharks.ts';
import {seabedHeight} from '../src/islands.ts';
import type { SharkEvent, SharkFrame } from '../src/contracts.ts';

function fixture(heading=0,diving=false) {
  let time=0;
  const events:(SharkEvent&{time:number})[]=[];
  const system=new SharkSystem(new THREE.Scene(),event=>events.push({...event,time}));
  const frame:SharkFrame={time:0,dt:1/60,boatPosition:new THREE.Vector3(0,0,0),boatHeading:heading,speed:0,cagePosition:new THREE.Vector3(3.5,diving?-14:1,-2),cageDepth:diving?15:0,inCage:diving,progress:diving?.3:0};
  const step=(seconds:number,advance?:(frame:SharkFrame)=>void)=>{
    for(let n=0;n<Math.round(seconds*60);n++) {
      time+=1/60;frame.time=time;advance?.(frame);system.update(frame);
    }
  };
  system.update(frame);
  return {system,frame,events,step};
}

test('a natural voyage guarantees a continuous breach with launch, apex, re-entry and hull clearance',()=>{
  const {system,frame,events,step}=fixture();
  frame.speed=9;
  let peak=-Infinity,airborneFrames=0,previous:THREE.Vector3|undefined,continuityChecks=0;
  step(105,f=>{
    f.boatPosition.z=f.time*9;f.cagePosition.copy(f.boatPosition).add(new THREE.Vector3(3.5,1,-2));f.progress=f.boatPosition.z/1800;
    const breacher=system.sharks.find(s=>s.state==='breach');
    if(!breacher){previous=undefined;return;}
    const p=breacher.position;peak=Math.max(peak,p.y);
    if(p.y>0)airborneFrames++;
    if(previous) {
      assert.ok(p.distanceTo(previous)<.6,'ballistic movement cannot teleport during the event');continuityChecks++;
    }
    previous=p;
    // Conservative moving-boat clearance: when the animal's body overlaps the
    // full hull width it clears the roof and tall antenna as well as the deck.
    if(Math.abs(p.x-f.boatPosition.x)<4.3&&Math.abs(p.z-f.boatPosition.z)<6) {
      assert.ok(p.y>6,'breach must pass above the hull/shelter, never through it');
    }
  });
  assert.ok(events.some(e=>e.type==='breach'&&e.time<40),'first natural encounter is guaranteed');
  assert.ok(events.filter(e=>e.type==='breach').length<=2,'breaches remain rare');
  assert.ok(events.filter(e=>e.type==='splash').length>=2,'launch and re-entry each create a splash');
  assert.ok(peak>7&&peak<8.5,'the visible, finite arc has a plausible large breach apex');
  assert.ok(airborneFrames>100&&continuityChecks>150);
  assert.equal(events.some(e=>e.type==='impact'&&e.target==='boat'),false,'steady cruising remains survivable');
  assert.ok(system.sharks.every(s=>s.position.toArray().every(Number.isFinite)));
});

test('cage attacks are telegraphed and their damage is bounded over a long dive',()=>{
  const {system,frame,events,step}=fixture(0,true);
  system.debugThreatNearCage();
  step(120);
  const impacts=events.filter(e=>e.type==='impact'&&e.target==='cage');
  assert.ok(impacts.length>=2,'nearby sharks actually threaten the cage');
  assert.ok(impacts.length<=13,'the entire school cannot attack simultaneously');
  for(const impact of impacts) {
    assert.equal(impact.amount,18);
    const warning=events.filter(e=>e.type==='threat'&&e.time<impact.time).at(-1);
    assert.ok(warning&&impact.time-warning.time>=2.30,'every lunge provides a usable warning window');
  }
  assert.ok(frame.cagePosition.y<0);
});

test('shark bodies stay outside each of the four rotated cage faces during approach and turns',()=>{
  let checked=0;
  for(const heading of [0,Math.PI/2,Math.PI,Math.PI*1.5]) {
    const {system,frame,step}=fixture(heading,true);
    system.debugThreatNearCage();
    step(28,()=>{
      for(const shark of system.sharks) {
        if(shark.state==='breach'||shark.health<=0)continue;
        const scale=shark.length/5.5;
        for(const [along,radius] of [[0,.50],[1.1,.43],[-1.1,.28],[2.2,.20]]) {
          const point=shark.position.clone().add(new THREE.Vector3(Math.sin(shark.heading)*along*scale,0,Math.cos(shark.heading)*along*scale));
          const delta=point.sub(frame.cagePosition),r=radius*scale;
          // Ignore vertically separated sections; the test uses public heading
          // rather than private pitch and leaves a margin at the floor/roof.
          if(Math.abs(delta.y)>1.05)continue;
          const x=delta.x*Math.cos(heading)-delta.z*Math.sin(heading);
          const z=delta.x*Math.sin(heading)+delta.z*Math.cos(heading);
          assert.ok(Math.abs(x)>=1.10+r-.02||Math.abs(z)>=1.10+r-.02,`body entered cage at heading ${heading}, shark ${shark.id}`);
          checked++;
        }
      }
    });
  }
  assert.ok(checked>500,'test observes substantial close cage traffic');
});

test('weapons hit the closest anatomical surface; wounds cause flight and death sinks',()=>{
  const {system,frame,step}=fixture(0,true);
  system.debugThreatNearCage();
  const origin=frame.cagePosition.clone(),direction=new THREE.Vector3(0,0,1);
  assert.equal(system.attack(origin,direction.clone().negate(),'speargun').hit,false,'shots behind the player cannot hit the approaching shark');
  const knife=system.attack(origin,direction,'knife');
  assert.equal(knife.hit,true,'the nose is inside knife reach even though the centre is 7 m away');
  assert.ok(knife.distance>3&&knife.distance<3.9);
  assert.equal(system.sharks[0].state,'flee');assert.equal(system.sharks[0].health,62);
  const spear=system.attack(origin,direction,'speargun');
  assert.equal(spear.hit,true);assert.equal(spear.killed,false);assert.equal(system.sharks[0].health,6);
  const final=system.attack(origin,direction,'knife');assert.equal(final.killed,true);
  const dead=system.sharks[0];assert.equal(dead.state,'dead');assert.equal(dead.health,0);
  step(2);assert.ok(system.sharks[0].position.y<dead.position.y-.7,'a killed shark sinks visibly');
  system.reset();assert.ok(system.sharks.every(s=>s.health===100&&s.state==='cruise'),'restart restores all animals');
});

test('speargun reach is finite and two direct hits kill a healthy great white',()=>{
  const {system,frame}=fixture(0,true);system.debugThreatNearCage();
  const direction=new THREE.Vector3(0,0,1);
  assert.equal(system.attack(frame.cagePosition.clone().add(new THREE.Vector3(0,0,-60)),direction,'speargun').hit,false);
  const first=system.attack(frame.cagePosition,direction,'speargun');
  assert.equal(first.hit,true);assert.equal(first.killed,false);assert.equal(system.sharks[0].health,44);
  assert.ok(first.distance<4.2,'ray distance refers to the first body surface');
  assert.equal(system.attack(frame.cagePosition,direction,'speargun').killed,true);
});


test('sharks attack an exposed boat but respect safe island moorings',()=>{
  const open=fixture();open.frame.progress=.4;open.step(100);
  const impacts=open.events.filter(e=>e.type==='impact'&&e.target==='boat');assert.ok(impacts.length>=1);assert.ok(impacts.every(e=>e.amount===16));
  const safe=fixture();safe.frame.progress=.4;safe.frame.safeHarbor=true;safe.step(100);
  assert.equal(safe.events.some(e=>e.type==='impact'||e.type==='breach'),false);
});

test('cage breach grabs one animal and continuously drags viewpoint down before restart',()=>{
  const {system,frame,step}=fixture(0,true);system.debugThreatNearCage();system.beginDrag(frame.cagePosition);
  step(1.3);const start=system.dragView!;assert.ok(start);assert.equal(system.sharks.filter(s=>s.state==='drag').length,1);
  let previous=start.position.clone();step(3,()=>{const p=system.dragView!.position;assert.ok(p.distanceTo(previous)<.2);previous=p.clone();});
  assert.ok(system.dragView!.position.y<start.position.y-19);assert.ok(system.sharks.every(s=>s.position.toArray().every(Number.isFinite)));
  system.reset();assert.equal(system.dragView,null);assert.equal(system.sharks.some(s=>s.state==='drag'),false);
});


test('a maximum-depth grab stays above the physical seabed',()=>{
  const {system,frame,step}=fixture(0,true);frame.cagePosition.y=-37;system.beginDrag(frame.cagePosition);
  step(6,()=>{const v=system.dragView!;assert.ok(v.position.y>seabedHeight(v.position.x,v.position.z)+2,'drag must not pass through terrain');});
});
