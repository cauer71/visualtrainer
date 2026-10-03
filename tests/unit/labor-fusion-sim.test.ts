import { describe, expect, it } from 'vitest';
import { sanitizeParams, variantKey } from '../../src/core/params';
import { pdToCm } from '../../src/exercises/_shared/anaglyph';
import { laborFusion } from '../../src/exercises/labor-fusion';
import { fusionLayout } from '../../src/exercises/labor-fusion/layout';
import { PARAMS } from '../../src/exercises/labor-fusion/logic';
import { science } from '../../src/exercises/labor-fusion/science';
import { de, it as itTexts } from '../../src/exercises/labor-fusion/texts';
import { EXERCISES } from '../../src/exercises/registry';
import type { Exercise, ExerciseContext, LiveState } from '../../src/core/types';
import { SCIENCE } from '../../src/content/science';
import { textChecks } from './_anaglyph-checks';
import { fakeG, secondary, simulate as sim, type SimOpts } from './_labor-sim';

const run = (o: SimOpts = {}) => sim(laborFusion, o);
const getLive = (ex: Exercise) => ex.getLive?.() ?? null;

describe('Definition und Registrierung', () => {
  it('Kennung, Kategorie, Marke labor, Kalibrierung, keine Stufen, Einstellungen, Regler', () => {
    expect(laborFusion.id).toBe('labor-fusion');
    expect(laborFusion.category).toBe('wahrnehmung');
    expect(laborFusion.tags).toEqual(['labor']);
    expect(laborFusion.showsLevel).toBe(false);
    expect(laborFusion.usesCalibration).toBe(true);
    expect(laborFusion.colorCheck).toBeTypeOf('function');
    expect(laborFusion.params).toBe(PARAMS);
    expect(laborFusion.liveControls?.[0]).toMatchObject({ key: 'shiftPd', unit: 'Δ' });
    expect(de.title).toBe('Fusion – Bilder verschmelzen');
  });

  it('steht am Ende der Labor-Gruppe in der Registry und hat einen Hintergrundtext', () => {
    const ids = EXERCISES.map((e) => e.id);
    expect(ids).toContain('labor-fusion');
    const labor = EXERCISES.filter((e) => e.tags?.includes('labor')).map((e) => e.id);
    expect(labor.indexOf('labor-fusion')).toBe(labor.indexOf('labor-rot-gruen-lesen') + 1);
    expect(SCIENCE['labor-fusion']).toBe(science);
  });

  it('Prüfbild: zwei beschriftete Flächen (Standard Schritt für Schritt, 5 Schritte), ohne Wertung', () => {
    const info = laborFusion.colorCheck!(sanitizeParams(PARAMS, {}), de);
    expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Grün']);
    expect(info.steps).toHaveLength(5);
    const simple = laborFusion.colorCheck!(sanitizeParams(PARAMS, { glassesCheck: 'simple', tones: 'redcyan' }), itTexts);
    expect(simple.panels.map((p) => p.label)).toEqual(['Rosso', 'Ciano']);
    expect(simple.steps).toBeUndefined();
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 300],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, Hand tippt „Doppelt“ und „Wieder einfach“, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = run({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBe(2);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['look', 'strokes', 'up', 'down']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.sounds).toEqual([]); // der Film ist stumm
    });
  }

  it('Die Hand tippt in die Mitte der Tasten, auf der Bühne; die große Taste liegt über „Strich fehlt“', () => {
    const s = run({ mode: 'demo', w: 1040, h: 715, maxSeconds: 40 });
    for (const p of s.ghost.tapPoints) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(1040);
      expect(p.y).toBeGreaterThan(300);
    }
  });

  it('reproduzierbar; Einstellungen des Nutzers und der Regler ändern den Film nicht', () => {
    const a = run({ mode: 'demo', seed: 3 });
    const b = run({ mode: 'demo', seed: 3 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    const c = run({ mode: 'demo', seed: 3, params: { direction: 'divergence', control: 'trainer', rampPdPerS: 6, startPd: 8, maxPd: 40, repeats: 6, targetCm: 14, tones: 'redblue', leftLens: 'green', redLevel: 30, secondLevel: 30 } });
    expect(JSON.stringify(c.result)).toBe(JSON.stringify(a.result));
    expect(c.seconds).toBeCloseTo(a.seconds, 6);
  });

  it('der Film hat keinen Regler (getLive null, setLive ohne Wirkung)', () => {
    let state: LiveState | null | undefined;
    run({
      mode: 'demo',
      onFrame: (ex, now) => {
        if (now > 3000 && state === undefined) {
          ex.setLive?.('shiftPd', 2);
          state = getLive(ex);
        }
      },
    });
    expect(state).toBeNull();
  });
});

