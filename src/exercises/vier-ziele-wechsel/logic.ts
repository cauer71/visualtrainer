/**
 * 4-Ziele-Wechsel – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Vier Ziele in den Ecken (0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts). Immer genau eines ist das
 * aktuelle Ziel (Ring) und wird angetippt. Die Stufentabelle hat 12 Schritte; jeder Schritt ändert genau einen
 * Parameter: Größe → Rand (wie weit die Ziele nach außen rücken) → Pause → ähnliche Zeichen → Symbole → Ablenker.
 * Nach je 12 Zielen (ein Abschnitt) entscheidet eine feste Regel über die nächste Stufe (≥ 90 % und gleichmäßige
 * Zeit → eine Stufe schwerer, 75–89 % gleich, < 75 % eine Stufe leichter).
 *
 * Gemessen wird die Zeit vom Erscheinen des Rings bis zum Tipp (Reaktionszeit Ziel → Touch). Darin stecken
 * Hinsehen, Erkennen, Entscheiden und die Fingerbewegung; der Blick selbst wird nicht gemessen.
 */
import type { Rng } from '../../core/rng';
import { clamp, mean, median, quantile } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 12;
export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufentabelle

export type SignSet = 'distinct' | 'similar' | 'symbols';

export interface LevelParams {
  level: number;
  /** Zeichenhöhe in u (1 % der kürzeren Seite) */
  sizeU: number;
  /** Rand: Anteil der halben Feldbreite/-höhe, um den die Ziele von der Mitte weg liegen (1 = ganz in die Ecke) */
  reach: number;
  /** Mitte der Pause zwischen Treffer und nächstem Ziel in ms */
  pauseMs: number;
  /** Zeichenvorrat der vier Ziele */
  signs: SignSet;
  /** Anzahl der Ablenker (andere Zeichen im Feld, nicht antippen) */
  distractors: number;
}

export const PARAM_KEYS = ['sizeU', 'reach', 'pauseMs', 'signs', 'distractors'] as const;
export type ParamKey = (typeof PARAM_KEYS)[number];

const P = (level: number, sizeU: number, reach: number, pauseMs: number, signs: SignSet, distractors: number): LevelParams => ({
  level,
  sizeU,
  reach,
  pauseMs,
  signs,
  distractors,
});

/**
 * Stufe | Größe | Rand | Pause | Zeichen   | Ablenker | geändert gegenüber der Stufe davor
 *   1   |  20 u | 0,55 | 1200  | A B C D   |    0     | – (Einstieg: sehr große Ziele, kein Zeitdruck)
 *   2   |  14 u | 0,55 | 1200  | A B C D   |    0     | Größe
 *   3   |   9 u | 0,55 | 1200  | A B C D   |    0     | Größe
 *   4   |   9 u | 0,78 | 1200  | A B C D   |    0     | Rand
 *   5   |   9 u | 1,00 | 1200  | A B C D   |    0     | Rand (ganz in die Ecken)
 *   6   |   9 u | 1,00 | 1000  | A B C D   |    0     | Pause
 *   7   |   9 u | 1,00 |  800  | A B C D   |    0     | Pause
 *   8   |   9 u | 1,00 |  600  | A B C D   |    0     | Pause
 *   9   |   9 u | 1,00 |  600  | B D P R   |    0     | Zeichen (ähnlich)
 *  10   |   9 u | 1,00 |  600  | Symbole   |    0     | Zeichen (kleine Symbole)
 *  11   |   9 u | 1,00 |  600  | Symbole   |    3     | Ablenker
 *  12   |   9 u | 1,00 |  600  | Symbole   |    6     | Ablenker
 */
