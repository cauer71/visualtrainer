/**
 * Dreiecksbahn – Bahnberechnung (rein, ohne Canvas).
 *
 * Gleichseitiges Dreieck (echte Form, unabhängig vom Seitenverhältnis der Bühne), Spitze oben. Das
 * Ziel läuft mit gleichmäßigem Tempo (auf allen drei Kanten gleich viele °/s) im oder gegen den
 * Uhrzeigersinn. In den Ecken ändert sich die Richtung abrupt um 120°; auf niedrigen Stufen sind
 * die Ecken abgerundet (Radius bis 10 % der Kantenlänge), ab Stufe 9 sind sie spitz. Breite
 * höchstens 60 % der Bühnenbreite.
 *
 * Stetigkeit beim Stufenwechsel: Der Fortschritt `p` zählt entlang des *spitzen* Dreiecks
 * (Umfang 3 a). Auf den geraden Stücken liegt das Ziel damit immer exakt auf der Kante, und wenn
 * sich der Rundungsradius ändert, springt es nie – nur die Ecken verformen sich weich. In der
 * Rundung läuft `p` um den Faktor κ = 2 t / (r θ) schneller, damit das Tempo entlang des echten
 * Wegs konstant bleibt (t = Tangentenlänge, r = Radius, θ = 120°).
 *
 * Die Zeichenaufgabe gibt es nur auf geraden Teilstücken: `safeFor` meldet, ob das Ziel für die
 * Anzeigedauer weit genug von jeder Ecke entfernt bleibt.
 */
import { approach, type Bounds, clampWidth, type Point, type PursuitTrack, pursuitSpeed } from '../_shared/pursuit-logic';
import { clamp } from '../../core/stats';

const SQRT3 = Math.sqrt(3);
/** Richtungswechsel in jeder Ecke des gleichseitigen Dreiecks (Außenwinkel) */
export const CORNER_TURN = (2 * Math.PI) / 3;
/** Verhältnis Weg auf dem spitzen Dreieck zu Weg auf der Rundung: 2 t / (r θ) mit t = r · √3 */
export const KAPPA = (2 * SQRT3) / CORNER_TURN;

/** Rundungsradius als Anteil der Kantenlänge: Stufe 1 → 0,10, Stufe ≥ 9 → 0 (spitz) */
export const cornerRadiusFraction = (level: number): number => 0.1 * clamp((9 - Math.floor(level + 1e-9)) / 8, 0, 1);

/** Tempo in u/s: Stufe 1 ≈ 3,7°/s, Stufe 20 ≈ 16°/s (Tablet, 40 cm) */
export const speedFor = (level: number): number => pursuitSpeed(level, 16, 1.08);

/** Nach einer Ecke braucht der Blick einen Moment, bevor das Zeichen erscheinen darf (s) */
export const RECOVER_S = 0.12;
const MORPH_TAU = 0.7;
const OUTLINE_SAMPLES = 360;
const EPS = 1e-7;

/** Kantenlänge a: echtes gleichseitiges Dreieck, höchstens 60 % der Bühnenbreite, passt ins Feld */
export function triangleSide(area: Bounds, stageW: number): number {
  const h = area.maxY - area.minY;
  return Math.max(12, Math.min(clampWidth(stageW, area), (2 * h) / SQRT3));
}

