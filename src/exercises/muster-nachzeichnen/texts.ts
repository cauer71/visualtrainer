import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen. Es ist eine Gedächtnis- und Zeichenübung am Bildschirm, keine Körperübung.

export const de: ExerciseTexts = {
  title: 'Muster nachzeichnen',
  tagline: 'Merk dir einen Linienzug und zeichne ihn mit dem Finger nach.',
  steps: [
    'Ein Linienzug über mehrere Punkte erscheint kurz. Merk dir den Weg.',
    'Dann verschwindet er. Tippe die Punkte in derselben Reihenfolge an oder zieh von Punkt zu Punkt.',
    'Danach siehst du das richtige Muster und welche Punkte gestimmt haben.',
  ],
  why:
    'Bei dieser Übung merkst du dir eine Form und eine Reihenfolge von Orten und gibst sie mit dem Finger am Bildschirm wieder; dein Körper bewegt sich dabei nicht. Es hilft, den Weg als Figur zu sehen, etwa „erst nach oben, dann schräg nach unten“. Gezählt wird, wie viele Punkte in der richtigen Reihenfolge getroffen wurden; wie schnell du zeichnest, spielt keine Rolle. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob sie im Alltag hilft, ist nicht belegt.',
  goodFor: ['Wege merken', 'Formen behalten', 'Reihenfolgen wiedergeben'],
  captions: {
    watch: 'Merk dir den Weg',
    draw: 'Tippe oder zieh ihn nach',
    check: 'So viele Punkte stimmten',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Punkte richtig',
    longest: 'Längstes Muster richtig',
    perfect: 'Fehlerfreie Muster',
  },
  tips: {
    chunk: 'Sieh den Weg als Figur, zum Beispiel „Zickzack nach rechts“, statt einzelne Punkte zu zählen.',
    order: 'Sag dir die Richtung der Pfeile im Kopf vor, bevor du zeichnest: „hoch, rechts, runter“.',
    great: 'Stark gemerkt! Beim nächsten Mal werden die Muster etwas länger.',
  },
  feedback: {
    level: 'Stufe',
    points: 'Punkte',
    start: 'Start',
  },
};

export const it: ExerciseTexts = {
  title: 'Ridisegna lo schema',
  tagline: 'Ricorda un tracciato e ridisegnalo con il dito.',
  steps: [
    'Un tracciato su più punti appare per poco. Ricorda il percorso.',
    'Poi sparisce. Tocca i punti nello stesso ordine o trascina da punto a punto.',
    'Poi vedi lo schema giusto e quali punti erano corretti.',
  ],
  why:
    'In questo esercizio ricordi una forma e un ordine di luoghi e li riproduci con il dito sullo schermo; il tuo corpo non si muove. Aiuta vedere il percorso come una figura, per esempio «prima in alto, poi in diagonale in basso». Si conta quanti punti sono stati toccati nell’ordine giusto; la velocità con cui disegni non conta. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Che aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare i percorsi', 'Trattenere le forme', 'Riprodurre sequenze'],
  captions: {
    watch: 'Ricorda il percorso',
    draw: 'Tocca o trascina per ridisegnare',
    check: 'Ecco quanti punti erano giusti',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Punti corretti',
    longest: 'Schema più lungo corretto',
    perfect: 'Schemi senza errori',
  },
  tips: {
    chunk: 'Vedi il percorso come una figura, per esempio «zigzag verso destra», invece di contare i singoli punti.',
    order: 'Ripeti a mente la direzione delle frecce prima di disegnare: «su, destra, giù».',
    great: 'Ben memorizzato! La prossima volta gli schemi saranno un po’ più lunghi.',
  },
  feedback: {
    level: 'Livello',
    points: 'punti',
    start: 'Inizio',
  },
};
