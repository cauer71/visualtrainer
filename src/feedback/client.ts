/** Browser-Seite der Rückmeldungen: Gerätekennung, Senden und Entwickler-Abfragen. */
import { brand } from '../config/brand';
import type { FeedbackRow, Submission } from './logic';

const DEVICE_KEY = `${brand.storageKey}:device`;
const STARS_KEY = `${brand.storageKey}:stars`;
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

/** Zufällige Kennung dieses Geräts (keine Person): damit zählt ein Gerät je Übung nur mit seiner letzten Bewertung. */
export function deviceId(): string {
  let id = read(globalThis.localStorage, DEVICE_KEY);
  if (!id || !/^[A-Za-z0-9-]{8,64}$/.test(id)) {
    id = globalThis.crypto?.randomUUID?.() ?? `d${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    write(globalThis.localStorage, DEVICE_KEY, id);
  }
  return id;
}

export function lastStars(exercise: string): number | null {
  try {
    const v = JSON.parse(read(globalThis.localStorage, STARS_KEY) ?? '{}') as Record<string, number>;
    const n = v[exercise];
    return typeof n === 'number' && n >= 1 && n <= 5 ? n : null;
  } catch {
    return null;
  }
}

function rememberStars(exercise: string, stars: number): void {
  try {
    const v = JSON.parse(read(globalThis.localStorage, STARS_KEY) ?? '{}') as Record<string, number>;
    v[exercise] = stars;
    write(globalThis.localStorage, STARS_KEY, JSON.stringify(v));
  } catch {
    /* egal */
  }
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

export async function sendFeedback(input: Omit<Submission, 'device'>): Promise<void> {
  await call('/api/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...input, device: deviceId() }),
  });
  if (input.stars !== null) rememberStars(input.exercise, input.stars);
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
