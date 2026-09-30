/**
 * Muster nachzeichnen – reine Logik (Stützpunkte, Muster, Wertung), ohne Canvas und DOM.
 *
 * Ein Linienzug über n von 12 festen Stützpunkten (unregelmäßig verteilt, keine Reihen oder Spalten) wird kurz gezeigt,
 * dann mit dem Finger aus dem Gedächtnis nachgezeichnet: Stützpunkte nacheinander antippen oder mit dem Finger anfahren.
 * Bewertung: Anteil der Stützpunkte, die in richtiger Reihenfolge getroffen wurden (längste gemeinsame Teilfolge
 * aus gezeichneter und gezeigter Folge – ein vergessener Punkt verschiebt nicht alle folgenden).
 *
 * Stufen (1–20, höher = schwerer):
 * - Länge 3 → 9 Stützpunkte
 * - Einprägezeit je Punkt 900 ms → 450 ms (plus 1,2 s Grundzeit)
 * - Komplexität: ab Stufe 7 sind Kreuzungen im Linienzug erlaubt (Wahrscheinlichkeit steigt bis Stufe 18)
 * Jede Strecke des Linienzugs führt klar an allen anderen Stützpunkten vorbei, damit Ziehen nicht versehentlich
 * andere Punkte trifft.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Mindestanteil richtig getroffener Stützpunkte (in Reihenfolge) für einen gelungenen Durchgang */
export const PASS_FRACTION = 0.8;
/** Mindestabstand aller anderen Stützpunkte zu einer Strecke (normiert, Höhe = 1) */
export const CLEARANCE = 0.085;

export const levelOf = (level: number): number => clamp(level, MIN_LEVEL, MAX_LEVEL);

export interface Pos {
  x: number;
  y: number;
}

/** Feste Stützpunkte, normiert 0..1 im Feld (unregelmäßig wie bei Corsi) */
export const ANCHORS: readonly Pos[] = [
  { x: 0.1, y: 0.12 },
  { x: 0.36, y: 0.08 },
  { x: 0.64, y: 0.14 },
  { x: 0.9, y: 0.1 },
  { x: 0.2, y: 0.4 },
  { x: 0.48, y: 0.34 },
  { x: 0.78, y: 0.42 },
  { x: 0.08, y: 0.7 },
  { x: 0.36, y: 0.64 },
  { x: 0.62, y: 0.72 },
  { x: 0.9, y: 0.68 },
  { x: 0.5, y: 0.92 },
];

/** Anzahl der Stützpunkte im Linienzug: 3 → 9 */
export function patternLengthFor(level: number): number {
  return 3 + Math.round(((levelOf(level) - 1) * 6) / (MAX_LEVEL - 1));
}

/** Einprägezeit in ms: 1,2 s + n · (900 → 450 ms) */
export function exposureMsFor(level: number, n = patternLengthFor(level)): number {
  const per = 900 - (450 * (levelOf(level) - 1)) / (MAX_LEVEL - 1);
  return Math.round(1200 + n * per);
}

/** Wahrscheinlichkeit, dass ein Muster Kreuzungen haben darf: 0 bis Stufe 6, dann steigend bis 1 bei Stufe 18 */
export function crossingChanceFor(level: number): number {
  return clamp((levelOf(level) - 6) / 12, 0, 1);
}

/** Punkte je Durchgang: richtig getroffene Stützpunkte × (3 + Stufe / 3) */
export function pointsFor(level: number, matched: number): number {
  return Math.max(0, matched) * (3 + Math.floor(levelOf(level) / 3));
}

type V = [number, number];

function distPointSegment(p: V, a: V, b: V): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const t = l2 <= 1e-12 ? 0 : clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2, 0, 1);
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function cross(o: V, a: V, b: V): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

