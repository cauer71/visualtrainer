import type { SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { clock, de, pct, SafetyNotice, Screen } from './common';

export function EndScreen({ session, onHistory, onStart }: { session: SessionRecord; onHistory: () => void; onStart: () => void }) {
  return (
    <Screen title={t.endTitle}>
      {session.endReason === 'complaints' && (
        <p class="bm-card bm-warn" id="end-complaints">
          {t.endComplaints}
        </p>
      )}
      <dl class="bm-card bm-facts" id="end-facts">
        <dt>{t.endPlayTime}</dt>
        <dd>{clock(session.activeMs)}</dd>
        <dt>{t.endLevels}</dt>
        <dd>{t.endLevelsValue(session.levelsPlayed, session.levelsCompleted, session.highestLevel)}</dd>
        <dt>{t.endSuccess}</dt>
        <dd>{pct(session.successRate)}</dd>
        <dt>{t.endContrast}</dt>
        <dd>{de(session.fellowContrastEnd)} %</dd>
      </dl>
      <div class="bm-actions">
        <button class="bm-btn bm-btn-primary" id="bm-to-history" onClick={onHistory}>
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
