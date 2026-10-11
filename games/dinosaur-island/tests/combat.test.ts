import test from 'node:test';
import assert from 'node:assert/strict';
import {SurvivalSimulation,COMBAT} from '../src/survival.ts';
import {TreeLifecycle} from '../src/trees.ts';
const player={x:25,z:134,heading:Math.PI,speed:0};
function step(game:SurvivalSimulation,seconds:number,p=player){for(let t=0;t<seconds-.00001;t+=.05)game.update(.05,p);}
function setup(){const game=new SurvivalSimulation(),rex=game.creatures.find(c=>c.kind==='dinosaur')!;game.creatures.splice(0,game.creatures.length,rex);Object.assign(rex,{x:25,z:129,home:{x:25,z:129},timer:100});return {game,rex};}

test('a peaceful rex retaliates only after being struck, with a dodgeable windup',()=>{
  const {game,rex}=setup();step(game,3);assert.equal(game.health,100);assert.equal(rex.aggro,0);
  game.beginAttack();step(game,.45);assert.equal(rex.health,135);assert.ok(rex.windup>0);assert.equal(game.health,100);
  step(game,.8,{...player,x:34});assert.equal(game.health,100,'moving outside its strike avoids damage');
});
test('counterattacks damage the player, have a cooldown and can cause combat death',()=>{
  const {game}=setup();game.beginAttack();step(game,1.3);assert.equal(game.health,82);
  step(game,1);assert.equal(game.health,82,'no damage every frame');
  step(game,17);assert.equal(game.health,0);assert.equal(game.dead,true);assert.equal(game.deathCause,'combat');
  assert.equal(game.beginEat(player),false);assert.equal(game.beginAttack(),false);
});
test('a defeated rex cannot retaliate and supplies three higher-value meals exactly once each',()=>{
  const {game,rex}=setup();game.hunger=0;game.health=100;
  for(let i=0;i<4;i++){assert.ok(game.beginAttack());step(game,1.25);}
  assert.equal(rex.health,0);assert.equal(rex.alive,false);assert.equal(game.kills,1);
  const health=game.health;game.hunger=10;step(game,2);assert.equal(game.health,health);
  for(let i=0;i<3;i++){game.hunger=5;game.health=50;assert.ok(game.beginEat(player));step(game,2.25);assert.ok(game.hunger>89);assert.equal(game.health,80);assert.equal(rex.portions,2-i);}
  assert.equal(rex.active,false);assert.equal(game.beginEat(player),false);assert.equal(game.meals,3);
});
test('raptor form has a shorter attack reach, lower damage and does not reset survival values',()=>{
  const {game,rex}=setup();game.health=66;game.hunger=40;game.setPlayerForm('raptor');assert.equal(game.health,66);assert.equal(game.hunger,40);
  rex.z=128;game.beginAttack();step(game,1.25);assert.equal(rex.health,COMBAT.rexHealth);
  rex.z=129;game.beginAttack();step(game,.45);assert.equal(rex.health,150);
});
test('solid obstacles block bites and inactive fallen-tree obstacles do not',()=>{
  const obstacle={x:25,z:131.5,radius:.5,active:true};
  const game=new SurvivalSimulation([obstacle]),rex=game.creatures.find(c=>c.kind==='dinosaur')!;game.creatures.splice(0,game.creatures.length,rex);Object.assign(rex,{x:25,z:129,home:{x:25,z:129},timer:100});
  game.beginAttack();step(game,1.25);assert.equal(rex.health,180);
  obstacle.active=false;game.beginAttack();step(game,.45);assert.equal(rex.health,135);
});
test('trees fall once in a forward cone, restore at 60 play seconds, and defer around the player',()=>{
  const forest=new TreeLifecycle(),tree=forest.add({x:25,z:130,radius:1,active:true});
  assert.equal(forest.strike({...player,heading:0},7.5),undefined);assert.equal(forest.strike(player,7.5),tree);assert.equal(tree.obstacle.active,false);assert.equal(forest.strike(player,7.5),undefined);
  forest.update(0,player);assert.equal(tree.age,0);
  forest.update(59,player);assert.equal(tree.fallen,true);
  forest.update(1,{x:25,z:130});assert.equal(tree.fallen,true,'do not grow around the player');
  forest.update(.1,player);assert.equal(tree.fallen,false);assert.equal(tree.obstacle.active,true);
  forest.strike(player,7.5);forest.reset();assert.equal(tree.fallen,false);assert.equal(tree.obstacle.active,true);
});
test('a missed animal bite routes to a tree once and respects attack cooldown',()=>{
  const forest=new TreeLifecycle(),tree=forest.add({x:25,z:130,radius:1,active:true});
  const game=new SurvivalSimulation([tree.obstacle],(p,r)=>!!forest.strike(p,r));game.creatures.length=0;
  game.beginAttack();step(game,.4);assert.equal(tree.fallen,true);assert.equal(game.drainEvents().filter(e=>e.type==='tree').length,1);assert.equal(game.beginAttack(),false);assert.equal(game.kills,0);
});
