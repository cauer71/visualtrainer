import { getExerciseParams } from '../../core/storage';
import type { ExerciseDefinition } from '../../core/types';
import { useApp } from '../app-context';

/**
 * Prüfbild im Intro (nur Übungen mit `colorCheck`, z. B. Rot-Grün-Lesen): zwei Farbflächen in den aktuell eingestellten
 * Farben, jede mit Beschriftung (die Farbe ist nie der einzige Hinweis), und ein kurzer Erklärtext. Ohne Wertung.
 * Die Farben folgen den Einstellungen (`version` erhöht sich bei jeder Änderung und zeichnet neu).
 */
export function ColorCheck({ def }: { def: ExerciseDefinition; /** wird bei geänderten Einstellungen erhöht (zum Neuzeichnen) */ version?: number }) {
  const { lang } = useApp();
  if (!def.colorCheck) return null;
  const info = def.colorCheck(getExerciseParams(def.id, def.params), def.texts[lang]);
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
      <p class="param-hint">{info.text}</p>
    </section>
  );
}
