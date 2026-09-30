import { describe, expect, it } from 'vitest';
import {
  ArcTable,
  exposureFor,
  guideAlpha,
  MAX_TRACK_WIDTH,
  pickDirection,
  pingPong01,
  pingPongCycle,
  PURSUIT_MAX_LEVEL,
  PURSUIT_MIN_LEVEL,
  signSizeFor,
  span,
  type Bounds,
  type PursuitTrack,
} from '../../src/exercises/_shared/pursuit-logic';
import { createRng } from '../../src/core/rng';
import { LemniscateTrack, speedFor as speedAcht, lemniscateHalfWidth } from '../../src/exercises/liegende-acht/logic';
import { WaveTrack, speedFor as speedWelle } from '../../src/exercises/wellenbahn/logic';

const AREA: Bounds = span(60, 1134, 60, 640);
const W = 1194;

function run(track: PursuitTrack, dtFor: (i: number) => number, seconds: number, speed: number): { x: number; y: number }[] {
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

describe('Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    expect(exposureFor(20)).toBeLessThan(exposureFor(1));
    expect(exposureFor(20)).toBeGreaterThanOrEqual(240);
    expect(signSizeFor(20, 8)).toBeLessThanOrEqual(signSizeFor(1, 8));
    expect(signSizeFor(1, 100)).toBeLessThanOrEqual(56);
    expect(signSizeFor(20, 1)).toBeGreaterThanOrEqual(30);
    expect(speedAcht(10)).toBeGreaterThan(speedAcht(1));
    expect(speedWelle(10)).toBeGreaterThan(speedWelle(1));
    expect(guideAlpha(1)).toBeGreaterThan(guideAlpha(8));
    expect(guideAlpha(PURSUIT_MAX_LEVEL)).toBe(0);
    expect(PURSUIT_MIN_LEVEL).toBe(1);
  });

  it('pickDirection wählt nie dreimal dieselbe Richtung', () => {
    const rng = createRng(3);
    const hist: number[] = [];
    for (let i = 0; i < 400; i++) hist.push(pickDirection(rng, hist));
    for (let i = 2; i < hist.length; i++) expect(hist[i] === hist[i - 1] && hist[i] === hist[i - 2]).toBe(false);
  });
});

describe('ArcTable / pingPong01', () => {
  it('liefert Punkte nach Bogenlänge', () => {
    const t = new ArcTable([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }], false);
    expect(t.length).toBeCloseTo(20);
    expect(t.at(5)).toEqual({ x: 5, y: 0 });
    expect(t.at(15)).toEqual({ x: 10, y: 5 });
    expect(t.at(99)).toEqual({ x: 10, y: 10 });
    const c = new ArcTable([{ x: 0, y: 0 }, { x: 10, y: 0 }], true);
    expect(c.length).toBeCloseTo(20);
    expect(c.at(25).x).toBeCloseTo(5);
  });

  it('pingPong01: stetig, in [0,1], Tempo 1 in der Mitte und 0 an den Enden', () => {
    const e = 0.08;
    let prev = pingPong01(0, e).pos;
    let max = 0;
    for (let i = 1; i <= 4000; i++) {
      const p = pingPong01(i / 4000, e);
      expect(p.pos).toBeGreaterThanOrEqual(0);
      expect(p.pos).toBeLessThanOrEqual(1);
      max = Math.max(max, Math.abs(p.pos - prev));
      prev = p.pos;
    }
    expect(max).toBeLessThan(0.002);
    expect(pingPong01(0, e).speed).toBe(0);
    expect(pingPong01(0.25, e).speed).toBe(1);
    expect(pingPong01(0.5 * (1 + 0) , e).pos).toBeGreaterThan(0.9);
    expect(pingPongCycle(100, e)).toBeCloseTo(2 * 1.08 * 100);
  });
});

