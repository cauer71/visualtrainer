/**
 * Kurzdarbietungen in ganzen Bildern (Labor-Übungen „Blitz-Erkennung“ und „Peripheres Erkennen“).
 *
 * Ein Bildschirm zeigt nur ganze Bilder: Bei 60 Hz dauert ein Bild ≈ 16,7 ms, bei 120 Hz ≈ 8,3 ms. Eine Anzeigedauer
 * von 150 ms ist daher in Wirklichkeit ein Vielfaches der Bilddauer. Deshalb zählen diese Übungen in Bildern:
 *
 * - `FramePeriod` schätzt die Bilddauer aus den Zeitstempeln der Bilder (Median der letzten Abstände).
 * - Die Zahl der Bilder ist `round(Wunschdauer / Bilddauer)`, mindestens 1.
 * - Die Darbietung endet im ersten Bild, dessen Zeitstempel mindestens `(Bilder − 0,5) × Bilddauer` nach dem ersten
 *   Bild liegt; die tatsächlich verstrichene Zeit (`shown`) wird gemessen und gemeldet.
 * - Weicht sie um mehr als ein halbes Bild von der geplanten ab (ein Bild ausgelassen), gilt die Darbietung als
 *   „gestört“: Sie zählt nicht für das adaptive Verfahren.
 * - Das adaptive Verfahren (`DurationControl`) läuft in ganzen Bildern, nicht in Millisekunden, damit die Schwelle
 *   nie unter ein Bild fällt und keine Dauer gemeldet wird, die gar nicht gezeigt werden kann.
 *
 * Blinkregel der App: Zwischen zwei Darbietungen liegen immer mindestens `MIN_CYCLE_MS` (1 s), also höchstens eine
 * Darbietung pro Sekunde und weit unter den üblichen Grenzen für Blitzfolgen.
 */
import { clamp, mean, median } from '../../core/stats';
import { makeValueStaircase, type ValueStaircase } from './labor-adaptive';

/** Bilddauer, solange noch nicht genug Bilder gemessen sind (60 Hz) */
export const DEFAULT_PERIOD_MS = 1000 / 60;
/** Mindestabstand zwischen dem Beginn zweier Darbietungen (ms): höchstens 1 Darbietung pro Sekunde */
export const MIN_CYCLE_MS = 1000;
const MIN_SAMPLES = 5;
const MAX_SAMPLES = 90;

/** Schätzt die Bilddauer aus den Zeitstempeln der Bilder (Aufruf einmal pro Bild mit der Bildzeit `t`). */
export class FramePeriod {
  private iv: number[] = [];
  private last = -1;

  /** Bildzeit melden; Abstände außerhalb von 3–70 ms (Pause, Tabwechsel, Ruckler) zählen nicht */
  push(t: number): void {
    if (this.last >= 0) {
      const d = t - this.last;
      if (d > 3 && d < 70) {
        this.iv.push(d);
        if (this.iv.length > MAX_SAMPLES) this.iv.shift();
      }
    }
    this.last = t;
  }

  /** Bilddauer in ms (Median der letzten Abstände; 60 Hz, solange weniger als 5 Abstände vorliegen) */
  period(): number {
    if (this.iv.length < MIN_SAMPLES) return DEFAULT_PERIOD_MS;
    return clamp(median(this.iv), 4, 50);
  }

  /** Bildwiederholrate in Hz (aus der geschätzten Bilddauer) */
  hz(): number {
    return 1000 / this.period();
  }
}

/** Zahl der Bilder für eine Wunschdauer: gerundet, mindestens 1 */
export function framesFor(durationMs: number, periodMs: number): number {
  return Math.max(1, Math.round(durationMs / periodMs));
}

/** Zeitpunkt (Bildzeit), ab dem die Darbietung vorbei ist: erstes Bild nach `(frames − 0,5)` Bilddauern */
export function showEndAt(startT: number, frames: number, periodMs: number): number {
  return startT + (frames - 0.5) * periodMs;
}

/** Wurde die geplante Zahl ganzer Bilder (auf ein halbes Bild genau) gezeigt? */
export function isCleanShow(shownMs: number, frames: number, periodMs: number): boolean {
  return Math.abs(shownMs - frames * periodMs) < 0.5 * periodMs + 1;
}

export interface DurationControlOptions {
  /** Wunschdauer in ms (bei „adaptiv“ der Startwert) */
  durationMs: number;
  /** größte Dauer des adaptiven Verfahrens in ms */
  maxMs: number;
  adaptive: boolean;
}

/**
 * Anzeigedauer in Bildern: fest oder adaptiv (zwei richtige in Folge → kürzer, ein Fehler → länger; Faktoren 0,8 und
 * 1,25, wie im Prototyp). Die Bilddauer wird bei jedem Beginn neu übergeben; die Treppe wird beim ersten Mal angelegt.
 */
export class DurationControl {
  private stair: ValueStaircase | null = null;
  private fixed = 1;
  private lastPeriod = DEFAULT_PERIOD_MS;

  constructor(private readonly o: DurationControlOptions) {}

  get adaptive(): boolean {
    return this.o.adaptive;
  }

  /** Beginn einer Darbietung: Zahl der Bilder (bei „adaptiv“ der aktuelle Wert der Treppe) */
  begin(periodMs: number): number {
    this.lastPeriod = periodMs;
    if (!this.o.adaptive) {
      this.fixed = framesFor(this.o.durationMs, periodMs);
      return this.fixed;
    }
    if (!this.stair) {
      this.stair = makeValueStaircase({
        start: framesFor(this.o.durationMs, periodMs),
        min: 1,
        max: Math.max(2, framesFor(this.o.maxMs, periodMs)),
        factorHarder: 0.8,
        factorEasier: 1.25,
        needCorrect: 2,
      });
    }
    return this.stair.value();
  }

  /** Antwort melden; gestörte Darbietungen (`clean = false`) verändern die Treppe nicht */
  record(correct: boolean, clean: boolean): void {
    if (this.stair && clean) this.stair.record(correct);
  }

  /** Aktuelle Zahl der Bilder (ohne `begin` aufzurufen); null, solange nichts begonnen wurde */
  frames(): number | null {
    return this.o.adaptive ? (this.stair ? this.stair.value() : null) : this.fixed;
  }

  /** Umkehrpunkte in Bildern */
  reversals(): number[] {
    return this.stair ? this.stair.reversals() : [];
  }

  /** Schwelle in Bildern (Mittel der letzten 4 Umkehrpunkte); null bei weniger als 2 Umkehrpunkten oder ohne „adaptiv“ */
  thresholdFrames(): number | null {
    return this.stair ? this.stair.threshold() : null;
  }

  /** Schwelle in ms (Bilder × zuletzt geschätzte Bilddauer); null wie bei `thresholdFrames` */
  thresholdMs(): number | null {
    const f = this.thresholdFrames();
    return f === null ? null : f * this.lastPeriod;
  }

  /** Zuletzt gezeigte (bzw. nächste) Dauer in ms: Bilder × Bilddauer; null ohne Beginn */
  currentMs(): number | null {
    const f = this.frames();
    return f === null ? null : f * this.lastPeriod;
  }
}

/** Mittelwert, 0 bei leerer Liste (für Zusammenfassungen ohne NaN) */
export function meanOr(xs: readonly number[], fallback = 0): number {
  return xs.length ? mean(xs) : fallback;
}
