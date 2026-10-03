// Rundum-Test für „Fusion – Bilder verschmelzen“ (labor-fusion) auf drei Bühnen, DE/IT; Einzelheiten in _anaglyph-e2e.mjs.
// Läufe: Standard (automatisch) in der Trainer-Ansicht, Modus „Trainer“ (der Regler führt den Versatz; im Autoplay spielt die
// Übung selbst die Trainerin/den Trainer), Standard in der Benutzer-Ansicht (ohne Regler), Farbpaar Rot–Blau mit Divergenz.
// Optional: SHOTS=<Ordner> speichert Bilder.
//
// Aufruf: npx vite build --outDir /tmp/dist-x && npx vite preview --outDir /tmp/dist-x --port 4199 &
//         node tests/e2e/fusion.mjs [baseUrl]
import { runLaborScenarios } from './_anaglyph-e2e.mjs';

await runLaborScenarios({
  id: 'labor-fusion',
  base: process.argv[2] || 'http://localhost:4173/',
  scenarios: [
    { name: 'standard-trainer', params: { repeats: 1 }, view: 'trainer', resultMust: [/Nach Richtung|Per direzione/] },
    { name: 'regler-modus', params: { control: 'trainer', direction: 'convergence', repeats: 1, startPd: 1 }, view: 'trainer' },
    { name: 'standard-kunde', params: { repeats: 1 }, view: 'kunde', resultMustNot: [/Trainer-Regler \(während der Übung\)|Regolatore del trainer \(durante l’esercizio\)/] },
    { name: 'rotblau-divergenz', params: { tones: 'redblue', direction: 'divergence', repeats: 1, glassesCheck: 'simple' }, view: 'trainer' },
  ],
});
