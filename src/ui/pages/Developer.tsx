import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { ApiError, deleteFeedback, devPassword, loadFeedback, markExported, sendReply } from '../../feedback/client';
import { loadCatalogNumbers } from '../../feedback/catalog-numbers';
import { buildExportText, formatAvg, formatStamp, GENERAL_ID, MAX_COMMENT, pendingExport, summarize, type ExerciseInfo, type FeedbackRow, type Improvement } from '../../feedback/logic';
import { EXERCISES, getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { Icon } from '../components/Icon';
import { href } from '../router';

/**
 * Entwickler-Bereich (nur Deutsch): Tabelle der Bewertungen, Kommentare, Export als Textdatei, Antworten an die Trainer.
 * Das Passwort prüft der Server. Nichts wird beim Export gelöscht: exportierte Kommentare bleiben als Archiv erhalten.
 */

const stars = (n: number | null) => (n === null ? '–' : '★'.repeat(n) + '☆'.repeat(5 - n));

/** Antwortfeld mit Haken „Übung wurde verbessert“ (für einen Kommentar oder als Sammelantwort einer Übung) */
function ReplyBox({ label, button, busy, onSend }: { label: string; button: string; busy: boolean; onSend: (text: string, improved: boolean) => Promise<boolean> }) {
  const [text, setText] = useState('');
  const [improved, setImproved] = useState(false);
  const submit = async () => {
    if (!text.trim()) return;
    if (await onSend(text, improved)) {
      setText('');
      setImproved(false);
    }
  };
  return (
    <div class="dev-reply">
      <label class="fb-label">
        {label}
        <textarea class="input" rows={3} maxLength={MAX_COMMENT} value={text} onInput={(e) => setText((e.target as HTMLTextAreaElement).value)} />
      </label>
      <label class="dev-check">
        <input type="checkbox" checked={improved} onChange={(e) => setImproved((e.target as HTMLInputElement).checked)} /> Übung wurde verbessert
      </label>
      <div>
        <button type="button" class="btn btn-primary btn-sm" disabled={busy || !text.trim()} onClick={submit}>
          {button}
        </button>
      </div>
    </div>
  );
}

export function Developer() {
  const { opt } = useApp();
  const [pw, setPw] = useState<string | null>(() => devPassword.get());
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<FeedbackRow[] | null>(null);
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [numbers, setNumbers] = useState<Map<string, number[]>>(new Map());
  const [open, setOpen] = useState<string | null>(null);
  const [onlyRated, setOnlyRated] = useState(true);
  const [showExported, setShowExported] = useState(false);
  /** Zeilen der letzten Exportdatei, die noch als exportiert markiert werden können */
  const [exported, setExported] = useState<number[] | null>(null);

  const refresh = useCallback(async (password: string) => {
    setBusy(true);
    setError(null);
    try {
      const data = await loadFeedback(password);
      setRows(data.rows);
      setImprovements(data.improvements);
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 429)) {
        devPassword.clear();
        setPw(null);
        setRows(null);
        setError(e.message);
      } else {
        setError(e instanceof ApiError && e.status === 0 ? 'Keine Verbindung zum Server.' : 'Die Daten konnten nicht geladen werden (läuft die Seite ohne den Worker, z. B. lokale Vorschau?).');
      }
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    loadCatalogNumbers().then(setNumbers);
  }, []);
  useEffect(() => {
    if (pw) void refresh(pw);
  }, [pw, refresh]);

  const info = useCallback(
    (id: string): ExerciseInfo => ({ numbers: numbers.get(id) ?? [], name: id === GENERAL_ID ? opt.fbGeneralName : (getExercise(id)?.texts.de.title ?? id) }),
    [numbers, opt],
  );
  const summary = useMemo(() => summarize(rows ?? []), [rows]);
  const visibleComments = useCallback((id: string) => (summary.get(id)?.comments ?? []).filter((c) => showExported || !c.exportedAt), [summary, showExported]);
  const table = useMemo(() => {
    const ids = [GENERAL_ID, ...EXERCISES.map((d) => d.id)];
    for (const id of summary.keys()) if (!ids.includes(id)) ids.push(id); // Übungen, die es nicht mehr gibt
    const list = ids.map((id) => ({ id, ...info(id), s: summary.get(id) }));
    const shown = onlyRated ? list.filter((r) => r.s && (r.s.count || visibleComments(r.id).length)) : list;
    return shown.sort((a, b) => (a.id === GENERAL_ID ? -1 : b.id === GENERAL_ID ? 1 : (a.numbers[0] ?? 1e6) - (b.numbers[0] ?? 1e6) || a.id.localeCompare(b.id)));
  }, [summary, info, onlyRated, visibleComments]);
  const pending = useMemo(() => pendingExport(rows ?? []), [rows]);
  const archived = useMemo(() => (rows ?? []).filter((r) => r.comment && r.exportedAt).length, [rows]);

  const login = (e: Event) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    devPassword.set(v);
    setInput('');
    setPw(v);
  };

  const exportNew = () => {
    if (!pending.length) return;
    const now = new Date();
    const text = buildExportText(pending, info, now);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const p = (n: number) => String(n).padStart(2, '0');
    a.href = url;
    a.download = `blickfit-rueckmeldungen-${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}-${p(now.getHours())}${p(now.getMinutes())}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    setExported(pending.map((r) => r.id));
  };

  /** Führt eine Aktion mit Ladeanzeige und Fehlermeldung aus; gibt zurück, ob sie geklappt hat */
  const act = async (fn: () => Promise<void>, failure: string): Promise<boolean> => {
    if (!pw) return false;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await fn();
      await refresh(pw);
      return true;
    } catch (e) {
      setError(e instanceof ApiError && e.message && e.status !== 0 ? `${failure} (${e.message})` : failure);
      setBusy(false);
      return false;
    }
  };

  const markDone = async (ids: number[]) => {
    if (!pw || !ids.length) return;
    if (await act(() => markExported(pw, ids), 'Das Markieren hat nicht geklappt. Bitte noch einmal versuchen.')) setExported(null);
  };

  const reply = (exerciseId: string, feedbackId: number | undefined) => async (text: string, improved: boolean) => {
    if (!pw) return false;
    let count = 0;
    const ok = await act(async () => {
      count = (await sendReply(pw, { exerciseId, text, improved, feedbackId })).replies;
    }, 'Die Antwort konnte nicht gesendet werden.');
    if (ok) setNotice(feedbackId ? 'Antwort gespeichert.' : count ? `Antwort an ${count} Kommentar${count === 1 ? '' : 'e'} gespeichert.` : 'Keine exportierten, unbeantworteten Kommentare gefunden. Die Verbesserung wurde trotzdem gemeldet, falls angehakt.');
    return ok;
  };

  const hardDelete = async (c: FeedbackRow) => {
    if (!pw) return;
    const label = `${stars(c.stars)}${c.comment ? ` – „${c.comment.slice(0, 80)}${c.comment.length > 80 ? '…' : ''}“` : ''}`;
    if (!window.confirm(`Eintrag #${c.id} ENDGÜLTIG löschen (Sterne, Kommentar und Antworten)? Das lässt sich nicht rückgängig machen.\n\n${label}`)) return;
    await act(() => deleteFeedback(pw, c.id), 'Löschen hat nicht geklappt. Bitte noch einmal versuchen.');
  };

  const logout = () => {
    devPassword.clear();
    setPw(null);
    setRows(null);
    setExported(null);
  };

  if (!pw) {
    return (
      <main class="container dev" id="main">
        <a class="back-link" href={href('/optiker')}>
          <Icon name="back" size={20} /> {opt.navOptician}
        </a>
        <h1>{opt.fbDeveloper}</h1>
        <form class="dev-login" onSubmit={login}>
          <label for="dev-pw">Passwort</label>
          <input id="dev-pw" class="input" type="password" inputMode="numeric" autoComplete="off" value={input} onInput={(e) => setInput((e.target as HTMLInputElement).value)} />
          <button type="submit" class="btn btn-primary">
            Anmelden
          </button>
          {error ? (
            <p class="fb-error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </main>
    );
  }

  const total = rows?.length ?? 0;
  const dateOf = (iso: string) => formatStamp(new Date(iso));
  return (
    <main class="container dev" id="main">
      <a class="back-link" href={href('/optiker')}>
        <Icon name="back" size={20} /> {opt.navOptician}
      </a>
      <h1>{opt.fbDeveloper}</h1>
      <p class="lead">
        {rows === null
          ? 'Wird geladen …'
          : `${total} ${total === 1 ? 'Eintrag' : 'Einträge'}, davon ${pending.length} ${pending.length === 1 ? 'Kommentar' : 'Kommentare'} noch nicht exportiert und ${archived} im Archiv.`}
      </p>
      <div class="dev-actions">
        <button type="button" class="btn btn-primary" disabled={!pending.length || busy} onClick={exportNew}>
          Neue Kommentare exportieren (.txt)
        </button>
        <button type="button" class="btn btn-ghost" disabled={busy} onClick={() => pw && refresh(pw)}>
          <Icon name="refresh" size={18} /> Aktualisieren
        </button>
        <button type="button" class="btn btn-ghost" onClick={logout}>
          Abmelden
        </button>
        <label class="dev-check">
          <input type="checkbox" checked={onlyRated} onChange={(e) => setOnlyRated((e.target as HTMLInputElement).checked)} /> nur Übungen mit Rückmeldung
        </label>
        <label class="dev-check">
          <input type="checkbox" checked={showExported} onChange={(e) => setShowExported((e.target as HTMLInputElement).checked)} /> Exportierte anzeigen
        </label>
      </div>

      {error ? (
        <p class="fb-error" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p class="notice notice-info" role="status">
          {notice}
        </p>
      ) : null}

      {exported ? (
        <div class="dev-exported" role="status">
          <p>
            <strong>
              {exported.length} {exported.length === 1 ? 'Kommentar' : 'Kommentare'} exportiert.
            </strong>{' '}
            Jetzt als exportiert markieren, damit sie beim nächsten Export nicht noch einmal in der Datei stehen? Nichts wird gelöscht: Kommentare und Sterne bleiben im Archiv (unter „Exportierte anzeigen“).
          </p>
          <div class="dev-actions">
            <button type="button" class="btn btn-primary" disabled={busy} onClick={() => markDone(exported)}>
              <Icon name="check" size={18} /> Als exportiert markieren
            </button>
            <button type="button" class="btn btn-ghost" disabled={busy} onClick={() => setExported(null)}>
              Nein, noch nicht
            </button>
          </div>
        </div>
      ) : null}

      {rows !== null ? (
        <div class="dev-table-wrap">
          <table class="dev-table">
            <thead>
              <tr>
                <th scope="col">Nr.</th>
                <th scope="col">Übung</th>
                <th scope="col">Ø Sterne</th>
                <th scope="col">Bewertungen</th>
                <th scope="col">Kommentare</th>
              </tr>
            </thead>
            <tbody>
              {table.length === 0 ? (
                <tr>
                  <td colSpan={5} class="muted">
                    Noch keine Rückmeldungen.
                  </td>
                </tr>
              ) : null}
              {table.map((r) => {
                const list = visibleComments(r.id);
                const n = list.length;
                const isOpen = open === r.id;
                return [
                  <tr key={r.id} class={isOpen ? 'is-open' : undefined}>
                    <td>{r.numbers.length ? r.numbers.join(', ') : '–'}</td>
                    <th scope="row">
                      <button type="button" class="dev-row-btn" aria-expanded={isOpen} disabled={!n && !isOpen} onClick={() => setOpen(isOpen ? null : r.id)}>
                        {r.name}
                      </button>
                      <span class="dev-id">{r.id}</span>
                    </th>
                    <td>
                      {r.s?.avg != null ? (
                        <>
                          <span class="dev-stars" aria-hidden="true">
                            {stars(Math.round(r.s.avg))}
                          </span>{' '}
                          {formatAvg(r.s.avg)}
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td>{r.s?.count ?? 0}</td>
                    <td>{n}</td>
                  </tr>,
                  isOpen && r.s ? (
                    <tr key={`${r.id}-c`} class="dev-comments-row">
                      <td colSpan={5}>
                        <ul class="dev-comments">
                          {list.map((c) => {
                            const replies = c.replies ?? [];
                            return (
                              <li key={c.id} data-comment={c.id}>
                                <span class="dev-meta">
                                  #{c.id} · {stars(c.stars)} · {dateOf(c.createdAt)} · {c.lang.toUpperCase()}
                                  {c.trainer ? ` · ${c.trainer}` : ''}
                                  {c.parentId ? <span class="dev-tag">Folgekommentar zu #{c.parentId}</span> : null}
                                  {c.exportedAt ? <span class="dev-tag">exportiert {dateOf(c.exportedAt)}</span> : <span class="dev-tag">neu</span>}
                                </span>
                                <p>{c.comment}</p>
                                {replies.length ? (
                                  <ul class="dev-replies">
                                    {replies.map((rp) => (
                                      <li key={rp.id}>
                                        <span class="dev-meta">
                                          Antwort · {dateOf(rp.createdAt)}
                                          {rp.improved ? ' · Übung verbessert' : ''}
                                        </span>
                                        <p>{rp.text}</p>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                <ReplyBox label="Antwort / was wurde verbessert" button="Antwort senden" busy={busy} onSend={reply(r.id, c.id)} />
                                <button type="button" class="btn btn-ghost btn-sm dev-danger" disabled={busy} onClick={() => hardDelete(c)}>
                                  <Icon name="trash" size={16} /> Endgültig löschen
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        <div class="dev-box">
                          <strong>Sammelantwort</strong>
                          <ReplyBox
                            label="Für alle exportierten, noch unbeantworteten Kommentare dieser Übung antworten"
                            button="Antwort an alle senden"
                            busy={busy}
                            onSend={reply(r.id, undefined)}
                          />
                        </div>
                      </td>
                    </tr>
                  ) : null,
                ];
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {rows !== null ? (
        <section class="dev-box" aria-labelledby="dev-improvements">
          <h2 id="dev-improvements">Verbesserte Übungen</h2>
          {improvements.length === 0 ? <p class="muted">Noch keine Verbesserung gemeldet.</p> : null}
          <ul class="dev-replies">
            {improvements.map((i, idx) => (
              <li key={`${i.exercise}-${i.createdAt}-${idx}`}>
                <span class="dev-meta">
                  {info(i.exercise).numbers.length ? `${info(i.exercise).numbers.join(', ')} · ` : ''}
                  {info(i.exercise).name} · {dateOf(i.createdAt)}
                </span>
                <p>{i.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
