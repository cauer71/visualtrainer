/**
 * Adaptive Treppe (Staircase, Levitt 1971).
 *
 * "Stufe" ist immer so definiert: höher = schwieriger. Jede Übung übersetzt
 * die Stufe in einen konkreten Parameter (Tempo, Anzeigedauer, …).
 *
 * n-down/1-up führt zu einer Zielquote richtiger Antworten:
 *   2-down/1-up ≈ 70,7 %, 3-down/1-up ≈ 79,4 %, 4-down/1-up ≈ 84,1 %.
 * Training nahe ~80–85 % gilt als lernförderlich ("85 %-Regel", Wilson et al. 2019).
 */
export interface StaircaseOptions {
  start: number;
  min: number;
  max: number;
  /** Anzahl richtiger Antworten in Folge, bevor es schwerer wird */
  down: number;
  /** Anzahl Fehler in Folge, bevor es leichter wird (Standard 1) */
  up?: number;
  /** Schrittweite nach oben (schwerer) */
  stepHarder?: number;
  /** Schrittweite nach unten (leichter) */
  stepEasier?: number;
  /**
   * Zu Beginn größere Schritte, bis zur ersten Umkehr (schneller zur Schwelle).
   * Faktor auf beide Schrittweiten. Standard 2.
   */
  initialBoost?: number;
}

export type StairMove = 'harder' | 'easier' | 'same';

export class Staircase {
  level: number;
  readonly reversals: number[] = [];
  readonly trace: number[] = [];
  private streakOk = 0;
  private streakBad = 0;
  private lastDir: 'harder' | 'easier' | null = null;
  private readonly o: Required<StaircaseOptions>;

  constructor(opts: StaircaseOptions) {
    this.o = { up: 1, stepHarder: 1, stepEasier: 1, initialBoost: 2, ...opts };
    this.level = clampLevel(opts.start, opts.min, opts.max);
  }

  /** Ergebnis eines Durchgangs melden. */
  update(success: boolean): StairMove {
    this.trace.push(this.level);
    if (success) {
      this.streakOk++;
      this.streakBad = 0;
      if (this.streakOk >= this.o.down) {
        this.streakOk = 0;
        return this.move('harder', this.o.stepHarder);
      }
    } else {
      this.streakBad++;
      this.streakOk = 0;
      if (this.streakBad >= this.o.up) {
        this.streakBad = 0;
        return this.move('easier', this.o.stepEasier);
      }
    }
    return 'same';
  }

  private move(dir: 'harder' | 'easier', baseStep: number): StairMove {
    if (this.lastDir && this.lastDir !== dir) this.reversals.push(this.level);
    this.lastDir = dir;
    // Große Schritte nur bis zur ersten Umkehr (die Umkehr selbst ist schon ein kleiner Schritt)
    const step = this.reversals.length === 0 ? baseStep * this.o.initialBoost : baseStep;
    const next = dir === 'harder' ? this.level + step : this.level - step;
    this.level = clampLevel(next, this.o.min, this.o.max);
    return dir;
  }

  /**
   * Schwellenschätzung: Mittel der letzten Umkehrpunkte. Gibt es zu wenige,
   * zählt der Mittelwert der zuletzt besuchten Stufen.
   */
  threshold(lastN = 6): number {
    if (this.reversals.length >= 2) {
      const r = this.reversals.slice(-lastN);
      return r.reduce((a, b) => a + b, 0) / r.length;
    }
    const tr = [...this.trace.slice(-lastN), this.level];
    return tr.reduce((a, b) => a + b, 0) / tr.length;
  }

  /** Höchste erreichte Stufe (inkl. der nächsten, noch nicht gespielten) */
  get maxLevel(): number {
    return Math.max(this.level, ...this.trace);
  }

  /** Höchste Stufe, auf der tatsächlich ein Durchgang gespielt wurde */
  get maxPlayed(): number {
    return this.trace.length ? Math.max(...this.trace) : this.level;
  }
}

function clampLevel(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * Startstufe für die nächste Sitzung: etwas unter der letzten Schwelle,
 * damit man sich "warmspielt".
 */
export function nextStartLevel(threshold: number, min: number, max: number, warmup = 1): number {
  return Math.round(Math.min(max, Math.max(min, threshold - warmup)) * 10) / 10;
}
