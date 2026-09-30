/**
 * Rand-Ping – reine Logik (ohne Canvas), damit sie per vitest prüfbar ist.
 *
 * In der Mitte ruht ein Fixierkreuz; dort erscheint kurz ein Zeichen (Kreis oder Quadrat). Gleichzeitig
 * blendet am Rand ein Punkt weich ein und aus. Danach tippt man den Ort des Punktes und wählt das
 * Zeichen. Mögliche Orte: 8 Richtungen × 2–3 Ringe (Ellipse, nutzt die ganze Bühne). Die Stufe regelt
 * Anzeigedauer, Ringe und Punktgröße.
 *
 * Wohin man schaut, wird nicht gemessen (kein Eye-Tracker), und die Übung ist kein Gesichtsfeldtest.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const DIRS = 8;
export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
/** Weiches Ein- und Ausblenden: je mindestens 150 ms (kein Blitzen) */
export const FADE_MS = 150;
/** Kürzeste Gesamtdauer: 2 × 150 ms Übergang + 100 ms voll sichtbar */
export const MIN_EXPOSURE_MS = 400;
/** Ringe als Anteil des verfügbaren Halbmessers (innen, mitte, außen) */
export const RING_FRACS = [0.42, 0.7, 0.97] as const;

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Gesamtdauer des Reizes in ms (weich ein + halten + weich aus): 1000 ms auf Stufe 1, ≈ 10 % kürzer je Stufe, nie unter 400 ms */
export function exposureMs(level: number): number {
  return clamp(Math.round(1000 * Math.pow(0.9, levelOf(level) - 1)), MIN_EXPOSURE_MS, 1000);
}

/** Zeit, in der der Reiz voll sichtbar ist */
export function holdMs(level: number): number {
  return exposureMs(level) - 2 * FADE_MS;
}

/** Punktradius in u (1 % der kürzeren Seite): 3,6 → 2,5 */
export function dotRadiusU(level: number): number {
  return clamp(3.6 - 0.1 * (levelOf(level) - 1), 2.5, 3.6);
}

/** Deckkraft 0..1 eines weich ein- und ausgeblendeten Reizes (Glockenkurve aus zwei Sinus-Übergängen) */
export function windowAlpha(age: number, total: number, fade = FADE_MS): number {
  if (age <= 0 || age >= total) return 0;
  const f = Math.max(1, Math.min(fade, total / 2));
  const ease = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x, 0, 1));
  return Math.min(ease(age / f), ease((total - age) / f));
}

export interface Spot {
  /** 0–7, k · 45° (0 = rechts, im Uhrzeigersinn, 6 = oben) */
  dir: number;
  /** Index in RING_FRACS */
  ring: number;
}

/** Erlaubte Ringe: Stufe 1–4 innen + mitte, ab Stufe 5 auch außen */
export function ringsFor(level: number): number[] {
  return levelOf(level) <= 4 ? [0, 1] : [0, 1, 2];
}

/** Alle möglichen Orte einer Stufe (ringweise, je 8 Richtungen) */
export function spotsFor(level: number): Spot[] {
  const out: Spot[] = [];
  for (const ring of ringsFor(level)) for (let dir = 0; dir < DIRS; dir++) out.push({ dir, ring });
  return out;
}

const sameSpot = (a: Spot, b: Spot): boolean => a.dir === b.dir && a.ring === b.ring;

/**
 * Nächster Ort (Index in `spots`): nie dieselbe Richtung wie direkt zuvor, und unter den erlaubten
 * Orten immer einer der bisher am seltensten gezeigten – so kommen alle Orte gleich oft dran.
 */
export function pickSpot(rng: Pick<Rng, 'int'>, spots: readonly Spot[], history: readonly Spot[]): number {
  const last = history.length ? history[history.length - 1] : null;
  const counts = spots.map((s) => history.filter((h) => sameSpot(h, s)).length);
  let min = Infinity;
  spots.forEach((s, i) => {
    if (last && s.dir === last.dir) return;
    min = Math.min(min, counts[i]);
  });
  const pool: number[] = [];
  spots.forEach((s, i) => {
    if (last && s.dir === last.dir) return;
    if (counts[i] === min) pool.push(i);
  });
  return pool[rng.int(pool.length)];
}

