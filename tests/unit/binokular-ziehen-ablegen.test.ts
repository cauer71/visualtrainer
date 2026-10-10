/**
 * „Ziehen & Ablegen“ (Binokular): Ring bleibt im Feld, Treffer, Level 3 hoch / 2 runter, Rollenfolge, Punkte, Zeitfenster,
 * Einstellungen, Zusammenfassung, Augenklassen und graues Feedback.
 */
import { describe, expect, it } from 'vitest';
import { makeRng } from '../../src/binokular/games/common';
import { normalizeGameSettings, defaultGameSettings, normalizeStore } from '../../src/binokular/data/storage';
import { sessionRow } from '../../src/binokular/data/csv';
import { paletteOf, startProfileFor } from '../../src/binokular/calibration/profiles';
import { normalizeSession } from '../../src/binokular/therapy/session';
import {
  adapt,
  eyeClassesFor,
  FB_MS,
  firstRole,
  geometryFor,
  H,
  hitTest,
  nextRole,
  redClassOf,
  ringBounds,
  U,
  W,
  ZaCore,
  type Role,
} from '../../src/binokular/games/ziehen-ablegen/logic';
import { DEFAULT_ZA, normalizeZa, type ZaSettings } from '../../src/binokular/games/ziehen-ablegen/settings';
import { GAMES } from '../../src/binokular/games';
import { flashItem } from '../../src/binokular/games/common';
import { itemColor } from '../../src/binokular/vision/renderer';
import type { VisionSettings } from '../../src/binokular/vision/color';

const cfg = (p: Partial<ZaSettings> = {}): ZaSettings => normalizeZa({ ...DEFAULT_ZA, ...p });
const vis = (p: Partial<VisionSettings> = {}): VisionSettings => ({
  amblyopicEye: 'LEFT',
  glasses: 'RED_CYAN',
  leftLens: 'RED',
  amblyopicContrast: 100,
  fellowEyeContrast: 100,
  palette: paletteOf(startProfileFor('RED_CYAN')),
  ...p,
});

/** Runde per Ziehen beenden: Ball genau in den Ring (hit) oder weit daneben (miss) */
function play(c: ZaCore, hit: boolean): void {
  const f = { x: hit ? c.ring.x : c.ring.x + c.geo.R * 3, y: (hit ? c.ring.y : c.ring.y) + c.geo.offset };
  c.pointerDown(f.x - 80, f.y);
  c.step(300);
  c.pointerMove(f.x, f.y);
  c.pointerUp(f.x, f.y);
}
const next = (c: ZaCore) => c.step(FB_MS + 1);

describe('Ziehen & Ablegen: Maße und Ring', () => {
  it('Ball mindestens 22 px, Ring kräftig, Offset größer als Ballradius', () => {
    for (let lv = 1; lv <= 16; lv++) {
      const g = geometryFor(lv, DEFAULT_ZA);
      expect(g.ballR).toBeGreaterThanOrEqual(22);
      expect(g.offset).toBeGreaterThan(g.ballR + 20);
      expect(g.R).toBeGreaterThanOrEqual(34);
    }
    expect(geometryFor(16, DEFAULT_ZA).R).toBeLessThan(geometryFor(1, DEFAULT_ZA).R);
    expect(geometryFor(16, DEFAULT_ZA).speed).toBeGreaterThan(geometryFor(1, DEFAULT_ZA).speed);
    expect(geometryFor(16, DEFAULT_ZA).limitMs).toBeLessThan(geometryFor(1, DEFAULT_ZA).limitMs);
    expect(U).toBe(10);
  });

  it('Faktoren skalieren Ringgröße, Tempo und Zeitfenster', () => {
    const a = geometryFor(5, cfg({ ringScale: 100, speedScale: 100, timeScale: 100 }));
    const b = geometryFor(5, cfg({ ringScale: 150, speedScale: 70, timeScale: 150 }));
    expect(b.R).toBeCloseTo(a.R * 1.5, 5);
    expect(b.speed).toBeCloseTo(a.speed * 0.7, 5);
    expect(b.limitMs).toBeCloseTo(a.limitMs * 1.5, 5);
    expect(geometryFor(1, cfg({ offset: 120 })).offset).toBe(120);
  });

  it('Ring bleibt über viele Schritte und alle Level im Feld, Finger bleibt auf dem Bildschirm', () => {
    for (const startLevel of [1, 8, 16]) {
      const c = new ZaCore(cfg({ startLevel, rounds: 0, timeScale: 150 }), makeRng(startLevel));
      for (let i = 0; i < 4000; i++) {
        c.step(16);
        const b = ringBounds(c.geo.R, c.geo.offset);
        expect(c.ring.x).toBeGreaterThanOrEqual(b.minX - 1e-6);
        expect(c.ring.x).toBeLessThanOrEqual(b.maxX + 1e-6);
        expect(c.ring.y).toBeGreaterThanOrEqual(b.minY - 1e-6);
        expect(c.ring.y).toBeLessThanOrEqual(b.maxY + 1e-6);
        expect(c.ring.y + c.geo.offset).toBeLessThanOrEqual(H);
        expect(c.ring.x - c.geo.R).toBeGreaterThanOrEqual(0);
        expect(c.ring.x + c.geo.R).toBeLessThanOrEqual(W);
      }
    }
  });

  it('Ball (Ruheplatz) liegt im Feld und nicht im Ring', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(3));
    for (let i = 0; i < 30; i++) {
      expect(c.rest.x).toBeGreaterThanOrEqual(c.geo.ballR);
      expect(c.rest.x).toBeLessThanOrEqual(W - c.geo.ballR);
      expect(c.rest.y).toBeLessThanOrEqual(H - c.geo.ballR);
      expect(hitTest(c.rest, c.ring, c.geo.R)).toBe(false);
      play(c, false);
      next(c);
    }
  });
});

