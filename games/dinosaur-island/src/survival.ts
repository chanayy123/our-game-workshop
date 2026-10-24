import { terrainHeight, riverDepth, randomGenerator } from './terrain.ts';
import { SPECIES, isPrey, isHuntable, type SpeciesKind } from './species.ts';

export type Point={x:number;z:number};
export type PlayerPose=Point&{heading:number;speed:number;wading?:boolean};
export type Creature={id:string;kind:SpeciesKind;x:number;z:number;heading:number;home:Point;alive:boolean;active:boolean;mode:'idle'|'walk'|'run'|'dead'|'attack';speed:number;timer:number;fear:number;corpseAge:number;size:number;health:number;maxHealth:number;portions:number;aggro:number;windup:number;attackCooldown:number};
export type SurvivalEvent={type:'kill'|'eat'|'miss'|'hungry'|'death'|'hit'|'hurt'|'threat'|'tree';id?:string;food?:number;heal?:number};
type Obstacle=Point&{radius:number;active?:boolean};
export const COMBAT={rexHealth:180,rexDamage:18,rexRange:6.8,windup:.75,cooldown:2.8,rexFood:85,rexHeal:30,rexPortions:3};
export const PLAYER_FORMS={trex:{damage:45,range:7.5},raptor:{damage:30,range:5.5}};
export const RULES={hungerDrain:.25,runningDrain:.18,starvationDamage:5,food:42,heal:15,biteRange:7.5,eatRange:7.5,biteDelay:.35,attackDuration:1.2,eatDuration:2.2};
const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);

