/**
 * Diagonal-Korridor – reine Logik (Geometrie, Wandprüfung, Tempo-Protokoll), ohne Canvas und DOM.
 *
 * Eine Marke wird mit dem Finger durch einen geraden, schmalen Gang von einer Ecke des Spielfelds zur gegenüberliegenden
 * gezogen. Die Marke kann den Gang nie verlassen: Sie wird auf den freien Bereich begrenzt; wer die Wand berührt, sieht
 * sie am Rand gleiten (weicher Hinweis), es gibt keinen Rücksprung zum Start. Die Wegstrecke zwischen zwei Messpunkten wird
 * in kleinen Schritten geprüft, die Wand lässt sich also nicht „überspringen“ – unabhängig von der Bildrate.
 *
 * Stufen (1–12, höher = schwerer):
 * - Gangbreite 14 u → ≈ 6,3 u (u = 1 % der kürzeren Bühnenseite)
 * - Länge 55 % → 99 % der Felddiagonale
 * Zusätzlich wird Tempo und Gleichmäßigkeit mitprotokolliert; schnelleres Ziehen bringt keine Punkte.
 *
 * Wiederverwendet aus „Ruhige Hand“: Berührungszähler, Zeit-an-der-Wand, Fingerversatz, Greifradius.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { BALL_R_U, CLEAN_TOUCHES, fingerOffsetPx, grabRadiusPx, PathTime, pointsFor, TouchCounter } from '../ruhige-hand/logic';

export { BALL_R_U, CLEAN_TOUCHES, fingerOffsetPx, grabRadiusPx, PathTime, pointsFor, TouchCounter };

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

/** Gangbreite (Wand zu Wand) in u: 14 → ≈ 6,3 */
export function widthUFor(level: number): number {
  return 14 - 0.7 * (levelOf(level) - MIN_LEVEL);
}

/** Länge des Gangs als Anteil der Felddiagonale: 0,55 → 0,99 */
export function lengthFractionFor(level: number): number {
  return Math.min(1, 0.55 + 0.04 * (levelOf(level) - MIN_LEVEL));
}

/** Halbe freie Breite für die Markenmitte in u */
export function freeHalfWidthU(level: number, ballRu = BALL_R_U): number {
  return Math.max(0.4, widthUFor(level) / 2 - ballRu);
}

export interface Pt {
  x: number;
  y: number;
}

export interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/** Startecken: 0 = links oben → rechts unten, 1 = rechts unten → links oben, 2 = rechts oben → links unten, 3 = links unten → rechts oben */
export type Corner = 0 | 1 | 2 | 3;

export interface Diag {
  corner: Corner;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  len: number;
  /** Einheitsvektor Start → Ziel */
  ux: number;
  uy: number;
  /** Einheitsnormale (um 90° gedreht) */
  nx: number;
  ny: number;
  /** Breite Wand zu Wand in px */
  width: number;
  /** halbe freie Breite für die Markenmitte in px */
  free: number;
  ballR: number;
}

/** Gang von Ecke zu Ecke im Rechteck `r`; `pu` = px je u, `ballPx` = Markenradius in px */
export function makeDiag(r: Rect, corner: Corner, level: number, pu: number, ballPx: number): Diag {
  const cx = (r.x0 + r.x1) / 2;
  const cy = (r.y0 + r.y1) / 2;
  const pts: Record<Corner, [Pt, Pt]> = {
    0: [{ x: r.x0, y: r.y0 }, { x: r.x1, y: r.y1 }],
    1: [{ x: r.x1, y: r.y1 }, { x: r.x0, y: r.y0 }],
    2: [{ x: r.x1, y: r.y0 }, { x: r.x0, y: r.y1 }],
    3: [{ x: r.x0, y: r.y1 }, { x: r.x1, y: r.y0 }],
  };
  const f = lengthFractionFor(level);
  const [p0, p1] = pts[corner];
  const ax = cx + (p0.x - cx) * f;
  const ay = cy + (p0.y - cy) * f;
  const bx = cx + (p1.x - cx) * f;
  const by = cy + (p1.y - cy) * f;
  const len = Math.hypot(bx - ax, by - ay);
  const ux = (bx - ax) / Math.max(1e-9, len);
  const uy = (by - ay) / Math.max(1e-9, len);
  const width = widthUFor(level) * pu;
  const free = Math.max(0.4 * pu, width / 2 - ballPx);
  return { corner, ax, ay, bx, by, len, ux, uy, nx: -uy, ny: ux, width, free, ballR: ballPx };
}

