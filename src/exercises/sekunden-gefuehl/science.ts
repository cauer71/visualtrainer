import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'sekunden-gefuehl',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Ein Gefühl für Sekunden: eine genannte Zeit ohne Uhr abschätzen und im richtigen Moment tippen.',
      daily: 'Geduldig abwarten, Wege und Wartezeiten einschätzen, Rhythmus und Timing bei Musik und Sport.',
      research:
        'Zeitschätzung im Sekundenbereich stützt sich auf ein Netzwerk aus mehreren Hirnregionen; die Streuung wächst grob mit der Dauer. In Laborstudien wurden geübte Zeitspannen mit viel Übung gleichmäßiger und das Gelernte übertrug sich teilweise auf benachbarte Dauern. Für diese Bildschirmübung selbst und für einen Nutzen im Alltag gibt es keine Studien. Anzeige- und Eingabeverzögerung des Geräts verschieben jedes Ergebnis – vergleiche dich nur mit dir selbst auf demselben Gerät.',
      improved:
        'Keine Reaktionsaufgabe, sondern ehrlich Zeitgefühl: feste Zielzeiten von 1 bis 8 Sekunden, Abweichung in Millisekunden mit Vorzeichen (zu früh oder zu spät) und die Tendenz über die Sitzung. Kein Sekundentakt als Zählhilfe – nur auf der ersten Stufe ein dezenter Hilfsring. Keine Blitze, keine roten Warneffekte.',
    },
    it: {
      trains: 'Un senso per i secondi: stimare senza orologio un tempo indicato e toccare al momento giusto.',
      daily: 'Aspettare con pazienza, stimare percorsi e tempi d’attesa, ritmo e tempismo in musica e sport.',
      research:
        'La stima del tempo nell’ordine dei secondi si basa su una rete di più aree cerebrali; la variabilità cresce grosso modo con la durata. In studi di laboratorio, con molto esercizio gli intervalli allenati diventavano più regolari e quanto appreso si trasferiva in parte a durate vicine. Per questo esercizio su schermo e per un’utilità nella vita quotidiana non esistono studi. Il ritardo di schermo e input del dispositivo sposta ogni risultato – confrontati solo con te stesso sullo stesso dispositivo.',
      improved:
        'Non un compito di reazione, ma onestamente senso del tempo: tempi fissi da 1 a 8 secondi, scostamento in millisecondi con segno (troppo presto o troppo tardi) e la tendenza nella sessione. Nessun ritmo al secondo come aiuto per contare – solo al primo livello un discreto anello di aiuto. Niente lampi, niente effetti di avvertimento rossi.',
    },
  },
  sources: [
    src('Bartolo & Merchant (2009). Learning and generalization of time production in humans: Rules of transfer across modalities and interval durations. Experimental Brain Research', 'https://doi.org/10.1007/s00221-009-1895-1'),
    src('Grondin (2010). Timing and time perception: A review of recent behavioral and neuroscience findings and theoretical directions. Attention, Perception, & Psychophysics', 'https://doi.org/10.3758/APP.72.3.561'),
    src('Merchant, Harrington & Meck (2013). Neural basis of the perception and estimation of time. Annual Review of Neuroscience', 'https://doi.org/10.1146/annurev-neuro-062012-170349'),
    src('Brown (1997). Attentional resources in timing: Interference effects in concurrent temporal and nontemporal working memory tasks. Perception & Psychophysics', 'https://doi.org/10.3758/BF03205526'),
    src('Wright, Buonomano, Mahncke & Merzenich (1997). Learning and generalization of auditory temporal-interval discrimination in humans. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.17-10-03956.1997'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
  ],
};
