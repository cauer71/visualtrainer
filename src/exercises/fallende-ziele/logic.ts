/**
 * Fallende Ziele – reine Logik (ohne Canvas, damit testbar).
 *
 * Die Fallbewegung läuft über einen normierten Fortschritt p (0 = oben, 1 = Boden).
 * Dadurch ist die Fallzeit in Sekunden unabhängig von Bühnengröße und Bildrate
 * (Hochformat und Querformat fordern gleich viel Zeit).
 */
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Ab dieser Stufe erscheinen Stör-Objekte, die man nicht antippen soll (Go/No-Go) */
export const STOP_FROM_LEVEL = 9;

/** Ganzzahlige Stufe (für Sprünge wie „2 Ziele gleichzeitig“) */
export function levelInt(level: number): number {
  return clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);
}

/** Fallzeit vom oberen Rand bis zum Boden in Sekunden: Stufe 1 ≈ 4,2 s, Stufe 20 ≈ 1,3 s */
export function fallTimeFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(1.25, 4.2 * Math.pow(0.94, lv - 1));
}

/**
 * Leichte Beschleunigung ab Stufe 8 (Faktor a: am Boden a-mal schneller als oben, bezogen auf
 * die Anfangsgeschwindigkeit). Die Gesamtfallzeit bleibt trotzdem `fallTimeFor`.
 */
export function accelFor(level: number): number {
  return level < 8 ? 0 : Math.min(0.6, 0.06 * (level - 7));
}

/**
 * Neuer Fortschritt nach dt Sekunden. Geschwindigkeit dp/dt = k · (1 + a·p), k so gewählt,
 * dass der ganze Weg genau `fallTime` Sekunden dauert. Geschlossene Lösung → unabhängig von dt.
 */
export function advance(p: number, dt: number, fallTime: number, accel: number): number {
  if (dt <= 0) return p;
  if (accel < 1e-6) return p + dt / fallTime;
  const k = Math.log(1 + accel) / (accel * fallTime);
  return ((1 + accel * p) * Math.exp(k * accel * dt) - 1) / accel;
}

/** Restzeit in Sekunden bis zum Boden */
export function timeToGround(p: number, fallTime: number, accel: number): number {
  if (p >= 1) return 0;
  if (accel < 1e-6) return (1 - p) * fallTime;
  return (fallTime * Math.log((1 + accel) / (1 + accel * p))) / Math.log(1 + accel);
}

/** Wie viele echte Ziele gleichzeitig fallen: Stufe 1–5 → 1, 6–11 → 2, ab 12 → 3 */
export function simultaneousFor(level: number): number {
  const lv = levelInt(level);
  return lv <= 5 ? 1 : lv <= 11 ? 2 : 3;
}

/** Sichtbarer Radius in px: 5,6 u → 3,3 u, mindestens 20 px */
export function radiusFor(level: number, u: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(20, u * Math.max(3.3, 5.6 - 0.12 * (lv - 1)));
}

/** Trefferradius: größer als das sichtbare Ziel, nie unter 26 px (Fingerbreite) */
export function hitRadiusFor(r: number): number {
  return Math.max(r + 8, 26);
}

/** Anteil der Stör-Objekte unter den neuen Objekten (0 unterhalb der Go/No-Go-Stufe) */
export function stopChance(level: number): number {
  const lv = levelInt(level);
  return lv < STOP_FROM_LEVEL ? 0 : Math.min(0.35, 0.16 + 0.02 * (lv - STOP_FROM_LEVEL));
}

/** Punkte für einen gefangenen Treffer */
export function pointsFor(level: number): number {
  return 10 + 2 * (levelInt(level) - 1);
}

/**
 * Waagrechte Bahn (0..1) für ein neues Ziel. Bahnen, die weniger als `sep` (normiert) von einem
 * noch hoch hängenden Objekt entfernt sind, werden vermieden. Gibt es keine freie Bahn, gewinnt
 * der Kandidat mit dem größten Abstand.
 */
export function pickLane(rand: () => number, occupied: readonly number[], sep: number, lo = 0.06, hi = 0.94): number {
  let best = (lo + hi) / 2;
  let bestD = -1;
  for (let i = 0; i < 24; i++) {
    const c = lo + (hi - lo) * rand();
    const d = occupied.length ? Math.min(...occupied.map((o) => Math.abs(o - c))) : Infinity;
    if (d >= sep) return c;
    if (d > bestD) {
      best = c;
      bestD = d;
    }
  }
  return best;
}

export interface Hittable {
  x: number;
  y: number;
  hitR: number;
}

/** Index des getroffenen Objekts (das nächstliegende innerhalb seines Trefferradius) oder -1 */
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

/** Höhe beim Fang in % (100 = gerade erst erschienen, 0 = am Boden) aus den Fortschritten */
export function meanHeightPct(progress: readonly number[]): number {
  if (!progress.length) return 0;
  const m = progress.reduce((a, b) => a + b, 0) / progress.length;
  return Math.round(100 * (1 - clamp(m, 0, 1)));
}
