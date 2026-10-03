import { describe, expect, it } from 'vitest';
import { SCIENCE } from '../../src/content/science';
import type { Exercise, ExerciseContext, LiveState } from '../../src/core/types';
import { sanitizeParams } from '../../src/core/params';
import { arcsecToPx } from '../../src/exercises/_shared/anaglyph';
import { laborStereo } from '../../src/exercises/labor-stereo';
import { stereoLayout } from '../../src/exercises/labor-stereo/layout';
import { PARAMS } from '../../src/exercises/labor-stereo/logic';
import { science } from '../../src/exercises/labor-stereo/science';
import { de, it as itTexts } from '../../src/exercises/labor-stereo/texts';
import { EXERCISES } from '../../src/exercises/registry';
import { textChecks } from './_anaglyph-checks';
import { fakeG, secondary, simulate as sim, type SimOpts } from './_labor-sim';

const run = (o: SimOpts = {}) => sim(laborStereo, o);
const getLive = (ex: Exercise) => ex.getLive?.() ?? null;

describe('Definition und Registrierung', () => {
  it('Kennung, Kategorie, Marke labor, Kalibrierung, keine Stufen, Einstellungen, Regler', () => {
    expect(laborStereo.id).toBe('labor-stereo');
    expect(laborStereo.category).toBe('wahrnehmung');
    expect(laborStereo.tags).toEqual(['labor']);
    expect(laborStereo.showsLevel).toBe(false);
    expect(laborStereo.usesCalibration).toBe(true);
    expect(laborStereo.colorCheck).toBeTypeOf('function');
    expect(laborStereo.params).toBe(PARAMS);
    expect(laborStereo.liveControls?.[0]).toMatchObject({ key: 'disparity', unit: '″' });
    expect(de.title).toBe('Tiefe sehen – Zufallspunkte');
  });

  it('steht nach der Fusion am Ende der Labor-Gruppe und hat einen Hintergrundtext', () => {
    const labor = EXERCISES.filter((e) => e.tags?.includes('labor')).map((e) => e.id);
    expect(labor.indexOf('labor-stereo')).toBe(labor.indexOf('labor-fusion') + 1);
    expect(labor[labor.length - 1]).toBe('labor-stereo');
    expect(labor).toHaveLength(17);
    expect(SCIENCE['labor-stereo']).toBe(science);
  });

  it('Prüfbild: zwei beschriftete Flächen, Schritt für Schritt', () => {
    const info = laborStereo.colorCheck!(sanitizeParams(PARAMS, { tones: 'redblue' }), de);
    expect(info.panels.map((p) => p.label)).toEqual(['Rot', 'Blau']);
    expect(info.steps).toHaveLength(5);
  });
});

