// EYE-EXPERIMENT: Zähler für Bildrate und Verarbeitungszeit – rein, zeitgesteuert.

/** Ereignisse pro Sekunde über ein gleitendes Zeitfenster. */
export class RateMeter {
  private times: number[] = [];

  constructor(private windowMs = 1000) {}

  tick(tMs: number): void {
    this.times.push(tMs);
    this.trim(tMs);
  }

  private trim(nowMs: number): void {
    const lim = nowMs - this.windowMs;
    while (this.times.length && this.times[0] < lim) this.times.shift();
  }

  /** Ereignisse pro Sekunde zum Zeitpunkt `nowMs` (0, wenn zu wenige Ereignisse im Fenster). */
  rate(nowMs: number): number {
    this.trim(nowMs);
    if (this.times.length < 2) return 0;
    const span = this.times[this.times.length - 1] - this.times[0];
    return span > 0 ? ((this.times.length - 1) * 1000) / span : 0;
  }

  reset(): void {
    this.times = [];
  }
}

/** Mittel und Maximum über die letzten n Werte. */
export class RollingStats {
  private v: number[] = [];

  constructor(private n = 120) {}

  push(x: number): void {
    this.v.push(x);
    if (this.v.length > this.n) this.v.shift();
  }

  get count(): number {
    return this.v.length;
  }

  get mean(): number {
    return this.v.length ? this.v.reduce((s, x) => s + x, 0) / this.v.length : 0;
  }

  get max(): number {
    return this.v.length ? Math.max(...this.v) : 0;
  }

  reset(): void {
    this.v = [];
  }
}
