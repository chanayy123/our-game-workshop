import { installTouchControls, bindTouchKeys, resetTouchControls } from '../../../shared/touch';
import './style.css';
import { Vector3 } from 'three';
import { WaterSimulation } from './water.ts';
import { CreekWorld } from './world.ts';
import { Expedition } from './rules.ts';
import { CreekSound } from './sound.ts';
import type { Tool } from './contracts.ts';

const icons = {
 rock: '<svg viewBox="0 0 32 26"><path d="m3 20 4-12 10-5 10 8 3 11-14 2Z"/><path d="m7 8 8 9 12-6M15 17l1 7" fill="none" stroke="var(--icon-line,#a2b3a0)" stroke-width="1.3"/></svg>',
 soil: '<svg viewBox="0 0 32 26"><path d="m1 23 5-8 6-1 5-9 8 8 6 10Z"/><circle cx="12" cy="19" r="1" fill="#a2b3a0"/><circle cx="23" cy="20" r="1" fill="#a2b3a0"/></svg>',
 dig: '<svg viewBox="0 0 32 26"><path d="m21 1 5 4-3 4-2-2-9 11 3 3-7 5-7-6 5-7 3 3L19 5l-2-2Z"/></svg>',
 remove: '<svg viewBox="0 0 32 26"><path d="M7 8A11 11 0 1 1 4 19l3-1a8 8 0 1 0 3-7l5 3-13 1 2-12Z"/></svg>'
};
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <div id="world" aria-label="可交互的三维溪流场景"></div>
 <div id="ui">
  <header><div class="brand"><div class="brand-mark">≈</div><div><div class="brand-name">溪流手记</div><div class="brand-sub">RIVERKEEPER</div></div></div>
   <div class="top-actions"><span id="time" class="time">00:00</span><button id="sound" class="icon-btn" title="切换声音" aria-label="关闭声音">♫</button><button id="help" class="icon-btn" title="野外指南" aria-label="打开指南">?</button><button id="pause" class="icon-btn" title="暂停 · Esc" aria-label="暂停游戏">Ⅱ</button></div>
  </header>
  <aside class="journal"><div class="eyebrow">FIELD NOTES / 01</div><h1>让溪流分岔</h1><p class="mission-description">改变河道，让清水流进两处小池。<br>保持蓄水 <strong>12 秒</strong>，唤醒这片湿地。</p>
   <div class="pond-row"><div class="pond-top"><span class="pond-title"><i class="pond-dot"></i>苔藓池</span><span id="pond-state-0" class="pond-state">等待来水</span></div><div class="track"><span id="pond-fill-0"></span></div></div>
   <div class="pond-row"><div class="pond-top"><span class="pond-title"><i class="pond-dot east"></i>芦苇池</span><span id="pond-state-1" class="pond-state">等待来水</span></div><div class="track"><span id="pond-fill-1"></span></div></div>
   <div class="hold"><span>双池稳定蓄水</span><strong id="hold">0 / 12 s</strong></div><div class="mission-stamp">水会寻找低处。试着给它一条新路。</div>
  </aside>
  <div id="step-tip" class="step-tip"><b>观察 → 改变 → 等待</b><span id="tip-text">在分岔下方横向放石头，看看上游会发生什么。</span></div>
  <div id="status" class="status healthy"><div class="status-title"><span class="status-symbol"></span><span id="status-title">可以施工 · 岸上</span></div><div id="status-body" class="status-body"></div><div class="recovery-track"><span id="recovery-fill"></span></div></div>
  <div id="pond-label-0" class="pond-label">01 · 苔藓池</div><div id="pond-label-1" class="pond-label">02 · 芦苇池</div>
  <div id="toast" class="toast" role="status" aria-live="polite"></div><div id="cursor-hint" class="cursor-hint"></div>
  <div class="toolbar-wrap"><nav class="toolbar" aria-label="施工工具">
   ${(['rock','soil','dig','remove'] as Tool[]).map((tool,i)=>`<button data-tool="${tool}" class="tool ${i===0?'active':''}" aria-label="${['放置石头','堆起泥土','挖掘河道','移除改造'][i]}" aria-pressed="${i===0}"><span class="key">${i+1}</span><span class="tool-icon">${icons[tool]}</span><span class="tool-label">${['石头','泥土','挖掘','移除'][i]}</span></button>`).join('')}
  </nav><div class="control-guide"><span><kbd>W A S D</kbd> 移动</span><span><kbd>左键</kbd> 施工</span><span><kbd>右键</kbd> 移除</span><span><kbd>滚轮</kbd> 缩放</span></div></div>
  <div class="location"><strong>Willow Creek</strong><br>初秋 · 午后 · 水流向南 ↓</div>
  <div class="touch-pad" aria-label="触屏移动"><button data-move="KeyW" aria-label="向上移动">↑</button><button data-move="KeyA" aria-label="向左移动">←</button><button data-move="KeyS" aria-label="向下移动">↓</button><button data-move="KeyD" aria-label="向右移动">→</button></div>
  <div id="intro" class="intro-shade"><section class="intro-card"><div class="eyebrow">A LITTLE EXPERIMENT IN NATURE</div><h2>给流水，<br>一个新方向。</h2><p>穿上雨靴，走进柳溪。<br>几块石头、一些泥土，让两处干涸的小池<br>重新听见水声。</p><div class="intro-steps"><span><i>01</i> 筑一道坝</span><span><i>02</i> 挖开支流</span><span><i>03</i> 唤醒双池</span></div><button id="start" class="primary">踏入溪流 <span aria-hidden="true">↗</span></button><p class="intro-note">WASD 移动 · 鼠标施工 · 留意水中的小邻居</p></section></div>
  <div id="modal" class="modal-shade" hidden><section id="modal-content" class="modal-card" role="dialog" aria-modal="true" aria-label="游戏菜单"></section></div><div id="damage" class="damage-flash"></div>
 </div>`;

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id)! as T;
const sim = new WaterSimulation();
const expedition = new Expedition();
const sound = new CreekSound();
let world: CreekWorld;
try { world = new CreekWorld($('world'), sim); }
catch (error) { $('intro').innerHTML = '<section class="intro-card"><h2>暂时无法绘制溪流</h2><p>请使用支持 WebGL 的浏览器，并开启硬件加速后刷新。</p></section>'; throw error; }
let tool: Tool = 'rock';
const keys = new Set<string>();
const touchKeys=new Set<string>();
const hasKey=(key:string)=>keys.has(key)||touchKeys.has(key);
installTouchControls();
const pointer = { x: -1000, y: -1000, down: false, button: 0 };
let hover: ReturnType<CreekWorld['pick']> = null;
let lastEdit = -10, lastCell = -1, gameClock = 0, toastUntil = 0, flashUntil = 0, lastBird = 0, hudClock = 0;
let modalKind = '', firstEdit = false;
const names: Record<Tool,string> = {rock:'放置石头',soil:'堆起泥土',dig:'挖掘河道',remove:'移除改造'};
const env = { depthAt:(x:number,z:number)=>sim.depthAt(x,z), surfaceAt:(x:number,z:number)=>sim.surfaceAt(x,z), terrainAt:(x:number,z:number)=>{const i=sim.cellAt(x,z); return i<0?3:sim.terrain[i];}, basinLevels:()=>sim.basinLevels() };

function notify(text: string, duration = 4) { $('toast').textContent=text; toastUntil=gameClock+duration; $('toast').classList.add('visible'); }
function selectTool(next: Tool) { tool=next; document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(button=>{const active=button.dataset.tool===tool;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}); }
function active() { return expedition.phase==='playing'||expedition.phase==='sandbox'; }
function validTarget() { return Boolean(hover && !sim.protectedCells[hover.index] && Math.hypot(hover.x-expedition.player.x,hover.z-expedition.player.z)<=5.5 && expedition.canBuild()); }
function interact(force = false) {
 if (!active() || !hover) return;
 if (!expedition.canBuild()) { if(force)notify(expedition.player.health==='bitten'?'被咬伤了！先离开水面，到干地恢复。':'正在恢复，倒计时结束后就可以施工。'); return; }
 if (!validTarget()) { if(force)notify(sim.protectedCells[hover.index]?'泉眼与溪流出口需要保持畅通。':'走近一点，雨靴周围 5.5 米内可以施工。',2); return; }
 if (!force && (gameClock-lastEdit<.24 || (hover.index===lastCell && tool==='rock'))) return;
 const chosen=pointer.button===2?'remove':tool;
 if (sim.edit(hover.index,chosen)) { expedition.recordEdit(); lastEdit=gameClock;lastCell=hover.index;sound.play(chosen);world.burst(hover.x,hover.z,chosen); if(!firstEdit){firstEdit=true;notify('留意水位和白色流纹：它们会告诉你，水去了哪里。',5);} }
 else if(force)notify(chosen==='remove'?'这里还没有改造过。':'这里已到极限，试试旁边的地面。',2);
}
function start() { expedition.start();$('intro').hidden=true;void sound.start();notify('先在分岔下方筑坝，再挖开两侧浅褐色的泥口。',6); }
function closeModal() { $('modal').hidden=true;modalKind='';if(expedition.phase==='paused')expedition.resume();keys.clear();resetTouchControls();world.renderer.domElement.focus({preventScroll:true}); }
function openModal(kind: 'pause'|'help'|'restart'|'win') {
 keys.clear();resetTouchControls();pointer.down=false;modalKind=kind;if(active())expedition.pause();
 const content = $('modal-content');
 if(kind==='help')content.innerHTML=`<div class="eyebrow">THE POCKET FIELD GUIDE</div><h2>顺着水的脾气来。</h2><div class="help-grid"><b>WASD / ↑↓←→</b><span>沿画面方向走动；走近目标再施工。</span><b>1 石头</b><span>放下大石块，横着排成坝，水会积起来。</span><b>2 泥土</b><span>抬高地面，填缝或围出新河岸。</span><b>3 挖掘</b><span>降低地面；长按可连续挖开支流泥口。</span><b>4 / 右键</b><span>移除改造，恢复这里原来的地形。</span><b>水蛇</b><span>红圈是警告，及时离开。被咬后上干地，恢复 10 秒；重入水中会重新计时。</span></div><p>让两池都有水，再保持 12 秒。没有限时，也没有材料数量限制。</p><button class="primary" data-action="resume">明白了，回到溪边</button>`;
 else if(kind==='win')content.innerHTML=`<div class="eyebrow">FIELD NOTES / COMPLETE</div><h2>溪流找到了新路。</h2><p>两处小池重新有了水，湿地也醒来了。<br>这一小段河流，留下了你的想法。</p><div class="result-stats"><div><strong>${formatTime(expedition.elapsed)}</strong><span>溪边时光</span></div><div><strong>${expedition.edits}</strong><span>次地形改造</span></div><div><strong>${expedition.bites}</strong><span>次水蛇碰面</span></div></div><div class="modal-actions"><button class="primary" data-action="sandbox">继续自由改造</button><button class="secondary" data-action="restart">再试一种水路</button></div>`;
 else if(kind==='restart')content.innerHTML=`<div class="eyebrow">A FRESH PAGE</div><h2>重新开始这段溪流？</h2><p>本次地形改造与进度会重置。</p><div class="modal-actions"><button class="primary" data-action="restart">重新开始</button><button class="secondary" data-action="resume">继续当前游戏</button></div>`;
 else content.innerHTML=`<div class="eyebrow">TAKE A BREATH</div><h2>在溪边歇一会儿。</h2><p>水流、计时与小蛇都已暂停。</p><button class="primary" data-action="resume">继续探索</button><div class="modal-actions"><button class="secondary" data-action="help">野外指南</button><button class="secondary" data-action="confirm-restart">重新开始</button></div>`;
 $('modal').hidden=false;content.querySelector<HTMLButtonElement>('button')?.focus({preventScroll:true});
}
function reset() { sim.reset();expedition.reset();expedition.start();firstEdit=false;lastCell=-1;lastEdit=-10;closeModal();notify('新的一页。试试不同的筑坝位置。'); }
function formatTime(seconds:number) { return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`; }
function handleEvents(events:string[]) { for (const event of events) {
 sound.play(event);
 if(event==='bite'){world.burst(expedition.player.x,expedition.player.z,'bite');flashUntil=gameClock+.7;notify('被水蛇咬伤！施工已锁定，请到没有水的岸上。',5);}
 if(event==='recovery-start')notify('已到干地。休息 10 秒，留在岸上就能恢复。',3);
 if(event==='recovery-reset')notify('又回到水中了。请重新上岸，恢复需要连续 10 秒。',4);
 if(event==='snake-alert')notify('附近的水蛇警觉起来了，红圈亮起时尽快离开。',3);
 if(event==='recovered')notify('恢复了！可以继续改造。水蛇暂时不会再追你。',4);
 if(event==='won'){world.burst(-6,6,'win');world.burst(6,6,'win');openModal('win');}
 } }
