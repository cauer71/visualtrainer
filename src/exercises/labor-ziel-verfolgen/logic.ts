/**
 * Ziel verfolgen – reine Logik (aus `FollowSession` und `makePath` im Labor-Prototyp, ex/follow.js).
 *
 * Zeiten in ms (virtuelle Zeit des Runners), Koordinaten in cm relativ zur linken oberen Ecke des Spielfelds. Kein DOM,
 * kein Zufall (die Bahn ist fest), keine Darstellung.
 *
 * Regeln (wie im Prototyp, wo nicht anders vermerkt):
 * - Ein Ziel läuft mit gleichmäßiger Geschwindigkeit (cm/s entlang der Bahn, nicht pro Bild) auf einer geschlossenen
 *   Bahn (Ellipse, liegende Acht, verschlungene Kurve). „Auf dem Ziel“ = Finger liegt auf dem Bildschirm UND der Abstand
 *   zur Zielmitte ist höchstens Radius + Spielraum. Gemessen wird die Zeit auf dem Ziel in Prozent der ganzen Zeit
 *   (auch der ohne Finger), die mittlere Abweichung (nur bei Fingerkontakt), die längste ununterbrochene Verfolgung,
 *   die verlorenen Verbindungen und die Zeit mit Fingerkontakt.
 * - Ein einzelner Zeitsprung zählt höchstens 0,1 s (wie im Prototyp).
 * Ergänzungen gegenüber dem Prototyp: (1) Trefferradius mindestens 24 px (Touch-Ziel; `minHitRadiusCm`). (2) Die Bahn
 *   merkt sich die zurückgelegte Strecke, nicht die Zeit: `setField` baut die Bahn bei geänderter Bühne (Tablet gedreht)
 *   neu auf und das Ziel bleibt an derselben Stelle der Runde. (3) Die Zielgröße kann live begrenzt werden (`setField`).
 */
import type { ExerciseParams, ParamDef } from '../../core/types';

/** Einstellungen (Standardwerte und Grenzen aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'durationS', type: 'number', unit: 's', min: 10, max: 180, step: 5, default: 30 },
  { key: 'path', type: 'select', default: 'ellipse', options: ['ellipse', 'eight', 'lissajous'], summary: true },
  // cm/s hat keine eigene Einheit im Framework: Einheit steht in Beschriftung und Kurzfassung (texts.ts)
  { key: 'speedCmS', type: 'number', min: 2, max: 40, step: 1, default: 8, summary: true },
  { key: 'diameterCm', type: 'number', unit: 'cm', min: 1, max: 10, step: 0.5, default: 3, summary: true },
  { key: 'toleranceCm', type: 'number', unit: 'cm', min: 0, max: 3, step: 0.1, default: 0.5 },
  { key: 'showTrail', type: 'select', default: 'yes', options: ['yes', 'no'] },
];

export type PathKind = 'ellipse' | 'eight' | 'lissajous';

export interface FollowParams {
  durationS: number;
  path: PathKind;
  speedCmS: number;
  diameterCm: number;
  toleranceCm: number;
  showTrail: 'yes' | 'no';
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function followParams(p: ExerciseParams): FollowParams {
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
    path: sel<PathKind>('path', ['ellipse', 'eight', 'lissajous'], 'ellipse'),
    speedCmS: num('speedCmS'),
    diameterCm: num('diameterCm'),
    toleranceCm: num('toleranceCm'),
    showTrail: sel('showTrail', ['yes', 'no'], 'yes'),
  };
}

/** Kleinster Trefferradius in Pixeln (Touch-Ziele ≥ 24 px) */
export const MIN_HIT_PX = 24;
/** Ein einzelner Zeitsprung zählt höchstens so viele Sekunden (Prototyp) */
export const MAX_STEP_S = 0.1;
/** Schnellmodus (?quick=1): Dauer der Messung */
export const QUICK_DURATION_S = 8;
/** Stützpunkte der Bahn */
const SAMPLES = 1440;

export interface Vec {
  x: number;
  y: number;
}

/** Auf `d` Nachkommastellen runden; nicht endliche Werte → null */
export function round(x: number | null | undefined, d = 1): number | null {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  const f = 10 ** d;
  return Math.round(x * f) / f;
}

