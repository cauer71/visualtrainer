import { useEffect, useState } from 'preact/hooks';
import { brand } from '../config/brand';
import type { TagFilter } from '../exercises/registry';
import { useRoute } from './router';

/**
 * Filter „Alle · Labor · Ohne Labor“ (Optiker-Ansicht: Startseite und Auswahlliste der Optiker-Seite).
 * Die Wahl bleibt in `sessionStorage` erhalten; der URL-Parameter `?tag=labor` (auch im Hash: `#/?tag=labor`)
 * setzt den Filter, `?tag=nolabor` blendet Labor-Übungen aus, `?tag=all` zeigt alles.
 */
const KEY = `${brand.storageKey}:tagfilter`;

export function parseTagFilter(v: string | null | undefined): TagFilter | null {
  switch ((v ?? '').trim().toLowerCase()) {
    case 'labor':
      return 'labor';
    case 'nolabor':
    case 'ohne-labor':
    case 'ohnelabor':
      return 'nolabor';
    case 'all':
    case 'alle':
      return 'all';
    default:
      return null;
  }
}

function sessionStore(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStoredTagFilter(store: Pick<Storage, 'getItem'> | null = sessionStore()): TagFilter {
  try {
    return parseTagFilter(store?.getItem(KEY)) ?? 'all';
  } catch {
    return 'all';
  }
}

export function storeTagFilter(f: TagFilter, store: Pick<Storage, 'setItem'> | null = sessionStore()): void {
  try {
    store?.setItem(KEY, f);
  } catch {
    /* gesperrt: dann nur für diese Ansicht */
  }
}

/** Filter aus der URL (Hash-Query vor Query der Seite), sonst null */
export function tagFromUrl(hashQuery: URLSearchParams, search: string): TagFilter | null {
  const fromHash = parseTagFilter(hashQuery.get('tag'));
  if (fromHash) return fromHash;
  try {
    return parseTagFilter(new URLSearchParams(search).get('tag'));
  } catch {
    return null;
  }
}

function urlSearch(): string {
  try {
    return location.search;
  } catch {
    return '';
  }
}

/** Aktueller Filter (URL vor Speicher vor „Alle“) und Setter, der die Wahl merkt */
export function useTagFilter(): [TagFilter, (f: TagFilter) => void] {
  const route = useRoute();
  const urlTag = tagFromUrl(route.query, urlSearch());
  const [filter, setFilter] = useState<TagFilter>(() => urlTag ?? readStoredTagFilter());
  useEffect(() => {
    if (urlTag) {
      setFilter(urlTag);
      storeTagFilter(urlTag);
    }
  }, [urlTag]);
  return [
    filter,
    (f) => {
      setFilter(f);
      storeTagFilter(f);
    },
  ];
}
