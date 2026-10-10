/**
 * Rückmeldungen von Trainern an den Entwickler (Sterne 1–5 + Kommentar je Übung).
 * Reine Logik ohne Browser- und Server-Bezug: wird vom Worker (Prüfung der Eingabe),
 * der Entwickler-Seite (Auswertung) und den Tests gemeinsam benutzt.
 */

/** Kennung für Rückmeldungen, die zu keiner einzelnen Übung gehören */
export const GENERAL_ID = 'allgemein';
export const MAX_COMMENT = 1500;
export const MAX_STARS = 5;
/** Optionales Kürzel des Trainers (kein Name nötig): höchstens so viele Zeichen */
export const MAX_TRAINER = 20;

export interface Submission {
  exercise: string;
  /** 1–5 oder null (nur Kommentar) */
  stars: number | null;
  /** getrimmt, kann leer sein, wenn Sterne vergeben wurden */
  comment: string;
  /** optionales Kürzel des Trainers, damit sich mehrere Trainer an einem Gerät unterscheiden lassen (leer = anonym) */
  trainer: string;
  lang: 'de' | 'it';
  /** optional: Nummer der eigenen früheren Rückmeldung, auf die diese folgt (Fortsetzung des Gesprächs) */
  replyTo?: number;
}

/** Antwort des Entwicklers auf eine Rückmeldung */
export interface ReplyRow {
  id: number;
  feedbackId: number;
  text: string;
  /** ISO-Zeit (UTC) */
  createdAt: string;
  /** mit dieser Antwort wurde die Übung verbessert */
  improved: boolean;
}

/** Ankündigung „Übung verbessert“ */
export interface Improvement {
  exercise: string;
  text: string;
  /** ISO-Zeit (UTC) */
  createdAt: string;
}

export interface FeedbackRow {
  id: number;
  exercise: string;
  stars: number | null;
  comment: string;
  trainer: string;
  lang: string;
  /** ISO-Zeit (UTC) */
  createdAt: string;
  /** ISO-Zeit des Exports (archiviert, Text bleibt erhalten); null/fehlend = noch nicht exportiert */
  exportedAt?: string | null;
  /** Nachfolge-Kommentar: Nummer der früheren Rückmeldung desselben Trainers */
  parentId?: number | null;
  replies?: ReplyRow[];
}

export type ParseResult = { ok: true; value: Submission } | { ok: false; error: string };

const EXERCISE_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

/** Kürzel säubern: nur Buchstaben, Ziffern, Leerzeichen und . _ -, höchstens MAX_TRAINER Zeichen */
export function cleanTrainer(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw.replace(/[^\p{L}\p{N} ._-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, MAX_TRAINER).trim();
}

export function parseSubmission(raw: unknown): ParseResult {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Ungültige Eingabe.' };
  const o = raw as Record<string, unknown>;
  const exercise = typeof o.exercise === 'string' ? o.exercise : '';
  if (!EXERCISE_RE.test(exercise)) return { ok: false, error: 'Übung fehlt oder ist ungültig.' };
  let stars: number | null = null;
  if (o.stars !== null && o.stars !== undefined) {
    if (typeof o.stars !== 'number' || !Number.isInteger(o.stars) || o.stars < 1 || o.stars > MAX_STARS) {
      return { ok: false, error: 'Sterne müssen zwischen 1 und 5 liegen.' };
    }
    stars = o.stars;
  }
  const comment = typeof o.comment === 'string' ? o.comment.replace(/\r\n?/g, '\n').trim() : '';
  if (comment.length > MAX_COMMENT) return { ok: false, error: `Kommentar zu lang (höchstens ${MAX_COMMENT} Zeichen).` };
  if (stars === null && !comment) return { ok: false, error: 'Bitte Sterne oder einen Kommentar angeben.' };
  const trainer = cleanTrainer(o.trainer);
  const lang = o.lang === 'it' ? 'it' : 'de';
  const value: Submission = { exercise, stars, comment, trainer, lang };
  if (typeof o.replyTo === 'number' && Number.isInteger(o.replyTo) && o.replyTo > 0) value.replyTo = o.replyTo;
  return { ok: true, value };
}

export interface ReplyInput {
  /** fehlt = an alle noch unbeantworteten Kommentare der Übung */
  feedbackId: number | null;
  exercise: string;
  text: string;
  improved: boolean;
  /** nur bei Sammelantwort: auch noch nicht exportierte Kommentare beantworten */
  includeUnexported: boolean;
}
export type ReplyParse = { ok: true; value: ReplyInput } | { ok: false; error: string };

/** Prüft den Körper von POST /api/admin/reply: `{ feedbackId?, exerciseId, text, improved? }` */
export function parseReply(raw: unknown): ReplyParse {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Ungültige Eingabe.' };
  const o = raw as Record<string, unknown>;
  const exercise = typeof o.exerciseId === 'string' ? o.exerciseId : '';
  if (!EXERCISE_RE.test(exercise)) return { ok: false, error: 'exerciseId fehlt oder ist ungültig.' };
  let feedbackId: number | null = null;
  if (o.feedbackId !== undefined && o.feedbackId !== null) {
    if (typeof o.feedbackId !== 'number' || !Number.isInteger(o.feedbackId) || o.feedbackId < 1) return { ok: false, error: 'feedbackId ungültig.' };
    feedbackId = o.feedbackId;
  }
  const text = typeof o.text === 'string' ? o.text.replace(/\r\n?/g, '\n').trim() : '';
  if (!text) return { ok: false, error: 'Text fehlt.' };
  if (text.length > MAX_COMMENT) return { ok: false, error: `Text zu lang (höchstens ${MAX_COMMENT} Zeichen).` };
  return { ok: true, value: { feedbackId, exercise, text, improved: o.improved === true, includeUnexported: o.includeUnexported === true } };
}

/** Übernimmt Antworten aus einer Server-Antwort (unbrauchbare Einträge fallen weg, neueste zuletzt) */
export function normalizeReplies(raw: unknown): ReplyRow[] {
  if (!Array.isArray(raw)) return [];
  const out: ReplyRow[] = [];
  for (const r of raw) {
    if (!r || typeof r !== 'object') continue;
    const o = r as Record<string, unknown>;
    const text = typeof o.text === 'string' ? o.text.trim() : '';
    const createdAt = typeof o.createdAt === 'string' && Number.isFinite(Date.parse(o.createdAt)) ? o.createdAt : '';
    if (!text || !createdAt) continue;
    out.push({
      id: typeof o.id === 'number' ? o.id : 0,
      feedbackId: typeof o.feedbackId === 'number' ? o.feedbackId : 0,
      text: text.slice(0, MAX_COMMENT),
      createdAt,
      improved: o.improved === true,
    });
  }
  return out.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt) || a.id - b.id);
}

