/**
 * Zickzack-Bahn – Bahnberechnung (rein, ohne Canvas).
 *
 * Steile Schrägstrecken, die abwechselnd nach oben und nach unten führen, von links nach rechts und
 * wieder zurück. Das Ziel läuft mit gleichmäßigem Tempo, in den Knicken ohne Abbremsen (auch an den
 * beiden Enden kehrt es abrupt um). Alle Strecken sind gleich lang; die Gesamtbreite beträgt
 * höchstens 60 % der Bühnenbreite.
 *
 * Mit der Stufe wird der Knick schärfer: Der Neigungswinkel α der Strecken gegen die Waagrechte
 * steigt von 55° auf 80°, der Richtungswechsel im Knick (2 α) also von 110° auf 160°. Bei
 * Stufenwechsel wird der Winkel über ca. 0,7 s weich nachgeführt – das Ziel springt nie.
 *
 * Die Zeichenaufgabe gibt es nur auf geraden Teilstücken: `safeFor` meldet, ob das Ziel für die
 * Anzeigedauer weit genug von jedem Knick (und von den Enden) entfernt bleibt.
 */
import { approach, type Bounds, clampWidth, type Point, type PursuitTrack, pursuitSpeed } from '../_shared/pursuit-logic';
import { clamp } from '../../core/stats';

/** Neigung der Strecken gegen die Waagrechte in Grad: Stufe 1 → 55°, Stufe 20 → 80° */
export const ALPHA_MIN = 55;
export const ALPHA_MAX = 80;

export const angleFor = (level: number): number => {
  const k = clamp((Math.floor(level + 1e-9) - 1) / 19, 0, 1);
  return ALPHA_MIN + (ALPHA_MAX - ALPHA_MIN) * k;
};

/** Richtungswechsel im Knick in Grad (Winkel zwischen alter und neuer Laufrichtung) */
export const turnFor = (level: number): number => 2 * angleFor(level);

/** Tempo in u/s: Stufe 1 ≈ 3,7°/s, Stufe 20 ≈ 17°/s (Tablet, 40 cm) – die Knicke kommen als Schwierigkeit dazu */
export const speedFor = (level: number): number => pursuitSpeed(level, 16, 1.085);

/** Mindestlänge einer Strecke in u: genug Platz für Zeichen plus Abstand zu den Knicken */
export const MIN_SEGMENT_U = 28;
const MIN_SEGMENTS = 3;
const MAX_SEGMENTS = 6;
/** Zeitkonstante für das Nachführen des Winkels (s) */
const MORPH_TAU = 0.7;
/** Nach einem Knick braucht der Blick einen Moment, bevor das Zeichen erscheinen darf (s) */
export const RECOVER_S = 0.12;

/** Anzahl der Strecken: so viele, wie bei mindestens `MIN_SEGMENT_U` Streckenlänge (flachster Winkel) in die Breite passen */
export function segmentCount(width: number, u: number): number {
  const minDx = MIN_SEGMENT_U * u * Math.cos((ALPHA_MIN * Math.PI) / 180);
  return clamp(Math.floor(width / Math.max(1, minDx)), MIN_SEGMENTS, MAX_SEGMENTS);
}

/** Eckpunkte der Zickzacklinie: Start links unten, dann abwechselnd oben und unten */
export function zigzagVertices(n: number, left: number, cy: number, dx: number, dy: number): Point[] {
  const pts: Point[] = [];
  for (let k = 0; k <= n; k++) pts.push({ x: left + k * dx, y: cy + (k % 2 === 0 ? dy / 2 : -dy / 2) });
  return pts;
}

export class ZigzagTrack implements PursuitTrack {
  private pts: Point[] = [];
  private n = 4;
  private dx = 50;
  private dy = 100;
  private left = 0;
  private cy = 0;
  private maxDy = 100;
  private width = 200;
  private level = 1;
  /** Neigung aktuell (Grad), wird an `angleFor(level)` angenähert */
  private alpha = ALPHA_MIN;
  /** Strecke 0..n−1, Anteil 0..1 auf der Strecke (von links nach rechts gezählt), Laufrichtung */
  private seg = 0;
  private tt = 0;
  private dir: 1 | -1 = 1;
  private lastSpeed = 0;
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  /** Aktuelle Streckenlänge in px */
  get segmentLength(): number {
    return Math.hypot(this.dx, this.dy);
  }

