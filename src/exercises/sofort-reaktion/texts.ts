import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Sofort-Reaktion',
  tagline: 'Die Mitte leuchtet auf – tippe, so schnell du kannst.',
  steps: ['Schau auf den Kreis in der Mitte.', 'Sobald er warm aufleuchtet, tippe sofort – egal wohin.', 'Nicht raten: erst tippen, wenn er leuchtet!'],
  why:
    'Du übst, gleichmäßig auf ein Licht zu reagieren, dessen Zeitpunkt du nicht erraten kannst. Wer vor dem Licht tippt, bekommt einen Frühstart angezeigt. Wichtig: Ein Tablet zeigt die Zeit etwas zu lang an, weil Berührung und Bildschirm Zeit brauchen – oft 50 bis 130 Millisekunden. Deshalb zählt nur der Vergleich mit dir selbst auf diesem Gerät. Ob sich das Üben auf Straßenverkehr oder Sport überträgt, ist nicht belegt – und über deine Fahrtüchtigkeit sagt das Spiel nichts aus.',
  goodFor: ['Aufmerksam bleiben', 'Schnell reagieren', 'Ballspiele'],
  captions: {
    look: 'Schau auf den Kreis in der Mitte',
    tap: 'Es leuchtet! Sofort tippen',
    early: 'Erst tippen, wenn es leuchtet!',
    again: 'Zu früh – der Durchgang beginnt neu',
  },
  metrics: {
    median: 'Reaktionszeit (Median)',
    spread: 'Streuung',
    early: 'Frühstarts',
    valid: 'Gültige Durchgänge',
  },
  tips: {
    early: 'Du hast öfter zu früh getippt. Warte wirklich auf das Leuchten – Raten bringt nichts, denn die Wartezeit ist jedes Mal anders.',
    guess: 'Einige Antworten waren auffallend schnell – vielleicht hast du geraten. Reagiere erst, wenn du das Leuchten wirklich siehst.',
    focus: 'Ein paar Mal hast du das Leuchten verpasst. Das passiert, wenn man müde ist. Kurze Pause, dann klappt es besser.',
    steady: 'Deine Zeiten schwanken noch. Finger locker über dem Bildschirm halten und ruhig atmen.',
    relaxed: 'Sehr gleichmäßig! Halte den Finger locker bereit – und vergleiche dich beim nächsten Mal mit dieser Zeit.',
  },
  feedback: {
    early: 'Zu früh!',
    missed: 'Verpasst',
    warmup: 'Aufwärmen',
  },
};

export const it: ExerciseTexts = {
  title: 'Reazione immediata',
  tagline: 'Il centro si illumina – tocca il più in fretta possibile.',
  steps: ['Guarda il cerchio al centro.', 'Appena si illumina di luce calda, tocca subito – ovunque.', 'Non indovinare: tocca solo quando è acceso!'],
  why:
    'Ti alleni a reagire in modo regolare a una luce di cui non puoi indovinare il momento. Se tocchi prima della luce, viene mostrata una falsa partenza. Importante: un tablet mostra un tempo un po’ troppo lungo, perché tocco e schermo richiedono tempo – spesso da 50 a 130 millisecondi. Per questo conta solo il confronto con te stesso su questo dispositivo. Non è dimostrato che questo esercizio si trasferisca al traffico o allo sport – e il gioco non dice nulla sulla tua idoneità alla guida.',
  goodFor: ['Restare attenti', 'Reagire in fretta', 'Giochi con la palla'],
  captions: {
    look: 'Guarda il cerchio al centro',
    tap: 'Si illumina! Tocca subito',
    early: 'Tocca solo quando è acceso!',
    again: 'Troppo presto – la prova ricomincia',
  },
  metrics: {
    median: 'Tempo di reazione (mediana)',
    spread: 'Dispersione',
    early: 'False partenze',
    valid: 'Prove valide',
  },
  tips: {
    early: 'Hai toccato spesso troppo presto. Aspetta davvero che si illumini – indovinare non serve, perché l’attesa è ogni volta diversa.',
    guess: 'Alcune risposte erano sorprendentemente veloci – forse hai tirato a indovinare. Reagisci solo quando vedi davvero la luce.',
    focus: 'Alcune volte hai perso la luce. Succede quando si è stanchi. Una breve pausa, poi andrà meglio.',
    steady: 'I tuoi tempi variano ancora. Tieni il dito morbido sopra lo schermo e respira con calma.',
    relaxed: 'Molto regolare! Tieni il dito pronto e rilassato – e la prossima volta confrontati con questo tempo.',
  },
  feedback: {
    early: 'Troppo presto!',
    missed: 'Mancato',
    warmup: 'Riscaldamento',
  },
};
