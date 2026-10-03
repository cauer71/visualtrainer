/* Übung „Worth-Vierpunkttest (digital, Rot-Blau-Brille)“: Vier Lichter in Rautenform: oben ein rotes, links und rechts je ein blaues, unten ein weißes.
 * Jedes Auge sieht durch sein Farbglas nur Teile davon. Die Person gibt an, wie viele Lichter sie sieht. Die Zahl zeigt, ob beide Augen zusammenarbeiten
 * (4), ob nur das Auge hinter Rot (2) oder hinter Blau (3) etwas beiträgt oder ob Doppelbilder bestehen (5). Hilfsmittel für Fachpersonen, keine Diagnose. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'repeats', label: 'Anzahl der Darbietungen', type: 'number', min: 2, max: 12, step: 1, default: 4 },
    { key: 'dotCm', label: 'Durchmesser der Lichter (cm)', type: 'number', min: 0.3, max: 4, step: 0.1, default: 1.2 },
    { key: 'varySize', label: 'Größe wechseln (klein und groß im Wechsel)', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja (großes Licht = 2,5-fach)' }, { value: 'no', label: 'Nein' }] },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  /** Zuordnung: gesehene Lichter → Kategorie. 4 Fusion, 2 nur rot (Auge hinter Rot), 3 nur blau, 5 Doppelbilder. */
  function classify(count) {
    if (count === 4) return 'fusion';
    if (count === 2) return 'red_only';
    if (count === 3) return 'blue_only';
    if (count === 5) return 'diplopia';
    return 'unclear';
  }

  /** Reine Logik. */
  class WorthSession {
    constructor(p) {
      this.p = p;
      this.sizes = [];
      for (let i = 0; i < p.repeats; i++) this.sizes.push(p.varySize === 'yes' && i % 2 === 1 ? p.dotCm * 2.5 : p.dotCm);
      this.idx = 0;
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
      this.shownAt = null;
    }
    start(now) { this.startedAt = now; this.shownAt = now; }
    currentSize() { return this.sizes[this.idx]; }
    /** count: 2, 3, 4, 5 oder 'unclear'. */
    answer(count, now) {
      if (this.finished) return null;
      const c = count === 'unclear' ? null : Number(count);
      this.trials.push({ nr: this.idx + 1, dot_cm: VT.round(this.currentSize(), 2), count: c, category: classify(c), ms: Math.round(now - this.shownAt) });
      this.idx++;
      this.shownAt = now;
      if (this.idx >= this.sizes.length) { this.finished = true; this.endedAt = now; }
      return { type: 'answered', category: classify(c) };
    }
    summary() {
      const m = VT.metric;
      const cnt = function (c) { return this.trials.filter(function (t) { return t.category === c; }).length; }.bind(this);
      const cats = ['fusion', 'red_only', 'blue_only', 'diplopia', 'unclear'].map(cnt);
      const top = Math.max.apply(null, cats);
      return {
        metrics: [
          m('trials', 'Darbietungen', this.trials.length),
          m('fusion', 'Vier Lichter (Zusammenarbeit beider Augen)', cnt('fusion')),
          m('red_only', 'Zwei Lichter (nur Auge hinter Rot)', cnt('red_only')),
          m('blue_only', 'Drei Lichter (nur Auge hinter Blau)', cnt('blue_only')),
          m('diplopia', 'Fünf Lichter (Doppelbilder)', cnt('diplopia')),
          m('unclear', 'Unklar oder wechselnd', cnt('unclear')),
          m('consistency', 'Übereinstimmung der Antworten (häufigste Antwort)', this.trials.length ? VT.round(100 * top / this.trials.length, 0) : null, '%')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new WorthSession(p);
    const col = env.colors;
    const labels = ['2', '3', '4', '5', 'Unklar'];
    const values = [2, 3, 4, 5, 'unclear'];
    const btns = D.row(5, { x: 20, y: H - 96, w: W - 40, h: 64 }, 10);
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev);
      for (let i = 0; i < btns.length; i++) if (D.inRect(btns[i], pt.x, pt.y)) { session.answer(values[i], env.now()); return; }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      D.clear(env);
      const cx = W / 2, cy = H * 0.4, r = Math.min(session.currentSize() || p.dotCm, 12) * px / 2, d = r * 2.6;
      A.withColor(ctx, col.red, function () { ctx.beginPath(); ctx.arc(cx, cy - d, r, 0, Math.PI * 2); ctx.fill(); });
      A.withColor(ctx, col.blue, function () {
        ctx.beginPath(); ctx.arc(cx - d, cy, r, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx + d, cy, r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(cx, cy + d, r, 0, Math.PI * 2); ctx.fill();
      D.text(ctx, 'Wie viele Lichter siehst du?', W / 2, 40, { size: 24, align: 'center', color: D.theme.muted });
      btns.forEach(function (b, i) { D.button(ctx, b, labels[i], { size: 24 }); });
      D.hud(env, Math.min(session.idx + 1, session.sizes.length) + ' / ' + session.sizes.length);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'worth', title: 'Worth-Vierpunkttest (digital)', group: 'Funktionsprüfung (Fachperson)',
    summary: 'Lichter zählen: zeigt, ob beide Augen zusammenarbeiten, eines unterdrückt wird oder Doppelbilder bestehen.',
    headline: ['fusion', 'consistency'],
    metricKeys: ['trials', 'fusion', 'red_only', 'blue_only', 'diplopia', 'unclear', 'consistency'],
    params: params,
    createSession: function (p) { return new WorthSession(VT.sanitizeParams({ params: params }, p)); },
    run: VT.anaglyph.wrapRun(runInner), WorthSession: WorthSession, classify: classify
  });
}));
