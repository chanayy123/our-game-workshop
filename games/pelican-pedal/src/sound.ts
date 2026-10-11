export type RideEffect = 'fish' | 'pearl' | 'hit' | 'jump' | 'land' | 'boost' | 'stage' | 'win' | 'lose' | 'shell' | 'nearMiss' | 'comboLost';

const midi = (note: number) => 440 * 2 ** ((note - 69) / 12);
// An original D-pentatonic phrase with room between its musical replies.
const MELODY = [62, 66, 69, 66, 64, 0, 62, 64, 71, 69, 66, 0, 64, 62, 0, 66,
  69, 74, 71, 69, 66, 0, 64, 66, 69, 66, 64, 62, 0, 64, 66, 0];
const BASS = [38, 43, 35, 45];

/** All audio is synthesized locally; only the sound toggle opens the audio context. */
export class RideAudio {
  private context?: AudioContext;
  private ambient?: GainNode;
  private effects?: GainNode;
  private music?: GainNode;
  private windGain?: GainNode;
  private boostWindGain?: GainNode;
  private rollGain?: GainNode;
  private windFilter?: BiquadFilterNode;
  private sources = new Set<AudioScheduledSourceNode>();
  private voices = new Set<AudioScheduledSourceNode>();
  private musicVoices = new Set<AudioScheduledSourceNode>();
  private voiceCleanup = new Map<AudioScheduledSourceNode, () => void>();
  private nodes = new Set<AudioNode>();
  private enabled = false;
  private visible = true;
  private disposed = false;
  private pace = 0;
  private stage = 0;
  private night = false;
  private braking = false;
  private boosting = false;
  private airborne = false;
  private nextNote = 0;
  private nextBird = 0;
  private nextFreewheel = 0;
  private musicStep = 0;
  private toggleRevision = 0;
  private scheduler?: ReturnType<typeof setInterval>;

  private async init() {
    if (this.disposed) return;
    try {
      this.context ??= new AudioContext();
      if (this.context.state === 'suspended') await this.context.resume();
      if (this.disposed || this.context.state !== 'running') return;
      return this.context;
    } catch {
      // A denied audio permission or interrupted resume must not interrupt the ride.
      return;
    }
  }

  private connectOcean(ctx: AudioContext) {
    if (this.ambient) return;
    // Gentle peak control leaves room for a pearl, music and surf to overlap.
    const master = ctx.createGain();
    master.gain.value = .85;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.knee.value = 20;
    compressor.ratio.value = 3;
    compressor.attack.value = .008;
    compressor.release.value = .24;
    master.connect(compressor).connect(ctx.destination);
    [master, compressor].forEach(node => this.nodes.add(node));
    this.ambient = ctx.createGain();
    this.ambient.gain.value = 0;
    this.ambient.connect(master);
    this.effects = ctx.createGain();
    this.effects.gain.value = 0;
    this.effects.connect(master);
    this.music = ctx.createGain();
    this.music.gain.value = 0;
    this.music.connect(master);
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i++) {
      brown = (brown + (Math.random() * 2 - 1) * 0.025) / 1.025;
      data[i] = brown * 3.5;
    }
    const ocean = ctx.createBufferSource();
    ocean.buffer = buffer;
    ocean.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;
    const swell = ctx.createGain();
    swell.gain.value = 0.45;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.14;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.24;
    lfo.connect(lfoDepth);
    lfoDepth.connect(swell.gain);
    ocean.connect(filter);
    filter.connect(swell);
    this.connectSpatial(swell, this.ambient, -.32);
    ocean.start();
    lfo.start();
    this.sources.add(ocean);
    this.sources.add(lfo);
    [this.ambient, this.effects, this.music, ocean, filter, swell, lfo, lfoDepth].forEach(node => this.nodes.add(node));

    // A separate, gently breaking surf bed keeps breathing when Percy stops.
    // Independent stereo noise avoids a flat mono hiss or audible short repeat.
    const foam = ctx.createBuffer(2, ctx.sampleRate * 9, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const samples = foam.getChannelData(channel);
      let soft = 0;
      for (let index = 0; index < samples.length; index++) {
        soft = soft * .68 + (Math.random() * 2 - 1) * .32;
        const edge = Math.min(1, index / (ctx.sampleRate * .025), (samples.length - 1 - index) / (ctx.sampleRate * .025));
        samples[index] = soft * edge;
      }
    }
    const surf = ctx.createBufferSource();
    surf.buffer = foam;
    surf.loop = true;
    const surfFilter = ctx.createBiquadFilter();
    surfFilter.type = 'bandpass';
    surfFilter.frequency.value = 950;
    surfFilter.Q.value = .45;
    const surfSwell = ctx.createGain();
    surfSwell.gain.value = .2;
    const surfLfo = ctx.createOscillator();
    surfLfo.frequency.value = .105;
    const surfDepth = ctx.createGain();
    surfDepth.gain.value = .16;
    surfLfo.connect(surfDepth).connect(surfSwell.gain);
    surf.connect(surfFilter).connect(surfSwell);
    this.connectSpatial(surfSwell, this.ambient, .32);
    surf.start(); surfLfo.start();
    this.sources.add(surf); this.sources.add(surfLfo);
    [surf, surfFilter, surfSwell, surfLfo, surfDepth].forEach(node => this.nodes.add(node));

