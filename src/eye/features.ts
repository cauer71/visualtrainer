// EYE-EXPERIMENT: Merkmale aus den 478 Face-Landmarks (Iris relativ zu Augenwinkeln, Kopfhaltung, Abstand).
// Reine Rechenlogik ohne DOM/Kamera – per Unit-Test geprüft.
import type { Landmark, Size } from './types';

/** Indizes im MediaPipe-Gesichtsnetz (478 Punkte inkl. Iris). „links/rechts“ = im Kamerabild, nicht aus Sicht der Person. */
export const LM = {
  /** Auge im linken Bildteil (= rechtes Auge der Person) */
  eyeA: { left: 33, right: 133, upper: 159, lower: 145, iris: 468, ring: [469, 470, 471, 472] },
  /** Auge im rechten Bildteil (= linkes Auge der Person) */
  eyeB: { left: 362, right: 263, upper: 386, lower: 374, iris: 473, ring: [474, 475, 476, 477] },
} as const;

export const LANDMARK_COUNT = 478;

/** Reihenfolge des Merkmalsvektors (eine Zeile der Kalibrierung). */
export const FEATURE_NAMES = ['hAvg', 'vAvg', 'openAvg', 'yaw', 'pitch', 'roll', 'faceX', 'faceY', 'scale'] as const;
export type FeatureName = (typeof FEATURE_NAMES)[number];
export const featureIndex = (n: FeatureName): number => FEATURE_NAMES.indexOf(n);

/** Mittlerer Irisdurchmesser des Menschen (Näherung, ≈ 11,7 mm). */
export const IRIS_DIAMETER_MM = 11.7;
/** Annahme: horizontales Sichtfeld der Frontkamera ≈ 65° – echte Geräte weichen ab, daher nur grobe Abstandsschätzung. */
export const ASSUMED_HFOV_DEG = 65;

export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface FaceMetrics {
  /** Vektor in der Reihenfolge von FEATURE_NAMES */
  features: number[];
  yawDeg: number;
  pitchDeg: number;
  rollDeg: number;
  hasPose: boolean;
  /** grobe Abstandsschätzung aus dem Irisdurchmesser (cm) */
  distanceCm: number | null;
  /** Abstand aus der Translation der Transformationsmatrix (cm), nur zum Vergleich */
  matrixDistanceCm: number | null;
  /** Lidspalte / Augenbreite, Mittel beider Augen (≈ 0,25–0,35 offen; < 0,12 Lidschlag) */
  eyeOpen: number;
  blink: boolean;
  faceBox: Box;
  eyeBoxes: [Box, Box];
  /** Abstand der Augenmitten im Kamerabild in Pixeln */
  ipdPx: number;
}

interface EyeGeometry {
  h: number;
  v: number;
  open: number;
  center: { x: number; y: number };
  irisPx: number;
  box: Box;
}

const px = (l: Landmark, img: Size) => ({ x: l.x * img.w, y: l.y * img.h });

function eyeGeometry(lm: readonly Landmark[], idx: (typeof LM)['eyeA'] | (typeof LM)['eyeB'], img: Size): EyeGeometry | null {
  const L = px(lm[idx.left], img);
  const R = px(lm[idx.right], img);
  const U = px(lm[idx.upper], img);
  const D = px(lm[idx.lower], img);
  const C = px(lm[idx.iris], img);
  const w = Math.hypot(R.x - L.x, R.y - L.y);
  if (!(w > 1)) return null;
  // Augenachse (von Bild-links nach Bild-rechts) und „oben“ senkrecht dazu (Bild-y zeigt nach unten)
  const a = { x: (R.x - L.x) / w, y: (R.y - L.y) / w };
  const p = { x: a.y, y: -a.x };
  const E = { x: (L.x + R.x) / 2, y: (L.y + R.y) / 2 };
  const h = ((C.x - E.x) * a.x + (C.y - E.y) * a.y) / w;
  const v = ((C.x - E.x) * p.x + (C.y - E.y) * p.y) / w;
  const open = Math.hypot(U.x - D.x, U.y - D.y) / w;
  const ring = idx.ring.map((i) => px(lm[i], img));
  const d1 = Math.hypot(ring[0].x - ring[2].x, ring[0].y - ring[2].y);
  const d2 = Math.hypot(ring[1].x - ring[3].x, ring[1].y - ring[3].y);
  const irisPx = (d1 + d2) / 2;
  const xs = [L.x, R.x, U.x, D.x];
  const ys = [L.y, R.y, U.y, D.y];
  const pad = 0.25 * w;
  const box: Box = {
    x0: (Math.min(...xs) - pad) / img.w,
    x1: (Math.max(...xs) + pad) / img.w,
    y0: (Math.min(...ys) - pad) / img.h,
    y1: (Math.max(...ys) + pad) / img.h,
  };
  return { h, v, open, center: E, irisPx, box };
}

