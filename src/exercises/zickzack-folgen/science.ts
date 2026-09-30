import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/513-anti-zigzag-movement-trainer.md und docs/uebungskatalog/literatur/lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'zickzack-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit dem Finger: eine Marke an einem Ziel halten, das im Zickzack läuft, und nach jedem Knick schnell wieder ins Band kommen.',
      daily: 'Einer Bewegung auf dem Bildschirm mit dem Finger folgen, die immer wieder abknickt; ein Symbol am Tablet nachführen.',
      research:
        'Wenn ein Ziel abknickt, braucht die Hand etwa eine Zehntel- bis eine Fünftelsekunde, bis sie umlenkt; kleine Richtungsänderungen werden dabei später bemerkt als große. Menschen steuern beim Nachführen auf der Fläche nicht x und y getrennt, sondern Richtung und Tempo. Die Hand korrigiert in kleinen Schüben statt stetig. Bahnen, die sich nicht vorhersagen lassen, werden mit dem Blick ungenauer verfolgt als vorhersagbare. Mit Übung wird man in der Aufgabe besser; ein Nutzen für Alltag oder Sport ist nicht belegt. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Für den Finger statt für die Maus: Die Marke sitzt über dem Finger. Die Knicke sind gerundet und das Tempo sinkt dort kurz, statt dass Richtung und Tempo springen; der Knickwinkel wächst mit der Stufe von etwa 40° auf etwa 110°. Auf den ersten Stufen zeigt eine gestrichelte Linie ein Stück der Bahn voraus. Es gibt kein „Zerstören“ und kein Neuerscheinen an anderer Stelle, nur reines Nachführen mit fester Dauer, ohne Zeitbonus, ohne roten Blitz und ohne Wackeln. Zeitbasiert statt „pro Bild“; das Toleranzband ist sichtbar (Ring und Kreuz statt nur Farbe). Hauptwert ist die Stufe, dazu Zeit im Band und mittlerer Abstand.',
    },
    it: {
      trains: 'Inseguimento con il dito: tenere un segno su un bersaglio che corre a zigzag e, dopo ogni svolta, tornare in fretta nella fascia.',
      daily: 'Seguire con il dito un movimento sullo schermo che gira di continuo; inseguire un simbolo sul tablet.',
      research:
        'Quando un bersaglio gira, la mano impiega circa da un decimo a un quinto di secondo per correggere; le piccole variazioni di direzione vengono notate più tardi di quelle grandi. Nell’inseguimento sulla superficie le persone non regolano x e y separatamente, ma direzione e velocità. La mano corregge a piccoli scatti e non in modo continuo. I percorsi imprevedibili vengono seguiti con lo sguardo in modo meno preciso di quelli prevedibili. Con la pratica si migliora nel compito; un beneficio per la vita quotidiana o lo sport non è dimostrato. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Pensato per il dito invece che per il mouse: il segno sta sopra il dito. Le svolte sono arrotondate e lì la velocità cala brevemente, invece di far saltare direzione e velocità; l’angolo di svolta cresce con il livello da circa 40° a circa 110°. Nei primi livelli una linea tratteggiata mostra un tratto del percorso in anticipo. Non ci sono «distruzione» né ricomparsa altrove, solo puro inseguimento con durata fissa, senza bonus di tempo, senza lampo rosso e senza vibrazione. Basato sul tempo invece che «per immagine»; la fascia di tolleranza è visibile (anello e croce invece del solo colore). Il valore principale è il livello, in più tempo nella fascia e distanza media.',
    },
  },
  sources: [
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Engel & Soechting (2000). Manual tracking in two dimensions. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.83.6.3483'),
    src('Brenner & Smeets (1997). Fast responses of the human hand to changes in target position. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899709600017'),
    src('Dzhafarov, Sekuler & Allik (1993). Detection of changes in speed and direction of motion: Reaction time analysis. Perception & Psychophysics', 'https://doi.org/10.3758/BF03211798'),
    src('Barnes, Donnelly & Eason (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.1987.sp016649'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
    src('Deber et al. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
  ],
};
