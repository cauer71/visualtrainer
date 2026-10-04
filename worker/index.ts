/**
 * Mini-Backend für die Rückmeldungen der Trainer (Cloudflare Worker + D1-Datenbank).
 * Alles andere (die App selbst) liefern die statischen Dateien aus; der Worker läuft nur für /api/*.
 *
 *  POST /api/feedback              Rückmeldung abgeben (offen: Sterne 1–5 und/oder Kommentar, keine Namen)
 *  GET  /api/admin/feedback        alle Zeilen lesen            (Authorization: Bearer <Passwort>)
 *  POST /api/admin/clear {ids}     Kommentare der Zeilen löschen (Sterne bleiben erhalten)
 */
import { parseSubmission, type FeedbackRow } from '../src/feedback/logic';

interface D1Result<T = unknown> {
  results: T[];
}
interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
interface D1Database {
  prepare(query: string): D1Statement;
  batch(statements: D1Statement[]): Promise<unknown[]>;
}
export interface Env {
  DB: D1Database;
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** optional per `wrangler secret put ADMIN_PASSWORD`; sonst gilt das Standardpasswort */
  ADMIN_PASSWORD?: string;
}

const DEFAULT_PASSWORD = '726';
const MAX_BODY = 8_000;
const MAX_CLEAR = 500;
/** Sperre gegen Durchprobieren: nach 8 Fehlversuchen von einer Adresse 15 Minuten lang gesperrt */
const MAX_FAILS = 8;
const LOCK_MS = 15 * 60 * 1000;

let schemaReady: Promise<void> | null = null;
function ensureSchema(db: D1Database): Promise<void> {
  schemaReady ??= (async () => {
    await db.batch([
      db.prepare(
        `CREATE TABLE IF NOT EXISTS feedback (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           exercise TEXT NOT NULL,
           stars INTEGER,
           comment TEXT NOT NULL DEFAULT '',
           device TEXT NOT NULL DEFAULT '',
           trainer TEXT NOT NULL DEFAULT '',
           lang TEXT NOT NULL DEFAULT 'de',
           created_at TEXT NOT NULL
         )`,
      ),
      db.prepare('CREATE INDEX IF NOT EXISTS feedback_exercise ON feedback (exercise)'),
      db.prepare('CREATE TABLE IF NOT EXISTS auth_fail (ip TEXT PRIMARY KEY, count INTEGER NOT NULL, first_at INTEGER NOT NULL)'),
    ]);
    // Ältere Datenbanken (vor dem Kürzel) bekommen die Spalte nachträglich
    const cols = await db.prepare('PRAGMA table_info(feedback)').all<{ name: string }>();
    if (!cols.results.some((c) => c.name === 'trainer')) {
      await db.prepare("ALTER TABLE feedback ADD COLUMN trainer TEXT NOT NULL DEFAULT ''").run();
    }
  })().catch((e) => {
    schemaReady = null;
    throw e;
  });
  return schemaReady;
}

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

function sameText(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function readJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > MAX_BODY) throw new Error('zu groß');
  return JSON.parse(text);
}

/** `null` = Passwort stimmt; sonst die fertige Fehlerantwort. */
async function checkAdmin(request: Request, env: Env): Promise<Response | null> {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unbekannt';
  const now = Date.now();
  const row = await env.DB.prepare('SELECT count, first_at FROM auth_fail WHERE ip = ?').bind(ip).first<{ count: number; first_at: number }>();
  const active = row && now - row.first_at < LOCK_MS ? row : null;
  if (active && active.count >= MAX_FAILS) return json({ error: 'Zu viele Versuche. Bitte in 15 Minuten erneut probieren.' }, 429);
  const given = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (sameText(given, env.ADMIN_PASSWORD || DEFAULT_PASSWORD)) {
    if (row) await env.DB.prepare('DELETE FROM auth_fail WHERE ip = ?').bind(ip).run();
    return null;
  }
  if (active) await env.DB.prepare('UPDATE auth_fail SET count = count + 1 WHERE ip = ?').bind(ip).run();
  else await env.DB.prepare('INSERT OR REPLACE INTO auth_fail (ip, count, first_at) VALUES (?, 1, ?)').bind(ip, now).run();
  return json({ error: 'Falsches Passwort.' }, 401);
}

interface DbRow {
  id: number;
  exercise: string;
  stars: number | null;
  comment: string;
  trainer: string;
  lang: string;
  created_at: string;
}

async function handle(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  await ensureSchema(env.DB);

  if (path === '/api/feedback') {
    if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
    let body: unknown;
    try {
      body = await readJson(request);
    } catch {
      return json({ error: 'Ungültige Anfrage.' }, 400);
    }
    const parsed = parseSubmission(body);
    if (!parsed.ok) return json({ error: parsed.error }, 400);
    const v = parsed.value;
    await env.DB.prepare('INSERT INTO feedback (exercise, stars, comment, trainer, lang, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(v.exercise, v.stars, v.comment, v.trainer, v.lang, new Date().toISOString())
      .run();
    return json({ ok: true });
  }

  if (path === '/api/admin/feedback') {
    if (request.method !== 'GET') return json({ error: 'Nur GET.' }, 405);
    const denied = await checkAdmin(request, env);
    if (denied) return denied;
    const { results } = await env.DB.prepare('SELECT id, exercise, stars, comment, trainer, lang, created_at FROM feedback ORDER BY id').all<DbRow>();
    const rows: FeedbackRow[] = results.map((r) => ({ id: r.id, exercise: r.exercise, stars: r.stars, comment: r.comment, trainer: r.trainer, lang: r.lang, createdAt: r.created_at }));
    return json({ rows });
  }

  if (path === '/api/admin/clear') {
    if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
    const denied = await checkAdmin(request, env);
    if (denied) return denied;
    let body: unknown;
    try {
      body = await readJson(request);
    } catch {
      return json({ error: 'Ungültige Anfrage.' }, 400);
    }
    const ids = Array.isArray((body as { ids?: unknown })?.ids) ? ((body as { ids: unknown[] }).ids as unknown[]) : [];
    const clean = [...new Set(ids.filter((x): x is number => typeof x === 'number' && Number.isInteger(x) && x > 0))].slice(0, MAX_CLEAR);
    if (!clean.length) return json({ error: 'Keine Einträge angegeben.' }, 400);
    const marks = clean.map(() => '?').join(',');
    // Kommentar löschen, die Sterne bleiben; Zeilen ganz ohne Sterne und ohne Kommentar fallen weg
    await env.DB.batch([
      env.DB.prepare(`UPDATE feedback SET comment = '' WHERE id IN (${marks})`).bind(...clean),
      env.DB.prepare(`DELETE FROM feedback WHERE id IN (${marks}) AND stars IS NULL AND comment = ''`).bind(...clean),
    ]);
    return json({ ok: true, cleared: clean.length });
  }

  return json({ error: 'Nicht gefunden.' }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (!pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      return await handle(request, env);
    } catch {
      return json({ error: 'Serverfehler.' }, 500);
    }
  },
};
