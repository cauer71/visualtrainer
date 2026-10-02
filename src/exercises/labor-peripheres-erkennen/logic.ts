/**
 * Peripheres Erkennen – reine Logik (aus `PeripherySession` im Labor-Prototyp, ex/periphery.js).
 *
 * Ablauf eines Durchgangs: Zahl in der Mitte wechselt (Fixierhilfe) → nach zufälliger Zeit blitzt ein Buchstabe im Abstand
 * `eccentricityDeg` (Sehwinkel) von der Mitte für eine Zahl **ganzer Bilder** auf → Antwortfelder → kurze Rückmeldung.
 * Zeiten in ms (virtuelle Zeit des Runners), Längen in cm, Zufall nur über `Rng`, keine Darstellung. Der Blick wird
 * **nicht** gemessen: Die Mitte ist eine Bitte an die Person.
 *
 * Abweichungen vom Prototyp:
 * - Anzeigedauer in ganzen Bildern, gemessene Dauer je Durchgang, gestörte Darbietungen zählen nicht für die Treppe, adaptive
 *   Treppe in Bildern (siehe `_shared/labor-bilder.ts`); `durationMs` ab 10 statt 16 ms (Raster: 150 liegt nicht auf 16 + 10·k).
 * - Exzentrizität = Winkel zwischen der Blickrichtung zur Mitte und der zum Buchstaben: Abstand = Sehabstand · tan(Winkel)
 *   (Prototyp: `degToCm` = Größe, die unter diesem Winkel erscheint, 2 · d · tan(Winkel / 2); die beiden weichen bei 10° um 0,7 %,
 *   bei 20° um 3 %, bei 40° um 13 % ab). Kleine Winkel sind praktisch gleich.
 * - Abstand wird auf das Machbare begrenzt: nach außen (Buchstabe ganz auf der Bühne) und nach innen (nicht über der Zahl
 *   in der Mitte); der tatsächliche Winkel steht je Durchgang und im Ergebnis (`ecc`).
 * - Die Zahl in der Mitte hat eine feste kleine Höhe (`ANCHOR_CM`), nicht die Buchstabenhöhe, damit auch kleine Winkel passen.
 */
import { mean, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { DEFAULT_PERIOD_MS, DurationControl, isCleanShow, showEndAt } from '../_shared/labor-bilder';
import { LETTERS, round } from '../labor-blitz-erkennung/logic';

export { LETTERS, round };

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp, außer `durationMs` ab 10 ms); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 8, max: 120, step: 4, default: 32 },
  { key: 'eccentricityDeg', type: 'number', unit: 'deg', min: 2, max: 40, step: 1, default: 10, summary: true },
  { key: 'directions', type: 'select', default: 'horizontal', options: ['horizontal', 'all4'] },
  { key: 'durationMs', type: 'number', unit: 'ms', min: 10, max: 1500, step: 10, default: 150, summary: true },
  { key: 'adaptive', type: 'select', default: 'no', options: ['no', 'yes'] },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 1, max: 12, step: 0.5, default: 3 },
  { key: 'choices', type: 'number', unit: 'count', min: 2, max: 6, step: 1, default: 4 },
];

export interface PeripheryParams {
  trials: number;
  eccentricityDeg: number;
  directions: 'horizontal' | 'all4';
  durationMs: number;
  adaptive: 'yes' | 'no';
  sizeCm: number;
  choices: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function peripheryParams(p: ExerciseParams): PeripheryParams {
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
    eccentricityDeg: num('eccentricityDeg'),
    directions: sel<'horizontal' | 'all4'>('directions', ['horizontal', 'all4'], 'horizontal'),
    durationMs: num('durationMs'),
    adaptive: sel('adaptive', ['no', 'yes'], 'no'),
    sizeCm: num('sizeCm'),
    choices: Math.round(num('choices')),
  };
}

export type Dir = 'left' | 'right' | 'up' | 'down';

