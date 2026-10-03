/**
 * Richtungen – reine Logik (aus `DirectionSession` im Labor-Prototyp, ex/directions.js; erbt wie dort von `ChoiceSession`
 * aus `labor-wahlreaktion/logic.ts`).
 *
 * Ein Pfeil zeigt in eine von 4 oder 8 Richtungen (0 = oben, im Uhrzeigersinn). Gefragt ist die Richtung des Pfeils oder die
 * Gegenrichtung. Zwei Eingabearten: Berührung auf einem Richtungsfeld oder Hilfsperson (die übende Person führt die Bewegung
 * mit dem Körper aus, die Hilfsperson tippt „Richtig“ oder „Falsch“). Die App liest nichts von einer Plattform aus. Zeiten in ms
 * (virtuelle Zeit), Zufall nur über `Rng`.
 *
 * Abweichungen vom Prototyp:
 * - Bei Berührung wird die wirklich getippte Richtung gespeichert (der Prototyp setzte bei Fehlern eine feste Ersatzrichtung ein).
 * - Mit Hilfsperson gilt mindestens 1,5 s Antwortzeit je Pfeil: eine Körperbewegung mit anschließender Bestätigung ist in
 *   0,5 s nicht zu schaffen (Prototyp: ab 0,5 s einstellbar).
 * - Zusätzlich eine Auswertung der Zeit je Richtung (Zählwerte, keine Wertung).
 * - Die Prüfung „zu früh“ (< 100 ms nach dem Pfeil) und der Schutz vor Doppeltipps (350 ms) stammen aus `ChoiceSession`.
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { ChoiceSession, type ChoiceParams, type ChoiceResponse, type ChoiceSummary, round } from '../labor-wahlreaktion/logic';

export { round };

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 10, max: 120, step: 2, default: 32 },
  { key: 'directions', type: 'select', default: '4', options: ['4', '8'], summary: true },
  { key: 'rule', type: 'select', default: 'same', options: ['same', 'opposite'], summary: true },
  { key: 'input', type: 'select', default: 'touch', options: ['touch', 'helper'], summary: true },
  { key: 'stimulusMs', type: 'number', unit: 'ms', min: 500, max: 8000, step: 100, default: 2500 },
  { key: 'waitMinMs', type: 'number', unit: 'ms', min: 300, max: 3000, step: 100, default: 800 },
  { key: 'waitMaxMs', type: 'number', unit: 'ms', min: 300, max: 5000, step: 100, default: 2000 },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 3, max: 16, step: 0.5, default: 8 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type Rule = 'same' | 'opposite';
export type InputKind = 'touch' | 'helper';

export interface DirectionParams {
  trials: number;
  directions: 4 | 8;
  rule: Rule;
  input: InputKind;
  stimulusMs: number;
  waitMinMs: number;
  waitMaxMs: number;
  sizeCm: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function directionParams(p: ExerciseParams): DirectionParams {
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
    directions: sel<'4' | '8'>('directions', ['4', '8'], '4') === '8' ? 8 : 4,
    rule: sel<Rule>('rule', ['same', 'opposite'], 'same'),
    input: sel<InputKind>('input', ['touch', 'helper'], 'touch'),
    stimulusMs: num('stimulusMs'),
    waitMinMs: num('waitMinMs'),
    waitMaxMs: num('waitMaxMs'),
    sizeCm: num('sizeCm'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** Mit Hilfsperson mindestens so viele ms Antwortzeit (Körperbewegung plus Bestätigung) */
export const HELPER_MIN_STIMULUS_MS = 1500;
/** Schnellmodus (?quick=1): Anzahl der Pfeile und längste Wartezeit */
export const QUICK_TRIALS = 6;
export const QUICK_WAIT_MAX_MS = 1000;

/** Antwortzeit je Pfeil, wie sie wirklich gilt */
export function effectiveStimulusMs(p: Pick<DirectionParams, 'input' | 'stimulusMs'>): number {
  return p.input === 'helper' ? Math.max(p.stimulusMs, HELPER_MIN_STIMULUS_MS) : p.stimulusMs;
}

