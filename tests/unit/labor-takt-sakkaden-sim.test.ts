/**
 * Takt-Sakkaden (Labor): Durchlauf ohne Browser (virtuelle Zeit, Geister-Hand wie im Runner, Attrappen-Zeichenfläche)
 * sowie Prüfung der Texte (DE/IT gleiche Schlüssel, alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 * Muster: labor-spot-touch-sim.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { laborTaktSakkaden } from '../../src/exercises/labor-takt-sakkaden';
import { changesPerSecond, MAX_CHANGES_PER_S, PARAMS, QUICK_DURATION_S } from '../../src/exercises/labor-takt-sakkaden/logic';
import { science } from '../../src/exercises/labor-takt-sakkaden/science';
import { de, it as itTexts } from '../../src/exercises/labor-takt-sakkaden/texts';
import { leaves, metric, simulate, type SimOpts, type TextCall } from './_labor-sim';

const sim = (o: SimOpts) => simulate(laborTaktSakkaden, o);

describe('Definition', () => {
  it('Kategorie bewegung, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborTaktSakkaden.id).toBe('labor-takt-sakkaden');
    expect(laborTaktSakkaden.category).toBe('bewegung');
    expect(laborTaktSakkaden.tags).toEqual(['labor']);
    expect(laborTaktSakkaden.usesCalibration).toBe(true);
    expect(laborTaktSakkaden.showsLevel).toBe(false);
    expect(laborTaktSakkaden.params).toBe(PARAMS);
    expect(laborTaktSakkaden.color).toBe('#2E6DB4');
    expect(laborTaktSakkaden.icon.length).toBeGreaterThan(20);
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
      expect(s.ghostTaps).toBeGreaterThanOrEqual(4);
      expect(s.captions.length).toBeGreaterThanOrEqual(5);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['wait', 'jump', 'read', 'touch', 'late', 'count'] as const) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.secondary.some((m) => m.key === 'beats' && m.value === 8)).toBe(true);
      expect(s.result!.primary.value).toBeGreaterThan(40); // ein Zeichen wird absichtlich ausgelassen
      expect(s.result!.primary.value).toBeLessThan(100);
      expect(s.sounds).not.toContain('beat'); // im Film bleibt der Ton aus
    });
  }

  it('ist mit gleichem Startwert reproduzierbar', () => {
    const a = sim({ mode: 'demo', seed: 3 });
    const b = sim({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });

  it('Einstellungen der Person ändern den Film nicht (Standard im Film)', () => {
    const a = sim({ mode: 'demo', params: { bpm: 140, durationS: 300, sizeCm: 12, pattern: 'grid9', touch: 'no' } });
    const b = sim({ mode: 'demo' });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('ohne Berühren: endet nach der verkürzten Dauer, Hauptwert = gezeigte Zeichen, Zusatzwerte Takt und Positionen', () => {
    const s = sim({ quick: true, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    // Vorlauf 1,2 s + eine Taktlänge + 8 Schläge + eine Taktlänge
    expect(s.seconds).toBeGreaterThanOrEqual(QUICK_DURATION_S);
    expect(s.seconds).toBeLessThanOrEqual(QUICK_DURATION_S + 4);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'beats', value: 8, unit: 'count', better: 'higher' });
    expect(r.level).toBe(1);
    expect(r.secondary.map((m) => m.key)).toEqual(['bpm', 'positions']);
    expect(metric(r, 'bpm')).toBe(60);
    expect(metric(r, 'positions')).toBe(4);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(r.tip).toBe('read');
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels.every((l) => !/undefined|NaN|\{/.test(l))).toBe(true);
    const rows = r.details?.[0].rows ?? [];
    expect(rows.map((x) => x.label)).toEqual([de.metrics.amp_cm, de.metrics.amp_deg]);
    for (const row of rows) expect(row.value).toMatch(/\d/);
    expect(s.ghostTaps).toBe(0); // ohne Berühren tippt niemand
  });

  it('mit Berühren: Hauptwert = Trefferquote, Zusatzwerte und Tabelle, Hand tippt im Takt', () => {
    const s = sim({ quick: true, params: { touch: 'yes' }, maxSeconds: 60, seed: 4 });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThan(40);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['beats', 'stray']));
    for (const m of [r.primary, ...r.secondary]) expect(Number.isFinite(m.value), m.key).toBe(true);
    const lat = metric(r, 'lat_mean');
    if (lat !== undefined) {
      expect(lat).toBeGreaterThan(200);
      expect(lat).toBeLessThan(900);
    }
    const labels = (r.details?.[0].rows ?? []).map((x) => x.label);
    expect(labels).toEqual(expect.arrayContaining([de.metrics.hits, de.metrics.misses, de.metrics.bpm, de.metrics.amp_cm, de.metrics.amp_deg]));
    expect(s.ghostTaps).toBeGreaterThan(3);
    expect(s.scores.some((v) => v !== null && v > 0)).toBe(true);
    expect(r.score).toBeGreaterThan(0);
    expect(r.score % 10).toBe(0); // 10 Punkte je Treffer
  });

  it('normale Dauer wird von den Einstellungen bestimmt (Dauer 10 s, Takt 60)', () => {
    const s = sim({ params: { durationS: 10 }, maxSeconds: 60 });
    expect(s.result!.primary.value).toBe(10);
    expect(s.seconds).toBeGreaterThanOrEqual(10);
    expect(s.seconds).toBeLessThanOrEqual(14);
  });

  it('Ton: ein Taktschlag je Zeichen, nur wenn „Metronom-Ton“ an ist; Ergebnis-Ton nur dann', () => {
    const on = sim({ quick: true, params: { sound: 'yes' }, maxSeconds: 60 });
    expect(on.sounds.filter((x) => x === 'beat').length).toBe(on.result!.primary.value);
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
    const off = sim({ quick: true, params: { sound: 'no' }, maxSeconds: 60 });
    expect(off.sounds).toEqual([]);
  });

  it('läuft mit allen Mustern, Reihenfolgen, Zeichen, Takten und Größen sauber durch', () => {
    for (const p of [
      { pattern: 'corners5', order: 'random', symbols: 'letters' },
      { pattern: 'horizontal', symbols: 'syllables', touch: 'yes' },
      { pattern: 'vertical', order: 'random', touch: 'yes' },
      { pattern: 'grid9', order: 'random', symbols: 'syllables', touch: 'yes', bpm: 140 },
      { bpm: 20, touch: 'yes' },
      { sizeCm: 12, touch: 'yes' },
      { sizeCm: 1, touch: 'yes', bpm: 100 },
    ]) {
      const s = sim({ quick: true, params: p, maxSeconds: 80, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      for (const m of [s.result!.primary, ...s.result!.secondary]) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Handy hochkant und Tablet: auch mit großen Zeichen läuft alles, der Lauf endet', () => {
    for (const [w, h] of [
      [390, 700],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = sim({ quick: true, w, h, params: { sizeCm: 12, pattern: 'grid9', touch: 'yes' }, pxPerCm: 60, maxSeconds: 60 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet, alle Schläge werden gezählt', () => {
    const s = sim({ quick: true, params: { touch: 'yes' }, w: 1180, h: 820, resizeAt: { t: 4000, w: 820, h: 1180 }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(metric(s.result!, 'beats')).toBe(8);
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(sim({ quick: true, reducedMotion: true, maxSeconds: 60 }).result).not.toBeNull();
    expect(sim({ quick: true, noCtxParams: true, maxSeconds: 60 }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = sim({ quick: true, lang: 'it', params: { touch: 'yes' }, maxSeconds: 60 });
    expect(s.result).not.toBeNull();
    expect(s.labels.every((l) => !/undefined/.test(l))).toBe(true);
    const d = sim({ mode: 'demo', lang: 'it' });
    for (const c of d.captions) expect(c.length).toBeLessThanOrEqual(42);
  });
});

describe('Eingabe mit echten Zeigerereignissen (ohne Autoplay)', () => {
  const isSymbol = (c: TextCall) => /^[0-9A-Z]{1,2}$/.test(c.s);

  it('Tippen auf das gezeigte Zeichen trifft, ein Doppeltipp zählt nicht, Tippen daneben ist ein Fehltipp', () => {
    let tappedKey = '';
    let tapsAfter = 0;
    let far = 0;
    const s = sim({
      autoplay: false,
      recordFrames: true,
      params: { touch: 'yes', durationS: 10, bpm: 60, symbols: 'letters', order: 'random', pattern: 'grid9' },
      maxSeconds: 60,
      seed: 8,
      onFrame: (ex, now, _ctx, frames) => {
        if (now < 100) ex.pointerDown?.({ id: 1, x: 10, y: 10, t: now, type: 'touch' }); // vor dem Start: ohne Wirkung
        const last = frames[frames.length - 1];
        if (!last) return;
        const settled = last.filter((c) => isSymbol(c) && c.alpha > 0.99);
        if (settled.length !== 1) return;
        const c = settled[0];
        const key = `${c.s}@${Math.round(c.x)},${Math.round(c.y)}`;
        const tap = (x: number, y: number) => ex.pointerDown?.({ id: 1, x, y, t: now, type: 'touch' });
        if (key !== tappedKey) {
          tappedKey = key;
          tapsAfter = 0;
          tap(c.x, c.y); // Treffer
          return;
        }
        tapsAfter++;
        if (tapsAfter === 1) tap(c.x, c.y); // Doppeltipp: ignoriert
        if (tapsAfter === 8 && Math.round(now / 1000) % 2 === 0) {
          far++;
          tap(c.x + 400, c.y); // weit daneben: Fehltipp (außerhalb jedes Zeichens)
        }
      },
    });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(r.primary.key).toBe('accuracy');
    expect(r.primary.value).toBeGreaterThanOrEqual(90); // alle gezeigten Zeichen getroffen (das letzte evtl. nicht)
    expect(metric(r, 'stray')).toBe(far);
    expect(far).toBeGreaterThan(0);
    const lat = metric(r, 'lat_mean')!;
    expect(lat).toBeGreaterThan(100);
    expect(lat).toBeLessThan(400);
  });

  it('ohne jede Berührung endet der Lauf mit 0 % und dem Tipp „langsamer“; ohne Berühren-Modus bleibt Tippen wirkungslos', () => {
    const none = sim({ autoplay: false, params: { touch: 'yes', durationS: 10 }, maxSeconds: 60 });
    expect(none.result!.primary.value).toBe(0);
    expect(metric(none.result!, 'stray')).toBe(0);
    expect(none.result!.tip).toBe('slower');
    const noTouch = sim({
      autoplay: false,
      params: { touch: 'no', durationS: 10 },
      maxSeconds: 60,
      onFrame: (ex, now, ctx) => {
        if (Math.round(now) % 200 === 0) ex.pointerDown?.({ id: 1, x: ctx.stage.w / 2, y: ctx.stage.h / 2, t: now, type: 'touch' });
      },
    });
    expect(noTouch.result!.primary).toMatchObject({ key: 'beats', value: 10 });
  });
});

describe('Weiche Übergänge, kein Blinken im Takt', () => {
  const symbolKey = (c: TextCall) => `${c.s}@${Math.round(c.x)},${Math.round(c.y)}`;
  const isSymbol = (c: TextCall) => /^[0-9A-Z]{1,2}$/.test(c.s);

  for (const bpm of [60, 140]) {
    it(`Takt ${bpm}: jedes Zeichen blendet in ≥ 100 ms ein und aus (je Bild höchstens 0,35 Deckkraftänderung)`, () => {
      const s = sim({ params: { bpm, durationS: 10, symbols: 'letters', order: 'random' }, recordFrames: true, maxSeconds: 60, seed: 3 });
      expect(s.result).not.toBeNull();
      let prev = new Map<string, number>();
      let checked = 0;
      for (const frame of s.frames) {
        const cur = new Map<string, number>();
        for (const c of frame.filter(isSymbol)) cur.set(symbolKey(c), c.alpha);
        for (const [k, a] of cur) {
          const before = prev.get(k);
          if (before === undefined) expect(a, `neues Zeichen ${k} beginnt nicht weich`).toBeLessThanOrEqual(0.4);
          else {
            expect(Math.abs(a - before), `Sprung bei ${k}`).toBeLessThanOrEqual(0.35);
            checked++;
          }
        }
        for (const [k, a] of prev) if (!cur.has(k)) expect(a, `Zeichen ${k} verschwindet nicht weich`).toBeLessThanOrEqual(0.4);
        prev = cur;
      }
      expect(checked).toBeGreaterThan(20);
    });
  }

  it('höchster Takt: weniger als 2,5 Zeichenwechsel pro Sekunde, im Film und im Spiel', () => {
    const bpm = PARAMS.find((d) => d.key === 'bpm') as { max: number };
    expect(changesPerSecond(bpm.max)).toBeLessThanOrEqual(MAX_CHANGES_PER_S);
    const s = sim({ params: { bpm: bpm.max, durationS: 10, sound: 'yes' }, maxSeconds: 60 });
    const beats = s.sounds.filter((x) => x === 'beat').length;
    // im Ablauf (10 s Takt + Vorlauf) liegen die Schläge im Abstand des Takts: Schläge/Dauer ≤ 2,5 Hz
    expect(beats / (s.seconds - 1.2)).toBeLessThanOrEqual(MAX_CHANGES_PER_S + 0.05);
  });
});

describe('Texte', () => {
  const metricKeys = ['beats', 'bpm', 'amp_cm', 'amp_deg', 'hits', 'misses', 'stray', 'accuracy', 'lat_mean', 'lat_sd', 'positions'];

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
        expect(p?.hint?.length, d.key).toBeGreaterThan(20);
        if (d.type === 'select') for (const o of d.options) expect(p?.options?.[o], `${d.key}.${o}`).toBeTruthy();
        if (d.summary && d.type === 'number') expect(p?.short, d.key).toMatch(/\{v\}/);
      }
    }
  });

  it('Kennzahlen im Ergebnis und Tipps haben Texte in beiden Sprachen', () => {
    for (const touch of ['no', 'yes']) {
      const s = sim({ quick: true, params: { touch }, maxSeconds: 60 });
      for (const lang of ['de', 'it'] as const) {
        const t = laborTaktSakkaden.texts[lang];
        expect(t.metrics[s.result!.primary.key]).toBeTruthy();
        for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
        for (const k of ['read', 'slower', 'stray', 'faster', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
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
    const s = sim({ quick: true, params: { touch: 'yes' }, maxSeconds: 60 });
    for (const l of s.labels) expect(l).not.toMatch(/[{}]/);
    for (const t of s.texts) expect(t).not.toMatch(/\{n\}/);
  });
});

describe('science.ts', () => {
  it('Eintrag stimmt mit der Übung überein; ≥ 3 Quellen mit DOI-Link; Texte in beiden Sprachen; ehrliche Einstufung', () => {
    expect(science.id).toBe('labor-takt-sakkaden');
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
      '10.1016/0042-6989(95)00294-4', // Deubel & Schneider 1996
      '10.1212/WNL.25.11.1065', // Baloh et al. 1975
      '10.1152/jn.2000.83.2.639', // Neggers & Bekkering 2000
      '10.3758/BF03206433', // Repp 2005
      '10.1007/s00221-025-07131-7', // Karantinos et al. 2025
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
