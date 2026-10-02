/**
 * Blitz-Erkennung – reine Logik (aus `FlashSession` im Labor-Prototyp, ex/flash.js).
 *
 * Ablauf eines Durchgangs: Kreuz in der Mitte (`FIX_MS`) → Zeichen für eine Zahl **ganzer Bilder** → optional Maske
 * (`MASK_MS`) → Eingabe über ein Tastenfeld → kurze Rückmeldung (`FEEDBACK_MS`). Zeiten in ms (virtuelle Zeit des
 * Runners), Zufall nur über `Rng`, keine Darstellung.
 *
 * Abweichungen vom Prototyp:
 * - Die Anzeigedauer wird in ganzen Bildern gezählt (Bilddauer aus den Zeitstempeln, siehe `_shared/labor-bilder.ts`);
 *   die tatsächlich verstrichene Zeit (`shownMs`) wird je Durchgang gemessen. Gestörte Darbietungen (ein Bild
 *   ausgelassen) zählen nicht für das adaptive Verfahren.
 * - Das adaptive Verfahren läuft in Bildern (nicht in ms): Die Schwelle kann nie unter ein Bild fallen.
 * - Die Anzeigedauer beginnt bei 10 ms statt 16 ms (Prototyp: min 16, Schritt 10, Standard 200 liegt nicht auf dem
 *   Raster 16 + 10·k; die Einstellung würde auf 196 springen). 10 ms ergibt auf jedem Bildschirm genau ein Bild.
 * - Zwischen zwei Darbietungen liegen immer mindestens `MIN_CYCLE_MS` (Blinkregel der App).
 */
import { mean, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { DEFAULT_PERIOD_MS, DurationControl, isCleanShow, MIN_CYCLE_MS, showEndAt } from '../_shared/labor-bilder';

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp, außer `durationMs` ab 10 ms); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 5, max: 100, step: 5, default: 20 },
  { key: 'symbols', type: 'select', default: 'digits', options: ['digits', 'letters'] },
  { key: 'length', type: 'number', unit: 'count', min: 1, max: 6, step: 1, default: 3, summary: true },
  { key: 'durationMs', type: 'number', unit: 'ms', min: 10, max: 2000, step: 10, default: 200, summary: true },
  { key: 'adaptive', type: 'select', default: 'no', options: ['no', 'yes'] },
  { key: 'mask', type: 'select', default: 'yes', options: ['yes', 'no'] },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 1, max: 12, step: 0.5, default: 3 },
];

export interface FlashParams {
  trials: number;
  symbols: 'digits' | 'letters';
  length: number;
  durationMs: number;
  adaptive: 'yes' | 'no';
  mask: 'yes' | 'no';
  sizeCm: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function flashParams(p: ExerciseParams): FlashParams {
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
    trials: Math.round(num('trials')),
    symbols: sel<'digits' | 'letters'>('symbols', ['digits', 'letters'], 'digits'),
    length: Math.round(num('length')),
    durationMs: num('durationMs'),
    adaptive: sel('adaptive', ['no', 'yes'], 'no'),
    mask: sel('mask', ['yes', 'no'], 'yes'),
    sizeCm: num('sizeCm'),
  };
}

export const DIGITS: readonly string[] = '0123456789'.split('');
/** Buchstaben ohne leicht verwechselbare (kein C/G/O/Q, I/J, W/X/Y) */
export const LETTERS: readonly string[] = 'ABDEFGHKLMNPRSTUVZ'.split('');

/** Kreuz vor der Darbietung (ms) */
export const FIX_MS = 700;
/** Maske nach der Darbietung (ms) */
export const MASK_MS = 150;
/** Rückmeldung nach der Antwort (ms) */
export const FEEDBACK_MS = 500;
/** Größte Dauer des adaptiven Verfahrens (ms), wie im Prototyp */
export const MAX_DURATION_MS = 2000;
/** Schnellmodus (?quick=1): Zahl der Durchgänge */
export const QUICK_TRIALS = 2;
/** Platz, den ein Zeichen auf der Zeile braucht (Vielfaches der Zeichenhöhe): Abstand Mitte zu Mitte */
export const PITCH = 1.25;

export type FlashPhase = 'idle' | 'fix' | 'show' | 'mask' | 'input' | 'feedback' | 'done';

export interface FlashTrial {
  nr: number;
  target: string;
  answer: string;
  correct: boolean;
  /** Zeichen an der richtigen Stelle */
  symbolsOk: number;
  /** geplante Zahl ganzer Bilder */
  frames: number;
  /** geplante Dauer = Bilder × Bilddauer (ms) */
  plannedMs: number;
  /** tatsächlich verstrichene Zeit der Darbietung (ms) */
  shownMs: number;
  /** false = ein Bild ausgelassen oder doppelt; zählt nicht für das adaptive Verfahren */
  clean: boolean;
  /** Zeit von Beginn der Eingabe bis zur letzten Taste (ms) */
  entryMs: number;
}

