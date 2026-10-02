/**
 * Bewegte Ziele ordnen (Labor): reine Logik. Übertragen aus labor/test/ordering.test.js (Labor-Prototyp) und erweitert:
 * Zeiten in ms, Koordinaten in cm, Zufall über createRng (kein Math.random), keine festen Zufallswerte.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import { WOERTER } from '../../src/exercises/_shared/labor-woerter';
import {
  DOUBLE_TAP_MS,
  fitSizeCm,
  makeContent,
  MAX_STEP_S,
  OrderSession,
  orderParams,
  PARAMS,
  pointsFor,
  tipFor,
  type Item,
  type OrderSummary,
} from '../../src/exercises/labor-ziele-ordnen/logic';

function make(over: Record<string, unknown> = {}, seed = 1, extra: { w?: number; h?: number; minHit?: number } = {}): OrderSession {
  const p = orderParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  return new OrderSession(p, { rng: createRng(seed), fieldWcm: extra.w ?? 60, fieldHcm: extra.h ?? 34, minHitHalfCm: extra.minHit });
}
const labels = (s: OrderSession): string[] => s.order.map((id) => s.items[id].label);
const keysOf = (s: OrderSession): Array<number | string> => s.order.map((id) => s.items[id].key);

describe('Bewegte Ziele ordnen: Inhalt und Reihenfolge (aus dem Prototyp)', () => {
  it('Zahlen aufsteigend und absteigend', () => {
    expect(labels(make({ content: 'numbers', count: 5 }))).toEqual(['1', '2', '3', '4', '5']);
    expect(labels(make({ content: 'numbers_desc', count: 5 }))).toEqual(['5', '4', '3', '2', '1']);
  });

  it('Buchstaben: verschieden und alphabetisch geordnet', () => {
    const l = labels(make({ content: 'letters', count: 10 }));
    expect(new Set(l).size).toBe(10);
    expect(l).toEqual([...l].sort());
  });

  it('Wörter: verschieden, aus der Liste, nach Alphabet', () => {
    const l = labels(make({ content: 'words', count: 12 }, 7));
    expect(new Set(l).size).toBe(12);
    for (const w of l) expect(WOERTER).toContain(w);
    for (let i = 1; i < l.length; i++) expect(l[i - 1].localeCompare(l[i], 'de')).toBeLessThan(0);
  });

  it('Summen und Produkte: Ergebnisse verschieden, nach Ergebnis aufsteigend, Beschriftung stimmt zum Ergebnis', () => {
    for (const c of ['sums', 'products']) {
      const s = make({ content: c, count: 12 }, 3);
      const keys = keysOf(s) as number[];
      expect(new Set(keys).size).toBe(12);
      for (let i = 1; i < keys.length; i++) expect(keys[i - 1]).toBeLessThan(keys[i]);
      for (const it of s.items) {
        const m = it.label.match(/^(\d+)([+×])(\d+)$/);
        expect(m, it.label).toBeTruthy();
        const val = m![2] === '+' ? Number(m![1]) + Number(m![3]) : Number(m![1]) * Number(m![3]);
        expect(val).toBe(it.key);
      }
    }
  });

  it('auch die größte Anzahl (15) gibt es für jeden Inhalt mit eindeutigen Zielen', () => {
    for (const c of ['numbers', 'numbers_desc', 'letters', 'words', 'sums', 'products'] as const) {
      const cont = makeContent(c, 15, createRng(9));
      expect(cont.length, c).toBe(15);
      expect(new Set(cont.map((x) => x.label)).size, c).toBe(15);
      expect(new Set(cont.map((x) => x.key)).size, c).toBe(15);
    }
  });

  it('Inhalt und Anordnung hängen nur vom Zufallsgenerator ab (gleicher Startwert, gleiches Bild)', () => {
    const a = make({ content: 'words', motion: 'linear' }, 4);
    const b = make({ content: 'words', motion: 'linear' }, 4);
    expect(labels(a)).toEqual(labels(b));
    expect(a.items.map((i) => [i.x, i.y, i.vx, i.vy])).toEqual(b.items.map((i) => [i.x, i.y, i.vx, i.vy]));
    const c = make({ content: 'words' }, 5);
    expect(labels(c)).not.toEqual(labels(a));
  });
});

describe('Bewegte Ziele ordnen: Berühren', () => {
  it('falsches Ziel, richtiges Ziel, Danebentippen, Ende (Prototyp-Test)', () => {
    const s = make({ count: 4, motion: 'circle' });
    s.start(0);
    const w = s.items.find((i) => i.id !== s.expected()!.id)!;
    const rw = s.tap(w.x, w.y, 100);
    expect(rw).toMatchObject({ type: 'wrong' });
    expect(s.wrong).toBe(1);
    expect(s.tap(-100, -100, 150)).toEqual({ type: 'stray' });
    expect(s.stray).toBe(1);
    let t = 200;
    while (!s.finished) {
      const e = s.expected()!;
      expect(s.tap(e.x, e.y, t)!.type).toBe('hit');
      t += 500;
    }
    expect(s.trials.length).toBe(4);
    expect(s.tap(0, 0, t)).toBeNull();
    const sum = s.summary();
    expect(sum.solved).toBe(4);
    expect(sum.wrong).toBe(1);
    expect(sum.stray).toBe(1);
    expect(s.trials[0].wrongBefore).toBe(1);
    expect(s.trials[1].msSincePrev).toBe(500);
    expect(sum.complete).toBe(true);
  });

  it('das falsche Ziel meldet, welches Ziel erwartet wurde; das Ziel bleibt stehen', () => {
    const s = make({ count: 5, motion: 'circle', content: 'numbers' });
    s.start(0);
    const wrong = s.items[3];
    const r = s.tap(wrong.x, wrong.y, 100);
    expect(r).toMatchObject({ type: 'wrong', expected: '1' });
    expect(wrong.done).toBe(false);
    expect(s.next).toBe(0);
  });

  it('Tipp vor dem Start und nach dem Ende ist wirkungslos', () => {
    const s = make({ count: 3, motion: 'circle' });
    expect(s.tap(1, 1, 0)).toBeNull();
    s.start(0);
    let t = 100;
    while (!s.finished) {
      const e = s.expected()!;
      s.tap(e.x, e.y, (t += 400));
    }
    expect(s.tap(1, 1, t + 10)).toBeNull();
    expect(s.stray).toBe(0);
  });

  it('Doppeltipp auf dieselbe Stelle kurz nach einer Berührung wird ignoriert, später zählt er', () => {
    const s = make({ count: 5, motion: 'circle' });
    s.start(0);
    const e = s.expected()!;
    const x = e.x;
    const y = e.y;
    expect(s.tap(x, y, 500)!.type).toBe('hit');
    expect(s.tap(x, y, 500 + DOUBLE_TAP_MS - 10)).toEqual({ type: 'ignored' });
    expect(s.stray).toBe(0);
    // später an derselben (leeren) Stelle: Fehltipp
    const late = s.tap(x - 40, y, 500 + DOUBLE_TAP_MS + 400);
    expect(late!.type).toBe('stray');
    // Doppeltipp auf ein falsches Ziel zählt nur einmal
    const w = s.items[s.order[3]];
    expect(s.tap(w.x, w.y, 2000)!.type).toBe('wrong');
    expect(s.tap(w.x, w.y, 2100)).toEqual({ type: 'ignored' });
    expect(s.wrong).toBe(1);
  });

  it('der nächstgelegene Mittelpunkt gewinnt, wenn sich Kästchen überlappen', () => {
    const s = make({ count: 3, motion: 'circle', sizeCm: 3 });
    s.start(0);
    const [a, b] = [s.items[s.order[0]], s.items[s.order[1]]];
    // beide Ziele eng zusammenschieben
    a.x = 30;
    a.y = 17;
    b.x = 31.5;
    b.y = 17;
    expect(s.tap(30.2, 17, 100)).toMatchObject({ type: 'hit', label: a.label });
  });

  it('Trefferfläche: Kästchen plus Toleranz, mindestens ein Touch-Ziel', () => {
    const s = make({ count: 3, motion: 'circle', sizeCm: 1.5 }, 1, { minHit: 24 / 38 });
    s.start(0);
    const e = s.expected()!;
    const h = s.hitHalf(e);
    expect(h.hw).toBeGreaterThanOrEqual(24 / 38);
    expect(h.hh).toBeGreaterThanOrEqual(24 / 38);
    expect(s.tap(e.x + h.hw - 0.01, e.y, 100)!.type).toBe('hit');
  });
});

describe('Bewegte Ziele ordnen: Bewegung', () => {
  it('Geradeaus: bleibt im Feld, Geschwindigkeit konstant (Prototyp-Test)', () => {
    const s = make({ motion: 'linear', count: 6, speedCmS: 12, content: 'words', sizeCm: 3 }, 5);
    s.start(0);
    const speeds = s.items.map((i) => Math.hypot(i.vx, i.vy));
    for (let t = 16; t <= 40000; t += 16) {
      s.update(t);
      for (const it of s.items) {
        expect(it.x).toBeGreaterThanOrEqual(it.hw - 1e-6);
        expect(it.x).toBeLessThanOrEqual(60 - it.hw + 1e-6);
        expect(it.y).toBeGreaterThanOrEqual(it.hh - 1e-6);
        expect(it.y).toBeLessThanOrEqual(34 - it.hh + 1e-6);
      }
    }
    s.items.forEach((it, i) => {
      expect(Math.abs(Math.hypot(it.vx, it.vy) - speeds[i])).toBeLessThan(1e-9);
      expect(Math.abs(speeds[i] - 12)).toBeLessThan(1e-9);
    });
  });

  it('Kreisbahn: gleicher Radius, gleichmäßige Abstände, Richtung (Prototyp-Test)', () => {
    const s = make({ motion: 'circle', count: 6, speedCmS: 5, direction: 'cw' });
    s.start(0);
    const rad = (it: Item) => Math.hypot(it.x - 30, it.y - 17);
    const r0 = rad(s.items[0]);
    for (const it of s.items) expect(Math.abs(rad(it) - r0)).toBeLessThan(1e-9);
    expect(r0).toBeLessThanOrEqual(17);
    const a0 = s.items.map((i) => i.theta);
    s.update(1000);
    const moved = s.items[0].theta - a0[0];
    expect(moved, 'im Uhrzeigersinn wächst der Winkel').toBeGreaterThan(0);
    expect(Math.abs(moved - s.omega * MAX_STEP_S), 'Zeitschritt auf 0,25 s begrenzt').toBeLessThan(1e-9);
    expect(make({ motion: 'circle', direction: 'ccw' }).omega).toBeLessThan(0);
    // gleichmäßige Winkelabstände
    const th = [...s.items.map((i) => ((i.theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI))].sort((a, b) => a - b);
    for (let i = 1; i < th.length; i++) expect(th[i] - th[i - 1]).toBeCloseTo((2 * Math.PI) / 6, 6);
  });

  it('Ellipse liegt auf der Ellipsengleichung (Prototyp-Test)', () => {
    const s = make({ motion: 'ellipse', count: 8 });
    s.start(0);
    for (let t = 100; t < 5000; t += 100) s.update(t);
    for (const it of s.items) {
      const v = ((it.x - s.cx) / s.rx) ** 2 + ((it.y - s.cy) / s.ry) ** 2;
      expect(Math.abs(v - 1)).toBeLessThan(1e-9);
    }
    expect(s.rx).toBeGreaterThan(s.ry);
  });

  it('Bahngeschwindigkeit entspricht dem Tempo (cm/s), auch bei der Ellipse ungefähr', () => {
    const s = make({ motion: 'circle', count: 4, speedCmS: 7.5 });
    s.start(0);
    const p0 = { x: s.items[0].x, y: s.items[0].y };
    s.update(100);
    const d = Math.hypot(s.items[0].x - p0.x, s.items[0].y - p0.y);
    expect(d / 0.1).toBeCloseTo(7.5, 1);
  });

  it('Bewegung ist bildratenunabhängig: 30, 60 und 144 Hz legen denselben Weg zurück', () => {
    const end: Array<[number, number]> = [];
    for (const fps of [30, 60, 144]) {
      const s = make({ motion: 'linear', count: 3, speedCmS: 9 }, 2);
      s.start(0);
      for (let i = 1; i <= fps * 2; i++) s.update((i * 1000) / fps);
      end.push([s.items[0].x, s.items[0].y]);
    }
    for (const e of end.slice(1)) {
      expect(e[0]).toBeCloseTo(end[0][0], 5);
      expect(e[1]).toBeCloseTo(end[0][1], 5);
    }
  });

  it('lange Pause (z. B. Browser im Hintergrund): Bewegung springt höchstens 0,25 s weiter', () => {
    const s = make({ motion: 'circle', count: 4, speedCmS: 6 });
    s.start(0);
    const th0 = s.items[0].theta;
    s.update(60000);
    expect(s.items[0].theta - th0).toBeCloseTo(s.omega * MAX_STEP_S, 9);
  });

  it('positionAfter sagt die Lage voraus (Kreis, Ellipse, Geradeaus mit Abprall)', () => {
    for (const motion of ['circle', 'ellipse', 'linear']) {
      const s = make({ motion, count: 5, speedCmS: 14 }, 3);
      s.start(0);
      const it = s.items[0];
      const pred = s.positionAfter(it, 3000);
      // tatsächlich in Schritten von 0,2 s (unter dem Begrenzer) weiterbewegen
      for (let t = 200; t <= 3000; t += 200) s.update(t);
      expect(pred.x).toBeCloseTo(it.x, 4);
      expect(pred.y).toBeCloseTo(it.y, 4);
    }
  });

  it('Zeitlimit beendet die Übung; Gesamtzeit = Limit (Prototyp-Test)', () => {
    const s = make({ timeLimitS: 10, count: 5 });
    s.start(0);
    s.update(9999);
    expect(s.finished).toBe(false);
    s.update(10000);
    expect(s.finished).toBe(true);
    const sum = s.summary();
    expect(sum.totalMs).toBe(10000);
    expect(sum.complete).toBe(false);
    expect(sum.solved).toBe(0);
    expect(sum.tMeanMs).toBeNull();
    expect(sum.tSdMs).toBeNull();
    expect(s.remainingS(4000)).toBeCloseTo(6, 6);
    expect(make({ timeLimitS: 0 }).remainingS(100)).toBeNull();
  });

  it('ohne Zeitlimit endet nur das letzte Ziel die Übung', () => {
    const s = make({ timeLimitS: 0, count: 3, motion: 'circle' });
    s.start(0);
    s.update(100000);
    expect(s.finished).toBe(false);
  });
});

describe('Bewegte Ziele ordnen: Feld, Größe, Drehen', () => {
  it('Zeichengröße wird begrenzt, damit das längste Kästchen ins Feld passt, aber nie unter ein Touch-Ziel', () => {
    expect(fitSizeCm(3, 3, 60, 34)).toBe(3);
    const f = fitSizeCm(3, 13, 10, 22);
    expect(f).toBeLessThan(3);
    expect(13 * f * 0.64).toBeLessThanOrEqual(0.9 * 10 + 1e-9);
    expect(fitSizeCm(3, 13, 10, 22, 1.26)).toBeGreaterThanOrEqual(1.26);
    expect(fitSizeCm(1.5, 13, 5, 22, 1.26)).toBeGreaterThanOrEqual(1.26);
    expect(fitSizeCm(8, 1, 60, 8)).toBeLessThanOrEqual(0.4 * 8 + 1e-9);
  });

  it('kleines Feld (Handy hochkant): Wörter bleiben im Feld und die Sitzung läuft', () => {
    const s = make({ content: 'words', count: 15, motion: 'linear', sizeCm: 3 }, 6, { w: 10.2, h: 19, minHit: 24 / 38 });
    s.start(0);
    for (let t = 16; t < 30000; t += 16) {
      s.update(t);
      for (const it of s.items) {
        expect(it.x).toBeGreaterThanOrEqual(Math.min(it.hw, 5.1) - 1e-6);
        expect(it.x).toBeLessThanOrEqual(Math.max(10.2 - it.hw, 5.1) + 1e-6);
      }
    }
    for (const it of s.items) expect(2 * it.hw).toBeLessThanOrEqual(10.2 * 1.3);
  });

  it('Drehen des Tablets: Ziele werden ins neue Feld geschoben, Bahnen neu berechnet, Reihenfolge bleibt', () => {
    const s = make({ motion: 'linear', count: 8 }, 3);
    s.start(0);
    s.update(500);
    s.setField(34, 60);
    for (const it of s.items) {
      expect(it.x).toBeGreaterThanOrEqual(Math.min(it.hw, 17) - 1e-9);
      expect(it.x).toBeLessThanOrEqual(Math.max(34 - it.hw, 17) + 1e-9);
      expect(it.y).toBeLessThanOrEqual(Math.max(60 - it.hh, 30) + 1e-9);
    }
    const o = make({ motion: 'ellipse', count: 6 }, 3);
    o.start(0);
    o.setField(34, 60);
    expect(o.cx).toBeCloseTo(17, 9);
    expect(o.cy).toBeCloseTo(30, 9);
    for (const it of o.items) {
      const v = ((it.x - o.cx) / o.rx) ** 2 + ((it.y - o.cy) / o.ry) ** 2;
      expect(v).toBeCloseTo(1, 9);
    }
    expect(o.ry).toBeGreaterThan(o.rx * 0.9);
  });
});

describe('Bewegte Ziele ordnen: Kennzahlen', () => {
  it('Zusammenfassung ohne NaN auch ohne richtige Ziele oder mit einem einzigen', () => {
    const s = make({ count: 3, motion: 'circle', timeLimitS: 5 });
    s.start(0);
    s.update(5000);
    const a = s.summary();
    for (const v of [a.solved, a.wrong, a.stray, a.totalMs]) expect(Number.isFinite(v as number)).toBe(true);
    expect(a.tMeanMs).toBeNull();
    const s1 = make({ count: 3, motion: 'circle' });
    s1.start(0);
    const e = s1.expected()!;
    s1.tap(e.x, e.y, 700);
    const b = s1.summary();
    expect(b.totalMs).toBeNull(); // noch nicht beendet
    expect(b.tMeanMs).toBe(700);
    expect(b.tSdMs).toBeNull(); // eine einzige Zeit: keine Streuung
  });

  it('Kennzahlen stimmen (Prototyp-Test): Anzahl, Zeit pro Ziel, Streuung', () => {
    const s = make({ count: 4, motion: 'circle' });
    s.start(1000);
    let t = 1000;
    for (const dt of [400, 600, 500, 700]) {
      const e = s.expected()!;
      t += dt;
      s.tap(e.x, e.y, t);
    }
    const sum = s.summary();
    expect(sum.solved).toBe(4);
    expect(sum.totalMs).toBe(2200);
    expect(sum.tMeanMs).toBe(550);
    expect(sum.tSdMs).toBeCloseTo(129, 0);
  });

  it('Einstellungen werden bereinigt: unbekannte Werte → Standard, Zahlen im Raster', () => {
    const p = orderParams(sanitizeParams(PARAMS, { content: 'Quatsch', count: 99, motion: 7, speedCmS: 0, sizeCm: 2.26, direction: 'x', timeLimitS: 7, sound: 'maybe' }));
    expect(p).toEqual({ content: 'numbers', count: 15, motion: 'linear', speedCmS: 1, sizeCm: 2.5, direction: 'cw', timeLimitS: 5, sound: 'no' });
    expect(orderParams({})).toEqual(orderParams(defaultParams(PARAMS)));
    expect(orderParams(defaultParams(PARAMS))).toEqual({ content: 'numbers', count: 8, motion: 'linear', speedCmS: 6, sizeCm: 3, direction: 'cw', timeLimitS: 0, sound: 'no' });
  });

  it('PARAMS entsprechen dem Prototyp (Schlüssel, Grenzen, Standard); nur der Ton ist neutral', () => {
    const num = (k: string) => PARAMS.find((d) => d.key === k) as { min: number; max: number; step: number; default: number };
    expect(PARAMS.map((d) => d.key)).toEqual(['content', 'count', 'motion', 'speedCmS', 'sizeCm', 'direction', 'timeLimitS', 'sound']);
    expect(num('count')).toMatchObject({ min: 3, max: 15, step: 1, default: 8 });
    expect(num('speedCmS')).toMatchObject({ min: 1, max: 30, step: 0.5, default: 6 });
    expect(num('sizeCm')).toMatchObject({ min: 1.5, max: 8, step: 0.5, default: 3 });
    expect(num('timeLimitS')).toMatchObject({ min: 0, max: 300, step: 5, default: 0 });
    expect(PARAMS.filter((d) => d.neutral).map((d) => d.key)).toEqual(['sound']);
    expect(PARAMS.filter((d) => d.summary).length).toBeGreaterThanOrEqual(2);
    expect(PARAMS.filter((d) => d.summary).length).toBeLessThanOrEqual(3);
  });
});

describe('Bewegte Ziele ordnen: Tipps und Punkte', () => {
  const base: OrderSummary = { solved: 8, count: 8, totalMs: 30000, wrong: 2, stray: 1, tMeanMs: 3700, tSdMs: 1000, complete: true, trials: [] };
  it('Tipp-Schlüssel nach Faustregeln', () => {
    expect(tipFor({ ...base, solved: 0, complete: false })).toBe('few');
    expect(tipFor({ ...base, solved: 4, complete: false })).toBe('timeout');
    expect(tipFor({ ...base, wrong: 5 })).toBe('wrong');
    expect(tipFor({ ...base, stray: 4 })).toBe('stray');
    expect(tipFor({ ...base, wrong: 0, stray: 0 })).toBe('harder');
    expect(tipFor({ ...base, tSdMs: 4000 })).toBe('steady');
    expect(tipFor(base)).toBe('compare');
  });
  it('Punkte: 10 je richtigem Ziel, nie negativ', () => {
    expect(pointsFor(8)).toBe(80);
    expect(pointsFor(-3)).toBe(0);
    expect(pointsFor(2.6)).toBe(30);
  });
});
