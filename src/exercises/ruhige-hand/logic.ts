/**
 * Ruhige Hand – reine Logik (ohne Canvas, damit testbar).
 *
 * Ein Ball wird mit dem Finger durch eine kurvige Bahn (Korridor) von links nach rechts geführt, ohne die Wand
 * zu berühren. Alle Längen sind in „u“ gerechnet (1 u = 1 % der kürzeren Bühnenseite, mindestens ≈ 6,5 px).
 *
 * - Die Mittellinie ist eine Funktion y = f(x) (x wächst von links nach rechts): Summe zweier Sinuswellen mit zufälliger
 *   Phase, am Anfang und Ende flach eingeblendet. So gibt es keine Schleifen und keine Abkürzung.
 * - Stufe: Bahnbreite 13 u → ≈ 7 u, Kurvenhöhe 4,5 u → ≈ 12,8 u, Wellenlänge 84 u → ≈ 55 u.
 * - Wand: Der Ball kann die Bahn nie verlassen. Wer die Wand berührt, sieht den Ball am Rand gleiten (weicher Hinweis),
 *   es gibt keinen Sprung zurück zum Start. Die Wegstrecke zwischen zwei Bildern wird in kleinen Schritten geprüft.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;

/** Bahnbreite (Wand zu Wand) in u: 13 → ≈ 6,95 */
export function corridorWidthFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 13 - 0.55 * (lv - 1);
}

/** Höhe der Kurven (Amplitude der Mittellinie) in u */
export function amplitudeFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 4.5 + 0.75 * (lv - 1);
}

/** Wellenlänge der Hauptwelle in u: 84 → ≈ 55 */
export function wavelengthFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 84 - 2.6 * (lv - 1);
}

/** Ballradius in u (die Bühne sorgt für mindestens ≈ 10 px) */
export const BALL_R_U = 1.35;
/** Länge der flachen Ein- und Auslaufstrecke in u */
export const RAMP_U = 10;
/** Erlaubte Berührungen für einen „sauberen“ Durchgang (Stufe steigt) */
export const CLEAN_TOUCHES = 1;
/** Zeit, die ein Kontakt pausiert haben muss, bevor ein neuer als weitere Berührung zählt (ms) */
export const TOUCH_GAP_MS = 350;

/** Halbe Bahnbreite, in der die Ballmitte frei liegen darf (u) */
export function freeHalfWidth(level: number, ballR = BALL_R_U): number {
  return Math.max(0.4, corridorWidthFor(level) / 2 - ballR);
}

/** Versatz des Balls nach oben über dem Finger (px): ≈ 6 u, aber immer deutlich mehr als der Ballradius */
export function fingerOffsetPx(u: number, ballRpx: number): number {
  return Math.max(6 * u, ballRpx + 26);
}

/** Radius um die Stelle unter dem Ball, in dem der Finger aufsetzen darf (px, mindestens 30) */
export function grabRadiusPx(u: number): number {
  return Math.max(30, 5 * u);
}

/** Punkte für einen Durchgang */
export function pointsFor(level: number, touches: number): number {
  return Math.max(0, 10 + 4 * (Math.floor(level + 1e-9) - 1) - 3 * touches);
}

export interface Pt {
  x: number;
  y: number;
}

export interface Corridor {
  /** Länge in u (x von 0 bis length) */
  length: number;
  /** Bahnbreite in u */
  width: number;
  /** freie halbe Breite für die Ballmitte in u */
  free: number;
  amp: number;
  wavelength: number;
  /** y der Mittellinie (u, relativ zur Bahnmitte) */
  center(x: number): number;
  /** Steigung der Mittellinie */
  slope(x: number): number;
}

