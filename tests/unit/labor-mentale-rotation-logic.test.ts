/**
 * Mentale Rotation (Labor): Logik. Übertragen aus labor/test/rotation.test.js (Prototyp) und erweitert – vor allem um die
 * mathematische Absicherung der Chiralität:
 *  - Drehung (jeder Winkel) hat die Determinante +1 und ändert die Händigkeit nie; Spiegelung hat −1 und ändert sie immer.
 *  - Jede Aufgabe hat genau eine richtige Antwort: „gleich“ = Drehung der Vorlage, „gespiegelt“ = Spiegelbild, das durch keine
 *    Drehung mit der Vorlage zur Deckung kommt (Vorlage chiral). Geprüft für 90°-Schritte exakt (Zellen) und für 45°-Schritte
 *    über die gezeichneten Vielecke (Matrix).
 * Keine festen Zufallswerte (andere Zufallsfolge als im Prototyp), nur Eigenschaften.
 */
import { describe, expect, it } from 'vitest';
import { defaultParams, sanitizeParams } from '../../src/core/params';
import { createRng } from '../../src/core/rng';
import {
  anglesFor,
  cellCorners,
  cellPxFor,
  det,
  extentOf,
  figurePolygons,
  figureRadius,
  foldAngle,
  handKey,
  IDENTITY,
  isChiral,
  keyOf,
  layoutRotation,
  matMul,
  maxExtentFor,
  MIN_BUTTON_H,
  mirror,
  MIRROR_X,
  normalize,
  PARAMS,
  planTrials,
  pointsFor,
  randomFigure,
  rotate90,
  RotationSession,
  rotationMatrix,
  rotationParams,
  signedArea,
  slope,
  tipFor,
  transformPoint,
  trialMatrix,
  type Cell,
  type RotationSummary,
} from '../../src/exercises/labor-mentale-rotation/logic';

function connected(cells: readonly Cell[]): boolean {
  const set = new Set(cells.map((c) => c.join(',')));
  const seen = new Set<string>();
  const stack: Cell[] = [cells[0]];
  while (stack.length) {
    const c = stack.pop()!;
    const k = c.join(',');
    if (seen.has(k)) continue;
    seen.add(k);
    for (const d of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const n: Cell = [c[0] + d[0], c[1] + d[1]];
      if (set.has(n.join(','))) stack.push(n);
    }
  }
  return seen.size === cells.length;
}

function make(over: Record<string, unknown> = {}, seed = 1): RotationSession {
  const p = rotationParams(sanitizeParams(PARAMS, { ...defaultParams(PARAMS), ...over }));
  const s = new RotationSession(p, { rng: createRng(seed) });
  s.start(0);
  s.beginTrial(0);
  return s;
}

/** Beantwortet die aktuelle Aufgabe nach `rt` ms (beginTrial bei `from`) */
function respond(s: RotationSession, from: number, rt: number, ok = true) {
  s.beginTrial(from);
  const t = s.trial!;
  return s.answer(ok ? t.same : !t.same, from + rt);
}

const L: Cell[] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 2],
];

