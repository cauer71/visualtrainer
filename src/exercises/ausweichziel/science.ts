import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'ausweichziel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Einer gleichmäßig laufenden Kugel mit den Augen folgen, auch wenn sie weich ausweicht, und danach ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Bewegtes im Blick behalten, das die Richtung ändert: ein Ball, ein Fahrrad, ein Kind auf dem Gehweg.',
      research:
        'Im Labor reagiert das Auge auf einen plötzlichen Richtungswechsel des Ziels erst nach etwa einer Zehntelsekunde: Es läuft zunächst in die alte Richtung weiter, dann setzt die neue ein, und kleine Aufholsprünge des Blicks korrigieren den Rest. In einer kleinen Studie (je 10 Personen) war die Blickfolge nach kurzem Üben mit einem unvorhersehbar bewegten Ziel noch nach fünf Tagen etwas genauer, und Rückmeldung verstärkte das Lernen. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Das Original zeigt nur einen Punkt, der im festen Takt harte Haken schlägt, und misst nichts. Hier läuft die Kugel gleichmäßig und weicht in unregelmäßigen Abständen mit einem weichen Bogen aus. Kurz danach erscheint in ihr ein Landolt-Ring, den du mit einem großen Button meldest – das Wiederfinden wird so verlangt statt nur behauptet. Ob die Augen wirklich folgen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Tempo, Schärfe und Häufigkeit des Ausweichens sowie die Zeichengröße passen sich an, und du bekommst sofort ✓/✗ als Rückmeldung.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che corre in modo regolare, anche quando schiva con una curva morbida, e riconoscere poi un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio ciò che cambia direzione: una palla, una bicicletta, un bambino sul marciapiede.',
      research:
        'In laboratorio l’occhio reagisce a un cambio di direzione improvviso del bersaglio solo dopo circa un decimo di secondo: prima continua nella vecchia direzione, poi parte la nuova, e piccoli scatti di recupero dello sguardo correggono il resto. In un piccolo studio (10 persone per gruppo) l’inseguimento era un po’ più preciso ancora dopo cinque giorni da un breve esercizio con un bersaglio dal movimento imprevedibile, e il riscontro rafforzava l’apprendimento. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'L’originale mostra solo un punto che fa scarti netti a ritmo fisso e non misura nulla. Qui la sfera corre in modo regolare e schiva a intervalli irregolari con una curva morbida. Poco dopo compare al suo interno un anello di Landolt che segnali con un grande pulsante – così ritrovare la sfera viene richiesto invece di essere solo affermato. Se gli occhi seguono davvero, comunque non viene misurato, ma solo se riconosci il segno. Velocità, nettezza e frequenza della schivata e dimensione del segno si adattano, e ricevi subito ✓/✗ come riscontro.',
    },
  },
  sources: [
    src(
      'Soechting, Mrotek & Flanders (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-004-2010-2',
    ),
    src('de Brouwer, Yuksel, Blohm, Missal & Lefèvre (2002). What triggers catch-up saccades during visual tracking? Journal of Neurophysiology', 'https://doi.org/10.1152/jn.00432.2001'),
    src('Orban de Xivry & Lefèvre (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.2007.139881'),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
