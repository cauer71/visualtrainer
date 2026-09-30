import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Landepunkt',
  tagline: 'Sieh voraus, wo der Ball landet – und tippe genau dorthin.',
  steps: [
    'Ein Ball fliegt im Bogen und verschwindet hinter der Wand.',
    'Überlege, wo er landen wird.',
    'Tippe auf diese Stelle am Boden.',
  ],
  why:
    'Im Alltag schätzt du ständig, wohin sich etwas bewegt: ein Ball im Flug, ein Bus, der um die Ecke verschwindet. Hier siehst du nur einen Teil der Flugbahn und tippst dorthin, wo der Ball landen wird. Danach siehst du, wie nah du dran warst. Die Übung ersetzt weder Brille noch Augenuntersuchung. Wohin dein Blick dabei wirklich geht, wird nicht gemessen, und ob sich die Übung auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Bewegungen vorausahnen', 'Entfernungen einschätzen', 'Bälle im Flug einschätzen'],
  captions: {
    watch: 'Schau, wie der Ball fliegt',
    tap: 'Tippe dorthin, wo er landet',
    check: 'So nah warst du dran',
  },
  metrics: {
    level: 'Stufe',
    meanError: 'Mittlere Abweichung',
    accuracy: 'Trefferquote',
    maxLevel: 'Höchste Stufe',
    hits: 'Treffer',
  },
  tips: {
    far: 'Achte auf Richtung und Tempo des Balls, solange du ihn siehst – der Rest der Bahn folgt dem Bogen.',
    late: 'Tippe lieber früh: Sobald der Ball hinter der Wand ist, darfst du schon tippen.',
    great: 'Sehr gut! Du schätzt die Landestelle auch bei viel Verdeckung genau. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Punto di arrivo',
  tagline: 'Prevedi dove atterra la palla – e tocca proprio lì.',
  steps: [
    'Una palla vola ad arco e sparisce dietro il muro.',
    'Pensa a dove atterrerà.',
    'Tocca quel punto sul terreno.',
  ],
  why:
    'Nella vita di tutti i giorni stimi di continuo dove va qualcosa: una palla in volo, un autobus che sparisce dietro l’angolo. Qui vedi solo una parte della traiettoria e tocchi dove atterrerà la palla. Poi vedi quanto ci sei andato vicino. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato dove guardi davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Prevedere i movimenti', 'Stimare le distanze', 'Valutare palle in volo'],
  captions: {
    watch: 'Guarda come vola la palla',
    tap: 'Tocca dove atterrerà',
    check: 'Ecco quanto eri vicino',
  },
  metrics: {
    level: 'Livello',
    meanError: 'Scostamento medio',
    accuracy: 'Percentuale di centri',
    maxLevel: 'Livello massimo',
    hits: 'Centri',
  },
  tips: {
    far: 'Osserva direzione e velocità della palla finché la vedi – il resto del percorso segue l’arco.',
    late: 'Tocca prima: appena la palla è dietro il muro puoi già toccare.',
    great: 'Molto bene! Stimi il punto di arrivo con precisione anche con molta copertura. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