/** Gameplay state is independent from rendering; all timers advance only in play. */
export class SurvivalSimulation {
  hunger=100;health=100;dead=false;elapsed=0;kills=0;meals=0;
  playerForm:keyof typeof PLAYER_FORMS='trex';deathCause:'starvation'|'combat'='starvation';
  readonly creatures:Creature[]=[];
  private random=randomGenerator(1987);
  private attackTimer=0;private attackPending=false;private cooldown=0;
  private meal:{id:string;time:number}|null=null;
  private warned=false;private events:SurvivalEvent[]=[];
  private obstacles:readonly Obstacle[];
  private strikeTree?: (player:PlayerPose,range:number)=>boolean;
  constructor(obstacles:readonly Obstacle[]=[],strikeTree?:(player:PlayerPose,range:number)=>boolean){this.obstacles=obstacles;this.strikeTree=strikeTree;this.reset();}
  setPlayerForm(form:keyof typeof PLAYER_FORMS){this.playerForm=form;}
  isThreatened(player:Point){return this.creatures.some(c=>c.alive&&c.aggro>0&&distance(c,player)<30);}
  reset(){
    this.hunger=100;this.health=100;this.dead=false;this.elapsed=0;this.kills=0;this.meals=0;
    this.deathCause='starvation';
    this.attackTimer=0;this.attackPending=false;this.cooldown=0;this.meal=null;this.warned=false;this.events=[];this.random=randomGenerator(1987);
    this.creatures.length=0;
    const youngDiplodocus=[[27,116],[-16,98],[-26,55],[-31,-9]];
    youngDiplodocus.forEach(([x,z],i)=>this.add(`young-diplodocus-${i}`,'young-diplodocus',x,z,1.8+this.random()*.3));
    this.add('rex-0','dinosaur',63,35,10);
    [[42,113],[49,109],[56,73],[-39,-28]].forEach(([x,z],i)=>this.add(`raptor-${i}`,'raptor',x,z,3.1+i*.18));
    [[-5,108],[-12,48]].forEach(([x,z],i)=>this.add(`rhino-${i}`,'rhino',x,z,3.9));
    [[-34,82],[-57,27]].forEach(([x,z],i)=>this.add(`diplodocus-${i}`,'diplodocus',x,z,17+i*2));
    [[20,120],[-25,77],[58,55],[-44,-10]].forEach(([x,z],i)=>this.add(`crow-${i}`,'crow',x,z,1.2));
    this.add('pterosaur-0','pterosaur',25,112,6.5);
    this.moveCreature(this.creatures[this.creatures.length-1],0,{x:25,z:137});
  }
  private add(id:string,kind:Creature['kind'],x:number,z:number,size:number){
    // Place every creature on open ground, independently of scenery generation order.
    let p={x,z};for(let i=0;kind!=='pterosaur'&&i<80&&!this.walkable(p,kind);i++)p={x:x+Math.cos(i*2.4)*(2+i*.2),z:z+Math.sin(i*2.4)*(2+i*.2)};
    const health=kind==='dinosaur'?COMBAT.rexHealth:30;
    this.creatures.push({id,kind,...p,home:{...p},heading:this.random()*Math.PI*2,alive:true,active:true,mode:'idle',speed:0,timer:2+this.random()*3,fear:0,corpseAge:0,size,health,maxHealth:health,portions:kind==='dinosaur'?COMBAT.rexPortions:1,aggro:0,windup:0,attackCooldown:0});
  }
  beginAttack():boolean{
    if(this.dead||this.cooldown>0||this.attackPending||this.meal)return false;
    this.attackTimer=RULES.biteDelay;this.attackPending=true;this.cooldown=RULES.attackDuration;return true;
  }
  edibleNear(player:Point):Creature|undefined{
    return this.creatures.filter(c=>isHuntable(c)&&c.active&&!c.alive&&c.portions>0&&distance(c,player)<=RULES.eatRange)
      .sort((a,b)=>distance(a,player)-distance(b,player))[0];
  }
  beginEat(player:Point):boolean{
    if(this.dead||this.meal||this.attackPending||this.cooldown>0)return false;
    const target=this.edibleNear(player);if(!target)return false;
    this.meal={id:target.id,time:RULES.eatDuration};return true;
  }
  roar(player:Point){if(this.dead)return;for(const c of this.creatures)if(c.alive&&distance(c,player)<48)c.fear=7;}
  drainEvents(){const events=this.events;this.events=[];return events;}
  get eating(){return this.meal!==null;}
  update(dt:number,player:PlayerPose){
    if(this.dead||dt<=0||!Number.isFinite(dt))return;
    dt=Math.min(dt,.1);this.elapsed+=dt;this.cooldown=Math.max(0,this.cooldown-dt);
    if(this.attackPending){
      this.attackTimer-=dt;
      if(this.attackTimer<=0){
        this.attackPending=false;
        const target=this.creatures.filter(c=>{
          if(!c.active||!c.alive||!isHuntable(c)||!this.clearLine(player,c))return false;
          const dx=c.x-player.x,dz=c.z-player.z,d=Math.hypot(dx,dz);
          return d<=PLAYER_FORMS[this.playerForm].range&&(d<1.8||(dx*Math.sin(player.heading)+dz*Math.cos(player.heading))/d>.35)
            &&Math.abs(terrainHeight(c.x,c.z)-terrainHeight(player.x,player.z))<3;
        }).sort((a,b)=>distance(a,player)-distance(b,player))[0];
        if(target){
          target.health=Math.max(0,target.health-PLAYER_FORMS[this.playerForm].damage);
          if(target.health===0){target.alive=false;target.mode='dead';target.speed=0;target.corpseAge=0;target.windup=0;target.aggro=0;this.kills++;this.events.push({type:'kill',id:target.id});}
          else{target.aggro=15;this.events.push({type:'hit',id:target.id});}
        }else if(this.strikeTree?.(player,PLAYER_FORMS[this.playerForm].range))this.events.push({type:'tree'});
        else this.events.push({type:'miss'});
      }
    }
    if(this.meal){
      const target=this.creatures.find(c=>c.id===this.meal!.id)!;
      if(!target.active||target.alive||distance(target,player)>RULES.eatRange+.5)this.meal=null;
      else if((this.meal.time-=dt)<=0){
        const food=target.kind==='dinosaur'?COMBAT.rexFood:RULES.food,heal=target.kind==='dinosaur'?COMBAT.rexHeal:RULES.heal;
        target.portions--;target.active=target.portions>0;target.corpseAge=0;this.hunger=Math.min(100,this.hunger+food);this.health=Math.min(100,this.health+heal);this.meals++;this.events.push({type:'eat',id:target.id,food,heal});this.meal=null;
      }
    }
    this.hunger=Math.max(0,this.hunger-dt*(RULES.hungerDrain+(player.speed>5?RULES.runningDrain:0)+(player.wading?.04:0)));
    if(this.hunger<=0){this.health=Math.max(0,this.health-dt*RULES.starvationDamage);if(this.health===0)this.deathCause='starvation';}
    if(this.hunger<25&&!this.warned){this.events.push({type:'hungry'});this.warned=true;}
    if(this.hunger>35)this.warned=false;
    if(this.health<=0){this.dead=true;this.meal=null;this.attackPending=false;this.events.push({type:'death'});return;}
    for(const c of this.creatures)this.moveCreature(c,dt,player);
    if(this.health<=0){this.dead=true;this.meal=null;this.attackPending=false;this.events.push({type:'death'});}
  }
  private clearLine(a:Point,b:Point){
    const dx=b.x-a.x,dz=b.z-a.z,l=dx*dx+dz*dz;
    if(l<.001)return true;
    return !this.obstacles.some(o=>{if(o.active===false)return false;const t=Math.max(0,Math.min(1,((o.x-a.x)*dx+(o.z-a.z)*dz)/l));return Math.hypot(a.x+dx*t-o.x,a.z+dz*t-o.z)<o.radius+.15;});
  }
  private walkable(p:Point,kind:Creature['kind']){
    if(terrainHeight(p.x,p.z)<.3||riverDepth(p.x,p.z)>.15)return false;
    const radius=SPECIES[kind].radius;
    return !this.obstacles.some(o=>o.active!==false&&distance(p,o)<o.radius+radius);
  }
  private moveCreature(c:Creature,dt:number,player:Point){
    if(c.kind==='pterosaur'){
      const angle=this.elapsed*.15-Math.PI/2;
      c.x=c.home.x+Math.cos(angle)*24;c.z=c.home.z+Math.sin(angle)*18;
      c.heading=Math.atan2(-Math.sin(angle)*24,Math.cos(angle)*18);
      c.mode='run';c.speed=.15*Math.hypot(Math.sin(angle)*24,Math.cos(angle)*18);return;
    }
    if(c.kind==='crow'){
      const angle=this.elapsed*.17+Number(c.id.split('-')[1])*1.5;
      c.x=c.home.x+Math.cos(angle)*17;c.z=c.home.z+Math.sin(angle)*24;
      c.heading=Math.atan2(-Math.sin(angle)*17,Math.cos(angle)*24);c.mode='run';c.speed=5;return;
    }
    if(!c.alive){
      c.corpseAge+=dt;
      if(c.corpseAge>70&&distance(c.home,player)>35&&distance(c,player)>25){c.x=c.home.x;c.z=c.home.z;c.alive=true;c.active=true;c.corpseAge=0;c.mode='idle';c.timer=3;c.fear=0;c.health=c.maxHealth;c.portions=c.kind==='dinosaur'?COMBAT.rexPortions:1;c.aggro=0;c.windup=0;c.attackCooldown=0;}
      return;
    }
    c.fear=Math.max(0,c.fear-dt);c.timer-=dt;
    const close=distance(c,player)<(isPrey(c)?16:11);
    if(c.kind==='dinosaur'&&c.aggro>0){
      c.aggro=Math.max(0,c.aggro-dt);c.attackCooldown=Math.max(0,c.attackCooldown-dt);
      const d=distance(c,player);
      if(d<22)c.aggro=15;
      if(distance(c,c.home)>45||d>35){c.aggro=0;c.windup=0;c.mode='idle';c.timer=0;}
      else if(c.windup>0){
        c.windup=Math.max(0,c.windup-dt);c.speed=0;c.mode='attack';
        if(c.windup===0){
          const dx=player.x-c.x,dz=player.z-c.z;
          if(d<=COMBAT.rexRange&&(d<1||(dx*Math.sin(c.heading)+dz*Math.cos(c.heading))/d>.45)&&this.clearLine(c,player)){
            this.health=Math.max(0,this.health-COMBAT.rexDamage);this.deathCause='combat';this.meal=null;this.events.push({type:'hurt',id:c.id});
          }
          c.mode='idle';
        }
        return;
      }else{
        c.heading=Math.atan2(player.x-c.x,player.z-c.z);
        if(d<COMBAT.rexRange-.3&&c.attackCooldown<=0&&this.clearLine(c,player)){c.windup=COMBAT.windup;c.attackCooldown=COMBAT.cooldown;c.mode='attack';c.speed=0;this.events.push({type:'threat',id:c.id});return;}
        c.speed=d>4.8?4.8:0;c.mode=c.speed?'run':'idle';
      }
    }else if(isPrey(c)&&(close||c.fear>0)){
      c.fear=Math.max(c.fear,close?1.8:0);c.heading=Math.atan2(c.x-player.x,c.z-player.z);c.speed=SPECIES[c.kind].run;c.mode='run';
    }else if(!isPrey(c)&&(close||c.fear>0)){
      c.heading=Math.atan2(player.x-c.x,player.z-c.z);c.speed=0;c.mode='idle';
    }else{
      if(c.mode==='run'){c.mode='idle';c.timer=1.5;}
      if(c.timer<=0){c.mode=c.mode==='idle'?'walk':'idle';c.timer=3+this.random()*6;c.heading=distance(c,c.home)>23?Math.atan2(c.home.x-c.x,c.home.z-c.z):this.random()*Math.PI*2;}
      c.speed=c.mode==='walk'?SPECIES[c.kind].walk:0;
    }
    if(c.speed===0)return;
    // Try a sideways escape around trees and riverbanks before stopping.
    for(const offset of [0,.65,-.65,1.3,-1.3,1.8,-1.8]){
      const heading=c.heading+offset,p={x:c.x+Math.sin(heading)*c.speed*dt,z:c.z+Math.cos(heading)*c.speed*dt};
      if(this.walkable(p,c.kind)){c.x=p.x;c.z=p.z;c.heading=heading;return;}
    }
    c.heading+=1.2;c.timer=Math.min(c.timer,.25);c.speed=0;c.mode='idle';
  }
}
