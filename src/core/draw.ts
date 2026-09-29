/**
 * Zeichen-Helfer für die Übungs-Bühne (Canvas 2D, Koordinaten in CSS-Pixeln).
 */
export const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/** Farben der Übungs-Bühne (dunkel, damit Reize gut sichtbar sind) */
export const C = {
  bg: '#0B1424',
  bgLight: '#14233B',
  grid: 'rgba(255,255,255,0.045)',
  line: 'rgba(255,255,255,0.14)',
  fg: '#E8EEF7',
  dim: '#8A9BB5',
  faint: 'rgba(232,238,247,0.35)',
  good: '#22C55E',
  bad: '#EF4444',
  warn: '#F59E0B',
  info: '#38BDF8',
  white: '#FFFFFF',
  light: '#FFF4C2',
  hand: '#FFFFFF',
  handLine: '#1E293B',
} as const;

export type G = CanvasRenderingContext2D;

export function font(size: number, weight: number | string = 700): string {
  return `${weight} ${Math.round(size)}px ${FONT}`;
}

export function text(
  g: G,
  s: string,
  x: number,
  y: number,
  size: number,
  color: string = C.fg,
  opts: { weight?: number | string; align?: CanvasTextAlign; baseline?: CanvasTextBaseline; alpha?: number } = {},
): void {
  g.save();
  g.font = font(size, opts.weight ?? 700);
  g.fillStyle = color;
  g.textAlign = opts.align ?? 'center';
  g.textBaseline = opts.baseline ?? 'middle';
  if (opts.alpha !== undefined) g.globalAlpha = opts.alpha;
  g.fillText(s, x, y);
  g.restore();
}

/** Pfad für ein abgerundetes Rechteck (ohne native roundRect – ältere Safaris) */
export function rrPath(g: G, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  g.beginPath();
  g.moveTo(x + rr, y);
  g.lineTo(x + w - rr, y);
  g.arcTo(x + w, y, x + w, y + rr, rr);
  g.lineTo(x + w, y + h - rr);
  g.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  g.lineTo(x + rr, y + h);
  g.arcTo(x, y + h, x, y + h - rr, rr);
  g.lineTo(x, y + rr);
  g.arcTo(x, y, x + rr, y, rr);
  g.closePath();
}

export function fillRR(g: G, x: number, y: number, w: number, h: number, r: number, color: string): void {
  rrPath(g, x, y, w, h, r);
  g.fillStyle = color;
  g.fill();
}

export function circle(g: G, x: number, y: number, r: number, color: string): void {
  g.beginPath();
  g.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
  g.fillStyle = color;
  g.fill();
}

export function ring(g: G, x: number, y: number, r: number, color: string, width = 2, dash?: number[]): void {
  g.save();
  g.beginPath();
  g.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
  g.strokeStyle = color;
  g.lineWidth = width;
  if (dash) g.setLineDash(dash);
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------
// Hintergrund (gecacht, weil radiale Verläufe teuer sind)

let bgCache: { key: string; canvas: HTMLCanvasElement } | null = null;

export function background(g: G, w: number, h: number, dpr: number, variant: 'plain' | 'grid' = 'plain'): void {
  const key = `${w}x${h}@${dpr}:${variant}`;
  if (!bgCache || bgCache.key !== key) {
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(w * dpr));
    cv.height = Math.max(1, Math.round(h * dpr));
    const c = cv.getContext('2d')!;
    c.scale(dpr, dpr);
    c.fillStyle = C.bg;
    c.fillRect(0, 0, w, h);
    const grad = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.hypot(w, h) / 1.6);
    grad.addColorStop(0, 'rgba(40,66,110,0.55)');
    grad.addColorStop(1, 'rgba(11,20,36,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
    if (variant === 'grid') {
      const step = Math.max(28, Math.min(w, h) / 12);
      c.fillStyle = C.grid;
      for (let x = (w % step) / 2; x < w; x += step) c.fillRect(Math.round(x), 0, 1, h);
      for (let y = (h % step) / 2; y < h; y += step) c.fillRect(0, Math.round(y), w, 1);
    }
    bgCache = { key, canvas: cv };
  }
  g.drawImage(bgCache.canvas, 0, 0, w, h);
}

// ---------------------------------------------------------------------------
// Leuchtende Kreise (Sprite-Cache statt shadowBlur – schneller auf Tablets)

const glowCache = new Map<string, HTMLCanvasElement>();

