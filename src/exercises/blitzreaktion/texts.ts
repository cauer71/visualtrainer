import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Blitzreaktion',
  tagline: 'Schneller reagieren – beim Autofahren, beim Sport und im Alltag.',
  steps: [
    'Schau auf das Kreuz in der Mitte.',
    'Leuchtet ein Licht auf, tippe sofort – egal wohin.',
    'Nicht raten: Erst tippen, wenn es leuchtet!',
  ],
  why:
    'Wie schnell du auf etwas reagierst, das plötzlich auftaucht, zählt überall: beim Bremsen, beim Ballfangen, beim Ausweichen. Hier übst du genau das – auch für Lichter am Rand, ohne den Blick zu bewegen.',
  goodFor: ['Bremsen im Verkehr', 'Ballsport', 'Wachsamkeit'],
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
    early: 'Zu früh getippt',
    missed: 'Verpasst',
  },
  tips: {
    early: 'Du hast öfter zu früh getippt. Warte wirklich auf das Licht – Raten bringt nichts.',
    focus: 'Ein paar Lichter sind durchgerutscht. Bleib dran – kurze Aufmerksamkeitslücken sind normal und werden mit Übung seltener.',
    edge: 'Am Rand reagierst du langsamer als in der Mitte. Schau aufs Kreuz, aber nimm den ganzen Bildschirm wahr.',
    steady: 'Deine Zeiten schwanken noch stark. Finger locker über dem Bildschirm halten und ruhig atmen.',
    relaxed: 'Sehr gleichmäßig! Halte den Finger locker bereit – so geht es noch schneller.',
  },
  feedback: {
    early: 'Zu früh!',
    missed: 'Verpasst',
  },
};

export const it: ExerciseTexts = {
  title: 'Reazione lampo',
  tagline: 'Reagire più in fretta – alla guida, nello sport e nella vita di tutti i giorni.',
  steps: [
    'Guarda la croce al centro.',
    'Quando si accende una luce, tocca subito – in un punto qualsiasi.',
    'Non tirare a indovinare: tocca solo quando si accende!',
  ],
  why:
    'La velocità con cui reagisci a qualcosa che compare all’improvviso conta ovunque: quando freni, quando prendi una palla, quando schivi un ostacolo. Qui alleni proprio questo – anche per le luci ai lati, senza muovere lo sguardo.',
  goodFor: ['Frenare nel traffico', 'Sport con la palla', 'Attenzione'],
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
    early: 'Tocchi in anticipo',
    missed: 'Mancati',
  },
  tips: {
    early: 'Hai toccato spesso troppo presto. Aspetta davvero la luce – indovinare non serve.',
    focus: 'Qualche luce ti è sfuggita. Non mollare – brevi cali di attenzione sono normali e con l’allenamento diventano più rari.',
    edge: 'Ai lati reagisci più lentamente che al centro. Guarda la croce, ma percepisci tutto lo schermo.',
    steady: 'I tuoi tempi variano ancora molto. Tieni il dito rilassato sopra lo schermo e respira con calma.',
    relaxed: 'Molto regolare! Tieni il dito pronto e rilassato – così andrai ancora più veloce.',
  },
  feedback: {
    early: 'Troppo presto!',
    missed: 'Mancato',
  },
};
