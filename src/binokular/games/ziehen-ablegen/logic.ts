/**
 * „Ziehen & Ablegen“ (zwei Farben) – reine Logik ohne DOM. Maße und Kurven stammen aus der Haupt-App
 * (`exercises/ziehen-ablegen/logic.ts`), hier mit Einheit U = 10 px im Spielfeld 1280 × 720.
 * Ball und Ring gehören je einem Auge (AMBLYOPIC / FELLOW); welches die Farbe Rot hat, bestimmt das Farbprofil.
 */
import {
  ballPos,
  ballRadiusFor,
  containerRadiusFor,
  fingerOffsetFor,
  inContainer,
  isTapOnly,
  MAX_LEVEL,
  MIN_LEVEL,
  placeBall,
  pointsFor,
  roundLimitFor,
  span,
  speedFor,
  stepContainer,
  turnRateFor,
  type Bounds,
  type Mover,
  type Pt,
} from '../../../exercises/ziehen-ablegen/logic';
import { isSecondColor, type EyeVisibility, type VisionSettings } from '../../vision/color';
import type { Rng } from '../common';
import type { RoleMode, ZaSettings } from './settings';

export { MAX_LEVEL, MIN_LEVEL };
export const W = 1280;
export const H = 720;
/** Einheit der Maße aus der Haupt-App (px im Spielfeld) */
export const U = 10;
/** Ringlinie (px; Zweitfarbe-Objekte brauchen kräftige Linien) */
export const RING_STROKE = 14;
export const FB_MS = 700;
export const LEVEL_UP_STREAK = 3;
export const LEVEL_DOWN_STREAK = 2;
const MARGIN = 24;
const KEY_SPEED = 520;

// --- Rollen ---------------------------------------------------------------------------------------

/** Wer ist rot: Ball oder Ring */
export type Role = 'BALL_RED' | 'BALL_SECOND';

export function firstRole(mode: RoleMode, rng: Rng): Role {
  if (mode === 'RED_BALL') return 'BALL_RED';
  if (mode === 'SECOND_BALL') return 'BALL_SECOND';
  return rng() < 0.5 ? 'BALL_RED' : 'BALL_SECOND';
}

export function nextRole(mode: RoleMode, cur: Role): Role {
  if (mode !== 'ALTERNATE') return cur;
  return cur === 'BALL_RED' ? 'BALL_SECOND' : 'BALL_RED';
}

/** Augenklasse, die (laut Profil und Brille) die rote Farbe sieht */
export function redClassOf(v: Pick<VisionSettings, 'amblyopicEye' | 'glasses' | 'leftLens'>): 'AMBLYOPIC' | 'FELLOW' {
  return isSecondColor('AMBLYOPIC', v) ? 'FELLOW' : 'AMBLYOPIC';
}

/** Augenklassen von Ball und Ring – immer verschieden */
export function eyeClassesFor(role: Role, redClass: 'AMBLYOPIC' | 'FELLOW'): { ball: EyeVisibility; ring: EyeVisibility } {
  const second = redClass === 'AMBLYOPIC' ? 'FELLOW' : 'AMBLYOPIC';
  return role === 'BALL_RED' ? { ball: redClass, ring: second } : { ball: second, ring: redClass };
}

// --- Level ----------------------------------------------------------------------------------------

export interface Adapt {
  level: number;
  hitStreak: number;
  missStreak: number;
}

export const clampLevel = (l: number): number => Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, Math.round(l)));

/** 3 Treffer in Folge → +1, 2 Fehler in Folge → −1 (Grenzen 1–16) */
export function adapt(a: Adapt, hit: boolean): Adapt {
  let { level, hitStreak, missStreak } = a;
  if (hit) {
    hitStreak++;
    missStreak = 0;
    if (hitStreak >= LEVEL_UP_STREAK) {
      level = clampLevel(level + 1);
      hitStreak = 0;
    }
  } else {
    missStreak++;
    hitStreak = 0;
    if (missStreak >= LEVEL_DOWN_STREAK) {
      level = clampLevel(level - 1);
      missStreak = 0;
    }
  }
  return { level, hitStreak, missStreak };
}

// --- Maße -----------------------------------------------------------------------------------------

export interface Geometry {
  /** Trefferradius des Rings (Ballmitte) */
  R: number;
  ballR: number;
  offset: number;
  /** px/s */
  speed: number;
  limitMs: number;
}

export function geometryFor(level: number, cfg: ZaSettings): Geometry {
  const lv = clampLevel(level);
  const ballR = ballRadiusFor(U);
  return {
    R: Math.max(34, containerRadiusFor(lv, U) * (cfg.ringScale / 100)),
    ballR,
    offset: cfg.offset > 0 ? cfg.offset : fingerOffsetFor(U, ballR),
    speed: speedFor(lv) * U * (cfg.speedScale / 100),
    limitMs: roundLimitFor(lv) * 1000 * (cfg.timeScale / 100),
  };
}

