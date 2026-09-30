import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  computeStats,
  COVERS,
  coverRect,
  fieldMargin,
  gapMs,
  gridCovers,
  hitRadiusPx,
  layoutCovers,
  levelOf,
  MAX_LEVEL,
  MIN_VISIBLE_MS,
  minGap,
  peekAlpha,
  peekPoints,
  peekProgress,
  pickSpot,
  pointsFor,
  rectGap,
  sidesOf,
  SLIDE_MS,
  switchProb,
  tipFor,
  visibleMs,
  type Cover,
  type Spot,
} from '../../src/exercises/hinter-der-deckung/logic';

describe('hinter-der-deckung: Stufenfunktionen', () => {
  it('Sichtzeit sinkt von 1,6 s auf 0,52 s und bleibt weich ein-/ausblendbar', () => {
    expect(visibleMs(1)).toBe(1600);
    expect(visibleMs(MAX_LEVEL)).toBe(MIN_VISIBLE_MS);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(visibleMs(l)).toBeLessThanOrEqual(visibleMs(l - 1));
    expect(visibleMs(-4)).toBe(1600);
    expect(visibleMs(99)).toBe(MIN_VISIBLE_MS);
    // je Seite mindestens 100 ms Übergang plus eine kurze volle Sichtbarkeit
    expect(MIN_VISIBLE_MS).toBeGreaterThanOrEqual(2 * SLIDE_MS + 100);
    expect(SLIDE_MS).toBeGreaterThanOrEqual(100);
    expect(levelOf(4.9)).toBe(4);
  });

  it('Ortswechsel-Häufigkeit steigt von 25 % auf 90 %', () => {
    expect(switchProb(1)).toBeCloseTo(0.25);
    expect(switchProb(MAX_LEVEL)).toBeCloseTo(0.9);
    for (let l = 2; l <= MAX_LEVEL; l++) expect(switchProb(l)).toBeGreaterThan(switchProb(l - 1));
  });

  it('Pause ist zufällig zwischen 700 und 1300 ms', () => {
    const rng = createRng(4);
    const set = new Set<number>();
    for (let i = 0; i < 200; i++) {
      const g = gapMs(rng);
      expect(g).toBeGreaterThanOrEqual(700);
      expect(g).toBeLessThan(1300);
      set.add(Math.round(g));
    }
    expect(set.size).toBeGreaterThan(50);
  });

  it('Trefferradius mindestens 24 px', () => {
    for (const r of [8, 16, 20, 40]) expect(hitRadiusPx(r)).toBeGreaterThanOrEqual(24);
    expect(hitRadiusPx(40)).toBeGreaterThanOrEqual(40);
  });
});

describe('hinter-der-deckung: weiches Hervorschieben', () => {
  it('verdeckt vor Beginn und nach Ende, dazwischen voll', () => {
    const life = 1000;
    expect(peekProgress(-10, life)).toBe(0);
    expect(peekProgress(0, life)).toBe(0);
    expect(peekProgress(life, life)).toBe(0);
    expect(peekProgress(life + 100, life)).toBe(0);
    expect(peekProgress(life / 2, life)).toBe(1);
    expect(peekProgress(SLIDE_MS, life)).toBeCloseTo(1);
  });

  it('keine Sprünge: Änderung je 16 ms höchstens ≈ 1/3 des Weges (kein Blitzen)', () => {
    for (const life of [MIN_VISIBLE_MS, 800, 1600]) {
      let prev = peekProgress(0, life);
      for (let age = 16; age <= life; age += 16) {
        const p = peekProgress(age, life);
        expect(Math.abs(p - prev)).toBeLessThan(0.34);
        prev = p;
      }
    }
  });

  it('Deckkraft: 0 verdeckt, voll ab 40 % des Weges', () => {
    expect(peekAlpha(0)).toBe(0);
    expect(peekAlpha(0.4)).toBe(1);
    expect(peekAlpha(1)).toBe(1);
    expect(peekAlpha(0.2)).toBeCloseTo(0.5);
  });
});

