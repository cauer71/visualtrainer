/* Übung „Wörter bauen“: Durcheinandergewürfelte Buchstabenkacheln werden durch Antippen in die richtige Reihenfolge gebracht.
 * Trainiert Wortbild, Buchstabenreihenfolge und schnelles Umordnen im Kopf. Eigene Implementierung mit eigener Wortliste. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/words.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'wordLength', label: 'Wortlänge (Buchstaben)', type: 'number', min: 3, max: 8, step: 1, default: 5 },
    { key: 'words', label: 'Anzahl der Wörter', type: 'number', min: 3, max: 30, step: 1, default: 8 },
    { key: 'tileCm', label: 'Kachelgröße (cm)', type: 'number', min: 1.5, max: 5, step: 0.5, default: 2.5 },
    { key: 'sound', label: 'Ton bei Eingabe', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  /** Reine Logik. Zeiten in ms. */
  class WordSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      const pool = VT.words.byLength(p.wordLength);
      if (!pool.length) throw new Error('Keine Wörter dieser Länge vorhanden');
      const picked = [];
      while (picked.length < p.words) {
        const round = this.rng.shuffle(pool);
        for (let i = 0; i < round.length && picked.length < p.words; i++) picked.push(round[i]);
      }
      this.words = picked;
      this.idx = 0;
      this.errors = 0;
      this.errorsInWord = 0;
      this.trials = [];
      this.slots = [];
      this.finished = false;
      this.startedAt = null;
      this.wordStartedAt = null;
      this.endedAt = null;
      this.setupWord();
    }

    scramble(word) {
      const letters = word.split('');
      if (new Set(letters.map(function (c) { return c.toLowerCase(); })).size < 2) return letters;
      let s;
      let guard = 0;
      do { s = this.rng.shuffle(letters); } while (s.join('') === word && guard++ < 100);
      return s;
    }

    setupWord() {
      this.target = this.words[this.idx];
      this.tiles = this.scramble(this.target).map(function (ch) { return { ch: ch, used: false }; });
      this.slots = [];
      this.errorsInWord = 0;
    }

    start(now) { this.startedAt = now; this.wordStartedAt = now; }

    place(tileIdx, now) {
      if (this.finished || this.slots.length >= this.tiles.length || !this.tiles[tileIdx] || this.tiles[tileIdx].used) return null;
      this.tiles[tileIdx].used = true;
      this.slots.push(tileIdx);
      if (this.slots.length < this.tiles.length) return { type: 'placed' };
      return this.evaluate(now);
    }

    removeLast() {
      if (!this.slots.length || this.finished) return null;
      const t = this.slots.pop();
      this.tiles[t].used = false;
      return { type: 'removed' };
    }

    evaluate(now) {
      const attempt = this.slots.map(function (i) { return this.tiles[i].ch; }, this).join('');
      const valid = VT.words.anagramsOf(this.target).indexOf(attempt) >= 0;
      if (!valid) {
        this.errors++;
        this.errorsInWord++;
        this.slots = [];
        this.tiles.forEach(function (t) { t.used = false; });
        return { type: 'wrong', attempt: attempt };
      }
      this.trials.push({ nr: this.idx + 1, word: this.target, ms: Math.round(now - this.wordStartedAt), errors: this.errorsInWord });
      this.idx++;
      if (this.idx >= this.words.length) { this.finished = true; this.endedAt = now; return { type: 'finished' }; }
      this.setupWord();
      this.wordStartedAt = now;
      return { type: 'solved', word: attempt };
    }

    summary() {
      const m = VT.metric;
      const ms = this.trials.map(function (t) { return t.ms; });
      const total = this.endedAt != null ? (this.endedAt - this.startedAt) / 1000 : null;
      const letters = this.trials.length * this.p.wordLength;
      return {
        metrics: [
          m('solved', 'Gelöste Wörter', this.trials.length, 'von ' + this.words.length),
          m('errors', 'Falsche Versuche', this.errors),
          m('t_mean', 'Zeit pro Wort (Mittel)', VT.round(VT.mean(ms), 0), 'ms'),
          m('t_median', 'Zeit pro Wort (Median)', VT.round(VT.median(ms), 0), 'ms'),
          m('total', 'Gesamtzeit', VT.round(total, 1), 's'),
          m('lpm', 'Buchstaben pro Minute', total ? VT.round(letters / (total / 60), 0) : null)
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new WordSession(p, { rng: env.rng });
    const n = p.wordLength;
    const tile = Math.min(p.tileCm * px, (W - 40 - 14 * (n - 1)) / n);
    const gap = 14;
    const rowW = n * tile + (n - 1) * gap;
    const slotRects = [], tileRects = [];
    for (let i = 0; i < n; i++) {
      slotRects.push({ x: (W - rowW) / 2 + i * (tile + gap), y: H * 0.28, w: tile, h: tile });
      tileRects.push({ x: (W - rowW) / 2 + i * (tile + gap), y: H * 0.62, w: tile, h: tile });
    }
    const undoRect = { x: W / 2 - 80, y: H * 0.62 + tile + 30, w: 160, h: 48 };
    let raf = 0, stopped = false, shake = null;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (D.inRect(undoRect, pt.x, pt.y)) { session.removeLast(); return; }
      for (let i = 0; i < n; i++) {
        if (D.inRect(slotRects[i], pt.x, pt.y) && i === session.slots.length - 1) { session.removeLast(); return; }
        if (D.inRect(tileRects[i], pt.x, pt.y)) {
          const res = session.place(i, now);
          if (res && res.type === 'wrong') shake = { until: now + 350 };
          if (res && p.sound === 'yes') env.audio.beep(res.type === 'wrong' ? 200 : 900, 40, 0.1);
          return;
        }
      }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      D.clear(env, shake && now < shake.until ? '#2a1519' : null);
      for (let i = 0; i < n; i++) {
        const filled = i < session.slots.length;
        D.button(ctx, slotRects[i], filled ? session.tiles[session.slots[i]].ch : '', { fill: filled ? D.theme.panelHi : '#141b22', size: tile * 0.55, radius: 10 });
        const t = session.tiles[i];
        D.button(ctx, tileRects[i], t.used ? '' : t.ch, { fill: t.used ? '#141b22' : D.theme.panel, size: tile * 0.55, radius: 10 });
      }
      D.button(ctx, undoRect, 'Zurück', { size: 20 });
      D.text(ctx, 'Setze die Buchstaben zu einem Wort zusammen', W / 2, H * 0.14, { size: 22, align: 'center', color: D.theme.muted });
      D.hud(env, (session.idx + 1 > session.words.length ? session.words.length : session.idx + 1) + ' / ' + session.words.length + '  ·  Fehler ' + session.errors);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'wordbuild', title: 'Wörter bauen', group: 'Gedächtnis und Konzentration',
    summary: 'Durcheinandergewürfelte Buchstaben zu einem Wort ordnen.',
    headline: ['solved', 't_mean'],
    metricKeys: ['solved', 'errors', 't_mean', 't_median', 'total', 'lpm'],
    params: params,
    createSession: function (p, env) { return new WordSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, WordSession: WordSession
  });
}));
