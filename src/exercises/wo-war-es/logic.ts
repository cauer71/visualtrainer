/**
 * Wo war es? (Objekt-Ort merken) – reine Logik: Anordnungen erzeugen, Ortsfehler messen, Sitzung auswerten.
 *
 * - Stufe = Anzahl der Symbole (1 … 9). Raster: bis 3 Symbole 3×3, bis 6 Symbole 4×4, darüber 5×5.
 * - Jedes Symbol liegt in einer eigenen Zelle und hat eine eigene Form (nie zwei gleiche Formen).
 * - Gefragt wird nach einem Symbol; getippt wird eine Zelle. Fehler = Abstand der Zellmitten in % der Kantenlänge
 *   (eine Zelle Abstand = 100 / G %). Richtig = genau die Zelle; „knapp“ = Nachbarzelle (auch diagonal).
 */
import type { Rng } from '../../core/rng';
import { FORM_COUNT } from '../_formen';

export const MIN_OBJECTS = 1;
export const MAX_OBJECTS = 9;
export const START_OBJECTS = 2;

export interface Placed {
  /** Zelle (Zeile · G + Spalte) */
  cell: number;
  /** Form-Nummer (0 … FORM_COUNT − 1) */
  form: number;
}

export function gridFor(k: number): number {
  if (k <= 3) return 3;
  if (k <= 6) return 4;
  return 5;
}

/** Einprägezeit in ms: wächst mit der Symbolzahl */
export function showMs(k: number): number {
  return 1400 + 500 * k;
}

export function placeObjects(rng: Rng, k: number, G = gridFor(k)): Placed[] {
  const cells = rng.shuffle(Array.from({ length: G * G }, (_, i) => i)).slice(0, k);
  const forms = rng.shuffle(Array.from({ length: FORM_COUNT }, (_, i) => i)).slice(0, k);
  return cells.map((cell, i) => ({ cell, form: forms[i] }));
}

/** Index des gefragten Symbols; bevorzugt ein anderes als beim letzten Mal (nach Form) */
export function pickAsked(rng: Rng, objs: readonly Placed[], prevForm = -1): number {
  const idx = objs.map((_, i) => i).filter((i) => objs[i].form !== prevForm);
  return rng.pick(idx.length ? idx : objs.map((_, i) => i));
}

/** Abstand zweier Zellen in Zellen (Mitte zu Mitte) */
export function cellDistance(a: number, b: number, G: number): number {
  const dr = Math.floor(a / G) - Math.floor(b / G);
  const dc = (a % G) - (b % G);
  return Math.hypot(dr, dc);
}

/** Ortsfehler in % der Kantenlänge des Feldes */
export function errorPct(tapped: number, correct: number, G: number): number {
  return (cellDistance(tapped, correct, G) / G) * 100;
}

export type Outcome = 'exact' | 'near' | 'far';

export function classify(tapped: number, correct: number, G: number): Outcome {
  if (tapped === correct) return 'exact';
  const dr = Math.abs(Math.floor(tapped / G) - Math.floor(correct / G));
  const dc = Math.abs((tapped % G) - (correct % G));
  return Math.max(dr, dc) <= 1 ? 'near' : 'far';
}

/** Verwechslung: getippte Zelle enthält ein anderes Symbol dieser Runde */
export function isSwap(tapped: number, objs: readonly Placed[], askedIdx: number): boolean {
  return objs.some((o, i) => i !== askedIdx && o.cell === tapped);
}

export interface RoundRecord {
  k: number;
  outcome: Outcome;
  errPct: number;
  swap: boolean;
}

/**
 * Größte „sicher gemeisterte“ Symbolzahl: mindestens 2 Treffer auf dieser Stufe und höchstens so viele
 * Fehlversuche wie Treffer. Ohne solche Stufe: 1.
 */
export function masteredLevel(records: readonly RoundRecord[]): number {
  const per = new Map<number, { tries: number; hits: number }>();
  for (const r of records) {
    const e = per.get(r.k) ?? { tries: 0, hits: 0 };
    e.tries++;
    if (r.outcome === 'exact') e.hits++;
    per.set(r.k, e);
  }
  let best = 1;
  for (const [k, e] of per) if (e.hits >= 2 && e.hits / e.tries >= 0.5) best = Math.max(best, k);
  return best;
}

export interface Summary {
  rounds: number;
  exact: number;
  near: number;
  swaps: number;
  meanErrPct: number;
  mastered: number;
}

export function summarize(records: readonly RoundRecord[]): Summary {
  let exact = 0;
  let near = 0;
  let swaps = 0;
  let err = 0;
  for (const r of records) {
    if (r.outcome === 'exact') exact++;
    else if (r.outcome === 'near') near++;
    if (r.swap) swaps++;
    err += r.errPct;
  }
  return {
    rounds: records.length,
    exact,
    near,
    swaps,
    meanErrPct: records.length ? err / records.length : 0,
    mastered: masteredLevel(records),
  };
}
