import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
const report={date:new Date().toISOString(),checks:[],errors:[],samples:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
const state=()=>page.evaluate(()=>window.__islandDebug());
const check=(name,value)=>{assert.ok(value,name);report.checks.push(name);console.log('PASS '+name);};
const seed=name=>page.evaluate(n=>window.__islandTest.scenario(n),name);
async function capture(name){await page.screenshot({path:`qa/v02-${name}.png`});report.samples.push({name,...await state()});}
try{
  await page.goto('http://127.0.0.1:5182/?qa=1');await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});
  await page.locator('#start').click();await page.waitForTimeout(500);
  const initial=await state();check('7 species and 18 island residents loaded',new Set(initial.survival.creatures.map(c=>c.kind)).size===7&&initial.survival.creatures.length===18);
  await page.waitForTimeout(6000);const later=await state();check('wildlife move without player input',later.survival.creatures.some((c,i)=>Math.hypot(c.x-initial.survival.creatures[i].x,c.z-initial.survival.creatures[i].z)>1));
  await seed('hunt');await page.keyboard.press('Space');await page.waitForFunction(()=>window.__islandDebug().survival.kills===1,null,{timeout:3000});await page.waitForTimeout(1300);
  check('Space kills a nearby fleeing animal',(await state()).survival.kills===1);await capture('hunt');
  const beforeMeal=(await state()).survival.hunger;await page.keyboard.press('e');await page.waitForFunction(()=>window.__islandDebug().survival.meals===1,null,{timeout:6000});
  check('E consumes the carcass and restores food',(await state()).survival.hunger>beforeMeal+35);await capture('fed');
  await seed('river');await page.waitForTimeout(300);await page.keyboard.down('w');await page.keyboard.down('Shift');await page.waitForTimeout(800);
  const river=await state();await page.keyboard.up('w');await page.keyboard.up('Shift');check('river traversal works and slows running',river.motion.wading&&river.motion.speed>1&&river.motion.speed<6);await capture('river');
  // View the muzzle from the side, then verify both repetitions and return to neutral.
  await seed('hunt');await page.mouse.move(930,440);await page.mouse.down();await page.mouse.move(1280,420,{steps:20});await page.mouse.up();
  await page.keyboard.press('r');await page.waitForTimeout(1000);const roar=await state();check('roar raises head and opens the jaw widely',roar.pose.rigReady&&roar.pose.headLift>1&&roar.pose.jawOpening>.95);await capture('roar');
  await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle',null,{timeout:7000});await page.keyboard.press('r');await page.waitForTimeout(1000);check('second roar replays the wide-mouth pose',(await state()).pose.jawOpening>.95);
  await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle',null,{timeout:7000});check('roar returns to neutral',(await state()).pose.jawOpening===0);
  await seed('starve');await page.keyboard.press('Escape');const paused=await state();await page.waitForTimeout(1000);check('pause freezes hunger and health',(await state()).survival.health===paused.survival.health);
  await page.locator('#resume').click();await page.waitForFunction(()=>window.__islandDebug().phase==='dead',null,{timeout:4000});await page.waitForTimeout(1000);check('starvation produces a death screen',await page.locator('#death-screen').isVisible());await capture('death');
  await page.locator('#restart').click();const fresh=await state();check('restart restores life and prey population',fresh.phase==='playing'&&fresh.survival.hunger>99&&fresh.survival.health===100&&fresh.survival.kills===0);await capture('restart');
  check('no browser errors',report.errors.length===0);report.result='PASS';
}catch(error){report.result='FAIL';report.failure=String(error);console.error(error);await capture('failure');process.exitCode=1;}
finally{fs.writeFileSync('qa/survival-browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure}));await browser.close();}
