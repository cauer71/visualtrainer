/* Hilfen für Rot-Blau-Brillen (Anaglyphen): Farben je Auge, Versatz-Umrechnung (cm, Prismendioptrien, Winkelsekunden),
 * additives Zeichnen auf schwarzem Grund und ein vorgeschalteter Brillentest (welches Auge hinter Rot, Helligkeit). Keine Netzwerkzugriffe.
 *
 * Prinzip: Ein Auge sieht durch den Rotfilter nur rote Bildteile, das andere durch den Blaufilter nur blaue. Auf schwarzem Grund
 * ist ein rotes Element für das Blau-Auge unsichtbar und umgekehrt. So kann jedes Auge ein eigenes Bild erhalten. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  if (isNode) require('./draw.js');
  const api = factory(VT);
  VT.anaglyph = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function (VT) {
  'use strict';

  const BASE_RED = [255, 0, 0];
  const BASE_BLUE = [0, 160, 255];

  function hex(rgb) {
    return '#' + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join('');
  }
  function scale(rgb, k) { return rgb.map(function (v) { return v * k; }); }

  /** opts: { redEye: 'left'|'right', redLevel, blueLevel } (Helligkeitsfaktoren 0.3 bis 1). */
  function colorsFor(opts) {
    const redEye = opts && opts.redEye === 'right' ? 'right' : 'left';
    const blueEye = redEye === 'left' ? 'right' : 'left';
    const red = hex(scale(BASE_RED, (opts && opts.redLevel) || 1));
    const blue = hex(scale(BASE_BLUE, (opts && opts.blueLevel) || 1));
    const out = { redEye: redEye, blueEye: blueEye, red: red, blue: blue };
    out.left = redEye === 'left' ? red : blue;
    out.right = redEye === 'left' ? blue : red;
    return out;
  }

  /**
   * Bildpositionen für beide Augen bei einem Versatz von shiftCm.
   * convergence (gekreuzte Disparität): das Bild des linken Auges liegt rechts vom Bild des rechten Auges,
   * das Objekt erscheint näher als der Bildschirm und verlangt mehr Konvergenz. divergence: umgekehrt.
   */
  function eyePositions(cx, cy, shiftCm, mode) {
    const h = shiftCm / 2;
    const s = mode === 'divergence' ? -1 : 1;
    return { left: { x: cx + s * h, y: cy }, right: { x: cx - s * h, y: cy } };
  }

  /** 1 Prismendioptrie (Δ) = 1 cm Ablenkung auf 1 m Entfernung. */
  function pdToCm(pd, distCm) { return pd * distCm / 100; }
  function cmToPd(cm, distCm) { return cm / distCm * 100; }
  function arcsecToCm(arcsec, distCm) { return distCm * Math.tan(arcsec / 3600 * Math.PI / 180); }
  function cmToArcsec(cm, distCm) { return Math.atan(cm / distCm) * 180 / Math.PI * 3600; }

  /** Zeichnet fn mit additiver Mischung in der Farbe (wirkt nur auf dunklem Grund wie gewünscht). */
  function withColor(ctx, color, fn) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    fn();
    ctx.restore();
  }

  /**
   * Umhüllt die run-Funktion einer Übung mit einem Brillentest. p.redEye ('left'|'right') und p.glassesCheck ('yes'|'no') werden gelesen.
   * Die innere Übung erhält env.colors (siehe colorsFor).
   */
  function wrapRun(inner) {
    return function (env, p, finish) {
      const D = VT.draw, ctx = env.ctx, W = env.width, H = env.height, px = env.calib.pxPerCm;
      const state = { redEye: p.redEye === 'right' ? 'right' : 'left', redLevel: 1, blueLevel: 1 };
      let handle = null, raf = 0, stopped = false;

      function launch() {
        handle = inner(Object.assign({}, env, { colors: colorsFor(state) }), p, finish);
      }
      if (p.glassesCheck === 'no') {
        launch();
        return { stop: function () { if (handle && handle.stop) handle.stop(); } };
      }

      const bw = Math.min(210, (W - 60) / 3);
      const rowY = H - 120;
      const b = {
        swap: { x: 20, y: rowY - 64, w: Math.min(W - 40, 520), h: 52 },
        redDown: { x: 20, y: rowY, w: bw, h: 52 }, redUp: { x: 30 + bw, y: rowY, w: bw, h: 52 },
        blueDown: { x: W - 30 - 2 * bw, y: rowY, w: bw, h: 52 }, blueUp: { x: W - 20 - bw, y: rowY, w: bw, h: 52 },
        go: { x: W / 2 - 110, y: rowY + 64, w: 220, h: 52 }
      };
      function onDown(ev) {
        ev.preventDefault();
        const pt = D.pointer(env.canvas, ev);
        const hit = Object.keys(b).find(function (k) { return D.inRect(b[k], pt.x, pt.y); });
        if (hit === 'swap') state.redEye = state.redEye === 'left' ? 'right' : 'left';
        else if (hit === 'redDown') state.redLevel = Math.max(0.3, +(state.redLevel - 0.1).toFixed(2));
        else if (hit === 'redUp') state.redLevel = Math.min(1, +(state.redLevel + 0.1).toFixed(2));
        else if (hit === 'blueDown') state.blueLevel = Math.max(0.3, +(state.blueLevel - 0.1).toFixed(2));
        else if (hit === 'blueUp') state.blueLevel = Math.min(1, +(state.blueLevel + 0.1).toFixed(2));
        else if (hit === 'go') { stopCheck(); launch(); }
      }
      function stopCheck() { stopped = true; cancelAnimationFrame(raf); env.canvas.removeEventListener('pointerdown', onDown); }
      function frame() {
        if (stopped) return;
        const col = colorsFor(state);
        D.clear(env);
        const sq = Math.min(5 * px, W * 0.18);
        withColor(ctx, col.red, function () { ctx.fillRect(W * 0.28 - sq / 2, H * 0.34 - sq / 2, sq, sq); });
        withColor(ctx, col.blue, function () { ctx.fillRect(W * 0.72 - sq / 2, H * 0.34 - sq / 2, sq, sq); });
        D.text(ctx, 'Brillentest', W / 2, 40, { size: 26, weight: 'bold', align: 'center' });
        D.text(ctx, 'Brille aufsetzen. Linkes Auge zuhalten: Du darfst nur das ' + (col.redEye === 'right' ? 'rote' : 'blaue') + ' Quadrat sehen.', W / 2, 78, { size: 17, align: 'center', color: D.theme.muted });
        D.text(ctx, 'Rechtes Auge zuhalten: Du darfst nur das ' + (col.redEye === 'right' ? 'blaue' : 'rote') + ' Quadrat sehen. Das andere muss fast verschwinden.', W / 2, 102, { size: 17, align: 'center', color: D.theme.muted });
        D.button(ctx, b.swap, 'Rotes Glas sitzt vor dem ' + (state.redEye === 'left' ? 'LINKEN' : 'RECHTEN') + ' Auge (tippen zum Wechseln)', { size: 17 });
        D.button(ctx, b.redDown, 'Rot dunkler', { size: 16 }); D.button(ctx, b.redUp, 'Rot heller', { size: 16 });
        D.button(ctx, b.blueDown, 'Blau dunkler', { size: 16 }); D.button(ctx, b.blueUp, 'Blau heller', { size: 16 });
        D.button(ctx, b.go, 'Weiter', { size: 22, fill: D.theme.accent, color: '#06201a' });
        raf = requestAnimationFrame(frame);
      }
      env.canvas.addEventListener('pointerdown', onDown);
      raf = requestAnimationFrame(frame);
      return { stop: function () { stopCheck(); if (handle && handle.stop) handle.stop(); } };
    };
  }

  return {
    colorsFor: colorsFor, eyePositions: eyePositions,
    pdToCm: pdToCm, cmToPd: cmToPd, arcsecToCm: arcsecToCm, cmToArcsec: cmToArcsec,
    withColor: withColor, wrapRun: wrapRun
  };
}));
