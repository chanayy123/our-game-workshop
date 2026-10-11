import assert from 'node:assert/strict';
import test from 'node:test';
import type { TestContext } from 'node:test';
import { IslandAudio } from '../src/audio.ts';

class FakeParam {
  value = 0;
  setValueAtTime(value: number): void { this.value = value; }
  setTargetAtTime(value: number): void { this.value = value; }
  linearRampToValueAtTime(value: number): void { this.value = value; }
  exponentialRampToValueAtTime(value: number): void { this.value = value; }
}
class FakeAudioNode {
  gain = new FakeParam();
  frequency = new FakeParam();
  playbackRate = new FakeParam();
  Q = new FakeParam();
  type = '';
  loop = false;
  buffer: unknown;
  connect(node: FakeAudioNode): FakeAudioNode { return node; }
  start(): void {}
  stop(): void {}
}
class FakeAudioContext {
  static latest: FakeAudioContext;
  sampleRate = 16;
  currentTime = 0;
  state = 'running';
  destination = new FakeAudioNode();
  oscillatorCount = 0;
  constructor() { FakeAudioContext.latest = this; }
  createGain(): FakeAudioNode { return new FakeAudioNode(); }
  createBiquadFilter(): FakeAudioNode { return new FakeAudioNode(); }
  createBufferSource(): FakeAudioNode { return new FakeAudioNode(); }
  createOscillator(): FakeAudioNode { this.oscillatorCount++; return new FakeAudioNode(); }
  createBuffer(_channels: number, length: number) { return { getChannelData: () => new Float32Array(length) }; }
  suspend(): Promise<void> { this.state = 'suspended'; return Promise.resolve(); }
  resume(): Promise<void> { this.state = 'running'; return Promise.resolve(); }
}

function setup(t: TestContext): IslandAudio {
  const globals = globalThis as unknown as Record<string, unknown>;
  const original = globals.AudioContext;
  globals.AudioContext = FakeAudioContext;
  t.after(() => { globals.AudioContext = original; });
  const audio = new IslandAudio();
  audio.start();
  return audio;
}

test('unmuting after a muted pause and resume restores audible playback', (t) => {
  const audio = setup(t);
  audio.setMuted(true);
  audio.pause();
  assert.equal(FakeAudioContext.latest.state, 'suspended');
  audio.resume();
  audio.setMuted(false);
  assert.equal(FakeAudioContext.latest.state, 'running');
});

test('a suspended audio clock does not collect footsteps and bird calls', (t) => {
  const audio = setup(t);
  audio.pause();
  const context = FakeAudioContext.latest;
  const before = context.oscillatorCount;
  for (let frame = 0; frame < 600; frame++) audio.update(1 / 60, 9.2);
  assert.equal(context.oscillatorCount, before);
});