describe('Ziehen & Ablegen: Treffer, Fehler, Zeit', () => {
  it('Treffertest: Ballmitte im Ring', () => {
    expect(hitTest({ x: 100, y: 100 }, { x: 110, y: 100 }, 20)).toBe(true);
    expect(hitTest({ x: 100, y: 100 }, { x: 140, y: 100 }, 20)).toBe(false);
  });

  it('Berühren → Ball erscheint über dem Finger; Loslassen im Ring = Treffer mit Punkten', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(1));
    const fx = c.ring.x;
    const fy = c.ring.y + c.geo.offset;
    expect(c.pointerDown(fx - 100, fy)[0].type).toBe('touch');
    c.step(250);
    c.pointerMove(fx, fy);
    expect(c.ball.x).toBeCloseTo(fx, 3);
    expect(c.ball.y).toBeCloseTo(fy - c.geo.offset, 3);
    expect(c.pointerUp(fx, fy).map((e) => e.type)).toEqual(['hit']);
    expect(c.hits).toBe(1);
    expect(c.points).toBe(10);
    expect(c.phase).toBe('fb');
    next(c);
    expect(c.phase).toBe('wait');
    expect(c.rounds).toBe(1);
  });

  it('daneben = Fehler; nur Antippen zählt nicht', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(2));
    c.pointerDown(300, 300);
    expect(c.pointerUp(300, 300)).toEqual([]);
    expect(c.phase).toBe('wait');
    expect(c.rounds).toBe(0);
    play(c, false);
    expect(c.misses).toBe(1);
    expect(c.outcome).toBe('miss');
    expect(c.points).toBe(0);
  });

  it('Zeitfenster: zu spät = Fehler (auch beim Ziehen), Pause zählt nicht', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(4));
    const lim = c.geo.limitMs;
    c.step(lim - 10);
    expect(c.phase).toBe('wait');
    expect(c.step(20).map((e) => e.type)).toEqual(['late']);
    expect(c.late).toBe(1);
    expect(c.misses).toBe(1);
    next(c);
    c.pointerDown(100, 400);
    c.step(c.geo.limitMs + 1);
    expect(c.outcome).toBe('late');
    expect(c.pointerUp(100, 400)).toEqual([]);
    expect(c.durations.every((d) => d <= lim + 1)).toBe(true);
  });

  it('Abbruch des Ziehens (Pause) lässt die Runde offen', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(5));
    c.pointerDown(100, 400);
    c.cancelDrag();
    expect(c.phase).toBe('wait');
  });

  it('Tastatur: Ablegen erst nach Bewegung, Wertung am Ballplatz', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(6));
    expect(c.keyDrop()).toEqual([]);
    c.keyMove(1, 0, 0.1);
    const x0 = c.rest.x;
    c.keyMove(0, 1, 0.1);
    expect(c.rest.x).toBe(x0);
    expect(c.keyDrop().length).toBe(1);
    expect(c.rounds).toBe(1);
  });
});

