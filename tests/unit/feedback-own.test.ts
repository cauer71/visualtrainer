import { describe, expect, it } from 'vitest';
import type { Improvement, ReplyRow } from '../../src/feedback/logic';
import { createFeedbackStore, type StoreApi } from '../../src/feedback/store';
import {
  addOwn,
  buildThread,
  capOwn,
  idsToAsk,
  improvedAfterRating,
  isNewlyImproved,
  latestStarsByExercise,
  matchesRatedFilter,
  MAX_MINE_IDS,
  MAX_OWN,
  normalizeOwn,
  normalizeSeen,
  notificationCount,
  parseRatedFilter,
  unseenImprovementCount,
  unseenReplyCount,
  type OwnRating,
  type OwnRemote,
} from '../../src/feedback/own';

const own = (localId: string, exercise: string, stars: number | null, createdAt: string, serverId: number | null = null, comment = ''): OwnRating => ({
  localId,
  serverId,
  exercise,
  stars,
  comment,
  trainer: '',
  lang: 'de',
  createdAt,
  parentLocalId: null,
});
const rep = (id: number, feedbackId: number, createdAt: string): ReplyRow => ({ id, feedbackId, text: `Antwort ${id}`, createdAt, improved: false });
const imp = (exercise: string, createdAt: string): Improvement => ({ exercise, text: 'besser', createdAt });

describe('normalizeOwn', () => {
  it('toleriert kaputten Speicher', () => {
    for (const bad of [null, undefined, 'x', 42, {}, [null, 'a', 3, {}, { exercise: 'a' }]]) expect(normalizeOwn(bad)).toEqual([]);
  });
  it('übernimmt gültige Einträge, säubert Werte und entfernt Dopplungen', () => {
    const good = own('l1', 'blitz', 4, '2026-10-03T10:00:00.000Z', 7, 'gut');
    const out = normalizeOwn([good, good, { ...good, localId: 'l2', stars: 9, comment: '' }, { ...good, localId: 'l3', exercise: 'Groß!' }, { ...good, localId: 'l4', createdAt: 'nie' }]);
    expect(out.map((r) => r.localId)).toEqual(['l1']);
    expect(normalizeOwn([{ ...good, localId: 'l5', serverId: -3, trainer: '<b>AB</b>', lang: 'it' }])[0]).toMatchObject({ serverId: null, trainer: 'bABb', lang: 'it' });
  });
  it('begrenzt auf die neuesten 500', () => {
    const many = Array.from({ length: MAX_OWN + 25 }, (_, i) => own(`l${i}`, 'blitz', 3, new Date(Date.UTC(2026, 0, 1) + i * 1000).toISOString()));
    const out = normalizeOwn(many);
    expect(out).toHaveLength(MAX_OWN);
    expect(out[0].localId).toBe('l25');
    expect(capOwn(addOwn(out, own('neu', 'x', 1, '2027-01-01T00:00:00.000Z')))).toHaveLength(MAX_OWN);
  });
});

describe('Auswertung', () => {
  const list = [own('a', 'blitz', 2, '2026-10-01T10:00:00Z', 1), own('b', 'blitz', 5, '2026-10-02T10:00:00Z', 2), own('c', 'ziel', null, '2026-10-02T11:00:00Z', null, 'nur Text')];
  it('neueste Sterne je Übung; Kommentar ohne Sterne gibt kein Sternenabzeichen', () => {
    const m = latestStarsByExercise(list);
    expect(m.get('blitz')).toBe(5);
    expect(m.has('ziel')).toBe(false);
  });
  it('fragt nur gesendete Nummern ab, neueste zuerst, höchstens 200', () => {
    expect(idsToAsk(list)).toEqual([2, 1]);
    const many = Array.from({ length: 300 }, (_, i) => own(`l${i}`, 'a', 3, new Date(Date.UTC(2026, 0, 1) + i * 1000).toISOString(), i + 1));
    const ids = idsToAsk(many);
    expect(ids).toHaveLength(MAX_MINE_IDS);
    expect(ids[0]).toBe(300);
  });
  it('Filter bewertet / unbewertet / verbessert', () => {
    const rated = new Set(['blitz']);
    const improved = new Set(['ziel']);
    expect(matchesRatedFilter('rated', 'blitz', rated, improved)).toBe(true);
    expect(matchesRatedFilter('unrated', 'blitz', rated, improved)).toBe(false);
    expect(matchesRatedFilter('unrated', 'ziel', rated, improved)).toBe(true);
    expect(matchesRatedFilter('improved', 'ziel', rated, improved)).toBe(true);
    expect(matchesRatedFilter('all', 'x', rated, improved)).toBe(true);
    expect(parseRatedFilter('quatsch')).toBe('all');
    expect(parseRatedFilter('improved')).toBe('improved');
  });
});

