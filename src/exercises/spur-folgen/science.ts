import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/707-tracing.md und docs/uebungskatalog/literatur/lit-W09-motorik.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'spur-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit der Hand: einer laufenden Wellenlinie mit der Fingerhöhe folgen und die Marke im Toleranzband halten.',
      daily: 'Linien am Tablet nachzeichnen, einer Bewegung auf dem Bildschirm mit dem Finger folgen, Regler gleichmäßig führen.',
      research:
        'Dem Verlauf einer Bahn mit Vorschau zu folgen ist eine klassische Aufgabe der Bewegungsforschung: Menschen nutzen die sichtbare Vorschau, um die Hand vorauszusteuern. Die Hand korrigiert dabei nicht stetig, sondern in kleinen Schüben, und schnellere Bewegungen streuen stärker. Mit Übung wird man in der Aufgabe besser; wird immer dieselbe Bahn gezeigt, lernt man sie auswendig. Motorisches Lernen bleibt eng an die geübte Aufgabe gebunden. Ein Nutzen für den Alltag ist nicht belegt. Gemessen wird die Fingerhöhe gegen die Linie, nicht der Blick. Die ärztliche Prüfung der Augenfolgebewegungen ist etwas anderes; diese Übung ist keine Prüfung (Muchnick, 2008, S. 32–35).',
      improved:
        'Die Linie läuft in Echtzeit und auf Geräten mit 60 oder 120 Hz gleich schnell. Das Toleranzband ist sichtbar und wird senkrecht zur Linie gemessen; es wird weich eingeblendet, ohne Blitze. Die Marke sitzt über dem Finger, der Finger darf links von der Marke irgendwo liegen, und nur seine Höhe zählt; Abheben ist eine Pause. Jeder Durchgang hat eine neue Welle, damit man sie nicht auswendig lernt. Tempo, Höhe und Frequenz steigen mit der Stufe und passen sich nach oben und unten an. Hauptwert ist die Stufe, dazu kommen die Zeit im Band und die mittlere Abweichung.',
    },
    it: {
      trains: 'Inseguimento con la mano: seguire con l’altezza del dito una linea ondulata che scorre e tenere il segno nella fascia di tolleranza.',
      daily: 'Ripassare linee sul tablet, seguire con il dito un movimento sullo schermo, guidare con regolarità un cursore.',
      research:
        'Seguire il percorso di una traccia con anteprima è un compito classico della ricerca sul movimento: le persone usano l’anteprima visibile per guidare la mano in anticipo. La mano non corregge in modo continuo ma a piccoli scatti, e i movimenti più veloci hanno più dispersione. Con la pratica si migliora nel compito; se viene mostrato sempre lo stesso percorso, lo si impara a memoria. L’apprendimento motorio resta strettamente legato al compito esercitato. Un beneficio per la vita quotidiana non è dimostrato. Si misura l’altezza del dito rispetto alla linea, non lo sguardo. L’esame medico dei movimenti oculari di inseguimento è un’altra cosa; questo esercizio non è un esame (Muchnick, 2008, pp. 32–35).',
      improved:
        'La linea scorre in tempo reale e con la stessa velocità su dispositivi a 60 o 120 Hz. La fascia di tolleranza è visibile e misurata in perpendicolare alla linea; compare in modo graduale, senza lampi. Il segno sta sopra il dito, il dito può stare a sinistra del segno e conta solo la sua altezza; sollevare il dito è una pausa. Ogni turno ha un’onda nuova, così non la si impara a memoria. Velocità, altezza e frequenza aumentano con il livello e si adattano verso l’alto e verso il basso. Il valore principale è il livello, in più il tempo nella fascia e lo scostamento medio.',
    },
  },
  sources: [
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('van der El et al. (2016). An empirical human controller model for preview tracking tasks. IEEE Transactions on Cybernetics', 'https://doi.org/10.1109/TCYB.2015.2482984'),
    src('Harris & Wolpert (1998). Signal-dependent noise determines motor planning. Nature', 'https://doi.org/10.1038/29528'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
    src('Lang et al. (2013). Implicit sequence learning in a continuous pursuit-tracking task. Psychological Research', 'https://doi.org/10.1007/s00426-012-0460-x'),
    src('Vogel & Baudisch (2007). Shift: A technique for operating pen-based interfaces using touch. CHI ’07', 'https://doi.org/10.1145/1240624.1240727'),
    src('Karni et al. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. Nature', 'https://doi.org/10.1038/377155a0'),
    src('Muchnick BG (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 32–35', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
