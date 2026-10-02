/**
 * 4-Ziele-Wechsel – reine Logik (ohne Canvas), prüfbar mit vitest.
 *
 * Die Übung ist die „Vier-Tafel-Übung“ (Hart-Chart-Verfahren): In den vier Ecken des Bildschirms steht je eine
 * Tafel, ein Raster aus Buchstaben (Zeilen × Spalten). Gelesen wird ein Buchstabe von jeder Tafel im Wechsel:
 * Position p der ersten Tafel → Position p der zweiten → dritten → vierten Tafel → dann Position p + 1 der ersten
 * Tafel … bis alle Buchstaben aller Tafeln gelesen sind (Leseregel; Fachartikel: „The patient has to read one letter
 * from each chart until all the letters are read“). Position = Leserichtung innerhalb der Tafel: zeilenweise (Zeile
 * für Zeile, von links nach rechts), auf späteren Stufen spaltenweise. Auf dem Tablet wird nicht vorgelesen, sondern
 * die Buchstaben werden in dieser Reihenfolge angetippt; getippte Buchstaben werden blass (bleiben sichtbar), der
 * nächste Buchstabe jeder Tafel ist also immer der erste nicht blasse.
 *
 * Ecken: 0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts.
 *
 * Tafelreihenfolge (`Order`; nur „Leserichtung“ und „wechselnd“ sind durch Quellen gestützt, alles Übrige sind eigene
 * Festlegungen der App; die Reihenfolge der Tafeln steht im Fachartikel nicht):
 *   reading  Leserichtung (Stufe 1): oben links → oben rechts → unten links → unten rechts
 *   cw       Uhrzeigersinn: oben links → oben rechts → unten rechts → unten links
 *   zigzag   über Kreuz: oben links → unten rechts → oben rechts → unten links
 *   varying  wechselnd: In jedem Durchlauf liest du die vier Tafeln in einer Reihenfolge deiner Wahl, jede Tafel
 *            einmal (ABWEICHUNG von „zufällige Reihenfolge“: eine vom Gerät ausgelöste Zufallsreihenfolge ist ohne
 *            Führung nicht zu wissen; also bestimmt die Person die Reihenfolge, die App prüft nur „jede Tafel einmal,
 *            erst dann der nächste Buchstabe“. Diese Stufen haben nie eine Führung.)
 * Wechsel-Granularität `gran`: so viele Buchstaben nacheinander aus derselben Tafel (1 = nach jedem Buchstaben
 * wechseln, 2 = nach zwei Buchstaben, „halbe Zeile“).
 * Leserichtung in der Tafel `scan`: zeilenweise oder spaltenweise (Steigerung aus den Quellen).
 *
 * Stufentabelle (17 Stufen, jeder Schritt ändert genau einen Parameter, siehe `LEVELS`).
 * Nach jeder Runde (alle vier Tafeln vollständig gelesen) entscheidet eine feste Regel über die nächste Stufe
 * (≥ 90 % richtig und gleichmäßige Zeit → eine Stufe schwerer, 75–89 % gleich, < 75 % eine Stufe leichter).
 *
 * Gemessen wird nur, was der Finger tut: die Zeit von Tipp zu Tipp (zum großen Teil der Fingerweg). Der Blick wird
 * nicht gemessen. Beim Tippen nach Position müssen die Buchstaben nicht erkannt werden; auf den Stufen mit ähnlichen
 * oder gemischten Buchstaben misst die Übung deshalb eher Dichte und Suchen als Unterscheiden (offene Frage).
 */
import type { Rng } from '../../core/rng';
import { clamp, lerp, mean, median, quantile } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 17;
export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

// ---------------------------------------------------------------------------
// Stufentabelle

export type Chars = 'distinct' | 'similar' | 'mixed';
export type FixedOrder = 'reading' | 'cw' | 'zigzag';
export type Order = FixedOrder | 'varying';
export type Scan = 'rows' | 'cols';
export type Guide = 'letter' | 'chart' | 'none';

/** Buchstabengröße: Schrifthöhe in u (1 % der kürzeren Seite), aber nie unter `minPx` */
export interface SizeSpec {
  u: number;
  minPx: number;
}
export const SIZES: readonly SizeSpec[] = [
  { u: 6, minPx: 28 },
  { u: 4.8, minPx: 24 },
  { u: 3.8, minPx: 22 },
  { u: 3, minPx: 22 },
];

