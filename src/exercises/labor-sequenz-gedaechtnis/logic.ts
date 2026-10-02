/**
 * Sequenz-Gedächtnis – reine Logik (aus `SequenceGame` im Labor-Prototyp, ex/sequence.js).
 *
 * Felder eines Rasters leuchten nacheinander auf, die Folge wird in derselben Reihenfolge angetippt. Zeiten in ms
 * (virtuelle Zeit des Runners), Zufall nur über `Rng`, keine Darstellung, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Eine Folge hat nie dasselbe Feld direkt hintereinander. Jede richtig wiederholte Folge verlängert die nächste
 *   (`growth`: alte Folge plus ein Feld oder komplett neu). Ein Fehler beendet die Runde; `onError` bestimmt die nächste Länge.
 * - Ende: nach `maxErrors` Fehlern (0 = unbegrenzt), bei `maxLength` richtig wiederholten Feldern oder nach `durationS`.
 *
 * Abweichungen vom Prototyp (Sicherheit und Bedienung auf dem Tablet):
 * - Die Aufleuchtdauer je Feld beträgt mindestens 400 ms (Prototyp: 150 ms) und Aufleuchtdauer + Pause ergeben mindestens
 *   400 ms je Feld: höchstens 2,5 Feldwechsel pro Sekunde, kein Blinken. Felder blenden weich ein und aus
 *   (`RAMP_MS`, mindestens 100 ms), es gibt keinen harten Hell-Dunkel-Wechsel (`brightnessAt`).
 * - `totalMs` der Anzeige reicht bei kurzer Pause bis zum Ende des letzten weichen Ausblendens (bei Pause ≥ `RAMP_MS`
 *   unverändert `Länge × (Dauer + Pause)`).
 */
import { mean } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp, außer der kürzesten Aufleuchtdauer); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'rows', type: 'number', unit: 'count', min: 2, max: 8, step: 1, default: 3, summary: true },
  { key: 'cols', type: 'number', unit: 'count', min: 2, max: 10, step: 1, default: 3, summary: true },
  { key: 'startLength', type: 'number', unit: 'count', min: 1, max: 10, step: 1, default: 2, summary: true },
  { key: 'showMs', type: 'number', unit: 'ms', min: 400, max: 3000, step: 50, default: 700, summary: true },
  { key: 'gapMs', type: 'number', unit: 'ms', min: 0, max: 1500, step: 50, default: 250 },
  { key: 'growth', type: 'select', default: 'extend', options: ['extend', 'fresh'] },
  { key: 'onError', type: 'select', default: 'same', options: ['same', 'down', 'restart'] },
  { key: 'maxErrors', type: 'number', unit: 'count', min: 0, max: 20, step: 1, default: 3 },
  { key: 'maxLength', type: 'number', unit: 'count', min: 3, max: 40, step: 1, default: 20 },
  { key: 'durationS', type: 'number', unit: 's', min: 0, max: 900, step: 10, default: 0 },
];

export type Growth = 'extend' | 'fresh';
export type OnError = 'same' | 'down' | 'restart';

export interface SequenceParams {
  rows: number;
  cols: number;
  startLength: number;
  showMs: number;
  gapMs: number;
  growth: Growth;
  onError: OnError;
  maxErrors: number;
  maxLength: number;
  durationS: number;
}

/** Kürzeste Aufleuchtdauer je Feld (ms) und kürzeste Zeit von einem Feldbeginn zum nächsten */
export const MIN_SHOW_MS = 400;
export const MIN_STEP_MS = 400;
/** Dauer des weichen Ein- und Ausblendens eines Feldes (ms), mindestens 100 */
export const RAMP_MS = 120;
/** Kleinste Kantenlänge eines Feldes in Pixeln (Touch-Ziel) */
export const MIN_CELL_PX = 24;
/** Schnellmodus (?quick=1): nur diese Folgenlängen über der Startlänge, kurze Anzeige */
export const QUICK_EXTRA_LENGTH = 1;
export const QUICK_SHOW_MS = 450;
export const QUICK_GAP_MS = 100;

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function sequenceParams(p: ExerciseParams): SequenceParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const sel = <T extends string>(key: string, allowed: readonly T[], def: T): T => {
    const v = p[key];
    return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : def;
  };
  return {
    rows: Math.round(num('rows')),
    cols: Math.round(num('cols')),
    startLength: Math.round(num('startLength')),
    showMs: Math.max(MIN_SHOW_MS, num('showMs')),
    gapMs: Math.max(0, num('gapMs')),
    growth: sel<Growth>('growth', ['extend', 'fresh'], 'extend'),
    onError: sel<OnError>('onError', ['same', 'down', 'restart'], 'same'),
    maxErrors: Math.round(num('maxErrors')),
    maxLength: Math.round(num('maxLength')),
    durationS: num('durationS'),
  };
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

export type Phase = 'idle' | 'show' | 'input' | 'done';

export interface ShowStep {
  cell: number;
  onAt: number;
  offAt: number;
}

