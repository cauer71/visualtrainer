import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Dunkelphasen',
  tagline: 'Die Kugel blendet weich aus – rechne damit, wo sie wieder auftaucht.',
  steps: [
    'Folge der Kugel, auch wenn sie weich verschwindet.',
    'Sie läuft unsichtbar weiter, dann zeigt sie ein „C“.',
    'Tippe unten, wohin die Öffnung zeigt.',
  ],
  why:
    'Im Alltag verschwindet Bewegtes oft kurz: hinter einem Pfosten, einem Baum, einer Hand. Hier blendet die Kugel weich aus, läuft unsichtbar weiter und taucht wieder auf – du musst ahnen, wo sie ist. Anders als beim blinkenden Original gibt es kein Flackern: Sie blendet mindestens 0,2 Sekunden lang sanft aus und wieder ein, und es gibt höchstens alle 2 Sekunden eine Dunkelphase. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ob dein Blick wirklich mitgeht, wird nicht gemessen, und ob sich die Übung auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Verdecktes Bewegtes vorausahnen', 'Den Faden nicht verlieren', 'Ruhig bleiben, wenn etwas kurz fehlt'],
  captions: {
    follow: 'Folge der Kugel – auch im Dunkeln',
    dark: 'Sie läuft unsichtbar weiter',
    where: 'Wohin zeigt die Öffnung?',
  },
  metrics: {
    level: 'Dunkel-Stufe',
    accuracy: 'Treffsicherheit',
    maxLevel: 'Höchste Stufe',
    correct: 'Richtig erkannt',
  },
  tips: {
    eyes: 'Geh im Kopf mit, wenn die Kugel verschwindet: gleiche Richtung, gleiches Tempo. Halte den Kopf möglichst ruhig.',
    decide: 'Lieber schnell entscheiden – der erste Eindruck stimmt oft.',
    great: 'Sehr gut! Du erkennst das Zeichen auch nach längerer Dunkelheit. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    late: 'Zu spät',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Fasi di buio',
  tagline: 'La sfera sfuma piano – calcola dove riappare.',
  steps: [
    'Segui la sfera, anche quando sparisce piano.',
    'Corre invisibile, poi mostra una «C».',
    'Tocca in basso dove punta l’apertura.',
  ],
  why:
    'Nella vita di tutti i giorni ciò che si muove sparisce spesso per un attimo: dietro un palo, un albero, una mano. Qui la sfera sfuma piano, corre invisibile e riappare – devi intuire dove si trova. A differenza dell’originale lampeggiante non c’è nessun sfarfallio: sfuma piano e ricompare in almeno 0,2 secondi, e c’è al massimo una fase di buio ogni 2 secondi. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Non viene misurato se il tuo sguardo la segue davvero, e non è dimostrato che l’esercizio si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Prevedere ciò che è nascosto', 'Non perdere il filo', 'Restare calmi quando qualcosa manca per un attimo'],
  captions: {
    follow: 'Segui la sfera – anche al buio',
    dark: 'Corre invisibile',
    where: 'Dove punta l’apertura?',
  },
  metrics: {
    level: 'Livello di buio',
    accuracy: 'Precisione',
    maxLevel: 'Livello massimo',
    correct: 'Riconosciuti',
  },
  tips: {
    eyes: 'Vai avanti con la mente quando la sfera sparisce: stessa direzione, stessa velocità. Tieni la testa il più ferma possibile.',
    decide: 'Meglio decidere in fretta – spesso la prima impressione è quella giusta.',
    great: 'Molto bene! Riconosci il segno anche dopo un buio più lungo. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    late: 'Troppo tardi',
    level: 'Livello',
  },
};