export const LEVELS: readonly LevelParams[] = [
  P(1, 20, 0.55, 1200, 'distinct', 0),
  P(2, 14, 0.55, 1200, 'distinct', 0),
  P(3, 9, 0.55, 1200, 'distinct', 0),
  P(4, 9, 0.78, 1200, 'distinct', 0),
  P(5, 9, 1.0, 1200, 'distinct', 0),
  P(6, 9, 1.0, 1000, 'distinct', 0),
  P(7, 9, 1.0, 800, 'distinct', 0),
  P(8, 9, 1.0, 600, 'distinct', 0),
  P(9, 9, 1.0, 600, 'similar', 0),
  P(10, 9, 1.0, 600, 'symbols', 0),
  P(11, 9, 1.0, 600, 'symbols', 3),
  P(12, 9, 1.0, 600, 'symbols', 6),
];

export const paramsFor = (level: number): LevelParams => LEVELS[levelOf(level) - 1];

/** Welche Parameter unterscheiden sich zwischen zwei Stufen? (Test: je Schritt genau einer) */
export function changedParams(a: LevelParams, b: LevelParams): ParamKey[] {
  return PARAM_KEYS.filter((k) => a[k] !== b[k]);
}

/** Zeichenvorrat je Satz. Symbole sind Namen, gezeichnet wird in index.ts. */
export const SIGNS: Record<SignSet, readonly string[]> = {
  distinct: ['A', 'B', 'C', 'D'],
  similar: ['B', 'D', 'P', 'R'],
  symbols: ['triangle', 'square', 'diamond', 'star'],
};

/** Ablenker-Zeichen (nie identisch mit einem Hauptzeichen der Stufen 11–12, den Symbolen) */
export const DISTRACTOR_KINDS = ['x', 'plus', 'ring', '4', '7', 'H'] as const;

/** Abstand zwischen Treffer und nächstem Ziel: gleichverteilt von 0,5 × Mitte bis 4/3 × Mitte (Stufe 8+: 300–800 ms) */
export function pauseWindow(level: number | LevelParams): { min: number; max: number } {
  const c = (typeof level === 'number' ? paramsFor(level) : level).pauseMs;
  return { min: Math.round(c * 0.5), max: Math.round((c * 4) / 3) };
}

export function pauseMs(rng: Pick<Rng, 'range'>, level: number): number {
  const w = pauseWindow(level);
  return rng.range(w.min, w.max);
}

// ---------------------------------------------------------------------------
// Ablauf: Blöcke, Abschnitte, Fristen

/** Ein Abschnitt = so viele Ziele, dann wird die Stufe angepasst */
export const SEGMENT_TARGETS = 12;
export const QUICK_SEGMENT_TARGETS = 3;
/** Frist bis zur Auslassung; das Ziel bleibt danach aktiv (Stufe 1 ohne Zeitdruck: nichts verschwindet) */
export const OMIT_MS = 6000;
/** Tipps schneller als das nach dem Erscheinen des Rings sind Vorwegnehmen, keine Antwort */
export const MIN_RT_MS = 100;
/** Folgetipps innerhalb dieser Zeit werden ignoriert (Doppeltipp) */
export const DOUBLE_TAP_MS = 250;

export interface BlockPlan {
  blocks: number;
  blockMs: number;
  /** Vorschlag für die Pause zwischen den Blöcken; sie endet von selbst oder durch Antippen */
  restMs: number;
  /** Kurze Startphase: alle vier Zeichen sichtbar, noch kein Ziel */
  startMs: number;
  segment: number;
}

export function blockPlan(quick: boolean): BlockPlan {
  return quick
    ? { blocks: 3, blockMs: 6000, restMs: 2200, startMs: 700, segment: QUICK_SEGMENT_TARGETS }
    : { blocks: 3, blockMs: 60000, restMs: 10000, startMs: 1300, segment: SEGMENT_TARGETS };
}

// ---------------------------------------------------------------------------
// Ecken und Richtungen

export type Corner = 0 | 1 | 2 | 3;
export const CORNERS: readonly Corner[] = [0, 1, 2, 3];
export const cornerCol = (c: number): number => c & 1;
export const cornerRow = (c: number): number => c >> 1;

