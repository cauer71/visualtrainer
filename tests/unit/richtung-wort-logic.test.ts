import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import {
  allowedAnswers,
  axisOf,
  computeStats,
  contrast,
  DIRS,
  DOWN,
  diagAngleDeg,
  dirVector,
  evaluateTap,
  FIELD_GREEN,
  FIELD_INK,
  fixedPoints,
  geometry,
  hitSlot,
  IDENTITY,
  isPermutation,
  layoutModeOf,
  LEFT,
  levelOf,
  makeLayout,
  MAX_LEVEL,
  MIN_LEVEL,
  MIN_PER_KIND,
  P_CHANGE,
  pointsFor,
  RIGHT,
  SIDE_DIRS,
  signVector,
  specFor,
  tipFor,
  type Dir,
  type Sign,
  type TrialLog,
  TrialPlanner,
  UP,
  type Rect,
  type Words,
} from '../../src/exercises/richtung-wort/logic';
import { de, it as itTexts } from '../../src/exercises/richtung-wort/texts';

const levels = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);
const kindsOf = (l: number) => specFor(l).kinds.filter(([, w]) => w > 0).map(([k]) => k);

describe('richtung-wort: Stufenleiter baut Kompatibilität schrittweise ab', () => {
  it('Stufe 1–3 alle Wörter an der Lage, 4–6 ein Paar vertauscht, 7–12 alle gemischt', () => {
    for (const l of [1, 2, 3]) expect(specFor(l).layout).toBe('identity');
    for (const l of [4, 5, 6]) expect(specFor(l).layout).toBe('swap');
    for (const l of [7, 8, 9, 10, 11, 12]) expect(specFor(l).layout).toBe('mixed');
  });

  it('Zeichenvielfalt kommt erst danach: Schrägpfeil ab Stufe 5, Kurve ab Stufe 7, vorher nur Pfeile', () => {
    for (const l of [1, 2, 3, 4]) expect(kindsOf(l)).toEqual(['box']);
    for (const l of [5, 6]) expect(kindsOf(l)).toEqual(['box', 'disc']);
    for (const l of [7, 8, 9, 10, 11, 12]) expect(kindsOf(l)).toEqual(['box', 'disc', 'curve']);
  });

  it('Antwortfrist erst ab Stufe 10, weich: 5 s → 4 s → 3 s, keine Frist darunter', () => {
    for (let l = 1; l <= 9; l++) expect(specFor(l).deadlineMs).toBeNull();
    expect(specFor(10).deadlineMs).toBe(5000);
    expect(specFor(11).deadlineMs).toBe(4000);
    expect(specFor(12).deadlineMs).toBe(3000);
  });

  it('Anordnung wechselt in Blöcken, die nie länger werden; ab Stufe 10 unvorhersehbar (block 0)', () => {
    for (const l of [1, 2, 3]) expect(specFor(l).block).toBe(0); // bleibt immer gleich (identity)
    let prev = specFor(4).block;
    for (let l = 5; l <= 9; l++) {
      expect(specFor(l).block).toBeGreaterThan(0);
      expect(specFor(l).block).toBeLessThanOrEqual(prev);
      prev = specFor(l).block;
    }
    for (const l of [10, 11, 12]) expect(specFor(l).block).toBe(0);
  });

  it('Stufen werden begrenzt und abgerundet', () => {
    expect(levelOf(0)).toBe(MIN_LEVEL);
    expect(levelOf(99)).toBe(MAX_LEVEL);
    expect(levelOf(7.9)).toBe(7);
    expect(specFor(-3)).toBe(specFor(1));
  });

  it('Kasten-Aussehen: Stufe 1 nur hell/lang, 2 mit dunkel, ab 3 alle vier', () => {
    expect(specFor(1).looks).toBe(1);
    expect(specFor(2).looks).toBe(2);
    expect(specFor(3).looks).toBe(4);
  });
});

