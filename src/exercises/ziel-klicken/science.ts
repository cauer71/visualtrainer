import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'ziel-klicken',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Mehrere bewegte, ihre Größe verändernde Kreise gleichzeitig verfolgen und sie mit dem Finger dorthin antippen, wo sie gleich sind.',
      daily: 'Bewegtes treffen oder fangen – etwa beim Ballspiel, beim Fangen mit Kindern oder bei Spielen auf dem Tablet.',
      research:
        'Die Zeit zum Antippen wächst mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). Bei bewegten Zielen passt dieses Gesetz schlechter: Endpunkte landen eher hinter schnellen Zielen, und je schneller ein Ziel ist, desto stärker streut der Tipp; ab einem gewissen Tempo wird ein Ziel kaum noch zu erfassen. Mit dem Finger ist ein kleines Ziel nur ungenau zu treffen, und der Finger verdeckt es. In Studien werden Zielaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Bewegung mit der Zeit gerechnet (gleich schnell auf jedem Gerät), weiche Wandabprallung ohne Knick, Stufe nach Erfolg statt nach Punkten, feste Sitzungsdauer ohne Zeitgutschrift oder Zeitstrafe. Große Trefferflächen für den Finger, Fehler mit Symbol statt rotem Blitz, nichts wackelt, keine Noten oder Ranglisten. Gemessen werden Treffer, Trefferquote (Treffer ÷ alle Tipps) und die Zeit zwischen Treffern (Median) – kein Blick.',
    },
    it: {
      trains: 'Seguire più cerchi in movimento che cambiano grandezza e toccarli con il dito dove saranno tra poco.',
      daily: 'Colpire o afferrare ciò che si muove – per esempio nei giochi con la palla, nell’acchiappare con i bambini o nei giochi sul tablet.',
      research:
        'Il tempo per toccare cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Con bersagli in movimento questa legge descrive peggio: i punti di arrivo finiscono piuttosto dietro i bersagli veloci, e più un bersaglio è veloce, più il tocco si disperde; oltre una certa velocità un bersaglio non si riesce quasi più a colpire. Con il dito un bersaglio piccolo si colpisce solo in modo impreciso, e il dito lo copre. Negli studi i compiti di puntamento migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per sport, traffico o vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Movimento calcolato sul tempo (uguale veloce su ogni dispositivo), rimbalzo dolce sul bordo senza scatti, livello in base al successo e non ai punti, durata fissa della sessione senza tempo in regalo né penalità. Ampie aree di tocco per il dito, errori con un simbolo invece di un lampo rosso, nulla trema, niente voti né classifiche. Si misurano colpi, percentuale di colpi (colpi ÷ tutti i tocchi) e tempo tra i colpi (mediana) – niente sguardo.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Jagacinski, Repperger, Ward & Moran (1980). A test of Fitts’ law with moving targets. Human Factors', 'https://doi.org/10.1177/001872088002200211'),
    src('Hoffmann (1991). Capture of moving targets: A modification of Fitts’ law. Ergonomics', 'https://doi.org/10.1080/00140139108967307'),
    src('Huang, Tian, Fan, Zhang & Zhai (2018). Understanding the uncertainty in 1D unidirectional moving target selection. Proceedings of CHI ’18', 'https://doi.org/10.1145/3173574.3173811'),
    src('Lee, Kim, Oulasvirta, Lee & Park (2018). Moving target selection: A cue integration model. Proceedings of CHI ’18', 'https://doi.org/10.1145/3173574.3173804'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
