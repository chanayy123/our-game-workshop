import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Use the existing development-only scenario setup; all actions use real input.
const browser=await chromium.launch({headless:true,
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{}),
  args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:640,height:480}});
page.setDefaultTimeout(240000);
const report={date:new Date().toISOString(),checks:[],errors:[],requests:[],note:'Development scenario setup; real keyboard/buttons; software WebGL, not real device acceptance.'};
fs.mkdirSync('qa',{recursive:true});
page.on('pageerror',e=>report.errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
page.on('requestfailed',r=>report.errors.push(`${r.url()}: ${r.failure()?.errorText}`));
page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.url()}: ${r.status()}`);});
page.on('request',r=>report.requests.push(r.url()));
const state=()=>page.evaluate(()=>window.__islandDebug());
const seed=name=>page.evaluate(n=>window.__islandTest.scenario(n),name);
const check=(name,ok)=>{assert.ok(ok,name);report.checks.push(name);console.log('PASS '+name);};
const young=s=>s.survival.creatures.filter(c=>c.kind==='young-diplodocus');
try{
  await page.goto(process.env.ISLAND_URL??'http://127.0.0.1:5182/?qa=1');
  await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro');
  await page.locator('#settings').click();await page.locator('#quality').selectOption('balanced');await page.locator('#dialog-close').click();
  const initial=await state();
  check('four small diplodocus replace foxes within the same 18 residents',young(initial).length===4&&initial.survival.creatures.length===18&&!initial.survival.creatures.some(c=>c.kind==='fox'));
  check('young herbivores use the existing diplodocus Idle and Walk clips',young(initial).every(c=>{
    const v=initial.wildlife.find(v=>v.id===c.id);
    return c.size>=1.8&&c.size<=2.1&&v.visible&&v.clips.includes('Idle')&&v.clips.includes('Walk')&&v.animation==='Idle';
  }));
  check('diplodocus model is requested once and fox model is never loaded',report.requests.filter(u=>u.includes('assets/animals/diplodocus/model.glb')).length===1&&!report.requests.some(u=>u.includes('fox.glb')));
  await page.locator('#start').click();
  await seed('hunt');
  await page.waitForFunction(()=>window.__islandDebug().survival.creatures.find(c=>c.id==='young-diplodocus-0').mode==='run');
  check('approaching the young herbivore triggers its animated escape',(await state()).wildlife.find(v=>v.id==='young-diplodocus-0').animation==='Walk');
  await page.keyboard.press('Escape');const paused=await state();await page.waitForTimeout(500);
  check('pause freezes wildlife and hunger',JSON.stringify(paused.wildlife)===JSON.stringify((await state()).wildlife)&&paused.survival.hunger===(await state()).survival.hunger);
  await page.locator('#resume').click();
  for(const form of ['trex','raptor']){
    if(form==='raptor'){
      await page.keyboard.press('Escape');await page.locator('#player-species').selectOption('raptor');await page.locator('#resume').click();
    }
    await seed('hunt');const before=await state();
    await page.keyboard.press('Space');
    await page.waitForFunction(k=>window.__islandDebug().survival.kills>k,before.survival.kills);
    await page.waitForFunction(()=>window.__islandDebug().motion.action==='idle');
    const killed=await state();
    check(`${form} bites the young herbivore without feeding automatically`,!young(killed)[0].alive&&young(killed)[0].active&&killed.survival.hunger<before.survival.hunger);
    await page.screenshot({path:`qa/herbivore-${form}-hunt.png`});
    await page.keyboard.press('e');
    await page.waitForFunction(m=>window.__islandDebug().survival.meals>m,killed.survival.meals);
    const fed=await state();
    check(`${form} consumes one portion and restores ordinary prey food`,!young(fed)[0].active&&young(fed)[0].portions===0&&fed.survival.hunger>killed.survival.hunger+35);
    await page.keyboard.press('Escape');await page.locator('#reset').click();
    const fresh=await state();
    check(`${form} restart restores four young and two adult diplodocus`,young(fresh).length===4&&young(fresh).every(c=>c.alive&&c.active)&&fresh.survival.creatures.filter(c=>c.kind==='diplodocus').length===2&&fresh.survival.kills===0);
  }
  await seed('species:young-diplodocus');
  await page.mouse.move(550,300);await page.mouse.down();await page.mouse.move(730,300,{steps:6});await page.mouse.up();
  await page.screenshot({path:'qa/herbivore-alive.png'});
  check('no runtime, game or resource errors',report.errors.length===0&&(await state()).errors.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=String(e);report.state=await state().catch(()=>null);process.exitCode=1;console.error(e);await page.screenshot({path:'qa/herbivore-failure.png'}).catch(()=>{});}
finally{fs.writeFileSync('qa/herbivore-browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure}));await browser.close();}
