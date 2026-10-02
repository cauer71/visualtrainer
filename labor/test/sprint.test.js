const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const sprint = require('../ex/sprint.js');
const { SprintSession } = sprint;

function make(over, seed) {
  const p = VT.sanitizeParams(sprint, Object.assign(VT.defaultsOf(sprint), over || {}));
  const s = new SprintSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
  s.start(0);
  return s;
}

test('Zielposition „oben“ liegt senkrecht über der Startfläche', function () {
  const s = make({ distanceCm: 20 });
  const t = s.pickTarget();
  assert.ok(Math.abs(t.x - s.home.x) < 1e-9);
  assert.ok(Math.abs(t.y - (s.home.y - 20)) < 1e-9);
});

test('Zufällige Zielposition bleibt im Feld und im Abstand', function () {
  const s = make({ target: 'random', distanceCm: 25, targetCm: 6 }, 9);
  for (let i = 0; i < 200; i++) {
    const t = s.pickTarget();
    assert.ok(t.x >= 3 && t.x <= 57 && t.y >= 3 && t.y <= 31);
  }
});

test('Ablauf: halten, Ziel erscheint, loslassen, berühren', function () {
  const s = make({ minDelayMs: 1000, maxDelayMs: 1000 });
  assert.equal(s.homeDown(100).type, 'armed');
  s.update(1099);
  assert.equal(s.state, 'armed');
  s.update(1100);
  assert.equal(s.state, 'go');
  assert.ok(s.target);
  const up = s.homeUp(1380);
  assert.deepEqual([up.type, up.rt], ['released', 280]);
  const res = s.tap(s.target.x, s.target.y, 1700);
  assert.deepEqual([res.type, res.rt, res.mt], ['hit', 280, 320]);
  assert.equal(s.state, 'idle');
  assert.equal(s.trials[0].outcome, 'hit');
});

test('Fehlstart: zu früh losgelassen', function () {
  const s = make({ minDelayMs: 1000, maxDelayMs: 1000 });
  s.homeDown(0);
  assert.equal(s.homeUp(500).type, 'false_start');
  assert.equal(s.falseStarts, 1);
  assert.equal(s.state, 'idle');
  assert.equal(s.trials.length, 0);
});

test('Fehltipp neben das Ziel, danach Treffer', function () {
  const s = make({ minDelayMs: 500, maxDelayMs: 500 });
  s.homeDown(0); s.update(500); s.homeUp(700);
  assert.equal(s.tap(0, 0, 800).type, 'miss_tap');
  assert.equal(s.errorTaps, 1);
  assert.equal(s.state, 'moving');
  assert.equal(s.tap(s.target.x, s.target.y, 900).type, 'hit');
});

test('Zeitüberschreitungen: nicht losgelassen, Ziel nicht erreicht', function () {
  const a = make({ minDelayMs: 500, maxDelayMs: 500 });
  a.homeDown(0); a.update(500);
  a.update(2499);
  assert.equal(a.state, 'go');
  a.update(2500);
  assert.equal(a.trials[0].outcome, 'no_release');
  assert.equal(a.state, 'idle');
  const b = make({ minDelayMs: 500, maxDelayMs: 500 });
  b.homeDown(0); b.update(500); b.homeUp(650); b.update(3649);
  assert.equal(b.state, 'moving');
  b.update(3650);
  assert.equal(b.trials[0].outcome, 'no_target');
  assert.equal(b.trials[0].rt_ms, 150);
});

test('Nur im Leerlauf kann die Startfläche gedrückt werden; Treffer an der Startfläche', function () {
  const s = make({});
  assert.equal(s.inHome(s.home.x, s.home.y), true);
  assert.equal(s.inHome(0, 0), false);
  s.homeDown(0);
  assert.equal(s.homeDown(10), null);
});

test('Ende nach allen Durchgängen; Kennzahlen', function () {
  const s = make({ trials: 5, minDelayMs: 500, maxDelayMs: 500 });
  let t = 0;
  for (let i = 0; i < 5; i++) {
    s.homeDown(t); t += 500; s.update(t);
    s.homeUp(t + 200 + i * 10);
    s.tap(s.target.x, s.target.y, t + 200 + i * 10 + 300);
    t += 1000;
  }
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('hits'), 5);
  assert.equal(get('rt_mean'), 220);
  assert.equal(get('rt_median'), 220);
  assert.equal(get('mt_mean'), 300);
  sum.metrics.forEach(function (m) { assert.ok(sprint.metricKeys.indexOf(m.key) >= 0, m.key); });
});
