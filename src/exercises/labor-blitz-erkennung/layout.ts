/**
 * Blitz-Erkennung – Anordnung auf der Bühne (reine Rechnung, damit sie getestet werden kann): Zeichenzeile in der
 * Mitte des freien Bereichs, darunter „Löschen“ und das Tastenfeld. Alles wird bei jedem Bild aus den Live-Maßen der
 * Bühne berechnet (Tablet drehen).
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';
import { PITCH } from './logic';

export interface FlashLayoutInput {
  /** Bühne in px; `u` = 1 % der kürzeren Seite */
  w: number;
  h: number;
  u: number;
  /** Platz unten im Intro-Film für Hand und Bildunterschrift (0 im Spielmodus) */
  captionReserve: number;
  demo: boolean;
  /** gewünschte Zeichenhöhe in px (nach Begrenzung auf die Bühne, `calib.sizePx`) */
  wantGlyphPx: number;
  /** Zeichen pro Durchgang und Größe des Vorrats */
  length: number;
  poolSize: number;
}

export interface FlashLayout {
  cx: number;
  cy: number;
  /** Zeichenhöhe in px (nach Begrenzung, damit die Zeile auf die Bühne passt) */
  glyph: number;
  keys: Rect[];
  back: Rect;
  cols: number;
  keyMin: number;
}

/** Kleinste Taste im Spielmodus (px) – Buttons ≥ 56 px */
export const MIN_KEY_PX = 56;

export function flashLayout(i: FlashLayoutInput): FlashLayout {
  const { w, h, u, demo } = i;
  // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen mit kleinen Bühnen schrumpfen
  const k = demo ? Math.min(1, u / 4.3) : 1;
  const margin = Math.max(6, u * 2);
  const top = demo ? Math.max(6, u * 2) : Math.max(44, u * 8);
  const bottom = demo ? i.captionReserve : margin;
  const cols = i.poolSize <= 10 ? 5 : 6;
  const rows = Math.ceil(i.poolSize / cols);
  const gap = clamp(u * 1.4, 6, 12) * (demo ? k : 1);
  const keyMin = MIN_KEY_PX * k;
  const sideMargin = w < 460 ? 6 : margin;
  const keyW = clamp((w - 2 * sideMargin - (cols - 1) * gap) / cols, 24, 120);
  const avail = Math.max(60, h - top - bottom);
  // Tasten nie niedriger als `keyMin` (≥ 56 px im Spiel); bei knappem Platz wird eher die Zeichenzeile kleiner
  const keyH = clamp(Math.min(Math.max(keyMin, keyW * 0.85), (avail * 0.45) / rows - gap), keyMin, 92);
  const padH = rows * keyH + (rows - 1) * gap;
  const gridW = cols * keyW + (cols - 1) * gap;
  const gx = (w - gridW) / 2;
  const gy = h - bottom - padH;
  const keys: Rect[] = [];
  for (let n = 0; n < i.poolSize; n++) {
    keys.push({ x: gx + (n % cols) * (keyW + gap), y: gy + Math.floor(n / cols) * (keyH + gap), w: keyW, h: keyH });
  }
  const backH = Math.max(keyMin, 44 * k);
  const backW = clamp(keyW * 1.6, 120 * k, 170);
  const back: Rect = { x: gx + gridW - backW, y: gy - gap - backH, w: backW, h: backH };
  const areaBottom = back.y - gap;
  const cy = top + (areaBottom - top) / 2;
  const widthLimit = (0.92 * w) / (PITCH * i.length);
  const heightLimit = Math.max(12, (areaBottom - top) * 0.85);
  const glyph = Math.max(10, Math.min(i.wantGlyphPx, widthLimit, heightLimit));
  return { cx: w / 2, cy, glyph, keys, back, cols, keyMin };
}
