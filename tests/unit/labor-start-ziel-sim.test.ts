/**
 * Start-Ziel-Reaktion (Labor): Durchlauf ohne Browser (virtuelle Zeit, virtuelle Hand im Film und Autoplay, Attrappen-
 * Zeichenfläche, Halten und Loslassen über `pointerDown`/`pointerUp`) sowie Prüfung der Texte (DE/IT gleiche Schlüssel,
 * alle Kennzahlen erklärt, Rechtsregeln) und der Quellen.
 */
import { describe, expect, it } from 'vitest';
import { laborStartZiel } from '../../src/exercises/labor-start-ziel';
import { GO_TIMEOUT_MS, HOME_R_CM, PARAMS } from '../../src/exercises/labor-start-ziel/logic';
import { science } from '../../src/exercises/labor-start-ziel/science';
import { de, it as itTexts } from '../../src/exercises/labor-start-ziel/texts';
import { playField } from '../../src/exercises/_shared/tippziele';
import { get, leaves, simulate as sim } from './_labor-b1-sim';

const simulate = (o: Parameters<typeof sim>[1] = {}) => sim(laborStartZiel, o);

describe('Definition', () => {
  it('Kategorie reaktion, Marke labor, Kalibrierung, Einstellungen, keine Stufen', () => {
    expect(laborStartZiel.id).toBe('labor-start-ziel');
    expect(laborStartZiel.category).toBe('reaktion');
    expect(laborStartZiel.tags).toEqual(['labor']);
    expect(laborStartZiel.usesCalibration).toBe(true);
    expect(laborStartZiel.showsLevel).toBe(false);
    expect(laborStartZiel.params).toBe(PARAMS);
    expect(laborStartZiel.icon.length).toBeGreaterThan(20);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 358],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, zeigt Halten, Fehlstart und Treffer, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = simulate({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.captions.length).toBeGreaterThanOrEqual(4);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['hold', 'early', 'go', 'next']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.result!.primary.key).toBe('rt_mean');
      expect(s.result!.primary.value).toBeGreaterThan(300);
      expect(s.result!.primary.value).toBeLessThan(700);
      expect(s.result!.secondary.some((m) => m.key === 'hits' && m.value === 2)).toBe(true);
      expect(s.toasts.some((t) => t.startsWith('✓'))).toBe(true);
    });
  }

  it('ist mit gleichem Startwert reproduzierbar, der Ton bleibt im Film aus, Einstellungen ändern ihn nicht', () => {
    const a = simulate({ mode: 'demo', seed: 3, params: { sound: 'yes', trials: 60, distanceCm: 60, targetCm: 12, minDelayMs: 5000 } });
    const b = simulate({ mode: 'demo', seed: 3 });
    expect(a.seconds).toBeCloseTo(b.seconds, 6);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    expect(a.sounds).toEqual([]);
  });
});

