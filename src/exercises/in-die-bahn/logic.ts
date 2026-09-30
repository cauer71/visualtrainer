/**
 * In die Bahn – reine Logik (ohne Canvas, damit testbar).
 *
 * Ein Ziel läuft wiederholt über dieselbe Bahn (erst zum Zuschauen, dann zum Abfangen). Man setzt den Finger
 * vorab auf die Bahn – an die Stelle, durch die das Ziel gleich laufen wird – und hält ihn ruhig. Gemessen wird
 * der Abstand zwischen der Fingerstelle und der Bahn, also dem tatsächlichen Durchlaufpunkt.
 *
 * - Die Bahn ist eine Polylinie (Gerade oder sanfter Bogen) mit Bogenlänge s in px; das Ziel läuft mit gleichmäßigem
 *   Tempo (s wächst mit dt). Die Durchlaufzeit in Sekunden ist die Stufe – Hoch- und Querformat fordern gleich viel.
 * - Fehler = Abstand Tipp – nächster Punkt der Bahn, in % der kürzeren Feldseite.
 */
import type { Rng } from '../../core/rng';
import { clamp } from '../../core/stats';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 20;
/** Treffer, wenn der Abstand höchstens so groß ist (% der kürzeren Feldseite) */
export const HIT_TOL_PCT = 5.5;
/** Der Trefferkreis ist nie kleiner als so viele Pixel im Radius (Fingerbreite) */
export const MIN_TOL_PX = 28;
/** Der Tipp muss mindestens so viele Sekunden vor dem Durchlauf liegen (sonst „zu spät“) */
export const MIN_LEAD_S = 0.3;
/** Der Finger darf nach dem Aufsetzen so weit wandern (in u), ohne dass es als „nicht ruhig“ gilt */
export const HOLD_RADIUS_U = 4;
/** Bis zu dieser Stufe ist die ganze Bahn als Linie zu sehen */
export const GUIDE_UNTIL_LEVEL = 4;

export interface Pt {
  x: number;
  y: number;
}

export interface Field {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const levelOf = (level: number): number => clamp(Math.floor(level + 1e-9), MIN_LEVEL, MAX_LEVEL);

/** Durchlaufzeit über die ganze Bahn in Sekunden: 3,6 s (Stufe 1) → 1,5 s (ab Stufe ≈ 14) */
export function passSecondsFor(level: number): number {
  const lv = clamp(level, MIN_LEVEL, MAX_LEVEL);
  return Math.max(1.5, 3.6 * Math.pow(0.935, lv - 1));
}

/** Wie lange die Spur hinter dem Ziel sichtbar bleibt (s); Infinity = ganze Bahn bleibt als Linie stehen */
export function traceSecondsFor(level: number): number {
  const lv = levelOf(level);
  if (lv <= GUIDE_UNTIL_LEVEL) return Infinity;
  if (lv <= 9) return 2.2;
  if (lv <= 14) return 1.0;
  return 0.35;
}

/** Bogen der Bahn als Anteil der Länge (Pfeilhöhe ≈ die Hälfte davon): 0 bis Stufe 5, dann bis 0,22 */
export function bendFor(level: number): number {
  const lv = levelOf(level);
  return lv <= 5 ? 0 : Math.min(0.22, 0.03 * (lv - 5));
}

/** Trefferkreis in % der kürzeren Feldseite (mindestens MIN_TOL_PX) */
export function hitTolPct(shortSide: number): number {
  return Math.max(HIT_TOL_PCT, (MIN_TOL_PX / Math.max(1, shortSide)) * 100);
}

export function errorPct(dist: number, shortSide: number): number {
  return (dist / Math.max(1, shortSide)) * 100;
}

export function isHit(err: number, shortSide: number): boolean {
  return Number.isFinite(err) && err <= hitTolPct(shortSide);
}

/** Punkte für einen Treffer: mehr bei höherer Stufe und genauerem Tipp */
export function pointsFor(err: number, level: number, shortSide: number): number {
  if (!isHit(err, shortSide)) return 0;
  const base = 10 + 2 * (levelOf(level) - 1);
  return Math.round(base * (1 - 0.5 * clamp(err / hitTolPct(shortSide), 0, 1)));
}

export function meanError(errors: readonly number[]): number {
  const e = errors.filter((x) => Number.isFinite(x));
  return e.length ? e.reduce((a, b) => a + b, 0) / e.length : NaN;
}

// ---------------------------------------------------------------------------
// Bahn

export interface Route {
  pts: Pt[];
  /** Bogenlänge bis zu jedem Punkt */
  cum: number[];
  length: number;
}

/** Bahn aus Polylinie */
export function routeFrom(pts: Pt[]): Route {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return { pts, cum, length: cum[cum.length - 1] };
}

/** Punkt auf der Bahn bei Bogenlänge s (außerhalb der Bahn wird begrenzt) */
export function routePoint(r: Route, s: number): Pt {
  const ss = clamp(s, 0, r.length);
  let lo = 0;
  let hi = r.cum.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (r.cum[mid] <= ss) lo = mid;
    else hi = mid;
  }
  const seg = r.cum[hi] - r.cum[lo];
  const k = seg > 1e-9 ? (ss - r.cum[lo]) / seg : 0;
  return { x: r.pts[lo].x + (r.pts[hi].x - r.pts[lo].x) * k, y: r.pts[lo].y + (r.pts[hi].y - r.pts[lo].y) * k };
}

