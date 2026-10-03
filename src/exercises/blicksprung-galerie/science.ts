import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'blicksprung-galerie',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Blick und Hand auf ein plötzlich erscheinendes Ziel ausrichten – mit Sprüngen zwischen festen Orten im Raster.',
      daily: 'Sich umschauen, eine Anzeige oder Tabelle überfliegen, Ballspiele, Spiele mit schnellem Zielen.',
      research:
        'Zeige- und Zielaufgaben werden mit Übung deutlich schneller; ein Teil davon ist Gewöhnung an Gerät und Aufgabe. In Studien blieb Blicksprung-Training oft an den geübten Ort gebunden, und ein Nutzen für Sport, Lesen oder Alltag ist nicht belegt. Die Übung misst keine Augenbewegung, sondern nur die Zeit bis zum Tipp – inklusive Handbewegung und Gerätelatenz. Vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Das Ziel blendet weich ein und aus, und das Raster ist sichtbar markiert, damit die möglichen Zielorte bekannt sind. Die Stufe bestimmt Rastergröße (3 × 3, ab Stufe 6 4 × 4), Anzeigedauer und Mindestweite des Sprungs; sie steigt nach drei richtigen Treffern in Folge und sinkt nach einem Fehler. Die Zellen sind große Trefferflächen (mindestens etwa 9 mm), das Raster nutzt Hoch- und Querformat. Gewertet wird der erste Tipp je Ziel: richtige Zelle, falsche Zelle oder Ziel weg. Gemessen wird die Zeit bis zum Tipp (Median der richtigen Treffer), keine Augenbewegung; sie enthält also auch die Handbewegung und die Geräteverzögerung.',
    },
    it: {
      trains: 'Orientare sguardo e mano verso un bersaglio che compare all’improvviso – con salti tra posizioni fisse della griglia.',
      daily: 'Guardarsi intorno, scorrere un display o una tabella, giochi con la palla, giochi che richiedono mira rapida.',
      research:
        'I compiti di puntamento diventano nettamente più rapidi con l’esercizio; in parte è abitudine al dispositivo e al compito. Negli studi l’allenamento dei salti dello sguardo restava spesso legato alla posizione esercitata, e un’utilità per sport, lettura o vita quotidiana non è dimostrata. L’esercizio non misura i movimenti oculari, ma solo il tempo fino al tocco – compresi movimento della mano e latenza del dispositivo. Confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Il bersaglio compare e scompare gradualmente e la griglia è segnata in modo visibile, così le posizioni possibili sono note. Il livello determina la dimensione della griglia (3 × 3, dal livello 6 4 × 4), la durata di visualizzazione e l’ampiezza minima del salto; sale dopo tre colpi corretti di fila e scende dopo un errore. Le celle sono ampie aree di tocco (almeno circa 9 mm) e la griglia sfrutta il formato verticale e orizzontale. Conta il primo tocco per ogni bersaglio: cella giusta, cella sbagliata o bersaglio sparito. Si misura il tempo fino al tocco (mediana dei colpi corretti), non un movimento oculare; comprende quindi anche il movimento della mano e la latenza del dispositivo.',
    },
  },
  sources: [
    src('Di Russo, Pitzalis & Spinelli (2003). Fixation stability and saccadic latency in élite shooters. Vision Research', 'https://doi.org/10.1016/S0042-6989(03)00299-2'),
    src('Fischer & Ramsperger (1986). Human express saccades: Effects of randomization and daily practice. Experimental Brain Research', 'https://doi.org/10.1007/BF00340494'),
    src('Kalesnykas & Hallett (1994). Retinal eccentricity and the latency of eye saccades. Vision Research', 'https://doi.org/10.1016/0042-6989(94)90165-1'),
    src('Kveraga, Boucher & Hughes (2002). Saccades operate in violation of Hick’s law. Experimental Brain Research', 'https://doi.org/10.1007/s00221-002-1168-8'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fransen (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. Sports Medicine', 'https://doi.org/10.1007/s40279-024-02060-x'),
    src('Parhi, Karlson & Bederson (2006). Target size study for one-handed thumb use on small touchscreen devices. MobileHCI', 'https://doi.org/10.1145/1152215.1152260'),
  ],
};