describe('Autoplay im Spielmodus', () => {
  it('?quick=1: endet nach wenigen Durchgängen mit einem vollständigen Ergebnis', () => {
    const s = run({ quick: true, maxSeconds: 80 });
    expect(s.result).not.toBeNull();
    expect(s.seconds).toBeLessThanOrEqual(30);
    const r = s.result!;
    expect(r.primary).toMatchObject({ key: 'break_mean', unit: 'pd', better: 'higher' });
    expect(Number.isFinite(r.primary.value)).toBe(true);
    expect(r.level).toBe(1);
    expect(r.secondary.length).toBeGreaterThanOrEqual(2);
    expect(r.secondary.length).toBeLessThanOrEqual(4);
    for (const m of r.secondary) {
      expect(Number.isFinite(m.value), m.key).toBe(true);
      expect(de.metrics[m.key], m.key).toBeTruthy();
    }
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(r.details?.map((t) => t.title)).toEqual([de.feedback.dirTitle, de.feedback.runsTitle, de.feedback.strokeTitle, de.feedback.settingsTitle]);
    expect(s.sounds).toContain('done');
  });

  it('volle Länge (3 Wiederholungen je Richtung): sechs Durchgänge, Mittelwerte je Richtung, nichts NaN', () => {
    const s = run({ maxSeconds: 400 });
    const r = s.result!;
    expect(r).not.toBeNull();
    const txt = JSON.stringify(r);
    expect(txt).not.toMatch(/NaN|null|undefined|Infinity/);
    const runs = r.details!.find((t) => t.title === de.feedback.runsTitle)!;
    expect(runs.rows[0].value).toBe('6');
    expect(secondary(r, 'break_conv')).toBeGreaterThan(0);
    expect(secondary(r, 'break_div')).toBeGreaterThan(0);
    expect(s.labels.length).toBeGreaterThanOrEqual(6);
    expect(s.labels[0]).toMatch(/Konvergenz · 1 \/ 6/);
    expect(s.labels.some((l) => /Divergenz · 2 \/ 6/.test(l))).toBe(true);
    expect(s.progress[s.progress.length - 1]).toBe(1);
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch (keine NaN, Tipp vorhanden, Hand trifft die Tasten)', () => {
    const variants: Record<string, unknown>[] = [
      { direction: 'convergence' },
      { direction: 'divergence' },
      { control: 'trainer' },
      { control: 'trainer', startPd: 3, direction: 'divergence' },
      { tones: 'redcyan', leftLens: 'green' },
      { tones: 'redblue', redLevel: 60, secondLevel: 40 },
      { maxPd: 5, rampPdPerS: 6 },
      { maxPd: 40, targetCm: 2 },
      { targetCm: 14 },
      { startPd: 10, maxPd: 5 },
      { glassesCheck: 'simple' },
    ];
    for (const params of variants) {
      const s = run({ quick: true, params, maxSeconds: 120 });
      expect(s.result, JSON.stringify(params)).not.toBeNull();
      expect(JSON.stringify(s.result), JSON.stringify(params)).not.toMatch(/NaN|undefined|Infinity/);
      expect(s.result!.tip).toBeTruthy();
    }
  });

  it('Handy hochkant und Tablet: läuft sauber durch, Tipps der Hand liegen auf der Bühne', () => {
    for (const [w, h] of [[390, 640], [820, 1120], [1180, 770], [780, 290]] as const) {
      const s = run({ quick: true, w, h, maxSeconds: 120, params: { maxPd: 40 } });
      expect(s.result, `${w}×${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(h);
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf: kein Fehler, Lauf endet', () => {
    const s = run({ quick: true, w: 1180, h: 770, resizeAt: { t: 2500, w: 770, h: 1180 }, maxSeconds: 120 });
    expect(s.result).not.toBeNull();
  });

  it('reduzierte Bewegung und ältere Attrappen-Kontexte ohne params/calib laufen ebenfalls', () => {
    expect(run({ quick: true, reducedMotion: true }).result).not.toBeNull();
    expect(run({ quick: true, noCtxParams: true }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = run({ quick: true, lang: 'it' });
    const r = s.result!;
    expect(r.details![0].title).toBe(itTexts.feedback.dirTitle);
    expect(s.labels[0]).toMatch(/Convergenza · 1 \/ 2/);
    expect(itTexts.tips[r.tip!]).toBeTruthy();
  });

  it('Regler nicht verfügbar im Modus „Trainer“ (kein Autoplay, kein Regler): der Versatz läuft automatisch, der Regler wäre ein Zusatz', () => {
    let live: LiveState | null | undefined;
    sim(laborFusion, {
      quick: true,
      autoplay: false,
      params: { control: 'trainer' },
      maxSeconds: 4,
      onFrame: (ex, now) => {
        if (now > 3000 && live === undefined) live = getLive(ex);
      },
    });
    expect(live?.additive).toBe(true);
  });
});

describe('Trainer-Regler im Lauf', () => {
  /** Lässt die Übung laufen; `act` wird in Phase „up“ einmal gerufen */
  function withLive(params: Record<string, unknown>, act: (ex: Exercise, ctx: ExerciseContext, now: number) => void, liveEnabled = true) {
    let done = false;
    const states: Array<LiveState | null> = [];
    const s = run({
      quick: true,
      autoplay: false,
      liveEnabled,
      maxSeconds: 6,
      params,
      onFrame: (ex, now, ctx) => {
        states.push(getLive(ex));
        if (!done && now > 1500) {
          done = true;
          act(ex, ctx, now);
        }
      },
    });
    return { s, states };
  }

  it('getLive: Wert, Grenzen, Schritte, Einheit; im Modus „automatisch“ ein Zusatz (additiv), im Modus „Trainer“ der Versatz selbst', () => {
    let a: LiveState | null = null;
    let t: LiveState | null = null;
    withLive({ repeats: 1 }, (ex) => {
      a = getLive(ex);
    });
    withLive({ repeats: 1, control: 'trainer', startPd: 2 }, (ex) => {
      t = getLive(ex);
    });
    expect(a).toMatchObject({ key: 'shiftPd', unit: 'Δ', step: 0.5, coarseStep: 2, additive: true, value: 0, min: -25, max: 25 });
    expect(t).toMatchObject({ key: 'shiftPd', unit: 'Δ', step: 0.5, coarseStep: 2, additive: false, value: 2, min: 0, max: 25 });
  });

  it('setLive wirkt sofort ohne Pause: der angezeigte Versatz folgt, effective steigt um den Zusatz', () => {
    const seen: number[] = [];
    withLive({ repeats: 1, rampPdPerS: 0.5 }, (ex) => {
      const before = getLive(ex)!;
      ex.setLive!('shiftPd', before.value + 2);
      seen.push(before.effective, getLive(ex)!.value);
    });
    expect(seen[1]).toBe(2);
  });

  it('Sprung begrenzt: setLive(…, 30) ändert den Wert um höchstens 2; der Wert bleibt in [min, max]', () => {
    const vals: number[] = [];
    withLive({ repeats: 1, maxPd: 5 }, (ex) => {
      for (let i = 0; i < 8; i++) {
        ex.setLive!('shiftPd', 99);
        vals.push(getLive(ex)!.value);
      }
    });
    expect(vals[0]).toBe(2);
    for (let i = 1; i < vals.length; i++) expect(vals[i] - vals[i - 1]).toBeLessThanOrEqual(2 + 1e-9);
    expect(Math.max(...vals)).toBeLessThanOrEqual(5);
  });

  it('unbekannter Schlüssel und vor dem Start: ohne Wirkung', () => {
    const r = withLive({ repeats: 1 }, (ex) => {
      ex.setLive!('bogus', 2);
      expect(getLive(ex)!.value).toBe(0);
    });
    expect(r.states[0]).toBeNull(); // vor dem Start liefert getLive nichts
  });

  it('Anzeige: der Versatz gleitet und springt nie (zwischen zwei Bildern höchstens 0,5 Δ mehr als der automatische Anstieg)', () => {
    const eff: number[] = [];
    let armed = false;
    sim(laborFusion, {
      quick: true,
      autoplay: false,
      maxSeconds: 4,
      params: { repeats: 1, direction: 'convergence' },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (st) eff.push(st.effective);
        if (!armed && now > 1500) {
          armed = true;
          ex.setLive!('shiftPd', 2);
        }
      },
    });
    for (let i = 1; i < eff.length; i++) expect(Math.abs(eff[i] - eff[i - 1])).toBeLessThan(0.5);
    expect(eff.length).toBeGreaterThan(60);
  });

  it('Ergebnis: Tabelle „Trainer-Regler“ mit Anzahl, zuletzt gesetztem Wert und Zeitpunkt; ohne Benutzung keine Tabelle', () => {
    // Autoplay-Lauf, in dem der Regler zweimal bedient wird
    let n = 0;
    const s = run({
      quick: true,
      maxSeconds: 60,
      params: { repeats: 1 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (st && st.effective > 1 && n < 2 && now > 1200 + n * 600) {
          ex.setLive!('shiftPd', st.value + (n === 0 ? 1 : -0.5));
          n++;
        }
      },
    });
    expect(n).toBe(2);
    const table = s.result!.details!.find((t) => t.title === de.feedback.liveTitle)!;
    expect(table).toBeTruthy();
    expect(table.rows[0].label).toBe('Versatz vom Trainer verändert');
    expect(table.rows[0].value).toMatch(/^2-mal, zuletzt /);
    expect(table.rows.length).toBe(3);
    expect(table.rows[1].label).toMatch(/^Durchgang \d, \d:\d\d$/);
    expect(table.note).toMatch(/verändert keine Einstellungen/);
    const plain = run({ quick: true, params: { repeats: 1 } });
    expect(plain.result!.details!.some((t) => t.title === de.feedback.liveTitle)).toBe(false);
  });

  it('Modus „Trainer“ im Autoplay: die Übung führt den Versatz selbst und endet; der Regler legt zusätzlich etwas darauf', () => {
    const s = run({ quick: true, maxSeconds: 80, params: { control: 'trainer', repeats: 1, startPd: 1 } });
    expect(s.result).not.toBeNull();
    const settings = s.result!.details!.find((t) => t.title === de.feedback.settingsTitle)!;
    expect(settings.rows[0].value).toMatch(/nur der Trainer-Regler \(Start 1,0 Δ\)/);
    // Automatisches Mitführen zählt nicht als Änderung durch den Trainer
    expect(s.result!.details!.some((t) => t.title === de.feedback.liveTitle)).toBe(false);
  });

  it('Ohne Regler (Benutzer-Ansicht) bleibt der eingestellte Wert: im Modus „Trainer“ ohne Autoplay und ohne Regler läuft der Versatz automatisch', () => {
    const effs: number[] = [];
    sim(laborFusion, {
      quick: true,
      autoplay: false,
      maxSeconds: 5,
      params: { control: 'trainer', startPd: 0, repeats: 1, rampPdPerS: 6 },
      onFrame: (ex) => {
        const st = getLive(ex);
        if (st) effs.push(st.effective);
      },
    });
    expect(Math.max(...effs)).toBeGreaterThan(2);
  });
});

describe('Zeichnen', () => {
  /** Zeichnet ein Bild an einer bestimmten Stelle des Laufs und gibt die Kreisbögen mit Farbe zurück */
  function capture(params: Record<string, unknown>, at: (ex: Exercise, ctx: ExerciseContext, now: number) => boolean, extra: SimOpts = {}) {
    let arcs: Array<{ x: number; y: number; r: number; color: string; op: string }> = [];
    let rects: Array<{ x: number; y: number; w: number; h: number; color: string; op: string }> = [];
    let texts: Array<{ s: string; fill: string }> = [];
    let taken = false;
    sim(laborFusion, {
      quick: true,
      autoplay: false,
      liveEnabled: true,
      maxSeconds: 8,
      params,
      ...extra,
      onFrame: (ex, now, ctx) => {
        if (taken || !at(ex, ctx, now)) return;
        taken = true;
        const base = fakeG();
        arcs = [];
        rects = [];
        texts = [];
        const g = new Proxy(base as object, {
          get: (t, k: string, r) => {
            if (k === 'arc') return (x: number, y: number, rad: number) => arcs.push({ x, y, r: rad, color: String(Reflect.get(t, 'strokeStyle', r)), op: String(Reflect.get(t, 'globalCompositeOperation', r)) });
            if (k === 'fillRect') return (x: number, y: number, w: number, h: number) => rects.push({ x, y, w, h, color: String(Reflect.get(t, 'fillStyle', r)), op: String(Reflect.get(t, 'globalCompositeOperation', r)) });
            if (k === 'fillText') return (s: string) => texts.push({ s: String(s), fill: String(Reflect.get(t, 'fillStyle', r)) });
            return Reflect.get(t, k, r);
          },
          set: (t, k: string, v) => Reflect.set(t, k, v),
        }) as unknown as CanvasRenderingContext2D;
        ex.render(g, now);
      },
    });
    return { arcs, rects, texts };
  }

  it('Ziel: je Farbe drei Kreise (zwei Ringe und Mittelpunkt), additive Mischung, reines Rot und reines Grün; Kontrollstriche oben rot, unten grün', () => {
    const c = capture({ repeats: 1 }, (ex, _c, now) => now > 1200 && !!getLive(ex));
    const red = c.arcs.filter((a) => a.color === 'rgb(255,0,0)');
    const green = c.arcs.filter((a) => a.color === 'rgb(0,255,0)');
    expect(red).toHaveLength(3);
    expect(green).toHaveLength(3);
    for (const a of c.arcs) expect(a.op).toBe('lighter');
    const bars = c.rects.filter((r) => r.op === 'lighter');
    expect(bars).toHaveLength(2);
    const redBar = bars.find((b) => b.color === 'rgb(255,0,0)')!;
    const greenBar = bars.find((b) => b.color === 'rgb(0,255,0)')!;
    expect(redBar.y).toBeLessThan(greenBar.y);
    // fest in der Mitte der Bühne, unverschoben
    expect(redBar.x + redBar.w / 2).toBeCloseTo(greenBar.x + greenBar.w / 2, 6);
  });

  it('Bedienung neutral und beschriftet: Tasten „Doppelt“, „Roter Strich fehlt“, „Grüner Strich fehlt“ – nie in Rot oder Grün', () => {
    const c = capture({ repeats: 1 }, (ex, _c, now) => now > 1200 && !!getLive(ex));
    const labels = c.texts.map((t) => t.s);
    expect(labels).toContain('Doppelt');
    expect(labels.some((l) => /Roter Strich fehlt/.test(l))).toBe(true);
    expect(labels.some((l) => /Grüner Strich fehlt/.test(l))).toBe(true);
    for (const t of c.texts) expect(t.fill, t.s).not.toMatch(/^rgb\(255,0,0\)|^rgb\(0,255,0\)|#f00|#0f0/i);
  });

  it('Konvergenz mit rotem Glas links: das rote Bild liegt rechts vom grünen, bei Divergenz und bei grünem Glas links umgekehrt; Abstand = Versatz in Pixeln', () => {
    const cases: Array<[string, string, number]> = [
      ['red', 'convergence', 1],
      ['red', 'divergence', -1],
      ['green', 'convergence', -1],
      ['green', 'divergence', 1],
    ];
    for (const [lens, dir, sign] of cases) {
      let eff = 0;
      const c = capture(
        { repeats: 1, direction: dir, leftLens: lens, startPd: 6, rampPdPerS: 0.5 },
        (ex, _c, now) => {
          const st = getLive(ex);
          if (st) eff = st.effective;
          return now > 2500 && !!st;
        },
      );
      const red = c.arcs.filter((a) => a.color === 'rgb(255,0,0)' && a.r > 20)[0];
      const green = c.arcs.filter((a) => a.color === 'rgb(0,255,0)' && a.r > 20)[0];
      expect(Math.sign(red.x - green.x), `${lens}/${dir}`).toBe(sign);
      // Versatz in Pixeln aus der Kalibrierung (38 px/cm bei 40 cm Abstand), auf die Bühne begrenzt
      const want = (pdToCm(eff, 40) * 38);
      expect(Math.abs(red.x - green.x)).toBeCloseTo(want, 0);
      expect(eff).toBeGreaterThanOrEqual(6);
    }
  });

  it('der Versatz folgt der Sehentfernung aus der Kalibrierung: bei 60 cm 1,5-mal so viel Pixel wie bei 40 cm (gleiche Δ)', () => {
    const gap = (viewDistanceCm: number) => {
      let eff = 0;
      const c = capture({ repeats: 1, direction: 'convergence', startPd: 4, rampPdPerS: 0.5 }, (ex, _c, now) => {
        const st = getLive(ex);
        if (st) eff = st.effective;
        return now > 2300 && !!st;
      }, { viewDistanceCm });
      const red = c.arcs.filter((a) => a.color === 'rgb(255,0,0)' && a.r > 20)[0];
      const green = c.arcs.filter((a) => a.color === 'rgb(0,255,0)' && a.r > 20)[0];
      return Math.abs(red.x - green.x) / eff;
    };
    expect(gap(60) / gap(40)).toBeCloseTo(1.5, 1);
  });

  it('Farbpaar Rot–Blau (0,160,255) und Helligkeit je Farbe: die Ziele nutzen genau diese Farben', () => {
    const c = capture({ repeats: 1, tones: 'redblue', redLevel: 60, secondLevel: 80 }, (ex, _c, now) => now > 1200 && !!getLive(ex));
    expect(new Set(c.arcs.map((a) => a.color))).toEqual(new Set(['rgb(153,0,0)', 'rgb(0,128,204)']));
  });
});

describe('Variantenschlüssel', () => {
  it('Startwert und Steuerungsart gehören zum Schlüssel; die Änderungen am Regler teilen den Verlauf nicht (nicht Teil der Einstellungen)', () => {
    const key = (o: Record<string, unknown>) => variantKey(laborFusion.params, sanitizeParams(laborFusion.params, o));
    expect(key({ control: 'trainer', startPd: 2 })).toContain('control=trainer');
    expect(key({ control: 'trainer', startPd: 2 })).toContain('startPd=2');
    expect(key({ control: 'trainer' })).not.toBe(key({ control: 'auto' }));
    // Alle Regler-Läufe mit denselben Einstellungen teilen denselben Schlüssel, egal wie der Regler benutzt wurde
    const params = sanitizeParams(laborFusion.params, { repeats: 1 });
    expect(variantKey(laborFusion.params, params)).toBe(variantKey(laborFusion.params, sanitizeParams(laborFusion.params, { repeats: 1 })));
    expect(Object.keys(params)).not.toContain('shiftPd');
  });
});

describe('Anordnung der Bühne', () => {
  it('Film und Spiel: Tasten und Ziel bleiben auf der Bühne (Stichprobe über viele Bühnen)', () => {
    for (const [w, h] of [[390, 640], [360, 560], [820, 1120], [1180, 770], [1040, 715], [780, 290], [520, 300]] as const) {
      for (const demo of [false, true]) {
        const u = Math.min(w, h) / 100;
        const L = fusionLayout({ w, h, u, captionReserve: demo ? 70 : 0, demo, wantDiameterPx: 6 * 38, needShiftPx: (25 * 40 * 38) / 100 });
        for (const r of [L.main, L.missA, L.missB]) {
          expect(r.x, `${w}×${h}`).toBeGreaterThanOrEqual(-0.5);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.5);
          expect(r.y + r.h).toBeLessThanOrEqual(h + 0.5);
        }
        expect(L.cx - L.maxShiftPx / 2 - 1.28 * L.r).toBeGreaterThanOrEqual(-0.5);
        expect(L.cx + L.maxShiftPx / 2 + 1.28 * L.r).toBeLessThanOrEqual(w + 0.5);
      }
    }
  });
});

describe('Texte und Quellen', () => {
  textChecks({
    def: laborFusion,
    science,
    metricKeys: ['break_mean', 'break_conv', 'rec_conv', 'break_div', 'rec_div', 'trials', 'capped', 'no_recovery', 'control', 'max', 'target'],
    tipKeys: ['few', 'noRecovery', 'capped', 'strokes', 'compare'],
    verifiedDois: [
      '10.1001/archopht.126.10.1336', // Convergence Insufficiency Treatment Trial Study Group 2008 (Crossref + PubMed)
      '10.1097/01.opx.0000171331.36871.2f', // Scheiman et al. 2005 (Crossref + PubMed)
      '10.1364/JOSAA.29.000313', // Birch 2012
    ],
  });

  it('Fusion: Werte sind Übungswerte – keine Prismenmessung, kein Ersatz für eine Untersuchung, höher ist nicht besser; Δ und 1 cm auf 1 m erklärt; Konvergenz/Divergenz; Wert, bei dem du Doppelbilder gemeldet hast', () => {
    const all = JSON.stringify(de);
    expect(all).toMatch(/Übungswerte/);
    expect(all).toMatch(/keine Prismenmessung/);
    expect(all).toMatch(/kein Ersatz für eine Untersuchung/);
    expect(de.metricHints!.break_mean).toMatch(/höherer Wert ist nicht „besser“/);
    expect(de.why).toMatch(/1 Δ lenkt auf 1 m Entfernung um 1 cm ab/);
    expect(de.why).toMatch(/Konvergenz heißt: Das Bild rückt scheinbar näher/);
    expect(de.why).toMatch(/Divergenz: Es rückt scheinbar weg/);
    expect(de.metrics.break_mean).toMatch(/Doppelt gemeldet bei/);
    expect(de.metricHints!.break_mean).toMatch(/Werte \(in Prismendioptrien Δ\), bei denen du „Doppelt“ gemeldet hast/);
    const it2 = JSON.stringify(itTexts);
    expect(it2).toMatch(/non una misurazione prismatica/);
    expect(it2).toMatch(/non sostituiscono una visita/);
  });
});
