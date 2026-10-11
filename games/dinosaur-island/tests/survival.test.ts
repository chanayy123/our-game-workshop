import test from 'node:test';
import assert from 'node:assert/strict';
import { SurvivalSimulation,RULES } from '../src/survival.ts';
import { terrainHeight,riverCenter,riverDepth,riverSurface } from '../src/terrain.ts';
import { SPECIES,isPrey } from '../src/species.ts';
const pose={x:25,z:134,heading:Math.PI,speed:0};
function advance(game:SurvivalSimulation,seconds:number,player=pose){for(let time=0;time<seconds-.000001;time+=.05)game.update(.05,player);}
function preyAt(game:SurvivalSimulation,x:number,z:number){const c=game.creatures.find(c=>c.kind==='fox')!;game.creatures.splice(0,game.creatures.length,c);Object.assign(c,{x,z,active:true,alive:true,mode:'idle',timer:10,fear:0});return c;}
test('food depletes over minutes; zero food drains health and ultimately kills',()=>{
  const game=new SurvivalSimulation();game.creatures.length=0;advance(game,399);
  assert.ok(game.hunger>0&&game.hunger<1);assert.equal(game.health,100);assert.equal(game.dead,false);
  advance(game,22);assert.equal(game.hunger,0);assert.equal(game.health,0);assert.equal(game.dead,true);
  assert.equal(game.beginAttack(),false);assert.equal(game.beginEat(pose),false);
  const elapsed=game.elapsed;advance(game,2);assert.equal(game.elapsed,elapsed);
});
test('running costs more food and no update/zero delta leaves survival frozen',()=>{
  const slow=new SurvivalSimulation(),fast=new SurvivalSimulation();slow.creatures.length=fast.creatures.length=0;
  advance(slow,10);advance(fast,10,{...pose,speed:9});assert.ok(fast.hunger<slow.hunger-1);
  const h=fast.hunger;fast.update(0,pose);assert.equal(fast.hunger,h);
});
test('bite requires range and a forward cone, strikes once and does not feed automatically',()=>{
  const game=new SurvivalSimulation(),c=preyAt(game,25,128);game.hunger=40;
  assert.equal(game.beginAttack(),true);assert.equal(game.beginAttack(),false);advance(game,.5);
  assert.equal(c.alive,false);assert.equal(game.kills,1);assert.ok(game.hunger<40);advance(game,1);assert.equal(game.kills,1);
  for(const [x,z]of [[25,143],[25,110],[35,134]]){
    const miss=new SurvivalSimulation(),target=preyAt(miss,x,z);miss.beginAttack();advance(miss,.5);assert.equal(target.alive,true);
  }
});
test('an actual nearby carcass is required; eating restores food once after completion',()=>{
  const game=new SurvivalSimulation(),c=preyAt(game,25,130);game.hunger=40;game.health=60;
  assert.equal(game.beginEat(pose),false);c.alive=false;c.mode='dead';
  assert.equal(game.beginEat(pose),true);assert.equal(game.beginEat(pose),false);advance(game,1);
  assert.equal(game.meals,0);advance(game,1.25);assert.equal(game.meals,1);assert.ok(game.hunger>80);assert.equal(game.health,75);assert.equal(c.active,false);assert.equal(game.beginEat(pose),false);
});
test('eating cannot heal a dead player and walking out of range cancels consumption',()=>{
  const game=new SurvivalSimulation(),c=preyAt(game,25,130);c.alive=false;c.mode='dead';game.hunger=40;
  game.beginEat(pose);advance(game,3,{...pose,x:80});assert.equal(game.meals,0);assert.equal(c.active,true);
  game.dead=true;assert.equal(game.beginEat(pose),false);
});
test('roar frightens nearby prey; prey move and respect the river/ocean boundary',()=>{
  const game=new SurvivalSimulation();const c=preyAt(game,25,113);game.roar(pose);assert.ok(c.fear>0);
  const before=c.z;advance(game,2);assert.notEqual(c.z,before);assert.ok(terrainHeight(c.x,c.z)>=.3);assert.ok(riverDepth(c.x,c.z)<.16);
});
test('reset starts a fresh population and economy',()=>{
  const game=new SurvivalSimulation();game.dead=true;game.hunger=0;game.health=0;game.kills=4;game.meals=3;game.creatures[0].active=false;game.reset();
  assert.equal(game.hunger,100);assert.equal(game.health,100);assert.equal(game.dead,false);assert.equal(game.kills,0);assert.equal(game.meals,0);
  assert.equal(new Set(game.creatures.map(c=>c.kind)).size,6);assert.equal(game.creatures.length,17);
  assert.equal(game.creatures.filter(c=>SPECIES[c.kind].group==='dinosaur').length,7);assert.equal(game.creatures.filter(c=>isPrey(c)&&c.active&&c.alive).length,8);
});
test('raptors flee, can be hunted and eaten; large herbivores are not edible targets',()=>{
  const game=new SurvivalSimulation(),c=preyAt(game,25,130);c.kind='raptor';game.hunger=40;
  game.update(.1,pose);assert.equal(c.mode,'run');assert.ok(c.speed>4.2);
  game.beginAttack();advance(game,.45);assert.equal(c.alive,false);advance(game,1);
  assert.equal(game.beginEat(pose),true);advance(game,2.3);assert.equal(game.meals,1);
  for(const kind of ['rhino','diplodocus'] as const){const safe=new SurvivalSimulation(),target=preyAt(safe,25,130);target.kind=kind;safe.beginAttack();advance(safe,.5);assert.equal(target.alive,true);target.alive=false;assert.equal(safe.beginEat(pose),false);}
});
test('birds follow bounded air routes and all ground species spawn outside obstacles and rivers',()=>{
  const obstacles=[{x:-34,z:82,radius:3},{x:-5,z:108,radius:4}],game=new SurvivalSimulation(obstacles);
  for(const c of game.creatures.filter(c=>c.kind!=='crow')){assert.ok(terrainHeight(c.x,c.z)>=.3);assert.ok(riverDepth(c.x,c.z)<=.15);assert.ok(obstacles.every(o=>Math.hypot(o.x-c.x,o.z-c.z)>o.radius+SPECIES[c.kind].radius));}
  const bird=game.creatures.find(c=>c.kind==='crow')!,start={x:bird.x,z:bird.z};advance(game,60);
  assert.ok(Math.hypot(bird.x-start.x,bird.z-start.z)>1);assert.ok(Math.hypot(bird.x-bird.home.x,bird.z-bird.home.z)<=24.01);assert.equal(bird.mode,'run');
});
test('river water follows a carved bed with traversable depth, not a decal on ground',()=>{
  for(const z of [0,45,85,115,140]){const x=riverCenter(z),depth=riverDepth(x,z);assert.ok(depth>1&&depth<1.6);assert.ok(terrainHeight(x,z)<riverSurface(z));assert.equal(riverDepth(x+20,z),0);}
  assert.equal(riverDepth(0,200),0);assert.ok(RULES.biteRange<10);
});