/** Übernimmt die Liste „zuletzt verbessert“ aus einer Server-Antwort: je Übung nur die neueste Ankündigung */
export function normalizeImprovements(raw: unknown): Improvement[] {
  if (!Array.isArray(raw)) return [];
  const latest = new Map<string, Improvement>();
  for (const r of raw) {
    if (!r || typeof r !== 'object') continue;
    const o = r as Record<string, unknown>;
    const exercise = typeof o.exerciseId === 'string' ? o.exerciseId : typeof o.exercise === 'string' ? o.exercise : '';
    const text = typeof o.text === 'string' ? o.text.trim().slice(0, MAX_COMMENT) : '';
    const createdAt = typeof o.createdAt === 'string' && Number.isFinite(Date.parse(o.createdAt)) ? o.createdAt : '';
    if (!EXERCISE_RE.test(exercise) || !createdAt) continue;
    const prev = latest.get(exercise);
    if (!prev || Date.parse(createdAt) >= Date.parse(prev.createdAt)) latest.set(exercise, { exercise, text, createdAt });
  }
  return [...latest.values()];
}

/** Kommentare, die noch nicht exportiert wurden (Standard-Inhalt der Exportdatei) */
export function pendingExport(rows: readonly FeedbackRow[]): FeedbackRow[] {
  return rows.filter((r) => r.comment && !r.exportedAt);
}

export interface ExerciseSummary {
  exercise: string;
  /** Mittelwert aller Bewertungen mit Sternen (jede Bewertung zählt einzeln), null = noch nicht bewertet */
  avg: number | null;
  /** Anzahl der Bewertungen mit Sternen */
  count: number;
  /** Kommentare (nicht leer), neueste zuerst */
  comments: FeedbackRow[];
}

/** Fasst alle Zeilen je Übung zusammen: jede Bewertung mit Sternen zählt einzeln. */
export function summarize(rows: readonly FeedbackRow[]): Map<string, ExerciseSummary> {
  const out = new Map<string, ExerciseSummary>();
  const sums = new Map<string, { sum: number; n: number }>();
  const sorted = [...rows].sort((a, b) => a.id - b.id);
  for (const r of sorted) {
    if (!out.has(r.exercise)) out.set(r.exercise, { exercise: r.exercise, avg: null, count: 0, comments: [] });
    if (r.comment) out.get(r.exercise)!.comments.unshift(r);
    if (r.stars !== null) {
      const s = sums.get(r.exercise) ?? { sum: 0, n: 0 };
      s.sum += r.stars;
      s.n += 1;
      sums.set(r.exercise, s);
    }
  }
  for (const [ex, s] of sums) {
    const e = out.get(ex)!;
    e.avg = s.sum / s.n;
    e.count = s.n;
  }
  return out;
}

