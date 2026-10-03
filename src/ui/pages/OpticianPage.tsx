import { useState } from 'preact/hooks';
import { GENERAL_ID } from '../../feedback/logic';
import { CUSTOMER_COUNT, DEFAULT_CUSTOMER_IDS } from '../../core/storage';
import { categoryMeta, EXERCISES, matchesTagFilter, type TagFilter } from '../../exercises/registry';
import { useApp } from '../app-context';
import { ArtIcon, Icon } from '../components/Icon';
import { FeedbackButton } from '../components/FeedbackDialog';
import { LaborBadge } from '../components/LaborBadge';
import { TagFilterChips } from '../components/TagFilter';
import { href } from '../router';
import { useTagFilter } from '../tag-filter';

export function OpticianPage() {
  const { opt, ui, lang, customerIds, setCustomerIds } = useApp();
  const [saved, setSaved] = useState(false);
  // dieselbe Filterwahl wie auf der Startseite (sessionStorage, ?tag=labor)
  const [tagFilter, setTagFilter] = useTagFilter();
  const shown = EXERCISES.filter((d) => matchesTagFilter(d, tagFilter));
  const counts: Record<TagFilter, number> = {
    all: EXERCISES.length,
    labor: EXERCISES.filter((d) => matchesTagFilter(d, 'labor')).length,
    nolabor: EXERCISES.filter((d) => matchesTagFilter(d, 'nolabor')).length,
  };
  const toggle = (id: string) => {
    let next: string[];
    if (customerIds.includes(id)) next = customerIds.filter((x) => x !== id);
    else next = [...customerIds, id];
    setCustomerIds(next);
    setSaved(true);
  };
  const ok = customerIds.length === CUSTOMER_COUNT;
  return (
    <main class="container optician" id="main">
      <a class="back-link" href={href('/')}>
        <Icon name="back" size={20} /> {opt.backToHome}
      </a>
      <h1>{opt.opticianTitle}</h1>
      <p class="lead">{opt.opticianLead}</p>

      <section class="opt-shortcuts" aria-labelledby="opt-sc">
        <h2 id="opt-sc">{opt.shortcutsTitle}</h2>
        <div class="card-grid">
          <a class="ex-card" href={href('/hintergrund')}>
            <span class="ex-card-icon">
              <Icon name="book" size={30} />
            </span>
            <span class="ex-card-body">
              <span class="ex-card-title">{opt.shortcutScience}</span>
              <span class="ex-card-tagline">{opt.shortcutScienceText}</span>
            </span>
          </a>
          <a class="ex-card" href={href('/katalog')}>
            <span class="ex-card-icon">
              <Icon name="sparkle" size={30} />
            </span>
            <span class="ex-card-body">
              <span class="ex-card-title">{opt.shortcutCatalog}</span>
              <span class="ex-card-tagline">{opt.shortcutCatalogText}</span>
            </span>
          </a>
          <a class="ex-card" href={href('/kalibrieren')}>
            <span class="ex-card-icon">
              <Icon name="sliders" size={30} />
            </span>
            <span class="ex-card-body">
              <span class="ex-card-title">{opt.shortcutCalib}</span>
              <span class="ex-card-tagline">{opt.shortcutCalibText}</span>
            </span>
          </a>
          <a class="ex-card" href="./vr/">
            <span class="ex-card-icon">
              <Icon name="eye" size={30} />
            </span>
            <span class="ex-card-body">
              <span class="ex-card-title">{opt.shortcutVr}</span>
              <span class="ex-card-tagline">{opt.shortcutVrText}</span>
            </span>
          </a>
        </div>
        <div class="opt-feedback">
          <p class="muted">{opt.fbGeneralText}</p>
          <p class="opt-feedback-actions">
            <FeedbackButton exercise={GENERAL_ID} name={opt.fbGeneralName} class="btn btn-ghost" />
            <a class="btn btn-ghost btn-sm" href={href('/entwickler')}>
              {opt.fbDeveloper}
            </a>
          </p>
        </div>
      </section>

      <section class="opt-customer" aria-labelledby="opt-cu">
        <h2 id="opt-cu">{opt.customerTitle}</h2>
        <p>{opt.customerText(CUSTOMER_COUNT)}</p>
        <p class={`chip ${ok ? 'chip-good' : 'chip-new'}`} role="status">
          {opt.customerSelected(customerIds.length, CUSTOMER_COUNT)}
          {!ok ? ` – ${opt.customerPickOne}` : ''}
        </p>
        <div class="filter-bar">
          <TagFilterChips value={tagFilter} onChange={setTagFilter} counts={counts} />
        </div>
        {!shown.length ? <p class="muted filter-empty">{ui.tagFilter.empty}</p> : null}
        <ul class="pick-list">
          {shown.map((def) => {
            const meta = categoryMeta(def.category);
            const on = customerIds.includes(def.id);
            const full = !on && customerIds.length >= CUSTOMER_COUNT;
            return (
              <li key={def.id}>
                <label class={`pick${on ? ' is-on' : ''}${full ? ' is-disabled' : ''}`} style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
                  <input type="checkbox" checked={on} disabled={full} onChange={() => toggle(def.id)} />
                  <span class="ex-card-icon">
                    <ArtIcon svg={def.icon} size={26} />
                  </span>
                  <span class="pick-text">
                    <strong>{def.texts[lang].title}</strong>
                    <span class="muted">
                      {ui.categories[def.category].title} <LaborBadge def={def} />
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
        <div class="pick-actions">
          <button
            type="button"
            class="btn btn-ghost btn-sm"
            onClick={() => {
              setCustomerIds([...DEFAULT_CUSTOMER_IDS]);
              setSaved(true);
            }}
          >
            <Icon name="refresh" size={16} /> {opt.customerReset}
          </button>
          {saved ? (
            <span class="footer-msg" role="status">
              {opt.customerSaved}
            </span>
          ) : null}
        </div>
      </section>
    </main>
  );
}
