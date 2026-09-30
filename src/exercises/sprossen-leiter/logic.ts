/**
 * Sprossen-Leiter – reine Logik (Takt, Fenster, Wertung, Anordnung), ohne Canvas und DOM.
 *
 * Eine Leiter aus n Feldern (Sprossen, im Zickzack links/rechts, unten beginnend) wird nacheinander im Takt eines
 * Taktgebers angetippt. Zur k-ten Sprosse gehört der Takt k (Zeit T0 + k·P, P = Taktdauer). Jeder Takt hat ein
 * Fenster von ±P/2 um den Schlag; der erste Tipp im Fenster entscheidet:
 * - richtige Sprosse → Treffer, Abweichung = Tippzeit − Schlagzeit (ms, negativ = zu früh); „im Takt“, wenn |Abweichung| ≤ Toleranz
 * - andere Sprosse → Fehler
 * - kein Tipp bis zum Fensterende → verpasst (Fehler)
 *
 * Stufen (1–20, höher = schwerer):
 * - Takt: 1000 ms → 500 ms pro Schlag (2 Hz = Obergrenze für sanfte Hinweise)
 * - Toleranz: 30 % der Taktdauer
 * - Sprossenzahl: 4 → 7
 * Gemessen wird die Zeit zwischen Berührung und Schlag auf diesem Gerät; Touch-Verzögerungen des Geräts sind darin enthalten.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Schläge vor der ersten Sprosse (nur Taktgeber, zum Einschwingen) */
export const LEAD_BEATS = 3;
/** Anteil der Sprossen, die „im Takt“ sein müssen, damit die Leiter gelingt */
export const PASS_FRACTION = 0.75;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Taktdauer in ms: 1000 → 500 (höchstens 2 Schläge pro Sekunde) */
export function periodMsFor(level: number): number {
  return 1000 - (500 / (MAX_LEVEL - MIN_LEVEL)) * (levelOf(level) - MIN_LEVEL);
}

/** Toleranz für „im Takt“ in ms */
export function toleranceMsFor(level: number): number {
  return 0.3 * periodMsFor(level);
}

/** Anzahl der Sprossen: 4 (Stufe 1–6), 5 (7–12), 6 (13–18), 7 (19–20) */
export function rungCountFor(level: number): number {
  return 4 + Math.floor((levelOf(level) - 1) / 6);
}

/** Mindestzahl „im Takt“ getroffener Sprossen für eine gelungene Leiter */
export function neededOnTime(n: number): number {
  return Math.ceil(PASS_FRACTION * n - 1e-9);
}

/** Punkte für eine Leiter: je Treffer im Takt 5 + Stufe */
export function pointsFor(level: number, onTime: number): number {
  return Math.max(0, onTime) * (5 + Math.floor(levelOf(level) + 1e-9));
}

export interface Rung {
  /** Mitte in px */
  x: number;
  y: number;
}

export interface LadderArea {
  /** Mitte der Leiter (x) */
  cx: number;
  /** Oberkante und Unterkante des Bereichs für die Feldmitten */
  top: number;
  bottom: number;
  /** waagrechter Abstand der Feldmitten von der Mitte */
  dx: number;
}

/** Sprossenmitten im Zickzack, Sprosse 0 unten (links), danach abwechselnd rechts/links nach oben */
export function rungPositions(n: number, a: LadderArea, startRight = false): Rung[] {
  const out: Rung[] = [];
  const cnt = Math.max(1, Math.round(n));
  for (let k = 0; k < cnt; k++) {
    const f = cnt === 1 ? 0 : k / (cnt - 1);
    const right = (k % 2 === 1) !== startRight;
    out.push({ x: a.cx + (right ? a.dx : -a.dx), y: a.bottom - f * (a.bottom - a.top) });
  }
  return out;
}

