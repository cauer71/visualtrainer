/* Übung „Spot-Touch“: Farbige Punkte erscheinen zufällig auf der Fläche und müssen schnell berührt werden.
 * Trainiert Reaktionsgeschwindigkeit und Auge-Hand-Koordination, optional mit Fixationspunkt (peripheres Wahrnehmen).
 * Eigene Implementierung nach dem allgemein bekannten Prinzip; Logik (SpotSession) ist von der Darstellung getrennt und testbar. */
(function (root, factory) {
  const VT = (typeof module === 'object' && module.exports) ? require('../lib/core.js') : root.VT;
  const ex = factory(VT);
  if (typeof module === 'object' && module.exports) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'durationS', label: 'Dauer (s)', type: 'number', min: 10, max: 600, step: 5, default: 60 },
    { key: 'diameterCm', label: 'Durchmesser der Spots (cm)', type: 'number', min: 1, max: 15, step: 0.5, default: 5 },
    { key: 'persistenceS', label: 'Sichtbarkeit je Spot (s)', type: 'number', min: 0.3, max: 10, step: 0.1, default: 1.5 },
    { key: 'simultaneous', label: 'Gleichzeitige Spots', type: 'number', min: 1, max: 5, step: 1, default: 1 },
    { key: 'gapMs', label: 'Pause bis zum nächsten Spot (ms)', type: 'number', min: 0, max: 3000, step: 50, default: 300 },
    { key: 'zone', label: 'Zone', type: 'select', default: 'all', options: [
      { value: 'all', label: 'Gesamte Fläche' },
      { value: 'periphery', label: 'Nur Peripherie' },
      { value: 'center', label: 'Nur Zentrum' }] },
    { key: 'fixation', label: 'Fixationskreuz in der Mitte', type: 'select', default: 'no', options: [
      { value: 'no', label: 'Nein' }, { value: 'yes', label: 'Ja' }] },
    { key: 'sound', label: 'Ton bei Treffer/Fehltipp', type: 'select', default: 'no', options: [
      { value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  const SLACK_CM = 0.3; // Toleranz für ungenaue Fingerberührung

  function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }

  function zoneOk(zone, x, y, W, H) {
    const u = (x - W / 2) / (W / 2);
    const v = (y - H / 2) / (H / 2);
    const rr = Math.sqrt(u * u + v * v);
    if (zone === 'center') return rr <= 0.45;
    if (zone === 'periphery') return rr >= 0.6;
    return true;
  }

  /** Reine Spiellogik. Zeiten in ms (beliebige Zeitbasis), Koordinaten in cm, Ursprung links oben. */
  class SpotSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.fieldW = env.fieldWcm;
      this.fieldH = env.fieldHcm;
      this.r = p.diameterCm / 2;
      this.active = [];
      this.trials = [];
      this.taps = 0;
      this.strayTaps = 0;
      this.nextId = 0;
      this.startedAt = null;
      this.endedAt = null;
      this.nextSpawnAt = 0;
      this.finished = false;
    }

    start(now) { this.startedAt = now; this.nextSpawnAt = now; }

    isOver(now) { return this.finished || (this.startedAt != null && now - this.startedAt >= this.p.durationS * 1000); }

    remainingS(now) { return Math.max(0, this.p.durationS - (now - this.startedAt) / 1000); }

    place() {
      const W = this.fieldW, H = this.fieldH, r = this.r;
      const minX = Math.min(r, W / 2), maxX = Math.max(W - r, W / 2);
      const minY = Math.min(r, H / 2), maxY = Math.max(H - r, H / 2);
      for (let i = 0; i < 300; i++) {
        const x = minX + this.rng() * (maxX - minX);
        const y = minY + this.rng() * (maxY - minY);
        if (!zoneOk(this.p.zone, x, y, W, H)) continue;
        if (this.p.fixation === 'yes' && dist(x, y, W / 2, H / 2) < r + 1.2) continue;
        if (this.active.some(function (s) { return dist(x, y, s.x, s.y) < 2 * r + 0.5; })) continue;
        return { x: x, y: y };
      }
      return null;
    }

    record(spot, hit, rtMs) {
      this.trials.push({
        nr: this.trials.length + 1,
        x_cm: VT.round(spot.x, 2),
        y_cm: VT.round(spot.y, 2),
        hit: hit ? 1 : 0,
        rt_ms: rtMs == null ? null : Math.round(rtMs)
      });
    }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      if (this.isOver(now)) {
        this.finished = true;
        this.endedAt = this.startedAt + this.p.durationS * 1000;
        this.active = [];
        return;
      }
      const self = this;
      this.active.slice().forEach(function (s) {
        const expiresAt = s.shownAt + self.p.persistenceS * 1000;
        if (now >= expiresAt) {
          self.record(s, false, null);
          self.active.splice(self.active.indexOf(s), 1);
          self.nextSpawnAt = Math.max(self.nextSpawnAt, expiresAt + self.p.gapMs);
        }
      });
      while (this.active.length < this.p.simultaneous && now >= this.nextSpawnAt) {
        const pos = this.place();
        if (!pos) break;
        this.active.push({ id: ++this.nextId, x: pos.x, y: pos.y, shownAt: now });
      }
    }

    tap(x, y, now) {
      if (this.startedAt == null || this.finished || this.isOver(now)) return null;
      this.taps++;
      let best = null, bestD = Infinity;
      for (const s of this.active) {
        const d = dist(x, y, s.x, s.y);
        if (d <= this.r + SLACK_CM && d < bestD) { best = s; bestD = d; }
      }
      if (!best) { this.strayTaps++; return { type: 'stray' }; }
      const rt = now - best.shownAt;
      this.record(best, true, rt);
      this.active.splice(this.active.indexOf(best), 1);
      this.nextSpawnAt = Math.max(this.nextSpawnAt, now + this.p.gapMs);
      return { type: 'hit', rt: rt, spot: best };
    }

    summary() {
      const hits = this.trials.filter(function (t) { return t.hit; });
      const rts = hits.map(function (t) { return t.rt_ms; });
      const shown = this.trials.length;
      const minutes = this.endedAt != null ? (this.endedAt - this.startedAt) / 60000 : 0;
      const m = VT.metric;
      return {
        metrics: [
          m('hits', 'Getroffene Spots', hits.length),
          m('misses', 'Verpasste Spots', shown - hits.length),
          m('stray', 'Fehltipps (daneben)', this.strayTaps),
          m('accuracy', 'Trefferquote', shown ? VT.round(100 * hits.length / shown, 1) : null, '%'),
          m('rt_mean', 'Reaktionszeit (Mittel)', VT.round(VT.mean(rts), 0), 'ms'),
          m('rt_median', 'Reaktionszeit (Median)', VT.round(VT.median(rts), 0), 'ms'),
          m('rt_sd', 'Reaktionszeit (Streuung)', VT.round(VT.sd(rts), 0), 'ms'),
          m('rate', 'Treffer pro Minute', minutes > 0 ? VT.round(hits.length / minutes, 1) : null)
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const ctx = env.ctx;
    const px = env.calib.pxPerCm;
    const W = env.width, H = env.height;
    const session = new SpotSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px });
    const colors = ['#ffd23f', '#3bceac', '#ee4266', '#5dade2'];
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const rect = env.canvas.getBoundingClientRect();
      const res = session.tap((ev.clientX - rect.left) / px, (ev.clientY - rect.top) / px, env.now());
      if (res && p.sound === 'yes') env.audio.beep(res.type === 'hit' ? 1200 : 220, res.type === 'hit' ? 40 : 90, 0.12);
    }

    function stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
    }

    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      ctx.fillStyle = '#101418';
      ctx.fillRect(0, 0, W, H);
      if (p.fixation === 'yes') {
        ctx.strokeStyle = '#8a97a6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 14, H / 2); ctx.lineTo(W / 2 + 14, H / 2);
        ctx.moveTo(W / 2, H / 2 - 14); ctx.lineTo(W / 2, H / 2 + 14);
        ctx.stroke();
      }
      session.active.forEach(function (s) {
        ctx.beginPath();
        ctx.arc(s.x * px, s.y * px, session.r * px, 0, Math.PI * 2);
        ctx.fillStyle = colors[s.id % colors.length];
        ctx.fill();
      });
      ctx.fillStyle = '#5b6673';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(Math.ceil(session.remainingS(now)) + ' s', 16, 28);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }

    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'spots',
    title: 'Spot-Touch',
    group: 'Wahrnehmung und Koordination',
    summary: 'Farbige Punkte erscheinen zufällig und müssen schnell berührt werden.',
    headline: ['hits', 'rt_mean'],
    metricKeys: ['hits', 'misses', 'stray', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd', 'rate'],
    params: params,
    createSession: function (p, env) { return new SpotSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run,
    SpotSession: SpotSession
  });
}));