/** Zahl in der Mitte wechselt alle … ms (1,7 Wechsel pro Sekunde, unter der Grenze von 2,5 pro Sekunde) */
export const CENTER_STEP_MS = 600;
/** Zeit mit Zahl in der Mitte vor dem Buchstaben (ms): zufällig zwischen Minimum und Maximum */
export const MIN_FIX_MS = 900;
export const MAX_FIX_MS = 2200;
/** Kleinste zulässige Wartezeit überhaupt (Schnellmodus, Film) – hält die Blinkregel ein */
export const FIX_FLOOR_MS = 600;
export const FEEDBACK_MS = 450;
/** Höhe der Zahl in der Mitte in cm (feste Fixierhilfe) */
export const ANCHOR_CM = 1.2;
/** Mindestabstand zwischen Rand der Zahl und Rand des Buchstabens (cm) */
export const CLEAR_CM = 0.4;
/** Abstand zum Rand der Bühne (cm) */
export const EDGE_CM = 0.5;
export const MAX_DURATION_MS = 1500;
export const QUICK_TRIALS = 3;
/** Schnellmodus (?quick=1): Wartezeit vor dem Buchstaben */
export const QUICK_FIX: [number, number] = [FIX_FLOOR_MS + 100, FIX_FLOOR_MS + 400];

export type PeripheryPhase = 'idle' | 'fix' | 'flash' | 'input' | 'feedback' | 'done';

/** Abstand Mitte–Buchstabe in cm für den Winkel `deg` bei Sehabstand `distCm` (Blick geradeaus auf die Mitte) */
export function offsetCm(deg: number, distCm: number): number {
  return distCm * Math.tan((deg * Math.PI) / 180);
}

/** Winkel in Grad für den Abstand `cm` von der Mitte bei Sehabstand `distCm` */
export function offsetDeg(cm: number, distCm: number): number {
  return (Math.atan(cm / distCm) * 180) / Math.PI;
}

export interface Eccentricity {
  /** tatsächlicher Abstand Mitte–Mitte des Buchstabens in cm */
  cm: number;
  /** tatsächlicher Winkel in Grad */
  deg: number;
  /** `true`, wenn der gewünschte Winkel nicht erreichbar war (zu groß oder zu klein für diese Bühne) */
  clamped: boolean;
}

export interface PeripheryTrial {
  nr: number;
  dir: Dir;
  letter: string;
  answer: string;
  correct: boolean;
  frames: number;
  plannedMs: number;
  shownMs: number;
  clean: boolean;
  /** tatsächlicher Winkel in Grad (1 Nachkommastelle) */
  eccDeg: number;
  clamped: boolean;
  /** Zeit vom Erscheinen der Antwortfelder bis zur Wahl (ms) */
  rtMs: number;
}

export interface PeripheryEnv {
  rng: Rng;
  /** nutzbare Fläche um die Mitte in cm (symmetrisch zur Mitte; Platz für Anzeige/Bildunterschrift schon abgezogen) */
  fieldWcm: number;
  fieldHcm: number;
  /** Sehabstand in cm (Kalibrierung) */
  viewDistanceCm: number;
  /** Buchstabenhöhe in cm nach Begrenzung auf die Bühne (Standard: Einstellung) */
  sizeCm?: number;
  /** Wartezeit vor dem Buchstaben in ms: [min, max] (Standard 900–2200; nie unter `FIX_FLOOR_MS`) */
  fixMs?: [number, number];
  /** Fester Ablauf (Intro-Film): Richtung und Buchstabe je Durchgang */
  plan?: Array<{ dir: Dir; letter?: string }>;
}

export type AnswerResult = { type: 'result'; correct: boolean; letter: string } | null;

export interface PeripherySummary {
  n: number;
  correct: number;
  accuracy: number | null;
  /** Trefferquote durch reines Raten in % */
  chance: number;
  accHorizontal: number | null;
  accVertical: number | null;
  /** Mittlerer tatsächlicher Winkel in Grad (null ohne Durchgang) */
  eccMeanDeg: number | null;
  /** Durchgänge, in denen der Winkel begrenzt werden musste */
  limited: number;
  rtMean: number | null;
  thresholdMs: number | null;
  thresholdFrames: number | null;
  durationMs: number;
  shownMean: number | null;
  shownSd: number | null;
  jerks: number;
  refreshHz: number;
  trials: PeripheryTrial[];
}

/** Reine Spiellogik als Zustandsautomat. */
export class PeripherySession {
  readonly p: PeripheryParams;
  readonly control: DurationControl;
  phase: PeripheryPhase = 'idle';
  trials: PeripheryTrial[] = [];
  idx = 0;
  finished = false;
  startedAt: number | null = null;
  endedAt: number | null = null;
  fieldW: number;
  fieldH: number;
  /** Buchstabenhöhe in cm (nach Begrenzung) */
  sizeCm: number;
  /** Zahl in der Mitte */
  centerDigit = '5';
  dir: Dir = 'left';
  letter = 'A';
  options: string[] = [];
  /** Abstand des Buchstabens von der Mitte in cm (dx, dy) */
  offset = { x: 0, y: 0 };
  ecc: Eccentricity = { cm: 0, deg: 0, clamped: false };
  fixMs = MIN_FIX_MS;
  frames = 0;
  plannedMs = 0;
  shownMs = 0;
  clean = true;
  lastShowAt: number | null = null;
  private centerAt = 0;
  private showStart = 0;
  private phaseAt = 0;
  private period = DEFAULT_PERIOD_MS;
  private readonly rng: Rng;
  private readonly dist: number;
  private readonly fixRange: [number, number];
  private readonly plan?: Array<{ dir: Dir; letter?: string }>;

