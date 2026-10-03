/* Übung „Invasoren“: Raumschiffe fallen von oben. Der Zielpunkt unten wird seitlich unter ein Schiff gesteuert und dort gehalten,
 * bis es verschwindet (Haltezeit). Schiffe, die den unteren Rand erreichen, zählen als verpasst. Steuerung per Zeiger, Pfeiltasten oder Gerätekippen.
 * Trainiert gezielte, ruhige Ausrichtung auf bewegte Ziele. Eigene Implementierung. */
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
    { key: 'spawnMs', label: 'Neues Schiff alle (ms)', type: 'number', min: 800, max: 5000, step: 100, default: 2200 },
    { key: 'fallCmS', label: 'Fallgeschwindigkeit (cm/s)', type: 'number', min: 3, max: 25, step: 1, default: 8 },
    { key: 'dwellMs', label: 'Haltezeit zum Treffen (ms)', type: 'number', min: 100, max: 1500, step: 50, default: 400 },
    { key: 'toleranceCm', label: 'Toleranz seitlich (cm)', type: 'number', min: 0.5, max: 6, step: 0.5, default: 2 },
    { key: 'control', label: 'Steuerung', type: 'select', default: 'pointer', options: [
      { value: 'pointer', label: 'Zeiger (Maus/Touch)' }, { value: 'keys', label: 'Pfeiltasten links/rechts' }, { value: 'tilt', label: 'Gerät kippen (nur wenn vom Gerät unterstützt)' }] }
  ];

  /** Reine Logik. Koordinaten in cm, Zeiten in ms. */
  class InvadersSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.x = this.W / 2;
      this.invaders = [];
      this.nextId = 0;
      this.trials = [];
      this.destroyed = 0;
      this.missed = 0;
      this.nextSpawnAt = null;
      this.elapsed = 0;
      this.last = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
    }

    start(now) { this.startedAt = now; this.last = now; this.nextSpawnAt = now + 600; }

    aligned(inv) { return Math.abs(this.x - inv.x) <= this.p.toleranceCm && inv.y >= this.H * 0.25; }

    update(now, input) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      this.elapsed += dt;
      this.x = VT.input.applySteering(this.x, input, dt, this.W * 0.9, this.W);
      while (now >= this.nextSpawnAt) {
        this.invaders.push({ id: ++this.nextId, x: 2 + this.rng() * (this.W - 4), y: 0, lock: 0, spawnedAt: this.nextSpawnAt });
        this.nextSpawnAt += this.p.spawnMs;
      }
      const self = this;
      this.invaders.slice().forEach(function (inv) {
        inv.y += self.p.fallCmS * dt;
        if (self.aligned(inv)) inv.lock += dt * 1000; else inv.lock = Math.max(0, inv.lock - dt * 2000);
        if (inv.lock >= self.p.dwellMs) {
          self.destroyed++;
          self.trials.push({ nr: self.trials.length + 1, outcome: 'destroyed', ms: Math.round(now - inv.spawnedAt), x_cm: VT.round(inv.x, 1) });
          self.invaders.splice(self.invaders.indexOf(inv), 1);
        } else if (inv.y >= self.H - 1) {
          self.missed++;
          self.trials.push({ nr: self.trials.length + 1, outcome: 'missed', ms: null, x_cm: VT.round(inv.x, 1) });
          self.invaders.splice(self.invaders.indexOf(inv), 1);
        }
      });
      if (this.elapsed >= this.p.durationS) { this.finished = true; this.endedAt = now; }
    }

    summary() {
      const m = VT.metric;
      const n = this.destroyed + this.missed;
      const ms = this.trials.filter(function (t) { return t.outcome === 'destroyed'; }).map(function (t) { return t.ms; });
      return {
        metrics: [
          m('destroyed', 'Schiffe getroffen', this.destroyed, 'von ' + n),
          m('missed', 'Schiffe verpasst', this.missed),
          m('accuracy', 'Trefferquote', n ? VT.round(100 * this.destroyed / n, 1) : null, '%'),
          m('t_mean', 'Zeit vom Erscheinen bis zum Treffer (Mittel)', VT.round(VT.mean(ms), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new InvadersSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px });
    const steering = VT.input.createSteering(p.control, env.canvas, window);
    let raf = 0, stopped = false;

    function stop() { stopped = true; cancelAnimationFrame(raf); steering.dispose(); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now, steering.read());
      D.clear(env);
      session.invaders.forEach(function (inv) {
        const x = inv.x * px, y = inv.y * px, s = 1.6 * px;
        ctx.fillStyle = '#ee4266';
        ctx.beginPath(); ctx.moveTo(x, y + s); ctx.lineTo(x - s, y - s * 0.7); ctx.lineTo(x + s, y - s * 0.7); ctx.closePath(); ctx.fill();
        if (inv.lock > 0) {
          ctx.strokeStyle = D.theme.accent; ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(x, y, s * 1.4, -Math.PI / 2, -Math.PI / 2 + Math.min(1, inv.lock / p.dwellMs) * Math.PI * 2); ctx.stroke();
        }
      });
      const cx = session.x * px, by = H - 20;
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath(); ctx.moveTo(cx, by - 22); ctx.lineTo(cx - 18, by + 10); ctx.lineTo(cx + 18, by + 10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,210,63,.18)'; ctx.lineWidth = p.toleranceCm * 2 * px;
      ctx.beginPath(); ctx.moveTo(cx, by - 26); ctx.lineTo(cx, H * 0.25); ctx.stroke();
      D.hud(env, Math.max(0, Math.ceil(p.durationS - session.elapsed)) + ' s  ·  getroffen ' + session.destroyed + '  ·  verpasst ' + session.missed);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'invaders', title: 'Invasoren', group: 'Gleichgewicht und Körper (ohne Sensor)',
    summary: 'Zielpunkt seitlich unter fallende Schiffe steuern und dort halten, bis sie verschwinden.',
    headline: ['destroyed', 'accuracy'],
    metricKeys: ['destroyed', 'missed', 'accuracy', 't_mean'],
    params: params,
    createSession: function (p, env) { return new InvadersSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, InvadersSession: InvadersSession
  });
}));
