/**
 * Level 1–10 von „Binocular Mine“: Leveldaten, Schwierigkeitsparameter, Binokular-Prüfer (mit beiden Augen lösbar,
 * mit einem Auge nicht, fehlende Paarhälfte → nicht lösbar), Automatik, neue Mechaniken, Freischaltung, Migration.
 */
import { describe, expect, it } from 'vitest';
import { DIFFICULTY_EFFECT } from '../../src/binokular/data/settings';
import { afterLevel, chooseLevel, defaultProgress, isUnlocked, normalizeProgress, unlockAll } from '../../src/binokular/data/progress';
import { attemptText, CSV_COLUMNS, sessionsToCsv } from '../../src/binokular/data/csv';
import { audioPrefsOf, loadStore, normalizeStore, STORAGE_KEY, type KeyValue } from '../../src/binokular/data/storage';
import { decoyCount, Engine, patrolCell, patrolIndex, type EngineOptions } from '../../src/binokular/game/engine';
import { AMBLYOPIC_ONLY, BOTH_EYES, FELLOW_ONLY, replayCommands, solveLevel, type Knowledge } from '../../src/binokular/game/solver';
import { calcStars, parTimeS } from '../../src/binokular/game/stars';
import { isStandable, parseMap } from '../../src/binokular/game/world';
import { LEVELS, levelByNumber, nextLevelNumber } from '../../src/binokular/levels';
import { objectCountOf, pairDistanceOf } from '../../src/binokular/levels/metrics';
import type { LevelDef } from '../../src/binokular/levels/types';
import { SessionRecorder } from '../../src/binokular/therapy/session';
import { t } from '../../src/binokular/texts';
import { cellAt, classMarks, fitLayout, MIN_CELL, visibleCells } from '../../src/binokular/vision/renderer';

const run = (e: Engine, ms = 30000) => {
  for (let x = 0; x < ms && !e.isIdle(); x += 50) e.tick(50);
};
const tickFor = (e: Engine, ms: number) => {
  for (let x = 0; x < ms; x += 50) e.tick(50);
};

/** Optionen wie im Spielbildschirm (Schwierigkeitsgrad, Automatik 4-fach) */
function gameOpts(lv: LevelDef, difficulty: keyof typeof DIFFICULTY_EFFECT = 'EASY', autoplay = true): EngineOptions {
  const eff = DIFFICULTY_EFFECT[difficulty];
  return {
    objectSize: lv.difficulty.objectSize * eff.sizeFactor,
    distraction: Math.min(1, lv.difficulty.distraction + eff.extraDistraction),
    moveSpeed: lv.difficulty.moveSpeed * eff.speedFactor * (autoplay ? 4 : 1),
    hazardSpeed: lv.difficulty.hazardSpeed * eff.speedFactor,
  };
}

/** grobe Schätzung der Spieldauer eines Menschen: reine Wege × 1,5 (Umwege) + 4 s Planen/Suchen je Eingabe */
const estimateS = (r: { activeMs: number; commands: unknown[] }) => (r.activeMs / 1000) * 1.5 + r.commands.length * 4;

