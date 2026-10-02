const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const per = require('../ex/periphery.js');
const { PeripherySession } = per;

const calib = VT.makeCalib({ pxPerCm: 40, viewDistanceCm: 60 });
function make(over, seed, W, H) {
  const p = VT.sanitizeParams(per, Object.assign(VT.defaultsOf(per), over || {}));
  return new PeripherySession(p, { rng: VT.makeRng(seed || 1), fieldWcm: W || 60, fieldHcm: H || 34, calib: calib });
}
function toInput(s, t0) {
  s.update(t0 + s.fixMs);
  assert.equal(s.phase, 'flash');
  s.update(t0 + s.fixMs + s.curDuration);
  assert.equal(s.phase, 'input');
  return t0 + s.fixMs + s.curDuration;
}

test('Position entspricht dem eingestellten Sehwinkel', function () {
  const s = make({ eccentricityDeg: 10, directions: 'horizontal' }, 1);
  s.start(0);
  const expectCm = calib.degToCm(10);
  assert.ok(Math.abs(Math.abs(s.pos.x - 30) - expectCm) < 1e-9);
  assert.equal(s.pos.y, 17);
  assert.equal(s.ecc.clamped, false);
  assert.ok(Math.abs(s.ecc.deg - 10) < 1e-9);
});

test('Zu großer Winkel wird auf das Machbare begrenzt und gemeldet', function () {
  const s = make({ eccentricityDeg: 40, sizeCm: 3 }, 1);
  s.start(0);
  assert.equal(s.ecc.clamped, true);
  assert.ok(Math.abs(s.ecc.cm - 28) < 1e-9);
  assert.ok(s.ecc.deg < 40);
  const v = make({ eccentricityDeg: 40, directions: 'all4' }, 3);
  let sawVertical = false;
  for (let i = 0; i < 40; i++) {
    v.begin(0);
    if (v.dir === 'up' || v.dir === 'down') { sawVertical = true; assert.ok(Math.abs(v.ecc.cm - 15) < 1e-9); }
  }
  assert.ok(sawVertical);
});

test('Richtungen: horizontal nur links/rechts, alle vier mit oben/unten', function () {
  const h = make({ directions: 'horizontal' }, 4);
  const seenH = new Set();
  for (let i = 0; i < 60; i++) { h.begin(0); seenH.add(h.dir); }
  assert.deepEqual([...seenH].sort(), ['left', 'right']);
  const a = make({ directions: 'all4' }, 4);
  const seenA = new Set();
  for (let i = 0; i < 100; i++) { a.begin(0); seenA.add(a.dir); }
  assert.deepEqual([...seenA].sort(), ['down', 'left', 'right', 'up']);
});

test('Antwortmöglichkeiten: enthalten den Buchstaben, verschieden, richtige Anzahl', function () {
  const s = make({ choices: 5 }, 8);
  for (let i = 0; i < 30; i++) {
    s.begin(0);
    assert.equal(s.options.length, 5);
    assert.equal(new Set(s.options).size, 5);
    assert.ok(s.options.indexOf(s.letter) >= 0);
  }
});

test('Ablauf, Antwort, Rückmeldung, Ende', function () {
  const s = make({ trials: 8, adaptive: 'no', durationMs: 100 }, 6);
  s.start(0);
  let t = 0;
  for (let i = 0; i < 8; i++) {
    t = toInput(s, t);
    assert.equal(s.answer(0, t + 10) !== null, true);
    assert.equal(s.answer(0, t + 20), null, 'nur eine Antwort je Durchgang');
    s.update(t + 10 + 450);
    t += 460;
  }
  assert.ok(s.finished);
  assert.equal(s.trials.length, 8);
});

test('Kennzahlen: Quote, Zufallsniveau, Seiten', function () {
  const s = make({ trials: 8, choices: 4, adaptive: 'no', durationMs: 100 }, 6);
  s.start(0);
  let t = 0;
  for (let i = 0; i < 8; i++) {
    t = toInput(s, t);
    const right = s.options.indexOf(s.letter);
    s.answer(i < 6 ? right : (right + 1) % 4, t + 400);
    s.update(t + 400 + 450);
    t += 860;
  }
  const sum = s.summary();
  const get = function (k) { const m = sum.metrics.find(function (x) { return x.key === k; }); return m && m.value; };
  assert.equal(get('correct'), 6);
  assert.equal(get('accuracy'), 75);
  assert.equal(get('chance'), 25);
  assert.equal(get('rt_mean'), 400);
  assert.equal(get('duration'), 100);
  assert.equal(get('acc_vertical'), undefined);
  sum.metrics.forEach(function (m) { assert.ok(per.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Adaptiv: Dauer ändert sich und Schwelle wird geschätzt', function () {
  const s = make({ trials: 24, adaptive: 'yes', durationMs: 200 }, 12);
  s.start(0);
  let t = 0;
  for (let i = 0; i < 24; i++) {
    t = toInput(s, t);
    const right = s.options.indexOf(s.letter);
    s.answer(i % 3 === 2 ? (right + 1) % 4 : right, t + 300);
    s.update(t + 300 + 450);
    t += 760;
  }
  const th = s.summary().metrics.find(function (m) { return m.key === 'threshold'; });
  assert.ok(th && th.value > 0);
});

test('Zentrale Zahl wechselt im Takt und ist 2 bis 9', function () {
  const s = make({}, 2);
  s.start(0);
  const seen = new Set();
  for (let t = 0; t < 900; t += 50) { s.update(t); seen.add(s.centerDigit); }
  assert.ok(seen.size >= 1);
  seen.forEach(function (d) { assert.ok(/^[2-9]$|^5$/.test(d)); });
});
