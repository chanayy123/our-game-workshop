import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const baseURL=process.env.CREEK_URL??'http://127.0.0.1:5183/';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
const report={date:new Date().toISOString(),baseURL,browser:await browser.version(),checks:[],errors:[],failedRequests:[],samples:[]};
fs.mkdirSync('qa',{recursive:true});
page.on('pageerror',e=>report.errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
page.on('requestfailed',r=>report.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
const state=()=>page.evaluate(()=>window.__riverTest.snapshot());
const check=(name,pass)=>{assert.ok(pass,name);report.checks.push(name);console.log(`PASS ${name}`);};
const sample=async(label)=>{const s=await state();report.samples.push({label,...s});return s;};
async function clickWorld(x,z){const p=await page.evaluate(({x,z})=>window.__riverTest.project(x,z),{x,z});await page.mouse.click(p.x,p.y);await page.waitForTimeout(150);}
async function hold(key,ms){await page.keyboard.down(key);await page.waitForTimeout(ms);await page.keyboard.up(key);}
try {
 await page.goto(`${baseURL}?qa=1`);
 await page.waitForFunction(()=>window.__riverTest?.snapshot().phase==='ready');
 await page.waitForTimeout(700);
 await page.screenshot({path:'qa/01-intro.png'});
 await page.getByRole('button',{name:'踏入溪流'}).click();
 const initial=await sample('initial');
 check('start enters game with two dry objective basins',initial.phase==='playing'&&initial.levels.every(v=>v<.012));
 await hold('d',550);const moved=await state();
 check('WASD moves the actual player through the rendered world',Math.hypot(moved.player.x-initial.player.x,moved.player.z-initial.player.z)>.7);
 await page.keyboard.press('Escape');const paused=await state();const pausedWater=await page.evaluate(()=>Array.from(window.__riverTest.sim.water));await hold('w',300);const still=await state();
 const stillWater=await page.evaluate(()=>Array.from(window.__riverTest.sim.water));
 check('pause freezes player, water and elapsed time',still.phase==='paused'&&still.elapsed===paused.elapsed&&still.player.x===paused.player.x&&still.player.z===paused.player.z&&stillWater.every((v,i)=>v===pausedWater[i]));
 await page.getByRole('button',{name:'继续探索'}).click();
 await page.getByLabel('打开指南').click();
 check('field guide explains terrain tools and ten-second recovery',await page.locator('#modal-content').innerText().then(t=>t.includes('10 秒')&&t.includes('挖掘')));
 await page.getByRole('button',{name:'明白了，回到溪边'}).click();
 await page.evaluate(()=>window.__riverTest.teleport(-3,-2));
 await page.keyboard.press('2');const beforeSoil=await page.evaluate(()=>window.__riverTest.sim.terrain[window.__riverTest.sim.cellAt(-4,-2)]);
 await clickWorld(-4,-2);const afterSoil=await page.evaluate(()=>window.__riverTest.sim.terrain[window.__riverTest.sim.cellAt(-4,-2)]);
 check('soil tool changes hydraulic terrain from an actual canvas click',afterSoil>beforeSoil+.2);
 await page.keyboard.press('4');await clickWorld(-4,-2);const afterRemove=await page.evaluate(()=>window.__riverTest.sim.terrain[window.__riverTest.sim.cellAt(-4,-2)]);
 check('remove tool restores modified terrain',Math.abs(afterRemove-beforeSoil)<.001);
 await page.screenshot({path:'qa/02-playing.png'});
 // QA teleport only sets up the encounter; the snake must warn, pursue and bite naturally.
 await page.evaluate(()=>window.__riverTest.teleport(0,1));
 await page.waitForFunction(()=>window.__riverTest.snapshot().snakes.some(s=>s.mood==='alert'),null,{timeout:18000});
 await page.screenshot({path:'qa/03-snake-warning.png'});
 await page.waitForFunction(()=>window.__riverTest.snapshot().player.health==='bitten',null,{timeout:18000});
 const bitten=await sample('natural-bite');check('real water snake approaches and bites after its warning',bitten.bites===1&&bitten.player.health==='bitten');
 await page.screenshot({path:'qa/04-bitten.png'});
 await page.keyboard.press('1');await clickWorld(0,0);
 check('bitten player cannot modify terrain',(await state()).edits===bitten.edits);
 await hold('a',950);
 await page.waitForFunction(()=>window.__riverTest.snapshot().player.health==='recovering',null,{timeout:4000});
 const countdownStarted=Date.now();
 const recovering=await sample('recovering');
 check('walking onto real dry land starts visible recovery',recovering.player.recovery>8&&await page.locator('#status').innerText().then(t=>t.includes('岸上恢复')));
 await page.screenshot({path:'qa/05-recovery.png'});
 await page.waitForFunction(()=>window.__riverTest.snapshot().player.health==='healthy',null,{timeout:15000});
 const recoveryWallMs=Date.now()-countdownStarted;report.recoveryWallMs=recoveryWallMs;
 await page.waitForFunction(()=>!document.querySelector('[data-tool="rock"]').disabled);
 check('recovery waits approximately ten real seconds before restoring tools',recoveryWallMs>=recovering.player.recovery*1000-300&&!(await page.getByLabel('放置石头',{exact:true}).isDisabled()));
 // Reset to solve by visible clicks, then accelerate only the water travel/hold wait.
 await page.evaluate(()=>window.__riverTest.reset());await page.evaluate(()=>window.__riverTest.teleport(-3,-2));
 await page.keyboard.press('1');await clickWorld(-.55,0);await clickWorld(.55,0);
 const dam=await page.evaluate(()=>({rocks:Array.from(window.__riverTest.sim.rocks).reduce((a,b)=>a+b,0),depth:window.__riverTest.sim.depthAt(0,-2)}));
 check('two real placements build a multi-cell rock dam',dam.rocks>=9);
 await page.evaluate(()=>window.__riverTest.step(8));
 check('dam raises upstream water level',(await page.evaluate(()=>window.__riverTest.sim.depthAt(0,-2)))>dam.depth+.1);
 await page.keyboard.press('3');for(const x of [-1.65,1.65]){await clickWorld(x,-2.2);await clickWorld(x,-2.2);}
 await page.evaluate(()=>window.__riverTest.step(23));
 await page.screenshot({path:'qa/06-redirected-water.png'});
 const redirected=await sample('redirected');check('digging redirects simulated water into both previously dry basins',redirected.levels.every(v=>v>.12));
 await page.evaluate(()=>window.__riverTest.step(20));await page.waitForTimeout(200);
 const won=await sample('won');check('continuous two-pond objective reaches a visible completion state',won.phase==='won'&&await page.locator('#modal-content').innerText().then(t=>t.includes('溪流找到了新路')));
 await page.screenshot({path:'qa/07-complete.png'});
 await page.getByRole('button',{name:'继续自由改造'}).click();check('completion continues into a playable sandbox',(await state()).phase==='sandbox');
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'重新开始',exact:true}).click();await page.getByRole('button',{name:'重新开始',exact:true}).click();
 check('restart clears edits, injury and objective',((s)=>s.edits===0&&s.bites===0&&s.hold===0&&s.phase==='playing')(await state()));
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);await page.screenshot({path:'qa/08-mobile-layout.png'});
 check('compact viewport keeps toolbar and touch controls within the screen',await page.evaluate(()=>{const r=document.querySelector('.toolbar').getBoundingClientRect();return r.x>=0&&r.right<=innerWidth&&getComputedStyle(document.querySelector('.touch-pad')).display==='grid';}));
 check('no runtime errors or failed asset requests',report.errors.length===0&&report.failedRequests.length===0);
 report.result='PASS';
} catch(error) { report.result='FAIL';report.failure=String(error);await page.screenshot({path:'qa/failure.png'});process.exitCode=1; }
finally { fs.writeFileSync('qa/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({result:report.result,checks:report.checks.length,errors:report.errors,failure:report.failure}));await browser.close(); }
