import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zickzack-Bahn',
  tagline: 'Folge der Kugel über die steilen Zacken und erkenne dabei ein Zeichen.',
  steps: [
    'Folge der Kugel auf ihrem Zickzack-Weg.',
    'Auf den Strecken zeigt sie kurz ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag wechselt vieles plötzlich die Richtung: ein Ball, der abprallt, ein Fußgänger, der ausweicht, ein Vogel im Zickzackflug. Hier läuft eine Kugel gleichmäßig auf steilen Strecken auf und ab und knickt in jeder Spitze um. Das Zeichen erscheint nur auf den geraden Stücken, nie im Knick. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich mitgeht, wird nicht gemessen, und ob sich die Übung auf den Alltag oder den Sport überträgt, ist nicht belegt.',
  goodFor: ['Richtungswechsel verfolgen', 'Auf und Ab im Blick behalten', 'Einen Ball im Blick behalten'],
  captions: {
    follow: 'Folge der Kugel durch den Zickzack',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Zacken-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Bleib mit den Augen an der Kugel, auch im Knick, wo kein C kommt – und bewege den Kopf möglichst nicht.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du erkennst das Zeichen auch bei spitzen Knicken. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Percorso a zigzag',
  tagline: 'Segui la sfera sui ripidi zigzag e riconosci un segno.',
  steps: [
    'Segui la sfera sul suo percorso a zigzag.',
    'Sui tratti dritti mostra per un attimo una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni molte cose cambiano direzione all’improvviso: una palla che rimbalza, un pedone che scarta, un uccello che vola a zigzag. Qui una sfera corre a velocità regolare su ripidi tratti in su e in giù e cambia direzione a ogni punta. Il segno compare solo sui tratti dritti, mai nella curva. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo la segue davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni o allo sport.',
  goodFor: ['Seguire i cambi di direzione', 'Tenere d’occhio il su e giù', 'Tenere d’occhio una palla'],
  captions: {
    follow: 'Segui la sfera nello zigzag',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello dello zigzag',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Resta con gli occhi sulla sfera anche nella curva, dove non c’è nessuna C – e muovi la testa il meno possibile.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Riconosci il segno anche con curve strette. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