describe('Ziehen & Ablegen: Level', () => {
  it('3 Treffer in Folge hoch, 2 Fehler in Folge runter, Grenzen 1–16', () => {
    let a = { level: 5, hitStreak: 0, missStreak: 0 };
    a = adapt(a, true);
    a = adapt(a, true);
    expect(a.level).toBe(5);
    a = adapt(a, true);
    expect(a.level).toBe(6);
    a = adapt(a, false);
    a = adapt(a, true); // Reihe unterbrochen
    a = adapt(a, false);
    expect(a.level).toBe(6);
    a = adapt(a, false);
    expect(a.level).toBe(5);
    let lo = { level: 1, hitStreak: 0, missStreak: 0 };
    for (let i = 0; i < 6; i++) lo = adapt(lo, false);
    expect(lo.level).toBe(1);
    let hi = { level: 16, hitStreak: 0, missStreak: 0 };
    for (let i = 0; i < 9; i++) hi = adapt(hi, true);
    expect(hi.level).toBe(16);
  });

  it('Spielkern: Level steigt nach 3 Treffern, sinkt nach 2 Fehlern; Höchstlevel und Punkte nach Level', () => {
    const c = new ZaCore(cfg({ rounds: 0, startLevel: 3 }), makeRng(7));
    for (let i = 0; i < 3; i++) {
      play(c, true);
      next(c);
    }
    expect(c.level).toBe(4);
    expect(c.maxLevel).toBe(4);
    play(c, true);
    expect(c.points).toBeGreaterThan(30);
    next(c);
    play(c, false);
    next(c);
    play(c, false);
    next(c);
    expect(c.level).toBe(3);
    expect(c.maxLevel).toBe(4);
  });
});

describe('Ziehen & Ablegen: Rollen', () => {
  it('feste Rollen', () => {
    const r = makeRng(1);
    expect(firstRole('RED_BALL', r)).toBe('BALL_RED');
    expect(firstRole('SECOND_BALL', r)).toBe('BALL_SECOND');
    expect(nextRole('RED_BALL', 'BALL_RED')).toBe('BALL_RED');
    expect(nextRole('SECOND_BALL', 'BALL_SECOND')).toBe('BALL_SECOND');
  });

  it('wechselnd: Start aus dem Seed, danach nach jeder Runde getauscht; beide Startrollen kommen vor', () => {
    const starts = new Set<Role>();
    for (let s = 0; s < 40; s++) starts.add(firstRole('ALTERNATE', makeRng(s)));
    expect(starts.size).toBe(2);
    expect(firstRole('ALTERNATE', makeRng(9))).toBe(firstRole('ALTERNATE', makeRng(9)));
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(9));
    const seq: Role[] = [c.role];
    for (let i = 0; i < 5; i++) {
      play(c, i % 2 === 0);
      next(c);
      seq.push(c.role);
    }
    for (let i = 1; i < seq.length; i++) expect(seq[i]).not.toBe(seq[i - 1]);
    expect(c.roleSwaps).toBe(5);
  });

  it('feste Rolle: kein Wechsel', () => {
    const c = new ZaCore(cfg({ rounds: 0, roles: 'RED_BALL' }), makeRng(2));
    for (let i = 0; i < 4; i++) {
      play(c, true);
      next(c);
    }
    expect(c.role).toBe('BALL_RED');
    expect(c.roleSwaps).toBe(0);
  });

  it('Ball und Ring gehören immer verschiedenen Augenklassen; Rot bestimmt das Profil', () => {
    for (const amb of ['LEFT', 'RIGHT'] as const)
      for (const lens of ['RED', 'OTHER'] as const) {
        const v = vis({ amblyopicEye: amb, leftLens: lens });
        const red = redClassOf(v);
        // amblyopes Auge links + linkes Glas rot → rot sieht das amblyope Auge
        expect(red).toBe((amb === 'LEFT') === (lens === 'RED') ? 'AMBLYOPIC' : 'FELLOW');
        for (const role of ['BALL_RED', 'BALL_SECOND'] as const) {
          const k = eyeClassesFor(role, red);
          expect(k.ball).not.toBe(k.ring);
          expect(['AMBLYOPIC', 'FELLOW']).toContain(k.ball);
          const ballColor = itemColor({ shape: { t: 'disc', x: 0, y: 0, r: 30 }, eye: k.ball, k: 1 }, v);
          const ringColor = itemColor({ shape: { t: 'ring', x: 0, y: 0, r: 30, w: 14 }, eye: k.ring, k: 1 }, v);
          const redRgb = v.palette.red;
          const isRed = (c: { r: number; g: number; b: number }) => c.r === redRgb.r && c.g === redRgb.g && c.b === redRgb.b;
          expect(isRed(role === 'BALL_RED' ? ballColor : ringColor)).toBe(true);
          expect(isRed(role === 'BALL_RED' ? ringColor : ballColor)).toBe(false);
        }
      }
  });
});

