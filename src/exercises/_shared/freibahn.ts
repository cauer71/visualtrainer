/**
 * Freie Bahn für „Ausweichziel“ und „Sprungziel“ – reine Logik (ohne Canvas und DOM).
 *
 * Ein Ziel läuft mit gleichmäßigem Tempo geradeaus. Es kann
 * - weich ausweichen: die Richtung dreht sich innerhalb einer Bogendauer um einen Winkel
 *   (Winkelgeschwindigkeit als weiche Glocke, kein Knick), und
 * - vom Rand weich weggeführt werden: ein Ziel, das auf eine Wand zuläuft, dreht rechtzeitig bei
 *   (kein harter Abprall, der wie ein zusätzliches Ausweichen wirken würde).
 *
 * Alles ist zeitbasiert (dt in Sekunden) und damit unabhängig von der Bildrate. Das Feld ist der
 * erlaubte Bereich für den Mittelpunkt des Ziels.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export interface Field {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface Pt {
  x: number;
  y: number;
}

const TWO_PI = Math.PI * 2;

export function wrapAngle(a: number): number {
  let r = (a + Math.PI) % TWO_PI;
  if (r < 0) r += TWO_PI;
  return r - Math.PI;
}

/** Wert weich nachführen: exponentielle Annäherung, unabhängig von der Bildrate */
export function approach(cur: number, target: number, dt: number, tau: number): number {
  return cur + (target - cur) * (1 - Math.exp(-dt / tau));
}

export const deg = (d: number): number => (d * Math.PI) / 180;

