/**
 * Kugel-Detektiv 3D – Spiellogik ohne Grafik (testbar).
 *
 * Mehrfach-Objektverfolgung (MOT) in einem Würfelraum: Einige Kugeln werden kurz
 * markiert, dann sehen alle gleich aus und bewegen sich; am Ende zeigt man die
 * verfolgten Kugeln. Einheiten: Meter und Sekunden, Ursprung = Mitte des Würfels.
 */
import type { Rng } from '../core/rng';
import { Staircase } from '../core/staircase';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Ball {
  p: Vec3;
  v: Vec3;
  target: boolean;
}

export interface WorldOptions {
  /** halbe Kantenlänge des Würfels (m) */
  half: number;
  /** Kugelradius (m) */
  radius: number;
  count: number;
  targets: number;
}

export const DEFAULTS: WorldOptions = { half: 0.8, radius: 0.085, count: 8, targets: 4 };

export const MAX_LEVEL = 20;
export const START_LEVEL = 4;
/** Anzahl Durchgänge je Sitzung – kurz gehalten (Komfort in der Brille) */
export const TRIALS_PER_SESSION = 10;
export const CUE_SECONDS = 2.2;
export const TRACK_SECONDS = 7;

/** Tempo in m/s je Stufe: 0,15 m/s … ≈ 1,3 m/s (bei 2,4 m Abstand etwa 3,6 … 31 °/s). */
export function speedForLevel(level: number): number {
  const l = Math.min(MAX_LEVEL, Math.max(1, Math.round(level)));
  return 0.15 * Math.pow(1.12, l - 1);
}

function len(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

function randomDir(rng: Rng): Vec3 {
  // gleichverteilte Richtung auf der Kugel
  const z = rng.range(-1, 1);
  const a = rng.range(0, Math.PI * 2);
  const r = Math.sqrt(1 - z * z);
  return { x: r * Math.cos(a), y: r * Math.sin(a), z };
}

/** Neue Kugeln ohne Überlappung, Start-Richtung zufällig, Betrag = speed. */
export function createBalls(rng: Rng, speed: number, o: WorldOptions = DEFAULTS): Ball[] {
  const balls: Ball[] = [];
  const lim = o.half - o.radius;
  const minDist = o.radius * 3.2;
  let guard = 0;
  while (balls.length < o.count && guard++ < 5000) {
    const p = { x: rng.range(-lim, lim), y: rng.range(-lim, lim), z: rng.range(-lim, lim) };
    if (balls.some((b) => len({ x: b.p.x - p.x, y: b.p.y - p.y, z: b.p.z - p.z }) < minDist)) continue;
    const d = randomDir(rng);
    balls.push({ p, v: { x: d.x * speed, y: d.y * speed, z: d.z * speed }, target: false });
  }
  const idx = rng.shuffle(balls.map((_, i) => i)).slice(0, o.targets);
  for (const i of idx) balls[i].target = true;
  return balls;
}

/**
 * Ein Zeitschritt. Die Kugeln prallen weich an den Würfelwänden ab und weichen
 * einander aus (kein Durchdringen). Das Tempo bleibt konstant; die Richtung
 * driftet leicht, damit Bahnen nicht vorhersehbar sind.
 */
export function step(balls: Ball[], dt: number, speed: number, rng: Rng, o: WorldOptions = DEFAULTS): void {
  const lim = o.half - o.radius;
  for (const b of balls) {
    // leichte Richtungsänderung (Zufallsdrift, ca. ±40 °/s)
    const drift = 0.7 * dt;
    b.v.x += rng.normal() * drift * speed;
    b.v.y += rng.normal() * drift * speed;
    b.v.z += rng.normal() * drift * speed;
    const n = len(b.v) || 1;
    b.v.x *= speed / n;
    b.v.y *= speed / n;
    b.v.z *= speed / n;
    b.p.x += b.v.x * dt;
    b.p.y += b.v.y * dt;
    b.p.z += b.v.z * dt;
    for (const k of ['x', 'y', 'z'] as const) {
      if (b.p[k] > lim) {
        b.p[k] = lim - (b.p[k] - lim);
        b.v[k] = -Math.abs(b.v[k]);
      } else if (b.p[k] < -lim) {
        b.p[k] = -lim + (-lim - b.p[k]);
        b.v[k] = Math.abs(b.v[k]);
      }
      b.p[k] = Math.max(-lim, Math.min(lim, b.p[k]));
    }
  }
  // Kugeln stoßen einander elastisch ab (gleiche Masse: Geschwindigkeitskomponenten tauschen)
  const minD = o.radius * 2.2;
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i];
      const c = balls[j];
      const dx = c.p.x - a.p.x;
      const dy = c.p.y - a.p.y;
      const dz = c.p.z - a.p.z;
      const d = Math.hypot(dx, dy, dz);
      if (d >= minD || d === 0) continue;
      const nx = dx / d;
      const ny = dy / d;
      const nz = dz / d;
      const push = (minD - d) / 2;
      a.p.x -= nx * push;
      a.p.y -= ny * push;
      a.p.z -= nz * push;
      c.p.x += nx * push;
      c.p.y += ny * push;
      c.p.z += nz * push;
      const va = a.v.x * nx + a.v.y * ny + a.v.z * nz;
      const vc = c.v.x * nx + c.v.y * ny + c.v.z * nz;
      if (va - vc > 0) {
        // nur wenn sie sich annähern
        a.v.x += (vc - va) * nx;
        a.v.y += (vc - va) * ny;
        a.v.z += (vc - va) * nz;
        c.v.x += (va - vc) * nx;
        c.v.y += (va - vc) * ny;
        c.v.z += (va - vc) * nz;
        // Tempo bleibt für jede Kugel konstant (bei MOT üblich)
        for (const b of [a, c]) {
          const m = len(b.v) || 1;
          b.v.x *= speed / m;
          b.v.y *= speed / m;
          b.v.z *= speed / m;
        }
      }
    }
  }
}

