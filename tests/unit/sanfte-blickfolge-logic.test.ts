import { describe, expect, it } from 'vitest';
import { PursuitExercise } from '../../src/exercises/_shared/pursuit';
import { MAX_TRACK_WIDTH, span, type Bounds } from '../../src/exercises/_shared/pursuit-logic';
import {
  FULL_SPEED_RADIUS_U,
  LISSAJOUS_A,
  LISSAJOUS_B,
  LissajousTrack,
  lissajousHalfSize,
  lissajousPoint,
  MIN_SPEED_FACTOR,
  speedFactorForRadius,
  speedFor,
} from '../../src/exercises/sanfte-blickfolge/logic';
import { simulate } from './_pursuit-sim';

const AREA: Bounds = span(60, 1134, 60, 640);
const W = 1194;

function make(area = AREA, w = W): LissajousTrack {
  const tr = new LissajousTrack();
  tr.layout(area, w, 8);
  tr.begin(0.3, 1);
  return tr;
}

function run(track: LissajousTrack, dtFor: (i: number) => number, seconds: number, speed: number) {
  const out: { x: number; y: number }[] = [];
  let t = 0;
  let i = 0;
  while (t < seconds - 1e-9) {
    const dt = Math.min(dtFor(i++), seconds - t);
    track.step(dt, speed);
    t += dt;
    out.push({ ...track.pos });
  }
  return out;
}

describe('sanfte-blickfolge: Stufen', () => {
  it('Tempo steigt stufenweise: innerhalb einer ganzen Stufe gleich, dann höher', () => {
    expect(speedFor(1)).toBeCloseTo(22, 9);
    expect(speedFor(1.9)).toBe(speedFor(1));
    expect(speedFor(2)).toBeGreaterThan(speedFor(1));
    for (let l = 2; l <= 20; l++) expect(speedFor(l)).toBeGreaterThan(speedFor(l - 1));
    // ≈ 5°/s bis ≈ 24°/s (1 u/s ≈ 0,23°/s auf dem Tablet)
    expect(speedFor(1) * 0.23).toBeGreaterThan(4);
    expect(speedFor(1) * 0.23).toBeLessThan(6);
    expect(speedFor(20) * 0.23).toBeLessThan(26);
  });

  it('Figur 2 : 3, geschlossen', () => {
    expect([LISSAJOUS_A, LISSAJOUS_B]).toEqual([2, 3]);
    const p0 = lissajousPoint(0);
    const p1 = lissajousPoint(2 * Math.PI);
    expect(Math.hypot(p0.x - p1.x, p0.y - p1.y)).toBeLessThan(1e-9);
  });
});