/** Echte Kreuzung zweier Strecken (gemeinsame Endpunkte zählen nicht) */
function properCross(a: V, b: V, c: V, d: V): boolean {
  const d1 = cross(a, b, c);
  const d2 = cross(a, b, d);
  const d3 = cross(c, d, a);
  const d4 = cross(c, d, b);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

/** Stützpunkt i in Koordinaten mit Seitenverhältnis `aspect` (Breite/Höhe), damit Abstände stimmen */
function at(i: number, aspect: number): V {
  return [ANCHORS[i].x * aspect, ANCHORS[i].y];
}

/** Ist die Strecke a→b frei von allen anderen Stützpunkten? */
export function segmentClear(a: number, b: number, aspect: number, clearance = CLEARANCE): boolean {
  const pa = at(a, aspect);
  const pb = at(b, aspect);
  for (let k = 0; k < ANCHORS.length; k++) {
    if (k === a || k === b) continue;
    if (distPointSegment(at(k, aspect), pa, pb) < clearance) return false;
  }
  return true;
}

/** Kreuzt die Strecke a→b eine der Strecken des bisherigen Linienzugs? */
function crossesPath(a: number, b: number, seq: readonly number[], aspect: number): boolean {
  const pa = at(a, aspect);
  const pb = at(b, aspect);
  for (let i = 0; i + 1 < seq.length; i++) {
    if (seq[i] === a || seq[i + 1] === a || seq[i] === b || seq[i + 1] === b) continue;
    if (properCross(pa, pb, at(seq[i], aspect), at(seq[i + 1], aspect))) return true;
  }
  return false;
}

/** Hat der Linienzug Kreuzungen? */
export function hasCrossings(seq: readonly number[], aspect: number): boolean {
  for (let i = 1; i + 1 < seq.length; i++) {
    if (crossesPath(seq[i], seq[i + 1], seq.slice(0, i), aspect)) return true;
  }
  return false;
}

export interface PatternOptions {
  n: number;
  /** Seitenverhältnis des Feldes (Breite / Höhe) */
  aspect: number;
  /** Kreuzungen erlaubt? (sonst kreuzungsfrei) */
  allowCrossing: boolean;
  /** vorheriger Linienzug: der neue beginnt an einem anderen Punkt */
  prev?: readonly number[];
}

/**
 * Neuer Linienzug über n verschiedene Stützpunkte. Jede Strecke ist frei von anderen Stützpunkten; ohne `allowCrossing`
 * kreuzt sich der Linienzug nicht. Zufällige Tiefensuche mit Rückgriff; notfalls fällt die Kreuzungsregel weg.
 */
export function makePattern(rng: Rng, o: PatternOptions): number[] {
  const n = clamp(Math.round(o.n), 2, ANCHORS.length);
  const tryBuild = (noCross: boolean, clearance: number): number[] | null => {
    let budget = 4000;
    const path: number[] = [];
    const used = new Set<number>();
    const extend = (): boolean => {
      if (path.length === n) return true;
      if (budget-- <= 0) return false;
      const cands = rng.shuffle(Array.from({ length: ANCHORS.length }, (_, i) => i).filter((i) => !used.has(i)));
      for (const c of cands) {
        if (path.length === 0) {
          if (o.prev && o.prev.length && c === o.prev[0] && ANCHORS.length > 1 && cands.length > 1) continue;
        } else {
          const last = path[path.length - 1];
          if (!segmentClear(last, c, o.aspect, clearance)) continue;
          if (noCross && crossesPath(last, c, path, o.aspect)) continue;
        }
        path.push(c);
        used.add(c);
        if (extend()) return true;
        path.pop();
        used.delete(c);
      }
      return false;
    };
    return extend() ? path.slice() : null;
  };
  return (
    tryBuild(!o.allowCrossing, CLEARANCE) ??
    tryBuild(false, CLEARANCE) ??
    tryBuild(false, CLEARANCE * 0.5) ??
    rng.shuffle(Array.from({ length: ANCHORS.length }, (_, i) => i)).slice(0, n)
  );
}

/** Länge der längsten gemeinsamen Teilfolge */
export function lcsLength(a: readonly number[], b: readonly number[]): number {
  return lcsTable(a, b)[a.length][b.length];
}

function lcsTable(a: readonly number[], b: readonly number[]): number[][] {
  const t: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      t[i][j] = a[i - 1] === b[j - 1] ? t[i - 1][j - 1] + 1 : Math.max(t[i - 1][j], t[i][j - 1]);
    }
  }
  return t;
}

