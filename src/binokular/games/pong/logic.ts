/**
 * Spiellogik „Farbwechsel-Pong“ (rein, ohne DOM, mit festem Zeitschritt betrieben). Spielfeld: Hochformat 720 × 1280
 * (Innenkoordinaten). Unten der eigene Schläger, oben der Gegner (Computer oder, im Zwei-Spieler-Modus, die zweite
 * Person). Der Ball gehört immer genau einem Auge (`eye`: AMBLYOPIC oder FELLOW – welche Farbe das ist, bestimmt
 * `vision/color.ts`) und wechselt bei jedem Schlägerkontakt, optional zusätzlich einmal im Flug.
 */
import { clamp, type Rng } from '../common';
import { otherSlot, type EyeSlot } from '../nachzeichnen/colorSchedule';
import type { PongSettings } from './settings';

export const W = 720;
export const H = 1280;
export const PADDLE_H = 26;
export const TOP_Y = 90;
export const BOTTOM_Y = 1190;
/** Zeitschritt der Physik: 120 Hz */
export const STEP_S = 1 / 120;
/** Geschwindigkeitszuwachs je Schlag */
export const SPEED_FACTOR = 1.04;
/** Obergrenze der Ballgeschwindigkeit als Vielfaches der Startgeschwindigkeit */
export const SPEED_CAP_FACTOR = 2.2;
/** größter Abprallwinkel zur Senkrechten (rad) bei Treffer am Schlägerrand */
export const MAX_ANGLE = 1.05;
/** Wartezeit vor dem Anspiel (ms) */
export const SERVE_MS = 900;
/** Tastatur: Schlägergeschwindigkeit (px/s) */
export const KEY_SPEED = 900;
/** Computergegner: Obergrenze der Schlägergeschwindigkeit (px/s) */
export const AI_CAP = 1100;

export type Side = 'top' | 'bottom';

export type PongEvent =
  | { type: 'bounce' }
  | { type: 'hit'; side: Side }
  | { type: 'colorChange'; cause: 'contact' | 'flight' }
  | { type: 'point'; scorer: Side }
  | { type: 'serve' }
  | { type: 'over'; winner: Side };

export interface PongState {
  ball: { x: number; y: number; vx: number; vy: number };
  /** aktuelle Ballgeschwindigkeit (px/s) */
  speed: number;
  eye: EyeSlot;
  top: number;
  bottom: number;
  score: { top: number; bottom: number };
  phase: 'serve' | 'play' | 'over';
  serveMs: number;
  /** Richtung des nächsten Anspiels: 1 = nach unten (zum unteren Schläger), −1 = nach oben */
  serveDir: 1 | -1;
  /** y-Position im Flug, bei deren Überqueren der Ball die Farbe wechselt (null = keine geplant) */
  flightY: number | null;
  colorChanges: number;
  /** Schläge des unteren (eigenen) Schlägers insgesamt */
  hits: number;
  rally: number;
  maxRally: number;
  /** Zielposition des Computerschlägers (Ungenauigkeit je Schlag) */
  aiOffset: number;
  winner: Side | null;
}

export function newPong(rng: Rng): PongState {
  return {
    ball: { x: W / 2, y: H / 2, vx: 0, vy: 0 },
    speed: 0,
    eye: rng() < 0.5 ? 'AMBLYOPIC' : 'FELLOW',
    top: W / 2,
    bottom: W / 2,
    score: { top: 0, bottom: 0 },
    phase: 'serve',
    serveMs: SERVE_MS,
    serveDir: rng() < 0.5 ? 1 : -1,
    flightY: null,
    colorChanges: 0,
    hits: 0,
    rally: 0,
    maxRally: 0,
    aiOffset: 0,
    winner: null,
  };
}

/** Obergrenze der Ballgeschwindigkeit */
export const speedCap = (startSpeed: number): number => startSpeed * SPEED_CAP_FACTOR;

