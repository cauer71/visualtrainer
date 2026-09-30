import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Ehrlich: kein Schnelllese-Training, kein Lesetest.

export const de: ExerciseTexts = {
  title: 'Wortstrom',
  tagline: 'Erkenne dein Zielwort im ruhigen Wortstrom.',
  steps: [
    'Merke dir das Zielwort, das vorher genannt wird.',
    'Dann laufen Wörter einzeln in der Mitte vorbei.',
    'Tippe, sobald dein Zielwort erscheint.',
  ],
  why:
    'Hier erkennst du ein bekanntes Wort in einer Folge einzelner Wörter wieder – das ist kein Lesetraining. Die Wörter erscheinen bewusst nicht blitzschnell, sondern so, dass du sie in Ruhe lesen kannst. Versprechen, mit Wort-für-Wort-Anzeige schneller zu lesen, sind nicht belegt (Rayner et al. 2016); die Übung misst weder dein Leseverständnis noch dein Lesetempo. Blinzle zwischendurch ruhig. Ob sich das auf Lesen oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Wörter wiedererkennen', 'Ruhig bei der Sache bleiben', 'Aufmerksam bleiben'],
  captions: {
    target: 'Dein Zielwort steht vorab da',
    stream: 'Dann laufen Wörter einzeln vorbei',
    tap: 'Da ist es – jetzt tippen!',
  },
  metrics: {
    level: 'Stufe',
    hits: 'Zielwörter gefunden',
    falseAlarms: 'Zu viel getippt',
    median: 'Zeit bis zum Tipp (Median)',
    showMs: 'Anzeigedauer je Wort',
  },
  tips: {
    alarm: 'Du tippst öfter, obwohl es nicht das Zielwort war. Lies jedes Wort kurz, bevor du tippst.',
    missed: 'Einige Zielwörter sind dir entgangen. Halte den Blick ruhig in der Mitte und den Finger bereit.',
    great: 'Stark! Du erkennst dein Zielwort sicher. Blinzle zwischendurch – dann bleibt es entspannt.',
  },
  feedback: {
    level: 'Stufe',
    found: 'Gefunden',
    notFound: 'Nicht getippt',
    target: 'Zielwort',
    announce: 'Dein Zielwort',
    announceHint: 'Tippe, sobald es erscheint',
    tapHere: 'Da ist es!',
  },
};

export const it: ExerciseTexts = {
  title: 'Flusso di parole',
  tagline: 'Riconosci la tua parola bersaglio nel tranquillo flusso di parole.',
  steps: [
    'Ricorda la parola bersaglio annunciata prima.',
    'Poi le parole scorrono una alla volta al centro.',
    'Tocca non appena compare la tua parola bersaglio.',
  ],
  why:
    'Qui riconosci una parola nota in una sequenza di parole singole – non è un allenamento alla lettura. Le parole non compaiono di proposito in un lampo, ma in modo che tu possa leggerle con calma. Le promesse di leggere più in fretta con la visualizzazione parola per parola non sono dimostrate (Rayner et al. 2016); l’esercizio non misura né la tua comprensione del testo né la tua velocità di lettura. Ogni tanto batti le palpebre con calma. Non è dimostrato che questo si trasferisca alla lettura o alla vita di tutti i giorni.',
  goodFor: ['Riconoscere parole', 'Restare concentrati con calma', 'Restare attenti'],
  captions: {
    target: 'La parola bersaglio è annunciata prima',
    stream: 'Poi scorrono le parole una a una',
    tap: 'Eccola – tocca adesso!',
  },
  metrics: {
    level: 'Livello',
    hits: 'Parole bersaglio trovate',
    falseAlarms: 'Toccato troppo',
    median: 'Tempo fino al tocco (mediana)',
    showMs: 'Durata di visualizzazione per parola',
  },
  tips: {
    alarm: 'Tocchi spesso anche se non era la parola bersaglio. Leggi ogni parola un attimo prima di toccare.',
    missed: 'Alcune parole bersaglio ti sono sfuggite. Tieni lo sguardo fermo al centro e il dito pronto.',
    great: 'Ottimo! Riconosci con sicurezza la tua parola bersaglio. Ogni tanto batti le palpebre – così resti rilassato.',
  },
  feedback: {
    level: 'Livello',
    found: 'Trovata',
    notFound: 'Non toccato',
    target: 'Parola bersaglio',
    announce: 'La tua parola bersaglio',
    announceHint: 'Tocca non appena compare',
    tapHere: 'Eccola!',
  },
};
