/**
 * Slalom – reine Logik (aus `SlalomSession` im Labor-Prototyp, ex/slalom.js).
 *
 * Tore laufen von oben nach unten, eine Kugel unten wird seitlich gesteuert (Zeiger, Pfeiltasten oder Gerätekippen, siehe
 * `_shared/labor-steuerung.ts`) und soll durch die Lücken fahren. Koordinaten in cm relativ zur linken oberen Ecke des Spielfelds,
 * Zeiten in ms (virtuelle Zeit), Bewegung mit `dt` (bildratenunabhängig), Zufall nur über `Rng`. Die App liest keine Plattform aus.
 *
 * Abweichungen vom Prototyp:
 * - Alle Größen passen sich dem Feld an (Handy ist nur ≈ 10 cm breit): Kugelradius ≈ 10 % der kürzeren Feldseite (0,5–1,2 cm),
 *   Torlücke höchstens 80 % der Feldbreite und mindestens Kugeldurchmesser + 1,2 cm, Abstand der Tore höchstens 60 % der Feldhöhe.
 *   Die Kugel bleibt ganz im Feld (Prototyp: Mittelpunkt bis zum Rand).
 * - Tore und Kugel werden beim Drehen des Tablets mit umgerechnet (`setField`).
 * - Zusätzlich die Zahl der gewerteten Tore; Torlücke und Abstand werden mit den tatsächlich benutzten Werten ausgewiesen.
 * - Der Zufallsschritt zwischen zwei Toren ist begrenzt (35 % der Feldbreite wie im Prototyp), die Mitte der Lücke bleibt im Feld.
 */
import { applySteering, type SteerInput } from '../_shared/labor-steuerung';
import type { ExerciseParams, ParamDef } from '../../core/types';
import type { Rng } from '../../core/rng';

/** Einstellungen (Schlüssel, Grenzen und Standard aus dem Prototyp); Texte in texts.ts */
export const PARAMS: readonly ParamDef[] = [
  { key: 'durationS', type: 'number', unit: 's', min: 20, max: 180, step: 10, default: 60 },
  { key: 'gapCm', type: 'number', unit: 'cm', min: 4, max: 24, step: 1, default: 12, summary: true },
  // Geschwindigkeit in cm pro Sekunde (Einheit steht im Text)
  { key: 'speedCmS', type: 'number', min: 4, max: 40, step: 1, default: 14, summary: true },
  { key: 'speedUpPct', type: 'number', unit: 'percent', min: 0, max: 100, step: 5, default: 20 },
  { key: 'spacingCm', type: 'number', unit: 'cm', min: 8, max: 30, step: 1, default: 14 },
  { key: 'control', type: 'select', default: 'pointer', options: ['pointer', 'keys', 'tilt'], summary: true },
];

export type Control = 'pointer' | 'keys' | 'tilt';

export interface SlalomParams {
  durationS: number;
  gapCm: number;
  speedCmS: number;
  speedUpPct: number;
  spacingCm: number;
  control: Control;
}

