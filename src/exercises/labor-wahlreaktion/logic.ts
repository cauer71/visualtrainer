/**
 * Wahlreaktion – reine Logik (aus `ChoiceSession` im Labor-Prototyp, ex/choice.js).
 *
 * Zeiten in ms (beliebige Zeitbasis, hier die virtuelle Zeit des Runners). Zufall nur über `Rng` (kein Math.random).
 * Keine Darstellung, keine Eingabe.
 *
 * Ablauf (wie im Prototyp): Kreuz → zufällige Wartezeit zwischen `waitMinMs` und `waitMaxMs` → Reiz → Antwort-Taste.
 * Reize sind gleichmäßig auf die Möglichkeiten verteilt (in gemischten Runden). Keine Antwort in `stimulusMs` = „keine
 * Antwort“. Tippen vor dem Reiz = „zu früh“, nicht gewertet.
 *
 * Ergänzungen gegenüber dem Prototyp: (1) Eine Antwort in den ersten `MIN_RT_MS` (100 ms) nach dem Erscheinen kann keine
 * Reaktion auf den Reiz sein (auch Ereigniszeit und Bildzeit liegen bis zu einem Bild auseinander): sie zählt als „zu
 * früh“, der Reiz bleibt stehen. (2) Ein zweiter Tipp innerhalb von 350 ms nach einer Antwort („Doppeltipp“) wird
 * ignoriert und zählt weder als „zu früh“ noch als Antwort.
 */
import { mean, median, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 10, max: 200, step: 5, default: 40 },
  { key: 'options', type: 'number', unit: 'count', min: 2, max: 6, step: 1, default: 4, summary: true },
  { key: 'stimulus', type: 'select', default: 'color', options: ['color', 'shape'], summary: true },
  { key: 'stimulusMs', type: 'number', unit: 'ms', min: 300, max: 3000, step: 50, default: 1500, summary: true },
  { key: 'waitMinMs', type: 'number', unit: 'ms', min: 300, max: 3000, step: 50, default: 600 },
  { key: 'waitMaxMs', type: 'number', unit: 'ms', min: 300, max: 5000, step: 50, default: 1800 },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 2, max: 12, step: 0.5, default: 6 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type StimulusKind = 'color' | 'shape';

