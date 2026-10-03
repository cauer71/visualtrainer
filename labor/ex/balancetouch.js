/* Übung „Gleichgewicht und Touch“: Spot-Touch (Punkte berühren, optional mit Fixationskreuz) im Stand, z. B. beidbeinig, einbeinig oder auf einer Plattform.
 * Eine Hilfsperson zählt per Taste B oder Knopf jeden Verlust des Gleichgewichts. Die App misst die Touch-Leistung und die Zahl der Verluste;
 * die Standfestigkeit selbst wird nicht gemessen. Eigene Implementierung auf Basis von Spot-Touch. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const spots = isNode ? require('./spots.js') : VT.get('spots');
  const ex = factory(VT, spots);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT, spotsEx) {
  'use strict';

  const params = [
    { key: 'stance', label: 'Standposition (nur zur Dokumentation)', type: 'select', default: 'both', options: [
      { value: 'both', label: 'Beidbeinig, fest' }, { value: 'platform', label: 'Auf instabiler Fläche / Plattform' }, { value: 'single', label: 'Einbeinig' }, { value: 'tandem', label: 'Tandemstand (ein Fuß vor dem anderen)' }] },
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 20, max: 300, step: 10, default: 60 },
    { key: 'diameterCm', label: 'Durchmesser der Spots (cm)', type: 'number', min: 2, max: 15, step: 0.5, default: 6 },
    { key: 'persistenceS', label: 'Sichtbarkeit je Spot (s)', type: 'number', min: 0.5, max: 8, step: 0.1, default: 2 },
    { key: 'gapMs', label: 'Pause bis zum nächsten Spot (ms)', type: 'number', min: 0, max: 3000, step: 50, default: 500 },
    { key: 'zone', label: 'Zone', type: 'select', default: 'all', options: [{ value: 'all', label: 'Gesamte Fläche' }, { value: 'periphery', label: 'Nur Peripherie' }, { value: 'center', label: 'Nur Zentrum' }] },
    { key: 'fixation', label: 'Fixationskreuz in der Mitte', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  /** Verbindet Spot-Touch mit dem Zähler der Hilfsperson. */
  class BalanceSession {
    constructor(p, env) {
      this.p = p;
      this.spots = new spotsEx.SpotSession({ durationS: p.durationS, diameterCm: p.diameterCm, persistenceS: p.persistenceS, simultaneous: 1, gapMs: p.gapMs, zone: p.zone, fixation: p.fixation, sound: 'no' }, env);
      this.losses = [];
      this.startedAt = null;
    }
    start(now) { this.startedAt = now; this.spots.start(now); }
    update(now) { this.spots.update(now); }
    get finished() { return this.spots.finished; }
    tap(x, y, now) { return this.spots.tap(x, y, now); }
    /** Hilfsperson: Gleichgewicht verloren (Abstützen, Absetzen, Ausfallschritt). */
    loss(now) {
      if (this.startedAt == null || this.spots.finished) return null;
      this.losses.push(Math.round(now - this.startedAt));
      return { type: 'loss', n: this.losses.length };
    }
    summary() {
      const m = VT.metric;
      const s = this.spots.summary();
      const get = function (k) { return s.metrics.find(function (x) { return x.key === k; }).value; };
      const minutes = this.spots.endedAt != null ? (this.spots.endedAt - this.startedAt) / 60000 : 0;
      return {
        metrics: [
          m('hits', 'Getroffene Spots', get('hits')),
          m('misses', 'Verpasste Spots', get('misses')),
          m('stray', 'Fehltipps (daneben)', get('stray')),
          m('accuracy', 'Trefferquote', get('accuracy'), '%'),
          m('rt_mean', 'Reaktionszeit (Mittel)', get('rt_mean'), 'ms'),
          m('losses', 'Verluste des Gleichgewichts', this.losses.length),
          m('losses_per_min', 'Verluste pro Minute', minutes > 0 ? VT.round(this.losses.length / minutes, 1) : null)
        ],
        trials: s.trials.map(function (t) { return Object.assign({ stance: this.p.stance }, t); }, this)
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new BalanceSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px });
    const colors = ['#ffd23f', '#3bceac', '#ee4266', '#5dade2'];
    const lossBtn = { x: 16, y: H - 76, w: Math.min(280, W * 0.4), h: 60 };
    let raf = 0, stopped = false, flash = null;

    function noteLoss(now) { if (session.loss(now)) flash = { until: now + 300 }; }
    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(lossBtn, pt.x, pt.y)) { noteLoss(now); return; }
      session.tap(pt.x / px, pt.y / px, now);
    }
    function onKey(ev) { if (ev.key === 'b' || ev.key === 'B') { ev.preventDefault(); noteLoss(env.now()); } }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, flash && now < flash.until ? '#2a1519' : null);
      if (p.fixation === 'yes') {
        ctx.strokeStyle = '#8a97a6'; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(W / 2 - 14, H / 2); ctx.lineTo(W / 2 + 14, H / 2); ctx.moveTo(W / 2, H / 2 - 14); ctx.lineTo(W / 2, H / 2 + 14); ctx.stroke();
      }
      session.spots.active.forEach(function (s) {
        ctx.beginPath(); ctx.arc(s.x * px, s.y * px, session.spots.r * px, 0, Math.PI * 2); ctx.fillStyle = colors[s.id % colors.length]; ctx.fill();
      });
      D.button(ctx, lossBtn, 'Gleichgewicht verloren (B)', { size: 16 });
      D.hud(env, Math.ceil(session.spots.remainingS(now)) + ' s  ·  Verluste ' + session.losses.length);
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
    id: 'balancetouch', title: 'Gleichgewicht und Touch', group: 'Gleichgewicht und Körper (ohne Sensor)',
    summary: 'Punkte berühren im Stand; eine Hilfsperson zählt jeden Verlust des Gleichgewichts.',
    headline: ['hits', 'losses'],
    metricKeys: ['hits', 'misses', 'stray', 'accuracy', 'rt_mean', 'losses', 'losses_per_min'],
    params: params,
    createSession: function (p, env) { return new BalanceSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, BalanceSession: BalanceSession
  });
}));
