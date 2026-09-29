import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Blitzblick',
  tagline: 'Mitte und Rand auf einen Blick – in einem Wimpernschlag.',
  steps: [
    'Schau in die Mitte: Dort blitzt kurz ein Fahrzeug auf.',
    'Gleichzeitig erscheint am Rand ein Stern.',
    'Tippe an: Auto oder Lastwagen? Und wo war der Stern?',
  ],
  why:
    'Nach vorne schauen und trotzdem merken, was seitlich passiert – das ist zum Beispiel im Straßenverkehr gefragt. Hier übst du, Mitte und Rand in einem kurzen Moment zu erfassen. Ähnliche Übungen wurden in großen Studien mit älteren Menschen untersucht; unsere Version ist davon inspiriert, und ob sich das auf den Alltag überträgt, ist nicht sicher belegt.',
  goodFor: ['Kreuzung im Verkehr', 'Radfahren', 'Menschenmengen'],
  captions: {
    look: 'Kurz hinschauen …',
    what: 'Was ist in der Mitte? Wo ist der Stern?',
    again: 'Und noch einmal!',
  },
  metrics: {
    level: 'Erreichte Stufe',
    accuracy: 'Treffsicherheit',
    center: 'Mitte richtig',
    edge: 'Rand richtig',
    viewTime: 'Anzeigezeit zuletzt',
  },
  tips: {
    wide: 'Blick in die Mitte, aber den ganzen Bildschirm mit wahrnehmen – wie beim Autofahren.',
    center: 'Schau zuerst genau aufs Fahrzeug in der Mitte – den Stern am Rand bemerkst du trotzdem.',
    great: 'Stark! Mitte und Rand klappen gleich gut. Beim nächsten Mal wird es noch kürzer.',
  },
  feedback: {
    right: 'Richtig!',
    wrong: 'Nicht ganz',
    level: 'Stufe',
    ask: 'Was war in der Mitte? Wo war der Stern?',
    askEdge: 'Und wo war der Stern?',
    askCenter: 'Und was war in der Mitte?',
    distract: 'Neu: Dreiecke lenken ab!',
  },
};

export const it: ExerciseTexts = {
  title: 'Colpo d’occhio',
  tagline: 'Centro e lati in un solo sguardo – in un battito di ciglia.',
  steps: [
    'Guarda al centro: lì compare per un attimo un veicolo.',
    'Nello stesso momento ai lati appare una stella.',
    'Tocca: auto o camion? E dov’era la stella?',
  ],
  why:
    'Guardare avanti e accorgersi comunque di ciò che succede ai lati – serve per esempio nel traffico. Qui ti alleni a cogliere centro e lati in un attimo. Esercizi simili sono stati studiati in grandi ricerche con persone anziane; la nostra versione si ispira a questi, ma non è dimostrato con certezza che l’effetto si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Incroci nel traffico', 'Andare in bici', 'In mezzo alla folla'],
  captions: {
    look: 'Guarda un attimo …',
    what: 'Cosa c’è al centro? Dov’è la stella?',
    again: 'Ancora una volta!',
  },
  metrics: {
    level: 'Livello raggiunto',
    accuracy: 'Precisione',
    center: 'Centro giusto',
    edge: 'Lati giusti',
    viewTime: 'Ultimo tempo di visione',
  },
  tips: {
    wide: 'Guarda al centro, ma percepisci tutto lo schermo – come alla guida.',
    center: 'Guarda prima bene il veicolo al centro – la stella ai lati la noterai comunque.',
    great: 'Forte! Centro e lati vanno ugualmente bene. La prossima volta sarà ancora più breve.',
  },
  feedback: {
    right: 'Giusto!',
    wrong: 'Non proprio',
    level: 'Livello',
    ask: 'Cosa c’era al centro? Dov’era la stella?',
    askEdge: 'E dov’era la stella?',
    askCenter: 'E cosa c’era al centro?',
    distract: 'Novità: i triangoli ti distraggono!',
  },
};
