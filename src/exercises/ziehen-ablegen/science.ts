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
        'Der Finger darf irgendwo aufsetzen; der Ball hängt über dem Finger, damit die Hand ihn nicht verdeckt, und der Ring ist großzügig bemessen. Das Tempo des Rings wird in Echtzeit gerechnet, auf den ersten Stufen bewegt er sich ruhig, erst später kommen Richtungswechsel hinzu. Ein Zeitbalken zeigt die verbleibende Zeit je Durchgang. Mit der Stufe werden Ring und Ball kleiner, der Ring schneller und das Zeitfenster kürzer; die Schwierigkeit passt sich nach oben und unten an. Eine Zeitüberschreitung zählt als Fehlversuch. Rückmeldung geben Formen und ✓/✗, ohne Blitz und ohne Wackeln. Gemessen werden die Trefferquote und die mittlere Dauer je Durchgang.',
    },
    it: {
      trains: 'Occhio e mano nel trascinare: guidare una palla con il dito verso un bersaglio che si sposta e rilasciarla al momento giusto.',
      daily: 'Spostare foto o file sul tablet, posare carte da gioco, ordinare oggetti sullo schermo.',
      research:
        'Trascinare è più difficile che puntare: richiede più tempo e provoca più errori. Un movimento verso una meta consiste in un rapido impulso principale e in una correzione fine alla fine; con bersagli in movimento i punti finali spesso cadono dietro il bersaglio. Trascinando con il dito la mano copre facilmente il bersaglio – per questo qui la palla sta sopra il dito. Nel compito con l’esercizio si migliora; l’apprendimento motorio resta però legato al compito esercitato. Un beneficio per la vita quotidiana non è dimostrato.',
      improved:
        'Il dito può appoggiarsi ovunque; la palla sta sopra il dito, così la mano non la copre, e l’anello è generoso. La velocità dell’anello è calcolata in tempo reale: nei primi livelli si muove con calma, solo più avanti si aggiungono i cambi di direzione. Una barra del tempo mostra il tempo rimasto per ogni turno. Con il livello, anello e palla diventano più piccoli, l’anello più veloce e la finestra di tempo più breve; la difficoltà si adatta verso l’alto e verso il basso. Una scadenza del tempo conta come tentativo fallito. Il riscontro è dato da forme e ✓/✗, senza lampi e senza tremolii. Si misurano la percentuale di turni con la palla nell’anello e la durata media per turno.',
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
