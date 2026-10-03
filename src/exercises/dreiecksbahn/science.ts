import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'dreiecksbahn',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Einer Kugel auf einem Dreieck mit abrupten Richtungswechseln in den Ecken mit den Augen folgen und dabei ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Ecken und Richtungswechsel im Blick behalten: ein abbiegendes Auto, ein Ball von der Wand, ein Läufer an der Ecke.',
      research:
        'Im Labor wurden wiederholte Bahnen mit Richtungswechseln nach zwei bis drei Durchgängen vorausschauend verfolgt; auf einer Vierecksbahn beginnen die Augen schon vor der Ecke, abzubremsen und in die neue Richtung zu beschleunigen. Waagrechte Dreiecksbewegungen werden bis etwa 75 Grad pro Sekunde gut verfolgt. Ein kurzes Training wirkte im Labor noch einige Tage nach. Das waren Studien mit Blickmessung, nicht mit dieser Übung. Ob sich die Reaktion auf unerwartete Ecken verkürzt, ist nicht belegt, ebenso wenig ein Nutzen für Sport oder Alltag. Klinisch wird die Folgebewegung der Augen geprüft, indem sie einem nahen Ziel folgen, das in einem H geführt wird (Muchnick, 2008); diese Übung ist keine solche Prüfung.',
      improved:
        'In der Kugel erscheint kurz ein Landolt-Ring, den du mit einem großen Button meldest – nur auf den Kanten und nie in der Ecke, damit der Richtungswechsel nicht mit dem Erkennen zusammenfällt. Ob die Augen wirklich folgen, wird nicht gemessen, nur ob du das Zeichen erkennst. Die Bahn ist ein echtes gleichseitiges Dreieck, und die Kugel läuft auf allen Kanten gleich schnell, damit die Ecken die einzige Änderung sind. Auf niedrigen Stufen sind die Ecken abgerundet, ab Stufe 9 spitz; die Bahn ist höchstens etwa 60 % der Bildschirmbreite breit.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera su un triangolo con bruschi cambi di direzione agli angoli e riconoscere un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio angoli e cambi di direzione: un’auto che svolta, una palla dalla parete, un corridore all’angolo.',
      research:
        'In laboratorio percorsi ripetuti con cambi di direzione sono stati seguiti in modo previsionale dopo due o tre passaggi; su un percorso quadrato gli occhi iniziano a frenare e ad accelerare nella nuova direzione già prima dell’angolo. Movimenti triangolari orizzontali vengono seguiti bene fino a circa 75 gradi al secondo. Un breve allenamento ha avuto effetto in laboratorio ancora per alcuni giorni. Erano studi con misurazione dello sguardo, non con questo esercizio. Non è dimostrato che la reazione ad angoli inattesi si accorci, né un beneficio per lo sport o la vita quotidiana. Dal punto di vista clinico, l’inseguimento oculare si valuta facendo seguire un bersaglio vicino spostato a forma di H (Muchnick, 2008); questo esercizio non è una valutazione di questo tipo.',
      improved:
        'Nella sfera compare per un attimo un anello di Landolt, che segnali con un grande pulsante – solo sui lati e mai nell’angolo, perché il cambio di direzione non coincida con il riconoscimento. Se gli occhi seguono davvero, non viene misurato, ma solo se riconosci il segno. Il percorso è un vero triangolo equilatero e la sfera corre alla stessa velocità su tutti i lati, così gli angoli sono l’unica variazione. Ai livelli bassi gli angoli sono arrotondati, dal livello 9 sono netti; il percorso è largo al massimo circa il 60 % dello schermo.',
    },
  },
  sources: [
    src(
      'Barnes & Schmid (2002). Sequence learning in human ocular smooth pursuit. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-002-1050-8',
    ),
    src(
      'Barnes & Collins (2015). Influence of predictability on control of extra-retinal components of smooth pursuit during prolonged 2D tracking. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-014-4164-x',
    ),
    src(
      'Buizza & Schmid (1986). Velocity characteristics of smooth pursuit eye movements to different patterns of target motion. Experimental Brain Research',
      'https://doi.org/10.1007/BF00236858',
    ),
    src(
      'Soechting, Mrotek & Flanders (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-004-2010-2',
    ),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 32–35', 'https://openlibrary.org/isbn/9780323029612'),
    src(
      'Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-012-3009-8',
    ),
  ],
};
