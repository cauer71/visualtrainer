/**
 * Orientierung – reine Logik (aus `OrientSession` im Labor-Prototyp, ex/orient.js).
 *
 * Ein Punkt leuchtet in einer von 4 oder 8 Richtungen auf (0 = oben, im Uhrzeigersinn). Die übende Person bewegt ihren Körper
 * in diese Richtung (zum Beispiel Neigen oder ein Schritt); eine Hilfsperson tippt „Erreicht“, wenn die Richtung eingenommen
 * ist, oder „Falsche Richtung“. Optional folgt die Rückkehr zur Mitte, ebenfalls mit „Erreicht“ bestätigt. Die App liest nichts
 * von einer Plattform aus und misst nur die Zeit bis zur Bestätigung. Zeiten in ms (virtuelle Zeit), Zufall nur über `Rng`.
 *
 * Abweichungen vom Prototyp:
 * - Ein zweiter Tipp innerhalb von 400 ms nach einer Bestätigung („Doppeltipp“) wird ignoriert; sonst bestätigte ein versehentlicher
 *   Doppeltipp zugleich die Rückkehr zur Mitte.
 * - Zusätzlich eine Auswertung der Zeit je Richtung (Zählwerte, keine Wertung) und die Zahl der gezeigten Ziele.
 * - Bestätigungen ohne sichtbares Ziel (während der Pause) werden ignoriert und nicht gezählt (wie im Prototyp).
 */
