/**
 * Buchstabentafel (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 * Muster: labor-spot-touch-sim.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { laborBuchstabentafel } from '../../src/exercises/labor-buchstabentafel';
import { MAX_BPM, MAX_CHANGES_PER_S, MIN_STEP_MS, PARAMS } from '../../src/exercises/labor-buchstabentafel/logic';
import { science } from '../../src/exercises/labor-buchstabentafel/science';
import { de, it as itTexts } from '../../src/exercises/labor-buchstabentafel/texts';
import { leaves, metric, simulate, type SimOpts, type TextCall } from './_labor-sim-b2';

const sim = (o: SimOpts) => simulate(laborBuchstabentafel, o);

describe('Definition', () => {
  it('Kategorie bewegung, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborBuchstabentafel.id).toBe('labor-buchstabentafel');
    expect(laborBuchstabentafel.category).toBe('bewegung');
    expect(laborBuchstabentafel.tags).toEqual(['labor']);
    expect(laborBuchstabentafel.usesCalibration).toBe(true);
    expect(laborBuchstabentafel.showsLevel).toBe(false);
    expect(laborBuchstabentafel.params).toBe(PARAMS);
    expect(laborBuchstabentafel.color).toBe('#2E6DB4');
    expect(laborBuchstabentafel.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = sim({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBeGreaterThanOrEqual(10);
      expect(s.captions.length).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['wait', 'read', 'next', 'count'] as const) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.secondary.some((m) => m.key === 'symbols' && m.value === 12)).toBe(true);
      expect(s.result!.primary.value).toBeGreaterThan(3000);
      expect(s.sounds).toEqual([]); // im Film bleibt der Ton aus
    });
  }

  it('ist mit gleichem Startwert reproduzierbar', () => {
    const a = sim({ mode: 'demo', seed: 3 });
    const b = sim({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });

  it('Einstellungen der Person ändern den Film nicht (Standard im Film)', () => {
    const a = sim({ mode: 'demo', params: { rows: 8, cols: 8, groupSize: 6, pace: 'beat', bpm: 140, sizeCm: 8 } });
    const b = sim({ mode: 'demo' });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('eigenes Tempo: kleine Tafel (2 × 2 × 2), Hauptwert Gesamtzeit, Zusatzwerte und Tabelle', () => {
    const s = sim({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(3);
    expect(s.seconds).toBeLessThanOrEqual(12);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'total', unit: 'time', better: 'lower' });
    expect(r.primary.value).toBeGreaterThan(2000);
    expect(r.primary.value).toBeLessThan(12000);
    expect(r.level).toBe(1);
    expect(r.score).toBe(40); // 8 Zeichen
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['per_min', 'step_mean']));
    for (const m of [r.primary, ...r.secondary]) expect(Number.isFinite(m.value), m.key).toBe(true);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    const rows = r.details?.[0].rows ?? [];
    expect(rows.map((x) => x.label)).toEqual(expect.arrayContaining([de.metrics.symbols]));
    for (const row of rows) expect(row.value).toMatch(/\d/);
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.every((l) => !/undefined|NaN|\{/.test(l))).toBe(true);
    expect(s.labels).toContain('0 / 8');
    expect(s.labels).toContain('7 / 8');
    expect(s.sounds[s.sounds.length - 1]).toBe('done');
    expect(s.ghostTaps).toBe(9); // Start + 8 Zeichen
  });

  it('Takt: Gesamtzeit steht durch Zeichenzahl und Takt fest, ein Taktschlag je Zeichen', () => {
    const s = sim({ quick: true, params: { pace: 'beat', bpm: 60 }, maxSeconds: 60 });
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'total', unit: 'time', better: 'lower' });
    expect(r.primary.value).toBe(8000);
    expect(r.secondary.map((m) => m.key)).toEqual(['symbols', 'bpm']);
    expect(metric(r, 'bpm')).toBe(60);
    expect(s.sounds.filter((x) => x === 'beat').length).toBe(9); // der letzte Schlag beendet die Tafel
    expect(s.ghostTaps).toBe(0);
    expect(r.tip).toBe('beat');
    const fast = sim({ quick: true, params: { pace: 'beat', bpm: 140 }, maxSeconds: 60 });
    expect(fast.result!.primary.value).toBe(Math.round(8 * (60000 / 140)));
  });

  it('Ton nur, wenn „Ton“ an ist', () => {
    const off = sim({ quick: true, params: { sound: 'no', pace: 'beat' }, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
    const offSelf = sim({ quick: true, params: { sound: 'no' }, maxSeconds: 60 });
    expect(offSelf.sounds).toEqual([]);
    const on = sim({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds.filter((x) => x === 'tap').length).toBe(9);
  });

  it('läuft mit allen Leseordnungen, Zeichen, Größen, Abständen und Takten sauber durch', () => {
    for (const p of [
      { order: 'letterwise' },
      { symbols: 'digits', groupSize: 6 },
      { sizeCm: 8, groupGapCm: 10 },
      { sizeCm: 0.8, letterGapCm: 0, groupGapCm: 0.5 },
      { pace: 'beat', order: 'letterwise', bpm: 20 },
      { pace: 'beat', symbols: 'digits', bpm: 140 },
      { rows: 1, cols: 1, groupSize: 1 },
    ]) {
      const s = sim({ quick: true, params: p, maxSeconds: 80, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      for (const m of [s.result!.primary, ...s.result!.secondary]) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('große Tafel auf kleinem Bildschirm: wird verkleinert, Hinweis erscheint, Ergebnis nennt die Verkleinerung', () => {
    const s = sim({ w: 390, h: 700, params: { rows: 8, cols: 8, groupSize: 1, sizeCm: 8, groupGapCm: 10, pace: 'beat', bpm: 140 }, maxSeconds: 120 });
    expect(s.result).not.toBeNull();
    expect(s.texts.some((t) => /verkleinert/.test(t))).toBe(true);
    const rows = s.result!.details?.[0].rows ?? [];
    const scale = rows.find((x) => x.label === de.metrics.scale);
    expect(scale).toBeTruthy();
    expect(scale!.value).toMatch(/\d+ %/);
    // eine Tafel, die passt, zeigt keinen Hinweis und keine Zeile
    const ok = sim({ quick: true, maxSeconds: 60 });
    expect(ok.texts.some((t) => /verkleinert/.test(t))).toBe(false);
    expect((ok.result!.details?.[0].rows ?? []).some((x) => x.label === de.metrics.scale)).toBe(false);
  });

  it('Handy hochkant und Tablet: auch mit großen Zeichen läuft alles, der Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = sim({ quick: true, w, h, params: { sizeCm: 8 }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet, alle Zeichen werden gezählt', () => {
    const s = sim({ quick: true, w: 1180, h: 820, resizeAt: { t: 3000, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.result!.secondary.some((m) => m.key === 'step_mean')).toBe(true);
    const b = sim({ quick: true, params: { pace: 'beat' }, w: 1180, h: 820, resizeAt: { t: 4000, w: 390, h: 844 }, maxSeconds: 60 });
    expect(b.result!.primary.value).toBe(8000);
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(sim({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(sim({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = sim({ quick: true, lang: 'it', maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((l) => !/undefined/.test(l))).toBe(true);
    const d = sim({ mode: 'demo', lang: 'it' });
    for (const c of d.captions) expect(c.length).toBeLessThanOrEqual(42);
  });
});

describe('Eingabe mit echten Zeigerereignissen und Tasten (ohne Autoplay)', () => {
  it('Tippen irgendwo und Leertaste gehen weiter, Doppeltipps zählen nicht, das letzte Zeichen beendet', () => {
    const s = sim({
      autoplay: false,
      params: { rows: 1, cols: 2, groupSize: 2 },
      maxSeconds: 60,
      onFrame: (ex, now, ctx) => {
        const at = (ms: number) => Math.abs(now - ms) < 8.4; // ein Bild
        const tap = () => ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
        if (at(1000)) tap(); // Start
        if (at(1100)) tap(); // Doppeltipp: ignoriert
        if (at(1700)) tap(); // Zeichen 2
        if (at(2400)) ex.keyDown?.(' ', now); // Zeichen 3 (Leertaste)
        if (at(2500)) ex.keyDown?.('Enter', now); // Doppeltipp per Taste: ignoriert
        if (at(3100)) ex.keyDown?.('Enter', now); // Zeichen 4
        if (at(3200)) ex.keyDown?.('x', now); // andere Taste: ohne Wirkung
        if (at(3800)) tap(); // Ende der Tafel
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.key).toBe('total');
    // vom Start (1,0 s) bis zum letzten Tipp (3,8 s) ≈ 2,8 s, vier Abstände von je ≈ 0,7 s
    expect(r.primary.value).toBeGreaterThan(2700);
    expect(r.primary.value).toBeLessThan(2900);
    expect(metric(r, 'step_mean')).toBeGreaterThan(650);
    expect(metric(r, 'step_mean')).toBeLessThan(750);
  });

  it('im Takt-Modus tut Tippen nichts; ohne jedes Tippen im eigenen Tempo endet der Lauf nicht von selbst', () => {
    const beat = sim({
      autoplay: false,
      params: { pace: 'beat', rows: 1, cols: 1, groupSize: 3, bpm: 60 },
      maxSeconds: 30,
      onFrame: (ex, now, ctx) => {
        if (Math.round(now) % 100 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
      },
    });
    expect(beat.result!.primary.value).toBe(3000);
    const idle = sim({ autoplay: false, params: { rows: 1, cols: 1, groupSize: 3 }, maxSeconds: 20 });
    expect(idle.result).toBeNull();
  });
});

describe('Weiche Übergänge, kein Blinken im Takt', () => {
  const isLetter = (c: TextCall) => /^[A-Z0-9]$/.test(c.s);
  // Blauanteil: hell (247) ↔ Markengelb (138) ↔ blass (132); ohne Überblendung wäre ein Schritt ≥ 105
  const red = (c: TextCall) => Number(/rgb\(\d+,\d+,(\d+)\)/.exec(c.color)?.[1] ?? Number.NaN);

  for (const bpm of [60, 140]) {
    it(`Takt ${bpm}: die Marke wechselt weich (Schrift ändert sich je Bild nur um einen Bruchteil, Wechsel dauert ≥ 100 ms)`, () => {
      const s = sim({ params: { pace: 'beat', bpm, rows: 1, cols: 2, groupSize: 3 }, recordFrames: true, maxSeconds: 60, seed: 3 });
      expect(s.result).not.toBeNull();
      const prev = new Map<string, number>();
      let maxStep = 0;
      let steps = 0;
      for (const frame of s.frames) {
        for (const c of frame.filter(isLetter)) {
          const k = `${c.s}@${Math.round(c.x)},${Math.round(c.y)}`;
          const r = red(c);
          const before = prev.get(k);
          if (before !== undefined && before !== r) {
            maxStep = Math.max(maxStep, Math.abs(r - before));
            steps++;
          }
          prev.set(k, r);
        }
      }
      // mit 130 ms Überblendung bei 60 Bildern/s höchstens ≈ 30 je Bild
      expect(maxStep).toBeLessThanOrEqual(60);
      expect(steps).toBeGreaterThan(10);
    });
  }

  it('höchster Takt und Tippgrenze: weniger als 2,5 Wechsel pro Sekunde (Takt) bzw. 3 (Tippen)', () => {
    const bpm = PARAMS.find((d) => d.key === 'bpm') as { max: number };
    expect(bpm.max).toBe(MAX_BPM);
    expect(bpm.max / 60).toBeLessThanOrEqual(MAX_CHANGES_PER_S);
    expect(1000 / MIN_STEP_MS).toBeLessThan(3);
  });
});

describe('Texte', () => {
  const metricKeys = ['symbols', 'total', 'per_min', 'step_mean', 'step_sd', 'step_cv', 'bpm', 'scale'];

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

  it('jede Einstellung hat Beschriftung und Erklärung, jede Auswahl Namen für alle Werte, Kurzform bei Zahlen der Kurzfassung', () => {
    for (const t of [de, itTexts]) {
      for (const d of PARAMS) {
        const p = t.params?.[d.key];
        expect(p?.label, d.key).toBeTruthy();
        expect(p?.hint?.length, d.key).toBeGreaterThan(15);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
        if (d.summary && d.type === 'number') expect(p?.short, d.key).toMatch(/\{v\}/);
      }
    }
  });

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen', () => {
    for (const pace of ['self', 'beat']) {
      const s = sim({ quick: true, params: { pace }, maxSeconds: 60 });
      for (const lang of ['de', 'it'] as const) {
        const t = laborBuchstabentafel.texts[lang];
        expect(t.metrics[s.result!.primary.key]).toBeTruthy();
        for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
        for (const k of ['quick', 'uneven', 'beat', 'compare']) expect(t.tips[k], k).toBeTruthy();
      }
    }
  });

  it('Rechtsregeln: why endet mit „nicht belegt“, keine Wirk-/Heil-/Sicherheitsversprechen, kein Test/Diagnose/Normwert', () => {
    expect(de.why.trim()).toMatch(/nicht belegt\.$/);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato che .*\.$/i);
    const all = (t: typeof de) => JSON.stringify(t).toLowerCase();
    for (const bad of ['diagnos', 'normwert', 'heilt', 'heilung', 'sicherer im', 'besseres sehen', 'trainiert deine augenmuskeln', 'sehkraft', 'schult ']) {
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
    for (const t of s.texts) expect(t).not.toMatch(/\{[abp]\}/);
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen; ehrliche Einstufung', () => {
    expect(science.id).toBe('labor-buchstabentafel');
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
    for (const bad of ['diagnos', 'heilt', 'sehkraft', 'schult ']) expect(all, bad).not.toContain(bad);
  });

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed, 02.10.2026)', () => {
    const verified = [
      '10.1038/nn.2187', // Pelli & Tillman 2008
      '10.1016/j.tics.2011.02.005', // Whitney & Levi 2011
      '10.1097/00006324-200101010-00014', // Liu & Arditi 2001
      '10.1016/0042-6989(95)00294-4', // Deubel & Schneider 1996
      '10.1037/0033-2909.124.3.372', // Rayner 1998
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
