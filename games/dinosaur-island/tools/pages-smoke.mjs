import {chromium} from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist'),prefix='/our-game-workshop/';
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.glb':'model/gltf-binary','.gltf':'model/gltf+json','.json':'application/json','.jpg':'image/jpeg','.png':'image/png'};
const server=http.createServer((req,res)=>{const route=new URL(req.url,'http://localhost').pathname;if(!route.startsWith(prefix)){res.writeHead(404).end();return;}const file=path.resolve(root,decodeURIComponent(route.slice(prefix.length))||'index.html');if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const report={date:'2026-10-11',url:process.env.ISLAND_PAGES_URL||`http://127.0.0.1:${server.address().port}${prefix}`,errors:[],checks:[]};
try{
 const page=await browser.newPage({viewport:{width:1024,height:768},deviceScaleFactor:1,hasTouch:true,isMobile:true});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.errors.push(r.url()+': '+r.failure()?.errorText));
 await page.goto(report.url);await page.waitForFunction(()=>window.__islandDebug?.().phase==='intro',null,{timeout:120000});
 assert.equal(await page.evaluate(()=>typeof window.__islandTest),'undefined');report.checks.push('production scene loads under repository subpath without development hook');
 await page.locator('#start').tap();await page.waitForTimeout(500);assert.ok(await page.locator('#touch-pad').isVisible());
 const before=await page.evaluate(()=>window.__islandDebug());await page.getByRole('button',{name:'切换奔跑',exact:true}).tap();
 const box=await page.getByRole('button',{name:'向前移动',exact:true}).boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(1600);const moving=await page.evaluate(()=>window.__islandDebug());await page.mouse.up();
 assert.ok(Math.hypot(moving.position[0]-before.position[0],moving.position[2]-before.position[2])>2);assert.equal(moving.motion.action,'run');report.checks.push('tablet buttons drive real movement and running (pointer hold, touch tap)');
 await page.waitForTimeout(1000);assert.equal((await page.evaluate(()=>window.__islandDebug())).motion.action,'idle');report.checks.push('released movement stops');
 await page.locator('#roar-button').tap();await page.waitForTimeout(900);assert.equal((await page.evaluate(()=>window.__islandDebug())).motion.action,'roar');report.checks.push('touch roar button plays');await page.screenshot({path:'qa/pages-tablet-landscape.png'});
 await page.locator('#settings').tap();await page.waitForTimeout(200);assert.ok(await page.locator('#resume').isVisible());report.checks.push('tablet settings usable');
 await page.setViewportSize({width:768,height:1024});await page.screenshot({path:'qa/pages-tablet-portrait.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);report.checks.push('portrait has no horizontal overflow');
 assert.equal(report.errors.length,0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=String(e);process.exitCode=1;}
finally{fs.writeFileSync('qa/pages-browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();await new Promise(resolve=>server.close(resolve));}