export type PressResult =
  | { type: 'entry'; entry: string }
  | { type: 'result'; correct: boolean; target: string }
  | null;

export interface FlashEnv {
  rng: Rng;
  /** Kreuz vor der Darbietung (Standard `FIX_MS`) */
  fixMs?: number;
}

export interface FlashSummary {
  /** Zahl der gespielten Durchgänge */
  n: number;
  correct: number;
  /** Anteil vollständig richtiger Durchgänge in %, null ohne Durchgang */
  accuracy: number | null;
  /** Anteil richtiger Zeichen an der richtigen Stelle in %, null ohne Durchgang */
  symbolAccuracy: number | null;
  /** Mittlere Eingabezeit in ms, null ohne Durchgang */
  entryMean: number | null;
  /** Geschätzte Schwelle in ms (nur adaptiv und mit mindestens 2 Umkehrpunkten) */
  thresholdMs: number | null;
  /** Schwelle in Bildern */
  thresholdFrames: number | null;
  /** Tatsächlich gemessene Dauer der letzten Darbietung in ms */
  finalMs: number | null;
  /** Eingestellte (Start-)Dauer in ms */
  durationMs: number;
  /** Mittlere tatsächlich gemessene Dauer in ms, null ohne Durchgang */
  shownMean: number | null;
  /** Streuung der gemessenen Dauern in ms (null bei weniger als 2 Durchgängen) */
  shownSd: number | null;
  /** Bilder der letzten Darbietung */
  framesLast: number | null;
  /** Durchgänge mit gestörter Darbietung */
  jerks: number;
  /** Geschätzte Bildwiederholrate in Hz */
  refreshHz: number;
  trials: FlashTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Reine Spiellogik als Zustandsautomat. */
export class FlashSession {
  readonly p: FlashParams;
  readonly pool: readonly string[];
  readonly control: DurationControl;
  phase: FlashPhase = 'idle';
  /** Aktuelle Zielzeichen */
  target: string[] = [];
  /** Bisherige Eingabe des Durchgangs */
  entry: string[] = [];
  trials: FlashTrial[] = [];
  /** Nummer des laufenden Durchgangs, ab 0 */
  idx = 0;
  finished = false;
  startedAt: number | null = null;
  endedAt: number | null = null;
  /** Bilder und Dauer der laufenden Darbietung */
  frames = 0;
  plannedMs = 0;
  shownMs = 0;
  clean = true;
  /** Beginn der letzten Darbietung (Bildzeit) – Grundlage für die Blinkregel */
  lastShowAt: number | null = null;
  private showStart = 0;
  private phaseAt = 0;
  private period = DEFAULT_PERIOD_MS;
  private readonly rng: Rng;
  private readonly fixMs: number;

  constructor(p: FlashParams, env: FlashEnv) {
    this.p = p;
    this.rng = env.rng;
    this.fixMs = Math.max(FIX_MS, env.fixMs ?? FIX_MS);
    this.pool = p.symbols === 'letters' ? LETTERS : DIGITS;
    this.control = new DurationControl({ durationMs: p.durationMs, maxMs: MAX_DURATION_MS, adaptive: p.adaptive === 'yes' });
  }

  /** Bilddauer des Bildschirms in ms (vom Anzeigeteil aus den Bildzeiten geschätzt) */
  setPeriod(ms: number): void {
    if (Number.isFinite(ms) && ms > 0) this.period = ms;
  }

  get periodMs(): number {
    return this.period;
  }

  start(now: number): void {
    this.startedAt = now;
    this.begin(now);
  }

  begin(now: number): void {
    if (this.idx >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.phase = 'done';
      return;
    }
    this.target = this.rng.shuffle([...this.pool]).slice(0, this.p.length);
    this.entry = [];
    this.phase = 'fix';
    this.phaseAt = now;
  }

  /** Pro Bild aufrufen (mit der Bildzeit) */
  update(now: number): void {
    const dt = now - this.phaseAt;
    switch (this.phase) {
      case 'fix':
        if (dt >= this.fixMs) {
          this.phase = 'show';
          this.phaseAt = now;
          this.showStart = now;
          this.lastShowAt = now;
          this.frames = this.control.begin(this.period);
          this.plannedMs = this.frames * this.period;
          this.shownMs = 0;
          this.clean = true;
        }
        break;
      case 'show':
        if (now >= showEndAt(this.showStart, this.frames, this.period)) {
          this.shownMs = now - this.showStart;
          this.clean = isCleanShow(this.shownMs, this.frames, this.period);
          this.phase = this.p.mask === 'yes' ? 'mask' : 'input';
          this.phaseAt = now;
        }
        break;
      case 'mask':
        if (dt >= MASK_MS) {
          this.phase = 'input';
          this.phaseAt = now;
        }
        break;
      case 'feedback':
        if (dt >= FEEDBACK_MS) {
          this.idx++;
          this.begin(now);
        }
        break;
      default:
        break;
    }
  }

