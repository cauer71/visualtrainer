/* Übung „Fusionstraining (Rot-Blau-Brille)“: Ein Ziel wird je Auge in eigener Farbe gezeigt. Der Versatz der beiden Bilder wächst langsam,
 * bis das Bild doppelt wird (Bruchpunkt); danach schrumpft er, bis es wieder einfach wird (Erholungspunkt). Werte in Prismendioptrien (Δ).
 * Trainiert und misst die Fusionsbreite in Richtung Konvergenz und Divergenz. Eigene Implementierung nach dem allgemein bekannten Prinzip.
 * Kein Ersatz für eine Prismenmessung; der Versatz entspricht dem eingestellten Abstand und der Kalibrierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'mode', label: 'Richtung', type: 'select', default: 'both', options: [
      { value: 'both', label: 'Konvergenz und Divergenz im Wechsel' }, { value: 'convergence', label: 'Nur Konvergenz (Bild rückt näher)' }, { value: 'divergence', label: 'Nur Divergenz (Bild rückt weg)' }] },
    { key: 'rampPdPerS', label: 'Änderungsgeschwindigkeit (Δ pro Sekunde)', type: 'number', min: 0.5, max: 6, step: 0.5, default: 1.5 },
    { key: 'maxPd', label: 'Obergrenze des Versatzes (Δ)', type: 'number', min: 5, max: 45, step: 1, default: 25 },
    { key: 'repeats', label: 'Wiederholungen je Richtung', type: 'number', min: 1, max: 6, step: 1, default: 3 },
    { key: 'targetCm', label: 'Zieldurchmesser (cm)', type: 'number', min: 2, max: 14, step: 0.5, default: 6 },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  const READY_MS = 1500;

  /** Reine Logik als Zustandsautomat. Der Versatz wird in Prismendioptrien (Δ) geführt. */
  class FusionSession {
    constructor(p) {
      this.p = p;
      this.order = [];
      for (let i = 0; i < p.repeats; i++) {
        if (p.mode === 'both') this.order.push('convergence', 'divergence');
        else this.order.push(p.mode);
      }
      this.idx = 0;
      this.phase = 'idle';
      this.disp = 0;
      this.dir = null;
      this.trials = [];
      this.suppressionNow = 0;
      this.breakPd = null;
      this.capped = false;
      this.last = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
    }

    start(now) { this.startedAt = now; this.last = now; this.begin(now); }

    begin(now) {
      if (this.idx >= this.order.length) { this.finished = true; this.endedAt = now; this.phase = 'done'; return; }
      this.dir = this.order[this.idx];
      this.disp = 0;
      this.phase = 'ready';
      this.phaseAt = now;
      this.suppressionNow = 0;
      this.breakPd = null;
      this.capped = false;
    }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      if (this.phase === 'ready') {
        if (now - this.phaseAt >= READY_MS) this.phase = 'up';
      } else if (this.phase === 'up') {
        this.disp += this.p.rampPdPerS * dt;
        if (this.disp >= this.p.maxPd) { this.disp = this.p.maxPd; this.breakPd = this.p.maxPd; this.capped = true; this.phase = 'down'; }
      } else if (this.phase === 'down') {
        this.disp -= this.p.rampPdPerS * dt;
        if (this.disp <= 0) { this.disp = 0; this.endTrial(now, 0, true); }
      }
    }

    /** Das Bild ist doppelt geworden (Bruchpunkt). */
    reportDouble() {
      if (this.phase !== 'up') return null;
      this.breakPd = this.disp;
      this.phase = 'down';
      return { type: 'break', pd: this.disp };
    }

    /** Das Bild ist wieder einfach (Erholungspunkt). */
    reportSingle(now) {
      if (this.phase !== 'down') return null;
      const rec = this.disp;
      this.endTrial(now, rec, false);
      return { type: 'recovery', pd: rec };
    }

    /** Eines der beiden Kontrollzeichen fehlt (Hinweis auf Unterdrückung eines Auges). */
    reportSuppression() {
      if (this.phase !== 'up' && this.phase !== 'down' && this.phase !== 'ready') return null;
      this.suppressionNow++;
      return { type: 'suppression' };
    }

    endTrial(now, rec, noRecovery) {
      this.trials.push({
        nr: this.idx + 1, direction: this.dir, break_pd: VT.round(this.breakPd, 2), recovery_pd: VT.round(rec, 2),
        capped: this.capped ? 1 : 0, no_recovery: noRecovery ? 1 : 0, suppression: this.suppressionNow
      });
      this.idx++;
      this.begin(now);
    }

    summary() {
      const m = VT.metric;
      const pick = function (dir, key) {
        return VT.mean(this.trials.filter(function (t) { return t.direction === dir && t.break_pd != null; }).map(function (t) { return t[key]; }));
      }.bind(this);
      const sum = function (k) { return this.trials.reduce(function (s, t) { return s + t[k]; }, 0); }.bind(this);
      return {
        metrics: [
          m('trials', 'Abgeschlossene Durchgänge', this.trials.length),
          m('break_conv', 'Bruchpunkt Konvergenz (Mittel)', VT.round(pick('convergence', 'break_pd'), 1), 'Δ'),
          m('rec_conv', 'Erholungspunkt Konvergenz (Mittel)', VT.round(pick('convergence', 'recovery_pd'), 1), 'Δ'),
          m('break_div', 'Bruchpunkt Divergenz (Mittel)', VT.round(pick('divergence', 'break_pd'), 1), 'Δ'),
          m('rec_div', 'Erholungspunkt Divergenz (Mittel)', VT.round(pick('divergence', 'recovery_pd'), 1), 'Δ'),
          m('capped', 'Durchgänge ohne Bruch bis zur Obergrenze', sum('capped')),
          m('no_recovery', 'Durchgänge ohne Erholung', sum('no_recovery')),
          m('suppression', 'Meldungen „Zeichen fehlt“', sum('suppression'))
        ],
        trials: this.trials.slice()
      };
    }
  }

  function drawTarget(ctx, D, A, cx, cy, r, color) {
    A.withColor(ctx, color, function () {
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx - r * 1.25, cy); ctx.lineTo(cx - r * 1.05, cy); ctx.moveTo(cx + r * 1.05, cy); ctx.lineTo(cx + r * 1.25, cy); ctx.stroke();
    });
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new FusionSession(p);
    const col = env.colors;
    const bw = Math.min(260, (W - 60) / 3);
    const btnMain = { x: W / 2 - bw / 2, y: H - 100, w: bw, h: 64 };
    const btnSupp = { x: W - 20 - Math.min(230, bw), y: H - 100, w: Math.min(230, bw), h: 64 };
    let raf = 0, stopped = false;

    function main(now) {
      if (session.phase === 'up') session.reportDouble();
      else if (session.phase === 'down') session.reportSingle(now);
    }
    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(btnMain, pt.x, pt.y)) main(now);
      else if (D.inRect(btnSupp, pt.x, pt.y)) session.reportSuppression();
    }
    function onKey(ev) { if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); main(env.now()); } }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      const cx = W / 2, cy = H * 0.42, r = p.targetCm * px / 2;
      const shift = A.pdToCm(session.disp, env.calib.viewDistanceCm) * px;
      const pos = A.eyePositions(cx, cy, shift, session.dir || 'convergence');
      drawTarget(ctx, D, A, pos.left.x, pos.left.y, r, col.left);
      drawTarget(ctx, D, A, pos.right.x, pos.right.y, r, col.right);
      // Kontrollzeichen: je Auge ein Strich an fester Stelle (beide müssen sichtbar sein)
      A.withColor(ctx, col.red, function () { ctx.fillRect(cx - 3, cy - r * 1.9, 6, r * 0.5); });
      A.withColor(ctx, col.blue, function () { ctx.fillRect(cx - 3, cy + r * 1.4, 6, r * 0.5); });
      const msg = { ready: 'Bild einfach halten …', up: 'Sobald das Bild doppelt wird: drücken', down: 'Sobald das Bild wieder einfach ist: drücken' }[session.phase] || '';
      D.text(ctx, msg, W / 2, 56, { size: 22, align: 'center', color: D.theme.muted });
      if (session.phase === 'up' || session.phase === 'down' || session.phase === 'ready') {
        D.button(ctx, btnMain, session.phase === 'down' ? 'Wieder einfach' : 'Doppelt', { size: 22, fill: session.phase === 'down' ? D.theme.accent : D.theme.panelHi, color: session.phase === 'down' ? '#06201a' : undefined });
        D.button(ctx, btnSupp, 'Ein Strich fehlt', { size: 16 });
      }
      D.hud(env, (session.dir === 'divergence' ? 'Divergenz' : 'Konvergenz') + '  ·  Δ ' + session.disp.toFixed(1) + '  ·  ' + Math.min(session.idx + 1, session.order.length) + ' / ' + session.order.length);
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
    id: 'fusion', title: 'Fusionstraining (Rot-Blau-Brille)', group: 'Binokulares Sehen (Rot-Blau-Brille)',
    summary: 'Versatz zwischen den Bildern beider Augen langsam erhöhen und senken; Bruch- und Erholungspunkt in Δ.',
    headline: ['break_conv', 'break_div'],
    metricKeys: ['trials', 'break_conv', 'rec_conv', 'break_div', 'rec_div', 'capped', 'no_recovery', 'suppression'],
    params: params,
    createSession: function (p) { return new FusionSession(VT.sanitizeParams({ params: params }, p)); },
    run: VT.anaglyph.wrapRun(runInner), FusionSession: FusionSession
  });
}));
