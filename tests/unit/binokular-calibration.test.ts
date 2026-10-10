/**
 * Foto-Kalibrierung (photometry), Feinabstimmung (tuning), Farbprofile (profiles), Speicher-Migration und
 * Export/Import der Einstellungen mit Profilen.
 */
import { describe, expect, it } from 'vitest';
import {
  boxSize,
  candidatesFor,
  chooseCandidate,
  CLIP_RAW,
  compensate,
  computeColors,
  crosstalkOf,
  evaluateGlass,
  isOverexposed,
  luminance,
  rateCrosstalk,
  sampleBox,
  type Channels,
  type ImageLike,
} from '../../src/binokular/calibration/photometry';
import {
  cleanProfileName,
  exportProfiles,
  importProfiles,
  isStartProfile,
  makeProfile,
  mergeProfiles,
  normalizeProfile,
  normalizeProfiles,
  paletteOf,
  START_PROFILES,
  startProfileFor,
} from '../../src/binokular/calibration/profiles';
import { paletteFromTuning, tuningFromPalette } from '../../src/binokular/calibration/tuning';
import { DEFAULT_CALIBRATION } from '../../src/binokular/calibration/calibration';
import { DEFAULT_SETTINGS } from '../../src/binokular/data/settings';
import { activeProfile, defaultGameSettings, defaultStore, glassesOf, loadStore, normalizeStore, saveStore, STORAGE_KEY, type KeyValue } from '../../src/binokular/data/storage';
import { exportSettings, importSettings } from '../../src/binokular/data/transfer';
import { srgbToLinear, toHex, type RGB } from '../../src/binokular/vision/color';

/** Bild mit Rechtecken in festen Farben (RGBA) */
function image(w: number, h: number, bg: RGB, rects: { x: number; y: number; w: number; h: number; c: RGB }[]): ImageLike {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const r = rects.find((q) => x >= q.x && x < q.x + q.w && y >= q.y && y < q.y + q.h);
      const c = r ? r.c : bg;
      const i = (y * w + x) * 4;
      data[i] = c.r;
      data[i + 1] = c.g;
      data[i + 2] = c.b;
      data[i + 3] = 255;
    }
  return { data, width: w, height: h };
}

/** Messbild-Foto: fünf Felder (Weiß, Rot, Grün, Blau, Schwarz) in den angegebenen Kamerafarben */
function photo(fields: RGB[]): { img: ImageLike; centers: [number, number][] } {
  const rects = fields.map((c, i) => ({ x: 40 + i * 120, y: 100, w: 100, h: 100, c }));
  return { img: image(640, 300, { r: 2, g: 2, b: 2 }, rects), centers: rects.map((r) => [r.x + 50, r.y + 50]) };
}

const rgb = (r: number, g: number, b: number): RGB => ({ r, g, b });

/** typische Rot-Cyan-Messung: Cyanglas lässt Blau gut durch, Rotglas lässt viel Grün durch */
const RED_PHOTO = [rgb(190, 20, 20), rgb(180, 5, 5), rgb(80, 12, 10), rgb(25, 5, 10), rgb(4, 4, 4)];
const CYAN_PHOTO = [rgb(20, 200, 210), rgb(6, 8, 8), rgb(10, 170, 90), rgb(8, 60, 200), rgb(4, 4, 4)];

function measure(fields: RGB[]): Channels {
  const p = photo(fields);
  const m = evaluateGlass(p.centers.map(([x, y]) => sampleBox(p.img, x, y)));
  if (!m) throw new Error('keine Messung');
  return m.values;
}

