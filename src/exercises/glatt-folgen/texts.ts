import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“, keine Normwerte.

export const de: ExerciseTexts = {
  title: 'Glatt folgen',
  tagline: 'Begleite ein Ziel auf einer weichen, langsamen Kurvenbahn.',
  steps: [
    'Leg den Finger irgendwo auf – das Ziel zieht weiche Kurven.',
    'Führ die Marke gleichmäßig mit und bleib im hellen Band.',
    'Bei Hand- oder Augenbeschwerden: lieber pausieren.',
  ],
  why:
    'Das Ziel zieht ruhige Schleifen, ohne Ecken und ohne Sprünge. Du begleitest es mit gleichmäßiger Fingerbewegung – hier zählt Ruhe, nicht Schnelligkeit. Mit deinem Erfolg läuft es etwas schneller, und die Bahn wird weniger leicht vorhersehbar. Die Marke sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Gleichmäßig führen', 'Weiche Kurven', 'Ruhig nachführen'],
  captions: {
    touch: 'Finger auflegen – das Ziel zieht Kurven',
    follow: 'Führ die Marke gleichmäßig mit',
    band: 'Weich und ruhig – im Band bleiben',
    goal: 'Geschafft – Band gehalten',
  },
  metrics: {
    level: 'Deine Stufe',
    inBand: 'Zeit im Band',
    deviation: 'Ø Abstand zum Ziel (in % des Bandes)',
    passed: 'Gelungene Durchgänge',
  },
  tips: {
    ahead: 'Schau ein Stück voraus auf die Bahn und führ die Hand schon in die Kurve hinein, bevor das Ziel dort ist.',
    calm: 'Gleichmäßig schlägt schnell: Lass die Hand in einer fließenden Bewegung mitschwingen statt zu korrigieren.',
    great: 'Stark, richtig gleichmäßig! Bleib locker – dann klappt es auch bei etwas mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    inBand: 'im Band',
    start: 'Leg den Finger irgendwo auf – die Marke folgt dir',
  },
};

export const it: ExerciseTexts = {
  title: 'Segui con dolcezza',
  tagline: 'Accompagna un bersaglio su una curva morbida e lenta.',
  steps: [
    'Appoggia il dito dove vuoi – il bersaglio disegna curve morbide.',
    'Guida il segno con regolarità e resta nella fascia chiara.',
    'Con disturbi a mani o occhi: meglio una pausa.',
  ],
  why:
    'Il bersaglio disegna anelli calmi, senza angoli e senza salti. Lo accompagni con un movimento regolare del dito – qui conta la calma, non la velocità. Con il tuo successo va un po’ più veloce e il percorso diventa meno prevedibile. Il segno sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Guidare con regolarità', 'Curve morbide', 'Seguire con calma'],
  captions: {
    touch: 'Appoggia il dito – il bersaglio curva',
    follow: 'Guida il segno con regolarità',
    band: 'Morbido e calmo – resta nella fascia',
    goal: 'Fatto – fascia mantenuta',
  },
  metrics: {
    level: 'Il tuo livello',
    inBand: 'Tempo nella fascia',
    deviation: 'Ø distanza dal bersaglio (in % della fascia)',
    passed: 'Turni riusciti',
  },
  tips: {
    ahead: 'Guarda un pezzo avanti sul percorso e porta la mano nella curva prima che il bersaglio arrivi.',
    calm: 'La regolarità batte la velocità: lascia che la mano oscilli in un movimento fluido invece di correggere.',
    great: 'Ottimo, davvero regolare! Resta rilassato – così ce la fai anche con un po’ più di velocità.',
  },
  feedback: {
    level: 'Livello',
    inBand: 'nella fascia',
    start: 'Appoggia il dito dove vuoi – il segno ti segue',
  },
};
