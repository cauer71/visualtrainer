// Rauchtest der Darstellungs-Funktionen aller Übungen mit einem Fake-Canvas (kein Browser, keine Netzwerkzugriffe).
// Prüft: kein Laufzeitfehler beim Zeichnen und Verarbeiten von Eingaben, saubere Aufräumung, gültige Zusammenfassung.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const VT = require('../lib/core.js');

const root = path.join(__dirname, '..');
fs.readdirSync(path.join(root, 'ex')).filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) { require('../ex/' + f); });

// ---- Fake-Umgebung ------------------------------------------------------
let rafQueue = [], rafId = 0, cancelled = new Set();
global.requestAnimationFrame = function (fn) { const id = ++rafId; rafQueue.push({ id: id, fn: fn }); return id; };
global.cancelAnimationFrame = function (id) { cancelled.add(id); };
const windowListeners = {};
global.window = {
  addEventListener: function (t, f) { (windowListeners[t] = windowListeners[t] || []).push(f); },
  removeEventListener: function (t, f) { windowListeners[t] = (windowListeners[t] || []).filter(function (x) { return x !== f; }); }
};

function makeCtx(log) {
  return new Proxy({}, {
    get: function (target, prop) {
      if (prop in target) return target[prop];
      if (prop === 'measureText') return function () { return { width: 10 }; };
      return function () { log.calls++; };
    },
    set: function (target, prop, value) { target[prop] = value; return true; }
  });
}
function makeEnv(W, H) {
  const listeners = {};
  const canvas = {
    addEventListener: function (t, f) { (listeners[t] = listeners[t] || []).push(f); },
    removeEventListener: function (t, f) { listeners[t] = (listeners[t] || []).filter(function (x) { return x !== f; }); },
    getBoundingClientRect: function () { return { left: 0, top: 0, width: W, height: H }; },
    setPointerCapture: function () {}
  };
  const log = { calls: 0 };
  let clock = 1000;
  const env = {
    canvas: canvas, ctx: makeCtx(log), width: W, height: H,
    calib: VT.makeCalib({ pxPerCm: 38, viewDistanceCm: 60 }),
    rng: VT.makeRng(123), audio: { beep: function () {}, ensure: function () {} },
    now: function () { return clock; }
  };
  return { env: env, listeners: listeners, log: log, advance: function (ms) { clock += ms; }, clock: function () { return clock; } };
}
function fire(listeners, type, x, y, extra) {
  (listeners[type] || []).slice().forEach(function (f) {
    f(Object.assign({ clientX: x, clientY: y, pointerId: 1, key: ' ', preventDefault: function () {} }, extra || {}));
  });
}
function frames(h, n, stepMs, onFrame) {
  for (let i = 0; i < n; i++) {
    h.advance(stepMs);
    const q = rafQueue; rafQueue = [];
    q.forEach(function (e) { if (!cancelled.has(e.id)) e.fn(); });
    if (onFrame) onFrame(i);
    if (!rafQueue.length) break;
  }
}
const SHORT = {
  spots: { durationS: 10 }, saccade: { durationS: 10, bpm: 140 }, sequence: { maxErrors: 1 }, ordering: { count: 3 },
  choice: { trials: 10, stimulusMs: 300, waitMinMs: 300, waitMaxMs: 300 }, sprint: { trials: 5, minDelayMs: 500, maxDelayMs: 500 },
  flash: { trials: 5 }, periphery: { trials: 8 }, dual: { durationS: 20 }, chart: { rows: 1, cols: 2, groupSize: 2 },
  wordbuild: { words: 3, wordLength: 3 }, findchars: { rounds: 1, rows: 2, cols: 3 }, rotation: { trials: 6 }, follow: { durationS: 10 },
  fusion: { glassesCheck: 'no', repeats: 1 }, stereo: { glassesCheck: 'no', trials: 12 }, directions: { trials: 10 }, orient: { trials: 8, waitMs: 500 },
  balancetouch: { durationS: 20 }, slalom: { durationS: 20 }, invaders: { durationS: 20 }, hess: { glassesCheck: 'no', grid: 'inner', passes: 'one' },
  worth: { glassesCheck: 'no', repeats: 2 }, schober: { glassesCheck: 'no' }, diplopia: { glassesCheck: 'no' }, vertical: { trials: 4 }, projection: { trials: 6 }
};

