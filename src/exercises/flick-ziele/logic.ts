/**
 * Flick-Ziele – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Einzelne Ziele erscheinen weich an zufälligen Orten der Bühne. Stufe = Größe und Sichtzeit.
 * Der Abstand zum vorigen Ziel wechselt zwischen nah, mittel und weit (nie dreimal dieselbe Klasse),
 * damit jede Bewegung anders lang ist.
 */
import { clamp, median } from '../../core/stats';
import type { Rng } from '../../core/rng';
import { minLifeMs } from '../_shared/ziel-auftauchen';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
/** Kürzeste Sichtzeit: weich ein und aus plus kurze volle Sichtbarkeit */
export const MIN_LIFE_MS = Math.max(520, minLifeMs(200));

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Sichtbarer Zielradius in u (1 % der kürzeren Seite): Stufe 1 ≈ 7,5 u, Stufe 14 ≈ 3,6 u */
export function radiusU(level: number): number {
  return clamp(7.5 - 0.3 * (levelOf(level) - 1), 3.6, 7.5);
}

/** Sichtzeit in ms: 1,7 s auf Stufe 1, je Stufe ≈ 9 % kürzer, nie unter 520 ms */
export function lifeMs(level: number): number {
  return clamp(Math.round(1700 * Math.pow(0.91, levelOf(level) - 1)), MIN_LIFE_MS, 1700);
}

/** Pause vor dem nächsten Ziel (ms): zufällig 450–950 → der Zeitpunkt lässt sich nicht erraten */
export function gapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(450, 950);
}

export type DistClass = 'near' | 'mid' | 'far';

/** Abstandsklassen als Anteil der Diagonale des Spielfelds (Mitte zu Mitte) */
export const DIST_RANGE: Record<DistClass, [number, number]> = {
  near: [0.12, 0.25],
  mid: [0.3, 0.5],
  far: [0.55, 0.85],
};

/** Nächste Abstandsklasse: gleichverteilt, aber nie dreimal dieselbe hintereinander */
export function pickDistClass(rng: Pick<Rng, 'int'>, history: readonly DistClass[]): DistClass {
  const all: DistClass[] = ['near', 'mid', 'far'];
  const n = history.length;
  const banned = n >= 2 && history[n - 1] === history[n - 2] ? history[n - 1] : null;
  const pool = all.filter((c) => c !== banned);
  return pool[rng.int(pool.length)];
}

export interface Area {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface Pt {
  x: number;
  y: number;
}

/** Spielfeld mit Rand `pad` (px) um den Zielrand; nie leer (mindestens ein Punkt Breite) */
export function playArea(w: number, h: number, pad: number, bottom = h): Area {
  const maxY = Math.max(pad + 1, bottom - pad);
  return { minX: pad, maxX: Math.max(pad + 1, w - pad), minY: pad, maxY };
}

export const diagonal = (a: Area): number => Math.hypot(a.maxX - a.minX, a.maxY - a.minY);

/**
 * Ort des nächsten Ziels: Abstand zum vorigen Ziel in der gewünschten Klasse (soweit das Feld es zulässt).
 * Liegt kein Punkt in der Klasse (kleines Feld), gilt der Kandidat mit dem nächsten Abstand.
 */
export function pickTarget(rng: Pick<Rng, 'range'>, area: Area, last: Pt, cls: DistClass): Pt & { dist: number } {
  const diag = diagonal(area);
  const [lo, hi] = DIST_RANGE[cls];
  const mid = (lo + hi) / 2;
  let best: (Pt & { dist: number }) | null = null;
  let bestErr = Infinity;
  for (let i = 0; i < 60; i++) {
    const x = rng.range(area.minX, area.maxX);
    const y = rng.range(area.minY, area.maxY);
    const dist = Math.hypot(x - last.x, y - last.y);
    const frac = dist / diag;
    if (frac >= lo && frac <= hi) return { x, y, dist };
    const err = Math.abs(frac - mid);
    if (err < bestErr) {
      bestErr = err;
      best = { x, y, dist };
    }
  }
  return best as Pt & { dist: number };
}

/** Klasse eines gemessenen Abstands (für die Auswertung), nach Anteil der Diagonale */
export function classOfDistance(dist: number, diag: number): DistClass {
  const f = diag > 0 ? dist / diag : 0;
  if (f < 0.275) return 'near';
  if (f < 0.525) return 'mid';
  return 'far';
}

export interface HitSample {
  ms: number;
  cls: DistClass;
}

export interface Stats {
  medianMs: number;
  /** Median bei nahen und weiten Zielen; NaN, wenn weniger als `minPerGroup` Werte */
  medianNear: number;
  medianFar: number;
  hits: number;
  wrong: number;
  missed: number;
  /** Trefferquote in % (0 ohne Ziele) */
  accuracy: number;
}

export function computeStats(hits: readonly HitSample[], wrong: number, missed: number, minPerGroup = 3): Stats {
  const near = hits.filter((h) => h.cls === 'near').map((h) => h.ms);
  const far = hits.filter((h) => h.cls === 'far').map((h) => h.ms);
  const total = hits.length + wrong + missed;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianNear: near.length >= minPerGroup ? median(near) : NaN,
    medianFar: far.length >= minPerGroup ? median(far) : NaN,
    hits: hits.length,
    wrong,
    missed,
    accuracy: total ? (100 * hits.length) / total : 0,
  };
}

/** Punkte je Treffer: Grundwert, Stufenbonus, Tempobonus (nur zur Motivation) */
export function pointsFor(level: number, rt: number, life: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(Math.max(0, 1 - rt / life) * 10);
}

/** Schlüssel in texts.tips: wrong | slow | far | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'slow';
  if (Number.isFinite(s.medianNear) && Number.isFinite(s.medianFar) && s.medianFar - s.medianNear > 250) return 'far';
  return 'great';
}
