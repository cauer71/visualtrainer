const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const chart = require('../ex/chart.js');
const { ChartSession, layoutChart } = chart;

function params(over) { return VT.sanitizeParams(chart, Object.assign(VT.defaultsOf(chart), over || {})); }
function make(over, seed) { return new ChartSession(params(over), { rng: VT.makeRng(seed || 1) }); }

test('Layout: passt, Anzahl und Reihenfolge der Positionen, symmetrisch zentriert', function () {
  const p = params({ rows: 2, cols: 3, groupSize: 2, sizeCm: 2, letterGapCm: 0.4, groupGapCm: 3 });
  const lay = layoutChart(p, 60, 34);
  assert.equal(lay.fits, true);
  assert.equal(lay.scale, 1);
  assert.equal(lay.letters.length, 2 * 3 * 2);
  assert.deepEqual(lay.letters.slice(0, 3).map(function (l) { return [l.g, l.k]; }), [[0, 0], [0, 1], [1, 0]]);
  const xs = lay.letters.map(function (l) { return l.x; }), ys = lay.letters.map(function (l) { return l.y; });
  assert.ok(Math.abs((Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2 - 30) < 1e-9);
  assert.ok(Math.abs((Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2 - 17) < 1e-9);
});

test('Layout: zu große Tafel wird verkleinert und bleibt im Feld', function () {
  const p = params({ rows: 8, cols: 8, groupSize: 5, sizeCm: 4, groupGapCm: 5 });
  const lay = layoutChart(p, 60, 34);
  assert.equal(lay.fits, false);
  assert.ok(lay.scale < 1);
  lay.letters.forEach(function (l) { assert.ok(l.x > 0 && l.x < 60 && l.y > 0 && l.y < 34); });
});

test('Gruppen: Zeichen innerhalb einer Gruppe sind verschieden', function () {
  const s = make({ rows: 3, cols: 3, groupSize: 5 }, 3);
  assert.equal(s.groups.length, 9);
  s.groups.forEach(function (g) { assert.equal(g.length, 5); assert.equal(new Set(g).size, 5); });
  const d = make({ symbols: 'digits', groupSize: 6 }, 3);
  d.groups.forEach(function (g) { g.forEach(function (c) { assert.ok(/^[1-9]$/.test(c)); }); });
});

test('Leseordnung: Gruppe für Gruppe und zeichenweise', function () {
  const a = make({ rows: 1, cols: 2, groupSize: 3, order: 'groups' });
  assert.deepEqual(a.steps.map(function (s) { return s.g + ':' + s.k; }), ['0:0', '0:1', '0:2', '1:0', '1:1', '1:2']);
  const b = make({ rows: 1, cols: 2, groupSize: 3, order: 'letterwise' });
  assert.deepEqual(b.steps.map(function (s) { return s.g + ':' + s.k; }), ['0:0', '1:0', '0:1', '1:1', '0:2', '1:2']);
});

test('Selbsttempo: Start, Schritte, Ende, Kennzahlen', function () {
  const s = make({ rows: 1, cols: 2, groupSize: 2, pace: 'self' });
  assert.equal(s.steps.length, 4);
  assert.equal(s.current(), null);
  assert.equal(s.advance(1000).type, 'started');
  assert.deepEqual(s.current(), { g: 0, k: 0 });
  assert.equal(s.advance(1500).type, 'step');
  assert.equal(s.advance(2100).type, 'step');
  assert.equal(s.advance(2500).type, 'step');
  assert.equal(s.advance(3100).type, 'finished');
  assert.equal(s.advance(3200), null);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('symbols'), 4);
  assert.equal(get('total'), 2.1);
  assert.equal(get('per_min'), 114.3);
  assert.equal(get('step_mean'), 525);
  assert.equal(sum.trials.map(function (t) { return t.ms_on_symbol; }).join(','), '500,600,400,600');
  assert.ok(get('step_cv') > 0 && get('step_cv') < 30);
  sum.metrics.forEach(function (m) { assert.ok(chart.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Metronom: Schläge im Takt, Ende nach dem letzten Zeichen', function () {
  const s = make({ rows: 1, cols: 2, groupSize: 2, pace: 'beat', bpm: 60 });
  s.start(0);
  assert.equal(s.update(999), false);
  assert.equal(s.update(1000), true);
  assert.deepEqual(s.current(), { g: 0, k: 0 });
  s.update(2000); s.update(3000); s.update(4000);
  assert.deepEqual(s.current(), { g: 1, k: 1 });
  assert.equal(s.finished, false);
  s.update(5000);
  assert.equal(s.finished, true);
  assert.equal(s.endedAt, 5000);
  const sum = s.summary();
  assert.equal(sum.metrics.find(function (m) { return m.key === 'total'; }).value, 5);
  assert.ok(sum.metrics.some(function (m) { return m.key === 'bpm'; }));
  assert.ok(!sum.metrics.some(function (m) { return m.key === 'step_mean'; }));
});

test('Selbsttempo ignoriert den Metronom-Pfad und umgekehrt', function () {
  const a = make({ pace: 'self' });
  a.start(0);
  assert.equal(a.update(5000), false);
  const b = make({ pace: 'beat' });
  assert.equal(b.advance(100), null);
});
