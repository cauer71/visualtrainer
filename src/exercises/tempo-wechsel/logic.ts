/**
 * Tempo-Wechsel – reine Logik (Stufenfunktionen, Wechsel-Plan, weiche Tempo-Rampe), ohne Canvas und DOM.
 *
 * Das Ziel läuft mit einem Grundtempo; in unregelmäßigen Abständen ändert es WEICH sein Tempo und
 * zugleich seine Richtung (Bogen mit weicher Drehrate, Tempo mit weicher Rampe – nie ein Sprung).
 * Ein Zeichen erscheint nur, wenn das Tempo wieder ruhig ist: Die Rampe ist zu Ende, das Ziel läuft
 * nicht zu schnell (`CALM_MAX_U`) und nicht mehr im Bogen. Stufe ist immer „höher = schwerer“.
 *
 * Stufen (1–20):
 * - Stärke: Tempo-Spreizung (Faktor 1,4 → 2,2 nach oben und unten), Drehwinkel 25° → 130°
 * - Häufigkeit: mittlerer Abstand zwischen Wechseln 2,2 → 1,35 s (unregelmäßig)
 * - Wechsel-Dauer (Rampe und Bogen) 900 → 480 ms
 * - Zeichen: kleiner, kürzer sichtbar, erscheint früher nach dem Wechsel
 *
 * Einheit u = 1 % der kürzeren Seite (Tablet aus 40 cm ≈ 0,23° je u).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { arcProgress, deg } from '../_shared/freibahn';
import { SIGN_MAX_LEVEL, SIGN_MIN_LEVEL } from '../_shared/zeichenaufgabe';

export const MIN_LEVEL = SIGN_MIN_LEVEL;
export const MAX_LEVEL = SIGN_MAX_LEVEL;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Schneller als dies (u/s) läuft das Ziel nur ohne Zeichen – ein Zeichen braucht ein ruhiges Tempo */
export const CALM_MAX_U = 34;
/** Abweichung vom Zieltempo (Anteil), bis zu der das Tempo als „angekommen“ gilt */
export const CALM_TOL = 0.03;

/** Grundtempo in u/s (Mitte der Spreizung) */
export function baseSpeedFor(level: number): number {
  return 12 * Math.pow(1.055, levelOf(level) - 1);
}

/** Spreizung: das Tempo schwankt zwischen Grundtempo / r und Grundtempo · r */
export function tempoRatioFor(level: number): number {
  return 1.4 + 0.042 * (levelOf(level) - 1);
}

/** Mittlerer Drehwinkel in Grad */
export function turnAngleFor(level: number): number {
  return 25 + 5.5 * (levelOf(level) - 1);
}

/** Dauer eines Wechsels (Tempo-Rampe und Bogen) in ms */
export function changeMsFor(level: number): number {
  return Math.round(900 - 22 * (levelOf(level) - 1));
}

/** Mittlerer Abstand zwischen zwei Wechseln in ms */
export function gapMeanFor(level: number): number {
  return Math.round(2200 - 45 * (levelOf(level) - 1));
}

/** Zeit vom Ende des Wechsels bis zum Zeichen in ms */
export function signDelayFor(level: number): number {
  return Math.round(420 - 10 * (levelOf(level) - 1));
}

/** Anzeigedauer des Zeichens in ms */
export function exposureFor(level: number): number {
  return Math.max(320, Math.round(640 - 13 * (levelOf(level) - 1)));
}

/** Tatsächlicher Drehwinkel (Radiant, positiv): Stufenwinkel ±25 %, höchstens 160° */
export function drawTurnAngle(level: number, rng: Rng): number {
  return deg(clamp(turnAngleFor(level) * rng.range(0.75, 1.25), 15, 160));
}

/** Abstand bis zum nächsten Wechsel in ms: unregelmäßig um den Stufenwert (75–130 %) */
export function drawGapMs(level: number, rng: Rng): number {
  return Math.round(gapMeanFor(level) * rng.range(0.75, 1.3));
}

/** Abstand nach einem Wechsel ohne Zeichen bis zum nächsten in ms */
export function decoyGapMs(rng: Rng): number {
  return Math.round(rng.range(800, 1400));
}

/**
 * Neuer Tempofaktor (relativ zum Grundtempo) aus dem Band [1/r, r]: deutlich anders als der aktuelle
 * (mindestens 90 % der halben Spreizung im Logarithmus), sonst wäre der Wechsel kaum zu merken.
 */
export function nextTempoFactor(level: number, cur: number, rng: Rng): number {
  const lnR = Math.log(tempoRatioFor(level));
  const x0 = Math.log(clamp(cur, 1 / tempoRatioFor(level), tempoRatioFor(level)));
  const need = 0.9 * lnR;
  const below: [number, number] = [-lnR, x0 - need];
  const above: [number, number] = [x0 + need, lnR];
  const okBelow = below[1] >= below[0];
  const okAbove = above[1] >= above[0];
  let band: [number, number];
  if (okBelow && okAbove) band = rng.chance(0.5) ? below : above;
  else band = okBelow ? below : above;
  return Math.exp(rng.range(band[0], band[1] + 1e-9));
}

/** Ist das Tempo ruhig genug für ein Zeichen? (Rampe fertig, nicht zu schnell, nicht im Bogen) */
export function isCalm(speedU: number, targetU: number, rampActive: boolean, turning: boolean): boolean {
  if (rampActive || turning) return false;
  if (speedU > CALM_MAX_U + 1e-9) return false;
  return Math.abs(speedU - targetU) <= CALM_TOL * Math.max(targetU, 1e-6);
}

/** Darf ein Wechsel mit Zeichen stattfinden? Nur wenn das neue Tempo ruhig genug bleibt. */
export function canHostSign(newSpeedU: number): boolean {
  return newSpeedU <= CALM_MAX_U + 1e-9;
}

/** Wechsel ohne Zeichen (Ablenkung): ab Stufe 3 gelegentlich, nie zwei in Folge */
export function isDecoy(level: number, rng: Rng, lastWasDecoy: boolean): boolean {
  if (lastWasDecoy || levelOf(level) < 3) return false;
  return rng.chance(0.25);
}

/**
 * Weiche Tempo-Rampe: Der Faktor läuft in `durMs` Millisekunden von `from` nach `to`. Der Verlauf
 * hat am Anfang und am Ende die Steigung 0 (gleiche Kurve wie beim Bogen), also keinen Ruck.
 */
export class TempoRamp {
  value = 1;
  private from = 1;
  private to = 1;
  private dur = 1;
  private el = 0;
  private on = false;

  get active(): boolean {
    return this.on;
  }

  get target(): number {
    return this.to;
  }

  /** Rampe zum Faktor `to` starten (aus dem aktuellen Wert) */
  start(to: number, durMs: number): void {
    this.from = this.value;
    this.to = to;
    this.dur = Math.max(1, durMs);
    this.el = 0;
    this.on = true;
  }

  /** sofort setzen (keine Rampe) */
  set(v: number): void {
    this.value = v;
    this.from = v;
    this.to = v;
    this.on = false;
  }

  step(dtMs: number): void {
    if (!this.on) return;
    this.el = Math.min(this.dur, this.el + dtMs);
    const k = arcProgress(this.el / this.dur);
    this.value = this.from + (this.to - this.from) * k;
    if (this.el >= this.dur) {
      this.value = this.to;
      this.on = false;
    }
  }
}
