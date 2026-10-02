// EYE-EXPERIMENT: Kalibrierpunkte, Median je Punkt und Anpassung des Blickmodells (Ridge, Auswahl per Leave-one-out).
// Rein, ohne DOM/Kamera – per Unit-Test mit bekannter Abbildung geprüft.
import { FEATURE_NAMES, featureIndex, type FeatureName } from './features';
import { expandPoly, fitRidge, looErrors, predictRidge, type RidgeModel } from './ridge';
import type { Pt, Size } from './types';

/** Abstand der äußeren Kalibrierpunkte vom Fensterrand (Bruchteil). Die vier Ecken liegen im Raster. */
export const CAL_INSET = 0.08;
const G = [CAL_INSET, 0.5, 1 - CAL_INSET];

/** 9 Kalibrierpunkte (normiert 0..1) in Schlangenreihenfolge (kurze Wege): oben links → … → unten rechts. */
export const CALIBRATION_POINTS: readonly Pt[] = [
  { x: G[0], y: G[0] },
  { x: G[1], y: G[0] },
  { x: G[2], y: G[0] },
  { x: G[2], y: G[1] },
  { x: G[1], y: G[1] },
  { x: G[0], y: G[1] },
  { x: G[0], y: G[2] },
  { x: G[1], y: G[2] },
  { x: G[2], y: G[2] },
];

/**
 * 9 Kontrollpunkte für die Genauigkeitsprüfung (normiert), 3×3-Raster, absichtlich versetzt zu den Kalibrierpunkten
 * (nur der mittlere Punkt liegt nahe der Bildschirmmitte, ist aber leicht verschoben). Reihenfolge: zeilenweise.
 */
export const CHECK_POINTS: readonly Pt[] = [
  { x: 0.2, y: 0.2 },
  { x: 0.5, y: 0.22 },
  { x: 0.8, y: 0.2 },
  { x: 0.22, y: 0.5 },
  { x: 0.56, y: 0.56 },
  { x: 0.78, y: 0.5 },
  { x: 0.2, y: 0.8 },
  { x: 0.5, y: 0.78 },
  { x: 0.8, y: 0.8 },
];

export const toPx = (p: Pt, size: Size): Pt => ({ x: p.x * size.w, y: p.y * size.h });