export interface ExerciseInfo {
  /** Nummern im Übungskatalog (leer = keine) */
  numbers: number[];
  name: string;
}

const pad = (n: number) => String(n).padStart(2, '0');
export function formatStamp(d: Date): string {
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatAvg(avg: number | null): string {
  return avg === null ? '–' : avg.toFixed(1).replace('.', ',');
}

export const ADMIN_REPLY_URL = 'https://visual.auer.page/api/admin/reply';

/** Kurze Anleitung am Anfang der Exportdatei: wie die KI nach der Umsetzung die Antworten zurückschreibt (ohne Passwort!) */
export function replyInstructions(): string[] {
  return [
    'Antworten an die Trainer (Dialog):',
    'Schreibe nach der Umsetzung je Übung eine kurze, freundliche Antwort darüber, was verbessert wurde (oder warum nicht).',
    'Das Passwort steht NICHT in dieser Datei: es liegt in der Umgebungsvariable ADMIN_PASSWORD. Aufruf je Übung (Kennung steht in der Überschrift):',
    `  curl -sS -X POST ${ADMIN_REPLY_URL} \\`,
    '    -H "Authorization: Bearer $ADMIN_PASSWORD" -H "Content-Type: application/json" \\',
    '    -d \'{"exerciseId":"<Kennung>","text":"<was wurde verbessert>","improved":true}\'',
    'Ohne "feedbackId" geht die Antwort an alle exportierten, noch unbeantworteten Kommentare der Übung; mit "feedbackId": <Nummer aus [#...]> nur an diesen einen.',
    '"improved":true markiert die Übung für die Trainer zusätzlich als „Verbessert“; bei reiner Ablehnung "improved" weglassen oder false setzen.',
  ];
}

/**
 * Textdatei mit den übergebenen Kommentaren (Aufrufer filtert mit `pendingExport`), gruppiert nach Übung, damit sie direkt
 * als Auftrag in Claude Code eingefügt werden kann. Enthält Katalognummer UND Kennung (Ordner `src/exercises/<Kennung>`)
 * und je Kommentar die Nummer `[#id]` für die Antwort über die Schnittstelle.
 */
export function buildExportText(rows: readonly FeedbackRow[], info: (exercise: string) => ExerciseInfo, now: Date): string {
  const summary = summarize(rows);
  const groups = [...summary.values()].filter((g) => g.comments.length);
  const total = groups.reduce((n, g) => n + g.comments.length, 0);
  const key = (ex: string) => (ex === GENERAL_ID ? [-1, ex] : [info(ex).numbers[0] ?? 100000, ex]);
  groups.sort((a, b) => {
    const ka = key(a.exercise);
    const kb = key(b.exercise);
    return (ka[0] as number) - (kb[0] as number) || String(ka[1]).localeCompare(String(kb[1]));
  });
  const lines: string[] = [];
  lines.push('Blickfit – Rückmeldungen der Trainer');
  lines.push(`Exportiert am ${formatStamp(now)} · ${total} ${total === 1 ? 'Kommentar' : 'Kommentare'} zu ${groups.length} ${groups.length === 1 ? 'Übung' : 'Übungen'}`);
  lines.push('');
  lines.push('Bitte gehe die Kritik Übung für Übung durch und setze alles um, was sinnvoll ist.');
  lines.push('Bei Unklarheiten oder Widersprüchen zur Wissenschaft (docs/wissenschaft) frag nach, bevor du etwas änderst.');
  lines.push('');
  lines.push(...replyInstructions());
  for (const g of groups) {
    lines.push('');
    let label: string;
    if (g.exercise === GENERAL_ID) {
      lines.push('=== Allgemein (keine bestimmte Übung) ===');
      label = 'Allgemein';
    } else {
      const i = info(g.exercise);
      const nr = i.numbers.length ? `Übung ${i.numbers.join(', ')}` : 'Übung ohne Katalognummer';
      lines.push(`=== ${nr} – ${i.name} (Kennung: ${g.exercise}) ===`);
      label = `${nr} – ${i.name}`;
    }
    if (g.avg !== null) lines.push(`Bewertung: Ø ${formatAvg(g.avg)} von 5 Sternen (${g.count} ${g.count === 1 ? 'Bewertung' : 'Bewertungen'})`);
    for (const c of [...g.comments].reverse()) {
      const stars = c.stars !== null ? `${c.stars} von 5` : 'ohne Sterne';
      const who = c.trainer ? `, Trainer ${c.trainer}` : '';
      const follow = c.parentId ? `, Folgekommentar zu #${c.parentId}` : '';
      const [first, ...rest] = c.comment.split('\n');
      lines.push(`- [#${c.id}] ${label} (${stars}${who}${follow}): ${first}`);
      for (const l of rest) lines.push(`  ${l}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}
