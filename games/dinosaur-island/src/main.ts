import * as THREE from 'three';
import { IslandWorld } from './world';
import { terrainHeight, riverDepth, riverCenter } from './terrain';
import { DinosaurController } from './controller';
import { createPlayer, PLAYABLE, type PlayerKind, type PlayerVisual } from './player';
import { IslandAudio } from './audio';
import { SurvivalSimulation, RULES, COMBAT } from './survival';
import { Wildlife } from './wildlife';
import { SPECIES, isPrey } from './species';
import './style.css';
import {bindTouchControls} from './touch';

const icons = {
  island:'<path d="m3 18 5-7 4 2 5-10 4 15M2 21h20M14 7l3 2 2-2"/>',
  sound:'<path d="m11 5-6 4H2v6h3l6 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  settings:'<path d="M4 7h16M4 17h16M8 4v6m8 4v6"/>',
  arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
  camera:'<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  back:'<path d="m10 5-7 7 7 7M3 12h17"/>',
};
const icon = (name:keyof typeof icons) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
document.querySelector<HTMLDivElement>('#app')!.innerHTML=`
  <main id="experience">
    <div id="viewport" aria-label="恐龙岛三维场景"></div><div class="cinematic-shade"></div><div class="vignette"></div>
    <header class="topbar"><a class="brand" href="#" aria-label="返回岛屿首页">${icon('island')}<span>失落群岛<span class="brand-divider">/</span>ISLA PERDIDA</span></a><div class="top-actions"><span class="edition">原始世界探索计划 <b>V0.1</b></span><button class="icon-button" id="sound" aria-label="关闭声音" title="环境音效">${icon('sound')}</button><button class="icon-button" id="settings" aria-label="打开设置" title="设置 · Esc">${icon('settings')}</button></div></header>
    <section class="intro" id="intro"><div class="eyebrow"><span></span> EXPEDITION 001 <i>·</i> THE LOST ISLAND</div><h1><span>逃离</span>恐龙岛<span class="english-title">BEFORE THE WORLD WAS OURS.</span></h1><p class="intro-copy">越过海岸，深入无人踏足的雨林。<br>这一次，以史前巨兽的视角，重新认识世界。</p><div class="start-area"><button id="start" class="primary" disabled><span id="start-label">岛屿正在苏醒</span>${icon('arrow')}</button><div class="load-status"><span id="loading-label">准备进入原始世界</span><span id="loading-percent">0%</span></div><div class="loading-track"><span id="loading-bar"></span></div></div><div class="intro-meta"><span><i class="status-dot"></i> 自由漫游</span><span>第三人称体验</span><span>建议佩戴耳机</span></div></section>
    <aside class="field-note" id="field-note"><span class="vertical-line"></span><div class="tiny-label">FIELD NOTES / 01</div><p>生命，先于人类。</p><small>一座岛屿。一位史前的主人。<br>没有任务，跟随你的本能。</small></aside>
    <div id="compass" class="compass hidden"><span>W</span><i></i><span id="heading">N</span><i></i><span>E</span><b>▾</b></div>
    <div id="location" class="location"><span class="location-dot"></span><div><small>THE SOUTHERN SHORE</small><span id="biome">南部海岸</span></div><span class="coordinates">09° 24′ N<br>084° 08′ W</span></div>
    <div id="play-hud" class="hidden"><div class="species"><small>TYRANNOSAURUS REX</small><div>霸王龙 <span id="motion">静静观察</span></div><div class="step-line"><i></i><span>FOLLOW YOUR INSTINCT</span></div></div><div class="controls"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> 移动</span><span><kbd>Shift</kbd> 奔跑</span><button id="roar-button"><kbd>R</kbd> 吼叫</button><span class="mouse-help">拖动鼠标 · 环顾四周</span><button id="photo" title="隐藏界面 · P">${icon('camera')}</button></div><div class="map-wrap"><canvas id="map" width="160" height="160" aria-label="岛屿位置示意图"></canvas><span>N</span><small>ISLA PERDIDA</small></div></div>
    <div id="photo-hint" class="hidden">摄影视角 · 拖动鼠标环顾 · 按 P 返回 <button id="capture">保存画面</button></div>
    <div id="toast" role="status"></div>
    <footer id="intro-footer"><span>一段关于远古的想象</span><span>AN INTERACTIVE WORLD <i>—</i> BUILT WITH THREE.JS</span><button id="credits-open">资源与致谢 ↗</button></footer>
    <div id="dialog-backdrop" class="hidden"><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button id="dialog-close" class="icon-button">${icon('close')}</button><div class="eyebrow">YOUR EXPEDITION</div><h2 id="dialog-title">暂歇片刻</h2><p>岛屿会在这里等你。</p><div class="setting-row"><label for="quality">画面质量</label><select id="quality"><option value="high">高 · 完整光影</option><option value="balanced">流畅 · 降低分辨率</option></select></div><div class="setting-row"><label for="mute">环境音效</label><input type="checkbox" id="mute" checked/></div><div class="setting-row"><span>操作方式</span><small>WASD 移动 / Shift 奔跑 / R 吼叫<br>鼠标拖拽环顾 / 滚轮调整距离 / P 摄影</small></div><button id="resume" class="primary">继续探索 ${icon('arrow')}</button><button id="reset" class="text-button">回到南部海岸</button><button id="dialog-credits" class="text-button">查看资源与致谢</button></section></div>
    <div id="credits-backdrop" class="hidden"><section class="dialog credits" role="dialog" aria-modal="true" aria-labelledby="credits-title"><button id="credits-close" class="icon-button">${icon('close')}</button><div class="eyebrow">WITH GRATITUDE</div><h2 id="credits-title">共同构筑的世界</h2><div id="credits-content"></div><p class="credits-note">免费资源原型 · 非商业品牌关联项目<br>完整来源、许可证与加工说明随项目提供。</p></section></div>
  </main>`;
