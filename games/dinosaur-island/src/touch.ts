import type {DinosaurController} from './controller';

export function bindTouchControls(pad:HTMLElement,getController:()=>DinosaurController|undefined){
  const active=new Map<number,string>();let running=false;
  const run=pad.querySelector<HTMLButtonElement>('[data-run]')!;
  function apply(){const keys=new Set(active.values());getController()?.setTouchMovement(Number(keys.has('right'))-Number(keys.has('left')),Number(keys.has('forward'))-Number(keys.has('back')),running);}
  const reset=()=>{active.clear();running=false;run.setAttribute('aria-pressed','false');pad.querySelectorAll('button').forEach(b=>b.classList.remove('pressed'));getController()?.setTouchMovement(0,0);};
  run.onclick=()=>{if(!getController()?.isEnabled)return;running=!running;run.setAttribute('aria-pressed',String(running));apply();};
  for(const button of pad.querySelectorAll<HTMLButtonElement>('[data-direction]')){
    button.addEventListener('pointerdown',event=>{if(!getController()?.isEnabled)return;event.preventDefault();button.setPointerCapture(event.pointerId);active.set(event.pointerId,button.dataset.direction!);button.classList.add('pressed');apply();});
    const release=(event:PointerEvent)=>{active.delete(event.pointerId);button.classList.toggle('pressed',[...active.values()].includes(button.dataset.direction!));apply();};
    button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
  }
  window.addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  return {reset};
}
