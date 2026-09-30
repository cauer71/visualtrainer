/**
 * Reine Logik für die Blickfolge-Übungen (Liegende Acht, Wellenbahn) – ohne Canvas und DOM,
 * damit sie per Unit-Test geprüft werden kann.
 *
 * - Bahn als Bogenlängen-Tabelle (`ArcTable`): Das Ziel läuft mit gleichmäßigem Tempo entlang der
 *   Kurve, unabhängig von ihrer Krümmung.
 * - Hin-und-her-Lauf mit weicher Umkehr (`pingPong01`).
 * - Stufenfunktionen: Tempo, Zeichengröße, Anzeigedauer, Hilfslinie.
 *
 * Stufe ist immer „höher = schwerer“ (siehe core/staircase.ts).
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export interface Point {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const PURSUIT_MIN_LEVEL = 1;
export const PURSUIT_MAX_LEVEL = 20;

/** Bahnbreite höchstens so groß wie dieser Anteil der Bühnenbreite (Gleitsicht: Kopf möglichst ruhig) */
export const MAX_TRACK_WIDTH = 0.6;

/** Breite einer Bahn: höchstens 60 % der Bühnenbreite und höchstens die Feldbreite */
export function clampWidth(stageW: number, area: Bounds): number {
  return Math.max(8, Math.min(MAX_TRACK_WIDTH * stageW, area.maxX - area.minX));
}