describe('Foto auswerten (Box, sRGB → linear, Y, Schwarz)', () => {
  it('Boxgröße ≈ 2,4 % der kürzeren Bildseite', () => {
    expect(boxSize(4000, 3000)).toBe(72);
    expect(boxSize(640, 300)).toBe(7);
    expect(boxSize(10, 10)).toBe(1);
  });
  it('mittelt in linearem Licht (nicht die Rohwerte) und bleibt im Bild', () => {
    // Schachbrett aus 0 und 255: Mittel der Rohwerte 127,5, linear 0,5
    const w = 100;
    const data = new Uint8ClampedArray(w * w * 4);
    for (let i = 0; i < w * w; i++) {
      const v = ((i % w) + Math.floor(i / w)) % 2 ? 255 : 0;
      data.set([v, v, v, 255], i * 4);
    }
    const s = sampleBox({ data, width: w, height: w }, 50, 50);
    expect(s.w).toBe(2);
    expect(s.linear.r).toBeCloseTo(0.5, 6);
    expect(s.raw.r).toBeCloseTo(127.5, 6);
    expect(s.Y).toBeCloseTo(0.5, 6);
    const edge = sampleBox({ data, width: w, height: w }, 0, 99);
    expect(edge.x0).toBe(0);
    expect(edge.y0 + edge.h).toBeLessThanOrEqual(100);
  });
  it('Y = 0,2126 R + 0,7152 G + 0,0722 B (linear), Schwarz abgezogen', () => {
    expect(luminance(1, 1, 1)).toBeCloseTo(1, 10);
    const a = measure(RED_PHOTO);
    const black = luminance(srgbToLinear(4), srgbToLinear(4), srgbToLinear(4));
    expect(a.R).toBeCloseTo(luminance(srgbToLinear(180), srgbToLinear(5), srgbToLinear(5)) - black, 8);
    expect(a.G).toBeGreaterThan(a.B);
    expect(evaluateGlass([])).toBeNull();
  });
  it('Überbelichtung: Rohwert ≥ 250 (außer Schwarz) bzw. viele ausgefressene Pixel', () => {
    const p = photo([rgb(255, 252, 251), rgb(240, 10, 10), rgb(10, 10, 10), rgb(10, 10, 10), rgb(255, 255, 255)]);
    const samples = p.centers.map(([x, y]) => sampleBox(p.img, x, y));
    expect(isOverexposed(samples[0], 'white')).toBe(true);
    expect(isOverexposed(samples[1], 'red')).toBe(false);
    expect(isOverexposed(samples[4], 'black')).toBe(false);
    expect(evaluateGlass(samples)?.overexposed).toEqual(['white']);
    expect(CLIP_RAW).toBe(250);
  });
});