/** Abstand (cm) aus dem Irisdurchmesser in Pixeln und der Bildbreite; ohne Zusicherung (Sichtfeld angenommen). */
export function estimateDistanceCm(irisPx: number, imgWidthPx: number, hfovDeg = ASSUMED_HFOV_DEG, irisMm = IRIS_DIAMETER_MM): number | null {
  if (!(irisPx > 0.5)) return null;
  const f = imgWidthPx / 2 / Math.tan((hfovDeg * Math.PI) / 360);
  return (f * irisMm) / irisPx / 10;
}

/**
 * Kopfhaltung aus der 4×4-Transformationsmatrix von MediaPipe. Die Matrix kommt spaltenweise (Translation an 12..14);
 * für den Fall zeilenweiser Ablage wird das anhand der letzten Zeile (0,0,0,1) erkannt.
 * Winkel in Grad. Vorzeichen: yaw > 0 = Nase zeigt im Kamerabild nach rechts; pitch > 0 = Nase zeigt nach oben.
 * (Die Vorzeichen-Konvention ist ohne echtes Gesicht nicht überprüft; die Regression braucht nur Stetigkeit.)
 */
export function headPoseFromMatrix(data: ArrayLike<number>): { yaw: number; pitch: number; roll: number; tx: number; ty: number; tz: number } | null {
  if (!data || data.length < 16) return null;
  for (let i = 0; i < 16; i++) if (!Number.isFinite(data[i])) return null;
  const colMajor = Math.abs(data[3]) + Math.abs(data[7]) + Math.abs(data[11]) < 1e-3;
  const R = (r: number, c: number) => (colMajor ? data[c * 4 + r] : data[r * 4 + c]);
  const t = colMajor ? { x: data[12], y: data[13], z: data[14] } : { x: data[3], y: data[7], z: data[11] };
  const norm = (c: number) => Math.hypot(R(0, c), R(1, c), R(2, c)) || 1;
  const n0 = norm(0);
  const n2 = norm(2);
  // Blickrichtung des Gesichts = 3. Spalte (Nase), Seitenachse = 1. Spalte
  const fx = R(0, 2) / n2;
  const fy = R(1, 2) / n2;
  const fz = R(2, 2) / n2;
  const yaw = Math.atan2(fx, fz);
  const pitch = Math.atan2(fy, Math.hypot(fx, fz));
  const roll = Math.atan2(R(1, 0) / n0, R(0, 0) / n0);
  const deg = 180 / Math.PI;
  return { yaw: yaw * deg, pitch: pitch * deg, roll: roll * deg, tx: t.x, ty: t.y, tz: t.z };
}

/** Lidschlag-Schwelle für das Verhältnis Lidspalte/Augenbreite. */
export const BLINK_OPEN_RATIO = 0.12;

/** Hauptfunktion: Merkmale und Kennzahlen aus Landmarks und (optional) Transformationsmatrix. */
export function extractFeatures(lm: readonly Landmark[], matrix: ArrayLike<number> | null | undefined, img: Size): FaceMetrics | null {
  if (!lm || lm.length < LANDMARK_COUNT) return null;
  const A = eyeGeometry(lm, LM.eyeA, img);
  const B = eyeGeometry(lm, LM.eyeB, img);
  if (!A || !B) return null;
  const pose = matrix ? headPoseFromMatrix(matrix) : null;
  const hAvg = (A.h + B.h) / 2;
  const vAvg = (A.v + B.v) / 2;
  const open = (A.open + B.open) / 2;
  const ipdPx = Math.hypot(A.center.x - B.center.x, A.center.y - B.center.y);
  const faceX = (A.center.x + B.center.x) / 2 / img.w;
  const faceY = (A.center.y + B.center.y) / 2 / img.h;
  const scale = ipdPx / img.w;
  const irisPx = (A.irisPx + B.irisPx) / 2;
  let x0 = 1;
  let y0 = 1;
  let x1 = 0;
  let y1 = 0;
  for (const p of lm) {
    if (p.x < x0) x0 = p.x;
    if (p.x > x1) x1 = p.x;
    if (p.y < y0) y0 = p.y;
    if (p.y > y1) y1 = p.y;
  }
  const yaw = pose?.yaw ?? 0;
  const pitch = pose?.pitch ?? 0;
  const roll = pose?.roll ?? 0;
  return {
    features: [hAvg, vAvg, open, yaw, pitch, roll, faceX, faceY, scale],
    yawDeg: yaw,
    pitchDeg: pitch,
    rollDeg: roll,
    hasPose: !!pose,
    distanceCm: estimateDistanceCm(irisPx, img.w),
    matrixDistanceCm: pose ? Math.abs(pose.tz) : null,
    eyeOpen: open,
    blink: A.open < BLINK_OPEN_RATIO && B.open < BLINK_OPEN_RATIO,
    faceBox: { x0, y0, x1, y1 },
    eyeBoxes: [A.box, B.box],
    ipdPx,
  };
}