describe('richtung-wort: Anordnung der Wörter', () => {
  it('identity: jedes Wort an seiner Lage (oben OBEN, rechts RECHTS, unten UNTEN, links LINKS)', () => {
    const rng = createRng(1);
    expect(makeLayout(rng, 'identity')).toEqual([UP, RIGHT, DOWN, LEFT]);
    expect(IDENTITY).toEqual([0, 1, 2, 3]);
    expect(layoutModeOf(IDENTITY)).toBe('identity');
  });

  it('swap: genau ein Paar vertauscht, zwei Wörter bleiben, gültige Permutation, wechselt', () => {
    const rng = createRng(2);
    let prev: Words | null = null;
    const seen = new Set<string>();
    for (let i = 0; i < 400; i++) {
      const w = makeLayout(rng, 'swap', prev);
      expect(isPermutation(w)).toBe(true);
      expect(fixedPoints(w)).toBe(2);
      expect(layoutModeOf(w)).toBe('swap');
      if (prev) expect(w).not.toEqual(prev);
      seen.add(w.join(''));
      prev = w;
    }
    expect(seen.size).toBe(6); // alle sechs Paare kommen vor
  });

  it('mixed: nie die kompatible Anordnung, höchstens ein Wort an der Lage, alle 17 Anordnungen kommen vor', () => {
    const rng = createRng(3);
    let prev: Words | null = null;
    const seen = new Set<string>();
    for (let i = 0; i < 3000; i++) {
      const w = makeLayout(rng, 'mixed', prev);
      expect(isPermutation(w)).toBe(true);
      expect(w).not.toEqual([...IDENTITY]);
      expect(fixedPoints(w)).toBeLessThanOrEqual(1);
      expect(layoutModeOf(w)).toBe('mixed');
      if (prev) expect(w).not.toEqual(prev);
      seen.add(w.join(''));
      prev = w;
    }
    expect(seen.size).toBe(17);
  });

  it('Art-Erkennung stimmt für alle 24 Permutationen (1 identity, 6 swap, 17 mixed)', () => {
    const all: number[][] = [];
    const perm = (rest: number[], cur: number[]) => {
      if (!rest.length) all.push(cur);
      rest.forEach((v, i) => perm([...rest.slice(0, i), ...rest.slice(i + 1)], [...cur, v]));
    };
    perm([0, 1, 2, 3], []);
    const count = { identity: 0, swap: 0, mixed: 0 };
    for (const p of all) count[layoutModeOf(p)]++;
    expect(count).toEqual({ identity: 1, swap: 6, mixed: 17 });
  });
});

