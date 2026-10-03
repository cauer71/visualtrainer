/**
 * Richtungen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche) sowie
 * Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln, Sicherheitshinweise) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import { laborRichtungen } from '../../src/exercises/labor-richtungen';
import { PARAMS } from '../../src/exercises/labor-richtungen/logic';
import { science } from '../../src/exercises/labor-richtungen/science';
import { de, it as itTexts } from '../../src/exercises/labor-richtungen/texts';
import { EXERCISES, getExercise } from '../../src/exercises/registry';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborRichtungen, o);

describe('Definition', () => {
  it('Kategorie reaktion, Marke labor, Kalibrierung, Einstellungen, keine Stufen, in der Registry', () => {
    expect(laborRichtungen.id).toBe('labor-richtungen');
    expect(laborRichtungen.category).toBe('reaktion');
    expect(laborRichtungen.tags).toEqual(['labor']);
    expect(laborRichtungen.usesCalibration).toBe(true);
    expect(laborRichtungen.showsLevel).toBe(false);
    expect(laborRichtungen.params).toBe(PARAMS);
    expect(laborRichtungen.icon.length).toBeGreaterThan(20);
    expect(getExercise('labor-richtungen')).toBe(laborRichtungen);
    expect(EXERCISES.filter((e) => e.id === 'labor-richtungen')).toHaveLength(1);
    expect(SCIENCE['labor-richtungen']).toBe(science);
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
      expect(s.captions).toContain(de.captions.touch);
      expect(s.captions).toContain(de.captions.helper); // zeigt auch die Bedienung durch die Hilfsperson
      expect(s.captions).toContain(de.captions.wrong);
      expect(s.result!.primary.key).toBe('accuracy');
      expect(s.finishCalls).toBe(1);
    });
  }

  it('im Film antwortet die Hand: vier von fünf richtig (einmal „Falsch“), Ton bleibt aus, reproduzierbar', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { sound: 'yes', trials: 120, directions: '8', stimulusMs: 500 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.sounds).toEqual([]);
    expect(b.result!.primary.value).toBe(80);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach wenigen Pfeilen mit einem vollständigen Ergebnis', () => {
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

  it('Kennzahlen stimmen (32 Pfeile): richtig + falsch + keine Antwort = 32, Zeit je Richtung als zweite Tabelle', () => {
    const s = simulate({ params: { trials: 32 }, maxSeconds: 300, seed: 11 });
    const r = s.result!;
    const wrong = get(r, 'wrong')!;
    const om = get(r, 'omissions')!;
    const correct = Number((r.details?.[0].rows[0].value ?? '0').replace(/\D/g, ''));
    expect(correct + wrong + om).toBe(32);
    expect(r.primary.value).toBeCloseTo((100 * correct) / 32, 0);
    expect(get(r, 'rt_mean')!).toBeGreaterThan(300);
    expect(get(r, 'rt_mean')!).toBeLessThan(1000);
    expect(r.score).toBe(correct * 10);
    const dirTable = r.details?.find((d) => d.title === de.feedback.dirTitle);
    expect(dirTable, 'Tabelle „Zeit je Richtung“').toBeTruthy();
    expect(dirTable!.rows.map((x) => x.label)).toEqual(['oben', 'rechts', 'unten', 'links']);
    expect(dirTable!.note).toBe(de.feedback.dirNote);
  });

  it('mit acht Richtungen heißen die Zeilen oben, oben rechts, rechts …', () => {
    const s = simulate({ params: { trials: 40, directions: '8', stimulusMs: 3000 }, maxSeconds: 300, seed: 5 });
    const dirTable = s.result!.details!.find((d) => d.title === de.feedback.dirTitle)!;
    expect(dirTable.rows.map((x) => x.label)).toEqual(['oben', 'oben rechts', 'rechts', 'unten rechts', 'unten', 'unten links', 'links', 'oben links']);
  });

  it('läuft mit allen Einstellungen sauber durch (Richtungen, Aufgabe, beide Eingaben, kurze Zeiten, große/kleine Pfeile)', () => {
    for (const p of [
      { directions: '8' },
      { rule: 'opposite' },
      { input: 'helper' },
      { input: 'helper', rule: 'opposite', directions: '8' },
      { stimulusMs: 500, waitMinMs: 300, waitMaxMs: 300 },
      { input: 'helper', stimulusMs: 500 },
      { waitMinMs: 3000, waitMaxMs: 500 },
      { sizeCm: 16, directions: '8' },
      { sizeCm: 3 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 90, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    expect(simulate({ quick: true, maxSeconds: 60 }).sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant, Tablet, kleiner Bildschirm: alle Einstellungen laufen durch', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [820, 1180],
      [1180, 820],
      [1024, 600],
    ] as const) {
      for (const p of [{ directions: '8', sizeCm: 16 }, { input: 'helper', directions: '8' }]) {
        const s = simulate({ quick: true, w, h, params: p, pxPerCm: 60, maxSeconds: 90 });
        expect(s.result, `${w}x${h} ${JSON.stringify(p)}`).not.toBeNull();
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = simulate({ quick: true, w: 1180, h: 820, params: { directions: '8' }, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 90 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('läuft bei 30 und 144 Hz mit ähnlichen Zeiten', () => {
    const a = simulate({ quick: true, fps: 30, maxSeconds: 80, seed: 4 });
    const b = simulate({ quick: true, fps: 144, maxSeconds: 80, seed: 4 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(3);
  });

  it('Italienisch: Ergebnis, Hinweise und Beschriftungen ohne Platzhalter', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });
});

describe('Eingabe von Hand: Richtungsfeld, Hilfsperson-Tasten und Tastatur', () => {
  it('Berührung: Pfeiltasten antworten, Tipp ins Leere und vor dem Start sind harmlos, Doppeltipp zählt einmal', () => {
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { waitMinMs: 300, waitMaxMs: 300 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (now < 200) {
          ex.pointerDown?.({ id: 1, x: 5, y: 5, t: now, type: 'touch' });
          ex.keyDown?.('ArrowUp', now);
        }
        if (now > 900 && Math.round(now) % 233 === 0) {
          ex.keyDown?.('ArrowUp', now);
          ex.keyDown?.('ArrowLeft', now + 5); // Doppeltipp
          ex.keyDown?.('x', now); // in diesem Modus ohne Wirkung
        }
      },
    });
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(Number.isFinite(r.primary.value)).toBe(true);
    const answered = Number((r.details?.[0].rows[0].value ?? '0').replace(/\D/g, '')) + get(r, 'wrong')!;
    expect(answered).toBeGreaterThan(0);
    expect(answered).toBeLessThanOrEqual(6);
  });

  it('Hilfsperson: Leertaste = richtig, X = falsch, Enter/Rücktaste ebenso; B ohne Wirkung', () => {
    let step = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { input: 'helper', waitMinMs: 300, waitMaxMs: 300, trials: 10 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (now > 900 && Math.round(now) % 331 === 0) {
          const keys = [' ', 'x', 'Enter', 'Backspace', 'b'];
          ex.keyDown?.(keys[step++ % keys.length], now);
        }
      },
    });
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(get(r, 'wrong')!).toBeGreaterThanOrEqual(1);
    expect(Number(r.details![0].rows[0].value.replace(/\D/g, ''))).toBeGreaterThanOrEqual(1);
  });

  it('Hilfsperson-Tasten auf dem Bildschirm: Tippen auf „Richtig“ und „Falsch“ antwortet', () => {
    // Tasten liegen unten am Bildschirm, mindestens 56 px hoch: Tipp links unten (Richtig) bzw. rechts unten (Falsch)
    const hits: number[] = [];
    const s = simulate({
      quick: true,
      autoplay: false,
      w: 820,
      h: 1180,
      params: { input: 'helper', waitMinMs: 300, waitMaxMs: 300, trials: 6 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        if (now > 900 && Math.round(now) % 277 === 0) {
          const left = hits.length % 2 === 0;
          ex.pointerDown?.({ id: 2, x: left ? 820 / 2 - 100 : 820 / 2 + 100, y: 1180 - 40, t: now, type: 'touch' });
          hits.push(left ? 1 : 0);
        }
      },
    });
    expect(hits.length).toBeGreaterThan(1);
    expect(s.result).not.toBeNull();
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

  it('Tipps, Rückmeldungen und Richtungsnamen vorhanden', () => {
    for (const lang of ['de', 'it'] as const) {
      const t = laborRichtungen.texts[lang];
      for (const k of ['few', 'early', 'wrong', 'slow', 'harder', 'helper', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['label', 'early', 'slow', 'taskSame', 'taskOpposite', 'btnOk', 'btnBad', 'keyOk', 'keyBad', 'moreTitle', 'moreNote', 'dirTitle', 'dirValue', 'dirValueNone', 'dirNote']) expect(t.feedback[k], k).toBeTruthy();
      for (let i = 0; i < 8; i++) expect(t.feedback[`dir${i}`], `dir${i}`).toBeTruthy();
    }
  });

  it('Sicherheit: Sturzgefahr, Rücksprache (Schwindel, Schwangerschaft, Operationen, Medikamente), Warnzeichen mit Quelle, keine Messung', () => {
    const all = (t: typeof de) => t.cautions!.join(' ');
    expect(all(de)).toMatch(/Sturzgefahr/);
    expect(all(de)).toMatch(/Wand/);
    expect(all(de)).toMatch(/Hilfsperson/);
    expect(all(de)).toMatch(/rutschfest/i);
    for (const w of ['Schwindel', 'Gleichgewichtsstörungen', 'Herz', 'Schwangerschaft', 'Operationen', 'Medikamente']) expect(all(de), w).toContain(w);
    expect(all(de)).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all(de)).toMatch(/misst weder dein Gleichgewicht noch deine Haltung/);
    expect(all(de)).toMatch(/nicht belegt/);
    expect(all(itTexts)).toMatch(/Rischio di caduta/);
    expect(all(itTexts)).toMatch(/Muchnick, 2008, pp\. 6 e 28/);
    expect(all(itTexts)).toMatch(/non misura né il tuo equilibrio né la tua postura/);
    expect(all(itTexts)).toMatch(/non è dimostrata/);
    expect(laborRichtungen.texts.de.steps.join(' ')).toMatch(/sicher/i);
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
    expect(science.id).toBe('labor-richtungen');
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
    // ehrliche Einordnung: Studien bei Älteren, kein Nutzen für diese Übung belegt, keine Messung
    expect(science.texts.de.research).toMatch(/gesunde Menschen ist ein Nutzen dieser Übung nicht belegt/);
    expect(science.texts.de.research).toMatch(/keine Studie/);
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 03.10.2026)', () => {
    const verified = [
      '10.1037/h0062827', // Fitts & Seeger 1953 (Metadaten)
      '10.1037/h0027448', // Simon 1969 (Metadaten)
      '10.1136/bjsports-2015-095452', // Okubo et al. 2017
      '10.1093/gerona/56.10.m627', // Lord & Fitzpatrick 2001
      '10.1002/14651858.CD012424.pub2', // Sherrington et al. 2019 (Cochrane)
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    const dois = science.sources.map((s) => s.url).filter((u) => u.startsWith('https://doi.org/'));
    expect(dois.map((u) => u.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    expect(science.sources.map((s) => s.url).filter((u) => !u.startsWith('https://doi.org/'))).toEqual(['https://openlibrary.org/isbn/9780323029612']);
  });
});
