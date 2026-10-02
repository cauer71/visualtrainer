/**
 * Zeichen finden – reine Logik (aus `FindSession` im Labor-Prototyp, ex/findchars.js).
 *
 * In einem Raster ähnlicher Zeichen müssen alle Exemplare des Zielzeichens angetippt werden. Zeiten in ms (virtuelle Zeit
 * des Runners), Zufall nur über `Rng`, keine Darstellung, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Eine Tafel hat Zeilen × Spalten Felder; Anteil `density` % davon (mindestens eins, nie alle) tragen das Zielzeichen, die
 *   übrigen ein anderes Zeichen desselben Vorrats. Antippen: richtig → gefunden; falsch → Fehltipp; bearbeitete Felder
 *   ignorieren. Alle gefunden → nächste Tafel; „Fertig“ → übrige Zielzeichen zählen als übersehen.
 *
 * Abweichungen vom Prototyp:
 * - Das Zielzeichen wechselt reihum durch den Vorrat (gemischter Beutel, nie zweimal hintereinander dasselbe), statt jedes Mal
 *   zufällig mit Zurücklegen: Die Ähnlichkeit der Zeichen ist nicht gleichmäßig (b/d ähneln sich mehr als b/q, O/Q mehr als O/F),
 *   so kommt jedes Zielzeichen etwa gleich oft vor und Läufe sind besser vergleichbar.
 * - Die Rastergröße passt sich der Bühne an (`fitGrid`): Zeichen mindestens ≈ 22 px groß (Feld ≥ 36 px); passt das Raster nicht,
 *   werden Zeilen/Spalten für diese Tafel verkleinert (Hochformat wird quer-hoch gedreht dargestellt, `bestCell`).
 * - Die Zeit einer Tafel läuft ab dem Anzeigen der Tafel (`beginBoard`), die Gesamtzeit ist die Summe der Tafelzeiten.
 */
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'set', type: 'select', default: 'pbdq', options: ['pbdq', 'digits', 'similar', 'mixed'], summary: true },
  { key: 'rows', type: 'number', unit: 'count', min: 2, max: 12, step: 1, default: 5, summary: true },
  { key: 'cols', type: 'number', unit: 'count', min: 2, max: 16, step: 1, default: 8, summary: true },
  { key: 'density', type: 'number', unit: 'percent', min: 5, max: 50, step: 5, default: 20 },
  { key: 'cellCm', type: 'number', unit: 'cm', min: 1, max: 6, step: 0.5, default: 2.5 },
  { key: 'rounds', type: 'number', unit: 'count', min: 1, max: 20, step: 1, default: 5 },
];

export type CharSet = 'pbdq' | 'digits' | 'similar' | 'mixed';

export const SETS: Record<CharSet, readonly string[]> = {
  pbdq: ['b', 'd', 'p', 'q'],
  digits: ['1', '7', '4', '9', '6', '2', '5', '3'],
  similar: ['O', 'Q', 'C', 'G', 'D', 'U', 'E', 'F'],
  mixed: ['b', 'd', 'p', 'q', '1', '7', '9', '6', 'O', 'Q', 'G', 'C'],
};

export interface FindParams {
  set: CharSet;
  rows: number;
  cols: number;
  density: number;
  cellCm: number;
  rounds: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function findParams(p: ExerciseParams): FindParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const s = p.set;
  const set: CharSet = s === 'digits' || s === 'similar' || s === 'mixed' || s === 'pbdq' ? s : 'pbdq';
  return {
    set,
    rows: Math.round(num('rows')),
    cols: Math.round(num('cols')),
    density: num('density'),
    cellCm: num('cellCm'),
    rounds: Math.round(num('rounds')),
  };
}

/** Kleinste Feldkante (px); Zeichengröße = Feld × `GLYPH_FACTOR` ≥ 22 px */
export const MIN_CELL_PX = 36;
export const GLYPH_FACTOR = 0.62;
export const MIN_GLYPH_PX = 22;
/** Höhe des „Fertig“-Knopfs (≥ 56 px) */
export const DONE_H = 60;
/** Schnellmodus (?quick=1) */
export const QUICK_ROUNDS = 2;
export const QUICK_ROWS = 3;
export const QUICK_COLS = 5;

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

export type CellState = 'open' | 'found' | 'wrong';

export interface BoardCell {
  ch: string;
  isTarget: boolean;
  state: CellState;
}

export interface Board {
  target: string;
  rows: number;
  cols: number;
  nTargets: number;
  foundCount: number;
  falseCount: number;
  /** Beginn der Tafel (ms) – null, bis sie angezeigt wird (`beginBoard`) */
  startedAt: number | null;
  cells: BoardCell[];
}

export interface BoardTrial {
  nr: number;
  target: string;
  targets: number;
  found: number;
  missed: number;
  falseTaps: number;
  ms: number;
  end: 'complete' | 'gave_up';
}

