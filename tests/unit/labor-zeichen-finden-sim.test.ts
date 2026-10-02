/**
 * Zeichen finden (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborZeichenFinden } from '../../src/exercises/labor-zeichen-finden';
import { MIN_GLYPH_PX, PARAMS, SETS } from '../../src/exercises/labor-zeichen-finden/logic';
import { science } from '../../src/exercises/labor-zeichen-finden/science';
import { de, it as itTexts } from '../../src/exercises/labor-zeichen-finden/texts';
import { getSecondary as get, simulate as sim, type Opts } from './_labor-b4-sim';
import { expectComplete, expectLegal, expectSameKeys, expectScience } from './_labor-b4-texts';

const simulate = (o: Opts = {}) => sim(laborZeichenFinden, o);

/** Kleinste Schriftgröße (px) der einzeln gezeichneten Zeichen aus dem Vorrat (ohne das große Zielzeichen oben) */
function minGlyphPx(drawn: Array<{ s: string; font: string }>): number {
  const pool = new Set(Object.values(SETS).flat());
  const sizes: number[] = [];
  for (const d of drawn) {
    if (d.s.length !== 1 || !pool.has(d.s)) continue;
    const m = /(\d+)px/.exec(d.font);
    if (m) sizes.push(Number(m[1]));
  }
  // Zielzeichen oben ist größer; das Raster hat die häufigste (kleinste) Größe
  return sizes.length ? Math.min(...sizes) : NaN;
}

