import { RATED_FILTERS, type RatedFilter } from '../../feedback/own';
import type { Lang } from '../../i18n/lang';
import { useApp } from '../app-context';
import type { FeedbackView } from '../feedback-view';

export const formatDay = (iso: string, lang: Lang): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(lang === 'it' ? 'it-IT' : 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
export const formatDayTime = (iso: string, lang: Lang): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleString(lang === 'it' ? 'it-IT' : 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

/** Kleines Abzeichen „★4 bewertet“ (nur Trainer-Ansicht, nur wenn auf diesem Gerät bewertet) */
export function RatedBadge({ fb, exercise }: { fb: FeedbackView; exercise: string }) {
  const { opt } = useApp();
  if (!fb.enabled || !fb.rated.has(exercise)) return null;
  return (
    <span class="badge badge-rated" title={opt.fbRatedTitle}>
      {opt.fbRated(fb.stars.get(exercise) ?? null)}
    </span>
  );
}

/** Abzeichen „Verbessert“ bzw. „Neu verbessert“ mit Kurztext und Datum als Tooltip */
export function ImprovedBadge({ fb, exercise }: { fb: FeedbackView; exercise: string }) {
  const { opt, lang } = useApp();
  const imp = fb.enabled ? fb.improvedBy.get(exercise) : undefined;
  if (!imp) return null;
  const fresh = fb.isNew(exercise);
  const title = `${opt.fbImprovedOn(formatDay(imp.createdAt, lang))}${imp.text ? `: ${imp.text}` : ''}`;
  return (
    <span class={`badge badge-improved${fresh ? ' is-new' : ''}`} title={title}>
      <span aria-hidden="true">✦</span> {fresh ? opt.fbImprovedNew : opt.fbImproved}
    </span>
  );
}

/** Was wurde verbessert? Sichtbarer Kurztext auf der Übungsseite */
export function ImprovedNote({ fb, exercise }: { fb: FeedbackView; exercise: string }) {
  const { opt, lang } = useApp();
  const imp = fb.enabled ? fb.improvedBy.get(exercise) : undefined;
  if (!imp) return null;
  return (
    <p class={`improved-note${fb.isNew(exercise) ? ' is-new' : ''}`}>
      <ImprovedBadge fb={fb} exercise={exercise} /> <span class="muted small">{opt.fbImprovedOn(formatDay(imp.createdAt, lang))}</span>
      {imp.text ? <span class="improved-text">{imp.text}</span> : null}
    </p>
  );
}

/** Filter „Alle · Von mir bewertet · Noch nicht bewertet · Verbessert“ */
export function RatedFilterChips({ value, onChange, counts }: { value: RatedFilter; onChange: (f: RatedFilter) => void; counts?: Record<RatedFilter, number> }) {
  const { opt } = useApp();
  const label: Record<RatedFilter, string> = { all: opt.fbFilterAll, rated: opt.fbFilterRated, unrated: opt.fbFilterUnrated, improved: opt.fbFilterImproved };
  return (
    <div class="tag-filter rated-filter" role="radiogroup" aria-label={opt.fbFilterLabel}>
      {RATED_FILTERS.map((id) => (
        <button key={id} type="button" role="radio" aria-checked={value === id} class={`tag-chip${value === id ? ' is-on' : ''}`} data-rated-filter={id} onClick={() => onChange(id)}>
          {value === id ? '✓ ' : ''}
          {label[id]}
          {counts ? <span class="tag-chip-count"> {counts[id]}</span> : null}
        </button>
      ))}
    </div>
  );
}
