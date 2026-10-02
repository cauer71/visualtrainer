const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const flash = require('../ex/flash.js');
const { FlashSession } = flash;

function make(over, seed) {
  const p = VT.sanitizeParams(flash, Object.assign(VT.defaultsOf(flash), over || {}));
  return new FlashSession(p, { rng: VT.makeRng(seed || 1) });
}
/** Spielt einen Durchgang ab und gibt die Endzeit (nach der Rückmeldung) zurück. */
function playTrial(s, t0, correct, entryMs) {
  let t = t0;
  s.update(t + 700);                 // Fixation -> Anzeige
  t += 700;
  s.update(t + s.curDuration);       // Anzeige -> Maske oder Eingabe
  t += s.curDuration;
  if (s.phase === 'mask') { s.update(t + 150); t += 150; }
  assert.equal(s.phase, 'input');
  const pool = s.pool;
  t += entryMs || 1000;
  let res;
  s.target.forEach(function (sym, i) {
    const sent = correct ? sym : pool.find(function (x) { return x !== sym; });
    res = s.press(sent, t);
  });
  assert.equal(res.type, 'result');
  s.update(t + 500);
  return t + 500;
}

test('Phasen und Zeiten: Fixation, Anzeige, Maske, Eingabe', function () {
  const s = make({ durationMs: 200, mask: 'yes' });
  s.start(0);
  assert.equal(s.phase, 'fix');
  s.update(699); assert.equal(s.phase, 'fix');
  s.update(700); assert.equal(s.phase, 'show');
  s.update(899); assert.equal(s.phase, 'show');
  s.update(900); assert.equal(s.phase, 'mask');
  s.update(1049); assert.equal(s.phase, 'mask');
  s.update(1050); assert.equal(s.phase, 'input');
});

test('Ohne Maske geht es direkt in die Eingabe', function () {
  const s = make({ durationMs: 200, mask: 'no' });
  s.start(0); s.update(700); s.update(900);
  assert.equal(s.phase, 'input');
});

test('Zielzeichen sind verschieden und aus dem Vorrat', function () {
  ['digits', 'letters'].forEach(function (kind) {
    const s = make({ symbols: kind, length: 6 }, 3);
    for (let i = 0; i < 30; i++) {
      s.begin(0);
      assert.equal(s.target.length, 6);
      assert.equal(new Set(s.target).size, 6);
      s.target.forEach(function (c) { assert.ok(s.pool.indexOf(c) >= 0); });
    }
  });
});

test('Eingabe: nur in der Eingabephase, Löschen, automatische Auswertung', function () {
  const s = make({ durationMs: 200, mask: 'no', length: 2 });
  s.start(0);
  assert.equal(s.press('1', 100), null, 'noch Fixation');
  s.update(700); s.update(900);
  const target = s.target.slice();
  s.press(target[0], 1000);
  s.back();
  assert.equal(s.entry.length, 0);
  s.press(target[0], 1100);
  const res = s.press(target[1], 1300);
  assert.equal(res.type, 'result');
  assert.equal(res.correct, true);
  assert.equal(s.trials[0].entry_ms, 1300 - 900);
  assert.equal(s.phase, 'feedback');
  assert.equal(s.press('1', 1400), null);
});

test('Teilweise richtige Eingabe zählt bei den Zeichen', function () {
  const s = make({ durationMs: 200, mask: 'no', length: 3 });
  s.start(0); s.update(700); s.update(900);
  const t = s.target;
  const other = s.pool.find(function (x) { return x !== t[2]; });
  s.press(t[0], 1000); s.press(t[1], 1100);
  const res = s.press(other, 1200);
  assert.equal(res.correct, false);
  assert.equal(s.trials[0].symbols_ok, 2);
});

test('Ende nach allen Durchgängen; Kennzahlen bei fester Dauer', function () {
  const s = make({ trials: 5, durationMs: 200, adaptive: 'no', length: 3 }, 5);
  s.start(0);
  let t = 0;
  [true, true, true, false, false].forEach(function (ok) { t = playTrial(s, t, ok, 800); });
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { const m = sum.metrics.find(function (x) { return x.key === k; }); return m && m.value; };
  assert.equal(get('correct'), 3);
  assert.equal(get('accuracy'), 60);
  assert.equal(get('duration'), 200);
  assert.equal(get('threshold'), undefined);
  assert.equal(sum.trials.length, 5);
  sum.metrics.forEach(function (m) { assert.ok(flash.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Adaptiv: Dauer sinkt nach zwei richtigen und steigt nach einem Fehler', function () {
  const s = make({ trials: 10, durationMs: 200, adaptive: 'yes', mask: 'yes' }, 2);
  s.start(0);
  let t = 0;
  t = playTrial(s, t, true);
  assert.equal(s.duration(), 200);
  t = playTrial(s, t, true);
  assert.equal(s.duration(), 160);
  assert.equal(s.curDuration, 160, 'der nächste Durchgang nutzt bereits die neue Dauer');
  t = playTrial(s, t, false);
  assert.equal(s.duration(), 200);
  for (let i = 0; i < 4; i++) t = playTrial(s, t, i % 3 !== 0);
  const sum = s.summary();
  const th = sum.metrics.find(function (m) { return m.key === 'threshold'; });
  assert.ok(th);
  assert.ok(th.value === null || th.value > 0);
});
