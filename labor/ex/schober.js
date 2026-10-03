/* Übung „Schober-Test (digital, Rot-Blau-Brille)“: Ein Auge sieht nur ein Kreuz, das andere nur einen Ring (getrennte Bilder, Phorie-Messung).
 * Die Person verschiebt das Kreuz in Schritten (Prismendioptrien), bis es mittig im Ring erscheint. Der Versatz ist ein Maß für die Ruhelage der Augen
 * (Eso-/Exophorie, Höhenabweichung). Gemessen wird von beiden Seiten (Start links und rechts bzw. oben und unten), um Verzerrung zu vermeiden.
 * Hilfsmittel für Fachpersonen: Vorzeichen und Umrechnung sind aus dem Prinzip hergeleitet und vor klinischer Nutzung gegen ein bekanntes Messverfahren zu prüfen. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'axes', label: 'Richtungen', type: 'select', default: 'both', options: [
      { value: 'both', label: 'Waagerecht und senkrecht' }, { value: 'horizontal', label: 'Nur waagerecht' }, { value: 'vertical', label: 'Nur senkrecht' }] },
    { key: 'stepPd', label: 'Schrittweite (Δ)', type: 'number', min: 0.25, max: 2, step: 0.25, default: 0.5 },
    { key: 'startPd', label: 'Startversatz (Δ, beidseitig)', type: 'number', min: 2, max: 14, step: 1, default: 6 },
    { key: 'crossColor', label: 'Das Kreuz ist', type: 'select', default: 'red', options: [{ value: 'red', label: 'rot (Ring blau)' }, { value: 'blue', label: 'blau (Ring rot)' }] },
    { key: 'sizeCm', label: 'Ringdurchmesser (cm)', type: 'number', min: 2, max: 12, step: 0.5, default: 5 },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  /** Auge, das das Kreuz sieht. */
  function crossEyeOf(p) {
    const red = p.redEye === 'right' ? 'right' : 'left';
    const blue = red === 'left' ? 'right' : 'left';
    return p.crossColor === 'red' ? red : blue;
  }

  /**
   * Phorie aus dem nötigen Kreuzversatz (Δ). shift > 0: Kreuz nach rechts (waagerecht) bzw. nach oben (senkrecht) geschoben.
   * Waagerecht: + Esophorie, − Exophorie. Senkrecht: + rechts höher (RH), − links höher (LH).
   * Herleitung: Sieht das rechte Auge das Kreuz und ist esophor (Auge nach innen), erscheint das Kreuz rechts vom Ring; zum Ausgleich wird es nach links
   * geschoben (negativer Versatz = Eso). Beim linken Auge gilt das Spiegelbild. Steht das kreuzsehende Auge höher, erscheint das Kreuz tiefer und wird nach oben geschoben.
   */
  function phoriaH(shift, crossEye) { return (crossEye === 'right' ? -shift : shift) + 0; }
  function phoriaV(shift, crossEye) { return (crossEye === 'right' ? shift : -shift) + 0; }

  /** Reine Logik. Versatz in Δ. */
  class SchoberSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.crossEye = crossEyeOf(p);
      const axes = p.axes === 'both' ? ['h', 'v'] : [p.axes === 'horizontal' ? 'h' : 'v'];
      this.plan = [];
      axes.forEach(function (a) {
        const sign = env.rng() < 0.5 ? 1 : -1;
        this.plan.push({ axis: a, start: sign * p.startPd }, { axis: a, start: -sign * p.startPd });
      }, this);
      this.idx = 0;
      this.shift = this.plan[0].start;
      this.trials = [];
      this.finished = false;
      this.startedAt = null;
      this.endedAt = null;
      this.runStartedAt = null;
    }
    start(now) { this.startedAt = now; this.runStartedAt = now; }
    axis() { return this.plan[this.idx] ? this.plan[this.idx].axis : null; }
    /** dir: +1 = Kreuz nach rechts/oben, −1 = nach links/unten. */
    step(dir) {
      if (this.finished) return null;
      this.shift = +(this.shift + dir * this.p.stepPd).toFixed(4);
      return { type: 'step', shift: this.shift };
    }
    /** Kreuz erscheint mittig im Ring. */
    confirm(now) {
      if (this.finished) return null;
      const run = this.plan[this.idx];
      const ph = run.axis === 'h' ? phoriaH(this.shift, this.crossEye) : phoriaV(this.shift, this.crossEye);
      this.trials.push({ nr: this.idx + 1, axis: run.axis === 'h' ? 'waagerecht' : 'senkrecht', start_pd: run.start, shift_pd: this.shift, phoria_pd: VT.round(ph, 2), ms: Math.round(now - this.runStartedAt) });
      this.idx++;
      if (this.idx >= this.plan.length) { this.finished = true; this.endedAt = now; }
      else { this.shift = this.plan[this.idx].start; this.runStartedAt = now; }
      return { type: 'confirmed' };
    }
    summary() {
      const m = VT.metric;
      const vals = function (a) { return this.trials.filter(function (t) { return t.axis === a; }).map(function (t) { return t.phoria_pd; }); }.bind(this);
      const h = vals('waagerecht'), v = vals('senkrecht');
      return {
        metrics: [
          m('runs', 'Messungen', this.trials.length),
          m('h_phoria', 'Waagerechte Abweichung (+ Eso, − Exo)', VT.round(VT.mean(h), 2), 'Δ'),
          m('h_sd', 'Waagerecht: Unterschied der beiden Messungen', h.length > 1 ? VT.round(Math.abs(h[0] - h[1]), 2) : null, 'Δ'),
          m('v_phoria', 'Senkrechte Abweichung (+ rechts höher, − links höher)', VT.round(VT.mean(v), 2), 'Δ'),
          m('v_sd', 'Senkrecht: Unterschied der beiden Messungen', v.length > 1 ? VT.round(Math.abs(v[0] - v[1]), 2) : null, 'Δ')
        ],
        trials: this.trials.slice()
      };
    }
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new SchoberSession(p, { rng: env.rng });
    const col = env.colors;
    const crossCol = p.crossColor === 'red' ? col.red : col.blue;
    const ringCol = p.crossColor === 'red' ? col.blue : col.red;
    const btns = D.row(4, { x: 20, y: H - 96, w: W - 40 - Math.min(250, W * 0.3) - 10, h: 64 }, 10);
    const okBtn = { x: W - 20 - Math.min(250, W * 0.3), y: H - 96, w: Math.min(250, W * 0.3), h: 64 };
    let raf = 0, stopped = false;

    function act(i) {
      // Tasten: [stark −, −, +, stark +] (stark = 4 Schritte)
      const dirs = [-4, -1, 1, 4];
      for (let k = 0; k < Math.abs(dirs[i]); k++) session.step(Math.sign(dirs[i]));
    }
    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev);
      if (D.inRect(okBtn, pt.x, pt.y)) { session.confirm(env.now()); return; }
      for (let i = 0; i < btns.length; i++) if (D.inRect(btns[i], pt.x, pt.y)) { act(i); return; }
    }
    function onKey(ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); session.confirm(env.now()); }
      else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') { ev.preventDefault(); session.step(-1); }
      else if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') { ev.preventDefault(); session.step(1); }
    }
    function stop() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', onKey); }
    function frame() {
      if (stopped) return;
      D.clear(env);
      const cx = W / 2, cy = H * 0.4, R = p.sizeCm * px / 2;
      const off = A.pdToCm(session.shift, env.calib.viewDistanceCm) * px;
      const horizontal = session.axis() !== 'v';
      const kx = cx + (horizontal ? off : 0), ky = cy - (horizontal ? 0 : off);
      A.withColor(ctx, ringCol, function () { ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); });
      A.withColor(ctx, crossCol, function () {
        ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kx - R * 0.45, ky); ctx.lineTo(kx + R * 0.45, ky); ctx.moveTo(kx, ky - R * 0.45); ctx.lineTo(kx, ky + R * 0.45); ctx.stroke();
      });
      D.text(ctx, 'Schiebe das Kreuz, bis es genau in der Mitte des Rings liegt, dann „Mittig“.', W / 2, 40, { size: 20, align: 'center', color: D.theme.muted });
      const lab = horizontal ? ['⇐⇐', '←', '→', '⇒⇒'] : ['⇓⇓', '↓', '↑', '⇑⇑'];
      btns.forEach(function (b, i) { D.button(ctx, b, lab[i], { size: 24 }); });
      D.button(ctx, okBtn, 'Mittig (Enter)', { size: 20, fill: D.theme.accent, color: '#06201a' });
      D.hud(env, (horizontal ? 'Waagerecht' : 'Senkrecht') + '  ·  Messung ' + Math.min(session.idx + 1, session.plan.length) + ' / ' + session.plan.length);
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
    id: 'schober', title: 'Schober-Test (digital)', group: 'Funktionsprüfung (Fachperson)',
    summary: 'Kreuz (ein Auge) in Ring (anderes Auge) mittig schieben; Versatz in Prismendioptrien als Phorie-Maß.',
    headline: ['h_phoria', 'v_phoria'],
    metricKeys: ['runs', 'h_phoria', 'h_sd', 'v_phoria', 'v_sd'],
    params: params,
    createSession: function (p, env) { return new SchoberSession(VT.sanitizeParams({ params: params }, p), env); },
    run: VT.anaglyph.wrapRun(runInner), SchoberSession: SchoberSession, phoriaH: phoriaH, phoriaV: phoriaV, crossEyeOf: crossEyeOf
  });
}));
