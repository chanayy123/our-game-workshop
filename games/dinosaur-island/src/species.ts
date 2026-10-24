export type SpeciesKind='young-diplodocus'|'dinosaur'|'raptor'|'rhino'|'crow'|'diplodocus'|'pterosaur';
export const SPECIES:Record<SpeciesKind,{name:string;group:'dinosaur'|'animal'|'bird'|'pterosaur';prey:boolean;walk:number;run:number;radius:number;color:string}>={
  'young-diplodocus':{name:'梁龙幼崽',group:'dinosaur',prey:true,walk:1.25,run:4.2,radius:.4,color:'#d9b46b'},
  dinosaur:{name:'霸王龙',group:'dinosaur',prey:false,walk:1.5,run:3,radius:1.1,color:'#e4e5d1'},
  raptor:{name:'迅猛龙',group:'dinosaur',prey:true,walk:1.5,run:5.4,radius:.55,color:'#e5c47e'},
  rhino:{name:'犀牛',group:'animal',prey:false,walk:1.1,run:2.4,radius:1.1,color:'#b8c0b1'},
  crow:{name:'乌鸦',group:'bird',prey:false,walk:5.5,run:8,radius:.15,color:'#93bfca'},
  diplodocus:{name:'梁龙',group:'dinosaur',prey:false,walk:.7,run:1,radius:1.8,color:'#b5d1aa'},
  pterosaur:{name:'翼龙',group:'pterosaur',prey:false,walk:0,run:4,radius:.5,color:'#db9970'},
};
export const isPrey=(creature:{kind:SpeciesKind})=>SPECIES[creature.kind].prey;
export const isHuntable=(creature:{kind:SpeciesKind})=>isPrey(creature)||creature.kind==='dinosaur';