export interface Nearest {
  /** Bogenlänge des nächsten Bahnpunkts */
  s: number;
  dist: number;
  point: Pt;
}

/** Nächster Punkt der Bahn zu p */
export function nearestOnRoute(r: Route, p: Pt): Nearest {
  let best: Nearest = { s: 0, dist: Infinity, point: r.pts[0] };
  for (let i = 1; i < r.pts.length; i++) {
    const a = r.pts[i - 1];
    const b = r.pts[i];
    const vx = b.x - a.x;
    const vy = b.y - a.y;
    const l2 = vx * vx + vy * vy;
    const t = l2 > 1e-12 ? clamp(((p.x - a.x) * vx + (p.y - a.y) * vy) / l2, 0, 1) : 0;
    const q = { x: a.x + vx * t, y: a.y + vy * t };
    const d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d < best.dist) best = { s: r.cum[i - 1] + (r.cum[i] - r.cum[i - 1]) * t, dist: d, point: q };
  }
  return best;
}

export type Side = 'L' | 'R' | 'T' | 'B';

function edgePoint(f: Field, side: Side, k: number): Pt {
  switch (side) {
    case 'L':
      return { x: f.minX, y: f.minY + (f.maxY - f.minY) * k };
    case 'R':
      return { x: f.maxX, y: f.minY + (f.maxY - f.minY) * k };
    case 'T':
      return { x: f.minX + (f.maxX - f.minX) * k, y: f.minY };
    default:
      return { x: f.minX + (f.maxX - f.minX) * k, y: f.maxY };
  }
}

function inside(f: Field, p: Pt, pad = 0.5): boolean {
  return p.x >= f.minX - pad && p.x <= f.maxX + pad && p.y >= f.minY - pad && p.y <= f.maxY + pad;
}

/** Quadratischer Bogen von a nach b; `bend` = seitlicher Versatz des Kontrollpunkts als Anteil der Länge */
export function bezierPoints(a: Pt, b: Pt, bend: number, n = 120): Pt[] {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const nx = -(b.y - a.y) / Math.max(1e-9, len);
  const ny = (b.x - a.x) / Math.max(1e-9, len);
  const c = { x: (a.x + b.x) / 2 + nx * bend * len, y: (a.y + b.y) / 2 + ny * bend * len };
  const out: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push({ x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y });
  }
  return out;
}

export interface RouteParams {
  field: Field;
  level: number;
  /** feste Bahn für den Intro-Film: Start und Ende normiert (0..1 im Feld), kein Bogen */
  fixed?: { ax: number; ay: number; bx: number; by: number };
}

/**
 * Neue Bahn von einem Feldrand zu einem anderen. Mindestens 55 % der kürzeren Feldseite lang, die ganze Bahn
 * liegt im Feld; ab Stufe 6 mit sanftem Bogen.
 */
export function makeRoute(p: RouteParams, rng: Rng): Route {
  const f = p.field;
  const W = f.maxX - f.minX;
  const H = f.maxY - f.minY;
  const short = Math.min(W, H);
  if (p.fixed) {
    const a = { x: f.minX + p.fixed.ax * W, y: f.minY + p.fixed.ay * H };
    const b = { x: f.minX + p.fixed.bx * W, y: f.minY + p.fixed.by * H };
    return routeFrom(bezierPoints(a, b, 0));
  }
  const bend = bendFor(p.level);
  const sides: Side[] = ['L', 'R', 'T', 'B'];
  for (let attempt = 0; attempt < 200; attempt++) {
    const sa = rng.pick(sides);
    const others = sides.filter((s) => s !== sa);
    const sb = rng.pick(others);
    const a = edgePoint(f, sa, rng.range(0.15, 0.85));
    const b = edgePoint(f, sb, rng.range(0.15, 0.85));
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < short * (attempt < 120 ? 0.75 : 0.55)) continue;
    const sign = rng.chance(0.5) ? 1 : -1;
    for (const k of bend > 0 ? [sign, -sign] : [0]) {
      const pts = bezierPoints(a, b, bend * k);
      if (pts.every((q) => inside(f, q))) return routeFrom(pts);
    }
  }
  // feste, immer gültige Bahn: von links oben nach rechts unten
  return routeFrom(bezierPoints({ x: f.minX, y: f.minY + H * 0.25 }, { x: f.maxX, y: f.minY + H * 0.75 }, 0));
}

/** Tipp mit normalverteilter Ungenauigkeit (Autoplay) */
export function noisyTap(p: Pt, sigmaPct: number, shortSide: number, rng: Rng): Pt {
  const s = (sigmaPct / 100) * shortSide;
  return { x: p.x + rng.normal() * s, y: p.y + rng.normal() * s };
}