describe('richtung-wort: Durchgänge planen', () => {
  const run = (level: number, n: number, seed = 5) => {
    const planner = new TrialPlanner(createRng(seed));
    return Array.from({ length: n }, () => planner.next(level));
  };

  it('Stufe 1–3: alle Durchgänge kompatibel – das richtige Wort steht dort, wohin das Zeichen zeigt', () => {
    for (const l of [1, 2, 3]) {
      for (const t of run(l, 200)) {
        expect(t.compat).toBe(true);
        expect(t.targetSlot).toBe(t.sign.answer);
        expect(t.words).toEqual([0, 1, 2, 3]);
        expect(t.sign.kind).toBe('box');
      }
    }
  });

  it('Stufe 4–6: kompatible und abweichende Durchgänge kommen vor (für die Lage-Kosten)', () => {
    for (const l of [4, 5, 6]) {
      const ts = run(l, 600, 10 + l);
      const compat = ts.filter((t) => t.compat).length;
      expect(compat).toBeGreaterThan(600 * 0.15);
      expect(compat).toBeLessThan(600 * 0.85);
    }
  });

  it('Stufe 7–12: überwiegend abweichend, aber auch an der Lage gebliebene Wörter verlangt (≥ 10 %)', () => {
    for (const l of [7, 9, 12]) {
      const ts = run(l, 1500, 20 + l);
      const share = ts.filter((t) => t.compat).length / ts.length;
      expect(share).toBeGreaterThan(0.1);
      expect(share).toBeLessThan(0.45);
      for (const t of ts) expect(t.words).not.toEqual([0, 1, 2, 3]);
    }
  });

  it('Ziel-Feld ist konsistent: Wort des Ziel-Felds = Antwort; Anordnung ist immer eine Permutation', () => {
    for (const l of levels) {
      for (const t of run(l, 300, 30 + l)) {
        expect(isPermutation(t.words)).toBe(true);
        expect(t.words[t.targetSlot]).toBe(t.sign.answer);
        expect(t.compat).toBe(t.targetSlot === t.sign.answer);
      }
    }
  });

  it('Schrägpfeil und Kurve haben nur links/rechts als Antwort; Pfeile alle vier Richtungen', () => {
    for (const l of levels) {
      const ts = run(l, 600, 40 + l);
      for (const t of ts) {
        if (t.sign.kind !== 'box') expect(SIDE_DIRS).toContain(t.sign.answer);
        expect(allowedAnswers(t.sign.kind)).toContain(t.sign.answer);
      }
      const boxAnswers = new Set(ts.filter((t) => t.sign.kind === 'box').map((t) => t.sign.answer));
      expect(boxAnswers.size).toBe(4);
    }
  });

  it('Zeichenfamilien nach Stufe: nur erlaubte kommen vor, alle erlaubten werden gezeigt', () => {
    for (const l of levels) {
      const ts = run(l, 800, 50 + l);
      const kinds = new Set(ts.map((t) => t.sign.kind));
      expect([...kinds].sort()).toEqual([...kindsOf(l)].sort());
    }
  });

  it('Schrägpfeil zeigt bis Stufe 7 nur schräg nach unten (wie im Vorbild), ab 8 auch nach oben', () => {
    for (const l of [5, 6, 7]) for (const t of run(l, 400, 60 + l)) if (t.sign.kind === 'disc') expect(t.sign.down).toBe(true);
    const ups = run(8, 600, 68).filter((t) => t.sign.kind === 'disc' && !t.sign.down).length;
    expect(ups).toBeGreaterThan(20);
  });

  it('Kasten-Aussehen folgt der Stufe', () => {
    const l1 = run(1, 300, 71).map((t) => t.sign);
    expect(l1.every((s) => !s.dark && !s.square)).toBe(true);
    const l2 = run(2, 300, 72).map((t) => t.sign);
    expect(l2.some((s) => s.dark)).toBe(true);
    expect(l2.every((s) => !s.square)).toBe(true);
    const l3 = run(3, 400, 73).map((t) => t.sign);
    expect(l3.some((s) => s.dark && s.square)).toBe(true);
    // Nicht-Kasten-Zeichen tragen keine Kasten-Merkmale
    for (const t of run(9, 400, 74)) if (t.sign.kind !== 'box') expect(t.sign.dark || t.sign.square).toBe(false);
  });

  it('keine zwei gleichen Zeichen hintereinander, nie dreimal dieselbe Antwort in Folge', () => {
    for (const l of levels) {
      const ts = run(l, 1500, 80 + l);
      for (let i = 1; i < ts.length; i++) {
        const a = ts[i - 1].sign;
        const b = ts[i].sign;
        expect(a.kind === b.kind && a.answer === b.answer && a.dark === b.dark && a.square === b.square && a.down === b.down).toBe(false);
        if (i >= 2) expect(ts[i - 2].sign.answer === a.answer && a.answer === b.answer).toBe(false);
      }
    }
  });

  it('gleicher Startwert → gleiche Folge (nur ctx.rng, deterministisch)', () => {
    const a = run(9, 100, 99);
    const b = run(9, 100, 99);
    expect(a).toEqual(b);
    expect(run(9, 100, 98)).not.toEqual(a);
  });

  it('Anordnung bleibt im Block stehen: Stufe 4 vier Durchgänge, Stufe 8 zwei, danach neu', () => {
    const t4 = run(4, 40, 100);
    t4.forEach((t, i) => expect(t.newLayout).toBe(i % 4 === 0));
    for (let i = 1; i < t4.length; i++) if (i % 4 !== 0) expect(t4[i].words).toEqual(t4[i - 1].words);
    for (let i = 4; i < t4.length; i += 4) expect(t4[i].words).not.toEqual(t4[i - 1].words);
    const t8 = run(8, 40, 101);
    t8.forEach((t, i) => expect(t.newLayout).toBe(i % 2 === 0));
    const t6 = run(6, 30, 102);
    t6.forEach((t, i) => expect(t.newLayout).toBe(i % 3 === 0));
  });

  it('Stufe 1–3: die Anordnung ändert sich nie (nur das erste Mal „neu“)', () => {
    const ts = run(2, 50, 103);
    expect(ts.filter((t) => t.newLayout).length).toBe(1);
  });

  it('ab Stufe 10 wechselt die Anordnung unvorhersehbar (etwa 3 von 4 Durchgängen)', () => {
    for (const l of [10, 12]) {
      const ts = run(l, 3000, 110 + l);
      const share = ts.slice(1).filter((t) => t.newLayout).length / (ts.length - 1);
      expect(share).toBeGreaterThan(P_CHANGE - 0.06);
      expect(share).toBeLessThan(P_CHANGE + 0.06);
      // trotzdem gibt es Folgen mit gleicher Anordnung (nicht strikt abwechselnd)
      expect(ts.slice(1).some((t) => !t.newLayout)).toBe(true);
    }
  });

  it('Stufenwechsel bringt sofort eine Anordnung der neuen Art', () => {
    const planner = new TrialPlanner(createRng(120));
    planner.next(3);
    const swap = planner.next(4);
    expect(swap.newLayout).toBe(true);
    expect(layoutModeOf(swap.words)).toBe('swap');
    const mixed = planner.next(7);
    expect(mixed.newLayout).toBe(true);
    expect(layoutModeOf(mixed.words)).toBe('mixed');
    const back = planner.next(2);
    expect(back.newLayout).toBe(true);
    expect(back.words).toEqual([0, 1, 2, 3]);
  });
});

