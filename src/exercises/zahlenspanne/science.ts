import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Grundlage: docs/uebungskatalog/uebungen/602-digit-span.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md
// (Quellen dort per Crossref geprüft). Formulierungen nach Abschnitt C3 der Literaturbasis: nur beschreiben, was geübt wird.
export const science: ScienceEntry = {
  id: 'zahlenspanne',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Sich Ziffern der Reihe nach kurz merken und danach in derselben Reihenfolge eingeben – später auch rückwärts.',
      daily: 'Überall, wo man sich Zahlen kurz merkt: eine Hausnummer, eine Telefonnummer, einen Code bis zum Eintippen.',
      research:
        'Die Zahlenspanne ist eine klassische Aufgabe der Gedächtnisforschung. Mit Merkstrategien lässt sie sich enorm steigern: Ein Teilnehmer kam nach über 230 Stunden Übung von 7 auf 79 Ziffern – das lag an der Strategie, nicht an einem größeren Speicher. Geübte Aufgaben werden besser; auf ungeübte Aufgaben oder den Alltag übertrug sich das in Studien mit aktiven Kontrollgruppen nicht. Ob das im Alltag hilft, ist nicht belegt.',
      improved:
        'Die Ziffern erscheinen einzeln, etwa eine pro Sekunde, und werden weich ein- und ausgeblendet. Keine Zahlenmuster: nie dieselbe Ziffer zweimal direkt hintereinander und keine Reihen wie 1-2-3. Kein Zeitlimit für die Eingabe – nur eine feste Rundenzahl statt Uhr. Große Tasten (mindestens 56 Pixel) mit Löschen und Bestätigen, damit ein versehentlicher Tipp nicht die Runde beendet. Rückwärts-Runden erst, wenn vorwärts längere Folgen gelingen. Gezählt wird die längste richtig eingegebene Folge – nur zum Vergleich mit dir selbst.',
    },
    it: {
      trains: 'Ricordare per breve tempo le cifre in ordine e inserirle poi nello stesso ordine – più avanti anche al contrario.',
      daily: 'Ovunque si ricordino numeri per poco tempo: un numero civico, un numero di telefono, un codice fino al momento di digitarlo.',
      research:
        'La serie di cifre è un compito classico della ricerca sulla memoria. Con strategie di memorizzazione può aumentare enormemente: un partecipante è passato da 7 a 79 cifre dopo oltre 230 ore di pratica – merito della strategia, non di una memoria più grande. I compiti allenati migliorano; negli studi con gruppi di controllo attivi questo non si trasferiva a compiti non allenati né alla vita quotidiana. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
      improved:
        'Le cifre compaiono una alla volta, circa una al secondo, con dissolvenza morbida. Niente schemi numerici: mai la stessa cifra due volte di seguito e nessuna serie come 1-2-3. Nessun limite di tempo per l’inserimento – solo un numero fisso di turni invece di un orologio. Tasti grandi (almeno 56 pixel) con cancellazione e conferma, così un tocco involontario non interrompe il turno. Turni al contrario solo quando in avanti riesci con serie più lunghe. Conta la serie più lunga inserita correttamente – solo per confrontarti con te stesso.',
    },
  },
  sources: [
    src('Miller (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review', 'https://doi.org/10.1037/h0043158'),
    src('Woods et al. (2011). Improving digit span assessment of short-term verbal memory. Journal of Clinical and Experimental Neuropsychology', 'https://doi.org/10.1080/13803395.2010.493149'),
    src('Ericsson, Chase & Faloon (1980). Acquisition of a memory skill. Science', 'https://doi.org/10.1126/science.7375930'),
    src('Jones & Macken (2015). Questioning short-term memory and its measurement: Why digit span measures long-term associative learning. Cognition', 'https://doi.org/10.1016/j.cognition.2015.07.009'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
  ],
};
