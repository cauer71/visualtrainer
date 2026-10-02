/**
 * Takt-Sakkaden – reine Logik (aus `BeatSession` im Labor-Prototyp, ex/saccade.js).
 *
 * Zeiten in ms (virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken oberen Ecke des Spielfelds. Zufall nur
 * über `Rng` (kein Math.random). Keine Darstellung, kein Ton, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Im Takt (`bpm`) erscheint ein Zeichen an einem Punkt des gewählten Musters; der erste Schlag kommt eine Taktlänge nach
 *   dem Start (Vorlauf). Die Zahl der Schläge ist festgelegt: Dauer × Takt ÷ 60 (abgerundet). Ein verspäteter Aufruf
 *   holt verpasste Schläge nach (Schläge liegen exakt im Takt, nicht am Bildtakt).
 * - Reihenfolge „der Reihe nach“ umkreist die Punkte; „zufällig“ nie zweimal denselben Punkt und nie zweimal dasselbe
 *   Zeichen hintereinander.
 * - Berührungsmodus (`touch = yes`): ein Tipp trifft das gerade gezeigte Zeichen, wenn er innerhalb von Zeichenradius +
 *   0,5 cm liegt (mindestens 24 px, Touch-Ziel); Verzögerung = Tipp-Zeit − Schlagzeit. Jedes Zeichen zählt höchstens
 *   einmal; Tipps daneben oder ein zweiter Tipp auf dasselbe Zeichen sind Fehltipps. Nicht berührte Zeichen gelten als
 *   verpasst (Streuung/Mittel der Verzögerung nur aus Treffern).
 * Ergänzungen gegenüber dem Prototyp: (1) Zeichengröße und Punkte werden auf kleinen Bühnen so begrenzt, dass die Zeichen
 *   einander nicht überlappen (`fitSizeCm`); `setField` passt das Feld an (Tablet gedreht). (2) Ein zweiter Tipp
 *   unmittelbar nach einem Treffer (< 250 ms, „Doppeltipp“) wird ignoriert und zählt nicht als Fehltipp. (3) Die
 *   Verzögerung ist nie negativ (Ereigniszeit und Bildzeit liegen bis zu einem Frame auseinander).
 * Grenze: Die Schläge sind im Takt geplant, erscheinen aber im nächsten Bild (bis ≈ 17 ms später bei 60 Hz); der Ton kommt im
 *   selben Bild. Mehr Genauigkeit kann ein Browser ohne Audio-Planung nicht liefern – das steht ehrlich im Text.
 * Sicherheit: höchstens 140 Schläge pro Minute (≈ 2,3 Zeichenwechsel pro Sekunde, unter 2,5 Hz); die Darstellung blendet
 *   jedes Zeichen weich ein und aus (≥ 100 ms) und blinkt nicht im Takt.
 */
import { mean, sd } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'bpm', type: 'number', unit: 'bpm', min: 20, max: 140, step: 2, default: 60, summary: true },
  { key: 'durationS', type: 'number', unit: 's', min: 10, max: 300, step: 5, default: 60 },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 1, max: 12, step: 0.5, default: 3 },
  { key: 'pattern', type: 'select', default: 'corners4', options: ['corners4', 'corners5', 'horizontal', 'vertical', 'grid9'], summary: true },
  { key: 'order', type: 'select', default: 'cycle', options: ['cycle', 'random'] },
  { key: 'symbols', type: 'select', default: 'digits', options: ['digits', 'letters', 'syllables'] },
  { key: 'touch', type: 'select', default: 'no', options: ['no', 'yes'], summary: true },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'yes', options: ['yes', 'no'], neutral: true },
];

export type Pattern = 'corners4' | 'corners5' | 'horizontal' | 'vertical' | 'grid9';
export type Order = 'cycle' | 'random';
export type SymbolKind = 'digits' | 'letters' | 'syllables';

export interface BeatParams {
  bpm: number;
  durationS: number;
  sizeCm: number;
  pattern: Pattern;
  order: Order;
  symbols: SymbolKind;
  touch: 'yes' | 'no';
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function beatParams(p: ExerciseParams): BeatParams {
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
    bpm: num('bpm'),
    durationS: num('durationS'),
    sizeCm: num('sizeCm'),
    pattern: sel<Pattern>('pattern', ['corners4', 'corners5', 'horizontal', 'vertical', 'grid9'], 'corners4'),
    order: sel<Order>('order', ['cycle', 'random'], 'cycle'),
    symbols: sel<SymbolKind>('symbols', ['digits', 'letters', 'syllables'], 'digits'),
    touch: sel('touch', ['no', 'yes'], 'no'),
    sound: sel('sound', ['yes', 'no'], 'yes'),
  };
}

