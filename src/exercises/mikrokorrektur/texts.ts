import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Mikrokorrektur',
  tagline: 'Großes Ziel antippen, dann das kleine Nachziel genau treffen.',
  steps: [
    'Tippe das große Ziel an.',
    'Gleich danach erscheint ein kleines Ziel in der Nähe – tippe es an.',
    'Je besser du bist, desto kleiner und kürzer wird es.',
  ],
  why:
    'Bei vielen Handgriffen zielst du erst grob und korrigierst dann fein – etwa beim Fädeln, beim Einstecken eines Steckers oder beim Tippen auf eine kleine Schaltfläche. Hier übst du genau diese Folge: erst ein großer Schritt, dann eine kleine, genaue Bewegung. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Genau tippen', 'Fein zielen', 'Kleine Schaltflächen'],
  captions: {
    anchor: 'Tippe das große Ziel an',
    follow: 'Jetzt: das kleine Ziel daneben',
    again: 'Jedes Mal in eine andere Richtung',
    again2: 'Erst groß, dann klein',
  },
  metrics: {
    level: 'Stufe',
    hitRate: 'Kleines Ziel getroffen',
    afterAnchor: 'Zeit großes → kleines Ziel (Median)',
    offset: 'Abstand zur Mitte (Median)',
  },
  tips: {
    miss: 'Öfter daneben getippt. Nimm dir für das kleine Ziel einen Wimpernschlag Zeit und setze die Fingerspitze mittig.',
    slow: 'Das kleine Ziel war öfter schon weg. Schau nach dem ersten Tipp gleich zur neuen Stelle und tippe zügig.',
    great: 'Stark! Dein zweiter Tipp sitzt sicher. Bleib locker – dann klappt es auch mit kleineren Zielen.',
  },
  feedback: {
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Microcorrezione',
  tagline: 'Tocca il bersaglio grande, poi colpisci con precisione quello piccolo.',
  steps: [
    'Tocca il bersaglio grande.',
    'Subito dopo compare un bersaglio piccolo lì vicino – toccalo.',
    'Più sei bravo, più diventa piccolo e breve.',
  ],
  why:
    'In molti gesti prima si mira in modo grossolano e poi si corregge con precisione – per esempio infilando un filo, inserendo una spina o toccando un piccolo pulsante. Qui eserciti proprio questa sequenza: prima un movimento ampio, poi uno piccolo e preciso. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Toccare con precisione', 'Mirare con finezza', 'Piccoli pulsanti'],
  captions: {
    anchor: 'Tocca il bersaglio grande',
    follow: 'Ora: il piccolo accanto',
    again: 'Ogni volta in un’altra direzione',
    again2: 'Prima grande, poi piccolo',
  },
  metrics: {
    level: 'Livello',
    hitRate: 'Bersaglio piccolo colpito',
    afterAnchor: 'Tempo grande → piccolo (mediana)',
    offset: 'Distanza dal centro (mediana)',
  },
  tips: {
    miss: 'Spesso hai toccato accanto. Prenditi un battito di ciglia per il bersaglio piccolo e appoggia il dito al centro.',
    slow: 'Il bersaglio piccolo era spesso già sparito. Dopo il primo tocco guarda subito il nuovo punto e tocca con decisione.',
    great: 'Ottimo! Il secondo tocco è sicuro. Resta rilassato – così funziona anche con bersagli più piccoli.',
  },
  feedback: {
    level: 'Livello',
  },
};
