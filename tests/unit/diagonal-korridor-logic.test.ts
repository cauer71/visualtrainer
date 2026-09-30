import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  BALL_R_U,
  clampToDiag,
  type Corner,
  freeHalfWidthU,
  lengthFractionFor,
  levelOf,
  makeDiag,
  MAX_LEVEL,
  MIN_LEVEL,
  moveAlong,
  nextCorner,
  pointAt,
  project,
  SpeedLog,
  widthUFor,
} from '../../src/exercises/diagonal-korridor/logic';

const R = { x0: 100, y0: 100, x1: 1100, y1: 700 };
const PU = 8;

describe('diagonal-korridor: Stufenfunktionen', () => {
  it('Gang wird schmaler und länger', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(widthUFor(l)).toBeLessThan(widthUFor(l - 1));
      expect(lengthFractionFor(l)).toBeGreaterThanOrEqual(lengthFractionFor(l - 1));
      expect(freeHalfWidthU(l)).toBeLessThanOrEqual(freeHalfWidthU(l - 1));
    }
  });

  it('Bereiche: Breite 14 → ≈ 6,3 u, Länge 55 % → höchstens 100 %, freier Rest bleibt > 0', () => {
    expect(widthUFor(MIN_LEVEL)).toBeCloseTo(14);
    expect(widthUFor(MAX_LEVEL)).toBeGreaterThan(6);
    expect(lengthFractionFor(MIN_LEVEL)).toBeCloseTo(0.55);
    expect(lengthFractionFor(MAX_LEVEL)).toBeLessThanOrEqual(1);
    expect(freeHalfWidthU(MAX_LEVEL)).toBeGreaterThan(BALL_R_U * 0.8);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(-1)).toBe(MIN_LEVEL);
    expect(widthUFor(99)).toBeCloseTo(widthUFor(MAX_LEVEL));
  });
});

describe('diagonal-korridor: Geometrie', () => {
  it('Gang verbindet gegenüberliegende Ecken, symmetrisch zur Mitte', () => {
    const cx = (R.x0 + R.x1) / 2;
    const cy = (R.y0 + R.y1) / 2;
    for (const c of [0, 1, 2, 3] as Corner[]) {
      const d = makeDiag(R, c, MAX_LEVEL, PU, BALL_R_U * PU);
      expect((d.ax + d.bx) / 2).toBeCloseTo(cx, 6);
      expect((d.ay + d.by) / 2).toBeCloseTo(cy, 6);
      expect(Math.hypot(d.ux, d.uy)).toBeCloseTo(1, 9);
      expect(d.ux * d.nx + d.uy * d.ny).toBeCloseTo(0, 9);
      // Start und Ziel liegen in gegenüberliegenden Viertelfeldern
      expect(Math.sign(d.ax - cx)).toBe(-Math.sign(d.bx - cx));
      expect(Math.sign(d.ay - cy)).toBe(-Math.sign(d.by - cy));
    }
  });

  it('Startecken: links oben, rechts unten, rechts oben, links unten', () => {
    const d0 = makeDiag(R, 0, MAX_LEVEL, PU, 10);
    expect(d0.ax).toBeLessThan(d0.bx);
    expect(d0.ay).toBeLessThan(d0.by);
    const d1 = makeDiag(R, 1, MAX_LEVEL, PU, 10);
    expect(d1.ax).toBeGreaterThan(d1.bx);
    expect(d1.ay).toBeGreaterThan(d1.by);
    const d2 = makeDiag(R, 2, MAX_LEVEL, PU, 10);
    expect(d2.ax).toBeGreaterThan(d2.bx);
    expect(d2.ay).toBeLessThan(d2.by);
    const d3 = makeDiag(R, 3, MAX_LEVEL, PU, 10);
    expect(d3.ax).toBeLessThan(d3.bx);
    expect(d3.ay).toBeGreaterThan(d3.by);
  });

  it('Länge wächst mit der Stufe und liegt im Feld', () => {
    const a = makeDiag(R, 0, 1, PU, 10);
    const b = makeDiag(R, 0, MAX_LEVEL, PU, 10);
    expect(b.len).toBeGreaterThan(a.len);
    const full = Math.hypot(R.x1 - R.x0, R.y1 - R.y0);
    expect(b.len).toBeLessThanOrEqual(full + 1e-6);
    expect(a.len).toBeCloseTo(full * lengthFractionFor(1), 6);
  });

  it('Projektion und Rückrechnung stimmen', () => {
    const d = makeDiag(R, 2, 5, PU, 10);
    const p = pointAt(d, 300, -7);
    const q = project(d, p.x, p.y);
    expect(q.s).toBeCloseTo(300, 6);
    expect(q.d).toBeCloseTo(-7, 6);
  });

  it('funktioniert auch im Hochformat (steile Diagonale)', () => {
    const tall = { x0: 50, y0: 100, x1: 350, y1: 900 };
    const d = makeDiag(tall, 0, 3, PU, 10);
    const mid = pointAt(d, d.len / 2, 0);
    expect(mid.x).toBeCloseTo(200, 6);
    expect(mid.y).toBeCloseTo(500, 6);
    const r = clampToDiag(d, mid.x, mid.y + 200);
    // senkrecht zur steilen Bahn verschoben → Wandberührung, aber weiterhin im Feld
    expect(r.contact).toBe(true);
    expect(Math.abs(r.d)).toBeCloseTo(d.free, 6);
  });
});