/** Feld mit mindestens einem Punkt Ausdehnung (kleine Bühnen) */
export function makeField(minX: number, maxX: number, minY: number, maxY: number): Field {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

export function insideField(f: Field, x: number, y: number, tol = 0): boolean {
  return x >= f.minX - tol && x <= f.maxX + tol && y >= f.minY - tol && y <= f.maxY + tol;
}

/** Strecke vom Punkt aus in Richtung theta bis zum Feldrand (Strahl im Rechteck) */
export function freeDistance(f: Field, x: number, y: number, theta: number): number {
  const dx = Math.cos(theta);
  const dy = Math.sin(theta);
  let d = Infinity;
  if (dx > 1e-9) d = Math.min(d, (f.maxX - x) / dx);
  else if (dx < -1e-9) d = Math.min(d, (f.minX - x) / dx);
  if (dy > 1e-9) d = Math.min(d, (f.maxY - y) / dy);
  else if (dy < -1e-9) d = Math.min(d, (f.minY - y) / dy);
  return Math.max(0, d);
}

/**
 * Integral der weichen Drehrate: Anteil des Gesamtwinkels, der nach dem Bruchteil s ∈ [0, 1] der
 * Bogendauer schon gedreht ist. Die Drehrate ist 0 am Anfang und Ende und am größten in der Mitte
 * (Glocke 1 − cos), der Endwert ist genau 1.
 */
export function arcProgress(s: number): number {
  const q = clamp(s, 0, 1);
  return q - Math.sin(TWO_PI * q) / TWO_PI;
}

/** Drehrichtung (+1/−1) für eine Drehung um delta: meist dorthin, wo mehr Platz bleibt */
export function pickTurnSign(f: Field, p: Pt, theta: number, delta: number, rng: Rng, prefer = 0.75): 1 | -1 {
  const a = freeDistance(f, p.x, p.y, theta + Math.abs(delta));
  const b = freeDistance(f, p.x, p.y, theta - Math.abs(delta));
  const better: 1 | -1 = a >= b ? 1 : -1;
  return rng.chance(prefer) ? better : (-better as 1 | -1);
}

export class MotionPath {
  x = 0;
  y = 0;
  /** Bewegungsrichtung in Radiant (0 = nach rechts, π/2 = nach unten) */
  theta = 0;
  private f: Field = { minX: 0, maxX: 1, minY: 0, maxY: 1 };
  private turnTotal = 0;
  private turnDur = 0;
  private turnT = 0;
  private turnActive = false;

  get field(): Field {
    return this.f;
  }

  setField(f: Field): void {
    this.f = f;
    this.x = clamp(this.x, f.minX, f.maxX);
    this.y = clamp(this.y, f.minY, f.maxY);
  }

  place(x: number, y: number, theta: number): void {
    this.x = clamp(x, this.f.minX, this.f.maxX);
    this.y = clamp(y, this.f.minY, this.f.maxY);
    this.theta = wrapAngle(theta);
    this.turnActive = false;
  }

  /** Ort setzen, Richtung bleibt (Sprung) */
  moveTo(x: number, y: number): void {
    this.x = clamp(x, this.f.minX, this.f.maxX);
    this.y = clamp(y, this.f.minY, this.f.maxY);
  }

  get turning(): boolean {
    return this.turnActive;
  }

  /** Weiche Drehung um delta (Radiant, mit Vorzeichen) innerhalb von durMs Millisekunden */
  startTurn(delta: number, durMs: number): void {
    this.turnTotal = delta;
    this.turnDur = Math.max(1, durMs) / 1000;
    this.turnT = 0;
    this.turnActive = true;
  }

  /** Mindestkurvenradius beim Wegführen vom Rand (px) – passt sich Feld und Tempo an */
  private turnRadius(speed: number): number {
    const minDim = Math.max(1, Math.min(this.f.maxX - this.f.minX, this.f.maxY - this.f.minY));
    return clamp(minDim * 0.22, 1, Math.max(1, speed * 0.9));
  }

  /** dt Sekunden mit Tempo speed (px/s) weiterlaufen */
  step(dt: number, speed: number): void {
    if (dt <= 0) return;
    // in kleinen Teilschritten rechnen, damit die Bahn bei langen Bildzeiten glatt bleibt
    const n = Math.max(1, Math.ceil(dt / 0.02));
    const h = dt / n;
    for (let i = 0; i < n; i++) this.sub(h, speed);
  }

  private sub(dt: number, speed: number): void {
    // Ausweichbogen
    if (this.turnActive) {
      const t0 = this.turnT;
      const t1 = Math.min(this.turnDur, t0 + dt);
      const d = this.turnTotal * (arcProgress(t1 / this.turnDur) - arcProgress(t0 / this.turnDur));
      this.theta += d;
      this.turnT = t1;
      if (t1 >= this.turnDur) this.turnActive = false;
    }
    // Rand: rechtzeitig weich wegdrehen
    if (speed > 0) {
      const f = this.f;
      const R = this.turnRadius(speed);
      const look = R * 2 + speed * 0.05;
      const ax = this.x + Math.cos(this.theta) * look;
      const ay = this.y + Math.sin(this.theta) * look;
      const over = Math.max(f.minX - ax, ax - f.maxX, f.minY - ay, ay - f.maxY, 0);
      if (over > 0) {
        const want = Math.atan2((f.minY + f.maxY) / 2 - this.y, (f.minX + f.maxX) / 2 - this.x);
        let err = wrapAngle(want - this.theta);
        // Fast frontal auf die Wand: zur Seite mit mehr Platz abbiegen (sonst Zufall bei ±180°)
        if (Math.abs(err) > 2.6) {
          const a = freeDistance(f, this.x, this.y, this.theta + Math.PI / 2);
          const b = freeDistance(f, this.x, this.y, this.theta - Math.PI / 2);
          err = a >= b ? Math.PI : -Math.PI;
        }
        const rate = speed / R; // rad/s für den Mindestradius
        const k = clamp(0.6 + (2 * over) / look, 0, 1);
        const maxTurn = rate * k * dt;
        this.theta += clamp(err, -maxTurn, maxTurn);
      }
    }
    this.theta = wrapAngle(this.theta);
    this.x += Math.cos(this.theta) * speed * dt;
    this.y += Math.sin(this.theta) * speed * dt;
    // Sicherheitsnetz (sehr kleine Felder, extreme Tempi): am Rand spiegeln
    const f = this.f;
    if (this.x < f.minX || this.x > f.maxX) {
      this.x = clamp(this.x, f.minX, f.maxX);
      this.theta = wrapAngle(Math.PI - this.theta);
    }
    if (this.y < f.minY || this.y > f.maxY) {
      this.y = clamp(this.y, f.minY, f.maxY);
      this.theta = wrapAngle(-this.theta);
    }
  }
}

/**
 * Zielort für einen Sprung: etwa `dist` Pixel vom Ausgangspunkt entfernt, im Feld und so, dass das
 * Ziel bei gleicher Richtung noch mindestens `minAhead` Pixel geradeaus laufen kann. Findet sich bei
 * der Wunschweite nichts, wird sie schrittweise verkürzt (nie unter die Hälfte, solange es geht).
 */
export function pickJumpTarget(f: Field, from: Pt, theta: number, dist: number, rng: Rng, minAhead: number): Pt & { dist: number } {
  const span = Math.hypot(f.maxX - f.minX, f.maxY - f.minY);
  const N = 28;
  for (const ahead of [minAhead, minAhead * 0.5, 0]) {
    let d = Math.min(dist, span * 0.92);
    for (let shrink = 0; shrink < 8; shrink++) {
      const start = rng.next() * TWO_PI;
      for (let i = 0; i < N; i++) {
        const a = start + (i / N) * TWO_PI;
        const x = from.x + Math.cos(a) * d;
        const y = from.y + Math.sin(a) * d;
        if (!insideField(f, x, y)) continue;
        if (freeDistance(f, x, y, theta) < ahead) continue;
        return { x, y, dist: d };
      }
      d *= 0.9;
    }
  }
  // Notlösung: Feldmitte
  const cx = (f.minX + f.maxX) / 2;
  const cy = (f.minY + f.maxY) / 2;
  return { x: cx, y: cy, dist: Math.hypot(cx - from.x, cy - from.y) };
}
