/**
 * Balance-Touch (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche) sowie
 * Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln, Sicherheitshinweise) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import { laborBalanceTouch } from '../../src/exercises/labor-balance-touch';
import { PARAMS } from '../../src/exercises/labor-balance-touch/logic';
import { science } from '../../src/exercises/labor-balance-touch/science';
import { de, it as itTexts } from '../../src/exercises/labor-balance-touch/texts';
import { EXERCISES, getExercise } from '../../src/exercises/registry';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborBalanceTouch, o);

describe('Definition', () => {
  it('Kategorie bewegung, Marke labor, Kalibrierung, Einstellungen, keine Stufen, in der Registry', () => {
    expect(laborBalanceTouch.id).toBe('labor-balance-touch');
    expect(laborBalanceTouch.category).toBe('bewegung');
    expect(laborBalanceTouch.tags).toEqual(['labor']);
    expect(laborBalanceTouch.usesCalibration).toBe(true);
    expect(laborBalanceTouch.showsLevel).toBe(false);
    expect(laborBalanceTouch.params).toBe(PARAMS);
    expect(laborBalanceTouch.icon.length).toBeGreaterThan(20);
    expect(getExercise('labor-balance-touch')).toBe(laborBalanceTouch);
    expect(EXERCISES.filter((e) => e.id === 'labor-balance-touch')).toHaveLength(1);
    expect(SCIENCE['labor-balance-touch']).toBe(science);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt Punkte und die Taste der Hilfsperson, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(5);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['wait', 'appear', 'loss', 'next', 'count']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.key).toBe('hits');
      expect(s.result!.primary.value).toBe(4);
      expect(get(s.result!, 'losses')).toBe(1); // die Hilfsperson zählt im Film einen Verlust
      expect(s.finishCalls).toBe(1);
    });
  }

  it('Film ist von Einstellungen unabhängig und reproduzierbar', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { durationS: 300, diameterCm: 15, persistenceS: 0.5, stance: 'single', zone: 'periphery' } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach ≈ 8 s mit einem vollständigen Ergebnis inkl. gezählter Verluste', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(7);
    expect(s.seconds).toBeLessThanOrEqual(10);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'hits', unit: 'count', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(1);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary[0].key).toBe('losses');
    expect(get(r, 'losses')!).toBeGreaterThanOrEqual(1); // die Hilfsperson zählt im Schnellmodus nach 2,5–4,5 s
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.some((l) => /Verluste \d/.test(l))).toBe(true);
    expect(s.finishCalls).toBe(1);
    const rows = r.details![0].rows.map((x) => x.label);
    expect(rows).toContain(de.metrics.stray);
    expect(rows).toContain(de.metrics.losses_per_min);
  });

  it('läuft mit allen Einstellungen sauber durch (Standpositionen, Größen, Sichtbarkeit, Pause, Bereich, Kreuz)', () => {
    for (const p of [
      { stance: 'platform' },
      { stance: 'single', zone: 'periphery' },
      { stance: 'tandem', zone: 'center', fixation: 'no' },
      { diameterCm: 15 },
      { diameterCm: 2 },
      { persistenceS: 0.5, gapMs: 0 },
      { persistenceS: 8, gapMs: 3000 },
      { zone: 'periphery', fixation: 'yes', diameterCm: 12 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Handy hochkant, Tablet, kleiner Bildschirm, Drehen mitten im Lauf', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [820, 1180],
      [1180, 820],
      [1024, 600],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { diameterCm: 15, zone: 'periphery' }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
    const r = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(r.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('läuft bei 30 und 144 Hz', () => {
    const a = simulate({ quick: true, fps: 30, maxSeconds: 60, seed: 4 });
    const b = simulate({ quick: true, fps: 144, maxSeconds: 60, seed: 4 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(1.5);
  });

  it('Italienisch: Ergebnis, Hinweise und Beschriftungen ohne Platzhalter', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.toasts.some((t) => /^Contata: \d+$/.test(t))).toBe(true);
  });
});

describe('Eingabe von Hand: Taste für die Hilfsperson, Tastatur und Punkte', () => {
  it('Taste B zählt einen Verlust, Doppeltipp binnen 0,5 s nicht doppelt, andere Tasten nichts; vor dem Start ohne Wirkung', () => {
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (now < 300) ex.keyDown?.('b', now);
        if (Math.round(now) === 2000) {
          ex.keyDown?.('b', now);
          ex.keyDown?.('B', now + 100);
          ex.keyDown?.('x', now + 200);
          ex.keyDown?.(' ', now + 200);
        }
        if (Math.round(now) === 4000) ex.keyDown?.('B', now);
      },
    });
    expect(get(s.result!, 'losses')).toBe(2);
    expect(s.toasts.filter((t) => /^Gezählt: \d+$/.test(t))).toEqual(['Gezählt: 1', 'Gezählt: 2']);
  });

  it('Taste auf dem Bildschirm: Tipp unten in der Mitte zählt einen Verlust (Taste ≥ 56 px hoch), Tipp daneben nicht', () => {
    const w = 820;
    const h = 1180;
    const s = simulate({
      quick: true,
      autoplay: false,
      w,
      h,
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (Math.round(now) === 2000) ex.pointerDown?.({ id: 1, x: w / 2, y: h - 40, t: now, type: 'touch' });
        if (Math.round(now) === 4000) ex.pointerDown?.({ id: 1, x: 5, y: h - 5, t: now, type: 'touch' }); // neben der Taste
      },
    });
    expect(get(s.result!, 'losses')).toBe(1);
  });
});

describe('Texte', () => {
  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints; Listen gleich lang)', () => {
    expect(leaves(itTexts).sort()).toEqual(leaves(de).sort());
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    expect(itTexts.steps.length).toBe(de.steps.length);
  });

  it('alle Kennzahlen sind in metrics und metricHints erklärt', () => {
    const metricKeys = ['hits', 'misses', 'stray', 'accuracy', 'rt_mean', 'rt_median', 'rt_sd', 'losses', 'losses_per_min'];
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

  it('Tipps und Rückmeldungen vorhanden', () => {
    for (const lang of ['de', 'it'] as const) {
      const t = laborBalanceTouch.texts[lang];
      for (const k of ['few', 'losses', 'stray', 'misses', 'harder', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['hud', 'btnLoss', 'keyLoss', 'lossNoted', 'moreTitle', 'moreNote']) expect(t.feedback[k], k).toBeTruthy();
    }
  });

  it('Sicherheit: Sturzgefahr, Rücksprache, Warnzeichen mit Quelle, keine Messung, Einbein/Tandem/wackelig nur mit Sicherung', () => {
    const all = (t: typeof de) => t.cautions!.join(' ');
    expect(all(de)).toMatch(/Sturzgefahr/);
    expect(all(de)).toMatch(/Wand/);
    for (const w of ['Schwindel', 'Gleichgewichtsstörungen', 'Herz', 'Schwangerschaft', 'Operationen', 'Medikamente', 'rutschfest']) expect(all(de), w).toContain(w);
    expect(all(de)).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all(de)).toMatch(/misst weder dein Gleichgewicht noch deine Haltung/);
    expect(all(de)).toMatch(/Einbeinstand, Tandemstand und wackelige Flächen bergen das höchste Sturzrisiko/);
    expect(all(itTexts)).toMatch(/Rischio di caduta/);
    expect(all(itTexts)).toMatch(/Muchnick, 2008, pp\. 6 e 28/);
    expect(all(itTexts)).toMatch(/non misura né il tuo equilibrio né la tua postura/);
    expect(laborBalanceTouch.texts.de.steps.join(' ')).toMatch(/sicher/i);
    expect(laborBalanceTouch.texts.de.params!.stance.hint).toMatch(/nur mit Sicherung/);
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    const all = (t: unknown) => JSON.stringify(t).toLowerCase();
    const found = (t: unknown, words: string[]) => words.filter((w) => all(t).includes(w));
    const bad = ['diagnos', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'verbessert dein', 'vtc', 'corso', 'mirante', 'optometria unicista', 'istituto', 'prototyp', 'folie', 'original', 'website'];
    expect(found([de, science.texts.de], bad)).toEqual([]);
    expect(found(de, ['normwert'])).toEqual([]);
    expect(all([de, science.texts.de]).match(/\btest(en|s)?\b|\bkurs/)).toBeNull();
    expect(all([itTexts, science.texts.it]).match(/\btest\b|diagnos|valori normali|valore normale|guarisce|\bcorso\b|prototipo/)).toBeNull();
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
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-/ISBN-Link; Texte in beiden Sprachen; schwache Evidenz', () => {
    expect(science.id).toBe('labor-balance-touch');
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
    expect(science.texts.de.research).toMatch(/gesunde Menschen ist ein Nutzen dieser Übung nicht belegt/);
    expect(science.texts.de.research).toMatch(/keine Studie/);
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 03.10.2026)', () => {
    const verified = [
      '10.1016/S0966-6362(01)00156-4', // Woollacott & Shumway-Cook 2002
      '10.1016/j.apmr.2008.09.559', // Silsupadol et al. 2009
      '10.1016/j.arr.2020.101135', // Gallou-Guyot et al. 2020
      '10.1002/14651858.CD012424.pub2', // Sherrington et al. 2019 (Cochrane)
      '10.1037/h0055392', // Fitts 1954
      '10.1207/s15327051hci0701_3', // MacKenzie 1992
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    const dois = science.sources.map((s) => s.url).filter((u) => u.startsWith('https://doi.org/'));
    expect(dois.map((u) => u.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    expect(science.sources.map((s) => s.url).filter((u) => !u.startsWith('https://doi.org/'))).toEqual(['https://openlibrary.org/isbn/9780323029612']);
  });
});
