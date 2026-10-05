import { describe, expect, it } from 'vitest';
import { Engine } from '../../src/binokular/game/engine';
import { AMBLYOPIC_ONLY, BOTH_EYES, FELLOW_ONLY, solveLevel } from '../../src/binokular/game/solver';
import { calcStars, parTimeS } from '../../src/binokular/game/stars';
import { findPath, isStandable } from '../../src/binokular/game/world';
import { LEVELS } from '../../src/binokular/levels';
import { level01 } from '../../src/binokular/levels/level01';

const run = (e: Engine, ms = 20000) => {
  for (let t = 0; t < ms && !e.isIdle(); t += 50) e.tick(50);
};

describe('Level 1 – Daten', () => {
  it('Raster rechteckig, Rand aus Fels, Objekte auf gültigen Feldern', () => {
    const cols = level01.map[0].length;
    expect(level01.map.every((r) => r.length === cols)).toBe(true);
    expect(level01.map[0]).toMatch(/^R+$/);
    expect(level01.map[level01.map.length - 1]).toMatch(/^R+$/);
    const e = new Engine(level01);
    const w = e.world();
    for (const id of ['robotA', 'robotB']) {
      const c = e.robotCell(id)!;
      expect(isStandable(w, c.x, c.y), id).toBe(true);
    }
  });
  it('alle Schwierigkeitsparameter vorhanden; mindestens drei binokulare Paare', () => {
    const d = level01.difficulty;
    for (const k of ['objectSize', 'contrast', 'moveSpeed', 'objectCount', 'pairDistance', 'distraction', 'complexity', 'reactionTimeMs', 'binocularDurationS']) {
      expect(d, k).toHaveProperty(k);
    }
    expect(level01.pairs.length).toBeGreaterThanOrEqual(3);
    for (const p of level01.pairs) {
      for (const kind of p.amblyopic) expect(level01.objects.filter((o) => o.kind === kind).every((o) => o.eye === 'AMBLYOPIC'), kind).toBe(true);
      for (const kind of p.fellow) expect(level01.objects.filter((o) => o.kind === kind).every((o) => o.eye === 'FELLOW'), kind).toBe(true);
    }
    expect(level01.objects.filter((o) => o.kind === 'hazard').every((o) => o.eye === 'AMBLYOPIC')).toBe(true);
    expect(LEVELS[0]).toBe(level01);
  });
});

describe('Binokular-Prüfer (Level 1)', () => {
  it('mit beiden Augen lösbar – ohne Fehlversuch, in der Richtzeit (3 Sterne)', () => {
    const r = solveLevel(level01, BOTH_EYES);
    expect(r.reason).toBe('solved');
    expect(r.completed).toBe(true);
    expect(r.failures).toBe(0);
    const stars = calcStars({ completed: r.completed, activeMs: r.activeMs, failures: r.failures }, { parTimeS: parTimeS(level01.difficulty.complexity), maxFailures: level01.maxFailuresForStar });
    expect(stars).toBe(3);
    // Spieldauer der reinen Wege: 2–5 min für Menschen realistisch, der Löser selbst ist schneller
    expect(r.activeMs).toBeGreaterThan(15000);
    expect(r.activeMs).toBeLessThan(120000);
  });
  it('nur amblyopes Auge: nicht lösbar', () => {
    expect(solveLevel(level01, AMBLYOPIC_ONLY).completed).toBe(false);
  });
  it('nur dominantes Auge: nicht lösbar', () => {
    expect(solveLevel(level01, FELLOW_ONLY).completed).toBe(false);
  });
  it('nur dominantes Auge, selbst wenn die Roboterposition verraten wird: nicht lösbar', () => {
    expect(solveLevel(level01, { eyes: ['FELLOW'], grant: ['robot'] }).completed).toBe(false);
  });
  it('nur amblyopes Auge, selbst wenn Kristalle und Basis verraten werden: nicht lösbar', () => {
    expect(solveLevel(level01, { eyes: ['AMBLYOPIC'], grant: ['crystal', 'base'] }).completed).toBe(false);
  });
  it('jedes Paar ist nötig: fehlt eine Hälfte, ist das Level nicht lösbar', () => {
    for (const kind of ['robot', 'crystal', 'base', 'key', 'door', 'switch', 'platform']) {
      const r = solveLevel(level01, { eyes: ['AMBLYOPIC', 'FELLOW'], hide: [kind] });
      expect(r.completed, `ohne ${kind}: ${r.reason}`).toBe(false);
    }
  });
  it('Gefahren unsichtbar: lösbar, aber mit Fehlversuch (Stern verloren)', () => {
    const r = solveLevel(level01, { eyes: ['AMBLYOPIC', 'FELLOW'], hide: ['hazard'] });
    expect(r.completed).toBe(true);
    expect(r.failures).toBeGreaterThanOrEqual(1);
  });
});