describe('Leveldaten (alle 10)', () => {
  it('10 Level in Reihenfolge, Namen und Einstiegshinweis in texts.ts', () => {
    expect(LEVELS).toHaveLength(10);
    LEVELS.forEach((lv, i) => {
      expect(lv.number).toBe(i + 1);
      expect(lv.id).toBe(`level${String(i + 1).padStart(2, '0')}`);
      expect(t.levelNames[lv.nameKey], lv.id).toBeTruthy();
      expect(t.levelIntro[lv.id], lv.id).toBeTruthy();
    });
    expect(new Set(LEVELS.map((l) => l.id)).size).toBe(10);
    expect(levelByNumber(0).number).toBe(1);
    expect(levelByNumber(99).number).toBe(10);
    expect(nextLevelNumber(10)).toBe(10);
  });

  for (const lv of LEVELS) {
    it(`Level ${lv.number}: Raster, Objekte, Roboter auf festem Boden, Basis erreichbar`, () => {
      const cols = lv.map[0].length;
      expect(lv.map.every((r) => r.length === cols && /^[RDL.]+$/.test(r))).toBe(true);
      expect(lv.map[0]).toMatch(/^R+$/);
      expect(lv.map[lv.map.length - 1]).toMatch(/^R+$/);
      expect(lv.map.every((r) => r[0] === 'R' && r[cols - 1] === 'R')).toBe(true);
      const ids = lv.objects.map((o) => o.id);
      expect(new Set(ids).size, 'IDs eindeutig').toBe(ids.length);
      expect(lv.objects.filter((o) => o.kind === 'base')).toHaveLength(1);
      const { tiles } = parseMap(lv.map);
      for (const o of lv.objects) {
        expect(o.x >= 0 && o.y >= 0 && o.x < cols && o.y < lv.map.length, `${o.id} im Raster`).toBe(true);
        if (o.kind !== 'platform' && o.kind !== 'lamp') expect(tiles[o.y][o.x], `${o.id} nicht im Fels`).not.toBe('rock');
        if (o.contrast !== undefined) expect(o.contrast >= 0 && o.contrast <= 1).toBe(true);
        expect(['BOTH', 'AMBLYOPIC', 'FELLOW']).toContain(o.eye);
      }
      const e = new Engine(lv);
      const w = e.world();
      for (const id of e.robotIds()) {
        const c = e.robotCell(id)!;
        expect(isStandable(w, c.x, c.y), `${id} steht`).toBe(true);
      }
      const base = lv.objects.find((o) => o.kind === 'base')!;
      expect(isStandable(w, base.x, base.y), 'Basis auf festem Boden').toBe(true);
      for (const o of lv.objects.filter((q) => q.kind === 'switch' || q.kind === 'plate')) expect(isStandable(w, o.x, o.y), o.id).toBe(true);
      expect(lv.objects.filter((o) => o.kind === 'crystal').length).toBeGreaterThanOrEqual(lv.requiredCrystals);
      expect(lv.solverRobots.every((id) => lv.objects.some((o) => o.kind === 'robot' && o.id === id))).toBe(true);
    });
  }

  it('jedes Level: mindestens zwei binokulare Paare; Paarhälften gehören zum jeweiligen Auge', () => {
    for (const lv of LEVELS) {
      expect(lv.pairs.length, lv.id).toBeGreaterThanOrEqual(2);
      for (const p of lv.pairs) {
        expect(p.amblyopic.length && p.fellow.length).toBeTruthy();
        for (const kind of p.amblyopic) {
          const objs = lv.objects.filter((o) => o.kind === kind);
          if (kind === 'ladder') expect(lv.ladderEye === 'AMBLYOPIC' || (objs.length > 0 && objs.every((o) => o.eye === 'AMBLYOPIC')), lv.id).toBe(true);
          else expect(objs.length > 0 && objs.every((o) => o.eye === 'AMBLYOPIC'), `${lv.id} ${kind}`).toBe(true);
        }
        for (const kind of p.fellow) {
          const objs = lv.objects.filter((o) => o.kind === kind);
          expect(objs.length > 0 && objs.every((o) => o.eye === 'FELLOW'), `${lv.id} ${kind}`).toBe(true);
        }
      }
      // Gefahren sieht nur das amblyope Auge
      expect(lv.objects.filter((o) => o.kind === 'hazard').every((o) => o.eye === 'AMBLYOPIC')).toBe(true);
    }
  });

  it('wandernde Gefahren: zusammenhängende Bahn auf Luftfeldern, Tempo und Reaktionszeit passen zusammen', () => {
    for (const lv of LEVELS) {
      const moving = lv.objects.filter((o) => o.kind === 'hazard' && o.patrol && o.patrol.length >= 2);
      const d = lv.difficulty;
      expect(moving.length > 0, lv.id).toBe(d.hazardSpeed > 0);
      expect(d.reactionTimeMs).toBe(d.hazardSpeed > 0 ? Math.round(1000 / d.hazardSpeed) : null);
      const { tiles } = parseMap(lv.map);
      for (const h of moving) {
        expect(h.patrol![0]).toEqual({ x: h.x, y: h.y });
        h.patrol!.forEach((c, i) => {
          expect(tiles[c.y][c.x], `${lv.id} Bahn auf Luft`).toBe('air');
          if (i) expect(Math.abs(c.x - h.patrol![i - 1].x) + Math.abs(c.y - h.patrol![i - 1].y)).toBe(1);
        });
      }
    }
  });
});

