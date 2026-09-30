import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'sprungziel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Kugel, die weich ausblendet und an neuer Stelle wieder auftaucht, schnell wiederfinden und ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Etwas Bewegtes an neuer Stelle wiederfinden: nach einem Blick aufs Handy, hinter einer Ecke oder einem Hindernis.',
      research:
        'Im Labor startet ein Blicksprung auf ein plötzlich auftauchendes Ziel meist etwa 0,15 Sekunden nach dessen Erscheinen. Bewegt sich das Ziel, rechnen kleine Aufholsprünge des Blicks seine Position und sein Tempo mit ein, und nach etwa einer Zehntelsekunde setzt die gleichmäßige Blickfolge wieder ein. Mit Rückmeldung für genaues Folgen lernten Versuchspersonen in einer Laborstudie deutlich mehr als ohne. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt.',
      improved:
        'Das Original versetzt einen Punkt im festen Takt schlagartig und misst nichts. Hier blendet die Kugel weich aus und an einem anderen Ort weich wieder ein (je mindestens 0,15 Sekunden, kein Blitzen) und läuft mit gleicher Richtung und gleichem Tempo weiter. Kurz nach dem Auftauchen erscheint in ihr ein Landolt-Ring, den du mit einem großen Button meldest – das Wiederfinden wird so verlangt statt nur behauptet. Ob die Augen wirklich springen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Sprungweite, die Zeit bis zum Zeichen, Tempo und Zeichengröße passen sich an.',
    },
    it: {
      trains: 'Ritrovare in fretta una sfera che sfuma piano e riappare in un altro punto, e riconoscere un segno mostrato per un attimo.',
      daily: 'Ritrovare in un altro punto qualcosa che si muove: dopo uno sguardo al telefono, dietro un angolo o un ostacolo.',
      research:
        'In laboratorio uno scatto dello sguardo verso un bersaglio che compare all’improvviso parte di solito circa 0,15 secondi dopo la comparsa. Se il bersaglio si muove, piccoli scatti di recupero tengono conto della sua posizione e velocità, e dopo circa un decimo di secondo riprende l’inseguimento regolare. Con un riscontro per l’inseguimento preciso, in uno studio di laboratorio i partecipanti imparavano molto più che senza. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato.',
      improved:
        'L’originale sposta un punto di colpo a ritmo fisso e non misura nulla. Qui la sfera sfuma piano e ricompare piano in un altro posto (ogni volta almeno 0,15 secondi, nessun lampeggio) e prosegue con la stessa direzione e la stessa velocità. Poco dopo la comparsa mostra al suo interno un anello di Landolt che segnali con un grande pulsante – così ritrovare la sfera viene richiesto invece di essere solo affermato. Se gli occhi saltano davvero, comunque non viene misurato, ma solo se riconosci il segno. Lunghezza del salto, tempo fino al segno, velocità e dimensione del segno si adattano.',
    },
  },
  sources: [
    src(
      'Fischer & Ramsperger (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. Experimental Brain Research',
      'https://doi.org/10.1007/BF00231145',
    ),
    src(
      'de Brouwer, Missal, Barnes & Lefèvre (2002). Quantitative analysis of catch-up saccades during sustained pursuit. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00621.2001',
    ),
    src('Carl & Gellman (1987). Human smooth pursuit: Stimulus-dependent responses. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.1987.57.5.1446'),
    src('Lisberger (1998). Postsaccadic enhancement of initiation of smooth pursuit eye movements in monkeys. Journal of Neurophysiology', 'https://doi.org/10.1152/jn.1998.79.4.1918'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
