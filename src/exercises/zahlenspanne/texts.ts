import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/uebungskatalog/uebungen/602-digit-span.md, Abschnitt 8): nur beschreiben, was man in der
// Übung tut – kein Test, keine Norm (keine Einstufung, kein IQ), kein Vergleich mit anderen, keine Alltagsversprechen.

export const de: ExerciseTexts = {
  title: 'Zahlenspanne',
  tagline: 'Merk dir Ziffern der Reihe nach und tipp sie danach ein.',
  steps: ['Schau zu, wie die Ziffern einzeln erscheinen.', 'Tippe sie danach auf dem Zahlenfeld ein.', 'Klappt es, kommt eine Ziffer dazu. Später auch rückwärts.'],
  why:
    'Bei der Zahlenspanne übst du, dir eine Ziffernfolge kurz zu merken und sie danach einzugeben. Viele sagen sich die Ziffern leise vor oder bilden kleine Gruppen wie bei einer Telefonnummer – probier es aus. In dieser Aufgabe wirst du mit Übung besser. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Ziffern merken', 'In Ruhe konzentrieren', 'Merkstrategien ausprobieren'],
  captions: {
    watch: 'Merk dir die Ziffern der Reihe nach',
    repeat: 'Tippe sie in derselben Reihenfolge ein',
    longer: 'Klappt es, kommt eine Ziffer dazu',
  },
  metrics: {
    span: 'Längste richtige Folge (Ziffern)',
    correct: 'Richtige Folgen',
    matched: 'Richtig erinnerte Ziffern',
    backSpan: 'Längste Folge rückwärts',
  },
  tips: {
    great: 'Alles richtig! Beim nächsten Mal wird die Folge etwas länger.',
    group: 'Die Ziffern waren richtig, nur die Reihenfolge nicht. Gruppen helfen: zum Beispiel „47 – 2“ statt „4 – 7 – 2“.',
    say: 'Viele finden es hilfreich, die Ziffern beim Zuschauen leise mitzusprechen.',
    back: 'Rückwärts: Sag dir die Folge in Gedanken von hinten nach vorn vor, bevor du tippst.',
  },
  feedback: {
    round: 'Runde',
    watch: 'Merk dir die Ziffern',
    watchBack: 'Merk dir die Ziffern – dann rückwärts',
    inputFwd: 'Tippe sie vorwärts ein',
    inputBack: 'Tippe sie rückwärts ein',
    right: '✓ Richtig!',
    wrong: '✗ Nicht ganz',
    answer: 'Richtig wäre:',
  },
};

export const it: ExerciseTexts = {
  title: 'Serie di cifre',
  tagline: 'Ricorda le cifre in ordine e inseriscile dopo.',
  steps: ['Guarda come compaiono le cifre una alla volta.', 'Poi inseriscile sul tastierino numerico.', 'Se ci riesci, si aggiunge una cifra – poi al contrario.'],
  why:
    'Nella serie di cifre alleni a ricordare per breve tempo una sequenza di numeri e a inserirla subito dopo. Molti si ripetono le cifre a bassa voce oppure formano piccoli gruppi, come in un numero di telefono – prova anche tu. In questo compito con la pratica migliori. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare cifre', 'Concentrarsi con calma', 'Provare strategie di memoria'],
  captions: {
    watch: 'Ricorda le cifre in ordine',
    repeat: 'Inseriscile nello stesso ordine',
    longer: 'Se ci riesci, si aggiunge una cifra',
  },
  metrics: {
    span: 'Serie più lunga corretta (cifre)',
    correct: 'Serie corrette',
    matched: 'Cifre ricordate correttamente',
    backSpan: 'Serie più lunga al contrario',
  },
  tips: {
    great: 'Tutto giusto! La prossima volta la serie sarà un po’ più lunga.',
    group: 'Le cifre erano giuste, solo l’ordine no. I gruppi aiutano: per esempio «47 – 2» invece di «4 – 7 – 2».',
    say: 'Molti trovano utile ripetere le cifre a bassa voce mentre guardano.',
    back: 'Al contrario: ripeti mentalmente la serie dalla fine all’inizio prima di inserire.',
  },
  feedback: {
    round: 'Turno',
    watch: 'Ricorda le cifre',
    watchBack: 'Ricorda le cifre – poi al contrario',
    inputFwd: 'Inseriscile in avanti',
    inputBack: 'Inseriscile al contrario',
    right: '✓ Giusto!',
    wrong: '✗ Non proprio',
    answer: 'Giusto sarebbe:',
  },
};
