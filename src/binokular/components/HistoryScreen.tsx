/** Verlaufsansicht: drei Diagramme und eine Tabelle (Tabelle = Textfassung der Diagramme) */
import { sessionsToCsv } from '../data/csv';
import { GAMES } from '../games';
import { minutesPerDay, type SessionRecord } from '../therapy/session';
import { t } from '../texts';
import { ColumnChart, LineChart, type Point } from './charts';
import { clock, de, download, Screen } from './common';

const short = (date: string) => {
  const [, m, d] = date.split('-');
  return `${Number(d)}.${Number(m)}.`;
};

/** spielspezifische Werte kompakt als Text (aus den Ergebniszeilen des Spiels) */
export function detailsOf(s: SessionRecord): string {
  const mod = GAMES[s.gameId];
  return mod
    .rows({ points: s.points, errors: s.errors, colorChanges: s.colorChanges, details: s.details, completed: s.completed })
    .map((r) => `${r.label}: ${r.value}`)
    .join(' · ');
}

export function HistoryScreen({ sessions, onBack }: { sessions: SessionRecord[]; onBack: () => void }) {
  const nach = sessions.filter((s) => s.gameId === 'nachzeichnen');
  const pong = sessions.filter((s) => s.gameId === 'pong');
  const label = (list: SessionRecord[], s: SessionRecord, i: number) => (list.length > 6 ? String(i + 1) : short(s.date));
  const accuracy: Point[] = nach.map((s, i) => ({ label: label(nach, s, i), value: s.details.accuracy ?? null, tip: `${s.date} ${s.startTime}: ${de(s.details.accuracy ?? 0)} %` }));
  const pongPts: Point[] = pong.map((s, i) => ({ label: label(pong, s, i), value: s.points, tip: `${s.date} ${s.startTime}: ${s.points} : ${s.details.opponent ?? 0}` }));
  const perDay: Point[] = minutesPerDay(sessions).map((d) => ({ label: short(d.date), value: d.minutes, tip: `${d.date}: ${de(d.minutes)} min` }));
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
              <figcaption>{t.chartMinutes}</figcaption>
              <ColumnChart points={perDay} floorMax={10} />
            </figure>
            <figure class="bm-card">
              <figcaption>{t.chartAccuracy}</figcaption>
              {nach.length ? <LineChart points={accuracy} max={100} /> : <p class="bm-muted">{t.chartNoData}</p>}
            </figure>
            <figure class="bm-card">
              <figcaption>{t.chartPong}</figcaption>
              {pong.length ? <ColumnChart points={pongPts} floorMax={7} /> : <p class="bm-muted">{t.chartNoData}</p>}
            </figure>
          </div>
          <section class="bm-card">
            <h2>{t.tableTitle}</h2>
            <div class="bm-table-wrap">
              <table class="bm-table" id="history-table">
                <thead>
                  <tr>
                    <th>{t.thDate}</th>
                    <th>{t.thStart}</th>
                    <th>{t.thGame}</th>
                    <th>{t.thActive}</th>
                    <th>{t.thPoints}</th>
                    <th>{t.thErrors}</th>
                    <th>{t.thChanges}</th>
                    <th>{t.thDetails}</th>
                    <th>{t.thEnd}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...sessions].reverse().map((s) => (
                    <tr key={s.id} data-game={s.gameId}>
                      <td>{s.date}</td>
                      <td>{s.startTime}</td>
                      <td>{GAMES[s.gameId].title}</td>
                      <td>{clock(s.activeMs)}</td>
                      <td>{s.points}</td>
                      <td>{s.errors}</td>
                      <td>{s.colorChanges}</td>
                      <td class="bm-detailcell">{detailsOf(s)}</td>
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
