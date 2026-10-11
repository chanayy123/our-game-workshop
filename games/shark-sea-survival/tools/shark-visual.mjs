import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true,channel:'chrome'}),page=await browser.newPage({viewport:{width:1440,height:900}});
page.on('pageerror',e=>console.log(e.stack));
await page.goto('http://127.0.0.1:4185/?qa=1');await page.waitForFunction(()=>window.__sea?.snapshot().render.calls>30);await page.locator('#start').click();
await page.evaluate(()=>{const q=window.__sea;q.setBoat(0,600);q.game.mode='cage';q.game.depth=16;q.step(12);q.sharks.debugThreatNearCage();q.aimAt(0);q.step(.7);});
await page.screenshot({path:'qa/v2-white-shark.png'});
await page.evaluate(()=>{const q=window.__sea;q.game.damage(100,'cage');q.step(2.5);});await page.screenshot({path:'qa/v2-drag.png'});
await page.evaluate(()=>window.__sea.step(1.5));await page.screenshot({path:'qa/v2-drag-deep.png'});await browser.close();
