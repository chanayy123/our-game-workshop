import { installTouchControls, bindTouchKeys, bindHold, resetTouchControls, registerTouchReset } from '../../../shared/touch';
import * as THREE from 'three';
import { Game, MAX_DEPTH, MAX_SPEED } from './game.ts';
import { OceanWorld } from './ocean.ts';
import { SharkSystem } from './sharks.ts';
import { createVessel } from './vessel.ts';
import { SeaAudio } from './audio.ts';
import { ShoreWorld } from './shore.ts';
import { VesselDamage } from './damage.ts';
import {ISLANDS,landHeight} from './islands.ts';
import type { SharkEvent } from './contracts.ts';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/700.css';
import './style.css';

const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`
  <main id="experience" aria-label="Shark Sea Survival 三维游戏">
    <div id="viewport"></div><div id="vignette"></div><div id="waterline"></div><div id="damage"></div>
    <header id="brand"><span class="brand-mark">〰</span><span>PELAGIC<span class="brand-sub">EXPEDITION 05</span></span></header>
    <div id="utility"><button id="sound" title="切换声音" aria-label="切换声音">声音 开</button><button id="help" title="操作指南" aria-label="操作指南">?</button><button id="pause" title="暂停" aria-label="暂停">Ⅱ</button></div>
    <section id="hud" hidden>
      <div id="objective"><span class="eyebrow">NORTH CAPE · 北岬灯塔</span><div>穿越白鲨海峡 <span id="distance">1.80 km</span></div><div class="route-track"><i id="route-fill"></i></div></div>
      <div id="compass"><div class="compass-ticks">W <span>· · · ·</span> N <span>· · · ·</span> E</div><div id="bearing">◆</div><small id="bearing-label">目标正前方</small></div>
      <div id="integrity"><div><span>船体</span><i><b id="hull-bar"></b></i><em id="hull-value">100</em></div><div id="cage-integrity"><span>笼架</span><i><b id="cage-bar"></b></i><em id="cage-value">100</em></div></div>
      <div id="encounter"><i></i><span id="encounter-label">附近水域平静</span></div>
      <div id="crosshair"><i></i><i></i><i></i><i></i><b></b></div><div id="hit-marker">×</div>
      <div id="toast" role="status" aria-live="polite"></div>
      <div id="bottom-left"><div id="mode-label" class="eyebrow">HELM / 驾驶位</div><div id="readout"><strong id="primary-number">0.0</strong><span id="primary-unit">节</span><small id="secondary-number">油门 0%</small></div><div id="depth-track"><i></i></div></div>
      <div id="bottom-center"><button id="interact"><kbd>E</kbd><span>离开驾驶位</span></button><button id="dock"><kbd>B</kbd><span>寻找小岛</span></button><div id="controls-hint"></div></div>
      <div id="supplies">木材 <b id="wood-count">0</b><span id="island-guide"></span></div>
      <div id="weapon-status"><span class="eyebrow" id="weapon-name">01 / 压缩气动鱼枪</span><div id="ammo">5 <span>/ ∞</span></div><small id="weapon-hint">R 装填 · 2 潜水刀</small></div>
      <div id="voyage"><span id="voyage-time">00:00</span><i></i><span id="voyage-zone">沿岸浅海</span></div>
    </section>
    <section id="intro" class="screen">
      <div class="intro-content"><span class="eyebrow intro-kicker"><i></i> SOUTHERN OCEAN / 34° S</span><h1>SHARK SEA<br/><span>SURVIVAL</span></h1><div class="intro-title">白 鲨 海 峡</div><p class="intro-description">一艘捕捞船。一段无人护航的航程。<br/>海面之下，是它们的领地。</p><div class="intro-rule"></div><p class="intro-mission">驾驶「晨潮号」抵达北岬灯塔。<br/>靠岛伐木修船，放下铁笼，潜入它们的领地。</p><button id="start" class="primary">启航 <span>→</span></button><div class="intro-meta">约 5–10 分钟探索 <span>·</span> 自由下潜 <span>·</span> 建议佩戴耳机</div></div>
      <div class="intro-side"><span>OPEN WATER</span><i></i><span>01 — 05</span></div><div class="intro-bottom"><span>一段可亲自经历的海洋冒险</span><span>WASD 驾驶 / 移动 <i>·</i> 鼠标环顾</span></div>
    </section>
    <section id="modal" class="screen" hidden><div class="modal-card"><span id="modal-eyebrow" class="eyebrow">EXPEDITION PAUSED</span><h2 id="modal-title">海峡会等你</h2><p id="modal-copy"></p><div id="modal-stats"></div><div id="guide"></div><button id="resume" class="primary">继续航程 <span>→</span></button><button id="restart" class="secondary">重新启航</button></div></section>
    <div id="loading">正在准备海域…</div>
  </main>`;
