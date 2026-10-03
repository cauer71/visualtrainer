/**
 * Tiefe sehen – Zufallspunkte (Labor) – reine Logik: In einem Feld aus Zufallspunkten schwebt ein Quadrat vor oder hinter der
 * Fläche; du gibst an, wo es liegt (oben, unten, links, rechts). Die Punktbilder beider Augen werden in Rot und Grün (oder Cyan,
 * Blau) übereinandergelegt. Die Tiefe (Disparität) steht in Winkelsekunden und wird mit der Sehentfernung der Kalibrierung in
 * Zentimeter und Pixel umgerechnet. Zeiten in ms (virtuelle Zeit des Runners), Zufall nur über `Rng`, keine Darstellung.
 *
 * Disparitätssteuerung: `adaptive` (Stufenverfahren: nach zwei richtigen Antworten kleiner, nach jedem Fehler größer), `fixed`
 * (immer der Startwert) oder `trainer` (nur der Trainer-Regler bestimmt die Disparität, Start = Startwert). Bei `adaptive` und
 * `fixed` legt der Regler einen Zusatz darauf. Der Bildschirm löst nur ganze Pixel auf: Die feinste Stufe ist die Disparität
 * eines Pixels (`pixelArcsec`) und steht im Ergebnis.
 *
 * Das sind Übungswerte: keine Messung einer Stereoschwelle, keine Aussage über Sehschärfe oder Stereosehen, keine Normwerte.
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, NumberParamDef, ParamDef, SelectParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { makeValueStaircase, type ValueStaircase } from '../_shared/labor-adaptive';
import {
  arcsecToCm,
  LiveValue,
  P_GLASSES_CHECK,
  P_LEFT_LENS,
  P_RED_LEVEL,
  P_SECOND_LEVEL,
  P_TONES,
  pixelArcsec,
  readAnaglyph,
  readNum,
  readSel,
  type AnaglyphSettings,
} from '../_shared/anaglyph';

/** Kleinste und größte Disparität (Winkelsekunden) */
export const MIN_ARCSEC = 20;
export const MAX_ARCSEC = 3600;
/** Trainer-Regler: Schritt, grober Schritt und größte Änderung je Tastendruck (Winkelsekunden) */
export const LIVE_STEP_ARCSEC = 100;
export const LIVE_COARSE_ARCSEC = 400;

const P_TRIALS: NumberParamDef = { key: 'trials', type: 'number', unit: 'count', min: 8, max: 80, step: 2, default: 24, summary: true };
const P_START: NumberParamDef = { key: 'startArcsec', type: 'number', min: MIN_ARCSEC, max: MAX_ARCSEC, step: 20, default: 600, summary: true };
const P_CONTROL: SelectParamDef = { key: 'control', type: 'select', default: 'adaptive', options: ['adaptive', 'fixed', 'trainer'], summary: true };
const P_FIELD: NumberParamDef = { key: 'fieldCm', type: 'number', unit: 'cm', min: 8, max: 26, step: 1, default: 14 };
const P_REGION: NumberParamDef = { key: 'regionCm', type: 'number', unit: 'cm', min: 2, max: 10, step: 0.5, default: 5 };
const P_DOTS: NumberParamDef = { key: 'dots', type: 'number', unit: 'count', min: 150, max: 1500, step: 50, default: 600 };
const P_DOT_CM: NumberParamDef = { key: 'dotCm', type: 'number', unit: 'cm', min: 0.1, max: 0.6, step: 0.05, default: 0.25 };
const P_NOISE: SelectParamDef = { key: 'noise', type: 'select', default: 'on', options: ['on', 'off'] };

/** Einstellungen (Texte in texts.ts) */
export const PARAMS: readonly ParamDef[] = [P_TRIALS, P_START, P_CONTROL, P_FIELD, P_REGION, P_DOTS, P_DOT_CM, P_NOISE, P_LEFT_LENS, P_TONES, P_RED_LEVEL, P_SECOND_LEVEL, P_GLASSES_CHECK];

export type Control = 'adaptive' | 'fixed' | 'trainer';

