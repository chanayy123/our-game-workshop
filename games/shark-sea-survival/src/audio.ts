export type SeaSound = 'splash'|'shot'|'knife'|'hit'|'impact'|'breach'|'win'|'enter'|'engine'|'chop'|'timber'|'repair'|'cagebreak';

/** Small procedural soundscape; all sources start only after a player's gesture. */
export class SeaAudio {
  private context:AudioContext|null=null;
  private master:GainNode|null=null;
  private ocean:GainNode|null=null;
  private wind:GainNode|null=null;
  private engine:GainNode|null=null;
  private engineOsc:OscillatorNode|null=null;
  private engineOvertone:OscillatorNode|null=null;
  private lowpass:BiquadFilterNode|null=null;
  private drone:GainNode|null=null;
  private buffers:AudioBuffer[]=[];
  private sources:AudioScheduledSourceNode[]=[];
  private muted=false;
  private depth=0;
  private lastThreat=0;
  private lastPulse=0;

  async start() {
    if(this.context) {if(this.context.state==='suspended') await this.context.resume();return;}
    const AudioClass=window.AudioContext || (window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;
    if(!AudioClass) return;
    const c=this.context=new AudioClass();
    this.master=c.createGain();this.master.gain.value=this.muted?0:.6;this.master.connect(c.destination);
    this.lowpass=c.createBiquadFilter();this.lowpass.type='lowpass';this.lowpass.frequency.value=12000;this.lowpass.Q.value=.35;this.lowpass.connect(this.master);
    // Two uncorrelated looping noise beds: filtered surf and high open-water wind.
    this.buffers=[this.noiseBuffer(8),this.noiseBuffer(5)];
    this.ocean=this.noiseLoop(this.buffers[0],320,.21,'lowpass');
    this.wind=this.noiseLoop(this.buffers[1],700,.055,'highpass');
    this.engine=c.createGain();this.engine.gain.value=.014;this.engine.connect(this.lowpass);
    this.engineOsc=this.oscillator('triangle',36,this.engine);
    this.engineOvertone=this.oscillator('sine',74,this.engine);
    this.drone=c.createGain();this.drone.gain.value=0;this.drone.connect(this.lowpass);
    this.oscillator('sine',49,this.drone);this.oscillator('sine',51.6,this.drone);
    await c.resume();
  }

  private noiseBuffer(seconds:number) {
    const c=this.context!,b=c.createBuffer(1,c.sampleRate*seconds,c.sampleRate),d=b.getChannelData(0);
    let a=0;for(let i=0;i<d.length;i++){const white=Math.random()*2-1;a=(a+.02*white)/1.02;d[i]=a*3.5+white*.22;}
    return b;
  }
  private noiseLoop(buffer:AudioBuffer,frequency:number,gain:number,type:BiquadFilterType) {
    const c=this.context!,source=c.createBufferSource(),filter=c.createBiquadFilter(),amp=c.createGain();
    source.buffer=buffer;source.loop=true;filter.type=type;filter.frequency.value=frequency;filter.Q.value=.3;amp.gain.value=gain;
    source.connect(filter);filter.connect(amp);amp.connect(this.lowpass!);source.start();this.sources.push(source);return amp;
  }
  private oscillator(type:OscillatorType,frequency:number,destination:AudioNode) {
    const osc=this.context!.createOscillator();osc.type=type;osc.frequency.value=frequency;osc.connect(destination);osc.start();this.sources.push(osc);return osc;
  }

  update(speed:number,depth:number,threat:number) {
    this.depth=depth;this.lastThreat=threat;
    const c=this.context;if(!c||!this.lowpass||!this.master||!this.ocean||!this.wind||!this.engine||!this.drone) return;
    const t=c.currentTime,dive=Math.min(1,depth/3),velocity=Math.min(1,Math.abs(speed)/12);
    this.lowpass.frequency.setTargetAtTime(12000*(1-dive)+720*dive,t,.22);
    this.ocean.gain.setTargetAtTime((.19+.025*Math.sin(t*.36))*(1-.62*dive),t,.15);
    this.wind.gain.setTargetAtTime((.028+velocity*.032)*(1-.94*dive),t,.3);
    this.engine.gain.setTargetAtTime((.008+velocity*.035)*(1-.88*dive),t,.3);
    this.engineOsc?.frequency.setTargetAtTime(30+velocity*46,t,.3);
    this.engineOvertone?.frequency.setTargetAtTime(61+velocity*95,t,.3);
    this.drone.gain.setTargetAtTime(dive*(.016+Math.min(1,threat)*.015),t,.7);
    if(dive>.7&&threat>.55&&t-this.lastPulse>2.3-threshold(threat)) {
      this.lastPulse=t;this.tone(48,34,.21,.044);this.tone(41,30,.14,.028,.22);
    }
  }

  play(kind:SeaSound) {
    if(!this.context) return;
    switch(kind) {
      case 'chop': this.burst(.16,950,.22,180);this.tone(160,73,.13,.075);break;
      case 'timber': this.burst(1.8,700,.18,110);this.burst(.6,170,.3,60,1.2);break;
      case 'repair': this.tone(260,100,.08,.08);this.burst(.12,1700,.10,400);break;
      case 'cagebreak': this.burst(1.5,1700,.35,90);this.tone(730,85,.8,.11);this.tone(213,36,1.1,.12,.1);break;
      case 'splash': this.burst(.65,500,.2,1800);break;
      case 'breach': this.burst(1.6,350,.39,4300);this.tone(76,29,.62,.13);break;
      case 'shot': this.burst(.14,2100,.25,430);this.tone(210,55,.17,.16);this.burst(.55,150,.07,580,.12);break;
      case 'knife': this.burst(.2,620,.15,2300);break;
      case 'hit': this.burst(.25,380,.23,160);this.tone(109,38,.2,.095);break;
      case 'impact': this.burst(.8,480,.28,130);this.tone(88,30,.52,.19);this.tone(440,80,.29,.055,.03);break;
      case 'enter': this.burst(.8,1600,.19,90);this.tone(118,42,.6,.06);break;
      case 'engine': this.tone(35,72,.8,.1);break;
      case 'win': for(let i=0;i<4;i++) {const notes=[196,246.94,293.66,392];this.tone(notes[i],notes[i],1.8,.055,i*.22);}break;
    }
  }
  private burst(duration:number,frequency:number,volume:number,endFrequency:number,delay=0) {
    const c=this.context!,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime+delay;
    s.buffer=this.buffers[0];s.playbackRate.value=.8+Math.random()*.45;f.type='bandpass';f.Q.value=.55;
    f.frequency.setValueAtTime(frequency,t);f.frequency.exponentialRampToValueAtTime(Math.max(20,endFrequency),t+duration);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.014);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    s.connect(f);f.connect(g);g.connect(this.lowpass!);s.start(t,Math.random()*2);s.stop(t+duration+.05);
    s.onended=()=>{s.disconnect();f.disconnect();g.disconnect();};
  }
  private tone(from:number,to:number,duration:number,volume:number,delay=0) {
    const c=this.context!,o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type='sine';
    o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(to,t+duration);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    o.connect(g);g.connect(this.lowpass!);o.start(t);o.stop(t+duration+.04);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  setMuted(value:boolean) {this.muted=value;if(this.context&&this.master)this.master.gain.setTargetAtTime(value?0:.6,this.context.currentTime,.1);}
  dispose() {for(const s of this.sources){try{s.stop();}catch{/* already stopped */}s.disconnect();}this.sources=[];void this.context?.close();this.context=null;}
}
const threshold=(v:number)=>Math.max(0,Math.min(1,v));