describe('Geometrie auf Zellen (Prototyp)', () => {
  it('Drehung viermal ergibt dieselbe Figur, Spiegeln zweimal auch', () => {
    expect(keyOf(rotate90(L, 4))).toBe(keyOf(L));
    expect(keyOf(rotate90(L, 1))).not.toBe(keyOf(L));
    expect(keyOf(mirror(mirror(L)))).toBe(keyOf(L));
    expect(keyOf(rotate90(L, 5))).toBe(keyOf(rotate90(L, 1)));
    expect(keyOf(rotate90(L, -1))).toBe(keyOf(rotate90(L, 3)));
  });

  it('Chiralität: L ist chiral, T und Quadrat nicht', () => {
    expect(isChiral(L)).toBe(true);
    expect(
      isChiral([
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ]),
    ).toBe(false);
    expect(
      isChiral([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]),
    ).toBe(false);
    // S-Tetromino ist chiral, I (Gerade) nicht
    expect(
      isChiral([
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
      ]),
    ).toBe(true);
    expect(
      isChiral([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ]),
    ).toBe(false);
  });

  it('Zufallsfiguren: richtige Zellenzahl, zusammenhängend, chiral, kompakt', () => {
    const rng = createRng(5);
    for (let n = 4; n <= 9; n++) {
      for (let i = 0; i < 25; i++) {
        const f = randomFigure(n, rng);
        expect(f).toHaveLength(n);
        expect(new Set(f.map((c) => c.join(','))).size).toBe(n);
        expect(connected(f)).toBe(true);
        expect(isChiral(f)).toBe(true);
        const e = extentOf(f);
        expect(Math.max(e.w, e.h)).toBeLessThanOrEqual(maxExtentFor(n) + 2);
        expect(normalize(f)).toEqual(f);
      }
    }
  });

  it('Winkelbetrag und Anstieg', () => {
    expect([0, 45, 90, 180, 270, 315, 360, -90].map(foldAngle)).toEqual([0, 45, 90, 180, 90, 45, 0, 90]);
    expect(slope([0, 1, 2, 3], [500, 700, 900, 1100])).toBe(200);
    expect(slope([0, 1], [500, 700])).toBeNull();
    expect(slope([1, 1, 1], [5, 6, 7])).toBeNull();
    expect(slope([], [])).toBeNull();
    // eigene Schwellen
    expect(slope([0, 0, 1, 1, 2], [1, 2, 3, 4, 5], 6, 3)).toBeNull();
    expect(slope([0, 0, 1, 1, 2, 2], [1, 1, 2, 2, 3, 3], 6, 3)).toBe(1);
    expect(slope([0, 1, 0, 1, 0, 1], [1, 2, 1, 2, 1, 2], 6, 3)).toBeNull(); // nur 2 Winkelstufen
  });
});

