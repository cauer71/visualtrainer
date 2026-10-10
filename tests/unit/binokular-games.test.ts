/**
 * Rahmen der Spiele: Register und Schnittstelle, Farbregeln (Spielcode ohne feste Farben, Rückmeldung nur grau),
 * Migration alter Speicherstände, keine Reste des früheren Spiels, Textregeln.
 */
import { describe, expect, it } from 'vitest';
import { paletteOf, startProfileFor } from '../../src/binokular/calibration/profiles';
import { defaultStore, loadStore, normalizeStore, STORAGE_KEY, type KeyValue } from '../../src/binokular/data/storage';
import { GAME_IDS, GAMES } from '../../src/binokular/games';
import { FLASH_MS, flashItem, makeRng, randomSeed } from '../../src/binokular/games/common';
import { NEUTRAL_LEVEL, NEUTRAL_MIN, resolveColor, type VisionSettings } from '../../src/binokular/vision/color';
import { itemColor } from '../../src/binokular/vision/renderer';
import { SAFETY_NOTICE, t } from '../../src/binokular/texts';

// Quelltexte als Rohtext einlesen (ohne Node-Typen)
const raw = (m: Record<string, unknown>) => m as Record<string, string>;
const src = raw(import.meta.glob('../../src/binokular/**/*.{ts,tsx,css}', { query: '?raw', import: 'default', eager: true }));
const tests = raw(import.meta.glob('./binokular-*.test.ts', { query: '?raw', import: 'default', eager: true }));
const e2e = raw(import.meta.glob('../e2e/binokular.mjs', { query: '?raw', import: 'default', eager: true }));
const gameSources = Object.entries(src).filter(([f]) => f.includes('/games/') && f.endsWith('.ts'));

/** Verbotene Wörter (zusammengesetzt, damit sie hier selbst nicht im Klartext stehen) */
const BANNED = new RegExp(['Dig' + ' Rush', 'Ubi' + 'soft', 'cf' + 'at_', 'cf' + 'ast_', '\\bOp' + 'us\\b', '\\bSon' + 'net\\b', '\\bFab' + 'le\\b', '\\bHai' + 'ku\\b'].join('|'));
const vis = (glasses: 'RED_CYAN' | 'RED_GREEN'): VisionSettings => ({ amblyopicEye: 'LEFT', glasses, leftLens: 'RED', amblyopicContrast: 100, fellowEyeContrast: 100, palette: paletteOf(startProfileFor(glasses)) });

describe('Spielregister', () => {
  it('drei Spiele mit gemeinsamer Schnittstelle', () => {
    expect(GAME_IDS).toEqual(['nachzeichnen', 'pong', 'ziehen-ablegen']);
    for (const id of GAME_IDS) {
      const m = GAMES[id];
      expect(m.id).toBe(id);
      expect(m.title.length).toBeGreaterThan(3);
      expect(typeof m.create).toBe('function');
      expect(typeof m.normalize).toBe('function');
      expect(m.normalize(undefined)).toEqual(m.defaults);
      expect(m.normalize(m.defaults)).toEqual(m.defaults);
      expect(m.rows({ points: 1, errors: 0, colorChanges: 2, details: {}, completed: true }).length).toBeGreaterThan(2);
    }
    expect(GAMES.nachzeichnen.title).toBe('Nachzeichnen');
    expect(GAMES.pong.title).toBe('Farbwechsel-Pong');
  });
  it('Spielfeld: Nachzeichnen Querformat 1280×720, Pong Hochformat 720×1280', () => {
    expect(GAMES.nachzeichnen.design).toEqual({ w: 1280, h: 720 });
    expect(GAMES.pong.design).toEqual({ w: 720, h: 1280 });
  });
  it('seedbarer Zufall: gleicher Seed → gleiche Folge; Werte in [0, 1)', () => {
    const a = makeRng(5);
    const b = makeRng(5);
    for (let i = 0; i < 50; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v >= 0 && v < 1).toBe(true);
    }
    expect(Number.isInteger(randomSeed())).toBe(true);
  });
});

