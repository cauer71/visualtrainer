/**
 * Bewegte Ziele ordnen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborZieleOrdnen } from '../../src/exercises/labor-ziele-ordnen';
import { PARAMS } from '../../src/exercises/labor-ziele-ordnen/logic';
import { science } from '../../src/exercises/labor-ziele-ordnen/science';
import { de, it as itTexts } from '../../src/exercises/labor-ziele-ordnen/texts';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborZieleOrdnen, o);

describe('Definition', () => {
  it('Kategorie konzentration, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborZieleOrdnen.id).toBe('labor-ziele-ordnen');
    expect(laborZieleOrdnen.category).toBe('konzentration');
    expect(laborZieleOrdnen.tags).toEqual(['labor']);
    expect(laborZieleOrdnen.usesCalibration).toBe(true);
    expect(laborZieleOrdnen.showsLevel).toBe(false);
    expect(laborZieleOrdnen.params).toBe(PARAMS);
    expect(laborZieleOrdnen.icon.length).toBeGreaterThan(20);
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
      expect(s.captions).toContain(de.captions.wrong); // ein falsches Ziel wird absichtlich berührt
      expect(s.result!.primary.key).toBe('total');
      expect(s.result!.secondary.some((m) => m.key === 'wrong' && m.value >= 1)).toBe(true);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar, der Ton bleibt im Film aus', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { sound: 'yes' } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.sounds).toEqual([]);
  });

  it('Einstellungen des Nutzers ändern den Film nicht (Standard im Film)', () => {
    const a = simulate({ mode: 'demo', params: { count: 15, content: 'words', speedCmS: 30, timeLimitS: 5 } });
    const b = simulate({ mode: 'demo' });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach kurzer Zeit mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(2);
    expect(s.seconds).toBeLessThanOrEqual(26);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'total', unit: 'time', better: 'lower' });
    expect(r.primary.value).toBeGreaterThan(1000);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['solved', 'wrong', 'stray']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
    expect(s.finishCalls).toBe(1);
  });

  it('ohne quick: alle Ziele werden geordnet; Kennzahlen stimmig', () => {
    const s = simulate({ params: { count: 6, motion: 'circle', speedCmS: 4 }, maxSeconds: 120, seed: 11 });
    const r = s.result!;
    expect(get(r, 'solved')).toBe(6);
    expect(r.score).toBe(60);
    expect(r.primary.value).toBeGreaterThan(3000);
    expect(get(r, 't_mean')!).toBeGreaterThan(200);
    expect(get(r, 't_mean')! * 6).toBeLessThanOrEqual(r.primary.value + 50);
    for (const row of r.details?.[0].rows ?? []) expect(row.value).toMatch(/\d/);
  });

  it('läuft mit allen Inhalten, Bewegungsarten, Richtungen und Größen sauber durch', () => {
    for (const p of [
      { content: 'numbers_desc' },
      { content: 'letters', motion: 'circle' },
      { content: 'words', motion: 'ellipse', direction: 'ccw', sizeCm: 3 },
      { content: 'sums', speedCmS: 14 },
      { content: 'products', motion: 'circle', count: 12 },
      { count: 15, sizeCm: 8 },
      { count: 3, sizeCm: 1.5, speedCmS: 30 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 60, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Zeitlimit beendet den Lauf, auch wenn nicht alle Ziele geordnet sind', () => {
    const s = simulate({ params: { timeLimitS: 5, count: 15, speedCmS: 20 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.result!.primary.value).toBeCloseTo(5000, -2);
    expect(get(s.result!, 'solved')!).toBeLessThan(15);
    expect(s.result!.tip).toBe('timeout');
    expect(s.labels.some((l) => /\d s$/.test(l))).toBe(true);
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant und Tablet: auch mit großen Zeichen und langen Wörtern läuft alles durch', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { sizeCm: 8, content: 'words', count: 15 }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf (alle Bewegungsarten): kein Fehler, Lauf endet', () => {
    for (const motion of ['linear', 'circle', 'ellipse']) {
      const s = simulate({ quick: true, w: 1180, h: 820, params: { motion }, resizeAt: { t: 2500, w: 820, h: 1180 }, maxSeconds: 60 });
      expect(s.result, motion).not.toBeNull();
    }
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('läuft bei 30 und 144 Hz gleich lange (bildratenunabhängig, Kreisbahn ohne Zufall im Verlauf)', () => {
    const a = simulate({ params: { count: 4, motion: 'circle', speedCmS: 5 }, fps: 30, maxSeconds: 120, seed: 2 });
    const b = simulate({ params: { count: 4, motion: 'circle', speedCmS: 5 }, fps: 144, maxSeconds: 120, seed: 2 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(a.seconds - b.seconds)).toBeLessThan(8);
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });

  it('Tipp ins Leere vor dem Start oder nach Ende ist wirkungslos', () => {
    let taps = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        if (now < 300) ex.pointerDown?.({ id: 1, x: 10, y: 10, t: now, type: 'touch' });
        if (now > 1000 && Math.round(now) % 97 === 0) {
          ex.pointerDown?.({ id: 2, x: ((now * 7) % ctx.stage.w) | 0, y: ((now * 13) % ctx.stage.h) | 0, t: now, type: 'touch' });
          taps++;
        }
      },
    });
    // ohne Autoplay gibt es im Schnellmodus kein verstecktes Zeitlimit: mit Zufallstipps endet der Lauf nicht von selbst,
    // er darf aber nicht abstürzen und zählt nichts Falsches
    expect(taps).toBeGreaterThan(0);
    expect(s.result === null || Number.isFinite(s.result.primary.value)).toBe(true);
    expect(s.labels.every((t) => !/undefined|NaN/.test(t))).toBe(true);
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
    const metricKeys = ['solved', 'total', 'wrong', 'stray', 't_mean', 't_sd'];
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

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen; jede Aufgabe oben im Bild hat einen Text', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborZieleOrdnen.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
      for (const k of ['few', 'timeout', 'wrong', 'stray', 'harder', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const c of ['numbers', 'numbers_desc', 'letters', 'words', 'sums', 'products']) expect(t.feedback[`task_${c}`], c).toBeTruthy();
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
    expect(science.id).toBe('labor-ziele-ordnen');
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
    expect(science.evidence).toBe('weak');
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.2466/pms.1958.8.3.271', // Reitan 1958 (Metadaten)
      '10.1038/nprot.2006.390', // Bowie & Harvey 2006
      '10.1017/S1355617709090626', // Sánchez-Cubillo et al. 2009
      '10.1016/j.intell.2011.03.001', // Salthouse 2011
      '10.1080/13803390701390483', // Buck et al. 2008
      '10.1167/7.13.14', // Alvarez & Franconeri 2007
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
    // der fehlerhafte zweite Crossref-Eintrag zu Reitan darf nicht vorkommen
    expect(JSON.stringify(science)).not.toContain('pms.8.7.271');
  });
});
