import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'hellste-kugel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Genau hinschauen und Helligkeiten vergleichen: aus mehreren grauen Kugeln die hellste herausfinden – der Unterschied wird mit deinem Erfolg feiner.',
      daily: 'Fotos vergleichen, Stoffe oder Oberflächen nach Helligkeit sortieren, genaues Hinschauen bei wenig Kontrast.',
      research:
        'Wenn sich ein Reiz nur wenig von vielen ähnlichen unterscheidet, wird die Suche langsamer: Je ähnlicher Ziel und Umgebung, desto eher muss man Kugel für Kugel vergleichen. In Suchaufgaben wird man mit Übung schneller und sicherer; wie weit sich das auf andere Aufgaben überträgt, ist uneinheitlich. Die Übung ist kein Sehtest und kein Kontrastsehtest: Bildschirme geben Grautöne je nach Gerät, Einstellung und Raumlicht unterschiedlich wieder. Ein Nutzen für den Alltag ist nicht belegt.',
      improved:
        'Es werden nur Graustufen auf mittelgrauem Grund gezeigt, sodass keine Farbunterscheidung nötig ist. Der Helligkeitsunterschied wird als Kontrast in Leuchtdichte (Weber-Kontrast) in 20 Stufen von 45 % auf 3 % verkleinert statt als einfacher Grauwert; nie sind zwei Kugeln gleich hell, und der Cluster wächst von 6 auf 16 Kugeln. Eine Treppe passt die Stufe an (zwei richtige Antworten in Folge machen es feiner, eine falsche gröber), die Zielposition ist zufällig und liegt nicht neben dem letzten Ziel. Die Kugeln bleiben bis zur Antwort sichtbar, die Antwortzeit wird nur protokolliert, und die Rückmeldung läuft über Formen statt über Blitz oder Wackeln. Verglichen wird nur mit dir selbst auf diesem Gerät; ein Sehvermögen wird nicht gemessen.',
    },
    it: {
      trains: 'Guardare con precisione e confrontare luminosità: trovare la più luminosa tra diverse palline grigie – con il tuo successo la differenza diventa più sottile.',
      daily: 'Confrontare foto, ordinare stoffe o superfici per luminosità, guardare con attenzione quando il contrasto è poco.',
      research:
        'Quando uno stimolo si distingue poco da molti altri simili, la ricerca rallenta: più bersaglio e ambiente si somigliano, più spesso bisogna confrontare pallina per pallina. Nei compiti di ricerca, con l’esercizio si diventa più rapidi e sicuri; quanto ciò si trasferisca ad altri compiti non è uniforme. L’esercizio non è un test della vista né un test di sensibilità al contrasto: gli schermi riproducono i grigi in modo diverso a seconda di dispositivo, impostazioni e luce ambientale. Un beneficio per la vita quotidiana non è dimostrato.',
      improved:
        'Vengono mostrate solo scale di grigio su fondo grigio medio, quindi non serve distinguere i colori. La differenza di luminosità è espressa come contrasto in luminanza (contrasto di Weber) e diminuisce in 20 livelli dal 45 % al 3 %, invece di essere un semplice valore di grigio; due palline non sono mai ugualmente chiare e il gruppo cresce da 6 a 16 palline. Una scala adattiva regola il livello (due risposte giuste di seguito rendono la differenza più sottile, una sbagliata la rendono più marcata); la posizione del bersaglio è casuale e non è vicina all’ultimo bersaglio. Le palline restano visibili fino alla risposta, il tempo di risposta viene solo registrato e il riscontro avviene con forme invece che con lampi o scosse. Il confronto è solo con te stesso su questo dispositivo; la capacità visiva non viene misurata.',
    },
  },
  sources: [
    src('Treisman & Gelade (1980). A feature-integration theory of attention. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(80)90005-5'),
    src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295X.96.3.433'),
    src('Wolfe & Horowitz (2017). Five factors that guide attention in visual search. Nature Human Behaviour', 'https://doi.org/10.1038/s41562-017-0058'),
    src('Sireteanu & Rettenbach (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. Vision Research', 'https://doi.org/10.1016/0042-6989(94)00295-W'),
    src('Guo et al. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
