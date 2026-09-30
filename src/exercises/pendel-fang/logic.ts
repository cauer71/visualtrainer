/**
 * Pendel-Fang – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Ein Ziel schwingt sinusförmig auf einer waagrechten Linie hin und her: x = A · sin(φ), die Phase φ
 * wächst mit dt. In der Mitte liegt der markierte Fangbereich. Man tippt, wenn das Ziel darin ist.
 * Gewertet wird, wie weit das Ziel beim Tipp von der Mitte entfernt war – in ms (vor/nach dem
 * Durchgang durch die Mitte) und in % der Bahnbreite.
 *
 * Sinus statt Zickzack: Geschwindigkeit und Umkehr sind gleichmäßig und vorhersehbar; die Stufe
 * macht die Schwingung schneller, weiter und den Fangbereich enger.
 */
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 14;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Stufen dürfen gebrochen sein (weiche Übergänge beim Stufenwechsel): dann wird zwischen den Stufen gemischt */
const clampLevel = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);
const lerpLevel = (a: number, b: number, level: number): number => a + ((b - a) * (clampLevel(level) - MIN_LEVEL)) / (MAX_LEVEL - MIN_LEVEL);

/** Tempo: Dauer einer ganzen Schwingung in ms – 5,0 s auf Stufe 1, 2,8 s auf Stufe 14 (geometrisch) */
export function periodMs(level: number): number {
  return Math.round(5000 * Math.pow(2800 / 5000, (clampLevel(level) - MIN_LEVEL) / (MAX_LEVEL - MIN_LEVEL)));
}

/** Pendelweite: halbe Bahnbreite in u (1 % der kürzeren Seite) – 32 u auf Stufe 1, 44 u auf Stufe 14 */
export function swingU(level: number): number {
  return lerpLevel(32, 44, level);
}

/** Breite des Fangbereichs in u – 14 u auf Stufe 1, 7,5 u auf Stufe 14 */
export function zoneU(level: number): number {
  return lerpLevel(14, 7.5, level);
}

/** Halbe Bahnbreite in px: nie breiter, als auf die Bühne passt (Hochformat) */
export function swingPx(level: number, u: number, stageW: number, margin: number): number {
  return Math.max(20, Math.min(swingU(level) * u, stageW / 2 - margin));
}

/** Breite des Fangbereichs in px: nie unter 44 px (sichtbar erkennbar), nie breiter als 80 % der halben Bahn */
export function zonePx(level: number, u: number, amp: number): number {
  return Math.max(44, Math.min(zoneU(level) * u, amp * 0.8));
}

/** Zeit in ms, in der sich das Ziel beim Durchgang durch die Mitte im Fangbereich befindet */
export function windowMs(period: number, amp: number, zone: number): number {
  const s = clamp(zone / (2 * amp), 0, 1);
  return (2 * Math.asin(s) * period) / (2 * Math.PI);
}

/** Weiter schwingen: Phase (rad) wächst mit dt (Sekunden) */
export function advancePhase(phase: number, dtSec: number, period: number): number {
  return phase + (2 * Math.PI * dtSec * 1000) / period;
}

/** Ort des Ziels (px ab Mitte, rechts positiv) */
export const posOf = (phase: number, amp: number): number => amp * Math.sin(phase);

export interface Judgement {
  hit: boolean;
  /** Zeit zum nächsten Durchgang durch die Mitte: negativ = vor der Mitte (zu früh), positiv = danach (zu spät) */
  offsetMs: number;
  /** Abstand in Bewegungsrichtung in % der Bahnbreite: negativ = vor der Mitte, positiv = hinter der Mitte */
  offsetPct: number;
  /** Bewegungsrichtung beim nächsten Durchgang durch die Mitte: +1 nach rechts, −1 nach links */
  dir: 1 | -1;
}

