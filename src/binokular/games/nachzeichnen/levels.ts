/**
 * Level von „Nachzeichnen“ (rein, ohne DOM): Je höher das Level, desto komplexer der Pfad – zuerst mehr Stützpunkte und
 * stärkere Kurven, ab Level 4 Schleifen („Kringel“), später mehrere Schleifen und engere Kurven, bis Level 12 (danach
 * bleibt es bei 12, mit neuen Zufallspfaden).
 *
 * Schleife = Ausschnitt einer verlängerten Zykloide (Trochoide) mit waagerechten Enden: Der Pfad läuft hinein, dreht
 * eine Runde und kreuzt sich dabei genau einmal selbst. Die engste Krümmung hat mindestens den Radius `curlRadius`,
 * und der ist nie kleiner als 1,8 × Fehlerabstand – so bleibt der Pfad nachzeichenbar.
 *
 * `buildLevelPath` würfelt mit festem Seed, prüft jeden Kandidaten (`validatePath`) und würfelt bei Bedarf neu; im
 * Notfall werden Schleifen weggelassen (nie ein ungültiger Pfad).
 */
import { clamp, type Rng } from '../common';
import { arcLengths, dist, FIELD_H, FIELD_W, generateControlPoints, resample, SAMPLE_SPACING, type Pt, type TracePath } from './path';

export const MAX_LEVEL = 12;
export const MIN_LEVEL = 1;

export interface Complexity {
  level: number;
  /** Anzahl der Grund-Stützpunkte (inkl. Start und Ziel) */
  points: number;
  /** Streuung der Höhe 0–1 */
  spread: number;
  /** Anzahl der Schleifen */
  curls: number;
  /** kleinster Krümmungsradius einer Schleife (px), 0 = keine Schleife */
  curlRadius: number;
  /** zusätzliche zufällige Höhenabweichung der Stützpunkte (px) */
  wobble: number;
}

const TABLE: readonly Omit<Complexity, 'level'>[] = [
  { points: 5, spread: 0.45, curls: 0, curlRadius: 0, wobble: 0 },
  { points: 6, spread: 0.6, curls: 0, curlRadius: 0, wobble: 0 },
  { points: 7, spread: 0.75, curls: 0, curlRadius: 0, wobble: 12 },
  { points: 7, spread: 0.75, curls: 1, curlRadius: 80, wobble: 12 },
  { points: 7, spread: 0.8, curls: 1, curlRadius: 72, wobble: 16 },
  { points: 8, spread: 0.8, curls: 1, curlRadius: 64, wobble: 20 },
  { points: 8, spread: 0.85, curls: 2, curlRadius: 60, wobble: 20 },
  { points: 9, spread: 0.85, curls: 2, curlRadius: 56, wobble: 24 },
  { points: 9, spread: 0.9, curls: 2, curlRadius: 52, wobble: 24 },
  { points: 10, spread: 0.9, curls: 3, curlRadius: 50, wobble: 28 },
  { points: 10, spread: 0.95, curls: 3, curlRadius: 48, wobble: 28 },
  { points: 11, spread: 1, curls: 3, curlRadius: 46, wobble: 32 },
];

/** Level auf 1 … 12 bringen (ungültig → 1) */
export const clampLevel = (level: number): number => (Number.isFinite(level) ? clamp(Math.round(level), MIN_LEVEL, MAX_LEVEL) : MIN_LEVEL);

/** Komplexität eines Levels (reine Funktion; Level über 12 verhalten sich wie 12) */
export function complexityFor(level: number): Complexity {
  const l = clampLevel(level);
  return { level: l, ...TABLE[l - 1] };
}

/** Ein Zahlenwert für „wie schwer“: steigt mit jedem Level (nur zum Vergleichen und für Tests) */
export function complexityScore(c: Complexity): number {
  return c.points + 10 * c.spread + 6 * c.curls + (c.curls > 0 ? (100 - c.curlRadius) / 10 : 0) + c.wobble / 5;
}

/** Kleinster Schleifenradius: nie unter 1,8 × Fehlerabstand */
export const MIN_CURL_FACTOR = 1.8;
export const effectiveCurlRadius = (c: Complexity, errorDist: number): number => Math.max(c.curlRadius, MIN_CURL_FACTOR * errorDist);

