import { describe, expect, it } from 'vitest';
import { csvCell, CSV_COLUMNS, deNum, sessionsToCsv } from '../../src/binokular/data/csv';
import { DEFAULT_SETTINGS, normalizeSettings } from '../../src/binokular/data/settings';
import { defaultStore, loadStore, normalizeStore, saveStore, STORAGE_KEY, type KeyValue } from '../../src/binokular/data/storage';
import { exportSettings, importSettings } from '../../src/binokular/data/transfer';
import { DEFAULT_CALIBRATION } from '../../src/binokular/calibration/calibration';
import { normalizeProfiles } from '../../src/binokular/calibration/profiles';
import { adaptContrast, decreaseContrast, increaseContrast, outcomeOf } from '../../src/binokular/therapy/contrast';
import { changePin, checkPin, DEFAULT_PIN, isValidPin } from '../../src/binokular/therapy/pin';
import { minutesPerDay, SessionRecorder } from '../../src/binokular/therapy/session';
import { checkAlpha, makeRecord, nextCheckDelayMs, randomShape, shouldStartCheck, summarizeSuppression, SUPPRESSION_NOTE } from '../../src/binokular/therapy/suppression';

describe('Adaptive Kontraststeuerung', () => {
  it('PERCENTUAL: 20 → 22 → 24,2 → 26,6 (+10 % des Werts)', () => {
    const seq = [20];
    for (let i = 0; i < 3; i++) seq.push(increaseContrast(seq[seq.length - 1], 'PERCENTUAL'));
    expect(seq).toEqual([20, 22, 24.2, 26.6]);
  });
  it('PERCENTUAL −5 % des Werts, LINEAR ±5 Prozentpunkte, MANUAL unverändert', () => {
    expect(decreaseContrast(40, 'PERCENTUAL')).toBe(38);
    expect(increaseContrast(20, 'LINEAR')).toBe(25);
    expect(decreaseContrast(20, 'LINEAR')).toBe(15);
    expect(increaseContrast(20, 'MANUAL')).toBe(20);
    expect(decreaseContrast(20, 'MANUAL')).toBe(20);
  });
  it('Grenzen 0–100', () => {
    expect(increaseContrast(95, 'PERCENTUAL')).toBe(100);
    expect(increaseContrast(98, 'LINEAR')).toBe(100);
    expect(decreaseContrast(3, 'LINEAR')).toBe(0);
    expect(increaseContrast(100, 'PERCENTUAL')).toBe(100);
  });
  it('Erfolg = Abschluss mit ≥ 2 Sternen; Abbruch zählt nicht', () => {
    expect(outcomeOf(true, 3)).toBe('success');
    expect(outcomeOf(true, 2)).toBe('success');
    expect(outcomeOf(true, 1)).toBe('failure');
    expect(outcomeOf(false, 0)).toBe('failure');
    expect(outcomeOf(false, 0, false)).toBe('neutral');
  });
  it('Erfolg erhöht, einzelner Misserfolg nicht, wiederholter Misserfolg (2 in Folge) senkt', () => {
    const opts = { enabled: true, mode: 'PERCENTUAL' as const };
    let st = { fellowEyeContrast: 20, consecutiveFailures: 0 };
    st = adaptContrast(st, 'success', opts);
    expect(st).toMatchObject({ fellowEyeContrast: 22, consecutiveFailures: 0, changed: 'up' });
    st = adaptContrast(st, 'failure', opts);
    expect(st).toMatchObject({ fellowEyeContrast: 22, consecutiveFailures: 1, changed: null });
    st = adaptContrast(st, 'failure', opts);
    expect(st).toMatchObject({ fellowEyeContrast: 20.9, consecutiveFailures: 0, changed: 'down' });
    // Erfolg setzt die Zählung zurück
    st = adaptContrast({ fellowEyeContrast: 30, consecutiveFailures: 1 }, 'success', opts);
    expect(st.consecutiveFailures).toBe(0);
    expect(adaptContrast({ fellowEyeContrast: 30, consecutiveFailures: 1 }, 'neutral', opts)).toMatchObject({ fellowEyeContrast: 30, consecutiveFailures: 1 });
  });
  it('abgeschaltet oder MANUAL: keine Änderung', () => {
    expect(adaptContrast({ fellowEyeContrast: 20, consecutiveFailures: 0 }, 'success', { enabled: false, mode: 'PERCENTUAL' }).fellowEyeContrast).toBe(20);
    expect(adaptContrast({ fellowEyeContrast: 20, consecutiveFailures: 1 }, 'failure', { enabled: true, mode: 'MANUAL' }).fellowEyeContrast).toBe(20);
    expect(adaptContrast({ fellowEyeContrast: 20, consecutiveFailures: 0 }, 'success', { enabled: true, mode: 'LINEAR' }).fellowEyeContrast).toBe(25);
  });
});

