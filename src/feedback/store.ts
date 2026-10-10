/**
 * Lokaler Speicher der eigenen Bewertungen (es gibt keine Konten: „meine“ = auf diesem Gerät abgegeben).
 * Die Fabrik bekommt Speicher und Netzzugriff hereingereicht, damit sie ohne Browser testbar ist;
 * `feedbackStore` unten ist die Instanz der App. Ohne localStorage oder ohne Server arbeitet alles weiter (nur lokal).
 */
import { brand } from '../config/brand';
import { loadImprovements, loadMine, sendFeedback } from './client';
import { normalizeReplies, type Improvement, type ReplyRow, type Submission } from './logic';
import {
  addOwn,
  idsToAsk,
  NO_SERVER_ID,
  newLocalId,
  normalizeOwn,
  normalizeSeen,
  ratingsFor,
  unsent,
  type OwnRating,
  type OwnRemote,
  type SeenState,
} from './own';
import { normalizeImprovements } from './logic';

export interface StoreSnapshot {
  own: OwnRating[];
  remote: Map<number, OwnRemote>;
  improvements: Improvement[];
  seen: SeenState;
}

export interface StoreApi {
  send(input: Submission): Promise<number | null>;
  loadMine(ids: number[]): Promise<Array<{ id: number; exported: boolean; replies: ReplyRow[] }>>;
  loadImprovements(): Promise<Improvement[]>;
}

type Storage_ = Pick<Storage, 'getItem' | 'setItem'> | undefined;

export interface SendInput {
  exercise: string;
  stars: number | null;
  comment: string;
  trainer: string;
  lang: 'de' | 'it';
}

/** 'sent' = beim Server angekommen, 'queued' = nur lokal gespeichert (noch nicht gesendet, wird später erneut versucht) */
export type SubmitResult = { status: 'sent' | 'queued'; rating: OwnRating };

const isPermanent = (e: unknown): boolean => (e as { status?: number } | null)?.status === 400;

