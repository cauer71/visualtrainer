/* Gemeinsame Basis: Registry, Kalibrierung (cm / Sehwinkel), Zufall, Statistik, CSV, Ergebnisspeicher, Audio.
 * Reiner Offline-Code, keine Netzwerkzugriffe. Läuft im Browser (window.VT) und in Node (require) für Tests. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(root);
  else root.VT = factory(root);
}(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  // ---- Übungs-Registry ------------------------------------------------------
  const registry = [];

  function register(ex) {
    if (!ex || !ex.id || typeof ex.createSession !== 'function' || !Array.isArray(ex.params)) {
      throw new Error('Ungültige Übungsdefinition');
    }
    if (registry.some(function (e) { return e.id === ex.id; })) throw new Error('Doppelte Übungs-ID: ' + ex.id);
    registry.push(ex);
    return ex;
  }
  function list() { return registry.slice(); }
  function get(id) { return registry.find(function (e) { return e.id === id; }); }

  // ---- Anleitungstexte (je Übung) und allgemeine Hilfe ----------------------
  const helpById = {};
  let generalHelp = null;
  function addHelp(id, h) {
    if (helpById[id]) throw new Error('Doppelte Anleitung: ' + id);
    helpById[id] = h;
    return h;
  }
  function getHelp(id) { return helpById[id] || null; }
  function setGeneralHelp(h) { generalHelp = h; }
  function getGeneralHelp() { return generalHelp; }

  // ---- Kalibrierung ---------------------------------------------------------
  // Alle Größen der Übungen sind in cm definiert; Umrechnung in Pixel und Sehwinkel über diese Funktion.
  function makeCalib(opts) {
    const pxPerCm = Number(opts && opts.pxPerCm);
    const dist = Number(opts && opts.viewDistanceCm);
    if (!(pxPerCm > 0) || !(dist > 0)) throw new Error('Ungültige Kalibrierung');
    return {
      pxPerCm: pxPerCm,
      viewDistanceCm: dist,
      cmToPx: function (cm) { return cm * pxPerCm; },
      pxToCm: function (px) { return px / pxPerCm; },
      cmToDeg: function (cm) { return 2 * Math.atan(cm / (2 * dist)) * 180 / Math.PI; },
      degToCm: function (deg) { return 2 * dist * Math.tan(deg * Math.PI / 360); }
    };
  }

  // ---- Zufall (mulberry32, mit Seed reproduzierbar) ------------------------
  function makeRng(seed) {
    let a = seed | 0;
    function next() {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    next.int = function (lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); };
    next.pick = function (arr) { return arr[Math.floor(next() * arr.length)]; };
    next.shuffle = function (arr) {
      const r = arr.slice();
      for (let i = r.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const tmp = r[i]; r[i] = r[j]; r[j] = tmp;
      }
      return r;
    };
    return next;
  }

  // ---- Statistik ------------------------------------------------------------
  function mean(a) { return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : null; }
  function median(a) {
    if (!a.length) return null;
    const s = a.slice().sort(function (x, y) { return x - y; });
    const m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  function sd(a) {
    if (a.length < 2) return null;
    const m = mean(a);
    return Math.sqrt(a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / (a.length - 1));
  }
  function round(x, d) {
    if (x == null || !isFinite(x)) return null;
    const f = Math.pow(10, d == null ? 1 : d);
    return Math.round(x * f) / f;
  }
  function metric(key, label, value, unit) { return { key: key, label: label, value: value, unit: unit || '' }; }

  // ---- CSV (Semikolon-getrennt, für deutsches Excel) -----------------------
  function toCSV(rows, columns) {
    const cols = columns || (rows.length ? Object.keys(rows[0]) : []);
    function esc(v) {
      if (v == null) return '';
      const s = String(v);
      return /[;"\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    const lines = [cols.join(';')];
    rows.forEach(function (r) { lines.push(cols.map(function (c) { return esc(r[c]); }).join(';')); });
    return lines.join('\r\n');
  }

  // ---- Parameter ------------------------------------------------------------
  function defaultsOf(ex) {
    const o = {};
    ex.params.forEach(function (p) { o[p.key] = p.default; });
    return o;
  }
  function sanitizeParams(ex, values) {
    const out = {};
    ex.params.forEach(function (p) {
      let v = values && values[p.key] !== undefined ? values[p.key] : p.default;
      if (p.type === 'number') {
        v = Number(v);
        if (!isFinite(v)) v = p.default;
        v = Math.min(p.max, Math.max(p.min, v));
      } else if (p.type === 'select') {
        v = String(v);
        if (!p.options.some(function (o) { return o.value === v; })) v = p.default;
      }
      out[p.key] = v;
    });
    return out;
  }

  // ---- Ergebnisspeicher (localStorage, mit Speicher-Fallback) --------------
  const KEY = 'vt.results.v1';
  const MAX_RESULTS = 100;
  let memory = [];

  function storage() { try { return root.localStorage || null; } catch (e) { return null; } }
  function loadResults() {
    const st = storage();
    if (!st) return memory.slice();
    try {
      const s = st.getItem(KEY);
      return s ? JSON.parse(s) : [];
    } catch (e) { return memory.slice(); }
  }
  function saveResult(r) {
    const all = loadResults();
    all.push(r);
    while (all.length > MAX_RESULTS) all.shift();
    memory = all.slice();
    const st = storage();
    if (st) { try { st.setItem(KEY, JSON.stringify(all)); } catch (e) { /* Speicher voll/gesperrt: nur im RAM */ } }
    return all.length;
  }
  function clearResults() {
    memory = [];
    const st = storage();
    if (st) { try { st.removeItem(KEY); } catch (e) { /* ignorieren */ } }
  }

  // ---- Audio (WebAudio, nur nach Nutzeraktion) -----------------------------
  function createAudio() {
    let ac = null;
    function ensure() {
      if (!ac) {
        const C = root.AudioContext || root.webkitAudioContext;
        if (C) ac = new C();
      }
      if (ac && ac.state === 'suspended') ac.resume();
      return ac;
    }
    function beep(freq, ms, vol) {
      const a = ensure();
      if (!a) return;
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = 'sine';
      o.frequency.value = freq || 880;
      g.gain.value = vol == null ? 0.2 : vol;
      o.connect(g);
      g.connect(a.destination);
      o.start();
      o.stop(a.currentTime + (ms || 60) / 1000);
    }
    return { ensure: ensure, beep: beep };
  }

  return {
    register: register, list: list, get: get,
    addHelp: addHelp, getHelp: getHelp, setGeneralHelp: setGeneralHelp, getGeneralHelp: getGeneralHelp,
    makeCalib: makeCalib, makeRng: makeRng,
    mean: mean, median: median, sd: sd, round: round, metric: metric,
    toCSV: toCSV, defaultsOf: defaultsOf, sanitizeParams: sanitizeParams,
    loadResults: loadResults, saveResult: saveResult, clearResults: clearResults,
    createAudio: createAudio
  };
}));
