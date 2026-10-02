// EYE-EXPERIMENT: Zähler und Ablauf des Viertel-Tests sowie Messung der Übergangszeit – rein, ohne DOM.
import { mean, median, std } from './accuracy';
import { QUADRANTS } from './quadrants';
import type { Pt, Quadrant } from './types';

/**
 * Reihenfolge der Aufforderungen: `total` Stück, möglichst gleich oft je Ecke, gemischt, nie dieselbe Ecke zweimal hintereinander.
 * `rnd` liefert Zahlen in [0,1) (z. B. createRng().next).
 */
export function makeSequence(total: number, rnd: () => number): Quadrant[] {
  const bag: Quadrant[] = [];
  for (let i = 0; i < total; i++) bag.push(QUADRANTS[i % QUADRANTS.length]);
  const out: Quadrant[] = [];
  const left = [...bag];
  while (left.length) {
    const prev = out[out.length - 1];
    const ok = left.map((q, i) => (q !== prev ? i : -1)).filter((i) => i >= 0);
    if (!ok.length) {
      // nur noch die vorige Ecke übrig: weiter vorn einfügen, wo links und rechts davon etwas anderes steht
      const q = left.pop() as Quadrant;
      let placed = false;
      for (let i = 1; i < out.length && !placed; i++) {
        if (out[i - 1] !== q && out[i] !== q) {
          out.splice(i, 0, q);
          placed = true;
        }
      }
      if (!placed) out.push(q);
      continue;
    }
    const pick = ok[Math.min(ok.length - 1, Math.floor(rnd() * ok.length))];
    out.push(left.splice(pick, 1)[0]);
  }
  return out;
}

/** Am häufigsten vorkommendes Viertel in einer Folge (null-Werte zählen nicht); null, wenn keines vorkommt. */
export function dominantQuadrant(qs: readonly (Quadrant | null)[]): Quadrant | null {
  const c: Record<Quadrant, number> = { tl: 0, tr: 0, bl: 0, br: 0 };
  for (const q of qs) if (q) c[q]++;
  let best: Quadrant | null = null;
  for (const q of QUADRANTS) if (c[q] > 0 && (best === null || c[q] > c[best])) best = q;
  return best;
}

export interface PromptOutcome {
  target: Quadrant;
  hit: boolean;
  /** Zeit von der Aufforderung bis der Blick im Viertel ankam (ms), nur bei Treffer */
  arrivalMs: number | null;
  /** das Viertel, in dem der Blick im Fenster der Aufforderung am häufigsten lag */
  dominant: Quadrant | null;
}

export interface CornerSummary {
  n: number;
  hits: number;
  /** Trefferquote 0..1 (NaN, wenn n = 0) */
  rate: number;
  meanArrivalMs: number | null;
  medianArrivalMs: number | null;
}

export interface QuarterSummary {
  total: CornerSummary;
  perCorner: Record<Quadrant, CornerSummary>;
  /** Wie oft lag der Blick bei Aufforderung A hauptsächlich in Viertel B (oder in keinem = 'none') */
  confusion: Record<Quadrant, Record<Quadrant | 'none', number>>;
}

function cornerSummary(os: readonly PromptOutcome[]): CornerSummary {
  const hits = os.filter((o) => o.hit);
  const arr = hits.map((o) => o.arrivalMs).filter((v): v is number => v !== null);
  return {
    n: os.length,
    hits: hits.length,
    rate: os.length ? hits.length / os.length : NaN,
    meanArrivalMs: arr.length ? mean(arr) : null,
    medianArrivalMs: arr.length ? median(arr) : null,
  };
}

export class QuadrantTestCounter {
  readonly outcomes: PromptOutcome[] = [];

  add(o: PromptOutcome): void {
    this.outcomes.push(o);
  }

  summary(): QuarterSummary {
    const perCorner = {} as Record<Quadrant, CornerSummary>;
    const confusion = {} as QuarterSummary['confusion'];
    for (const q of QUADRANTS) {
      const mine = this.outcomes.filter((o) => o.target === q);
      perCorner[q] = cornerSummary(mine);
      confusion[q] = { tl: 0, tr: 0, bl: 0, br: 0, none: 0 };
      for (const o of mine) confusion[q][o.dominant ?? 'none']++;
    }
    return { total: cornerSummary(this.outcomes), perCorner, confusion };
  }
}

// ---------- Zeitverhalten (Wechsel zwischen zwei Ecken) ----------

export interface TimedPoint {
  t: number;
  x: number;
  y: number;
}

/**
 * Übergangszeit der Schätzung: Dauer, in der die Projektion des Blickpunkts auf die Strecke from→to von `lo` (Standard 10 %)
 * auf `hi` (90 %) ansteigt. Start = letzter Zeitpunkt unter `lo` vor dem ersten Erreichen von `hi`. Zeiten linear interpoliert.
 * Das ist eine Eigenschaft der Schätzung (Bildrate, Glättung), keine Reaktionszeit der Person.
 * Gibt null zurück, wenn der Wechsel nicht vollständig in den Daten liegt.
 */
export function transitionTime(samples: readonly TimedPoint[], from: Pt, to: Pt, lo = 0.1, hi = 0.9): { startT: number; endT: number; durationMs: number } | null {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len2 = dx * dx + dy * dy;
  if (!(len2 > 0) || samples.length < 2) return null;
  const s = samples.map((p) => ((p.x - from.x) * dx + (p.y - from.y) * dy) / len2);
  let iHi = -1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= hi) {
      iHi = i;
      break;
    }
  }
  if (iHi <= 0) return null;
  let iLo = -1;
  for (let i = iHi; i >= 0; i--) {
    if (s[i] < lo) {
      iLo = i;
      break;
    }
  }
  if (iLo < 0) return null;
  const cross = (i: number, level: number) => {
    // Zeitpunkt, an dem die Kurve zwischen Index i und i+1 den Pegel `level` überschreitet
    const a = s[i];
    const b = s[i + 1];
    const f = b === a ? 0 : (level - a) / (b - a);
    return samples[i].t + (samples[i + 1].t - samples[i].t) * Math.min(1, Math.max(0, f));
  };
  // erster Anstieg über lo nach iLo
  const startT = cross(iLo, lo);
  // Übergang über hi: zwischen iHi-1 und iHi
  const endT = cross(iHi - 1, hi);
  return { startT, endT, durationMs: Math.max(0, endT - startT) };
}

export interface SpreadStats {
  n: number;
  mean: number | null;
  sd: number | null;
  median: number | null;
  min: number | null;
  max: number | null;
}

export function spreadStats(xs: readonly number[]): SpreadStats {
  if (!xs.length) return { n: 0, mean: null, sd: null, median: null, min: null, max: null };
  return { n: xs.length, mean: mean(xs), sd: std(xs), median: median(xs), min: Math.min(...xs), max: Math.max(...xs) };
}
