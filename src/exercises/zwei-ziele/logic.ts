/**
 * Zwei Ziele – reine Logik (ohne Canvas): Stufenfunktionen, sanft umherwandernde Kugeln,
 * Verlauf der „Stockung“ und Feldaufteilung.
 *
 * Stufe ist „höher = schwerer“: schnelleres Tempo, ab Stufe 8 zwei Kugeln je Hälfte,
 * kürzere Stockung. Alle Kugeln laufen mit EXAKT gleichem, konstantem Tempo – jede
 * Verlangsamung ist damit eindeutig die gesuchte Abweichung (und keine natürliche Kurve).
 */
import { clamp } from '../../core/stats';
import type { Bounds } from '../_shared/pursuit-logic';

export const ZZ_MIN_LEVEL = 1;
export const ZZ_MAX_LEVEL = 20;
/** Ab dieser Stufe zwei statt einer Kugel je Hälfte */
export const TWO_TARGETS_FROM = 8;

/** Tempo in u/s: Stufe 1 ≈ 2,5°/s, Stufe 20 ≈ 11°/s (Tablet, 40 cm) */
export const speedFor = (level: number): number => 11 * Math.pow(1.08, level - 1);

/** Dauer der Stockung in ms: 1100 → 380 (Stufe 19) */
export const deviationMsFor = (level: number): number => clamp(Math.round(1100 - 40 * (level - 1)), 380, 1100);

/** Kugeln je Hälfte: 1 → 2 */
export const targetsFor = (level: number): number => (level >= TWO_TARGETS_FROM ? 2 : 1);

/** Antwortfrist nach Beginn der Stockung (ms) */
export const answerWindowMs = (devMs: number): number => devMs + 1400;

/**
 * Tempofaktor während der Stockung, phi ∈ [0, 1] = Fortschritt der Stockung:
 * 1 → 0 → 1, mit ruhigem Halt in der Mitte (ca. 54 % der Dauer), weiche Übergänge (kein Ruck).
 */
export function deviationFactor(phi: number): number {
  if (phi <= 0 || phi >= 1) return 1;
  const s = Math.min(1, 1.5 * Math.sin(Math.PI * phi));
  return 1 - s * s * (3 - 2 * s);
}

/** Zufällige Seite (0 = links, 1 = rechts), aber nie dreimal hintereinander dieselbe */
export function pickSide(next: () => number, history: readonly number[]): number {
  let s = next() < 0.5 ? 0 : 1;
  const n = history.length;
  if (n >= 2 && history[n - 1] === s && history[n - 2] === s) s = 1 - s;
  return s;
}

export interface Fields {
  left: Bounds;
  right: Bounds;
  /** Fixierkreuz */
  cx: number;
  cy: number;
  /** halbe Armlänge des Kreuzes */
  cross: number;
}

/**
 * Felder für die Kugelmittelpunkte: spiegelbildlich um die Mitte, nie ganz am Rand
 * (Querformat höchstens 30 % der Bühnenbreite seitlich der Mitte, ≈ 10° auf dem Tablet).
 * Nie näher am Kreuz als 1 Kugelradius + Kreuz + Abstand.
 */
export function fieldsFor(w: number, h: number, top: number, barTop: number, u: number, r: number): Fields {
  const cx = w / 2;
  const cy = (top + barTop) / 2;
  const cross = clamp(2.6 * u, 14, 22);
  const inner = Math.max(0.06 * w, cross + r + 2 * u);
  let outer = w >= h ? 0.3 * w : 0.44 * w;
  outer = Math.max(outer, inner + 4 * r);
  outer = Math.min(outer, w / 2 - r - 4);
  const m = Math.max(6, u * 1.2);
  const minY = top + m + r;
  const maxY = Math.max(minY, barTop - m - r);
  return {
    left: { minX: cx - outer, maxX: cx - inner, minY, maxY },
    right: { minX: cx + inner, maxX: cx + outer, minY, maxY },
    cx,
    cy,
    cross,
  };
}

/** Kugel, die weich in einem Feld umherwandert (konstantes Tempo, weiche Kurven, Spiegelung am Rand) */
export class Wanderer {
  x: number;
  y: number;
  ang: number;
  private readonly phi1: number;
  private readonly phi2: number;

