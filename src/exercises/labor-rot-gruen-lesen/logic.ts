/**
 * Rot-Grün-Lesen (Labor) – reine Logik: Zeichenfolgen, deren Zeichen in zwei Farben stehen (Rot und Grün bzw. Cyan),
 * Auswertung nach Farbe und nach Auge. Zeiten in ms (virtuelle Zeit des Runners), Zufall nur über `Rng`, keine Darstellung.
 *
 * Funktionsprinzip (klassische dichoptische Aufgabe mit Rot-Grün-Brille): Auf schwarzem Grund steht eine Folge aus Ziffern
 * oder Buchstaben. Ein Teil der Zeichen ist rot, der andere grün (oder cyan). Das Glas vor dem einen Auge lässt nur Rot
 * durch, das vor dem anderen nur Grün (Cyan): Jedes Auge sieht also nur die Zeichen „seiner“ Farbe hell. Wer beide Augen
 * zusammen nutzt, kann die ganze Folge lesen. Ein weißer Rahmen und ein kleines weißes Kreuz werden von beiden Augen
 * gesehen und halten die beiden Bilder zusammen.
 *
 * Ablauf eines Durchgangs: Rahmen und Kreuz allein (`LEAD_MS`) → Folge sichtbar (bei begrenzter Dauer erst `show`, dann
 * ausgeblendet) → Eingabe mit Bildschirmtasten (auch „?“ für „nicht gesehen“) und „Fertig“ → kurze, ruhige Rückmeldung.
 *
 * Die Auswertung zählt nur, welche Zeichen und welche Farbe fehlten oder verwechselt wurden. Sie sagt nie, welches Auge
 * „schwächer“ ist; das ist kein Befund (auch Brille, Bildschirmfarben und Helligkeit spielen eine Rolle).
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Texte in texts.ts) */
export const PARAMS: readonly ParamDef[] = [
  { key: 'symbols', type: 'select', default: 'digits', options: ['digits', 'letters', 'mixed'] },
  { key: 'length', type: 'number', unit: 'count', min: 4, max: 12, step: 1, default: 6, summary: true },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 0.6, max: 4, step: 0.1, default: 1.2, summary: true },
  { key: 'mix', type: 'select', default: 'alternate', options: ['alternate', 'random'] },
  { key: 'leftLens', type: 'select', default: 'red', options: ['red', 'green'] },
  { key: 'showFor', type: 'select', default: 'unlimited', options: ['unlimited', '8', '4', '2'], summary: true },
  { key: 'trials', type: 'number', unit: 'count', min: 6, max: 20, step: 1, default: 10 },
  { key: 'tones', type: 'select', default: 'redgreen', options: ['redgreen', 'redcyan'] },
  { key: 'brightness', type: 'number', unit: 'percent', min: 80, max: 100, step: 5, default: 100 },
];

export type Symbols = 'digits' | 'letters' | 'mixed';
export type Mix = 'alternate' | 'random';
export type Lens = 'red' | 'green';
export type ShowFor = 'unlimited' | '8' | '4' | '2';
export type Tones = 'redgreen' | 'redcyan';

export interface RgParams {
  symbols: Symbols;
  length: number;
  sizeCm: number;
  mix: Mix;
  leftLens: Lens;
  showFor: ShowFor;
  trials: number;
  tones: Tones;
  brightness: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function rgParams(p: ExerciseParams): RgParams {
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
    symbols: sel<Symbols>('symbols', ['digits', 'letters', 'mixed'], 'digits'),
    length: Math.round(num('length')),
    sizeCm: num('sizeCm'),
    mix: sel<Mix>('mix', ['alternate', 'random'], 'alternate'),
    leftLens: sel<Lens>('leftLens', ['red', 'green'], 'red'),
    showFor: sel<ShowFor>('showFor', ['unlimited', '8', '4', '2'], 'unlimited'),
    trials: Math.round(num('trials')),
    tones: sel<Tones>('tones', ['redgreen', 'redcyan'], 'redgreen'),
    brightness: num('brightness'),
  };
}

/** Anzeigedauer in ms; `null` = unbegrenzt */
export function showMs(p: Pick<RgParams, 'showFor'>): number | null {
  return p.showFor === 'unlimited' ? null : Number(p.showFor) * 1000;
}

