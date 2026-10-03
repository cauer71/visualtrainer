import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'richtungschaos',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Einer Kugel mit den Augen folgen, die in unregelmäßigen, weichen Bögen driftet, und zwischendurch ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Bewegtes im Blick behalten, das nicht geradeaus läuft: ein Schmetterling, ein Laubblatt im Wind, ein Kind beim Spielen.',
      research:
        'Im Labor braucht das Auge nach dem Start einer Zielbewegung etwa eine Zehntelsekunde, bis es mitläuft, und kleine Aufholsprünge gleichen Rückstände aus. Bei Zielen mit zufälligem Verlauf sagt das Auge einen Teil der Bewegung voraus; je unruhiger der Verlauf, desto ungenauer folgt es. In einer kleinen Studie (je 10 Personen) war die Blickfolge nach kurzem Üben mit einem zufällig bewegten Ziel noch nach fünf Tagen etwas genauer; in einer anderen Laborstudie verstärkte Rückmeldung das Lernen. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Die Kugel driftet mit gleichmäßigem Tempo in unregelmäßigen, aber stets glatten Bögen – ohne Haken, nach der Uhr und unabhängig von der Bildrate des Geräts; am Rand dreht sie sanft bei. Zwischendurch erscheint in ihr ein Landolt-Ring, den du mit einem großen Button meldest: Dranbleiben wird so verlangt statt nur behauptet. Ob die Augen wirklich folgen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Die Unregelmäßigkeit des Wegs sowie Zeichengröße und -dauer passen sich an, und du bekommst sofort ✓/✗ als Rückmeldung.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che va alla deriva in curve irregolari e morbide, e riconoscere ogni tanto un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio ciò che non va dritto: una farfalla, una foglia nel vento, un bambino che gioca.',
      research:
        'In laboratorio l’occhio impiega circa un decimo di secondo dopo l’inizio del movimento del bersaglio per mettersi a seguirlo, e piccoli scatti di recupero compensano i ritardi. Con bersagli dal percorso casuale l’occhio prevede in anticipo una parte del movimento; più il percorso è agitato, meno preciso è l’inseguimento. In un piccolo studio (10 persone per gruppo) l’inseguimento era un po’ più preciso ancora dopo cinque giorni da un breve esercizio con un bersaglio dal movimento casuale; in un altro studio di laboratorio il riscontro rafforzava l’apprendimento. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'La sfera va alla deriva a velocità regolare in curve irregolari ma sempre morbide – senza scarti, secondo l’orologio e indipendentemente dalla frequenza dei fotogrammi del dispositivo; sul bordo vira con dolcezza. Ogni tanto compare al suo interno un anello di Landolt che segnali con un grande pulsante: restare sulla sfera viene così richiesto invece di essere solo affermato. Se gli occhi seguono davvero, comunque non viene misurato, ma solo se riconosci il segno. L’irregolarità del percorso e dimensione e durata del segno si adattano, e ricevi subito ✓/✗ come riscontro.',
    },
  },
  sources: [
    src(
      'Barnes, Donnelly & Eason (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. The Journal of Physiology',
      'https://doi.org/10.1113/jphysiol.1987.sp016649',
    ),
    src('Carl & Gellman (1987). Human smooth pursuit: Stimulus-dependent responses. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.1987.57.5.1446'),
    src('de Brouwer, Yuksel, Blohm, Missal & Lefèvre (2002). What triggers catch-up saccades during visual tracking? Journal of Neurophysiology', 'https://doi.org/10.1152/jn.00432.2001'),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