export class TriangleTrack implements PursuitTrack {
  private a = 300;
  private cx = 0;
  private cy = 0;
  private v: Point[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  /** Einheitsvektoren der drei Kanten V0→V1, V1→V2, V2→V0 */
  private e: Point[] = [
    { x: 1, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 0 },
  ];
  private level = 1;
  /** aktueller und Ziel-Rundungsradius (px) */
  private r = 0;
  private dir: 1 | -1 = 1;
  /** Fortschritt entlang des spitzen Dreiecks, 0 … 3 a */
  private p = 0;
  private lastSpeed = 0;
  private pts: Point[] = [];
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  /** Kantenlänge in px */
  get side(): number {
    return this.a;
  }

  /** Aktueller Rundungsradius in px (0 = spitze Ecken) */
  get radius(): number {
    return this.r;
  }

  layout(area: Bounds, stageW: number, _u?: number): void {
    const frac = this.a > 0 ? this.p / (3 * this.a) : 0;
    this.a = triangleSide(area, stageW);
    this.cx = (area.minX + area.maxX) / 2;
    this.cy = (area.minY + area.maxY) / 2;
    const h = (this.a * SQRT3) / 2;
    this.v = [
      { x: this.cx, y: this.cy - h / 2 },
      { x: this.cx + this.a / 2, y: this.cy + h / 2 },
      { x: this.cx - this.a / 2, y: this.cy + h / 2 },
    ];
    this.e = [0, 1, 2].map((k) => {
      const A = this.v[k];
      const B = this.v[(k + 1) % 3];
      return { x: (B.x - A.x) / this.a, y: (B.y - A.y) / this.a };
    });
    this.p = frac * 3 * this.a;
    this.r = this.targetRadius();
    this.rebuild();
  }

  setLevel(level: number): void {
    this.level = level;
  }

  begin(r: number, dir: 1 | -1): void {
    this.p = (r - Math.floor(r)) * 3 * this.a;
    this.dir = dir;
    this.r = this.targetRadius();
    this.rebuild();
  }

  step(dt: number, speed: number): void {
    this.lastSpeed = speed;
    const target = this.targetRadius();
    if (Math.abs(target - this.r) > 1e-3) {
      this.r = Math.abs(target - this.r) < 0.05 ? target : approach(this.r, target, dt, MORPH_TAU);
      this.buildOutline();
    }
    const t = this.tangent();
    const a = this.a;
    const total = 3 * a;
    let ds = speed * dt;
    // Gerade Stücke (Rate 1) und Rundungen (Rate κ) nacheinander abarbeiten
    for (let guard = 0; ds > 1e-9 && guard < 64; guard++) {
      const { d } = this.edgeOf(this.p);
      let inZone: boolean;
      let remP: number; // Rest bis zur Grenze des Abschnitts in Laufrichtung, in p-Einheiten
      if (t > 1e-6 && d < t) {
        inZone = true;
        remP = this.dir > 0 ? t - d : d + t;
      } else if (t > 1e-6 && d > a - t) {
        inZone = true;
        remP = this.dir > 0 ? a + t - d : d - (a - t);
      } else {
        inZone = false;
        remP = this.dir > 0 ? a - t - d : d - t;
      }
      const rate = inZone ? KAPPA : 1;
      const remTrue = remP / rate;
      if (ds < remTrue) {
        this.p += this.dir * ds * rate;
        ds = 0;
      } else {
        this.p += this.dir * (remP + EPS);
        ds -= remTrue;
      }
      this.p -= Math.floor(this.p / total) * total;
    }
    this.place();
  }

  cruise(): number {
    return 1;
  }

  outline(): readonly Point[] {
    return this.pts;
  }

  /** Abstand zur nächsten Ecke (bzw. Rundung) in Laufrichtung und zur letzten dahinter (px); null in der Rundung */
  distances(): { ahead: number; behind: number } | null {
    const t = this.tangent();
    const { d } = this.edgeOf(this.p);
    if (t > 1e-6 && (d < t || d > this.a - t)) return null;
    const fwd = this.a - t - d;
    const back = d - t;
    return this.dir > 0 ? { ahead: fwd, behind: back } : { ahead: back, behind: fwd };
  }

  safeFor(seconds: number, margin: number): boolean {
    const v = this.lastSpeed;
    const dist = this.distances();
    if (!dist) return false;
    return dist.behind >= margin + RECOVER_S * v && dist.ahead >= margin + v * seconds;
  }

  /** Punkt auf der Bahn für den Fortschritt p (für den aktuellen Rundungsradius) */
  pointAt(p: number): Point {
    const a = this.a;
    const t = this.tangent();
    const { e, d } = this.edgeOf(p);
    if (t > 1e-6 && d < t) return this.arcPoint(e, (d + t) / (2 * t));
    if (t > 1e-6 && d > a - t) return this.arcPoint((e + 1) % 3, (d - (a - t)) / (2 * t));
    const V = this.v[e];
    const u = this.e[e];
    return { x: V.x + u.x * d, y: V.y + u.y * d };
  }

  private targetRadius(): number {
    return cornerRadiusFraction(this.level) * this.a;
  }

  /** Tangentenlänge t = r · tan(θ/2) = r · √3 */
  private tangent(): number {
    return this.r * SQRT3;
  }

  private edgeOf(p: number): { e: number; d: number } {
    const total = 3 * this.a;
    const q = p - Math.floor(p / total) * total;
    const e = Math.min(2, Math.floor(q / this.a));
    return { e, d: q - e * this.a };
  }

  /** Punkt auf der Rundung an Ecke k, φ ∈ [0, 1] von der Tangente auf der Vorkante zur Tangente auf der Folgekante */
  private arcPoint(k: number, phi: number): Point {
    const t = this.tangent();
    const r = this.r;
    const uIn = this.e[(k + 2) % 3];
    const uOut = this.e[k];
    const V = this.v[k];
    const tin = { x: V.x - uIn.x * t, y: V.y - uIn.y * t };
    const cross = uIn.x * uOut.y - uIn.y * uOut.x;
    const s = cross >= 0 ? 1 : -1;
    // linke Normale der Einlaufrichtung; Mittelpunkt auf der Seite, zu der die Bahn abbiegt
    const n = { x: -uIn.y, y: uIn.x };
    const c = { x: tin.x + s * r * n.x, y: tin.y + s * r * n.y };
    const w0 = { x: -s * r * n.x, y: -s * r * n.y };
    const ang = s * phi * CORNER_TURN;
    const co = Math.cos(ang);
    const si = Math.sin(ang);
    return { x: c.x + w0.x * co - w0.y * si, y: c.y + w0.x * si + w0.y * co };
  }

  private rebuild(): void {
    this.buildOutline();
    this.place();
  }

  private buildOutline(): void {
    const pts: Point[] = [];
    const total = 3 * this.a;
    for (let i = 0; i <= OUTLINE_SAMPLES; i++) pts.push(this.pointAt((i / OUTLINE_SAMPLES) * total));
    this.pts = pts;
  }

  private place(): void {
    this.current = this.pointAt(this.p);
  }
}