describe('Farbregeln', () => {
  it('Rückmeldung (Aufblitz-Rahmen) ist ein BOTH-Objekt und grau (#777–#888), nie Rot oder Zweitfarbe', () => {
    for (const g of ['RED_CYAN', 'RED_GREEN'] as const) {
      const v = vis(g);
      for (const age of [0, FLASH_MS / 3, FLASH_MS - 1]) {
        const it = flashItem(age, 720, 1280)!;
        expect(it.eye).toBe('BOTH');
        const c = itemColor(it, v);
        expect(c.r).toBe(c.g);
        expect(c.g).toBe(c.b);
      }
      // volle Stärke genau im Bereich #777–#888
      const full = resolveColor('BOTH', 1, v);
      expect(full.r).toBeGreaterThanOrEqual(NEUTRAL_MIN);
      expect(full.r).toBeLessThanOrEqual(NEUTRAL_LEVEL);
    }
    expect(flashItem(FLASH_MS, 10, 10)).toBeNull();
    expect(flashItem(-1, 10, 10)).toBeNull();
  });
  it('Spielcode enthält keine festen Farben (nur über vision/color und das Profil)', () => {
    expect(gameSources.length).toBeGreaterThan(8);
    for (const [f, source] of gameSources) {
      const text = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
      expect(text, f).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(text, f).not.toMatch(/\brgba?\(/);
      expect(text, f).not.toMatch(/['"`](red|green|blue|cyan|white|black|gr[ae]y)['"`]/i);
      expect(text, f).not.toMatch(/fillStyle|strokeStyle/);
    }
  });
  it('Spiele nutzen den gemeinsamen Renderer (Augenobjekte über eye, graue über BOTH)', () => {
    for (const f of ['/games/nachzeichnen/index.ts', '/games/pong/index.ts']) {
      const text = Object.entries(src).find(([k]) => k.endsWith(f))![1];
      expect(text).toContain("eye: 'BOTH'");
      expect(text).toMatch(/eye: (this\.sched\.eye|s\.eye)/);
      expect(text).toContain('flashItem');
    }
  });
});

describe('Migration alter Speicherstände (Grabungsspiel entfernt)', () => {
  const old = {
    version: 1,
    settings: {
      patientId: 'K-1',
      amblyopicEye: 'RIGHT',
      leftLens: 'OTHER',
      amblyopicContrast: 80,
      fellowEyeContrast: 31.5,
      startFellowEyeContrast: 20,
      adaptiveContrast: true,
      contrastMode: 'LINEAR',
      sessionMinutes: 45,
      maxLevelMinutes: 5,
      objectSizePercent: 120,
      difficulty: 'HARD',
      suppressionChecks: true,
      debugMode: true,
      soundOn: false,
      soundVolume: 'HIGH',
    },
    calibration: { results: { leftEye: 'left' }, completedAt: '2026-10-05T10:00:00.000Z' },
    sessions: [{ id: 's1', date: '2026-10-05', startTime: '10:00', activeMs: 60000, durationMs: 70000, attempts: [], levelsPlayed: 3, stars: 7, fellowContrastEnd: 25 }],
    pin: '4711',
    progress: { level: 4, unlocked: 5, bestStars: { level01: 3 }, consecutiveFailures: 1 },
    activeSession: { id: 's2', date: '2026-10-06', activeMs: 5, attempts: [] },
    audio: { on: true, volume: 'LOW' },
  };
  it('alter Speicherstand lädt ohne Fehler; Wichtiges bleibt, Unbekanntes entfällt', () => {
    expect(() => normalizeStore(old)).not.toThrow();
    const s = normalizeStore(old);
    expect(s.settings.patientId).toBe('K-1');
    expect(s.settings.amblyopicEye).toBe('RIGHT');
    expect(s.settings.leftLens).toBe('OTHER');
    expect(s.settings.amblyopicContrast).toBe(80);
    expect(s.settings.fellowEyeContrast).toBe(31.5);
    expect(s.settings.soundOn).toBe(false);
    expect(s.pin).toBe('4711');
    expect(s.audio).toEqual({ on: true, volume: 'LOW' });
    expect(s.sessions).toEqual([]);
    expect(s.games).toEqual(defaultStore().games);
    const json = JSON.stringify(s);
    for (const gone of ['progress', 'activeSession', 'adaptiveContrast', 'contrastMode', 'maxLevelMinutes', 'objectSizePercent', 'difficulty', 'suppressionChecks', 'startFellowEyeContrast', 'sessionMinutes', 'bestStars', 'attempts']) {
      expect(json, gone).not.toContain(`"${gone}"`);
    }
  });
  it('über localStorage: laden, speichern, erneut laden', () => {
    const mem = new Map<string, string>([[STORAGE_KEY, JSON.stringify(old)]]);
    const kv: KeyValue = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v), removeItem: (k) => void mem.delete(k) };
    const s = loadStore(kv);
    expect(s.settings.debugMode).toBe(true);
    kv.setItem(STORAGE_KEY, JSON.stringify(s));
    expect(loadStore(kv)).toEqual(s);
  });
  it('kaputte Teile: Standardwerte', () => {
    const s = normalizeStore({ settings: 5, games: { nachzeichnen: 'x', pong: [] }, sessions: 'nein', calibration: 7, profiles: 'x', pin: 12 });
    expect(s.games).toEqual(defaultStore().games);
    expect(s.sessions).toEqual([]);
    expect(s.pin).toBe('726');
  });
  it('neue Sessions werden gespeichert und überstehen das Laden', () => {
    const st = defaultStore();
    st.sessions.push({
      id: 'sx',
      gameId: 'pong',
      patientId: '',
      date: '2026-10-10',
      startTime: '09:00',
      startedAt: '2026-10-10T07:00:00.000Z',
      durationMs: 1000,
      activeMs: 1000,
      pauseMs: 0,
      pauses: 0,
      points: 7,
      errors: 2,
      colorChanges: 30,
      completed: true,
      details: { opponent: 2 },
      amblyopicContrast: 100,
      fellowEyeContrast: 20,
      amblyopicEye: 'LEFT',
      glasses: 'RED_CYAN',
      leftLens: 'RED',
      endReason: 'score',
    });
    expect(normalizeStore(JSON.parse(JSON.stringify(st))).sessions).toEqual(st.sessions);
  });
});

describe('Texte und Reste des früheren Spiels', () => {
  const all = Object.entries(src);
  it('Produktname neutral', () => {
    expect(t.appName).toBe('Binokular – Sehspiele');
    expect(t.pageTitle).toBe('Binokular – Sehspiele');
  });
  it('keine Reste des Grabungsspiels in Code, Texten und Stil', () => {
    for (const [f, text] of all) {
      expect(text, f).not.toMatch(/Binocular Mine|Kristall|Roboter|Levelauswahl|levelSelect|LevelSelect|game\/engine|game\/solver|\.\.\/levels/);
      expect(text, f).not.toMatch(BANNED);
    }
  });
  it('keine Namen von Modellen, Spielen oder Zugangsdaten in Quellen und Tests', () => {
    for (const [f, text] of [...all, ...Object.entries(tests), ...Object.entries(e2e)]) expect(text, f).not.toMatch(BANNED);
  });
  it('Pflichthinweis vorhanden; Texte ohne medizinische Wirkungsversprechen', () => {
    expect(SAFETY_NOTICE).toContain('Forschungs-/Trainingsprototyp');
    const blob = JSON.stringify(t, (_k, v) => (typeof v === 'function' ? v('x', 'y', 'z', 'w') : v));
    expect(blob).not.toMatch(/heilt|Heilung|therapiert|wirksam|Wirksamkeit|verbessert die Sehkraft|diagnostizier|Diagnose:/i);
  });
  it('Spieltexte vorhanden und deutsch', () => {
    expect(t.nach.newPath).toBe('Neuer Pfad');
    expect(t.nach.clearLine).toBe('Linie löschen');
    expect(t.resume).toBe('Weiter');
    expect(t.endGame).toBe('Beenden');
  });
});
