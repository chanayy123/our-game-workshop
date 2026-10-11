export type Phase = 'ready' | 'playing' | 'paused' | 'won' | 'lost';
export type Mode = 'land' | 'surface' | 'underwater' | 'buried' | 'seabed-buried';
export type Vec = {x:number;z:number};
export type Human = Vec & {id:number;home:number;heading:number;state:'walk'|'flee'|'call'|'dragged';timer:number;alive:boolean;caller:boolean;caught?:'water'|'sand'|'bite'};
export type Drag = {id:number;kind:'water'|'sand';elapsed:number;duration:number;start:Vec;humanStart:Vec;end:Vec};
export type Cop = Vec & {id:number;hp:number;attack:number};
export type Shark = Vec & {id:number;home:Vec;hp:number;heading:number;state:'cruise'|'windup'|'charge'|'recover';timer:number;dx:number;dz:number};
export type Food = Vec & {id:number;kind:'fish'|'clam'|'relic';deep:boolean;active:boolean;respawn:number};
export type Effect = Vec & {id:number;kind:'bite'|'sand'|'splash'|'food'|'hit'|'shot';age:number};
export type Input = {x:number;z:number;sprint:boolean;facing?:number};
export type Obstacle=Vec & {radius:number;deep?:boolean};
export const HOME = {x:-45,z:22};
export const ANCIENT = {x:47,z:20,length:9};
export const MAX_LENGTH = 50;
export const MAX_HEALTH = 160;
export const GROWTH_TO_MAX = 600;
export const TRIAL_LENGTH = 12;
export const dist = (a:Vec,b:Vec) => Math.hypot(a.x-b.x,a.z-b.z);
export const clamp = (n:number,a:number,b:number) => Math.max(a,Math.min(b,n));
export const beach = (x:number) => Math.sin(x*.075)*2 + Math.sin(x*.19)*.7;
export const isWater = (p:Vec) => p.z>beach(p.x);
export const isDeep = (p:Vec) => p.z>beach(p.x)+5;
export const isSand = (p:Vec) => p.z<=beach(p.x)+.3 && p.z>beach(p.x)-13;
// The same continuous shoreline is used by the terrain mesh and the first-person eye.
export const terrainHeight = (x:number,z:number) => {
  const shore=z-beach(x);
  if(shore>0)return -.08-3.72*Math.min(1,shore/6);
  return .08+Math.min(1,Math.max(0,-shore-11)/12)*.35+Math.sin(x*.5)*Math.sin(z*.4)*.035;
};

