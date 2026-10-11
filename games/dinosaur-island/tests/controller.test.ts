import assert from 'node:assert/strict';
import test from 'node:test';
import type { TestContext } from 'node:test';
import { Object3D, PerspectiveCamera } from 'three';
import { DinosaurController } from '../src/controller.ts';
import type { DinosaurControllerOptions } from '../src/controller.ts';
import { riverCenter,riverDepth,terrainHeight } from '../src/terrain.ts';

class FakeElement extends EventTarget {
  readonly captures = new Set<number>();
  isContentEditable = false;
  tagName = 'CANVAS';
  setPointerCapture(id: number): void { this.captures.add(id); }
  hasPointerCapture(id: number): boolean { return this.captures.has(id); }
  releasePointerCapture(id: number): void {
    this.captures.delete(id);
    const event = Object.assign(new Event('lostpointercapture'), { pointerId: id });
    this.dispatchEvent(event);
  }
}

function setup(t: TestContext, options: Partial<DinosaurControllerOptions> = {}) {
  const fakeWindow = new EventTarget();
  const fakeDocument = Object.assign(new EventTarget(), { hidden: false });
  const globals = globalThis as unknown as Record<string, unknown>;
  const originals = { window: globals.window, document: globals.document, HTMLElement: globals.HTMLElement };
  globals.window = fakeWindow;
  globals.document = fakeDocument;
  globals.HTMLElement = FakeElement;
  const element = new FakeElement();
  const target = new Object3D();
  const camera = new PerspectiveCamera(60, 1, 0.1, 500);
  const controller = new DinosaurController({
    target, camera, domElement: element as unknown as HTMLElement,
    terrainHeight: () => 1, ...options,
  });
  t.after(() => {
    controller.dispose();
    Object.assign(globals, originals);
  });
  function key(type: 'keydown' | 'keyup', code: string, repeat = false): void {
    fakeWindow.dispatchEvent(Object.assign(new Event(type, { cancelable: true }), { code, repeat }));
  }
  function frames(count = 120): void {
    for (let i = 0; i < count; i++) controller.update(1 / 60);
  }
  return { controller, target, camera, element, fakeWindow, fakeDocument, key, frames };
}

test('touch movement supports running and clears on release, pause and reset',(t)=>{
  const {controller,target,frames}=setup(t);
  controller.setTouchMovement(0,1);frames(60);assert.ok(target.position.z<-3);
  controller.setTouchMovement(0,1,true);frames(60);assert.equal(controller.state.action,'run');
  controller.setTouchMovement(0,0);frames(90);assert.equal(controller.state.action,'idle');
  controller.setTouchMovement(0,1);controller.setEnabled(false);controller.setEnabled(true);const z=target.position.z;frames(60);assert.equal(target.position.z,z);
  controller.setTouchMovement(0,1);controller.reset();frames(60);assert.equal(target.position.z,0);
});

test('the player can enter a real river bed and wading reduces running speed',(t)=>{
  const {controller,target,key,frames}=setup(t,{terrainHeight,waterDepth:riverDepth,spawn:{x:riverCenter(115),z:115,heading:Math.PI},obstacles:[]});
  key('keydown','KeyW');key('keydown','ShiftLeft');frames(30);
  assert.equal(controller.state.wading,true);assert.ok(controller.state.speed>2&&controller.state.speed<6);assert.ok(target.position.z<115);
});
test('bite and feeding lock locomotion and roar; reset clears the interaction',(t)=>{
  const {controller,target,key,frames}=setup(t);assert.equal(controller.requestAction('eat',2.2),true);assert.equal(controller.requestRoar(),false);
  key('keydown','KeyW');frames(60);assert.equal(target.position.z,0);assert.equal(controller.state.action,'eat');assert.equal(controller.requestAction('attack',1.2),false);
  controller.reset();assert.equal(controller.busy,false);assert.equal(controller.requestRoar(),true);
});

test('WASD movement accelerates, Shift runs, and releasing input settles to idle', (t) => {
  const { controller, target, key, frames } = setup(t);
  key('keydown', 'KeyW');
  frames();
  assert.ok(target.position.z < -7, 'forward follows the initial camera direction');
  assert.ok(Math.abs(controller.state.speed - 4.6) < 0.01);
  assert.equal(controller.state.action, 'walk');
  key('keydown', 'ShiftLeft');
  frames();
  assert.ok(controller.state.speed > 10.4);
  assert.equal(controller.state.action, 'run');
  key('keyup', 'KeyW');
  key('keyup', 'ShiftLeft');
  frames();
  assert.ok(controller.state.speed < 0.01);
  assert.equal(controller.state.action, 'idle');
});

test('opposing keys cancel and diagonal input cannot exceed walk speed', (t) => {
  const { controller, target, key, frames } = setup(t);
  key('keydown', 'KeyW'); key('keydown', 'KeyS');
  frames();
  assert.equal(target.position.lengthSq(), 1, 'only the ground height is nonzero');
  key('keyup', 'KeyS'); key('keydown', 'KeyD');
  frames(240);
  assert.ok(Math.abs(controller.state.speed - 4.6) < 0.01);
  assert.ok(target.position.x > 0 && target.position.z < 0);
});

