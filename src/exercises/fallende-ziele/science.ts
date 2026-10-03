import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'fallende-ziele',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Auge und Hand zusammen: fallende Ziele sehen, ihren Weg einschätzen und im richtigen Moment antippen – später mit mehreren Zielen gleichzeitig.',
      daily: 'Etwas auffangen, das herunterfällt, Ballspiele, Spiele mit Kindern oder Enkeln.',
      research:
        'Beim Abfangen bewegter Ziele hilft es, dem Ziel mit den Augen zu folgen; wer stattdessen einen festen Punkt anschaut, liegt systematisch daneben. Bei Aufgaben am Bildschirm rechnen Menschen meist mit gleichmäßiger Bewegung, auch wenn ein Ziel beschleunigt. In der Aufgabe selbst wird man mit Übung schneller und treffsicherer – ein Teil davon ist Gewöhnung an Gerät und Aufgabe. Ein Nutzen für Ballsport, Sport oder Straßenverkehr ist nicht belegt.',
      improved:
        'Die Fallzeit vom oberen Rand bis zum Boden ist in Sekunden festgelegt, nicht in Pixeln pro Sekunde; deshalb fordern Hoch- und Querformat gleich viel, und 60- und 120-Hz-Geräte sind gleich schnell. Die Stufe passt sich nach Erfolg an (nach drei gefangenen Zielen in Folge hoch, nach einem Fehler zurück) und bestimmt Fallzeit, Größe und Zahl der gleichzeitigen Ziele (bis zu drei); ab Stufe 8 fallen die Ziele leicht beschleunigt. Ab Stufe 9 erscheinen Quadrate mit Kreuz, die man nicht antippt (Go/No-Go); sie sind an der Form erkennbar, nicht nur an der Farbe. Die Sitzung hat eine feste Dauer, ohne Zeitstrafe, ohne Wackeln und ohne roten Blitz. Der Treffer wird an der zuletzt gezeigten Position geprüft; gemessen wird die Fanghöhe als Anteil der Fallstrecke, keine Reaktionszeit.',
    },
    it: {
      trains: 'Occhio e mano insieme: vedere bersagli che cadono, stimarne il percorso e toccarli al momento giusto – più avanti con più bersagli contemporaneamente.',
      daily: 'Afferrare qualcosa che cade, giochi con la palla, giocare con bambini o nipoti.',
      research:
        'Per intercettare bersagli in movimento aiuta seguirli con gli occhi; chi guarda invece un punto fisso sbaglia in modo sistematico. Nei compiti sullo schermo di solito si conta su un movimento uniforme, anche se il bersaglio accelera. Nel compito stesso, con l’esercizio si diventa più veloci e precisi – in parte è abitudine al dispositivo e al compito. Un beneficio per lo sport con la palla, lo sport o il traffico non è dimostrato.',
      improved:
        'Il tempo di caduta dal bordo superiore al suolo è fissato in secondi, non in pixel al secondo; per questo formato verticale e orizzontale richiedono lo stesso impegno e gli schermi a 60 e 120 Hz sono ugualmente veloci. Il livello si adatta al successo (sale dopo tre bersagli presi di fila, scende dopo un errore) e determina tempo di caduta, dimensione e numero di bersagli contemporanei (fino a tre); dal livello 8 i bersagli cadono con una lieve accelerazione. Dal livello 9 compaiono quadrati con croce da non toccare (Go/No-Go), riconoscibili dalla forma e non solo dal colore. La sessione ha una durata fissa, senza penalità di tempo, senza scosse e senza lampi rossi. Il colpo è verificato sull’ultima posizione mostrata; si misura l’altezza della presa come parte del percorso di caduta, non un tempo di reazione.',
    },
  },
  sources: [
    src('Zago et al. (2004). Internal models of target motion: Expected dynamics overrides measured kinematics in timing manual interceptions. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.00862.2003'),
    src('Mrotek & Soechting (2007). Target interception: Hand–eye coordination and strategies. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.2046-07.2007'),
    src('de la Malla, Smeets & Brenner (2017). Potential systematic interception errors are avoided when tracking the target with one’s eyes. Scientific Reports', 'https://doi.org/10.1038/s41598-017-11200-5'),
    src('Casiez et al. (2017). Characterizing latency in touch and button-equipped interactive systems. UIST ’17', 'https://doi.org/10.1145/3126594.3126606'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
