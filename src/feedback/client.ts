/** Browser-Seite der Rückmeldungen: Kürzel, Senden und Entwickler-Abfragen. */
import { brand } from '../config/brand';
import { cleanTrainer, normalizeImprovements, normalizeReplies, type FeedbackRow, type Improvement, type ReplyRow, type Submission } from './logic';

const TRAINER_KEY = `${brand.storageKey}:trainer`;
const PASSWORD_KEY = `${brand.storageKey}:dev`;

function read(storage: Storage | undefined, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function write(storage: Storage | undefined, key: string, value: string | null): void {
  try {
    if (value === null) storage?.removeItem(key);
    else storage?.setItem(key, value);
  } catch {
    /* privater Modus o. Ä.: ohne Speicher weiterarbeiten */
  }
}

/** Zuletzt benutztes Kürzel auf diesem Gerät (nur zur Vorbelegung; bleibt im Browser, wird nur mit einer Rückmeldung gesendet). */
export function savedTrainer(): string {
  return cleanTrainer(read(globalThis.localStorage, TRAINER_KEY));
}
export function saveTrainer(trainer: string): void {
  write(globalThis.localStorage, TRAINER_KEY, cleanTrainer(trainer) || null);
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, { cache: 'no-store', ...init });
  } catch {
    throw new ApiError('offline', 0);
  }
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* keine JSON-Antwort (z. B. lokale Vorschau ohne Worker) */
  }
  if (!res.ok) throw new ApiError((data as { error?: string } | null)?.error ?? `Fehler ${res.status}`, res.status);
  if (data === null) throw new ApiError('Keine Antwort vom Server.', res.status);
  return data as T;
}

/** Sendet eine Rückmeldung; liefert die Nummer auf dem Server (null, falls der Server keine nennt) */
export async function sendFeedback(input: Submission): Promise<number | null> {
  const res = await call<{ id?: unknown }>('/api/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  saveTrainer(input.trainer);
  return typeof res.id === 'number' ? res.id : null;
}

/** Antworten und Exportstatus eigener Rückmeldungen (nur die angefragten Nummern) */
export async function loadMine(ids: number[]): Promise<Array<{ id: number; exported: boolean; replies: ReplyRow[] }>> {
  if (!ids.length) return [];
  const res = await call<{ items?: unknown }>(`/api/feedback/mine?ids=${ids.join(',')}`);
  if (!Array.isArray(res.items)) return [];
  const out: Array<{ id: number; exported: boolean; replies: ReplyRow[] }> = [];
  for (const it of res.items as Array<Record<string, unknown>>) {
    if (typeof it?.id !== 'number') continue;
    out.push({ id: it.id, exported: it.exported === true, replies: normalizeReplies(it.replies).map((r) => ({ ...r, feedbackId: it.id as number })) });
  }
  return out;
}

/** Neueste „Übung verbessert“-Meldung je Übung */
export async function loadImprovements(): Promise<Improvement[]> {
  const res = await call<{ items?: unknown }>('/api/improvements');
  return normalizeImprovements(res.items);
}

// ---------------------------------------------------------------- Entwickler

/** Das Passwort bleibt nur für diese Browser-Sitzung (Tab) gespeichert. */
export const devPassword = {
  get: () => read(globalThis.sessionStorage, PASSWORD_KEY),
  set: (pw: string) => write(globalThis.sessionStorage, PASSWORD_KEY, pw),
  clear: () => write(globalThis.sessionStorage, PASSWORD_KEY, null),
};

const auth = (pw: string) => ({ authorization: `Bearer ${pw}` });

export async function loadFeedback(pw: string): Promise<{ rows: FeedbackRow[]; improvements: Improvement[] }> {
  const res = await call<{ rows: FeedbackRow[]; improvements?: Improvement[] }>('/api/admin/feedback?includeExported=1', { headers: auth(pw) });
  return { rows: res.rows, improvements: res.improvements ?? [] };
}

const post = (pw: string, path: string, body: unknown) =>
  call<Record<string, unknown>>(path, { method: 'POST', headers: { ...auth(pw), 'content-type': 'application/json' }, body: JSON.stringify(body) });

/** Markiert Kommentare als exportiert (Archiv: der Text bleibt erhalten). */
export async function markExported(pw: string, ids: number[]): Promise<void> {
  await post(pw, '/api/admin/export', { ids });
}

/** Antwort schreiben (an einen Kommentar oder, ohne `feedbackId`, an alle exportierten unbeantworteten der Übung). */
export async function sendReply(pw: string, input: { exerciseId: string; text: string; improved: boolean; feedbackId?: number }): Promise<{ replies: number }> {
  return (await post(pw, '/api/admin/reply', input)) as { replies: number };
}

/** Löscht EINEN Eintrag endgültig (Sterne, Kommentar, Antworten) – nur nach ausdrücklicher Bestätigung. */
export async function deleteFeedback(pw: string, id: number): Promise<void> {
  await post(pw, '/api/admin/delete', { id, confirm: true });
}
