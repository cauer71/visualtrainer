/**
 * Mini-Backend für die Rückmeldungen der Trainer (Cloudflare Worker + D1-Datenbank).
 * Alles andere (die App selbst) liefern die statischen Dateien aus; der Worker läuft nur für /api/*.
 *
 *  Offen (ohne Namen, mit Mengenbegrenzung je Adresse):
 *  POST /api/feedback              Rückmeldung abgeben (Sterne 1–5 und/oder Kommentar, optional replyTo) → { ok, id }
 *  GET  /api/feedback/mine?ids=1,2 Antworten und Exportstatus der angefragten (eigenen) Rückmeldungen, höchstens 200 Nummern
 *  GET  /api/improvements          neueste „Übung verbessert“-Meldung je Übung
 *
 *  Entwickler (Authorization: Bearer <Passwort>):
 *  GET  /api/admin/feedback[?includeExported=1]  Zeilen mit Antworten (Standard: nur noch nicht exportierte) + Verbesserungen
 *  POST /api/admin/export {ids}    als exportiert markieren (Archiv, nichts wird gelöscht); /api/admin/clear ist derselbe Aufruf
 *  POST /api/admin/reply {feedbackId?, exerciseId, text, improved?, includeUnexported?}  Antwort(en) schreiben
 *  POST /api/admin/delete {id, confirm: true}    EINEN Eintrag endgültig löschen (nur ausdrücklich)
 */
import { parseReply, parseSubmission, GENERAL_ID, type FeedbackRow, type Improvement, type ReplyRow } from '../src/feedback/logic';

interface D1Result<T = unknown> {
  results: T[];
}
interface D1RunResult {
  meta?: { last_row_id?: number; changes?: number };
}
interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
export interface D1Database {
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
const MAX_MINE_IDS = 200;
/** Sperre gegen Durchprobieren: nach 8 Fehlversuchen von einer Adresse 15 Minuten lang gesperrt */
const MAX_FAILS = 8;
const LOCK_MS = 15 * 60 * 1000;
/** Mengenbegrenzung der offenen Aufrufe je Adresse: [Aufrufe, Zeitfenster in ms] */
const LIMITS = {
  submit: [60, 60 * 60 * 1000],
  mine: [120, 10 * 60 * 1000],
  improvements: [120, 10 * 60 * 1000],
} as const;

/** Spalten, die ältere Datenbanken nachträglich bekommen (ALTER TABLE, wiederholbar: es wird vorher geprüft) */
const FEEDBACK_COLUMNS: Array<[string, string]> = [
  ['trainer', "TEXT NOT NULL DEFAULT ''"],
  ['exported_at', 'TEXT'],
  ['parent_id', 'INTEGER'],
];

const schemaReady = new WeakMap<D1Database, Promise<void>>();
/** Legt Tabellen an und ergänzt fehlende Spalten; idempotent, läuft je Worker-Instanz einmal. */
export function ensureSchema(db: D1Database): Promise<void> {
  let p = schemaReady.get(db);
  if (!p) {
    p = (async () => {
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
        db.prepare('CREATE TABLE IF NOT EXISTS rate_limit (key TEXT PRIMARY KEY, count INTEGER NOT NULL, first_at INTEGER NOT NULL)'),
        db.prepare(
          `CREATE TABLE IF NOT EXISTS replies (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             feedback_id INTEGER NOT NULL,
             exercise TEXT NOT NULL,
             text TEXT NOT NULL,
             improved INTEGER NOT NULL DEFAULT 0,
             created_at TEXT NOT NULL
           )`,
        ),
        db.prepare('CREATE INDEX IF NOT EXISTS replies_feedback ON replies (feedback_id)'),
        db.prepare(
          `CREATE TABLE IF NOT EXISTS improvements (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             exercise TEXT NOT NULL,
             text TEXT NOT NULL,
             created_at TEXT NOT NULL
           )`,
        ),
        db.prepare('CREATE INDEX IF NOT EXISTS improvements_exercise ON improvements (exercise)'),
      ]);
      // Ältere Datenbanken (vor Kürzel, Archiv, Gespräch) bekommen die Spalten nachträglich
      const cols = await db.prepare('PRAGMA table_info(feedback)').all<{ name: string }>();
      for (const [name, type] of FEEDBACK_COLUMNS) {
        if (!cols.results.some((c) => c.name === name)) await db.prepare(`ALTER TABLE feedback ADD COLUMN ${name} ${type}`).run();
      }
    })().catch((e) => {
      schemaReady.delete(db);
      throw e;
    });
    schemaReady.set(db, p);
  }
  return p;
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