describe('Schwierigkeitsparameter steigen schrittweise (Tabelle im README)', () => {
  const D = LEVELS.map((l) => l.difficulty);
  const nonDecreasing = (xs: number[]) => xs.every((x, i) => i === 0 || x >= xs[i - 1]);
  const nonIncreasing = (xs: number[]) => xs.every((x, i) => i === 0 || x <= xs[i - 1]);
  it('alle neun Parameter vorhanden', () => {
    for (const d of D) {
      for (const k of ['objectSize', 'contrast', 'moveSpeed', 'hazardSpeed', 'objectCount', 'pairDistance', 'distraction', 'complexity', 'reactionTimeMs', 'binocularDurationS']) {
        expect(d, k).toHaveProperty(k);
      }
    }
  });
  it('Angaben stimmen mit den Leveldaten überein (Objektanzahl, Paarabstand)', () => {
    for (const lv of LEVELS) {
      expect(lv.difficulty.objectCount, lv.id).toBe(objectCountOf(lv));
      expect(lv.difficulty.pairDistance, lv.id).toBe(pairDistanceOf(lv));
    }
  });
  it('Objekte kleiner, Ziele blasser, Ablenker deutlicher (monoton)', () => {
    expect(nonIncreasing(D.map((d) => d.objectSize))).toBe(true);
    expect(nonIncreasing(D.map((d) => d.contrast.target))).toBe(true);
    expect(nonDecreasing(D.map((d) => d.contrast.distractor))).toBe(true);
    expect(D[9].objectSize).toBeLessThan(D[0].objectSize);
    expect(D[9].contrast.target).toBeLessThan(D[0].contrast.target);
  });
  it('mehr Objekte, mehr Ablenkung, höhere Komplexität, längere binokulare Nutzung (monoton)', () => {
    expect(nonDecreasing(D.map((d) => d.objectCount))).toBe(true);
    expect(nonDecreasing(D.map((d) => d.distraction))).toBe(true);
    expect(nonDecreasing(D.map((d) => d.complexity))).toBe(true);
    expect(nonDecreasing(D.map((d) => d.binocularDurationS))).toBe(true);
    expect(D.every((d) => d.binocularDurationS >= 120 && d.binocularDurationS <= 300)).toBe(true);
  });
  it('Bewegung: Roboter gleich ruhig, wandernde Gefahr ab Level 6, langsam steigend; Reaktionszeit sinkt', () => {
    expect(D.every((d) => d.moveSpeed === 2.5)).toBe(true);
    expect(D.slice(0, 5).every((d) => d.hazardSpeed === 0 && d.reactionTimeMs === null)).toBe(true);
    expect(nonDecreasing(D.map((d) => d.hazardSpeed))).toBe(true);
    expect(D.every((d) => d.hazardSpeed <= 0.7)).toBe(true);
    expect(nonIncreasing(D.slice(5).map((d) => d.reactionTimeMs!))).toBe(true);
  });
  it('Paarabstand steigt bis Level 9 (weite Wege); Level 10 bewusst mittel (dokumentierte Ausnahme)', () => {
    expect(nonDecreasing(D.slice(0, 9).map((d) => d.pairDistance))).toBe(true);
    expect(D[9].pairDistance).toBeGreaterThan(D[7].pairDistance);
    expect(D[9].pairDistance).toBeLessThan(D[8].pairDistance);
  });
  it('nicht nur Tempo: über die Level ändern sich mindestens sechs Parameter', () => {
    const first = D[0];
    const last = D[9];
    const changed = [
      first.objectSize !== last.objectSize,
      first.contrast.target !== last.contrast.target,
      first.hazardSpeed !== last.hazardSpeed,
      first.objectCount !== last.objectCount,
      first.pairDistance !== last.pairDistance,
      first.distraction !== last.distraction,
      first.complexity !== last.complexity,
      first.reactionTimeMs !== last.reactionTimeMs,
      first.binocularDurationS !== last.binocularDurationS,
    ].filter(Boolean).length;
    expect(changed).toBeGreaterThanOrEqual(6);
  });
});

