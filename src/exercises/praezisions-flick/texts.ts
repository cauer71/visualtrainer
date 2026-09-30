import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Präzisions-Flick',
  tagline: 'Tippe das schrumpfende Ziel schnell und mitten hinein.',
  steps: [
    'Ein Ziel erscheint und wird langsam kleiner.',
    'Tippe es an – möglichst schnell und genau in die Mitte.',
    'Danach siehst du, wie weit du von der Mitte lagst.',
  ],
  why:
    'Schnell sein und genau sein – beides zugleich gelingt selten: Wer lange zielt, tippt ein kleineres Ziel; wer hastig tippt, landet neben der Mitte. Hier probierst du aus, wo für dich der gute Mittelweg liegt. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Genau tippen', 'Tempo abwägen', 'Kleine Schaltflächen treffen'],
  captions: {
    watch: 'Gleich erscheint ein Ziel',
    shrink: 'Es schrumpft – tippe in die Mitte',
    middle: 'Früh tippen: Das Ziel ist noch groß',
  },
  metrics: {
    level: 'Stufe',
    hits: 'Treffer',
    centering: 'Mittigkeit (Mittel)',
    median: 'Zeit bis zum Tipp (Median)',
    wrong: 'Daneben getippt',
  },
  tips: {
    gone: 'Einige Ziele sind verschwunden. Tippe lieber etwas früher – die Mitte muss nicht ganz genau sein.',
    wrong: 'Du tippst öfter weit neben das Ziel. Schau kurz hin, wo es liegt, und tippe dann mitten hinein.',
    center: 'Du landest oft am Rand des Ziels. Nimm dir einen Wimpernschlag mehr Zeit für die Mitte.',
    great: 'Stark! Du tippst schnell und nah an der Mitte. Bleib locker – dann klappt es auch mit kleineren, schnelleren Zielen.',
  },
  feedback: {
    level: 'Stufe',
    near: 'Knapp daneben',
    gone: 'Weg',
  },
};

export const it: ExerciseTexts = {
  title: 'Flick di precisione',
  tagline: 'Tocca il bersaglio che si rimpicciolisce, in fretta e al centro.',
  steps: [
    'Appare un bersaglio che diventa piano piano più piccolo.',
    'Toccalo – il più in fretta possibile e proprio al centro.',
    'Poi vedi quanto eri lontano dal centro.',
  ],
  why:
    'Essere veloci ed essere precisi insieme riesce raramente: chi mira a lungo tocca un bersaglio più piccolo; chi tocca in fretta finisce accanto al centro. Qui provi dove si trova per te il giusto compromesso. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Toccare con precisione', 'Bilanciare la velocità', 'Colpire piccoli pulsanti'],
  captions: {
    watch: 'Tra poco appare un bersaglio',
    shrink: 'Si rimpicciolisce – tocca il centro',
    middle: 'Tocca presto: è ancora grande',
  },
  metrics: {
    level: 'Livello',
    hits: 'Colpiti',
    centering: 'Centratura (media)',
    median: 'Tempo fino al tocco (mediana)',
    wrong: 'Toccati accanto',
  },
  tips: {
    gone: 'Alcuni bersagli sono spariti. Tocca un po’ prima – il centro non deve essere esattissimo.',
    wrong: 'Tocchi spesso lontano dal bersaglio. Guarda un attimo dove si trova e tocca poi proprio al centro.',
    center: 'Finisci spesso al bordo del bersaglio. Prenditi un battito di ciglia in più per il centro.',
    great: 'Ottimo! Tocchi in fretta e vicino al centro. Resta rilassato – così funziona anche con bersagli più piccoli e veloci.',
  },
  feedback: {
    level: 'Livello',
    near: 'Appena accanto',
    gone: 'Sparito',
  },
};
