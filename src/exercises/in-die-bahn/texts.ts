import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'In die Bahn',
  tagline: 'Setz den Finger dorthin, wo das Ziel gleich vorbeiläuft.',
  steps: [
    'Ein Ziel läuft über eine Bahn – schau erst zu.',
    'Setz den Finger auf einen Punkt der Bahn, bevor es dort ist.',
    'Lass den Finger liegen, bis es vorbeigelaufen ist.',
  ],
  why:
    'Wer einen Ball fangen will, geht nicht zum Ball, sondern dorthin, wo er gleich sein wird. Hier läuft das Ziel mehrmals dieselbe Bahn: Du siehst sie einmal und setzt den Finger dann vorab auf einen Punkt davon. Danach siehst du, wie nah das Ziel an deinem Finger vorbeigelaufen ist. Wohin dein Blick dabei geht, wird nicht gemessen, und ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Bahnen vorausahnen', 'Ballspiele', 'Vorausschauen'],
  captions: {
    watch: 'Schau, wie das Ziel läuft',
    place: 'Tippe auf einen Punkt der Bahn',
    hold: 'Finger liegen lassen',
    check: 'So nah lief es vorbei',
  },
  metrics: {
    level: 'Deine Stufe',
    meanError: 'Mittlere Abweichung',
    accuracy: 'Trefferquote',
    maxLevel: 'Höchste Stufe',
    hits: 'Treffer',
  },
  tips: {
    early: 'Ein paar Mal warst du zu spät oder hast zu früh losgelassen. Tippe gleich nach dem ersten Durchlauf und lass den Finger liegen.',
    steady: 'Dein Finger ist öfter gewandert. Setz ihn auf und lass ihn einfach liegen – aufgestützt geht es leichter.',
    far: 'Merk dir Start und Ende der Bahn: Die Stelle liegt auf der Linie zwischen beiden. Schau dir den ersten Durchlauf genau an.',
    great: 'Stark! Du sagst die Bahn gut voraus. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    level: 'Stufe',
    watch: 'Schau zu',
    wait: 'Erst zuschauen',
    now: 'Tippe auf die Bahn und lass den Finger liegen',
    earlier: 'Weiter vorn tippen',
    steady: 'Finger ruhig lassen',
    late: 'Zu spät',
    early: 'Zu früh losgelassen',
    drift: 'Finger gewandert',
  },
};

export const it: ExerciseTexts = {
  title: 'Sulla traiettoria',
  tagline: 'Metti il dito dove il bersaglio sta per passare.',
  steps: [
    'Un bersaglio percorre una traiettoria – prima guarda.',
    'Metti il dito su un punto, prima che il bersaglio ci arrivi.',
    'Tieni il dito fermo finché non è passato.',
  ],
  why:
    'Chi vuole afferrare una palla non va verso la palla, ma dove sarà tra poco. Qui il bersaglio percorre più volte la stessa traiettoria: la vedi una volta e poi metti il dito in anticipo su un punto. Poi vedi quanto il bersaglio è passato vicino al tuo dito. Dove guardi con gli occhi non viene misurato, e non è dimostrato che questo si trasferisca allo sport o alla vita quotidiana.',
  goodFor: ['Prevedere le traiettorie', 'Giochi con la palla', 'Guardare avanti'],
  captions: {
    watch: 'Guarda come corre il bersaglio',
    place: 'Tocca un punto della traiettoria',
    hold: 'Tieni il dito fermo',
    check: 'Quanto è passato vicino',
  },
  metrics: {
    level: 'Il tuo livello',
    meanError: 'Scarto medio',
    accuracy: 'Percentuale di colpi',
    maxLevel: 'Livello più alto',
    hits: 'Colpi',
  },
  tips: {
    early: 'Qualche volta eri troppo tardi o hai sollevato il dito troppo presto. Tocca subito dopo il primo passaggio e tieni il dito fermo.',
    steady: 'Il dito si è spostato più volte. Appoggialo e lascialo lì – con l’avambraccio appoggiato è più facile.',
    far: 'Ricorda inizio e fine della traiettoria: il punto sta sulla linea tra i due. Guarda bene il primo passaggio.',
    great: 'Ottimo! Prevedi bene la traiettoria. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    level: 'Livello',
    watch: 'Guarda',
    wait: 'Prima guarda',
    now: 'Tocca la traiettoria e tieni il dito fermo',
    earlier: 'Tocca più avanti',
    steady: 'Tieni il dito fermo',
    late: 'Troppo tardi',
    early: 'Sollevato troppo presto',
    drift: 'Il dito si è spostato',
  },
};