test('blur and hidden-tab events clear held keys and velocity', (t) => {
  const { controller, target, key, frames, fakeWindow, fakeDocument } = setup(t);
  key('keydown', 'KeyW'); frames();
  fakeWindow.dispatchEvent(new Event('blur'));
  const afterBlur = target.position.clone();
  frames();
  assert.ok(target.position.equals(afterBlur));
  key('keydown', 'KeyW'); frames(30);
  fakeDocument.hidden = true;
  fakeDocument.dispatchEvent(new Event('visibilitychange'));
  const afterHidden = target.position.clone();
  frames();
  assert.ok(target.position.equals(afterHidden));
  assert.equal(controller.state.action, 'idle');
});

test('the actor stays attached to a rising height field', (t) => {
  const height = (_x: number, z: number) => 1 - z * 0.08;
  const { controller, target, key } = setup(t, { terrainHeight: height });
  key('keydown', 'KeyW');
  for (let frame = 0; frame < 240; frame++) {
    controller.update(1 / 60);
    assert.ok(target.position.y >= height(target.position.x, target.position.z));
  }
  assert.ok(target.position.y > 2);
});

test('running cannot cross a deep-water coastline', (t) => {
  const height = (x: number, z: number) => x * x + z * z < 400 ? 1 : -5;
  const { controller, target, key } = setup(t, { terrainHeight: height, spawn: { x: 10, z: 0 } });
  key('keydown', 'KeyW'); key('keydown', 'ShiftLeft');
  for (let frame = 0; frame < 600; frame++) {
    controller.update(1 / 60);
    assert.ok(target.position.x ** 2 + target.position.z ** 2 < 400);
  }
  assert.ok(target.position.z < -17, 'the coast remains approachable');
  assert.equal(controller.state.action, 'idle');
});

test('a rock proxy blocks running without tunnelling through it', (t) => {
  const { controller, target, key, frames } = setup(t, {
    obstacles: [{ x: 0, z: -8, radius: 2, height: 8 }],
  });
  key('keydown', 'KeyW'); key('keydown', 'ShiftLeft');
  frames(360);
  assert.ok(target.position.z > -4.56 && target.position.z < -4.4);
  assert.ok(Math.hypot(target.position.x, target.position.z + 8) >= 3.44);
  assert.equal(controller.state.action, 'idle');
});

test('pause freezes movement and roar time, and resumes without sticky input', (t) => {
  const { controller, target, key, frames } = setup(t);
  key('keydown', 'KeyW'); frames(60);
  controller.requestRoar();
  controller.setEnabled(false);
  const pausedPosition = target.position.clone();
  const pausedRoar = controller.state.roarRemaining;
  frames(300);
  key('keydown', 'KeyW');
  assert.ok(target.position.equals(pausedPosition));
  assert.equal(controller.state.roarRemaining, pausedRoar);
  assert.equal(controller.requestRoar(), false);
  controller.setEnabled(true);
  frames(300);
  assert.ok(target.position.equals(pausedPosition));
  assert.equal(controller.state.action, 'idle');
});

test('roar fires once, blocks movement, and returns to normal locomotion', (t) => {
  let count = 0;
  const { controller, target, key, frames } = setup(t, { onRoar: () => count++ });
  key('keydown', 'KeyR');
  key('keydown', 'KeyR', true);
  assert.equal(controller.requestRoar(), false);
  key('keydown', 'KeyW');
  const before = target.position.clone();
  frames(120);
  assert.equal(count, 1);
  assert.equal(controller.state.action, 'roar');
  assert.ok(target.position.equals(before));
  frames(120);
  assert.equal(controller.state.action, 'walk');
  assert.ok(target.position.z < before.z);
});

test('reset clears action and input while restoring spawn, heading and camera', (t) => {
  const { controller, target, camera, key, frames } = setup(t, { terrainHeight: (x) => 1 + x * 0.1 });
  key('keydown', 'KeyW'); frames(60);
  controller.requestRoar();
  controller.reset({ x: 7, z: 3, heading: Math.PI / 2 });
  assert.equal(target.position.x, 7);
  assert.equal(target.position.z, 3);
  assert.ok(Math.abs(target.position.y - 1.7) < 1e-10);
  assert.equal(target.rotation.y, Math.PI / 2);
  assert.equal(controller.state.roarRemaining, 0);
  assert.equal(controller.state.action, 'idle');
  const resetPosition = target.position.clone();
  frames();
  assert.ok(target.position.equals(resetPosition));
  assert.ok(camera.position.x < target.position.x, 'camera starts behind the actor heading');
});

test('large frame deltas are bounded and camera remains above terrain', (t) => {
  const { controller, target, camera, key } = setup(t);
  key('keydown', 'KeyW'); key('keydown', 'ShiftLeft');
  controller.update(20);
  assert.ok(Math.hypot(target.position.x, target.position.z) < 0.6);
  assert.ok(camera.position.y >= 1.45);
  const position = target.position.clone();
  controller.update(-1);
  assert.ok(target.position.equals(position));
});

test('orbit and wheel change the camera, and pointer capture is released on pause', (t) => {
  const { controller, camera, element } = setup(t);
  const originalCamera = camera.position.clone();
  element.dispatchEvent(Object.assign(new Event('pointerdown'), { pointerId: 4, button: 0, clientX: 100, clientY: 100 }));
  element.dispatchEvent(Object.assign(new Event('pointermove'), { pointerId: 4, clientX: 250, clientY: 120 }));
  controller.update(1 / 60);
  assert.ok(camera.position.distanceTo(originalCamera) > 1);
  element.dispatchEvent(Object.assign(new Event('wheel', { cancelable: true }), { deltaY: -150 }));
  controller.update(1 / 60);
  controller.setEnabled(false);
  assert.equal(element.captures.size, 0);
});
