import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'tempo-wechsel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Einer Kugel mit den Augen folgen, die weich ihr Tempo und ihre Richtung wechselt, und danach ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Bewegtes im Blick behalten, das schneller oder langsamer wird und die Richtung ändert: ein Ball, ein Hund an der Leine, ein Fahrrad.',
      research:
        'Im Labor reagiert das Auge auf eine plötzliche Änderung der Bewegung des Ziels erst nach etwa einer Zehntelsekunde: Bei einem Richtungswechsel sinkt das Augentempo nach rund 90 Millisekunden, die neue Richtung setzt nach rund 130 Millisekunden ein, und kleine Aufholsprünge des Blicks gleichen den Rest aus. Auf kleine Schwankungen des Tempos antwortet das Auge mit etwa 70 Millisekunden Verzögerung. Unregelmäßig bewegte Ziele lassen sich schlechter vorausahnen als gleichmäßige. In einer kleinen Studie (je 10 Personen) war die Blickfolge nach kurzem Üben mit einem unregelmäßig bewegten Ziel noch nach fünf Tagen etwas genauer; in einer anderen Laborstudie verstärkte Rückmeldung das Lernen. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Das Original würfelt in jedem Bild, ob das Ziel Haken schlägt – die Wechselrate hängt so vom Gerät ab –, dreht das Tempo von selbst immer höher und misst nichts. Hier wechselt die Kugel nach der Uhr und unregelmäßig weich Tempo und Richtung, nie mit einem Sprung. Ein Landolt-Ring erscheint erst, wenn das Tempo wieder ruhig ist, und du meldest ihn mit einem großen Button – das Dranbleiben wird so verlangt statt nur behauptet. Ob die Augen wirklich folgen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Stärke und Häufigkeit der Wechsel sowie die Zeichengröße passen sich an, und du bekommst sofort ✓/✗ als Rückmeldung.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che cambia piano velocità e direzione, e riconoscere poi un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio ciò che diventa più veloce o più lento e cambia direzione: una palla, un cane al guinzaglio, una bicicletta.',
      research:
        'In laboratorio l’occhio reagisce a un cambio improvviso del movimento del bersaglio solo dopo circa un decimo di secondo: a un cambio di direzione la velocità dell’occhio cala dopo circa 90 millisecondi, la nuova direzione parte dopo circa 130 millisecondi, e piccoli scatti di recupero dello sguardo correggono il resto. A piccole oscillazioni della velocità l’occhio risponde con circa 70 millisecondi di ritardo. I bersagli dal movimento irregolare si prevedono peggio di quelli regolari. In un piccolo studio (10 persone per gruppo) l’inseguimento era un po’ più preciso ancora dopo cinque giorni da un breve esercizio con un bersaglio dal movimento irregolare; in un altro studio di laboratorio il riscontro rafforzava l’apprendimento. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'L’originale tira a sorte in ogni fotogramma se il bersaglio fa uno scarto – così la frequenza dei cambi dipende dal dispositivo –, alza da solo sempre di più la velocità e non misura nulla. Qui la sfera cambia velocità e direzione in modo morbido, a intervalli irregolari secondo l’orologio, mai con uno scatto. Un anello di Landolt compare solo quando la velocità è di nuovo calma, e lo segnali con un grande pulsante – così restare sulla sfera viene richiesto invece di essere solo affermato. Se gli occhi seguono davvero, comunque non viene misurato, ma solo se riconosci il segno. Forza e frequenza dei cambi e dimensione del segno si adattano, e ricevi subito ✓/✗ come riscontro.',
    },
  },
  sources: [
    src(
      'Soechting, Mrotek & Flanders (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-004-2010-2',
    ),
    src('Tavassoli & Ringach (2009). Dynamics of smooth pursuit maintenance. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.91320.2008'),
    src(
      'Bahill, Iandolo & Troost (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. Vision Research',
      'https://doi.org/10.1016/0042-6989(80)90073-5',
    ),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
