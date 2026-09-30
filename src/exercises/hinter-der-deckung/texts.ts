import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Hinter der Deckung',
  tagline: 'Wo schaut er gleich hervor? Tippe, bevor er wieder weg ist.',
  steps: [
    'Hinter Kästen und Wänden schaut kurz ein Kreis hervor.',
    'Tippe ihn an, bevor er wieder verschwindet.',
    'Die Kästen wechseln ihren Platz – bleib aufmerksam.',
  ],
  why:
    'Im Alltag taucht etwas oft kurz hinter einer Kante oder einem Hindernis auf – zum Beispiel ein Ball hinter einem Zaun oder jemand hinter einer Ecke. Hier übst du, einen kurz auftauchenden Kreis an wechselnden Orten zu entdecken und gezielt zu treffen. Gemessen wird nur dein Tippen, nicht dein Blick. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Umschauen', 'Ballspiele', 'Schnell entscheiden'],
  captions: {
    watch: 'Achte auf die Kästen und Wände',
    tap: 'Da! Tippe den Kreis an',
    gone: 'Weg? Das ist nicht schlimm',
  },
  metrics: {
    level: 'Stufe',
    accuracy: 'Trefferquote',
    medianTime: 'Mittlere Zeit (Median)',
    hits: 'Getroffen',
  },
  tips: {
    wrong: 'Du tippst öfter daneben. Schau kurz hin, wo der Kreis hervorschaut, dann tippe genau dort.',
    slow: 'Einige Kreise waren wieder weg, bevor du getippt hast. Tippe gleich, wenn du sie siehst – nicht erst überlegen.',
    change: 'Wenn der Kreis an einen neuen Ort wechselt, brauchst du länger. Lass den Blick locker über alle Kästen und Wände wandern.',
    great: 'Stark! Du findest den Kreis schnell. Bleib locker – dann klappt es auch, wenn er kürzer zu sehen ist.',
  },
  feedback: {
    level: 'Stufe',
    gone: 'Weg',
    wrong: 'Daneben',
  },
};

export const it: ExerciseTexts = {
  title: 'Dietro il riparo',
  tagline: 'Dove spunta? Tocca prima che sparisca di nuovo.',
  steps: [
    'Dietro casse e muri spunta per un attimo un cerchio.',
    'Toccalo prima che sparisca di nuovo.',
    'Le casse cambiano posto – resta attento.',
  ],
  why:
    'Nella vita di tutti i giorni spesso qualcosa compare per un attimo dietro uno spigolo o un ostacolo – per esempio una palla dietro una recinzione o qualcuno dietro un angolo. Qui ti eserciti a scoprire un cerchio che spunta per poco in luoghi diversi e a colpirlo con precisione. Si misura solo il tuo tocco, non lo sguardo. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Guardarsi intorno', 'Giochi con la palla', 'Decidere in fretta'],
  captions: {
    watch: 'Osserva le casse e i muri',
    tap: 'Eccolo! Tocca il cerchio',
    gone: 'Sparito? Nessun problema',
  },
  metrics: {
    level: 'Livello',
    accuracy: 'Percentuale di colpi',
    medianTime: 'Tempo medio (mediana)',
    hits: 'Colpiti',
  },
  tips: {
    wrong: 'Tocchi spesso accanto. Guarda un attimo dove spunta il cerchio, poi tocca proprio lì.',
    slow: 'Alcuni cerchi erano già spariti quando hai toccato. Tocca subito appena li vedi – senza pensarci troppo.',
    change: 'Quando il cerchio cambia posto ti serve più tempo. Lascia vagare lo sguardo su tutte le casse e i muri.',
    great: 'Ottimo! Trovi il cerchio in fretta. Resta rilassato – così funziona anche quando si vede per meno tempo.',
  },
  feedback: {
    level: 'Livello',
    gone: 'Sparito',
    wrong: 'Accanto',
  },
};
