export type TreeObstacle={x:number;z:number;radius:number;active?:boolean};
export type TreeRecord={id:number;obstacle:TreeObstacle;age:number;fallen:boolean;direction:number};
export const TREE_REGROW_SECONDS=60;

/** Collision and lifetime are shared with the renderer, player and wildlife. */
export class TreeLifecycle {
  readonly trees:TreeRecord[]=[];
  add(obstacle:TreeObstacle){const tree={id:this.trees.length,obstacle,age:0,fallen:false,direction:0};this.trees.push(tree);return tree;}
  strike(player:{x:number;z:number;heading:number},range:number){
    const tree=this.trees.filter(t=>{
      if(t.fallen)return false;
      const dx=t.obstacle.x-player.x,dz=t.obstacle.z-player.z,d=Math.hypot(dx,dz);
      return d<=range+t.obstacle.radius&&(d<1||(dx*Math.sin(player.heading)+dz*Math.cos(player.heading))/d>.35);
    }).sort((a,b)=>Math.hypot(a.obstacle.x-player.x,a.obstacle.z-player.z)-Math.hypot(b.obstacle.x-player.x,b.obstacle.z-player.z))[0];
    if(!tree)return undefined;
    tree.fallen=true;tree.age=0;tree.direction=player.heading;tree.obstacle.active=false;return tree;
  }
  update(dt:number,player:{x:number;z:number}){
    if(dt<=0||!Number.isFinite(dt))return [];
    const changed:TreeRecord[]=[];
    for(const tree of this.trees){
      if(!tree.fallen)continue;
      tree.age=Math.min(TREE_REGROW_SECONDS,tree.age+dt);
      // Do not restore a solid trunk around the player standing on its stump.
      if(tree.age>=TREE_REGROW_SECONDS&&Math.hypot(tree.obstacle.x-player.x,tree.obstacle.z-player.z)>tree.obstacle.radius+2){tree.fallen=false;tree.obstacle.active=true;tree.age=0;}
      changed.push(tree);
    }
    return changed;
  }
  reset(){for(const t of this.trees){t.fallen=false;t.age=0;t.obstacle.active=true;}}
}
