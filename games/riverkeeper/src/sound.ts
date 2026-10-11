export class CreekSound {
  private context?: AudioContext;
  private master?: GainNode;
  muted = false;
  async start() {
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.master.connect(this.context.destination);
      const buffer = this.context.createBuffer(1, this.context.sampleRate * 3, this.context.sampleRate);
      const data = buffer.getChannelData(0);
      let brown = 0;
      for (let i = 0; i < data.length; i++) { brown = (brown + (Math.random() * 2 - 1) * 0.022) / 1.025; data[i] = brown; }
      const stream = this.context.createBufferSource(); stream.buffer = buffer; stream.loop = true;
      const filter = this.context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1800;
      const gain = this.context.createGain(); gain.gain.value = 0.45;
      stream.connect(filter).connect(gain).connect(this.master); stream.start();
    }
    if (this.context.state === 'suspended') await this.context.resume();
  }
  toggle() { this.muted = !this.muted; if(this.context && this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : .55, this.context.currentTime, .1); return this.muted; }
  play(kind: string) {
    if (!this.context || !this.master || this.muted) return;
    const ctx = this.context, now = ctx.currentTime;
    const notes: Record<string, number[]> = { rock: [110, 75], soil: [145, 100], dig: [330, 180], remove: [220, 145], bite: [160, 90, 65], recovered: [440, 550, 660], won: [392, 494, 587, 784], 'recovery-start': [350, 440], bird: [1600, 2150, 1900] };
    (notes[kind] ?? [330]).forEach((frequency, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain(); const at = now + i * .105;
      osc.type = kind === 'bite' ? 'sawtooth' : 'sine'; osc.frequency.setValueAtTime(frequency, at);
      osc.frequency.exponentialRampToValueAtTime(frequency * (kind === 'bird' ? 1.18 : .8), at + .12);
      gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(kind === 'bird' ? .025 : .15, at + .008); gain.gain.exponentialRampToValueAtTime(.001, at + .2);
      osc.connect(gain).connect(this.master!); osc.start(at); osc.stop(at + .22);
    });
  }
}
