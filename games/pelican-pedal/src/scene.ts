import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { GameEvent, GameState, RouteEntity } from './game';
import { createCoastalSky, createCoastalWater } from './sea';

export type Lighting = 'day' | 'sunset' | 'night';
export type View = 'free' | 'side' | 'close';
type V3 = [number, number, number];
const V = (p: V3) => new THREE.Vector3(...p);
const TAU = Math.PI * 2;

export class CoastalRide {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(43, 1, .1, 230);
  private island = new THREE.Group();
  private rider = new THREE.Group();
  private bird = new THREE.Group();
  private head = new THREE.Group();
  private scarf = new THREE.Group();
  private wheels: THREE.Group[] = [];
  private crank = new THREE.Group();
  private legs: { upper: THREE.Mesh; lower: THREE.Mesh; foot: THREE.Group; side: number }[] = [];
  private palms: THREE.Group[] = [];
  private clouds: THREE.Group[] = [];
  private gulls: THREE.Group[] = [];
  private wing!: THREE.Group;
  private eyes: THREE.Mesh[] = [];
  private pouch!: THREE.Mesh;
  private water = createCoastalWater();
  private skyDome = createCoastalSky();
  private sea!: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshPhysicalMaterial>;
  private glints!: THREE.InstancedMesh;
  private stars!: THREE.Points;
  private sun: THREE.DirectionalLight;
  private fill: THREE.HemisphereLight;
  private headlight: THREE.SpotLight;
  private lampMaterial: THREE.MeshStandardMaterial;
  private sceneryLamps: THREE.PointLight[] = [];
  private envTarget: THREE.WebGLRenderTarget;
  private materials: Record<string, THREE.MeshStandardMaterial> = {};
  private gameState?: GameState;
  private roadDashes!: THREE.InstancedMesh;
  private roadsidePosts!: THREE.InstancedMesh;
  private oceanGlints!: THREE.InstancedMesh;
  private scenery: { object: THREE.Group; offset: number; x: number }[] = [];
  private entityMeshes = new Map<string | number, THREE.Group>();
  private entityPool = new Map<RouteEntity['kind'], THREE.Group[]>();
  private prototypes = new Map<RouteEntity['kind'], THREE.Group>();
  private finish = new THREE.Group();
  private lighthouse = new THREE.Group();
  private boostTrails: THREE.Mesh[] = [];
  private boats: { object: THREE.Group; offset: number; x: number }[] = [];
  private stageFlags: THREE.Mesh[] = [];
  private flagPoles!: THREE.InstancedMesh;
  private particles!: THREE.InstancedMesh;
  private fireflies!: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private fireflySeeds: { island: number; angle: number; radius: number; height: number; phase: number; pace: number }[] = [];
  private particlePool = Array.from({ length: 128 }, () => ({ life: 0, duration: 1, position: new THREE.Vector3(), velocity: new THREE.Vector3(), color: new THREE.Color(), size: .1, spin: 0 }));
  private particleCursor = 0;
  private landing = 0;
  private pickupReaction = 0;
  private impact = 0;
  private jumpPitch = 0;
  private steeringLean = 0;
  private steeringYaw = 0;
  private riderWind = 0;
  private windPhase = 0;
  private previousJumpHeight = 0;
  private previousDistance = 0;
  private cameraDestination = new THREE.Vector3();
  private cameraTarget = new THREE.Vector3();
  private colorTarget = new THREE.Color();
  private frameTimes: number[] = [];
  private frameTimeCursor = 0;
  private slowFrames = 0;
  private maxFrameMs = 0;
  private visibleWallSeconds = 0;
  private simulationInputSeconds = 0;
  private qualityCheckAt = 0;
  private quality: 'high' | 'balanced' = 'high';
  private riderShadow!: THREE.Mesh;
  private shieldBubble!: THREE.Mesh;
  private laneWidth = 2.65;
  private cameraAim = new THREE.Vector3(0, .9, -11);
  private time = 0;
  private pedalAngle = 0;
  private last = 0;
  private frame = 0;
  private greeting = 0;
  private lighting: Lighting = 'day';
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private resizeObserver: ResizeObserver;
  private disposed = false;
  private matrixDummy = new THREE.Object3D();
  private glintLocations: { x: number; z: number; phase: number; scale: number }[] = [];
  private onVisibility = () => { this.last = 0; };
  private onContextLost = (event: Event) => {
    event.preventDefault();
    if (this.disposed) return;
    const error = document.querySelector<HTMLElement>('#scene-error'); if (error) error.hidden = false;
  };
  private onContextRestored = () => {
    if (this.disposed) return;
    this.last = 0;
    const error = document.querySelector<HTMLElement>('#scene-error'); if (error) error.hidden = true;
  };

