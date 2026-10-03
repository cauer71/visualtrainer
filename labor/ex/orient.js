/* Übung „Plattform-Orientierung (mit Bestätigung)“: Ein Punkt leuchtet in einer von 4 oder 8 Richtungen auf. Die Person bewegt ihren Körper
 * (z. B. neigt eine Balance-Plattform) in diese Richtung. Eine Hilfsperson bestätigt per Taste oder Knopf, wenn die Richtung erreicht ist.
 * Die App kann die Plattform nicht auslesen und misst nur die Zeit bis zur Bestätigung. Optional folgt die Rückkehr zur Mitte.
 * Trainiert gezielte Körperorientierung nach visuellem Reiz. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Ziele', type: 'number', min: 8, max: 80, step: 2, default: 24 },
    { key: 'directions', label: 'Richtungen', type: 'select', default: '4', options: [{ value: '4', label: '4 (oben, rechts, unten, links)' }, { value: '8', label: '8 (mit Diagonalen)' }] },
    { key: 'returnToCenter', label: 'Rückkehr zur Mitte nach jedem Ziel', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] },
    { key: 'waitMs', label: 'Pause vor dem nächsten Ziel (ms)', type: 'number', min: 500, max: 5000, step: 100, default: 1500 },
    { key: 'timeoutS', label: 'Zeitlimit je Ziel (s, 0 = keines)', type: 'number', min: 0, max: 30, step: 1, default: 0 },
    { key: 'sizeCm', label: 'Punktgröße (cm)', type: 'number', min: 1.5, max: 10, step: 0.5, default: 5 },
    { key: 'sound', label: 'Ton bei Ziel und Bestätigung', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  /** Reine Logik als Zustandsautomat. Richtung 0 = oben, im Uhrzeigersinn. Zeiten in ms. */
  class OrientSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.n = Number(p.directions);
      this.seq = [];
      while (this.seq.length < p.trials) this.seq = this.seq.concat(this.rng.shuffle(Array.from({ length: this.n }, function (_, i) { return i; })));
      this.seq.length = p.trials;
      this.idx = 0;
      this.state = 'idle';
      this.trials = [];
      this.pending = null;
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
    }

    start(now) { this.startedAt = now; this.toWait(now); }

    toWait(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.state = 'done'; return; }
      this.state = 'wait';
      this.waitUntil = now + this.p.waitMs;
    }

    current() { return this.state === 'target' ? this.seq[this.idx] : null; }

    update(now) {
      const to = this.p.timeoutS * 1000;
      if (this.state === 'wait' && now >= this.waitUntil) { this.state = 'target'; this.shownAt = now; }
      else if (this.state === 'target' && to > 0 && now - this.shownAt >= to) this.afterTarget(now, 'timeout', to);
      else if (this.state === 'center' && to > 0 && now - this.centerAt >= to) this.finishTrial(now, to);
    }

    afterTarget(now, outcome, ms) {
      this.pending = { nr: this.idx + 1, dir: this.seq[this.idx], outcome: outcome, ms: Math.round(ms), return_ms: null };
      if (this.p.returnToCenter === 'yes') { this.state = 'center'; this.centerAt = now; }
      else this.finishTrial(now, null);
    }

    finishTrial(now, returnMs) {
      if (returnMs != null) this.pending.return_ms = Math.round(returnMs);
      this.trials.push(this.pending);
      this.pending = null;
      this.idx++;
      this.toWait(now);
    }

    /** Hilfsperson: Richtung erreicht (bzw. in der Mitte angekommen). */
    reached(now) {
      if (this.state === 'target') { this.afterTarget(now, 'reached', now - this.shownAt); return { type: 'reached' }; }
      if (this.state === 'center') { this.finishTrial(now, now - this.centerAt); return { type: 'center' }; }
      return null;
    }

    /** Hilfsperson: falsche Richtung eingenommen. */
    wrong(now) {
      if (this.state === 'target') { this.afterTarget(now, 'wrong', now - this.shownAt); return { type: 'wrong' }; }
      return null;
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.outcome === 'reached'; });
      const ms = ok.map(function (t) { return t.ms; });
      const ret = this.trials.filter(function (t) { return t.return_ms != null; }).map(function (t) { return t.return_ms; });
      const cnt = function (o) { return this.trials.filter(function (t) { return t.outcome === o; }).length; }.bind(this);
      return {
        metrics: [
          m('reached', 'Richtig erreicht', ok.length, 'von ' + this.trials.length),
          m('wrong', 'Falsche Richtung', cnt('wrong')),
          m('timeouts', 'Zeitlimit überschritten', cnt('timeout')),
          m('t_mean', 'Zeit bis zum Ziel (Mittel)', VT.round(VT.mean(ms), 0), 'ms'),
          m('t_median', 'Zeit bis zum Ziel (Median)', VT.round(VT.median(ms), 0), 'ms'),
          m('t_sd', 'Zeit bis zum Ziel (Streuung)', VT.round(VT.sd(ms), 0), 'ms'),
          m('return_mean', 'Zeit zurück zur Mitte (Mittel)', VT.round(VT.mean(ret), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new OrientSession(p, { rng: env.rng });
    const n = session.n;
    const cx = W / 2, cy = H * 0.46, R = Math.min(W * 0.34, H * 0.34);
    const bw = Math.min(300, (W - 60) / 2);
    const okBtn = { x: W / 2 - bw - 10, y: H - 100, w: bw, h: 70 }, badBtn = { x: W / 2 + 10, y: H - 100, w: bw, h: 70 };
    let raf = 0, stopped = false;

    function act(kind, now) {
      const res = kind === 'ok' ? session.reached(now) : session.wrong(now);
      if (res && p.sound === 'yes') env.audio.beep(res.type === 'wrong' ? 200 : 1000, 50, 0.12);
    }
    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(okBtn, pt.x, pt.y)) act('ok', now); else if (D.inRect(badBtn, pt.x, pt.y)) act('bad', now);
    }
    function onKey(ev) {
      const now = env.now();
      if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); act('ok', now); }
      else if (ev.key === 'x' || ev.key === 'X' || ev.key === 'Backspace') { ev.preventDefault(); act('bad', now); }
    }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    }
    function frame() {
      if (stopped) return;
      const now = env.now();
      const before = session.state;
      session.update(now);
      if (before !== session.state && (session.state === 'target') && p.sound === 'yes') env.audio.beep(700, 60, 0.12);
      D.clear(env);
      const pts = [];
      for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n - Math.PI / 2; pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }); }
      const r = p.sizeCm * px / 2;
      ctx.strokeStyle = '#26303b'; ctx.lineWidth = 2;
      pts.forEach(function (q) { ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.stroke(); });
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      if (session.state === 'target') { const q = pts[session.current()]; ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.fill(); }
      if (session.state === 'center') { ctx.fillStyle = D.theme.accent; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
      const msg = { wait: 'Bereit in der Mitte …', target: 'In diese Richtung orientieren', center: 'Zurück zur Mitte' }[session.state] || '';
      D.text(ctx, msg, W / 2, 40, { size: 22, align: 'center', color: D.theme.muted });
      D.button(ctx, okBtn, 'Erreicht (Leertaste)', { size: 20, fill: D.theme.panelHi });
      D.button(ctx, badBtn, 'Falsche Richtung (X)', { size: 18 });
      D.hud(env, Math.min(session.idx + 1, p.trials) + ' / ' + p.trials);
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
    id: 'orient', title: 'Plattform-Orientierung (mit Bestätigung)', group: 'Gleichgewicht und Körper (ohne Sensor)',
    summary: 'Punkt leuchtet in einer Richtung auf; Körper dorthin orientieren, Hilfsperson bestätigt, App misst die Zeit.',
    headline: ['reached', 't_mean'],
    metricKeys: ['reached', 'wrong', 'timeouts', 't_mean', 't_median', 't_sd', 'return_mean'],
    params: params,
    createSession: function (p, env) { return new OrientSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, OrientSession: OrientSession
  });
}));
