import { useEffect, useRef, useState } from 'preact/hooks';
import { createFormatter } from '../../core/format';
import { liveKeyDelta, nudgeValue } from '../../core/live';
import { decimalsOf } from '../../core/params';
import type { Runner } from '../../core/runner';
import type { ExerciseDefinition, LiveState } from '../../core/types';
import { useApp } from '../app-context';
import { Icon } from './Icon';

/**
 * Trainer-Regler während der Übung (nur Trainer- und Entwickler-Ansicht, nur Übungen mit `liveControls`): eine schmale,
 * einklappbare Leiste außerhalb des Reizfelds (neutrales Grau, nie rot oder grün), mit dem aktuellen Wert und den Tasten
 * − / + (kleiner Schritt) und −− / ++ (grober Schritt), je ≥ 56 px. Sie liegt neben (Querformat) oder unter der Bühne
 * und überdeckt das Reizfeld nie; die Person am Bildschirm berührt sie nicht.
 *
 * Tastatur (Computer): `+` und `-` für den kleinen, Bild auf und Bild ab für den groben Schritt. Die Übung begrenzt
 * jeden Schritt, lässt die Anzeige weich gleiten und protokolliert die Änderung; die Leiste verändert keine
 * gespeicherten Einstellungen.
 */
export function LiveBar({ def, runner }: { def: ExerciseDefinition; runner: () => Runner | null }) {
  const { ui, lang } = useApp();
  const tx = def.texts[lang];
  const fmt = createFormatter(lang);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<LiveState | null>(null);
  const last = useRef('');

  const poll = () => {
    const s = runner()?.getLive() ?? null;
    const key = s ? `${s.key}|${s.value}|${s.effective.toFixed(2)}|${s.min}|${s.max}` : '';
    if (key === last.current) return;
    last.current = key;
    setState(s);
  };

  const nudge = (delta: number) => {
    const r = runner();
    const s = r?.getLive();
    if (!r || !s) return;
    r.setLive(s.key, nudgeValue(s, delta));
    poll();
  };

  useEffect(() => {
    const timer = window.setInterval(poll, 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const s = runner()?.getLive();
      if (!s) return;
      const delta = liveKeyDelta(e.key, s);
      if (!delta) return;
      e.preventDefault();
      if (!e.repeat) nudge(delta);
    };
    window.addEventListener('keydown', onKey);
    poll();
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const label = (state && tx.liveLabels?.[state.key]) ?? tx.liveLabels?.[def.liveControls?.[0]?.key ?? ''] ?? '';
  const dec = state ? decimalsOf(state.step) : 1;
  const num = (v: number) => fmt.num(v, dec);
  const signed = (v: number) => (v > 0 ? `+${num(v)}` : v < 0 ? `−${num(Math.abs(v))}` : num(0));
  const unit = state?.unit ?? '';
  const L = ui.run.live;

  return (
    <aside class={`live-bar${open ? ' is-open' : ''}`} aria-label={L.region}>
      <button type="button" class="live-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="sliders" size={20} />
        <span class="live-toggle-text">{open ? L.hide : `${L.show}: ${label}`}</span>
      </button>
      {open ? (
        <div class="live-body">
          <p class="live-title">{label}</p>
          <p class="live-value" role="status" aria-live="off">
            {state ? (state.additive ? `${L.extra} ${signed(state.value)} ${unit}` : `${num(state.value)} ${unit}`) : '–'}
          </p>
          {state?.additive ? (
            <p class="live-total">
              {L.total}: {num(state.effective)} {unit}
            </p>
          ) : null}
          <div class="live-buttons" role="group" aria-label={label}>
            <button type="button" class="live-btn" disabled={!state} onClick={() => state && nudge(-state.coarseStep)} aria-label={`${L.muchSmaller} (−${state ? num(state.coarseStep) : ''} ${unit})`}>
              −−
            </button>
            <button type="button" class="live-btn" disabled={!state} onClick={() => state && nudge(-state.step)} aria-label={`${L.smaller} (−${state ? num(state.step) : ''} ${unit})`}>
              −
            </button>
            <button type="button" class="live-btn" disabled={!state} onClick={() => state && nudge(state.step)} aria-label={`${L.larger} (+${state ? num(state.step) : ''} ${unit})`}>
              +
            </button>
            <button type="button" class="live-btn" disabled={!state} onClick={() => state && nudge(state.coarseStep)} aria-label={`${L.muchLarger} (+${state ? num(state.coarseStep) : ''} ${unit})`}>
              ++
            </button>
          </div>
          <p class="live-note">{L.safety}</p>
          <p class="live-note live-keys">{L.keys}</p>
        </div>
      ) : null}
    </aside>
  );
}