export interface LevelParams {
  level: number;
  /** Index in SIZES (0 = größte Buchstaben) */
  size: number;
  /** Buchstaben je Tafel: Spalten × Zeilen (auf kleinen Bühnen verkleinert, siehe `fitGrid`) */
  cols: number;
  rows: number;
  /** Abstand der Tafeln: 0 = nah an der Mitte, 1 = ganz in den Ecken */
  reach: number;
  /** Wechsel-Granularität: Buchstaben je Tafel, bevor zur nächsten gewechselt wird */
  gran: 1 | 2;
  order: Order;
  /** Leserichtung in der Tafel: zeilenweise oder spaltenweise */
  scan: Scan;
  /** Führung: Ring um den nächsten Buchstaben / um die nächste Tafel / keine */
  guide: Guide;
  chars: Chars;
}

export const PARAM_KEYS = ['size', 'grid', 'reach', 'gran', 'order', 'scan', 'guide', 'chars'] as const;
export type ParamKey = (typeof PARAM_KEYS)[number];

const valueOf = (p: LevelParams, k: ParamKey): string | number => (k === 'grid' ? `${p.cols}x${p.rows}` : p[k]);

/** Welche Parameter unterscheiden sich zwischen zwei Stufen? (Test: je Schritt genau einer) */
export function changedParams(a: LevelParams, b: LevelParams): ParamKey[] {
  return PARAM_KEYS.filter((k) => valueOf(a, k) !== valueOf(b, k));
}

const P = (
  level: number,
  size: number,
  cols: number,
  rows: number,
  reach: number,
  gran: 1 | 2,
  order: Order,
  scan: Scan,
  guide: Guide,
  chars: Chars,
): LevelParams => ({ level, size, cols, rows, reach, gran, order, scan, guide, chars });

/**
 * Stufe | Schrift | Tafel | Abstand | Wechsel | Reihenfolge | Lesen   | Führung        | Buchstaben | geändert gegenüber der Stufe davor
 *   1   | groß    | 3×3   | 0,50    | 1       | Leserichtung | Zeilen  | Buchstabenring | deutlich versch. | – (Einstieg)
 *   2   | groß    | 3×3   | 0,75    | 1       | Leserichtung | Zeilen  | Buchstabenring | deutlich versch. | Abstand
 *   3   | groß    | 4×4   | 0,75    | 1       | Leserichtung | Zeilen  | Buchstabenring | deutlich versch. | Tafelgröße
 *   4   | mittel  | 4×4   | 0,75    | 1       | Leserichtung | Zeilen  | Buchstabenring | deutlich versch. | Schrift
 *   5   | mittel  | 4×4   | 0,75    | 1       | Leserichtung | Zeilen  | Tafelring      | deutlich versch. | Führung
 *   6   | mittel  | 5×5   | 0,75    | 1       | Leserichtung | Zeilen  | Tafelring      | deutlich versch. | Tafelgröße (5×5 wie in den Quellen)
 *   7   | mittel  | 5×5   | 0,75    | 1       | Uhrzeigersinn | Zeilen | Tafelring      | deutlich versch. | Reihenfolge
 *   8   | mittel  | 5×5   | 1,00    | 1       | Uhrzeigersinn | Zeilen | Tafelring      | deutlich versch. | Abstand
 *   9   | mittel  | 5×5   | 1,00    | 2       | Uhrzeigersinn | Zeilen | Tafelring      | deutlich versch. | Wechsel-Granularität
 *  10   | mittel  | 5×5   | 1,00    | 2       | Uhrzeigersinn | Spalten | Tafelring     | deutlich versch. | Lesen (spaltenweise)
 *  11   | mittel  | 5×5   | 1,00    | 2       | über Kreuz   | Spalten | Tafelring      | deutlich versch. | Reihenfolge
 *  12   | klein   | 5×5   | 1,00    | 2       | über Kreuz   | Spalten | Tafelring      | deutlich versch. | Schrift
 *  13   | klein   | 5×5   | 1,00    | 2       | über Kreuz   | Spalten | keine          | deutlich versch. | Führung
 *  14   | klein   | 5×5   | 1,00    | 2       | wechselnd    | Spalten | keine          | deutlich versch. | Reihenfolge
 *  15   | kleinst | 5×5   | 1,00    | 2       | wechselnd    | Spalten | keine          | deutlich versch. | Schrift
 *  16   | kleinst | 5×5   | 1,00    | 2       | wechselnd    | Spalten | keine          | ähnlich B D P R E F | Buchstaben
 *  17   | kleinst | 5×5   | 1,00    | 2       | wechselnd    | Spalten | keine          | Groß-/Kleinbuchstaben, Ziffern | Buchstaben
 * „wechselnd“ steht nur nach dem Wegfall der Führung (siehe `Order`). Die Reihenfolge der Stufen ist eine eigene
 * Festlegung (Schwierigkeit grob steigend, eine Änderung je Schritt), kein Vorbild aus der Literatur.
 */