/** Toleranz für die ungenaue Fingerberührung (cm), zusätzlich zum Zeichenradius */
export const SLACK_CM = 0.5;
/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Zweiter Tipp auf dasselbe Zeichen so kurz nach einem Treffer: ignoriert */
export const DOUBLE_TAP_MS = 250;
/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;
/** Höchster Takt (Schläge/min) laut PARAMS; Zeichenwechsel pro Sekunde = bpm / 60 */
export const MAX_BPM = 140;
/** Obergrenze der Zeichenwechsel pro Sekunde (strenger als „höchstens 3“) */
export const MAX_CHANGES_PER_S = 2.5;
/** Mindestabstand der Zeichen im Muster als Vielfaches der Zeichengröße (Mitte zu Mitte) */
export const MIN_SPACING = 1.5;

const LETTERS = 'ABDEFGHKLMNPRSTUVZ'.split('');
const CONSONANTS = 'BDFGKLMNPRSTVZ'.split('');
const VOWELS = 'AEIOU'.split('');

const PATTERNS: Record<Pattern, ReadonlyArray<readonly [number, number]>> = {
  corners4: [[0, 0], [1, 0], [1, 1], [0, 1]],
  corners5: [[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]],
  horizontal: [[0, 0.5], [1, 0.5]],
  vertical: [[0.5, 0], [0.5, 1]],
  grid9: [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [0.5, 0.5], [0, 0.5], [0, 1], [0.5, 1], [1, 1]],
};

/** Zahl der Abstände nebeneinander (waagerecht, senkrecht), die ein Muster füllen muss */
const GAPS: Record<Pattern, readonly [number, number]> = {
  corners4: [1, 1],
  corners5: [1, 1],
  horizontal: [1, 0],
  vertical: [0, 1],
  grid9: [2, 2],
};

/** Zeit zwischen zwei Schlägen in ms */
export function beatIntervalMs(bpm: number): number {
  return 60000 / bpm;
}

/** Zahl der Schläge einer Sitzung: Dauer × Takt ÷ 60, abgerundet */
export function totalBeatsFor(durationS: number, bpm: number): number {
  return Math.floor((durationS * bpm) / 60);
}

/** Zeichenwechsel pro Sekunde bei diesem Takt */
export function changesPerSecond(bpm: number): number {
  return bpm / 60;
}

const dist = (x1: number, y1: number, x2: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2);

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/**
 * Größte Zeichengröße (cm), bei der die Zeichen des Musters im Feld einander nicht überlappen (Abstand Mitte zu Mitte
 * ≥ `MIN_SPACING` × Größe). Größer gewünschte Zeichen werden verkleinert, nie ein Fehler; nie unter 0,3 cm.
 */
export function fitSizeCm(pattern: Pattern, W: number, H: number, sizeCm: number): number {
  const [gx, gy] = GAPS[pattern];
  // Abstand zweier Nachbarn: (Feld − Größe − 1 cm Rand) / Zahl der Abstände ≥ MIN_SPACING × Größe
  const limit = (len: number, gaps: number): number => (gaps > 0 ? (len - 1) / (1 + MIN_SPACING * gaps) : Number.POSITIVE_INFINITY);
  const max = Math.min(limit(W, gx), limit(H, gy));
  return Math.max(0.3, Math.min(sizeCm, max));
}

/** Zufälliges Zeichen der Art `kind` */
export function randomSymbol(kind: SymbolKind, rng: Rng): string {
  if (kind === 'letters') return rng.pick(LETTERS);
  if (kind === 'syllables') return rng.pick(CONSONANTS) + rng.pick(VOWELS);
  return String(1 + rng.int(9));
}

export interface BeatEnv {
  rng: Rng;
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinster Trefferradius in cm (z. B. 24 px ÷ px/cm); Standard 0 */
  minHitRadiusCm?: number;
  /** Umrechnung cm → Sehwinkel (Grad) für `amp_deg`; ohne sie entfällt der Wert */
  cmToDeg?: (cm: number) => number;
}

export interface Pt {
  x: number;
  y: number;
}

export interface BeatEvent {
  index: number;
  /** Nummer des Punktes im Muster */
  point: number;
  x: number;
  y: number;
  symbol: string;
  /** geplante Schlagzeit in ms */
  at: number;
}

interface Current extends BeatEvent {
  touchedAt: number | null;
}

export interface BeatTrial {
  beat: number;
  symbol: string;
  xCm: number;
  yCm: number;
  touched: boolean;
  /** Verzögerung nach dem Schlag in ms (nur berührte) */
  latencyMs: number | null;
}

export type TapResult =
  | { type: 'hit'; latency: number; event: BeatEvent }
  | { type: 'stray' }
  /** Doppeltipp auf das gerade getroffene Zeichen: ohne Wirkung */
  | { type: 'ignored' }
  | null;

