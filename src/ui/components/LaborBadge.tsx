import type { ExerciseDefinition } from '../../core/types';
import { hasTag, TAG_LABOR } from '../../exercises/registry';
import { useApp } from '../app-context';
import { Icon } from './Icon';

/** Kleine Marke „Labor“: Kolben-Symbol + Text (nie nur Farbe); nichts für Übungen ohne die Marke */
export function LaborBadge({ def }: { def: Pick<ExerciseDefinition, 'tags'> }) {
  const { ui } = useApp();
  if (!hasTag(def, TAG_LABOR)) return null;
  return (
    <span class="labor-badge" title={ui.labor.badgeTitle}>
      <Icon name="flask" size={14} stroke={2.4} /> {ui.labor.badge}
    </span>
  );
}
