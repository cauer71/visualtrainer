/**
 * Start-Ziel-Reaktion – reine Logik (aus `SprintSession` im Labor-Prototyp, ex/sprint.js).
 *
 * Zeiten in ms (beliebige Zeitbasis, hier die virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken oberen
 * Ecke des Spielfelds. Zufall nur über `Rng` (kein Math.random). Keine Darstellung, keine Eingabe.
 *
 * Ablauf (wie im Prototyp): Finger auf die Startfläche legen und halten (`homeDown`) → nach zufälliger Wartezeit
 * leuchtet das Ziel auf → so schnell wie möglich loslassen (`homeUp`: Reaktionszeit) → Ziel berühren (`tap`:
 * Bewegungszeit). Zu früh losgelassen = Fehlstart (der Durchgang beginnt neu). Nicht rechtzeitig losgelassen (2 s) bzw.
 * Ziel nicht in 3 s erreicht beendet den Durchgang.
 *
 * Abweichungen vom Prototyp:
 * (1) Loslassen in den ersten `MIN_RT_MS` (100 ms) nach dem Aufleuchten kann keine Reaktion sein (auch Ereigniszeit und
 *     Bildzeit liegen bis zu einem Bild auseinander): es zählt als Fehlstart.
 * (2) Die mittlere Reaktionszeit zählt alle Durchgänge mit gemessenem Loslassen (auch wenn das Ziel danach nicht
 *     rechtzeitig berührt wurde), nicht nur die erfolgreichen: Das Loslassen hängt nicht vom Treffen ab.
 * (3) Startfläche und Ziel werden auf die Bühne begrenzt (`setField` bei gedrehtem Tablet; das Ziel liegt nie über den
 *     Rand hinaus oder auf der Startfläche, wo das Feld es erlaubt); Trefferfläche mindestens 24 px.
 */
import { mean, median, sd } from '../../core/stats';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'trials', type: 'number', unit: 'count', min: 5, max: 60, step: 1, default: 15 },
  { key: 'minDelayMs', type: 'number', unit: 'ms', min: 500, max: 5000, step: 100, default: 1000 },
  { key: 'maxDelayMs', type: 'number', unit: 'ms', min: 500, max: 8000, step: 100, default: 3500 },
  { key: 'distanceCm', type: 'number', unit: 'cm', min: 5, max: 60, step: 1, default: 20, summary: true },
  { key: 'targetCm', type: 'number', unit: 'cm', min: 1.5, max: 12, step: 0.5, default: 4, summary: true },
  { key: 'target', type: 'select', default: 'top', options: ['top', 'random'], summary: true },
  // Ton ändert die Messung nicht: gehört nicht zum Vergleichsschlüssel
  { key: 'sound', type: 'select', default: 'no', options: ['no', 'yes'], neutral: true },
];

export type TargetPos = 'top' | 'random';

export interface SprintParams {
  trials: number;
  minDelayMs: number;
  maxDelayMs: number;
  distanceCm: number;
  targetCm: number;
  target: TargetPos;
  sound: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function sprintParams(p: ExerciseParams): SprintParams {
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
    minDelayMs: num('minDelayMs'),
    maxDelayMs: num('maxDelayMs'),
    distanceCm: num('distanceCm'),
    targetCm: num('targetCm'),
    target: sel<TargetPos>('target', ['top', 'random'], 'top'),
    sound: sel('sound', ['no', 'yes'], 'no'),
  };
}

/** So lange darf das Loslassen nach dem Aufleuchten dauern (ms) */
export const GO_TIMEOUT_MS = 2000;
/** So lange darf der Weg zum Ziel nach dem Loslassen dauern (ms) */
export const MOVE_TIMEOUT_MS = 3000;
/** Loslassen früher als so viele ms nach dem Aufleuchten kann keine Reaktion sein: Fehlstart */
export const MIN_RT_MS = 100;
/** Toleranz für die ungenaue Fingerberührung (cm), zusätzlich zum Radius */
export const SLACK_CM = 0.3;
/** Radius der Startfläche (cm) */
export const HOME_R_CM = 1.8;
/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Schnellmodus (?quick=1): Anzahl der Durchgänge und Wartezeiten */
export const QUICK_TRIALS = 3;
export const QUICK_DELAY_MIN_MS = 600;
export const QUICK_DELAY_MAX_MS = 1200;

export type SprintState = 'idle' | 'armed' | 'go' | 'moving' | 'done';
export type Outcome = 'hit' | 'no_release' | 'no_target';

export interface SprintTrial {
  nr: number;
  outcome: Outcome;
  /** Reaktionszeit (Loslassen) in ms; fehlt bei „nicht losgelassen“ */
  rtMs: number | null;
  /** Bewegungszeit (Loslassen bis Berührung) in ms; nur bei Treffern */
  mtMs: number | null;
}

