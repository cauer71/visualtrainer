/**
 * Balance-Touch – reine Logik (aus `BalanceSession` im Labor-Prototyp, ex/balancetouch.js).
 *
 * Spot-Touch im Stand (beidbeinig, einbeinig, Tandemstand oder auf einer wackligen Fläche): ein Punkt erscheint, du berührst ihn.
 * Eine Hilfsperson tippt auf eine Taste (oder B), sooft du das Gleichgewicht verlierst (Absetzen, Abstützen, Ausfallschritt,
 * Festhalten). Die App misst die Touch-Leistung und zählt die Taps der Hilfsperson; sie misst weder Gleichgewicht noch Haltung.
 *
 * Die Punkt-Logik ist `SpotSession` aus `labor-spot-touch/logic.ts` (importiert, nicht kopiert; ein Punkt gleichzeitig,
 * Trefferradius, Doppeltipp-Schutz, Zonen, Kreuz in der Mitte). Zeiten in ms (virtuelle Zeit), Koordinaten in cm relativ zur
 * linken oberen Ecke des Spielfelds, Zufall nur über `Rng`.
 *
 * Abweichungen vom Prototyp:
 * - Ein zweiter Tipp auf „Gleichgewicht verloren“ innerhalb von 500 ms wird ignoriert (ein Verlust dauert länger als das; sonst
 *   zählt ein Doppeltipp der Hilfsperson doppelt).
 * - Die Punktgröße wird auf höchstens 40 % der kürzeren Feldseite begrenzt, damit immer ein freier Platz für den nächsten Punkt bleibt.
 * - Zusätzlich Median und Streuung der Reaktionszeit sowie die Zahl der gezeigten Punkte (im Prototyp nur Treffer/verpasste).
 * - Die Standposition (`stance`) wird nur gespeichert und gehört zum Vergleichsschlüssel (andere Position = andere Aufgabe).
 */
import type { ExerciseParams, ParamDef } from '../../core/types';
import { SpotSession, type SpotEnv, type SpotParams, type SpotSummary, type TapResult } from '../labor-spot-touch/logic';

export type { SpotSummary, TapResult };

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'stance', type: 'select', default: 'both', options: ['both', 'platform', 'single', 'tandem'], summary: true },
  { key: 'durationS', type: 'number', unit: 's', min: 20, max: 300, step: 10, default: 60 },
  { key: 'diameterCm', type: 'number', unit: 'cm', min: 2, max: 15, step: 0.5, default: 6, summary: true },
  { key: 'persistenceS', type: 'number', unit: 's', min: 0.5, max: 8, step: 0.1, default: 2 },
  { key: 'gapMs', type: 'number', unit: 'ms', min: 0, max: 3000, step: 50, default: 500 },
  { key: 'zone', type: 'select', default: 'all', options: ['all', 'periphery', 'center'] },
  { key: 'fixation', type: 'select', default: 'yes', options: ['yes', 'no'] },
];

export type Stance = 'both' | 'platform' | 'single' | 'tandem';

export interface BalanceParams {
  stance: Stance;
  durationS: number;
  diameterCm: number;
  persistenceS: number;
  gapMs: number;
  zone: 'all' | 'periphery' | 'center';
  fixation: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function balanceParams(p: ExerciseParams): BalanceParams {
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
    stance: sel<Stance>('stance', ['both', 'platform', 'single', 'tandem'], 'both'),
    durationS: num('durationS'),
    diameterCm: num('diameterCm'),
    persistenceS: num('persistenceS'),
    gapMs: num('gapMs'),
    zone: sel('zone', ['all', 'periphery', 'center'], 'all'),
    fixation: sel('fixation', ['yes', 'no'], 'yes'),
  };
}

/** Zweiter Tipp auf „Gleichgewicht verloren“ so kurz nach einem Tipp: ignoriert (ms) */
export const DOUBLE_LOSS_MS = 500;
/** Größte Punktgröße als Anteil der kürzeren Feldseite */
export const MAX_SPOT_FRACTION = 0.4;
/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;
/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export { MIN_HIT_PX } from '../labor-spot-touch/logic';