describe('diagonal-korridor: Wand', () => {
  const d = makeDiag(R, 0, 4, PU, BALL_R_U * PU);

  it('in der Mitte kein Kontakt, außerhalb des freien Bereichs Kontakt und Begrenzung', () => {
    const c = pointAt(d, 400, 0);
    expect(clampToDiag(d, c.x, c.y).contact).toBe(false);
    const inside = pointAt(d, 400, d.free * 0.9);
    expect(clampToDiag(d, inside.x, inside.y).contact).toBe(false);
    const out = pointAt(d, 400, d.free + 20);
    const r = clampToDiag(d, out.x, out.y);
    expect(r.contact).toBe(true);
    expect(Math.abs(r.d)).toBeCloseTo(d.free, 6);
    expect(r.s).toBeCloseTo(400, 6);
  });

  it('Längskoordinate wird auf [0, Länge] begrenzt', () => {
    const before = pointAt(d, -50, 0);
    expect(clampToDiag(d, before.x, before.y).s).toBe(0);
    const after = pointAt(d, d.len + 50, 0);
    expect(clampToDiag(d, after.x, after.y).s).toBeCloseTo(d.len, 6);
  });

  it('schneller Zug quer durch die Wand wird erkannt (kein Überspringen)', () => {
    const a = pointAt(d, 300, 0);
    // Start und Ende im Gang, ohne Kontakt dazwischen
    const from = pointAt(d, 300, d.free * 0.5);
    const to = pointAt(d, 320, -d.free * 0.5);
    const mid = moveAlong(d, from, to, 2);
    expect(mid.contact).toBe(false);
    // Zug über den Rand hinaus und zurück: Zwischenpunkte außen → Kontakt, Ergebnis im freien Bereich
    const far = pointAt(d, 310, 4 * d.width);
    const r1 = moveAlong(d, a, far, 3);
    expect(r1.contact).toBe(true);
    const r2 = moveAlong(d, far, pointAt(d, 330, 0), 3);
    expect(r2.contact).toBe(true);
    expect(r2.d).toBeCloseTo(0, 6);
  });

  it('ruhiger Zug entlang der Mitte bleibt ohne Kontakt', () => {
    let last = pointAt(d, 0, 0);
    for (let s = 5; s <= d.len; s += 5) {
      const to = pointAt(d, s, 0.3 * d.free * Math.sin(s / 40));
      const r = moveAlong(d, last, to, 3);
      expect(r.contact).toBe(false);
      last = to;
    }
  });
});

describe('diagonal-korridor: Startecken', () => {
  it('nächste Ecke ist immer eine andere', () => {
    const rng = createRng(2);
    let prev: Corner | null = null;
    const seen = new Set<number>();
    for (let i = 0; i < 300; i++) {
      const c = nextCorner(rng, prev);
      if (prev !== null) expect(c).not.toBe(prev);
      seen.add(c);
      prev = c;
    }
    expect(seen.size).toBe(4);
  });
});

describe('diagonal-korridor: Tempo-Protokoll', () => {
  it('gleichmäßiges Ziehen ergibt hohe Gleichmäßigkeit', () => {
    const log = new SpeedLog();
    let s = 0;
    for (let i = 0; i < 200; i++) {
      s += 120 * 0.016;
      log.add(0.016, s);
    }
    expect(log.meanSpeed).toBeGreaterThan(100);
    expect(log.meanSpeed).toBeLessThan(140);
    expect(log.evenness).toBeGreaterThan(90);
    expect(log.active).toBeCloseTo(3.2, 6);
  });

  it('Stop-und-Los ergibt niedrigere Gleichmäßigkeit', () => {
    const log = new SpeedLog();
    let s = 0;
    for (let i = 0; i < 300; i++) {
      const moving = Math.floor(i / 20) % 2 === 0;
      if (moving) s += 300 * 0.016;
      log.add(0.016, s);
    }
    expect(log.evenness).toBeLessThan(60);
  });

  it('zu wenig Daten: 100, Stillstand: 0', () => {
    expect(new SpeedLog().evenness).toBe(100);
    const log = new SpeedLog();
    for (let i = 0; i < 100; i++) log.add(0.016, 0);
    expect(log.evenness).toBe(0);
  });

  it('Tempo ist unabhängig von der Bildrate (60 vs. 144 Hz)', () => {
    const run = (dt: number): number => {
      const log = new SpeedLog();
      let s = 0;
      for (let t = 0; t < 4; t += dt) {
        s += 150 * dt;
        log.add(dt, s);
      }
      return log.meanSpeed;
    };
    expect(Math.abs(run(1 / 60) - run(1 / 144))).toBeLessThan(10);
  });
});
