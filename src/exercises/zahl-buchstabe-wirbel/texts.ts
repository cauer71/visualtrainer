import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zahlen-Buchstaben-Wirbel',
  tagline: 'Tippe Zahlen und Buchstaben abwechselnd an – auch wenn sie kreisen.',
  steps: [
    'Tippe abwechselnd: 1 – A – 2 – B – 3 – C …',
    'Die Zeichen drehen sich um versetzte Mittelpunkte.',
    'Oben steht, was als Nächstes kommt.',
  ],
  why:
    'Wer abwechselnd Zahlen und Buchstaben sucht, muss im Kopf zwischen zwei Reihen hin- und herspringen und dabei die Übersicht behalten. Die Aufgabe ist an die bekannte Zahlen-Buchstaben-Verbindungsaufgabe (Trail Making B) angelehnt, hier aber mit bewegten, teils überlappenden Zeichen – diese Fassung ist nicht eigens untersucht. Mit Übung wirst du hier schneller; dass sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Mehrere Dinge im Blick', 'Zwischen Reihen wechseln', 'Ruhig suchen'],
  captions: {
    drift: 'Sie drehen um versetzte Mittelpunkte',
    alt: 'Tippe abwechselnd: 1 – A – 2 – B – 3 …',
    next: 'Oben steht, was als Nächstes kommt',
    kept: 'Getippte bleiben sichtbar, nur blasser',
    overlap: 'Sie dürfen sich überlappen',
  },
  metrics: {
    level: 'Erreichte Stufe',
    perChar: 'Zeit pro Zeichen',
    errors: 'Fehltipps',
    pairs: 'Paare in der letzten Runde',
    letterGap: 'Mehrzeit für Buchstaben',
  },
  tips: {
    errors: 'Erst finden, dann tippen – ein kurzer Blick mehr spart Fehltipps.',
    letters: 'Buchstaben brauchen bei dir etwas länger. Leise mitsprechen hilft: „eins – A – zwei – B …“.',
    slow: 'Such mit System, zum Beispiel von links nach rechts – die Augen dürfen dabei frei wandern.',
    great: 'Flott gewirbelt! Beim nächsten Mal sind es mehr Zeichen, und ihre Mittelpunkte liegen weiter auseinander.',
  },
  feedback: {
    next: 'Als Nächstes:',
    level: 'Stufe',
    up: 'Nächste Stufe!',
    done: 'Geschafft!',
    perChar: 'je Zeichen',
  },
};

export const it: ExerciseTexts = {
  title: 'Vortice alfanumerico',
  tagline: 'Tocca numeri e lettere in alternanza – anche mentre ruotano.',
  steps: [
    'Tocca in alternanza: 1 – A – 2 – B – 3 – C …',
    'I simboli ruotano attorno a centri sfalsati.',
    'In alto vedi cosa viene dopo.',
  ],
  why:
    'Chi cerca alternando numeri e lettere deve saltare con la mente tra due serie e non perdere il filo. Il compito si ispira al noto compito di collegamento di numeri e lettere (Trail Making B), qui però con simboli in movimento e in parte sovrapposti – questa versione non è stata studiata in modo specifico. Con la pratica qui diventi più veloce; che questo si trasferisca alla vita di tutti i giorni non è dimostrato.',
  goodFor: ['Più cose sott’occhio', 'Passare da una serie all’altra', 'Cercare con calma'],
  captions: {
    drift: 'Ruotano attorno a centri sfalsati',
    alt: 'Alterna: 1 – A – 2 – B – 3 …',
    next: 'In alto vedi cosa viene dopo',
    kept: 'Quelli toccati restano, più chiari',
    overlap: 'Possono sovrapporsi',
  },
  metrics: {
    level: 'Livello raggiunto',
    perChar: 'Tempo per simbolo',
    errors: 'Tocchi sbagliati',
    pairs: 'Coppie nell’ultimo turno',
    letterGap: 'Tempo in più per le lettere',
  },
  tips: {
    errors: 'Prima trova, poi tocca – uno sguardo in più ti evita errori.',
    letters: 'Per le lettere ti serve un po’ più di tempo. Aiuta ripetere a bassa voce: «uno – A – due – B …».',
    slow: 'Cerca con metodo, per esempio da sinistra a destra – gli occhi possono muoversi liberamente.',
    great: 'Bel giro! La prossima volta i simboli saranno di più e i loro centri più distanti.',
  },
  feedback: {
    next: 'Prossimo:',
    level: 'Livello',
    up: 'Livello successivo!',
    done: 'Fatto!',
    perChar: 'per simbolo',
  },
};
