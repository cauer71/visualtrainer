// EYE-EXPERIMENT: Merkmale aus synthetischen Landmarks (bekannte Geometrie → bekannte Werte).
import { describe, expect, it } from 'vitest';
import { estimateDistanceCm, extractFeatures, FEATURE_NAMES, featureIndex, headPoseFromMatrix, LANDMARK_COUNT, LM } from '../../src/eye/features';
import type { Landmark } from '../../src/eye/types';

const IMG = { w: 640, h: 480 };

interface FaceSpec {
  /** Irisversatz in Pixeln gegenüber der Augenmitte (Bild-x nach rechts, Bild-y nach unten) */
  dx?: number;
  dy?: number;
  /** halbe Lidspalte in Pixeln */
  halfOpen?: number;
  irisR?: number;
}

/** Baut ein Gesicht mit zwei 40-px-breiten Augen im Abstand von 100 px (Augenmitten bei (270,220) und (370,220)). */
function makeFace(s: FaceSpec = {}): Landmark[] {
  const { dx = 0, dy = 0, halfOpen = 5.5, irisR = 5.85 } = s;
  const lm: Landmark[] = Array.from({ length: LANDMARK_COUNT }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  const set = (i: number, x: number, y: number) => (lm[i] = { x: x / IMG.w, y: y / IMG.h, z: 0 });
  const eye = (cx: number, g: (typeof LM)['eyeA'] | (typeof LM)['eyeB']) => {
    set(g.left, cx - 20, 220);
    set(g.right, cx + 20, 220);
    set(g.upper, cx, 220 - halfOpen);
    set(g.lower, cx, 220 + halfOpen);
    const ix = cx + dx;
    const iy = 220 + dy;
    set(g.iris, ix, iy);
    set(g.ring[0], ix - irisR, iy);
    set(g.ring[1], ix, iy - irisR);
    set(g.ring[2], ix + irisR, iy);
    set(g.ring[3], ix, iy + irisR);
  };
  eye(270, LM.eyeA);
  eye(370, LM.eyeB);
  return lm;
}

const idx = (n: (typeof FEATURE_NAMES)[number]) => featureIndex(n);

/** Spaltenweise 4×4-Matrix aus Rotation (3×3, zeilenweise gegeben) und Translation. */
function colMajor(R: number[][], t: [number, number, number], scale = 1): number[] {
  const d = new Array<number>(16).fill(0);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) d[c * 4 + r] = R[r][c] * scale;
  d[12] = t[0];
  d[13] = t[1];
  d[14] = t[2];
  d[15] = 1;
  return d;
}
const rad = (d: number) => (d * Math.PI) / 180;
const Ry = (a: number) => [
  [Math.cos(a), 0, Math.sin(a)],
  [0, 1, 0],
  [-Math.sin(a), 0, Math.cos(a)],
];
const Rx = (a: number) => [
  [1, 0, 0],
  [0, Math.cos(a), -Math.sin(a)],
  [0, Math.sin(a), Math.cos(a)],
];
const Rz = (a: number) => [
  [Math.cos(a), -Math.sin(a), 0],
  [Math.sin(a), Math.cos(a), 0],
  [0, 0, 1],
];