describe.each(LEVELS.map((lv) => [lv.number, lv] as const))('Binokular-Prüfer Level %i', (_n, lv) => {
  it('mit beiden Augen lösbar – ohne Fehlversuch, in der Richtzeit (3 Sterne), geschätzte Dauer 2–5 min', () => {
    const r = solveLevel(lv, BOTH_EYES);
    expect(r.reason).toBe('solved');
    expect(r.failures).toBe(0);
    expect(calcStars({ completed: r.completed, activeMs: r.activeMs, failures: r.failures }, { parTimeS: parTimeS(lv.difficulty.complexity), maxFailures: lv.maxFailuresForStar })).toBe(3);
    const est = estimateS(r);
    expect(est, `geschätzt ${Math.round(est)} s`).toBeGreaterThanOrEqual(120);
    expect(est, `geschätzt ${Math.round(est)} s`).toBeLessThanOrEqual(300);
  });
  it('nur amblyopes Auge: nicht lösbar – auch nicht mit verratenen Kristallen und Basis', () => {
    expect(solveLevel(lv, AMBLYOPIC_ONLY).completed).toBe(false);
    expect(solveLevel(lv, { eyes: ['AMBLYOPIC'], grant: ['crystal', 'base'] }).completed).toBe(false);
  });
  it('nur dominantes Auge: nicht lösbar – auch nicht mit verratener Roboterposition', () => {
    expect(solveLevel(lv, FELLOW_ONLY).completed).toBe(false);
    expect(solveLevel(lv, { eyes: ['FELLOW'], grant: ['robot'] }).completed).toBe(false);
  });
  it('jedes Paar ist nötig: fehlt eine Hälfte, ist das Level nicht lösbar', () => {
    const kinds = new Set(lv.pairs.flatMap((p) => [...p.amblyopic, ...p.fellow]));
    for (const kind of kinds) {
      const r = solveLevel(lv, { eyes: ['AMBLYOPIC', 'FELLOW'], hide: [kind] });
      expect(r.completed, `ohne ${kind}: ${r.reason}`).toBe(false);
    }
  });
  it('Automatik (?autoplay=1) erreicht den Abschluss: Wiedergabe mit unregelmäßigen Bildzeiten, ohne Fehlversuch', () => {
    for (const diff of ['EASY', 'HARD'] as const) {
      const opts = gameOpts(lv, diff);
      const r = solveLevel(lv, BOTH_EYES, opts);
      expect(r.completed, diff).toBe(true);
      const rp = replayCommands(lv, r.commands, opts);
      expect(rp.completed, diff).toBe(true);
      expect(rp.failures, diff).toBe(0);
    }
  });
});

describe('Binokular-Prüfer: neue Mechaniken', () => {
  it('Leitern nur für das amblyope Auge (Level 3, 10): alles andere bekannt, Leitern nicht → nicht lösbar', () => {
    for (const lv of [levelByNumber(3), levelByNumber(10)]) {
      const k: Knowledge = { eyes: ['FELLOW'], grant: ['robot', 'key', 'switch', 'plate', 'hazard'] };
      expect(solveLevel(lv, k).completed, lv.id).toBe(false);
      expect(solveLevel(lv, { ...k, grant: [...k.grant!, 'ladder'] }).completed, lv.id).toBe(true);
    }
  });
  it('zwei Roboter (Level 4, 10): mit nur einem Roboter nicht lösbar', () => {
    for (const lv of [levelByNumber(4), levelByNumber(10)]) {
      expect(lv.solverRobots).toHaveLength(2);
      for (const id of lv.solverRobots) expect(solveLevel({ ...lv, solverRobots: [id] }, BOTH_EYES).completed, `${lv.id} nur ${id}`).toBe(false);
    }
  });
  for (const n of [6, 7, 8, 9, 10]) {
    it(`wandernde Gefahr (Level ${n}): unsichtbar → Fehlversuche, sichtbar → Löser wartet und bleibt ohne Fehlversuch`, () => {
      const lv = levelByNumber(n);
      const blind = solveLevel(lv, { eyes: ['AMBLYOPIC', 'FELLOW'], hide: ['hazard'] });
      expect(blind.failures, lv.id).toBeGreaterThanOrEqual(1);
      expect(solveLevel(lv, BOTH_EYES).failures).toBe(0);
    });
  }
});