describe('Suppressions-Kontrolle', () => {
  const rec = (shape: 'circle' | 'star', answer: 'circle' | 'star' | null) => makeRecord(1000, shape, answer, 800);
  it('Merkmal erst nach wiederholtem Fehlen (2 in Folge)', () => {
    expect(summarizeSuppression([]).accuracy).toBeNull();
    expect(summarizeSuppression([rec('circle', null)]).possibleSuppression).toBe(false);
    expect(summarizeSuppression([rec('circle', null), rec('star', 'star'), rec('circle', 'star')]).possibleSuppression).toBe(false);
    const s = summarizeSuppression([rec('circle', 'circle'), rec('circle', null), rec('star', 'circle')]);
    expect(s.possibleSuppression).toBe(true);
    expect(s.flagEvents).toBe(1);
    expect(s.accuracy).toBeCloseTo(1 / 3);
  });
  it('Protokolltext ohne Diagnose', () => {
    const s = summarizeSuppression([rec('circle', null), rec('star', null)]);
    expect(s.note).toBe('Stimulus möglicherweise nicht wahrgenommen.');
    expect(SUPPRESSION_NOTE).not.toMatch(/diagnos|amblyop|suppression|krank|störung/i);
    expect(summarizeSuppression([rec('circle', 'circle')]).note).toBe('');
  });
  it('ohne Antwort keine Reaktionszeit; richtige Antwort erkannt', () => {
    expect(makeRecord(5, 'circle', null, 900)).toMatchObject({ correct: false, reactionMs: null });
    expect(makeRecord(5, 'circle', 'circle', 900)).toMatchObject({ correct: true, reactionMs: 900 });
  });
  it('Zeitplan 60–90 s, nur bei ruhendem Spiel, weiche Einblendung', () => {
    expect(nextCheckDelayMs(() => 0)).toBe(60000);
    expect(nextCheckDelayMs(() => 0.9999)).toBeLessThanOrEqual(90000);
    expect(shouldStartCheck(70000, 65000, true, true)).toBe(true);
    expect(shouldStartCheck(70000, 65000, false, true)).toBe(false);
    expect(shouldStartCheck(70000, 65000, true, false)).toBe(false);
    expect(shouldStartCheck(10000, 65000, true, true)).toBe(false);
    expect(checkAlpha(0)).toBe(0);
    expect(checkAlpha(150)).toBeCloseTo(0.5);
    expect(checkAlpha(1000)).toBe(1);
    expect(checkAlpha(10000)).toBe(0);
    expect(randomShape(() => 0, 'circle')).not.toBe('circle');
  });
});

