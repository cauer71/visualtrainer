/**
 * Buchstabentafel – reine Logik (aus `ChartSession` und `layoutChart` im Labor-Prototyp, ex/chart.js).
 *
 * Zeiten in ms (virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken oberen Ecke des Spielfelds. Zufall nur
 * über `Rng` (kein Math.random). Keine Darstellung, kein Ton, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Die Tafel besteht aus `rows × cols` Gruppen mit je `groupSize` verschiedenen Zeichen (je Gruppe neu gemischt).
 *   Eine Marke führt Schritt für Schritt durch die Tafel: „Gruppe für Gruppe“ oder „erst alle ersten Zeichen, dann alle
 *   zweiten …“.
 * - Eigenes Tempo (`pace = self`): das erste Tippen startet, jedes weitere schließt den aktuellen Schritt ab; das letzte
 *   beendet die Tafel. Takt (`pace = beat`): die Marke springt im Takt (`bpm`) weiter, der erste Schlag kommt eine
 *   Taktlänge nach dem Start.
 * - `layoutChart` rechnet die Zeichenorte; passt die Tafel nicht ins Feld, wird sie verkleinert (nie ein Fehler).
 * - Kennzahlen: Gesamtzeit, Zeichen pro Minute; im eigenen Tempo Mittel, Streuung und Streuung/Mittel der Zeit je Zeichen;
 *   im Takt der eingestellte Takt.
 * Ergänzungen/Abweichungen gegenüber dem Prototyp: (0) Zeichenzellen sind 0,8 statt 0,75 Zeichenhöhen breit (breite Buchstaben stießen aneinander); Hinweis und Ergebniszeile zur Verkleinerung erst unter 90 %. (1) Im Takt zählt die Gesamtzeit vom ersten markierten Zeichen bis zum
 *   Ende des letzten (Prototyp: einschließlich der Taktlänge vor dem ersten Schlag); sie steht damit durch Zeichenzahl ×
 *   Taktlänge fest. (2) Im eigenen Tempo wird ein Tipp, der weniger als 340 ms nach dem vorigen kommt, ignoriert
 *   (Doppeltipp; zugleich höchstens ≈ 2,9 Markenwechsel pro Sekunde). (3) Streuung/Mittel gibt es erst ab zwei Zeitabständen
 *   (Prototyp: ab einem, dann mit Streuung null).
 * Grenze: Gelesen wird nur über das Tippen bzw. den Takt „geprüft“ – ob ein Zeichen wirklich gelesen wurde, kann die App
 *   nicht wissen; das steht ehrlich im Text.
 * Sicherheit: höchstens 140 Schläge pro Minute (≈ 2,3 Markenwechsel pro Sekunde); die Darstellung blendet die Marke weich
 *   um (≥ 100 ms) und blinkt nicht.
 */
import { mean, sd } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp, dazu „Ton“); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'rows', type: 'number', unit: 'count', min: 1, max: 8, step: 1, default: 4 },
  { key: 'cols', type: 'number', unit: 'count', min: 1, max: 8, step: 1, default: 4 },
  { key: 'groupSize', type: 'number', unit: 'count', min: 1, max: 6, step: 1, default: 3, summary: true },
  { key: 'symbols', type: 'select', default: 'letters', options: ['letters', 'digits'] },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 0.8, max: 8, step: 0.2, default: 2, summary: true },
  { key: 'letterGapCm', type: 'number', unit: 'cm', min: 0, max: 3, step: 0.1, default: 0.4 },
  { key: 'groupGapCm', type: 'number', unit: 'cm', min: 0.5, max: 10, step: 0.5, default: 3 },
  { key: 'order', type: 'select', default: 'groups', options: ['groups', 'letterwise'] },
  { key: 'pace', type: 'select', default: 'self', options: ['self', 'beat'], summary: true },
  { key: 'bpm', type: 'number', unit: 'bpm', min: 20, max: 140, step: 2, default: 60 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel (Ergänzung zum Prototyp, der nur piepte)
  { key: 'sound', type: 'select', default: 'yes', options: ['yes', 'no'], neutral: true },
];

