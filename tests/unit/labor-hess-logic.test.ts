/**
 * Hess-Schirm (Labor): reine Logik – Einstellungen, Raster und Durchgänge, Auswertung (Abstand zum Ziel in Grad, Fläche des
 * Umrisses), Tastendruck-Regeln. Keine festen Zufallswerte, nur Eigenschaften.
 */
import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { project } from '../../src/exercises/_shared/pruefung-blick';
import { HessSession, hessParams, MARGIN_CM, PARAMS, QUICK_POINTS, tipFor } from '../../src/exercises/labor-hess/logic';

const P = (over: Record<string, unknown> = {}) => hessParams(sanitizeParams(PARAMS, over));
const make = (over: Record<string, unknown> = {}, env: { w?: number; h?: number; dist?: number; max?: number; seed?: number } = {}) => {
  const p = P(over);
  return new HessSession(p, { rng: createRng(env.seed ?? 3), wCm: env.w ?? 60, hCm: env.h ?? 60, distCm: env.dist ?? 40, maxPoints: env.max });
};

/** Zeiger genau auf den Winkel (Grad) legen, mit Faktor `k` auf die Zielwinkel */
function placeAngle(s: HessSession, k = 1, dh = 0, dv = 0): void {
  const t = s.current()!;
  const q = project(s.distCm, t.hx * k + dh, t.vy * k + dv);
  s.place(q.x, q.y);
}

describe('Einstellungen', () => {
  it('Standardwerte', () => {
    const p = P();
    expect(p).toMatchObject({ maxDeg: 20, grid: 'both', passes: 'both', targetCm: 0.8, markerCm: 0.8, leftLens: 'red', tones: 'redgreen', redLevel: 100, secondLevel: 100, glassesCheck: 'steps' });
  });

  it('Grenzen und Schritte', () => {
    const num = (k: string) => PARAMS.find((d) => d.key === k)! as { min: number; max: number; step: number };
    expect([num('maxDeg').min, num('maxDeg').max, num('maxDeg').step]).toEqual([10, 35, 5]);
    expect([num('targetCm').min, num('targetCm').max, num('targetCm').step]).toEqual([0.4, 2, 0.1]);
    expect(P({ maxDeg: 99 }).maxDeg).toBe(35);
    expect(P({ maxDeg: 12 }).maxDeg).toBe(10);
    expect(P({ grid: 'quatsch' }).grid).toBe('both');
    expect(P({ passes: 'one' }).passes).toBe('one');
  });

  it('nur Auswahl „Prüfbild im Intro“ ist neutral; alles andere gehört zum Variantenschlüssel', () => {
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['glassesCheck']);
  });
});

describe('Raster und Durchgänge', () => {
  it('voll: 25 Punkte je Durchgang, nur innen: 9; zwei Durchgänge verdoppeln die Zahl', () => {
    expect(make().perPass).toBe(25);
    expect(make().total).toBe(50);
    expect(make({ grid: 'inner' }).perPass).toBe(9);
    expect(make({ grid: 'inner', passes: 'one' }).total).toBe(9);
    expect(make({ passes: 'one' }).nPasses).toBe(1);
  });

  it('jeder Punkt kommt in jedem Durchgang genau einmal vor, die Reihenfolge ist gemischt', () => {
    const s = make();
    expect([...s.order].sort((a, b) => a - b)).toEqual(Array.from({ length: 25 }, (_, i) => i));
    expect(s.order).not.toEqual(Array.from({ length: 25 }, (_, i) => i));
    const a = [...s.order];
    for (let i = 0; i < 25; i++) {
      placeAngle(s);
      s.confirm(100 * i);
    }
    expect(s.passIdx).toBe(1);
    expect([...s.order].sort((x, y) => x - y)).toEqual(Array.from({ length: 25 }, (_, i) => i));
    expect(s.order).not.toEqual(a);
  });

  it('Höchstzahl begrenzt die Punkte je Durchgang (Schnelllauf, Film); mindestens einer', () => {
    expect(make({}, { max: QUICK_POINTS }).perPass).toBe(QUICK_POINTS);
    expect(make({}, { max: 2 }).total).toBe(4);
    expect(make({}, { max: 0 }).perPass).toBe(25); // 0 = nicht begrenzt
    expect(make({}, { max: 1 }).perPass).toBe(1);
  });

  it('Raster passt immer ins Feld; zu kleine Felder verkleinern es und melden das', () => {
    const big = make({ maxDeg: 10 }, { w: 80, h: 80 });
    expect(big.fit.clamped).toBe(false);
    const small = make({ maxDeg: 35 }, { w: 14, h: 20 });
    expect(small.fit.clamped).toBe(true);
    expect(small.fit.effMaxDeg).toBeLessThan(35);
    for (const q of small.points) {
      expect(Math.abs(q.x)).toBeLessThanOrEqual(14 / 2 - MARGIN_CM + 1e-6);
      expect(Math.abs(q.y)).toBeLessThanOrEqual(20 / 2 - MARGIN_CM + 1e-6);
    }
    expect(small.summary().effDeg).toBeCloseTo(small.fit.effMaxDeg, 1);
    expect(small.summary().clamped).toBe(true);
  });

  it('Fixierauge und Farben: Durchgang A = Auge hinter Rot (Ziel rot, Zeiger zweite Farbe), B umgekehrt', () => {
    const left = make();
    expect(left.fixEye(0)).toBe('left');
    expect(left.fixEye(1)).toBe('right');
    expect([left.targetColor(0), left.markerColor(0)]).toEqual(['a', 'b']);
    expect([left.targetColor(1), left.markerColor(1)]).toEqual(['b', 'a']);
    const right = make({ leftLens: 'green' });
    expect(right.fixEye(0)).toBe('right');
    expect(right.fixEye(1)).toBe('left');
    expect(left.passName(0)).toBe('A');
    expect(left.passName(1)).toBe('B');
  });
});