describe('Spiellogik', () => {
  it('ohne Auswahl passiert nichts; Roboter antippen wählt aus', () => {
    const e = new Engine(level01);
    expect(e.tap(4, 1)).toBe(false);
    expect(e.drainEvents().map((x) => x.msg)).toContain('selectRobot');
    e.tap(3, 1);
    expect(e.selected).toBe('robotA');
  });
  it('Wegsuche entlang der Leiter; Gefahr → Fehlversuch und zurück zum sicheren Punkt', () => {
    const e = new Engine(level01);
    e.tap(1, 5); // Roboter B
    e.tap(8, 5); // kürzester Weg führt über das Glutnest (7,5)
    run(e);
    expect(e.failures).toBe(1);
    expect(e.robotCell('robotB')).toEqual({ x: 1, y: 5 });
    expect(e.drainEvents().some((x) => x.msg === 'hazard' && x.cell?.x === 7)).toBe(true);
    // Umweg über oben: erst (7,3), dann (8,5)
    e.tap(7, 3);
    run(e);
    e.tap(8, 5);
    run(e);
    expect(e.failures).toBe(1);
    expect(e.robotCell('robotB')).toEqual({ x: 8, y: 5 });
  });
  it('Tür ohne Schlüssel bleibt zu; Graben, Aufnehmen, Ablegen', () => {
    const e = new Engine(level01);
    e.tap(1, 5);
    e.tap(9, 5); // Erde → hinlaufen (über Gefahr) – erst Umweg
    run(e);
    e.drainEvents();
    expect(e.world().tileAt(9, 5)).toBe('dirt'); // Fehlversuch unterwegs, nicht gegraben
    e.tap(7, 3);
    run(e);
    e.tap(9, 5);
    run(e);
    expect(e.world().tileAt(9, 5)).toBe('air');
    e.tap(10, 5); // Tür, kein Schlüssel
    run(e);
    expect(e.drainEvents().map((x) => x.msg)).toContain('needKey');
    expect(e.world().lockedDoorAt(10, 5)).toBe(true);
    // Schlüssel holen, ablegen, wieder aufnehmen
    e.tap(7, 3);
    run(e);
    e.tap(2, 5);
    run(e);
    expect(e.snapshot().carrying).toBe('key');
    expect(e.dropItem()).toBe(true);
    expect(e.snapshot().carrying).toBe(null);
    e.tap(2, 5); // eigenes Feld: Aktion → aufnehmen
    expect(e.snapshot().carrying).toBe('key');
  });
  it('Grube ohne Plattform nicht passierbar', () => {
    const e = new Engine(level01);
    expect(findPath(e.world(), { x: 3, y: 1 }, { x: 11, y: 1 })).toBeNull();
  });
});

describe('Sterne', () => {
  const rules = { parTimeS: 180, maxFailures: 0 };
  it('0 ohne Abschluss, 1–3 nach Zeit und Fehlversuchen', () => {
    expect(calcStars({ completed: false, activeMs: 1000, failures: 0 }, rules)).toBe(0);
    expect(calcStars({ completed: true, activeMs: 200000, failures: 2 }, rules)).toBe(1);
    expect(calcStars({ completed: true, activeMs: 100000, failures: 2 }, rules)).toBe(2);
    expect(calcStars({ completed: true, activeMs: 200000, failures: 0 }, rules)).toBe(2);
    expect(calcStars({ completed: true, activeMs: 180000, failures: 0 }, rules)).toBe(3);
  });
  it('Richtzeit aus Komplexität und Schwierigkeitsgrad', () => {
    expect(parTimeS(3)).toBe(180);
    expect(parTimeS(3, 1.5)).toBe(270);
    expect(parTimeS(0)).toBe(60);
  });
});
