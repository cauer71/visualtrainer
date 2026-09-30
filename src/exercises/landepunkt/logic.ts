/**
 * Landepunkt – reine Logik (Stufenfunktionen, Wurfparabel, Wertung), ohne Canvas und DOM.
 *
 * Ein Ball fliegt in einer Wurfparabel über die Bühne und verschwindet hinter einer Wand. Man tippt
 * dorthin, wo er landen wird. Fehler = Abstand zwischen Tipp und Landepunkt in % der Bühnenbreite.
 *
 * Die Parabel folgt der Wurfphysik: horizontal gleichmäßig, vertikal mit Schwerkraft. Zu Flugdauer T
 * und Bogenhöhe H gehören g = 8 H / T² und die Abwurfgeschwindigkeit vy = g T / 2 (Start und Landung
 * auf gleicher Höhe). Die Flugzeit wird mit dt aufsummiert, also unabhängig von der Bildrate.
 *
 * Stufen (1–20, höher = schwerer):
 * - Verdeckungsanteil: 40 % → 80 % der Flugzeit liegen hinter der Wand
 * - Tempo: Flugdauer 2,4 s → 1,07 s
 * - Höhe des Bogens: 30 % → 78 % der verfügbaren Höhe
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;

/** Ein Tipp gilt als Treffer, wenn er höchstens so viel % der Bühnenbreite vom Landepunkt entfernt ist */
export const HIT_TOL_PCT = 6;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Flugdauer in Sekunden (Tempo) */
export function flightSecondsFor(level: number): number {
  return 2.4 - 0.07 * (levelOf(level) - 1);
}

/** Anteil der Flugzeit, der hinter der Wand liegt (0..1) */
export function hiddenFractionFor(level: number): number {
  return 0.4 + 0.021 * (levelOf(level) - 1);
}

/** Bogenhöhe als Anteil der verfügbaren Höhe (0..1) */
export function arcHeightFractionFor(level: number): number {
  return 0.3 + 0.025 * (levelOf(level) - 1);
}

export interface Pt {
  x: number;
  y: number;
}

export interface Throw {
  /** Abwurfort (Ballmitte) */
  x0: number;
  y0: number;
  /** +1 = nach rechts, −1 = nach links */
  dir: 1 | -1;
  /** Wurfweite in px (Betrag) */
  dist: number;
  /** Flugdauer in s */
  T: number;
  /** Bogenhöhe in px (Scheitel über y0) */
  H: number;
  /** Anteil der Flugzeit hinter der Wand */
  hidden: number;
  /** horizontale Geschwindigkeit in px/s (mit Vorzeichen) */
  vx: number;
  /** Abwurfgeschwindigkeit nach oben in px/s */
  vy: number;
  /** Schwerkraft in px/s² */
  g: number;
}

export interface ThrowParams {
  /** Bühnenbreite */
  w: number;
  /** y der Ballmitte am Boden (Start und Landung) */
  groundY: number;
  /** kleinstes erlaubtes y der Ballmitte (obere Grenze des Bogens) */
  topY: number;
  /** seitlicher Rand für die Ballmitte */
  margin: number;
  level: number;
  /** feste Flugdauer/Verdeckung/Höhe (Intro-Film) */
  fixed?: { T: number; hidden: number; height: number; dist: number; dir: 1 | -1; x0?: number };
}

export function makeThrow(p: ThrowParams, rng: Rng): Throw {
  const L = levelOf(p.level);
  const T = p.fixed?.T ?? flightSecondsFor(L);
  const hidden = p.fixed?.hidden ?? hiddenFractionFor(L);
  const room = Math.max(1, p.groundY - p.topY);
  const H = clamp(p.fixed?.height ?? arcHeightFractionFor(L), 0.05, 1) * room;
  const free = Math.max(1, p.w - 2 * p.margin);
  const dist = Math.min(free, p.fixed?.dist ?? rng.range(0.42, 0.78) * p.w);
  const dir: 1 | -1 = p.fixed?.dir ?? (rng.chance(0.5) ? 1 : -1);
  const lo = dir === 1 ? p.margin : p.margin + dist;
  const hi = dir === 1 ? p.w - p.margin - dist : p.w - p.margin;
  const x0 = p.fixed?.x0 !== undefined ? clamp(p.fixed.x0, lo, hi) : lo + (hi - lo) * rng.next();
  const g = (8 * H) / (T * T);
  return { x0, y0: p.groundY, dir, dist, T, H, hidden, vx: (dir * dist) / T, vy: (g * T) / 2, g };
}

/** Ballmitte s Sekunden nach dem Abwurf (s wird auf [0, T] begrenzt: danach liegt er am Landepunkt) */
export function throwPos(th: Throw, s: number): Pt {
  const q = clamp(s, 0, th.T);
  return { x: th.x0 + th.vx * q, y: th.y0 - th.vy * q + 0.5 * th.g * q * q };
}

export function landingPoint(th: Throw): Pt {
  return { x: th.x0 + th.dir * th.dist, y: th.y0 };
}

/** Zeit (s nach Abwurf), ab der der Ball verdeckt ist */
export function hideSeconds(th: Throw): number {
  return th.T * (1 - th.hidden);
}

/** Fehler in % der Bühnenbreite: Abstand zwischen Tipp und Landepunkt */
export function errorPct(tap: Pt, landing: Pt, stageW: number): number {
  return (100 * Math.hypot(tap.x - landing.x, tap.y - landing.y)) / Math.max(1, stageW);
}

export function isHit(err: number): boolean {
  return err <= HIT_TOL_PCT;
}

/** Punkte je Tipp: Treffer 10 + 2 je Stufe über 1, dazu bis 5 für besonders genaue */
export function pointsFor(err: number, level: number): number {
  if (!isHit(err)) return 0;
  return 10 + 2 * (Math.floor(levelOf(level) + 1e-9) - 1) + Math.round(5 * (1 - err / HIT_TOL_PCT));
}

/** Mittlerer Fehler in % (nur Durchgänge mit Tipp), sonst NaN */
export function meanError(errors: readonly number[]): number {
  if (!errors.length) return NaN;
  return errors.reduce((a, b) => a + b, 0) / errors.length;
}

/** Tipp, der zum Fehler ≈ σ % der Bühnenbreite passt (Autoplay) */
export function noisyTap(landing: Pt, sigmaPct: number, stageW: number, rng: Rng): Pt {
  const s = (sigmaPct / 100) * stageW;
  return { x: landing.x + rng.normal() * s, y: landing.y + rng.normal() * s * 0.5 };
}