// ---------------------------------------------------------------------------
// Farben

/** `a` = Rot, `b` = zweite Farbe (Grün oder Cyan) */
export type ColorId = 'a' | 'b';

export interface ToneCss {
  /** Zeichenfarbe Rot */
  a: string;
  /** Zeichenfarbe Grün bzw. Cyan */
  b: string;
  /** Neutrales Hellgrau (Rahmen, Kreuz, Bedienung): beide Augen sehen es */
  neutral: string;
}

/** Farben als CSS-Werte: reines Rot (255,0,0), reines Grün (0,255,0) oder Cyan (0,255,255), skaliert mit der Helligkeit in % */
export function toneCss(tones: Tones, brightness: number): ToneCss {
  const k = Math.max(0, Math.min(100, brightness)) / 100;
  const v = Math.round(255 * k);
  const n = Math.round(200 * k);
  return {
    a: `rgb(${v},0,0)`,
    b: tones === 'redcyan' ? `rgb(0,${v},${v})` : `rgb(0,${v},0)`,
    neutral: `rgb(${n},${n},${n})`,
  };
}

/** Welche Farbe sieht welches Auge (Rot-Glas = Rot sichtbar, Grün-/Cyan-Glas = zweite Farbe sichtbar) */
export function eyeColors(leftLens: Lens): { left: ColorId; right: ColorId } {
  return leftLens === 'red' ? { left: 'a', right: 'b' } : { left: 'b', right: 'a' };
}

// ---------------------------------------------------------------------------
// Zeichen

export const DIGITS: readonly string[] = '0123456789'.split('');
/** Buchstaben ohne leicht verwechselbare (kein B/8, C/G/O/Q, I/J, S/5, V/W/X/Y) */
export const LETTERS: readonly string[] = 'ADEFHKLMNPRTUZ'.split('');
/** Gemischt: Ziffern und Buchstaben, die einander nicht ähneln (keine 0/1/8, kein Z) */
export const MIXED: readonly string[] = '2345679ADEFHKLMNPRTU'.split('');
/** Taste „nicht gesehen“ */
export const UNSURE = '?';

export function poolFor(symbols: Symbols): readonly string[] {
  return symbols === 'letters' ? LETTERS : symbols === 'mixed' ? MIXED : DIGITS;
}

/** Tasten in der Reihenfolge der Anzeige: der Vorrat und zuletzt „?“ */
export function keysFor(symbols: Symbols): string[] {
  return [...poolFor(symbols), UNSURE];
}

/** Ein Zeichen der Folge mit seiner Farbe */
export interface Cell {
  ch: string;
  color: ColorId;
}

/** Mindestanteil jeder Farbe bei zufälliger Verteilung: ein Drittel (aufgerundet) */
export function minPerColor(length: number): number {
  return Math.ceil(length / 3);
}

/** Farbmuster einer Folge: abwechselnd (zufälliger Start) oder zufällig mit mindestens einem Drittel je Farbe */
export function colorPattern(rng: Rng, length: number, mix: Mix): ColorId[] {
  if (mix === 'alternate') {
    const start: ColorId = rng.chance(0.5) ? 'a' : 'b';
    const other: ColorId = start === 'a' ? 'b' : 'a';
    return Array.from({ length }, (_, i) => (i % 2 === 0 ? start : other));
  }
  const min = minPerColor(length);
  const nA = min + rng.int(length - 2 * min + 1);
  const arr: ColorId[] = [...Array<ColorId>(nA).fill('a'), ...Array<ColorId>(length - nA).fill('b')];
  return rng.shuffle(arr);
}

/** Zeichen einer Folge: alle verschieden, solange der Vorrat reicht; sonst nie dasselbe Zeichen direkt hintereinander */
export function pickChars(rng: Rng, pool: readonly string[], length: number): string[] {
  if (length <= pool.length) return rng.shuffle([...pool]).slice(0, length);
  const out: string[] = [];
  for (let i = 0; i < length; i++) {
    let c = rng.pick(pool);
    while (i > 0 && c === out[i - 1]) c = rng.pick(pool);
    out.push(c);
  }
  return out;
}

