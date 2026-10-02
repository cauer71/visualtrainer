/**
 * Doppelaufgabe – reine Logik (aus `CentralStream` und `DualSession` im Labor-Prototyp, ex/dual.js).
 *
 * Mitte: Eine Zahlenfolge wechselt alle `intervalMs`; bei der Zielzahl wird die Mitte berührt. Rand: Punkte erscheinen
 * (Spot-Touch-Logik, `SpotSession` aus `labor-spot-touch/logic.ts`, Zone „Rand“, mit Kreuz) und werden berührt. Wahlweise
 * nur eine der beiden Aufgaben (Vergleichsbasis). Zeiten in ms (virtuelle Zeit), Koordinaten in cm relativ zur linken
 * oberen Ecke des Spielfelds, Zufall nur über `Rng`. Der Blick wird nicht gemessen.
 *
 * Abweichungen vom Prototyp:
 * - Die Randpunkte halten Abstand zum Berührkreis in der Mitte (Prototyp: Punkte konnten den Kreis überlappen, dann war der
 *   überdeckte Teil des Punktes nicht erreichbar). Die Größe der Randpunkte wird so begrenzt, dass neben dem Kreis Platz bleibt.
 * - Eine bei Ende der Sitzung nur angeschnittene Zielzahl (nicht voll gezeigt, nicht beantwortet) wird nicht mitgezählt; so gilt
 *   immer „erkannt + verpasst = gezeigt“. (Prototyp zählte sie als gezeigt, aber nie als verpasst.)
 * - Berührung der Mitte rechnet den Zahlenwechsel bis zum Zeitpunkt der Berührung nach (Ereigniszeit statt Bildzeit).
 * - Neue Kennzahl `c_targets` (Zahl der gezeigten Zielzahlen, im Prototyp nur im Label „von N“).
 */
import { mean } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';
import { SpotSession, type SpotParams, type SpotSummary, type TapResult } from '../labor-spot-touch/logic';

export type { SpotSummary };

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'mode', type: 'select', default: 'dual', options: ['dual', 'central', 'periphery'], summary: true },
  { key: 'durationS', type: 'number', unit: 's', min: 20, max: 300, step: 10, default: 60 },
  { key: 'intervalMs', type: 'number', unit: 'ms', min: 400, max: 2500, step: 50, default: 900, summary: true },
  { key: 'targetDigit', type: 'number', unit: 'count', min: 1, max: 9, step: 1, default: 7 },
  { key: 'targetRate', type: 'number', unit: 'percent', min: 5, max: 50, step: 5, default: 20 },
  { key: 'spotCm', type: 'number', unit: 'cm', min: 1, max: 12, step: 0.5, default: 5, summary: true },
  { key: 'persistenceS', type: 'number', unit: 's', min: 0.4, max: 6, step: 0.1, default: 1.5 },
  { key: 'gapMs', type: 'number', unit: 'ms', min: 0, max: 3000, step: 50, default: 400 },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type Mode = 'dual' | 'central' | 'periphery';