export interface Score {
  /** Anzahl richtig getroffener Stützpunkte in richtiger Reihenfolge */
  matched: number;
  /** Anteil an der Musterlänge (0..1) */
  fraction: number;
  /** für jede Stelle des gezeigten Musters: richtig getroffen? */
  matches: boolean[];
  passed: boolean;
}

/** Wertung: gezeigte Folge `seq` gegen gezeichnete Folge `drawn` (Anteil richtiger Stützpunkte in richtiger Reihenfolge) */
export function scorePattern(seq: readonly number[], drawn: readonly number[]): Score {
  const t = lcsTable(seq, drawn);
  const matches = new Array<boolean>(seq.length).fill(false);
  let i = seq.length;
  let j = drawn.length;
  while (i > 0 && j > 0) {
    if (seq[i - 1] === drawn[j - 1]) {
      matches[i - 1] = true;
      i--;
      j--;
    } else if (t[i - 1][j] >= t[i][j - 1]) i--;
    else j--;
  }
  const matched = t[seq.length][drawn.length];
  const fraction = seq.length ? matched / seq.length : 0;
  return { matched, fraction, matches, passed: fraction >= PASS_FRACTION - 1e-9 };
}

/** Sammelt die angefahrenen Stützpunkte; aufeinanderfolgende Wiederholungen desselben Punktes zählen nicht */
export class Tracer {
  readonly drawn: number[] = [];

  constructor(readonly n: number) {}

  /** Stützpunkt angefahren. Gibt true zurück, wenn er neu gezählt wurde. */
  add(anchor: number): boolean {
    if (anchor < 0 || this.full) return false;
    if (this.drawn.length && this.drawn[this.drawn.length - 1] === anchor) return false;
    this.drawn.push(anchor);
    return true;
  }

  get full(): boolean {
    return this.drawn.length >= this.n;
  }

  get last(): number {
    return this.drawn.length ? this.drawn[this.drawn.length - 1] : -1;
  }
}

/** Mindestabstand zweier Stützpunkte in px für ein Feld fw × fh */
export function minSpacingPx(fw: number, fh: number): number {
  let m = Infinity;
  for (let i = 0; i < ANCHORS.length; i++) {
    for (let j = i + 1; j < ANCHORS.length; j++) {
      m = Math.min(m, Math.hypot((ANCHORS[i].x - ANCHORS[j].x) * fw, (ANCHORS[i].y - ANCHORS[j].y) * fh));
    }
  }
  return m;
}

/** Fangradius um einen Stützpunkt in px: mindestens 24, höchstens 40 % des kleinsten Abstands */
export function captureRadiusPx(fw: number, fh: number): number {
  const minDim = Math.min(fw, fh);
  return Math.max(12, Math.min(clamp(0.055 * minDim, 24, 46), 0.4 * minSpacingPx(fw, fh)));
}

/** Folge, die der virtuelle Finger anfährt (Autoplay): meist richtig, manchmal ein Fehler */
export function planTrace(rng: Rng, seq: readonly number[], level: number, clean = false): number[] {
  const out = seq.slice();
  if (clean) return out;
  if (!rng.chance(0.1 + 0.02 * levelOf(level))) return out;
  const i = rng.int(out.length);
  if (rng.chance(0.5) && out.length > 1) {
    const j = i + 1 < out.length ? i + 1 : i - 1;
    [out[i], out[j]] = [out[j], out[i]];
  } else {
    const others = ANCHORS.map((_, k) => k).filter((k) => k !== out[i]);
    out[i] = rng.pick(others);
  }
  return out;
}
