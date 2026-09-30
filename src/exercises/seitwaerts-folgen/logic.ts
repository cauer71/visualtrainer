/**
 * Seitwärts folgen – reine Logik (Bewegungsregel für den Kern `_shared/nachfuehren.ts`).
 *
 * Das Ziel läuft auf einer waagerechten Schiene hin und her. Es wendet in unregelmäßigen, aber vorhersehbaren Abständen:
 * Die Laufzeiten der Strecken folgen einem kurzen Wechselrhythmus (kurz – lang – lang – kurz), der sich wiederholt; jedes
 * Wenden geschieht weich (Bremsen und wieder Anlaufen, ≈ 0,45 s), nie mit einem Ruck. Die Marke folgt der waagerechten
 * Fingerposition (Achse 'x'); die Höhe spielt keine Rolle.
 *
 * Stufe: Tempo 6 → ≈ 18 u/s, Abstand der Wendungen 1,1–2,6 s (Stufe 1) → 0,8–1,7 s (Stufe 12).
 * Jeder Durchgang hat seinen eigenen Rhythmus und seine Startrichtung (zufällig, im Film fest).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { MAX_LEVEL, MIN_LEVEL, type RuleSetup, trapezoid, type TrackRule, type Vec } from '../_shared/nachfuehren-logic';

/** Zeit für Bremsen bzw. Anlaufen an jedem Wendepunkt (s) */
export const TURN_S = 0.22;

/** Lauftempo der Strecken in u/s */
export function speedFor(level: number): number {
  return 6 + 1.1 * (clamp(level, MIN_LEVEL, MAX_LEVEL) - 1);
}

/** Kürzeste und längste Zeit zwischen zwei Wendungen (s) */
export function legRangeFor(level: number): { min: number; max: number } {
  const t = (clamp(level, MIN_LEVEL, MAX_LEVEL) - 1) / (MAX_LEVEL - 1);
  return { min: 1.1 - 0.3 * t, max: 2.6 - 0.9 * t };
}

interface Leg {
  t0: number;
  dur: number;
  x0: number;
  x1: number;
}

export class StrafeRule implements TrackRule {
  private readonly legs: Leg[] = [];
  /** Wechselrhythmus (Laufzeiten ohne Wendezeit) */
  readonly pattern: number[];
  readonly speed: number;
  readonly y: number;
  readonly span: number;

  /**
   * @param hw halbe nutzbare Feldbreite (u): die Bahn bleibt innerhalb ±hw
   * @param hh halbe nutzbare Feldhöhe (u): Schiene liegt etwas oberhalb der Mitte
   */
  constructor(rng: Rng, level: number, hw: number, hh: number, seconds: number) {
    this.speed = speedFor(level);
    this.y = -0.2 * hh;
    const r = legRangeFor(level);
    // kurz – lang – lang – kurz: die Summen gleichen sich aus, die Bahn driftet nicht weg
    const p = rng.range(r.min, r.min + 0.4 * (r.max - r.min));
    const q = rng.range(r.min + 0.6 * (r.max - r.min), r.max);
    let pat = [p, q, q, p];
    // Startrichtung zufällig; Positionen der Wendepunkte (abwechselnd hin und her) relativ zum Start
    const dir0 = rng.chance(0.5) ? 1 : -1;
    const positions = (a: number[]) => {
      const out: number[] = [0];
      let x = 0;
      let dir = dir0;
      for (const d of a) {
        x += dir * this.speed * d;
        out.push(x);
        dir = -dir;
      }
      return out;
    };
    let pos = positions(pat);
    const spread = Math.max(...pos) - Math.min(...pos);
    const avail = 2 * hw * 0.92;
    if (spread > avail) {
      pat = pat.map((d) => (d * avail) / spread);
      pos = positions(pat);
    }
    this.pattern = pat;
    this.span = Math.max(...pos) - Math.min(...pos);
    // die Spannweite wird in der Feldmitte zentriert
    const mid = (Math.min(...pos) + Math.max(...pos)) / 2;
    let t = 0;
    let cur = pos[0] - mid;
    let dir = dir0;
    let i = 0;
    while (t < seconds + 8) {
      const d = pat[i % 4];
      const next = cur + dir * this.speed * d;
      this.legs.push({ t0: t, dur: d + TURN_S, x0: cur, x1: next });
      t += d + TURN_S;
      cur = next;
      dir = -dir;
      i++;
    }
  }

  target(s: number): Vec {
    const t = Math.max(0, s);
    let leg = this.legs[this.legs.length - 1];
    for (const l of this.legs) {
      if (t < l.t0 + l.dur) {
        leg = l;
        break;
      }
    }
    const k = (t - leg.t0) / leg.dur;
    const x = leg.x0 + (leg.x1 - leg.x0) * trapezoid(k, TURN_S / leg.dur);
    return { x, y: this.y };
  }

  /** Zeitpunkte der Wendungen im Bereich [0, seconds] */
  turnTimes(seconds: number): number[] {
    return this.legs.map((l) => l.t0 + l.dur).filter((t) => t <= seconds);
  }
}

export function makeRule(setup: RuleSetup): TrackRule {
  return new StrafeRule(setup.rng, setup.level, setup.hw, setup.hh, setup.seconds);
}
