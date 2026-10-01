import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, keine Diagnose, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.
// Links-Rechts-Unsicherheit kommt auch bei Gesunden vor – die Übung sagt nichts über Gesundheit oder Krankheit.

export const de: ExerciseTexts = {
  title: 'Welche Seite?',
  tagline: 'Links oder rechts? Erkenne die Seite von Hand, Fuß und Unterarm.',
  steps: [
    'Im Kreis erscheint eine Hand, ein Fuß oder ein Unterarm.',
    'Tippe LINKS oder RECHTS – je nachdem, welche Seite es ist.',
    'Gedreht ist erlaubt – die Seite bleibt dabei gleich.',
  ],
  why:
    'Ob eine Hand oder ein Fuß links oder rechts ist, sieht man nicht immer sofort – vor allem, wenn das Bild gedreht ist. Viele Menschen stellen sich dazu die eigene Hand oder den eigenen Fuß in der gezeigten Lage vor; je weiter das Bild gedreht ist, desto länger dauert es meist. Das ist normal und sagt nichts über dich. Hilfreich kann sein, sich die eigene Hand in diese Lage zu denken – ob das bei dir hilft und ob die Übung etwas für den Alltag bringt, ist nicht belegt.',
  goodFor: ['Rechts und links unterscheiden', 'Bilder im Kopf drehen', 'Genau hinschauen'],
  captions: {
    watch: 'Welche Seite – links oder rechts?',
    back: 'Handrücken: Daumen rechts heißt LINKS',
    turn: 'Gedreht – die Seite bleibt gleich',
    swap: 'Später tauschen die Felder den Platz',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Richtig',
    rt: 'Zeit (Median)',
    rotCost: 'Mehrzeit bei Drehung',
    swaps: 'Links und rechts vertauscht',
  },
  tips: {
    swap: 'Ein paar Mal waren links und rechts vertauscht. Such zuerst den Daumen (Hand) oder die große Zehe (Fuß) und schau, ob du die Fläche oder den Rücken siehst.',
    slow: 'Manchmal war die Zeit um. Such zuerst Daumen oder große Zehe – das geht oft schneller, als das ganze Bild zu drehen.',
    turn: 'Bei gedrehten Bildern dauert es länger – das ist normal. Du kannst dir die eigene Hand oder den Fuß in dieser Lage denken; ob es dir hilft, ist nicht belegt.',
    great: 'Gut gemacht! Du ordnest die Seiten sicher zu. Bleib locker – dann klappt es auch mit mehr Drehung.',
  },
  feedback: {
    level: 'Stufe',
    left: 'LINKS',
    right: 'RECHTS',
    up: 'OBEN',
    down: 'UNTEN',
    hand_left: 'Linke Hand',
    hand_right: 'Rechte Hand',
    foot_left: 'Linker Fuß',
    foot_right: 'Rechter Fuß',
    forearm_left: 'Linker Unterarm',
    forearm_right: 'Rechter Unterarm',
    volar_hand: 'Handfläche',
    dorsal_hand: 'Handrücken',
    volar_foot: 'Fußsohle',
    dorsal_foot: 'Fußrücken',
    volar_forearm: 'Handfläche',
    dorsal_forearm: 'Handrücken',
  },
};

export const it: ExerciseTexts = {
  title: 'Quale lato?',
  tagline: 'Sinistra o destra? Riconosci il lato di mano, piede e avambraccio.',
  steps: [
    'Nel cerchio compare una mano, un piede o un avambraccio.',
    'Tocca SINISTRA o DESTRA – a seconda del lato.',
    'Ruotato va bene – il lato resta lo stesso.',
  ],
  why:
    'Se una mano o un piede è sinistro o destro non si vede sempre subito – soprattutto quando l’immagine è ruotata. Molte persone si immaginano la propria mano o il proprio piede nella posizione mostrata; più l’immagine è ruotata, più ci vuole di solito. È normale e non dice nulla su di te. Può aiutare immaginare la propria mano in quella posizione – ma che questo ti aiuti e che l’esercizio serva nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Distinguere destra e sinistra', 'Ruotare immagini a mente', 'Guardare con attenzione'],
  captions: {
    watch: 'Quale lato – sinistra o destra?',
    back: 'Dorso: pollice a destra = SINISTRA',
    turn: 'Ruotato – il lato resta lo stesso',
    swap: 'Poi i campi si scambiano di posto',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Corretti',
    rt: 'Tempo (mediana)',
    rotCost: 'Tempo in più con rotazione',
    swaps: 'Destra e sinistra scambiate',
  },
  tips: {
    swap: 'Alcune volte destra e sinistra erano scambiate. Cerca prima il pollice (mano) o l’alluce (piede) e guarda se vedi il palmo o il dorso.',
    slow: 'A volte il tempo era scaduto. Cerca prima il pollice o l’alluce – spesso è più veloce che ruotare tutta l’immagine.',
    turn: 'Con immagini ruotate ci vuole più tempo – è normale. Puoi immaginare la tua mano o il tuo piede in quella posizione; non è dimostrato che ti aiuti.',
    great: 'Ben fatto! Abbini i lati con sicurezza. Resta rilassato – così funziona anche con più rotazione.',
  },
  feedback: {
    level: 'Livello',
    left: 'SINISTRA',
    right: 'DESTRA',
    up: 'ALTO',
    down: 'BASSO',
    hand_left: 'Mano sinistra',
    hand_right: 'Mano destra',
    foot_left: 'Piede sinistro',
    foot_right: 'Piede destro',
    forearm_left: 'Avambraccio sinistro',
    forearm_right: 'Avambraccio destro',
    volar_hand: 'palmo',
    dorsal_hand: 'dorso della mano',
    volar_foot: 'pianta',
    dorsal_foot: 'dorso del piede',
    volar_forearm: 'palmo',
    dorsal_forearm: 'dorso della mano',
  },
};
