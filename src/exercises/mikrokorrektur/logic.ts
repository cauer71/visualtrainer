/**
 * Mikrokorrektur – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Ein großes Ankerziel wird angetippt; sofort erscheint in der Nähe (unvorhersehbare Richtung) ein
 * kleines Nachziel, das nur kurz sichtbar bleibt und ebenfalls angetippt wird. Die Stufe regelt Größe
 * des Nachziels, Abstand und Sichtzeit. Trefferfläche = sichtbares Ziel (mindestens 24 px Radius).
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Kleinster sichtbarer (und zugleich treffbarer) Radius des Nachziels in px */
export const MIN_FOLLOW_R = 24;
/** Tipps so kurz nach dem Ankertipp sind Doppeltipps, keine Antwort auf das Nachziel */
export const DOUBLE_TAP_MS = 180;
/** Wartet der Anker länger, zählt die Runde als verpasst */
export const ANCHOR_TIMEOUT_MS = 6000;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Radius des Nachziels in u (1 % der kürzeren Seite): 4,6 → 2,4 */
export function followRadiusU(level: number): number {
  return clamp(4.6 - 0.2 * (levelOf(level) - 1), 2.4, 4.6);
}

/** Radius des Nachziels in px; nie unter 24 px – Trefferfläche = sichtbares Ziel */
export const followRadiusPx = (level: number, u: number): number => Math.max(MIN_FOLLOW_R, followRadiusU(level) * u);

/** Radius des Ankerziels in px (groß: 6 u, nie unter 34 px) */
export const anchorRadiusPx = (u: number): number => Math.max(34, 6 * u);

/** Abstand Nachziel – Mitte des Ankers in u: 11 → 15 */
export function distanceU(level: number): number {
  return 11 + (4 * (levelOf(level) - 1)) / (MAX_LEVEL - 1);
}

/** Sichtzeit des Nachziels in ms: 2,2 s auf Stufe 1, 0,88 s auf Stufe 12 */
export function visibleMs(level: number): number {
  return Math.round(2200 - 120 * (levelOf(level) - 1));
}

export interface Bounds {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface Pt {
  x: number;
  y: number;
}

/** Liegt ein Kreis mit Radius r vollständig (mit 4 px Rand) im Feld? */
export function fits(p: Pt, r: number, b: Bounds): boolean {
  const m = r + 4;
  return p.x >= b.x0 + m && p.x <= b.x1 - m && p.y >= b.y0 + m && p.y <= b.y1 - m;
}

/**
 * Ort des Nachziels: Richtung gleichverteilt zufällig (unvorhersehbar), Abstand `dist` (mindestens so,
 * dass Anker und Nachziel sich nicht überdecken), ganz im Feld. Findet sich keine freie Richtung,
 * zeigt die Richtung zur Feldmitte; im Notfall wird der Punkt ins Feld geschoben.
 */
export function pickFollow(rng: Pick<Rng, 'range'>, anchor: Pt, dist: number, r: number, anchorR: number, b: Bounds): Pt & { angle: number } {
  const d = Math.max(dist, anchorR + r + 8);
  for (let i = 0; i < 40; i++) {
    const a = rng.range(-Math.PI, Math.PI);
    const p = { x: anchor.x + Math.cos(a) * d, y: anchor.y + Math.sin(a) * d };
    if (fits(p, r, b)) return { ...p, angle: a };
  }
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  const a0 = Math.atan2(cy - anchor.y, cx - anchor.x);
  for (const off of [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1.2]) {
    const a = a0 + off;
    const p = { x: anchor.x + Math.cos(a) * d, y: anchor.y + Math.sin(a) * d };
    if (fits(p, r, b)) return { ...p, angle: a };
  }
  const m = r + 4;
  return {
    x: clamp(anchor.x + Math.cos(a0) * d, b.x0 + m, Math.max(b.x0 + m, b.x1 - m)),
    y: clamp(anchor.y + Math.sin(a0) * d, b.y0 + m, Math.max(b.y0 + m, b.y1 - m)),
    angle: a0,
  };
}

/**
 * Ort des Ankers: ganz im Feld, möglichst mindestens `minDist` vom letzten Nachziel entfernt,
 * damit jede Runde eine echte Bewegung zum neuen Anker verlangt.
 */
export function pickAnchor(rng: Pick<Rng, 'range'>, b: Bounds, r: number, prev: Pt | null, minDist: number): Pt {
  const m = r + 8;
  const x0 = Math.min(b.x0 + m, (b.x0 + b.x1) / 2);
  const x1 = Math.max(b.x1 - m, (b.x0 + b.x1) / 2);
  const y0 = Math.min(b.y0 + m, (b.y0 + b.y1) / 2);
  const y1 = Math.max(b.y1 - m, (b.y0 + b.y1) / 2);
  let best = { x: (x0 + x1) / 2, y: (y0 + y1) / 2 };
  let bestD = -1;
  for (let i = 0; i < 30; i++) {
    const p = { x: rng.range(x0, x1), y: rng.range(y0, y1) };
    const d = prev ? Math.hypot(p.x - prev.x, p.y - prev.y) : Infinity;
    if (d > bestD) {
      bestD = d;
      best = p;
    }
    if (d >= minDist) break;
  }
  return best;
}

/** Abstand des Tipps von der Mitte des Nachziels in % des Radius (0 = genau getroffen, 100 = am Rand) */
export function offsetPct(tap: Pt, center: Pt, r: number): number {
  return r > 0 ? (100 * Math.hypot(tap.x - center.x, tap.y - center.y)) / r : 0;
}

/** Punkte je Treffer: Grundwert steigt mit der Stufe, Bonus für Nähe zur Mitte */
export function pointsFor(level: number, offset: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(clamp(1 - offset / 100, 0, 1) * 10);
}

export interface Stats {
  hits: number;
  misses: number;
  late: number;
  rounds: number;
  /** Trefferquote des Nachziels in % aller Runden */
  hitRate: number;
  /** Median Anker-Tipp → Nachziel-Treffer in ms (NaN ohne Treffer) */
  medianMs: number;
  /** Median Abstand zur Mitte in % des Radius (NaN ohne Treffer) */
  medianOffset: number;
}

export function computeStats(hits: number, misses: number, late: number, times: readonly number[], offsets: readonly number[]): Stats {
  const rounds = hits + misses + late;
  return {
    hits,
    misses,
    late,
    rounds,
    hitRate: rounds ? (100 * hits) / rounds : 0,
    medianMs: times.length ? median(times) : NaN,
    medianOffset: offsets.length ? median(offsets) : NaN,
  };
}

/** Schlüssel in texts.tips: miss | slow | great */
export function tipFor(s: Stats): string {
  if (s.misses >= 3 && s.misses >= s.late) return 'miss';
  if (s.late >= 3) return 'slow';
  return 'great';
}