/** Richtung des Pfeils (0 = oben, im Uhrzeigersinn) → Winkel in Radiant (0 = nach oben gezeichnet) */
export function dirAngle(dir: number, n: number): number {
  return (dir * 2 * Math.PI) / n;
}

export interface DirectionTrialInfo {
  nr: number;
  stimulus: number;
  rtMs: number | null;
  correct: boolean;
}

/** Wie die Wahlreaktion, aber mit Richtungsabbildung (gleich oder entgegengesetzt). */
export class DirectionSession extends ChoiceSession {
  readonly dp: DirectionParams;
  readonly n: number;

  constructor(p: DirectionParams, env: { rng: Rng }) {
    const cp: ChoiceParams = {
      trials: p.trials,
      options: p.directions,
      stimulus: 'shape',
      stimulusMs: effectiveStimulusMs(p),
      waitMinMs: p.waitMinMs,
      waitMaxMs: p.waitMaxMs,
      sizeCm: p.sizeCm,
      sound: p.sound,
    };
    super(cp, env);
    this.dp = p;
    this.n = p.directions;
  }

  /** Richtige Antwort zum Pfeil `stim` */
  expectedFor(stim: number): number {
    return this.dp.rule === 'opposite' ? (stim + this.n / 2) % this.n : stim;
  }

  /** Eine sicher falsche Richtung zum Pfeil `stim` (für die Weitergabe an `ChoiceSession`) */
  wrongFor(stim: number): number {
    return (stim + 1) % this.n;
  }

  /** Berührung des Feldes `option` (Richtung 0 … n−1) */
  respondDir(option: number, now: number): ChoiceResponse {
    const stim = this.current();
    if (stim === null) return this.respond(option, now); // zu früh oder Doppeltipp: Richtung spielt keine Rolle
    const exp = this.expectedFor(stim);
    // Weitergabe so, dass `ChoiceSession` genau dann „richtig“ sagt, wenn die Richtung stimmt
    const pass = option === exp ? stim : option !== stim ? option : this.wrongFor(stim);
    const res = this.respond(pass, now);
    if (res && (res.type === 'correct' || res.type === 'wrong')) this.trials[this.trials.length - 1].answer = option;
    return res;
  }

  /** Hilfsperson: „Richtig“ (true) oder „Falsch“ (false) */
  respondHelper(correct: boolean, now: number): ChoiceResponse {
    const stim = this.current();
    if (stim === null) return this.respond(0, now);
    const res = this.respond(correct ? stim : this.wrongFor(stim), now);
    if (res && (res.type === 'correct' || res.type === 'wrong')) this.trials[this.trials.length - 1].answer = correct ? this.expectedFor(stim) : -1;
    return res;
  }
}

export interface DirectionRow {
  /** Richtung 0 … n−1 */
  dir: number;
  /** richtige Antworten in dieser Richtung */
  n: number;
  /** Zahl der Pfeile in dieser Richtung (alle Antworten und verpassten) */
  of: number;
  /** mittlere Zeit der richtigen Antworten in ms (null ohne richtige Antwort) */
  rtMean: number | null;
}

