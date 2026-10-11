import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chrome'});const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:4185/?qa=1');await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);await page.locator('#start').click();
await page.evaluate(()=>{const q=window.__sea;q.game.z=800;q.game.mode='cage';q.game.depth=13;q.game.anchored=true;q.step(16);q.setView(-Math.PI/2,1.28);q.step(1);});await page.waitForTimeout(300);await page.screenshot({path:'qa/15-boat-overhead.png'});
await page.evaluate(()=>{const q=window.__sea;q.game.depth=38;q.step(18);q.setView(Math.PI/2,-.32);q.step(1);});await page.waitForTimeout(300);await page.screenshot({path:'qa/16-deep-sea.png'});
fs.writeFileSync('qa/visual-check.json',JSON.stringify({date:new Date().toISOString(),setup:'QA positioning for visual depth checks, actual same world/render pipeline',errors,snapshot:await page.evaluate(()=>window.__sea.snapshot())},null,2));await browser.close();
