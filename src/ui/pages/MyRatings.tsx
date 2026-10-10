import { useEffect, useMemo, useState } from 'preact/hooks';
import { loadCatalogNumbers } from '../../feedback/catalog-numbers';
import { GENERAL_ID } from '../../feedback/logic';
import { buildThread } from '../../feedback/own';
import { feedbackStore } from '../../feedback/store';
import { getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { FeedbackButton } from '../components/FeedbackDialog';
import { formatDay, ImprovedBadge, RatedBadge } from '../components/FeedbackBadges';
import { Icon } from '../components/Icon';
import { Thread } from '../components/Thread';
import { useFeedbackView } from '../feedback-view';
import { exerciseHref, href } from '../router';

/** „Meine Bewertungen“ (nur Trainer): eigene Bewertungen dieses Geräts als Gespräch mit dem Entwickler, dazu die verbesserten Übungen. */
export function MyRatings() {
  const { opt, lang } = useApp();
  // „Neu verbessert“ bleibt auf dieser Seite sichtbar, obwohl das Öffnen alles als gesehen markiert
  const fb = useFeedbackView(true);
  const [numbers, setNumbers] = useState<Map<string, number[]>>(new Map());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    void loadCatalogNumbers().then(setNumbers);
    void feedbackStore.refresh().finally(() => {
      feedbackStore.markSeen('replies');
      feedbackStore.markSeen('improvements');
    });
    feedbackStore.markSeen('replies');
    feedbackStore.markSeen('improvements');
  }, []);

  const groups = useMemo(() => {
    const byEx = new Map<string, string>();
    for (const r of fb.own) byEx.set(r.exercise, r.createdAt);
    return [...byEx.entries()]
      .map(([exercise]) => {
        const thread = buildThread(fb.own, fb.remote, exercise);
        return { exercise, thread, last: thread[thread.length - 1]?.at ?? '' };
      })
      .sort((a, b) => Date.parse(b.last) - Date.parse(a.last));
  }, [fb.own, fb.remote]);

  const improved = useMemo(() => [...fb.improvedBy.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)), [fb.improvedBy]);

  const nameOf = (id: string) => (id === GENERAL_ID ? opt.mineGeneral : (getExercise(id)?.texts[lang].title ?? id));
  const refresh = async () => {
    setBusy(true);
    try {
      await feedbackStore.refresh();
      feedbackStore.markSeen('replies');
      feedbackStore.markSeen('improvements');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main class="container mine" id="main">
      <a class="back-link" href={href('/optiker')}>
        <Icon name="back" size={20} /> {opt.navOptician}
      </a>
      <h1>{opt.mineTitle}</h1>
      <p class="lead">{opt.mineLead}</p>
      <div class="dev-actions">
        <button type="button" class="btn btn-ghost btn-sm" disabled={busy} onClick={refresh}>
          <Icon name="refresh" size={16} /> {opt.mineRefresh}
        </button>
        {fb.unsentCount ? (
          <>
            <span class="chip chip-new" role="status">
              {opt.mineUnsent(fb.unsentCount)}
            </span>
            <button type="button" class="btn btn-primary btn-sm" disabled={busy} onClick={refresh}>
              {opt.mineSendNow}
            </button>
          </>
        ) : null}
      </div>

      <section aria-labelledby="mine-improved">
        <h2 id="mine-improved">{opt.mineImprovedTitle}</h2>
        {improved.length ? (
          <ul class="mine-improved">
            {improved.map((imp) => (
              <li key={imp.exercise} class="improved-note">
                <ImprovedBadge fb={fb} exercise={imp.exercise} />
                <a href={exerciseHref(imp.exercise)}>
                  <strong>{nameOf(imp.exercise)}</strong>
                </a>
                <span class="muted small">{formatDay(imp.createdAt, lang)}</span>
                <span class="improved-text">{imp.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p class="muted">{opt.mineImprovedNone}</p>
        )}
      </section>

      <section aria-labelledby="mine-list-title">
        <h2 id="mine-list-title">{opt.navMine}</h2>
        {!groups.length ? <p class="muted">{opt.mineEmpty}</p> : null}
        <ul class="mine-list">
          {groups.map((g) => {
            const sent = fb.own.filter((r) => r.exercise === g.exercise && r.serverId !== null);
            const hasReply = g.thread.some((t) => t.kind === 'reply');
            const exported = sent.some((r) => fb.remote.get(r.serverId as number)?.exported);
            const nrs = numbers.get(g.exercise);
            return (
              <li key={g.exercise} class="mine-item" data-exercise={g.exercise}>
                <h3>
                  {nrs?.length ? <span class="mine-nr">{nrs.join(', ')}</span> : null}
                  {g.exercise === GENERAL_ID ? <span>{nameOf(g.exercise)}</span> : <a href={exerciseHref(g.exercise)}>{nameOf(g.exercise)}</a>}
                  <RatedBadge fb={fb} exercise={g.exercise} />
                  <ImprovedBadge fb={fb} exercise={g.exercise} />
                </h3>
                <Thread items={g.thread} />
                {!hasReply ? <p class="muted small mine-status">{exported ? opt.mineSeen : opt.mineWaiting}</p> : null}
                <p class="mine-status">
                  <FeedbackButton exercise={g.exercise} name={nameOf(g.exercise)} />
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