const $ = <T extends HTMLElement = HTMLElement>(id:string) => document.getElementById(id) as T;
$('play-hud').insertAdjacentHTML('beforeend',`<div id="survival-hud"><div class="vital"><span>饱食度</span><b id="hunger-number">100</b><div class="vital-track"><i id="hunger-fill"></i></div></div><div class="vital health"><span>生命</span><b id="health-number">100</b><div class="vital-track"><i id="health-fill"></i></div></div><small id="survival-note">狩猎小兽，维持生命</small></div><div id="hunt-hint">追赶小兽 · Space 咬击 · E 进食</div>`);
document.querySelector('.controls')!.insertAdjacentHTML('beforeend','<button id="attack-button"><kbd>Space</kbd> 咬击</button><button id="eat-button"><kbd>E</kbd> 进食</button>');
$('experience').insertAdjacentHTML('beforeend',`<div id="death-screen" class="hidden"><section class="dialog" role="dialog" aria-labelledby="death-title"><div class="eyebrow">THE ISLAND ENDURES</div><h2 id="death-title">生命止于饥饿</h2><p>饱食度耗尽后，生命也会逐渐流失。<br>下一次，追上小兽，咬倒猎物，再靠近进食。</p><p id="death-stats"></p><button id="restart" class="primary">重新开始 ${icon('arrow')}</button></section></div>`);
document.querySelector('.edition b')!.textContent='V0.4';
const formOptions='<option value="trex">霸王龙 · 力量</option><option value="raptor">迅猛龙 · 敏捷</option>';
document.querySelector('.start-area')!.insertAdjacentHTML('afterbegin',`<label class="form-picker" for="intro-species">选择你的恐龙 <select id="intro-species" disabled>${formOptions}</select></label>`);
$('quality').closest('.setting-row')!.insertAdjacentHTML('beforebegin',`<div class="setting-row"><label for="player-species">恐龙外形</label><select id="player-species" disabled>${formOptions}</select></div><p class="form-note">可在安全时切换，保留生命和饱食度。</p>`);
document.querySelector('.species>small')!.id='species-latin';
document.querySelector('.species>div')!.innerHTML='<span id="species-name">霸王龙</span> <span id="motion">静静观察</span>';
document.querySelector('.species')!.insertAdjacentHTML('beforeend','<button id="change-form" class="change-form">切换恐龙 ↗</button>');
$('play-hud').insertAdjacentHTML('beforeend','<div id="combat-hud" class="hidden"><span id="combat-label"></span><div class="vital-track"><i id="enemy-health"></i></div></div>');
$('attack-button').innerHTML='<kbd>Space</kbd> 攻击 / 倒树';
$('field-note').querySelector('small')!.innerHTML='梁龙穿过林地，迅猛龙结伴游荡。<br>循着鸟鸣，寻找岛上的其他生命。';
document.querySelector('.intro-meta>span')!.innerHTML='<i class="status-dot"></i> 漫游 · 狩猎 · 生存';
$('reset').textContent='重新开始 · 返回海岸';
document.querySelector('.setting-row:last-of-type small')!.innerHTML='WASD 移动 / Shift 奔跑 / R 吼叫<br>Space 咬击 / E 进食 / P 摄影';
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
const touchDevice=navigator.maxTouchPoints>0||matchMedia('(pointer:coarse)').matches;
renderer.setPixelRatio(Math.min(devicePixelRatio,touchDevice?1:1.5)); renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
renderer.outputColorSpace=THREE.SRGBColorSpace;
$('viewport').appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.15,4000);
const world = new IslandWorld();
const sound = new IslandAudio();
let controller:DinosaurController, dinosaur:PlayerVisual;
$('play-hud').insertAdjacentHTML('beforeend',`<div id="touch-pad" aria-label="触屏移动"><button data-direction="forward" aria-label="向前移动">▲</button><button data-direction="left" aria-label="向左移动">◀</button><button data-run aria-label="切换奔跑" aria-pressed="false">奔跑</button><button data-direction="right" aria-label="向右移动">▶</button><button data-direction="back" aria-label="向后移动">▼</button></div>`);
const touchControls=bindTouchControls($('touch-pad'),()=>controller);
let playerKind:PlayerKind='trex',hurtUntil=0;
const avatars=new Map<PlayerKind,PlayerVisual>();
let simulation:SurvivalSimulation;
const wildlife=new Wildlife();
let phase:'loading'|'intro'|'playing'|'paused'|'dead'='loading';
let photo=false,muted=false,elapsed=0,frameCount=0,fps=0,fpsClock=0,quality='auto',slowWindows=0;
let toastTimer:ReturnType<typeof setTimeout>;
const errors:string[]=[];
window.addEventListener('error',e=>errors.push(e.message));window.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));
const spawn={x:25,z:137,heading:Math.PI};
function progress(text:string,percent:number){$('loading-label').textContent=text;$('loading-percent').textContent=`${percent}%`;$('loading-bar').style.width=`${percent}%`;}
function toast(text:string){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function setMuted(value:boolean){muted=value;sound.setMuted(muted);$('sound').classList.toggle('muted',muted);$('sound').setAttribute('aria-label',muted?'开启声音':'关闭声音');$<HTMLInputElement>('mute').checked=!muted;}
function pause(){if(phase!=='playing'&&phase!=='intro')return;touchControls.reset();const from=phase;$('dialog-backdrop').dataset.from=from;phase='paused';controller.setEnabled(false);sound.pause();$('dialog-backdrop').classList.remove('hidden');$('resume').focus();}
function resume(){if(phase!=='paused')return;phase=$('dialog-backdrop').dataset.from==='intro'?'intro':'playing';controller.setEnabled(phase==='playing');if(phase==='playing')sound.resume();$('dialog-backdrop').classList.add('hidden');}
function showCredits(){if(phase==='playing')pause();$('credits-backdrop').classList.remove('hidden');$('credits-close').focus();}
function togglePhoto(){if(phase!=='playing')return;photo=!photo;$('experience').classList.toggle('photo-mode',photo);$('photo-hint').classList.toggle('hidden',!photo);}
const playerPose=()=>({x:dinosaur.root.position.x,z:dinosaur.root.position.z,heading:controller.state.heading,speed:controller.state.speed,wading:controller.state.wading});
function makeController(at=spawn){
  const config=PLAYABLE[playerKind];
  return new DinosaurController({target:dinosaur.root,camera,domElement:renderer.domElement,terrainHeight,waterDepth:riverDepth,obstacles:world.obstacles,spawn:at,cameraDistance:config.cameraDistance,cameraHeight:config.cameraHeight,walkSpeed:config.walk,runSpeed:config.run,playerRadius:config.radius,roarDuration:4,onRoar:()=>{sound.roar();simulation?.roar(playerPose());}});
}
function syncForm(){for(const id of ['intro-species','player-species'])$<HTMLSelectElement>(id).value=playerKind;$('species-latin').textContent=PLAYABLE[playerKind].latin;$('species-name').textContent=PLAYABLE[playerKind].name;}
function changeForm(kind:PlayerKind){
  if(kind===playerKind)return;
  if(!avatars.has(kind)||phase==='loading'||phase==='dead'||controller.busy||simulation.eating||simulation.isThreatened(playerPose())){syncForm();toast('先结束动作并脱离战斗，再切换恐龙');return;}
  const at={x:dinosaur.root.position.x,z:dinosaur.root.position.z,heading:controller.state.heading};
  // A larger form must not appear inside a tree or rock.
  if(world.obstacles.some(o=>o.active!==false&&Math.hypot(o.x-at.x,o.z-at.z)<o.radius+PLAYABLE[kind].radius)){syncForm();toast('这里空间太窄，请到空地再切换');return;}
  touchControls.reset();controller.dispose();dinosaur.root.visible=false;playerKind=kind;dinosaur=avatars.get(kind)!;dinosaur.root.visible=true;
  dinosaur.update(0,{action:'idle',speed:0});controller=makeController(at);controller.setEnabled(phase==='playing');simulation.setPlayerForm(kind);syncForm();updateHud();toast(`已切换${PLAYABLE[kind].name} · 生命和饱食度保留`);
}
for(const id of ['intro-species','player-species'])$<HTMLSelectElement>(id).onchange=e=>changeForm((e.target as HTMLSelectElement).value as PlayerKind);
$('change-form').onclick=()=>{pause();$('player-species').focus();};
function attack(){if(phase!=='playing'||controller.busy||simulation.dead)return;if(simulation.beginAttack())controller.requestAction('attack',RULES.attackDuration);}
function eat(){if(phase!=='playing'||controller.busy||simulation.dead)return;const target=simulation.edibleNear(playerPose());if(simulation.beginEat(playerPose())){controller.requestAction('eat',RULES.eatDuration);if(target){controller.state.heading=Math.atan2(target.x-dinosaur.root.position.x,target.z-dinosaur.root.position.z);dinosaur.root.rotation.y=controller.state.heading;}}else toast('靠近被咬倒的小兽，再按 E 进食');}
function restart(){touchControls.reset();$('experience').classList.add('playing');for(const id of ['intro','field-note','intro-footer'])$(id).classList.add('hidden');$('play-hud').classList.remove('hidden');$('compass').classList.remove('hidden');world.resetTrees();simulation.reset();hurtUntil=0;controller.reset(spawn);controller.setEnabled(true);phase='playing';photo=false;$('experience').classList.remove('photo-mode','starving','hurt');$('death-screen').classList.add('hidden');$('dialog-backdrop').classList.add('hidden');$('photo-hint').classList.add('hidden');sound.start();sound.setMuted(muted);updateHud();toast('重新开始：饱食度已恢复，向林地寻找猎物');}
$('attack-button').onclick=attack;$('eat-button').onclick=eat;$('restart').onclick=restart;
$('start').onclick=()=>{if(phase!=='intro')return;phase='playing';dinosaur.root.rotation.y=controller.state.heading;sound.start();sound.setMuted(muted);controller.setEnabled(true);$('experience').classList.add('playing');$('intro').classList.add('hidden');$('field-note').classList.add('hidden');$('intro-footer').classList.add('hidden');$('play-hud').classList.remove('hidden');$('compass').classList.remove('hidden');toast(touchDevice?'按住方向键移动 · 点奔跑加速 · 拖动画面环顾':'WASD 漫步 · 按住 Shift 奔跑 · 鼠标拖拽环顾');};
$('settings').onclick=pause;$('dialog-close').onclick=resume;$('resume').onclick=resume;
$('sound').onclick=()=>setMuted(!muted);$<HTMLInputElement>('mute').onchange=e=>setMuted(!(e.target as HTMLInputElement).checked);
$('roar-button').onclick=()=>controller?.requestRoar();$('photo').onclick=togglePhoto;
$('reset').onclick=restart;
$('credits-open').onclick=showCredits;$('dialog-credits').onclick=showCredits;$('credits-close').onclick=()=>$('credits-backdrop').classList.add('hidden');
document.querySelector<HTMLAnchorElement>('.brand')!.onclick=e=>{e.preventDefault();if(phase==='playing')pause();};
$<HTMLSelectElement>('quality').insertAdjacentHTML('afterbegin','<option value="auto" selected>自适应 · 推荐</option>');
$<HTMLSelectElement>('quality').onchange=e=>{quality=(e.target as HTMLSelectElement).value;const high=quality==='high';renderer.setPixelRatio(Math.min(devicePixelRatio,high?1.5:quality==='auto'?1:.75));world.setQuality(high||quality==='auto');slowWindows=0;toast(quality==='auto'?'画面会随运行速度自动调整':high?'已开启完整光影':'已切换流畅画质');};
$('capture').onclick=()=>{renderer.render(world.scene,camera);const a=document.createElement('a');a.download=`isla-perdida-${Date.now()}.png`;a.href=renderer.domElement.toDataURL('image/png');a.click();toast('画面已保存');};
window.addEventListener('keydown',e=>{if(e.code==='Escape'){if(!$('credits-backdrop').classList.contains('hidden'))$('credits-backdrop').classList.add('hidden');else if(phase==='paused')resume();else pause();}if(e.code==='KeyP'&&!e.repeat)togglePhoto();});
window.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.altKey||e.metaKey||/^(INPUT|SELECT|TEXTAREA)$/.test((e.target as HTMLElement)?.tagName))return;if(phase==='playing'&&e.code==='Space'){e.preventDefault();attack();}if(phase==='playing'&&e.code==='KeyE'){e.preventDefault();eat();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&phase==='playing')pause();});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

