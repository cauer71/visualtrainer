import { useEffect, useMemo, useState } from 'preact/hooks';
import { BELASTUNG_LABEL, EINGABE_LABEL, EVIDENZ_LABEL, PROFIL_LABEL, TABLET_LABEL, VORSICHT_LABEL } from '../../content/katalog-labels';
import { getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { Icon } from '../components/Icon';
import { renderMarkdown } from '../markdown';
import { exerciseHref, href } from '../router';

interface Item {
  nr: number;
  name: string;
  kapitel: string;
  kurz: string;
  ziel: string[];
  tablet: string;
  eingabe: string[];
  dauer: number | null;
  evidenz: { uebungseffekt: string; naher_transfer: string; alltag_transfer: string; kommentar: string };
  vorsicht: string[];
  profil: Record<string, Record<string, number>>;
  belastung: Record<string, number>;
  geeignet: string[];
  weniger: string[];
  aehnlich: number[];
  blickfit: string | null;
}

let cache: Promise<Item[]> | null = null;
function loadIndex(): Promise<Item[]> {
  if (!cache) {
    cache = fetch('./katalog/index.json')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<{ items: Item[] }>;
      })
      .then((d) => d.items)
      .catch((e) => {
        cache = null;
        throw e;
      });
  }
  return cache;
}

function useIndex(): { items: Item[] | null; error: boolean } {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    loadIndex().then(
      (i) => alive && setItems(i),
      () => alive && setError(true),
    );
    return () => {
      alive = false;
    };
  }, []);
  return { items, error };
}

const playable = (i: Item) => (i.blickfit && getExercise(i.blickfit) ? i.blickfit : null);

