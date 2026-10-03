// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und, wo es ein Abstract gibt,
// über PubMed geprüft (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Land & Lee (1994), Nature 369(6483), 742–744; Abstract bestätigt: Fahrer richten den Blick 1–2 s vor jeder Kurve auf den
//   „Tangentenpunkt“ an der Innenseite der Kurve; seine Richtung zum Fahrzeug sagt die Krümmung der Straße voraus. Das wird nur
//   als Beispiel für Vorausschau beim Steuern im Auto berichtet; auf diese Übung übertragen ist es nicht untersucht.
// - Accot & Zhai (1997), Proc ACM SIGCHI Conf Human Factors in Computing Systems, 295–302 („Beyond Fitts’ law: models for
//   trajectory-based HCI tasks“): Crossref bestätigt Titel, Untertitel, Konferenz, Seiten (kein Abstract in PubMed/Crossref);
//   der Inhalt („Modelle für Aufgaben, bei denen man einer Bahn folgt“) stützt sich auf den Titel.
// - Gallou-Guyot et al. (2020), Ageing Res Rev 63, 101135; Abstract bestätigt: Überblick über 18 Übersichten bei kognitiv gesunden
//   Älteren; insgesamt positive Effekte kognitiv-motorischer Doppelaufgaben-Programme, Exergames nur auf kognitive Funktionen,
//   Wirkung auf körperliche Funktionen umstritten, auf Doppelaufgaben nicht untersucht; Machbarkeit, Sicherheit, Übertragung und
//   Erhalt unklar.
// - Sherrington et al. (2019), Cochrane Database Syst Rev 2019(1), CD012424; Abstract bestätigt: 108 randomisierte Studien mit
//   23.407 Menschen ab 60 Jahren, die zu Hause leben; Bewegungsprogramme senken die Sturzrate (Rate Ratio 0,77), Gleichgewichts-
//   und Funktionsübungen allein 0,76 (hohe Sicherheit der Evidenz).
// - Guo et al. (2025): wie in den übrigen Labor-Übungen geprüft (Front Physiol 16).
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28: Warnzeichen mit Abklärungsbedarf (Doppelbilder, Schwindel, Kopf-
//   und Augenschmerz); Seitenangaben wie in den übrigen Übungen der App.
// Nicht aufgenommen (nicht belegt oder Wirkversprechen): jede Aussage, dass diese Übung das Gleichgewicht verbessert, Stürze oder
// Unfälle verhindert oder sich auf Alltag, Sport oder Verkehr überträgt; jede Aussage zum Kippen des Geräts als Training der Haltung;
// Normwerte. Nicht bestätigt werden konnte: nichts Aufgenommenes; für genau diese Übung gibt es keine Studie.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-slalom',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Eine Kugel seitlich durch Tore steuern, die von oben nach unten laufen: vorausschauend und gleichmäßig, mit dem Finger, den Pfeiltasten oder durch Kippen des Geräts. Dauer, Torlücke, Geschwindigkeit, Beschleunigung, Abstand der Tore und Steuerung stellst du selbst ein.',
      daily:
        'Überall, wo man eine Bewegung vorausschauend dosieren muss, etwa beim Steuern oder Ausweichen. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Aufgaben, bei denen man einer Bahn folgt oder durch einen engen Kanal steuert, werden in der Mensch-Computer-Forschung mit eigenen Modellen beschrieben (Accot & Zhai, 1997; von dieser Arbeit sind Titel und Konferenz bestätigt, ein Abstract gibt es nicht). Beim Autofahren richten Fahrer den Blick 1 bis 2 Sekunden vor jeder Kurve auf einen Punkt an der Innenseite der Kurve (Land & Lee, 1994) – ein Beispiel für Vorausschau beim Steuern; ob das auf diese Übung übertragbar ist, wurde nicht untersucht. Bei älteren Menschen wird Training mit echter Bewegung untersucht: Eine Cochrane-Übersicht mit 108 Studien an 23.407 Menschen ab 60 Jahren, die zu Hause leben, fand, dass Bewegungsprogramme die Sturzrate senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; hohe Sicherheit der Evidenz) (Sherrington et al., 2019). Ein Überblick über 18 Übersichten bei kognitiv gesunden älteren Menschen fand positive Effekte von Doppelaufgaben-Programmen mit Bewegung; bei Bildschirmspielen mit Bewegung (Exergames) nur auf die Denkleistung, die Wirkung auf körperliche Funktionen ist umstritten, und Sicherheit, Übertragung in den Alltag und Erhalt sind unklar (Gallou-Guyot et al., 2020). Das waren Programme mit Bewegung des ganzen Körpers, keine Steuerung am Bildschirm wie diese; für gesunde Menschen ist ein Nutzen dieser Übung nicht belegt, und auch das Kippen des Geräts ist kein Gleichgewichtstraining: Du hältst das Gerät, die App misst weder Haltung noch Gleichgewicht. In Studien zu Bildschirmübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Darum zählt nur der Vergleich mit dir selbst, mit derselben Steuerung, demselben Gerät und denselben Einstellungen. Bewegte Bilder können Schwindel oder Übelkeit auslösen; Schwindel, Doppelbilder, Kopf- oder Augenschmerz gehören abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Alle Größen werden in Zentimetern angegeben (nach Kalibrierung des Bildschirms) und passen sich kleinen Bildschirmen an: Die Torlücke ist höchstens 80 % der Breite, der Abstand der Tore höchstens 60 % der Höhe, die Kugel bleibt immer ganz im Feld; im Ergebnis stehen Lücke und Abstand, die wirklich benutzt wurden. Die Tore bewegen sich mit der Zeit, nicht mit der Bildrate. Die Stangen haben weiße Pfosten am Rand der Lücke, der Ausgang ist durch ✓ und ✗ als Zeichen markiert – ruhig, kein Blitz, kein Rot. Kippen schaltest du selbst ein (der Browser fragt erst dann nach der Erlaubnis); die Haltung beim Start gilt als Mitte; ohne Erlaubnis oder Sensor steuerst du mit dem Finger oder den Pfeiltasten. Die Sensorwerte werden nur zum Steuern gelesen und weder gespeichert noch gesendet. Gezeigt werden durchfahrene Tore, Trefferquote, berührte Stangen, längste Serie und die mittlere Abweichung von der Mitte der Lücke – nur Zählwerte, ohne Noten, Normwerte und Ranglisten. Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Durchläufe mit gleichen Einstellungen (auch gleicher Steuerung).',
    },
    it: {
      trains:
        'Guidare una pallina di lato attraverso cancelli che scendono dall’alto: guardando avanti e con regolarità, con il dito, i tasti freccia o inclinando il dispositivo. Durata, varco, velocità, accelerazione, distanza dei cancelli e controllo li imposti tu.',
      daily:
        'Ovunque si debba dosare un movimento guardando avanti, per esempio nella guida o nello schivare. Che l’esercizio aiuti non è dimostrato.',
      research:
        'I compiti in cui si segue un percorso o si guida attraverso un canale stretto sono descritti nella ricerca uomo-computer con modelli propri (Accot & Zhai, 1997; di questo lavoro sono confermati titolo e conferenza, un abstract non esiste). Alla guida di un’auto i conducenti rivolgono lo sguardo da 1 a 2 secondi prima di ogni curva a un punto sul lato interno della curva (Land & Lee, 1994) – un esempio di sguardo in avanti nella guida; se sia trasferibile a questo esercizio non è stato studiato. Negli anziani si studia l’allenamento con movimento reale: una rassegna Cochrane con 108 studi su 23.407 persone dai 60 anni in su che vivono a casa ha trovato che i programmi di movimento riducono il tasso di cadute, nel modo più netto gli esercizi di equilibrio e funzionali (rapporto di tassi 0,76; certezza delle prove alta) (Sherrington et al., 2019). Una panoramica di 18 rassegne su anziani cognitivamente sani ha trovato effetti positivi dei programmi di doppio compito con movimento; per i videogiochi con movimento (exergames) solo sulla prestazione mentale, l’effetto sulle funzioni fisiche è controverso e sicurezza, trasferimento alla vita quotidiana e durata non sono chiari (Gallou-Guyot et al., 2020). Erano programmi con movimento di tutto il corpo, non una guida sullo schermo come questa; per le persone sane un’utilità di questo esercizio non è dimostrata e anche inclinare il dispositivo non è un allenamento dell’equilibrio: tieni in mano il dispositivo, l’app non misura né postura né equilibrio. Negli studi sugli esercizi sullo schermo i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Per questo conta solo il confronto con te stesso, con lo stesso controllo, lo stesso dispositivo e le stesse impostazioni. Le immagini in movimento possono provocare vertigini o nausea; vertigini, visione doppia, mal di testa o dolore agli occhi vanno chiariti (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'Tutte le dimensioni sono in centimetri (dopo la calibrazione dello schermo) e si adattano agli schermi piccoli: il varco è al massimo l’80 % della larghezza, la distanza dei cancelli al massimo il 60 % dell’altezza, la pallina resta sempre interamente nel campo; nel risultato compaiono varco e distanza usati davvero. I cancelli si muovono con il tempo, non con la frequenza dei fotogrammi. I pali hanno pioli bianchi ai bordi del varco, l’esito è segnato da ✓ e ✗ come segni – sobrio, nessun lampo, nessun rosso. L’inclinazione la attivi tu (solo allora il browser chiede il permesso); la posizione all’inizio vale come centro; senza permesso o senza sensore guidi con il dito o con i tasti freccia. I valori del sensore vengono letti solo per guidare e non vengono né salvati né inviati. Vengono mostrati cancelli superati, percentuale di colpi, pali toccati, serie più lunga e scarto medio dal centro del varco – solo valori di conteggio, senza voti, valori di riferimento e classifiche. Andamento, record e «ultima volta» confrontano solo giri con le stesse impostazioni (anche stesso controllo).',
    },
  },
  sources: [
    src('Accot & Zhai (1997). Beyond Fitts’ law: models for trajectory-based HCI tasks. Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems', 'https://doi.org/10.1145/258549.258760'),
    src('Land & Lee (1994). Where we look when we steer. Nature', 'https://doi.org/10.1038/369742a0'),
    src('Gallou-Guyot, Mandigout, Bherer & Perrochon (2020). Effects of exergames and cognitive-motor dual-task training on cognitive, physical and dual-task functions in cognitively healthy older adults: An overview. Ageing Research Reviews', 'https://doi.org/10.1016/j.arr.2020.101135'),
    src('Sherrington, Fairhall, Wallbank, Tiedemann, Michaleff, Howard et al. (2019). Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews', 'https://doi.org/10.1002/14651858.CD012424.pub2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
