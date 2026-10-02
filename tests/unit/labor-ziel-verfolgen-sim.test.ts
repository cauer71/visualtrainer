/**
 * Ziel verfolgen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Attrappen-Zeichenfläche) sowie Prüfung der Texte
 * (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen. Muster: labor-spot-touch-sim.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { laborZielVerfolgen } from '../../src/exercises/labor-ziel-verfolgen';
import { PARAMS, QUICK_DURATION_S } from '../../src/exercises/labor-ziel-verfolgen/logic';
import { science } from '../../src/exercises/labor-ziel-verfolgen/science';
import { de, it as itTexts } from '../../src/exercises/labor-ziel-verfolgen/texts';
import { leaves, metric, simulate, type SimOpts } from './_labor-sim-b2';

const sim = (o: SimOpts) => simulate(laborZielVerfolgen, o);

describe('Definition', () => {
  it('Kategorie bewegung, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborZielVerfolgen.id).toBe('labor-ziel-verfolgen');
    expect(laborZielVerfolgen.category).toBe('bewegung');
    expect(laborZielVerfolgen.tags).toEqual(['labor']);
    expect(laborZielVerfolgen.usesCalibration).toBe(true);
    expect(laborZielVerfolgen.showsLevel).toBe(false);
    expect(laborZielVerfolgen.params).toBe(PARAMS);
    expect(laborZielVerfolgen.color).toBe('#2E6DB4');
    expect(laborZielVerfolgen.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Bildunterschriften ≤ 42 Zeichen, Hand ist die eigene (Engine-Hand verborgen)`, () => {
      const s = sim({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostHidden).toBe(true);
      expect(s.captions.length).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['wait', 'touch', 'follow', 'lost', 'count'] as const) expect(s.captions, k).toContain(de.captions[k]);
      // der Finger war auf dem Ziel, hat es einmal verloren und wieder eingefangen
      expect(s.result!.primary.value).toBeGreaterThan(40);
      expect(s.result!.secondary.some((m) => m.key === 'losses' && m.value >= 1)).toBe(true);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar', () => {
    const a = sim({ mode: 'demo', seed: 3 });
    const b = sim({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });

  it('Einstellungen der Person ändern den Film nicht (Standard im Film)', () => {
    const a = sim({ mode: 'demo', params: { diameterCm: 10, durationS: 180, speedCmS: 40, path: 'lissajous' } });
    const b = sim({ mode: 'demo' });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach der verkürzten Dauer mit einem vollständigen Ergebnis', () => {
    const s = sim({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    // Anlaufzeit + 8 s
    expect(s.seconds).toBeGreaterThanOrEqual(QUICK_DURATION_S);
    expect(s.seconds).toBeLessThanOrEqual(QUICK_DURATION_S + 3);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'on_pct', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThan(30);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.score).toBeGreaterThan(0);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['best_run', 'losses', 'touch_pct']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
    expect(s.labels.every((l) => !/undefined|NaN/.test(l))).toBe(true);
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
  });

  it('normale Dauer wird von den Einstellungen bestimmt (Dauer 10 s)', () => {
    const s = sim({ params: { durationS: 10 }, maxSeconds: 60 });
    expect(s.seconds).toBeGreaterThanOrEqual(10);
    expect(s.seconds).toBeLessThanOrEqual(13);
  });

  it('Kennzahlen sind stimmig und endlich; Zusatztabelle mit Sekunden und Abweichung', () => {
    const s = sim({ params: { durationS: 30 }, maxSeconds: 80, seed: 11 });
    const r = s.result!;
    for (const m of [r.primary, ...r.secondary]) expect(Number.isFinite(m.value), m.key).toBe(true);
    const run = metric(r, 'best_run')!;
    expect(run).toBeGreaterThan(0);
    expect(run).toBeLessThanOrEqual(31000);
    const rows = r.details?.[0].rows ?? [];
    expect(rows.length).toBe(2);
    for (const row of rows) expect(row.value).toMatch(/\d/);
    expect(rows[0].label).toBe(de.metrics.on_s);
    expect(rows[1].label).toBe(de.metrics.mean_dist);
    expect(rows[1].value).toMatch(/cm$/);
  });

  it('läuft mit allen Bahnen, Tempo, Größen, ohne Bahn und mit Spielraum 0 sauber durch', () => {
    for (const p of [
      { path: 'eight' },
      { path: 'lissajous', speedCmS: 25 },
      { showTrail: 'no' },
      { diameterCm: 1, toleranceCm: 0 },
      { diameterCm: 10, toleranceCm: 3, speedCmS: 40 },
      { speedCmS: 2 },
    ]) {
      const s = sim({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      for (const m of [s.result!.primary, ...s.result!.secondary]) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Handy hochkant und Tablet: auch mit großem Ziel bleibt alles endlich, der Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = sim({ quick: true, w, h, params: { diameterCm: 10 }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = sim({ quick: true, w: 1180, h: 820, resizeAt: { t: 3500, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBeGreaterThan(20);
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(sim({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(sim({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('bei 30 und 144 Bildern pro Sekunde gleiches Ergebnis in der Größenordnung (bildratenunabhängig)', () => {
    const a = sim({ quick: true, fps: 30, seed: 9, params: { speedCmS: 6 }, maxSeconds: 60 });
    const b = sim({ quick: true, fps: 144, seed: 9, params: { speedCmS: 6 }, maxSeconds: 60 });
    expect(Math.abs(a.result!.primary.value - b.result!.primary.value)).toBeLessThan(20);
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(1);
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = sim({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((l) => !/undefined/.test(l))).toBe(true);
    const d = sim({ mode: 'demo', lang: 'it' });
    for (const c of d.captions) expect(c.length).toBeLessThanOrEqual(42);
  });
});

describe('Eingabe mit echten Zeigerereignissen (ohne Autoplay)', () => {
  it('ein zweiter Finger stört nicht; Abheben des ersten beendet den Kontakt; Ergebnis enthält die Fingerzeit', () => {
    const s = sim({
      autoplay: false,
      params: { durationS: 10, diameterCm: 10, toleranceCm: 3 },
      maxSeconds: 60,
      onFrame: (ex, now, ctx) => {
        const down = (id: number, t: number) => ex.pointerDown?.({ id, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t, type: 'touch' });
        const up = (id: number, t: number) => ex.pointerUp?.({ id, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t, type: 'touch' });
        const key = Math.round(now);
        if (key === 2000) down(1, now); // nach der Anlaufzeit (1,8 s)
        if (key === 3000) down(2, now);
        if (key === 4000) up(2, now); // zweiter Finger: ohne Wirkung
        if (key === 6000) up(1, now);
        if (key === 6500) ex.pointerMove?.({ id: 1, x: 1, y: 1, t: now, type: 'touch' }); // nach dem Abheben: ohne Wirkung
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    const touch = metric(r, 'touch_pct')!;
    // Finger 1 lag von 2,0 s bis 6,0 s (Lauf ab ≈ 1,8 s, 10 s lang): ≈ 40 %
    expect(touch).toBeGreaterThan(35);
    expect(touch).toBeLessThan(45);
  });

  it('Tippen vor dem Start und ohne Finger ist wirkungslos; Lauf ohne jede Berührung endet mit 0 %', () => {
    const s = sim({ autoplay: false, params: { durationS: 10 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBe(0);
    expect(metric(s.result!, 'touch_pct')).toBe(0);
    expect(s.result!.tip).toBe('touch');
    expect(s.result!.details?.[0].rows.length).toBe(1); // ohne Fingerkontakt keine mittlere Abweichung
  });
});

describe('Texte', () => {
  const metricKeys = ['on_pct', 'on_s', 'mean_dist', 'best_run', 'losses', 'touch_pct'];

  it('DE und IT haben dieselben Schlüssel (auch in params, metricHints, Listen gleich lang)', () => {
    expect(leaves(itTexts).sort()).toEqual(leaves(de).sort());
    expect(itTexts.progression?.length).toBe(de.progression?.length);
    expect(itTexts.cautions?.length).toBe(de.cautions?.length);
    expect(itTexts.steps.length).toBe(de.steps.length);
  });

  it('alle Kennzahlen der Labor-Übung sind in metrics und metricHints erklärt (Label + Kurzerklärung)', () => {
    for (const t of [de, itTexts]) {
      for (const k of metricKeys) {
        expect(t.metrics[k], k).toBeTruthy();
        expect(t.metricHints?.[k]?.length, k).toBeGreaterThan(15);
      }
      expect(Object.keys(t.metricHints ?? {}).sort()).toEqual([...metricKeys].sort());
      expect(Object.keys(t.metrics).sort()).toEqual([...metricKeys].sort());
    }
  });

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte, Zahlen mit Einheit cm/s eine Kurzform', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
        if (d.summary && d.type === 'number') expect(p?.short, d.key).toMatch(/\{v\}/);
      }
    }
  });

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen', () => {
    const s = sim({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborZielVerfolgen.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
      for (const k of ['touch', 'harder', 'easier', 'lost', 'compare']) expect(t.tips[k], k).toBeTruthy();
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    const all = (t: typeof de) => JSON.stringify(t).toLowerCase();
    for (const bad of ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'verbessert deine']) {
      expect(all(de), bad).not.toContain(bad);
    }
    expect(all(de)).not.toMatch(/\btest(en|s)?\b/);
    expect(all(itTexts)).not.toMatch(/\btest\b/);
    expect(all(itTexts)).not.toMatch(/diagnos|valori normali|valore normale|guarisce/);
  });

  it('Bildunterschriften, Schritte und Untertitel sind kurz', () => {
    for (const t of [de, itTexts]) {
      for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(42);
      for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
      expect(t.tagline.length).toBeLessThanOrEqual(80);
      expect(t.steps.length).toBeLessThanOrEqual(3);
    }
  });

  it('die Anzeige im Spiel enthält keine unaufgelösten Platzhalter', () => {
    const s = sim({ quick: true, maxSeconds: 60 });
    for (const l of s.labels) expect(l).not.toMatch(/[{}]/);
    for (const t of s.texts) expect(t).not.toMatch(/\{[sp]\}/);
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen; ehrliche Einstufung', () => {
    expect(science.id).toBe('labor-ziel-verfolgen');
    expect(science.evidence).toBe('weak');
    expect(science.sources.length).toBeGreaterThanOrEqual(3);
    const urls = new Set<string>();
    for (const s of science.sources) {
      expect(s.url).toMatch(/^https:\/\/doi\.org\/10\.\d{4,9}\/\S+$/);
      expect(s.label.length).toBeGreaterThan(20);
      expect(urls.has(s.url), s.url).toBe(false);
      urls.add(s.url);
    }
    for (const lang of ['de', 'it'] as const) for (const k of ['trains', 'daily', 'research', 'improved'] as const) expect(science.texts[lang][k].length).toBeGreaterThan(20);
    expect(science.texts.de.daily).toMatch(/nicht belegt\.$/);
    expect(science.texts.it.daily).toMatch(/non è dimostrato\.$/);
    expect(science.texts.de.research).toContain('Für genau diese Übung gibt es keine Studie');
    expect(science.texts.it.research).toContain('Per questo esercizio non esiste uno studio');
    const all = JSON.stringify(science.texts).toLowerCase();
    // „keine Normwerte“ darf als Verneinung vorkommen
    for (const bad of ['diagnos', 'heilt', 'sehkraft', 'trainiert das gleitende']) expect(all, bad).not.toContain(bad);
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.1152/jn.2000.84.3.1149', // Engel et al. 2000
      '10.1038/s41598-018-28434-6', // Danion & Flanagan 2018
      '10.1080/00222895.1993.9941639', // Miall et al. 1993
      '10.1523/JNEUROSCI.17-10-03932.1997', // de’Sperati & Viviani 1997
      '10.1007/s00221-012-3009-8', // Eibenberger et al. 2012
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
