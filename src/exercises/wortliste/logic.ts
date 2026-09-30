/**
 * Wortliste – reine Logik (ohne Canvas, damit testbar).
 *
 * Ablauf eines Durchgangs: n Wörter erscheinen nacheinander (je ≈ 2 s), danach wählt man aus einer
 * Auswahl (gezeigte + neue, ähnlich lange Wörter) die gezeigten Wörter aus (Wiedererkennen).
 * Stufe = Wortzahl n (5 … 12). Hauptwert = größte Wortzahl, bei der die Liste gelang.
 */
import type { Lang } from '../../i18n/lang';
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';
import { WORDS_DE, WORDS_IT } from './words';

export const MIN_WORDS = 5;
export const MAX_WORDS = 12;
/** Mindesthöhe eines Auswahl-Buttons in px */
export const MIN_BUTTON_H = 56;

export function wordsFor(lang: Lang): readonly string[] {
  return lang === 'it' ? WORDS_IT : WORDS_DE;
}

/** Wortzahl der Stufe (Stufen sind ganzzahlig; Kommastufen der Treppe werden abgerundet) */
export function wordCountFor(level: number): number {
  return clamp(Math.floor(level + 1e-9), MIN_WORDS, MAX_WORDS);
}

/** Anzahl neuer Wörter in der Auswahl: 5 … 8 (bei 12 Wörtern also 20 Felder, nicht 24) */
export function distractorCountFor(n: number): number {
  return clamp(n, 5, 8);
}

/** Erlaubte Abweichungen (fehlende + falsche Wörter) für eine „gelungene“ Liste: erst ab 9 Wörtern eine */
export function toleranceFor(n: number): number {
  return n >= 9 ? 1 : 0;
}

export interface Score {
  hits: number;
  /** gezeigte Wörter, die nicht gewählt wurden */
  misses: number;
  /** gewählte Wörter, die nicht gezeigt wurden (falsche Alarme) */
  falseAlarms: number;
}

export function scoreTrial(targets: readonly string[], picks: readonly string[]): Score {
  const t = new Set(targets);
  const p = new Set(picks);
  let hits = 0;
  let falseAlarms = 0;
  for (const w of p) {
    if (t.has(w)) hits++;
    else falseAlarms++;
  }
  return { hits, misses: t.size - hits, falseAlarms };
}

export function isMastered(n: number, s: Score): boolean {
  return s.misses + s.falseAlarms <= toleranceFor(n);
}

/** Zeit je Wort in ms (Normal ≈ 2 s; im Intro-Film kürzer; im Schnelltest sehr kurz) */
export function showMsFor(mode: { demo: boolean; quick: boolean }): number {
  return mode.demo ? 1100 : mode.quick ? 500 : 2000;
}

/** Weiche Ein-/Ausblendzeit an jedem Wortende in ms (Hälfte davon höchstens ein Viertel der Anzeige) */
export function fadeMsFor(showMs: number): number {
  return clamp(showMs * 0.15, 100, 300);
}

/** Sichtbarkeit 0..1 eines Wortes zur Zeit tau (ms seit Beginn seiner Anzeige); sinusförmig, ohne harte Kanten */
export function wordAlpha(tau: number, showMs: number): number {
  if (tau <= 0 || tau >= showMs) return 0;
  const f = fadeMsFor(showMs);
  const k = Math.min(tau / f, (showMs - tau) / f, 1);
  return 0.5 - 0.5 * Math.cos(Math.PI * k);
}

// ---------------------------------------------------------------------------
// Wortvorrat

/**
 * Zieht Wörter so, dass möglichst lange kein Wort zweimal in der Sitzung vorkommt (Vorlisten sollen nicht stören):
 * Es werden zuerst nie benutzte, danach die am längsten nicht benutzten Wörter genommen.
 */
export class WordBag {
  private readonly used = new Map<string, number>();
  private tick = 0;

