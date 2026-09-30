import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'ziehen-ablegen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Auge und Hand beim Ziehen: einen Ball mit dem Finger zu einem wandernden Ziel führen und im richtigen Moment loslassen.',
      daily: 'Fotos oder Dateien am Tablet verschieben, Spielkarten ablegen, Gegenstände auf dem Bildschirm sortieren.',
      research:
        'Ziehen ist schwieriger als einfaches Zeigen: Es dauert länger und führt häufiger zu Fehlern. Eine Zielbewegung besteht aus einem schnellen Hauptimpuls und einer Feinkorrektur am Ende; bei bewegten Zielen landen die Endpunkte oft hinter dem Ziel. Beim Ziehen mit dem Finger verdeckt die Hand das Ziel leicht – deshalb liegt der Ball hier über dem Finger. In der Aufgabe wird man mit Übung besser; motorisches Lernen bleibt aber eng an die geübte Aufgabe gebunden. Ein Nutzen für den Alltag ist nicht belegt.',
      improved:
        'Für den Finger gebaut (Ball über dem Finger, großer Ring, Finger darf irgendwo aufsetzen), Tempo in Echtzeit, Einstieg mit ruhigem Ring und erst später Richtungswechsel, sichtbarer Zeitbalken statt verstecktem Zeitfenster, Schwierigkeit in beide Richtungen angepasst, Zeitüberschreitungen werden mitgezählt, kein Blitz und kein Wackeln, Rückmeldung über Formen und ✓/✗.',
    },
    it: {
      trains: 'Occhio e mano nel trascinare: guidare una palla con il dito verso un bersaglio che si sposta e rilasciarla al momento giusto.',
      daily: 'Spostare foto o file sul tablet, posare carte da gioco, ordinare oggetti sullo schermo.',
      research:
        'Trascinare è più difficile che puntare: richiede più tempo e provoca più errori. Un movimento verso una meta consiste in un rapido impulso principale e in una correzione fine alla fine; con bersagli in movimento i punti finali spesso cadono dietro il bersaglio. Trascinando con il dito la mano copre facilmente il bersaglio – per questo qui la palla sta sopra il dito. Nel compito con l’esercizio si migliora; l’apprendimento motorio resta però legato al compito esercitato. Un beneficio per la vita quotidiana non è dimostrato.',
      improved:
        'Pensato per il dito (palla sopra il dito, anello grande, il dito può appoggiarsi ovunque), velocità in tempo reale, inizio con anello tranquillo e cambi di direzione solo più avanti, barra del tempo visibile invece di una finestra nascosta, difficoltà adattata in entrambe le direzioni, scadenze di tempo conteggiate, niente lampi né scosse, riscontro con forme e ✓/✗.',
    },
  },
  sources: [
    src('MacKenzie, Sellen & Buxton (1991). A comparison of input devices in element pointing and dragging tasks. CHI ’91', 'https://doi.org/10.1145/108844.108868'),
    src('Elliott et al. (2010). Goal-directed aiming: Two components but multiple processes. Psychological Bulletin', 'https://doi.org/10.1037/a0020958'),
    src('Huang et al. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. CHI 2018', 'https://doi.org/10.1145/3173574.3173811'),
    src('Vogel & Baudisch (2007). Shift: A technique for operating pen-based interfaces using touch. CHI ’07', 'https://doi.org/10.1145/1240624.1240727'),
    src('Karni et al. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. Nature', 'https://doi.org/10.1038/377155a0'),
  ],
};
