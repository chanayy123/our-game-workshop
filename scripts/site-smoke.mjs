import {chromium} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createServer,prefix} from './serve.mjs';
const root=path.resolve(import.meta.dirname,'..');
const games=JSON.parse(fs.readFileSync(path.join(root,'games.json'),'utf8'));
const ids=process.argv.slice(2);
for(const id of ids)assert.ok(games.some(g=>g.id===id),`Unknown game: ${id}`);
const selected=ids.length?games.filter(g=>ids.includes(g.id)):games;
const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=process.env.WORKSHOP_URL??`http://127.0.0.1:${server.address().port}${prefix}`;
fs.mkdirSync(path.join(root,'qa'),{recursive:true});
const report={date:new Date().toISOString(),base,checks:[],errors:[],samples:[],note:'Production builds; normal URLs; real start and keyboard input; no writable QA hooks used. Headless rendering does not prove real tablet performance or all game outcomes.'};
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']})});
const check=(name,value)=>{assert.ok(value,name);report.checks.push(name);console.log(`PASS ${name}`);};
function errors(page,game){
  page.on('pageerror',e=>report.errors.push({game,error:e.message}));
  page.on('console',m=>{if(m.type()==='error')report.errors.push({game,error:m.text()});});
  page.on('requestfailed',r=>report.errors.push({game,url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)report.errors.push({game,url:r.url(),status:r.status()});});
}
try{
  const context=await browser.newContext({viewport:{width:1440,height:960},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();errors(page,'gallery');
  await page.goto(new URL('games/',base).href,{waitUntil:'networkidle',timeout:120000});
  check('six game cards',await page.locator('.card').count()===6);
  check('six previews loaded',await page.locator('.art img').evaluateAll(xs=>xs.every(x=>x.complete&&x.naturalWidth>0)));
  await page.locator('#idea-game').selectOption('shark-sea-survival');
  await page.locator('#idea').fill('船快一点');await page.locator('#copy-idea').click();
  await page.waitForFunction(()=>/已复制|长按/.test(document.querySelector('#idea-status').textContent));
  check('idea copy gives instructions or selectable fallback',/已复制|长按/.test(await page.locator('#idea-status').innerText()));
  const prompt=await page.evaluate(async()=>document.querySelector('#idea-status').textContent.includes('已复制')?await navigator.clipboard.readText():document.querySelector('#idea').value);
  check('copied prompt names the correct source game and idea',prompt.includes('games/shark-sea-survival')&&prompt.includes('船快一点'));
  await page.screenshot({path:path.join(root,'qa/gallery-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  check('gallery fits phone viewport',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(root,'qa/gallery-mobile.png'),fullPage:true});await page.close();
  for(const game of selected){
    const page=await browser.newPage({viewport:{width:960,height:600}});errors(page,game.id);
    // Software WebGL can stall the first UI frames before balanced quality is selected.
    // Keep actionability checks and real input, but allow the slow CI renderer to settle.
    page.setDefaultTimeout(120000);
    await page.goto(new URL(game.path||'./',base).href,{waitUntil:'domcontentloaded',timeout:120000});
    await page.waitForFunction(()=>{const start=document.querySelector('#start');return start&&!start.disabled&&document.querySelector('canvas');},null,{timeout:120000});
    check(`${game.id}: canvas and start ready`,await page.locator('canvas').count()>0);
    if(game.id==='dinosaur-island'){
      await page.locator('#settings').click();await page.locator('#quality').selectOption('balanced');await page.locator('#dialog-close').click();
    }
    await page.locator(game.start).click();await page.waitForTimeout(1500);
    check(`${game.id}: start interaction hides start screen`,!await page.locator(game.start).isVisible());
    const before=await page.evaluate(()=>window.__islandDebug?.()??window.__sea?.snapshot()??window.__sandjaw?.snapshot()??null);
    await page.keyboard.down('w');
    try{
      if(before){
        await page.waitForFunction(({id,before})=>{
          const now=window.__islandDebug?.()??window.__sea?.snapshot()??window.__sandjaw?.snapshot();
          return id==='dinosaur-island'?Math.hypot(...now.position.map((n,i)=>n-before.position[i]))>0.05:Math.hypot(now.x-before.x,now.z-before.z)>0.05;
        },{id:game.id,before},{timeout:20000});
      }else await page.waitForTimeout(1200);
    }finally{await page.keyboard.up('w');}
    const after=await page.evaluate(()=>window.__islandDebug?.()??window.__sea?.snapshot()??window.__sandjaw?.snapshot()??null);
    if(before&&after){
      report.samples.push({game:game.id,before,after});
      const moved=game.id==='dinosaur-island'?Math.hypot(...after.position.map((n,i)=>n-before.position[i])):Math.hypot(after.x-before.x,after.z-before.z);
      check(`${game.id}: real input moves player or boat`,moved>0.05);
    }
    check(`${game.id}: workshop return link`,await page.getByRole('link',{name:'返回游戏工坊'}).count()===1);
    await page.screenshot({path:path.join(root,`qa/${game.id}-playing.png`),timeout:120000});await page.close();
  }
  check('no browser or asset errors',report.errors.length===0);report.result='PASS';
}catch(e){report.result='FAIL';report.failure=e.stack;throw e;}
finally{fs.writeFileSync(path.join(root,'qa',process.env.WORKSHOP_URL?'site-live.json':'site-local.json'),JSON.stringify(report,null,2));await browser.close();server.close();console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors}));}
