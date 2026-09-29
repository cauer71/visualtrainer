import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/wissenschaft/01-…, 4.4 und 04-…, 8.5/10): nur beschreiben, was man in der
// Übung tut – keine Wirkversprechen, keine Test-/Diagnosewörter, kein Vergleich mit anderen.
// Platzhalter {n} = Ziffer.

export const de: ExerciseTexts = {
  title: 'Weichensteller',
  tagline: 'Zwischen zwei Regeln hin- und herschalten – der Rahmen zeigt, welche gilt.',
  steps: ['Kreis: Ist die Zahl gerade oder ungerade?', 'Quadrat: Ist sie kleiner oder größer als 5?', 'Tippe links oder rechts – die Tasten zeigen, was gilt.'],
  why:
    'Beim Weichensteller wechselt die Regel immer wieder. Jeder Wechsel kostet einen kleinen Moment – das geht allen so. Mit etwas Übung werden die Wechsel in dieser Übung flüssiger; dass sich das auf Konzentration oder Alltag überträgt, ist nicht belegt.',
  goodFor: ['Umschalten', 'Zahlen', 'Aufmerksam bleiben'],
  captions: {
    circle: 'Kreis: gerade oder ungerade?',
    square: 'Quadrat: kleiner oder größer als 5?',
    watch: 'Achte immer auf den Rahmen!',
  },
  metrics: {
    level: 'Erreichte Stufe',
    accuracy: 'Treffsicherheit',
    switchCost: 'Mehrzeit beim Regelwechsel',
    mixCost: 'Mehrzeit mit zwei Regeln',
    lead: 'Vorwarnzeit zuletzt',
  },
  tips: {
    frame: 'Schau zuerst auf den Rahmen – Kreis oder Quadrat? – und erst dann auf die Zahl.',
    prepare: 'Nutze den Moment, in dem der Rahmen erscheint: Sag dir die Regel kurz innerlich vor.',
    tempo: 'Du warst sicher, aber oft knapp zu spät. Vertrau dir – die erste Antwort stimmt meistens.',
    great: 'Stark! Ein kleiner Rest an Mehrzeit beim Wechsel bleibt bei allen – das ist ganz normal.',
  },
  feedback: {
    level: 'Stufe',
    ruleA: 'Gerade oder ungerade?',
    ruleB: 'Kleiner oder größer als 5?',
    symA: '2/3',
    symB: '< 5 >',
    even: 'gerade',
    odd: 'ungerade',
    small: 'kleiner',
    big: 'größer',
    smallSub: '< 5',
    bigSub: '> 5',
    isEven: '{n} ist gerade',
    isOdd: '{n} ist ungerade',
    isSmall: '{n} ist kleiner als 5',
    isBig: '{n} ist größer als 5',
    slow: 'Etwas schneller!',
    timeout: 'Zu langsam',
    wait: 'Warte auf die Zahl',
    early: 'Zu früh',
    pureA: 'Zum Aufwärmen: nur diese Regel',
    pureB: 'Jetzt nur diese Regel',
    mixed: 'Jetzt gemischt – schau auf den Rahmen!',
  },
};

export const it: ExerciseTexts = {
  title: 'Scambio',
  tagline: 'Passa da una regola all’altra – la cornice ti dice quale vale.',
  steps: ['Cerchio: il numero è pari o dispari?', 'Quadrato: è minore o maggiore di 5?', 'Tocca a sinistra o a destra – i tasti mostrano cosa vale.'],
  why:
    'In Scambio la regola cambia di continuo. Ogni cambio costa un attimo – succede a tutti. Con un po’ di pratica i cambi in questo esercizio diventano più fluidi; che questo si trasferisca alla concentrazione o alla vita quotidiana non è dimostrato.',
  goodFor: ['Cambiare regola', 'Numeri', 'Restare attenti'],
  captions: {
    circle: 'Cerchio: pari o dispari?',
    square: 'Quadrato: minore o maggiore di 5?',
    watch: 'Guarda sempre la cornice!',
  },
  metrics: {
    level: 'Livello raggiunto',
    accuracy: 'Precisione',
    switchCost: 'Tempo in più al cambio di regola',
    mixCost: 'Tempo in più con due regole',
    lead: 'Preavviso finale',
  },
  tips: {
    frame: 'Guarda prima la cornice – cerchio o quadrato? – e solo dopo il numero.',
    prepare: 'Sfrutta il momento in cui appare la cornice: ripeti tra te la regola.',
    tempo: 'Eri preciso, ma spesso un po’ in ritardo. Fidati – la prima risposta di solito è giusta.',
    great: 'Ottimo! Un piccolo tempo in più al cambio resta a tutti – è del tutto normale.',
  },
  feedback: {
    level: 'Livello',
    ruleA: 'Pari o dispari?',
    ruleB: 'Minore o maggiore di 5?',
    symA: '2/3',
    symB: '< 5 >',
    even: 'pari',
    odd: 'dispari',
    small: 'minore',
    big: 'maggiore',
    smallSub: '< 5',
    bigSub: '> 5',
    isEven: '{n} è pari',
    isOdd: '{n} è dispari',
    isSmall: '{n} è minore di 5',
    isBig: '{n} è maggiore di 5',
    slow: 'Un po’ più veloce!',
    timeout: 'Troppo lento',
    wait: 'Aspetta il numero',
    early: 'Troppo presto',
    pureA: 'Per iniziare: solo questa regola',
    pureB: 'Ora solo questa regola',
    mixed: 'Ora mescolato – guarda la cornice!',
  },
};
