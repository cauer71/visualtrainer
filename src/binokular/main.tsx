/**
 * Einstieg „Binocular Mine“ (/binokular/) – eigenständiger Prototyp, unabhängig von der Haupt-App.
 * URL-Parameter: ?autoplay=1 (Level löst sich über die Spiellogik selbst, für Tests; ohne Ton, außer ?sound=1),
 * ?level=N (direkt mit Level N beginnen, auch wenn es noch gesperrt ist – für Tests/Vorführung),
 * ?debug=1 (Debug-Ansichten), ?checkIn=N (nur Tests: erste Kontrollaufgabe nach N Sekunden).
 */
import { render } from 'preact';
import { App } from './components/App';
import { LEVELS } from './levels';
import { t } from './texts';
import './binokular.css';

const params = new URLSearchParams(location.search);
const checkIn = Number(params.get('checkIn'));
const level = Number(params.get('level'));
document.title = t.pageTitle;

const root = document.getElementById('bm-root');
if (!root) throw new Error('#bm-root fehlt');
render(
  <App
    params={{
      autoplay: params.get('autoplay') === '1',
      debug: params.get('debug') === '1',
      firstCheckS: Number.isFinite(checkIn) && checkIn > 0 ? checkIn : null,
      level: Number.isInteger(level) && level >= 1 && level <= LEVELS.length ? level : null,
      sound: params.get('sound') === '1',
    }}
  />,
  root,
);