describe('Spiellogik: neue Mechaniken', () => {
  it('Druckplatte: Brücke nur, solange ein Roboter darauf steht; wer dann auf der Brücke steht, kehrt zurück (kein Fehlversuch)', () => {
    const lv = levelByNumber(4);
    const e = new Engine(lv);
    const bridgeOn = () => e.world().platformAt(9, 2);
    expect(bridgeOn()).toBe(false);
    e.tap(1, 5); // Roboter 2
    e.tap(3, 5); // Schlüssel
    run(e);
    expect(e.snapshot().carrying).toBe('key');
    e.tap(5, 3); // Bogen über das Glutnest
    run(e);
    e.tap(12, 5); // Tür
    run(e);
    expect(e.drainEvents().map((x) => x.msg)).toContain('doorOpened');
    e.tap(14, 5); // Druckplatte
    run(e);
    expect(bridgeOn()).toBe(true);
    const evs = e.drainEvents().map((x) => x.msg);
    expect(evs).toContain('plateOn');
    expect(evs).toContain('platformMoved');
    e.tap(3, 1); // Roboter 1 über die Brücke
    e.tap(10, 1);
    run(e);
    expect(e.robotCell('robot1')).toEqual({ x: 10, y: 1 });
    // Roboter 2 verlässt die Platte → Brücke fährt ein → Roboter 1 zurück zum sicheren Punkt, ohne Fehlversuch
    e.tap(14, 5);
    e.tap(13, 5);
    run(e);
    expect(bridgeOn()).toBe(false);
    expect(e.drainEvents().map((x) => x.msg)).toContain('plateOff');
    expect(e.robotCell('robot1')).toEqual({ x: 3, y: 1 });
    expect(e.failures).toBe(0);
  });
  it('Schalter mit zwei gegenläufigen Plattformen (Level 7): links steht anfangs, umlegen tauscht', () => {
    const e = new Engine(levelByNumber(7));
    const w0 = e.world();
    expect(w0.platformAt(3, 2) && w0.platformAt(4, 2)).toBe(true); // linke Brücke steht
    expect(w0.platformAt(11, 2)).toBe(false);
    expect(e.findPath({ x: 7, y: 1 }, { x: 2, y: 1 })).not.toBeNull();
    // Schalter zuerst umlegen: der Weg nach links ist zu (Reihenfolge!)
    e.tap(7, 1);
    e.tap(5, 5);
    run(e);
    expect(e.drainEvents().map((x) => x.msg)).toContain('switchOn');
    const w1 = e.world();
    expect(w1.platformAt(3, 2)).toBe(false);
    expect(w1.platformAt(11, 2) && w1.platformAt(12, 2)).toBe(true);
    expect(e.findPath({ x: 7, y: 1 }, { x: 2, y: 1 })).toBeNull();
  });
  it('wandernde Gefahr: fester Zeitplan hin und zurück; trifft auch stehende Roboter; Vorhersage für die Automatik', () => {
    expect([0, 1, 2, 3, 4, 5, 6, 7].map((k) => patrolIndex(4, k))).toEqual([0, 1, 2, 3, 2, 1, 0, 1]);
    expect(patrolIndex(1, 5)).toBe(0);
    const lv = levelByNumber(6);
    const ember = lv.objects.find((o) => o.patrol)!;
    expect(patrolCell(ember.patrol!, 2000, 0)).toEqual({ x: 3, y: 3 });
    expect(patrolCell(ember.patrol!, 2000, 6100)).toEqual({ x: 6, y: 3 });
    // Roboter steht auf der Kreuzung (6,3) der Bahn – die Glut kommt nach 6 s dort an
    const e = new Engine(lv);
    e.tap(3, 1);
    e.tap(6, 3);
    run(e);
    expect(e.robotCell('robotA')).toEqual({ x: 6, y: 3 });
    e.drainEvents();
    expect(e.failures).toBe(0);
    tickFor(e, 6500 - e.elapsedMs);
    expect(e.failures).toBe(1);
    const ev = e.drainEvents().find((x) => x.msg === 'hazard')!;
    expect(ev.mobile).toBe(true);
    // Vorhersage: zur Kreuzung laufen, während die Glut dort ist → nicht frei; später frei
    const f = new Engine(lv);
    f.tap(3, 1);
    tickFor(f, 4600);
    expect(f.moveIsSafe(6, 5)).toBe(false);
    tickFor(f, 6000);
    expect(f.moveIsSafe(6, 5)).toBe(true);
    // Szene: Bahn als eigene Objekte, Glut gleitet weich (Zwischenwerte nur kurz um den Schrittzeitpunkt)
    const sc = f.scene();
    expect(sc.objects.filter((o) => o.kind === 'rail')).toHaveLength(ember.patrol!.length);
    expect(sc.objects.find((o) => o.id === ember.id)!.flags?.mobile).toBe(true);
  });
  it('Objektkontrast: blasse Ziele (Level 8) und eigene Kontraste je Objekt', () => {
    const lv = levelByNumber(8);
    const sc = new Engine(lv).scene();
    for (const o of sc.objects.filter((q) => q.kind === 'crystal' || q.kind === 'base')) expect(o.contrast).toBeCloseTo(0.6);
    expect(sc.objects.find((o) => o.kind === 'door')!.contrast).toBe(1);
    const custom: LevelDef = { ...lv, objects: lv.objects.map((o) => (o.id === 'key1' ? { ...o, contrast: 0.3 } : o)) };
    expect(new Engine(custom).scene().objects.find((o) => o.id === 'key1')!.contrast).toBeCloseTo(0.3);
  });
  it('Kennzeichen an Schlüssel und Tür; falscher Schlüssel öffnet nicht', () => {
    const lv = levelByNumber(2);
    const sc = new Engine(lv).scene();
    expect(sc.objects.find((o) => o.id === 'key2')!.flags?.mark).toBe(2);
    expect(sc.objects.find((o) => o.id === 'door2')!.flags?.mark).toBe(2);
    const e = new Engine({ ...lv, objects: lv.objects.map((o) => (o.id === 'key1' ? { ...o, group: 'door2' } : o)) });
    e.tap(3, 1);
    e.tap(2, 5);
    run(e);
    e.tap(7, 3);
    run(e);
    e.tap(9, 5);
    run(e);
    expect(e.drainEvents().map((x) => x.msg)).toContain('needKey');
  });
  it('neutrale Ablenker: Zahl aus der Ablenkung, für beide Augen, nicht auf Spielobjekten, nicht benutzbar', () => {
    expect(decoyCount(0.15)).toBe(0);
    expect(decoyCount(0.4)).toBe(4);
    expect(decoyCount(0.5)).toBe(6);
    const lv = levelByNumber(5);
    const e = new Engine(lv);
    const decoys = e.scene().objects.filter((o) => o.kind === 'decoy');
    expect(decoys).toHaveLength(4);
    const busy = new Set(lv.objects.map((o) => `${o.x},${o.y}`));
    for (const d of decoys) {
      expect(d.eyeVisibility).toBe('BOTH');
      expect(busy.has(`${d.x},${d.y}`)).toBe(false);
    }
    e.tap(13, 1);
    e.tap(decoys[0].x, decoys[0].y);
    run(e);
    const msgs = e.drainEvents().map((x) => x.msg);
    expect(msgs.some((m) => m === 'pickedCrystal' || m === 'pickedKey')).toBe(false);
  });
  it('Ereignisse für den Ton: Loslaufen, Plattform bewegt sich', () => {
    const e = new Engine(levelByNumber(1));
    e.tap(3, 1);
    e.tap(4, 1);
    expect(e.drainEvents().map((x) => x.msg)).toContain('moveStart');
  });
});