export type Direction = 'right' | 'left' | 'down' | 'up' | 'downRight' | 'upLeft' | 'upRight' | 'downLeft';
export const DIRECTIONS: readonly Direction[] = ['right', 'left', 'down', 'up', 'downRight', 'upLeft', 'upRight', 'downLeft'];
export const ARROW: Record<Direction, string> = {
  right: '→',
  left: '←',
  down: '↓',
  up: '↑',
  downRight: '↘',
  upLeft: '↖',
  upRight: '↗',
  downLeft: '↙',
};

/** Richtung des Wechsels von der Ecke `from` zur Ecke `to` (Bildschirm: y nach unten); null bei gleicher Ecke */
export function directionOf(from: number, to: number): Direction | null {
  if (from === to) return null;
  const dx = cornerCol(to) - cornerCol(from);
  const dy = cornerRow(to) - cornerRow(from);
  if (dy === 0) return dx > 0 ? 'right' : 'left';
  if (dx === 0) return dy > 0 ? 'down' : 'up';
  if (dy > 0) return dx > 0 ? 'downRight' : 'downLeft';
  return dx > 0 ? 'upRight' : 'upLeft';
}

// ---------------------------------------------------------------------------
// Zielfolge

const zeros = (): number[][] => Array.from({ length: 4 }, () => [0, 0, 0, 0]);

/**
 * Unvorhersehbare, ausgewogene Zielfolge:
 * - nie dasselbe Ziel zweimal hintereinander,
 * - kein Pendeln (A B A B ist ausgeschlossen),
 * - die 12 gerichteten Wechsel werden über die Zeit etwa gleich oft genutzt: von der aktuellen Ecke aus sind
 *   die am seltensten genutzten Wechsel doppelt so wahrscheinlich wie die um eins häufigeren; seltener als
 *   „seltenster + 1“ wird nichts gewählt.
 */
export class TargetSequence {
  readonly history: number[] = [];
  /** counts[von][nach] */
  readonly counts: number[][] = zeros();

  get last(): number | null {
    return this.history.length ? this.history[this.history.length - 1] : null;
  }

  next(rng: Pick<Rng, 'int' | 'next'>): number {
    const h = this.history;
    const n = h.length;
    if (n === 0) {
      const first = rng.int(4);
      h.push(first);
      return first;
    }
    const prev = h[n - 1];
    const forbid = n >= 3 && h[n - 3] === prev ? h[n - 2] : -1; // A B A → nicht wieder B
    const cand = CORNERS.filter((c) => c !== prev && c !== forbid);
    const row = this.counts[prev];
    const min = Math.min(...cand.map((c) => row[c]));
    const weight: number[] = cand.map((c) => (row[c] === min ? 2 : row[c] === min + 1 ? 1 : 0));
    const total = weight.reduce((a, b) => a + b, 0);
    let r = rng.next() * total;
    let pick = cand[0];
    for (let i = 0; i < cand.length; i++) {
      if (weight[i] <= 0) continue;
      pick = cand[i];
      r -= weight[i];
      if (r < 0) break;
    }
    this.counts[prev][pick]++;
    h.push(pick);
    return pick;
  }
}

// ---------------------------------------------------------------------------
// Geometrie

/** Kleinste Zeichenhöhe in px (schwerste Stufe) */
export const MIN_GLYPH_PX = 34;
/** Trefferradius je Ziel in px: Regel ≥ 72, nur auf sehr kleinen Feldern bis auf 56 verkleinert */
export const HIT_R_PX = 72;
export const HIT_R_MIN_PX = 56;
/** Ringradius im Verhältnis zur Zeichenhöhe */
export const RING_PER_GLYPH = 0.85;

export interface Pt {
  x: number;
  y: number;
}

export interface Layout {
  w: number;
  h: number;
  centers: Pt[];
  /** Zeichenhöhe (Versalhöhe) in px */
  glyph: number;
  /** sichtbarer Ringradius und Trefferradius */
  r: number;
  hitR: number;
}

