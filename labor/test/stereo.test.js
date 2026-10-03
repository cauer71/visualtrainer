const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const stereo = require('../ex/stereo.js');
const A = require('../lib/anaglyph.js');
const { StereoSession } = stereo;

const calib = VT.makeCalib({ pxPerCm: 40, viewDistanceCm: 60 });
function make(over, seed) {
  const p = VT.sanitizeParams(stereo, Object.assign(VT.defaultsOf(stereo), over || {}));
  const s = new StereoSession(p, { rng: VT.makeRng(seed || 1), calib: calib });
  s.start(0);
  return s;
}

test('Punktfeld: Anzahl, Lage des Quadrats, Disparität innen und außen', function () {
  const s = make({ noise: 'no', dots: 1500, startArcsec: 600 }, 3);
  const sc = s.scene;
  assert.equal(sc.dots.length, 1500);
  const dcm = A.arcsecToCm(600, 60);
  const inside = sc.dots.filter(function (d) { return d.inside; });
  assert.ok(inside.length > 100);
  inside.forEach(function (d) { assert.ok(Math.abs((d.lx - d.rx) - s.sign * dcm) < 1e-9); assert.ok(Math.abs(d.x - sc.region.x) <= 2.5 + 1e-9 && Math.abs(d.y - sc.region.y) <= 2.5 + 1e-9); });
  sc.dots.filter(function (d) { return !d.inside; }).forEach(function (d) { assert.equal(d.lx - d.rx, 0); });
});

test('Rauschen: Hintergrund hat zufällige Disparitäten innerhalb von ±2·d, Quadrat bleibt kohärent', function () {
  const s = make({ noise: 'yes', dots: 1500, startArcsec: 400 }, 4);
  const dcm = A.arcsecToCm(400, 60);
  const out = s.scene.dots.filter(function (d) { return !d.inside; });
  out.forEach(function (d) { assert.ok(Math.abs(d.lx - d.rx) <= 2 * dcm + 1e-9); });
  assert.ok(out.some(function (d) { return d.lx - d.rx > 0; }) && out.some(function (d) { return d.lx - d.rx < 0; }));
  s.scene.dots.filter(function (d) { return d.inside; }).forEach(function (d) { assert.ok(Math.abs((d.lx - d.rx) - s.sign * dcm) < 1e-9); });
});

test('Vorzeichen: positiv (gekreuzt) = Bild des linken Auges rechts vom rechten', function () {
  for (let seed = 1; seed < 20; seed++) {
    const s = make({ noise: 'no' }, seed);
    const d = s.scene.dots.find(function (x) { return x.inside; });
    if (s.sign > 0) assert.ok(d.lx > d.rx); else assert.ok(d.lx < d.rx);
  }
});

test('Region liegt im gewählten Teil des Feldes', function () {
  const seen = {};
  for (let seed = 1; seed < 60; seed++) {
    const s = make({}, seed);
    const r = s.scene.region;
    seen[s.location] = true;
    if (s.location === 'oben') assert.ok(r.y < 0 && r.x === 0);
    if (s.location === 'unten') assert.ok(r.y > 0 && r.x === 0);
    if (s.location === 'links') assert.ok(r.x < 0 && r.y === 0);
    if (s.location === 'rechts') assert.ok(r.x > 0 && r.y === 0);
  }
  assert.equal(Object.keys(seen).length, 4);
});

test('Antworten, Rückmeldung, adaptive Schwelle und Auflösungsgrenze', function () {
  const s = make({ trials: 12, adaptive: 'yes', startArcsec: 600 }, 5);
  let t = 0;
  for (let i = 0; i < 12; i++) {
    const guess = i % 3 === 2 ? 'oben' === s.location ? 'unten' : 'oben' : s.location;
    const r = s.answer(guess, t + 700);
    assert.equal(r.type, 'result');
    assert.equal(s.answer('oben', t + 710), null, 'nur eine Antwort je Durchgang');
    s.update(t + 700 + 500);
    t += 1300;
  }
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { const m = sum.metrics.find(function (x) { return x.key === k; }); return m && m.value; };
  assert.equal(get('correct'), 8);
  assert.equal(get('chance'), 25);
  assert.equal(get('px_arcsec'), Math.round(A.cmToArcsec(1 / 40, 60)));
  assert.ok(get('threshold') > 0);
  assert.ok(s.trials.every(function (x) { return x.arcsec >= 10; }));
  assert.ok(new Set(s.trials.map(function (x) { return x.arcsec; })).size > 1, 'Disparität verändert sich');
  sum.metrics.forEach(function (m) { assert.ok(stereo.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Feste Disparität: bleibt gleich', function () {
  const s = make({ trials: 12, adaptive: 'no', startArcsec: 300 }, 6);
  let t = 0;
  for (let i = 0; i < 12; i++) { assert.equal(s.curArcsec, 300); s.answer(s.location, t + 600); s.update(t + 1100); t += 1100; }
  assert.ok(s.summary().metrics.some(function (m) { return m.key === 'fixed_arcsec'; }));
});
