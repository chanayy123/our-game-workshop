import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const report={date:new Date().toISOString(),type:'V0.4 production build smoke',errors:[]};
page.on('pageerror',error=>report.errors.push(error.message));
page.on('console',message=>{if(message.type()==='error')report.errors.push(message.text())});
page.on('requestfailed',request=>report.errors.push(`${request.url()}: ${request.failure()?.errorText}`));
try{
  await page.goto('http://127.0.0.1:4182/?qa=1');
  await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:60000});
  report.qaHookAbsent=await page.evaluate(()=>typeof window.__islandTest==='undefined');
  assert.ok(report.qaHookAbsent,'Production must exclude development scenario hooks');
  await page.locator('#intro-species').selectOption('raptor');
  // Reset from the intro settings must also start a complete playable session.
  await page.locator('#settings').click();await page.locator('#reset').click();
  await page.waitForTimeout(500);
  report.state=await page.evaluate(()=>window.__islandDebug());
  assert.equal(report.state.phase,'playing');assert.equal(report.state.playerKind,'raptor');assert.equal(report.state.survival.creatures.length,18);
  assert.ok(await page.locator('#intro').isHidden());assert.ok(report.state.pose.rigReady);
  await page.keyboard.down('Shift');await page.keyboard.down('w');await page.keyboard.down('a');
  await page.waitForTimeout(8000);
  await page.keyboard.up('a');await page.keyboard.up('w');await page.keyboard.up('Shift');
  await page.waitForTimeout(800);await page.screenshot({path:'qa/v04-production.png'});
  report.final=await page.evaluate(()=>window.__islandDebug());
  assert.ok(report.final.survival.hunger<report.state.survival.hunger);assert.equal(report.errors.length,0);
  report.result='PASS';
}catch(error){report.result='FAIL';report.failure=String(error);process.exitCode=1;}
finally{fs.writeFileSync('qa/production-smoke.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,qaHookAbsent:report.qaHookAbsent,errors:report.errors,failure:report.failure}));await browser.close();}
