const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const dual = require('../ex/dual.js');
const { DualSession, CentralStream } = dual;

function make(over, seed) {
  const p = VT.sanitizeParams(dual, Object.assign(VT.defaultsOf(dual), over || {}));
  return new DualSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
}
function stream(over, seed) {
  const p = Object.assign({ intervalMs: 1000, targetDigit: 7, targetRate: 100 }, over || {});
  return new CentralStream(p, VT.makeRng(seed || 1));
}

test('Zahlenfolge: bei 100 % immer Zielzahl, bei 0 % nie', function () {
  const a = stream({ targetRate: 100 });
  a.start(0);
  for (let i = 0; i < 10; i++) { a.update(1000 * (i + 1)); assert.equal(a.symbol, '7'); assert.equal(a.isTarget, true); }
  const b = stream({ targetRate: 0 });
  b.start(0);
  let prev = b.symbol;
  for (let i = 0; i < 50; i++) {
    b.update(1000 * (i + 1));
    assert.notEqual(b.symbol, '7');
    assert.notEqual(b.symbol, prev, 'nie dieselbe Zahl zweimal hintereinander');
    prev = b.symbol;
  }
});

test('Zahlenfolge: Treffer, Verpasst, falscher Alarm', function () {
  const s = stream({ targetRate: 100 });
  s.start(0);
  const r = s.respond(420);
  assert.equal(r.type, 'hit');
  assert.deepEqual(s.rts, [420]);
  assert.equal(s.respond(500).type, 'false_alarm', 'zweite Berührung derselben Zielzahl');
  s.update(1000); // nächste Zielzahl, die erste war beantwortet
  assert.equal(s.misses, 0);
  s.update(2000); // zweite Zielzahl unbeantwortet
  assert.equal(s.misses, 1);
  const n = stream({ targetRate: 0 });
  n.start(0);
  assert.equal(n.respond(100).type, 'false_alarm');
  assert.equal(n.falseAlarms, 1);
});

test('Modus „Nur Mitte“: keine Randpunkte, Berührung außerhalb wird ignoriert', function () {
  const s = make({ mode: 'central' });
  assert.equal(s.spots, null);
  s.start(0);
  assert.equal(s.tap(2, 2, 100), null);
  assert.ok(s.tap(30, 17, 100));
});

test('Modus „Nur Rand“: keine Zahlenfolge, Mitte wird ignoriert', function () {
  const s = make({ mode: 'periphery', gapMs: 0 });
  assert.equal(s.central, null);
  s.start(0); s.update(0);
  assert.equal(s.tap(30, 17, 100), null);
  const sp = s.spots.active[0];
  assert.ok(sp, 'Randpunkt sichtbar');
  assert.equal(s.tap(sp.x, sp.y, 400).type, 'hit');
});

test('Randpunkte liegen in der Peripherie und halten Abstand zur Mitte', function () {
  const s = make({ mode: 'periphery', gapMs: 0, persistenceS: 0.4 }, 3);
  s.start(0);
  for (let t = 0; t < 20000; t += 100) {
    s.update(t);
    s.spots.active.forEach(function (sp) {
      const u = (sp.x - 30) / 30, v = (sp.y - 17) / 17;
      assert.ok(Math.sqrt(u * u + v * v) >= 0.6 - 1e-9);
    });
  }
});

test('Doppelaufgabe: beide Aufgaben laufen, Ende nach Dauer', function () {
  const s = make({ mode: 'dual', durationS: 20, targetRate: 50 }, 5);
  s.start(0);
  s.update(0);
  assert.ok(s.central && s.spots);
  const sp = s.spots.active[0];
  assert.equal(s.tap(sp.x, sp.y, 500).type, 'hit');
  s.update(19999);
  assert.equal(s.finished, false);
  s.update(20000);
  assert.equal(s.finished, true);
  assert.equal(s.tap(30, 17, 20001), null);
  const sum = s.summary();
  const keys = sum.metrics.map(function (m) { return m.key; });
  ['c_hits', 'c_misses', 'c_false', 'c_rt', 'p_hits', 'p_misses', 'p_stray', 'p_rt'].forEach(function (k) { assert.ok(keys.indexOf(k) >= 0, k); });
  assert.equal(sum.metrics.find(function (m) { return m.key === 'p_hits'; }).value, 1);
  keys.forEach(function (k) { assert.ok(dual.metricKeys.indexOf(k) >= 0, k); });
  assert.ok(sum.trials.length >= 1 && sum.trials[0].task === 'rand');
});

test('Berührung der Mitte bei Zielzahl wird als Treffer gewertet', function () {
  const s = make({ mode: 'central', targetRate: 50 }, 2);
  s.start(0);
  // Zeit vorspulen, bis eine Zielzahl sichtbar ist
  let t = 0;
  while (!s.central.isTarget && t < 100000) { t += 900; s.update(t); }
  assert.ok(s.central.isTarget);
  assert.equal(s.tap(30, 17, t + 200).type, 'hit');
  assert.equal(s.central.hits, 1);
});
