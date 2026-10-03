/**
 * Tiefe sehen – Anordnung auf der Bühne (reine Rechnung, damit sie getestet werden kann), von oben nach unten: Hinweiszeile,
 * das quadratische Punktfeld (mit schmalem neutralem Rahmen) und die vier Antwort-Tasten Oben, Unten, Links, Rechts in einer
 * Reihe (je ≥ 56 px hoch). Alles wird bei jedem Bild aus den Live-Maßen der Bühne berechnet (Tablet drehen).
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';

export interface StereoLayoutInput {
  /** Bühne in px; `u` = 1 % der kürzeren Seite */
  w: number;
  h: number;
  u: number;
  /** Platz unten im Intro-Film für Hand und Bildunterschrift (0 im Spielmodus) */
  captionReserve: number;
  demo: boolean;
  /** gewünschte Kantenlänge des Feldes in px (nach Begrenzung auf die Bühne, `calib.sizePx`) */
  wantFieldPx: number;
}

export interface StereoLayout {
  /** Punktfeld: Mitte und Kantenlänge (px) */
  cx: number;
  cy: number;
  field: number;
  /** Hinweiszeile (Mitte y) und Schriftgröße */
  msgY: number;
  msgSize: number;
  /** Tasten in der Reihenfolge Oben, Unten, Links, Rechts */
  buttons: Rect[];
}

/** Kleinste Taste im Spielmodus (px) – Buttons ≥ 56 px */
export const MIN_KEY_PX = 56;

export function stereoLayout(i: StereoLayoutInput): StereoLayout {
  const { w, h, u, demo } = i;
  // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen mit kleinen Bühnen schrumpfen
  const k = demo ? Math.min(1, u / 4.3) : 1;
  const margin = Math.max(6, u * 2);
  const side = w < 460 ? 6 : margin;
  const gap = clamp(u * 1.6, 6, 12) * (demo ? k : 1);
  const bottom = demo ? i.captionReserve : margin;
  const keyH = Math.max(MIN_KEY_PX * k, 44 * k);

  const rowW = Math.min(w - 2 * side, 640);
  const rowX = (w - rowW) / 2;
  const keyW = (rowW - 3 * gap) / 4;
  const keyY = h - bottom - keyH;
  const buttons: Rect[] = [0, 1, 2, 3].map((n) => ({ x: rowX + n * (keyW + gap), y: keyY, w: keyW, h: keyH }));

  const top = demo ? Math.max(6, u * 2) : Math.max(44, u * 8);
  const msgSize = clamp(u * 3.4, 13, 22);
  const msgH = msgSize * 1.9;
  const msgY = top + msgH / 2;

  const regionTop = top + msgH + gap * 0.5;
  const regionBottom = keyY - gap;
  const regionH = Math.max(40, regionBottom - regionTop);
  const availW = w - 2 * side;
  const field = Math.max(40, Math.min(i.wantFieldPx, regionH, availW));
  return { cx: w / 2, cy: regionTop + regionH / 2, field, msgY, msgSize, buttons };
}
