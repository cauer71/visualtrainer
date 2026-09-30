/**
 * Blicksprung-Galerie – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Ein Ziel erscheint an wechselnden Zellen eines 3×3- oder 4×4-Rasters. Die Stufe steuert
 * Rastergröße, Anzeigedauer und Mindest-Sprungweite zum vorigen Ziel.
 */
import { clamp, median } from '../../core/stats';
import type { Rng } from '../../core/rng';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Kleinste Zellkantenlänge in CSS-px (≈ 9 mm auf dem iPad, 0,192 mm je px) */
export const MIN_CELL_PX = 48;
/** Zellen werden nie breiter als 1,8 × Höhe (oder umgekehrt) → Sprünge bleiben in einem brauchbaren Sehwinkel */
export const MAX_CELL_ASPECT = 1.8;
/** Sprünge ab diesem Anteil der Raster-Diagonale gelten als „weit“ */
export const FAR_JUMP = 0.5;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

export interface GridSize {
  cols: number;
  rows: number;
}

/** Raster der Stufe: bis Stufe 5 3×3, ab Stufe 6 4×4 */
export function gridFor(level: number): GridSize {
  return levelOf(level) >= 6 ? { cols: 4, rows: 4 } : { cols: 3, rows: 3 };
}

/** Anzeigedauer in ms: 2,4 s auf Stufe 1, kürzer mit jeder Stufe, nie unter 0,7 s */
export function lifeFor(level: number): number {
  return clamp(Math.round(2400 * Math.pow(0.88, levelOf(level) - 1)), 700, 2400);
}

/** Mindest-Sprungweite als Anteil der Raster-Diagonale: 0,20 (Stufe 1) … 0,60 (Stufe 11+) */
export function minJumpFor(level: number): number {
  return clamp(0.2 + 0.04 * (levelOf(level) - 1), 0.2, 0.6);
}

/** Pause zwischen zwei Zielen (ms): leicht zufällig, damit kein fester Takt entsteht */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(450, 750);
}

export const cellIndex = (col: number, row: number, cols: number): number => row * cols + col;
export const cellCol = (idx: number, cols: number): number => idx % cols;
export const cellRow = (idx: number, cols: number): number => Math.floor(idx / cols);

/** Sprungweite zwischen zwei Zellen als Anteil der Raster-Diagonale (0..1) */
export function jumpDistance(a: number, b: number, grid: GridSize): number {
  const dc = cellCol(a, grid.cols) - cellCol(b, grid.cols);
  const dr = cellRow(a, grid.cols) - cellRow(b, grid.cols);
  return Math.hypot(dc, dr) / Math.hypot(grid.cols - 1, grid.rows - 1);
}

/**
 * Nächste Zelle: nie dieselbe wie zuvor, mindestens so weit weg wie die Stufe verlangt
 * (gibt es keine, nimmt man die weiteste). Gleichverteilt unter den möglichen Zellen.
 */
export function pickCell(rng: Pick<Rng, 'int'>, grid: GridSize, prev: number | null, level: number): number {
  const n = grid.cols * grid.rows;
  if (prev === null || prev < 0 || prev >= n) return rng.int(n);
  const min = minJumpFor(level) - 1e-9;
  const dist: number[] = [];
  let bestD = -1;
  for (let i = 0; i < n; i++) {
    dist.push(i === prev ? -1 : jumpDistance(prev, i, grid));
    if (dist[i] > bestD) bestD = dist[i];
  }
  const pool: number[] = [];
  for (let i = 0; i < n; i++) if (i !== prev && dist[i] >= min) pool.push(i);
  // Keine Zelle weit genug weg (kleines Raster auf hoher Stufe): unter den weitesten zufällig wählen
  if (!pool.length) for (let i = 0; i < n; i++) if (i !== prev && dist[i] >= bestD - 1e-9) pool.push(i);
  return pool.length ? pool[rng.int(pool.length)] : prev;
}

export interface GridLayout {
  x0: number;
  y0: number;
  cw: number;
  ch: number;
  cols: number;
  rows: number;
}

