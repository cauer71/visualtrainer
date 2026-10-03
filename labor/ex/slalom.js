/* Übung „Slalom“: Tore laufen von oben nach unten, die Kugel unten wird seitlich gesteuert und soll durch die Lücken fahren.
 * Steuerung per Zeiger (Maus/Touch), Pfeiltasten oder Gerätekippen. Die Balance-Plattform wird nicht ausgelesen; wer eine hat, kann sie nur
 * über ein Eingabegerät anbinden, das Tastendrücke oder Kippen des Geräts liefert. Trainiert vorausschauendes, gleichmäßiges Steuern. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/input.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 20, max: 180, step: 10, default: 60 },
    { key: 'gapCm', label: 'Weite der Torlücke (cm)', type: 'number', min: 4, max: 24, step: 1, default: 12 },
    { key: 'speedCmS', label: 'Anfangsgeschwindigkeit (cm/s)', type: 'number', min: 4, max: 40, step: 1, default: 14 },
    { key: 'speedUpPct', label: 'Beschleunigung (% pro Minute)', type: 'number', min: 0, max: 100, step: 5, default: 20 },
    { key: 'spacingCm', label: 'Abstand zwischen Toren (cm)', type: 'number', min: 8, max: 30, step: 1, default: 14 },
    { key: 'control', label: 'Steuerung', type: 'select', default: 'pointer', options: [
      { value: 'pointer', label: 'Zeiger (Maus/Touch: Kugel folgt der waagerechten Position)' }, { value: 'keys', label: 'Pfeiltasten links/rechts' }, { value: 'tilt', label: 'Gerät kippen (nur wenn vom Gerät unterstützt)' }] }
  ];

  const BALL_R = 1.2;

  /** Reine Logik. Koordinaten in cm, Zeiten in ms. Eingabe je Aufruf: { mode: 'position', x } oder { mode: 'axis', a }. */
  class SlalomSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.ballY = this.H * 0.85;
      this.x = this.W / 2;
      this.gates = [];
      this.trials = [];
      this.passed = 0;
      this.hits = 0;
      this.streak = 0;
      this.best = 0;
      this.devSum = 0;
      this.elapsed = 0;
      this.last = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
      this.lastCenter = this.W / 2;
    }

    start(now) { this.startedAt = now; this.last = now; }

    spawn(y) {
      const half = Math.min(this.p.gapCm / 2 + BALL_R, this.W / 2);
      const lo = half, hi = this.W - half;
      const shift = (this.rng() * 2 - 1) * this.W * 0.35;
      const cx = Math.max(lo, Math.min(hi, this.lastCenter + shift));
      this.lastCenter = cx;
      this.gates.push({ y: y, cx: cx, gap: this.p.gapCm, evaluated: false });
    }

    speed() { return this.p.speedCmS * (1 + this.p.speedUpPct / 100 * this.elapsed / 60); }

    update(now, input) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      this.elapsed += dt;
      this.x = VT.input.applySteering(this.x, input, dt, this.W * 0.9, this.W);
      const v = this.speed();
      this.gates.forEach(function (g) { g.y += v * dt; });
      const lastY = this.gates.length ? this.gates[this.gates.length - 1].y : Infinity;
      if (lastY >= this.p.spacingCm) this.spawn(this.gates.length ? lastY - this.p.spacingCm : 0);
      const self = this;
      this.gates.forEach(function (g) {
        if (!g.evaluated && g.y >= self.ballY) { g.evaluated = true; self.evaluate(g); }
      });
      this.gates = this.gates.filter(function (g) { return g.y < self.H + 2; });
      if (this.elapsed >= this.p.durationS) { this.finished = true; this.endedAt = now; }
    }

    evaluate(g) {
      const off = Math.abs(this.x - g.cx);
      const ok = off <= g.gap / 2 - BALL_R;
      this.trials.push({ nr: this.trials.length + 1, gap_cm: g.gap, center_cm: VT.round(g.cx, 1), ball_cm: VT.round(this.x, 1), off_cm: VT.round(off, 1), passed: ok ? 1 : 0 });
      if (ok) { this.passed++; this.streak++; this.best = Math.max(this.best, this.streak); this.devSum += off; }
      else { this.hits++; this.streak = 0; }
    }

    summary() {
      const m = VT.metric;
      const n = this.passed + this.hits;
      return {
        metrics: [
          m('passed', 'Tore durchfahren', this.passed, 'von ' + n),
          m('hits', 'Stangen berührt', this.hits),
          m('accuracy', 'Trefferquote', n ? VT.round(100 * this.passed / n, 1) : null, '%'),
          m('streak', 'Längste Serie ohne Fehler', this.best),
          m('center_dev', 'Mittlere Abweichung von der Torlückenmitte', this.passed ? VT.round(this.devSum / this.passed, 1) : null, 'cm')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new SlalomSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px });
    const steering = VT.input.createSteering(p.control, env.canvas, window);
    let raf = 0, stopped = false, flashUntil = 0, lastHits = 0;

    function stop() { stopped = true; cancelAnimationFrame(raf); steering.dispose(); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now, steering.read());
      if (session.hits !== lastHits) { lastHits = session.hits; flashUntil = now + 250; }
      D.clear(env, now < flashUntil ? '#2a1519' : null);
      session.gates.forEach(function (g) {
        const y = g.y * px, left = (g.cx - g.gap / 2) * px, right = (g.cx + g.gap / 2) * px;
        ctx.fillStyle = g.evaluated ? '#26303b' : '#5dade2';
        ctx.fillRect(0, y - 6, left, 12);
        ctx.fillRect(right, y - 6, W - right, 12);
      });
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath(); ctx.arc(session.x * px, session.ballY * px, BALL_R * px, 0, Math.PI * 2); ctx.fill();
      D.hud(env, Math.max(0, Math.ceil(p.durationS - session.elapsed)) + ' s  ·  Tore ' + session.passed + '  ·  Fehler ' + session.hits);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'slalom', title: 'Slalom', group: 'Gleichgewicht und Körper (ohne Sensor)',
    summary: 'Kugel seitlich durch von oben kommende Tore steuern (Zeiger, Pfeiltasten oder Gerätekippen).',
    headline: ['passed', 'accuracy'],
    metricKeys: ['passed', 'hits', 'accuracy', 'streak', 'center_dev'],
    params: params,
    createSession: function (p, env) { return new SlalomSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, SlalomSession: SlalomSession
  });
}));
