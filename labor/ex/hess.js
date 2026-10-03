/* Übung „Hess-Schirm (digital, Rot-Blau-Brille)“: Nach dem Prinzip des Hess-Lancaster-Tests sieht jedes Auge ein eigenes Zeichen. Ein Auge sieht das Zielpunkt-Raster
 * (25 Punkte bei vollem Raster), das andere nur einen Zeiger, der per Finger/Maus auf den wahrgenommenen Ort des Ziels gesetzt wird.
 * Danach tauschen die Augen die Rollen (Farben wechseln auf dem Bildschirm, die Brille bleibt auf). Ergebnis: Abweichungen in Grad und Flächenvergleich.
 * Projektion auf eine ebene Fläche: x = Abstand·tan(Winkel). Hilfsmittel für Fachpersonen, kein Ersatz für eine Befundung; die Deutung gehört in Fachhand. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('../lib/core.js') : root.VT;
  if (isNode) { require('../lib/draw.js'); require('../lib/anaglyph.js'); require('../lib/gaze.js'); }
  const ex = factory(VT);
  if (isNode) module.exports = ex;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const params = [
    { key: 'maxDeg', label: 'Größter Blickwinkel (°)', type: 'number', min: 10, max: 35, step: 5, default: 20 },
    { key: 'grid', label: 'Raster', type: 'select', default: 'both', options: [{ value: 'both', label: 'Voll (25 Punkte: innen und außen)' }, { value: 'inner', label: 'Nur innen (9 Punkte)' }] },
    { key: 'passes', label: 'Durchgänge', type: 'select', default: 'both', options: [{ value: 'both', label: 'Beide Augen als Fixierauge' }, { value: 'one', label: 'Nur ein Durchgang' }] },
    { key: 'targetCm', label: 'Größe des Zielpunkts (cm)', type: 'number', min: 0.4, max: 2, step: 0.1, default: 0.8 },
    { key: 'markerCm', label: 'Größe des Zeigers (cm)', type: 'number', min: 0.4, max: 2, step: 0.1, default: 0.8 },
    { key: 'redEye', label: 'Rotes Glas vor dem', type: 'select', default: 'left', options: [{ value: 'left', label: 'linken Auge' }, { value: 'right', label: 'rechten Auge' }] },
    { key: 'glassesCheck', label: 'Brillentest vorher', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Ja' }, { value: 'no', label: 'Nein' }] }
  ];

  const MARGIN_CM = 1.5;

  /** Reine Logik. env: { rng, fieldWcm, fieldHcm, calib }. Bildschirmkoordinaten in cm (Ursprung links oben). */
  class HessSession {
    constructor(p, env) {
      this.p = p;
      this.rng = env.rng;
      this.W = env.fieldWcm;
      this.H = env.fieldHcm;
      this.dist = env.calib.viewDistanceCm;
      const grid = VT.gaze.hessGrid(p.maxDeg).filter(function (pt) { return p.grid === 'both' || pt.ring === 'inner'; });
      this.fit = VT.gaze.fit(this.dist, grid, this.W, this.H, MARGIN_CM);
      this.points = this.fit.points;
      this.nPasses = p.passes === 'one' ? 1 : 2;
      this.passIdx = 0;
      this.results = [];
      this.state = 'idle';
      this.startedAt = null;
      this.endedAt = null;
      this.finished = false;
      this.newPass(0);
    }

    newPass(now) {
      this.order = this.rng.shuffle(this.points.map(function (_, i) { return i; }));
      this.k = 0;
      this.marker = { x: this.W / 2, y: this.H / 2 };
      this.moved = false;
      this.shownAt = now;
    }

    start(now) { this.startedAt = now; this.state = 'placing'; this.shownAt = now; }

    passName() { return this.passIdx === 0 ? 'A' : 'B'; }
    /** Auge, das in diesem Durchgang fixiert (und das Ziel sieht). A: Auge hinter dem roten Glas. */
    fixEye() { const red = this.p.redEye; return this.passIdx === 0 ? red : (red === 'left' ? 'right' : 'left'); }
    current() { return this.state === 'placing' ? this.points[this.order[this.k]] : null; }

    place(x, y) {
      if (this.state !== 'placing') return;
      this.marker = { x: Math.max(0, Math.min(this.W, x)), y: Math.max(0, Math.min(this.H, y)) };
      this.moved = true;
    }

    confirm(now) {
      if (this.state !== 'placing' || !this.moved) return null;
      const t = this.current();
      const pl = VT.gaze.unproject(this.dist, this.marker.x - this.W / 2, this.H / 2 - this.marker.y);
      const dh = pl.hx - t.hx, dv = pl.vy - t.vy;
      this.results.push({
        pass: this.passName(), fix_eye: this.fixEye(), id: t.id, ring: t.ring,
        target_h: VT.round(t.hx, 2), target_v: VT.round(t.vy, 2), placed_h: VT.round(pl.hx, 2), placed_v: VT.round(pl.vy, 2),
        dev_h: VT.round(dh, 2), dev_v: VT.round(dv, 2), dev: VT.round(Math.hypot(dh, dv), 2), ms: Math.round(now - this.shownAt),
        tsx: t.sx, tsy: t.sy, psx: this.marker.x, psy: this.marker.y, rawh: pl.hx, rawv: pl.vy
      });
      this.k++;
      this.moved = false;
      this.marker = { x: this.W / 2, y: this.H / 2 };
      this.shownAt = now;
      if (this.k >= this.order.length) {
        this.passIdx++;
        if (this.passIdx >= this.nPasses) { this.state = 'chart'; this.endedAt = now; }
        else this.newPass(now);
      }
      return { type: 'confirmed' };
    }

    /** Ergebnisdiagramm angesehen: Übung beenden. */
    closeChart() { if (this.state === 'chart') { this.state = 'done'; this.finished = true; } }

    passResults(name) { return this.results.filter(function (r) { return r.pass === name; }); }

    /** Randpunkte (größter Winkel) eines Durchgangs, nach Winkel geordnet, mit Soll- und Ist-Ort (Grad). */
    boundary(name) {
      const edge = Math.max.apply(null, this.points.map(function (q) { return Math.max(Math.abs(q.hx), Math.abs(q.vy)); }));
      return this.passResults(name)
        .filter(function (r) { return Math.max(Math.abs(r.target_h), Math.abs(r.target_v)) >= edge - 0.05; })
        .sort(function (a, b) { return Math.atan2(a.target_v, a.target_h) - Math.atan2(b.target_v, b.target_h); });
    }

    areaPct(name) {
      const b = this.boundary(name);
      if (b.length < 4) return null;
      const edge = Math.max.apply(null, this.points.map(function (q) { return Math.max(Math.abs(q.hx), Math.abs(q.vy)); }));
      const area = VT.gaze.polygonArea(b.map(function (r) { return { x: r.rawh, y: r.rawv }; }));
      return 100 * area / Math.pow(2 * edge, 2);
    }

    summary() {
      const m = VT.metric;
      const devs = function (n) { return this.passResults(n).map(function (r) { return r.dev; }); }.bind(this);
      const aA = this.areaPct('A'), aB = this.areaPct('B');
      const trials = this.results.map(function (r) {
        const c = Object.assign({}, r); delete c.tsx; delete c.tsy; delete c.psx; delete c.psy; delete c.rawh; delete c.rawv; return c;
      });
      return {
        metrics: [
          m('placed', 'Gesetzte Punkte', this.results.length, 'von ' + (this.points.length * this.nPasses)),
          m('dev_a', 'Mittlere Abweichung, Durchgang A (Fixierauge hinter Rot)', VT.round(VT.mean(devs('A')), 2), '°'),
          m('dev_b', 'Mittlere Abweichung, Durchgang B (Fixierauge hinter Blau)', VT.round(VT.mean(devs('B')), 2), '°'),
          m('area_a', 'Fläche des Umrisses A im Vergleich zum Sollwert', VT.round(aA, 0), '%'),
          m('area_b', 'Fläche des Umrisses B im Vergleich zum Sollwert', VT.round(aB, 0), '%'),
          m('area_ratio', 'Flächenverhältnis A zu B', aA != null && aB ? VT.round(aA / aB, 2) : null),
          m('eff_deg', 'Tatsächlicher größter Blickwinkel', VT.round(this.fit.effMaxDeg, 1), '°'),
          m('clamped', 'Raster wegen kleinem Bildschirm verkleinert (1 = ja)', this.fit.clamped ? 1 : 0)
        ],
        trials: trials
      };
    }
  }

  function runInner(env, p, finish) {
    const D = VT.draw, A = VT.anaglyph, ctx = env.ctx, px = env.calib.pxPerCm, W = env.width, H = env.height;
    const session = new HessSession(p, { rng: env.rng, fieldWcm: W / px, fieldHcm: H / px, calib: env.calib });
    const col = env.colors;
    const okBtn = { x: W - 190, y: H - 80, w: 170, h: 60 };
    const closeBtn = { x: W / 2 - 110, y: H - 90, w: 220, h: 60 };
    let raf = 0, stopped = false, dragging = false;

    function onDown(ev) {
      ev.preventDefault();
      const pt = D.pointer(env.canvas, ev), now = env.now();
      if (session.state === 'chart') { if (D.inRect(closeBtn, pt.x, pt.y)) session.closeChart(); return; }
      if (D.inRect(okBtn, pt.x, pt.y)) { session.confirm(now); return; }
      dragging = true;
      session.place(pt.x / px, pt.y / px);
    }
    function onMove(ev) { if (dragging) { const pt = D.pointer(env.canvas, ev); session.place(pt.x / px, pt.y / px); } }
    function onUp() { dragging = false; }
    function onKey(ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (session.state === 'chart') session.closeChart(); else session.confirm(env.now()); } }
    function stop() {
      stopped = true; cancelAnimationFrame(raf);
      env.canvas.removeEventListener('pointerdown', onDown); env.canvas.removeEventListener('pointermove', onMove);
      env.canvas.removeEventListener('pointerup', onUp); env.canvas.removeEventListener('pointercancel', onUp);
      window.removeEventListener('keydown', onKey);
    }
    function dot(x, y, r, color) { A.withColor(ctx, color, function () { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }); }

    function drawChart() {
      D.text(ctx, 'Ergebnis (Soll grau, Durchgang A rot, Durchgang B blau). Deutung nur durch Fachpersonal.', W / 2, 36, { size: 17, align: 'center', color: D.theme.muted });
      const edgeNames = ['A', 'B'].slice(0, session.nPasses);
      session.points.forEach(function (q) { ctx.fillStyle = '#5b6673'; ctx.beginPath(); ctx.arc(q.sx * px, q.sy * px, 4, 0, Math.PI * 2); ctx.fill(); });
      const nominal = session.points.filter(function (q) { return Math.max(Math.abs(q.hx), Math.abs(q.vy)) >= session.fit.effMaxDeg - 0.05; })
        .sort(function (a, b) { return Math.atan2(a.vy, a.hx) - Math.atan2(b.vy, b.hx); });
      ctx.strokeStyle = '#3a4551'; ctx.lineWidth = 2; ctx.beginPath();
      nominal.forEach(function (q, i) { if (i) ctx.lineTo(q.sx * px, q.sy * px); else ctx.moveTo(q.sx * px, q.sy * px); });
      ctx.closePath(); ctx.stroke();
      edgeNames.forEach(function (n) {
        const color = n === 'A' ? '#ff6b6b' : '#5dade2';
        const b = session.boundary(n);
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath();
        b.forEach(function (r, i) { if (i) ctx.lineTo(r.psx * px, r.psy * px); else ctx.moveTo(r.psx * px, r.psy * px); });
        ctx.closePath(); ctx.stroke();
        session.passResults(n).forEach(function (r) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(r.psx * px, r.psy * px, 4, 0, Math.PI * 2); ctx.fill(); });
      });
      D.button(ctx, closeBtn, 'Weiter zu den Kennzahlen', { size: 18, fill: D.theme.accent, color: '#06201a' });
    }

    function frame() {
      if (stopped) return;
      D.clear(env);
      if (session.state === 'chart') drawChart();
      else if (session.state === 'placing') {
        const t = session.current();
        const targetCol = session.passIdx === 0 ? col.red : col.blue;
        const markerCol = session.passIdx === 0 ? col.blue : col.red;
        dot(t.sx * px, t.sy * px, p.targetCm * px / 2, targetCol);
        dot(session.marker.x * px, session.marker.y * px, p.markerCm * px / 2, markerCol);
        D.text(ctx, 'Durchgang ' + session.passName() + ': Fixiere den Zielpunkt. Setze den Zeiger dorthin, wo er genau auf dem Ziel liegt (ziehen oder tippen), dann „OK“.', W / 2, 36, { size: 16, align: 'center', color: D.theme.muted });
        D.button(ctx, okBtn, 'OK (Enter)', { size: 20, fill: session.moved ? D.theme.accent : D.theme.panel, color: session.moved ? '#06201a' : undefined });
        D.hud(env, 'Punkt ' + Math.min(session.k + 1, session.order.length) + ' / ' + session.order.length + '  ·  Durchgang ' + session.passName());
      }
      if (session.finished) { stop(); finish(session.summary()); return; }
      raf = requestAnimationFrame(frame);
    }
    env.canvas.addEventListener('pointerdown', onDown);
    env.canvas.addEventListener('pointermove', onMove);
    env.canvas.addEventListener('pointerup', onUp);
    env.canvas.addEventListener('pointercancel', onUp);
    window.addEventListener('keydown', onKey);
    session.start(env.now());
    raf = requestAnimationFrame(frame);
    return { stop: stop };
  }

  return VT.register({
    id: 'hess', title: 'Hess-Schirm (digital)', group: 'Funktionsprüfung (Fachperson)',
    summary: 'Zielraster mit einem Auge sehen, Zeiger mit dem anderen auf das Ziel setzen; beide Augen im Wechsel.',
    headline: ['dev_a', 'dev_b'],
    metricKeys: ['placed', 'dev_a', 'dev_b', 'area_a', 'area_b', 'area_ratio', 'eff_deg', 'clamped'],
    params: params,
    createSession: function (p, env) { return new HessSession(VT.sanitizeParams({ params: params }, p), env); },
    run: VT.anaglyph.wrapRun(runInner), HessSession: HessSession
  });
}));
