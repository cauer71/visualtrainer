import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Dreiecksbahn',
  tagline: 'Folge der Kugel um die Ecken und erkenne dabei ein Zeichen.',
  steps: [
    'Folge der Kugel auf ihrem Weg ums Dreieck.',
    'Auf den Kanten zeigt sie kurz ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag ändert sich die Richtung oft schlagartig: ein Auto, das abbiegt, ein Ball, der von der Wand kommt, ein Läufer an der Ecke. Hier läuft eine Kugel gleichmäßig auf einem Dreieck, und an jeder Ecke wechselt sie abrupt die Richtung; auf niedrigen Stufen sind die Ecken noch abgerundet. Das Zeichen erscheint nur auf den Kanten, nie in der Ecke. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich mitgeht, wird nicht gemessen, und ob sich die Übung auf den Alltag oder den Sport überträgt, ist nicht belegt.',
  goodFor: ['Ecken und Kurven verfolgen', 'Richtungswechsel erwarten', 'Einen Ball im Blick behalten'],
  captions: {
    follow: 'Folge der Kugel ums Dreieck',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Ecken-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Bleib mit den Augen an der Kugel, auch in der Ecke, wo kein C kommt – und bewege den Kopf möglichst nicht.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du erkennst das Zeichen auch hinter spitzen Ecken. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Percorso triangolare',
  tagline: 'Segui la sfera attorno agli angoli e riconosci un segno.',
  steps: [
    'Segui la sfera sul suo percorso a triangolo.',
    'Sui lati mostra per un attimo una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni la direzione spesso cambia di colpo: un’auto che svolta, una palla che torna dalla parete, un corridore all’angolo. Qui una sfera corre a velocità regolare su un triangolo e a ogni angolo cambia direzione all’improvviso; ai livelli bassi gli angoli sono ancora arrotondati. Il segno compare solo sui lati, mai nell’angolo. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo la segue davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni o allo sport.',
  goodFor: ['Seguire angoli e curve', 'Prevedere i cambi di direzione', 'Tenere d’occhio una palla'],
  captions: {
    follow: 'Segui la sfera sul triangolo',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello degli angoli',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Resta con gli occhi sulla sfera anche nell’angolo, dove non c’è nessuna C – e muovi la testa il meno possibile.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Riconosci il segno anche dopo angoli acuti. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
