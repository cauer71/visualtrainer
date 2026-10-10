/** Katalognummern der spielbaren Übungen (aus dem Übungskatalog); ohne Katalog (Vorschau, offline) bleibt die Zuordnung leer. */
let cache: Promise<Map<string, number[]>> | null = null;

export function loadCatalogNumbers(): Promise<Map<string, number[]>> {
  cache ??= fetch('./katalog/index.json')
    .then((r) => (r.ok ? (r.json() as Promise<{ items: { nr: number; blickfit: string | null }[] }>) : Promise.reject(new Error(String(r.status)))))
    .then((d) => {
      const m = new Map<string, number[]>();
      for (const it of d.items) if (it.blickfit) m.set(it.blickfit, [...(m.get(it.blickfit) ?? []), it.nr].sort((a, b) => a - b));
      return m;
    })
    .catch(() => {
      cache = null;
      return new Map<string, number[]>();
    });
  return cache;
}