describe('Mathematik der Drehung und Spiegelung (Chiralität)', () => {
  it('Drehung hat die Determinante +1 für jeden Winkel, Spiegelung −1, Spiegelung nach Drehung ebenfalls −1', () => {
    for (let deg = -360; deg <= 720; deg += 15) {
      expect(det(rotationMatrix(deg))).toBeCloseTo(1, 12);
      expect(det(trialMatrix(deg, false))).toBeCloseTo(1, 12);
      expect(det(trialMatrix(deg, true))).toBeCloseTo(-1, 12);
    }
    expect(det(IDENTITY)).toBe(1);
    expect(det(MIRROR_X)).toBe(-1);
    expect(det(matMul(MIRROR_X, MIRROR_X))).toBe(1); // zweimal spiegeln = Drehung
  });

  it('Drehmatrizen: R(a)·R(b) = R(a+b), R(0) = 1, R(360) = 1, Längen bleiben erhalten', () => {
    const near = (A: readonly number[], B: readonly number[]) => A.forEach((v, i) => expect(v).toBeCloseTo(B[i], 10));
    near(matMul(rotationMatrix(30), rotationMatrix(60)), rotationMatrix(90));
    near(rotationMatrix(0), IDENTITY);
    near(rotationMatrix(360), IDENTITY);
    near(rotationMatrix(90), [0, -1, 1, 0]);
    for (let deg = 0; deg < 360; deg += 45) {
      const p = transformPoint(rotationMatrix(deg), [3, 4]);
      expect(Math.hypot(p[0], p[1])).toBeCloseTo(5, 10);
    }
  });

  it('Die 90°-Drehung der Matrix ist dieselbe Abbildung wie rotate90 auf Zellen', () => {
    for (let k = 0; k < 4; k++) {
      const M = rotationMatrix(90 * k);
      const viaMatrix = L.map((c) => transformPoint(M, c).map(Math.round) as unknown as Cell);
      expect(keyOf(viaMatrix)).toBe(keyOf(rotate90(L, k)));
    }
    const viaMirror = L.map((c) => transformPoint(MIRROR_X, c).map(Math.round) as unknown as Cell);
    expect(keyOf(viaMirror)).toBe(keyOf(mirror(L)));
  });

  it('Händigkeit auf Zellen: Drehung ändert den Schlüssel nie, Spiegelung bei chiralen Figuren immer', () => {
    const rng = createRng(11);
    for (let n = 4; n <= 9; n++) {
      for (let i = 0; i < 25; i++) {
        const f = randomFigure(n, rng);
        for (let k = 0; k < 4; k++) expect(handKey(rotate90(f, k))).toBe(handKey(f));
        expect(handKey(mirror(f))).not.toBe(handKey(f));
        // Spiegelung und anschließende Drehung bleibt gespiegelt
        for (let k = 0; k < 4; k++) expect(handKey(rotate90(mirror(f), k))).not.toBe(handKey(f));
        expect(isChiral(f)).toBe(handKey(mirror(f)) !== handKey(f));
      }
    }
    // Nicht chirale Figuren (T, Quadrat): Spiegelbild hat dieselbe Händigkeit – deshalb sind sie als Aufgabe verboten
    const T: Cell[] = [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ];
    expect(handKey(mirror(T))).toBe(handKey(T));
  });

  it('Gezeichnete Vielecke: Drehung ändert das Vorzeichen der Fläche (Umlaufsinn) nie, Spiegelung immer – bei jedem Winkel', () => {
    const rng = createRng(3);
    for (let i = 0; i < 20; i++) {
      const f = randomFigure(6, rng);
      for (let deg = 0; deg < 360; deg += 15) {
        for (const mirrored of [false, true]) {
          // alle Quadrate haben denselben Umlaufsinn
          const polys = figurePolygons(f, trialMatrix(deg, mirrored));
          const sign = Math.sign(signedArea(polys[0]));
          for (const poly of polys) expect(Math.sign(signedArea(poly))).toBe(sign);
        }
        const plain = Math.sign(signedArea(figurePolygons(f, trialMatrix(deg, false))[0]));
        const flipped = Math.sign(signedArea(figurePolygons(f, trialMatrix(deg, true))[0]));
        expect(plain).toBe(Math.sign(signedArea(cellCorners(f[0]))));
        expect(flipped).toBe(-plain);
        // jede Fläche bleibt eine Einheit
        expect(Math.abs(signedArea(figurePolygons(f, trialMatrix(deg, true))[0]))).toBeCloseTo(1, 10);
      }
    }
  });

  it('„gleich“: Rückdrehen der gezeichneten Vielecke um −Winkel ergibt genau die Vorlage; „gespiegelt“: nur das Spiegelbild, und das ist keine Drehung der Vorlage', () => {
    const rng = createRng(21);
    for (let i = 0; i < 40; i++) {
      const base = randomFigure(4 + (i % 6), rng);
      for (let deg = 0; deg < 360; deg += 45) {
        for (const same of [true, false]) {
          const polys = figurePolygons(base, trialMatrix(deg, !same));
          // zurückdrehen
          const R = rotationMatrix(-deg);
          const back = polys.map((poly) => poly.map((p) => transformPoint(R, p)));
          const expected = figurePolygons(base, same ? IDENTITY : MIRROR_X);
          back.forEach((poly, qi) => poly.forEach((p, vi) => {
            expect(p[0]).toBeCloseTo(expected[qi][vi][0], 9);
            expect(p[1]).toBeCloseTo(expected[qi][vi][1], 9);
          }));
        }
      }
      // Spiegelbild der Vorlage ist keine Drehung der Vorlage (Vorlage chiral)
      const keys = [0, 1, 2, 3].map((k) => keyOf(rotate90(base, k)));
      expect(keys).not.toContain(keyOf(mirror(base)));
    }
  });

  it('Eindeutigkeit: jedes Spiel (alle Aufgaben beider Winkelmodi) hat chirale Vorlagen; „gleich“ ist eine Drehung, „gespiegelt“ nie', () => {
    for (const angles of ['90', '45']) {
      const s = make({ trials: 80, angles }, 7);
      for (let i = 0; i < 80; i++) {
        const t = s.trial!;
        expect(isChiral(t.base)).toBe(true);
        expect(det(t.matrix)).toBeCloseTo(t.same ? 1 : -1, 10);
        if (t.angle % 90 === 0) {
          // exakt auf Zellen prüfbar: gezeichnete Mittelpunkte → Zellen
          const e = extentOf(t.base);
          const shown = t.base.map((c) => {
            const p = transformPoint(t.matrix, [c[0] + 0.5 - e.w / 2, c[1] + 0.5 - e.h / 2]);
            return [Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2] as unknown as Cell;
          });
          // Mittelpunkte liegen auf Halbzahlen; Zellen = Mittelpunkt − 0,5
          const cellsShown = shown.map((p) => [Math.round(p[0] - 0.5), Math.round(p[1] - 0.5)] as unknown as Cell);
          const k = t.angle / 90;
          const want = t.same ? rotate90(t.base, k) : rotate90(mirror(t.base), k);
          // Verschiebung ist egal (keyOf normalisiert); die Mittelpunkt-Rundung kann ±1 verschieben, aber nicht die Form
          expect(handKey(cellsShown)).toBe(handKey(want));
          const rots = [0, 1, 2, 3].map((r) => keyOf(rotate90(t.base, r)));
          if (t.same) expect(rots).toContain(keyOf(cellsShown));
          else expect(rots).not.toContain(keyOf(cellsShown));
        }
        s.beginTrial(1000 * i);
        s.answer(true, 1000 * i + 500);
      }
    }
  });

  it('Der Umkreis der Figur bleibt bei jeder Drehung und Spiegelung gleich (passt immer in den vorgesehenen Platz)', () => {
    const rng = createRng(2);
    for (let i = 0; i < 20; i++) {
      const f = randomFigure(5 + (i % 5), rng);
      const r0 = figureRadius(f);
      for (let deg = 0; deg < 360; deg += 15) {
        for (const m of [false, true]) {
          let r = 0;
          for (const poly of figurePolygons(f, trialMatrix(deg, m))) for (const [x, y] of poly) r = Math.max(r, Math.hypot(x, y));
          expect(r).toBeCloseTo(r0, 9);
        }
      }
    }
  });
});