/** Punktdurchmesser in cm, begrenzt auf einen Anteil der kürzeren Feldseite (cm) */
export function limitDiameter(diameterCm: number, fieldWcm: number, fieldHcm: number): number {
  return Math.max(0.5, Math.min(diameterCm, MAX_SPOT_FRACTION * Math.min(fieldWcm, fieldHcm)));
}

export type LossResult = { type: 'loss'; n: number } | { type: 'ignored' } | null;

export interface BalanceSummary extends SpotSummary {
  /** Zahl der von der Hilfsperson gezählten Verluste des Gleichgewichts */
  losses: number;
  /** Verluste pro Minute (nur nach Ende der Sitzung, null sonst) */
  lossesPerMin: number | null;
  /** Zahl der gezeigten Punkte (Treffer + verpasste) */
  shown: number;
  /** Zeitpunkte der Verluste in ms seit Beginn */
  lossTimes: number[];
}

const r1 = (x: number): number => Math.round(x * 10) / 10;

/** Verbindet Spot-Touch mit dem Zähler der Hilfsperson. */
export class BalanceSession {
  readonly p: BalanceParams;
  readonly spots: SpotSession;
  losses: number[] = [];
  private lastLossAt = -1e9;

  constructor(p: BalanceParams, env: SpotEnv) {
    this.p = p;
    const sp: SpotParams = {
      durationS: p.durationS,
      diameterCm: p.diameterCm,
      persistenceS: p.persistenceS,
      simultaneous: 1,
      gapMs: p.gapMs,
      zone: p.zone,
      fixation: p.fixation,
      sound: 'no',
    };
    this.spots = new SpotSession(sp, env);
  }

  get startedAt(): number | null {
    return this.spots.startedAt;
  }

  get finished(): boolean {
    return this.spots.finished;
  }

  start(now: number): void {
    this.spots.start(now);
  }

  update(now: number): void {
    this.spots.update(now);
  }

  tap(x: number, y: number, now: number): TapResult {
    return this.spots.tap(x, y, now);
  }

  setField(wCm: number, hCm: number, diameterCm?: number): void {
    this.spots.setField(wCm, hCm, diameterCm);
  }

  /** Hilfsperson: Gleichgewicht verloren (Abstützen, Absetzen, Ausfallschritt, Festhalten) */
  loss(now: number): LossResult {
    const start = this.spots.startedAt;
    if (start === null || this.spots.finished || this.spots.isOver(now)) return null;
    if (now - this.lastLossAt >= 0 && now - this.lastLossAt < DOUBLE_LOSS_MS) return { type: 'ignored' };
    this.lastLossAt = now;
    this.losses.push(Math.max(0, Math.round(now - start)));
    return { type: 'loss', n: this.losses.length };
  }

  summary(): BalanceSummary {
    const s = this.spots.summary();
    const start = this.spots.startedAt;
    const end = this.spots.endedAt;
    const minutes = start !== null && end !== null ? (end - start) / 60000 : 0;
    return {
      ...s,
      losses: this.losses.length,
      lossesPerMin: minutes > 0 ? r1(this.losses.length / minutes) : null,
      shown: s.hits + s.misses,
      lossTimes: this.losses.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte: kein Treffer →
 * leichter; mehrere Verluste → leichtere Standposition oder kürzer; viele Fehltipps → erst genau; viele verpasste → leichter;
 * sicher und ohne Verlust → nur eine Einstellung schwerer.
 */
export function tipFor(s: BalanceSummary): string {
  if (s.shown === 0 || s.hits === 0) return 'few';
  if (s.losses >= 3) return 'losses';
  if (s.stray >= 3 && s.stray >= 0.25 * (s.hits + s.stray)) return 'stray';
  if (s.accuracy !== null && s.accuracy < 70 && s.shown >= 5) return 'misses';
  if (s.accuracy !== null && s.accuracy >= 90 && s.hits >= 10 && s.losses === 0) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je Treffer */
export function pointsFor(hits: number): number {
  return Math.max(0, Math.round(hits)) * 10;
}
