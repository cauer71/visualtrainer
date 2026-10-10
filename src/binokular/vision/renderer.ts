/**
 * Canvas-2D-Renderer der dichoptischen Darstellung (allgemein, für alle Spiele).
 *
 * Ein Spiel liefert eine Liste einfacher Zeichenobjekte (`Item`: Form in festen Spielkoordinaten, Augenklasse
 * `eye`, Objektkontrast `k` 0–1). Der Renderer bekommt zusätzlich die Seh-Einstellungen samt Palette des aktiven
 * Profils und entscheidet allein, welche Farbe gezeichnet wird (`resolveColor`) – im Spielcode steht keine Farbe.
 * Reihenfolge je Ebene (`layer`, aufsteigend):
 *  1. (vorher einmal) Hintergrund in der Profilfarbe (dunkel, kompensiert – nie fest codiert),
 *  2. neutrale Objekte (BOTH): grau (#777–#888 bei vollem Kontrast), deckend,
 *  3. Augen-Objekte (AMBLYOPIC, FELLOW) als ABWEICHUNG vom Hintergrund: Je Klasse wird die Abweichung
 *     (Objektfarbe − Hintergrund, je Kanal) in zwei Durchgängen gezeichnet – erst der negative Teil mit
 *     `difference` (wirkt als Subtraktion, solange der Untergrund mindestens so hell ist – auf Hintergrund und Grau
 *     erfüllt), dann der positive Teil mit `lighter` (Addition). Auf dem Hintergrund ergibt das genau die Profilfarbe;
 *     über grauen Flächen ändern sich nur die Kanäle des Objekts – für das andere Auge entsteht so kein „Loch“ im
 *     Grau. Jede Klasse wird dafür zuerst auf eine Zwischenebene gezeichnet (deckend untereinander), damit sich
 *     Füllung und Kontur desselben Objekts nicht doppelt addieren.
 * Formen sind flach. Objekte in der Zweitfarbe haben Linien von mindestens 4 px (besser sichtbar durch das
 * dunklere zweite Glas).
 *
 * Debug-Ansichten (Entwicklermodus, Tasten 1–4): nur amblyopes Auge, nur dominantes Auge, Gesamtbild,
 * Anaglyphen-Simulation (was jedes Auge durch einen idealen Filter sieht, nebeneinander).
 */
import { deltaOf, filterCss, filterOf, isSecondColor, resolveColor, rgbCss, type Eye, type EyeVisibility, type VisionSettings } from './color';

export type DebugView = 'BINOCULAR' | 'AMBLYOPIC_ONLY' | 'FELLOW_ONLY' | 'ANAGLYPH_SIM';
/** Tasten 1–4 → Ansicht */
export const DEBUG_KEYS: Record<string, DebugView> = { '1': 'AMBLYOPIC_ONLY', '2': 'FELLOW_ONLY', '3': 'BINOCULAR', '4': 'ANAGLYPH_SIM' };

export interface Pt {
  x: number;
  y: number;
}

export type Shape =
  | { t: 'disc'; x: number; y: number; r: number }
  | { t: 'ring'; x: number; y: number; r: number; w: number }
  | { t: 'poly'; pts: readonly Pt[]; w: number }
  | { t: 'line'; x1: number; y1: number; x2: number; y2: number; w: number; dash?: readonly number[] }
  | { t: 'rect'; x: number; y: number; w: number; h: number }
  | { t: 'frame'; x: number; y: number; w: number; h: number; lw: number }
  | { t: 'text'; x: number; y: number; text: string; size: number; align?: 'left' | 'center' | 'right' };

/** Zeichenobjekt: Form + Augenklasse + Objektkontrast (0–1) + Abstufung (nur Helligkeit) */
export interface Item {
  shape: Shape;
  eye: EyeVisibility;
  /** Objektkontrast 0–1 (wird mit dem Augenkontrast der Einstellungen multipliziert) */
  k: number;
  tone?: number;
  /** Zeichenebene (aufsteigend), Standard 0 */
  layer?: number;
}

type Ctx = CanvasRenderingContext2D;

/** Kleinste Linienbreite für Objekte in der Zweitfarbe (px in Spielkoordinaten) */
export const MIN_SECOND_LINE = 4;

function visibleIn(view: DebugView, v: EyeVisibility): boolean {
  if (view === 'AMBLYOPIC_ONLY') return v !== 'FELLOW';
  if (view === 'FELLOW_ONLY') return v !== 'AMBLYOPIC';
  return true;
}

/** Farbe eines Zeichenobjekts (nur aus Profil und Einstellungen) */
export function itemColor(it: Item, vis: VisionSettings) {
  return resolveColor(it.eye, it.k, vis, it.tone ?? 1);
}

