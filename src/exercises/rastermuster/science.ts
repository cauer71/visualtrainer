import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Grundlage: docs/uebungskatalog/uebungen/603-grid-memorization.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md
// (Quellen dort per Crossref geprüft). Formulierungen nach Abschnitt C3 der Literaturbasis: nur beschreiben, was geübt wird.
export const science: ScienceEntry = {
  id: 'rastermuster',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Sich kurz merken, welche Felder eines Rasters geleuchtet haben, und genau diese Felder danach antippen.',
      daily: 'Überall, wo man sich Orte kurz merkt: wo ein Gegenstand lag, welche Felder man schon angeklickt hat, Sitzplätze auf einem Plan.',
      research:
        'Aufgaben mit Mustern aus Orten kommen aus der Gedächtnisforschung (etwa die „Pattern Span“). Vieles hängt davon ab, ob man Felder zu Formen zusammenfassen kann. In der geübten Aufgabe wird man mit Wiederholung besser – nach zehn Wochen mit einem kommerziellen Trainingsprogramm besserten sich aber andere Aufgaben nicht stärker als nach einfachen Videospielen. Ein eigener Trainingsnachweis für Rastermuster-Aufgaben fehlt. Ob das im Alltag hilft, ist nicht belegt.',
      improved:
        'Leuchtende Felder werden heller und tragen zusätzlich eine Raute; richtige Tipps zeigen einen Haken, falsche ein Kreuz, damit die Rückmeldung nie allein von der Farbe abhängt. Die Felder blenden weich ein und aus, ohne Blitzen und ohne rotes Vollbild. Die Muster sind zufällig, haben aber höchstens zwei Felder je Zeile und Spalte, damit sich keines als einfacher Strich merken lässt. Zwei gemeisterte Muster in Folge führen eine Stufe höher, ein misslungenes eine Stufe tiefer; zwei Fehltipps beenden ein Muster. Es gibt kein Zeitlimit, sondern eine feste Musterzahl. Gezählt wird die höchste gemeisterte Stufe – nur zum Vergleich mit dir selbst.',
    },
    it: {
      trains: 'Ricordare per breve tempo quali campi di una griglia si sono illuminati e toccare poi esattamente quei campi.',
      daily: 'Ovunque si ricordino posizioni per poco tempo: dove si trovava un oggetto, quali caselle si sono già toccate, i posti a sedere su una piantina.',
      research:
        'I compiti con schemi di posizioni provengono dalla ricerca sulla memoria (per esempio il «Pattern Span»). Molto dipende dal riuscire a unire i campi in forme. Nel compito allenato con la ripetizione si migliora – dopo dieci settimane con un programma di allenamento commerciale, però, altri compiti non miglioravano più che dopo semplici videogiochi. Manca una prova di allenamento specifica per i compiti a griglia. Che questo aiuti nella vita di tutti i giorni non è dimostrato.',
      improved:
        'I campi luminosi diventano più chiari e portano in più un rombo; i tocchi giusti mostrano una spunta, quelli sbagliati una croce, così il riscontro non dipende mai dal solo colore. I campi compaiono e scompaiono in modo morbido, senza lampeggi e senza schermo rosso intero. Gli schemi sono casuali, ma hanno al massimo due campi per riga e colonna, così nessuno si lascia ricordare come una semplice linea. Due schemi superati di fila portano a un livello più alto, uno fallito a un livello più basso; due errori interrompono uno schema. Non c’è un limite di tempo, ma un numero fisso di schemi. Conta il livello più alto superato – solo per confrontarti con te stesso.',
    },
  },
  sources: [
    src('Della Sala, Gray, Baddeley, Allamano & Wilson (1999). Pattern span: A tool for unwelding visuo-spatial memory. Neuropsychologia', 'https://doi.org/10.1016/S0028-3932(98)00159-6'),
    src('Kable et al. (2017). No effect of commercial cognitive training on brain activity, choice behavior, or cognitive performance. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.2832-16.2017'),
    src('Owen et al. (2010). Putting brain training to the test. Nature', 'https://doi.org/10.1038/nature09042'),
    src('Gathercole, Dunning, Holmes & Norris (2019). Working memory training involves learning new skills. Journal of Memory and Language', 'https://doi.org/10.1016/j.jml.2018.10.003'),
    src('Kemps (2001). Complexity effects in visuo-spatial working memory: Implications for the role of long-term memory. Memory', 'https://doi.org/10.1080/09658210042000012'),
  ],
};
