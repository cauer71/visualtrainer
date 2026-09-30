import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'mikrokorrektur',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Erst ein großes Ziel antippen, dann ein kurz eingeblendetes kleines Ziel in unvorhersehbarer Richtung genau treffen – eine grobe Bewegung, gefolgt von einer kleinen Korrektur.',
      daily: 'Erst grob, dann fein zielen: beim Fädeln, beim Einstecken eines Steckers, beim Tippen auf kleine Schaltflächen am Handy oder Tablet.',
      research:
        'Schnelle Zielbewegungen bestehen meist aus einem großen Anfangsimpuls und einer kleinen, rückmeldungsgestützten Korrektur am Ende (Woodworth 1899; Meyer et al. 1988; Elliott et al. 2010). Die Bewegungszeit steigt mit dem Weg und sinkt mit der Zielgröße (Fitts’sches Gesetz). Springt ein Ziel, passt die Hand ihre Bewegung nach etwa einer Zehntelsekunde an (Brenner & Smeets 1997). Beim Antippen des Touchscreens kommt eine eigene Ungenauigkeit des Fingers hinzu, die vom Tempo unabhängig ist (Bi et al. 2013). Mit Übung werden solche Zeige- und Antippaufgaben deutlich besser, ein großer Teil davon ist Gewöhnung an Gerät und Aufgabe (Guo et al. 2025). Für genau diese Übung gibt es keine Studie; ein Nutzen für Sport, Bildschirmspiele oder Alltag ist nicht belegt.',
      improved:
        'Das Original ist eine Mausübung mit Fadenkreuz, schenkt und nimmt Spielzeit, wackelt und leuchtet bei Fehlern rot. Hier tippst du direkt, die Sitzung hat eine feste Zahl von Runden ohne Zeitbonus und Zeitstrafe, und Fehler erscheinen als kleines weiches ✗. Das Nachziel blendet weich ein, die Trefferfläche ist ehrlich das sichtbare Ziel (mindestens 24 Pixel Radius) ohne versteckten Zuschlag. Die Stufe regelt Größe, Abstand und Sichtzeit nach Erfolg, nicht nach Punkten. Angezeigt werden Trefferquote, Zeit zwischen den Tipps (Median) und der Abstand zur Mitte statt einer „Präzisionsnote“.',
    },
    it: {
      trains: 'Toccare prima un bersaglio grande, poi colpire con precisione un bersaglio piccolo mostrato per poco in una direzione imprevedibile – un movimento ampio seguito da una piccola correzione.',
      daily: 'Mirare prima in modo ampio, poi con finezza: infilando un filo, inserendo una spina, toccando piccoli pulsanti sul telefono o sul tablet.',
      research:
        'I movimenti rapidi verso un bersaglio consistono di solito in un grande impulso iniziale e in una piccola correzione finale guidata dal riscontro (Woodworth 1899; Meyer et al. 1988; Elliott et al. 2010). Il tempo di movimento cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts). Se un bersaglio salta, la mano adatta il movimento dopo circa un decimo di secondo (Brenner e Smeets 1997). Toccando lo schermo si aggiunge un’imprecisione propria del dito, indipendente dalla velocità (Bi et al. 2013). Con l’esercizio questi compiti di puntamento e di tocco migliorano nettamente, in gran parte per abitudine al dispositivo e al compito (Guo et al. 2025). Per questo esercizio non esiste uno studio; un’utilità per sport, giochi o vita quotidiana non è dimostrata.',
      improved:
        'L’originale è un esercizio con il mouse e il mirino, regala e toglie tempo di gioco, scuote e si illumina di rosso in caso di errore. Qui tocchi direttamente, la sessione ha un numero fisso di turni senza bonus né penalità di tempo e gli errori compaiono come una piccola ✗ delicata. Il bersaglio piccolo appare con una dissolvenza, l’area di tocco è onestamente il bersaglio visibile (almeno 24 pixel di raggio) senza margini nascosti. Il livello regola grandezza, distanza e tempo di visibilità in base al successo, non ai punti. Vengono mostrati quota di colpi a segno, tempo tra i tocchi (mediana) e distanza dal centro invece di un «voto di precisione».',
    },
  },
  sources: [
    src('Woodworth (1899). Accuracy of voluntary movement. The Psychological Review: Monograph Supplements', 'https://doi.org/10.1037/h0092992'),
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('Meyer, Abrams, Kornblum, Wright & Smith (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. Psychological Review', 'https://doi.org/10.1037/0033-295X.95.3.340'),
    src('Elliott et al. (2010). Goal-directed aiming: Two components but multiple processes. Psychological Bulletin', 'https://doi.org/10.1037/a0020958'),
    src('Brenner & Smeets (1997). Fast responses of the human hand to changes in target position. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899709600017'),
    src('Bi, Li & Zhai (2013). FFitts law: Modeling finger touch with Fitts’ law. Proceedings of CHI ’13', 'https://doi.org/10.1145/2470654.2466180'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