describe('Berechnung der Zweitfarbe und des Hintergrunds', () => {
  it('Rot-Cyan: 9 Kandidaten mit max(g, b) = 1', () => {
    const list = candidatesFor('RED_CYAN', { R: 1, G: 0.1, B: 0.01 }, { R: 0.01, G: 0.3, B: 0.07 });
    expect(list).toHaveLength(9);
    for (const c of list) expect(Math.max(c.g, c.b)).toBe(1);
  });
  it('typische Rot-Cyan-Brille (Rotglas lässt viel Grün durch, Cyanglas Blau gut): Ergebnis ist reines Blau', () => {
    const a = measure(RED_PHOTO);
    const c = measure(CYAN_PHOTO);
    const r = computeColors('RED_CYAN', a, c, startProfileFor('RED_CYAN').background);
    expect(r.candidates[r.chosen]).toMatchObject({ g: 0, b: 1 });
    expect(toHex(r.second)).toBe('#0000FF');
    expect(r.fallback).toBe(false);
    // Hintergrund dunkel, mit Rot- und Blauanteil, ohne Grün
    expect(r.background.g).toBe(0);
    expect(r.background.r).toBeGreaterThan(0);
    expect(r.background.b).toBeGreaterThan(0);
    expect(Math.max(r.background.r, r.background.b)).toBeLessThan(80);
    // Übersprechen: Rotglas lässt Grün deutlich durch (schwierig), Cyanglas kaum Rot
    expect(rateCrosstalk(r.crosstalk.redGlassGreen)).toBe('hard');
    expect(r.crosstalk.secondGlassRed).toBeLessThan(0.01);
  });
  it('85-%-Regel: unter den fast besten Verhältnissen gewinnt das größte C', () => {
    const list = [
      { g: 1, b: 0, L: 1, C: 10, ratio: 10 },
      { g: 1, b: 0.5, L: 2, C: 18, ratio: 9 },
      { g: 0, b: 1, L: 1, C: 8, ratio: 8 },
    ];
    expect(chooseCandidate(list)).toBe(1);
    expect(chooseCandidate([])).toBe(-1);
    expect(chooseCandidate([{ g: 0, b: 1, L: 0, C: 1, ratio: Infinity }, { g: 1, b: 0, L: 1, C: 5, ratio: 5 }])).toBe(0);
  });
  it('Hintergrund-Kompensation erfüllt beide Gleichungen', () => {
    const a = { R: 0.2, G: 0.02, B: 0.002 };
    const c = { R: 0.002, G: 0.25, B: 0.06 };
    const L = a.B;
    const C = c.B;
    const k = compensate(a, c, { L, C });
    expect(k.ok).toBe(true);
    expect(a.R * k.r + L * k.t).toBeCloseTo(L, 10);
    expect(c.R * k.r + C * k.t).toBeCloseTo(c.R, 10);
  });
  it('det ≤ 0 oder nicht endlich → Startwert, gemeldet', () => {
    const start = startProfileFor('RED_CYAN').background;
    const r = computeColors('RED_CYAN', { R: 0, G: 0, B: 0 }, { R: 0, G: 0, B: 0 }, start);
    expect(r.fallback).toBe(true);
    expect(r.background).toEqual(start);
    expect(compensate({ R: 0.1, G: 0.1, B: 0.1 }, { R: 0.1, G: 0.1, B: 0.1 }, { L: 0.1, C: 0.1 }).ok).toBe(false);
    expect(compensate({ R: NaN, G: 0, B: 0 }, { R: 0, G: 1, B: 1 }, { L: 0, C: 1 }).ok).toBe(false);
  });
  it('r und t werden auf ≥ 0 begrenzt', () => {
    // Rotglas lässt die Zweitfarbe heller durch als Rot (L > a_R) → t wäre negativ, r größer als 1
    const k = compensate({ R: 0.2, G: 0.25, B: 0.25 }, { R: 0.01, G: 0.3, B: 0.1 }, { L: 0.25, C: 0.3 });
    expect(k.ok).toBe(true);
    expect(k.r).toBeGreaterThanOrEqual(0);
    expect(k.t).toBeGreaterThanOrEqual(0);
    expect(k.clamped).toBe(true);
  });
  it('Rot-Grün: b = 0, g wählbar (Start 0,30 linear ≈ #009600)', () => {
    const a = { R: 0.2, G: 0.01, B: 0.001 };
    const c = { R: 0.003, G: 0.3, B: 0.02 };
    const r = computeColors('RED_GREEN', a, c, startProfileFor('RED_GREEN').background);
    expect(r.candidates).toHaveLength(1);
    expect(r.candidates[0]).toMatchObject({ g: 0.3, b: 0 });
    expect(r.second.b).toBe(0);
    expect(Math.abs(r.second.g - 0x96)).toBeLessThanOrEqual(1);
    expect(r.background.b).toBe(0);
    const r2 = computeColors('RED_GREEN', a, c, startProfileFor('RED_GREEN').background, 0.6);
    expect(r2.second.g).toBeGreaterThan(r.second.g);
  });
  it('Übersprechen in Prozent und Bewertung', () => {
    const x = crosstalkOf({ R: 1, G: 0.004, B: 0.03 }, { R: 0.08, G: 1, B: 0.5 });
    expect(x.redGlassGreen).toBeCloseTo(0.004);
    expect(x.redGlassBlue).toBeCloseTo(0.03);
    expect(x.secondGlassRed).toBeCloseTo(0.08);
    expect([rateCrosstalk(0.004), rateCrosstalk(0.03), rateCrosstalk(0.08), rateCrosstalk(Infinity)]).toEqual(['good', 'ok', 'hard', 'hard']);
  });
});

