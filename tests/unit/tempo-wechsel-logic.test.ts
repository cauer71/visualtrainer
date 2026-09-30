import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  baseSpeedFor,
  CALM_MAX_U,
  canHostSign,
  changeMsFor,
  decoyGapMs,
  drawGapMs,
  drawTurnAngle,
  exposureFor,
  gapMeanFor,
  isCalm,
  isDecoy,
  levelOf,
  MAX_LEVEL,
  MIN_LEVEL,
  nextTempoFactor,
  signDelayFor,
  TempoRamp,
  tempoRatioFor,
  turnAngleFor,
} from '../../src/exercises/tempo-wechsel/logic';

describe('tempo-wechsel: Stufenfunktionen', () => {
  it('werden mit der Stufe schwerer', () => {
    for (let l = MIN_LEVEL + 1; l <= MAX_LEVEL; l++) {
      expect(baseSpeedFor(l)).toBeGreaterThan(baseSpeedFor(l - 1));
      expect(tempoRatioFor(l)).toBeGreaterThan(tempoRatioFor(l - 1));
      expect(turnAngleFor(l)).toBeGreaterThan(turnAngleFor(l - 1));
      expect(changeMsFor(l)).toBeLessThan(changeMsFor(l - 1));
      expect(gapMeanFor(l)).toBeLessThan(gapMeanFor(l - 1));
      expect(signDelayFor(l)).toBeLessThan(signDelayFor(l - 1));
      expect(exposureFor(l)).toBeLessThanOrEqual(exposureFor(l - 1));
    }
  });

  it('bleiben im gedachten Bereich', () => {
    expect(baseSpeedFor(1)).toBeCloseTo(12);
    // schnellstes Tempo = Grundtempo · Spreizung: ≤ 75 u/s ≈ 17°/s am Tablet
    expect(baseSpeedFor(MAX_LEVEL) * tempoRatioFor(MAX_LEVEL)).toBeLessThan(75);
    expect(baseSpeedFor(1) / tempoRatioFor(1)).toBeGreaterThan(7);
    expect(turnAngleFor(1)).toBe(25);
    expect(turnAngleFor(MAX_LEVEL)).toBeLessThanOrEqual(140);
    // Wechsel nie schneller als 450 ms (weich), Mindestabstand der Wechsel über 1 s
    expect(changeMsFor(MAX_LEVEL)).toBeGreaterThanOrEqual(450);
    expect(gapMeanFor(MAX_LEVEL) * 0.75).toBeGreaterThan(changeMsFor(MAX_LEVEL) + signDelayFor(MAX_LEVEL) - 1);
    expect(signDelayFor(MAX_LEVEL)).toBeGreaterThanOrEqual(150);
    expect(exposureFor(MAX_LEVEL)).toBeGreaterThanOrEqual(320);
  });

  it('begrenzt Stufen', () => {
    expect(levelOf(-3)).toBe(MIN_LEVEL);
    expect(levelOf(77)).toBe(MAX_LEVEL);
    expect(baseSpeedFor(99)).toBe(baseSpeedFor(MAX_LEVEL));
  });
});

describe('tempo-wechsel: Zufall', () => {
  it('Drehwinkel streut um den Stufenwert, höchstens 160°', () => {
    const rng = createRng(1);
    for (const level of [1, 10, MAX_LEVEL]) {
      for (let i = 0; i < 200; i++) {
        const a = (drawTurnAngle(level, rng) * 180) / Math.PI;
        expect(a).toBeGreaterThanOrEqual(15 - 1e-6);
        expect(a).toBeLessThanOrEqual(160 + 1e-6);
        expect(a).toBeGreaterThanOrEqual(turnAngleFor(level) * 0.75 - 1e-6);
        expect(a).toBeLessThanOrEqual(turnAngleFor(level) * 1.25 + 1e-6);
      }
    }
  });

  it('Abstand der Wechsel ist unregelmäßig um den Stufenwert', () => {
    const rng = createRng(2);
    for (const level of [1, MAX_LEVEL]) {
      const v = Array.from({ length: 300 }, () => drawGapMs(level, rng));
      expect(Math.min(...v)).toBeGreaterThanOrEqual(gapMeanFor(level) * 0.75 - 1);
      expect(Math.max(...v)).toBeLessThanOrEqual(gapMeanFor(level) * 1.3 + 1);
      expect(Math.max(...v) - Math.min(...v)).toBeGreaterThan(gapMeanFor(level) * 0.3);
    }
    const d = Array.from({ length: 100 }, () => decoyGapMs(rng));
    expect(Math.min(...d)).toBeGreaterThanOrEqual(800);
    expect(Math.max(...d)).toBeLessThanOrEqual(1400);
  });

  it('neuer Tempofaktor liegt im Band und unterscheidet sich deutlich vom alten', () => {
    const rng = createRng(3);
    for (const level of [1, 8, 15, MAX_LEVEL]) {
      const r = tempoRatioFor(level);
      let cur = 1;
      let lo = Infinity;
      let hi = 0;
      for (let i = 0; i < 400; i++) {
        const next = nextTempoFactor(level, cur, rng);
        expect(next).toBeGreaterThanOrEqual(1 / r - 1e-9);
        expect(next).toBeLessThanOrEqual(r + 1e-9);
        // Wechsel im Logarithmus mindestens 90 % der halben Spreizung ... außer beim allerersten Schritt um 1
        expect(Math.abs(Math.log(next / cur))).toBeGreaterThanOrEqual(0.9 * Math.log(r) - 1e-6);
        lo = Math.min(lo, next);
        hi = Math.max(hi, next);
        cur = next;
      }
      // das volle Band wird ausgeschöpft
      expect(lo).toBeLessThan(1 / r * 1.25);
      expect(hi).toBeGreaterThan(r / 1.25);
    }
  });

  it('Ablenkungs-Wechsel erst ab Stufe 3, nie zwei in Folge', () => {
    const rng = createRng(5);
    for (let i = 0; i < 100; i++) expect(isDecoy(2, rng, false)).toBe(false);
    for (let i = 0; i < 100; i++) expect(isDecoy(10, rng, true)).toBe(false);
    const n = Array.from({ length: 1000 }, () => isDecoy(10, rng, false)).filter(Boolean).length;
    expect(n).toBeGreaterThan(150);
    expect(n).toBeLessThan(350);
  });
});

