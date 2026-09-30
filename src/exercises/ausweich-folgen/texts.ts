import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte. Ehrlich: Das Ziel „weicht“ nur scheinbar aus (vorab festgelegter Ablauf).

export const de: ExerciseTexts = {
  title: 'Ausweich folgen',
  tagline: 'Bleib mit deiner Marke an einem Ziel, das scheinbar ausweicht.',
  steps: [
    'Leg den Finger irgendwo auf – das Ziel gleitet hin und her.',
    'Schieb die Marke seitwärts mit und bleib im hellen Band.',
    'Bei Hand- oder Augenbeschwerden: lieber pausieren.',
  ],
  why:
    'Das Ziel wechselt immer wieder Richtung und Tempo, als würde es deiner Marke ausweichen. Das ist aber nur scheinbar so: Der Ablauf steht vorher fest und hängt nicht von deiner Marke ab. Du übst, nach jedem Wechsel schnell wieder am Ziel zu sein. Mit deinem Erfolg wechselt es öfter und schneller. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Schnell umsteuern', 'Seitwärts folgen', 'Wieder einfangen'],
  captions: {
    touch: 'Finger auflegen – das Ziel gleitet los',
    follow: 'Schieb die Marke seitwärts mit',
    band: 'Es wechselt die Richtung – dranbleiben',
    goal: 'Geschafft – Band gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Band',
    deviation: 'Ø Abstand zum Ziel (in % des Bandes)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Schau aufs Ziel, nicht auf die Marke – und bremse sofort, wenn es wendet, statt in der alten Richtung weiterzulaufen.',
    calm: 'Kleine, ruhige Korrekturen klappen besser als ein hektisches Hin und Her. Lass die Marke eher mitgleiten.',
    great: 'Stark drangeblieben! Bleib locker – dann klappt es auch bei schnelleren Wechseln.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Band',
    start: 'Leg den Finger irgendwo auf – nur die Seite zählt',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui lo scarto',
  tagline: 'Resta con il tuo segno su un bersaglio che sembra schivare.',
  steps: [
    'Appoggia il dito dove vuoi – il bersaglio scivola avanti e indietro.',
    'Sposta il segno di lato con lui e resta nella fascia chiara.',
    'Con disturbi a mani o occhi: meglio una pausa.',
  ],
  why:
    'Il bersaglio cambia continuamente direzione e velocità, come se schivasse il tuo segno. Ma è solo apparenza: lo svolgimento è stabilito prima e non dipende dal tuo segno. Eserciti il tornare in fretta sul bersaglio dopo ogni cambio. Con il tuo successo i cambi diventano più frequenti e più rapidi. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Correggere in fretta', 'Seguire di lato', 'Riagganciare il bersaglio'],
  captions: {
    touch: 'Appoggia il dito – il bersaglio parte',
    follow: 'Sposta il segno di lato con lui',
    band: 'Cambia direzione – resta con lui',
    goal: 'Fatto – fascia mantenuta',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nella fascia',
    deviation: 'Ø distanza dal bersaglio (in % della fascia)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Guarda il bersaglio, non il segno – e frena subito quando cambia direzione, invece di continuare nella direzione vecchia.',
    calm: 'Piccole correzioni calme vanno meglio di un avanti e indietro frenetico. Lascia scivolare il segno insieme a lui.',
    great: 'Ottimo, sei rimasto con lui! Resta rilassato – così ce la fai anche con cambi più rapidi.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nella fascia',
    start: 'Appoggia il dito dove vuoi – conta solo il lato',
  },
};
