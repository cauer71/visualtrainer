import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Aussagen über Zittern oder Gesundheit.

export const de: ExerciseTexts = {
  title: 'Ruhige Hand',
  tagline: 'Führ den Ball durch die schmale Bahn, ohne die Wand zu berühren.',
  steps: [
    'Setz den Finger unter den Ball und zieh ihn durch die Bahn.',
    'Die Wand nicht berühren – lieber langsam als hastig.',
    'Bei Händezittern oder Beschwerden: lieber pausieren.',
  ],
  why:
    'Wenn du am Tablet eine Linie nachziehst oder etwas Schmales entlangführst, bewegst du die Hand langsam und genau. Das übst du hier: Die Bahn wird mit deinem Erfolg enger und kurviger. Der Ball sitzt über deinem Finger, damit die Hand nichts verdeckt. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Linien nachziehen', 'Tablet genau bedienen', 'Ruhig arbeiten'],
  captions: {
    place: 'Setz den Finger unter den Ball',
    guide: 'Führ den Ball durch die Bahn',
    wall: 'Die Wand nicht berühren',
    goal: 'Im Ziel – geschafft',
  },
  metrics: {
    level: 'Deine Stufe',
    touches: 'Berührungen der Wand',
    onPath: 'Zeit auf der Bahn',
    clean: 'Saubere Durchgänge',
  },
  tips: {
    slow: 'Die Wand wurde öfter berührt. Probier es langsamer und schau ein Stück voraus auf die Bahn.',
    steady: 'Du liegst oft an der Wand. Such dir eine bequeme Haltung, zum Beispiel mit aufgestütztem Unterarm.',
    great: 'Stark geführt! Bleib locker – dann klappt es auch in engeren Bahnen.',
  },
  feedback: {
    level: 'Stufe',
    hint: 'Setz den Finger unter den Ball',
    grab: 'Finger hierher',
    resume: 'Finger wieder hierher',
    clean: 'Sauber!',
    done: 'Geschafft',
  },
};

export const it: ExerciseTexts = {
  title: 'Mano ferma',
  tagline: 'Guida la palla lungo il percorso stretto senza toccare la parete.',
  steps: [
    'Appoggia il dito sotto la palla e trascinala lungo il percorso.',
    'Non toccare la parete – meglio piano che in fretta.',
    'In caso di tremore alle mani o disturbi: meglio fare una pausa.',
  ],
  why:
    'Quando sul tablet ripassi una linea o segui qualcosa di stretto, muovi la mano piano e con precisione. Qui lo eserciti: con il tuo successo il percorso diventa più stretto e più tortuoso. La palla sta sopra il dito, così la mano non copre nulla. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Ripassare linee', 'Usare il tablet con precisione', 'Lavorare con calma'],
  captions: {
    place: 'Appoggia il dito sotto la palla',
    guide: 'Guida la palla lungo il percorso',
    wall: 'Non toccare la parete',
    goal: 'Arrivato – fatto',
  },
  metrics: {
    level: 'Il tuo livello',
    touches: 'Contatti con la parete',
    onPath: 'Tempo sul percorso',
    clean: 'Turni puliti',
  },
  tips: {
    slow: 'Hai toccato spesso la parete. Prova più piano e guarda un pezzo in avanti sul percorso.',
    steady: 'Stai spesso contro la parete. Cerca una posizione comoda, per esempio con l’avambraccio appoggiato.',
    great: 'Ben guidato! Resta rilassato – così ce la fai anche in percorsi più stretti.',
  },
  feedback: {
    level: 'Livello',
    hint: 'Appoggia il dito sotto la palla',
    grab: 'Dito qui',
    resume: 'Dito di nuovo qui',
    clean: 'Pulito!',
    done: 'Fatto',
  },
};