export const LEVELS: readonly LevelParams[] = [
  P(1, 0, 3, 3, 0.5, 1, 'reading', 'rows', 'letter', 'distinct'),
  P(2, 0, 3, 3, 0.75, 1, 'reading', 'rows', 'letter', 'distinct'),
  P(3, 0, 4, 4, 0.75, 1, 'reading', 'rows', 'letter', 'distinct'),
  P(4, 1, 4, 4, 0.75, 1, 'reading', 'rows', 'letter', 'distinct'),
  P(5, 1, 4, 4, 0.75, 1, 'reading', 'rows', 'chart', 'distinct'),
  P(6, 1, 5, 5, 0.75, 1, 'reading', 'rows', 'chart', 'distinct'),
  P(7, 1, 5, 5, 0.75, 1, 'cw', 'rows', 'chart', 'distinct'),
  P(8, 1, 5, 5, 1, 1, 'cw', 'rows', 'chart', 'distinct'),
  P(9, 1, 5, 5, 1, 2, 'cw', 'rows', 'chart', 'distinct'),
  P(10, 1, 5, 5, 1, 2, 'cw', 'cols', 'chart', 'distinct'),
  P(11, 1, 5, 5, 1, 2, 'zigzag', 'cols', 'chart', 'distinct'),
  P(12, 2, 5, 5, 1, 2, 'zigzag', 'cols', 'chart', 'distinct'),
  P(13, 2, 5, 5, 1, 2, 'zigzag', 'cols', 'none', 'distinct'),
  P(14, 2, 5, 5, 1, 2, 'varying', 'cols', 'none', 'distinct'),
  P(15, 3, 5, 5, 1, 2, 'varying', 'cols', 'none', 'distinct'),
  P(16, 3, 5, 5, 1, 2, 'varying', 'cols', 'none', 'similar'),
  P(17, 3, 5, 5, 1, 2, 'varying', 'cols', 'none', 'mixed'),
];

export const paramsFor = (level: number): LevelParams => LEVELS[levelOf(level) - 1];

/** Buchstabenvorrat je Satz (deutlich verschieden / ähnlich / Groß- und Kleinbuchstaben und Ziffern gemischt) */
export const LETTERS: Record<Chars, readonly string[]> = {
  distinct: ['A', 'E', 'H', 'K', 'L', 'O', 'T', 'U', 'X', 'Z'],
  similar: ['B', 'D', 'P', 'R', 'E', 'F'],
  mixed: ['B', 'D', 'G', 'P', 'R', 'E', 'F', 'a', 'b', 'd', 'e', 'g', 'h', 'n', 'p', 'q', '2', '3', '5', '6', '8', '9'],
};

/** Buchstaben einer Tafel in Leserichtung; nie derselbe Buchstabe zweimal hintereinander */
export function makeChart(rng: Pick<Rng, 'int'>, chars: Chars, count: number): string[] {
  const pool = LETTERS[chars];
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    let c = pool[rng.int(pool.length)];
    while (i > 0 && c === out[i - 1]) c = pool[rng.int(pool.length)];
    out.push(c);
  }
  return out;
}

/** Vier verschiedene (gemischte) Tafeln mit je `count` Buchstaben */
export function makeCharts(rng: Pick<Rng, 'int'>, chars: Chars, count: number): string[][] {
  return [0, 1, 2, 3].map(() => makeChart(rng, chars, count));
}

// ---------------------------------------------------------------------------
// Ablauf: Runden

export interface RoundPlan {
  rounds: number;
  /** Vorschlag für die Pause zwischen den Runden; sie endet von selbst oder durch Antippen */
  restMs: number;
  /** Kurze Startphase: alle Tafeln sichtbar, Reihenfolge-Hinweis, noch kein Tipp */
  startMs: number;
  /** Schnellmodus: nach so vielen Buchstaben endet die Runde (sonst erst, wenn alle gelesen sind) */
  capSteps: number;
  /** Notbremse (z. B. Tablet weggelegt): nach so langer Zeit endet die Runde mit dem, was gelesen wurde */
  capMs: number;
}

