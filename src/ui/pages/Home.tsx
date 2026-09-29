import { createFormatter } from '../../core/format';
import { countToday, daysThisWeek, doneToday, getRecord, WEEK_GOAL } from '../../core/storage';
import type { ExerciseDefinition } from '../../core/types';
import { byCategory, CATEGORIES, categoryMeta, dailySet, getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { ArtIcon, Icon } from '../components/Icon';
import { metricText } from '../metrics';
import { exerciseHref } from '../router';

export function Home() {
  const { ui, lang, dataVersion } = useApp();
  void dataVersion;
  const daily = dailySet();
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
                  <span class="daily-name">{def.texts[lang].title}</span>
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

      {CATEGORIES.map((cat) => {
        const list = byCategory(cat.id);
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
  const best = rec.best !== null && rec.unit ? metricText(rec.best, rec.unit, fmt, ui) : null;
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
