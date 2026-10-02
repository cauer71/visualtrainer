import { createFormatter } from '../../core/format';
import { bestFor, countToday, currentVariant, daysThisWeek, doneToday, getRecord, WEEK_GOAL } from '../../core/storage';
import type { ExerciseDefinition } from '../../core/types';
import { byCategory, CATEGORIES, categoryMeta, EXERCISES, getExercise, matchesTagFilter, type TagFilter } from '../../exercises/registry';
import { dailySet } from '../../exercises/registry';
import { useApp } from '../app-context';
import { ArtIcon, Icon } from '../components/Icon';
import { LaborBadge } from '../components/LaborBadge';
import { TagFilterChips } from '../components/TagFilter';
import { metricText } from '../metrics';
import { exerciseHref, href } from '../router';
import { useTagFilter } from '../tag-filter';

export function Home() {
  const { ui, lang, dataVersion, isOptician, customerIds, opt } = useApp();
  void dataVersion;
  // Filter „Alle · Labor · Ohne Labor“ (nur Optiker-Ansicht; die Wahl bleibt in sessionStorage, ?tag=labor setzt sie)
  const [tagFilter, setTagFilter] = useTagFilter();
  const filtered = (cat: (typeof CATEGORIES)[number]) => byCategory(cat.id).filter((d) => matchesTagFilter(d, tagFilter));
  const filterCounts: Record<TagFilter, number> = {
    all: EXERCISES.length,
    labor: EXERCISES.filter((d) => matchesTagFilter(d, 'labor')).length,
    nolabor: EXERCISES.filter((d) => matchesTagFilter(d, 'nolabor')).length,
  };
  const anyShown = CATEGORIES.some((c) => filtered(c).length > 0);
  // Tagestraining: Kunden üben die vom Optiker gewählten Übungen, der Optiker eine je Bereich
  const daily = isOptician ? dailySet() : customerIds.filter((id) => getExercise(id));
  const dailyDone = daily.every((id) => doneToday(id));
  const firstOpen = daily.findIndex((id) => !doneToday(id));
  const startIndex = dailyDone ? 0 : Math.max(0, firstOpen);
  const week = daysThisWeek();
  const today = countToday();
  const dailyMinutes = daily.reduce((sum, id) => sum + (getExercise(id)?.minutes ?? 1), 0) + 1;

  return (
    <main class="container home" id="main">
      <section class="hero">
        <div class="hero-text">
          <p class="kicker">{ui.home.kicker}</p>
          <h1>{ui.home.title}</h1>
          <p class="lead">{ui.home.subtitle}</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-xl" href={exerciseHref(daily[startIndex], daily, startIndex)}>
              <Icon name="play" size={22} />
              <span>{dailyDone ? ui.home.dailyAgain : ui.home.daily}</span>
            </a>
            <span class="hero-info">
              <Icon name="clock" size={18} /> {ui.home.dailyInfo(daily.length, dailyMinutes)}
            </span>
          </div>
          <div class="hero-stats">
            <span class={`chip ${week >= WEEK_GOAL ? 'chip-good' : 'chip-week'}`} title={ui.home.week(week, WEEK_GOAL)}>
              <span class="week-dots" aria-hidden="true">
                {Array.from({ length: WEEK_GOAL }, (_, i) => (
                  <span key={i} class={`week-dot${i < week ? ' is-on' : ''}`} />
                ))}
              </span>
              {week >= WEEK_GOAL ? ui.home.weekDone : ui.home.week(week, WEEK_GOAL)}
            </span>
            <span class="chip">
              <Icon name="calendar" size={16} /> {ui.home.today(today)}
            </span>
            {dailyDone ? (
              <span class="chip chip-good">
                <Icon name="check" size={16} /> {ui.home.dailyDone}
              </span>
            ) : null}
          </div>
        </div>
        <ol class="daily-list" aria-label={ui.home.daily}>
          {daily.map((id, i) => {
            const def = getExercise(id);
            if (!def) return null;
            const meta = categoryMeta(def.category);
            const done = doneToday(id);
            return (
              <li key={id}>
                <a class={`daily-item${done ? ' is-done' : ''}`} href={exerciseHref(id, daily, i)} style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
                  <span class="daily-num">{done ? <Icon name="check" size={18} stroke={3} /> : i + 1}</span>
                  <span class="daily-icon">
                    <ArtIcon svg={def.icon} size={28} />
                  </span>
                  <span class="daily-name">
                    {def.texts[lang].title} <LaborBadge def={def} />
                  </span>
                  <Icon name="next" size={20} class="daily-go" />
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section class="how" aria-labelledby="how-title">
        <h2 id="how-title" class="section-title">{ui.home.how}</h2>
        <ol class="how-steps">
          {ui.home.howSteps.map((s, i) => (
            <li key={i}>
              <span class="how-num">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {!isOptician ? (
        <section class="category customer-list" aria-labelledby="cust-title">
          <div class="category-head">
            <div>
              <h2 id="cust-title">{ui.nav.exercises}</h2>
            </div>
          </div>
          <div class="card-grid">
            {daily.map((id) => {
              const def = getExercise(id);
              return def ? <ExerciseCard key={def.id} def={def} /> : null;
            })}
          </div>
        </section>
      ) : null}

      {isOptician ? (
        <p class="optician-hint">
          <a class="btn btn-ghost btn-sm" href={href('/optiker')}>
            {opt.navOptician}
          </a>{' '}
          <a class="btn btn-ghost btn-sm" href={href('/katalog')}>
            {opt.shortcutCatalog}
          </a>
        </p>
      ) : null}

      {isOptician ? (
        <section class="filter-bar" aria-label={ui.tagFilter.label}>
          <TagFilterChips value={tagFilter} onChange={setTagFilter} counts={filterCounts} />
        </section>
      ) : null}
      {isOptician && !anyShown ? <p class="muted filter-empty">{ui.tagFilter.empty}</p> : null}

      {(isOptician ? CATEGORIES : []).map((cat) => {
        const list = filtered(cat);
        if (!list.length) return null;
        const ct = ui.categories[cat.id];
        return (
          <section class="category" key={cat.id} aria-labelledby={`cat-${cat.id}`} style={{ '--cat': cat.color, '--cat-soft': cat.soft }}>
            <div class="category-head">
              <span class="category-icon">
                <ArtIcon svg={cat.icon} size={26} />
              </span>
              <div>
                <h2 id={`cat-${cat.id}`}>{ct.title}</h2>
                <p>{ct.text}</p>
              </div>
            </div>
            <div class="card-grid">
              {list.map((def) => (
                <ExerciseCard key={def.id} def={def} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

function ExerciseCard({ def }: { def: ExerciseDefinition }) {
  const { ui, lang } = useApp();
  const tx = def.texts[lang];
  const rec = getRecord(def.id);
  const done = doneToday(def.id);
  const fmt = createFormatter(lang);
  // Bei Übungen mit Einstellungen gilt der Bestwert der gerade gespeicherten Einstellungen
  const bestValue = bestFor(rec, currentVariant(def.id, def.params));
  const best = bestValue !== null && rec.unit ? metricText(bestValue, rec.unit, fmt, ui) : null;
  const meta = categoryMeta(def.category);
  return (
    <a class="ex-card" href={exerciseHref(def.id)} style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
      <span class="ex-card-icon">
        <ArtIcon svg={def.icon} size={34} />
      </span>
      <span class="ex-card-body">
        <span class="ex-card-title">
          {tx.title}
          {done ? (
            <span class="badge badge-good" title={ui.home.doneToday}>
              <Icon name="check" size={14} stroke={3} />
            </span>
          ) : null}
        </span>
        <span class="ex-card-tagline">{tx.tagline}</span>
        <span class="ex-card-meta">
          <LaborBadge def={def} />
          <span class="chip chip-sm">
            <Icon name="clock" size={14} /> {ui.home.minutes(def.minutes)}
          </span>
          {best ? (
            <span class="chip chip-sm chip-best">
              <Icon name="trophy" size={14} /> {best}
            </span>
          ) : (
            <span class="chip chip-sm chip-new">{ui.home.fresh}</span>
          )}
        </span>
      </span>
    </a>
  );
}
