/* Zeichenhilfen für die Canvas-Darstellung (Farben, Text, Schaltflächen, Trefferprüfung). Keine Netzwerkzugriffe. */
(function (root, factory) {
  const isNode = typeof module === 'object' && module.exports;
  const VT = isNode ? require('./core.js') : root.VT;
  const api = factory();
  VT.draw = api;
  if (isNode) module.exports = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const palette = [
    { name: 'Gelb', hex: '#ffd23f' }, { name: 'Grün', hex: '#3bceac' }, { name: 'Rot', hex: '#ee4266' },
    { name: 'Blau', hex: '#5dade2' }, { name: 'Violett', hex: '#b185db' }, { name: 'Orange', hex: '#f28f3b' }
  ];
  const theme = { bg: '#101418', panel: '#1c242d', panelHi: '#2a3541', text: '#f2f5f7', muted: '#5b6673', accent: '#3bceac', warn: '#ee4266', info: '#5dade2' };

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  }

  function text(ctx, s, x, y, o) {
    o = o || {};
    ctx.font = (o.weight || 'normal') + ' ' + Math.round(o.size || 18) + 'px sans-serif';
    ctx.fillStyle = o.color || theme.text;
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.baseline || 'alphabetic';
    ctx.fillText(s, x, y);
    ctx.textBaseline = 'alphabetic';
  }

  function inRect(r, x, y) { return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h; }

  function button(ctx, r, label, o) {
    o = o || {};
    ctx.fillStyle = o.fill || theme.panel;
    roundRect(ctx, r.x, r.y, r.w, r.h, o.radius == null ? 12 : o.radius);
    ctx.fill();
    if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = 3; ctx.stroke(); }
    if (label != null) {
      text(ctx, String(label), r.x + r.w / 2, r.y + r.h / 2, { size: o.size || Math.min(r.h * 0.5, 28), color: o.color, align: 'center', baseline: 'middle', weight: o.weight || 'bold' });
    }
  }

  /** n Rechtecke in einer Reihe innerhalb von area, gleichmäßig verteilt. */
  function row(n, area, gap) {
    const w = (area.w - gap * (n - 1)) / n;
    const out = [];
    for (let i = 0; i < n; i++) out.push({ x: area.x + i * (w + gap), y: area.y, w: w, h: area.h });
    return out;
  }

  /** n Rechtecke in einem Raster mit cols Spalten innerhalb von area. */
  function grid(n, cols, area, gap) {
    const rows = Math.ceil(n / cols);
    const w = (area.w - gap * (cols - 1)) / cols;
    const h = (area.h - gap * (rows - 1)) / rows;
    const out = [];
    for (let i = 0; i < n; i++) out.push({ x: area.x + (i % cols) * (w + gap), y: area.y + Math.floor(i / cols) * (h + gap), w: w, h: h });
    return out;
  }

  function pointer(canvas, ev) {
    const b = canvas.getBoundingClientRect();
    return { x: ev.clientX - b.left, y: ev.clientY - b.top };
  }

  function clear(env, color) {
    env.ctx.fillStyle = color || theme.bg;
    env.ctx.fillRect(0, 0, env.width, env.height);
  }

  function hud(env, s) { text(env.ctx, s, 16, 28, { size: 16, color: theme.muted }); }

  /** Einfache Formen für die Wahlreaktion. index 0..5 */
  const SHAPES = ['Kreis', 'Quadrat', 'Dreieck', 'Raute', 'Sechseck', 'Stern'];
  function shapePath(ctx, index, cx, cy, r) {
    ctx.beginPath();
    const poly = function (n, rot, rr) {
      for (let i = 0; i < n; i++) {
        const a = rot + i * 2 * Math.PI / n;
        const px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.closePath();
    };
    switch (index % 6) {
      case 0: ctx.arc(cx, cy, r, 0, Math.PI * 2); break;
      case 1: ctx.rect(cx - r * 0.85, cy - r * 0.85, r * 1.7, r * 1.7); break;
      case 2: poly(3, -Math.PI / 2, r * 1.1); break;
      case 3: poly(4, 0, r * 1.15); break;
      case 4: poly(6, 0, r); break;
      default:
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + i * Math.PI / 5;
          const rr = i % 2 ? r * 0.45 : r * 1.1;
          const px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
          if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
        }
        ctx.closePath();
    }
  }

  return { palette: palette, theme: theme, SHAPES: SHAPES, roundRect: roundRect, text: text, inRect: inRect, button: button, row: row, grid: grid, pointer: pointer, clear: clear, hud: hud, shapePath: shapePath };
}));
