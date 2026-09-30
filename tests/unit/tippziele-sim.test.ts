/**
 * Durchlauf-Tests (ohne Browser) für Präzisions-Flick, Schrumpfende Ziele, Ziele erwischen und Zielkette:
 * Intro-Film und Autoplay laufen gegen den Attrappen-Kontext und müssen sauber mit `ctx.finish` enden.
 */
import { describe, expect, it } from 'vitest';
import { praezisionsFlick } from '../../src/exercises/praezisions-flick/index';
import { schrumpfendeZiele } from '../../src/exercises/schrumpfende-ziele/index';
import { zielKlicken } from '../../src/exercises/ziel-klicken/index';
import { simulate } from './_sim-w08-w09';

const DEFS = [praezisionsFlick, schrumpfendeZiele, zielKlicken];

for (const def of DEFS) {
  describe(`${def.id}: Durchlauf`, () => {
    it('Intro-Film: 8–14 s, endet mit finish, Text in beiden Sprachen', () => {
      for (const lang of ['de', 'it'] as const) {
        const out = simulate({ def, mode: 'demo', lang, renderEvery: 2, maxSeconds: 40 });
        expect(out.result, `${def.id} ${lang}`).toBeTruthy();
        expect(out.seconds).toBeGreaterThanOrEqual(8);
        expect(out.seconds).toBeLessThanOrEqual(14);
        expect(out.captions.length).toBeGreaterThan(0);
      }
    });

    it('Autoplay (quick): endet sauber mit Stufe und Zusatzwerten', () => {
      const out = simulate({ def, mode: 'play', quick: true, renderEvery: 2, maxSeconds: 60 });
      expect(out.result).toBeTruthy();
      const r = out.result!;
      expect(r.primary.key).toBe('level');
      expect(Number.isInteger(r.primary.value)).toBe(true);
      expect(r.secondary.length).toBeGreaterThanOrEqual(2);
      expect(r.secondary.length).toBeLessThanOrEqual(4);
      for (const s of r.secondary) expect(def.texts.de.metrics[s.key], s.key).toBeTruthy();
      expect(def.texts.de.metrics[r.primary.key]).toBeTruthy();
      if (r.tip) expect(def.texts.de.tips[r.tip]).toBeTruthy();
    });

    it('Autoplay (volle Sitzung, 120 Hz, Hochformat, reduzierte Bewegung) endet ebenfalls', () => {
      const out = simulate({ def, mode: 'play', fps: 120, w: 600, h: 900, reducedMotion: true, renderEvery: 7, maxSeconds: 300, seed: 11 });
      expect(out.result).toBeTruthy();
      expect(out.seconds).toBeLessThan(150);
    });
  });
}
