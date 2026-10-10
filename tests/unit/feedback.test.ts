import { describe, expect, it } from 'vitest';
import { buildExportText, cleanTrainer, formatAvg, GENERAL_ID, MAX_COMMENT, MAX_TRAINER, parseSubmission, summarize, type FeedbackRow } from '../../src/feedback/logic';

const row = (id: number, exercise: string, stars: number | null, comment: string, trainer = ''): FeedbackRow => ({
  id,
  exercise,
  stars,
  comment,
  trainer,
  lang: 'de',
  createdAt: '2026-10-03T10:00:00.000Z',
});

describe('parseSubmission', () => {
  it('akzeptiert Sterne und/oder Kommentar', () => {
    expect(parseSubmission({ exercise: 'blitzblick', stars: 4, comment: '  gut \r\n ', trainer: ' A.B ', lang: 'it' })).toEqual({
      ok: true,
      value: { exercise: 'blitzblick', stars: 4, comment: 'gut', trainer: 'A.B', lang: 'it' },
    });
    expect(parseSubmission({ exercise: GENERAL_ID, comment: 'nur Text' })).toMatchObject({ ok: true, value: { stars: null, trainer: '', lang: 'de' } });
    expect(parseSubmission({ exercise: 'x1', stars: 1 })).toMatchObject({ ok: true });
  });
  it('lehnt Ungültiges ab', () => {
    for (const bad of [null, 'x', {}, { exercise: 'Groß' }, { exercise: 'a b', stars: 3 }, { exercise: 'a', stars: 0 }, { exercise: 'a', stars: 6 }, { exercise: 'a', stars: 2.5 }, { exercise: 'a', stars: '3' }, { exercise: 'a' }, { exercise: 'a', comment: '   ' }, { exercise: 'a', comment: 'x'.repeat(MAX_COMMENT + 1) }]) {
      expect(parseSubmission(bad).ok, JSON.stringify(bad)).toBe(false);
    }
  });
  it('säubert das Kürzel statt abzulehnen (nur Buchstaben, Ziffern, Leerzeichen, . _ -, höchstens 20 Zeichen)', () => {
    expect(parseSubmission({ exercise: 'a', stars: 3, trainer: '<script>alert(1)</script>' })).toMatchObject({ ok: true, value: { trainer: 'scriptalert1script' } });
    expect(parseSubmission({ exercise: 'a', stars: 3, trainer: 'x'.repeat(40) })).toMatchObject({ ok: true, value: { trainer: 'x'.repeat(MAX_TRAINER) } });
    expect(parseSubmission({ exercise: 'a', stars: 3, trainer: 42 })).toMatchObject({ ok: true, value: { trainer: '' } });
    expect(cleanTrainer('  M. Müller-Ö  ')).toBe('M. Müller-Ö');
  });
});

describe('summarize', () => {
  it('jede Bewertung mit Sternen zählt einzeln, auch mehrere vom selben Kürzel', () => {
    const s = summarize([row(1, 'a', 5, ''), row(2, 'a', 3, 'hm'), row(3, 'a', 1, '', 'AB'), row(4, 'b', null, 'Text')]);
    expect(s.get('a')).toMatchObject({ avg: 3, count: 3 });
    expect(s.get('a')!.comments.map((c) => c.id)).toEqual([2]);
    expect(s.get('b')).toMatchObject({ avg: null, count: 0 });
  });
  it('formatiert den Mittelwert', () => {
    expect(formatAvg(3.5)).toBe('3,5');
    expect(formatAvg(null)).toBe('–');
  });
});

describe('buildExportText', () => {
  const info = (id: string) => ({ numbers: id === 'vier' ? [905] : id === 'lab' ? [] : [101, 102], name: id === 'vier' ? '4-Ziele-Wechsel' : id });
  const rows = [row(1, 'lab', 2, 'zu klein'), row(2, 'vier', 4, 'Zeile eins\nZeile zwei'), row(3, GENERAL_ID, null, 'allgemein'), row(4, 'vier', 5, 'noch einer', 'AB'), row(5, 'leer', 3, '')];
  const text = buildExportText(rows.filter((r) => r.comment), info, new Date(2026, 9, 3, 14, 5));
  it('nennt Nummer, Kennung und Kritik, Allgemeines zuerst, dann nach Nummer', () => {
    expect(text).toContain('Exportiert am 03.10.2026 14:05 · 4 Kommentare zu 3 Übungen');
    expect(text).toContain('=== Übung 905 – 4-Ziele-Wechsel (Kennung: vier) ===');
    expect(text).toContain('=== Übung ohne Katalognummer – lab (Kennung: lab) ===');
    expect(text).toContain('- [#2] Übung 905 – 4-Ziele-Wechsel (4 von 5): Zeile eins\n  Zeile zwei');
    expect(text).toContain('- [#4] Übung 905 – 4-Ziele-Wechsel (5 von 5, Trainer AB): noch einer');
    expect(text).toContain('- [#3] Allgemein (ohne Sterne): allgemein');
    expect(text).toContain('Bewertung: Ø 4,5 von 5 Sternen (2 Bewertungen)');
    const order = ['Allgemein (keine', 'Übung 905', 'ohne Katalognummer'].map((k) => text.indexOf(k));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order.every((i) => i >= 0)).toBe(true);
  });
  it('lässt Übungen ohne Kommentar weg', () => {
    expect(text).not.toContain('leer');
  });
});