/** Zählt einen Aufruf; `false` = Grenze erreicht (die Anfrage soll abgewiesen werden). */
async function allow(env: Env, request: Request, bucket: keyof typeof LIMITS): Promise<boolean> {
  const [max, windowMs] = LIMITS[bucket];
  const key = `${bucket}:${request.headers.get('cf-connecting-ip') ?? 'unbekannt'}`;
  const now = Date.now();
  const row = await env.DB.prepare('SELECT count, first_at FROM rate_limit WHERE key = ?').bind(key).first<{ count: number; first_at: number }>();
  if (!row || now - row.first_at >= windowMs) {
    await env.DB.prepare('INSERT OR REPLACE INTO rate_limit (key, count, first_at) VALUES (?, 1, ?)').bind(key, now).run();
    return true;
  }
  if (row.count >= max) return false;
  await env.DB.prepare('UPDATE rate_limit SET count = count + 1 WHERE key = ?').bind(key).run();
  return true;
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
  exported_at: string | null;
  parent_id: number | null;
}
interface DbReply {
  id: number;
  feedback_id: number;
  text: string;
  improved: number;
  created_at: string;
}
interface DbImprovement {
  exercise: string;
  text: string;
  created_at: string;
}

const toReply = (r: DbReply): ReplyRow => ({ id: r.id, feedbackId: r.feedback_id, text: r.text, createdAt: r.created_at, improved: !!r.improved });