describe('Eingaben und Auswertung', () => {
  it('Bestätigen geht erst nach einer Bewegung des Zeigers; danach beginnt der Zeiger wieder in der Mitte', () => {
    const s = make();
    expect(s.confirm(10)).toBe(false);
    expect(s.results).toHaveLength(0);
    placeAngle(s);
    expect(s.moved).toBe(true);
    expect(s.confirm(500)).toBe(true);
    expect(s.results).toHaveLength(1);
    expect(s.moved).toBe(false);
    expect(s.marker).toEqual({ x: 0, y: 0 });
    expect(s.confirm(600)).toBe(false);
  });

  it('Abstand zum Ziel in Grad: genau auf dem Ziel ≈ 0, bekannter Versatz wird in Grad wiedergegeben (waagerecht, senkrecht, Betrag)', () => {
    const s = make({ passes: 'one', grid: 'inner' });
    placeAngle(s);
    s.confirm(1000);
    expect(s.results[0].dev).toBeCloseTo(0, 2);
    placeAngle(s, 1, 1.5, 0);
    s.confirm(2000);
    expect(s.results[1].devH).toBeCloseTo(1.5, 2);
    expect(s.results[1].devV).toBeCloseTo(0, 2);
    expect(s.results[1].dev).toBeCloseTo(1.5, 2);
    placeAngle(s, 1, 0, -2);
    s.confirm(3000);
    expect(s.results[2].devV).toBeCloseTo(-2, 2);
    placeAngle(s, 1, 3, 4);
    s.confirm(4000);
    expect(s.results[3].dev).toBeCloseTo(5, 2);
    for (const r of s.results) expect(r.dev).toBeGreaterThanOrEqual(0);
  });

  it('Zeit je Punkt, Durchgang und Fixierauge werden mit dem Ergebnis gespeichert', () => {
    const s = make({}, { max: 2 });
    s.confirm(0);
    placeAngle(s);
    s.confirm(1500);
    placeAngle(s);
    s.confirm(2700);
    expect(s.results.map((r) => r.ms)).toEqual([1500, 1200]);
    expect(s.results.every((r) => r.pass === 'A' && r.fixEye === 'left')).toBe(true);
    placeAngle(s);
    s.confirm(3000);
    expect(s.results[2].pass).toBe('B');
    expect(s.results[2].fixEye).toBe('right');
  });

  it('nach dem letzten Punkt kommt die Karte, erst „Weiter“ beendet; danach geht nichts mehr', () => {
    const s = make({ passes: 'one', grid: 'inner' }, { max: 2 });
    for (let i = 0; i < 2; i++) {
      placeAngle(s);
      expect(s.state).toBe('placing');
      s.confirm(i * 1000);
    }
    expect(s.state).toBe('chart');
    expect(s.finished).toBe(false);
    expect(s.current()).toBeNull();
    s.place(1, 1);
    expect(s.moved).toBe(false);
    expect(s.confirm(9000)).toBe(false);
    expect(s.closeChart()).toBe(true);
    expect(s.finished).toBe(true);
    expect(s.state).toBe('done');
    expect(s.closeChart()).toBe(false);
  });

  /** Beide Durchgänge ganz durchspielen, Zeiger mit Faktor `k` (A) und `kb` (B) auf die Zielwinkel */
  function playAll(s: HessSession, k: number, kb = k): void {
    let n = 0;
    while (s.state === 'placing') {
      placeAngle(s, s.passIdx === 0 ? k : kb);
      s.confirm(++n * 500);
    }
  }

  it('Fläche des Umrisses: genau gesetzt = 100 % des Sollumrisses, mit Faktor k etwa k² · 100 %; Verhältnis A zu B', () => {
    const exact = make();
    playAll(exact, 1);
    expect(exact.summary().areaA).toBe(100);
    expect(exact.summary().areaB).toBe(100);
    expect(exact.summary().areaRatio).toBe(1);
    expect(exact.summary().devA).toBeCloseTo(0, 2);

    const scaled = make();
    playAll(scaled, 0.8, 0.5);
    expect(scaled.summary().areaA).toBe(64);
    expect(scaled.summary().areaB).toBe(25);
    expect(scaled.summary().areaRatio).toBeCloseTo(2.56, 2);
    expect(scaled.summary().devA!).toBeGreaterThan(0);
    expect(scaled.summary().devB!).toBeGreaterThan(scaled.summary().devA!);
  });

  it('wenig Punkte: keine Fläche (weniger als vier Randpunkte), kein NaN', () => {
    const s = make({}, { max: 3 });
    playAll(s, 1);
    const sum = s.summary();
    expect(sum.areaA === null || sum.areaA > 0).toBe(true);
    for (const v of Object.values(sum)) if (typeof v === 'number') expect(Number.isNaN(v)).toBe(false);
    const empty = make().summary();
    expect(empty.placed).toBe(0);
    expect(empty.devA).toBeNull();
    expect(empty.devB).toBeNull();
    expect(empty.areaA).toBeNull();
    expect(empty.areaRatio).toBeNull();
    expect(empty.msMean).toBeNull();
  });

  it('Tipp: kleiner Bildschirm vor Pause vor Standard', () => {
    const base = make().summary();
    expect(tipFor({ ...base, clamped: true, placed: 50 })).toBe('smallScreen');
    expect(tipFor({ ...base, clamped: false, placed: 50 })).toBe('pause');
    expect(tipFor({ ...base, clamped: false, placed: 3 })).toBe('fixTarget');
  });
});
