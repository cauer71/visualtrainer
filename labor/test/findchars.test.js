const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const fc = require('../ex/findchars.js');
const { FindSession } = fc;

function make(over, seed) {
  const p = VT.sanitizeParams(fc, Object.assign(VT.defaultsOf(fc), over || {}));
  const s = new FindSession(p, { rng: VT.makeRng(seed || 1) });
  s.start(0);
  return s;
}
function targetsOf(s) { return s.board.cells.map(function (c, i) { return c.isTarget ? i : -1; }).filter(function (i) { return i >= 0; }); }

test('Tafel: Zahl der Felder und Zielzeichen, Ablenker sind andere Zeichen', function () {
  const s = make({ rows: 5, cols: 8, density: 20, set: 'pbdq' }, 4);
  const b = s.board;
  assert.equal(b.cells.length, 40);
  assert.equal(b.nTargets, 8);
  assert.equal(targetsOf(s).length, 8);
  b.cells.forEach(function (c) {
    if (c.isTarget) assert.equal(c.ch, b.target); else assert.notEqual(c.ch, b.target);
    assert.ok(['b', 'd', 'p', 'q'].indexOf(c.ch) >= 0);
  });
});

test('Mindestens ein Zielzeichen und nie alle Felder', function () {
  const s = make({ rows: 2, cols: 2, density: 5 });
  assert.equal(s.board.nTargets, 1);
  const t = make({ rows: 2, cols: 2, density: 50, set: 'digits' });
  assert.ok(t.board.nTargets <= 3);
});

test('Zeichenvorräte', function () {
  ['digits', 'similar', 'mixed'].forEach(function (set) {
    const s = make({ set: set }, 2);
    s.board.cells.forEach(function (c) { assert.ok(c.ch.length === 1); });
  });
});

test('Antippen: gefunden, falsch, schon bearbeitete Felder ignorieren', function () {
  const s = make({ rows: 4, cols: 4, density: 25, rounds: 2 }, 6);
  const ts = targetsOf(s);
  const wrongIdx = s.board.cells.findIndex(function (c) { return !c.isTarget; });
  assert.equal(s.tap(ts[0], 100).type, 'found');
  assert.equal(s.tap(ts[0], 150), null);
  assert.equal(s.tap(wrongIdx, 200).type, 'wrong');
  assert.equal(s.tap(wrongIdx, 250), null);
  assert.equal(s.found, 1);
  assert.equal(s.falseTaps, 1);
  assert.equal(s.tap(999, 300), null);
});

test('Alle gefunden: nächste Tafel, am Ende fertig', function () {
  const s = make({ rows: 3, cols: 4, density: 25, rounds: 2 }, 3);
  let t = 1000;
  ['next_board', 'finished'].forEach(function (expected) {
    const ts = targetsOf(s);
    let last;
    ts.forEach(function (i) { t += 500; last = s.tap(i, t); });
    assert.equal(last.type, expected);
  });
  assert.ok(s.finished);
  assert.equal(s.tap(0, t + 10), null);
  assert.equal(s.trials.length, 2);
  assert.equal(s.trials[0].end, 'complete');
});

test('Fertig: übrige Zielzeichen zählen als verpasst; Kennzahlen', function () {
  const s = make({ rows: 4, cols: 5, density: 20, rounds: 1 }, 9);
  const ts = targetsOf(s);
  s.tap(ts[0], 400);
  s.tap(ts[1], 800);
  const wrong = s.board.cells.findIndex(function (c) { return !c.isTarget; });
  s.tap(wrong, 900);
  const res = s.giveUp(2000);
  assert.equal(res.type, 'finished');
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('found'), 2);
  assert.equal(get('missed'), ts.length - 2);
  assert.equal(get('false_taps'), 1);
  assert.equal(get('accuracy'), VT.round(100 * 2 / (ts.length + 1), 1));
  assert.equal(get('per_target'), 1000);
  assert.equal(get('total'), 2);
  assert.equal(s.giveUp(3000), null);
  sum.metrics.forEach(function (m) { assert.ok(fc.metricKeys.indexOf(m.key) >= 0, m.key); });
});
