/**
 * Eigene Bewertungen des Trainers auf diesem Gerät (es gibt keine Konten): reine Logik ohne Browser-Bezug.
 * Gespeichert wird im localStorage (siehe store.ts); alles hier arbeitet auf einfachen Daten und ist testbar.
 */
import { cleanTrainer, GENERAL_ID, MAX_COMMENT, type Improvement, type ReplyRow } from './logic';

/** Höchstens so viele eigene Bewertungen werden lokal behalten (die ältesten fallen zuerst weg) */
export const MAX_OWN = 500;
/** Höchstens so viele Nummern je Abfrage bei GET /api/feedback/mine */
export const MAX_MINE_IDS = 200;
/** Ersatznummern für gesendete Einträge, deren Server keine Nummer genannt hat (nie abfragen) */
export const NO_SERVER_ID = 2_000_000_000;

export interface OwnRating {
  /** lokale Kennung (stabil, auch bevor der Server eine Nummer vergeben hat) */
  localId: string;
  /** Nummer auf dem Server; null = noch nicht gesendet */
  serverId: number | null;
  exercise: string;
  stars: number | null;
  comment: string;
  trainer: string;
  lang: 'de' | 'it';
  /** ISO-Zeit (lokal vergeben) */
  createdAt: string;
  /** lokale Kennung der früheren Bewertung derselben Übung, auf die diese folgt */
  parentLocalId: string | null;
}

/** Was der Server über eigene Rückmeldungen weiß (Antworten, Exportstatus) */
export interface OwnRemote {
  exported: boolean;
  replies: ReplyRow[];
}

export interface SeenState {
  /** Zeitpunkt (ISO), bis zu dem „verbessert“-Meldungen als gesehen gelten */
  improvements: string;
  /** dasselbe für Antworten des Entwicklers */
  replies: string;
}

const EXERCISE_OK = /^[a-z0-9][a-z0-9-]{0,63}$/;
const time = (iso: string) => Date.parse(iso);
const validTime = (v: unknown): v is string => typeof v === 'string' && Number.isFinite(Date.parse(v));

/** Liest die gespeicherte Liste tolerant: Unbrauchbares fällt weg, Dopplungen werden entfernt, Obergrenze gilt */
export function normalizeOwn(raw: unknown): OwnRating[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: OwnRating[] = [];
  for (const r of raw) {
    if (!r || typeof r !== 'object') continue;
    const o = r as Record<string, unknown>;
    const exercise = typeof o.exercise === 'string' ? o.exercise : '';
    if (!EXERCISE_OK.test(exercise)) continue;
    let stars: number | null = null;
    if (typeof o.stars === 'number' && Number.isInteger(o.stars) && o.stars >= 1 && o.stars <= 5) stars = o.stars;
    const comment = typeof o.comment === 'string' ? o.comment.slice(0, MAX_COMMENT) : '';
    if (stars === null && !comment.trim()) continue;
    if (!validTime(o.createdAt)) continue;
    const localId = typeof o.localId === 'string' && o.localId && o.localId.length <= 40 ? o.localId : '';
    if (!localId || seen.has(localId)) continue;
    seen.add(localId);
    out.push({
      localId,
      serverId: typeof o.serverId === 'number' && Number.isInteger(o.serverId) && o.serverId > 0 ? o.serverId : null,
      exercise,
      stars,
      comment,
      trainer: cleanTrainer(o.trainer),
      lang: o.lang === 'it' ? 'it' : 'de',
      createdAt: o.createdAt,
      parentLocalId: typeof o.parentLocalId === 'string' && o.parentLocalId ? o.parentLocalId : null,
    });
  }
  return capOwn(out);
}

/** Älteste zuerst sortieren und auf MAX_OWN begrenzen (die neuesten bleiben) */
export function capOwn(list: readonly OwnRating[], max = MAX_OWN): OwnRating[] {
  const sorted = [...list].sort((a, b) => time(a.createdAt) - time(b.createdAt));
  return sorted.length > max ? sorted.slice(sorted.length - max) : sorted;
}

/** Fügt eine Bewertung hinzu (Obergrenze beachtet); ersetzt einen Eintrag mit gleicher lokaler Kennung */
export function addOwn(list: readonly OwnRating[], r: OwnRating): OwnRating[] {
  return capOwn([...list.filter((x) => x.localId !== r.localId), r]);
}

export function newLocalId(now = Date.now(), rnd = Math.random()): string {
  return `${now.toString(36)}-${Math.floor(rnd * 36 ** 5).toString(36)}`;
}

/** Neueste eigene Bewertung je Übung */
export function latestByExercise(list: readonly OwnRating[]): Map<string, OwnRating> {
  const out = new Map<string, OwnRating>();
  for (const r of [...list].sort((a, b) => time(a.createdAt) - time(b.createdAt))) out.set(r.exercise, r);
  return out;
}

/** Neueste Bewertung mit Sternen je Übung (für das Abzeichen „★4 bewertet“) */
export function latestStarsByExercise(list: readonly OwnRating[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const r of [...list].sort((a, b) => time(a.createdAt) - time(b.createdAt))) if (r.stars !== null) out.set(r.exercise, r.stars);
  return out;
}

