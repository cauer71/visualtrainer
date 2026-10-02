import type { TagFilter as Filter } from '../../exercises/registry';
import { useApp } from '../app-context';

/** Chips „Alle · Labor · Ohne Labor“ (Radiogruppe, ✓ an der gewählten, nie nur Farbe) */
export function TagFilterChips({ value, onChange, counts }: { value: Filter; onChange: (f: Filter) => void; counts?: Record<Filter, number> }) {
  const { ui } = useApp();
  const items: Array<[Filter, string]> = [
    ['all', ui.tagFilter.all],
    ['labor', ui.tagFilter.labor],
    ['nolabor', ui.tagFilter.nolabor],
  ];
  return (
    <div class="tag-filter" role="radiogroup" aria-label={ui.tagFilter.label}>
      {items.map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={value === id}
          class={`tag-chip${value === id ? ' is-on' : ''}`}
          onClick={() => onChange(id)}
        >
          {value === id ? '✓ ' : ''}
          {label}
          {counts ? <span class="tag-chip-count"> {counts[id]}</span> : null}
        </button>
      ))}
    </div>
  );
}
