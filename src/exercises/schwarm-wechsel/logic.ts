/**
 * Schwarm-Wechsel – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * 2–5 Kugeln wandern weich über die Bühne. Jede hat einen Ring, der ihre Restzeit zeigt. Man tippt
 * sie in der Reihenfolge ihrer Dringlichkeit (kürzester Ring zuerst). Die Stufe regelt Anzahl,
 * Tempo, Größe und Lebensdauer.
 */
import type { Rng } from '../../core/rng';
import { clamp, median } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 16;
/** „Gleich dringend“: so viele ms darf der Ring eines getippten Ziels länger sein als der kürzeste und zählt noch als „in Reihenfolge“ */
export const ORDER_TOLERANCE_MS = 300;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Anzahl gleichzeitiger Ziele: Stufe 1–4 → 2, 5–8 → 3, 9–12 → 4, ab 13 → 5 */
export function countFor(level: number): number {
  return clamp(2 + Math.floor((levelOf(level) - 1) / 4), 2, 5);
}

/** Tempo in u/s (1 u = 1 % der kürzeren Bühnenseite): 6 → ≈ 22 auf Stufe 16 */
export function speedFor(level: number): number {
  return 6 * Math.pow(1.09, levelOf(level) - 1);
}

/** Sichtbarer Radius in u: 6,6 → 3,3 */
export function radiusU(level: number): number {
  return clamp(6.6 - 0.22 * (levelOf(level) - 1), 3.2, 6.6);
}

/** Sichtbarer Radius in px, nie unter 26 px */
export function radiusPx(level: number, u: number): number {
  return Math.max(26, radiusU(level) * u);
}

/** Trefferradius: größer als das sichtbare Ziel (Fingerbreite), mindestens 32 px */
export function hitRadius(r: number): number {
  return Math.max(r + 10, 32);
}

/** Zeit, die man pro Ziel etwa braucht (s): wird mit der Stufe etwas knapper */
export function tapIntervalS(level: number): number {
  return 1.2 - 0.027 * (levelOf(level) - 1);
}

/**
 * Lebensdauer eines Ziels in ms. Mit mehr Zielen muss sie länger sein, damit alle schaffbar
 * bleiben (n × Zeit pro Ziel + 25 % Reserve + 0,5 s).
 */
export function lifeMs(level: number): number {
  const n = countFor(level);
  return Math.round((n * tapIntervalS(level) * 1.25 + 0.5) * 1000);
}

/** Wartezeit bis ein neues Ziel erscheint (ms) */
export function respawnDelayMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(280, 520);
}

/**
 * Restzeit-Anteile (0..1) der Start-Ziele: gleichmäßig von 0,45 bis 1, zufällig verteilt –
 * so ist von Anfang an erkennbar, welches Ziel dringender ist.
 */
export function initialFractions(n: number, rng: Pick<Rng, 'shuffle'>): number[] {
  if (n <= 1) return [1];
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(0.45 + 0.55 * (i / (n - 1)));
  return rng.shuffle(out);
}

/** Index des dringendsten Ziels (kleinste Restzeit), −1 ohne Ziele */
export function mostUrgent(remaining: readonly number[]): number {
  let best = -1;
  for (let i = 0; i < remaining.length; i++) if (best < 0 || remaining[i] < remaining[best]) best = i;
  return best;
}

/** War das getippte Ziel (Index) praktisch das dringendste? */
export function isInOrder(remaining: readonly number[], idx: number, tol = ORDER_TOLERANCE_MS): boolean {
  if (idx < 0 || idx >= remaining.length) return false;
  return remaining[idx] <= Math.min(...remaining) + tol;
}

// ---------------------------------------------------------------------------
// Bewegung

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface Walker {
  x: number;
  y: number;
  ang: number;
  /** Drehrate in rad/s (langsam schwankend → weiche Kurven) */
  turn: number;
}

/** Bounds mit Mindestausdehnung: fällt der Bereich zu klein aus, schrumpft er auf die Mitte */
export function span(minX: number, maxX: number, minY: number, maxY: number): Bounds {
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;
  return { minX, maxX, minY, maxY };
}

/**
 * Weiches Wandern: die Drehrate schwankt als Ornstein-Uhlenbeck-Prozess (Rückstellzeit 0,9 s,
 * Streuung ≈ 0,6 rad/s ≈ 34°/s). Mit dt gerechnet, also bildratenunabhängig.
 */
