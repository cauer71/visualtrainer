/**
 * Fusion – Bilder verschmelzen (Labor) – reine Logik: Ein Ziel (Kreise mit Mittelpunkt) wird jedem Auge in seiner Farbe
 * gezeigt. Der Versatz der beiden Bilder wird in Prismendioptrien Δ geführt: Er wächst, bis du „Doppelt“ meldest, und
 * schrumpft dann, bis du „Wieder einfach“ meldest. Zeiten in ms (virtuelle Zeit des Runners), keine Darstellung, kein Zufall.
 *
 * Richtung Konvergenz (gekreuzt, das Bild rückt scheinbar näher) oder Divergenz (rückt scheinbar weg), je Richtung mehrere
 * Wiederholungen. Versatzsteuerung `auto`: der Versatz ändert sich mit Δ pro Sekunde, ein Zusatz der Trainerin/des
 * Trainers (Regler) wird daraufgelegt; `trainer`: nur der Regler bestimmt den Versatz (Start = Startversatz). Gemeldet wird
 * immer der Wert, der in diesem Moment angezeigt wird (Anzeige = gleitender Wert). Zusätzlich „Strich fehlt“ je Farbe.
 *
 * Das sind Übungswerte: keine Prismenmessung, keine Prüfung, keine Aussage über Fusionsbreite, keine Normwerte.
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, NumberParamDef, ParamDef, SelectParamDef } from '../../core/types';
import {
  LiveValue,
  P_GLASSES_CHECK,
  P_LEFT_LENS,
  P_RED_LEVEL,
  P_SECOND_LEVEL,
  P_TONES,
  readAnaglyph,
  readNum,
  readSel,
  type AnaglyphSettings,
  type ColorId,
} from '../_shared/anaglyph';

/** Größter Versatz überhaupt (Δ), auch für den Trainer-Regler */
export const HARD_MAX_PD = 40;
/** Größte Änderung des Reglers je Tastendruck (Δ) */
export const LIVE_MAX_JUMP_PD = 2;
export const LIVE_STEP_PD = 0.5;

const P_DIRECTION: SelectParamDef = { key: 'direction', type: 'select', default: 'both', options: ['both', 'convergence', 'divergence'], summary: true };
const P_CONTROL: SelectParamDef = { key: 'control', type: 'select', default: 'auto', options: ['auto', 'trainer'], summary: true };
const P_RAMP: NumberParamDef = { key: 'rampPdPerS', type: 'number', min: 0.5, max: 6, step: 0.5, default: 1.5 };
const P_START: NumberParamDef = { key: 'startPd', type: 'number', min: 0, max: 10, step: 0.5, default: 0 };
const P_MAX: NumberParamDef = { key: 'maxPd', type: 'number', min: 5, max: HARD_MAX_PD, step: 1, default: 25, summary: true };
const P_REPEATS: NumberParamDef = { key: 'repeats', type: 'number', unit: 'count', min: 1, max: 6, step: 1, default: 3, summary: true };
const P_TARGET: NumberParamDef = { key: 'targetCm', type: 'number', unit: 'cm', min: 2, max: 14, step: 0.5, default: 6 };

/** Einstellungen (Texte in texts.ts) */
export const PARAMS: readonly ParamDef[] = [P_DIRECTION, P_CONTROL, P_RAMP, P_START, P_MAX, P_REPEATS, P_TARGET, P_LEFT_LENS, P_TONES, P_RED_LEVEL, P_SECOND_LEVEL, P_GLASSES_CHECK];

export type Direction = 'both' | 'convergence' | 'divergence';
export type Control = 'auto' | 'trainer';

