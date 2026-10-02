/**
 * Peripheres Erkennen (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Anordnung, der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborPeripheresErkennen } from '../../src/exercises/labor-peripheres-erkennen';
import { MIN_BUTTON_PX, periLayout } from '../../src/exercises/labor-peripheres-erkennen/layout';
import { PARAMS, QUICK_TRIALS } from '../../src/exercises/labor-peripheres-erkennen/logic';
import { science } from '../../src/exercises/labor-peripheres-erkennen/science';
import { de, it as itTexts } from '../../src/exercises/labor-peripheres-erkennen/texts';
import { leaves, legalProblems, secondary, simulate as sim, type SimOpts } from './_labor-sim';

const simulate = (o: SimOpts = {}) => sim(laborPeripheresErkennen, o);

const METRIC_KEYS = ['correct', 'accuracy', 'chance', 'acc_horizontal', 'acc_vertical', 'ecc', 'rt_mean', 'threshold', 'threshold_frames', 'duration', 'shown', 'refresh', 'jerks'];

describe('Definition', () => {
  it('Kategorie wahrnehmung, Marke labor, Kalibrierung, Warnhinweis, Einstellungen, keine Stufen', () => {
    expect(laborPeripheresErkennen.id).toBe('labor-peripheres-erkennen');
    expect(laborPeripheresErkennen.category).toBe('wahrnehmung');
    expect(laborPeripheresErkennen.tags).toEqual(['labor']);
    expect(laborPeripheresErkennen.usesCalibration).toBe(true);
    expect(laborPeripheresErkennen.warning).toBe('flash');
    expect(laborPeripheresErkennen.showsLevel).toBe(false);
    expect(laborPeripheresErkennen.params).toBe(PARAMS);
    expect(laborPeripheresErkennen.icon.length).toBeGreaterThan(20);
  });
});

describe('Anordnung', () => {
  const inp = (w: number, h: number, choices: number, over: Partial<Parameters<typeof periLayout>[0]> = {}) => ({
    w,
    h,
    u: Math.min(w, h) / 100,
    demo: false,
    captionReserve: 0,
    choices,
    ...over,
  });
  for (const [name, w, h] of [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy', 390, 844],
    ['kleines Handy quer', 640, 360],
  ] as const) {
    for (const n of [2, 3, 4, 5, 6]) {
      it(`${name}, ${n} Antworten: Felder auf der Bühne, ≥ 56 px, ohne Überlappung, unter der Mitte`, () => {
        const L = periLayout(inp(w, h, n));
        expect(L.buttons.length).toBe(n);
        for (const r of L.buttons) {
          expect(r.x).toBeGreaterThanOrEqual(0);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.01);
          expect(r.y).toBeGreaterThanOrEqual(0);
          expect(r.y + r.h).toBeLessThanOrEqual(h + 0.01);
          expect(r.h).toBeGreaterThanOrEqual(MIN_BUTTON_PX - 0.01);
          expect(r.w).toBeGreaterThanOrEqual(MIN_BUTTON_PX - 0.5);
        }
        for (let a = 0; a < n; a++) {
          for (let b = a + 1; b < n; b++) {
            const p = L.buttons[a];
            const q = L.buttons[b];
            expect(p.x < q.x + q.w && q.x < p.x + p.w && p.y < q.y + q.h && q.y < p.y + p.h, `${a}/${b}`).toBe(false);
          }
        }
        // die Mitte (Blickpunkt) liegt in der Bühne, die nutzbare Fläche symmetrisch darum
        expect(L.cx).toBeCloseTo(w / 2, 6);
        expect(L.cy - L.fieldH / 2).toBeGreaterThanOrEqual(0);
        expect(L.cy + L.fieldH / 2).toBeLessThanOrEqual(h + 0.01);
        expect(L.cx - L.fieldW / 2).toBeGreaterThanOrEqual(0);
        expect(L.cx + L.fieldW / 2).toBeLessThanOrEqual(w + 0.01);
      });
    }
  }

  it('Film: Antwortfelder über Hand und Bildunterschrift, kleine Bühne', () => {
    const L = periLayout(inp(520, 358, 3, { demo: true, captionReserve: 60 }));
    for (const r of L.buttons) expect(r.y + r.h).toBeLessThanOrEqual(358 - 60 + 0.01);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt zweimal, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBe(2);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['look', 'flash', 'pick', 'miss']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.value).toBe(50); // erster richtig, zweiter absichtlich falsch
      expect(s.sounds).toEqual([]);
    });
  }

  it('reproduzierbar; Einstellungen des Nutzers ändern den Film nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3 });
    const c = simulate({ mode: 'demo', seed: 3, params: { eccentricityDeg: 40, sizeCm: 12, directions: 'all4', choices: 6, adaptive: 'yes', durationMs: 10 } });
    expect(JSON.stringify(c.result)).toBe(JSON.stringify(a.result));
    expect(c.seconds).toBeCloseTo(a.seconds, 6);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach wenigen Durchgängen mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeLessThanOrEqual(14);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['chance', 'rt_mean']));
    expect(secondary(r, 'chance')).toBe(25);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    const rows = r.details![0].rows;
    expect(rows.find((x) => x.label === de.metrics.ecc)!.value).toMatch(/^\d+,\d °$/);
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
    expect(s.labels).toContain(`1 / ${QUICK_TRIALS}`);
  });

  it('Anzahl der Durchgänge ohne quick aus den Einstellungen (8 Durchgänge)', () => {
    const s = simulate({ params: { trials: 8 }, maxSeconds: 200 });
    expect(s.result).not.toBeNull();
    expect(s.labels).toContain('8 / 8');
  });

  it('tatsächlicher Winkel: bei genug Platz wie eingestellt, auf kleiner Bühne begrenzt mit Meldung und Hinweis', () => {
    const big = simulate({ quick: true, w: 1180, h: 820, params: { eccentricityDeg: 10 }, pxPerCm: 38, maxSeconds: 60 });
    const ecc = big.result!.details![0].rows.find((x) => x.label === de.metrics.ecc)!;
    expect(ecc.value).toBe('10,0 °');
    expect(ecc.text).toBe(de.feedback.eccAsSet);
    expect(big.toasts).toEqual([]);
    const small = simulate({ quick: true, w: 390, h: 844, params: { eccentricityDeg: 30 }, pxPerCm: 38, maxSeconds: 60 });
    const e2 = small.result!.details![0].rows.find((x) => x.label === de.metrics.ecc)!;
    expect(e2.text).toBe('eingestellt: 30 °, begrenzt');
    expect(parseFloat(e2.value.replace(',', '.'))).toBeLessThan(30);
    expect(small.toasts.some((t) => /begrenzt/.test(t))).toBe(true);
    expect(small.toasts.every((t) => !/\{|undefined/.test(t))).toBe(true);
    expect(small.result!.tip).toBe('limited');
  });

  it('gemessene Dauer: ganze Bilder bei 60 und 120 Hz', () => {
    for (const fps of [60, 120]) {
      const s = simulate({ quick: true, fps, params: { durationMs: 150 }, maxSeconds: 60 });
      const shown = secondary(s.result!, 'shown')!;
      expect(shown, `${fps} Hz`).toBeGreaterThan(140);
      expect(shown, `${fps} Hz`).toBeLessThan(160);
      expect(s.result!.details![0].rows.map((r) => r.value).join('|')).toContain(`${fps} Hz`);
    }
  });

  it('Adaptiv: Schwelle als erster Zusatzwert, sobald es genug Wechsel gab', () => {
    const s = simulate({ params: { trials: 32, adaptive: 'yes' }, maxSeconds: 400, seed: 5 });
    const r = s.result!;
    expect(r.primary.key).toBe('accuracy');
    const th = secondary(r, 'threshold');
    if (th !== undefined) {
      expect(r.secondary[0].key).toBe('threshold');
      expect(th).toBeGreaterThan(0);
    }
    expect(r.details![0].rows.map((x) => x.label)).toContain(de.metrics.duration);
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch (keine NaN)', () => {
    for (const p of [
      { directions: 'all4', eccentricityDeg: 40 },
      { eccentricityDeg: 2, sizeCm: 12 },
      { choices: 2 },
      { choices: 6 },
      { durationMs: 10 },
      { adaptive: 'yes', directions: 'all4' },
      { sizeCm: 1, eccentricityDeg: 25 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 120, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
      expect(de.tips[s.result!.tip ?? 'compare']).toBeTruthy();
    }
  });

  it('Handy hochkant und Tablet: Antwortfelder werden getroffen, nichts liegt außerhalb', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { choices: 6, directions: 'all4' }, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(h);
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf, reduzierte Bewegung, ältere Attrappen ohne params/calib', () => {
    expect(simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis, Meldungen und Beschriftungen ohne Platzhalter-Reste', () => {
    const s = simulate({ quick: true, lang: 'it', w: 390, h: 844, params: { eccentricityDeg: 30 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    for (const t of [...s.toasts, ...s.labels]) expect(t).not.toMatch(/undefined|\{/);
    expect(s.toasts.some((t) => /limitata/.test(t))).toBe(true);
  });

  it('Zeichnen: Antwortbuchstaben und Frage erscheinen; ohne Eingabe wartet der Lauf', () => {
    const s = simulate({ quick: true, recordText: true, maxSeconds: 60 });
    expect(s.texts).toContain(de.feedback.ask);
    expect(s.texts.filter((x) => /^[A-Z]$/.test(x)).length).toBeGreaterThan(5);
    const w = simulate({ quick: true, autoplay: false, maxSeconds: 15 });
    expect(w.result).toBeNull();
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
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
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

  it('Warnung vor Blitzen im Intro (warning) und in „Gut zu wissen“', () => {
    expect(laborPeripheresErkennen.warning).toBe('flash');
    expect(de.cautions![0]).toMatch(/lichtempfindlich|epileptisch/);
    expect(itTexts.cautions![0]).toMatch(/fotosensibile|epilettica/);
  });

  it('ehrlich: kein Eye-Tracking, auf ganze Bilder gerundet, Begrenzung des Winkels, Touch-Verzögerung, Kalibrierung', () => {
    const all = JSON.stringify(de);
    expect(all).toMatch(/kein Eye-Tracking/);
    expect(all).toMatch(/auf ganze Bilder gerundet/);
    expect(all).toMatch(/begrenzt/);
    expect(all).toMatch(/Verzögerung des Touch-Sensors/);
    expect(all).toMatch(/Bildschirm kalibrieren/);
    const it2 = JSON.stringify(itTexts);
    expect(it2).toMatch(/non c’è eye-tracking/);
    expect(it2).toMatch(/immagini intere/);
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
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen', () => {
    expect(science.id).toBe('labor-peripheres-erkennen');
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
      '10.1364/JOSAA.5.002210', // Ball et al. 1988
      '10.1167/11.5.13', // Strasburger et al. 2011
      '10.1016/0042-6989(74)90049-2', // Anstis 1974
      '10.1097/OPX.0000000000001732', // Vater & Strasburger 2021
      '10.1121/1.1912375', // Levitt 1971
      '10.1016/S0042-6989(97)00340-4', // García-Pérez 1998
      '10.1371/journal.pone.0012792', // Elze 2010
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
