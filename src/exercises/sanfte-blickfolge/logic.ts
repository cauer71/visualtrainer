/**
 * Sanfte Blickfolge – Bahnberechnung (rein, ohne Canvas).
 *
 * Lissajous-Figur x = A · sin 2t, y = B · sin 3t (Verhältnis 2 : 3) – eine weiche, in sich
 * geschlossene Schlaufenbahn mit waagrechten und senkrechten Anteilen (mehr senkrechter Anteil als
 * die flache „Liegende Acht“). Das Original nutzt 3 : 4; diese Figur hat aber noch engere
 * Wendestellen. Die Breite beträgt höchstens 60 % der Bühnenbreite (Kopf möglichst ruhig, wichtig
 * bei Gleitsicht); die Form ist auf allen Stufen gleich.
 *
 * Tempo: Das Ziel läuft entlang der Bogenlänge (nicht mit gleichem Zeitschritt in t, sonst wäre es
 * an den Wendestellen sehr langsam und in der Mitte schnell – im Original schwankt es um den
 * Faktor ≈ 5). Jede Lissajous-Figur hat aber Wendestellen mit kleinem Krümmungsradius; bei
 * gleichem Tempo wäre das dort ein Haarnadelknick, nicht „sanft“. Darum bremst das Ziel nur in den
 * engsten Bögen leicht ab (Tempofaktor (r / r₀)^(1/3), nie unter 0,55 – so verlangsamt auch das
 * Auge selbst in Kurven, „Zwei-Drittel-Gesetz“); überall sonst läuft es mit vollem Tempo. Das
 * Zeichen erscheint nur bei fast vollem Tempo (`cruise()` ≥ 0,85, siehe Kern).
 *
 * Das Tempo steigt stufenweise: Innerhalb einer ganzen Stufe bleibt es gleich (der Kern führt
 * Tempowechsel weich nach).
 */
import { ArcTable, type Bounds, MAX_TRACK_WIDTH, type Point, type PursuitTrack, pursuitSpeed } from '../_shared/pursuit-logic';
import { clamp } from '../../core/stats';

/** Schwingungszahlen der Figur (waagrecht : senkrecht) */
export const LISSAJOUS_A = 2;
export const LISSAJOUS_B = 3;
/** Phasenversatz der waagrechten Schwingung */
export const LISSAJOUS_PHASE = 0;
const SAMPLES = 3600;
/** Punkte der gleichmäßig nach Bogenlänge verteilten Bahn (Hilfslinie, Tempotabelle) */
const RESAMPLE = 1200;
/** Ab diesem Krümmungsradius (in u) läuft das Ziel mit vollem Tempo */
export const FULL_SPEED_RADIUS_U = 10;
/** kleinster Tempofaktor in den engsten Bögen */
export const MIN_SPEED_FACTOR = 0.55;

/**
 * Tempo in u/s, stufenweise: Stufe 1 ≈ 5°/s, Stufe 20 ≈ 24°/s (Tablet, 40 cm).
 * Zwischenwerte (z. B. Stufe 6,5) zählen zur unteren ganzen Stufe.
 */
export const speedFor = (level: number): number => pursuitSpeed(Math.floor(level + 1e-9), 22, 1.085);

/** Punkt der Figur für den Parameter t, normiert auf −1 … 1 in beiden Richtungen */
export function lissajousPoint(t: number): Point {
  return { x: Math.sin(LISSAJOUS_A * t + LISSAJOUS_PHASE), y: Math.sin(LISSAJOUS_B * t) };
}

/** Halbe Breite A und halbe Höhe B: passt ins Feld, Breite höchstens 60 % der Bühnenbreite */
export function lissajousHalfSize(area: Bounds, stageW: number): { a: number; b: number } {
  const halfW = (area.maxX - area.minX) / 2;
  const halfH = (area.maxY - area.minY) / 2;
  return { a: Math.max(4, Math.min((MAX_TRACK_WIDTH * stageW) / 2, halfW)), b: Math.max(4, halfH) };
}

/** Tempofaktor (MIN_SPEED_FACTOR … 1) für einen Krümmungsradius r (px), r₀ = Radius für vollen Tempo (px) */
export function speedFactorForRadius(r: number, r0: number): number {
  return clamp(Math.pow(Math.max(r, 1e-6) / Math.max(r0, 1e-6), 1 / 3), MIN_SPEED_FACTOR, 1);
}

