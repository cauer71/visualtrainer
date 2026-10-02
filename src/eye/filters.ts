// EYE-EXPERIMENT: One-Euro-Filter (Casiez et al. 2012) für die Glättung des Blickpunkts – rein, zeitgesteuert.

const alpha = (cutoffHz: number, dtS: number): number => {
  const tau = 1 / (2 * Math.PI * cutoffHz);
  return 1 / (1 + tau / dtS);
};

export interface OneEuroParams {
  /** Grenzfrequenz bei Ruhe (Hz): kleiner = ruhiger, aber träger */
  minCutoff: number;
  /** Anstieg der Grenzfrequenz mit der Geschwindigkeit: größer = weniger Verzögerung bei schnellen Wechseln */
  beta: number;
  /** Grenzfrequenz der Geschwindigkeitsschätzung (Hz) */
  dCutoff: number;
}

export class OneEuroFilter {
  private xHat: number | null = null;
  private dxHat = 0;
  private tPrev = 0;

  constructor(public params: OneEuroParams) {}

  reset(): void {
    this.xHat = null;
    this.dxHat = 0;
  }

  /** x: Messwert, tMs: Zeitstempel in ms. */
  filter(x: number, tMs: number): number {
    if (this.xHat === null) {
      this.xHat = x;
      this.tPrev = tMs;
      return x;
    }
    const dt = Math.max((tMs - this.tPrev) / 1000, 1e-3);
    this.tPrev = tMs;
    const dx = (x - this.xHat) / dt;
    this.dxHat += alpha(this.params.dCutoff, dt) * (dx - this.dxHat);
    const cutoff = this.params.minCutoff + this.params.beta * Math.abs(this.dxHat);
    this.xHat += alpha(cutoff, dt) * (x - this.xHat);
    return this.xHat;
  }
}

/**
 * Glättungs-Regler 0 (kaum) … 1 (stark) → Filterparameter für Koordinaten in Bildschirmbruchteilen (0..1).
 * Stärker geglättet = kleinere Grenzfrequenz in Ruhe (8 Hz → 0,4 Hz) und weniger „Aufmachen“ bei schnellen Wechseln
 * (beta 3 → 0), damit man am Regler Ruhe und Verzögerung gegeneinander abwägen kann.
 */
export function smoothingToParams(s: number): OneEuroParams {
  const c = Math.min(1, Math.max(0, s));
  return { minCutoff: 8 * Math.pow(0.05, c), beta: 3 * (1 - c) * (1 - c), dCutoff: 1.5 };
}

/** Zwei Achsen gemeinsam. */
export class GazeFilter {
  private fx: OneEuroFilter;
  private fy: OneEuroFilter;

  constructor(smoothing = 0.5) {
    const p = smoothingToParams(smoothing);
    this.fx = new OneEuroFilter({ ...p });
    this.fy = new OneEuroFilter({ ...p });
  }

  setSmoothing(s: number): void {
    const p = smoothingToParams(s);
    this.fx.params = { ...p };
    this.fy.params = { ...p };
  }

  reset(): void {
    this.fx.reset();
    this.fy.reset();
  }

  filter(x: number, y: number, tMs: number): { x: number; y: number } {
    return { x: this.fx.filter(x, tMs), y: this.fy.filter(y, tMs) };
  }
}