/** Mindestabstand zweier nicht benachbarter Pfadstücke in Pfadbreiten (außer am Kreuzungspunkt) */
export const MIN_GAP_WIDTHS = 2.5;

// --- Spline mit ungleichen Abständen (zentripetal) -------------------------------------------

/** Zentripetaler Catmull-Rom-Spline durch die Stützpunkte: keine Spitzen und Eigenschnitte bei ungleichen Abständen */
export function centripetalCatmullRom(ctrl: readonly Pt[], perSegment = 24): Pt[] {
  const n = ctrl.length;
  if (n < 2) return ctrl.map((p) => ({ ...p }));
  const ext: Pt[] = [{ x: 2 * ctrl[0].x - ctrl[1].x, y: 2 * ctrl[0].y - ctrl[1].y }, ...ctrl, { x: 2 * ctrl[n - 1].x - ctrl[n - 2].x, y: 2 * ctrl[n - 1].y - ctrl[n - 2].y }];
  const knot = (a: Pt, b: Pt): number => Math.max(Math.sqrt(dist(a, b)), 1e-3);
  const out: Pt[] = [];
  for (let i = 1; i < ext.length - 2; i++) {
    const p0 = ext[i - 1];
    const p1 = ext[i];
    const p2 = ext[i + 1];
    const p3 = ext[i + 2];
    const t0 = 0;
    const t1 = t0 + knot(p0, p1);
    const t2 = t1 + knot(p1, p2);
    const t3 = t2 + knot(p2, p3);
    const lerp = (a: Pt, b: Pt, ta: number, tb: number, t: number): Pt => {
      const u = (t - ta) / (tb - ta);
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
    };
    for (let s = 0; s < perSegment; s++) {
      const t = t1 + ((t2 - t1) * s) / perSegment;
      const a1 = lerp(p0, p1, t0, t1, t);
      const a2 = lerp(p1, p2, t1, t2, t);
      const a3 = lerp(p2, p3, t2, t3, t);
      const b1 = lerp(a1, a2, t0, t2, t);
      const b2 = lerp(a2, a3, t1, t3, t);
      out.push(lerp(b1, b2, t1, t2, t));
    }
  }
  out.push({ ...ctrl[n - 1] });
  return out;
}

function pathOf(ctrl: Pt[]): TracePath {
  const pts = resample(centripetalCatmullRom(ctrl, 24), SAMPLE_SPACING);
  const len = arcLengths(pts);
  return { ctrl, pts, length: len[len.length - 1], start: pts[0], goal: pts[pts.length - 1] };
}

// --- Schleifen ------------------------------------------------------------------------------

/** Verhältnis a/b der verlängerten Zykloide; kleinster Krümmungsradius = b (1 − q)² */
const Q = 0.15;
const curlB = (radius: number): number => radius / ((1 - Q) * (1 - Q));
/** Halbe Breite des Bereichs, den eine Schleife in x beansprucht (Schleife ≈ 0,78 b, dazu Zuläufe) */
const curlHalfWidth = (radius: number): number => 0.78 * curlB(radius) + 55;
/** Länge des waagerechten Zulaufs vor und hinter einer Schleife (px) */
const curlLead = (radius: number): number => 0.47 * curlB(radius) + 45;
/** kleinster Abstand zweier Schleifenmitten: die Zuläufe berühren sich nie */
const curlSpacing = (radius: number): number => 2 * curlLead(radius) + 50;
/** Rand zum Spielfeldrand, in dem der ganze Pfad bleibt */
export const fieldMargin = (pathWidth: number): number => pathWidth / 2 + 30;

/** Punkte einer Schleife um (cx, cy): waagerechter Zulauf bei cy, Schleife `dir` = +1 nach unten / −1 nach oben */
function curlPoints(cx: number, cy: number, radius: number, dir: 1 | -1): Pt[] {
  const b = curlB(radius);
  const a = Q * b;
  const out: Pt[] = [];
  const N = 14;
  for (let k = 0; k <= N; k++) {
    const t = -Math.PI + (2 * Math.PI * k) / N;
    out.push({ x: cx + a * t - b * Math.sin(t), y: cy + dir * b * (1 + Math.cos(t)) });
  }
  return out;
}

const baseY = (base: readonly Pt[], x: number): number => {
  for (let i = 1; i < base.length; i++) {
    if (x <= base[i].x) {
      const f = (x - base[i - 1].x) / (base[i].x - base[i - 1].x || 1);
      return base[i - 1].y + (base[i].y - base[i - 1].y) * f;
    }
  }
  return base[base.length - 1].y;
};