/** Längs- und Querkoordinate eines Punktes (s ab Start, d senkrecht zur Mittellinie, mit Vorzeichen) */
export function project(d: Diag, x: number, y: number): { s: number; d: number } {
  const dx = x - d.ax;
  const dy = y - d.ay;
  return { s: dx * d.ux + dy * d.uy, d: dx * d.nx + dy * d.ny };
}

/** Punkt aus Längs- und Querkoordinate */
export function pointAt(d: Diag, s: number, dd: number): Pt {
  return { x: d.ax + d.ux * s + d.nx * dd, y: d.ay + d.uy * s + d.ny * dd };
}

export interface Clamped extends Pt {
  s: number;
  d: number;
  /** Markenmitte lag außerhalb des freien Bereichs (Wand berührt) */
  contact: boolean;
}

/** Zielpunkt des Fingers (abzüglich Versatz) auf den Gang begrenzen */
export function clampToDiag(dg: Diag, x: number, y: number): Clamped {
  const p = project(dg, x, y);
  const s = clamp(p.s, 0, dg.len);
  const contact = Math.abs(p.d) > dg.free + 1e-9;
  const d = clamp(p.d, -dg.free, dg.free);
  const q = pointAt(dg, s, d);
  return { x: q.x, y: q.y, s, d, contact };
}

/**
 * Marke von `from` (letzter Zielpunkt) zu `to` bewegen. Die Strecke wird in Schritten von höchstens `step` px geprüft;
 * `contact` ist wahr, wenn irgendein Schritt die Wand berührte. Das Ergebnis liegt immer im freien Bereich.
 */
export function moveAlong(dg: Diag, from: Pt, to: Pt, step = 3): Clamped {
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const n = Math.max(1, Math.ceil(dist / Math.max(0.5, step)));
  let contact = false;
  let last = clampToDiag(dg, to.x, to.y);
  for (let k = 1; k <= n; k++) {
    const q = k / n;
    const r = clampToDiag(dg, from.x + (to.x - from.x) * q, from.y + (to.y - from.y) * q);
    if (r.contact) contact = true;
    if (k === n) last = r;
  }
  return { ...last, contact: contact || last.contact };
}

/** Nächste Startecke: immer eine andere als die letzte, bevorzugt die Gegenrichtung (Ecken wechseln) */
export function nextCorner(rng: Rng, prev: Corner | null): Corner {
  if (prev === null) return rng.int(4) as Corner;
  const opposite: Record<Corner, Corner> = { 0: 1, 1: 0, 2: 3, 3: 2 };
  if (rng.chance(0.35)) return opposite[prev];
  const others = ([0, 1, 2, 3] as Corner[]).filter((c) => c !== prev && c !== opposite[prev]);
  return rng.pick(others);
}

/** Tempo und Gleichmäßigkeit: die Wegstrecke wird etwa alle 0,25 s Fingerzeit erfasst */
export class SpeedLog {
  static readonly WINDOW_S = 0.25;
  private acc = 0;
  private lastS = 0;
  private started = false;
  readonly speeds: number[] = [];
  /** Zeit, in der der Finger am Glas lag (s) */
  active = 0;

  /** dt in s, s = Längskoordinate der Marke (px) */
  add(dt: number, s: number): void {
    if (!this.started) {
      this.started = true;
      this.lastS = s;
    }
    this.active += dt;
    this.acc += dt;
    if (this.acc >= SpeedLog.WINDOW_S) {
      this.speeds.push((s - this.lastS) / this.acc);
      this.lastS = s;
      this.acc = 0;
    }
  }

  /** mittleres Tempo in px/s über alle erfassten Fenster */
  get meanSpeed(): number {
    if (!this.speeds.length) return 0;
    return this.speeds.reduce((a, b) => a + b, 0) / this.speeds.length;
  }

  /** Gleichmäßigkeit 0..100: 100 − 100·Variationskoeffizient des Tempos (begrenzt), 100 bei zu wenig Daten */
  get evenness(): number {
    const v = this.speeds;
    if (v.length < 3) return 100;
    const m = v.reduce((a, b) => a + b, 0) / v.length;
    if (m <= 1e-6) return 0;
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / v.length);
    return Math.round(100 * clamp(1 - sd / m, 0, 1));
  }
}
