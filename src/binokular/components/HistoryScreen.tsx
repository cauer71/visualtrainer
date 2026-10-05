/** Verlaufsansicht: vier Diagramme und eine Tabelle (Tabelle = Textfassung der Diagramme) */
import { sessionsToCsv } from '../data/csv';
import { minutesPerDay, type SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { ColumnChart, LineChart, type Point } from './charts';
import { clock, de, download, pct, Screen } from './common';

const short = (date: string) => {
  const [, m, d] = date.split('-');
  return `${Number(d)}.${Number(m)}.`;
};

export function HistoryScreen({ sessions, onBack }: { sessions: SessionRecord[]; onBack: () => void }) {
  const label = (s: SessionRecord, i: number) => (sessions.length > 6 ? String(i + 1) : short(s.date));
  const contrast: Point[] = sessions.map((s, i) => ({ label: label(s, i), value: s.fellowContrastEnd, tip: `${s.date} ${s.startTime}: ${de(s.fellowContrastEnd)} %` }));
  const success: Point[] = sessions.map((s, i) => ({
    label: label(s, i),
    value: s.successRate === null ? null : Math.round(s.successRate * 100),
    tip: `${s.date} ${s.startTime}: ${pct(s.successRate)} (${s.levelsCompleted}/${s.levelsPlayed})`,
  }));
  const perDay: Point[] = minutesPerDay(sessions).map((d) => ({ label: short(d.date), value: d.minutes, tip: `${d.date}: ${de(d.minutes)} min` }));
  const supp: Point[] = sessions.map((s, i) => ({
    label: label(s, i),
    value: s.suppressionAccuracy === null ? null : Math.round(s.suppressionAccuracy * 100),
    tip: `${s.date} ${s.startTime}: ${pct(s.suppressionAccuracy)} (${s.suppressionChecks.filter((c) => c.correct).length}/${s.suppressionChecks.length})`,
  }));
  const anySupp = supp.some((p) => p.value !== null);
  return (
    <Screen
      title={t.historyTitle}
      onBack={onBack}
      wide
      aside={
        sessions.length > 0 && (
          <button class="bm-btn" id="bm-csv" onClick={() => download(`binokular-sessions-${new Date().toISOString().slice(0, 10)}.csv`, sessionsToCsv(sessions), 'text/csv;charset=utf-8')}>
            {t.exportCsv}
          </button>
        )
      }
    >
      {sessions.length === 0 ? (
        <p class="bm-card" id="history-empty">
          {t.historyEmpty}
        </p>
      ) : (
        <>
          <p class="bm-muted">{t.historyNote}</p>
          <div class="bm-charts" id="history-charts">
            <figure class="bm-card">
              <figcaption>{t.chartContrast}</figcaption>
              <LineChart points={contrast} max={100} />
            </figure>
            <figure class="bm-card">
              <figcaption>{t.chartSuccess}</figcaption>
              <ColumnChart points={success} floorMax={100} />
            </figure>
            <figure class="bm-card">
              <figcaption>{t.chartMinutes}</figcaption>
              <ColumnChart points={perDay} floorMax={10} />
            </figure>
            <figure class="bm-card">
              <figcaption>{t.chartSuppression}</figcaption>
              {anySupp ? <LineChart points={supp} max={100} /> : <p class="bm-muted">{t.chartNoData}</p>}
            </figure>
          </div>
          <section class="bm-card">
            <h2>{t.tableTitle}</h2>
            <div class="bm-table-wrap">
              <table class="bm-table">
                <thead>
                  <tr>
                    <th>{t.thDate}</th>
                    <th>{t.thStart}</th>
                    <th>{t.thActive}</th>
                    <th>{t.thLevels}</th>
                    <th>{t.thStars}</th>
                    <th>{t.thSuccess}</th>
                    <th>{t.thErrors}</th>
                    <th>{t.thContrast}</th>
                    <th>{t.thChecks}</th>
                    <th>{t.thNote}</th>
                    <th>{t.thEnd}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...sessions].reverse().map((s) => (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td>{s.startTime}</td>
                      <td>{clock(s.activeMs)}</td>
                      <td>
                        {s.levelsCompleted}/{s.levelsPlayed}
                      </td>
                      <td>{s.stars}</td>
                      <td>{pct(s.successRate)}</td>
                      <td>{s.errors}</td>
                      <td>
                        {de(s.fellowContrastStart)} → {de(s.fellowContrastEnd)} %
                      </td>
                      <td>{s.suppressionChecks.length ? `${s.suppressionChecks.filter((c) => c.correct).length}/${s.suppressionChecks.length}` : '–'}</td>
                      <td>{s.suppressionNote}</td>
                      <td>{t.endReason[s.endReason]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </Screen>
  );
}