export interface FusionParams extends AnaglyphSettings {
  direction: Direction;
  control: Control;
  /** Änderung des Versatzes in Δ pro Sekunde (nur bei `auto`) */
  rampPdPerS: number;
  /** Versatz zu Beginn jedes Durchgangs (Δ) */
  startPd: number;
  /** Obergrenze des Versatzes (Δ), höchstens 40 */
  maxPd: number;
  repeats: number;
  targetCm: number;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function fusionParams(p: ExerciseParams): FusionParams {
  const num = (d: NumberParamDef) => readNum(p, d);
  const maxPd = Math.min(HARD_MAX_PD, num(P_MAX));
  return {
    ...readAnaglyph(p, false),
    direction: readSel<Direction>(p, P_DIRECTION),
    control: readSel<Control>(p, P_CONTROL),
    rampPdPerS: num(P_RAMP),
    startPd: Math.min(num(P_START), maxPd),
    maxPd,
    repeats: Math.round(num(P_REPEATS)),
    targetCm: num(P_TARGET),
  };
}

// ---------------------------------------------------------------------------
// Ablauf

/** Das Bild bleibt vor jedem Durchgang so lange einfach (ms) */
export const READY_MS = 1500;
/** Schnellmodus (?quick=1): Wiederholungen je Richtung */
export const QUICK_REPEATS = 1;

export type FusionPhase = 'idle' | 'ready' | 'up' | 'down' | 'done';
export type Dir = 'convergence' | 'divergence';

/** Abfolge der Richtungen: je Wiederholung beide (im Wechsel) oder nur die gewählte */
export function directionOrder(direction: Direction, repeats: number): Dir[] {
  const out: Dir[] = [];
  for (let i = 0; i < repeats; i++) {
    if (direction === 'both') out.push('convergence', 'divergence');
    else out.push(direction);
  }
  return out;
}

export interface FusionTrial {
  nr: number;
  direction: Dir;
  /** Versatz, bei dem „Doppelt“ gemeldet wurde (Δ); bei `capped` die Obergrenze */
  breakPd: number;
  /** Versatz, bei dem „Wieder einfach“ gemeldet wurde (Δ); `null` ohne Erholung */
  recoveryPd: number | null;
  /** Obergrenze erreicht, ohne dass „Doppelt“ gemeldet wurde */
  capped: boolean;
  /** Versatz kam auf 0, ohne dass „Wieder einfach“ gemeldet wurde */
  noRecovery: boolean;
  /** Meldungen „Strich fehlt“ in diesem Durchgang: `a` = roter Strich, `b` = Strich der zweiten Farbe */
  missA: number;
  missB: number;
  /** Änderungen durch die Trainerin/den Trainer in diesem Durchgang */
  liveChanges: number;
}

export interface DirSummary {
  /** Durchgänge in dieser Richtung */
  n: number;
  /** Mittel „Doppelt gemeldet bei“ (Δ) über Durchgänge mit Meldung; `null`, wenn keiner */
  breakMean: number | null;
  /** Mittel „Wieder einfach gemeldet bei“ (Δ) über Durchgänge mit Meldung; `null`, wenn keiner */
  recoveryMean: number | null;
  capped: number;
  noRecovery: number;
}

export interface FusionSummary {
  n: number;
  conv: DirSummary;
  div: DirSummary;
  /** Mittel „Doppelt gemeldet bei“ über alle Durchgänge mit Meldung; `null`, wenn keiner */
  breakMean: number | null;
  capped: number;
  noRecovery: number;
  missA: number;
  missB: number;
  liveChanges: number;
  trials: FusionTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

function dirSummary(trials: readonly FusionTrial[], dir: Dir): DirSummary {
  const t = trials.filter((x) => x.direction === dir);
  const br = t.filter((x) => !x.capped).map((x) => x.breakPd);
  const rc = t.filter((x) => x.recoveryPd !== null).map((x) => x.recoveryPd as number);
  return {
    n: t.length,
    breakMean: br.length ? round(mean(br), 1) : null,
    recoveryMean: rc.length ? round(mean(rc), 1) : null,
    capped: t.filter((x) => x.capped).length,
    noRecovery: t.filter((x) => x.noRecovery).length,
  };
}

/** Auswertung aus einer Liste abgeschlossener Durchgänge (auch ohne laufende Sitzung nutzbar, z. B. für Tests) */
export function summarize(trials: readonly FusionTrial[]): FusionSummary {
  const br = trials.filter((x) => !x.capped).map((x) => x.breakPd);
  return {
    n: trials.length,
    conv: dirSummary(trials, 'convergence'),
    div: dirSummary(trials, 'divergence'),
    breakMean: br.length ? round(mean(br), 1) : null,
    capped: trials.filter((x) => x.capped).length,
    noRecovery: trials.filter((x) => x.noRecovery).length,
    missA: trials.reduce((s, x) => s + x.missA, 0),
    missB: trials.reduce((s, x) => s + x.missB, 0),
    liveChanges: trials.reduce((s, x) => s + x.liveChanges, 0),
    trials: trials.slice(),
  };
}

export interface FusionEnv {
  /** Trainer-Regler steht zur Verfügung (Trainer-Ansicht oder Autoplay als Trainer); sonst läuft `trainer` wie `auto` */
  trainerAvailable: boolean;
  readyMs?: number;
}

/**
 * Reine Spiellogik als Zustandsautomat. Der Versatz (`shift`) ist der Wert, der gerade angezeigt wird; er setzt sich aus dem
 * automatischen Teil (`base`, nur bei `auto`) und dem gleitenden Wert des Trainer-Reglers (`live`) zusammen.
 *
 * - `auto`: `shift = base + live.shown` (Zusatz, −Obergrenze … +Obergrenze), auf 0 … Obergrenze begrenzt. Der Zusatz beginnt in
 *   jedem Durchgang bei 0.
 * - `trainer`: `shift = live.shown` (Wert selbst, 0 … Obergrenze); jeder Durchgang beginnt beim Startversatz.
 */
export class FusionSession {
  readonly p: FusionParams;
  readonly order: Dir[];
  /** Es gilt wirklich der Regler allein (`control: trainer` und Regler verfügbar) */
  readonly trainerMode: boolean;
  readonly live: LiveValue;
  phase: FusionPhase = 'idle';
  idx = 0;
  /** Automatischer Teil des Versatzes (Δ), nur bei `auto` */
  base = 0;
  /** Obergrenze, die der Bildschirm zulässt (Δ); kleiner als `maxPd`, wenn die Bühne zu eng ist */
  limitPd: number;
  trials: FusionTrial[] = [];
  finished = false;
  startedAt: number | null = null;
  endedAt: number | null = null;
  private phaseAt = 0;
  private lastT = 0;
  private breakPd: number | null = null;
  private capped = false;
  private missA = 0;
  private missB = 0;
  private liveAtStart = 0;
  private readonly readyMs: number;

