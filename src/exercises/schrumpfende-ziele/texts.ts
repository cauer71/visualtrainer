import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Schrumpfende Ziele',
  tagline: 'Mehrere Kreise werden kleiner – tippe den kleinsten zuerst.',
  steps: [
    'Mehrere Kreise erscheinen und schrumpfen gleichzeitig.',
    'Tippe immer den kleinsten zuerst – er ist als Erster weg.',
    'Die Mitte musst du nicht treffen, nur den Kreis.',
  ],
  why:
    'Im Alltag drängt oft mehreres zugleich, und man muss entscheiden, was zuerst dran ist. Hier zeigt dir die Größe der Kreise, welcher am dringendsten ist: Je kleiner, desto eher ist er weg. Du übst, schnell zu erkennen, welcher Kreis zuerst dran ist, und ihn dann gleich zu tippen. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Entscheiden, was zuerst dran ist', 'Mehreres im Blick behalten', 'Schnell zugreifen'],
  captions: {
    watch: 'Gleich erscheinen mehrere Kreise',
    smallest: 'Sie schrumpfen – kleinster zuerst',
    next: 'Dann den nächstkleineren',
    again: 'Neue Runde: wieder den kleinsten',
  },
  metrics: {
    level: 'Stufe',
    orderRate: 'Kleinster zuerst',
    cleared: 'Getippt',
    vanished: 'Verschwunden',
    wrong: 'Daneben getippt',
  },
  tips: {
    order: 'Du tippst oft einen größeren Kreis zuerst. Schau kurz über alle Kreise – der kleinste ist als Erster weg.',
    gone: 'Einige Kreise sind verschwunden. Entscheide schnell, welcher der kleinste ist, und tippe ohne Zögern.',
    wrong: 'Du tippst öfter neben die Kreise. Schau kurz hin, wo der nächste liegt, und tippe dann mitten hinein.',
    great: 'Stark! Du erkennst schnell, welcher Kreis zuerst dran ist. Bleib locker – dann klappt es auch mit mehr und schnelleren Kreisen.',
  },
  feedback: {
    level: 'Stufe',
    smaller: 'Kleineres zuerst',
  },
};

export const it: ExerciseTexts = {
  title: 'Bersagli decrescenti',
  tagline: 'Più cerchi diventano più piccoli – tocca prima il più piccolo.',
  steps: [
    'Appaiono più cerchi che si rimpiccioliscono insieme.',
    'Tocca sempre prima il più piccolo – sparisce per primo.',
    'Non devi colpire il centro, solo il cerchio.',
  ],
  why:
    'Nella vita di tutti i giorni spesso più cose premono insieme e bisogna decidere cosa viene prima. Qui la grandezza dei cerchi ti mostra quale è il più urgente: più è piccolo, prima sparisce. Ti eserciti a riconoscere in fretta quale cerchio tocca per primo e a toccarlo subito. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Decidere cosa viene prima', 'Tenere d’occhio più cose', 'Afferrare in fretta'],
  captions: {
    watch: 'Tra poco appaiono più cerchi',
    smallest: 'Si rimpiccioliscono – il più piccolo prima',
    next: 'Poi il successivo più piccolo',
    again: 'Nuovo turno: di nuovo il più piccolo',
  },
  metrics: {
    level: 'Livello',
    orderRate: 'Il più piccolo prima',
    cleared: 'Toccati',
    vanished: 'Spariti',
    wrong: 'Toccati accanto',
  },
  tips: {
    order: 'Tocchi spesso prima un cerchio più grande. Dai un’occhiata a tutti i cerchi – il più piccolo sparisce per primo.',
    gone: 'Alcuni cerchi sono spariti. Decidi in fretta qual è il più piccolo e toccalo senza esitare.',
    wrong: 'Tocchi spesso accanto ai cerchi. Guarda un attimo dove si trova il prossimo e tocca poi proprio al centro.',
    great: 'Ottimo! Riconosci in fretta quale cerchio tocca per primo. Resta rilassato – così funziona anche con più cerchi e più veloci.',
  },
  feedback: {
    level: 'Livello',
    smaller: 'Prima il più piccolo',
  },
};
