/**
 * Winkel halten – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Du wartest in der Mitte. Links oder rechts taucht in einem Durchgang am Rand plötzlich ein Ziel auf, du tippst es an.
 * Die Wartezeit ist unvorhersehbar (nicht alternd). Wer tippt, bevor das Ziel da ist (oder weniger als 100 ms danach),
 * hat einen Frühstart. Stufe = Größe, Sichtzeit und Höhenstreuung der Ziele.
 */
import { clamp, median } from '../../core/stats';
import type { Rng } from '../../core/rng';
import { ANTICIPATION_MS, foreperiodMs } from '../_shared/vorperiode';
import { type EdgeLayout, type Side, edgeLayout, edgeTargetAt, inCircle, minLifeMs, pickSide } from '../_shared/ziel-auftauchen';

export { ANTICIPATION_MS, inCircle, pickSide, type Side };

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;
export const MIN_LIFE_MS = Math.max(520, minLifeMs(200));

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Sichtbarer Zielradius in u: Stufe 1 ≈ 6,8 u, Stufe 14 ≈ 3,6 u */
export function radiusU(level: number): number {
  return clamp(6.8 - 0.25 * (levelOf(level) - 1), 3.6, 6.8);
}

/** Sichtzeit in ms: 1,7 s auf Stufe 1, je Stufe ≈ 9 % kürzer, nie unter 520 ms */
export function lifeMs(level: number): number {
  return clamp(Math.round(1700 * Math.pow(0.91, levelOf(level) - 1)), MIN_LIFE_MS, 1700);
}

/** Anteil der Feldhöhe, in dem das Ziel am Rand erscheinen kann: Stufe 1 = 25 %, Stufe 14 = 85 % */
export function bandFrac(level: number): number {
  return clamp(0.25 + 0.046 * (levelOf(level) - 1), 0.25, 0.85);
}

/** Wartezeit bis zum Ziel: 1 s + exponentieller Anteil (Mittel 1 s, höchstens 3,5 s) – nicht alternd */
export function waitMs(rng: Pick<Rng, 'exp'>): number {
  return foreperiodMs(rng, { minMs: 1000, meanMs: 1000, capMs: 3500 });
}

/** Pause nach einem Durchgang bis zur nächsten Wartezeit (bei Frühstart etwas länger) */
export const GAP_MS = 500;
export const EARLY_GAP_MS = 900;

export interface Layout extends EdgeLayout {
  /** Breite des Durchgangs (Öffnung in der Wand) */
  slotW: number;
  /** Fixationskreuz: Halbe Armlänge */
  arm: number;
}

/** Bühne aufteilen: Fixationskreuz in der Mitte, Durchgänge links und rechts (siehe `edgeLayout`) */
export function layoutFor(w: number, bottom: number, u: number, level: number): Layout {
  const e = edgeLayout(w, bottom, u, radiusU(level), bandFrac(level));
  return { ...e, slotW: e.leftX * 2, arm: Math.max(10, u * 2.4) };
}

/** Zielmitte für eine Seite und einen normierten Höhenwert ny (0 = oben im Band, 1 = unten) */
export const targetAt = edgeTargetAt;

/**
 * Wie weit das Ziel schon aus dem Durchgang herausgeschoben ist (0..1): in 360 ms weich nach innen.
 * Die Position ist reine Zeitfunktion, unabhängig von der Bildrate.
 */
export function emerge(age: number, ms = 360): number {
  const k = clamp(age / ms, 0, 1);
  return k * k * (3 - 2 * k);
}

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
  early: number;
  wrong: number;
  missed: number;
  /** Anteil richtig getippter Durchgänge in % (0 ohne Durchgänge) */
  accuracy: number;
}

export function computeStats(hits: readonly HitSample[], early: number, wrong: number, missed: number, minPerSide = 3): Stats {
  const left = hits.filter((h) => h.side === 'left').map((h) => h.ms);
  const right = hits.filter((h) => h.side === 'right').map((h) => h.ms);
  const total = hits.length + early + wrong + missed;
  return {
    medianMs: median(hits.map((h) => h.ms)),
    medianLeft: left.length >= minPerSide ? median(left) : NaN,
    medianRight: right.length >= minPerSide ? median(right) : NaN,
    hits: hits.length,
    early,
    wrong,
    missed,
    accuracy: total ? (100 * hits.length) / total : 0,
  };
}

/** Punkte je Treffer: Grundwert, Stufenbonus, Tempobonus (nur zur Motivation) */
export function pointsFor(level: number, rt: number, life: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(Math.max(0, 1 - rt / life) * 10);
}

/** Schlüssel in texts.tips: early | wrong | slow | side | great */
export function tipFor(s: Stats): string {
  if (s.early >= 2) return 'early';
  if (s.wrong >= 3 && s.wrong >= s.missed) return 'wrong';
  if (s.missed >= 3) return 'slow';
  if (Number.isFinite(s.medianLeft) && Number.isFinite(s.medianRight) && Math.abs(s.medianLeft - s.medianRight) > 120) return 'side';
  return 'great';
}
