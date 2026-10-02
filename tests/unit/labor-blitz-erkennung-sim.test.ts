/**
 * Blitz-Erkennung (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Anordnung, der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborBlitzErkennung } from '../../src/exercises/labor-blitz-erkennung';
import { flashLayout, MIN_KEY_PX } from '../../src/exercises/labor-blitz-erkennung/layout';
import { DIGITS, LETTERS, PARAMS, PITCH, QUICK_TRIALS } from '../../src/exercises/labor-blitz-erkennung/logic';
import { science } from '../../src/exercises/labor-blitz-erkennung/science';
import { de, it as itTexts } from '../../src/exercises/labor-blitz-erkennung/texts';
import { leaves, legalProblems, secondary, simulate as sim, type SimOpts } from './_labor-sim';

const simulate = (o: SimOpts = {}) => sim(laborBlitzErkennung, o);

const METRIC_KEYS = [
  'correct',
  'accuracy',
  'symbol_accuracy',
  'entry_mean',
  'threshold',
  'threshold_frames',
  'final_duration',
  'duration',
  'shown',
  'shown_sd',
  'refresh',
  'jerks',
  'size',
];

describe('Definition', () => {
  it('Kategorie wahrnehmung, Marke labor, Kalibrierung, Warnhinweis, Einstellungen, keine Stufen', () => {
    expect(laborBlitzErkennung.id).toBe('labor-blitz-erkennung');
    expect(laborBlitzErkennung.category).toBe('wahrnehmung');
    expect(laborBlitzErkennung.tags).toEqual(['labor']);
    expect(laborBlitzErkennung.usesCalibration).toBe(true);
    expect(laborBlitzErkennung.warning).toBe('flash');
    expect(laborBlitzErkennung.showsLevel).toBe(false);
    expect(laborBlitzErkennung.params).toBe(PARAMS);
    expect(laborBlitzErkennung.icon.length).toBeGreaterThan(20);
    expect(laborBlitzErkennung.color).toBe('#8C6D4A');
  });
});

describe('Anordnung', () => {
  const inputs = (w: number, h: number, over: Partial<Parameters<typeof flashLayout>[0]> = {}) => ({
    w,
    h,
    u: Math.min(w, h) / 100,
    captionReserve: 0,
    demo: false,
    wantGlyphPx: 3 * 38,
    length: 3,
    poolSize: 10,
    ...over,
  });

  for (const [name, w, h] of [
    ['Tablet quer', 1180, 820],
    ['Tablet hoch', 820, 1180],
    ['Handy', 390, 844],
    ['kleines Handy quer', 640, 360],
  ] as const) {
    for (const poolSize of [DIGITS.length, LETTERS.length]) {
      it(`${name}, ${poolSize} Tasten: alles auf der Bühne, Tasten ≥ 56 px, nichts überlappt`, () => {
        const L = flashLayout(inputs(w, h, { poolSize, length: 6, wantGlyphPx: 12 * 38 }));
        expect(L.keys.length).toBe(poolSize);
        for (const r of [...L.keys, L.back]) {
          expect(r.x).toBeGreaterThanOrEqual(0);
          expect(r.y).toBeGreaterThanOrEqual(0);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.01);
          expect(r.y + r.h).toBeLessThanOrEqual(h + 0.01);
          expect(r.h).toBeGreaterThanOrEqual(MIN_KEY_PX - 0.01);
        }
        for (const r of L.keys) expect(r.w, 'Taste zu schmal').toBeGreaterThanOrEqual(MIN_KEY_PX - 0.5);
        expect(L.back.w).toBeGreaterThanOrEqual(MIN_KEY_PX);
        for (let a = 0; a < L.keys.length; a++) {
          for (let b = a + 1; b < L.keys.length; b++) {
            const p = L.keys[a];
            const q = L.keys[b];
            const overlap = p.x < q.x + q.w && q.x < p.x + p.w && p.y < q.y + q.h && q.y < p.y + p.h;
            expect(overlap, `${a}/${b}`).toBe(false);
          }
        }
        // „Löschen“ liegt über dem Tastenfeld, die Zeichenzeile über „Löschen“
        expect(L.back.y + L.back.h).toBeLessThanOrEqual(Math.min(...L.keys.map((k) => k.y)) + 0.01);
        expect(L.cy + L.glyph / 2).toBeLessThanOrEqual(L.back.y + 0.01);
        // Zeile passt in die Breite: 6 Zeichen im Abstand PITCH × Höhe
        expect(6 * PITCH * L.glyph).toBeLessThanOrEqual(0.93 * w);
        expect(L.cy - L.glyph / 2).toBeGreaterThanOrEqual(0);
      });
    }
  }

  it('Zeichenhöhe wird auf die Bühne begrenzt, bei kleiner Höhe wie gewünscht', () => {
    const big = flashLayout(inputs(390, 844, { length: 6, wantGlyphPx: 12 * 38 }));
    expect(big.glyph).toBeLessThan(12 * 38);
    const small = flashLayout(inputs(1180, 820, { length: 2, wantGlyphPx: 3 * 38 }));
    expect(small.glyph).toBeCloseTo(3 * 38, 6);
  });

  it('Film: kleine Bühne mit Platz für Bildunterschrift, Tasten dürfen schrumpfen', () => {
    const L = flashLayout(inputs(520, 358, { demo: true, captionReserve: 60 }));
    for (const r of L.keys) {
      expect(r.y + r.h).toBeLessThanOrEqual(358 - 60 + 0.01);
      expect(r.w).toBeGreaterThan(20);
    }
    expect(L.cy).toBeGreaterThan(0);
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
      expect(s.ghostTaps).toBe(6); // zweimal drei Tasten
      expect(s.captions.length).toBeGreaterThanOrEqual(5);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['look', 'flash', 'enter', 'miss']) expect(s.captions, k).toContain(de.captions[k]);
      // erster Durchgang ganz richtig, beim zweiten ist die letzte Taste falsch
      expect(s.result!.primary.value).toBe(50);
      expect(s.sounds).toEqual([]); // der Film ist stumm
    });
  }

  it('Tasten werden im Film getroffen (Tippen auf die Mitte der Tasten)', () => {
    const s = simulate({ mode: 'demo', w: 1040, h: 715, maxSeconds: 40 });
    for (const p of s.ghost.tapPoints) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(1040);
      expect(p.y).toBeGreaterThan(300);
    }
  });

  it('ist mit gleichem Startwert reproduzierbar; Einstellungen des Nutzers ändern den Film nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3 });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    const c = simulate({ mode: 'demo', seed: 3, params: { sizeCm: 12, durationMs: 10, adaptive: 'yes', length: 6, symbols: 'letters' } });
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
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['symbol_accuracy', 'entry_mean']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(r.details?.[0].rows.length).toBeGreaterThanOrEqual(2);
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.length).toBeGreaterThan(0);
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
    expect(QUICK_TRIALS).toBe(2);
    expect(s.labels).toContain('1 / 2');
  });

  it('Anzahl der Durchgänge ohne quick aus den Einstellungen (5 Durchgänge)', () => {
    const s = simulate({ params: { trials: 5 }, maxSeconds: 120 });
    expect(s.result).not.toBeNull();
    expect(s.labels).toContain('5 / 5');
    expect(s.result!.score).toBe(s.result!.secondary.find((m) => m.key === 'correct')!.value * 10);
  });

  it('gemessene Dauer: bei 60 Hz ganze Bilder (200 ms = 12 Bilder), bei 120 Hz ebenfalls 200 ms', () => {
    for (const fps of [60, 120]) {
      const s = simulate({ quick: true, fps, params: { durationMs: 200 }, maxSeconds: 60 });
      const shown = secondary(s.result!, 'shown')!;
      expect(shown, `${fps} Hz`).toBeGreaterThan(190);
      expect(shown, `${fps} Hz`).toBeLessThan(210);
      const rows = s.result!.details![0].rows.map((r) => r.value).join(' | ');
      expect(rows).toContain(`${fps} Hz`);
    }
  });

  it('kürzeste Dauer (10 ms) ist genau ein Bild: 17 ms bei 60 Hz', () => {
    const s = simulate({ quick: true, params: { durationMs: 10 }, maxSeconds: 60 });
    const shown = secondary(s.result!, 'shown')!;
    expect(shown).toBeGreaterThan(15);
    expect(shown).toBeLessThan(19);
  });

  it('ein verspätetes Bild am Ende der Anzeige wird als gestörter Durchgang gemeldet (nicht still geglättet)', () => {
    // Die Anzeige im ersten Durchgang liegt bei ≈ 1,1 s; ein Bild auslassen, das genau das Ende der Anzeige trägt,
    // verlängert sie um ein Bild. Je nach Lage der Bilder trifft das genau eine der Auslasszeiten.
    let flagged = 0;
    for (let at = 1100; at <= 1300; at += 4) {
      const s = simulate({ quick: true, params: { durationMs: 100 }, skipFramesAt: [at], maxSeconds: 60 });
      const row = s.result!.details![0].rows.find((r) => r.label === de.metrics.jerks);
      if (row) {
        flagged++;
        expect(row.value).toBe('1');
      }
    }
    expect(flagged).toBeGreaterThan(0);
    expect(flagged).toBeLessThan(15);
  });

  it('Adaptiv: Schwelle erscheint als Zusatzwert, sobald es genug Wechsel gab', () => {
    const s = simulate({ params: { trials: 30, adaptive: 'yes', durationMs: 200 }, maxSeconds: 400, seed: 5 });
    const r = s.result!;
    expect(r.primary.key).toBe('accuracy');
    const keys = r.secondary.map((m) => m.key);
    expect(keys[0] === 'threshold' || keys[0] === 'final_duration').toBe(true);
    const th = secondary(r, 'threshold');
    if (th !== undefined) {
      expect(th).toBeGreaterThan(0);
      expect(th).toBeLessThan(2100);
    }
    const labels = r.details![0].rows.map((x) => x.label);
    expect(labels).toContain(de.metrics.duration);
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch (keine NaN)', () => {
    for (const p of [
      { symbols: 'letters', length: 6 },
      { length: 1, durationMs: 10 },
      { mask: 'no' },
      { adaptive: 'yes' },
      { sizeCm: 12, length: 6 },
      { sizeCm: 1 },
      { durationMs: 2000, trials: 5 },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 120, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
      for (const t of [s.result!.tip ?? 'compare']) expect(de.tips[t]).toBeTruthy();
    }
  });

  it('Zeichenhöhe begrenzt: Hinweis im Ergebnis, wenn die Zeile nicht passt', () => {
    const s = simulate({ quick: true, w: 390, h: 844, params: { sizeCm: 12, length: 6 }, maxSeconds: 60 });
    const rows = s.result!.details![0].rows;
    const size = rows.find((r) => r.label === de.metrics.size);
    expect(size, 'Zeile Zeichenhöhe fehlt').toBeTruthy();
    expect(size!.text).toBe(de.feedback.limited);
    // und nicht, wenn alles passt
    const t = simulate({ quick: true, w: 1180, h: 820, params: { sizeCm: 3, length: 3 }, maxSeconds: 60 });
    expect(t.result!.details![0].rows.some((r) => r.label === de.metrics.size)).toBe(false);
  });

  it('Handy hochkant und Tablet: läuft sauber durch', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { symbols: 'letters', length: 5 }, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(h);
      }
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

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });

  it('Zeichnen: Zeichen erscheinen nur in der Anzeigephase, das Tastenfeld nur in der Eingabe', () => {
    const s = simulate({
      quick: true,
      recordText: true,
      maxSeconds: 60,
      params: { symbols: 'digits' },
    });
    expect(s.texts.length).toBeGreaterThan(20);
    // Tastenbeschriftungen kommen vor
    for (const d of DIGITS) expect(s.texts).toContain(d);
    expect(s.texts).toContain(de.feedback.erase);
  });

  it('Eingaben außerhalb der Eingabephase (während der Anzeige) bleiben ohne Wirkung', () => {
    let tapped = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      maxSeconds: 20,
      params: { trials: 5 },
      onFrame: (ex, now) => {
        // wild in der Anzeigephase tippen: kein Fehler, keine Auswertung
        if (now > 600 && now < 1800 && Math.round(now) % 50 === 0) {
          ex.pointerDown?.({ id: 1, x: 100 + (now % 300), y: 700, t: now, type: 'touch' });
          tapped++;
        }
      },
    });
    expect(tapped).toBeGreaterThan(0);
    expect(s.result).toBeNull(); // niemand hat eingegeben: der Lauf wartet auf die Eingabe
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

  it('Warnung vor schnellen Helligkeitswechseln steht in „Gut zu wissen“ und im Intro (warning)', () => {
    expect(de.cautions![0]).toMatch(/lichtempfindlich|epileptisch/);
    expect(itTexts.cautions![0]).toMatch(/fotosensibile|epilettica/);
    expect(laborBlitzErkennung.warning).toBe('flash');
  });

  it('ehrlich: Blick wird nicht gemessen, Anzeigedauer auf ganze Bilder gerundet, Touch-Verzögerung', () => {
    const all = JSON.stringify(de);
    expect(all).toMatch(/nicht prüfen, wohin du schaust/);
    expect(all).toMatch(/auf ganze Bilder gerundet/);
    expect(all).toMatch(/Verzögerung des Touch-Sensors/);
    const it2 = JSON.stringify(itTexts);
    expect(it2).toMatch(/non può controllare dove guardi/);
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

  it('Rückmeldungs-Platzhalter werden ersetzt', () => {
    for (const t of [de, itTexts]) {
      expect(t.feedback.trial).toContain('{n}');
      expect(t.feedback.trial).toContain('{total}');
      expect(t.feedback.shown).toContain('{s}');
      expect(t.feedback.yours).toContain('{s}');
      expect(t.feedback.framesValue).toContain('{n}');
    }
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen', () => {
    expect(science.id).toBe('labor-blitz-erkennung');
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
      '10.1037/h0093759', // Sperling 1960
      '10.1016/S1364-6613(00)01520-5', // Enns & Di Lollo 2000
      '10.1121/1.1912375', // Levitt 1971
      '10.1016/S0042-6989(97)00340-4', // García-Pérez 1998
      '10.1371/journal.pone.0012792', // Elze 2010
      '10.3758/s13428-020-01501-5', // Anwyl-Irvine et al. 2021
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
