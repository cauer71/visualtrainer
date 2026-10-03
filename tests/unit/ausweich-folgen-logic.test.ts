/** Tests für „Ausweich folgen“ (Katalog 512): Bewegungsregel, Stufenfunktionen, Durchlauf mit dem Kern. */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { ausweichFolgen } from '../../src/exercises/ausweich-folgen';
import {
  dodgeGap,
  dodgePlan,
  dodgeReversalChance,
  dodgeRule,
  dodgeSpeed,
  dodgeTurnTime,
  FAST_FACTOR,
} from '../../src/exercises/ausweich-folgen/logic';
import { science } from '../../src/exercises/ausweich-folgen/science';
import { de, it as itTexts } from '../../src/exercises/ausweich-folgen/texts';
import type { RuleSetup } from '../../src/exercises/_shared/nachfuehren-logic';
import { simulate } from './_sim-w08-w09';

const setup = (level: number, seed: number, hw = 40, hh = 20, seconds = 11): RuleSetup => ({ level, rng: createRng(seed), hw, hh, seconds, demo: false });

describe('ausweich-folgen: Stufen', () => {
  it('schwerer mit der Stufe: schneller, kürzere Abstände, straffere Wendungen, mehr Umkehrungen', () => {
    for (let l = 2; l <= 12; l++) {
      expect(dodgeSpeed(l)).toBeGreaterThan(dodgeSpeed(l - 1));
      expect(dodgeGap(l)).toBeLessThan(dodgeGap(l - 1));
      expect(dodgeTurnTime(l)).toBeLessThan(dodgeTurnTime(l - 1));
      expect(dodgeReversalChance(l)).toBeGreaterThanOrEqual(dodgeReversalChance(l - 1));
    }
    // Wendung bleibt kürzer als der kleinste Abstand zweier Wechsel (sonst würden sich Übergänge überlappen)
    for (let l = 1; l <= 12; l++) expect(dodgeTurnTime(l)).toBeLessThan(0.75 * dodgeGap(l));
  });
});

