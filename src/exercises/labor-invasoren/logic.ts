/**
 * Invasoren – reine Logik (aus `InvadersSession` im Labor-Prototyp, ex/invaders.js).
 *
 * Raumschiffe fallen von oben. Der Zielpunkt unten wird seitlich unter ein Schiff gesteuert (Zeiger, Pfeiltasten oder
 * Gerätekippen, siehe `_shared/labor-steuerung.ts`) und dort gehalten, bis es verschwindet (Haltezeit). Schiffe, die den unteren
 * Rand erreichen, zählen als verpasst. Koordinaten in cm relativ zur linken oberen Ecke des Spielfelds, Zeiten in ms
 * (virtuelle Zeit), Bewegung mit `dt` (bildratenunabhängig), Zufall nur über `Rng`.
 *
 * Abweichungen vom Prototyp:
 * - Größen passen sich dem Feld an (Handy ist nur ≈ 10 cm breit): Schiffsgröße ≈ 8 % der kürzeren Feldseite (0,6–1,6 cm), Toleranz
 *   höchstens ein Viertel der Breite; der Zielpunkt bleibt ganz im Feld, Schiffe erscheinen ganz im Feld (Prototyp: festes Maß 2 cm).
 * - Der Zielpunkt hält erst ab dem oberen Viertel (wie im Prototyp), das wird jetzt als Linie gezeigt.
 * - Zusätzlich Median der Zeit bis zum Treffer, die Zahl der erschienenen Schiffe und das Umrechnen beim Drehen des Tablets (`setField`).
 */
import { applySteering, type SteerInput } from '../_shared/labor-steuerung';
import { mean, median } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'durationS', type: 'number', unit: 's', min: 20, max: 180, step: 10, default: 60 },
  { key: 'spawnMs', type: 'number', unit: 'ms', min: 800, max: 5000, step: 100, default: 2200 },
  // Fallgeschwindigkeit in cm pro Sekunde (Einheit steht im Text)
  { key: 'fallCmS', type: 'number', min: 3, max: 25, step: 1, default: 8, summary: true },
  { key: 'dwellMs', type: 'number', unit: 'ms', min: 100, max: 1500, step: 50, default: 400, summary: true },
  { key: 'toleranceCm', type: 'number', unit: 'cm', min: 0.5, max: 6, step: 0.5, default: 2 },
  { key: 'control', type: 'select', default: 'pointer', options: ['pointer', 'keys', 'tilt'], summary: true },
];

export type Control = 'pointer' | 'keys' | 'tilt';

export interface InvaderParams {
  durationS: number;
  spawnMs: number;
  fallCmS: number;
  dwellMs: number;
  toleranceCm: number;
  control: Control;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function invaderParams(p: ExerciseParams): InvaderParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const c = p.control;
  return {
    durationS: num('durationS'),
    spawnMs: num('spawnMs'),
    fallCmS: num('fallCmS'),
    dwellMs: num('dwellMs'),
    toleranceCm: num('toleranceCm'),
    control: c === 'keys' || c === 'tilt' ? c : 'pointer',
  };
}

/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;
/** Größtes dt eines Bildes in s (wie im Runner) */
export const MAX_DT_S = 0.05;
/** Das erste Schiff erscheint so viele ms nach dem Start */
export const FIRST_SPAWN_MS = 600;
/** Ab diesem Anteil der Feldhöhe von oben kann ein Schiff gehalten werden */
export const LOCK_FROM = 0.25;
/** Die Haltezeit baut sich bei Abweichung doppelt so schnell ab, wie sie aufgebaut wird */
export const DECAY = 2;
/** Fahrgeschwindigkeit bei Achsen-Eingabe (Pfeiltasten, Kippen): so viele Feldbreiten pro Sekunde bei Vollausschlag */
export const AXIS_SPEED_WIDTHS_PER_S = 0.9;

export interface Invader {
  id: number;
  x: number;
  y: number;
  /** aufgebaute Haltezeit in ms */
  lock: number;
  spawnedAt: number;
}

export type InvaderOutcome = 'destroyed' | 'missed';

export interface InvaderTrial {
  nr: number;
  outcome: InvaderOutcome;
  /** Zeit vom Erscheinen bis zum Treffer in ms (nur Treffer) */
  ms: number | null;
  xCm: number;
}

