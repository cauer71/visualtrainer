/** Kleine gemeinsame Bausteine der Oberfläche */
import type { ComponentChildren } from 'preact';
import { t } from '../texts';

export function SafetyNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside class={`bm-safety${compact ? ' bm-safety-compact' : ''}`} role="note" aria-label={t.safetyTitle}>
      <strong>{t.safetyTitle}:</strong> <span data-testid="safety-notice">{t.safetyNotice}</span>
      {!compact && <p>{t.complaintsAdvice}</p>}
    </aside>
  );
}

export function Screen({ title, onBack, children, wide = false, aside }: { title: string; onBack?: () => void; children: ComponentChildren; wide?: boolean; aside?: ComponentChildren }) {
  return (
    <div class={`bm-screen${wide ? ' bm-wide' : ''}`}>
      <header class="bm-head">
        {onBack && (
          <button class="bm-btn bm-btn-ghost" onClick={onBack}>
            ← {t.back}
          </button>
        )}
        <h1>{title}</h1>
        {aside && <div class="bm-head-aside">{aside}</div>}
      </header>
      {children}
    </div>
  );
}

/** mm:ss */
export function clock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/** Zahl mit Dezimalkomma */
export function de(v: number, digits = 1): string {
  return v.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

export function pct(v: number | null): string {
  return v === null ? '–' : `${Math.round(v * 100)} %`;
}

/** Datei zum Speichern anbieten (lokal, kein Upload) */
export function download(name: string, text: string, type: string): void {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Choice<T extends string>({ label, value, options, onChange, name }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; name: string }) {
  return (
    <fieldset class="bm-choice">
      <legend>{label}</legend>
      <div class="bm-choice-row">
        {options.map((o) => (
          <label class={`bm-chip${o.value === value ? ' is-on' : ''}`} key={o.value}>
            <input type="radio" name={name} value={o.value} checked={o.value === value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function NumberField({ label, value, min, max, step = 1, onChange, id }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; id: string }) {
  return (
    <label class="bm-field" for={id}>
      <span>{label}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const v = Number((e.currentTarget as HTMLInputElement).value);
          if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
      />
    </label>
  );
}

export function Toggle({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <label class="bm-toggle" for={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange((e.currentTarget as HTMLInputElement).checked)} />
      <span>{label}</span>
    </label>
  );
}

/** Formsymbol als neutrales SVG (weiß, für beide Augen) */
export function ShapeIcon({ shape, size = 28 }: { shape: string; size?: number }) {
  const r = 10;
  let el;
  if (shape === 'circle') el = <circle cx="12" cy="12" r={r} />;
  else if (shape === 'square') el = <rect x="3" y="3" width="18" height="18" />;
  else if (shape === 'triangle') el = <polygon points="12,2 22,20 2,20" />;
  else {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? 4.6 : 10.5;
      return `${(12 + Math.cos(a) * rr).toFixed(2)},${(12 + Math.sin(a) * rr).toFixed(2)}`;
    }).join(' ');
    el = <polygon points={pts} />;
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      {el}
    </svg>
  );
}