/** Bereich der Ringmitte: im Feld, und der Finger (Ball + Offset) bleibt auf dem Bildschirm */
export function ringBounds(R: number, offset: number): Bounds {
  return span(R + MARGIN, W - R - MARGIN, R + MARGIN, Math.min(H - R - MARGIN, H - 16 - offset));
}

export function ballBounds(ballR: number): Bounds {
  return span(ballR + MARGIN, W - ballR - MARGIN, ballR + MARGIN, H - ballR - MARGIN);
}

export const hitTest = (ball: Pt, ring: Pt, R: number): boolean => inContainer(ball, ring, R);

// --- Spielkern --------------------------------------------------------------------------------------

export type Outcome = 'hit' | 'miss' | 'late';
export type Phase = 'wait' | 'drag' | 'fb' | 'done';
export type ZaEvent = { type: 'touch' } | { type: 'hit' } | { type: 'miss' } | { type: 'late' } | { type: 'swap' } | { type: 'end' };

export class ZaCore {
  level: number;
  hitStreak = 0;
  missStreak = 0;
  maxLevel: number;
  role: Role;
  roleSwaps = 0;
  phase: Phase = 'wait';
  /** abgeschlossene Runden */
  rounds = 0;
  hits = 0;
  misses = 0;
  late = 0;
  points = 0;
  outcome: Outcome | null = null;
  durations: number[] = [];
  ring: Mover = { x: W / 2, y: H / 2, ang: 0, turnLeft: 0 };
  geo: Geometry;
  rest: Pt = { x: 0, y: 0 };
  finger: Pt | null = null;
  elapsedMs = 0;
  fbMs = 0;
  /** Ball der letzten Wertung (für die Anzeige im Rückmelde-Zustand) */
  fbBall: Pt = { x: 0, y: 0 };
  private roundLevel: number;
  private nextTurnMs = 0;
  private dragMs = 0;
  private dragStart: Pt = { x: 0, y: 0 };
  /** Tastatur wurde benutzt (Ablegen mit Leertaste erst danach) */
  private kbMoved = false;

  constructor(
    readonly cfg: ZaSettings,
    private readonly rng: Rng,
  ) {
    this.level = clampLevel(cfg.startLevel);
    this.maxLevel = this.level;
    this.roundLevel = this.level;
    this.role = firstRole(cfg.roles, rng);
    this.geo = geometryFor(this.level, cfg);
    this.newRound();
  }

  get total(): number {
    return this.cfg.rounds;
  }

  /** Nummer der laufenden Runde (ab 1) */
  get roundNo(): number {
    return this.rounds + (this.phase === 'fb' || this.phase === 'done' ? 0 : 1);
  }

  get roundLevelNow(): number {
    return this.roundLevel;
  }

  get ball(): Pt {
    if (this.phase === 'drag' && this.finger) return ballPos(this.finger.x, this.finger.y, this.geo.offset, this.geo.ballR, W);
    if (this.phase === 'fb') return this.fbBall;
    return this.rest;
  }

  private newRound(): void {
    this.roundLevel = this.level;
    this.maxLevel = Math.max(this.maxLevel, this.level);
    this.geo = geometryFor(this.level, this.cfg);
    const b = ringBounds(this.geo.R, this.geo.offset);
    this.ring = { x: b.minX + (b.maxX - b.minX) * this.rng(), y: b.minY + (b.maxY - b.minY) * this.rng(), ang: this.rng() * Math.PI * 2, turnLeft: 0 };
    this.rest = placeBall(this.rng, ballBounds(this.geo.ballR), this.ring, this.geo.R + this.geo.ballR + 120);
    this.phase = 'wait';
    this.outcome = null;
    this.finger = null;
    this.elapsedMs = 0;
    this.fbMs = 0;
    this.dragMs = 0;
    this.kbMoved = false;
    this.nextTurnMs = 800;
  }

