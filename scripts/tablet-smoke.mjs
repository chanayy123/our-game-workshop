import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer,prefix} from './serve.mjs';
const root=path.resolve(import.meta.dirname,'..');
const games=JSON.parse(fs.readFileSync(path.join(root,'games.json'),'utf8'));
const ids=process.argv.slice(2);const selected=ids.length?games.filter(g=>ids.includes(g.id)):games;
for(const id of ids)assert(games.some(g=>g.id===id),`Unknown game ${id}`);
const report={date:new Date().toISOString(),checks:[],errors:[],samples:[],note:'Chromium touch emulation, CDP multi-touch and real screen taps. QA URLs are used only to read existing snapshots; no gameplay mutation hooks. Not real iPad/Safari/GPU proof.'};
fs.mkdirSync(path.join(root,'qa'),{recursive:true});
const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=process.env.WORKSHOP_URL??`http://127.0.0.1:${server.address().port}${prefix}`;
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']})});
const selectors={
 'pelican-pedal':{move:'#touch-left',buttons:'.pelican-touch button'},
 'dinosaur-island':{move:'[data-direction=forward]',buttons:'#touch-pad button,.controls button,#change-form'},
 'riverkeeper':{move:'[data-move=KeyW]',buttons:'.touch-pad button,.tablet-actions button,[data-tool]'},
 'midnight-masquerade':{move:'[data-dir=up]',buttons:'.touch button,.actions button,#begin-search'},
 'shark-sea-survival':{move:'.sea-pad [data-touch-key=w]',buttons:'.sea-pad button,.sea-actions button,#interact,#dock'},
 sandjaw:{move:'[data-move=w]',buttons:'.touch-move button,.keys button'}
};
const check=(name,value)=>{assert.ok(value,name);report.checks.push(name);console.log('PASS '+name);};
const state=id=>{
 if(id==='pelican-pedal')return window.__pelicanQA.snapshot();
 if(id==='dinosaur-island')return window.__islandDebug();
 if(id==='riverkeeper')return window.__riverTest.snapshot();
 if(id==='midnight-masquerade')return window.__game.snapshot();
 if(id==='shark-sea-survival')return window.__sea.snapshot();
 return window.__sandjaw.snapshot();
};
const coords=(id,s)=>id==='dinosaur-island'?[s.position[0],s.position[2]]:id==='riverkeeper'||id==='midnight-masquerade'?[s.player.x,s.player.z]:[s.x,s.z];
async function center(page,selector){const r=await page.locator(selector).boundingBox();assert(r,selector);return {x:r.x+r.width/2,y:r.y+r.height/2};}
async function geometry(page,game,view){const results=await page.locator(selectors[game.id].buttons).evaluateAll(buttons=>buttons.filter(b=>b.getClientRects().length&&!b.disabled).map(b=>{const r=b.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {text:b.textContent.trim(),visible:r.x>=0&&r.y>=0&&r.right<=innerWidth+.5&&r.bottom<=innerHeight+.5,size:r.width>=43&&r.height>=43,hit:hit?.closest('button')===b};}));report.samples.push({game:game.id,view,buttons:results});check(`${game.id}: ${view} controls visible, sized and unobstructed`,results.length>=4&&results.every(b=>b.visible&&b.size&&b.hit));}
let page;
try{
 for(const game of selected){
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:false,deviceScaleFactor:1});
  page=await context.newPage();page.on('pageerror',e=>report.errors.push({game:game.id,error:e.message}));page.on('requestfailed',r=>report.errors.push({game:game.id,url:r.url(),error:r.failure()?.errorText}));page.on('response',r=>{if(r.status()>=400)report.errors.push({game:game.id,url:r.url(),status:r.status()});});
  // Preserve real tap/actionability checks while software WebGL settles in CI.
  page.setDefaultTimeout(120000);
  await page.goto(new URL((game.path||'./')+'?qa=1',base).href,{waitUntil:'domcontentloaded',timeout:120000});
  await page.waitForFunction(()=>document.querySelector('#start')&&!document.querySelector('#start').disabled&&document.querySelector('canvas'),null,{timeout:120000});
  check(`${game.id}: tablet detects touch without phone width`,await page.evaluate(()=>navigator.maxTouchPoints>0&&document.body.dataset.touchControls==='on'));
  if(game.id==='dinosaur-island'){await page.locator('#settings').tap();await page.locator('#quality').selectOption('balanced');await page.locator('#dialog-close').tap();}
  await page.locator('#start').tap();
  if(game.id==='pelican-pedal')await page.waitForFunction(()=>window.__pelicanQA.snapshot().countdown<=0,null,{timeout:30000});
  await geometry(page,game,'landscape 1024x768');
  const session=await context.newCDPSession(page);let points=[];
  const touch=async(type,newPoints)=>{points=newPoints;await session.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({...p,radiusX:5,radiusY:5,force:1}))});};
  const before=await page.evaluate(state,game.id);
  if(game.id==='pelican-pedal'){
   await page.locator('#touch-left').tap();check('pelican-pedal: touch changes lane',(await page.evaluate(state,game.id)).lane!==before.lane);
   await page.locator('#touch-jump').tap();await page.waitForFunction(()=>window.__pelicanQA.snapshot().jumpHeight>0,null,{timeout:15000});check('pelican-pedal: touch jumps',true);
   const at=await center(page,'#touch-brake');await touch('touchStart',[{id:1,...at}]);check('pelican-pedal: brake held',(await page.evaluate(state,game.id)).braking);await touch('touchEnd',[]);check('pelican-pedal: brake releases',!(await page.evaluate(state,game.id)).braking);
  }else{
   const at=await center(page,selectors[game.id].move);await touch('touchStart',[{id:1,...at}]);
   await page.waitForFunction(({id,before})=>{let s;if(id==='dinosaur-island'){s=window.__islandDebug();return Math.hypot(s.position[0]-before.position[0],s.position[2]-before.position[2])>.08;}if(id==='riverkeeper')s=window.__riverTest.snapshot();else if(id==='midnight-masquerade')s=window.__game.snapshot();else if(id==='shark-sea-survival')s=window.__sea.snapshot();else s=window.__sandjaw.snapshot();return id==='shark-sea-survival'?s.throttle>before.throttle+.05:Math.hypot((s.player?.x??s.x)-(before.player?.x??before.x),(s.player?.z??s.z)-(before.player?.z??before.z))>.08;},{id:game.id,before},{timeout:20000});
   check(`${game.id}: real held touch moves player or throttle`,true);
   if(game.id==='midnight-masquerade'||game.id==='sandjaw'){
    const sprint=game.id==='midnight-masquerade'?'[data-touch-key=ShiftLeft]':'[data-touch-key=shift]';const second=await center(page,sprint);
    await touch('touchStart',[{id:1,...at},{id:2,...second}]);check(`${game.id}: movement and sprint hold simultaneously`,await page.locator('.touch-held').count()===2);
    await touch('touchMove',[{id:1,...at}]);check(`${game.id}: releasing sprint keeps movement held`,await page.locator(selectors[game.id].move).evaluate(b=>b.classList.contains('touch-held')));
   }
   await touch('touchCancel',[]);check(`${game.id}: cancel clears held controls`,await page.locator('.touch-held,.pressed').count()===0);
   await page.waitForTimeout(500);const released=await page.evaluate(state,game.id);await page.waitForTimeout(500);const settled=await page.evaluate(state,game.id);
   check(`${game.id}: movement input stops after release`,game.id==='shark-sea-survival'?Math.abs(settled.throttle-released.throttle)<.03:Math.hypot(...coords(game.id,settled).map((n,i)=>n-coords(game.id,released)[i]))<.12);
  }
  if(game.id==='sandjaw'||game.id==='dinosaur-island'||game.id==='shark-sea-survival'){
   const canvas=page.locator('canvas').first();const r=await canvas.boundingBox();const at={id:3,x:r.x+r.width*.55,y:r.y+r.height*.47};const pre=await page.evaluate(state,game.id);
   await touch('touchStart',[at]);await touch('touchMove',[{...at,x:at.x+80,y:at.y+25}]);await touch('touchEnd',[]);await page.waitForTimeout(300);const post=await page.evaluate(state,game.id);
   check(`${game.id}: touch drag changes view`,game.id==='sandjaw'?Math.abs(post.heading-pre.heading)>.02:Math.hypot(...post.camera.map((n,i)=>n-pre.camera[i]))>.05);
  }
  if(game.id==='dinosaur-island'){
   await page.locator('#roar-button').tap();check('dinosaur-island: touch roar action',(await page.evaluate(state,game.id)).motion.action==='roar');
  }
  if(game.id==='riverkeeper'){
   const zoom=await page.evaluate(()=>window.__riverTest.world.camera.zoom);await page.locator('#zoom-in').tap();check('riverkeeper: touch zooms camera',await page.evaluate(z=>window.__riverTest.world.camera.zoom>z,zoom));await page.locator('#zoom-out').tap();
   await page.locator('[data-tool=rock]').tap();const edits=(await page.evaluate(state,game.id)).edits;
   const target=await page.evaluate(()=>{const {sim,expedition,world}=window.__riverTest;for(let i=0;i<sim.terrain.length;i++){const p=sim.coords(i);if(sim.protectedCells[i]||sim.rocks[i]||Math.hypot(p.x-expedition.player.x,p.z-expedition.player.z)>4)continue;const s=world.project(p.x,p.z);const hit=document.elementFromPoint(s.x,s.y);if(s.x>220&&s.x<innerWidth-280&&s.y>220&&s.y<innerHeight-240&&hit===world.renderer.domElement)return s;}return null;});assert(target,'river construction target');await page.touchscreen.tap(target.x,target.y);check('riverkeeper: touch builds on nearby ground',(await page.evaluate(state,game.id)).edits>edits);
  }
  if(game.id==='shark-sea-survival'){
   const stop=await center(page,'.sea-stop');await touch('touchStart',[{id:4,...stop}]);await page.waitForFunction(()=>window.__sea.snapshot().throttle===0);await touch('touchEnd',[]);
   await page.waitForFunction(()=>Math.abs(window.__sea.snapshot().speed)<1.2,null,{timeout:30000});await page.locator('#interact').tap();check('shark-sea-survival: touch leaves helm',(await page.evaluate(state,game.id)).mode==='deck');
   const forward=await center(page,'.sea-pad [data-touch-key=w]');await touch('touchStart',[{id:4,...forward}]);await page.waitForFunction(()=>window.__sea.snapshot().interact==='进入潜水笼',null,{timeout:30000});await touch('touchEnd',[]);
   await page.locator('#interact').tap();check('shark-sea-survival: touch enters cage',(await page.evaluate(state,game.id)).mode==='cage');
   await touch('touchStart',[{id:4,...forward}]);await page.waitForFunction(()=>window.__sea.snapshot().depth>1.15,null,{timeout:30000});await touch('touchEnd',[]);check('shark-sea-survival: held touch dives',true);
   await page.locator('#touch-fire').tap();check('shark-sea-survival: touch fires speargun',(await page.evaluate(state,game.id)).ammo===4);
   await page.locator('#touch-weapon').tap();check('shark-sea-survival: touch switches weapon',(await page.evaluate(state,game.id)).weapon==='knife');await page.locator('#touch-weapon').tap();
   const repair=await center(page,'#touch-repair');await touch('touchStart',[{id:4,...repair}]);check('shark-sea-survival: touch starts reload',(await page.evaluate(state,game.id)).reload>0);await touch('touchEnd',[]);await page.waitForFunction(()=>window.__sea.snapshot().ammo===5&&window.__sea.snapshot().reload===0,null,{timeout:120000});check('shark-sea-survival: reload completes',true);
   const pre=await page.evaluate(state,game.id);const at={id:4,x:560,y:320};await touch('touchStart',[at]);await touch('touchMove',[{...at,x:at.x+60}]);await touch('touchEnd',[]);await page.waitForTimeout(300);const post=await page.evaluate(state,game.id);check('shark-sea-survival: cage look does not fire',post.ammo===pre.ammo&&Math.hypot(...post.view.map((n,i)=>n-pre.view[i]))>.05);
   const surface=await center(page,'.sea-pad [data-touch-key=s]');await touch('touchStart',[{id:4,...surface}]);await page.waitForFunction(()=>window.__sea.snapshot().depth===0,null,{timeout:30000});await touch('touchEnd',[]);await page.locator('#interact').tap();check('shark-sea-survival: touch surfaces and exits cage',(await page.evaluate(state,game.id)).mode==='deck');
  }
  if(game.id==='sandjaw'){
   const bite=await center(page,'#bite-button');await touch('touchStart',[{id:4,...bite}]);await page.waitForFunction(()=>window.__sandjaw.snapshot().biteCooldown>0,null,{timeout:10000});await touch('touchEnd',[]);check('sandjaw: held touch bites',true);
   await page.locator('#bury-button').tap();check('sandjaw: touch buries',String((await page.evaluate(state,game.id)).mode).includes('buried'));await page.locator('#bury-button').tap();
  }
  if(game.id==='midnight-masquerade'){
   await page.locator('#begin-search').tap();check('midnight-masquerade: touch begins search',(await page.evaluate(state,game.id)).phase==='search');await page.locator('#smoke').tap();check('midnight-masquerade: touch smoke action',(await page.evaluate(state,game.id)).player.smokeCharges===1);
   await page.locator('#pause').tap();check('midnight-masquerade: touch pauses',(await page.evaluate(state,game.id)).paused);await page.locator('#change-role').tap();await page.locator('#role-police').tap();await page.locator('#start').tap();await page.locator('#begin-search').tap();
   const cop=(await page.evaluate(state,game.id)).cops[0];const at=await center(page,selectors[game.id].move);await touch('touchStart',[{id:4,...at}]);await page.waitForFunction(c=>{const p=window.__game.snapshot().cops[0];return Math.hypot(p.x-c.x,p.z-c.z)>.08;},cop,{timeout:15000});await touch('touchEnd',[]);check('midnight-masquerade: police role moves with touch',true);
  }
  await page.screenshot({path:path.join(root,`qa/tablet-${game.id}-landscape.png`),timeout:120000});
  await page.setViewportSize({width:768,height:1024});
  // resize events can wait for a software-rendered frame; verify the renderer has
  // adopted portrait dimensions before assessing the resulting layout.
  await page.waitForFunction(()=>{const c=document.querySelector('canvas');return c&&parseFloat(c.style.width||'0')<=innerWidth+1&&c.getBoundingClientRect().right<=innerWidth+1;},null,{timeout:120000});
  await geometry(page,game,'portrait 768x1024');
  if(game.id==='midnight-masquerade')check('midnight-masquerade: briefing does not cover playfield',(await page.locator('.brief').boundingBox()).height<90);
  if(game.id==='sandjaw')check('sandjaw: status panel clears movement buttons',await page.evaluate(()=>document.querySelector('.vitals').getBoundingClientRect().bottom<document.querySelector('.touch-move').getBoundingClientRect().top));
  check(`${game.id}: portrait has no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(root,`qa/tablet-${game.id}-portrait.png`),timeout:120000});
  await page.locator('#touch-controls-toggle').tap();await page.waitForFunction(()=>document.body.dataset.touchControls==='off');check(`${game.id}: manual controls off`,true);
  await page.locator('#touch-controls-toggle').tap();await page.waitForFunction(()=>document.body.dataset.touchControls==='on');check(`${game.id}: manual fallback restores controls`,await page.locator(selectors[game.id].move).isVisible());
  await context.close();
 }
 check('all tablet pages have no runtime or asset errors',report.errors.length===0);report.result='PASS';
}catch(error){report.result='FAIL';report.failure=error.stack;if(page&&!page.isClosed())await page.screenshot({path:path.join(root,'qa/tablet-failure.png'),timeout:120000}).catch(()=>{});throw error;}
finally{fs.writeFileSync(path.join(root,'qa',process.env.WORKSHOP_URL?'tablet-live.json':'tablet-local.json'),JSON.stringify(report,null,2));await browser.close();server.close();console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors}));}
