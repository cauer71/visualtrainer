import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/515-vertical-air-track.md und docs/uebungskatalog/literatur/lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'hoch-runter-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit dem Finger: eine Marke an einem Ziel halten, das überwiegend senkrecht in weichen Bögen hoch und herunter springt.',
      daily: 'Einer auf und ab bewegten Anzeige mit dem Finger folgen, einen senkrechten Regler nachführen, einem Ball mit dem Blick folgen.',
      research:
        'Menschen fangen beschleunigte Objekte gut ab, obwohl sie Beschleunigung mit dem Auge schlecht beurteilen; die Fehler sinken, wenn immer dieselbe Beschleunigung vorkommt. Die Hand steuert dabei fortlaufend nach dem Tempo des Ziels und reagiert auf eine Änderung erst nach etwa einer Zehntel- bis einer Fünftelsekunde. Folgt man einem Ziel mit der Hand, bleibt der Blick eher am Ziel. Die Hand korrigiert in kleinen Schüben statt stetig. Mit Übung wird man in der Aufgabe besser; ein Nutzen für Alltag oder Sport ist nicht belegt. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Für den Finger statt für die Maus: Die Marke sitzt über dem Finger. Die Schwerkraft ist je Stufe fest, damit sich die Fallkurve einprägen kann; nur die Scheitelhöhe schwankt von Bogen zu Bogen. Der Boden ist weich, das Tempo kehrt sich ohne Knick um. Extra-Schübe nach oben (ab Stufe 4) werden mit einem Pfeil vorher angekündigt, statt ohne Vorwarnung zu kommen. Keine Zeitabzüge, kein Zeitbonus, kein roter Blitz, kein Wackeln; feste Dauer je Durchgang. Zeitbasiert statt „pro Bild“; das Band ist sichtbar (Ring und Kreuz statt nur Farbe); das Ziel bleibt innerhalb des Felds. Hauptwert ist die Stufe, dazu Zeit im Band und mittlerer Abstand.',
    },
    it: {
      trains: 'Inseguimento con il dito: tenere un segno su un bersaglio che salta su e giù in archi morbidi, per lo più in verticale.',
      daily: 'Seguire con il dito un indicatore che si muove su e giù, guidare un cursore verticale, seguire una palla con lo sguardo.',
      research:
        'Le persone intercettano bene gli oggetti che accelerano, anche se con gli occhi valutano male l’accelerazione; gli errori diminuiscono quando si presenta sempre la stessa accelerazione. La mano si regola di continuo sulla velocità del bersaglio e reagisce a un cambio solo dopo circa da un decimo a un quinto di secondo. Quando si segue un bersaglio con la mano, lo sguardo tende a restare sul bersaglio. La mano corregge a piccoli scatti e non in modo continuo. Con la pratica si migliora nel compito; un beneficio per la vita quotidiana o lo sport non è dimostrato. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Pensato per il dito invece che per il mouse: il segno sta sopra il dito. La gravità è fissa per livello, così la curva di caduta si può memorizzare; varia solo l’altezza del culmine da un arco all’altro. Il suolo è morbido, la velocità si inverte senza spigolo. Le spinte extra verso l’alto (dal livello 4) sono annunciate da una freccia invece di arrivare senza preavviso. Nessuna penalità di tempo, nessun bonus di tempo, nessun lampo rosso, nessuna vibrazione; durata fissa per turno. Basato sul tempo invece che «per immagine»; la fascia è visibile (anello e croce invece del solo colore); il bersaglio resta dentro il campo. Il valore principale è il livello, in più tempo nella fascia e distanza media.',
    },
  },
  sources: [
    src('Brenner et al. (2016). How can people be so good at intercepting accelerating objects if they are so poor at visually judging acceleration? i-Perception', 'https://doi.org/10.1177/2041669515624317'),
    src('Brenner, Smeets & de Lussanet (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. Experimental Brain Research', 'https://doi.org/10.1007/s002210050535'),
    src('Danion & Flanagan (2018). Different gaze strategies during eye versus hand tracking of a moving target. Scientific Reports', 'https://doi.org/10.1038/s41598-018-28434-6'),
    src('Engel & Soechting (2000). Manual tracking in two dimensions. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.83.6.3483'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Elliott et al. (2010). Goal-directed aiming: Two components but multiple processes. Psychological Bulletin', 'https://doi.org/10.1037/a0020958'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
  ],
};
