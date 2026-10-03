/**
 * Slalom (Labor): Durchlauf ohne Browser (virtuelle Zeit, Attrappen-Zeichenfläche) sowie Prüfung der Texte
 * (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln, Sicherheitshinweise) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import { laborSlalom } from '../../src/exercises/labor-slalom';
import { PARAMS } from '../../src/exercises/labor-slalom/logic';
import { science } from '../../src/exercises/labor-slalom/science';
import { de, it as itTexts } from '../../src/exercises/labor-slalom/texts';
import { EXERCISES, getExercise } from '../../src/exercises/registry';
import { leaves, secondary, simulate as sim } from './_labor-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborSlalom, o);

describe('Definition', () => {
  it('Kategorie bewegung, Marke labor, Kalibrierung, Einstellungen, keine Stufen, in der Registry', () => {
    expect(laborSlalom.id).toBe('labor-slalom');
    expect(laborSlalom.category).toBe('bewegung');
    expect(laborSlalom.tags).toEqual(['labor']);
    expect(laborSlalom.usesCalibration).toBe(true);
    expect(laborSlalom.showsLevel).toBe(false);
    expect(laborSlalom.params).toBe(PARAMS);
    expect(laborSlalom.icon.length).toBeGreaterThan(20);
    expect(getExercise('labor-slalom')).toBe(laborSlalom);
    expect(EXERCISES.filter((e) => e.id === 'labor-slalom')).toHaveLength(1);
    expect(SCIENCE['labor-slalom']).toBe(science);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, zeigt Tore, einen Fehler und Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['watch', 'steer', 'touch']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.key).toBe('passed');
      expect(s.result!.primary.value).toBeGreaterThanOrEqual(3);
      expect(secondary(s.result!, 'hits')).toBeGreaterThanOrEqual(1); // der Film zeigt einmal eine berührte Stange
    });
  }

  it('Film ist von Einstellungen unabhängig und reproduzierbar', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { durationS: 180, gapCm: 4, speedCmS: 40, control: 'tilt' } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach ≈ 8 s mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(8);
    expect(s.seconds).toBeLessThanOrEqual(11);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'passed', unit: 'count', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(2);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.some((l) => /✓ \d+ · ✗ \d+/.test(l))).toBe(true);
    const rows = r.details![0].rows.map((x) => x.label);
    expect(rows).toContain(de.metrics.gap_used);
    expect(rows).toContain(de.metrics.spacing_used);
  });

  it('läuft mit allen Steuerungen und Einstellungen sauber durch', () => {
    for (const p of [
      { control: 'pointer' },
      { control: 'keys' },
      { control: 'tilt' }, // Autoplay umgeht den Startbildschirm
      { gapCm: 4, speedCmS: 40, spacingCm: 8 },
      { gapCm: 24, speedCmS: 4, speedUpPct: 100, spacingCm: 30 },
      { speedUpPct: 0, spacingCm: 8 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Handy hochkant, Tablet, kleiner Bildschirm: Lücke und Abstand passen sich an, Lauf endet', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [820, 1180],
      [1180, 820],
      [1024, 600],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { gapCm: 24, spacingCm: 30 }, pxPerCm: 38, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      const gap = Number(s.result!.details![0].rows.find((r) => r.label === de.metrics.gap_used)!.value.replace(',', '.').replace(/[^\d.]/g, ''));
      expect(gap, `${w}x${h}`).toBeLessThanOrEqual(0.8 * (w / 38) + 0.2);
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

  it('läuft bei 30 und 144 Hz mit gleicher Dauer und ähnlichem Ergebnis', () => {
    const a = simulate({ quick: true, fps: 30, maxSeconds: 60, seed: 4 });
    const b = simulate({ quick: true, fps: 144, maxSeconds: 60, seed: 4 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(1);
  });

  it('Italienisch: Ergebnis und Beschriftungen ohne Platzhalter', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.some((l) => /✓ \d+ · ✗ \d+/.test(l))).toBe(true);
  });
});

describe('Gerät kippen: Startbildschirm', () => {
  it('ohne Berührung bleibt der Startbildschirm stehen (kein Lauf, kein Ergebnis) und zeigt Titel, Taste und Alternative', () => {
    const s = simulate({ autoplay: false, params: { control: 'tilt' }, maxSeconds: 20, recordText: true });
    expect(s.result).toBeNull();
    expect(s.texts).toContain(de.feedback.tiltTitle);
    expect(s.texts).toContain(de.feedback.tiltEnable);
    expect(s.texts).toContain(de.feedback.tiltPointer);
  });

  it('italienische Texte auf dem Startbildschirm', () => {
    const s = simulate({ autoplay: false, lang: 'it', params: { control: 'tilt' }, maxSeconds: 5, recordText: true });
    expect(s.texts).toContain(itTexts.feedback.tiltEnable);
    expect(s.texts).toContain(itTexts.feedback.tiltPointer);
  });

  it('Taste „Stattdessen mit dem Finger steuern“ startet den Lauf mit Zeiger-Steuerung', () => {
    const w = 1040;
    const h = 715;
    const s = simulate({
      autoplay: false,
      quick: true,
      params: { control: 'tilt' },
      w,
      h,
      maxSeconds: 60,
      onFrame: (ex, now) => {
        // zweite Taste: unter der ersten (bei 715 px Höhe: y ≈ 357,5 + 71,5 + 14 = 443 bis 500)
        if (Math.round(now) === 500) ex.pointerDown?.({ id: 1, x: w / 2, y: 470, t: now, type: 'touch' });
        if (now > 1500) ex.pointerMove?.({ id: 1, x: w / 2 + Math.sin(now / 700) * 200, y: 300, t: now, type: 'touch' });
      },
    });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.key).toBe('passed');
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
    const metricKeys = ['passed', 'hits', 'accuracy', 'streak', 'center_dev', 'gap_used', 'spacing_used'];
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

  it('Tipps, Rückmeldungen und Texte des Startbildschirms vorhanden', () => {
    for (const lang of ['de', 'it'] as const) {
      const t = laborSlalom.texts[lang];
      for (const k of ['few', 'easier', 'harder', 'center', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['hud', 'moreTitle', 'moreNote', 'tiltTitle', 'tiltBody', 'tiltEnable', 'tiltPointer', 'tiltAsking', 'tiltWaiting', 'tiltHold', 'tiltFallback']) expect(t.feedback[k], k).toBeTruthy();
      expect(t.feedback.tiltHold).toContain('{n}');
    }
  });

  it('Sicherheit: Sturzgefahr bei Stehen, Rücksprache, Warnzeichen mit Quelle, keine Messung, Kippen: Erlaubnis und Datenschutz', () => {
    const all = (t: typeof de) => t.cautions!.join(' ');
    expect(all(de)).toMatch(/Sturzgefahr/);
    expect(all(de)).toMatch(/im Sitzen/);
    for (const w of ['Schwindel', 'Gleichgewichtsstörungen', 'Herz', 'Schwangerschaft', 'Operationen', 'Medikamente', 'rutschfest']) expect(all(de), w).toContain(w);
    expect(all(de)).toMatch(/Muchnick, 2008, S\. 6 und 28/);
    expect(all(de)).toMatch(/misst weder dein Gleichgewicht noch deine Haltung/);
    expect(all(de)).toMatch(/Kippen einschalten/);
    expect(all(de)).toMatch(/nichts wird gespeichert oder gesendet/);
    expect(all(de)).toMatch(/Schwindel oder Übelkeit/);
    expect(all(itTexts)).toMatch(/rischio di caduta/i);
    expect(all(itTexts)).toMatch(/Muchnick, 2008, pp\. 6 e 28/);
    expect(all(itTexts)).toMatch(/non viene salvato né inviato nulla/);
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
    expect(science.id).toBe('labor-slalom');
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
      '10.1145/258549.258760', // Accot & Zhai 1997 (Metadaten)
      '10.1038/369742a0', // Land & Lee 1994
      '10.1016/j.arr.2020.101135', // Gallou-Guyot et al. 2020
      '10.1002/14651858.CD012424.pub2', // Sherrington et al. 2019 (Cochrane)
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    const dois = science.sources.map((s) => s.url).filter((u) => u.startsWith('https://doi.org/'));
    expect(dois.map((u) => u.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    expect(science.sources.map((s) => s.url).filter((u) => !u.startsWith('https://doi.org/'))).toEqual(['https://openlibrary.org/isbn/9780323029612']);
  });
});
