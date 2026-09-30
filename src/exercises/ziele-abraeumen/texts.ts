import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Ziele abräumen',
  tagline: 'Tippe alle Kreise weg, bevor ihr Ring leer ist.',
  steps: [
    'Mehrere Kreise liegen gleichzeitig auf dem Bildschirm.',
    'Tippe sie weg, bevor ihr Ring leer ist – Reihenfolge egal.',
    'Je besser du bist, desto mehr und kleiner werden sie.',
  ],
  why:
    'Im Alltag wollen oft mehrere Dinge gleichzeitig beachtet werden – zum Beispiel beim Kochen oder beim Spielen mit Kindern. Hier behältst du mehrere Kreise im Blick und entscheidest selbst, welchen du als Nächsten antippst; der schrumpfende Ring zeigt dir, welcher am dringendsten ist. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Mehreres im Blick behalten', 'Schnell zugreifen', 'Spielen'],
  captions: {
    watch: 'Mehrere Kreise – jeder hat einen Ring',
    tap: 'Tippe sie an – Reihenfolge egal',
    more: 'Neue Kreise kommen nach',
    gone: 'Ring leer? Dann ist der Kreis weg',
  },
  metrics: {
    level: 'Stufe',
    cleared: 'Abgeräumt',
    missed: 'Verpasst',
    perTarget: 'Zeit je Kreis (Median)',
    wrong: 'Daneben getippt',
  },
  tips: {
    wrong: 'Du tippst öfter neben die Kreise. Schau kurz hin, wo der nächste Kreis liegt, und tippe dann mitten hinein.',
    missed: 'Einige Kreise sind abgelaufen. Wirf immer wieder einen Blick auf die Ringe – der fast leere zuerst.',
    great: 'Stark! Du behältst die Kreise gut im Blick. Bleib locker – dann klappt es auch mit mehr und kleineren Kreisen.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Daneben',
  },
};

export const it: ExerciseTexts = {
  title: 'Sgombra i bersagli',
  tagline: 'Tocca tutti i cerchi prima che il loro anello sia vuoto.',
  steps: [
    'Più cerchi sono sullo schermo contemporaneamente.',
    'Toccali prima che l’anello sia vuoto – l’ordine è libero.',
    'Più sei bravo, più numerosi e piccoli diventano.',
  ],
  why:
    'Nella vita di tutti i giorni spesso bisogna badare a più cose insieme – per esempio mentre si cucina o si gioca con i bambini. Qui tieni d’occhio più cerchi e decidi tu quale toccare per primo; l’anello che si accorcia ti mostra qual è il più urgente. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Tenere d’occhio più cose', 'Afferrare in fretta', 'Giocare'],
  captions: {
    watch: 'Più cerchi – ognuno ha un anello',
    tap: 'Toccali – l’ordine è libero',
    more: 'Ne arrivano di nuovi',
    gone: 'Anello vuoto? Il cerchio sparisce',
  },
  metrics: {
    level: 'Livello',
    cleared: 'Sgombrati',
    missed: 'Mancati',
    perTarget: 'Tempo per cerchio (mediana)',
    wrong: 'Toccati accanto',
  },
  tips: {
    wrong: 'Tocchi spesso accanto ai cerchi. Guarda un attimo dove si trova il prossimo cerchio e tocca poi proprio al centro.',
    missed: 'Alcuni cerchi sono scaduti. Dai ogni tanto un’occhiata agli anelli – prima quello quasi vuoto.',
    great: 'Ottimo! Tieni bene d’occhio i cerchi. Resta rilassato – così funziona anche con più cerchi e più piccoli.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Accanto',
  },
};
