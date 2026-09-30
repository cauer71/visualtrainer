import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/605-object-location.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'wo-war-es',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Sich merken, welches Symbol an welchem Ort lag, und den Ort später antippen – mit immer mehr Symbolen.',
      daily: 'Überall, wo man sich merkt, was wo liegt: Dinge im Regal, Schilder an einer Kreuzung, Gegenstände auf dem Tisch.',
      research:
        'Die Verknüpfung von „was“ und „wo“ ist ein eigener Teil des Arbeitsgedächtnisses und geht leichter verloren als das Merken einzelner Orte. In einem großen Online-Training wurde jede geübte Aufgabe besser, aber es gab keine Übertragung auf eng verwandte Aufgaben, darunter eine Objekt-Ort-Aufgabe. Studien speziell zum Training des Objekt-Ort-Gedächtnisses wurden nicht gefunden, und ob besseres Merken von Schlüsseln oder Parkplätzen folgt, ist nicht untersucht. Merkhilfen wie Ankerpunkte helfen in solchen Aufgaben, sind aber aufgabenspezifisch.',
      improved:
        'Eigener Formensatz mit klar verschiedenen Umrissen statt Emojis (auf jedem Gerät gleich, keine ähnlichen Paare), Farbe nur als Zusatz. Die Stufe passt sich nach oben und unten an (Zweier-Treppe), das Raster wächst mit der Symbolzahl, die Einprägezeit auch. Alle Felder sehen nach dem Verdecken gleich aus, sodass nichts verrät, wo Symbole lagen. Gewertet werden der Abstand zum richtigen Feld in % der Kantenlänge und Verwechslungen mit anderen Symbolen; Rückmeldung mit Zeichen, ohne rotes Aufblitzen und ohne Zeitdruck bei der Antwort.',
    },
    it: {
      trains: 'Ricordare quale simbolo era in quale posto e toccare il posto più tardi – con sempre più simboli.',
      daily: 'Ovunque si ricordi cosa sta dove: oggetti sullo scaffale, cartelli a un incrocio, cose sul tavolo.',
      research:
        'Il legame tra «cosa» e «dove» è una parte a sé della memoria di lavoro e si perde più facilmente del ricordo dei soli luoghi. In un grande allenamento online ogni compito esercitato è migliorato, ma non c’è stato trasferimento a compiti strettamente affini, tra cui un compito oggetto-posto. Non sono stati trovati studi specifici sull’allenamento della memoria oggetto-posto, e se ne derivi un migliore ricordo di chiavi o parcheggi non è stato studiato. Aiuti come i punti di riferimento funzionano in compiti simili, ma sono specifici del compito.',
      improved:
        'Un proprio set di forme con contorni ben distinti invece delle emoji (uguale su ogni dispositivo, nessuna coppia simile), colore solo come aggiunta. Il livello si adatta verso l’alto e verso il basso (scala a due), la griglia cresce con il numero di simboli, e anche il tempo di memorizzazione. Dopo la copertura tutti i campi appaiono uguali, così nulla rivela dove fossero i simboli. Si valutano la distanza dal campo giusto in % del lato e gli scambi con altri simboli; riscontro con segni, senza lampi rossi e senza fretta nella risposta.',
    },
  },
  sources: [
    src('Owen et al. (2010). Putting brain training to the test. Nature', 'https://doi.org/10.1038/nature09042'),
    src('Postma, Kessels & van Asselen (2008). How the brain remembers and forgets where things are: The neurocognition of object-location memory. Neuroscience & Biobehavioral Reviews', 'https://doi.org/10.1016/j.neubiorev.2008.05.001'),
    src('Pertzov et al. (2012). Forgetting what was where: The fragility of object-location binding. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0048214'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
    src('Levitt (1971). Transformed up-down methods in psychoacoustics. Journal of the Acoustical Society of America', 'https://doi.org/10.1121/1.1912375'),
  ],
};
