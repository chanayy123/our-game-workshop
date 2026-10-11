import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer, prefix } from '../../../scripts/serve.mjs';

const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{}),
  args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const report={date:new Date().toISOString(),checks:[],errors:[],note:'Production site, read-only diagnostics, keyboard input and tablet touch taps/pointer holds. No real tablet GPU acceptance.'};
fs.mkdirSync('qa',{recursive:true});
const check=(name,ok)=>{assert.ok(ok,name);report.checks.push(name);console.log('PASS '+name);};
const state=page=>page.evaluate(()=>window.__islandDebug());
const flyer=s=>s.wildlife.find(c=>c.id==='pterosaur-0');
async function load(page){
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  page.on('requestfailed',r=>report.errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.url()}: ${r.status()}`);});
  await page.goto(`http://127.0.0.1:${server.address().port}${prefix}`);
  await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:120000});
  await page.locator('#settings').click();await page.locator('#quality').selectOption('balanced');await page.locator('#resume').click();
}
try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});await load(page);
  const intro=await state(page);
  check('one pterosaur added alongside all 17 existing residents',intro.survival.creatures.length===18&&intro.survival.creatures.filter(c=>c.kind==='pterosaur').length===1);
  check('production excludes writable QA hooks',await page.evaluate(()=>typeof window.__islandTest==='undefined'));
  check('pterosaur visible above coast with Flight animation',flyer(intro).visible&&flyer(intro).position[1]>16&&flyer(intro).animation==='Flight');
  await page.locator('#start').click();
  await page.waitForFunction(()=>window.__islandDebug().wildlife.find(c=>c.id==='pterosaur-0').wingAngles.some(a=>Math.abs(a)>.15));
  const before=await state(page);
  await page.waitForFunction(initial=>{
    const current=window.__islandDebug().wildlife.find(c=>c.id==='pterosaur-0');
    return Math.hypot(current.position[0]-initial.position[0],current.position[2]-initial.position[2])>.1&&JSON.stringify(current.wingAngles)!==JSON.stringify(initial.wingAngles);
  },flyer(before),{timeout:60000});
  const after=await state(page);
  check('pterosaur moves and beats its membrane wings',Math.hypot(flyer(after).position[0]-flyer(before).position[0],flyer(after).position[2]-flyer(before).position[2])>.1&&JSON.stringify(flyer(after).wingAngles)!==JSON.stringify(flyer(before).wingAngles));
  // Look up using the existing camera controls to inspect the actual flying model.
  await page.mouse.move(760,430);await page.mouse.down();await page.mouse.move(760,230,{steps:4});await page.mouse.up();
  await page.waitForFunction(y=>Math.abs(window.__islandDebug().camera[1]-y)>.5,after.camera[1],{timeout:60000});
  await page.screenshot({path:'qa/pterosaur-coast.png'});
  await page.keyboard.down('w');
  try{await page.waitForFunction(p=>Math.hypot(...window.__islandDebug().position.map((n,i)=>n-p[i]))>.2,after.position,{timeout:20000});}finally{await page.keyboard.up('w');}
  check('keyboard movement still works',true);
  await page.keyboard.press('Escape');const paused=await state(page);await page.waitForTimeout(700);
  check('pause freezes wing pose, altitude and flight route',JSON.stringify(flyer(paused))===JSON.stringify(flyer(await state(page))));
  await page.locator('#reset').click();
  await page.waitForFunction(initial=>{
    const current=window.__islandDebug().wildlife.find(c=>c.id==='pterosaur-0');
    return Math.hypot(current.position[0]-initial.position[0],current.position[2]-initial.position[2])<1;
  },flyer(intro),{timeout:60000});
  await page.keyboard.press('Escape');
  const reset=await state(page);
  check('restart restores exactly one pterosaur near its initial route',reset.survival.creatures.filter(c=>c.kind==='pterosaur').length===1&&Math.hypot(flyer(reset).position[0]-flyer(intro).position[0],flyer(reset).position[2]-flyer(intro).position[2])<1);
  await page.locator('#player-species').selectOption('raptor');await page.locator('#resume').click();
  check('existing raptor form still selectable',(await state(page)).playerKind==='raptor');await page.close();

  const tablet=await browser.newPage({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});await load(tablet);
  await tablet.locator('#start').tap();await tablet.getByRole('button',{name:'切换奔跑',exact:true}).tap();
  const start=await state(tablet),box=await tablet.getByRole('button',{name:'向前移动',exact:true}).boundingBox();
  await tablet.mouse.move(box.x+box.width/2,box.y+box.height/2);await tablet.mouse.down();
  try{await tablet.waitForFunction(p=>Math.hypot(...window.__islandDebug().position.map((n,i)=>n-p[i]))>1,start.position,{timeout:20000});}finally{await tablet.mouse.up();}
  check('tablet touch taps and pointer hold still run the player',true);
  await tablet.waitForFunction(()=>window.__islandDebug().motion.action==='idle');
  check('releasing tablet direction stops movement',true);
  await tablet.locator('#roar-button').tap();await tablet.waitForFunction(()=>window.__islandDebug().motion.action==='roar');
  check('tablet roar still plays',true);
  await tablet.screenshot({path:'qa/pterosaur-tablet-landscape.png'});
  await tablet.setViewportSize({width:768,height:1024});
  check('tablet portrait retains controls without overflow',await tablet.locator('#touch-pad').isVisible()&&await tablet.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await tablet.screenshot({path:'qa/pterosaur-tablet-portrait.png'});
  check('no browser, resource or game errors',report.errors.length===0&&(await state(tablet)).errors.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=String(e);process.exitCode=1;console.error(e);}
finally{fs.writeFileSync('qa/pterosaur-browser-report.json',JSON.stringify(report,null,2));await browser.close();await new Promise(resolve=>server.close(resolve));console.log(JSON.stringify(report));}