describe('LemniscateTrack (Liegende Acht)', () => {
  const make = () => {
    const tr = new LemniscateTrack();
    tr.layout(AREA, W, 8);
    tr.begin(0.3, 1);
    return tr;
  };

  it('bleibt im Feld und höchstens 60 % der Bühnenbreite breit', () => {
    const tr = make();
    const pts = run(tr, () => 1 / 60, 40, 300);
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
    }
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(Math.max(...xs) - Math.min(...xs));
  });

  it('passt sich kleinen Feldern an (Hochformat)', () => {
    const small = span(30, 330, 40, 400);
    const a = lemniscateHalfWidth(small, 360);
    expect(2 * a).toBeLessThanOrEqual(0.6 * 360 + 1e-9);
    const tr = new LemniscateTrack();
    tr.layout(small, 360, 3.6);
    tr.begin(0.1, -1);
    for (const p of run(tr, () => 1 / 60, 20, 200)) {
      expect(p.x).toBeGreaterThanOrEqual(small.minX - 1e-6);
      expect(p.x).toBeLessThanOrEqual(small.maxX + 1e-6);
      expect(p.y).toBeGreaterThanOrEqual(small.minY - 1e-6);
      expect(p.y).toBeLessThanOrEqual(small.maxY + 1e-6);
    }
  });

  it('ist bildratenunabhängig und läuft mit gleichmäßigem Tempo', () => {
    const v = 250;
    const a = run(make(), () => 1 / 60, 10, v);
    const b = run(make(), () => 1 / 120, 10, v);
    const c = run(make(), (i) => (i % 2 ? 1 / 30 : 1 / 90), 10, v);
    const ea = a[a.length - 1];
    for (const e of [b[b.length - 1], c[c.length - 1]]) {
      expect(Math.hypot(e.x - ea.x, e.y - ea.y)).toBeLessThan(0.5);
    }
    // gleichmäßiges Tempo: Weg je Schritt ≈ v·dt (Sehnenlänge minus Krümmungsverlust, klein)
    const dt = 1 / 60;
    let prev = a[0];
    for (let i = 1; i < a.length; i++) {
      const d = Math.hypot(a[i].x - prev.x, a[i].y - prev.y);
      expect(d).toBeGreaterThan(v * dt * 0.97);
      expect(d).toBeLessThan(v * dt * 1.001);
      prev = a[i];
    }
  });
});

describe('WaveTrack (Wellenbahn)', () => {
  const make = (level: number) => {
    const tr = new WaveTrack();
    tr.setLevel(level);
    tr.layout(AREA, W, 8);
    tr.begin(0.4, 1);
    return tr;
  };

  it('bleibt im Feld und höchstens 60 % breit – auf allen Stufen', () => {
    for (const level of [1, 7, 14, 20]) {
      const tr = make(level);
      const pts = run(tr, () => 1 / 60, 60, speedWelle(level) * 8);
      for (const p of pts) {
        expect(p.x).toBeGreaterThanOrEqual(AREA.minX - 1e-6);
        expect(p.x).toBeLessThanOrEqual(AREA.maxX + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(AREA.minY - 1e-6);
        expect(p.y).toBeLessThanOrEqual(AREA.maxY + 1e-6);
      }
      const xs = pts.map((p) => p.x);
      expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(MAX_TRACK_WIDTH * W + 1);
      // läuft wirklich von Ende zu Ende und zurück
      expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.5 * MAX_TRACK_WIDTH * W);
    }
  });

  it('Amplitude und Wellenzahl steigen mit der Stufe', () => {
    const range = (level: number) => {
      const tr = make(level);
      const ys = run(tr, () => 1 / 60, 40, 200).map((p) => p.y);
      return Math.max(...ys) - Math.min(...ys);
    };
    expect(range(20)).toBeGreaterThan(range(1));
  });

  it('ist bildratenunabhängig, auch beim weichen Stufenwechsel', () => {
    const go = (dtFor: (i: number) => number) => {
      const tr = make(3);
      const pts: { x: number; y: number }[] = [];
      let t = 0;
      let i = 0;
      while (t < 12 - 1e-9) {
        if (t >= 4 && t - 1 / 60 < 4) tr.setLevel(12);
        const dt = dtFor(i++);
        tr.step(dt, 180);
        t += dt;
        pts.push({ ...tr.pos });
      }
      return pts[pts.length - 1];
    };
    const a = go(() => 1 / 60);
    const b = go(() => 1 / 120);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeLessThan(3);
  });

  it('springt beim Stufenwechsel nicht', () => {
    const tr = make(2);
    run(tr, () => 1 / 60, 5, 150);
    const before = { ...tr.pos };
    tr.setLevel(15);
    tr.step(1 / 60, 150);
    expect(Math.hypot(tr.pos.x - before.x, tr.pos.y - before.y)).toBeLessThan(150 / 60 + 2);
  });

  it('bremst an den Enden weich (cruise < 1) und läuft sonst mit vollem Tempo', () => {
    const tr = make(5);
    let slow = 0;
    let full = 0;
    for (let i = 0; i < 60 * 60; i++) {
      tr.step(1 / 60, 150);
      if (tr.cruise() < 0.85) slow++;
      else full++;
    }
    expect(slow).toBeGreaterThan(0);
    expect(full).toBeGreaterThan(slow * 3);
  });
});