export interface BeatSummary {
  beats: number;
  bpm: number;
  /** Zahl der Punkte im Muster */
  positions: number;
  ampCm: number;
  ampDeg: number | null;
  touch: boolean;
  hits: number;
  misses: number;
  stray: number;
  /** Anteil berührter Zeichen in % (nur Berührungsmodus; null ohne Schläge) */
  accuracy: number | null;
  latMean: number | null;
  /** Streuung der Verzögerung; null bei weniger als 2 Treffern */
  latSd: number | null;
  trials: BeatTrial[];
}

/** Reine Taktlogik. */
export class BeatSession {
  readonly p: BeatParams;
  /** Zeichengröße in cm nach Begrenzung auf das Feld (siehe `fitSizeCm`) */
  size: number;
  points: Pt[] = [];
  fieldW: number;
  fieldH: number;
  readonly interval: number;
  readonly totalBeats: number;
  startedAt: number | null = null;
  /** Zeit des ersten Schlags */
  nextBeatAt: number | null = null;
  beatIndex = 0;
  current: Current | null = null;
  trials: BeatTrial[] = [];
  strayTaps = 0;
  finished = false;
  /** Gewünschte Zeichengröße in cm; `size` ist die auf das Feld begrenzte */
  private requested: number;
  private prevPoint = -1;
  private prevSymbol: string | null = null;
  private lastHit: { x: number; y: number; t: number } | null = null;
  private readonly rng: Rng;
  private readonly minHit: number;
  private readonly cmToDeg: ((cm: number) => number) | null;

  constructor(p: BeatParams, env: BeatEnv) {
    this.p = p;
    this.rng = env.rng;
    this.interval = beatIntervalMs(p.bpm);
    this.totalBeats = totalBeatsFor(p.durationS, p.bpm);
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.minHit = env.minHitRadiusCm ?? 0;
    this.cmToDeg = env.cmToDeg ?? null;
    this.requested = p.sizeCm;
    this.size = p.sizeCm;
    this.layout();
  }

  /** Punkte neu berechnen (Größe begrenzen, Rand = halbe Größe + 0,5 cm) */
  private layout(): void {
    const W = this.fieldW;
    const H = this.fieldH;
    this.size = fitSizeCm(this.p.pattern, W, H, this.requested);
    const margin = this.size / 2 + 0.5;
    this.points = PATTERNS[this.p.pattern].map((f) => ({
      x: margin + f[0] * Math.max(0, W - 2 * margin),
      y: margin + f[1] * Math.max(0, H - 2 * margin),
    }));
  }

  /** Trefferradius in cm: Zeichenradius + Toleranz, mindestens der kleinste Radius für Touch-Ziele */
  get hitRadius(): number {
    return Math.max(this.size / 2 + SLACK_CM, this.minHit);
  }

  start(now: number): void {
    this.startedAt = now;
    this.nextBeatAt = now + this.interval; // erster Schlag nach einer Taktlänge (Vorlauf)
  }

  isOver(now: number): boolean {
    return this.finished || (this.startedAt !== null && this.nextBeatAt !== null && this.beatIndex >= this.totalBeats && now >= this.nextBeatAt);
  }

  /** Noch ausstehende Schläge (für die Anzeige) */
  remainingBeats(): number {
    return Math.max(0, this.totalBeats - this.beatIndex);
  }

  /** Anteil der Schläge, die schon erschienen sind (0..1) */
  progress(): number {
    return this.totalBeats > 0 ? Math.min(1, this.beatIndex / this.totalBeats) : 1;
  }

  /**
   * Feld hat sich geändert (Tablet gedreht): Punkte und Zeichengröße neu berechnen, das gezeigte Zeichen bleibt am selben
   * Punkt des Musters.
   */
  setField(wCm: number, hCm: number, sizeCm?: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    if (sizeCm !== undefined && sizeCm > 0) this.requested = sizeCm;
    this.layout();
    if (this.current) {
      const pt = this.points[this.current.point];
      if (pt) {
        this.current.x = pt.x;
        this.current.y = pt.y;
      }
    }
  }

  private pickPoint(): number {
    const n = this.points.length;
    if (this.p.order === 'cycle') return this.beatIndex % n;
    let i: number;
    do {
      i = this.rng.int(n);
    } while (n > 1 && i === this.prevPoint);
    return i;
  }

  private pickSymbol(): string {
    let s: string;
    do {
      s = randomSymbol(this.p.symbols, this.rng);
    } while (s === this.prevSymbol);
    return s;
  }

