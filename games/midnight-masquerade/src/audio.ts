import type { GameState } from './types';

/** All voices are finite, disconnected after playback, and created only after a gesture. */
export class GameAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private muted = false;
  private paused = false;
  private seenEvents = new Set<number>();
  private round = -1;
  private lastElapsed = 0;
  private musicTimer = 0;
  private heartbeatTimer = 0;
  private musicStep = 0;
  private recentSounds = new Map<string, number>();

  unlock(): void {
    if (!this.context) {
      const AudioConstructor = window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioConstructor) return;
      try {
        this.context = new AudioConstructor();
        this.master = this.context.createGain();
        this.master.gain.value = this.muted || this.paused ? 0 : 0.7;
        const compressor = this.context.createDynamicsCompressor();
        compressor.threshold.value = -18;
        compressor.knee.value = 14;
        compressor.ratio.value = 4;
        compressor.attack.value = 0.006;
        compressor.release.value = 0.18;
        this.master.connect(compressor);
        compressor.connect(this.context.destination);
        this.noiseBuffer = this.context.createBuffer(1, this.context.sampleRate, this.context.sampleRate);
        const samples = this.noiseBuffer.getChannelData(0);
        let smoothed = 0;
        for (let index = 0; index < samples.length; index++) {
          smoothed = (smoothed + (Math.random() * 2 - 1) * 0.13) / 1.13;
          samples[index] = smoothed * 3;
        }
      } catch {
        // Audio support is optional; play remains available without it.
        this.context = null;
        this.master = null;
      }
    }
    if (this.context?.state === 'suspended') void this.context.resume().catch(() => {});
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.updateVolume();
  }

  /** Call together with the game's pause control so scheduled notes also go quiet. */
  setPaused(paused: boolean): void {
    this.paused = paused;
    this.updateVolume();
  }

  private updateVolume(): void {
    if (!this.context || !this.master) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(this.muted || this.paused ? 0 : 0.7, this.context.currentTime, 0.025);
  }

  update(state: GameState, dt: number): void {
    if (this.paused) return;
    // A new round can reuse event identifiers, including after a menu restart.
    if (state.round !== this.round || state.elapsed + 0.5 < this.lastElapsed) {
      this.seenEvents.clear();
      this.recentSounds.clear();
      this.round = state.round;
      this.musicStep = 0;
      this.musicTimer = 0.4;
      this.heartbeatTimer = 0.4;
    }
    this.lastElapsed = state.elapsed;
    for (const event of state.events) {
      if (this.seenEvents.has(event.id)) continue;
      this.seenEvents.add(event.id);
      if (state.role === 'police' && ((event.type === 'noise' && Math.hypot(event.x - state.cops[0].x, event.z - state.cops[0].z) > 11) || event.type === 'transform')) continue;
      this.play(event.type);
    }
    // Keep enough IDs to cover the simulation's short event tail without growing forever.
    if (this.seenEvents.size > 512) {
      this.seenEvents = new Set([...this.seenEvents].slice(-256));
    }
    if (!this.context || this.context.state !== 'running' || this.muted) return;
    if (state.phase !== 'prepare' && state.phase !== 'search') return;
    const tick = Math.min(Math.max(dt, 0), 0.15);
    const activeCops = state.cops.filter(cop => cop.hp > 0 && cop.mode !== 'retired');
    const nearest = activeCops.reduce((distance, cop) =>
      Math.min(distance, Math.hypot(cop.x - state.player.x, cop.z - state.player.z)), 100);
    const suspicion = Math.max(0, Math.min(1, state.suspicion / 100));
    const chasing = activeCops.some(cop => cop.mode === 'chase');
    const danger = state.role === 'police' ? (state.player.exposed ? 1 : 0) : state.phase === 'search' ? Math.min(1, Math.max(
      chasing ? 1 : 0, suspicion * 0.75, (7 - nearest) / 7,
    )) : 0;

    this.musicTimer -= tick;
    if (this.musicTimer <= 0) {
      // Sparse D-minor add-nine music leaves space for footsteps and scrutiny.
      const melody = [293.66, 440, 349.23, 329.63, 261.63, 440, 349.23, 220];
      const frequency = melody[this.musicStep % melody.length];
      this.tone(frequency, 1.45, 0.026 * (1 - danger * 0.6), 'sine', 0, undefined,
        this.musicStep % 2 === 0 ? -0.24 : 0.24, 0.015);
      if (this.musicStep % 4 === 0) {
        this.tone(73.416, 2.6, 0.017 * (1 - danger * 0.55), 'sine', 0, undefined, 0, 0.35);
      }
      this.musicStep++;
      this.musicTimer = state.phase === 'prepare' ? 1.3 : 1.8;
    }

    this.heartbeatTimer -= tick;
    if (danger > 0.16 && this.heartbeatTimer <= 0) {
      const volume = 0.022 + danger * 0.071;
      this.tone(68, 0.12, volume, 'sine', 0, 43, -0.04);
      this.tone(62, 0.11, volume * 0.55, 'sine', 0.145, 39, 0.04);
      this.heartbeatTimer = 1.2 - danger * 0.65;
    } else if (danger <= 0.16) {
      this.heartbeatTimer = Math.max(0.12, this.heartbeatTimer);
    }
  }

  play(type: string): void {
    if (!this.context || this.context.state !== 'running' || this.muted || this.paused) return;
    const now = this.context.currentTime;
    const minimumGap = type === 'step' ? 0.2 : 0.05;
    if (now - (this.recentSounds.get(type) ?? -100) < minimumGap) return;
    this.recentSounds.set(type, now);
    switch (type) {
      case 'transform':
        this.noise(0.24, 0.16, 1700, 'lowpass');
        [440, 587.33, 880, 1174.66].forEach((note, index) =>
          this.tone(note, 0.24, 0.055, 'sine', index * 0.038, note * 1.04, (index - 1.5) * 0.16));
        break;
      case 'wrong':
        this.noise(0.085, 0.22, 750, 'bandpass');
        this.tone(165, 0.17, 0.17, 'triangle', 0, 76);
        this.tone(294, 0.17, 0.07, 'triangle', 0.2, 261);
        this.tone(220, 0.22, 0.06, 'triangle', 0.36, 147);
        break;
      case 'found':
        this.noise(0.11, 0.13, 2300, 'bandpass');
        [0, 0.14].forEach(delay => {
          this.tone(622.25, 0.2, 0.085, 'triangle', delay, 659.25);
          this.tone(440, 0.2, 0.06, 'triangle', delay, 466.16);
        });
        this.tone(110, 0.5, 0.09, 'sine', 0, 73.42);
        break;
      case 'smoke':
        this.noise(0.7, 0.25, 1100, 'lowpass');
        this.tone(150, 0.3, 0.065, 'sine', 0, 45);
        break;
      case 'noise':
        this.tone(880, 0.22, 0.075, 'sine', 0, 1320);
        this.tone(1108.73, 0.18, 0.08, 'sine', 0.2, 880);
        this.tone(1318.51, 0.26, 0.075, 'sine', 0.35, 1174.66);
        break;
      case 'escape':
        [523.25, 659.25, 783.99, 1046.5].forEach((note, index) =>
          this.tone(note, 0.45, 0.065, 'sine', index * 0.095, undefined, (index - 1.5) * 0.2));
        break;
      case 'win':
        [293.66, 369.99, 440, 587.33, 440, 587.33, 739.99, 880].forEach((note, index) =>
          this.tone(note, index === 7 ? 1.1 : 0.36, 0.085, 'triangle', index * 0.15));
        this.tone(146.83, 1.6, 0.08, 'sine', 0.6);
        this.tone(220, 1.4, 0.055, 'sine', 0.8);
        break;
      case 'lose':
        [349.23, 329.63, 293.66, 220, 146.83].forEach((note, index) =>
          this.tone(note, index === 4 ? 1.25 : 0.4, 0.075, 'triangle', index * 0.22, note * 0.98));
        break;
      case 'step':
        this.noise(0.055, 0.022, 850, 'lowpass');
        break;
    }
  }

  private tone(frequency: number, duration: number, volume: number,
    type: OscillatorType = 'sine', delay = 0, endFrequency?: number, pan = 0, attack = 0.007): void {
    if (!this.context || !this.master) return;
    const now = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();
    const panner = this.context.createStereoPanner();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(volume, now + Math.min(attack, duration * 0.3));
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    panner.pan.value = pan;
    oscillator.connect(envelope);
    envelope.connect(panner);
    panner.connect(this.master);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
      panner.disconnect();
    };
    oscillator.start(now);
    oscillator.stop(now + duration + 0.03);
  }

  private noise(duration: number, volume: number, cutoff: number, type: BiquadFilterType): void {
    if (!this.context || !this.master || !this.noiseBuffer) return;
    const now = this.context.currentTime;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const envelope = this.context.createGain();
    source.buffer = this.noiseBuffer;
    filter.type = type;
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(80, cutoff * 0.3), now + duration);
    filter.Q.value = type === 'bandpass' ? 1.4 : 0.6;
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(volume, now + 0.005);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(this.master);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      envelope.disconnect();
    };
    source.start(now);
    source.stop(now + duration + 0.025);
  }
}