/** umschließendes Rechteck einer Form in Spielkoordinaten (großzügig) */
export function shapeBounds(s: Shape): { x0: number; y0: number; x1: number; y1: number } {
  const pad = 4;
  switch (s.t) {
    case 'disc':
      return { x0: s.x - s.r - pad, y0: s.y - s.r - pad, x1: s.x + s.r + pad, y1: s.y + s.r + pad };
    case 'ring': {
      const e = s.r + s.w + pad;
      return { x0: s.x - e, y0: s.y - e, x1: s.x + e, y1: s.y + e };
    }
    case 'poly': {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (const p of s.pts) {
        x0 = Math.min(x0, p.x);
        y0 = Math.min(y0, p.y);
        x1 = Math.max(x1, p.x);
        y1 = Math.max(y1, p.y);
      }
      const e = s.w + pad;
      return { x0: x0 - e, y0: y0 - e, x1: x1 + e, y1: y1 + e };
    }
    case 'line': {
      const e = s.w + pad;
      return { x0: Math.min(s.x1, s.x2) - e, y0: Math.min(s.y1, s.y2) - e, x1: Math.max(s.x1, s.x2) + e, y1: Math.max(s.y1, s.y2) + e };
    }
    case 'rect':
      return { x0: s.x - pad, y0: s.y - pad, x1: s.x + s.w + pad, y1: s.y + s.h + pad };
    case 'frame':
      return { x0: s.x - pad, y0: s.y - pad, x1: s.x + s.w + pad, y1: s.y + s.h + pad };
    case 'text':
      return { x0: s.x - s.size * 8, y0: s.y - s.size * 1.2, x1: s.x + s.size * 8, y1: s.y + s.size * 0.4 };
  }
}

/** Form mit gegebener CSS-Farbe zeichnen; `minLine` = kleinste Linienbreite (Zweitfarbe) */
export function drawShape(g: Ctx, s: Shape, color: string, minLine = 0): void {
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.fillStyle = color;
  g.strokeStyle = color;
  switch (s.t) {
    case 'disc':
      g.beginPath();
      g.arc(s.x, s.y, Math.max(s.r, minLine / 2), 0, Math.PI * 2);
      g.fill();
      break;
    case 'ring':
      g.lineWidth = Math.max(s.w, minLine);
      g.beginPath();
      g.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      g.stroke();
      break;
    case 'poly': {
      if (s.pts.length === 0) break;
      g.lineWidth = Math.max(s.w, minLine);
      g.beginPath();
      g.moveTo(s.pts[0].x, s.pts[0].y);
      if (s.pts.length === 1) g.lineTo(s.pts[0].x + 0.01, s.pts[0].y);
      for (let i = 1; i < s.pts.length; i++) g.lineTo(s.pts[i].x, s.pts[i].y);
      g.stroke();
      break;
    }
    case 'line':
      g.lineWidth = Math.max(s.w, minLine);
      g.lineCap = s.dash ? 'butt' : 'round';
      g.setLineDash(s.dash ? [...s.dash] : []);
      g.beginPath();
      g.moveTo(s.x1, s.y1);
      g.lineTo(s.x2, s.y2);
      g.stroke();
      g.setLineDash([]);
      break;
    case 'rect':
      g.fillRect(s.x, s.y, s.w, s.h);
      break;
    case 'frame':
      g.lineWidth = Math.max(s.lw, minLine);
      g.lineJoin = 'miter';
      g.strokeRect(s.x + s.lw / 2, s.y + s.lw / 2, s.w - s.lw, s.h - s.lw);
      break;
    case 'text':
      g.font = `700 ${s.size}px system-ui, sans-serif`;
      g.textAlign = s.align ?? 'left';
      g.textBaseline = 'alphabetic';
      g.fillText(s.text, s.x, s.y);
      break;
  }
}

/** Zwischenebene je Ziel-Canvas (gleiche Pixelgröße) */
const layerCache = new WeakMap<object, CanvasRenderingContext2D>();

function layerFor(g: Ctx): Ctx | null {
  const cv = g.canvas as HTMLCanvasElement | undefined;
  if (!cv || typeof document === 'undefined') return null;
  let lg = layerCache.get(cv) ?? null;
  if (!lg) {
    lg = document.createElement('canvas').getContext('2d');
    if (!lg) return null;
    layerCache.set(cv, lg);
  }
  if (lg.canvas.width !== cv.width || lg.canvas.height !== cv.height) {
    lg.canvas.width = cv.width;
    lg.canvas.height = cv.height;
  }
  return lg;
}

/**
 * Augenobjekte einer Klasse: negativer Teil der Abweichung vom Hintergrund mit `difference`, positiver mit `lighter`.
 * Jeder Teil wird erst deckend auf eine Zwischenebene gezeichnet und dann als Ganzes verrechnet.
 */