function step(dt:number,input:{x:number,z:number}) { if(active())sim.update(dt);handleEvents(expedition.update(dt,input,env)); }
function drawHud() {
 $('step-tip').style.top=`${document.querySelector('.journal')!.getBoundingClientRect().bottom+12}px`;
 const levels=sim.basinLevels();levels.forEach((level,i)=>{const percent=Math.min(100,Math.round(level/.12*100));$(`pond-fill-${i}`).style.width=`${percent}%`;$(`pond-state-${i}`).textContent=level>=.12?'蓄水充足':level>.012?`正在进水 ${percent}%`:'等待来水';const basin=sim.basins[i],pos=world.project(basin.x,basin.z+1.5);$(`pond-label-${i}`).style.left=`${pos.x}px`;$(`pond-label-${i}`).style.top=`${pos.y}px`;$(`pond-label-${i}`).classList.toggle('full',level>=.12);});
 $('hold').textContent=expedition.phase==='sandbox'?'湿地已复苏':`${Math.min(12,expedition.holdProgress).toFixed(1)} / 12 s`;
 $('time').textContent=formatTime(expedition.elapsed);
 const p=expedition.player, wet=sim.depthAt(p.x,p.z)>.045;
 $('status').className=`status ${p.health}`;
 $('status-title').textContent=p.health==='healthy'?`可以施工 · ${wet?'浅水中':'岸上'}`:p.health==='bitten'?'被咬伤 · 请上岸':'岸上恢复 · 施工暂停';
 $('status-body').innerHTML=p.health==='bitten'?'沿最短的路走到没有水的地面。<br>干地上才会开始 10 秒恢复。':`<span class="recovery-number">${Math.ceil(p.recovery)}</span>秒<br>留在干地，重新入水会重置倒计时。`;
 $('recovery-fill').style.width=`${(1-p.recovery/10)*100}%`;
 document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(b=>b.disabled=!expedition.canBuild()&&expedition.phase!=='ready');
 if(expedition.phase==='sandbox')$('tip-text').textContent='试着拆开大坝，释放积水；或挖一个属于自己的小水塘。';
 else if(levels.every(v=>v>=.12))$('tip-text').textContent='两池都收到水了！保持池中水位，等待湿地复苏。';
 else if(expedition.edits>=2)$('tip-text').textContent='上游水位抬高后，挖开分岔两侧的浅褐色泥口。水到池塘需要一点时间。';
 else $('tip-text').textContent='在分岔下方横向放石头，看看上游会发生什么。';
 const hint=$('cursor-hint');hint.classList.toggle('visible',Boolean(hover&&active()));
 if(hover)hint.textContent=!expedition.canBuild()?'施工已锁定 · 先到干地恢复':sim.protectedCells[hover.index]?'泉眼 / 出口 · 保持畅通':!validTarget()?'走近一点 · 5.5 米内可以施工':`${names[pointer.button===2?'remove':tool]} · ${sim.depthAt(hover.x,hover.z)>.045?'水中':'地面'}${tool==='dig'?' · 长按连续挖掘':''}`;
}

