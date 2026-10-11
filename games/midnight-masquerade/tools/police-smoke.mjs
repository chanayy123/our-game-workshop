import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const url = process.env.GAME_URL || 'http://127.0.0.1:5184/?qa=1';
await mkdir('qa', { recursive: true });
const hashSources = async () => Object.fromEntries(await Promise.all(
  ['main.ts', 'simulation.ts', 'hider.ts', 'navigation.ts', 'map.ts', 'types.ts', 'world.ts', 'audio.ts', 'style.css']
    .map(async file => [file, createHash('sha256').update(await readFile(`src/${file}`)).digest('hex')])));
const report = { startedAt: new Date().toISOString(), url,
  scope: 'Real Chrome buttons, mouse and held keyboard inputs. Encounter placement, disabling the teammate, removing smoke for one capture, and accelerated timeout are explicitly labelled QA setups. No full natural police-round or device-touch claim.',
  sourceAtStart: await hashSources(), checks: [], errors: [], httpFailures: [], screenshots: [] };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', msg => { if (msg.type() === 'error') report.errors.push(msg.text()); });
page.on('response', response => { if (response.status() >= 400) report.httpFailures.push({ url: response.url(), status: response.status() }); });
const state = () => page.evaluate(() => window.__game.snapshot());
const release = async () => { for (const key of ['w', 'a', 's', 'd', 'Shift']) await page.keyboard.up(key); };
async function shot(name) { const file = `police-${name}.png`; await page.screenshot({ path: resolve('qa', file), fullPage: true }); report.screenshots.push(file); }
async function check(name, method, work) {
  try { const details = await work(); report.checks.push({ name, method, status: 'passed', details }); console.log(`PASS ${name}`); }
  catch (error) { report.checks.push({ name, method, status: 'failed', error: error.stack }); console.error(`FAIL ${name}: ${error.message}`); await shot(`failure-${report.checks.length}`); }
  await release();
  await writeFile('qa/police-browser-report.json', JSON.stringify(report, null, 2));
}
async function fresh(search = true) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__game);
  await page.locator('#role-police').click(); await page.locator('#start').click();
  if (search) await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
}
async function targetPoint(id) {
  return page.evaluate(id => {
    const g = window.__game, p = id === -1 ? g.sim.state.player : g.sim.map.props[id];
    for (const y of [1.1, .8, .4, 1.3, .2]) {
      const q = g.project(p.x, p.z, y);
      if (g.world.pick(q.x, q.y) === id && document.elementFromPoint(q.x, q.y)?.tagName === 'CANVAS') return q;
    }
    return null;
  }, id);
}
async function encounter(smoke) {
  await fresh();
  await page.evaluate(smoke => {
    const s = window.__game.sim.state;
    Object.assign(s.player, { x: 1, z: 5, kind: 'pot', angle: 0, smokeCharges: smoke, smokeTime: 0, exposed: false });
    Object.assign(s.cops[0], { x: 1, z: 6.5, angle: Math.PI });
    s.cops[1].hp = 0;
  }, smoke);
  await page.waitForTimeout(120);
  const point = await targetPoint(-1); assert.ok(point, 'AI disguise is anonymously pickable');
  await page.mouse.click(point.x, point.y);
  await page.keyboard.press('Space');
  assert.equal((await state()).player.exposed, true);
}
try {
  await check('title offers both roles and police preparation hides the opponent', 'Real role/start buttons; renderer inspection.', async () => {
    await page.goto(url); await page.waitForFunction(() => !!window.__game);
    assert.equal(await page.locator('#role-hider').getAttribute('aria-pressed'), 'true');
    await page.locator('#role-police').click();
    assert.equal(await page.locator('#role-police').getAttribute('aria-pressed'), 'true');
    assert.match(await page.locator('#start').innerText(), /搜查/);
    await page.waitForTimeout(250); await shot('title'); await page.locator('#start').click(); await page.waitForTimeout(100);
    const s = await state(); assert.equal(s.role, 'police'); assert.equal(s.phase, 'prepare'); assert.ok(s.time <= 5);
    const marker = await page.evaluate(() => {
      const w = window.__game.world, s = window.__game.sim.state;
      return { opponentVisible: w.player.visible, markerOnScene: w.playerMarker.parent === w.scene,
        markerX: w.playerMarker.position.x, markerZ: w.playerMarker.position.z, copX: s.cops[0].x, copZ: s.cops[0].z };
    });
    assert.equal(marker.opponentVisible, false); assert.equal(marker.markerOnScene, true);
    assert.equal(marker.markerX, marker.copX); assert.equal(marker.markerZ, marker.copZ);
    assert.match(await page.locator('#player-tag').innerText(), /警察/);
    return marker;
  });
  await check('keyboard moves the human officer and spends officer stamina', 'Real held W + Shift for 700 ms during preparation.', async () => {
    await fresh(false); const before = await state();
    await page.keyboard.down('w'); await page.keyboard.down('Shift'); await page.waitForTimeout(700); await release();
    const after = await state();
    assert.ok(Math.hypot(after.cops[0].x - before.cops[0].x, after.cops[0].z - before.cops[0].z) > .8);
    assert.equal(after.player.x, before.player.x); assert.equal(after.player.z, before.player.z);
    assert.ok(after.police.stamina < before.police.stamina);
    await page.keyboard.press('Enter'); assert.equal((await state()).phase, 'search');
    await shot('search'); return { from: before.cops[0], to: after.cops[0], stamina: after.police.stamina };
  });
  await check('observation is free and a real wrong attack costs only the player', 'QA places officer by known normal pot; actual mouse observation and Space attack.', async () => {
    await fresh();
    const id = await page.evaluate(() => {
      const g = window.__game, p = g.sim.map.props.find(p => p.kind === 'pot' && p.x === 12.5 && p.z === -5);
      g.teleport(11.15, -5); return p.id;
    });
    await page.waitForTimeout(150); const point = await targetPoint(id); assert.ok(point);
    await page.mouse.click(point.x, point.y); const observed = await state();
    assert.equal(observed.cops[0].hp, 10); assert.ok(observed.police.clueTime > 0);
    assert.doesNotMatch(observed.police.clue, /真正|伪装者|就是你/);
    const hp1 = observed.cops[1].hp; await page.keyboard.press('Space'); const hit = await state();
    assert.equal(hit.cops[0].hp, 9); assert.equal(hit.cops[1].hp, hp1);
    await page.keyboard.press('Space'); assert.equal((await state()).cops[0].hp, 9);
    await shot('wrong-attack'); return { clue: observed.police.clue, humanHp: hit.cops[0].hp, teammateHp: hit.cops[1].hp };
  });
  await check('police help and pause preserve simulation', 'Real Esc/help/resume buttons and a 650 ms pause.', async () => {
    await page.keyboard.press('Escape'); const before = await state();
    await page.waitForTimeout(650); assert.equal((await state()).time, before.time);
    await page.locator('#show-guide').click(); assert.match(await page.locator('#modal-title').innerText(), /多出来/);
    assert.match(await page.locator('#modal').innerText(), /观察不扣血|观察不会扣血/);
    await page.locator('#resume').click(); assert.equal((await state()).paused, false); return { frozenTime: before.time };
  });
  await check('discovered AI flees and uses smoke', 'QA stages encounter with both smoke charges; real click/Space, then 1.7 s live simulation.', async () => {
    await encounter(2); const found = await state(); await page.waitForTimeout(1700); const escaped = await state();
    assert.equal(found.cops[0].hp, 10); assert.ok(escaped.player.smokeCharges < 2); assert.ok(escaped.player.smokeTime > 0);
    assert.ok(Math.hypot(escaped.player.x - found.player.x, escaped.player.z - found.player.z) > .5);
    await shot('opponent-smoke'); return { smokeLeft: escaped.player.smokeCharges, movement: Math.hypot(escaped.player.x - found.player.x, escaped.player.z - found.player.z) };
  });
  await check('human discovers, whistles, chases and captures with actual input', 'QA stages no-smoke encounter and disables teammate; all attack, whistle and pursuit use real mouse/keys.', async () => {
    await encounter(0); await page.keyboard.press('f'); assert.ok((await state()).police.whistleCooldown > 14);
    for (let i = 0; i < 75; i++) {
      const s = await state(); if (s.phase !== 'search') break;
      const dx = s.player.x - s.cops[0].x, dz = s.player.z - s.cops[0].z;
      const angle = Math.atan2(.577 * dx + .817 * dz, .817 * dx - .577 * dz);
      const dirs = { 0: ['d'], 1: ['d', 's'], 2: ['s'], 3: ['s', 'a'], 4: ['a'], '-4': ['a'], '-3': ['a', 'w'], '-2': ['w'], '-1': ['w', 'd'] }[Math.round(angle / (Math.PI / 4))];
      for (const key of ['w', 'a', 's', 'd']) if (dirs.includes(key)) await page.keyboard.down(key); else await page.keyboard.up(key);
      await page.keyboard.down('Shift'); await page.waitForTimeout(100);
    }
    await release(); const s = await state(); assert.equal(s.phase, 'won');
    await page.waitForTimeout(120); assert.match(await page.locator('#modal-title').innerText(), /成功抓住/);
    await shot('capture-win'); return { result: s.result, hp: s.cops[0].hp, time: s.time };
  });
  await check('result replay resets police round and pause can switch to hider', 'Actual replay, pause, change-role, role-choice and start buttons.', async () => {
    await page.locator('#play-again').click(); let s = await state(); assert.equal(s.role, 'police'); assert.equal(s.phase, 'prepare');
    assert.deepEqual(s.cops.map(c => c.hp), [10, 10]); assert.equal(s.police.whistleCooldown, 0);
    await page.keyboard.press('Escape'); await page.locator('#change-role').click();
    await page.locator('#role-hider').click(); await page.locator('#start').click(); s = await state();
    assert.equal(s.role, 'hider'); assert.equal(s.phase, 'prepare'); assert.ok(s.time > 28);
    assert.match(await page.locator('#transform').innerText(), /复制外形/);
    const correctMarker = await page.evaluate(() => window.__game.world.playerMarker.parent === window.__game.world.player);
    assert.equal(correctMarker, true); return { role: s.role, time: s.time };
  });
  await check('ten real wrong attacks produce police loss', 'QA positions beside normal pot and disables teammate; ten real Space attacks with normal cooldown.', async () => {
    await fresh();
    const id = await page.evaluate(() => { const g = window.__game; g.teleport(11.15, -5); g.sim.state.cops[1].hp = 0; return g.sim.map.props.find(p => p.kind === 'pot' && p.x === 12.5 && p.z === -5).id; });
    await page.waitForTimeout(120); const point = await targetPoint(id); assert.ok(point); await page.mouse.move(point.x, point.y);
    for (let i = 0; i < 10; i++) { await page.keyboard.press('Space'); await page.waitForTimeout(710); }
    const s = await state(); assert.equal(s.phase, 'lost'); assert.equal(s.cops[0].hp, 0); assert.equal(s.stats.mistakes, 10);
    await shot('life-loss'); return { result: s.result, mistakes: s.stats.mistakes };
  });
  await check('search timeout produces police loss and result allows changing roles', 'QA advances 120 seconds; normal timeout logic and actual result title button.', async () => {
    await fresh(); await page.evaluate(() => window.__game.tick(120.1)); await page.waitForTimeout(150);
    const s = await state(); assert.equal(s.phase, 'lost'); assert.equal(s.time, 0);
    await page.locator('#back-title').click(); assert.equal((await state()).phase, 'intro');
    assert.equal(await page.locator('#role-police').getAttribute('aria-pressed'), 'true'); return { result: s.result };
  });
  await check('role buttons and start remain visible and clickable on small layouts', '390×844 and 900×700 browser viewport boundaries and hit testing; no device-touch claim.', async () => {
    const layouts = [];
    for (const size of [{ width: 390, height: 844 }, { width: 900, height: 700 }]) {
      await page.setViewportSize(size); await page.waitForTimeout(150);
      for (const selector of ['#role-hider', '#role-police', '#start']) {
        const b = await page.locator(selector).boundingBox(); assert.ok(b && b.x >= 0 && b.y >= 0 && b.x + b.width <= size.width && b.y + b.height <= size.height);
        assert.ok(await page.locator(selector).evaluate(e => { const b = e.getBoundingClientRect(); return e.contains(document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)); }));
      }
      await page.locator('#role-hider').click(); assert.equal(await page.locator('#role-hider').getAttribute('aria-pressed'), 'true');
      await page.locator('#role-police').click(); await page.waitForTimeout(250); await shot(`title-${size.width}x${size.height}`); layouts.push(size);
    }
    return layouts;
  });
} finally {
  await release().catch(() => {});
  report.finishedAt = new Date().toISOString(); report.sourceAtEnd = await hashSources();
  report.sourcesStable = JSON.stringify(report.sourceAtStart) === JSON.stringify(report.sourceAtEnd);
  await writeFile('qa/police-browser-report.json', JSON.stringify(report, null, 2)); await browser.close();
}
assert.equal(report.errors.length, 0, JSON.stringify(report.errors)); assert.equal(report.httpFailures.length, 0, JSON.stringify(report.httpFailures));
assert.equal(report.sourcesStable, true); assert.ok(report.checks.every(c => c.status === 'passed'), 'some police browser checks failed');
console.log(`${report.checks.length}/${report.checks.length} police browser checks passed`);
