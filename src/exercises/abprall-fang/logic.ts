/**
 * Abprall-Fang – reine Logik (ohne Canvas, damit testbar).
 *
 * Ein Ziel gleitet mit gleichmäßigem Tempo geradeaus und prallt an den Rändern des Spielfelds ab
 * (Einfallswinkel = Ausfallswinkel). Gefragt ist der Ort, an dem es abprallen wird.
 *
 * - Bahn in geschlossener Form: Die Mittelpunktbahn wird an den Feldrändern „gefaltet“ (Dreieckswelle),
 *   die Position hängt nur vom zurückgelegten Weg s ab (s wächst mit dt) – unabhängig von der Bildrate.
 * - Zeitbasiert: Die Zeit bis zum gefragten Abprall ist die Schwierigkeit (Stufe), das Tempo ergibt sich
 *   aus Weg / Zeit. So fordern Hoch- und Querformat gleich viel Zeit.
 * - Fehler = Abstand zwischen Tipp und Berührungspunkt am Rand, in % der kürzeren Seite des Spielfelds.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Ab dieser Stufe ist der übernächste Abprall gefragt */
export const SECOND_BOUNCE_FROM = 9;
/** Treffer, wenn der Fehler höchstens so groß ist (% der kürzeren Feldseite) */
export const HIT_TOL_PCT = 7;
/** Der Trefferkreis ist nie kleiner als so viele Pixel im Radius (Fingerbreite) */
export const MIN_TOL_PX = 28;

export interface Pt {
  x: number;
  y: number;
}

