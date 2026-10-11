import test from 'node:test';
import assert from 'node:assert/strict';
import {Game, EMPTY_CONTROLS, DESTINATION, MAX_DEPTH, MAX_SPEED} from '../src/game.ts';
import type {Controls} from '../src/game.ts';

function advance(game:Game,seconds:number,controls:Partial<Controls>={}) {
  const input={...EMPTY_CONTROLS,...controls};
  for(let elapsed=0;elapsed<seconds-1e-8;elapsed+=.02) game.step(Math.min(.02,seconds-elapsed),input);
}
function underway() {const game=new Game();game.start();return game;}
function onDeck() {const game=underway();game.interact();assert.equal(game.mode,'deck');return game;}
function inCage() {
  const game=onDeck();
  advance(game,.5,{moveX:1});advance(game,.9,{moveZ:-1});
  assert.ok(game.nearCage);game.interact();assert.equal(game.mode,'cage');return game;
}

test('reverse throttle lifts anchor after an emergency stop',()=>{
  const game=underway();advance(game,.1,{brake:true});assert.equal(game.anchored,true);
  advance(game,3,{forward:-1});assert.equal(game.anchored,false);assert.ok(game.speed< -1);assert.ok(game.z< -1);
});

test('navigation has acceleration, retained throttle, braking inertia and speed-dependent steering',()=>{
  const game=underway();
  advance(game,1,{forward:1});const firstSpeed=game.speed;
  assert.ok(firstSpeed>0&&firstSpeed<MAX_SPEED*.2);
  advance(game,7,{forward:1});assert.ok(game.speed>firstSpeed*5&&game.speed<MAX_SPEED);
  const heldThrottle=game.throttle,heldSpeed=game.speed;
  advance(game,1);assert.equal(game.throttle,heldThrottle);assert.ok(game.speed>=heldSpeed);
  advance(game,2,{turn:1});assert.ok(game.heading>.1&&game.x>0);
  const movingSpeed=game.speed;game.step(.02,{...EMPTY_CONTROLS,brake:true});
  assert.ok(game.anchored&&game.speed>0&&game.speed<movingSpeed);
  advance(game,6);assert.equal(game.speed,0);
  const heading=game.heading;advance(game,1,{turn:1});assert.equal(game.heading,heading);
});

test('leaving a moving helm first drops anchor, then permits walking after slowing',()=>{
  const game=underway();advance(game,8,{forward:1});assert.ok(game.speed>1.2);
  game.interact();assert.equal(game.mode,'helm');assert.equal(game.anchored,true);assert.equal(game.throttle,0);
  game.interact();assert.equal(game.mode,'helm');
  advance(game,4);assert.ok(game.speed<1.2);game.interact();assert.equal(game.mode,'deck');
  const startX=game.x,startZ=game.z;advance(game,3);
  assert.ok(Math.hypot(game.x-startX,game.z-startZ)<.1,'anchored boat may coast only negligibly');
});

test('world boundaries hold under forward and reverse movement',()=>{
  const game=underway();
  game.x=899.9;game.heading=Math.PI/2;game.speed=MAX_SPEED;game.throttle=1;advance(game,1);
  assert.equal(game.x,900);
  game.x=-899.9;game.heading=-Math.PI/2;game.speed=MAX_SPEED;advance(game,1);assert.equal(game.x,-900);
  game.x=300;game.z=-99.9;game.heading=Math.PI;game.speed=MAX_SPEED;advance(game,1);assert.equal(game.z,-100);
  game.z=1999.9;game.heading=0;game.speed=MAX_SPEED;advance(game,1);assert.equal(game.z,2000);
  assert.equal(game.phase,'playing','being past destination latitude does not itself count as arrival');
});

test('one long frame is capped, preventing a navigation or depth teleport',()=>{
  const game=underway();game.speed=MAX_SPEED;game.throttle=1;
  game.step(50,{...EMPTY_CONTROLS,forward:1});assert.ok(game.z<1);assert.equal(game.elapsed,.05);
  const cage=inCage();cage.step(50,{...EMPTY_CONTROLS,dive:1});assert.ok(cage.depth<.2);
});

