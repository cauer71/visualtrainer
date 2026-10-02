/* Übung „Start-Ziel-Reaktion“: Finger auf der Startfläche halten, beim Aufleuchten des Ziels loslassen und das Ziel berühren.
 * Trennt die Reaktionszeit (Loslassen) von der Bewegungszeit (Weg zum Ziel). Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Durchgänge', type: 'number', min: 5, max: 60, step: 1, default: 15 },
    { key: 'minDelayMs', label: 'Wartezeit mindestens (ms)', type: 'number', min: 500, max: 5000, step: 100, default: 1000 },
    { key: 'maxDelayMs', label: 'Wartezeit höchstens (ms)', type: 'number', min: 500, max: 8000, step: 100, default: 3500 },
    { key: 'distanceCm', label: 'Abstand Start–Ziel (cm)', type: 'number', min: 5, max: 60, step: 1, default: 20 },
    { key: 'targetCm', label: 'Zieldurchmesser (cm)', type: 'number', min: 1.5, max: 12, step: 0.5, default: 4 },
    { key: 'target', label: 'Zielposition', type: 'select', default: 'top', options: [
      { value: 'top', label: 'Immer oben' }, { value: 'random', label: 'Zufällig im Halbkreis' }] },
    { key: 'sound', label: 'Ton bei Start', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  const GO_TIMEOUT_MS = 2000;   // so lange darf das Loslassen nach dem Aufleuchten dauern
  const MOVE_TIMEOUT_MS = 3000; // so lange darf der Weg zum Ziel dauern
  const SLACK_CM = 0.3;
  const HOME_R_CM = 1.8;

  /** Reine Logik als Zustandsautomat. Zeiten in ms. */
  class SprintSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.home = { x: this.W / 2, y: Math.max(this.H - HOME_R_CM - 1, this.H * 0.8) };
      this.state = 'idle';
      this.done = 0;
      this.trials = [];
      this.falseStarts = 0;
      this.errorTaps = 0;
      this.target = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
    }

    start(now) { this.startedAt = now; }

    pickTarget() {
      const p = this.p, r = p.targetCm / 2;
      const maxD = Math.max(1, Math.min(p.distanceCm, this.home.y - r - 0.5));
      let ang = 0;
      if (p.target === 'random') ang = (this.rng() * 2 - 1) * (Math.PI / 3);
      let x = this.home.x + Math.sin(ang) * maxD, y = this.home.y - Math.cos(ang) * maxD;
      x = Math.min(this.W - r, Math.max(r, x));
      y = Math.min(this.H - r, Math.max(r, y));
      return { x: x, y: y };
    }

    homeDown(now) {
      if (this.finished || this.state !== 'idle') return null;
      this.state = 'armed';
      const lo = this.p.minDelayMs, hi = Math.max(this.p.maxDelayMs, lo);
      this.onsetAt = now + lo + this.rng() * (hi - lo);
      return { type: 'armed' };
    }

    homeUp(now) {
      if (this.state === 'armed') { this.falseStarts++; this.state = 'idle'; return { type: 'false_start' }; }
      if (this.state === 'go') {
        this.reaction = now - this.shownAt;
        this.releasedAt = now;
        this.state = 'moving';
        return { type: 'released', rt: this.reaction };
      }
      return null;
    }

    endTrial(now, rt, mt, outcome) {
      this.trials.push({ nr: this.done + 1, outcome: outcome, rt_ms: rt == null ? null : Math.round(rt), mt_ms: mt == null ? null : Math.round(mt) });
      this.done++;
      this.target = null;
      if (this.done >= this.p.trials) { this.finished = true; this.endedAt = now; this.state = 'done'; } else this.state = 'idle';
    }

    update(now) {
      if (this.state === 'armed' && now >= this.onsetAt) {
        this.state = 'go';
        this.shownAt = now;
        this.target = this.pickTarget();
      } else if (this.state === 'go' && now - this.shownAt >= GO_TIMEOUT_MS) {
        this.endTrial(now, null, null, 'no_release');
      } else if (this.state === 'moving' && now - this.releasedAt >= MOVE_TIMEOUT_MS) {
        this.endTrial(now, this.reaction, null, 'no_target');
      }
    }

    inHome(x, y) { return Math.hypot(x - this.home.x, y - this.home.y) <= HOME_R_CM + SLACK_CM; }

    tap(x, y, now) {
      if (this.state !== 'moving') return null;
      if (Math.hypot(x - this.target.x, y - this.target.y) <= this.p.targetCm / 2 + SLACK_CM) {
        const mt = now - this.releasedAt;
        const rt = this.reaction;
        this.endTrial(now, rt, mt, 'hit');
        return { type: 'hit', rt: rt, mt: mt };
      }
      this.errorTaps++;
      return { type: 'miss_tap' };
    }

    summary() {
      const m = VT.metric;
      const hits = this.trials.filter(function (t) { return t.outcome === 'hit'; });
      const rts = hits.map(function (t) { return t.rt_ms; });
      const mts = hits.map(function (t) { return t.mt_ms; });
      return {
        metrics: [
          m('hits', 'Erfolgreiche Durchgänge', hits.length, 'von ' + this.trials.length),
          m('false_starts', 'Fehlstarts (zu früh losgelassen)', this.falseStarts),
          m('error_taps', 'Fehltipps neben das Ziel', this.errorTaps),
          m('rt_mean', 'Reaktionszeit Loslassen (Mittel)', VT.round(VT.mean(rts), 0), 'ms'),
          m('rt_median', 'Reaktionszeit Loslassen (Median)', VT.round(VT.median(rts), 0), 'ms'),
          m('rt_sd', 'Reaktionszeit (Streuung)', VT.round(VT.sd(rts), 0), 'ms'),
          m('mt_mean', 'Bewegungszeit zum Ziel (Mittel)', VT.round(VT.mean(mts), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm;
    const session = new SprintSession(p, { rng: env.rng, fieldWcm: env.width / px, fieldHcm: env.height / px });
    let raf = 0, stopped = false, homePointer = null, msg = '';

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      const x = pt.x / px, y = pt.y / px;
      if (homePointer == null && session.inHome(x, y) && session.state === 'idle') {
        homePointer = ev.pointerId;
        session.homeDown(now);
        msg = 'Halten … gleich leuchtet das Ziel';
        return;
      }
      const res = session.tap(x, y, now);
      if (res && p.sound === 'yes') env.audio.beep(res.type === 'hit' ? 1100 : 200, 50, 0.12);
    }
    function onUp(ev) {
      if (ev.pointerId !== homePointer) return;
      homePointer = null;
      const res = session.homeUp(env.now());
      if (res && res.type === 'false_start') msg = 'Zu früh losgelassen';
      else if (res && res.type === 'released') msg = '';
    }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      const before = session.state;
      session.update(now);
      if (before !== 'go' && session.state === 'go' && p.sound === 'yes') env.audio.beep(900, 60, 0.15);
      if (before === 'go' && session.state === 'idle') { msg = 'Zu langsam'; homePointer = null; }
      D.clear(env);
      const hx = session.home.x * px, hy = session.home.y * px;
      ctx.fillStyle = session.state === 'armed' || session.state === 'go' ? D.theme.accent : D.theme.panelHi;
      ctx.beginPath(); ctx.arc(hx, hy, HOME_R_CM * px, 0, Math.PI * 2); ctx.fill();
      D.text(ctx, 'START', hx, hy, { size: 16, align: 'center', baseline: 'middle', weight: 'bold', color: '#06201a' });
      if (session.state === 'go' || session.state === 'moving') {
        ctx.fillStyle = '#ffd23f';
        ctx.beginPath(); ctx.arc(session.target.x * px, session.target.y * px, p.targetCm * px / 2, 0, Math.PI * 2); ctx.fill();
      }
      D.text(ctx, session.state === 'idle' && !msg ? 'Finger auf START legen und halten' : msg, env.width / 2, 60, { size: 20, align: 'center', color: D.theme.muted });
      D.hud(env, session.done + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'sprint', title: 'Start-Ziel-Reaktion', group: 'Wahrnehmung und Koordination',
    summary: 'Startfläche halten, bei Aufleuchten des Ziels loslassen und das Ziel berühren.',
    headline: ['rt_mean', 'mt_mean'],
    metricKeys: ['hits', 'false_starts', 'error_taps', 'rt_mean', 'rt_median', 'rt_sd', 'mt_mean'],
    params: params,
    createSession: function (p, env) { return new SprintSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, SprintSession: SprintSession
  });
}));
