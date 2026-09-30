import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Höhenwechsel-Bahn',
  tagline: 'Folge der Kugel auf ihrer Treppenbahn und erkenne ein Zeichen.',
  steps: [
    'Folge der Kugel hin und her – Stück für Stück tiefer.',
    'Auf den geraden Strecken zeigt sie kurz ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag wandert der Blick oft Zeile für Zeile: über Seiten, Tabellen und Listen. Hier läuft eine Kugel gleichmäßig hin und her und wird dabei Strecke für Strecke etwas tiefer, bis sie unten ankommt und denselben Weg wieder hinaufläuft. Das Zeichen erscheint nur auf den geraden Stücken, nie in der Wende. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich mitgeht, wird nicht gemessen, und ob sich die Übung auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Zeile für Zeile folgen', 'Hin und Her im Blick behalten', 'Langsam wechselnde Höhe verfolgen'],
  captions: {
    follow: 'Folge der Kugel über die Stufen',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Höhen-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Bleib mit den Augen an der Kugel, auch in der Wende, wo kein C kommt – und bewege den Kopf möglichst nicht.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du erkennst das Zeichen auch bei steiler Treppe. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Percorso a gradini',
  tagline: 'Segui la sfera sul suo percorso a gradini e riconosci un segno.',
  steps: [
    'Segui la sfera avanti e indietro, sempre un po’ più in basso.',
    'Sui tratti dritti mostra per un attimo una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni lo sguardo scorre spesso riga dopo riga: su pagine, tabelle ed elenchi. Qui una sfera corre in modo regolare avanti e indietro e scende a ogni tratto un po’ di più, finché arriva in fondo e risale lungo lo stesso percorso. Il segno compare solo sui tratti dritti, mai nella svolta. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo la segue davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Seguire riga dopo riga', 'Tenere d’occhio il va e vieni', 'Seguire un’altezza che cambia piano'],
  captions: {
    follow: 'Segui la sfera sui gradini',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello di altezza',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Resta con gli occhi sulla sfera anche nella svolta, dove non c’è nessuna C – e muovi la testa il meno possibile.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Riconosci il segno anche con gradini ripidi. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
