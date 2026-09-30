/**
 * Gegen den Wind – reine Logik (Bewegungsregel für den Kern `_shared/nachfuehren.ts`).
 *
 * Das Ziel (Kreuz mit Ring) steht ruhig in der Feldmitte. Ein unsichtbarer „Wind“ schiebt die Zeiger-Marke: eine weiche,
 * langsam wechselnde Verschiebung in beide Richtungen (Achse 'xy'), die der Finger ausgleichen muss, damit die Marke im
 * Ring bleibt. Die Verschiebung ist nie sichtbar, nur ihr Ergebnis (die Marke wandert). Sie beginnt bei 0 und wächst
 * in 2 s ein. Alles in u und Sekunden (dt-basiert, bildratenunabhängig).
 *
 * Stufe: Windstärke (größte Verschiebung) ≈ 5 → ≈ 12 u, Wechsel schneller: Perioden 4,5–9 s (Stufe 1) → 2,3–4,6 s.
 * Jeder Durchgang hat einen anderen Windverlauf (zufällige Phasen, im Film fest).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { MAX_LEVEL, MIN_LEVEL, type RuleSetup, smoothstep, type TrackRule, type Vec, Wobble } from '../_shared/nachfuehren-logic';

/** Windstärke: größte mögliche Verschiebung (u) */
export function strengthFor(level: number): number {
  return 5 + 0.6 * (clamp(level, MIN_LEVEL, MAX_LEVEL) - 1);
}

/** Kürzeste und längste Periode der Windwellen (s) */
export function periodsFor(level: number): { min: number; max: number } {
  const l = clamp(level, MIN_LEVEL, MAX_LEVEL) - 1;
  return { min: 4.5 - 0.2 * l, max: 9 - 0.4 * l };
}

export class WindRule implements TrackRule {
  readonly amp: number;
  private readonly wx: Wobble;
  private readonly wy: Wobble;

  constructor(rng: Rng, level: number, hw: number, hh: number) {
    // nicht größer als der Platz: die Marke soll auch ohne Gegenhalten im Feld bleiben
    this.amp = Math.min(strengthFor(level), 0.75 * Math.min(hw, hh));
    const p = periodsFor(level);
    this.wx = new Wobble(rng, 3, p.min, p.max);
    this.wy = new Wobble(rng, 3, p.min, p.max);
  }

  target(): Vec {
    return { x: 0, y: 0 };
  }

  disturbance(s: number): Vec {
    const k = smoothstep(s / 2);
    return { x: this.amp * this.wx.at(s) * k, y: this.amp * this.wy.at(s) * k };
  }
}

export function makeRule(setup: RuleSetup): TrackRule {
  return new WindRule(setup.rng, setup.level, setup.hw, setup.hh);
}
