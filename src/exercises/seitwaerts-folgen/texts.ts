import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Seitwärts folgen',
  tagline: 'Folge mit deiner Marke dem Ziel, das hin und her ausweicht.',
  steps: [
    'Leg den Finger irgendwo auf – nur links und rechts zählt.',
    'Die Marke folgt deinem Finger – bleib im hellen Ring.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn sich etwas hin und her bewegt und plötzlich die Richtung wechselt, passt du deine Hand laufend an. Das übst du hier: Das Ziel weicht seitlich aus und wendet in einem Wechselrhythmus (kurz – lang – lang – kurz), den du dir merken kannst. Mit deinem Erfolg wird es schneller und wendet öfter. Die Wendungen sind weich, nicht ruckartig. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Hin und her folgen', 'Richtungswechsel mitgehen', 'Regler seitlich führen'],
  captions: {
    touch: 'Leg den Finger auf – das Ziel läuft los',
    follow: 'Die Marke folgt deinem Finger seitwärts',
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
    ahead: 'Die Wendungen kommen in einem Rhythmus: kurz – lang – lang – kurz. Merk ihn dir und bremse die Hand schon, bevor das Ziel wendet.',
    calm: 'Kleine, gleichmäßige Bewegungen klappen besser als Ruckeln. Lass die Hand bei der Wendung weich mitschwingen.',
    great: 'Stark gefolgt! Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Ring',
    start: 'Leg den Finger irgendwo auf – nur links und rechts zählt',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui di lato',
  tagline: 'Segui con il tuo segno il bersaglio che scarta avanti e indietro.',
  steps: [
    'Appoggia il dito dove vuoi – contano solo sinistra e destra.',
    'Il segno segue il dito – resta nell’anello chiaro.',
    'Con tremore alle mani o disturbi: meglio una pausa.',
  ],
  why:
    'Quando qualcosa si muove avanti e indietro e cambia direzione all’improvviso, adatti continuamente la mano. Qui lo eserciti: il bersaglio scarta di lato e gira secondo un ritmo (breve – lungo – lungo – breve) che puoi memorizzare. Con il tuo successo diventa più veloce e gira più spesso. Le svolte sono morbide, non a scatti. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Seguire avanti e indietro', 'Seguire i cambi di direzione', 'Guidare un cursore di lato'],
  captions: {
    touch: 'Appoggia il dito – il bersaglio parte',
    follow: 'Il segno segue il dito di lato',
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
    ahead: 'Le svolte seguono un ritmo: breve – lungo – lungo – breve. Memorizzalo e frena la mano già prima che il bersaglio giri.',
    calm: 'Movimenti piccoli e regolari vanno meglio degli scatti. Lascia che la mano segua con morbidezza la svolta.',
    great: 'Ottimo! Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nell’anello',
    start: 'Appoggia il dito dove vuoi – contano solo sinistra e destra',
  },
};
