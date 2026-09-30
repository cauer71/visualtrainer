import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/803-quick-dodge.md und docs/uebungskatalog/literatur/lit-W10-koerper-a.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'ausweichen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Bewegungen vorausdenken: einer Figur mit dem Finger den Weg durch langsam gleitende Kugeln und Quader bahnen, ohne sie zu berühren.',
      daily: 'In der Menschenmenge oder auf dem Gehweg rechtzeitig ausweichen, Ballspiele, genaues Bedienen von Touch-Oberflächen.',
      research:
        'Beim Gehen und Ausweichen wird die Richtung ständig durch Hindernisse „abgestoßen“ und durch das Ziel „angezogen“; die Route entsteht laufend beim Gehen. Wer ein bewegtes Ziel abfängt, nimmt dessen Bewegung schon etwa eine Sechstelsekunde vorweg, und das Gehirn sagt mit inneren Modellen die Folgen der eigenen Bewegung voraus. Aufgaben am Bildschirm werden mit Übung besser; ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät. Zu dieser Übung gibt es keine Studie, und ein Nutzen für Sport oder Alltag ist nicht belegt. Wohin deine Augen schauen, wird hier nicht gemessen – nur, wann du berührt wirst.',
      improved:
        'Für den Finger gebaut: Die Figur sitzt über dem Finger, der Finger verdeckt nichts; Abheben ist eine Pause. Hindernisse gleiten langsam und geradlinig, die Hälfte zielt auf die Stelle der Figur – der Weg ist abschätzbar. Berührung = weiches ✗ und 1 s Pause statt rotem Blitz, Bildwackeln oder Löschen aller Kugeln; keine Leben, keine Zeitstrafe. Kollision wird entlang der Strecke zwischen zwei Bildern geprüft (kein Durchspringen). Feste Zahl an Abschnitten, Schwierigkeit in beide Richtungen angepasst, statt einer Punkte-Spirale, in der jede Runde mit Treffern endet. Kugeln und Quader unterscheiden sich durch Form und Muster, nicht nur durch die Farbe.',
    },
    it: {
      trains: 'Prevedere i movimenti: aprire con il dito un percorso per una figura tra sfere e blocchi che scivolano lentamente, senza toccarli.',
      daily: 'Schivare in tempo tra la folla o sul marciapiede, giochi con la palla, usare con precisione le superfici touch.',
      research:
        'Camminando e schivando, la direzione viene continuamente “respinta” dagli ostacoli e “attratta” dalla meta; il percorso nasce strada facendo. Chi intercetta un bersaglio in movimento ne anticipa il movimento di circa un sesto di secondo, e il cervello prevede con modelli interni le conseguenze del proprio movimento. I compiti sullo schermo migliorano con l’esercizio; in gran parte si tratta di abitudine al compito e al dispositivo. Su questo esercizio non esiste alcuno studio e un beneficio per lo sport o la vita quotidiana non è dimostrato. Dove guardi con gli occhi qui non viene misurato – solo quando vieni toccato.',
      improved:
        'Pensato per il dito: la figura sta sopra il dito, il dito non copre nulla; sollevare il dito è una pausa. Gli ostacoli scivolano lenti e in linea retta, metà punta sulla posizione della figura – il percorso è stimabile. Contatto = un ✗ morbido e 1 s di pausa invece di lampo rosso, scosse dello schermo o cancellazione di tutte le sfere; niente vite, niente penalità di tempo. La collisione viene controllata lungo il tratto tra due immagini (nessun salto attraverso). Numero fisso di sezioni, difficoltà adattata in entrambe le direzioni, invece di una spirale di punti in cui ogni partita finisce in contatti. Sfere e blocchi si distinguono per forma e motivo, non solo per il colore.',
    },
  },
  sources: [
    src('Fajen & Warren (2003). Behavioral dynamics of steering, obstacle avoidance, and route selection. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.29.2.343'),
    src('Mrotek & Soechting (2007). Target interception: Hand–eye coordination and strategies. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.2046-07.2007'),
    src('Wolpert, Miall & Kawato (1998). Internal models in the cerebellum. Trends in Cognitive Sciences', 'https://doi.org/10.1016/S1364-6613(98)01221-2'),
    src('Green & Bavelier (2003). Action video game modifies visual selective attention. Nature', 'https://doi.org/10.1038/nature01647'),
    src('Boot, Kramer, Simons, Fabiani & Gratton (2008). The effects of video game playing on attention, memory, and executive control. Acta Psychologica', 'https://doi.org/10.1016/j.actpsy.2008.09.005'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
