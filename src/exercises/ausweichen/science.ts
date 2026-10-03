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
        'Die Figur sitzt über dem Finger, damit die Hand nichts verdeckt; Abheben des Fingers ist eine Pause. Die Hindernisse gleiten langsam und geradlinig, die Hälfte zielt auf die Stelle der Figur beim Erscheinen, sodass der Weg abschätzbar ist. Eine Berührung zeigt ein weiches Symbol und eine Pause von einer Sekunde, das Hindernis blendet aus – ohne Blitz, ohne Bildwackeln, ohne Leben und ohne Zeitstrafe. Die Berührung wird entlang der Strecke zwischen zwei Bildern geprüft, nichts springt durch. Eine Sitzung hat eine feste Zahl an Abschnitten; ein Abschnitt ohne Berührung ist ein Erfolg, und die Schwierigkeit passt sich nach oben und unten an. Kugeln und Quader unterscheiden sich durch Form und Muster, nicht nur durch die Farbe.',
    },
    it: {
      trains: 'Prevedere i movimenti: aprire con il dito un percorso per una figura tra sfere e blocchi che scivolano lentamente, senza toccarli.',
      daily: 'Schivare in tempo tra la folla o sul marciapiede, giochi con la palla, usare con precisione le superfici touch.',
      research:
        'Camminando e schivando, la direzione viene continuamente “respinta” dagli ostacoli e “attratta” dalla meta; il percorso nasce strada facendo. Chi intercetta un bersaglio in movimento ne anticipa il movimento di circa un sesto di secondo, e il cervello prevede con modelli interni le conseguenze del proprio movimento. I compiti sullo schermo migliorano con l’esercizio; in gran parte si tratta di abitudine al compito e al dispositivo. Su questo esercizio non esiste alcuno studio e un beneficio per lo sport o la vita quotidiana non è dimostrato. Dove guardi con gli occhi qui non viene misurato – solo quando vieni toccato.',
      improved:
        'La figura sta sopra il dito, così la mano non copre nulla; sollevare il dito è una pausa. Gli ostacoli scivolano lenti e in linea retta, metà punta sulla posizione della figura al momento della comparsa, così il percorso è stimabile. Un contatto mostra un simbolo morbido e una pausa di un secondo, l’ostacolo svanisce – senza lampi, senza scosse dello schermo, senza vite e senza penalità di tempo. Il contatto viene controllato lungo il tratto tra due immagini, nulla salta attraverso. Una sessione ha un numero fisso di sezioni; una sezione senza contatto è un successo e la difficoltà si adatta verso l’alto e verso il basso. Sfere e blocchi si distinguono per forma e motivo, non solo per il colore.',
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