  constructor(p: FusionParams, env: FusionEnv) {
    this.p = p;
    this.order = directionOrder(p.direction, p.repeats);
    this.trainerMode = p.control === 'trainer' && env.trainerAvailable;
    this.readyMs = env.readyMs ?? READY_MS;
    this.limitPd = p.maxPd;
    this.live = new LiveValue({
      start: this.trainerMode ? p.startPd : 0,
      min: this.trainerMode ? 0 : -p.maxPd,
      max: p.maxPd,
      maxJump: LIVE_MAX_JUMP_PD,
    });
  }

  /** Größter Versatz, der jetzt gezeigt werden darf (Δ): Obergrenze der Einstellung, ggf. durch die Bühne kleiner */
  get capPd(): number {
    return Math.min(this.p.maxPd, this.limitPd);
  }

  /** Versatz, der gerade angezeigt wird (Δ) */
  get shift(): number {
    const raw = this.trainerMode ? this.live.shown : this.base + this.live.shown;
    return Math.min(this.capPd, Math.max(0, raw));
  }

  /** Versatz, auf den der Regler gerade zielt (Δ), zum Anzeigen im Regler: Gesamtwert bei Zusatz, sonst der Wert selbst */
  get targetShift(): number {
    const raw = this.trainerMode ? this.live.target : this.base + this.live.target;
    return Math.min(this.capPd, Math.max(0, raw));
  }

  get dir(): Dir {
    return this.order[Math.min(this.idx, this.order.length - 1)] ?? 'convergence';
  }

  start(now: number): void {
    this.startedAt = now;
    this.lastT = now;
    this.begin(now);
  }

  private begin(now: number): void {
    if (this.idx >= this.order.length) {
      this.finished = true;
      this.endedAt = now;
      this.phase = 'done';
      return;
    }
    this.base = this.trainerMode ? 0 : this.p.startPd;
    // Zusatz beginnt bei 0 (auto) bzw. Startversatz (trainer); die Anzeige gleitet dorthin
    this.live.aim(this.trainerMode ? this.p.startPd : 0);
    this.phase = 'ready';
    this.phaseAt = now;
    this.breakPd = null;
    this.capped = false;
    this.missA = 0;
    this.missB = 0;
    this.liveAtStart = this.live.log.length;
  }

