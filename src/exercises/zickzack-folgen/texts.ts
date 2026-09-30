import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“, keine Normwerte.

export const de: ExerciseTexts = {
  title: 'Zickzack folgen',
  tagline: 'Bleib mit deiner Marke an einem Ziel, das im Zickzack läuft.',
  steps: [
    'Leg den Finger irgendwo auf – das Ziel läuft im Zickzack los.',
    'Zieh die Marke mit und bleib im hellen Band.',
    'Bei Hand- oder Augenbeschwerden: lieber pausieren.',
  ],
  why:
    'Das Ziel läuft in geraden Stücken und knickt dann ab – anfangs sanft, später schärfer und schneller. Du führst die Marke mit dem Finger und fängst sie nach jedem Knick wieder ein. Die Knicke sind immer gerundet, das Ziel springt nie. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Richtungswechsel', 'Mit dem Finger folgen', 'Schnell nachsteuern'],
  captions: {
    touch: 'Finger auflegen – das Ziel startet',
    follow: 'Zieh die Marke mit dem Finger mit',
    band: 'Nach jedem Knick: wieder einfangen',
    goal: 'Geschafft – Band gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Band',
    deviation: 'Ø Abstand zum Ziel (in % des Bandes)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Hetz nach einem Knick nicht hinterher: Peil eine Stelle ein Stück vor dem Ziel an, dann kommst du leichter wieder ran.',
    calm: 'Kleine, runde Bewegungen klappen besser als Ruckeln – auch an den Knicken. Schneide die Ecken ruhig etwas ab.',
    great: 'Stark nachgeführt! Bleib locker – dann klappt es auch bei schärferen Knicken.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Band',
    start: 'Leg den Finger irgendwo auf – die Marke folgt dir',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui lo zigzag',
  tagline: 'Resta con il tuo segno su un bersaglio che corre a zigzag.',
  steps: [
    'Appoggia il dito dove vuoi – il bersaglio parte a zigzag.',
    'Trascina il segno con lui e resta nella fascia chiara.',
    'Con disturbi a mani o occhi: meglio una pausa.',
  ],
  why:
    'Il bersaglio corre a tratti rettilinei e poi gira – all’inizio dolcemente, poi più netto e più veloce. Con il dito guidi il segno e lo riagganci dopo ogni svolta. Le svolte sono sempre arrotondate, il bersaglio non salta mai. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Cambi di direzione', 'Seguire con il dito', 'Correggere in fretta'],
  captions: {
    touch: 'Appoggia il dito – il bersaglio parte',
    follow: 'Trascina il segno con il dito',
    band: 'Dopo ogni svolta: riagganciarlo',
    goal: 'Fatto – fascia mantenuta',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nella fascia',
    deviation: 'Ø distanza dal bersaglio (in % della fascia)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Dopo una svolta non inseguirlo di corsa: punta un po’ davanti al bersaglio, così lo riprendi più facilmente.',
    calm: 'Movimenti piccoli e rotondi vanno meglio degli scatti – anche nelle svolte. Puoi tagliare un po’ gli angoli.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche con svolte più nette.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nella fascia',
    start: 'Appoggia il dito dove vuoi – il segno ti segue',
  },
};
