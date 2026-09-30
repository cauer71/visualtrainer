/**
 * Höhenwechsel-Bahn – bahnberechnung (rein, ohne Canvas).
 *
 * Eine Treppenbahn: Das Ziel läuft mit gleichmäßigem Tempo fast waagerecht von einer Seite zur
 * anderen und zurück und wird dabei Strecke für Strecke ein Stück tiefer, unten angekommen geht es
 * denselben Weg wieder hinauf (Stufen: links/rechts abwechselnd, die Höhe wächst je Strecke um einen
 * festen Schritt). Die Höhe ändert sich also langsam – nur ein kleiner Teil der Bewegung ist senkrecht.
 * In den Wendepunkten kehrt das Ziel ohne Abbremsen um, auch an den beiden Enden der Treppe.
 *
 * Mit der Stufe wächst der Höhenunterschied der ganzen Treppe: von 12 u auf ≈ 56 u (1 u = 1 % der
 * kürzeren Seite), bei gleich bleibender Breite (höchstens 60 % der Bühnenbreite) wird der
 * Höhenwechsel je Strecke also größer (Neigung ≈ 1° → ≈ 6° am Tablet quer). Bei Stufenwechsel wird
 * die Höhe über ca. 0,7 s weich nachgeführt – das Ziel springt nie.
 *
 * Die Zeichenaufgabe gibt es nur auf geraden Teilstücken: `safeFor` meldet, ob das Ziel für die
 * Anzeigedauer weit genug von jedem Wendepunkt (und von den Enden) entfernt bleibt.
 */
import { clamp } from '../../core/stats';
import { approach, type Bounds, clampWidth, type Point, type PursuitTrack, pursuitSpeed } from '../_shared/pursuit-logic';

/** Anzahl der Strecken der Treppe (7 Eckpunkte) */
export const SEGMENTS = 6;

/** Höhe der ganzen Treppe in u: Stufe 1 → 12 u, Stufe 20 → ≈ 55,7 u */
export const heightUFor = (level: number): number => 12 + 2.3 * (clamp(Math.floor(level + 1e-9), 1, 20) - 1);

/** Tempo in u/s: Stufe 1 ≈ 3,5°/s, Stufe 20 ≈ 15°/s (Tablet, 40 cm) */
export const speedFor = (level: number): number => pursuitSpeed(level, 15, 1.08);

/** Zeitkonstante für das Nachführen der Höhe (s) */
const MORPH_TAU = 0.7;
/** Nach einem Wendepunkt braucht der Blick einen Moment, bevor das Zeichen erscheinen darf (s) */
export const RECOVER_S = 0.12;

/** Eckpunkte der Treppe: x abwechselnd links/rechts, y gleichmäßig von oben nach unten */
export function stairVertices(n: number, left: number, right: number, cy: number, height: number): Point[] {
  const pts: Point[] = [];
  for (let k = 0; k <= n; k++) pts.push({ x: k % 2 === 0 ? left : right, y: cy - height / 2 + (height * k) / n });
  return pts;
}

export class StairTrack implements PursuitTrack {
  private pts: Point[] = [];
  private left = 0;
  private width = 200;
  private cy = 0;
  private maxH = 100;
  private u = 8;
  private level = 1;
  /** Höhe der ganzen Treppe aktuell (px), wird an `heightUFor(level)` angenähert */
  private h = 100;
  /** Strecke 0..n−1, Anteil 0..1 auf der Strecke (vom Eckpunkt k zu k+1), Laufrichtung */
  private seg = 0;
  private tt = 0;
  private dir: 1 | -1 = 1;
  private lastSpeed = 0;
  private current: Point = { x: 0, y: 0 };

  get pos(): Point {
    return this.current;
  }

  /** Aktuelle Streckenlänge in px (alle Strecken gleich lang) */
  get segmentLength(): number {
    return Math.hypot(this.width, this.h / SEGMENTS);
  }

  /** Aktuelle Breite der Treppe in px */
  get trackWidth(): number {
    return this.width;
  }

  /** Aktuelle Gesamthöhe in px */
  get height(): number {
    return this.h;
  }

  /** Neigung der Strecken gegen die Waagrechte in Grad */
  get angle(): number {
    return (Math.atan2(this.h / SEGMENTS, this.width) * 180) / Math.PI;
  }

  private targetH(): number {
    return clamp(heightUFor(this.level) * this.u, 2, this.maxH);
  }

  layout(area: Bounds, stageW: number, u: number): void {
    this.width = clampWidth(stageW, area);
    this.left = (area.minX + area.maxX) / 2 - this.width / 2;
    this.cy = (area.minY + area.maxY) / 2;
    this.maxH = Math.max(2, area.maxY - area.minY);
    this.u = u;
    this.h = this.targetH();
    this.rebuild();
  }

  setLevel(level: number): void {
    this.level = level;
  }

  begin(r: number, dir: 1 | -1): void {
    const x = (r - Math.floor(r)) * SEGMENTS;
    this.seg = Math.min(SEGMENTS - 1, Math.floor(x));
    this.tt = x - this.seg;
    this.dir = dir;
    this.h = this.targetH();
    this.rebuild();
  }

  step(dt: number, speed: number): void {
    this.lastSpeed = speed;
    const target = this.targetH();
    if (Math.abs(target - this.h) > 0.05) {
      this.h = approach(this.h, target, dt, MORPH_TAU);
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
        if (this.seg >= SEGMENTS - 1) {
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

  /** Abstand zum nächsten Wendepunkt in Laufrichtung und zum letzten dahinter (px) */
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
    this.pts = stairVertices(SEGMENTS, this.left, this.left + this.width, this.cy, this.h);
  }

  private place(): void {
    const a = this.pts[this.seg];
    const b = this.pts[this.seg + 1];
    this.current = { x: a.x + (b.x - a.x) * this.tt, y: a.y + (b.y - a.y) * this.tt };
  }
}