export interface InvaderSummary {
  destroyed: number;
  missed: number;
  /** gewertete Schiffe (getroffen + verpasst) */
  total: number;
  /** getroffene an gewerteten Schiffen in %, null ohne */
  accuracy: number | null;
  tMean: number | null;
  tMedian: number | null;
  /** Toleranz in cm, die wirklich galt (höchstens ein Viertel der Breite) */
  toleranceCm: number;
  trials: InvaderTrial[];
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const r1 = (v: number): number => Math.round(v * 10) / 10;

/** Halbe Schiffsbreite in cm: ≈ 8 % der kürzeren Feldseite, 0,6–1,6 cm */
export function shipRadius(wCm: number, hCm: number): number {
  return clamp(0.08 * Math.min(wCm, hCm), 0.6, 1.6);
}

/** Toleranz in cm, wie sie wirklich gilt: höchstens ein Viertel der Breite */
export function effectiveTolerance(toleranceCm: number, wCm: number): number {
  return Math.max(0.3, Math.min(toleranceCm, 0.25 * wCm));
}

/** Reine Spiellogik. */
export class InvadersSession {
  readonly p: InvaderParams;
  W: number;
  H: number;
  shipR: number;
  tol: number;
  x: number;
  invaders: Invader[] = [];
  trials: InvaderTrial[] = [];
  destroyed = 0;
  missed = 0;
  elapsed = 0;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  private nextId = 0;
  private nextSpawnAt = 0;
  private last = 0;
  private readonly rng: Rng;
  private readonly spawnX: ((n: number) => number | null) | undefined;

  /**
   * `spawnX(n)` legt für das n-te Schiff (ab 1) die Lage als Anteil der nutzbaren Breite (0..1) fest – für den Intro-Film;
   * `null` oder ohne `spawnX` entscheidet der Zufall.
   */
  constructor(p: InvaderParams, env: { rng: Rng; fieldWcm: number; fieldHcm: number; spawnX?: (n: number) => number | null }) {
    this.p = p;
    this.rng = env.rng;
    this.spawnX = env.spawnX;
    this.W = env.fieldWcm;
    this.H = env.fieldHcm;
    this.shipR = shipRadius(this.W, this.H);
    this.tol = effectiveTolerance(p.toleranceCm, this.W);
    this.x = this.W / 2;
  }

  start(now: number): void {
    this.startedAt = now;
    this.last = now;
    this.nextSpawnAt = now + FIRST_SPAWN_MS;
  }

  /** Höhe (cm von oben), ab der ein Schiff als verpasst gilt */
  get bottomY(): number {
    return Math.max(0.5 * this.H, this.H - 1);
  }

  /** Feld hat sich geändert (Tablet gedreht): Schiffe und Zielpunkt werden mit umgerechnet */
  setField(wCm: number, hCm: number): void {
    if (wCm === this.W && hCm === this.H) return;
    const sx = wCm / this.W;
    const sy = hCm / this.H;
    this.W = wCm;
    this.H = hCm;
    this.shipR = shipRadius(wCm, hCm);
    this.tol = effectiveTolerance(this.p.toleranceCm, wCm);
    for (const v of this.invaders) {
      v.x = clamp(v.x * sx, Math.min(this.shipR, wCm / 2), Math.max(wCm - this.shipR, wCm / 2));
      v.y *= sy;
    }
    this.x = clamp(this.x * sx, Math.min(this.shipR, wCm / 2), Math.max(wCm - this.shipR, wCm / 2));
  }

  aligned(v: Invader): boolean {
    return Math.abs(this.x - v.x) <= this.tol && v.y >= this.H * LOCK_FROM;
  }