describe('Intro-Film (Demo)', () => {
  for (const [name, w, h] of [
    ['16:11', 1040, 715],
    ['Hochformat', 360, 640],
    ['klein', 520, 300],
  ] as const) {
    it(`${name}: endet nach 8–14 s mit ctx.finish, die Hand tippt dreimal eine Richtung, Bildunterschriften ≤ 42 Zeichen`, () => {
      const s = run({ mode: 'demo', w, h, maxSeconds: 40 });
      expect(s.result, 'finish wurde nicht gerufen').not.toBeNull();
      expect(s.seconds).toBeGreaterThanOrEqual(8);
      expect(s.seconds).toBeLessThanOrEqual(14.2);
      expect(s.ghostTaps).toBe(3);
      expect(s.result!.primary.value).toBe(100);
      for (const c of s.captions) expect(c.length).toBeLessThanOrEqual(42);
      for (const k of ['look', 'answer', 'result']) expect(s.captions, k).toContain(de.captions[k]);
      expect(s.sounds).toEqual([]);
    });
  }

  it('Die Hand tippt in die Mitte der vier Tasten (eine Reihe unten, auf der Bühne)', () => {
    const s = run({ mode: 'demo', w: 1040, h: 715, maxSeconds: 40 });
    for (const p of s.ghost.tapPoints) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(1040);
      expect(p.y).toBeGreaterThan(400);
    }
  });

  it('reproduzierbar; Einstellungen des Nutzers ändern den Film nicht; kein Regler im Film', () => {
    const a = run({ mode: 'demo', seed: 4 });
    const b = run({ mode: 'demo', seed: 4 });
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    const c = run({ mode: 'demo', seed: 4, params: { trials: 80, startArcsec: 20, control: 'trainer', fieldCm: 26, regionCm: 10, dots: 1500, dotCm: 0.6, noise: 'off', tones: 'redblue', leftLens: 'green' } });
    expect(JSON.stringify(c.result)).toBe(JSON.stringify(a.result));
    expect(c.seconds).toBeCloseTo(a.seconds, 6);
    let state: LiveState | null | undefined;
    run({
      mode: 'demo',
      onFrame: (ex, now) => {
        if (now > 3000 && state === undefined) {
          ex.setLive?.('disparity', 400);
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
    expect(r.primary).toMatchObject({ key: 'accuracy', unit: 'percent', better: 'higher' });
    expect(r.primary.value).toBeGreaterThanOrEqual(0);
    expect(r.primary.value).toBeLessThanOrEqual(100);
    expect(r.level).toBe(1);
    expect(r.secondary.map((m) => m.key)).toEqual(['correct', 'final_arcsec', 'rt_mean', 'px_arcsec']);
    for (const m of r.secondary) expect(Number.isFinite(m.value), m.key).toBe(true);
    expect(r.tip && itTexts.tips[r.tip]).toBeTruthy();
    expect(r.details?.map((t) => t.title)).toEqual([de.feedback.arcTitle, de.feedback.depthTitle, de.feedback.settingsTitle]);
    expect(s.sounds).toContain('done');
  });

  it('Ergebnis nennt die Pixelgrenze: Disparität eines Pixels mit Abstand, und den Hinweis, dass der Bildschirm nur ganze Pixel verschiebt', () => {
    const r = run({ quick: true, pxPerCm: 38, viewDistanceCm: 40 }).result!;
    const px = secondary(r, 'px_arcsec')!;
    expect(px).toBeCloseTo(135.7, 1);
    const arc = r.details![0];
    const row = arc.rows.find((x) => x.label === de.metrics.px_arcsec)!;
    expect(row.value).toBe('136 ″');
    expect(row.text).toMatch(/1 Pixel bei 40 cm Abstand/);
    expect(arc.note).toMatch(/nur in ganzen Pixeln/);
    expect(de.metrics.px_arcsec).toMatch(/1 Pixel/);
    // andere Kalibrierung, andere Pixelgrenze
    const r2 = run({ quick: true, pxPerCm: 76, viewDistanceCm: 60 }).result!;
    expect(secondary(r2, 'px_arcsec')!).toBeLessThan(px);
    expect(secondary(r2, 'px_arcsec')!).toBeCloseTo(((Math.atan(1 / 76 / 60) * 180) / Math.PI) * 3600, 4);
    // ohne Kalibrierung steht der Hinweis „nicht kalibriert“
    const un = run({ quick: true }).result!;
    expect(un.details![0].rows.find((x) => x.label === de.metrics.px_arcsec)!.text).toMatch(/nicht kalibriert/);
    expect(r.details![0].rows.find((x) => x.label === de.metrics.px_arcsec)!.text).not.toMatch(/nicht kalibriert/);
  });

  it('Ergebnis ist ein Übungswert: Zufallsniveau 25 %, Hinweise auf Farbsäume und groben Bildschirm, keine Schwelle, kein Normwert', () => {
    const r = run({ quick: true }).result!;
    const depth = r.details!.find((t) => t.title === de.feedback.depthTitle)!;
    expect(depth.rows.some((x) => x.value === '25 %')).toBe(true);
    const all = JSON.stringify(r.details);
    expect(all).toMatch(/Farbsäume/);
    expect(all).toMatch(/grobe Orientierung/);
    expect(all).toMatch(/keine Messung einer Stereoschwelle/);
    expect(all).not.toMatch(/Normwert|Schwelle:|Stereoacuity|NaN|undefined/);
  });

  it('volle Länge (24 Durchgänge, automatisch): läuft durch, Disparität verändert sich, letzte Disparität steht im Ergebnis', () => {
    const s = run({ maxSeconds: 400 });
    const r = s.result!;
    expect(r).not.toBeNull();
    expect(JSON.stringify(r)).not.toMatch(/NaN|undefined|Infinity/);
    const last = secondary(r, 'final_arcsec')!;
    expect(last).toBeGreaterThanOrEqual(20);
    expect(last).not.toBe(600);
    expect(s.labels[0]).toBe('1 / 24');
    expect(s.labels).toHaveLength(24);
    expect(s.progress[s.progress.length - 1]).toBe(1);
    expect(s.scores.length).toBeGreaterThan(0);
  });

  it('läuft mit allen Einstellungs-Varianten sauber durch', () => {
    const variants: Record<string, unknown>[] = [
      { control: 'fixed' },
      { control: 'trainer' },
      { control: 'trainer', startArcsec: 200 },
      { noise: 'off' },
      { tones: 'redcyan', leftLens: 'green' },
      { tones: 'redblue', redLevel: 50, secondLevel: 70 },
      { fieldCm: 8, regionCm: 10, dots: 150, dotCm: 0.1 },
      { fieldCm: 26, regionCm: 2, dots: 1500, dotCm: 0.6 },
      { startArcsec: 20 },
      { startArcsec: 3600 },
      { glassesCheck: 'simple' },
    ];
    for (const params of variants) {
      const s = run({ quick: true, params, maxSeconds: 120 });
      expect(s.result, JSON.stringify(params)).not.toBeNull();
      expect(JSON.stringify(s.result), JSON.stringify(params)).not.toMatch(/NaN|undefined|Infinity/);
      expect(s.result!.tip).toBeTruthy();
    }
  });

  it('Handy hochkant, Tablet, Handy quer: läuft sauber durch, Tipps der Hand liegen auf der Bühne', () => {
    for (const [w, h] of [[390, 640], [820, 1120], [1180, 770], [780, 290]] as const) {
      const s = run({ quick: true, w, h, maxSeconds: 120, params: { fieldCm: 26 } });
      expect(s.result, `${w}×${h}`).not.toBeNull();
      for (const p of s.ghost.tapPoints) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(w);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(h);
      }
    }
  });

  it('Drehen des Tablets mitten im Lauf, reduzierte Bewegung, ältere Attrappen-Kontexte', () => {
    expect(run({ quick: true, w: 1180, h: 770, resizeAt: { t: 1500, w: 770, h: 1180 }, maxSeconds: 120 }).result).not.toBeNull();
    expect(run({ quick: true, reducedMotion: true }).result).not.toBeNull();
    expect(run({ quick: true, noCtxParams: true }).result).not.toBeNull();
  });

  it('Italienisch: Ergebnis und Texte vorhanden', () => {
    const s = run({ quick: true, lang: 'it' });
    expect(s.result!.details![0].title).toBe(itTexts.feedback.arcTitle);
    expect(itTexts.tips[s.result!.tip!]).toBeTruthy();
    expect(s.labels[0]).toBe('1 / 4');
  });
});

describe('Trainer-Regler im Lauf', () => {
  function withLive(params: Record<string, unknown>, act: (ex: Exercise, now: number) => void, o: SimOpts = {}) {
    let done = false;
    const states: Array<LiveState | null> = [];
    run({
      quick: true,
      autoplay: false,
      liveEnabled: true,
      maxSeconds: 4,
      params,
      ...o,
      onFrame: (ex, now) => {
        states.push(getLive(ex));
        if (!done && now > 1000) {
          done = true;
          act(ex, now);
        }
      },
    });
    return states;
  }

  it('getLive: Wert, Grenzen, Schritte (100 ″ und 400 ″), Einheit; automatisch/fest = Zusatz (additiv), Trainer = Disparität selbst', () => {
    let a: LiveState | null = null;
    let t: LiveState | null = null;
    withLive({}, (ex) => (a = getLive(ex)));
    withLive({ control: 'trainer', startArcsec: 800 }, (ex) => (t = getLive(ex)));
    expect(a).toMatchObject({ key: 'disparity', unit: '″', step: 100, coarseStep: 400, additive: true, value: 0, min: -3600, max: 3600 });
    expect((a as unknown as LiveState).effective).toBeGreaterThanOrEqual(20);
    expect(t).toMatchObject({ key: 'disparity', unit: '″', step: 100, coarseStep: 400, additive: false, value: 800, effective: 800, min: 0, max: 3600 });
  });

  it('setLive wirkt sofort: der Wert steigt, die Anzeige gleitet; Sprung höchstens 400 ″; falscher Schlüssel ohne Wirkung', () => {
    const out: number[] = [];
    withLive({ control: 'trainer', startArcsec: 600 }, (ex) => {
      ex.setLive!('bogus', 100);
      out.push(getLive(ex)!.value);
      ex.setLive!('disparity', 5000);
      out.push(getLive(ex)!.value, getLive(ex)!.effective);
    });
    expect(out[0]).toBe(600);
    expect(out[1]).toBe(1000);
    expect(out[2]).toBeLessThan(1000); // gleitet noch
  });

  it('die Anzeige springt nie: Disparität zwischen zwei Bildern ändert sich um höchstens 40 ″', () => {
    const eff: number[] = [];
    let armed = false;
    run({
      quick: true,
      autoplay: false,
      maxSeconds: 3,
      params: { control: 'trainer', startArcsec: 400 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (st) eff.push(st.effective);
        if (!armed && now > 1000) {
          armed = true;
          ex.setLive!('disparity', 800);
        }
      },
    });
    for (let i = 1; i < eff.length; i++) expect(Math.abs(eff[i] - eff[i - 1])).toBeLessThan(40);
    expect(eff[eff.length - 1]).toBe(800);
  });

  it('Ergebnis: Tabelle „Trainer-Regler“ mit Anzahl, zuletzt gesetztem Wert und Zeitpunkt; ohne Benutzung keine Tabelle', () => {
    let n = 0;
    const s = run({
      quick: true,
      maxSeconds: 60,
      params: { control: 'fixed', startArcsec: 600 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (st && n < 2 && now > 800 + n * 600) {
          ex.setLive!('disparity', st.value + (n === 0 ? 400 : -100));
          n++;
        }
      },
    });
    expect(n).toBe(2);
    const t = s.result!.details!.find((x) => x.title === de.feedback.liveTitle)!;
    expect(t).toBeTruthy();
    expect(t.rows[0].label).toBe('Disparität vom Trainer verändert');
    expect(t.rows[0].value).toMatch(/^2-mal, zuletzt /);
    expect(t.rows[0].value).toMatch(/″/);
    expect(t.rows).toHaveLength(3);
    expect(run({ quick: true, params: { control: 'fixed' } }).result!.details!.some((x) => x.title === de.feedback.liveTitle)).toBe(false);
  });

  it('Modus „Trainer“ im Autoplay: die Übung führt die Disparität selbst und endet; das zählt nicht als Änderung durch den Trainer', () => {
    const s = run({ quick: true, maxSeconds: 80, params: { control: 'trainer', startArcsec: 800 } });
    expect(s.result).not.toBeNull();
    const arc = s.result!.details![0];
    expect(arc.rows[0].value).toBe('nur der Trainer-Regler');
    expect(s.result!.details!.some((x) => x.title === de.feedback.liveTitle)).toBe(false);
  });

  it('Ohne Regler und ohne Autoplay bleibt „Trainer“ bei der eingestellten Disparität (fest)', () => {
    const effs: number[] = [];
    run({
      quick: true,
      autoplay: false,
      maxSeconds: 3,
      params: { control: 'trainer', startArcsec: 700 },
      onFrame: (ex) => {
        const st = getLive(ex);
        if (st) effs.push(st.effective);
      },
    });
    expect(effs.length).toBeGreaterThan(10);
    for (const e of effs) expect(e).toBe(effs[0]);
    expect(effs[0]).toBe(700);
  });

  it('Regler wirkt nicht mehr nach dem Ende des Laufs', () => {
    let ex2: Exercise | null = null;
    run({ quick: true, maxSeconds: 60, onFrame: (ex) => (ex2 = ex) });
    expect(getLive(ex2!)).toBeNull();
  });
});

describe('Zeichnen', () => {
  interface Arc {
    x: number;
    y: number;
    r: number;
    color: string;
    op: string;
  }

  /** Zeichnet ein Bild an einer bestimmten Stelle des Laufs und gibt Kreisbögen, Rechtecke und Texte zurück */
  function capture(params: Record<string, unknown>, at: (ex: Exercise, ctx: ExerciseContext, now: number) => boolean, extra: SimOpts = {}) {
    const arcs: Arc[] = [];
    const strokeRects: Array<{ x: number; y: number; w: number; h: number; color: string }> = [];
    const texts: Array<{ s: string; fill: string }> = [];
    let taken = false;
    sim(laborStereo, {
      quick: true,
      autoplay: false,
      liveEnabled: true,
      maxSeconds: 6,
      params,
      ...extra,
      onFrame: (ex, now, ctx) => {
        if (taken || !at(ex, ctx, now)) return;
        taken = true;
        const base = fakeG();
        const g = new Proxy(base as object, {
          get: (t, k: string, r) => {
            if (k === 'arc') return (x: number, y: number, rad: number) => arcs.push({ x, y, r: rad, color: String(Reflect.get(t, 'fillStyle', r)), op: String(Reflect.get(t, 'globalCompositeOperation', r)) });
            if (k === 'strokeRect') return (x: number, y: number, w: number, h: number) => strokeRects.push({ x, y, w, h, color: String(Reflect.get(t, 'strokeStyle', r)) });
            if (k === 'fillText') return (s: string) => texts.push({ s: String(s), fill: String(Reflect.get(t, 'fillStyle', r)) });
            return Reflect.get(t, k, r);
          },
          set: (t, k: string, v) => Reflect.set(t, k, v),
        }) as unknown as CanvasRenderingContext2D;
        ex.render(g, now);
      },
    });
    return { arcs, strokeRects, texts };
  }

  it('Punktbilder: je Auge ein Bild in seiner Farbe, additive Mischung, gleiche Zahl Punkte; Rahmen neutral grau', () => {
    const c = capture({ dots: 300, control: 'fixed', startArcsec: 600 }, (ex, _c, now) => now > 800 && !!getLive(ex));
    const red = c.arcs.filter((a) => a.color === 'rgb(255,0,0)');
    const green = c.arcs.filter((a) => a.color === 'rgb(0,255,0)');
    expect(red).toHaveLength(300);
    expect(green).toHaveLength(300);
    for (const a of c.arcs) expect(a.op).toBe('lighter');
    expect(c.strokeRects).toHaveLength(1);
    expect(c.strokeRects[0].color).toMatch(/^rgba\(255,255,255,/);
  });

  it('Disparität: Punkte im Quadrat haben ±Disparität in Pixeln aus der Kalibrierung, alle anderen ohne Rauschen 0; Vorzeichen einheitlich im Quadrat', () => {
    const arcsec = 640;
    for (const [lens, viewDistanceCm, pxPerCm] of [['red', 40, 38], ['green', 40, 38], ['red', 60, 38], ['red', 40, 76]] as const) {
      const c = capture(
        { dots: 1500, noise: 'off', control: 'fixed', startArcsec: arcsec, leftLens: lens },
        (ex, _c, now) => now > 800 && !!getLive(ex),
        { viewDistanceCm, pxPerCm },
      );
      const n = 1500;
      const first = lens === 'red' ? 'rgb(255,0,0)' : 'rgb(0,255,0)';
      const second = lens === 'red' ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
      const left = c.arcs.filter((a) => a.color === first);
      const right = c.arcs.filter((a) => a.color === second);
      expect(left).toHaveLength(n);
      expect(right).toHaveLength(n);
      const want = arcsecToPx(arcsec, viewDistanceCm, pxPerCm);
      const ds: number[] = [];
      for (let i = 0; i < n; i++) ds.push(left[i].x - right[i].x); // Bild des linken Auges minus Bild des rechten Auges
      const nonzero = ds.filter((d) => Math.abs(d) > 1e-6);
      expect(nonzero.length, `${lens}/${viewDistanceCm}/${pxPerCm}`).toBeGreaterThan(40);
      expect(nonzero.length).toBeLessThan(400);
      for (const d of nonzero) expect(Math.abs(d)).toBeCloseTo(want, 6);
      // im Quadrat überall dasselbe Vorzeichen (gekreuzt oder ungekreuzt)
      expect(new Set(nonzero.map((d) => Math.sign(d))).size).toBe(1);
      // y ist für beide Augen gleich (nur waagerechter Versatz)
      for (let i = 0; i < n; i++) expect(left[i].y).toBeCloseTo(right[i].y, 9);
    }
  });

  it('mit Rauschen haben Punkte außerhalb des Quadrats zufällige Versätze bis ±2 × Disparität (beide Vorzeichen)', () => {
    const arcsec = 640;
    const c = capture({ dots: 1500, noise: 'on', control: 'fixed', startArcsec: arcsec }, (ex, _c, now) => now > 800 && !!getLive(ex));
    const left = c.arcs.filter((a) => a.color === 'rgb(255,0,0)');
    const right = c.arcs.filter((a) => a.color === 'rgb(0,255,0)');
    const want = arcsecToPx(arcsec, 40, 38);
    const ds = left.map((a, i) => a.x - right[i].x);
    expect(Math.max(...ds)).toBeLessThanOrEqual(2 * want + 1e-6);
    expect(Math.min(...ds)).toBeGreaterThanOrEqual(-2 * want - 1e-6);
    expect(ds.some((d) => d > 1e-6) && ds.some((d) => d < -1e-6)).toBe(true);
    expect(new Set(ds.map((d) => Math.round(d * 1e4))).size).toBeGreaterThan(50);
  });

  it('der Trainer-Regler ändert die Disparität im gezeichneten Bild: der Versatz in Pixeln wächst weich vom alten zum neuen Wert', () => {
    const maxD = (c: ReturnType<typeof capture>) => {
      const l = c.arcs.filter((a) => a.color === 'rgb(255,0,0)');
      const r = c.arcs.filter((a) => a.color === 'rgb(0,255,0)');
      return Math.max(...l.map((a, i) => Math.abs(a.x - r[i].x)));
    };
    const params = { dots: 600, noise: 'off', control: 'fixed', startArcsec: 400 };
    const before = capture(params, (_ex, _c, now) => now > 800);
    // 100 ms nach dem Setzen (+400 ″): die Anzeige ist unterwegs, noch nicht am Ziel
    let armedAt = -1;
    const during = capture(params, (ex, _c, now) => {
      if (now < 800) return false;
      if (armedAt < 0) {
        armedAt = now;
        ex.setLive!('disparity', 400);
      }
      return now - armedAt >= 100;
    });
    // nach dem Gleiten: am Ziel
    armedAt = -1;
    const after = capture(params, (ex, _c, now) => {
      if (now < 800) return false;
      if (armedAt < 0) {
        armedAt = now;
        ex.setLive!('disparity', 400);
      }
      return now - armedAt >= 400;
    });
    const px = (arcsec: number) => arcsecToPx(arcsec, 40, 38);
    expect(maxD(before)).toBeCloseTo(px(400), 6);
    expect(maxD(during)).toBeGreaterThan(px(400) + 1e-6);
    expect(maxD(during)).toBeLessThan(px(800) - 1e-6);
    expect(maxD(after)).toBeCloseTo(px(800), 6);
  });

  it('Bedienung neutral und beschriftet: Tasten „↑ Oben“, „↓ Unten“, „← Links“, „→ Rechts“ und die Frage – nie in Rot oder Grün', () => {
    const c = capture({}, (ex, _c, now) => now > 800 && !!getLive(ex));
    const labels = c.texts.map((t) => t.s);
    for (const l of ['↑ Oben', '↓ Unten', '← Links', '→ Rechts', 'Wo schwebt das Quadrat?']) expect(labels, l).toContain(l);
    for (const t of c.texts) expect(t.fill, t.s).not.toMatch(/^rgb\(255,0,0\)|^rgb\(0,255,0\)|#f00|#0f0/i);
  });

  it('Rückmeldung nach der Antwort: neutral hell, mit ✓/✗-Zeichen als Linien und Text („Richtig“ oder „Es lag: …“)', () => {
    let answered = false;
    const c = capture(
      { control: 'fixed' },
      (ex, _ctx, now) => {
        if (now < 800) return false;
        if (!answered) {
          answered = true;
          (ex.keyDown as (k: string, t: number) => void)('ArrowUp', now);
          return false;
        }
        return now > 900 && now < 1400;
      },
    );
    const labels = c.texts.map((t) => t.s);
    expect(labels.some((l) => l === 'Richtig' || /^Es lag: (Oben|Unten|Links|Rechts)$/.test(l))).toBe(true);
    for (const t of c.texts) expect(t.fill, t.s).not.toMatch(/^rgb\(255,0,0\)|^rgb\(0,255,0\)/);
  });

  it('Farbpaar Rot–Blau (0,160,255) und Helligkeit je Farbe: die Punkte nutzen genau diese Farben', () => {
    const c = capture({ dots: 200, tones: 'redblue', redLevel: 60, secondLevel: 80 }, (ex, _c, now) => now > 800 && !!getLive(ex));
    expect(new Set(c.arcs.map((a) => a.color))).toEqual(new Set(['rgb(153,0,0)', 'rgb(0,128,204)']));
  });
});

describe('Anordnung der Bühne', () => {
  it('Film und Spiel: Tasten und Feld bleiben auf der Bühne (Stichprobe über viele Bühnen)', () => {
    for (const [w, h] of [[390, 640], [360, 560], [820, 1120], [1180, 770], [1040, 715], [780, 290], [520, 300]] as const) {
      for (const demo of [false, true]) {
        const u = Math.min(w, h) / 100;
        const L = stereoLayout({ w, h, u, captionReserve: demo ? 70 : 0, demo, wantFieldPx: 26 * 38 });
        for (const r of L.buttons) {
          expect(r.x, `${w}×${h}`).toBeGreaterThanOrEqual(-0.5);
          expect(r.x + r.w).toBeLessThanOrEqual(w + 0.5);
          expect(r.y + r.h).toBeLessThanOrEqual(h + 0.5);
        }
        expect(L.cx - L.field / 2).toBeGreaterThanOrEqual(-0.5);
        expect(L.cx + L.field / 2).toBeLessThanOrEqual(w + 0.5);
      }
    }
  });
});

describe('Texte und Quellen', () => {
  textChecks({
    def: laborStereo,
    science,
    metricKeys: ['accuracy', 'correct', 'final_arcsec', 'rt_mean', 'px_arcsec', 'control', 'start', 'field', 'region', 'dots'],
    tipKeys: ['few', 'chance', 'harder', 'compare'],
    verifiedDois: [
      '10.1002/j.1538-7305.1960.tb03954.x', // Julesz 1960 (Crossref; kein Abstract)
      '10.1073/pnas.1105183108', // Ding & Levi 2011 (Crossref + PubMed)
      '10.1038/eye.2014.279', // Read 2015 (Crossref + PubMed)
      '10.1364/JOSAA.29.000313', // Birch 2012
    ],
  });

  it('Tiefe sehen: Übungswerte, keine Messung einer Schwelle, Farbsäume, grober Bildschirm, Pixelgrenze, keine natürliche Tiefe, keine klinische Untersuchung; Quellen ehrlich', () => {
    const all = JSON.stringify(de);
    expect(all).toMatch(/Übungswerte/);
    expect(all).toMatch(/keine Messung einer (Schwelle|Stereoschwelle)/);
    expect(all).toMatch(/Farbsäume/);
    expect(all).toMatch(/grobe Orientierung/);
    expect(all).toMatch(/ganzen Pixeln/);
    expect(all).toMatch(/keine natürliche Tiefe/);
    expect(all).toMatch(/klinische Untersuchung/);
    expect(all).toMatch(/Stereosehen/);
    expect(science.texts.de.research).toMatch(/Julesz, 1960/);
    expect(science.texts.de.research).toMatch(/Ding & Levi, 2011/);
    expect(science.texts.de.research).toMatch(/kleine Studie/);
    expect(science.texts.de.research).toMatch(/kein Bildschirmspiel mit Rot-Grün-Brille/);
    expect(science.texts.de.research).toMatch(/Für Menschen ohne Befund ist für diese Übung kein Nutzen belegt/);
    expect(science.texts.de.research).toMatch(/Akkommodation|Schärfe bleibt am Bildschirm/);
  });
});
