/* Übung „Blitz-Erkennung“: Ziffern oder Buchstaben erscheinen für sehr kurze Zeit in der Mitte und werden danach über ein Tastenfeld eingegeben.
 * Optional passt sich die Anzeigedauer automatisch an (adaptives Verfahren), so dass eine persönliche Schwelle bestimmt wird.
 * Trainiert schnelles Erfassen (Tachistoskop-Prinzip). Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/adaptive.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Durchgänge', type: 'number', min: 5, max: 100, step: 5, default: 20 },
    { key: 'symbols', label: 'Zeichen', type: 'select', default: 'digits', options: [{ value: 'digits', label: 'Ziffern' }, { value: 'letters', label: 'Buchstaben' }] },
    { key: 'length', label: 'Zeichen pro Durchgang', type: 'number', min: 1, max: 6, step: 1, default: 3 },
    { key: 'durationMs', label: 'Anzeigedauer (ms, Startwert)', type: 'number', min: 16, max: 2000, step: 10, default: 200 },
    { key: 'adaptive', label: 'Dauer automatisch anpassen', type: 'select', default: 'no', options: [{ value: 'no', label: 'Nein (feste Dauer)' }, { value: 'yes', label: 'Ja (Schwelle bestimmen)' }] },
    { key: 'mask', label: 'Maske nach der Anzeige', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] },
    { key: 'sizeCm', label: 'Zeichenhöhe (cm)', type: 'number', min: 1, max: 12, step: 0.5, default: 3 }
  ];

  const FIX_MS = 700, MASK_MS = 150, FEEDBACK_MS = 500;
  const DIGITS = '0123456789'.split('');
  const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');

  /** Reine Logik als Zustandsautomat. Zeiten in ms. */
  class FlashSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.pool = p.symbols === 'letters' ? LETTERS : DIGITS;
      this.stair = p.adaptive === 'yes' ? VT.makeStaircase({ start: p.durationMs, min: 16, max: 2000, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2 }) : null;
      this.idx = 0;
      this.phase = 'idle';
      this.entry = [];
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
    }

    duration() { return this.stair ? this.stair.value() : this.p.durationMs; }

    start(now) { this.startedAt = now; this.begin(now); }

    begin(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.phase = 'done'; return; }
      this.target = this.rng.shuffle(this.pool).slice(0, this.p.length);
      this.curDuration = this.duration();
      this.entry = [];
      this.phase = 'fix';
      this.phaseAt = now;
    }

    update(now) {
      const dt = now - this.phaseAt;
      if (this.phase === 'fix' && dt >= FIX_MS) { this.phase = 'show'; this.phaseAt = now; }
      else if (this.phase === 'show' && dt >= this.curDuration) {
        if (this.p.mask === 'yes') { this.phase = 'mask'; this.phaseAt = now; } else { this.phase = 'input'; this.phaseAt = now; }
      } else if (this.phase === 'mask' && dt >= MASK_MS) { this.phase = 'input'; this.phaseAt = now; }
      else if (this.phase === 'feedback' && dt >= FEEDBACK_MS) { this.idx++; this.begin(now); }
    }

    press(symbol, now) {
      if (this.phase !== 'input' || this.entry.length >= this.p.length) return null;
      this.entry.push(symbol);
      if (this.entry.length < this.p.length) return { type: 'entry', entry: this.entry.join('') };
      return this.submit(now);
    }

    back() { if (this.phase === 'input') this.entry.pop(); }

    submit(now) {
      const answer = this.entry.slice();
      const target = this.target;
      const okSymbols = answer.filter(function (s, i) { return s === target[i]; }).length;
      const correct = okSymbols === target.length;
      this.trials.push({
        nr: this.idx + 1, target: target.join(''), answer: answer.join(''), correct: correct ? 1 : 0,
        symbols_ok: okSymbols, duration_ms: Math.round(this.curDuration), entry_ms: Math.round(now - this.phaseAt)
      });
      if (this.stair) this.stair.record(correct);
      this.phase = 'feedback';
      this.phaseAt = now;
      return { type: 'result', correct: correct, target: target.join('') };
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.correct; });
      const sym = this.trials.reduce(function (s, t) { return s + t.symbols_ok; }, 0);
      const maxSym = this.trials.length * this.p.length;
      const eMs = this.trials.map(function (t) { return t.entry_ms; });
      const metrics = [
        m('correct', 'Vollständig richtig', ok.length, 'von ' + this.trials.length),
        m('accuracy', 'Anteil vollständig richtiger Durchgänge', this.trials.length ? VT.round(100 * ok.length / this.trials.length, 1) : null, '%'),
        m('symbol_accuracy', 'Anteil richtiger Zeichen (an richtiger Stelle)', maxSym ? VT.round(100 * sym / maxSym, 1) : null, '%'),
        m('entry_mean', 'Eingabezeit (Mittel)', VT.round(VT.mean(eMs), 0), 'ms')
      ];
      if (this.stair) {
        metrics.push(m('threshold', 'Geschätzte Schwelle der Anzeigedauer', VT.round(this.stair.threshold(), 0), 'ms'));
        metrics.push(m('final_duration', 'Letzte Anzeigedauer', this.duration(), 'ms'));
      } else {
        metrics.push(m('duration', 'Anzeigedauer', this.p.durationMs, 'ms'));
      }
      return { metrics: metrics, trials: this.trials.slice() };
    }
  }

  function maskGlyph(ctx, D, cx, cy, sizePx, n) {
    ctx.fillStyle = '#8a97a6';
    const w = sizePx * 0.7;
    for (let i = 0; i < n; i++) {
      const x = cx + (i - (n - 1) / 2) * sizePx * 0.95;
      ctx.fillRect(x - w / 2, cy - sizePx * 0.45, w, sizePx * 0.9);
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new FlashSession(p, { rng: env.rng });
    const pool = session.pool;
    const keyArea = { x: 20, y: H * 0.55, w: W - 40, h: H * 0.42 };
    const cols = pool.length <= 10 ? 5 : 6;
    const keys = D.grid(pool.length, cols, keyArea, 10);
    const back = { x: W - 150, y: H * 0.55 - 56, w: 130, h: 44 };
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (session.phase !== 'input') return;
      if (D.inRect(back, pt.x, pt.y)) { session.back(); return; }
      for (let i = 0; i < keys.length; i++) if (D.inRect(keys[i], pt.x, pt.y)) { session.press(pool[i], now); return; }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      const cx = W / 2, cy = H * 0.3, size = p.sizeCm * px;
      const ph = session.phase;
      if (ph === 'fix') {
        ctx.strokeStyle = D.theme.muted; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14); ctx.stroke();
      } else if (ph === 'show') {
        D.text(ctx, session.target.join(' '), cx, cy, { size: size / 0.72, weight: 'bold', align: 'center', baseline: 'middle' });
      } else if (ph === 'mask') {
        maskGlyph(ctx, D, cx, cy, size * 1.1, p.length);
      } else if (ph === 'input') {
        D.text(ctx, session.entry.join(' ') + (session.entry.length < p.length ? ' _' : ''), cx, cy, { size: 48, align: 'center', baseline: 'middle', weight: 'bold', color: D.theme.accent });
        D.button(ctx, back, 'Löschen', { size: 18 });
        keys.forEach(function (r, i) { D.button(ctx, r, pool[i], { size: Math.min(r.h * 0.5, 32) }); });
      } else if (ph === 'feedback') {
        const last = session.trials[session.trials.length - 1];
        D.text(ctx, last.correct ? 'Richtig' : 'Gezeigt: ' + last.target.split('').join(' '), cx, cy, { size: 36, align: 'center', baseline: 'middle', weight: 'bold', color: last.correct ? D.theme.accent : D.theme.warn });
      }
      D.hud(env, (session.idx + 1 > p.trials ? p.trials : session.idx + 1) + ' / ' + p.trials + (p.adaptive === 'yes' ? '  ·  ' + session.duration() + ' ms' : ''));
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'flash', title: 'Blitz-Erkennung', group: 'Peripheres Sehen und schnelle Erkennung',
    summary: 'Sehr kurz eingeblendete Zeichen erfassen und eintippen, optional mit automatischer Schwellenbestimmung.',
    headline: ['accuracy', 'threshold'],
    metricKeys: ['correct', 'accuracy', 'symbol_accuracy', 'entry_mean', 'threshold', 'final_duration', 'duration'],
    params: params,
    createSession: function (p, env) { return new FlashSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, FlashSession: FlashSession
  });
}));
