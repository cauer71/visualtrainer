/**
 * Sprungweite – reine Logik (Stufenfunktionen, Wurfparabel, Wertung), ohne Canvas und DOM.
 *
 * Eine Kugel steht am Boden und „springt“ in einem Bogen zu einer Zielmarke. Die Sprungweite bestimmt man
 * durch Ziehen des Fingers an einer Kraftleiste: Länge des Ziehens → Sprungweite. Fehler = Abstand zwischen
 * Landepunkt und Zielmitte in % der Bühnenbreite.
 *
 * Die Parabel folgt der Wurfphysik mit fester Abwurfrichtung (LAUNCH_DEG) und fester Schwerkraft: Zu einer Weite D
 * gehören v = √(D·g / sin 2θ), vx = v·cos θ, vy = v·sin θ, Flugdauer T = 2·vy/g und Scheitelhöhe H = vy²/(2g).
 * Die Flugzeit wird mit dt aufsummiert, ist also unabhängig von der Bildrate.
 *
 * Stufen (1–20, höher = schwerer):
 * - Trefferfeld: ±9 % → ±3 % der Bühnenbreite
 * - Hilfsmarke an der Kraftleiste: zeigt anfangs die richtige Kraft und blendet bis Stufe 8 aus
 * - Zielabstand: anfangs mittlere Weiten, später auch sehr kurze und sehr weite Sprünge
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;

/** Abwurfwinkel in Grad (fest): so hängen Weite, Höhe und Flugzeit wie beim echten Wurf zusammen */
export const LAUNCH_DEG = 52;
/** Sprungweite bei voller Kraft als Anteil der Bühnenbreite */
export const MAX_DIST_FRAC = 0.8;
/** Kürzeste Kraft (Anteil 0..1), ab der ein Sprung ausgelöst wird; darunter gilt das Loslassen als Abbruch */
export const MIN_POWER = 0.04;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Halbe Breite des Trefferfeldes in % der Bühnenbreite: 9 → 3 */
export function tolerancePct(level: number): number {
  return 9 - (6 / (MAX_LEVEL - MIN_LEVEL)) * (levelOf(level) - MIN_LEVEL);
}

/** Sichtbarkeit der Hilfsmarke an der Kraftleiste (1 = voll, 0 = aus): ab Stufe 8 weg */
export function guideAlphaFor(level: number): number {
  return clamp(1 - (levelOf(level) - 1) / 7, 0, 1);
}

/** Bereich der Sprungweiten als Anteil der Bühnenbreite */
export function distanceRange(level: number): { min: number; max: number } {
  const k = (levelOf(level) - MIN_LEVEL) / (MAX_LEVEL - MIN_LEVEL);
  return { min: 0.22 - 0.1 * k, max: 0.42 + 0.26 * k };
}

/** Schwerkraft in px/s² (wächst mit der Bühnengröße, damit Flugdauer und Bogen auf jedem Gerät ähnlich sind) */
export function gravityFor(u: number): number {
  return 62 * Math.max(u, 4);
}

export interface Pt {
  x: number;
  y: number;
}

export interface Jump {
  x0: number;
  y0: number;
  /** +1 = nach rechts, −1 = nach links */
  dir: 1 | -1;
  /** Sprungweite in px (Betrag) */
  dist: number;
  /** Flugdauer in s */
  T: number;
  /** Scheitelhöhe in px über y0 */
  H: number;
  vx: number;
  vy: number;
  g: number;
}

export function makeJump(x0: number, y0: number, dir: 1 | -1, dist: number, g: number, angleDeg = LAUNCH_DEG): Jump {
  const th = (angleDeg * Math.PI) / 180;
  const d = Math.max(0, dist);
  const v = Math.sqrt((d * g) / Math.sin(2 * th));
  const vy = v * Math.sin(th);
  return { x0, y0, dir, dist: d, T: (2 * vy) / g, H: (vy * vy) / (2 * g), vx: dir * v * Math.cos(th), vy, g };
}

