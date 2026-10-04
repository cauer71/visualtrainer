/** Browser-Seite der Rückmeldungen: Kürzel, Senden und Entwickler-Abfragen. */
import { brand } from '../config/brand';
import { cleanTrainer, type FeedbackRow, type Submission } from './logic';

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

export async function sendFeedback(input: Submission): Promise<void> {
  await call('/api/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  saveTrainer(input.trainer);
}

// ---------------------------------------------------------------- Entwickler

/** Das Passwort bleibt nur für diese Browser-Sitzung (Tab) gespeichert. */
export const devPassword = {
  get: () => read(globalThis.sessionStorage, PASSWORD_KEY),
  set: (pw: string) => write(globalThis.sessionStorage, PASSWORD_KEY, pw),
  clear: () => write(globalThis.sessionStorage, PASSWORD_KEY, null),
};

const auth = (pw: string) => ({ authorization: `Bearer ${pw}` });

export async function loadFeedback(pw: string): Promise<FeedbackRow[]> {
  return (await call<{ rows: FeedbackRow[] }>('/api/admin/feedback', { headers: auth(pw) })).rows;
}

/** Löscht die Kommentare der angegebenen Zeilen (die Sterne bleiben). */
export async function clearComments(pw: string, ids: number[]): Promise<void> {
  await call('/api/admin/clear', { method: 'POST', headers: { ...auth(pw), 'content-type': 'application/json' }, body: JSON.stringify({ ids }) });
}
