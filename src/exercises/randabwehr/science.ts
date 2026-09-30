import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/801-peripheral-threat-sweeper.md und docs/uebungskatalog/literatur/lit-W10-koerper-a.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'randabwehr',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Den Rand beachten, während die Mitte der Fixpunkt bleibt: langsame Punkte kommen von allen Seiten auf die Mitte zu und werden angetippt, bevor sie dort sind.',
      daily: 'Etwas bemerken, das von der Seite kommt, während du geradeaus schaust – zu Fuß, beim Spielen mit Kindern, bei Ballspielen.',
      research:
        'Die Aufmerksamkeit kann sich zu einem Ort am Rand wenden, ohne dass die Augen dorthin gehen. In Studien schnitten Ältere nach Übungen, die Mitte und Rand kombinieren, in einer Aufgabe zum nutzbaren Sehfeld besser ab; diese Übungen sind aber anders aufgebaut als dieses Spiel. Bei Actionspielen sind die Befunde widersprüchlich. Für Randsehen-Werkzeuge im Sport ist ein Nutzen nicht nachgewiesen, und in den bisherigen Studien wurde die Blickrichtung fast nie gemessen. Hier misst die Übung nur, ob und wo du tippst – nicht, wohin du schaust, und sie ist kein Test des Gesichtsfelds. Ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Für den Finger gebaut: Tippen statt Maus mit Zeigersperre, große Trefferfläche, Punkte kommen weich herein. Flugzeit in Sekunden statt Pixeln pro Sekunde (in jeder Richtung und Bildschirmform gleich schwer, 60- und 120-Hz-Geräte gleich schnell), gerade und gut vorhersehbare Bahnen statt Schlangenlinien, Schwierigkeit in beide Richtungen angepasst. Feste Dauer ohne Zeitbonus und Zeitstrafe, kein roter Blitz, kein Wackeln; ein Tipp ins Leere wird nicht bestraft. Die Mitte ist als Kreuz markiert.',
    },
    it: {
      trains: 'Fare attenzione al bordo mentre il centro resta il punto fisso: punti lenti arrivano da ogni lato verso il centro e vanno toccati prima che ci siano.',
      daily: 'Notare qualcosa che arriva di lato mentre guardi avanti – a piedi, giocando con i bambini, nei giochi con la palla.',
      research:
        'L’attenzione può rivolgersi a un punto del bordo senza che gli occhi vi si spostino. Negli studi gli anziani, dopo esercizi che combinano centro e bordo, andavano meglio in un compito sul campo visivo utile; questi esercizi sono però impostati diversamente da questo gioco. Con i giochi d’azione i risultati sono contraddittori. Per gli strumenti di visione periferica nello sport un beneficio non è dimostrato, e negli studi finora la direzione dello sguardo non è quasi mai stata misurata. Qui l’esercizio misura solo se e dove tocchi – non dove guardi – e non è un test del campo visivo. Un beneficio per la vita quotidiana, lo sport o il traffico non è dimostrato.',
      improved:
        'Pensato per il dito: toccare invece del mouse con blocco del puntatore, area di tocco ampia, i punti entrano in modo morbido. Tempo di volo in secondi invece di pixel al secondo (ugualmente difficile in ogni direzione e forma dello schermo, schermi a 60 e 120 Hz ugualmente veloci), traiettorie rettilinee e ben prevedibili invece di serpentine, difficoltà adattata in entrambe le direzioni. Durata fissa senza bonus né penalità di tempo, niente lampo rosso né scosse; un tocco a vuoto non viene penalizzato. Il centro è segnato da una croce.',
    },
  },
  sources: [
    src('Posner (1980). Orienting of attention. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/00335558008248231'),
    src('Edwards, Fausto, Tetlow, Corona & Valdés (2018). Systematic review and meta-analyses of useful field of view cognitive training. Neuroscience & Biobehavioral Reviews', 'https://doi.org/10.1016/j.neubiorev.2017.11.004'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Green & Bavelier (2003). Action video game modifies visual selective attention. Nature', 'https://doi.org/10.1038/nature01647'),
    src('Boot, Kramer, Simons, Fabiani & Gratton (2008). The effects of video game playing on attention, memory, and executive control. Acta Psychologica', 'https://doi.org/10.1016/j.actpsy.2008.09.005'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
