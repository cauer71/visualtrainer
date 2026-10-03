/**
 * Rot-Grün-Lesen – Anordnung auf der Bühne (reine Rechnung, damit sie getestet werden kann), von oben nach unten:
 * Fusionsrahmen mit Kreuz, (optional) rotem Kontrollstrich, der Folge (ein- oder mehrzeilig) und (optional) dem Kontrollstrich
 * der zweiten Farbe, Hinweiszeile, Eingabefeld, (optional) „Strich fehlt“-Tasten, „Löschen“ und „Fertig“, Tastenfeld.
 * Alles wird bei jedem Bild aus den Live-Maßen der Bühne berechnet (Tablet drehen).
 *
 * Mit Versatz zwischen den Farbbildern rücken die Zeichen so weit auseinander, dass versetzte Zeichen sich nie überlappen:
 * Abstand von Mitte zu Mitte ≥ Zeichenbreite + Versatz (`charPitch`). Passt die Folge so nicht auf die Bühne, wird zuerst
 * die Zeichengröße (bis auf die Hälfte), dann der Versatz verkleinert; `shiftMaxPx` ist der tatsächlich mögliche Versatz.
 */
import type { Rect } from '../../core/draw';
import { clamp } from '../../core/stats';
import { GLYPH_W, PITCH } from './logic';

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
  /** Kontrollstriche und Tasten „Strich fehlt“ (Standard aus) */
  controlMarks?: boolean;
  /** Größter gewünschter Versatz der Farbbilder in px (Standard 0) */
  shiftPx?: number;
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
  /** Mittelpunkte der Zeichen der Folge, Zeichen für Zeichen (ohne Versatz) */
  chars: Array<{ x: number; y: number }>;
  /** Abstand der Zeichen in der Zeile (Mitte zu Mitte, px) */
  pitch: number;
  /** Größter möglicher Versatz der Farbbilder (px): höchstens der gewünschte, bei engen Bühnen kleiner */
  shiftMaxPx: number;
  /** Kontrollstriche (nur mit `controlMarks`): Mitte (x ohne Versatz, y), Länge und Dicke */
  strokes: { x: number; yA: number; yB: number; len: number; thick: number } | null;
  /** Tasten „Strich fehlt“ (nur mit `controlMarks`): roter Strich oben, zweite Farbe unten */
  missA: Rect | null;
  missB: Rect | null;
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

/** Abstand der Zeichen (Mitte zu Mitte): mindestens der übliche Platz, mit Versatz mindestens Zeichenbreite + Versatz */
export function charPitch(glyph: number, shift: number): number {
  return Math.max(PITCH * glyph, GLYPH_W * glyph + Math.max(0, shift));
}

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

  // optional: „Strich fehlt“ (zwei Tasten nebeneinander) über „Löschen“/„Fertig“
  const marks = i.controlMarks === true;
  let missA: Rect | null = null;
  let missB: Rect | null = null;
  let aboveY = actY;
  if (marks) {
    const missH = Math.max(keyMin, 44 * k);
    const missW = (gridW - gap) / 2;
    const missY = actY - gap - missH;
    missA = { x: gx, y: missY, w: missW, h: missH };
    missB = { x: gx + missW + gap, y: missY, w: missW, h: missH };
    aboveY = missY;
  }

  // Eingabefeld darüber
  const entrySize = Math.max(14, Math.min(clamp(u * 6.5, 24, 54), (0.94 * w) / (i.length * PITCH)));
  const entryPitch = PITCH * entrySize;
  const entryH = entrySize * 1.9;
  const entryTop = aboveY - gap - entryH;
  const entryY = entryTop + entryH * 0.45;
  const askSize = demo ? 0 : clamp(u * 3.2, 13, 20);
  const askH = demo ? 0 : askSize * 1.7;
  const askY = entryTop - askH / 2;
  const regionBottom = entryTop - askH - gap;

  // Rahmen mit Folge: Zeichenhöhe (und bei Bedarf Versatz) so wählen, dass Breite und Höhe passen
  const regionH = Math.max(40, regionBottom - top);
  const maxFrameW = w - 2 * side;
  const want = Math.max(10, i.wantGlyphPx);
  const wantShift = Math.max(0, i.shiftPx ?? 0);
  interface Fit {
    glyph: number;
    shift: number;
    rows: number;
    perLine: number;
    frameW: number;
    frameH: number;
    crossBand: number;
    strokeBand: number;
    lineH: number;
    markBand: number;
    fits: boolean;
  }
  const measure = (glyph: number, shift: number): Fit => {
    const pitch = charPitch(glyph, shift);
    const pad = glyph * 0.6;
    const perRow = Math.max(1, Math.floor((maxFrameW - 2 * pad) / pitch));
    const rows = Math.ceil(i.length / perRow);
    const perLine = Math.ceil(i.length / rows);
    const crossBand = Math.max(glyph * 0.7, 24);
    const strokeBand = marks ? glyph * 0.55 : 0;
    const lineH = glyph * 1.55;
    const markBand = glyph * 0.65;
    const rawW = perLine * pitch + 2 * pad;
    const frameH = crossBand + strokeBand + rows * lineH + markBand + strokeBand;
    const fits = frameH <= regionH && (shift <= 0 || rawW <= maxFrameW + 0.5);
    return { glyph, shift, rows, perLine, frameW: Math.min(maxFrameW, rawW), frameH, crossBand, strokeBand, lineH, markBand, fits };
  };
  let fit = measure(want, wantShift);
  let shiftUse = wantShift;
  for (let round = 0; round < 120 && !fit.fits; round++) {
    // Ohne Versatz bis auf 10 px verkleinern (wie bisher); mit Versatz Zeichen höchstens auf die Hälfte, dann Versatz kleiner
    const floor = shiftUse > 0 ? Math.max(10, Math.min(want, want * 0.5)) : 10;
    let g = want;
    let cur = measure(g, shiftUse);
    for (let n = 0; n < 80 && !cur.fits && g > floor + 1e-9; n++) {
      g = Math.max(floor, g * 0.94);
      cur = measure(g, shiftUse);
    }
    fit = cur;
    if (cur.fits || shiftUse <= 0) break;
    shiftUse = shiftUse < 1 ? 0 : shiftUse * 0.9;
  }
  const { glyph, rows, perLine, frameW, frameH, crossBand, strokeBand, lineH } = fit;
  shiftUse = fit.shift;
  const frame: Rect = { x: (w - frameW) / 2, y: top + Math.max(0, (regionH - frameH) / 2), w: frameW, h: frameH };
  const pitch = charPitch(glyph, shiftUse);
  const rowsTop = frame.y + crossBand + strokeBand;
  const chars: Array<{ x: number; y: number }> = [];
  for (let n = 0; n < i.length; n++) {
    const r = Math.floor(n / perLine);
    const inRow = Math.min(perLine, i.length - r * perLine);
    const c = n - r * perLine;
    chars.push({ x: w / 2 + (c - (inRow - 1) / 2) * pitch, y: rowsTop + r * lineH + lineH / 2 });
  }
  return {
    frame,
    crossX: w / 2,
    crossY: frame.y + crossBand / 2 + glyph * 0.05,
    crossArm: clamp(glyph * 0.22, 6, 14),
    glyph,
    rows,
    chars,
    pitch,
    shiftMaxPx: shiftUse,
    strokes: marks
      ? {
          x: w / 2,
          yA: frame.y + crossBand + strokeBand / 2,
          yB: frame.y + frameH - strokeBand / 2,
          len: glyph * 1.3,
          thick: clamp(glyph * 0.11, 3, 8),
        }
      : null,
    missA,
    missB,
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
