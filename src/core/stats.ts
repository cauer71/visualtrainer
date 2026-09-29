/** Statistik-Helfer (robuste Kennwerte statt nur Mittelwert). */
export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

export function mean(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}

export function median(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  const a = [...xs].sort((p, q) => p - q);
  const m = a.length >> 1;
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

export function quantile(xs: readonly number[], q: number): number {
  if (!xs.length) return NaN;
  const a = [...xs].sort((p, r) => p - r);
  const pos = clamp(q, 0, 1) * (a.length - 1);
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return a[lo] + (a[hi] - a[lo]) * (pos - lo);
}

export function sd(xs: readonly number[]): number {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  let s = 0;
  for (const x of xs) s += (x - m) ** 2;
  return Math.sqrt(s / (xs.length - 1));
}

export function geoMean(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  let s = 0;
  for (const x of xs) s += Math.log(Math.max(1e-9, x));
  return Math.exp(s / xs.length);
}

/** Lineare Interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Sanfte Ein-/Ausblendkurve 0..1 */
export function easeInOut(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
}

export function easeOut(t: number): number {
  const x = clamp(t, 0, 1);
  return 1 - (1 - x) ** 3;
}

/**
 * d′ (Signalentdeckung) mit log-linearer Korrektur (Hautus 1995),
 * damit Trefferquoten von 0 % oder 100 % endliche Werte liefern.
 */
export function dPrime(hits: number, signals: number, falseAlarms: number, noise: number): number {
  if (signals <= 0 || noise <= 0) return NaN;
  const h = (hits + 0.5) / (signals + 1);
  const f = (falseAlarms + 0.5) / (noise + 1);
  return probit(h) - probit(f);
}

/** Inverse der Standardnormalverteilung (Acklam-Näherung) */
export function probit(p: number): number {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const q0 = clamp(p, 1e-9, 1 - 1e-9);
  const pl = 0.02425;
  if (q0 < pl) {
    const q = Math.sqrt(-2 * Math.log(q0));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (q0 > 1 - pl) {
    const q = Math.sqrt(-2 * Math.log(1 - q0));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = q0 - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