export class Game {
  phase:Phase='ready'; mode:Mode='land'; freeRoam=false; x=-31;z=-5;heading=Math.PI;
  health=MAX_HEALTH; stamina=100; oxygen=100; hunger=100; growth=0; heat=0; elapsed=0;
  disguised=false; dragging:Drag|null=null; waterDrags=0; sandDrags=0;
  eaten=0; humanEscapes=0; sandTrailTime=0; sharksDefeated=0; relics=0; ambushes=0; policeDefeated=0; alarmCount=0;
  policeETA=-1; hiddenTime=0; biteCooldown=0; biteAnim=0; hurt=0; dash=0; healTime=0;
  lossReason=''; message='沿海岸潜行。靠近目标后按空格咬击。'; messageTime=6;
  humans:Human[]=[]; police:Cop[]=[]; sharks:Shark[]=[]; foods:Food[]=[]; effects:Effect[]=[];
  obstacles:Obstacle[]=[];
  sounds:string[]=[]; id=1; seed=1267;
  constructor(){this.populate();}
  get length(){return 3.2+(MAX_LENGTH-3.2)*clamp(this.growth/GROWTH_TO_MAX,0,1);}
  get maxHealth(){return MAX_HEALTH;}
  get biteRange(){return Math.min(15,this.length*.48+1.3);}
  get powerfulPolice(){return this.police.length>5&&this.length<TRIAL_LENGTH;}
  get submerged(){return this.mode==='underwater'||this.mode==='seabed-buried';}
  get sandHidden(){return this.mode==='buried'||this.mode==='seabed-buried';}
  get hidden(){return this.sandHidden||this.submerged;}
  get objectives(){return [this.length>=TRIAL_LENGTH,this.relics>=3,this.sharksDefeated>=2];}
  get readyToReturn(){return this.objectives.every(Boolean);}
  random(){this.seed=(this.seed*1664525+1013904223)>>>0;return this.seed/4294967296;}
  populate(){
    for(let i=0;i<25;i++){
      const x=-48+(i%13)*7.8;this.humans.push({id:this.id++,x,z:beach(x)-4-(i%3)*3,home:x,heading:i%2?1:-1,state:'walk',timer:0,alive:true,caller:i%3!==1});
    }
    for(let i=0;i<23;i++){
      const x=-49+this.random()*100;const deep=i%2===0;
      this.foods.push({id:this.id++,x,z:beach(x)+(deep?10+this.random()*24:3+this.random()*10),kind:deep?'clam':'fish',deep,active:true,respawn:0});
    }
    [{x:-28,z:20},{x:0,z:31},{x:27,z:17}].forEach(p=>this.foods.push({...p,id:this.id++,kind:'relic',deep:true,active:true,respawn:0}));
    [{x:-10,z:24},{x:17,z:30},{x:32,z:12}].forEach(p=>this.sharks.push({...p,home:{...p},id:this.id++,hp:4,heading:0,state:'cruise',timer:3,dx:0,dz:0}));
  }
  start(){this.phase='playing';this.notice('潜伏、捕食、成长。水下藏着三枚潮汐遗物。',6);}
  pause(){if(this.phase==='playing')this.phase='paused';else if(this.phase==='paused')this.phase='playing';}
  continueExploring(){if(this.phase==='won'){this.freeRoam=true;this.phase='playing';this.notice('试炼完成 · 自由探索继续，警察仍会随报警次数增强。',6);}}
  notice(text:string,time=3){this.message=text;this.messageTime=time;}
  fx(kind:Effect['kind'],p:Vec=this){this.effects.push({...p,id:this.id++,kind,age:0});}
  sound(name:string){this.sounds.push(name);}
  bury(){
    if(this.phase!=='playing'||this.dragging)return;
    this.disguised=false;
    if(this.mode==='seabed-buried'){this.mode='underwater';this.fx('sand');this.sound('sand');this.notice('离开海底沙子，继续探索。');return;}
    if(this.mode==='underwater'){this.mode='seabed-buried';this.hiddenTime=0;this.fx('sand');this.sound('sand');this.notice('藏进海底沙子 · 鲨鱼失去目标，WASD 可缓慢穿行，E 出沙。',5);return;}
    if(this.mode==='buried'){this.mode='land';this.fx('sand');this.sound('sand');this.notice('重回沙滩。');return;}
    if(!isSand(this)){this.notice('先到浅色沙滩，或下潜到海底，再按 E 潜沙。');return;}
    this.mode='buried';this.hiddenTime=0;this.fx('sand');this.sound('sand');this.notice('已潜沙 · WASD 缓慢穿行，靠近行人后按空格伏击。',5);
  }
  dive(){
    if(this.phase!=='playing'||this.dragging)return;
    this.disguised=false;
    if(this.submerged){this.mode='surface';this.fx('splash');this.sound('dive');this.notice('浮出水面，恢复氧气。');return;}
    if(!isDeep(this)){this.notice('再游远一点，到深水区才能下潜。');return;}
    this.mode='underwater';this.hiddenTime=0;this.fx('splash');this.sound('dive');this.notice('进入海底 · 靠近贝类与遗物按空格；留意氧气。',5);
  }
  disguise(){
    if(this.phase!=='playing'||this.dragging)return;
    if(this.mode!=='land'){this.notice('先回到沙滩并出沙，才能变成人形。');return;}
    this.disguised=!this.disguised;this.fx('sand');this.sound('sand');this.notice(this.disguised?'人形伪装 · 行人不会因靠近而逃跑。F 拖入水中，G 拖入沙里，空格吞食。':'解除伪装，恢复鳄鱼形态。',5);
  }
  alertWitnesses(h:Human){
    this.humans.forEach(w=>{if(w!==h&&w.alive&&w.state!=='dragged'&&dist(w,h)<25&&w.state!=='call'){w.state=w.caller?'call':'flee';w.timer=4.5;}});
  }
  consume(h:Human,kind:'water'|'sand'|'bite',alert=true){
    if(!h.alive)return;
    h.alive=false;h.caught=kind;this.eaten++;if(kind==='sand')this.ambushes++;
    this.eat(22);this.heat=clamp(this.heat+(kind==='sand'?18:28),0,100);
    if(alert)this.alertWitnesses(h);this.hiddenTime=0;
    this.notice(kind==='water'?'拖入水中成功 · 成长 +22':kind==='sand'?'伏击成功！拖入沙中 · 成长 +22':'一口吞食 · 成长 +22 · 目击者正在逃跑',4);
  }
  drag(kind:'water'|'sand'){
    if(this.phase!=='playing'||this.dragging)return;
    if(this.submerged){this.notice('拖拽需要先靠近岸上的行人。');return;}
    if(kind==='sand'&&!isSand(this)){this.notice('先到浅色沙滩，才能把行人拖进沙里。');return;}
    const h=this.humans.filter(h=>h.alive&&this.inReach(h,3.8,this.sandHidden)).sort((a,b)=>dist(this,a)-dist(this,b))[0];
    if(!h){this.notice('靠近并朝向行人 · 3.8 米内可以拖拽。',2);return;}
    const end=kind==='water'?{x:this.x,z:beach(this.x)+2.3}:{x:this.x,z:this.z};
    this.alertWitnesses(h);h.state='dragged';this.disguised=false;
    this.dragging={id:h.id,kind,elapsed:0,duration:clamp(dist(this,end)/6,1.2,2.8),start:{x:this.x,z:this.z},humanStart:{x:h.x,z:h.z},end};
    this.notice(kind==='water'?'抓住了！正把行人拖向水中……':'抓住了！正把行人拖入沙子……',3);this.sound('bite');this.biteAnim=.42;
  }
  updateDrag(dt:number){
    const action=this.dragging;if(!action)return;
    const h=this.humans.find(h=>h.id===action.id);if(!h||!h.alive){this.dragging=null;return;}
    action.elapsed+=dt;const t=clamp(action.elapsed/action.duration,0,1);
    this.x=action.start.x+(action.end.x-action.start.x)*t;this.z=action.start.z+(action.end.z-action.start.z)*t;
    h.x=action.humanStart.x+(this.x-action.humanStart.x)*t;h.z=action.humanStart.z+(this.z-action.humanStart.z)*t;h.heading=this.heading;
    this.mode=action.kind==='sand'?'buried':isWater(this)?'surface':'land';
    if(t>=1){if(action.kind==='water')this.waterDrags++;else this.sandDrags++;this.consume(h,action.kind,false);this.fx(action.kind==='water'?'splash':'sand');this.dragging=null;}
  }
  damage(amount:number,reason:string){
    if(this.phase!=='playing'||this.hurt>0)return;
    this.health=clamp(this.health-amount,0,MAX_HEALTH);this.hurt=.55;this.fx('hit');this.sound('hurt');
    if(this.health<=0){if(this.dragging){const h=this.humans.find(h=>h.id===this.dragging!.id);if(h)h.state='flee';this.dragging=null;}this.phase='lost';this.lossReason=reason;this.sound('lost');}
  }
  eat(amount:number){this.growth=clamp(this.growth+amount,0,GROWTH_TO_MAX);this.hunger=clamp(this.hunger+24,0,100);this.health=clamp(this.health+12,0,MAX_HEALTH);this.fx('food');this.sound('eat');}
  inReach(p:Vec,range:number,allAround=false){
    const d=dist(this,p);if(d>range)return false;
    if(allAround||d<.7)return true;
    return ((p.x-this.x)*Math.sin(this.heading)+(p.z-this.z)*Math.cos(this.heading))/d>.3;
  }
  bite(){
    if(this.phase!=='playing'||this.biteCooldown>0||this.dragging)return;
    this.disguised=false;
    this.biteCooldown=.7;this.biteAnim=.42;this.sound('bite');
    const buried=this.sandHidden;const range=this.biteRange;
    this.fx(buried?'sand':'bite');
    const eligible=this.humans.filter(h=>h.alive&&this.inReach(h,buried?range+1:range,buried)).sort((a,b)=>dist(this,a)-dist(this,b));
    if(!this.submerged&&eligible.length){
      this.consume(eligible[0],buried?'sand':'bite');return;
    }
    if(!this.submerged&&!buried){
      const cop=this.police.find(p=>this.inReach(p,range));
      if(cop){
        if(this.powerfulPolice){this.notice('六名以上形成防线，咬击无效！快下潜或潜沙。',4);this.sound('shield');return;}
        this.police=this.police.filter(p=>p!==cop);this.policeDefeated++;this.fx('sand',cop);this.sound('hit');this.notice(this.length>=TRIAL_LENGTH?'击退一名警察 · 巨鳄力量突破防线':'击退一名警察 · 五名以内可以逐个制服');return;
      }
    }
    if(this.mode==='surface'||this.submerged){
      const shark=this.sharks.find(s=>s.hp>0&&this.inReach(s,range));
      if(shark&&!buried){shark.hp-=this.length>=25?4:this.length>=9?2:1;shark.state='recover';shark.timer=1.6;this.fx('splash',shark);this.sound('hit');
        if(shark.hp<=0){this.sharksDefeated++;this.eat(14);this.notice('鲨鱼被击退！深海猎手 +1',4);}else this.notice(`咬中鲨鱼 · 剩余 ${shark.hp} 点耐力`);
        return;
      }
      const food=this.foods.find(f=>f.active&&f.deep===this.submerged&&this.inReach(f,range,true));
      if(food){food.active=false;food.respawn=35;
        if(food.kind==='relic'){this.relics++;this.sound('relic');this.notice(`找到潮汐遗物 ${this.relics}/3`,4);this.fx('food',food);}else{this.eat(food.deep?10:7);this.notice(food.deep?'吃到海底贝类 · 恢复生命与饱食':'吃到水面鱼群 · 恢复生命与饱食');}return;
      }
    }
    this.notice(buried?'伏击范围内没有行人，继续等待。':'咬空了 · 靠近目标，并朝向它。',1.2);
  }
  spawnPolice(){
    this.hiddenTime=0;
    const count=Math.min(7,1+Math.max(1,this.alarmCount)*2);
    this.police=Array.from({length:count},(_,i)=>({id:this.id++,x:clamp(this.x+(i%2?1:-1)*(12+i),-55,55),z:-18-(i%3),hp:1,attack:1+i*.15}));
    this.notice(this.powerfulPolice?`${count} 名警察包围海岸！先藏身，或成长到 12 米突破防线。`:`${count} 名警察已到场 · 可逐个咬退，或潜藏脱身`,6);this.sound('siren');
  }
  step(dt:number,input:Input={x:0,z:0,sprint:false}){
    if(this.phase!=='playing')return;
    dt=Math.min(dt,.05);this.elapsed+=dt;
    if(input.facing!==undefined)this.heading=input.facing;
    this.messageTime=Math.max(0,this.messageTime-dt);this.biteCooldown=Math.max(0,this.biteCooldown-dt);this.biteAnim=Math.max(0,this.biteAnim-dt);this.hurt=Math.max(0,this.hurt-dt);
    this.effects.forEach(e=>e.age+=dt);this.effects=this.effects.filter(e=>e.age<1);
    const moving=!this.dragging&&Math.hypot(input.x,input.z)>.1;
    const sprint=moving&&input.sprint&&this.stamina>5&&!this.sandHidden;
    this.stamina=clamp(this.stamina+(sprint?-24:16)*dt,0,100);this.dash=sprint?1:0;
    if(moving){
      const oldX=this.x,oldZ=this.z;
      const n=Math.hypot(input.x,input.z);const speed=(this.sandHidden?1.8:this.disguised?3.8:this.mode==='land'?4.6:6.2)*(sprint?1.7:1);
      this.x=clamp(this.x+input.x/n*speed*dt,-56,56);this.z=clamp(this.z+input.z/n*speed*dt,-23,40);
      for(const o of this.obstacles){
        if(o.deep?!this.submerged:isWater(this))continue;
        const dx=this.x-o.x,dz=this.z-o.z,d=Math.hypot(dx,dz),r=o.radius+.24+Math.min(this.length,12)*.035;
        if(d<r){const nx=d>1e-5?dx/d:-input.x/n,nz=d>1e-5?dz/d:-input.z/n;this.x=clamp(o.x+nx*r,-56,56);this.z=clamp(o.z+nz*r,-23,40);}
      }
      // Hidden travel stays inside the sand band; emerging is an explicit E action.
      if(this.mode==='buried'&&!isSand(this)){this.x=oldX;this.z=oldZ;}
      if(this.mode==='seabed-buried'&&!isDeep(this)){this.x=oldX;this.z=oldZ;}
      if(this.sandHidden&&dist(this,{x:oldX,z:oldZ})>.001){this.sandTrailTime-=dt;if(this.sandTrailTime<=0){this.fx('sand');this.sandTrailTime=.24;}}
      if(input.facing===undefined)this.heading=Math.atan2(input.x,input.z);
    }
    this.updateDrag(dt);
    if(!this.sandHidden&&!this.submerged)this.mode=isWater(this)?'surface':'land';
    if(this.mode!=='land')this.disguised=false;
    if(this.mode==='underwater'&&!isDeep(this)){this.mode=isWater(this)?'surface':'land';this.notice('进入浅水，自动浮起。');}
    this.hiddenTime=this.hidden?this.hiddenTime+dt:0;
    this.hunger=clamp(this.hunger-(this.hidden?.14:.28)*dt,0,100);
    if(this.hunger===0)this.damage(2,'太久没有进食。到水中寻找鱼群和贝类补充体力。');
    this.oxygen=clamp(this.oxygen+(this.mode==='seabed-buried'?-.45:this.submerged?-1.1:19)*dt,0,100);
    if(this.oxygen===0){this.mode='surface';this.notice('氧气用尽，已紧急上浮！',4);this.damage(6,'在追捕中耗尽氧气。');}
    this.heat=clamp(this.heat-(this.hidden?3.4:.4)*dt,0,100);
    if(this.policeETA>=0){this.policeETA-=dt;if(this.policeETA<=0){this.policeETA=-1;this.spawnPolice();}}
    this.updateHumans(dt);this.updatePolice(dt);this.updateSharks(dt);
    for(const f of this.foods){if(!f.active&&f.kind!=='relic'){f.respawn-=dt;if(f.respawn<=0)f.active=true;}}
    if(dist(this,ANCIENT)<6.8&&this.length<ANCIENT.length){this.notice('远古巨鳄 · 9 米。先成长，再挑战它的领地！',2);this.damage(18,'闯入了远古巨鳄的领地。成长到 9 米后它会让开。');}
    if(dist(this,HOME)<4.5){this.healTime+=dt;if(this.healTime>1){this.health=clamp(this.health+3,0,MAX_HEALTH);this.healTime=0;}
      if(this.readyToReturn&&!this.freeRoam&&this.phase==='playing'){this.phase='won';this.sound('win');}
    }
  }
  updateHumans(dt:number){
    for(const h of this.humans){
      if(!h.alive||h.state==='dragged')continue;
      const near=dist(this,h);
      if(h.state==='call'){
        h.timer-=dt;
        if(h.timer<=0){h.state='flee';
          if(this.policeETA<0&&this.police.length===0){this.alarmCount++;this.policeETA=14;this.heat=Math.max(60,this.heat);this.notice('目击者报警成功 · 警察将在 14 秒后到达',5);this.sound('alarm');}
        }
      }else if(h.state==='flee'){
        // Run inland while sidestepping the hunter, so pursuit needs steering.
        const away=clamp((h.x-this.x)/Math.max(near,1),-.7,.7);
        const dx=away*.9+Math.sin(this.elapsed*2.5+h.id)*.3,dz=-1;
        const n=Math.hypot(dx,dz);h.x=clamp(h.x+dx/n*dt*3.8,-53,53);h.z+=dz/n*dt*3.8;h.heading=Math.atan2(dx,dz);
        if(h.z< -25){this.humanEscapes++;if(this.messageTime<1)this.notice('行人逃出了追逐范围 · 试试潜沙绕近再伏击。',3);h.x=clamp(h.home+14,-50,50);h.home=h.x;h.heading=this.random()>.5?1:-1;h.z=beach(h.x)-11;h.state='walk';}
      }else{
        h.x+=h.heading*dt*.9;
        if(Math.abs(h.x-h.home)>5||Math.abs(h.x)>53)h.heading*=-1;
        h.z=Math.min(h.z,beach(h.x)-2.5);
        if(near<7&&!this.hidden&&!this.disguised&&this.mode==='land'){h.state='flee';}
      }
    }
  }
  updatePolice(dt:number){
    if(!this.police.length)return;
    if(this.hiddenTime>13){this.police=[];this.heat=0;this.notice('搜索结束 · 警察撤离，海岸恢复平静',5);return;}
    for(const p of this.police){
      p.attack-=dt;const d=dist(this,p);
      if(!this.hidden){
        if(d>3){p.x+=(this.x-p.x)/d*dt*3.8;p.z=clamp(p.z+(this.z-p.z)/d*dt*3.8,-23,beach(p.x)+1);}
        if(d<14&&p.attack<=0){p.attack=1.8;this.fx('shot',p);this.damage(this.powerfulPolice?8:5,this.powerfulPolice?'盾牌防线压制了你。可以藏身，或成长到 12 米再对抗。':'在警察围捕中受伤过重。');}
      }
    }
  }
  updateSharks(dt:number){
    for(const s of this.sharks){
      if(s.hp<=0)continue;s.timer-=dt;
      const d=dist(this,s);const target=(this.mode==='surface'||this.mode==='underwater')&&dist(this,HOME)>7;
      if(this.mode==='seabed-buried'&&(s.state==='windup'||s.state==='charge')){s.state='recover';s.timer=2.6;}
      if(s.state==='cruise'){
        s.heading+=dt*.28;s.x+=Math.sin(s.heading)*dt*1.2;s.z+=Math.cos(s.heading)*dt*1.2;
        if(dist(s,s.home)>7)s.heading=Math.atan2(s.home.x-s.x,s.home.z-s.z);
        if(target&&d<9){s.state='windup';s.timer=1.65;this.sound('warn');}
      }else if(s.state==='windup'){
        s.heading=Math.atan2(this.x-s.x,this.z-s.z);
        if(s.timer<=0){s.state='charge';s.timer=.9;s.dx=Math.sin(s.heading);s.dz=Math.cos(s.heading);}
      }else if(s.state==='charge'){
        s.x=clamp(s.x+s.dx*dt*9,-54,54);s.z=clamp(s.z+s.dz*dt*9,beach(s.x)+4,39);
        if(target&&d<2.9){this.damage(10,'被鲨鱼击败。按 E 藏进海底沙子，或在蓄力时侧移闪避。');s.state='recover';s.timer=2.6;}
        if(s.timer<=0){s.state='recover';s.timer=2.6;}
      }else if(s.timer<=0)s.state='cruise';
    }
  }
  snapshot(){return {phase:this.phase,mode:this.mode,x:this.x,z:this.z,heading:this.heading,length:this.length,health:this.health,maxHealth:this.maxHealth,biteRange:this.biteRange,disguised:this.disguised,dragging:this.dragging?{...this.dragging}:null,waterDrags:this.waterDrags,sandDrags:this.sandDrags,submerged:this.submerged,sandHidden:this.sandHidden,oxygen:this.oxygen,stamina:this.stamina,hunger:this.hunger,heat:this.heat,elapsed:this.elapsed,eaten:this.eaten,humanEscapes:this.humanEscapes,ambushes:this.ambushes,growth:this.growth,relics:this.relics,sharksDefeated:this.sharksDefeated,policeCount:this.police.length,policeETA:this.policeETA,alarmCount:this.alarmCount,hiddenTime:this.hiddenTime,biteCooldown:this.biteCooldown,objectives:this.objectives,message:this.message,humans:this.humans.map(h=>({...h})),sharks:this.sharks.map(s=>({...s})),foods:this.foods.map(f=>({...f}))};}
}