  /** Zeit fortschreiben (ms) */
  step(dtMs: number): ZaEvent[] {
    const ev: ZaEvent[] = [];
    if (dtMs <= 0) return ev;
    if (this.phase === 'wait' || this.phase === 'drag') {
      this.elapsedMs += dtMs;
      if (this.phase === 'drag') this.dragMs += dtMs;
      const rate = turnRateFor(this.roundLevel);
      if (rate > 0 && this.elapsedMs >= this.nextTurnMs) {
        this.ring.turnLeft += (this.rng() < 0.5 ? 1 : -1) * (0.5 + 0.9 * this.rng());
        this.nextTurnMs = this.elapsedMs + ((0.6 + 0.8 * this.rng()) / rate) * 1000;
      }
      stepContainer(this.ring, dtMs / 1000, this.geo.speed, ringBounds(this.geo.R, this.geo.offset));
      if (this.elapsedMs >= this.geo.limitMs) this.judge('late', this.ball, ev);
    } else if (this.phase === 'fb') {
      this.fbMs += dtMs;
      if (this.fbMs >= FB_MS) {
        if (this.total > 0 && this.rounds >= this.total) {
          this.phase = 'done';
          ev.push({ type: 'end' });
        } else {
          const nr = nextRole(this.cfg.roles, this.role);
          if (nr !== this.role) {
            this.role = nr;
            this.roleSwaps++;
            ev.push({ type: 'swap' });
          }
          this.newRound();
        }
      }
    }
    return ev;
  }

  private judge(kind: 'drop' | 'late', ball: Pt, ev: ZaEvent[]): void {
    const hit = kind === 'drop' && hitTest(ball, this.ring, this.geo.R);
    const outcome: Outcome = hit ? 'hit' : kind === 'late' ? 'late' : 'miss';
    this.outcome = outcome;
    this.fbBall = { ...ball };
    this.finger = null;
    this.phase = 'fb';
    this.fbMs = 0;
    this.rounds++;
    this.durations.push(Math.min(this.elapsedMs, this.geo.limitMs));
    if (hit) {
      this.hits++;
      this.points += pointsFor(this.roundLevel);
    } else {
      this.misses++;
      if (outcome === 'late') this.late++;
    }
    const a = adapt({ level: this.level, hitStreak: this.hitStreak, missStreak: this.missStreak }, hit);
    this.level = a.level;
    this.hitStreak = a.hitStreak;
    this.missStreak = a.missStreak;
    ev.push({ type: outcome });
  }

  // --- Eingabe ---

  pointerDown(x: number, y: number): ZaEvent[] {
    if (this.phase !== 'wait') return [];
    this.phase = 'drag';
    this.finger = { x, y };
    this.dragStart = { x, y };
    this.dragMs = 0;
    return [{ type: 'touch' }];
  }

  pointerMove(x: number, y: number): void {
    if (this.phase === 'drag' && this.finger) this.finger = { x, y };
  }

  /** Loslassen: nur Antippen → Ball bleibt liegen, sonst Wertung */
  pointerUp(x: number, y: number): ZaEvent[] {
    if (this.phase !== 'drag') return [];
    const ev: ZaEvent[] = [];
    this.finger = { x, y };
    if (isTapOnly(this.dragMs, Math.hypot(x - this.dragStart.x, y - this.dragStart.y), U)) {
      this.phase = 'wait';
      this.finger = null;
      return ev;
    }
    this.judge('drop', this.ball, ev);
    return ev;
  }

  /** Abbruch (Pause, Zeiger verloren): zurück in den Wartezustand, Ball am Ruheplatz */
  cancelDrag(): void {
    if (this.phase === 'drag') {
      this.phase = 'wait';
      this.finger = null;
    }
  }

  /** Tastatur: Ball am Ruheplatz verschieben (dt in s) */
  keyMove(dx: number, dy: number, dtS: number): void {
    if (this.phase !== 'wait' || (dx === 0 && dy === 0)) return;
    const r = this.geo.ballR;
    this.rest = { x: Math.min(W - r, Math.max(r, this.rest.x + dx * KEY_SPEED * dtS)), y: Math.min(H - r, Math.max(r, this.rest.y + dy * KEY_SPEED * dtS)) };
    this.kbMoved = true;
  }

  /** Tastatur: Ball ablegen (erst nach einer Bewegung mit den Pfeiltasten) */
  keyDrop(): ZaEvent[] {
    if (this.phase !== 'wait' || !this.kbMoved) return [];
    const ev: ZaEvent[] = [];
    this.judge('drop', this.rest, ev);
    return ev;
  }

  // --- Ergebnis ---

  summary(): { points: number; errors: number; colorChanges: number; details: Record<string, number>; completed: boolean } {
    const avg = this.durations.length ? this.durations.reduce((a, b) => a + b, 0) / this.durations.length : 0;
    return {
      points: this.points,
      errors: this.misses,
      colorChanges: this.roleSwaps,
      details: {
        hits: this.hits,
        misses: this.misses,
        late: this.late,
        rounds: this.rounds,
        maxLevel: this.maxLevel,
        avgRoundMs: Math.round(avg),
        roleSwaps: this.roleSwaps,
        targetRounds: this.total,
      },
      completed: this.total > 0 && this.rounds >= this.total,
    };
  }
}