  constructor(
    private readonly pool: readonly string[],
    private readonly rng: Rng,
  ) {}

  /** Wurde das Wort in dieser Sitzung schon gezogen? (für Tests) */
  seen(w: string): boolean {
    return this.used.has(w);
  }

  private age(w: string): number {
    return this.used.get(w) ?? -1;
  }

  /** n Ziel-Wörter ziehen (nie dieselben wie `exclude`) */
  drawTargets(n: number, exclude: ReadonlySet<string> = new Set()): string[] {
    const cand = this.pool.filter((w) => !exclude.has(w));
    const order = this.rng.shuffle(cand.slice()).sort((a, b) => this.age(a) - this.age(b));
    const out = order.slice(0, n);
    this.mark(out);
    return out;
  }

  /**
   * d neue Wörter ziehen, deren Länge möglichst nur 1 (sonst 2, sonst beliebig viele) Buchstaben von der Länge eines
   * Ziel-Wortes abweicht (die Länge verrät das Ziel dann nicht). Bevorzugt nie benutzte Wörter, sonst die ältesten.
   */
  drawDistractors(d: number, targets: readonly string[]): string[] {
    const taken = new Set(targets);
    const out: string[] = [];
    const lens = this.rng.shuffle(targets.map((w) => w.length));
    for (let i = 0; i < d; i++) {
      const L = lens[i % lens.length];
      const cand = this.pool.filter((w) => !taken.has(w));
      const unused = cand.filter((w) => this.age(w) < 0);
      let base: string[] = [];
      for (const dev of [1, 2, 99]) {
        const fit = unused.filter((w) => Math.abs(w.length - L) <= dev);
        if (fit.length >= 2) {
          base = fit;
          break;
        }
      }
      if (!base.length) {
        // Vorrat (fast) aufgebraucht: die am längsten nicht benutzten Wörter
        const old = cand.slice().sort((a, b) => this.age(a) - this.age(b));
        const oldest = old.slice(0, Math.max(8, Math.floor(old.length / 3)));
        const fit = oldest.filter((w) => Math.abs(w.length - L) <= 2);
        base = fit.length >= 2 ? fit : oldest;
      }
      const pick = this.rng.pick(base);
      taken.add(pick);
      out.push(pick);
    }
    this.mark(out);
    return out;
  }

  private mark(ws: readonly string[]): void {
    this.tick++;
    for (const w of ws) this.used.set(w, this.tick);
  }
}

export interface Trial {
  n: number;
  /** gezeigte Wörter in Zeigereihenfolge */
  targets: string[];
  /** Auswahl (gezeigte + neue Wörter), gemischt */
  choices: string[];
}

export function buildTrial(rng: Rng, bag: WordBag, n: number, distractors = distractorCountFor(n)): Trial {
  const targets = bag.drawTargets(n);
  const extra = bag.drawDistractors(distractors, targets);
  const choices = rng.shuffle([...targets, ...extra]);
  return { n, targets, choices };
}

// ---------------------------------------------------------------------------
// Auswahl-Raster

export interface Grid {
  cols: number;
  rows: number;
  btnW: number;
  btnH: number;
  gap: number;
}

/**
 * Raster für `count` Felder in einem Bereich: zuerst 2 Spalten; nur wenn die Buttons dann niedriger als
 * `minH` (56 px) würden, 3 oder 4 Spalten. Buttons sind höchstens `maxH` hoch.
 */
export function gridFor(count: number, availW: number, availH: number, gap: number, minH = MIN_BUTTON_H, maxH = 84): Grid {
  let best: Grid | null = null;
  for (const cols of [2, 3, 4]) {
    const rows = Math.ceil(count / cols);
    const h = (availH - (rows - 1) * gap) / rows;
    const btnW = (availW - (cols - 1) * gap) / cols;
    best = { cols, rows, btnW, btnH: Math.min(maxH, h), gap };
    if (h >= minH) return best;
  }
  return best!;
}