export function createFeedbackStore(storage: Storage_, api: StoreApi, now: () => number = Date.now) {
  const KEY = `${brand.storageKey}:mine`;
  const REMOTE_KEY = `${brand.storageKey}:mineRemote`;
  const SEEN_KEY = `${brand.storageKey}:seen`;

  const read = (key: string): unknown => {
    try {
      const raw = storage?.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const write = (key: string, value: unknown): void => {
    try {
      storage?.setItem(key, JSON.stringify(value));
    } catch {
      /* ohne Speicher (privater Modus, voll) weiterarbeiten */
    }
  };

  let own = normalizeOwn(read(KEY));
  const cached = read(REMOTE_KEY) as { improvements?: unknown; items?: unknown } | null;
  let improvements = normalizeImprovements(cached?.improvements);
  let remote = new Map<number, OwnRemote>();
  if (Array.isArray(cached?.items)) {
    for (const it of cached!.items as Array<Record<string, unknown>>) {
      if (typeof it?.id === 'number') remote.set(it.id, { exported: it.exported === true, replies: normalizeReplies(it.replies) });
    }
  }
  const storedSeen = read(SEEN_KEY);
  let seen = normalizeSeen(storedSeen);
  let seenKnown = storedSeen !== null;

  let snapshot: StoreSnapshot = { own, remote, improvements, seen };
  const listeners = new Set<() => void>();
  const emit = () => {
    snapshot = { own, remote, improvements, seen };
    for (const l of listeners) l();
  };
  const persistOwn = () => write(KEY, own);
  const persistRemote = () => write(REMOTE_KEY, { improvements, items: [...remote].map(([id, r]) => ({ id, exported: r.exported, replies: r.replies })) });
  const persistSeen = () => write(SEEN_KEY, seen);

  let flushing: Promise<void> | null = null;

  /** Sendet einen lokal gespeicherten Eintrag; bei Erfolg trägt er die Nummer des Servers. */
  async function transmit(r: OwnRating): Promise<void> {
    const parent = r.parentLocalId ? own.find((x) => x.localId === r.parentLocalId) : undefined;
    const input: Submission = { exercise: r.exercise, stars: r.stars, comment: r.comment, trainer: r.trainer, lang: r.lang };
    if (parent?.serverId && parent.serverId < NO_SERVER_ID) input.replyTo = parent.serverId;
    const id = await api.send(input);
    // Nennt der Server keine Nummer, gilt der Eintrag trotzdem als gesendet (Ersatznummer, wird nie abgefragt)
    const serverId = id ?? NO_SERVER_ID + (fallback++ % 1_000_000);
    own = own.map((x) => (x.localId === r.localId ? { ...x, serverId } : x));
    persistOwn();
    emit();
  }
  let fallback = 0;

  const api_ = {
    subscribe(fn: () => void): () => void {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    getSnapshot: (): StoreSnapshot => snapshot,

    /** Bewertung abgeben: erst lokal sichern, dann senden. Scheitert das Senden (offline), bleibt sie als „nicht gesendet“ erhalten. */
    async submit(input: SendInput): Promise<SubmitResult> {
      // Antwortet der Trainer auf eine beantwortete Bewertung, hängt die neue als Fortsetzung am Gespräch
      const prior = [...ratingsFor(own, input.exercise)].reverse().find((r) => r.serverId !== null && (remote.get(r.serverId)?.replies.length ?? 0) > 0);
      const rating: OwnRating = {
        localId: newLocalId(now()),
        serverId: null,
        exercise: input.exercise,
        stars: input.stars,
        comment: input.comment.trim(),
        trainer: input.trainer,
        lang: input.lang,
        createdAt: new Date(now()).toISOString(),
        parentLocalId: input.comment.trim() && prior ? prior.localId : null,
      };
      own = addOwn(own, rating);
      persistOwn();
      emit();
      try {
        await transmit(rating);
        return { status: 'sent', rating: own.find((x) => x.localId === rating.localId) ?? rating };
      } catch (e) {
        if (isPermanent(e)) {
          own = own.filter((x) => x.localId !== rating.localId);
          persistOwn();
          emit();
          throw e;
        }
        return { status: 'queued', rating };
      }
    },

    /** Versucht alle noch nicht gesendeten Bewertungen erneut (der Reihe nach, bricht beim ersten Netzfehler ab) */
    flush(): Promise<void> {
      flushing ??= (async () => {
        for (const r of unsent(own)) {
          const current = own.find((x) => x.localId === r.localId);
          if (!current || current.serverId !== null) continue;
          try {
            await transmit(current);
          } catch (e) {
            if (isPermanent(e)) {
              own = own.filter((x) => x.localId !== r.localId);
              persistOwn();
              emit();
              continue;
            }
            break;
          }
        }
      })().finally(() => {
        flushing = null;
      });
      return flushing;
    },

    /** Holt Antworten und „verbessert“-Meldungen; Fehler (offline, keine Schnittstelle) werden verschluckt, der Zwischenspeicher bleibt */
    async refresh(): Promise<void> {
      await api_.flush().catch(() => undefined);
      let changed = false;
      try {
        const items = await api.loadMine(idsToAsk(own));
        const next = new Map(remote);
        for (const it of items) next.set(it.id, { exported: it.exported, replies: it.replies });
        remote = next;
        changed = true;
      } catch {
        /* offline: letzten Stand behalten */
      }
      try {
        improvements = await api.loadImprovements();
        if (!seenKnown) {
          // erste Nutzung: bisherige Verbesserungen gelten nicht als „neu seit dem letzten Besuch“
          seen = { ...seen, improvements: new Date(now()).toISOString() };
          seenKnown = true;
          persistSeen();
        }
        changed = true;
      } catch {
        /* wie oben */
      }
      if (changed) {
        persistRemote();
        emit();
      }
    },

    /** „Gesehen“ setzen (Verbessert-Liste bzw. Meine Bewertungen geöffnet) */
    markSeen(kind: 'improvements' | 'replies'): void {
      const latest = (kind === 'improvements' ? improvements.map((i) => i.createdAt) : [...remote.values()].flatMap((r) => r.replies.map((x) => x.createdAt))).reduce(
        (m, t) => Math.max(m, Date.parse(t)),
        0,
      );
      const at = new Date(Math.max(now(), latest)).toISOString();
      if (seen[kind] >= at) return;
      seen = { ...seen, [kind]: at };
      seenKnown = true;
      persistSeen();
      emit();
    },
  };
  return api_;
}

function browserStorage(): Storage_ {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export const feedbackStore = createFeedbackStore(browserStorage(), {
  send: sendFeedback,
  loadMine,
  loadImprovements,
});
