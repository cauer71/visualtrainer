import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/uebungskatalog/uebungen/603-grid-memorization.md, Abschnitt 8): nur beschreiben, was man in der
// Übung tut – kein Test, keine Norm, kein Vergleich mit anderen, keine Alltagsversprechen.

export const de: ExerciseTexts = {
  title: 'Rastermuster',
  tagline: 'Merk dir, welche Felder leuchten, und tipp sie danach an.',
  steps: ['Schau zu, welche Felder kurz aufleuchten.', 'Tippe danach genau diese Felder an.', 'Klappt es, wird es größer. Zwei Fehltipps beenden es.'],
  why:
    'Beim Rastermuster übst du, dir kurz zu merken, wo etwas war. Viele fassen Felder zu Formen zusammen, zum Beispiel zu einem „L“ oder einer Treppe – probier es aus. In dieser Aufgabe wirst du mit Übung besser. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Orte merken', 'Muster einprägen', 'Ruhig konzentrieren'],
  captions: {
    watch: 'Merk dir die leuchtenden Felder',
    repeat: 'Tippe genau diese Felder an',
    bigger: 'Klappt es, wird das Muster größer',
  },
  metrics: {
    level: 'Höchste gemeisterte Stufe',
    mastered: 'Gemeisterte Muster',
    biggest: 'Größtes Muster (Felder)',
    recall: 'Richtig erinnerte Felder',
  },
  tips: {
    great: 'Alle Muster gemeistert! Beim nächsten Mal wird das Raster größer oder das Muster umfangreicher.',
    groups: 'Fass die Felder zu kleinen Formen zusammen, zum Beispiel zu einer Ecke, einer Linie oder einem „L“.',
    calm: 'Tipp erst, wenn du dir sicher bist. Zwei Fehltipps beenden das Muster.',
  },
  feedback: {
    round: 'Muster',
    watch: 'Merk dir die Felder …',
    tap: 'Tippe die Felder an',
    left: 'Noch',
    right: '✓ Geschafft!',
    wrong: '✗ Nicht ganz',
  },
};

export const it: ExerciseTexts = {
  title: 'Schema a griglia',
  tagline: 'Ricorda quali campi si illuminano e toccali dopo.',
  steps: ['Guarda quali campi si illuminano per un attimo.', 'Poi tocca esattamente quei campi.', 'Se ci riesci, lo schema cresce. Due errori lo interrompono.'],
  why:
    'Nello schema a griglia alleni a ricordare per breve tempo dove si trovava qualcosa. Molti uniscono i campi in forme, per esempio una «L» o una scala – prova anche tu. In questo compito con la pratica migliori. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare posizioni', 'Memorizzare schemi', 'Concentrarsi con calma'],
  captions: {
    watch: 'Ricorda i campi luminosi',
    repeat: 'Tocca esattamente questi campi',
    bigger: 'Se ci riesci, lo schema cresce',
  },
  metrics: {
    level: 'Livello più alto superato',
    mastered: 'Schemi superati',
    biggest: 'Schema più grande (campi)',
    recall: 'Campi ricordati correttamente',
  },
  tips: {
    great: 'Tutti gli schemi superati! La prossima volta la griglia sarà più grande o lo schema più ricco.',
    groups: 'Unisci i campi in piccole forme, per esempio un angolo, una linea o una «L».',
    calm: 'Tocca solo quando sei sicuro. Due errori interrompono lo schema.',
  },
  feedback: {
    round: 'Schema',
    watch: 'Ricorda i campi …',
    tap: 'Tocca i campi',
    left: 'Ancora',
    right: '✓ Fatto!',
    wrong: '✗ Non proprio',
  },
};
