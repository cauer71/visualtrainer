// Quellen: jede Angabe einzeln per Crossref (Metadaten) und PubMed (Abstract, wo vorhanden) geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/periphery.js) stammen Ball et al. (1988) und Levitt (1971):
// - Ball et al. (1988): Crossref ✓, PubMed-Abstract gelesen: „nützliches Sehfeld = Bereich, aus dem in einer Fixation Information
//   aufgenommen werden kann; schrumpft mit dem Alter, durch Übung teilweise wiedergewonnen; Modell mit Ablenkern und Zweitaufgaben“.
//   NICHT aus dem Abstract belegt und daher gestrichen: die Prototyp-Aussage „… ist unter anderem für Verkehr und Sport relevant“.
// - Levitt (1971): Crossref ✓; kein PubMed-Abstract. Die Prototyp-Angabe „konvergiert auf etwa 71 %“ steht nur noch als
//   „rechnerisch etwa 70 %, bei kurzen Läufen ungenau“, weil García-Pérez (1998; Abstract geprüft) zeigt, dass feste Schrittweiten die
//   rechnerischen Zielwerte nicht zuverlässig erreichen und kurze Treppen verzerrt und ungenau sind.
// Ergänzt und geprüft: Strasburger et al. (2011; Abstract: Abhängigkeit von Reaktionszeit, zeitlicher Auflösung und Zeichenerkennung
// von der Exzentrizität; trotz Erratum 2024 im J Vis bibliografisch bestätigt), Vater & Strasburger (2021; Abstract: 93 Studien, keine mit
// Eye-Tracking, beste „passive“ Kontrolle durch Zweitaufgaben in der Mitte), Anstis (1974; Crossref ✓, PubMed ohne Abstract – nur Titel/Metadaten
// bestätigt: Sehschärfe hängt vom Ort auf der Netzhaut ab), Elze (2010), Guo et al. (2025).
// Nicht aufgenommen: Prototyp-Hinweise „Kinnstütze verbessert die Messung“ (nicht belegt), „in größerer Entfernung ist die Quote normalerweise deutlich
// niedriger“ (als Normaussage nicht belegt; nur als allgemeine Eigenschaft der Randwahrnehmung formuliert). Nicht bestätigt werden konnte:
// nichts Aufgenommenes; offen bleibt, wie stark die Exzentrizitätsformel (Abstand = Sehabstand · tan Winkel) im Prototyp (Objektgröße-Formel) abwich –
// das ist rechnerisch geklärt (siehe logic.ts), nicht durch eine Quelle.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-peripheres-erkennen',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Auf die Zahl in der Mitte schauen und einen kurz am Rand aufblitzenden Buchstaben erkennen. Abstand (in Sehwinkel), Dauer, Größe, Richtungen und Zahl der Antworten stellst du selbst ein; auf Wunsch sucht die App die Dauer, um die sich dein Ergebnis einpendelt.',
      daily:
        'Etwas am Rand bemerken, während man woanders hinschaut, zum Beispiel beim Umschauen im Raum oder beim Ballspiel. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Das „nützliche Sehfeld“ ist der Bereich, aus dem man in einem Blick Information aufnehmen kann; es wird mit dem Alter kleiner und ließ sich durch Übung teilweise wieder vergrößern (Ball et al., 1988). Die Sehschärfe hängt vom Ort auf der Netzhaut ab und nimmt zum Rand hin ab (Anstis, 1974); auch Reaktionszeit, zeitliche Auflösung und das Erkennen von Zeichen verändern sich mit dem Abstand von der Mitte (Strasburger et al., 2011). Darum sind Abstand, Dauer und Größe die Einstellungen, die das Ergebnis am stärksten bestimmen. Eine Übersicht zu Geräten für das Randsehen im Sport fand unter 93 Studien keine einzige mit Blickmessung; am besten kontrolliert waren Aufgaben mit einer Zweitaufgabe in der Mitte, und eine Übertragung auf den Sport wird erwartet, ist aber nicht nachgewiesen (Vater & Strasburger, 2021). Auch diese App misst den Blick nicht: Die Zahl in der Mitte gibt ihm nur einen Grund, dort zu bleiben, aber „Blick in der Mitte lassen“ ist eine Bitte, keine Kontrolle. Der Abstand wird als Sehwinkel angegeben und über deine Kalibrierung und den eingetragenen Sehabstand umgerechnet; stimmen sie nicht, stimmt auch der Winkel nicht. Die automatische Anpassung („zwei richtig → schwerer, ein Fehler → leichter“; Levitt, 1971) pendelt sich rechnerisch bei etwa 70 % richtigen Antworten ein; wie genau, hängt von Schrittgröße und Länge des Laufs ab, und kurze Läufe sind ungenau (García-Pérez, 1998). Auf Bildschirmen wird die Dauer in ganzen Bildern gezeigt; wie lange ein Buchstabe wirklich leuchtet, hängt zusätzlich von der Bildschirmtechnik ab (Elze, 2010). In Studien zu Sehübungen fallen die Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt, und sie prüft dein Gesichtsfeld nicht.',
      improved:
        'Der Abstand wird in Sehwinkel eingestellt und mit dem Sehabstand der Kalibrierung berechnet (Abstand = Sehabstand · tan Winkel). Passt der Winkel auf diesem Bildschirm nicht, wird er nach außen und nach innen begrenzt; der tatsächliche Winkel steht in jedem Durchgang und im Ergebnis, und zu Beginn erscheint eine Meldung. Die Zahl in der Mitte hat eine feste kleine Höhe, damit auch kleine Winkel passen. Die Anzeigedauer wird in ganzen Bildern gezählt und die tatsächlich verstrichene Zeit gemessen; gestörte Durchgänge zählen nicht für die automatische Anpassung, die in Bildern statt in Millisekunden läuft. Zwischen zwei Blitzen liegen immer mehr als eine Sekunde; der Buchstabe erscheint in gedämpftem Hellgrau, klein und ohne Vollflächeneffekte. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen. Gezeigt werden Trefferquote mit Zufallsniveau, Quote links/rechts und oben/unten, tatsächlicher Abstand, Antwortzeit und gemessene Dauer – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains:
        'Guardare il numero al centro e riconoscere una lettera che lampeggia per un attimo al margine. Distanza (in angolo visivo), durata, grandezza, direzioni e numero di risposte li imposti tu; a richiesta l’app cerca la durata attorno alla quale si assesta il tuo risultato.',
      daily:
        'Notare qualcosa al margine mentre si guarda altrove, per esempio guardandosi intorno in una stanza o nei giochi con la palla. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Il “campo visivo utile” è l’area dalla quale si può acquisire informazione in uno sguardo; diventa più piccolo con l’età e con l’esercizio si è in parte potuto riallargare (Ball et al., 1988). L’acuità visiva dipende dalla posizione sulla retina e diminuisce verso il margine (Anstis, 1974); anche tempo di reazione, risoluzione temporale e riconoscimento dei caratteri cambiano con la distanza dal centro (Strasburger et al., 2011). Per questo distanza, durata e grandezza sono le impostazioni che determinano di più il risultato. Una rassegna sugli strumenti per la visione periferica nello sport non ha trovato, tra 93 studi, nessuno con misurazione dello sguardo; meglio controllati erano i compiti con un compito secondario al centro, e un trasferimento allo sport è atteso ma non dimostrato (Vater & Strasburger, 2021). Anche questa app non misura lo sguardo: il numero al centro gli dà solo un motivo per restare lì, ma “sguardo al centro” è una richiesta, non un controllo. La distanza è indicata come angolo visivo e convertita con la tua calibrazione e la distanza di visione inserita; se non sono corrette, non è corretto nemmeno l’angolo. L’adattamento automatico (“due giusti → più difficile, un errore → più facile”; Levitt, 1971) in teoria si assesta intorno al 70 % di risposte giuste; quanto sia preciso dipende dalla dimensione dei passi e dalla lunghezza del giro, e i giri brevi sono imprecisi (García-Pérez, 1998). Sugli schermi la durata viene mostrata in immagini intere; per quanto tempo una lettera resta davvero accesa dipende inoltre dalla tecnologia dello schermo (Elze, 2010). Negli studi sugli esercizi visivi i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata, ed esso non controlla il tuo campo visivo.',
      improved:
        'La distanza si imposta come angolo visivo e si calcola con la distanza di visione della calibrazione (distanza = distanza di visione · tan angolo). Se l’angolo non entra su questo schermo, viene limitato verso l’esterno e verso l’interno; l’angolo effettivo è indicato in ogni turno e nel risultato, e all’inizio compare un messaggio. Il numero al centro ha una piccola altezza fissa, così entrano anche angoli piccoli. La durata di visualizzazione viene contata in immagini intere e il tempo realmente trascorso viene misurato; i turni disturbati non contano per l’adattamento automatico, che procede in immagini invece che in millisecondi. Tra due lampi passa sempre più di un secondo; la lettera compare in grigio chiaro attenuato, piccola e senza effetti a tutto schermo. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni. Si mostrano percentuale di risposte giuste con livello del caso, quota a sinistra/destra e in alto/in basso, distanza effettiva, tempo di risposta e durata misurata – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Ball, Beard, Roenker, Miller & Griggs (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.5.002210'),
    src('Strasburger, Rentschler & Jüttner (2011). Peripheral vision and pattern recognition: A review. Journal of Vision', 'https://doi.org/10.1167/11.5.13'),
    src('Anstis (1974). A chart demonstrating variations in acuity with retinal position. Vision Research', 'https://doi.org/10.1016/0042-6989(74)90049-2'),
    src('Vater & Strasburger (2021). Topical review: The top five peripheral vision tools in sport. Optometry and Vision Science', 'https://doi.org/10.1097/OPX.0000000000001732'),
    src('Levitt (1971). Transformed up-down methods in psychoacoustics. The Journal of the Acoustical Society of America', 'https://doi.org/10.1121/1.1912375'),
    src('García-Pérez (1998). Forced-choice staircases with fixed step sizes: asymptotic and small-sample properties. Vision Research', 'https://doi.org/10.1016/S0042-6989(97)00340-4'),
    src('Elze (2010). Misspecifications of stimulus presentation durations in experimental psychology: A systematic review of the psychophysics literature. PLoS ONE', 'https://doi.org/10.1371/journal.pone.0012792'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
