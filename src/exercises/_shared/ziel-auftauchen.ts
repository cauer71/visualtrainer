/**
 * Gemeinsame Bausteine für „plötzlich erscheinende Ziele antippen“
 * (flick-ziele, randziel-flick, winkel-halten): weiches Ein-/Ausblenden, Trefferradius für den Finger,
 * Bildunterschrift-Kante, Ruheplatz der Geister-Hand, Hinweistext über dem Ziel, ✗-Zeichen und Zielscheiben.
 *
 * Reine Funktionen (fadeAlpha, hitRadiusFor, captionTop) sind ohne Canvas prüfbar.
 */
import { circle, glow, ring, withAlpha } from '../../core/draw';
import { clamp, easeOut } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseContext, StageInfo, ToastKind } from '../../core/types';

/** Weiches Ein- und Ausblenden: jeweils mindestens 100 ms (Regel: keine harten Übergänge) */
export const FADE_MS = 130;
/** Kleinster Trefferradius in px (Finger, ≈ 9–10 mm Durchmesser); Vorgabe der Engine: ≥ 24 px */
export const MIN_HIT_PX = 28;

/** Trefferradius: größer als das sichtbare Ziel */
export const hitRadiusFor = (visibleR: number): number => Math.max(visibleR + 10, MIN_HIT_PX);

/** Deckkraft 0..1 eines Ziels mit Alter `age` und Lebensdauer `life` (je `fade` ms weich ein und aus) */
export function fadeAlpha(age: number, life: number, fadeIn = FADE_MS, fadeOut = FADE_MS): number {
  if (age < 0 || age >= life) return 0;
  return Math.min(clamp(age / fadeIn, 0, 1), clamp((life - age) / fadeOut, 0, 1));
}

/** Kürzeste Lebensdauer, bei der Ein-/Ausblenden und mindestens `hold` ms volle Sichtbarkeit Platz haben */
export const minLifeMs = (hold = 160, fade = FADE_MS): number => 2 * fade + hold;

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
export function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

/** Ruheplatz der Geister-Hand im Intro-Film: unten rechts, über der Bildunterschrift */
export function restPoint(s: StageInfo): { x: number; y: number } {
  const hs = clamp(s.u * 13, 48, 110);
  return { x: s.w - hs * 0.75, y: captionTop(s) - hs * 0.95 };
}

/** Kurzer Hinweistext neben dem Ziel, nie über den Bühnenrand hinaus */
export function toastAt(ctx: ExerciseContext, text: string, kind: ToastKind, x: number, top: number, ms: number, size: number): void {
  const { w } = ctx.stage;
  const half = Math.min(w / 2, text.length * size * 0.3 + 8);
  ctx.hud.toast(text, kind, { x: clamp(x, half, w - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
}

/** Fehltipp: kleines ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz */
export function drawMissMark(g: CanvasRenderingContext2D, x: number, y: number, k: number, u: number, color = '#FBBF24'): void {
  const s = Math.max(10, u * 2.1);
  const lw = Math.max(3.5, u * 0.65);
  g.save();
  g.globalAlpha = Math.min(1, k * 8) * (1 - k);
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - s, y - s);
  g.lineTo(x + s, y + s);
  g.moveTo(x + s, y - s);
  g.lineTo(x - s, y + s);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = lw + 3;
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.stroke();
  g.restore();
}

/** Treffer: sich ausbreitender, verblassender Ring (kein Blitz) */
export function drawHitRing(g: CanvasRenderingContext2D, x: number, y: number, r: number, k: number, color: string): void {
  const e = easeOut(k);
  ring(g, x, y, r * (1.05 + 0.85 * e), withAlpha(color, 0.8 * (1 - k)), Math.max(1.5, 4 * (1 - k)));
}

/** Volle Scheibe mit hellem Innenring und Mittelpunkt (Form: gefüllt) */
export function drawDisc(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number, main: string, light: string): void {
  if (alpha <= 0.01 || r <= 0) return;
  glow(g, x, y, r * 1.1, main, 0.7 * alpha);
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  circle(g, x, y, r, main);
  ring(g, x, y, r * 0.68, light, Math.max(2, r * 0.16));
  circle(g, x, y, r * 0.24, '#FFFFFF');
  g.restore();
}

/** Zielscheibe: heller Ring außen, weißer Punkt innen (Form: Ring + Punkt) */
export function drawBullseye(g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number, main: string, light: string): void {
  if (alpha <= 0.01 || r <= 0) return;
  glow(g, x, y, r, main, 0.9 * alpha);
  g.save();
  g.globalAlpha = clamp(alpha, 0, 1);
  circle(g, x, y, r, withAlpha(main, 0.18));
  ring(g, x, y, r * 0.79, main, Math.max(2, r * 0.24));
  ring(g, x, y, r - 0.75, withAlpha(light, 0.75), 1.5);
  circle(g, x, y, r * 0.36, '#FFFFFF');
  g.restore();
}

// ---------------------------------------------------------------------------
// Ziele am linken oder rechten Rand (randziel-flick, winkel-halten)

export type Side = 'left' | 'right';

/** Seite des nächsten Ziels: zufällig, aber höchstens dreimal dieselbe Seite hintereinander */
export function pickSide(rng: Pick<Rng, 'chance'>, history: readonly Side[]): Side {
  const n = history.length;
  if (n >= 3 && history[n - 1] === history[n - 2] && history[n - 2] === history[n - 3]) {
    return history[n - 1] === 'left' ? 'right' : 'left';
  }
  return rng.chance(0.5) ? 'left' : 'right';
}

export interface EdgeLayout {
  /** Mitte des nutzbaren Feldes */
  cx: number;
  cy: number;
  /** Mitte der Zielspalten links und rechts */
  leftX: number;
  rightX: number;
  /** vertikaler Bereich der Zielmitten */
  yMin: number;
  yMax: number;
  /** sichtbarer Zielradius und Trefferradius (px) */
  r: number;
  hitR: number;
}

/**
 * Randziele anordnen. `bottom` = Unterkante des nutzbaren Feldes (im Intro-Film über der Bildunterschrift),
 * `rU` = Zielradius in u, `band` = Anteil der Feldhöhe, in dem die Zielmitten liegen können.
 * Die Zielmitte hält Abstand zum Rand: der ganze Trefferkreis liegt auf der Bühne.
 */
export function edgeLayout(w: number, bottom: number, u: number, rU: number, band: number): EdgeLayout {
  const r = Math.max(15, rU * u);
  const hitR = hitRadiusFor(r);
  const pad = hitR + Math.max(6, u * 1.2);
  const cy = bottom / 2;
  const half = Math.max(0, Math.min((bottom * band) / 2, cy - pad));
  return {
    cx: w / 2,
    cy,
    leftX: Math.min(pad, w / 2),
    rightX: Math.max(w - pad, w / 2),
    yMin: cy - half,
    yMax: cy + half,
    r,
    hitR,
  };
}

/** Zielmitte für eine Seite und einen normierten Höhenwert ny (0 = oben im Band, 1 = unten) */
export function edgeTargetAt(lay: EdgeLayout, side: Side, ny: number): { x: number; y: number } {
  return { x: side === 'left' ? lay.leftX : lay.rightX, y: lay.yMin + clamp(ny, 0, 1) * (lay.yMax - lay.yMin) };
}

export const inCircle = (x: number, y: number, cx: number, cy: number, r: number): boolean => Math.hypot(x - cx, y - cy) <= r;
