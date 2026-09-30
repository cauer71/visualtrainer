import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen. Es ist eine Touch-Übung am Bildschirm, keine Körperübung.

export const de: ExerciseTexts = {
  title: 'Diagonal-Korridor',
  tagline: 'Zieh die Kugel durch einen schmalen, schrägen Gang – ohne die Wand zu berühren.',
  steps: [
    'Setz den Finger unter die Kugel. Sie sitzt etwas darüber.',
    'Zieh sie von Ecke zu Ecke mitten durch den Gang.',
    'An der Wand gleitet sie entlang. Am Ziel bist du fertig.',
  ],
  why:
    'Bei dieser Übung ziehst du einen Finger über den Bildschirm; Körper und Hirnhälften werden dabei nicht „gekreuzt“ oder trainiert. Du führst eine Marke über eine lange, gerade Strecke durch einen engen Gang. Je schmaler der Gang, desto langsamer und genauer musst du ziehen. Dauer und Gleichmäßigkeit werden mitgeschrieben, aber Tempo bringt keine Punkte. Die Übung ersetzt weder Brille noch Augenuntersuchung. Ein Nutzen für den Alltag ist nicht belegt.',
  goodFor: ['Ruhig ziehen', 'Finger und Blick abstimmen', 'Gleichmäßig bleiben'],
  captions: {
    place: 'Setz den Finger unter die Kugel',
    guide: 'Zieh sie durch den schrägen Gang',
    wall: 'Die Wand möglichst nicht berühren',
    goal: 'Am Ziel ist der Durchgang geschafft',
  },
  metrics: {
    level: 'Stufe',
    touches: 'Berührungen der Wand',
    duration: 'Dauer pro Gang',
    evenness: 'Gleichmäßigkeit',
    clean: 'Saubere Gänge',
  },
  tips: {
    slow: 'Zieh etwas langsamer und schau auf den Gang, nicht auf den Finger.',
    steady: 'Bleib in der Mitte des Gangs. Kleine, ruhige Bewegungen helfen.',
    even: 'Versuch, gleichmäßig zu ziehen, ohne zu stoppen und wieder loszurennen.',
    great: 'Sauber gezogen! Beim nächsten Mal wird der Gang etwas schmaler und länger.',
  },
  feedback: {
    level: 'Stufe',
    grab: 'Hier aufsetzen',
    resume: 'Hier weiter',
    hint: 'Setz den Finger unter die Kugel',
    clean: 'Sauber durch den Gang',
    done: 'Geschafft',
  },
};

export const it: ExerciseTexts = {
  title: 'Corridoio diagonale',
  tagline: 'Trascina la pallina in uno stretto corridoio obliquo – senza toccare la parete.',
  steps: [
    'Appoggia il dito sotto la pallina: sta un po’ più in alto.',
    'Trascinala da un angolo all’altro, al centro del corridoio.',
    'Alla parete scivola lungo il bordo. All’arrivo hai finito.',
  ],
  why:
    'In questo esercizio trascini un dito sullo schermo; corpo ed emisferi cerebrali non vengono «incrociati» né allenati. Guidi un segno lungo un tragitto lungo e dritto in uno stretto corridoio. Più il corridoio è stretto, più lentamente e con precisione devi trascinare. Durata e regolarità vengono annotate, ma la velocità non dà punti. L’esercizio non sostituisce né gli occhiali né una visita oculistica. Un beneficio per la vita di tutti i giorni non è dimostrato.',
  goodFor: ['Trascinare con calma', 'Coordinare dito e sguardo', 'Restare regolari'],
  captions: {
    place: 'Appoggia il dito sotto la pallina',
    guide: 'Trascinala nel corridoio obliquo',
    wall: 'Cerca di non toccare la parete',
    goal: 'All’arrivo il passaggio è fatto',
  },
  metrics: {
    level: 'Livello',
    touches: 'Contatti con la parete',
    duration: 'Durata per corridoio',
    evenness: 'Regolarità',
    clean: 'Corridoi puliti',
  },
  tips: {
    slow: 'Trascina un po’ più piano e guarda il corridoio, non il dito.',
    steady: 'Resta al centro del corridoio. Movimenti piccoli e calmi aiutano.',
    even: 'Prova a trascinare in modo regolare, senza fermarti e ripartire di scatto.',
    great: 'Tracciato pulito! La prossima volta il corridoio sarà un po’ più stretto e lungo.',
  },
  feedback: {
    level: 'Livello',
    grab: 'Appoggia qui',
    resume: 'Riprendi qui',
    hint: 'Appoggia il dito sotto la pallina',
    clean: 'Corridoio pulito',
    done: 'Fatto',
  },
};
