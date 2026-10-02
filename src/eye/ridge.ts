// EYE-EXPERIMENT: Ridge-Regression (kleine Matrizen, ohne Abhängigkeiten) – rein, ohne DOM.

/** Löst A·X = B (A: n×n, B: n×m) per Gauß-Jordan mit Spaltenpivot. Wirft bei singulärem A. */
export function solve(A: number[][], B: number[][]): number[][] {
  const n = A.length;
  const m = B[0]?.length ?? 0;
  const M = A.map((row, i) => [...row, ...B[i]]);
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    if (Math.abs(M[piv][c]) < 1e-12) throw new Error('Matrix ist singulär');
    [M[c], M[piv]] = [M[piv], M[c]];
    const d = M[c][c];
    for (let k = c; k < n + m; k++) M[c][k] /= d;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c];
      if (f === 0) continue;
      for (let k = c; k < n + m; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row) => row.slice(n));
}

export function identity(n: number): number[][] {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
}

/** Polynom-Erweiterung: Grad 1 = Eingabe, Grad 2 = Eingabe + Quadrate + paarweise Produkte. */
export function expandPoly(x: readonly number[], degree: 1 | 2): number[] {
  if (degree === 1) return [...x];
  const out = [...x];
  for (let i = 0; i < x.length; i++) for (let j = i; j < x.length; j++) out.push(x[i] * x[j]);
  return out;
}

export interface RidgeModel {
  /** Mittelwert und Streuung je Spalte der (erweiterten) Eingabe, für die Standardisierung */
  mean: number[];
  std: number[];
  /** Gewichte: (p+1)×k, letzte Zeile = Achsenabschnitt */
  w: number[][];
  lambda: number;
}

function standardize(X: number[][]): { Z: number[][]; mean: number[]; std: number[] } {
  const n = X.length;
  const p = X[0].length;
  const mean = new Array<number>(p).fill(0);
  const std = new Array<number>(p).fill(0);
  for (const row of X) for (let j = 0; j < p; j++) mean[j] += row[j] / n;
  for (const row of X) for (let j = 0; j < p; j++) std[j] += (row[j] - mean[j]) ** 2 / n;
  for (let j = 0; j < p; j++) std[j] = Math.sqrt(std[j]) || 1;
  const Z = X.map((row) => row.map((v, j) => (v - mean[j]) / std[j]));
  return { Z, mean, std };
}

function gram(Za: number[][], lambda: number): number[][] {
  const p = Za[0].length; // inkl. Achsenabschnitt als letzte Spalte
  const G = Array.from({ length: p }, () => new Array<number>(p).fill(0));
  for (const row of Za) for (let i = 0; i < p; i++) for (let j = 0; j < p; j++) G[i][j] += row[i] * row[j];
  for (let i = 0; i < p - 1; i++) G[i][i] += lambda; // Achsenabschnitt wird nicht bestraft
  return G;
}

/** Ridge-Regression Y ≈ [Z,1]·W mit standardisierter Eingabe. X: n×p, Y: n×k. */
export function fitRidge(X: number[][], Y: number[][], lambda: number): RidgeModel {
  const { Z, mean, std } = standardize(X);
  const Za = Z.map((r) => [...r, 1]);
  const G = gram(Za, lambda);
  const p = Za[0].length;
  const k = Y[0].length;
  const XtY = Array.from({ length: p }, (_, i) => Array.from({ length: k }, (_, c) => Za.reduce((s, row, r) => s + row[i] * Y[r][c], 0)));
  return { mean, std, w: solve(G, XtY), lambda };
}

export function predictRidge(m: RidgeModel, x: readonly number[]): number[] {
  const k = m.w[0].length;
  const out = new Array<number>(k).fill(0);
  for (let c = 0; c < k; c++) {
    let s = m.w[m.w.length - 1][c];
    for (let j = 0; j < x.length; j++) s += ((x[j] - m.mean[j]) / m.std[j]) * m.w[j][c];
    out[c] = s;
  }
  return out;
}

/**
 * Leave-one-out-Fehler je Zeile (Euklid über alle Ausgaben), geschlossen über die Hat-Matrix:
 * e_i / (1 − h_ii). Gibt Infinity zurück, wenn h_ii ≈ 1 (Zeile bestimmt ihre eigene Vorhersage vollständig).
 */
export function looErrors(X: number[][], Y: number[][], lambda: number): number[] {
  const { Z } = standardize(X);
  const Za = Z.map((r) => [...r, 1]);
  const G = gram(Za, lambda);
  const Ginv = solve(G, identity(G.length));
  const model = fitRidge(X, Y, lambda);
  return Za.map((row, i) => {
    let h = 0;
    for (let a = 0; a < row.length; a++) for (let b = 0; b < row.length; b++) h += row[a] * Ginv[a][b] * row[b];
    const pred = predictRidge(model, X[i]);
    const res = Math.hypot(...pred.map((v, c) => v - Y[i][c]));
    return 1 - h < 1e-6 ? Infinity : res / (1 - h);
  });
}