/**
 * Feld `w × h` (h = Unterkante des nutzbaren Feldes). Die Ziele liegen in den vier Ecken; `reach` = 1 schiebt sie
 * so weit nach außen, dass der ganze Trefferkreis noch auf der Bühne liegt. Die Trefferkreise überlappen nie.
 */
export function layoutFor(w: number, h: number, u: number, sizeU: number, reach: number): Layout {
  const margin = Math.max(6, u * 1.2);
  const short = Math.min(w, h);
  const hitFit = (short / 2 - margin) / 2; // zwei Trefferkreise nebeneinander passen noch in die halbe Seite
  let glyph = Math.max(MIN_GLYPH_PX, sizeU * u);
  const r0 = glyph * RING_PER_GLYPH;
  const hitR = Math.min(Math.max(HIT_R_PX, r0 + 8), Math.max(HIT_R_MIN_PX, hitFit));
  const r = Math.min(r0, hitR - 6);
  if (r < r0) glyph = r / RING_PER_GLYPH;
  const pad = hitR + margin;
  const halfW = w / 2;
  const halfH = h / 2;
  const dx = clamp(reach * halfW, hitR, Math.max(hitR, halfW - pad));
  const dy = clamp(reach * halfH, hitR, Math.max(hitR, halfH - pad));
  const cx = w / 2;
  const cy = h / 2;
  return {
    w,
    h,
    glyph,
    r,
    hitR,
    centers: [
      { x: cx - dx, y: cy - dy },
      { x: cx + dx, y: cy - dy },
      { x: cx - dx, y: cy + dy },
      { x: cx + dx, y: cy + dy },
    ],
  };
}

export const inCircle = (x: number, y: number, cx: number, cy: number, r: number): boolean => Math.hypot(x - cx, y - cy) <= r;

/** Nummer der Ecke, deren Trefferkreis den Punkt enthält, sonst -1 (die Kreise überlappen nicht) */
export function cornerAt(lay: Layout, x: number, y: number): number {
  for (let i = 0; i < 4; i++) if (inCircle(x, y, lay.centers[i].x, lay.centers[i].y, lay.hitR)) return i;
  return -1;
}

export interface Distractor {
  kind: string;
  x: number;
  y: number;
}

/** Zeichenhöhe der Ablenker im Verhältnis zu den Hauptzeichen und Trefferradius ihrer Berührungsfläche */
export const distractorHitR = (glyph: number): number => Math.max(28, glyph * 0.75);

/**
 * Ablenker im freien Feld zwischen den Zielen. Rein deterministisch aus `seeds` und der Geometrie: keine
 * Bewegung, kein Neuwürfeln, auch nach dem Drehen des Geräts stimmt die Anordnung. Die ersten n Punkte
 * sind unabhängig von `count` immer dieselben (Präfix), so kann sich die Zahl ändern, ohne dass etwas springt.
 */