export type HomeDownResult = { type: 'armed' } | null;
export type HomeUpResult = { type: 'false_start' } | { type: 'released'; rt: number } | null;
export type SprintTap = { type: 'hit'; rt: number; mt: number } | { type: 'miss_tap' } | null;

export interface SprintSummary {
  /** erfolgreiche Durchgänge (Ziel berührt) */
  hits: number;
  /** abgeschlossene Durchgänge (ohne Fehlstarts) */
  done: number;
  falseStarts: number;
  errorTaps: number;
  /** nicht rechtzeitig losgelassen */
  noRelease: number;
  /** Reaktionszeit über alle Durchgänge mit gemessenem Loslassen; null, wenn keiner */
  rtMean: number | null;
  rtMedian: number | null;
  /** Streuung, null bei weniger als 2 Werten */
  rtSd: number | null;
  /** Bewegungszeit der Treffer; null ohne Treffer */
  mtMean: number | null;
  trials: SprintTrial[];
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

export interface SprintEnv {
  rng: Rng;
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinster Trefferradius in cm (z. B. 24 px ÷ px/cm); Standard 0 */
  minHitRadiusCm?: number;
}

/** Reine Spiellogik als Zustandsautomat. */
export class SprintSession {
  readonly p: SprintParams;
  fieldW: number;
  fieldH: number;
  home: { x: number; y: number };
  state: SprintState = 'idle';
  /** abgeschlossene Durchgänge (ohne Fehlstarts) */
  done = 0;
  trials: SprintTrial[] = [];
  falseStarts = 0;
  errorTaps = 0;
  target: { x: number; y: number } | null = null;
  onsetAt = 0;
  shownAt = 0;
  releasedAt = 0;
  reaction = 0;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  /** Zeit des letzten Fehlstarts bzw. Zeitüberschreitung (für Hinweise auf der Oberfläche) */
  lastEvent: { type: 'false_start' | 'no_release' | 'no_target'; t: number } | null = null;
  /** Zielradius in cm (kann sich ändern, wenn die Bühne kleiner wird, siehe `setField`) */
  targetR: number;
  private readonly rng: Rng;
  private readonly minHit: number;

  constructor(p: SprintParams, env: SprintEnv) {
    this.p = p;
    this.rng = env.rng;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.minHit = env.minHitRadiusCm ?? 0;
    this.targetR = p.targetCm / 2;
    this.home = this.homePos();
  }

  /** Startfläche unten in der Mitte */
  private homePos(): { x: number; y: number } {
    return { x: this.fieldW / 2, y: Math.max(this.fieldH - HOME_R_CM - 1, this.fieldH * 0.8) };
  }

  /** Feld hat sich geändert (Tablet gedreht): Startfläche und (falls sichtbar) Ziel neu setzen */
  setField(wCm: number, hCm: number, targetCm?: number): void {
    this.fieldW = wCm;
    this.fieldH = hCm;
    if (targetCm !== undefined && targetCm > 0) this.targetR = targetCm / 2;
    this.home = this.homePos();
    if (this.target) {
      const r = this.targetR;
      this.target = {
        x: Math.min(Math.max(r, this.fieldW - r), Math.max(Math.min(r, this.fieldW / 2), this.target.x)),
        y: Math.min(Math.max(r, this.fieldH - r), Math.max(Math.min(r, this.fieldH / 2), this.target.y)),
      };
    }
  }

  start(now: number): void {
    this.startedAt = now;
  }

  /** Ort des nächsten Ziels: über der Startfläche im Abstand `distanceCm` (begrenzt aufs Feld), je nach Einstellung im Halbkreis */
  pickTarget(): { x: number; y: number } {
    const r = this.targetR;
    const maxD = Math.max(1, Math.min(this.p.distanceCm, this.home.y - r - 0.5));
    let ang = 0;
    if (this.p.target === 'random') ang = (this.rng.next() * 2 - 1) * (Math.PI / 3);
    let x = this.home.x + Math.sin(ang) * maxD;
    let y = this.home.y - Math.cos(ang) * maxD;
    x = Math.min(Math.max(r, this.fieldW - r), Math.max(Math.min(r, this.fieldW / 2), x));
    y = Math.min(Math.max(r, this.fieldH - r), Math.max(Math.min(r, this.fieldH / 2), y));
    return { x, y };
  }

  /** Radius der Startfläche samt Toleranz (mindestens ein Touch-Ziel) */
  get homeHitRadius(): number {
    return Math.max(HOME_R_CM + SLACK_CM, this.minHit);
  }

  /** Trefferradius des Ziels in cm: Radius + Toleranz, mindestens ein Touch-Ziel */
  get targetHitRadius(): number {
    return Math.max(this.targetR + SLACK_CM, this.minHit);
  }