describe('Feinabstimmung (Regler ↔ Palette)', () => {
  it('Startprofile bleiben beim Öffnen unverändert', () => {
    for (const p of START_PROFILES) expect(paletteFromTuning(tuningFromPalette(paletteOf(p), p.mode))).toEqual(paletteOf(p));
  });
  it('Regler wirken: Hintergrund rot, Hintergrund Zweitfarbe (im Verhältnis der Zweitfarbe), Helligkeit, Rotwert', () => {
    const t0 = tuningFromPalette(paletteOf(startProfileFor('RED_CYAN')), 'RED_CYAN');
    const p = paletteFromTuning({ ...t0, bgRed: 40, bgSecond: 30, secondLevel: 50, redValue: 200 });
    expect(p.background).toEqual({ r: 40, g: 0, b: 30 });
    expect(srgbToLinear(p.second.b)).toBeCloseTo(0.5, 2);
    expect(p.red).toEqual({ r: 200, g: 0, b: 0 });
    // gemischte Zweitfarbe: der Hintergrund folgt dem Verhältnis (linear)
    const mixed = tuningFromPalette({ red: rgb(255, 0, 0), second: rgb(0, 137, 255), background: rgb(20, 0, 0) }, 'RED_CYAN');
    const q = paletteFromTuning({ ...mixed, bgSecond: 40 });
    expect(q.background.b).toBe(40);
    expect(srgbToLinear(q.background.g) / srgbToLinear(q.background.b)).toBeCloseTo(srgbToLinear(137) / 1, 1);
    // Grenzen
    const lim = paletteFromTuning({ ...t0, bgRed: 999, bgSecond: -5, redValue: 3 });
    expect(lim.background.r).toBe(70);
    expect(lim.background.b).toBe(0);
    expect(lim.red.r).toBe(80);
  });
});