/** Kugelmitte s Sekunden nach dem Absprung (s wird auf [0, T] begrenzt: danach liegt sie am Landepunkt) */
export function jumpPos(j: Jump, s: number): Pt {
  const q = clamp(s, 0, j.T);
  return { x: j.x0 + j.vx * q, y: j.y0 - j.vy * q + 0.5 * j.g * q * q };
}

export function landingX(j: Jump): number {
  return j.x0 + j.dir * j.dist;
}

/** Kraft 0..1 aus der Zuglänge (px) an der Leiste der Länge barLen */
export function pullToPower(pullPx: number, barLen: number): number {
  return clamp(pullPx / Math.max(1, barLen), 0, 1);
}

/** Sprungweite in px aus der Kraft 0..1 */
export function powerToDist(power: number, stageW: number): number {
  return clamp(power, 0, 1) * MAX_DIST_FRAC * stageW;
}

/** Kraft 0..1, die für die Weite `dist` nötig ist */
export function powerForDist(dist: number, stageW: number): number {
  return clamp(dist / (MAX_DIST_FRAC * Math.max(1, stageW)), 0, 1);
}

/** Fehler in % der Bühnenbreite mit Vorzeichen: positiv = zu weit, negativ = zu kurz (in Sprungrichtung gemessen) */
export function signedErrorPct(landX: number, targetX: number, dir: 1 | -1, stageW: number): number {
  return (100 * (landX - targetX) * dir) / Math.max(1, stageW);
}

export function isHit(absErrPct: number, level: number): boolean {
  return absErrPct <= tolerancePct(level) + 1e-9;
}

/** Punkte je Sprung: Treffer 10 + 2 je Stufe über 1, dazu bis 5 für besonders genaue */
export function pointsFor(absErrPct: number, level: number): number {
  if (!isHit(absErrPct, level)) return 0;
  const tol = tolerancePct(level);
  return 10 + 2 * (Math.floor(levelOf(level) + 1e-9) - 1) + Math.round(5 * (1 - absErrPct / tol));
}

export interface Trial {
  dir: 1 | -1;
  /** Absprungort (x der Kugelmitte) */
  x0: number;
  /** Mitte des Trefferfeldes (x) */
  targetX: number;
  /** Sollweite in px */
  dist: number;
}

export interface TrialParams {
  w: number;
  /** seitlicher Rand für Absprung und Ziel */
  margin: number;
  level: number;
  /** feste Werte (Intro-Film) */
  fixed?: { dir: 1 | -1; x0: number; distFrac: number };
  /** Richtung des vorigen Sprungs (die nächste wechselt mit 65 % Wahrscheinlichkeit) */
  prevDir?: 1 | -1;
}

export function makeTrial(p: TrialParams, rng: Rng): Trial {
  const L = levelOf(p.level);
  const free = Math.max(1, p.w - 2 * p.margin);
  if (p.fixed) {
    const dist = Math.min(free, p.fixed.distFrac * p.w);
    const lo = p.fixed.dir === 1 ? p.margin : p.margin + dist;
    const hi = p.fixed.dir === 1 ? p.w - p.margin - dist : p.w - p.margin;
    const x0 = clamp(p.fixed.x0, lo, Math.max(lo, hi));
    return { dir: p.fixed.dir, x0, targetX: x0 + p.fixed.dir * dist, dist };
  }
  const { min, max } = distanceRange(L);
  const dist = Math.min(free, rng.range(min, max) * p.w);
  const dir: 1 | -1 = p.prevDir === undefined ? (rng.chance(0.5) ? 1 : -1) : rng.chance(0.65) ? (p.prevDir === 1 ? -1 : 1) : p.prevDir;
  const lo = dir === 1 ? p.margin : p.margin + dist;
  const hi = dir === 1 ? p.w - p.margin - dist : p.w - p.margin;
  const x0 = lo + Math.max(0, hi - lo) * rng.next();
  return { dir, x0, targetX: x0 + dir * dist, dist };
}

export function mean(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Kraft mit Streuung (Autoplay): σ als Anteil der vollen Kraft */
export function noisyPower(power: number, sigma: number, rng: Rng): number {
  return clamp(power + rng.normal() * sigma, MIN_POWER + 0.01, 1);
}
