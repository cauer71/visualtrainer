import { useEffect, useRef, useState } from 'preact/hooks';
import { lastStars, sendFeedback } from '../../feedback/client';
import { MAX_COMMENT } from '../../feedback/logic';
import { useApp } from '../app-context';
import { Icon } from './Icon';

/** Knopf „Bewerten“ (nur in der Trainer-Ansicht): öffnet den Dialog mit Sternen und Kommentar. */
export function FeedbackButton({ exercise, name, class: cls = 'btn btn-ghost btn-sm' }: { exercise: string; name: string; class?: string }) {
  const { opt } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" class={cls} onClick={() => setOpen(true)}>
        <span aria-hidden="true">★</span> {opt.fbButton}
      </button>
      {open ? <FeedbackDialog exercise={exercise} name={name} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

type Phase = 'edit' | 'sending' | 'done';

export function FeedbackDialog({ exercise, name, onClose }: { exercise: string; name: string; onClose: () => void }) {
  const { opt, lang } = useApp();
  const [stars, setStars] = useState<number | null>(() => lastStars(exercise));
  const [comment, setComment] = useState('');
  const [phase, setPhase] = useState<Phase>('edit');
  const [error, setError] = useState<string | null>(null);
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    first.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const canSend = phase === 'edit' && (stars !== null || comment.trim().length > 0);
  const send = async () => {
    if (!canSend) return;
    setPhase('sending');
    setError(null);
    try {
      await sendFeedback({ exercise, stars, comment, lang });
      setPhase('done');
    } catch {
      setPhase('edit');
      setError(opt.fbError);
    }
  };

  return (
    <div class="role-gate" role="dialog" aria-modal="true" aria-labelledby="fb-title">
      <div class="role-card fb-card">
        <h2 id="fb-title">{opt.fbTitle(name)}</h2>
        {phase === 'done' ? (
          <>
            <p class="lead fb-thanks">
              <Icon name="check" size={22} stroke={3} /> {opt.fbThanks}
            </p>
            <button type="button" class="btn btn-primary" onClick={onClose}>
              {opt.fbClose}
            </button>
          </>
        ) : (
          <>
            <p class="muted">{opt.fbLead}</p>
            <div class="fb-stars" role="radiogroup" aria-label={opt.fbStars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  ref={n === 1 ? first : undefined}
                  type="button"
                  role="radio"
                  aria-checked={stars === n}
                  aria-label={opt.fbStarsN(n)}
                  class={`fb-star${stars !== null && n <= stars ? ' is-on' : ''}`}
                  onClick={() => setStars(stars === n ? null : n)}
                >
                  ★
                </button>
              ))}
            </div>
            <p class="muted small fb-stars-text" aria-live="polite">
              {stars === null ? opt.fbNoStars : opt.fbStarsN(stars)}
            </p>
            <label class="fb-label" for="fb-comment">
              {opt.fbComment}
            </label>
            <textarea
              id="fb-comment"
              class="input fb-text"
              rows={5}
              maxLength={MAX_COMMENT}
              placeholder={opt.fbPlaceholder}
              value={comment}
              onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
            />
            {error ? (
              <p class="fb-error" role="alert">
                {error}
              </p>
            ) : null}
            <div class="fb-actions">
              <button type="button" class="btn btn-primary" disabled={!canSend} onClick={send}>
                {phase === 'sending' ? opt.fbSending : opt.fbSend}
              </button>
              <button type="button" class="btn btn-ghost" onClick={onClose}>
                {opt.fbCancel}
              </button>
            </div>
            {stars === null && !comment.trim() ? <p class="muted small">{opt.fbNeed}</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