/** Je Richtung des Pfeils: Zahl der Pfeile, richtige Antworten, mittlere Zeit */
export function perDirection(s: ChoiceSummary, n: number): DirectionRow[] {
  const rows: DirectionRow[] = [];
  for (let d = 0; d < n; d++) {
    const t = s.list.filter((x) => x.stimulus === d);
    const ok = t.filter((x) => x.outcome === 'correct');
    const rts = ok.map((x) => x.rtMs ?? 0);
    rows.push({ dir: d, n: ok.length, of: t.length, rtMean: rts.length ? round(mean(rts), 0) : null });
  }
  return rows.filter((r) => r.of > 0);
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * viele zu frühe Tipps → warten; viele Fehler → langsamer, genauer; viele verpasste → leichter einstellen; fast fehlerfrei →
 * genau eine Einstellung schwerer; stark schwankende Zeiten → ruhiger.
 */
export function tipFor(s: ChoiceSummary, input: InputKind): string {
  if (s.trials === 0 || s.correct === 0) return 'few';
  if (s.early >= 3 && s.early >= 0.15 * s.trials) return 'early';
  if (s.wrong >= 3 && s.wrong >= 0.15 * s.trials) return 'wrong';
  if (s.omissions >= 3 && s.omissions >= 0.15 * s.trials) return 'slow';
  if (s.accuracy !== null && s.accuracy >= 95 && s.trials >= 20) return 'harder';
  if (input === 'helper') return 'helper';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je richtiger Antwort */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}

// ---------------------------------------------------------------------------
// Anordnung auf der Bühne (reine Rechnung, damit sie ohne Browser prüfbar ist)

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DirLayout {
  /** Mitte und Länge des Pfeils in px */
  arrow: { cx: number; cy: number; size: number };
  /** Mitte der Zeile mit der Aufgabe (Richtung oder Gegenrichtung) */
  label: { cx: number; cy: number };
  /** Berührungsfeld: Mitten und Kantenlänge der n Tasten (leer mit Hilfsperson) */
  pad: { centers: Array<{ x: number; y: number }>; size: number };
  /** Platz unter dem Pfeil, den die Hilfsperson-Tasten belegen dürfen (Oberkante) – nur mit Hilfsperson */
  helperTop: number;
}

/**
 * Teilt das Spielfeld `f` auf: oben die Aufgabenzeile, darunter der Pfeil, unten das Richtungsfeld (Kreis aus n Tasten) bzw.
 * die Tasten der Hilfsperson (`helperH` = Höhe samt Abstand). Tasten des Richtungsfelds sind mindestens `minBtn` groß
 * (56 px; im Intro-Film kleiner) und überlappen nie (Kreisradius ≥ Kantenlänge / (2 · sin(π/n)) + Abstand).
 */
export function directionLayout(f: Box, n: number, input: InputKind, arrowPx: number, helperH: number, u: number, minBtn: number): DirLayout {
  const labelH = Math.max(minBtn * 0.5, Math.min(40, u * 6));
  const cx = f.x + f.w / 2;
  const gap = Math.max(6, u * 1.2);
  let zone: number;
  let pad: DirLayout['pad'] = { centers: [], size: 0 };
  if (input === 'helper') {
    zone = helperH;
  } else {
    let bs = Math.min(96, Math.max(minBtn, u * 13));
    const sinHalf = Math.sin(Math.PI / n);
    const needR = (b: number): number => (b + gap) / (2 * sinHalf);
    // gewünscht: knapp die Hälfte der Feldhöhe; begrenzt durch die Breite
    let R = Math.min((f.h * 0.46 - bs - gap) / 2, (f.w - bs) / 2 - 4);
    if (R < needR(bs)) {
      // zu eng: erst die Tasten verkleinern (nicht unter minBtn), dann den Kreis vergrößern
      bs = Math.max(minBtn, Math.min(bs, 2 * R * sinHalf - gap));
      R = Math.max(R, needR(bs));
    }
    R = Math.min(R, Math.max(needR(bs), (f.w - bs) / 2 - 2));
    zone = 2 * R + bs + gap;
    const cy = f.y + f.h - zone / 2;
    const centers = Array.from({ length: n }, (_, i) => {
      const a = (i * 2 * Math.PI) / n;
      return { x: cx + Math.sin(a) * R, y: cy - Math.cos(a) * R };
    });
    pad = { centers, size: bs };
  }
  const arrowTop = f.y + labelH;
  const arrowH = Math.max(40, f.h - zone - labelH - gap);
  const size = Math.max(32, Math.min(arrowPx, arrowH * 0.92, f.w * 0.92));
  return {
    arrow: { cx, cy: arrowTop + arrowH / 2, size },
    label: { cx, cy: f.y + labelH / 2 },
    pad,
    helperTop: f.y + f.h - zone,
  };
}