export function ratingsFor(list: readonly OwnRating[], exercise: string): OwnRating[] {
  return list.filter((r) => r.exercise === exercise).sort((a, b) => time(a.createdAt) - time(b.createdAt));
}

/** Nummern der bereits gesendeten Bewertungen (neueste zuerst, höchstens MAX_MINE_IDS) für die Abfrage der Antworten */
export function idsToAsk(list: readonly OwnRating[]): number[] {
  return [...list]
    .filter((r) => r.serverId !== null && r.serverId < NO_SERVER_ID)
    .sort((a, b) => time(b.createdAt) - time(a.createdAt))
    .slice(0, MAX_MINE_IDS)
    .map((r) => r.serverId as number);
}

export const unsent = (list: readonly OwnRating[]): OwnRating[] => list.filter((r) => r.serverId === null);

/** Filter in der Übungsliste (nur Trainer): alle · von mir bewertet · noch nicht bewertet · verbessert */
export type RatedFilter = 'all' | 'rated' | 'unrated' | 'improved';
export const RATED_FILTERS: readonly RatedFilter[] = ['all', 'rated', 'unrated', 'improved'];

export function matchesRatedFilter(f: RatedFilter, exercise: string, rated: ReadonlySet<string>, improved: ReadonlySet<string>): boolean {
  if (f === 'rated') return rated.has(exercise);
  if (f === 'unrated') return !rated.has(exercise);
  if (f === 'improved') return improved.has(exercise);
  return true;
}

export function parseRatedFilter(v: unknown): RatedFilter {
  return RATED_FILTERS.includes(v as RatedFilter) ? (v as RatedFilter) : 'all';
}

/** Ist die Verbesserung neuer als die letzte eigene Bewertung dieser Übung? (ohne eigene Bewertung: nein) */
export function improvedAfterRating(imp: Improvement, latest: OwnRating | undefined): boolean {
  return !!latest && time(imp.createdAt) > time(latest.createdAt);
}

/** „Neu verbessert“: neuer als die eigene letzte Bewertung ODER neuer als der letzte Besuch der Verbessert-Liste */
export function isNewlyImproved(imp: Improvement, latest: OwnRating | undefined, seen: SeenState): boolean {
  return improvedAfterRating(imp, latest) || time(imp.createdAt) > time(seen.improvements);
}

export function emptySeen(): SeenState {
  return { improvements: new Date(0).toISOString(), replies: new Date(0).toISOString() };
}

export function normalizeSeen(raw: unknown): SeenState {
  const base = emptySeen();
  if (!raw || typeof raw !== 'object') return base;
  const o = raw as Record<string, unknown>;
  return { improvements: validTime(o.improvements) ? o.improvements : base.improvements, replies: validTime(o.replies) ? o.replies : base.replies };
}

/** Antworten des Entwicklers auf eigene Rückmeldungen, die neuer sind als der letzte Besuch von „Meine Bewertungen“ */
export function unseenReplyCount(remote: ReadonlyMap<number, OwnRemote>, own: readonly OwnRating[], seen: SeenState): number {
  const mine = new Set(own.map((r) => r.serverId).filter((x): x is number => x !== null));
  let n = 0;
  for (const [id, r] of remote) {
    if (!mine.has(id)) continue;
    for (const rep of r.replies) if (time(rep.createdAt) > time(seen.replies)) n++;
  }
  return n;
}

/** Verbesserungen (Übungen), die neuer sind als der letzte Besuch der Verbessert-Liste; die „Allgemein“-Kennung zählt nicht */
export function unseenImprovementCount(improvements: readonly Improvement[], seen: SeenState): number {
  return improvements.filter((i) => i.exercise !== GENERAL_ID && time(i.createdAt) > time(seen.improvements)).length;
}

export function notificationCount(
  remote: ReadonlyMap<number, OwnRemote>,
  own: readonly OwnRating[],
  improvements: readonly Improvement[],
  seen: SeenState,
): number {
  return unseenReplyCount(remote, own, seen) + unseenImprovementCount(improvements, seen);
}

export interface ThreadItem {
  kind: 'own' | 'reply';
  at: string;
  rating?: OwnRating;
  reply?: ReplyRow;
}

/** Gesprächsverlauf einer Übung: eigene Bewertungen und Antworten des Entwicklers, zeitlich geordnet (älteste zuerst) */
export function buildThread(own: readonly OwnRating[], remote: ReadonlyMap<number, OwnRemote>, exercise: string): ThreadItem[] {
  const items: ThreadItem[] = [];
  for (const r of ratingsFor(own, exercise)) {
    items.push({ kind: 'own', at: r.createdAt, rating: r });
    if (r.serverId !== null) for (const rep of remote.get(r.serverId)?.replies ?? []) items.push({ kind: 'reply', at: rep.createdAt, reply: rep });
  }
  return items.sort((a, b) => time(a.at) - time(b.at) || (a.kind === 'own' ? -1 : 1));
}
