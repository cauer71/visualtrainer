/**
 * Ausweich folgen – reine Bewegungsregel (Katalog 512, „Reaktives Nachführen“; Original: Kugel wechselt auf der waagrechten
 * Bildmitte Richtung und Tempo).
 *
 * WICHTIG (ehrlich): Die Kern-Regel darf nur von der Zeit abhängen, nicht von der Zeigermarke. Das Ziel „weicht“ also nicht
 * wirklich aus, sondern folgt einem vorab gewürfelten Ablauf, der nur so AUSSIEHT, als würde es reagieren: Es gleitet waagrecht
 * auf einer Schiene, wechselt in unregelmäßigen Abständen das Tempo und meistens auch die Richtung – ohne Vorwarnung, aber
 * mit weichem Übergang (kein Sprung im Tempo, anders als im Original).
 *
 * Stufe: Tempo steigt, die Abstände zwischen den Wechseln werden kürzer, die Wendungen etwas schneller.
 */
import { clamp } from '../../core/stats';
import { blend, buildPath, keepInside, type PathTable } from '../_shared/folgen-bahn';
import { MAX_LEVEL, MIN_LEVEL, smoothstep, type RuleSetup, type TrackRule } from '../_shared/nachfuehren-logic';

/** Tempo-Faktoren bei einem Tempowechsel (Original: 0,9× bzw. 1,6×) und Anteil der schnellen Abschnitte */
export const SLOW_FACTOR = 0.85;
export const FAST_FACTOR = 1.35;
export const FAST_SHARE = 0.35;
/** Sanfter Start: Die Bewegung läuft in dieser Zeit (s) aus dem Stand an */
export const START_RAMP_S = 0.9;

const lv = (level: number) => clamp(Math.round(level), MIN_LEVEL, MAX_LEVEL);

/** Grundtempo der Zielmarke (u/s): 7 auf Stufe 1 … ≈ 17 auf Stufe 12 (schnelle Abschnitte bis ×1,35) */
export function dodgeSpeed(level: number): number {
  return 7 + 0.9 * (lv(level) - 1);
}

/** Mittlerer Abstand zwischen zwei Wechseln (s): 2,6 auf Stufe 1 … ≈ 1,2 auf Stufe 12 */
export function dodgeGap(level: number): number {
  return 2.6 - 0.13 * (lv(level) - 1);
}

/** Dauer des weichen Übergangs bei einem Wechsel (s): 0,55 … ≈ 0,33 */
export function dodgeTurnTime(level: number): number {
  return 0.55 - 0.02 * (lv(level) - 1);
}

/** Wahrscheinlichkeit, dass ein Wechsel die Richtung umkehrt (sonst nur Tempo): ≈ 0,58 … 0,91; nie mehr als 2 Wechsel ohne Umkehr in Folge */
export function dodgeReversalChance(level: number): number {
  return clamp(0.55 + 0.03 * lv(level), 0.55, 0.92);
}

export interface DodgeEvent {
  /** Zeitpunkt des Wechsels (s) */
  t: number;
  /** Neue Geschwindigkeit (u/s, Vorzeichen = Richtung) */
  v: number;
  /** Hat dieser Wechsel die Richtung umgekehrt? */
  reversal: boolean;
}

export interface DodgePlan {
  path: PathTable;
  events: DodgeEvent[];
}

/** Bahn planen: Ereignisse werden mit `setup.rng` gewürfelt, der Ort dann aufsummiert (nur Funktion der Zeit). */
export function dodgePlan(setup: RuleSetup): DodgePlan {
  const { rng, hw } = setup;
  const level = lv(setup.level);
  const speed = dodgeSpeed(level);
  const gap = dodgeGap(level);
  const tr = dodgeTurnTime(level);
  const revChance = dodgeReversalChance(level);
  const lim = Math.max(3, hw - 3);
  const x0 = rng.range(-0.35, 0.35) * hw;
  const events: DodgeEvent[] = [];

  const span = () => gap * rng.range(0.75, 1.25);
  /** Richtung/Betrag so wählen, dass das Ziel im Feld bleibt */
  const fit = (x: number, sign: number, mag: number, d: number): { sign: number; mag: number } => {
    if (Math.abs(x + sign * mag * d) <= lim) return { sign, mag };
    if (Math.abs(x - sign * mag * d) <= lim) return { sign: -sign, mag };
    const s2 = x > 0 ? -1 : 1;
    return { sign: s2, mag: Math.min(mag, (Math.abs(x) + lim) / d) };
  };

  const d0 = span();
  const first = fit(x0, rng.chance(0.5) ? 1 : -1, speed, d0);
  let vPrev = first.sign * first.mag;
  let vCur = vPrev;
  let tCur = 0;
  let nextT = d0;
  let plainRun = 0;
  events.push({ t: 0, v: vCur, reversal: false });

  const path = buildPath({ x: x0, y: 0 }, setup.seconds + 0.6, (s, pos) => {
    if (s >= nextT - 1e-9) {
      const d = span();
      const wantRev = plainRun >= 2 || rng.chance(revChance);
      const mag0 = speed * (rng.chance(FAST_SHARE) ? FAST_FACTOR : SLOW_FACTOR);
      const f = fit(pos.x, (Math.sign(vCur) || 1) * (wantRev ? -1 : 1), mag0, d);
      vPrev = vCur;
      vCur = f.sign * f.mag;
      tCur = nextT;
      nextT = tCur + d;
      const reversal = Math.sign(vCur) !== Math.sign(vPrev);
      plainRun = reversal ? 0 : plainRun + 1;
      events.push({ t: tCur, v: vCur, reversal });
    }
    const v = vPrev + (vCur - vPrev) * blend(s, tCur, tr);
    return { x: keepInside(pos.x, v * smoothstep(s / START_RAMP_S), hw), y: 0 };
  });
  return { path, events };
}

/** Bewegungsregel für den Kern (`axes: 'x'`): Ziel gleitet auf einer waagrechten Schiene in der Feldmitte. */
export function dodgeRule(setup: RuleSetup): TrackRule {
  const { path } = dodgePlan(setup);
  return { target: (s) => path.at(s) };
}
