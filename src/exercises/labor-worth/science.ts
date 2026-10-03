// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Roper-Hall (2004): Am Orthopt J 54, 112–119, „The ‚worth‘ of the worth four dot test“; Abstract bestätigt: vor hundert Jahren
//   erstmals beschrieben, einfaches Verfahren, das viele Schielspezialisten noch routinemäßig nutzen; Einsatz u. a. bei lange
//   bestehendem und erworbenem Schielen Erwachsener und bei komplexen Doppelbildern.
// - Lueder & Arnoldi (1996): Ophthalmology 103(8), 1237–1240; Abstract bestätigt: Computersimulation, 16 Kinder von 32 bis 48
//   Monaten; keines konnte die Bilder in Worten richtig beschreiben; „Berühren“ der Punkte unterschied Wechselfixation nicht von
//   Fusion; Unterdrückung eines Auges wurde bei allen richtig erkannt.
// - Birch (2012): J Opt Soc Am A 29(3), 313–320 (früher geprüft): etwa 8 % der Männer und etwa 0,4 % der Frauen europäischer Herkunft.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), Seitenangaben wie in den
//   übrigen Übungen; das Lehrbuch war hier nicht einsehbar, daher nur allgemein wiedergegeben.
// Nicht aufgenommen: jede Aussage zur Deutung der Zahl der Lichter (Unterdrückung, Fusion, Doppelbilder) als Befund, zu Normbereichen
// oder zur Aussagekraft dieser Bildschirmfassung; für die digitale Näherung gibt es keine Studie, ein Nutzen als Übung ist nicht belegt.
// Nicht bestätigt werden konnte: nichts Aufgenommenes.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-worth',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Vier Lichter stehen in Rautenform: oben ein rotes, links und rechts je ein grünes, unten ein weißes. Mit der Rot-Grün-Brille sieht jedes Auge durch sein Glas nur Teile davon; du zählst, wie viele Lichter du siehst, und tippst die Zahl.',
      daily:
        'Die Übung ist kein Training für den Alltag, sondern macht das Prinzip eines klassischen Verfahrens erfahrbar. Ob sie beim Lesen, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
      research:
        'Das Worth-Vier-Punkte-Verfahren wurde vor mehr als hundert Jahren erstmals beschrieben. Es ist einfach und wird von vielen Spezialistinnen und Spezialisten für Schielen noch routinemäßig genutzt, etwa bei lange bestehendem oder erworbenem Schielen Erwachsener und im Umgang mit komplexen Doppelbildern (Roper-Hall, 2004). Wie zuverlässig die Antworten sind, hängt auch von der Art der Antwort ab: In einer Computersimulation mit 16 Kindern von 32 bis 48 Monaten konnte keines die Bilder in Worten richtig beschreiben, und das Berühren der Punkte unterschied Wechselfixation nicht von Fusion; die Unterdrückung eines Auges wurde dagegen bei allen richtig erkannt (Lueder & Arnoldi, 1996). Für diese digitale Näherung am Bildschirm – Farben auf einem Bildschirm statt Leuchtpunkte, Antwort durch Tippen einer Zahl – gibt es keine Studie; die App deutet die gezählte Zahl nicht, und was sie bedeutet, gehört in die Hand von Fachleuten. Eine Rot-Grün-Farbsehschwäche haben bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen (Birch, 2012); für sie passt die Übung nicht. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Die vier Lichter liegen in einer Raute (oben Rot, links und rechts die zweite Farbe, unten Weiß) auf schwarzem Grund; Rot und die zweite Farbe lassen sich je Farbe in der Helligkeit einstellen (30 bis 100 %), das Farbpaar ist Rot–Grün, Rot–Cyan oder Rot–Blau. Die Größe der Lichter wird in Zentimetern eingestellt (nach Kalibrierung) und auf kleinen Bildschirmen begrenzt, damit die Raute auf die Bühne passt; im Ergebnis steht die gezeichnete Größe. Auf Wunsch wechseln kleine und 2,5-fach große Lichter. Du antwortest mit großen Tasten (2, 3, 4, 5 oder „Unklar“), und es gibt kein Flackern und keine Blitze. Gezeigt werden Übungswerte: wie oft du welche Zahl gemeldet hast und wie einheitlich deine Antworten waren (Anteil der häufigsten Antwort); die App deutet die Zahl nicht und nennt keine Richtwerte. Das Prüfbild im Intro führt Schritt für Schritt durch Brille, Glas und Helligkeit je Farbe, ohne Wertung. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen.',
    },
    it: {
      trains:
        'Quattro luci sono disposte a rombo: in alto una rossa, a sinistra e a destra una verde ciascuna, in basso una bianca. Con gli occhiali rosso-verdi ogni occhio vede attraverso la sua lente solo una parte delle luci; conti quante luci vedi e tocchi il numero.',
      daily:
        'L’esercizio non è un allenamento per la vita quotidiana, ma rende sperimentabile il principio di un metodo classico. Che serva nella lettura, nello sport o nel traffico non è dimostrato.',
      research:
        'Il metodo dei quattro punti di Worth fu descritto per la prima volta più di cent’anni fa. È semplice e molti specialisti dello strabismo lo usano ancora di routine, per esempio nello strabismo di lunga data o acquisito negli adulti e nella gestione della visione doppia complessa (Roper-Hall, 2004). L’affidabilità delle risposte dipende anche dal tipo di risposta: in una simulazione al computer con 16 bambini da 32 a 48 mesi nessuno riusciva a descrivere correttamente le immagini a parole e il toccare i punti non distingueva la fissazione alternata dalla fusione; la soppressione di un occhio è stata invece riconosciuta correttamente in tutti (Lueder & Arnoldi, 1996). Per questa approssimazione digitale su schermo – colori su uno schermo invece di punti luminosi, risposta toccando un numero – non esiste uno studio; l’app non interpreta il numero contato e che cosa significhi spetta agli specialisti. Un’alterazione della visione dei colori rosso-verde ce l’hanno, nelle persone di origine europea, circa l’8 % degli uomini e circa lo 0,4 % delle donne (Birch, 2012); per loro l’esercizio non è adatto. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'Le quattro luci sono disposte a rombo (in alto rosso, a sinistra e a destra il secondo colore, in basso bianco) su fondo nero; rosso e secondo colore si regolano nella luminosità per colore (dal 30 al 100 %), la coppia di colori è rosso–verde, rosso–ciano o rosso–blu. La dimensione delle luci si imposta in centimetri (dopo la calibrazione) e sugli schermi piccoli viene limitata perché il rombo stia nell’area; nel risultato è indicata la dimensione disegnata. A richiesta si alternano luci piccole e grandi 2,5 volte. Rispondi con tasti grandi (2, 3, 4, 5 o «Poco chiaro»), e non ci sono sfarfallio né lampi. Si mostrano valori dell’esercizio: quante volte hai segnalato quale numero e quanto sono state uniformi le tue risposte (quota della risposta più frequente); l’app non interpreta il numero e non indica valori di riferimento. L’immagine di controllo nell’introduzione guida passo dopo passo attraverso occhiali, lente e luminosità per colore, senza valutazione. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni.',
    },
  },
  sources: [
    src('Roper-Hall (2004). The “worth” of the worth four dot test. American Orthoptic Journal', 'https://doi.org/10.3368/aoj.54.1.112'),
    src('Lueder & Arnoldi (1996). Does “touching four” on the Worth 4-dot test indicate fusion in young children? A computer simulation. Ophthalmology', 'https://doi.org/10.1016/s0161-6420(96)30516-2'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
