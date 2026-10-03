// Tests für „Gleichgewicht und Touch“, „Slalom“ und „Invasoren“
const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const bt = require('../ex/balancetouch.js');
const slalom = require('../ex/slalom.js');
const inv = require('../ex/invaders.js');

// ---- Gleichgewicht und Touch ----------------------------------------------
function makeBt(over, seed) {
  const p = VT.sanitizeParams(bt, Object.assign(VT.defaultsOf(bt), over || {}));
  const s = new bt.BalanceSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  return s;
}

test('Gleichgewicht und Touch: Verluste werden mit Zeitpunkt gezählt, nur während des Laufs', function () {
  const s = makeBt({ durationS: 60 });
  assert.equal(s.loss(5000).n, 1);
  assert.equal(s.loss(9000).n, 2);
  s.update(0);
  const sp = s.spots.active[0];
  assert.equal(s.tap(sp.x, sp.y, 400).type, 'hit');
  s.update(60000);
  assert.ok(s.finished);
  assert.equal(s.loss(61000), null);
  assert.deepEqual(s.losses, [5000, 9000]);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('hits'), 1);
  assert.equal(get('losses'), 2);
  assert.equal(get('losses_per_min'), 2);
  assert.ok(sum.trials.every(function (t) { return t.stance === 'both'; }));
  sum.metrics.forEach(function (m) { assert.ok(bt.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Gleichgewicht und Touch: Standposition wird in den Einzelwerten dokumentiert', function () {
  const s = makeBt({ stance: 'single', durationS: 20 });
  s.update(0); s.update(20000);
  s.spots.trials.length || s.spots.update(30000);
  assert.ok(s.summary().trials.every(function (t) { return t.stance === 'single'; }));
});

// ---- Slalom -------------------------------------------------------------
function makeSl(over, seed) {
  const p = VT.sanitizeParams(slalom, Object.assign(VT.defaultsOf(slalom), over || {}));
  const s = new slalom.SlalomSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  return s;
}
/** Steuert perfekt: Kugel auf die Mitte des nächsten noch nicht gewerteten Tores. */
function perfect(s, until) {
  for (let t = 20; t <= until; t += 20) {
    const next = s.gates.filter(function (g) { return !g.evaluated; }).sort(function (a, b) { return b.y - a.y; })[0];
    s.update(t, { mode: 'position', x: (next ? next.cx : s.x) / s.W });
  }
}

test('Slalom: Tore entstehen im festen Abstand, Mitten bleiben im Feld', function () {
  const s = makeSl({ durationS: 60, gapCm: 12, spacingCm: 14 }, 3);
  perfect(s, 20000);
  assert.ok(s.trials.length >= 14 && s.trials.length <= 22, 'Tore: ' + s.trials.length);
  for (let i = 1; i < s.gates.length; i++) assert.ok(Math.abs((s.gates[i - 1].y - s.gates[i].y) - 14) < 0.5);
  s.trials.forEach(function (t) { assert.ok(t.center_cm >= 6 + 1.2 - 0.1 && t.center_cm <= 60 - 6 - 1.2 + 0.1); });
});

test('Slalom: perfekte Steuerung durchfährt alle Tore, schlechte Steuerung trifft Stangen', function () {
  const good = makeSl({ durationS: 30 }, 4);
  perfect(good, 25000);
  assert.ok(good.passed >= 10);
  assert.equal(good.hits, 0);
  assert.equal(good.best, good.passed);
  const bad = makeSl({ durationS: 30, gapCm: 4 }, 4);
  for (let t = 20; t <= 25000; t += 20) bad.update(t, { mode: 'position', x: 0 });
  assert.ok(bad.hits > bad.passed);
  assert.ok(bad.best <= bad.passed);
});

test('Slalom: Achsen-Steuerung bewegt die Kugel, Begrenzung am Rand', function () {
  const s = makeSl({});
  s.update(20, { mode: 'axis', a: 1 });
  assert.ok(s.x > 30);
  for (let t = 40; t < 4000; t += 20) s.update(t, { mode: 'axis', a: 1 });
  assert.equal(s.x, 60);
  for (let t = 4000; t < 8000; t += 20) s.update(t, { mode: 'axis', a: -1 });
  assert.equal(s.x, 0);
});

test('Slalom: Geschwindigkeit steigt, Ende nach Dauer, Kennzahlen', function () {
  const s = makeSl({ durationS: 20, speedCmS: 10, speedUpPct: 50 });
  assert.equal(s.speed(), 10);
  s.elapsed = 60;
  assert.equal(s.speed(), 15);
  const t2 = makeSl({ durationS: 20 });
  perfect(t2, 21000);
  assert.ok(t2.finished);
  const sum = t2.summary();
  sum.metrics.forEach(function (m) { assert.ok(slalom.metricKeys.indexOf(m.key) >= 0, m.key); assert.ok(m.value === null || Number.isFinite(m.value)); });
  assert.equal(sum.metrics.find(function (m) { return m.key === 'accuracy'; }).value, 100);
});

test('Slalom: sehr schmales Feld (Handy) erzeugt gültige Tore', function () {
  const p = VT.sanitizeParams(slalom, Object.assign(VT.defaultsOf(slalom), { gapCm: 20 }));
  const s = new slalom.SlalomSession(p, { rng: VT.makeRng(1), fieldWcm: 9, fieldHcm: 17 });
  s.start(0);
  for (let t = 20; t < 3000; t += 20) s.update(t, { mode: 'axis', a: 0 });
  s.gates.forEach(function (g) { assert.ok(Number.isFinite(g.cx)); });
});

// ---- Invasoren ----------------------------------------------------------
function makeInv(over, seed) {
  const p = VT.sanitizeParams(inv, Object.assign(VT.defaultsOf(inv), over || {}));
  const s = new inv.InvadersSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  s.nextSpawnAt = 1e12; // keine zufälligen Schiffe im Test
  return s;
}

test('Invasoren: ausgerichtet halten zerstört das Schiff nach der Haltezeit', function () {
  const s = makeInv({ dwellMs: 400, toleranceCm: 2 });
  s.invaders.push({ id: 1, x: 30, y: 20, lock: 0, spawnedAt: 0 });
  let t = 0, steps = 0;
  while (s.invaders.length && steps < 100) { t += 50; steps++; s.update(t, { mode: 'position', x: 0.5 }); }
  assert.equal(s.destroyed, 1);
  assert.ok(steps >= 8 && steps <= 9, 'Schritte: ' + steps);
  assert.equal(s.trials[0].outcome, 'destroyed');
});

test('Invasoren: Abweichung lässt den Haltefortschritt abklingen; Schiffe oben sind nicht fassbar', function () {
  const s = makeInv({ dwellMs: 1000, toleranceCm: 1 });
  s.invaders.push({ id: 1, x: 30, y: 15, lock: 0, spawnedAt: 0 });
  s.update(50, { mode: 'position', x: 0.5 });
  s.update(100, { mode: 'position', x: 0.5 });
  const l1 = s.invaders[0].lock;
  assert.ok(l1 > 0);
  s.update(150, { mode: 'position', x: 0.9 });
  assert.ok(s.invaders[0].lock < l1);
  const top = makeInv({});
  top.invaders.push({ id: 1, x: 30, y: 1, lock: 0, spawnedAt: 0 });
  top.update(50, { mode: 'position', x: 0.5 });
  assert.equal(top.invaders[0].lock, 0);
});

test('Invasoren: Schiff am unteren Rand zählt als verpasst; Kennzahlen', function () {
  const s = makeInv({ durationS: 20 });
  s.invaders.push({ id: 1, x: 5, y: 32.8, lock: 0, spawnedAt: 0 });
  s.update(100, { mode: 'position', x: 0.9 });
  assert.equal(s.missed, 1);
  for (let t = 150; t <= 20300; t += 50) s.update(t, { mode: 'position', x: 0.9 });
  assert.ok(s.finished);
  const sum = s.summary();
  assert.equal(sum.metrics.find(function (m) { return m.key === 'accuracy'; }).value, 0);
  sum.metrics.forEach(function (m) { assert.ok(inv.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Invasoren: Schiffe erscheinen im eingestellten Takt', function () {
  const p = VT.sanitizeParams(inv, Object.assign(VT.defaultsOf(inv), { spawnMs: 1000 }));
  const s = new inv.InvadersSession(p, { rng: VT.makeRng(2), fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  for (let t = 50; t <= 10600; t += 50) s.update(t, { mode: 'position', x: 0.5 });
  assert.equal(s.nextId, 11, 'erstes Schiff nach 600 ms, danach alle 1000 ms bis 10600 ms');
});
