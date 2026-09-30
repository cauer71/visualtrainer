import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-,
// Heil- oder Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst.

export const de: ExerciseTexts = {
  title: 'Pendel-Fang',
  tagline: 'Tippe genau dann, wenn das Ziel im Rahmen ist.',
  steps: [
    'Ein Ziel schwingt auf einer Linie hin und her.',
    'Tippe irgendwo, wenn es im Rahmen in der Mitte ist.',
    'Je besser du bist, desto schneller und enger wird es.',
  ],
  why:
    'Wer einen Ball fängt oder einer Schaukel ausweicht, muss den richtigen Moment abpassen. Hier schwingt ein Ziel gleichmäßig hin und her, und du tippst, wenn es im Rahmen ist. Danach siehst du, ob du etwas zu früh oder zu spät warst – der Wert enthält auch die kurze Verzögerung von Gerät und Finger. Ob sich das auf Sport oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Den Moment abpassen', 'Ballspiele', 'Takt halten'],
  captions: {
    watch: 'Das Ziel schwingt hin und her',
    wait: 'Warte, bis es im Rahmen ist',
    tap: 'Tippe, wenn es in der Mitte ist',
    early: 'Zu früh? Nicht schlimm',
  },
  metrics: {
    level: 'Stufe',
    hitRate: 'Trefferquote',
    meanDev: 'Ø Abweichung (Zeit)',
    meanDevPct: 'Ø Abweichung (Bahnbreite)',
    tendency: 'Tendenz (− früh, + spät)',
  },
  tips: {
    early: 'Du tippst meist etwas zu früh. Warte einen Moment länger, bis das Ziel mitten im Rahmen ist.',
    late: 'Du tippst meist etwas zu spät. Tippe ein wenig eher – dein Finger und das Gerät brauchen einen Augenblick.',
    none: 'Bei einigen Versuchen hast du nicht getippt. Trau dich – ein Fehlversuch ist nicht schlimm.',
    great: 'Stark! Du erwischst den Moment gut. Bleib locker – dann klappt es auch, wenn das Ziel schneller schwingt.',
  },
  feedback: {
    level: 'Stufe',
    early: 'Zu früh',
    late: 'Zu spät',
    none: 'Nicht getippt',
  },
};

export const it: ExerciseTexts = {
  title: 'Pendolo',
  tagline: 'Tocca proprio quando il bersaglio è nel riquadro.',
  steps: [
    'Un bersaglio oscilla avanti e indietro su una linea.',
    'Tocca ovunque, quando è nel riquadro al centro.',
    'Più sei bravo, più diventa veloce e stretto.',
  ],
  why:
    'Chi prende una palla o schiva un’altalena deve cogliere il momento giusto. Qui un bersaglio oscilla in modo regolare e tu tocchi quando è nel riquadro. Poi vedi se eri un po’ in anticipo o in ritardo – il valore comprende anche il breve ritardo di dispositivo e dito. Non è dimostrato che questo si trasferisca allo sport o alla vita di tutti i giorni.',
  goodFor: ['Cogliere il momento', 'Giochi con la palla', 'Tenere il ritmo'],
  captions: {
    watch: 'Il bersaglio oscilla avanti e indietro',
    wait: 'Aspetta che sia nel riquadro',
    tap: 'Tocca quando è al centro',
    early: 'Troppo presto? Nessun problema',
  },
  metrics: {
    level: 'Livello',
    hitRate: 'Percentuale di colpi',
    meanDev: 'Scarto medio (tempo)',
    meanDevPct: 'Scarto medio (larghezza)',
    tendency: 'Tendenza (− presto, + tardi)',
  },
  tips: {
    early: 'Di solito tocchi un po’ troppo presto. Aspetta un attimo in più, finché il bersaglio è in mezzo al riquadro.',
    late: 'Di solito tocchi un po’ troppo tardi. Tocca un po’ prima – dito e dispositivo hanno bisogno di un istante.',
    none: 'In alcuni tentativi non hai toccato. Coraggio – un tentativo sbagliato non è grave.',
    great: 'Ottimo! Cogli bene il momento. Resta rilassato – così funziona anche quando il bersaglio oscilla più in fretta.',
  },
  feedback: {
    level: 'Livello',
    early: 'Troppo presto',
    late: 'Troppo tardi',
    none: 'Non toccato',
  },
};
