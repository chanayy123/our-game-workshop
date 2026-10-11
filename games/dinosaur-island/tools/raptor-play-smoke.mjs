import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'}),page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),errors:[],checks:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
const state=()=>page.evaluate(()=>window.__islandDebug());
const check=(name,value)=>{assert.ok(value,name);report.checks.push(name);console.log('PASS '+name);};
try{
 await page.goto('http://127.0.0.1:5182/?qa=1');await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});await page.locator('#intro-species').selectOption('raptor');await page.locator('#start').click();
 await page.evaluate(()=>window.__islandTest.scenario('hunt'));await page.keyboard.press('Space');await page.waitForTimeout(450);check('playable raptor uses its bite animation',(await state()).pose.animation==='Bite_01');await page.waitForFunction(()=>window.__islandDebug().survival.kills===1);await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle');
 await page.keyboard.press('e');await page.waitForTimeout(650);check('playable raptor uses its feeding animation',(await state()).pose.animation==='Eat Prey');await page.screenshot({path:'qa/v04-raptor-feeding.png'});await page.waitForFunction(()=>window.__islandDebug().survival.meals===1);check('raptor can hunt and consume a real prey',(await state()).survival.hunger>85);
 await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle');await page.mouse.move(820,430);await page.mouse.down();await page.mouse.move(1160,430,{steps:12});await page.mouse.up();await page.keyboard.press('r');await page.waitForTimeout(1500);await page.screenshot({path:'qa/v04-raptor-side.png'});await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle');
 await page.keyboard.press('Escape');await page.locator('#player-species').selectOption('trex');await page.locator('#resume').click();const tree=await page.evaluate(()=>window.__islandTest.scenario('tree'));
 await page.mouse.move(820,430);await page.mouse.down();await page.mouse.move(1060,430,{steps:12});await page.mouse.up();await page.waitForTimeout(300);await page.screenshot({path:'qa/v04-tree-standing-clear.png'});
 await page.keyboard.press('Space');await page.waitForTimeout(1700);check('near-shore tree falls with rendered parts',(await state()).trees.matrices.some(t=>t.id===tree.id&&t.parts>=2));await page.screenshot({path:'qa/v04-tree-fallen-clear.png'});
 check('no browser errors',report.errors.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=String(e);process.exitCode=1;await page.screenshot({path:'qa/v04-raptor-failure.png'});}
finally{fs.writeFileSync('qa/v04-raptor-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