  /** Zahl der Strecken (Knicke: n − 1 innen plus die beiden Enden) */
  get segments(): number {
    return this.n;
  }

  /** Aktuelle Neigung in Grad (nach Begrenzung auf die Feldhöhe) */
  get angle(): number {
    return (Math.atan2(this.dy, this.dx) * 180) / Math.PI;
  }

  layout(area: Bounds, stageW: number, u: number): void {
    this.width = clampWidth(stageW, area);
    this.n = segmentCount(this.width, u);
    this.dx = this.width / this.n;
    this.left = (area.minX + area.maxX) / 2 - this.width / 2;
    this.cy = (area.minY + area.maxY) / 2;
    this.maxDy = Math.max(2, area.maxY - area.minY);
    this.seg = Math.min(this.seg, this.n - 1);
    this.alpha = angleFor(this.level);
    this.rebuild();
  }

  setLevel(level: number): void {
    this.level = level;
  }

  begin(r: number, dir: 1 | -1): void {
    const x = (r - Math.floor(r)) * this.n;
    this.seg = Math.min(this.n - 1, Math.floor(x));
    this.tt = x - this.seg;
    this.dir = dir;
    this.alpha = angleFor(this.level);
    this.rebuild();
  }

  step(dt: number, speed: number): void {
    this.lastSpeed = speed;
    const target = angleFor(this.level);
    if (Math.abs(target - this.alpha) > 1e-3) {
      this.alpha = approach(this.alpha, target, dt, MORPH_TAU);
      this.rebuildShape();
    }
    let ds = speed * dt;
    // Strecke für Strecke abarbeiten; an den Enden ohne Abbremsen umkehren
    for (let guard = 0; ds > 1e-9 && guard < 64; guard++) {
      const len = this.segmentLength;
      const rem = this.dir > 0 ? (1 - this.tt) * len : this.tt * len;
      if (ds < rem) {
        this.tt += (this.dir * ds) / len;
        ds = 0;
        break;
      }
      ds -= rem;
      if (this.dir > 0) {
        if (this.seg >= this.n - 1) {
          this.dir = -1;
          this.tt = 1;
        } else {
          this.seg++;
          this.tt = 0;
        }
      } else if (this.seg <= 0) {
        this.dir = 1;
        this.tt = 0;
      } else {
        this.seg--;
        this.tt = 1;
      }
    }
    this.place();
  }

  cruise(): number {
    return 1;
  }

  outline(): readonly Point[] {
    return this.pts;
  }

  /** Abstand zum nächsten Knick in Laufrichtung und zum letzten Knick dahinter (px) */
  distances(): { ahead: number; behind: number } {
    const len = this.segmentLength;
    return this.dir > 0
      ? { ahead: (1 - this.tt) * len, behind: this.tt * len }
      : { ahead: this.tt * len, behind: (1 - this.tt) * len };
  }

  safeFor(seconds: number, margin: number): boolean {
    const v = this.lastSpeed;
    const { ahead, behind } = this.distances();
    return behind >= margin + RECOVER_S * v && ahead >= margin + v * seconds;
  }

  private rebuild(): void {
    this.rebuildShape();
    this.place();
  }

  private rebuildShape(): void {
    const a = (this.alpha * Math.PI) / 180;
    this.dy = Math.min(this.dx * Math.tan(a), this.maxDy);
    this.pts = zigzagVertices(this.n, this.left, this.cy, this.dx, this.dy);
  }

  private place(): void {
    const a = this.pts[this.seg];
    const b = this.pts[this.seg + 1];
    this.current = { x: a.x + (b.x - a.x) * this.tt, y: a.y + (b.y - a.y) * this.tt };
  }
}