/** Raster in den verfügbaren Bereich legen (mittig, Zellseitenverhältnis begrenzt) */
export function layoutGrid(availW: number, availH: number, left: number, top: number, grid: GridSize): GridLayout {
  let cw = availW / grid.cols;
  let ch = availH / grid.rows;
  if (cw / ch > MAX_CELL_ASPECT) cw = ch * MAX_CELL_ASPECT;
  else if (ch / cw > MAX_CELL_ASPECT) ch = cw * MAX_CELL_ASPECT;
  const gw = cw * grid.cols;
  const gh = ch * grid.rows;
  return { x0: left + (availW - gw) / 2, y0: top + (availH - gh) / 2, cw, ch, cols: grid.cols, rows: grid.rows };
}

/** Raster der Stufe – auf sehr kleinen Bühnen fällt 4×4 auf 3×3 zurück, damit Zellen ≥ MIN_CELL_PX bleiben */
export function chooseLayout(level: number, availW: number, availH: number, left: number, top: number): GridLayout {
  let grid = gridFor(level);
  let lay = layoutGrid(availW, availH, left, top, grid);
  if (Math.min(lay.cw, lay.ch) < MIN_CELL_PX && grid.cols > 3) {
    grid = { cols: 3, rows: 3 };
    lay = layoutGrid(availW, availH, left, top, grid);
  }
  return lay;
}

export function cellCenter(lay: GridLayout, idx: number): { x: number; y: number } {
  return { x: lay.x0 + (cellCol(idx, lay.cols) + 0.5) * lay.cw, y: lay.y0 + (cellRow(idx, lay.cols) + 0.5) * lay.ch };
}

/** Zelle unter einem Punkt, −1 außerhalb des Rasters */
export function cellAt(lay: GridLayout, x: number, y: number): number {
  const c = Math.floor((x - lay.x0) / lay.cw);
  const r = Math.floor((y - lay.y0) / lay.ch);
  if (c < 0 || c >= lay.cols || r < 0 || r >= lay.rows) return -1;
  return cellIndex(c, r, lay.cols);
}

/** Sichtbarer Zielradius: an die Zelle angepasst, mindestens 26 px, höchstens 8 u */
export function targetRadius(lay: GridLayout, u: number): number {
  return clamp(Math.min(lay.cw, lay.ch) * 0.3, 26, Math.max(26, u * 8));
}

/** Weiches Ein-/Ausblenden (Deckkraft 0..1): ≥ 100 ms Übergang, nie ein harter Wechsel */
export function targetAlpha(age: number, life: number, fadeIn = 130, fadeOut = 130): number {
  if (age < 0 || age >= life) return 0;
  return Math.min(clamp(age / fadeIn, 0, 1), clamp((life - age) / fadeOut, 0, 1));
}

export interface Stats {
  /** Median der Zeit bis zum Tipp (nur richtige Treffer), NaN ohne Treffer */
  medianMs: number;
  /** Median bei weiten / nahen Sprüngen (NaN, wenn weniger als `min` Werte) */
  medianFar: number;
  medianNear: number;
  hits: number;
  wrong: number;
  timeouts: number;
  /** Anteil richtiger Ziele in % (0 ohne Ziele) */
  accuracy: number;
}

export interface HitSample {
  ms: number;
  far: boolean;
}

export function computeStats(hits: readonly HitSample[], wrong: number, timeouts: number, minPerGroup = 3): Stats {
  const far = hits.filter((h) => h.far).map((h) => h.ms);
  const near = hits.filter((h) => !h.far).map((h) => h.ms);
  const total = hits.length + wrong + timeouts;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianFar: far.length >= minPerGroup ? median(far) : NaN,
    medianNear: near.length >= minPerGroup ? median(near) : NaN,
    hits: hits.length,
    wrong,
    timeouts,
    accuracy: total ? (100 * hits.length) / total : 0,
  };
}

/** Schlüssel in texts.tips: wrong | slow | far | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.timeouts) return 'wrong';
  if (s.timeouts >= 3) return 'slow';
  if (Number.isFinite(s.medianFar) && Number.isFinite(s.medianNear) && s.medianFar - s.medianNear > 150) return 'far';
  return 'great';
}
