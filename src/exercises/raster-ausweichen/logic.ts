/**
 * Raster-Ausweichen – reine Logik (Stufen, Wellen, Wertung, Raster), ohne Canvas und DOM.
 *
 * 3 × 3 große Felder. Die eigene Figur („du“) steht auf einem Feld. In jeder Welle werden einige Felder als „besetzt“ angekündigt
 * (Schraffur + Symbol, nicht nur Farbe); dein eigenes Feld ist immer dabei, du musst also wechseln. Du tippst ein freies Feld an,
 * bevor die Wartezeit abläuft und die besetzten Felder „belegt“ sind. Tippst du ein besetztes Feld oder zu spät, zählt die Welle
 * nicht. Es gibt keinen Zeitbonus: Schneller als nötig bringt nichts, die Zeit wird nur mitgeschrieben.
 *
 * Stufen (1–20, höher = schwerer):
 * - Wartezeit: 2,6 s → 0,89 s
 * - besetzte Felder: 3 → 7 von 9 (mindestens 2 frei)
 * Das ist kein Reaktionstest: Gemessen wird Entscheiden und Tippen unter einer Frist, mit der Verzögerung des Touchscreens.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
export const CELLS = 9;
/** Ab so vielen besetzten Feldern bleiben nur noch 2 frei */
export const MAX_OCCUPIED = 7;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Wartezeit in ms: 2600 → 890 */
export function waitMsFor(level: number): number {
  return Math.round(2600 - 90 * (levelOf(level) - MIN_LEVEL));
}

/** Anzahl besetzter Felder (inkl. deines eigenen): 3 → 7 */
export function occupiedCountFor(level: number): number {
  return Math.min(MAX_OCCUPIED, 3 + Math.round(((levelOf(level) - MIN_LEVEL) * 4) / (MAX_LEVEL - MIN_LEVEL)));
}

/** Punkte je gelungener Welle: 10 + 2 je Stufe über 1 (kein Zeitbonus) */
export function pointsFor(level: number): number {
  return 10 + 2 * (Math.floor(levelOf(level) + 1e-9) - 1);
}

export interface Area {
  x: number;
  y: number;
  w: number;
  h: number;
  gap: number;
}

export interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

/** Rechteck und Mitte von Feld i (0..8, zeilenweise) */
export function cellRect(i: number, a: Area): Cell {
  const cw = (a.w - 2 * a.gap) / 3;
  const ch = (a.h - 2 * a.gap) / 3;
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = a.x + col * (cw + a.gap);
  const y = a.y + row * (ch + a.gap);
  return { x, y, w: cw, h: ch, cx: x + cw / 2, cy: y + ch / 2 };
}

/** Feld an einem Punkt (Lücken zwischen den Feldern zählen zum nächsten Feld), außerhalb des Rasters −1 */
export function cellAt(px: number, py: number, a: Area, pad = 0): number {
  if (px < a.x - pad || py < a.y - pad || px > a.x + a.w + pad || py > a.y + a.h + pad) return -1;
  const cw = (a.w - 2 * a.gap) / 3;
  const ch = (a.h - 2 * a.gap) / 3;
  const col = clamp(Math.floor((px - a.x + a.gap / 2) / (cw + a.gap)), 0, 2);
  const row = clamp(Math.floor((py - a.y + a.gap / 2) / (ch + a.gap)), 0, 2);
  return row * 3 + col;
}

/** Neue Welle: `count` besetzte Felder, dein Feld `own` immer dabei; nicht identisch mit der vorigen Welle */
export function makeWave(rng: Rng, count: number, own: number, prev?: readonly number[]): number[] {
  const k = clamp(Math.round(count), 1, MAX_OCCUPIED);
  const others = Array.from({ length: CELLS }, (_, i) => i).filter((i) => i !== own);
  for (let attempt = 0; attempt < 20; attempt++) {
    const picked = rng.shuffle(others.slice()).slice(0, k - 1);
    const wave = [own, ...picked].sort((a, b) => a - b);
    const same = prev && prev.length === wave.length && prev.every((v, i) => v === wave[i]);
    if (!same || attempt === 19) return wave;
  }
  return [own];
}

/** Freie Felder zu einer Welle */
export function freeCells(occupied: readonly number[]): number[] {
  return Array.from({ length: CELLS }, (_, i) => i).filter((i) => !occupied.includes(i));
}

export type TapResult = 'free' | 'occupied';

export function classifyTap(cell: number, occupied: readonly number[]): TapResult {
  return occupied.includes(cell) ? 'occupied' : 'free';
}

/** Median der Zeiten (ms), NaN ohne Werte */
export function medianTime(times: readonly number[]): number {
  return median(times);
}

export interface PlannedReaction {
  /** Zeit nach Erscheinen der Welle (ms) */
  rt: number;
  /** Feld, das angetippt wird (−1 = kein Tipp) */
  cell: number;
}

/**
 * Plan für Autoplay und Film: meist ein freies Feld in der Hälfte der Wartezeit, manchmal ein besetztes Feld oder gar kein Tipp.
 * `clean` (Film): immer ein freies Feld nach `fixedRt`.
 */
export function planReaction(rng: Rng, level: number, occupied: readonly number[], clean = false, fixedRt = 1500): PlannedReaction {
  const free = freeCells(occupied);
  const wait = waitMsFor(level);
  if (clean) return { rt: fixedRt, cell: rng.pick(free) };
  const rt = clamp(420 + 0.16 * wait + 9 * levelOf(level) + rng.normal() * 90, 380, wait * 0.97);
  const r = rng.next();
  if (r < 0.04) return { rt, cell: -1 };
  if (r < 0.04 + 0.05 + 0.004 * levelOf(level)) return { rt, cell: rng.pick(occupied) };
  return { rt, cell: rng.pick(free) };
}