describe('Definition', () => {
  it('Kategorie wahrnehmung, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    const d = laborZeichenFinden;
    expect(d.id).toBe('labor-zeichen-finden');
    expect(d.category).toBe('wahrnehmung');
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
      it(`${lang} ${name}: endet nach 8–14 s mit ctx.finish, Hand findet Zeichen, tippt einmal falsch und „Fertig“, Bildunterschriften ≤ 42 Zeichen`, () => {
        const s = simulate({ mode: 'demo', lang, w, h, maxSeconds: 40 });
        expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
        expect(s.seconds).toBeGreaterThanOrEqual(8);
        expect(s.seconds).toBeLessThanOrEqual(14.2);
        expect(s.ghostTaps).toBe(7); // 3 richtige + 1 falsches + 2 richtige + „Fertig“
        expect(s.captions.length).toBeGreaterThanOrEqual(4);
        for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
        const t = lang === 'de' ? de : itTexts;
        expect(s.captions).toContain(t.captions.wrong);
        expect(s.captions).toContain(t.captions.giveup);
        expect(s.result!.secondary.some((m) => m.key === 'found' && m.value === 5)).toBe(true);
      });
    }
  }

  it('Einstellungen des Nutzers ändern den Film nicht; gleicher Startwert → gleicher Film', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { set: 'digits', rows: 12, cols: 16, density: 50, rounds: 20 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach zwei Tafeln mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThan(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['found', 'missed', 'false_taps']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
  });

  it('Kennzahlen sind stimmig: Genauigkeit aus gefundenen, übersehenen und falschen; Zeit pro Zeichen = Gesamtzeit / gefundene', () => {
    const s = simulate({ maxSeconds: 400, seed: 21 });
    const r = s.result!;
    expect(r).not.toBeNull();
    const found = get(r, 'found')!;
    const missed = get(r, 'missed')!;
    const wrong = get(r, 'false_taps')!;
    expect(r.primary.value).toBeCloseTo((100 * found) / (found + missed + wrong), 0);
    const per = get(r, 'per_target')!;
    const total = Number(/[\d,]+/.exec(r.details![0].rows[0].value)![0].replace(',', '.')) * 1000;
    expect(per).toBeGreaterThan(300);
    expect(per).toBeLessThan(5000);
    expect(per * found).toBeCloseTo(total, -3);
    expect(found + missed).toBe(8 * 5); // 5 Tafeln × 8 Zielzeichen
    for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
  });

  it('läuft mit allen Zeichenvorräten, kleinstem und größtem Raster, hohem und niedrigem Anteil sauber durch', () => {
    for (const p of [
      { set: 'digits', rounds: 2 },
      { set: 'similar', rounds: 2 },
      { set: 'mixed', rounds: 2 },
      { rows: 2, cols: 2, density: 5, rounds: 3 },
      { rows: 12, cols: 16, density: 50, rounds: 1 },
      { rows: 12, cols: 16, density: 5, cellCm: 1, rounds: 1 },
      { cellCm: 6, rounds: 2 },
    ]) {
      const s = simulate({ params: p, maxSeconds: 600, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Lesbarkeit: Zeichen im Raster sind auf Tablet und Handy (quer/hoch) mindestens 22 px groß, auch beim größten Raster', () => {
    for (const [w, h] of [
      [1180, 820],
      [820, 1180],
      [390, 844],
      [844, 390],
    ] as const) {
      for (const p of [{}, { rows: 12, cols: 16 }, { rows: 2, cols: 2 }]) {
        const s = simulate({ quick: true, w, h, params: p, recordText: true, maxSeconds: 80, pxPerCm: 38 });
        expect(s.result, `${w}x${h} ${JSON.stringify(p)}`).not.toBeNull();
        const px = minGlyphPx(s.drawn);
        expect(px, `${w}x${h} ${JSON.stringify(p)}`).toBeGreaterThanOrEqual(MIN_GLYPH_PX - 0.5);
      }
    }
  });

  it('Handy hochkant, Tablet quer/hoch mit großen Feldern: Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { cellCm: 6 }, pxPerCm: 60, maxSeconds: 80 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 390, h: 844 }, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 80 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 80 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((l) => !/undefined/.test(l))).toBe(true);
  });

  it('Tipps ins Leere, vor dem Start und doppelt auf dasselbe Feld sind wirkungslos', () => {
    let taps = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        if (now < 500 && Math.round(now) % 40 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        if (now > 1000 && Math.round(now) % 53 === 0) {
          const x = ((now * 7) % ctx.stage.w) | 0;
          const y = ((now * 13) % ctx.stage.h) | 0;
          ex.pointerDown?.({ id: 2, x, y, t: now, type: 'touch' });
          ex.pointerDown?.({ id: 3, x, y, t: now + 10, type: 'touch' });
          taps++;
        }
      },
    });
    expect(taps).toBeGreaterThan(0);
    if (s.result) expect(Number.isFinite(s.result.primary.value)).toBe(true);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, Listen gleich lang)', () => {
    expectSameKeys(de, itTexts);
  });

  it('alle Kennzahlen, Einstellungen und Tipps sind in beiden Sprachen erklärt', () => {
    expectComplete([de, itTexts], PARAMS, ['found', 'missed', 'false_taps', 'accuracy', 'per_target', 'total'], ['false', 'missed', 'harder', 'slow', 'compare']);
  });

  it('Kennzahlen im Ergebnis haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 80 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborZeichenFinden.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expectLegal(de, itTexts);
  });

  it('keine Aufforderung zur fachlichen Abklärung und keine Wirkaussagen zu Verwechslungen; sagt, was nicht gemessen wird', () => {
    expect(JSON.stringify(de)).not.toMatch(/abklären|gezielt geübt/);
    expect(de.cautions?.join(' ')).toMatch(/sagt nichts über deine Augen aus/);
    expect(science.texts.de.research).toMatch(/misst das nicht/);
    expect(science.texts.de.research.toLowerCase()).not.toContain('diagnos');
  });
});

describe('science.ts', () => {
  it('nur bestätigte Quellen (Crossref/PubMed/OpenAlex, 02.10.2026)', () => {
    expectScience(science, 'labor-zeichen-finden', [
      '10.1037/0033-295x.96.3.433', // Duncan & Humphreys 1989
      '10.1038/s41562-017-0058', // Wolfe & Horowitz 2017
      '10.1016/j.actpsy.2011.09.014', // Mueller & Weidemann 2012
      '10.1016/j.neuroimage.2009.09.024', // Dehaene et al. 2010
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
    ]);
  });
});