export function roundPlan(quick: boolean): RoundPlan {
  return quick
    ? { rounds: 2, restMs: 2200, startMs: 700, capSteps: 8, capMs: 40_000 }
    : { rounds: 3, restMs: 10_000, startMs: 2400, capSteps: Infinity, capMs: 300_000 };
}

/** Folgetipps innerhalb dieser Zeit werden ignoriert (Doppeltipp) */
export const DOUBLE_TAP_MS = 100;

// ---------------------------------------------------------------------------
// Takt (Metronom, Option vor dem Start; nicht Teil der Stufentabelle)

export type BeatTempo = 'slow' | 'medium' | 'fast';
export const BEAT_CHOICES: readonly BeatTempo[] = ['slow', 'medium', 'fast'];
export const BEAT_DEFAULT: BeatTempo = 'medium';
/** Abstand der Taktschläge in ms: langsam 1,4 s · mittel 1,0 s (= 60 pro Minute) · schnell 0,8 s; ein Schlag = ein Buchstabe (Annahme) */
export const BEAT_MS: Record<BeatTempo, number> = { slow: 1400, medium: 1000, fast: 800 };
/** Ein Tipp gilt als „im Takt“, wenn er höchstens so weit (ms) neben einem Taktschlag liegt; nie ein Fehlergrund */
export const BEAT_WINDOW_MS = 300;
/** Der erste Taktschlag einer Runde kommt so lange nach Rundenbeginn */
export const BEAT_START_MS = 900;

export const beatMsFor = (choice: string): number => BEAT_MS[choice as BeatTempo] ?? BEAT_MS[BEAT_DEFAULT];

/** Abstand eines Tipps zum nächsten Taktschlag in ms (Schläge bei t0 + k · interval, k ≥ 0) */
export function beatOffset(t: number, t0: number, interval: number): number {
  const k = Math.max(0, Math.round((t - t0) / interval));
  return Math.abs(t - (t0 + k * interval));
}

export const onBeat = (t: number, t0: number, interval: number): boolean => beatOffset(t, t0, interval) <= BEAT_WINDOW_MS + 1e-9;

// ---------------------------------------------------------------------------
// Ecken und Richtungen

export type Corner = 0 | 1 | 2 | 3;
export const CORNERS: readonly Corner[] = [0, 1, 2, 3];
export const cornerCol = (c: number): number => c & 1;
export const cornerRow = (c: number): number => c >> 1;

/** Feste Tafelreihenfolgen (Ecken) */
export const CHART_ORDER: Record<FixedOrder, readonly Corner[]> = {
  reading: [0, 1, 2, 3],
  cw: [0, 1, 3, 2],
  zigzag: [0, 3, 1, 2],
};

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
// Leseregel

export interface Cell {
  chart: Corner;
  /** Position in Leserichtung (0 = erster Buchstabe oben links in der Tafel) */
  pos: number;
}

/** Spalte und Zeile der Position `pos`: zeilenweise (Zeile für Zeile) oder spaltenweise (Spalte für Spalte) */
export function gridOfPos(pos: number, cols: number, rows: number, scan: Scan): { col: number; row: number } {
  return scan === 'rows' ? { col: pos % cols, row: Math.floor(pos / cols) } : { col: Math.floor(pos / rows), row: pos % rows };
}

/** Umkehrung von `gridOfPos` */
export function posOfGrid(col: number, row: number, cols: number, rows: number, scan: Scan): number {
  return scan === 'rows' ? row * cols + col : col * rows + row;
}

/**
 * Zustandsautomat der Leseregel für eine Runde mit `n` Buchstaben je Tafel.
 *
 * Ein Durchlauf (`pass`) deckt die Positionen [pass·gran, pass·gran + gran) ab (die letzte kann kürzer sein):
 * jede der vier Tafeln liest diesen Block am Stück, dann kommt die nächste Tafel. Feste Reihenfolge (reading, cw, zigzag):
 * genau ein Buchstabe ist erwartet. `varying`: am Beginn eines Blocks ist der Anfang jeder noch nicht gelesenen
 * Tafel dieses Durchlaufs erlaubt (bis zu vier Buchstaben); ist ein Block begonnen, geht er in derselben Tafel weiter.
 */
export class Reader {
  /** Welche Buchstaben schon gelesen sind: done[Ecke][Position] */
  readonly done: boolean[][];
  /** Gelesene Buchstaben */
  count = 0;
  /** Zuletzt gelesener Buchstabe */
  last: Cell | null = null;
  private pass = 0;
  private readonly doneCharts = new Set<number>();
  private cur: number | null = null;
  private inBlock = 0;