  /** Finger liegt auf der Startfläche → Wartezeit beginnt (nur im Leerlauf) */
  homeDown(now: number): HomeDownResult {
    if (this.finished || this.state !== 'idle') return null;
    this.state = 'armed';
    const lo = this.p.minDelayMs;
    const hi = Math.max(this.p.maxDelayMs, lo);
    this.onsetAt = now + lo + this.rng.next() * (hi - lo);
    return { type: 'armed' };
  }

  /** Finger verlässt die Startfläche */
  homeUp(now: number): HomeUpResult {
    if (this.state === 'armed') {
      this.falseStart(now);
      return { type: 'false_start' };
    }
    if (this.state === 'go') {
      const rt = now - this.shownAt;
      if (rt < MIN_RT_MS) {
        this.falseStart(now);
        return { type: 'false_start' };
      }
      this.reaction = rt;
      this.releasedAt = now;
      this.state = 'moving';
      return { type: 'released', rt };
    }
    return null;
  }

  private falseStart(now: number): void {
    this.falseStarts++;
    this.state = 'idle';
    this.target = null;
    this.lastEvent = { type: 'false_start', t: now };
  }

  private endTrial(now: number, rt: number | null, mt: number | null, outcome: Outcome): void {
    this.trials.push({ nr: this.done + 1, outcome, rtMs: rt === null ? null : Math.round(rt), mtMs: mt === null ? null : Math.round(mt) });
    this.done++;
    this.target = null;
    if (outcome !== 'hit') this.lastEvent = { type: outcome, t: now };
    if (this.done >= this.p.trials) {
      this.finished = true;
      this.endedAt = now;
      this.state = 'done';
    } else this.state = 'idle';
  }

  /** Pro Bild aufrufen: Ziel aufleuchten lassen bzw. Zeitüberschreitungen werten */
  update(now: number): void {
    if (this.state === 'armed' && now >= this.onsetAt) {
      this.state = 'go';
      this.shownAt = now;
      this.target = this.pickTarget();
    } else if (this.state === 'go' && now - this.shownAt >= GO_TIMEOUT_MS) {
      this.endTrial(now, null, null, 'no_release');
    } else if (this.state === 'moving' && now - this.releasedAt >= MOVE_TIMEOUT_MS) {
      this.endTrial(now, this.reaction, null, 'no_target');
    }
  }

  /** Liegt (x, y) auf der Startfläche? */
  inHome(x: number, y: number): boolean {
    return Math.hypot(x - this.home.x, y - this.home.y) <= this.homeHitRadius;
  }

  /** Tipp bei (x, y) in cm zur Zeit `now`; null = es wird gerade kein Ziel gesucht */
  tap(x: number, y: number, now: number): SprintTap {
    if (this.state !== 'moving' || !this.target) return null;
    if (Math.hypot(x - this.target.x, y - this.target.y) <= this.targetHitRadius) {
      const mt = now - this.releasedAt;
      const rt = this.reaction;
      this.endTrial(now, rt, mt, 'hit');
      return { type: 'hit', rt, mt };
    }
    this.errorTaps++;
    return { type: 'miss_tap' };
  }

  summary(): SprintSummary {
    const hits = this.trials.filter((t) => t.outcome === 'hit');
    const rts = this.trials.filter((t) => t.rtMs !== null).map((t) => t.rtMs as number);
    const mts = hits.map((t) => t.mtMs ?? 0);
    return {
      hits: hits.length,
      done: this.done,
      falseStarts: this.falseStarts,
      errorTaps: this.errorTaps,
      noRelease: this.trials.filter((t) => t.outcome === 'no_release').length,
      rtMean: rts.length ? round(mean(rts), 0) : null,
      rtMedian: rts.length ? round(median(rts), 0) : null,
      rtSd: rts.length >= 2 ? round(sd(rts), 0) : null,
      mtMean: mts.length ? round(mean(mts), 0) : null,
      trials: this.trials.slice(),
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * viele Fehlstarts → ruhig halten; viele Fehltipps → genauer zielen; oft nicht losgelassen → aufmerksam bleiben;
 * fast fehlerfrei → genau eine Einstellung schwerer; stark schwankende Zeiten → locker halten.
 */
export function tipFor(s: SprintSummary): string {
  if (s.done === 0 || s.rtMean === null) return 'few';
  if (s.falseStarts >= 3 && s.falseStarts >= 0.25 * (s.done + s.falseStarts)) return 'false_start';
  if (s.errorTaps >= 3 && s.errorTaps >= 0.25 * s.done) return 'aim';
  if (s.noRelease >= 2) return 'slow';
  if (s.hits === s.done && s.done >= 10 && s.falseStarts <= 1 && s.errorTaps <= 1) return 'harder';
  if (s.rtSd !== null && s.done >= 8 && s.rtSd > 0.35 * s.rtMean) return 'steady';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je erfolgreichem Durchgang */
export function pointsFor(hits: number): number {
  return Math.max(0, Math.round(hits)) * 10;
}