export function median(xs: readonly number[]): number {
  if (!xs.length) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export interface FeatureFrame {
  /** Zeit in ms (beliebiger Nullpunkt, nur Differenzen zählen) */
  t: number;
  f: number[];
}

export interface PointSummary {
  /** Median je Merkmal */
  feat: number[];
  /** Anzahl verwendeter Bilder */
  n: number;
  /** Median der absoluten Abweichung je Merkmal (Streuung) */
  mad: number[];
}

/** Median je Merkmal über die Bilder nach den ersten `discardMs` ab `t0`; null, wenn weniger als `minFrames` übrig sind. */
export function summarizePoint(frames: readonly FeatureFrame[], t0: number, discardMs: number, minFrames = 5): PointSummary | null {
  const use = frames.filter((fr) => fr.t - t0 >= discardMs);
  if (use.length < minFrames) return null;
  const k = use[0].f.length;
  const feat: number[] = [];
  const mad: number[] = [];
  for (let j = 0; j < k; j++) {
    const col = use.map((fr) => fr.f[j]);
    const m = median(col);
    feat.push(m);
    mad.push(median(col.map((v) => Math.abs(v - m))));
  }
  return { feat, n: use.length, mad };
}

export interface ModelSpec {
  id: string;
  inputs: FeatureName[];
  degree: 1 | 2;
}

/** Kandidaten von einfach zu komplex; gewählt wird per Leave-one-out (bei Gleichstand der einfachere). */
export const MODEL_SPECS: readonly ModelSpec[] = [
  { id: 'auge', inputs: ['hAvg', 'vAvg'], degree: 1 },
  { id: 'auge-kopf', inputs: ['hAvg', 'vAvg', 'yaw', 'pitch'], degree: 1 },
  { id: 'auge-lid-kopf', inputs: ['hAvg', 'vAvg', 'openAvg', 'yaw', 'pitch'], degree: 1 },
  { id: 'auge-lid-kopf-lage', inputs: ['hAvg', 'vAvg', 'openAvg', 'yaw', 'pitch', 'faceX', 'faceY'], degree: 1 },
  { id: 'auge-quadr', inputs: ['hAvg', 'vAvg'], degree: 2 },
  { id: 'auge-kopf-quadr', inputs: ['hAvg', 'vAvg', 'yaw', 'pitch'], degree: 2 },
];
export const LAMBDAS: readonly number[] = [0.01, 0.1, 1, 10];

export interface GazeModel {
  version: 1;
  specId: string;
  inputs: number[];
  degree: 1 | 2;
  ridge: RidgeModel;
  /** Fenstergröße bei der Kalibrierung (die Ridge-Ausgabe ist in diesen Pixeln) */
  viewport: Size;
  createdAt: number;
  /** Leave-one-out-Fehler in Pixeln der Kalibrier-Fenstergröße (Schätzfehler des Modells an ausgelassenen Punkten) */
  loo: { meanPx: number; medianPx: number; maxPx: number; perPoint: number[] };
  nPoints: number;
}

export type FitResult =
  | { ok: true; model: GazeModel; tried: { specId: string; lambda: number; meanPx: number }[] }
  | { ok: false; reason: 'too-few-points' | 'no-movement' | 'numeric'; detail?: string };

export interface CalibrationPoint {
  /** Zielort in Pixeln der Kalibrier-Fenstergröße */
  target: Pt;
  feat: number[];
}

export const MIN_CAL_POINTS = 6;
/** Spannweite von hAvg bzw. vAvg über alle Punkte, unter der von „keine Augenbewegung erkannt“ ausgegangen wird (in Augenbreiten). */
export const MIN_FEATURE_RANGE = 0.02;

export function fitGazeModel(points: readonly CalibrationPoint[], viewport: Size, now = Date.now()): FitResult {
  if (points.length < MIN_CAL_POINTS) return { ok: false, reason: 'too-few-points', detail: `${points.length}` };
  const hs = points.map((p) => p.feat[featureIndex('hAvg')]);
  const vs = points.map((p) => p.feat[featureIndex('vAvg')]);
  const range = (xs: number[]) => Math.max(...xs) - Math.min(...xs);
  if (range(hs) < MIN_FEATURE_RANGE && range(vs) < MIN_FEATURE_RANGE) return { ok: false, reason: 'no-movement' };
  const Y = points.map((p) => [p.target.x, p.target.y]);
  const tried: { specId: string; lambda: number; meanPx: number }[] = [];
  const results: { spec: ModelSpec; lambda: number; mean: number; errs: number[] }[] = [];
  for (const spec of MODEL_SPECS) {
    const idx = spec.inputs.map(featureIndex);
    const X = points.map((p) => expandPoly(idx.map((i) => p.feat[i]), spec.degree));
    for (const lambda of LAMBDAS) {
      try {
        const errs = looErrors(X, Y, lambda);
        const mean = errs.reduce((s, e) => s + e, 0) / errs.length;
        tried.push({ specId: spec.id, lambda, meanPx: mean });
        if (Number.isFinite(mean)) results.push({ spec, lambda, mean, errs });
      } catch {
        /* singuläre Konstellation – Kandidat überspringen */
      }
    }
  }
  if (!results.length) return { ok: false, reason: 'numeric' };
  const best = Math.min(...results.map((r) => r.mean));
  const pick = results.find((r) => r.mean <= best * 1.05) ?? results[0];
  const idx = pick.spec.inputs.map(featureIndex);
  const X = points.map((p) => expandPoly(idx.map((i) => p.feat[i]), pick.spec.degree));
  const ridge = fitRidge(X, Y, pick.lambda);
  const model: GazeModel = {
    version: 1,
    specId: pick.spec.id,
    inputs: idx,
    degree: pick.spec.degree,
    ridge,
    viewport: { ...viewport },
    createdAt: now,
    loo: { meanPx: pick.mean, medianPx: median(pick.errs), maxPx: Math.max(...pick.errs), perPoint: pick.errs },
    nPoints: points.length,
  };
  return { ok: true, model, tried };
}

/** Vorhersage in Bruchteilen des Fensters (0..1, nicht begrenzt). */
export function predictGaze(model: GazeModel, feat: readonly number[]): Pt {
  const x = expandPoly(
    model.inputs.map((i) => feat[i]),
    model.degree,
  );
  const [px, py] = predictRidge(model.ridge, x);
  return { x: px / model.viewport.w, y: py / model.viewport.h };
}

/** Prüft ein aus dem Speicher gelesenes Objekt auf die erwartete Form (z. B. aus sessionStorage). */
export function isGazeModel(m: unknown): m is GazeModel {
  const g = m as GazeModel | null;
  return (
    !!g &&
    g.version === 1 &&
    Array.isArray(g.inputs) &&
    g.inputs.every((i) => Number.isInteger(i) && i >= 0 && i < FEATURE_NAMES.length) &&
    (g.degree === 1 || g.degree === 2) &&
    !!g.ridge &&
    Array.isArray(g.ridge.w) &&
    Array.isArray(g.ridge.mean) &&
    Array.isArray(g.ridge.std) &&
    !!g.viewport &&
    g.viewport.w > 0 &&
    g.viewport.h > 0
  );
}

/** Ist die Kalibrierung für das aktuelle Fenster noch brauchbar? (Drehung oder deutlich andere Größe → neu kalibrieren) */
export function isStale(cal: Size, now: Size, tolerance = 0.12): boolean {
  if (cal.w > cal.h !== now.w > now.h) return true;
  return Math.abs(now.w / cal.w - 1) > tolerance || Math.abs(now.h / cal.h - 1) > tolerance;
}