export interface DualParams {
  mode: Mode;
  durationS: number;
  intervalMs: number;
  targetDigit: number;
  targetRate: number;
  spotCm: number;
  persistenceS: number;
  gapMs: number;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende oder ungültige Werte → Standard */
export function dualParams(p: ExerciseParams): DualParams {
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
    mode: sel<Mode>('mode', ['dual', 'central', 'periphery'], 'dual'),
    durationS: num('durationS'),
    intervalMs: num('intervalMs'),
    targetDigit: Math.round(num('targetDigit')),
    targetRate: num('targetRate'),
    spotCm: num('spotCm'),
    persistenceS: num('persistenceS'),
    gapMs: num('gapMs'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** Radius des Berührkreises in der Mitte in cm (höchstens 28 % der kürzeren Feldseite, damit Platz für den Rand bleibt) */
export const CENTRAL_R_CM = 3;
/** Abstand zwischen Berührkreis und Randpunkt in cm */
export const CENTRAL_GAP_CM = 0.5;
/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;
/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Kleinste Dauer, ab der die Zahl in der Mitte wechseln darf: 2,5 Wechsel pro Sekunde (Blinkregel der App) */
export const MIN_INTERVAL_MS = 400;

/** Radius des Berührkreises für ein Feld in cm */
export function centralRadius(fieldWcm: number, fieldHcm: number): number {
  return Math.max(0.8, Math.min(CENTRAL_R_CM, 0.28 * Math.min(fieldWcm, fieldHcm)));
}

/** Größte Randpunkt-Größe (Durchmesser, cm), für die neben dem Berührkreis noch Platz ist */
export function maxSpotCm(fieldWcm: number, fieldHcm: number): number {
  const r = centralRadius(fieldWcm, fieldHcm);
  const free = Math.max(fieldWcm, fieldHcm) / 2 - r - CENTRAL_GAP_CM;
  return Math.max(1, free);
}

// ---------------------------------------------------------------------------
// Mitte: Zahlenfolge

export interface CentralParams {
  intervalMs: number;
  targetDigit: number;
  targetRate: number;
}

export type CentralTap = { type: 'hit'; rt: number } | { type: 'false_alarm' };

/** Zahlenfolge in der Mitte. `plan(n)` legt für die n-te Zahl (ab 0) fest, ob sie Zielzahl ist (Intro-Film); sonst Zufall. */
export class CentralStream {
  symbol: string | null = null;
  isTarget = false;
  answered = false;
  shownAt = 0;
  nextAt: number | null = null;
  hits = 0;
  misses = 0;
  falseAlarms = 0;
  rts: number[] = [];
  targets = 0;
  /** Zahl der bisher gezeigten Zahlen */
  steps = 0;
  private closed = false;

  constructor(
    private readonly p: CentralParams,
    private readonly rng: Rng,
    private readonly plan?: (n: number) => boolean,
  ) {}

  private step(at: number): void {
    const target = String(this.p.targetDigit);
    const isTarget = this.plan ? this.plan(this.steps) : this.rng.next() * 100 < this.p.targetRate;
    let sym: string;
    if (isTarget) sym = target;
    else {
      // eine andere Zahl 1–9 als die Zielzahl und als die vorige
      const pool = '123456789'.split('').filter((d) => d !== target && d !== this.symbol);
      sym = this.rng.pick(pool);
    }
    if (isTarget) this.targets++;
    this.steps++;
    this.symbol = sym;
    this.isTarget = isTarget;
    this.answered = false;
    this.shownAt = at;
    this.nextAt = at + this.p.intervalMs;
  }

  start(now: number): void {
    this.step(now);
  }

  update(now: number): void {
    if (this.closed || this.nextAt === null) return;
    while (now >= this.nextAt) {
      if (this.isTarget && !this.answered) this.misses++;
      this.step(this.nextAt);
    }
  }

  /** Berührung der Mitte zur Zeit `now` */
  respond(now: number): CentralTap | null {
    if (this.closed || this.nextAt === null) return null;
    this.update(now);
    if (this.isTarget && !this.answered) {
      this.answered = true;
      this.hits++;
      const rt = Math.max(0, now - this.shownAt);
      this.rts.push(rt);
      return { type: 'hit', rt };
    }
    this.falseAlarms++;
    return { type: 'false_alarm' };
  }

  /** Ende der Sitzung: die gerade nur angeschnittene Zahl zählt nicht mit (eine unbeantwortete Zielzahl daher auch nicht) */
  close(now: number): void {
    if (this.closed || this.nextAt === null) return;
    this.update(now);
    if (this.isTarget && !this.answered) this.targets--;
    this.closed = true;
  }
}

// ---------------------------------------------------------------------------
// Rand: Spot-Touch-Logik mit Abstand zum Berührkreis

const dist = (x1: number, y1: number, x2: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2);

/** Randpunkte wie in Spot-Touch (Zone „Rand“, mit Kreuz), aber mit Abstand zum Berührkreis in der Mitte */
export class EdgeSpots extends SpotSession {
  /** Radius des Berührkreises in cm */
  centralR: number;

  constructor(p: SpotParams, env: ConstructorParameters<typeof SpotSession>[1], centralR: number) {
    super(p, env);
    this.centralR = centralR;
  }

  override place(): { x: number; y: number } | null {
    const need = this.r + this.centralR + CENTRAL_GAP_CM;
    for (let i = 0; i < 20; i++) {
      const pos = super.place();
      if (!pos) return null;
      if (dist(pos.x, pos.y, this.fieldW / 2, this.fieldH / 2) >= need) return pos;
    }
    // sehr kleine Bühne: lieber keinen Punkt zeigen als einen, der vom Kreis überdeckt wird
    return null;
  }
}

// ---------------------------------------------------------------------------
// Beides zusammen

export interface DualEnv {
  rng: Rng;
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinster Trefferradius für die Randpunkte in cm (z. B. 24 px ÷ px/cm) */
  minHitRadiusCm?: number;
  /** Durchmesser der Randpunkte in cm nach Begrenzung auf die Bühne (Standard: Einstellung, begrenzt auf `maxSpotCm`) */
  spotCm?: number;
  /** Fester Ablauf der Zahlenfolge (Intro-Film) */
  plan?: (n: number) => boolean;
}

export type DualTap = CentralTap | Exclude<TapResult, null> | null;

export interface DualSummary {
  mode: Mode;
  central: null | {
    targets: number;
    hits: number;
    misses: number;
    falseAlarms: number;
    /** Mittlere Reaktionszeit in ms, null ohne Treffer */
    rtMean: number | null;
  };
  spots: null | {
    hits: number;
    misses: number;
    stray: number;
    rtMean: number | null;
  };
  /** Treffer insgesamt (Mitte + Rand) */
  hitsTotal: number;
}

/** Verbindet Zahlenfolge und Randpunkte. */
export class DualSession {
  readonly p: DualParams;
  readonly central: CentralStream | null;
  readonly spots: EdgeSpots | null;
  fieldW: number;
  fieldH: number;
  centralR: number;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;

  constructor(p: DualParams, env: DualEnv) {
    this.p = p;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.centralR = centralRadius(env.fieldWcm, env.fieldHcm);
    this.central = p.mode !== 'periphery' ? new CentralStream(p, env.rng, env.plan) : null;
    const diameter = Math.min(env.spotCm ?? p.spotCm, maxSpotCm(env.fieldWcm, env.fieldHcm));
    this.spots =
      p.mode !== 'central'
        ? new EdgeSpots(
            { durationS: p.durationS, diameterCm: diameter, persistenceS: p.persistenceS, simultaneous: 1, gapMs: p.gapMs, zone: 'periphery', fixation: 'yes', sound: 'no' },
            { rng: env.rng, fieldWcm: env.fieldWcm, fieldHcm: env.fieldHcm, minHitRadiusCm: env.minHitRadiusCm },
            this.centralR,
          )
        : null;
  }

  start(now: number): void {
    this.startedAt = now;
    this.central?.start(now);
    this.spots?.start(now);
  }

  isOver(now: number): boolean {
    return this.finished || (this.startedAt !== null && now - this.startedAt >= this.p.durationS * 1000);
  }

  remainingS(now: number): number {
    return this.startedAt === null ? this.p.durationS : Math.max(0, this.p.durationS - (now - this.startedAt) / 1000);
  }

  elapsedFrac(now: number): number {
    if (this.startedAt === null) return 0;
    return Math.min(1, Math.max(0, (now - this.startedAt) / (this.p.durationS * 1000)));
  }

  /** Feld hat sich geändert (Tablet gedreht): Kreis und Randpunkte passen sich an (gilt für neue Punkte, sichtbare werden geklemmt) */
  setField(wCm: number, hCm: number, spotCm?: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    this.centralR = centralRadius(wCm, hCm);
    if (this.spots) {
      this.spots.centralR = this.centralR;
      this.spots.setField(wCm, hCm, Math.min(spotCm ?? this.p.spotCm, maxSpotCm(wCm, hCm)));
    }
  }

  update(now: number): void {
    if (this.startedAt === null || this.finished) return;
    if (this.isOver(now)) {
      this.finished = true;
      this.endedAt = this.startedAt + this.p.durationS * 1000;
      this.central?.close(this.endedAt);
      this.spots?.update(now);
      return;
    }
    this.central?.update(now);
    this.spots?.update(now);
  }

  /** Liegt (x, y) im Berührkreis der Mitte? */
  inCenter(x: number, y: number): boolean {
    return dist(x, y, this.fieldW / 2, this.fieldH / 2) <= this.centralR;
  }

  /** Berührung bei (x, y) in cm; null = ohne Wirkung (Sitzung läuft nicht, oder die Stelle gehört zu keiner aktiven Aufgabe) */
  tap(x: number, y: number, now: number): DualTap {
    if (this.startedAt === null || this.finished || this.isOver(now)) return null;
    if (this.inCenter(x, y)) return this.central ? this.central.respond(now) : null;
    return this.spots ? this.spots.tap(x, y, now) : null;
  }

  summary(): DualSummary {
    const c = this.central;
    const s = this.spots?.summary() ?? null;
    return {
      mode: this.p.mode,
      central: c
        ? { targets: c.targets, hits: c.hits, misses: c.misses, falseAlarms: c.falseAlarms, rtMean: c.rts.length ? Math.round(mean(c.rts)) : null }
        : null,
      spots: s ? { hits: s.hits, misses: s.misses, stray: s.stray, rtMean: s.rtMean } : null,
      hitsTotal: (c?.hits ?? 0) + (s?.hits ?? 0),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte.
 */
export function tipFor(s: DualSummary): string {
  const c = s.central;
  const e = s.spots;
  if (s.hitsTotal === 0) return 'few';
  if (c && c.falseAlarms >= Math.max(3, 0.5 * c.targets)) return 'falseAlarms';
  if (c && c.targets >= 5 && c.misses >= 0.4 * c.targets) return 'centerMiss';
  if (e && e.hits + e.misses >= 5 && e.misses >= 0.4 * (e.hits + e.misses)) return 'edgeMiss';
  if (s.mode === 'dual') return 'costs';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je Treffer in Mitte und Rand */
export function pointsFor(hits: number): number {
  return Math.max(0, Math.round(hits)) * 10;
}

/** Hauptwert: Zielzahlen erkannt (Mitte); beim Modus „Nur Rand“ die getroffenen Punkte */
export function primaryOf(s: DualSummary): { key: 'c_hits' | 'p_hits'; value: number } {
  return s.central ? { key: 'c_hits', value: s.central.hits } : { key: 'p_hits', value: s.spots?.hits ?? 0 };
}