/** Wie viele Schleifen (höchstens `want`) dieses Radius waagerecht nebeneinander und senkrecht ins Spielfeld passen */
export function fittingCurls(want: number, radius: number, pathWidth: number): number {
  if (want <= 0) return 0;
  const b = curlB(radius);
  if (2 * b + 2 * fieldMargin(pathWidth) + 8 > FIELD_H) return 0;
  const hw = curlHalfWidth(radius);
  const span = FIELD_W - 2 * (110 + 60 + hw);
  let k = want;
  while (k > 1 && span / k < curlSpacing(radius)) k--;
  return span > 0 ? k : 0;
}

/** Schleifen in die Stützpunkte einsetzen; `null`, wenn sie nicht ins Spielfeld passen */
function insertCurls(rng: Rng, base: Pt[], curls: number, radius: number, pathWidth: number): Pt[] | null {
  if (curls === 0) return base;
  const b = curlB(radius);
  const hw = curlHalfWidth(radius);
  const m = fieldMargin(pathWidth);
  const lo = base[0].x + 60 + hw;
  const hi = base[base.length - 1].x - 60 - hw;
  const slot = (hi - lo) / curls;
  if (hi <= lo) return null;
  const need = curlSpacing(radius);
  if (curls > 1 && slot < need) return null;
  const centers: number[] = [];
  for (let i = 0; i < curls; i++) {
    const jitter = curls === 1 ? (hi - lo) * 0.4 : Math.max(0, (slot - need) / 2);
    centers.push(lo + (i + 0.5) * slot + (rng() * 2 - 1) * jitter);
  }
  const loops = centers.map((cx) => {
    const yb = baseY(base, cx);
    const room = FIELD_H / 2;
    const down = Math.abs(yb - room) < 70 ? rng() < 0.5 : yb < room;
    const dir: 1 | -1 = down ? 1 : -1;
    let cy = yb;
    // die Schleife (Tiefe 2 b) muss ins Spielfeld passen
    if (dir === 1) cy = Math.min(cy, FIELD_H - m - 2 * b - 4);
    else cy = Math.max(cy, m + 2 * b + 4);
    cy = clamp(cy, m + 4, FIELD_H - m - 4);
    const lead = curlLead(radius);
    return { cx, cy, dir, pts: [{ x: cx - lead, y: cy }, ...curlPoints(cx, cy, radius, dir), { x: cx + lead, y: cy }] };
  });
  const out: Pt[] = [];
  const kept = base.filter((p, i) => i === 0 || i === base.length - 1 || centers.every((cx) => Math.abs(p.x - cx) > hw + 20)).map((p) => ({ ...p }));
  let li = 0;
  let lastBase = -1;
  let pullNext: number | null = null;
  for (let i = 0; i < kept.length; i++) {
    const p = kept[i];
    while (li < loops.length && loops[li].cx < p.x) {
      const l = loops[li++];
      // Nachbarn der Schleife zur Schleifenhöhe ziehen: keine steilen Anläufe (Start und Ziel bleiben)
      if (lastBase > 0) out[lastBase].y = l.cy + (out[lastBase].y - l.cy) * 0.35;
      pullNext = l.cy;
      out.push(...l.pts);
    }
    if (pullNext !== null && i < kept.length - 1) p.y = pullNext + (p.y - pullNext) * 0.35;
    pullNext = null;
    out.push(p);
    lastBase = out.length - 1;
  }
  while (li < loops.length) out.push(...loops[li++].pts);
  return out;
}

// --- Prüfung --------------------------------------------------------------------------------

export interface PathCheck {
  ok: boolean;
  reasons: string[];
  /** gefundene Selbstkreuzungen (Punkt und Winkel in Grad) */
  crossings: { x: number; y: number; angle: number }[];
  /** kleinster Krümmungsradius (px) */
  minRadius: number;
  length: number;
}

export interface CheckOptions {
  pathWidth: number;
  errorDist: number;
  /** erwartete Zahl der Selbstkreuzungen (= Schleifen) */
  curls: number;
}

/** Kürzeste und längste zulässige Bogenlänge (px) */
export const MIN_LENGTH = 900;
export const MAX_LENGTH = 7000;
/** kleinster Kreuzungswinkel (Grad): flacher würde der Pfad zu lange „doppelt“ laufen */
export const MIN_CROSS_ANGLE = 30;