test('arrival requires entering the actual goal radius while at the helm',()=>{
  const game=underway();game.z=DESTINATION.z-DESTINATION.radius-1;advance(game,.1);assert.equal(game.phase,'playing');
  game.z=DESTINATION.z-DESTINATION.radius+1;advance(game,.1);assert.equal(game.phase,'won');assert.equal(game.throttle,0);
  const finished=game.snapshot();advance(game,20,{forward:1,turn:1});assert.deepEqual(game.snapshot(),finished);
  const deck=onDeck();deck.z=DESTINATION.z;advance(deck,.1);assert.equal(deck.phase,'playing');
  advance(deck,1.1,{moveZ:1});deck.interact();assert.equal(deck.mode,'helm');advance(deck,.02);assert.equal(deck.phase,'won');
});

test('deck interaction requires walking to cage or helm, with bounded camera-relative motion',()=>{
  const game=onDeck();game.interact();assert.equal(game.mode,'deck');
  advance(game,8,{moveX:-1});assert.equal(game.deckX,-1.18);
  advance(game,8,{moveX:1});assert.equal(game.deckX,1.18);
  advance(game,8,{moveZ:-1});assert.equal(game.deckZ,-3.6);
  assert.ok(game.nearCage);game.interact();assert.equal(game.mode,'cage');
  game.interact();assert.equal(game.mode,'deck');assert.equal(game.deckZ,-2.2);
  advance(game,2,{moveZ:1});assert.ok(game.nearHelm);game.interact();assert.equal(game.mode,'helm');assert.equal(game.anchored,false);
  const turned=onDeck();advance(turned,.5,{moveZ:1,lookYaw:Math.PI/2});
  assert.ok(turned.deckX>.9);assert.ok(Math.abs(turned.deckZ+.4)<1e-8);
});

test('diagonal deck walking does not increase walking speed',()=>{
  const straight=onDeck(),diagonal=onDeck();advance(straight,.2,{moveZ:1});advance(diagonal,.2,{moveZ:1,moveX:1});
  assert.ok(Math.abs(Math.hypot(diagonal.deckX,diagonal.deckZ+.4)-(straight.deckZ+.4))<1e-8);
});

test('cage descent clamps to 38m, has no oxygen damage, and returns to deck only at surface',()=>{
  const game=inCage();advance(game,60,{dive:1});assert.equal(game.depth,MAX_DEPTH);assert.equal(game.stats.maxDepth,MAX_DEPTH);
  game.interact();assert.equal(game.mode,'cage');
  advance(game,900);assert.equal(game.cageHealth,100);assert.equal(game.hull,100);assert.equal(game.phase,'playing');assert.equal(game.depth,MAX_DEPTH);
  advance(game,60,{dive:-1});assert.equal(game.depth,0);game.interact();assert.equal(game.mode,'deck');
  advance(game,1.7,{moveZ:1});assert.ok(game.nearHelm);game.interact();assert.equal(game.mode,'helm');
  advance(game,3,{forward:1});assert.ok(game.speed>1&&game.z>0,'a completed dive must permit continued navigation');
});

test('weapon use is restricted to diving, spends ammunition and observes independent cooldowns',()=>{
  const game=underway();assert.equal(game.fire(),false);game.interact();assert.equal(game.fire(),false);
  game.deckX=1;game.deckZ=-2.2;game.interact();assert.equal(game.fire(),false);assert.equal(game.ammo,5);
  advance(game,1,{dive:1});assert.equal(game.fire(),true);assert.equal(game.ammo,4);assert.equal(game.fire(),false);
  advance(game,1.06);assert.equal(game.fire(),true);assert.equal(game.ammo,3);
  game.weapon='knife';assert.equal(game.fire(),false,'switching weapons cannot bypass cooldown');advance(game,1.06);
  assert.equal(game.fire(),true);assert.equal(game.ammo,3);advance(game,.66);assert.equal(game.fire(),true);assert.equal(game.ammo,3);
});