export type SymbolKind = 'letters' | 'digits';
export type Order = 'groups' | 'letterwise';
export type Pace = 'self' | 'beat';

export interface ChartParams {
  rows: number;
  cols: number;
  groupSize: number;
  symbols: SymbolKind;
  sizeCm: number;
  letterGapCm: number;
  groupGapCm: number;
  order: Order;
  pace: Pace;
  bpm: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function chartParams(p: ExerciseParams): ChartParams {
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
    groupSize: Math.round(num('groupSize')),
    symbols: sel<SymbolKind>('symbols', ['letters', 'digits'], 'letters'),
    sizeCm: num('sizeCm'),
    letterGapCm: num('letterGapCm'),
    groupGapCm: num('groupGapCm'),
    order: sel<Order>('order', ['groups', 'letterwise'], 'groups'),
    pace: sel<Pace>('pace', ['self', 'beat'], 'self'),
    bpm: num('bpm'),
    sound: sel('sound', ['yes', 'no'], 'yes'),
  };
}

const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');
const DIGITS = '123456789'.split('');
/**
 * Breite einer Zeichenzelle im Verhältnis zur Zeichenhöhe. Der Prototyp rechnete mit 0,75; breite fette Buchstaben (M, N, W)
 * sind aber fast so breit wie hoch und stießen dann aneinander, darum hier 0,8 (Abstand zwischen den Zeichen kommt dazu).
 */
export const ADVANCE = 0.8;
/** Tafel höchstens so groß wie dieser Anteil des Feldes (Rest: Rand und Hinweiszeile) */
const FIT_W = 0.92;
const FIT_H = 0.88;
/** Ab dieser Verkleinerung (kleiner als 90 %) gibt es Hinweis und Zeile im Ergebnis; darüber ist es nicht erwähnenswert */
export const NOTICE_SCALE = 0.9;

/** Im eigenen Tempo: Tipps im kürzeren Abstand werden ignoriert (Doppeltipp, höchstens ≈ 2,9 Wechsel pro Sekunde) */
export const MIN_STEP_MS = 340;
/** Schnellmodus (?quick=1): Tafel höchstens so groß (Zeilen, Spalten, Zeichen je Gruppe) */
export const QUICK_ROWS = 2;
export const QUICK_COLS = 2;
export const QUICK_GROUP_SIZE = 2;
/** Höchster Takt (Schläge/min); Wechsel pro Sekunde = bpm / 60 */
export const MAX_BPM = 140;
export const MAX_CHANGES_PER_S = 2.5;