    // Reuse one noise buffer for the sea, wind and tires; no new loops per restart.
    this.windGain = ctx.createGain();
    this.rollGain = ctx.createGain();
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.Q.value = .5;
    const tireFilter = ctx.createBiquadFilter();
    tireFilter.type = 'lowpass';
    tireFilter.frequency.value = 280;
    for (const [gain, noiseFilter] of [[this.windGain, this.windFilter], [this.rollGain, tireFilter]] as const) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      gain.gain.value = 0;
      source.connect(noiseFilter).connect(gain).connect(this.ambient);
      source.start();
      this.sources.add(source);
      [source, noiseFilter, gain].forEach(node => this.nodes.add(node));
    }
    // Tailwind has its own airy, wider spectrum, distinct from the low road bed.
    const tailwind = ctx.createBufferSource();
    tailwind.buffer = foam;
    tailwind.loop = true;
    const tailwindFilter = ctx.createBiquadFilter();
    tailwindFilter.type = 'bandpass';
    tailwindFilter.frequency.value = 1750;
    tailwindFilter.Q.value = .55;
    this.boostWindGain = ctx.createGain();
    this.boostWindGain.gain.value = 0;
    tailwind.connect(tailwindFilter).connect(this.boostWindGain).connect(this.ambient);
    tailwind.start(0, 3.1);
    this.sources.add(tailwind);
    [tailwind, tailwindFilter, this.boostWindGain].forEach(node => this.nodes.add(node));
    this.nextNote = ctx.currentTime + .08;
    this.nextBird = ctx.currentTime + 7.3;
    this.scheduler = setInterval(() => this.schedule(), 80);
  }

  private connectSpatial(source: AudioNode, destination: AudioNode, pan: number): StereoPannerNode | undefined {
    const ctx = this.context;
    if (ctx && typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;
      source.connect(panner).connect(destination);
      this.nodes.add(panner);
      return panner;
    }
    source.connect(destination);
    return undefined;
  }

  async toggle() {
    if (this.disposed) return false;
    const revision = ++this.toggleRevision;
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopVoices();
      this.updateVolume();
      return false;
    }
    const ctx = await this.init();
    // A second click or unmount may finish while AudioContext.resume awaits.
    if (revision !== this.toggleRevision || this.disposed) return this.enabled;
    if (!ctx) {
      this.enabled = false;
      this.updateVolume();
      return false;
    }
    this.connectOcean(ctx);
    this.nextNote = ctx.currentTime + .08;
    this.updateVolume();
    return this.enabled;
  }

  private setGain(node: GainNode | undefined, value: number, smooth = .12) {
    const ctx = this.context;
    if (!node || !ctx || ctx.state === 'closed') return;
    node.gain.cancelScheduledValues(ctx.currentTime);
    if (value === 0) node.gain.setValueAtTime(0, ctx.currentTime);
    else node.gain.setTargetAtTime(value, ctx.currentTime, smooth);
  }

  private updateVolume() {
    const ctx = this.context;
    if (!ctx || ctx.state === 'closed') return;
    const audible = this.enabled && this.visible && !this.disposed;
    this.setGain(this.ambient, audible ? .23 : 0, .35);
    this.setGain(this.effects, audible ? .65 : 0, .02);
    this.setGain(this.music, audible && this.pace > 0 ? (this.night ? .42 : .52) : 0, .22);
    this.setGain(this.windGain, audible ? Math.min(.68, this.pace * this.pace / 5000) * (this.airborne ? 1.12 : 1) : 0, .25);
    this.setGain(this.boostWindGain, audible && this.boosting && this.pace > 0 ? .32 : 0, .18);
    this.setGain(this.rollGain, audible && !this.airborne ? Math.min(.26, this.pace / 170) * (this.braking ? .65 : 1) : 0, .08);
    this.windFilter?.frequency.setTargetAtTime(240 + this.pace * 12, ctx.currentTime, .25);
  }

  /** Pace is km/h; repeated HUD updates never append identical automation. */
  setPace(value: number) {
    const pace = Number.isFinite(value) ? Math.max(0, Math.min(90, value)) : 0;
    if (pace === this.pace) return;
    const wasMoving = this.pace > 0;
    if (pace > 0 && wasMoving && Math.abs(pace - this.pace) < .5) return;
    this.pace = pace;
    if (!pace) this.stopVoices(true);
    else if (!wasMoving && this.context) this.nextNote = this.context.currentTime + .08;
    this.updateVolume();
  }

  setStage(value: number) {
    if (Number.isFinite(value)) this.stage = Math.max(0, Math.min(2, Math.floor(value)));
  }

  /** Authoritative motion, including brake-cancelled boosts and airborne tires. */
  setMotion(braking: boolean, boosting: boolean, airborne: boolean) {
    if (this.disposed || (this.braking === braking && this.boosting === boosting && this.airborne === airborne)) return;
    if (braking && !this.braking && this.context) this.nextFreewheel = this.context.currentTime;
    this.braking = braking;
    this.boosting = boosting && !braking;
    this.airborne = airborne;
    this.updateVolume();
  }

  setNight(value: boolean) {
    if (this.night === value) return;
    this.night = value;
    this.updateVolume();
  }

  setVisible(value: boolean) {
    if (this.visible === value) return;
    this.visible = value;
    if (!value) this.stopVoices();
    if (this.context) {
      this.nextNote = this.context.currentTime + .08;
      this.nextBird = this.context.currentTime + 7.3;
    }
    this.updateVolume();
  }

  private tone(frequency: number, offset: number, duration: number, volume: number,
    type: OscillatorType = 'sine', endFrequency?: number, destination = this.effects, pan = 0) {
    const ctx = this.context;
    if (!ctx || !destination || !this.enabled || !this.visible || this.disposed || ctx.state !== 'running') return;
    const musical = destination === this.music;
    // Reserve room for game feedback when a musical phrase and rewards overlap.
    if (this.voices.size >= 64 || (musical && this.musicVoices.size >= 28)) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + Math.max(0, offset);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(endFrequency, start + duration * .8);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + Math.min(.012, duration * .1));
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    osc.connect(gain);
    const panner = pan ? this.connectSpatial(gain, destination, pan) : undefined;
    if (!pan) gain.connect(destination);
    this.voices.add(osc);
    if (musical) this.musicVoices.add(osc);
    this.nodes.add(osc);
    this.nodes.add(gain);
    const cleanup = () => {
      osc.onended = null;
      osc.disconnect();
      gain.disconnect();
      panner?.disconnect();
      this.voices.delete(osc);
      this.musicVoices.delete(osc);
      this.voiceCleanup.delete(osc);
      this.nodes.delete(osc);
      this.nodes.delete(gain);
      if (panner) this.nodes.delete(panner);
    };
    this.voiceCleanup.set(osc, cleanup);
    osc.onended = cleanup;
    osc.start(start);
    osc.stop(start + duration + .025);
  }

  private schedule() {
    const ctx = this.context;
    if (!ctx || this.disposed || !this.enabled || !this.visible || ctx.state !== 'running') return;
    if (ctx.currentTime >= this.nextBird) {
      this.chirp();
      this.nextBird = ctx.currentTime + 9 + Math.random() * 5;
    }
    if (this.pace <= 0) return;
    if (this.braking && !this.airborne && ctx.currentTime >= this.nextFreewheel) {
      // Small, dry freehub clicks communicate coasting without a brake squeal.
      this.tone(1350, 0, .026, .016, 'triangle', 820, this.effects, .08);
      this.nextFreewheel = ctx.currentTime + .12 + Math.max(0, 1 - this.pace / 60) * .15;
    }
    // Throttled/hidden tabs never cause a burst of overdue notes on return.
    if (this.nextNote < ctx.currentTime) this.nextNote = ctx.currentTime + .035;
    const boosted = this.boosting;
    const bpm = Math.min(116, 78 + this.pace * .38 + this.stage * 3 + (boosted ? 5 : 0));
    const stepDuration = 30 / bpm;
    while (this.nextNote < ctx.currentTime + .16) {
      const step = this.musicStep % MELODY.length;
      const offset = this.nextNote - ctx.currentTime;
      const note = MELODY[step];
      if (note) {
        const frequency = midi(note);
        this.tone(frequency, offset, .44, .055, 'triangle', undefined, this.music);
        this.tone(frequency * 2, offset, .17, .007, 'sine', undefined, this.music);
      }
      if (step % 4 === 0) {
        const root = midi(BASS[Math.floor(step / 8)]);
        this.tone(root, offset, .85, .095, 'sine', undefined, this.music);
        this.tone(root * 2, offset, .52, .018, 'triangle', undefined, this.music);
      }
      if (this.stage > 0 && step % 8 === 6 && !this.night) {
        this.tone(midi(74), offset, .65, .025, 'sine', undefined, this.music);
      }
      if (boosted && step % 2 === 0) {
        this.tone(midi(note ? note + 12 : 81), offset + stepDuration * .5, .22, .023, 'triangle', undefined, this.music);
      }
      this.nextNote += stepDuration;
      this.musicStep = (step + 1) % MELODY.length;
    }
  }

  private chirp() {
    const pan = (Math.random() > .5 ? 1 : -1) * .6;
    for (let n = 0; n < 2; n++) {
      this.tone(this.night ? 2100 : 1350, n * .23, .25, .008, 'sine', this.night ? 2700 : 2150, this.ambient, pan);
    }
  }

  /** Game events never initialize/resume audio; they are silent until the player opts in. */
  effect(type: RideEffect, value = 1): void {
    if (type === 'stage') this.setStage(value);
    if (!this.enabled || !this.visible || this.disposed || this.context?.state !== 'running') return;
    // Accept the simulation's awarded points as well as a direct combo multiplier.
    const combo = Number.isFinite(value) ? Math.max(1, Math.min(8, value >= 100 ? value / 100 : value)) : 1;
    switch (type) {
      case 'fish': {
        const pitch = midi([74, 76, 78, 81, 83, 86, 88, 90][Math.floor(combo) - 1]);
        this.tone(pitch, 0, .13, .105, 'triangle');
        this.tone(pitch * 1.5, .065, .23, .08);
        break;
      }
      case 'pearl':
        [988, 1480, 1976, 2960].forEach((note, i) => this.tone(note, i * .045, .45, .105 - i * .023));
        this.tone(494, 0, .34, .055, 'triangle');
        break;
      case 'shell':
        [659, 988, 1319].forEach((note, i) => this.tone(note, i * .065, .28, .12 - i * .018));
        break;
      case 'hit':
        if (value === 0) {
          this.tone(1319, 0, .23, .12, 'sine', 659);
          this.tone(1760, .025, .3, .06);
          break;
        }
        this.tone(150, 0, .25, .2, 'triangle', 45);
        this.tone(75, .018, .31, .16, 'sine', 38);
        break;
      case 'jump':
        this.tone(280, 0, .22, .1, 'triangle', 920);
        this.tone(560, .025, .17, .04, 'sine', 1500);
        break;
      case 'land':
        this.tone(112, 0, .16, .1, 'sine', 48);
        this.tone(220, .015, .065, .018, 'triangle', 90);
        break;
      case 'boost':
        this.tone(180, 0, .42, .065, 'triangle', 720);
        [587, 740, 880].forEach((note, i) => this.tone(note, .1 + i * .065, .33, .085, 'triangle'));
        break;
      case 'stage':
        [523, 659, 784, 1047].forEach((note, i) => this.tone(note, i * .105, .32, .13, 'triangle'));
        break;
      case 'win':
        [523, 659, 784, 1047, 1319].forEach((note, i) => this.tone(note, i * .115, .44, .14, 'triangle'));
        [523, 659, 784].forEach(note => this.tone(note, .66, .7, .07));
        break;
      case 'lose':
        [392, 311, 262].forEach((note, i) => this.tone(note, i * .19, .45, .12, 'triangle'));
        break;
      case 'nearMiss':
        this.tone(1047, 0, .075, .065, 'sine', 1397);
        this.tone(1568, .06, .17, .06);
        break;
      case 'comboLost':
        this.tone(440, 0, .14, .045, 'triangle', 330);
        this.tone(294, .085, .2, .038);
        break;
    }
  }

  async bell() {
    for (const [frequency, offset, volume] of [[1850, 0, .1], [2780, 0, .035], [1850, .17, .07]]) {
      this.tone(frequency, offset, 1.1, volume);
    }
  }

  private stopVoices(musicOnly = false) {
    const voices = musicOnly ? this.musicVoices : this.voices;
    for (const source of [...voices]) {
      try { source.stop(); } catch { /* The voice may already have finished. */ }
      this.voiceCleanup.get(source)?.();
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.enabled = false;
    this.toggleRevision++;
    clearInterval(this.scheduler);
    this.stopVoices();
    this.sources.forEach(source => {
      try { source.stop(); } catch { /* Disposal is safe more than once. */ }
    });
    this.sources.clear();
    this.nodes.forEach(node => node.disconnect());
    this.nodes.clear();
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {});
  }
}
