/**
 * Rot-Grün-Lesen – Anordnung auf der Bühne (reine Rechnung, damit sie getestet werden kann), von oben nach unten:
 * Fusionsrahmen mit Kreuz und der Folge (ein- oder mehrzeilig), Hinweiszeile, Eingabefeld, „Löschen“ und „Fertig“,
 * Tastenfeld. Alles wird bei jedem Bild aus den Live-Maßen der Bühne berechnet (Tablet drehen).
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';
import { PITCH } from './logic';

export interface RgLayoutInput {
  /** Bühne in px; `u` = 1 % der kürzeren Seite */
  w: number;
  h: number;
  u: number;
  /** Platz unten im Intro-Film für Hand und Bildunterschrift (0 im Spielmodus) */
  captionReserve: number;
  demo: boolean;
  /** gewünschte Zeichenhöhe in px (nach Begrenzung auf die Bühne, `calib.sizePx`) */
  wantGlyphPx: number;
  /** Zeichen je Folge */
  length: number;
  /** Zahl der Tasten (Vorrat plus „?“) */
  keyCount: number;
}

export interface RgLayout {
  /** Fusionsrahmen */
  frame: Rect;
  /** Kreuz im Rahmen (oben mittig) */
  crossX: number;
  crossY: number;
  crossArm: number;
  /** Zeichenhöhe in px (nach Begrenzung, damit die Folge in den Rahmen passt) */
  glyph: number;
  rows: number;
  /** Mittelpunkte der Zeichen der Folge, Zeichen für Zeichen */
  chars: Array<{ x: number; y: number }>;
  /** Höhe, um die unter einem Zeichen die Marke (✓/✗) sitzt */
  markDy: number;
  /** Eingabefeld: Mitte der Plätze (y), Größe und Abstand */
  entryY: number;
  entrySize: number;
  entryPitch: number;
  /** Hinweiszeile über dem Eingabefeld (y der Mitte) und Schriftgröße */
  askY: number;
  askSize: number;
  keys: Rect[];
  back: Rect;
  done: Rect;
  cols: number;
  keyMin: number;
}

/** Kleinste Taste im Spielmodus (px) – Buttons ≥ 56 px */
export const MIN_KEY_PX = 56;

export function rgLayout(i: RgLayoutInput): RgLayout {
  const { w, h, u, demo } = i;
  // Im Film wird nichts wirklich angetippt: Mindestgrößen dürfen mit kleinen Bühnen schrumpfen
  const k = demo ? Math.min(1, u / 4.3) : 1;
  const margin = Math.max(6, u * 2);
  const side = w < 460 ? 6 : margin;
  const top = demo ? Math.max(6, u * 2) : Math.max(44, u * 8);
  const bottom = demo ? i.captionReserve : margin;
  const gap = clamp(u * 1.4, 6, 12) * (demo ? k : 1);
  const keyMin = MIN_KEY_PX * k;

  // Tastenfeld unten: Spalten aus der Breite, Zeilen ausgleichen
  const maxCols = clamp(Math.floor((w - 2 * side + gap) / (keyMin + gap)), 4, 12);
  const keyRows = Math.max(1, Math.ceil(i.keyCount / maxCols));
  const cols = Math.ceil(i.keyCount / keyRows);
  const keyW = clamp((w - 2 * side - (cols - 1) * gap) / cols, keyMin, 96);
  const keyH = clamp(keyW * 0.85, keyMin, 80);
  const padH = keyRows * keyH + (keyRows - 1) * gap;
  const gridW = cols * keyW + (cols - 1) * gap;
  const gx = (w - gridW) / 2;
  const gy = h - bottom - padH;
  const keys: Rect[] = [];
  for (let n = 0; n < i.keyCount; n++) {
    const row = Math.floor(n / cols);
    const inRow = Math.min(cols, i.keyCount - row * cols);
    const off = ((cols - inRow) * (keyW + gap)) / 2;
    keys.push({ x: gx + off + (n % cols) * (keyW + gap), y: gy + row * (keyH + gap), w: keyW, h: keyH });
  }

  // „Löschen“ links und „Fertig“ rechts über dem Tastenfeld
  const actH = Math.max(keyMin, 44 * k);
  const actW = clamp(gridW * 0.36, 120 * k, 210);
  const actY = gy - gap - actH;
  const back: Rect = { x: gx, y: actY, w: actW, h: actH };
  const done: Rect = { x: gx + gridW - actW, y: actY, w: actW, h: actH };

  // Eingabefeld darüber
  const entrySize = Math.max(14, Math.min(clamp(u * 6.5, 24, 54), (0.94 * w) / (i.length * PITCH)));
  const entryPitch = PITCH * entrySize;
  const entryH = entrySize * 1.9;
  const entryTop = actY - gap - entryH;
  const entryY = entryTop + entryH * 0.45;
  const askSize = demo ? 0 : clamp(u * 3.2, 13, 20);
  const askH = demo ? 0 : askSize * 1.7;
  const askY = entryTop - askH / 2;
  const regionBottom = entryTop - askH - gap;

  // Rahmen mit Folge: Zeichenhöhe so wählen, dass Breite und Höhe passen
  const regionH = Math.max(40, regionBottom - top);
  const maxFrameW = w - 2 * side;
  let glyph = Math.max(10, i.wantGlyphPx);
  let rows = 1;
  let perLine = i.length;
  let frameW = 0;
  let frameH = 0;
  let crossBand = 0;
  let lineH = 0;
  let markBand = 0;
  for (let n = 0; n < 80; n++) {
    const pitch = PITCH * glyph;
    const pad = glyph * 0.6;
    const perRow = Math.max(1, Math.floor((maxFrameW - 2 * pad) / pitch));
    rows = Math.ceil(i.length / perRow);
    perLine = Math.ceil(i.length / rows);
    crossBand = Math.max(glyph * 0.7, 24);
    lineH = glyph * 1.55;
    markBand = glyph * 0.65;
    frameW = Math.min(maxFrameW, perLine * pitch + 2 * pad);
    frameH = crossBand + rows * lineH + markBand;
    if (frameH <= regionH || glyph <= 10) break;
    glyph = Math.max(10, glyph * 0.94);
  }
  const frame: Rect = { x: (w - frameW) / 2, y: top + Math.max(0, (regionH - frameH) / 2), w: frameW, h: frameH };
  const pitch = PITCH * glyph;
  const chars: Array<{ x: number; y: number }> = [];
  for (let n = 0; n < i.length; n++) {
    const r = Math.floor(n / perLine);
    const inRow = Math.min(perLine, i.length - r * perLine);
    const c = n - r * perLine;
    chars.push({ x: w / 2 + (c - (inRow - 1) / 2) * pitch, y: frame.y + crossBand + r * lineH + lineH / 2 });
  }
  return {
    frame,
    crossX: w / 2,
    crossY: frame.y + crossBand / 2 + glyph * 0.05,
    crossArm: clamp(glyph * 0.22, 6, 14),
    glyph,
    rows,
    chars,
    markDy: glyph * 0.78,
    entryY,
    entrySize,
    entryPitch,
    askY,
    askSize,
    keys,
    back,
    done,
    cols,
    keyMin,
  };
}
