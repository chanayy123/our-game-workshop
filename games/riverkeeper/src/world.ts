import * as THREE from 'three';
import type { WorldFrame } from './contracts.ts';
import type { WaterSimulation } from './water.ts';

type BurstKind = 'rock' | 'soil' | 'dig' | 'remove' | 'bite' | 'win';
type Particle = { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; size: number; color: THREE.Color };
type Foam = { x: number; z: number; age: number; life: number; scale: number };
type SnakeModel = { group: THREE.Group; segments: THREE.Mesh[]; head: THREE.Group; ring: THREE.Mesh };
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
function rand(seed: number) { const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453123; return n - Math.floor(n); }
function material(color: number, extra: THREE.MeshStandardMaterialParameters = {}) { return new THREE.MeshStandardMaterial({ color, roughness: .86, metalness: 0, ...extra }); }
function mesh(geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) { const result = new THREE.Mesh(geometry, mat); result.position.set(x, y, z); result.castShadow = true; result.receiveShadow = true; return result; }

/** The simulation is the sole authority for the terrain and flowing water. */
export class CreekWorld {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  readonly renderer: THREE.WebGLRenderer;
  private readonly sim: WaterSimulation;
  private readonly container: HTMLElement;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly dummy = new THREE.Object3D();
  private readonly tempColor = new THREE.Color();
  private readonly terrainMesh: THREE.Mesh;
  private readonly waterMesh: THREE.Mesh;
  private readonly waterPositions: Float32Array;
  private readonly waterColors: Float32Array;
  private readonly terrainPositions: Float32Array;
  private readonly terrainColors: Float32Array;
  private readonly rocks: THREE.InstancedMesh;
  private readonly foamMesh: THREE.InstancedMesh;
  private readonly foam: Foam[] = [];
  private readonly particles: Particle[] = [];
  private readonly particleMesh: THREE.InstancedMesh;
  private readonly player = new THREE.Group();
  private readonly leftLeg = new THREE.Group();
  private readonly rightLeg = new THREE.Group();
  private readonly leftArm = new THREE.Group();
  private readonly rightArm = new THREE.Group();
  private readonly playerBody = new THREE.Group();
  private readonly playerRing: THREE.Mesh;
  private readonly recoveryRing: THREE.Mesh;
  private readonly snakes: SnakeModel[] = [];
  private readonly hover = new THREE.Group();
  private readonly hoverRing: THREE.Mesh;
  private readonly ghostRock: THREE.Mesh;
  private readonly ghostSoil: THREE.Mesh;
  private readonly lilies: { mesh: THREE.Mesh; x: number; z: number }[] = [];
  private readonly butterflies: THREE.Group[] = [];
  private readonly sourceRings: THREE.Mesh[] = [];
  private readonly waterfall = new THREE.Group();
  private lastRevision = -1;
  private updateClock = 0;
  private walkClock = 0;
  private width = 1;
  private height = 1;
  private disposed = false;
  private shake = 0;
  private readonly cameraHome = new THREE.Vector3(16, 29, 29);
  private readonly onWheel = (event: WheelEvent) => {
    event.preventDefault();
    this.camera.zoom = clamp(this.camera.zoom * Math.exp(-event.deltaY * .001), .72, 1.7);
    this.camera.updateProjectionMatrix();
  };
  private readonly resizeObserver: ResizeObserver;

