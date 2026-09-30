import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'praezisions-flick',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ein schrumpfendes Ziel schnell antippen und dabei möglichst nah an die Mitte kommen – Tempo und Genauigkeit gegeneinander abwägen.',
      daily: 'Kleine Schaltflächen oder Symbole auf dem Tablet und Handy treffen, Knöpfe im richtigen Moment drücken, Ziele mit dem Finger genau setzen.',
      research:
        'Zielbewegungen bestehen aus einem schnellen Hauptschwung und einer kleinen Nachkorrektur; je schneller der Schwung, desto stärker streut das Ergebnis (Tempo gegen Genauigkeit). Die Zeit zum Antippen wächst mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). Mit dem Finger ist ein sehr kleines Ziel nur ungenau zu treffen, und der Finger verdeckt es dabei. In Studien werden solche Zielaufgaben mit Übung deutlich besser – ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe. Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport oder Alltag ist nicht belegt. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Das Ziel schrumpft mit der Zeit gerechnet (gleich schnell auf jedem Gerät), die Sitzung hat eine feste Zahl an Durchgängen ohne Zeitgutschrift oder Zeitstrafe, und die Stufe steigt und sinkt je nach Erfolg. Die Trefferfläche ist mindestens so groß wie ein Fingerspitzen-Tipp, das nächste Ziel erscheint nie unter deinem Finger. Fehler zeigen ein Symbol statt eines roten Blitzes, nichts wackelt. Gemessen werden Abstand zur Mitte (in % des Radius) und die Zeit bis zum Tipp (Median) – keine Noten, keine Ranglisten, kein Blick.',
    },
    it: {
      trains: 'Toccare in fretta un bersaglio che si rimpicciolisce, avvicinandosi il più possibile al centro – bilanciare velocità e precisione.',
      daily: 'Colpire piccoli pulsanti o simboli su tablet e cellulare, premere i tasti al momento giusto, posizionare con precisione gli elementi con il dito.',
      research:
        'I movimenti verso un bersaglio consistono in un ampio gesto rapido e in una piccola correzione finale; più il gesto è veloce, più il risultato si disperde (velocità contro precisione). Il tempo per toccare cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Con il dito un bersaglio molto piccolo si colpisce solo in modo impreciso, e il dito lo copre. Negli studi questi compiti di puntamento migliorano nettamente con l’esercizio – in gran parte è abitudine al dispositivo e al compito. Per questo esercizio non esiste uno studio; un’utilità per lo sport o la vita quotidiana non è dimostrata. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Il bersaglio si rimpicciolisce in base al tempo (uguale veloce su ogni dispositivo), la sessione ha un numero fisso di prove senza tempo in regalo né penalità, e il livello sale e scende in base al successo. L’area di tocco è almeno grande quanto la punta di un dito, il bersaglio successivo non compare mai sotto il dito. Gli errori mostrano un simbolo invece di un lampo rosso, nulla trema. Si misurano la distanza dal centro (in % del raggio) e il tempo fino al tocco (mediana) – niente voti, niente classifiche, niente sguardo.',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Meyer, Abrams, Kornblum, Wright & Smith (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. Psychological Review', 'https://doi.org/10.1037/0033-295X.95.3.340'),
    src('Elliott, Hansen, Grierson, Lyons, Bennett & Hayes (2010). Goal-directed aiming: Two components but multiple processes. Psychological Bulletin', 'https://doi.org/10.1037/a0020958'),
    src('Harris & Wolpert (1998). Signal-dependent noise determines motor planning. Nature', 'https://doi.org/10.1038/29528'),
    src('MacKenzie & Isokoski (2008). Fitts’ throughput and the speed-accuracy tradeoff. Proceedings of CHI ’08', 'https://doi.org/10.1145/1357054.1357308'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Vogel & Baudisch (2007). Shift: A technique for operating pen-based interfaces using touch. Proceedings of CHI ’07', 'https://doi.org/10.1145/1240624.1240727'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