function segIntersect(a: Pt, b: Pt, c: Pt, d: Pt): { x: number; y: number } | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = rx * sy - ry * sx;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((c.x - a.x) * sy - (c.y - a.y) * sx) / den;
  const u = ((c.x - a.x) * ry - (c.y - a.y) * rx) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: a.x + rx * t, y: a.y + ry * t };
}

/** Kleinster Krümmungsradius (Umkreis dreier Punkte im Abstand `k` Abtastschritte) */
export function minCurvatureRadius(pts: readonly Pt[], k = 8): number {
  let best = Infinity;
  for (let i = k; i < pts.length - k; i++) {
    const a = pts[i - k];
    const b = pts[i];
    const c = pts[i + k];
    const area2 = Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    if (area2 < 1e-9) continue;
    const r = (dist(a, b) * dist(b, c) * dist(a, c)) / (2 * area2);
    if (r < best) best = r;
  }
  return best;
}

/**
 * Prüft einen Pfad: im Spielfeld (mit Rand), Bogenlänge, Start links vom Ziel, kleinster Krümmungsradius
 * ≥ 1,5 × Fehlerabstand, genau `curls` Selbstkreuzungen (flach genug nicht: Winkel ≥ 30°), und nicht benachbarte
 * Pfadstücke liegen mindestens 2,5 Pfadbreiten auseinander – außer in der Nähe einer Kreuzung.
 */
export function validatePath(path: TracePath, o: CheckOptions): PathCheck {
  const reasons: string[] = [];
  const pts = path.pts;
  const m = fieldMargin(o.pathWidth);
  for (const p of pts) {
    if (p.x < m || p.x > FIELD_W - m || p.y < m || p.y > FIELD_H - m) {
      reasons.push('Rand');
      break;
    }
  }
  const length = path.length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) reasons.push('Länge');
  if (!(path.start.x < path.goal.x)) reasons.push('Start/Ziel');
  const minRadius = minCurvatureRadius(pts);
  if (minRadius < 1.3 * o.errorDist) reasons.push('Krümmung');

  // Kreuzungen und Abstände über ein Raster
  const gap = MIN_GAP_WIDTHS * o.pathWidth;
  const cell = Math.max(gap, 12);
  const grid = new Map<string, number[]>();
  const key = (cx: number, cy: number) => `${cx},${cy}`;
  pts.forEach((p, i) => {
    const k = key(Math.floor(p.x / cell), Math.floor(p.y / cell));
    const l = grid.get(k);
    if (l) l.push(i);
    else grid.set(k, [i]);
  });
  const near = (i: number): number[] => {
    const p = pts[i];
    const cx = Math.floor(p.x / cell);
    const cy = Math.floor(p.y / cell);
    const out: number[] = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) out.push(...(grid.get(key(cx + dx, cy + dy)) ?? []));
    return out;
  };
  // gleiche Pfadstücke: Bogenabstand unter ca. 4 Pfadbreiten
  const sep = Math.max(8, Math.ceil((4 * o.pathWidth) / SAMPLE_SPACING));
  const cross: { x: number; y: number; angle: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    for (const j of near(i)) {
      if (j <= i + sep) continue;
      for (const jj of [j - 1, j]) {
        if (jj <= i + 1 || jj >= pts.length - 1) continue;
        const x = segIntersect(pts[i], pts[i + 1], pts[jj], pts[jj + 1]);
        if (!x) continue;
        if (cross.some((c) => Math.hypot(c.x - x.x, c.y - x.y) < 12)) continue;
        const a1 = Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x);
        const a2 = Math.atan2(pts[jj + 1].y - pts[jj].y, pts[jj + 1].x - pts[jj].x);
        let da = Math.abs(a1 - a2) % Math.PI;
        da = Math.min(da, Math.PI - da);
        cross.push({ x: x.x, y: x.y, angle: (da * 180) / Math.PI });
      }
    }
  }
  if (cross.length !== o.curls) reasons.push('Kreuzungen');
  if (cross.some((c) => c.angle < MIN_CROSS_ANGLE)) reasons.push('Kreuzungswinkel');
  const allowedNear = (p: Pt): boolean =>
    cross.some((c) => {
      const half = (Math.max(c.angle, 1) * Math.PI) / 360;
      return Math.hypot(p.x - c.x, p.y - c.y) <= gap / (2 * Math.sin(half)) + 6;
    });
  let tooClose = false;
  for (let i = 0; i < pts.length && !tooClose; i += 2) {
    for (const j of near(i)) {
      if (j <= i + sep) continue;
      if (dist(pts[i], pts[j]) < gap && !(allowedNear(pts[i]) && allowedNear(pts[j]))) {
        tooClose = true;
        break;
      }
    }
  }
  if (tooClose) reasons.push('Abstand');
  return { ok: reasons.length === 0, reasons, crossings: cross, minRadius, length };
}

