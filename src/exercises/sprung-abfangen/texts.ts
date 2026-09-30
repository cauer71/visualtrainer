import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen. Es ist eine Touch-Übung am Bildschirm, keine Körperübung.

export const de: ExerciseTexts = {
  title: 'Sprungweite',
  tagline: 'Zieh den Balken genau so weit, dass die Kugel auf der Zielmarke landet.',
  steps: [
    'Zieh mit dem Finger unten am Balken: je weiter, desto weiter springt die Kugel.',
    'Lass los – die Kugel springt im Bogen.',
    'Sie soll auf dem Fähnchen landen. Danach siehst du, wie nah du warst.',
  ],
  why:
    'Bei dieser Übung spielst du am Bildschirm mit dem Finger; dein Körper springt nicht. Du lernst, eine Strecke zu dosieren: wie weit du ziehen musst, damit die Kugel dort landet, wo du sie haben willst. Nach jedem Sprung siehst du, ob sie zu kurz oder zu weit kam. Die Übung ersetzt weder Brille noch Augenuntersuchung. Dass sie Sprungkraft, Sport oder den Alltag verbessert, ist nicht belegt.',
  goodFor: ['Strecken dosieren', 'Ruhig zielen', 'Bogenflug einschätzen'],
  captions: {
    watch: 'Die Kugel soll aufs Fähnchen',
    pull: 'Zieh unten am Balken',
    guide: 'Die Marke zeigt dir den Weg',
    release: 'Loslassen – die Kugel springt',
    check: 'So nah kam sie ans Ziel',
  },
  metrics: {
    level: 'Stufe',
    meanError: 'Mittlere Abweichung',
    accuracy: 'Trefferquote',
    maxLevel: 'Höchste Stufe',
    hits: 'Treffer',
  },
  tips: {
    short: 'Die Kugel landet meist zu kurz. Zieh beim nächsten Mal etwas weiter.',
    far: 'Die Kugel landet meist zu weit. Zieh beim nächsten Mal etwas weniger weit.',
    steady: 'Zieh langsam und gleichmäßig, bevor du loslässt. Hektik macht die Weite ungenau.',
    great: 'Sehr gut dosiert! Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    short: 'zu kurz',
    far: 'zu weit',
    level: 'Stufe',
    pull: 'Hier ziehen',
    hint: 'Zieh unten am Balken',
  },
};

export const it: ExerciseTexts = {
  title: 'Lunghezza del salto',
  tagline: 'Tira la barra quanto basta perché la pallina atterri sul segnale.',
  steps: [
    'Trascina il dito sulla barra in basso: più tiri, più lontano salta la pallina.',
    'Rilascia – la pallina salta ad arco.',
    'Deve atterrare sulla bandierina. Poi vedi quanto ci sei andato vicino.',
  ],
  why:
    'In questo esercizio giochi sullo schermo con il dito; il tuo corpo non salta. Impari a dosare una distanza: quanto devi tirare perché la pallina atterri dove vuoi. Dopo ogni salto vedi se è arrivata troppo corta o troppo lontana. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Che migliori la forza nel salto, lo sport o la vita di tutti i giorni non è dimostrato.',
  goodFor: ['Dosare le distanze', 'Mirare con calma', 'Valutare il volo ad arco'],
  captions: {
    watch: 'La pallina deve finire sulla bandierina',
    pull: 'Trascina la barra in basso',
    guide: 'Il segno ti mostra la via',
    release: 'Rilascia – la pallina salta',
    check: 'Ecco quanto è andata vicino',
  },
  metrics: {
    level: 'Livello',
    meanError: 'Scostamento medio',
    accuracy: 'Percentuale di centri',
    maxLevel: 'Livello massimo',
    hits: 'Centri',
  },
  tips: {
    short: 'La pallina atterra di solito troppo corta. La prossima volta tira un po’ più lontano.',
    far: 'La pallina atterra di solito troppo lontano. La prossima volta tira un po’ meno.',
    steady: 'Tira lentamente e con regolarità prima di rilasciare. La fretta rende la distanza imprecisa.',
    great: 'Dosato molto bene! La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    short: 'troppo corto',
    far: 'troppo lontano',
    level: 'Livello',
    pull: 'Tira qui',
    hint: 'Trascina la barra in basso',
  },
};