describe('Einstellungen', () => {
  it('Standardwerte und Grenzen wie im Prototyp', () => {
    expect(defaultParams(PARAMS)).toEqual({ trials: 24, cells: 6, angles: '90', cellCm: 1.2, timeoutS: 0 });
    expect(PARAMS.find((x) => x.key === 'trials')).toMatchObject({ min: 6, max: 80, step: 2 });
    expect(PARAMS.find((x) => x.key === 'cells')).toMatchObject({ min: 4, max: 9, step: 1 });
    expect(PARAMS.find((x) => x.key === 'cellCm')).toMatchObject({ min: 0.6, max: 3, step: 0.1 });
    expect(PARAMS.find((x) => x.key === 'timeoutS')).toMatchObject({ min: 0, max: 60, step: 1 });
  });

  it('Bereinigung: außerhalb der Grenzen, ungerade Zahl der Aufgaben, falsche Auswahl', () => {
    const p = rotationParams(sanitizeParams(PARAMS, { trials: 7, cells: 99, angles: '60', cellCm: 0.1, timeoutS: 999 }));
    expect(p.trials % 2).toBe(0);
    expect(p).toMatchObject({ cells: 9, step: 90, cellCm: 0.6, timeoutS: 60 });
    expect(rotationParams({ angles: '45' }).step).toBe(45);
    expect(rotationParams({})).toEqual({ trials: 24, cells: 6, step: 90, cellCm: 1.2, timeoutS: 0 });
  });
});

