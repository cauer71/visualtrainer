export type Lang = 'de' | 'it';
export const LANGS: readonly Lang[] = ['de', 'it'];

export function isLang(v: unknown): v is Lang {
  return v === 'de' || v === 'it';
}

/** Sprache aus URL (?lang=it), gespeicherter Einstellung oder Browser ableiten. */
export function detectLang(stored?: Lang | null): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (isLang(q)) return q;
  } catch {
    /* ignorieren */
  }
  if (stored && isLang(stored)) return stored;
  const nav = (typeof navigator !== 'undefined' && (navigator.languages?.[0] || navigator.language)) || 'de';
  return nav.toLowerCase().startsWith('it') ? 'it' : 'de';
}
