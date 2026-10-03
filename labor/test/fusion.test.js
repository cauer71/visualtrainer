const test = require('node:test');
const assert = require('node:assert/strict');
const VT = require('../lib/core.js');
const fusion = require('../ex/fusion.js');
const { FusionSession } = fusion;

function make(over) {
  const p = VT.sanitizeParams(fusion, Object.assign(VT.defaultsOf(fusion), over || {}));
  const s = new FusionSession(p);
  s.start(0);
  return s;
}
/** Läuft in 100-ms-Schritten bis time und gibt die letzte Zeit zurück. */
function run(s, from, to) { let t = from; while (t < to) { t += 100; s.update(t); } return t; }

test('Reihenfolge der Richtungen und Zahl der Durchgänge', function () {
  assert.deepEqual(make({ mode: 'both', repeats: 2 }).order, ['convergence', 'divergence', 'convergence', 'divergence']);
  assert.deepEqual(make({ mode: 'divergence', repeats: 3 }).order, ['divergence', 'divergence', 'divergence']);
});

test('Ablauf: Wartezeit, Anstieg, Bruch, Rückgang, Erholung', function () {
  const s = make({ rampPdPerS: 1.5, mode: 'convergence', repeats: 1 });
  assert.equal(s.phase, 'ready');
  s.update(1499); assert.equal(s.phase, 'ready');
  s.update(1500); assert.equal(s.phase, 'up');
  assert.equal(s.disp, 0);
  let t = run(s, 1500, 3500);                     // 2 s Anstieg bei 1,5 Δ/s
  assert.ok(Math.abs(s.disp - 3) < 1e-9);
  const b = s.reportDouble();
  assert.equal(b.type, 'break');
  assert.ok(Math.abs(b.pd - 3) < 1e-9);
  assert.equal(s.phase, 'down');
  assert.equal(s.reportDouble(), null);
  t = run(s, t, t + 1000);                        // 1 s Rückgang
  assert.ok(Math.abs(s.disp - 1.5) < 1e-9);
  const r = s.reportSingle(t);
  assert.equal(r.type, 'recovery');
  assert.ok(s.finished);
  assert.equal(s.trials[0].direction, 'convergence');
  assert.ok(Math.abs(s.trials[0].break_pd - 3) < 0.01 && Math.abs(s.trials[0].recovery_pd - 1.5) < 0.01);
});

test('Obergrenze: ohne Bruch bis zum Limit, danach automatischer Rückgang', function () {
  const s = make({ rampPdPerS: 6, maxPd: 5, mode: 'convergence', repeats: 1 });
  s.update(1500);
  let t = run(s, 1500, 3000);
  assert.equal(s.phase, 'down');
  assert.equal(s.breakPd, 5);
  assert.equal(s.capped, true);
  t = run(s, t, t + 2000);                        // geht ohne Meldung bis 0 zurück
  assert.ok(s.finished);
  assert.equal(s.trials[0].capped, 1);
  assert.equal(s.trials[0].no_recovery, 1);
  assert.equal(s.trials[0].break_pd, 5);
});

test('Meldungen außerhalb der passenden Phase werden ignoriert, Unterdrückung zählt', function () {
  const s = make({ mode: 'convergence', repeats: 2 });
  assert.equal(s.reportDouble(), null, 'noch Wartezeit');
  assert.equal(s.reportSingle(100), null);
  assert.equal(s.reportSuppression().type, 'suppression');
  s.update(1500); run(s, 1500, 2000);
  s.reportSuppression();
  s.reportDouble();
  s.reportSingle(2500);
  assert.equal(s.trials[0].suppression, 2);
  assert.equal(s.suppressionNow, 0, 'Zähler beginnt je Durchgang neu');
});

test('Kennzahlen: Mittel je Richtung', function () {
  const s = make({ rampPdPerS: 1, mode: 'both', repeats: 1 });
  s.update(1500);
  let t = run(s, 1500, 5500); s.reportDouble(); t = run(s, t, t + 1000); s.reportSingle(t);   // Konvergenz: Bruch 4, Erholung 3
  s.update(t + 1500); t = t + 1500;
  t = run(s, t, t + 6000); s.reportDouble(); t = run(s, t, t + 2000); s.reportSingle(t);       // Divergenz: Bruch 6, Erholung 4
  assert.ok(s.finished);
  const sum = s.summary();
  const get = function (k) { return sum.metrics.find(function (m) { return m.key === k; }).value; };
  assert.equal(get('trials'), 2);
  assert.equal(get('break_conv'), 4);
  assert.equal(get('rec_conv'), 3);
  assert.equal(get('break_div'), 6);
  assert.equal(get('rec_div'), 4);
  assert.equal(get('capped'), 0);
  sum.metrics.forEach(function (m) { assert.ok(fusion.metricKeys.indexOf(m.key) >= 0, m.key); });
});

test('Zeitsprünge werden begrenzt', function () {
  const s = make({ rampPdPerS: 2, mode: 'convergence', repeats: 1 });
  s.update(1500);
  s.update(100000);
  assert.ok(s.disp <= 0.2 + 1e-9);
});