const el=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const game=new Game();const audio=new SeaAudio();
const scene=new THREE.Scene();
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.35));renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
el('viewport').appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','海洋游戏画面');renderer.domElement.tabIndex=0;
const camera=new THREE.PerspectiveCamera(64,window.innerWidth/window.innerHeight,.08,12000);scene.add(camera);
const ocean=new OceanWorld(scene,renderer);
const vessel=createVessel();scene.add(vessel.root,vessel.cage);camera.add(vessel.weapon,vessel.knife);
const shore=new ShoreWorld(scene);camera.add(shore.axe);shore.axe.visible=false;
const wear=new VesselDamage(vessel.root,vessel.cage);
const boatPosition=new THREE.Vector3();const cagePosition=new THREE.Vector3();
const temp=new THREE.Vector3();const direction=new THREE.Vector3();const cameraTarget=new THREE.Vector3();const cameraDesired=new THREE.Vector3();
let splashShake=0,threat=0,ambientTime=0,lastMode=game.mode,lastPhase=game.phase,transition=0,attackAnim=0;
let viewYaw=0,viewPitch=.2,helmFirstPerson=false,drag=false,lastMouseX=0,lastMouseY=0,muted=false,guideOpen=false,returnToIntro=false;
let nearest=999,lastHUD=0,frameCount=0,frameSum=0,fps=60;
let navIsland=false;
const keys=new Set<string>();const touchKeys=new Set<string>();const hasKey=(key:string)=>keys.has(key)||touchKeys.has(key);installTouchControls();
const projectiles:{mesh:THREE.Mesh,velocity:THREE.Vector3,life:number}[]=[];
const spearGeo=new THREE.CylinderGeometry(.012,.016,1.7,5);spearGeo.rotateX(Math.PI/2);
const spearMat=new THREE.MeshStandardMaterial({color:0xb0c4c2,metalness:.9,roughness:.3});

function sharkEvent(event:SharkEvent){
  if(event.type==='splash'){ocean.splash(event.position,event.amount??1);audio.play('splash');}
  if(event.type==='breach'){game.stats.breaches++;audio.play('breach');game.notify('破水！大白鲨正在船旁跃出海面。',4);splashShake=.35;}
  if(event.type==='threat'&&game.phase==='playing'){threat=1;game.notify(event.message??'白鲨正在加速接近。',3);}
  if(event.type==='impact'){const was=game.mode;game.damage(event.amount??8,event.target??'boat');if(was==='cage'&&game.mode==='dragged'){sharks.beginDrag(cagePosition);audio.play('cagebreak');}audio.play('impact');splashShake=.8;}
  if(event.type==='hit'||event.type==='kill')audio.play('hit');
}
const sharks=new SharkSystem(scene,sharkEvent);