  constructor(container: HTMLElement, sim: WaterSimulation) {
    this.container = container;
    this.sim = sim;
    this.scene.background = new THREE.Color('#e4e8db');
    this.scene.fog = new THREE.Fog('#e4e8db', 55, 95);
    this.camera = new THREE.OrthographicCamera(-20, 20, 17, -17, .1, 150);
    this.camera.position.copy(this.cameraHome);
    this.camera.lookAt(0, .1, .5);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.19;
    this.renderer.domElement.setAttribute('aria-label', 'Interactive three-dimensional creek');
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener('wheel', this.onWheel, { passive: false });
    this.scene.add(new THREE.HemisphereLight(0xfaf5de, 0x708573, 2.4));
    const sun = new THREE.DirectionalLight(0xffedcd, 3.4);
    sun.position.set(-9, 22, -5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 23, bottom: -23, near: .1, far: 65 });
    sun.shadow.normalBias = .035; sun.shadow.bias = -.00015; sun.shadow.radius = 4;
    this.scene.add(sun);
    const ground = mesh(new THREE.PlaneGeometry(200, 200), material(0xdde1d3), 0, -2.02, 0);
    ground.rotation.x = -Math.PI / 2; ground.castShadow = false; this.scene.add(ground);
    const count = sim.width * sim.height;
    this.terrainPositions = new Float32Array(count * 12); this.terrainColors = new Float32Array(count * 12);
    this.terrainMesh = mesh(this.gridGeometry(this.terrainPositions, this.terrainColors), material(0xffffff, { vertexColors: true }));
    this.scene.add(this.terrainMesh);
    this.waterPositions = new Float32Array(count * 12); this.waterColors = new Float32Array(count * 12);
    this.waterMesh = mesh(this.gridGeometry(this.waterPositions, this.waterColors), material(0xffffff, { vertexColors: true, roughness: .18, metalness: .06, transparent: true, opacity: .9, depthWrite: false, side: THREE.DoubleSide }));
    this.waterMesh.castShadow = false; this.waterMesh.renderOrder = 1; this.scene.add(this.waterMesh);
    this.rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), material(0x868c7f, { flatShading: true }), count * 2);
    this.rocks.castShadow = this.rocks.receiveShadow = true; this.rocks.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.scene.add(this.rocks);
    this.foamMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(.045, .2), new THREE.MeshBasicMaterial({ color: 0xddfff5, transparent: true, opacity: .55, depthWrite: false, side: THREE.DoubleSide }), 160);
    this.foamMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.foamMesh.frustumCulled = false; this.foamMesh.renderOrder = 3; this.scene.add(this.foamMesh);
    for (let i = 0; i < 160; i++) this.foam.push({ x: 0, z: -12, age: rand(i) * 4, life: 0, scale: .6 + rand(i + 80) });
    this.particleMesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), material(0xffffff), 140);
    this.particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.particleMesh.frustumCulled = false; this.scene.add(this.particleMesh);
    this.playerRing = mesh(new THREE.RingGeometry(.37, .43, 40), new THREE.MeshBasicMaterial({ color: 0xfff9dc, transparent: true, opacity: .83, depthWrite: false, side: THREE.DoubleSide }));
    this.playerRing.rotation.x = -Math.PI / 2; this.playerRing.castShadow = false; this.scene.add(this.playerRing);
    this.recoveryRing = mesh(new THREE.TorusGeometry(.58, .045, 6, 48), new THREE.MeshBasicMaterial({ color: 0xe9915e, depthWrite: false }));
    this.recoveryRing.rotation.x = Math.PI / 2; this.recoveryRing.castShadow = false; this.scene.add(this.recoveryRing);
    this.makePlayer();
    this.hoverRing = mesh(new THREE.RingGeometry(.77, .82, 40), new THREE.MeshBasicMaterial({ color: 0xfff3c4, transparent: true, opacity: .92, depthWrite: false, side: THREE.DoubleSide }));
    this.hoverRing.rotation.x = -Math.PI / 2; this.hoverRing.castShadow = false;
    this.ghostRock = mesh(new THREE.DodecahedronGeometry(.28, 0), material(0xfff3c4, { transparent: true, opacity: .45, depthWrite: false }), 0, .17, 0);
    this.ghostSoil = mesh(new THREE.CylinderGeometry(.12, .3, .2, 8), material(0xfff3c4, { transparent: true, opacity: .45, depthWrite: false }), 0, .07, 0);
    this.ghostRock.castShadow = this.ghostSoil.castShadow = false;
    this.hover.add(this.hoverRing, this.ghostRock, this.ghostSoil); this.hover.renderOrder = 7; this.scene.add(this.hover);
    this.refreshTerrain(); this.makeDioramaRim(); this.makeNature(); this.makeBasins();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container); this.resize();
  }

  private gridGeometry(positions: Float32Array, colors: Float32Array) {
    const count = this.sim.width * this.sim.height, indices = new Uint32Array(count * 6), normals = new Float32Array(count * 12);
    for (let i = 0; i < count; i++) { const b = i * 4; indices.set([b, b + 2, b + 1, b, b + 3, b + 2], i * 6); for (let n = 0; n < 4; n++) normals[i * 12 + n * 3 + 1] = 1; }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setIndex(new THREE.BufferAttribute(indices, 1)); return geo;
  }

  private sampleGround(x: number, z: number) {
    const i = this.sim.cellAt(x, z); if (i < 0) return .6;
    const center = this.sim.coords(i), u = clamp((x - center.x) / this.sim.cellSize + .5, 0, 1), v = clamp((z - center.z) / this.sim.cellSize + .5, 0, 1), b = i * 12;
    const h0 = this.terrainPositions[b + 1], h1 = this.terrainPositions[b + 4], h2 = this.terrainPositions[b + 7], h3 = this.terrainPositions[b + 10];
    return u >= v ? h0 * (1 - u) + h1 * (u - v) + h2 * v : h0 * (1 - v) + h3 * (v - u) + h2 * u;
  }
  private sampleHeight(x: number, z: number) { return Math.max(this.sampleGround(x, z), this.sim.surfaceAt(x, z)); }
  private refreshTerrain() {
    const { sim } = this, s = sim.cellSize / 2;
    let rockCount = 0;
    const dry = new THREE.Color(0x8da363), mud = new THREE.Color(0xa58d63), dug = new THREE.Color(0x846c4e), wet = new THREE.Color(0x687e61);
    for (let i = 0; i < sim.terrain.length; i++) {
      const { x, z } = sim.coords(i), row = Math.floor(i / sim.width), col = i % sim.width, delta = sim.terrain[i] - sim.baseTerrain[i];
      for (let v = 0; v < 4; v++) {
        const dx = v === 0 || v === 3 ? -1 : 1, dz = v < 2 ? -1 : 1;
        let sum = sim.terrain[i], n = 1;
        for (const [cx, cz] of [[dx, 0], [0, dz], [dx, dz]]) { const xx = col + cx, zz = row + cz; if (xx >= 0 && xx < sim.width && zz >= 0 && zz < sim.height) { sum += sim.terrain[zz * sim.width + xx]; n++; } }
        this.terrainPositions.set([x + dx * s, sum / n, z + dz * s], i * 12 + v * 3);
        const creekBed = .67 - (z + 12) * .026;
        this.tempColor.copy(mud).lerp(dry, clamp((sum / n - creekBed - .22) / .68, 0, 1));
        if (delta < -.07) this.tempColor.lerp(dug, clamp(-delta * 1.8, .1, .85));
        if (delta > .04) this.tempColor.lerp(mud, .78);
        if (sim.water[i] > .035) this.tempColor.lerp(wet, .25);
        this.tempColor.multiplyScalar(.98 + Math.sin((x + dx * s) * 4.1 + (z + dz * s) * 2.4) * .025);
        this.terrainColors.set([this.tempColor.r, this.tempColor.g, this.tempColor.b], i * 12 + v * 3);
      }
      if (sim.rocks[i]) {
        const rocks = sim.rocks[i] >= 2 ? 2 : 1;
        for (let j = 0; j < rocks; j++) {
          const r = .31 + rand(i + j * 100) * .085;
          this.dummy.position.set(x + (j ? .13 : -.05), sim.terrain[i] - r * .48, z + (j ? -.12 : .045));
          this.dummy.rotation.set(rand(i) * .6, rand(i + 14) * 6, rand(i + 16) * .7); this.dummy.scale.set(r * 1.15, r * .95, r); this.dummy.updateMatrix(); this.rocks.setMatrixAt(rockCount, this.dummy.matrix);
          this.tempColor.setHex(j ? 0xa1aa91 : 0x7e8a7c).multiplyScalar(.88 + rand(i + 9) * .23); this.rocks.setColorAt(rockCount++, this.tempColor);
        }
      }
    }
    this.rocks.count = rockCount; this.rocks.instanceMatrix.needsUpdate = true; if (this.rocks.instanceColor) this.rocks.instanceColor.needsUpdate = true;
    this.terrainMesh.geometry.attributes.position.needsUpdate = true; this.terrainMesh.geometry.attributes.color.needsUpdate = true;
    this.terrainMesh.geometry.computeVertexNormals(); this.terrainMesh.geometry.computeBoundingSphere(); this.lastRevision = sim.revision;
  }

  private makeDioramaRim() {
    const sx = this.sim.width * this.sim.cellSize / 2, sz = this.sim.height * this.sim.cellSize / 2;
    const border: { x: number; z: number; y: number; ox: number; oz: number }[] = [];
    for (let side = 0; side < 4; side++) for (let i = 0; i < 42; i++) {
      const t = i / 42, pad = .36 + rand(side * 83 + i + 4) * .46;
      let x = 0, z = 0, ox = 0, oz = 0;
      if (side === 0) { x = -sx + 2 * sx * t; z = -sz; ox = x; oz = z - pad; }
      if (side === 1) { x = sx; z = -sz + 2 * sz * t; ox = x + pad; oz = z; }
      if (side === 2) { x = sx - 2 * sx * t; z = sz; ox = x; oz = z + pad; }
      if (side === 3) { x = -sx; z = sz - 2 * sz * t; ox = x - pad; oz = z; }
      const y = this.sampleGround(clamp(x, -sx + .3, sx - .3), clamp(z, -sz + .3, sz - .3)); border.push({ x, z, y, ox, oz });
    }
    const pos: number[] = [], cols: number[] = [], c = new THREE.Color();
    const tri = (a: number[], b: number[], cc: number[], hex: number) => { pos.push(...a, ...b, ...cc); c.setHex(hex); for (let j = 0; j < 3; j++) cols.push(c.r, c.g, c.b); };
    for (let i = 0; i < border.length; i++) {
      const a = border[i], b = border[(i + 1) % border.length];
      tri([a.x, a.y, a.z], [b.ox, b.y - .08, b.oz], [b.x, b.y, b.z], 0x8a9a60);
      tri([a.x, a.y, a.z], [a.ox, a.y - .08, a.oz], [b.ox, b.y - .08, b.oz], 0x8a9a60);
      const levels = [0, -.29, -1.03, -1.46, -1.78], hues = [0x728249, 0x9c7a50, 0xbe9b6a, 0x7c644b];
      for (let l = 0; l < 4; l++) {
        const next = (i + 1) % border.length;
        const ya = l === 0 ? a.y - .08 : levels[l] + rand(i + (l - 1) * 8) * .07, yb = l === 0 ? b.y - .08 : levels[l] + rand(next + (l - 1) * 8) * .07;
        const bottomA = levels[l + 1] + rand(i + l * 8) * .07, bottomB = levels[l + 1] + rand(next + l * 8) * .07;
        tri([a.ox, ya, a.oz], [a.ox, bottomA, a.oz], [b.ox, bottomB, b.oz], hues[l]);
        tri([a.ox, ya, a.oz], [b.ox, bottomB, b.oz], [b.ox, yb, b.oz], hues[l]);
      }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); geo.computeVertexNormals();
    this.scene.add(mesh(geo, material(0xffffff, { vertexColors: true, flatShading: true, side: THREE.DoubleSide })));
    const curtain = mesh(new THREE.PlaneGeometry(1.48, 1), new THREE.MeshBasicMaterial({ color: 0x80cbbd, transparent: true, opacity: .74, side: THREE.DoubleSide, depthWrite: false }), 0, 0, sz + .81);
    curtain.castShadow = false; this.waterfall.add(curtain);
    for (let i = 0; i < 9; i++) { const line = mesh(new THREE.PlaneGeometry(.018 + rand(i) * .023, .38 + rand(i + 7) * .3), new THREE.MeshBasicMaterial({ color: 0xe9fff3, transparent: true, opacity: .43, side: THREE.DoubleSide, depthWrite: false }), -.6 + i * .15, 0, sz + .82); line.castShadow = false; this.waterfall.add(line); }
    const lip = mesh(new THREE.PlaneGeometry(1.48, .83), new THREE.MeshBasicMaterial({ color: 0x80cbbd, transparent: true, opacity: .84, side: THREE.DoubleSide, depthWrite: false }), 0, 0, sz + .405);
    lip.name = 'lip'; lip.rotation.x = -Math.PI / 2; lip.castShadow = false; this.waterfall.add(lip);
    this.scene.add(this.waterfall);
  }

  private makeNature() {
    const treePositions: { x: number; z: number; h: number; r: number }[] = [];
    for (let i = 0; i < 45; i++) { const x = (i % 2 ? -1 : 1) * (8.75 + rand(i + 260) * 2), z = -12 + rand(i + 402) * 24; if (z > 5 && Math.abs(x) < 9.8) continue; treePositions.push({ x, z, h: z > 8 ? 1.25 + rand(i) : 2.1 + rand(i) * 1.8, r: .6 + rand(i + 133) * .65 }); }
    for (let i = 0; i < 8; i++) treePositions.push({ x: (i - 3.5) * 2, z: -12.7 + rand(i) * .3, h: 2.2 + rand(i + 13) * 1.3, r: .65 + rand(i + 19) * .35 });
    const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.09, .15, 1, 7), material(0xc4b898), treePositions.length);
    const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), material(0x78975b, { flatShading: true }), treePositions.length * 3);
    trunks.castShadow = crowns.castShadow = true; trunks.receiveShadow = crowns.receiveShadow = true;
    treePositions.forEach((tree, i) => {
      const y = this.sampleGround(tree.x, tree.z);
      this.dummy.position.set(tree.x, y + tree.h / 2, tree.z); this.dummy.rotation.set(.02, rand(i) * 6, -.03); this.dummy.scale.set(1, tree.h, 1); this.dummy.updateMatrix(); trunks.setMatrixAt(i, this.dummy.matrix);
      for (let j = 0; j < 3; j++) {
        this.dummy.position.set(tree.x + Math.sin(j * 2.2) * tree.r * .4, y + tree.h + (j === 2 ? .37 : -.08), tree.z + Math.cos(j * 2.2) * tree.r * .3);
        this.dummy.scale.set(tree.r * (j === 2 ? .82 : 1), tree.r * 1.07, tree.r); this.dummy.rotation.set(rand(i), rand(i + j) * 6, rand(i + 2)); this.dummy.updateMatrix(); crowns.setMatrixAt(i * 3 + j, this.dummy.matrix);
        this.tempColor.setHex([0x789b61, 0x94a864, 0x587e58, 0xb0b876][i % 4]).multiplyScalar(.96 + j * .065); crowns.setColorAt(i * 3 + j, this.tempColor);
      }
    }); this.scene.add(trunks, crowns);
    const blades = new THREE.InstancedMesh(new THREE.ConeGeometry(.1, .45, 3), material(0x728b4d, { side: THREE.DoubleSide }), 1150);
    const flowers = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.072, 0), material(0xf4e4a1), 200);
    const stems = new THREE.InstancedMesh(new THREE.CylinderGeometry(.013, .02, .25, 3), material(0x75834a), 200);
    let bladeCount = 0, flowerCount = 0;
    for (let i = 0; i < 850; i++) {
      const x = (rand(i + 842) - .5) * 21.4, z = (rand(i + 1338) - .5) * 25.7, index = this.sim.cellAt(x, z);
      if (index < 0 || this.sim.baseTerrain[index] < .76) continue;
      if (Math.abs(x) < 2.7 || (Math.abs(x) < 7.7 && z > -3 && z < 8.3 && Math.abs(Math.abs(x) - (z + 3) * .67) < 1.7)) continue;
      const y = this.sampleGround(x, z);
      if (i % 4 !== 0) { const scale = .35 + rand(i + 223) * .5; this.dummy.position.set(x, y + .19 * scale, z); this.dummy.rotation.set((rand(i) - .5) * .35, rand(i) * 6, (rand(i + 1) - .5) * .3); this.dummy.scale.set(.55, scale, .65); this.dummy.updateMatrix(); blades.setMatrixAt(bladeCount++, this.dummy.matrix); }
      else if (flowerCount < 200) {
        this.dummy.position.set(x, y + .16, z); this.dummy.rotation.set(0, rand(i) * 6, .1); this.dummy.scale.setScalar(1); this.dummy.updateMatrix(); stems.setMatrixAt(flowerCount, this.dummy.matrix);
        this.dummy.position.y = y + .3; this.dummy.scale.set(1.2, .7, 1.2); this.dummy.updateMatrix(); flowers.setMatrixAt(flowerCount, this.dummy.matrix); flowers.setColorAt(flowerCount++, new THREE.Color(i % 3 === 0 ? 0xefbf77 : 0xf9f1c4));
      }
    }
    blades.count = bladeCount; flowers.count = stems.count = flowerCount; this.scene.add(blades, flowers, stems);
    const stones = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), material(0xa4aa94), 100); stones.castShadow = stones.receiveShadow = true;
    for (let i = 0; i < 100; i++) {
      let x = (rand(i + 2880) - .5) * 20, z = (rand(i + 1633) - .5) * 24;
      if (i < 33) { x = (i % 2 ? -1 : 1) * (1.35 + rand(i) * .55); z = -12 + i * .76; }
      const y = this.sampleGround(x, z), size = .08 + rand(i + 22) * .14;
      this.dummy.position.set(x, y + size * .24, z); this.dummy.rotation.set(rand(i) * 3, rand(i + 1) * 6, rand(i + 2) * 2); this.dummy.scale.set(size * 1.6, size * .55, size); this.dummy.updateMatrix(); stones.setMatrixAt(i, this.dummy.matrix); stones.setColorAt(i, new THREE.Color(i % 4 === 0 ? 0xc5bd9b : 0x8d9787));
    } this.scene.add(stones);
    const reedMat = material(0x918651), reedTop = material(0x6c5637), reedGeo = new THREE.CylinderGeometry(.018, .027, .61, 4), topGeo = new THREE.CapsuleGeometry(.044, .13, 2, 5);
    for (let i = 0; i < 32; i++) {
      const z = -11 + rand(i + 433) * 23, x = (i % 2 ? -1 : 1) * (1.8 + rand(i + 76) * .4), y = this.sampleGround(x, z);
      const stem = mesh(reedGeo, reedMat, x, y + .28, z); stem.rotation.z = (rand(i) - .5) * .3;
      const tip = mesh(topGeo, reedTop, x + Math.sin(-stem.rotation.z) * .3, y + .6, z); this.scene.add(stem, tip);
    }
    for (let i = 0; i < 5; i++) {
      const butterfly = new THREE.Group(), wingMat = material(i % 2 ? 0xf5cd73 : 0xf4edc4, { side: THREE.DoubleSide });
      for (let w = 0; w < 2; w++) { const wing = mesh(new THREE.CircleGeometry(.1, 5), wingMat, (w ? 1 : -1) * .07, 0, 0); wing.rotation.x = -Math.PI / 2; butterfly.add(wing); }
      this.scene.add(butterfly); this.butterflies.push(butterfly);
    }
    const sourceMat = new THREE.MeshBasicMaterial({ color: 0xe0fff2, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false });
    for (let i = 0; i < 3; i++) { const ring = mesh(new THREE.RingGeometry(.38, .405, 40), sourceMat.clone()); ring.rotation.x = -Math.PI / 2; ring.castShadow = false; this.sourceRings.push(ring); this.scene.add(ring); }
  }

  private makeBasins() {
    const rockMat = material(0xc0b797), padMat = material(0x73925b, { side: THREE.DoubleSide });
    for (const basin of this.sim.basins) {
      for (let j = 0; j < 16; j++) { const a = j / 16 * Math.PI * 2, r = basin.radius + .16, x = basin.x + Math.cos(a) * r, z = basin.z + Math.sin(a) * r; const stone = mesh(new THREE.DodecahedronGeometry(.15 + rand(j) * .06, 0), rockMat, x, this.sampleGround(x, z) + .06, z); stone.scale.set(1.3, .55, .9); stone.rotation.set(rand(j), a, rand(j + 5)); this.scene.add(stone); }
      for (let j = 0; j < 4; j++) { const x = basin.x + (rand(j + 535) - .5) * basin.radius, z = basin.z + (rand(j + 241) - .5) * basin.radius; const leaf = mesh(new THREE.CircleGeometry(.21, 10, .2, 5.95), padMat, x, 0, z); leaf.rotation.x = -Math.PI / 2; leaf.rotation.z = j * 2; leaf.castShadow = false; this.scene.add(leaf); this.lilies.push({ mesh: leaf, x, z }); }
      const x = basin.x + Math.sign(basin.x) * (basin.radius + .5), z = basin.z + .2, y = this.sampleGround(x, z);
      const post = mesh(new THREE.CylinderGeometry(.045, .06, .85, 6), material(0x9a7750), x, y + .4, z);
      const board = mesh(new THREE.BoxGeometry(.65, .4, .08), material(0xede5bd), x, y + .85, z); board.rotation.y = .45;
      const circle = mesh(new THREE.CircleGeometry(.115, 20), material(0x507c76, { side: THREE.DoubleSide }), x + .02, y + .85, z + .05); circle.rotation.y = .45; this.scene.add(post, board, circle);
    }
  }

  private makePlayer() {
    const jacket = material(0xe8b656), skin = material(0xe4b985), boots = material(0x334f47), hatMat = material(0xc98649), pants = material(0x687a6c), pack = material(0x956349);
    const coat = mesh(new THREE.CapsuleGeometry(.235, .29, 5, 9), jacket, 0, .8, 0); coat.scale.z = .8; this.playerBody.add(coat);
    this.playerBody.add(mesh(new THREE.SphereGeometry(.187, 12, 10), skin, 0, 1.18, .02));
    this.playerBody.add(mesh(new THREE.CylinderGeometry(.29, .29, .045, 14), hatMat, 0, 1.33, .025));
    this.playerBody.add(mesh(new THREE.CylinderGeometry(.17, .21, .16, 12), hatMat, 0, 1.43, .01));
    this.playerBody.add(mesh(new THREE.CylinderGeometry(.206, .209, .039, 12), material(0x88663d), 0, 1.369, .01));
    for (const s of [-1, 1]) { const eye = mesh(new THREE.SphereGeometry(.022, 6, 5), material(0x3b4334), s * .069, 1.198, .181); eye.castShadow = false; this.playerBody.add(eye); }
    this.playerBody.add(mesh(new THREE.BoxGeometry(.31, .38, .19), pack, 0, .83, -.21));
    this.playerBody.add(mesh(new THREE.BoxGeometry(.24, .14, .075), material(0xbe9870), 0, .73, -.327));
    for (const [leg, side] of [[this.leftLeg, -1], [this.rightLeg, 1]] as const) {
      leg.position.set(side * .125, .52, 0); leg.add(mesh(new THREE.CylinderGeometry(.082, .075, .26, 7), pants, 0, -.1, 0)); leg.add(mesh(new THREE.CylinderGeometry(.09, .091, .27, 8), boots, 0, -.3, .012));
      const boot = mesh(new THREE.SphereGeometry(.105, 8, 7), boots, 0, -.43, .05); boot.scale.set(.9, .57, 1.3); leg.add(boot); this.player.add(leg);
    }
    for (const [arm, side] of [[this.leftArm, -1], [this.rightArm, 1]] as const) { arm.position.set(side * .236, .94, 0); arm.rotation.z = side * .12; arm.add(mesh(new THREE.CapsuleGeometry(.074, .18, 3, 6), jacket, 0, -.12, 0)); arm.add(mesh(new THREE.SphereGeometry(.075, 8, 6), skin, 0, -.29, 0)); this.playerBody.add(arm); }
    const spade = new THREE.Group(); spade.add(mesh(new THREE.CylinderGeometry(.018, .018, .55, 5), material(0xc7ad74))); spade.add(mesh(new THREE.BoxGeometry(.12, .16, .025), material(0x8b9690), 0, -.32, 0)); spade.position.set(.03, -.28, .05); spade.rotation.x = .32; this.rightArm.add(spade);
    this.player.add(this.playerBody); this.player.scale.setScalar(1.09); this.scene.add(this.player);
  }

  private makeSnake(index: number): SnakeModel {
    const group = new THREE.Group(), head = new THREE.Group(), segments: THREE.Mesh[] = [];
    const snakeMat = material([0x7d8960, 0x83937d, 0x9e8356][index % 3]), stripeMat = material(0xd4c581);
    for (let i = 0; i < 10; i++) { const size = .13 * (1 - i / 13), piece = mesh(new THREE.SphereGeometry(size, 8, 6), i % 3 === 0 ? stripeMat : snakeMat, 0, .055, -i * .11); piece.scale.set(1, .66, 1.1); segments.push(piece); group.add(piece); }
    const skull = mesh(new THREE.SphereGeometry(.145, 10, 8), snakeMat, 0, .07, .05); skull.scale.set(1, .66, 1.32); head.add(skull);
    for (const s of [-1, 1]) { head.add(mesh(new THREE.SphereGeometry(.035, 6, 6), material(0xf1e7b9), s * .091, .125, .11)); head.add(mesh(new THREE.SphereGeometry(.018, 6, 6), material(0x26352a), s * .094, .13, .137)); }
    head.add(mesh(new THREE.BoxGeometry(.023, .014, .13), material(0xc5725b), 0, .073, .255)); group.add(head); this.scene.add(group);
    const ring = mesh(new THREE.RingGeometry(.49, .55, 36), new THREE.MeshBasicMaterial({ color: 0xd58757, transparent: true, opacity: .6, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.castShadow = false; this.scene.add(ring); const model = { group, segments, head, ring }; this.snakes.push(model); return model;
  }

  private updateWater(time: number) {
    const { sim } = this, half = sim.cellSize / 2, shallow = new THREE.Color(0x6bbcab), deep = new THREE.Color(0x3b968f);
    for (let i = 0; i < sim.water.length; i++) {
      const { x, z } = sim.coords(i), depth = sim.water[i], row = Math.floor(i / sim.width), col = i % sim.width, wet = depth > .014;
      for (let v = 0; v < 4; v++) {
        const dx = v === 0 || v === 3 ? -1 : 1, dz = v < 2 ? -1 : 1, own = sim.terrain[i] + depth;
        let surface = own, n = 1;
        for (const [cx, cz] of [[dx, 0], [0, dz], [dx, dz]]) { const xx = col + cx, zz = row + cz; if (xx >= 0 && xx < sim.width && zz >= 0 && zz < sim.height) { const ni = zz * sim.width + xx; if (sim.water[ni] > .014 && Math.abs(sim.terrain[ni] + sim.water[ni] - own) < .22) { surface += sim.terrain[ni] + sim.water[ni]; n++; } } }
        const wave = Math.sin(x * 2.6 + z * 1.4 - time * 2.5) * .006 + Math.sin(z * 3.5 - time * 3) * .004;
        this.waterPositions.set([x + dx * half, wet ? surface / n + .025 + wave : -5, z + dz * half], i * 12 + v * 3);
        this.tempColor.copy(shallow).lerp(deep, clamp(depth * 1.6, 0, .9)).multiplyScalar(1 + Math.sin(x * 3 + z * 2 - time * 2) * .022); this.waterColors.set([this.tempColor.r, this.tempColor.g, this.tempColor.b], i * 12 + v * 3);
      }
    }
    this.waterMesh.geometry.attributes.position.needsUpdate = true; this.waterMesh.geometry.attributes.color.needsUpdate = true; this.waterMesh.geometry.computeBoundingSphere();
  }

  private updateFoam(dt: number, time: number) {
    const { sim } = this;
    for (let i = 0; i < this.foam.length; i++) {
      const f = this.foam[i]; f.age += dt; let cell = sim.cellAt(f.x, f.z);
      if (f.age >= f.life || cell < 0 || sim.water[cell] < .027) {
        let found = false;
        for (let trial = 0; trial < 16; trial++) { const ci = Math.floor(rand(i * 121 + Math.floor(time * 6) * 371 + trial * 78) * sim.water.length); if (sim.water[ci] > .05) { const p = sim.coords(ci); f.x = p.x + (rand(i + time) - .5) * sim.cellSize * .8; f.z = p.z + (rand(i + 8 + time) - .5) * sim.cellSize * .8; f.age = 0; f.life = 1.3 + rand(ci) * 3; cell = ci; found = true; break; } }
        if (!found) { this.dummy.scale.setScalar(0); this.dummy.updateMatrix(); this.foamMesh.setMatrixAt(i, this.dummy.matrix); continue; }
      }
      const fx = sim.flowX[cell], fz = sim.flowZ[cell], speed = Math.hypot(fx, fz), vx = speed > .0001 ? fx / speed : Math.sin(time + i) * .1, vz = speed > .0001 ? fz / speed : .1;
      const velocity = Math.min(1.9, .2 + speed * 7); f.x += vx * dt * velocity; f.z += vz * dt * velocity;
      const fade = Math.min(f.age * 4, (f.life - f.age) * 2, 1);
      this.dummy.position.set(f.x, this.sampleHeight(f.x, f.z) + .047, f.z); this.dummy.rotation.set(-Math.PI / 2, 0, Math.atan2(vx, vz)); this.dummy.scale.set(f.scale * fade, f.scale * (.7 + Math.min(speed * 8, 1.2)) * fade, 1); this.dummy.updateMatrix(); this.foamMesh.setMatrixAt(i, this.dummy.matrix);
    } this.foamMesh.instanceMatrix.needsUpdate = true;
  }

  update(dt: number, time: number, frame: WorldFrame) {
    if (this.disposed) return;
    this.updateClock += dt; if (this.lastRevision !== this.sim.revision) this.refreshTerrain(); if (this.updateClock > 1 / 30) { this.updateWater(time); this.updateClock = 0; }
    this.updateFoam(frame.paused ? 0 : dt, time);
    const p = frame.player, y = this.sampleGround(p.x, p.z); if (p.moving && !frame.paused) this.walkClock += dt * 10;
    const stride = p.moving ? 1 : .12; this.player.position.set(p.x, y + .025, p.z); this.player.rotation.y = p.angle;
    this.playerBody.position.y = Math.abs(Math.sin(this.walkClock)) * .055 * stride; this.playerBody.rotation.z = p.health === 'healthy' ? Math.sin(this.walkClock) * .025 * stride : Math.sin(time * 5) * .065;
    this.leftLeg.rotation.x = Math.sin(this.walkClock) * .47 * stride; this.rightLeg.rotation.x = -this.leftLeg.rotation.x; this.leftArm.rotation.x = -this.leftLeg.rotation.x * .8; this.rightArm.rotation.x = this.leftLeg.rotation.x * .7;
    this.playerRing.position.set(p.x, this.sampleHeight(p.x, p.z) + .052, p.z); (this.playerRing.material as THREE.MeshBasicMaterial).color.setHex(p.health === 'healthy' ? 0xfff5d4 : p.health === 'bitten' ? 0xe67b54 : 0xa6d6a0);
    this.recoveryRing.visible = p.health !== 'healthy'; this.recoveryRing.position.set(p.x, this.sampleHeight(p.x, p.z) + .075, p.z); this.recoveryRing.scale.setScalar(1 + Math.sin(time * 5) * .035); (this.recoveryRing.material as THREE.MeshBasicMaterial).color.setHex(p.health === 'bitten' ? 0xe68057 : 0xbada9b);
    frame.snakes.forEach((snake, i) => {
      const model = this.snakes[i] || this.makeSnake(i); model.group.visible = true; model.group.position.set(snake.x, this.sampleHeight(snake.x, snake.z) + .025, snake.z); model.group.rotation.y = snake.angle;
      model.segments.forEach((segment, n) => { segment.position.x = Math.sin(time * (snake.mood === 'chase' ? 8 : 4) - n * .66 + i) * .12 * n / 7; segment.position.y = .06 + Math.sin(time * 5 - n * .4) * .01; }); model.head.rotation.y = Math.sin(time * 4 + i) * .12;
      model.ring.visible = snake.mood !== 'calm'; model.ring.position.set(snake.x, this.sampleHeight(snake.x, snake.z) + .05, snake.z); model.ring.scale.setScalar(snake.mood === 'chase' ? 1.2 + Math.sin(time * 7) * .09 : .85 + Math.sin(time * 4) * .05); (model.ring.material as THREE.MeshBasicMaterial).color.setHex(snake.mood === 'chase' ? 0xd35c44 : 0xdca65c);
    });
    for (let i = frame.snakes.length; i < this.snakes.length; i++) { this.snakes[i].group.visible = false; this.snakes[i].ring.visible = false; }
    this.hover.visible = !!frame.hover;
    if (frame.hover) { const { x, z } = this.sim.coords(frame.hover.index); this.hover.position.set(x, this.sampleHeight(x, z) + .09, z); const hue = frame.hover.valid ? 0xffefb4 : 0xe08d76; (this.hoverRing.material as THREE.MeshBasicMaterial).color.setHex(hue); (this.ghostRock.material as THREE.MeshStandardMaterial).color.setHex(hue); (this.ghostSoil.material as THREE.MeshStandardMaterial).color.setHex(hue); this.ghostRock.visible = frame.hover.tool === 'rock'; this.ghostSoil.visible = frame.hover.tool === 'soil'; this.hoverRing.scale.setScalar(1 + Math.sin(time * 6) * .04); }
    this.lilies.forEach(leaf => { leaf.mesh.visible = this.sim.depthAt(leaf.x, leaf.z) > .10; leaf.mesh.position.y = this.sampleHeight(leaf.x, leaf.z) + .044; leaf.mesh.rotation.z += dt * .012; });
    this.butterflies.forEach((b, i) => { b.position.set((i % 2 ? -1 : 1) * (6.8 + Math.sin(time * .4 + i) * .7), 1.5 + Math.sin(time * 1.4 + i) * .3, -7 + i * 4 + Math.cos(time * .35 + i)); b.rotation.y = time * .3; b.children.forEach((wing, j) => { wing.rotation.y = Math.sin(time * 14 + i) * .8 * (j ? 1 : -1); }); });
    this.sourceRings.forEach((ring, i) => { const age = (time * .45 + i / 3) % 1; ring.position.set(0, this.sampleHeight(0, -11.9) + .045, -11.9); ring.scale.set(1 + age * 1.6, .65 + age * .9, 1); (ring.material as THREE.MeshBasicMaterial).opacity = (1 - age) * .28; });
    const outletDepth = this.sim.depthAt(0, 13.2), outletTop = this.sim.surfaceAt(0, 13.2), fallHeight = outletTop + 1.85;
    this.waterfall.visible = outletDepth > .025;
    this.waterfall.children.forEach((piece, i) => { if (piece.name === 'lip') piece.position.y = outletTop + .025; else if (i === 0) { piece.position.y = outletTop - fallHeight / 2; piece.scale.y = fallHeight; } else { piece.position.y = outletTop - ((time * .72 + i * .12) % 1) * fallHeight; } });
    this.updateParticles(dt); this.shake = Math.max(0, this.shake - dt * 1.6); this.camera.position.copy(this.cameraHome); if (this.shake > 0) { this.camera.position.x += Math.sin(time * 70) * this.shake * .18; this.camera.position.y += Math.cos(time * 61) * this.shake * .14; } this.camera.lookAt(0, .1, .5); this.renderer.render(this.scene, this.camera);
  }

  burst(x: number, z: number, kind: BurstKind) {
    const count = kind === 'win' ? 65 : kind === 'bite' ? 24 : 15, water = this.sim.depthAt(x, z) > .05;
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= 140) this.particles.shift(); const angle = Math.random() * Math.PI * 2, speed = .5 + Math.random() * 1.8;
      const color = new THREE.Color(kind === 'win' ? [0xe7be64, 0xbadca0, 0xf1eacc][i % 3] : kind === 'bite' ? 0xd98665 : water && i % 3 !== 0 ? 0xafdfd2 : kind === 'rock' ? 0x939782 : 0xb4a078);
      this.particles.push({ x, y: this.sampleHeight(x, z) + .12, z, vx: Math.cos(angle) * speed, vy: 1.4 + Math.random() * 1.6 + (kind === 'win' ? 3 : 0), vz: Math.sin(angle) * speed, life: .5 + Math.random() * .55 + (kind === 'win' ? .8 : 0), size: .025 + Math.random() * .045, color });
    } if (kind === 'bite') this.shake = 1;
  }

  private updateParticles(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) { const p = this.particles[i]; p.life -= dt; if (p.life <= 0) { this.particles.splice(i, 1); continue; } p.vy -= dt * 4.8; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; }
    this.particles.forEach((p, i) => { this.dummy.position.set(p.x, p.y, p.z); this.dummy.rotation.set(p.life * 4, p.life * 3, 0); this.dummy.scale.setScalar(p.size * Math.min(1, p.life * 5)); this.dummy.updateMatrix(); this.particleMesh.setMatrixAt(i, this.dummy.matrix); this.particleMesh.setColorAt(i, p.color); });
    this.particleMesh.count = this.particles.length; this.particleMesh.instanceMatrix.needsUpdate = true; if (this.particleMesh.instanceColor) this.particleMesh.instanceColor.needsUpdate = true;
  }

  pick(clientX: number, clientY: number): { x: number; z: number; index: number } | null {
    const rect = this.renderer.domElement.getBoundingClientRect(); this.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1); this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObject(this.terrainMesh, false); if (!hits.length) return null; const { x, z } = hits[0].point, index = this.sim.cellAt(x, z); return index >= 0 ? { x, z, index } : null;
  }

  project(x: number, z: number) { const vector = new THREE.Vector3(x, this.sampleGround(x, z), z).project(this.camera), rect = this.renderer.domElement.getBoundingClientRect(); return { x: rect.left + (vector.x + 1) * .5 * this.width, y: rect.top + (1 - vector.y) * .5 * this.height }; }

  resize() {
    this.width = Math.max(1, this.container.clientWidth); this.height = Math.max(1, this.container.clientHeight); this.renderer.setSize(this.width, this.height);
    const aspect = this.width / this.height, viewHeight = aspect < .85 ? 45 / aspect * .72 : aspect < 1.25 ? 37 : 33.2;
    this.camera.top = viewHeight / 2; this.camera.bottom = -viewHeight / 2; this.camera.left = -viewHeight * aspect / 2; this.camera.right = viewHeight * aspect / 2; this.camera.updateProjectionMatrix();
  }

  dispose() {
    if (this.disposed) return; this.disposed = true; this.resizeObserver.disconnect();
    this.renderer.domElement.removeEventListener('wheel', this.onWheel);
    this.scene.traverse(object => { const item = object as THREE.Mesh; if (item.geometry) item.geometry.dispose(); if (item.material) (Array.isArray(item.material) ? item.material : [item.material]).forEach(mat => mat.dispose()); }); this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
