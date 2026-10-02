/* Übung „Bewegte Ziele ordnen“: Zahlen, Buchstaben, Wörter oder Rechenaufgaben bewegen sich über die Fläche
 * (geradlinig oder auf Kreis-/Ellipsenbahn) und müssen in der richtigen Reihenfolge berührt werden.
 * Trainiert Verfolgen bewegter Ziele, Suchen und gedankliches Ordnen unter Zeitdruck. Eigene Implementierung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) require('../lib/draw.js'); if (isNode) require('../lib/words.js');
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'content', label: 'Inhalt', type: 'select', default: 'numbers', options: [
      { value: 'numbers', label: 'Zahlen aufsteigend' }, { value: 'numbers_desc', label: 'Zahlen absteigend' },
      { value: 'letters', label: 'Buchstaben alphabetisch' }, { value: 'words', label: 'Wörter alphabetisch' },
      { value: 'sums', label: 'Summen nach Ergebnis aufsteigend' }, { value: 'products', label: 'Produkte nach Ergebnis aufsteigend' }] },
    { key: 'count', label: 'Anzahl der Ziele', type: 'number', min: 3, max: 15, step: 1, default: 8 },
    { key: 'motion', label: 'Bewegung', type: 'select', default: 'linear', options: [
      { value: 'linear', label: 'Geradlinig (prallt ab)' }, { value: 'circle', label: 'Kreisbahn' }, { value: 'ellipse', label: 'Ellipsenbahn' }] },
    { key: 'speedCmS', label: 'Geschwindigkeit (cm/s)', type: 'number', min: 1, max: 30, step: 0.5, default: 6 },
    { key: 'sizeCm', label: 'Zeichenhöhe (cm)', type: 'number', min: 1.5, max: 8, step: 0.5, default: 3 },
    { key: 'direction', label: 'Umlaufrichtung (Bahnen)', type: 'select', default: 'cw', options: [
      { value: 'cw', label: 'Im Uhrzeigersinn' }, { value: 'ccw', label: 'Gegen den Uhrzeigersinn' }] },
    { key: 'timeLimitS', label: 'Zeitlimit (s, 0 = keines)', type: 'number', min: 0, max: 300, step: 5, default: 0 },
    { key: 'sound', label: 'Ton bei Berührung', type: 'select', default: 'no', options: [{ value: 'no', label: 'Aus' }, { value: 'yes', label: 'An' }] }
  ];

  const LETTER_POOL = 'ABCDEFGHIJKLMNOPRSTUVWZ'.split('');
  const SLACK_CM = 0.3;

  function compare(a, b) { return typeof a === 'number' ? a - b : String(a).localeCompare(String(b), 'de'); }

  function makeContent(p, rng) {
    const n = p.count;
    const out = [];
    if (p.content === 'numbers' || p.content === 'numbers_desc') {
      for (let i = 1; i <= n; i++) out.push({ label: String(i), key: p.content === 'numbers' ? i : -i });
    } else if (p.content === 'letters') {
      rng.shuffle(LETTER_POOL).slice(0, n).forEach(function (c) { out.push({ label: c, key: c }); });
    } else if (p.content === 'words') {
      rng.shuffle(VT.words.all).slice(0, n).forEach(function (w) { out.push({ label: w, key: w }); });
    } else {
      const seen = new Set();
      const mul = p.content === 'products';
      let guard = 0;
      while (out.length < n && guard++ < 5000) {
        const a = mul ? rng.int(2, 9) : rng.int(2, 30), b = mul ? rng.int(2, 9) : rng.int(2, 30);
        const res = mul ? a * b : a + b;
        if (seen.has(res)) continue;
        seen.add(res);
        out.push({ label: a + (mul ? '×' : '+') + b, key: res });
      }
    }
    return out;
  }

  /** Reine Logik. Zeiten in ms, Koordinaten in cm. */
  class OrderSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      const content = makeContent(p, this.rng);
      const size = p.sizeCm;
      this.items = content.map(function (c, i) {
        return { id: i, label: c.label, key: c.key, hw: Math.max(size / 2, c.label.length * size * 0.32), hh: size / 2, x: 0, y: 0, vx: 0, vy: 0, theta: 0, done: false };
      });
      this.order = this.items.slice().sort(function (a, b) { return compare(a.key, b.key); }).map(function (it) { return it.id; });
      this.next = 0;
      this.wrong = 0;
      this.stray = 0;
      this.trials = [];
      this.startedAt = null;
      this.endedAt = null;
      this.last = null;
      this.lastCorrectAt = null;
      this.wrongSince = 0;
      this.finished = false;
      this.layout();
    }

    layout() {
      const p = this.p, items = this.items, rng = this.rng;
      const maxHw = Math.max.apply(null, items.map(function (i) { return i.hw; }));
      const maxHh = items[0].hh;
      if (p.motion === 'linear') {
        items.forEach(function (it, idx) {
          let best = null, bestD = -1;
          for (let t = 0; t < 40; t++) {
            const x = it.hw + rng() * Math.max(0, this.W - 2 * it.hw);
            const y = it.hh + rng() * Math.max(0, this.H - 2 * it.hh);
            let d = Infinity;
            for (let j = 0; j < idx; j++) d = Math.min(d, Math.hypot(x - items[j].x, y - items[j].y));
            if (d > bestD) { bestD = d; best = { x: x, y: y }; }
          }
          it.x = best.x; it.y = best.y;
          const a = rng() * Math.PI * 2;
          it.vx = Math.cos(a) * p.speedCmS; it.vy = Math.sin(a) * p.speedCmS;
        }, this);
      } else {
        this.cx = this.W / 2; this.cy = this.H / 2;
        let rx = Math.max(1, this.W / 2 - maxHw - 0.5), ry = Math.max(1, this.H / 2 - maxHh - 0.5);
        if (p.motion === 'circle') { rx = ry = Math.min(rx, ry); }
        this.rx = rx; this.ry = ry;
        this.omega = (p.speedCmS / ((rx + ry) / 2)) * (p.direction === 'ccw' ? -1 : 1);
        const shuffled = rng.shuffle(items.map(function (i) { return i.id; }));
        shuffled.forEach(function (id, k) { items[id].theta = k * 2 * Math.PI / items.length; });
        items.forEach(function (it) { this.place(it); }, this);
      }
    }

    place(it) {
      it.x = this.cx + this.rx * Math.cos(it.theta);
      it.y = this.cy + this.ry * Math.sin(it.theta);
    }

    start(now) { this.startedAt = now; this.last = now; this.lastCorrectAt = now; }

    expected() { return this.next < this.order.length ? this.items[this.order[this.next]] : null; }

    update(now) {
      if (this.startedAt == null || this.finished) return;
      const dt = Math.min(0.25, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      const W = this.W, H = this.H;
      this.items.forEach(function (it) {
        if (it.done) return;
        if (this.p.motion === 'linear') {
          it.x += it.vx * dt; it.y += it.vy * dt;
          if (it.x < it.hw) { it.x = 2 * it.hw - it.x; it.vx = -it.vx; }
          if (it.x > W - it.hw) { it.x = 2 * (W - it.hw) - it.x; it.vx = -it.vx; }
          if (it.y < it.hh) { it.y = 2 * it.hh - it.y; it.vy = -it.vy; }
          if (it.y > H - it.hh) { it.y = 2 * (H - it.hh) - it.y; it.vy = -it.vy; }
        } else {
          it.theta += this.omega * dt;
          this.place(it);
        }
      }, this);
      if (this.p.timeLimitS > 0 && now - this.startedAt >= this.p.timeLimitS * 1000) this.finish(now);
    }

    finish(now) { this.finished = true; this.endedAt = now; }

    tap(x, y, now) {
      if (this.startedAt == null || this.finished) return null;
      let hit = null, bestD = Infinity;
      this.items.forEach(function (it) {
        if (it.done) return;
        if (Math.abs(x - it.x) <= it.hw + SLACK_CM && Math.abs(y - it.y) <= it.hh + SLACK_CM) {
          const d = Math.hypot(x - it.x, y - it.y);
          if (d < bestD) { bestD = d; hit = it; }
        }
      });
      if (!hit) { this.stray++; return { type: 'stray' }; }
      const exp = this.expected();
      if (hit.id !== exp.id) { this.wrong++; this.wrongSince++; return { type: 'wrong', expected: exp.label }; }
      hit.done = true;
      this.trials.push({ nr: this.next + 1, label: hit.label, ms_since_prev: Math.round(now - this.lastCorrectAt), wrong_before: this.wrongSince });
      this.wrongSince = 0;
      this.lastCorrectAt = now;
      this.next++;
      if (this.next >= this.order.length) this.finish(now);
      return { type: 'hit', label: hit.label };
    }

    summary() {
      const m = VT.metric;
      const total = this.endedAt != null ? (this.endedAt - this.startedAt) / 1000 : null;
      const times = this.trials.map(function (t) { return t.ms_since_prev; });
      return {
        metrics: [
          m('solved', 'Richtig berührte Ziele', this.trials.length, 'von ' + this.items.length),
          m('total', 'Gesamtzeit', VT.round(total, 1), 's'),
          m('wrong', 'Falsche Ziele berührt', this.wrong),
          m('stray', 'Danebengetippt', this.stray),
          m('t_mean', 'Zeit pro Ziel (Mittel)', VT.round(VT.mean(times), 0), 'ms'),
          m('t_sd', 'Zeit pro Ziel (Streuung)', VT.round(VT.sd(times), 0), 'ms')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function run(env, p, finish) {
    const D = VT.draw, ctx = env.ctx, px = env.calib.pxPerCm;
    const session = new OrderSession(p, { rng: env.rng, fieldWcm: env.width / px, fieldHcm: env.height / px });
    const task = { numbers: 'Zahlen von klein nach groß', numbers_desc: 'Zahlen von groß nach klein', letters: 'Buchstaben nach Alphabet', words: 'Wörter nach Alphabet', sums: 'Rechenaufgaben nach Ergebnis, kleinstes zuerst', products: 'Rechenaufgaben nach Ergebnis, kleinstes zuerst' }[p.content];
    let raf = 0, stopped = false, flash = null;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev);
      const now = env.now();
      const res = session.tap(pt.x / px, pt.y / px, now);
      if (!res) return;
      if (res.type === 'wrong') flash = { until: now + 250 };
      if (p.sound === 'yes') env.audio.beep(res.type === 'hit' ? 1100 : 200, res.type === 'hit' ? 40 : 90, 0.12);
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env, flash && now < flash.until ? '#2a1519' : null);
      session.items.forEach(function (it) {
        if (it.done) return;
        ctx.fillStyle = '#1c242d';
        D.roundRect(ctx, (it.x - it.hw) * px, (it.y - it.hh) * px, 2 * it.hw * px, 2 * it.hh * px, 10);
        ctx.fill();
        D.text(ctx, it.label, it.x * px, it.y * px, { size: p.sizeCm * px * 0.8, weight: 'bold', align: 'center', baseline: 'middle' });
      });
      D.hud(env, task + '  ·  ' + session.next + ' / ' + session.items.length + '  ·  Fehler ' + session.wrong);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'ordering', title: 'Bewegte Ziele ordnen', group: 'Wahrnehmung und Koordination',
    summary: 'Bewegte Zahlen, Buchstaben, Wörter oder Rechenaufgaben in der richtigen Reihenfolge berühren.',
    headline: ['total', 'wrong'],
    metricKeys: ['solved', 'total', 'wrong', 'stray', 't_mean', 't_sd'],
    params: params,
    createSession: function (p, env) { return new OrderSession(VT.sanitizeParams({ params: params }, p), env); },
    run: run, OrderSession: OrderSession
  });
}));
