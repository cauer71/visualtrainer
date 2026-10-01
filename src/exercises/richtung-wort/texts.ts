import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Die vier Wörter auf den Feldern stehen unter feedback (wordUp, wordRight, wordDown, wordLeft).

export const de: ExerciseTexts = {
  title: 'Richtung & Wort',
  tagline: 'Ein Zeichen zeigt eine Richtung – tippe das Feld mit dem passenden Wort.',
  steps: [
    'Oben zeigt ein Zeichen eine Richtung, z. B. ein Pfeil.',
    'Tippe unten das Feld, auf dem das passende Wort steht.',
    'Die Wörter wechseln den Platz – lies, bevor du tippst.',
  ],
  why:
    'Wörter lesen wir automatisch mit – auch dann, wenn wir eigentlich auf etwas anderes achten wollen. Steht „LINKS“ auf einem Feld rechts, kommen Lage und Wort einander in die Quere, und es dauert etwas länger; das ist normal. Darum werden die Wörter Schritt für Schritt vertauscht, später kommen Schrägpfeil (zählt nur links oder rechts), Kurve und eine Antwortzeit dazu. Die Zeit zählt nur im Vergleich mit deinen früheren Durchgängen auf diesem Gerät. Ob sich das auf Alltag oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Wörter und Zeichen zuordnen', 'Schilder und Bedienfelder lesen', 'Genau hinschauen'],
  captions: {
    up: 'Der Pfeil zeigt nach oben: tippe OBEN',
    swap: 'Die Wörter wechseln den Platz – lies!',
    diag: 'Schrägpfeil: nur links oder rechts zählt',
    curve: 'Kurve nach rechts: tippe RECHTS',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Treffer',
    posCost: 'Mehrzeit bei vertauschtem Wort',
    meanRt: 'Ø Zeit (richtig)',
    posErrors: 'Nach Lage statt nach Wort',
    axisErrors: 'Achse verwechselt',
  },
  tips: {
    early: 'Du tippst öfter, bevor Zeichen und Wörter da sind. Warte kurz – tippe erst, wenn du sie siehst.',
    position:
      'Mehrmals hast du das Feld getippt, wohin das Zeichen zeigt – aber dort stand ein anderes Wort. Lies erst das Wort, dann tippe.',
    axis: 'Manchmal hast du oben/unten statt links/rechts erwischt. Beim Schrägpfeil und bei der Kurve zählt nur links oder rechts.',
    slow: 'Ein paarmal war die Zeit um. Lies die Wörter mit einem kurzen Blick und tippe dann ruhig.',
    great: 'Stark! Du liest die Wörter sicher, auch wenn sie nicht an ihrer Lage stehen. Bleib locker.',
  },
  feedback: {
    level: 'Stufe',
    wordUp: 'OBEN',
    wordRight: 'RECHTS',
    wordDown: 'UNTEN',
    wordLeft: 'LINKS',
  },
};

export const it: ExerciseTexts = {
  title: 'Direzione e parola',
  tagline: 'Un segno indica una direzione – tocca il campo con la parola giusta.',
  steps: [
    'In alto un segno indica una direzione, ad es. una freccia.',
    'In basso tocca il campo con la parola giusta.',
    'Le parole cambiano posto – leggile prima di toccare.',
  ],
  why:
    'Le parole le leggiamo in automatico, anche quando vorremmo badare ad altro. Se “SINISTRA” sta su un campo a destra, posizione e parola si ostacolano e ci vuole un po’ di più; è normale. Per questo le parole vengono scambiate passo dopo passo; più avanti arrivano freccia obliqua (conta solo sinistra o destra), curva e un tempo di risposta. Il tempo conta solo nel confronto con i tuoi passaggi precedenti su questo dispositivo. Che questo si trasferisca alla vita di tutti i giorni o allo sport non è dimostrato.',
  goodFor: ['Abbinare parole e segni', 'Leggere cartelli e pannelli', 'Guardare con attenzione'],
  captions: {
    up: 'Freccia in alto: tocca ALTO',
    swap: 'Le parole cambiano posto – leggi!',
    diag: 'Obliqua: conta solo sinistra o destra',
    curve: 'Curva a destra: tocca DESTRA',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Giuste',
    posCost: 'Tempo in più con parola scambiata',
    meanRt: 'Tempo medio (giuste)',
    posErrors: 'Per posizione, non per parola',
    axisErrors: 'Asse scambiato',
  },
  tips: {
    early: 'Tocchi spesso prima che segno e parole compaiano. Aspetta un attimo – tocca solo quando li vedi.',
    position:
      'Più volte hai toccato il campo verso cui punta il segno – ma lì c’era un’altra parola. Leggi prima la parola, poi tocca.',
    axis: 'A volte hai scelto alto/basso invece di sinistra/destra. Con la freccia obliqua e la curva conta solo sinistra o destra.',
    slow: 'Un paio di volte il tempo era scaduto. Leggi le parole con una breve occhiata e poi tocca con calma.',
    great: 'Ottimo! Leggi le parole con sicurezza, anche quando non stanno al loro posto. Resta rilassato.',
  },
  feedback: {
    level: 'Livello',
    wordUp: 'ALTO',
    wordRight: 'DESTRA',
    wordDown: 'BASSO',
    wordLeft: 'SINISTRA',
  },
};