describe('tempo-wechsel: ruhiges Tempo für das Zeichen', () => {
  it('ruhig = Rampe fertig, nicht im Bogen, nicht zu schnell, Tempo am Ziel', () => {
    expect(isCalm(20, 20, false, false)).toBe(true);
    expect(isCalm(20.4, 20, false, false)).toBe(true);
    expect(isCalm(21.5, 20, false, false)).toBe(false);
    expect(isCalm(20, 20, true, false)).toBe(false);
    expect(isCalm(20, 20, false, true)).toBe(false);
    expect(isCalm(CALM_MAX_U + 5, CALM_MAX_U + 5, false, false)).toBe(false);
    expect(isCalm(CALM_MAX_U, CALM_MAX_U, false, false)).toBe(true);
  });

  it('nur Wechsel auf ein ruhiges Tempo dürfen ein Zeichen tragen', () => {
    expect(canHostSign(CALM_MAX_U)).toBe(true);
    expect(canHostSign(CALM_MAX_U + 1)).toBe(false);
    // auf Stufe 1 ist jedes Tempo ruhig genug, auf Stufe 20 nicht jedes
    expect(baseSpeedFor(1) * tempoRatioFor(1)).toBeLessThanOrEqual(CALM_MAX_U);
    expect(baseSpeedFor(MAX_LEVEL) * tempoRatioFor(MAX_LEVEL)).toBeGreaterThan(CALM_MAX_U);
    // es gibt auf jeder Stufe auch ruhige Tempi
    for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) expect(canHostSign(baseSpeedFor(l) / tempoRatioFor(l))).toBe(true);
  });
});

describe('TempoRamp: weiche Tempo-Rampe', () => {
  it('läuft stetig und monoton von A nach B, mit Steigung 0 an beiden Enden', () => {
    const r = new TempoRamp();
    r.start(2, 800);
    expect(r.active).toBe(true);
    let prev = r.value;
    let first = 0;
    let last = 0;
    let maxStep = 0;
    for (let i = 0; i < 49; i++) {
      r.step(1000 / 60);
      expect(r.value).toBeGreaterThanOrEqual(prev - 1e-12);
      maxStep = Math.max(maxStep, r.value - prev);
      if (i === 0) first = r.value - prev;
      prev = r.value;
    }
    last = 2 - prev;
    expect(r.active).toBe(false);
    expect(r.value).toBe(2);
    // Anfang und Ende flach, Mitte steil
    expect(first).toBeLessThan(maxStep * 0.1);
    expect(last).toBeLessThan(1e-9);
    // kein Sprung: der größte Schritt je Bild ist klein gegenüber dem Gesamthub
    expect(maxStep).toBeLessThan(0.06);
  });

  it('ist bildratenunabhängig', () => {
    const at = (dtMs: number) => {
      const r = new TempoRamp();
      r.set(0.5);
      r.start(1.8, 700);
      for (let t = 0; t < 350 - 1e-9; t += dtMs) r.step(dtMs);
      return r.value;
    };
    // Schrittweiten, die 350 ms genau teilen (Bildraten 40, 80 und 200 Hz)
    expect(at(25)).toBeCloseTo(at(12.5), 6);
    expect(at(25)).toBeCloseTo(at(5), 6);
    // nach der halben Zeit genau in der Mitte (Kurve ist punktsymmetrisch)
    expect(at(1)).toBeCloseTo((0.5 + 1.8) / 2, 2);
  });

  it('startet aus dem aktuellen Wert; set() hebt die Rampe auf', () => {
    const r = new TempoRamp();
    r.start(2, 500);
    r.step(250);
    const mid = r.value;
    r.start(0.6, 500);
    expect(r.value).toBe(mid);
    r.step(500);
    expect(r.value).toBeCloseTo(0.6, 9);
    r.start(3, 500);
    r.set(1);
    expect(r.active).toBe(false);
    expect(r.value).toBe(1);
    expect(r.target).toBe(1);
  });
});