describe('Plan der Aufgaben', () => {
  it('Winkel: 0° gehört dazu, 90°-Modus 0/90/180/270, 45°-Modus acht Winkel', () => {
    expect(anglesFor(90)).toEqual([0, 90, 180, 270]);
    expect(anglesFor(45)).toEqual([0, 45, 90, 135, 180, 225, 270, 315]);
  });

  it('ausgewogen: halb gleich, halb gespiegelt, jeder Winkel je Art gleich oft, nie mehr als zwei gleiche Arten hintereinander', () => {
    for (const step of [90, 45] as const) {
      for (const n of [6, 8, 24, 48, 80]) {
        for (let seed = 1; seed <= 5; seed++) {
          const plan = planTrials(n, step, createRng(seed));
          expect(plan).toHaveLength(n);
          expect(plan.filter((t) => t.same).length).toBe(n / 2);
          let run = 1;
          for (let i = 1; i < n; i++) {
            run = plan[i].same === plan[i - 1].same ? run + 1 : 1;
            expect(run).toBeLessThanOrEqual(2);
          }
          const angles = anglesFor(step);
          for (const same of [true, false]) {
            const counts = angles.map((a) => plan.filter((t) => t.same === same && t.angle === a).length);
            const lo = Math.min(...counts);
            const hi = Math.max(...counts);
            expect(hi - lo, `${step} n=${n}`).toBeLessThanOrEqual(1);
          }
        }
      }
    }
  });

  it('gleicher Startwert → gleicher Plan', () => {
    expect(planTrials(24, 45, createRng(4))).toEqual(planTrials(24, 45, createRng(4)));
  });
});