  private closeCurrent(): void {
    const c = this.current;
    if (!c) return;
    this.trials.push({
      beat: c.index + 1,
      symbol: c.symbol,
      xCm: round(c.x, 2) ?? 0,
      yCm: round(c.y, 2) ?? 0,
      touched: c.touchedAt !== null,
      latencyMs: c.touchedAt !== null ? Math.round(Math.max(0, c.touchedAt - c.at)) : null,
    });
    this.current = null;
  }

  /** Liefert die in diesem Aufruf ausgelösten Schläge (meist 0 oder 1). */
  update(now: number): BeatEvent[] {
    const events: BeatEvent[] = [];
    if (this.startedAt === null || this.nextBeatAt === null || this.finished) return events;
    while (this.beatIndex < this.totalBeats && now >= this.nextBeatAt) {
      this.closeCurrent();
      const pi = this.pickPoint();
      const pt = this.points[pi];
      const symbol = this.pickSymbol();
      const at = this.nextBeatAt;
      this.current = { index: this.beatIndex, point: pi, at, x: pt.x, y: pt.y, symbol, touchedAt: null };
      this.prevPoint = pi;
      this.prevSymbol = symbol;
      events.push({ index: this.beatIndex, point: pi, x: pt.x, y: pt.y, symbol, at });
      this.beatIndex++;
      this.nextBeatAt += this.interval;
    }
    if (this.beatIndex >= this.totalBeats && now >= this.nextBeatAt) {
      this.closeCurrent();
      this.finished = true;
    }
    return events;
  }

  /** Tipp bei (x, y) in cm zur Zeit `now`; null = ohne Berührungsmodus oder Sitzung läuft nicht */
  tap(x: number, y: number, now: number): TapResult {
    if (this.p.touch !== 'yes' || this.finished || !this.current) return null;
    const c = this.current;
    const hr = this.hitRadius;
    const lh = this.lastHit;
    if (lh && now - lh.t >= 0 && now - lh.t < DOUBLE_TAP_MS && dist(x, y, lh.x, lh.y) <= hr) return { type: 'ignored' };
    if (c.touchedAt === null && dist(x, y, c.x, c.y) <= hr) {
      c.touchedAt = now;
      this.lastHit = { x: c.x, y: c.y, t: now };
      return { type: 'hit', latency: Math.max(0, now - c.at), event: { index: c.index, point: c.point, x: c.x, y: c.y, symbol: c.symbol, at: c.at } };
    }
    this.strayTaps++;
    return { type: 'stray' };
  }

  /** Größte Entfernung zweier Punkte des Musters (cm) */
  maxAmplitudeCm(): number {
    let m = 0;
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) m = Math.max(m, dist(this.points[i].x, this.points[i].y, this.points[j].x, this.points[j].y));
    }
    return m;
  }

  summary(): BeatSummary {
    const amp = this.maxAmplitudeCm();
    const touch = this.p.touch === 'yes';
    const hitTrials = this.trials.filter((t) => t.touched);
    const lat = hitTrials.map((t) => t.latencyMs ?? 0);
    const shown = this.trials.length;
    return {
      beats: shown,
      bpm: this.p.bpm,
      positions: this.points.length,
      ampCm: round(amp, 1) ?? 0,
      ampDeg: this.cmToDeg ? round(this.cmToDeg(amp), 1) : null,
      touch,
      hits: touch ? hitTrials.length : 0,
      misses: touch ? shown - hitTrials.length : 0,
      stray: touch ? this.strayTaps : 0,
      accuracy: touch && shown ? round((100 * hitTrials.length) / shown, 1) : null,
      latMean: touch && lat.length ? round(mean(lat), 0) : null,
      latSd: touch && lat.length >= 2 ? round(sd(lat), 0) : null,
      trials: this.trials.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * ohne Berührung → laut lesen und Vergleichshinweis; mit Berührung: viele Fehltipps → erst genau, dann schnell; viele
 * verpasste → langsamer Takt; sehr sicher → nur eine Einstellung schwerer; stark schwankende Zeiten → ruhiger.
 */
export function tipFor(s: BeatSummary): string {
  if (!s.touch) return s.beats > 0 ? 'read' : 'compare';
  const taps = s.hits + s.stray;
  if (s.beats === 0 || s.hits === 0) return 'slower';
  if (s.stray >= 3 && s.stray >= 0.25 * taps) return 'stray';
  if (s.accuracy !== null && s.accuracy < 70 && s.beats >= 5) return 'slower';
  if (s.accuracy !== null && s.accuracy >= 90 && s.hits >= 10) return 'faster';
  if (s.latMean !== null && s.latSd !== null && s.hits >= 8 && s.latSd > 0.35 * s.latMean) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je Treffer (Berührung) bzw. 5 je gezeigtem Zeichen */
export function pointsFor(s: BeatSummary): number {
  return s.touch ? Math.max(0, s.hits) * 10 : Math.max(0, s.beats) * 5;
}