test('empty speargun starts reload, blocks attacks during reload, and refills unlimited reserve',()=>{
  const game=inCage();advance(game,1,{dive:1});
  for(let i=0;i<5;i++){assert.equal(game.fire(),true);advance(game,1.06);}
  assert.equal(game.ammo,0);assert.equal(game.fire(),false);assert.ok(game.reload>0);
  advance(game,1);assert.equal(game.ammo,0);assert.equal(game.fire(),false);
  advance(game,1.5);assert.equal(game.ammo,5);assert.equal(game.reload,0);assert.equal(game.fire(),true);
  game.reloadWeapon();const original=game.reload;advance(game,.3);game.reloadWeapon();assert.ok(game.reload<original,'repeated reload presses must not restart the timer');
});

test('pause freezes simulation, reload, interactions and incoming damage',()=>{
  const game=inCage();advance(game,3,{dive:1});assert.equal(game.fire(),true);game.reloadWeapon();game.damage(20,'cage');
  game.pause();assert.equal(game.phase,'paused');const frozen=game.snapshot();
  advance(game,10,{dive:1,moveX:1,forward:1,repair:true});game.damage(100,'boat');game.damage(100,'cage');game.interact();game.reloadWeapon();assert.equal(game.fire(),false);
  assert.deepEqual(game.snapshot(),frozen);
  game.pause();advance(game,2.5);assert.equal(game.ammo,5);assert.equal(game.cageHealth,80);assert.equal(game.phase,'playing');
});

test('destroyed hull retains emergency paddling and cannot finish until repaired',()=>{
  const boat=underway();boat.damage(50,'cage');assert.equal(boat.cageHealth,100);boat.damage(150,'boat');
  assert.equal(boat.hull,0);assert.equal(boat.phase,'playing');
  advance(boat,18,{forward:1});assert.ok(boat.speed>2.5&&boat.speed<=2.6&&boat.z>30);
  advance(boat,2,{turn:1});assert.ok(boat.heading>.1);
  boat.z=DESTINATION.z;boat.x=0;advance(boat,.1);assert.equal(boat.phase,'playing');
  boat.hull=25;advance(boat,.1);assert.equal(boat.phase,'won');
});

test('emergency paddling starts from rest at 60 and 144 Hz',()=>{
  for(const hz of [60,144]){
    const g=underway();g.damage(100,'boat');
    for(let n=0;n<hz*8;n++)g.step(1/hz,{...EMPTY_CONTROLS,forward:1});
    assert.ok(g.speed>2&&g.z>10,`paddle acceleration cannot be rounded to zero at ${hz} Hz`);
  }
});

test('broken cage locks control, descends for six seconds, pauses, then fails and resets',()=>{
  const cage=inCage();advance(cage,5,{dive:1});cage.fire();cage.registerHit(true);cage.stats.breaches=2;cage.damage(120,'cage');
  assert.equal(cage.phase,'playing');assert.equal(cage.mode,'dragged');assert.equal(cage.cageHealth,0);
  assert.equal(cage.fire(),false);cage.interact();cage.dock();assert.equal(cage.mode,'dragged');
  advance(cage,3,{dive:-1,repair:true});assert.equal(cage.phase,'playing');assert.ok(cage.dragTime>2.99);
  cage.pause();const frozen=cage.snapshot();advance(cage,10);assert.deepEqual(cage.snapshot(),frozen);cage.pause();
  advance(cage,3.1);assert.equal(cage.phase,'lost');assert.ok(cage.reason.length>0);
  cage.start();assert.deepEqual(cage.snapshot(),underway().snapshot());
  cage.reset();assert.equal(cage.phase,'ready');assert.equal(cage.fire(),false);cage.damage(100,'boat');assert.equal(cage.hull,100);
});

