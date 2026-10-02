const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
require('../lib/words.js');
const ord = require('../ex/ordering.js');
const { OrderSession } = ord;

function make(over, seed) {
  const p = VT.sanitizeParams(ord, Object.assign(VT.defaultsOf(ord), over || {}));
  return new OrderSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34 });
}
const labels = function (s) { return s.order.map(function (id) { return s.items[id].label; }); };

test('Zahlen aufsteigend und absteigend', function () {
  assert.deepEqual(labels(make({ content: 'numbers', count: 5 })), ['1', '2', '3', '4', '5']);
  assert.deepEqual(labels(make({ content: 'numbers_desc', count: 5 })), ['5', '4', '3', '2', '1']);
});

test('Buchstaben: verschieden und alphabetisch geordnet', function () {
  const s = make({ content: 'letters', count: 10 });
  const l = labels(s);
  assert.equal(new Set(l).size, 10);
  assert.deepEqual(l, l.slice().sort());
});

test('Wörter: verschieden, aus der Liste, nach Alphabet', function () {
  const s = make({ content: 'words', count: 12 }, 7);
  const l = labels(s);
  assert.equal(new Set(l).size, 12);
  l.forEach(function (w) { assert.ok(VT.words.all.indexOf(w) >= 0); });
  for (let i = 1; i < l.length; i++) assert.ok(l[i - 1].localeCompare(l[i], 'de') < 0);
});

test('Summen und Produkte: Ergebnisse verschieden, nach Ergebnis aufsteigend', function () {
  ['sums', 'products'].forEach(function (c) {
    const s = make({ content: c, count: 12 }, 3);
    const keys = s.order.map(function (id) { return s.items[id].key; });
    assert.equal(new Set(keys).size, 12);
    for (let i = 1; i < keys.length; i++) assert.ok(keys[i - 1] < keys[i]);
    s.items.forEach(function (it) {
      const m = it.label.match(/^(\d+)([+×])(\d+)$/);
      assert.ok(m, it.label);
      const val = m[2] === '+' ? +m[1] + +m[3] : m[1] * m[3];
      assert.equal(val, it.key);
    });
  });
});

test('Berühren: falsches Ziel, richtiges Ziel, Danebentippen, Ende', function () {
  const s2 = make({ count: 4, motion: 'circle' });
  s2.start(0);
  const w = s2.items.find(function (i) { return i.id !== s2.expected().id; });
  const rw = s2.tap(w.x, w.y, 100);
  assert.equal(rw.type, 'wrong');
  assert.equal(s2.wrong, 1);
  assert.equal(s2.tap(-100, -100, 150).type, 'stray');
  assert.equal(s2.stray, 1);
  let t = 200;
  while (!s2.finished) { const e = s2.expected(); assert.equal(s2.tap(e.x, e.y, t).type, 'hit'); t += 500; }
  assert.equal(s2.trials.length, 4);
  assert.equal(s2.tap(0, 0, t), null);
  const sum = s2.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('solved'), 4);
  assert.equal(get('wrong'), 1);
  assert.equal(get('stray'), 1);
  assert.equal(sum.trials[0].wrong_before, 1);
  assert.equal(sum.trials[1].ms_since_prev, 500);
});

test('Geradlinig: bleibt im Feld, Geschwindigkeit konstant', function () {
  const s = make({ motion: 'linear', count: 6, speedCmS: 12, content: 'words', sizeCm: 3 }, 5);
  s.start(0);
  const speeds = s.items.map(function (i) { return Math.hypot(i.vx, i.vy); });
  for (let t = 16; t <= 40000; t += 16) {
    s.update(t);
    s.items.forEach(function (it) {
      assert.ok(it.x >= it.hw - 1e-6 && it.x <= 60 - it.hw + 1e-6, 'x ' + it.x);
      assert.ok(it.y >= it.hh - 1e-6 && it.y <= 34 - it.hh + 1e-6, 'y ' + it.y);
    });
  }
  s.items.forEach(function (it, i) { assert.ok(Math.abs(Math.hypot(it.vx, it.vy) - speeds[i]) < 1e-9); assert.ok(Math.abs(speeds[i] - 12) < 1e-9); });
});

test('Kreisbahn: gleicher Radius, gleichmäßige Abstände, Richtung', function () {
  const s = make({ motion: 'circle', count: 6, speedCmS: 5, direction: 'cw' });
  s.start(0);
  const rad = function (it) { return Math.hypot(it.x - 30, it.y - 17); };
  const r0 = rad(s.items[0]);
  s.items.forEach(function (it) { assert.ok(Math.abs(rad(it) - r0) < 1e-9); });
  assert.ok(r0 <= 17);
  const a0 = s.items.map(function (i) { return i.theta; });
  s.update(1000);
  const moved = (s.items[0].theta - a0[0]);
  assert.ok(moved > 0, 'im Uhrzeigersinn: Winkel wächst');
  assert.ok(Math.abs(moved - s.omega * 0.25) < 1e-9, 'dt auf 0,25 s begrenzt');
  const ccw = make({ motion: 'circle', direction: 'ccw' });
  assert.ok(ccw.omega < 0);
});

test('Ellipse liegt auf der Ellipsengleichung', function () {
  const s = make({ motion: 'ellipse', count: 8 });
  s.start(0);
  for (let t = 100; t < 5000; t += 100) s.update(t);
  s.items.forEach(function (it) {
    const v = Math.pow((it.x - s.cx) / s.rx, 2) + Math.pow((it.y - s.cy) / s.ry, 2);
    assert.ok(Math.abs(v - 1) < 1e-9);
  });
  assert.ok(s.rx > s.ry);
});

test('Zeitlimit beendet die Übung', function () {
  const s = make({ timeLimitS: 10, count: 5 });
  s.start(0);
  s.update(9999);
  assert.equal(s.finished, false);
  s.update(10000);
  assert.equal(s.finished, true);
  assert.equal(s.summary().metrics.find(function (m) { return m.key === 'total'; }).value, 10);
});

test('Kennzahlen-Schlüssel sind dokumentiert', function () {
  const keys = make({}).summary().metrics.map(function (m) { return m.key; });
  keys.forEach(function (k) { assert.ok(ord.metricKeys.indexOf(k) >= 0, k); });
});
