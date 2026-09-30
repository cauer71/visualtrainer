import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Tasten-Wahl',
  tagline: 'Ein Zeichen erscheint – tippe die gleiche Taste.',
  steps: [
    'Oben erscheint ein Zeichen, zum Beispiel ein Dreieck mit A.',
    'Tippe unten die Taste mit dem gleichen Zeichen.',
    'Später kommen mehr Tasten dazu und sie wechseln den Platz.',
  ],
  why:
    'Im Alltag musst du oft aus mehreren Möglichkeiten die passende wählen – etwa die richtige Taste am Automaten oder am Fahrkartenschalter. Hier ordnest du einem Zeichen schnell seine Taste zu. Je mehr Tasten es gibt, desto länger dauert das; das ist normal. Die Zeit wird am Tablet etwas zu lang gemessen (je nach Gerät 30 bis 130 Millisekunden), deshalb zählt nur der Vergleich mit dir selbst auf demselben Gerät. Ob sich das auf Alltag oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Auswählen unter mehreren Möglichkeiten', 'Zuordnen', 'Schnell entscheiden'],
  captions: {
    watch: 'Oben erscheint ein Zeichen',
    tap: 'Tippe unten die gleiche Taste',
    more: 'Später kommen mehr Tasten dazu',
    mix: 'Und sie wechseln den Platz',
  },
  metrics: {
    level: 'Stufe',
    median: 'Zeit (Median)',
    spread: 'Streuung der Zeiten',
    wrong: 'Falsche Taste',
    slow: 'Zu langsam',
  },
  tips: {
    early: 'Du tippst öfter, bevor das Zeichen da ist. Warte kurz – tippe erst, wenn du es siehst.',
    wrong: 'Einige Male war es die falsche Taste. Schau kurz auf Form und Buchstaben, bevor du tippst.',
    slow: 'Manchmal war die Zeit um. Halte den Finger bereit über den Tasten, dann klappt es schneller.',
    great: 'Stark! Du ordnest die Zeichen sicher zu. Bleib locker – dann klappt es auch mit mehr Tasten.',
  },
  feedback: {
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Scelta del tasto',
  tagline: 'Compare un segno – tocca lo stesso tasto.',
  steps: [
    'In alto compare un segno, per esempio un triangolo con A.',
    'In basso tocca il tasto con lo stesso segno.',
    'Più avanti arrivano più tasti e cambiano posto.',
  ],
  why:
    'Nella vita di tutti i giorni bisogna spesso scegliere quella giusta tra più possibilità – per esempio il tasto giusto al distributore o alla biglietteria. Qui abbini in fretta a un segno il suo tasto. Più tasti ci sono, più ci vuole: è normale. Sul tablet il tempo viene misurato un po’ troppo lungo (a seconda del dispositivo da 30 a 130 millisecondi), perciò conta solo il confronto con te stesso sullo stesso dispositivo. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni o allo sport.',
  goodFor: ['Scegliere tra più possibilità', 'Abbinare', 'Decidere in fretta'],
  captions: {
    watch: 'In alto compare un segno',
    tap: 'In basso tocca lo stesso tasto',
    more: 'Più avanti arrivano più tasti',
    mix: 'E cambiano posto',
  },
  metrics: {
    level: 'Livello',
    median: 'Tempo (mediana)',
    spread: 'Variazione dei tempi',
    wrong: 'Tasto sbagliato',
    slow: 'Troppo lento',
  },
  tips: {
    early: 'Tocchi spesso prima che il segno compaia. Aspetta un attimo – tocca solo quando lo vedi.',
    wrong: 'Alcune volte era il tasto sbagliato. Guarda un attimo forma e lettera prima di toccare.',
    slow: 'A volte il tempo era scaduto. Tieni il dito pronto sopra i tasti, così va più veloce.',
    great: 'Ottimo! Abbini i segni con sicurezza. Resta rilassato – così funziona anche con più tasti.',
  },
  feedback: {
    level: 'Livello',
  },
};