/** Zentrales Zeichen: 0 = Kreis, 1 = Quadrat; nie mehr als dreimal dasselbe hintereinander */
export function pickSymbol(rng: Pick<Rng, 'chance'>, history: readonly number[]): 0 | 1 {
  const n = history.length;
  if (n >= 3 && history[n - 1] === history[n - 2] && history[n - 2] === history[n - 3]) return history[n - 1] === 0 ? 1 : 0;
  return rng.chance(0.5) ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Anordnung

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Pt {
  x: number;
  y: number;
}

export interface PingLayout {
  cx: number;
  cy: number;
  /** Halbachsen der äußersten Ellipse (Mitte des äußeren Punktes) */
  rx: number;
  ry: number;
  /** Hochformat: die zwei Antwort-Felder für das Zeichen liegen übereinander */
  stacked: boolean;
  /** Antwort-Felder für das Zeichen (Kreis, Quadrat), mindestens 56 px hoch */
  circleBtn: Rect;
  squareBtn: Rect;
  /** Tipps näher an der Mitte zählen nicht als Ortsantwort */
  centerExclusion: number;
}

/**
 * Bühne aufteilen: Mitte des Bereichs ist die Fixierstelle, die Ellipse nutzt die volle Breite und Höhe.
 * `bottom` = unterste nutzbare Kante (im Intro-Film über der Bildunterschrift), `dotR` = Punktradius in px.
 */
export function layoutPing(w: number, h: number, u: number, bottom: number, dotR: number): PingLayout {
  const m = Math.max(10, u * 2);
  const top = m;
  const bot = Math.max(top + 120, bottom - m * 0.5);
  const cx = w / 2;
  const cy = (top + bot) / 2;
  const pad = dotR * 1.4;
  const rx = Math.max(60, w / 2 - m - pad);
  const ry = Math.max(60, (bot - top) / 2 - pad);
  const stacked = w < h;
  const bw = Math.max(56, u * 10);
  const bh = Math.max(56, u * 10);
  const gap = Math.max(8, u * 1.6);
  const circleBtn: Rect = stacked
    ? { x: cx - bw / 2, y: cy - gap / 2 - bh, w: bw, h: bh }
    : { x: cx - gap / 2 - bw, y: cy - bh / 2, w: bw, h: bh };
  const squareBtn: Rect = stacked
    ? { x: cx - bw / 2, y: cy + gap / 2, w: bw, h: bh }
    : { x: cx + gap / 2, y: cy - bh / 2, w: bw, h: bh };
  return { cx, cy, rx, ry, stacked, circleBtn, squareBtn, centerExclusion: Math.min(rx, ry) * RING_FRACS[0] * 0.5 };
}

/** Mitte eines Ortes in Bühnenkoordinaten */
export function spotPos(lay: Pick<PingLayout, 'cx' | 'cy' | 'rx' | 'ry'>, s: Spot): Pt {
  const a = (s.dir * Math.PI) / 4;
  const f = RING_FRACS[s.ring];
  return { x: lay.cx + Math.cos(a) * lay.rx * f, y: lay.cy + Math.sin(a) * lay.ry * f };
}

/** Index des Ortes, der einem Tipp am nächsten liegt (−1 ohne Orte) */
export function nearestSpot(lay: Pick<PingLayout, 'cx' | 'cy' | 'rx' | 'ry'>, spots: readonly Spot[], x: number, y: number): number {
  let best = -1;
  let bestD = Infinity;
  spots.forEach((s, i) => {
    const p = spotPos(lay, s);
    const d = Math.hypot(p.x - x, p.y - y);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

// ---------------------------------------------------------------------------
// Auswertung

export interface TrialResult {
  edgeOk: boolean;
  centerOk: boolean;
  /** Ring des Punktes (0 innen … 2 außen) */
  ring: number;
}

export interface Stats {
  trials: number;
  /** Trefferquote Rand / Mitte in % (0 ohne Durchgänge) */
  edgeRate: number;
  centerRate: number;
  /** Trefferquote Rand je Ring (NaN, wenn weniger als `minPerRing` Durchgänge im Ring) */
  innerRate: number;
  outerRate: number;
}

export function computeStats(results: readonly TrialResult[], minPerRing = 3): Stats {
  const n = results.length;
  const rate = (xs: readonly TrialResult[], f: (r: TrialResult) => boolean): number => (xs.length ? (100 * xs.filter(f).length) / xs.length : 0);
  const inner = results.filter((r) => r.ring === 0);
  const outer = results.filter((r) => r.ring === 2);
  return {
    trials: n,
    edgeRate: rate(results, (r) => r.edgeOk),
    centerRate: rate(results, (r) => r.centerOk),
    innerRate: inner.length >= minPerRing ? rate(inner, (r) => r.edgeOk) : NaN,
    outerRate: outer.length >= minPerRing ? rate(outer, (r) => r.edgeOk) : NaN,
  };
}

/** Schlüssel in texts.tips: center | edge | far | great */
export function tipFor(s: Stats): string {
  if (s.trials < 4) return 'great';
  if (s.centerRate < 65) return 'center';
  if (s.edgeRate < 55) return 'edge';
  if (Number.isFinite(s.innerRate) && Number.isFinite(s.outerRate) && s.innerRate - s.outerRate >= 25) return 'far';
  return 'great';
}

/** Punkte je Durchgang: Rand 10 + 2 je Stufe über 1, Mitte +5 */
export function pointsFor(level: number, edgeOk: boolean, centerOk: boolean): number {
  return (edgeOk ? 10 + 2 * (levelOf(level) - 1) : 0) + (centerOk ? 5 : 0);
}