export interface ShowSchedule {
  steps: ShowStep[];
  totalMs: number;
}

export interface InputRecord {
  round: number;
  pos: number;
  length: number;
  cell: number;
  correct: boolean;
  rtMs: number;
}

export type InputResult = { result: 'ok' } | { result: 'complete'; length: number } | { result: 'error'; expected: number } | null;

export interface SequenceSummary {
  /** Länge der längsten vollständig richtig wiederholten Folge (0, wenn keine) */
  span: number;
  rounds: number;
  errors: number;
  /** Anteil richtiger Eingaben in %, null ohne Eingaben */
  accuracy: number | null;
  /** Mittlere Zeit zwischen zwei richtigen Eingaben in ms, null ohne richtige Eingabe */
  rtMean: number | null;
  /** Gesamtzeit in ms, null solange die Übung nicht beendet ist */
  totalMs: number | null;
  inputs: InputRecord[];
}

/** Reine Spiellogik (Zustandsautomat). */
export class SequenceGame {
  readonly p: SequenceParams;
  readonly cells: number;
  length: number;
  seq: number[] | null = null;
  pos = 0;
  phase: Phase = 'idle';
  roundNo = 0;
  completedRounds = 0;
  maxCompleted = 0;
  errors = 0;
  inputs: InputRecord[] = [];
  startedAt: number | null = null;
  endedAt: number | null = null;
  lastInputAt: number | null = null;
  private pending: 'fresh' | 'extend' = 'fresh';
  private readonly rng: Rng;

  constructor(p: SequenceParams, rng: Rng) {
    this.p = p;
    this.rng = rng;
    this.cells = p.rows * p.cols;
    this.length = p.startLength;
  }

  begin(now: number): void {
    this.startedAt = now;
  }

  /** Zufälliges Feld, nie dasselbe wie `prev` (bei nur einem Feld: 0) */
  randomCell(prev: number): number {
    if (this.cells <= 1) return 0;
    let c: number;
    do c = this.rng.int(this.cells);
    while (c === prev);
    return c;
  }

  randomSeq(n: number): number[] {
    const s: number[] = [];
    for (let i = 0; i < n; i++) s.push(this.randomCell(i ? s[i - 1] : -1));
    return s;
  }

  newRound(): number[] {
    if (this.pending === 'extend' && this.p.growth === 'extend' && this.seq) {
      this.seq = this.seq.concat([this.randomCell(this.seq[this.seq.length - 1])]);
      this.length = this.seq.length;
    } else {
      this.seq = this.randomSeq(this.length);
    }
    this.pending = 'fresh';
    this.pos = 0;
    this.roundNo++;
    this.phase = 'show';
    return this.seq;
  }

  showSchedule(): ShowSchedule {
    return makeSchedule(this.seq ?? [], this.p.showMs, this.p.gapMs);
  }

  beginInput(now: number): void {
    this.phase = 'input';
    this.pos = 0;
    this.lastInputAt = now;
  }

  input(cell: number, now: number): InputResult {
    if (this.phase !== 'input' || !this.seq) return null;
    const expected = this.seq[this.pos];
    const rt = now - (this.lastInputAt ?? now);
    this.lastInputAt = now;
    if (cell === expected) {
      this.inputs.push({ round: this.roundNo, pos: this.pos + 1, length: this.seq.length, cell, correct: true, rtMs: Math.round(rt) });
      this.pos++;
      if (this.pos >= this.seq.length) {
        this.phase = 'done';
        this.completedRounds++;
        this.maxCompleted = Math.max(this.maxCompleted, this.seq.length);
        this.length = this.seq.length + 1;
        this.pending = 'extend';
        return { result: 'complete', length: this.seq.length };
      }
      return { result: 'ok' };
    }
    this.inputs.push({ round: this.roundNo, pos: this.pos + 1, length: this.seq.length, cell, correct: false, rtMs: Math.round(rt) });
    this.errors++;
    this.phase = 'done';
    if (this.p.onError === 'restart') this.length = this.p.startLength;
    else if (this.p.onError === 'down') this.length = Math.max(this.p.startLength, this.seq.length - 1);
    else this.length = this.seq.length;
    this.pending = 'fresh';
    return { result: 'error', expected };
  }

  isOver(now: number): boolean {
    if (this.p.maxErrors > 0 && this.errors >= this.p.maxErrors) return true;
    if (this.maxCompleted >= this.p.maxLength) return true;
    if (this.p.durationS > 0 && this.startedAt !== null && now - this.startedAt >= this.p.durationS * 1000) return true;
    return false;
  }

  finish(now: number): void {
    this.endedAt = now;
  }

  summary(): SequenceSummary {
    const correct = this.inputs.filter((i) => i.correct);
    const rts = correct.map((i) => i.rtMs);
    return {
      span: this.maxCompleted,
      rounds: this.completedRounds,
      errors: this.errors,
      accuracy: this.inputs.length ? round((100 * correct.length) / this.inputs.length, 1) : null,
      rtMean: rts.length ? round(mean(rts), 0) : null,
      totalMs: this.endedAt !== null && this.startedAt !== null ? this.endedAt - this.startedAt : null,
      inputs: this.inputs.slice(),
    };
  }
}

