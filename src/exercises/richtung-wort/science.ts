import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'richtung-wort',
  evidence: 'medium',
  texts: {
    de: {
      trains:
        'Ein Zeichen als Richtung verstehen und das Feld antippen, auf dem das passende Wort steht – erst bei Wörtern an ihrer Lage, dann bei vertauschten Wörtern, später mit Schrägpfeil, Kurve und Antwortzeit.',
      daily: 'Wegweiser, Schilder und Bedienfelder lesen und das Passende antippen: am Automaten, am Tablet oder am Handy.',
      research:
        'Wie schnell man auf ein Zeichen antwortet, hängt davon ab, wie gut Zeichen und Antwort zusammenpassen: Steht die Antwort an der Stelle, auf die das Zeichen deutet, geht es schnell (Reiz-Reaktions-Kompatibilität, Fitts & Seeger 1953). Widerspricht die Lage dem Wort, kostet das Zeit und führt zu mehr Fehlern, weil Lesen automatisch mitläuft (Stroop 1935, MacLeod 1991) und Lage und Bedeutung einander in die Quere kommen (Lu & Proctor 1995). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Straßenverkehr ist nicht belegt. Am Touchscreen werden Zeiten je nach Gerät 30 bis 130 Millisekunden zu lang gemessen (Pronk et al. 2020), deshalb zählt nur der Vergleich mit dir selbst auf demselben Gerät.',
      improved:
        'Die Stufen bauen die Kompatibilität schrittweise ab (alle Wörter an der Lage, ein Paar vertauscht, alle gemischt); erst danach kommen Zeichenvielfalt und eine weiche Antwortfrist dazu. Es gibt keine Zeitstrafe und keinen roten Blitz, Fehler zeigen ein kleines ✗ und den richtigen Platz. Als Zusatzwerte erscheinen nur Vergleiche mit dir selbst: Mehrzeit bei vertauschtem Wort, Lage- und Achsenfehler. Zu frühes Tippen und Doppeltipps werden sauber getrennt.',
    },
    it: {
      trains:
        'Capire un segno come direzione e toccare il campo con la parola giusta – prima con parole al loro posto, poi con parole scambiate, più avanti con freccia obliqua, curva e tempo di risposta.',
      daily: 'Leggere cartelli, indicazioni e pannelli e toccare quello giusto: al distributore, sul tablet o sul telefono.',
      research:
        'La rapidità con cui si risponde a un segno dipende da quanto segno e risposta si accordano: se la risposta sta dove punta il segno, è veloce (compatibilità stimolo-risposta, Fitts & Seeger 1953). Se la posizione contraddice la parola, serve più tempo e si sbaglia di più, perché la lettura procede in automatico (Stroop 1935, MacLeod 1991) e posizione e significato si ostacolano (Lu & Proctor 1995). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata. Sul touchscreen i tempi vengono misurati, a seconda del dispositivo, da 30 a 130 millisecondi troppo lunghi (Pronk et al. 2020): conta quindi solo il confronto con te stesso sullo stesso dispositivo.',
      improved:
        'I livelli riducono la compatibilità passo dopo passo (tutte le parole al loro posto, una coppia scambiata, tutte mescolate); solo dopo arrivano varietà dei segni e un tempo di risposta morbido. Nessuna penalità di tempo e nessun lampo rosso: gli errori mostrano una piccola ✗ e il posto giusto. Come valori aggiuntivi compaiono solo confronti con te stesso: tempo in più con parola scambiata, errori di posizione e di asse. Tocchi troppo presto e doppi tocchi sono separati correttamente.',
    },
  },
  sources: [
    src('Fitts & Seeger (1953). S-R compatibility: Spatial characteristics of stimulus and response codes. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0062827'),
    src('Stroop (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0054651'),
    src('Lu & Proctor (1995). The influence of irrelevant location information on performance: A review of the Simon and spatial Stroop effects. Psychonomic Bulletin & Review', 'https://doi.org/10.3758/BF03210959'),
    src('MacLeod (1991). Half a century of research on the Stroop effect: An integrative review. Psychological Bulletin', 'https://doi.org/10.1037/0033-2909.109.2.163'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Kornblum, S., Hasbroucq, T., & Osman, A. (1990). Dimensional overlap: Cognitive basis for stimulus-response compatibility – A model and taxonomy. Psychological Review', 'https://doi.org/10.1037/0033-295X.97.2.253'),
    src('Dutta, A., & Proctor, R. W. (1992). Persistence of stimulus-response compatibility effects with extended practice. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/0278-7393.18.4.801'),
    src('Wilkinson, A. J., & Yang, L. (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. Psychology and Aging', 'https://doi.org/10.1037/a0025926'),
    src('Proctor, R. W., & Schneider, D. W. (2018). Hick’s law for choice reaction time: A review. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470218.2017.1322622'),
  ],
};