describe('Verbessert-Logik', () => {
  const seen = normalizeSeen({ improvements: '2026-10-05T00:00:00Z', replies: '2026-10-05T00:00:00Z' });
  const latest = own('a', 'blitz', 3, '2026-10-02T10:00:00Z', 1);
  it('verbessert nach der eigenen Bewertung', () => {
    expect(improvedAfterRating(imp('blitz', '2026-10-03T00:00:00Z'), latest)).toBe(true);
    expect(improvedAfterRating(imp('blitz', '2026-10-01T00:00:00Z'), latest)).toBe(false);
    expect(improvedAfterRating(imp('blitz', '2026-10-03T00:00:00Z'), undefined)).toBe(false);
  });
  it('„neu verbessert“: neuer als eigene Bewertung ODER neuer als der letzte Besuch', () => {
    expect(isNewlyImproved(imp('blitz', '2026-10-03T00:00:00Z'), latest, seen)).toBe(true); // nach Bewertung, vor Besuch
    expect(isNewlyImproved(imp('ziel', '2026-10-06T00:00:00Z'), undefined, seen)).toBe(true); // nach Besuch
    expect(isNewlyImproved(imp('ziel', '2026-10-03T00:00:00Z'), undefined, seen)).toBe(false);
    expect(isNewlyImproved(imp('blitz', '2026-10-01T00:00:00Z'), latest, seen)).toBe(false);
  });
  it('zählt Ungesehenes für den Hinweispunkt', () => {
    const list = [own('a', 'blitz', 3, '2026-10-02T10:00:00Z', 1), own('b', 'ziel', 3, '2026-10-02T10:00:00Z', 2)];
    const remote = new Map<number, OwnRemote>([
      [1, { exported: true, replies: [rep(1, 1, '2026-10-04T00:00:00Z'), rep(2, 1, '2026-10-06T00:00:00Z')] }],
      [2, { exported: true, replies: [rep(3, 2, '2026-10-07T00:00:00Z')] }],
      [99, { exported: true, replies: [rep(4, 99, '2026-10-07T00:00:00Z')] }], // nicht meine
    ]);
    const imps = [imp('blitz', '2026-10-06T00:00:00Z'), imp('ziel', '2026-10-01T00:00:00Z'), imp('allgemein', '2026-10-07T00:00:00Z')];
    expect(unseenReplyCount(remote, list, seen)).toBe(2);
    expect(unseenImprovementCount(imps, seen)).toBe(1);
    expect(notificationCount(remote, list, imps, seen)).toBe(3);
    const allSeen = normalizeSeen({ improvements: '2026-10-08T00:00:00Z', replies: '2026-10-08T00:00:00Z' });
    expect(notificationCount(remote, list, imps, allSeen)).toBe(0);
  });
  it('kaputter „gesehen“-Stand fällt auf den Anfang zurück', () => {
    expect(normalizeSeen('x').improvements).toBe(new Date(0).toISOString());
    expect(normalizeSeen({ improvements: 'kaputt' }).improvements).toBe(new Date(0).toISOString());
  });
});

describe('Gesprächsverlauf', () => {
  it('ordnet eigene Bewertungen und Antworten zeitlich', () => {
    const list = [own('a', 'blitz', 3, '2026-10-02T10:00:00Z', 1, 'zu schnell'), own('b', 'blitz', 4, '2026-10-06T10:00:00Z', 2, 'jetzt gut'), own('c', 'ziel', 2, '2026-10-03T10:00:00Z', 3)];
    const remote = new Map<number, OwnRemote>([[1, { exported: true, replies: [rep(1, 1, '2026-10-04T00:00:00Z')] }]]);
    expect(buildThread(list, remote, 'blitz').map((i) => i.kind)).toEqual(['own', 'reply', 'own']);
  });
});

function memStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return { data, getItem: (k: string) => data[k] ?? null, setItem: (k: string, v: string) => void (data[k] = v) };
}
const fakeApi = (over: Partial<StoreApi> = {}): StoreApi => ({
  send: async () => 1,
  loadMine: async () => [],
  loadImprovements: async () => [],
  ...over,
});
const offline = () => Object.assign(new Error('offline'), { status: 0 });
const input = (over: object = {}) => ({ exercise: 'blitz', stars: 3 as number | null, comment: '', trainer: '', lang: 'de' as const, ...over });