  /** Pro Bild aufrufen: `input` = Eingabe der Steuerung (Position als Anteil der Feldbreite oder Achse −1..1) */
  update(now: number, input: SteerInput): void {
    if (this.startedAt === null || this.finished) return;
    const dt = Math.min(MAX_DT_S, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.elapsed += dt;
    this.x = applySteering(this.x, input, dt, this.W * AXIS_SPEED_WIDTHS_PER_S, this.W, this.shipR);
    while (now >= this.nextSpawnAt) {
      const lo = Math.min(this.shipR, this.W / 2);
      const hi = Math.max(this.W - this.shipR, this.W / 2);
      const id = ++this.nextId;
      const planned = this.spawnX ? this.spawnX(id) : null;
      const frac = planned !== null && planned !== undefined && Number.isFinite(planned) ? clamp(planned, 0, 1) : this.rng.next();
      this.invaders.push({ id, x: lo + frac * (hi - lo), y: 0, lock: 0, spawnedAt: this.nextSpawnAt });
      this.nextSpawnAt += this.p.spawnMs;
    }
    for (const v of this.invaders.slice()) {
      v.y += this.p.fallCmS * dt;
      if (this.aligned(v)) v.lock += dt * 1000;
      else v.lock = Math.max(0, v.lock - dt * 1000 * DECAY);
      if (v.lock >= this.p.dwellMs) {
        this.destroyed++;
        this.trials.push({ nr: this.trials.length + 1, outcome: 'destroyed', ms: Math.round(now - v.spawnedAt), xCm: r1(v.x) });
        this.invaders.splice(this.invaders.indexOf(v), 1);
      } else if (v.y >= this.bottomY) {
        this.missed++;
        this.trials.push({ nr: this.trials.length + 1, outcome: 'missed', ms: null, xCm: r1(v.x) });
        this.invaders.splice(this.invaders.indexOf(v), 1);
      }
    }
    if (this.elapsed >= this.p.durationS) {
      this.finished = true;
      this.endedAt = now;
    }
  }

  summary(): InvaderSummary {
    const n = this.destroyed + this.missed;
    const ms = this.trials.filter((t) => t.outcome === 'destroyed').map((t) => t.ms ?? 0);
    return {
      destroyed: this.destroyed,
      missed: this.missed,
      total: n,
      accuracy: n ? r1((100 * this.destroyed) / n) : null,
      tMean: ms.length ? Math.round(mean(ms)) : null,
      tMedian: ms.length ? Math.round(median(ms)) : null,
      toleranceCm: r1(this.tol),
      trials: this.trials.slice(),
    };
  }
}

/**
 * Ziel des Autopiloten (Intro-Film und Autoplay): das tiefste Schiff, das nicht in `ignore` steht (Nummern). Gibt es nur
 * Schiffe aus `ignore`, steuert er auf die abgewandte Seite des tiefsten davon (damit es sicher durchkommt); ohne Schiff
 * in die Feldmitte.
 */
export function autopilotTarget(s: InvadersSession, ignore: ReadonlySet<number>): number {
  let best: Invader | null = null;
  let skipped: Invader | null = null;
  for (const v of s.invaders) {
    if (ignore.has(v.id)) {
      if (!skipped || v.y > skipped.y) skipped = v;
      continue;
    }
    if (!best || v.y > best.y) best = v;
  }
  if (best) return best.x;
  if (skipped) return skipped.x < s.W / 2 ? s.W - s.shipR : s.shipR;
  return s.W / 2;
}

/** Eingabe, die den Autopiloten zu `target` (cm) führt: Position (Zeiger) oder Achse (Tasten, Kippen) */
export function autopilotInput(s: InvadersSession, target: number, mode: 'position' | 'axis'): SteerInput {
  if (mode === 'position') {
    const span = Math.max(1e-6, s.W - 2 * s.shipR);
    return { mode: 'position', x: clamp((target - s.shipR) / span, 0, 1) };
  }
  return { mode: 'axis', a: clamp((target - s.x) / (0.25 * s.W), -1, 1) };
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte: kein Treffer →
 * leichter; viele verpasste → leichter; sicher → nur eine Einstellung schwerer.
 */
export function tipFor(s: InvaderSummary): string {
  if (s.total === 0 || s.destroyed === 0) return 'few';
  if (s.accuracy !== null && s.accuracy < 60 && s.total >= 8) return 'easier';
  if (s.accuracy !== null && s.accuracy >= 90 && s.destroyed >= 12) return 'harder';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je getroffenem Schiff */
export function pointsFor(destroyed: number): number {
  return Math.max(0, Math.round(destroyed)) * 10;
}
