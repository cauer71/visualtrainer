/**
 * Orts-Projektion (Labor) – reine Logik. Funktionsübung: Ein Punkt erscheint kurz (während du ein Kreuz in der Mitte ansiehst)
 * und verschwindet. Nach einer einstellbaren Wartezeit tippst du auf die Stelle, wo er war. Gespeichert werden Übungswerte:
 * Abstand der Antwort vom Ort (cm und Sehwinkel), die mittlere seitliche und senkrechte Verschiebung der Antworten und ihre
 * Streuung. Die App deutet nichts als Befund und kennt keine Richtwerte.
 *
 * Ablauf eines Punktes: Kreuz (`FIX_MS`) → Punkt (`flashMs`) → Wartezeit (`delayMs`, falls > 0) → Antwort → Rückmeldung.
 * Orte werden als Anteile des Feldes gespeichert (0…1), damit eine gedrehte Bühne denselben Ort zeigt; Abstände in cm rechnet
 * die Darstellung aus den Pixeln. Zeiten in ms (virtuelle Uhr), Zufall nur über `Rng`.
 */
import { mean, sd } from '../../core/stats';
import type { Rng } from '../../core/rng';
import type { ExerciseParams, ParamDef } from '../../core/types';

export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 6, max: 60, step: 2, default: 20, summary: true },
  { key: 'flashMs', type: 'number', unit: 'ms', min: 100, max: 2000, step: 50, default: 300, summary: true },
  { key: 'delayMs', type: 'number', unit: 'ms', min: 0, max: 5000, step: 250, default: 0 },
  { key: 'zone', type: 'select', default: 'all', options: ['all', 'periphery'] },
  { key: 'showTarget', type: 'select', default: 'yes', options: ['yes', 'no'] },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 0.5, max: 3, step: 0.5, default: 1 },
];

export type Zone = 'all' | 'periphery';

export interface ProjectionParams {
  trials: number;
  flashMs: number;
  delayMs: number;
  zone: Zone;
  showTarget: boolean;
  sizeCm: number;
}

export function projectionParams(p: ExerciseParams): ProjectionParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  return {
    trials: Math.round(num('trials')),
    flashMs: num('flashMs'),
    delayMs: num('delayMs'),
    zone: p.zone === 'periphery' ? 'periphery' : 'all',
    showTarget: p.showTarget !== 'no',
    sizeCm: num('sizeCm'),
  };
}

/** Kreuz vor dem Punkt, Rückmeldung nach der Antwort (ms) */
export const FIX_MS = 700;
export const FEEDBACK_MS = 800;
export const FEEDBACK_SHORT_MS = 250;
/** Rand zum Feldrand und Mindestabstand zur Mitte (cm) */
export const MARGIN_CM = 2;
export const CENTER_GAP_CM = 2;
/** Im Schnelllauf (`?quick=1`): Punkte */
export const QUICK_TRIALS = 3;

export type Phase = 'fix' | 'flash' | 'delay' | 'respond' | 'feedback' | 'done';

export interface ProjectionTrial {
  nr: number;
  /** Abweichung der Antwort vom Ort in cm: + = rechts, + = oberhalb */
  errXCm: number;
  errUpCm: number;
  errCm: number;
  errDeg: number;
  rtMs: number;
}

export interface ProjectionSummary {
  n: number;
  errMean: number | null;
  errDeg: number | null;
  biasX: number | null;
  biasY: number | null;
  scatter: number | null;
  rtMean: number | null;
}

const round = (x: number, d: number): number => {
  const f = 10 ** d;
  return Math.round(x * f) / f;
};

export class ProjectionSession {
  idx = 0;
  phase: Phase = 'fix';
  /** Ort des Punktes als Anteile des Feldes (0…1) */
  target = { fx: 0.5, fy: 0.5 };
  trials: ProjectionTrial[] = [];
  /** Letzte Antwort in Pixeln der Bühne (für die Rückmeldung) */
  lastResp: { x: number; y: number } | null = null;
  finished = false;
  private phaseAt = 0;
  private wCm: number;
  private hCm: number;

  constructor(
    readonly p: ProjectionParams,
    private readonly rng: Rng,
    private readonly distCm: number,
    fieldCm: { w: number; h: number },
  ) {
    this.wCm = fieldCm.w;
    this.hCm = fieldCm.h;
  }

