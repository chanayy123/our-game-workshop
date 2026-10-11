export class Sound {
  context:AudioContext|null=null;master:GainNode|null=null;filter:BiquadFilterNode|null=null;muted=false;
  init(){
    if(this.context){void this.context.resume();return;}
    this.context=new AudioContext();this.master=this.context.createGain();this.master.gain.value=this.muted?0:.24;this.filter=this.context.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=14000;this.master.connect(this.filter).connect(this.context.destination);
    const buffer=this.context.createBuffer(1,this.context.sampleRate*4,this.context.sampleRate);const data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.03)/1.03;data[i]=last;}
    const src=this.context.createBufferSource();src.buffer=buffer;src.loop=true;const filter=this.context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=600;const gain=this.context.createGain();gain.gain.value=.45;src.connect(filter).connect(gain).connect(this.master);src.start();
  }
  mute(){this.muted=!this.muted;if(this.master)this.master.gain.value=this.muted?0:.24;return this.muted;}
  environment(under:number,buried:boolean){if(this.filter&&this.context)this.filter.frequency.setTargetAtTime(buried?520:14000*(1-under)+700*under,this.context.currentTime,.1);}
  play(name:string){
    if(!this.context||!this.master||this.muted)return;
    const configs:Record<string,number[]>={bite:[150,50,.12],eat:[420,710,.18],sand:[100,50,.28],dive:[380,90,.4],hurt:[90,40,.3],hit:[240,70,.15],warn:[240,390,.2],alarm:[660,940,.25],siren:[510,810,.6],relic:[600,1200,.65],win:[550,1100,.9],lost:[200,45,.7],shield:[160,170,.22]};const [from,to,duration]=configs[name]||configs.bite;
    const osc=this.context.createOscillator();const gain=this.context.createGain();const now=this.context.currentTime;osc.type=name==='hurt'?'sawtooth':'sine';osc.frequency.setValueAtTime(from,now);osc.frequency.exponentialRampToValueAtTime(to,now+duration);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.5,now+.015);gain.gain.exponentialRampToValueAtTime(.001,now+duration);osc.connect(gain).connect(this.master);osc.start();osc.stop(now+duration+.01);
  }
}
