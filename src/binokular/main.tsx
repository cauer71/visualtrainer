/**
 * Einstieg „Binokular – Sehspiele“ (/binokular/) – eigenständig, unabhängig von der Haupt-App.
 * URL-Parameter (nur Tests/Vorführung): ?game=nachzeichnen|pong (direkt ins Spiel, ohne Kalibrierung),
 * ?seed=N (fester Zufall: Pfad, Startfarbe), ?debug=1 (Debug-Ansichten und Testzugriff `window.__binokular`).
 */
import { render } from 'preact';
import { App } from './components/App';
import { GAME_IDS, type GameId } from './games';
import { t } from './texts';
import './binokular.css';

const params = new URLSearchParams(location.search);
const seed = Number(params.get('seed'));
const gameParam = params.get('game') as GameId | null;
document.title = t.pageTitle;

const root = document.getElementById('bm-root');
if (!root) throw new Error('#bm-root fehlt');
render(
  <App
    params={{
      debug: params.get('debug') === '1',
      seed: params.get('seed') !== null && Number.isFinite(seed) ? Math.floor(seed) : null,
      game: gameParam && GAME_IDS.includes(gameParam) ? gameParam : null,
    }}
  />,
  root,
);