describe('Autoplay im Spielmodus (?quick=1)', () => {
  it('endet nach wenigen Durchgängen mit einem vollständigen Ergebnis', () => {
    const s = simulate({ quick: true, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeGreaterThan(3);
    expect(s.seconds).toBeLessThanOrEqual(30);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'rt_mean', unit: 'ms', better: 'lower' });
    expect(r.primary.value).toBeGreaterThan(100);
    expect(r.primary.value).toBeLessThanOrEqual(GO_TIMEOUT_MS);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    expect(r.secondary.map((m) => m.key)).toEqual(expect.arrayContaining(['hits', 'false_starts', 'error_taps']));
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.labels).toContain('1 / 3');
    expect(s.finishCalls).toBe(1);
  });

  it('15 Durchgänge: Kennzahlen stimmig (Reaktionszeit und Bewegungszeit plausibel, Zusatztabelle)', () => {
    const s = simulate({ params: { trials: 15 }, maxSeconds: 400, seed: 11 });
    const r = s.result!;
    expect(s.result).not.toBeNull();
    const hits = get(r, 'hits')!;
    expect(hits).toBeGreaterThanOrEqual(10);
    expect(hits).toBeLessThanOrEqual(15);
    expect(r.score).toBe(hits * 10);
    expect(r.primary.value).toBeGreaterThan(250);
    expect(r.primary.value).toBeLessThan(700);
    expect(get(r, 'mt_mean')!).toBeGreaterThan(300);
    expect(get(r, 'mt_mean')!).toBeLessThan(1500);
    expect(r.details?.[0].rows.length).toBeGreaterThanOrEqual(2);
    for (const row of r.details?.[0].rows ?? []) expect(row.value).toMatch(/\d/);
  });

  it('läuft mit allen Zielpositionen, großen und kleinen Zielen, weitem Abstand und kurzen Wartezeiten sauber durch', () => {
    for (const p of [
      { target: 'random' },
      { targetCm: 12, distanceCm: 60 },
      { targetCm: 1.5, distanceCm: 5 },
      { minDelayMs: 500, maxDelayMs: 500 },
      { minDelayMs: 5000, maxDelayMs: 500 },
      { target: 'random', distanceCm: 40, targetCm: 8 },
      { sound: 'yes' },
    ]) {
      const s = simulate({ quick: true, params: p, maxSeconds: 120, seed: 5 });
      expect(s.result, JSON.stringify(p)).not.toBeNull();
      expect(Number.isFinite(s.result!.primary.value)).toBe(true);
      for (const m of s.result!.secondary) expect(Number.isFinite(m.value), `${JSON.stringify(p)} ${m.key}`).toBe(true);
    }
  });

  it('Ton nur bei eingeschaltetem „Ton“', () => {
    const off = simulate({ quick: true, maxSeconds: 80 });
    expect(off.sounds).toEqual([]);
    const on = simulate({ quick: true, params: { sound: 'yes' }, maxSeconds: 80 });
    expect(on.sounds).toContain('go');
    expect(on.sounds).toContain('good');
    expect(on.sounds[on.sounds.length - 1]).toBe('done');
  });

  it('Handy hochkant, Handy quer und Tablet: auch mit weitem Abstand und großem Ziel läuft alles durch', () => {
    for (const [w, h] of [
      [320, 560],
      [390, 700],
      [844, 390],
      [820, 1180],
      [1180, 820],
    ] as const) {
      const s = simulate({ quick: true, w, h, params: { targetCm: 12, distanceCm: 60, target: 'random' }, pxPerCm: 60, maxSeconds: 120 });
      expect(s.result, `${w}x${h}`).not.toBeNull();
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    for (const at of [1500, 3000, 4500]) {
      const s = simulate({ quick: true, w: 1180, h: 820, resizeAt: { t: at, w: 820, h: 1180 }, maxSeconds: 120 });
      expect(s.result, `Drehen bei ${at} ms`).not.toBeNull();
    }
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(simulate({ quick: true, reducedMotion: true, maxSeconds: 80 }).result).not.toBeNull();
    expect(simulate({ quick: true, noCtxParams: true, maxSeconds: 80 }).result).not.toBeNull();
  });

  it('läuft bei 30 und 144 Hz mit gleichen Zeiten (Messung über die virtuelle Zeit, nicht über die Bilder)', () => {
    const a = simulate({ quick: true, fps: 30, maxSeconds: 80, seed: 4 });
    const b = simulate({ quick: true, fps: 144, maxSeconds: 80, seed: 4 });
    expect(a.result).not.toBeNull();
    expect(b.result).not.toBeNull();
    expect(Math.abs(get(a.result!, 'mt_mean')! - get(b.result!, 'mt_mean')!)).toBeLessThan(400);
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = simulate({ quick: true, lang: 'it', maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    expect(s.toasts.every((t) => !/undefined|\{/.test(t))).toBe(true);
    expect(s.labels.every((t) => !/undefined|\{/.test(t))).toBe(true);
  });
});

describe('Halten und Loslassen mit echten Zeigerereignissen (ohne Autoplay)', () => {
  /** Geometrie wie die Übung: Feld der Bühne, 38 px/cm, Startfläche unten in der Mitte, Ziel senkrecht darüber */
  function geometry(w: number, h: number, distanceCm: number) {
    const f = playField({ w, h, u: Math.min(w, h) / 100, dpr: 1 }, false);
    const ppc = 38;
    const H = f.h / ppc;
    const homeY = Math.max(H - HOME_R_CM - 1, H * 0.8);
    const home = { x: f.x + f.w / 2, y: f.y + homeY * ppc };
    const target = { x: home.x, y: f.y + (homeY - distanceCm) * ppc };
    return { home, target };
  }

  it('zwei Durchgänge von Hand: halten, loslassen, Ziel berühren; Fehlstart, zweiter Finger und Fremd-Loslassen stören nicht', () => {
    const { home, target } = geometry(1040, 715, 10);
    const script: Array<{ t: number; kind: 'down' | 'up'; id: number; at: { x: number; y: number } }> = [
      // Durchgang 1: Fehlstart (nach 300 ms losgelassen), dann sauber
      { t: 600, kind: 'down', id: 5, at: home },
      { t: 900, kind: 'up', id: 5, at: home },
      { t: 1200, kind: 'down', id: 5, at: home },
      { t: 1250, kind: 'down', id: 9, at: target }, // zweiter Finger während des Haltens: ohne Wirkung
      { t: 1300, kind: 'up', id: 9, at: target }, // Loslassen eines fremden Fingers: ohne Wirkung
      { t: 3500, kind: 'up', id: 5, at: home }, // Ziel ist längst da (Wartezeit ≤ 1200 ms im Schnellmodus, Frist 2 s)
      { t: 3900, kind: 'down', id: 6, at: target },
      { t: 3950, kind: 'down', id: 6, at: target }, // Doppeltipp: ohne Wirkung
      // Durchgang 2
      { t: 4500, kind: 'down', id: 7, at: home },
      { t: 6600, kind: 'up', id: 7, at: home },
      { t: 6900, kind: 'down', id: 8, at: { x: target.x + 400, y: target.y } }, // Fehltipp
      { t: 7200, kind: 'down', id: 8, at: target },
      // Durchgang 3
      { t: 8000, kind: 'down', id: 3, at: home },
      { t: 10300, kind: 'up', id: 3, at: home },
      { t: 10700, kind: 'down', id: 4, at: target },
    ];
    let next = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { distanceCm: 10, targetCm: 6 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        while (next < script.length && now >= script[next].t) {
          const a = script[next++];
          const info = { id: a.id, x: a.at.x, y: a.at.y, t: a.t, type: 'touch' as const };
          if (a.kind === 'down') ex.pointerDown?.(info);
          else ex.pointerUp?.(info);
        }
      },
    });
    expect(next, 'alle Ereignisse wurden abgespielt').toBe(script.length);
    expect(s.result).not.toBeNull();
    const r = s.result!;
    expect(get(r, 'hits')).toBe(3);
    expect(get(r, 'false_starts')).toBe(1);
    expect(get(r, 'error_taps')).toBe(1);
    expect(r.primary.key).toBe('rt_mean');
    expect(r.primary.value).toBeGreaterThan(900); // Loslassen erst lange nach dem Aufleuchten
    expect(r.primary.value).toBeLessThan(GO_TIMEOUT_MS);
  });

  it('Loslassen vor dem Aufleuchten zählt als Fehlstart, Berühren ohne Halten zählt nichts; nicht losgelassen → Durchgang endet', () => {
    const { home, target } = geometry(1040, 715, 10);
    const script = [
      { t: 500, kind: 'down' as const, id: 1, at: target }, // ohne Halten: ohne Wirkung
      { t: 800, kind: 'down' as const, id: 2, at: home },
      { t: 1500, kind: 'up' as const, id: 2, at: home },
      // Durchgang ohne Loslassen: 2 s nach dem Aufleuchten ist Schluss, der Finger bleibt unten
      { t: 2000, kind: 'down' as const, id: 3, at: home },
      { t: 9000, kind: 'up' as const, id: 3, at: home }, // wirkungslos (Durchgang längst beendet)
      { t: 9300, kind: 'down' as const, id: 4, at: home },
      { t: 12000, kind: 'up' as const, id: 4, at: home },
      { t: 12400, kind: 'down' as const, id: 5, at: target },
      { t: 14000, kind: 'down' as const, id: 6, at: home },
      { t: 16500, kind: 'up' as const, id: 6, at: home },
      { t: 16900, kind: 'down' as const, id: 7, at: target },
    ];
    let next = 0;
    const s = simulate({
      quick: true,
      autoplay: false,
      params: { distanceCm: 10, targetCm: 6 },
      maxSeconds: 60,
      onFrame: (ex, now) => {
        while (next < script.length && now >= script[next].t) {
          const a = script[next++];
          const info = { id: a.id, x: a.at.x, y: a.at.y, t: a.t, type: 'touch' as const };
          if (a.kind === 'down') ex.pointerDown?.(info);
          else ex.pointerUp?.(info);
        }
      },
    });
    // Durchgänge: nicht losgelassen (Zeitüberlauf), Treffer, Treffer; dazu ein Fehlstart
    expect(next).toBe(script.length);
    expect(s.result).not.toBeNull();
    expect(get(s.result!, 'hits')).toBe(2);
    expect(get(s.result!, 'false_starts')).toBe(1);
    expect(s.result!.primary.value).toBeGreaterThan(500);
    expect(s.result!.primary.value).toBeLessThan(GO_TIMEOUT_MS);
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
    const metricKeys = ['hits', 'false_starts', 'error_taps', 'rt_mean', 'rt_median', 'rt_sd', 'mt_mean'];
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

  it('Kennzahlen im Ergebnis, Tipps und Hinweiszeilen haben Texte in beiden Sprachen', () => {
    const s = simulate({ quick: true, maxSeconds: 80 });
    for (const lang of ['de', 'it'] as const) {
      const t = laborStartZiel.texts[lang];
      expect(t.metrics[s.result!.primary.key]).toBeTruthy();
      for (const m of s.result!.secondary) expect(t.metrics[m.key], m.key).toBeTruthy();
      for (const k of ['few', 'false_start', 'aim', 'slow', 'harder', 'steady', 'compare']) expect(t.tips[k], k).toBeTruthy();
      for (const k of ['label', 'start', 'hold', 'hintIdle', 'hintArmed', 'falseStart', 'late', 'noTarget', 'moreTitle', 'moreNote']) expect(t.feedback[k], k).toBeTruthy();
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
    expect(science.id).toBe('labor-start-ziel');
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

  it('nur bestätigte Quellen: Liste der geprüften DOIs (Crossref/PubMed/Volltext, 02.10.2026)', () => {
    const verified = [
      '10.1037/h0055392', // Fitts 1954 (Metadaten; Inhalt über Soukoreff & MacKenzie 2004)
      '10.1016/j.ijhcs.2004.09.001', // Soukoreff & MacKenzie 2004 (Volltext)
      '10.3389/fnhum.2015.00131', // Woods et al. 2015
      '10.3758/s13414-022-02476-5', // Han & Proctor 2022
      '10.3758/s13428-019-01321-2', // Pronk et al. 2020
      '10.3389/fphys.2025.1664572', // Guo et al. 2025
    ];
    expect(science.sources.map((s) => s.url.replace('https://doi.org/', '')).sort()).toEqual([...verified].sort());
  });
});
