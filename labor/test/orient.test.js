const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const orient = require('../ex/orient.js');
const { OrientSession } = orient;

function make(over, seed) {
  const p = VT.sanitizeParams(orient, Object.assign(VT.defaultsOf(orient), over || {}));
  const s = new OrientSession(p, { rng: VT.makeRng(seed || 1) });
  s.start(0);
  return s;
}

test('Ziele sind gleichmäßig auf die Richtungen verteilt', function () {
  const s = make({ trials: 8, directions: '4' });
  const cnt = [0, 0, 0, 0]; s.seq.forEach(function (x) { cnt[x]++; });
  assert.deepEqual(cnt, [2, 2, 2, 2]);
  assert.equal(make({ trials: 16, directions: '8' }).seq.length, 16);
});

test('Ablauf mit Rückkehr zur Mitte: Zielzeit und Rückkehrzeit werden getrennt gemessen', function () {
  const s = make({ returnToCenter: 'yes', waitMs: 1500 });
  assert.equal(s.state, 'wait');
  s.update(1499); assert.equal(s.state, 'wait');
  s.update(1500); assert.equal(s.state, 'target');
  assert.ok(s.current() >= 0 && s.current() < 4);
  assert.deepEqual(s.reached(2300), { type: 'reached' });
  assert.equal(s.state, 'center');
  assert.equal(s.current(), null);
  assert.deepEqual(s.reached(3000), { type: 'center' });
  assert.equal(s.state, 'wait');
  assert.deepEqual([s.trials[0].outcome, s.trials[0].ms, s.trials[0].return_ms], ['reached', 800, 700]);
  assert.equal(s.idx, 1);
});

test('Ohne Rückkehr zur Mitte endet der Durchgang direkt', function () {
  const s = make({ returnToCenter: 'no' });
  s.update(1500);
  s.reached(2000);
  assert.equal(s.state, 'wait');
  assert.equal(s.trials[0].return_ms, null);
});

test('Falsche Richtung und Zeitlimit', function () {
  const s = make({ returnToCenter: 'no', timeoutS: 2 });
  s.update(1500);
  assert.equal(s.wrong(1900).type, 'wrong');
  assert.equal(s.trials[0].outcome, 'wrong');
  s.update(1900 + 1500);
  const at = s.shownAt;
  s.update(at + 1999); assert.equal(s.state, 'target');
  s.update(at + 2000);
  assert.equal(s.trials[1].outcome, 'timeout');
  assert.equal(s.trials[1].ms, 2000);
  assert.equal(s.reached(at + 2100), null, 'nichts zu bestätigen');
});

test('Zeitlimit bei der Rückkehr beendet den Durchgang', function () {
  const s = make({ returnToCenter: 'yes', timeoutS: 2 });
  s.update(1500);
  s.reached(1800);
  s.update(1800 + 2000);
  assert.equal(s.trials.length, 1);
  assert.equal(s.trials[0].return_ms, 2000);
});

test('Ende nach allen Zielen; Kennzahlen', function () {
  const s = make({ trials: 8, returnToCenter: 'yes', waitMs: 500 });
  let t = 0;
  for (let i = 0; i < 8; i++) {
    t += 500; s.update(t);
    t += 1000 + i * 100; if (i === 3) s.wrong(t); else s.reached(t);
    t += 600; s.reached(t);
  }
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('reached'), 7);
  assert.equal(get('wrong'), 1);
  assert.equal(get('timeouts'), 0);
  assert.equal(get('return_mean'), 600);
  assert.ok(get('t_mean') > 1000);
  sum.metrics.forEach(function (m) { assert.ok(orient.metricKeys.indexOf(m.key) >= 0, m.key); });
});