describe('Farbprofile', () => {
  it('Startprofile immer vorhanden, nicht überschreibbar; eigene geprüft und ohne Doppelte', () => {
    const list = normalizeProfiles([
      { id: 'start-red-cyan', name: 'Fälschung', mode: 'RED_CYAN', red: '#00ff00', second: '#ff0000', background: '#ffffff' },
      { id: 'p-1', name: '  Brille  A ', mode: 'RED_CYAN', red: '#ff0000', second: '#0040ff', background: '#190033', createdAt: '2026-10-01T08:00:00Z', source: 'photo', measurement: { a: { R: 0.1, G: 0.01, B: 0.002 }, c: { R: 0.001, G: 0.2, B: 0.07 } } },
      { id: 'p-1', name: 'doppelt', mode: 'RED_CYAN' },
      { id: 'p-2', name: 'kaputt', mode: 'BLAU' },
      { id: '<script>', name: 'x', mode: 'RED_CYAN' },
      'quatsch',
    ]);
    expect(list.map((p) => p.id)).toEqual(['start-red-cyan', 'start-red-green', 'p-1']);
    expect(list[0]).toEqual(START_PROFILES[0]);
    expect(list[2].name).toBe('Brille A');
    expect(toHex(list[2].second)).toBe('#0040FF');
    expect(list[2].measurement?.c.B).toBe(0.07);
    expect(list[2].createdAt).toBe('2026-10-01T08:00:00.000Z');
    expect(isStartProfile('start-red-green')).toBe(true);
  });
  it('Felder werden einzeln normalisiert (Hintergrund dunkel begrenzt, ungültige Messung verworfen)', () => {
    const p = normalizeProfile({ id: 'p-3', name: '<b>Neu</b>', mode: 'RED_GREEN', red: { r: 300, g: 0, b: 0 }, second: 'grün', background: { r: 255, g: 255, b: 255 }, source: 'hack', measurement: { a: { R: -1, G: 0, B: 0 } } });
    expect(p).not.toBeNull();
    expect(p?.name).toBe('bNeu/b');
    expect(p?.red).toEqual({ r: 255, g: 0, b: 0 });
    expect(p?.second).toEqual(startProfileFor('RED_GREEN').second);
    expect(Math.max(p!.background.r, p!.background.g, p!.background.b)).toBeLessThanOrEqual(100);
    expect(p?.source).toBe('manual');
    expect(p?.measurement).toBeUndefined();
    expect(cleanProfileName('a'.repeat(80))).toHaveLength(40);
  });
  it('Export/Import als JSON: nur eigene Profile, Rundreise, Fehler erkannt', () => {
    const own = makeProfile('Brille B', 'RED_GREEN', { red: rgb(250, 0, 0), second: rgb(0, 140, 0), background: rgb(40, 20, 0) }, 'manual', undefined, 'p-abc', new Date('2026-10-09T12:00:00Z'));
    const list = normalizeProfiles([own]);
    const text = exportProfiles(list);
    expect(JSON.parse(text).profiles).toHaveLength(1);
    expect(text).toContain('#008C00');
    const r = importProfiles(text);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.profiles).toEqual([own]);
    expect(importProfiles('{x')).toEqual({ ok: false, error: 'json' });
    expect(importProfiles('{"format":"anders"}')).toEqual({ ok: false, error: 'format' });
    expect(importProfiles('{"format":"binokular-farbprofile","version":7}')).toEqual({ ok: false, error: 'version' });
    expect(importProfiles('{"format":"binokular-farbprofile","version":1,"profiles":[]}')).toEqual({ ok: false, error: 'empty' });
  });
  it('Zusammenführen: gleiche ID ersetzt, neue werden angehängt, Startprofile unberührt', () => {
    const a = makeProfile('A', 'RED_CYAN', paletteOf(startProfileFor('RED_CYAN')), 'manual', undefined, 'p-a');
    const b = makeProfile('B', 'RED_CYAN', paletteOf(startProfileFor('RED_CYAN')), 'manual', undefined, 'p-b');
    const a2 = { ...a, name: 'A neu' };
    const merged = mergeProfiles(normalizeProfiles([a]), [a2, b, START_PROFILES[1]]);
    expect(merged.map((p) => p.name)).toEqual(['Startwerte Rot-Cyan', 'Startwerte Rot-Grün', 'A neu', 'B']);
  });
});