  /** Feldgröße in cm (für die Wahl der Orte; ändert sich beim Drehen) */
  setField(wCm: number, hCm: number): void {
    this.wCm = Math.max(1, wCm);
    this.hCm = Math.max(1, hCm);
  }

  /** Ort wählen: mit Rand, nicht in der Mitte; bei „Rand“ nur außerhalb der inneren 60 % */
  pick(): { fx: number; fy: number } {
    const mx = Math.min(0.45, MARGIN_CM / this.wCm);
    const my = Math.min(0.45, MARGIN_CM / this.hCm);
    for (let i = 0; i < 300; i++) {
      const fx = mx + this.rng.next() * (1 - 2 * mx);
      const fy = my + this.rng.next() * (1 - 2 * my);
      const u = (fx - 0.5) / 0.5;
      const v = (fy - 0.5) / 0.5;
      if (this.p.zone === 'periphery' && Math.hypot(u, v) < 0.6) continue;
      if (Math.hypot((fx - 0.5) * this.wCm, (fy - 0.5) * this.hCm) < CENTER_GAP_CM) continue;
      return { fx, fy };
    }
    return { fx: 0.8, fy: 0.5 };
  }

  start(now: number): void {
    this.begin(now);
  }

  private begin(now: number): void {
    if (this.idx >= this.p.trials) {
      this.phase = 'done';
      this.finished = true;
      return;
    }
    this.target = this.pick();
    this.phase = 'fix';
    this.phaseAt = now;
    this.lastResp = null;
  }

  /** Punkt sichtbar (Blitzdauer) */
  get visible(): boolean {
    return this.phase === 'flash';
  }

  update(now: number): void {
    const d = now - this.phaseAt;
    if (this.phase === 'fix' && d >= FIX_MS) this.go('flash', now);
    else if (this.phase === 'flash' && d >= this.p.flashMs) this.go(this.p.delayMs > 0 ? 'delay' : 'respond', now);
    else if (this.phase === 'delay' && d >= this.p.delayMs) this.go('respond', now);
    else if (this.phase === 'feedback' && d >= (this.p.showTarget ? FEEDBACK_MS : FEEDBACK_SHORT_MS)) {
      this.idx++;
      this.begin(now);
    }
  }

  private go(p: Phase, now: number): void {
    this.phase = p;
    this.phaseAt = now;
  }

  /** Antwort: Abweichung in cm (+ rechts, + oberhalb) und Ort der Antwort in Pixeln (für die Rückmeldung) */
  respond(errXCm: number, errUpCm: number, respPx: { x: number; y: number }, now: number): boolean {
    if (this.phase !== 'respond') return false;
    const err = Math.hypot(errXCm, errUpCm);
    this.trials.push({
      nr: this.idx + 1,
      errXCm: round(errXCm, 2),
      errUpCm: round(errUpCm, 2),
      errCm: round(err, 2),
      errDeg: round((2 * Math.atan(err / (2 * this.distCm)) * 180) / Math.PI, 2),
      rtMs: Math.round(now - this.phaseAt),
    });
    this.lastResp = respPx;
    this.go('feedback', now);
    return true;
  }

  summary(): ProjectionSummary {
    const t = this.trials;
    const ex = t.map((x) => x.errXCm);
    const ey = t.map((x) => x.errUpCm);
    return {
      n: t.length,
      errMean: t.length ? round(mean(t.map((x) => x.errCm)), 2) : null,
      errDeg: t.length ? round(mean(t.map((x) => x.errDeg)), 2) : null,
      biasX: t.length ? round(mean(ex), 2) : null,
      biasY: t.length ? round(mean(ey), 2) : null,
      scatter: t.length > 1 ? round(Math.sqrt(sd(ex) ** 2 + sd(ey) ** 2), 2) : null,
      rtMean: t.length ? Math.round(mean(t.map((x) => x.rtMs))) : null,
    };
  }
}

/** Tipp nach dem Durchlauf (Schlüssel in `texts.tips`) */
export function tipFor(sum: ProjectionSummary): string {
  return sum.n < 20 ? 'more' : 'calm';
}