export type TapResult =
  | { type: 'found' }
  | { type: 'wrong' }
  | { type: 'next_board'; how: 'complete' | 'gave_up' }
  | { type: 'finished'; how: 'complete' | 'gave_up' }
  | null;

export interface FindSummary {
  found: number;
  missed: number;
  falseTaps: number;
  /** Gefundene geteilt durch (gefundene + übersehene + falsche) in %, null ohne Treffer-Möglichkeit */
  accuracy: number | null;
  /** Zeit pro gefundenem Zeichen in ms, null ohne gefundenes Zeichen */
  perTarget: number | null;
  /** Summe der Tafelzeiten in ms */
  totalMs: number | null;
  trials: BoardTrial[];
}

export interface FindEnv {
  rng: Rng;
  /** Raster dieser Tafel (nach Anpassung an die Bühne); Standard: die Einstellungen */
  grid?: () => { rows: number; cols: number };
}

/** Reine Spiellogik. */
export class FindSession {
  readonly p: FindParams;
  readonly pool: readonly string[];
  round = 0;
  found = 0;
  missed = 0;
  falseTaps = 0;
  trials: BoardTrial[] = [];
  finished = false;
  board: Board | null = null;
  /** zuletzt abgeschlossene Tafel (für die Rückmeldung nach dem Abschluss) */
  lastBoard: Board | null = null;
  private bag: string[] = [];
  private lastTarget = '';
  private readonly rng: Rng;
  private readonly gridOf: () => { rows: number; cols: number };

  constructor(p: FindParams, env: FindEnv) {
    this.p = p;
    this.rng = env.rng;
    this.pool = SETS[p.set];
    this.gridOf = env.grid ?? (() => ({ rows: p.rows, cols: p.cols }));
    this.newBoard();
  }

  /** Nächstes Zielzeichen: reihum aus einem gemischten Beutel, nie zweimal dasselbe hintereinander */
  nextTarget(): string {
    if (!this.bag.length) {
      this.bag = this.rng.shuffle([...this.pool]);
      if (this.bag.length > 1 && this.bag[this.bag.length - 1] === this.lastTarget) {
        // gezogen wird von hinten: das zuletzt benutzte Zeichen soll nicht gleich wieder kommen
        [this.bag[0], this.bag[this.bag.length - 1]] = [this.bag[this.bag.length - 1], this.bag[0]];
      }
    }
    const t = this.bag.pop()!;
    this.lastTarget = t;
    return t;
  }

  newBoard(): void {
    const { rows, cols } = this.gridOf();
    const cells = rows * cols;
    const nT = Math.max(1, Math.min(cells - 1, Math.round((cells * this.p.density) / 100)));
    const target = this.nextTarget();
    const idx = this.rng.shuffle(Array.from({ length: cells }, (_, i) => i));
    const targetIdx = new Set(idx.slice(0, nT));
    const others = this.pool.filter((c) => c !== target);
    this.board = {
      target,
      rows,
      cols,
      nTargets: nT,
      foundCount: 0,
      falseCount: 0,
      startedAt: null,
      cells: Array.from({ length: cells }, (_, i) => ({
        ch: targetIdx.has(i) ? target : this.rng.pick(others),
        isTarget: targetIdx.has(i),
        state: 'open' as CellState,
      })),
    };
  }

  /** Die Tafel ist sichtbar geworden: ab hier läuft ihre Zeit */
  beginBoard(now: number): void {
    if (this.board && this.board.startedAt === null) this.board.startedAt = now;
  }

  tap(cellIdx: number, now: number): TapResult {
    const b = this.board;
    if (this.finished || !b) return null;
    const c = b.cells[cellIdx];
    if (!c || c.state !== 'open') return null;
    if (c.isTarget) {
      c.state = 'found';
      b.foundCount++;
      this.found++;
      if (b.foundCount >= b.nTargets) return this.closeBoard(now, 'complete');
      return { type: 'found' };
    }
    c.state = 'wrong';
    b.falseCount++;
    this.falseTaps++;
    return { type: 'wrong' };
  }

  /** „Fertig“ gedrückt: übrige Zielzeichen zählen als übersehen */
  giveUp(now: number): TapResult {
    return this.finished || !this.board ? null : this.closeBoard(now, 'gave_up');
  }

  private closeBoard(now: number, how: 'complete' | 'gave_up'): TapResult {
    const b = this.board!;
    const missed = b.nTargets - b.foundCount;
    this.missed += missed;
    const from = b.startedAt ?? now;
    this.trials.push({
      nr: this.round + 1,
      target: b.target,
      targets: b.nTargets,
      found: b.foundCount,
      missed,
      falseTaps: b.falseCount,
      ms: Math.max(0, Math.round(now - from)),
      end: how,
    });
    this.lastBoard = b;
    this.round++;
    if (this.round >= this.p.rounds) {
      this.finished = true;
      this.board = null;
      return { type: 'finished', how };
    }
    this.newBoard();
    return { type: 'next_board', how };
  }

