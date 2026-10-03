import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/811-complex-pattern.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'muster-nachzeichnen',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Sich einen kurz gezeigten Linienzug über mehrere Punkte merken und ihn in richtiger Reihenfolge mit dem Finger nachzeichnen.',
      daily: 'Überall, wo man sich eine Form oder einen Weg kurz merkt und ihn wiedergibt: eine Wegbeschreibung, ein Muster abzeichnen, eine Tastenfolge auf dem Touchscreen.',
      research:
        'Das Merken von Mustern und Reihenfolgen von Orten gehört zum visuell-räumlichen Kurzzeitgedächtnis. Es fasst nur wenige Einheiten, etwa vier, wenn man nichts zusammenfassen kann; ein zusammenhängender Weg lässt sich aber als eine Form merken. Kreuzungen und Winkel im Weg erschweren das Nachzeichnen. Mit Übung wird man in der Aufgabe selbst besser, teils weil man Merkstrategien lernt; Studien zu Gedächtnistraining finden aber kaum Wirkung auf andere Fähigkeiten oder den Alltag. Für diese Übung gibt es keine eigene Studie. Neu auftretende Gedächtnisstörungen, Doppelbilder, plötzliche Sehverschlechterung oder Schwindel gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
      improved:
        'Der Linienzug hat Pfeile und einen als Dreieck markierten Start, wird weich ein- und ausgeblendet und liegt auf festen Stützpunkten, an denen jede Strecke klar vorbeiführt. Gezeichnet wird mit dem Finger am Bildschirm (keine Körperübung): Man tippt die Stützpunkte an oder fährt sie an, und die eigene Linie wächst mit. Gezählt wird, wie viele Stützpunkte in der richtigen Reihenfolge getroffen wurden – ein vergessener Punkt verschiebt nicht alle folgenden –, und danach siehst du das richtige Muster mit ✓/✗ an jedem Punkt. Länge, Einprägezeit und Kreuzungen passen sich dem Erfolg nach oben und unten an; ein Durchgang gelingt bei mindestens 80 % richtigen Punkten. Beim Zeichnen gibt es keinen Zeitdruck, kein rotes Blitzen und kein Wackeln.',
    },
    it: {
      trains: 'Ricordare un tracciato su più punti mostrato per poco e ridisegnarlo con il dito nell’ordine giusto.',
      daily: 'Ovunque si ricordi per poco una forma o un percorso e lo si riproduca: un’indicazione stradale, ricopiare uno schema, una sequenza di tasti sul touchscreen.',
      research:
        'Ricordare schemi e ordini di luoghi fa parte della memoria a breve termine visuo-spaziale. Contiene poche unità, circa quattro, se non si può raggruppare nulla; un percorso continuo si può però ricordare come un’unica forma. Incroci e angoli nel percorso rendono più difficile il ridisegno. Con la pratica si migliora nel compito stesso, in parte perché si imparano strategie di memoria; gli studi sull’allenamento della memoria trovano però pochi effetti su altre capacità o sulla vita quotidiana. Per questo esercizio non esiste uno studio specifico. Disturbi della memoria di nuova insorgenza, visione doppia, improvviso peggioramento della vista o vertigini vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
      improved:
        'Il tracciato ha frecce e un inizio segnato con un triangolo, appare e scompare in modo morbido e poggia su punti fissi, accanto ai quali ogni tratto passa con chiarezza. Si disegna con il dito sullo schermo (non è un esercizio fisico): si toccano i punti o si percorrono con il dito, e la propria linea cresce. Si conta quanti punti sono stati toccati nell’ordine giusto – un punto dimenticato non sposta tutti i successivi –, poi vedi lo schema corretto con ✓/✗ su ogni punto. Lunghezza, tempo di memorizzazione e incroci si adattano al successo verso l’alto e verso il basso; un turno riesce con almeno l’80 % di punti corretti. Nel disegnare non c’è pressione di tempo, nessun lampo rosso, nessuna scossa.',
    },
  },
  sources: [
    src('Cowan (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences', 'https://doi.org/10.1017/S0140525X01003922'),
    src('Della Sala, Gray, Baddeley, Allamano & Wilson (1999). Pattern span: A tool for unwelding visuo-spatial memory. Neuropsychologia', 'https://doi.org/10.1016/S0028-3932(98)00159-6'),
    src('Parmentier, Elford & Maybery (2005). Transitional information in spatial serial memory: Path characteristics affect recall performance. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/0278-7393.31.3.412'),
    src('Melby-Lervåg, Redick & Hulme (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". Perspectives on Psychological Science', 'https://doi.org/10.1177/1745691616635612'),
    src('Brockmole & Logie (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8-75. Frontiers in Psychology', 'https://doi.org/10.3389/fpsyg.2013.00012'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6, 7, 28–30 (Warnzeichen mit Abklärungsbedarf; Gedächtnisprüfung als klinische Untersuchung)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
