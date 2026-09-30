import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/512-anti-strafe-jitter-duel.md und docs/uebungskatalog/literatur/lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'ausweich-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit dem Finger: eine Marke waagrecht an einem Ziel halten, das Richtung und Tempo wechselt, und nach jedem Wechsel schnell wieder ins Band kommen.',
      daily: 'Einer wechselnden Bewegung auf dem Bildschirm mit dem Finger folgen, einen Regler nachführen, der plötzlich die Richtung ändert.',
      research:
        'Nach einem Richtungswechsel braucht die Hand etwa eine Zehntel- bis eine Fünftelsekunde, bis sie gegenlenkt; bis dahin läuft die Marke ein Stück in die alte Richtung weiter. Manuelles Nachführen korrigiert zudem in kleinen Schüben statt stetig. Wenn die eigene Hand mitführt, folgt auch das Auge dem Ziel genauer. Mit Übung wird man in genau dieser Aufgabe besser; für einen Nutzen im Alltag oder im Sport gibt es keinen Beleg. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Für den Finger statt für die Maus: Die Marke sitzt über dem Finger, der Finger darf irgendwo auf der Fläche liegen, nur seine Seite zählt. Das Ziel „weicht“ nur scheinbar aus – der Ablauf steht vorab fest und hängt nicht von deiner Marke ab. Tempo und Richtung wechseln weich statt sprunghaft, das Toleranzband ist sichtbar, und zum Farbwechsel kommt eine Form (Ring und Kreuz). Zeitbasiert statt „pro Bild“, feste Dauer je Durchgang ohne Zeitbonus, kein roter Blitz, kein Wackeln. Die Stufe steigt und sinkt mit deinem Erfolg; Hauptwert ist die Stufe, dazu Zeit im Band und mittlerer Abstand.',
    },
    it: {
      trains: 'Inseguimento con il dito: tenere un segno in orizzontale su un bersaglio che cambia direzione e velocità e, dopo ogni cambio, tornare in fretta nella fascia.',
      daily: 'Seguire con il dito un movimento che cambia sullo schermo, guidare un cursore che cambia direzione all’improvviso.',
      research:
        'Dopo un cambio di direzione la mano impiega circa da un decimo a un quinto di secondo per sterzare in senso opposto; fino ad allora il segno continua un tratto nella direzione vecchia. L’inseguimento manuale inoltre corregge a piccoli scatti e non in modo continuo. Quando guida la mano, anche l’occhio segue il bersaglio con maggiore precisione. Con la pratica si migliora proprio in questo compito; per un beneficio nella vita quotidiana o nello sport non ci sono prove. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Pensato per il dito invece che per il mouse: il segno sta sopra il dito, il dito può stare ovunque sulla superficie, conta solo il suo lato. Il bersaglio schiva solo in apparenza – lo svolgimento è stabilito prima e non dipende dal tuo segno. Velocità e direzione cambiano in modo morbido e non a scatti, la fascia di tolleranza è visibile e oltre al colore c’è una forma (anello e croce). Basato sul tempo invece che «per immagine», durata fissa per turno senza bonus di tempo, nessun lampo rosso, nessuna vibrazione. Il livello sale e scende con il tuo successo; il valore principale è il livello, in più tempo nella fascia e distanza media.',
    },
  },
  sources: [
    src('Brenner & Smeets (1997). Fast responses of the human hand to changes in target position. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899709600017'),
    src('Brenner, Smeets & de Lussanet (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. Experimental Brain Research', 'https://doi.org/10.1007/s002210050535'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Dzhafarov, Sekuler & Allik (1993). Detection of changes in speed and direction of motion: Reaction time analysis. Perception & Psychophysics', 'https://doi.org/10.3758/BF03211798'),
    src('Engel & Soechting (2000). Manual tracking in two dimensions. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.83.6.3483'),
    src('de Brouwer et al. (2002). What triggers catch-up saccades during visual tracking? Journal of Neurophysiology', 'https://doi.org/10.1152/jn.00432.2001'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
    src('Deber et al. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
  ],
};
