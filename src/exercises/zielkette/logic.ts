/**
 * Zielkette – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * Eine Kette besteht aus 4–8 ruhenden Kreisen. Es gibt keine sichtbare Nummerierung der ganzen Kette:
 * nur das nächste Ziel ist markiert (Pfeil vom zuletzt getippten Kreis und Nummer auf dem nächsten).
 * Jede Runde hat eine neue Anordnung und Reihenfolge, damit man sich keine Folge merken kann. Die Stufe
 * regelt Kettenlänge, Zielgröße und Abstand; je Kette gibt es eine großzügige Zeitmarke.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 15;
/** Ketten je Sitzung (feste Zahl, keine Zeitgutschrift) */
export const CHAINS = 10;
export const QUICK_CHAINS = 3;
/** Eine Kette gilt als gelungen mit höchstens so vielen Fehltipps */
export const MAX_WRONG_OK = 1;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Ziele je Kette: Stufe 1–3 → 4, 4–6 → 5, 7–9 → 6, 10–12 → 7, ab 13 → 8 */
export function lengthFor(level: number): number {
  return clamp(4 + Math.floor((levelOf(level) - 1) / 3), 4, 8);
}

/** Sichtbarer Radius in u (1 % der kürzeren Bühnenseite): 6,2 → 3,6 */
export function radiusU(level: number): number {
  return clamp(6.2 - 0.19 * (levelOf(level) - 1), 3.6, 6.2);
}

/** Sichtbarer Radius in px, nie unter 20 px */
export const radiusPx = (level: number, u: number): number => Math.max(20, radiusU(level) * u);

/** Trefferfläche: größer als das sichtbare Ziel, nie unter 28 px */
export const hitRadiusPx = (r: number): number => Math.max(r + 8, 28);

/** Mindestabstand zwischen aufeinanderfolgenden Zielen in u: 14 → 35 */
export function minStepU(level: number): number {
  return 14 + 1.5 * (levelOf(level) - 1);
}

/** Zeit je Ziel in ms, mit der das Zeitlimit gerechnet wird: 1,7 s → 0,72 s */
export function perTargetMs(level: number): number {
  return Math.max(700, Math.round(1700 - 70 * (levelOf(level) - 1)));
}

/** Zeitmarke je Kette in ms (Länge × Zeit je Ziel + 1,2 s Anlauf für das erste Ziel) */
export function chainLimitMs(level: number): number {
  return lengthFor(level) * perTargetMs(level) + 1200;
}

/** Pause zwischen zwei Ketten in ms */
export function chainGapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(600, 950);
}

export interface Pt {
  x: number;
  y: number;
}

/**
 * Orte einer Kette in Feldpixeln (0..fw, 0..fh), in der Reihenfolge des Antippens.
 *
 * - Abstand zum Rand mindestens `margin`.
 * - Jedes Paar mindestens `anyGap` auseinander (keine Überdeckung).
 * - Aufeinanderfolgende Ziele mindestens `stepMin` auseinander (sonst wäre die Kette kein Wechsel).
 * - Das erste Ziel liegt – falls angegeben – mindestens `avoidDist` vom zuletzt getippten Punkt entfernt
 *   (dort liegt noch der Finger).
 * Findet sich nach `tries` Versuchen kein passender Ort, gewinnt der Kandidat mit dem besten Abstandswert.
 */
export function buildChain(
  rng: Pick<Rng, 'range'>,
  fw: number,
  fh: number,
  k: number,
  margin: number,
  anyGap: number,
  stepMin: number,
  avoid: Pt | null,
  avoidDist: number,
  tries = 60,
): Pt[] {
  const x0 = Math.min(margin, fw / 2);
  const x1 = Math.max(fw - margin, fw / 2);
  const y0 = Math.min(margin, fh / 2);
  const y1 = Math.max(fh - margin, fh / 2);
  const pts: Pt[] = [];
  for (let i = 0; i < k; i++) {
    let best: Pt = { x: fw / 2, y: fh / 2 };
    let bestScore = -Infinity;
    for (let n = 0; n < tries; n++) {
      const c = { x: rng.range(x0, x1), y: rng.range(y0, y1) };
      let dAny = Infinity;
      for (const p of pts) dAny = Math.min(dAny, Math.hypot(c.x - p.x, c.y - p.y));
      const prev = pts[i - 1];
      const dStep = prev ? Math.hypot(c.x - prev.x, c.y - prev.y) : Infinity;
      const dAvoid = i === 0 && avoid ? Math.hypot(c.x - avoid.x, c.y - avoid.y) : Infinity;
      const score = Math.min(dAny / Math.max(1, anyGap), dStep / Math.max(1, stepMin), dAvoid / Math.max(1, avoidDist));
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
      if (score >= 1) break;
    }
    pts.push(best);
  }
  return pts;
}

/** Nur das nächste Ziel ist zu tippen: Index des nächsten Ziels nach `done` getippten, −1 wenn fertig */
export const nextIndex = (done: number, length: number): number => (done >= 0 && done < length ? done : -1);

/** Gelungen: vollständig, rechtzeitig und mit höchstens MAX_WRONG_OK Fehltipps */
export function chainSuccess(completed: boolean, timedOut: boolean, wrong: number): boolean {
  return completed && !timedOut && wrong <= MAX_WRONG_OK;
}

/** Punkte je vollständiger Kette: Grundwert nach Länge und Stufe, +5 ohne Fehltipp */
export function pointsFor(level: number, length: number, wrong: number): number {
  return 4 * length + 2 * (levelOf(level) - 1) + (wrong === 0 ? 5 : 0);
}

export interface Stats {
  chains: number;
  timedOut: number;
  wrong: number;
  /** Median der Zeit je vollständiger Kette in ms (NaN ohne Kette) */
  medianMs: number;
}

export function computeStats(times: readonly number[], timedOut: number, wrong: number): Stats {
  return { chains: times.length, timedOut, wrong, medianMs: times.length ? median(times) : NaN };
}

/** Schlüssel in texts.tips: wrong | late | great */
export function tipFor(s: Stats): string {
  if (s.timedOut >= 3 && s.timedOut >= s.wrong) return 'late';
  if (s.wrong >= 5) return 'wrong';
  return 'great';
}
