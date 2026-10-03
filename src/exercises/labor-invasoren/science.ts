// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Fitts (1954), J Exp Psychol 47(6), 381–391, und MacKenzie (1992), Hum Comput Interact 7(1), 91–139: wie in Spot-Touch geprüft
//   (Crossref; PubMed ohne Abstract; Inhalt „Zeit wächst mit dem Weg und sinkt mit der Größe des Ziels“ über MacKenzie).
// - Woods et al. (2015), Front Hum Neurosci 9, 131; Abstract bestätigt: 1469 Personen (18–65 Jahre), mittlere einfache Reaktionszeit
//   231 ms (213 ms nach Abzug von Hardware-Verzögerungen), Zeit zum Erkennen des Reizes im Mittel 131 ms und altersunabhängig; der
//   Anstieg der Reaktionszeit mit dem Alter geht vor allem auf langsamere Bewegungsausgabe zurück.
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
// Nicht aufgenommen (nicht belegt oder Wirkversprechen): jede Aussage, dass diese Übung Reaktionsfähigkeit, Gleichgewicht oder Blick
// verbessert, Stürze oder Unfälle verhindert oder sich auf Alltag, Sport oder Verkehr überträgt; jede Aussage zum Kippen des
// Geräts als Training der Haltung; Normwerte. Nicht bestätigt werden konnte: nichts Aufgenommenes; für genau diese Übung gibt es
// keine Studie.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-invasoren',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Einen Zielpunkt seitlich unter fallende Raumschiffe steuern und dort halten, bis das Schiff getroffen ist: ausrichten, ruhig halten, das nächste Schiff wählen – mit dem Finger, den Pfeiltasten oder durch Kippen des Geräts. Dauer, Tempo der Schiffe, Fallgeschwindigkeit, Haltezeit, Toleranz und Steuerung stellst du selbst ein.',
      daily:
        'Überall, wo man etwas Bewegtes anvisieren und die Ausrichtung kurz ruhig halten muss. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Die Zeit, ein Ziel zu erreichen, wächst mit dem Weg und sinkt mit der Größe des Ziels (Fitts’sches Gesetz, Fitts, 1954; MacKenzie, 1992) – darum sind Toleranz, Fallgeschwindigkeit und Abstand der Schiffe Einstellungen, die die Werte stark verändern. Schon die einfache Reaktionszeit besteht aus dem Erkennen des Reizes und dem Beginn der Bewegung; ihr Anstieg mit dem Alter geht vor allem auf eine langsamere Bewegungsausgabe zurück (Woods et al., 2015). Bei älteren Menschen wird Training mit echter Bewegung untersucht: Eine Cochrane-Übersicht mit 108 Studien an 23.407 Menschen ab 60 Jahren, die zu Hause leben, fand, dass Bewegungsprogramme die Sturzrate senken, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; hohe Sicherheit der Evidenz) (Sherrington et al., 2019). Ein Überblick über 18 Übersichten bei kognitiv gesunden älteren Menschen fand positive Effekte von Doppelaufgaben-Programmen mit Bewegung; bei Bildschirmspielen mit Bewegung (Exergames) nur auf die Denkleistung, die Wirkung auf körperliche Funktionen ist umstritten, und Sicherheit, Übertragung in den Alltag und Erhalt sind unklar (Gallou-Guyot et al., 2020). Das waren Programme mit Bewegung des ganzen Körpers, keine Steuerung am Bildschirm wie diese; für gesunde Menschen ist ein Nutzen dieser Übung nicht belegt, und auch das Kippen des Geräts ist kein Gleichgewichtstraining: Du hältst das Gerät, die App misst weder Haltung noch Gleichgewicht. In Studien zu Bildschirmübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Darum zählt nur der Vergleich mit dir selbst, mit derselben Steuerung, demselben Gerät und denselben Einstellungen. Bewegte Bilder können Schwindel oder Übelkeit auslösen; Schwindel, Doppelbilder, Kopf- oder Augenschmerz gehören abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Alle Größen werden in Zentimetern angegeben (nach Kalibrierung des Bildschirms) und passen sich kleinen Bildschirmen an: Die Schiffe sind etwa 8 % der kürzeren Seite groß, die Toleranz ist höchstens ein Viertel der Breite, der Zielpunkt bleibt immer ganz im Feld; im Ergebnis steht die Toleranz, die wirklich galt. Die Schiffe fallen mit der Zeit, nicht mit der Bildrate. Eine Linie zeigt, ab wo ein Schiff gehalten werden kann; ein Ring um das Schiff füllt sich, solange du ausgerichtet bist. Treffer und verpasste Schiffe zeigen ✓ und ✗ als Zeichen – ruhig, kein Blitz, kein Rot. Kippen schaltest du selbst ein (der Browser fragt erst dann nach der Erlaubnis); die Haltung beim Start gilt als Mitte; ohne Erlaubnis oder Sensor steuerst du mit dem Finger oder den Pfeiltasten. Die Sensorwerte werden nur zum Steuern gelesen und weder gespeichert noch gesendet. Gezeigt werden getroffene und verpasste Schiffe, Trefferquote und Zeit bis zum Treffer (Mittel, Median) – nur Zählwerte, ohne Noten, Normwerte und Ranglisten. Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Durchläufe mit gleichen Einstellungen (auch gleicher Steuerung).',
    },
    it: {
      trains:
        'Guidare un puntatore di lato sotto astronavi che cadono e tenerlo lì finché l’astronave è colpita: allineare, tenere fermo, scegliere la successiva – con il dito, i tasti freccia o inclinando il dispositivo. Durata, ritmo delle astronavi, velocità di caduta, tempo di tenuta, tolleranza e controllo li imposti tu.',
      daily:
        'Ovunque si debba mirare a qualcosa in movimento e tenere ferma per un attimo la direzione. Che l’esercizio aiuti non è dimostrato.',
      research:
        'Il tempo per raggiungere un bersaglio cresce con la distanza e diminuisce con la grandezza del bersaglio (legge di Fitts, Fitts, 1954; MacKenzie, 1992) – per questo tolleranza, velocità di caduta e distanza delle astronavi sono impostazioni che cambiano molto i valori. Già il semplice tempo di reazione consiste nel riconoscere lo stimolo e nell’avviare il movimento; il suo aumento con l’età dipende soprattutto da un’uscita motoria più lenta (Woods et al., 2015). Negli anziani si studia l’allenamento con movimento reale: una rassegna Cochrane con 108 studi su 23.407 persone dai 60 anni in su che vivono a casa ha trovato che i programmi di movimento riducono il tasso di cadute, nel modo più netto gli esercizi di equilibrio e funzionali (rapporto di tassi 0,76; certezza delle prove alta) (Sherrington et al., 2019). Una panoramica di 18 rassegne su anziani cognitivamente sani ha trovato effetti positivi dei programmi di doppio compito con movimento; per i videogiochi con movimento (exergames) solo sulla prestazione mentale, l’effetto sulle funzioni fisiche è controverso e sicurezza, trasferimento alla vita quotidiana e durata non sono chiari (Gallou-Guyot et al., 2020). Erano programmi con movimento di tutto il corpo, non una guida sullo schermo come questa; per le persone sane un’utilità di questo esercizio non è dimostrata e anche inclinare il dispositivo non è un allenamento dell’equilibrio: tieni in mano il dispositivo, l’app non misura né postura né equilibrio. Negli studi sugli esercizi sullo schermo i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato – gran parte è abitudine al compito e al dispositivo (Guo et al., 2025). Per questo conta solo il confronto con te stesso, con lo stesso controllo, lo stesso dispositivo e le stesse impostazioni. Le immagini in movimento possono provocare vertigini o nausea; vertigini, visione doppia, mal di testa o dolore agli occhi vanno chiariti (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'Tutte le dimensioni sono in centimetri (dopo la calibrazione dello schermo) e si adattano agli schermi piccoli: le astronavi sono grandi circa l’8 % del lato più corto, la tolleranza è al massimo un quarto della larghezza, il puntatore resta sempre interamente nel campo; nel risultato compare la tolleranza che valeva davvero. Le astronavi cadono con il tempo, non con la frequenza dei fotogrammi. Una linea mostra da dove si può tenere un’astronave; un anello attorno all’astronave si riempie finché sei allineato. Colpi e astronavi mancate mostrano ✓ e ✗ come segni – sobrio, nessun lampo, nessun rosso. L’inclinazione la attivi tu (solo allora il browser chiede il permesso); la posizione all’inizio vale come centro; senza permesso o senza sensore guidi con il dito o con i tasti freccia. I valori del sensore vengono letti solo per guidare e non vengono né salvati né inviati. Vengono mostrati astronavi colpite e mancate, percentuale di colpi e tempo fino al colpo (media, mediana) – solo valori di conteggio, senza voti, valori di riferimento e classifiche. Andamento, record e «ultima volta» confrontano solo giri con le stesse impostazioni (anche stesso controllo).',
    },
  },
  sources: [
    src('Fitts (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology', 'https://doi.org/10.1037/h0055392'),
    src('MacKenzie (1992). Fitts’ law as a research and design tool in human-computer interaction. Human-Computer Interaction', 'https://doi.org/10.1207/s15327051hci0701_3'),
    src('Woods, Wyma, Yund, Herron & Reed (2015). Factors influencing the latency of simple reaction time. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2015.00131'),
    src('Gallou-Guyot, Mandigout, Bherer & Perrochon (2020). Effects of exergames and cognitive-motor dual-task training on cognitive, physical and dual-task functions in cognitively healthy older adults: An overview. Ageing Research Reviews', 'https://doi.org/10.1016/j.arr.2020.101135'),
    src('Sherrington, Fairhall, Wallbank, Tiedemann, Michaleff, Howard et al. (2019). Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews', 'https://doi.org/10.1002/14651858.CD012424.pub2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