// --- Erzeugung ------------------------------------------------------------------------------

export interface LevelOptions {
  /** Pfadbreite (px) */
  pathWidth: number;
  /** Fehlerabstand (px) – bestimmt den kleinsten Schleifenradius */
  errorDist: number;
  /** Einstellung „Kurvigkeit: Stützpunkte“ relativ zum Standard (6): Zuschlag auf die Stützpunkte des Levels */
  pointsDelta?: number;
  /** Einstellung „Kurvigkeit: Streuung“ relativ zum Standard (60 %): Faktor auf die Streuung des Levels */
  spreadScale?: number;
}

export interface LevelPath {
  path: TracePath;
  complexity: Complexity;
  /** tatsächlich enthaltene Schleifen (kann bei sehr großem Fehlerabstand kleiner sein als `complexity.curls`) */
  curls: number;
  /** Radius, mit dem die Schleifen gebaut wurden (px) */
  curlRadius: number;
  /** Anzahl der Versuche, bis der Pfad gültig war */
  attempts: number;
}

const MAX_ATTEMPTS = 120;

/** Pfad für ein Level: gleicher Seed (Rng-Zustand) und Level → gleicher Pfad */
export function buildLevelPath(rng: Rng, level: number, o: LevelOptions): LevelPath {
  const c = complexityFor(level);
  const points = clamp(Math.round(c.points + (o.pointsDelta ?? 0)), 4, 12);
  const spread = clamp(c.spread * (o.spreadScale ?? 1), 0.2, 1);
  const radius = c.curls > 0 ? effectiveCurlRadius(c, o.errorDist) : 0;
  let last: TracePath | null = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // erst mit allen Schleifen versuchen, dann (bei engem Spielfeld) mit weniger
    const curls = Math.max(0, fittingCurls(c.curls, radius, o.pathWidth) - Math.floor((attempt - 1) / 40));
    const base = generateControlPoints(rng, { points, spread });
    if (c.wobble > 0) {
      for (let i = 1; i < base.length - 1; i++) base[i].y = clamp(base[i].y + (rng() * 2 - 1) * c.wobble, 120, FIELD_H - 120);
    }
    // zu enge Wellen glätten: Höhenunterschiede schrittweise verkleinern, bis der Pfad nachzeichenbar ist
    for (let k = 0; k < 10 && minCurvatureRadius(pathOf(base).pts) < 1.4 * o.errorDist; k++) {
      for (let i = 1; i < base.length - 1; i++) base[i].y = FIELD_H / 2 + (base[i].y - FIELD_H / 2) * 0.88;
    }
    const ctrl = insertCurls(rng, base, curls, radius, o.pathWidth);
    if (!ctrl) continue;
    const path = pathOf(ctrl);
    last = path;
    const check = validatePath(path, { pathWidth: o.pathWidth, errorDist: o.errorDist, curls });
    if (check.ok) return { path, complexity: c, curls, curlRadius: radius, attempts: attempt };
  }
  // Notfall: einfache sanfte Kurve ohne Schleifen
  for (let attempt = 1; attempt <= 40; attempt++) {
    const path = pathOf(generateControlPoints(rng, { points: Math.min(points, 6), spread: Math.min(spread, 0.6) }));
    last = path;
    if (validatePath(path, { pathWidth: o.pathWidth, errorDist: o.errorDist, curls: 0 }).ok) return { path, complexity: c, curls: 0, curlRadius: 0, attempts: MAX_ATTEMPTS + attempt };
  }
  return { path: last ?? pathOf(generateControlPoints(rng, { points: 5, spread: 0.4 })), complexity: c, curls: 0, curlRadius: 0, attempts: MAX_ATTEMPTS + 40 };
}