export function distractorsFor(count: number, seeds: readonly number[], lay: Layout): Distractor[] {
  const out: Distractor[] = [];
  if (count <= 0 || !seeds.length) return out;
  const dHit = distractorHitR(lay.glyph);
  const edge = dHit + 6;
  const keepOut = lay.hitR + dHit + 10;
  const cand: Pt[] = [];
  const cols = 13;
  const rows = 13;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = edge + ((lay.w - 2 * edge) * i) / (cols - 1);
      const y = edge + ((lay.h - 2 * edge) * j) / (rows - 1);
      if (lay.centers.every((c) => Math.hypot(x - c.x, y - c.y) >= keepOut)) cand.push({ x, y });
    }
  }
  if (!cand.length) return out;
  const chosen: Pt[] = [];
  const base = Math.abs(Math.floor(seeds[0]));
  for (let k = 0; k < count; k++) {
    const s = Math.abs(Math.floor(seeds[k % seeds.length]));
    let pick: Pt | null = null;
    if (k === 0) {
      pick = cand[s % cand.length];
    } else {
      // die am weitesten von den schon gewählten Punkten entfernten Kandidaten, darunter nach Zufallszahl
      const ranked = cand
        .map((c) => ({ c, d: Math.min(...chosen.map((p) => Math.hypot(c.x - p.x, c.y - p.y))) }))
        .filter((e) => e.d >= 2 * dHit + 8)
        .sort((a, b) => b.d - a.d || a.c.x - b.c.x || a.c.y - b.c.y);
      if (!ranked.length) break;
      pick = ranked[s % Math.min(5, ranked.length)].c;
    }
    chosen.push(pick);
    out.push({ kind: DISTRACTOR_KINDS[(base + k) % DISTRACTOR_KINDS.length], x: pick.x, y: pick.y });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Durchgänge und Auswertung

export interface Trial {
  index: number;
  /** Ecke des vorigen Ziels (null beim ersten) */
  from: number | null;
  to: number;
  level: number;
  /** erster Tipp richtig, nichts ausgelassen, nichts Falsches davor */
  clean: boolean;
  /** Reaktionszeit Ziel → Touch in ms; nur bei `clean` */
  rt: number | null;
  /** falsche Ziele (je Tipp) */
  errors: number;
  distractorTaps: number;
  omitted: boolean;
}

/** Abschnitt: Treffer = saubere Durchgänge */
export interface SegmentStats {
  total: number;
  hits: number;
  /** 0..1 */
  accuracy: number;
  meanMs: number;
  stable: boolean;
}

/** Gleichmäßige Zeit: Streuung (Quartilsabstand) höchstens 60 % des Medians, bei mindestens 4 gültigen Zeiten */
export const STABLE_SPREAD = 0.6;

export function isStable(rts: readonly number[]): boolean {
  if (rts.length < 4) return false;
  const med = median(rts);
  if (!(med > 0)) return false;
  return (quantile(rts, 0.75) - quantile(rts, 0.25)) / med <= STABLE_SPREAD;
}

export function evalSegment(trials: readonly Trial[]): SegmentStats {
  const rts = trials.filter((t) => t.clean && t.rt !== null).map((t) => t.rt as number);
  const total = trials.length;
  return {
    total,
    hits: rts.length,
    accuracy: total ? rts.length / total : 0,
    meanMs: rts.length ? mean(rts) : NaN,
    stable: isStable(rts),
  };
}

export type Move = 'harder' | 'same' | 'easier';

/** ≥ 90 % richtig und gleichmäßige Zeit → schwerer; 75–89 % (oder ≥ 90 % mit unruhiger Zeit) → gleich; < 75 % → leichter */
export function moveFor(s: Pick<SegmentStats, 'accuracy' | 'stable'>): Move {
  if (s.accuracy >= 0.9 - 1e-9) return s.stable ? 'harder' : 'same';
  if (s.accuracy >= 0.75 - 1e-9) return 'same';
  return 'easier';
}

export function applyMove(level: number, move: Move): number {
  return levelOf(level + (move === 'harder' ? 1 : move === 'easier' ? -1 : 0));
}

export interface SegmentLog {
  level: number;
  accuracy: number;
}

/**
 * Erreichte Stufe (Hauptwert): die höchste Stufe, auf der ein Abschnitt mit mindestens 75 % richtig geschafft wurde.
 * Ohne so einen Abschnitt: eine unter der niedrigsten gespielten Stufe (nicht unter 1); ohne Abschnitt: die aktuelle.
 */
export function reachedLevel(segments: readonly SegmentLog[], current: number): number {
  if (!segments.length) return levelOf(current);
  const ok = segments.filter((s) => s.accuracy >= 0.75 - 1e-9).map((s) => s.level);
  if (ok.length) return levelOf(Math.max(...ok));
  return levelOf(Math.min(...segments.map((s) => s.level)) - 1);
}

export interface DirectionStat {
  dir: Direction;
  /** richtige Antworten in dieser Richtung */
  n: number;
  /** Mittelwert in ms; NaN bei weniger als `minPerDirection` richtigen Antworten */
  meanMs: number;
}

export interface Summary {
  /** Ziele mit Ergebnis */
  total: number;
  hits: number;
  errors: number;
  distractorTaps: number;
  omissions: number;
  meanMs: number;
  /** erste und letzte Hälfte der Ziele (mittleres Ziel bei ungerader Zahl bleibt draußen) */
  firstHalfMs: number;
  lastHalfMs: number;
  firstHalfHits: number;
  firstHalfTotal: number;
  lastHalfHits: number;
  lastHalfTotal: number;
  directions: DirectionStat[];
  fastest: Direction | null;
  slowest: Direction | null;
}

/** Mindestzahl richtiger Antworten für einen Mittelwert (Richtung, Hälfte) */
export const MIN_FOR_MEAN = 3;

const meanOrNaN = (xs: readonly number[], min = MIN_FOR_MEAN): number => (xs.length >= min ? mean(xs) : NaN);
const rtsOf = (ts: readonly Trial[]): number[] => ts.filter((t) => t.clean && t.rt !== null).map((t) => t.rt as number);

export function summarize(trials: readonly Trial[], minPerDirection = MIN_FOR_MEAN): Summary {
  const n = trials.length;
  const half = Math.floor(n / 2);
  const first = trials.slice(0, half);
  const last = trials.slice(n - half);
  const all = rtsOf(trials);
  const directions: DirectionStat[] = DIRECTIONS.map((dir) => {
    const rts = rtsOf(trials.filter((t) => t.from !== null && directionOf(t.from, t.to) === dir));
    return { dir, n: rts.length, meanMs: meanOrNaN(rts, minPerDirection) };
  });
  const ok = directions.filter((d) => Number.isFinite(d.meanMs));
  let fastest: Direction | null = null;
  let slowest: Direction | null = null;
  if (ok.length >= 2) {
    const sorted = [...ok].sort((a, b) => a.meanMs - b.meanMs);
    if (sorted[sorted.length - 1].meanMs > sorted[0].meanMs) {
      fastest = sorted[0].dir;
      slowest = sorted[sorted.length - 1].dir;
    }
  }
  return {
    total: n,
    hits: all.length,
    errors: trials.reduce((a, t) => a + t.errors, 0),
    distractorTaps: trials.reduce((a, t) => a + t.distractorTaps, 0),
    omissions: trials.filter((t) => t.omitted).length,
    meanMs: all.length ? mean(all) : NaN,
    firstHalfMs: meanOrNaN(rtsOf(first)),
    lastHalfMs: meanOrNaN(rtsOf(last)),
    firstHalfHits: rtsOf(first).length,
    firstHalfTotal: first.length,
    lastHalfHits: rtsOf(last).length,
    lastHalfTotal: last.length,
    directions,
    fastest,
    slowest,
  };
}

/** Punkte je sauberem Treffer: nur zur Motivation, nie als Hauptwert angezeigt */
export function pointsFor(level: number, rt: number): number {
  return 10 + 2 * (levelOf(level) - 1) + Math.round(Math.max(0, 1 - rt / 3000) * 10);
}

/** Schlüssel in texts.tips: wrong | slow | distractor | tired | direction | great */
export function tipFor(s: Summary): string {
  if (s.total < 6) return 'great';
  if (s.errors >= 3 && s.errors >= s.omissions) return 'wrong';
  if (s.distractorTaps >= 3) return 'distractor';
  if (s.omissions >= 3) return 'slow';
  if (Number.isFinite(s.firstHalfMs) && Number.isFinite(s.lastHalfMs) && s.lastHalfMs > s.firstHalfMs * 1.15) return 'tired';
  const f = s.directions.find((d) => d.dir === s.fastest);
  const l = s.directions.find((d) => d.dir === s.slowest);
  if (f && l && l.meanMs > f.meanMs * 1.3) return 'direction';
  return 'great';
}