describe('richtung-wort: Zeichen zeigen in die richtige Richtung', () => {
  it('Pfeil im Kasten: Richtungsvektor = Antwort-Richtung', () => {
    for (const d of DIRS) {
      const s: Sign = { kind: 'box', answer: d, dark: false, square: false, down: false };
      expect(signVector(s)).toEqual(dirVector(d));
    }
    expect(dirVector(UP)).toEqual({ x: 0, y: -1 });
    expect(dirVector(RIGHT)).toEqual({ x: 1, y: 0 });
    expect(dirVector(DOWN)).toEqual({ x: 0, y: 1 });
    expect(dirVector(LEFT)).toEqual({ x: -1, y: 0 });
  });

  it('Schrägpfeil: Winkel ↗45 ↘135 ↙225 ↖315, links/rechts-Anteil = Antwort, oben/unten nach `down`', () => {
    const cases: Array<[Dir, boolean, number]> = [
      [RIGHT, false, 45],
      [RIGHT, true, 135],
      [LEFT, true, 225],
      [LEFT, false, 315],
    ];
    for (const [answer, down, deg] of cases) {
      const s: Sign = { kind: 'disc', answer, dark: false, square: false, down };
      expect(diagAngleDeg(s)).toBe(deg);
      const v = signVector(s);
      expect(Math.sign(v.x)).toBe(answer === RIGHT ? 1 : -1);
      expect(Math.sign(v.y)).toBe(down ? 1 : -1);
      expect(Math.abs(v.x)).toBeCloseTo(Math.SQRT1_2, 6);
      expect(Math.abs(v.y)).toBeCloseTo(Math.SQRT1_2, 6);
    }
  });

  it('Achsen: oben/unten senkrecht, links/rechts waagerecht', () => {
    expect(axisOf(UP)).toBe('v');
    expect(axisOf(DOWN)).toBe('v');
    expect(axisOf(LEFT)).toBe('h');
    expect(axisOf(RIGHT)).toBe('h');
  });
});

describe('richtung-wort: Antwort bewerten (Lage- und Achsenfehler)', () => {
  // Beispiel wie im Video: oben „RECHTS“, rechts „LINKS“, unten „UNTEN“, links „OBEN“
  const words: Words = [RIGHT, LEFT, DOWN, UP];
  const sign = (answer: Dir, kind: Sign['kind'] = 'box'): Sign => ({ kind, answer, dark: false, square: false, down: true });

  it('Feld mit dem richtigen Wort = richtig, auch wenn es an der „falschen“ Lage steht', () => {
    const e = evaluateTap({ sign: sign(LEFT), words }, 1); // Wort LINKS steht rechts
    expect(e).toEqual({ correct: true, word: LEFT, positionError: false, axisError: false });
  });

  it('Lage-Fehler: das Feld dort getippt, wohin das Zeichen zeigt, trägt aber ein anderes Wort', () => {
    // Zeichen zeigt nach links → Feld links (Wort OBEN) getippt
    const e = evaluateTap({ sign: sign(LEFT), words }, LEFT);
    expect(e.correct).toBe(false);
    expect(e.word).toBe(UP);
    expect(e.positionError).toBe(true);
    expect(e.axisError).toBe(true); // OBEN liegt auf der anderen Achse als LINKS
  });

  it('Achsenfehler ohne Lage-Fehler: z. B. „UNTEN“ statt „LINKS“ beim Schrägpfeil', () => {
    const e = evaluateTap({ sign: sign(LEFT, 'disc'), words }, DOWN); // Feld unten trägt UNTEN
    expect(e).toEqual({ correct: false, word: DOWN, positionError: false, axisError: true });
  });

  it('falsches Wort auf der gleichen Achse: weder Lage- noch Achsenfehler (RECHTS statt LINKS)', () => {
    const e = evaluateTap({ sign: sign(LEFT), words }, UP); // Feld oben trägt RECHTS
    expect(e).toEqual({ correct: false, word: RIGHT, positionError: false, axisError: false });
  });

  it('Richtig ist nie Lage- oder Achsenfehler (alle Anordnungen, alle Felder)', () => {
    const rng = createRng(7);
    for (let i = 0; i < 500; i++) {
      const w = rng.shuffle([...IDENTITY]) as Words;
      const answer = rng.pick(DIRS);
      const slot = rng.int(4);
      const e = evaluateTap({ sign: sign(answer), words: w }, slot);
      expect(e.correct).toBe(w[slot] === answer);
      if (e.correct) expect(e.positionError || e.axisError).toBe(false);
      expect(e.positionError).toBe(!e.correct && slot === answer);
    }
  });
});

