/**
 * Kleine Bausteine für Antipp-Übungen mit Zielkreisen (Präzisions-Flick, Schrumpfende Ziele,
 * Ziele erwischen, Zielkette): Spielfeld mit Platz für Anzeige und Intro-Bildunterschrift,
 * Ruheplatz der Geister-Hand, Symbole in den Kreisen, Fehltipp-Zeichen (✗) und Hinweistexte.
 *
 * Nichts davon hängt an einer bestimmten Übung; Zufall und Zeit kommen von außen.
 */
import { clamp } from '../../core/stats';
import type { Hud, StageInfo, ToastKind } from '../../core/types';
import { star, triangle } from '../../core/draw';

export interface FieldRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Größe der Geister-Hand in px (wie in den anderen Antipp-Übungen) */
export const handSize = (s: StageInfo): number => clamp(s.u * 13, 48, 110);

/** Oberkante der Bildunterschrift im Intro-Film (gleiche Formel wie im Runner) */
export function captionTop(s: StageInfo): number {
  const size = clamp(s.u * 4.6, 14, 30);
  return s.h - size * 2.1 - s.h * 0.05;
}

/**
 * Spielfeld: oben Platz für die Anzeige, im Intro-Film unten zusätzlich Platz für die Hand und die
 * Bildunterschrift. Die Maße sind immer live aus der Bühne berechnet (Tablet drehen).
 */
export function playField(s: StageInfo, demo: boolean): FieldRect {
  const m = Math.max(10, s.u * 2);
  const top = Math.max(44, s.u * 8);
  const bottom = demo ? captionTop(s) - handSize(s) * 1.0 - 6 : s.h - m;
  return { x: m, y: top, w: Math.max(40, s.w - 2 * m), h: Math.max(40, bottom - top) };
}

/** Ruheplatz der Geister-Hand im Intro-Film (rechts unten, über der Bildunterschrift) */
export function restPoint(s: StageInfo): { x: number; y: number } {
  const hs = handSize(s);
  return { x: s.w - hs * 0.75, y: captionTop(s) - hs * 0.95 };
}

/** Kurzer Hinweistext neben einem Punkt, ohne über den Rand zu ragen */
export function toastNear(
  hud: Hud,
  stageW: number,
  text: string,
  kind: ToastKind,
  x: number,
  top: number,
  ms: number,
  size: number,
): void {
  const half = Math.min(stageW / 2, text.length * size * 0.3 + 8);
  hud.toast(text, kind, { x: clamp(x, half, stageW - half), y: Math.max(size * 1.1, top - size * 0.8), ms, size });
}

/** Anzahl der unterscheidbaren Symbole */
export const SYMBOLS = 5;

/** Symbole im Kreis: 0 Dreieck, 1 Quadrat, 2 Raute, 3 Plus, 4 Stern */
export function drawSymbol(g: CanvasRenderingContext2D, slot: number, cx: number, cy: number, s: number, color: string): void {
  switch (((slot % SYMBOLS) + SYMBOLS) % SYMBOLS) {
    case 0:
      triangle(g, cx, cy - s * 0.12, s * 1.1, color);
      break;
    case 1:
      g.fillStyle = color;
      g.fillRect(cx - s * 0.8, cy - s * 0.8, s * 1.6, s * 1.6);
      break;
    case 2:
      g.beginPath();
      g.moveTo(cx, cy - s * 1.15);
      g.lineTo(cx + s * 0.95, cy);
      g.lineTo(cx, cy + s * 1.15);
      g.lineTo(cx - s * 0.95, cy);
      g.closePath();
      g.fillStyle = color;
      g.fill();
      break;
    case 3:
      g.fillStyle = color;
      g.fillRect(cx - s * 0.3, cy - s, s * 0.6, s * 2);
      g.fillRect(cx - s, cy - s * 0.3, s * 2, s * 0.6);
      break;
    default:
      star(g, cx, cy + s * 0.05, s * 1.2, color);
  }
}

/** Kleinstes freies Symbol, damit gleichzeitige Kreise verschiedene Zeichen tragen */
export function freeSlot(used: readonly number[]): number {
  for (let s = 0; s < SYMBOLS; s++) if (!used.includes(s)) return s;
  return used.length % SYMBOLS;
}

/**
 * Fehltipp: ✗ (Form, nicht nur Farbe), langsam verblassend, kein Blitz.
 * k = Fortschritt 0..1 der Anzeigedauer.
 */
export function drawCross(g: CanvasRenderingContext2D, x: number, y: number, k: number, u: number, color: string): void {
  const s = Math.max(10, u * 2.2);
  const lw = Math.max(3.5, u * 0.7);
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

/** Haken ✓ (Form, nicht nur Farbe) mit Blende k = 0..1 der Anzeigedauer */
export function drawCheck(g: CanvasRenderingContext2D, x: number, y: number, k: number, size: number, color: string): void {
  g.save();
  g.globalAlpha = Math.min(1, k * 8) * (1 - k * k);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - size * 0.9, y + size * 0.05);
  g.lineTo(x - size * 0.3, y + size * 0.65);
  g.lineTo(x + size * 0.95, y - size * 0.7);
  g.strokeStyle = 'rgba(5,10,20,0.75)';
  g.lineWidth = Math.max(5, size * 0.42);
  g.stroke();
  g.strokeStyle = color;
  g.lineWidth = Math.max(3, size * 0.3);
  g.stroke();
  g.restore();
}

/** Abstand zweier Punkte */
export const dist = (ax: number, ay: number, bx: number, by: number): number => Math.hypot(ax - bx, ay - by);