export function Catalog() {
  const { opt } = useApp();
  const { items, error } = useIndex();
  const [q, setQ] = useState('');
  const [chapter, setChapter] = useState('');
  const [onlyPlayable, setOnlyPlayable] = useState(false);
  const chapters = useMemo(() => [...new Set((items ?? []).map((i) => i.kapitel))], [items]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (items ?? []).filter((i) => {
      if (chapter && i.kapitel !== chapter) return false;
      if (onlyPlayable && !playable(i)) return false;
      if (!t) return true;
      const hay = `${i.nr} ${i.name} ${i.kurz} ${i.ziel.map((z) => PROFIL_LABEL[z] ?? z).join(' ')}`.toLowerCase();
      return hay.includes(t);
    });
  }, [items, q, chapter, onlyPlayable]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main class="container catalog" id="main">
      <a class="back-link" href={href('/optiker')}>
        <Icon name="back" size={20} /> {opt.navOptician}
      </a>
      <h1>{opt.catalogTitle}</h1>
      <p class="lead">{opt.catalogLead}</p>
      <div class="catalog-filters">
        <input type="search" class="input" placeholder={opt.catalogSearch} value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} aria-label={opt.catalogSearch} />
        <select class="input" value={chapter} onChange={(e) => setChapter((e.target as HTMLSelectElement).value)} aria-label={opt.catalogAll}>
          <option value="">{opt.catalogAll}</option>
          {chapters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label class="check">
          <input type="checkbox" checked={onlyPlayable} onChange={(e) => setOnlyPlayable((e.target as HTMLInputElement).checked)} /> {opt.catalogOnlyPlayable}
        </label>
        {items ? <span class="chip chip-sm">{opt.catalogCount(list.length)}</span> : null}
      </div>
      {error ? <p class="notice notice-info">{opt.catalogError}</p> : null}
      {!items && !error ? <p class="muted">{opt.catalogLoading}</p> : null}
      <ul class="catalog-list">
        {list.map((i) => (
          <li key={i.nr}>
            <a class="catalog-item" href={href(`/katalog/${i.nr}`)}>
              <span class="catalog-nr">{i.nr}</span>
              <span class="catalog-main">
                <strong>{i.name}</strong>
                <span class="muted">{i.kapitel}</span>
                <span class="catalog-tags">
                  {i.ziel.map((z) => (
                    <span class="chip chip-sm" key={z}>
                      {PROFIL_LABEL[z] ?? z}
                    </span>
                  ))}
                  <span class={`chip chip-sm tablet-${i.tablet}`}>{TABLET_LABEL[i.tablet] ?? i.tablet}</span>
                  {playable(i) ? <span class="chip chip-sm chip-good">{opt.catalogPlayable}</span> : null}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export function CatalogEntry({ nr }: { nr: string }) {
  const { opt } = useApp();
  const { items, error } = useIndex();
  const item = items?.find((i) => String(i.nr) === nr) ?? null;
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHtml(null);
    setFailed(false);
    let alive = true;
    fetch(`./katalog/uebungen/${encodeURIComponent(nr)}.md`)
      .then((r) => {
        const ct = r.headers.get('content-type') ?? '';
        if (!r.ok || ct.includes('text/html')) throw new Error('nicht gefunden');
        return r.text();
      })
      .then((t) => alive && setHtml(renderMarkdown(t, { catalogLink: (n) => href(`/katalog/${n}`) })))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [nr]);

  const play = item ? playable(item) : null;
  const active = (rec: Record<string, number>) => Object.entries(rec).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  return (
    <main class="container catalog-entry" id="main">
      <a class="back-link" href={href('/katalog')}>
        <Icon name="back" size={20} /> {opt.catalogBack}
      </a>
      {error || failed ? <p class="notice notice-info">{opt.catalogError}</p> : null}
      {item ? (
        <>
          <p class="kicker">
            {item.nr} · {item.kapitel}
          </p>
          <h1>{item.name}</h1>
          <p class="lead">{item.kurz}</p>
          <div class="entry-actions">
            {play ? (
              <a class="btn btn-primary" href={exerciseHref(play)}>
                <Icon name="play" size={18} /> {opt.catalogPlay}
              </a>
            ) : (
              <span class="chip">{opt.catalogNotPlayable}</span>
            )}
          </div>
          <p class="notice notice-info">
            <Icon name="info" size={18} /> {opt.catalogDisclaimer}
          </p>
          <section class="entry-facts">
            <div>
              <h2>{opt.catalogProfile}</h2>
              {(['visuell', 'kognitiv', 'motorisch'] as const).map((g) => (
                <div key={g} class="bars">
                  {active(item.profil[g] ?? {}).map(([k, v]) => (
                    <div class="bar-row" key={k}>
                      <span class="bar-label">{PROFIL_LABEL[k] ?? k}</span>
                      <span class={`bar bar-${v}`} role="img" aria-label={`${opt.scale[v]}`}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span class="bar-text">{opt.scale[v]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h2>{opt.catalogLoad}</h2>
              <div class="bars">
                {active(item.belastung).map(([k, v]) => (
                  <div class="bar-row" key={k}>
                    <span class="bar-label">{BELASTUNG_LABEL[k] ?? k}</span>
                    <span class={`bar bar-${v} bar-warn`} role="img" aria-label={`${opt.scale[v]}`}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span class="bar-text">{opt.scale[v]}</span>
                  </div>
                ))}
              </div>
              <h2>{opt.catalogCaution}</h2>
              {item.vorsicht.length ? (
                <p class="catalog-tags">
                  {item.vorsicht.map((v) => (
                    <span class="chip chip-sm chip-warn" key={v}>
                      {VORSICHT_LABEL[v] ?? v}
                    </span>
                  ))}
                </p>
              ) : (
                <p class="muted">{opt.catalogNoCaution}</p>
              )}
              <p class="catalog-tags">
                <span class={`chip chip-sm tablet-${item.tablet}`}>{TABLET_LABEL[item.tablet] ?? item.tablet}</span>
                <span class="chip chip-sm">
                  {opt.catalogInput}: {item.eingabe.map((e) => EINGABE_LABEL[e] ?? e).join(', ')}
                </span>
              </p>
              <h2>{opt.catalogEvidence}</h2>
              <ul class="plain">
                <li>
                  {opt.catalogEvidenceEffect}: <strong>{EVIDENZ_LABEL[item.evidenz.uebungseffekt]}</strong>
                </li>
                <li>
                  {opt.catalogEvidenceNear}: <strong>{EVIDENZ_LABEL[item.evidenz.naher_transfer]}</strong>
                </li>
                <li>
                  {opt.catalogEvidenceDaily}: <strong>{EVIDENZ_LABEL[item.evidenz.alltag_transfer]}</strong>
                </li>
              </ul>
              <p class="muted">{item.evidenz.kommentar}</p>
            </div>
          </section>
          {item.geeignet.length || item.weniger.length ? (
            <section class="entry-fit">
              {item.geeignet.length ? (
                <div>
                  <h2>{opt.catalogFits}</h2>
                  <ul>
                    {item.geeignet.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.weniger.length ? (
                <div>
                  <h2>{opt.catalogFitsNot}</h2>
                  <ul>
                    {item.weniger.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}
          {item.aehnlich.length ? (
            <p class="catalog-tags">
              <strong>{opt.catalogSimilar}:</strong>
              {item.aehnlich.map((n) => {
                const o = items?.find((x) => x.nr === n);
                return (
                  <a class="chip chip-sm" key={n} href={href(`/katalog/${n}`)}>
                    {n}
                    {o ? ` ${o.name.split(/[(–]/)[0].trim()}` : ''}
                  </a>
                );
              })}
            </p>
          ) : null}
        </>
      ) : !error ? (
        <p class="muted">{opt.catalogLoading}</p>
      ) : null}
      <h2 class="entry-fulltext-title">{opt.catalogFullText}</h2>
      {html ? <article class="md" dangerouslySetInnerHTML={{ __html: html }} /> : !failed ? <p class="muted">{opt.catalogLoading}</p> : null}
    </main>
  );
}
