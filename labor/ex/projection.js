/* Übung „Orts-Projektion“: Ein Punkt blitzt kurz auf (bei gehaltener Blickrichtung in der Mitte) und verschwindet. Nach einer einstellbaren Wartezeit wird auf
 * die Stelle getippt, wo er war. Gemessen werden Fehlervektor, mittlere Abweichung, systematische Verschiebung (Bias) und Streuung.
 * Prüft die Übertragung eines gesehenen Ortes in eine Zeigebewegung (Augen-Hand-Projektion). Hilfsmittel, kein Diagnoseverfahren. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Punkte', type: 'number', min: 6, max: 60, step: 2, default: 20 },
    { key: 'flashMs', label: 'Anzeigedauer (ms)', type: 'number', min: 50, max: 2000, step: 50, default: 300 },
    { key: 'delayMs', label: 'Wartezeit bis zum Antippen (ms)', type: 'number', min: 0, max: 5000, step: 250, default: 0 },
    { key: 'zone', label: 'Zone', type: 'select', default: 'all', options: [{ value: 'all', label: 'Gesamte Fläche' }, { value: 'periphery', label: 'Nur Peripherie' }] },
    { key: 'feedback', label: 'Sollort nach der Antwort zeigen', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] },
    { key: 'sizeCm', label: 'Punktgröße (cm)', type: 'number', min: 0.5, max: 3, step: 0.5, default: 1 }
  ];

  const FIX_MS = 700, FEEDBACK_MS = 800, MARGIN_CM = 2;

  /** Reine Logik als Zustandsautomat. Koordinaten in cm (Ursprung links oben), env: { rng, fieldWcm, fieldHcm, calib }. */
  class ProjectionSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.calib = env.calib;
      this.idx = 0;
      this.phase = 'idle';
      this.trials = [];
      this.target = null;
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
    }

    pick() {
      for (let i = 0; i < 300; i++) {
        const x = MARGIN_CM + this.rng() * Math.max(0, this.W - 2 * MARGIN_CM);
        const y = MARGIN_CM + this.rng() * Math.max(0, this.H - 2 * MARGIN_CM);
        const u = (x - this.W / 2) / (this.W / 2), v = (y - this.H / 2) / (this.H / 2);
        if (this.p.zone === 'periphery' && Math.sqrt(u * u + v * v) < 0.6) continue;
        if (Math.hypot(x - this.W / 2, y - this.H / 2) < 2) continue;
        return { x: x, y: y };
      }
      return { x: this.W * 0.8, y: this.H * 0.5 };
    }

    start(now) { this.startedAt = now; this.begin(now); }

    begin(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.phase = 'done'; return; }
      this.target = this.pick();
      this.phase = 'fix';
      this.phaseAt = now;
    }

    update(now) {
      const dt = now - this.phaseAt;
      if (this.phase === 'fix' && dt >= FIX_MS) { this.phase = 'flash'; this.phaseAt = now; }
      else if (this.phase === 'flash' && dt >= this.p.flashMs) { this.phase = this.p.delayMs > 0 ? 'delay' : 'respond'; this.phaseAt = now; }
      else if (this.phase === 'delay' && dt >= this.p.delayMs) { this.phase = 'respond'; this.phaseAt = now; }
      else if (this.phase === 'feedback' && dt >= (this.p.feedback === 'yes' ? FEEDBACK_MS : 200)) { this.idx++; this.begin(now); }
    }

    /** Antwort auf der Fläche (cm). */
    respond(x, y, now) {
      if (this.phase !== 'respond') return null;
      const dx = x - this.target.x;          // positiv = Antwort liegt rechts vom Ziel
      const up = this.target.y - y;          // positiv = Antwort liegt oberhalb des Ziels (Bildschirm-y wächst nach unten)
      const err = Math.hypot(dx, up);
      this.trials.push({
        nr: this.idx + 1, target_x_cm: VT.round(this.target.x, 1), target_y_cm: VT.round(this.target.y, 1), resp_x_cm: VT.round(x, 1), resp_y_cm: VT.round(y, 1),
        err_x_cm: VT.round(dx, 2), err_up_cm: VT.round(up, 2), err_cm: VT.round(err, 2), err_deg: VT.round(this.calib.cmToDeg(err), 2), rt_ms: Math.round(now - this.phaseAt)
      });
      this.phase = 'feedback';
      this.phaseAt = now;
      this.lastResp = { x: x, y: y };
      return { type: 'recorded', err: err };
    }

    summary() {
      const m = VT.metric;
      const ex_ = this.trials.map(function (t) { return t.err_x_cm; }), ey = this.trials.map(function (t) { return t.err_up_cm; });
      const errs = this.trials.map(function (t) { return t.err_cm; });
      const sx = VT.sd(ex_), sy = VT.sd(ey);
      return {
        metrics: [
          m('n', 'Beantwortete Punkte', this.trials.length),
          m('err_mean', 'Mittlere Abweichung', VT.round(VT.mean(errs), 2), 'cm'),
          m('err_deg', 'Mittlere Abweichung (Sehwinkel)', VT.round(VT.mean(this.trials.map(function (t) { return t.err_deg; })), 2), '°'),
          m('bias_x', 'Systematische Verschiebung seitlich (+ nach rechts)', VT.round(VT.mean(ex_), 2), 'cm'),
          m('bias_y', 'Systematische Verschiebung senkrecht (+ nach oben)', VT.round(VT.mean(ey), 2), 'cm'),
          m('scatter', 'Streuung der Antworten', sx != null && sy != null ? VT.round(Math.sqrt(sx * sx + sy * sy), 2) : null, 'cm'),
          m('rt_mean', 'Zeit bis zur Antwort (Mittel)', VT.round(VT.mean(this.trials.map(function (t) { return t.rt_ms; })), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new ProjectionSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px, calib: env.calib });
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev);
      session.respond(pt.x / px, pt.y / px, env.now());
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      const cx = W / 2, cy = H / 2;
      if (session.phase === 'fix' || session.phase === 'flash' || session.phase === 'delay') {
        ctx.strokeStyle = D.theme.muted; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14); ctx.stroke();
      }
      if (session.phase === 'flash') {
        ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(session.target.x * px, session.target.y * px, p.sizeCm * px / 2, 0, Math.PI * 2); ctx.fill();
      }
      if (session.phase === 'respond') D.text(ctx, 'Tippe dorthin, wo der Punkt war.', W / 2, 40, { size: 24, align: 'center', color: D.theme.muted });
      if (session.phase === 'feedback' && p.feedback === 'yes' && session.lastResp) {
        ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(session.target.x * px, session.target.y * px, p.sizeCm * px / 2, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ee4266'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(session.lastResp.x * px, session.lastResp.y * px, 12, 0, Math.PI * 2); ctx.stroke();
      }
      D.hud(env, Math.min(session.idx + 1, p.trials) + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'projection', title: 'Orts-Projektion', group: 'Funktionsprüfung (Fachperson)',
    summary: 'Kurz aufblitzenden Punkt nach dem Verschwinden an seinem Ort antippen; Abweichung und systematische Verschiebung.',
    headline: ['err_mean', 'scatter'],
    metricKeys: ['n', 'err_mean', 'err_deg', 'bias_x', 'bias_y', 'scatter', 'rt_mean'],
    params: params,
    createSession: function (p, env) { return new ProjectionSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, ProjectionSession: ProjectionSession
  });
}));
