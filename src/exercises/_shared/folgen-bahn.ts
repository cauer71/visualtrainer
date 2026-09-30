/**
 * Bahn-Tabelle für Nachführ-Regeln (Gruppe „…-folgen“: ausweich-, zickzack-, hoch-runter-folgen).
 *
 * Manche Bewegungen lassen sich nicht als geschlossene Formel x(s) schreiben (Richtungswechsel zu geplanten Zeiten, Bögen mit
 * weichem Boden). Hier wird die Bahn EINMAL beim Bau der Regel aus einer Geschwindigkeits-Vorschrift aufsummiert und als
 * dichte Tabelle abgelegt. Danach ist `at(s)` eine reine Funktion der Zeit s (lineare Interpolation) – unabhängig von Bildzahl
 * und Fingerposition, wie es der Kern `nachfuehren.ts` verlangt.
 *
 * Die Vorschrift `velocityAt(s, pos)` wird genau einmal je Schritt in aufsteigender Zeit aufgerufen (darf also Zustand
 * führen, z. B. Zufallsentscheidungen mit `rng` treffen); `pos` ist der bisher aufsummierte Ort.
 */
import type { Vec } from './nachfuehren-logic';

export interface PathTable {
  /** Ort zur Zeit s (u); außerhalb [0, Dauer] wird auf den Rand gehalten */
  at(s: number): Vec;
  /** Länge der Tabelle (s) */
  readonly duration: number;
  /** Größte Schrittweite zwischen zwei Tabellenpunkten (u) – Maß für die Glätte */
  readonly maxStep: number;
}

export const PATH_STEP_S = 0.01;

export function buildPath(
  start: Vec,
  duration: number,
  velocityAt: (s: number, pos: Vec) => Vec,
  step = PATH_STEP_S,
): PathTable {
  const n = Math.max(2, Math.ceil(duration / step) + 1);
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  xs[0] = start.x;
  ys[0] = start.y;
  let maxStep = 0;
  for (let i = 1; i < n; i++) {
    const p = { x: xs[i - 1], y: ys[i - 1] };
    const v = velocityAt((i - 1) * step, p);
    xs[i] = p.x + v.x * step;
    ys[i] = p.y + v.y * step;
    maxStep = Math.max(maxStep, Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]));
  }
  const total = (n - 1) * step;
  return {
    duration: total,
    maxStep,
    at(s: number): Vec {
      if (!(s > 0)) return { x: xs[0], y: ys[0] };
      if (s >= total) return { x: xs[n - 1], y: ys[n - 1] };
      const f = s / step;
      const i = Math.floor(f);
      const k = f - i;
      return { x: xs[i] + (xs[i + 1] - xs[i]) * k, y: ys[i] + (ys[i + 1] - ys[i]) * k };
    },
  };
}

/** Gleitender Übergang 0…1 (Hermite), für Tempo- und Richtungswechsel über `len` Sekunden ab `t0` */
export function blend(s: number, t0: number, len: number): number {
  const k = len > 0 ? Math.min(1, Math.max(0, (s - t0) / len)) : s >= t0 ? 1 : 0;
  return k * k * (3 - 2 * k);
}

/** Im Bereich [−lim, lim] halten: Geschwindigkeit nach außen wird null, sobald der nächste Schritt hinausführen würde (Sicherung, greift selten) */
export function keepInside(pos: number, vel: number, lim: number, step = PATH_STEP_S): number {
  if (vel > 0 && pos + vel * step >= lim) return 0;
  if (vel < 0 && pos + vel * step <= -lim) return 0;
  return vel;
}
