export type Phase = 'ready' | 'playing' | 'paused' | 'won' | 'lost';
import {ISLANDS,TREES} from './islands.ts';
export type Mode = 'helm' | 'deck' | 'cage' | 'shore' | 'dragged';
export type Weapon = 'speargun' | 'knife';
export const DESTINATION = {x:0, z:1800, radius:65};
export const MAX_DEPTH = 38;
export const MAX_SPEED = 13.6;
export interface Controls {forward:number; turn:number; brake:boolean; moveX:number; moveZ:number; lookYaw:number; dive:number; repair:boolean;}
export const EMPTY_CONTROLS: Controls = {forward:0,turn:0,brake:false,moveX:0,moveZ:0,lookYaw:0,dive:0,repair:false};
export interface Stats {hits:number; repelled:number; breaches:number; maxDepth:number; distance:number;}
export class Game {
  phase:Phase='ready'; mode:Mode='helm'; weapon:Weapon='speargun';
  x=0; z=0; heading=0; speed=0; throttle=0; rudder=0; hull=100; cageHealth=100; depth=0;
  deckX=0; deckZ=-.4; time=0; elapsed=0; ammo=5; reload=0; cooldown=0; damageFlash=0; hitFlash=0;
  message=''; messageTime=0; reason=''; anchored=false;
  wood=0;hasAxe=false;shoreX=0;shoreZ=0;islandId=-1;repairProgress=0;chopCooldown=0;dragTime=0;repairs=0;
  trees=TREES.map(t=>({...t,hits:0,felledAt:-1,collected:false}));
  stats:Stats={hits:0,repelled:0,breaches:0,maxDepth:0,distance:0};
  private enteredDanger=false; private deepNotice=false;
  start(){this.reset();this.phase='playing';this.notify('灯塔在正北 1.8 km。缓推油门，驶离这片浅海。',7);}
  reset(){
    this.phase='ready';this.mode='helm';this.weapon='speargun';this.x=0;this.z=0;this.heading=0;this.speed=0;
    this.throttle=0;this.rudder=0;this.hull=100;this.cageHealth=100;this.depth=0;this.deckX=0;this.deckZ=-.4;
    this.time=0;this.elapsed=0;this.ammo=5;this.reload=0;this.cooldown=0;this.damageFlash=0;this.hitFlash=0;
    this.message='';this.messageTime=0;this.reason='';this.anchored=false;this.enteredDanger=false;this.deepNotice=false;
    this.stats={hits:0,repelled:0,breaches:0,maxDepth:0,distance:0};
    this.wood=0;this.hasAxe=false;this.shoreX=0;this.shoreZ=0;this.islandId=-1;this.repairProgress=0;this.chopCooldown=0;this.dragTime=0;this.repairs=0;
    this.trees=TREES.map(t=>({...t,hits:0,felledAt:-1,collected:false}));
  }
  get remaining(){return Math.hypot(DESTINATION.x-this.x,DESTINATION.z-this.z);}
  get progress(){return Math.max(0,Math.min(1,this.z/DESTINATION.z));}
  get nearCage(){return Math.hypot(this.deckX-1.2,this.deckZ+2.2)<1.55;}
  get nearHelm(){return Math.hypot(this.deckX,this.deckZ-1.8)<1.65;}
  get nearestIsland(){return [...ISLANDS].sort((a,b)=>Math.hypot(this.x-a.dockX,this.z-a.z)-Math.hypot(this.x-b.dockX,this.z-b.z))[0];}
  get dockDistance(){const i=this.nearestIsland;return Math.hypot(this.x-i.dockX,this.z-i.z);}
  get landingDistance(){const i=ISLANDS[this.islandId];return i?Math.hypot(this.shoreX-i.landingX,this.shoreZ-i.z):Infinity;}
  get nearbyTree(){return this.trees.filter(t=>t.islandId===this.islandId&&!t.collected).sort((a,b)=>Math.hypot(this.shoreX-a.x,this.shoreZ-a.z)-Math.hypot(this.shoreX-b.x,this.shoreZ-b.z))[0];}
  get interactLabel(){
    if(this.mode==='dragged')return '笼架已断裂';
    if(this.mode==='shore'){
      if(!this.hasAxe&&this.landingDistance<4)return '从岸边工具架拿起斧头';
      const t=this.nearbyTree;
      if(t&&Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)<3)return t.hits>=3?'收集倒木 · +4 木材':'F / 左键挥斧 · 砍伐海松';
      return this.landingDistance<6?'B 返回船上 · R 使用木材修复':'走近树木砍伐，或返回码头';
    }
    if(this.mode==='helm') return Math.abs(this.speed)>1.2?'停船并离开驾驶位':'离开驾驶位';
    if(this.mode==='cage') return this.depth>.12?'先升至海面，再返回甲板':'打开笼门 · 返回甲板';
    if(this.nearCage) return '进入潜水笼';
    if(this.nearHelm) return '回到驾驶位';
    return '走向左后方潜笼 / 前方舵台';
  }
  notify(text:string,seconds=4){this.message=text;this.messageTime=seconds;}
  interact(){
    if(this.phase!=='playing')return;
    if(this.mode==='dragged')return;
    if(this.mode==='shore'){
      if(!this.hasAxe&&this.landingDistance<4){this.hasAxe=true;this.notify('已拿起伐木斧。靠近海松，左键 / F 砍三次，再按 E 收集木材。',6);return;}
      const tree=this.nearbyTree;
      if(tree&&Math.hypot(this.shoreX-tree.x,this.shoreZ-tree.z)<3&&tree.hits>=3){
        if(this.time-tree.felledAt<1.8){this.notify('树正在倒下，稍等片刻。',1);return;}
        tree.collected=true;this.wood+=4;this.notify('收集到 4 份木材。回到码头或甲板，按住 R 修复船只。',5);return;
      }
      this.notify(this.interactLabel,3);return;
    }
    if(this.mode==='helm'){
      if(Math.abs(this.speed)>1.2){this.anchored=true;this.throttle=0;this.notify('正在减速抛锚。停稳后再次按 E 离开驾驶位。');return;}
      this.anchored=true;this.throttle=0;this.mode='deck';this.deckX=0;this.deckZ=-.4;
      this.notify('已抛锚。WASD 在甲板移动；左后方是潜水笼，前方是舵台。',7);return;
    }
    if(this.mode==='deck'){
      if(this.nearCage){this.mode='cage';this.depth=0;this.notify('W 下潜 / S 上浮。按住右键环顾，1 鱼枪 / 2 潜水刀。无需氧气。',8);return;}
      if(this.nearHelm){this.mode='helm';this.anchored=false;this.notify('起锚。W 加油门，A / D 转向，灯塔仍在前方。');return;}
      this.notify('靠近左后方的潜笼入口，或走到前方舵台。');return;
    }
    if(this.depth>.12){this.notify('按住 S 或空格升到海面，随后按 E 打开笼门。');return;}
    this.mode='deck';this.deckX=1;this.deckZ=-2.2;this.notify('回到甲板。E 回到前方舵台；维修需要从小岛采集的木材。',6);
  }
  dock(){
    if(this.phase!=='playing'||this.mode==='cage'||this.mode==='dragged')return;
    if(this.mode==='shore'){
      if(this.landingDistance>6){this.notify('先返回码头，再按 B 登船。');return;}
      this.mode='deck';this.deckX=0;this.deckZ=-.4;this.notify('已登船。前往舵台按 E，继续航行。');return;
    }
    if(this.dockDistance>19){this.notify(`驶向${this.nearestIsland.name}码头（${Math.round(this.dockDistance)} m），在岸边按 B。`,4);return;}
    if(Math.abs(this.speed)>1.2){this.throttle=0;this.anchored=true;this.notify('靠岸前正在减速，停稳后再次按 B。');return;}
    const i=this.nearestIsland;this.x=i.dockX;this.z=i.z;this.heading=0;this.speed=0;this.throttle=0;this.anchored=true;
    this.mode='shore';this.islandId=i.id;this.shoreX=i.landingX;this.shoreZ=i.z;
    this.notify(this.hasAxe?'已靠岸。砍伐海松收集木材；码头按 R 修船、B 登船。':'已靠岸。按 E 从工具架拿斧头，再去砍伐海松。',6);
  }
  chop(){
    if(this.phase!=='playing'||this.mode!=='shore'||this.chopCooldown>0)return false;
    if(!this.hasAxe){this.notify('先到码头工具架按 E 拿起斧头。');return false;}
    this.chopCooldown=.8;const t=this.nearbyTree;
    if(!t||Math.hypot(this.shoreX-t.x,this.shoreZ-t.z)>2.7){this.notify('再靠近树干一些。',1.2);return true;}
    if(t.hits>=3){this.notify('按 E 收集倒木。',1.2);return true;}
    t.hits++;this.hitFlash=.7;if(t.hits===3){t.felledAt=this.time;this.notify('海松倒下了。按 E 收集木材。',3);}else this.notify(`斧头切入树干 · ${t.hits} / 3`,1.5);
    return true;
  }
  pause(){if(this.phase==='playing')this.phase='paused';else if(this.phase==='paused')this.phase='playing';}
  damage(amount:number,target:'boat'|'cage'){
    if(this.phase!=='playing')return;
    if(this.mode==='shore'||this.mode==='dragged')return;
    if(target==='cage'&&this.mode!=='cage')return;
    if(target==='boat')this.hull=Math.max(0,this.hull-amount);else this.cageHealth=Math.max(0,this.cageHealth-amount);
    this.damageFlash=1;
    this.notify(target==='cage'?'白鲨正在撕咬笼架！立即防御或上浮！':'船板被咬裂！寻找小岛伐木，用木材修复船体。',4);
    if(this.cageHealth<=0){this.mode='dragged';this.dragTime=0;this.throttle=0;this.reason='白鲨撞破潜笼，将你拖进了深海。';this.notify('钢条断裂了——白鲨冲进了笼子！',6);}
    else if(this.hull<=0){this.throttle=0;this.notify('船体严重破损，引擎熄火！WASD 应急划桨，驶向小岛伐木修复。',9);}
  }
  reloadWeapon(){if(this.phase==='playing'&&this.mode==='cage'&&this.ammo<5&&this.reload<=0){this.reload=2.4;this.notify('正在装填鱼枪…',2.4);}}
  fire(){
    if(this.phase!=='playing'||this.mode!=='cage'||this.cooldown>0||this.reload>0)return false;
    if(this.depth<1){this.notify('下潜后再使用武器。');return false;}
    if(this.weapon==='speargun'&&this.ammo<=0){this.reloadWeapon();return false;}
    if(this.weapon==='speargun')this.ammo--;
    this.cooldown=this.weapon==='speargun'?1.05:.65;
    return true;
  }
  registerHit(killed:boolean){this.stats.hits++;if(killed)this.stats.repelled++;this.hitFlash=1;this.notify(killed?'威胁解除 · 白鲨缓缓沉入深处':'命中 · 白鲨受惊退避',2.4);}
  step(dt:number,input:Controls){
    if(this.phase!=='playing')return;
    dt=Math.min(Math.max(dt,0),.05);this.elapsed+=dt;this.time+=dt;
    if(this.mode==='dragged'){this.dragTime+=dt;if(this.dragTime>=6)this.phase='lost';return;}
    this.chopCooldown=Math.max(0,this.chopCooldown-dt);
    this.cooldown=Math.max(0,this.cooldown-dt);this.damageFlash=Math.max(0,this.damageFlash-dt*.75);this.hitFlash=Math.max(0,this.hitFlash-dt*2.5);
    this.messageTime=Math.max(0,this.messageTime-dt);
    if(this.reload>0){this.reload=Math.max(0,this.reload-dt);if(this.reload===0){this.ammo=5;this.notify('鱼枪已装填',1.6);}}
    if(this.mode==='helm'){
      if(input.forward>0){this.anchored=false;this.throttle=Math.min(1,this.throttle+dt*.38);}
      if(input.forward<0){this.anchored=false;this.throttle=Math.max(-.24,this.throttle-dt*.58);}
      if(input.brake){this.throttle=0;this.anchored=true;}
      this.rudder+=(input.turn-this.rudder)*Math.min(1,dt*2.5);
    }else {this.throttle=0;this.rudder*=Math.exp(-dt*3);}
    const targetSpeed=this.anchored?0:this.throttle*(this.hull<=0?2.6:MAX_SPEED*(.32+.68*this.hull/100));
    const acceleration=this.anchored?1.4:.33;
    this.speed+=(targetSpeed-this.speed)*(1-Math.exp(-dt*acceleration));
    if(Math.abs(targetSpeed)<.01&&Math.abs(this.speed)<.015)this.speed=0;
    this.heading+=this.rudder*.38*(this.hull<=0?this.speed/5:this.speed/MAX_SPEED)*dt;
    const dx=Math.sin(this.heading)*this.speed*dt,dz=Math.cos(this.heading)*this.speed*dt;
    this.x+=dx;this.z+=dz;this.stats.distance+=Math.hypot(dx,dz);
    for(const island of ISLANDS){
      const ix=this.x-island.x,iz=this.z-island.z,distance=Math.hypot(ix,iz),limit=island.radius+6;
      if(distance<limit){const a=distance<.001?island.side:ix/distance,b=distance<.001?0:iz/distance;this.x=island.x+a*limit;this.z=island.z+b*limit;this.speed*=.92;this.notify('浅滩！沿海岸找到挂旗的码头，停船后按 B 上岸。',2);}
    }
    if(Math.abs(this.x)>900||this.z< -100||this.z>2000){this.x=Math.max(-900,Math.min(900,this.x));this.z=Math.max(-100,Math.min(2000,this.z));this.speed*=.95;this.notify('已偏离航道。转向罗盘上的灯塔标记。',3);}
    if(this.mode==='deck'){
      const len=Math.max(1,Math.hypot(input.moveX,input.moveZ));
      const yaw=input.lookYaw-this.heading;
      this.deckX+=(Math.cos(yaw)*input.moveX+Math.sin(yaw)*input.moveZ)/len*dt*2.0;
      this.deckZ+=(-Math.sin(yaw)*input.moveX+Math.cos(yaw)*input.moveZ)/len*dt*2.0;
      this.deckX=Math.max(-1.18,Math.min(1.18,this.deckX));this.deckZ=Math.max(-3.6,Math.min(3.5,this.deckZ));
    }
    if(this.mode==='shore'){
      const len=Math.max(1,Math.hypot(input.moveX,input.moveZ)),yaw=input.lookYaw;
      this.shoreX+=(Math.cos(yaw)*input.moveX+Math.sin(yaw)*input.moveZ)/len*dt*3;
      this.shoreZ+=(-Math.sin(yaw)*input.moveX+Math.cos(yaw)*input.moveZ)/len*dt*3;
      const i=ISLANDS[this.islandId],dx=this.shoreX-i.x,dz=this.shoreZ-i.z,d=Math.hypot(dx,dz),r=i.radius*.8;
      if(d>r){this.shoreX=i.x+dx/d*r;this.shoreZ=i.z+dz/d*r;}
      for(const t of this.trees){if(t.islandId!==this.islandId||t.hits>=3)continue;const dx=this.shoreX-t.x,dz=this.shoreZ-t.z,d=Math.hypot(dx,dz);if(d<.9){this.shoreX=t.x+(d>.001?dx/d:1)*.9;this.shoreZ=t.z+(d>.001?dz/d:0)*.9;}}
    }
    if(input.repair&&(this.mode==='deck'||this.mode==='shore'&&this.landingDistance<6)){
      if(this.hull>=100&&this.cageHealth>=100){this.repairProgress=0;this.notify('船体与笼架已完好。',.3);}
      else if(this.wood<1){this.repairProgress=0;this.notify('需要木材：靠岸拿斧头，砍树后按 E 收集。',.5);}
      else {this.repairProgress+=dt;this.notify(`正在固定新船板… ${Math.round(this.repairProgress/1.4*100)}%`,.3);if(this.repairProgress>=1.4){this.repairProgress=0;this.wood--;this.hull=Math.min(100,this.hull+25);this.cageHealth=Math.min(100,this.cageHealth+18);this.repairs++;this.notify('船板已固定 · 木材 -1',1);}}
    }else this.repairProgress=0;
    if(this.mode==='cage'){
      this.depth=Math.max(0,Math.min(MAX_DEPTH,this.depth+input.dive*2.6*dt));
      this.stats.maxDepth=Math.max(this.stats.maxDepth,this.depth);
      if(this.depth>9&&!this.deepNotice){this.deepNotice=true;this.notify('深度 10 m。留意侧方与脚下；急促靠近的白鲨才是威胁。',6);}
    }
    if(this.z>240&&!this.enteredDanger){this.enteredDanger=true;this.notify('进入白鲨巡游区。水面上的背鳍，只是它们的一小部分。',6);}
    if(this.remaining<DESTINATION.radius&&this.mode==='helm'&&this.hull>0){this.phase='won';this.throttle=0;this.notify('已抵达北岬灯塔。');}
  }
  snapshot(){return {phase:this.phase,mode:this.mode,x:this.x,z:this.z,heading:this.heading,speed:this.speed,throttle:this.throttle,hull:this.hull,cageHealth:this.cageHealth,depth:this.depth,ammo:this.ammo,reload:this.reload,weapon:this.weapon,elapsed:this.elapsed,remaining:this.remaining,progress:this.progress,deckX:this.deckX,deckZ:this.deckZ,stats:{...this.stats},interact:this.interactLabel,wood:this.wood,hasAxe:this.hasAxe,shoreX:this.shoreX,shoreZ:this.shoreZ,islandId:this.islandId,dockDistance:this.dockDistance,nearestIsland:this.nearestIsland.name,repairs:this.repairs,dragTime:this.dragTime,trees:this.trees.map(t=>({...t}))};}
}

