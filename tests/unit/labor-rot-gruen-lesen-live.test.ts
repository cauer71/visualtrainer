import { describe, expect, it } from 'vitest';
import type { Exercise, LiveState } from '../../src/core/types';
import { laborRotGruenLesen } from '../../src/exercises/labor-rot-gruen-lesen';
import { rgLayout } from '../../src/exercises/labor-rot-gruen-lesen/layout';
import { colorOffsets, PARAMS, shiftPx } from '../../src/exercises/labor-rot-gruen-lesen/logic';
import { de } from '../../src/exercises/labor-rot-gruen-lesen/texts';
import { fakeG, simulate as sim, type SimOpts } from './_labor-sim';

const run = (o: SimOpts = {}) => sim(laborRotGruenLesen, o);
const getLive = (ex: Exercise) => ex.getLive?.() ?? null;

describe('Rot-Grün-Lesen: Trainer-Regler für den Versatz', () => {
  it('Regler beschrieben: Versatz in Δ, Schritt 0,5 Δ, grober Schritt 2 Δ; Standardwerte der Übung unverändert', () => {
    expect(laborRotGruenLesen.liveControls).toEqual([{ key: 'shiftPd', unit: 'Δ', min: -12, max: 12, step: 0.5, coarseStep: 2 }]);
    expect(PARAMS.find((p) => p.key === 'shiftPd')).toMatchObject({ min: 0, max: 12, step: 0.5, default: 0 });
    expect(de.liveLabels?.shiftPd).toMatch(/Versatz der Bilder/);
  });

  it('getLive: vor dem Start und im Intro-Film nichts; im Lauf ein Zusatz zum geplanten Versatz (additiv), Anfangswert 0', () => {
    let state: LiveState | null | undefined;
    let before: LiveState | null | undefined;
    run({
      quick: true,
      autoplay: false,
      maxSeconds: 3,
      onFrame: (ex, now) => {
        if (before === undefined) before = getLive(ex);
        if (now > 1500 && state === undefined) state = getLive(ex);
      },
    });
    expect(before).toBeNull();
    expect(state).toMatchObject({ key: 'shiftPd', unit: 'Δ', additive: true, value: 0, min: -12, max: 12, step: 0.5, coarseStep: 2, effective: 0 });
    let demo: LiveState | null | undefined;
    run({
      mode: 'demo',
      onFrame: (ex, now) => {
        if (now > 3000 && demo === undefined) {
          ex.setLive?.('shiftPd', 2);
          demo = getLive(ex);
        }
      },
    });
    expect(demo).toBeNull();
  });

  it('der erste Durchgang hat ohne Regler immer Versatz 0; danach geplanter Wert plus Zusatz, auf 0 … 12 Δ begrenzt', () => {
    // erster Durchgang: noch Versatz 0, auch bei eingestellten 6 Δ
    const first: number[] = [];
    run({
      quick: true,
      autoplay: false,
      maxSeconds: 1.8,
      params: { shiftPd: 6, rampDurchgaenge: 0 },
      onFrame: (ex) => {
        const s = getLive(ex);
        if (s) first.push(s.effective);
      },
    });
    expect(first.length).toBeGreaterThan(10);
    for (const e of first) expect(e).toBe(0);
    // zweiter Durchgang (quick: 2 Folgen): geplant 6 Δ; Zusatz −2 → 4 Δ, +10 → 12 Δ (Obergrenze)
    const secondTrial = (steps: number, delta: number) => {
      let armedAt = -1;
      let eff = -1;
      run({
        quick: true,
        maxSeconds: 60,
        params: { shiftPd: 6, rampDurchgaenge: 0 },
        onFrame: (ex, now) => {
          const st = getLive(ex);
          if (!st) return;
          if (armedAt < 0 && st.effective > 0.5) {
            armedAt = now;
            for (let i = 0; i < steps; i++) ex.setLive!('shiftPd', getLive(ex)!.value + delta);
          }
          if (armedAt >= 0 && now - armedAt > 700 && eff < 0) eff = st.effective;
        },
      });
      return eff;
    };
    expect(secondTrial(0, 0)).toBeCloseTo(6, 2);
    expect(secondTrial(1, -2)).toBeCloseTo(4, 2);
    expect(secondTrial(1, 2)).toBeCloseTo(8, 2);
    expect(secondTrial(6, 2)).toBeCloseTo(12, 2);
  });

  it('Zusatz im Lauf: Versatz = geplanter Wert + Zusatz (gleitet weich), nie unter 0, nie über 12 Δ; Sprung je Änderung höchstens 2 Δ', () => {
    const seen: number[] = [];
    const jumps: number[] = [];
    let step = 0;
    run({
      quick: true,
      autoplay: false,
      liveEnabled: true,
      maxSeconds: 6,
      params: { shiftPd: 0 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (!st) return;
        seen.push(st.effective);
        if (now > 1000 + step * 400 && step < 12) {
          const before = st.value;
          ex.setLive!('shiftPd', 99);
          jumps.push(getLive(ex)!.value - before);
          step++;
        }
      },
    });
    expect(jumps[0]).toBe(2);
    for (const j of jumps) expect(j).toBeLessThanOrEqual(2 + 1e-9);
    expect(Math.max(...seen)).toBeLessThanOrEqual(12 + 1e-9);
    expect(Math.min(...seen)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...seen)).toBeGreaterThan(8);
    // weich: zwischen zwei Bildern nie mehr als ca. 0,5 Δ
    for (let i = 1; i < seen.length; i++) expect(Math.abs(seen[i] - seen[i - 1])).toBeLessThan(0.5);
  });

  it('negativer Zusatz senkt den geplanten Versatz, aber nicht unter 0', () => {
    const seen: number[] = [];
    let step = 0;
    run({
      quick: true,
      autoplay: false,
      maxSeconds: 5,
      params: { shiftPd: 4, rampDurchgaenge: 0 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (!st) return;
        seen.push(st.effective);
        if (now > 800 + step * 400 && step < 5) {
          ex.setLive!('shiftPd', st.value - 2);
          step++;
        }
      },
    });
    expect(Math.min(...seen)).toBeGreaterThanOrEqual(0);
    expect(seen[seen.length - 1]).toBe(0);
  });

  it('Ergebnis: Tabelle „Trainer-Regler“ mit Zeitpunkt, Durchgang, Zusatz und Gesamtwert; „Versatz der Bilder“ nennt den größten Versatz, auch ohne eingestellten Versatz', () => {
    let n = 0;
    const s = run({
      quick: true,
      maxSeconds: 60,
      params: { shiftPd: 0 },
      onFrame: (ex, now) => {
        const st = getLive(ex);
        if (st && n < 3 && now > 900 + n * 500) {
          ex.setLive!('shiftPd', st.value + 1);
          n++;
        }
      },
    });
    expect(n).toBe(3);
    const r = s.result!;
    const table = r.details!.find((t) => t.title === de.feedback.liveTitle)!;
    expect(table).toBeTruthy();
    expect(table.rows[0].label).toBe('Versatz vom Trainer verändert');
    expect(table.rows[0].value).toMatch(/^3-mal, zuletzt Zusatz \+\d,\d Δ \(gesamt \d+,\d Δ\)$/);
    expect(table.rows).toHaveLength(4);
    for (const row of table.rows.slice(1)) {
      expect(row.label).toMatch(/^Durchgang \d+, \d:\d\d$/);
      expect(row.value).toMatch(/^Zusatz \+\d,\d Δ \(gesamt \d+,\d Δ\)$/);
    }
    expect(table.note).toMatch(/verändert keine Einstellungen/);
    const more = r.details!.find((t) => t.title === de.feedback.moreTitle)!;
    const shiftRow = more.rows.find((x) => x.label === de.metrics.shift)!;
    expect(shiftRow).toBeTruthy();
    expect(shiftRow.text).toMatch(/mit dem Trainer-Regler: größter Versatz \d+,\d Δ/);
    expect(more.rows.length).toBeGreaterThanOrEqual(3);
  });

  it('ohne Benutzung des Reglers bleibt alles wie bisher: gleiche Zufallsfolge gleiches Ergebnis, keine Tabelle, keine Zeile „Versatz“', () => {
    const a = run({ quick: true, seed: 11 });
    let polled = 0;
    const b = run({
      quick: true,
      seed: 11,
      onFrame: (ex) => {
        getLive(ex);
        polled++;
      },
    });
    expect(polled).toBeGreaterThan(10);
    expect(JSON.stringify(b.result)).toBe(JSON.stringify(a.result));
    expect(a.result!.details!.some((t) => t.title === de.feedback.liveTitle)).toBe(false);
    const more = a.result!.details!.find((t) => t.title === de.feedback.moreTitle)!;
    expect(more.rows.some((x) => x.label === de.metrics.shift)).toBe(false);
  });

  it('Zeichnen: der Zusatz verschiebt rote und grüne Zeichen gegeneinander um den Versatz in Pixeln (Konvergenz, rotes Glas links); Zeichen überlappen nie', () => {
    const grab = (extra: number) => {
      const out: Array<{ s: string; x: number; y: number; fill: string }> = [];
      let armed = -1;
      let state: LiveState | null = null;
      run({
        quick: true,
        autoplay: false,
        liveEnabled: true,
        seed: 21,
        maxSeconds: 5,
        params: { leftLens: 'red', tones: 'redgreen', length: 6, sizeCm: 1.2 },
        onFrame: (ex, now) => {
          const st = getLive(ex);
          if (!st || out.length) return;
          if (armed < 0 && now > 1300) {
            armed = now;
            for (let i = 0; i < Math.ceil(extra / 2); i++) ex.setLive!('shiftPd', Math.min(extra, getLive(ex)!.value + 2));
          }
          if (armed >= 0 && now - armed > 600) {
            state = st;
            const base = fakeG();
            const g = new Proxy(base as object, {
              get: (t, k: string, r) => {
                if (k === 'fillText') return (s: string, x: number, y: number) => out.push({ s: String(s), x, y, fill: String(Reflect.get(t, 'fillStyle', r)) });
                return Reflect.get(t, k, r);
              },
              set: (t, k: string, v) => Reflect.set(t, k, v),
            }) as unknown as CanvasRenderingContext2D;
            ex.render(g, now);
          }
        },
      });
      return { out, state: state as LiveState | null };
    };
    const zero = grab(0);
    const four = grab(4);
    expect(four.state!.effective).toBeCloseTo(4, 2);
    const chars = (o: typeof zero.out) => o.filter((t) => /^\d$/.test(t.s) && /^rgb\((255,0,0|0,255,0)\)$/.test(t.fill) && t.y < 260);
    const c0 = chars(zero.out);
    const c4 = chars(four.out);
    expect(c0).toHaveLength(6);
    expect(c4).toHaveLength(6);
    const px = shiftPx(4, 40, 38);
    // erwartete Mitten der Plätze mit der Anordnung für den größten Versatz
    const calib = { w: 1040, h: 715, u: 7.15 };
    const keyCount = 11;
    const L = rgLayout({ w: calib.w, h: calib.h, u: calib.u, captionReserve: 0, demo: false, wantGlyphPx: 1.2 * 38, length: 6, keyCount, controlMarks: false, shiftPx: px });
    const off = colorOffsets('red', 'convergence', px);
    c4.forEach((t, i) => {
      const color = t.fill === 'rgb(255,0,0)' ? 'a' : 'b';
      expect(t.x).toBeCloseTo(L.chars[i].x + off[color], 1);
    });
    // ohne Zusatz keine Verschiebung: Zeichen auf ihren Plätzen
    const L0 = rgLayout({ w: calib.w, h: calib.h, u: calib.u, captionReserve: 0, demo: false, wantGlyphPx: 1.2 * 38, length: 6, keyCount, controlMarks: false, shiftPx: 0 });
    c0.forEach((t, i) => expect(t.x).toBeCloseTo(L0.chars[i].x, 1));
    // versetzte Zeichen überlappen nie: Abstand benachbarter Zeichen ≥ Zeichenbreite
    for (let i = 1; i < c4.length; i++) expect(c4[i].x - c4[i - 1].x).toBeGreaterThan(1.05 * L.glyph - 1e-6);
  });

  it('Variantenschlüssel: Der Verlauf des Reglers teilt den Verlauf nicht (kein Parameter, nicht Teil des Schlüssels)', () => {
    expect(PARAMS.map((p) => p.key)).not.toContain('live');
    expect(laborRotGruenLesen.liveControls![0].key).not.toBe('');
    // die Einstellung „Versatz“ selbst gehört weiter zum Schlüssel
    expect(PARAMS.find((p) => p.key === 'shiftPd')!.neutral).toBeUndefined();
  });
});