  /** Zeit fortschreiben (`now` in ms). Erster Aufruf nach `start` legt die Zeitbasis fest. */
  update(now: number): void {
    if (this.startedAt === null || this.finished) return;
    const dt = Math.min(0.1, Math.max(0, (now - this.lastT) / 1000));
    this.lastT = now;
    this.live.update(dt);
    if (this.phase === 'ready') {
      if (now - this.phaseAt >= this.readyMs && this.live.settled) {
        this.phase = 'up';
        this.phaseAt = now;
      }
    } else if (this.phase === 'up') {
      if (!this.trainerMode) this.base += this.p.rampPdPerS * dt;
      if (this.shift >= this.capPd - 1e-6) {
        // Obergrenze erreicht, ohne „Doppelt“: der Versatz geht zurück
        this.breakPd = this.capPd;
        this.capped = true;
        this.phase = 'down';
        this.phaseAt = now;
      }
    } else if (this.phase === 'down') {
      if (!this.trainerMode) {
        this.base -= this.p.rampPdPerS * dt;
        if (this.base <= 0) {
          this.base = 0;
          this.endTrial(now, null, true);
        }
      } else if (this.live.shown <= 1e-6 && this.live.target <= 1e-6) {
        this.endTrial(now, null, true);
      }
    }
  }

  /** Das Bild ist doppelt geworden: der angezeigte Versatz wird gespeichert, danach geht er zurück */
  reportDouble(now: number): { pd: number } | null {
    if (this.phase !== 'up') return null;
    this.breakPd = this.shift;
    this.phase = 'down';
    this.phaseAt = now;
    return { pd: this.breakPd };
  }

  /** Das Bild ist wieder einfach: der angezeigte Versatz wird gespeichert, der Durchgang endet */
  reportSingle(now: number): { pd: number } | null {
    if (this.phase !== 'down') return null;
    const rec = this.shift;
    this.endTrial(now, rec, false);
    return { pd: rec };
  }

  /** Einer der beiden Kontrollstriche fehlt (`a` = roter Strich, `b` = Strich der zweiten Farbe) */
  reportMissing(color: ColorId): boolean {
    if (this.phase !== 'ready' && this.phase !== 'up' && this.phase !== 'down') return false;
    if (color === 'a') this.missA++;
    else this.missB++;
    return true;
  }

  /** Trainer-Regler: Wunschwert (Zusatz bei `auto`, Versatz bei `trainer`); `null`, wenn nichts geändert wurde */
  setLive(value: number, now: number): number | null {
    if (this.startedAt === null || this.finished) return null;
    return this.live.set(value, now, Math.min(this.idx + 1, this.order.length), (target) => {
      const raw = this.trainerMode ? target : this.base + target;
      return Math.min(this.capPd, Math.max(0, raw));
    });
  }

  private endTrial(now: number, rec: number | null, noRecovery: boolean): void {
    this.trials.push({
      nr: this.idx + 1,
      direction: this.dir,
      breakPd: round(this.breakPd ?? 0, 2) ?? 0,
      recoveryPd: rec === null ? null : round(rec, 2),
      capped: this.capped,
      noRecovery,
      missA: this.missA,
      missB: this.missB,
      liveChanges: this.live.log.length - this.liveAtStart,
    });
    this.idx++;
    this.begin(now);
  }

  summary(): FusionSummary {
    return summarize(this.trials);
  }
}

/** Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`); eigene Faustregeln, keine Normwerte, keine Diagnose */
export function tipFor(s: FusionSummary): string {
  if (s.n === 0) return 'few';
  if (s.noRecovery > 0 && s.noRecovery >= Math.ceil(s.n / 2)) return 'noRecovery';
  if (s.capped > 0 && s.capped >= Math.ceil(s.n / 2)) return 'capped';
  if (s.missA + s.missB > 0) return 'strokes';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Übung): 10 je abgeschlossenem Durchgang */
export function pointsFor(n: number): number {
  return Math.max(0, Math.round(n)) * 10;
}
