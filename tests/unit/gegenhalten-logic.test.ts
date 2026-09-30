import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { gegenhalten } from '../../src/exercises/gegenhalten';
import { DriftRule, driftFor, makeRule, RETURN_S } from '../../src/exercises/gegenhalten/logic';
import { science } from '../../src/exercises/gegenhalten/science';
import { MAX_LEVEL, MIN_LEVEL } from '../../src/exercises/_shared/nachfuehren-logic';
import { checkNachfuehrenExercise } from './_nachfuehren-checks';

describe('gegenhalten: Stufenfunktionen', () => {
  it('Zughöhe, Tempo und Schwankung steigen, die Zugdauer sinkt', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      const a = driftFor(l - 1);
      const b = driftFor(l);
      expect(b.height).toBeGreaterThan(a.height);
      expect(b.speed).toBeGreaterThan(a.speed);
      expect(b.wobble).toBeGreaterThan(a.wobble);
      expect(b.pullS).toBeLessThan(a.pullS);
    }
    expect(driftFor(0)).toEqual(driftFor(MIN_LEVEL));
    expect(driftFor(99)).toEqual(driftFor(MAX_LEVEL));
    expect(driftFor(1).speed).toBeLessThan(2.5);
    expect(driftFor(MAX_LEVEL).speed).toBeLessThan(9);
  });
});

describe('gegenhalten: Regel', () => {
  const setup = (level: number, seed = 1, hh = 32) => ({ level, rng: createRng(seed), hw: 55, hh, seconds: 11, demo: false });

  it('Ziel steht still, Störung beginnt bei 0 und wirkt nur senkrecht nach oben (plus Schwankung)', () => {
    const r = makeRule(setup(6));
    expect(r.target(0)).toEqual({ x: 0, y: 0 });
    expect(r.target(7)).toEqual({ x: 0, y: 0 });
    expect(r.disturbance!(0).x).toBe(0);
    expect(r.disturbance!(0).y).toBeCloseTo(0, 9);
    let up = 0;
    let down = 0;
    for (let s = 0; s <= 11; s += 0.05) {
      const d = r.disturbance!(s);
      expect(d.x).toBe(0);
      if (d.y < -1) up++;
      if (d.y > 1) down++;
    }
    expect(up).toBeGreaterThan(50);
    expect(down).toBe(0);
  });

  it('gleichmäßig und stetig: Änderung je 1/120 s klein, Tempo unter 30 u/s auf allen Stufen', () => {
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
      const r = makeRule(setup(l, l));
      let prev = r.disturbance!(0).y;
      let worst = 0;
      for (let s = 1 / 120; s <= 11; s += 1 / 120) {
        const y = r.disturbance!(s).y;
        worst = Math.max(worst, Math.abs(y - prev) * 120);
        prev = y;
      }
      expect(worst).toBeLessThan(30);
    }
  });

  it('größte Auslenkung bleibt im Feld (auch bei niedrigem Feld)', () => {
    for (const hh of [32, 14, 8]) {
      for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
        const r = makeRule(setup(l, 3, hh));
        let peak = 0;
        for (let s = 0; s <= 11; s += 0.05) peak = Math.max(peak, Math.abs(r.disturbance!(s).y));
        expect(peak).toBeLessThan(Math.max(3, hh * 0.6) * 1.2 + 0.5 + hh * 0.05);
        expect(peak).toBeLessThan(hh + 1);
      }
    }
  });

  it('Zug in Stufe 1 ≈ 2 u/s: nach einer Sekunde Zug ist die Marke ≈ 1–2 u gewandert', () => {
    const r = new DriftRule(createRng(2), 1, 32, 11);
    expect(r.pull(2)).toBeGreaterThan(2);
    expect(r.pull(2)).toBeLessThan(driftFor(1).height * 1.2);
  });

  it('Zug geht wieder zurück auf 0 und beginnt neu; jeder Zug etwas anders; deterministisch', () => {
    const a = new DriftRule(createRng(5), 4, 32, 11);
    const b = new DriftRule(createRng(5), 4, 32, 11);
    const c = new DriftRule(createRng(6), 4, 32, 11);
    let peaks: number[] = [];
    let cur = 0;
    let falling = false;
    let prev = 0;
    for (let s = 0; s <= 25; s += 0.02) {
      const v = a.pull(s);
      expect(v).toBeGreaterThanOrEqual(-1e-9);
      expect(b.pull(s)).toBe(v);
      if (v < prev - 1e-9) {
        if (!falling) peaks.push(prev);
        falling = true;
      } else if (v > prev + 1e-9) falling = false;
      cur = v;
      prev = v;
    }
    void cur;
    expect(peaks.length).toBeGreaterThanOrEqual(3);
    expect(new Set(peaks.map((p) => p.toFixed(2))).size).toBeGreaterThan(1);
    let diff = 0;
    for (let s = 0; s < 25; s += 0.5) diff += Math.abs(a.pull(s) - c.pull(s));
    expect(diff).toBeGreaterThan(1);
    // Zurückgleiten: am Zyklusende (Zug + Rückweg) ist der Zug wieder ≈ 0
    const d = new DriftRule(createRng(1), 1, 32, 11);
    let zero = false;
    for (let s = 0; s < 12; s += 0.01) if (s > 2 && d.pull(s) < 0.05) zero = true;
    expect(zero).toBe(true);
    expect(RETURN_S).toBeGreaterThan(1);
  });

  it('Anzeige-Pfeil: nach oben beim Zug, nach unten beim Zurückgleiten', () => {
    const r = new DriftRule(createRng(1), 3, 32, 11);
    const dirs = new Set<number>();
    for (let s = 0; s < 12; s += 0.05) dirs.add(r.hint(s).y);
    expect(dirs.has(-1)).toBe(true);
    expect(dirs.has(1)).toBe(true);
  });
});

checkNachfuehrenExercise(gegenhalten, science);