describe('Ablauf', () => {
  it('Antworten, Zeiten ab beginTrial, Ende, Kennzahlen', () => {
    const s = make({ trials: 6 }, 2);
    let now = 0;
    const correctness = [true, true, true, true, false, false];
    correctness.forEach((ok, i) => {
      const t = s.trial!;
      const rt = 400 + (200 * foldAngle(t.angle)) / 90;
      s.beginTrial(now);
      const res = s.answer(ok ? t.same : !t.same, now + rt);
      expect(res?.type).toBe(ok ? 'correct' : 'wrong');
      expect(s.trials[i].rtMs).toBe(Math.round(rt));
      now += rt + 700; // Pause: zählt nicht zur Antwortzeit
    });
    expect(s.finished).toBe(true);
    expect(s.answer(true, now)).toBeNull();
    const sum = s.summary();
    expect(sum.correct).toBe(4);
    expect(sum.total).toBe(6);
    expect(sum.accuracy).toBeCloseTo((100 * 4) / 6, 1);
    expect(sum.rtMean).not.toBeNull();
    expect(sum.slope).toBeNull(); // nur 4 richtige Antworten
  });

  it('Antwort vor dem Anzeigen der Figuren (beginTrial) zählt nicht', () => {
    const p = rotationParams(sanitizeParams(PARAMS, {}));
    const s = new RotationSession(p, { rng: createRng(1) });
    s.start(0);
    expect(s.answer(true, 10)).toBeNull();
    s.beginTrial(100);
    expect(s.answer(true, 600)?.type).toMatch(/correct|wrong/);
    expect(s.trials[0].rtMs).toBe(500);
  });

  it('Zeitlimit je Aufgabe wertet als falsch ohne Antwort, ab dem Anzeigen', () => {
    const s = new RotationSession(rotationParams({ trials: 6, timeoutS: 5 }), { rng: createRng(4) });
    s.start(0);
    s.beginTrial(1000);
    expect(s.update(5999)).toBeNull();
    expect(s.idx).toBe(0);
    expect(s.update(6000)).not.toBeNull();
    expect(s.idx).toBe(1);
    expect(s.trials[0].correct).toBe(false);
    expect(s.trials[0].rtMs).toBeNull();
    expect(s.trials[0].answerSame).toBeNull();
    // die nächste Aufgabe ist noch nicht angezeigt: kein Ablauf
    expect(s.update(60000)).toBeNull();
    // ohne Zeitlimit nie
    const t = make({ trials: 6, timeoutS: 0 });
    expect(t.update(1e9)).toBeNull();
  });

  it('Kennzahlen ohne richtige Antwort: keine NaN, Zeiten null', () => {
    const s = make({ trials: 6 });
    for (let i = 0; i < 6; i++) respond(s, i * 1000, 500, false);
    const sum = s.summary();
    expect(sum.correct).toBe(0);
    expect(sum.accuracy).toBe(0);
    expect(sum.rtMean).toBeNull();
    expect(sum.rtMedian).toBeNull();
    expect(sum.slope).toBeNull();
    expect(make().summary().accuracy).toBeNull();
  });

  it('Anstieg: Antwortzeit wächst mit dem Winkel → positiver Anstieg ≈ Vorgabe; Winkel 0° bis 180° (90°-Modus: drei Stufen)', () => {
    const s = make({ trials: 48, angles: '90' }, 9);
    let now = 0;
    for (let i = 0; i < 48; i++) {
      const t = s.trial!;
      s.beginTrial(now);
      const rt = 600 + (foldAngle(t.angle) / 90) * 250;
      s.answer(t.same, now + rt);
      now += rt + 600;
    }
    const sum = s.summary();
    expect(sum.slope).toBeCloseTo(250, 0);
    expect(sum.accuracy).toBe(100);
  });

  it('Anstieg bei 45°-Schritten: fünf Winkelstufen, gleiche Steigung', () => {
    const s = make({ trials: 80, angles: '45' }, 5);
    let now = 0;
    for (let i = 0; i < 80; i++) {
      const t = s.trial!;
      s.beginTrial(now);
      const rt = 500 + (foldAngle(t.angle) / 90) * 300;
      s.answer(t.same, now + rt);
      now += rt + 600;
    }
    expect(s.summary().slope).toBeCloseTo(300, 0);
  });

  it('Anstieg fehlt bei zu wenigen richtigen Antworten (< 6) oder wenn nur eine Winkelstufe vorkommt', () => {
    const s = make({ trials: 6 }, 3);
    for (let i = 0; i < 5; i++) respond(s, i * 1000, 800 + i * 10);
    respond(s, 5000, 800, false);
    expect(s.summary().correct).toBe(5);
    expect(s.summary().slope).toBeNull();
    const fixed = new RotationSession(rotationParams({}), {
      rng: createRng(1),
      fixedTrials: Array.from({ length: 8 }, () => ({ angle: 90, same: true })),
    });
    fixed.start(0);
    for (let i = 0; i < 8; i++) respond(fixed, i * 1000, 700 + i);
    expect(fixed.summary().correct).toBe(8);
    expect(fixed.summary().slope).toBeNull();
  });

  it('feste Aufgaben (Intro-Film) werden in dieser Reihenfolge gestellt', () => {
    const plan = [
      { angle: 90, same: true },
      { angle: 180, same: false },
    ];
    const s = new RotationSession(rotationParams({ cells: 5 }), { rng: createRng(1), fixedTrials: plan });
    s.start(0);
    expect(s.total).toBe(2);
    expect(s.trial).toMatchObject(plan[0]);
    respond(s, 0, 500);
    expect(s.trial).toMatchObject(plan[1]);
    respond(s, 1000, 500);
    expect(s.finished).toBe(true);
  });

  it('Punkte und Tipps', () => {
    expect(pointsFor(7)).toBe(70);
    const base: RotationSummary = { correct: 20, total: 24, accuracy: 83, rtMean: 1500, rtMedian: 1400, slope: 320, trials: [] };
    expect(tipFor({ ...base, accuracy: 60 })).toBe('slow');
    expect(tipFor({ ...base, accuracy: null })).toBe('slow');
    expect(tipFor({ ...base, accuracy: 95 })).toBe('harder');
    expect(tipFor(base)).toBe('turn');
    expect(tipFor({ ...base, slope: null })).toBe('compare');
    const miss = (same: boolean) => ({ nr: 1, angle: 90, folded: 90, same, answerSame: !same, correct: false, rtMs: 900 });
    expect(tipFor({ ...base, trials: [miss(false), miss(false), miss(true)] })).toBe('mirror');
  });
});

