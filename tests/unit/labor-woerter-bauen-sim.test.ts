/**
 * Wörter bauen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborWoerterBauen } from '../../src/exercises/labor-woerter-bauen';
import { PARAMS, QUICK_WORDS } from '../../src/exercises/labor-woerter-bauen/logic';
import { science } from '../../src/exercises/labor-woerter-bauen/science';
import { de, it as itTexts } from '../../src/exercises/labor-woerter-bauen/texts';
import { getSecondary as get, simulate as sim, type Opts } from './_labor-b4-sim';
import { expectComplete, expectLegal, expectSameKeys, expectScience } from './_labor-b4-texts';

const simulate = (o: Opts = {}) => sim(laborWoerterBauen, o);

describe('Definition', () => {
  it('Kategorie konzentration, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    const d = laborWoerterBauen;
    expect(d.id).toBe('labor-woerter-bauen');
    expect(d.category).toBe('konzentration');
    expect(d.tags).toEqual(['labor']);
    expect(d.usesCalibration).toBe(true);
    expect(d.showsLevel).toBe(false);
    expect(d.params).toBe(PARAMS);
    expect(d.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const lang of ['de', 'it'] as const) {
    for (const [name, w, h] of [
      ['16:11', 1040, 715],
      ['Hochformat', 360, 640],
      ['klein', 520, 358],
    ] as const) {
      it(`${lang} ${name}: endet nach 8–14 s mit ctx.finish, Hand legt zwei Wörter (mit „Zurück“), Bildunterschriften ≤ 42 Zeichen`, () => {
        const s = simulate({ mode: 'demo', lang, w, h, maxSeconds: 40 });
        expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
        expect(s.seconds).toBeGreaterThanOrEqual(8);
        expect(s.seconds).toBeLessThanOrEqual(14.2);
        // Haus (4) + Hut (3) + falsche Kachel + „Zurück“ = 9 Tipps
        expect(s.ghostTaps).toBe(9);
        expect(s.captions.length).toBeGreaterThanOrEqual(4);
        for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
        const t = lang === 'de' ? de : itTexts;
        expect(s.captions).toContain(t.captions.undo);
        expect(s.result!.secondary.some((m) => m.key === 'errors' && m.value === 0)).toBe(true);
      });
    }
  }

  it('Einstellungen des Nutzers ändern den Film nicht; gleicher Startwert → gleicher Film', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { wordLength: 8, words: 30, tileCm: 5, sound: 'yes' } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.sounds).toEqual([]);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach den Schnell-Wörtern mit einem vollständigen Ergebnis in etwa 8 s', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThanOrEqual(3);
    expect(s.seconds).toBeLessThanOrEqual(18);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 't_mean', unit: 'time', better: 'lower' });
    expect(r.primary.value).toBeGreaterThan(200);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['errors', 't_median']));
    expect(r.details?.[0].rows[0].value).toBe(`${QUICK_WORDS} von ${QUICK_WORDS}`);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
  });

  it('normaler Lauf: acht Wörter, Kennzahlen stimmig, kein NaN', () => {
    const s = simulate({ maxSeconds: 400, seed: 21 });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(get(r, 'errors')).toBeGreaterThanOrEqual(0);
    const mean = r.primary.value;
    const med = get(r, 't_median')!;
    const total = get(r, 'total')!;
    expect(total / 8).toBeCloseTo(mean, -1); // Summe / Wörter = Mittel
    expect(med).toBeGreaterThan(300);
    expect(med).toBeLessThan(15000);
    const lpm = get(r, 'lpm')!;
    expect(lpm).toBeCloseTo((40 / (total / 1000)) * 60, -1); // 8 Wörter × 5 Buchstaben
    expect(r.details?.[0].rows[0].value).toBe('8 von 8');
    for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
    expect(r.score).toBeGreaterThan(0);
  });

  it('läuft in beiden Sprachen und mit allen Wortlängen, Kachelgrößen und Ton sauber durch', () => {
    for (const lang of ['de', 'it'] as const) {
      for (const p of [
        { wordLength: 3, words: 3 },
        { wordLength: 8, words: 3, tileCm: 5 },
        { wordLength: 6, words: 4, tileCm: 1.5 },
        { wordLength: 4, words: 3, sound: 'yes' },
      ]) {
        const s = simulate({ lang, params: p, maxSeconds: 200, seed: 5 });
        expect(s.result, `${lang} ${JSON.stringify(p)}`).not.toBeNull();
        expect(Number.isFinite(s.result!.primary.value)).toBe(true);
        for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${lang} ${JSON.stringify(p)} ${m.key}`).toBe(true);
      }
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant (acht Buchstaben), Tablet quer/hoch: Lauf endet, auch mit großen Kacheln', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { wordLength: 8, tileCm: 5 }, pxPerCm: 60, maxSeconds: 80 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 390, h: 844 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Tipps ins Leere, vor dem Start und auf dieselbe Kachel/„Zurück“ doppelt sind wirkungslos', () => {
    let taps = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 25,
      onFrame: (ex, now, ctx) => {
        if (now < 500 && Math.round(now) % 40 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        if (now > 1000 && Math.round(now) % 73 === 0) {
          const x = ((now * 7) % ctx.stage.w) | 0;
          const y = ((now * 13) % ctx.stage.h) | 0;
          ex.pointerDown?.({ id: 2, x, y, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 3, x, y, t: now + 10, type: 'touch' });
          taps++;
        }
      },
    });
    expect(taps).toBeGreaterThan(0);
    // zufälliges Tippen löst vermutlich nichts – wichtig: kein Fehler, der Lauf bleibt gültig (kein Ergebnis ist hier erlaubt)
    if (s.result) expect(Number.isFinite(s.result.primary.value)).toBe(true);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, Listen gleich lang)', () => {
    expectSameKeys(de, itTexts);
  });

  it('alle Kennzahlen, Einstellungen und Tipps sind in beiden Sprachen erklärt', () => {
    expectComplete([de, itTexts], PARAMS, ['solved', 'errors', 't_mean', 't_median', 'total', 'lpm'], ['errors', 'slow', 'harder', 'compare']);
  });

  it('Kennzahlen im Ergebnis haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborWoerterBauen.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expectLegal(de, itTexts);
  });

  it('Hinweis zur nicht geprüften italienischen Wortliste und zur Sprachwahl steht in den Texten', () => {
    expect(itTexts.cautions?.join(' ')).toMatch(/madrelingua/);
    expect(de.cautions?.join(' ')).toMatch(/Sprache der App/);
  });
});

describe('science.ts', () => {
  it('nur bestätigte Quellen (Crossref/PubMed/OpenAlex, 02.10.2026)', () => {
    expectScience(science, 'labor-woerter-bauen', [
      '10.1080/14640747808400654', // Gilhooly & Johnson 1978
      '10.3758/bf03196922', // Mendelsohn & O’Brien 1974
      '10.1080/02724980244000288', // Novick & Sherman 2003
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
    ]);
  });
});
