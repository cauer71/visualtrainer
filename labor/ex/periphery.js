/* Übung „Peripheres Erkennen“: Der Blick bleibt auf einer wechselnden Zahl in der Mitte, am Rand blitzt kurz ein Buchstabe auf,
 * der danach aus mehreren Möglichkeiten gewählt wird. Entfernung (in Sehwinkelgrad) und Dauer sind einstellbar, die Dauer optional adaptiv.
 * Trainiert die Wahrnehmung im Gesichtsfeldrand bei gehaltener Blickrichtung. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/adaptive.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Durchgänge', type: 'number', min: 8, max: 120, step: 4, default: 32 },
    { key: 'eccentricityDeg', label: 'Abstand von der Mitte (Sehwinkel in °)', type: 'number', min: 2, max: 40, step: 1, default: 10 },
    { key: 'directions', label: 'Richtungen', type: 'select', default: 'horizontal', options: [
      { value: 'horizontal', label: 'Links und rechts' }, { value: 'all4', label: 'Links, rechts, oben, unten' }] },
    { key: 'durationMs', label: 'Anzeigedauer (ms, Startwert)', type: 'number', min: 16, max: 1500, step: 10, default: 150 },
    { key: 'adaptive', label: 'Dauer automatisch anpassen', type: 'select', default: 'no', options: [{ value: 'no', label: 'Nein (feste Dauer)' }, { value: 'yes', label: 'Ja (Schwelle bestimmen)' }] },
    { key: 'sizeCm', label: 'Buchstabenhöhe (cm)', type: 'number', min: 1, max: 12, step: 0.5, default: 3 },
    { key: 'choices', label: 'Antwortmöglichkeiten', type: 'number', min: 2, max: 6, step: 1, default: 4 }
  ];

  const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');
  const CENTER_STEP_MS = 600;
  const MIN_FIX_MS = 900, MAX_FIX_MS = 2200, FEEDBACK_MS = 450;

  /** Reine Logik als Zustandsautomat. env: { rng, fieldWcm, fieldHcm, calib } */
  class PeripherySession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.calib = env.calib;
      this.stair = p.adaptive === 'yes' ? VT.makeStaircase({ start: p.durationMs, min: 16, max: 1500, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2 }) : null;
      this.idx = 0;
      this.phase = 'idle';
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
      this.centerDigit = '5';
      this.centerAt = 0;
    }

    duration() { return this.stair ? this.stair.value() : this.p.durationMs; }

    /** Abstand in cm; wird auf das Machbare begrenzt, tatsächlicher Winkel wird mitgeführt. */
    eccentricity(dir) {
      const wanted = this.calib.degToCm(this.p.eccentricityDeg);
      const half = (dir === 'left' || dir === 'right' ? this.W : this.H) / 2 - this.p.sizeCm / 2 - 0.5;
      const cm = Math.max(0, Math.min(wanted, half));
      return { cm: cm, deg: this.calib.cmToDeg(cm), clamped: cm < wanted - 1e-9 };
    }

    start(now) { this.startedAt = now; this.begin(now); }

    begin(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.phase = 'done'; return; }
      const dirs = this.p.directions === 'all4' ? ['left', 'right', 'up', 'down'] : ['left', 'right'];
      this.dir = this.rng.pick(dirs);
      this.letter = this.rng.pick(LETTERS);
      const others = this.rng.shuffle(LETTERS.filter(function (l) { return l !== this.letter; }, this)).slice(0, this.p.choices - 1);
      this.options = this.rng.shuffle([this.letter].concat(others));
      this.ecc = this.eccentricity(this.dir);
      const cx = this.W / 2, cy = this.H / 2;
      this.pos = { x: cx + (this.dir === 'right' ? this.ecc.cm : this.dir === 'left' ? -this.ecc.cm : 0), y: cy + (this.dir === 'down' ? this.ecc.cm : this.dir === 'up' ? -this.ecc.cm : 0) };
      this.curDuration = this.duration();
      this.fixMs = MIN_FIX_MS + this.rng() * (MAX_FIX_MS - MIN_FIX_MS);
      this.phase = 'fix';
      this.phaseAt = now;
    }

    update(now) {
      if (this.phase === 'fix') {
        if (now - this.centerAt >= CENTER_STEP_MS) { this.centerDigit = String(this.rng.int(2, 9)); this.centerAt = now; }
        if (now - this.phaseAt >= this.fixMs) { this.phase = 'flash'; this.phaseAt = now; }
      } else if (this.phase === 'flash' && now - this.phaseAt >= this.curDuration) {
        this.phase = 'input'; this.phaseAt = now;
      } else if (this.phase === 'feedback' && now - this.phaseAt >= FEEDBACK_MS) {
        this.idx++; this.begin(now);
      }
    }

    answer(optionIndex, now) {
      if (this.phase !== 'input') return null;
      const chosen = this.options[optionIndex];
      const correct = chosen === this.letter;
      this.trials.push({
        nr: this.idx + 1, dir: this.dir, letter: this.letter, answer: chosen, correct: correct ? 1 : 0,
        duration_ms: Math.round(this.curDuration), ecc_deg: VT.round(this.ecc.deg, 1), rt_ms: Math.round(now - this.phaseAt)
      });
      if (this.stair) this.stair.record(correct);
      this.phase = 'feedback';
      this.phaseAt = now;
      return { type: 'result', correct: correct };
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.correct; });
      const chance = 100 / this.p.choices;
      const side = function (dirs) {
        const ts = this.trials.filter(function (t) { return dirs.indexOf(t.dir) >= 0; });
        return ts.length ? VT.round(100 * ts.filter(function (t) { return t.correct; }).length / ts.length, 1) : null;
      }.bind(this);
      const metrics = [
        m('correct', 'Richtig erkannt', ok.length, 'von ' + this.trials.length),
        m('accuracy', 'Trefferquote', this.trials.length ? VT.round(100 * ok.length / this.trials.length, 1) : null, '%'),
        m('chance', 'Zufallsniveau', VT.round(chance, 1), '%'),
        m('acc_horizontal', 'Quote links/rechts', side(['left', 'right']), '%')
      ];
      if (this.p.directions === 'all4') metrics.push(m('acc_vertical', 'Quote oben/unten', side(['up', 'down']), '%'));
      metrics.push(m('ecc', 'Tatsächlicher Abstand (Mittel)', VT.round(VT.mean(this.trials.map(function (t) { return t.ecc_deg; })), 1), '°'));
      metrics.push(m('rt_mean', 'Antwortzeit (Mittel)', VT.round(VT.mean(this.trials.map(function (t) { return t.rt_ms; })), 0), 'ms'));
      if (this.stair) metrics.push(m('threshold', 'Geschätzte Schwelle der Anzeigedauer', VT.round(this.stair.threshold(), 0), 'ms'));
      else metrics.push(m('duration', 'Anzeigedauer', this.p.durationMs, 'ms'));
      return { metrics: metrics, trials: this.trials.slice() };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new PeripherySession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px, calib: env.calib });
    const area = { x: 20, y: H - Math.min(130, H * 0.2) - 20, w: W - 40, h: Math.min(130, H * 0.2) };
    const buttons = D.row(p.choices, area, 14);
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      if (session.phase !== 'input') return;
      const pt = D.pointer(env.canvas, ev);
      for (let i = 0; i < buttons.length; i++) if (D.inRect(buttons[i], pt.x, pt.y)) { session.answer(i, env.now()); return; }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      const cx = W / 2, cy = H / 2;
      const ph = session.phase;
      if (ph === 'fix' || ph === 'flash') {
        D.text(ctx, session.centerDigit, cx, cy, { size: p.sizeCm * px / 0.72, weight: 'bold', align: 'center', baseline: 'middle', color: '#9aa7b4' });
      }
      if (ph === 'flash') {
        D.text(ctx, session.letter, session.pos.x * px, session.pos.y * px, { size: p.sizeCm * px / 0.72, weight: 'bold', align: 'center', baseline: 'middle' });
      }
      if (ph === 'input') {
        D.text(ctx, 'Welcher Buchstabe war es?', cx, cy, { size: 28, align: 'center', baseline: 'middle', color: D.theme.muted });
        buttons.forEach(function (r, i) { D.button(ctx, r, session.options[i], { size: 36 }); });
      }
      if (ph === 'feedback') {
        const last = session.trials[session.trials.length - 1];
        D.text(ctx, last.correct ? 'Richtig' : 'Es war ' + last.letter, cx, cy, { size: 36, align: 'center', baseline: 'middle', weight: 'bold', color: last.correct ? D.theme.accent : D.theme.warn });
      }
      D.hud(env, (Math.min(session.idx + 1, p.trials)) + ' / ' + p.trials);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'periphery', title: 'Peripheres Erkennen', group: 'Peripheres Sehen und schnelle Erkennung',
    summary: 'Blick in der Mitte halten und kurz am Rand aufblitzende Buchstaben erkennen.',
    headline: ['accuracy', 'threshold'],
    metricKeys: ['correct', 'accuracy', 'chance', 'acc_horizontal', 'acc_vertical', 'ecc', 'rt_mean', 'threshold', 'duration'],
    params: params,
    createSession: function (p, env) { return new PeripherySession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, PeripherySession: PeripherySession
  });
}));
