/* Übung „Ziel verfolgen“: Ein Ziel bewegt sich gleichmäßig auf einer geschlossenen Bahn, der Finger bleibt auf dem Ziel.
 * Gemessen wird, wie lange und wie genau das Ziel verfolgt wird. Trainiert gleitende Augen-Hand-Verfolgung. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 10, max: 180, step: 5, default: 30 },
    { key: 'path', label: 'Bahn', type: 'select', default: 'ellipse', options: [
      { value: 'ellipse', label: 'Ellipse' }, { value: 'eight', label: 'Liegende Acht' }, { value: 'lissajous', label: 'Verschlungene Kurve' }] },
    { key: 'speedCmS', label: 'Geschwindigkeit (cm/s)', type: 'number', min: 2, max: 40, step: 1, default: 8 },
    { key: 'diameterCm', label: 'Zieldurchmesser (cm)', type: 'number', min: 1, max: 10, step: 0.5, default: 3 },
    { key: 'toleranceCm', label: 'Toleranz (cm)', type: 'number', min: 0, max: 3, step: 0.1, default: 0.5 },
    { key: 'showTrail', label: 'Bahn anzeigen', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  const SAMPLES = 1440;

  /** Parametrische Bahn t in [0, 2π). */
  function pathPoint(kind, t, cx, cy, rx, ry) {
    if (kind === 'eight') return { x: cx + rx * Math.sin(t), y: cy + ry * Math.sin(2 * t) };
    if (kind === 'lissajous') return { x: cx + rx * Math.sin(3 * t + Math.PI / 2), y: cy + ry * Math.sin(2 * t) };
    return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
  }

  /** Bahn mit Bogenlängen-Tabelle: Ort bei Strecke s (gleichmäßige Geschwindigkeit). */
  function makePath(kind, W, H, margin) {
    const cx = W / 2, cy = H / 2;
    const rx = Math.max(1, W / 2 - margin), ry = Math.max(1, H / 2 - margin);
    const pts = [], cum = [0];
    for (let i = 0; i <= SAMPLES; i++) {
      const pt = pathPoint(kind, 2 * Math.PI * i / SAMPLES, cx, cy, rx, ry);
      pts.push(pt);
      if (i) cum.push(cum[i - 1] + Math.hypot(pt.x - pts[i - 1].x, pt.y - pts[i - 1].y));
    }
    const total = cum[SAMPLES];
    return {
      points: pts, length: total,
      at: function (s) {
        let d = ((s % total) + total) % total;
        let lo = 0, hi = SAMPLES;
        while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cum[mid] <= d) lo = mid; else hi = mid; }
        const seg = cum[hi] - cum[lo] || 1;
        const f = (d - cum[lo]) / seg;
        return { x: pts[lo].x + (pts[hi].x - pts[lo].x) * f, y: pts[lo].y + (pts[hi].y - pts[lo].y) * f };
      }
    };
  }

  /** Reine Logik. Zeiten in ms, Koordinaten in cm. */
  class FollowSession {
    constructor(p, env) {
      this.p = p;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.path = makePath(p.path, this.W, this.H, p.diameterCm / 2 + 1);
      this.startedAt = null;
      this.endedAt = null;
      this.last = null;
      this.elapsed = 0;
      this.pointer = { x: 0, y: 0, down: false };
      this.on = 0;
      this.off = 0;
      this.touching = 0;
      this.distSum = 0;
      this.distN = 0;
      this.run = 0;
      this.bestRun = 0;
      this.losses = 0;
      this.wasOn = false;
      this.finished = false;
      this.target = this.path.at(0);
    }

    start(now) { this.startedAt = now; this.last = now; }

    setPointer(x, y, down) { this.pointer = { x: x, y: y, down: down }; }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      this.elapsed += dt;
      this.target = this.path.at(this.p.speedCmS * this.elapsed);
      const d = Math.hypot(this.pointer.x - this.target.x, this.pointer.y - this.target.y);
      const onTarget = this.pointer.down && d <= this.p.diameterCm / 2 + this.p.toleranceCm;
      if (onTarget) {
        this.on += dt; this.run += dt; this.bestRun = Math.max(this.bestRun, this.run); this.wasOn = true;
      } else {
        this.off += dt;
        if (this.wasOn) { this.losses++; this.wasOn = false; }
        this.run = 0;
      }
      if (this.pointer.down) { this.touching += dt; this.distSum += d * dt; this.distN += dt; }
      if (this.elapsed >= this.p.durationS) { this.finished = true; this.endedAt = now; }
    }

    summary() {
      const m = VT.metric;
      const total = this.on + this.off;
      return {
        metrics: [
          m('on_pct', 'Zeit auf dem Ziel', total ? VT.round(100 * this.on / total, 1) : null, '%'),
          m('on_s', 'Zeit auf dem Ziel', VT.round(this.on, 1), 's'),
          m('mean_dist', 'Mittlere Abweichung bei Berührung', this.distN ? VT.round(this.distSum / this.distN, 2) : null, 'cm'),
          m('best_run', 'Längste ununterbrochene Verfolgung', VT.round(this.bestRun, 1), 's'),
          m('losses', 'Verlorene Verbindungen', this.losses),
          m('touch_pct', 'Zeit mit Fingerkontakt', total ? VT.round(100 * this.touching / total, 1) : null, '%')
        ],
        trials: [{ speed_cm_s: this.p.speedCmS, duration_s: VT.round(total, 1), on_s: VT.round(this.on, 2), off_s: VT.round(this.off, 2), losses: this.losses }]
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm;
    const session = new FollowSession(p, { fieldWcm: env.width / px, fieldHcm: env.height / px });
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      try { env.canvas.setPointerCapture(ev.pointerId); } catch (e) { /* ohne Capture weiter */ }
      const pt = D.pointer(env.canvas, ev);
      session.setPointer(pt.x / px, pt.y / px, true);
    }
    function onMove(ev) { if (session.pointer.down) { const pt = D.pointer(env.canvas, ev); session.setPointer(pt.x / px, pt.y / px, true); } }
    function onUp() { session.setPointer(session.pointer.x, session.pointer.y, false); }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      env.canvas.removeEventListener('pointermove', onMove);
      env.canvas.removeEventListener('pointerup', onUp);
      env.canvas.removeEventListener('pointercancel', onUp);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      if (p.showTrail === 'yes') {
        ctx.strokeStyle = '#1f2933'; ctx.lineWidth = 3; ctx.beginPath();
        session.path.points.forEach(function (pt, i) { if (i) ctx.lineTo(pt.x * px, pt.y * px); else ctx.moveTo(pt.x * px, pt.y * px); });
        ctx.stroke();
      }
      const t = session.target;
      const touching = session.pointer.down && Math.hypot(session.pointer.x - t.x, session.pointer.y - t.y) <= p.diameterCm / 2 + p.toleranceCm;
      ctx.fillStyle = touching ? D.theme.accent : '#ffd23f';
      ctx.beginPath(); ctx.arc(t.x * px, t.y * px, p.diameterCm * px / 2, 0, Math.PI * 2); ctx.fill();
      D.hud(env, Math.max(0, Math.ceil(p.durationS - session.elapsed)) + ' s  ·  Finger auf dem gelben Punkt halten');
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    env.canvas.addEventListener('pointermove', onMove);
    env.canvas.addEventListener('pointerup', onUp);
    env.canvas.addEventListener('pointercancel', onUp);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'follow', title: 'Ziel verfolgen', group: 'Wahrnehmung und Koordination',
    summary: 'Den Finger auf einem gleichmäßig bewegten Ziel halten.',
    headline: ['on_pct', 'best_run'],
    metricKeys: ['on_pct', 'on_s', 'mean_dist', 'best_run', 'losses', 'touch_pct'],
    params: params,
    createSession: function (p, env) { return new FollowSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, FollowSession: FollowSession, makePath: makePath
  });
}));
