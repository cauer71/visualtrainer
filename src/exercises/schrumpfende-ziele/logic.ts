/**
 * Schrumpfende Ziele – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * In jeder Runde erscheinen 2–5 Kreise gleichzeitig. Alle schrumpfen mit demselben Tempo und sind
 * weg, sobald sie den Mindestradius erreichen. Weil sie verschieden groß starten, ist der kleinste
 * Kreis immer der, der als Erster verschwindet: Größe = Dringlichkeit. Man tippt die Kreise in
 * dieser Reihenfolge (kleinster zuerst). Die Stufe regelt Anzahl und Tempo.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 16;
/** Runden je Sitzung (feste Zahl, keine Zeitgutschrift) */
export const ROUNDS = 12;
export const QUICK_ROUNDS = 3;
/** Kreise gelten als „gleich groß“ (beide Reihenfolgen zählen), wenn der Größere höchstens so viel größer ist */
export const ORDER_TOLERANCE = 1.1;
/** Radius in u, bei dem ein Kreis verschwindet */
export const MIN_RADIUS_U = 1.6;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Gleichzeitige Kreise: Stufe 1–4 → 2, 5–8 → 3, 9–12 → 4, ab 13 → 5 */
export function countFor(level: number): number {
  return clamp(2 + Math.floor((levelOf(level) - 1) / 4), 2, 5);
}

/** Schrumpftempo in u/s (1 u = 1 % der kürzeren Bühnenseite): 1,6 → 2,65 */
export function shrinkRateU(level: number): number {
  return 1.6 + 0.07 * (levelOf(level) - 1);
}

/** Lebensdauer des kleinsten (dringendsten) Kreises in ms: 2,3 s → 1,2 s */
export function firstLifeMs(level: number): number {
  return Math.max(1100, Math.round(2300 - 75 * (levelOf(level) - 1)));
}

/** Abstand der Lebensdauern zweier in der Größe benachbarter Kreise in ms: 800 → 455 */
export function lifeStepMs(level: number): number {
  return Math.max(420, Math.round(800 - 23 * (levelOf(level) - 1)));
}

/** Lebensdauern (ms) der Kreise einer Runde, aufsteigend: kleinster Kreis zuerst */
export function lifespans(level: number): number[] {
  const n = countFor(level);
  const first = firstLifeMs(level);
  const step = lifeStepMs(level);
  return Array.from({ length: n }, (_, k) => first + k * step);
}

/** Startradius in u für eine Lebensdauer (alle schrumpfen mit `rate` u/s bis MIN_RADIUS_U) */
export function startRadiusU(rate: number, lifeMsValue: number): number {
  return MIN_RADIUS_U + (rate * lifeMsValue) / 1000;
}

/** Radius in u nach `ageMs` (linear, nie unter dem Mindestradius) */
export function radiusU(rate: number, lifeMsValue: number, ageMs: number): number {
  const r0 = startRadiusU(rate, lifeMsValue);
  const k = lifeMsValue > 0 ? clamp(ageMs / lifeMsValue, 0, 1) : 1;
  return MIN_RADIUS_U + (r0 - MIN_RADIUS_U) * (1 - k);
}

/** Trefferfläche: größer als das sichtbare Ziel, nie unter 24 px Radius */
export const hitRadiusPx = (r: number): number => Math.max(r + 8, 24);

/** Pause zwischen zwei Runden in ms */
export function roundGapMs(rng: Pick<Rng, 'range'>): number {
  return rng.range(650, 1000);
}

export interface Placed {
  nx: number;
  ny: number;
}

/**
 * Orte für die Kreise einer Runde in normierten Feldkoordinaten (0..1): mit Randabstand, mit
 * Mindestabstand zueinander (Summe der Radien + Lücke) und – falls angegeben – mit Abstand zum
 * zuletzt getippten Punkt. `radii` sind Pixelradien in der Reihenfolge der Kreise; gesetzt wird
 * der größte zuerst, damit er sicher Platz findet. Gibt die Orte in der Eingabereihenfolge zurück.
 * Findet sich nach `tries` Versuchen kein Platz, gewinnt der Kandidat mit dem größten Abstand.
 */
export function placeTargets(
  rng: Pick<Rng, 'range'>,
  fw: number,
  fh: number,
  radii: readonly number[],
  gap: number,
  avoid: { x: number; y: number } | null,
  avoidDist: number,
  tries = 60,
): Placed[] {
  const order = radii.map((r, i) => ({ r, i })).sort((a, b) => b.r - a.r);
  const out: Placed[] = new Array(radii.length);
  const pts: Array<{ x: number; y: number; r: number }> = [];
  for (const { r, i } of order) {
    const m = r * 1.15;
    const x0 = Math.min(m, fw / 2);
    const x1 = Math.max(fw - m, fw / 2);
    const y0 = Math.min(m, fh / 2);
    const y1 = Math.max(fh - m, fh / 2);
    let best = { x: fw / 2, y: fh / 2 };
    let bestScore = -Infinity;
    for (let k = 0; k < tries; k++) {
      const x = rng.range(x0, x1);
      const y = rng.range(y0, y1);
      let free = Infinity;
      for (const p of pts) free = Math.min(free, Math.hypot(x - p.x, y - p.y) - (p.r + r + gap));
      const away = avoid ? Math.hypot(x - avoid.x, y - avoid.y) - avoidDist : Infinity;
      const score = Math.min(free, away);
      if (score > bestScore) {
        bestScore = score;
        best = { x, y };
      }
      if (score >= 0) break;
    }
    pts.push({ x: best.x, y: best.y, r });
    out[i] = { nx: fw > 0 ? best.x / fw : 0.5, ny: fh > 0 ? best.y / fh : 0.5 };
  }
  return out;
}

/** Index des kleinsten Radius (−1 ohne Kreise) */
export function smallestIndex(radii: readonly number[]): number {
  let best = -1;
  for (let i = 0; i < radii.length; i++) if (best < 0 || radii[i] < radii[best]) best = i;
  return best;
}

/** War der getippte Kreis (Index) praktisch der kleinste? */
export function isInOrder(radii: readonly number[], idx: number, tol = ORDER_TOLERANCE): boolean {
  if (idx < 0 || idx >= radii.length) return false;
  return radii[idx] <= Math.min(...radii) * tol;
}

/** Punkte je abgeräumtem Kreis: Grundwert steigt mit der Stufe, +5 wenn der kleinste getippt wurde */
export function pointsFor(level: number, inOrder: boolean): number {
  return 10 + 2 * (levelOf(level) - 1) + (inOrder ? 5 : 0);
}

export interface Stats {
  cleared: number;
  /** Kreise, die verschwunden sind, bevor du sie getippt hast */
  vanished: number;
  wrong: number;
  /** Anteil der Tipps, die den kleinsten Kreis trafen, in % (NaN bei weniger als `minTaps` Tipps) */
  orderRate: number;
}

export function computeStats(orderFlags: readonly boolean[], vanished: number, wrong: number, minTaps = 3): Stats {
  const n = orderFlags.length;
  const ok = orderFlags.filter(Boolean).length;
  return { cleared: n, vanished, wrong, orderRate: n >= minTaps ? (100 * ok) / n : NaN };
}

/** Schlüssel in texts.tips: order | gone | wrong | great */
export function tipFor(s: Stats): string {
  if (Number.isFinite(s.orderRate) && s.orderRate < 65) return 'order';
  if (s.vanished >= 3) return 'gone';
  if (s.wrong >= 4) return 'wrong';
  return 'great';
}
