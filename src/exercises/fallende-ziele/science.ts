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
        'Fallzeit in Sekunden statt Pixeln pro Sekunde (Hoch- und Querformat fordern gleich viel, 60- und 120-Hz-Geräte sind gleich schnell), Schwierigkeit in beide Richtungen angepasst, feste Dauer ohne Zeitstrafe, kein rotes Blitzen und kein Wackeln, Formen statt nur Farben, Go/No-Go-Quadrate erst ab höherer Stufe, Treffer an der gezeigten Position und die Fanghöhe statt einer „Reaktionszeit“ als Messgröße.',
    },
    it: {
      trains: 'Occhio e mano insieme: vedere bersagli che cadono, stimarne il percorso e toccarli al momento giusto – più avanti con più bersagli contemporaneamente.',
      daily: 'Afferrare qualcosa che cade, giochi con la palla, giocare con bambini o nipoti.',
      research:
        'Per intercettare bersagli in movimento aiuta seguirli con gli occhi; chi guarda invece un punto fisso sbaglia in modo sistematico. Nei compiti sullo schermo di solito si conta su un movimento uniforme, anche se il bersaglio accelera. Nel compito stesso, con l’esercizio si diventa più veloci e precisi – in parte è abitudine al dispositivo e al compito. Un beneficio per lo sport con la palla, lo sport o il traffico non è dimostrato.',
      improved:
        'Tempo di caduta in secondi invece di pixel al secondo (formato verticale e orizzontale richiedono lo stesso impegno, schermi a 60 e 120 Hz ugualmente veloci), difficoltà adattata in entrambe le direzioni, durata fissa senza penalità di tempo, niente lampi rossi né scosse, forme invece di soli colori, quadrati Go/No-Go solo da un livello più alto, colpi valutati sulla posizione mostrata e altezza della presa come misura invece di un “tempo di reazione”.',
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
