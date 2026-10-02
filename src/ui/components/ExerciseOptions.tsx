import { useState } from 'preact/hooks';
import { getExerciseOption, setExerciseOption } from '../../core/storage';
import type { ExerciseDefinition, ExerciseOptionDef, ExerciseOptionTexts, ExerciseOptionValue } from '../../core/types';

/**
 * Optionen, die eine Übung vor dem Start anbietet (z. B. ein Takt): Schalter (Standard aus) und, wenn an,
 * eine Auswahl (z. B. Tempo). Die Auswahl wird sofort lokal gespeichert und beim Start an die Übung übergeben.
 * Der Zustand zeigt sich nie nur über Farbe: Schalterstellung, Häkchen an der gewählten Auswahl.
 */
export function ExerciseOptions({ def, texts }: { def: ExerciseDefinition; texts: Record<string, ExerciseOptionTexts> | undefined }) {
  if (!def.options?.length || !texts) return null;
  return (
    <div class="options">
      {def.options.map((o) => (texts[o.key] ? <OptionRow key={o.key} exerciseId={def.id} opt={o} tx={texts[o.key]} /> : null))}
    </div>
  );
}

function OptionRow({ exerciseId, opt, tx }: { exerciseId: string; opt: ExerciseOptionDef; tx: ExerciseOptionTexts }) {
  const [v, setV] = useState<ExerciseOptionValue>(() => getExerciseOption(exerciseId, opt));
  const set = (next: ExerciseOptionValue) => {
    setV(next);
    setExerciseOption(exerciseId, opt.key, next);
  };
  const titleId = `option-${exerciseId}-${opt.key}`;
  return (
    <section class="option" aria-labelledby={titleId}>
      <button type="button" role="switch" aria-checked={v.on} class={`option-switch${v.on ? ' is-on' : ''}`} onClick={() => set({ ...v, on: !v.on })}>
        <span class="option-track" aria-hidden="true">
          <span class="option-thumb" />
        </span>
        <span class="option-title" id={titleId}>
          {tx.title}
        </span>
      </button>
      {v.on ? (
        <div class="option-choices" role="radiogroup" aria-label={tx.title}>
          {opt.choices.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={v.choice === c}
              class={`option-choice${v.choice === c ? ' is-on' : ''}`}
              onClick={() => set({ ...v, choice: c })}
            >
              {v.choice === c ? '✓ ' : ''}
              {tx.choices[c] ?? c}
            </button>
          ))}
        </div>
      ) : null}
      <p class="option-hint">{tx.hint}</p>
    </section>
  );
}