export interface ChoiceParams {
  trials: number;
  options: number;
  stimulus: StimulusKind;
  stimulusMs: number;
  waitMinMs: number;
  waitMaxMs: number;
  sizeCm: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function choiceParams(p: ExerciseParams): ChoiceParams {
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
    options: Math.round(num('options')),
    stimulus: sel<StimulusKind>('stimulus', ['color', 'shape'], 'color'),
    stimulusMs: num('stimulusMs'),
    waitMinMs: num('waitMinMs'),
    waitMaxMs: num('waitMaxMs'),
    sizeCm: num('sizeCm'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** Eine Antwort früher als so viele ms nach dem Erscheinen kann keine Reaktion sein: „zu früh“ */
export const MIN_RT_MS = 100;
/** Zweiter Tipp so kurz nach einer Antwort: ignoriert */
export const DOUBLE_TAP_MS = 350;
/** Kleinste Kantenlänge einer Antwort-Taste in Pixeln */
export const MIN_BUTTON_PX = 56;
/** Schnellmodus (?quick=1): Anzahl der Reize und längste Wartezeit */
export const QUICK_TRIALS = 6;
export const QUICK_WAIT_MAX_MS = 1000;

export type Outcome = 'correct' | 'wrong' | 'omission';

export interface ChoiceTrial {
  nr: number;
  stimulus: number;
  answer: number | null;
  outcome: Outcome;
  /** Reaktionszeit in ms (nur Antworten) */
  rtMs: number | null;
}

export type ChoiceState = 'idle' | 'wait' | 'show' | 'done';

export type ChoiceResponse =
  | { type: 'correct'; rt: number; stimulus: number }
  | { type: 'wrong'; rt: number; stimulus: number }
  /** Tipp vor dem Reiz oder in den ersten 100 ms danach */
  | { type: 'early' }
  /** Doppeltipp direkt nach einer Antwort: ohne Wirkung */
  | { type: 'ignored' }
  | null;

export interface ChoiceSummary {
  trials: number;
  correct: number;
  wrong: number;
  omissions: number;
  early: number;
  /** richtige Antworten an allen Reizen in %, null ohne Reize */
  accuracy: number | null;
  rtMean: number | null;
  rtMedian: number | null;
  /** Streuung der Reaktionszeiten, null bei weniger als 2 richtigen Antworten */
  rtSd: number | null;
  list: ChoiceTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Reize: gleichmäßig auf die Möglichkeiten verteilt (gemischte Runden), `trials` Stück */
export function makeStimuli(trials: number, options: number, rng: Rng): number[] {
  const out: number[] = [];
  while (out.length < trials) out.push(...rng.shuffle(Array.from({ length: options }, (_, i) => i)));
  out.length = trials;
  return out;
}

/** Reine Spiellogik als Zustandsautomat. */
export class ChoiceSession {
  readonly p: ChoiceParams;
  stimuli: number[];
  idx = 0;
  state: ChoiceState = 'idle';
  onsetAt: number | null = null;
  shownAt: number | null = null;
  startedAt: number | null = null;
  endedAt: number | null = null;
  trials: ChoiceTrial[] = [];
  early = 0;
  finished = false;
  private lastResponseAt = -1e9;
  private readonly rng: Rng;

  constructor(p: ChoiceParams, env: { rng: Rng }) {
    this.p = p;
    this.rng = env.rng;
    this.stimuli = makeStimuli(p.trials, p.options, this.rng);
  }

  start(now: number): void {
    this.startedAt = now;
    this.scheduleNext(now);
  }

  private scheduleNext(now: number): void {
    if (this.idx >= this.p.trials) {
      this.state = 'done';
      this.finished = true;
      this.endedAt = now;
      return;
    }
    const lo = this.p.waitMinMs;
    const hi = Math.max(this.p.waitMaxMs, lo);
    this.state = 'wait';
    this.onsetAt = now + lo + this.rng.next() * (hi - lo);
  }

  /** Aktueller Reiz (0 … options-1) oder null, wenn gerade keiner zu sehen ist */
  current(): number | null {
    return this.state === 'show' ? this.stimuli[this.idx] : null;
  }

  /** Pro Bild aufrufen: Reiz erscheinen lassen bzw. nach Ablauf der Antwortzeit als „keine Antwort“ werten */
  update(now: number): void {
    if (this.state === 'wait' && this.onsetAt !== null && now >= this.onsetAt) {
      this.state = 'show';
      this.shownAt = now;
    } else if (this.state === 'show' && this.shownAt !== null && now >= this.shownAt + this.p.stimulusMs) {
      this.trials.push({ nr: this.idx + 1, stimulus: this.stimuli[this.idx], answer: null, outcome: 'omission', rtMs: null });
      this.idx++;
      this.scheduleNext(now);
    }
  }

  /** Antwort mit Taste `option` zur Zeit `now`; null = es läuft keine Sitzung */
  respond(option: number, now: number): ChoiceResponse {
    if (this.state !== 'show' && this.state !== 'wait') return null;
    if (now - this.lastResponseAt >= 0 && now - this.lastResponseAt < DOUBLE_TAP_MS) return { type: 'ignored' };
    if (this.state === 'show' && this.shownAt !== null) {
      const rt = now - this.shownAt;
      if (rt < MIN_RT_MS) {
        this.early++;
        return { type: 'early' };
      }
      const stimulus = this.stimuli[this.idx];
      const correct = option === stimulus;
      this.trials.push({ nr: this.idx + 1, stimulus, answer: option, outcome: correct ? 'correct' : 'wrong', rtMs: Math.round(rt) });
      this.idx++;
      this.lastResponseAt = now;
      this.scheduleNext(now);
      return { type: correct ? 'correct' : 'wrong', rt, stimulus };
    }
    this.early++;
    return { type: 'early' };
  }

  summary(): ChoiceSummary {
    const ok = this.trials.filter((t) => t.outcome === 'correct');
    const rts = ok.map((t) => t.rtMs ?? 0);
    const n = this.trials.length;
    return {
      trials: n,
      correct: ok.length,
      wrong: this.trials.filter((t) => t.outcome === 'wrong').length,
      omissions: this.trials.filter((t) => t.outcome === 'omission').length,
      early: this.early,
      accuracy: n ? round((100 * ok.length) / n, 1) : null,
      rtMean: rts.length ? round(mean(rts), 0) : null,
      rtMedian: rts.length ? round(median(rts), 0) : null,
      rtSd: rts.length >= 2 ? round(sd(rts), 0) : null,
      list: this.trials.slice(),
    };
  }
}

// ---------------------------------------------------------------------------
// Anordnung der Antwort-Tasten

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Antwort-Tasten am unteren Rand: eine Reihe, bei schmaler Bühne (Handy, viele Tasten) zwei Reihen. Jede Taste mindestens
 * `MIN_BUTTON_PX` hoch und breit. `bottom` = Unterkante der untersten Reihe.
 */
export function answerLayout(n: number, left: number, right: number, bottom: number, u: number): Rect[] {
  const count = Math.max(1, Math.round(n));
  const W = Math.max(MIN_BUTTON_PX, right - left);
  const gap = Math.min(16, Math.max(6, u * 1.4));
  let cols = count;
  let per = (W - (cols - 1) * gap) / cols;
  if (per < 64 && count > 2) {
    cols = Math.ceil(count / 2);
    per = (W - (cols - 1) * gap) / cols;
  }
  const rows = Math.ceil(count / cols);
  const bw = Math.max(MIN_BUTTON_PX, Math.min(per, 190));
  const bh = Math.max(MIN_BUTTON_PX, Math.min(130, u * 14));
  const out: Rect[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const inRow = r === rows - 1 ? count - r * cols : cols;
    const rowW = inRow * bw + (inRow - 1) * gap;
    const x0 = left + (W - rowW) / 2;
    out.push({ x: x0 + c * (bw + gap), y: bottom - bh - (rows - 1 - r) * (bh + gap), w: bw, h: bh });
  }
  return out;
}

/** Index der getroffenen Taste (mit `pad` Pixel Toleranz) oder -1; bei Überlappung die nächste Mitte */
export function buttonAt(rects: readonly Rect[], x: number, y: number, pad = 4): number {
  let best = -1;
  let bestD = Infinity;
  rects.forEach((r, i) => {
    if (x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad) {
      const d = Math.hypot(x - (r.x + r.w / 2), y - (r.y + r.h / 2));
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
  });
  return best;
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * viele zu frühe Tipps → warten; viele Fehler → genauer hinsehen; viele verpasste → leichter einstellen;
 * fast fehlerfrei → genau eine Einstellung schwerer; stark schwankende Zeiten → ruhiger.
 */
export function tipFor(s: ChoiceSummary): string {
  if (s.trials === 0 || s.correct === 0) return 'few';
  if (s.early >= 3 && s.early >= 0.15 * s.trials) return 'early';
  if (s.wrong >= 3 && s.wrong >= 0.15 * s.trials) return 'wrong';
  if (s.omissions >= 3 && s.omissions >= 0.15 * s.trials) return 'slow';
  if (s.accuracy !== null && s.accuracy >= 95 && s.trials >= 20) return 'harder';
  if (s.rtMean !== null && s.rtSd !== null && s.correct >= 8 && s.rtSd > 0.35 * s.rtMean) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je richtiger Antwort */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}