describe('hinter-der-deckung: Anordnung der Deckungen', () => {
  const sizes: Array<[number, number, number]> = [
    [960, 520, 30], // Tablet quer
    [520, 760, 18], // Tablet/Handy hoch
    [1100, 620, 34], // großes Tablet
    [780, 330, 24], // Intro-Film (Feld niedrig)
  ];

  it('Deckungen bleiben im Feld, überlappen nie und halten die Mindestlücke', () => {
    for (const [fw, fh, r] of sizes) {
      const m = fieldMargin(r);
      for (let seed = 1; seed <= 60; seed++) {
        const covers = layoutCovers(createRng(seed), fw, fh, r);
        expect(covers.length).toBeGreaterThanOrEqual(3);
        expect(covers.length).toBeLessThanOrEqual(COVERS);
        const rects = covers.map((c) => coverRect(c, fw, fh));
        rects.forEach((rc, i) => {
          expect(rc.x).toBeGreaterThanOrEqual(m - 1e-6);
          expect(rc.y).toBeGreaterThanOrEqual(m - 1e-6);
          expect(rc.x + rc.w).toBeLessThanOrEqual(fw - m + 1e-6);
          expect(rc.y + rc.h).toBeLessThanOrEqual(fh - m + 1e-6);
          // hoch genug für ein Ziel, das sich dahinter verbirgt
          expect(rc.w).toBeGreaterThanOrEqual(2.1 * r);
          expect(rc.h).toBeGreaterThanOrEqual(2.1 * r);
          for (let j = 0; j < i; j++) expect(rectGap(rc, rects[j])).toBeGreaterThanOrEqual(minGap(r) - 1e-6);
        });
      }
    }
  });

  it('Anordnung variiert zwischen Würfen und ist bei gleichem Startwert gleich', () => {
    const a = layoutCovers(createRng(5), 960, 520, 30);
    const b = layoutCovers(createRng(5), 960, 520, 30);
    const c = layoutCovers(createRng(6), 960, 520, 30);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
    const kinds = new Set<string>();
    for (let s = 1; s < 40; s++) for (const cv of layoutCovers(createRng(s), 960, 520, 30)) kinds.add(cv.kind);
    expect(kinds.has('box') && kinds.has('wall')).toBe(true);
  });

  it('Notraster liefert auch für winzige Felder endliche Werte', () => {
    for (const [fw, fh] of [
      [200, 120],
      [120, 300],
    ]) {
      const g = gridCovers(fw, fh, 30);
      expect(g.length).toBe(COVERS);
      for (const c of g) for (const v of [c.nx, c.ny, c.nw, c.nh]) expect(Number.isFinite(v)).toBe(true);
    }
    const tiny = layoutCovers(createRng(1), 160, 90, 30);
    expect(tiny.length).toBeGreaterThan(0);
  });
});

describe('hinter-der-deckung: Ort des Ziels', () => {
  const covers: Cover[] = [
    { nx: 0.2, ny: 0.5, nw: 0.15, nh: 0.3, kind: 'box' },
    { nx: 0.5, ny: 0.5, nw: 0.1, nh: 0.5, kind: 'wall' },
    { nx: 0.8, ny: 0.5, nw: 0.15, nh: 0.3, kind: 'box' },
  ];

  it('Kasten lässt links, rechts und oben zu, Wand nur seitlich', () => {
    expect(sidesOf('box')).toEqual(['L', 'R', 'T']);
    expect(sidesOf('wall')).toEqual(['L', 'R']);
  });

  it('Stufe 1 bleibt meist am selben Ort, Stufe 14 wechselt fast immer', () => {
    const count = (p: number) => {
      const rng = createRng(17);
      let last: Spot | null = null;
      let changed = 0;
      const N = 2000;
      for (let i = 0; i < N; i++) {
        const pick = pickSpot(rng, covers, last, p);
        if (i > 0 && pick.change === 'new') changed++;
        if (i > 0) expect(pick.change === 'new').toBe(pick.spot.cover !== last!.cover);
        last = pick.spot;
      }
      return changed / (N - 1);
    };
    expect(count(switchProb(1))).toBeGreaterThan(0.18);
    expect(count(switchProb(1))).toBeLessThan(0.32);
    expect(count(switchProb(MAX_LEVEL))).toBeGreaterThan(0.84);
    expect(count(switchProb(MAX_LEVEL))).toBeLessThan(0.96);
  });

  it('Wechsel führt immer zu einer anderen Deckung, gültiger Seite und Lage', () => {
    const rng = createRng(3);
    let last: Spot | null = null;
    for (let i = 0; i < 500; i++) {
      const { spot, change } = pickSpot(rng, covers, last, 1);
      expect(spot.cover).toBeGreaterThanOrEqual(0);
      expect(spot.cover).toBeLessThan(covers.length);
      expect(sidesOf(covers[spot.cover].kind)).toContain(spot.side);
      expect(spot.anchor).toBeGreaterThanOrEqual(0.3);
      expect(spot.anchor).toBeLessThan(0.7);
      if (last) {
        expect(change).toBe('new');
        expect(spot.cover).not.toBe(last.cover);
      } else expect(change).toBe('first');
      last = spot;
    }
  });

  it('ohne Wechsel bleibt Deckung und Seite gleich', () => {
    const rng = createRng(8);
    const first = pickSpot(rng, covers, null, 0).spot;
    let last = first;
    for (let i = 0; i < 100; i++) {
      const { spot, change } = pickSpot(rng, covers, last, 0);
      expect(change).toBe('same');
      expect(spot.cover).toBe(first.cover);
      expect(spot.side).toBe(first.side);
      last = spot;
    }
  });

  it('einzige Deckung oder leere Liste brechen nicht', () => {
    const rng = createRng(1);
    const one = pickSpot(rng, [covers[0]], { cover: 0, side: 'L', anchor: 0.5 }, 1);
    expect(one.spot.cover).toBe(0);
    expect(pickSpot(rng, [], null, 0.5).spot.cover).toBe(0);
    // veraltete Deckungsnummer nach einer Neuanordnung
    const stale = pickSpot(rng, covers, { cover: 9, side: 'R', anchor: 0.5 }, 0.5);
    expect(stale.change).toBe('first');
  });

  it('Wege: verdeckt liegt ganz in der Deckung, herausgeschoben ragt zum größten Teil heraus', () => {
    const rect = { x: 100, y: 200, w: 120, h: 100 };
    const r = 30;
    for (const side of ['L', 'R', 'T'] as const) {
      for (const anchor of [0.3, 0.5, 0.7]) {
        const { hidden, shown } = peekPoints(rect, side, anchor, r);
        // verdeckt: Kreis vollständig im Rechteck
        expect(hidden.x - r).toBeGreaterThanOrEqual(rect.x - 1e-6);
        expect(hidden.x + r).toBeLessThanOrEqual(rect.x + rect.w + 1e-6);
        expect(hidden.y - r).toBeGreaterThanOrEqual(rect.y - 1e-6);
        expect(hidden.y + r).toBeLessThanOrEqual(rect.y + rect.h + 1e-6);
        // herausgeschoben: Mittelpunkt außerhalb des Rechtecks auf der richtigen Seite, in Reichweite der Kante
        if (side === 'L') expect(shown.x).toBeLessThan(rect.x);
        if (side === 'R') expect(shown.x).toBeGreaterThan(rect.x + rect.w);
        if (side === 'T') expect(shown.y).toBeLessThan(rect.y);
        expect(Math.hypot(shown.x - hidden.x, shown.y - hidden.y)).toBeCloseTo(r * 1.6, 5);
      }
    }
  });

  it('Lage an der Kante bleibt auch bei niedrigem Kasten innerhalb der Kante', () => {
    const rect = { x: 0, y: 0, w: 100, h: 70 };
    const r = 30;
    const l = peekPoints(rect, 'L', 0.0, r);
    const l2 = peekPoints(rect, 'L', 1.0, r);
    expect(l.shown.y).toBeGreaterThanOrEqual(r - 1e-6);
    expect(l2.shown.y).toBeLessThanOrEqual(rect.h - r + 1e-6);
  });
});

