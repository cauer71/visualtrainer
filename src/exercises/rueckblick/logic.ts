/**
 * Rückblick (N-Back) – reine Logik: Reizfolgen erzeugen und Blöcke werten.
 *
 * - Ein Block besteht aus `n` Einpräg-Reizen (keine Antwort gefragt) und `scored` Reizen mit Antwort.
 * - Treffer („Gleich“): Reiz i ist gleich Reiz i − n. Genau `round(scored · targetRate)` Treffer je Block,
 *   nie mehr als 2 Treffer und nie mehr als 4 Nicht-Treffer hintereinander.
 * - Nicht-Treffer sind nie gleich Reiz i − n; ab 2-Back sind manche „Köder“ (gleich wie vor n − 1 oder
 *   n + 1 Schritten), damit Raten und „gleich wie eben“ nicht reichen.
 * - Wertung mit Trefferquote, Fehlalarmen und d′ (Signalentdeckung), Stufenwechsel nach Blockgenauigkeit.
 */
import type { Rng } from '../../core/rng';
import { dPrime } from '../../core/stats';
import type { Staircase, StairMove } from '../../core/staircase';

export const SYMBOLS = 7;
export const MIN_N = 1;
export const MAX_N = 4;
export const BLOCK_TRIALS = 20;
export const TARGET_RATE = 0.3;
export const LURE_RATE = 0.25;
/** Höchstens so viele „Gleich“ bzw. „Anders“ in Folge */
export const MAX_TARGET_RUN = 2;
export const MAX_PLAIN_RUN = 4;

export type Answer = 'same' | 'diff' | null;

export interface Block {
  n: number;
  /** Reiz-Nummern (0 … symbols − 1), Länge n + scored */
  stimuli: number[];
  /** true = „Gleich“ ist richtig; für i < n immer false */
  target: boolean[];
  /** Anzahl der Reize mit Antwort */
  scored: number;
}

export interface BlockOptions {
  symbols?: number;
  targetRate?: number;
  lureRate?: number;
}