export class LissajousTrack implements PursuitTrack {
  private table: ArcTable = new ArcTable([{ x: 0, y: 0 }], false);
  private factor: number[] = [1];
  /** Fortschritt 0..1 auf der Figur (bleibt bei Größenänderung erhalten) */
  private phase = 0;
  private dir: 1 | -1 = 1;
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  layout(area: Bounds, stageW: number, u = 8): void {
    const { a, b } = lissajousHalfSize(area, stageW);
    const cx = (area.minX + area.maxX) / 2;
    const cy = (area.minY + area.maxY) / 2;
    const raw: Point[] = [];
    for (let i = 0; i < SAMPLES; i++) {
      const p = lissajousPoint((i / SAMPLES) * Math.PI * 2);
      raw.push({ x: cx + p.x * a, y: cy + p.y * b });
    }
    // gleichmäßig nach Bogenlänge neu verteilen
    const fine = new ArcTable(raw, true);
    const pts: Point[] = [];
    for (let i = 0; i < RESAMPLE; i++) pts.push(fine.at((i / RESAMPLE) * fine.length));
    this.table = new ArcTable(pts, true);
    this.factor = speedFactors(pts, this.table.length / RESAMPLE, FULL_SPEED_RADIUS_U * u);
    this.place();
  }

  setLevel(): void {
    // Die Form bleibt auf allen Stufen gleich – nur Tempo, Zeichen und Hilfslinie ändern sich.
  }

  begin(r: number, dir: 1 | -1): void {
    this.phase = r - Math.floor(r);
    this.dir = dir;
    this.place();
  }

  step(dt: number, speed: number): void {
    const L = this.table.length;
    if (L <= 0) return;
    // Mittelpunktsverfahren: Tempofaktor am halben Weg des Schritts
    const k1 = this.factorAt(this.phase);
    const mid = this.phase + (0.5 * this.dir * speed * dt * k1) / L;
    const k2 = this.factorAt(mid);
    this.phase += (this.dir * speed * dt * k2) / L;
    this.phase -= Math.floor(this.phase);
    this.place();
  }

  /** Tempofaktor an der aktuellen Stelle: 1 = volles Tempo, in den engsten Bögen bis 0,55 */
  cruise(): number {
    return this.factorAt(this.phase);
  }

  outline(): readonly Point[] {
    return this.table.points;
  }

  /** Tempofaktor an der Stelle phase ∈ ℝ (modulo 1), linear zwischen den Stützpunkten */
  factorAt(phase: number): number {
    const n = this.factor.length;
    const q = (phase - Math.floor(phase)) * n;
    const i = Math.floor(q) % n;
    const f = q - Math.floor(q);
    return this.factor[i] * (1 - f) + this.factor[(i + 1) % n] * f;
  }

  private place(): void {
    this.current = this.table.at(this.phase * this.table.length);
  }
}

/** Tempofaktoren je Stützpunkt aus dem Krümmungsradius (Kreis durch drei Nachbarpunkte), leicht geglättet */
export function speedFactors(pts: readonly Point[], spacing: number, r0: number): number[] {
  const n = pts.length;
  const f: number[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const a1 = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    const a2 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let da = Math.abs(a2 - a1);
    if (da > Math.PI) da = 2 * Math.PI - da;
    const r = da < 1e-9 ? Infinity : spacing / da;
    f.push(speedFactorForRadius(r, r0));
  }
  // Der Faktor soll von Stelle zu Stelle weich wechseln: Glättung mit σ ≈ r₀ / 5 (je Durchgang σ² = ½ Stützpunkt²)
  const sigma = r0 / 5 / Math.max(spacing, 1e-6);
  const passes = Math.min(300, Math.max(2, Math.round(2 * sigma * sigma)));
  let cur = f;
  for (let k = 0; k < passes; k++) {
    const next: number[] = new Array(n);
    for (let i = 0; i < n; i++) next[i] = (cur[(i + n - 1) % n] + 2 * cur[i] + cur[(i + 1) % n]) / 4;
    cur = next;
  }
  return cur;
}