describe('Layout', () => {
  const fields: Array<[string, number, number]> = [
    ['Tablet quer', 1160, 740],
    ['Tablet hoch', 800, 1050],
    ['Handy hoch', 370, 700],
    ['Handy quer', 800, 300],
    ['Film', 640, 200],
  ];
  it('alles liegt im Bereich: Figurenbereiche, Beschriftungen, Knöpfe; Knöpfe ≥ 64 px hoch und nebeneinander ohne Überlappung', () => {
    for (const [name, w, h] of fields) {
      const box = { x: 10, y: 44, w, h };
      const L = layoutRotation(box, 36, 22);
      for (const r of [L.left, L.right, L.leftLabel, L.rightLabel, L.btnSame, L.btnMirror]) {
        expect(r.x, name).toBeGreaterThanOrEqual(box.x - 1e-6);
        expect(r.y, name).toBeGreaterThanOrEqual(box.y - 1e-6);
        expect(r.x + r.w, name).toBeLessThanOrEqual(box.x + box.w + 1e-6);
        expect(r.y + r.h, name).toBeLessThanOrEqual(box.y + box.h + 1e-6);
        expect(r.w).toBeGreaterThan(0);
        expect(r.h).toBeGreaterThan(0);
      }
      expect(L.btnSame.h).toBeGreaterThanOrEqual(MIN_BUTTON_H);
      expect(L.btnSame.x + L.btnSame.w).toBeLessThanOrEqual(L.btnMirror.x);
      // Figurenbereiche überlappen sich nicht und nicht die Knöpfe
      const a = L.left;
      const b = L.right;
      const disjoint = a.x + a.w <= b.x + 1e-6 || b.x + b.w <= a.x + 1e-6 || a.y + a.h <= b.y + 1e-6 || b.y + b.h <= a.y + 1e-6;
      expect(disjoint, name).toBe(true);
      expect(Math.max(a.y + a.h, b.y + b.h)).toBeLessThanOrEqual(L.btnSame.y + 1e-6);
    }
  });

  it('hohe Bühne: Figuren übereinander, breite Bühne: nebeneinander', () => {
    expect(layoutRotation({ x: 0, y: 0, w: 370, h: 700 }, 36, 22).stacked).toBe(true);
    expect(layoutRotation({ x: 0, y: 0, w: 1160, h: 740 }, 36, 22).stacked).toBe(false);
  });

  it('Quadratgröße: die gedrehte Figur passt in den Bereich (Umkreis), die gewünschte Größe wird nicht überschritten', () => {
    for (const [, w, h] of fields) {
      const L = layoutRotation({ x: 0, y: 0, w, h }, 36, 22);
      for (const n of [4, 6, 9]) {
        const f = randomFigure(n, createRng(n));
        const radius = figureRadius(f);
        for (const wanted of [20, 46, 114]) {
          const cell = cellPxFor(L.right, radius, wanted);
          expect(cell).toBeLessThanOrEqual(wanted + 1e-6);
          expect(radius * cell).toBeLessThanOrEqual(Math.min(L.right.w, L.right.h) / 2 + 1e-6);
        }
      }
    }
  });

  it('Auf dem Handy (hoch) bleiben auch Figuren aus neun Quadraten ≥ 24 px je Quadrat', () => {
    const L = layoutRotation({ x: 10, y: 44, w: 370, h: 780 }, 36, 22);
    const f = randomFigure(9, createRng(1));
    expect(cellPxFor(L.right, figureRadius(f), 46)).toBeGreaterThanOrEqual(24);
  });
});
