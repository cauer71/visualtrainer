// Rundum-Test für „Tiefe sehen – Zufallspunkte“ (labor-stereo) auf drei Bühnen, DE/IT; Einzelheiten in _anaglyph-e2e.mjs.
// Läufe: Standard (automatisch) in der Trainer-Ansicht, Modus „Trainer“, Standard in der Benutzer-Ansicht (ohne Regler),
// Farbpaar Rot–Cyan mit festem Wert und ohne Rauschen. Optional: SHOTS=<Ordner> speichert Bilder.
//
// Aufruf: npx vite build --outDir /tmp/dist-x && npx vite preview --outDir /tmp/dist-x --port 4199 &
//         node tests/e2e/stereo.mjs [baseUrl]
import { runLaborScenarios } from './_anaglyph-e2e.mjs';

await runLaborScenarios({
  id: 'labor-stereo',
  base: process.argv[2] || 'http://localhost:4173/',
  scenarios: [
    { name: 'standard-trainer', params: { trials: 8 }, view: 'trainer', resultMust: [/Tiefe \(Disparität\)|Profondità \(disparità\)/, /1 Pixel|1 pixel/] },
    { name: 'regler-modus', params: { control: 'trainer', trials: 8, startArcsec: 800 }, view: 'trainer' },
    { name: 'standard-kunde', params: { trials: 8 }, view: 'kunde', resultMustNot: [/Trainer-Regler \(während der Übung\)|Regolatore del trainer \(durante l’esercizio\)/] },
    { name: 'rotcyan-fest', params: { tones: 'redcyan', control: 'fixed', noise: 'off', trials: 8, glassesCheck: 'simple' }, view: 'trainer' },
  ],
});
