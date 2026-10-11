/** Original synthesized island ambience. Starts only after a user gesture. */
export class IslandAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;
  private stepTimer = 0;
  private birdTimer = 0;
  private noise: AudioBuffer | null = null;
  start() {
    if (this.context) { void this.context.resume(); return; }
    const context = this.context = new AudioContext();
    this.master = context.createGain(); this.master.gain.value = this.muted ? 0 : .36; this.master.connect(context.destination);
    this.noise = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const data = this.noise.getChannelData(0); let last=0;
    for(let i=0;i<data.length;i++){last=(last+Math.random()*.04-.02)/1.02;data[i]=last*4;}
    const source=context.createBufferSource();source.buffer=this.noise;source.loop=true;
    const filter=context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;
    const gain=context.createGain();gain.gain.value=.14;source.connect(filter).connect(gain).connect(this.master);source.start();
  }
  setMuted(muted:boolean){this.muted=muted;if(this.master&&this.context)this.master.gain.setTargetAtTime(muted?0:.36,this.context.currentTime,.1);}
  pause(){void this.context?.suspend();}
  // Muting is a gain change, independent from pausing the audio clock.
  resume(){void this.context?.resume();}
  roar(){
    if(!this.context||this.context.state!=='running'||!this.master||!this.noise)return;
    const c=this.context,t=c.currentTime;
    const gain=c.createGain();gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.8,t+.25);gain.gain.exponentialRampToValueAtTime(.001,t+2.7);gain.connect(this.master);
    const source=c.createBufferSource();source.buffer=this.noise;source.playbackRate.value=.72;
    const filter=c.createBiquadFilter();filter.type='bandpass';filter.frequency.setValueAtTime(520,t);filter.frequency.exponentialRampToValueAtTime(110,t+2.5);filter.Q.value=.8;
    source.connect(filter).connect(gain);source.start();source.stop(t+2.8);
    for(const f of [38,57,84]){const osc=c.createOscillator();osc.type='sawtooth';osc.frequency.setValueAtTime(f*1.4,t);osc.frequency.exponentialRampToValueAtTime(f*.7,t+2.6);const g=c.createGain();g.gain.value=.1;osc.connect(g).connect(gain);osc.start();osc.stop(t+2.8);}
  }
  update(dt:number,speed:number){
    if(!this.context||this.context.state!=='running'||!this.master)return;this.stepTimer-=dt;this.birdTimer-=dt;
    if(speed>.5&&this.stepTimer<0){this.stepTimer=speed>6?.34:.63;const c=this.context,t=c.currentTime;const osc=c.createOscillator(),g=c.createGain();osc.frequency.setValueAtTime(65,t);osc.frequency.exponentialRampToValueAtTime(23,t+.18);g.gain.setValueAtTime(.36,t);g.gain.exponentialRampToValueAtTime(.001,t+.23);osc.connect(g).connect(this.master);osc.start();osc.stop(t+.24);}
    if(this.birdTimer<0){this.birdTimer=6+Math.random()*12;const c=this.context,t=c.currentTime;const osc=c.createOscillator(),g=c.createGain();osc.frequency.setValueAtTime(1400,t);osc.frequency.exponentialRampToValueAtTime(2400,t+.13);osc.frequency.exponentialRampToValueAtTime(1250,t+.35);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.023,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+.4);osc.connect(g).connect(this.master);osc.start();osc.stop(t+.41);}
  }
}
