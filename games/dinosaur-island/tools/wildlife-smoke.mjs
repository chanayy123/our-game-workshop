import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),checks:[],errors:[],samples:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
page.on('requestfailed',r=>report.errors.push(`${r.url()}: ${r.failure()?.errorText}`));
const state=()=>page.evaluate(()=>window.__islandDebug());
const seed=name=>page.evaluate(name=>window.__islandTest.scenario(name),name);
const check=(name,ok)=>{assert.ok(ok,name);report.checks.push(name);console.log('PASS '+name)};
async function shot(name){await page.screenshot({path:`qa/v03-${name}.png`});report.samples.push({name,...await state()});}
try{
  await page.goto('http://127.0.0.1:5182/?qa=1');await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});
  await page.locator('#start').click();await page.waitForTimeout(300);const initial=await state();
  check('six distinct species and 17 residents instantiate',new Set(initial.survival.creatures.map(c=>c.kind)).size===6&&initial.wildlife.length===17);
  check('new species have their own authored rigs and clips',initial.wildlife.find(c=>c.id==='raptor-0').clips.includes('Sprint')&&initial.wildlife.find(c=>c.id==='diplodocus-0').clips.includes('Walk')&&initial.wildlife.find(c=>c.id==='crow-0').clips[0]==='Flight');
  check('T-rex uses physically plausible dielectric skin',Math.abs(initial.pose.skinIor-1.45)<.001&&initial.pose.roughness>.7);
  await page.waitForTimeout(1500);const breathing=await state();check('breathing deforms the chest bone',breathing.pose.breathingReady&&Math.abs(breathing.pose.chestScale-initial.pose.chestScale)>.001);
  check('birds actually move through air',breathing.wildlife.filter(c=>c.id.startsWith('crow')).every(c=>c.position[1]>10)&&Math.hypot(breathing.survival.creatures.at(-1).x-initial.survival.creatures.at(-1).x,breathing.survival.creatures.at(-1).z-initial.survival.creatures.at(-1).z)>1);
  await page.mouse.move(910,430);await page.mouse.down();await page.mouse.move(1250,430,{steps:16});await page.mouse.up();await page.waitForTimeout(400);await shot('trex');
  await page.keyboard.press('r');await page.waitForTimeout(1000);check('wide-mouth roar survives the skin and posture changes',(await state()).pose.jawOpening>1);await shot('roar');
  await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle');
  await seed('river');await page.waitForTimeout(1800);const wet=await state();check('entering water produces wet skin',wet.pose.wetness>.9&&wet.pose.roughness<.65);await shot('wet');
  await seed('hunt');await page.waitForTimeout(1800);check('wet skin gradually dries on land',(await state()).pose.wetness<wet.pose.wetness-.1);
  await seed('hunt-raptor');await page.keyboard.press('Space');await page.waitForFunction(()=>window.__islandDebug().survival.kills===1,null,{timeout:4000});await page.waitForTimeout(1400);
  check('a new raptor species can be hunted',!(await state()).survival.creatures.find(c=>c.id==='raptor-0').alive);
  const food=(await state()).survival.hunger;await page.keyboard.press('e');await page.waitForFunction(()=>window.__islandDebug().survival.meals===1,null,{timeout:6000});check('raptor feeding restores food',(await state()).survival.hunger>food+35);await shot('raptor-fed');
  await page.keyboard.press('Escape');const paused=await state();await page.waitForTimeout(500);const still=await state();check('pause freezes all animal and survival timelines',JSON.stringify(paused.wildlife)===JSON.stringify(still.wildlife)&&paused.survival.hunger===still.survival.hunger);
  await page.locator('#reset').click();const fresh=await state();check('restart restores every species',fresh.survival.creatures.every(c=>c.alive&&c.active)&&fresh.survival.kills===0);
  for(const kind of ['raptor','diplodocus','rhino']){
    // Reset between portraits so different species do not share the same QA location.
    await page.keyboard.press('Escape');await page.locator('#reset').click();
    await seed('species:'+kind);await page.waitForTimeout(800);await shot(kind);
  }
  check('no browser or asset errors',report.errors.length===0);report.result='PASS';
}catch(error){report.result='FAIL';report.failure=String(error);process.exitCode=1;await shot('failure');console.error(error);}
finally{fs.writeFileSync('qa/wildlife-browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure}));await browser.close();}
