import { useEffect } from 'preact/hooks';
import { SCIENCE } from '../../content/science';
import { categoryMeta, EXERCISES } from '../../exercises/registry';
import { useApp } from '../app-context';
import { ArtIcon, Icon } from '../components/Icon';
import { exerciseHref, href } from '../router';

export function Science({ focus }: { focus?: string }) {
  const { ui, lang } = useApp();
  const s = ui.science;

  useEffect(() => {
    if (focus) {
      const el = document.getElementById(`sci-${focus}`);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [focus]);

  return (
    <main class="container science" id="main">
      <a class="back-link" href={href('/')}>
        <Icon name="back" size={20} /> {s.back}
      </a>
      <h1>{s.title}</h1>
      <p class="lead">{s.lead}</p>
      <p class="notice notice-info">
        <Icon name="info" size={18} /> {s.honest}
      </p>
      <section class="principles">
        <h2>{s.principlesTitle}</h2>
        <ul>
          {s.principles.map((p, i) => (
            <li key={i}>
              <Icon name="check" size={18} stroke={3} /> {p}
            </li>
          ))}
        </ul>
      </section>
      {EXERCISES.map((def) => {
        const entry = SCIENCE[def.id];
        const meta = categoryMeta(def.category);
        const tx = def.texts[lang];
        const st = entry?.texts[lang];
        return (
          <article class="sci-card" id={`sci-${def.id}`} key={def.id} style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
            <header class="sci-head">
              <span class="ex-card-icon">
                <ArtIcon svg={def.icon} size={30} />
              </span>
              <div>
                <h2>{tx.title}</h2>
                <p class="muted">{tx.tagline}</p>
              </div>
              {entry ? <span class={`evidence evidence-${entry.evidence}`}>{s.evidenceLevel[entry.evidence]}</span> : null}
            </header>
            {st ? (
              <dl class="sci-body">
                <dt>{s.trains}</dt>
                <dd>{st.trains}</dd>
                <dt>{s.daily}</dt>
                <dd>{st.daily}</dd>
                <dt>{s.research}</dt>
                <dd>{st.research}</dd>
                <dt>{s.improved}</dt>
                <dd>{st.improved}</dd>
              </dl>
            ) : (
              <p>{tx.why}</p>
            )}
            {entry?.sources.length ? (
              <details class="sources">
                <summary>
                  {s.sources} ({entry.sources.length})
                </summary>
                <ul>
                  {entry.sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} target="_blank" rel="noopener">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            <a class="btn btn-ghost btn-sm" href={exerciseHref(def.id)}>
              <Icon name="play" size={16} /> {tx.title}
            </a>
          </article>
        );
      })}
    </main>
  );
}
