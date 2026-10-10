import { useEffect, useState } from 'preact/hooks';

export type RouteName = 'home' | 'exercise' | 'science' | 'catalog' | 'catalogEntry' | 'optiker' | 'calibrate' | 'developer' | 'mine';

export interface Route {
  name: RouteName;
  id?: string;
  query: URLSearchParams;
}

/** Hash-Routing: funktioniert ohne Server-Konfiguration, in Unterordnern und im iframe. */
export function parseHash(hash: string = location.hash): Route {
  const raw = hash.replace(/^#/, '');
  const [path, qs = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const query = new URLSearchParams(qs);
  if (parts[0] === 'uebung' && parts[1]) return { name: 'exercise', id: decodeURIComponent(parts[1]), query };
  if (parts[0] === 'hintergrund') return { name: 'science', id: parts[1] ? decodeURIComponent(parts[1]) : undefined, query };
  if (parts[0] === 'katalog') return parts[1] ? { name: 'catalogEntry', id: decodeURIComponent(parts[1]), query } : { name: 'catalog', query };
  if (parts[0] === 'optiker') return { name: 'optiker', query };
  if (parts[0] === 'meine') return { name: 'mine', query };
  if (parts[0] === 'entwickler') return { name: 'developer', query };
  if (parts[0] === 'kalibrieren') return { name: 'calibrate', query };
  return { name: 'home', query };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function href(path: string): string {
  return `#${path.startsWith('/') ? path : `/${path}`}`;
}

export function go(path: string): void {
  const next = href(path);
  if (location.hash === next) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = next;
}

export function exerciseHref(id: string, series?: string[], index?: number): string {
  if (series && series.length) return href(`/uebung/${id}?serie=${series.join(',')}&i=${index ?? 0}`);
  return href(`/uebung/${id}`);
}

/** Globale Schalter über die normale Query (?quick=1&autoplay=1&embed=1) */
export const flags = (() => {
  let q: URLSearchParams;
  try {
    q = new URLSearchParams(location.search);
  } catch {
    q = new URLSearchParams();
  }
  return {
    quick: q.get('quick') === '1',
    autoplay: q.get('autoplay') === '1',
    embed: q.get('embed') === '1',
  };
})();
