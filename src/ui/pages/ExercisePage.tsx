import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { brand } from '../../config/brand';
import { createFormatter } from '../../core/format';
import { Runner } from '../../core/runner';
import { sfx, unlockAudio } from '../../core/sound';
import { getExerciseOptions, getRecord, saveResult, type SaveOutcome } from '../../core/storage';
import type { ExerciseDefinition, ExerciseResult } from '../../core/types';
import { categoryMeta, getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { DemoPlayer } from '../components/DemoPlayer';
import { ExerciseOptions } from '../components/ExerciseOptions';
import { ArtIcon, Icon } from '../components/Icon';
import { Sparkline } from '../components/Sparkline';
import { enterImmersive, exitImmersive } from '../immersive';
import { metricParts, metricText } from '../metrics';
import { exerciseHref, flags, go, href } from '../router';

interface Series {
  ids: string[];
  index: number;
}

function parseSeries(query: URLSearchParams): Series | null {
  const raw = query.get('serie');
  if (!raw) return null;
  const ids = raw.split(',').filter((id) => !!getExercise(id));
  if (!ids.length) return null;
  const index = Math.min(ids.length - 1, Math.max(0, Number(query.get('i') ?? 0) || 0));
  return { ids, index };
}

export function ExercisePage({ id, query }: { id: string; query: URLSearchParams }) {
  const def = getExercise(id);
  const series = useMemo(() => parseSeries(query), [query.toString()]);
  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(false);
  }, [id, query.toString()]);

  if (!def) {
    go('/');
    return null;
  }

  const start = () => {
    unlockAudio();
    enterImmersive();
    setSession(true);
  };

  // Während der Übung wird das Intro (mit laufendem Film) ausgehängt – spart Rechenzeit
  // und hält die Zeitmessung präzise.
  return session ? (
    <Session
      key={`${def.id}-${series?.index ?? 0}`}
      def={def}
      series={series}
      onClose={() => {
        exitImmersive();
        setSession(false);
      }}
    />
  ) : (
    <Intro def={def} series={series} onStart={start} />
  );
}

// ---------------------------------------------------------------------------

