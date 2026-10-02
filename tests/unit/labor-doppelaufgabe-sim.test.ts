/**
 * Doppelaufgabe (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborDoppelaufgabe } from '../../src/exercises/labor-doppelaufgabe';
import { PARAMS, QUICK_DURATION_S } from '../../src/exercises/labor-doppelaufgabe/logic';
import { science } from '../../src/exercises/labor-doppelaufgabe/science';
import { de, it as itTexts } from '../../src/exercises/labor-doppelaufgabe/texts';
import { leaves, legalProblems, secondary, simulate as sim, type SimOpts } from './_labor-sim';

const simulate = (o: SimOpts = {}) => sim(laborDoppelaufgabe, o);

const METRIC_KEYS = ['c_hits', 'c_targets', 'c_misses', 'c_false', 'c_rt', 'p_hits', 'p_misses', 'p_stray', 'p_rt'];

describe('Definition', () => {
  it('Kategorie konzentration, Marke labor, Kalibrierung, Warnhinweis, Einstellungen, keine Stufen', () => {
    expect(laborDoppelaufgabe.id).toBe('labor-doppelaufgabe');
    expect(laborDoppelaufgabe.category).toBe('konzentration');
    expect(laborDoppelaufgabe.tags).toEqual(['labor']);
    expect(laborDoppelaufgabe.usesCalibration).toBe(true);
    expect(laborDoppelaufgabe.warning).toBe('flash');
    expect(laborDoppelaufgabe.showsLevel).toBe(false);
    expect(laborDoppelaufgabe.params).toBe(PARAMS);
    expect(laborDoppelaufgabe.icon.length).toBeGreaterThan(20);
    expect(laborDoppelaufgabe.color).toBe('#7A5195');
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt Randpunkte und Mitte, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['center', 'edge', 'target']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.key).toBe('c_hits');
      expect(s.result!.primary.value).toBeGreaterThanOrEqual(1);
      expect(s.sounds).toEqual([]);
    });
  }

  it('reproduzierbar; Einstellungen des Nutzers ändern den Film nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3 });
    const b = simulate({ mode: 'demo', seed: 3, params: { mode: 'periphery', spotCm: 12, intervalMs: 400, durationS: 300, targetRate: 50 } });
    expect(JSON.stringify(b.result)).toBe(JSON.stringify(a.result));
    expect(b.seconds).toBeCloseTo(a.seconds, 6);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach der verkürzten Dauer mit einem vollständigen Ergebnis (beide Aufgaben)', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThanOrEqual(QUICK_DURATION_S);
    expect(s.seconds).toBeLessThanOrEqual(QUICK_DURATION_S + 1);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'c_hits', unit: 'count', better: 'higher' });
    expect(r.level).toBe(1);
    expect(r.score % 10).toBe(0);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['c_misses', 'p_hits']));
    expect(r.details?.length).toBe(2);
    expect(r.details![0].title).toBe(de.feedback.titleCenter);
    expect(r.details![1].title).toBe(de.feedback.titleEdge);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.some((l) => /Mitte bei 7/.test(l))).toBe(true);
  });

  it('Modus „Nur Mitte“: Zielzahlen zählen, keine Randpunkte, kein Abzug von Fehltipps', () => {
    const s = simulate({ quick: true, params: { mode: 'central' }, maxSeconds: 60 });
    const r = s.result!;
    expect(r.primary.key).toBe('c_hits');
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['c_targets', 'c_misses', 'c_false']));
    expect(r.secondary.some((m) => m.key.startsWith('p_'))).toBe(false);
    expect(r.details).toBeUndefined();
    const hits = r.primary.value;
    const targets = secondary(r, 'c_targets')!;
    expect(hits + secondary(r, 'c_misses')!).toBe(targets);
    expect(s.labels.every((l) => !/undefined|\{/.test(l))).toBe(true);
  });

  it('Modus „Nur Rand“: Hauptwert sind die getroffenen Punkte, Kreuz statt Zahl, keine Zielzahl-Werte', () => {
    const s = simulate({ quick: true, params: { mode: 'periphery' }, maxSeconds: 60 });
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'p_hits', unit: 'count', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(1);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['p_misses', 'p_stray']));
    expect(r.secondary.some((m) => m.key.startsWith('c_'))).toBe(false);
    expect(s.labels.every((l) => !/Mitte bei/.test(l))).toBe(true);
  });

  it('normale Dauer wird von den Einstellungen bestimmt (Dauer 20 s)', () => {
    const s = simulate({ params: { durationS: 20 }, maxSeconds: 60 });
    expect(s.seconds).toBeGreaterThanOrEqual(20);
    expect(s.seconds).toBeLessThanOrEqual(21);
  });

  it('Kennzahlen sind stimmig: erkannt + verpasst = gezeigt; Reaktionszeiten plausibel', () => {
    const s = simulate({ params: { durationS: 60, mode: 'central', targetRate: 30, intervalMs: 1000 }, maxSeconds: 120, seed: 11 });
    const r = s.result!;
    expect(r.primary.value + secondary(r, 'c_misses')!).toBe(secondary(r, 'c_targets')!);
    const rt = secondary(r, 'c_rt');
    if (rt !== undefined) {
      expect(rt).toBeGreaterThan(100);
      expect(rt).toBeLessThan(1000);
    }
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch (keine NaN)', () => {
    for (const p of [
      { mode: 'central', intervalMs: 400 },
      { mode: 'central', intervalMs: 2500, targetRate: 5 },
      { mode: 'periphery', spotCm: 12 },
      { mode: 'periphery', spotCm: 1, persistenceS: 0.4, gapMs: 0 },
      { mode: 'dual', spotCm: 12, intervalMs: 400, targetRate: 50 },
      { sound: 'yes' },
      { targetDigit: 1 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
      expect(de.tips[s.result!.tip ?? 'compare']).toBeTruthy();
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant und Tablet: auch mit großen Punkten wird nichts größer als die Bühne, Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { spotCm: 12 }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        // die Test-Hand tippt absichtlich manchmal knapp neben einen Punkt: etwas Toleranz am Rand
        expect(p.x).toBeGreaterThanOrEqual(-200);
        expect(p.x).toBeLessThanOrEqual(w + 200);
        expect(p.y).toBeGreaterThanOrEqual(-200);
        expect(p.y).toBeLessThanOrEqual(h + 200);
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf, reduzierte Bewegung, ältere Attrappen ohne params/calib', () => {
    expect(simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, w: 390, h: 844, resizeAt: { t: 3000, w: 844, h: 390 }, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis, Beschriftungen und Titel ohne Platzhalter-Reste', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    for (const l of [...s.labels, ...s.toasts]) expect(l).not.toMatch(/undefined|\{/);
    expect(s.labels.some((l) => /Centro al 7/.test(l))).toBe(true);
  });

  it('Zeichnen: Zahlen der Folge werden gezeichnet', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 60, params: { mode: 'central' } });
    const digits = s.texts.filter((t) => /^[1-9]$/.test(t));
    expect(digits.length).toBeGreaterThan(50);
    expect(new Set(digits).size).toBeGreaterThan(3);
  });

  it('Tippen vor dem Start und wildes Tippen: kein Fehler; Lauf endet; Fehltipps werden nur gezählt', () => {
    let tapped = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        if (now < 200) ex.pointerDown?.({ id: 1, x: 10, y: 10, t: now, type: 'touch' });
        if (now > 700 && Math.round(now) % 83 === 0) {
          ex.pointerDown?.({ id: 2, x: ((now * 7) % ctx.stage.w) | 0, y: ((now * 13) % ctx.stage.h) | 0, t: now, type: 'touch' });
          tapped++;
        }
      },
    });
    expect(tapped).toBeGreaterThan(0);
    expect(s.result).not.toBeNull();
    expect(Number.isFinite(s.result!.primary.value)).toBe(true);
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
    for (const t of [de, itTexts]) {
      for (const k of METRIC_KEYS) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(20);
      }
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...METRIC_KEYS].sort());
      expect(Object.keys(t.metrics).sort()).toEqual([...METRIC_KEYS].sort());
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(15);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
      }
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    expect(legalProblems(de, 'de')).toEqual([]);
    expect(legalProblems(itTexts, 'it')).toEqual([]);
  });

  it('Warnung (warning und „Gut zu wissen“); ehrlich: Blick wird nicht gemessen, Touch-Verzögerung, Kalibrierung', () => {
    expect(laborDoppelaufgabe.warning).toBe('flash');
    expect(de.cautions![0]).toMatch(/lichtempfindlich|epileptisch/);
    expect(itTexts.cautions![0]).toMatch(/fotosensibile|epilettica/);
    const all = JSON.stringify(de);
    expect(all).toMatch(/nicht prüfen, wohin du schaust/);
    expect(all).toMatch(/Verzögerung/);
    expect(all).toMatch(/Bildschirm kalibrieren/);
    expect(JSON.stringify(itTexts)).toMatch(/non può controllare dove guardi/);
  });

  it('Bildunterschriften, Schritte und Zeilenlängen sind kurz', () => {
    for (const t of [de, itTexts]) {
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      expect(t.steps.length).toBeGreaterThanOrEqual(2);
      expect(t.steps.length).toBeLessThanOrEqual(3);
    }
  });

  it('Platzhalter in den Beschriftungen', () => {
    for (const t of [de, itTexts]) {
      expect(t.feedback.labelCenter).toContain('{s}');
      expect(t.feedback.labelCenter).toContain('{d}');
      expect(t.feedback.labelEdge).toContain('{s}');
    }
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen', () => {
    expect(science.id).toBe('labor-doppelaufgabe');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/doi\.org\/10\.\d{4,9}\/\S+$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
  });

  it('Übertragung auf Alltag/Verkehr wird nicht versprochen; daily endet mit „nicht belegt“', () => {
    expect(science.texts.de.daily).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
    for (const lang of ['de', 'it'] as const) {
      const all = JSON.stringify(science.texts[lang]).toLowerCase();
      expect(all).not.toMatch(/sicherer im|più sicuro|besseres sehen|diagnos/);
    }
    expect(science.texts.de.research).toMatch(/nicht belegt/);
    expect(science.texts.it.research).toMatch(/non è dimostrat/);
    expect(science.evidence).toBe('weak');
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.1037/0033-2909.116.2.220', // Pashler 1994
      '10.1111/1467-9280.00318', // Schumacher et al. 2001
      '10.1007/s00426-004-0192-7', // Ruthruff et al. 2006
      '10.1364/JOSAA.5.002210', // Ball et al. 1988
      '10.1097/OPX.0000000000001732', // Vater & Strasburger 2021
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
