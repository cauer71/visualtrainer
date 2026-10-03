import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'dunkelphasen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Einer Kugel mit den Augen folgen, die weich ausblendet und unsichtbar weiterläuft, und nach dem Wiederauftauchen ein Zeichen erkennen.',
      daily: 'Bewegtes im Blick behalten, das kurz verdeckt wird: hinter einem Pfosten, einem Baum oder einer Hand.',
      research:
        'Im Labor läuft das Auge bei einem kurz verschwindenden Ziel zunächst etwa 0,2 Sekunden mit unverändertem Tempo weiter und fällt dann auf etwa die Hälfte ab; bei einer Sekunde Dunkelheit bleibt nur etwa ein Drittel. Viele Personen beschleunigen vor dem erwarteten Wiederauftauchen wieder – allerdings zu einem festen Zeitpunkt, nicht passend zur tatsächlichen Dauer. Mit Rückmeldung für genaues Folgen stieg die Genauigkeit in einer Laborstudie nach 8 bis 10 Sitzungen deutlich, ohne Rückmeldung nur wenig. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Für Blickfolge mit einem weich ausblendenden Bildschirmziel wurde keine Studie gefunden. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Die Kugel blinkt nicht: Sie blendet sinusförmig aus und wieder ein (jede Blende mindestens 0,2 Sekunden), höchstens alle 2 Sekunden einmal, ohne Leuchtsaum und ohne Rot, damit kein Flackern entsteht. Im Dunkeln läuft sie gerade und unsichtbar weiter, danach erscheint in ihr ein Landolt-Ring, den du mit einem großen Button meldest – so wird das Vorausahnen verlangt statt nur behauptet. Ob die Augen wirklich im Dunkeln weiterlaufen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Auf niedrigen Stufen zeigt ein schwacher Umriss, wo die Kugel ist; Dunkelheit, Tempo und Zeichengröße passen sich deinem Ergebnis an, und du bekommst sofort ✓/✗ als Rückmeldung. Vor der Übung steht ein Hinweis für lichtempfindliche Menschen.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che sfuma piano e corre invisibile, e riconoscere un segno dopo la ricomparsa.',
      daily: 'Tenere d’occhio ciò che si muove e viene coperto per un attimo: dietro un palo, un albero o una mano.',
      research:
        'In laboratorio, con un bersaglio che sparisce per un attimo, l’occhio continua dapprima per circa 0,2 secondi alla velocità invariata e poi scende a circa la metà; con un secondo di buio ne resta solo circa un terzo. Molte persone riaccelerano prima della ricomparsa attesa – ma a un momento fisso, non adatto alla durata effettiva. Con un riscontro per l’inseguimento preciso, in uno studio di laboratorio la precisione saliva nettamente dopo 8–10 sedute, senza riscontro solo poco. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Per l’inseguimento di un bersaglio sullo schermo che sfuma piano non è stato trovato alcuno studio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'La sfera non lampeggia: sfuma e ricompare in modo sinusoidale (ogni dissolvenza dura almeno 0,2 secondi), al massimo una volta ogni 2 secondi, senza alone luminoso e senza rosso, perché non ci sia sfarfallio. Nel buio corre dritta e invisibile, poi compare al suo interno un anello di Landolt che segnali con un grande pulsante – così prevedere viene richiesto invece di essere solo affermato. Se gli occhi proseguono davvero nel buio, comunque non viene misurato, ma solo se riconosci il segno. Ai livelli bassi un debole contorno mostra dov’è la sfera; buio, velocità e dimensione del segno si adattano al tuo risultato, e ricevi subito ✓/✗ come riscontro. Prima dell’esercizio c’è un avviso per chi è sensibile alla luce.',
    },
  },
  sources: [
    src(
      'Becker & Fuchs (1985). Prediction in the oculomotor system: Smooth pursuit during transient disappearance of a visual target. Experimental Brain Research',
      'https://doi.org/10.1007/BF00237843',
    ),
    src(
      'Bennett & Barnes (2003). Human ocular pursuit during the transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.01145.2002',
    ),
    src(
      'Lencer et al. (2004). Cortical mechanisms of smooth pursuit eye movements with target blanking. An fMRI study. European Journal of Neuroscience',
      'https://doi.org/10.1111/j.1460-9568.2004.03229.x',
    ),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
    src(
      'Harding, Wilkins, Erba, Barkley & Fisher (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. Epilepsia',
      'https://doi.org/10.1111/j.1528-1167.2005.31305.x',
    ),
  ],
};