/** Nächste Sprosse, deren Rechteck (mit Rand `pad`) den Punkt enthält, sonst −1 */
export function rungAt(px: number, py: number, rungs: readonly Rung[], fw: number, fh: number, pad: number): number {
  let best = -1;
  let bd = Infinity;
  for (let i = 0; i < rungs.length; i++) {
    const dx = Math.abs(px - rungs[i].x);
    const dy = Math.abs(py - rungs[i].y);
    if (dx <= fw / 2 + pad && dy <= fh / 2 + pad) {
      const d = Math.hypot(dx, dy);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
  }
  return best;
}

/**
 * Sanfter Taktschlag 0..1 (Kosinus-Hügel) um jeden ganzzahligen Schlag: Breite höchstens 0,45 Takte, mindestens 225 ms,
 * damit alle Übergänge weich (≥ 100 ms) bleiben. rel = Zeit seit Schlag 0 in ms.
 */
export function beatPulse(rel: number, period: number): number {
  const half = Math.min(period * 0.45, 260);
  const m = ((((rel + period / 2) % period) + period) % period) - period / 2;
  const d = Math.abs(m);
  return d >= half ? 0 : 0.5 * (1 + Math.cos((Math.PI * d) / half));
}

/** Anteil 0..1 der Zeit seit dem letzten Schlag bis zum nächsten (für den Anflug-Ring) */
export function beatPhase(rel: number, period: number): number {
  const m = (((rel % period) + period) % period) / period;
  return m;
}

export type TapKind = 'hit' | 'wrong' | 'dup' | 'early' | 'late';
export type RungState = 'pending' | 'hit' | 'wrong' | 'miss';

export interface RungResult {
  state: RungState;
  /** Abweichung in ms (nur bei Treffer), negativ = zu früh */
  dev: number;
  onTime: boolean;
}

export interface TapReport {
  kind: TapKind;
  /** Fenster (Takt), zu dem der Tipp gehört */
  k: number;
  dev: number;
  onTime: boolean;
}

/** Verlauf einer Leiter; Zeiten relativ zu Schlag 0 (T0 = 0) */
export class LadderRun {
  readonly results: RungResult[];

  constructor(
    readonly n: number,
    readonly period: number,
    readonly tol: number,
  ) {
    this.results = Array.from({ length: n }, () => ({ state: 'pending' as RungState, dev: 0, onTime: false }));
  }

  /** Nummer des Fensters, zu dem ein Zeitpunkt gehört (kann < 0 oder ≥ n sein) */
  windowOf(rel: number): number {
    return Math.floor((rel + this.period / 2) / this.period);
  }

  /** Tipp auf Sprosse `rung` zur Zeit `rel` melden */
  tap(rel: number, rung: number): TapReport {
    const k = this.windowOf(rel);
    if (k < 0) return { kind: 'early', k, dev: 0, onTime: false };
    if (k >= this.n) return { kind: 'late', k, dev: 0, onTime: false };
    const r = this.results[k];
    if (r.state !== 'pending') return { kind: 'dup', k, dev: 0, onTime: false };
    if (rung !== k) {
      r.state = 'wrong';
      return { kind: 'wrong', k, dev: 0, onTime: false };
    }
    const dev = rel - k * this.period;
    const onTime = Math.abs(dev) <= this.tol;
    r.state = 'hit';
    r.dev = dev;
    r.onTime = onTime;
    return { kind: 'hit', k, dev, onTime };
  }

  /** Fenster, die bis `rel` ohne Tipp abgelaufen sind, als verpasst markieren; gibt ihre Nummern zurück */
  sweep(rel: number): number[] {
    const out: number[] = [];
    for (let k = 0; k < this.n; k++) {
      const r = this.results[k];
      if (r.state === 'pending' && rel >= k * this.period + this.period / 2) {
        r.state = 'miss';
        out.push(k);
      }
    }
    return out;
  }

  /** Erste offene Sprosse (die nächste, die dran ist), sonst n */
  get next(): number {
    const i = this.results.findIndex((r) => r.state === 'pending');
    return i < 0 ? this.n : i;
  }

  get done(): boolean {
    return this.next >= this.n;
  }

  get onTimeCount(): number {
    return this.results.filter((r) => r.state === 'hit' && r.onTime).length;
  }

  get hitCount(): number {
    return this.results.filter((r) => r.state === 'hit').length;
  }

  get errorCount(): number {
    return this.results.filter((r) => r.state === 'wrong' || r.state === 'miss').length;
  }

  get passed(): boolean {
    return this.onTimeCount >= neededOnTime(this.n);
  }

  /** Abweichungen der getroffenen Sprossen (ms, mit Vorzeichen) */
  get devs(): number[] {
    return this.results.filter((r) => r.state === 'hit').map((r) => r.dev);
  }
}

export function meanAbs(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  return xs.reduce((a, b) => a + Math.abs(b), 0) / xs.length;
}

export function meanSigned(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Geplanter Tipp für Autoplay und Film */
export interface PlannedTap {
  /** Zeit relativ zu Schlag 0 (ms) */
  rel: number;
  /** Sprosse, auf die getippt wird (−1 = Tipp ausgelassen) */
  rung: number;
}

/**
 * Tipp-Plan für Autoplay: meist richtig und nah am Schlag, manchmal daneben oder ausgelassen.
 * `fixedDevs` (Film): feste, kleine Abweichungen ohne Fehler.
 */
export function planTaps(rng: Rng, n: number, level: number, fixedDevs?: readonly number[]): PlannedTap[] {
  const out: PlannedTap[] = [];
  const P = periodMsFor(level);
  const sigma = 35 + 4 * levelOf(level);
  for (let k = 0; k < n; k++) {
    if (fixedDevs) {
      out.push({ rel: k * P + fixedDevs[k % fixedDevs.length], rung: k });
      continue;
    }
    const r = rng.next();
    const dev = clamp(rng.normal() * sigma - 10, -P * 0.42, P * 0.42);
    if (r < 0.04) out.push({ rel: k * P + dev, rung: -1 });
    else if (r < 0.08 && n > 1) out.push({ rel: k * P + dev, rung: (k + 1 + rng.int(n - 1)) % n });
    else out.push({ rel: k * P + dev, rung: k });
  }
  return out;
}
