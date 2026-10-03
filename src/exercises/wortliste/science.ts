import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/606-word-recall.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'wortliste',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Sich Wörter merken, die nacheinander erscheinen, und sie aus einer Auswahl wiedererkennen – mit wachsender Listenlänge.',
      daily: 'Überall, wo man sich kurz mehrere Begriffe merkt: Einkaufsliste, Namen, Stichworte, Aufgaben für den Tag.',
      research:
        'Wörter nacheinander zu merken ist eine klassische Aufgabe der Gedächtnisforschung: Die ersten und die letzten Wörter einer Liste bleiben meist besser hängen als die in der Mitte. Häufige und gut vorstellbare Wörter werden besser behalten. In der Aufgabe wird man mit Übung besser, stark vor allem durch Merkstrategien wie eine Mini-Geschichte aus den Wörtern; das ist Strategie, nicht größere Grundkapazität. Dass sich das auf den Alltag oder auf andere Aufgaben überträgt, ist nicht belegt.',
      improved:
        'Die Wörter erscheinen nacheinander (je etwa 2 s, weich ein- und ausgeblendet), damit Zeit zum Lesen und für einfache Merkstrategien bleibt. Die Antwort erfolgt durch Antippen aus einer Auswahl; gemessen wird also das Wiedererkennen, das ist tablettauglich, und Tippfehler können nicht als Fehlversuch zählen. Für Deutsch und Italienisch gibt es getrennte, geprüfte Wortlisten mit häufigen, kurzen, eindeutigen Wörtern ohne Fremd- und Zahlwörter und ohne ähnlich klingende Paare; die neuen Wörter der Auswahl sind ähnlich lang wie die gezeigten. Die Länge passt sich nach oben und unten an, Hauptwert ist die größte gemeisterte Liste, dazu werden richtig erkannte Wörter und falsche Alarme gezeigt. Es gibt keine Normwerte und kein rotes Aufleuchten bei Fehlern.',
    },
    it: {
      trains: 'Ricordare parole che compaiono una dopo l’altra e riconoscerle in una scelta – con lista sempre più lunga.',
      daily: 'Ovunque si ricordino per poco più termini: lista della spesa, nomi, parole chiave, compiti della giornata.',
      research:
        'Ricordare parole una dopo l’altra è un compito classico della ricerca sulla memoria: le prime e le ultime parole di una lista restano di solito meglio di quelle nel mezzo. Le parole frequenti e ben immaginabili si ricordano meglio. Nel compito con l’esercizio si migliora, soprattutto con strategie di memoria come una mini-storia con le parole; è strategia, non una capacità di base più grande. Che questo si trasferisca alla vita quotidiana o ad altri compiti non è dimostrato.',
      improved:
        'Le parole compaiono una dopo l’altra (circa 2 s ciascuna, con dissolvenza morbida), così resta tempo per leggere e per semplici strategie di memoria. La risposta avviene toccando una scelta; si misura quindi il riconoscimento, adatto al tablet, e gli errori di battitura non possono contare come tentativo fallito. Per tedesco e italiano esistono liste di parole separate e controllate, con parole frequenti, brevi e univoche, senza parole straniere né numeri e senza coppie dal suono simile; le parole nuove della scelta hanno una lunghezza simile a quelle mostrate. La lunghezza si adatta verso l’alto e verso il basso, il valore principale è la lista più lunga riuscita, e si mostrano anche le parole riconosciute e i falsi allarmi. Non ci sono valori di riferimento né bagliori rossi in caso di errore.',
    },
  },
  sources: [
    src('Murdock (1962). The serial position effect of free recall. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0045106'),
    src('Glanzer & Cunitz (1966). Two storage mechanisms in free recall. Journal of Verbal Learning and Verbal Behavior', 'https://doi.org/10.1016/S0022-5371(66)80044-0'),
    src('Hulme et al. (1997). Word-frequency effects on short-term memory tasks: Evidence for a redintegration process in immediate serial recall. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/0278-7393.23.5.1217'),
    src('Fliessbach et al. (2006). The effect of word concreteness on recognition memory. NeuroImage', 'https://doi.org/10.1016/j.neuroimage.2006.06.007'),
    src('Baddeley, Thomson & Buchanan (1975). Word length and the structure of short-term memory. Journal of Verbal Learning and Verbal Behavior', 'https://doi.org/10.1016/S0022-5371(75)80045-4'),
    src('Bower & Clark (1969). Narrative stories as mediators for serial learning. Psychonomic Science', 'https://doi.org/10.3758/BF03332778'),
    src('Owen et al. (2010). Putting brain training to the test. Nature', 'https://doi.org/10.1038/nature09042'),
  ],
};
