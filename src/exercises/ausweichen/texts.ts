import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen, kein Kampf- oder Schuss-Vokabular.

export const de: ExerciseTexts = {
  title: 'Ausweichen',
  tagline: 'Führ die Figur sanft an langsamen Hindernissen vorbei.',
  steps: [
    'Setz den Finger unter die Figur und zieh sie durchs Feld.',
    'Kugeln und Quader gleiten langsam herein – weich ihnen aus.',
    'Eine Berührung ist nur eine kurze Pause, dann geht es weiter.',
  ],
  why:
    'Im Alltag schätzt du ständig, wohin sich etwas bewegt, und gehst rechtzeitig zur Seite: in der Menschenmenge, beim Ballspiel, auf dem Gehweg. Hier gleiten die Hindernisse gerade und gleichmäßig, sodass du ihren Weg vorausdenken kannst. Die Figur sitzt über deinem Finger, damit die Hand nichts verdeckt. Wohin dein Blick dabei geht, wird nicht gemessen, und ob sich das auf Alltag oder Sport überträgt, ist nicht belegt.',
  goodFor: ['Bewegungen vorausdenken', 'Ausweichen', 'Tablet genau bedienen'],
  captions: {
    place: 'Setz den Finger unter die Figur',
    dodge: 'Weich den Hindernissen aus',
    calm: 'Berührt? Nur kurz Pause – weiter',
  },
  metrics: {
    level: 'Deine Stufe',
    touches: 'Berührungen',
    survive: 'Zeit ohne Berührung',
    maxLevel: 'Höchste Stufe',
  },
  tips: {
    early: 'Es gab viele Berührungen. Schau auf die Flugrichtung der Hindernisse und geh früh und ruhig zur Seite – kleine Schritte reichen.',
    calm: 'Manchmal wurde es knapp. Bleib in der Mitte des Felds, dann hast du nach allen Seiten Platz.',
    great: 'Stark! Du liest die Bahnen der Hindernisse gut voraus. Beim nächsten Mal startest du etwas höher.',
  },
  feedback: {
    level: 'Stufe',
    hint: 'Setz den Finger unter die Figur',
    grab: 'Finger hierher',
    resume: 'Finger wieder hierher',
    touch: 'Berührt – kurze Pause',
  },
};

export const it: ExerciseTexts = {
  title: 'Schivare',
  tagline: 'Guida la figura con dolcezza oltre ostacoli lenti.',
  steps: [
    'Dito sotto la figura: trascinala nel campo.',
    'Sfere e blocchi scivolano piano – scansali con morbidezza.',
    'Un contatto è solo una breve pausa, poi si riparte.',
  ],
  why:
    'Nella vita di tutti i giorni stimi di continuo dove andrà qualcosa e ti sposti in tempo: tra la folla, giocando a palla, sul marciapiede. Qui gli ostacoli scivolano dritti e regolari, così puoi prevederne il percorso. La figura sta sopra il dito, così la mano non copre nulla. Dove guardi con gli occhi non viene misurato, e non è dimostrato che questo si trasferisca alla vita quotidiana o allo sport.',
  goodFor: ['Prevedere i movimenti', 'Schivare', 'Usare il tablet con precisione'],
  captions: {
    place: 'Appoggia il dito sotto la figura',
    dodge: 'Scansa gli ostacoli',
    calm: 'Contatto? Solo una breve pausa – si riparte',
  },
  metrics: {
    level: 'Il tuo livello',
    touches: 'Contatti',
    survive: 'Tempo senza contatto',
    maxLevel: 'Livello più alto',
  },
  tips: {
    early: 'Ci sono stati molti contatti. Guarda la direzione degli ostacoli e spostati presto e con calma – bastano piccoli passi.',
    calm: 'A volte è stato un po’ stretto. Resta al centro del campo, così hai spazio da tutti i lati.',
    great: 'Ottimo! Prevedi bene il percorso degli ostacoli. La prossima volta parti un po’ più in alto.',
  },
  feedback: {
    level: 'Livello',
    hint: 'Appoggia il dito sotto la figura',
    grab: 'Dito qui',
    resume: 'Dito di nuovo qui',
    touch: 'Contatto – breve pausa',
  },
};
