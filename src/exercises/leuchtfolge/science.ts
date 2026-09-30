import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Grundlage: docs/uebungskatalog/uebungen/601-color-sequence.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md
// (Quellen dort per Crossref geprüft). Formulierungen nach Abschnitt C3 der Literaturbasis: nur beschreiben, was geübt wird.
export const science: ScienceEntry = {
  id: 'leuchtfolge',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Sich eine Reihenfolge leuchtender Felder kurz merken und in derselben Reihenfolge nachtippen – Runde für Runde etwas länger.',
      daily: 'Überall, wo man sich etwas kurz in der richtigen Reihenfolge merkt: ein Code, Schritte einer Anleitung, eine Wegbeschreibung.',
      research:
        'Aufgaben, bei denen man eine Folge behält und wiedergibt, stammen aus der Gedächtnisforschung. Die Länge, die Erwachsene sich merken können, hängt stark von Strategien wie Benennen und Gruppieren ab. In der geübten Aufgabe wird man mit Wiederholung besser; in Studien mit aktiven Kontrollgruppen übertrug sich das aber nicht auf ungeübte Aufgaben oder den Alltag. Für Senso-ähnliche Spiele selbst gibt es keine Trainingsstudien. Ob das im Alltag hilft, ist nicht belegt.',
      improved:
        'Jedes Feld hat neben der Farbe ein eigenes Symbol und eine feste Position (Farbe allein reicht nie; Rot-Grün-Schwäche betrifft etwa 8 % der Männer). Weiche Helligkeitsübergänge, höchstens etwa 1,4 Leuchtphasen pro Sekunde, kein Blitzen und kein rotes Aufleuchten bei Fehlern. Kein Zeitlimit für die Antwort – nur eine feste Rundenzahl. Dasselbe Feld kommt nie direkt zweimal hintereinander. Nach einem Fehler wird die richtige Folge gezeigt. Gezählt wird die längste fehlerfrei gemerkte Folge – nur zum Vergleich mit dir selbst.',
    },
    it: {
      trains: 'Ricordare per breve tempo l’ordine di campi luminosi e ripeterlo toccandoli – turno dopo turno un po’ più lungo.',
      daily: 'Ovunque si ricordi qualcosa per poco tempo nell’ordine giusto: un codice, i passaggi di un’istruzione, un’indicazione stradale.',
      research:
        'I compiti in cui si trattiene e si ripete una sequenza provengono dalla ricerca sulla memoria. La lunghezza che gli adulti riescono a ricordare dipende molto da strategie come dare un nome e raggruppare. Nel compito allenato con la ripetizione si migliora; negli studi con gruppi di controllo attivi, però, questo non si trasferiva a compiti non allenati né alla vita quotidiana. Per i giochi simili a Senso non esistono studi di allenamento. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
      improved:
        'Oltre al colore, ogni campo ha un simbolo proprio e una posizione fissa (il solo colore non basta mai; il daltonismo rosso-verde riguarda circa l’8 % degli uomini). Transizioni di luminosità morbide, al massimo circa 1,4 fasi luminose al secondo, niente lampeggi né accensioni rosse in caso di errore. Nessun limite di tempo per la risposta – solo un numero fisso di turni. Lo stesso campo non compare mai due volte di seguito. Dopo un errore viene mostrata la sequenza giusta. Conta la sequenza più lunga ricordata senza errori – solo per confrontarti con te stesso.',
    },
  },
  sources: [
    src('Cowan (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences', 'https://doi.org/10.1017/S0140525X01003922'),
    src('Owen et al. (2010). Putting brain training to the test. Nature', 'https://doi.org/10.1038/nature09042'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
    src('Gathercole, Dunning, Holmes & Norris (2019). Working memory training involves learning new skills. Journal of Memory and Language', 'https://doi.org/10.1016/j.jml.2018.10.003'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
  ],
};
