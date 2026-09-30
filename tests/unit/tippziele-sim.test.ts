/**
 * Durchlauf-Tests (ohne Browser) für Präzisions-Flick, Schrumpfende Ziele, Ziele erwischen und Zielkette:
 * Intro-Film und Autoplay laufen gegen den Attrappen-Kontext (virtuelle Zeit, Geister-Hand, Attrappen-Leinwand)
 * und müssen sauber mit `ctx.finish` enden.
 */
import { describe, expect, it } from 'vitest';
import { praezisionsFlick } from '../../src/exercises/praezisions-flick/index';
import { schrumpfendeZiele } from '../../src/exercises/schrumpfende-ziele/index';
import { zielKlicken } from '../../src/exercises/ziel-klicken/index';
import { zielkette } from '../../src/exercises/zielkette/index';
import { simulate } from './_sim-w08-w09';

const DEFS = [praezisionsFlick, schrumpfendeZiele, zielKlicken, zielkette];

for (const def of DEFS) {
  describe(`${def.id}: Durchlauf`, () => {
    it('Intro-Film (Querformat, Hochformat, beide Sprachen): 8–14 s, endet mit finish, Hand trifft', () => {
      for (const lang of ['de', 'it'] as const) {
        for (const [w, h] of [
          [1120, 792],
          [500, 900],
        ]) {
          const out = simulate({ def, mode: 'demo', lang, w, h, renderEvery: 2, maxSeconds: 40 });
          expect(out.result, `${def.id} ${lang} ${w}x${h}`).toBeTruthy();
          expect(out.seconds).toBeGreaterThanOrEqual(8);
          expect(out.seconds).toBeLessThanOrEqual(14);
          expect(out.captions.length).toBeGreaterThan(0);
          for (const c of out.captions) expect(c.length, c).toBeLessThanOrEqual(40);
          // der Film zeigt mindestens zwei erfolgreiche Antippvorgänge
          expect(out.result!.secondary[0].value, `${def.id} ${lang} ${w}x${h}`).toBeGreaterThanOrEqual(2);
          // keine Fehler-Rückmeldung im Film
          expect(out.toasts.filter((s) => s.startsWith('✗')).length).toBe(0);
        }
      }
    });

    it('Autoplay (quick): endet sauber mit ganzzahliger Stufe, 2–4 Zusatzwerten und Texten', () => {
      for (const lang of ['de', 'it'] as const) {
        const out = simulate({ def, mode: 'play', lang, quick: true, renderEvery: 2, maxSeconds: 60 });
        expect(out.result).toBeTruthy();
        const r = out.result!;
        expect(r.primary.key).toBe('level');
        expect(Number.isInteger(r.primary.value)).toBe(true);
        expect(r.primary.better).toBe('higher');
        expect(r.secondary.length).toBeGreaterThanOrEqual(2);
        expect(r.secondary.length).toBeLessThanOrEqual(4);
        for (const s of r.secondary) expect(def.texts[lang].metrics[s.key], s.key).toBeTruthy();
        expect(def.texts[lang].metrics[r.primary.key]).toBeTruthy();
        if (r.tip) expect(def.texts[lang].tips[r.tip]).toBeTruthy();
        expect(Number.isFinite(r.level)).toBe(true);
      }
    });

    it('Autoplay (volle Sitzung, 120 Hz, Hochformat, reduzierte Bewegung, gespeicherte Stufe) endet ebenfalls', () => {
      const out = simulate({ def, mode: 'play', fps: 120, w: 600, h: 900, reducedMotion: true, startLevel: 6, renderEvery: 7, maxSeconds: 300, seed: 11 });
      expect(out.result).toBeTruthy();
      expect(out.seconds).toBeLessThan(150);
      expect(out.result!.level).toBeGreaterThanOrEqual(1);
    });

    it('gleiche Schlüssel in de und it', () => {
      for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const)
        expect(Object.keys(def.texts.it[key]).sort()).toEqual(Object.keys(def.texts.de[key]).sort());
    });

    it('Sitzung ist deterministisch (gleicher Startwert, gleiches Ergebnis)', () => {
      const a = simulate({ def, mode: 'play', quick: true, seed: 5 });
      const b = simulate({ def, mode: 'play', quick: true, seed: 5 });
      expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    });
  });
}
