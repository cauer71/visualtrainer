// EYE-EXPERIMENT: Synthetische Merkmale für Tests (`?test=1`): aus einem „wahren“ Blickpunkt werden Merkmale erzeugt,
// die der echten Auswertung (Kalibrierung → Regression → Filter → Viertel) zugeführt werden. Rein, ohne DOM.
import { FEATURE_NAMES, type FaceMetrics } from './features';
import type { Pt } from './types';

/** Bekannte (lineare) Abbildung Blickpunkt → Merkmale; die Kalibrierung muss die Umkehrung wiederfinden. */
export function synthFeatures(truth: Pt, normal: () => number = () => 0, noise = { h: 0.003, v: 0.004 }): number[] {
  const yaw = 2 + 0.2 * normal();
  const pitch = -4 + 0.2 * normal();
  const hAvg = 0.02 + 0.3 * (truth.x - 0.5) + 0.004 * (yaw - 2) + noise.h * normal();
  const vAvg = -0.01 + 0.16 * (0.5 - truth.y) + 0.003 * (pitch + 4) + noise.v * normal();
  const openAvg = 0.3 + 0.05 * (0.5 - truth.y);
  const f: Record<(typeof FEATURE_NAMES)[number], number> = {
    hAvg,
    vAvg,
    openAvg,
    yaw,
    pitch,
    roll: 0.5 * normal(),
    faceX: 0.5,
    faceY: 0.5,
    scale: 0.2,
  };
  return FEATURE_NAMES.map((n) => f[n]);
}

/** Kennzahlen eines „Gesichts“ für die synthetische Quelle (damit die Live-Ansicht im Testmodus etwas zeigt). */
export function synthMetrics(features: number[]): FaceMetrics {
  const at = (n: (typeof FEATURE_NAMES)[number]) => features[FEATURE_NAMES.indexOf(n)];
  const box = { x0: 0.3, y0: 0.2, x1: 0.7, y1: 0.8 };
  return {
    features,
    yawDeg: at('yaw'),
    pitchDeg: at('pitch'),
    rollDeg: at('roll'),
    hasPose: true,
    distanceCm: 45,
    matrixDistanceCm: 45,
    eyeOpen: at('openAvg'),
    blink: false,
    faceBox: box,
    eyeBoxes: [
      { x0: 0.35, y0: 0.35, x1: 0.47, y1: 0.45 },
      { x0: 0.53, y0: 0.35, x1: 0.65, y1: 0.45 },
    ],
    ipdPx: 128,
  };
}