/** Erlaubter Bereich für den Mittelpunkt des Ziels */
export interface Field {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type Wall = 'L' | 'R' | 'T' | 'B';

export interface Impact {
  /** Weg ab dem Start bis zum Abprall (px) */
  s: number;
  wall: Wall;
  /** Mittelpunkt des Ziels beim Abprall */
  x: number;
  y: number;
}

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Der wievielte Abprall gefragt ist: 1 = nächster, 2 = übernächster */
export function askedBounceFor(level: number): 1 | 2 {
  return levelOf(level) >= SECOND_BOUNCE_FROM ? 2 : 1;
}

/**
 * Zeit vom Start der Bewegung bis zum gefragten Abprall in Sekunden.
 * Nächster Abprall: 3,2 s (Stufe 1) → 1,3 s (Stufe 8); übernächster: 4,6 s (Stufe 9) → 2,3 s (Stufe 20).
 */
export function leadSecondsFor(level: number): number {
  const lv = levelOf(level);
  if (lv < SECOND_BOUNCE_FROM) return Math.max(1.3, 3.2 * Math.pow(0.9, lv - 1));
  return Math.max(2.3, 4.6 * Math.pow(0.95, lv - SECOND_BOUNCE_FROM));
}

/** Dreieckswelle: bildet v auf [lo, hi] ab, als würde an den Grenzen gespiegelt */
export function fold(v: number, lo: number, hi: number): number {
  const len = hi - lo;
  if (len <= 1e-9) return lo;
  const m = (((v - lo) % (2 * len)) + 2 * len) % (2 * len);
  return lo + (m <= len ? m : 2 * len - m);
}

/** Position des Mittelpunkts nach dem Weg s (px) */
export function positionAt(start: Pt, dir: Pt, f: Field, s: number): Pt {
  return { x: fold(start.x + dir.x * s, f.minX, f.maxX), y: fold(start.y + dir.y * s, f.minY, f.maxY) };
}

/** Die ersten n Abpraller (nach Weg sortiert). Der Start muss im Feld liegen. */
export function impactsOf(start: Pt, dir: Pt, f: Field, n: number): Impact[] {
  const list: Impact[] = [];
  const axis = (p: number, d: number, lo: number, hi: number, wallLo: Wall, wallHi: Wall) => {
    if (Math.abs(d) < 1e-9) return;
    const first = d > 0 ? (hi - p) / d : (p - lo) / -d;
    const period = (hi - lo) / Math.abs(d);
    for (let k = 0; k <= n; k++) {
      const s = first + k * period;
      // gerades k: Wand in Flugrichtung, ungerades k: Gegenwand
      const towardHi = d > 0 ? k % 2 === 0 : k % 2 === 1;
      list.push({ s, wall: towardHi ? wallHi : wallLo, x: 0, y: 0 });
    }
  };
  axis(start.x, dir.x, f.minX, f.maxX, 'L', 'R');
  axis(start.y, dir.y, f.minY, f.maxY, 'T', 'B');
  list.sort((a, b) => a.s - b.s);
  const out = list.slice(0, n);
  for (const im of out) {
    const p = positionAt(start, dir, f, im.s);
    im.x = p.x;
    im.y = p.y;
  }
  return out;
}

/** Berührungspunkt am Rand (Ziel mit Radius r liegt mit dem Rand an der Wand an) */
export function contactPoint(im: Impact, r: number): Pt {
  switch (im.wall) {
    case 'L':
      return { x: im.x - r, y: im.y };
    case 'R':
      return { x: im.x + r, y: im.y };
    case 'T':
      return { x: im.x, y: im.y - r };
    default:
      return { x: im.x, y: im.y + r };
  }
}

export interface TrialParams {
  field: Field;
  /** Radius des Ziels in px (nur für den Berührungspunkt) */
  r: number;
  level: number;
  /** Tempo in px/s: erlaubter Bereich (abhängig von der Bühnengröße) */
  minSpeed: number;
  maxSpeed: number;
  /** feste Bahn für den Intro-Film: Start normiert (0..1 im Feld), Richtung in Grad, Zeit bis zum Abprall */
  fixed?: { fx: number; fy: number; angleDeg: number; lead: number; asked?: 1 | 2 };
}

export interface Trial {
  start: Pt;
  dir: Pt;
  /** px/s */
  speed: number;
  asked: 1 | 2;
  /** Abpraller bis einschließlich dem gefragten */
  impacts: Impact[];
  /** Weg bis zum gefragten Abprall (px) */
  sAsked: number;
  /** Zeit bis zum gefragten Abprall (s) */
  lead: number;
  contact: Pt;
}

function buildTrial(start: Pt, angle: number, asked: 1 | 2, lead: number, p: TrialParams): Trial | null {
  const dir = { x: Math.cos(angle), y: Math.sin(angle) };
  const imps = impactsOf(start, dir, p.field, asked + 1);
  if (imps.length < asked + 1) return null;
  const sAsked = imps[asked - 1].s;
  const speed = sAsked / lead;
  return {
    start,
    dir,
    speed,
    asked,
    impacts: imps.slice(0, asked),
    sAsked,
    lead,
    contact: contactPoint(imps[asked - 1], p.r),
  };
}

/**
 * Neue Bahn. Bedingungen: Winkel mindestens ≈ 18° von den Achsen (kein Streifen an der Wand), zwei Abpraller
 * nie fast gleichzeitig (keine Ecke), Tempo im erlaubten Bereich. Bleibt nach vielen Versuchen nichts übrig,
 * werden die Grenzen schrittweise gelockert; am Ende gibt es eine feste, immer gültige Bahn.
 */
export function makeTrial(p: TrialParams, rng: Rng): Trial {
  const f = p.field;
  const W = f.maxX - f.minX;
  const H = f.maxY - f.minY;
  if (p.fixed) {
    const fx = p.fixed;
    const t = buildTrial({ x: f.minX + fx.fx * W, y: f.minY + fx.fy * H }, (fx.angleDeg * Math.PI) / 180, fx.asked ?? 1, fx.lead, p);
    if (t) return t;
  }
  const asked = askedBounceFor(p.level);
  const leadBase = leadSecondsFor(p.level);
  for (let attempt = 0; attempt < 400; attempt++) {
    const relax = attempt < 200 ? 1 : attempt < 300 ? 0.7 : 0.4;
    const start = { x: f.minX + W * rng.range(0.1, 0.9), y: f.minY + H * rng.range(0.1, 0.9) };
    const quadrant = rng.int(4);
    const angle = quadrant * (Math.PI / 2) + (rng.range(18, 72) * Math.PI) / 180;
    const lead = leadBase * rng.range(0.93, 1.07);
    const t = buildTrial(start, angle, asked, lead, p);
    if (!t) continue;
    if (t.speed < p.minSpeed * relax || t.speed > p.maxSpeed / relax) continue;
    // Ecken und Fast-Gleichzeitigkeit vermeiden
    const all = impactsOf(start, t.dir, f, asked + 1);
    let cornerFree = true;
    for (let i = 1; i < all.length; i++) if (all[i].s - all[i - 1].s < t.speed * 0.18) cornerFree = false;
    if (!cornerFree) continue;
    // erster Abprall nicht sofort
    if (all[0].s < t.speed * 0.5) continue;
    return t;
  }
  // feste Bahn: von links unten nach rechts oben
  const start = { x: f.minX + W * 0.25, y: f.minY + H * 0.7 };
  const t = buildTrial(start, (-38 * Math.PI) / 180, asked, leadBase, p);
  if (t) return t;
  return {
    start,
    dir: { x: 1, y: 0 },
    speed: 1,
    asked,
    impacts: [],
    sAsked: 1,
    lead: leadBase,
    contact: { x: f.maxX + p.r, y: start.y },
  };
}

/** Trefferkreis in % der kürzeren Feldseite (mindestens MIN_TOL_PX) */
export function hitTolPct(shortSide: number): number {
  return Math.max(HIT_TOL_PCT, (MIN_TOL_PX / Math.max(1, shortSide)) * 100);
}

/** Abstand Tipp – Berührungspunkt in % der kürzeren Feldseite */
export function errorPct(tap: Pt, contact: Pt, shortSide: number): number {
  return (Math.hypot(tap.x - contact.x, tap.y - contact.y) / Math.max(1, shortSide)) * 100;
}

export function isHit(err: number, shortSide: number): boolean {
  return Number.isFinite(err) && err <= hitTolPct(shortSide);
}

/** Punkte für einen Treffer: mehr bei höherer Stufe und genauerem Tipp */
export function pointsFor(err: number, level: number, shortSide: number): number {
  if (!isHit(err, shortSide)) return 0;
  const base = 10 + 2 * (levelOf(level) - 1);
  const bonus = 1 - 0.5 * clamp(err / hitTolPct(shortSide), 0, 1);
  return Math.round(base * bonus);
}

export function meanError(errors: readonly number[]): number {
  const e = errors.filter((x) => Number.isFinite(x));
  return e.length ? e.reduce((a, b) => a + b, 0) / e.length : NaN;
}

/** Tipp mit normalverteilter Ungenauigkeit (Autoplay) */
export function noisyTap(contact: Pt, sigmaPct: number, shortSide: number, rng: Rng): Pt {
  const s = (sigmaPct / 100) * shortSide;
  return { x: contact.x + rng.normal() * s, y: contact.y + rng.normal() * s };
}
