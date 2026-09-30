import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“, keine Normwerte.

export const de: ExerciseTexts = {
  title: 'Hoch und runter',
  tagline: 'Folge einem Ziel, das in weichen Bögen hoch und wieder herunter springt.',
  steps: [
    'Leg den Finger irgendwo auf – das Ziel hüpft in Bögen.',
    'Zieh die Marke auf und ab mit und bleib im Band.',
    'Pfeil = Extra-Schub nach oben. Bei Beschwerden: pausieren.',
  ],
  why:
    'Das Ziel springt wie ein Ball: unten schnell, oben langsam, dann wieder hinab. Du begleitest es mit dem Finger, überwiegend senkrecht; seitlich schwankt es nur leicht. Auf höheren Stufen zieht es manchmal oben noch einmal nach oben – ein Pfeil kündigt das vorher an. Die Bögen sind immer weich, das Ziel springt nie ruckartig. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Auf und ab folgen', 'Bögen begleiten', 'Vorausschauend führen'],
  captions: {
    touch: 'Finger auflegen – das Ziel hüpft',
    follow: 'Zieh die Marke auf und ab mit',
    band: 'Oben langsam, unten schnell',
    goal: 'Geschafft – Band gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Band',
    deviation: 'Ø Abstand zum Ziel (in % des Bandes)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Die Bögen sind gleich: oben bremsen, unten schneller. Bewege die Hand schon mit, bevor das Ziel dort ist.',
    calm: 'Lass die Hand in einer runden Bewegung mitschwingen – oben sanft abbremsen, unten nicht hinterherhetzen.',
    great: 'Stark auf und ab gefolgt! Bleib locker – dann klappt es auch bei schnelleren Bögen.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Band',
    start: 'Leg den Finger irgendwo auf – die Marke folgt dir',
  },
};

export const it: ExerciseTexts = {
  title: 'Su e giù',
  tagline: 'Segui un bersaglio che salta su e giù in archi morbidi.',
  steps: [
    'Appoggia il dito dove vuoi – il bersaglio salta ad archi.',
    'Trascina il segno su e giù e resta nella fascia.',
    'Freccia = spinta extra verso l’alto. Con disturbi: pausa.',
  ],
  why:
    'Il bersaglio salta come una palla: in basso veloce, in alto lento, poi di nuovo giù. Lo accompagni con il dito, per lo più in verticale; di lato oscilla appena. Ai livelli più alti a volte in alto sale ancora una volta – una freccia lo annuncia prima. Gli archi sono sempre morbidi, il bersaglio non scatta mai. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Seguire su e giù', 'Accompagnare gli archi', 'Guidare in anticipo'],
  captions: {
    touch: 'Appoggia il dito – il bersaglio salta',
    follow: 'Trascina il segno su e giù',
    band: 'In alto lento, in basso veloce',
    goal: 'Fatto – fascia mantenuta',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nella fascia',
    deviation: 'Ø distanza dal bersaglio (in % della fascia)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Gli archi sono uguali: in alto frenare, in basso accelerare. Muovi la mano prima che il bersaglio arrivi.',
    calm: 'Lascia che la mano oscilli in un movimento rotondo – in alto frena dolcemente, in basso non inseguirlo di corsa.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche con archi più veloci.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nella fascia',
    start: 'Appoggia il dito dove vuoi – il segno ti segue',
  },
};