describe('Darstellung: jedes Objekt hat Augenklasse und Kontrast; Debug-Ansicht 5 ordnet jedes Objekt zu', () => {
  it('alle Level: Szene ohne Farben, jede Objektart mit eyeVisibility und contrast, Klassenansicht vollständig', () => {
    const kinds = new Set<string>();
    for (const lv of LEVELS) {
      const sc = new Engine(lv, { distraction: 0.6 }).scene();
      const marks = classMarks(sc.objects);
      expect(marks).toHaveLength(sc.objects.length);
      sc.objects.forEach((o, i) => {
        kinds.add(o.kind);
        expect(['AMBLYOPIC', 'FELLOW', 'BOTH']).toContain(o.eyeVisibility);
        expect(o.contrast >= 0 && o.contrast <= 1, `${lv.id} ${o.id}`).toBe(true);
        expect(marks[i].label).toBe({ AMBLYOPIC: 'A', FELLOW: 'F', BOTH: 'B' }[o.eyeVisibility]);
        expect(JSON.stringify(o)).not.toMatch(/\brgb\(|"#[0-9a-f]{3,6}"|\bred\b|\bcyan\b|\bgreen\b/i);
      });
    }
    for (const k of ['plate', 'decoy', 'rail', 'ladder', 'platform', 'hazard', 'key', 'door', 'switch', 'crystal', 'robot', 'base']) expect(kinds.has(k), k).toBe(true);
  });
});

describe('Kamera für große Level: Trefferflächen bleiben ≥ 48 px', () => {
  it('passt das Raster, wird es zentriert; sonst Ausschnitt mit Feldern von 48 px, an den Rändern begrenzt', () => {
    const small = fitLayout(16, 7, 1180, 700);
    expect(small.scrollX || small.scrollY).toBe(false);
    const big = fitLayout(24, 10, 844, 330, { x: 3, y: 1 });
    expect(big.cell).toBe(MIN_CELL);
    expect(big.scrollX && big.scrollY).toBe(true);
    expect(big.ox).toBe(0); // links begrenzt
    expect(big.oy).toBe(0);
    const right = fitLayout(24, 10, 844, 330, { x: 30, y: 30 });
    expect(right.ox).toBe(844 - 24 * 48);
    expect(right.oy).toBe(330 - 10 * 48);
    const v = visibleCells(right);
    expect(v.x1).toBeCloseTo(24);
    // Treffer mit verschobenem Ausschnitt
    expect(cellAt(right, 24, 10, 10, 10)).toEqual({ x: Math.floor((10 - right.ox) / 48), y: Math.floor((10 - right.oy) / 48) });
    for (const lv of LEVELS) {
      const cols = lv.map[0].length;
      for (const [w, h] of [[1180, 700], [1440, 780], [844, 330]]) expect(fitLayout(cols, lv.map.length, w, h).cell, `${lv.id} ${w}`).toBeGreaterThanOrEqual(MIN_CELL);
    }
  });
});

describe('Fortschritt und Freischaltung', () => {
  it('Level 1 offen, Level n+1 nach Abschluss von n; ohne Abschluss bleibt es gesperrt', () => {
    let p = defaultProgress();
    expect(isUnlocked(p, 1)).toBe(true);
    expect(isUnlocked(p, 2)).toBe(false);
    p = afterLevel(p, { number: 1, id: 'level01', completed: false, stars: 0, consecutiveFailures: 1 }, 10);
    expect(p.unlocked).toBe(1);
    expect(p.level).toBe(1);
    p = afterLevel(p, { number: 1, id: 'level01', completed: true, stars: 2, consecutiveFailures: 0 }, 10);
    expect(p.unlocked).toBe(2);
    expect(p.level).toBe(2);
    expect(p.bestStars.level01).toBe(2);
    p = afterLevel(p, { number: 1, id: 'level01', completed: true, stars: 1, consecutiveFailures: 0 }, 10);
    expect(p.bestStars.level01).toBe(2); // beste Sterne bleiben
    p = afterLevel({ ...p, unlocked: 10 }, { number: 10, id: 'level10', completed: true, stars: 3, consecutiveFailures: 0 }, 10);
    expect(p.level).toBe(10);
    expect(p.unlocked).toBe(10);
  });
  it('Levelauswahl nur freigeschaltet; Therapeut: Startlevel wählen (schaltet frei) und alle freischalten', () => {
    const p = defaultProgress();
    expect(chooseLevel(p, 5, 10)).toBe(p);
    const forced = chooseLevel(p, 5, 10, true);
    expect(forced.level).toBe(5);
    expect(forced.unlocked).toBe(5);
    expect(unlockAll(p, 10).unlocked).toBe(10);
    expect(chooseLevel(unlockAll(p, 10), 9, 10).level).toBe(9);
  });
  it('Migration: gespeicherte Daten aus dem MVP (ohne Freischaltung, ohne Ton) bleiben lesbar', () => {
    const old = {
      version: 1,
      settings: { amblyopicEye: 'RIGHT', fellowEyeContrast: 24.2 },
      calibration: {},
      sessions: [],
      pin: '1234',
      progress: { consecutiveFailures: 1, level: 1, bestStars: { level01: 3 } },
      activeSession: null,
    };
    const s = normalizeStore(old);
    expect(s.progress).toEqual({ consecutiveFailures: 1, level: 1, unlocked: 2, bestStars: { level01: 3 } });
    expect(s.settings.amblyopicEye).toBe('RIGHT');
    expect(s.settings.fellowEyeContrast).toBe(24.2);
    expect(s.settings.soundOn).toBe(true);
    expect(s.settings.soundVolume).toBe('MEDIUM');
    expect(s.audio).toBeNull();
    expect(audioPrefsOf(s)).toEqual({ on: true, volume: 'MEDIUM' });
    expect(s.pin).toBe('1234');
    // über den echten Speicherweg
    const mem = new Map<string, string>([[STORAGE_KEY, JSON.stringify(old)]]);
    const kv: KeyValue = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v), removeItem: (k) => void mem.delete(k) };
    expect(loadStore(kv).progress.unlocked).toBe(2);
    // ohne Sterne: bis zum gespeicherten Level frei; kaputte Werte → Standard
    expect(normalizeProgress({ level: 3 }, 10).unlocked).toBe(3);
    expect(normalizeProgress({ level: 'x', unlocked: 99, bestStars: { level01: 7, level02: 'a' } }, 10)).toEqual({ consecutiveFailures: 0, level: 1, unlocked: 10, bestStars: { level01: 3 } });
    expect(normalizeProgress(null, 10)).toEqual(defaultProgress());
  });
  it('Toneinstellung der Person geht vor, sonst Voreinstellung', () => {
    const s = normalizeStore({ settings: { soundOn: false, soundVolume: 'LOW' } });
    expect(audioPrefsOf(s)).toEqual({ on: false, volume: 'LOW' });
    expect(audioPrefsOf({ ...s, audio: { on: true, volume: 'HIGH' } })).toEqual({ on: true, volume: 'HIGH' });
    expect(normalizeStore({ audio: { on: 'ja' } }).audio).toBeNull();
    expect(normalizeStore({ audio: { on: true, volume: 'LAUT' } }).audio).toEqual({ on: true, volume: 'MEDIUM' });
  });
});