/** Neue Folge; nie dieselben Zeichen wie die vorige (`prev`) */
export function makeSequence(rng: Rng, p: Pick<RgParams, 'symbols' | 'length' | 'mix'>, prev: string | null): Cell[] {
  const pool = poolFor(p.symbols);
  let chars = pickChars(rng, pool, p.length);
  for (let tries = 0; prev !== null && chars.join('') === prev && tries < 50; tries++) chars = pickChars(rng, pool, p.length);
  if (prev !== null && chars.join('') === prev) {
    // äußerster Notfall (nur bei winzigem Vorrat): zwei Zeichen vertauschen
    [chars[0], chars[1]] = [chars[1], chars[0]];
  }
  const colors = colorPattern(rng, p.length, p.mix);
  return chars.map((ch, i) => ({ ch, color: colors[i] }));
}

export type Mark = 'ok' | 'wrong' | 'missing';

/** Bewertung je Zeichen: `?` und nicht Eingegebenes zählen als fehlend, ein anderes Zeichen als verwechselt */
export function scoreEntry(target: readonly Cell[], entry: readonly string[]): Mark[] {
  return target.map((c, i) => {
    const e = entry[i];
    if (e === undefined || e === UNSURE) return 'missing';
    return e === c.ch ? 'ok' : 'wrong';
  });
}

// ---------------------------------------------------------------------------
// Ablauf

/** Rahmen und Kreuz allein, bevor die Folge erscheint (ms) */
export const LEAD_MS = 900;
/** Rückmeldung nach „Fertig“ (ms) */
export const FEEDBACK_MS = 1500;
/** Schnellmodus (?quick=1): Zahl der Folgen */
export const QUICK_TRIALS = 2;
/** Mindestzahl Zeichen je Farbe für den Farbvergleich */
export const MIN_PER_COLOR = 20;
/** Unterschied der Fehleranteile (Prozentpunkte), ab dem eine Farbe als „öfter fehlend“ gemeldet wird – unsere Faustregel */
export const COLOR_GAP_PCT = 10;
/** Platz eines Zeichens in der Zeile (Vielfaches der Zeichenhöhe, Mitte zu Mitte) */
export const PITCH = 1.25;

export type RgPhase = 'idle' | 'lead' | 'show' | 'input' | 'feedback' | 'done';

export interface RgTrial {
  nr: number;
  /** Zeichen der Folge */
  chars: string;
  /** Farben der Folge, je Zeichen `a` oder `b` */
  colors: string;
  /** Eingabe, je Position ein Zeichen oder `?` (kürzere Eingaben mit `?` aufgefüllt) */
  answer: string[];
  marks: Mark[];
  correct: boolean;
  symbolsOk: number;
  /** Zeit vom Beginn der Eingabemöglichkeit bis „Fertig“ (ms) */
  entryMs: number;
}

export interface RgEnv {
  rng: Rng;
  leadMs?: number;
  feedbackMs?: number;
}

export interface ColorTally {
  shown: number;
  ok: number;
  missing: number;
  wrong: number;
}