  /** Taste gedrückt; null, wenn gerade keine Eingabe möglich ist */
  press(symbol: string, now: number): PressResult {
    if (this.phase !== 'input' || this.entry.length >= this.p.length) return null;
    if (!this.pool.includes(symbol)) return null;
    this.entry.push(symbol);
    if (this.entry.length < this.p.length) return { type: 'entry', entry: this.entry.join('') };
    return this.submit(now);
  }

  /** Letztes Zeichen löschen */
  back(): void {
    if (this.phase === 'input') this.entry.pop();
  }

  private submit(now: number): PressResult {
    const answer = this.entry.slice();
    const target = this.target;
    const symbolsOk = answer.filter((s, i) => s === target[i]).length;
    const correct = symbolsOk === target.length;
    this.trials.push({
      nr: this.idx + 1,
      target: target.join(''),
      answer: answer.join(''),
      correct,
      symbolsOk,
      frames: this.frames,
      plannedMs: Math.round(this.plannedMs * 10) / 10,
      shownMs: Math.round(this.shownMs * 10) / 10,
      clean: this.clean,
      entryMs: Math.round(now - this.phaseAt),
    });
    this.control.record(correct, this.clean);
    this.phase = 'feedback';
    this.phaseAt = now;
    return { type: 'result', correct, target: target.join('') };
  }

  /** Zuletzt gewerteter Durchgang (während der Rückmeldung) */
  get last(): FlashTrial | null {
    return this.trials.length ? this.trials[this.trials.length - 1] : null;
  }

  summary(): FlashSummary {
    const ts = this.trials;
    const n = ts.length;
    const ok = ts.filter((t) => t.correct).length;
    const sym = ts.reduce((s, t) => s + t.symbolsOk, 0);
    const maxSym = n * this.p.length;
    const shown = ts.map((t) => t.shownMs);
    const clean = ts.filter((t) => t.clean && t.frames > 0);
    // tatsächliche Bilddauer: Mittel der gemessenen Zeit je Bild; sonst die geschätzte
    const effPeriod = clean.length ? mean(clean.map((t) => t.shownMs / t.frames)) : this.period;
    const tf = this.control.thresholdFrames();
    const last = n ? ts[n - 1] : null;
    return {
      n,
      correct: ok,
      accuracy: n ? round((100 * ok) / n, 1) : null,
      symbolAccuracy: maxSym ? round((100 * sym) / maxSym, 1) : null,
      entryMean: n ? round(mean(ts.map((t) => t.entryMs)), 0) : null,
      thresholdMs: tf === null ? null : round(tf * effPeriod, 0),
      thresholdFrames: tf === null ? null : round(tf, 1),
      finalMs: last ? round(last.shownMs, 0) : null,
      durationMs: this.p.durationMs,
      shownMean: n ? round(mean(shown), 0) : null,
      shownSd: n >= 2 ? round(sd(shown), 1) : null,
      framesLast: last ? last.frames : null,
      jerks: ts.filter((t) => !t.clean).length,
      refreshHz: round(1000 / this.period, 0) ?? 60,
      trials: ts.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte.
 */
export function tipFor(s: FlashSummary, p: FlashParams): string {
  if (s.n === 0 || s.correct === 0) return 'few';
  if (s.jerks >= 3 && s.jerks >= 0.2 * s.n) return 'jerks';
  if (p.adaptive === 'yes') return s.thresholdMs !== null ? 'threshold' : 'adaptiveShort';
  const acc = s.accuracy ?? 0;
  const sym = s.symbolAccuracy ?? 0;
  if (s.n >= 5 && acc < 50 && sym >= acc + 20) return 'partial';
  if (s.n >= 5 && acc < 60) return 'easier';
  if (s.n >= 10 && acc >= 90) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je vollständig richtigem Durchgang */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}

/** Mindestabstand zwischen dem Beginn zweier Darbietungen, in ms, den dieser Ablauf einhält (ohne Eingabezeit) */
export function minCycleMs(maskOn: boolean, showMs: number): number {
  return FIX_MS + showMs + (maskOn ? MASK_MS : 0) + FEEDBACK_MS;
}

export { MIN_CYCLE_MS };