/** Zeit zwischen zwei Schlägen in ms */
export function beatIntervalMs(bpm: number): number {
  return 60000 / bpm;
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

export interface LetterPos {
  /** Nummer der Gruppe (zeilenweise) und Position darin */
  g: number;
  k: number;
  /** Mitte des Zeichens in cm */
  x: number;
  y: number;
}

export interface ChartLayout {
  letters: LetterPos[];
  /** Verkleinerungsfaktor (1 = wie eingestellt) */
  scale: number;
  /** `true`, wenn die Tafel ohne Verkleinerung passt */
  fits: boolean;
  /** `true`, wenn die Verkleinerung erwähnenswert ist (unter `NOTICE_SCALE`) */
  noticeable: boolean;
  /** unverkleinerte Maße der Tafel in cm */
  totalW: number;
  totalH: number;
}

/** Reine Berechnung der Zeichenpositionen (cm). Verkleinert automatisch, wenn die Tafel nicht ins Feld passt. */
export function layoutChart(p: Pick<ChartParams, 'rows' | 'cols' | 'groupSize' | 'sizeCm' | 'letterGapCm' | 'groupGapCm'>, W: number, H: number): ChartLayout {
  const adv = p.sizeCm * ADVANCE;
  const gw = p.groupSize * adv + (p.groupSize - 1) * p.letterGapCm;
  const totalW = p.cols * gw + (p.cols - 1) * p.groupGapCm;
  const totalH = p.rows * p.sizeCm + (p.rows - 1) * p.groupGapCm;
  const scale = Math.max(0.01, Math.min(1, (W * FIT_W) / totalW, (H * FIT_H) / totalH));
  const x0 = (W - totalW * scale) / 2;
  const y0 = (H - totalH * scale) / 2;
  const letters: LetterPos[] = [];
  for (let r = 0; r < p.rows; r++) {
    for (let c = 0; c < p.cols; c++) {
      const g = r * p.cols + c;
      for (let k = 0; k < p.groupSize; k++) {
        letters.push({
          g,
          k,
          x: x0 + (c * (gw + p.groupGapCm) + k * (adv + p.letterGapCm) + adv / 2) * scale,
          y: y0 + (r * (p.sizeCm + p.groupGapCm) + p.sizeCm / 2) * scale,
        });
      }
    }
  }
  return { letters, scale, fits: scale >= 1 - 1e-9, noticeable: scale < NOTICE_SCALE, totalW, totalH };
}

export interface Step {
  g: number;
  k: number;
}

export type AdvanceResult = { type: 'started' } | { type: 'step' } | { type: 'finished' } | { type: 'ignored' } | null;

export interface ChartSummary {
  symbols: number;
  /** Gesamtzeit in s, auf 0,1 s gerundet (null, wenn nicht beendet) */
  totalS: number | null;
  /** Gesamtzeit in ms, ganzzahlig (null, wenn nicht beendet) */
  totalMs: number | null;
  perMin: number | null;
  self: boolean;
  /** nur im eigenen Tempo (null bei weniger als zwei Zeitabständen bzw. im Takt) */
  stepMean: number | null;
  stepSd: number | null;
  stepCv: number | null;
  /** nur im Takt */
  bpm: number | null;
  trials: Array<{ nr: number; group: number; position: number; symbol: string; msOnSymbol: number | null }>;
}

/** Reine Logik der Tafel. */
export class ChartSession {
  readonly p: ChartParams;
  readonly groups: string[][] = [];
  readonly steps: Step[] = [];
  /** −1 = noch nicht gestartet; sonst Nummer des markierten Schritts (= Zahl der Schritte: fertig) */
  pos = -1;
  /** Zeitpunkt, an dem Schritt i begann (stamps[n] = Ende des letzten) */
  stamps: number[] = [];
  readonly interval: number;
  nextBeatAt: number | null = null;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;

  constructor(p: ChartParams, env: { rng: Rng }) {
    this.p = p;
    const pool = p.symbols === 'digits' ? DIGITS : LETTERS;
    const size = Math.min(p.groupSize, pool.length);
    const groups = p.rows * p.cols;
    for (let g = 0; g < groups; g++) this.groups.push(env.rng.shuffle([...pool]).slice(0, size));
    if (p.order === 'letterwise') {
      for (let k = 0; k < size; k++) for (let g = 0; g < groups; g++) this.steps.push({ g, k });
    } else {
      for (let g = 0; g < groups; g++) for (let k = 0; k < size; k++) this.steps.push({ g, k });
    }
    this.interval = beatIntervalMs(p.bpm);
  }

  symbolAt(step: Step): string {
    return this.groups[step.g][step.k];
  }

  /** Der markierte Schritt (null vor dem Start und nach dem Ende) */
  current(): Step | null {
    return this.pos >= 0 && this.pos < this.steps.length ? this.steps[this.pos] : null;
  }

  /** Takt: erster Schlag nach einer Taktlänge; im eigenen Tempo ohne Wirkung (das erste Tippen startet) */
  start(now: number): void {
    if (this.p.pace === 'beat') this.nextBeatAt = now + this.interval;
  }

  /** Eigenes Tempo: erstes Tippen startet, jedes weitere schließt den aktuellen Schritt ab. */
  advance(now: number): AdvanceResult {
    if (this.finished || this.p.pace !== 'self') return null;
    if (this.pos === -1) {
      this.startedAt = now;
      this.pos = 0;
      this.stamps.push(now);
      return { type: 'started' };
    }
    const last = this.stamps[this.stamps.length - 1];
    if (now - last < MIN_STEP_MS) return { type: 'ignored' };
    this.pos++;
    this.stamps.push(now);
    if (this.pos >= this.steps.length) {
      this.finished = true;
      this.endedAt = now;
      return { type: 'finished' };
    }
    return { type: 'step' };
  }

  /** Takt: liefert true, wenn in diesem Aufruf ein Schlag ausgelöst wurde. */
  update(now: number): boolean {
    if (this.p.pace !== 'beat' || this.finished || this.nextBeatAt === null) return false;
    let fired = false;
    while (now >= this.nextBeatAt && !this.finished) {
      this.pos++;
      this.stamps.push(this.nextBeatAt);
      if (this.pos === 0) this.startedAt = this.nextBeatAt;
      fired = true;
      if (this.pos >= this.steps.length) {
        this.finished = true;
        this.endedAt = this.nextBeatAt;
        break;
      }
      this.nextBeatAt += this.interval;
    }
    return fired;
  }

  /** Zahl der abgeschlossenen Zeichen (für die Anzeige) */
  doneCount(): number {
    return Math.max(0, Math.min(this.pos, this.steps.length));
  }

  progress(): number {
    return this.steps.length ? this.doneCount() / this.steps.length : 1;
  }

  summary(): ChartSummary {
    const n = this.steps.length;
    const total = this.endedAt !== null && this.startedAt !== null ? (this.endedAt - this.startedAt) / 1000 : null;
    const self = this.p.pace === 'self';
    const gaps: number[] = [];
    for (let i = 1; i < this.stamps.length; i++) gaps.push(this.stamps[i] - this.stamps[i - 1]);
    let stepMean: number | null = null;
    let stepSd: number | null = null;
    let stepCv: number | null = null;
    if (self && gaps.length >= 2) {
      const m = mean(gaps);
      const s = sd(gaps);
      stepMean = round(m, 0);
      stepSd = round(s, 0);
      stepCv = m > 0 ? round((100 * s) / m, 1) : null;
    } else if (self && gaps.length === 1) {
      stepMean = round(gaps[0], 0);
    }
    return {
      symbols: n,
      totalS: round(total, 1),
      totalMs: total !== null ? Math.round(total * 1000) : null,
      perMin: total && total > 0 ? round(n / (total / 60), 1) : null,
      self,
      stepMean,
      stepSd,
      stepCv,
      bpm: self ? null : this.p.bpm,
      trials: this.steps.map((s, i) => ({
        nr: i + 1,
        group: s.g + 1,
        position: s.k + 1,
        symbol: this.symbolAt(s),
        msOnSymbol: this.stamps[i + 1] !== undefined && this.stamps[i] !== undefined ? Math.round(this.stamps[i + 1] - this.stamps[i]) : null,
      })),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * im Takt → Hinweis zum Takt; im eigenen Tempo: sehr kurze Zeiten → Erinnerung, jedes Zeichen zu lesen; stark
 * schwankende Zeiten → gleichmäßiger werden.
 */
export function tipFor(s: ChartSummary): string {
  if (!s.self) return 'beat';
  if (s.stepMean !== null && s.stepMean < 400) return 'quick';
  if (s.stepCv !== null && s.stepCv > 40) return 'uneven';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 5 je gelesenem Zeichen */
export function pointsFor(symbols: number): number {
  return Math.max(0, Math.round(symbols)) * 5;
}