/** Parametrische Bahn t in [0, 2π). */
export function pathPoint(kind: PathKind, t: number, cx: number, cy: number, rx: number, ry: number): Vec {
  if (kind === 'eight') return { x: cx + rx * Math.sin(t), y: cy + ry * Math.sin(2 * t) };
  if (kind === 'lissajous') return { x: cx + rx * Math.sin(3 * t + Math.PI / 2), y: cy + ry * Math.sin(2 * t) };
  return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
}

export interface FollowPath {
  points: Vec[];
  /** Länge der geschlossenen Bahn (cm) */
  length: number;
  /** Ort bei der Strecke s (cm), gleichmäßig nach Bogenlänge, beliebig oft um die Bahn */
  at(s: number): Vec;
}

/** Bahn mit Bogenlängen-Tabelle: Ort bei Strecke s (gleichmäßige Geschwindigkeit). */
export function makePath(kind: PathKind, W: number, H: number, margin: number): FollowPath {
  const cx = W / 2;
  const cy = H / 2;
  const rx = Math.max(1, W / 2 - margin);
  const ry = Math.max(1, H / 2 - margin);
  const pts: Vec[] = [];
  const cum: number[] = [0];
  for (let i = 0; i <= SAMPLES; i++) {
    const pt = pathPoint(kind, (2 * Math.PI * i) / SAMPLES, cx, cy, rx, ry);
    pts.push(pt);
    if (i) cum.push(cum[i - 1] + Math.hypot(pt.x - pts[i - 1].x, pt.y - pts[i - 1].y));
  }
  const total = cum[SAMPLES];
  return {
    points: pts,
    length: total,
    at(s: number): Vec {
      const d = ((s % total) + total) % total;
      let lo = 0;
      let hi = SAMPLES;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= d) lo = mid;
        else hi = mid;
      }
      const seg = cum[hi] - cum[lo] || 1;
      const f = (d - cum[lo]) / seg;
      return { x: pts[lo].x + (pts[hi].x - pts[lo].x) * f, y: pts[lo].y + (pts[hi].y - pts[lo].y) * f };
    },
  };
}

/** Abstand der Bahn vom Feldrand (cm): Zielradius + 1 cm, wie im Prototyp */
export function pathMargin(diameterCm: number): number {
  return diameterCm / 2 + 1;
}

export interface FollowEnv {
  /** Feldgröße in cm */
  fieldWcm: number;
  fieldHcm: number;
  /** Kleinster Trefferradius in cm (z. B. 24 px ÷ px/cm); Standard 0 */
  minHitRadiusCm?: number;
}

export interface FollowSummary {
  /** Zeit auf dem Ziel in % der ganzen Zeit (null ohne Zeit) */
  onPct: number | null;
  onS: number;
  /** Mittlerer Abstand Finger–Zielmitte in cm, nur bei Fingerkontakt (null ohne Kontakt) */
  meanDist: number | null;
  bestRun: number;
  losses: number;
  /** Zeit mit Fingerkontakt in % der ganzen Zeit (null ohne Zeit) */
  touchPct: number | null;
  /** Gemessene Gesamtzeit in s */
  totalS: number;
}

/** Reine Verfolgungs-Logik. */
export class FollowSession {
  readonly p: FollowParams;
  fieldW: number;
  fieldH: number;
  /** Durchmesser des Ziels in cm (kann sich ändern, wenn die Bühne kleiner wird, siehe `setField`) */
  diameter: number;
  path: FollowPath;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  /** Gemessene Zeit in s (nur nach `start`) */
  elapsed = 0;
  /** Zurückgelegte Strecke auf der Bahn in cm */
  distance = 0;
  pointer = { x: 0, y: 0, down: false };
  on = 0;
  off = 0;
  touching = 0;
  distSum = 0;
  distN = 0;
  run = 0;
  bestRun = 0;
  losses = 0;
  target: Vec;
  private last: number | null = null;
  private wasOn = false;
  private readonly minHit: number;

  constructor(p: FollowParams, env: FollowEnv) {
    this.p = p;
    this.fieldW = env.fieldWcm;
    this.fieldH = env.fieldHcm;
    this.diameter = p.diameterCm;
    this.minHit = env.minHitRadiusCm ?? 0;
    this.path = makePath(p.path, this.fieldW, this.fieldH, pathMargin(this.diameter));
    this.target = this.path.at(0);
  }

