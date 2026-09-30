import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Gegenhalten',
  tagline: 'Halte die Marke auf dem Ziel, obwohl sie nach oben gezogen wird.',
  steps: [
    'Leg den Finger irgendwo auf – nur die Höhe zählt.',
    'Die Marke wird hochgezogen – zieh gleichmäßig dagegen.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn etwas von selbst wegwandert, etwa ein Schieberegler, hältst du mit kleinen, gleichmäßigen Bewegungen dagegen. Das übst du hier: Die Marke wird ruhig nach oben gezogen und gleitet danach zurück, du hältst sie mit der Fingerhöhe im Ring. Mit deinem Erfolg wird der Zug stärker und schneller. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Gleichmäßig gegenhalten', 'Regler ruhig führen', 'Dosiert bewegen'],
  captions: {
    touch: 'Leg den Finger auf – der Zug beginnt',
    follow: 'Sie wird hochgezogen – zieh dagegen',
    band: 'Bleib im hellen Ring',
    goal: 'Geschafft – Ring gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Ring',
    deviation: 'Ø Abstand zum Ziel (in % des Rings)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Der Zug kommt gleichmäßig. Bewege die Hand von Anfang an sanft mit, statt erst zu reagieren, wenn die Marke schon weit weg ist.',
    calm: 'Kleine, gleichmäßige Bewegungen klappen besser als Ruckeln. Beim Zurückgleiten lässt du die Hand locker mitgehen.',
    great: 'Stark gehalten! Bleib locker – dann klappt es auch bei stärkerem Zug.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Ring',
    start: 'Leg den Finger irgendwo auf – nur die Höhe zählt',
  },
};

export const it: ExerciseTexts = {
  title: 'Tieni contro',
  tagline: 'Tieni il segno sul bersaglio, anche se viene tirato verso l’alto.',
  steps: [
    'Appoggia il dito dove vuoi – conta solo l’altezza.',
    'Il segno viene tirato su – tira in modo regolare contro.',
    'Con tremore alle mani o disturbi: meglio una pausa.',
  ],
  why:
    'Quando qualcosa se ne va da solo, per esempio un cursore, lo trattieni con piccoli movimenti regolari. Qui lo eserciti: il segno viene tirato piano verso l’alto e poi scivola indietro, tu lo tieni nell’anello con l’altezza del dito. Con il tuo successo la trazione diventa più forte e più veloce. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Tenere contro con regolarità', 'Guidare un cursore con calma', 'Muoversi con misura'],
  captions: {
    touch: 'Appoggia il dito – la trazione inizia',
    follow: 'Viene tirato su – tira contro',
    band: 'Resta nell’anello chiaro',
    goal: 'Fatto – anello mantenuto',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nell’anello',
    deviation: 'Ø distanza dal bersaglio (in % dell’anello)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'La trazione arriva in modo regolare. Muovi la mano piano fin dall’inizio, invece di reagire solo quando il segno è già lontano.',
    calm: 'Movimenti piccoli e regolari vanno meglio degli scatti. Quando il segno scivola indietro, lascia che la mano segua con morbidezza.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche con una trazione più forte.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nell’anello',
    start: 'Appoggia il dito dove vuoi – conta solo l’altezza',
  },
};