export function glow(g: G, x: number, y: number, r: number, color: string, strength = 1): void {
  const rr = Math.max(2, Math.round(r));
  const key = `${color}|${rr}`;
  let sprite = glowCache.get(key);
  if (!sprite) {
    const size = rr * 6;
    sprite = document.createElement('canvas');
    sprite.width = size;
    sprite.height = size;
    const c = sprite.getContext('2d')!;
    const grad = c.createRadialGradient(size / 2, size / 2, rr * 0.6, size / 2, size / 2, size / 2);
    grad.addColorStop(0, withAlpha(color, 0.55));
    grad.addColorStop(0.4, withAlpha(color, 0.18));
    grad.addColorStop(1, withAlpha(color, 0));
    c.fillStyle = grad;
    c.fillRect(0, 0, size, size);
    if (glowCache.size > 64) glowCache.clear();
    glowCache.set(key, sprite);
  }
  g.save();
  g.globalAlpha = Math.max(0, Math.min(1, strength));
  g.drawImage(sprite, x - rr * 3, y - rr * 3, rr * 6, rr * 6);
  g.restore();
}

/** Leuchtende Kugel mit Glanzlicht */
export function orb(g: G, x: number, y: number, r: number, color: string, opts: { glow?: number; shine?: boolean } = {}): void {
  if (opts.glow) glow(g, x, y, r, color, opts.glow);
  circle(g, x, y, r, color);
  if (opts.shine !== false) {
    g.save();
    g.globalAlpha = 0.35;
    circle(g, x - r * 0.3, y - r * 0.32, r * 0.32, '#ffffff');
    g.restore();
  }
}

/** '#rrggbb' oder 'rgb(...)' → rgba mit Alpha */
export function withAlpha(color: string, a: number): string {
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((ch) => ch + ch).join('');
    const n = parseInt(hex.slice(0, 6), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  if (color.startsWith('rgb(')) return color.replace('rgb(', 'rgba(').replace(')', `,${a})`);
  return color;
}

// ---------------------------------------------------------------------------
// Symbole

/**
 * Landolt-Ring (Sehzeichen "C"): Strichstärke und Lücke = 1/5 des Durchmessers.
 * dir: 0 = rechts, 1 = unten, 2 = links, 3 = oben
 */
export function landoltC(g: G, cx: number, cy: number, d: number, dir: number, color: string): void {
  const stroke = d / 5;
  const rm = d / 2 - stroke / 2;
  const half = Math.asin(Math.min(1, stroke / 2 / rm));
  const ang = (dir % 4) * (Math.PI / 2);
  g.save();
  g.beginPath();
  g.arc(cx, cy, rm, ang + half, ang + Math.PI * 2 - half);
  g.lineWidth = stroke;
  g.lineCap = 'butt';
  g.strokeStyle = color;
  g.stroke();
  g.restore();
}

export function star(g: G, cx: number, cy: number, r: number, color: string, points = 5): void {
  g.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    if (i === 0) g.moveTo(px, py);
    else g.lineTo(px, py);
  }
  g.closePath();
  g.fillStyle = color;
  g.fill();
}

export function triangle(g: G, cx: number, cy: number, r: number, color: string, rot = 0): void {
  g.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = -Math.PI / 2 + rot + (i * 2 * Math.PI) / 3;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r * 1.0 + r * 0.15;
    if (i === 0) g.moveTo(px, py);
    else g.lineTo(px, py);
  }
  g.closePath();
  g.fillStyle = color;
  g.fill();
}

export function octagon(g: G, cx: number, cy: number, r: number, color: string): void {
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + (i * Math.PI) / 4;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) g.moveTo(px, py);
    else g.lineTo(px, py);
  }
  g.closePath();
  g.fillStyle = color;
  g.fill();
}

/** Seitenansicht Auto (Breite s) */
export function car(g: G, cx: number, cy: number, s: number, color: string, hub: string = C.bg): void {
  g.save();
  g.fillStyle = color;
  rrPath(g, cx - 0.5 * s, cy - 0.06 * s, s, 0.22 * s, 0.08 * s);
  g.fill();
  g.beginPath();
  g.moveTo(cx - 0.3 * s, cy - 0.05 * s);
  g.lineTo(cx - 0.17 * s, cy - 0.27 * s);
  g.lineTo(cx + 0.15 * s, cy - 0.27 * s);
  g.lineTo(cx + 0.32 * s, cy - 0.05 * s);
  g.closePath();
  g.fill();
  for (const wx of [-0.27, 0.28]) {
    circle(g, cx + wx * s, cy + 0.17 * s, 0.11 * s, color);
    circle(g, cx + wx * s, cy + 0.17 * s, 0.045 * s, hub);
  }
  g.restore();
}