export interface RgSummary {
  /** Zahl der gespielten Folgen */
  n: number;
  correct: number;
  /** Anteil ganz richtiger Folgen in %, null ohne Folge */
  accuracy: number | null;
  symbolsOk: number;
  symbolsTotal: number;
  /** Anteil richtiger Zeichen in %, null ohne Zeichen */
  symbolAccuracy: number | null;
  byColor: Record<ColorId, ColorTally>;
  /** Anteil fehlender oder falscher Zeichen je Farbe in % (null ohne Zeichen dieser Farbe) */
  errA: number | null;
  errB: number | null;
  /** Genug Zeichen je Farbe (≥ MIN_PER_COLOR) für einen Farbvergleich */
  enough: boolean;
  /** Welche Farbe öfter fehlte oder falsch war: `none` = zu wenig Zeichen, `even` = kein deutlicher Unterschied */
  hint: 'none' | 'even' | ColorId;
  /** Eine Farbe fehlte fast immer vollständig, die andere nicht (nur mit genug Zeichen) */
  oneColorGone: ColorId | null;
  byEye: { left: ColorTally & { color: ColorId }; right: ColorTally & { color: ColorId } };
  /** Auge, über das die öfter fehlende Farbe läuft (nur bei `hint` a/b) */
  moreOftenEye: 'left' | 'right' | null;
  /** Mittlere Eingabezeit in ms, null ohne Folge */
  entryMean: number | null;
  trials: RgTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

const errPct = (t: ColorTally): number | null => (t.shown ? round((100 * (t.missing + t.wrong)) / t.shown, 1) : null);

/** Auswertung aus einer Liste gewerteter Folgen (auch ohne laufende Sitzung nutzbar, z. B. für Tests) */
export function summarize(trials: readonly RgTrial[], leftLens: Lens): RgSummary {
  const n = trials.length;
  const byColor: Record<ColorId, ColorTally> = {
    a: { shown: 0, ok: 0, missing: 0, wrong: 0 },
    b: { shown: 0, ok: 0, missing: 0, wrong: 0 },
  };
  let symbolsOk = 0;
  let symbolsTotal = 0;
  for (const t of trials) {
    for (let i = 0; i < t.marks.length; i++) {
      const c = (t.colors[i] === 'b' ? 'b' : 'a') as ColorId;
      const tally = byColor[c];
      tally.shown++;
      symbolsTotal++;
      const m = t.marks[i];
      if (m === 'ok') {
        tally.ok++;
        symbolsOk++;
      } else if (m === 'missing') tally.missing++;
      else tally.wrong++;
    }
  }
  const errA = errPct(byColor.a);
  const errB = errPct(byColor.b);
  const enough = byColor.a.shown >= MIN_PER_COLOR && byColor.b.shown >= MIN_PER_COLOR;
  let hint: RgSummary['hint'] = 'none';
  if (enough && errA !== null && errB !== null) {
    const diff = errA - errB;
    hint = Math.abs(diff) >= COLOR_GAP_PCT ? (diff > 0 ? 'a' : 'b') : 'even';
  }
  let oneColorGone: ColorId | null = null;
  if (enough) {
    const ma = byColor.a.missing / byColor.a.shown;
    const mb = byColor.b.missing / byColor.b.shown;
    if (ma >= 0.8 && mb <= 0.5) oneColorGone = 'a';
    else if (mb >= 0.8 && ma <= 0.5) oneColorGone = 'b';
  }
  const eyes = eyeColors(leftLens);
  const moreOftenEye = hint === 'a' || hint === 'b' ? (hint === eyes.left ? 'left' : 'right') : null;
  return {
    n,
    correct: trials.filter((t) => t.correct).length,
    accuracy: n ? round((100 * trials.filter((t) => t.correct).length) / n, 1) : null,
    symbolsOk,
    symbolsTotal,
    symbolAccuracy: symbolsTotal ? round((100 * symbolsOk) / symbolsTotal, 1) : null,
    byColor,
    errA,
    errB,
    enough,
    hint,
    oneColorGone,
    byEye: { left: { ...byColor[eyes.left], color: eyes.left }, right: { ...byColor[eyes.right], color: eyes.right } },
    moreOftenEye,
    entryMean: n ? round(mean(trials.map((t) => t.entryMs)), 0) : null,
    trials: trials.slice(),
  };
}

/** Reine Spiellogik als Zustandsautomat. */
export class RgSession {
  readonly p: RgParams;
  readonly pool: readonly string[];
  readonly keys: string[];
  phase: RgPhase = 'idle';
  target: Cell[] = [];
  entry: string[] = [];
  trials: RgTrial[] = [];
  /** Nummer der laufenden Folge, ab 0 */
  idx = 0;
  finished = false;
  startedAt: number | null = null;
  endedAt: number | null = null;
  private phaseAt = 0;
  private inputFrom = 0;
  private prev: string | null = null;
  private readonly rng: Rng;
  private readonly leadMs: number;
  private readonly feedbackMs: number;
  private readonly limitMs: number | null;

  constructor(p: RgParams, env: RgEnv) {
    this.p = p;
    this.rng = env.rng;
    this.pool = poolFor(p.symbols);
    this.keys = keysFor(p.symbols);
    this.leadMs = env.leadMs ?? LEAD_MS;
    this.feedbackMs = env.feedbackMs ?? FEEDBACK_MS;
    this.limitMs = showMs(p);
  }

