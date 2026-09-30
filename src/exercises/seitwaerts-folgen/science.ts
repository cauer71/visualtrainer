import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/505-strafe-tracking.md und docs/uebungskatalog/literatur/lit-W06-fps-a.md, lit-W07-fps-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'seitwaerts-folgen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Nachführen mit der Hand: einem Ziel, das seitlich hin und her ausweicht, mit der waagerechten Fingerposition folgen und die Marke im Ring halten.',
      daily: 'Einem hin und her laufenden Regler oder Zeiger mit dem Finger folgen; bei Richtungswechseln weich mitgehen.',
      research:
        'Die Hand reagiert auf eine Änderung von Ort oder Tempo eines Ziels nach etwa 110 bis 200 Millisekunden; bei einem Richtungswechsel entsteht deshalb kurz ein Abstand, der danach eingeholt wird. Wer den Rhythmus der Wechsel kennt, kann vorausplanen. Manuelles Nachführen verläuft in kleinen Korrekturschüben. Mit Übung wird man in der geübten Aufgabe besser; Actionspiele verbesserten in einer Studie eine Labor-Nachführaufgabe, für solche Drills selbst gibt es keine Studie. Ein Nutzen für den Alltag ist nicht belegt. Gemessen wird die Fingerposition gegen das Ziel, nicht der Blick.',
      improved:
        'Das Vorbild ist ein Maus-Drill mit zufälliger, harter Umkehr, Serienabbruch beim ersten Abrutschen und Zeitbonus. Hier: Die Wendungen kommen in unregelmäßigen, aber vorhersehbaren Abständen (Wechselrhythmus kurz – lang – lang – kurz) und sind weich statt ruckartig; gemessen wird die Zeit im Ring statt einer Serie; feste Dauer je Durchgang ohne Zeitbonus; das Ziel bewegt sich nach Zeit, nicht nach Bildzahl (60- und 120-Hz-Geräte gleich). Nur die waagerechte Fingerposition zählt, der Finger verdeckt nichts. Tempo und Wendehäufigkeit steigen mit der Stufe und passen sich nach oben und unten an.',
    },
    it: {
      trains: 'Inseguimento con la mano: seguire con la posizione orizzontale del dito un bersaglio che scarta avanti e indietro e tenere il segno nell’anello.',
      daily: 'Seguire con il dito un cursore o una lancetta che va avanti e indietro; assecondare con morbidezza i cambi di direzione.',
      research:
        'La mano reagisce a un cambiamento di posizione o di velocità di un bersaglio dopo circa 110–200 millisecondi; a un cambio di direzione si crea quindi per un attimo una distanza che viene poi recuperata. Chi conosce il ritmo dei cambi può anticipare. L’inseguimento manuale procede a piccoli scatti di correzione. Con la pratica si migliora nel compito esercitato; in uno studio i videogiochi d’azione hanno migliorato un compito di inseguimento in laboratorio, per questi esercizi in sé non esistono studi. Un beneficio per la vita quotidiana non è dimostrato. Si misura la posizione del dito rispetto al bersaglio, non lo sguardo.',
      improved:
        'Il modello è un esercizio con il mouse con inversione casuale e brusca, serie interrotta al primo scarto e bonus di tempo. Qui: le svolte arrivano a intervalli irregolari ma prevedibili (ritmo breve – lungo – lungo – breve) e sono morbide invece che a scatti; si misura il tempo nell’anello invece di una serie; durata fissa per turno senza bonus di tempo; il bersaglio si muove in base al tempo, non al numero di immagini (uguale su dispositivi a 60 e 120 Hz). Conta solo la posizione orizzontale del dito, il dito non copre nulla. Velocità e frequenza delle svolte aumentano con il livello e si adattano verso l’alto e verso il basso.',
    },
  },
  sources: [
    src('Brenner & Smeets (1997). Fast responses of the human hand to changes in target position. Journal of Motor Behavior', 'https://doi.org/10.1080/00222899709600017'),
    src('Brenner, Smeets & de Lussanet (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target’s velocity. Experimental Brain Research', 'https://doi.org/10.1007/s002210050535'),
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Gauthier et al. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. Experimental Brain Research', 'https://doi.org/10.1007/BF00279667'),
    src('Li, Chen & Chen (2016). Playing action video games improves visuomotor control. Psychological Science', 'https://doi.org/10.1177/0956797616650300'),
    src('Deber et al. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
    src('Listman et al. (2021). Long-term motor learning in the “wild” with high volume video game data. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2021.777779'),
  ],
};
