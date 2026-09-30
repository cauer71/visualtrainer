/**
 * Liegende Acht – Bahnberechnung (rein, ohne Canvas).
 *
 * Bernoullische Lemniskate x = cos t / (1 + sin² t), y = sin t · cos t / (1 + sin² t) – die echte
 * Form, unabhängig vom Seitenverhältnis der Bühne (kein Verzerren). Das Ziel läuft mit
 * gleichmäßigem Tempo entlang der Bogenlänge (auch im Kreuzungspunkt und in den Schleifen).
 * Breite höchstens 60 % der Bühnenbreite.
 */
import {
  ArcTable,
  type Bounds,
  MAX_TRACK_WIDTH,
  type Point,
  type PursuitTrack,
  pursuitSpeed,
} from '../_shared/pursuit-logic';

/** größte Auslenkung in y für a = 1 (1 / (2 √2)) */
export const LEMNISCATE_HALF_HEIGHT = 1 / (2 * Math.SQRT2);
const SAMPLES = 360;

/** Tempo in u/s: Stufe 1 ≈ 4°/s, Stufe 20 ≈ 25°/s (Tablet, 40 cm) */
export const speedFor = (level: number): number => pursuitSpeed(level, 18, 1.1);

export function lemniscatePoint(t: number): Point {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const k = 1 + s * s;
  return { x: c / k, y: (s * c) / k };
}

/** Halbe Breite a der Acht so, dass sie ins Feld passt und höchstens 60 % der Bühnenbreite misst */
export function lemniscateHalfWidth(area: Bounds, stageW: number): number {
  const halfW = (area.maxX - area.minX) / 2;
  const halfH = (area.maxY - area.minY) / 2;
  return Math.max(4, Math.min((MAX_TRACK_WIDTH * stageW) / 2, halfW, halfH / LEMNISCATE_HALF_HEIGHT));
}

export class LemniscateTrack implements PursuitTrack {
  private table: ArcTable = new ArcTable([{ x: 0, y: 0 }], false);
  /** Fortschritt 0..1 auf der Acht (bleibt bei Größenänderung erhalten) */
  private phase = 0;
  private dir: 1 | -1 = 1;
  private a = 1;
  private cx = 0;
  private cy = 0;
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  layout(area: Bounds, stageW: number, _u?: number): void {
    this.a = lemniscateHalfWidth(area, stageW);
    this.cx = (area.minX + area.maxX) / 2;
    this.cy = (area.minY + area.maxY) / 2;
    const pts: Point[] = [];
    for (let i = 0; i < SAMPLES; i++) {
      const p = lemniscatePoint((i / SAMPLES) * Math.PI * 2);
      pts.push({ x: this.cx + p.x * this.a, y: this.cy + p.y * this.a });
    }
    this.table = new ArcTable(pts, true);
    this.place();
  }

  setLevel(): void {
    // Die Form der Acht bleibt auf allen Stufen gleich – nur Tempo, Zeichen und Hilfslinie ändern sich.
  }

  begin(r: number, dir: 1 | -1): void {
    this.phase = r - Math.floor(r);
    this.dir = dir;
    this.place();
  }

  step(dt: number, speed: number): void {
    const L = this.table.length;
    if (L <= 0) return;
    this.phase += (this.dir * speed * dt) / L;
    this.phase -= Math.floor(this.phase);
    this.place();
  }

  cruise(): number {
    return 1;
  }

  outline(): readonly Point[] {
    return this.table.points;
  }

  private place(): void {
    this.current = this.table.at(this.phase * this.table.length);
  }
}
