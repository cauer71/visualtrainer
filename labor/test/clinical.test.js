// Tests für Hess-Schirm, Worth, Schober, Diplopie-Karte, subjektive Vertikale und Orts-Projektion
const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const hess = require('../ex/hess.js');
const worth = require('../ex/worth.js');
const schober = require('../ex/schober.js');
const dip = require('../ex/diplopia.js');
const vert = require('../ex/vertical.js');
const proj = require('../ex/projection.js');
const G = require('../lib/gaze.js');

const calib50 = VT.makeCalib({ pxPerCm: 40, viewDistanceCm: 50 });
const val = function (sum, k) { const m = sum.metrics.find(function (x) { return x.key === k; }); return m && m.value; };
function keysOk(ex, sum) { sum.metrics.forEach(function (m) { assert.ok(ex.metricKeys.indexOf(m.key) >= 0, ex.id + ' ' + m.key); assert.ok(m.value === null || Number.isFinite(m.value), m.key); }); }

// ---- Hess ---------------------------------------------------------------
function makeHess(over, W, H, seed) {
  const p = VT.sanitizeParams(hess, Object.assign(VT.defaultsOf(hess), over || {}));
  const s = new hess.HessSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: W || 80, fieldHcm: H || 60, calib: calib50 });
  s.start(0);
  return s;
}
function placeAll(s, mapFn) {
  let t = 0;
  while (s.state === 'placing') {
    const pt = s.current();
    const q = mapFn ? mapFn(pt, s) : { x: pt.sx, y: pt.sy };
    s.place(q.x, q.y);
    t += 1000;
    assert.equal(s.confirm(t).type, 'confirmed');
  }
}

test('Hess: Punktzahl, jeder Punkt einmal je Durchgang, Fixierauge je Durchgang', function () {
  const s = makeHess({ grid: 'both', passes: 'both', redEye: 'left' });
  assert.equal(s.points.length, 25);
  assert.equal(new Set(s.order).size, 25);
  assert.equal(s.fixEye(), 'left');
  assert.equal(s.passName(), 'A');
  assert.equal(makeHess({ grid: 'inner' }).points.length, 9);
  assert.equal(makeHess({ redEye: 'right' }).fixEye(), 'right');
  const s2 = makeHess({ redEye: 'left', grid: 'inner' });
  placeAll(s2, null);
  assert.equal(s2.state, 'chart');
});

test('Hess: ohne Bewegung des Zeigers keine Bestätigung', function () {
  const s = makeHess({});
  assert.equal(s.confirm(500), null);
  s.place(s.current().sx, s.current().sy);
  assert.equal(s.confirm(600).type, 'confirmed');
});

test('Hess: exakte Platzierung ergibt keine Abweichung und 100 % Fläche; Ablauf bis Ende', function () {
  const s = makeHess({ grid: 'both', passes: 'both' });
  placeAll(s, null);
  assert.equal(s.state, 'chart');
  assert.equal(s.results.length, 50);
  s.closeChart();
  assert.ok(s.finished);
  const sum = s.summary();
  assert.ok(val(sum, 'dev_a') < 0.01 && val(sum, 'dev_b') < 0.01);
  assert.ok(Math.abs(val(sum, 'area_a') - 100) < 0.6);
  assert.equal(val(sum, 'area_ratio'), 1);
  assert.equal(val(sum, 'placed'), 50);
  assert.equal(val(sum, 'clamped'), 0);
  assert.ok(sum.trials.every(function (t) { return !('tsx' in t) && !('rawh' in t); }), 'interne Felder nicht im Export');
  keysOk(hess, sum);
});

