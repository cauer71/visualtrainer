const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const sac = require('../ex/saccade.js');
const { BeatSession } = sac;

function make(over, seed) {
  const p = VT.sanitizeParams(sac, Object.assign(VT.defaultsOf(sac), over || {}));
  return new BeatSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34, calib: VT.makeCalib({ pxPerCm: 40, viewDistanceCm: 60 }) });
}
function runAll(s) {
  const events = [];
  s.start(0);
  for (let t = 0; t <= 400000 && !s.finished; t += 10) s.update(t).forEach(function (e) { events.push(e); });
  return events;
}

test('Taktlänge und Zahl der Schläge', function () {
  assert.equal(sac.beatIntervalMs(60), 1000);
  assert.equal(sac.beatIntervalMs(120), 500);
  const s = make({ bpm: 60, durationS: 20 });
  assert.equal(s.totalBeats, 20);
  const ev = runAll(s);
  assert.equal(ev.length, 20);
  assert.ok(s.finished);
});

test('Schläge liegen exakt im Takt; erster Schlag nach einer Taktlänge', function () {
  const s = make({ bpm: 90, durationS: 10 });
  const ev = runAll(s);
  const iv = 60000 / 90;
  ev.forEach(function (e, i) { assert.ok(Math.abs(e.at - (i + 1) * iv) < 1e-6); });
});

test('Verspäteter Aufruf holt verpasste Schläge nach', function () {
  const s = make({ bpm: 60, durationS: 10 });
  s.start(0);
  const ev = s.update(3500);
  assert.equal(ev.length, 3);
  assert.deepEqual(ev.map(function (e) { return e.index; }), [0, 1, 2]);
});

test('Reihenfolge „der Reihe nach“ umkreist die vier Ecken', function () {
  const s = make({ pattern: 'corners4', order: 'cycle', durationS: 10, bpm: 60 });
  const ev = runAll(s);
  const margin = 3 / 2 + 0.5;
  assert.equal(ev.length, 10);
  assert.deepEqual([ev[0], ev[1], ev[2], ev[3], ev[4]].map(function (e) { return [Math.round(e.x), Math.round(e.y)].join(','); }),
    [[margin, margin], [60 - margin, margin], [60 - margin, 34 - margin], [margin, 34 - margin], [margin, margin]].map(function (a) { return a.map(Math.round).join(','); }));
});

test('Zufällige Reihenfolge: nie zweimal derselbe Punkt oder dasselbe Zeichen hintereinander', function () {
  ['digits', 'letters', 'syllables'].forEach(function (kind) {
    const s = make({ pattern: 'grid9', order: 'random', symbols: kind, durationS: 120, bpm: 60 }, 17);
    const ev = runAll(s);
    for (let i = 1; i < ev.length; i++) {
      assert.ok(!(ev[i].x === ev[i - 1].x && ev[i].y === ev[i - 1].y), 'Punkt wiederholt bei ' + i);
      assert.notEqual(ev[i].symbol, ev[i - 1].symbol);
    }
    if (kind === 'digits') assert.ok(ev.every(function (e) { return /^[1-9]$/.test(e.symbol); }));
    if (kind === 'letters') assert.ok(ev.every(function (e) { return /^[A-Z]$/.test(e.symbol); }));
    if (kind === 'syllables') assert.ok(ev.every(function (e) { return /^[BDFGKLMNPRSTVZ][AEIOU]$/.test(e.symbol); }));
  });
});

test('Muster mit zwei Punkten wechseln auch zufällig immer hin und her', function () {
  const s = make({ pattern: 'horizontal', order: 'random', durationS: 30, bpm: 60 }, 4);
  const ev = runAll(s);
  for (let i = 1; i < ev.length; i++) assert.notEqual(ev[i].x, ev[i - 1].x);
});

test('Alle Punkte liegen im Feld, auch bei großen Zeichen', function () {
  ['corners4', 'corners5', 'horizontal', 'vertical', 'grid9'].forEach(function (pat) {
    const s = make({ pattern: pat, sizeCm: 10 });
    s.points.forEach(function (pt) { assert.ok(pt.x >= 5 && pt.x <= 55 && pt.y >= 5 && pt.y <= 29, pat); });
  });
});

test('Berührungsmodus: Treffer, Verzögerung, verpasst, Fehltipp', function () {
  const s = make({ touch: 'yes', bpm: 60, durationS: 10 });
  s.start(0);
  const e0 = s.update(1000)[0];
  const hit = s.tap(e0.x, e0.y, 1350);
  assert.equal(hit.type, 'hit');
  assert.equal(hit.latency, 350);
  assert.equal(s.tap(e0.x, e0.y, 1400).type, 'stray', 'zweite Berührung desselben Schlags');
  s.update(2000); // zweiter Schlag, nicht berührt
  s.update(3000);
  const e2 = s.current;
  assert.equal(s.tap(e2.x + 30, e2.y, 3100).type, 'stray');
  for (let t = 4000; t <= 12000; t += 1000) s.update(t);
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('hits'), 1);
  assert.equal(get('misses'), 9);
  assert.equal(get('stray'), 2);
  assert.equal(get('accuracy'), 10);
  assert.equal(get('lat_mean'), 350);
});

test('Ohne Berührungsmodus werden Tipps ignoriert', function () {
  const s = make({ touch: 'no' });
  s.start(0); s.update(1000);
  assert.equal(s.tap(1, 1, 1100), null);
  assert.ok(!s.summary().metrics.some(function (m) { return m.key === 'hits'; }));
});

test('Strecke der Blicksprünge in cm und Grad', function () {
  const s = make({ pattern: 'horizontal', sizeCm: 3 });
  const margin = 2;
  const expectCm = 60 - 2 * margin;
  assert.ok(Math.abs(s.maxAmplitudeCm() - expectCm) < 1e-9);
  const m = s.summary().metrics;
  assert.equal(m.find(function (x) { return x.key === 'amp_cm'; }).value, VT.round(expectCm, 1));
  const deg = m.find(function (x) { return x.key === 'amp_deg'; }).value;
  assert.ok(Math.abs(deg - 2 * Math.atan(expectCm / 120) * 180 / Math.PI) < 0.06);
});
