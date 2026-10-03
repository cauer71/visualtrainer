/**
 * Bildschirmtasten für die Hilfsperson (Gleichgewichts-Übungen): „Richtig“, „Falsch“, „Gleichgewicht verloren“.
 *
 * Auf dem Tablet gibt es keine Tastatur; die Hilfsperson tippt, die übende Person steht oder balanciert. Jede Taste ist
 * mindestens 56 px hoch und breit und trägt Text **und** ein Zeichen (✓, ✗, !) – die Farbe sagt nichts. Zusätzlich gelten
 * die Tastenkürzel: Leertaste/Enter = richtig, X/Rücktaste = falsch, B = Gleichgewicht verloren (`helperKeyKind`).
 */
import { C, font, rrPath } from '../../core/draw';
import { clamp } from '../../core/stats';
import { buttonAt, type Rect } from '../labor-wahlreaktion/logic';

export type HelperKind = 'ok' | 'bad' | 'loss';

/** Kleinste Kantenlänge einer Taste in Pixeln */
export const MIN_HELPER_BUTTON_PX = 56;

export interface HelperButton {
  kind: HelperKind;
  rect: Rect;
}

/**
 * Tasten in einer Reihe am unteren Rand zwischen `left` und `right`, Unterkante bei `bottom`. Höhe und Breite mindestens
 * `minPx` (im Intro-Film kleiner erlaubt: dort tippt nur die Geister-Hand).
 */
export function helperLayout(
  kinds: readonly HelperKind[],
  left: number,
  right: number,
  bottom: number,
  u: number,
  minPx: number = MIN_HELPER_BUTTON_PX,
): HelperButton[] {
  const n = Math.max(1, kinds.length);
  const W = Math.max(minPx, right - left);
  const gap = clamp(u * 1.6, 8, 16);
  const maxW = n === 1 ? 460 : 320;
  const bw = Math.max(minPx, Math.min(maxW, (W - (n - 1) * gap) / n));
  const bh = Math.max(minPx, Math.min(112, u * 12));
  const rowW = n * bw + (n - 1) * gap;
  const x0 = left + (W - rowW) / 2;
  return kinds.map((kind, i) => ({ kind, rect: { x: x0 + i * (bw + gap), y: bottom - bh, w: bw, h: bh } }));
}

/** Höhe der Tastenreihe samt Abstand nach oben (für die Aufteilung der Bühne) */
export function helperZoneHeight(u: number, minPx: number = MIN_HELPER_BUTTON_PX): number {
  return Math.max(minPx, Math.min(112, u * 12)) + Math.max(8, u * 1.5);
}

/** Welche Taste liegt bei (x, y)? null = keine */
export function helperAt(buttons: readonly HelperButton[], x: number, y: number, pad = 6): HelperKind | null {
  const i = buttonAt(
    buttons.map((b) => b.rect),
    x,
    y,
    pad,
  );
  return i >= 0 ? buttons[i].kind : null;
}

/** Tastenkürzel → Taste (die Übung ignoriert Tasten, die sie nicht hat) */
export function helperKeyKind(key: string): HelperKind | null {
  if (key === ' ' || key === 'Enter') return 'ok';
  if (key === 'x' || key === 'X' || key === 'Backspace') return 'bad';
  if (key === 'b' || key === 'B') return 'loss';
  return null;
}

type G = CanvasRenderingContext2D;

function fitSize(g: G, s: string, size: number, maxW: number, weight = 700): number {
  g.save();
  g.font = font(size, weight);
  const w = g.measureText(s).width;
  g.restore();
  return w > maxW && w > 0 ? Math.max(9, (size * maxW) / w) : size;
}

/** Zeichen auf der Taste: ✓ (richtig), ✗ (falsch) oder Warndreieck mit „!“ (Gleichgewicht verloren) */
function drawSymbol(g: G, kind: HelperKind, cx: number, cy: number, s: number): void {
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.strokeStyle = C.white;
  g.fillStyle = C.white;
  g.lineWidth = Math.max(3, s * 0.2);
  g.beginPath();
  if (kind === 'ok') {
    g.moveTo(cx - s * 0.5, cy + s * 0.02);
    g.lineTo(cx - s * 0.12, cy + s * 0.4);
    g.lineTo(cx + s * 0.55, cy - s * 0.38);
    g.stroke();
  } else if (kind === 'bad') {
    g.moveTo(cx - s * 0.42, cy - s * 0.42);
    g.lineTo(cx + s * 0.42, cy + s * 0.42);
    g.moveTo(cx + s * 0.42, cy - s * 0.42);
    g.lineTo(cx - s * 0.42, cy + s * 0.42);
    g.stroke();
  } else {
    g.moveTo(cx, cy - s * 0.55);
    g.lineTo(cx + s * 0.58, cy + s * 0.45);
    g.lineTo(cx - s * 0.58, cy + s * 0.45);
    g.closePath();
    g.lineWidth = Math.max(2.5, s * 0.14);
    g.stroke();
    g.beginPath();
    g.moveTo(cx, cy - s * 0.2);
    g.lineTo(cx, cy + s * 0.1);
    g.stroke();
    g.beginPath();
    g.arc(cx, cy + s * 0.28, Math.max(1.6, s * 0.07), 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
}

/**
 * Taste zeichnen. `label` steht in der Mitte, `hint` (Tastenkürzel) klein darunter, wenn die Taste hoch genug ist.
 * `pressedAge` = ms seit dem Antippen (weißer Rand, kein Blitz); `dim` = Taste gerade ohne Wirkung (blasser).
 */
export function drawHelperButton(g: G, b: HelperButton, label: string, hint: string, opts: { pressedAge?: number | null; dim?: boolean } = {}): void {
  const r = b.rect;
  const rad = Math.min(r.w, r.h) * 0.22;
  g.save();
  if (opts.dim) g.globalAlpha = 0.55;
  rrPath(g, r.x, r.y, r.w, r.h, rad);
  g.fillStyle = 'rgba(255,255,255,0.12)';
  g.fill();
  g.lineWidth = 2;
  g.strokeStyle = 'rgba(255,255,255,0.5)';
  g.stroke();
  const pressed = opts.pressedAge !== undefined && opts.pressedAge !== null && opts.pressedAge >= 0 && opts.pressedAge < 260;
  if (pressed) {
    rrPath(g, r.x - 2, r.y - 2, r.w + 4, r.h + 4, rad + 2);
    g.lineWidth = 4;
    g.strokeStyle = C.white;
    g.stroke();
  }
  const symS = Math.min(r.h * 0.5, r.w * 0.28);
  const pad = Math.min(r.h * 0.18, r.w * 0.08);
  const symCx = r.x + pad + symS / 2;
  drawSymbol(g, b.kind, symCx, r.y + r.h / 2, symS);
  const textL = r.x + pad + symS + pad * 0.6;
  const textW = Math.max(20, r.x + r.w - 8 - textL);
  const showHint = r.h >= 80 && hint.length > 0;
  const size = fitSize(g, label, clamp(r.h * 0.3, 13, 26), textW);
  g.font = font(size, 800);
  g.fillStyle = C.white;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const tx = textL + textW / 2;
  g.fillText(label, tx, r.y + r.h / 2 - (showHint ? size * 0.35 : 0), textW);
  if (showHint) {
    const hs = fitSize(g, hint, clamp(r.h * 0.15, 10, 14), textW, 600);
    g.font = font(hs, 600);
    g.fillStyle = C.dim;
    g.fillText(hint, tx, r.y + r.h / 2 + size * 0.75, textW);
  }
  g.restore();
}
