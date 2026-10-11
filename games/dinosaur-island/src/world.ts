import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { Water } from 'three/addons/objects/Water.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ISLAND_SIZE, terrainHeight, trailDistance, randomGenerator, riverCenter, riverHalfWidth, riverSurface, riverDepth } from './terrain';
import { TreeLifecycle, type TreeRecord } from './trees';

export type Obstacle = { x: number; z: number; radius: number; height: number; y: number; active?:boolean };
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/environment/${path}`;
type Placement = { x: number; z: number; scale: number; rotation: number; bury?: number; tree?:TreeRecord };

export class IslandWorld {
  readonly scene = new THREE.Scene();
  readonly obstacles: Obstacle[] = [];
  readonly trees=new TreeLifecycle();
  private treeParts=new Map<number,{mesh:THREE.InstancedMesh;index:number;base:THREE.Matrix4}[]>();
  private treeMatrix=new THREE.Matrix4();
  private treeTransform=new THREE.Object3D();
  private treeRotation=new THREE.Quaternion();
  private treeAxis=new THREE.Vector3();
  readonly sun = new THREE.DirectionalLight(0xffe6c2, 2.8);
  private water!: Water;
  private wind = { value: 0 };
  private foam!: THREE.ShaderMaterial;
  private random = randomGenerator(1782);
  private textures = new THREE.TextureLoader();
  private sky!: Sky;
  private renderMeshes: THREE.Mesh[] = [];
  private shadowTick = -1;
  private riverNormal?:THREE.Texture;
  readonly warnings: string[] = [];

  async init(renderer: THREE.WebGLRenderer, onProgress: (message: string) => void) {
    this.scene.background = new THREE.Color('#acc5bb');
    this.scene.fog = new THREE.Fog('#a7c5c4', 75, 230);
    await this.makeLight(renderer);
    onProgress('铺开海岸与雨林地表');
    await this.makeTerrain();
    await this.makeOcean();
    await this.makeRiver();
    this.makePalms();
    onProgress('栽入蕨类、岛树与苔石');
    await Promise.all([
      this.scatterAsset('fern/fern.gltf', 'fern', 850),
      this.scatterAsset('rocks/rocks.gltf', 'rock', 78),
      this.scatterAsset('tree/tree.glb', 'tree', 76),
      this.scatterAsset('broadleaf/broadleaf.gltf', 'plant', 125),
    ]);
    this.makeGroundcover();
    this.makeAtmosphere();
  }

  private async makeLight(renderer: THREE.WebGLRenderer) {
    this.sky = new Sky(); this.sky.scale.setScalar(3000);
    const uniforms = this.sky.material.uniforms;
    uniforms.turbidity.value = 2.0;
    uniforms.rayleigh.value = 2.5;
    uniforms.mieCoefficient.value = .006;
    uniforms.mieDirectionalG.value = .83;
    const direction = new THREE.Vector3(.4, .8, .5).normalize();
    uniforms.sunPosition.value.copy(direction);
    this.sun.position.copy(direction).multiplyScalar(100);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1536, 1536);
    this.sun.shadow.autoUpdate=false;
    this.sun.shadow.needsUpdate=true;
    Object.assign(this.sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: .5, far: 220 });
    this.sun.shadow.bias = -.0002; this.sun.shadow.normalBias = .08;
    this.sun.shadow.radius = 2;
    this.scene.add(this.sun, this.sun.target, new THREE.HemisphereLight(0xc9e1dc, 0x5a6344, 1.3));
    const pmrem = new THREE.PMREMGenerator(renderer);
    try {
      const sky = await new RGBELoader().loadAsync(asset('sky/sky.hdr'));
      sky.mapping=THREE.EquirectangularReflectionMapping;
      this.scene.background=sky;
      this.scene.backgroundIntensity=1.0;
      this.scene.backgroundRotation.y=3.2;
      this.scene.environment=pmrem.fromEquirectangular(sky).texture;
      this.scene.environmentRotation.y=3.2;
    } catch {
      this.scene.add(this.sky);
      const envScene = new THREE.Scene(); envScene.add(this.sky.clone());
      this.scene.environment = pmrem.fromScene(envScene, .04).texture;
    }
    this.scene.environmentIntensity = .6;
    pmrem.dispose();
  }

  private async texture(path: string, color = false) {
    const tex = await this.textures.loadAsync(asset(path));
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    if (color) tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private async makeTerrain() {
    const [sand, ground, normal, rough] = await Promise.all([
      this.texture('sand/diffuse.jpg', true), this.texture('ground/diffuse.jpg', true),
      this.texture('ground/normal.jpg'), this.texture('ground/roughness.jpg'),
    ]);
    const geo = new THREE.PlaneGeometry(ISLAND_SIZE, ISLAND_SIZE, 240, 240);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), y = terrainHeight(x, z);
      pos.setY(i, y);
      const shade = .84 + .16 * Math.sin(x * .05) * Math.cos(z * .06);
      colors.push(shade, shade, shade);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ map: ground, normalMap: normal, roughnessMap: rough, roughness: 1, vertexColors: true, normalScale: new THREE.Vector2(.6, .6) });
    mat.onBeforeCompile = shader => {
      shader.uniforms.sandMap = { value: sand };
      shader.vertexShader = 'varying vec3 vTerrain;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvTerrain = position;');
      shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
        #ifdef USE_NORMALMAP
          vNormalMapUv = position.xz * .18;
        #endif
        #ifdef USE_ROUGHNESSMAP
          vRoughnessMapUv = position.xz * .18;
        #endif
      `);
      shader.fragmentShader = 'uniform sampler2D sandMap; varying vec3 vTerrain;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
        vec2 terrainUV = vTerrain.xz * 0.18;
        vec4 forestTex = texture2D(map, terrainUV);
        vec4 sandTex = texture2D(sandMap, terrainUV * .65);
        float pathX = 15.0 + sin(vTerrain.z * .043) * 15.0;
        float pathWeight = (1.0 - smoothstep(2.0, 7.0, abs(vTerrain.x-pathX))) * (1.0-smoothstep(50.0,95.0,abs(vTerrain.z)));
        float coastWeight = 1.0-smoothstep(2.0,6.2,vTerrain.y);
        float sandWeight = max(coastWeight,pathWeight * .7);
        vec3 forestColor = forestTex.rgb * vec3(.34,.47,.23);
        vec3 sandColor = sandTex.rgb * vec3(.92,.88,.72);
        diffuseColor.rgb *= mix(forestColor,sandColor,sandWeight);
        diffuseColor.rgb *= mix(.62,1.0,smoothstep(-.1,1.8,vTerrain.y));
      `);
    };
    const mesh = new THREE.Mesh(geo, mat); mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  private async makeOcean() {
    const normals = await this.texture('waternormals.jpg');
    this.water = new Water(new THREE.PlaneGeometry(5000, 5000), {
      textureWidth: 512, textureHeight: 512, waterNormals: normals,
      sunDirection: this.sun.position.clone().normalize(), sunColor: 0xffead0,
      waterColor: 0x1b716b, distortionScale: 2.6, fog: true,
    });
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = .03;
    this.water.material.uniforms.size.value = 6;
    // Rough coastal water needs silhouettes, not a second complete forest render.
    const reflect = this.water.onBeforeRender;
    this.water.onBeforeRender = (...args) => {
      const hidden = this.renderMeshes.filter(mesh => mesh.visible && !mesh.userData.waterReflection);
      hidden.forEach(mesh => { mesh.visible = false; });
      try { reflect.apply(this.water,args); } finally { hidden.forEach(mesh => { mesh.visible = true; }); }
    };
    this.scene.add(this.water);
    const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 420; i++) {
      const a = i / 420 * Math.PI * 2;
      let low = 80, high = 200;
      for (let j = 0; j < 16; j++) { const mid = (low + high) / 2; if (terrainHeight(Math.cos(a) * mid, Math.sin(a) * mid) > .08) low = mid; else high = mid; }
      for (let j = 0; j < 2; j++) {
        const r = low + j * 3.2;
        vertices.push(Math.cos(a) * r, .095, Math.sin(a) * r); uvs.push(i / 420, j);
      }
      if (i < 420) { const n = i * 2; indices.push(n,n+1,n+2,n+1,n+3,n+2); }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geo.setIndex(indices);
    this.foam = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { time: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying vec2 vUv; uniform float time; void main(){ float w=.5+.5*sin(vUv.x*900.0+time*.8); float band=pow(max(0.0,sin(vUv.y*9.0-time*.7+w)),5.0); float a=band*(1.0-vUv.y)*(.15+w*.18); gl_FragColor=vec4(.77,.9,.85,a); }',
    });
    this.scene.add(new THREE.Mesh(geo, this.foam));
  }

  private windMaterial(material: THREE.Material) {
    const mat = material as THREE.MeshStandardMaterial;
    mat.onBeforeCompile = shader => {
      shader.uniforms.islandTime = this.wind;
      shader.vertexShader = 'uniform float islandTime;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float phase = instanceMatrix[3].x * .16 + instanceMatrix[3].z * .11;
          transformed.x += sin(islandTime*1.05 + phase + position.y*.35) * .08 * max(0.0,position.y);
        #endif
      `);
    };
    return mat;
  }

  private async makeRiver(){
    const normals=await this.texture('waternormals.jpg');normals.repeat.set(3,24);this.riverNormal=normals;
    const vertices:number[]=[],uvs:number[]=[],indices:number[]=[];
    for(let i=0;i<=180;i++){
      const z=-27+i*(185/180),width=riverHalfWidth(z),x=riverCenter(z);
      for(let side=0;side<2;side++){vertices.push(x+(side===0?-width:width),riverSurface(z)+.025,z);uvs.push(side,i/180);}
      if(i<180){const n=i*2;indices.push(n,n+2,n+1,n+1,n+2,n+3);}
    }
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();
    const mat=new THREE.MeshPhysicalMaterial({color:0x3b8b80,normalMap:normals,normalScale:new THREE.Vector2(.25,.25),roughness:.2,metalness:.15,transparent:true,opacity:.8,depthWrite:false,side:THREE.DoubleSide,envMapIntensity:1.5});
    const river=new THREE.Mesh(geo,mat);river.name='Wadeable jungle river';river.renderOrder=2;this.scene.add(river);
  }

  /** Analytic feather palms fill the canopy; scanned foliage handles the foreground. */
  private makePalms() {
    const trunkGeo = new THREE.CylinderGeometry(.16, .43, 12, 12, 20);
    const p = trunkGeo.attributes.position;
    for (let i = 0; i < p.count; i++) { const y = p.getY(i) + 6; p.setXYZ(i, p.getX(i) + y*y*.013, y, p.getZ(i)); }
    trunkGeo.computeVertexNormals();
    const barkCanvas = document.createElement('canvas'); barkCanvas.width=128; barkCanvas.height=256;
    const ctx = barkCanvas.getContext('2d')!; ctx.fillStyle='#746a4e'; ctx.fillRect(0,0,128,256);
    for(let i=0;i<900;i++){const y=this.random()*256; ctx.fillStyle=`rgba(30,24,15,${this.random()*.4})`;ctx.fillRect(this.random()*128,y,8+this.random()*35,1+this.random()*2);}
    for(let y=0;y<256;y+=26){ctx.fillStyle='rgba(34,31,23,.38)';ctx.fillRect(0,y,128,3);ctx.fillStyle='rgba(230,213,159,.21)';ctx.fillRect(0,y+3,128,2);}
    const bark = new THREE.CanvasTexture(barkCanvas); bark.colorSpace=THREE.SRGBColorSpace; bark.wrapS=bark.wrapT=THREE.RepeatWrapping; bark.repeat.set(2,5);
    const trunkMat = new THREE.MeshStandardMaterial({map:bark,roughness:.96,bumpMap:bark,bumpScale:.08});
    const blades: THREE.BufferGeometry[] = [];
    for(let f=0;f<11;f++){
      const angle=f/11*Math.PI*2; const length=4.3+this.random()*1.9; const droop=1.8+this.random()*2.5;
      const along=(t:number)=>new THREE.Vector3(Math.cos(angle)*length*t+1.87,12+Math.sin(t*Math.PI*.92)*1.2-t*t*droop,Math.sin(angle)*length*t);
      for(let k=0;k<35;k++){
        const t=.06+k/38; const center=along(t);const next=along(Math.min(1,t+.013));
        const leafLen=Math.sin(t*Math.PI)*1.05+.15;
        for(const side of [-1,1]){
          const end=center.clone().add(new THREE.Vector3(Math.cos(angle+side*1.18)*leafLen,-.3-leafLen*.38,Math.sin(angle+side*1.18)*leafLen));
          const mid=center.clone().lerp(end,.55); mid.y+=.09;
          const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([...center.toArray(),...next.toArray(),...mid.toArray(),...end.toArray()],3));g.setIndex([0,1,2,2,1,3]);g.computeVertexNormals();blades.push(g);
        }
      }
      const stem = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({length:12},(_,i)=>along(i/11))),12,.027,3,false);
      stem.deleteAttribute('uv'); blades.push(stem);
    }
    const leafGeo = mergeGeometries(blades); blades.forEach(g=>g.dispose());
    if (!leafGeo) return;
    const leafMat = this.windMaterial(new THREE.MeshStandardMaterial({ color:0x61783a, roughness:.86, side:THREE.DoubleSide }));
    const places: Placement[]=[];
    for(let tries=0;tries<5000&&places.length<96;tries++){
      const x=(this.random()-.5)*275,z=(this.random()-.5)*310,h=terrainHeight(x,z);
      if(h<2.5||h>19||riverDepth(x,z)>.02||Math.abs(x-riverCenter(z))<riverHalfWidth(z)+1.5||trailDistance(x,z)<8||Math.hypot(x-25,z-137)<13)continue;
      places.push({x,z,scale:.7+this.random()*.6,rotation:this.random()*Math.PI*2});
    }
    for(const p of places)this.registerTree(p,.65*p.scale,12*p.scale);
    this.instance(trunkGeo,trunkMat,places,true);
    this.instance(leafGeo,leafMat,places,true);
  }

  private instance(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], places: Placement[], shadow:boolean, localMatrix?:THREE.Matrix4) {
    // Spatial buckets allow Three.js to cull off-screen foliage, including in shadows.
    const buckets=new Map<string,Placement[]>();
    for(const p of places){const key=`${Math.floor(p.x/48)},${Math.floor(p.z/48)}`;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key)!.push(p);}
    for(const group of buckets.values()){
      const mesh = new THREE.InstancedMesh(geometry,material,group.length);
      const obj=new THREE.Object3D();
      for(let i=0;i<group.length;i++){
        const p=group[i];obj.position.set(p.x,terrainHeight(p.x,p.z)-.08-(p.bury??0),p.z);obj.rotation.set(0,p.rotation,0);obj.scale.setScalar(p.scale);obj.updateMatrix();
        const matrix=obj.matrix.clone();if(localMatrix)matrix.multiply(localMatrix);mesh.setMatrixAt(i,matrix);
        if(p.tree){const parts=this.treeParts.get(p.tree.id)??[];parts.push({mesh,index:i,base:matrix.clone()});this.treeParts.set(p.tree.id,parts);}
        const c = .85+this.random()*.23;mesh.setColorAt(i,new THREE.Color(c,c,c));
      }
      mesh.castShadow=shadow;mesh.receiveShadow=true;mesh.userData.waterReflection=shadow&&group.some(p=>terrainHeight(p.x,p.z)<4.2);mesh.computeBoundingSphere();this.scene.add(mesh);this.renderMeshes.push(mesh);
    }
  }

  private async scatterAsset(path:string,kind:'fern'|'rock'|'tree'|'plant',count:number) {
    const random = randomGenerator({fern:337,rock:781,tree:421,plant:935}[kind]);
    try{
      const gltf=await new GLTFLoader().loadAsync(asset(path));gltf.scene.updateMatrixWorld(true);
      const meshes:THREE.Mesh[]=[];gltf.scene.traverse(o=>{if((o as THREE.Mesh).isMesh)meshes.push(o as THREE.Mesh);});
      // glTF packs scanned variations on a display tray. Bake its coordinate
      // transforms first, then anchor each independent sample on the ground.
      // Tree primitives share one anchor so leaves stay attached to the trunk.
      const treeBounds=new THREE.Box3().setFromObject(gltf.scene);
      const treeSize=treeBounds.getSize(new THREE.Vector3());
      const places:Placement[]=[];
      for(let i=0;i<count*25 && places.length<count;i++){
        const x=(random()-.5)*280,z=(random()-.5)*305,y=terrainHeight(x,z);
        if(y< (kind==='rock'?.7:4.5)||y>36||riverDepth(x,z)>.02||Math.abs(x-riverCenter(z))<riverHalfWidth(z)+1.5||trailDistance(x,z)<(kind==='tree'?10:kind==='rock'?6:4)||Math.hypot(x-25,z-137)<13)continue;
        if(kind==='tree'&&z>83&&Math.abs(x)<65)continue;
        const scale=kind==='tree'?12+random()*10:kind==='rock'?2.5+random()*5:kind==='plant'?1.1+random()*1.2:.7+random()*.95;
        places.push({x,z,scale,rotation:random()*Math.PI*2,bury:kind==='rock'?scale*.23:0});
      }
      if(kind==='tree')for(const p of places)this.registerTree(p,Math.max(.6,p.scale*.055),p.scale);
      // Each source may be a collection of different plants/rocks or a multi-mesh tree.
      for(let i=0;i<meshes.length;i++){
        const source=meshes[i];let material=Array.isArray(source.material)?source.material.map(m=>m.clone()):source.material.clone();
        if(kind==='tree'&&!Array.isArray(material)&&material.name.includes('leaves')){
          const original=material as THREE.MeshStandardMaterial;
          material=new THREE.MeshLambertMaterial({map:original.map,color:0xffffff,emissive:0x172b0c,emissiveIntensity:.45,alphaTest:.4,side:THREE.DoubleSide});
        }
        const mats=Array.isArray(material)?material:[material];
        for(const m of mats){const mat=m as THREE.MeshStandardMaterial;if(kind!=='rock'){ mat.side=THREE.DoubleSide;mat.alphaTest=.4;mat.transparent=false;this.windMaterial(mat); } if(mat.map)mat.map.anisotropy=4;}
        const subset=kind==='tree'?places:places.filter((_,n)=>n%meshes.length===i);
        const geometry=source.geometry.clone().applyMatrix4(source.matrixWorld);
        geometry.computeBoundingBox();
        const bounds=kind==='tree'?treeBounds:geometry.boundingBox!;
        const center=bounds.getCenter(new THREE.Vector3());
        const size=kind==='tree'?treeSize:bounds.getSize(new THREE.Vector3());
        geometry.translate(-center.x,-bounds.min.y,-center.z);
        const unit=1/Math.max(.001,kind==='rock'?Math.max(size.x,size.z):size.y);
        geometry.scale(unit,unit,unit);
        this.instance(geometry,material,subset,kind==='tree'||kind==='rock');
        if(kind==='rock')for(const p of subset)this.obstacles.push({x:p.x,z:p.z,radius:p.scale*.37,height:size.y*unit*p.scale,y:terrainHeight(p.x,p.z)});
      }
    }catch(error){console.warn(`Optional environment asset ${path} unavailable`,error);this.warnings.push(path);}
  }

  private registerTree(p:Placement,radius:number,height:number){
    const obstacle={x:p.x,z:p.z,radius,height,y:terrainHeight(p.x,p.z),active:true};
    this.obstacles.push(obstacle);p.tree=this.trees.add(obstacle);
  }
  strikeTree(player:{x:number;z:number;heading:number},range:number){return this.trees.strike(player,range);}
  treeDiagnostics(){return this.trees.trees.filter(t=>t.fallen).map(t=>{const part=this.treeParts.get(t.id)?.[0],matrix=new THREE.Matrix4();if(part)part.mesh.getMatrixAt(part.index,matrix);return {id:t.id,parts:this.treeParts.get(t.id)?.length??0,up:matrix.elements.slice(4,7)};});}
  updateTrees(dt:number,player:{x:number;z:number}){this.renderTrees(this.trees.update(dt,player),player);}
  resetTrees(){this.trees.reset();this.renderTrees(this.trees.trees,{x:Infinity,z:Infinity});}
  private renderTrees(trees:TreeRecord[],player:{x:number;z:number}){
    const dirty=new Set<THREE.InstancedMesh>();
    for(const tree of trees){
      const pivot=new THREE.Vector3(tree.obstacle.x,terrainHeight(tree.obstacle.x,tree.obstacle.z)-.08,tree.obstacle.z);
      const safe=Math.hypot(player.x-pivot.x,player.z-pivot.z)>tree.obstacle.radius+2;
      const growing=tree.fallen&&tree.age>58&&safe;
      const angle=tree.fallen&&!growing?Math.min(1,tree.age/1.05)**2*Math.PI*.48:0;
      const scale=tree.fallen?(growing?Math.max(.001,(tree.age-58)/2):tree.age<6?1:Math.max(.001,1-(tree.age-6)/2)):1;
      this.treeAxis.set(Math.cos(tree.direction),0,-Math.sin(tree.direction));
      this.treeRotation.setFromAxisAngle(this.treeAxis,angle);
      this.treeTransform.position.copy(pivot);this.treeTransform.quaternion.copy(this.treeRotation);this.treeTransform.scale.setScalar(scale);this.treeTransform.updateMatrix();
      this.treeMatrix.makeTranslation(-pivot.x,-pivot.y,-pivot.z).premultiply(this.treeTransform.matrix);
      for(const part of this.treeParts.get(tree.id)??[]){part.mesh.setMatrixAt(part.index,this.treeMatrix.clone().multiply(part.base));dirty.add(part.mesh);}
    }
    for(const mesh of dirty){mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();}
    if(dirty.size)this.sun.shadow.needsUpdate=true;
  }

  private makeAtmosphere(){
    const verts:number[]=[];for(let i=0;i<120;i++)verts.push((this.random()-.5)*130,3+this.random()*13,(this.random()-.5)*170);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
    const motes=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffecc8,size:.045,transparent:true,opacity:.5,depthWrite:false}));this.scene.add(motes);
  }

  private makeGroundcover(){
    const positions:number[]=[],colors:number[]=[],indices:number[]=[];
    for(let blade=0;blade<18;blade++){
      const angle=this.random()*Math.PI*2, radius=this.random()*.65;
      const bx=Math.cos(angle)*radius,bz=Math.sin(angle)*radius,height=.35+this.random()*.7,width=.025+this.random()*.045;
      const base=positions.length/3;
      for(let k=0;k<=3;k++){
        const t=k/3,w=width*(1-t)+.001;
        for(const sign of [-1,1]){
          positions.push(bx+Math.cos(angle)*t*t*.45+Math.sin(angle)*w*sign,height*t,bz+Math.sin(angle)*t*t*.45-Math.cos(angle)*w*sign);
          colors.push(.028+t*.05,.065+t*.065,.009+t*.014);
        }
        if(k<3){const n=base+k*2;indices.push(n,n+1,n+2,n+1,n+3,n+2);}
      }
    }
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.setIndex(indices);geo.computeVertexNormals();
    const mat=this.windMaterial(new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:1}));
    const places:Placement[]=[];
    for(let i=0;i<25000&&places.length<2600;i++){
      const x=(this.random()-.5)*250,z=(this.random()-.5)*285,y=terrainHeight(x,z);
      if(y<4.4||y>36||riverDepth(x,z)>.02||trailDistance(x,z)<3.4||Math.hypot(x-25,z-137)<12)continue;
      places.push({x,z,scale:.8+this.random()*.7,rotation:this.random()*Math.PI*2});
    }
    this.instance(geo,mat,places,false);
  }

  update(time:number,player:THREE.Vector3){
    this.wind.value=time;this.water.material.uniforms.time.value=time*.32;this.foam.uniforms.time.value=time;
    if(this.riverNormal)this.riverNormal.offset.y=-time*.035;
    const direction=new THREE.Vector3(.4,.8,.5).normalize().multiplyScalar(95);
    this.sun.position.copy(player).add(direction);this.sun.target.position.copy(player);
    const tick=Math.floor(time*15);
    if(tick!==this.shadowTick){this.sun.shadow.needsUpdate=true;this.shadowTick=tick;}
    for(const mesh of this.renderMeshes){const bounds=(mesh as THREE.InstancedMesh).boundingSphere;mesh.visible=!bounds||bounds.center.distanceTo(player)-bounds.radius<135;}
  }
  setQuality(high:boolean){this.sun.shadow.mapSize.set(high?1536:1024,high?1536:1024);this.sun.shadow.map?.dispose();this.sun.shadow.map=null;this.sun.shadow.needsUpdate=true;}
}
