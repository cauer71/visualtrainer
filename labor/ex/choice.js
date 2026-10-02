/* Übung „Wahlreaktion“: Ein Reiz (Farbe oder Form) erscheint in der Mitte, die passende Schaltfläche muss möglichst schnell gedrückt werden.
 * Trainiert schnelle Reiz-Reaktions-Zuordnung bei gleichzeitiger Genauigkeit. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Reize', type: 'number', min: 10, max: 200, step: 5, default: 40 },
    { key: 'options', label: 'Anzahl der Antwort-Schaltflächen', type: 'number', min: 2, max: 6, step: 1, default: 4 },
    { key: 'stimulus', label: 'Reizart', type: 'select', default: 'color', options: [
      { value: 'color', label: 'Farben' }, { value: 'shape', label: 'Formen' }] },
    { key: 'stimulusMs', label: 'Antwortzeit je Reiz (ms)', type: 'number', min: 300, max: 3000, step: 50, default: 1500 },
    { key: 'waitMinMs', label: 'Wartezeit mindestens (ms)', type: 'number', min: 300, max: 3000, step: 50, default: 600 },
    { key: 'waitMaxMs', label: 'Wartezeit höchstens (ms)', type: 'number', min: 300, max: 5000, step: 50, default: 1800 },
    { key: 'sizeCm', label: 'Reizgröße (cm)', type: 'number', min: 2, max: 12, step: 0.5, default: 6 },
    { key: 'sound', label: 'Ton bei Antwort', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  /** Reine Logik als Zustandsautomat. Zeiten in ms. */
  class ChoiceSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.stimuli = [];
      while (this.stimuli.length < p.trials) this.stimuli = this.stimuli.concat(this.rng.shuffle(Array.from({ length: p.options }, function (_, i) { return i; })));
      this.stimuli.length = p.trials;
      this.idx = 0;
      this.state = 'idle';
      this.onsetAt = null;
      this.shownAt = null;
      this.startedAt = null;
      this.endedAt = null;
      this.trials = [];
      this.early = 0;
      this.finished = false;
    }

    start(now) { this.startedAt = now; this.scheduleNext(now); }

    scheduleNext(now) {
      if (this.idx >= this.p.trials) { this.state = 'done'; this.finished = true; this.endedAt = now; return; }
      const lo = this.p.waitMinMs, hi = Math.max(this.p.waitMaxMs, lo);
      this.state = 'wait';
      this.onsetAt = now + lo + this.rng() * (hi - lo);
    }

    current() { return this.state === 'show' ? this.stimuli[this.idx] : null; }

    update(now) {
      if (this.state === 'wait' && now >= this.onsetAt) {
        this.state = 'show';
        this.shownAt = now;
      } else if (this.state === 'show' && now >= this.shownAt + this.p.stimulusMs) {
        this.trials.push({ nr: this.idx + 1, stimulus: this.stimuli[this.idx], answer: null, outcome: 'omission', rt_ms: null });
        this.idx++;
        this.scheduleNext(now);
      }
    }

    respond(option, now) {
      if (this.state === 'show') {
        const rt = now - this.shownAt;
        const correct = option === this.stimuli[this.idx];
        this.trials.push({ nr: this.idx + 1, stimulus: this.stimuli[this.idx], answer: option, outcome: correct ? 'correct' : 'wrong', rt_ms: Math.round(rt) });
        this.idx++;
        this.scheduleNext(now);
        return { type: correct ? 'correct' : 'wrong', rt: rt };
      }
      if (this.state === 'wait') { this.early++; return { type: 'early' }; }
      return null;
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.outcome === 'correct'; });
      const wrong = this.trials.filter(function (t) { return t.outcome === 'wrong'; });
      const om = this.trials.filter(function (t) { return t.outcome === 'omission'; });
      const rts = ok.map(function (t) { return t.rt_ms; });
      return {
        metrics: [
          m('correct', 'Richtige Antworten', ok.length, 'von ' + this.trials.length),
          m('wrong', 'Falsche Antworten', wrong.length),
          m('omissions', 'Keine Antwort', om.length),
          m('early', 'Zu früh gedrückt', this.early),
          m('accuracy', 'Genauigkeit', this.trials.length ? VT.round(100 * ok.length / this.trials.length, 1) : null, '%'),
          m('rt_mean', 'Reaktionszeit (Mittel)', VT.round(VT.mean(rts), 0), 'ms'),
          m('rt_median', 'Reaktionszeit (Median)', VT.round(VT.median(rts), 0), 'ms'),
          m('rt_sd', 'Reaktionszeit (Streuung)', VT.round(VT.sd(rts), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new ChoiceSession(p, { rng: env.rng });
    const area = { x: 20, y: H - Math.min(150, H * 0.22) - 20, w: W - 40, h: Math.min(150, H * 0.22) };
    const buttons = D.row(p.options, area, 14);
    let raf = 0, stopped = false, press = null;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      for (let i = 0; i < buttons.length; i++) {
        if (D.inRect(buttons[i], pt.x, pt.y)) {
          const res = session.respond(i, now);
          if (res) {
            press = { i: i, until: now + 200, ok: res.type === 'correct', early: res.type === 'early' };
            if (p.sound === 'yes') env.audio.beep(res.type === 'correct' ? 1100 : 200, 50, 0.12);
          }
          return;
        }
      }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      const cur = session.current();
      const cx = W / 2, cy = (area.y) / 2;
      if (cur != null) {
        ctx.fillStyle = p.stimulus === 'color' ? D.palette[cur].hex : '#f2f5f7';
        D.shapePath(ctx, p.stimulus === 'color' ? 0 : cur, cx, cy, p.sizeCm * px / 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = D.theme.muted; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14); ctx.stroke();
      }
      buttons.forEach(function (r, i) {
        const hi = press && now < press.until && press.i === i;
        D.button(ctx, r, p.stimulus === 'color' ? null : '', {
          fill: p.stimulus === 'color' ? D.palette[i].hex : D.theme.panel,
          stroke: hi ? (press.early ? D.theme.info : (press.ok ? '#ffffff' : D.theme.warn)) : null
        });
        if (p.stimulus === 'shape') {
          ctx.fillStyle = '#f2f5f7';
          D.shapePath(ctx, i, r.x + r.w / 2, r.y + r.h / 2, Math.min(r.h, r.w) * 0.28);
          ctx.fill();
        }
      });
      D.hud(env, (session.idx + (session.state === 'show' ? 1 : 0)) + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'choice', title: 'Wahlreaktion', group: 'Wahrnehmung und Koordination',
    summary: 'Reiz erkennen und die passende Schaltfläche so schnell wie möglich drücken.',
    headline: ['accuracy', 'rt_mean'],
    metricKeys: ['correct', 'wrong', 'omissions', 'early', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd'],
    params: params,
    createSession: function (p, env) { return new ChoiceSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, ChoiceSession: ChoiceSession
  });
}));