const map=$<HTMLCanvasElement>('map'), mapContext=map.getContext('2d')!;
const mapBase=document.createElement('canvas');mapBase.width=mapBase.height=160;const mc=mapBase.getContext('2d')!;
mc.fillStyle='#203d39';mc.fillRect(0,0,160,160);
for(let x=0;x<160;x++)for(let z=0;z<160;z++){const h=terrainHeight((x-80)*2.5,(z-80)*2.5);if(h>0){mc.fillStyle=h<3?'#8d9373':h<10?'#65765a':h<24?'#52634b':'#a0a080';mc.fillRect(x,z,1,1);}}
for(let x=0;x<160;x++)for(let z=0;z<160;z++)if(riverDepth((x-80)*2.5,(z-80)*2.5)>.05){mc.fillStyle='#548b88';mc.fillRect(x,z,1,1);}
function updateHud(){
  const p=dinosaur.root.position,s=controller.state;
  $('motion').textContent=simulation?.dead?'生命耗尽':s.wading&&['walk','run'].includes(s.action)?'涉水':{idle:'静静观察',walk:'漫步',run:'奔跑',roar:'昂首咆哮',attack:'咬击',eat:'进食'}[s.action];
  $('roar-button').classList.toggle('active',s.action==='roar');
  const biome=riverDepth(p.x,p.z)>.1?'林间河流':p.z>85?'南部海岸':p.y>19?'古老山脊':Math.abs(p.x)>70?'蕨叶林地':'雨林腹地';$('biome').textContent=biome;
  $('heading').textContent=`${Math.round(((180-s.heading*180/Math.PI)%360+360)%360)}°`;
  mapContext.clearRect(0,0,160,160);mapContext.drawImage(mapBase,0,0);mapContext.save();mapContext.translate(80+p.x/2.5,80+p.z/2.5);mapContext.rotate(-s.heading);mapContext.fillStyle='#f4e0ab';mapContext.beginPath();mapContext.moveTo(0,7);mapContext.lineTo(-4,-4);mapContext.lineTo(0,-2);mapContext.lineTo(4,-4);mapContext.closePath();mapContext.fill();mapContext.restore();
  if(simulation){
    $('hunger-number').textContent=`${Math.ceil(simulation.hunger)}`;$('health-number').textContent=`${Math.ceil(simulation.health)}`;
    $('hunger-fill').style.width=`${simulation.hunger}%`;$('health-fill').style.width=`${simulation.health}%`;
    $('experience').classList.toggle('starving',simulation.hunger<25);$('survival-note').textContent=simulation.hunger<=0?'饥饿正在消耗生命！':`已捕获 ${simulation.kills} · 已进食 ${simulation.meals}`;
    const food=simulation.edibleNear(playerPose());const nearby=simulation.creatures.filter(c=>c.active&&c.alive&&isPrey(c)).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];
    const enemy=simulation.creatures.find(c=>c.kind==='dinosaur'&&c.alive&&c.active&&Math.hypot(c.x-p.x,c.z-p.z)<26);
    $('combat-hud').classList.toggle('hidden',!enemy);
    if(enemy){$('combat-label').textContent=`霸王龙 ${Math.ceil(enemy.health)} / ${enemy.maxHealth} · ${enemy.windup>0?'正在蓄力！侧移躲开':enemy.aggro>0?'正在反击 · 拉开距离':'攻击它会遭到反击'}`;$('enemy-health').style.width=`${enemy.health/enemy.maxHealth*100}%`;}
    const tree=world.trees.trees.find(t=>!t.fallen&&Math.hypot(t.obstacle.x-p.x,t.obstacle.z-p.z)<5);
    $('hunt-hint').textContent=simulation.eating?'正在进食…':food?`${SPECIES[food.kind].name}尸体 · 剩余 ${food.portions} 份 · E 进食 +${food.kind==='dinosaur'?COMBAT.rexFood:RULES.food} 饱食度`:tree?'被树挡住了？面向树干按 Space · 60 秒后再生':nearby?`最近${SPECIES[nearby.kind].name} ${Math.round(Math.hypot(nearby.x-p.x,nearby.z-p.z))} m · 追上后 Space 攻击`:'沿河流寻找小兽';
    for(const c of simulation.creatures)if(c.active){mapContext.fillStyle=c.alive?SPECIES[c.kind].color:'#ffdb8c';mapContext.beginPath();mapContext.arc(80+c.x/2.5,80+c.z/2.5,SPECIES[c.kind].group==='dinosaur'?2.4:1.6,0,Math.PI*2);mapContext.fill();}
  }
}
async function init(){
  try{
    progress('生成海岸线',8);
    await world.init(renderer,message=>progress(message,message.includes('蕨')?38:18));
    progress('唤醒史前巨兽',70);
    for(const kind of ['trex','raptor'] as const){const avatar=await createPlayer(kind);avatars.set(kind,avatar);world.scene.add(avatar.root);avatar.root.visible=kind===playerKind;}
    dinosaur=avatars.get(playerKind)!;controller=makeController();controller.setEnabled(false);
    progress('迎接岛上的其他生命',82);simulation=new SurvivalSimulation(world.obstacles,(p,range)=>!!world.strikeTree(p,range));await wildlife.init(world.scene,simulation);
    progress('正在准备第一缕阳光',92);renderer.compile(world.scene,camera);
    $('credits-content').innerHTML='<p><strong>恐龙</strong><br>Animated Tyrannosaurus Rex Dinosaur Running Loop<br>LasquetiSpice · CC BY 4.0<br><a href="https://sketchfab.com/3d-models/animated-tyrannosaurus-rex-dinosaur-running-loop-38007d947ae74dea83988cb0b08ee053" target="_blank" rel="noopener">原作者模型页面 ↗</a></p><p><strong>自然环境</strong><br>Poly Haven · CC0<br>Fern 02 / Rock Moss Set 01 / Island Tree / 地表扫描材质<br><a href="https://polyhaven.com/license" target="_blank" rel="noopener">资源与许可 ↗</a></p><p><strong>技术与声音</strong><br>Three.js · MIT / 原创 Web Audio 合成环境音与吼声<br>漫步复用降低速率的奔跑动画。</p>';
    progress('准备就绪',100);$('start-label').textContent='踏入恐龙岛';$<HTMLButtonElement>('start').disabled=false;phase='intro';
    for(const id of ['intro-species','player-species'])$<HTMLSelectElement>(id).disabled=false;syncForm();
    $('credits-content').insertAdjacentHTML('beforeend',`<p><strong>新增岛屿居民</strong><br>迅猛龙 · Ferocious Industries · CC BY 4.0<br>犀牛 · GremorySaiyan · CC BY 4.0<br>乌鸦 · Alexei Ostapenko · CC BY 4.0<br>梁龙 · Skorpio · CC BY-SA 3.0<br><a href="assets/animals/SOURCE.md" target="_blank" rel="noopener">作者、原始来源、修改与许可 ↗</a></p>`);
    $('credits-content').insertAdjacentHTML('beforeend','<p><strong>小型猎物 · Fox</strong><br>模型 PixelMannen · CC0<br>动画 tomkranis / glTF 转换 AsoboStudio、scurest · CC BY 4.0<br><a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox" target="_blank" rel="noopener">原始资源与许可 ↗</a></p>');
    if(world.warnings.length)toast('部分环境资源未加载，场景已使用可用植被');
  }catch(error){console.error(error);errors.push(String(error));progress('资源加载失败，请检查终端后刷新页面',0);$('start-label').textContent='重新加载';$<HTMLButtonElement>('start').disabled=false;$('start').onclick=()=>location.reload();}
}
const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const rawDelta=clock.getDelta(),dt=Math.min(rawDelta,.05);elapsed+=dt;
  if(dinosaur){
    if(phase==='intro'){
      dinosaur.root.rotation.y=-1.2;
      const p=dinosaur.root.position;camera.position.set(p.x+12+Math.sin(elapsed*.055)*1.4,p.y+5.8,p.z+16);camera.lookAt(p.x-4,p.y+2.6,p.z+2);
      dinosaur.update(dt,{action:'idle',speed:0});
    }else if(phase==='playing'){
      const state=controller.update(dt);simulation.update(dt,playerPose());world.updateTrees(dt,playerPose());wildlife.update(dt,simulation,elapsed);dinosaur.update(dt,state);sound.update(dt,state.speed);
      $('experience').classList.toggle('hurt',simulation.elapsed<hurtUntil);
      for(const event of simulation.drainEvents()){
        updateHud();
        if(event.type==='kill')toast('猎物已倒下 · 靠近后按 E 进食');
        if(event.type==='eat')toast(`进食完成 · 饱食度 +${event.food} · 生命 +${event.heal}`);
        if(event.type==='tree')toast('树木倒下，道路已打开 · 60 秒后重新长回');
        if(event.type==='hit')toast('击中霸王龙！它会追击并反咬，注意躲避');
        if(event.type==='threat')toast('霸王龙正在蓄力！侧移或拉开距离');
        if(event.type==='hurt'){hurtUntil=simulation.elapsed+.65;toast(`被霸王龙咬中 · 生命 -${COMBAT.rexDamage}`);}
        if(event.type==='miss')toast('未咬中 · 靠近猎物，并让头部朝向它');
        if(event.type==='hungry')toast('你饿了。寻找小兽，咬倒后进食。');
        if(event.type==='death'){phase='dead';controller.setEnabled(false);sound.pause();photo=false;$('experience').classList.remove('photo-mode');$('photo-hint').classList.add('hidden');$('death-screen').classList.remove('hidden');$('death-title').textContent=simulation.deathCause==='combat'?'倒在巨兽的反击下':'生命止于饥饿';$('death-title').nextElementSibling!.textContent=simulation.deathCause==='combat'?'下次留意蓄力提示，侧移或拉开距离躲过反咬。':'饱食度耗尽后生命会流失。追上猎物，攻击后靠近进食。';$('death-stats').textContent=`生存 ${Math.floor(simulation.elapsed/60)} 分 ${Math.floor(simulation.elapsed%60)} 秒 · 捕获 ${simulation.kills} · 进食 ${simulation.meals}`;updateHud();}
      }
      if(frameCount%8===0)updateHud();
    }else if(phase==='dead'){
      dinosaur.update(dt,{action:'dead',speed:0});
    }
    world.update(elapsed,dinosaur.root.position);
  }
  renderer.render(world.scene,camera);frameCount++;fpsClock+=rawDelta;if(fpsClock>1){
    fps=Math.round(frameCount/fpsClock);frameCount=0;fpsClock=0;
    if(quality==='auto'&&(phase==='playing'||phase==='intro')&&!document.hidden){
      slowWindows=fps<29?slowWindows+1:0;
      if(slowWindows>=3&&renderer.getPixelRatio()>.7){renderer.setPixelRatio(Math.max(.7,renderer.getPixelRatio()-.15));world.setQuality(false);slowWindows=0;}
    }
  }
}
// A read-only diagnostic snapshot for reproducible browser smoke tests.
Object.defineProperty(window,'__islandDebug',{value:()=>({phase,photo,muted,playerKind,trees:{total:world.trees.trees.length,fallen:world.trees.trees.filter(t=>t.fallen).map(t=>({id:t.id,age:t.age,active:t.obstacle.active,x:t.obstacle.x,z:t.obstacle.z})),matrices:world.treeDiagnostics()},position:dinosaur?.root.position.toArray(),camera:camera.position.toArray(),motion:controller?{...controller.state}:null,pose:dinosaur?.getPoseMetrics(),wildlife:wildlife.diagnostics(),clips:dinosaur?.clips,survival:simulation?{hunger:simulation.hunger,health:simulation.health,dead:simulation.dead,kills:simulation.kills,meals:simulation.meals,creatures:simulation.creatures.map(c=>({...c}))}:null,render:{fps,pixelRatio:renderer.getPixelRatio(),calls:renderer.info.render.calls,triangles:renderer.info.render.triangles},warnings:world.warnings,errors:[...errors]})});
// Scenario setup is stripped from production builds and available only on ?qa=1.
if(import.meta.env.DEV&&new URLSearchParams(location.search).has('qa'))Object.defineProperty(window,'__islandTest',{value:{
  scenario:(name:string)=>{if(phase!=='playing')throw new Error('Start the game first');if(name==='combat'||name==='combat-death'){controller.reset({x:25,z:134,heading:Math.PI});const c=simulation.creatures.find(c=>c.kind==='dinosaur')!;Object.assign(c,{x:25,z:129,home:{x:25,z:129},heading:0,active:true,alive:true,health:180,portions:3,aggro:0,windup:0,attackCooldown:0,mode:'idle',timer:100});simulation.hunger=10;simulation.health=name==='combat-death'?18:100;for(const other of simulation.creatures)if(other!==c&&Math.hypot(other.x-25,other.z-134)<15){other.x=other.home.x+25;other.z=other.home.z-30;}}if(name==='tree'){const tree=[...world.trees.trees].sort((a,b)=>Math.hypot(a.obstacle.x-25,a.obstacle.z-137)-Math.hypot(b.obstacle.x-25,b.obstacle.z-137)).find(t=>!t.fallen&&world.obstacles.every(o=>o===t.obstacle||o.active===false||Math.hypot(o.x-t.obstacle.x,o.z-(t.obstacle.z+4))>o.radius+1.4)&&riverDepth(t.obstacle.x,t.obstacle.z+4)===0)!;controller.reset({x:tree.obstacle.x,z:tree.obstacle.z+4,heading:Math.PI});return {id:tree.id,...tree.obstacle};}if(name==='starve'){simulation.hunger=.01;simulation.health=2;}if(name==='hunt'||name==='hunt-raptor'){controller.reset({x:25,z:playerKind==='raptor'?132:134,heading:Math.PI});const c=simulation.creatures.find(c=>c.kind===(name==='hunt-raptor'?'raptor':'fox'))!;Object.assign(c,{x:25,z:129,active:true,alive:true,mode:'idle',timer:10,fear:0});simulation.hunger=45;}if(name==='river')controller.reset({x:riverCenter(115),z:115,heading:Math.PI});if(name.startsWith('species:')){const kind=name.split(':')[1];const c=simulation.creatures.find(c=>c.kind===kind)!;Object.assign(c,{x:33,z:121,home:{x:33,z:121},heading:-.8,mode:'idle',timer:100,fear:0});controller.reset({x:25,z:137,heading:Math.PI});}},
}});
void init();animate();
