/**
 * Mentale Rotation (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborMentaleRotation } from '../../src/exercises/labor-mentale-rotation';
import { PARAMS, QUICK_TRIALS } from '../../src/exercises/labor-mentale-rotation/logic';
import { science } from '../../src/exercises/labor-mentale-rotation/science';
import { de, it as itTexts } from '../../src/exercises/labor-mentale-rotation/texts';
import { getSecondary as get, simulate as sim, type Opts } from './_labor-b4-sim';
import { expectComplete, expectLegal, expectSameKeys, expectScience } from './_labor-b4-texts';

const simulate = (o: Opts = {}) => sim(laborMentaleRotation, o);

describe('Definition', () => {
  it('Kategorie wahrnehmung, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    const d = laborMentaleRotation;
    expect(d.id).toBe('labor-mentale-rotation');
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
      ['Handy-Film', 358, 304],
    ] as const) {
      it(`${lang} ${name}: endet nach 8–14 s mit ctx.finish, Hand antwortet dreimal richtig, Bildunterschriften ≤ 42 Zeichen`, () => {
        const s = simulate({ mode: 'demo', lang, w, h, maxSeconds: 40 });
        expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
        expect(s.seconds).toBeGreaterThanOrEqual(8);
        expect(s.seconds).toBeLessThanOrEqual(14.2);
        expect(s.ghostTaps).toBe(3);
        expect(s.captions.length).toBeGreaterThanOrEqual(4);
        for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
        const t = lang === 'de' ? de : itTexts;
        expect(s.captions).toContain(t.captions.same);
        expect(s.captions).toContain(t.captions.mirror);
        expect(s.result!.primary.value).toBe(100);
      });
    }
  }

  it('Einstellungen des Nutzers ändern den Film nicht; gleicher Startwert → gleicher Film', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { trials: 80, cells: 9, angles: '45', cellCm: 3, timeoutS: 1 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach den Schnell-Aufgaben mit einem vollständigen Ergebnis in etwa 8 s', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThanOrEqual(3);
    expect(s.seconds).toBeLessThanOrEqual(14);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(1);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(get(r, 'correct')).toBeLessThanOrEqual(QUICK_TRIALS);
    expect(get(r, 'slope')).toBeUndefined(); // nur 4 Aufgaben: zu wenig Daten
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
  });

  it('normaler Lauf (24 Aufgaben): Kennzahlen stimmig, Anstieg der Antwortzeit positiv, kein NaN', () => {
    const s = simulate({ maxSeconds: 600, seed: 21 });
    const r = s.result!;
    expect(r).not.toBeNull();
    const correct = get(r, 'correct')!;
    expect(r.primary.value).toBeCloseTo((100 * correct) / 24, 0);
    const rt = get(r, 'rt_mean')!;
    expect(rt).toBeGreaterThan(400);
    expect(rt).toBeLessThan(3500);
    const slope = get(r, 'slope');
    if (slope !== undefined) {
      expect(slope).toBeGreaterThan(0); // Autoplay braucht für größere Winkel länger (3,5 ms je Grad = 315 ms je 90°)
      expect(slope).toBeLessThan(900);
    }
    expect(r.details?.[0].rows[0].value).toMatch(/\d/);
    for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
    expect(r.score).toBe(correct * 10);
  });

  it('läuft mit allen Einstellungen sauber durch (Winkel 45°, viele Quadrate, Zeitlimit, kleinste/größte Quadrate)', () => {
    for (const p of [
      { trials: 6, angles: '45' },
      { trials: 6, cells: 9 },
      { trials: 6, cells: 4, cellCm: 3 },
      { trials: 6, cellCm: 0.6 },
      { trials: 6, timeoutS: 1 },
      { trials: 8, timeoutS: 2, angles: '45', cells: 8 },
    ]) {
      const s = simulate({ params: p, maxSeconds: 300, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Zeitlimit: abgelaufene Aufgaben zählen als nicht richtig, der Lauf endet trotzdem', () => {
    const s = simulate({ params: { trials: 6, timeoutS: 1 }, maxSeconds: 120, seed: 3 });
    expect(s.result).not.toBeNull();
    expect(s.sounds.filter((x) => x === 'bad').length).toBeGreaterThan(0);
    expect(s.result!.primary.value).toBeLessThan(100);
  });

  it('Handy hochkant, Tablet quer/hoch mit großen Quadraten: Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { cells: 9, cellCm: 3, angles: '45' }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 2500, w: 390, h: 844 }, maxSeconds: 60 });
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

  it('Tastatur (←/→) antwortet wie die Knöpfe; Tippen ins Leere und Doppeltipp sind wirkungslos', () => {
    let keys = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 40,
      onFrame: (ex, now, ctx) => {
        if (now < 400 && Math.round(now) % 40 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        // ins Leere (oben links) tippen
        if (now > 1000 && Math.round(now) % 97 === 0) ex.pointerDown?.({ id: 2, x: 3, y: 3, t: now, type: 'touch' });
        // alle 1,4 s antworten (abwechselnd links/rechts), zweimal kurz hintereinander
        if (now > 1200 && Math.round(now) % 1400 < 17) {
          const key = Math.round(now / 1400) % 2 ? 'ArrowLeft' : 'ArrowRight';
          ex.keyDown?.(key, now);
          ex.keyDown?.(key, now + 5);
          keys++;
        }
      },
    });
    expect(keys).toBeGreaterThan(0);
    expect(s.result).not.toBeNull();
    expect(Number.isFinite(s.result!.primary.value)).toBe(true);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, Listen gleich lang)', () => {
    expectSameKeys(de, itTexts);
  });

  it('alle Kennzahlen, Einstellungen und Tipps sind in beiden Sprachen erklärt', () => {
    expectComplete([de, itTexts], PARAMS, ['correct', 'accuracy', 'rt_mean', 'rt_median', 'slope'], ['slow', 'harder', 'mirror', 'turn', 'compare']);
  });

  it('Kennzahlen im Ergebnis haben Texte in beiden Sprachen', () => {
    const s = simulate({ maxSeconds: 600, seed: 21 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborMentaleRotation.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expectLegal(de, itTexts);
  });

  it('der Anstieg ist nur ein Vergleich mit sich selbst: keine Richtwerte, keine Deutung als Fähigkeit', () => {
    const all = JSON.stringify(de) + JSON.stringify(science.texts.de);
    expect(all).not.toMatch(/ist normal|Maß für die Geschwindigkeit|effizienter/);
    expect(de.metricHints?.slope).toMatch(/Vergleich mit dir selbst/);
    expect(de.metricHints?.slope).toMatch(/Richtwert gibt es nicht/);
    expect(itTexts.metricHints?.slope).toMatch(/confronto con te stesso/);
  });
});

describe('science.ts', () => {
  it('nur bestätigte Quellen (Crossref/PubMed, 02.10.2026); Bethell-Fox & Shepard (1988) bewusst nicht aufgenommen', () => {
    expectScience(science, 'labor-mentale-rotation', [
      '10.1126/science.171.3972.701', // Shepard & Metzler 1971
      '10.1162/jocn.2008.20013', // Zacks 2008
      '10.1037/a0028446', // Uttal et al. 2013
      '10.3758/pbr.15.4.763', // Wright et al. 2008
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
    ]);
    expect(science.texts.de.research).toMatch(/Würfelfiguren/); // Einschränkung der Übertragbarkeit steht im Text
  });
});
