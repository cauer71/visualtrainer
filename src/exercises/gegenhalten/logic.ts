/**
 * Gegenhalten – reine Logik (Bewegungsregel für den Kern `_shared/nachfuehren.ts`).
 *
 * Die Zielmarke steht still. Die Zeiger-Marke wird von selbst nach oben gezogen: gleichmäßiger Zug (Drift) über mehrere
 * Sekunden, dann gleitet sie sanft zurück, danach beginnt der nächste Zug – mit kleiner Schwankung obendrauf. Der Finger
 * gleicht aus (er geht mit dem Zug nach unten und beim Zurückgleiten wieder nach oben), damit die Marke im Band bleibt.
 * Nur die Fingerhöhe zählt (Achse 'y'). Alles in u (1 u = 1 % der kürzeren Bühnenseite) und Sekunden (dt-basiert).
 *
 * Stufe: Zughöhe 7 → ≈ 16 u, Zugdauer 3,4 → ≈ 2 s (also Tempo ≈ 2 → 8 u/s), Schwankung 0,4 → ≈ 2 u.
 * Jeder Zug hat eine leicht andere Höhe und Dauer (gleichmäßig, aber nicht auswendig lernbar).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { MAX_LEVEL, MIN_LEVEL, type RuleSetup, smoothstep, trapezoid, type TrackRule, type Vec, Wobble } from '../_shared/nachfuehren-logic';

/** Dauer des sanften Zurückgleitens nach einem Zug (s) */
export const RETURN_S = 1.6;

export interface DriftParams {
  /** Zughöhe (u) */
  height: number;
  /** Dauer des Zuges (s) */
  pullS: number;
  /** mittleres Zugtempo (u/s) */
  speed: number;
  /** Höhe der Schwankung (u) */
  wobble: number;
}

export function driftFor(level: number): DriftParams {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  const height = 7 + 0.8 * (lv - 1);
  const pullS = 3.4 - 0.13 * (lv - 1);
  return { height, pullS, speed: height / pullS, wobble: 0.4 + 0.15 * (lv - 1) };
}

interface Cycle {
  t0: number;
  pull: number;
  height: number;
}

/**
 * Regel: Zielmarke in der Mitte (y = 0), Störung `disturbance(s).y` ≤ 0 (nach oben), nur senkrecht.
 * `maxHeight` begrenzt die Zughöhe auf den Platz der Bühne (Standard: 0,7 × halbe Feldhöhe).
 */
export class DriftRule implements TrackRule {
  readonly params: DriftParams;
  private readonly cycles: Cycle[] = [];
  private readonly wob: Wobble;
  private readonly wobAmp: number;

  constructor(rng: Rng, level: number, hh: number, seconds: number) {
    const p = driftFor(level);
    const cap = Math.max(3, hh * 0.6);
    const scale = Math.min(1, cap / (p.height * 1.15 + p.wobble));
    this.params = { height: p.height * scale, pullS: p.pullS, speed: (p.height * scale) / p.pullS, wobble: p.wobble * scale };
    this.wobAmp = this.params.wobble;
    this.wob = new Wobble(rng, 3, 1.3, 3.2);
    let t = 0;
    while (t < seconds + 10) {
      const pull = this.params.pullS * rng.range(0.9, 1.1);
      const height = this.params.height * rng.range(0.85, 1.15);
      this.cycles.push({ t0: t, pull, height });
      t += pull + RETURN_S;
    }
  }

  target(): Vec {
    return { x: 0, y: 0 };
  }

  /** Zug in u (≥ 0, nach oben) ohne Schwankung */
  pull(s: number): number {
    if (s <= 0) return 0;
    let c = this.cycles[this.cycles.length - 1];
    for (const cy of this.cycles) {
      if (s < cy.t0 + cy.pull + RETURN_S) {
        c = cy;
        break;
      }
    }
    const k = s - c.t0;
    if (k <= c.pull) return c.height * trapezoid(k / c.pull, 0.2) * smoothstep(s / 0.6);
    return c.height * (1 - trapezoid((k - c.pull) / RETURN_S, 0.5));
  }

  disturbance(s: number): Vec {
    const wob = this.wobAmp * this.wob.at(s) * smoothstep(s / 1.5);
    return { x: 0, y: -this.pull(s) + wob };
  }

  /** Pfeil neben der Marke: Zug nach oben / Zurückgleiten nach unten */
  hint(s: number): Vec {
    const v = (this.pull(s + 0.05) - this.pull(s - 0.05)) / 0.1;
    return { x: 0, y: v > 0.6 ? -1 : v < -0.6 ? 1 : 0 };
  }
}

export function makeRule(setup: RuleSetup): TrackRule {
  return new DriftRule(setup.rng, setup.level, setup.hh, setup.seconds);
}
