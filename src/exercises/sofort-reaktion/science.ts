import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'sofort-reaktion',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Gleichmäßig und ohne zu raten auf ein warmweißes Aufleuchten in der Mitte reagieren, dessen Zeitpunkt sich nicht vorhersagen lässt.',
      daily: 'Auf ein Signal reagieren, etwa eine aufleuchtende Anzeige oder ein Startzeichen im Sport; Aufmerksam-Bleiben bei Wartezeiten.',
      research:
        'Die einfache Reaktionszeit ist bei einer Person recht stabil; sie hängt von Helligkeit des Reizes, Tagesform, Alter und Gerät ab. Wie lange man vorher wartet, beeinflusst die Zeit: Damit sich der Zeitpunkt nicht erraten lässt, ist die Wartezeit hier so verteilt, dass die Wahrscheinlichkeit für „jetzt kommt es“ gleich bleibt. Im Browser und am Touchscreen wird die Zeit systematisch zu lang gemessen (je nach Gerät grob 50 bis 130 Millisekunden), innerhalb eines Geräts aber gleichmäßig – deshalb zählt nur der Vergleich mit dir selbst auf diesem Gerät. Ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt.',
      improved:
        'Die Wartezeit ist so verteilt, dass sich der Zeitpunkt nicht erraten lässt: Auf eine feste Mindestzeit folgt ein Anteil, bei dem die Überraschung gleich bleibt. Ein Tipp vor dem Licht oder in den ersten 100 Millisekunden danach zählt als Frühstart und nicht mit; sehr schnelle Antworten werden gesondert gezählt. Ausgewertet werden Median und Streuung statt des Mittelwerts. Das Licht blendet weich warmweiß ein, ohne Grün, Rot oder Blitz; eine Runde hat eine feste Zahl von Durchgängen, ohne Zeitkonto, Strafabzug oder Ränge. Dazu gehört der ehrliche Hinweis, dass Touch die Zeit zu lang misst.',
    },
    it: {
      trains: 'Reagire in modo regolare e senza indovinare a un’illuminazione bianco caldo al centro, il cui momento non si può prevedere.',
      daily: 'Reagire a un segnale, come un indicatore che si accende o un segnale di partenza nello sport; restare attenti durante le attese.',
      research:
        'Il tempo di reazione semplice è abbastanza stabile in una persona; dipende dalla luminosità dello stimolo, dalla forma del giorno, dall’età e dal dispositivo. Anche quanto si è aspettato prima influisce: perché il momento non si possa indovinare, qui l’attesa è distribuita in modo che la probabilità di “adesso arriva” resti uguale. Nel browser e sul touchscreen il tempo viene misurato in modo sistematicamente troppo lungo (a seconda del dispositivo circa 50–130 millisecondi), ma in modo regolare all’interno dello stesso dispositivo – per questo conta solo il confronto con te stesso su questo dispositivo. Un’utilità per sport, traffico o vita quotidiana non è dimostrata.',
      improved:
        'L’attesa è distribuita in modo che il momento non si possa indovinare: a un tempo minimo fisso segue una parte in cui la sorpresa resta uguale. Un tocco prima della luce o nei primi 100 millisecondi dopo conta come falsa partenza e non viene valutato; le risposte molto rapide sono contate a parte. Si valutano mediana e dispersione invece della media. La luce compare in modo dolce, bianco caldo, senza verde, rosso o lampi; un turno ha un numero fisso di prove, senza conto alla rovescia, penalità o classifiche. A ciò si aggiunge l’avviso onesto che il touch misura il tempo troppo lungo.',
    },
  },
  sources: [
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Niemi & Näätänen (1981). Foreperiod and simple reaction time. Psychological Bulletin', 'https://doi.org/10.1037/0033-2909.89.1.133'),
    src('Basner, Hermosillo, Nasrini, McGuire, Saxena, Moore, Gur & Dinges (2018). Repeated administration effects on Psychomotor Vigilance Test performance. Sleep', 'https://doi.org/10.1093/sleep/zsx187'),
    src('Pins & Bonnet (1996). On the relation between stimulus intensity and processing time: Piéron’s law and choice reaction time. Perception & Psychophysics', 'https://doi.org/10.3758/BF03206815'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Deber, Jota, Forlines & Wigdor (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. Proceedings of CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
    src('Dykiert, Der, Starr & Deary (2012). Age differences in intra-individual variability in simple and choice reaction time: Systematic review and meta-analysis. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0045759'),
    src('Kida, Oda & Matsumura (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. Cognitive Brain Research', 'https://doi.org/10.1016/j.cogbrainres.2004.09.003'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