describe('Merkmale aus Landmarks', () => {
  it('Iris in der Augenmitte → h = v = 0; Lidspalte und Augenabstand stimmen', () => {
    const m = extractFeatures(makeFace(), null, IMG)!;
    expect(m.features[idx('hAvg')]).toBeCloseTo(0, 6);
    expect(m.features[idx('vAvg')]).toBeCloseTo(0, 6);
    expect(m.eyeOpen).toBeCloseTo(11 / 40, 6);
    expect(m.ipdPx).toBeCloseTo(100, 6);
    expect(m.features[idx('faceX')]).toBeCloseTo(320 / 640, 6);
    expect(m.features[idx('faceY')]).toBeCloseTo(220 / 480, 6);
    expect(m.features[idx('scale')]).toBeCloseTo(100 / 640, 6);
    expect(m.blink).toBe(false);
    expect(m.hasPose).toBe(false);
  });

  it('Irisversatz in Augenbreiten: 4 px nach rechts = +0,1; 2 px nach oben = +0,05', () => {
    const m = extractFeatures(makeFace({ dx: 4, dy: -2 }), null, IMG)!;
    expect(m.features[idx('hAvg')]).toBeCloseTo(0.1, 6);
    expect(m.features[idx('vAvg')]).toBeCloseTo(0.05, 6);
    const n = extractFeatures(makeFace({ dx: -4, dy: 2 }), null, IMG)!;
    expect(n.features[idx('hAvg')]).toBeCloseTo(-0.1, 6);
    expect(n.features[idx('vAvg')]).toBeCloseTo(-0.05, 6);
  });

  it('ist unabhängig vom Seitenverhältnis des Bildes (Pixelgeometrie statt normierter Koordinaten)', () => {
    const lm = makeFace({ dx: 4, dy: -2 });
    const a = extractFeatures(lm, null, IMG)!;
    // gleiches Gesicht in einem doppelt so breiten Bild: x-Koordinaten halbieren, Pixel bleiben gleich
    const wide = { w: 1280, h: 480 };
    const lm2 = lm.map((p) => ({ ...p, x: (p.x * IMG.w) / wide.w }));
    const b = extractFeatures(lm2, null, wide)!;
    expect(b.features[idx('hAvg')]).toBeCloseTo(a.features[idx('hAvg')], 6);
    expect(b.features[idx('vAvg')]).toBeCloseTo(a.features[idx('vAvg')], 6);
  });

  it('Lidschlag wird erkannt, wenn beide Augen fast geschlossen sind', () => {
    expect(extractFeatures(makeFace({ halfOpen: 0.4 }), null, IMG)!.blink).toBe(true);
    expect(extractFeatures(makeFace({ halfOpen: 3 }), null, IMG)!.blink).toBe(false); // 6/40 = 0,15 offen
  });

  it('zu wenige Landmarks → null', () => {
    expect(extractFeatures(makeFace().slice(0, 400), null, IMG)).toBeNull();
  });

  it('Abstand aus dem Irisdurchmesser: 11,7 px bei 640 px Breite und 65° ≈ 50 cm, halber Durchmesser = doppelter Abstand', () => {
    const d = estimateDistanceCm(11.7, 640)!;
    const f = 320 / Math.tan(rad(32.5));
    expect(d).toBeCloseTo(f / 10, 6);
    expect(estimateDistanceCm(5.85, 640)!).toBeCloseTo(2 * d, 6);
    expect(estimateDistanceCm(0, 640)).toBeNull();
    const m = extractFeatures(makeFace({ irisR: 5.85 }), null, IMG)!;
    expect(m.distanceCm).toBeCloseTo(d, 3);
  });
});

describe('Kopfhaltung aus der Transformationsmatrix', () => {
  it('Gierwinkel (yaw), Nickwinkel (pitch), Rollwinkel werden zurückgewonnen', () => {
    const yaw = headPoseFromMatrix(colMajor(Ry(rad(20)), [1, 2, -40]))!;
    expect(yaw.yaw).toBeCloseTo(20, 4);
    expect(yaw.pitch).toBeCloseTo(0, 4);
    expect(yaw.roll).toBeCloseTo(0, 4);
    const pitch = headPoseFromMatrix(colMajor(Rx(rad(-15)), [0, 0, -40]))!;
    expect(pitch.pitch).toBeCloseTo(15, 4);
    expect(pitch.yaw).toBeCloseTo(0, 4);
    const roll = headPoseFromMatrix(colMajor(Rz(rad(10)), [0, 0, -40]))!;
    expect(roll.roll).toBeCloseTo(10, 4);
    expect(roll.yaw).toBeCloseTo(0, 4);
  });

  it('Translation wird mitgeliefert; Skalierung der Matrix stört die Winkel nicht', () => {
    const p = headPoseFromMatrix(colMajor(Ry(rad(-12)), [1, 2, -42], 1.3))!;
    expect(p.yaw).toBeCloseTo(-12, 4);
    expect([p.tx, p.ty, p.tz]).toEqual([1, 2, -42]);
  });

  it('erkennt zeilenweise Ablage (Translation in der letzten Spalte)', () => {
    const R = Ry(rad(20));
    const row = [...R[0], 1, ...R[1], 2, ...R[2], -40, 0, 0, 0, 1];
    const p = headPoseFromMatrix(row)!;
    expect(p.yaw).toBeCloseTo(20, 4);
    expect([p.tx, p.ty, p.tz]).toEqual([1, 2, -40]);
  });

  it('ungültige Matrix → null', () => {
    expect(headPoseFromMatrix([1, 2, 3])).toBeNull();
    expect(headPoseFromMatrix(new Array(16).fill(NaN))).toBeNull();
  });

  it('fließt in den Merkmalsvektor und die Abstandsangabe ein', () => {
    const m = extractFeatures(makeFace(), colMajor(Ry(rad(8)), [0, 0, -45]), IMG)!;
    expect(m.hasPose).toBe(true);
    expect(m.yawDeg).toBeCloseTo(8, 4);
    expect(m.features[idx('yaw')]).toBeCloseTo(8, 4);
    expect(m.matrixDistanceCm).toBe(45);
  });
});
