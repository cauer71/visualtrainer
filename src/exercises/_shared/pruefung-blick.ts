/**
 * Blickrichtungs-Raster für die Funktionsübungen (Hess-Schirm und Diplopie-Karte): Umrechnung zwischen Blickwinkel
 * (Grad) und Ort auf einer ebenen Fläche (cm), Anpassung des Rasters an die Bühne und Fläche eines Umrisses.
 *
 * Projektion auf eine ebene Fläche im Abstand D: x = D · tan(Winkel waagerecht), y = D · tan(Winkel senkrecht).
 * Koordinaten in cm relativ zur Mitte der Fläche, y wächst nach OBEN (Bildschirm-y wächst nach unten: beim Zeichnen
 * umkehren). Reine Funktionen ohne Darstellung.
 */

const RAD = Math.PI / 180;

export type GazeRing = 'inner' | 'outer' | 'center';

export interface GazePoint {
  /** laufende Nummer ab 1 */
  id: number;
  ring: GazeRing;
  /** Blickwinkel waagerecht (+ nach rechts) und senkrecht (+ nach oben) in Grad */
  hx: number;
  vy: number;
}

/** 25 Punkte eines 5×5-Rasters: 9 innere (höchstens halber Winkel) und 16 äußere (voller Winkel) */
export function hessGrid(maxDeg: number): GazePoint[] {
  const steps = [-1, -0.5, 0, 0.5, 1];
  const out: GazePoint[] = [];
  for (let iy = steps.length - 1; iy >= 0; iy--) {
    for (let ix = 0; ix < steps.length; ix++) {
      const m = Math.max(Math.abs(steps[ix]), Math.abs(steps[iy]));
      out.push({ id: 0, ring: m <= 0.5 ? 'inner' : 'outer', hx: steps[ix] * maxDeg, vy: steps[iy] * maxDeg });
    }
  }
  return out.map((p, i) => ({ ...p, id: i + 1 }));
}

/** 9 Blickrichtungen: Mitte und acht Randpunkte im Winkel `deg` */
export function nineGrid(deg: number): GazePoint[] {
  const out: GazePoint[] = [];
  for (const sy of [1, 0, -1]) {
    for (const sx of [-1, 0, 1]) out.push({ id: 0, ring: sx === 0 && sy === 0 ? 'center' : 'outer', hx: sx * deg, vy: sy * deg });
  }
  return out.map((p, i) => ({ ...p, id: i + 1 }));
}

/** Ort (cm, relativ zur Mitte, y nach oben) für die Blickwinkel `hx`, `vy` bei Abstand `distCm` */
export function project(distCm: number, hx: number, vy: number): { x: number; y: number } {
  return { x: distCm * Math.tan(hx * RAD), y: distCm * Math.tan(vy * RAD) };
}

/** Umkehrung von `project`: Blickwinkel (Grad) für einen Ort in cm (relativ zur Mitte, y nach oben) */
export function unproject(distCm: number, xCm: number, yCm: number): { hx: number; vy: number } {
  return { hx: Math.atan(xCm / distCm) / RAD, vy: Math.atan(yCm / distCm) / RAD };
}

export interface FittedPoint extends GazePoint {
  /** Ort in cm relativ zur Mitte (y nach oben) */
  x: number;
  y: number;
}

export interface GridFit {
  points: FittedPoint[];
  /** Faktor (≤ 1), mit dem alle Winkel verkleinert wurden, damit das Raster ins Feld passt */
  scale: number;
  /** tatsächlicher größter Winkel (Grad) */
  effMaxDeg: number;
  /** `true`, wenn das Raster verkleinert wurde */
  clamped: boolean;
}

/**
 * Skaliert das Raster (alle Winkel mit demselben Faktor ≤ 1) so, dass es mit Rand `marginCm` in ein Feld von
 * `wCm × hCm` passt. Die Winkel der Punkte (`hx`, `vy`) sind danach die tatsächlichen.
 */
export function fitGrid(distCm: number, grid: readonly GazePoint[], wCm: number, hCm: number, marginCm: number): GridFit {
  const maxDeg = Math.max(1e-9, ...grid.map((p) => Math.max(Math.abs(p.hx), Math.abs(p.vy))));
  const fits = (a: number): boolean =>
    grid.every((p) => {
      const q = project(distCm, p.hx * a, p.vy * a);
      return Math.abs(q.x) <= wCm / 2 - marginCm + 1e-9 && Math.abs(q.y) <= hCm / 2 - marginCm + 1e-9;
    });
  let a = 1;
  if (!fits(1)) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    a = lo;
  }
  const points = grid.map((p) => {
    const q = project(distCm, p.hx * a, p.vy * a);
    return { ...p, hx: p.hx * a, vy: p.vy * a, x: q.x, y: q.y };
  });
  return { points, scale: a, effMaxDeg: maxDeg * a, clamped: a < 1 - 1e-9 };
}

/** Fläche eines Vielecks (Schnürsenkelformel) */
export function polygonArea(pts: ReadonlyArray<{ x: number; y: number }>): number {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}
