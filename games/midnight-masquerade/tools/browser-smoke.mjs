import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const base = process.env.GAME_URL || 'http://127.0.0.1:5184/?qa=1';
const qa = resolve('qa');
const software = process.env.QA_SOFTWARE_RENDERING === '1';
async function sourceHashes() {
  const paths = ['src/main.ts', 'src/simulation.ts', 'src/hider.ts', 'src/types.ts', 'src/navigation.ts', 'src/map.ts', 'src/world.ts', 'src/audio.ts', 'src/style.css', 'index.html'];
  return Object.fromEntries(await Promise.all(paths.map(async path => [path, createHash('sha256').update(await readFile(path)).digest('hex')])));
}
await mkdir(qa, { recursive: true });
const report = {
  startedAt: new Date().toISOString(), url: base,
  scope: 'Isolated headless Chrome. Real clicks and held keyboard input cover controls; explicitly labelled QA state setups and accelerated simulation cover long and terminal cases. Accelerated ticks are not real-time play.',
  browserMode: software ? 'Explicit software rendering fallback requested with QA_SOFTWARE_RENDERING=1.' : 'Default headless Chrome renderer; no forced software backend.',
  sourceAtStart: await sourceHashes(),
  checks: [], errors: [], consoleWarnings: [], requests: [], httpFailures: [], screenshots: [], performance: {},
};
const browser = await chromium.launch({
  channel: 'chrome', headless: true,
  args: ['--enable-webgl', '--ignore-gpu-blocklist', ...(software ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : [])],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on('pageerror', error => report.errors.push({ type: 'pageerror', text: error.message }));
page.on('console', message => {
  if (message.type() === 'error') report.errors.push({ type: 'console', text: message.text(), location: message.location() });
  if (message.type() === 'warning') report.consoleWarnings.push(message.text());
});
page.on('requestfailed', request => report.errors.push({ type: 'requestfailed', url: request.url(), text: request.failure()?.errorText }));
page.on('response', response => { if (response.status() >= 400) report.httpFailures.push({ url: response.url(), status: response.status() }); });
page.on('request', request => { if (!request.url().startsWith(base.split('/?')[0])) report.requests.push(request.url()); });
const snapshot = () => page.evaluate(() => window.__game.snapshot());
async function shot(name) {
  const filename = `auto-${name}.png`;
  await page.screenshot({ path: resolve(qa, filename), fullPage: true });
  report.screenshots.push(filename);
}
async function check(name, method, work) {
  const started = performance.now();
  try {
    const details = await work();
    report.checks.push({ name, method, status: 'passed', durationMs: Math.round(performance.now() - started), details });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.checks.push({ name, method, status: 'failed', durationMs: Math.round(performance.now() - started), error: error.stack });
    console.error(`FAIL ${name}: ${error.message}`);
    await shot(`failure-${report.checks.length}`).catch(() => {});
  }
  await writeFile(resolve(qa, 'browser-report.json'), JSON.stringify(report, null, 2));
}
async function fresh() {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__game);
  await page.locator('#start').click();
  await page.waitForFunction(() => window.__game.snapshot().phase === 'prepare');
}
async function advance(seconds) {
  await page.evaluate(seconds => window.__game.tick(seconds), seconds);
  await page.waitForTimeout(100);
}
async function advanceUntil(predicate, seconds = 18) {
  return page.evaluate(({ source, seconds }) => {
    const condition = new Function('s', `return (${source});`);
    const game = window.__game;
    for (let time = 0; time < seconds; time += 0.1) {
      if (condition(game.sim.state)) return game.snapshot();
      game.tick(0.1);
    }
    return game.snapshot();
  }, { source: predicate, seconds });
}

try {
  await check('real start, keyboard movement, E disguise, Q rotation', 'Real browser input; no state setup.', async () => {
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => !!window.__game);
    assert.equal((await snapshot()).phase, 'intro');
    await shot('title-1440');
    await page.locator('#start').click();
    const before = await snapshot();
    assert.equal(before.phase, 'prepare');
    await page.keyboard.down('d');
    await page.waitForFunction(({ x, z }) => {
      const player = window.__game.sim.state.player;
      return Math.hypot(player.x - x, player.z - z) > 0.75;
    }, before.player, { timeout: 12000 });
    await page.keyboard.up('d');
    const moved = await snapshot();
    assert.ok(Math.hypot(moved.player.x - before.player.x, moved.player.z - before.player.z) > 0.6, 'held D should move the player');
    await page.keyboard.press('e');
    await page.waitForTimeout(180);
    const disguised = await snapshot();
    assert.ok(disguised.player.kind, 'E should copy a nearby real map object');
    const angle = disguised.player.angle;
    await page.keyboard.press('q');
    const turned = await snapshot();
    assert.notEqual(turned.player.angle, angle);
    await shot('playing-1440');
    return { before: before.player, after: moved.player, disguise: disguised.player.kind, angleBefore: angle, angleAfter: turned.player.angle };
  });

  await check('rapid start then Enter keeps the same round in search', 'Real start click immediately followed by Enter; regression for native focused-button clicks resetting a round.', async () => {
    await fresh();
    const before = await snapshot();
    await page.keyboard.press('Enter');
    const after = await snapshot();
    assert.equal(after.phase, 'search');
    assert.equal(after.round, before.round);
    await page.waitForTimeout(250);
    assert.equal((await snapshot()).phase, 'search');
    return { roundBefore: before.round, roundAfter: after.round, phase: after.phase };
  });

  await check('mouse selects a specific nearby map object', 'QA teleports beside a known pot; actual scene click performs the transform.', async () => {
    await fresh();
    await page.evaluate(() => window.__game.teleport(11.15, -5));
    await page.waitForTimeout(180);
    const target = await page.evaluate(() => {
      const game = window.__game;
      const prop = game.sim.map.props.find(p => p.kind === 'pot' && p.x === 12.5 && p.z === -5);
      for (const y of [1.1, 0.8, 0.4, 1.3, 0.2]) {
        const point = game.project(prop.x, prop.z, y);
        if (game.world.pick(point.x, point.y) === prop.id && document.elementFromPoint(point.x, point.y)?.tagName === 'CANVAS') return { ...point, id: prop.id, kind: prop.kind };
      }
      return null;
    });
    assert.ok(target, 'a target point should be both pickable and unobstructed by HUD');
    await page.mouse.click(target.x, target.y);
    assert.equal((await snapshot()).player.kind, target.kind);
    return target;
  });

  await check('pause, help, mute and resume', 'Real button/key input and a 700 ms wall-clock pause wait.', async () => {
    await page.locator('#pause').click();
    const paused = await snapshot();
    assert.equal(paused.paused, true);
    await page.keyboard.down('w');
    await page.waitForTimeout(700);
    await page.keyboard.up('w');
    const after = await snapshot();
    assert.equal(after.time, paused.time);
    assert.equal(after.player.x, paused.player.x);
    assert.equal(after.player.z, paused.player.z);
    await page.locator('#show-guide').click();
    assert.match(await page.locator('#modal-title').innerText(), /物体/);
    await page.locator('#resume').click();
    assert.equal((await snapshot()).paused, false);
    await page.locator('#sound').click();
    assert.equal(await page.locator('#sound').getAttribute('aria-label'), '开启声音');
    await page.locator('#sound').click();
    assert.equal(await page.locator('#sound').getAttribute('aria-label'), '关闭声音');
    await page.keyboard.press('Escape');
    assert.equal((await snapshot()).paused, true);
    await page.keyboard.press('Escape');
    assert.equal((await snapshot()).paused, false);
    return { pauseTimeBefore: paused.time, pauseTimeAfter: after.time };
  });

  await check('two moving searchers and independent wrong-hit damage', 'QA teleports beside a garden lamp; real E/Enter and 1.3 s real patrol observation, then 80 s accelerated simulation.', async () => {
    await fresh();
    await page.evaluate(() => window.__game.teleport(12.4, -8.4));
    await page.keyboard.press('e');
    assert.equal((await snapshot()).player.kind, 'lamp');
    await page.keyboard.press('Enter');
    const before = await snapshot();
    assert.equal(before.phase, 'search');
    assert.deepEqual(before.cops.map(cop => cop.hp), [10, 10]);
    await page.waitForTimeout(1300);
    const realAfter = await snapshot();
    const movements = realAfter.cops.map((cop, index) => Math.hypot(cop.x - before.cops[index].x, cop.z - before.cops[index].z));
    assert.ok(movements.every(movement => movement > 0.08), `both cops should move: ${movements}`);
    await advance(80);
    const searched = await snapshot();
    const wrong = searched.events.filter(event => event.type === 'wrong');
    assert.ok(wrong.length > 0, 'ordinary suspicious props should draw mistaken attacks');
    for (const cop of searched.cops) assert.equal(cop.hp, 10 - wrong.filter(event => event.copId === cop.id).length, `cop ${cop.id} loses only its own mistaken attacks`);
    await shot('search-wrong-hit');
    return { movements, phase: searched.phase, remainingHp: searched.cops.map(cop => cop.hp), wrongEvents: wrong, visitedPositions: searched.cops.map(cop => ({ x: cop.x, z: cop.z, mode: cop.mode })) };
  });

  await check('real AI finds, captures and permits result restart', 'Real start/Enter without hiding; accelerated AI time until ordinary capture, then actual result restart click.', async () => {
    await fresh();
    await page.keyboard.press('Enter');
    const lost = await advanceUntil("s.phase === 'lost'", 25);
    assert.equal(lost.phase, 'lost');
    assert.ok(lost.events.some(event => event.type === 'found'));
    assert.ok(lost.player.exposed);
    await page.waitForSelector('#play-again');
    await shot('caught-result');
    await page.locator('#play-again').click();
    const restarted = await snapshot();
    assert.equal(restarted.phase, 'prepare');
    assert.equal(restarted.player.exposed, false);
    assert.equal(restarted.player.smokeCharges, 2);
    assert.deepEqual(restarted.cops.map(cop => cop.hp), [10, 10]);
    assert.ok(restarted.round > lost.round);
    await page.keyboard.press('Enter');
    assert.equal((await snapshot()).phase, 'search', 'Enter after the result restart must start search');
    assert.equal((await snapshot()).round, restarted.round, 'the focused result button must not restart again');
    return { foundEvent: lost.events.find(event => event.type === 'found'), lossResult: lost.result, restartedRound: restarted.round };
  });

  await check('smoke interrupts an actual discovered disguise and escapes', 'Real E/Enter/F with accelerated AI wait; no forced chase/exposed flags.', async () => {
    await fresh();
    await page.keyboard.press('e');
    assert.ok((await snapshot()).player.kind);
    await page.keyboard.press('Enter');
    const found = await advanceUntil('s.player.exposed', 25);
    assert.ok(found.player.exposed && found.phase === 'search', 'normal inspection must discover the central disguise');
    await page.keyboard.press('f');
    const smoke = await snapshot();
    assert.equal(smoke.player.smokeCharges, 1);
    assert.ok(smoke.player.smokeTime > 3);
    await shot('smoke-escape');
    await advance(3.3);
    const escaped = await snapshot();
    assert.equal(escaped.phase, 'search');
    assert.equal(escaped.player.exposed, false);
    assert.ok(escaped.stats.escapes >= 1);
    assert.ok(escaped.events.some(event => event.type === 'escape'));
    return { disguise: found.player.kind, officersAtDiscovery: found.cops.map(cop => cop.mode), remainingCharges: escaped.player.smokeCharges, escapes: escaped.stats.escapes };
  });

  await check('aimed distraction creates a bounded sound and cooldown', 'Real E/Enter, pointer movement and Space; no sound state assignment.', async () => {
    await fresh();
    await page.keyboard.press('e');
    await page.keyboard.press('Enter');
    const aimed = await page.evaluate(() => window.__game.project(3, 2, 0));
    await page.mouse.move(aimed.x, aimed.y);
    await page.keyboard.press('Space');
    const made = await snapshot();
    assert.ok(made.noise && made.player.noiseCooldown > 10);
    assert.ok(made.events.some(event => event.type === 'noise'));
    assert.ok(Math.hypot(made.noise.x - made.player.x, made.noise.z - made.player.z) <= 8.01);
    const count = made.events.filter(event => event.type === 'noise').length;
    await page.keyboard.press('Space');
    const repeated = await snapshot();
    assert.equal(repeated.events.filter(event => event.type === 'noise').length, count, 'cooldown blocks repeated sound');
    return { noise: made.noise, cooldown: made.player.noiseCooldown, player: { x: made.player.x, z: made.player.z } };
  });

  await check('survive full search, victory UI and title return', 'QA teleport to a valid hiding spot + actual E/Enter; full 121 s search advanced synthetically, no timer/result assignment.', async () => {
    await fresh();
    await page.evaluate(() => window.__game.teleport(12.4, -8.4));
    await page.keyboard.press('e');
    await advance(1);
    await page.keyboard.press('Enter');
    await advance(121);
    const won = await snapshot();
    assert.equal(won.phase, 'won');
    assert.equal(won.time, 0);
    await page.waitForSelector('#play-again');
    assert.match(await page.locator('#modal-title').innerText(), /毫无破绽/);
    await shot('survival-victory');
    await page.locator('#back-title').click();
    assert.equal((await snapshot()).phase, 'intro');
    assert.ok(await page.locator('#start').isVisible());
    return { result: won.result, stats: won.stats, hp: won.cops.map(cop => cop.hp) };
  });

  await check('one retired officer continues; both exhausted awards victory', 'Explicit QA HP setup covers exhaustion terminal/UI branch; does not claim ten organic mistakes per cop.', async () => {
    await fresh();
    await page.keyboard.press('Enter');
    await page.evaluate(() => { window.__game.sim.state.cops[0].hp = 0; });
    await advance(0.1);
    assert.equal((await snapshot()).phase, 'search');
    assert.equal((await snapshot()).cops[0].mode, 'retired');
    await page.evaluate(() => { window.__game.sim.state.cops[1].hp = 0; });
    await advance(0.1);
    const won = await snapshot();
    assert.equal(won.phase, 'won');
    assert.match(won.result, /耗尽/);
    await page.waitForSelector('#play-again');
    return { result: won.result, hp: won.cops.map(cop => cop.hp) };
  });

  for (const viewport of [{ width: 900, height: 700 }, { width: 390, height: 844 }]) {
    await check(`layout ${viewport.width}x${viewport.height}`, 'Real viewport resize, start, help and button hit-target inspection. Visual screenshot retained.', async () => {
      await page.setViewportSize(viewport);
      await fresh();
      await page.waitForTimeout(350);
      const layout = await page.evaluate(() => {
        const ids = ['sound', 'help', 'pause', 'transform', 'rotate', 'noise', 'smoke'];
        return { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth,
          controls: ids.map(id => { const el = document.getElementById(id), r = el.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { id, x: r.x, y: r.y, w: r.width, h: r.height, hit: top === el || el.contains(top) }; }) };
      });
      assert.ok(layout.scrollWidth <= viewport.width + 1, `horizontal overflow ${layout.scrollWidth}`);
      for (const control of layout.controls) {
        assert.ok(control.x >= 0 && control.y >= 0 && control.x + control.w <= viewport.width + 1 && control.y + control.h <= viewport.height + 1, `${control.id} is outside viewport: ${JSON.stringify(control)}`);
        assert.ok(control.hit, `${control.id} is overlapped by another UI element`);
      }
      await shot(`layout-${viewport.width}x${viewport.height}`);
      await page.locator('#help').click();
      assert.ok(await page.locator('#resume').isVisible());
      await page.locator('#resume').click();
      return layout;
    });
  }

  await check('rendering performance and browser errors', '120 actual requestAnimationFrame samples at 1440x960 in headless Chrome. Renderer identity recorded; concurrent browser activity may affect results. Not a physical-device benchmark.', async () => {
    await page.setViewportSize({ width: 1440, height: 960 });
    await fresh();
    report.performance = await page.evaluate(async () => {
      const samples = [];
      let last = performance.now();
      await new Promise(resolve => { const frame = now => { samples.push(now - last); last = now; if (samples.length >= 120) resolve(); else requestAnimationFrame(frame); }; requestAnimationFrame(frame); });
      samples.shift(); samples.sort((a, b) => a - b);
      const renderer = window.__game.world.renderer;
      const gl = renderer.getContext();
      const extension = gl.getExtension('WEBGL_debug_renderer_info');
      return { frameCount: samples.length, medianFrameMs: samples[Math.floor(samples.length * 0.5)], p95FrameMs: samples[Math.floor(samples.length * 0.95)], averageFrameMs: samples.reduce((a, b) => a + b, 0) / samples.length,
        gpu: extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
        render: { ...renderer.info.render }, memory: { ...renderer.info.memory }, viewport: { width: innerWidth, height: innerHeight }, dpr: devicePixelRatio };
    });
    assert.equal(report.errors.length, 0, `browser errors: ${JSON.stringify(report.errors)}`);
    assert.equal(report.httpFailures.length, 0, `HTTP failures: ${JSON.stringify(report.httpFailures)}`);
    return report.performance;
  });
} finally {
  report.finishedAt = new Date().toISOString();
  report.sourceAtEnd = await sourceHashes();
  report.sourcesUnchanged = JSON.stringify(report.sourceAtStart) === JSON.stringify(report.sourceAtEnd);
  report.passed = report.checks.filter(check => check.status === 'passed').length;
  report.failed = report.checks.filter(check => check.status === 'failed').length;
  await writeFile(resolve(qa, 'browser-report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify({ passed: report.passed, failed: report.failed, errors: report.errors.length, report: resolve(qa, 'browser-report.json') }));
if (report.failed || report.errors.length || !report.sourcesUnchanged) process.exitCode = 1;
