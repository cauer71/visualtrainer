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
        'Zeitschätzung im Sekundenbereich stützt sich auf ein Netzwerk aus mehreren Hirnregionen; die Streuung wächst grob mit der Dauer. In Laborstudien wurden geübte Zeitspannen mit viel Übung gleichmäßiger und das Gelernte übertrug sich teilweise auf benachbarte Dauern. Für diese Bildschirmübung selbst und für einen Nutzen im Alltag gibt es keine Studien. Anzeige- und Eingabeverzögerung des Geräts verschieben jedes Ergebnis – vergleiche dich nur mit dir selbst auf demselben Gerät. Wie bei Messungen am Auge allgemein streuen einzelne Werte; aussagekräftiger sind der Mittelwert mehrerer Durchgänge und der Verlauf über mehrere Sitzungen.',
      improved:
        'Die Übung fragt Zeitgefühl ab, keine Reaktion: Es gibt kein Signal, auf das man antwortet, sondern eine genannte Zielzeit, die man ohne Uhr trifft. Die sieben Durchgänge laufen in fester, aufsteigender Folge von 1 bis 8 Sekunden, damit die mittlere Abweichung von Sitzung zu Sitzung vergleichbar bleibt. Gezeigt werden die Abweichung in Millisekunden mit Vorzeichen (zu früh oder zu spät) und über die Sitzung die Tendenz; gemessen wird das Schätzen, nicht die Schnelligkeit. Auf der ersten Stufe hilft ein dezenter Hilfsring, ab der zweiten entfällt er, und das Toleranzfenster wird enger; einen Sekundentakt zum Mitzählen gibt es nicht. Alle Übergänge sind weich, ohne Blitze und rote Warneffekte.',
    },
    it: {
      trains: 'Un senso per i secondi: stimare senza orologio un tempo indicato e toccare al momento giusto.',
      daily: 'Aspettare con pazienza, stimare percorsi e tempi d’attesa, ritmo e tempismo in musica e sport.',
      research:
        'La stima del tempo nell’ordine dei secondi si basa su una rete di più aree cerebrali; la variabilità cresce grosso modo con la durata. In studi di laboratorio, con molto esercizio gli intervalli allenati diventavano più regolari e quanto appreso si trasferiva in parte a durate vicine. Per questo esercizio su schermo e per un’utilità nella vita quotidiana non esistono studi. Il ritardo di schermo e input del dispositivo sposta ogni risultato – confrontati solo con te stesso sullo stesso dispositivo. Come per le misure sull’occhio in generale, i singoli valori oscillano; sono più significativi la media di più turni e l’andamento su più sessioni.',
      improved:
        'L’esercizio mette alla prova il senso del tempo, non la reazione: non c’è alcun segnale a cui rispondere, ma un tempo indicato da raggiungere senza orologio. I sette turni seguono una sequenza fissa e crescente da 1 a 8 secondi, così lo scostamento medio resta confrontabile da una sessione all’altra. Vengono mostrati lo scostamento in millisecondi con segno (troppo presto o troppo tardi) e, durante la sessione, la tendenza; si misura la stima, non la rapidità. Al primo livello aiuta un discreto anello di sostegno, dal secondo in poi scompare e la tolleranza si restringe; un ritmo al secondo per contare non c’è. Tutte le transizioni sono morbide, senza lampi né effetti di avvertimento rossi.',
    },
  },
  sources: [
    src('Bartolo & Merchant (2009). Learning and generalization of time production in humans: Rules of transfer across modalities and interval durations. Experimental Brain Research', 'https://doi.org/10.1007/s00221-009-1895-1'),
    src('Grondin (2010). Timing and time perception: A review of recent behavioral and neuroscience findings and theoretical directions. Attention, Perception, & Psychophysics', 'https://doi.org/10.3758/APP.72.3.561'),
    src('Merchant, Harrington & Meck (2013). Neural basis of the perception and estimation of time. Annual Review of Neuroscience', 'https://doi.org/10.1146/annurev-neuro-062012-170349'),
    src('Brown (1997). Attentional resources in timing: Interference effects in concurrent temporal and nontemporal working memory tasks. Perception & Psychophysics', 'https://doi.org/10.3758/BF03205526'),
    src('Wright, Buonomano, Mahncke & Merzenich (1997). Learning and generalization of auditory temporal-interval discrimination in humans. The Journal of Neuroscience', 'https://doi.org/10.1523/JNEUROSCI.17-10-03956.1997'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice. Butterworth-Heinemann, S. 43–44', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
