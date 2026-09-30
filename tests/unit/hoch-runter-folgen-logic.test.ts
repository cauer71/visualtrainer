/** Tests für „Hoch und runter folgen“ (Katalog 515): Bewegungsregel, Stufenfunktionen, Durchlauf mit dem Kern. */
import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { hochRunterFolgen } from '../../src/exercises/hoch-runter-folgen';
import {
  apexBaseFor,
  arcPlan,
  arcPreviewSeconds,
  arcRule,
  BOOST_WARN_S,
  boostChanceFor,
  gravityFor,
  heightScale,
  sideAmplitudeFor,
} from '../../src/exercises/hoch-runter-folgen/logic';
import { science } from '../../src/exercises/hoch-runter-folgen/science';
import { de, it as itTexts } from '../../src/exercises/hoch-runter-folgen/texts';
import type { RuleSetup } from '../../src/exercises/_shared/nachfuehren-logic';
import { simulate } from './_sim-w08-w09';

const setup = (level: number, seed: number, hw = 50, hh = 30, seconds = 11): RuleSetup => ({ level, rng: createRng(seed), hw, hh, seconds, demo: false });

describe('hoch-runter-folgen: Stufen', () => {
  it('Schwerkraft und Scheitelhöhe steigen, Schübe erst ab Stufe 4, Vorschau nur unten, Seitenschwanken klein', () => {
    for (let l = 2; l <= 12; l++) {
      expect(gravityFor(l)).toBeGreaterThan(gravityFor(l - 1));
      expect(apexBaseFor(l)).toBeGreaterThan(apexBaseFor(l - 1));
      expect(boostChanceFor(l)).toBeGreaterThanOrEqual(boostChanceFor(l - 1));
    }
    for (let l = 1; l <= 3; l++) expect(boostChanceFor(l)).toBe(0);
    expect(boostChanceFor(4)).toBeGreaterThan(0);
    expect(boostChanceFor(12)).toBeLessThanOrEqual(0.6);
    expect(arcPreviewSeconds(3)).toBeGreaterThan(0);
    expect(arcPreviewSeconds(4)).toBe(0);
    expect(sideAmplitudeFor(12, 50)).toBeLessThanOrEqual(0.2 * 50);
    expect(sideAmplitudeFor(12, 15)).toBeLessThanOrEqual(3);
    expect(heightScale(3)).toBe(0.6);
    expect(heightScale(300)).toBe(1.15);
  });
});