const finishedIds = [];
VT.list().forEach(function (ex) {
  test('Darstellung ' + ex.id + ': zeichnet, verarbeitet Eingaben, räumt auf', function () {
    rafQueue = []; cancelled = new Set();
    const h = makeEnv(1280, 720);
    const p = VT.sanitizeParams(ex, Object.assign(VT.defaultsOf(ex), SHORT[ex.id] || {}));
    let summary = null;
    const handle = ex.run(h.env, p, function (s) { summary = s; });
    assert.ok(handle && typeof handle.stop === 'function');
    const rng = VT.makeRng(77);
    frames(h, 4000, 16, function (i) {
      // abwechselnd Berührungen an zufälligen Stellen und in der Bildschirmmitte
      if (i % 5 === 0) {
        const x = rng() * 1280, y = rng() * 720;
        fire(h.listeners, 'pointerdown', x, y);
        fire(h.listeners, 'pointermove', x + 5, y + 5);
        if (i % 10 === 0) { fire(h.listeners, 'pointerup', x, y); fire(windowListeners, 'pointerup', x, y); }
      }
      if (i % 37 === 0) fire(h.listeners, 'pointerdown', 640, 360);
      if (i % 53 === 0) fire(windowListeners, 'keydown', 0, 0, { key: ' ' });
    });
    assert.ok(h.log.calls > 100, 'es wurde gezeichnet');
    if (summary) {
      finishedIds.push(ex.id);
      assert.ok(Array.isArray(summary.metrics) && Array.isArray(summary.trials));
      summary.metrics.forEach(function (m) {
        assert.ok(m.key && m.label, 'Kennzahl ohne Beschriftung');
        assert.ok(ex.metricKeys.indexOf(m.key) >= 0, 'nicht dokumentierte Kennzahl ' + m.key);
        assert.ok(m.value === null || typeof m.value === 'number', m.key + ' Wert');
        if (typeof m.value === 'number') assert.ok(Number.isFinite(m.value), m.key + ' endlich');
      });
    }
    handle.stop();
    assert.equal((h.listeners.pointerdown || []).length, 0, 'Eingabe-Handler entfernt');
    assert.equal((windowListeners.pointerup || []).length, 0, 'Fenster-Handler entfernt');
    assert.equal((windowListeners.keydown || []).length, 0, 'Tastatur-Handler entfernt');
  });
});

test('Kleine Bildschirme (Handy) lassen keine Übung abstürzen', function () {
  VT.list().forEach(function (ex) {
    rafQueue = []; cancelled = new Set();
    const h = makeEnv(360, 640);
    const p = VT.sanitizeParams(ex, Object.assign(VT.defaultsOf(ex), SHORT[ex.id] || {}));
    const handle = ex.run(h.env, p, function () {});
    frames(h, 300, 16, function (i) { if (i % 7 === 0) fire(h.listeners, 'pointerdown', (i * 31) % 360, (i * 57) % 640); });
    handle.stop();
  });
});

test('Mindestens die Hälfte der Übungen läuft im Rauchtest bis zum Ergebnis durch', function () {
  console.log('# bis zum Ergebnis gelaufen: ' + finishedIds.join(', '));
  assert.ok(finishedIds.length >= 8, 'nur ' + finishedIds.length);
});

test('Darstellung sprint: voller Ablauf mit gezielten Eingaben (Startfläche halten, loslassen, Ziel berühren)', function () {
  const ex = VT.get('sprint');
  rafQueue = []; cancelled = new Set();
  const h = makeEnv(1280, 720);
  const p = VT.sanitizeParams(ex, Object.assign(VT.defaultsOf(ex), { trials: 5, minDelayMs: 500, maxDelayMs: 500, distanceCm: 10 }));
  let summary = null;
  const handle = ex.run(h.env, p, function (s) { summary = s; });
  const px = 38, W = 1280 / px, H = 720 / px;
  const homeY = Math.max(H - 1.8 - 1, H * 0.8) * px;
  const targetY = (Math.max(H - 1.8 - 1, H * 0.8) - 10) * px;
  for (let i = 0; i < 5; i++) {
    fire(h.listeners, 'pointerdown', (W / 2) * px, homeY, { pointerId: 7 });
    frames(h, 40, 16);                                   // warten, bis das Ziel aufleuchtet
    fire(windowListeners, 'pointerup', (W / 2) * px, homeY, { pointerId: 7 });
    h.advance(120);
    fire(h.listeners, 'pointerdown', (W / 2) * px, targetY, { pointerId: 8 });
    frames(h, 3, 16);
  }
  assert.ok(summary, 'Ergebnis liegt vor');
  assert.equal(summary.metrics.find(function (m) { return m.key === 'hits'; }).value, 5);
  assert.equal(summary.trials.length, 5);
  assert.equal((windowListeners.pointerup || []).length, 0, 'Fenster-Handler entfernt');
  handle.stop();
});

test('Brillentest: Seite wechseln, Helligkeit ändern, „Weiter“ startet die Übung', function () {
  ['fusion', 'stereo', 'hess', 'worth', 'schober', 'diplopia'].forEach(function (id) {
    const ex = VT.get(id);
    rafQueue = []; cancelled = new Set();
    const h = makeEnv(1280, 720);
    const p = VT.sanitizeParams(ex, Object.assign(VT.defaultsOf(ex), SHORT[id] || {}, { glassesCheck: 'yes' }));
    const handle = ex.run(h.env, p, function () {});
    frames(h, 5, 16);
    const drawnCheck = h.log.calls;
    assert.ok(drawnCheck > 20, id + ': Brillentest gezeichnet');
    [[300, 720 - 120 - 64 + 20], [100, 720 - 120 + 20], [330, 720 - 120 + 20], [950, 720 - 120 + 20], [1180, 720 - 120 + 20]].forEach(function (pt) { fire(h.listeners, 'pointerdown', pt[0], pt[1]); });
    frames(h, 3, 16);
    fire(h.listeners, 'pointerdown', 640, 720 - 30);
    frames(h, 20, 16);
    assert.ok(h.log.calls > drawnCheck, id + ': Übung läuft nach dem Brillentest');
    handle.stop();
    assert.equal((h.listeners.pointerdown || []).length, 0, id + ': Handler entfernt');
  });
});
