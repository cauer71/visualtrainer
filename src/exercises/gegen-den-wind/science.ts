import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/808-stability-challenge.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'gegen-den-wind',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Ausgleichen mit der Hand: Ein unsichtbarer, langsam wechselnder Wind schiebt die Marke, du hältst sie mit dem Finger im Ring um das ruhige Ziel.',
      daily: 'Kleine Schübe beim ruhigen Halten oder Führen eines Reglers laufend ausgleichen, mit kleinen statt großen Korrekturen.',
      research:
        'Korrekturen der Hand nach dem Sehen geschehen verzögert (etwa 160 Millisekunden) und in kleinen Schüben, nicht völlig stetig. Zu große Gegenbewegungen gehen über das Ziel hinaus; günstig sind dosierte, eher vorausschauende Korrekturen. Mit Übung wird man in der geübten Aufgabe besser, für dieses Spiel gibt es aber keine Studie. Ob sich das auf Alltag, Gleichgewicht oder Zittern überträgt, ist nicht belegt. Gemessen wird nur der Abstand der Marke zum Ziel – keine Tremor-Messung und keine Aussage über die Gesundheit.',
      improved:
        'Das Vorbild ist ein Maus-Drill mit „Balance“-Etikett, Bonus-Serie und einem Level, das nur steigt und keine Obergrenze hat. Hier: Der Wind ist nach Zeit gerechnet, nicht nach Bildzahl (60- und 120-Hz-Geräte gleich); Windstärke und Wechseltempo haben eine Obergrenze und passen sich nach oben und unten an; jeder Durchgang hat einen anderen Windverlauf; feste Dauer je Durchgang ohne Zeitbonus; der Ring zeigt „im Ring“ zusätzlich mit Form und Strichstärke statt nur mit Farbe. Hauptwert ist die Stufe, dazu Zeit im Ring und mittlerer Abstand. Gleichgewicht wird nicht geübt.',
    },
    it: {
      trains: 'Compensazione con la mano: un vento invisibile che cambia lentamente spinge il segno, tu lo tieni con il dito nell’anello attorno al bersaglio fermo.',
      daily: 'Compensare continuamente le piccole spinte mentre tieni fermo o guidi un cursore, con correzioni piccole invece che grandi.',
      research:
        'Le correzioni della mano dopo la visione avvengono con ritardo (circa 160 millisecondi) e a piccoli scatti, non in modo del tutto continuo. Contromovimenti troppo grandi superano il bersaglio; sono meglio correzioni dosate e più anticipate. Con la pratica si migliora nel compito esercitato, ma per questo gioco non esistono studi. Non è dimostrato che questo si trasferisca alla vita quotidiana, all’equilibrio o al tremore. Si misura solo la distanza del segno dal bersaglio – nessuna misura del tremore e nessuna affermazione sulla salute.',
      improved:
        'Il modello è un esercizio con il mouse con etichetta «equilibrio», serie a bonus e un livello che può solo salire e senza limite. Qui: il vento è calcolato in base al tempo, non al numero di immagini (uguale su dispositivi a 60 e 120 Hz); forza e velocità di cambio del vento hanno un limite massimo e si adattano verso l’alto e verso il basso; ogni turno ha un andamento del vento diverso; durata fissa per turno senza bonus di tempo; l’anello mostra «nell’anello» anche con forma e spessore del tratto invece che solo con il colore. Il valore principale è il livello, in più tempo nell’anello e distanza media. L’equilibrio non viene esercitato.',
    },
  },
  sources: [
    src('Miall, Weir & Stein (1993). Intermittency in human manual tracking tasks. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1993.9941639'),
    src('Loram et al. (2011). Human control of an inverted pendulum: Is continuous control necessary? Is intermittent control effective? Is intermittent control physiological? The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.2010.194712'),
    src('Saunders & Knill (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. Experimental Brain Research', 'https://doi.org/10.1007/s00221-003-1525-2'),
    src('Zelaznik, Hawkins & Kisselburgh (1983). Rapid visual feedback processing in single-aiming movements. Journal of Motor Behavior', 'https://doi.org/10.1080/00222895.1983.10735298'),
    src('Gribble et al. (2003). Role of cocontraction in arm movement accuracy. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.01020.2002'),
    src('McAuley & Marsden (2000). Physiological and pathological tremors and rhythmic central motor control. Brain', 'https://doi.org/10.1093/brain/123.8.1545'),
    src('Kawato (1999). Internal models for motor control and trajectory planning. Current Opinion in Neurobiology', 'https://doi.org/10.1016/S0959-4388(99)00028-8'),
  ],
};
