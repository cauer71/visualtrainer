import { useState } from 'preact/hooks';
import { snapNumber } from '../../core/params';
import { getExerciseParams, setExerciseParam } from '../../core/storage';
import type { ColorCheckAdjust, ExerciseDefinition, ParamValue } from '../../core/types';
import { useApp } from '../app-context';

/**
 * Prüfbild im Intro (nur Übungen mit `colorCheck`, z. B. Rot-Grün-Lesen): zwei Farbflächen in den aktuell eingestellten
 * Farben, jede mit Beschriftung (die Farbe ist nie der einzige Hinweis), und ein kurzer Erklärtext. Ohne Wertung.
 * Die Farben folgen den Einstellungen (`version` erhöht sich bei jeder Änderung und zeichnet neu).
 *
 * Bietet die Übung die Fassung „Schritt für Schritt“ an (`steps`), erscheinen nummerierte Schritte; an einzelnen Schritten
 * lassen sich Einstellungen direkt verstellen (Auswahl, Helligkeit je Farbe mit Tasten „dunkler“/„heller“ ≥ 56 px). Sie
 * werden wie alle Einstellungen der Übung lokal gespeichert (`onChange` meldet die Änderung der Seite).
 */
export function ColorCheck({
  def,
  onChange,
}: {
  def: ExerciseDefinition;
  /** wird bei geänderten Einstellungen erhöht (zum Neuzeichnen) */
  version?: number;
  /** wird gerufen, wenn das Prüfbild eine Einstellung geändert hat */
  onChange?: () => void;
}) {
  const { lang } = useApp();
  const [, setTick] = useState(0);
  if (!def.colorCheck) return null;
  const info = def.colorCheck(getExerciseParams(def.id, def.params), def.texts[lang]);

  const set = (key: string, value: ParamValue) => {
    if (!def.params) return;
    setExerciseParam(def.id, def.params, key, value);
    setTick((n) => n + 1);
    onChange?.();
  };

  const adjustView = (a: ColorCheckAdjust) => {
    if (a.kind === 'choice') {
      return (
        <div class="option-choices param-choices" role="radiogroup" aria-label={a.label} key={a.key}>
          {a.options.map((o) => (
            <button key={o.value} type="button" role="radio" aria-checked={a.value === o.value} class={`option-choice${a.value === o.value ? ' is-on' : ''}`} onClick={() => set(a.key, o.value)}>
              {a.value === o.value ? '✓ ' : ''}
              {o.label}
            </button>
          ))}
        </div>
      );
    }
    const grid = { min: a.min, max: a.max, step: a.step };
    const down = snapNumber(grid, a.value - a.step);
    const up = snapNumber(grid, a.value + a.step);
    return (
      <div class="colorcheck-level" key={a.key} role="group" aria-label={a.valueText}>
        <button type="button" class="btn btn-ghost colorcheck-btn" disabled={down === a.value} onClick={() => set(a.key, down)}>
          − {a.downLabel}
        </button>
        <span class="colorcheck-value" role="status">
          {a.valueText}
        </span>
        <button type="button" class="btn btn-ghost colorcheck-btn" disabled={up === a.value} onClick={() => set(a.key, up)}>
          + {a.upLabel}
        </button>
      </div>
    );
  };

  return (
    <section class="colorcheck" aria-label={info.title}>
      <h3 class="colorcheck-title">{info.title}</h3>
      <div class="colorcheck-panels">
        {info.panels.map((p) => (
          <figure class="colorcheck-panel" key={p.label}>
            <div class="colorcheck-swatch" style={{ background: p.color }} role="img" aria-label={p.label} />
            <figcaption>{p.label}</figcaption>
          </figure>
        ))}
      </div>
      {info.steps?.length ? (
        <ol class="colorcheck-steps">
          {info.steps.map((st, i) => (
            <li key={i}>
              <span class="colorcheck-step-num" aria-hidden="true">
                {i + 1}
              </span>
              <div class="colorcheck-step-body">
                <p>{st.text}</p>
                {st.adjust?.map(adjustView)}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
      <p class="param-hint">{info.text}</p>
      {info.note ? <p class="param-hint">{info.note}</p> : null}
    </section>
  );
}