describe('Datenerfassung je Level (Session-Log, CSV)', () => {
  it('Level, Sterne, Fehler und Zeit je Level stehen im Log und in der CSV', () => {
    let now = new Date(2026, 9, 6, 9, 0, 0).getTime();
    const r = new SessionRecorder({ patientId: 'P1', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED', plannedMinutes: 30 }, () => now);
    r.addAttempt({ levelId: 'level01', levelNumber: 1, activeMs: 95000, result: 'completed', stars: 3, failures: 0, fellowContrastBefore: 20, fellowContrastAfter: 22 });
    now += 100000;
    r.addAttempt({ levelId: 'level02', levelNumber: 2, activeMs: 140400, result: 'completed', stars: 2, failures: 1, fellowContrastBefore: 22, fellowContrastAfter: 24.2 });
    r.addAttempt({ levelId: 'level03', levelNumber: 3, activeMs: 300000, result: 'timeout', stars: 0, failures: 2, fellowContrastBefore: 24.2, fellowContrastAfter: 24.2 });
    const s = r.finish('user');
    expect(s.highestLevel).toBe(3);
    expect(s.attempts.map((a) => [a.levelNumber, a.stars, a.failures, a.activeMs])).toEqual([
      [1, 3, 0, 95000],
      [2, 2, 1, 140400],
      [3, 0, 2, 300000],
    ]);
    expect(attemptText(s.attempts[1])).toBe('L2 geschafft, 2 Sterne, 1 Fehler, 140 s');
    const lines = sessionsToCsv([s]).slice(1).trim().split('\r\n');
    const head = lines[0].split(';');
    const row = lines[1].split(';');
    expect(head).toHaveLength(CSV_COLUMNS.length);
    expect(row[head.indexOf('Level-Details')]).toBe('L1 geschafft, 3 Sterne, 0 Fehler, 95 s | L2 geschafft, 2 Sterne, 1 Fehler, 140 s | L3 Zeit um, 0 Sterne, 2 Fehler, 300 s');
    expect(row[head.indexOf('Höchstes Level')]).toBe('3');
  });
});