describe('richtung-wort: Kennwerte', () => {
  const ok = (rt: number, compat: boolean): TrialLog => ({ ok: true, slow: false, rt, compat, positionError: false, axisError: false });

  it('Lage-Kosten = Ø Zeit bei abweichender Lage − Ø Zeit bei passender Lage', () => {
    const log = [ok(800, true), ok(900, true), ok(1000, true), ok(1200, false), ok(1300, false), ok(1400, false)];
    const s = computeStats(log);
    expect(s.meanCompat).toBeCloseTo(900);
    expect(s.meanMismatch).toBeCloseTo(1300);
    expect(s.positionCost).toBeCloseTo(400);
    expect(s.meanRt).toBeCloseTo(1100);
    expect(s.accuracy).toBe(100);
  });

  it(`Lage-Kosten nur mit mindestens ${MIN_PER_KIND} Treffern je Art, sonst fehlt der Wert`, () => {
    const few = [ok(800, true), ok(900, true), ok(1200, false), ok(1300, false), ok(1400, false), ok(1500, false)];
    expect(Number.isNaN(computeStats(few).positionCost)).toBe(true);
    const onlyCompat = Array.from({ length: 8 }, () => ok(900, true));
    expect(Number.isNaN(computeStats(onlyCompat).positionCost)).toBe(true);
    expect(computeStats(onlyCompat).meanRt).toBeCloseTo(900);
    expect(Number.isNaN(computeStats([]).meanRt)).toBe(true);
  });

  it('Falsche und zu langsame Antworten zählen nicht in die Zeiten, wohl aber in Treffer % und Fehler', () => {
    const log: TrialLog[] = [
      ok(900, true),
      { ok: false, slow: false, rt: 700, compat: false, positionError: true, axisError: true },
      { ok: false, slow: false, rt: 650, compat: false, positionError: false, axisError: true },
      { ok: false, slow: true, rt: 5000, compat: false, positionError: false, axisError: false },
    ];
    const s = computeStats(log, 2);
    expect(s.hits).toBe(1);
    expect(s.wrong).toBe(2);
    expect(s.slow).toBe(1);
    expect(s.accuracy).toBe(25);
    expect(s.positionErrors).toBe(1);
    expect(s.axisErrors).toBe(2);
    expect(s.early).toBe(2);
    expect(s.meanRt).toBe(900);
  });

  it('Tipp: zu früh → Lage → Achse → langsam → sonst großartig', () => {
    const base = { wrong: 0, slow: 0, positionErrors: 0, axisErrors: 0, early: 0 };
    expect(tipFor(base)).toBe('great');
    expect(tipFor({ ...base, early: 3, wrong: 1 })).toBe('early');
    expect(tipFor({ ...base, wrong: 3, positionErrors: 2 })).toBe('position');
    expect(tipFor({ ...base, wrong: 3, axisErrors: 2 })).toBe('axis');
    expect(tipFor({ ...base, slow: 2 })).toBe('slow');
    expect(tipFor({ ...base, positionErrors: 2, axisErrors: 3, wrong: 5 })).toBe('axis');
  });

  it('Punkte steigen mit der Stufe, kleiner Bonus für Tempo', () => {
    expect(pointsFor(1, 4000)).toBe(10);
    expect(pointsFor(1, 0)).toBe(15);
    expect(pointsFor(12, 4000)).toBe(32);
    expect(pointsFor(5, 1000)).toBeGreaterThan(pointsFor(4, 1000));
  });
});