/** Bereinigte Einstellungen (`ctx.params`) als typisiertes Objekt; fehlende Werte → Standard */
export function slalomParams(p: ExerciseParams): SlalomParams {
  const num = (key: string): number => {
    const d = PARAMS.find((x) => x.key === key)!;
    const v = p[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : (d.default as number);
  };
  const c = p.control;
  return {
    durationS: num('durationS'),
    gapCm: num('gapCm'),
    speedCmS: num('speedCmS'),
    speedUpPct: num('speedUpPct'),
    spacingCm: num('spacingCm'),
    control: c === 'keys' || c === 'tilt' ? c : 'pointer',
  };
}

/** Schnellmodus (?quick=1): Dauer der Sitzung */
export const QUICK_DURATION_S = 8;
/** Größtes dt eines Bildes in s (wie im Runner) */
export const MAX_DT_S = 0.05;
/** Wie weit die Mitte der Lücke von einem Tor zum nächsten höchstens springt (Anteil der Feldbreite) */
export const MAX_SHIFT = 0.35;
/** Fahrgeschwindigkeit bei Achsen-Eingabe (Pfeiltasten, Kippen): so viele Feldbreiten pro Sekunde bei Vollausschlag */
export const AXIS_SPEED_WIDTHS_PER_S = 0.9;

export interface Gate {
  id: number;
  /** Höhe der Querstange (cm von oben) */
  y: number;
  /** Mitte der Lücke (cm von links) */
  cx: number;
  gap: number;
  evaluated: boolean;
}

export interface GateTrial {
  nr: number;
  gapCm: number;
  centerCm: number;
  ballCm: number;
  offCm: number;
  passed: boolean;
}

export interface SlalomSummary {
  /** durchfahrene Tore */
  passed: number;
  /** Tore, bei denen eine Stange berührt wurde */
  hits: number;
  /** gewertete Tore (durchfahren + berührt) */
  gates: number;
  /** durchfahrene an gewerteten Toren in %, null ohne Tore */
  accuracy: number | null;
  /** längste Serie hintereinander durchfahrener Tore */
  streak: number;
  /** mittlerer seitlicher Abstand von der Mitte der Lücke bei durchfahrenen Toren in cm, null ohne */
  centerDev: number | null;
  /** tatsächlich benutzte Torlücke und Tor-Abstand in cm */
  gapCm: number;
  spacingCm: number;
  trials: GateTrial[];
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const r1 = (v: number): number => Math.round(v * 10) / 10;

/** Kugelradius in cm für ein Feld: ≈ 10 % der kürzeren Seite, 0,5–1,2 cm */
export function ballRadius(wCm: number, hCm: number): number {
  return clamp(0.1 * Math.min(wCm, hCm), 0.5, 1.2);
}

/** Tatsächlich benutzte Torlücke in cm: höchstens 80 % der Breite, mindestens Kugeldurchmesser + 1,2 cm */
export function effectiveGap(gapCm: number, wCm: number, ballR: number): number {
  const lo = 2 * ballR + 1.2;
  return clamp(gapCm, lo, Math.max(lo, 0.8 * wCm));
}

/** Tatsächlich benutzter Abstand der Tore in cm: höchstens 60 % der Feldhöhe, mindestens 3 cm */
export function effectiveSpacing(spacingCm: number, hCm: number): number {
  return clamp(spacingCm, 3, Math.max(3, 0.6 * hCm));
}

/** Reine Spiellogik. */
export class SlalomSession {
  readonly p: SlalomParams;
  W: number;
  H: number;
  ballR: number;
  ballY: number;
  gap: number;
  spacing: number;
  x: number;
  gates: Gate[] = [];
  trials: GateTrial[] = [];
  passed = 0;
  hits = 0;
  streak = 0;
  best = 0;
  elapsed = 0;
  startedAt: number | null = null;
  endedAt: number | null = null;
  finished = false;
  private devSum = 0;
  private last = 0;
  private lastCenter: number;
  private nextId = 0;
  private readonly rng: Rng;

  constructor(p: SlalomParams, env: { rng: Rng; fieldWcm: number; fieldHcm: number }) {
    this.p = p;
    this.rng = env.rng;
    this.W = env.fieldWcm;
    this.H = env.fieldHcm;
    this.ballR = ballRadius(this.W, this.H);
    this.gap = effectiveGap(p.gapCm, this.W, this.ballR);
    this.spacing = effectiveSpacing(p.spacingCm, this.H);
    this.ballY = this.H * 0.85;
    this.x = this.W / 2;
    this.lastCenter = this.W / 2;
  }

  start(now: number): void {
    this.startedAt = now;
    this.last = now;
  }

  /** Aktuelle Geschwindigkeit der Tore in cm/s (steigt mit der Zeit um `speedUpPct` je Minute) */
  speed(): number {
    return this.p.speedCmS * (1 + ((this.p.speedUpPct / 100) * this.elapsed) / 60);
  }

  /** Feld hat sich geändert (Tablet gedreht): Tore und Kugel werden mit umgerechnet */
  setField(wCm: number, hCm: number): void {
    if (wCm === this.W && hCm === this.H) return;
    const sx = wCm / this.W;
    const sy = hCm / this.H;
    this.W = wCm;
    this.H = hCm;
    this.ballR = ballRadius(wCm, hCm);
    this.gap = effectiveGap(this.p.gapCm, wCm, this.ballR);
    this.spacing = effectiveSpacing(this.p.spacingCm, hCm);
    this.ballY = hCm * 0.85;
    const half = this.gap / 2;
    for (const g of this.gates) {
      g.y *= sy;
      g.gap = this.gap;
      g.cx = clamp(g.cx * sx, Math.min(half, wCm / 2), Math.max(wCm - half, wCm / 2));
    }
    this.lastCenter = clamp(this.lastCenter * sx, half, Math.max(half, wCm - half));
    this.x = clamp(this.x * sx, Math.min(this.ballR, wCm / 2), Math.max(wCm - this.ballR, wCm / 2));
  }

  private spawn(y: number): void {
    const half = this.gap / 2;
    const lo = Math.min(half, this.W / 2);
    const hi = Math.max(this.W - half, this.W / 2);
    const shift = (this.rng.next() * 2 - 1) * this.W * MAX_SHIFT;
    const cx = clamp(this.lastCenter + shift, lo, hi);
    this.lastCenter = cx;
    this.gates.push({ id: ++this.nextId, y, cx, gap: this.gap, evaluated: false });
  }

  /** Pro Bild aufrufen: `input` = Eingabe der Steuerung (Position als Anteil der Feldbreite oder Achse −1..1) */
  update(now: number, input: SteerInput): void {
    if (this.startedAt === null || this.finished) return;
    const dt = Math.min(MAX_DT_S, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.elapsed += dt;
    this.x = applySteering(this.x, input, dt, this.W * AXIS_SPEED_WIDTHS_PER_S, this.W, this.ballR);
    const v = this.speed();
    for (const g of this.gates) g.y += v * dt;
    const lastY = this.gates.length ? this.gates[this.gates.length - 1].y : Number.POSITIVE_INFINITY;
    if (lastY >= this.spacing) this.spawn(this.gates.length ? lastY - this.spacing : 0);
    for (const g of this.gates) {
      if (!g.evaluated && g.y >= this.ballY) {
        g.evaluated = true;
        this.evaluate(g);
      }
    }
    this.gates = this.gates.filter((g) => g.y < this.H + 2);
    if (this.elapsed >= this.p.durationS) {
      this.finished = true;
      this.endedAt = now;
    }
  }

  private evaluate(g: Gate): void {
    const off = Math.abs(this.x - g.cx);
    const ok = off <= g.gap / 2 - this.ballR;
    this.trials.push({ nr: this.trials.length + 1, gapCm: r1(g.gap), centerCm: r1(g.cx), ballCm: r1(this.x), offCm: r1(off), passed: ok });
    if (ok) {
      this.passed++;
      this.streak++;
      this.best = Math.max(this.best, this.streak);
      this.devSum += off;
    } else {
      this.hits++;
      this.streak = 0;
    }
  }

  summary(): SlalomSummary {
    const n = this.passed + this.hits;
    return {
      passed: this.passed,
      hits: this.hits,
      gates: n,
      accuracy: n ? r1((100 * this.passed) / n) : null,
      streak: this.best,
      centerDev: this.passed ? r1(this.devSum / this.passed) : null,
      gapCm: r1(this.gap),
      spacingCm: r1(this.spacing),
      trials: this.trials.slice(),
    };
  }
}

/**
 * Ziel des Autopiloten (Intro-Film und Autoplay): Mitte der nächsten noch nicht gewerteten Lücke über der Kugel; `errors`
 * (Gate-Nummern) steuert absichtlich daneben. Ohne Tor: Feldmitte.
 */
export function autopilotTarget(s: SlalomSession, errors: ReadonlySet<number>): number {
  let best: Gate | null = null;
  for (const g of s.gates) {
    if (g.evaluated || g.y >= s.ballY) continue;
    if (!best || g.y > best.y) best = g;
  }
  if (!best) return s.W / 2;
  if (errors.has(best.id)) return clamp(best.cx + (best.cx < s.W / 2 ? 1 : -1) * (best.gap / 2 + s.ballR + 0.6), s.ballR, s.W - s.ballR);
  return best.cx;
}

/** Eingabe, die den Autopiloten zu `target` (cm) führt: Position (Zeiger) oder Achse (Tasten, Kippen) */
export function autopilotInput(s: SlalomSession, target: number, mode: 'position' | 'axis'): SteerInput {
  if (mode === 'position') {
    const span = Math.max(1e-6, s.W - 2 * s.ballR);
    return { mode: 'position', x: clamp((target - s.ballR) / span, 0, 1) };
  }
  return { mode: 'axis', a: clamp((target - s.x) / (0.25 * s.W), -1, 1) };
}

/**
 * Persönlicher Tipp nach dem Durchlauf (Schlüssel in `texts.tips`). Eigene Faustregeln der App, keine Normwerte: kein Tor →
 * leichter; viele Berührungen → breitere Lücke oder langsamer; sicher → nur eine Einstellung schwerer; breite Abweichung von
 * der Mitte → früher und ruhiger steuern.
 */
export function tipFor(s: SlalomSummary): string {
  if (s.gates === 0 || s.passed === 0) return 'few';
  if (s.accuracy !== null && s.accuracy < 60 && s.gates >= 8) return 'easier';
  if (s.accuracy !== null && s.accuracy >= 90 && s.passed >= 15) return 'harder';
  const room = s.gapCm / 2;
  if (s.centerDev !== null && s.gates >= 8 && s.centerDev > 0.5 * room) return 'center';
  return 'compare';
}

/** Punkte (nur Motivation, nicht Teil der Messung): 10 je durchfahrenem Tor */
export function pointsFor(passed: number): number {
  return Math.max(0, Math.round(passed)) * 10;
}
