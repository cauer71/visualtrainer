/**
 * Rand im Blick („randabwehr“) – reine Logik (ohne Canvas, damit testbar).
 *
 * Langsame Punkte erscheinen am Rand des Felds und gleiten geradlinig zur Mitte. Die Mitte ist eine
 * ruhige Zone mit Fixationsmarke; wer einen Punkt antippt, bevor er die Zone erreicht, hat ihn abgefangen.
 *
 * Die Bewegung läuft über einen normierten Fortschritt p (0 = Rand, 1 = Mitte-Zone). Die Flugzeit in
 * Sekunden ist die Schwierigkeit – unabhängig von Bühnengröße, Richtung und Bildrate.
 */
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;

export interface Pt {
  x: number;
  y: number;
}

export interface Rect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** Ganzzahlige Stufe (für Sprünge wie „2 Punkte gleichzeitig“) */
export function levelInt(level: number): number {
  return clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);
}

/** Flugzeit vom Rand bis zur Mitte-Zone in Sekunden: Stufe 1 = 4,0 s, Stufe 20 ≈ 1,4 s */
export function flightSecondsFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(1.4, 4.0 * Math.pow(0.94, lv - 1));
}

/** Wie viele Punkte gleichzeitig unterwegs sind: Stufe 1–3 → 1, 4–7 → 2, 8–12 → 3, ab 13 → 4 */
export function simultaneousFor(level: number): number {
  const lv = levelInt(level);
  return lv <= 3 ? 1 : lv <= 7 ? 2 : lv <= 12 ? 3 : 4;
}

/** Mittlerer Abstand zwischen zwei neuen Punkten in Sekunden: 1,7 s → 0,65 s */
export function spawnGapSecondsFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(0.65, 1.7 * Math.pow(0.95, lv - 1));
}

/** Sichtbarer Radius in px: 4,6 u → 3,3 u, mindestens 18 px */
export function radiusFor(level: number, u: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(18, u * Math.max(3.3, 4.6 - 0.07 * (lv - 1)));
}

/** Trefferradius: größer als das sichtbare Ziel, nie unter 28 px (Fingerbreite) */
export function hitRadiusFor(r: number): number {
  return Math.max(r + 10, 28);
}

/** Radius der Mitte-Zone in px */
export function zoneRadiusFor(u: number): number {
  return Math.max(34, 7 * u);
}

/** Punkte für einen abgefangenen Punkt: etwas mehr, wenn er noch weit außen war */
export function pointsFor(level: number, progress: number): number {
  return Math.round(10 + 2 * (levelInt(level) - 1) + 6 * (1 - clamp(progress, 0, 1)));
}

/**
 * Abstand vom Mittelpunkt zum Rand des Rechtecks in Richtung `angle` (Strahl im Rechteck).
 * Der Mittelpunkt muss im Rechteck liegen.
 */
export function edgeDistance(c: Pt, angle: number, f: Rect): number {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let d = Infinity;
  if (dx > 1e-9) d = Math.min(d, (f.maxX - c.x) / dx);
  else if (dx < -1e-9) d = Math.min(d, (f.minX - c.x) / dx);
  if (dy > 1e-9) d = Math.min(d, (f.maxY - c.y) / dy);
  else if (dy < -1e-9) d = Math.min(d, (f.minY - c.y) / dy);
  return Number.isFinite(d) ? Math.max(0, d) : 0;
}

/** Kleinster Winkelabstand (0 … π) */
export function angleGap(a: number, b: number): number {
  const d = Math.abs(((a - b + Math.PI) % (2 * Math.PI)) - Math.PI);
  return d > Math.PI ? 2 * Math.PI - d : d;
}

/**
 * Richtung für einen neuen Punkt. Richtungen, die näher als `sep` (Bogenmaß) an einem noch
 * weit außen fliegenden Punkt liegen, werden vermieden. Gibt es keine freie Richtung, gewinnt
 * der Kandidat mit dem größten Abstand.
 */
export function pickAngle(rand: () => number, occupied: readonly number[], sep = 0.75): number {
  let best = rand() * Math.PI * 2;
  let bestD = -1;
  for (let i = 0; i < 24; i++) {
    const c = rand() * Math.PI * 2;
    const d = occupied.length ? Math.min(...occupied.map((o) => angleGap(o, c))) : Infinity;
    if (d >= sep) return c;
    if (d > bestD) {
      best = c;
      bestD = d;
    }
  }
  return best;
}

/** Ort bei Fortschritt p: vom Rand (Abstand d0) bis zum Rand der Mitte-Zone (Abstand zoneR) */
export function dotPos(c: Pt, angle: number, d0: number, zoneR: number, p: number): Pt {
  const d = d0 + (zoneR - d0) * clamp(p, 0, 1);
  return { x: c.x + Math.cos(angle) * d, y: c.y + Math.sin(angle) * d };
}

export interface Hittable {
  x: number;
  y: number;
  hitR: number;
}

/** Index des getroffenen Punkts (der nächstliegende innerhalb seines Trefferradius) oder −1 */
export function findHit(items: readonly Hittable[], x: number, y: number): number {
  let best = -1;
  let bestD = Infinity;
  items.forEach((it, i) => {
    const d = Math.hypot(x - it.x, y - it.y);
    if (d <= it.hitR && d < bestD) {
      best = i;
      bestD = d;
    }
  });
  return best;
}

/** Anteil gefangener Punkte in % (0, wenn noch keiner entschieden ist) */
export function caughtPct(caught: number, passed: number): number {
  const n = caught + passed;
  return n > 0 ? Math.round((100 * caught) / n) : 0;
}
