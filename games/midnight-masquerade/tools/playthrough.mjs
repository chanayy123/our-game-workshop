import { chromium } from '@playwright/test';
import { findPath } from '../src/navigation.ts';
import { createMap } from '../src/map.ts';
import fs from 'node:fs';

// This playthrough reads QA telemetry but changes the game only through real
// browser buttons, mouse movement, and keyboard input. No teleport/tick/setters.
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1480,height:900},deviceScaleFactor:1});
const report={started:new Date().toISOString(),url:process.env.GAME_URL||'http://127.0.0.1:5184/?qa=1',inputOnly:true,errors:[],samples:[],moves:[],notes:[]};
page.on('pageerror',error=>report.errors.push(error.message));
const state=()=>page.evaluate(()=>window.__game.snapshot());
const snap=async(label)=>{const s=await state();report.samples.push({label,...s});console.log(label,JSON.stringify({phase:s.phase,time:s.time,player:s.player,cops:s.cops.map(c=>({x:c.x,z:c.z,mode:c.mode,hp:c.hp})),fps:s.fps}));await page.screenshot({path:`qa/play-${label}.png`});return s;};
const map=createMap();
const release=async()=>{for(const k of ['w','a','s','d','Shift'])await page.keyboard.up(k);};
async function walkTo(goal,sprint=false){
 let s=await state(),path=findPath(map,s.player,goal,s.player.kind==='barrel'?.37:.3),iterations=0;
 const start={x:s.player.x,z:s.player.z};
 for(const point of path){
  let previous=Infinity,stuck=0;
  while(iterations++<300){s=await state();if(!['prepare','search'].includes(s.phase))break;const dx=point.x-s.player.x,dz=point.z-s.player.z,d=Math.hypot(dx,dz);if(d<.26)break;
   if(s.player.exposed&&s.player.smokeCharges&&s.player.smokeTime<.01){await page.keyboard.press('f');report.notes.push('Used smoke after actual discovery');}
   const sx=.817*dx-.577*dz,sy=.577*dx+.817*dz;
   const angle=Math.atan2(sy,sx),step=Math.round(angle/(Math.PI/4));
   const dirs={0:['d'],1:['d','s'],2:['s'],3:['s','a'],4:['a'],'-4':['a'],'-3':['a','w'],'-2':['w'],'-1':['w','d']}[step];
   for(const k of ['w','a','s','d'])if(dirs.includes(k))await page.keyboard.down(k);else await page.keyboard.up(k);
   if(sprint)await page.keyboard.down('Shift');
   await page.waitForTimeout(d<.65?55:100);
   if(Math.abs(previous-d)<.015)stuck++;else stuck=0;previous=d;
   if(stuck>20){report.notes.push(`Movement stalled near ${JSON.stringify(point)}`);break;}
  }
 }
 await release();s=await state();report.moves.push({start,goal,end:s.player,iterations});return s;
}
try{
 await page.goto(process.env.GAME_URL||'http://127.0.0.1:5184/?qa=1');await page.waitForFunction(()=>window.__game);await page.waitForTimeout(600);
 await snap('01-title');await page.locator('#start').click();
 await walkTo({x:-6.5,z:8.7});await page.keyboard.press('e');await page.keyboard.press('q');await page.waitForTimeout(1000);await snap('02-hidden');
 await page.keyboard.press('Enter');await page.waitForTimeout(14000);await snap('03-patrol');
 const noise=await page.evaluate(()=>window.__game.project(-2,1));await page.mouse.move(noise.x,noise.y);await page.keyboard.press('Space');await page.waitForTimeout(6000);await snap('04-decoy');
 await walkTo({x:-11.65,z:-.8},true);await page.keyboard.press('e');await page.waitForTimeout(1300);await snap('05-relocated');
 let before=await state(),lastTime=before.time;
 while(before.phase==='search'&&before.time>0){
  if(before.player.exposed&&before.player.smokeCharges>0&&before.player.smokeTime===0){await page.keyboard.press('f');report.notes.push('Reacted with smoke during stationary hide');}
  await page.waitForTimeout(500);before=await state();
  if(lastTime-before.time>25){await snap(`06-search-${Math.round(before.time)}`);lastTime=before.time;}
 }
 await snap('07-result');
 await page.locator('#play-again').click();await snap('08-restarted');await page.keyboard.press('Escape');
 report.finished=new Date().toISOString();report.final=await state();report.renderer=await page.evaluate(()=>window.__game.world.renderer.info.render);
}catch(error){report.errors.push(String(error));console.error(error);await page.screenshot({path:'qa/play-error.png'}).catch(()=>{});process.exitCode=1;}
finally{await release().catch(()=>{});fs.writeFileSync('qa/playthrough-report.json',JSON.stringify(report,null,2));await browser.close();}
