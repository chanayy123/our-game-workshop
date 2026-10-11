import {chromium} from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),url:process.env.SEA_URL??'http://127.0.0.1:4185/',checks:[],errors:[],samples:[],note:'Real keys perform docking, walking, chopping, collection, repairs and return. QA sets damaged-boat and cage-threat scenarios and accelerates voyage/AI waits.'};
page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
const state=()=>page.evaluate(()=>window.__sea.snapshot());
const check=(label,condition)=>{assert.ok(condition,label);report.checks.push(label);console.log('PASS',label);};
const hold=async(k,ms)=>{await page.keyboard.down(k);await page.waitForTimeout(ms);await page.keyboard.up(k);};
const snap=async(name)=>{await page.screenshot({path:`qa/v2-${name}.png`});const s=await state();report.samples.push({name,...s});return s;};
try{
 await page.goto(`${report.url}?qa=1`);await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);
 await snap('intro');await page.locator('#start').click();await page.keyboard.press('b');check('B cannot teleport to a distant island',(await state()).mode==='helm');
 await page.evaluate(()=>{const q=window.__sea;q.setBoat(0,600);q.step(75);});
 check('natural shark attacks damage the exposed boat',(await state()).hull<100);await snap('boat-attacked');
 await page.evaluate(()=>{const q=window.__sea;q.game.damage(100,'boat');q.game.heading=0;q.setBoat(-25,190);q.game.throttle=0;});
 await hold('w',4000);let s=await state();check('destroyed boat stays playable with slow emergency paddling',s.phase==='playing'&&s.speed>.8&&s.speed<2.7&&s.z>191);await snap('paddle');
 await page.evaluate(()=>{const q=window.__sea;q.setBoat(-25,220);q.game.speed=0;q.game.throttle=0;});
 await page.keyboard.press('b');await page.waitForTimeout(800);s=await snap('shore');check('B docks and places player on island',s.mode==='shore'&&s.islandId===0);
 await page.keyboard.press('f');check('trees require taking an axe first',(await state()).trees[0].hits===0);
 await hold('r',1600);check('repairing without wood cannot restore hull',(await state()).hull===0);
 await page.keyboard.press('e');check('E takes the axe from dock tools',(await state()).hasAxe);
 await hold('w',1250);await snap('tree');
 for(let k=0;k<3;k++){await page.keyboard.press('f');await page.waitForTimeout(900);}
 s=await snap('felling');check('three real F presses fell a tree',s.trees[0].hits===3&&s.trees[0].felledAt>=0);
 await page.waitForTimeout(1500);await page.keyboard.press('e');s=await state();check('E collects four pieces of timber',s.wood===4&&s.trees[0].collected);
 await page.keyboard.press('e');check('collected tree cannot duplicate timber',(await state()).wood===4);
 await page.evaluate(()=>window.__sea.setView(Math.PI/2,0));await hold('w',1250);await hold('r',6000);
 s=await snap('repair');check('holding R spends timber and restores destroyed hull',s.hull===100&&s.wood===0&&s.repairs===4);
 await page.keyboard.press('b');check('B returns from island to physical deck',(await state()).mode==='deck');
 await hold('w',1150);await page.keyboard.press('e');check('walking to helm resumes navigation',(await state()).mode==='helm');
 await hold('w',3500);check('repaired boat regains engine power',(await state()).speed>3);
 await page.evaluate(()=>{const q=window.__sea,g=q.game;g.heading=Math.atan2(-g.x,1800-g.z);g.rudder=0;q.step(180);});
 check('repaired voyage reaches the lighthouse',(await state()).phase==='won');await snap('repaired-arrival');
 await page.locator('#restart').click();s=await state();check('restart restores trees and resets tools and repairs',!s.hasAxe&&s.wood===0&&s.repairs===0&&s.trees.every(t=>t.hits===0&&!t.collected));
 await page.evaluate(()=>{const q=window.__sea;q.setBoat(0,600);q.game.mode='cage';q.game.depth=16;q.step(12);q.game.cageHealth=18;q.sharks.debugThreatNearCage();q.aimAt(0);q.step(.7);});
 await snap('white-shark');
 await page.evaluate(()=>{const q=window.__sea;for(let i=0;i<40&&q.game.mode!=='dragged';i++)q.step(.5);});
 s=await state();check('actual AI impact breaks cage and begins grab',s.cageHealth===0&&s.mode==='dragged'&&s.phase==='playing');
 await page.evaluate(()=>window.__sea.step(1.5));const grab=await snap('drag');
 await page.keyboard.press('e');await page.keyboard.press('b');check('broken cage cannot be escaped by interaction',(await state()).mode==='dragged');
 await page.keyboard.press('Escape');const paused=await state();await page.waitForTimeout(300);check('pause freezes the deep-sea dragging sequence',(await state()).dragTime===paused.dragTime);await page.locator('#resume').click();
 await page.evaluate(()=>window.__sea.step(2));const deep=await snap('drag-deep');check('drag physically moves camera deeper',deep.camera[1]<grab.camera[1]-9);
 await page.evaluate(()=>window.__sea.step(4));s=await snap('death');check('drag ends in explicit restartable failure',s.phase==='lost'&&await page.locator('#modal').isVisible());
 await page.locator('#restart').click();s=await state();check('death restart restores cage and clears dragging',s.phase==='playing'&&s.cageHealth===100&&s.dragTime===0&&s.mode==='helm');
 check('no runtime or shader errors',report.errors.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=e.stack;await page.screenshot({path:'qa/v2-failure.png'});throw e;}
finally{fs.writeFileSync('qa/upgrade-report.json',JSON.stringify(report,null,2));await browser.close();}