describe('hoch-runter-folgen: Bahn', () => {
  it('bleibt im Feld, Tempo beschränkt, startet aus dem Stand, überwiegend senkrecht', () => {
    for (const [hw, hh] of [[50, 30], [15, 6], [22, 70]]) {
      for (let level = 1; level <= 12; level++) {
        for (const seed of [1, 2, 3]) {
          const r = arcRule(setup(level, seed, hw, hh));
          let prev = r.target(0);
          let dx = 0;
          let dy = 0;
          let peak = 0;
          let ox = 0;
          let oy = 0;
          for (let s = 0.01; s <= 11; s += 0.01) {
            const p = r.target(s);
            ox = Math.max(ox, Math.abs(p.x));
            oy = Math.max(oy, Math.abs(p.y));
            dx += Math.abs(p.x - prev.x);
            dy += Math.abs(p.y - prev.y);
            peak = Math.max(peak, Math.hypot(p.x - prev.x, p.y - prev.y) / 0.01);
            prev = p;
          }
          expect(ox).toBeLessThanOrEqual(hw + 1e-9);
          expect(oy).toBeLessThanOrEqual(hh + 1e-9);
          expect(peak).toBeLessThan(60);
          if (hh >= 20) expect(dy).toBeGreaterThan(2.5 * dx);
          expect(Math.abs(r.target(0.1).y - r.target(0).y)).toBeLessThan(1.5);
        }
      }
    }
  });

  it('weiche Bögen: Tempo springt nie, auch nicht am Boden oder beim Schub', () => {
    for (const level of [1, 5, 9, 12]) {
      for (const seed of [1, 2, 3, 4]) {
        const plan = arcPlan(setup(level, seed));
        const y = (s: number) => plan.path.at(s).y;
        const v = (s: number) => (y(s + 0.01) - y(s)) / 0.01;
        let worst = 0;
        for (let s = 0; s < 11; s += 0.01) worst = Math.max(worst, Math.abs(v(s + 0.01) - v(s)) / 0.01);
        // größte sinnvolle Beschleunigung: Umkehr von ≈ 2 × Abwurftempo in ≈ 0,26 s mit Hermite-Spitze 1,5 (großzügig 2×), Anlauf langsamer
        expect(worst).toBeLessThan((2 * 2 * 45) / 0.26);
      }
    }
  });

  it('freier Flug mit fester Schwerkraft: zweite Ableitung ≈ g zwischen Umkehr und Scheitel', () => {
    const level = 5;
    const s0 = setup(level, 3);
    const plan = arcPlan(s0);
    const g = gravityFor(level, heightScale(s0.hh));
    const arc = plan.arcs[1];
    // Mitte des Flugs: nach der Umkehr (0,26 s), vor dem nächsten Bogen
    const next = plan.arcs[2]?.t ?? 11;
    const t = arc.t + 0.26 + 0.3 * (next - arc.t - 0.26);
    const y = (x: number) => plan.path.at(x).y;
    const h = 0.05;
    const acc = (y(t + h) - 2 * y(t) + y(t - h)) / (h * h);
    expect(acc).toBeGreaterThan(0.85 * g);
    expect(acc).toBeLessThan(1.15 * g);
  });

  it('Bögen: Boden und Scheitel liegen im Feld, Scheitelhöhen schwanken, Schübe nur ab Stufe 4', () => {
    let boosts = 0;
    for (let level = 1; level <= 12; level++) {
      for (const seed of [1, 2, 3, 4, 5, 6]) {
        const plan = arcPlan(setup(level, seed, 50, 30, 30));
        expect(plan.floorY).toBeLessThanOrEqual(30);
        expect(plan.arcs.length).toBeGreaterThanOrEqual(3);
        for (const a of plan.arcs) {
          expect(plan.floorY - a.apex).toBeGreaterThanOrEqual(plan.ceilY - 0.6);
          expect(a.v0).toBeGreaterThan(3);
          if (a.boost > 0) {
            expect(level).toBeGreaterThanOrEqual(4);
            boosts++;
          }
        }
      }
    }
    expect(boosts).toBeGreaterThan(5);
    const apexes = arcPlan(setup(6, 2, 50, 30, 30)).arcs.map((a) => a.apex);
    expect(Math.max(...apexes) - Math.min(...apexes)).toBeGreaterThan(1);
  });

  it('Pfeil kündigt Schübe an: genau in den Fenstern, nach oben, nie auf den Stufen 1–3; das Fenster endet vor dem Schub-Tempo', () => {
    for (const level of [1, 2, 3]) {
      const r = arcRule(setup(level, 4));
      for (let s = 0; s < 11; s += 0.05) expect(r.hint!(s)).toEqual({ x: 0, y: 0 });
    }
    let shown = 0;
    for (let level = 6; level <= 12; level++) {
      for (const seed of [1, 2, 3, 4]) {
        const s0 = setup(level, seed, 50, 30, 30);
        const plan = arcPlan(s0);
        const r = arcRule({ ...s0, rng: createRng(seed) });
        for (const w of plan.warnings) {
          expect(w.to - w.from).toBeGreaterThan(BOOST_WARN_S - 1e-9);
          const mid = r.hint!((w.from + w.to) / 2);
          expect(mid).toEqual({ x: 0, y: -1 });
          shown++;
        }
        expect(plan.warnings.length).toBe(plan.arcs.filter((a) => a.boost > 0).length);
      }
    }
    expect(shown).toBeGreaterThan(3);
  });

  it('deterministisch zum Startwert, nur von der Zeit abhängig; keine Störung', () => {
    const a = arcRule(setup(6, 9));
    const b = arcRule(setup(6, 9));
    const c = arcRule(setup(6, 10));
    expect(a.target(6.1)).toEqual(b.target(6.1));
    expect(a.target(6.1)).toEqual(a.target(6.1));
    expect(a.target(6.1).x).not.toBeCloseTo(c.target(6.1).x, 3);
    expect(a.disturbance).toBeUndefined();
  });
});

describe('hoch-runter-folgen: Texte und Quellen', () => {
  it('gleiche Schlüssel in DE und IT, Pflichttexte des Kerns, why endet mit „nicht belegt“', () => {
    for (const k of ['captions', 'metrics', 'feedback', 'tips'] as const) expect(Object.keys(itTexts[k]).sort()).toEqual(Object.keys(de[k]).sort());
    for (const k of ['touch', 'follow', 'band', 'goal']) expect(de.captions[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'deviation', 'passed']) expect(de.metrics[k]).toBeTruthy();
    for (const k of ['level', 'inBand', 'start']) expect(de.feedback[k]).toBeTruthy();
    for (const k of ['ahead', 'calm', 'great']) expect(de.tips[k]).toBeTruthy();
    expect(de.why).toMatch(/nicht belegt\.$/);
    expect(itTexts.why).toMatch(/non è dimostrato/i);
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of science.sources) expect(s.url).toMatch(/^https:\/\/doi\.org\//);
    expect(science.id).toBe(hochRunterFolgen.id);
  });
});

describe('hoch-runter-folgen: Durchlauf mit dem Kern', () => {
  it('Film endet mit Ergebnis; Spiel (kurz) liefert ganzzahlige Stufe, Zusatzwerte und Tipp', () => {
    const d = simulate({ def: hochRunterFolgen, mode: 'demo', seed: 2, renderEvery: 3, maxSeconds: 40 });
    expect(d.result).not.toBeNull();
    expect(d.seconds).toBeGreaterThan(8);
    expect(d.seconds).toBeLessThan(16);
    for (const lang of ['de', 'it'] as const) {
      const r = simulate({ def: hochRunterFolgen, quick: true, seed: 5, lang, startLevel: 8, renderEvery: 2, maxSeconds: 120 });
      expect(r.result).not.toBeNull();
      expect(r.result!.primary.key).toBe('level');
      expect(Number.isInteger(r.result!.primary.value)).toBe(true);
      expect(r.result!.secondary.map((m) => m.key)).toEqual(['inBand', 'deviation', 'passed']);
      expect(['ahead', 'calm', 'great']).toContain(r.result!.tip);
    }
  });
});
