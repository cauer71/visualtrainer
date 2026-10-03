/* Übung „Tiefensehen (Zufallspunkte, Rot-Blau-Brille)“: In einem Feld aus Zufallspunkten schwebt ein Quadrat vor oder hinter der Fläche.
 * Du gibst an, wo es liegt (oben, unten, links, rechts). Die Punktbilder beider Augen werden in Rot und Blau übereinandergelegt.
 * Die Tiefe (Disparität) wird adaptiv verringert, bis die Schwelle in Winkelsekunden ermittelt ist.
 * Grenzen: Anaglyphen lassen Restspuren sichtbar (Farbsäume), und die Anzeige löst nur etwa ein Pixel auf. Eine Übung und grobe Orientierung,
 * kein klinischer Stereotest. Eigene Implementierung nach dem allgemein bekannten Zufallspunkt-Prinzip. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); require('../lib/adaptive.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'trials', label: 'Anzahl der Durchgänge', type: 'number', min: 12, max: 80, step: 2, default: 30 },
    { key: 'startArcsec', label: 'Start-Disparität (Winkelsekunden)', type: 'number', min: 20, max: 3600, step: 20, default: 600 },
    { key: 'adaptive', label: 'Disparität automatisch anpassen', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja (Schwelle bestimmen)' }, { value: 'no', label: 'Nein (fest)' }] },
    { key: 'fieldCm', label: 'Kantenlänge des Punktfeldes (cm)', type: 'number', min: 8, max: 26, step: 1, default: 14 },
    { key: 'regionCm', label: 'Kantenlänge des Quadrats (cm)', type: 'number', min: 2, max: 10, step: 0.5, default: 5 },
    { key: 'dots', label: 'Anzahl der Punkte', type: 'number', min: 150, max: 1500, step: 50, default: 600 },
    { key: 'dotCm', label: 'Punktdurchmesser (cm)', type: 'number', min: 0.1, max: 0.6, step: 0.05, default: 0.25 },
    { key: 'noise', label: 'Rauschen im Hintergrund', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja (verdeckt Hinweise)' }, { value: 'no', label: 'Nein' }] },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  const LOCATIONS = ['oben', 'unten', 'links', 'rechts'];
  const OFFSET = { oben: [0, -1], unten: [0, 1], links: [-1, 0], rechts: [1, 0] };
  const FEEDBACK_MS = 500;

  /** Reine Logik. env: { rng, calib } (calib liefert Abstand und Pixelgröße). */
  class StereoSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.calib = env.calib;
      this.stair = p.adaptive === 'yes' ? VT.makeStaircase({ start: p.startArcsec, min: 10, max: 3600, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2 }) : null;
      this.idx = 0;
      this.trials = [];
      this.phase = 'idle';
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
    }

    arcsec() { return this.stair ? this.stair.value() : this.p.startArcsec; }
    pixelArcsec() { return VT.anaglyph.cmToArcsec(1 / this.calib.pxPerCm, this.calib.viewDistanceCm); }

    start(now) { this.startedAt = now; this.begin(now); }

    /** Punkte relativ zur Feldmitte (cm). Jeder Punkt hat x, y sowie Bildorte je Auge. */
    makeDots(location, sign, arcsec) {
      const p = this.p, rng = this.rng, half = p.fieldCm / 2, r = p.regionCm / 2;
      const off = OFFSET[location];
      const cx = off[0] * (half - r - 0.3), cy = off[1] * (half - r - 0.3);
      const dcm = VT.anaglyph.arcsecToCm(arcsec, this.calib.viewDistanceCm);
      const dots = [];
      for (let i = 0; i < p.dots; i++) {
        const x = (rng() * 2 - 1) * half, y = (rng() * 2 - 1) * half;
        const inside = Math.abs(x - cx) <= r && Math.abs(y - cy) <= r;
        let d = 0;
        if (inside) d = sign * dcm;
        else if (p.noise === 'yes') d = (rng() * 2 - 1) * 2 * dcm;
        // positive d (gekreuzt): Bild des linken Auges liegt rechts vom Bild des rechten Auges → Punkt erscheint näher
        dots.push({ x: x, y: y, lx: x + d / 2, rx: x - d / 2, inside: inside });
      }
      return { dots: dots, region: { x: cx, y: cy, size: p.regionCm } };
    }

    begin(now) {
      if (this.idx >= this.p.trials) { this.finished = true; this.endedAt = now; this.phase = 'done'; return; }
      this.location = this.rng.pick(LOCATIONS);
      this.sign = this.rng() < 0.5 ? 1 : -1;
      this.curArcsec = this.arcsec();
      this.scene = this.makeDots(this.location, this.sign, this.curArcsec);
      this.phase = 'show';
      this.phaseAt = now;
    }

    update(now) {
      if (this.phase === 'feedback' && now - this.phaseAt >= FEEDBACK_MS) { this.idx++; this.begin(now); }
    }

    answer(location, now) {
      if (this.phase !== 'show') return null;
      const correct = location === this.location;
      this.trials.push({
        nr: this.idx + 1, location: this.location, answer: location, depth: this.sign > 0 ? 'vor' : 'hinter',
        correct: correct ? 1 : 0, arcsec: Math.round(this.curArcsec), rt_ms: Math.round(now - this.phaseAt)
      });
      if (this.stair) this.stair.record(correct);
      this.phase = 'feedback';
      this.phaseAt = now;
      return { type: 'result', correct: correct };
    }

    summary() {
      const m = VT.metric;
      const ok = this.trials.filter(function (t) { return t.correct; });
      const metrics = [
        m('correct', 'Richtig lokalisiert', ok.length, 'von ' + this.trials.length),
        m('accuracy', 'Trefferquote', this.trials.length ? VT.round(100 * ok.length / this.trials.length, 1) : null, '%'),
        m('chance', 'Zufallsniveau', 25, '%'),
        m('rt_mean', 'Antwortzeit (Mittel)', VT.round(VT.mean(this.trials.map(function (t) { return t.rt_ms; })), 0), 'ms'),
        m('px_arcsec', 'Disparität von einem Pixel (Auflösungsgrenze)', VT.round(this.pixelArcsec(), 0), '″')
      ];
      if (this.stair) {
        metrics.push(m('threshold', 'Geschätzte Schwelle', VT.round(this.stair.threshold(), 0), '″'));
        metrics.push(m('final_arcsec', 'Letzte Disparität', this.arcsec(), '″'));
      } else {
        metrics.push(m('fixed_arcsec', 'Feste Disparität', this.p.startArcsec, '″'));
      }
      return { metrics: metrics, trials: this.trials.slice() };
    }
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new StereoSession(p, { rng: env.rng, calib: env.calib });
    const col = env.colors;
    const field = Math.min(p.fieldCm * px, H * 0.62);
    const cx = W / 2, cy = H * 0.38;
    const labels = LOCATIONS.map(function (l) { return l.charAt(0).toUpperCase() + l.slice(1); });
    const btns = D.row(4, { x: 20, y: H - 100, w: W - 40, h: 64 }, 12);
    let raf = 0, stopped = false;

    function onDown(ev) {
      ev.preventDefault();
      if (session.phase !== 'show') return;
      const pt = D.pointer(env.canvas, ev);
      for (let i = 0; i < btns.length; i++) if (D.inRect(btns[i], pt.x, pt.y)) { session.answer(LOCATIONS[i], env.now()); return; }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
    function frame() {
      if (stopped) return;
      const now = env.now();
      session.update(now);
      D.clear(env);
      if (session.phase === 'show' && session.scene) {
        const dr = Math.max(1.5, p.dotCm * px / 2);
        [['left', col.left, 'lx'], ['right', col.right, 'rx']].forEach(function (e) {
          A.withColor(ctx, e[1], function () {
            session.scene.dots.forEach(function (d) {
              ctx.beginPath(); ctx.arc(cx + d[e[2]] * px, cy + d.y * px, dr, 0, Math.PI * 2); ctx.fill();
            });
          });
        });
        ctx.strokeStyle = '#26303b'; ctx.lineWidth = 2; ctx.strokeRect(cx - field / 2, cy - field / 2, field, field);
        D.text(ctx, 'Wo schwebt das Quadrat?', W / 2, 40, { size: 22, align: 'center', color: D.theme.muted });
        btns.forEach(function (r, i) { D.button(ctx, r, labels[i], { size: 22 }); });
      } else if (session.phase === 'feedback') {
        const last = session.trials[session.trials.length - 1];
        D.text(ctx, last.correct ? 'Richtig' : 'Es war: ' + last.location, W / 2, H / 2, { size: 36, weight: 'bold', align: 'center', baseline: 'middle', color: last.correct ? D.theme.accent : D.theme.warn });
      }
      D.hud(env, Math.min(session.idx + 1, p.trials) + ' / ' + p.trials + (p.adaptive === 'yes' ? '  ·  ' + session.arcsec() + '″' : ''));
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'stereo', title: 'Tiefensehen (Zufallspunkte)', group: 'Binokulares Sehen (Rot-Blau-Brille)',
    summary: 'In Zufallspunkten ein vor oder hinter der Fläche schwebendes Quadrat lokalisieren; Schwelle in Winkelsekunden.',
    headline: ['accuracy', 'threshold'],
    metricKeys: ['correct', 'accuracy', 'chance', 'rt_mean', 'px_arcsec', 'threshold', 'final_arcsec', 'fixed_arcsec'],
    params: params,
    createSession: function (p, env) { return new StereoSession(VT.sanitizeParams({ params: params }, p), env); },
    run: VT.anaglyph.wrapRun(runInner), StereoSession: StereoSession
  });
}));
