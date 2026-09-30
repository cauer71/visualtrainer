/**
 * Zielauswahl – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Mehrere ruhende Ziele mit unterschiedlicher Dringlichkeit liegen gleichzeitig auf der Bühne:
 * hoch (Dreieck, voll), mittel (Kreis, gestreift), niedrig (Quadrat, gepunktet). Man tippt sie in der
 * Reihenfolge hoch → mittel → niedrig an (innerhalb einer Dringlichkeit beliebig). Eine falsche
 * Reihenfolge ist ein Fehler. Die Stufe regelt Zahl, Größe und Zeit.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** 0 = hoch, 1 = mittel, 2 = niedrig */
export const TIERS = 3;
export type Tier = 0 | 1 | 2;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Anzahl der Ziele je Runde: 3 (Stufe 1–2) bis 8 (Stufe 11–12) */
export function countFor(level: number): number {
  return 3 + Math.floor((levelOf(level) - 1) / 2);
}

/** Zeit je Ziel in ms: 1,7 s auf Stufe 1, ≈ 0,9 s auf Stufe 12 */
export function perTargetMs(level: number): number {
  return Math.round(1700 - 75 * (levelOf(level) - 1));
}

/** Zeit für eine Runde: feste Orientierungszeit + Zeit je Ziel × Anzahl */
export const ORIENT_MS = 2000;
export function roundMs(level: number): number {
  return ORIENT_MS + countFor(level) * perTargetMs(level);
}

/** Sichtbarer Radius in u (1 % der kürzeren Seite): 6,2 → 4,0 */
export function radiusU(level: number): number {
  return clamp(6.2 - 0.2 * (levelOf(level) - 1), 4, 6.2);
}

/** Sichtbarer Radius in px; nie unter 26 px */
export const radiusPx = (level: number, u: number): number => Math.max(26, radiusU(level) * u);

/** Trefferradius in px: etwas größer als das sichtbare Ziel, nie unter 28 px (Touch-Ziel ≥ 24 px) */
export const hitRadiusPx = (r: number): number => Math.max(r * 1.15, 28);

/**
 * Dringlichkeiten einer Runde: jede der drei kommt mindestens einmal vor, keine stellt allein mehr als
 * n − 2 Ziele. Die Reihenfolge ist gemischt.
 */
export function buildTiers(rng: Pick<Rng, 'int' | 'shuffle'>, n: number): Tier[] {
  const cnt = Math.max(TIERS, Math.floor(n));
  const counts = [1, 1, 1];
  const cap = Math.max(1, cnt - 2);
  for (let i = TIERS; i < cnt; i++) {
    const open = [0, 1, 2].filter((k) => counts[k] < cap);
    const pool = open.length ? open : [0, 1, 2];
    counts[pool[rng.int(pool.length)]]++;
  }
  const out: Tier[] = [];
  counts.forEach((c, tier) => {
    for (let i = 0; i < c; i++) out.push(tier as Tier);
  });
  return rng.shuffle(out);
}

/** Verbleibende Ziele je Dringlichkeit */
export function remainingByTier(tiers: readonly Tier[], done: readonly boolean[]): number[] {
  const rem = [0, 0, 0];
  tiers.forEach((t, i) => {
    if (!done[i]) rem[t]++;
  });
  return rem;
}

/** Dringlichkeit, die jetzt dran ist (höchste mit noch offenen Zielen), −1 wenn alles erledigt */
export function currentTier(rem: readonly number[]): number {
  for (let t = 0; t < TIERS; t++) if (rem[t] > 0) return t;
  return -1;
}

/** Ein Tipp auf ein Ziel dieser Dringlichkeit ist richtig, wenn keine höhere mehr offen ist */
export function isCorrectTap(tier: number, rem: readonly number[]): boolean {
  return tier === currentTier(rem);
}

export interface Norm {
  nx: number;
  ny: number;
}

/**
 * Orte in normierten Feldkoordinaten (0..1) für `count` Ziele: mit Randabstand r · 1,4 und möglichst
 * mit Mindestabstand minDist zueinander. Findet sich bei einem Ziel kein Platz, gewinnt der Kandidat
 * mit dem größten Abstand.
 */
export function pickSpots(rng: Pick<Rng, 'range'>, fw: number, fh: number, r: number, count: number, tries = 60): Norm[] {
  const m = r * 1.4;
  const x0 = Math.min(m, fw / 2);
  const x1 = Math.max(fw - m, fw / 2);
  const y0 = Math.min(m, fh / 2);
  const y1 = Math.max(fh - m, fh / 2);
  const minDist = r * 2.9;
  const pts: Array<{ x: number; y: number }> = [];
  for (let k = 0; k < count; k++) {
    let best = { x: fw / 2, y: fh / 2 };
    let bestD = -1;
    for (let i = 0; i < tries; i++) {
      const x = rng.range(x0, x1);
      const y = rng.range(y0, y1);
      let d = Infinity;
      for (const p of pts) d = Math.min(d, Math.hypot(x - p.x, y - p.y));
      if (d > bestD) {
        bestD = d;
        best = { x, y };
      }
      if (d >= minDist) break;
    }
    pts.push(best);
  }
  return pts.map((p) => ({ nx: fw > 0 ? p.x / fw : 0.5, ny: fh > 0 ? p.y / fh : 0.5 }));
}

/** Punkte je richtigem Tipp: Grundwert steigt mit der Stufe */
export function pointsFor(level: number): number {
  return 10 + 2 * (levelOf(level) - 1);
}

export interface Stats {
  correctTaps: number;
  wrongOrder: number;
  missed: number;
  roundsOk: number;
  rounds: number;
  /** Anteil der Tipps in richtiger Reihenfolge in % (100 ohne Tipps) */
  orderPct: number;
  /** Median der Zeit je Ziel in ms (NaN bei weniger als 2 Werten) */
  medianMs: number;
}

export function computeStats(
  correctTaps: number,
  wrongOrder: number,
  missed: number,
  roundsOk: number,
  rounds: number,
  intervals: readonly number[],
): Stats {
  const taps = correctTaps + wrongOrder;
  return {
    correctTaps,
    wrongOrder,
    missed,
    roundsOk,
    rounds,
    orderPct: taps ? (100 * correctTaps) / taps : 100,
    medianMs: intervals.length >= 2 ? median(intervals) : NaN,
  };
}

/** Schlüssel in texts.tips: order | slow | great */
export function tipFor(s: Stats): string {
  if (s.wrongOrder >= 3 && s.wrongOrder >= s.missed) return 'order';
  if (s.missed >= 3) return 'slow';
  return 'great';
}
