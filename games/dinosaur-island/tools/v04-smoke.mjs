import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),checks:[],errors:[],samples:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.errors.push(r.url()+': '+r.failure()?.errorText));
const state=()=>page.evaluate(()=>window.__islandDebug());
const seed=name=>page.evaluate(name=>window.__islandTest.scenario(name),name);
const check=(name,ok)=>{assert.ok(ok,name);report.checks.push(name);console.log('PASS '+name);};
const shot=async name=>{await page.screenshot({path:`qa/v04-${name}.png`});report.samples.push({name,...await state()});};
const idle=()=>page.waitForFunction(()=>window.__islandDebug().motion.action==='idle',null,{timeout:10000});
const hold=async(key,ms)=>{await page.keyboard.down(key);await page.waitForTimeout(ms);await page.keyboard.up(key);};
try{
 await page.goto('http://127.0.0.1:5182/?qa=1');await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});
 await page.locator('#intro-species').selectOption('raptor');check('intro selector loads a distinct playable raptor',(await state()).playerKind==='raptor'&&(await state()).clips.includes('Sprint'));
 await page.locator('#start').click();await page.keyboard.down('Shift');await hold('w',700);await page.keyboard.up('Shift');const run=await state();check('raptor runs with its authored Sprint animation',run.motion.action==='run'&&run.pose.animation==='Sprint');await idle();
 await page.keyboard.press('r');await page.waitForTimeout(1000);check('raptor roar uses its own authored clip',(await state()).pose.animation==='Roar_01');await shot('raptor-roar');await idle();
 await page.locator('#change-form').click();const before=await state();await page.locator('#player-species').selectOption('trex');const after=await state();check('switch preserves health, hunger and world position',after.playerKind==='trex'&&after.survival.health===before.survival.health&&after.survival.hunger===before.survival.hunger&&Math.hypot(after.position[0]-before.position[0],after.position[2]-before.position[2])<.01);await page.locator('#resume').click();
 const tree=await seed('tree');await hold('w',1800);const blocked=await state();check('standing tree actually blocks movement',Math.hypot(blocked.position[0]-tree.x,blocked.position[2]-tree.z)>=tree.radius+1.2);await idle();await shot('tree-standing');
 await page.keyboard.press('Space');await page.waitForFunction(id=>window.__islandDebug().trees.fallen.some(t=>t.id===id),tree.id);await page.waitForTimeout(1400);const fallen=await state();check('attack removes collision and tips real trunk and leaves',fallen.trees.fallen.find(t=>t.id===tree.id)?.active===false&&fallen.trees.matrices.find(t=>t.id===tree.id)?.parts>=2&&Math.abs(fallen.trees.matrices.find(t=>t.id===tree.id).up[1])<.25);await shot('tree-fallen');
 await hold('w',1500);const crossed=await state();check('player can pass through the former tree obstacle',crossed.position[2]<tree.z-.2);await idle();
 await page.keyboard.press('Escape');const frozen=await state();await page.waitForTimeout(700);check('pause freezes tree regrowth timer',(await state()).trees.fallen[0].age===frozen.trees.fallen[0].age);await page.locator('#resume').click();
 await seed('combat');await page.keyboard.press('Space');await page.waitForTimeout(550);const threatened=await state();const rex=threatened.survival.creatures.find(c=>c.id==='rex-0');check('hit damages rex and starts its real bite animation',rex.health===135&&rex.windup>0&&threatened.wildlife.find(c=>c.id==='rex-0').animation==='bite');
 await page.keyboard.press('Escape');const paused=await state();await page.locator('#player-species').selectOption('raptor');check('combat blocks switching to evade damage',(await state()).playerKind==='trex');await page.waitForTimeout(400);check('pause freezes counterattack windup',(await state()).survival.creatures.find(c=>c.id==='rex-0').windup===paused.survival.creatures.find(c=>c.id==='rex-0').windup);await page.locator('#resume').click();
 await page.waitForFunction(()=>window.__islandDebug().survival.health<100);check('rex counterattack reduces real player health',(await state()).survival.health===82);await shot('counterattack');
 for(let i=0;i<3;i++){await idle();await page.keyboard.press('Space');await page.waitForTimeout(1350);}
 const defeated=await state();check('multiple hits defeat rex and leave an edible corpse',defeated.survival.creatures.find(c=>c.id==='rex-0').alive===false&&defeated.survival.kills===1);await shot('rex-defeated');
 for(let i=1;i<=3;i++){await idle();await page.keyboard.press('e');await page.waitForFunction(n=>window.__islandDebug().survival.meals===n,i,{timeout:7000});if(i===1){check('rex meal restores more food and leaves additional portions',(await state()).survival.hunger>90&&(await state()).survival.creatures.find(c=>c.id==='rex-0').portions===2);await shot('rex-meal');}}
 check('three meals consume the corpse without infinite food',(await state()).survival.creatures.find(c=>c.id==='rex-0').active===false);await idle();
 // Wait real gameplay time for the tree; no accelerated clock or lifespan mutation.
 for(let i=0;i<6&&(await state()).trees.fallen.some(t=>t.id===tree.id);i++){console.log('WAIT tree lifespan '+Math.round((await state()).trees.fallen.find(t=>t.id===tree.id).age)+' / 60');await page.waitForTimeout(10000);}
 check('tree regrows after 60 actual gameplay seconds',(await state()).trees.fallen.every(t=>t.id!==tree.id));
 await seed('combat-death');await page.keyboard.press('Space');await page.waitForFunction(()=>window.__islandDebug().phase==='dead',null,{timeout:7000});check('combat death has the correct screen',await page.locator('#death-title').textContent()==='倒在巨兽的反击下');await shot('combat-death');
 await page.locator('#restart').click();const reset=await state();check('restart restores trees, enemy health and player survival',reset.phase==='playing'&&reset.survival.health===100&&reset.survival.creatures.find(c=>c.id==='rex-0').health===180&&reset.trees.fallen.length===0);
 check('no runtime or asset errors',report.errors.length===0);report.result='PASS';
}catch(error){report.result='FAIL';report.failure=String(error);process.exitCode=1;await shot('failure');console.error(error);}
finally{fs.writeFileSync('qa/v04-browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure}));await browser.close();}
