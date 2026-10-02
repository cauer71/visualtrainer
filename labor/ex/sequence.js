/* Übung „Sequenz-Gedächtnis“: Felder eines Rasters leuchten nacheinander auf, die Folge muss in derselben Reihenfolge angetippt werden.
 * Die Länge steigt mit jeder richtig wiederholten Folge. Trainiert das visuell-räumliche Arbeitsgedächtnis.
 * Eigene Implementierung nach dem allgemein bekannten Prinzip (Zeigespanne). */
(function (root, factory) {
  const VT = (typeof module === 'object' && module.exports) ? require('../lib/core.js') : root.VT;
  const ex = factory(VT);
  if (typeof module === 'object' && module.exports) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'rows', label: 'Zeilen', type: 'number', min: 2, max: 8, step: 1, default: 3 },
    { key: 'cols', label: 'Spalten', type: 'number', min: 2, max: 10, step: 1, default: 3 },
    { key: 'startLength', label: 'Startlänge der Folge', type: 'number', min: 1, max: 10, step: 1, default: 2 },
    { key: 'showMs', label: 'Aufleuchtdauer je Feld (ms)', type: 'number', min: 150, max: 3000, step: 50, default: 700 },
    { key: 'gapMs', label: 'Pause zwischen Feldern (ms)', type: 'number', min: 0, max: 1500, step: 50, default: 250 },
    { key: 'growth', label: 'Nächste Folge', type: 'select', default: 'extend', options: [
      { value: 'extend', label: 'Alte Folge plus ein Feld' }, { value: 'fresh', label: 'Komplett neue Folge' }] },
    { key: 'onError', label: 'Nach einem Fehler', type: 'select', default: 'same', options: [
      { value: 'same', label: 'Gleiche Länge, neue Folge' },
      { value: 'down', label: 'Eine Länge kürzer' },
      { value: 'restart', label: 'Von vorn beginnen' }] },
    { key: 'maxErrors', label: 'Ende nach Fehlern (0 = unbegrenzt)', type: 'number', min: 0, max: 20, step: 1, default: 3 },
    { key: 'maxLength', label: 'Ende bei Länge', type: 'number', min: 3, max: 40, step: 1, default: 20 },
    { key: 'durationS', label: 'Zeitlimit (s, 0 = keines)', type: 'number', min: 0, max: 900, step: 10, default: 0 }
  ];

  /** Reine Spiellogik (Zustandsautomat). Zeiten in ms. */
  class SequenceGame {
    constructor(p, rng) {
      this.p = p;
      this.rng = rng;
      this.cells = p.rows * p.cols;
      this.length = p.startLength;
      this.seq = null;
      this.pos = 0;
      this.phase = 'idle'; // idle | show | input | done
      this.pending = 'fresh';
      this.roundNo = 0;
      this.completedRounds = 0;
      this.maxCompleted = 0;
      this.errors = 0;
      this.inputs = [];
      this.startedAt = null;
      this.endedAt = null;
      this.lastInputAt = null;
    }

    begin(now) { this.startedAt = now; }

    randomCell(prev) {
      if (this.cells === 1) return 0;
      let c;
      do { c = Math.floor(this.rng() * this.cells); } while (c === prev);
      return c;
    }

    randomSeq(n) {
      const s = [];
      for (let i = 0; i < n; i++) s.push(this.randomCell(i ? s[i - 1] : -1));
      return s;
    }

    newRound() {
      if (this.pending === 'extend' && this.p.growth === 'extend' && this.seq) {
        this.seq = this.seq.concat([this.randomCell(this.seq[this.seq.length - 1])]);
        this.length = this.seq.length;
      } else {
        this.seq = this.randomSeq(this.length);
      }
      this.pending = null;
      this.pos = 0;
      this.roundNo++;
      this.phase = 'show';
      return this.seq;
    }

    showSchedule() {
      const step = this.p.showMs + this.p.gapMs;
      const p = this.p;
      return {
        steps: this.seq.map(function (cell, i) { return { cell: cell, onAt: i * step, offAt: i * step + p.showMs }; }),
        totalMs: this.seq.length * step
      };
    }

    beginInput(now) {
      this.phase = 'input';
      this.pos = 0;
      this.lastInputAt = now;
    }

    input(cell, now) {
      if (this.phase !== 'input') return null;
      const expected = this.seq[this.pos];
      const rt = now - this.lastInputAt;
      this.lastInputAt = now;
      if (cell === expected) {
        this.inputs.push({ round: this.roundNo, pos: this.pos + 1, length: this.seq.length, cell: cell, correct: 1, rt_ms: Math.round(rt) });
        this.pos++;
        if (this.pos >= this.seq.length) {
          this.phase = 'done';
          this.completedRounds++;
          this.maxCompleted = Math.max(this.maxCompleted, this.seq.length);
          this.length = this.seq.length + 1;
          this.pending = 'extend';
          return { result: 'complete', length: this.seq.length };
        }
        return { result: 'ok' };
      }
      this.inputs.push({ round: this.roundNo, pos: this.pos + 1, length: this.seq.length, cell: cell, correct: 0, rt_ms: Math.round(rt) });
      this.errors++;
      this.phase = 'done';
      if (this.p.onError === 'restart') this.length = this.p.startLength;
      else if (this.p.onError === 'down') this.length = Math.max(this.p.startLength, this.seq.length - 1);
      else this.length = this.seq.length;
      this.pending = 'fresh';
      return { result: 'error', expected: expected };
    }

    isOver(now) {
      if (this.p.maxErrors > 0 && this.errors >= this.p.maxErrors) return true;
      if (this.maxCompleted >= this.p.maxLength) return true;
      if (this.p.durationS > 0 && this.startedAt != null && now - this.startedAt >= this.p.durationS * 1000) return true;
      return false;
    }

    finish(now) { this.endedAt = now; }

    summary() {
      const m = VT.metric;
      const correct = this.inputs.filter(function (i) { return i.correct; });
      const rts = correct.map(function (i) { return i.rt_ms; });
      const total = this.endedAt != null && this.startedAt != null ? (this.endedAt - this.startedAt) / 1000 : null;
      return {
        metrics: [
          m('span', 'Längste richtig wiederholte Folge', this.maxCompleted, 'Felder'),
          m('rounds', 'Richtig wiederholte Folgen', this.completedRounds),
          m('errors', 'Fehler', this.errors),
          m('accuracy', 'Richtige Eingaben', this.inputs.length ? VT.round(100 * correct.length / this.inputs.length, 1) : null, '%'),
          m('rt_mean', 'Zeit pro richtiger Eingabe (Mittel)', VT.round(VT.mean(rts), 0), 'ms'),
          m('total', 'Gesamtzeit', VT.round(total, 1), 's')
        ],
        trials: this.inputs.slice()
      };
    }
  }

  function run(env, p, finish) {
    const ctx = env.ctx;
    const W = env.width, H = env.height;
    const game = new SequenceGame(p, env.rng);
    const headerH = 70, gap = 12;
    const cell = Math.max(10, Math.min((W - gap * (p.cols + 1)) / p.cols, (H - headerH - gap * (p.rows + 1)) / p.rows));
    const gridW = cell * p.cols + gap * (p.cols - 1), gridH = cell * p.rows + gap * (p.rows - 1);
    const gx = (W - gridW) / 2, gy = headerH + (H - headerH - gridH) / 2;
    let phase = 'ready', phaseStart = env.now(), schedule = null, flash = null, banner = '', raf = 0, stopped = false;

    function rect(i) {
      return { x: gx + (i % p.cols) * (cell + gap), y: gy + Math.floor(i / p.cols) * (cell + gap), s: cell };
    }
    function cellAt(x, y) {
      for (let i = 0; i < game.cells; i++) {
        const r = rect(i);
        if (x >= r.x && x <= r.x + r.s && y >= r.y && y <= r.y + r.s) return i;
      }
      return -1;
    }

    function onDown(ev) {
      ev.preventDefault();
      if (phase !== 'input') return;
      const b = env.canvas.getBoundingClientRect();
      const i = cellAt(ev.clientX - b.left, ev.clientY - b.top);
      if (i < 0) return;
      const now = env.now();
      const res = game.input(i, now);
      if (!res) return;
      flash = { cell: i, ok: res.result !== 'error', until: now + 250 };
      if (res.result === 'complete') { phase = 'feedback'; phaseStart = now; banner = 'Richtig'; }
      if (res.result === 'error') { phase = 'feedback'; phaseStart = now; banner = 'Fehler'; flash = { cell: res.expected, ok: false, until: now + 700, expected: true }; }
    }

    function stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown);
    }

    function frame() {
      if (stopped) return;
      const now = env.now();
      let lit = -1;
      if (phase === 'ready' && now - phaseStart >= 700) {
        game.newRound();
        schedule = game.showSchedule();
        phase = 'show'; phaseStart = now;
      } else if (phase === 'show') {
        const t = now - phaseStart;
        const step = schedule.steps.find(function (s) { return t >= s.onAt && t < s.offAt; });
        if (step) lit = step.cell;
        if (t >= schedule.totalMs) { game.beginInput(now); phase = 'input'; }
      } else if (phase === 'feedback' && now - phaseStart >= 700) {
        if (game.isOver(now)) { game.finish(now); stop(); finish(game.summary()); return; }
        phase = 'ready'; phaseStart = now; banner = '';
      }

      ctx.fillStyle = '#101418';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#9aa7b4';
      ctx.font = '20px sans-serif';
      const head = 'Länge ' + (game.seq ? game.seq.length : game.length) + '  ·  Fehler ' + game.errors + (p.maxErrors ? ' / ' + p.maxErrors : '');
      ctx.fillText(head, W / 2, 30);
      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = phase === 'input' ? '#3bceac' : '#9aa7b4';
      ctx.fillText(banner || (phase === 'input' ? 'Du bist dran' : (phase === 'show' ? 'Merken' : '')), W / 2, 58);
      for (let i = 0; i < game.cells; i++) {
        const r = rect(i);
        let color = '#1c242d';
        if (i === lit) color = '#ffd23f';
        if (flash && now < flash.until && flash.cell === i) color = flash.ok ? '#3bceac' : (flash.expected ? '#5dade2' : '#ee4266');
        ctx.fillStyle = color;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(r.x, r.y, r.s, r.s, 14); else ctx.rect(r.x, r.y, r.s, r.s);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    env.canvas.addEventListener('pointerdown', onDown);
    game.begin(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'sequence',
    title: 'Sequenz-Gedächtnis',
    group: 'Gedächtnis und Konzentration',
    summary: 'Eine Folge aufleuchtender Felder merken und in gleicher Reihenfolge antippen.',
    headline: ['span', 'errors'],
    metricKeys: ['span', 'rounds', 'errors', 'accuracy', 'rt_mean', 'total'],
    params: params,
    createSession: function (p, env) { return new SequenceGame(VT.sanitizeParams({ params: params }, p), env.rng); },
    run: run,
    SequenceGame: SequenceGame
  });
}));
