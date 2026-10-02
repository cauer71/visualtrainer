/**
 * Peripheres Erkennen – Anordnung auf der Bühne (reine Rechnung): Mitte des freien Bereichs als Blickpunkt, nutzbare
 * Fläche symmetrisch um die Mitte (dort liegen die Buchstaben), Antwortfelder unten (nur nach der Anzeige sichtbar).
 * Alles wird bei jedem Bild aus den Live-Maßen der Bühne berechnet (Tablet drehen).
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';

export interface PeriLayoutInput {
  w: number;
  h: number;
  /** 1 % der kürzeren Seite in px */
  u: number;
  demo: boolean;
  /** Platz unten im Intro-Film für Hand und Bildunterschrift (0 im Spielmodus) */
  captionReserve: number;
  /** Anzahl der Antwortfelder */
  choices: number;
}

export interface PeriLayout {
  cx: number;
  cy: number;
  /** nutzbare Fläche um die Mitte in px (symmetrisch) */
  fieldW: number;
  fieldH: number;
  buttons: Rect[];
  cols: number;
}

/** Kleinstes Antwortfeld im Spielmodus (px) – Buttons ≥ 56 px */
export const MIN_BUTTON_PX = 56;

export function periLayout(i: PeriLayoutInput): PeriLayout {
  const { w, h, u, demo } = i;
  const k = demo ? Math.min(1, u / 4.3) : 1;
  const margin = Math.max(10, u * 2);
  const top = demo ? Math.max(6, u * 2) : Math.max(44, u * 8);
  const bottom = demo ? i.captionReserve : margin;
  const availH = Math.max(40, h - top - bottom);
  const cx = w / 2;
  const cy = top + availH / 2;
  const gap = clamp(u * 1.5, 6, 14) * (demo ? k : 1);
  const minW = MIN_BUTTON_PX * k;
  const n = i.choices;
  let cols = n;
  if ((w - 2 * margin - (cols - 1) * gap) / cols < minW) cols = Math.ceil(n / 2);
  const rows = Math.ceil(n / cols);
  const cellW = clamp((w - 2 * margin - (cols - 1) * gap) / cols, 20, 150);
  const btnH = clamp(cellW * 0.9, minW, 100);
  const gridW = cols * cellW + (cols - 1) * gap;
  const x0 = (w - gridW) / 2;
  const y0 = h - bottom - rows * btnH - (rows - 1) * gap;
  const buttons: Rect[] = [];
  for (let b = 0; b < n; b++) {
    const r = Math.floor(b / cols);
    // letzte Zeile mittig, falls nicht voll
    const inRow = r === rows - 1 ? n - r * cols : cols;
    const rowW = inRow * cellW + (inRow - 1) * gap;
    const rx = (w - rowW) / 2 + (b - r * cols) * (cellW + gap);
    buttons.push({ x: inRow === cols ? x0 + (b - r * cols) * (cellW + gap) : rx, y: y0 + r * (btnH + gap), w: cellW, h: btnH });
  }
  return { cx, cy, fieldW: w - 2 * margin, fieldH: availH, buttons, cols };
}
