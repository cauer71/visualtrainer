import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Scharf in Bewegung',
  tagline: 'Erkenne Details, während sich alles bewegt.',
  steps: [
    'Folge dem Ball nur mit den Augen.',
    'Kurz taucht darin ein „C“ auf.',
    'Tippe unten, wohin seine Öffnung zeigt.',
  ],
  why:
    'Im Auto oder auf dem Rad willst du Schilder lesen, während alles vorbeizieht. Hier übst du, einem Ball ruhig mit den Augen zu folgen und dabei ein kleines Zeichen zu erkennen. Ob sich das auf den Alltag überträgt, ist nicht belegt – und es ersetzt weder Brille noch Augenuntersuchung.',
  goodFor: ['Schilder im Vorbeifahren', 'Busnummer erkennen', 'Den Ball im Blick behalten'],
  captions: {
    follow: 'Folge dem Ball mit den Augen',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Tempo-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchstes Tempo',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Folge dem Ball mit den Augen, nicht mit dem Kopf – und bleib dran, auch wenn gerade kein C da ist.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Deine Augen bleiben auch bei Tempo am Ball. Mit etwas Übung schaffst du hier bald noch mehr.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Nitido in movimento',
  tagline: 'Riconosci i dettagli mentre tutto si muove.',
  steps: [
    'Segui la palla solo con gli occhi.',
    'Per un attimo compare una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'In auto o in bici vuoi leggere i cartelli mentre tutto ti scorre accanto. Qui ti eserciti a seguire una palla con calma, solo con gli occhi, riconoscendo un piccolo segno. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni – e non sostituisce né gli occhiali né una visita dall’ottico o dall’oculista.',
  goodFor: ['Cartelli mentre passi', 'Il numero dell’autobus', 'Tenere d’occhio la palla'],
  captions: {
    follow: 'Segui la palla con gli occhi',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello di velocità',
    accuracy: 'Precisione',
    maxLevel: 'Velocità massima',
    correct: 'Risposte giuste',
  },
  tips: {
    eyes: 'Segui la palla con gli occhi, non con la testa – e non mollarla anche quando non c’è nessuna C.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! I tuoi occhi restano sulla palla anche in velocità. Con un po’ di pratica qui farai ancora di più.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