function reset(){
  game.start();sharks.reset();ocean.reset();keys.clear();resetTouchControls();viewYaw=0;viewPitch=.2;helmFirstPerson=false;
  lastMode='helm';lastPhase='playing';guideOpen=false;returnToIntro=false;threat=0;splashShake=0;transition=1;navIsland=false;
  for(const p of projectiles)scene.remove(p.mesh);projectiles.length=0;
  el('intro').hidden=true;el('modal').hidden=true;el('hud').hidden=false;
  el('resume').innerHTML='继续航程 <span>→</span>';
  void audio.start();renderer.domElement.focus({preventScroll:true});updateHUD();
}
function interact(){
  const before=game.mode;game.interact();
  if(game.mode!==before){
    transition=1;audio.play('enter');
    if(game.mode==='cage'){viewYaw=game.heading+Math.PI/2;viewPitch=-.04;}
    else if(game.mode==='deck'){viewYaw=game.heading+(before==='cage'?-.3:2.15);viewPitch=-.12;}
    else {viewYaw=0;viewPitch=.2;}
  }
  updateHUD();
}
function fire(){
  if(game.mode==='shore'){
    const t=game.nearbyTree,old=t?.hits??0;
    if(game.chop()){attackAnim=1;audio.play('knife');if(t&&t.hits>old){shore.strike(t.x,t.z,t.islandId);audio.play('chop');if(t.hits===3)audio.play('timber');}}
    updateHUD();return;
  }
  if(!game.fire())return;
  attackAnim=1;camera.getWorldDirection(direction);
  const origin=camera.position.clone();
  const result=sharks.attack(origin,direction.clone(),game.weapon);
  audio.play(game.weapon==='speargun'?'shot':'knife');
  if(result.hit){game.registerHit(result.killed);threat=Math.min(threat,.3);}
  else if(game.weapon==='knife')game.notify('刀刃挥空 · 等它接近笼边再出手',1.2);
  if(game.weapon==='speargun'){
    const mesh=new THREE.Mesh(spearGeo,spearMat);mesh.position.copy(origin).addScaledVector(direction,1.1);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),direction);
    scene.add(mesh);projectiles.push({mesh,velocity:direction.clone().multiplyScalar(55),life:Math.min(1.1,result.hit?result.distance/55:.95)});
  }
  updateHUD();
}
function dock(){
  const before=game.mode;game.dock();
  if(game.mode==='shore'&&before!=='shore'){const i=ISLANDS[game.islandId];viewYaw=Math.atan2(i.x-game.shoreX,i.z-game.shoreZ);viewPitch=-.08;transition=1;navIsland=true;audio.play('enter');}
  else if(before==='shore'&&game.mode==='deck'){viewYaw=game.heading;viewPitch=-.08;transition=1;navIsland=game.hull<75;}
  else if(game.dockDistance>19)navIsland=true;
  updateHUD();
}
const guideHTML=`<div class="guide-grid"><div><b>驾驶 / 航行</b><p><kbd>W</kbd> 加油门 <kbd>S</kbd> 减油门 / 倒车<br/><kbd>A</kbd> <kbd>D</kbd> 转向 <kbd>空格</kbd> 停船<br/><kbd>E</kbd> 停稳后离开驾驶位<br/><kbd>V</kbd> 驾驶视角切换</p></div><div><b>甲板 / 潜水笼</b><p><kbd>WASD</kbd> 行走，靠近潜笼 / 舵台按 <kbd>E</kbd><br/>甲板按住 <kbd>R</kbd> 消耗木材修船 / 修笼<br/>笼中 <kbd>W</kbd> 下潜 <kbd>S</kbd> 上浮<br/>海面按 <kbd>E</kbd> 返回甲板，无氧气限制</p></div><div><b>观察 / 防御</b><p>按住鼠标右键拖动 / 方向键环顾<br/><kbd>1</kbd> 鱼枪 <kbd>2</kbd> 潜水刀<br/><kbd>左键</kbd> 或 <kbd>F</kbd> 攻击 <kbd>R</kbd> 装填<br/>白鲨蓄势后扑咬；笼破会被拖入深海</p></div><div><b>小岛 / 伐木修船</b><p>靠近挂旗码头，停船按 <kbd>B</kbd> 上岸<br/>工具架 <kbd>E</kbd> 拿斧，<kbd>F / 左键</kbd> 砍三次<br/>倒木 <kbd>E</kbd> 收集，码头按住 <kbd>R</kbd> 修复<br/>回码头 <kbd>B</kbd> 登船；破船仍可应急划桨</p></div></div>`;
function showModal(help=false){
  guideOpen=help;el('modal').hidden=false;el('intro').hidden=true;
  const win=game.phase==='won',lost=game.phase==='lost';
  el('modal-eyebrow').textContent=win?'NORTH CAPE · SAFE ARRIVAL':lost?'EXPEDITION LOST':help?'FIELD GUIDE / 航行手册':'EXPEDITION PAUSED';
  el('modal-title').textContent=win?'你穿过了它们的海。':lost?'海峡留下了这次航程。':help?'深入它们的世界':'海峡会等你';
  el('modal-copy').textContent=win?'北岬灯塔就在眼前。引擎终于可以慢下来，而那些庞大的身影仍在深蓝中巡游。':lost?game.reason:help?'航向灯塔，或随时抛锚下潜。保持警觉，也给这些大型动物留出空间。':'引擎、海浪与深处的影子，暂时停在这一刻。';
  el('guide').innerHTML=help?guideHTML:'';
  el('modal-stats').innerHTML=win||lost?`<div><b>${formatTime(game.elapsed)}</b><span>航程时间</span></div><div><b>${Math.round(game.stats.maxDepth)} <small>m</small></b><span>最深下潜</span></div><div><b>${game.stats.hits}</b><span>有效命中</span></div><div><b>${game.stats.breaches}</b><span>跃水目击</span></div>`:'';
  el('resume').hidden=win||lost;el('restart').textContent=win||lost?'再次启航':'重新启航';
  if(win||lost)el('restart').classList.add('primary');else el('restart').classList.remove('primary');
  if(document.pointerLockElement)document.exitPointerLock();keys.clear();resetTouchControls();drag=false;
}
function pause(help=false){if(game.phase==='ready'){returnToIntro=true;game.phase='paused';showModal(true);el('resume').textContent='返回主菜单';return;}if(game.phase==='playing')game.pause();if(game.phase==='paused')showModal(help);}
function resume(){if(game.phase==='paused'){el('modal').hidden=true;keys.clear();resetTouchControls();if(returnToIntro){game.phase='ready';returnToIntro=false;el('intro').hidden=false;el('hud').hidden=true;el('resume').innerHTML='继续航程 <span>→</span>';return;}game.phase='playing';el('hud').hidden=false;guideOpen=false;renderer.domElement.focus({preventScroll:true});void audio.start();}}
el('start').addEventListener('click',reset);el('restart').addEventListener('click',reset);el('resume').addEventListener('click',resume);
el('interact').addEventListener('click',()=>{interact();renderer.domElement.focus({preventScroll:true});});
el('dock').addEventListener('click',()=>{dock();renderer.domElement.focus({preventScroll:true});});
el('pause').addEventListener('click',()=>game.phase==='paused'?resume():pause());el('help').addEventListener('click',()=>pause(true));
el('sound').addEventListener('click',()=>{muted=!muted;audio.setMuted(muted);el('sound').textContent=muted?'声音 关':'声音 开';if(!muted)void audio.start();});
window.addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright','tab'].includes(k))e.preventDefault();
  if(e.repeat){keys.add(k);return;}
  if(k==='escape'||k==='p'){if(game.phase==='playing')pause();else if(game.phase==='paused')resume();return;}
  if(k==='h'){pause(true);return;}
  keys.add(k);if(game.phase!=='playing')return;
  if(k==='e')interact();if(k==='f')fire();if(k==='1')game.weapon='speargun';if(k==='2')game.weapon='knife';
  if(k==='b')dock();
  if(k==='r'&&game.mode==='cage')game.reloadWeapon();
  if(k==='v'&&game.mode==='helm'){helmFirstPerson=!helmFirstPerson;viewYaw=0;viewPitch=helmFirstPerson?.02:.2;transition=.8;}
});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{keys.clear();resetTouchControls();drag=false;if(game.phase==='playing'&&!new URLSearchParams(location.search).has('qa'))pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.phase==='playing')pause();});
renderer.domElement.addEventListener('contextmenu',e=>e.preventDefault());
renderer.domElement.addEventListener('pointerdown',e=>{
  if(game.phase!=='playing')return;renderer.domElement.focus({preventScroll:true});
  if(e.pointerType!=='touch'&&e.button===0&&(game.mode==='cage'||game.mode==='shore')){fire();return;}
  if(e.button===2||e.button===0){drag=true;lastMouseX=e.clientX;lastMouseY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);}
});
for(const type of ['pointerup','pointercancel','lostpointercapture'])renderer.domElement.addEventListener(type,()=>drag=false);registerTouchReset(()=>drag=false);
renderer.domElement.addEventListener('pointermove',e=>{
  if(!drag||game.phase!=='playing')return;const dx=e.clientX-lastMouseX,dy=e.clientY-lastMouseY;lastMouseX=e.clientX;lastMouseY=e.clientY;
  viewYaw-=dx*.004;viewPitch=Math.max(-1.48,Math.min(1.48,viewPitch-dy*.003));
});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

