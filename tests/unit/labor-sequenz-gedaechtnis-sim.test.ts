/**
 * Sequenz-Gedächtnis (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborSequenzGedaechtnis } from '../../src/exercises/labor-sequenz-gedaechtnis';
import { PARAMS } from '../../src/exercises/labor-sequenz-gedaechtnis/logic';
import { science } from '../../src/exercises/labor-sequenz-gedaechtnis/science';
import { de, it as itTexts } from '../../src/exercises/labor-sequenz-gedaechtnis/texts';
import { getSecondary as get, simulate as sim, type Opts } from './_labor-b4-sim';
import { expectComplete, expectLegal, expectSameKeys, expectScience } from './_labor-b4-texts';

const simulate = (o: Opts = {}) => sim(laborSequenzGedaechtnis, o);

describe('Definition', () => {
  it('Kategorie gedaechtnis, Marke labor, Einstellungen, keine Stufen, ohne Kalibrierung', () => {
    const d = laborSequenzGedaechtnis;
    expect(d.id).toBe('labor-sequenz-gedaechtnis');
    expect(d.category).toBe('gedaechtnis');
    expect(d.tags).toEqual(['labor']);
    expect(d.showsLevel).toBe(false);
    expect(d.params).toBe(PARAMS);
    expect(d.usesCalibration).toBeFalsy(); // die Aufgabe hängt nicht von cm ab (Raster passt sich der Bühne an)
    expect(d.icon.length).toBeGreaterThan(20);
    expect(d.texts.de).toBe(de);
    expect(d.texts.it).toBe(itTexts);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt die Folgen, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBe(5); // Folge mit 2 und Folge mit 3 Feldern
      expect(s.captions.length).toBeGreaterThanOrEqual(5);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      expect(s.captions).toContain(de.captions.watch);
      expect(s.captions).toContain(de.captions.longer);
      expect(s.result!.primary.value).toBe(3);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar; Einstellungen des Nutzers ändern den Film nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { rows: 8, cols: 10, showMs: 3000, maxErrors: 1 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet mit einem vollständigen Ergebnis in etwa 8 s', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThanOrEqual(3);
    expect(s.seconds).toBeLessThanOrEqual(16);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'span', unit: 'count', better: 'higher' });
    expect(Number.isFinite(r.primary.value)).toBe(true);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['rounds', 'errors']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
  });

  it('normaler Lauf (Standardeinstellungen) endet nach Fehlern oder Ziellänge, Kennzahlen stimmig', () => {
    for (const seed of [11, 12, 13]) {
      const s = simulate({ maxSeconds: 400, seed });
      const r = s.result!;
      expect(r, `seed ${seed}`).not.toBeNull();
      expect(r.primary.value).toBeGreaterThanOrEqual(0);
      expect(get(r, 'errors')).toBeGreaterThanOrEqual(0);
      expect(get(r, 'errors')).toBeLessThanOrEqual(3);
      const acc = get(r, 'accuracy');
      if (acc !== undefined) {
        expect(acc).toBeGreaterThan(0);
        expect(acc).toBeLessThanOrEqual(100);
      }
      const rt = get(r, 'rt_mean');
      if (rt !== undefined) {
        expect(rt).toBeGreaterThan(150);
        expect(rt).toBeLessThan(2000);
      }
      expect(r.details?.[0].rows[0].value).toMatch(/\d/);
      for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
    }
  });

  it('läuft mit allen Auswahlen, kleinstem und größtem Raster, Zeitlimit und ohne Pause sauber durch', () => {
    for (const p of [
      { growth: 'fresh', onError: 'down' },
      { onError: 'restart', maxErrors: 2 },
      { rows: 2, cols: 2, startLength: 1 },
      { rows: 8, cols: 10, startLength: 10 },
      { showMs: 400, gapMs: 0 },
      { durationS: 20, maxErrors: 0 },
      { maxErrors: 1, maxLength: 3, startLength: 3 },
    ]) {
      const s = simulate({ params: p, maxSeconds: 400, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Zeitlimit beendet die Übung nach der laufenden Runde', () => {
    const s = simulate({ params: { durationS: 10, maxErrors: 0 }, maxSeconds: 120, seed: 4 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThanOrEqual(10);
    expect(s.seconds).toBeLessThanOrEqual(10 + 20);
  });

  it('Handy hochkant und Tablet quer/hoch: Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { rows: 8, cols: 10 }, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((l) => !/undefined/.test(l))).toBe(true);
  });

  it('Eingaben vor der Eingabephase, ins Leere und doppelt auf dasselbe Feld sind wirkungslos', () => {
    let taps = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        // während Anlauf und Anzeige tippen: ohne Wirkung und kein Fehler
        if (now < 1500 && Math.round(now) % 50 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        // danach über die Fläche tippen (auch ins Leere, auch doppelt)
        if (now > 1500 && Math.round(now) % 61 === 0) {
          const x = ((now * 7) % ctx.stage.w) | 0;
          const y = ((now * 13) % ctx.stage.h) | 0;
          ex.pointerDown?.({ id: 2, x, y, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 3, x, y, t: now + 20, type: 'touch' });
          taps++;
        }
      },
    });
    expect(taps).toBeGreaterThan(0);
    expect(s.result).not.toBeNull();
    expect(Number.isFinite(s.result!.primary.value)).toBe(true);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, Listen gleich lang)', () => {
    expectSameKeys(de, itTexts);
  });

  it('alle Kennzahlen, Einstellungen und Tipps sind in beiden Sprachen erklärt', () => {
    expectComplete([de, itTexts], PARAMS, ['span', 'rounds', 'errors', 'accuracy', 'rt_mean', 'total'], ['few', 'chunk', 'harder', 'slow', 'compare']);
  });

  it('Kennzahlen im Ergebnis haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborSequenzGedaechtnis.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expectLegal(de, itTexts);
  });

  it('keine Richtwerte der Art „viele erreichen 5 bis 7“', () => {
    expect(JSON.stringify(de)).not.toMatch(/5 bis 7|sieben Felder/);
  });
});

describe('science.ts', () => {
  it('nur bestätigte Quellen (Crossref/PubMed/OpenAlex, 02.10.2026); Milner (1971) bewusst nicht aufgenommen', () => {
    expectScience(science, 'labor-sequenz-gedaechtnis', [
      '10.1006/brcg.1998.1039', // Berch et al. 1998
      '10.1037/h0043158', // Miller 1956
      '10.1017/S0140525X01003922', // Cowan 2001
      '10.1038/36846', // Luck & Vogel 1997
      '10.1177/1745691616635612', // Melby-Lervåg et al. 2016
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
    ]);
    expect(science.sources.some((s) => s.url.includes('bmb.a070866'))).toBe(false);
  });
});
