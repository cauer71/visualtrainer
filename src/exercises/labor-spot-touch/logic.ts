/**
 * Spot-Touch – reine Logik (aus `SpotSession` im Labor-Prototyp, ex/spots.js).
 *
 * Zeiten in ms (beliebige Zeitbasis, hier die virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken
 * oberen Ecke des Spielfelds. Zufall nur über `Rng` (kein Math.random). Keine Darstellung, keine Eingabe.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Spots erscheinen zufällig im Feld (ganz im Feld, ohne Überlappung, je nach Zone/Fixationskreuz) und bleiben
 *   `persistenceS` Sekunden sichtbar; danach zählen sie als verpasst. Nach einem Treffer oder Ablauf kommt der
 *   nächste erst nach `gapMs`.
 * - Treffer = Tipp innerhalb von Radius + 0,3 cm (Toleranz für die Fingerkuppe), mindestens aber 24 px (Touch-Ziel);
 *   bei mehreren Spots zählt der nächste. Tipp daneben = Fehltipp (kein Abzug, der Spot bleibt).
 * - Ergänzungen gegenüber dem Prototyp: (1) Ein Spot kann erst getroffen werden, wenn er gezeigt wurde (Tipp-Zeit ≥
 *   Erscheinungszeit; Ereigniszeit und Bildzeit liegen bis zu einem Frame auseinander). (2) Ein zweiter Tipp
 *   auf dieselbe Stelle kurz nach einem Treffer (< 250 ms, „Doppeltipp“) wird ignoriert und zählt nicht als Fehltipp.
 *   (3) `setField` passt das Feld an (Tablet gedreht) und schiebt sichtbare Spots ins neue Feld.
 */
import { mean, median, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'durationS', type: 'number', unit: 's', min: 10, max: 600, step: 5, default: 60 },
  { key: 'diameterCm', type: 'number', unit: 'cm', min: 1, max: 15, step: 0.5, default: 5, summary: true },
  { key: 'persistenceS', type: 'number', unit: 's', min: 0.3, max: 10, step: 0.1, default: 1.5, summary: true },
  { key: 'simultaneous', type: 'number', unit: 'count', min: 1, max: 5, step: 1, default: 1, summary: true },
  { key: 'gapMs', type: 'number', unit: 'ms', min: 0, max: 3000, step: 50, default: 300 },
  { key: 'zone', type: 'select', default: 'all', options: ['all', 'periphery', 'center'] },
  { key: 'fixation', type: 'select', default: 'no', options: ['no', 'yes'] },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type Zone = 'all' | 'periphery' | 'center';

