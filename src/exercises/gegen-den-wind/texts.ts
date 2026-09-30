import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte. Ehrlich: gemessen wird nur der Abstand der Marke zum Ziel – nicht, ob die Hand zittert.

export const de: ExerciseTexts = {
  title: 'Gegen den Wind',
  tagline: 'Halte die Marke im Ring, obwohl ein unsichtbarer Wind sie schiebt.',
  steps: [
    'Leg den Finger unter die Marke.',
    'Ein unsichtbarer Wind schiebt sie – gleiche ihn aus.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn du etwas ruhig halten willst, gleichst du kleine Schübe laufend aus. Das übst du hier: Ein unsichtbarer Wind schiebt die Marke langsam mal hierhin, mal dorthin, und du hältst sie mit dem Finger im Ring. Das Ziel bleibt dabei ruhig. Gemessen wird nur, wie nah die Marke am Ziel bleibt – nicht, ob deine Hand zittert, und nichts über deine Gesundheit. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Ruhig halten', 'Kleine Schübe ausgleichen', 'Mit dem Finger gegensteuern'],
  captions: {
    touch: 'Leg den Finger unter die Marke',
    follow: 'Ein unsichtbarer Wind schiebt sie',
    band: 'Gleiche den Wind mit dem Finger aus',
    goal: 'Geschafft – Ring gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Ring',
    deviation: 'Ø Abstand zum Ziel (in % des Rings)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Die Marke zeigt dir, wohin der Wind gerade schiebt. Reagiere früh mit kleinen Bewegungen statt spät mit großen.',
    calm: 'Zu große Gegenbewegungen gehen übers Ziel hinaus. Kleine, weiche Korrekturen klappen besser.',
    great: 'Stark ausgeglichen! Bleib locker – dann klappt es auch bei stärkerem Wind.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Ring',
    start: 'Leg den Finger unter die Marke',
  },
};

export const it: ExerciseTexts = {
  title: 'Contro il vento',
  tagline: 'Tieni il segno nell’anello anche se un vento invisibile lo spinge.',
  steps: [
    'Appoggia il dito sotto il segno.',
    'Un vento invisibile lo spinge – compensalo.',
    'Con tremore alle mani o disturbi: meglio una pausa.',
  ],
  why:
    'Quando vuoi tenere qualcosa fermo, compensi continuamente le piccole spinte. Qui lo eserciti: un vento invisibile spinge piano il segno ora di qua, ora di là, e tu lo tieni nell’anello con il dito. Il bersaglio resta fermo. Si misura solo quanto il segno resta vicino al bersaglio – non se la mano trema, e niente sulla tua salute. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Tenere fermo', 'Compensare piccole spinte', 'Controsterzare con il dito'],
  captions: {
    touch: 'Appoggia il dito sotto il segno',
    follow: 'Un vento invisibile lo spinge',
    band: 'Compensa il vento con il dito',
    goal: 'Fatto – anello mantenuto',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nell’anello',
    deviation: 'Ø distanza dal bersaglio (in % dell’anello)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Il segno ti mostra dove spinge il vento. Reagisci presto con piccoli movimenti invece che tardi con movimenti grandi.',
    calm: 'Contromovimenti troppo grandi superano il bersaglio. Correzioni piccole e morbide vanno meglio.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche con vento più forte.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nell’anello',
    start: 'Appoggia il dito sotto il segno',
  },
};
