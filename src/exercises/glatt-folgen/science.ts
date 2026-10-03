import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/514-pro-smooth-pursuit.md und docs/uebungskatalog/literatur/lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'glatt-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit dem Finger: eine Marke gleichmäßig an einem Ziel halten, das eine weiche, langsame Kurvenbahn zieht.',
      daily: 'Einer gleichmäßigen Bewegung auf dem Bildschirm mit dem Finger folgen, Kurven am Tablet nachzeichnen, Regler gleichmäßig führen.',
      research:
        'Bewegungen, die sich vorhersagen lassen, werden mit Auge und Hand genauer verfolgt als unvorhersagbare; bei gleichmäßigen Schwingungen fällt das Nachführen besonders leicht, und der Nachlauf wird kürzer. Je schneller die Bahn und je weniger sie sich vorhersagen lässt, desto ungenauer folgt das Auge. Die Hand korrigiert in kleinen Schüben statt stetig. Mit Übung wird man in der Aufgabe besser; ein Nutzen für den Alltag ist nicht belegt. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick. Die Augenfolgebewegung wird in der Untersuchung qualitativ geprüft, indem die Augen einem Ziel folgen, das in einem H-Muster geführt wird; diese Übung ersetzt keine Untersuchung. Doppelbilder, plötzliche Sehverschlechterung oder Schwindel sind ein Anlass für ärztliche Abklärung.',
      improved:
        'Die Bahn läuft stetig aus dem Stand an, und das Tempo ist je Durchgang fest; es gibt keine Ecken und keine Richtungssprünge. Ab Stufe 7 mischt sich eine kleine dritte Schwingung dazu, damit die Bahn weniger vorhersehbar wird; auf den unteren Stufen zeigt eine gestrichelte Linie die Bahn ein Stück voraus. Die Marke sitzt über dem Finger, die Bewegung folgt der Uhr, nicht der Bildzahl, und jeder Durchgang dauert fest 11 Sekunden Fingerkontakt ohne Zeitbonus und ohne Blitz. Das Band ist sichtbar (Ring und Kreuz statt nur Farbe). Hauptwert ist die Stufe, dazu kommen Zeit im Band und mittlerer Abstand.',
    },
    it: {
      trains: 'Inseguimento con il dito: tenere un segno con regolarità su un bersaglio che disegna una curva morbida e lenta.',
      daily: 'Seguire con il dito un movimento regolare sullo schermo, ripassare curve sul tablet, guidare con regolarità un cursore.',
      research:
        'I movimenti prevedibili vengono seguiti con occhio e mano in modo più preciso di quelli imprevedibili; con oscillazioni regolari l’inseguimento riesce particolarmente bene e il ritardo si riduce. Più il percorso è veloce e meno è prevedibile, meno precisamente lo segue l’occhio. La mano corregge a piccoli scatti e non in modo continuo. Con la pratica si migliora nel compito; un beneficio per la vita quotidiana non è dimostrato. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo. Il movimento di inseguimento degli occhi viene valutato nella visita in modo qualitativo, facendo seguire con gli occhi un bersaglio guidato a forma di H; questo esercizio non sostituisce una visita. Visione doppia, peggioramento improvviso della vista o vertigini sono un motivo per un accertamento medico.',
      improved:
        'Il percorso parte in modo continuo da fermo e la velocità è fissa per turno; non ci sono angoli né salti di direzione. Dal livello 7 si aggiunge una piccola terza oscillazione, così il percorso diventa meno prevedibile; nei livelli bassi una linea tratteggiata mostra un tratto del percorso in anticipo. Il segno sta sopra il dito, il movimento segue l’orologio e non il numero di immagini, e ogni turno dura fissi 11 secondi di contatto del dito, senza bonus di tempo e senza lampi. La fascia è visibile (anello e croce invece del solo colore). Il valore principale è il livello, in più tempo nella fascia e distanza media.',
    },
  },
  sources: [
    src('Viviani & Mounoud (1990). Perceptuomotor compatibility in pursuit tracking of two-dimensional movements. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1990.10735521'),
    src('Kowler et al. (2019). Predictive smooth pursuit eye movements. Annual Review of Vision Science', 'https://doi.org/10.1146/annurev-vision-091718-014901'),
    src('Barnes, Donnelly & Eason (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.1987.sp016649'),
    src('Engel & Soechting (2000). Manual tracking in two dimensions. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.2000.83.6.3483'),
    src('Collewijn & Tamminga (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.1984.sp015242'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier (S. 6, 28, 32–35)', 'https://openlibrary.org/isbn/9780323029612'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
  ],
};