export function steer(w: Walker, dt: number, rng: Pick<Rng, 'normal'>): void {
  const tau = 0.9;
  const sigma = 0.6;
  w.turn += (-w.turn / tau) * dt + sigma * Math.sqrt((2 / tau) * dt) * rng.normal();
  w.turn = clamp(w.turn, -1.6, 1.6);
  w.ang += w.turn * dt;
}

/** Spiegelt Position und Richtung an den Grenzen. true, wenn abgeprallt. */
export function bounce(o: { x: number; y: number; ang: number; turn?: number }, b: Bounds): boolean {
  let bounced = false;
  if (o.x < b.minX || o.x > b.maxX) {
    const low = o.x < b.minX;
    const edge = low ? b.minX : b.maxX;
    const outward = low ? Math.cos(o.ang) < 0 : Math.cos(o.ang) > 0;
    o.x = clamp(outward ? 2 * edge - o.x : o.x, b.minX, b.maxX);
    if (outward) {
      o.ang = Math.PI - o.ang;
      if (o.turn !== undefined) o.turn = -o.turn;
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
      if (o.turn !== undefined) o.turn = -o.turn;
      bounced = true;
    }
  }
  return bounced;
}

export interface Pt {
  x: number;
  y: number;
}

/**
 * Überlappende Ziele sanft auseinanderschieben (Mindestabstand je Paar = ra + rb + gap).
 * Verändert die Positionen direkt; Richtung bleibt unverändert.
 */
export function separate(items: Array<Pt & { r: number }>, gap: number): void {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      const min = a.r + b.r + gap;
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d = Math.hypot(dx, dy);
      if (d >= min) continue;
      if (d < 1e-6) {
        dx = 1;
        dy = 0;
        d = 1;
      }
      const push = (min - d) / 2;
      a.x -= (dx / d) * push;
      a.y -= (dy / d) * push;
      b.x += (dx / d) * push;
      b.y += (dy / d) * push;
    }
  }
}

/**
 * Startort eines neuen Ziels: weit von allen anderen Zielen und vom zuletzt getippten Punkt
 * (dort liegt noch der Finger). Nimmt den ersten passenden Kandidaten, sonst den besten.
 */
export function pickSpawnPoint(
  rng: Pick<Rng, 'range'>,
  b: Bounds,
  others: readonly Pt[],
  avoid: Pt | null,
  minDist: number,
  avoidDist: number,
): Pt {
  let best: Pt = { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  let bestScore = -Infinity;
  for (let i = 0; i < 40; i++) {
    const c = { x: rng.range(b.minX, b.maxX), y: rng.range(b.minY, b.maxY) };
    let dOthers = Infinity;
    for (const o of others) dOthers = Math.min(dOthers, Math.hypot(c.x - o.x, c.y - o.y));
    const dAvoid = avoid ? Math.hypot(c.x - avoid.x, c.y - avoid.y) : Infinity;
    if (dOthers >= minDist && dAvoid >= avoidDist) return c;
    const score = Math.min(dOthers / minDist, dAvoid / avoidDist);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Auswertung

export interface Stats {
  hits: number;
  /** Median der Zeit von Treffer zu Treffer in ms (NaN ohne Treffer) */
  medianMs: number;
  /** Anteil der Treffer in Reihenfolge (%, NaN bei weniger als `minHits` Treffern) */
  orderRate: number;
  missTaps: number;
  expired: number;
}

export function computeStats(gaps: readonly number[], orderFlags: readonly boolean[], missTaps: number, expired: number, minHits = 3): Stats {
  const n = orderFlags.length;
  const ok = orderFlags.filter(Boolean).length;
  return {
    hits: n,
    medianMs: median(gaps),
    orderRate: n >= minHits ? (100 * ok) / n : NaN,
    missTaps,
    expired,
  };
}

/** Schlüssel in texts.tips: miss | expired | order | great */
export function tipFor(s: Stats): string {
  if (s.expired >= 3 && s.expired >= s.missTaps) return 'expired';
  if (s.missTaps >= 4) return 'miss';
  if (Number.isFinite(s.orderRate) && s.orderRate < 60) return 'order';
  return 'great';
}

/** Punkte je Treffer: 10 + 2 je Stufe über 1, +5 wenn das dringendste Ziel getippt wurde */
export function pointsFor(level: number, inOrder: boolean): number {
  return 10 + 2 * (levelOf(level) - 1) + (inOrder ? 5 : 0);
}
