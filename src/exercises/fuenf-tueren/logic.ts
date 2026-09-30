/**
 * Fünf Türen – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Fünf Türen nebeneinander; ein Ziel erscheint kurz in einer Tür und muss angetippt werden,
 * bevor es wieder verschwindet. Die Sichtbarkeitsdauer folgt einer Stufe (Staircase).
 */
import { clamp, median } from '../../core/stats';
import type { Rng } from '../../core/rng';

export const DOORS = 5;
export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
/** Kürzeste Gesamtdauer eines Ziels: je 130 ms weich ein und aus, dazwischen mindestens 160 ms voll sichtbar */
export const MIN_VISIBLE_MS = 420;
export const FADE_MS = 130;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Sichtbarkeitsdauer in ms: 1,5 s auf Stufe 1, je Stufe ≈ 12 % kürzer, nie unter 420 ms */
export function visibleMs(level: number): number {
  return clamp(Math.round(1500 * Math.pow(0.88, levelOf(level) - 1)), MIN_VISIBLE_MS, 1500);
}

/** Pause vor dem nächsten Ziel (ms): zufällig 550–1150 ms → der Zeitpunkt lässt sich nicht erraten */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(550, 1150);
}

/**
 * Nächste Tür (0…4): nie dieselbe wie direkt zuvor, und keine Läufe über drei Türen
 * in gleichem Abstand von 1 (also kein „1-2-3“ oder „4-3-2“, das sich erraten ließe).
 * `history` = bisherige Türen, die letzte zuletzt.
 */
export function pickDoor(rng: Pick<Rng, 'int'>, history: readonly number[], doors = DOORS): number {
  const last = history.length ? history[history.length - 1] : -1;
  const prev = history.length > 1 ? history[history.length - 2] : -1;
  const pool: number[] = [];
  for (let d = 0; d < doors; d++) {
    if (d === last) continue;
    if (last >= 0 && prev >= 0 && Math.abs(last - prev) === 1 && d - last === last - prev) continue;
    pool.push(d);
  }
  return pool[rng.int(pool.length)];
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DoorLayout {
  doors: Rect[];
  /** Mitte der Zielposition je Tür */
  targets: Array<{ x: number; y: number }>;
  /** Radius des sichtbaren Ziels */
  radius: number;
  /** Höhe der Zahlenzeile unter den Türen */
  labelH: number;
  gap: number;
  /** Trefferzone: untere/obere Grenze der Türreihe inkl. Rand */
  hitTop: number;
  hitBottom: number;
}

/** Türreihe in den verfügbaren Bereich legen: mittig, Türen höchstens 22 u breit, Bogentür ≈ 1,9 × so hoch wie breit */
export function layoutDoors(w: number, u: number, bottomLimit: number): DoorLayout {
  const m = Math.max(10, u * 2);
  const gap = Math.max(6, u * 1.6);
  const labelH = Math.max(20, u * 3.8);
  const availW = Math.max(100, w - 2 * m);
  let dw = (availW - (DOORS - 1) * gap) / DOORS;
  dw = Math.min(dw, u * 22);
  const availH = Math.max(80, bottomLimit - m);
  const dh = Math.min(dw * 1.9, availH - labelH - 4);
  const rowW = dw * DOORS + gap * (DOORS - 1);
  const x0 = (w - rowW) / 2;
  const y0 = m + (availH - dh - labelH) / 2;
  const doors: Rect[] = [];
  const targets: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < DOORS; i++) {
    const r = { x: x0 + i * (dw + gap), y: y0, w: dw, h: dh };
    doors.push(r);
    targets.push({ x: r.x + r.w / 2, y: r.y + r.h * 0.56 });
  }
  return {
    doors,
    targets,
    radius: clamp(dw * 0.3, 18, Math.max(18, u * 9)),
    labelH,
    gap,
    hitTop: y0 - gap,
    hitBottom: y0 + dh + labelH,
  };
}

/** Tür unter einem Punkt: die ganze Türspalte (bis zur halben Lücke) zählt, −1 außerhalb der Reihe */
export function doorAt(lay: DoorLayout, x: number, y: number): number {
  if (y < lay.hitTop || y > lay.hitBottom) return -1;
  for (let i = 0; i < lay.doors.length; i++) {
    const d = lay.doors[i];
    if (x >= d.x - lay.gap / 2 && x <= d.x + d.w + lay.gap / 2) return i;
  }
  return -1;
}

/** Weiches Ein-/Ausblenden (Deckkraft 0..1): je ≥ 100 ms Übergang */
export function targetAlpha(age: number, life: number, fadeIn = FADE_MS, fadeOut = FADE_MS): number {
  if (age < 0 || age >= life) return 0;
  return Math.min(clamp(age / fadeIn, 0, 1), clamp((life - age) / fadeOut, 0, 1));
}

export interface HitSample {
  ms: number;
  door: number;
}

export interface Stats {
  medianMs: number;
  /** Median an den äußeren Türen (1, 5) und an den inneren (2–4); NaN, wenn weniger als `minPerGroup` Werte */
  medianOuter: number;
  medianInner: number;
  hits: number;
  wrong: number;
  missed: number;
  /** Trefferquote in % (0 ohne Ziele) */
  accuracy: number;
}

export const isOuter = (door: number): boolean => door === 0 || door === DOORS - 1;

export function computeStats(hits: readonly HitSample[], wrong: number, missed: number, minPerGroup = 3): Stats {
  const outer = hits.filter((h) => isOuter(h.door)).map((h) => h.ms);
  const inner = hits.filter((h) => !isOuter(h.door)).map((h) => h.ms);
  const total = hits.length + wrong + missed;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianOuter: outer.length >= minPerGroup ? median(outer) : NaN,
    medianInner: inner.length >= minPerGroup ? median(inner) : NaN,
    hits: hits.length,
    wrong,
    missed,
    accuracy: total ? (100 * hits.length) / total : 0,
  };
}

/** Schlüssel in texts.tips: wrong | slow | outer | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'slow';
  if (Number.isFinite(s.medianOuter) && Number.isFinite(s.medianInner) && s.medianOuter - s.medianInner > 120) return 'outer';
  return 'great';
}