  start(now: number): void {
    this.startedAt = now;
    this.begin(now);
  }

  private begin(now: number): void {
    if (this.idx >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.phase = 'done';
      return;
    }
    this.target = makeSequence(this.rng, this.p, this.prev);
    this.prev = this.target.map((c) => c.ch).join('');
    this.entry = [];
    this.phase = 'lead';
    this.phaseAt = now;
  }

  update(now: number): void {
    const dt = now - this.phaseAt;
    switch (this.phase) {
      case 'lead':
        if (dt >= this.leadMs) {
          if (this.limitMs === null) {
            this.phase = 'input';
            this.inputFrom = now;
          } else this.phase = 'show';
          this.phaseAt = now;
        }
        break;
      case 'show':
        if (this.limitMs !== null && dt >= this.limitMs) {
          this.phase = 'input';
          this.inputFrom = now;
          this.phaseAt = now;
        }
        break;
      case 'feedback':
        if (dt >= this.feedbackMs) {
          this.idx++;
          this.begin(now);
        }
        break;
      default:
        break;
    }
  }

  /** Die Folge ist sichtbar (nicht vor ihrem Erscheinen, bei begrenzter Dauer nicht danach) */
  get visible(): boolean {
    if (this.phase === 'show' || this.phase === 'feedback') return true;
    return this.phase === 'input' && this.limitMs === null;
  }

  /** Eingabe ist möglich */
  get canEnter(): boolean {
    return this.phase === 'input';
  }

  /** „Fertig“ ist möglich, sobald mindestens ein Zeichen (auch „?“) eingegeben wurde */
  get canSubmit(): boolean {
    return this.phase === 'input' && this.entry.length > 0;
  }

  /** Taste gedrückt (Zeichen des Vorrats oder `?`); `false`, wenn nicht angenommen */
  press(key: string): boolean {
    if (this.phase !== 'input' || this.entry.length >= this.p.length) return false;
    if (key !== UNSURE && !this.pool.includes(key)) return false;
    this.entry.push(key);
    return true;
  }

  /** Letztes Zeichen löschen */
  back(): boolean {
    if (this.phase !== 'input' || this.entry.length === 0) return false;
    this.entry.pop();
    return true;
  }

  /** „Fertig“: Folge werten. Kürzere Eingaben werden mit `?` aufgefüllt (fehlend). */
  submit(now: number): RgTrial | null {
    if (!this.canSubmit) return null;
    const answer = Array.from({ length: this.p.length }, (_, i) => this.entry[i] ?? UNSURE);
    const marks = scoreEntry(this.target, answer);
    const symbolsOk = marks.filter((m) => m === 'ok').length;
    const trial: RgTrial = {
      nr: this.idx + 1,
      chars: this.target.map((c) => c.ch).join(''),
      colors: this.target.map((c) => c.color).join(''),
      answer,
      marks,
      correct: symbolsOk === this.p.length,
      symbolsOk,
      entryMs: Math.round(now - this.inputFrom),
    };
    this.trials.push(trial);
    this.phase = 'feedback';
    this.phaseAt = now;
    return trial;
  }

  /** Zuletzt gewertete Folge (während der Rückmeldung) */
  get last(): RgTrial | null {
    return this.trials.length ? this.trials[this.trials.length - 1] : null;
  }

  summary(): RgSummary {
    return summarize(this.trials, this.p.leftLens);
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte
 * und keine Diagnose.
 */
export function tipFor(s: RgSummary): string {
  if (s.n === 0 || s.symbolsOk === 0) return 'few';
  if (s.oneColorGone) return 'oneColor';
  if (s.hint === 'a' || s.hint === 'b') return 'colorMore';
  if (!s.enough) return 'notEnough';
  const acc = s.accuracy ?? 0;
  if (s.n >= 5 && acc < 50) return 'easier';
  if (s.n >= 8 && acc >= 90) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je ganz richtiger Folge */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}

/** Sehwinkel in Grad für eine Höhe in cm bei einem Abstand in cm */
export function visualAngleDeg(cm: number, distCm: number): number {
  return (2 * Math.atan(cm / (2 * distCm)) * 180) / Math.PI;
}
