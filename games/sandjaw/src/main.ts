import { installTouchControls, bindTouchKeys, resetTouchControls, registerTouchReset, isTouchControlsEnabled } from '../../../shared/touch';
import './style.css';
import {Game,HOME,ANCIENT,beach,dist,MAX_LENGTH,GROWTH_TO_MAX,TRIAL_LENGTH} from './game';
import {World} from './world';
import {Sound} from './audio';
import {relativeMovement,turnView,bearing,relativeBearing} from './first-person';

const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`
<canvas id="world" tabindex="0" aria-label="第三人称鳄鱼海岸，点击锁定鼠标，WASD 移动"></canvas>
<div class="vignette"></div><div id="damage-flash"></div><div id="underwater"></div><div id="sand-mask"></div><div id="water-drops"></div>
<header class="topbar"><a class="brand" href="#" aria-label="伏沙猎手"><svg viewBox="0 0 52 28"><path d="M2 18 13 6 33 4 50 11 43 19 17 24Z"/><circle cx="32" cy="8" r="2"/><path d="m17 17 25-5"/></svg><span>SANDJAW<small>伏沙猎手</small></span></a><div class="edition">G06 <span>/</span> THE TIDAL COAST</div><nav><button id="sound" title="声音 M" aria-label="关闭声音">♫</button><button id="help" title="操作说明 H" aria-label="操作说明">?</button><button id="pause" title="暂停 Esc" aria-label="暂停游戏">Ⅱ</button></nav></header>
<section id="intro"><div class="intro-content"><div class="eyebrow"><i></i> THIRD PERSON / 第三人称</div><h1>贴近水面。<br><em>屏住呼吸。</em></h1><p class="intro-desc">跟随鳄鱼，探索这片海岸。<br>沙粒间的脚步，水面上的动静，<br>以及深处，向你逼近的背鳍。</p><div class="intro-tags"><span>近身伏击</span><span>水下潜行</span><span>正面交锋</span></div><button id="start" class="primary">潜入海岸 <span>↗</span></button><div class="intro-note">鼠标环顾 <b>·</b> WASD 移动 <b>·</b> 左键咬击</div></div><div class="intro-caption"><span>01 / FOLLOW THE COASTAL HUNTER</span><strong>藏在潮线之下。</strong><div>人形伪装 · 沙中拖拽 · 海底藏身</div></div><footer class="intro-footer"><span>3D THIRD-PERSON SURVIVAL</span><span>探索自由，成长有界。</span></footer></section>
<div id="hud" hidden>
 <div class="mode-tag"><i id="mode-dot"></i><span id="mode-label">沙滩潜行</span><span id="elapsed">00:00</span></div><div id="compass"><span id="bearing">N · 000°</span><i></i><span id="navigation">静水巢穴</span></div>
 <div id="crosshair"><i></i><b></b></div><div id="focus-target"></div><div id="threat-warning"></div><div id="mouse-hint">点击画面锁定鼠标 · 或按住右键拖动环顾</div><div id="depth-label">THIRD PERSON</div>
 <section class="mission panel"><div class="section-top"><span>潮汐试炼</span><small>01 — 归巢之路</small></div><h2>长大，也要活下来。</h2><div class="objective" id="goal-growth"><i>01</i><span>成长到 12 米</span><b>3.2 / 12</b></div><div class="objective" id="goal-relic"><i>02</i><span>寻找海底遗物</span><b>0 / 3</b></div><div class="objective" id="goal-shark"><i>03</i><span>击退鲨鱼</span><b>0 / 2</b></div><div id="competition" class="competition">追逐战 · 捕食 0 / 逃脱 0</div><div id="return-goal">完成后，返回西侧的静水巢穴 <span>↗</span></div></section>
 <section class="wanted panel"><div class="section-top"><span>海岸警戒</span><b id="heat-label">平静</b></div><div class="heat-track"><div id="heat-bar"></div></div><p id="police-info">目击者会报警。行动后及时藏身。</p><div id="police-dots"></div></section>
 <section class="vitals panel"><div class="growth-top"><span>湾鳄 <small id="life-stage">幼年猎手</small></span><strong id="length">3.2<small>m</small></strong></div><div class="growth-track"><div id="growth-bar"></div></div><div class="growth-note"><span id="meal-count">捕食 0 · 伏击 0</span><span>体型上限 50 m</span></div><div class="vital"><span>生命</span><div><i id="health-bar"></i></div><b id="health-value">100</b></div><div class="vital stamina"><span>体力</span><div><i id="stamina-bar"></i></div><b id="stamina-value">100</b></div><div class="vital oxygen"><span>氧气</span><div><i id="oxygen-bar"></i></div><b id="oxygen-value">100</b></div><div class="vital hunger"><span>饱食</span><div><i id="hunger-bar"></i></div><b id="hunger-value">100</b></div></section>
 <section class="map panel"><div class="section-top"><span>潮汐海岸</span><small>N ↑</small></div><canvas id="minimap" width="432" height="256" aria-label="地图：黄色是行人，白色是遗物，红色是鲨鱼，绿色是巢穴"></canvas><div class="map-legend"><span>◇ 遗物</span><span>△ 鲨鱼</span><span>⌂ 巢穴</span></div></section>
 <div id="toast" role="status"></div><div id="target-label"></div>
 <div class="bottom-controls"><div id="context-hint">浅色沙滩可潜沙 · 水面外侧可下潜</div><div class="keys"><span><kbd>WASD</kbd>移动</span><span><kbd>Shift</kbd>冲刺</span><button id="bite-button"><kbd>左键 / Space</kbd>咬击</button><button id="bury-button"><kbd>E</kbd>潜沙</button><button id="dive-button"><kbd>Q</kbd>下潜</button><button id="disguise-button"><kbd>R</kbd>人形</button><button id="water-drag-button"><kbd>F</kbd>拖水</button><button id="sand-drag-button"><kbd>G</kbd>拖沙</button></div></div>
 <div class="touch-move"><button data-move="w" aria-label="向前">↑</button><button data-move="a" aria-label="向左">←</button><button data-move="s" aria-label="向后">↓</button><button data-move="d" aria-label="向右">→</button></div>
</div>
<section id="modal" hidden><div class="modal-card"><div class="eyebrow" id="modal-kicker">THE TIDAL COAST</div><h2 id="modal-title">暂停片刻</h2><p id="modal-desc"></p><div id="guide"><div><kbd>鼠标 / 方向键</kbd><span>环顾；点击画面锁定鼠标，Esc 释放并暂停</span></div><div><kbd>W A S D</kbd><span>面朝方向前进、后退、侧移；Shift 冲刺</span></div><div><kbd>左键 / 空格</kbd><span>朝向目标近身咬击，长按可连续攻击</span></div><div><kbd>E 潜沙 / 出沙</kbd><span>沙滩或海底都能藏进沙里，WASD 缓慢穿行</span></div><div><kbd>R 人形伪装</kbd><span>岸上变成人形接近行人；攻击、入水或潜沙时解除</span></div><div><kbd>F / G 拖拽</kbd><span>3.8 米内朝向行人，F 拖入水中，G 拖入沙子</span></div><div><kbd>Q 下潜 / 上浮</kbd><span>进入深水后切换，氧气耗尽会强制上浮</span></div><p>如果浏览器不支持锁定鼠标，可以按住右键拖动环顾，或用方向键转头。触屏左侧方向键移动、右侧画面拖动环顾。</p><div class="view-settings"><label>视野 <output id="fov-value">82°</output><input id="fov" type="range" min="65" max="100" value="82" aria-label="视野角度"/></label><label>鼠标灵敏度 <input id="sensitivity" type="range" min="9" max="40" value="22" aria-label="鼠标灵敏度"/></label><label class="comfort"><input id="comfort" type="checkbox"/>舒适视角（关闭冲刺视角变化）</label></div><p>橙色标记正在报警。4.5 秒内捕获报警者可以中断；电话完成 14 秒后警察到场，警力依次为 3 / 5 / 7 人，最多七人。幼年时超过五名需藏身 13 秒；长到 12 米后可咬退盾牌警察。</p><p>行人发现你会逃跑并左右闪避，潜沙靠近更容易伏击。追逐战记录捕食与逃脱次数。鲨鱼蓄力时根据方向警告侧移闪避，再趁恢复期咬击。成长至 12 米、收集 3 枚遗物、击退 2 条鲨鱼后回西侧巢穴。长到 9 米后巨鳄会让开；试炼完成后还可继续长到 50 米。H 查看说明，M 切换声音。</p></div><div id="result-stats"></div><div class="modal-actions"><button id="resume" class="primary">继续潜行 <span>↗</span></button><button id="restart" class="secondary">重新开始</button></div></div></section>
`;
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
let game=new Game();let world:World;
try{world=new World($<HTMLCanvasElement>('world'));}catch(e){$('intro').innerHTML='<div class="modal-card"><h2>无法启动三维画面</h2><p>请使用支持 WebGL 的浏览器，并开启硬件加速后重新加载。</p></div>';throw e;}
game.obstacles=world.obstacles;
const sound=new Sound();const keys=new Set<string>();const touchKeys=new Set<string>();const hasKey=(key:string)=>keys.has(key)||touchKeys.has(key);installTouchControls();let guideOpen=false;let previousPhase:Game['phase']='ready';let modalPhase='';
const canvas=$<HTMLCanvasElement>('world');let locked=false,mouseBite=false,dragging=false,sensitivity=.0022,unlockAt=-1000;let pointerMode='键盘 / 拖动';
const release=()=>{keys.clear();resetTouchControls();mouseBite=false;dragging=false;if(document.pointerLockElement)document.exitPointerLock();};
function capture(){if(game.phase!=='playing'||isTouchControlsEnabled())return;try{Promise.resolve(canvas.requestPointerLock()).catch(()=>{pointerMode='拖动环顾';});}catch{pointerMode='拖动环顾';}}
const map=$<HTMLCanvasElement>('minimap').getContext('2d')!;
function start(){game.start();keys.clear();resetTouchControls();sound.init();guideOpen=false;renderUI();capture();}
function restart(){game=new Game();game.obstacles=world.obstacles;world.reset();start();}
function help(){if(guideOpen){resume();return;}if(game.phase==='won'||game.phase==='lost')return;previousPhase=game.phase==='paused'?'playing':game.phase;if(game.phase==='playing')game.phase='paused';guideOpen=true;release();renderUI();}
function resume(){if(game.phase==='won')game.continueExploring();else if(guideOpen){game.phase=previousPhase;guideOpen=false;}else if(game.phase==='paused')game.phase='playing';keys.clear();resetTouchControls();renderUI();if(game.phase==='playing')capture();}
function pause(){if(guideOpen)resume();else if(game.phase==='playing'){game.phase='paused';release();renderUI();}else if(game.phase==='paused')resume();}
function mute(){const muted=sound.mute();$('sound').textContent=muted?'♪':'♫';$('sound').classList.toggle('muted',muted);$('sound').setAttribute('aria-label',muted?'开启声音':'关闭声音');}
$('start').onclick=start;$('restart').onclick=restart;$('resume').onclick=resume;$('help').onclick=help;$('pause').onclick=pause;$('sound').onclick=mute;
$('disguise-button').onclick=()=>game.disguise();$('water-drag-button').onclick=()=>game.drag('water');$('sand-drag-button').onclick=()=>game.drag('sand');$('bite-button').onclick=()=>game.bite();$('bury-button').onclick=()=>game.bury();$('dive-button').onclick=()=>game.dive();
document.querySelector('.brand')!.addEventListener('click',e=>e.preventDefault());
window.addEventListener('keydown',e=>{
  const key=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(key))e.preventDefault();keys.add(key);if(e.repeat)return;
  if(key==='r')game.disguise();if(key==='f')game.drag('water');if(key==='g')game.drag('sand');if(key==='e')game.bury();if(key==='q')game.dive();if(key===' ')game.bite();if(key==='escape'&&performance.now()-unlockAt>250)pause();if(key==='h')help();if(key==='m')mute();
});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{keys.clear();resetTouchControls();mouseBite=false;dragging=false;});document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.phase==='playing'){game.phase='paused';release();renderUI();}});
document.addEventListener('pointerlockchange',()=>{const before=locked;locked=document.pointerLockElement===canvas;pointerMode=locked?'鼠标锁定':'键盘 / 拖动';if(before&&!locked){unlockAt=performance.now();if(game.phase==='playing'){game.phase='paused';keys.clear();resetTouchControls();mouseBite=false;renderUI();}}});
function look(dx:number,dy:number){if(game.phase!=='playing')return;const view=turnView(game.heading,world.pitch,dx,dy,sensitivity);game.heading=view.heading;world.pitch=view.pitch;}
window.addEventListener('mousemove',e=>{if(locked||dragging)look(e.movementX,e.movementY);});
canvas.addEventListener('mousedown',e=>{if(game.phase!=='playing')return;if(e.button===2){dragging=true;pointerMode='拖动环顾';e.preventDefault();}else if(e.button===0){if(locked){mouseBite=true;game.bite();}else capture();}});
window.addEventListener('mouseup',e=>{if(e.button===0)mouseBite=false;if(e.button===2)dragging=false;});canvas.addEventListener('contextmenu',e=>e.preventDefault());
let touchX=0,touchY=0,lookPointer:number|null=null;canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&game.phase==='playing'&&lookPointer===null){lookPointer=e.pointerId;canvas.setPointerCapture(e.pointerId);touchX=e.clientX;touchY=e.clientY;}});canvas.addEventListener('pointermove',e=>{if(e.pointerId===lookPointer){look((e.clientX-touchX)*1.7,(e.clientY-touchY)*1.7);touchX=e.clientX;touchY=e.clientY;}});for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,e=>{if((e as PointerEvent).pointerId===lookPointer)lookPointer=null;});registerTouchReset(()=>lookPointer=null);
$<HTMLInputElement>('fov').oninput=e=>{world.fov=Number((e.target as HTMLInputElement).value);$('fov-value').textContent=world.fov+'°';};
$<HTMLInputElement>('sensitivity').oninput=e=>sensitivity=Number((e.target as HTMLInputElement).value)/10000;
$<HTMLInputElement>('comfort').checked=world.comfortable;$<HTMLInputElement>('comfort').onchange=e=>world.comfortable=(e.target as HTMLInputElement).checked;
$('bite-button').dataset.touchKey=' ';document.querySelector('.touch-move')!.insertAdjacentHTML('beforeend','<button data-touch-key="shift" aria-label="按住冲刺">冲刺</button>');
bindTouchKeys(document.querySelectorAll<HTMLElement>('[data-move],[data-touch-key]'),touchKeys,b=>b.dataset.move??b.dataset.touchKey!,()=>game.phase==='playing');
function drawMap(){
  const c=map;const W=432,H=256;const px=(x:number)=>(x+60)/120*W,pz=(z:number)=>(z+27)/70*H;
  c.clearRect(0,0,W,H);c.fillStyle='#246d6b';c.fillRect(0,0,W,H);c.beginPath();c.moveTo(0,0);c.lineTo(W,0);for(let x=60;x>=-60;x-=2)c.lineTo(px(x),pz(beach(x)));c.closePath();c.fillStyle='#aaae83';c.fill();
  c.beginPath();for(let x=-60;x<=60;x+=2){const p=[px(x),pz(beach(x))];if(x===-60)c.moveTo(p[0],p[1]);else c.lineTo(p[0],p[1]);}c.strokeStyle='#dfd3a5';c.lineWidth=5;c.stroke();
  for(const f of game.foods)if(f.active&&f.kind==='relic'){c.save();c.translate(px(f.x),pz(f.z));c.rotate(Math.PI/4);c.fillStyle='#e5f7cf';c.fillRect(-4,-4,8,8);c.restore();}
  for(const s of game.sharks)if(s.hp>0){c.beginPath();c.moveTo(px(s.x),pz(s.z)-5);c.lineTo(px(s.x)-4,pz(s.z)+4);c.lineTo(px(s.x)+4,pz(s.z)+4);c.fillStyle='#ed9874';c.fill();}
  for(const h of game.humans)if(h.alive){c.fillStyle=h.state==='call'?'#f17951':'#edce8e';c.fillRect(px(h.x)-1.5,pz(h.z)-1.5,3,3);}
  for(const p of game.police){c.fillStyle='#7ac6fc';c.fillRect(px(p.x)-3,pz(p.z)-3,6,6);}
  c.beginPath();c.arc(px(HOME.x),pz(HOME.z),10,0,Math.PI*2);c.strokeStyle='#c7e68b';c.lineWidth=2;c.stroke();c.font='18px sans-serif';c.fillStyle='#dff0af';c.fillText('⌂',px(HOME.x)-7,pz(HOME.z)+6);
  c.beginPath();c.arc(px(ANCIENT.x),pz(ANCIENT.z),15,0,Math.PI*2);c.fillStyle='#d6a56850';c.fill();
  c.save();c.translate(px(game.x),pz(game.z));c.rotate(-game.heading);c.beginPath();c.moveTo(0,8);c.lineTo(-5,-6);c.lineTo(0,-3);c.lineTo(5,-6);c.closePath();c.fillStyle='#f1ffaa';c.shadowColor='#ecffa5';c.shadowBlur=9;c.fill();c.restore();
}
function renderUI(){
  $('intro').hidden=game.phase!=='ready'||guideOpen;$('hud').hidden=game.phase==='ready';
  const modal=guideOpen||['paused','won','lost'].includes(game.phase);$('modal').hidden=!modal;
  $('pause').hidden=game.phase==='ready';$('damage-flash').style.opacity=String(game.hurt*.65);$('underwater').style.opacity=String(world.under*.25);$('sand-mask').classList.toggle('active',game.sandHidden&&game.phase!=='ready');$('water-drops').classList.toggle('active',game.mode==='surface');
  if(game.phase!=='playing'&&document.pointerLockElement)release();
  $('mouse-hint').hidden=locked;$('crosshair').classList.toggle('biting',game.biteAnim>0);$('depth-label').textContent=game.mode==='seabed-buried'?'SEABED HIDE / 海底沙藏':game.submerged?'DEPTH 2.6 m / 海底':game.sandHidden?'CONCEALED / 沙中穿行':'THIRD PERSON / 第三人称';
  const degrees=bearing(game.heading);const compassNames=['N 北','NE 东北','E 东','SE 东南','S 南','SW 西南','W 西','NW 西北'];$('bearing').textContent=compassNames[Math.round(degrees/45)%8]+' · '+Math.round(degrees).toString().padStart(3,'0')+'°';$('navigation').textContent=`巢穴 ${Math.round(dist(game,HOME))} m`;
  const candidates=[...game.humans.filter(h=>h.alive&&!game.submerged).map(h=>({...h,label:h.state==='call'?'正在报警的目击者':'海岸行人'})),...game.sharks.filter(s=>s.hp>0&&(game.mode==='surface'||game.submerged)).map(s=>({...s,label:`鲨鱼 · ${s.hp}/4`})),...game.foods.filter(f=>f.active&&f.deep===(game.submerged)&&(game.mode==='surface'||game.submerged)).map(f=>({...f,label:f.kind==='relic'?'潮汐遗物':f.deep?'海底贝类':'水面鱼群'})),...game.police.filter(()=>!game.hidden).map(p=>({...p,label:game.powerfulPolice?'盾牌防线 · 需要躲避':'警察 · 可咬退'}))].filter(p=>dist(game,p)<12&&Math.abs(relativeBearing(game.heading,p.x-game.x,p.z-game.z))<.3).sort((a,b)=>dist(game,a)-dist(game,b));
  const focus=candidates[0];$('focus-target').textContent=focus?`${focus.label} · ${dist(game,focus).toFixed(1)} m${game.inReach(focus,game.biteRange,game.sandHidden)?' · 咬击':''}`:'';$('crosshair').classList.toggle('target',!!focus&&dist(game,focus)<game.biteRange);
  const threat=game.sharks.find(s=>s.hp>0&&(s.state==='windup'||s.state==='charge')&&dist(game,s)<15);$('threat-warning').hidden=!threat||game.hidden&&!game.submerged;
  if(threat){const angle=relativeBearing(game.heading,threat.x-game.x,threat.z-game.z);$('threat-warning').textContent=`${Math.abs(angle)<.65?'正前方':Math.abs(angle)>2.4?'身后':angle>0?'左侧':'右侧'}鲨鱼${threat.state==='windup'?'蓄力中 · 侧移闪避':'正在冲撞！'}`;}
  if(modal){
    const phase=guideOpen?'guide':game.phase;if(phase!==modalPhase){modalPhase=phase;
      $('guide').hidden=!guideOpen&&game.phase!=='paused';$('result-stats').hidden=game.phase==='paused'||guideOpen;
      $('modal-kicker').textContent=game.phase==='won'?'THE COAST REMEMBERS':game.phase==='lost'?'THE TIDE TURNS':'FIELD GUIDE / 海岸生存手册';
      $('modal-title').textContent=guideOpen?'潜行指南':game.phase==='won'?'潮汐之王，归巢。':game.phase==='lost'?'这次，海岸赢了。':'在潮声中，歇一会儿。';
      $('modal-desc').textContent=game.phase==='won'?'你完成了潮汐试炼。继续探索、进食，还可以长成 50 米巨鳄。':game.phase==='lost'?game.lossReason:'沙里等待，水下消失。选好时机再出击。';
      $('resume').hidden=game.phase==='lost';$('resume').innerHTML=game.phase==='won'?'继续探索 <span>↗</span>':previousPhase==='ready'&&guideOpen?'返回海岸 <span>↗</span>':'继续潜行 <span>↗</span>';
      $('result-stats').innerHTML=`<div><strong>${game.eaten}</strong>捕食</div><div><strong>${game.ambushes}</strong>沙地伏击</div><div><strong>${game.sharksDefeated}</strong>击退鲨鱼</div><div><strong>${Math.floor(game.elapsed/60)}:${String(Math.floor(game.elapsed%60)).padStart(2,'0')}</strong>生存时间</div>`;
    }
  }else modalPhase='';
  $('competition').textContent=`追逐战 · 捕食 ${game.eaten} / 逃脱 ${game.humanEscapes}`;
  const modes={land:'沙滩潜行',surface:'水面游弋',underwater:'海底探索',buried:'沙中伏击','seabed-buried':'海底沙藏'};
  $('mode-label').textContent=game.disguised?'人形伪装':modes[game.mode];$('mode-dot').style.background=game.hidden?'#dfd49a':'#cbe88e';$('elapsed').textContent=`${Math.floor(game.elapsed/60).toString().padStart(2,'0')}:${Math.floor(game.elapsed%60).toString().padStart(2,'0')}`;
  $('length').innerHTML=`${game.length.toFixed(1)}<small>m</small>`;$('life-stage').textContent=game.length>=25?'巨型猎手':game.length>=12?'海岸霸主':game.length>4.5?'成熟猎手':'幼年猎手';$('growth-bar').style.width=`${Math.min(100,game.growth/GROWTH_TO_MAX*100)}%`;$('meal-count').textContent=`捕食 ${game.eaten} · 伏击 ${game.ambushes}`;
  for(const key of ['health','stamina','oxygen','hunger'] as const){$(key+'-bar').style.width=(game[key]/(key==='health'?game.maxHealth:100)*100)+'%';$(key+'-value').textContent=String(Math.ceil(game[key]));}
  ['growth','relic','shark'].forEach((id,i)=>{const el=$('goal-'+id);el.classList.toggle('done',game.objectives[i]);el.querySelector('b')!.textContent=[`${game.length.toFixed(1)} / ${TRIAL_LENGTH}`,`${game.relics} / 3`,`${game.sharksDefeated} / 2`][i];});
  $('return-goal').classList.toggle('active',game.readyToReturn);$('return-goal').innerHTML=game.freeRoam?'试炼已完成 · 可继续长到 50 米 <span>∞</span>':game.readyToReturn?'全部完成！返回西侧静水巢穴 <span>↖</span>':'完成后，返回西侧的静水巢穴 <span>↗</span>';
  const callers=game.humans.filter(h=>h.alive&&h.state==='call');
  $('heat-bar').style.width=game.heat+'%';$('heat-label').textContent=game.police.length?'追捕中':game.policeETA>=0?'已报警':callers.length?'被目击':game.heat>15?'受惊':'平静';
  $('police-info').textContent=game.police.length?(game.powerfulPolice?`${game.police.length} 名警察 · 防线无法咬退`:`${game.police.length} 名警察 · 可以逐个制服`)+(game.hidden?` · 藏身 ${Math.max(0,13-Math.floor(game.hiddenTime))} 秒后撤离`:''):game.policeETA>=0?`增援到场倒计时 ${Math.ceil(game.policeETA)} 秒`:callers.length?'橙色标记正在报警 · 靠近咬击可阻止':'潜沙或下潜，甩开追捕。';
  $('police-dots').innerHTML=game.police.map((_,i)=>`<i class="${i>=5?'danger':''}"></i>`).join('');
  $('toast').textContent=game.message;$('toast').classList.toggle('visible',game.messageTime>0);
  $('context-hint').textContent=game.dragging?`正在${game.dragging.kind==='water'?'拖入水中':'拖进沙里'} · ${(game.dragging.duration-game.dragging.elapsed).toFixed(1)} 秒`:game.disguised?'人形伪装 · F 拖水 / G 拖沙 / 空格吞食':game.sandHidden?'已隐蔽 · WASD 沙中慢行 / E 出沙 / Q 上浮':game.submerged?(game.oxygen<25?'氧气不足！按 Q 上浮':'E 藏进海底沙子 · 空格拾取遗物与贝类'):game.mode==='surface'?'深水处按 Q 下潜 · 鱼群可以补血':game.powerfulPolice?'不要硬拼，立刻按 E 藏进沙里！':'R 人形伪装 · F 拖水 / G 拖沙 · E 潜沙';
  $('disguise-button').classList.toggle('selected',game.disguised);$('bury-button').classList.toggle('selected',game.sandHidden);$('dive-button').classList.toggle('selected',game.submerged);$('bite-button').classList.toggle('cooldown',game.biteCooldown>.15);
  const target=$('target-label');const nearest=callers.sort((a,b)=>dist(game,a)-dist(game,b))[0];target.hidden=true;
  if(nearest&&dist(game,nearest)<23){const p=world.project(nearest.x,2.4,nearest.z);if(p.visible&&p.x>170&&p.x<innerWidth-220&&p.y>140&&p.y<innerHeight-150){target.hidden=false;target.style.left=p.x+'px';target.style.top=p.y+'px';target.textContent=`◉ 报警中 ${Math.max(0,nearest.timer).toFixed(1)}s`;}}
  drawMap();
}
let last=performance.now(),uiTime=0;
function frame(now:number){const dt=Math.min((now-last)/1000,.05);last=now;
  if(game.phase==='playing'){game.heading+=(Number(hasKey('arrowleft'))-Number(hasKey('arrowright')))*dt*1.7;world.pitch=Math.max(-1.12,Math.min(1.08,world.pitch+(Number(hasKey('arrowup'))-Number(hasKey('arrowdown')))*dt*1.25));}
  const movement=relativeMovement(Number(hasKey('w'))-Number(hasKey('s')),Number(hasKey('d'))-Number(hasKey('a')),game.heading);
  game.step(dt,{...movement,sprint:hasKey('shift'),facing:game.heading});
  if((hasKey(' ')||mouseBite)&&game.phase==='playing')game.bite();sound.environment(world.under,game.sandHidden);while(game.sounds.length)sound.play(game.sounds.shift()!);
  world.update(game,dt);uiTime+=dt;if(uiTime>.075){renderUI();uiTime=0;}requestAnimationFrame(frame);
}
renderUI();requestAnimationFrame(frame);
const debug={snapshot:()=>({...game.snapshot(),fps:world.fps,view:{type:'third-person',camera:world.camera.position.toArray(),pitch:world.pitch,fov:world.camera.fov,near:world.camera.near,locked,pointerMode,muzzle:world.muzzle.root.visible,playerVisible:world.player.root.visible,sandVisible:world.sand.visible,disguiseVisible:world.disguise.root.visible,playerScale:world.player.root.scale.toArray(),comfortable:world.comfortable},render:{calls:world.renderCalls,triangles:world.renderTriangles}})};
// Mutating scenario helpers are intentionally available only with ?qa=1.
Object.defineProperty(window,'__sandjaw',{value:new URLSearchParams(location.search).has('qa')?{...debug,get game(){return game;},advance:(seconds:number)=>{for(let i=0;i<Math.ceil(seconds/.025);i++)game.step(.025);renderUI();}}:debug});
