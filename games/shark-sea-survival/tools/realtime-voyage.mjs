import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const errors=[];page.on('pageerror',e=>errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:4185/');await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);
await page.locator('#help').click();await page.locator('#resume').click();
if(!await page.locator('#intro').isVisible())throw new Error('Intro help fails to return');
await page.locator('#start').click();
await page.keyboard.down('w');await page.waitForTimeout(3600);await page.keyboard.up('w');
let report={date:new Date().toISOString(),url:page.url(),qaHooksAvailable:await page.evaluate(()=>!!window.__sea.game),errors,samples:[]};
const started=Date.now();
for(let i=0;i<30;i++){
 await page.waitForTimeout(5000);const s=await page.evaluate(()=>window.__sea.snapshot());report.samples.push({phase:s.phase,z:s.z,speed:s.speed,hull:s.hull,elapsed:s.elapsed,fps:s.fps,breaches:s.stats.breaches,sharks:s.sharks.length});
 console.log(JSON.stringify(report.samples.at(-1)));
 if(s.phase==='won'){await page.screenshot({path:'qa/14-realtime-arrival.png'});report.result='PASS';break;}
 if(s.phase==='lost')throw new Error('Natural voyage lost');
}
report.wallSeconds=(Date.now()-started)/1000;
if(!report.result)report.result='FAIL';
fs.writeFileSync('qa/realtime-voyage.json',JSON.stringify(report,null,2));await browser.close();
if(report.result!=='PASS'||errors.length)process.exitCode=1;
