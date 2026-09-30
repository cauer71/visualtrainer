import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen.

export const de: ExerciseTexts = {
  title: 'Kugeln fangen',
  tagline: 'Kreise antippen, Quadrate durchlassen – erst schauen, dann tippen.',
  steps: [
    'Kreise und Quadrate fallen von oben herab.',
    'Tippe jeden Kreis an, bevor er den Boden berührt.',
    'Quadrate lässt du einfach fallen.',
  ],
  why:
    'Im Alltag entscheidest du oft in einem Augenblick: zugreifen oder lieber nicht. Hier unterscheiden sich Kreis und Quadrat nur in der Form – nicht in der Farbe. Mit deinem Erfolg fallen die Formen schneller und dichter. Geübt wird, kurz hinzuschauen, bevor du tippst. Ob sich das auf Alltag oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Schnell entscheiden', 'Zugreifen oder lassen', 'Spielen mit Kindern'],
  captions: {
    tap: 'Kreise tippst du an',
    stop: 'Quadrate lässt du fallen',
  },
  metrics: {
    level: 'Deine Stufe',
    caught: 'Kreise gefangen',
    falseAlarms: 'Quadrate angetippt',
    count: 'Anzahl Fänge',
  },
  tips: {
    form: 'Ein paar Quadrate hast du angetippt. Wirf vor jedem Tipp einen kurzen Blick auf die Form – eckig bleibt tabu.',
    late: 'Du fängst die Kreise meist kurz vor dem Boden. Tippe früher – dann bleibt Zeit für die nächsten.',
    great: 'Stark! Du unterscheidest die Formen sicher. Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    escaped: 'Verpasst',
    wrong: 'Quadrat',
    hint: 'Quadrate lässt du fallen',
  },
};

export const it: ExerciseTexts = {
  title: 'Prendi le sfere',
  tagline: 'Tocca i cerchi, lascia passare i quadrati – prima guarda, poi tocca.',
  steps: [
    'Cerchi e quadrati cadono dall’alto.',
    'Tocca ogni cerchio prima che arrivi a terra.',
    'I quadrati li lasci semplicemente cadere.',
  ],
  why:
    'Nella vita di tutti i giorni decidi spesso in un attimo: afferrare o meglio di no. Qui cerchio e quadrato si distinguono solo per la forma – non per il colore. Con il tuo successo le forme cadono più veloci e più fitte. Si esercita a dare una breve occhiata prima di toccare. Non è dimostrato che questo si trasferisca alla vita quotidiana o allo sport.',
  goodFor: ['Decidere in fretta', 'Afferrare o lasciare', 'Giocare con i bambini'],
  captions: {
    tap: 'I cerchi li tocchi',
    stop: 'I quadrati li lasci cadere',
  },
  metrics: {
    level: 'Il tuo livello',
    caught: 'Cerchi presi',
    falseAlarms: 'Quadrati toccati',
    count: 'Numero di prese',
  },
  tips: {
    form: 'Hai toccato qualche quadrato. Prima di ogni tocco dai un’occhiata alla forma – ciò che è spigoloso resta off-limits.',
    late: 'Di solito prendi i cerchi poco prima del suolo. Tocca prima – così resta tempo per i prossimi.',
    great: 'Ottimo! Distingui bene le forme. Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    escaped: 'Mancato',
    wrong: 'Quadrato',
    hint: 'I quadrati li lasci cadere',
  },
};
