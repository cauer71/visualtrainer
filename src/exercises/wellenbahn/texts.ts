import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Wellenbahn',
  tagline: 'Folge der Kugel über die Welle und erkenne dabei ein Zeichen.',
  steps: [
    'Folge der Kugel auf der Welle mit den Augen.',
    'Kurz zeigt sie ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag bewegt sich vieles im Auf und Ab: ein Ball im Flug, ein Fahrzeug auf hügeliger Strecke, Wellen am See. Hier läuft eine Kugel auf einer Welle hin und her, und ein kleines Zeichen erkennst du am besten, wenn dein Blick ihr folgt. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich mitgeht, wird nicht gemessen, und ob sich die Übung auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Auf und Ab verfolgen', 'Ruhig mitschauen', 'Einen Ball im Blick behalten'],
  captions: {
    follow: 'Folge der Kugel auf der Welle',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Wellen-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Folge der Kugel mit den Augen, nicht mit dem Kopf – und bleib dran, auch wenn gerade kein C da ist.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du erkennst das Zeichen auch auf steilen Wellen. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Percorso a onda',
  tagline: 'Segui la sfera sull’onda e riconosci un segno.',
  steps: [
    'Segui la sfera sull’onda con gli occhi.',
    'Per un attimo mostra una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni molte cose si muovono su e giù: una palla in volo, un veicolo su una strada collinosa, le onde del lago. Qui una sfera corre avanti e indietro su un’onda e un piccolo segno lo riconosci meglio se il tuo sguardo la segue. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo la segue davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Seguire il su e giù', 'Guardare con calma', 'Tenere d’occhio una palla'],
  captions: {
    follow: 'Segui la sfera sull’onda',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello dell’onda',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Segui la sfera con gli occhi, non con la testa – e non mollarla anche quando non c’è nessuna C.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Riconosci il segno anche su onde ripide. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
