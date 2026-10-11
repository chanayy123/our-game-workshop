import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const baseURL=process.env.SEA_URL??'http://127.0.0.1:5185/';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
const report={date:new Date().toISOString(),url:baseURL,browser:await browser.version(),checks:[],errors:[],failedRequests:[],samples:[],note:'Real keyboard/mouse inputs control gameplay. QA hooks set up combat, event capture, terminal failure and accelerate voyage waits; these are labelled below.'};
fs.mkdirSync('qa',{recursive:true});
page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
page.on('requestfailed',r=>report.failedRequests.push(r.url()));
const state=()=>page.evaluate(()=>window.__sea.snapshot());
const check=(label,test)=>{assert.ok(test,label);report.checks.push(label);console.log(`PASS ${label}`);};
const hold=async(key,ms)=>{await page.keyboard.down(key);await page.waitForTimeout(ms);await page.keyboard.up(key);};
const snap=async(label)=>{const s=await state();report.samples.push({label,...s});await page.screenshot({path:`qa/${label}.png`});return s;};
try{
 await page.goto(`${baseURL}?qa=1`);await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);await page.waitForTimeout(900);
 check('initial menu and 3D ocean render',await page.locator('#intro').isVisible());await snap('01-intro');
 await page.getByRole('button',{name:'启航',exact:false}).click();
 check('start enters helm', (await state()).mode==='helm'&&(await state()).phase==='playing');
 await hold('w',4000);let s=await state();check('real W input opens throttle and moves boat',s.speed>6&&s.z>9);
 const before=s;await hold('a',900);s=await state();check('steering has heading and rudder response',s.heading>before.heading+.04);
 await hold('d',900);await snap('02-sailing');
 await page.keyboard.press('v');await page.waitForTimeout(1000);await snap('03-helm');
 check('first person helm is human scale',(await state()).camera[1]<3.5);
 await page.keyboard.press('v');
 await page.keyboard.press('Escape');const paused=await state();await hold('w',500);s=await state();check('pause freezes real simulation',s.phase==='paused'&&s.elapsed===paused.elapsed&&s.z===paused.z);
 await page.getByRole('button',{name:'继续航程'}).click();
 await page.keyboard.press('e');check('leaving moving helm first drops throttle',(await state()).throttle===0&&(await state()).mode==='helm');
 await page.waitForFunction(()=>window.__sea.snapshot().speed<1.2,null,{timeout:6000});await page.keyboard.press('e');
 check('stopped boat can enter physical deck',(await state()).mode==='deck');await page.waitForTimeout(700);await snap('04-deck');
 await hold('w',950);await page.keyboard.press('e');s=await state();check('walking to stern cage and E enters cage',s.mode==='cage');
 await hold('w',6500);s=await snap('05-underwater');check('real cage descent moves camera underwater',s.depth>14&&s.camera[1]<-10);
 check('cage HUD presents weapons and no oxygen timer',await page.locator('#weapon-status').isVisible()&&!(await page.locator('#hud').innerText()).includes('氧气'));
 const depth=s.depth;await page.waitForTimeout(1300);check('releasing controls holds depth',Math.abs((await state()).depth-depth)<.001);
 await page.evaluate(()=>{window.__sea.sharks.debugThreatNearCage();window.__sea.aimAt(0);});await page.waitForTimeout(300);
 await snap('06-encounter');await page.mouse.click(720,450);s=await state();
 check('real mouse shot consumes ammo and hits aimed shark',s.ammo===4&&s.stats.hits>=1&&s.sharks.some(a=>a.health<100&&a.state==='flee'));
 await snap('07-hit');await page.keyboard.press('r');check('R starts timed reload',(await state()).reload>2);await page.waitForTimeout(2700);check('reload restores spears',(await state()).ammo===5);
 await page.keyboard.press('2');check('knife can be equipped',(await state()).weapon==='knife');
 // Scenario positioning only: same live AI warning/rush then keyboard melee.
 await page.evaluate(()=>{window.__sea.sharks.debugThreatNearCage();window.__sea.aimAt(0);});
 await page.waitForTimeout(80);await page.evaluate(()=>window.__sea.aimAt(0));await page.waitForTimeout(80);
 const hits=(await state()).stats.hits;await page.keyboard.press('f');await snap('08-knife');
 check('F performs close range knife attack',(await state()).stats.hits>hits);
 await page.keyboard.press('e');check('submerged cage cannot be exited',(await state()).mode==='cage');
 await hold('s',7300);s=await state();check('real S input raises cage to surface',s.depth===0);await snap('09-surface');
 await page.keyboard.press('e');check('surface E returns to deck',(await state()).mode==='deck');
 await hold('w',1300);await page.keyboard.press('e');check('walk to helm resumes driving',(await state()).mode==='helm');
 await hold('w',3100);
 // Time acceleration only; no teleport to finish. Vessel and AI simulate every frame.
 await page.evaluate(()=>window.__sea.step(28));s=await state();check('voyage reaches dangerous open sea',s.progress>.13);
 if(!s.stats.breaches){await page.evaluate(()=>window.__sea.step(5));}
 check('natural route event triggers a breach',(await state()).stats.breaches>=1);
 await page.evaluate(()=>{window.__sea.sharks.debugForceBreach();window.__sea.step(1.8);});await snap('10-breach');
 check('breaching shark rises clear above ocean',(await state()).sharks.some(a=>a.state==='breach'&&a.position[1]>4));
 await page.evaluate(()=>window.__sea.step(4));check('breach re-enters and resumes swimming',!(await state()).sharks.some(a=>a.state==='breach'));
 // Straighten slight manual steering to keep an exact finish course, then sail full remaining distance.
 await page.evaluate(()=>{const g=window.__sea.game;g.heading=Math.atan2(-g.x,1800-g.z);g.rudder=0;window.__sea.step(150);});s=await snap('11-complete');
 check('complete simulated voyage arrives at lighthouse',s.phase==='won'&&s.remaining<65&&await page.locator('#modal-title').innerText().then(t=>t.includes('穿过')));
 await page.getByRole('button',{name:'再次启航'}).click();check('victory restart restores a new voyage',(await state()).phase==='playing'&&(await state()).hull===100&&(await state()).z<1);
 await page.evaluate(()=>{const q=window.__sea;q.game.mode='cage';q.game.depth=15;q.game.damage(100,'cage');q.step(6.1);});await page.waitForTimeout(100);s=await snap('12-failure');
 check('actual damage path leads to explicit failure',s.phase==='lost'&&await page.locator('#modal').isVisible());
 await page.getByRole('button',{name:'再次启航'}).click();s=await state();check('death restart clears damage and stats',s.phase==='playing'&&s.hull===100&&s.cageHealth===100&&s.stats.hits===0&&s.stats.breaches===0);
 await page.getByRole('button',{name:'操作指南'}).click();check('in-game guide pauses and explains all modes',(await state()).phase==='paused'&&await page.locator('#guide').innerText().then(t=>t.includes('木材')&&t.includes('下潜')&&t.includes('装填')&&t.includes('伐木')));
 await page.setViewportSize({width:960,height:640});await snap('13-compact-guide');check('compact viewport keeps modal within screen',await page.locator('.modal-card').boundingBox().then(b=>b.x>=0&&b.y>=0&&b.x+b.width<=961&&b.y+b.height<=641));
 await page.reload();await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);
 await page.locator('#help').click();await page.locator('#resume').click();check('intro help returns to the main menu',await page.locator('#intro').isVisible());
 await page.locator('#help').click();await page.locator('#restart').click();await page.keyboard.press('Escape');
 check('starting from the guide restores the correct pause action',await page.locator('#resume').innerText().then(t=>t.includes('继续航程')));
 await page.locator('#resume').click();await hold(' ',200);await hold('s',3000);s=await state();check('reverse input raises anchor and moves backward',s.z< -1&&s.speed< -1);
 check('no runtime or shader errors',report.errors.length===0);check('no failed network requests',report.failedRequests.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=e.stack;await page.screenshot({path:'qa/failure.png'});throw e;}finally{fs.writeFileSync('qa/browser-report.json',JSON.stringify(report,null,2));await browser.close();}


