import type { Formatter } from './types';
import type { Lang } from '../i18n/lang';

const cache = new Map<string, Intl.NumberFormat>();

function nf(lang: Lang, digits: number): Intl.NumberFormat {
  const key = `${lang}:${digits}`;
  let f = cache.get(key);
  if (!f) {
    f = new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'de-DE', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    cache.set(key, f);
  }
  return f;
}

export function createFormatter(lang: Lang): Formatter {
  return {
    num: (v, digits = 0) => nf(lang, digits).format(v),
    time: (ms, digits = 2) => `${nf(lang, digits).format(ms / 1000)} s`,
    ms: (ms) => `${nf(lang, 0).format(Math.round(ms))} ms`,
    msSigned: (ms) => {
      const r = Math.round(ms);
      const sign = r > 0 ? '+' : r < 0 ? '−' : '±';
      return `${sign}${nf(lang, 0).format(Math.abs(r))} ms`;
    },
    pct: (v) => `${nf(lang, 0).format(Math.round(v))} %`,
  };
}