describe('Speicher: Profile, Migration, App ohne Daten', () => {
  const memKv = (init?: [string, string][]) => {
    const mem = new Map<string, string>(init);
    const kv: KeyValue = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v), removeItem: (k) => void mem.delete(k) };
    return { mem, kv };
  };
  it('ohne gespeicherte Daten: Startprofile, Rot-Cyan aktiv', () => {
    const s = loadStore(memKv().kv);
    expect(s.profiles.map((p) => p.id)).toEqual(['start-red-cyan', 'start-red-green']);
    expect(activeProfile(s).id).toBe('start-red-cyan');
    expect(glassesOf(s)).toBe('RED_CYAN');
    expect(loadStore(null)).toEqual(defaultStore());
  });
  it('localStorage nicht verfügbar oder wirft: App startet trotzdem', () => {
    const throwing: KeyValue = {
      getItem: () => {
        throw new Error('gesperrt');
      },
      setItem: () => {
        throw new Error('voll');
      },
      removeItem: () => undefined,
    };
    expect(loadStore(throwing)).toEqual(defaultStore());
    expect(saveStore(defaultStore(), throwing)).toBe(false);
  });
  it('Migration: alter Stand mit Rot/Grün-Brille und alten Grundfarben → Startprofil Rot-Grün, Augenantworten bleiben', () => {
    const old = {
      version: 1,
      settings: { amblyopicEye: 'RIGHT', glasses: 'RED_GREEN', leftLens: 'OTHER' },
      calibration: { colors: { red: { r: 230, g: 0, b: 30 }, cyan: { r: 0, g: 255, b: 255 }, green: { r: 0, g: 255, b: 0 } }, results: { objectA: 'seen', leftEye: 'left', rightEye: 'right', commonObject: 'both' }, completedAt: '2026-10-05T10:00:00.000Z' },
    };
    const { kv } = memKv([[STORAGE_KEY, JSON.stringify(old)]]);
    const s = loadStore(kv);
    expect(s.activeProfileId).toBe('start-red-green');
    expect(glassesOf(s)).toBe('RED_GREEN');
    expect(s.settings.leftLens).toBe('OTHER');
    expect('glasses' in s.settings).toBe(false);
    expect(s.calibration.results).toEqual({ leftEye: 'left', rightEye: 'right', commonObject: 'both' });
    expect(s.calibration.completedAt).toBeNull();
    expect(JSON.stringify(s)).not.toContain('"colors"');
  });
  it('aktives Profil gespeichert; unbekannte ID fällt auf ein Startprofil zurück', () => {
    const own = makeProfile('Meins', 'RED_CYAN', { red: rgb(255, 0, 0), second: rgb(0, 0, 255), background: rgb(25, 0, 51) }, 'photo', undefined, 'p-me');
    const st = { ...defaultStore(), profiles: normalizeProfiles([own]), activeProfileId: 'p-me' };
    const { kv } = memKv();
    expect(saveStore(st, kv)).toBe(true);
    const back = loadStore(kv);
    expect(activeProfile(back)).toEqual(own);
    expect(normalizeStore({ ...st, activeProfileId: 'weg' }).activeProfileId).toBe('start-red-cyan');
  });
});

describe('Einstellungen-Export mit Profilen (Version 2, Version 1 tolerant)', () => {
  it('Rundreise mit eigenem aktivem Profil', () => {
    const own = makeProfile('Praxis-Monitor', 'RED_CYAN', { red: rgb(255, 0, 0), second: rgb(0, 64, 255), background: rgb(25, 0, 51) }, 'manual', undefined, 'p-praxis');
    const data = {
      settings: { ...DEFAULT_SETTINGS, amblyopicEye: 'RIGHT' as const, leftLens: 'OTHER' as const },
      games: defaultGameSettings(),
      calibration: { ...DEFAULT_CALIBRATION, completedAt: '2026-10-05T10:00:00.000Z' },
      profiles: normalizeProfiles([own]),
      activeProfileId: 'p-praxis',
    };
    const text = exportSettings(data);
    expect(JSON.parse(text).version).toBe(2);
    const r = importSettings(text);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.settings).toEqual(data.settings);
    expect(r.calibration).toEqual(data.calibration);
    expect(r.profiles).toEqual(data.profiles);
    expect(r.activeProfileId).toBe('p-praxis');
  });
  it('alte Datei (Version 1) mit Rot/Grün: Startprofil Rot-Grün, alte Farben verworfen', () => {
    const v1 = { format: 'binokular-einstellungen', version: 1, settings: { glasses: 'RED_GREEN', amblyopicEye: 'RIGHT' }, calibration: { colors: { red: { r: 1, g: 2, b: 3 } }, completedAt: '2026-10-05T10:00:00.000Z' } };
    const r = importSettings(JSON.stringify(v1));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.activeProfileId).toBe('start-red-green');
    expect(r.profiles.map((p) => p.id)).toEqual(['start-red-cyan', 'start-red-green']);
    expect(r.settings.amblyopicEye).toBe('RIGHT');
    expect(r.calibration.completedAt).toBeNull();
  });
});
