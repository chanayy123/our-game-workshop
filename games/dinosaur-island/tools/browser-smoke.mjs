import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const baseURL=process.env.ISLAND_URL??'http://127.0.0.1:5182/';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,acceptDownloads:true});
const report={date:new Date().toISOString(),baseURL,viewport:'1440x900; DPR 1; Chrome headless',checks:[],errors:[],failedRequests:[],samples:[]};
fs.mkdirSync('qa',{recursive:true});
page.on('pageerror',e=>report.errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
page.on('requestfailed',r=>report.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
const snapshot=()=>page.evaluate(()=>window.__islandDebug());
const check=(name,pass)=>{assert.ok(pass,name);report.checks.push(name);console.log(`PASS ${name}`);};
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[2]-b[2]);
async function sample(label){const state=await snapshot();report.samples.push({label,...state});return state;}
async function keyHold(keys,ms){for(const k of keys)await page.keyboard.down(k);await page.waitForTimeout(ms);for(const k of [...keys].reverse())await page.keyboard.up(k);}
try{
  const began=Date.now();await page.goto(baseURL);
  await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});
  report.localReadyMs=Date.now()-began;
  report.browser=await browser.version();
  report.gpu=await page.evaluate(()=>{const c=document.createElement('canvas'),g=c.getContext('webgl2'),d=g.getExtension('WEBGL_debug_renderer_info');return d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):'unavailable';});
  await page.waitForTimeout(5000);
  await page.screenshot({path:'qa/intro.png'});
  const intro=await sample('intro');check('all authored clips and environment assets loaded',intro.clips.length===5&&intro.warnings.length===0);
  await page.getByRole('button',{name:'踏入恐龙岛'}).click();await page.waitForTimeout(800);
  const initial=await snapshot();check('start enters third-person play',initial.phase==='playing');
  await page.keyboard.down('w');await page.waitForTimeout(1600);const walk=await sample('walking');
  check('keyboard walking moves through the rendered terrain',walk.motion.action==='walk'&&distance(walk.position,initial.position)>2);
  await page.keyboard.down('Shift');await page.waitForTimeout(2000);const run=await sample('running');
  check('Shift increases locomotion speed',run.motion.action==='run'&&run.motion.speed>walk.motion.speed*1.5);
  await page.keyboard.up('Shift');await page.keyboard.up('w');await page.waitForTimeout(700);
  check('released input returns to idle',(await snapshot()).motion.action==='idle');
  await page.screenshot({path:'qa/forest.png'});
  const cameraBefore=(await snapshot()).camera;
  await page.mouse.move(920,400);await page.mouse.down();await page.mouse.move(1120,435,{steps:16});await page.mouse.up();
  await page.mouse.wheel(0,-80);await page.waitForTimeout(500);
  check('drag and wheel operate the orbit camera',distance(cameraBefore,(await snapshot()).camera)>1);
  await page.keyboard.press('r');await page.waitForTimeout(800);const roaring=await sample('roaring');
  check('R starts the real roar action',roaring.motion.action==='roar'&&roaring.motion.roarRemaining>0);
  await page.keyboard.press('Escape');const paused=await snapshot();await keyHold(['w'],800);
  const still=await snapshot();check('pause freezes position and roar timeline',still.phase==='paused'&&distance(still.position,paused.position)===0&&still.motion.roarRemaining===paused.motion.roarRemaining);
  await page.getByLabel('画面质量').selectOption('balanced');
  await page.locator('#mute').uncheck();await page.locator('#resume').click();
  await page.locator('#sound').click();check('sound can be unmuted after pause/resume',(await snapshot()).muted===false);
  await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle',null,{timeout:16000});
  check('roar completes and returns to idle',(await snapshot()).motion.action==='idle');
  await page.keyboard.press('p');check('photo mode hides the HUD',(await snapshot()).photo);
  const downloadPromise=page.waitForEvent('download');await page.locator('#capture').click();
  const download=await downloadPromise;await download.saveAs('qa/photo-export.png');
  check('photo export produces a real PNG',fs.readFileSync('qa/photo-export.png').subarray(1,4).toString()==='PNG');
  await page.keyboard.press('p');await page.keyboard.press('Escape');
  await page.locator('#dialog-credits').click();
  check('credits expose the author and source license',await page.locator('#credits-content').getByText('LasquetiSpice',{exact:false}).count()===1);
  await page.locator('#credits-close').click();await page.locator('#reset').click();
  check('reset restores the south shore spawn',distance((await snapshot()).position,initial.position)<.01);
  await page.keyboard.press('Escape');await page.getByLabel('画面质量').selectOption('auto');await page.locator('#resume').click();
  // A sustained keyboard-driven route, including the forest and coast boundary.
  for(let i=0;i<18;i++){
    await keyHold(i<7?['w','Shift']:i<10?['a','Shift']:i<16?['s','Shift']:['d','Shift'],3000);
    await sample(`roam-${i}`);
    if(i===4||i===10)await page.screenshot({path:`qa/route-${i}.png`});
    if(i%6===5)console.log(`ROAM ${i+1}/18`);
  }
  check('sustained roam stays on land or traversable river bed',report.samples.every(s=>s.position?.every(Number.isFinite)&&(s.position[1]>=-.13||(s.motion.wading&&s.position[1]>-1.6))));
  check('no browser or asset errors',report.errors.length===0&&report.failedRequests.length===0);
  await page.keyboard.press('Escape');await page.locator('#reset').click();await page.waitForTimeout(1000);
  await page.screenshot({path:'qa/playing.png'});
  report.final=await snapshot();report.result='PASS';
}catch(error){report.result='FAIL';report.failure=String(error);await page.screenshot({path:'qa/failure.png'});process.exitCode=1;}
finally{fs.writeFileSync('qa/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure,final:report.final}));await browser.close();}
