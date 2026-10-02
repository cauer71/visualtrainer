/* Übung „Zeichen finden“: In einem Raster ähnlicher Zeichen müssen alle Exemplare des Zielzeichens angetippt werden.
 * Trainiert genaues Unterscheiden ähnlicher Zeichen (z. B. b/d/p/q), visuelle Suche und Aufmerksamkeit. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'set', label: 'Zeichenvorrat', type: 'select', default: 'pbdq', options: [
      { value: 'pbdq', label: 'b d p q' }, { value: 'digits', label: 'Ziffern (1 7 4 9 …)' }, { value: 'similar', label: 'Ähnliche Buchstaben (O Q C G D …)' }, { value: 'mixed', label: 'Gemischt' }] },
    { key: 'rows', label: 'Zeilen', type: 'number', min: 2, max: 12, step: 1, default: 5 },
    { key: 'cols', label: 'Spalten', type: 'number', min: 2, max: 16, step: 1, default: 8 },
    { key: 'density', label: 'Anteil der Zielzeichen (%)', type: 'number', min: 5, max: 50, step: 5, default: 20 },
    { key: 'cellCm', label: 'Feldgröße (cm)', type: 'number', min: 1, max: 6, step: 0.5, default: 2.5 },
    { key: 'rounds', label: 'Anzahl der Tafeln', type: 'number', min: 1, max: 20, step: 1, default: 5 }
  ];

  const SETS = {
    pbdq: ['b', 'd', 'p', 'q'],
    digits: ['1', '7', '4', '9', '6', '2', '5', '3'],
    similar: ['O', 'Q', 'C', 'G', 'D', 'U', 'E', 'F'],
    mixed: ['b', 'd', 'p', 'q', '1', '7', '9', '6', 'O', 'Q', 'G', 'C']
  };

  /** Reine Logik. Zeiten in ms. */
  class FindSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.pool = SETS[p.set];
      this.round = 0;
      this.found = 0;
      this.missed = 0;
      this.falseTaps = 0;
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
      this.board = null;
    }

    start(now) { this.startedAt = now; this.newBoard(now); }

    newBoard(now) {
      const cells = this.p.rows * this.p.cols;
      const nT = Math.max(1, Math.min(cells - 1, Math.round(cells * this.p.density / 100)));
      const target = this.rng.pick(this.pool);
      const targetIdx = new Set(this.rng.shuffle(Array.from({ length: cells }, function (_, i) { return i; })).slice(0, nT));
      const others = this.pool.filter(function (c) { return c !== target; });
      this.board = {
        target: target, nTargets: nT, foundCount: 0, falseCount: 0, startedAt: now,
        cells: Array.from({ length: cells }, function (_, i) {
          return { ch: targetIdx.has(i) ? target : this.rng.pick(others), isTarget: targetIdx.has(i), state: 'open' };
        }, this)
      };
    }

    tap(cellIdx, now) {
      if (this.finished || !this.board) return null;
      const c = this.board.cells[cellIdx];
      if (!c || c.state !== 'open') return null;
      if (c.isTarget) {
        c.state = 'found';
        this.board.foundCount++;
        this.found++;
        if (this.board.foundCount >= this.board.nTargets) return this.closeBoard(now, 'complete');
        return { type: 'found' };
      }
      c.state = 'wrong';
      this.board.falseCount++;
      this.falseTaps++;
      return { type: 'wrong' };
    }

    /** „Fertig“ gedrückt: übrige Zielzeichen zählen als verpasst. */
    giveUp(now) { return this.finished || !this.board ? null : this.closeBoard(now, 'gave_up'); }

    closeBoard(now, how) {
      const b = this.board;
      const missed = b.nTargets - b.foundCount;
      this.missed += missed;
      this.trials.push({ nr: this.round + 1, target: b.target, targets: b.nTargets, found: b.foundCount, missed: missed, false_taps: b.falseCount, ms: Math.round(now - b.startedAt), end: how });
      this.round++;
      if (this.round >= this.p.rounds) { this.finished = true; this.endedAt = now; this.board = null; return { type: 'finished' }; }
      this.newBoard(now);
      return { type: 'next_board', how: how };
    }

    summary() {
      const m = VT.metric;
      const total = this.endedAt != null ? (this.endedAt - this.startedAt) / 1000 : null;
      const all = this.found + this.missed + this.falseTaps;
      const perTarget = this.found ? this.trials.reduce(function (s, t) { return s + t.ms; }, 0) / this.found : null;
      return {
        metrics: [
          m('found', 'Zielzeichen gefunden', this.found, 'von ' + (this.found + this.missed)),
          m('missed', 'Zielzeichen übersehen', this.missed),
          m('false_taps', 'Falsche Zeichen getippt', this.falseTaps),
          m('accuracy', 'Genauigkeit', all ? VT.round(100 * this.found / all, 1) : null, '%'),
          m('per_target', 'Zeit pro gefundenem Zeichen', VT.round(perTarget, 0), 'ms'),
          m('total', 'Gesamtzeit', VT.round(total, 1), 's')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new FindSession(p, { rng: env.rng });
    const headerH = 80, footerH = 70;
    const cell = Math.min(p.cellCm * px, (W - 20) / p.cols, (H - headerH - footerH) / p.rows);
    const gx = (W - cell * p.cols) / 2, gy = headerH + (H - headerH - footerH - cell * p.rows) / 2;
    const doneRect = { x: W / 2 - 90, y: H - footerH + 10, w: 180, h: 48 };
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(doneRect, pt.x, pt.y)) { session.giveUp(now); return; }
      const c = Math.floor((pt.x - gx) / cell), r = Math.floor((pt.y - gy) / cell);
      if (c < 0 || r < 0 || c >= p.cols || r >= p.rows) return;
      session.tap(r * p.cols + c, now);
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      D.clear(env);
      const b = session.board;
      if (b) {
        D.text(ctx, 'Finde alle:', W / 2 - 70, 52, { size: 24, align: 'right', color: D.theme.muted });
        D.text(ctx, b.target, W / 2 - 40, 52, { size: 54, weight: 'bold', align: 'left', color: D.theme.accent });
        for (let i = 0; i < b.cells.length; i++) {
          const c = b.cells[i], x = gx + (i % p.cols) * cell, y = gy + Math.floor(i / p.cols) * cell;
          if (c.state !== 'open') {
            ctx.fillStyle = c.state === 'found' ? 'rgba(59,206,172,.25)' : 'rgba(238,66,102,.3)';
            D.roundRect(ctx, x + 2, y + 2, cell - 4, cell - 4, 8); ctx.fill();
          }
          D.text(ctx, c.ch, x + cell / 2, y + cell / 2, { size: cell * 0.62, weight: 'bold', align: 'center', baseline: 'middle', color: c.state === 'found' ? D.theme.accent : '#f2f5f7' });
        }
        D.button(ctx, doneRect, 'Fertig', { size: 20 });
        D.hud(env, 'Tafel ' + (session.round + 1) + ' / ' + p.rounds + '  ·  gefunden ' + b.foundCount + ' / ' + b.nTargets);
      }
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'findchars', title: 'Zeichen finden', group: 'Gedächtnis und Konzentration',
    summary: 'Alle Exemplare eines Zielzeichens in einem Raster ähnlicher Zeichen antippen.',
    headline: ['accuracy', 'per_target'],
    metricKeys: ['found', 'missed', 'false_taps', 'accuracy', 'per_target', 'total'],
    params: params,
    createSession: function (p, env) { return new FindSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, FindSession: FindSession
  });
}));
