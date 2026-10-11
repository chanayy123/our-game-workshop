import {chromium} from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:5186/');await page.waitForTimeout(2200);await page.screenshot({path:'qa/01-intro.png'});
await page.getByRole('button',{name:'潜入海岸'}).click();await page.waitForTimeout(1800);await page.screenshot({path:'qa/02-coast.png'});
console.log(JSON.stringify({errors,state:await page.evaluate(()=>window.__sandjaw.snapshot())}));await browser.close();