/**
 * Zeitplan der Anzeige: Feld i beginnt bei i × (Dauer + Pause) und leuchtet `showMs`. `totalMs` ist das Ende der Anzeige
 * (nach dem letzten Feld inklusive Pause, mindestens aber das Ende des weichen Ausblendens).
 */
export function makeSchedule(seq: readonly number[], showMs: number, gapMs: number): ShowSchedule {
  const step = showMs + gapMs;
  return {
    steps: seq.map((cell, i) => ({ cell, onAt: i * step, offAt: i * step + showMs })),
    totalMs: seq.length === 0 ? 0 : (seq.length - 1) * step + showMs + Math.max(gapMs, RAMP_MS),
  };
}

const smooth = (k: number): number => {
  const x = Math.min(1, Math.max(0, k));
  return x * x * (3 - 2 * x);
};

/**
 * Helligkeit (0..1) eines Feldes zur Anzeigezeit `t` (ms seit Beginn der Anzeige): weiches Einblenden in `RAMP_MS`, Halten,
 * weiches Ausblenden in `RAMP_MS` nach `offAt`. Nie ein Sprung; bei Pause 0 überblendet das nächste Feld das vorige.
 */
export function brightnessAt(step: ShowStep, t: number): number {
  if (t < step.onAt) return 0;
  if (t < step.offAt) return smooth((t - step.onAt) / RAMP_MS);
  return Math.min(smooth((t - step.onAt) / RAMP_MS), 1 - smooth((t - step.offAt) / RAMP_MS));
}

/** Helligkeit jedes Feldes (nur Felder mit Helligkeit > 0) zur Anzeigezeit `t` */
export function litCells(schedule: ShowSchedule, t: number): Array<{ cell: number; level: number }> {
  const out: Array<{ cell: number; level: number }> = [];
  for (const s of schedule.steps) {
    const l = brightnessAt(s, t);
    if (l > 0.001) out.push({ cell: s.cell, level: l });
  }
  return out;
}

/** Nutzbarer Bereich in Pixeln */
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GridLayout {
  /** Kantenlänge eines Feldes in px */
  cell: number;
  /** Abstand zwischen Feldern in px */
  gap: number;
  /** linke obere Ecke des Rasters */
  x0: number;
  y0: number;
  rows: number;
  cols: number;
}

/** Raster, zentriert im Bereich; Felder quadratisch, ganz im Bereich. Bei sehr kleinem Bereich bleiben sie ≥ 4 px. */
export function layoutGrid(box: Box, rows: number, cols: number): GridLayout {
  const gapOf = (c: number): number => Math.max(3, Math.min(14, c * 0.12));
  // Näherung: gap hängt von der Zellgröße ab; zweimal iterieren genügt
  let gap = 8;
  let cell = 4;
  for (let i = 0; i < 3; i++) {
    cell = Math.max(4, Math.min((box.w - gap * (cols - 1)) / cols, (box.h - gap * (rows - 1)) / rows));
    gap = gapOf(cell);
  }
  cell = Math.max(4, Math.min((box.w - gap * (cols - 1)) / cols, (box.h - gap * (rows - 1)) / rows));
  const gw = cell * cols + gap * (cols - 1);
  const gh = cell * rows + gap * (rows - 1);
  return { cell, gap, x0: box.x + (box.w - gw) / 2, y0: box.y + (box.h - gh) / 2, rows, cols };
}

/** Mittelpunkt und Kantenlänge von Feld `i` */
export function cellRect(L: GridLayout, i: number): { x: number; y: number; s: number } {
  return { x: L.x0 + (i % L.cols) * (L.cell + L.gap), y: L.y0 + Math.floor(i / L.cols) * (L.cell + L.gap), s: L.cell };
}

/** Feld unter dem Punkt; die Zwischenräume gehören zum nächsten Feld (großzügig für den Finger), außerhalb −1 */
export function cellAt(L: GridLayout, px: number, py: number): number {
  const pad = L.gap / 2;
  for (let i = 0; i < L.rows * L.cols; i++) {
    const r = cellRect(L, i);
    if (px >= r.x - pad && px <= r.x + r.s + pad && py >= r.y - pad && py <= r.y + r.s + pad) return i;
  }
  return -1;
}

/** Punkte (nur zur Motivation) */
export function pointsFor(span: number, rounds: number): number {
  return span * 20 + rounds * 5;
}

/** Schlüssel in texts.tips: ein persönlicher Tipp nach dem Lauf */
export function tipFor(sum: SequenceSummary, p: SequenceParams): string {
  if (sum.span === 0) return 'few';
  if (sum.accuracy !== null && sum.accuracy >= 90 && sum.errors <= 1) return 'harder';
  if (sum.rtMean !== null && sum.rtMean > 1800) return 'slow';
  if (sum.errors > 0 && sum.span <= p.startLength + 1) return 'chunk';
  return 'compare';
}