describe('Session-Log und CSV', () => {
  const start = { patientId: 'K-07', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT' as const, glasses: 'RED_CYAN' as const, leftLens: 'RED' as const, plannedMinutes: 30 };
  function sample() {
    let now = new Date(2026, 9, 5, 14, 30, 0).getTime();
    const r = new SessionRecorder(start, () => now);
    now += 60000;
    r.addActive(55000);
    r.addAttempt({ levelId: 'level01', levelNumber: 1, activeMs: 55000, result: 'completed', stars: 3, failures: 0, fellowContrastBefore: 20, fellowContrastAfter: 22 });
    r.contrastChange(22, 'success');
    r.addSuppression(makeRecord(r.elapsed(), 'star', 'star', 1200));
    r.pauseBegin();
    now += 30000;
    r.pauseEnd();
    now += 90000;
    r.addActive(80000);
    r.addAttempt({ levelId: 'level01', levelNumber: 1, activeMs: 80000, result: 'timeout', stars: 0, failures: 2, fellowContrastBefore: 22, fellowContrastAfter: 22 });
    r.addSuppression(makeRecord(r.elapsed(), 'circle', null, 0));
    now += 10000;
    r.addAttempt({ levelId: 'level01', levelNumber: 1, activeMs: 4000, result: 'aborted', stars: 0, failures: 0, fellowContrastBefore: 22, fellowContrastAfter: 22 });
    return r.finish('user');
  }
  it('alle Felder je Session', () => {
    const s = sample();
    expect(s.date).toBe('2026-10-05');
    expect(s.startTime).toBe('14:30');
    expect(s.durationMs).toBe(190000);
    expect(s.activeMs).toBe(135000);
    expect(s.pauseMs).toBe(30000);
    expect(s.pauses).toEqual([{ startMs: 60000, durationMs: 30000 }]);
    expect(s.levelsPlayed).toBe(2); // Abbruch zählt nicht
    expect(s.levelsCompleted).toBe(1);
    expect(s.successRate).toBe(0.5);
    expect(s.stars).toBe(3);
    expect(s.errors).toBe(2);
    expect(s.amblyopicContrast).toBe(100);
    expect(s.fellowContrastStart).toBe(20);
    expect(s.fellowContrastEnd).toBe(22);
    expect(s.contrastHistory.map((p) => p.value)).toEqual([20, 22]);
    expect(s.suppressionChecks).toHaveLength(2);
    expect(s.suppressionAccuracy).toBe(0.5);
    expect(s.possibleSuppression).toBe(false);
    expect(s.reactionTimesMs).toEqual([1200]);
    expect(s.meanReactionMs).toBe(1200);
    expect(s.endReason).toBe('user');
    expect(s.patientId).toBe('K-07');
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
    expect(col('Aktive Spielzeit (min)')).toBe('2,3');
    expect(col('Erfolgsrate (%)')).toBe('50');
    expect(col('Kontrastverlauf')).toBe('20,0 > 22,0');
    expect(col('Suppressionskontrollen')).toBe('star:star circle:-');
    expect(col('Amblyopes Auge')).toBe('links');
  });
  it('CSV-Zellen maskiert (Trennzeichen, Anführungszeichen, Formeln)', () => {
    expect(csvCell('a;b')).toBe('"a;b"');
    expect(csvCell('sag "hallo"')).toBe('"sag ""hallo"""');
    expect(csvCell('=SUMME(A1)')).toBe("'=SUMME(A1)");
    expect(deNum(24.25, 1)).toBe('24,3');
    expect(deNum(null)).toBe('');
  });
  it('Trainingszeit pro Tag', () => {
    const a = sample();
    const b = { ...sample(), id: 'b', date: '2026-10-06', activeMs: 600000 };
    expect(minutesPerDay([b, a, a])).toEqual([
      { date: '2026-10-05', minutes: 4.5 },
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
  it('Rundreise Export → Import ergibt dieselben Einstellungen und Kalibrierung', () => {
    const settings = { ...DEFAULT_SETTINGS, patientId: 'P-12', age: 9, amblyopicEye: 'RIGHT' as const, leftLens: 'OTHER' as const, fellowEyeContrast: 33.3, contrastMode: 'LINEAR' as const, adaptiveContrast: false, sessionMinutes: 20, difficulty: 'MEDIUM' as const };
    const calibration = { ...DEFAULT_CALIBRATION, completedAt: '2026-10-05T10:00:00.000Z' };
    const r = importSettings(exportSettings({ settings, calibration, profiles: normalizeProfiles([]), activeProfileId: 'start-red-green' }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.settings).toEqual(settings);
    expect(r.calibration).toEqual(calibration);
    expect(r.activeProfileId).toBe('start-red-green');
  });
  it('Import prüft Format und bringt Werte in gültige Bereiche; PIN wird nicht exportiert', () => {
    expect(importSettings('{kaputt')).toEqual({ ok: false, error: 'json' });
    expect(importSettings('{"format":"anders"}')).toEqual({ ok: false, error: 'format' });
    expect(importSettings('{"format":"binokular-einstellungen","version":9}')).toEqual({ ok: false, error: 'version' });
    const r = importSettings(JSON.stringify({ format: 'binokular-einstellungen', version: 1, settings: { amblyopicContrast: 180, fellowEyeContrast: -3, amblyopicEye: 'MITTE', sessionMinutes: 1000, patientId: '<b>Max</b>' } }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.settings.amblyopicContrast).toBe(100);
    expect(r.settings.fellowEyeContrast).toBe(0);
    expect(r.settings.amblyopicEye).toBe('LEFT');
    expect(r.settings.sessionMinutes).toBe(90);
    expect(r.settings.patientId).toBe('bMaxb');
    expect(exportSettings({ settings: DEFAULT_SETTINGS, calibration: DEFAULT_CALIBRATION, profiles: normalizeProfiles([]), activeProfileId: 'start-red-cyan' })).not.toContain('726');
  });
  it('Standardwerte laut Spezifikation', () => {
    expect(DEFAULT_SETTINGS.amblyopicContrast).toBe(100);
    expect(DEFAULT_SETTINGS.fellowEyeContrast).toBe(20);
    expect(DEFAULT_SETTINGS.startFellowEyeContrast).toBe(20);
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });
  it('localStorage unter binokular:v1; unterbrochene Session wird beim Laden abgeschlossen', () => {
    const mem = new Map<string, string>();
    const kv: KeyValue = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => void mem.set(k, v), removeItem: (k) => void mem.delete(k) };
    expect(STORAGE_KEY).toBe('binokular:v1');
    const st = defaultStore();
    const rec = new SessionRecorder({ patientId: '', amblyopicContrast: 100, fellowEyeContrast: 20, amblyopicEye: 'LEFT', glasses: 'RED_CYAN', leftLens: 'RED', plannedMinutes: 30 }, () => 1000);
    st.activeSession = rec.snapshot();
    st.pin = '4711';
    expect(saveStore(st, kv)).toBe(true);
    const loaded = loadStore(kv);
    expect(loaded.activeSession).toBeNull();
    expect(loaded.sessions).toHaveLength(1);
    expect(loaded.sessions[0].endReason).toBe('interrupted');
    expect(loaded.pin).toBe('4711');
    expect(normalizeStore({ pin: 'abc', sessions: [{ kaputt: true }] })).toMatchObject({ pin: '726', sessions: [] });
    mem.set(STORAGE_KEY, '{nicht json');
    expect(loadStore(kv)).toEqual(defaultStore());
  });
});
