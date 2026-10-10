import { describe, expect, it } from 'vitest';
import { csvCell, CSV_COLUMNS, deNum, sessionsToCsv } from '../../src/binokular/data/csv';
import { DEFAULT_SETTINGS, normalizeSettings } from '../../src/binokular/data/settings';
import { defaultGameSettings, defaultStore, loadStore, normalizeStore, saveStore, STORAGE_KEY, type KeyValue } from '../../src/binokular/data/storage';
import { exportSettings, importSettings } from '../../src/binokular/data/transfer';
import { DEFAULT_CALIBRATION } from '../../src/binokular/calibration/calibration';
import { normalizeProfiles } from '../../src/binokular/calibration/profiles';
import { changePin, checkPin, DEFAULT_PIN, isValidPin } from '../../src/binokular/therapy/pin';
import { minutesPerDay, normalizeSession, SessionRecorder } from '../../src/binokular/therapy/session';

describe('Session-Log und CSV', () => {
  const start = { gameId: 'nachzeichnen' as const, patientId: 'K-07', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT' as const, glasses: 'RED_CYAN' as const, leftLens: 'RED' as const };
  const sum = { points: 1, errors: 2, colorChanges: 9, details: { accuracy: 93.5, avgDeviation: 4.2, paths: 1 }, completed: true };
  function sample() {
    let now = new Date(2026, 9, 5, 14, 30, 0).getTime();
    const r = new SessionRecorder(start, () => now);
    now += 60000;
    r.pauseBegin();
    expect(r.paused).toBe(true);
    now += 30000;
    expect(r.activeMs()).toBe(60000);
    r.pauseEnd();
    now += 100000;
    return r.finish('goal', sum);
  }
  it('alle Felder je Session', () => {
    const s = sample();
    expect(s.gameId).toBe('nachzeichnen');
    expect(s.date).toBe('2026-10-05');
    expect(s.startTime).toBe('14:30');
    expect(s.durationMs).toBe(190000);
    expect(s.pauseMs).toBe(30000);
    expect(s.pauses).toBe(1);
    expect(s.activeMs).toBe(160000);
    expect(s.points).toBe(1);
    expect(s.errors).toBe(2);
    expect(s.colorChanges).toBe(9);
    expect(s.completed).toBe(true);
    expect(s.details.accuracy).toBe(93.5);
    expect(s.amblyopicContrast).toBe(100);
    expect(s.fellowEyeContrast).toBe(20);
    expect(s.endReason).toBe('goal');
    expect(s.patientId).toBe('K-07');
  });
  it('Datensatz überlebt die Prüfung unverändert; fremde Felder entfallen, kaputte Datensätze werden verworfen', () => {
    const s = sample();
    expect(normalizeSession(JSON.parse(JSON.stringify(s)))).toEqual(s);
    expect(normalizeSession({ ...s, fremd: 1, details: { x: 'text', y: 2 } })).toMatchObject({ details: { y: 2 } });
    expect(normalizeSession({ ...s, endReason: 'seltsam' })?.endReason).toBe('interrupted');
    expect(normalizeSession({ ...s, gameId: 'digger' })).toBeNull();
    expect(normalizeSession(null)).toBeNull();
    // Datensatz des früheren Spiels (Level, Sterne, ohne gameId) wird verworfen
    expect(normalizeSession({ id: 's1', date: '2026-10-05', activeMs: 5, attempts: [], levelsPlayed: 3 })).toBeNull();
  });
  it('CSV: Kopf, eine Zeile je Session, Semikolon, Dezimalkomma, BOM', () => {
    const csv = sessionsToCsv([sample()]);
    expect(csv.startsWith('﻿')).toBe(true);
    const lines = csv.slice(1).trim().split('\r\n');
    expect(lines).toHaveLength(2);
    const head = lines[0].split(';');
    const row = lines[1].split(';');
    expect(head).toHaveLength(CSV_COLUMNS.length);
    expect(row).toHaveLength(CSV_COLUMNS.length);
    const col = (name: string) => row[head.indexOf(name)];
    expect(col('Datum')).toBe('2026-10-05');
    expect(col('Spiel')).toBe('Nachzeichnen');
    expect(col('Aktive Spielzeit (min)')).toBe('2,7');
    expect(col('Punkte')).toBe('1');
    expect(col('Fehler')).toBe('2');
    expect(col('Farbwechsel')).toBe('9');
    expect(col('Spielwerte')).toBe('accuracy=93,5 avgDeviation=4,2 paths=1');
    expect(col('Amblyopes Auge')).toBe('links');
  });
  it('CSV-Zellen maskiert (Trennzeichen, Anführungszeichen, Formeln)', () => {
    expect(csvCell('a;b')).toBe('"a;b"');
    expect(csvCell('sag "hallo"')).toBe('"sag ""hallo"""');
    expect(csvCell('=SUMME(A1)')).toBe("'=SUMME(A1)");
    expect(deNum(24.25, 1)).toBe('24,3');
    expect(deNum(null)).toBe('');
  });
  it('Spielzeit pro Tag', () => {
    const a = sample();
    const b = { ...sample(), id: 'b', date: '2026-10-06', activeMs: 600000 };
    expect(minutesPerDay([b, a, a])).toEqual([
      { date: '2026-10-05', minutes: 5.3 },
      { date: '2026-10-06', minutes: 10 },
    ]);
  });
});

describe('Therapeuten-PIN', () => {
  it('Standard 726, falsche PIN abgewiesen', () => {
    expect(DEFAULT_PIN).toBe('726');
    expect(checkPin('726', '726')).toBe(true);
    expect(checkPin(' 726 ', '726')).toBe(true);
    expect(checkPin('000', '726')).toBe(false);
    expect(checkPin('726', 'kaputt')).toBe(true); // ungültige gespeicherte PIN → Standard
  });
  it('ändern: 3–8 Ziffern, zweimal gleich', () => {
    expect(isValidPin('12')).toBe(false);
    expect(isValidPin('123456789')).toBe(false);
    expect(isValidPin('12a4')).toBe(false);
    expect(changePin('4711', '4711')).toEqual({ ok: true, pin: '4711' });
    expect(changePin('4711', '4712')).toEqual({ ok: false, error: 'mismatch' });
    expect(changePin('47', '47')).toEqual({ ok: false, error: 'invalid' });
  });
});

describe('Einstellungen: Export/Import und Speicher', () => {
  it('Rundreise Export → Import ergibt dieselben Einstellungen, Spieleinstellungen und Kalibrierung', () => {
    const settings = { ...DEFAULT_SETTINGS, patientId: 'P-12', age: 9, amblyopicEye: 'RIGHT' as const, leftLens: 'OTHER' as const, fellowEyeContrast: 33.3 };
    const games = defaultGameSettings();
    games.nachzeichnen.pathWidth = 24;
    games.nachzeichnen.changeMode = 'FADE';
    games.pong.twoPlayer = true;
    const calibration = { ...DEFAULT_CALIBRATION, completedAt: '2026-10-05T10:00:00.000Z' };
    const r = importSettings(exportSettings({ settings, games, calibration, profiles: normalizeProfiles([]), activeProfileId: 'start-red-green' }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.settings).toEqual(settings);
    expect(r.games).toEqual(games);
    expect(r.calibration).toEqual(calibration);
    expect(r.activeProfileId).toBe('start-red-green');
  });
  it('Import prüft Format und bringt Werte in gültige Bereiche; PIN wird nicht exportiert', () => {
    expect(importSettings('{kaputt')).toEqual({ ok: false, error: 'json' });
    expect(importSettings('{"format":"anders"}')).toEqual({ ok: false, error: 'format' });
    expect(importSettings('{"format":"binokular-einstellungen","version":9}')).toEqual({ ok: false, error: 'version' });
    const r = importSettings(
      JSON.stringify({
        format: 'binokular-einstellungen',
        version: 2,
        settings: { amblyopicContrast: 180, fellowEyeContrast: -3, amblyopicEye: 'MITTE', patientId: '<b>Max</b>', sessionMinutes: 1000 },
        games: { nachzeichnen: { pathWidth: 999, intervalS: 0, changeMode: 'x', errorLimit: -4 }, pong: { gain: 99, ballRadius: 1, targetScore: 'viele', twoPlayer: 'ja' } },
      }),
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.settings.amblyopicContrast).toBe(100);
    expect(r.settings.fellowEyeContrast).toBe(0);
    expect(r.settings.amblyopicEye).toBe('LEFT');
    expect(r.settings.patientId).toBe('bMaxb');
    expect(r.settings).not.toHaveProperty('sessionMinutes');
    expect(r.games.nachzeichnen).toMatchObject({ pathWidth: 40, intervalS: 0.5, changeMode: 'HARD', errorLimit: 0 });
    expect(r.games.pong).toMatchObject({ gain: 3, ballRadius: 12, targetScore: 7, twoPlayer: false });
    expect(exportSettings({ settings: DEFAULT_SETTINGS, games: defaultGameSettings(), calibration: DEFAULT_CALIBRATION, profiles: normalizeProfiles([]), activeProfileId: 'start-red-cyan' })).not.toContain('726');
  });
  it('Datei ohne Spieleinstellungen (ältere Fassung): Standardwerte', () => {
    const r = importSettings(JSON.stringify({ format: 'binokular-einstellungen', version: 1, settings: {} }));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.games).toEqual(defaultGameSettings());
  });
  it('Standardwerte laut Spezifikation', () => {
    expect(DEFAULT_SETTINGS.amblyopicContrast).toBe(100);
    expect(DEFAULT_SETTINGS.fellowEyeContrast).toBe(20);
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings({ fellowEyeContrast: 'viel' }).fellowEyeContrast).toBe(20);
  });
  it('localStorage unter binokular:v1; Sessions und Spieleinstellungen bleiben erhalten', () => {
    const mem = new Map<string, string>();
    const kv: KeyValue = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v), removeItem: (k) => void mem.delete(k) };
    expect(STORAGE_KEY).toBe('binokular:v1');
    const st = defaultStore();
    const rec = new SessionRecorder({ gameId: 'pong', patientId: '', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED' }, () => 1000);
    st.sessions.push(rec.finish('score', { points: 7, errors: 3, colorChanges: 40, details: { opponent: 3 }, completed: true }));
    st.games.pong.targetScore = 11;
    st.pin = '4711';
    expect(saveStore(st, kv)).toBe(true);
    const loaded = loadStore(kv);
    expect(loaded.sessions).toHaveLength(1);
    expect(loaded.sessions[0].endReason).toBe('score');
    expect(loaded.games.pong.targetScore).toBe(11);
    expect(loaded.pin).toBe('4711');
    expect(normalizeStore({ pin: 'abc', sessions: [{ kaputt: true }] })).toMatchObject({ pin: '726', sessions: [] });
    mem.set(STORAGE_KEY, '{nicht json');
    expect(loadStore(kv)).toEqual(defaultStore());
  });
  it('App startet ohne gespeicherte Daten und ohne Speicher (try/catch)', () => {
    const none: KeyValue = { getItem: () => null, setItem: () => undefined, removeItem: () => undefined };
    expect(loadStore(none)).toEqual(defaultStore());
    const broken: KeyValue = {
      getItem: () => {
        throw new Error('gesperrt');
      },
      setItem: () => {
        throw new Error('voll');
      },
      removeItem: () => undefined,
    };
    expect(loadStore(broken)).toEqual(defaultStore());
    expect(saveStore(defaultStore(), broken)).toBe(false);
    expect(loadStore(null)).toEqual(defaultStore());
  });
});