export interface StereoParams extends AnaglyphSettings {
  trials: number;
  startArcsec: number;
  control: Control;
  fieldCm: number;
  regionCm: number;
  dots: number;
  dotCm: number;
  noise: boolean;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function stereoParams(p: ExerciseParams): StereoParams {
  return {
    ...readAnaglyph(p, false),
    trials: Math.round(readNum(p, P_TRIALS)),
    startArcsec: readNum(p, P_START),
    control: readSel<Control>(p, P_CONTROL),
    fieldCm: readNum(p, P_FIELD),
    regionCm: readNum(p, P_REGION),
    dots: Math.round(readNum(p, P_DOTS)),
    dotCm: readNum(p, P_DOT_CM),
    noise: readSel<'on' | 'off'>(p, P_NOISE) === 'on',
  };
}

// ---------------------------------------------------------------------------
// Szene

export type Location = 'up' | 'down' | 'left' | 'right';
export const LOCATIONS: readonly Location[] = ['up', 'down', 'left', 'right'];
const OFFSET: Record<Location, readonly [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

/** Zufallsniveau bei vier Möglichkeiten (%) */
export const CHANCE_PCT = 25;
/** Rückmeldung nach der Antwort (ms) */
export const FEEDBACK_MS = 700;
/** Schnellmodus (?quick=1): Zahl der Durchgänge */
export const QUICK_TRIALS = 4;

/** Ein Punkt: Lage in cm relativ zur Feldmitte, ob er im schwebenden Quadrat liegt, und sein Zufallsanteil `k` (−1…1) fürs Rauschen */
export interface Dot {
  x: number;
  y: number;
  inside: boolean;
  k: number;
}

export interface Scene {
  dots: Dot[];
  /** Mitte und Kantenlänge des Quadrats (cm, relativ zur Feldmitte) */
  region: { x: number; y: number; size: number };
}

/** Kantenlänge des Quadrats (cm): höchstens 60 % des Feldes, damit es in jeder der vier Lagen Platz hat */
export function regionSize(fieldCm: number, regionCm: number): number {
  return Math.min(regionCm, fieldCm * 0.6);
}

/** Zufallspunkte im Feld und Lage des Quadrats (die Disparität wird erst beim Zeichnen angelegt) */
export function makeScene(rng: Rng, p: Pick<StereoParams, 'fieldCm' | 'regionCm' | 'dots'>, location: Location): Scene {
  const half = p.fieldCm / 2;
  const size = regionSize(p.fieldCm, p.regionCm);
  const r = size / 2;
  const off = OFFSET[location];
  const cx = off[0] * (half - r - 0.3);
  const cy = off[1] * (half - r - 0.3);
  const dots: Dot[] = [];
  for (let i = 0; i < p.dots; i++) {
    const x = (rng.next() * 2 - 1) * half;
    const y = (rng.next() * 2 - 1) * half;
    const inside = Math.abs(x - cx) <= r && Math.abs(y - cy) <= r;
    dots.push({ x, y, inside, k: rng.next() * 2 - 1 });
  }
  return { dots, region: { x: cx, y: cy, size } };
}

/**
 * Versatz des Punktes zwischen den beiden Augenbildern in cm (positiv = gekreuzt: das Bild des linken Auges liegt rechts vom
 * Bild des rechten Auges, der Punkt erscheint näher). Punkte im Quadrat haben `sign × dcm`, der Hintergrund hat bei
 * Rauschen zufällig zwischen −2 und +2 mal `dcm` und sonst 0.
 */
export function dotDisparityCm(d: Dot, sign: 1 | -1, dcm: number, noise: boolean): number {
  if (d.inside) return sign * dcm;
  return noise ? d.k * 2 * dcm : 0;
}

// ---------------------------------------------------------------------------
// Ablauf

export type StereoPhase = 'idle' | 'show' | 'feedback' | 'done';

export interface StereoTrial {
  nr: number;
  location: Location;
  answer: Location;
  /** `near` = das Quadrat schwebte vor der Fläche, `far` = dahinter */
  depth: 'near' | 'far';
  correct: boolean;
  /** Disparität, die beim Antworten angezeigt wurde (Winkelsekunden) */
  arcsec: number;
  rtMs: number;
  /** Änderungen durch die Trainerin/den Trainer während dieses Durchgangs */
  liveChanges: number;
}

export interface StereoSummary {
  n: number;
  correct: number;
  /** Anteil richtig in %, null ohne Durchgang */
  accuracy: number | null;
  rtMean: number | null;
  /** Disparität des letzten Durchgangs (Winkelsekunden), null ohne Durchgang */
  finalArcsec: number | null;
  /** Kleinste und größte gezeigte Disparität */
  minArcsec: number | null;
  maxArcsec: number | null;
  /** Anteil richtig bei Zufallsniveau 25 % ist nicht weit entfernt (nur mit ≥ 12 Durchgängen) */
  nearChance: boolean;
  liveChanges: number;
  trials: StereoTrial[];
}

export function round(x: number | null | undefined, d = 0): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Auswertung aus einer Liste gewerteter Durchgänge (auch ohne laufende Sitzung nutzbar, z. B. für Tests) */
export function summarize(trials: readonly StereoTrial[]): StereoSummary {
  const n = trials.length;
  const correct = trials.filter((t) => t.correct).length;
  const arcs = trials.map((t) => t.arcsec);
  const accuracy = n ? round((100 * correct) / n, 1) : null;
  return {
    n,
    correct,
    accuracy,
    rtMean: n ? round(mean(trials.map((t) => t.rtMs)), 0) : null,
    finalArcsec: n ? trials[n - 1].arcsec : null,
    minArcsec: n ? Math.min(...arcs) : null,
    maxArcsec: n ? Math.max(...arcs) : null,
    nearChance: n >= 12 && accuracy !== null && accuracy <= CHANCE_PCT + 10,
    liveChanges: trials.reduce((s, t) => s + t.liveChanges, 0),
    trials: trials.slice(),
  };
}

export interface StereoEnv {
  rng: Rng;
  /** Sehentfernung und Pixel je cm aus der Kalibrierung (für die feinste Stufe des Bildschirms) */
  distCm: number;
  pxPerCm: number;
  /** Trainer-Regler steht zur Verfügung (Trainer-Ansicht oder Autoplay als Trainer); sonst läuft `trainer` wie `fixed` */
  trainerAvailable: boolean;
  feedbackMs?: number;
}

/**
 * Reine Spiellogik als Zustandsautomat. Die angezeigte Disparität (`arcsec`) setzt sich aus dem automatischen Teil (`base`:
 * Stufenverfahren oder fester Startwert) und dem gleitenden Wert des Trainer-Reglers (`live`) zusammen:
 * - `adaptive` / `fixed`: `arcsec = base + Zusatz`, auf 20 … 3600 begrenzt
 * - `trainer`: `arcsec = Reglerwert`, 0 … 3600 (Start = Startwert)
 */
export class StereoSession {
  readonly p: StereoParams;
  readonly trainerMode: boolean;
  readonly live: LiveValue;
  readonly stair: ValueStaircase | null;
  readonly pixelArcsec: number;
  phase: StereoPhase = 'idle';
  idx = 0;
  location: Location = 'up';
  sign: 1 | -1 = 1;
  scene: Scene | null = null;
  trials: StereoTrial[] = [];
  finished = false;
  startedAt: number | null = null;
  endedAt: number | null = null;
  private phaseAt = 0;
  private lastT = 0;
  private liveAtStart = 0;
  private readonly rng: Rng;
  private readonly env: StereoEnv;
  private readonly feedbackMs: number;

  constructor(p: StereoParams, env: StereoEnv) {
    this.p = p;
    this.env = env;
    this.rng = env.rng;
    this.feedbackMs = env.feedbackMs ?? FEEDBACK_MS;
    this.trainerMode = p.control === 'trainer' && env.trainerAvailable;
    this.stair = p.control === 'adaptive' ? makeValueStaircase({ start: p.startArcsec, min: MIN_ARCSEC, max: MAX_ARCSEC, factorHarder: 0.8, factorEasier: 1.25, needCorrect: 2 }) : null;
    this.live = new LiveValue({
      start: this.trainerMode ? p.startArcsec : 0,
      min: this.trainerMode ? 0 : -MAX_ARCSEC,
      max: MAX_ARCSEC,
      maxJump: LIVE_COARSE_ARCSEC,
    });
    this.pixelArcsec = pixelArcsec(env.distCm, env.pxPerCm);
  }

  /** Automatischer Teil der Disparität (Winkelsekunden): Stufenverfahren oder fester Startwert */
  get base(): number {
    return this.trainerMode ? 0 : this.stair ? this.stair.value() : this.p.startArcsec;
  }

  private clampArcsec(raw: number): number {
    return Math.min(MAX_ARCSEC, Math.max(this.trainerMode ? 0 : MIN_ARCSEC, raw));
  }

  /** Disparität, die gerade angezeigt wird (Winkelsekunden) */
  get arcsec(): number {
    return this.clampArcsec(this.trainerMode ? this.live.shown : this.base + this.live.shown);
  }

  /** Disparität, auf die der Regler gerade zielt (Winkelsekunden) */
  get targetArcsec(): number {
    return this.clampArcsec(this.trainerMode ? this.live.target : this.base + this.live.target);
  }

  /** Versatz der Augenbilder bei der angezeigten Disparität in cm */
  get disparityCm(): number {
    return arcsecToCm(this.arcsec, this.env.distCm);
  }

  start(now: number): void {
    this.startedAt = now;
    this.lastT = now;
    this.begin(now);
  }

  private begin(now: number): void {
    if (this.idx >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.phase = 'done';
      return;
    }
    this.location = this.rng.pick(LOCATIONS);
    this.sign = this.rng.chance(0.5) ? 1 : -1;
    this.scene = makeScene(this.rng, this.p, this.location);
    this.phase = 'show';
    this.phaseAt = now;
    this.liveAtStart = this.live.log.length;
  }

  update(now: number): void {
    if (this.startedAt === null || this.finished) return;
    const dt = Math.min(0.1, Math.max(0, (now - this.lastT) / 1000));
    this.lastT = now;
    this.live.update(dt);
    if (this.phase === 'feedback' && now - this.phaseAt >= this.feedbackMs) {
      this.idx++;
      this.begin(now);
    }
  }

  /** Antwort: Lage des Quadrats; `null`, wenn gerade keine Antwort möglich ist (nur eine Antwort je Durchgang) */
  answer(loc: Location, now: number): StereoTrial | null {
    if (this.phase !== 'show') return null;
    const correct = loc === this.location;
    const trial: StereoTrial = {
      nr: this.idx + 1,
      location: this.location,
      answer: loc,
      depth: this.sign > 0 ? 'near' : 'far',
      correct,
      arcsec: Math.round(this.arcsec),
      rtMs: Math.round(now - this.phaseAt),
      liveChanges: this.live.log.length - this.liveAtStart,
    };
    this.trials.push(trial);
    this.stair?.record(correct);
    this.phase = 'feedback';
    this.phaseAt = now;
    return trial;
  }

  /** Zuletzt gewertete Antwort (während der Rückmeldung) */
  get last(): StereoTrial | null {
    return this.trials.length ? this.trials[this.trials.length - 1] : null;
  }

  /** Trainer-Regler: Wunschwert (Zusatz bei `adaptive`/`fixed`, Disparität bei `trainer`); `null`, wenn nichts geändert wurde */
  setLive(value: number, now: number): number | null {
    if (this.startedAt === null || this.finished) return null;
    return this.live.set(value, now, Math.min(this.idx + 1, this.p.trials), (target) => this.clampArcsec(this.trainerMode ? target : this.base + target));
  }

  summary(): StereoSummary {
    return summarize(this.trials);
  }
}

/** Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`); eigene Faustregeln, keine Normwerte, keine Diagnose */
export function tipFor(s: StereoSummary): string {
  if (s.n === 0) return 'few';
  if (s.nearChance) return 'chance';
  if (s.n >= 12 && (s.accuracy ?? 0) >= 90) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Übung): 10 je richtiger Antwort */
export function pointsFor(correct: number): number {
  return Math.max(0, Math.round(correct)) * 10;
}
