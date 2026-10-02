/**
 * Wörter bauen – reine Logik (aus `WordSession` im Labor-Prototyp, ex/wordbuild.js).
 *
 * Durcheinandergewürfelte Buchstabenkacheln werden durch Antippen in die richtige Reihenfolge gebracht. Zeiten in ms
 * (virtuelle Zeit des Runners), Zufall nur über `Rng`, keine Darstellung, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Die Wörter kommen aus der Wortliste der Sprache (`woerter.ts`: Deutsch aus `_shared/labor-woerter.ts`, Italienisch eigene Liste),
 *   ohne Wiederholung, solange die Liste reicht. Ist das letzte Feld gefüllt, wird geprüft: jedes Wort der Liste aus denselben
 *   Buchstaben (Anagramm) gilt als richtig. Ein falsches Wort zählt als Fehler, die Kacheln gehen zurück.
 *
 * Abweichungen vom Prototyp:
 * - Die Kacheln tragen nur Kleinbuchstaben (angezeigt als Großbuchstaben): der Prototyp ließ den Großbuchstaben am Wortanfang
 *   stehen und verriet damit den ersten Buchstaben. Verglichen wird ohne Groß-/Kleinschreibung.
 * - Die Anordnung der Kacheln ist nie selbst ein gültiges Wort der Liste (Prototyp: nur nie das Zielwort).
 * - Die Zeit eines Wortes läuft ab dem Anzeigen der Kacheln (`beginWord`), nicht während der kurzen Pause nach dem vorigen Wort.
 *   Die Gesamtzeit ist die Summe der Wortzeiten (ohne diese Pausen).
 * - Buchstaben pro Minute zählt die tatsächlichen Buchstaben der gelösten Wörter.
 */