function smooth(k: number): number {
  const x = clamp(k, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Neue Bahn. `maxAmp` (u) begrenzt die Kurvenhöhe auf den Platz der Bühne.
 * Die Wellen sind auf beiden Seiten so eingeblendet, dass Anfang und Ende waagrecht liegen.
 */
export function makeCorridor(rng: Rng, level: number, length: number, maxAmp = Infinity): Corridor {
  const amp = Math.min(amplitudeFor(level), Math.max(0, maxAmp));
  const wl = wavelengthFor(level);
  const p1 = rng.range(0, Math.PI * 2);
  const p2 = rng.range(0, Math.PI * 2);
  const ramp = Math.min(RAMP_U, length / 4);
  const f = (x: number): number => {
    const env = smooth(x / ramp) * smooth((length - x) / ramp);
    const g = 0.85 * Math.sin((2 * Math.PI * x) / wl + p1) + 0.15 * Math.sin((2 * Math.PI * x) / (wl / 2) + p2);
    return amp * env * g;
  };
  const e = 0.05;
  return {
    length,
    width: corridorWidthFor(level),
    free: freeHalfWidth(level),
    amp,
    wavelength: wl,
    center: f,
    slope: (x: number) => (f(x + e) - f(x - e)) / (2 * e),
  };
}

/** Größte Steigung der Mittellinie (für Tests und die Begrenzung der Steilheit) */
export function maxSlope(c: Corridor, step = 0.25): number {
  let m = 0;
  for (let x = 0; x <= c.length; x += step) m = Math.max(m, Math.abs(c.slope(x)));
  return m;
}

/** Stützpunkte der Mittellinie zum Zeichnen */
export function samplePath(c: Corridor, step = 0.6): Pt[] {
  const pts: Pt[] = [];
  for (let x = 0; x < c.length; x += step) pts.push({ x, y: c.center(x) });
  pts.push({ x: c.length, y: c.center(c.length) });
  return pts;
}

export interface Clamped extends Pt {
  /** Ballmitte lag außerhalb des freien Bereichs (Wand berührt) */
  contact: boolean;
  /** Abstand zur Mittellinie senkrecht zur Bahn (u, mit Vorzeichen, nach Begrenzung) */
  dev: number;
}

/** Ballmitte auf den freien Bereich der Bahn begrenzen (senkrechter Abstand zur Mittellinie ≤ free) */
export function clampToCorridor(c: Corridor, x: number, y: number): Clamped {
  const cx = clamp(x, 0, c.length);
  const f = c.center(cx);
  const k = Math.sqrt(1 + c.slope(cx) ** 2);
  const d = (y - f) / k;
  if (Math.abs(d) > c.free + 1e-9) {
    const s = d > 0 ? 1 : -1;
    return { x: cx, y: f + s * c.free * k, contact: true, dev: s * c.free };
  }
  return { x: cx, y, contact: false, dev: d };
}

/**
 * Ball von `from` zum Zielpunkt `to` bewegen. Die Strecke wird in Schritten von höchstens `step` u geprüft,
 * damit ein schneller Finger die Wand nicht „überspringt“. `contact` ist wahr, wenn irgendein Schritt die Wand berührte.
 */
export function moveBall(c: Corridor, from: Pt, to: Pt, step = 0.5): Clamped {
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const n = Math.max(1, Math.ceil(dist / step));
  let contact = false;
  let last: Clamped = clampToCorridor(c, to.x, to.y);
  for (let k = 1; k <= n; k++) {
    const q = k / n;
    const r = clampToCorridor(c, from.x + (to.x - from.x) * q, from.y + (to.y - from.y) * q);
    if (r.contact) contact = true;
    if (k === n) last = r;
  }
  return { ...last, contact: contact || last.contact };
}

/** Zählt Berührungen: ein neuer Kontakt zählt erst, wenn der letzte mindestens TOUCH_GAP_MS zurückliegt */
export class TouchCounter {
  touches = 0;
  private active = false;
  private endedAt = -1e9;

  update(contact: boolean, t: number): boolean {
    let counted = false;
    if (contact && !this.active) {
      if (t - this.endedAt >= TOUCH_GAP_MS) {
        this.touches++;
        counted = true;
      }
      this.active = true;
    } else if (!contact && this.active) {
      this.active = false;
      this.endedAt = t;
    }
    return counted;
  }

  get inContact(): boolean {
    return this.active;
  }
}

/** Zeit auf der Bahn: Anteil der Zeit (Finger am Glas), in der die Wand nicht berührt wurde */
export class PathTime {
  total = 0;
  free = 0;

  add(dtSec: number, contact: boolean): void {
    this.total += dtSec;
    if (!contact) this.free += dtSec;
  }

  get fraction(): number {
    return this.total > 0 ? this.free / this.total : 1;
  }
}
