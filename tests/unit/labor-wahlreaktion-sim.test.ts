/**
 * Wahlreaktion (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborWahlreaktion } from '../../src/exercises/labor-wahlreaktion';
import { PARAMS } from '../../src/exercises/labor-wahlreaktion/logic';
import { science } from '../../src/exercises/labor-wahlreaktion/science';
import { de, it as itTexts } from '../../src/exercises/labor-wahlreaktion/texts';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborWahlreaktion, o);

describe('Definition', () => {
  it('Kategorie reaktion, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborWahlreaktion.id).toBe('labor-wahlreaktion');
    expect(laborWahlreaktion.category).toBe('reaktion');
    expect(laborWahlreaktion.tags).toEqual(['labor']);
    expect(laborWahlreaktion.usesCalibration).toBe(true);
    expect(laborWahlreaktion.showsLevel).toBe(false);
    expect(laborWahlreaktion.params).toBe(PARAMS);
    expect(laborWahlreaktion.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(5);
      expect(s.captions.length).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      expect(s.captions).toContain(de.captions.early); // einmal tippt die Hand absichtlich zu früh
      expect(s.captions).toContain(de.captions.tap);
      expect(s.result!.primary.key).toBe('accuracy');
      expect(s.result!.primary.value).toBe(100);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar, der Ton bleibt im Film aus, Einstellungen ändern ihn nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { sound: 'yes', trials: 200, options: 6, stimulusMs: 300 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.sounds).toEqual([]);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach wenigen Zeichen mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(3);
    expect(s.seconds).toBeLessThanOrEqual(14);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['wrong', 'omissions', 'early']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels).toContain('1 / 6');
    expect(s.finishCalls).toBe(1);
  });

  it('Kennzahlen sind stimmig (40 Zeichen): Genauigkeit aus richtigen, Reaktionszeit plausibel, Zusatztabelle', () => {
    const s = simulate({ params: { trials: 40 }, maxSeconds: 200, seed: 11 });
    const r = s.result!;
    const acc = r.primary.value;
    const wrong = get(r, 'wrong')!;
    const om = get(r, 'omissions')!;
    const correct = Number((r.details?.[0].rows[0].value ?? '0').replace(/\D/g, ''));
    expect(correct + wrong + om).toBe(40);
    expect(acc).toBeCloseTo((100 * correct) / 40, 0);
    const rt = get(r, 'rt_mean')!;
    expect(rt).toBeGreaterThan(300);
    expect(rt).toBeLessThan(1000);
    expect(r.details?.[0].rows.length).toBeGreaterThanOrEqual(2);
    expect(r.score).toBe(correct * 10);
  });

  it('läuft mit allen Tastenzahlen, beiden Zeichenarten, kurzen Antwortzeiten und Wartezeiten sauber durch', () => {
    for (const p of [
      { options: 2 },
      { options: 3, stimulus: 'shape' },
      { options: 5, stimulus: 'shape' },
      { options: 6 },
      { stimulusMs: 300, waitMinMs: 300, waitMaxMs: 300 },
      { waitMinMs: 3000, waitMaxMs: 500 },
      { sizeCm: 12, options: 6 },
      { sizeCm: 2, options: 2 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 80, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant und Tablet: auch mit großem Zeichen und 6 Tasten läuft alles durch', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { sizeCm: 12, options: 6 }, pxPerCm: 60, maxSeconds: 80 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, params: { options: 6 }, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('läuft bei 30 und 144 Hz mit gleichen Zeiten (Messung über die virtuelle Zeit, nicht über die Bilder)', () => {
    const a = simulate({ quick: true, fps: 30, maxSeconds: 80, seed: 4 });
    const b = simulate({ quick: true, fps: 144, maxSeconds: 80, seed: 4 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(3);
    expect(Math.abs(get(a.result!, 'rt_mean')! - get(b.result!, 'rt_mean')!)).toBeLessThan(150);
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });

  it('Tipp ins Leere vor dem Start, daneben und auf Tasten; Tastatur 1–6 antwortet; Doppeltipp zählt nicht doppelt', () => {
    let keys = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { options: 3, waitMinMs: 300, waitMaxMs: 300 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (now < 200) {
          ex.pointerDown?.({ id: 1, x: 10, y: 10, t: now, type: 'touch' });
          ex.keyDown?.('1', now);
        }
        if (now > 900 && Math.round(now) % 211 === 0) {
          ex.keyDown?.('2', now);
          ex.keyDown?.('2', now + 5); // Doppeltipp
          ex.keyDown?.('9', now); // keine solche Taste
          keys++;
        }
      },
    });
    expect(keys).toBeGreaterThan(0);
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(Number.isFinite(r.primary.value)).toBe(true);
    const answered = Number((r.details?.[0].rows[0].value ?? '0').replace(/\D/g, '')) + get(r, 'wrong')!;
    expect(answered).toBeGreaterThan(0);
    expect(answered).toBeLessThanOrEqual(6);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints; Listen gleich lang)', () => {
    expect(leaves(itTexts).sort()).toEqual(leaves(de).sort());
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    expect(itTexts.steps.length).toBe(de.steps.length);
  });

  it('alle Kennzahlen der Labor-Übung sind in metrics und metricHints erklärt (Label + Kurzerklärung)', () => {
    const metricKeys = ['correct', 'wrong', 'omissions', 'early', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd'];
    for (const t of [de, itTexts]) {
      for (const k of metricKeys) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
      }
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...metricKeys].sort());
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
      }
    }
  });

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborWahlreaktion.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
      for (const k of ['few', 'early', 'wrong', 'slow', 'harder', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['label', 'early', 'slow', 'moreTitle', 'moreNote']) expect(t.feedback[k], k).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    const all = (t: typeof de) => JSON.stringify(t).toLowerCase();
    for (const bad of ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'verbessert dein']) {
      expect(all(de), bad).not.toContain(bad);
    }
    expect(all(de)).not.toMatch(/\btest(en|s)?\b/);
    expect(all(itTexts)).not.toMatch(/\btest\b/);
    expect(all(itTexts)).not.toMatch(/diagnos|valori normali|valore normale|guarisce/);
  });

  it('Bildunterschriften und Schritte sind kurz', () => {
    for (const t of [de, itTexts]) {
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
    }
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen; daily ohne Alltagsversprechen', () => {
    expect(science.id).toBe('labor-wahlreaktion');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/(doi\.org\/10\.\d{4,9}\/\S+|openlibrary\.org\/isbn\/\d{10,13})$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
    expect(science.texts.de.daily).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
    expect(science.evidence).toBe('weak');
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.1080/17470215208416600', // Hick 1952 (Metadaten; Inhalt über Proctor & Schneider 2018)
      '10.1037/h0056940', // Hyman 1953 (Metadaten)
      '10.1016/j.cogpsych.2010.11.001', // Schneider & Anderson 2011
      '10.1080/17470218.2017.1322622', // Proctor & Schneider 2018
      '10.3389/fnins.2014.00150', // Heitz 2014
      '10.3758/s13414-022-02476-5', // Han & Proctor 2022
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    const dois = science.sources.map((s) => s.url).filter((u) => u.startsWith('https://doi.org/'));
    expect(dois.map((u) => u.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    // Lehrbuch (ISBN über Open Library, Seitenangabe im Label)
    expect(science.sources.map((s) => s.url).filter((u) => !u.startsWith('https://doi.org/'))).toEqual(['https://openlibrary.org/isbn/9780750640077']);
  });
});
