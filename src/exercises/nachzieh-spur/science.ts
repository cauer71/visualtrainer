import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'nachzieh-spur',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Dem hellen Kopf einer Kugel mit den Augen folgen, obwohl sie einen weichen Schweif hinter sich herzieht, und ein Zeichen im Kopf erkennen.',
      daily: 'Bei Bewegtem am Wesentlichen bleiben, auch wenn daneben etwas nachzieht oder ablenkt: ein Feuerwerk, ein Funke, ein Lichtstreifen im Dunkeln.',
      research:
        'Im Labor folgt das Auge einem gleichmäßig bewegten Ziel nie ganz genau: Es bleibt etwas zurück und holt mit kleinen Sprüngen auf, umso mehr, je schneller das Ziel ist. Aufmerksamkeit und Blickfolge hängen eng zusammen: Wer auf das Ziel achtet, folgt ihm besser. Zusätzliche Reize neben dem Ziel können die Blickfolge stören. In einer kleinen Studie (je 10 Personen) war die Blickfolge nach kurzem Üben mit einem unregelmäßig bewegten Ziel noch nach fünf Tagen etwas genauer; in einer anderen Laborstudie verstärkte Rückmeldung das Lernen. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt. Aus der Praxis der funktionellen Optometrie stammt die Regel, Blickfolge bei ruhigem Kopf nur mit den Augen zu üben und in kleinen, selbst gesteuerten Schritten zu steigern; belegt ist das nicht.',
      improved:
        'Die Kugel zieht einen weichen, gleichmäßig verblassenden Schweif als Ablenkung hinter sich her – ohne Blinken und ohne Leuchtsaum, damit keine Flimmerreize entstehen. Das Zeichen erscheint immer im hellen Kopf, nie im Schweif, und du meldest es mit einem großen Button: Dranbleiben am Kopf wird so verlangt statt nur behauptet. Ob die Augen wirklich am Kopf bleiben, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Länge und Helligkeit des Schweifs, Tempo und Zeichengröße passen sich an, und du bekommst sofort ✓/✗ als Rückmeldung.',
    },
    it: {
      trains: 'Seguire con lo sguardo la testa luminosa di una sfera che trascina una scia morbida, e riconoscere un segno nella testa.',
      daily: 'Restare sull’essenziale quando qualcosa si muove, anche se accanto c’è una scia o una distrazione: un fuoco d’artificio, una scintilla, una striscia di luce al buio.',
      research:
        'In laboratorio l’occhio non segue mai del tutto esattamente un bersaglio che si muove in modo regolare: resta un po’ indietro e recupera con piccoli scatti, tanto più quanto il bersaglio è veloce. Attenzione e inseguimento sono strettamente legati: chi è attento al bersaglio lo segue meglio. Stimoli aggiuntivi accanto al bersaglio possono disturbare l’inseguimento. In un piccolo studio (10 persone per gruppo) l’inseguimento era un po’ più preciso ancora dopo cinque giorni da un breve esercizio con un bersaglio dal movimento irregolare; in un altro studio di laboratorio il riscontro rafforzava l’apprendimento. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato. Dalla pratica dell’optometria funzionale viene la regola di esercitare l’inseguimento con la testa ferma, solo con gli occhi, e di aumentare la difficoltà a piccoli passi, decisi da sé; non è dimostrato.',
      improved:
        'La sfera trascina come distrazione una scia morbida che sfuma in modo uniforme – senza lampeggi e senza alone luminoso, così non nascono stimoli intermittenti. Il segno compare sempre nella testa luminosa, mai nella scia, e lo segnali con un grande pulsante: restare sulla testa viene così richiesto invece di essere solo affermato. Se gli occhi restano davvero sulla testa, comunque non viene misurato, ma solo se riconosci il segno. Lunghezza e luminosità della scia, velocità e dimensione del segno si adattano, e ricevi subito ✓/✗ come riscontro.',
    },
  },
  sources: [
    src('Spering, Gegenfurtner & Kerzel (2006). Distractor interference during smooth pursuit eye movements. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.32.5.1136'),
    src('Khurana & Kowler (1987). Shared attentional control of smooth eye movement and perception. Vision Research', 'https://doi.org/10.1016/0042-6989(87)90168-4'),
    src(
      'Collewijn & Tamminga (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. The Journal of Physiology',
      'https://doi.org/10.1113/jphysiol.1984.sp015242',
    ),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
