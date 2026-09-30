/**
 * Kurvenbahn folgen – reine Logik (Bewegungsregel für den Kern `_shared/nachfuehren.ts`).
 *
 * Das Ziel läuft ununterbrochen auf einer weichen, geschlossenen Kurve (Lissajous-Bahn) kreuz und quer über das Feld –
 * ohne Halt und ohne Knick. Der Start ist sanft (Tempo wächst in 1,5 s), danach bleibt das Tempo nahezu gleich.
 * Die Marke folgt dem Finger in beiden Richtungen (Achse 'xy'); ein kurzes Stück der Bahn voraus ist als gestrichelte
 * Linie zu sehen (Vorschau), damit man vorausplanen kann – nachgeführt wird aber die Zielmarke.
 *
 * Stufe: Bahnform einfacher (Verhältnis 1 : 2) bis verschlungener (3 : 4), mittleres Tempo 6 → ≈ 18 u/s.
 * Jeder Durchgang hat eine andere Phasenlage (andere Kurve); Bahnen mit fast stehendem Ziel werden aussortiert.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { MAX_LEVEL, MIN_LEVEL, rampTime, type RuleSetup, type TrackRule, type Vec } from '../_shared/nachfuehren-logic';

/** Zeit, in der das Tempo von 0 auf das volle Tempo wächst (s) */
export const START_RAMP_S = 1.5;

/** Mittleres Bahntempo (u/s) */
export function speedFor(level: number): number {
  return 6 + 1.2 * (clamp(level, MIN_LEVEL, MAX_LEVEL) - 1);
}

/** Frequenzverhältnis (a : b) der Bahn: einfach → verschlungener */
export function ratioFor(level: number): [number, number] {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  if (lv <= 3) return [1, 2];
  if (lv <= 7) return [2, 3];
  return [3, 4];
}

/** Vorschau der Bahn (s), kürzer bei höherer Stufe */
export function previewFor(level: number): number {
  return 1.2 - 0.05 * (clamp(level, MIN_LEVEL, MAX_LEVEL) - 1);
}

export class CurveRule implements TrackRule {
  readonly ax: number;
  readonly ay: number;
  /** Kreisfrequenzen (rad/s) */
  readonly wx: number;
  readonly wy: number;
  readonly px: number;
  readonly py: number;
  readonly speed: number;
  /** kleinstes Tempo entlang der Bahn im Verhältnis zum mittleren (Schutz vor Stillstand) */
  readonly minSpeedRatio: number;

  constructor(rng: Rng, level: number, hw: number, hh: number) {
    this.ax = Math.max(3, hw * 0.92);
    this.ay = Math.max(3, hh * 0.92);
    const [a, b] = ratioFor(level);
    this.speed = speedFor(level);
    // Phasen: zufällig, aber Bahnen mit fast stehendem Ziel (entartete Lissajous-Figuren) aussortieren
    let best = { px: 0, py: 0, ratio: -1 };
    // (Je verschlungener die Bahn, desto kleiner das erreichbare Mindesttempo: 1:2 ≈ 0,6, 2:3 ≈ 0,45, 3:4 ≈ 0,33 vom Mittel.)
    const accept = 0.72 * (a === 1 ? 0.63 : a === 2 ? 0.45 : 0.33);
    for (let i = 0; i < 60; i++) {
      const px = rng.range(0, Math.PI * 2);
      const py = rng.range(0, Math.PI * 2);
      const r = CurveRule.minSpeedRatioOf(this.ax, this.ay, a, b, px, py);
      if (r > best.ratio) best = { px, py, ratio: r };
      if (r >= accept) break;
    }
    this.px = best.px;
    this.py = best.py;
    this.minSpeedRatio = best.ratio;
    // Zeitmaßstab so, dass die mittlere Geschwindigkeit (Effektivwert) dem Stufentempo entspricht
    const k = (Math.SQRT2 * this.speed) / Math.hypot(this.ax * a, this.ay * b);
    this.wx = k * a;
    this.wy = k * b;
  }

  /** Verhältnis kleinstes zu mittlerem Tempo einer Bahn (Parameter t in [0, 2π), Frequenzen a, b) */
  static minSpeedRatioOf(ax: number, ay: number, a: number, b: number, px: number, py: number): number {
    const n = 720;
    let min = Infinity;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const t = (2 * Math.PI * i) / n;
      const vx = ax * a * Math.cos(a * t + px);
      const vy = ay * b * Math.cos(b * t + py);
      const v = Math.hypot(vx, vy);
      min = Math.min(min, v);
      sum += v;
    }
    return sum > 0 ? min / (sum / n) : 0;
  }

  target(s: number): Vec {
    const t = rampTime(s, START_RAMP_S);
    return { x: this.ax * Math.sin(this.wx * t + this.px), y: this.ay * Math.sin(this.wy * t + this.py) };
  }

  /** Bahngeschwindigkeit (u/s) zur Zeit s (für Tests) */
  speedAt(s: number): number {
    const h = 1e-3;
    const p = this.target(s - h);
    const q = this.target(s + h);
    return Math.hypot(q.x - p.x, q.y - p.y) / (2 * h);
  }
}

export function makeRule(setup: RuleSetup): TrackRule {
  return new CurveRule(setup.rng, setup.level, setup.hw, setup.hh);
}
