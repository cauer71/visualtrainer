import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'tasten-wahl',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Ein angezeigtes Zeichen der passenden Bildschirmtaste zuordnen und diese schnell antippen – erst aus zwei, dann aus drei und vier Tasten, später mit wechselnden Plätzen.',
      daily: 'Aus mehreren Möglichkeiten die passende wählen und antippen: am Automaten, am Fahrkartenschalter, am Tablet oder Handy.',
      research:
        'Je mehr Antworten zur Wahl stehen, desto länger dauert die Reaktion – der Zuwachs folgt etwa dem Logarithmus der Zahl der Möglichkeiten (Hick’sches Gesetz). Übung und eine naheliegende Zuordnung von Zeichen und Taste verkleinern diesen Zuwachs, geübte Zuordnungen laufen weitgehend automatisch ab, aber nur für die geübten Paare. Bei Tippern wurde gezeigt, dass Wege (Fitts) und Auswahl (Hick) gegeneinander abgewogen werden. Webanwendungen messen Reaktionszeiten auf Touchgeräten systematisch zu lang (Smartphones um etwa 58 bis 70 Millisekunden, Laptops um 62 bis 133); absolute Zeiten sind zwischen Geräten kaum vergleichbar, Unterschiede bei derselben Person auf demselben Gerät dagegen schon. Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Straßenverkehr ist nicht belegt.',
      improved:
        'Das Original braucht eine echte Tastatur und wertet Tastenpositionen aus. Hier sind es vier große Bildschirmtasten (mindestens 56 Pixel) mit Form und Buchstabe statt nur Farbe; die Tastatur (Ziffern 1 bis 4) geht zusätzlich. Die Stufe regelt Tastenzahl, Mischen und Antwortfrist (nicht Punkte). Es gibt eine feste Zahl von Durchgängen ohne Zeitbonus, keine Fallen-Tasten, keine Ränge und keinen roten Blitz. Zu frühes Tippen und Doppeltipps werden sauber getrennt, und Median sowie Streuung der Zeiten werden angezeigt. Die Zeiten am Tablet sind ehrlich nur als Vergleich mit dir selbst gedacht.',
    },
    it: {
      trains: 'Abbinare un segno mostrato al tasto giusto sullo schermo e toccarlo in fretta – prima tra due, poi tra tre e quattro tasti, più avanti con posti che cambiano.',
      daily: 'Scegliere e toccare quella giusta tra più possibilità: al distributore, alla biglietteria, sul tablet o sul telefono.',
      research:
        'Più risposte ci sono tra cui scegliere, più dura la reazione – l’aumento segue all’incirca il logaritmo del numero di possibilità (legge di Hick). L’esercizio e un abbinamento naturale tra segno e tasto riducono questo aumento; gli abbinamenti esercitati diventano in gran parte automatici, ma solo per le coppie esercitate. Nei dattilografi si è visto che percorsi (Fitts) e scelta (Hick) vengono bilanciati. Le applicazioni web misurano i tempi di reazione sui dispositivi touch sistematicamente troppo lunghi (smartphone di circa 58–70 millisecondi, portatili di 62–133); i tempi assoluti sono poco confrontabili tra dispositivi, le differenze della stessa persona sullo stesso dispositivo invece sì. Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'L’originale richiede una tastiera vera e valuta le posizioni dei tasti. Qui ci sono quattro grandi tasti sullo schermo (almeno 56 pixel) con forma e lettera invece del solo colore; la tastiera (cifre da 1 a 4) funziona in più. Il livello regola numero di tasti, rimescolamento e tempo di risposta (non i punti). Il numero di prove è fisso, senza bonus di tempo, senza tasti trappola, senza classifiche e senza lampi rossi. Tocchi troppo presto e doppi tocchi sono separati correttamente, e vengono mostrati mediana e variazione dei tempi. I tempi sul tablet vanno intesi onestamente solo come confronto con te stesso.',
    },
  },
  sources: [
    src('Hick (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470215208416600'),
    src('Proctor & Schneider (2018). Hick’s law for choice reaction time: A review. Quarterly Journal of Experimental Psychology', 'https://doi.org/10.1080/17470218.2017.1322622'),
    src('Logan, Ulrich & Lindsey (2016). Different (key)strokes for different folks: How standard and nonstandard typists balance Fitts’ law and Hick’s law. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/xhp0000272'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Logan (1988). Toward an instance theory of automatization. Psychological Review', 'https://doi.org/10.1037/0033-295X.95.4.492'),
    src('Sala, Tatlidil & Gobet (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. Psychological Bulletin', 'https://doi.org/10.1037/bul0000139'),
  ],
};