function Intro({ def, series, onStart }: { def: ExerciseDefinition; series: Series | null; onStart: () => void }) {
  const { ui, lang, isOptician } = useApp();
  const tx = def.texts[lang];
  const meta = categoryMeta(def.category);
  const rec = getRecord(def.id);
  const [curious, setCurious] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [def.id]);

  return (
    <main class="container intro" id="main" style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
      <div class="intro-top">
        <a class="back-link" href={href('/')}>
          <Icon name="back" size={20} /> {ui.intro.back}
        </a>
        {series ? <span class="chip chip-series">{ui.intro.series(series.index + 1, series.ids.length)}</span> : null}
      </div>
      <div class="intro-grid">
        <div class="intro-demo">
          <DemoPlayer def={def} lang={lang} label={ui.intro.demoLabel} />
        </div>
        <div class="intro-text">
          <div class="intro-title">
            <span class="intro-icon">
              <ArtIcon svg={def.icon} size={34} />
            </span>
            <div>
              <p class="kicker kicker-cat">{ui.categories[def.category].title}</p>
              <h1>{tx.title}</h1>
            </div>
          </div>
          <p class="intro-tagline">{tx.tagline}</p>
          <ol class="intro-steps" aria-label={ui.intro.howTo}>
            {tx.steps.map((s, i) => (
              <li key={i}>
                <span class="step-num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <ExerciseOptions def={def} texts={tx.options} />
          <button type="button" class="btn btn-primary btn-xl btn-block" onClick={onStart}>
            <Icon name="play" size={22} /> {ui.intro.start}
          </button>
          <p class="intro-meta">
            <span>
              <Icon name="clock" size={16} /> {ui.home.minutes(def.minutes)}
            </span>
            {def.showsLevel && rec.level !== null ? (
              <span>
                <Icon name="trophy" size={16} /> {ui.intro.level(Math.max(1, Math.round(rec.level)))}
              </span>
            ) : null}
          </p>
          {def.warning === 'flicker' ? (
            <p class="notice notice-warn">
              <Icon name="warn" size={18} /> {ui.intro.flicker}
            </p>
          ) : null}
          <p class="notice">
            <Icon name="info" size={18} /> {ui.intro.posture}
          </p>
          <div class="good-for">
            <span class="good-for-label">{ui.intro.goodFor}:</span>
            {tx.goodFor.map((g) => (
              <span class="chip chip-sm chip-cat" key={g}>
                {g}
              </span>
            ))}
          </div>
          <details class="curious" open={curious} onToggle={(e) => setCurious((e.currentTarget as HTMLDetailsElement).open)}>
            <summary>
              <Icon name="bulb" size={18} /> {ui.intro.curious}
            </summary>
            <p>{tx.why}</p>
            {isOptician ? <a href={href(`/hintergrund/${def.id}`)}>{ui.intro.moreScience} →</a> : null}
          </details>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------

interface Outcome {
  result: ExerciseResult;
  save: SaveOutcome;
}

function Session({ def, series, onClose }: { def: ExerciseDefinition; series: Series | null; onClose: () => void }) {
  const { lang } = useApp();
  const [runKey, setRunKey] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  useEffect(() => {
    overlay.current?.scrollTo?.(0, 0);
  }, [outcome]);

  const onFinish = (result: ExerciseResult) => {
    const save = saveResult(def.id, { primary: result.primary.value, score: result.score, level: result.level }, result.primary.unit, result.primary.better);
    setOutcome({ result, save });
  };

  const again = () => {
    unlockAudio();
    enterImmersive();
    setOutcome(null);
    setRunKey((k) => k + 1);
  };

  return (
    <div class={`session${outcome ? ' session-result' : ''}`} ref={overlay} role="dialog" aria-modal="true" aria-label={def.texts[lang].title}>
      {outcome ? (
        <ResultView def={def} outcome={outcome} series={series} onAgain={again} onClose={onClose} />
      ) : (
        <RunView key={runKey} def={def} onFinish={onFinish} onQuit={onClose} onRestart={again} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function RunView({
  def,
  onFinish,
  onQuit,
  onRestart,
}: {
  def: ExerciseDefinition;
  onFinish: (r: ExerciseResult) => void;
  onQuit: () => void;
  onRestart: () => void;
}) {
  const { ui, lang, sound, setSound } = useApp();
  const host = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const score = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const runnerRef = useRef<Runner | null>(null);
  const [count, setCount] = useState<string | null>('3');
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const countdown = () => {
    clearTimers();
    const steps: Array<[number, string | null]> = [
      [0, '3'],
      [650, '2'],
      [1300, '1'],
      [1950, ui.run.go],
      [2350, null],
    ];
    for (const [ms, v] of steps) {
      timers.current.push(
        window.setTimeout(() => {
          setCount(v);
          if (v === ui.run.go) sfx.go();
          else if (v) sfx.tick();
          else runnerRef.current?.start();
        }, ms),
      );
    }
  };

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const runner = new Runner({
      host: el,
      def,
      mode: 'play',
      lang,
      autoplay: flags.autoplay,
      quick: flags.quick,
      startLevel: getRecord(def.id).level,
      options: getExerciseOptions(def.id, def.options),
      sfx,
      domHud: { progress: progress.current, score: score.current, label: label.current },
      onFinish: (r) => onFinish(r),
      onError: () => setFailed(true),
    });
    runnerRef.current = runner;
    countdown();
    const onVis = () => {
      if (document.hidden) pause();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearTimers();
      document.removeEventListener('visibilitychange', onVis);
      runner.destroy();
      runnerRef.current = null;
    };
  }, []);

  const pause = () => {
    const r = runnerRef.current;
    if (!r || r.isFinished) return;
    // Läuft noch der Countdown, wird er beim Weitermachen neu gestartet
    clearTimers();
    r.pause();
    setPaused(true);
  };

  const resume = () => {
    setPaused(false);
    const r = runnerRef.current;
    if (!r) return;
    if (!r.isPaused) {
      // Countdown war noch nicht fertig → neu zählen
      setCount('3');
      countdown();
    } else {
      r.resume();
    }
  };

  return (
    <div class="run">
      <div class="hud">
        <button type="button" class="hud-btn" onClick={pause} aria-label={ui.run.pause}>
          <Icon name="pause" size={22} stroke={2.8} />
        </button>
        <div class="hud-progress" aria-hidden="true">
          <div class="hud-progress-bar" ref={progress} />
        </div>
        <span class="hud-label" ref={label} hidden />
        <span class="hud-score" ref={score} hidden />
        <button
          type="button"
          class="hud-btn"
          onClick={() => setSound(!sound)}
          aria-label={sound ? ui.run.soundOn : ui.run.soundOff}
          aria-pressed={sound}
        >
          <Icon name={sound ? 'soundOn' : 'soundOff'} size={22} />
        </button>
      </div>
      <div class="stage" ref={host} />
      {count !== null && !paused ? (
        <div class="countdown" aria-live="assertive">
          <span key={count} class="countdown-num">
            {count}
          </span>
        </div>
      ) : null}
      {paused ? (
        <div class="modal-backdrop">
          <div class="modal">
            <h2>{ui.run.paused}</h2>
            <p>{ui.run.pausedText}</p>
            <button type="button" class="btn btn-primary btn-xl btn-block" onClick={resume}>
              <Icon name="play" size={20} /> {ui.run.resume}
            </button>
            <div class="modal-row">
              <button type="button" class="btn btn-ghost" onClick={onRestart}>
                <Icon name="refresh" size={18} /> {ui.run.restart}
              </button>
              <button type="button" class="btn btn-ghost" onClick={onQuit}>
                <Icon name="close" size={18} /> {ui.run.quit}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {failed ? (
        <div class="modal-backdrop">
          <div class="modal">
            <h2>{ui.run.error}</h2>
            <div class="modal-row">
              <button type="button" class="btn btn-primary" onClick={onRestart}>
                {ui.run.errorRetry}
              </button>
              <button type="button" class="btn btn-ghost" onClick={onQuit}>
                {ui.run.quit}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------

function ResultView({
  def,
  outcome,
  series,
  onAgain,
  onClose,
}: {
  def: ExerciseDefinition;
  outcome: Outcome;
  series: Series | null;
  onAgain: () => void;
  onClose: () => void;
}) {
  const { ui, lang, bumpData } = useApp();
  const tx = def.texts[lang];
  const fmt = createFormatter(lang);
  const { result, save } = outcome;
  const p = result.primary;
  const parts = metricParts(p.value, p.unit, fmt, ui);
  const prev = save.previous;
  const improved = prev ? (p.better === 'higher' ? p.value > prev.p : p.value < prev.p) : false;
  const headline = !prev ? ui.result.first : save.isBest ? ui.result.newBest : improved ? ui.result.better : ui.result.steady;
  const history = save.record.history.map((h) => h.p);
  const meta = categoryMeta(def.category);

  useEffect(() => {
    bumpData();
    exitImmersive();
  }, []);

  const nextInSeries = series && series.index + 1 < series.ids.length ? getExercise(series.ids[series.index + 1]) : null;
  const seriesFinished = series && series.index + 1 >= series.ids.length;

  const goNext = () => {
    if (!series || !nextInSeries) return;
    onClose();
    location.hash = exerciseHref(nextInSeries.id, series.ids, series.index + 1);
  };

  const goHome = () => {
    onClose();
    go('/');
  };

  return (
    <main class="result container" style={{ '--cat': meta.color, '--cat-soft': meta.soft }}>
      <div class="result-card">
        <p class="kicker kicker-cat">{tx.title}</p>
        <h1 class="result-headline">
          {save.isBest ? <Icon name="trophy" size={30} /> : <Icon name="sparkle" size={28} />} {headline}
        </h1>
        <div class="result-cols">
          <div class="result-col">
        <div class="result-main">
          {(tx.metrics[p.key] ?? p.key).trim().toLowerCase() !== (parts.prefix ?? '').trim().toLowerCase() ? (
            <p class="result-label">{tx.metrics[p.key] ?? p.key}</p>
          ) : null}
          <p class="result-value">
            {parts.prefix ? <span class="result-prefix">{parts.prefix} </span> : null}
            {parts.value}
            {parts.unit ? <span class="result-unit"> {parts.unit}</span> : null}
          </p>
          <div class="result-compare">
            {prev ? (
              <span class="chip">
                {ui.result.last}: {metricText(prev.p, p.unit, fmt, ui)}
              </span>
            ) : null}
            {save.previousBest !== null ? (
              <span class="chip chip-best">
                <Icon name="trophy" size={14} /> {ui.result.best}: {metricText(save.isBest ? p.value : save.previousBest, p.unit, fmt, ui)}
              </span>
            ) : null}
          </div>
        </div>
        {result.secondary.length ? (
          <div class="result-stats">
            {result.secondary.map((m) => (
              <div class="stat" key={m.key}>
                <span class="stat-value">{metricText(m.value, m.unit, fmt, ui)}</span>
                <span class="stat-label">{tx.metrics[m.key] ?? m.key}</span>
              </div>
            ))}
          </div>
        ) : null}
          </div>
          <div class="result-col">
        {history.length >= 2 ? (
          <div class="result-history">
            <div class="result-history-head">
              <span>{ui.result.history}</span>
              <span class="muted">{ui.result.historyUp}</span>
            </div>
            <Sparkline values={history} better={p.better} color={meta.color} />
          </div>
        ) : null}
        {p.unit === 'time' || p.unit === 'ms' ? <p class="muted small">{ui.result.deviceNote}</p> : null}
        {result.tip && tx.tips[result.tip] ? (
          <div class="tip">
            <Icon name="bulb" size={22} />
            <div>
              <strong>{ui.result.tip}</strong>
              <p>{tx.tips[result.tip]}</p>
            </div>
          </div>
        ) : null}
        {def.showsLevel ? <p class="muted small">{ui.result.levelNow(Math.max(1, Math.round(result.level)))}</p> : null}
          </div>
        </div>
        {result.details?.length ? (
          <div class="result-details">
            {result.details.map((tb) => (
              <section class="result-table" key={tb.title}>
                <h2 class="result-table-title">{tb.title}</h2>
                <table>
                  <tbody>
                    {tb.rows.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">
                          {r.label}
                          {r.text ? <span class="result-table-text">{r.text}</span> : null}
                        </th>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tb.note ? <p class="muted small">{tb.note}</p> : null}
              </section>
            ))}
          </div>
        ) : null}
        {seriesFinished ? (
          <div class="series-done">
            <Icon name="check" size={22} stroke={3} />
            <div>
              <strong>{ui.result.seriesDone}</strong>
              <p>{ui.result.seriesDoneText}</p>
            </div>
          </div>
        ) : null}
        <div class="result-actions">
          {nextInSeries ? (
            <button type="button" class="btn btn-primary btn-xl" onClick={goNext}>
              {ui.result.nextNamed(nextInSeries.texts[lang].title)} <Icon name="arrowRight" size={20} />
            </button>
          ) : null}
          <button type="button" class={`btn ${nextInSeries ? 'btn-ghost' : 'btn-primary btn-xl'}`} onClick={onAgain}>
            <Icon name="refresh" size={20} /> {ui.result.again}
          </button>
          <button type="button" class="btn btn-ghost" onClick={goHome}>
            {ui.result.overview}
          </button>
        </div>
        <p class="muted small">{ui.result.practice}</p>
        {brand.appointmentUrl ? (
          <p class="result-cta small">
            <Icon name="eye" size={16} /> {ui.footer.cta}{' '}
            <a href={brand.appointmentUrl} target="_blank" rel="noopener">
              {ui.footer.ctaButton}
            </a>
          </p>
        ) : null}
      </div>
    </main>
  );
}