describe('hinter-der-deckung: Wertung', () => {
  it('Punkte: Stufe zählt, schneller = mehr', () => {
    expect(pointsFor(1, 0, 1000)).toBe(20);
    expect(pointsFor(1, 1000, 1000)).toBe(10);
    expect(pointsFor(1, 500, 1000)).toBe(15);
    expect(pointsFor(8, 500, 1000)).toBeGreaterThan(pointsFor(1, 500, 1000));
  });

  it('Kennzahlen: Trefferquote, Median, Ortswechsel gegen gleichen Ort', () => {
    const hits = [
      ...[400, 450, 500].map((ms) => ({ ms, changed: false })),
      ...[700, 760, 800].map((ms) => ({ ms, changed: true })),
    ];
    const s = computeStats(hits, 2, 1);
    expect(s.hits).toBe(6);
    expect(s.accuracy).toBeCloseTo((100 * 6) / 9);
    expect(s.medianMs).toBeCloseTo(600);
    expect(s.medianSame).toBe(450);
    expect(s.medianChanged).toBe(760);
    const few = computeStats([{ ms: 500, changed: true }], 0, 0);
    expect(few.medianChanged).toBeNaN();
    expect(few.medianSame).toBeNaN();
    expect(computeStats([], 0, 0).accuracy).toBe(0);
    expect(computeStats([], 0, 0).medianMs).toBeNaN();
  });

  it('Tipp: daneben, langsam, Ortswechsel oder stark', () => {
    const base = [
      ...[400, 420, 440].map((ms) => ({ ms, changed: false })),
      ...[430, 450, 440].map((ms) => ({ ms, changed: true })),
    ];
    expect(tipFor(computeStats(base, 4, 1))).toBe('wrong');
    expect(tipFor(computeStats(base, 1, 4))).toBe('slow');
    expect(tipFor(computeStats(base, 0, 0))).toBe('great');
    const slowChange = [
      ...[400, 420, 440].map((ms) => ({ ms, changed: false })),
      ...[700, 720, 740].map((ms) => ({ ms, changed: true })),
    ];
    expect(tipFor(computeStats(slowChange, 0, 0))).toBe('change');
  });
});