describe('LissajousTrack', () => {
  it('bleibt im Feld und höchstens 60 % der Bühnenbreite breit', () => {
    const tr = make();
    const pts = run(tr, () => 1 / 60, 90, 400);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
    }
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
    // füllt die Bahn wirklich aus
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.9 * MAX_TRACK_WIDTH * W);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(0.9 * (AREA.maxY - AREA.minY));
  });

  it('passt sich kleinen Feldern an (Hochformat)', () => {
    const small = span(30, 330, 40, 500);
    const { a } = lissajousHalfSize(small, 360);
    expect(2 * a).toBeLessThanOrEqual(0.6 * 360 + 1e-9);
    const tr = make(small, 360);
    for (const p of run(tr, () => 1 / 60, 60, 150)) {
      expect(p.x).toBeGreaterThanOrEqual(small.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(small.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(small.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(small.maxY + 1e-6);
    }
  });

  it('Tempofaktor: 1 bei weiten Bögen, (r/r₀)^(1/3) bei engen, nie unter 0,55', () => {
    expect(speedFactorForRadius(1000, 100)).toBe(1);
    expect(speedFactorForRadius(100, 100)).toBe(1);
    expect(speedFactorForRadius(30, 100)).toBeCloseTo(Math.cbrt(0.3), 9);
    expect(speedFactorForRadius(12.5, 100)).toBe(MIN_SPEED_FACTOR);
    expect(speedFactorForRadius(50, 100)).toBeCloseTo(Math.cbrt(0.5), 9);
    expect(speedFactorForRadius(0.001, 100)).toBe(MIN_SPEED_FACTOR);
    expect(FULL_SPEED_RADIUS_U).toBeGreaterThan(0);
  });

  it('Tempo: volles Tempo auf weiten Stücken, nur in den engsten Bögen leicht gebremst', () => {
    for (const [area, w, u] of [
      [AREA, W, 8.3],
      [span(30, 330, 40, 500), 360, 3.6],
    ] as const) {
      const tr = new LissajousTrack();
      tr.layout(area, w, u);
      tr.begin(0, 1);
      let n = 0;
      let fast = 0;
      let min = 1;
      for (let i = 0; i < 60 * 120; i++) {
        tr.step(1 / 60, 150);
        const c = tr.cruise();
        n++;
        if (c >= 0.85) fast++;
        min = Math.min(min, c);
        expect(c).toBeGreaterThanOrEqual(MIN_SPEED_FACTOR - 1e-9);
        expect(c).toBeLessThanOrEqual(1 + 1e-9);
      }
      expect(min).toBeLessThan(0.9);
      expect(fast / n).toBeGreaterThan(0.6);
    }
  });

  it('Weg je Bild = Tempo × Faktor, bildratenunabhängig', () => {
    const v = 250;
    const a = run(make(), () => 1 / 60, 20, v);
    const b = run(make(), () => 1 / 120, 20, v);
    const c = run(make(), (i) => (i % 2 ? 1 / 30 : 1 / 90), 20, v);
    const ea = a[a.length - 1];
    for (const e of [b[b.length - 1], c[c.length - 1]]) expect(Math.hypot(e.x - ea.x, e.y - ea.y)).toBeLessThan(2);
    const dt = 1 / 60;
    let prev = a[0];
    for (let i = 1; i < a.length; i++) {
      const d = Math.hypot(a[i].x - prev.x, a[i].y - prev.y);
      expect(d).toBeGreaterThan(v * dt * MIN_SPEED_FACTOR * 0.95);
      expect(d).toBeLessThan(v * dt * 1.001);
      prev = a[i];
    }
  });

  it('kein harter Knick: Richtung ändert sich von Bild zu Bild nur wenig', () => {
    const pts = run(make(), () => 1 / 240, 20, 300);
    let maxTurn = 0;
    for (let i = 2; i < pts.length; i++) {
      const a1 = Math.atan2(pts[i - 1].y - pts[i - 2].y, pts[i - 1].x - pts[i - 2].x);
      const a2 = Math.atan2(pts[i].y - pts[i - 1].y, pts[i].x - pts[i - 1].x);
      let da = Math.abs(a2 - a1);
      if (da > Math.PI) da = 2 * Math.PI - da;
      maxTurn = Math.max(maxTurn, da);
    }
    expect(maxTurn).toBeLessThan(0.12);
    // und die Bahn hat nirgends eine Umkehr (keine entartete Figur)
    expect(maxTurn).toBeGreaterThan(0.001);
  });

  it('läuft beide Richtungen und kehrt nie um', () => {
    const fwd = make();
    const back = new LissajousTrack();
    back.layout(AREA, W, 8);
    back.begin(0.3, -1);
    fwd.step(1, 100);
    back.step(1, 100);
    expect(Math.hypot(fwd.pos.x - back.pos.x, fwd.pos.y - back.pos.y)).toBeGreaterThan(50);
    expect(fwd.cruise()).toBe(1);
    expect((fwd as { safeFor?: unknown }).safeFor).toBeUndefined();
  });
});

describe('sanfte-blickfolge: Kern mit Autoplay', () => {
  for (const [name, w, h] of [
    ['Tablet quer', 1194, 834],
    ['Handy hoch', 390, 844],
  ] as const) {
    it(`${name}: Sitzung endet mit Ergebnis`, () => {
      const r = simulate((ctx) => new PursuitExercise(ctx, { track: new LissajousTrack(), speedFor, demoLevel: 3 }), { w, h, startLevel: 5 });
      expect(r.result).not.toBeNull();
      expect(r.shows).toBeGreaterThanOrEqual(18);
      expect(Number.isInteger(r.result!.primary.value)).toBe(true);
      expect(r.result!.secondary.length).toBeGreaterThanOrEqual(2);
    });
  }

  it('Intro-Film: 8–14 s und endet mit finish', () => {
    const r = simulate((ctx) => new PursuitExercise(ctx, { track: new LissajousTrack(), speedFor, demoLevel: 3 }), { w: 880, h: 606, mode: 'demo' });
    expect(r.result).not.toBeNull();
    expect(r.seconds).toBeGreaterThan(8);
    expect(r.seconds).toBeLessThan(14);
  });
});