  constructor(x: number, y: number, ang: number, phi1: number, phi2: number) {
    this.x = x;
    this.y = y;
    this.ang = ang;
    this.phi1 = phi1;
    this.phi2 = phi2;
  }

  /**
   * dt Sekunden weiter. speed in px/s (Nenntempo), factor = Tempofaktor (Stockung), s = Sekunden seit
   * Start (für die langsame Richtungsschwankung), zone = Randabstand, ab dem sanft weggesteuert wird.
   */
  step(dt: number, speed: number, factor: number, s: number, B: Bounds, zone: number): void {
    // Richtung ändert sich weich: ω(s) = 1,2 · sin(0,8 s + φ1) · cos(0,33 s + φ2)
    let omega = 1.2 * Math.sin(0.8 * s + this.phi1) * Math.cos(0.33 * s + this.phi2);
    let ax = 0;
    let ay = 0;
    if (this.x - B.minX < zone) ax += 1 - (this.x - B.minX) / zone;
    if (B.maxX - this.x < zone) ax -= 1 - (B.maxX - this.x) / zone;
    if (this.y - B.minY < zone) ay += 1 - (this.y - B.minY) / zone;
    if (B.maxY - this.y < zone) ay -= 1 - (B.maxY - this.y) / zone;
    const mag = Math.hypot(ax, ay);
    if (mag > 1e-6) {
      const vx = Math.cos(this.ang);
      const vy = Math.sin(this.ang);
      const side = (vx * ay - vy * ax) / mag;
      const cos = (vx * ax + vy * ay) / mag;
      if (cos < 0.2) omega += 2.4 * Math.min(1, mag) * (side >= 0 ? 1 : -1) * Math.min(1, (0.2 - cos) / 0.4);
    }
    this.ang += omega * dt;
    const v = speed * factor;
    this.x += Math.cos(this.ang) * v * dt;
    this.y += Math.sin(this.ang) * v * dt;
    this.bounce(B);
  }

  private bounce(B: Bounds): void {
    if (this.x < B.minX || this.x > B.maxX) {
      const low = this.x < B.minX;
      const outward = low ? Math.cos(this.ang) < 0 : Math.cos(this.ang) > 0;
      this.x = clamp(outward ? 2 * (low ? B.minX : B.maxX) - this.x : this.x, B.minX, B.maxX);
      if (outward) this.ang = Math.PI - this.ang;
    }
    if (this.y < B.minY || this.y > B.maxY) {
      const low = this.y < B.minY;
      const outward = low ? Math.sin(this.ang) < 0 : Math.sin(this.ang) > 0;
      this.y = clamp(outward ? 2 * (low ? B.minY : B.maxY) - this.y : this.y, B.minY, B.maxY);
      if (outward) this.ang = -this.ang;
    }
  }
}

/** Zwei Kugeln im selben Feld drehen sanft voneinander weg und überlappen nie */
export function separate(a: Wanderer, b: Wanderer, minDist: number, B: Bounds, dt: number): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  if (d >= minDist * 1.6) return;
  const nx = d > 1e-6 ? dx / d : 1;
  const ny = d > 1e-6 ? dy / d : 0;
  // Zusteuern aufeinander → Richtung sanft wegdrehen
  for (const [o, sgn] of [[a, -1], [b, 1]] as const) {
    const vx = Math.cos(o.ang);
    const vy = Math.sin(o.ang);
    const toward = vx * nx * -sgn + vy * ny * -sgn; // > 0: fliegt auf den anderen zu
    if (toward > 0) {
      const cross = vx * ny * -sgn - vy * nx * -sgn;
      o.ang += (cross >= 0 ? -1 : 1) * 3 * toward * dt;
    }
  }
  if (d < minDist) {
    const push = (minDist - d) / 2;
    a.x = clamp(a.x - nx * push, B.minX, B.maxX);
    a.y = clamp(a.y - ny * push, B.minY, B.maxY);
    b.x = clamp(b.x + nx * push, B.minX, B.maxX);
    b.y = clamp(b.y + ny * push, B.minY, B.maxY);
  }
}
