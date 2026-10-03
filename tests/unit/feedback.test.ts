import { describe, expect, it } from 'vitest';
import { buildExportText, formatAvg, GENERAL_ID, MAX_COMMENT, parseSubmission, summarize, type FeedbackRow } from '../../src/feedback/logic';

const row = (id: number, exercise: string, stars: number | null, comment: string, device = 'dev-00000001'): FeedbackRow => ({
  id,
  exercise,
  stars,
  comment,
  device,
  lang: 'de',
  createdAt: '2026-10-03T10:00:00.000Z',
});

describe('parseSubmission', () => {
  it('akzeptiert Sterne und/oder Kommentar', () => {
    expect(parseSubmission({ exercise: 'blitzblick', stars: 4, comment: '  gut \r\n ', device: 'abcdef12-1', lang: 'it' })).toEqual({
      ok: true,
      value: { exercise: 'blitzblick', stars: 4, comment: 'gut', device: 'abcdef12-1', lang: 'it' },
    });
    expect(parseSubmission({ exercise: GENERAL_ID, comment: 'nur Text' })).toMatchObject({ ok: true, value: { stars: null, device: '', lang: 'de' } });
    expect(parseSubmission({ exercise: 'x1', stars: 1 })).toMatchObject({ ok: true });
  });
  it('lehnt Ungültiges ab', () => {
    for (const bad of [null, 'x', {}, { exercise: 'Groß' }, { exercise: 'a b', stars: 3 }, { exercise: 'a', stars: 0 }, { exercise: 'a', stars: 6 }, { exercise: 'a', stars: 2.5 }, { exercise: 'a', stars: '3' }, { exercise: 'a' }, { exercise: 'a', comment: '   ' }, { exercise: 'a', comment: 'x'.repeat(MAX_COMMENT + 1) }]) {
      expect(parseSubmission(bad).ok, JSON.stringify(bad)).toBe(false);
    }
  });
  it('verwirft eine kaputte Gerätekennung statt abzulehnen', () => {
    expect(parseSubmission({ exercise: 'a', stars: 3, device: '<script>' })).toMatchObject({ ok: true, value: { device: '' } });
  });
});

describe('summarize', () => {
  it('zählt je Gerät nur die letzte Bewertung', () => {
    const s = summarize([row(1, 'a', 5, ''), row(2, 'a', 3, 'hm'), row(3, 'a', 1, '', 'dev-00000002'), row(4, 'b', null, 'Text')]);
    expect(s.get('a')).toMatchObject({ avg: 2, count: 2 });
    expect(s.get('a')!.comments.map((c) => c.id)).toEqual([2]);
    expect(s.get('b')).toMatchObject({ avg: null, count: 0 });
  });
  it('Zeilen ohne Gerät zählen einzeln', () => {
    expect(summarize([row(1, 'a', 5, '', ''), row(2, 'a', 3, '', '')]).get('a')).toMatchObject({ avg: 4, count: 2 });
  });
  it('formatiert den Mittelwert', () => {
    expect(formatAvg(3.5)).toBe('3,5');
    expect(formatAvg(null)).toBe('–');
  });
});

describe('buildExportText', () => {
  const info = (id: string) => ({ numbers: id === 'vier' ? [905] : id === 'lab' ? [] : [101, 102], name: id === 'vier' ? '4-Ziele-Wechsel' : id });
  const rows = [row(1, 'lab', 2, 'zu klein'), row(2, 'vier', 4, 'Zeile eins\nZeile zwei'), row(3, GENERAL_ID, null, 'allgemein'), row(4, 'vier', 5, 'noch einer', 'dev-00000002'), row(5, 'leer', 3, '')];
  const text = buildExportText(rows.filter((r) => r.comment), info, new Date(2026, 9, 3, 14, 5));
  it('nennt Nummer, Kennung und Kritik, Allgemeines zuerst, dann nach Nummer', () => {
    expect(text).toContain('Exportiert am 03.10.2026 14:05 · 4 Kommentare zu 3 Übungen');
    expect(text).toContain('=== Übung 905 – 4-Ziele-Wechsel (Kennung: vier) ===');
    expect(text).toContain('=== Übung ohne Katalognummer – lab (Kennung: lab) ===');
    expect(text).toContain('- (4 von 5) Zeile eins\n  Zeile zwei');
    expect(text).toContain('Bewertung: Ø 4,5 von 5 Sternen (2 Bewertungen)');
    const order = ['Allgemein (keine', 'Übung 905', 'ohne Katalognummer'].map((k) => text.indexOf(k));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order.every((i) => i >= 0)).toBe(true);
  });
  it('lässt Übungen ohne Kommentar weg', () => {
    expect(text).not.toContain('leer');
  });
});