describe('richtung-wort: Kontrast (Farbe nie allein, Schrift lesbar)', () => {
  it('Kontrastfunktion stimmt an den Rändern', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
    expect(contrast('#777777', '#777777')).toBeCloseTo(1, 5);
  });

  it('Wortfarbe auf dem grünen Feld hat mindestens 4,5 : 1 (gemessen ≈ 7,5 : 1)', () => {
    expect(contrast(FIELD_GREEN, FIELD_INK)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(FIELD_GREEN, FIELD_INK)).toBeGreaterThan(7);
  });

  it('weißer Pfeil auf blauer Scheibe und dunkler Pfeil auf hellem Kasten haben mindestens 4,5 : 1', () => {
    expect(contrast('#1D63CF', '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#FAFBFD', '#1E293B')).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#10151C', '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
  });
});

describe('richtung-wort: Geometrie (Trefferflächen, Schrift, nichts abgeschnitten)', () => {
  // Chromium misst „SINISTRA“ in Fettschrift auf etwa 5,2 em; 5,3 ist leicht konservativ
  const EM = 5.3;
  const play: Array<[string, number, number]> = [
    ['Tablet quer', 1180, 751],
    ['Tablet hoch', 820, 1111],
    ['Handy hoch', 390, 781],
    ['Tablet 1024', 1024, 699],
    ['kleines Handy', 360, 700],
  ];
  const inside = (r: Rect, w: number, h: number) => r.x >= -0.01 && r.y >= -0.01 && r.x + r.w <= w + 0.01 && r.y + r.h <= h + 0.01;
  const overlap = (a: Rect, b: Rect) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

  for (const [name, w, h] of play) {
    it(`${name} ${w}×${h}: Felder ≥ 72 px, Wörter ≥ 30 px, nichts abgeschnitten, keine Überlappung`, () => {
      const u = Math.min(w, h) / 100;
      const geo = geometry({ w, h, u, bottomReserve: Math.max(14, u * 3), wordEm: EM });
      expect(geo.small).toBe(false);
      expect(geo.fields).toHaveLength(4);
      for (const f of geo.fields) {
        expect(inside(f, w, h)).toBe(true);
        expect(f.h).toBeGreaterThanOrEqual(72);
        expect(f.w).toBeGreaterThanOrEqual(72);
        expect(EM * geo.wordPx).toBeLessThanOrEqual(f.w - 6);
      }
      if (w >= 390) expect(geo.wordPx).toBeGreaterThanOrEqual(30);
      else expect(geo.wordPx).toBeGreaterThanOrEqual(27);
      expect(inside(geo.plate, w, h)).toBe(true);
      expect(geo.plate.h).toBeGreaterThanOrEqual(120);
      for (let i = 0; i < 4; i++) {
        expect(overlap(geo.plate, geo.fields[i])).toBe(false);
        for (let j = i + 1; j < 4; j++) expect(overlap(geo.fields[i], geo.fields[j])).toBe(false);
      }
      expect(geo.signSize).toBeGreaterThanOrEqual(110);
      expect(geo.signSize).toBeLessThanOrEqual(Math.min(geo.plate.w, geo.plate.h));
    });
  }

  it('Kreuzanordnung: oben/unten mittig übereinander, links/rechts in einer Reihe, Reihenfolge oben → Mitte → unten', () => {
    const geo = geometry({ w: 1180, h: 751, u: 7.51, bottomReserve: 22.5, wordEm: EM });
    const [top, right, bottom, left] = geo.fields;
    expect(top.x + top.w / 2).toBeCloseTo(590, 3);
    expect(bottom.x + bottom.w / 2).toBeCloseTo(590, 3);
    expect(left.y).toBeCloseTo(right.y, 6);
    expect(left.x + left.w).toBeLessThan(right.x); // freie Mitte dazwischen
    expect(top.y + top.h).toBeLessThan(left.y + 1);
    expect(left.y + left.h).toBeLessThan(bottom.y + 1);
    expect(top.y).toBeLessThan(left.y);
    expect(left.y).toBeLessThan(bottom.y);
    expect(geo.plate.y + geo.plate.h).toBeLessThan(top.y);
  });

  it('Trefferflächen: Mittelpunkte treffen das eigene Feld, die freie Mitte und die Zeichenfläche kein Feld', () => {
    for (const [, w, h] of play) {
      const u = Math.min(w, h) / 100;
      const geo = geometry({ w, h, u, bottomReserve: Math.max(14, u * 3), wordEm: EM });
      geo.fields.forEach((f, i) => expect(hitSlot(geo, f.x + f.w / 2, f.y + f.h / 2)).toBe(i));
      expect(hitSlot(geo, geo.plate.x + geo.plate.w / 2, geo.plate.y + geo.plate.h / 2)).toBe(-1);
      expect(hitSlot(geo, -5, -5)).toBe(-1);
    }
    const geo = geometry({ w: 1180, h: 751, u: 7.51, bottomReserve: 22.5, wordEm: EM });
    const [, right, , left] = geo.fields;
    expect(hitSlot(geo, (left.x + left.w + right.x) / 2, left.y + left.h / 2)).toBe(-1);
  });

  const demo: Array<[string, number, number]> = [
    ['Intro quer', 627, 431],
    ['Intro hoch', 780, 536],
    ['Intro Handy', 350, 298],
  ];
  for (const [name, w, h] of demo) {
    it(`${name} ${w}×${h}: alles über der Bildunterschrift, nichts abgeschnitten, Wörter passen`, () => {
      const u = Math.min(w, h) / 100;
      const size = Math.min(30, Math.max(14, u * 4.6));
      const capTop = h - size * 2.1 - h * 0.05;
      const geo = geometry({ w, h, u, bottomReserve: h - (capTop - 10), wordEm: EM });
      expect(geo.small).toBe(true);
      for (const f of geo.fields) {
        expect(inside(f, w, h)).toBe(true);
        expect(f.y + f.h).toBeLessThanOrEqual(capTop - 9.99);
        expect(EM * geo.wordPx).toBeLessThanOrEqual(f.w - 4);
        expect(f.h).toBeGreaterThanOrEqual(34);
      }
      expect(geo.wordPx).toBeGreaterThanOrEqual(13);
      expect(geo.plate.h).toBeGreaterThanOrEqual(80);
      expect(geo.signSize).toBeGreaterThanOrEqual(60);
    });
  }
});

