import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln: nur beschreiben, was man tut – keine Wirk- oder Heilversprechen, kein „Test“,
// keine Normwerte, keine Vergleiche mit anderen.

export const de: ExerciseTexts = {
  title: 'Leuchtpfad',
  tagline: 'Schau zu, wie Blöcke aufleuchten – und tippe sie in derselben Reihenfolge nach.',
  steps: [
    'Blöcke leuchten nacheinander auf – schau zu.',
    'Tippe sie in genau derselben Reihenfolge an.',
    'Klappt es, wird die Folge länger. Zwei Fehler beenden die Runde.',
  ],
  why:
    'Beim Leuchtpfad merkst du dir eine Reihenfolge von Orten – ähnlich wie einen kurzen Weg, den du dir einprägst. Die Aufgabe stammt aus der Gedächtnisforschung; mit Übung kommst du hier weiter, vor allem mit Merkstrategien wie „zwei nach rechts, einer hoch“. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Wege merken', 'Reihenfolgen behalten', 'Ruhig konzentrieren'],
  captions: {
    watch: 'Schau zu: die Blöcke leuchten auf',
    repeat: 'Tippe sie in derselben Reihenfolge',
    ok: 'Geschafft – die Folge wird länger',
  },
  metrics: {
    level: 'Längste Folge (Blöcke)',
    correct: 'Folgen richtig',
    errors: 'Fehler',
    backSpan: 'Längste Folge rückwärts',
  },
  tips: {
    group: 'Fasse die Blöcke zu Gruppen zusammen, zum Beispiel „links oben, dann zwei nach rechts“.',
    back: 'Rückwärts: Sag dir die Folge im Kopf von hinten nach vorn, bevor du tippst.',
    great: 'Stark gemerkt! Beim nächsten Mal wird die Folge noch etwas länger.',
  },
  feedback: {
    forward: 'Vorwärts',
    backward: 'Rückwärts',
    length: 'Länge',
    ready: 'Gleich geht’s los …',
    watch: 'Schau zu …',
    your: 'Jetzt du!',
    yourBack: 'Jetzt rückwärts!',
    done: 'Geschafft!',
    wrong: 'Nicht ganz',
    misses: 'Fehler',
    go: 'Los',
    skip: 'Nein, danke',
    bonusTitle: 'Bonus: rückwärts',
    bonusText: 'Jetzt tippst du die Folge von hinten nach vorn – der zuletzt leuchtende Block zuerst.',
    bonusOptional: 'Freiwillig – du kannst auch beenden.',
  },
};

export const it: ExerciseTexts = {
  title: 'Percorso luminoso',
  tagline: 'Guarda come si illuminano i blocchi – e toccali nello stesso ordine.',
  steps: [
    'I blocchi si illuminano uno dopo l’altro – guarda.',
    'Toccali esattamente nello stesso ordine.',
    'Se riesce, la sequenza si allunga. Due errori chiudono il turno.',
  ],
  why:
    'Nel percorso luminoso ricordi un ordine di luoghi – un po’ come un breve tragitto che ti impari. Il compito proviene dalla ricerca sulla memoria; con la pratica vai più avanti, soprattutto con strategie come «due a destra, uno in alto». Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare i percorsi', 'Tenere a mente ordini', 'Concentrarsi con calma'],
  captions: {
    watch: 'Guarda: i blocchi si illuminano',
    repeat: 'Toccali nello stesso ordine',
    ok: 'Fatto – la sequenza si allunga',
  },
  metrics: {
    level: 'Sequenza più lunga (blocchi)',
    correct: 'Sequenze corrette',
    errors: 'Errori',
    backSpan: 'Sequenza più lunga al contrario',
  },
  tips: {
    group: 'Raggruppa i blocchi, per esempio «in alto a sinistra, poi due a destra».',
    back: 'All’indietro: ripeti la sequenza a mente dalla fine all’inizio prima di toccare.',
    great: 'Ben ricordato! La prossima volta la sequenza sarà un po’ più lunga.',
  },
  feedback: {
    forward: 'Avanti',
    backward: 'All’indietro',
    length: 'Lunghezza',
    ready: 'Si parte subito …',
    watch: 'Guarda …',
    your: 'Tocca a te!',
    yourBack: 'Ora al contrario!',
    done: 'Fatto!',
    wrong: 'Non proprio',
    misses: 'Errori',
    go: 'Via',
    skip: 'No, grazie',
    bonusTitle: 'Bonus: al contrario',
    bonusText: 'Ora tocchi la sequenza dalla fine all’inizio – prima l’ultimo blocco illuminato.',
    bonusOptional: 'Facoltativo – puoi anche finire.',
  },
};
