/**
 * Einstieg „Binocular Mine“ (/binokular/) – eigenständiger Prototyp, unabhängig von der Haupt-App.
 * URL-Parameter: ?autoplay=1 (Level löst sich über die Spiellogik selbst, für Tests), ?debug=1 (Debug-Ansichten),
 * ?checkIn=N (nur Tests: erste Kontrollaufgabe nach N Sekunden).
 */
import { render } from 'preact';
import { App } from './components/App';
import { t } from './texts';
import './binokular.css';

const params = new URLSearchParams(location.search);
const checkIn = Number(params.get('checkIn'));
document.title = t.pageTitle;

const root = document.getElementById('bm-root');
if (!root) throw new Error('#bm-root fehlt');
render(
  <App
    params={{
      autoplay: params.get('autoplay') === '1',
      debug: params.get('debug') === '1',
      firstCheckS: Number.isFinite(checkIn) && checkIn > 0 ? checkIn : null,
    }}
  />,
  root,
);