test('Hess: verkleinerter Umriss ergibt kleinere Fläche, Abweichungen haben das richtige Vorzeichen', function () {
  const s = makeHess({ grid: 'both', passes: 'one' });
  placeAll(s, function (pt, sess) {
    const cx = sess.W / 2, cy = sess.H / 2;
    return { x: cx + (pt.sx - cx) * 0.8, y: cy + (pt.sy - cy) * 0.8 };
  });
  const sum = s.summary();
  assert.ok(val(sum, 'area_a') > 55 && val(sum, 'area_a') < 72, 'Fläche ' + val(sum, 'area_a'));
  assert.equal(val(sum, 'dev_b'), null);
  assert.equal(val(sum, 'area_ratio'), null);
  const r = s.results.find(function (x) { return x.target_h > 15; });
  assert.ok(r.dev_h < 0, 'Antwort liegt weiter innen als das Ziel');
  const shifted = makeHess({ grid: 'inner', passes: 'one' });
  placeAll(shifted, function (pt) { return { x: pt.sx + 1, y: pt.sy }; });
  assert.ok(shifted.results.every(function (x) { return x.dev_h > 0 && Math.abs(x.dev_v) < 0.01; }), 'Verschiebung nach rechts = positive Abweichung');
});

test('Hess: kleiner Bildschirm verkleinert das Raster und meldet es', function () {
  const s = makeHess({ maxDeg: 35 }, 30, 20);
  assert.equal(s.fit.clamped, true);
  placeAll(s, null);
  assert.equal(val(s.summary(), 'clamped'), 1);
  assert.ok(val(s.summary(), 'eff_deg') < 35);
});

// ---- Worth --------------------------------------------------------------
test('Worth: Zuordnung der Lichterzahl', function () {
  assert.deepEqual([4, 2, 3, 5, null, 7].map(worth.classify), ['fusion', 'red_only', 'blue_only', 'diplopia', 'unclear', 'unclear']);
});

test('Worth: Größen wechseln, Antworten und Kennzahlen', function () {
  const s = new worth.WorthSession(VT.sanitizeParams(worth, { repeats: 4, dotCm: 1.2, varySize: 'yes' }));
  assert.deepEqual(s.sizes, [1.2, 3, 1.2, 3]);
  s.start(0);
  s.answer(4, 1000); s.answer(4, 2500); s.answer(2, 4000);
  assert.equal(s.answer('unclear', 5000).type, 'answered');
  assert.ok(s.finished);
  assert.equal(s.answer(4, 6000), null);
  const sum = s.summary();
  assert.deepEqual(['fusion', 'red_only', 'blue_only', 'diplopia', 'unclear', 'consistency'].map(function (k) { return val(sum, k); }), [2, 1, 0, 0, 1, 50]);
  assert.equal(s.trials[1].ms, 1500);
  assert.equal(s.trials[3].count, null);
  keysOk(worth, sum);
  const same = new worth.WorthSession(VT.sanitizeParams(worth, { repeats: 3, varySize: 'no' }));
  assert.equal(new Set(same.sizes).size, 1);
});

// ---- Schober ------------------------------------------------------------
test('Schober: Auge, das das Kreuz sieht', function () {
  assert.equal(schober.crossEyeOf({ redEye: 'left', crossColor: 'red' }), 'left');
  assert.equal(schober.crossEyeOf({ redEye: 'left', crossColor: 'blue' }), 'right');
  assert.equal(schober.crossEyeOf({ redEye: 'right', crossColor: 'red' }), 'right');
  assert.equal(schober.crossEyeOf({ redEye: 'right', crossColor: 'blue' }), 'left');
});

test('Schober: Vorzeichen der Phorie (siehe Herleitung in der Datei)', function () {
  // Kreuz sieht das rechte Auge: nach links geschoben (−) = Esophorie (+); nach rechts = Exophorie (−)
  assert.equal(schober.phoriaH(-2, 'right'), 2);
  assert.equal(schober.phoriaH(2, 'right'), -2);
  // Kreuz sieht das linke Auge: Spiegelbild
  assert.equal(schober.phoriaH(2, 'left'), 2);
  assert.equal(schober.phoriaH(-2, 'left'), -2);
  // Senkrecht: Kreuz nach oben = kreuzsehendes Auge höher; positiv = rechts höher
  assert.equal(schober.phoriaV(1.5, 'right'), 1.5);
  assert.equal(schober.phoriaV(1.5, 'left'), -1.5);
  assert.equal(schober.phoriaV(0, 'left'), 0);
});