describe('richtung-wort: Texte', () => {
  it('Wörter in beiden Sprachen vollständig und verschieden; Italienisch kurz gehalten', () => {
    for (const t of [de, itTexts]) {
      const words = [t.feedback.wordUp, t.feedback.wordRight, t.feedback.wordDown, t.feedback.wordLeft];
      expect(new Set(words).size).toBe(4);
      for (const w of words) expect(w).toBe(w.toUpperCase());
    }
    expect([itTexts.feedback.wordUp, itTexts.feedback.wordRight, itTexts.feedback.wordDown, itTexts.feedback.wordLeft]).toEqual(['ALTO', 'DESTRA', 'BASSO', 'SINISTRA']);
    expect([de.feedback.wordUp, de.feedback.wordRight, de.feedback.wordDown, de.feedback.wordLeft]).toEqual(['OBEN', 'RECHTS', 'UNTEN', 'LINKS']);
  });

  it('gleiche Schlüssel in de und it; „why“ endet mit „… ist nicht belegt“; keine Test-/Diagnosewörter', () => {
    for (const key of ['captions', 'metrics', 'tips', 'feedback'] as const) {
      expect(Object.keys(itTexts[key]).sort()).toEqual(Object.keys(de[key]).sort());
    }
    expect(de.why.trim().endsWith('ist nicht belegt.')).toBe(true);
    expect(itTexts.why.trim()).toMatch(/non è dimostrato[^.]*\.$/);
    const all = JSON.stringify([de, itTexts]).toLowerCase();
    for (const bad of ['diagnose', 'normwert', 'pathologi', 'heilt', 'therapie']) expect(all).not.toContain(bad);
    expect(all).not.toMatch(/\btest\b/);
    // Bildunterschriften kurz (≤ 40 Zeichen)
    for (const t of [de, itTexts]) for (const c of Object.values(t.captions)) expect(c.length).toBeLessThanOrEqual(40);
    // Schritte kurz (≤ 60 Zeichen)
    for (const t of [de, itTexts]) for (const s of t.steps) expect(s.length).toBeLessThanOrEqual(60);
  });
});
