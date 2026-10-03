/* Übung „Subjektive visuelle Vertikale“: Eine helle Linie auf dunklem Grund wird so eingestellt, dass sie senkrecht erscheint.
 * Zwei Verfahren: Die Linie dreht sich langsam und wird gestoppt („Drehen“), oder sie wird mit Tasten verstellt („Einstellen“). Die Starts wechseln zwischen
 * rechts und links geneigt. Gemessen wird die Abweichung von der Senkrechten in Grad (positiv = im Uhrzeigersinn geneigt).
 * Voraussetzung: Gerät gerade aufgestellt (Wasserwaage), Kopf aufrecht, abgedunkelter Raum. Hilfsmittel für Fachpersonen, keine Diagnose. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Einstellungen', type: 'number', min: 4, max: 20, step: 2, default: 8 },
    { key: 'method', label: 'Verfahren', type: 'select', default: 'rotating', options: [{ value: 'rotating', label: 'Drehen und stoppen' }, { value: 'adjust', label: 'Mit Tasten einstellen' }] },
    { key: 'speedDegS', label: 'Drehgeschwindigkeit (°/s, nur Drehen)', type: 'number', min: 0.5, max: 6, step: 0.5, default: 1.5 },
    { key: 'startMaxDeg', label: 'Größte Startneigung (°)', type: 'number', min: 10, max: 40, step: 5, default: 25 },
    { key: 'lineCm', label: 'Länge der Linie (cm)', type: 'number', min: 6, max: 30, step: 1, default: 16 }
  ];

  const REVERSE_DEG = 45;

  /** Reine Logik. Winkel in Grad, 0 = senkrecht, positiv = im Uhrzeigersinn. */
  class VerticalSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.idx = 0;
      this.trials = [];
      this.startedAt = null;
      this.endedAt = null;
      this.last = null;
      this.finished = false;
      this.firstSign = this.rng() < 0.5 ? 1 : -1;
      this.begin(0);
    }

    begin(now) {
      const sign = this.idx % 2 === 0 ? this.firstSign : -this.firstSign;
      const mag = this.p.startMaxDeg * (0.6 + 0.4 * this.rng());
      this.sign = sign;
      this.angle = sign * mag;
      this.start = this.angle;
      this.dir = -sign; // dreht zuerst auf die Senkrechte zu
      this.trialStarted = now;
    }

    startRun(now) { this.startedAt = now; this.last = now; this.trialStarted = now; }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      if (this.p.method !== 'rotating') return;
      this.angle += this.dir * this.p.speedDegS * dt;
      if (this.angle > REVERSE_DEG) { this.angle = REVERSE_DEG; this.dir = -1; }
      if (this.angle < -REVERSE_DEG) { this.angle = -REVERSE_DEG; this.dir = 1; }
    }

    /** Einstellen: Winkel um delta Grad ändern (nur im Verfahren „Einstellen“). */
    nudge(delta) {
      if (this.finished || this.p.method !== 'adjust') return null;
      this.angle = Math.max(-REVERSE_DEG, Math.min(REVERSE_DEG, +(this.angle + delta).toFixed(3)));
      return { type: 'nudge', angle: this.angle };
    }

    /** Linie erscheint senkrecht. */
    confirm(now) {
      if (this.finished || this.startedAt == null) return null;
      this.trials.push({ nr: this.idx + 1, start_deg: VT.round(this.start, 1), set_deg: VT.round(this.angle, 2), from: this.sign > 0 ? 'rechts geneigt' : 'links geneigt', ms: Math.round(now - this.trialStarted) });
      this.idx++;
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; } else this.begin(now);
      return { type: 'confirmed' };
    }

    summary() {
      const m = VT.metric;
      const dev = this.trials.map(function (t) { return t.set_deg; });
      const cw = this.trials.filter(function (t) { return t.start_deg > 0; }).map(function (t) { return t.set_deg; });
      const ccw = this.trials.filter(function (t) { return t.start_deg < 0; }).map(function (t) { return t.set_deg; });
      return {
        metrics: [
          m('n', 'Einstellungen', this.trials.length),
          m('dev_mean', 'Mittlere Abweichung (+ im Uhrzeigersinn)', VT.round(VT.mean(dev), 2), '°'),
          m('dev_abs', 'Mittlerer Betrag der Abweichung', VT.round(VT.mean(dev.map(Math.abs)), 2), '°'),
          m('dev_sd', 'Streuung der Einstellungen', VT.round(VT.sd(dev), 2), '°'),
          m('hysteresis', 'Unterschied je nach Startseite (rechts minus links geneigt)', cw.length && ccw.length ? VT.round(VT.mean(cw) - VT.mean(ccw), 2) : null, '°')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new VerticalSession(p, { rng: env.rng });
    const btns = D.row(4, { x: 20, y: H - 90, w: Math.min(W - 40 - 190, 640), h: 60 }, 8);
    const okBtn = { x: W - 20 - 170, y: H - 90, w: 170, h: 60 };
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(okBtn, pt.x, pt.y)) { session.confirm(now); return; }
      if (p.method === 'adjust') {
        const deltas = [-2, -0.5, 0.5, 2];
        for (let i = 0; i < btns.length; i++) if (D.inRect(btns[i], pt.x, pt.y)) { session.nudge(deltas[i]); return; }
      }
    }
    function onKey(ev) {
      const now = env.now();
      if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); session.confirm(now); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); session.nudge(-0.5); }
      else if (ev.key === 'ArrowRight') { ev.preventDefault(); session.nudge(0.5); }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', onKey); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, '#000000');
      const cx = W / 2, cy = H * 0.45, half = p.lineCm * px / 2;
      const a = session.angle * Math.PI / 180;
      ctx.strokeStyle = '#e6ebf0'; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - Math.sin(a) * half, cy + Math.cos(a) * half); ctx.lineTo(cx + Math.sin(a) * half, cy - Math.cos(a) * half); ctx.stroke();
      D.text(ctx, p.method === 'rotating' ? 'Sobald die Linie senkrecht steht: „Senkrecht“ (Leertaste).' : 'Stelle die Linie senkrecht ein, dann „Senkrecht“ (Leertaste).', W / 2, 36, { size: 18, align: 'center', color: '#5b6673' });
      if (p.method === 'adjust') ['−2°', '−0,5°', '+0,5°', '+2°'].forEach(function (t, i) { D.button(ctx, btns[i], t, { size: 18 }); });
      D.button(ctx, okBtn, 'Senkrecht', { size: 20, fill: D.theme.accent, color: '#06201a' });
      D.hud(env, Math.min(session.idx + 1, p.trials) + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    session.startRun(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'vertical', title: 'Subjektive visuelle Vertikale', group: 'Funktionsprüfung (Fachperson)',
    summary: 'Eine Linie im Dunkeln als senkrecht einstellen; Abweichung von der echten Senkrechten in Grad.',
    headline: ['dev_mean', 'dev_sd'],
    metricKeys: ['n', 'dev_mean', 'dev_abs', 'dev_sd', 'hysteresis'],
    params: params,
    createSession: function (p, env) { return new VerticalSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, VerticalSession: VerticalSession
  });
}));