function driveTo(s, final, t) {
  while (s.shift < final - 1e-9) s.step(1);
  while (s.shift > final + 1e-9) s.step(-1);
  return s.confirm(t);
}

test('Schober: Plan, Schritte, Bestätigung, Mittelwerte', function () {
  const p = VT.sanitizeParams(schober, { axes: 'both', stepPd: 0.5, startPd: 6, redEye: 'left', crossColor: 'blue' }); // Kreuz: rechtes Auge
  const s = new schober.SchoberSession(p, { rng: VT.makeRng(3) });
  s.start(0);
  assert.equal(s.crossEye, 'right');
  assert.equal(s.plan.length, 4);
  assert.deepEqual(s.plan.slice(0, 2).map(function (r) { return r.axis; }), ['h', 'h']);
  assert.equal(s.plan[0].start, -s.plan[1].start);
  assert.equal(Math.abs(s.plan[0].start), 6);
  assert.equal(s.step(1).shift, s.plan[0].start + 0.5);
  s.step(-1);
  driveTo(s, -1, 1000);       // waagerecht, Lauf 1: Kreuz −1 Δ → Eso +1
  driveTo(s, -1.5, 2000);     // Lauf 2: −1,5 → Eso +1,5
  driveTo(s, 1, 3000);        // senkrecht: Kreuz oben, rechtes Auge sieht Kreuz → RH +1
  driveTo(s, 2, 4000);
  assert.ok(s.finished);
  assert.equal(s.confirm(5000), null);
  const sum = s.summary();
  assert.equal(val(sum, 'h_phoria'), 1.25);
  assert.equal(val(sum, 'h_sd'), 0.5);
  assert.equal(val(sum, 'v_phoria'), 1.5);
  assert.equal(val(sum, 'runs'), 4);
  assert.equal(s.trials[0].axis, 'waagerecht');
  keysOk(schober, sum);
  const h = new schober.SchoberSession(VT.sanitizeParams(schober, { axes: 'horizontal' }), { rng: VT.makeRng(1) });
  assert.equal(h.plan.length, 2);
  const v = new schober.SchoberSession(VT.sanitizeParams(schober, { axes: 'vertical' }), { rng: VT.makeRng(1) });
  assert.ok(v.plan.every(function (r) { return r.axis === 'v'; }));
});

// ---- Diplopie-Karte -----------------------------------------------------
function makeDip(over, seed) {
  const p = VT.sanitizeParams(dip, Object.assign(VT.defaultsOf(dip), over || {}));
  const s = new dip.DiplopiaSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 80, fieldHcm: 60, calib: calib50 });
  s.start(0);
  return s;
}

test('Diplopie-Karte: neun Richtungen, jede einmal; Antworten und Versatz in Δ', function () {
  const s = makeDip({});
  assert.equal(s.points.length, 9);
  assert.equal(new Set(s.order).size, 9);
  assert.equal(s.answerDouble().type, 'double');
  assert.equal(s.answerDouble(), null);
  assert.equal(s.confirm(500), null, 'ohne Verschieben keine Bestätigung');
  const t = s.current();
  s.place(t.sx + 1, t.sy + 1);                 // 1 cm rechts, 1 cm unten
  assert.equal(s.confirm(900).type, 'confirmed');
  const r = s.results[0];
  assert.equal(r.double, 1);
  assert.equal(r.sep_h_pd, 2);                 // 1 cm auf 50 cm = 2 Δ
  assert.equal(r.sep_v_pd, -2);                // nach unten = negativ
  assert.equal(r.ms, 900);
  for (let i = 1; i < 9; i++) s.answerSingle(1000 + i);
  assert.equal(s.state, 'chart');
  s.closeChart();
  assert.ok(s.finished);
  const sum = s.summary();
  assert.equal(val(sum, 'positions'), 9);
  assert.equal(val(sum, 'double'), 1);
  assert.equal(val(sum, 'double_pct'), 11);
  assert.equal(val(sum, 'sep_max'), 2.8);
  assert.ok(sum.trials.every(function (x) { return !('tsx' in x); }));
  keysOk(dip, sum);
});

