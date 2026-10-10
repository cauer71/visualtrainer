/** Kleine D1-Attrappe auf Basis von node:sqlite (echtes SQL, im Speicher) für Tests des Workers. */
import { DatabaseSync } from 'node:sqlite';
import type { D1Database } from '../../worker/index';

type Param = string | number | null;

export function createFakeD1(): { db: D1Database; raw: DatabaseSync } {
  const raw = new DatabaseSync(':memory:');
  const make = (sql: string, params: Param[] = []) => ({
    bind: (...values: unknown[]) => make(sql, values as Param[]),
    first: async <T>() => ((raw.prepare(sql).get(...params) as T | undefined) ?? null),
    all: async <T>() => ({ results: raw.prepare(sql).all(...params) as T[] }),
    run: async () => {
      const r = raw.prepare(sql).run(...params);
      return { meta: { last_row_id: Number(r.lastInsertRowid), changes: Number(r.changes) } };
    },
  });
  const db = {
    prepare: (sql: string) => make(sql),
    // D1-batch läuft als eine Transaktion
    batch: async (statements: Array<{ run(): Promise<unknown> }>) => {
      raw.exec('BEGIN');
      try {
        const out: unknown[] = [];
        for (const s of statements) out.push(await s.run());
        raw.exec('COMMIT');
        return out;
      } catch (e) {
        raw.exec('ROLLBACK');
        throw e;
      }
    },
  } as unknown as D1Database;
  return { db, raw };
}