/** Geschwindigkeit nach einem Schlag: × 1,04, begrenzt */
export function nextSpeed(speed: number, startSpeed: number): number {
  return Math.min(speedCap(startSpeed), speed * SPEED_FACTOR);
}

/** Abprallwinkel (rad zur Senkrechten) aus der Trefferposition auf dem Schläger (−1 links … +1 rechts) */
export function bounceAngle(hit: number): number {
  return clamp(hit, -1, 1) * MAX_ANGLE;
}

/** Grundgeschwindigkeit des Computerschlägers je Gegnerstärke 1–5 (px/s) */
export const aiBaseSpeed = (strength: number): number => 220 + 110 * (clamp(Math.round(strength), 1, 5) - 1);

/** Schlägergeschwindigkeit des Computers: steigt mit dem Spielstand (Punkte des Menschen), begrenzt */
export function aiSpeed(strength: number, humanScore: number): number {
  return Math.min(AI_CAP, aiBaseSpeed(strength) * (1 + 0.06 * Math.max(0, humanScore)));
}

const halfPaddle = (cfg: PongSettings) => cfg.paddleWidth / 2;

/** Schläger setzen (begrenzt auf das Spielfeld) */
export function setPaddle(s: PongState, cfg: PongSettings, side: Side, x: number): void {
  const v = clamp(x, halfPaddle(cfg), W - halfPaddle(cfg));
  if (side === 'top') s.top = v;
  else s.bottom = v;
}

export interface PongInput {
  /** Tastatur: −1 links, 0 keine, +1 rechts */
  keys: { top: number; bottom: number };
}

/** y der Vorderkante eines Schlägers (dort trifft der Ball) */
export const frontY = (side: Side): number => (side === 'bottom' ? BOTTOM_Y - PADDLE_H / 2 : TOP_Y + PADDLE_H / 2);

function flip(s: PongState, cause: 'contact' | 'flight', ev: PongEvent[]): void {
  s.eye = otherSlot(s.eye);
  s.colorChanges++;
  ev.push({ type: 'colorChange', cause });
}

function launch(s: PongState, cfg: PongSettings, rng: Rng, ev: PongEvent[]): void {
  const ang = (rng() * 2 - 1) * 0.35;
  s.speed = cfg.startSpeed;
  s.ball.vx = s.speed * Math.sin(ang);
  s.ball.vy = s.serveDir * s.speed * Math.cos(ang);
  s.phase = 'play';
  s.rally = 0;
  s.flightY = null;
  ev.push({ type: 'serve' });
}

/** Zufällige y-Position auf dem Weg vom getroffenen zum anderen Schläger (25–75 % der Strecke) */
function planFlight(s: PongState, from: Side, cfg: PongSettings, rng: Rng): void {
  if (!cfg.flightChange) {
    s.flightY = null;
    return;
  }
  const a = frontY(from);
  const b = frontY(from === 'bottom' ? 'top' : 'bottom');
  s.flightY = a + (b - a) * (0.25 + rng() * 0.5);
}

function paddleHit(s: PongState, cfg: PongSettings, rng: Rng, side: Side, ev: PongEvent[]): void {
  const px = side === 'bottom' ? s.bottom : s.top;
  const r = cfg.ballRadius;
  const rel = clamp((s.ball.x - px) / (halfPaddle(cfg) + r), -1, 1);
  const ang = bounceAngle(rel);
  s.speed = nextSpeed(s.speed, cfg.startSpeed);
  const dir = side === 'bottom' ? -1 : 1;
  s.ball.vx = s.speed * Math.sin(ang);
  s.ball.vy = dir * s.speed * Math.cos(ang);
  s.ball.y = side === 'bottom' ? frontY('bottom') - r : frontY('top') + r;
  s.rally++;
  s.maxRally = Math.max(s.maxRally, s.rally);
  if (side === 'bottom') s.hits++;
  ev.push({ type: 'hit', side });
  flip(s, 'contact', ev);
  planFlight(s, side, cfg, rng);
  if (side === 'bottom') s.aiOffset = (rng() * 2 - 1) * cfg.paddleWidth * 0.45 * (1 - (cfg.opponent - 1) / 5);
}

