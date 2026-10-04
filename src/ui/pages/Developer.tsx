import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { ApiError, clearComments, devPassword, loadFeedback } from '../../feedback/client';
import { buildExportText, formatAvg, formatStamp, GENERAL_ID, summarize, type ExerciseInfo, type FeedbackRow } from '../../feedback/logic';
import { EXERCISES, getExercise } from '../../exercises/registry';
import { useApp } from '../app-context';
import { Icon } from '../components/Icon';
import { href } from '../router';

/** Entwickler-Bereich (nur Deutsch): Tabelle der Bewertungen, Kommentare, Export als Textdatei. Das Passwort prüft der Server. */

let catalogNumbers: Promise<Map<string, number[]>> | null = null;
function loadCatalogNumbers(): Promise<Map<string, number[]>> {
  catalogNumbers ??= fetch('./katalog/index.json')
    .then((r) => (r.ok ? (r.json() as Promise<{ items: { nr: number; blickfit: string | null }[] }>) : Promise.reject(new Error(String(r.status)))))
    .then((d) => {
      const m = new Map<string, number[]>();
      for (const it of d.items) if (it.blickfit) m.set(it.blickfit, [...(m.get(it.blickfit) ?? []), it.nr].sort((a, b) => a - b));
      return m;
    })
    .catch(() => {
      catalogNumbers = null;
      return new Map<string, number[]>();
    });
  return catalogNumbers;
}

const stars = (n: number | null) => (n === null ? '–' : '★'.repeat(n) + '☆'.repeat(5 - n));

export function Developer() {
  const { opt } = useApp();
  const [pw, setPw] = useState<string | null>(() => devPassword.get());
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<FeedbackRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [numbers, setNumbers] = useState<Map<string, number[]>>(new Map());
  const [open, setOpen] = useState<string | null>(null);
  const [onlyRated, setOnlyRated] = useState(true);
  /** Zeilen der letzten Exportdatei, die noch gelöscht werden können */
  const [exported, setExported] = useState<number[] | null>(null);

  const refresh = useCallback(async (password: string) => {
    setBusy(true);
    setError(null);
    try {
      setRows(await loadFeedback(password));
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
  const table = useMemo(() => {
    const ids = [GENERAL_ID, ...EXERCISES.map((d) => d.id)];
    for (const id of summary.keys()) if (!ids.includes(id)) ids.push(id); // Übungen, die es nicht mehr gibt
    const list = ids.map((id) => ({ id, ...info(id), s: summary.get(id) }));
    const shown = onlyRated ? list.filter((r) => r.s && (r.s.count || r.s.comments.length)) : list;
    return shown.sort((a, b) => (a.id === GENERAL_ID ? -1 : b.id === GENERAL_ID ? 1 : (a.numbers[0] ?? 1e6) - (b.numbers[0] ?? 1e6) || a.id.localeCompare(b.id)));
  }, [summary, info, onlyRated]);
  const commentRows = useMemo(() => (rows ?? []).filter((r) => r.comment), [rows]);

  const login = (e: Event) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    devPassword.set(v);
    setInput('');
    setPw(v);
  };

  const exportAll = () => {
    const withComment = commentRows;
    if (!withComment.length) return;
    const now = new Date();
    const text = buildExportText(withComment, info, now);
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
    setExported(withComment.map((r) => r.id));
  };

  const clear = async (ids: number[]) => {
    if (!pw || !ids.length) return;
    setBusy(true);
    setError(null);
    try {
      await clearComments(pw, ids);
      setExported(null);
      await refresh(pw);
    } catch {
      setError('Löschen hat nicht geklappt. Bitte noch einmal versuchen.');
      setBusy(false);
    }
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
  return (
    <main class="container dev" id="main">
      <a class="back-link" href={href('/optiker')}>
        <Icon name="back" size={20} /> {opt.navOptician}
      </a>
      <h1>{opt.fbDeveloper}</h1>
      <p class="lead">
        {rows === null ? 'Wird geladen …' : `${total} ${total === 1 ? 'Eintrag' : 'Einträge'}, davon ${commentRows.length} ${commentRows.length === 1 ? 'Kommentar' : 'Kommentare'} noch nicht exportiert/gelöscht.`}
      </p>
      <div class="dev-actions">
        <button type="button" class="btn btn-primary" disabled={!commentRows.length || busy} onClick={exportAll}>
          Kommentare exportieren (.txt)
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
      </div>

      {error ? (
        <p class="fb-error" role="alert">
          {error}
        </p>
      ) : null}

      {exported ? (
        <div class="dev-exported" role="status">
          <p>
            <strong>
              {exported.length} {exported.length === 1 ? 'Kommentar' : 'Kommentare'} exportiert.
            </strong>{' '}
            Jetzt löschen, damit sie beim nächsten Export nicht noch einmal in der Datei stehen? Die Sterne bleiben erhalten.
          </p>
          <div class="dev-actions">
            <button type="button" class="btn btn-primary" disabled={busy} onClick={() => clear(exported)}>
              <Icon name="trash" size={18} /> Ja, Kommentare löschen
            </button>
            <button type="button" class="btn btn-ghost" disabled={busy} onClick={() => setExported(null)}>
              Nein, behalten
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
                const n = r.s?.comments.length ?? 0;
                const isOpen = open === r.id;
                return [
                  <tr key={r.id} class={isOpen ? 'is-open' : undefined}>
                    <td>{r.numbers.length ? r.numbers.join(', ') : '–'}</td>
                    <th scope="row">
                      <button type="button" class="dev-row-btn" aria-expanded={isOpen} disabled={!n} onClick={() => setOpen(isOpen ? null : r.id)}>
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
                          {r.s.comments.map((c) => (
                            <li key={c.id}>
                              <span class="dev-meta">
                                {stars(c.stars)} · {formatStamp(new Date(c.createdAt))} · {c.lang.toUpperCase()}{c.trainer ? ` · ${c.trainer}` : ''}
                              </span>
                              <p>{c.comment}</p>
                              <button type="button" class="btn btn-ghost btn-sm" disabled={busy} onClick={() => clear([c.id])}>
                                <Icon name="trash" size={16} /> Kommentar löschen
                              </button>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ) : null,
                ];
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
