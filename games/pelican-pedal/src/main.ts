import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/fraunces/latin-500.css';
import '@fontsource/fraunces/latin-500-italic.css';
import { createIcons, Bike, ArrowUpRight, Volume2, VolumeX, Sun, Sunset, Moon, Pause, Play, RotateCcw, Camera, Maximize, Minimize, BellRing, X, ArrowRight, ArrowLeft, ArrowUp, Flag, Fish, Heart, Zap, Trophy, Shell, ShieldCheck } from 'lucide';
import './style.css';
import { CoastalRide, type Lighting } from './scene';
import { BicycleGame, STAGES, type GameEvent, type GamePhase } from './game';
import { RideAudio } from './sound';

const icon = (name: string) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header">
  <a class="brand" href="./" aria-label="Pelican Pedal Club home"><span class="brand-symbol">${icon('bike')}</span><span>PELICAN<span class="brand-sub">PEDAL CLUB</span></span></a>
  <div class="header-note"><span>✳</span> A TINY COASTAL ADVENTURE</div>
  <nav aria-label="Game tools"><button class="text-button" id="help">How to play ${icon('arrow-up-right')}</button><span class="divider"></span><button class="round-button" id="sound" aria-label="Enable sound" aria-pressed="false">${icon('volume-x')}</button></nav>
</header>
<main>
  <section class="ride-heading" aria-label="Route overview"><div><span class="eyebrow">THE COASTAL COLLECTION / 001</span><h1>The lighthouse <em>run.</em></h1></div><div class="route-meta"><span>${icon('flag')} 900 m of good times</span><span class="best-label">${icon('trophy')} PERSONAL BEST <strong id="best">0</strong></span></div></section>
  <section class="experience" id="experience" aria-label="Pelican bicycle game">
    <div class="scene-wash"></div><div id="scene" tabindex="0" role="application" aria-label="Ride Percy to the lighthouse. Left and right arrows steer, Space jumps, Shift boosts, P pauses." aria-describedby="control-description"></div>
    <div class="hud" aria-label="Ride status">
      <div class="score-card"><span class="micro-label">RIDE SCORE</span><div><output id="score">0000</output><span class="combo" id="combo">×1</span></div><span class="fish-count">${icon('fish')} <output id="fish-count">0</output> collected</span></div>
      <div class="stage-pill"><span class="live-dot"></span><span id="stage-label">01 / Palm promenade</span></div>
      <div class="ride-health"><div class="hearts" id="hearts" aria-label="3 lives remaining">${icon('heart')}${icon('heart')}${icon('heart')}</div><span class="shield-status" id="shield-status" hidden>${icon('shield-check')} Protected</span><button class="round-button" id="pause" aria-label="Pause ride" title="Pause (P / Esc)" disabled>${icon('pause')}</button></div>
    </div>
    <div class="launch-card" id="launch-card"><span class="eyebrow">MEET YOUR RIDING BUDDY</span><h2>Little wings.<br><em>Big adventure.</em></h2><p>Percy has a bicycle.<br>The lighthouse has his lunch.<br>Let’s make a little adventure of it.</p><div class="mission-list"><span>${icon('fish')} Follow the fish. Find your flow.</span><span>${icon('bike')} Dodge cones. Hop over driftwood.</span><span>${icon('flag')} Keep a heart. Reach the lighthouse.</span></div><button id="start" class="primary-button" disabled>Let’s ride ${icon('arrow-right')}</button><span class="launch-note">3 scenic stages · about 90 seconds</span></div>
    <div class="percy-tag" id="percy-tag"><span></span> Hey, I’m Percy! ${icon('bike')}</div>
    <div class="feedback" id="feedback" role="status" aria-live="polite"></div><div class="stage-announcement" id="stage-announcement" aria-live="polite"></div>
    <div class="game-overlay" id="game-overlay" hidden><div class="result-card"><span class="result-icon" id="result-icon">${icon('pause')}</span><span class="eyebrow" id="result-eyebrow">A LITTLE BREATHER</span><h2 id="result-title">Enjoy the <em>view.</em></h2><p id="result-description">Your adventure will be right here.</p><div class="result-stats" id="result-stats" hidden></div><button class="primary-button" id="continue">Keep pedaling ${icon('play')}</button><button class="secondary-button" id="restart">Start a fresh ride ${icon('rotate-ccw')}</button></div></div>
    <div class="scene-toolbar" aria-label="Scene tools"><button class="round-button" id="bell" aria-label="Ring Percy's bell" title="Say hello (B)">${icon('bell-ring')}</button><button class="round-button" id="capture" aria-label="Save a ride photo" title="Save a photo">${icon('camera')}</button><button class="round-button" id="fullscreen" aria-label="Enter fullscreen">${icon('maximize')}</button></div>
    <div class="speed-badge"><output id="speed">0</output><span>km/h</span><span id="boost-active" hidden>TAILWIND!</span></div><div class="lane-hint"><span data-lane="-1"></span><span data-lane="0" class="selected"></span><span data-lane="1"></span></div>
    <div class="scene-loading" id="loading"><span class="loading-wheel"></span> Packing a little sunshine…</div><div class="error-state" id="scene-error" hidden><h2>The coast is taking a break.</h2><p>Please enable WebGL 2 and hardware acceleration, then reload.</p><button class="primary-button" id="retry">Reload the coast</button></div>
  </section>
  <section class="journey" aria-label="Route progress"><span class="journey-start">${icon('bike')} THE COAST</span><div class="journey-track" role="progressbar" aria-label="Distance to the lighthouse" aria-valuemin="0" aria-valuemax="900" aria-valuenow="0"><span class="journey-fill" id="journey-fill"></span><span class="milestone first"></span><span class="milestone second"></span><span class="journey-rider" id="journey-rider">${icon('bike')}</span></div><span class="journey-finish">${icon('flag')} <output id="distance">0</output><span>/ 900 m</span></span></section>
  <section class="ride-console" aria-label="Game controls">
    <div class="control-group"><div class="control-heading">01 <strong>Find your lane</strong><span>A / D</span></div><div class="steer-buttons"><button id="left" aria-label="Steer left">${icon('arrow-left')}<span>Left</span></button><button id="right" aria-label="Steer right"><span>Right</span>${icon('arrow-right')}</button></div></div>
    <div class="control-group"><div class="control-heading">02 <strong>A little hop</strong><span>SPACE</span></div><button class="action-control" id="jump">${icon('arrow-up')}<span>Jump driftwood</span><span class="keycap">↑</span></button></div>
    <div class="control-group"><div class="control-heading">03 <strong>Catch the wind</strong><span>SHIFT</span></div><button class="action-control boost-button" id="boost" disabled>${icon('zap')}<span id="boost-label">Collect fish to charge</span><span id="boost-percent">0%</span><span class="boost-fill" id="boost-fill"></span></button></div>
    <div class="control-group light-group"><div class="control-heading"><strong>A change of light</strong><span>JUST FOR YOU</span></div><div class="segmented" role="group" aria-label="Lighting"><button data-light="day" class="active" aria-label="Daylight" aria-pressed="true">${icon('sun')}</button><button data-light="sunset" aria-label="Sunset" aria-pressed="false">${icon('sunset')}</button><button data-light="night" aria-label="Starlight" aria-pressed="false">${icon('moon')}</button></div></div>
  </section>
  <p class="control-description" id="control-description">Auto-pedal, you do the exploring. <span>← → / A D steer · Space / ↑ jump · Shift boost · P / Esc pause</span><span class="mobile-instructions">Tap the controls, or swipe the road to steer and jump.</span></p>