$('start').addEventListener('click',start);
$('sound').addEventListener('click',()=>{void sound.start();sound.toggle();$('sound').textContent=sound.muted?'♪':'♫';$('sound').setAttribute('aria-label',sound.muted?'开启声音':'关闭声音');$('sound').style.opacity=sound.muted?'.55':'1';});
$('help').addEventListener('click',()=>{if(expedition.phase!=='won')openModal('help');});
$('pause').addEventListener('click',()=>{if(!active()&&expedition.phase!=='paused')return;if(modalKind)closeModal();else openModal('pause');});
document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(b=>b.addEventListener('click',()=>selectTool(b.dataset.tool as Tool)));
$('modal-content').addEventListener('click',e=>{const action=(e.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action;if(action==='resume')closeModal();if(action==='restart')reset();if(action==='confirm-restart')openModal('restart');if(action==='help')openModal('help');if(action==='sandbox'){expedition.continueSandbox();closeModal();notify('自由改造已开启。试试蓄水，再拆开一道坝。');}});
const canvas=world.renderer.domElement;
canvas.tabIndex=0;
canvas.setAttribute('aria-label','溪流游戏，WASD 移动，数字 1 到 4 选择工具，点击地面施工');
canvas.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;hover=world.pick(pointer.x,pointer.y);});
canvas.addEventListener('pointerdown',e=>{if(e.button!==0&&e.button!==2)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.down=true;pointer.button=e.button;hover=world.pick(pointer.x,pointer.y);canvas.setPointerCapture(e.pointerId);interact(true);});
canvas.addEventListener('pointerup',e=>{pointer.down=false;pointer.button=0;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);});
canvas.addEventListener('pointercancel',()=>{pointer.down=false;pointer.button=0;});
canvas.addEventListener('pointerleave',()=>{if(!pointer.down)hover=null;});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('keydown',e=>{if(e.code==='Tab'&&(!$('modal').hidden||!$('intro').hidden)){const host=!$('modal').hidden?$('modal'):$('intro');const buttons=Array.from(host.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));const index=buttons.indexOf(document.activeElement as HTMLButtonElement);e.preventDefault();buttons[(index+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();return;}if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.repeat)return;keys.add(e.code);if(['Digit1','Digit2','Digit3','Digit4'].includes(e.code))selectTool((['rock','soil','dig','remove'] as Tool[])[Number(e.code.slice(-1))-1]);if(e.code==='Escape'){if(modalKind&&modalKind!=='win')closeModal();else if(active())openModal('pause');}if(e.code==='KeyR'&&active())openModal('restart');});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>{keys.clear();resetTouchControls();pointer.down=false;if(active())openModal('pause');});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active())openModal('pause');});
bindTouchKeys(document.querySelectorAll<HTMLElement>('[data-move]'),touchKeys,b=>b.dataset.move!,active);
const forward=new Vector3(),right=new Vector3();
let previous=performance.now();
function frame(now:number) {
 const dt=Math.min((now-previous)/1000,.05);previous=now;gameClock+=dt;
 let ix=0,iz=0;if(hasKey('KeyW')||hasKey('ArrowUp'))iz+=1;if(hasKey('KeyS')||hasKey('ArrowDown'))iz-=1;if(hasKey('KeyD')||hasKey('ArrowRight'))ix+=1;if(hasKey('KeyA')||hasKey('ArrowLeft'))ix-=1;
 world.camera.getWorldDirection(forward);forward.y=0;forward.normalize();right.setFromMatrixColumn(world.camera.matrixWorld,0);right.y=0;right.normalize();
 const input={x:forward.x*iz+right.x*ix,z:forward.z*iz+right.z*ix};step(dt,input);
 if(pointer.down)interact();
 world.update(dt,gameClock,{player:expedition.player,snakes:expedition.snakes,hover:hover?{index:hover.index,tool:pointer.button===2?'remove':tool,valid:validTarget()}:null,paused:!active()});
 hudClock+=dt;if(hudClock>.08){drawHud();hudClock=0;}
 if(gameClock>toastUntil)$('toast').classList.remove('visible');$('damage').classList.toggle('show',gameClock<flashUntil);
 if(active()&&gameClock-lastBird>15){sound.play('bird');lastBird=gameClock;}
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.addEventListener('resize',()=>{world.resize();drawHud();});

// Explicit QA mode: deterministic state access for regression tests, absent in ordinary play.
if(new URLSearchParams(location.search).has('qa')) {
 Object.assign(window,{__riverTest:{sim,expedition,world,snapshot:()=>({phase:expedition.phase,player:{...expedition.player},snakes:expedition.snakes.map(s=>({...s})),levels:sim.basinLevels(),hold:expedition.holdProgress,edits:expedition.edits,bites:expedition.bites,elapsed:expedition.elapsed,revision:sim.revision}),step:(seconds:number)=>{for(let t=0;t<seconds;t+=.05)step(.05,{x:0,z:0});drawHud();},teleport:(x:number,z:number)=>{expedition.player.x=x;expedition.player.z=z;},bite:()=>expedition.bite(),reset,project:(x:number,z:number)=>world.project(x,z)}});
}


$('ui').insertAdjacentHTML('beforeend','<div class="tablet-actions" aria-label="触屏缩放"><button id="zoom-in" aria-label="放大视野">放大 ＋</button><button id="zoom-out" aria-label="缩小视野">缩小 −</button></div>');
for(const [id,factor] of [['zoom-in',1.15],['zoom-out',1/1.15]] as const)$(id).onclick=()=>{world.camera.zoom=Math.max(.72,Math.min(1.7,world.camera.zoom*factor));world.camera.updateProjectionMatrix();};