  constructor(
    readonly n: number,
    readonly gran: number,
    readonly order: Order,
  ) {
    this.done = Array.from({ length: 4 }, () => new Array<boolean>(n).fill(false));
  }

  get total(): number {
    return 4 * this.n;
  }

  get finished(): boolean {
    return this.count >= this.total;
  }

  /** Aktueller Durchlauf (0-basiert) */
  get passIndex(): number {
    return this.pass;
  }

  private blockLen(): number {
    return Math.min(this.gran, this.n - this.pass * this.gran);
  }

  /** Mitten in einem Block (der nächste Buchstabe kommt aus derselben Tafel)? */
  get midBlock(): boolean {
    return this.cur !== null;
  }

  /** Erlaubte nächste Buchstaben (leer, wenn fertig) */
  expected(): Cell[] {
    if (this.finished) return [];
    if (this.cur !== null) return [{ chart: this.cur as Corner, pos: this.pass * this.gran + this.inBlock }];
    const pos = this.pass * this.gran;
    if (this.order === 'varying') return CORNERS.filter((c) => !this.doneCharts.has(c)).map((chart) => ({ chart, pos }));
    const next = CHART_ORDER[this.order].find((c) => !this.doneCharts.has(c));
    return next === undefined ? [] : [{ chart: next, pos }];
  }

  /** Der eindeutig nächste Buchstabe (feste Reihenfolge); null bei freier Wahl oder wenn fertig */
  next(): Cell | null {
    const e = this.expected();
    return e.length === 1 ? e[0] : null;
  }

  /** Tipp auf `cell`: zählt, wenn er erlaubt ist (dann rückt die Regel weiter), sonst false (= Fehler) */
  accept(cell: Cell): boolean {
    if (!this.expected().some((e) => e.chart === cell.chart && e.pos === cell.pos)) return false;
    this.done[cell.chart][cell.pos] = true;
    this.count++;
    this.last = { chart: cell.chart, pos: cell.pos };
    this.cur = cell.chart;
    this.inBlock++;
    if (this.inBlock >= this.blockLen()) {
      this.doneCharts.add(cell.chart);
      this.cur = null;
      this.inBlock = 0;
      if (this.doneCharts.size === 4) {
        this.pass++;
        this.doneCharts.clear();
      }
    }
    return true;
  }
}