/** Seitenansicht Lastwagen (Breite s) */
export function truck(g: G, cx: number, cy: number, s: number, color: string, hub: string = C.bg): void {
  g.save();
  g.fillStyle = color;
  rrPath(g, cx - 0.5 * s, cy - 0.3 * s, 0.64 * s, 0.44 * s, 0.03 * s);
  g.fill();
  rrPath(g, cx + 0.17 * s, cy - 0.15 * s, 0.33 * s, 0.29 * s, 0.06 * s);
  g.fill();
  for (const wx of [-0.34, -0.12, 0.34]) {
    circle(g, cx + wx * s, cy + 0.18 * s, 0.095 * s, color);
    circle(g, cx + wx * s, cy + 0.18 * s, 0.04 * s, hub);
  }
  g.restore();
}

// ---------------------------------------------------------------------------
// Buttons auf der Bühne

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function hit(r: Rect, x: number, y: number, pad = 0): boolean {
  return x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
}

export type ButtonState = 'normal' | 'active' | 'good' | 'bad' | 'disabled';

export function button(g: G, r: Rect, state: ButtonState = 'normal', radius?: number): void {
  const fill =
    state === 'good'
      ? withAlpha(C.good, 0.9)
      : state === 'bad'
        ? withAlpha(C.bad, 0.9)
        : state === 'active'
          ? 'rgba(255,255,255,0.28)'
          : state === 'disabled'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.12)';
  fillRR(g, r.x, r.y, r.w, r.h, radius ?? Math.min(r.h, r.w) * 0.22, fill);
  g.save();
  rrPath(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, radius ?? Math.min(r.h, r.w) * 0.22);
  g.strokeStyle = state === 'disabled' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.22)';
  g.lineWidth = 1;
  g.stroke();
  g.restore();
}

// ---------------------------------------------------------------------------
// Hand für die Intro-Filme (eigene Zeichnung, Fingerspitze = Hotspot)

const HAND_HOT = { x: 22, y: 5 };

/** Einzelne Formen der Hand – jede baut ihren eigenen Pfad. */
const HAND_SHAPES: Array<(g: G) => void> = [
  (g) => rrPath(g, 16, 4, 12, 36, 6), // Zeigefinger
  (g) => rrPath(g, 27, 22, 11, 20, 5.5),
  (g) => rrPath(g, 37, 25, 10, 18, 5),
  (g) => rrPath(g, 46, 29, 9, 15, 4.5),
  (g) => rrPath(g, 16, 31, 39, 27, 11), // Handfläche
  (g) => {
    // Daumen (gedrehte Ellipse)
    g.beginPath();
    g.ellipse(14, 44, 5.5, 12.5, -0.65, 0, Math.PI * 2);
  },
];

export function hand(g: G, x: number, y: number, size: number, pressed: boolean): void {
  const s = (size / 64) * (pressed ? 0.93 : 1);
  g.save();
  g.translate(x - HAND_HOT.x * s, y - HAND_HOT.y * s + (pressed ? 1 : 0));
  g.scale(s, s);
  g.lineJoin = 'round';
  // Schatten
  g.save();
  g.translate(2.5, 3.5);
  g.fillStyle = 'rgba(0,0,0,0.28)';
  for (const shape of HAND_SHAPES) {
    shape(g);
    g.fill();
  }
  g.restore();
  // Kontur
  g.strokeStyle = C.handLine;
  g.lineWidth = 4;
  for (const shape of HAND_SHAPES) {
    shape(g);
    g.stroke();
  }
  // Füllung
  g.fillStyle = C.hand;
  for (const shape of HAND_SHAPES) {
    shape(g);
    g.fill();
  }
  // Fingerlinien
  g.strokeStyle = '#94A3B8';
  g.lineWidth = 1.4;
  g.beginPath();
  g.moveTo(27.5, 31);
  g.lineTo(27.5, 37);
  g.moveTo(37.5, 33);
  g.lineTo(37.5, 38);
  g.moveTo(46.5, 35);
  g.lineTo(46.5, 39);
  g.stroke();
  g.restore();
}
