import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Schwarm-Wechsel',
  tagline: 'Mehrere Kugeln wandern – tippe immer die dringendste zuerst.',
  steps: [
    'Mehrere Kugeln wandern über den Bildschirm.',
    'Der Ring um jede Kugel zeigt ihre Restzeit.',
    'Tippe zuerst die Kugel mit dem kürzesten Ring.',
  ],
  why:
    'Im Alltag musst du oft mehrere Dinge gleichzeitig im Blick behalten und entscheiden, was zuerst dran ist – zum Beispiel im Ballspiel. Hier übst du das mit wandernden Kugeln: Du schaust auf alle Ringe, tippst die dringendste an und wechselst gleich zur nächsten – gemessen werden nur deine Tipps, nicht dein Blick. Ob sich das Üben am Bildschirm auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Überblick behalten', 'Schnell entscheiden', 'Ballspiele'],
  captions: {
    rings: 'Der Ring zeigt die Restzeit',
    urgent: 'Erst die Kugel mit dem kürzesten Ring',
    next: 'Dann die nächste – und immer so weiter',
  },
  metrics: {
    level: 'Stufe',
    hits: 'Getroffen',
    medianTime: 'Zeit zwischen Treffern (Median)',
    order: 'Dringendste zuerst',
    expired: 'Abgelaufen',
  },
  tips: {
    miss: 'Du tippst öfter daneben. Schau kurz hin, wo die Kugel gerade ist – sie wandert immer weiter.',
    expired: 'Einige Kugeln sind abgelaufen. Wirf vor jedem Tipp einen Blick auf alle Ringe und nimm den kürzesten zuerst.',
    order: 'Oft war eine andere Kugel dringender. Vergleiche die Ringe kurz – der kürzeste kommt zuerst dran.',
    great: 'Stark! Du behältst den Überblick. Bleib locker – dann klappt es auch mit mehr und schnelleren Kugeln.',
  },
  feedback: {
    level: 'Stufe',
    expired: 'Abgelaufen',
  },
};

export const it: ExerciseTexts = {
  title: 'Sciame in movimento',
  tagline: 'Più sfere vagano – tocca sempre prima la più urgente.',
  steps: [
    'Più sfere vagano sullo schermo.',
    'L’anello intorno a ogni sfera mostra il tempo rimasto.',
    'Tocca prima la sfera con l’anello più corto.',
  ],
  why:
    'Nella vita di tutti i giorni devi spesso tenere d’occhio più cose insieme e decidere quale viene prima – per esempio in un gioco con la palla. Qui lo eserciti con sfere che vagano: guardi tutti gli anelli, tocchi la più urgente e passi subito alla successiva – si misurano solo i tuoi tocchi, non il tuo sguardo. Che esercitarsi sullo schermo si trasferisca allo sport o alla vita quotidiana non è dimostrato.',
  goodFor: ['Mantenere il quadro', 'Decidere in fretta', 'Giochi con la palla'],
  captions: {
    rings: 'L’anello mostra il tempo rimasto',
    urgent: 'Prima la sfera con l’anello più corto',
    next: 'Poi la successiva – e così via',
  },
  metrics: {
    level: 'Livello',
    hits: 'Colpite',
    medianTime: 'Tempo tra i colpi (mediana)',
    order: 'Più urgente per prima',
    expired: 'Scadute',
  },
  tips: {
    miss: 'Tocchi spesso a vuoto. Guarda un attimo dov’è la sfera – continua a muoversi.',
    expired: 'Alcune sfere sono scadute. Prima di ogni tocco dai un’occhiata a tutti gli anelli e prendi il più corto per primo.',
    order: 'Spesso un’altra sfera era più urgente. Confronta un attimo gli anelli – il più corto va toccato per primo.',
    great: 'Ottimo! Mantieni il quadro. Resta rilassato – così ce la fai anche con più sfere e più veloci.',
  },
  feedback: {
    level: 'Livello',
    expired: 'Scaduta',
  },
};