describe('Speicher der eigenen Bewertungen', () => {
  it('speichert lokal, überlebt ein Neuladen und trägt die Servernummer ein', async () => {
    const st = memStorage();
    const store = createFeedbackStore(st, fakeApi({ send: async () => 42 }));
    const res = await store.submit(input({ stars: 4, comment: ' gut ', trainer: 'AB' }));
    expect(res.status).toBe('sent');
    const reloaded = createFeedbackStore(st, fakeApi());
    expect(reloaded.getSnapshot().own).toMatchObject([{ exercise: 'blitz', stars: 4, comment: 'gut', serverId: 42, trainer: 'AB' }]);
  });

  it('bleibt bei Netzfehler als „nicht gesendet“ erhalten und wird später nachgesendet', async () => {
    let fail = true;
    const sent: unknown[] = [];
    const store = createFeedbackStore(
      memStorage(),
      fakeApi({
        send: async (i) => {
          if (fail) throw offline();
          sent.push(i);
          return 5;
        },
      }),
    );
    expect((await store.submit(input({ lang: 'it' }))).status).toBe('queued');
    expect(store.getSnapshot().own[0].serverId).toBeNull();
    await store.flush();
    expect(store.getSnapshot().own[0].serverId).toBeNull();
    fail = false;
    await store.flush();
    expect(store.getSnapshot().own[0].serverId).toBe(5);
    expect(sent).toMatchObject([{ exercise: 'blitz', stars: 3, lang: 'it' }]);
  });

  it('verwirft eine vom Server abgelehnte Bewertung (400), statt endlos zu wiederholen', async () => {
    const store = createFeedbackStore(memStorage(), fakeApi({ send: async () => Promise.reject(Object.assign(new Error('x'), { status: 400 })) }));
    await expect(store.submit(input())).rejects.toBeTruthy();
    expect(store.getSnapshot().own).toEqual([]);
  });

  it('arbeitet ohne Speicher und mit kaputtem Speicher', async () => {
    const broken = {
      getItem: () => {
        throw new Error('gesperrt');
      },
      setItem: () => {
        throw new Error('gesperrt');
      },
    };
    for (const st of [undefined, broken, memStorage({ 'blickfit:mine': '{kaputt', 'blickfit:seen': '[[' })]) {
      const store = createFeedbackStore(st, fakeApi());
      expect(store.getSnapshot().own).toEqual([]);
      await expect(store.submit(input())).resolves.toMatchObject({ status: 'sent' });
      await expect(store.refresh()).resolves.toBeUndefined();
    }
  });

  it('hängt eine neue Bewertung als Fortsetzung an, wenn der Entwickler geantwortet hat', async () => {
    const sent: any[] = [];
    let n = 0;
    const store = createFeedbackStore(
      memStorage(),
      fakeApi({
        send: async (i) => (sent.push(i), ++n),
        loadMine: async (ids) => ids.filter((id) => id === 1).map((id) => ({ id, exported: true, replies: [rep(1, id, '2026-10-04T00:00:00Z')] })),
      }),
    );
    await store.submit(input({ comment: 'zu schnell' }));
    await store.submit(input({ comment: 'noch ohne Antwort davor' }));
    expect(sent[1].replyTo).toBeUndefined();
    await store.refresh();
    await store.submit(input({ stars: 4, comment: 'jetzt besser' }));
    expect(sent[2].replyTo).toBe(1);
    const list = store.getSnapshot().own;
    expect(list[2].parentLocalId).toBe(list[0].localId);
  });

  it('Aktualisieren: offline bleibt der Zwischenspeicher, „gesehen“ löscht den Hinweis', async () => {
    const st = memStorage();
    let t = Date.parse('2026-10-10T10:00:00Z');
    const online = fakeApi({
      loadMine: async (ids) => ids.map((id) => ({ id, exported: true, replies: [rep(1, id, '2026-10-12T00:00:00Z')] })),
      loadImprovements: async () => [imp('blitz', '2026-10-13T00:00:00Z')],
    });
    const store = createFeedbackStore(st, online, () => t);
    await store.submit(input({ comment: 'x' }));
    await store.refresh();
    let snap = store.getSnapshot();
    expect(snap.remote.get(1)?.replies).toHaveLength(1);
    // erste Nutzung: bestehende Verbesserungen gelten nicht als neu, spätere schon (13.10. liegt nach „jetzt“)
    expect(unseenImprovementCount(snap.improvements, snap.seen)).toBe(1);
    t = Date.parse('2026-10-20T00:00:00Z');
    store.markSeen('improvements');
    store.markSeen('replies');
    snap = store.getSnapshot();
    expect(notificationCount(snap.remote, snap.own, snap.improvements, snap.seen)).toBe(0);
    // Neuladen: Zwischenspeicher und Gesehen-Stand sind da, auch wenn der Server nicht antwortet
    const again = createFeedbackStore(st, fakeApi({ loadMine: async () => Promise.reject(offline()), loadImprovements: async () => Promise.reject(offline()) }), () => t);
    await again.refresh();
    snap = again.getSnapshot();
    expect(snap.remote.get(1)?.replies).toHaveLength(1);
    expect(snap.improvements).toHaveLength(1);
    expect(notificationCount(snap.remote, snap.own, snap.improvements, snap.seen)).toBe(0);
  });
});