test('wood repairs consume supplies at work intervals and cannot repair from the helm or cage',()=>{
  const game=underway();game.hull=65;game.cageHealth=30;game.wood=5;
  advance(game,3,{repair:true});assert.equal(game.hull,65);assert.equal(game.wood,5);
  game.interact();advance(game,1.5,{repair:true});assert.equal(game.hull,90);assert.equal(game.cageHealth,48);assert.equal(game.wood,4);
  advance(game,10,{repair:true});assert.equal(game.hull,100);assert.equal(game.cageHealth,100);assert.equal(game.wood,1);
  game.deckX=1;game.deckZ=-2.2;game.interact();game.damage(20,'cage');advance(game,10,{repair:true});assert.equal(game.cageHealth,80);assert.equal(game.wood,1);
  game.mode='deck';game.wood=0;game.hull=0;advance(game,50,{repair:true});assert.equal(game.hull,0,'no free repairs');
});

test('island loop requires landing, axe, three timed chops, pickup, repair and return to boat',()=>{
  const g=underway();g.hull=0;g.dock();assert.equal(g.mode,'helm','cannot teleport to distant island');
  g.x=-25;g.z=220;g.speed=3;g.dock();assert.equal(g.mode,'helm');assert.equal(g.anchored,true);
  advance(g,4);g.dock();assert.equal(g.mode,'shore');assert.equal(g.islandId,0);
  assert.equal(g.chop(),false,'axe is required');g.interact();assert.equal(g.hasAxe,true);
  const t=g.nearbyTree!;g.shoreX=t.x+1.8;g.shoreZ=t.z;
  for(let k=0;k<3;k++){assert.equal(g.chop(),true);assert.equal(g.chop(),false);advance(g,.82);}
  assert.equal(t.hits,3);g.interact();assert.equal(g.wood,0,'fall must finish before collection');
  advance(g,1.1);g.interact();assert.equal(g.wood,4);assert.equal(t.collected,true);g.interact();assert.equal(g.wood,4,'cannot collect twice');
  g.shoreX=-65;g.shoreZ=220;g.dock();assert.equal(g.mode,'shore','must walk back to landing');advance(g,6,{repair:true});assert.equal(g.hull,0,'cannot repair deep inland');
  g.shoreX=-44.9;g.shoreZ=220;advance(g,6,{repair:true});assert.equal(g.hull,100);assert.equal(g.wood,0);assert.equal(g.repairs,4);
  g.dock();assert.equal(g.mode,'deck');advance(g,1.1,{moveZ:1});g.interact();assert.equal(g.mode,'helm');advance(g,4,{forward:1});assert.ok(g.z>224);
  g.start();assert.equal(g.hasAxe,false);assert.equal(g.repairs,0);assert.ok(g.trees.every(t=>!t.collected&&t.hits===0));
});

test('islands have solid coasts, bounded walking and safe repairs ashore',()=>{
  const g=underway();g.x=-65;g.z=220;advance(g,.02);assert.ok(Math.hypot(g.x+65,g.z-220)>=36);
  g.x=-25;g.dock();g.damage(100,'boat');assert.equal(g.hull,100);
  advance(g,60,{moveX:1});assert.ok(Math.hypot(g.shoreX+65,g.shoreZ-220)<=24.001);
  g.mode='cage';g.dock();assert.equal(g.mode,'cage');
});

test('a full voyage can include a voluntary dive, defense, surface return and successful arrival',()=>{
  const game=underway();advance(game,27,{forward:1});assert.ok(game.z>240&&game.z<600);
  game.interact();advance(game,4);game.interact();assert.equal(game.mode,'deck');
  advance(game,.5,{moveX:1});advance(game,.9,{moveZ:-1});game.interact();assert.equal(game.mode,'cage');
  advance(game,5,{dive:1});assert.ok(game.depth>=12.9);assert.equal(game.fire(),true);game.registerHit(false);assert.equal(game.stats.hits,1);
  advance(game,6,{dive:-1});game.interact();assert.equal(game.mode,'deck');
  advance(game,2,{moveZ:1});game.interact();assert.equal(game.mode,'helm');
  advance(game,200,{forward:1});assert.equal(game.phase,'won');assert.ok(game.elapsed>120);assert.ok(game.stats.distance>1700);assert.ok(game.stats.maxDepth>12);
});