  /** Trefferradius in cm: Radius + Spielraum, mindestens der kleinste Radius für Touch-Ziele */
  get hitRadius(): number {
    return Math.max(this.diameter / 2 + this.p.toleranceCm, this.minHit);
  }

  start(now: number): void {
    this.startedAt = now;
    this.last = now;
  }

  setPointer(x: number, y: number, down: boolean): void {
    this.pointer = { x, y, down };
  }

  /**
   * Feld hat sich geändert (Tablet gedreht): Bahn neu aufbauen; das Ziel bleibt an derselben Stelle der Runde
   * (Anteil der Rundenlänge). Mit `diameterCm` ändert sich auch die Größe (z. B. weil sie auf der Bühne begrenzt wird).
   */
  setField(wCm: number, hCm: number, diameterCm?: number): void {
    const frac = this.path.length > 0 ? (((this.distance % this.path.length) + this.path.length) % this.path.length) / this.path.length : 0;
    this.fieldW = wCm;
    this.fieldH = hCm;
    if (diameterCm !== undefined && diameterCm > 0) this.diameter = diameterCm;
    this.path = makePath(this.p.path, wCm, hCm, pathMargin(this.diameter));
    this.distance = frac * this.path.length;
    this.target = this.path.at(this.distance);
  }

  /** Ist (x, y) „auf dem Ziel“ (ohne Fingerkontakt zu prüfen)? */
  isOn(x: number, y: number): boolean {
    return Math.hypot(x - this.target.x, y - this.target.y) <= this.hitRadius;
  }

  /** Pro Bild aufrufen. */
  update(now: number): void {
    if (this.startedAt === null || this.last === null || this.finished) return;
    const dt = Math.min(MAX_STEP_S, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.elapsed += dt;
    this.distance += this.p.speedCmS * dt;
    this.target = this.path.at(this.distance);
    const d = Math.hypot(this.pointer.x - this.target.x, this.pointer.y - this.target.y);
    const onTarget = this.pointer.down && d <= this.hitRadius;
    if (onTarget) {
      this.on += dt;
      this.run += dt;
      this.bestRun = Math.max(this.bestRun, this.run);
      this.wasOn = true;
    } else {
      this.off += dt;
      if (this.wasOn) {
        this.losses++;
        this.wasOn = false;
      }
      this.run = 0;
    }
    if (this.pointer.down) {
      this.touching += dt;
      this.distSum += d * dt;
      this.distN += dt;
    }
    if (this.elapsed >= this.p.durationS) {
      this.finished = true;
      this.endedAt = now;
    }
  }

  /** Aktueller Anteil auf dem Ziel in % (für die Anzeige; 0 vor der ersten Zeit) */
  liveOnPct(): number {
    const total = this.on + this.off;
    return total > 0 ? (100 * this.on) / total : 0;
  }

  remainingS(): number {
    return Math.max(0, this.p.durationS - this.elapsed);
  }

  summary(): FollowSummary {
    const total = this.on + this.off;
    return {
      onPct: total > 0 ? round((100 * this.on) / total, 1) : null,
      onS: round(this.on, 1) ?? 0,
      meanDist: this.distN > 0 ? round(this.distSum / this.distN, 2) : null,
      bestRun: round(this.bestRun, 1) ?? 0,
      losses: this.losses,
      touchPct: total > 0 ? round((100 * this.touching) / total, 1) : null,
      totalS: round(total, 1) ?? 0,
    };
  }
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte:
 * kaum Fingerkontakt → erst einmal dranbleiben; sehr hoher Anteil → eine Einstellung schwerer; sehr niedriger →
 * leichter; viele Verluste → ruhiger wieder einfangen.
 */
export function tipFor(s: FollowSummary): string {
  if (s.onPct === null || s.touchPct === null || s.touchPct < 30) return 'touch';
  if (s.onPct >= 90 && s.losses <= 2) return 'harder';
  if (s.onPct < 50) return 'easier';
  if (s.losses >= 6) return 'lost';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je Sekunde auf dem Ziel */
export function pointsFor(onS: number): number {
  return Math.max(0, Math.round(onS * 10));
}