export interface SpotParams {
  durationS: number;
  diameterCm: number;
  persistenceS: number;
  simultaneous: number;
  gapMs: number;
  zone: Zone;
  fixation: 'yes' | 'no';
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function spotParams(p: ExerciseParams): SpotParams {
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
    durationS: num('durationS'),
    diameterCm: num('diameterCm'),
    persistenceS: num('persistenceS'),
    simultaneous: Math.round(num('simultaneous')),
    gapMs: num('gapMs'),
    zone: sel<Zone>('zone', ['all', 'periphery', 'center'], 'all'),
    fixation: sel('fixation', ['no', 'yes'], 'no'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** Toleranz für die ungenaue Fingerberührung (cm), zusätzlich zum Radius */
export const SLACK_CM = 0.3;
/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Zweiter Tipp auf dieselbe Stelle so kurz nach einem Treffer: ignoriert */
export const DOUBLE_TAP_MS = 250;
/** Mindestabstand zum Fixationskreuz (cm, zusätzlich zum Radius) */
export const FIXATION_CLEAR_CM = 1.2;
/** Mindestabstand zwischen gleichzeitigen Spots (cm, zusätzlich zu den Radien) */
export const SPOT_GAP_CM = 0.5;
/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;

export interface SpotEnv {
  rng: Rng;
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinster Trefferradius in cm (z. B. 24 px ÷ px/cm); Standard 0 */
  minHitRadiusCm?: number;
}

export interface Spot {
  id: number;
  x: number;
  y: number;
  shownAt: number;
}

export interface SpotTrial {
  nr: number;
  xCm: number;
  yCm: number;
  hit: boolean;
  /** Reaktionszeit in ms (nur Treffer) */
  rtMs: number | null;
}

export type TapResult =
  | { type: 'hit'; rt: number; spot: Spot }
  | { type: 'stray' }
  /** Doppeltipp auf die Stelle des gerade getroffenen Spots: ohne Wirkung */
  | { type: 'ignored' }
  | null;

export interface SpotSummary {
  hits: number;
  misses: number;
  stray: number;
  /** Treffer an allen gezeigten Spots (Treffer + verpasste) in %, null ohne Spots */
  accuracy: number | null;
  rtMean: number | null;
  rtMedian: number | null;
  /** Streuung der Reaktionszeiten, null bei weniger als 2 Treffern */
  rtSd: number | null;
  /** Treffer pro Minute (nur nach Ende der Sitzung) */
  rate: number | null;
  trials: SpotTrial[];
}

const dist = (x1: number, y1: number, x2: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2);

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Liegt (x, y) in der Zone? Zentrum: innerhalb 45 % des Feldradius (Ellipse), Peripherie: ab 60 % */
export function zoneOk(zone: Zone, x: number, y: number, W: number, H: number): boolean {
  const u = (x - W / 2) / (W / 2);
  const v = (y - H / 2) / (H / 2);
  const rr = Math.sqrt(u * u + v * v);
  if (zone === 'center') return rr <= 0.45;
  if (zone === 'periphery') return rr >= 0.6;
  return true;
}

/** Reine Spiellogik. */
export class SpotSession {
  readonly p: SpotParams;
  /** Radius der Punkte in cm (kann sich ändern, wenn die Bühne kleiner wird, siehe `setField`) */
  r: number;
  fieldW: number;
  fieldH: number;
  active: Spot[] = [];
  trials: SpotTrial[] = [];
  taps = 0;
  strayTaps = 0;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  private nextSpawnAt = 0;
  private nextId = 0;
  private lastHit: { x: number; y: number; t: number } | null = null;
  private readonly rng: Rng;
  private readonly minHit: number;

  constructor(p: SpotParams, env: SpotEnv) {
    this.p = p;
    this.rng = env.rng;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.r = p.diameterCm / 2;
    this.minHit = env.minHitRadiusCm ?? 0;
  }

  /** Trefferradius in cm: Radius + Toleranz, mindestens der kleinste Radius für Touch-Ziele */
  get hitRadius(): number {
    return Math.max(this.r + SLACK_CM, this.minHit);
  }

  start(now: number): void {
    this.startedAt = now;
    this.nextSpawnAt = now;
  }

  isOver(now: number): boolean {
    return this.finished || (this.startedAt !== null && now - this.startedAt >= this.p.durationS * 1000);
  }

  remainingS(now: number): number {
    return this.startedAt === null ? this.p.durationS : Math.max(0, this.p.durationS - (now - this.startedAt) / 1000);
  }

  /** Anteil der Zeit, die vergangen ist (0..1) */
  elapsedFrac(now: number): number {
    if (this.startedAt === null) return 0;
    return Math.min(1, Math.max(0, (now - this.startedAt) / (this.p.durationS * 1000)));
  }

  /**
   * Feld hat sich geändert (Tablet gedreht): sichtbare Spots werden ins neue Feld geschoben. Mit `diameterCm` ändert
   * sich auch die Größe (z. B. weil sie auf der kleineren Bühne begrenzt wird); neue Spots haben dann den neuen Radius.
   */
  setField(wCm: number, hCm: number, diameterCm?: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    if (diameterCm !== undefined && diameterCm > 0) this.r = diameterCm / 2;
    const b = this.bounds();
    for (const s of this.active) {
      s.x = Math.min(b.maxX, Math.max(b.minX, s.x));
      s.y = Math.min(b.maxY, Math.max(b.minY, s.y));
    }
  }

  private bounds(): { minX: number; maxX: number; minY: number; maxY: number } {
    const W = this.fieldW;
    const H = this.fieldH;
    const r = this.r;
    return { minX: Math.min(r, W / 2), maxX: Math.max(W - r, W / 2), minY: Math.min(r, H / 2), maxY: Math.max(H - r, H / 2) };
  }

  /** Zufälliger freier Platz (ganz im Feld, in der Zone, fern vom Kreuz, ohne Überlappung) oder null */
  place(): { x: number; y: number } | null {
    const { minX, maxX, minY, maxY } = this.bounds();
    const W = this.fieldW;
    const H = this.fieldH;
    const r = this.r;
    for (let i = 0; i < 300; i++) {
      const x = minX + this.rng.next() * (maxX - minX);
      const y = minY + this.rng.next() * (maxY - minY);
      if (!zoneOk(this.p.zone, x, y, W, H)) continue;
      if (this.p.fixation === 'yes' && dist(x, y, W / 2, H / 2) < r + FIXATION_CLEAR_CM) continue;
      if (this.active.some((s) => dist(x, y, s.x, s.y) < 2 * r + SPOT_GAP_CM)) continue;
      return { x, y };
    }
    return null;
  }

  private record(spot: Spot, hit: boolean, rtMs: number | null): void {
    this.trials.push({
      nr: this.trials.length + 1,
      xCm: round(spot.x, 2) ?? 0,
      yCm: round(spot.y, 2) ?? 0,
      hit,
      rtMs: rtMs === null ? null : Math.round(rtMs),
    });
  }

  /** Pro Bild aufrufen: Ablauf prüfen, verpasste Spots werten, neue erscheinen lassen */
  update(now: number): void {
    if (this.startedAt === null || this.finished) return;
    if (this.isOver(now)) {
      this.finished = true;
      this.endedAt = this.startedAt + this.p.durationS * 1000;
      this.active = [];
      return;
    }
    for (const s of this.active.slice()) {
      const expiresAt = s.shownAt + this.p.persistenceS * 1000;
      if (now >= expiresAt) {
        this.record(s, false, null);
        this.active.splice(this.active.indexOf(s), 1);
        this.nextSpawnAt = Math.max(this.nextSpawnAt, expiresAt + this.p.gapMs);
      }
    }
    while (this.active.length < this.p.simultaneous && now >= this.nextSpawnAt) {
      const pos = this.place();
      if (!pos) break;
      this.active.push({ id: ++this.nextId, x: pos.x, y: pos.y, shownAt: now });
    }
  }

  /** Tipp bei (x, y) in cm zur Zeit `now`; null = Sitzung läuft nicht */
  tap(x: number, y: number, now: number): TapResult {
    if (this.startedAt === null || this.finished || this.isOver(now)) return null;
    const hr = this.hitRadius;
    const lh = this.lastHit;
    if (lh && now - lh.t >= 0 && now - lh.t < DOUBLE_TAP_MS && dist(x, y, lh.x, lh.y) <= hr) return { type: 'ignored' };
    this.taps++;
    let best: Spot | null = null;
    let bestD = Number.POSITIVE_INFINITY;
    for (const s of this.active) {
      if (now < s.shownAt) continue; // noch nicht gezeigt: kann nicht gemeint sein
      const d = dist(x, y, s.x, s.y);
      if (d <= hr && d < bestD) {
        best = s;
        bestD = d;
      }
    }
    if (!best) {
      this.strayTaps++;
      return { type: 'stray' };
    }
    const rt = now - best.shownAt;
    this.record(best, true, rt);
    this.active.splice(this.active.indexOf(best), 1);
    this.nextSpawnAt = Math.max(this.nextSpawnAt, now + this.p.gapMs);
    this.lastHit = { x: best.x, y: best.y, t: now };
    return { type: 'hit', rt, spot: best };
  }

  summary(): SpotSummary {
    const hitTrials = this.trials.filter((t) => t.hit);
    const rts = hitTrials.map((t) => t.rtMs ?? 0);
    const shown = this.trials.length;
    const minutes = this.endedAt !== null && this.startedAt !== null ? (this.endedAt - this.startedAt) / 60000 : 0;
    return {
      hits: hitTrials.length,
      misses: shown - hitTrials.length,
      stray: this.strayTaps,
      accuracy: shown ? round((100 * hitTrials.length) / shown, 1) : null,
      rtMean: rts.length ? round(mean(rts), 0) : null,
      rtMedian: rts.length ? round(median(rts), 0) : null,
      rtSd: rts.length >= 2 ? round(sd(rts), 0) : null,
      rate: minutes > 0 ? round(hitTrials.length / minutes, 1) : null,
      trials: this.trials.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * viele Fehltipps → erst genau, dann schnell; viele verpasste → leichter einstellen; sehr sicher → nur eine
 * Einstellung schwerer machen; stark schwankende Zeiten → ruhiger reagieren.
 */
export function tipFor(s: SpotSummary): string {
  const shown = s.hits + s.misses;
  if (shown === 0 || s.hits === 0) return 'few';
  if (s.stray >= 3 && s.stray >= 0.25 * (s.hits + s.stray)) return 'stray';
  if (s.accuracy !== null && s.accuracy < 70 && shown >= 5) return 'misses';
  if (s.accuracy !== null && s.accuracy >= 90 && s.hits >= 10) return 'harder';
  if (s.rtMean !== null && s.rtSd !== null && s.hits >= 8 && s.rtSd > 0.35 * s.rtMean) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je Treffer */
export function pointsFor(hits: number): number {
  return Math.max(0, Math.round(hits)) * 10;
}