describe('ausweich-folgen: Bahn', () => {
  it('bleibt im Feld, auf der Schiene (y = 0), stetig, startet aus dem Stand', () => {
    for (const [hw, hh] of [[40, 20], [15, 6], [60, 30]]) {
      for (let level = 1; level <= 12; level++) {
        for (const seed of [1, 2, 3]) {
          const r = dodgeRule(setup(level, seed, hw, hh));
          let prev = r.target(0);
          let peak = 0;
          let out = 0;
          let off = 0;
          for (let s = 0.01; s <= 11; s += 0.01) {
            const p = r.target(s);
            out = Math.max(out, Math.abs(p.x));
            off = Math.max(off, Math.abs(p.y));
            peak = Math.max(peak, Math.abs(p.x - prev.x) / 0.01);
            prev = p;
          }
          expect(out).toBeLessThanOrEqual(hw + 1e-9);
          expect(off).toBe(0);
          expect(peak).toBeLessThanOrEqual(dodgeSpeed(level) * FAST_FACTOR * 1.001);
          // Start: in der ersten Zehntelsekunde kaum Bewegung
          expect(Math.abs(r.target(0.1).x - r.target(0).x)).toBeLessThan(0.15 * dodgeSpeed(level));
        }
      }
    }
  });

  it('Tempo springt nie: größte Beschleunigung bleibt begrenzt (weicher Übergang)', () => {
    for (let level = 1; level <= 12; level++) {
      const r = dodgeRule(setup(level, 4));
      const v = (s: number) => (r.target(s + 0.01).x - r.target(s).x) / 0.01;
      let worst = 0;
      for (let s = 0; s < 11; s += 0.01) worst = Math.max(worst, Math.abs(v(s + 0.01) - v(s)) / 0.01);
      // ein vollständiger Richtungswechsel (2 × Tempo) über die Übergangszeit, Spitze der Hermite-Kurve = 1,5 × Mittel
      const bound = (1.5 * 2 * dodgeSpeed(level) * FAST_FACTOR) / dodgeTurnTime(level);
      expect(worst).toBeLessThanOrEqual(bound);
    }
  });

  it('Ereignisse: Abstände passend zur Stufe, meistens Umkehr, nie mehr als zwei Tempowechsel ohne Umkehr in Folge', () => {
    let rev = 0;
    let all = 0;
    for (let level = 1; level <= 12; level++) {
      for (const seed of [1, 2, 3, 4, 5]) {
        const { events } = dodgePlan(setup(level, seed, 40, 20, 30));
        expect(events[0].t).toBe(0);
        let plain = 0;
        for (let i = 1; i < events.length; i++) {
          const gap = events[i].t - events[i - 1].t;
          expect(gap).toBeGreaterThanOrEqual(0.75 * dodgeGap(level) - 0.02);
          expect(gap).toBeLessThanOrEqual(1.25 * dodgeGap(level) + 0.02);
          plain = events[i].reversal ? 0 : plain + 1;
          expect(plain).toBeLessThanOrEqual(2);
          if (events[i].reversal) rev++;
          all++;
        }
      }
    }
    expect(rev / all).toBeGreaterThan(0.55);
    expect(rev / all).toBeLessThan(0.98);
  });

  it('nur von der Zeit abhängig und deterministisch zum Startwert; keine Störung, kein Pfeil', () => {
    const a = dodgeRule(setup(6, 9));
    const b = dodgeRule(setup(6, 9));
    const c = dodgeRule(setup(6, 10));
    expect(a.target(5.5)).toEqual(b.target(5.5));
    expect(a.target(5.5)).toEqual(a.target(5.5));
    expect(a.target(5.5).x).not.toBeCloseTo(c.target(5.5).x, 3);
    expect(a.disturbance).toBeUndefined();
    expect(a.hint).toBeUndefined();
  });
});

describe('ausweich-folgen: Texte und Quellen', () => {
  it('gleiche Schlüssel in DE und IT, Pflichttexte des Kerns, „scheinbar“, why endet mit „nicht belegt“', () => {
    for (const k of ['captions', 'metrics', 'feedback', 'tips'] as const) expect(Object.keys(itTexts[k]).sort()).toEqual(Object.keys(de[k]).sort());
    for (const k of ['touch', 'follow', 'band', 'goal']) expect(de.captions[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'deviation', 'passed']) expect(de.metrics[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'start']) expect(de.feedback[k]).toBeTruthy();
    for (const k of ['ahead', 'calm', 'great']) expect(de.tips[k]).toBeTruthy();
    expect(de.why).toMatch(/scheinbar/);
    expect(de.why).toMatch(/nicht belegt\.$/);
    expect(itTexts.why).toMatch(/non è dimostrato/i);
    expect(de.steps.length).toBe(itTexts.steps.length);
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\/(doi\.org|openlibrary\.org)\//);
    expect(science.id).toBe(ausweichFolgen.id);
  });
});

describe('ausweich-folgen: Durchlauf mit dem Kern', () => {
  it('Film endet mit Ergebnis; Spiel (kurz) liefert ganzzahlige Stufe, Zusatzwerte und Tipp', () => {
    const d = simulate({ def: ausweichFolgen, mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
    expect(d.result).not.toBeNull();
    expect(d.seconds).toBeGreaterThan(8);
    expect(d.seconds).toBeLessThan(16);
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: ausweichFolgen, quick: true, seed: 5, lang, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
      const p = r.result!.primary;
      expect(p.key).toBe('level');
      expect(Number.isInteger(p.value)).toBe(true);
      expect(r.result!.secondary.map((m) => m.key)).toEqual(['inBand', 'deviation', 'passed']);
      expect(['ahead', 'calm', 'great']).toContain(r.result!.tip);
    }
  });
});