/** Längste Serie des Werts `value` */
export function maxRun(flags: readonly boolean[], value = true): number {
  let best = 0;
  let run = 0;
  for (const f of flags) {
    run = f === value ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

export function targetCount(scored: number, rate = TARGET_RATE): number {
  return Math.min(scored, Math.max(1, Math.round(scored * rate)));
}

export function makeBlock(rng: Rng, n: number, scored = BLOCK_TRIALS, opts: BlockOptions = {}): Block {
  const symbols = opts.symbols ?? SYMBOLS;
  const lureRate = opts.lureRate ?? LURE_RATE;
  const nTargets = targetCount(scored, opts.targetRate ?? TARGET_RATE);

  // Verteilung der Treffer: gemischt, aber keine langen Serien
  let pattern: boolean[] = [];
  for (let attempt = 0; attempt < 400; attempt++) {
    pattern = rng.shuffle(Array.from({ length: scored }, (_, i) => i < nTargets));
    if (maxRun(pattern, true) <= MAX_TARGET_RUN && maxRun(pattern, false) <= MAX_PLAIN_RUN) break;
  }

  const total = n + scored;
  const stimuli: number[] = [];
  const target: boolean[] = [];
  for (let i = 0; i < total; i++) {
    if (i < n) {
      // Einprägen: zufällige Reize, nie zweimal derselbe direkt hintereinander
      let s = rng.int(symbols);
      if (i > 0 && symbols > 1) while (s === stimuli[i - 1]) s = rng.int(symbols);
      stimuli.push(s);
      target.push(false);
      continue;
    }
    const isTarget = pattern[i - n];
    const back = stimuli[i - n];
    target.push(isTarget);
    if (isTarget) {
      stimuli.push(back);
      continue;
    }
    let s = -1;
    if (n >= 2 && rng.chance(lureRate)) {
      const lures = [stimuli[i - n + 1], i - n - 1 >= 0 ? stimuli[i - n - 1] : -1].filter((x) => x >= 0 && x !== back);
      if (lures.length) s = rng.pick(lures);
    }
    if (s < 0) {
      const pool: number[] = [];
      for (let k = 0; k < symbols; k++) if (k !== back) pool.push(k);
      s = rng.pick(pool);
    }
    stimuli.push(s);
  }
  return { n, stimuli, target, scored };
}

/** Richtige Antwort für Reiz i (null = Einprägephase, keine Antwort gefragt) */
export function expectedAnswer(block: Block, i: number): 'same' | 'diff' | null {
  if (i < block.n || i >= block.stimuli.length) return null;
  return block.target[i] ? 'same' : 'diff';
}

/** Köder: Reiz entspricht n − 1 oder n + 1 Schritte zurück (aber nicht n) */
export function isLure(block: Block, i: number): boolean {
  if (block.n < 2 || i < block.n || block.target[i]) return false;
  const s = block.stimuli[i];
  return block.stimuli[i - block.n + 1] === s || (i - block.n - 1 >= 0 && block.stimuli[i - block.n - 1] === s);
}

export interface BlockScore {
  trials: number;
  targets: number;
  nonTargets: number;
  hits: number;
  misses: number;
  falseAlarms: number;
  correctRejections: number;
  /** Reize ohne Antwort */
  omissions: number;
  correct: number;
  accuracy: number;
  hitRate: number;
  faRate: number;
  dPrime: number;
}

/**
 * Wertet einen Block aus. `answers` hat eine Stelle je Reiz (auch für die Einprägephase, dort ignoriert).
 * Keine Antwort zählt als Fehler: bei einem Treffer als verpasst, bei einem Nicht-Treffer nur als Auslassung.
 */
export function scoreBlock(block: Block, answers: readonly Answer[]): BlockScore {
  let targets = 0;
  let nonTargets = 0;
  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejections = 0;
  let omissions = 0;
  for (let i = block.n; i < block.stimuli.length; i++) {
    const a = answers[i] ?? null;
    if (a === null) omissions++;
    if (block.target[i]) {
      targets++;
      if (a === 'same') hits++;
      else misses++;
    } else {
      nonTargets++;
      if (a === 'same') falseAlarms++;
      else if (a === 'diff') correctRejections++;
    }
  }
  const trials = targets + nonTargets;
  const correct = hits + correctRejections;
  return {
    trials,
    targets,
    nonTargets,
    hits,
    misses,
    falseAlarms,
    correctRejections,
    omissions,
    correct,
    accuracy: trials ? correct / trials : 0,
    hitRate: targets ? hits / targets : 0,
    faRate: nonTargets ? falseAlarms / nonTargets : 0,
    dPrime: dPrime(hits, targets, falseAlarms, nonTargets),
  };
}

/** Block „geschafft“: klar besser als reines „Anders“-Antworten (das allein ergäbe ≈ 70 %) */
export function blockPassed(s: BlockScore): boolean {
  return s.accuracy >= 0.8 && s.hitRate >= 0.5 && s.faRate <= 0.3;
}

export type Verdict = 'up' | 'stay' | 'down';

/**
 * Stufenwechsel nach einem Block: hoch bei ≥ 85 % richtig (und mindestens 60 % der Treffer erkannt),
 * runter bei < 72 % oder wenn fast nie „Gleich“ getippt wurde, sonst gleiche Stufe.
 */
export function blockVerdict(s: BlockScore): Verdict {
  if (s.accuracy >= 0.85 && s.hitRate >= 0.6 && s.faRate <= 0.3) return 'up';
  if (s.accuracy < 0.72 || s.hitRate < 0.34) return 'down';
  return 'stay';
}

/** Verdict in die Treppe einspeisen („stay“ ändert nichts). Gibt die neue Stufe N zurück. */
export function applyVerdict(stair: Staircase, v: Verdict): { move: StairMove; n: number } {
  if (v === 'stay') return { move: 'same', n: stair.level };
  const move = stair.update(v === 'up');
  return { move, n: stair.level };
}

/** Höchste Stufe N mit „geschafftem“ Block (mindestens 1) */
export function bestPassedN(blocks: ReadonlyArray<{ n: number; score: BlockScore }>): number {
  let best = 0;
  for (const b of blocks) if (blockPassed(b.score)) best = Math.max(best, b.n);
  return Math.max(MIN_N, best);
}

/** Gesamtwerte über mehrere Blöcke */
export function totals(blocks: ReadonlyArray<{ score: BlockScore }>): {
  hitRate: number;
  falseAlarms: number;
  omissions: number;
  accuracy: number;
  faRate: number;
} {
  let hits = 0;
  let targets = 0;
  let fa = 0;
  let non = 0;
  let correct = 0;
  let trials = 0;
  let om = 0;
  for (const { score: s } of blocks) {
    hits += s.hits;
    targets += s.targets;
    fa += s.falseAlarms;
    non += s.nonTargets;
    correct += s.correct;
    trials += s.trials;
    om += s.omissions;
  }
  return {
    hitRate: targets ? hits / targets : 0,
    falseAlarms: fa,
    omissions: om,
    accuracy: trials ? correct / trials : 0,
    faRate: non ? fa / non : 0,
  };
}