/** Die ganze Lesefolge einer festen Reihenfolge (nicht für `varying`: dort wählt die Person) */
export function readingSequence(n: number, gran: number, order: FixedOrder): Cell[] {
  const r = new Reader(n, gran, order);
  const out: Cell[] = [];
  while (!r.finished) {
    const c = r.next();
    if (!c) break;
    r.accept(c);
    out.push(c);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Geometrie

/** Zielfläche je Buchstabe = Zelle: mindestens so groß (px) */
export const MIN_CELL_PX = 50;
/** Zellgröße im Verhältnis zur Schrifthöhe */
export const CELL_PER_FONT = 1.75;
/** Rand der Tafel um das Raster, im Verhältnis zur Zelle */
export const PAD_F = 0.12;
/** Schrift höchstens so groß im Verhältnis zur Zelle (damit der Buchstabe in die Zelle passt) */
export const FONT_PER_CELL = 0.78;

export interface ChartRect {
  corner: Corner;
  /** Karte (Tafel samt Rand) */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Ursprung des Rasters (obere linke Zelle) */
  gx: number;
  gy: number;
}

export interface Layout {
  w: number;
  h: number;
  cols: number;
  rows: number;
  scan: Scan;
  /** Seitenlänge einer Zelle = Zielfläche je Buchstabe */
  cell: number;
  /** Schriftgröße in px */
  font: number;
  pad: number;
  charts: ChartRect[];
}

const edge = (u: number): { m: number; gap: number } => ({ m: Math.max(8, u * 1.5), gap: Math.max(20, u * 3) });

/** Größte Zelle, bei der zwei Tafeln nebeneinander und übereinander mit Rand und Mindestabstand ins Feld passen */
export function cellMaxFor(w: number, h: number, u: number, cols: number, rows: number): number {
  const { m, gap } = edge(u);
  return Math.min((w - 2 * m - gap) / (2 * (cols + 2 * PAD_F)), (h - 2 * m - gap) / (2 * (rows + 2 * PAD_F)));
}

/** Gewünschtes Raster, verkleinert, bis die Zellen auf dem Feld mindestens `MIN_CELL_PX` groß sein können */
export function fitGrid(w: number, h: number, u: number, cols: number, rows: number, minCell: number = MIN_CELL_PX): { cols: number; rows: number } {
  let c = cols;
  let r = rows;
  while (cellMaxFor(w, h, u, c, r) < minCell) {
    if (c >= r && c > 2) c--;
    else if (r > 2) r--;
    else if (c > 1) c--;
    else break;
  }
  return { cols: c, rows: r };
}

/**
 * Feld `w × h`. Die vier Tafeln sitzen in den Ecken; `reach` schiebt sie von der Mitte (0) bis ganz an den Rand (1).
 * Die Karten überlappen nie und liegen im Feld. Die Zelle ist mindestens `MIN_CELL_PX` groß, wo das Feld es zulässt.
 */
export function layoutFor(w: number, h: number, u: number, size: number, reach: number, cols: number, rows: number, scan: Scan = 'rows'): Layout {
  const { m, gap } = edge(u);
  const sp = SIZES[clamp(Math.round(size), 0, SIZES.length - 1)];
  const fontWanted = Math.max(sp.minPx, sp.u * u);
  const desired = Math.max(MIN_CELL_PX, fontWanted * CELL_PER_FONT);
  const cell = Math.min(desired, cellMaxFor(w, h, u, cols, rows));
  const font = Math.min(fontWanted, cell * FONT_PER_CELL);
  const pad = cell * PAD_F;
  const bw = cols * cell + 2 * pad;
  const bh = rows * cell + 2 * pad;
  const r = clamp(reach, 0, 1);
  const x0 = lerp(w / 2 - gap / 2 - bw, m, r);
  const y0 = lerp(h / 2 - gap / 2 - bh, m, r);
  const xs = [x0, w - x0 - bw];
  const ys = [y0, h - y0 - bh];
  const charts: ChartRect[] = CORNERS.map((corner) => {
    const x = xs[cornerCol(corner)];
    const y = ys[cornerRow(corner)];
    return { corner, x, y, w: bw, h: bh, gx: x + pad, gy: y + pad };
  });
  return { w, h, cols, rows, scan, cell, font, pad, charts };
}

/** Feld und Stufe → Layout (Raster passend verkleinert) */
export function layoutForLevel(w: number, h: number, u: number, level: number): Layout {
  const p = paramsFor(level);
  const g = fitGrid(w, h, u, p.cols, p.rows);
  return layoutFor(w, h, u, p.size, p.reach, g.cols, g.rows, p.scan);
}

/** Mittelpunkt und Rechteck des Buchstabens an der Position `pos` */
export function cellRect(lay: Layout, chart: number, pos: number): { x: number; y: number; w: number; h: number; cx: number; cy: number } {
  const c = lay.charts[chart];
  const { col, row } = gridOfPos(pos, lay.cols, lay.rows, lay.scan);
  const x = c.gx + col * lay.cell;
  const y = c.gy + row * lay.cell;
  return { x, y, w: lay.cell, h: lay.cell, cx: x + lay.cell / 2, cy: y + lay.cell / 2 };
}

/** Welcher Buchstabe (Position) liegt unter dem Punkt? Der Rand der Tafel zählt zur nächsten Zelle; sonst null (Tipp ins Leere) */
export function cellAt(lay: Layout, x: number, y: number): Cell | null {
  for (const c of lay.charts) {
    if (x < c.x || x > c.x + c.w || y < c.y || y > c.y + c.h) continue;
    const col = clamp(Math.floor((x - c.gx) / lay.cell), 0, lay.cols - 1);
    const row = clamp(Math.floor((y - c.gy) / lay.cell), 0, lay.rows - 1);
    return { chart: c.corner, pos: posOfGrid(col, row, lay.cols, lay.rows, lay.scan) };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Buchstaben-Datensätze und Auswertung

/** Ein gelesener Buchstabe (jeder Buchstabe der Runde ergibt genau einen Datensatz, sobald er richtig getippt ist) */
export interface StepRec {
  round: number;
  /** Nummer des Buchstabens in der Runde (0-basiert) */
  index: number;
  level: number;
  chart: Corner;
  pos: number;
  /** Tafel des vorigen Buchstabens in dieser Runde (null beim ersten) */
  from: Corner | null;
  gran: number;
  /** Zeit von Tipp zu Tipp in ms (vom vorigen richtigen Tipp); null beim ersten Tipp der Runde */
  rt: number | null;
  /** falsche Tipps vor dem richtigen */
  errors: number;
  /** nur mit Takt gespielt: lag der richtige Tipp im Taktfenster? (sonst nicht gesetzt) */
  onBeat?: boolean;
}

export const isClean = (s: StepRec): boolean => s.errors === 0 && s.rt !== null;
const cleanTimes = (ss: readonly StepRec[]): number[] => ss.filter(isClean).map((s) => s.rt as number);

/** Gleichmäßige Zeit: Streuung (Quartilsabstand) höchstens 60 % des Medians, bei mindestens 4 gültigen Zeiten */
export const STABLE_SPREAD = 0.6;

export function isStable(rts: readonly number[]): boolean {
  if (rts.length < 4) return false;
  const med = median(rts);
  if (!(med > 0)) return false;
  return (quantile(rts, 0.75) - quantile(rts, 0.25)) / med <= STABLE_SPREAD;
}

export interface RoundStats {
  /** richtig getippte Buchstaben (Treffer) */
  hits: number;
  errors: number;
  /** Treffer + Fehler */
  taps: number;
  /** 0..1 = Treffer / Tipps */
  accuracy: number;
  meanMs: number;
  stable: boolean;
}

export function evalRound(steps: readonly StepRec[]): RoundStats {
  const hits = steps.length;
  const errors = steps.reduce((a, s) => a + s.errors, 0);
  const taps = hits + errors;
  const rts = cleanTimes(steps);
  return { hits, errors, taps, accuracy: taps ? hits / taps : 0, meanMs: rts.length ? mean(rts) : NaN, stable: isStable(rts) };
}

export type Move = 'harder' | 'same' | 'easier';

/** ≥ 90 % richtig und gleichmäßige Zeit → schwerer; 75–89 % (oder ≥ 90 % mit unruhiger Zeit) → gleich; < 75 % → leichter */
export function moveFor(s: Pick<RoundStats, 'accuracy' | 'stable'>): Move {
  if (s.accuracy >= 0.9 - 1e-9) return s.stable ? 'harder' : 'same';
  if (s.accuracy >= 0.75 - 1e-9) return 'same';
  return 'easier';
}

export function applyMove(level: number, move: Move): number {
  return levelOf(level + (move === 'harder' ? 1 : move === 'easier' ? -1 : 0));
}

export interface RoundLog {
  level: number;
  accuracy: number;
}

/**
 * Erreichte Stufe (Hauptwert): die höchste Stufe, auf der eine Runde mit mindestens 75 % richtig geschafft wurde.
 * Ohne so eine Runde: eine unter der niedrigsten gespielten Stufe (nicht unter 1); ohne Runde: die aktuelle.
 */
export function reachedLevel(rounds: readonly RoundLog[], current: number): number {
  if (!rounds.length) return levelOf(current);
  const ok = rounds.filter((s) => s.accuracy >= 0.75 - 1e-9).map((s) => s.level);
  if (ok.length) return levelOf(Math.max(...ok));
  return levelOf(Math.min(...rounds.map((s) => s.level)) - 1);
}

export interface RoundRec {
  round: number;
  level: number;
  durationMs: number;
  hits: number;
  errors: number;
  meanMs: number;
}

export interface DirectionStat {
  dir: Direction;
  /** gültige Tafelwechsel in dieser Richtung */
  n: number;
  /** Mittelwert in ms; NaN bei weniger als `minPerDirection` gültigen Wechseln */
  meanMs: number;
}

export interface JumpStat {
  /** Zeit bei einem Tafelwechsel und innerhalb derselben Tafel (nur Runden mit Wechsel nach 2 Buchstaben) */
  switchMs: number;
  switchN: number;
  withinMs: number;
  withinN: number;
}

export interface BeatStat {
  /** richtige Tipps in Runden mit Takt */
  n: number;
  /** davon im Taktfenster */
  on: number;
  /** 0..1 */
  share: number;
}

export interface Summary {
  /** gelesene Buchstaben */
  total: number;
  /** Treffer = gelesene Buchstaben */
  hits: number;
  errors: number;
  taps: number;
  accuracy: number;
  meanMs: number;
  medianMs: number;
  /** erste und letzte Hälfte der Buchstaben (der mittlere bei ungerader Zahl bleibt draußen) */
  firstHalfMs: number;
  lastHalfMs: number;
  firstHalfOk: number;
  firstHalfTotal: number;
  lastHalfOk: number;
  lastHalfTotal: number;
  directions: DirectionStat[];
  fastest: Direction | null;
  slowest: Direction | null;
  /** null, wenn keine Runde mit Wechsel nach 2 Buchstaben gespielt wurde */
  jump: JumpStat | null;
  /** null, wenn ohne Takt gespielt wurde; sonst Anteil der richtigen Tipps im Taktfenster (nur Zusatzwert) */
  beat: BeatStat | null;
}

/** Mindestzahl gültiger Zeiten für einen Mittelwert (Hälfte) */
export const MIN_FOR_MEAN = 3;
/** Richtungsmittel erst ab so vielen gültigen Tafelwechseln je Klasse (bei Streuung ≈ 150 ms sind 3 Werte zu unsicher; siehe docs/wissenschaft/06) */
export const MIN_FOR_DIRECTION = 8;
/** Vergleich Tafelwechsel gegen Zeit innerhalb der Tafel: erst ab so vielen gültigen Zeiten je Seite */
export const MIN_FOR_JUMP = 8;

const meanOrNaN = (xs: readonly number[], min = MIN_FOR_MEAN): number => (xs.length >= min ? mean(xs) : NaN);

export function summarize(steps: readonly StepRec[], minPerDirection = MIN_FOR_DIRECTION, minForJump = MIN_FOR_JUMP): Summary {
  const n = steps.length;
  const half = Math.floor(n / 2);
  const first = steps.slice(0, half);
  const last = steps.slice(n - half);
  const all = cleanTimes(steps);
  const directions: DirectionStat[] = DIRECTIONS.map((dir) => {
    const rts = cleanTimes(steps.filter((s) => s.from !== null && directionOf(s.from, s.chart) === dir));
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
  const two = steps.filter((s) => s.gran >= 2 && s.from !== null);
  let jump: JumpStat | null = null;
  if (two.length) {
    const sw = cleanTimes(two.filter((s) => s.from !== s.chart));
    const wi = cleanTimes(two.filter((s) => s.from === s.chart));
    jump = {
      switchMs: meanOrNaN(sw, minForJump),
      switchN: sw.length,
      withinMs: meanOrNaN(wi, minForJump),
      withinN: wi.length,
    };
  }
  const beated = steps.filter((s) => s.onBeat !== undefined);
  const beatOn = beated.filter((s) => s.onBeat).length;
  const errors = steps.reduce((a, s) => a + s.errors, 0);
  const noErr = (ss: readonly StepRec[]): number => ss.filter((s) => s.errors === 0).length;
  return {
    total: n,
    hits: n,
    errors,
    taps: n + errors,
    accuracy: n + errors ? n / (n + errors) : 0,
    meanMs: all.length ? mean(all) : NaN,
    medianMs: all.length ? median(all) : NaN,
    firstHalfMs: meanOrNaN(cleanTimes(first)),
    lastHalfMs: meanOrNaN(cleanTimes(last)),
    firstHalfOk: noErr(first),
    firstHalfTotal: first.length,
    lastHalfOk: noErr(last),
    lastHalfTotal: last.length,
    directions,
    fastest,
    slowest,
    jump,
    beat: beated.length ? { n: beated.length, on: beatOn, share: beatOn / beated.length } : null,
  };
}

/** Datensatz einer Runde für die Rundentabelle */
export function roundRecord(steps: readonly StepRec[], round: number, level: number, durationMs: number): RoundRec {
  const st = evalRound(steps);
  return { round, level, durationMs, hits: st.hits, errors: st.errors, meanMs: st.meanMs };
}

/** Punkte je richtigem Buchstaben: nur zur Motivation, nie als Hauptwert angezeigt */
export function pointsFor(level: number, rt: number | null): number {
  return 4 + (levelOf(level) - 1) + (rt === null ? 0 : Math.round(Math.max(0, 1 - rt / 2500) * 6));
}

/** Schlüssel in texts.tips: wrong | tired | jump | direction | great */
export function tipFor(s: Summary): string {
  if (s.total < 6) return 'great';
  if (s.errors >= 4 && s.errors >= 0.08 * s.taps) return 'wrong';
  if (Number.isFinite(s.firstHalfMs) && Number.isFinite(s.lastHalfMs) && s.lastHalfMs > s.firstHalfMs * 1.15) return 'tired';
  if (s.jump && Number.isFinite(s.jump.switchMs) && Number.isFinite(s.jump.withinMs) && s.jump.switchMs > s.jump.withinMs * 1.3 && s.jump.switchMs - s.jump.withinMs >= 80) return 'jump';
  const f = s.directions.find((d) => d.dir === s.fastest);
  const l = s.directions.find((d) => d.dir === s.slowest);
  if (f && l && l.meanMs > f.meanMs * 1.3) return 'direction';
  return 'great';
}
