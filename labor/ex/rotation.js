/* Übung „Mentale Rotation“: Zwei Figuren aus Quadraten stehen nebeneinander. Die rechte ist gedreht und entweder dieselbe
 * Figur oder ihr Spiegelbild. Per Schaltfläche wird „gleich“ oder „gespiegelt“ gewählt.
 * Trainiert räumliches Vorstellungsvermögen. Die Antwortzeit steigt typischerweise mit dem Drehwinkel (Anstieg wird berechnet).
 * Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Aufgaben', type: 'number', min: 6, max: 80, step: 2, default: 24 },
    { key: 'cells', label: 'Quadrate pro Figur', type: 'number', min: 4, max: 9, step: 1, default: 6 },
    { key: 'angles', label: 'Drehwinkel', type: 'select', default: '90', options: [
      { value: '90', label: 'Vielfache von 90°' }, { value: '45', label: 'Vielfache von 45°' }] },
    { key: 'cellCm', label: 'Quadratgröße (cm)', type: 'number', min: 0.6, max: 3, step: 0.1, default: 1.2 },
    { key: 'timeoutS', label: 'Zeitlimit je Aufgabe (s, 0 = keines)', type: 'number', min: 0, max: 60, step: 1, default: 0 }
  ];

  // ---- Geometrie auf Zellen (reine Funktionen) -----------------------------
  function normalize(cells) {
    const minx = Math.min.apply(null, cells.map(function (c) { return c[0]; }));
    const miny = Math.min.apply(null, cells.map(function (c) { return c[1]; }));
    return cells.map(function (c) { return [c[0] - minx, c[1] - miny]; }).sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
  }
  function key(cells) { return normalize(cells).map(function (c) { return c.join(','); }).join(';'); }
  /** Drehung um k mal 90° (gegen den Uhrzeigersinn in mathematischen Koordinaten). */
  function rotate90(cells, k) {
    let out = cells.map(function (c) { return [c[0], c[1]]; });
    for (let i = 0; i < ((k % 4) + 4) % 4; i++) out = out.map(function (c) { return [-c[1], c[0]]; });
    return out;
  }
  function mirror(cells) { return cells.map(function (c) { return [-c[0], c[1]]; }); }
  /** Chiral = das Spiegelbild ist durch keine Drehung erreichbar (nur dann ist die Aufgabe eindeutig). */
  function isChiral(cells) {
    const mk = key(mirror(cells));
    for (let r = 0; r < 4; r++) if (key(rotate90(cells, r)) === mk) return false;
    return true;
  }
  function randomFigure(n, rng) {
    for (let attempt = 0; attempt < 500; attempt++) {
      const cells = [[0, 0]];
      const has = function (x, y) { return cells.some(function (c) { return c[0] === x && c[1] === y; }); };
      let guard = 0;
      while (cells.length < n && guard++ < 200) {
        const base = rng.pick(cells);
        const d = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
        const x = base[0] + d[0], y = base[1] + d[1];
        if (!has(x, y)) cells.push([x, y]);
      }
      if (cells.length === n && isChiral(cells)) return normalize(cells);
    }
    throw new Error('Keine passende Figur gefunden');
  }
  /** Winkelbetrag 0..180 für die Auswertung. */
  function foldAngle(a) { const x = ((a % 360) + 360) % 360; return x > 180 ? 360 - x : x; }

  function slope(xs, ys) {
    const n = xs.length;
    if (n < 3 || new Set(xs).size < 2) return null;
    const mx = VT.mean(xs), my = VT.mean(ys);
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) * (xs[i] - mx); }
    return den === 0 ? null : num / den;
  }

  /** Reine Logik. Zeiten in ms. */
  class RotationSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.idx = 0;
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
      this.trial = null;
    }

    start(now) { this.startedAt = now; this.next(now); }

    next(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.trial = null; return; }
      const step = this.p.angles === '45' ? 45 : 90;
      const choices = [];
      for (let a = step; a < 360; a += step) choices.push(a);
      const angle = this.rng.pick(choices);
      const same = this.rng() < 0.5;
      const base = randomFigure(this.p.cells, this.rng);
      const k = Math.floor(angle / 90), extra = angle % 90;
      const transformed = rotate90(same ? base : mirror(base), k);
      this.trial = { base: base, shown: normalize(transformed), extraDeg: extra, angle: angle, same: same, shownAt: now };
    }

    answer(isSame, now) {
      if (this.finished || !this.trial) return null;
      const t = this.trial;
      const correct = isSame === t.same;
      this.trials.push({ nr: this.idx + 1, angle: t.angle, folded: foldAngle(t.angle), same: t.same ? 1 : 0, answer_same: isSame ? 1 : 0, correct: correct ? 1 : 0, rt_ms: Math.round(now - t.shownAt) });
      this.idx++;
      this.next(now);
      return { type: correct ? 'correct' : 'wrong' };
    }

    update(now) {
      if (this.finished || !this.trial || !this.p.timeoutS) return;
      if (now - this.trial.shownAt >= this.p.timeoutS * 1000) {
        const t = this.trial;
        this.trials.push({ nr: this.idx + 1, angle: t.angle, folded: foldAngle(t.angle), same: t.same ? 1 : 0, answer_same: null, correct: 0, rt_ms: null });
        this.idx++;
        this.next(now);
      }
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.correct; });
      const rts = ok.map(function (t) { return t.rt_ms; });
      const sl = slope(ok.map(function (t) { return t.folded / 90; }), rts);
      return {
        metrics: [
          m('correct', 'Richtige Antworten', ok.length, 'von ' + this.trials.length),
          m('accuracy', 'Genauigkeit', this.trials.length ? VT.round(100 * ok.length / this.trials.length, 1) : null, '%'),
          m('rt_mean', 'Antwortzeit richtiger Antworten (Mittel)', VT.round(VT.mean(rts), 0), 'ms'),
          m('rt_median', 'Antwortzeit richtiger Antworten (Median)', VT.round(VT.median(rts), 0), 'ms'),
          m('slope', 'Anstieg der Antwortzeit je 90° Drehung', VT.round(sl, 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function drawFigure(ctx, cells, cx, cy, cell, extraDeg, color) {
    const maxX = Math.max.apply(null, cells.map(function (c) { return c[0]; })) + 1;
    const maxY = Math.max.apply(null, cells.map(function (c) { return c[1]; })) + 1;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(extraDeg * Math.PI / 180);
    ctx.fillStyle = color;
    cells.forEach(function (c) { ctx.fillRect((c[0] - maxX / 2) * cell + 1, (c[1] - maxY / 2) * cell + 1, cell - 2, cell - 2); });
    ctx.restore();
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new RotationSession(p, { rng: env.rng });
    const cell = Math.min(p.cellCm * px, W / 14);
    const bw = Math.min(260, W * 0.4);
    const btnSame = { x: W / 2 - bw - 12, y: H - 130, w: bw, h: 90 };
    const btnMirror = { x: W / 2 + 12, y: H - 130, w: bw, h: 90 };
    let raf = 0, stopped = false, flash = null;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      let r = null;
      if (D.inRect(btnSame, pt.x, pt.y)) r = session.answer(true, now);
      else if (D.inRect(btnMirror, pt.x, pt.y)) r = session.answer(false, now);
      if (r) flash = { ok: r.type === 'correct', until: now + 250 };
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, flash && now < flash.until ? (flash.ok ? '#10201b' : '#2a1519') : null);
      const t = session.trial;
      if (t) {
        drawFigure(ctx, t.base, W * 0.27, H * 0.38, cell, 0, '#5dade2');
        drawFigure(ctx, t.shown, W * 0.73, H * 0.38, cell, t.extraDeg, '#ffd23f');
        D.text(ctx, 'Ist die rechte Figur dieselbe wie die linke, nur gedreht?', W / 2, 60, { size: 22, align: 'center', color: D.theme.muted });
        D.button(ctx, btnSame, 'Gleich (gedreht)', { size: 24 });
        D.button(ctx, btnMirror, 'Gespiegelt', { size: 24 });
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
    id: 'rotation', title: 'Mentale Rotation', group: 'Gedächtnis und Konzentration',
    summary: 'Entscheiden, ob eine gedrehte Figur dieselbe oder ihr Spiegelbild ist.',
    headline: ['accuracy', 'slope'],
    metricKeys: ['correct', 'accuracy', 'rt_mean', 'rt_median', 'slope'],
    params: params,
    createSession: function (p, env) { return new RotationSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, RotationSession: RotationSession,
    geometry: { normalize: normalize, key: key, rotate90: rotate90, mirror: mirror, isChiral: isChiral, randomFigure: randomFigure, foldAngle: foldAngle, slope: slope }
  });
}));
