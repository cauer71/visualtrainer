import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Zeichen-Code',
  tagline: 'Knacke den Code – übersetze Zeichen blitzschnell in Zahlen.',
  steps: ['Oben im Schlüssel steht zu jedem Zeichen eine Zahl.', 'Tippe die Zahl zum Zeichen in der Mitte.', 'Der Schlüssel wird jedes Mal neu gemischt.'],
  why:
    'Nachschauen, zuordnen, tippen – die Übung beruht auf einer bekannten Aufgabe aus der Forschung zum Arbeitstempo. Mit etwas Übung wirst du hier schneller; nach einigen Sitzungen flacht der Fortschritt ab – das ist normal. Dass sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Fahrpläne & Legenden', 'Bedienfelder', 'Zügig zuordnen'],
  captions: {
    look: 'Wo steht das Zeichen oben?',
    tap: 'Die Zahl darunter antippen!',
    fast: 'Weiter – so schnell du kannst',
    shuffle: 'Jedes Mal ein neuer Schlüssel',
  },
  metrics: {
    perMin: 'Richtige pro Minute',
    accuracy: 'Treffsicherheit',
    medianTime: 'Zeit pro Zeichen',
    correct: 'Richtige',
    level: 'Stufe',
  },
  tips: {
    careful: 'Lieber einmal mehr in den Schlüssel schauen als falsch tippen – Sicherheit geht vor.',
    learn: 'Präg dir nebenbei ein paar Paare ein – dann musst du seltener nach oben schauen.',
    up: 'Stark! Nächstes Mal startest du gleich mit mehr Zeichen.',
    great: 'Sicher und flott! Nach einigen Sitzungen pendelt sich dein Tempo ein – das ist normal.',
  },
  feedback: {
    level: 'Stufe',
    signs: 'Zeichen',
    newKey: 'Neuer Schlüssel!',
    hint: 'Schau oben im Schlüssel nach',
  },
};

export const it: ExerciseTexts = {
  title: 'Codice segreto',
  tagline: 'Decifra il codice – trasforma i simboli in numeri in un lampo.',
  steps: ['In alto, la chiave: a ogni simbolo corrisponde un numero.', 'Tocca il numero del simbolo al centro.', 'La chiave viene rimescolata ogni volta.'],
  why:
    'Guardare, abbinare, toccare – l’esercizio si basa su un compito noto della ricerca sulla velocità di lavoro. Con un po’ di pratica qui diventi più veloce; dopo alcune sessioni i progressi rallentano – è normale. Che questo si trasferisca alla vita di tutti i giorni non è dimostrato.',
  goodFor: ['Orari e legende', 'Pannelli di comando', 'Abbinare in fretta'],
  captions: {
    look: 'Dov’è il simbolo, in alto?',
    tap: 'Tocca il numero sotto!',
    fast: 'Avanti – più veloce che puoi',
    shuffle: 'Ogni volta una chiave nuova',
  },
  metrics: {
    perMin: 'Giuste al minuto',
    accuracy: 'Precisione',
    medianTime: 'Tempo per simbolo',
    correct: 'Giuste',
    level: 'Livello',
  },
  tips: {
    careful: 'Meglio guardare la chiave una volta in più che sbagliare – prima la sicurezza.',
    learn: 'Memorizza qualche coppia strada facendo – così guardi in alto meno spesso.',
    up: 'Forte! La prossima volta parti subito con più simboli.',
    great: 'Sicuro e veloce! Dopo alcune sessioni il tuo ritmo si stabilizza – è normale.',
  },
  feedback: {
    level: 'Livello',
    signs: 'simboli',
    newKey: 'Nuova chiave!',
    hint: 'Guarda la chiave in alto',
  },
};
