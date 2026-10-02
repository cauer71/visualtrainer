/* Übung „Buchstabentafel“: Gruppen aus Buchstaben (oder Ziffern) stehen im Raster; eine Markierung führt Schritt für Schritt
 * durch die Tafel, jedes markierte Zeichen wird laut gelesen. Selbst getaktet (Tippen) oder im Metronom-Takt.
 * Trainiert Blicksprünge, Lesefluss und das Erkennen im Gedränge (Crowding). Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'rows', label: 'Zeilen (Gruppen)', type: 'number', min: 1, max: 8, step: 1, default: 4 },
    { key: 'cols', label: 'Spalten (Gruppen)', type: 'number', min: 1, max: 8, step: 1, default: 4 },
    { key: 'groupSize', label: 'Zeichen je Gruppe', type: 'number', min: 1, max: 6, step: 1, default: 3 },
    { key: 'symbols', label: 'Zeichen', type: 'select', default: 'letters', options: [{ value: 'letters', label: 'Buchstaben' }, { value: 'digits', label: 'Ziffern' }] },
    { key: 'sizeCm', label: 'Zeichenhöhe (cm)', type: 'number', min: 0.8, max: 8, step: 0.2, default: 2 },
    { key: 'letterGapCm', label: 'Abstand zwischen Zeichen einer Gruppe (cm)', type: 'number', min: 0, max: 3, step: 0.1, default: 0.4 },
    { key: 'groupGapCm', label: 'Abstand zwischen Gruppen (cm)', type: 'number', min: 0.5, max: 10, step: 0.5, default: 3 },
    { key: 'order', label: 'Leseordnung', type: 'select', default: 'groups', options: [
      { value: 'groups', label: 'Gruppe für Gruppe' }, { value: 'letterwise', label: 'Erst alle ersten Zeichen, dann alle zweiten …' }] },
    { key: 'pace', label: 'Tempo', type: 'select', default: 'self', options: [
      { value: 'self', label: 'Selbst bestimmt (Tippen = weiter)' }, { value: 'beat', label: 'Metronom-Takt' }] },
    { key: 'bpm', label: 'Takt (Schläge pro Minute, nur Metronom)', type: 'number', min: 20, max: 140, step: 2, default: 60 }
  ];

  const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');
  const DIGITS = '123456789'.split('');
  const ADVANCE = 0.75; // Zeichenbreite im Verhältnis zur Höhe

  /** Reine Berechnung der Zeichenpositionen (cm). Verkleinert automatisch, wenn die Tafel nicht ins Feld passt. */
  function layoutChart(p, W, H) {
    const adv = p.sizeCm * ADVANCE;
    const gw = p.groupSize * adv + (p.groupSize - 1) * p.letterGapCm;
    const totalW = p.cols * gw + (p.cols - 1) * p.groupGapCm;
    const totalH = p.rows * p.sizeCm + (p.rows - 1) * p.groupGapCm;
    const scale = Math.min(1, (W * 0.96) / totalW, (H * 0.88) / totalH);
    const s = scale;
    const x0 = (W - totalW * s) / 2, y0 = (H - totalH * s) / 2;
    const letters = [];
    for (let r = 0; r < p.rows; r++) {
      for (let c = 0; c < p.cols; c++) {
        const g = r * p.cols + c;
        for (let k = 0; k < p.groupSize; k++) {
          letters.push({
            g: g, k: k,
            x: x0 + (c * (gw + p.groupGapCm) + k * (adv + p.letterGapCm) + adv / 2) * s,
            y: y0 + (r * (p.sizeCm + p.groupGapCm) + p.sizeCm / 2) * s
          });
        }
      }
    }
    return { letters: letters, scale: scale, fits: scale >= 1 - 1e-9, totalW: totalW, totalH: totalH };
  }

  /** Reine Logik. Zeiten in ms. */
  class ChartSession {
    constructor(p, env) {
      this.p = p;
      const pool = p.symbols === 'digits' ? DIGITS : LETTERS;
      const groups = p.rows * p.cols;
      this.groups = [];
      for (let g = 0; g < groups; g++) this.groups.push(env.rng.shuffle(pool).slice(0, Math.min(p.groupSize, pool.length)));
      this.steps = [];
      if (p.order === 'letterwise') {
        for (let k = 0; k < p.groupSize; k++) for (let g = 0; g < groups; g++) this.steps.push({ g: g, k: k });
      } else {
        for (let g = 0; g < groups; g++) for (let k = 0; k < p.groupSize; k++) this.steps.push({ g: g, k: k });
      }
      this.pos = -1;            // -1 = noch nicht gestartet
      this.stamps = [];         // Zeitpunkt, an dem Schritt i begann
      this.interval = 60000 / p.bpm;
      this.nextBeatAt = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
      this.beatPending = false;
    }

    symbolAt(step) { return this.groups[step.g][step.k]; }
    current() { return this.pos >= 0 && this.pos < this.steps.length ? this.steps[this.pos] : null; }

    start(now) {
      if (this.p.pace === 'beat') { this.startedAt = now; this.nextBeatAt = now + this.interval; }
    }

    /** Selbst getaktet: erstes Tippen startet, jedes weitere schließt den aktuellen Schritt ab. */
    advance(now) {
      if (this.finished || this.p.pace !== 'self') return null;
      if (this.pos === -1) { this.startedAt = now; this.pos = 0; this.stamps.push(now); return { type: 'started' }; }
      this.pos++;
      if (this.pos >= this.steps.length) { this.finished = true; this.endedAt = now; this.stamps.push(now); return { type: 'finished' }; }
      this.stamps.push(now);
      return { type: 'step' };
    }

    /** Metronom: liefert true, wenn in diesem Aufruf ein Schlag ausgelöst wurde. */
    update(now) {
      if (this.p.pace !== 'beat' || this.finished || this.startedAt == null) return false;
      let fired = false;
      while (now >= this.nextBeatAt && !this.finished) {
        this.pos++;
        this.stamps.push(this.nextBeatAt);
        fired = true;
        if (this.pos >= this.steps.length) { this.finished = true; this.endedAt = this.nextBeatAt; break; }
        this.nextBeatAt += this.interval;
      }
      return fired;
    }

    summary() {
      const m = VT.metric;
      const total = this.endedAt != null && this.startedAt != null ? (this.endedAt - this.startedAt) / 1000 : null;
      const n = this.steps.length;
      const gaps = [];
      for (let i = 1; i < this.stamps.length; i++) gaps.push(this.stamps[i] - this.stamps[i - 1]);
      const metrics = [
        m('symbols', 'Gelesene Zeichen', n),
        m('total', 'Gesamtzeit', VT.round(total, 1), 's'),
        m('per_min', 'Zeichen pro Minute', total ? VT.round(n / (total / 60), 1) : null)
      ];
      if (this.p.pace === 'self') {
        const mean = VT.mean(gaps), sd = VT.sd(gaps);
        metrics.push(m('step_mean', 'Zeit pro Zeichen (Mittel)', VT.round(mean, 0), 'ms'));
        metrics.push(m('step_sd', 'Zeit pro Zeichen (Streuung)', VT.round(sd, 0), 'ms'));
        metrics.push(m('step_cv', 'Gleichmäßigkeit (Streuung / Mittel)', mean && sd != null ? VT.round(100 * sd / mean, 1) : null, '%'));
      } else {
        metrics.push(m('bpm', 'Takt', this.p.bpm, 'bpm'));
      }
      const trials = this.steps.map(function (s, i) {
        return { nr: i + 1, group: s.g + 1, position: s.k + 1, symbol: this.symbolAt(s), ms_on_symbol: this.stamps[i + 1] != null && this.stamps[i] != null ? Math.round(this.stamps[i + 1] - this.stamps[i]) : null };
      }, this);
      return { metrics: metrics, trials: trials };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new ChartSession(p, { rng: env.rng });
    const lay = layoutChart(p, W / px, H / px);
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const res = session.advance(env.now());
      if (res && p.pace === 'self') env.audio.beep(res.type === 'finished' ? 700 : 1000, 25, 0.06);
    }
    function onKey(ev) { if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); onDown(ev); } }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      if (session.update(now)) env.audio.beep(880, 40, 0.15);
      D.clear(env);
      const cur = session.current();
      const fontPx = Math.max(10, p.sizeCm * lay.scale * px / 0.72);
      lay.letters.forEach(function (l) {
        const isCur = cur && cur.g === l.g && cur.k === l.k;
        const stepIdx = session.steps.findIndex(function (s) { return s.g === l.g && s.k === l.k; });
        const done = session.pos > stepIdx;
        if (isCur) {
          ctx.fillStyle = '#2a3541';
          D.roundRect(ctx, l.x * px - fontPx * 0.5, l.y * px - fontPx * 0.62, fontPx, fontPx * 1.24, 8);
          ctx.fill();
        }
        D.text(ctx, session.groups[l.g][l.k], l.x * px, l.y * px, { size: fontPx, weight: 'bold', align: 'center', baseline: 'middle', color: isCur ? D.theme.accent : (done ? '#4a5560' : '#f2f5f7') });
      });
      const hint = session.pos === -1 && p.pace === 'self' ? 'Tippen oder Leertaste: Start. Danach bei jedem gelesenen Zeichen tippen.' : (!lay.fits ? 'Tafel wurde verkleinert, damit sie passt (' + Math.round(lay.scale * 100) + ' %)' : '');
      D.text(ctx, hint, W / 2, H - 14, { size: 15, align: 'center', color: D.theme.muted });
      D.hud(env, Math.max(0, session.pos) + ' / ' + session.steps.length);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'chart', title: 'Buchstabentafel', group: 'Blicksteuerung und Lesen',
    summary: 'Zeichengruppen im Raster Schritt für Schritt lesen, selbst getaktet oder im Metronom-Takt.',
    headline: ['total', 'step_cv'],
    metricKeys: ['symbols', 'total', 'per_min', 'step_mean', 'step_sd', 'step_cv', 'bpm'],
    params: params,
    createSession: function (p, env) { return new ChartSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, ChartSession: ChartSession, layoutChart: layoutChart
  });
}));