</main>
<footer><span>A little ride. A little joy.</span><span>THREE HEARTS. ONE HAPPY PLACE. <span>↗</span></span></footer>
<div class="toast" role="status" aria-live="polite" id="toast"></div>
<dialog id="info-dialog" aria-labelledby="dialog-title"><button class="dialog-close round-button" id="close-dialog" aria-label="Close help">${icon('x')}</button><span class="eyebrow">A FIELD GUIDE TO GOOD TIMES</span><h2 id="dialog-title">Find your <em>flow.</em></h2><p>Get Percy to the lighthouse, 900 metres along the coast. He pedals automatically; you choose the lane and time the jumps.</p><div class="help-list"><div>${icon('fish')}<span><strong>Fish are your fuel</strong>Build a streak for up to ×4 points. Eight fish charge a four-second boost. A crash breaks your streak.</span></div><div>${icon('bike')}<span><strong>Pick your path</strong>Steer around orange cones. Jump over driftwood or take a clear lane. A hit costs one of your three hearts. Boost makes you faster, so keep dodging!</span></div><div>${icon('shell')}<span><strong>A little protection</strong>Glowing shells protect you from one collision. After a hit, you have a moment to recover.</span></div></div><div class="shortcut-list"><span>Steer <kbd>← → / A D</kbd></span><span>Jump <kbd>Space / ↑ / W</kbd></span><span>Boost <kbd>Shift</kbd></span><span>Pause / resume <kbd>P / Esc</kbd></span><span>Bell <kbd>B</kbd></span></div><p class="help-footnote">Touch: buttons or swipe left / right to steer, up to jump, down to boost. The route gets quicker at 300 m and 600 m. Your best score is saved on this device when storage is available.</p></dialog>`;

document.querySelector('.score-card')!.insertAdjacentHTML('beforeend', `<div class="flow-track"><span id="flow-fill"></span></div><span class="flow-label" id="flow-label">FIND YOUR FLOW</span>`);
document.querySelector('.hud')!.insertAdjacentHTML('afterend', `<div class="ride-details"><span class="pearl-counter"><span class="pearl-dot">◈</span> <output id="pearl-count">0</output><small>SKY PEARLS</small></span><span class="ride-clock"><output id="ride-time">0:00.0</output><small>RIDE TIME</small></span></div><div class="gold-goal"><span>${icon('trophy')} THE GOLD POSTCARD</span><div><span id="gold-pearl">0/5 pearls</span><span id="gold-score">0/18k points</span><span id="gold-heart">2+ hearts</span></div></div><div class="ride-tip" id="ride-tip"></div><div class="countdown" id="countdown" hidden><span>THE COAST IS CALLING</span><strong id="countdown-number">3</strong><small>← → steer · SPACE jump · S brake</small></div>`);
document.querySelector('#result-stats')!.insertAdjacentHTML('afterend', '<div id="result-goals" class="result-goals" hidden></div>');
document.querySelector('#launch-card')!.innerHTML = `<span class="eyebrow">A 900-METRE COASTAL CHALLENGE</span><h2>Little wings.<br><em>Brave little jumps.</em></h2><p>Lunch is waiting at the lighthouse.<br>Take the easy lane, or spread your wings<br>and bring home a little gold.</p><div class="mission-list"><span>${icon('fish')} Follow golden fish to keep your flow.</span><span><b class="pearl-dot">◈</b> Jump logs for precious sky pearls.</span><span>${icon('zap')} Boost for speed & double pickup points.</span></div><button id="start" class="primary-button" disabled>Let’s ride ${icon('arrow-right')}</button><span class="launch-note">3 hearts · 3 coastlines · one gold postcard</span>`;
document.querySelector('.control-description')!.innerHTML = `A little skill. A little sea air.<span>← → / A D steer · Space jump · S / ↓ brake · Shift boost · P pause</span><span class="mobile-instructions">Swipe to steer · swipe up to jump · hold Brake to slow down</span>`;
document.querySelector('.control-group:nth-child(2)')!.insertAdjacentHTML('beforeend', `<button id="brake" class="brake-button" aria-label="Hold to brake" aria-pressed="false">Hold to brake <kbd>S / ↓</kbd></button>`);
document.querySelector('.help-list')!.innerHTML = `<div>${icon('fish')}<span><strong>Follow the fish, keep your flow</strong>Catch again within six seconds to keep your streak. Every five catches increases your multiplier, up to ×4. A crash breaks your flow.</span></div><div><b class="pearl-dot">◈</b><span><strong>Choose your own courage</strong>Golden fish show the safe route. Turquoise sky pearls float over logs: jump through them for 350 × your multiplier. Orange cones are too tall to jump. There is always a safe alternative.</span></div><div>${icon('zap')}<span><strong>Spend your tailwind wisely</strong>Eight fish charge a four-second boost. During boost, catches and clean jumps earn double points. Hold S / ↓ or Brake to slow down when the coast gets crowded.</span></div><div>${icon('trophy')}<span><strong>Bring home the gold postcard</strong>Finish with 5 sky pearls, 18,000 points and at least 2 hearts. Finish bonus rewards speed and remaining hearts. A shell absorbs one crash.</span></div>`;
document.querySelector('.shortcut-list')!.insertAdjacentHTML('beforeend', '<span>Brake (hold)<kbd>S / ↓</kbd></span>');
document.querySelector('.help-footnote')!.textContent = 'Touch: buttons or swipe left / right to steer, up to jump, down to boost. Hold Brake to slow down. The fixed route rewards practice. Your score and fastest finish are saved on this device.';
document.querySelector('.launch-note')!.insertAdjacentHTML('afterend', '<span class="sound-note" id="sound-note">Sound starts with your ride · M to mute</span>');
document.querySelector('#sound')!.innerHTML = icon('volume-2');
document.querySelector('#sound')!.setAttribute('aria-label', 'Mute sound for this ride (M)');
document.querySelector('#sound')!.setAttribute('aria-pressed', 'true');
document.querySelector('.shortcut-list')!.insertAdjacentHTML('beforeend', '<span>Sound on / off<kbd>M</kbd></span>');
function refreshIcons() { createIcons({ icons: { Bike, ArrowUpRight, Volume2, VolumeX, Sun, Sunset, Moon, Pause, Play, RotateCcw, Camera, Maximize, Minimize, BellRing, X, ArrowRight, ArrowLeft, ArrowUp, Flag, Fish, Heart, Zap, Trophy, Shell, ShieldCheck }, attrs: { 'stroke-width': 1.7 } }); }
refreshIcons();
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const sound = new RideAudio();
let soundChosen = false;
let ride: CoastalRide | undefined;
// Records are versioned because the scoring rules changed with the pearl route.
let best = 0;
let bestTime = 0;
try {
  const saved = Number(localStorage.getItem('pelican-pedal-best-v2'));
  const time = Number(localStorage.getItem('pelican-pedal-time-v2'));
  best = Number.isFinite(saved) ? Math.max(0, saved) : 0;
  bestTime = Number.isFinite(time) ? Math.max(0, time) : 0;
} catch { /* Storage is optional. */ }
$('#best').textContent = best.toLocaleString();
let previousPhase: GamePhase | undefined;
let feedbackTimer: ReturnType<typeof setTimeout>, stageTimer: ReturnType<typeof setTimeout>, toastTimer: ReturnType<typeof setTimeout>, hitTimer: ReturnType<typeof setTimeout>;
let uiElapsed = 0, newBest = false;
let countdown = 0;
let lesson = -1;
let heldDirection: -1 | 0 | 1 = 0;
let steerRepeat = 0;
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}.${Math.floor(seconds * 10) % 10}`;
function toast(message: string) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2800); }
function feedback(message: string, kind = '') { $('#feedback').textContent = message; $('#feedback').className = `feedback visible ${kind}`; clearTimeout(feedbackTimer); feedbackTimer = setTimeout(() => $('#feedback').classList.remove('visible'), 1100); }
function announce(message: string) { $('#stage-announcement').textContent = message; $('#stage-announcement').classList.add('visible'); clearTimeout(stageTimer); stageTimer = setTimeout(() => $('#stage-announcement').classList.remove('visible'), 2500); }
function onGameEvent(event: GameEvent) {
  sound.effect(event.type, event.value);
  ride?.handleEvent(event);
  if (event.type === 'fish') feedback(`+${event.value ?? 100} · nice catch!`, 'catch');
  if (event.type === 'pearl') feedback(`Sky pearl! +${event.value}`, 'pearl');
  if (event.type === 'comboLost') feedback('Flow faded. Catch the next fish.');
  if (event.type === 'hit') { feedback(event.value === 0 ? 'Saved by the shell!' : 'Oof! Find a clear lane.', event.value === 0 ? 'catch' : 'ouch'); if (event.value !== 0) { $('#experience').classList.add('hit'); clearTimeout(hitTimer); hitTimer = setTimeout(() => $('#experience').classList.remove('hit'), 400); } }
  if (event.type === 'shell') feedback('Shell shield · one free save', 'catch');
  if (event.type === 'nearMiss') feedback(`Clean move! +${event.value ?? 25}`, 'catch');
  if (event.type === 'boost') feedback('Here comes the tailwind!', 'catch');
  if (event.type === 'stage') announce(`${String(game.state.stage + 1).padStart(2, '0')} / ${STAGES[game.state.stage].name}`);
  if (event.type === 'win' || event.type === 'lose') {
    newBest = game.state.score > best;
    if (newBest) best = game.state.score;
    if (event.type === 'win' && (!bestTime || game.state.elapsed < bestTime)) bestTime = game.state.elapsed;
    $('#best').textContent = best.toLocaleString();
    try {
      localStorage.setItem('pelican-pedal-best-v2', String(best));
      if (bestTime) localStorage.setItem('pelican-pedal-time-v2', String(bestTime));
    } catch { /* Storage is optional. */ }
    clearHeldControls();
  }
}
const game = new BicycleGame(onGameEvent);
const dialog = $<HTMLDialogElement>('#info-dialog');
const buttons = Object.fromEntries(['start','pause','left','right','jump','boost'].map(id => [id, $<HTMLButtonElement>(`#${id}`)]));
function updateUi(force = false) {
  const s = game.state;
  if (!force && uiElapsed < .075 && previousPhase === s.phase) return;
  uiElapsed = 0;
  $('#score').textContent = String(s.score).padStart(4, '0'); $('#fish-count').textContent = String(s.fish);
  $('#combo').textContent = `×${s.multiplier}`; $('#combo').classList.toggle('on', s.multiplier > 1);
  $('#flow-fill').style.width = `${s.comboRemaining / 6 * 100}%`;
  $('#flow-label').textContent = s.combo ? `${s.combo} CATCH FLOW` : 'FIND YOUR FLOW';
  $('#pearl-count').textContent = String(s.pearls);
  $('#ride-time').textContent = formatTime(s.elapsed);
  $('#gold-pearl').classList.toggle('complete', s.pearls >= 5);
  $('#gold-score').classList.toggle('complete', s.score >= 18000);
  $('#gold-heart').classList.toggle('complete', s.lives >= 2);
  $('#gold-pearl').textContent = `${Math.min(5, s.pearls)}/5 pearls`;
  $('#gold-score').textContent = `${Math.min(18, Math.floor(s.score / 1000))}/18k points`;
  $('#brake').classList.toggle('pressed', s.braking);
  $('#brake').setAttribute('aria-pressed', String(s.braking));
  $('#brake').toggleAttribute('disabled', s.phase !== 'running' || countdown > 0);
  $('#countdown').hidden = countdown <= 0;
  $('#countdown-number').textContent = String(Math.max(1, Math.ceil(countdown)));
  sound.setPace(s.phase === 'running' && countdown <= 0 ? s.speed * 3.6 : 0);
  sound.setStage(s.stage);
  $('#stage-label').textContent = `${String(s.stage + 1).padStart(2, '0')} / ${STAGES[s.stage].name}`;
  $('#distance').textContent = String(Math.floor(s.distance)); $('#speed').textContent = String(s.phase === 'running' && countdown <= 0 ? Math.round(s.speed * 3.6) : 0);
  const progress = Math.min(100, s.distance / s.totalDistance * 100);
  $('#journey-fill').style.width = `${progress}%`; $('#journey-rider').style.left = `${progress}%`;
  $('.journey-track').setAttribute('aria-valuenow', String(Math.floor(s.distance)));
  $('#hearts').setAttribute('aria-label', `${s.lives} lives remaining`); $('#hearts').querySelectorAll('svg').forEach((heart, i) => heart.classList.toggle('empty', i >= s.lives));
  const ongoingBoost = s.boostRemaining > 0 && (s.phase === 'running' || s.phase === 'paused');
  $('#shield-status').hidden = !s.shield; $('#boost-active').hidden = !ongoingBoost || s.phase === 'paused';
  document.body.classList.toggle('boosting', ongoingBoost); $('#boost-fill').style.width = `${s.boostCharge}%`;
  $('#boost-percent').textContent = ongoingBoost ? `${s.boostRemaining.toFixed(1)}s` : `${Math.floor(s.boostCharge)}%`;
  $('#boost-label').textContent = ongoingBoost ? s.phase === 'paused' ? 'Tailwind paused' : 'Riding the tailwind' : s.boostCharge >= 100 ? 'Let it fly!' : 'Collect fish to charge';
  buttons.boost.disabled = s.phase !== 'running' || s.boostCharge < 100 || s.boostRemaining > 0; buttons.boost.classList.toggle('charged', s.boostCharge >= 100);
  for (const id of ['left','right','jump']) buttons[id].disabled = s.phase !== 'running' || countdown > 0;
  buttons.jump.classList.toggle('recharging', s.jumpCooldown > .15);
  buttons.pause.disabled = !['running','paused'].includes(s.phase);
  document.querySelectorAll<HTMLElement>('[data-lane]').forEach(el => el.classList.toggle('selected', Number(el.dataset.lane) === s.lane));
  if (s.phase === previousPhase) return;
  const oldPhase = previousPhase; previousPhase = s.phase; document.body.dataset.phase = s.phase;
  $('#launch-card').hidden = s.phase !== 'ready'; $('#percy-tag').hidden = s.phase !== 'ready'; $('#game-overlay').hidden = !['paused','won','lost'].includes(s.phase);
  buttons.pause.innerHTML = icon(s.phase === 'paused' ? 'play' : 'pause'); buttons.pause.setAttribute('aria-label', s.phase === 'paused' ? 'Resume ride' : 'Pause ride');
  if (s.phase === 'paused') {
    $('#result-icon').innerHTML = icon('pause'); $('#result-eyebrow').textContent = 'A LITTLE BREATHER'; $('#result-title').innerHTML = 'Enjoy the <em>view.</em>'; $('#result-description').textContent = 'Your adventure will be right here.';
    $('#result-stats').hidden = true; $('#result-goals').hidden = true; $('#continue').innerHTML = `Keep pedaling ${icon('play')}`;
  } else if (s.phase === 'won' || s.phase === 'lost') {
    const won = s.phase === 'won'; $('#result-icon').innerHTML = icon(won ? 'trophy' : 'heart');
    $('#result-eyebrow').textContent = newBest ? 'A NEW PERSONAL BEST!' : won ? 'POSTCARD FROM THE FINISH LINE' : 'EVERY RIDE IS A LITTLE PRACTICE';
    $('#result-title').innerHTML = won ? `${s.medal === 'gold' ? 'Pure' : s.medal === 'silver' ? 'Lovely' : 'Hello,'} <em>${s.medal === 'gold' ? 'coastal gold.' : s.medal === 'silver' ? 'silver lining.' : 'lighthouse.'}</em>` : 'One more <em>little ride?</em>';
    $('#result-description').textContent = won ? `${s.medal.toUpperCase()} MEDAL · ${s.finishBonus.toLocaleString()} finish bonus · best time ${formatTime(bestTime)}` : `You made it ${Math.floor(s.distance)} m. Hold S to slow down and find your next opening.`;
    $('#result-stats').hidden = false;
    $('#result-stats').innerHTML = `<div><strong>${s.score.toLocaleString()}</strong><span>POINTS</span></div><div><strong>${formatTime(s.elapsed)}</strong><span>RIDE TIME</span></div><div><strong>${s.pearls}</strong><span>SKY PEARLS</span></div><div><strong>${s.fish}</strong><span>FISH CAUGHT</span></div><div><strong>${s.maxCombo}</strong><span>BEST FLOW</span></div><div><strong>${s.jumpsCleared}</strong><span>CLEAN JUMPS</span></div>`;
    $('#result-goals').hidden = false;
    $('#result-goals').innerHTML = `<span class="micro-label">${won && s.medal === 'gold' ? 'YOUR NEXT ADVENTURE' : 'THE GOLD POSTCARD'}</span>${won && s.medal === 'gold' ? '<p>Gold is yours. Beat your time, or try a perfect three-heart ride.</p>' : `<div class="goal-checks"><span class="${s.pearls >= 5 ? 'complete' : ''}">${s.pearls >= 5 ? '✓' : '○'} 5 sky pearls</span><span class="${s.score >= 18000 ? 'complete' : ''}">${s.score >= 18000 ? '✓' : '○'} 18,000 points</span><span class="${s.lives >= 2 ? 'complete' : ''}">${s.lives >= 2 ? '✓' : '○'} Finish with 2 hearts</span></div><p>${s.pearls < 5 ? 'Jump through turquoise pearls above logs. The safe lane is always there.' : s.score < 18000 ? 'Use your tailwind near fish and pearls: pickups score double during boost.' : 'Brake before crowded sections. A shell will protect your flow.'}</p>`}`;
    $('#continue').innerHTML = `Chase ${won && s.medal === 'gold' ? 'a new best' : 'the gold'} ${icon('rotate-ccw')}`;
  }
  $('#restart').hidden = s.phase !== 'paused'; refreshIcons();
  if (s.phase === 'running' && oldPhase !== undefined) $('#scene').focus({ preventScroll: true });
  if (['paused','won','lost'].includes(s.phase) && !dialog.open) $('#continue').focus({ preventScroll: true });
}
function clearHeldControls() { heldDirection = 0; steerRepeat = 0; game.setBraking(false); swipe = undefined; }
function startRide() { if (!ride) return; if (!soundChosen) { soundChosen = true; void toggleSound(); } clearTimeout(feedbackTimer); clearTimeout(stageTimer); clearHeldControls(); $('#feedback').classList.remove('visible'); $('#stage-announcement').classList.remove('visible'); $('#ride-tip').classList.remove('visible'); newBest = false; countdown = 2.7; lesson = -1; game.restart(); ride.setGameState(game.state); updateUi(true); }
function pauseRide() { countdown = 0; clearHeldControls(); game.togglePause(); updateUi(true); }
buttons.start.addEventListener('click', startRide); buttons.pause.addEventListener('click', pauseRide);
$('#continue').addEventListener('click', () => { if (game.state.phase === 'paused') pauseRide(); else startRide(); }); $('#restart').addEventListener('click', startRide);
buttons.left.addEventListener('click', () => { if (!countdown) game.steer(-1); updateUi(true); }); buttons.right.addEventListener('click', () => { if (!countdown) game.steer(1); updateUi(true); });
buttons.jump.addEventListener('click', () => { if (!countdown) game.jump(); }); buttons.boost.addEventListener('click', () => { if (!countdown) game.boost(); });
$('#brake').addEventListener('pointerdown', event => { event.preventDefault(); if (countdown) return; $('#brake').setPointerCapture(event.pointerId); game.setBraking(true); updateUi(true); });
for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) $('#brake').addEventListener(event, () => { game.setBraking(false); updateUi(true); });
$('#brake').addEventListener('keydown', event => { if (event.code === 'Space' || event.code === 'Enter') { event.preventDefault(); event.stopPropagation(); if (!countdown) game.setBraking(true); updateUi(true); } });
$('#brake').addEventListener('keyup', event => { if (event.code === 'Space' || event.code === 'Enter') { event.preventDefault(); game.setBraking(false); updateUi(true); } });
$('#brake').addEventListener('blur', () => game.setBraking(false));
document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach(button => button.addEventListener('click', () => { const lighting = button.dataset.light as Lighting; ride?.setLighting(lighting); document.body.dataset.lighting = lighting; sound.setNight(lighting === 'night'); document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach(el => { const active = el === button; el.classList.toggle('active', active); el.setAttribute('aria-pressed', String(active)); }); }));
async function toggleSound() {
  if (!soundChosen && game.state.phase === 'ready') {
    soundChosen = true;
    $('#sound').innerHTML = icon('volume-x'); $('#sound').setAttribute('aria-pressed', 'false');
    $('#sound').setAttribute('aria-label', 'Enable sound (M)');
    $('#sound-note').textContent = 'Quiet ride selected · M for sound'; refreshIcons(); return;
  }
  soundChosen = true;
  try {
    const enabled = await sound.toggle();
    $('#sound').innerHTML = icon(enabled ? 'volume-2' : 'volume-x');
    $('#sound').setAttribute('aria-pressed', String(enabled));
    $('#sound').setAttribute('aria-label', enabled ? 'Mute sound (M)' : 'Enable sound (M)');
    $('#sound-note').textContent = enabled ? 'Sea air & a little melody · M to mute' : 'Quiet ride selected · M for sound';
    refreshIcons();
  } catch { toast('Sound could not start. Try the sound button again.'); }
}
$('#sound').addEventListener('click', () => void toggleSound());
async function ringBell() { ride?.greet(); try { await sound.bell(); } catch { /* Audio is optional. */ } }
$('#bell').addEventListener('click', () => void ringBell());
$('#capture').addEventListener('click', () => { if (!ride) return; try { const a = document.createElement('a'); a.download = `percy-lighthouse-${Date.now()}.png`; a.href = ride.capture(); a.click(); toast('A little postcard, saved.'); } catch { toast('The photo could not be saved. Please try again.'); } });
$('#fullscreen').addEventListener('click', async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { toast('Use your browser’s fullscreen option to spread your wings.'); } });
document.addEventListener('fullscreenchange', () => { $('#fullscreen').innerHTML = icon(document.fullscreenElement ? 'minimize' : 'maximize'); $('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'); refreshIcons(); });
function showHelp() { if (game.state.phase === 'running') { countdown = 0; clearHeldControls(); game.pause(); updateUi(true); } dialog.showModal(); }
$('#help').addEventListener('click', showHelp); $('#close-dialog').addEventListener('click', () => dialog.close());
document.addEventListener('keydown', event => {
  if (dialog.open || event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test((event.target as HTMLElement).tagName)) return;
  if ((event.code === 'Space' || event.code === 'Enter') && (event.target as HTMLElement).closest('button, a')) return;
  const key = event.key.toLowerCase(); if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','ShiftLeft','ShiftRight','Escape'].includes(event.code)) event.preventDefault(); if (event.repeat) return;
  if (key === '?') { showHelp(); return; } if (key === 'm') { void toggleSound(); return; } if (key === 'b') { void ringBell(); return; } if (key === 'p' || event.code === 'Escape') { pauseRide(); return; }
  if (game.state.phase !== 'running') { if ((event.code === 'Space' || event.code === 'Enter') && game.state.phase === 'ready') startRide(); return; }
  if (countdown) return;
  if (key === 'a' || event.code === 'ArrowLeft') { game.steer(-1); heldDirection = -1; steerRepeat = .28; }
  if (key === 'd' || event.code === 'ArrowRight') { game.steer(1); heldDirection = 1; steerRepeat = .28; }
  if (key === 's' || event.code === 'ArrowDown') game.setBraking(true);
  if (key === 'w' || event.code === 'ArrowUp' || event.code === 'Space') game.jump(); if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') game.boost(); updateUi(true);
});
document.addEventListener('keyup', event => {
  if (['KeyA','KeyD','ArrowLeft','ArrowRight'].includes(event.code)) heldDirection = 0;
  if (['KeyS','ArrowDown'].includes(event.code)) game.setBraking(false);
});
let swipe: { x: number; y: number; id: number } | undefined;
$('#scene').addEventListener('pointerdown', event => { if (event.pointerType === 'mouse') return; swipe = { x: event.clientX, y: event.clientY, id: event.pointerId }; $('#scene').setPointerCapture(event.pointerId); });
$('#scene').addEventListener('pointerup', event => { if (!swipe || swipe.id !== event.pointerId) return; const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y; swipe = undefined; if (countdown || Math.max(Math.abs(dx), Math.abs(dy)) < 22) return; if (Math.abs(dx) > Math.abs(dy)) game.steer(dx > 0 ? 1 : -1); else if (dy < 0) game.jump(); else game.boost(); updateUi(true); });
$('#scene').addEventListener('pointercancel', () => { swipe = undefined; }); $('#retry').addEventListener('click', () => location.reload());
// Pointer users return to riding after a tool; keyboard users keep native button focus.
document.addEventListener('click', event => {
  if (event.detail > 0 && game.state.phase === 'running' && (event.target as Element).closest('.ride-console button, .scene-toolbar button, #sound')) $('#scene').focus({ preventScroll: true });
});
function frame(dt: number) {
  if (game.state.phase === 'running') {
    if (countdown > 0) countdown = Math.max(0, countdown - dt);
    else {
      if (heldDirection) { steerRepeat -= dt; if (steerRepeat <= 0) { game.steer(heldDirection); steerRepeat = .2; } }
      game.update(dt);
      const nextLesson = game.state.distance < 45 ? 0 : game.state.distance < 100 ? 1 : game.state.distance < 155 ? 2 : game.state.distance < 205 ? 3 : 4;
      if (nextLesson !== lesson) {
        lesson = nextLesson;
        $('#ride-tip').textContent = ['← →  Follow the golden fish. Your first catch is straight ahead.', 'SPACE  Turquoise pearls sit above logs. Jump, or choose the safe lane.', 'SHIFT  A full tailwind doubles pickup points. Pick your moment.', 'S / ↓  Hold to brake. Leave yourself room to choose.', ''][lesson];
        $('#ride-tip').classList.toggle('visible', lesson < 4);
      }
    }
  }
  const active = game.state.phase === 'running' && countdown <= 0;
  sound.setMotion(active && game.state.braking, active && game.state.boostRemaining > 0, active && game.state.jumpHeight > .03);
  ride?.setGameState(countdown > 0 ? { ...game.state, speed: 0 } : game.state); uiElapsed += dt; updateUi();
}
try { ride = new CoastalRide($('#scene'), frame); ride.setGameState(game.state); buttons.start.disabled = false; $('#loading').hidden = true; updateUi(true); }
catch (error) { console.error('Unable to create the coastal game:', error); $('#loading').hidden = true; $('#scene-error').hidden = false; }
function suspendGame() { clearHeldControls(); countdown = 0; if (game.state.phase === 'running') { game.pause(); updateUi(true); } }
document.addEventListener('visibilitychange', () => { sound.setVisible(!document.hidden); if (document.hidden) suspendGame(); }); window.addEventListener('blur', suspendGame);
$('#scene').addEventListener('webglcontextlost', suspendGame, true);
window.addEventListener('pagehide', event => { suspendGame(); if (!event.persisted) { ride?.dispose(); sound.dispose(); } });
// Explicit opt-in, read-only observability for real-input integration and soak tests.
if (new URLSearchParams(location.search).has('qa')) {
  Object.defineProperty(window, '__pelicanQA', { value: Object.freeze({
    snapshot: () => ({ ...structuredClone(game.state), countdown, best, bestTime, render: ride?.diagnostics() }),
  }), configurable: true });
}