/** Begrenzt ein Feld auf mindestens einen Punkt (kleine Bühnen) */
export function span(minX: number, maxX: number, minY: number, maxY: number): Bounds {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

// ---------------------------------------------------------------------------
// Stufen

/** Tempo in u/s (1 u = 1 % der kürzeren Seite; auf dem Tablet ≈ 0,23° bei 40 cm) */
export function pursuitSpeed(level: number, base: number, factor: number): number {
  return base * Math.pow(factor, level - 1);
}

/** Anzeigedauer des Zeichens in ms – wird mit der Stufe kürzer */
export function exposureFor(level: number): number {
  return Math.max(240, Math.round(650 - 22 * (level - 1)));
}

/** Durchmesser des Landolt-Rings in px – wird mit der Stufe kleiner (nie unter 30 px) */
export function signSizeFor(level: number, u: number): number {
  return clamp(u * (6 - 0.14 * (level - 1)), 30, 56);
}

/** Radius der Kugel, in der das Zeichen erscheint */
export function targetRadiusFor(signSize: number): number {
  return signSize * 0.78;
}

/** Deckkraft der Hilfslinie: auf leichten Stufen sichtbar, ab Stufe 10 ausgeblendet */
export function guideAlpha(level: number): number {
  return 0.2 * clamp((10 - level) / 6, 0, 1);
}

/** Zufällige Richtung 0..3, aber nie dreimal hintereinander dieselbe */
export function pickDirection(rng: Rng, history: readonly number[]): number {
  let d = rng.int(4);
  const n = history.length;
  if (n >= 2 && history[n - 1] === d && history[n - 2] === d) d = (d + 1 + rng.int(3)) % 4;
  return d;
}

// ---------------------------------------------------------------------------
// Bahn

/**
 * Polylinie mit Bogenlängen-Tabelle. `at(s)` liefert den Punkt nach s Pixeln Weg:
 * geschlossene Bahnen laufen im Kreis (s modulo Länge), offene bleiben an den Enden stehen.
 */
export class ArcTable {
  readonly length: number;
  readonly closed: boolean;
  private readonly pts: Point[];
  private readonly cum: number[];

  constructor(points: readonly Point[], closed: boolean) {
    this.closed = closed;
    this.pts = points.map((p) => ({ x: p.x, y: p.y }));
    if (closed && this.pts.length > 1) this.pts.push({ ...this.pts[0] });
    this.cum = [0];
    for (let i = 1; i < this.pts.length; i++) {
      const a = this.pts[i - 1];
      const b = this.pts[i];
      this.cum.push(this.cum[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
    }
    this.length = this.cum[this.cum.length - 1] ?? 0;
  }

  /** Stützpunkte (bei geschlossenen Bahnen inkl. Schlusspunkt) */
  get points(): readonly Point[] {
    return this.pts;
  }

  at(s: number): Point {
    const L = this.length;
    if (L <= 0 || this.pts.length < 2) return { ...(this.pts[0] ?? { x: 0, y: 0 }) };
    let q = this.closed ? s - Math.floor(s / L) * L : clamp(s, 0, L);
    if (q >= L) q = L;
    // binäre Suche: größtes i mit cum[i] <= q
    let lo = 0;
    let hi = this.cum.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (this.cum[mid] <= q) lo = mid;
      else hi = mid;
    }
    const seg = this.cum[hi] - this.cum[lo];
    const k = seg > 1e-12 ? (q - this.cum[lo]) / seg : 0;
    const a = this.pts[lo];
    const b = this.pts[hi];
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
  }
}

/**
 * Hin-und-her-Lauf mit weicher Umkehr, normiert auf Weglänge 1.
 *
 * phi ∈ [0, 1) ist die Phase eines Hin-und-zurück-Zyklus (wird modulo 1 genommen), e der Anteil der
 * Weglänge, über den das Tempo an den Enden auf 0 abfällt bzw. anwächst (Tempo linear in der Strecke).
 * Liefert die Position pos ∈ [0, 1] und das Tempo relativ zum Nenntempo (0..1).
 * Ein Zyklus hat die Länge 2 (1 + e) in Nenn-Wegeinheiten – rückt phi um v·dt/(L · 2 (1 + e)) vor,
 * beträgt das Tempo am Ziel in der Reisephase genau v.
 */
export function pingPong01(phi: number, e: number): { pos: number; speed: number } {
  const ee = clamp(e, 1e-4, 0.5);
  const half = 1 + ee;
  const p = phi - Math.floor(phi);
  let q = p * 2 * half;
  let back = false;
  if (q >= half) {
    q -= half;
    back = true;
  }
  let g: number;
  let speed: number;
  if (q < ee) {
    g = (q * q) / (2 * ee);
    speed = q / ee;
  } else if (q <= 1) {
    g = q - ee / 2;
    speed = 1;
  } else {
    const x = Math.min(q - 1, ee);
    g = 1 - ee / 2 + x - (x * x) / (2 * ee);
    speed = 1 - x / ee;
  }
  return { pos: back ? 1 - g : g, speed: Math.max(0, speed) };
}

/** Länge eines Hin-und-zurück-Zyklus in Pixeln für Weglänge L und Umkehr-Anteil e */
export function pingPongCycle(length: number, e: number): number {
  return 2 * (1 + clamp(e, 1e-4, 0.5)) * length;
}

/** Bahnform weich nachführen: exponentielle Annäherung, unabhängig von der Bildrate */
export function approach(cur: number, target: number, dt: number, tau: number): number {
  return cur + (target - cur) * (1 - Math.exp(-dt / tau));
}

// ---------------------------------------------------------------------------
// Bahnen (Schnittstelle der gemeinsamen Übung)

export interface PursuitTrack {
  /**
   * Bewegungsfeld (Bereich für den Kugelmittelpunkt), Bühnenbreite und Einheit u neu setzen.
   * Der Fortschritt auf der Bahn bleibt erhalten.
   */
  layout(area: Bounds, stageW: number, u: number): void;
  /** Bahnform der Stufe anpassen (wird weich nachgeführt) */
  setLevel(level: number): void;
  /** Startposition/-richtung festlegen (r ∈ [0, 1) zufällig) */
  begin(r: number, dir: 1 | -1): void;
  /** dt Sekunden mit Nenntempo v (px/s) weiterlaufen */
  step(dt: number, speed: number): void;
  readonly pos: Point;
  /** Tempo relativ zum Nenntempo (0..1); < 1 nur an den Umkehrpunkten der Welle */
  cruise(): number;
  /** Bahnlinie als Polylinie (Hilfslinie) */
  outline(): readonly Point[];
}
