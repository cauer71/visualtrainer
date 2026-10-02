/* Übung „Doppelaufgabe“: In der Mitte läuft eine Zahlenfolge, bei einer Zielzahl muss die Mitte berührt werden;
 * gleichzeitig erscheinen am Rand Punkte, die ebenfalls berührt werden müssen, ohne den Blick von der Mitte zu lösen.
 * Wahlweise nur eine der beiden Aufgaben (Vergleichsmessung). Trainiert geteilte Aufmerksamkeit. Eigene Implementierung. */
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
    { key: 'mode', label: 'Aufgaben', type: 'select', default: 'dual', options: [
      { value: 'dual', label: 'Beide gleichzeitig' }, { value: 'central', label: 'Nur Mitte (Zahlenfolge)' }, { value: 'periphery', label: 'Nur Rand (Punkte)' }] },
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 20, max: 300, step: 10, default: 60 },
    { key: 'intervalMs', label: 'Zahlenwechsel alle (ms)', type: 'number', min: 400, max: 2500, step: 50, default: 900 },
    { key: 'targetDigit', label: 'Zielzahl', type: 'number', min: 1, max: 9, step: 1, default: 7 },
    { key: 'targetRate', label: 'Anteil der Zielzahlen (%)', type: 'number', min: 5, max: 50, step: 5, default: 20 },
    { key: 'spotCm', label: 'Durchmesser der Randpunkte (cm)', type: 'number', min: 1, max: 12, step: 0.5, default: 5 },
    { key: 'persistenceS', label: 'Sichtbarkeit der Randpunkte (s)', type: 'number', min: 0.4, max: 6, step: 0.1, default: 1.5 },
    { key: 'gapMs', label: 'Pause zwischen Randpunkten (ms)', type: 'number', min: 0, max: 3000, step: 50, default: 400 },
    { key: 'sound', label: 'Ton bei Berührung', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  const CENTRAL_R_CM = 3;

  /** Zahlenfolge in der Mitte. */
  class CentralStream {
    constructor(p, rng) {
      this.p = p;
      this.rng = rng;
      this.symbol = null;
      this.isTarget = false;
      this.answered = false;
      this.nextAt = null;
      this.hits = 0;
      this.misses = 0;
      this.falseAlarms = 0;
      this.rts = [];
      this.targets = 0;
    }

    step(at) {
      const target = String(this.p.targetDigit);
      const isTarget = this.rng() * 100 < this.p.targetRate;
      let sym;
      if (isTarget) sym = target;
      else do { sym = String(this.rng.int(1, 9)); } while (sym === target || sym === this.symbol);
      if (isTarget) this.targets++;
      this.symbol = sym;
      this.isTarget = isTarget;
      this.answered = false;
      this.shownAt = at;
      this.nextAt = at + this.p.intervalMs;
    }

    start(now) { this.step(now); }

    update(now) {
      while (now >= this.nextAt) {
        if (this.isTarget && !this.answered) this.misses++;
        this.step(this.nextAt);
      }
    }

    respond(now) {
      if (this.isTarget && !this.answered) {
        this.answered = true;
        this.hits++;
        this.rts.push(now - this.shownAt);
        return { type: 'hit' };
      }
      this.falseAlarms++;
      return { type: 'false_alarm' };
    }
  }

  /** Verbindet Zahlenfolge und Randpunkte. env: { rng, fieldWcm, fieldHcm } */
  class DualSession {
    constructor(p, env) {
      this.p = p;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.central = p.mode !== 'periphery' ? new CentralStream(p, env.rng) : null;
      this.spots = p.mode !== 'central' ? new spotsEx.SpotSession({
        durationS: p.durationS, diameterCm: p.spotCm, persistenceS: p.persistenceS, simultaneous: 1, gapMs: p.gapMs, zone: 'periphery', fixation: 'yes', sound: 'no'
      }, env) : null;
      this.startedAt = null;
      this.finished = false;
    }

    start(now) {
      this.startedAt = now;
      if (this.central) this.central.start(now);
      if (this.spots) this.spots.start(now);
    }

    isOver(now) { return this.finished || now - this.startedAt >= this.p.durationS * 1000; }
    remainingS(now) { return Math.max(0, this.p.durationS - (now - this.startedAt) / 1000); }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      if (this.isOver(now)) {
        this.finished = true;
        if (this.spots) this.spots.update(now);
        return;
      }
      if (this.central) this.central.update(now);
      if (this.spots) this.spots.update(now);
    }

    inCenter(x, y) { return Math.hypot(x - this.W / 2, y - this.H / 2) <= CENTRAL_R_CM; }

    tap(x, y, now) {
      if (this.finished || this.isOver(now)) return null;
      if (this.inCenter(x, y)) return this.central ? this.central.respond(now) : null;
      return this.spots ? this.spots.tap(x, y, now) : null;
    }

    summary() {
      const m = VT.metric;
      const metrics = [];
      const trials = [];
      if (this.central) {
        const c = this.central;
        metrics.push(
          m('c_hits', 'Mitte: Zielzahlen erkannt', c.hits, 'von ' + c.targets),
          m('c_misses', 'Mitte: Zielzahlen verpasst', c.misses),
          m('c_false', 'Mitte: Berührung ohne Zielzahl', c.falseAlarms),
          m('c_rt', 'Mitte: Reaktionszeit (Mittel)', VT.round(VT.mean(c.rts), 0), 'ms')
        );
      }
      if (this.spots) {
        const s = this.spots.summary();
        const get = function (k) { return s.metrics.find(function (x) { return x.key === k; }).value; };
        metrics.push(
          m('p_hits', 'Rand: Punkte getroffen', get('hits')),
          m('p_misses', 'Rand: Punkte verpasst', get('misses')),
          m('p_stray', 'Rand: Fehltipps', get('stray')),
          m('p_rt', 'Rand: Reaktionszeit (Mittel)', get('rt_mean'), 'ms')
        );
        s.trials.forEach(function (t) { trials.push(Object.assign({ task: 'rand' }, t)); });
      }
      return { metrics: metrics, trials: trials };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new DualSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px });
    const colors = ['#ffd23f', '#3bceac', '#ee4266', '#5dade2'];
    let raf = 0, stopped = false, flash = null;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      const res = session.tap(pt.x / px, pt.y / px, now);
      if (!res) return;
      const good = res.type === 'hit';
      if (res.type === 'false_alarm' || res.type === 'stray') flash = { until: now + 200 };
      if (p.sound === 'yes') env.audio.beep(good ? 1100 : 200, good ? 40 : 90, 0.12);
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, flash && now < flash.until ? '#1d1417' : null);
      const cx = W / 2, cy = H / 2;
      if (session.central) {
        ctx.strokeStyle = '#2a3541'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, CENTRAL_R_CM * px, 0, Math.PI * 2); ctx.stroke();
        D.text(ctx, session.central.symbol || '', cx, cy, { size: 2.6 * px / 0.72, weight: 'bold', align: 'center', baseline: 'middle' });
      } else {
        ctx.strokeStyle = '#8a97a6'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14); ctx.stroke();
      }
      if (session.spots) {
        session.spots.active.forEach(function (s) {
          ctx.beginPath(); ctx.arc(s.x * px, s.y * px, session.spots.r * px, 0, Math.PI * 2);
          ctx.fillStyle = colors[s.id % colors.length]; ctx.fill();
        });
      }
      D.hud(env, Math.ceil(session.remainingS(now)) + ' s' + (session.central ? '  ·  Mitte berühren bei Zahl ' + p.targetDigit : ''));
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'dual', title: 'Doppelaufgabe', group: 'Aufmerksamkeit',
    summary: 'Mitte: Zielzahl erkennen und berühren. Rand: Punkte berühren, ohne hinzuschauen.',
    headline: ['c_hits', 'p_hits'],
    metricKeys: ['c_hits', 'c_misses', 'c_false', 'c_rt', 'p_hits', 'p_misses', 'p_stray', 'p_rt'],
    params: params,
    createSession: function (p, env) { return new DualSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, DualSession: DualSession, CentralStream: CentralStream
  });
}));
