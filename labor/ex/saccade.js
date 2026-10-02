/* Übung „Takt-Sakkaden“: Ein Zeichen springt im Takt eines Metronoms zwischen festen Punkten (z. B. den vier Ecken).
 * Der Blick folgt dem Zeichen, das laut gelesen wird. Optional muss das Zeichen im Takt berührt werden.
 * Trainiert schnelle, rhythmische Blickwechsel (Sakkaden). Eigene Implementierung nach dem allgemein bekannten Prinzip. */
(function (root, factory) {
  const VT = (typeof module === 'object' && module.exports) ? require('../lib/core.js') : root.VT;
  const ex = factory(VT);
  if (typeof module === 'object' && module.exports) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'bpm', label: 'Takt (Schläge pro Minute)', type: 'number', min: 20, max: 140, step: 2, default: 60 },
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 10, max: 300, step: 5, default: 60 },
    { key: 'sizeCm', label: 'Zeichenhöhe (cm)', type: 'number', min: 1, max: 12, step: 0.5, default: 3 },
    { key: 'pattern', label: 'Anordnung', type: 'select', default: 'corners4', options: [
      { value: 'corners4', label: 'Vier Ecken' },
      { value: 'corners5', label: 'Vier Ecken und Mitte' },
      { value: 'horizontal', label: 'Links und rechts' },
      { value: 'vertical', label: 'Oben und unten' },
      { value: 'grid9', label: 'Raster 3 × 3' }] },
    { key: 'order', label: 'Reihenfolge', type: 'select', default: 'cycle', options: [
      { value: 'cycle', label: 'Der Reihe nach' }, { value: 'random', label: 'Zufällig' }] },
    { key: 'symbols', label: 'Zeichen', type: 'select', default: 'digits', options: [
      { value: 'digits', label: 'Ziffern' }, { value: 'letters', label: 'Buchstaben' }, { value: 'syllables', label: 'Silben' }] },
    { key: 'touch', label: 'Berühren im Takt', type: 'select', default: 'no', options: [
      { value: 'no', label: 'Nein (nur lesen)' }, { value: 'yes', label: 'Ja' }] },
    { key: 'sound', label: 'Metronom-Ton', type: 'select', default: 'yes', options: [
      { value: 'yes', label: 'An' }, { value: 'no', label: 'Aus' }] }
  ];

  const SLACK_CM = 0.5;
  const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');
  const CONSONANTS = 'BDFGKLMNPRSTVZ'.split('');
  const VOWELS = 'AEIOU'.split('');

  const PATTERNS = {
    corners4: [[0, 0], [1, 0], [1, 1], [0, 1]],
    corners5: [[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]],
    horizontal: [[0, 0.5], [1, 0.5]],
    vertical: [[0.5, 0], [0.5, 1]],
    grid9: [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5], [0, 0.5], [0, 1], [0.5, 1], [1, 1]]
  };

  function beatIntervalMs(bpm) { return 60000 / bpm; }

  function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }

  function randomSymbol(kind, rng) {
    if (kind === 'letters') return rng.pick(LETTERS);
    if (kind === 'syllables') return rng.pick(CONSONANTS) + rng.pick(VOWELS);
    return String(rng.int(1, 9));
  }

  /** Reine Taktlogik. Zeiten in ms, Koordinaten in cm. env: { rng, fieldWcm, fieldHcm, calib? } */
  class BeatSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.calib = env.calib || null;
      this.interval = beatIntervalMs(p.bpm);
      this.totalBeats = Math.floor(p.durationS * p.bpm / 60);
      const margin = p.sizeCm / 2 + 0.5;
      const W = env.fieldWcm, H = env.fieldHcm;
      this.points = PATTERNS[p.pattern].map(function (f) {
        return { x: margin + f[0] * Math.max(0, W - 2 * margin), y: margin + f[1] * Math.max(0, H - 2 * margin) };
      });
      this.startedAt = null;
      this.nextBeatAt = null;
      this.beatIndex = 0;
      this.current = null;
      this.prevPoint = -1;
      this.prevSymbol = null;
      this.trials = [];
      this.strayTaps = 0;
      this.finished = false;
    }

    start(now) {
      this.startedAt = now;
      this.nextBeatAt = now + this.interval; // erster Schlag nach einer Taktlänge (Vorlauf)
    }

    isOver(now) { return this.finished || (this.startedAt != null && this.beatIndex >= this.totalBeats && now >= this.nextBeatAt); }

    pickPoint() {
      const n = this.points.length;
      if (this.p.order === 'cycle') return this.beatIndex % n;
      let i;
      do { i = Math.floor(this.rng() * n); } while (n > 1 && i === this.prevPoint);
      return i;
    }

    pickSymbol() {
      let s;
      do { s = randomSymbol(this.p.symbols, this.rng); } while (s === this.prevSymbol);
      return s;
    }

    closeCurrent() {
      if (!this.current) return;
      const c = this.current;
      this.trials.push({
        beat: c.index + 1, symbol: c.symbol, x_cm: VT.round(c.x, 2), y_cm: VT.round(c.y, 2),
        touched: c.touchedAt != null ? 1 : 0,
        latency_ms: c.touchedAt != null ? Math.round(c.touchedAt - c.at) : null
      });
      this.current = null;
    }

    /** Liefert die in diesem Aufruf ausgelösten Schläge (meist 0 oder 1). */
    update(now) {
      const events = [];
      if (this.startedAt == null || this.finished) return events;
      while (this.beatIndex < this.totalBeats && now >= this.nextBeatAt) {
        this.closeCurrent();
        const pi = this.pickPoint();
        const pt = this.points[pi];
        const symbol = this.pickSymbol();
        this.current = { index: this.beatIndex, at: this.nextBeatAt, x: pt.x, y: pt.y, symbol: symbol, touchedAt: null };
        this.prevPoint = pi;
        this.prevSymbol = symbol;
        events.push({ index: this.beatIndex, x: pt.x, y: pt.y, symbol: symbol, at: this.nextBeatAt });
        this.beatIndex++;
        this.nextBeatAt += this.interval;
      }
      if (this.beatIndex >= this.totalBeats && now >= this.nextBeatAt) {
        this.closeCurrent();
        this.finished = true;
      }
      return events;
    }

    tap(x, y, now) {
      if (this.p.touch !== 'yes' || this.finished || !this.current) return null;
      const c = this.current;
      if (c.touchedAt == null && dist(x, y, c.x, c.y) <= this.p.sizeCm / 2 + SLACK_CM) {
        c.touchedAt = now;
        return { type: 'hit', latency: now - c.at };
      }
      this.strayTaps++;
      return { type: 'stray' };
    }

    maxAmplitudeCm() {
      let m = 0;
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          m = Math.max(m, dist(this.points[i].x, this.points[i].y, this.points[j].x, this.points[j].y));
        }
      }
      return m;
    }

    summary() {
      const m = VT.metric;
      const amp = this.maxAmplitudeCm();
      const metrics = [
        m('beats', 'Gezeigte Schläge', this.trials.length),
        m('bpm', 'Takt', this.p.bpm, 'bpm'),
        m('amp_cm', 'Größte Blicksprung-Strecke', VT.round(amp, 1), 'cm')
      ];
      if (this.calib) metrics.push(m('amp_deg', 'Größte Blicksprung-Strecke (Sehwinkel)', VT.round(this.calib.cmToDeg(amp), 1), '°'));
      if (this.p.touch === 'yes') {
        const hits = this.trials.filter(function (t) { return t.touched; });
        const lat = hits.map(function (t) { return t.latency_ms; });
        metrics.push(
          m('hits', 'Im Takt berührt', hits.length),
          m('misses', 'Nicht berührt', this.trials.length - hits.length),
          m('stray', 'Fehltipps (daneben)', this.strayTaps),
          m('accuracy', 'Trefferquote', this.trials.length ? VT.round(100 * hits.length / this.trials.length, 1) : null, '%'),
          m('lat_mean', 'Verzögerung nach Schlag (Mittel)', VT.round(VT.mean(lat), 0), 'ms'),
          m('lat_sd', 'Verzögerung (Streuung)', VT.round(VT.sd(lat), 0), 'ms')
        );
      }
      return { metrics: metrics, trials: this.trials.slice() };
    }
  }

  function run(env, p, finish) {
    const ctx = env.ctx;
    const px = env.calib.pxPerCm;
    const W = env.width, H = env.height;
    const session = new BeatSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px, calib: env.calib });
    let raf = 0, stopped = false, shown = null;

    function onDown(ev) {
      ev.preventDefault();
      const rect = env.canvas.getBoundingClientRect();
      session.tap((ev.clientX - rect.left) / px, (ev.clientY - rect.top) / px, env.now());
    }
    function stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      const events = session.update(now);
      if (events.length) {
        shown = events[events.length - 1];
        if (p.sound === 'yes') env.audio.beep(880, 50, 0.15);
      }
      ctx.fillStyle = '#101418';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#26303b';
      session.points.forEach(function (pt) {
        ctx.beginPath();
        ctx.arc(pt.x * px, pt.y * px, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      if (shown && !session.finished) {
        ctx.fillStyle = '#f2f5f7';
        ctx.font = 'bold ' + Math.round(p.sizeCm * px / 0.72) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(shown.symbol, shown.x * px, shown.y * px);
      }
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#5b6673';
      ctx.font = '16px sans-serif';
      ctx.fillText(Math.max(0, session.totalBeats - session.beatIndex) + ' Schläge', 16, 28);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }

    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'saccade',
    title: 'Takt-Sakkaden',
    group: 'Blicksteuerung und Lesen',
    summary: 'Ein Zeichen springt im Metronom-Takt zwischen festen Punkten.',
    headline: ['beats', 'accuracy'],
    metricKeys: ['beats', 'bpm', 'amp_cm', 'amp_deg', 'hits', 'misses', 'stray', 'accuracy', 'lat_mean', 'lat_sd'],
    params: params,
    createSession: function (p, env) { return new BeatSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run,
    BeatSession: BeatSession,
    beatIntervalMs: beatIntervalMs
  });
}));
