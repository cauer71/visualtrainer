import type { ExerciseTexts } from '../../core/types';

// Formulierungsregeln (docs/uebungskatalog/uebungen/601-color-sequence.md, Abschnitt 8): nur beschreiben, was man in der
// Übung tut – kein Test, keine Norm, kein Vergleich mit anderen, keine Alltags- oder Gesundheitsversprechen.

export const de: ExerciseTexts = {
  title: 'Leuchtfolge',
  tagline: 'Merk dir die Reihenfolge der leuchtenden Felder und tipp sie nach.',
  steps: ['Schau zu, welche Felder nacheinander leuchten.', 'Tippe sie danach in derselben Reihenfolge an.', 'Klappt es, wird die Folge länger – ganz ohne Zeitdruck.'],
  why:
    'Bei der Leuchtfolge übst du, dir eine Reihenfolge kurz zu merken und sie danach zu wiederholen. Jedes Feld hat eine eigene Farbe und ein eigenes Symbol. Viele sagen sich die Folge leise vor oder fassen sie in Zweier- und Dreiergruppen zusammen – probier es aus. In dieser Aufgabe wirst du mit Übung besser. Ob das im Alltag hilft, ist nicht belegt.',
  goodFor: ['Reihenfolgen merken', 'Ruhig konzentrieren', 'Merkstrategien ausprobieren'],
  captions: {
    watch: 'Schau zu und merk dir die Reihenfolge',
    repeat: 'Jetzt du: tippe sie nach',
    longer: 'Klappt es, wird die Folge länger',
  },
  metrics: {
    level: 'Längste gemerkte Folge',
    rounds: 'Fehlerfreie Runden',
    taps: 'Richtig getippte Felder',
  },
  tips: {
    great: 'Stark gemerkt! Beim nächsten Mal wird die Folge etwas länger.',
    start: 'Der Anfang ist dir entwischt. Sag dir die ersten Felder beim Zuschauen leise vor, zum Beispiel „Kreis, Stern …“.',
    end: 'Am Ende rutscht oft etwas weg. Wiederhole die Folge in Gedanken schon während des Leuchtens.',
    group: 'Fass die Folge in kleine Gruppen zusammen, zum Beispiel immer zwei oder drei Felder auf einmal.',
  },
  feedback: {
    round: 'Runde',
    watch: 'Schau zu …',
    yourTurn: 'Jetzt du!',
    right: '✓ Richtig!',
    wrong: '✗ Nicht ganz',
  },
};

export const it: ExerciseTexts = {
  title: 'Sequenza luminosa',
  tagline: 'Ricorda l’ordine dei campi luminosi e ripetilo toccandoli.',
  steps: ['Guarda quali campi si illuminano uno dopo l’altro.', 'Poi toccali nello stesso ordine.', 'Se ci riesci, si allunga – senza fretta.'],
  why:
    'Nella sequenza luminosa alleni a ricordare per breve tempo un ordine e a ripeterlo. Ogni campo ha un proprio colore e un proprio simbolo. Molti si ripetono la sequenza a bassa voce oppure la raggruppano a due o tre – prova anche tu. In questo compito con la pratica migliori. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
  goodFor: ['Ricordare sequenze', 'Concentrarsi con calma', 'Provare strategie di memoria'],
  captions: {
    watch: 'Guarda e ricorda l’ordine',
    repeat: 'Ora tocca a te: ripetila',
    longer: 'Se ci riesci, la sequenza si allunga',
  },
  metrics: {
    level: 'Sequenza più lunga ricordata',
    rounds: 'Turni senza errori',
    taps: 'Campi toccati correttamente',
  },
  tips: {
    great: 'Ottima memoria! La prossima volta la sequenza sarà un po’ più lunga.',
    start: 'L’inizio ti è sfuggito. Ripeti a bassa voce i primi campi mentre guardi, per esempio «cerchio, stella …».',
    end: 'Alla fine spesso qualcosa svanisce. Ripeti la sequenza nella mente già mentre si illumina.',
    group: 'Raggruppa la sequenza in piccoli blocchi, per esempio sempre due o tre campi alla volta.',
  },
  feedback: {
    round: 'Turno',
    watch: 'Guarda …',
    yourTurn: 'Tocca a te!',
    right: '✓ Giusto!',
    wrong: '✗ Non proprio',
  },
};