test('Diplopie-Karte: Doppelbilder in der Mitte werden erfasst', function () {
  const s = makeDip({}, 5);
  while (s.state === 'ask') {
    const t = s.current();
    if (t.hx === 0 && t.vy === 0) { s.answerDouble(); s.place(t.sx - 0.5, t.sy); s.confirm(10); } else s.answerSingle(10);
  }
  assert.equal(val(s.summary(), 'center_double'), 1);
});

// ---- Subjektive Vertikale -----------------------------------------------
function makeVert(over, seed) {
  const p = VT.sanitizeParams(vert, Object.assign(VT.defaultsOf(vert), over || {}));
  const s = new vert.VerticalSession(p, { rng: VT.makeRng(seed || 1) });
  s.startRun(0);
  return s;
}

test('Vertikale: Startseiten wechseln, Linie dreht zuerst auf die Senkrechte zu', function () {
  const s = makeVert({ method: 'rotating', speedDegS: 2, startMaxDeg: 25 }, 2);
  const a0 = s.angle, first = Math.sign(a0);
  assert.ok(Math.abs(a0) >= 15 && Math.abs(a0) <= 25);
  for (let t = 100; t <= 1000; t += 100) s.update(t);
  assert.ok(Math.abs(s.angle) < Math.abs(a0));
  assert.equal(Math.sign(s.angle), first);
  s.confirm(1000);
  assert.equal(Math.sign(s.angle), -first, 'nächster Start von der anderen Seite');
});

test('Vertikale: Linie läuft durch die Senkrechte und kehrt bei ±45° um', function () {
  const s = makeVert({ method: 'rotating', speedDegS: 6, startMaxDeg: 10 }, 3);
  let minA = 0, maxA = 0;
  for (let t = 100; t <= 40000; t += 100) { s.update(t); minA = Math.min(minA, s.angle); maxA = Math.max(maxA, s.angle); }
  assert.ok(minA >= -45 - 1e-9 && maxA <= 45 + 1e-9);
  assert.ok(minA < -30 && maxA > 30);
});

test('Vertikale: Verfahren „Einstellen“ dreht nicht von selbst, nudge begrenzt', function () {
  const s = makeVert({ method: 'adjust' }, 4);
  const a = s.angle;
  s.update(5000);
  assert.equal(s.angle, a);
  assert.ok(Math.abs(s.nudge(1).angle - (a + 1)) < 0.001);
  for (let i = 0; i < 100; i++) s.nudge(5);
  assert.equal(s.angle, 45);
  assert.equal(makeVert({ method: 'rotating' }).nudge(1), null);
});

test('Vertikale: Kennzahlen aus gesetzten Winkeln', function () {
  const s = makeVert({ method: 'adjust', trials: 4 }, 6);
  [1, 3, -1, 1].forEach(function (a, i) { s.angle = a; s.confirm(1000 * (i + 1)); });
  assert.ok(s.finished);
  const sum = s.summary();
  assert.equal(val(sum, 'n'), 4);
  assert.equal(val(sum, 'dev_mean'), 1);
  assert.equal(val(sum, 'dev_abs'), 1.5);
  assert.equal(val(sum, 'dev_sd'), 1.63);
  const starts = s.trials.map(function (t) { return Math.sign(t.start_deg); });
  assert.deepEqual([starts[0], starts[1], starts[2], starts[3]], [starts[0], -starts[0], starts[0], -starts[0]]);
  assert.ok(Number.isFinite(val(sum, 'hysteresis')));
  keysOk(vert, sum);
});