import { mean, median } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';
import { anagrammeVon, woerterMitLaenge, type Sprache } from './woerter';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'wordLength', type: 'number', unit: 'count', min: 3, max: 8, step: 1, default: 5, summary: true },
  { key: 'words', type: 'number', unit: 'count', min: 3, max: 30, step: 1, default: 8, summary: true },
  { key: 'tileCm', type: 'number', unit: 'cm', min: 1.5, max: 5, step: 0.5, default: 2.5 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export interface WordParams {
  wordLength: number;
  words: number;
  tileCm: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function wordParams(p: ExerciseParams): WordParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const s = p.sound;
  return {
    wordLength: Math.round(num('wordLength')),
    words: Math.round(num('words')),
    tileCm: num('tileCm'),
    sound: s === 'yes' ? 'yes' : 'no',
  };
}

/** Kleinste Kachel in Pixeln (Touch-Ziel) und kleinste Höhe des „Zurück“-Knopfs */
export const MIN_TILE_PX = 36;
export const UNDO_MIN_H = 56;
/** Schnellmodus (?quick=1): so viele Wörter, höchstens so lang */
export const QUICK_WORDS = 2;
export const QUICK_LENGTH = 4;

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

export interface Tile {
  /** Buchstabe in Kleinschreibung */
  ch: string;
  used: boolean;
}

export interface WordTrial {
  nr: number;
  word: string;
  ms: number;
  errors: number;
}

export type PlaceResult =
  | { type: 'placed' }
  | { type: 'wrong'; attempt: string }
  | { type: 'solved'; word: string }
  | { type: 'finished'; word: string }
  | null;

export interface WordSummary {
  solved: number;
  words: number;
  errors: number;
  /** Mittlere Zeit pro Wort in ms, null ohne gelöstes Wort */
  tMean: number | null;
  tMedian: number | null;
  /** Summe der Wortzeiten in ms, null ohne gelöstes Wort */
  totalMs: number | null;
  /** Gelöste Buchstaben pro Minute, null ohne Zeit */
  lpm: number | null;
  trials: WordTrial[];
}

/** Buchstabe auf der Kachel: Großbuchstabe (ß bleibt ß) */
export const displayLetter = (ch: string): string => (ch === 'ß' ? 'ß' : ch.toUpperCase());

export interface WordEnv {
  rng: Rng;
  lang: Sprache;
  /** Feste Wortfolge (Intro-Film) statt Zufallsauswahl */
  fixedWords?: readonly string[];
  /** Gültige Wörter aus denselben Buchstaben (Standard: die Wortliste der Sprache); nur für Tests austauschbar */
  anagrams?: (word: string) => string[];
}

/** Reine Spiellogik. */
export class WordSession {
  readonly p: WordParams;
  readonly lang: Sprache;
  readonly words: string[];
  idx = 0;
  errors = 0;
  errorsInWord = 0;
  trials: WordTrial[] = [];
  /** Indizes der gesetzten Kacheln in der Reihenfolge des Setzens */
  slots: number[] = [];
  tiles: Tile[] = [];
  target = '';
  finished = false;
  startedAt: number | null = null;
  wordStartedAt: number | null = null;
  endedAt: number | null = null;
  private valid: string[] = [];
  private readonly rng: Rng;
  private readonly anagrams: (word: string) => string[];

  constructor(p: WordParams, env: WordEnv) {
    this.p = p;
    this.rng = env.rng;
    this.lang = env.lang;
    this.anagrams = env.anagrams ?? ((w) => anagrammeVon(env.lang, w));
    if (env.fixedWords) this.words = env.fixedWords.slice();
    else {
      const pool = woerterMitLaenge(env.lang, p.wordLength);
      if (!pool.length) throw new Error('Keine Wörter dieser Länge vorhanden');
      const picked: string[] = [];
      let last = '';
      while (picked.length < p.words) {
        const round = this.rng.shuffle([...pool]);
        // am Übergang zweier Durchgänge dasselbe Wort nicht direkt wiederholen
        if (round.length > 1 && round[0] === last) [round[0], round[1]] = [round[1], round[0]];
        for (let i = 0; i < round.length && picked.length < p.words; i++) picked.push(round[i]);
        last = picked[picked.length - 1];
      }
      this.words = picked;
    }
    this.setupWord();
  }

  /** Kacheln durchmischen: nie das Zielwort und nie ein anderes gültiges Wort der Liste (sofern es überhaupt andere Anordnungen gibt) */
  scramble(word: string): string[] {
    const letters = word.toLowerCase().split('');
    if (new Set(letters).size < 2) return letters;
    let s: string[];
    let guard = 0;
    do s = this.rng.shuffle([...letters]);
    while (this.valid.includes(s.join('')) && guard++ < 200);
    return s;
  }

  private setupWord(): void {
    this.target = this.words[this.idx];
    this.valid = this.anagrams(this.target).map((w) => w.toLowerCase());
    if (!this.valid.includes(this.target.toLowerCase())) this.valid.push(this.target.toLowerCase());
    this.tiles = this.scramble(this.target).map((ch) => ({ ch, used: false }));
    this.slots = [];
    this.errorsInWord = 0;
  }

  start(now: number): void {
    this.startedAt = now;
  }

  /** Die Kacheln des aktuellen Wortes sind sichtbar geworden: ab hier läuft die Zeit des Wortes */
  beginWord(now: number): void {
    this.wordStartedAt = now;
  }

  /** Kachel `tileIdx` ins nächste Feld setzen; ist das letzte Feld gefüllt, wird geprüft */
  place(tileIdx: number, now: number): PlaceResult {
    const t = this.tiles[tileIdx];
    if (this.finished || this.slots.length >= this.tiles.length || !t || t.used) return null;
    t.used = true;
    this.slots.push(tileIdx);
    if (this.slots.length < this.tiles.length) return { type: 'placed' };
    return this.evaluate(now);
  }

  removeLast(): { type: 'removed' } | null {
    if (!this.slots.length || this.finished) return null;
    const t = this.slots.pop()!;
    this.tiles[t].used = false;
    return { type: 'removed' };
  }

  /** Das aktuell gelegte Wort in Kleinbuchstaben */
  attempt(): string {
    return this.slots.map((i) => this.tiles[i].ch).join('');
  }

  private evaluate(now: number): PlaceResult {
    const attempt = this.attempt();
    if (!this.valid.includes(attempt)) {
      this.errors++;
      this.errorsInWord++;
      this.slots = [];
      for (const t of this.tiles) t.used = false;
      return { type: 'wrong', attempt };
    }
    const from = this.wordStartedAt ?? this.startedAt ?? now;
    const word = this.target;
    this.trials.push({ nr: this.idx + 1, word, ms: Math.max(0, Math.round(now - from)), errors: this.errorsInWord });
    this.idx++;
    if (this.idx >= this.words.length) {
      this.finished = true;
      this.endedAt = now;
      return { type: 'finished', word };
    }
    this.setupWord();
    this.wordStartedAt = null;
    return { type: 'solved', word };
  }

  summary(): WordSummary {
    const ms = this.trials.map((t) => t.ms);
    const total = ms.reduce((a, b) => a + b, 0);
    const letters = this.trials.reduce((a, t) => a + t.word.length, 0);
    return {
      solved: this.trials.length,
      words: this.words.length,
      errors: this.errors,
      tMean: ms.length ? round(mean(ms), 0) : null,
      tMedian: ms.length ? round(median(ms), 0) : null,
      totalMs: ms.length ? total : null,
      lpm: ms.length && total > 0 ? round(letters / (total / 60000), 0) : null,
      trials: this.trials.slice(),
    };
  }
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WordLayout {
  /** Kantenlänge einer Kachel in px */
  tile: number;
  gap: number;
  /** linke Kante der Reihe */
  x0: number;
  slotY: number;
  tileY: number;
  undo: Box;
}

/**
 * Anordnung: oben die Felder, darunter die Kacheln, darunter „Zurück“ – zentriert im Bereich, ganz darin. Die Kachelgröße ist die
 * gewünschte (cm → px, bereits auf die Bühne begrenzt), verkleinert sich aber, damit n Kacheln nebeneinander und alles
 * übereinander in den Bereich passt. `header` = Platz für die Textzeile oben.
 */
export function layoutWord(box: Box, n: number, wantedTile: number, header: number): WordLayout {
  const gapOf = (t: number): number => Math.max(5, Math.min(16, t * 0.16));
  const undoH = Math.min(UNDO_MIN_H + 8, Math.max(UNDO_MIN_H, box.h * 0.1));
  let tile = Math.max(8, wantedTile);
  for (let i = 0; i < 3; i++) {
    const gap = gapOf(tile);
    const byW = (box.w - gap * (n - 1)) / n;
    const gv = Math.max(12, Math.min(60, tile * 0.4));
    const byH = (box.h - header - undoH - 2 * gv) / 2;
    tile = Math.max(8, Math.min(wantedTile, byW, byH));
  }
  const gap = gapOf(tile);
  const gv = Math.max(12, Math.min(60, tile * 0.4));
  const stackH = 2 * tile + 2 * gv + undoH;
  const top = box.y + header + Math.max(0, (box.h - header - stackH) / 2);
  const rowW = n * tile + (n - 1) * gap;
  const x0 = box.x + (box.w - rowW) / 2;
  const undoW = Math.min(box.w, Math.max(150, Math.min(260, tile * 3)));
  return {
    tile,
    gap,
    x0,
    slotY: top,
    tileY: top + tile + gv,
    undo: { x: box.x + (box.w - undoW) / 2, y: top + 2 * tile + 2 * gv, w: undoW, h: undoH },
  };
}

/** Rechteck von Feld/Kachel i in der Reihe mit Oberkante y */
export function rowRect(L: WordLayout, i: number, y: number): Box {
  return { x: L.x0 + i * (L.tile + L.gap), y, w: L.tile, h: L.tile };
}

/** Punkte (nur zur Motivation) */
export function pointsFor(solved: number, errors: number): number {
  return Math.max(0, solved * 10 - errors * 2);
}

/** Schlüssel in texts.tips: ein persönlicher Tipp nach dem Lauf */
export function tipFor(sum: WordSummary): string {
  if (sum.errors >= Math.max(3, sum.words / 2)) return 'errors';
  if (sum.tMean !== null && sum.tMean > 9000) return 'slow';
  if (sum.errors === 0) return 'harder';
  return 'compare';
}
