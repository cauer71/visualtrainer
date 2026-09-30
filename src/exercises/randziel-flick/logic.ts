/**
 * Randziel-Flick – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Start immer von der Mittelmarke: Tipp in die Mitte, nach einer unvorhersehbaren Wartezeit erscheint am linken
 * oder rechten Bildrand ein Ziel, das du antippst. Stufe = Größe, Sichtzeit und wie weit das Ziel vertikal streut.
 */
import { clamp, median } from '../../core/stats';
import type { Rng } from '../../core/rng';
import { foreperiodMs } from '../_shared/vorperiode';
import { type EdgeLayout, type Side, edgeLayout, edgeTargetAt, inCircle, minLifeMs, pickSide } from '../_shared/ziel-auftauchen';

export { inCircle, pickSide, type Side };

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
export const MIN_LIFE_MS = Math.max(560, minLifeMs(200));

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Sichtbarer Zielradius in u: Stufe 1 ≈ 7,2 u, Stufe 14 ≈ 3,6 u */
export function radiusU(level: number): number {
  return clamp(7.2 - 0.28 * (levelOf(level) - 1), 3.6, 7.2);
}

/** Sichtzeit in ms: 1,9 s auf Stufe 1, je Stufe ≈ 9 % kürzer, nie unter 560 ms */
export function lifeMs(level: number): number {
  return clamp(Math.round(1900 * Math.pow(0.91, levelOf(level) - 1)), MIN_LIFE_MS, 1900);
}

/** Anteil der Spielfeldhöhe, in dem das Ziel erscheinen kann: Stufe 1 = 30 %, Stufe 14 = 90 % */
export function bandFrac(level: number): number {
  return clamp(0.3 + 0.046 * (levelOf(level) - 1), 0.3, 0.9);
}

/** Wartezeit nach dem Tipp in die Mitte: 500 ms + exponentieller Anteil (Mittel 450 ms, höchstens 1,8 s) */
export function waitMs(rng: Pick<Rng, 'exp'>): number {
  return foreperiodMs(rng, { minMs: 500, meanMs: 450, capMs: 1800 });
}

/** Pause nach einem Durchgang, bevor die Mittelmarke wieder „bereit“ ist */
export const GAP_MS = 380;

export interface Layout extends EdgeLayout {
  /** Mittelmarke: sichtbarer Radius und Radius des Tippbereichs */
  markR: number;
  markHit: number;
}

/** Bühne aufteilen: Mittelmarke und Randziele (siehe `edgeLayout`) */
export function layoutFor(w: number, bottom: number, u: number, level: number): Layout {
  const markR = Math.max(26, u * 4.5);
  return { ...edgeLayout(w, bottom, u, radiusU(level), bandFrac(level)), markR, markHit: Math.max(44, markR * 1.35) };
}

/** Zielmitte für eine Seite und einen normierten Höhenwert ny (0 = oben im Band, 1 = unten) */
export const targetAt = edgeTargetAt;

export interface HitSample {
  ms: number;
  side: Side;
}

export interface Stats {
  medianMs: number;
  /** Median links und rechts; NaN, wenn weniger als `minPerSide` Werte */
  medianLeft: number;
  medianRight: number;
  hits: number;
  wrong: number;
  missed: number;
  /** Trefferquote in % (0 ohne Durchgänge) */
  accuracy: number;
}

export function computeStats(hits: readonly HitSample[], wrong: number, missed: number, minPerSide = 3): Stats {
  const left = hits.filter((h) => h.side === 'left').map((h) => h.ms);
  const right = hits.filter((h) => h.side === 'right').map((h) => h.ms);
  const total = hits.length + wrong + missed;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianLeft: left.length >= minPerSide ? median(left) : NaN,
    medianRight: right.length >= minPerSide ? median(right) : NaN,
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

/** Schlüssel in texts.tips: wrong | slow | side | great */
export function tipFor(s: Stats): string {
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'slow';
  if (Number.isFinite(s.medianLeft) && Number.isFinite(s.medianRight) && Math.abs(s.medianLeft - s.medianRight) > 120) return 'side';
  return 'great';
}