/** Tipp bewerten: `phase` = Phase des Ziels zum Zeitpunkt des Tipps. Fangbereich = `zone` (px) breit, mittig. */
export function judgeTap(phase: number, period: number, amp: number, zone: number): Judgement {
  const k = Math.round(phase / Math.PI);
  const d = phase - k * Math.PI;
  const along = amp * Math.sin(d);
  return {
    hit: Math.abs(along) <= zone / 2,
    offsetMs: (d / (2 * Math.PI)) * period,
    offsetPct: (100 * along) / (2 * amp),
    dir: k % 2 === 0 ? 1 : -1,
  };
}

/** Zeit in ms bis zum nächsten Durchgang durch die Mitte, der mindestens `minAhead` ms entfernt ist */
export function nextCrossingMs(phase: number, period: number, minAhead = 0): number {
  const perRad = period / (2 * Math.PI);
  let k = Math.floor(phase / Math.PI) + 1;
  while ((k * Math.PI - phase) * perRad < minAhead) k++;
  return (k * Math.PI - phase) * perRad;
}

/** Durchgänge je Sitzung */
export const TRIALS = 18;
export const QUICK_TRIALS = 4;

/** Pause zwischen zwei Versuchen (ms): zufällig 700–1200 */
export function gapMs(rng: { range(a: number, b: number): number }): number {
  return rng.range(700, 1200);
}

/** Nach dieser Zeit ohne Tipp zählt der Versuch als nicht getippt: 1,6 Schwingungen */
export const timeoutMs = (period: number): number => Math.round(period * 1.6);

export function pointsFor(level: number, offsetMs: number, window: number): number {
  const closeness = window > 0 ? clamp(1 - Math.abs(offsetMs) / (window / 2), 0, 1) : 0;
  return 10 + 2 * (levelOf(level) - 1) + Math.round(closeness * 10);
}

export interface TapSample {
  hit: boolean;
  offsetMs: number;
  offsetPct: number;
}

export interface Stats {
  taps: number;
  hits: number;
  /** Versuche ohne Tipp */
  none: number;
  /** Trefferquote in % aller Versuche (0 ohne Versuche) */
  hitRate: number;
  /** Mittlere Abweichung (Betrag) in ms; NaN ohne Tipp */
  meanDevMs: number;
  /** Mittlere Abweichung (Betrag) in % der Bahnbreite; NaN ohne Tipp */
  meanDevPct: number;
  /** Median der vorzeichenbehafteten Abweichung in ms (negativ = eher zu früh); NaN bei weniger als 3 Tipps */
  tendencyMs: number;
}

function medianOf(xs: readonly number[]): number {
  const a = [...xs].sort((p, q) => p - q);
  const m = a.length >> 1;
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

export function computeStats(samples: readonly TapSample[], none: number): Stats {
  const n = samples.length;
  const total = n + none;
  const hits = samples.filter((s) => s.hit).length;
  return {
    taps: n,
    hits,
    none,
    hitRate: total ? (100 * hits) / total : 0,
    meanDevMs: n ? samples.reduce((a, s) => a + Math.abs(s.offsetMs), 0) / n : NaN,
    meanDevPct: n ? samples.reduce((a, s) => a + Math.abs(s.offsetPct), 0) / n : NaN,
    tendencyMs: n >= 3 ? medianOf(samples.map((s) => s.offsetMs)) : NaN,
  };
}

/** Ab dieser Tendenz (ms) lohnt ein Hinweis auf „eher früh/spät“ */
export const TENDENCY_TIP_MS = 40;

/** Schlüssel in texts.tips: early | late | none | great */
export function tipFor(s: Stats): string {
  if (s.none >= 3 && s.none >= s.taps - s.hits) return 'none';
  if (Number.isFinite(s.tendencyMs) && s.tendencyMs <= -TENDENCY_TIP_MS) return 'early';
  if (Number.isFinite(s.tendencyMs) && s.tendencyMs >= TENDENCY_TIP_MS) return 'late';
  return 'great';
}