  constructor(p: PeripheryParams, env: PeripheryEnv) {
    this.p = p;
    this.rng = env.rng;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.dist = env.viewDistanceCm;
    this.sizeCm = env.sizeCm ?? p.sizeCm;
    const fr = env.fixMs ?? [MIN_FIX_MS, MAX_FIX_MS];
    const lo = Math.max(FIX_FLOOR_MS, fr[0]);
    this.fixRange = [lo, Math.max(lo, fr[1])];
    this.plan = env.plan;
    this.control = new DurationControl({ durationMs: p.durationMs, maxMs: MAX_DURATION_MS, adaptive: p.adaptive === 'yes' });
  }

  setPeriod(ms: number): void {
    if (Number.isFinite(ms) && ms > 0) this.period = ms;
  }

  get periodMs(): number {
    return this.period;
  }

  /** Feld oder Buchstabenhöhe haben sich geändert (Tablet gedreht); gilt ab dem nächsten Durchgang */
  setField(wCm: number, hCm: number, sizeCm?: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    if (sizeCm !== undefined && sizeCm > 0) this.sizeCm = sizeCm;
  }

  /** Abstand in cm für die Richtung; begrenzt auf das Machbare, der tatsächliche Winkel wird mitgeführt */
  eccentricity(dir: Dir): Eccentricity {
    const wanted = offsetCm(this.p.eccentricityDeg, this.dist);
    const extent = dir === 'left' || dir === 'right' ? this.fieldW : this.fieldH;
    const max = Math.max(0, extent / 2 - this.sizeCm / 2 - EDGE_CM);
    const min = Math.min(max, this.sizeCm / 2 + ANCHOR_CM / 2 + CLEAR_CM);
    const cm = Math.max(min, Math.min(wanted, max));
    return { cm, deg: offsetDeg(cm, this.dist), clamped: Math.abs(cm - wanted) > 1e-9 };
  }

  start(now: number): void {
    this.startedAt = now;
    this.centerAt = now;
    this.begin(now);
  }

  begin(now: number): void {
    if (this.idx >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.phase = 'done';
      return;
    }
    const step = this.plan?.[this.idx];
    const dirs: Dir[] = this.p.directions === 'all4' ? ['left', 'right', 'up', 'down'] : ['left', 'right'];
    this.dir = step ? step.dir : this.rng.pick(dirs);
    this.letter = step?.letter ?? this.rng.pick(LETTERS);
    const others = this.rng.shuffle(LETTERS.filter((l) => l !== this.letter)).slice(0, this.p.choices - 1);
    this.options = this.rng.shuffle([this.letter, ...others]);
    this.ecc = this.eccentricity(this.dir);
    this.offset = {
      x: this.dir === 'right' ? this.ecc.cm : this.dir === 'left' ? -this.ecc.cm : 0,
      y: this.dir === 'down' ? this.ecc.cm : this.dir === 'up' ? -this.ecc.cm : 0,
    };
    this.fixMs = this.fixRange[0] + this.rng.next() * (this.fixRange[1] - this.fixRange[0]);
    this.phase = 'fix';
    this.phaseAt = now;
  }

  /** Position des Buchstabens im Feld in cm (Mitte des Feldes + Abstand) */
  get pos(): { x: number; y: number } {
    return { x: this.fieldW / 2 + this.offset.x, y: this.fieldH / 2 + this.offset.y };
  }

