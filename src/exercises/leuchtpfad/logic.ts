/**
 * Leuchtpfad (Corsi-artige Blockfolge) – reine Logik: feste Blockpositionen, Folgen, Treffer, Sitzungsverlauf.
 *
 * - 9 Blöcke an festen, unregelmäßigen Positionen (normiert 0..1 im quadratischen Feld). Kleinster Abstand
 *   ≈ 0,30 → Trefferflächen (Radius ≈ 0,12 der Feldkante) überlappen nie.
 * - Eine Folge besteht aus verschiedenen Blöcken (jeder höchstens einmal) und unterscheidet sich im ersten Block
 *   von der vorherigen Folge.
 * - Sitzung (`SpanRun`): Erfolg → eine Stelle länger, Fehler → eine Stelle kürzer; der zweite Fehler beendet die Runde.
 *   Hauptwert = längste richtig nachgetippte Folge.
 */
import type { Rng } from '../../core/rng';
import { Staircase } from '../../core/staircase';

export const BLOCK_COUNT = 9;
export const MAX_STRIKES = 2;
export const MIN_LEN = 1;
export const START_LEN = 2;
export const MAX_FORWARD = 9;
/** Rückwärts bis höchstens 7 Blöcke */
export const MAX_BACKWARD = 7;
/** Ab dieser Spanne wird die Rückwärts-Bonusrunde angeboten */
export const BACKWARD_FROM = 5;

export interface Pos {
  x: number;
  y: number;
}

/** Feste Anordnung (Corsi-artig, unregelmäßig, keine Reihen oder Spalten) */
export const POSITIONS: readonly Pos[] = [
  { x: 0.12, y: 0.16 },
  { x: 0.46, y: 0.1 },
  { x: 0.84, y: 0.2 },
  { x: 0.26, y: 0.44 },
  { x: 0.62, y: 0.4 },
  { x: 0.88, y: 0.58 },
  { x: 0.12, y: 0.76 },
  { x: 0.5, y: 0.68 },
  { x: 0.78, y: 0.9 },
];

export function minSpacing(pos: readonly Pos[] = POSITIONS): number {
  let m = Infinity;
  for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) m = Math.min(m, Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y));
  }
  return m;
}

/** Neue Folge der Länge `length` (verschiedene Blöcke); der erste Block unterscheidet sich von `prev[0]`. */
export function makeSequence(rng: Rng, length: number, prev?: readonly number[]): number[] {
  const len = Math.max(1, Math.min(BLOCK_COUNT, Math.round(length)));
  const seq = rng.shuffle(Array.from({ length: BLOCK_COUNT }, (_, i) => i)).slice(0, len);
  if (prev && prev.length && BLOCK_COUNT > 1 && seq[0] === prev[0]) {
    // ersten Block gegen einen anderen Platz tauschen (oder durch einen unbenutzten ersetzen)
    if (len > 1) {
      const j = 1 + rng.int(len - 1);
      [seq[0], seq[j]] = [seq[j], seq[0]];
    } else {
      seq[0] = (seq[0] + 1 + rng.int(BLOCK_COUNT - 1)) % BLOCK_COUNT;
    }
  }
  return seq;
}

/** Erwarteter Block beim i-ten Tippen (rückwärts: von hinten nach vorn) */
export function expectedAt(seq: readonly number[], i: number, backward: boolean): number {
  return backward ? seq[seq.length - 1 - i] : seq[i];
}

/** Nächster Block innerhalb des Trefferradius (Pixel) oder −1 */
export function nearestBlock(px: number, py: number, centers: ReadonlyArray<{ x: number; y: number }>, radius: number): number {
  let best = -1;
  let bd = radius;
  for (let i = 0; i < centers.length; i++) {
    const d = Math.hypot(centers[i].x - px, centers[i].y - py);
    if (d <= bd) {
      bd = d;
      best = i;
    }
  }
  return best;
}

export interface RunOptions {
  start?: number;
  backward?: boolean;
  maxLen?: number;
  maxStrikes?: number;
}

/** Verlauf einer Runde (vorwärts oder rückwärts) */
export class SpanRun {
  readonly backward: boolean;
  readonly maxLen: number;
  readonly maxStrikes: number;
  readonly stair: Staircase;
  strikes = 0;
  best = 0;
  attempts = 0;
  successes = 0;
  ended = false;
  /** alle Versuche: Länge und Ergebnis */
  readonly history: Array<{ length: number; ok: boolean }> = [];

  constructor(opts: RunOptions = {}) {
    this.backward = !!opts.backward;
    this.maxLen = opts.maxLen ?? (this.backward ? MAX_BACKWARD : MAX_FORWARD);
    this.maxStrikes = opts.maxStrikes ?? MAX_STRIKES;
    const start = Math.max(MIN_LEN, Math.min(this.maxLen, Math.round(opts.start ?? START_LEN)));
    this.stair = new Staircase({ start, min: MIN_LEN, max: this.maxLen, down: 1, up: 1, initialBoost: 1 });
  }

  /** Länge der nächsten Folge */
  get length(): number {
    return Math.round(this.stair.level);
  }

  /** Ergebnis eines Versuchs melden. Gibt true zurück, solange die Runde weitergeht. */
  report(success: boolean): boolean {
    if (this.ended) return false;
    const len = this.length;
    this.attempts++;
    this.history.push({ length: len, ok: success });
    if (success) {
      this.successes++;
      this.best = Math.max(this.best, len);
      if (len >= this.maxLen) {
        this.ended = true; // alle Blöcke geschafft
        return false;
      }
      this.stair.update(true);
    } else {
      this.strikes++;
      if (this.strikes >= this.maxStrikes) {
        this.ended = true;
        return false;
      }
      this.stair.update(false);
    }
    return true;
  }
}
