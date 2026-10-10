import { beforeEach, describe, expect, it } from 'vitest';
import worker, { ensureSchema, type Env } from '../../worker/index';
import { createFakeD1 } from './_fake-d1';

const PW = 'test-pw';
let env: Env;
let raw: ReturnType<typeof createFakeD1>['raw'];

beforeEach(() => {
  const f = createFakeD1();
  raw = f.raw;
  env = { DB: f.db, ASSETS: { fetch: async () => new Response('asset') }, ADMIN_PASSWORD: PW };
});

async function call(method: string, path: string, data?: unknown, opts: { auth?: string | null; ip?: string } = {}) {
  const headers: Record<string, string> = { 'cf-connecting-ip': opts.ip ?? '1.2.3.4' };
  if (opts.auth !== null) headers.authorization = `Bearer ${opts.auth ?? PW}`;
  if (data !== undefined) headers['content-type'] = 'application/json';
  const res = await worker.fetch(new Request(`https://x.test${path}`, { method, headers, body: data === undefined ? undefined : JSON.stringify(data) }), env);
  return { status: res.status, body: (await res.json()) as any };
}
const rate = (exercise: string, stars: number | null, comment = '', extra: object = {}) => call('POST', '/api/feedback', { exercise, stars, comment, ...extra });
const adminRows = async (all = true) => (await call('GET', `/api/admin/feedback${all ? '?includeExported=1' : ''}`)).body.rows as any[];

describe('Datenbank-Schema', () => {
  it('migriert ein altes Schema (mit Kürzel, ohne Archiv) ohne Datenverlust und wiederholbar', async () => {
    raw.exec(`CREATE TABLE feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, exercise TEXT NOT NULL, stars INTEGER, comment TEXT NOT NULL DEFAULT '',
      device TEXT NOT NULL DEFAULT '', trainer TEXT NOT NULL DEFAULT '', lang TEXT NOT NULL DEFAULT 'de', created_at TEXT NOT NULL)`);
    raw.exec("INSERT INTO feedback (exercise, stars, comment, trainer, created_at) VALUES ('alt', 3, 'alter Kommentar', 'AB', '2026-01-01T00:00:00.000Z')");
    await ensureSchema(env.DB);
    await ensureSchema(createFakeD1().db); // anderes Objekt: läuft erneut, ohne Fehler
    const cols = (raw.prepare('PRAGMA table_info(feedback)').all() as { name: string }[]).map((c) => c.name);
    expect(cols).toEqual(expect.arrayContaining(['trainer', 'exported_at', 'parent_id']));
    // zweiter Lauf auf derselben, schon migrierten Datenbank (neue Worker-Instanz)
    const again = { prepare: env.DB.prepare, batch: env.DB.batch } as Env['DB'];
    await expect(ensureSchema(again)).resolves.toBeUndefined();
    const rows = await adminRows(false);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ exercise: 'alt', comment: 'alter Kommentar', trainer: 'AB', exportedAt: null, parentId: null, replies: [] });
  });
});

describe('POST /api/feedback und GET /api/feedback/mine', () => {
  it('gibt die Nummer zurück und speichert replyTo als parent_id', async () => {
    const a = await rate('blitz', 4, 'erste');
    expect(a.body).toMatchObject({ ok: true, id: 1 });
    const b = await rate('blitz', 5, 'zweite', { replyTo: a.body.id });
    expect(b.body.id).toBe(2);
    const rows = await adminRows();
    expect(rows.map((r) => r.parentId)).toEqual([null, 1]);
  });

  it('liefert nur die angefragten Nummern, ohne Kommentare und Kürzel anderer', async () => {
    await rate('blitz', 4, 'geheimer Kommentar', { trainer: 'XY' });
    await rate('blitz', 2, 'noch einer', { trainer: 'ZZ' });
    await call('POST', '/api/admin/reply', { exerciseId: 'blitz', feedbackId: 1, text: 'Danke, verbessert' });
    const res = await call('GET', '/api/feedback/mine?ids=1', undefined, { auth: null });
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0]).toMatchObject({ id: 1, exported: true, replies: [{ text: 'Danke, verbessert', improved: false }] });
    const text = JSON.stringify(res.body);
    expect(text).not.toContain('geheimer');
    expect(text).not.toContain('XY');
    expect(text).not.toContain('ZZ');
    expect((await call('GET', '/api/feedback/mine?ids=2,99,abc', undefined, { auth: null })).body.items.map((i: any) => i.id)).toEqual([2]);
    expect((await call('GET', '/api/feedback/mine', undefined, { auth: null })).body.items).toEqual([]);
  });

  it('begrenzt die Nummern auf 200', async () => {
    const ids = Array.from({ length: 201 }, (_, i) => i + 1).join(',');
    expect((await call('GET', `/api/feedback/mine?ids=${ids}`, undefined, { auth: null })).status).toBe(400);
  });

  it('bremst zu viele Rückmeldungen von einer Adresse', async () => {
    for (let i = 0; i < 60; i++) expect((await rate('blitz', 3)).status).toBe(200);
    expect((await rate('blitz', 3)).status).toBe(429);
    expect((await call('POST', '/api/feedback', { exercise: 'blitz', stars: 3 }, { ip: '9.9.9.9' })).status).toBe(200);
  });
});

