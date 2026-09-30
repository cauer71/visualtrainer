/**
 * Ziehen & Ablegen – reine Logik (ohne Canvas, damit testbar).
 */
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 16;

export interface Pt {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** Behälter, der wandert: Mittelpunkt, Richtung (rad) und noch ausstehende sanfte Kurve (rad) */
export interface Mover extends Pt {
  ang: number;
  turnLeft: number;
}

/** Radius des Behälters (Trefferzone für die Ballmitte) in px: 13 u → 6,3 u, nie unter 34 px */
export function containerRadiusFor(level: number, u: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(34, u * (13 - 0.45 * (lv - 1)));
}

/** Ballradius in px: mindestens 22 px (Ball ≈ 10 mm auf dem Tablet) */
export function ballRadiusFor(u: number): number {
  return Math.max(22, 3.2 * u);
}

/** Versatz des Balls nach oben über dem Finger: ≈ 6 u, aber immer deutlich mehr als Ballradius (Finger verdeckt nichts) */
export function fingerOffsetFor(u: number, ballR: number): number {
  return Math.max(6 * u, ballR + 26);
}

/** Tempo des Behälters in u/s: 5 → ≈ 17 */
export function speedFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return 5 * Math.pow(1.085, lv - 1);
}

/** Zeitfenster pro Durchgang in s (ab Erscheinen des Balls): 6,5 s → 3,2 s */
export function roundLimitFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(3.2, 6.5 - 0.22 * (lv - 1));
}

/** Richtungswechsel pro Sekunde: bis Stufe 5 keine, danach 0,25 → höchstens 1,0 */
export function turnRateFor(level: number): number {
  return level < 6 ? 0 : Math.min(1, 0.25 + 0.15 * (Math.floor(level + 1e-9) - 6));
}

/** Punkte für einen Treffer */
export function pointsFor(level: number): number {
  return 10 + 3 * (clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL) - 1);
}

/** Position des Balls für eine Fingerposition: über dem Finger, innerhalb der Bühne */
export function ballPos(fx: number, fy: number, off: number, r: number, w: number): Pt {
  return { x: clamp(fx, r, Math.max(r, w - r)), y: Math.max(r, fy - off) };
}

/** Treffer: Mitte des Balls liegt im Behälter */
export function inContainer(ball: Pt, c: Pt, R: number): boolean {
  return Math.hypot(ball.x - c.x, ball.y - c.y) <= R;
}

/** Nur angetippt statt gezogen? (kurz gehalten und kaum bewegt) */
export function isTapOnly(heldMs: number, movedPx: number, u: number): boolean {
  return heldMs < 200 && movedPx < 2 * u;
}

export function span(minX: number, maxX: number, minY: number, maxY: number): Bounds {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

/** Spiegelt Position und Richtung an den Grenzen. true, wenn abgeprallt. */
export function bounce(o: Mover, b: Bounds): boolean {
  let bounced = false;
  if (o.x < b.minX || o.x > b.maxX) {
    const low = o.x < b.minX;
    const edge = low ? b.minX : b.maxX;
    const outward = low ? Math.cos(o.ang) < 0 : Math.cos(o.ang) > 0;
    o.x = clamp(outward ? 2 * edge - o.x : o.x, b.minX, b.maxX);
    if (outward) {
      o.ang = Math.PI - o.ang;
      bounced = true;
    }
  }
  if (o.y < b.minY || o.y > b.maxY) {
    const low = o.y < b.minY;
    const edge = low ? b.minY : b.maxY;
    const outward = low ? Math.sin(o.ang) < 0 : Math.sin(o.ang) > 0;
    o.y = clamp(outward ? 2 * edge - o.y : o.y, b.minY, b.maxY);
    if (outward) {
      o.ang = -o.ang;
      bounced = true;
    }
  }
  if (bounced) o.turnLeft = -o.turnLeft;
  return bounced;
}

/**
 * Behälter um dt Sekunden weiterbewegen: konstantes Tempo (px/s), eine ausstehende Kurve wird
 * weich mit höchstens `turnSpeed` rad/s abgebaut, an den Grenzen wird abgeprallt.
 */
export function stepContainer(m: Mover, dt: number, speedPx: number, b: Bounds, turnSpeed = 3.5): boolean {
  if (dt <= 0) return false;
  const rot = clamp(m.turnLeft, -turnSpeed * dt, turnSpeed * dt);
  m.ang += rot;
  m.turnLeft -= rot;
  m.x += Math.cos(m.ang) * speedPx * dt;
  m.y += Math.sin(m.ang) * speedPx * dt;
  return bounce(m, b);
}

/** Ruheplatz des Balls: zufällig, mindestens `minDist` vom Behälter (sonst der weiteste von 40 Versuchen) */
export function placeBall(rand: () => number, b: Bounds, c: Pt, minDist: number): Pt {
  let best: Pt = { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  let bestD = -1;
  for (let i = 0; i < 40; i++) {
    const p = { x: b.minX + (b.maxX - b.minX) * rand(), y: b.minY + (b.maxY - b.minY) * rand() };
    const d = Math.hypot(p.x - c.x, p.y - c.y);
    if (d >= minDist) return p;
    if (d > bestD) {
      best = p;
      bestD = d;
    }
  }
  return best;
}
