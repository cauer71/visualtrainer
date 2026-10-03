/* Übung „Diplopie-Karte (digital, Rot-Blau-Brille)“: In neun Blickrichtungen (Mitte und acht Randpunkte) erscheint ein Ziel, ein Auge sieht es rot, das andere ein blaues.
 * Die Person gibt an, ob sie ein Bild („einfach“) oder zwei („doppelt“) sieht. Bei Doppelbildern schiebt sie das blaue Bild auf das rote; der nötige Versatz
 * ist das Maß der Abweichung in dieser Blickrichtung (in Prismendioptrien). Am Ende zeigt eine Karte, wo Doppelbilder auftreten.
 * Hilfsmittel für Fachpersonen, kein Ersatz für eine Befundung. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); require('../lib/gaze.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'gazeDeg', label: 'Blickwinkel der Randpunkte (°)', type: 'number', min: 5, max: 35, step: 5, default: 15 },
    { key: 'targetCm', label: 'Zielgröße (cm)', type: 'number', min: 0.5, max: 2.5, step: 0.1, default: 1 },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  const MARGIN_CM = 1.5;

  /** Reine Logik. Bildschirmkoordinaten in cm (Ursprung links oben); Versatz in Prismendioptrien (Δ). */
  class DiplopiaSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.dist = env.calib.viewDistanceCm;
      this.fit = VT.gaze.fit(this.dist, VT.gaze.nineGrid(p.gazeDeg), this.W, this.H, MARGIN_CM);
      this.points = this.fit.points;
      this.order = this.rng.shuffle(this.points.map(function (_, i) { return i; }));
      this.k = 0;
      this.state = 'idle';
      this.results = [];
      this.marker = null;
      this.moved = false;
      this.startedAt = null;
      this.endedAt = null;
      this.shownAt = null;
      this.finished = false;
    }

    current() { return this.state === 'ask' || this.state === 'align' ? this.points[this.order[this.k]] : null; }

    start(now) { this.startedAt = now; this.shownAt = now; this.state = 'ask'; }

    record(t, double, dxCm, dyCm, now) {
      this.results.push({
        nr: this.k + 1, id: t.id, h_deg: VT.round(t.hx, 1), v_deg: VT.round(t.vy, 1), double: double ? 1 : 0,
        sep_h_pd: double ? VT.round(VT.anaglyph.cmToPd(dxCm, this.dist), 1) : 0,
        sep_v_pd: double ? VT.round(VT.anaglyph.cmToPd(-dyCm, this.dist), 1) : 0,
        ms: Math.round(now - this.shownAt), tsx: t.sx, tsy: t.sy, psx: t.sx + (dxCm || 0), psy: t.sy + (dyCm || 0)
      });
      this.k++;
      this.marker = null;
      this.moved = false;
      this.shownAt = now;
      if (this.k >= this.order.length) { this.state = 'chart'; this.endedAt = now; } else this.state = 'ask';
    }

    answerSingle(now) { if (this.state !== 'ask') return null; this.record(this.current(), false, 0, 0, now); return { type: 'single' }; }

    answerDouble() {
      if (this.state !== 'ask') return null;
      const t = this.current();
      this.state = 'align';
      this.marker = { x: t.sx, y: t.sy };
      this.moved = false;
      return { type: 'double' };
    }

    place(x, y) {
      if (this.state !== 'align') return;
      this.marker = { x: Math.max(0, Math.min(this.W, x)), y: Math.max(0, Math.min(this.H, y)) };
      this.moved = true;
    }

    confirm(now) {
      if (this.state !== 'align' || !this.moved) return null;
      const t = this.current();
      this.record(t, true, this.marker.x - t.sx, this.marker.y - t.sy, now);
      return { type: 'confirmed' };
    }

    closeChart() { if (this.state === 'chart') { this.state = 'done'; this.finished = true; } }

    summary() {
      const m = VT.metric;
      const dbl = this.results.filter(function (r) { return r.double; });
      const center = this.results.find(function (r) { return r.h_deg === 0 && r.v_deg === 0; });
      const mag = dbl.map(function (r) { return Math.hypot(r.sep_h_pd, r.sep_v_pd); });
      const trials = this.results.map(function (r) { const c = Object.assign({}, r); delete c.tsx; delete c.tsy; delete c.psx; delete c.psy; return c; });
      return {
        metrics: [
          m('positions', 'Geprüfte Blickrichtungen', this.results.length),
          m('double', 'Richtungen mit Doppelbildern', dbl.length),
          m('double_pct', 'Anteil mit Doppelbildern', this.results.length ? VT.round(100 * dbl.length / this.results.length, 0) : null, '%'),
          m('sep_mean', 'Mittlerer Versatz bei Doppelbildern', VT.round(VT.mean(mag), 1), 'Δ'),
          m('sep_max', 'Größter Versatz', mag.length ? VT.round(Math.max.apply(null, mag), 1) : null, 'Δ'),
          m('center_double', 'Doppelbilder in der Mitte (1 = ja)', center ? center.double : null),
          m('eff_deg', 'Tatsächlicher Blickwinkel der Randpunkte', VT.round(this.fit.effMaxDeg, 1), '°')
        ],
        trials: trials
      };
    }
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new DiplopiaSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px, calib: env.calib });
    const col = env.colors;
    const bw = Math.min(260, (W - 60) / 2);
    const singleBtn = { x: W / 2 - bw - 10, y: H - 90, w: bw, h: 64 }, doubleBtn = { x: W / 2 + 10, y: H - 90, w: bw, h: 64 };
    const okBtn = { x: W - 190, y: H - 80, w: 170, h: 60 };
    const closeBtn = { x: W / 2 - 130, y: H - 90, w: 260, h: 60 };
    let raf = 0, stopped = false, dragging = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (session.state === 'chart') { if (D.inRect(closeBtn, pt.x, pt.y)) session.closeChart(); return; }
      if (session.state === 'ask') { if (D.inRect(singleBtn, pt.x, pt.y)) session.answerSingle(now); else if (D.inRect(doubleBtn, pt.x, pt.y)) session.answerDouble(); return; }
      if (session.state === 'align') {
        if (D.inRect(okBtn, pt.x, pt.y)) { session.confirm(now); return; }
        dragging = true; session.place(pt.x / px, pt.y / px);
      }
    }
    function onMove(ev) { if (dragging) { const pt = D.pointer(env.canvas, ev); session.place(pt.x / px, pt.y / px); } }
    function onUp() { dragging = false; }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown); env.canvas.removeEventListener('pointermove', onMove);
      env.canvas.removeEventListener('pointerup', onUp); env.canvas.removeEventListener('pointercancel', onUp);
    }
    function dot(x, y, r, color) { A.withColor(ctx, color, function () { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }); }

    function frame() {
      if (stopped) return;
      D.clear(env);
      const t = session.current(), r = p.targetCm * px / 2;
      if (session.state === 'ask') {
        dot(t.sx * px, t.sy * px, r, col.red); dot(t.sx * px, t.sy * px, r, col.blue);
        D.text(ctx, 'Blicke auf den Punkt. Siehst du ein Bild oder zwei?', W / 2, 40, { size: 22, align: 'center', color: D.theme.muted });
        D.button(ctx, singleBtn, 'Ein Bild', { size: 22 }); D.button(ctx, doubleBtn, 'Zwei Bilder', { size: 22 });
      } else if (session.state === 'align') {
        dot(t.sx * px, t.sy * px, r, col.red); dot(session.marker.x * px, session.marker.y * px, r, col.blue);
        D.text(ctx, 'Schiebe das blaue Bild (ziehen oder tippen) auf das rote, bis du nur noch eines siehst.', W / 2, 40, { size: 20, align: 'center', color: D.theme.muted });
        D.button(ctx, okBtn, 'Deckungsgleich', { size: 16, fill: session.moved ? D.theme.accent : D.theme.panel, color: session.moved ? '#06201a' : undefined });
      } else if (session.state === 'chart') {
        D.text(ctx, 'Karte der Blickrichtungen: grün = einfach, rot = doppelt (Linie zeigt den Versatz). Deutung nur durch Fachpersonal.', W / 2, 36, { size: 16, align: 'center', color: D.theme.muted });
        session.results.forEach(function (r2) {
          const x = r2.tsx * px, y = r2.tsy * px;
          ctx.fillStyle = r2.double ? '#ee4266' : '#3bceac'; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
          if (r2.double) { ctx.strokeStyle = '#5dade2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(r2.psx * px, r2.psy * px); ctx.stroke(); }
        });
        D.button(ctx, closeBtn, 'Weiter zu den Kennzahlen', { size: 18, fill: D.theme.accent, color: '#06201a' });
      }
      D.hud(env, 'Richtung ' + Math.min(session.k + 1, session.order.length) + ' / ' + session.order.length);
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    env.canvas.addEventListener('pointermove', onMove);
    env.canvas.addEventListener('pointerup', onUp);
    env.canvas.addEventListener('pointercancel', onUp);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'diplopia', title: 'Diplopie-Karte (digital)', group: 'Funktionsprüfung (Fachperson)',
    summary: 'In neun Blickrichtungen angeben, ob ein oder zwei Bilder erscheinen, und den Versatz ausgleichen.',
    headline: ['double', 'sep_max'],
    metricKeys: ['positions', 'double', 'double_pct', 'sep_mean', 'sep_max', 'center_double', 'eff_deg'],
    params: params,
    createSession: function (p, env) { return new DiplopiaSession(VT.sanitizeParams({ params: params }, p), env); },
    run: VT.anaglyph.wrapRun(runInner), DiplopiaSession: DiplopiaSession
  });
}));
