const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');

test('Kalibrierung: Umrechnung cm <-> Pixel <-> Sehwinkel', function () {
  const c = VT.makeCalib({ pxPerCm: 40, viewDistanceCm: 60 });
  assert.equal(c.cmToPx(2.5), 100);
  assert.equal(c.pxToCm(100), 2.5);
  // 1 Grad bei 60 cm Abstand: 2*60*tan(0,5°) = 1,0472 cm
  assert.ok(Math.abs(c.degToCm(1) - 1.0472) < 0.001);
  assert.ok(Math.abs(c.cmToDeg(c.degToCm(7.5)) - 7.5) < 1e-9);
});

test('Kalibrierung: ungültige Werte werden abgelehnt', function () {
  assert.throws(function () { VT.makeCalib({ pxPerCm: 0, viewDistanceCm: 60 }); });
  assert.throws(function () { VT.makeCalib({ pxPerCm: 40, viewDistanceCm: -1 }); });
  assert.throws(function () { VT.makeCalib({}); });
});

test('Zufall: gleicher Seed liefert gleiche Folge, Werte in [0,1)', function () {
  const a = VT.makeRng(42), b = VT.makeRng(42), c = VT.makeRng(43);
  const xs = [], ys = [], zs = [];
  for (let i = 0; i < 50; i++) { xs.push(a()); ys.push(b()); zs.push(c()); }
  assert.deepEqual(xs, ys);
  assert.notDeepEqual(xs, zs);
  assert.ok(xs.every(function (x) { return x >= 0 && x < 1; }));
});

test('Zufall: int, pick und shuffle', function () {
  const r = VT.makeRng(7);
  for (let i = 0; i < 200; i++) { const v = r.int(3, 5); assert.ok(v >= 3 && v <= 5 && Number.isInteger(v)); }
  const seen = new Set();
  for (let i = 0; i < 300; i++) seen.add(r.int(1, 4));
  assert.equal(seen.size, 4);
  const arr = [1, 2, 3, 4, 5, 6];
  const sh = r.shuffle(arr);
  assert.deepEqual(sh.slice().sort(), arr);
  assert.deepEqual(arr, [1, 2, 3, 4, 5, 6], 'Original bleibt unverändert');
});

test('Statistik: Mittel, Median, Streuung, Rundung', function () {
  assert.equal(VT.mean([2, 4, 6]), 4);
  assert.equal(VT.mean([]), null);
  assert.equal(VT.median([5, 1, 3]), 3);
  assert.equal(VT.median([1, 2, 3, 4]), 2.5);
  assert.equal(VT.median([]), null);
  assert.ok(Math.abs(VT.sd([2, 4, 4, 4, 5, 5, 7, 9]) - 2.13809) < 1e-4);
  assert.equal(VT.sd([1]), null);
  assert.equal(VT.round(1.2349, 2), 1.23);
  assert.equal(VT.round(1.236, 2), 1.24);
  assert.equal(VT.round(null), null);
  assert.equal(VT.round(NaN), null);
});

test('CSV: Semikolon, Anführungszeichen, Zeilenumbrüche, leere Werte', function () {
  const csv = VT.toCSV([{ a: 1, b: 'x;y' }, { a: null, b: 'sagt "hi"' }, { a: 3, b: 'zwei\nzeilen' }], ['a', 'b']);
  assert.equal(csv, 'a;b\r\n1;"x;y"\r\n;"sagt ""hi"""\r\n3;"zwei\nzeilen"');
  assert.equal(VT.toCSV([]), '');
});

test('Parameter: Defaults und Bereinigung (Grenzen, Auswahl, Unsinn)', function () {
  const ex = { params: [
    { key: 'n', type: 'number', min: 1, max: 10, default: 5 },
    { key: 's', type: 'select', default: 'a', options: [{ value: 'a' }, { value: 'b' }] }
  ] };
  assert.deepEqual(VT.defaultsOf(ex), { n: 5, s: 'a' });
  assert.deepEqual(VT.sanitizeParams(ex, { n: '99', s: 'b' }), { n: 10, s: 'b' });
  assert.deepEqual(VT.sanitizeParams(ex, { n: -4, s: 'zzz' }), { n: 1, s: 'a' });
  assert.deepEqual(VT.sanitizeParams(ex, { n: 'abc' }), { n: 5, s: 'a' });
  assert.deepEqual(VT.sanitizeParams(ex, null), { n: 5, s: 'a' });
});

test('Registry: Pflichtfelder und doppelte IDs', function () {
  assert.throws(function () { VT.register({ id: 'x' }); });
  const ex = { id: 'test-ex-1', params: [], createSession: function () {} };
  VT.register(ex);
  assert.equal(VT.get('test-ex-1'), ex);
  assert.throws(function () { VT.register({ id: 'test-ex-1', params: [], createSession: function () {} }); });
});

test('Ergebnisspeicher: speichern, laden, begrenzen, löschen', function () {
  VT.clearResults();
  assert.equal(VT.loadResults().length, 0);
  for (let i = 0; i < 105; i++) VT.saveResult({ i: i });
  const all = VT.loadResults();
  assert.equal(all.length, 100);
  assert.equal(all[0].i, 5, 'älteste Einträge fallen weg');
  VT.clearResults();
  assert.equal(VT.loadResults().length, 0);
});
