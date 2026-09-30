import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/305-visual-tracking-speed-test.md und docs/uebungskatalog/literatur/lit-W03-reaktion.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'abprall-fang',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Bahnen vorausdenken: einem gleitenden Punkt zusehen und vorab die Stelle am Rand antippen, an der er abprallt – später schon den übernächsten Abprall.',
      daily: 'Ballspiele, Dinge, die abprallen oder um die Ecke verschwinden, Bewegungen vorausahnen.',
      research:
        'Wer ein bewegtes Ziel abfangen will, folgt ihm meist mit den Augen, und die Hand „eilt“ der Bewegung ein Stück voraus. Nach einem Abprall geht der Blick mit etwas Erfahrung schon vorab dorthin, wo das Ziel gleich sein wird; das wurde an einem Ballspiel in virtueller Realität gezeigt. Aufgaben dieser Art werden mit Übung besser, ein großer Teil davon ist aber Gewöhnung an Aufgabe und Gerät. Zu genau dieser Übung gibt es keine Studie, und ein Nutzen für Sport oder Straßenverkehr ist nicht belegt. Wohin deine Augen schauen, wird hier nicht gemessen – nur, wohin du tippst.',
      improved:
        'Rand als Rahmen sichtbar statt unsichtbar, gleichmäßiges Tempo und Zeit bis zum Abprall als Schwierigkeit (Hoch- und Querformat fordern gleich viel, 60- und 120-Hz-Geräte sind gleich schnell), Schwierigkeit in beide Richtungen angepasst, feste Zahl an Durchgängen ohne Zeitbonus und Zeitstrafe, kein roter Blitz und kein Bildwackeln. Statt einer „Reaktionszeit“ zählt der Abstand zwischen Tipp und Abprallort in Prozent; danach siehst du, wo der Punkt wirklich abprallt.',
    },
    it: {
      trains: 'Prevedere le traiettorie: guardare un punto che scivola e toccare in anticipo il punto del bordo in cui rimbalza – più avanti già il secondo rimbalzo.',
      daily: 'Giochi con la palla, cose che rimbalzano o spariscono dietro l’angolo, prevedere i movimenti.',
      research:
        'Chi vuole intercettare un bersaglio in movimento di solito lo segue con gli occhi, e la mano “anticipa” un po’ il movimento. Dopo un rimbalzo, con un po’ di esperienza lo sguardo va in anticipo dove il bersaglio sarà a breve; lo si è mostrato con un gioco di palla in realtà virtuale. Compiti di questo tipo migliorano con l’esercizio, ma in gran parte si tratta di abitudine al compito e al dispositivo. Su questo esercizio non esiste alcuno studio e un beneficio per lo sport o il traffico non è dimostrato. Dove guardi con gli occhi qui non viene misurato – solo dove tocchi.',
      improved:
        'Bordo visibile come cornice invece che invisibile, velocità costante e tempo fino al rimbalzo come difficoltà (formato verticale e orizzontale richiedono lo stesso impegno, schermi a 60 e 120 Hz ugualmente veloci), difficoltà adattata in entrambe le direzioni, numero fisso di prove senza bonus né penalità di tempo, niente lampo rosso né scosse dello schermo. Al posto di un “tempo di reazione” conta la distanza tra tocco e punto di rimbalzo in percentuale; poi vedi dove il punto rimbalza davvero.',
    },
  },
  sources: [
    src('Mrotek & Soechting (2007). Target interception: Hand–eye coordination and strategies. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.2046-07.2007'),
    src('de la Malla, Smeets & Brenner (2017). Potential systematic interception errors are avoided when tracking the target with one’s eyes. Scientific Reports', 'https://doi.org/10.1038/s41598-017-11200-5'),
    src('Diaz, Cooper, Rothkopf & Hayhoe (2013). Saccades to future ball location reveal memory-based prediction in a virtual-reality interception task. Journal of Vision', 'https://doi.org/10.1167/13.1.20'),
    src('Spering, Schütz, Braun & Gegenfurtner (2011). Keep your eyes on the ball: Smooth pursuit eye movements enhance prediction of visual motion. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.00344.2010'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
  ],
};
