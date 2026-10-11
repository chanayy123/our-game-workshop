import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),url:process.env.G06_URL||'http://127.0.0.1:5186/',method:'Normal URL, read-only snapshots, real keyboard movement/turning/bites. No QA mode, game-state writes, teleportation or fast-forward.',samples:[],errors:[],minimumHealth:160};
page.on('pageerror',e=>report.errors.push(e.stack));
fs.mkdirSync('qa/giant',{recursive:true});
const state=()=>page.evaluate(()=>window.__sandjaw.snapshot());const pressed=new Set();
async function input(wanted){for(const k of [...pressed])if(!wanted.includes(k)){await page.keyboard.up(k);pressed.delete(k);}for(const k of wanted)if(!pressed.has(k)){await page.keyboard.down(k);pressed.add(k);}}
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function steer(s,p,{bite=false,sprint=false,stop=1.8}={}){
 const target=Math.atan2(p.x-s.x,p.z-s.z);const delta=Math.atan2(Math.sin(target-s.heading),Math.cos(target-s.heading));const keys=[];
 if(Math.abs(delta)>.07)keys.push(delta>0?'ArrowLeft':'ArrowRight');
 if(distance(s,p)>stop&&Math.abs(delta)<.52)keys.push('w');
 if(sprint&&keys.includes('w')&&s.stamina>15)keys.push('Shift');
 if(bite)keys.push('Space');return keys;
}
async function tick(keys,ms=120){await input(keys);await page.waitForTimeout(ms);const s=await state();report.minimumHealth=Math.min(report.minimumHealth,s.health);if(s.phase==='lost')throw Error('Natural third-person run lost');if(s.phase==='paused')throw Error('Run unexpectedly paused');return s;}
async function log(label){await input([]);const s=await state();report.samples.push({label,...s});console.log(label,JSON.stringify({time:s.elapsed,hp:s.health,eaten:s.eaten,length:s.length,relics:s.relics,sharks:s.sharksDefeated,police:s.policeCount,mode:s.mode,fps:s.fps}));await page.screenshot({path:`qa/giant/play-${label}.png`});return s;}
async function go(p,{bite=false,sprint=false,stop=2}={}){
 let stale=0,previous=1e6;
 for(let i=0;i<700;i++){
   const s=await state();if(s.phase==='won'||distance(s,p)<stop){await input([]);return;}
   const d=distance(s,p);stale=Math.abs(d-previous)<.035?stale+1:0;previous=d;
   if(stale>15){await tick(['d','w',...(bite?['Space']:[])],650);stale=0;}else await tick(steer(s,p,{bite,sprint,stop}));
   if(s.oxygen<16&&s.mode==='underwater'){await input([]);await page.keyboard.press('q');await tick([],4000);await page.keyboard.press('q');}
 }
 throw Error('Navigation timed out '+JSON.stringify(p));
}
try{
 await page.goto(report.url);await page.waitForFunction(()=>window.__sandjaw?.snapshot().render.calls>10);await page.locator('#start').click();await page.keyboard.press('r');await page.waitForTimeout(300);await log('01-human-disguise');for(let i=0;i<120;i++){const v=await state();const person=v.humans.filter(h=>h.alive).sort((a,b)=>distance(v,a)-distance(v,b))[0];const d=Math.atan2(Math.sin(Math.atan2(person.x-v.x,person.z-v.z)-v.heading),Math.cos(Math.atan2(person.x-v.x,person.z-v.z)-v.heading));if(distance(v,person)<3.3&&Math.abs(d)<.4){await input([]);await page.keyboard.press('g');await page.waitForTimeout(1700);break;}await tick(steer(v,person,{stop:3.1}));}await log('02-natural-sand-drag');if((await state()).sandDrags!==1)throw Error('Natural disguise and sand drag failed');await page.keyboard.press('e');await page.keyboard.press('r');
 for(let i=0;i<120;i++){const v=await state();const person=v.humans.filter(h=>h.alive).sort((a,b)=>distance(v,a)-distance(v,b))[0];const d=Math.atan2(Math.sin(Math.atan2(person.x-v.x,person.z-v.z)-v.heading),Math.cos(Math.atan2(person.x-v.x,person.z-v.z)-v.heading));if(distance(v,person)<3.3&&Math.abs(d)<.4){await input([]);await page.keyboard.press('f');await page.waitForTimeout(3500);break;}await tick(steer(v,person,{stop:3.1}));}await log('03-natural-water-drag');if((await state()).waterDrags!==1)throw Error('Natural water drag failed');
 for(let i=0;i<850;i++){
   const s=await state();if(s.eaten>=6)break;
   const target=s.humans.filter(h=>h.alive).sort((a,b)=>distance(s,a)-distance(s,b))[0];
   await tick(steer(s,target,{bite:true,sprint:true,stop:1.6}));
   if(i%100===0)await log('hunt-'+i);
   if(s.health<45&&s.policeCount){const shore=Math.sin(s.x*.075)*2+Math.sin(s.x*.19)*.7;await go({x:s.x,z:shore-6},{sprint:true,bite:true});await input([]);await page.keyboard.press('e');while((await state()).policeCount)await tick([],500);await page.keyboard.press('e');}
 }
 let s=await log('02-growth');if(s.eaten<6)throw Error('Hunting did not complete');
 await go({x:-28,z:19},{sprint:true,bite:true});await input([]);if((await state()).mode!=='underwater')await page.keyboard.press('q');await page.keyboard.press('e');await tick(['d'],350);await log('04-natural-seabed-hide');if((await state()).mode!=='seabed-buried')throw Error('Natural seabed hiding failed');await page.keyboard.press('e');await tick(['Space'],1100);await log('03-west-relic');
 for(const p of [{x:0,z:31},{x:27,z:17}]){await go(p,{sprint:true,bite:true,stop:2.4});await tick(['Space'],1600);await log('relic-'+p.x);}
 for(let i=0;i<650;i++){
   s=await state();if(s.sharksDefeated>=2)break;
   const target=s.sharks.filter(h=>h.hp>0).sort((a,b)=>distance(s,a)-distance(s,b))[0];await tick(steer(s,target,{bite:true,stop:2.6}));
   if(s.oxygen<17&&s.mode==='underwater'){await input([]);await page.keyboard.press('q');}
 }
 s=await log('04-shark-hunter');if(s.sharksDefeated<2)throw Error('Shark goal not reached');
 // A missed relic may have shared bite priority with a nearby shark; revisit through normal movement.
 for(const relic of s.foods.filter(f=>f.active&&f.kind==='relic')){if((await state()).mode!=='underwater')await page.keyboard.press('q');await go(relic,{bite:true,sprint:true,stop:2.3});await tick(['Space'],1400);}
 for(let i=0;i<300;i++){s=await state();if(s.length>=12)break;const food=s.foods.filter(f=>f.active&&f.kind!=='relic'&&f.deep===(s.mode==='underwater')).sort((a,b)=>distance(s,a)-distance(s,b))[0];await tick(steer(s,food,{bite:true,sprint:true,stop:1.5}));}
 s=await state();if(s.mode==='underwater')await page.keyboard.press('q');await go({x:-45,z:22},{sprint:true,bite:true,stop:3.5});await input([]);await page.waitForTimeout(250);s=await log('05-victory');if(s.phase!=='won')throw Error('Run did not win');if(report.errors.length)throw Error('Runtime errors');report.result='PASS';
}catch(e){report.result='FAIL';report.failure=e.stack;await log('failure');console.error(e);process.exitCode=1;}finally{await input([]);fs.writeFileSync('qa/giant/playthrough-report.json',JSON.stringify(report,null,2));await browser.close();}
