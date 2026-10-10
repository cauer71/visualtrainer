import { GAMES } from '../games';
import type { GameSummary } from '../games/types';
import type { SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { clock, SafetyNotice, Screen } from './common';

/** Zusammenfassung nach dem Spiel: Spielzeit und Werte des Spiels */
export function EndScreen({ session, summary, onAgain, onHistory, onStart }: { session: SessionRecord; summary: GameSummary; onAgain: () => void; onHistory: () => void; onStart: () => void }) {
  const mod = GAMES[session.gameId];
  return (
    <Screen title={t.endTitle}>
      {session.endReason === 'complaints' && (
        <p class="bm-card bm-warn" id="end-complaints">
          {t.endComplaints}
        </p>
      )}
      <dl class="bm-card bm-facts" id="end-facts">
        <dt>{t.endGame2}</dt>
        <dd>{mod.title}</dd>
        <dt>{t.endPlayTime}</dt>
        <dd>{clock(session.activeMs)}</dd>
        {mod.rows(summary).map((r) => [
          <dt key={`${r.label}-t`}>{r.label}</dt>,
          <dd key={`${r.label}-d`}>{r.value}</dd>,
        ])}
      </dl>
      {session.levels && session.levels.length > 0 && (
        <section class="bm-card" id="end-levels">
          <h2>{t.nach.levelsTitle}</h2>
          <div class="bm-table-wrap">
            <table class="bm-table">
              <thead>
                <tr>
                  <th>{t.nach.thLevel}</th>
                  <th>{t.nach.thTime}</th>
                  <th>{t.nach.thErrors}</th>
                  <th>{t.nach.thAccuracy}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {session.levels.map((l, i) => (
                  <tr key={i} data-level={l.level}>
                    <td>{l.level}</td>
                    <td>{clock(l.ms)}</td>
                    <td>{l.errors}</td>
                    <td>{l.accuracy.toLocaleString('de-DE')} %</td>
                    <td>{l.completed ? t.nach.levelDone : t.nach.levelOpen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <div class="bm-actions">
        <button class="bm-btn bm-btn-primary" id="bm-again" onClick={onAgain}>
          {t.again}
        </button>
        <button class="bm-btn" id="bm-to-history" onClick={onHistory}>
          {t.toHistory}
        </button>
        <button class="bm-btn" id="bm-to-start" onClick={onStart}>
          {t.toStart}
        </button>
      </div>
      <SafetyNotice compact />
    </Screen>
  );
}
