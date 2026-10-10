/**
 * Pfad des Spiels „Nachzeichnen“ (rein, ohne DOM): zufällige Stützpunkte von links nach rechts, glatte Kurve
 * (Catmull-Rom-Spline), gleichmäßig nach Bogenlänge abgetastet (Polylinie mit Bogenlänge), Nächster-Punkt-Suche.
 * Spielfeld: Querformat 1280 × 720 (Innenkoordinaten).
 */
import { clamp, type Rng } from '../common';

export const FIELD_W = 1280;
export const FIELD_H = 720;

export interface Pt {
  x: number;
  y: number;
}

/** Abstand der abgetasteten Pfadpunkte (px Bogenlänge) – der Fortschrittsindex zählt in diesen Schritten */
export const SAMPLE_SPACING = 3;
/** Ränder, in denen Stützpunkte liegen (links/rechts Platz für Start und Ziel, oben/unten für die Kurve) */
const MARGIN_X = 110;
const MARGIN_Y = 120;

export interface PathOptions {
  /** Anzahl der Stützpunkte (inkl. Start und Ziel) */
  points: number;
  /** Streuung der Höhe 0–1 (Anteil der möglichen Höhe) */
  spread: number;
}

/**
 * Stützpunkte von links nach rechts: x streng aufsteigend (gleichmäßige Abstände mit Streuung), y zufällig im
 * Streubereich um die Mitte, benachbarte Punkte unterscheiden sich um höchstens 60 % der Höhe (keine Zacken).
 */
export function generateControlPoints(rng: Rng, opts: PathOptions): Pt[] {
  const n = Math.max(2, Math.round(opts.points));
  const spread = clamp(opts.spread, 0, 1);
  const x0 = MARGIN_X;
  const x1 = FIELD_W - MARGIN_X;
  const step = (x1 - x0) / (n - 1);
  const mid = FIELD_H / 2;
  const amp = ((FIELD_H - 2 * MARGIN_Y) / 2) * spread;
  const pts: Pt[] = [];
  let prevY = mid;
  for (let i = 0; i < n; i++) {
    const x = i === 0 ? x0 : i === n - 1 ? x1 : x0 + i * step + (rng() * 2 - 1) * step * 0.25;
    const maxJump = Math.max(40, (FIELD_H - 2 * MARGIN_Y) * 0.6);
    let y = mid + (rng() * 2 - 1) * amp;
    y = clamp(y, prevY - maxJump, prevY + maxJump);
    y = clamp(y, MARGIN_Y, FIELD_H - MARGIN_Y);
    pts.push({ x, y });
    prevY = y;
  }
  return pts;
}

/** Catmull-Rom-Spline durch die Stützpunkte (gleichförmig), `perSegment` Abtastwerte je Abschnitt */
export function catmullRom(ctrl: readonly Pt[], perSegment = 32): Pt[] {
  if (ctrl.length < 2) return ctrl.map((p) => ({ ...p }));
  const P = (i: number): Pt => ctrl[clamp(i, 0, ctrl.length - 1)];
  const out: Pt[] = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = P(i - 1);
    const p1 = P(i);
    const p2 = P(i + 1);
    const p3 = P(i + 2);
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push({ x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) });
    }
  }
  out.push({ ...ctrl[ctrl.length - 1] });
  return out;
}

/** Bogenlänge einer Polylinie: kumulierte Länge je Punkt */
export function arcLengths(poly: readonly Pt[]): number[] {
  const len = [0];
  for (let i = 1; i < poly.length; i++) len.push(len[i - 1] + Math.hypot(poly[i].x - poly[i - 1].x, poly[i].y - poly[i - 1].y));
  return len;
}

/** Polylinie in gleichen Bogenlängen-Abständen neu abtasten (erster und letzter Punkt bleiben) */
export function resample(poly: readonly Pt[], spacing: number): Pt[] {
  if (poly.length < 2) return poly.map((p) => ({ ...p }));
  const len = arcLengths(poly);
  const total = len[len.length - 1];
  const n = Math.max(1, Math.round(total / spacing));
  const out: Pt[] = [];
  let seg = 0;
  for (let k = 0; k <= n; k++) {
    const target = (total * k) / n;
    while (seg < poly.length - 2 && len[seg + 1] < target) seg++;
    const span = len[seg + 1] - len[seg];
    const f = span > 0 ? (target - len[seg]) / span : 0;
    out.push({ x: poly[seg].x + (poly[seg + 1].x - poly[seg].x) * f, y: poly[seg].y + (poly[seg + 1].y - poly[seg].y) * f });
  }
  return out;
}

export interface TracePath {
  ctrl: Pt[];
  /** gleichmäßig abgetastete Pfadpunkte (Abstand ≈ SAMPLE_SPACING) */
  pts: Pt[];
  /** Gesamtlänge (px) */
  length: number;
  start: Pt;
  goal: Pt;
}

/** Fertiger Pfad aus Zufall und Optionen */
export function buildPath(rng: Rng, opts: PathOptions): TracePath {
  const ctrl = generateControlPoints(rng, opts);
  return pathFromControl(ctrl);
}

/** Pfad aus gegebenen Stützpunkten (z. B. für Tests) */
export function pathFromControl(ctrl: Pt[]): TracePath {
  const dense = catmullRom(ctrl, 32);
  const pts = resample(dense, SAMPLE_SPACING);
  const len = arcLengths(pts);
  return { ctrl, pts, length: len[len.length - 1], start: pts[0], goal: pts[pts.length - 1] };
}

export const dist = (a: Pt, b: Pt): number => Math.hypot(a.x - b.x, a.y - b.y);

/** Abstand eines Punkts zu einer Strecke */
function distToSegment(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const f = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(p.x - (a.x + dx * f), p.y - (a.y + dy * f));
}

/**
 * Nächster Pfadpunkt im Indexfenster [from, to]: Index des nächsten Abtastpunkts und genauer Abstand zur Pfadlinie
 * (zu den beiden angrenzenden Strecken, nicht nur zum Abtastpunkt).
 */
export function nearestInWindow(pts: readonly Pt[], p: Pt, from: number, to: number): { index: number; dist: number } {
  const a = Math.max(0, Math.floor(from));
  const b = Math.min(pts.length - 1, Math.ceil(to));
  let best = a;
  let bd = Infinity;
  for (let i = a; i <= b; i++) {
    const d = (pts[i].x - p.x) ** 2 + (pts[i].y - p.y) ** 2;
    if (d < bd) {
      bd = d;
      best = i;
    }
  }
  let exact = Math.sqrt(bd);
  if (best > 0) exact = Math.min(exact, distToSegment(p, pts[best - 1], pts[best]));
  if (best < pts.length - 1) exact = Math.min(exact, distToSegment(p, pts[best], pts[best + 1]));
  return { index: best, dist: exact };
}