/** Gelesener JSON-Körper oder die fertige Fehlerantwort */
async function body(request: Request): Promise<unknown> {
  try {
    return await readJson(request);
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
}

function idList(raw: unknown, max: number): number[] {
  const ids = Array.isArray(raw) ? raw : [];
  return [...new Set(ids.filter((x): x is number => typeof x === 'number' && Number.isInteger(x) && x > 0))].slice(0, max);
}

async function handle(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  await ensureSchema(env.DB);
  const db = env.DB;

  if (path === '/api/feedback') {
    if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
    if (!(await allow(env, request, 'submit'))) return json({ error: 'Zu viele Rückmeldungen. Bitte später noch einmal.' }, 429);
    const raw = await body(request);
    if (raw instanceof Response) return raw;
    const parsed = parseSubmission(raw);
    if (!parsed.ok) return json({ error: parsed.error }, 400);
    const v = parsed.value;
    const res = (await db
      .prepare('INSERT INTO feedback (exercise, stars, comment, trainer, lang, created_at, parent_id) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(v.exercise, v.stars, v.comment, v.trainer, v.lang, new Date().toISOString(), v.replyTo ?? null)
      .run()) as D1RunResult | undefined;
    return json({ ok: true, id: res?.meta?.last_row_id ?? null });
  }

  // Antworten und Exportstatus nur für die angefragten Nummern; weder Kommentare noch Kürzel anderer werden ausgegeben
  if (path === '/api/feedback/mine') {
    if (request.method !== 'GET') return json({ error: 'Nur GET.' }, 405);
    const parts = (url.searchParams.get('ids') ?? '').split(',').filter(Boolean);
    if (parts.length > MAX_MINE_IDS) return json({ error: `Höchstens ${MAX_MINE_IDS} Nummern.` }, 400);
    const ids = idList(parts.map((x) => (/^\d{1,12}$/.test(x) ? Number(x) : NaN)), MAX_MINE_IDS);
    if (!ids.length) return json({ items: [] });
    if (!(await allow(env, request, 'mine'))) return json({ error: 'Zu viele Anfragen. Bitte später noch einmal.' }, 429);
    const marks = ids.map(() => '?').join(',');
    const rows = await db.prepare(`SELECT id, exported_at FROM feedback WHERE id IN (${marks})`).bind(...ids).all<{ id: number; exported_at: string | null }>();
    const reps = await db
      .prepare(`SELECT id, feedback_id, text, improved, created_at FROM replies WHERE feedback_id IN (${marks}) ORDER BY id`)
      .bind(...ids)
      .all<DbReply>();
    const items = rows.results.map((r) => ({
      id: r.id,
      exported: !!r.exported_at,
      replies: reps.results.filter((x) => x.feedback_id === r.id).map((x) => ({ id: x.id, text: x.text, createdAt: x.created_at, improved: !!x.improved })),
    }));
    return json({ items });
  }

  if (path === '/api/improvements') {
    if (request.method !== 'GET') return json({ error: 'Nur GET.' }, 405);
    if (!(await allow(env, request, 'improvements'))) return json({ error: 'Zu viele Anfragen. Bitte später noch einmal.' }, 429);
    const { results } = await db
      .prepare('SELECT exercise, text, created_at FROM improvements WHERE id IN (SELECT MAX(id) FROM improvements GROUP BY exercise) ORDER BY id')
      .all<DbImprovement>();
    return json({ items: results.map((r) => ({ exerciseId: r.exercise, text: r.text, createdAt: r.created_at })) });
  }

  if (path.startsWith('/api/admin/')) {
    const denied = await checkAdmin(request, env);
    if (denied) return denied;

    if (path === '/api/admin/feedback') {
      if (request.method !== 'GET') return json({ error: 'Nur GET.' }, 405);
      const all = url.searchParams.get('includeExported') === '1';
      const { results } = await db
        .prepare(`SELECT id, exercise, stars, comment, trainer, lang, created_at, exported_at, parent_id FROM feedback ${all ? '' : 'WHERE exported_at IS NULL'} ORDER BY id`)
        .all<DbRow>();
      const reps = await db.prepare('SELECT id, feedback_id, text, improved, created_at FROM replies ORDER BY id').all<DbReply>();
      const byFeedback = new Map<number, ReplyRow[]>();
      for (const r of reps.results) byFeedback.set(r.feedback_id, [...(byFeedback.get(r.feedback_id) ?? []), toReply(r)]);
      const rows: FeedbackRow[] = results.map((r) => ({
        id: r.id,
        exercise: r.exercise,
        stars: r.stars,
        comment: r.comment,
        trainer: r.trainer,
        lang: r.lang,
        createdAt: r.created_at,
        exportedAt: r.exported_at,
        parentId: r.parent_id,
        replies: byFeedback.get(r.id) ?? [],
      }));
      const imps = await db.prepare('SELECT exercise, text, created_at FROM improvements ORDER BY id DESC').all<DbImprovement>();
      const improvements: Improvement[] = imps.results.map((r) => ({ exercise: r.exercise, text: r.text, createdAt: r.created_at }));
      return json({ rows, improvements });
    }

    // Archiv statt Löschen: der Text bleibt, nur `exported_at` wird gesetzt (/clear = alter Name desselben Aufrufs)
    if (path === '/api/admin/export' || path === '/api/admin/clear') {
      if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
      const raw = await body(request);
      if (raw instanceof Response) return raw;
      const ids = idList((raw as { ids?: unknown } | null)?.ids, MAX_CLEAR);
      if (!ids.length) return json({ error: 'Keine Einträge angegeben.' }, 400);
      const marks = ids.map(() => '?').join(',');
      await db
        .prepare(`UPDATE feedback SET exported_at = ? WHERE id IN (${marks}) AND exported_at IS NULL`)
        .bind(new Date().toISOString(), ...ids)
        .run();
      return json({ ok: true, exported: ids.length });
    }

    if (path === '/api/admin/reply') {
      if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
      const raw = await body(request);
      if (raw instanceof Response) return raw;
      const parsed = parseReply(raw);
      if (!parsed.ok) return json({ error: parsed.error }, 400);
      const v = parsed.value;
      let targets: number[];
      let skippedUnexported = 0;
      if (v.feedbackId !== null) {
        const row = await db.prepare('SELECT id, exercise FROM feedback WHERE id = ?').bind(v.feedbackId).first<{ id: number; exercise: string }>();
        if (!row) return json({ error: 'Rückmeldung nicht gefunden.' }, 404);
        if (row.exercise !== v.exercise) return json({ error: 'Die Rückmeldung gehört zu einer anderen Übung.' }, 400);
        targets = [row.id];
      } else {
        // alle Kommentare der Übung ohne Antwort; Standard: nur bereits exportierte (spätere Kommentare sind noch nicht gesichtet)
        const { results } = await db
          .prepare("SELECT id, exported_at FROM feedback WHERE exercise = ? AND comment <> '' AND id NOT IN (SELECT feedback_id FROM replies) ORDER BY id")
          .bind(v.exercise)
          .all<{ id: number; exported_at: string | null }>();
        targets = results.filter((r) => v.includeUnexported || r.exported_at).map((r) => r.id);
        skippedUnexported = results.length - targets.length;
      }
      const now = new Date().toISOString();
      const improved = v.improved && v.exercise !== GENERAL_ID;
      const stmts = targets.map((id) =>
        db.prepare('INSERT INTO replies (feedback_id, exercise, text, improved, created_at) VALUES (?, ?, ?, ?, ?)').bind(id, v.exercise, v.text, improved ? 1 : 0, now),
      );
      if (improved) stmts.push(db.prepare('INSERT INTO improvements (exercise, text, created_at) VALUES (?, ?, ?)').bind(v.exercise, v.text, now));
      // Antworten gehören zum Archiv: beantwortete Kommentare gelten als exportiert
      if (targets.length) {
        stmts.push(db.prepare(`UPDATE feedback SET exported_at = ? WHERE exported_at IS NULL AND id IN (${targets.map(() => '?').join(',')})`).bind(now, ...targets));
      }
      if (stmts.length) await db.batch(stmts);
      return json({ ok: true, replies: targets.length, feedbackIds: targets, improvement: improved, skippedUnexported });
    }

    // Endgültiges Löschen: nur ein Eintrag je Aufruf und nur mit ausdrücklicher Bestätigung
    if (path === '/api/admin/delete') {
      if (request.method !== 'POST') return json({ error: 'Nur POST.' }, 405);
      const raw = await body(request);
      if (raw instanceof Response) return raw;
      const o = (raw ?? {}) as { id?: unknown; confirm?: unknown };
      if (typeof o.id !== 'number' || !Number.isInteger(o.id) || o.id < 1) return json({ error: 'id fehlt.' }, 400);
      if (o.confirm !== true) return json({ error: 'Bestätigung fehlt (confirm: true).' }, 400);
      const row = await db.prepare('SELECT id FROM feedback WHERE id = ?').bind(o.id).first<{ id: number }>();
      if (!row) return json({ error: 'Rückmeldung nicht gefunden.' }, 404);
      await db.batch([db.prepare('DELETE FROM replies WHERE feedback_id = ?').bind(o.id), db.prepare('DELETE FROM feedback WHERE id = ?').bind(o.id)]);
      return json({ ok: true, deleted: o.id });
    }
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
