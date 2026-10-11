import './touch.css';

const resets = new Set<() => void>();
export const touchCapable = () => navigator.maxTouchPoints > 0 || matchMedia('(any-pointer: coarse)').matches;
export const isTouchControlsEnabled = () => document.body.dataset.touchControls === 'on';
export function resetTouchControls() { for (const reset of resets) reset(); }
export function registerTouchReset(reset: () => void) { resets.add(reset); }

/** Also works with a tablet's desktop website mode and an attached trackpad. */
export function installTouchControls() {
  const toggle = document.createElement('button');
  toggle.id = 'touch-controls-toggle'; toggle.type = 'button';
  let manual = false;
  const show = (enabled: boolean) => {
    resetTouchControls(); document.body.dataset.touchControls = enabled ? 'on' : 'off';
    toggle.textContent = enabled ? '触屏按钮：开' : '触屏按钮：关';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? '隐藏触屏按钮' : '显示触屏按钮');
  };
  toggle.onclick = () => { manual = true; show(!isTouchControlsEnabled()); };
  document.body.append(toggle); show(touchCapable());
  const taps = new Map<number, {button: HTMLButtonElement; x: number; y: number}>();
  const handled = new WeakMap<HTMLButtonElement, number>();
  registerTouchReset(() => taps.clear());
  document.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && !manual && !isTouchControlsEnabled()) show(true);
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (event.pointerType === 'touch' && button && !button.disabled && !button.hasAttribute('data-touch-hold')) {
      taps.set(event.pointerId, {button, x: event.clientX, y: event.clientY});
    }
  }, true);
  // Some touch browsers suppress compatibility clicks after a camera drag.
  // Run the existing button action on a genuine tap; suppress its later click.
  document.addEventListener('pointerup', event => {
    const tap = taps.get(event.pointerId); taps.delete(event.pointerId);
    if (!tap || tap.button.disabled || (event.target as Element).closest('button') !== tap.button || Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>12) return;
    handled.set(tap.button, performance.now()+750); tap.button.click(); event.preventDefault();
  }, true);
  document.addEventListener('pointercancel', event => taps.delete(event.pointerId), true);
  document.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (event.isTrusted && event.detail>0 && (event as PointerEvent).pointerType!=='mouse' && button && performance.now()<(handled.get(button)??0)) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  const media = matchMedia('(any-pointer: coarse)');
  media.addEventListener('change', () => { if (!manual) show(touchCapable()); });
  window.addEventListener('blur', resetTouchControls);
  window.addEventListener('pagehide', resetTouchControls);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetTouchControls(); });
}

/** Pointer IDs keep movement, sprint and look independent during multi-touch. */
export function bindHold(button: HTMLElement, change: (pressed: boolean) => void, enabled: () => boolean) {
  button.setAttribute('data-touch-hold','');
  const pointers = new Set<number>();
  const apply = () => { const held = pointers.size > 0; button.classList.toggle('touch-held', held); change(held); };
  const reset = () => { pointers.clear(); apply(); };
  registerTouchReset(reset);
  button.addEventListener('pointerdown', event => {
    if (!enabled() || (button instanceof HTMLButtonElement && button.disabled)) return;
    event.preventDefault(); pointers.add(event.pointerId); button.setPointerCapture(event.pointerId); apply();
  });
  const release = (event: PointerEvent) => { pointers.delete(event.pointerId); apply(); };
  button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
}

export function bindTouchKeys(buttons: Iterable<HTMLElement>, keys: Set<string>, keyFor: (button: HTMLElement) => string, enabled: () => boolean) {
  const held = new Map<HTMLElement, string>();
  for (const button of buttons) bindHold(button, down => {
    if (down) held.set(button, keyFor(button)); else held.delete(button);
    keys.clear(); for (const key of held.values()) keys.add(key);
  }, enabled);
}
