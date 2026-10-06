/** Levelauswahl: Übersicht aller Level mit besten Sternen; gesperrte Level sind nicht wählbar */
import { isUnlocked, type Progress } from '../data/progress';
import { LEVELS } from '../levels';
import { t } from '../texts';
import { Screen } from './common';

export function LevelGrid({ progress, current, onPick }: { progress: Progress; current: number; onPick: (n: number) => void }) {
  return (
    <ol class="bm-levels" id="level-grid">
      {LEVELS.map((lv) => {
        const open = isUnlocked(progress, lv.number);
        const stars = progress.bestStars[lv.id] ?? 0;
        const name = t.levelNames[lv.nameKey] ?? lv.id;
        return (
          <li key={lv.id}>
            <button
              class={`bm-level${lv.number === current ? ' is-current' : ''}${open ? '' : ' is-locked'}`}
              id={`bm-level-${lv.number}`}
              disabled={!open}
              aria-label={`${t.levelCard(lv.number, name)} – ${open ? t.levelStars(stars) : t.levelLocked}`}
              onClick={() => onPick(lv.number)}
            >
              <span class="bm-level-no">{lv.number}</span>
              <span class="bm-level-name">{name}</span>
              <span class="bm-level-stars" data-stars={stars} aria-hidden="true">
                {open ? [0, 1, 2].map((i) => (i < stars ? '★' : '☆')).join('') : t.levelLocked}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function LevelSelectScreen({ progress, onBack, onPlay }: { progress: Progress; onBack: () => void; onPlay: (n: number) => void }) {
  const current = isUnlocked(progress, progress.level) ? progress.level : 1;
  return (
    <Screen
      title={t.levelSelectTitle}
      onBack={onBack}
      wide
      aside={
        <button class="bm-btn bm-btn-primary" id="bm-play-level" onClick={() => onPlay(current)}>
          {t.playLevel(current)}
        </button>
      }
    >
      <p class="bm-muted">{t.levelSelectHint}</p>
      <LevelGrid progress={progress} current={current} onPick={onPlay} />
    </Screen>
  );
}
