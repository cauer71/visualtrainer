import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Spur folgen',
  tagline: 'Folge der laufenden Wellenlinie mit deiner Marke.',
  steps: [
    'Leg den Finger irgendwo auf – die Linie läuft los.',
    'Die Marke folgt deiner Fingerhöhe – bleib im hellen Band.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn du mit dem Finger einer Bewegung auf dem Bildschirm folgst, passt du die Höhe deiner Hand laufend an. Das übst du hier als reine Einzelaufgabe: nur die Linie, nichts nebenbei. Mit deinem Erfolg läuft sie schneller, höher und dichter. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Linien nachzeichnen', 'Mit dem Finger folgen', 'Ruhig nachführen'],
  captions: {
    touch: 'Leg den Finger auf – die Linie läuft los',
    follow: 'Die Marke folgt deiner Fingerhöhe',
    band: 'Bleib im hellen Band',
    goal: 'Geschafft – Band gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Band',
    deviation: 'Ø Abstand zur Linie (in % des Bandes)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Schau ein Stück voraus auf die Linie – nicht nur auf die Marke – und beweg die Hand schon, bevor die Linie dort ist.',
    calm: 'Kleine, gleichmäßige Bewegungen klappen besser als Ruckeln. Lass die Hand locker mitschwingen.',
    great: 'Stark nachgeführt! Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Band',
    start: 'Leg den Finger irgendwo auf – nur die Höhe zählt',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui la traccia',
  tagline: 'Segui con il tuo segno la linea ondulata che scorre.',
  steps: [
    'Appoggia il dito dove vuoi – la linea parte.',
    'Il segno segue l’altezza del dito – resta nella fascia.',
    'Con tremore alle mani o disturbi: meglio una pausa.',
  ],
  why:
    'Quando con il dito segui un movimento sullo schermo, adatti continuamente l’altezza della mano. Qui lo eserciti come compito singolo: solo la linea, nient’altro. Con il tuo successo diventa più veloce, più alta e più fitta. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Ripassare linee', 'Seguire con il dito', 'Seguire con calma'],
  captions: {
    touch: 'Appoggia il dito – la linea parte',
    follow: 'Il segno segue l’altezza del dito',
    band: 'Resta nella fascia chiara',
    goal: 'Fatto – fascia mantenuta',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nella fascia',
    deviation: 'Ø distanza dalla linea (in % della fascia)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Guarda un pezzo in avanti sulla linea – non solo il segno – e muovi la mano prima che la linea arrivi.',
    calm: 'Movimenti piccoli e regolari vanno meglio degli scatti. Lascia che la mano segua con morbidezza.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nella fascia',
    start: 'Appoggia il dito dove vuoi – conta solo l’altezza',
  },
};
