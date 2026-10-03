import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'winkel-halten',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ruhig abwarten und erst antippen, wenn ein Ziel an einem von zwei Rändern auftaucht – ohne vorher zu raten.',
      daily: 'Auf ein Signal warten und erst dann handeln; Ballspiele; Startsignal im Sport; Umschauen an einer Ecke.',
      research:
        'Wie schnell man auf einen Reiz reagiert, hängt davon ab, wie lange man vorher gewartet hat und ob man den Zeitpunkt erwarten kann. Damit das Warten nicht erraten werden kann, ist die Wartezeit hier so verteilt, dass die Wahrscheinlichkeit für „jetzt kommt es“ immer gleich bleibt. Ein plötzliches Auftauchen zieht die Aufmerksamkeit von selbst an. In Reaktionsaufgaben werden Menschen mit Übung schneller – ein Teil davon ist Gewöhnung an Gerät und Aufgabe. Ein Nutzen für Sport, Straßenverkehr oder Alltag ist nicht belegt. Am Touchscreen kommt die Geräteverzögerung zur Zeit hinzu; vergleiche dich nur mit dir selbst auf diesem Gerät. Plötzliche einseitige Sehausfälle, Doppelbilder oder Schwindel sind ein Anlass für ärztliche Abklärung und kein Übungsthema.',
      improved:
        'Die Wartezeit ist unvorhersehbar (nicht alternd), sodass sich der Zeitpunkt nicht erraten lässt. Ein Frühstart wird klar erkannt (Tipp vor dem Auftauchen oder weniger als 100 ms danach) und getrennt gezählt, ohne dass Zeit abgezogen wird. Das Ziel blendet weich ein und aus und schiebt sich langsam aus einem Durchgang heraus, ohne Blitz und ohne Wackeln; die Trefferkreise sind groß. Eine feste Zahl von Durchgängen ersetzt ein Zeitkonto, und die Stufe regelt Größe, Sichtzeit und Streuung der Höhe nach Erfolg. Angezeigt wird der Median statt des Mittelwerts; gemessen wird die Zeit bis zum Tipp, nicht der Blick.',
    },
    it: {
      trains: 'Aspettare con calma e toccare solo quando un bersaglio compare su uno dei due bordi – senza indovinare prima.',
      daily: 'Aspettare un segnale e agire solo allora; giochi con la palla; segnale di partenza nello sport; guardare oltre un angolo.',
      research:
        'La rapidità con cui si reagisce a uno stimolo dipende da quanto si è aspettato prima e dal fatto che si possa prevedere il momento. Perché l’attesa non si possa indovinare, qui è distribuita in modo che la probabilità di “adesso arriva” resti sempre uguale. Una comparsa improvvisa attira da sola l’attenzione. Nei compiti di reazione le persone diventano più veloci con l’esercizio – in parte è abitudine al dispositivo e al compito. Un’utilità per sport, traffico o vita quotidiana non è dimostrata. Sul touchscreen al tempo si aggiunge il ritardo del dispositivo; confrontati solo con te stesso su questo dispositivo. Perdita improvvisa della vista da un occhio, visione doppia o vertigini sono un motivo per un accertamento medico e non un tema di esercizio.',
      improved:
        'L’attesa è imprevedibile (senza invecchiamento), quindi il momento non si può indovinare. Una falsa partenza viene riconosciuta con chiarezza (tocco prima della comparsa o meno di 100 ms dopo) e contata a parte, senza togliere tempo. Il bersaglio compare e scompare gradualmente e scivola lentamente fuori da un passaggio, senza lampi e senza scosse; le aree di tocco sono ampie. Un numero fisso di prove sostituisce il conto alla rovescia e il livello regola grandezza, tempo di visibilità e dispersione in altezza in base al successo. Viene mostrata la mediana invece della media; si misura il tempo fino al tocco, non lo sguardo.',
    },
  },
  sources: [
    src('Niemi & Näätänen (1981). Foreperiod and simple reaction time. Psychological Bulletin', 'https://doi.org/10.1037/0033-2909.89.1.133'),
    src('Nobre & van Ede (2018). Anticipated moments: Temporal structure in attention. Nature Reviews Neuroscience', 'https://doi.org/10.1038/nrn.2017.141'),
    src('Yantis & Jonides (1984). Abrupt visual onsets and selective attention: Evidence from visual search. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.10.5.601'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier (S. 6, 28)', 'https://openlibrary.org/isbn/9780323029612'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Deber, Jota, Forlines & Wigdor (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. Proceedings of CHI ’15', 'https://doi.org/10.1145/2702123.2702300'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Fisher, Harding, Erba, Barkley & Wilkins (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. Epilepsia', 'https://doi.org/10.1111/j.1528-1167.2005.31405.x'),
  ],
};
