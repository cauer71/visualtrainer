/**
 * Durchlauf-Tests (ohne Browser) für Tasten-Wahl, Zielauswahl, Mikrokorrektur und Wortstrom:
 * Intro-Film (8–14 s) und Autoplay müssen sauber mit `ctx.finish` enden, Texte/Kennzahlen müssen zusammenpassen.
 */
import { describe, expect, it } from 'vitest';
import type { ExerciseDefinition } from '../../src/core/types';
import type { ScienceEntry } from '../../src/content/science';
import { mikrokorrektur } from '../../src/exercises/mikrokorrektur/index';
import { science as scMikro } from '../../src/exercises/mikrokorrektur/science';
import { tastenWahl } from '../../src/exercises/tasten-wahl/index';
import { science as scTasten } from '../../src/exercises/tasten-wahl/science';
import { wortstrom } from '../../src/exercises/wortstrom/index';
import { science as scWort } from '../../src/exercises/wortstrom/science';
import { zielauswahl } from '../../src/exercises/zielauswahl/index';
import { science as scZiel } from '../../src/exercises/zielauswahl/science';
import { simulate } from './_sim-w08-w09';

const ALL: Array<[ExerciseDefinition, ScienceEntry]> = [
  [tastenWahl, scTasten],
  [zielauswahl, scZiel],
  [mikrokorrektur, scMikro],
  [wortstrom, scWort],
];

const STAGES: Array<[number, number]> = [
  [1024, 768],
  [360, 640],
  [1024, 704],
];

describe.each(ALL)('%# Definition', (def, sc) => {
  it('Metadaten, Texte DE/IT mit gleichen Schlüsseln, Wissenschaftseintrag', () => {
    expect(def.id).toBe(sc.id);
    expect(def.icon.length).toBeGreaterThan(20);
    const { de, it: itT } = def.texts;
    for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(itT[key]).sort()).toEqual(Object.keys(de[key]).sort());
    }
    expect(de.steps.length).toBeGreaterThanOrEqual(2);
    expect(de.steps.length).toBeLessThanOrEqual(3);
    expect(itT.steps.length).toBe(de.steps.length);
    for (const s of de.steps) expect(s.length).toBeLessThanOrEqual(60);
    expect(de.tagline.length).toBeLessThanOrEqual(80);
    expect(de.why.trim().endsWith('nicht belegt.')).toBe(true);
    expect(itT.why.trim().endsWith('non è dimostrato che questo si trasferisca alla lettura o alla vita di tutti i giorni.') || itT.why.includes('dimostrat')).toBe(true);
    for (const c of Object.values(de.captions)) expect(c.length).toBeLessThanOrEqual(40);
    expect(sc.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of sc.sources) expect(s.url.startsWith('https://doi.org/')).toBe(true);
    expect(['strong', 'medium', 'weak']).toContain(sc.evidence);
    for (const l of ['de', 'it'] as const) {
      for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(sc.texts[l][k].length).toBeGreaterThan(40);
    }
  });

  it('keine verbotenen Wörter in den Texten', () => {
    const banned = /(Bedrohung|Schuss|Schüsse|Geschoss|Kill|Diagnose|Normwert|besseres Sehen|Sehkraft|Augenmuskel|sicherer im|Elite|Rang|Ränge|Top 1|minaccia|sparo|diagnosi)/i;
    const blob = JSON.stringify([def.texts, sc.texts]);
    expect(blob).not.toMatch(banned);
    expect(blob).not.toMatch(/\bTest\b/);
  });
});

describe.each(ALL)('%# Intro-Film', (def) => {
  for (const lang of ['de', 'it'] as const) {
    for (const [w, h] of STAGES) {
      it(`${def.id} ${lang} ${w}x${h}: endet nach 8–14 s mit ctx.finish`, () => {
        const out = simulate({ def, mode: 'demo', lang, w, h, renderEvery: 1, maxSeconds: 40 });
        expect(out.result).not.toBeNull();
        expect(out.seconds).toBeGreaterThanOrEqual(8);
        expect(out.seconds).toBeLessThanOrEqual(14);
        expect(out.captions.length).toBeGreaterThanOrEqual(2);
        for (const c of out.captions) expect(Object.values(def.texts[lang].captions)).toContain(c);
        expect(out.taps.length).toBeGreaterThanOrEqual(3);
      });
    }
  }
});

describe.each(ALL)('%# Autoplay im Spielmodus', (def) => {
  for (const quick of [true, false]) {
    for (const [w, h] of STAGES.slice(0, 2)) {
      it(`${def.id} ${quick ? 'quick' : 'voll'} ${w}x${h}: Ergebnis mit Stufe, 2–4 Zusatzwerten und gültigen Schlüsseln`, () => {
        const out = simulate({ def, mode: 'play', quick, w, h, renderEvery: 1, maxSeconds: 400, seed: 13 + w });
        const r = out.result!;
        expect(r).not.toBeNull();
        expect(r.primary.key).toBe('level');
        expect(r.primary.unit).toBe('level');
        expect(Number.isInteger(r.primary.value)).toBe(true);
        expect(r.primary.value).toBeGreaterThanOrEqual(1);
        expect(r.secondary.length).toBeGreaterThanOrEqual(2);
        expect(r.secondary.length).toBeLessThanOrEqual(4);
        for (const m of [r.primary, ...r.secondary]) {
          expect(Object.keys(def.texts.de.metrics)).toContain(m.key);
          expect(Number.isFinite(m.value)).toBe(true);
        }
        expect(r.level).toBeGreaterThanOrEqual(1);
        expect(Object.keys(def.texts.de.tips)).toContain(r.tip);
        if (quick) expect(out.seconds).toBeLessThan(60);
        else expect(out.seconds).toBeLessThan(200);
      });
    }
  }

  it(`${def.id}: mehrere Startwerte, reduzierte Bewegung, 120 Hz – läuft sauber durch`, () => {
    for (const [startLevel, reducedMotion, fps, seed] of [
      [null, true, 60, 3],
      [6, false, 120, 4],
      [12, false, 30, 5],
    ] as const) {
      const out = simulate({ def, mode: 'play', quick: true, startLevel, reducedMotion, fps, renderEvery: 2, maxSeconds: 300, seed });
      expect(out.result).not.toBeNull();
    }
  });
});
