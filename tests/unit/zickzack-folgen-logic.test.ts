/** Tests für „Zickzack folgen“ (Katalog 513): Bewegungsregel, Stufenfunktionen, Durchlauf mit dem Kern. */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { zickzackFolgen } from '../../src/exercises/zickzack-folgen';
import {
  angleDiff,
  zigAngleDeg,
  zigLegSeconds,
  zigSpeed,
  zigTurnTime,
  zigzagPlan,
  zigzagRule,
} from '../../src/exercises/zickzack-folgen/logic';
import { science } from '../../src/exercises/zickzack-folgen/science';
import { de, it as itTexts } from '../../src/exercises/zickzack-folgen/texts';
import type { RuleSetup } from '../../src/exercises/_shared/nachfuehren-logic';
import { simulate } from './_sim-w08-w09';

const setup = (level: number, seed: number, hw = 40, hh = 20, seconds = 11): RuleSetup => ({ level, rng: createRng(seed), hw, hh, seconds, demo: false });

describe('zickzack-folgen: Stufen', () => {
  it('schwerer mit der Stufe: größerer Knickwinkel, schneller, kürzere Teilstücke, engere Rundung', () => {
    expect(zigAngleDeg(1)).toBe(40);
    expect(zigAngleDeg(12)).toBeGreaterThan(105);
    expect(zigAngleDeg(12)).toBeLessThan(120);
    for (let l = 2; l <= 12; l++) {
      expect(zigAngleDeg(l)).toBeGreaterThan(zigAngleDeg(l - 1));
      expect(zigSpeed(l)).toBeGreaterThan(zigSpeed(l - 1));
      expect(zigLegSeconds(l)).toBeLessThan(zigLegSeconds(l - 1));
      expect(zigTurnTime(l)).toBeLessThan(zigTurnTime(l - 1));
    }
    for (let l = 1; l <= 12; l++) expect(zigTurnTime(l)).toBeLessThan(0.5 * zigLegSeconds(l));
  });

  it('angleDiff: kürzester Winkelunterschied', () => {
    expect(angleDiff(0.1, -0.1)).toBeCloseTo(0.2, 9);
    expect(angleDiff(Math.PI - 0.1, -Math.PI + 0.1)).toBeCloseTo(-0.2, 9);
    expect(Math.abs(angleDiff(Math.PI, 0))).toBeCloseTo(Math.PI, 9);
  });
});

describe('zickzack-folgen: Bahn', () => {
  it('bleibt im Feld, Tempo nie über dem Stufentempo (nur Senken an den Knicken), startet aus dem Stand', () => {
    for (const [hw, hh] of [[40, 20], [15, 6], [60, 32], [22, 70]]) {
      for (let level = 1; level <= 12; level++) {
        for (const seed of [1, 2, 3]) {
          const r = zigzagRule(setup(level, seed, hw, hh));
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
          expect(peak).toBeLessThanOrEqual(zigSpeed(level) * 1.001);
          const q = r.target(0.1);
          const p0 = r.target(0);
          expect(Math.hypot(q.x - p0.x, q.y - p0.y)).toBeLessThan(0.15 * zigSpeed(level));
        }
      }
    }
  });

  it('Knicke: im Regelfall genau der Knickwinkel der Stufe, abwechselnd links/rechts; Randknicke sind als solche markiert', () => {
    for (const level of [1, 4, 8, 12]) {
      let regular = 0;
      let total = 0;
      for (const seed of [1, 2, 3, 4, 5, 6]) {
        const { legs } = zigzagPlan(setup(level, seed, 50, 30, 40));
        const theta = (zigAngleDeg(level) * Math.PI) / 180;
        for (let i = 1; i < legs.length; i++) {
          if (legs[i].bounce) continue;
          total++;
          if (Math.abs(Math.abs(legs[i].turn) - theta) < 1e-6) {
            regular++;
            // abwechselnd: zwei regelmäßige Knicke in Folge drehen in entgegengesetzte Richtung
            if (i > 1 && !legs[i - 1].bounce && Math.abs(Math.abs(legs[i - 1].turn) - theta) < 1e-6) expect(Math.sign(legs[i].turn)).toBe(-Math.sign(legs[i - 1].turn));
          }
        }
      }
      expect(regular / total).toBeGreaterThan(0.6);
    }
  });

  it('Teilstücke dauern ≈ Stufenlänge (±15 %, bei engem Feld kürzer, nie unter 0,45 s)', () => {
    const { legs } = zigzagPlan(setup(5, 3, 60, 40, 30));
    for (let i = 1; i < legs.length; i++) {
      const d = legs[i].t - legs[i - 1].t;
      expect(d).toBeLessThanOrEqual(zigLegSeconds(5) * 1.15 + 0.02);
      expect(d).toBeGreaterThanOrEqual(0.45);
    }
  });

  it('deterministisch zum Startwert, nur von der Zeit abhängig; keine Störung, kein Pfeil', () => {
    const a = zigzagRule(setup(6, 9));
    const b = zigzagRule(setup(6, 9));
    const c = zigzagRule(setup(6, 10));
    expect(a.target(6.1)).toEqual(b.target(6.1));
    expect(a.target(6.1)).toEqual(a.target(6.1));
    const pa = a.target(6.1);
    const pc = c.target(6.1);
    expect(Math.hypot(pa.x - pc.x, pa.y - pc.y)).toBeGreaterThan(0.01);
    expect(a.disturbance).toBeUndefined();
    expect(a.hint).toBeUndefined();
  });
});

describe('zickzack-folgen: Texte und Quellen', () => {
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
    expect(science.id).toBe(zickzackFolgen.id);
  });
});

describe('zickzack-folgen: Durchlauf mit dem Kern', () => {
  it('Film endet mit Ergebnis; Spiel (kurz) liefert ganzzahlige Stufe, Zusatzwerte und Tipp', () => {
    const d = simulate({ def: zickzackFolgen, mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
    expect(d.result).not.toBeNull();
    expect(d.seconds).toBeGreaterThan(8);
    expect(d.seconds).toBeLessThan(16);
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: zickzackFolgen, quick: true, seed: 5, lang, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
      expect(r.result!.primary.key).toBe('level');
      expect(Number.isInteger(r.result!.primary.value)).toBe(true);
      expect(r.result!.secondary.map((m) => m.key)).toEqual(['inBand', 'deviation', 'passed']);
      expect(['ahead', 'calm', 'great']).toContain(r.result!.tip);
    }
  });
});