describe('Export = Archiv', () => {
  it('markiert als exportiert, ohne etwas zu löschen; Standardabfrage zeigt nur Offenes', async () => {
    await rate('blitz', 4, 'Text A');
    await rate('blitz', 5, '');
    await rate('ziel', null, 'Text B');
    const res = await call('POST', '/api/admin/export', { ids: [1, 3] });
    expect(res.body).toMatchObject({ ok: true });
    const all = await adminRows(true);
    expect(all).toHaveLength(3);
    expect(all.find((r) => r.id === 1)).toMatchObject({ comment: 'Text A', stars: 4 });
    expect(all.find((r) => r.id === 1).exportedAt).toBeTruthy();
    expect(all.find((r) => r.id === 2).exportedAt).toBeNull();
    expect((await adminRows(false)).map((r) => r.id)).toEqual([2]);
    // der alte Name löscht ebenfalls nichts mehr
    await call('POST', '/api/admin/clear', { ids: [2] });
    expect(await adminRows(true)).toHaveLength(3);
  });

  it('verlangt das Passwort', async () => {
    expect((await call('POST', '/api/admin/export', { ids: [1] }, { auth: 'falsch' })).status).toBe(401);
    expect((await call('GET', '/api/admin/feedback', undefined, { auth: null })).status).toBe(401);
  });
});

describe('POST /api/admin/reply', () => {
  it('Sammelantwort geht an alle exportierten, unbeantworteten Kommentare der Übung und legt die Verbesserung an', async () => {
    await rate('blitz', 4, 'eins');
    await rate('blitz', 3, 'zwei');
    await rate('blitz', 3, 'neu, nicht exportiert');
    await rate('ziel', 3, 'andere Übung');
    await call('POST', '/api/admin/export', { ids: [1, 2, 4] });
    await call('POST', '/api/admin/reply', { exerciseId: 'blitz', feedbackId: 1, text: 'Einzelantwort' });
    const res = await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: 'Schrift größer', improved: true });
    expect(res.body).toMatchObject({ ok: true, replies: 1, feedbackIds: [2], improvement: true, skippedUnexported: 1 });
    const rows = await adminRows();
    expect(rows.find((r) => r.id === 1).replies).toHaveLength(1);
    expect(rows.find((r) => r.id === 2).replies[0]).toMatchObject({ text: 'Schrift größer', improved: true });
    expect(rows.find((r) => r.id === 3).replies).toEqual([]);
    expect(rows.find((r) => r.id === 4).replies).toEqual([]);
    const imps = await call('GET', '/api/improvements', undefined, { auth: null });
    expect(imps.body.items).toEqual([{ exerciseId: 'blitz', text: 'Schrift größer', createdAt: expect.any(String) }]);
    // mit includeUnexported erreicht die Sammelantwort auch den neuen Kommentar
    const more = await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: 'auch das', includeUnexported: true });
    expect(more.body).toMatchObject({ replies: 1, feedbackIds: [3] });
  });

  it('prüft Eingaben und Zuordnung', async () => {
    await rate('blitz', 4, 'eins');
    expect((await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: '' })).status).toBe(400);
    expect((await call('POST', '/api/admin/reply', { exerciseId: 'Groß!', text: 'x' })).status).toBe(400);
    expect((await call('POST', '/api/admin/reply', { exerciseId: 'blitz', feedbackId: 99, text: 'x' })).status).toBe(404);
    expect((await call('POST', '/api/admin/reply', { exerciseId: 'ziel', feedbackId: 1, text: 'x' })).status).toBe(400);
    expect((await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: 'x' }, { auth: 'falsch' })).status).toBe(401);
  });

  it('reine Ankündigung ohne Kommentare erzeugt nur die Verbesserung', async () => {
    const res = await call('POST', '/api/admin/reply', { exerciseId: 'ziel', text: 'Neues Tempo', improved: true });
    expect(res.body).toMatchObject({ ok: true, replies: 0, improvement: true });
  });
});

describe('GET /api/improvements', () => {
  it('liefert je Übung nur die neueste Meldung', async () => {
    await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: 'alt', improved: true });
    await call('POST', '/api/admin/reply', { exerciseId: 'ziel', text: 'Ziel neu', improved: true });
    await call('POST', '/api/admin/reply', { exerciseId: 'blitz', text: 'neuer', improved: true });
    const { body } = await call('GET', '/api/improvements', undefined, { auth: null });
    expect(body.items.map((i: any) => [i.exerciseId, i.text]).sort()).toEqual([
      ['blitz', 'neuer'],
      ['ziel', 'Ziel neu'],
    ]);
  });
});

describe('Endgültig löschen', () => {
  it('nur ausdrücklich, einzeln und bestätigt', async () => {
    await rate('blitz', 4, 'eins');
    await rate('blitz', 2, 'zwei');
    await call('POST', '/api/admin/reply', { exerciseId: 'blitz', feedbackId: 1, text: 'Antwort' });
    expect((await call('POST', '/api/admin/delete', { id: 1 })).status).toBe(400);
    expect((await call('POST', '/api/admin/delete', { ids: [1, 2], confirm: true })).status).toBe(400);
    expect(await adminRows()).toHaveLength(2);
    expect((await call('POST', '/api/admin/delete', { id: 99, confirm: true })).status).toBe(404);
    expect((await call('POST', '/api/admin/delete', { id: 1, confirm: true })).body).toMatchObject({ ok: true, deleted: 1 });
    expect((await adminRows()).map((r) => r.id)).toEqual([2]);
    expect(raw.prepare('SELECT COUNT(*) AS n FROM replies').get()).toEqual({ n: 0 });
  });
});