// ---- Orts-Projektion ----------------------------------------------------
function makeProj(over, seed) {
  const p = VT.sanitizeParams(proj, Object.assign(VT.defaultsOf(proj), over || {}));
  const s = new proj.ProjectionSession(p, { rng: VT.makeRng(seed || 1), fieldWcm: 60, fieldHcm: 34, calib: calib50 });
  s.start(0);
  return s;
}

test('Projektion: Phasen und Zeiten, Antwort nur in der Antwortphase', function () {
  const s = makeProj({ flashMs: 300, delayMs: 500, feedback: 'yes' });
  assert.equal(s.phase, 'fix');
  assert.equal(s.respond(1, 1, 100), null);
  s.update(699); assert.equal(s.phase, 'fix');
  s.update(700); assert.equal(s.phase, 'flash');
  s.update(1000); assert.equal(s.phase, 'delay');
  s.update(1499); assert.equal(s.phase, 'delay');
  s.update(1500); assert.equal(s.phase, 'respond');
  assert.equal(s.respond(5, 5, 2000).type, 'recorded');
  assert.equal(s.phase, 'feedback');
  s.update(2799); assert.equal(s.phase, 'feedback');
  s.update(2800); assert.equal(s.phase, 'fix');
  const n = makeProj({ delayMs: 0, feedback: 'no' });
  n.update(700); n.update(1000);
  assert.equal(n.phase, 'respond');
  n.respond(1, 1, 1100);
  n.update(1300);
  assert.equal(n.phase, 'fix');
});

test('Projektion: Fehlervektor mit Vorzeichen und Kennzahlen', function () {
  const s = makeProj({ trials: 6, delayMs: 0 }, 2);
  let t = 0;
  for (let i = 0; i < 6; i++) {
    s.update(t + 700); s.update(t + 1000);
    const g = s.target;
    // Antwort 1 cm rechts und 2 cm unterhalb des Ziels
    s.respond(g.x + 1, g.y + 2, t + 1400);
    s.update(t + 1400 + 800);
    t += 2300;
  }
  assert.ok(s.finished);
  const tr = s.trials[0];
  assert.equal(tr.err_x_cm, 1);
  assert.equal(tr.err_up_cm, -2);
  assert.equal(tr.err_cm, 2.24);
  const sum = s.summary();
  assert.equal(val(sum, 'bias_x'), 1);
  assert.equal(val(sum, 'bias_y'), -2);
  assert.equal(val(sum, 'err_mean'), 2.24);
  assert.equal(val(sum, 'scatter'), 0);
  assert.ok(val(sum, 'err_deg') > 2 && val(sum, 'err_deg') < 3);
  assert.equal(val(sum, 'rt_mean'), 400);
  keysOk(proj, sum);
});

test('Projektion: Ziele liegen im Feld, Peripherie-Zone hält Abstand zur Mitte', function () {
  const s = makeProj({ zone: 'periphery' }, 7);
  for (let i = 0; i < 200; i++) {
    const g = s.pick();
    assert.ok(g.x >= 2 && g.x <= 58 && g.y >= 2 && g.y <= 32);
    const u = (g.x - 30) / 30, v = (g.y - 17) / 17;
    assert.ok(Math.sqrt(u * u + v * v) >= 0.6 - 1e-9);
  }
});

// Gaze-Raster-Plausibilität für die Hess-Konvention
test('Konvention: Blickwinkel nach oben = positive Höhe, Bildschirm-y nimmt dabei ab', function () {
  const g = G.fit(50, G.nineGrid(15), 80, 60, 1.5).points;
  const top = g.find(function (p) { return p.vy > 0 && p.hx === 0; }), center = g.find(function (p) { return p.hx === 0 && p.vy === 0; });
  assert.ok(top.sy < center.sy);
});
