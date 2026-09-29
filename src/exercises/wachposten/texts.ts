import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/wissenschaft/01-…, 4.4 und 04-…, 6.5/10): nur beschreiben, was man in der
// Übung tut – keine Wirkversprechen, keine Test- oder Diagnosewörter, kein Vergleich mit anderen.

export const de: ExerciseTexts = {
  title: 'Wachposten',
  tagline: 'Aufmerksam bleiben, auch wenn lange nichts passiert.',
  steps: [
    'Merk dir dein Zeichen – es wird am Anfang gezeigt.',
    'Genau dieses Zeichen? Tippen. Sonst nichts tun.',
    'Zwei Minuten dranbleiben – auch wenn es ruhig ist.',
  ],
  why:
    'Beim Wachposten passt du zwei Minuten lang auf ein seltenes Zeichen auf – so übst du, über längere Zeit aufmerksam zu bleiben. Fast allen fällt das mit der Zeit schwerer: Das ist normal und zeigt, warum Pausen guttun. Dass die Übung dich im Alltag wachsamer macht, ist nicht belegt.',
  goodFor: ['Lange dranbleiben', 'Ruhig beobachten', 'Aufmerksam bleiben'],
  captions: {
    target: 'Merk dir dieses Zeichen',
    tap: 'Genau dieses Zeichen? Tippen!',
    wait: 'Andere Zeichen: einfach nichts tun',
  },
  metrics: {
    accuracy: 'Treffsicherheit',
    half1: 'Erste Hälfte',
    half2: 'Zweite Hälfte',
    missed: 'Verpasst',
    falseAlarms: 'Falsch getippt',
    rt: 'Reaktionszeit',
  },
  tips: {
    fade: 'In der zweiten Hälfte ließ es etwas nach – das geht fast allen so. Bei langen Aufgaben tun kurze Pausen gut.',
    careful: 'Du hast öfter bei ähnlichen Zeichen getippt. Schau kurz genau hin, bevor du tippst – Zeit ist genug.',
    watch: 'Ein paar Zeichen sind dir durchgerutscht. Bleib mit dem Blick in der Mitte, auch wenn lange nichts kommt.',
    harder: 'Stark – bis zum Schluss wachsam! Nächstes Mal sehen die anderen Zeichen deinem etwas ähnlicher.',
    steady: 'Gut dabeigeblieben. Ruhig atmen und den Blick locker in der Mitte lassen.',
  },
  feedback: {
    target: 'Dein Zeichen',
    onlyThis: 'Tippe nur bei diesem Zeichen',
    missed: 'Verpasst',
    wrong: 'Nicht dieses',
    level: 'Stufe',
  },
};

export const it: ExerciseTexts = {
  title: 'Sentinella',
  tagline: 'Restare attenti anche quando non succede nulla.',
  steps: [
    'Memorizza il tuo simbolo – lo vedi all’inizio.',
    'Proprio quel simbolo? Tocca. Altrimenti non fare nulla.',
    'Resisti due minuti – anche quando è tutto calmo.',
  ],
  why:
    'In Sentinella resti attento per due minuti a un simbolo raro – così ti eserciti a mantenere l’attenzione a lungo. Quasi a tutti diventa più difficile con il passare del tempo: è normale e mostra perché le pause fanno bene. Che l’esercizio ti renda più attento nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Resistere a lungo', 'Osservare con calma', 'Restare attenti'],
  captions: {
    target: 'Memorizza questo simbolo',
    tap: 'Proprio questo simbolo? Tocca!',
    wait: 'Altri simboli: non fare nulla',
  },
  metrics: {
    accuracy: 'Precisione',
    half1: 'Prima metà',
    half2: 'Seconda metà',
    missed: 'Mancati',
    falseAlarms: 'Tocchi sbagliati',
    rt: 'Tempo di reazione',
  },
  tips: {
    fade: 'Nella seconda metà l’attenzione è calata un po’ – succede quasi a tutti. Nei compiti lunghi brevi pause fanno bene.',
    careful: 'Hai toccato spesso con simboli simili. Guarda bene un attimo prima di toccare – il tempo c’è.',
    watch: 'Qualche simbolo ti è sfuggito. Tieni lo sguardo al centro, anche quando per un po’ non arriva nulla.',
    harder: 'Ottimo – attento fino alla fine! La prossima volta gli altri simboli somiglieranno un po’ di più al tuo.',
    steady: 'Sei rimasto concentrato. Respira con calma e tieni lo sguardo rilassato al centro.',
  },
  feedback: {
    target: 'Il tuo simbolo',
    onlyThis: 'Tocca solo con questo simbolo',
    missed: 'Mancato',
    wrong: 'Non questo',
    level: 'Livello',
  },
};