function score(s: PongState, cfg: PongSettings, scorer: Side, ev: PongEvent[]): void {
  s.score[scorer]++;
  ev.push({ type: 'point', scorer });
  s.ball = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
  s.speed = 0;
  s.flightY = null;
  s.rally = 0;
  if (s.score[scorer] >= cfg.targetScore) {
    s.phase = 'over';
    s.winner = scorer;
    ev.push({ type: 'over', winner: scorer });
    return;
  }
  s.phase = 'serve';
  s.serveMs = SERVE_MS;
  // zum Verlierer des Punkts anspielen
  s.serveDir = scorer === 'top' ? 1 : -1;
}

/** Computerschläger: folgt dem Ball mit begrenzter Geschwindigkeit (nur wenn der Ball auf ihn zukommt) */
function moveAi(s: PongState, cfg: PongSettings, dt: number): void {
  const target = s.ball.vy < 0 && s.phase === 'play' ? s.ball.x + s.aiOffset : W / 2;
  const maxMove = aiSpeed(cfg.opponent, s.score.bottom) * dt;
  const d = clamp(target - s.top, -maxMove, maxMove);
  setPaddle(s, cfg, 'top', s.top + d);
}

/** Ein fester Zeitschritt `STEP_S` (Sekunden). Gibt die Ereignisse des Schritts zurück. */
export function stepPong(s: PongState, cfg: PongSettings, input: PongInput, rng: Rng, dt = STEP_S): PongEvent[] {
  const ev: PongEvent[] = [];
  if (s.phase === 'over') return ev;
  // Tastatur
  if (input.keys.bottom) setPaddle(s, cfg, 'bottom', s.bottom + input.keys.bottom * KEY_SPEED * dt);
  if (cfg.twoPlayer) {
    if (input.keys.top) setPaddle(s, cfg, 'top', s.top + input.keys.top * KEY_SPEED * dt);
  } else moveAi(s, cfg, dt);
  if (s.phase === 'serve') {
    s.serveMs -= dt * 1000;
    if (s.serveMs <= 0) launch(s, cfg, rng, ev);
    return ev;
  }
  const b = s.ball;
  const r = cfg.ballRadius;
  const py = b.y;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  // Seitenwände
  if (b.x < r) {
    b.x = r;
    b.vx = Math.abs(b.vx);
    ev.push({ type: 'bounce' });
  } else if (b.x > W - r) {
    b.x = W - r;
    b.vx = -Math.abs(b.vx);
    ev.push({ type: 'bounce' });
  }
  // Farbwechsel im Flug: genau einmal je Überquerung der geplanten Linie
  if (s.flightY !== null && (py - s.flightY) * (b.y - s.flightY) <= 0 && py !== b.y) {
    s.flightY = null;
    flip(s, 'flight', ev);
  }
  // Schlägerkontakt (Durchflug-sicher: Vorderkante zwischen altem und neuem Ort)
  if (b.vy > 0) {
    const f = frontY('bottom');
    if (py + r <= f && b.y + r >= f && Math.abs(b.x - s.bottom) <= halfPaddle(cfg) + r) {
      paddleHit(s, cfg, rng, 'bottom', ev);
      return ev;
    }
  } else if (b.vy < 0) {
    const f = frontY('top');
    if (py - r >= f && b.y - r <= f && Math.abs(b.x - s.top) <= halfPaddle(cfg) + r) {
      paddleHit(s, cfg, rng, 'top', ev);
      return ev;
    }
  }
  // Tor
  if (b.y - r > BOTTOM_Y + PADDLE_H / 2 + 24) score(s, cfg, 'top', ev);
  else if (b.y + r < TOP_Y - PADDLE_H / 2 - 24) score(s, cfg, 'bottom', ev);
  return ev;
}