describe('Ziehen & Ablegen: Feedback und Ergebnis', () => {
  it('Rückmelde-Rahmen ist grau (BOTH, R = G = B)', () => {
    const v = vis();
    for (const age of [0, 100, 250]) {
      const it = flashItem(age, W, H, 8);
      expect(it).not.toBeNull();
      expect(it!.eye).toBe('BOTH');
      const col = itemColor(it!, v);
      expect(col.r).toBe(col.g);
      expect(col.g).toBe(col.b);
      expect(col.r).toBeGreaterThanOrEqual(0x77);
      expect(col.r).toBeLessThanOrEqual(0x88);
    }
  });

  it('Spielende nach N Runden, Zusammenfassung mit allen Feldern', () => {
    const c = new ZaCore(cfg({ rounds: 4, roles: 'ALTERNATE' }), makeRng(11));
    const evs: string[] = [];
    for (let i = 0; i < 4; i++) {
      play(c, i !== 2);
      evs.push(...c.step(FB_MS + 1).map((e) => e.type));
    }
    expect(evs).toContain('end');
    expect(c.phase).toBe('done');
    const s = c.summary();
    expect(s.completed).toBe(true);
    expect(s.points).toBeGreaterThan(0);
    expect(s.errors).toBe(1);
    expect(s.colorChanges).toBe(3);
    expect(s.details).toMatchObject({ hits: 3, misses: 1, rounds: 4, maxLevel: 1, roleSwaps: 3, targetRounds: 4 });
    expect(s.details.avgRoundMs).toBeGreaterThan(0);
    for (const v of Object.values(s.details)) expect(Number.isFinite(v)).toBe(true);
  });

  it('unbegrenzt (0): nie fertig; unvollständige Session nicht abgeschlossen', () => {
    const c = new ZaCore(cfg({ rounds: 0 }), makeRng(12));
    for (let i = 0; i < 25; i++) {
      play(c, true);
      next(c);
    }
    expect(c.phase).toBe('wait');
    expect(c.summary().completed).toBe(false);
  });

  it('Ergebniszeilen und CSV-Zeile', () => {
    const c = new ZaCore(cfg({ rounds: 2 }), makeRng(13));
    play(c, true);
    next(c);
    play(c, false);
    next(c);
    const sum = c.summary();
    const rows = GAMES['ziehen-ablegen'].rows(sum);
    expect(rows.map((r) => r.label)).toContain('Höchstes Level');
    expect(rows.find((r) => r.label === 'Runden')?.value).toBe('2');
    const rec = {
      id: 's1', gameId: 'ziehen-ablegen', patientId: 'x', date: '2026-01-01', startTime: '10:00', startedAt: '2026-01-01T10:00:00Z',
      durationMs: 60000, activeMs: 60000, pauseMs: 0, pauses: 0, points: sum.points, errors: sum.errors, colorChanges: sum.colorChanges,
      completed: true, details: sum.details, amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED', endReason: 'goal',
    };
    const n = normalizeSession(rec);
    expect(n?.gameId).toBe('ziehen-ablegen');
    expect(n?.details.hits).toBe(1);
    const row = sessionRow(n!);
    expect(row[2]).toBe('Ziehen & Ablegen');
    expect(row.join(';')).toContain('hits=1');
  });
});

describe('Ziehen & Ablegen: Einstellungen', () => {
  it('Standardwerte und strenge Prüfung', () => {
    expect(normalizeZa(undefined)).toEqual(DEFAULT_ZA);
    expect(DEFAULT_ZA.roles).toBe('ALTERNATE');
    expect(DEFAULT_ZA.rounds).toBe(20);
    expect(normalizeZa({ startLevel: 99, roles: 'x', rounds: -4, ringScale: 10, speedScale: 999, timeScale: 'a', offset: 5 })).toEqual({
      startLevel: 16,
      roles: 'ALTERNATE',
      rounds: 0,
      ringScale: 70,
      speedScale: 150,
      timeScale: 100,
      offset: 40,
    });
    expect(normalizeZa({ startLevel: 0 }).startLevel).toBe(1);
    expect(normalizeZa({ offset: 999 }).offset).toBe(200);
    expect(normalizeZa({ roles: 'SECOND_BALL', rounds: 7.4 })).toMatchObject({ roles: 'SECOND_BALL', rounds: 7 });
    expect(normalizeZa({ ringScale: 97 }).ringScale).toBe(95);
  });

  it('Speicher: alte Stände ohne Eintrag laden mit Standard, Werte bleiben erhalten', () => {
    const old = normalizeStore({ games: { pong: { targetScore: 3 } } });
    expect(old.games['ziehen-ablegen']).toEqual(DEFAULT_ZA);
    expect(old.games.pong.targetScore).toBe(3);
    expect(defaultGameSettings()['ziehen-ablegen']).toEqual(DEFAULT_ZA);
    expect(normalizeGameSettings({ 'ziehen-ablegen': { rounds: 5 } })['ziehen-ablegen'].rounds).toBe(5);
  });
});
