/** Tests für „Glatt folgen“ (Katalog 514): Bewegungsregel, Stufenfunktionen, Durchlauf mit dem Kern. */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { glattFolgen } from '../../src/exercises/glatt-folgen';
import {
  extraShare,
  smoothPeakSpeed,
  smoothPoint,
  smoothPreviewSeconds,
  smoothRule,
  smoothShape,
} from '../../src/exercises/glatt-folgen/logic';
import { science } from '../../src/exercises/glatt-folgen/science';
import { de, it as itTexts } from '../../src/exercises/glatt-folgen/texts';
import type { RuleSetup } from '../../src/exercises/_shared/nachfuehren-logic';
import { simulate } from './_sim-w08-w09';

const setup = (level: number, seed: number, hw = 50, hh = 28, seconds = 11): RuleSetup => ({ level, rng: createRng(seed), hw, hh, seconds, demo: false });

describe('glatt-folgen: Stufen', () => {
  it('Tempo steigt, Zusatz-Schwingung erst ab Stufe 7, Vorschau schrumpft', () => {
    for (let l = 2; l <= 12; l++) {
      expect(smoothPeakSpeed(l)).toBeGreaterThan(smoothPeakSpeed(l - 1));
      expect(smoothPreviewSeconds(l)).toBeLessThan(smoothPreviewSeconds(l - 1) + 1e-9);
    }
    for (let l = 1; l <= 6; l++) expect(extraShare(l)).toBe(0);
    expect(extraShare(7)).toBeGreaterThan(0);
    expect(extraShare(12)).toBeLessThanOrEqual(0.18);
    expect(smoothPeakSpeed(1)).toBeLessThan(6);
    expect(smoothPreviewSeconds(12)).toBeLessThan(0.3);
  });
});

describe('glatt-folgen: Bahn', () => {
  it('bleibt im Feld, Geschwindigkeit unter der Stufen-Schranke, startet aus dem Stand', () => {
    for (const [hw, hh] of [[50, 28], [15, 6], [22, 70]]) {
      for (let level = 1; level <= 12; level++) {
        for (const seed of [1, 2, 3]) {
          const r = smoothRule(setup(level, seed, hw, hh));
          let prev = r.target(0);
          let peak = 0;
          let ox = 0;
          let oy = 0;
          for (let s = 0.01; s <= 11; s += 0.01) {
            const p = r.target(s);
            ox = Math.max(ox, Math.abs(p.x));
            oy = Math.max(oy, Math.abs(p.y));
            peak = Math.max(peak, Math.hypot(p.x - prev.x, p.y - prev.y) / 0.01);
            prev = p;
          }
          expect(ox).toBeLessThanOrEqual(hw + 1e-9);
          expect(oy).toBeLessThanOrEqual(hh + 1e-9);
          expect(peak).toBeLessThanOrEqual(smoothPeakSpeed(level) * 1.01);
          const q = r.target(0.1);
          const p0 = r.target(0);
          expect(Math.hypot(q.x - p0.x, q.y - p0.y)).toBeLessThan(0.05 * smoothPeakSpeed(level));
        }
      }
    }
  });

  it('glatt: Beschleunigung bleibt klein, keine Sprünge (auch beim Einlauf)', () => {
    for (const level of [1, 6, 12]) {
      const r = smoothRule(setup(level, 7));
      const v = (s: number) => {
        const a = r.target(s);
        const b = r.target(s + 0.01);
        return { x: (b.x - a.x) / 0.01, y: (b.y - a.y) / 0.01 };
      };
      let worst = 0;
      for (let s = 0; s < 11; s += 0.01) {
        const a = v(s);
        const b = v(s + 0.01);
        worst = Math.max(worst, Math.hypot(b.x - a.x, b.y - a.y) / 0.01);
      }
      // Krümmungs-Beschleunigung ≈ v² / Krümmungsradius; hier großzügig: höchstens (Spitzentempo)² / 5 u
      expect(worst).toBeLessThan((smoothPeakSpeed(level) * smoothPeakSpeed(level)) / 5);
    }
  });

  it('Frequenzverhältnis je Durchgang ≈ 2,3…2,8, Phasen zufällig, deterministisch zum Startwert', () => {
    const a = smoothShape(setup(3, 1));
    const b = smoothShape(setup(3, 1));
    const c = smoothShape(setup(3, 2));
    expect(a).toEqual(b);
    expect(a.phx).not.toBeCloseTo(c.phx, 6);
    for (let seed = 1; seed < 30; seed++) {
      const r = smoothShape(setup(5, seed)).ratio;
      expect(r).toBeGreaterThanOrEqual(2.3);
      expect(r).toBeLessThan(2.8);
    }
    expect(smoothPoint(a, 5)).toEqual(smoothPoint(b, 5));
    expect(smoothRule(setup(3, 1)).disturbance).toBeUndefined();
    expect(smoothRule(setup(3, 1)).hint).toBeUndefined();
  });
});

describe('glatt-folgen: Texte und Quellen', () => {
  it('gleiche Schlüssel in DE und IT, Pflichttexte des Kerns, why endet mit „nicht belegt“', () => {
    for (const k of ['captions', 'metrics', 'feedback', 'tips'] as const) expect(Object.keys(itTexts[k]).sort()).toEqual(Object.keys(de[k]).sort());
    for (const k of ['touch', 'follow', 'band', 'goal']) expect(de.captions[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'deviation', 'passed']) expect(de.metrics[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'start']) expect(de.feedback[k]).toBeTruthy();
    for (const k of ['ahead', 'calm', 'great']) expect(de.tips[k]).toBeTruthy();
    expect(de.why).toMatch(/nicht belegt\.$/);
    expect(itTexts.why).toMatch(/non è dimostrato/i);
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\/(doi\.org|openlibrary\.org)\//);
    expect(science.id).toBe(glattFolgen.id);
  });
});

describe('glatt-folgen: Durchlauf mit dem Kern', () => {
  it('Film endet mit Ergebnis; Spiel (kurz) liefert ganzzahlige Stufe, Zusatzwerte und Tipp', () => {
    const d = simulate({ def: glattFolgen, mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
    expect(d.result).not.toBeNull();
    expect(d.seconds).toBeGreaterThan(8);
    expect(d.seconds).toBeLessThan(16);
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: glattFolgen, quick: true, seed: 5, lang, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
      expect(r.result!.primary.key).toBe('level');
      expect(Number.isInteger(r.result!.primary.value)).toBe(true);
      expect(r.result!.secondary.map((m) => m.key)).toEqual(['inBand', 'deviation', 'passed']);
      expect(['ahead', 'calm', 'great']).toContain(r.result!.tip);
    }
  });
});