import { mean, median, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 8, max: 80, step: 2, default: 24 },
  { key: 'directions', type: 'select', default: '4', options: ['4', '8'], summary: true },
  { key: 'returnToCenter', type: 'select', default: 'yes', options: ['yes', 'no'], summary: true },
  { key: 'waitMs', type: 'number', unit: 'ms', min: 500, max: 5000, step: 100, default: 1500 },
  { key: 'timeoutS', type: 'number', unit: 's', min: 0, max: 30, step: 1, default: 0 },
  { key: 'sizeCm', type: 'number', unit: 'cm', min: 1.5, max: 10, step: 0.5, default: 5 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export interface OrientParams {
  trials: number;
  directions: 4 | 8;
  returnToCenter: boolean;
  waitMs: number;
  /** Zeitlimit je Ziel in s; 0 = keines */
  timeoutS: number;
  sizeCm: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function orientParams(p: ExerciseParams): OrientParams {
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
    returnToCenter: sel('returnToCenter', ['yes', 'no'], 'yes') === 'yes',
    waitMs: num('waitMs'),
    timeoutS: num('timeoutS'),
    sizeCm: num('sizeCm'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** Zweiter Tipp so kurz nach einer Bestätigung: ignoriert (ms) */
export const DOUBLE_PRESS_MS = 400;
/** Schnellmodus (?quick=1): Anzahl der Ziele und Pause */
export const QUICK_TRIALS = 4;
export const QUICK_WAIT_MS = 600;

export type OrientState = 'idle' | 'wait' | 'target' | 'center' | 'done';
export type OrientOutcome = 'reached' | 'wrong' | 'timeout';

export interface OrientTrial {
  nr: number;
  dir: number;
  outcome: OrientOutcome;
  /** Zeit bis zur Bestätigung in ms */
  ms: number;
  /** Zeit für die Rückkehr zur Mitte in ms (null ohne Rückkehr) */
  returnMs: number | null;
}

export type OrientPress = { type: 'reached' | 'wrong' | 'center' } | { type: 'ignored' } | null;

export interface DirectionTime {
  dir: number;
  /** erreichte Ziele in dieser Richtung */
  n: number;
  /** gezeigte Ziele in dieser Richtung */
  of: number;
  /** mittlere Zeit der erreichten Ziele in ms (null ohne erreichtes Ziel) */
  tMean: number | null;
}

export interface OrientSummary {
  total: number;
  reached: number;
  wrong: number;
  timeouts: number;
  tMean: number | null;
  tMedian: number | null;
  /** Streuung der Zeiten, null bei weniger als 2 erreichten Zielen */
  tSd: number | null;
  returnMean: number | null;
  perDirection: DirectionTime[];
  trials: OrientTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 0): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Reine Spiellogik als Zustandsautomat. */
export class OrientSession {
  readonly p: OrientParams;
  readonly n: number;
  seq: number[] = [];
  idx = 0;
  state: OrientState = 'idle';
  trials: OrientTrial[] = [];
  shownAt = 0;
  centerAt = 0;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  private waitUntil = 0;
  private pending: OrientTrial | null = null;
  private lastPressAt = -1e9;
  private readonly rng: Rng;

  constructor(p: OrientParams, env: { rng: Rng }) {
    this.p = p;
    this.rng = env.rng;
    this.n = p.directions;
    while (this.seq.length < p.trials) this.seq.push(...this.rng.shuffle(Array.from({ length: this.n }, (_, i) => i)));
    this.seq.length = p.trials;
  }

  start(now: number): void {
    this.startedAt = now;
    this.toWait(now);
  }

  private toWait(now: number): void {
    if (this.idx >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.state = 'done';
      return;
    }
    this.state = 'wait';
    this.waitUntil = now + this.p.waitMs;
  }

  /** Richtung des gerade leuchtenden Ziels oder null */
  current(): number | null {
    return this.state === 'target' ? this.seq[this.idx] : null;
  }

  /** Pro Bild aufrufen: Ziel erscheinen lassen, Zeitlimit prüfen */
  update(now: number): void {
    const to = this.p.timeoutS * 1000;
    if (this.state === 'wait' && now >= this.waitUntil) {
      this.state = 'target';
      this.shownAt = now;
    } else if (this.state === 'target' && to > 0 && now - this.shownAt >= to) {
      this.afterTarget(now, 'timeout', to);
    } else if (this.state === 'center' && to > 0 && now - this.centerAt >= to) {
      this.finishTrial(now, to);
    }
  }

  private afterTarget(now: number, outcome: OrientOutcome, ms: number): void {
    this.pending = { nr: this.idx + 1, dir: this.seq[this.idx], outcome, ms: Math.round(ms), returnMs: null };
    if (this.p.returnToCenter) {
      this.state = 'center';
      this.centerAt = now;
    } else this.finishTrial(now, null);
  }

  private finishTrial(now: number, returnMs: number | null): void {
    if (this.pending) {
      if (returnMs !== null) this.pending.returnMs = Math.round(returnMs);
      this.trials.push(this.pending);
    }
    this.pending = null;
    this.idx++;
    this.toWait(now);
  }

  private doubled(now: number): boolean {
    return now - this.lastPressAt >= 0 && now - this.lastPressAt < DOUBLE_PRESS_MS;
  }

  /** Hilfsperson: Richtung erreicht (bzw. in der Mitte angekommen) */
  reached(now: number): OrientPress {
    if (this.state !== 'target' && this.state !== 'center') return null;
    if (this.doubled(now)) return { type: 'ignored' };
    this.lastPressAt = now;
    if (this.state === 'target') {
      this.afterTarget(now, 'reached', now - this.shownAt);
      return { type: 'reached' };
    }
    this.finishTrial(now, now - this.centerAt);
    return { type: 'center' };
  }

  /** Hilfsperson: falsche Richtung eingenommen (nur solange das Ziel leuchtet) */
  wrong(now: number): OrientPress {
    if (this.state !== 'target') return null;
    if (this.doubled(now)) return { type: 'ignored' };
    this.lastPressAt = now;
    this.afterTarget(now, 'wrong', now - this.shownAt);
    return { type: 'wrong' };
  }

  summary(): OrientSummary {
    const ok = this.trials.filter((t) => t.outcome === 'reached');
    const ms = ok.map((t) => t.ms);
    const ret = this.trials.filter((t) => t.returnMs !== null).map((t) => t.returnMs ?? 0);
    const per: DirectionTime[] = [];
    for (let d = 0; d < this.n; d++) {
      const all = this.trials.filter((t) => t.dir === d);
      const good = all.filter((t) => t.outcome === 'reached').map((t) => t.ms);
      if (all.length) per.push({ dir: d, n: good.length, of: all.length, tMean: good.length ? round(mean(good)) : null });
    }
    return {
      total: this.trials.length,
      reached: ok.length,
      wrong: this.trials.filter((t) => t.outcome === 'wrong').length,
      timeouts: this.trials.filter((t) => t.outcome === 'timeout').length,
      tMean: ms.length ? round(mean(ms)) : null,
      tMedian: ms.length ? round(median(ms)) : null,
      tSd: ms.length >= 2 ? round(sd(ms)) : null,
      returnMean: ret.length ? round(mean(ret)) : null,
      perDirection: per,
      trials: this.trials.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * viele falsche Richtungen → langsamer; viele Zeitüberschreitungen → mehr Zeit; stark schwankende Zeiten → ruhiger; sonst Vergleich.
 */
export function tipFor(s: OrientSummary): string {
  if (s.total === 0 || s.reached === 0) return 'few';
  if (s.wrong >= 3 && s.wrong >= 0.15 * s.total) return 'wrong';
  if (s.timeouts >= 3 && s.timeouts >= 0.15 * s.total) return 'timeouts';
  if (s.tMean !== null && s.tSd !== null && s.reached >= 8 && s.tSd > 0.4 * s.tMean) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je erreichtem Ziel */
export function pointsFor(reached: number): number {
  return Math.max(0, Math.round(reached)) * 10;
}

// ---------------------------------------------------------------------------
// Anordnung auf der Bühne

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OrientLayout {
  cx: number;
  cy: number;
  /** Radius des Kreises, auf dem die Ziele liegen */
  R: number;
  /** Radius eines Punktes */
  r: number;
  points: Array<{ x: number; y: number }>;
  /** Mitte der Textzeile oben */
  label: { cx: number; cy: number };
}

/**
 * Ziele auf einem Kreis in der Mitte des Spielfelds `f` (oben eine Textzeile, unten `helperH` für die Tasten der Hilfsperson).
 * Die Punktgröße (`dotPx`, aus cm) wird so begrenzt, dass die Punkte nie überlappen und ins Feld passen.
 */
export function orientLayout(f: Box, n: number, dotPx: number, helperH: number, u: number): OrientLayout {
  const labelH = Math.max(28, Math.min(40, u * 6));
  const top = f.y + labelH;
  const hh = Math.max(40, f.h - labelH - helperH);
  const half = Math.min(f.w, hh) / 2;
  const r = Math.max(7, Math.min(dotPx / 2, half * 0.24));
  const R = Math.max(r * 2.6, half - r - 2);
  const cx = f.x + f.w / 2;
  const cy = top + hh / 2;
  const points = Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n;
    return { x: cx + Math.sin(a) * R, y: cy - Math.cos(a) * R };
  });
  return { cx, cy, R, r, points, label: { cx, cy: f.y + labelH / 2 } };
}
