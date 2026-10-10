import type { ThreadItem } from '../../feedback/own';
import { useApp } from '../app-context';
import { formatDayTime } from './FeedbackBadges';

/** Gespräch zu einer Übung: eigene Bewertung (rechts) → Antwort des Entwicklers (links) → … */
export function Thread({ items }: { items: ThreadItem[] }) {
  const { opt, lang } = useApp();
  return (
    <ol class="thread">
      {items.map((it, i) =>
        it.kind === 'own' && it.rating ? (
          <li key={`o${it.rating.localId}`} class="bubble bubble-own" data-bubble="own">
            <span class="bubble-meta">
              {opt.fbYou} · {formatDayTime(it.rating.createdAt, lang)}
              {it.rating.stars !== null ? ` · ${'★'.repeat(it.rating.stars)}${'☆'.repeat(5 - it.rating.stars)}` : ''}
              {it.rating.serverId === null ? <strong class="bubble-unsent"> · {opt.fbNotSent}</strong> : null}
            </span>
            <p>{it.rating.comment || <span class="muted">{opt.fbNoText}</span>}</p>
          </li>
        ) : it.reply ? (
          <li key={`r${it.reply.id}-${i}`} class="bubble bubble-dev" data-bubble="dev">
            <span class="bubble-meta">
              {opt.fbDevReply} · {formatDayTime(it.reply.createdAt, lang)}
              {it.reply.improved ? ` · ✦ ${opt.fbImproved}` : ''}
            </span>
            <p>{it.reply.text}</p>
          </li>
        ) : null,
      )}
    </ol>
  );
}
