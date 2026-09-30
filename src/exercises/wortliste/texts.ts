import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen.

export const de: ExerciseTexts = {
  title: 'Wortliste',
  tagline: 'Merk dir Wörter, die nacheinander erscheinen – und finde sie wieder.',
  steps: [
    'Wörter erscheinen nacheinander – merk sie dir.',
    'Tippe danach die Wörter an, die du gesehen hast.',
    'Klappt es, wird die Liste länger.',
  ],
  why:
    'Wörter nacheinander zu merken ist eine klassische Gedächtnisaufgabe. Hier musst du sie nur wiedererkennen – ohne Tastatur. Mit kleinen Merkhilfen, etwa einer Mini-Geschichte aus den Wörtern, kommst du in der Übung oft weiter. Ob sich das auf den Alltag überträgt, ist nicht belegt.',
  goodFor: ['Einkaufsliste merken', 'Namen behalten', 'Ruhig konzentrieren'],
  captions: {
    watch: 'Merk dir die Wörter',
    pick: 'Tippe die Wörter an, die du gesehen hast',
    done: 'Dann tippe auf „Fertig“',
  },
  metrics: {
    level: 'Größte gemeisterte Liste (Wörter)',
    recognized: 'Richtig erkannt',
    falseAlarms: 'Falsche Alarme',
    lists: 'Listen gemeistert',
  },
  tips: {
    alarm: 'Du hast öfter Wörter gewählt, die nicht dabei waren. Tippe nur an, was du sicher wiedererkennst.',
    group: 'Mach aus den Wörtern eine kleine Geschichte oder ein Bild im Kopf – das hilft beim Merken.',
    great: 'Stark gemerkt! Beim nächsten Mal wird die Liste noch etwas länger.',
  },
  feedback: {
    list: 'Liste',
    ready: 'Gleich geht’s los …',
    watch: 'Merk dir die Wörter',
    pick: 'Welche Wörter waren dabei?',
    chosen: 'Gewählt',
    of: 'von',
    found: 'erkannt',
    wrong: 'falsch',
    done: 'Fertig',
    needOne: 'Wähle mindestens ein Wort',
    good: 'Geschafft!',
    almost: 'Nicht ganz',
  },
};

export const it: ExerciseTexts = {
  title: 'Lista di parole',
  tagline: 'Ricorda parole che compaiono una dopo l’altra – e ritrovale.',
  steps: [
    'Le parole compaiono una dopo l’altra – ricordale.',
    'Poi tocca le parole che hai visto.',
    'Se riesce, la lista si allunga.',
  ],
  why:
    'Ricordare parole una dopo l’altra è un classico compito della ricerca sulla memoria. Qui devi solo riconoscerle – senza tastiera. Con piccoli trucchi, per esempio una mini-storia con le parole, nell’esercizio spesso si va più avanti. Non è dimostrato che questo si trasferisca alla vita di tutti i giorni.',
  goodFor: ['Ricordare la spesa', 'Tenere a mente i nomi', 'Concentrarsi con calma'],
  captions: {
    watch: 'Ricorda le parole',
    pick: 'Tocca le parole che hai visto',
    done: 'Poi tocca «Fatto»',
  },
  metrics: {
    level: 'Lista più lunga riuscita (parole)',
    recognized: 'Riconosciute',
    falseAlarms: 'Falsi allarmi',
    lists: 'Liste riuscite',
  },
  tips: {
    alarm: 'Hai scelto spesso parole che non c’erano. Tocca solo quelle che riconosci con sicurezza.',
    group: 'Fai delle parole una piccola storia o un’immagine a mente – aiuta a ricordare.',
    great: 'Ben ricordato! La prossima volta la lista sarà un po’ più lunga.',
  },
  feedback: {
    list: 'Lista',
    ready: 'Si parte subito …',
    watch: 'Ricorda le parole',
    pick: 'Quali parole c’erano?',
    chosen: 'Scelte',
    of: 'su',
    found: 'riconosciute',
    wrong: 'sbagliate',
    done: 'Fatto',
    needOne: 'Scegli almeno una parola',
    good: 'Fatto!',
    almost: 'Non del tutto',
  },
};
