import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/607-path-tracing.md und docs/uebungskatalog/literatur/lit-W08-gedaechtnis.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'leuchtpfad',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Sich eine Reihenfolge von leuchtenden Orten merken und in derselben Reihenfolge nachtippen – mit wachsender Länge, später auch rückwärts.',
      daily: 'Überall, wo man sich eine Abfolge von Orten kurz merkt: ein Weg durch ein Gebäude, Stationen an einem Gerät, eine Tastenfolge.',
      research:
        'Das Nachtippen von Blockfolgen ist eine klassische Aufgabe der Gedächtnisforschung (Corsi-Aufgabe), die das kurzzeitige Merken von Orten und Reihenfolgen erfasst. Mit Übung wird man in der Aufgabe selbst besser, und ähnliche Aufgaben profitieren etwas mehr als ganz andere – besonders beim visuell-räumlichen Merken von Reihenfolgen. Ein Teil des Trainingseffekts besteht darin, neue Merkstrategien zu lernen. Dass sich das auf den Alltag oder die allgemeine Denkleistung überträgt, ist nicht belegt, und für diese Variante gibt es keine eigene Studie.',
      improved:
        'Neun Blöcke liegen an festen, unregelmäßigen Orten, wie beim klassischen Blöckchen-Tippen der Gedächtnisforschung; die Folge springt frei zwischen den Blöcken, und jeder Block kommt höchstens einmal vor. Jeder Block leuchtet etwa 0,8 Sekunden weich auf, erkennbar an Helligkeit, dickem Rand und hellem Mittelpunkt statt nur an der Farbe, mit höchstens einem Aufleuchten pro Sekunde und ohne Blitzen. Die Länge passt sich nach oben und unten an, der zweite Fehler beendet die Runde, und beim Tippen gibt es kein Zeitlimit; Hauptwert ist die längste richtig nachgetippte Folge, ohne Normwerte. Die Rückmeldung arbeitet mit Zeichen statt mit rotem Aufblitzen, und ab einer Länge von fünf wird eine freiwillige Rückwärts-Runde angeboten.',
    },
    it: {
      trains: 'Ricordare un ordine di luoghi luminosi e toccarli nello stesso ordine – con lunghezza crescente, più avanti anche al contrario.',
      daily: 'Ovunque si ricordi per poco una successione di luoghi: un percorso in un edificio, le stazioni su un apparecchio, una sequenza di tasti.',
      research:
        'Toccare sequenze di blocchi è un compito classico della ricerca sulla memoria (compito di Corsi), che rileva il ricordo a breve termine di luoghi e ordini. Con la pratica si migliora nel compito stesso, e compiti simili ne traggono un po’ più vantaggio di compiti del tutto diversi – soprattutto per il ricordo visuo-spaziale di sequenze. Una parte dell’effetto dell’allenamento consiste nell’imparare nuove strategie di memoria. Che questo si trasferisca alla vita quotidiana o alle prestazioni mentali generali non è dimostrato, e per questa variante non esiste uno studio specifico.',
      improved:
        'Nove blocchi si trovano in posizioni fisse e irregolari, come nel classico compito di tocco dei blocchi della ricerca sulla memoria; la sequenza salta liberamente tra i blocchi e ogni blocco compare al massimo una volta. Ogni blocco si illumina in modo morbido per circa 0,8 secondi, riconoscibile da luminosità, bordo spesso e punto centrale chiaro invece che dal solo colore, con al massimo un’accensione al secondo e senza lampi. La lunghezza si adatta verso l’alto e verso il basso, il secondo errore chiude il turno e per toccare non c’è un limite di tempo; il valore principale è la sequenza più lunga toccata correttamente, senza valori di riferimento. Il riscontro usa segni invece di lampi rossi e, da una lunghezza di cinque, viene offerto un turno facoltativo al contrario.',
    },
  },
  sources: [
    src('Milner (1971). Interhemispheric differences in the localization of psychological processes in man. British Medical Bulletin', 'https://doi.org/10.1093/oxfordjournals.bmb.a070866'),
    src('Berch, Krikorian & Huha (1998). The Corsi block-tapping task: Methodological and theoretical considerations. Brain and Cognition', 'https://doi.org/10.1006/brcg.1998.1039'),
    src('Vandierendonck et al. (2004). Working memory components of the Corsi blocks task. British Journal of Psychology', 'https://doi.org/10.1348/000712604322779460'),
    src('Gathercole et al. (2019). Working memory training involves learning new skills. Journal of Memory and Language', 'https://doi.org/10.1016/j.jml.2018.10.003'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
  ],
};