export interface TrialResult {
  level: number;
  correct: number;
  of: number;
  perfect: boolean;
}

/** Auswertung: Wie viele der gewählten Kugeln waren markiert? */
export function evaluate(balls: Ball[], picked: number[], level: number): TrialResult {
  const uniq = [...new Set(picked)].filter((i) => i >= 0 && i < balls.length);
  const of = balls.filter((b) => b.target).length;
  const correct = uniq.filter((i) => balls[i].target).length;
  return { level, correct, of, perfect: correct === of && uniq.length === of };
}

export function makeStaircase(start = START_LEVEL): Staircase {
  // 2 richtig in Folge → schneller, 1 Fehler → langsamer (Zielquote ≈ 70 %)
  return new Staircase({ start, min: 1, max: MAX_LEVEL, down: 2, stepHarder: 1, stepEasier: 1, initialBoost: 1 });
}

export interface SessionSummary {
  trials: number;
  perfect: number;
  /** Mittlere Tempostufe der letzten Durchgänge (Schwellenschätzung) */
  thresholdLevel: number;
  thresholdSpeed: number;
  maxLevel: number;
}

export function summarize(results: TrialResult[], stair: Staircase): SessionSummary {
  const th = stair.threshold();
  return {
    trials: results.length,
    perfect: results.filter((r) => r.perfect).length,
    thresholdLevel: th,
    thresholdSpeed: speedForLevel(th),
    maxLevel: results.reduce((m, r) => Math.max(m, r.level), 0),
  };
}

/** Kleinster Abstand zweier Kugelmitten (für Tests / Kontrolle). */
export function minPairDistance(balls: Ball[]): number {
  let m = Infinity;
  for (let i = 0; i < balls.length; i++)
    for (let j = i + 1; j < balls.length; j++)
      m = Math.min(m, len({ x: balls[i].p.x - balls[j].p.x, y: balls[i].p.y - balls[j].p.y, z: balls[i].p.z - balls[j].p.z }));
  return m;
}