  /** Pro Bild aufrufen (mit der Bildzeit) */
  update(now: number): void {
    switch (this.phase) {
      case 'fix':
        if (now - this.centerAt >= CENTER_STEP_MS) {
          // immer eine andere Zahl 2–9 als zuvor
          const cur = Number(this.centerDigit);
          this.centerDigit = String(2 + ((cur - 2 + 1 + this.rng.int(7)) % 8));
          this.centerAt = now;
        }
        if (now - this.phaseAt >= this.fixMs) {
          this.phase = 'flash';
          this.phaseAt = now;
          this.showStart = now;
          this.lastShowAt = now;
          this.frames = this.control.begin(this.period);
          this.plannedMs = this.frames * this.period;
          this.shownMs = 0;
          this.clean = true;
        }
        break;
      case 'flash':
        if (now >= showEndAt(this.showStart, this.frames, this.period)) {
          this.shownMs = now - this.showStart;
          this.clean = isCleanShow(this.shownMs, this.frames, this.period);
          this.phase = 'input';
          this.phaseAt = now;
        }
        break;
      case 'feedback':
        if (now - this.phaseAt >= FEEDBACK_MS) {
          this.idx++;
          this.begin(now);
        }
        break;
      default:
        break;
    }
  }

  /** Antwortfeld gewählt (Nummer ab 0); null, wenn gerade keine Antwort möglich ist (nur eine Antwort je Durchgang) */
  answer(optionIndex: number, now: number): AnswerResult {
    if (this.phase !== 'input') return null;
    const chosen = this.options[optionIndex];
    if (chosen === undefined) return null;
    const correct = chosen === this.letter;
    this.trials.push({
      nr: this.idx + 1,
      dir: this.dir,
      letter: this.letter,
      answer: chosen,
      correct,
      frames: this.frames,
      plannedMs: Math.round(this.plannedMs * 10) / 10,
      shownMs: Math.round(this.shownMs * 10) / 10,
      clean: this.clean,
      eccDeg: round(this.ecc.deg, 1) ?? 0,
      clamped: this.ecc.clamped,
      rtMs: Math.round(now - this.phaseAt),
    });
    this.control.record(correct, this.clean);
    this.phase = 'feedback';
    this.phaseAt = now;
    return { type: 'result', correct, letter: this.letter };
  }

  get last(): PeripheryTrial | null {
    return this.trials.length ? this.trials[this.trials.length - 1] : null;
  }

  summary(): PeripherySummary {
    const ts = this.trials;
    const n = ts.length;
    const ok = ts.filter((t) => t.correct).length;
    const side = (dirs: Dir[]): number | null => {
      const x = ts.filter((t) => dirs.includes(t.dir));
      return x.length ? round((100 * x.filter((t) => t.correct).length) / x.length, 1) : null;
    };
    const clean = ts.filter((t) => t.clean && t.frames > 0);
    const effPeriod = clean.length ? mean(clean.map((t) => t.shownMs / t.frames)) : this.period;
    const tf = this.control.thresholdFrames();
    const shown = ts.map((t) => t.shownMs);
    return {
      n,
      correct: ok,
      accuracy: n ? round((100 * ok) / n, 1) : null,
      chance: round(100 / this.p.choices, 1) ?? 0,
      accHorizontal: side(['left', 'right']),
      accVertical: this.p.directions === 'all4' ? side(['up', 'down']) : null,
      eccMeanDeg: n ? round(mean(ts.map((t) => t.eccDeg)), 1) : null,
      limited: ts.filter((t) => t.clamped).length,
      rtMean: n ? round(mean(ts.map((t) => t.rtMs)), 0) : null,
      thresholdMs: tf === null ? null : round(tf * effPeriod, 0),
      thresholdFrames: tf === null ? null : round(tf, 1),
      durationMs: this.p.durationMs,
      shownMean: n ? round(mean(shown), 0) : null,
      shownSd: n >= 2 ? round(sd(shown), 1) : null,
      jerks: ts.filter((t) => !t.clean).length,
      refreshHz: round(1000 / this.period, 0) ?? 60,
      trials: ts.slice(),
    };
  }
}

/** Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte. */
export function tipFor(s: PeripherySummary, p: PeripheryParams): string {
  if (s.n === 0) return 'few';
  if (s.jerks >= 3 && s.jerks >= 0.2 * s.n) return 'jerks';
  if (s.limited >= 0.5 * s.n) return 'limited';
  if (p.adaptive === 'yes') return s.thresholdMs !== null ? 'threshold' : 'adaptiveShort';
  const acc = s.accuracy ?? 0;
  if (s.n >= 8 && acc <= s.chance + 10) return 'chance';
  if (s.accHorizontal !== null && s.accVertical !== null && s.n >= 16 && Math.abs(s.accHorizontal - s.accVertical) >= 25) return 'sides';
  if (s.n >= 16 && acc >= 90) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je richtigem Durchgang */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}

/** Wartezeit vor dem Buchstaben im Film: lang genug, um zu erklären */
export const DEMO_FIX: [number, number] = [1500, 1700];