  summary(): FindSummary {
    const all = this.found + this.missed + this.falseTaps;
    const total = this.trials.reduce((s, t) => s + t.ms, 0);
    return {
      found: this.found,
      missed: this.missed,
      falseTaps: this.falseTaps,
      accuracy: all ? round((100 * this.found) / all, 1) : null,
      perTarget: this.found ? round(total / this.found, 0) : null,
      totalMs: this.trials.length ? total : null,
      trials: this.trials.slice(),
    };
  }
}

// ---------------------------------------------------------------------------
// Layout

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Größte Feldkante, die ein Raster mit `rows` × `cols` im Bereich hat, und ob es dafür gedreht (Zeilen als Spalten) dargestellt wird */
export function bestCellRaw(box: Box, rows: number, cols: number): { cell: number; transposed: boolean } {
  const normal = Math.min(box.w / cols, box.h / rows);
  const turned = Math.min(box.w / rows, box.h / cols);
  return turned > normal + 1e-9 ? { cell: turned, transposed: true } : { cell: normal, transposed: false };
}

/**
 * Raster, das in den Bereich passt: Reicht die Platz nicht für Felder ≥ `MIN_CELL_PX`, werden Zeilen oder Spalten (die größere
 * Zahl zuerst) verkleinert, nie unter 2. Rückgabe: Zeilen, Spalten und ob sie gegenüber den Einstellungen verkleinert wurden.
 */
export function fitGrid(box: Box, rows: number, cols: number): { rows: number; cols: number; reduced: boolean } {
  let r = rows;
  let c = cols;
  while (bestCellRaw(box, r, c).cell < MIN_CELL_PX && (r > 2 || c > 2)) {
    if (c >= r && c > 2) c--;
    else if (r > 2) r--;
    else c--;
  }
  return { rows: r, cols: c, reduced: r !== rows || c !== cols };
}

export interface FindLayout {
  /** Feldkante in px */
  cell: number;
  transposed: boolean;
  /** dargestellte Zeilen/Spalten (bei `transposed` vertauscht) */
  dispRows: number;
  dispCols: number;
  x0: number;
  y0: number;
  /** logische Zeilen/Spalten der Tafel */
  rows: number;
  cols: number;
}

/**
 * Raster im Bereich: Feldkante = gewünschte (cm → px, bereits auf die Bühne begrenzt), höchstens die größte passende, mindestens
 * `MIN_CELL_PX`, falls dort Platz ist.
 */
export function layoutFind(box: Box, rows: number, cols: number, wantedCell: number): FindLayout {
  const best = bestCellRaw(box, rows, cols);
  const cell = Math.max(Math.min(wantedCell, best.cell), Math.min(best.cell, MIN_CELL_PX));
  const dispRows = best.transposed ? cols : rows;
  const dispCols = best.transposed ? rows : cols;
  return {
    cell,
    transposed: best.transposed,
    dispRows,
    dispCols,
    x0: box.x + (box.w - cell * dispCols) / 2,
    y0: box.y + (box.h - cell * dispRows) / 2,
    rows,
    cols,
  };
}

/** Linke obere Ecke des Feldes mit logischem Index `i` */
export function findCellXY(L: FindLayout, i: number): { x: number; y: number } {
  const r = Math.floor(i / L.cols);
  const c = i % L.cols;
  return L.transposed ? { x: L.x0 + r * L.cell, y: L.y0 + c * L.cell } : { x: L.x0 + c * L.cell, y: L.y0 + r * L.cell };
}

/** Logischer Index des Feldes unter dem Punkt, −1 außerhalb des Rasters */
export function findCellAt(L: FindLayout, px: number, py: number): number {
  const dx = Math.floor((px - L.x0) / L.cell);
  const dy = Math.floor((py - L.y0) / L.cell);
  if (dx < 0 || dy < 0 || dx >= L.dispCols || dy >= L.dispRows) return -1;
  const r = L.transposed ? dx : dy;
  const c = L.transposed ? dy : dx;
  return r * L.cols + c;
}

/** Punkte (nur zur Motivation) */
export function pointsFor(found: number, falseTaps: number): number {
  return Math.max(0, found * 10 - falseTaps * 5);
}

/** Schlüssel in texts.tips: ein persönlicher Tipp nach dem Lauf */
export function tipFor(sum: FindSummary): string {
  if (sum.falseTaps >= Math.max(3, sum.found * 0.15)) return 'false';
  if (sum.missed >= Math.max(2, (sum.found + sum.missed) * 0.15)) return 'missed';
  if (sum.accuracy !== null && sum.accuracy >= 95) return 'harder';
  if (sum.perTarget !== null && sum.perTarget > 4000) return 'slow';
  return 'compare';
}