function formatTime(t:number){return `${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;}
function updateHUD(){
  const repair=document.getElementById('touch-repair') as HTMLButtonElement|null;if(repair){repair.disabled=game.mode==='helm'||game.mode==='dragged';repair.textContent=game.mode==='cage'?'装填':'按住维修';}
  const attack=document.getElementById('touch-fire') as HTMLButtonElement|null;if(attack){attack.disabled=game.mode!=='cage'&&game.mode!=='shore';attack.textContent=game.mode==='shore'?'砍树':'攻击';}
  const weapon=document.getElementById('touch-weapon');if(weapon)weapon.hidden=game.mode!=='cage';const view=document.getElementById('touch-view');if(view)view.hidden=game.mode!=='helm';
  for(const [key,label] of [['w',game.mode==='cage'?'下潜':'前进'],['s',game.mode==='cage'?'上浮':'后退']] as const){const button=document.querySelector<HTMLElement>('.sea-pad [data-touch-key="'+key+'"]');if(button)button.textContent=label;}

  const cage=game.mode==='cage',deck=game.mode==='deck',ashore=game.mode==='shore',dragged=game.mode==='dragged';
  el('hud').hidden=game.phase==='ready';el('brand').classList.toggle('playing',game.phase!=='ready');
  el('distance').textContent=game.remaining>999?`${(game.remaining/1000).toFixed(2)} km`:`${Math.round(game.remaining)} m`;
  el('route-fill').style.width=`${game.progress*100}%`;
  el('hull-bar').style.width=`${game.hull}%`;el('cage-bar').style.width=`${game.cageHealth}%`;
  el('hull-bar').classList.toggle('danger',game.hull<35);el('cage-bar').classList.toggle('danger',game.cageHealth<35);
  el('hull-value').textContent=Math.ceil(game.hull).toString();el('cage-value').textContent=Math.ceil(game.cageHealth).toString();
  el('cage-integrity').style.opacity=cage||game.cageHealth<100?'1':'.45';
  el('wood-count').textContent=String(game.wood);
  el('island-guide').textContent=ashore?`${ISLANDS[game.islandId].name} · ${game.hasAxe?'已持斧':'工具架 E 拿斧头'}`:`${game.nearestIsland.name} ${Math.round(game.dockDistance)} m`;
  el('dock').hidden=cage||dragged;el('dock').querySelector('span')!.textContent=ashore?'返回码头 · 登船':game.dockDistance<19?'停船靠岸':'小岛导航';
  el('mode-label').textContent=cage?'DIVE CAGE / 潜水笼':deck?'ON DECK / 甲板':'HELM / 驾驶位';
  el('primary-number').textContent=cage?game.depth.toFixed(1):deck?'已抛锚':(Math.abs(game.speed)*1.94384).toFixed(1);
  el('primary-unit').textContent=cage?'m':deck?'':'节';el('secondary-number').textContent=cage?'水下深度':deck?'按住 R 维修':`油门 ${Math.round(game.throttle*100)}%`;
  el('depth-track').style.display=cage?'block':'none';el('depth-track').firstElementChild!.setAttribute('style',`width:${game.depth/MAX_DEPTH*100}%`);
  el('controls-hint').innerHTML=cage?'<kbd>W</kbd> 下潜 <kbd>S</kbd> 上浮 <span>·</span> 右键拖动环顾 <span>·</span> 左键 / F 攻击':deck?'<kbd>WASD</kbd> 甲板行走 <span>·</span> 右键环顾 <span>·</span> <kbd>R</kbd> 维修':'<kbd>W / S</kbd> 油门 <kbd>A / D</kbd> 转向 <span>·</span> 空格停船 <span>·</span> <kbd>V</kbd> 视角';
  if(ashore){el('mode-label').textContent='ASHORE / 海岛';el('primary-number').textContent=String(game.wood);el('primary-unit').textContent='木材';el('secondary-number').textContent=game.hasAxe?'已携带伐木斧':'E 领取斧头';el('controls-hint').innerHTML='<kbd>WASD</kbd> 行走 · <kbd>F / 左键</kbd> 砍树 · <kbd>E</kbd> 收集 · 码头 <kbd>R</kbd> 修船';}
  if(deck)el('secondary-number').textContent=`R 修复 · 木材 ${game.wood}`;
  if(game.hull<=0&&!ashore){el('mode-label').textContent='HULL BREACHED / 应急划桨';el('secondary-number').textContent='靠岸伐木修船';}
  if(dragged){el('mode-label').textContent='CAGE BREACHED / 笼架断裂';el('primary-number').textContent=Math.max(0,-camera.position.y).toFixed(1);el('primary-unit').textContent='m';el('secondary-number').textContent='正在被拖入深海';el('controls-hint').textContent='';}
  el('interact').querySelector('span')!.textContent=game.interactLabel;
  el('interact').classList.toggle('available',game.mode==='helm'||deck&&(game.nearCage||game.nearHelm)||cage&&game.depth<.12);
  el('weapon-status').style.display=cage?'block':'none';el('crosshair').style.display=cage||ashore?'block':'none';
  el('weapon-name').textContent=game.weapon==='speargun'?'01 / 压缩气动鱼枪':'02 / 潜水刀';
  el('ammo').innerHTML=game.weapon==='knife'?'近身 <span>4 m</span>':game.reload>0?`${game.reload.toFixed(1)} <span>装填</span>`:`${game.ammo} <span>/ ∞</span>`;
  el('weapon-hint').textContent=game.weapon==='knife'?'1 鱼枪 · 左键 / F 挥刀':'R 装填 · 2 潜水刀';
  el('toast').textContent=game.message;el('toast').classList.toggle('show',game.messageTime>0);
  el('voyage-time').textContent=formatTime(game.elapsed);el('voyage-zone').textContent=game.progress<.13?'沿岸浅海':game.progress<.62?'白鲨巡游区':game.progress<.9?'北部深水区':'北岬灯塔外海';
  const repairCourse=navIsland||game.hull<45;const destination=repairCourse?{x:game.nearestIsland.dockX,z:game.nearestIsland.z}:{x:0,z:1800};
  let bearing=Math.atan2(destination.x-game.x,destination.z-game.z)-game.heading;bearing=Math.atan2(Math.sin(bearing),Math.cos(bearing));
  el('bearing').style.transform=`translateX(${Math.max(-85,Math.min(85,-bearing*80))}px)`;
  el('bearing-label').textContent=Math.abs(bearing)<.14?'灯塔正前方':Math.abs(bearing)>2.6?'灯塔在身后':bearing>0?'向左转 · 灯塔':'向右转 · 灯塔';
  if(repairCourse)el('bearing-label').textContent=Math.abs(bearing)<.14?'小岛码头正前方':Math.abs(bearing)>2.6?'小岛码头在身后':bearing>0?'向左转 · 小岛码头':'向右转 · 小岛码头';
  el('interact').hidden=dragged;
  el('encounter').classList.toggle('warning',threat>.4);
  const watched=sharks.sharks.filter(s=>s.health>0).sort((a,b)=>{
    const active=(s:typeof a)=>s.state==='rush'||s.state==='warning'?-1000:0;
    return active(a)+a.position.distanceToSquared(camera.position)-active(b)-b.position.distanceToSquared(camera.position);
  })[0];
  let where='';
  if(watched&&nearest<45){
    camera.getWorldDirection(direction);const to=watched.position.clone().sub(camera.position);
    const angle=Math.atan2(Math.sin(Math.atan2(to.x,to.z)-Math.atan2(direction.x,direction.z)),Math.cos(Math.atan2(to.x,to.z)-Math.atan2(direction.x,direction.z)));
    where=to.y< -5&&cage?' · 下方':Math.abs(angle)>2?' · 身后':angle>.6?' · 左侧':angle<-.6?' · 右侧':' · 前方';
  }
  el('encounter-label').textContent=(threat>.4?'正在快速接近':nearest<14?'附近有大白鲨':nearest<45?'远处有巡游的身影':'留意水面与船底')+where;
}
function step(dt:number){
  const playing=game.phase==='playing';
  if(playing){
    if(hasKey('arrowleft'))viewYaw+=dt*1.1;if(hasKey('arrowright'))viewYaw-=dt*1.1;
    if(hasKey('arrowup'))viewPitch=Math.min(1.48,viewPitch+dt*.8);if(hasKey('arrowdown'))viewPitch=Math.max(-1.48,viewPitch-dt*.8);
    const priorRepairs=game.repairs;
    game.step(dt,{forward:(hasKey('w')?1:0)-(hasKey('s')?1:0),turn:(hasKey('a')?1:0)-(hasKey('d')?1:0),brake:hasKey(' '),moveX:(hasKey('a')?1:0)-(hasKey('d')?1:0),moveZ:(hasKey('w')?1:0)-(hasKey('s')?1:0),lookYaw:viewYaw,dive:((hasKey('w')||hasKey('shift'))?1:0)-((hasKey('s')||hasKey(' '))?1:0),repair:hasKey('r')});
    if(game.repairs>priorRepairs)audio.play('repair');
  }
  if(game.phase==='ready')ambientTime+=dt;
  const time=game.phase==='ready'?ambientTime:game.time;
  const simDt=game.phase==='paused'||game.phase==='won'||game.phase==='lost'?0:dt;
  const h=ocean.heightAt(game.x,game.z,time);
  boatPosition.set(game.x,h*.62-(1-game.hull/100)*.25,game.z);vessel.root.position.copy(boatPosition);
  const forwardH=ocean.heightAt(game.x+Math.sin(game.heading)*3,game.z+Math.cos(game.heading)*3,time);
  const sideH=ocean.heightAt(game.x+Math.cos(game.heading)*1.5,game.z-Math.sin(game.heading)*1.5,time);
  vessel.root.rotation.set((forwardH-h)*-.12,game.heading,(sideH-h)*.14-game.rudder*game.speed*.003+(1-game.hull/100)*.065,'YXZ');
  vessel.root.updateMatrixWorld(true);
  cagePosition.set(3.5,1-game.depth,-2).applyMatrix4(vessel.root.matrixWorld);
  vessel.cage.position.copy(cagePosition);vessel.cage.rotation.set(Math.sin(time*.45)*.007*game.depth/12,game.heading,Math.sin(time*.65)*.009);
  vessel.update(time,game.speed,game.rudder,game.depth);
  wear.update(game.hull,game.cageHealth,game.repairs,game.dragTime,time,game.speed);shore.update(game,simDt);
  if(game.mode==='dragged'&&!sharks.dragView){sharks.beginDrag(cagePosition);audio.play('cagebreak');}
  if(game.phase==='ready'||playing){sharks.update({time,dt:simDt,boatPosition,boatHeading:game.heading,speed:game.speed,cagePosition,cageDepth:game.depth,inCage:game.mode==='cage',progress:game.progress,safeHarbor:game.mode==='shore'||game.dockDistance<25});}
  nearest=999;for(const s of sharks.sharks){if(s.health>0)nearest=Math.min(nearest,s.position.distanceTo(game.mode==='cage'?cagePosition:boatPosition));}
  const mode=game.mode;
  if(mode!==lastMode){lastMode=mode;transition=1;}
  if(game.phase==='ready'){
    const a=-.53+Math.sin(time*.055)*.13;cameraDesired.set(-Math.sin(a)*18,7,-Math.cos(a)*18).add(boatPosition);
    cameraTarget.copy(boatPosition).add(new THREE.Vector3(0,1.1,5));
  }else if(mode==='dragged'&&sharks.dragView){
    cameraDesired.copy(sharks.dragView.position);cameraTarget.copy(sharks.dragView.target);
  }else if(mode==='helm'&&!helmFirstPerson){
    const yaw=game.heading+viewYaw;const pitch=Math.max(-.03,Math.min(1.0,viewPitch));const d=17.5;
    cameraDesired.set(-Math.sin(yaw)*Math.cos(pitch)*d,4+Math.sin(pitch)*d,-Math.cos(yaw)*Math.cos(pitch)*d).add(boatPosition);
    cameraTarget.set(game.x+Math.sin(game.heading)*5,boatPosition.y+1.5,game.z+Math.cos(game.heading)*5);
  }else{
    let yaw=viewYaw;
    if(mode==='helm'){cameraDesired.set(0,2.45,.8).applyMatrix4(vessel.root.matrixWorld);yaw=game.heading+viewYaw;}
    else if(mode==='deck'){cameraDesired.set(game.deckX,2.4,game.deckZ).applyMatrix4(vessel.root.matrixWorld);}
    else if(mode==='shore'){cameraDesired.set(game.shoreX,landHeight(ISLANDS[game.islandId],game.shoreX,game.shoreZ)+1.72,game.shoreZ);}
    else {cameraDesired.copy(cagePosition).add(new THREE.Vector3(0,.32,0));}
    cameraTarget.copy(cameraDesired).add(new THREE.Vector3(Math.sin(yaw)*Math.cos(viewPitch),Math.sin(viewPitch),Math.cos(yaw)*Math.cos(viewPitch)).multiplyScalar(20));
  }
  if(mode==='cage'&&game.phase!=='ready')camera.position.lerp(cameraDesired,Math.min(1,dt*(transition>0?4:18)));else camera.position.lerp(cameraDesired,Math.min(1,dt*(transition>0?3.8:7)));
  if(camera.position.length()<.1)camera.position.copy(cameraDesired);
  splashShake=Math.max(0,splashShake-dt);transition=Math.max(0,transition-dt);attackAnim=Math.max(0,attackAnim-dt*3.2);threat=Math.max(0,threat-dt*.09);
  if(playing&&splashShake>0){camera.position.x+=Math.sin(time*45)*splashShake*.06;camera.position.y+=Math.sin(time*34)*splashShake*.065;}
  camera.lookAt(cameraTarget);camera.updateMatrixWorld();
  if(mode==='dragged')camera.rotateZ(Math.sin(game.dragTime*5)*.12+game.dragTime*.035);
  const underwater=camera.position.y<-.18;const depth=Math.max(0,-camera.position.y);
  ocean.update({time,dt:simDt,camera,boatPosition,boatHeading:game.heading,speed:game.speed,underwater,depth});
  el('experience').classList.toggle('underwater',underwater);
  el('waterline').style.opacity=game.mode==='cage'&&Math.abs(camera.position.y)<1.2?`${(1-Math.abs(camera.position.y)/1.2)*.6}`:'0';
  el('damage').style.opacity=`${game.damageFlash*.65}`;el('hit-marker').style.opacity=`${game.hitFlash}`;
  if(mode==='dragged')el('damage').style.opacity=String(Math.max(.12,.4-game.dragTime*.04));
  shore.axe.visible=playing&&mode==='shore'&&game.hasAxe;shore.axe.scale.setScalar(.85);shore.axe.position.set(.42,-.39,-.75-Math.sin(attackAnim*Math.PI)*.2);shore.axe.rotation.set(attackAnim*1.2,.25,-.25-attackAnim*.6);
  vessel.weapon.visible=playing&&mode==='cage'&&game.weapon==='speargun';vessel.knife.visible=playing&&mode==='cage'&&game.weapon==='knife';
  vessel.weapon.rotation.x=-attackAnim*.16;vessel.weapon.rotation.z=Math.sin(time*1.3)*.008;vessel.weapon.position.set(.35,-.3,-.6+attackAnim*.12);
  vessel.knife.rotation.z=-attackAnim*.8;vessel.knife.position.set(.35,-.3,-.6-Math.sin(attackAnim*Math.PI)*.65);
  for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];p.life-=simDt;p.mesh.position.addScaledVector(p.velocity,simDt);if(p.life<=0){scene.remove(p.mesh);projectiles.splice(i,1);}}
  audio.update(playing&&game.hull>0?Math.abs(game.speed):0,underwater?depth:0,playing?threat:0);
  if(game.phase!==lastPhase){lastPhase=game.phase;if(game.phase==='won'||game.phase==='lost'){showModal();if(game.phase==='won')audio.play('win');}}
  if(time-lastHUD>.09||lastHUD>time){updateHUD();lastHUD=time;}
}

let last=performance.now();let started=false;
function animate(now:number){
  const wallDt=(now-last)/1000;const dt=Math.min(.05,wallDt);last=now;
  step(dt);renderer.render(scene,camera);
  frameCount++;frameSum+=wallDt;if(frameSum>=2){fps=frameCount/frameSum;frameCount=0;frameSum=0;}
  if(!started){started=true;el('loading').hidden=true;camera.position.copy(cameraDesired);}
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

const qa=new URLSearchParams(location.search).get('qa')==='1';
const inspection={snapshot:()=>({...game.snapshot(),fps,nearest,camera:camera.position.toArray(),view:camera.quaternion.toArray(),sharks:sharks.sharks.map(s=>({id:s.id,position:s.position.toArray(),health:s.health,state:s.state,length:s.length})),render:{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles}})};
Object.assign(window,{__sea:qa?{...inspection,game,sharks,step:(seconds:number)=>{for(let t=0;t<seconds;t+=1/60)step(1/60);renderer.render(scene,camera);updateHUD();},setBoat:(x:number,z:number)=>{game.x=x;game.z=z;},aimAt:(id:number)=>{const shark=sharks.sharks.find(s=>s.id===id);if(shark){temp.copy(shark.position).sub(camera.position);viewYaw=Math.atan2(temp.x,temp.z);viewPitch=Math.atan2(temp.y,Math.hypot(temp.x,temp.z));}},setView:(yaw:number,pitch:number)=>{viewYaw=yaw;viewPitch=pitch;},project:(x:number,y:number,z:number)=>{temp.set(x,y,z).project(camera);return {x:(temp.x*.5+.5)*innerWidth,y:(-.5*temp.y+.5)*innerHeight};}}:inspection});
window.addEventListener('error',()=>{el('loading').textContent='海域载入遇到问题，请刷新页面重试。';});


el('hud').insertAdjacentHTML('beforeend','<div class="touch-pad sea-pad" aria-label="触屏航行"><button data-touch-key="w" aria-label="前进或下潜">↑</button><button data-touch-key="a" aria-label="左转或左移">←</button><button data-touch-key="s" aria-label="后退或上浮">↓</button><button data-touch-key="d" aria-label="右转或右移">→</button><button data-touch-key=" " class="sea-stop" aria-label="按住停船或上浮">停船</button></div><div class="tablet-actions sea-actions" aria-label="触屏动作"><button id="touch-fire">攻击</button><button id="touch-repair" data-touch-key="r">维修 / 装填</button><button id="touch-weapon">换武器</button><button id="touch-view">换视角</button></div>');
bindTouchKeys(document.querySelectorAll<HTMLElement>('[data-touch-key]'),touchKeys,b=>b.dataset.touchKey!,()=>game.phase==='playing');
el('touch-fire').onclick=()=>{if(game.phase==='playing')fire();};bindHold(el('touch-repair'),down=>{if(down&&game.mode==='cage')game.reloadWeapon();},()=>game.phase==='playing');
el('touch-weapon').onclick=()=>{if(game.phase==='playing')game.weapon=game.weapon==='speargun'?'knife':'speargun';};el('touch-view').onclick=()=>{if(game.phase==='playing'&&game.mode==='helm'){helmFirstPerson=!helmFirstPerson;viewYaw=0;viewPitch=helmFirstPerson?.02:.2;transition=.8;}};
