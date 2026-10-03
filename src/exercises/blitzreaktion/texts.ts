import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Blitzreaktion',
  tagline: 'Wie schnell bist du? Tippe, sobald ein Licht aufblitzt.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Leuchtet ein Licht auf, tippe sofort – egal wohin.',
    'Nicht raten: Erst tippen, wenn es leuchtet!',
  ],
  why:
    'Du übst, schnell und gleichmäßig auf Lichter zu reagieren, die plötzlich auftauchen – in der Mitte und am Rand, ohne den Blick zu bewegen. Dein Verlauf zeigt auch deine Tagesform. Ob sich das auf Straßenverkehr oder Sport überträgt, ist nicht belegt – und über deine Fahrtüchtigkeit sagt die Übung nichts aus.',
  goodFor: ['Schnell auf Plötzliches reagieren', 'Ballspiele', 'Aufmerksam bleiben'],
  captions: {
    look: 'Schau auf das Kreuz in der Mitte',
    tap: 'Licht? Sofort tippen – egal wo!',
    edge: 'Auch am Rand – der Blick bleibt in der Mitte',
    early: 'Nicht raten: erst tippen, wenn es leuchtet',
  },
  metrics: {
    median: 'Reaktionszeit',
    center: 'Mitte',
    edge: 'Rand',
    spread: 'Schwankung',
    early: 'Zu früh getippt',
    missed: 'Verpasst',
  },
  tips: {
    early: 'Du hast öfter zu früh getippt. Warte wirklich auf das Licht – Raten bringt nichts.',
    focus: 'Ein paar Lichter hast du sehr spät oder gar nicht erwischt. Das ist normal, wenn man müde ist. Kurze Pause, dann klappt’s besser.',
    edge: 'Am Rand bist du etwas langsamer als in der Mitte. Schau aufs Kreuz, aber nimm den ganzen Bildschirm wahr.',
    steady: 'Deine Zeiten schwanken noch. Finger locker über dem Bildschirm halten und ruhig atmen.',
    relaxed: 'Sehr gleichmäßig! Halte den Finger locker bereit – so geht es noch schneller.',
  },
  feedback: {
    early: 'Zu früh!',
    missed: 'Verpasst',
    warmup: 'Aufwärmen',
  },
};

export const it: ExerciseTexts = {
  title: 'Reazione lampo',
  tagline: 'Quanto sei veloce? Tocca appena si accende una luce.',
  steps: [
    'Guarda la croce al centro.',
    'Quando si accende una luce, tocca subito – in un punto qualsiasi.',
    'Non tirare a indovinare: tocca solo quando si accende!',
  ],
  why:
    'Ti alleni a reagire in modo rapido e costante a luci che compaiono all’improvviso – al centro e ai lati, senza muovere lo sguardo. I tuoi progressi mostrano anche la tua forma del giorno. Non è dimostrato che questo si trasferisca al traffico o allo sport – e l’esercizio non dice nulla sulla tua idoneità alla guida.',
  goodFor: ['Reagire in fretta a ciò che accade all’improvviso', 'Giochi con la palla', 'Restare attenti'],
  captions: {
    look: 'Guarda la croce al centro',
    tap: 'Luce? Tocca subito – ovunque!',
    edge: 'Anche ai lati – lo sguardo resta al centro',
    early: 'Non indovinare: tocca solo quando si accende',
  },
  metrics: {
    median: 'Tempo di reazione',
    center: 'Centro',
    edge: 'Lati',
    spread: 'Variabilità',
    early: 'Tocchi in anticipo',
    missed: 'Mancati',
  },
  tips: {
    early: 'Hai toccato spesso troppo presto. Aspetta davvero la luce – indovinare non serve.',
    focus: 'Alcune luci le hai prese molto tardi o per niente. È normale quando si è stanchi. Una breve pausa e andrà meglio.',
    edge: 'Ai lati sei un po’ più lento che al centro. Guarda la croce, ma percepisci tutto lo schermo.',
    steady: 'I tuoi tempi variano ancora. Tieni il dito rilassato sopra lo schermo e respira con calma.',
    relaxed: 'Molto regolare! Tieni il dito pronto e rilassato – così andrai ancora più veloce.',
  },
  feedback: {
    early: 'Troppo presto!',
    missed: 'Mancato',
    warmup: 'Riscaldamento',
  },
};
