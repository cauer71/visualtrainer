import type { ExerciseTexts } from '../../core/types';

export const de: ExerciseTexts = {
  title: 'Ziehen & Ablegen',
  tagline: 'Zieh den Ball in den wandernden Ring.',
  steps: [
    'Setz den Finger irgendwo auf den Bildschirm.',
    'Der Ball hängt über deinem Finger – zieh ihn in den Ring.',
    'Lass los, wenn der Ball mitten im Ring ist.',
  ],
  why:
    'Wenn du am Tablet ein Foto verschiebst oder eine Spielkarte ablegst, führst du etwas mit dem Finger zu einem Ziel und lässt im richtigen Moment los. Das übst du hier: Der Ring wandert und wird mit deinem Erfolg kleiner und schneller. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Fotos verschieben', 'Karten ablegen', 'Tablet bedienen'],
  captions: {
    finger: 'Setz den Finger irgendwo auf',
    drag: 'Zieh den Ball in den Ring',
    release: 'Loslassen, wenn er drin ist',
    moving: 'Der Ring wandert – zieh mit!',
  },
  metrics: {
    level: 'Deine Stufe',
    accuracy: 'Im Ring',
    duration: 'Ø Dauer pro Durchgang',
  },
  tips: {
    slow: 'Die Zeit wurde öfter knapp. Zieh den Ball in einer flüssigen Bewegung – nicht in vielen kleinen Etappen.',
    aim: 'Du lässt oft neben dem Ring los. Denk daran: Der Ball sitzt über deinem Finger – er muss in den Ring, nicht dein Finger.',
    great: 'Stark! Du führst den Ball sicher ins Ziel. Bleib locker – dann klappt es auch bei mehr Tempo.',
  },
  feedback: {
    level: 'Stufe',
    hit: 'Drin!',
    miss: 'Daneben',
    late: 'Zu spät',
    hint: 'Zieh den Ball – nur tippen reicht nicht',
  },
};

export const it: ExerciseTexts = {
  title: 'Trascina e rilascia',
  tagline: 'Trascina la palla nell’anello che si sposta.',
  steps: [
    'Appoggia il dito dove vuoi sullo schermo.',
    'La palla sta sopra il tuo dito – trascinala nell’anello.',
    'Rilascia quando la palla è in mezzo all’anello.',
  ],
  why:
    'Quando sul tablet sposti una foto o posi una carta da gioco, guidi qualcosa con il dito verso una meta e lo rilasci al momento giusto. Qui lo eserciti: l’anello si sposta e, con il tuo successo, diventa più piccolo e più veloce. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Spostare foto', 'Posare carte', 'Usare il tablet'],
  captions: {
    finger: 'Appoggia il dito dove vuoi',
    drag: 'Trascina la palla nell’anello',
    release: 'Rilascia quando è dentro',
    moving: 'L’anello si sposta – seguilo!',
  },
  metrics: {
    level: 'Il tuo livello',
    accuracy: 'Nell’anello',
    duration: 'Durata media per turno',
  },
  tips: {
    slow: 'Il tempo è stato spesso stretto. Trascina la palla con un movimento fluido – non a piccole tappe.',
    aim: 'Rilasci spesso accanto all’anello. Ricorda: la palla sta sopra il dito – è lei che deve finire nell’anello, non il dito.',
    great: 'Ottimo! Porti la palla a destinazione con sicurezza. Resta rilassato – così ce la fai anche a velocità più alte.',
  },
  feedback: {
    level: 'Livello',
    hit: 'Dentro!',
    miss: 'Fuori',
    late: 'Troppo tardi',
    hint: 'Trascina la palla – non basta toccare',
  },
};
