import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zahlenjagd',
  tagline: 'Finde die Zahlen der Reihe nach – so schnell du kannst.',
  steps: ['Tippe die Zahlen der Reihe nach an: 1, 2, 3 …', 'Deine Augen dürfen frei über das Feld wandern.', 'Später abwechselnd: 1 – A – 2 – B – 3 …'],
  why:
    'Bei der Zahlenjagd suchst du Zahlen der Reihe nach – so übst du geordnetes Suchen und Tempo, ähnlich wie beim Blick auf einen Fahrplan oder ein Formular. Mit Übung wirst du hier schneller. Dass sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Fahrpläne', 'Formulare', 'Geordnet suchen'],
  captions: {
    order: 'Tippe 1, 2, 3 … der Reihe nach',
    eyes: 'Die Augen dürfen frei wandern',
    alt: 'Später: 1 – A – 2 – B – 3 …',
  },
  metrics: {
    level: 'Erreichte Stufe',
    perItem: 'Zeit pro Zahl',
    boards: 'Tafeln geschafft',
    errors: 'Fehltipps',
  },
  tips: {
    errors: 'Erst finden, dann tippen – ein kurzer Blick mehr spart Fehltipps.',
    alt: 'Beim Wechselpfad hilft leises Mitsprechen: „1 – A – 2 – B …“.',
    system: 'Such mit System, zum Beispiel Reihe für Reihe – die Augen dürfen dabei frei wandern.',
    great: 'Flott gejagt! Beim nächsten Mal wird die Tafel größer oder kniffliger.',
  },
  feedback: {
    next: 'Nächste:',
    level: 'Stufe',
    up: 'Nächste Stufe!',
    done: 'Geschafft!',
    pro: 'Profi',
    proHint: 'Profi: Merk dir selbst, wo du bist',
  },
};

export const it: ExerciseTexts = {
  title: 'Caccia ai numeri',
  tagline: 'Trova i numeri in ordine – il più in fretta possibile.',
  steps: ['Tocca i numeri in ordine: 1, 2, 3 …', 'I tuoi occhi possono muoversi liberamente sul campo.', 'Più avanti alternando: 1 – A – 2 – B – 3 …'],
  why:
    'Nella caccia ai numeri cerchi i numeri in ordine – così alleni la ricerca ordinata e la rapidità, come quando consulti un orario o un modulo. Con la pratica qui diventi più veloce. Che questo si trasferisca alla vita di tutti i giorni non è dimostrato.',
  goodFor: ['Orari', 'Moduli', 'Cercare con ordine'],
  captions: {
    order: 'Tocca 1, 2, 3 … in ordine',
    eyes: 'Gli occhi possono muoversi liberi',
    alt: 'Poi: 1 – A – 2 – B – 3 …',
  },
  metrics: {
    level: 'Livello raggiunto',
    perItem: 'Tempo per numero',
    boards: 'Tabelle completate',
    errors: 'Tocchi sbagliati',
  },
  tips: {
    errors: 'Prima trova, poi tocca – uno sguardo in più ti evita errori.',
    alt: 'Nel percorso alternato aiuta ripetere a bassa voce: «1 – A – 2 – B …».',
    system: 'Cerca con metodo, per esempio riga per riga – gli occhi possono muoversi liberamente.',
    great: 'Ottima caccia! La prossima volta la tabella sarà più grande o più insidiosa.',
  },
  feedback: {
    next: 'Prossimo:',
    level: 'Livello',
    up: 'Livello successivo!',
    done: 'Fatto!',
    pro: 'Esperto',
    proHint: 'Esperto: ricorda tu dove sei arrivato',
  },
};
