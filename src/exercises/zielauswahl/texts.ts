import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Neutrale Rahmung: „Dringlichkeit“ statt Bedrohung, „Ziele“ statt Gegner.

export const de: ExerciseTexts = {
  title: 'Zielauswahl',
  tagline: 'Tippe zuerst das Dringendste an – dann das Nächste.',
  steps: [
    'Mehrere Ziele liegen da, jedes mit einer Dringlichkeit.',
    'Erst Dreiecke, dann Kreise, dann Quadrate antippen.',
    'Falsche Reihenfolge zählt als Fehler.',
  ],
  why:
    'Im Alltag musst du oft entscheiden, was zuerst dran ist – zum Beispiel beim Kochen, wenn mehrere Dinge gleichzeitig fertig werden. Hier ordnest du Ziele nach ihrer Dringlichkeit, die du an Form und Muster erkennst, nicht an der Farbe. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Alltag oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Reihenfolge festlegen', 'Mehreres im Blick behalten', 'Entscheiden'],
  captions: {
    watch: 'Ziele mit verschiedener Dringlichkeit',
    first: 'Erst hoch: das Dreieck',
    wrong: 'Falsche Reihenfolge zählt als Fehler',
    mid: 'Dann mittel: die Kreise',
    last: 'Zuletzt niedrig: das Quadrat',
  },
  metrics: {
    level: 'Stufe',
    orderPct: 'Richtige Reihenfolge',
    perTarget: 'Zeit je Ziel (Median)',
    roundsOk: 'Runden geschafft',
    missed: 'Verpasste Ziele',
  },
  tips: {
    order: 'Öfter war die Reihenfolge falsch. Frag dich vor jedem Tipp: Liegt noch ein Dreieck da? Dann zuerst das.',
    slow: 'In einigen Runden lief die Zeit ab. Such dir erst einen Weg von Ziel zu Ziel und tippe dann zügig.',
    great: 'Stark! Du behältst die Reihenfolge im Blick. Bleib locker – dann klappt es auch mit mehr und kleineren Zielen.',
  },
  feedback: {
    level: 'Stufe',
    urgency: 'Dringlichkeit',
    high: 'Hoch',
    mid: 'Mittel',
    low: 'Niedrig',
    roundOk: 'Geschafft',
    roundTime: 'Zeit um',
    roundOrder: 'Mit Fehlern',
  },
};

export const it: ExerciseTexts = {
  title: 'Scelta del bersaglio',
  tagline: 'Tocca prima il più urgente – poi il successivo.',
  steps: [
    'Più bersagli sono sullo schermo, ognuno con un’urgenza.',
    'Prima i triangoli, poi i cerchi, poi i quadrati.',
    'L’ordine sbagliato conta come errore.',
  ],
  why:
    'Nella vita di tutti i giorni bisogna spesso decidere cosa viene prima – per esempio mentre si cucina, quando più cose sono pronte insieme. Qui ordini i bersagli in base alla loro urgenza, che riconosci dalla forma e dal motivo, non dal colore. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni o allo sport.',
  goodFor: ['Stabilire l’ordine', 'Tenere d’occhio più cose', 'Decidere'],
  captions: {
    watch: 'Bersagli con urgenza diversa',
    first: 'Prima l’alta: il triangolo',
    wrong: 'L’ordine sbagliato conta come errore',
    mid: 'Poi la media: i cerchi',
    last: 'Per ultima la bassa: il quadrato',
  },
  metrics: {
    level: 'Livello',
    orderPct: 'Ordine corretto',
    perTarget: 'Tempo per bersaglio (mediana)',
    roundsOk: 'Turni riusciti',
    missed: 'Bersagli mancati',
  },
  tips: {
    order: 'Spesso l’ordine era sbagliato. Prima di ogni tocco chiediti: c’è ancora un triangolo? Allora prima quello.',
    slow: 'In alcuni turni il tempo è scaduto. Cerca prima un percorso da bersaglio a bersaglio e tocca poi con decisione.',
    great: 'Ottimo! Tieni d’occhio l’ordine. Resta rilassato – così funziona anche con più bersagli e più piccoli.',
  },
  feedback: {
    level: 'Livello',
    urgency: 'Urgenza',
    high: 'Alta',
    mid: 'Media',
    low: 'Bassa',
    roundOk: 'Riuscito',
    roundTime: 'Tempo scaduto',
    roundOrder: 'Con errori',
  },
};
