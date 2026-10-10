import { describe, expect, it } from 'vitest';
import {
  ADMIN_REPLY_URL,
  buildExportText,
  MAX_COMMENT,
  normalizeImprovements,
  normalizeReplies,
  parseReply,
  parseSubmission,
  pendingExport,
  type FeedbackRow,
} from '../../src/feedback/logic';

const row = (id: number, exercise: string, stars: number | null, comment: string): FeedbackRow => ({
  id,
  exercise,
  stars,
  comment,
  trainer: '',
  lang: 'de',
  createdAt: '2026-10-03T10:00:00.000Z',
});

describe('Export: Anleitung für die KI und Kommentarnummern', () => {
  const info = () => ({ numbers: [101], name: 'Blitz' });
  const text = buildExportText([row(7, 'blitz', 3, 'zu schnell')], info, new Date(2026, 9, 3, 14, 5));
  it('beginnt mit der Antwort-Anleitung, ohne Passwort', () => {
    expect(text).toContain(`curl -sS -X POST ${ADMIN_REPLY_URL}`);
    expect(text).toContain('$ADMIN_PASSWORD');
    expect(text).toContain('https://visual.auer.page/api/admin/reply');
    expect(text).not.toMatch(/Bearer \d/);
    expect(text).not.toContain('726');
    expect(text.indexOf('curl')).toBeLessThan(text.indexOf('=== Übung 101'));
  });
  it('trägt die Nummer jedes Kommentars', () => {
    expect(text).toContain('[#7] Übung 101 – Blitz (3 von 5): zu schnell');
  });
  it('markiert Folgekommentare', () => {
    const t = buildExportText([{ ...row(9, 'blitz', 4, 'besser jetzt'), parentId: 7 }], info, new Date());
    expect(t).toContain('[#9] Übung 101 – Blitz (4 von 5, Folgekommentar zu #7): besser jetzt');
  });
});

describe('pendingExport', () => {
  it('lässt exportierte Kommentare und Zeilen ohne Text weg', () => {
    const rows: FeedbackRow[] = [
      row(1, 'a', 3, 'neu'),
      { ...row(2, 'a', 3, 'alt'), exportedAt: '2026-10-04T10:00:00.000Z' },
      row(3, 'a', 5, ''),
      { ...row(4, 'b', null, 'x'), exportedAt: null },
    ];
    expect(pendingExport(rows).map((r) => r.id)).toEqual([1, 4]);
  });
});

describe('parseSubmission replyTo', () => {
  it('übernimmt nur gültige Nummern', () => {
    expect(parseSubmission({ exercise: 'a', stars: 3, replyTo: 12 })).toMatchObject({ ok: true, value: { replyTo: 12 } });
    for (const bad of [0, -1, 1.5, '3', null]) {
      const r = parseSubmission({ exercise: 'a', stars: 3, replyTo: bad });
      expect(r.ok && 'replyTo' in r.value, String(bad)).toBe(false);
    }
  });
});

describe('parseReply', () => {
  it('akzeptiert Übungskennung, Text und optionale Felder', () => {
    expect(parseReply({ exerciseId: 'blitz', text: ' danke \r\n ok ', improved: true })).toEqual({
      ok: true,
      value: { feedbackId: null, exercise: 'blitz', text: 'danke \n ok', improved: true, includeUnexported: false },
    });
    expect(parseReply({ exerciseId: 'blitz', feedbackId: 5, text: 'x' })).toMatchObject({ ok: true, value: { feedbackId: 5, improved: false } });
  });
  it('lehnt Ungültiges ab', () => {
    const bads = [null, {}, { exerciseId: 'blitz' }, { exerciseId: 'blitz', text: '  ' }, { exerciseId: 'Blitz', text: 'x' }, { exerciseId: 'a', text: 'x', feedbackId: 0 }, { exerciseId: 'a', text: 'x', feedbackId: '3' }, { exerciseId: 'a', text: 'x'.repeat(MAX_COMMENT + 1) }];
    for (const bad of bads) expect(parseReply(bad).ok, JSON.stringify(bad)).toBe(false);
  });
});

describe('normalizeReplies / normalizeImprovements', () => {
  it('verwirft Unbrauchbares und ordnet nach Zeit', () => {
    const out = normalizeReplies([
      { id: 2, text: 'später', createdAt: '2026-10-05T00:00:00Z', improved: true },
      { id: 1, text: 'früher', createdAt: '2026-10-04T00:00:00Z' },
      { text: '', createdAt: '2026-10-04T00:00:00Z' },
      { text: 'x', createdAt: 'kaputt' },
      null,
      'x',
    ]);
    expect(out.map((r) => [r.id, r.improved])).toEqual([
      [1, false],
      [2, true],
    ]);
    expect(normalizeReplies('nope')).toEqual([]);
  });
  it('behält je Übung nur die neueste Verbesserung', () => {
    const out = normalizeImprovements([
      { exerciseId: 'a', text: 'alt', createdAt: '2026-10-01T00:00:00Z' },
      { exerciseId: 'a', text: 'neu', createdAt: '2026-10-03T00:00:00Z' },
      { exerciseId: 'B!', text: 'ungültig', createdAt: '2026-10-03T00:00:00Z' },
      { exerciseId: 'b', text: 'b', createdAt: 'x' },
    ]);
    expect(out).toEqual([{ exercise: 'a', text: 'neu', createdAt: '2026-10-03T00:00:00Z' }]);
  });
});