function drawEyeClass(g: Ctx, items: Item[], vis: VisionSettings): void {
  if (!items.length) return;
  const bg = vis.palette.background;
  const lg = layerFor(g);
  const tr = g.getTransform();
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const it of items) {
    const b = shapeBounds(it.shape);
    x0 = Math.min(x0, b.x0);
    y0 = Math.min(y0, b.y0);
    x1 = Math.max(x1, b.x1);
    y1 = Math.max(y1, b.y1);
  }
  const W = g.canvas.width;
  const H = g.canvas.height;
  const bx = Math.max(0, Math.floor(tr.a * x0 + tr.e));
  const by = Math.max(0, Math.floor(tr.d * y0 + tr.f));
  const bw = Math.min(W, Math.ceil(tr.a * x1 + tr.e)) - bx;
  const bh = Math.min(H, Math.ceil(tr.d * y1 + tr.f)) - by;
  if (bw <= 0 || bh <= 0) return;
  for (const part of ['minus', 'plus'] as const) {
    const colorOf = (it: Item) => rgbCss(deltaOf(itemColor(it, vis), bg)[part]);
    const minOf = (it: Item) => (isSecondColor(it.eye, vis) ? MIN_SECOND_LINE : 0);
    const op: GlobalCompositeOperation = part === 'plus' ? 'lighter' : 'difference';
    if (!lg) {
      // ohne Zwischenebene direkt (Füllung und Kontur können sich dann überlagern)
      g.globalCompositeOperation = op;
      for (const it of items) drawShape(g, it.shape, colorOf(it), minOf(it));
      g.globalCompositeOperation = 'source-over';
      continue;
    }
    lg.setTransform(1, 0, 0, 1, 0, 0);
    lg.globalCompositeOperation = 'source-over';
    lg.globalAlpha = 1;
    lg.clearRect(bx, by, bw, bh);
    lg.setTransform(tr);
    for (const it of items) drawShape(lg, it.shape, colorOf(it), minOf(it));
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1;
    g.globalCompositeOperation = op;
    g.drawImage(lg.canvas, bx, by, bw, bh, bx, by, bw, bh);
    g.restore();
  }
}

export interface RenderOptions {
  view: DebugView;
}

/**
 * Zeichnet Hintergrund (ganze Fläche) und alle Objekte. `g` trägt die Abbildung Spielkoordinaten → Pixel
 * (Skalierung, Versatz, devicePixelRatio) bereits als Transformation.
 */
export function renderItems(g: Ctx, items: readonly Item[], vis: VisionSettings, opts: RenderOptions): void {
  g.save();
  const tr = g.getTransform();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = 1;
  g.fillStyle = rgbCss(vis.palette.background);
  g.fillRect(0, 0, g.canvas.width, g.canvas.height);
  g.setTransform(tr);
  const shown = items.filter((it) => it.k > 0 && visibleIn(opts.view, it.eye));
  const layers = [...new Set(shown.map((it) => it.layer ?? 0))].sort((a, b) => a - b);
  for (const layer of layers) {
    const list = shown.filter((it) => (it.layer ?? 0) === layer);
    g.globalCompositeOperation = 'source-over';
    for (const it of list) if (it.eye === 'BOTH') drawShape(g, it.shape, rgbCss(itemColor(it, vis)));
    for (const cls of ['AMBLYOPIC', 'FELLOW'] as const) drawEyeClass(g, list.filter((it) => it.eye === cls), vis);
  }
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = 1;
  g.restore();
}

/**
 * Anaglyphen-Simulation: das fertige Bild (`src`) zweimal verkleinert nebeneinander, jeweils mit idealem Filter
 * multipliziert (Rot lässt nur R durch, Cyan G+B, Grün G). Links: linkes Auge, rechts: rechtes Auge.
 * Zeichnet in CSS-Pixeln (`g` trägt nur die devicePixelRatio-Skalierung).
 */
export function renderAnaglyphSim(g: Ctx, src: CanvasImageSource, srcW: number, srcH: number, vis: VisionSettings, width: number, height: number, labels: { left: string; right: string }): void {
  g.save();
  g.fillStyle = rgbCss(vis.palette.background);
  g.fillRect(0, 0, width, height);
  const halfW = width / 2;
  const scale = Math.min((halfW - 12) / srcW, (height - 36) / srcH);
  const w = srcW * scale;
  const h = srcH * scale;
  const eyes: Eye[] = ['LEFT', 'RIGHT'];
  eyes.forEach((eye, i) => {
    const x = i * halfW + (halfW - w) / 2;
    const y = 28 + (height - 28 - h) / 2;
    g.globalCompositeOperation = 'source-over';
    g.drawImage(src, x, y, w, h);
    g.globalCompositeOperation = 'multiply';
    g.fillStyle = filterCss(filterOf(eye, vis));
    g.fillRect(x, y, w, h);
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#888';
    g.font = '600 14px system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText(i === 0 ? labels.left : labels.right, i * halfW + halfW / 2, 18);
  });
  g.restore();
}