  constructor(private container: HTMLElement, private onFrame: (dt: number) => void) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    container.append(this.renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTarget = pmrem.fromScene(room, .04);
    this.scene.environment = this.envTarget.texture;
    this.scene.environmentIntensity = .35; room.dispose(); pmrem.dispose();
    this.scene.background = new THREE.Color(0xe6eee3);
    this.scene.fog = new THREE.Fog(0xe6eee3, 48, 140);
    this.scene.add(this.skyDome);
    this.camera.position.set(5.8, 9.8, 16.6);
    this.camera.lookAt(0, .9, -11);
    this.sun = new THREE.DirectionalLight(0xfff3d7, 2.7); this.sun.position.set(-12, 20, 12);
    this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, { left: -23, right: 23, top: 25, bottom: -24, near: .1, far: 75 });
    this.sun.target.position.set(0, 0, -13); this.scene.add(this.sun.target);
    this.sun.shadow.normalBias = .028; this.sun.shadow.bias = -.0001; this.sun.shadow.radius = 3;
    this.fill = new THREE.HemisphereLight(0xe0f5ff, 0x89927a, 1.15);
    this.scene.add(this.sun, this.fill);
    const rim = new THREE.DirectionalLight(0xc8eaff, .8); rim.position.set(1, 4, -6); this.scene.add(rim);
    this.lampMaterial = new THREE.MeshStandardMaterial({ color: 0xfff5be, emissive: 0xffce72, emissiveIntensity: .12 });
    this.headlight = new THREE.SpotLight(0xffe4ac, 0, 12, .5, .7, 1.5);
    this.makePalette(); this.makeIsland(); this.makeBicycle(); this.makePelican(); this.makeAtmosphere(); this.makeRoute(); this.makeEffects(); this.batchRider();
    this.rider.position.set(0, .11, 2); this.rider.scale.setScalar(.87); this.rider.rotation.y = .35;
    this.scene.add(this.rider);
    this.headlight.position.set(0, 1.7, .8); this.headlight.target.position.set(0, .15, -7); this.scene.add(this.headlight, this.headlight.target);
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container);
    this.resize(); document.addEventListener('visibilitychange', this.onVisibility);
    this.renderer.render(this.scene, this.camera); this.frame = requestAnimationFrame(this.animate);
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.onContextRestored);
  }

  private makePalette() {
    const colors: Record<string, number> = { cream: 0xfff9e6, feather: 0xf1edda, wing: 0xe6e7d8, coral: 0xe97853, coralDark: 0xb94930, beak: 0xf5b940, pouch: 0xf0cd7d, ink: 0x214b48, tire: 0x263936, tireSide: 0xc6b68d, chrome: 0xc8d5cd, saddle: 0x8c5b3b, sand: 0xeee1b6, road: 0xe9cfa8, stripe: 0xfff6da, grass: 0xa0bc83, leaf: 0x457e57, leafLight: 0x6b9d61, trunk: 0xb88b59, rock: 0x94a59c, white: 0xfffdf0, wood: 0xd7a371, navy: 0x285d65 };
    for (const [name, color] of Object.entries(colors)) this.materials[name] = new THREE.MeshStandardMaterial({ color, roughness: .7, metalness: 0 });
    this.materials.chrome.metalness = .75; this.materials.chrome.roughness = .27;
    this.materials.coral.roughness = .29; this.materials.coral.metalness = .12;
    this.materials.beak.roughness = .42;
    this.materials.leaf.side = this.materials.leafLight.side = THREE.DoubleSide;
    this.materials.road.color.set(0xd5bd90);
  }
  private mat(name: string) { return this.materials[name]; }
  private mesh(geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, position: V3 = [0, 0, 0]) {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  private ellipsoid(parent: THREE.Object3D, name: string, position: V3, scale: V3, segments = 32) {
    const mesh = this.mesh(new THREE.SphereGeometry(1, segments, 20), this.mat(name), parent, position); mesh.scale.set(...scale); return mesh;
  }
  private rod(parent: THREE.Object3D, a: V3, b: V3, radius: number, name: string, endRadius = radius) {
    const start = V(a), end = V(b); const mesh = this.mesh(new THREE.CylinderGeometry(endRadius, radius, start.distanceTo(end), 12), this.mat(name), parent);
    mesh.position.copy(start.clone().add(end).multiplyScalar(.5)); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize()); return mesh;
  }
  private tube(parent: THREE.Object3D, points: V3[], radius: number, name: string, segments = 32) { return this.mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(V)), segments, radius, 8, false), this.mat(name), parent); }
  private flatRing(parent: THREE.Object3D, inner: number, outer: number, material: THREE.Material, height: number) {
    const mesh = this.mesh(new THREE.RingGeometry(inner, outer, 128), material, parent, [0, height, 0]); mesh.rotation.x = -Math.PI / 2; return mesh;
  }

  /** Bake only rigid pieces; moving joints retain their own local transforms. */
  private batchGroup(group: THREE.Group, excluded = new Set<THREE.Object3D>()) {
    group.updateWorldMatrix(true, true);
    const inverse = group.matrixWorld.clone().invert();
    const batches = new Map<THREE.Material, { geometry: THREE.BufferGeometry[]; originals: THREE.Mesh[]; casts: boolean }>();
    const visit = (object: THREE.Object3D) => {
      if (excluded.has(object)) return;
      if (object instanceof THREE.Mesh && !(object instanceof THREE.InstancedMesh) && !Array.isArray(object.material)) {
        const geometry = object.geometry.clone().applyMatrix4(inverse.clone().multiply(object.matrixWorld));
        const flat = geometry.index ? geometry.toNonIndexed() : geometry;
        if (flat !== geometry) geometry.dispose();
        for (const attribute of Object.keys(flat.attributes)) if (!['position', 'normal', 'uv'].includes(attribute)) flat.deleteAttribute(attribute);
        if (!flat.getAttribute('normal')) flat.computeVertexNormals();
        if (!flat.getAttribute('uv')) flat.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(flat.getAttribute('position').count * 2), 2));
        const batch = batches.get(object.material) ?? { geometry: [], originals: [], casts: false };
        batch.geometry.push(flat); batch.originals.push(object); batch.casts ||= object.castShadow; batches.set(object.material, batch);
      } else for (const child of [...object.children]) visit(child);
    };
    for (const child of [...group.children]) visit(child);
    const replaced = new Set<THREE.BufferGeometry>();
    batches.forEach((batch, material) => {
      const geometry = mergeGeometries(batch.geometry);
      if (geometry) {
        const mesh = this.mesh(geometry, material, group); mesh.castShadow = batch.casts;
        batch.originals.forEach(original => { original.removeFromParent(); replaced.add(original.geometry); });
      }
      batch.geometry.forEach(geometry => geometry.dispose());
    });
    replaced.forEach(geometry => geometry.dispose());
  }

  private batchRider() {
    this.wheels.forEach(wheel => this.batchGroup(wheel));
    this.legs.forEach(leg => this.batchGroup(leg.foot));
    this.batchGroup(this.crank);
    this.batchGroup(this.scarf);
    this.batchGroup(this.wing);
    this.batchGroup(this.head, new Set<THREE.Object3D>([...this.eyes, this.pouch]));
    this.batchGroup(this.bird, new Set<THREE.Object3D>([this.head, this.scarf, this.wing]));
    this.batchGroup(this.rider, new Set<THREE.Object3D>([this.bird, this.crank, ...this.wheels, ...this.legs.flatMap(leg => [leg.upper, leg.lower, leg.foot])]));
  }

  private makeIsland() {
    this.scene.add(this.island);
    const base = this.mesh(new THREE.CylinderGeometry(5.18, 4.94, .4, 128), this.mat('navy'), this.island, [0, -.43, 0]);
    base.material = new THREE.MeshStandardMaterial({ color: 0x3e9d9c, roughness: .5 });
    this.sea = this.mesh(new THREE.CylinderGeometry(5.22, 5.17, .22, 128), new THREE.MeshPhysicalMaterial({ color: 0x67bcb0, roughness: .24, metalness: .06, clearcoat: .65, clearcoatRoughness: .25 }), this.island, [0, -.16, 0]) as typeof this.sea;
    this.mesh(new THREE.CylinderGeometry(4.5, 4.65, .16, 128), this.mat('sand'), this.island, [0, -.025, 0]);
    this.flatRing(this.island, 2.85, 4.16, this.mat('road'), .065);
    this.flatRing(this.island, 2.77, 2.87, this.mat('stripe'), .072);
    this.flatRing(this.island, 4.16, 4.23, this.mat('stripe'), .075);
    this.mesh(new THREE.CylinderGeometry(2.76, 2.85, .09, 96), this.mat('grass'), this.island, [0, .075, 0]);
    // Road dashes travel with the island, giving the stationary hero real forward motion.
    for (let i = 0; i < 40; i++) {
      const angle = i / 40 * TAU;
      const dash = this.mesh(new THREE.BoxGeometry(.28, .008, .042), this.mat('stripe'), this.island, [Math.sin(angle) * 3.51, .077, Math.cos(angle) * 3.51]); dash.rotation.y = angle;
    }
    // Shallow water rings and local glints, batched into one draw call.
    for (let i = 0; i < 3; i++) { const ring = this.flatRing(this.island, 4.67 + i * .18, 4.685 + i * .18, new THREE.MeshBasicMaterial({ color: 0xd7f0d8, transparent: true, opacity: .4 - i * .08 }), -.034); ring.receiveShadow = false; }
    this.glints = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xdafbf2, transparent: true, opacity: .5, side: THREE.DoubleSide }), 75);
    for (let i = 0; i < 75; i++) { const a = i * 2.399; const r = 4.63 + .52 * this.random(i + 20); this.glintLocations.push({ x: Math.sin(a) * r, z: Math.cos(a) * r, phase: i * .6, scale: .05 + this.random(i + 7) * .17 }); }
    this.island.add(this.glints);
    // The inner island is deliberately low so the rider stays readable from every angle.
    this.makePalm(-1.65, -.75, 1.05, -.18); this.makePalm(1.63, -1.3, .82, .18); this.makePalm(-.8, -1.95, .7, -.05);
    for (let i = 0; i < 14; i++) {
      const angle = i * 2.399; const r = 1.15 + this.random(i) * 1.45; const x = Math.sin(angle) * r, z = Math.cos(angle) * r;
      const rock = this.mesh(new THREE.DodecahedronGeometry(.14 + this.random(i + 4) * .19, 0), this.mat(i % 3 ? 'rock' : 'sand'), this.island, [x, .12, z]); rock.scale.set(1.25, .65, .9); rock.rotation.set(i, i * 2, i * .3);
      if (i % 2 === 0) this.makeGrass(x + .28, z + .1, .65 + this.random(i));
    }
    // A striped little beach hut and a proper porch.
    const hut = new THREE.Group(); hut.position.set(.85, .12, -.2); hut.rotation.y = -.28; this.island.add(hut);
    this.mesh(new THREE.BoxGeometry(.92, 1.03, .78), this.mat('cream'), hut, [0, .55, 0]);
    for (let i = 0; i < 7; i++) this.mesh(new THREE.BoxGeometry(.075, .99, .015), this.mat('coral'), hut, [-.4 + i * .133, .55, .398]);
    this.mesh(new THREE.BoxGeometry(.3, .63, .026), this.mat('navy'), hut, [-.12, .34, .416]);
    this.mesh(new THREE.BoxGeometry(.22, .22, .03), this.mat('white'), hut, [.26, .68, .416]);
    this.mesh(new THREE.BoxGeometry(.16, .16, .035), this.mat('navy'), hut, [.26, .68, .433]);
    for (const side of [-1, 1]) { const roof = this.mesh(new THREE.BoxGeometry(.66, .08, 1.02), this.mat('navy'), hut, [side * .245, 1.17, 0]); roof.rotation.z = -side * .6; }
    this.mesh(new THREE.BoxGeometry(1.12, .08, .45), this.mat('wood'), hut, [0, .08, .62]);
    const sign = this.makeText('SLOW CLUB', 256, 64, '#fff5d6', '#285d65');
    this.mesh(new THREE.PlaneGeometry(.63, .15), sign, hut, [0, .98, .412]);
    // Tiny fence, route marker, flowers and a parked surfboard.
    for (let i = 0; i < 6; i++) this.rod(this.island, [-1.1 + i * .27, .12, 1.65], [-1.1 + i * .27, .52, 1.65], .028, 'wood');
    this.rod(this.island, [-1.17, .4, 1.65], [.32, .4, 1.65], .024, 'cream');
    this.rod(this.island, [-1.17, .23, 1.65], [.32, .23, 1.65], .024, 'cream');
    this.rod(this.island, [2.22, .1, .58], [2.22, 1.03, .58], .033, 'wood');
    this.mesh(new THREE.BoxGeometry(.64, .21, .07), this.mat('navy'), this.island, [2.22, .86, .58]);
    this.mesh(new THREE.PlaneGeometry(.58, .145), this.makeText('COAST →', 256, 64, '#fff7df', '#285d65'), this.island, [2.22, .86, .619]);
    const board = this.ellipsoid(hut, 'beak', [.69, .59, .29], [.16, .63, .045]); board.rotation.z = -.2;
    this.rod(hut, [.68, .14, .343], [.86, 1.08, .343], .012, 'cream');
    for (let i = 0; i < 12; i++) {
      const x = Math.cos(i * 1.8) * (1 + this.random(i + 19)), z = Math.sin(i * 1.8) * (1 + this.random(i + 19));
      this.rod(this.island, [x, .1, z], [x, .3, z], .012, 'leaf');
      this.ellipsoid(this.island, i % 2 ? 'cream' : 'coral', [x, .32, z], [.075, .035, .075], 10);
    }
    const shadow = this.mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: 0x294a43, opacity: .12 }), this.scene, [0, -.7, 0]); shadow.rotation.x = -Math.PI / 2; shadow.castShadow = false;
  }
  private random(seed: number) { const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); }
  private makeText(text: string, width: number, height: number, fg: string, bg: string) {
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d')!; ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height); ctx.fillStyle = fg; ctx.font = `600 ${height * .5}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, width / 2, height / 2);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: texture, roughness: 1 });
  }
  private makeGrass(x: number, z: number, scale: number) {
    const tuft = new THREE.Group(); tuft.position.set(x, .12, z); tuft.scale.setScalar(scale); this.island.add(tuft);
    for (let i = 0; i < 5; i++) { const blade = this.ellipsoid(tuft, 'leafLight', [(i - 2) * .04, .13, 0], [.024, .19 + (i % 2) * .05, .017], 8); blade.rotation.z = (i - 2) * -.22; blade.rotation.y = i * .9; }
  }
  private makePalm(x: number, z: number, scale: number, lean: number) {
    const palm = new THREE.Group(); palm.position.set(x, .1, z); palm.scale.setScalar(scale); this.island.add(palm);
    this.tube(palm, [[0, 0, 0], [.09, .75, 0], [.23, 1.65, .04], [.4, 2.6, .1]], .085, 'trunk');
    for (let i = 0; i < 11; i++) { const ring = this.mesh(new THREE.TorusGeometry(.087 - i * .001, .007, 4, 10), this.mat('saddle'), palm, [.025 + i * .033, .22 + i * .21, i * .008]); ring.rotation.x = Math.PI / 2; }
    const crown = new THREE.Group(); crown.position.set(.4, 2.6, .1); palm.add(crown); this.palms.push(crown);
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Group(); leaf.rotation.y = i / 7 * TAU; crown.add(leaf);
      const curve = new THREE.CatmullRomCurve3([V([0, 0, 0]), V([.38, .27, 0]), V([.85, .14, 0]), V([1.15, -.35, 0])]);
      this.mesh(new THREE.TubeGeometry(curve, 12, .025, 5, false), this.mat('leaf'), leaf);
      const vertices: number[] = [], indices: number[] = [];
      for (let j = 0; j <= 14; j++) { const t = j / 14, p = curve.getPoint(t), w = Math.sin(t * Math.PI) * .22; vertices.push(p.x, p.y, -w, p.x, p.y + .045 * Math.sin(t * Math.PI), 0, p.x, p.y, w); if (j < 14) { const n = j * 3; indices.push(n, n + 3, n + 1, n + 1, n + 3, n + 4, n + 1, n + 4, n + 2, n + 2, n + 4, n + 5); } }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); geo.setIndex(indices); geo.computeVertexNormals();
      this.mesh(geo, this.mat(i % 2 ? 'leaf' : 'leafLight'), leaf);
    }
    for (let i = 0; i < 3; i++) this.ellipsoid(crown, 'saddle', [Math.cos(i * 2) * .14, -.12, Math.sin(i * 2) * .14], [.12, .14, .12], 12);
    palm.rotation.z = lean;
  }

  private makeRoute() {
    // The bicycle stays at the origin while everything along the route moves
    // toward it. Absolute route metres are the single source of collision truth.
    const ocean = this.mesh(new THREE.PlaneGeometry(460, 440), this.water, this.scene, [0, -.405, -85]);
    ocean.rotation.x = -Math.PI / 2;
    ocean.castShadow = false; ocean.receiveShadow = false;
    this.mesh(new THREE.BoxGeometry(9.1, .38, 220), this.mat('sand'), this.scene, [0, -.18, -90]);
    this.mesh(new THREE.BoxGeometry(8.55, .09, 220), this.mat('road'), this.scene, [0, .045, -90]);
    for (const side of [-1, 1]) {
      this.mesh(new THREE.BoxGeometry(.09, .012, 220), this.mat('stripe'), this.scene, [side * 3.99, .096, -90]);
      this.mesh(new THREE.BoxGeometry(.2, .16, 220), this.mat('cream'), this.scene, [side * 4.43, -.02, -90]);
      const ripple = this.mesh(new THREE.PlaneGeometry(.11, 220), new THREE.MeshBasicMaterial({ color: 0xcdecd9, transparent: true, opacity: .6 }), this.scene, [side * 4.74, -.397, -90]); ripple.rotation.x = -Math.PI / 2;
    }
    this.roadDashes = new THREE.InstancedMesh(new THREE.BoxGeometry(.065, .013, 1.65), this.mat('stripe'), 100);
    this.roadDashes.receiveShadow = true; this.roadDashes.frustumCulled = false; this.scene.add(this.roadDashes);
    this.roadsidePosts = new THREE.InstancedMesh(new THREE.CylinderGeometry(.055, .08, .68, 7), this.mat('wood'), 56);
    this.roadsidePosts.castShadow = true; this.roadsidePosts.frustumCulled = false; this.scene.add(this.roadsidePosts);
    this.oceanGlints = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xd1eee1, transparent: true, opacity: .43, depthWrite: false }), 160);
    this.oceanGlints.frustumCulled = false; this.scene.add(this.oceanGlints);

    // Reuse the lovingly modelled beach hut, palms, flowers and shoreline. Static
    // copies are merged by material so a whole island costs only a few draw calls.
    this.island.updateMatrixWorld(true);
    const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
    this.island.traverse(object => {
      if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh || Array.isArray(object.material)) return;
      const geometry = object.geometry.clone().applyMatrix4(object.matrixWorld);
      // Every geometry in a batch must use the same attributes and index mode.
      const flat = geometry.index ? geometry.toNonIndexed() : geometry;
      if (flat !== geometry) geometry.dispose();
      flat.deleteAttribute('uv'); flat.deleteAttribute('normal'); flat.computeVertexNormals();
      const batch = batches.get(object.material) ?? []; batch.push(flat); batches.set(object.material, batch);
    });
    const sceneryTemplate = new THREE.Group();
    batches.forEach((geometries, material) => {
      const geometry = mergeGeometries(geometries);
      if (geometry) this.mesh(geometry, (material as THREE.MeshStandardMaterial).map ? this.mat('navy') : material, sceneryTemplate);
      geometries.forEach(geo => geo.dispose());
    });
    this.island.scale.setScalar(1.5);
    this.scenery.push({ object: this.island, x: -14, offset: 24 });
    for (let i = 1; i < 6; i++) {
      const island = sceneryTemplate.clone(); island.scale.setScalar(1.3 + (i % 3) * .16); island.rotation.y = i * 1.27;
      this.scene.add(island); this.scenery.push({ object: island, x: i % 2 ? 14.2 : -14, offset: 24 + i * 34 });
    }
    this.scenery.forEach(item => item.object.position.set(item.x, -.12, 2 - item.offset));

    // The one live island keeps swaying crowns; every other rigid piece is batched.
    this.palms.forEach(palm => this.batchGroup(palm));
    this.batchGroup(this.island, new Set<THREE.Object3D>([...this.palms, this.glints]));
    this.makeCoastalLandmarks();

    this.clouds.forEach((cloud, i) => { cloud.position.set(i * 20 - 22, 11 + i * 2, -54 - i * 9); cloud.scale.setScalar(3 + i * .6); });
    this.prototypes.set('fish', this.makePickup('fish'));
    this.prototypes.set('shell', this.makePickup('shell'));
    this.prototypes.set('pearl', this.makePickup('pearl'));
    this.prototypes.set('cone', this.makeObstacle('cone'));
    this.prototypes.set('log', this.makeObstacle('log'));
    this.prototypes.forEach(prototype => this.batchGroup(prototype));
    this.makeFinish();
    this.batchGroup(this.finish); this.batchGroup(this.lighthouse);

    const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d')!; const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    gradient.addColorStop(0, 'rgba(35,70,60,.32)'); gradient.addColorStop(1, 'rgba(35,70,60,0)'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
    this.riderShadow = this.mesh(new THREE.PlaneGeometry(2.2, 4.3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }), this.scene, [0, .105, 2]);
    this.riderShadow.rotation.x = -Math.PI / 2; this.riderShadow.castShadow = false;
    this.shieldBubble = this.mesh(new THREE.SphereGeometry(1, 28, 18), new THREE.MeshPhysicalMaterial({ color: 0x8ae5d4, transparent: true, opacity: .11, roughness: .13, metalness: .12, clearcoat: 1, depthWrite: false }), this.scene);
    this.shieldBubble.scale.set(1.05, 2.35, 1.95); this.shieldBubble.castShadow = false; this.shieldBubble.visible = false;
    for (let i = 0; i < 14; i++) {
      const trail = this.mesh(new THREE.CylinderGeometry(.013, .028, .8 + this.random(i) * .8, 5), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffedab : 0xcff6e4, transparent: true, opacity: .68, depthWrite: false }), this.scene);
      trail.rotation.x = Math.PI / 2; trail.visible = false; trail.castShadow = false; this.boostTrails.push(trail);
    }
    this.updateRoute(0);
  }

  private makePickup(kind: 'fish' | 'shell' | 'pearl') {
    const group = new THREE.Group();
    const glow = this.mesh(new THREE.TorusGeometry(kind === 'pearl' ? .65 : .58, kind === 'pearl' ? .05 : .018, 6, 32), new THREE.MeshBasicMaterial({ color: kind === 'fish' ? 0xffda75 : 0x86ffe7, transparent: true, opacity: kind === 'pearl' ? .95 : .62 }), group);
    glow.rotation.x = -.08; glow.castShadow = false;
    if (kind === 'fish') {
      const gold = new THREE.MeshStandardMaterial({ color: 0xefb333, metalness: .35, roughness: .3, emissive: 0xefad38, emissiveIntensity: .08 });
      const body = this.mesh(new THREE.SphereGeometry(1, 18, 12), gold, group); body.scale.set(.38, .21, .14);
      const tail = this.mesh(new THREE.ConeGeometry(.22, .25, 3), gold, group, [-.43, 0, 0]); tail.rotation.z = -Math.PI / 2;
      const fin = this.mesh(new THREE.ConeGeometry(.11, .17, 3), gold, group, [0, .22, 0]); fin.rotation.z = -.25;
      this.ellipsoid(group, 'ink', [.21, .05, .132], [.035, .04, .018], 10);
      this.ellipsoid(group, 'ink', [.21, .05, -.132], [.035, .04, .018], 10);
    } else if (kind === 'pearl') {
      const pearl = this.mesh(new THREE.IcosahedronGeometry(.3, 1), new THREE.MeshStandardMaterial({ color: 0xc9fff2, metalness: .4, roughness: .18, emissive: 0x51d4c2, emissiveIntensity: .35 }), group);
      pearl.rotation.z = .28;
      const ring = this.mesh(new THREE.TorusGeometry(.42, .023, 5, 24), this.mat('cream'), group); ring.rotation.x = 1.1;
    } else {
      const shell = new THREE.Group(); shell.rotation.z = -.15; group.add(shell);
      for (let i = 0; i < 7; i++) {
        const rib = this.ellipsoid(shell, i % 2 ? 'cream' : 'pouch', [(i - 3) * .093, .05 + Math.sin(i / 6 * Math.PI) * .08, 0], [.13, .34, .14], 12);
        rib.rotation.z = (3 - i) * .16;
      }
      this.ellipsoid(shell, 'beak', [0, -.24, .01], [.22, .095, .145], 14);
    }
    return group;
  }

  private makeCoastalLandmarks() {
    const flagMaterial = new THREE.MeshStandardMaterial({ color: 0xe97853, roughness: .8, side: THREE.DoubleSide });
    this.flagPoles = new THREE.InstancedMesh(new THREE.CylinderGeometry(.023, .032, 1.5, 6), this.mat('wood'), 8);
    this.flagPoles.frustumCulled = false; this.scene.add(this.flagPoles);
    for (let i = 0; i < 8; i++) {
      const flag = this.mesh(new THREE.PlaneGeometry(.75, .42, 1, 1), flagMaterial, this.scene);
      flag.position.set((i % 2 ? 1 : -1) * 4.46, 1.1, -i * 20); flag.castShadow = false;
      this.stageFlags.push(flag);
    }
    for (let i = 0; i < 4; i++) {
      const boat = new THREE.Group();
      this.ellipsoid(boat, i % 2 ? 'coral' : 'navy', [0, 0, 0], [.65, .26, 1.5], 16);
      this.ellipsoid(boat, 'wood', [0, .18, 0], [.5, .065, 1.18], 12);
      this.rod(boat, [0, .18, 0], [0, 2.7, 0], .035, 'wood');
      const sailGeometry = new THREE.BufferGeometry();
      sailGeometry.setAttribute('position', new THREE.Float32BufferAttribute([.06, .55, 0, .06, 2.62, 0, 1.28, .55, 0], 3)); sailGeometry.computeVertexNormals();
      const sail = new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffedd1 : 0xffcb7c, side: THREE.DoubleSide, roughness: .9 });
      this.mesh(sailGeometry, sail, boat);
      const wake = this.mesh(new THREE.RingGeometry(1.6, 1.64, 24, 1, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0xc4eee2, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false }), boat, [0, -.08, .3]);
      wake.rotation.x = -Math.PI / 2; wake.scale.set(.8, 2, 1); wake.castShadow = false;
      this.batchGroup(boat); boat.rotation.y = (i % 2 ? -.45 : .62); this.scene.add(boat);
      this.boats.push({ object: boat, offset: i * 48 + 30, x: (i % 2 ? 1 : -1) * (9.5 + (i % 3) * 3.8) });
    }
  }

  private makeEffects() {
    this.particles = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), new THREE.MeshBasicMaterial({ vertexColors: false }), this.particlePool.length);
    this.particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particles.frustumCulled = false; this.particles.count = 0; this.scene.add(this.particles);

    // One soft sprite field, with no light sources or per-insect draw calls.
    const glowCanvas = document.createElement('canvas'); glowCanvas.width = glowCanvas.height = 64;
    const ctx = glowCanvas.getContext('2d')!;
    const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
    glow.addColorStop(0, 'rgba(255,255,241,1)'); glow.addColorStop(.12, 'rgba(255,249,219,.96)');
    glow.addColorStop(.3, 'rgba(255,224,152,.28)'); glow.addColorStop(.65, 'rgba(255,196,102,.06)'); glow.addColorStop(1, 'rgba(255,196,102,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(glowCanvas); texture.colorSpace = THREE.SRGBColorSpace;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(72 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(72 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    this.fireflies = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: 0xffe1a1, map: texture, size: .68, transparent: true, opacity: 0, vertexColors: true,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, toneMapped: false, fog: false,
    }));
    this.fireflies.frustumCulled = false; this.fireflies.visible = false; this.scene.add(this.fireflies);
    for (let i = 0; i < 72; i++) this.fireflySeeds.push({
      island: i % this.scenery.length, angle: this.random(i + 1510) * TAU,
      radius: 2.8 + this.random(i + 1600) * 4, height: .65 + this.random(i + 1720) * 2.5,
      phase: this.random(i + 1820) * TAU, pace: .6 + this.random(i + 1960) * .65,
    });
  }

  private updateFireflies(dt: number) {
    const duskGlow = this.lighting === 'night' ? .9 : this.lighting === 'sunset' ? .22 : 0;
    this.fireflies.material.opacity = THREE.MathUtils.damp(this.fireflies.material.opacity, duskGlow, 2, dt);
    this.fireflies.visible = this.fireflies.material.opacity > .004;
    if (!this.fireflies.visible) return;
    const positions = this.fireflies.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colors = this.fireflies.geometry.getAttribute('color') as THREE.BufferAttribute;
    this.fireflySeeds.forEach((seed, i) => {
      const anchor = this.scenery[seed.island].object.position;
      const drift = this.time * seed.pace;
      const x = anchor.x + Math.cos(seed.angle) * seed.radius + Math.sin(drift * .63 + seed.phase) * .38;
      const z = anchor.z + Math.sin(seed.angle) * seed.radius + Math.cos(drift * .48 + seed.phase) * .45;
      const y = seed.height + Math.sin(drift * .83 + seed.phase) * .26;
      positions.setXYZ(i, x, y, z);
      const pulse = .5 + .5 * Math.sin(drift * 1.25 + seed.phase);
      const fade = 1 - THREE.MathUtils.smoothstep(Math.max(0, -z), 30, 90);
      const warmth = (.2 + pulse * pulse * .8) * fade;
      colors.setXYZ(i, warmth, warmth * .95, warmth * .76);
    });
    positions.needsUpdate = true; colors.needsUpdate = true;
  }

  /** Gameplay calls this once per event. Effects reuse a fixed 128-particle pool. */
  handleEvent(event: GameEvent) {
    const state = this.gameState;
    const x = (state?.lanePosition ?? 0) * this.laneWidth;
    if (event.type === 'land') this.landing = 1;
    if (event.type === 'hit') this.impact = event.value === 0 ? .35 : 1;
    if (event.type === 'fish' || event.type === 'pearl' || event.type === 'shell') this.pickupReaction = 1;
    const styles: Partial<Record<GameEvent['type'], { count: number; color: number; height: number; force: number; size: number }>> = {
      fish: { count: 9, color: 0xffcd5b, height: 2.5, force: 2.3, size: .085 },
      pearl: { count: 20, color: 0x93ffe0, height: 3.5, force: 3.5, size: .1 },
      shell: { count: 18, color: 0xbbf1d9, height: 2, force: 3, size: .08 },
      hit: { count: 17, color: 0xef896a, height: 1.5, force: 3.6, size: .1 },
      land: { count: 12, color: 0xd8c393, height: .2, force: 2.6, size: .09 },
      win: { count: 90, color: 0xffd76a, height: 5.6, force: 5, size: .12 },
      boost: { count: 14, color: 0xfce7a1, height: 1.3, force: 3, size: .08 },
      nearMiss: { count: 7, color: 0xffffff, height: .8, force: 2, size: .06 },
    };
    const style = styles[event.type];
    if (!style) return;
    const count = this.reduced ? Math.min(4, style.count) : style.count;
    for (let i = 0; i < count; i++) {
      const particle = this.particlePool[this.particleCursor++ % this.particlePool.length];
      const seed = this.particleCursor * 1.137, angle = this.random(seed) * TAU;
      particle.duration = event.type === 'win' ? 2.8 : .55 + this.random(seed + 2) * .35;
      particle.life = particle.duration;
      particle.position.set(x + (event.type === 'win' ? (this.random(seed + 1) - .5) * 7 : 0), style.height, 2);
      particle.velocity.set(Math.cos(angle) * style.force, .5 + this.random(seed + 3) * style.force, Math.sin(angle) * style.force);
      particle.color.set(event.type === 'win' && i % 3 === 0 ? 0x74d6bf : event.type === 'win' && i % 3 === 1 ? 0xee916e : style.color);
      particle.size = style.size * (.6 + this.random(seed + 4) * .6); particle.spin = this.random(seed + 5) * TAU;
    }
  }

  private updateEffects(dt: number) {
    let index = 0;
    for (const particle of this.particlePool) {
      if (particle.life <= 0) continue;
      particle.life = Math.max(0, particle.life - dt);
      particle.velocity.y -= dt * 4.3;
      if (!this.reduced) particle.position.addScaledVector(particle.velocity, dt);
      this.matrixDummy.position.copy(particle.position);
      this.matrixDummy.rotation.set(particle.spin + particle.life * 2, particle.spin, particle.life * 3);
      this.matrixDummy.scale.setScalar(particle.size * Math.min(1, particle.life / .2)); this.matrixDummy.updateMatrix();
      this.particles.setMatrixAt(index, this.matrixDummy.matrix); this.particles.setColorAt(index, particle.color); index++;
    }
    this.particles.count = index; this.particles.instanceMatrix.needsUpdate = true;
    if (this.particles.instanceColor) this.particles.instanceColor.needsUpdate = true;
  }

  diagnostics() {
    const sorted = [...this.frameTimes].sort((a, b) => a - b);
    return {
      frameMsAverage: sorted.length ? Math.round(sorted.reduce((sum, value) => sum + value, 0) / sorted.length * 10) / 10 : 0,
      frameMsP95: sorted.length ? Math.round(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * .95))] * 10) / 10 : 0,
      sampledFrames: sorted.length, calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles,
      totalSampledFrames: this.frameTimeCursor, slowFrames: this.slowFrames, maxFrameMs: Math.round(this.maxFrameMs * 10) / 10,
      visibleWallSeconds: Math.round(this.visibleWallSeconds * 100) / 100,
      simulationInputSeconds: Math.round(this.simulationInputSeconds * 100) / 100,
      clampedSeconds: Math.round((this.visibleWallSeconds - this.simulationInputSeconds) * 100) / 100,
      geometries: this.renderer.info.memory.geometries, textures: this.renderer.info.memory.textures,
      activeEntities: this.entityMeshes.size, pooledEntities: [...this.entityPool.values()].reduce((sum, pool) => sum + pool.length, 0),
      activeParticles: this.particles.count, particleBudget: this.particlePool.length, quality: this.quality, pixelRatio: this.renderer.getPixelRatio(),
      fireflyBudget: this.fireflySeeds.length,
    };
  }

  private makeObstacle(kind: 'cone' | 'log') {
    const group = new THREE.Group();
    if (kind === 'cone') {
      this.mesh(new THREE.BoxGeometry(1.18, .15, 1.1), this.mat('coralDark'), group, [0, .075, 0]);
      this.mesh(new THREE.CylinderGeometry(.095, .49, 2.06, 8), this.mat('coral'), group, [0, 1.12, 0]);
      this.mesh(new THREE.CylinderGeometry(.255, .325, .33, 8), this.mat('stripe'), group, [0, 1.13, 0]);
      this.mesh(new THREE.CylinderGeometry(.125, .18, .25, 8), this.mat('stripe'), group, [0, 1.79, 0]);
    } else {
      const log = this.mesh(new THREE.CylinderGeometry(.39, .43, 1.95, 12), this.mat('trunk'), group, [0, .43, 0]); log.rotation.z = Math.PI / 2;
      for (const side of [-1, 1]) {
        const end = this.mesh(new THREE.CircleGeometry(.35, 16), this.mat('sand'), group, [side * .984, .43, 0]); end.rotation.y = side * Math.PI / 2;
        for (const radius of [.12, .23, .32]) { const ring = this.mesh(new THREE.TorusGeometry(radius, .009, 4, 18), this.mat('wood'), group, [side * .99, .43, 0]); ring.rotation.y = Math.PI / 2; }
      }
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI + .2; this.rod(group, [-.85, .43 + Math.sin(a) * .38, Math.cos(a) * .38], [.8, .43 + Math.sin(a) * .38, Math.cos(a) * .38], .018, 'saddle'); }
      this.rod(group, [.24, .66, -.13], [.45, 1.03, -.22], .08, 'trunk', .035);
      // Low contrast approach chevrons distinguish jumpable driftwood from cones.
      for (let i = 0; i < 3; i++) {
        for (const side of [-1, 1]) {
          const cue = this.mesh(new THREE.BoxGeometry(.38, .012, .075), this.mat('stripe'), group, [side * .14, .016, .8 + i * .38]);
          cue.rotation.y = side * .55; cue.castShadow = false;
        }
      }
    }
    return group;
  }

  private makeFinish() {
    this.scene.add(this.finish);
    for (const side of [-1, 1]) {
      this.rod(this.finish, [side * 4.15, 0, 0], [side * 4.15, 6.1, 0], .115, 'wood');
      this.ellipsoid(this.finish, 'beak', [side * 4.15, 6.2, 0], [.18, .18, .18], 12);
    }
    this.mesh(new THREE.BoxGeometry(8.4, 1, .16), this.mat('navy'), this.finish, [0, 5.52, 0]);
    this.mesh(new THREE.PlaneGeometry(7.4, .76), this.makeText('THE LIGHTHOUSE  ·  FINISH', 1024, 128, '#fff4d6', '#285d65'), this.finish, [0, 5.52, .085]);
    for (let i = 0; i < 14; i++) {
      const flag = this.mesh(new THREE.ConeGeometry(.24, .48, 3), this.mat(i % 2 ? 'coral' : 'beak'), this.finish, [-3.9 + i * .6, 4.7 - Math.sin(i / 13 * Math.PI) * .3, 0]); flag.rotation.z = Math.PI;
    }
    for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) this.mesh(new THREE.BoxGeometry(.68, .016, .55), this.mat((i + j) % 2 ? 'cream' : 'navy'), this.finish, [-3.74 + i * .68, .104, j * .55]);
    // The finish belongs to the distant lighthouse island.
    const lighthouse = this.lighthouse; lighthouse.position.set(11, -.2, -90); this.scene.add(lighthouse);
    this.mesh(new THREE.CylinderGeometry(3.4, 4, .4, 32), this.mat('sand'), lighthouse);
    this.mesh(new THREE.CylinderGeometry(.75, 1.07, 6.5, 20), this.mat('cream'), lighthouse, [0, 3.3, 0]);
    for (let i = 0; i < 3; i++) this.mesh(new THREE.CylinderGeometry(.83 + i * .08, .88 + i * .08, .64, 20), this.mat('coral'), lighthouse, [0, 5.4 - i * 1.65, 0]);
    this.mesh(new THREE.CylinderGeometry(1.07, 1.07, .15, 20), this.mat('navy'), lighthouse, [0, 6.55, 0]);
    this.mesh(new THREE.CylinderGeometry(.72, .72, .85, 12), this.lampMaterial, lighthouse, [0, 7, 0]);
    this.mesh(new THREE.ConeGeometry(1.08, .75, 12), this.mat('navy'), lighthouse, [0, 7.76, 0]);
  }

  private updateRoute(distance: number) {
    if (distance < this.previousDistance) {
      this.particlePool.forEach(particle => particle.life = 0);
      this.particles.count = 0;
      this.impact = this.landing = this.pickupReaction = this.previousJumpHeight = 0;
      this.jumpPitch = 0;
      this.steeringLean = this.steeringYaw = 0;
    }
    this.previousDistance = distance;
    for (let i = 0; i < 100; i++) {
      this.matrixDummy.position.set(i % 2 ? this.laneWidth / 2 : -this.laneWidth / 2, .097, 16 - Math.floor(i / 2) * 4.4 + distance % 4.4);
      this.matrixDummy.rotation.set(0, 0, 0); this.matrixDummy.scale.set(1, 1, 1); this.matrixDummy.updateMatrix(); this.roadDashes.setMatrixAt(i, this.matrixDummy.matrix);
    }
    this.roadDashes.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 56; i++) {
      this.matrixDummy.position.set(i % 2 ? 4.42 : -4.42, .3, 13 - Math.floor(i / 2) * 7 + distance % 7); this.matrixDummy.updateMatrix(); this.roadsidePosts.setMatrixAt(i, this.matrixDummy.matrix);
    }
    this.roadsidePosts.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 160; i++) {
      this.matrixDummy.position.set((i % 2 ? 1 : -1) * (5 + this.random(i + 900) * 55), -.403, 24 - ((this.random(i + 350) * 170 - distance % 170 + 170) % 170));
      this.matrixDummy.rotation.set(-Math.PI / 2, 0, 0);
      this.matrixDummy.scale.set(.25 + this.random(i + 520) * 1.7, .03 + this.random(i + 890) * .035, 1); this.matrixDummy.updateMatrix(); this.oceanGlints.setMatrixAt(i, this.matrixDummy.matrix);
    }
    this.oceanGlints.instanceMatrix.needsUpdate = true;
    this.scenery.forEach(item => { item.object.position.z = 22 - (((item.offset + 20 - distance) % 204 + 204) % 204); });
    this.boats.forEach((item, i) => {
      item.object.position.set(item.x + Math.sin(this.time * .14 + i) * .6, -.29 + Math.sin(this.time * 1.7 + i * 2) * .065, 24 - (((item.offset - distance * .76) % 210 + 210) % 210));
      item.object.rotation.z = Math.sin(this.time * 1.2 + i) * .04;
      item.object.rotation.x = Math.sin(this.time * 1.4 + i) * .025;
    });
    this.stageFlags.forEach((flag, i) => {
      flag.position.z = 10 - (((i * 22 - distance) % 176 + 176) % 176);
      flag.rotation.y = Math.sin(this.time * 3 + i) * .2;
      flag.rotation.z = Math.sin(this.time * 4 + i) * .05;
      this.matrixDummy.position.set(flag.position.x - .36, .74, flag.position.z); this.matrixDummy.rotation.set(0, 0, 0); this.matrixDummy.scale.setScalar(1);
      this.matrixDummy.updateMatrix(); this.flagPoles.setMatrixAt(i, this.matrixDummy.matrix);
    });
    this.flagPoles.instanceMatrix.needsUpdate = true;
    const state = this.gameState;
    if (!state) { this.finish.visible = false; this.lighthouse.visible = false; return; }
    this.finish.visible = state.totalDistance - distance < 125;
    this.finish.position.z = 2 - (state.totalDistance - distance);
    // Spot the destination from the start of the final chapter. It joins the
    // exact finish position once the remaining route enters the visible coast.
    this.lighthouse.visible = state.stage === 2 || state.phase === 'won';
    this.lighthouse.position.z = -3 - Math.min(85, state.totalDistance - distance);
    const visibleIds = new Set<string | number>();
    for (const entity of state.entities) {
      const relative = entity.distance - distance;
      if (!entity.active || relative < -8 || relative > 105) continue;
      visibleIds.add(entity.id);
      let group = this.entityMeshes.get(entity.id);
      if (!group) {
        group = this.entityPool.get(entity.kind)?.pop() ?? this.prototypes.get(entity.kind)!.clone();
        group.userData.kind = entity.kind; group.visible = true; group.rotation.set(0, 0, 0);
        this.entityMeshes.set(entity.id, group); this.scene.add(group);
      }
      group.position.set(entity.lane * this.laneWidth, .105, 2 - relative);
      if (entity.kind === 'fish' || entity.kind === 'shell' || entity.kind === 'pearl') {
        group.position.y = (entity.height ?? (entity.kind === 'pearl' ? 3.1 : 1.2)) + Math.sin(this.time * 3 + entity.distance) * .11;
        group.rotation.y = this.time * 1.8 + entity.distance * .2;
        group.rotation.z = Math.sin(this.time * 2 + entity.distance) * .07;
      }
    }
    this.entityMeshes.forEach((object, id) => {
      if (visibleIds.has(id)) return;
      object.removeFromParent(); this.entityMeshes.delete(id);
      const kind = object.userData.kind as RouteEntity['kind']; const pool = this.entityPool.get(kind) ?? [];
      if (pool.length < 36) pool.push(object);
      this.entityPool.set(kind, pool);
    });
  }

  private makeBicycle() {
    const bike = this.rider;
    const rear: V3 = [-1.16, .77, 0], front: V3 = [1.23, .77, 0], crank: V3 = [-.12, .72, 0], seat: V3 = [-.57, 1.65, 0], neck: V3 = [.85, 1.65, 0];
    for (const p of [rear, front]) {
      const wheel = new THREE.Group(); wheel.position.set(...p); bike.add(wheel); this.wheels.push(wheel);
      this.mesh(new THREE.TorusGeometry(.7, .072, 12, 64), this.mat('tire'), wheel);
      for (const z of [-.042, .042]) this.mesh(new THREE.TorusGeometry(.677, .023, 8, 64), this.mat('tireSide'), wheel, [0, 0, z]);
      this.mesh(new THREE.TorusGeometry(.62, .028, 8, 64), this.mat('chrome'), wheel);
      this.rod(wheel, [0, 0, -.13], [0, 0, .13], .07, 'chrome');
      for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; this.rod(wheel, [.055 * Math.cos(a + .35), .055 * Math.sin(a + .35), i % 2 ? -.035 : .035], [.617 * Math.cos(a), .617 * Math.sin(a), 0], .006, 'chrome'); }
      this.ellipsoid(wheel, 'beak', [0, .53, .04], [.07, .02, .014], 10);
    }
    for (const [a, b] of [[rear, seat], [seat, crank], [crank, rear], [seat, neck], [neck, crank]] as [V3, V3][]) this.rod(bike, a, b, .051, 'coral');
    this.rod(bike, [.84, 1.75, 0], [1.22, .77, 0], .054, 'coral');
    for (const z of [-.12, .12]) { this.rod(bike, [-.58, 1.62, 0], [-1.16, .77, z], .026, 'coral'); this.rod(bike, [-.13, .72, z], [-1.16, .77, z], .024, 'coral'); }
    this.rod(bike, [-.57, 1.63, 0], [-.64, 1.95, 0], .029, 'chrome');
    const saddle = this.ellipsoid(bike, 'saddle', [-.63, 1.98, 0], [.29, .085, .18]); saddle.rotation.z = -.06;
    this.rod(bike, [.82, 1.65, 0], [.71, 2.05, 0], .033, 'chrome'); this.rod(bike, [.71, 2.05, 0], [1.02, 2.11, 0], .032, 'chrome');
    this.tube(bike, [[1.02, 2.11, -.42], [1.15, 2.13, -.35], [1.09, 2.1, 0], [1.15, 2.13, .35], [1.02, 2.11, .42]], .029, 'chrome');
    for (const z of [-.42, .42]) { this.tube(bike, [[1.02, 2.11, z], [.88, 2.05, z], [.88, 1.91, z], [1.01, 1.88, z]], .043, 'saddle'); }
    this.tube(bike, [[1.07, 2.08, .26], [1.33, 1.85, .2], [.92, 1.4, .12]], .009, 'tire');
    this.mesh(new THREE.SphereGeometry(.072, 16, 10), this.mat('chrome'), bike, [1.1, 2.17, .21]);
    // Chainring, both cranks and continuous chain loop.
    this.crank.position.set(...crank); bike.add(this.crank);
    this.mesh(new THREE.TorusGeometry(.19, .025, 6, 32), this.mat('chrome'), bike, [-.12, .72, .12]);
    this.mesh(new THREE.TorusGeometry(.087, .015, 6, 24), this.mat('chrome'), bike, [-1.16, .77, .12]);
    this.tube(bike, [[-.12, .91, .12], [-1.16, .857, .12], [-1.25, .77, .12], [-1.16, .68, .12], [-.12, .53, .12], [.065, .7, .12], [-.12, .91, .12]], .012, 'tire');
    for (const side of [-1, 1]) this.rod(this.crank, [0, 0, side * .13], [side * .27, 0, side * .23], .025, 'chrome');
    const lamp = this.mesh(new THREE.CylinderGeometry(.09, .09, .12, 20), this.mat('chrome'), bike, [1.05, 1.75, 0]); lamp.rotation.z = -Math.PI / 2;
    const lens = this.mesh(new THREE.CircleGeometry(.075, 20), this.lampMaterial, bike, [1.115, 1.75, 0]); lens.rotation.y = Math.PI / 2;
    // Rear rack with a tightly rolled picnic blanket.
    for (const z of [-.16, .16]) { this.rod(bike, [-1.48, 1.6, z], [-.85, 1.6, z], .023, 'chrome'); this.rod(bike, [-1.4, 1.6, z], [-1.16, .77, z], .018, 'chrome'); }
    const blanket = this.mesh(new THREE.CylinderGeometry(.135, .135, .44, 20), this.mat('navy'), bike, [-1.29, 1.73, 0]); blanket.rotation.x = Math.PI / 2;
    for (const z of [-.12, .12]) { const strap = this.mesh(new THREE.TorusGeometry(.137, .014, 6, 20), this.mat('saddle'), bike, [-1.29, 1.73, z]); strap.rotation.z = .1; }
  }

  private makePelican() {
    this.rider.add(this.bird);
    const body = this.ellipsoid(this.bird, 'cream', [-.58, 2.58, 0], [.65, .82, .48]); body.rotation.z = -.21;
    this.ellipsoid(this.bird, 'feather', [-.24, 2.45, .02], [.43, .61, .43]);
    // Individual tail feathers taper off behind the saddle.
    for (let i = 0; i < 5; i++) { const feather = this.ellipsoid(this.bird, i % 2 ? 'wing' : 'feather', [-1.13 - i * .04, 2.2 + i * .042, (i - 2) * .065], [.43, .11, .09]); feather.rotation.z = .3 + i * .06; }
    // A gently curving pelican neck, built with a smooth variable-radius surface.
    const neckPath = new THREE.CatmullRomCurve3([V([-.38, 2.78, 0]), V([-.1, 3.18, 0]), V([.03, 3.67, 0]), V([.32, 4.02, 0])]);
    const neck = new THREE.TubeGeometry(neckPath, 32, .245, 20, false); this.mesh(neck, this.mat('cream'), this.bird);
    this.head.position.set(.3, 3.99, 0); this.bird.add(this.head);
    this.ellipsoid(this.head, 'cream', [0, .03, 0], [.43, .43, .35]);
    this.ellipsoid(this.head, 'feather', [-.22, -.11, 0], [.24, .32, .3]);
    // The characteristic long bill and deep throat pouch are custom beveled forms.
    const upper = new THREE.Shape(); upper.moveTo(.14, -.015); upper.bezierCurveTo(.4, .1, 1.53, -.005, 1.64, -.13); upper.bezierCurveTo(1.7, -.24, .62, -.23, .18, -.19); upper.closePath();
    const billGeo = new THREE.ExtrudeGeometry(upper, { depth: .26, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: .055, bevelThickness: .055, curveSegments: 24 }); billGeo.translate(0, 0, -.13); this.mesh(billGeo, this.mat('beak'), this.head);
    const lower = new THREE.Shape(); lower.moveTo(.18, -.23); lower.bezierCurveTo(.55, -.27, 1.3, -.25, 1.57, -.19); lower.bezierCurveTo(1.29, -.45, .83, -.62, .46, -.61); lower.bezierCurveTo(.23, -.6, .13, -.41, .18, -.23); lower.closePath();
    const pouchGeo = new THREE.ExtrudeGeometry(lower, { depth: .22, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: .075, bevelThickness: .07, curveSegments: 24 }); pouchGeo.translate(0, 0, -.11); this.pouch = this.mesh(pouchGeo, this.mat('pouch'), this.head);
    for (const side of [-1, 1]) {
      this.ellipsoid(this.head, 'white', [.19, .12, side * .298], [.12, .15, .055]);
      const eye = this.ellipsoid(this.head, 'ink', [.225, .135, side * .345], [.06, .078, .032]); this.eyes.push(eye);
      this.ellipsoid(this.head, 'white', [.243, .16, side * .37], [.018, .021, .01], 10);
      this.ellipsoid(this.head, 'coral', [.29, -.08, side * .33], [.085, .047, .009], 16);
      this.ellipsoid(this.head, 'saddle', [.48, .007, side * .193], [.033, .014, .008], 12);
      this.tube(this.head, [[.04, .273, side * .3], [.14, .3, side * .32], [.24, .267, side * .3]], .012, 'ink');
      this.tube(this.head, [[-.29, .19, side * .29], [-.24, -.14, side * .32], [.05, -.3, side * .27], [.21, .23, side * .28]], .014, 'saddle');
    }
    // Retro terracotta cycling helmet with real 3D ribs and a short visor.
    this.mesh(new THREE.SphereGeometry(.454, 40, 20, 0, TAU, 0, Math.PI / 2), this.mat('coral'), this.head, [-.035, .24, 0]);
    const helmetRim = this.mesh(new THREE.TorusGeometry(.44, .025, 8, 48), this.mat('coralDark'), this.head, [-.035, .24, 0]); helmetRim.rotation.x = Math.PI / 2;
    for (const z of [-.18, 0, .18]) { const points: V3[] = []; for (let i = 0; i <= 16; i++) { const angle = .17 + i / 16 * (Math.PI - .34); const radius = Math.sqrt(.456 * .456 - z * z); points.push([-.035 + Math.cos(angle) * radius, .24 + Math.sin(angle) * radius, z]); } this.tube(this.head, points, .023, 'cream'); }
    const visor = this.ellipsoid(this.head, 'coral', [.34, .26, 0], [.25, .035, .32]); visor.rotation.z = -.07;
    // A scarf catches the same breeze as the palms.
    this.ellipsoid(this.bird, 'navy', [-.04, 3.43, 0], [.285, .1, .29]);
    this.scarf.position.set(-.21, 3.45, -.09); this.bird.add(this.scarf);
    this.tube(this.scarf, [[0, 0, 0], [-.32, .04, 0], [-.58, -.1, .05], [-.85, .02, .04]], .072, 'navy');
    this.tube(this.scarf, [[0, 0, .05], [-.26, -.1, .06], [-.48, -.03, .08], [-.67, -.16, .1]], .055, 'navy');
    // Feathery wings reach toward the handlebars; the near wing lifts to greet you.
    for (const side of [-1, 1]) {
      const wing = new THREE.Group(); wing.position.set(-.58, 2.93, side * .38); this.bird.add(wing); if (side === 1) this.wing = wing;
      const upper = this.ellipsoid(wing, 'wing', [.25, -.25, side * .045], [.49, .25, .13]); upper.rotation.z = -.48;
      const lower = this.ellipsoid(wing, 'feather', [.86, -.58, side * .04], [.5, .15, .105]); lower.rotation.z = -.22;
      for (let i = 0; i < 4; i++) { const feather = this.ellipsoid(wing, i % 2 ? 'cream' : 'feather', [.24 + i * .095, -.36 - i * .048, side * (.12 + i * .006)], [.34, .074, .052], 20); feather.rotation.z = -.52; }
      this.ellipsoid(wing, 'cream', [1.4, -.77, side * .01], [.19, .09, .09]);
    }
    for (const side of [-1, 1]) {
      const upper = this.rod(this.rider, [-.51, 2.1, side * .24], [-.1, 1.45, side * .25], .058, 'beak');
      const lower = this.rod(this.rider, [-.1, 1.45, side * .25], [.13, .8, side * .27], .04, 'beak');
      const foot = new THREE.Group(); this.rider.add(foot);
      const pedal = this.mesh(new THREE.BoxGeometry(.23, .05, .22), this.mat('tire'), foot, [0, -.07, 0]); pedal.receiveShadow = true;
      this.ellipsoid(foot, 'beak', [.05, -.008, 0], [.23, .06, .125]);
      for (let i = 0; i < 3; i++) this.ellipsoid(foot, 'beak', [.2, -.015, (i - 1) * .07], [.1, .042, .048], 12);
      this.legs.push({ upper, lower, foot, side });
    }
    this.updatePedals();
  }

  private makeAtmosphere() {
    const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: .88 });
    for (let i = 0; i < 3; i++) {
      const cloud = new THREE.Group(); cloud.position.set([-3.25, 2.95, -.8][i], [4.6, 4.9, 5.35][i], [-2.5, -3, -4][i]); cloud.scale.setScalar([.64, .48, .33][i]);
      for (const [x, y, r] of [[-.6, 0, .4], [0, .16, .55], [.58, .03, .4], [.1, -.08, .4]]) { const m = this.mesh(new THREE.SphereGeometry(r, 20, 12), cloudMaterial, cloud, [x, y, 0]); m.scale.z = .75; m.castShadow = false; }
      this.clouds.push(cloud); this.scene.add(cloud);
      this.batchGroup(cloud);
    }
    for (let i = 0; i < 3; i++) {
      const gull = new THREE.Group(); this.tube(gull, [[-.2, 0, 0], [-.1, .08, 0], [0, 0, 0], [.1, .08, 0], [.2, .015, 0]], .017, 'cream', 12); gull.position.set(i * 1.5 - 2, 4.1 + i * .3, -3.5); this.gulls.push(gull); this.scene.add(gull);
    }
    const vertices: number[] = [];
    for (let i = 0; i < 90; i++) { const a = this.random(i + 80) * TAU; const r = 6 + this.random(i + 60) * 4; vertices.push(Math.cos(a) * r, 3 + this.random(i + 100) * 7, Math.sin(a) * r); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.stars = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffeac4, size: .046, transparent: true, opacity: 0, sizeAttenuation: true })); this.scene.add(this.stars);
    for (const x of [-2.25, 2.25]) {
      this.rod(this.island, [x, .1, 1], [x, .87, 1], .025, 'ink');
      this.mesh(new THREE.SphereGeometry(.09, 12, 8), this.lampMaterial, this.island, [x, .89, 1]);
      const light = new THREE.PointLight(0xffcf79, 0, 3, 2); light.position.set(x, .98, 1); this.island.add(light); this.sceneryLamps.push(light);
    }
  }

  private positionBone(bone: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3) {
    const geometry = bone.geometry as THREE.CylinderGeometry;
    bone.position.copy(start).add(end).multiplyScalar(.5);
    bone.scale.y = start.distanceTo(end) / geometry.parameters.height;
    bone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
  }
  private updatePedals() {
    this.crank.rotation.z = -this.pedalAngle;
    for (const leg of this.legs) {
      const angle = -this.pedalAngle + (leg.side === 1 ? 0 : Math.PI);
      const ankle = new THREE.Vector3(-.12 + Math.cos(angle) * .27, .8 + Math.sin(angle) * .27, leg.side * .27);
      const hip = new THREE.Vector3(-.49, 2.17 + Math.sin(this.pedalAngle * 2) * .018, leg.side * .24);
      // Solve a two-segment leg in its plane so the foot never detaches from the pedal.
      const midpoint = hip.clone().add(ankle).multiplyScalar(.5); const direction = ankle.clone().sub(hip); const distance = direction.length();
      const height = Math.sqrt(Math.max(0, .86 * .86 - distance * distance / 4));
      const knee = midpoint.add(new THREE.Vector3(-direction.y, direction.x, 0).normalize().multiplyScalar(height));
      this.positionBone(leg.upper, hip, knee); this.positionBone(leg.lower, knee, ankle); leg.foot.position.copy(ankle);
    }
  }
  private resize() {
    const width = Math.max(1, this.container.clientWidth), height = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(width, height); this.camera.aspect = width / height;
    this.camera.fov = width < 650 ? 56 : 43; this.camera.updateProjectionMatrix();
  }
  setGameState(state: GameState) { this.gameState = state; }
  setLighting(lighting: Lighting) { this.lighting = lighting; }
  greet() { this.greeting = 2.1; }
  capture() {
    this.renderer.render(this.scene, this.camera);
    const canvas = document.createElement('canvas'); canvas.width = this.renderer.domElement.width; canvas.height = this.renderer.domElement.height;
    const ctx = canvas.getContext('2d')!;
    const colors = { day: ['#f7f8f2', '#e3efe3'], sunset: ['#fcf1e5', '#f5d8b9'], night: ['#152a32', '#264551'] }[this.lighting];
    const gradient = ctx.createRadialGradient(canvas.width * .5, canvas.height * .5, 0, canvas.width * .5, canvas.height * .5, canvas.width * .6);
    gradient.addColorStop(0, colors[1]); gradient.addColorStop(1, colors[0]); ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.renderer.domElement, 0, 0);
    ctx.fillStyle = this.lighting === 'night' ? '#d9eae0' : '#285d55'; ctx.font = `500 ${Math.max(14, canvas.width * .012)}px sans-serif`; ctx.fillText('PELICAN PEDAL CLUB  /  A LITTLE RIDE. A LITTLE JOY.', canvas.width * .04, canvas.height * .95);
    return canvas.toDataURL('image/png');
  }

  private animate = (now: number) => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.animate);
    if (document.hidden) return;
    const elapsed = this.last ? (now - this.last) / 1000 : 0;
    const dt = Math.min(elapsed, .25); this.last = now;
    // Include every visible stall in performance evidence. Only the simulation
    // input is clamped; excluding slow frames would misrepresent responsiveness.
    if (elapsed > 0) {
      this.frameTimes[this.frameTimeCursor++ % 180] = elapsed * 1000;
      this.visibleWallSeconds += elapsed; this.simulationInputSeconds += dt;
      this.maxFrameMs = Math.max(this.maxFrameMs, elapsed * 1000);
      if (elapsed > .05) this.slowFrames++;
    }
    if (now - this.qualityCheckAt > 6000 && this.frameTimes.length === 180) {
      this.qualityCheckAt = now;
      const performance = this.diagnostics();
      if (this.quality === 'high' && performance.frameMsAverage > 28 && performance.frameMsP95 > 40) {
        this.quality = 'balanced'; this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.1));
        this.sun.shadow.mapSize.set(1024, 1024); this.sun.shadow.map?.dispose(); this.sun.shadow.map = null; this.resize();
      }
    }
    const motion = this.reduced || this.gameState?.phase === 'paused' ? 0 : dt;
    this.time += motion;
    this.onFrame(dt);
    const state = this.gameState;
    const running = state?.phase === 'running';
    const effectDt = state?.phase === 'paused' ? 0 : dt;
    this.landing = Math.max(0, this.landing - effectDt * 3.6);
    this.pickupReaction = Math.max(0, this.pickupReaction - effectDt * 3.1);
    this.impact = Math.max(0, this.impact - effectDt * 2.8);
    this.updateEffects(effectDt);
    if (state) {
      this.updateRoute(state.distance);
      const lane = state.lanePosition;
      const steer = state.lane - lane;
      this.steeringLean = THREE.MathUtils.damp(this.steeringLean, running ? THREE.MathUtils.clamp(steer * .25, -.28, .28) : 0, 13, effectDt);
      this.steeringYaw = THREE.MathUtils.damp(this.steeringYaw, running ? THREE.MathUtils.clamp(steer * .14, -.16, .16) : 0, 10, effectDt);
      const landingSquash = this.reduced ? 0 : Math.sin(this.landing * Math.PI) * .065;
      const jumpVelocity = dt > 0 ? (state.jumpHeight - this.previousJumpHeight) / dt : 0;
      this.previousJumpHeight = state.jumpHeight;
      const pitchTarget = state.jumpHeight > .02 ? THREE.MathUtils.clamp(jumpVelocity * .04, -.13, .18) : state.braking ? -.065 : 0;
      this.jumpPitch = THREE.MathUtils.lerp(this.jumpPitch, pitchTarget, 1 - Math.exp(-dt * 13));
      this.rider.position.set(lane * this.laneWidth, .11 + state.jumpHeight * 1.65, 2);
      this.rider.scale.set(.87 * (1 + landingSquash * .4), .87 * (1 - landingSquash), .87 * (1 + landingSquash * .4));
      const yaw = state.phase === 'ready' ? .35 : state.phase === 'won' ? .65 : state.phase === 'lost' ? .85 : Math.PI / 2 - this.steeringYaw;
      this.rider.rotation.set(this.reduced ? 0 : this.steeringLean + Math.sin(this.impact * 35) * this.impact * .035,
        THREE.MathUtils.lerp(this.rider.rotation.y, yaw, this.reduced ? 1 : 1 - Math.exp(-effectDt * 9)),
        this.reduced ? 0 : this.jumpPitch + Math.sin(this.impact * 25) * this.impact * .045, 'YXZ');
      this.rider.visible = !(running && !this.reduced && state.invulnerable > 0 && Math.floor(state.invulnerable * 14) % 2 === 0);
      this.riderShadow.position.x = this.rider.position.x; this.riderShadow.scale.setScalar(1 - state.jumpHeight * .28);
      (this.riderShadow.material as THREE.MeshBasicMaterial).opacity = 1 - state.jumpHeight * .55;
      this.shieldBubble.visible = state.shield;
      this.shieldBubble.position.set(this.rider.position.x, 2.15 + state.jumpHeight * 1.65, 2);
      this.shieldBubble.rotation.y = this.time * .25;
      this.headlight.position.x = this.rider.position.x; this.headlight.target.position.x = this.rider.position.x;
      this.boostTrails.forEach((trail, i) => {
        trail.visible = state.boostRemaining > 0 && running && !this.reduced;
        trail.position.set(this.rider.position.x + (i % 2 ? 1 : -1) * (.8 + this.random(i) * .7), .3 + this.random(i + 9) * 2, 2 + ((this.time * 15 + i * .9) % 8));
      });
      const mobile = this.container.clientWidth < 650;
      const showcase = state.phase === 'ready';
      this.cameraDestination.set(showcase ? (mobile ? 4.1 : 6.4) : (mobile ? .7 : 1.35) + lane * .36,
        showcase ? 7.3 : 6.65, showcase ? 14.2 : 13.3);
      if (!this.reduced && running) {
        this.cameraDestination.x += Math.sin(this.impact * 32) * this.impact * .12;
        this.cameraDestination.y += Math.sin(this.impact * 27) * this.impact * .08 - landingSquash * .4;
      }
      this.camera.position.lerp(this.cameraDestination, this.reduced ? 1 : 1 - Math.exp(-dt * 4));
      this.cameraTarget.set(showcase ? 0 : lane * .24, showcase ? 1.2 : .7, showcase ? (mobile ? -3 : -5) : -8);
      this.cameraAim.lerp(this.cameraTarget, this.reduced ? 1 : 1 - Math.exp(-dt * 5));
      const baseFov = mobile ? 57 : showcase ? 43 : this.reduced ? 47 : 46 + Math.min(6, Math.max(0, state.speed - 9) * .68);
      // Keep all three lanes inside a narrow portrait fullscreen viewport.
      const targetFov = Math.max(baseFov, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(20)) / this.camera.aspect)));
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, this.reduced ? 1 : 1 - Math.exp(-dt * 3)); this.camera.updateProjectionMatrix();
      this.camera.lookAt(this.cameraAim);
    }
    this.updateFireflies(dt);
    if (running && state) {
      const velocity = state.speed / 9;
      this.pedalAngle += dt * 5 * velocity;
      for (const wheel of this.wheels) wheel.rotation.z = -this.pedalAngle * 1.8;
      this.bird.position.y = Math.sin(this.pedalAngle * 2) * .022 - Math.sin(this.landing * Math.PI) * .04;
      this.updatePedals();
    }
    this.greeting = Math.max(0, this.greeting - dt);
    this.riderWind = THREE.MathUtils.damp(this.riderWind, running ? Math.min(1.25, (state?.speed ?? 0) / 17) : .12, 4, effectDt);
    this.windPhase = (this.windPhase + motion * (2.3 + this.riderWind * 4.2)) % TAU;
    const wingFlutter = this.reduced ? 0 : this.riderWind * (.015 + Math.sin(this.windPhase * 2 + .8) * .012);
    this.wing.rotation.z = state?.phase === 'won' ? .92 + Math.sin(this.time * 9) * .13 : this.greeting > 0 ? Math.sin(Math.min(this.greeting, 1) * Math.PI / 2) * (.82 + Math.sin(this.greeting * 13) * .18) : (state?.jumpHeight ?? 0) * .12 + wingFlutter;
    this.wing.rotation.x = this.reduced ? 0 : -this.steeringLean * .18;
    this.head.rotation.z = Math.sin(this.time * 1.4) * .025 + (this.greeting > 0 ? .07 : 0) + (this.reduced ? 0 : Math.sin(this.pickupReaction * Math.PI) * .1);
    this.pouch.scale.y = 1 + (this.reduced ? 0 : Math.sin(this.pickupReaction * Math.PI) * .18);
    const blink = this.time % 5.8; const eyeScale = blink > 5.61 ? .1 + Math.abs(blink - 5.7) * 10 : 1;
    this.eyes.forEach(eye => eye.scale.y = .078 * eyeScale);
    this.scarf.rotation.x = Math.sin(this.windPhase) * (.045 + this.riderWind * .1);
    this.scarf.rotation.y = Math.sin(this.windPhase + 1.1) * this.riderWind * .035;
    this.scarf.rotation.z = Math.sin(this.windPhase * 2 + .4) * (.02 + this.riderWind * .04) + this.riderWind * .13;
    this.palms.forEach((palm, i) => { palm.rotation.x = Math.sin(this.time * 1.25 + i) * .045; palm.rotation.z = Math.cos(this.time * 1.05 + i) * .04; });
    this.clouds.forEach((cloud, i) => { cloud.position.y = 11 + i * 2 + Math.sin(this.time * .5 + i) * .14; cloud.rotation.y = Math.sin(this.time * .2 + i) * .1; });
    this.gulls.forEach((gull, i) => { gull.position.set(Math.sin(this.time * .15 + i * 2.1) * 12, 7 + i * .6, Math.cos(this.time * .15 + i * 2.1) * 5 - 27); gull.rotation.z = Math.sin(this.time * 3 + i) * .15; });
    this.glintLocations.forEach((glint, i) => {
      this.matrixDummy.position.set(glint.x, -.038, glint.z); this.matrixDummy.rotation.set(-Math.PI / 2, 0, Math.sin(glint.phase) * .3);
      this.matrixDummy.scale.set(glint.scale * (.8 + Math.sin(this.time * 1.7 + glint.phase) * .2), .018, 1); this.matrixDummy.updateMatrix(); this.glints.setMatrixAt(i, this.matrixDummy.matrix);
    });
    this.glints.instanceMatrix.needsUpdate = true;
    const lighting = {
      day: { sun: 0xfff3d7, sky: 0xe0f5ff, sea: 0x46afa4, intensity: 2.4, fill: 1.1, exposure: 1, stars: 0 },
      sunset: { sun: 0xffac65, sky: 0xf9c7af, sea: 0x7e9f98, intensity: 2.6, fill: 1.15, exposure: .95, stars: 0 },
      night: { sun: 0x90b6ff, sky: 0x87a7d4, sea: 0x285668, intensity: 1.05, fill: .65, exposure: .82, stars: .85 },
    }[this.lighting];
    const ease = this.reduced ? 1 : 1 - Math.exp(-dt * 3);
    this.sun.color.lerp(this.colorTarget.set(lighting.sun), ease); this.fill.color.lerp(this.colorTarget.set(lighting.sky), ease);
    this.sea.material.color.lerp(this.colorTarget.set(lighting.sea), ease);
    this.water.uniforms.time.value = this.time;
    this.water.uniforms.travel.value = state?.distance ?? 0;
    this.water.uniforms.deepColor.value.lerp(this.colorTarget.set(lighting.sea), ease);
    this.water.uniforms.shallowColor.value.lerp(this.colorTarget.set(this.lighting === 'night' ? 0x48827f : this.lighting === 'sunset' ? 0xb6b895 : 0x78cbb5), ease);
    this.water.uniforms.sunColor.value.copy(this.sun.color);
    const stage = state?.stage ?? 0;
    const flagMaterial = this.stageFlags[0].material as THREE.MeshStandardMaterial;
    flagMaterial.color.lerp(this.colorTarget.set([0xe97853, 0xf5b940, 0x69c4b2][stage]), ease);
    this.materials.road.color.lerp(this.colorTarget.set([0xd5bd90, 0xc4b698, 0xd2c6a7][stage]), ease * .4);
    this.sun.intensity = THREE.MathUtils.lerp(this.sun.intensity, lighting.intensity, ease); this.fill.intensity = THREE.MathUtils.lerp(this.fill.intensity, lighting.fill, ease);
    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(this.renderer.toneMappingExposure, lighting.exposure, ease);
    (this.stars.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp((this.stars.material as THREE.PointsMaterial).opacity, lighting.stars, ease);
    this.lampMaterial.emissiveIntensity = THREE.MathUtils.lerp(this.lampMaterial.emissiveIntensity, this.lighting === 'night' ? 3 : .1, ease);
    this.headlight.intensity = THREE.MathUtils.lerp(this.headlight.intensity, this.lighting === 'night' ? 9 : 0, ease);
    this.sceneryLamps.forEach(lamp => lamp.intensity = THREE.MathUtils.lerp(lamp.intensity, this.lighting === 'night' ? 1.5 : 0, ease));
    this.colorTarget.set(this.lighting === 'night' ? 0x263e48 : this.lighting === 'sunset' ? 0xf1d5b6 : 0xe6eee3);
    (this.scene.background as THREE.Color).lerp(this.colorTarget, ease); (this.scene.fog as THREE.Fog).color.copy(this.scene.background as THREE.Color);
    this.water.uniforms.skyColor.value.copy(this.scene.background as THREE.Color);
    const sky = this.skyDome.material.uniforms;
    this.skyDome.position.copy(this.camera.position);
    sky.horizonColor.value.copy(this.scene.background as THREE.Color);
    sky.zenithColor.value.lerp(this.colorTarget.set(this.lighting === 'night' ? 0x101d35 : this.lighting === 'sunset' ? 0xa39cb8 : 0x9ec8dc), ease);
    sky.glowColor.value.copy(this.sun.color);
    sky.glowStrength.value = THREE.MathUtils.lerp(sky.glowStrength.value, this.lighting === 'sunset' ? .16 : this.lighting === 'night' ? .025 : .07, ease);
    this.renderer.render(this.scene, this.camera);
  };
  dispose() {
    if (this.disposed) return;
    this.disposed = true; cancelAnimationFrame(this.frame); this.resizeObserver.disconnect(); document.removeEventListener('visibilitychange', this.onVisibility);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this.onContextRestored);
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
    const instances = new Set<THREE.InstancedMesh>();
    const collect = (object: THREE.Object3D) => {
      if (object instanceof THREE.InstancedMesh) instances.add(object);
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        geometries.add(object.geometry);
        for (const mat of Array.isArray(object.material) ? object.material : [object.material]) {
          materials.add(mat); for (const value of Object.values(mat)) if (value instanceof THREE.Texture) textures.add(value);
        }
      }
    };
    this.scene.traverse(collect);
    // Prototypes and pooled entities can be detached at teardown. They still own
    // shared GPU resources and must be included in the same deduplicated disposal.
    this.prototypes.forEach(prototype => prototype.traverse(collect));
    this.entityPool.forEach(pool => pool.forEach(entity => entity.traverse(collect)));
    this.entityPool.clear(); this.entityMeshes.clear(); this.prototypes.clear();
    instances.forEach(instance => instance.dispose());
    geometries.forEach(geo => geo.dispose()); materials.forEach(mat => mat.dispose()); textures.forEach(texture => texture.dispose());
    this.sun.shadow.dispose(); this.envTarget.dispose(); this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
