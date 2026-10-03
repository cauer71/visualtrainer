/**
 * Orientierung (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche) sowie
 * Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln, Sicherheitshinweise) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import { laborOrientierung } from '../../src/exercises/labor-orientierung';
import { PARAMS } from '../../src/exercises/labor-orientierung/logic';
import { science } from '../../src/exercises/labor-orientierung/science';
import { de, it as itTexts } from '../../src/exercises/labor-orientierung/texts';
import { EXERCISES, getExercise } from '../../src/exercises/registry';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborOrientierung, o);

describe('Definition', () => {
  it('Kategorie wahrnehmung, Marke labor, Kalibrierung, Einstellungen, keine Stufen, in der Registry', () => {
    expect(laborOrientierung.id).toBe('labor-orientierung');
    expect(laborOrientierung.category).toBe('wahrnehmung');
    expect(laborOrientierung.tags).toEqual(['labor']);
    expect(laborOrientierung.usesCalibration).toBe(true);
    expect(laborOrientierung.showsLevel).toBe(false);
    expect(laborOrientierung.params).toBe(PARAMS);
    expect(laborOrientierung.icon.length).toBeGreaterThan(20);
    expect(getExercise('labor-orientierung')).toBe(laborOrientierung);
    expect(EXERCISES.filter((e) => e.id === 'labor-orientierung')).toHaveLength(1);
    expect(SCIENCE['labor-orientierung']).toBe(science);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt als Hilfsperson, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(5);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['target', 'move', 'wrong', 'back']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.key).toBe('reached');
      expect(s.result!.primary.value).toBe(2); // ein Ziel wird im Film als „Falsche Richtung“ bestätigt
      expect(s.finishCalls).toBe(1);
    });
  }

  it('Film ist von Einstellungen unabhängig und reproduzierbar; Ton bleibt aus', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { sound: 'yes', trials: 80, directions: '8', timeoutS: 1, waitMs: 5000 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(a.sounds).toEqual([]);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach wenigen Zielen mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 90 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(3);
    expect(s.seconds).toBeLessThanOrEqual(30);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'reached', unit: 'count', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(4);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels).toContain('1 / 4');
    expect(s.finishCalls).toBe(1);
  });

  it('Kennzahlen stimmen (24 Ziele): erreicht + falsch + Zeitlimit = 24, Zeiten plausibel, Zeit je Richtung', () => {
    const s = simulate({ params: { trials: 24, waitMs: 500, timeoutS: 5 }, maxSeconds: 600, seed: 11 });
    const r = s.result!;
    const wrong = get(r, 'wrong')!;
    const to = get(r, 'timeouts')!;
    expect(r.primary.value + wrong + to).toBe(24);
    expect(get(r, 't_mean')!).toBeGreaterThan(800);
    expect(get(r, 't_mean')!).toBeLessThan(2500);
    expect(get(r, 'return_mean')!).toBeGreaterThan(500);
    expect(r.score).toBe(r.primary.value * 10);
    const dirTable = r.details?.find((d) => d.title === de.feedback.dirTitle);
    expect(dirTable!.rows.map((x) => x.label)).toEqual(['oben', 'rechts', 'unten', 'links']);
    for (const k of r.secondary) expect(Number.isFinite(k.value), k.key).toBe(true);
  });

  it('läuft mit allen Einstellungen sauber durch (Richtungen, Rückkehr, Zeitlimit, Größen, Pause, Ton)', () => {
    for (const p of [
      { directions: '8' },
      { returnToCenter: 'no' },
      { returnToCenter: 'no', directions: '8', timeoutS: 3 },
      { timeoutS: 1 },
      { timeoutS: 30, waitMs: 500 },
      { sizeCm: 10, directions: '8' },
      { sizeCm: 1.5 },
      { waitMs: 5000 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 200, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    expect(simulate({ quick: true, maxSeconds: 90 }).sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 90 });
    expect(on.sounds.length).toBeGreaterThan(2);
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant, Tablet, kleiner Bildschirm, Drehen mitten im Lauf', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [820, 1180],
      [1180, 820],
      [1024, 600],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { directions: '8', sizeCm: 10 }, pxPerCm: 60, maxSeconds: 200 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
    const r = simulate({ quick: true, w: 1180, h: 820, params: { directions: '8' }, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 200 });
    expect(r.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 90 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 90 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis, Hinweise und Beschriftungen ohne Platzhalter', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 90 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });
});

describe('Eingabe von Hand: Tasten für die Hilfsperson und Tastatur', () => {
  it('Tastatur: Leertaste/Enter = erreicht (auch Rückkehr), X/Rücktaste = falsche Richtung, B ohne Wirkung; Doppeltipp zählt einmal', () => {
    let step = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { waitMs: 500, trials: 8, returnToCenter: 'no' },
      maxSeconds: 120,
      onFrame: (ex, now) => {
        if (now < 300) ex.keyDown?.(' ', now); // vor dem Start: ohne Wirkung
        if (now > 800 && Math.round(now) % 701 === 0) {
          const keys = [' ', 'x', 'Enter', 'Backspace', 'b'];
          ex.keyDown?.(keys[step++ % keys.length], now);
          ex.keyDown?.(' ', now + 5); // Doppeltipp
        }
      },
    });
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(get(r, 'wrong')!).toBeGreaterThanOrEqual(1);
    expect(r.primary.value).toBeGreaterThanOrEqual(1);
    expect(r.primary.value + get(r, 'wrong')!).toBeLessThanOrEqual(4);
  });

  it('Tasten auf dem Bildschirm: „Erreicht“ links, „Falsche Richtung“ rechts, mindestens 56 px hoch', () => {
    const w = 820;
    const h = 1180;
    let n = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      w,
      h,
      params: { waitMs: 500, trials: 8, returnToCenter: 'no' },
      maxSeconds: 120,
      onFrame: (ex, now) => {
        if (now > 800 && Math.round(now) % 613 === 0) {
          const left = n++ % 2 === 0;
          ex.pointerDown?.({ id: 2, x: left ? w / 2 - 100 : w / 2 + 100, y: h - 50, t: now, type: 'touch' });
        }
      },
    });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBeGreaterThanOrEqual(1);
    expect(get(s.result!, 'wrong')!).toBeGreaterThanOrEqual(1);
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
    const metricKeys = ['reached', 'wrong', 'timeouts', 't_mean', 't_median', 't_sd', 'return_mean'];
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

  it('Tipps, Rückmeldungen und Richtungsnamen vorhanden', () => {
    for (const lang of ['de', 'it'] as const) {
      const t = laborOrientierung.texts[lang];
      for (const k of ['few', 'wrong', 'timeouts', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['label', 'wait', 'target', 'center', 'btnOk', 'btnBad', 'keyOk', 'keyBad', 'moreTitle', 'moreNote', 'dirTitle', 'dirValue', 'dirValueNone', 'dirNote']) expect(t.feedback[k], k).toBeTruthy();
      for (let i = 0; i < 8; i++) expect(t.feedback[`dir${i}`], `dir${i}`).toBeTruthy();
    }
  });

  it('Sicherheit: Sturzgefahr, Rücksprache, Warnzeichen mit Quelle, keine Messung, Hilfsperson im Aufbau', () => {
    const all = (t: typeof de) => t.cautions!.join(' ');
    expect(all(de)).toMatch(/Sturzgefahr/);
    expect(all(de)).toMatch(/Wand/);
    for (const w of ['Schwindel', 'Gleichgewichtsstörungen', 'Herz', 'Schwangerschaft', 'Operationen', 'Medikamente', 'rutschfest']) expect(all(de), w).toContain(w);
    expect(all(de)).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all(de)).toMatch(/misst weder dein Gleichgewicht noch deine Haltung/);
    expect(all(de)).toMatch(/Hilfsperson/);
    expect(all(itTexts)).toMatch(/Rischio di caduta/);
    expect(all(itTexts)).toMatch(/Muchnick, 2008, pp\. 6 e 28/);
    expect(all(itTexts)).toMatch(/non misura né il tuo equilibrio né la tua postura/);
    expect(laborOrientierung.texts.de.steps.join(' ')).toMatch(/sicher/i);
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
    expect(science.id).toBe('labor-orientierung');
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
      '10.1136/bjsports-2015-095452', // Okubo et al. 2017
      '10.1093/gerona/56.10.m627', // Lord & Fitzpatrick 2001
      '10.1016/S0966-6362(01)00156-4', // Woollacott & Shumway-Cook 2002
      '10.1002/14651858.CD012424.pub2', // Sherrington et al. 2019 (Cochrane)
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    const dois = science.sources.map((s) => s.url).filter((u) => u.startsWith('https://doi.org/'));
    expect(dois.map((u) => u.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    expect(science.sources.map((s) => s.url).filter((u) => !u.startsWith('https://doi.org/'))).toEqual(['https://openlibrary.org/isbn/9780323029612']);
  });
});
