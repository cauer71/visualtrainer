// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Woodruff, O’Reilly & Kraft (1987): Ophthalmology 94(12), 1554–1561, „Functional scoring of the field of binocular single vision in
//   patients with diplopia“; Abstract bestätigt: Feld des einfachen beidäugigen Sehens auf dem Goldmann-Perimeter (Zielmarke III-4e),
//   funktionell wichtige Bereiche (Hauptblickrichtung, Leseposition) stärker gewichtet; Fallbeispiele mit Bezug zur Beeinträchtigung.
// - Fitzsimons & White (1990): Ophthalmology 97(1), 33–35; Abstract bestätigt: 51 Personen mit Doppelbildern; der objektive Wert lag
//   im Allgemeinen über der eigenen Einschätzung; das Bewertungsverfahren wurde angepasst.
// - Christoff & Guyton (2006): Am Orthopt J 56, 157–165, „The Lancaster red-green test“; Abstract bestätigt: beidäugiges, trennendes
//   und subjektives Verfahren für die neun diagnostischen Blickrichtungen.
// - Birch (2012): J Opt Soc Am A 29(3), 313–320 (früher geprüft): etwa 8 % der Männer und etwa 0,4 % der Frauen europäischer Herkunft.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf) sowie S. 32–35 (H-Muster der
//   Augenbewegungsprüfung): Seitenangaben wie im Auftrag vorgegeben; das Lehrbuch war hier nicht einsehbar, daher nur allgemein
//   („Lehrbuchwissen“) wiedergegeben.
// Nicht aufgenommen: jede Aussage zu Normbereichen, zur Deutung der Karte oder zu einer Aussagekraft dieser Bildschirmfassung;
// für die digitale Näherung (Verschieben des zweiten Bildes per Finger oder Maus, Farben auf einem Bildschirm) gibt es keine
// Studie, ein Nutzen als Übung ist nicht belegt. Nicht bestätigt werden konnte: nichts Aufgenommenes.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-diplopie',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'In neun Blickrichtungen sieht mit der Rot-Grün-Brille ein Auge ein rotes Ziel, das andere ein Ziel in der zweiten Farbe. Du sagst, ob du ein Bild oder zwei siehst, und schiebst bei zwei Bildern das zweite auf das erste; am Ende zeigt eine Karte alle Richtungen.',
      daily:
        'Die Übung ist kein Training für den Alltag, sondern macht das Prinzip einer Karte der Blickrichtungen erfahrbar. Ob sie beim Lesen, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
      research:
        'In der Fachliteratur wird das Feld des einfachen beidäugigen Sehens bei Doppelbildern auf einem Perimeter bestimmt; eine Bewertungsmethode gewichtet funktionell wichtige Bereiche wie die Hauptblickrichtung und die Leseposition stärker und setzt die Werte in Beziehung zur Beeinträchtigung der Patientinnen und Patienten (Woodruff et al., 1987). Bei 51 Personen mit Doppelbildern lag der objektive Wert im Allgemeinen über der eigenen Einschätzung der Beeinträchtigung, und die Bewertungsmethode wurde angepasst (Fitzsimons & White, 1990). Verwandt ist der Lancaster-Rot-Grün-Test: ein beidäugiges, trennendes und subjektives Verfahren für die neun Hauptblickrichtungen (Christoff & Guyton, 2006). Wie die Augenbewegungen in verschiedenen Blickrichtungen in der Praxis geprüft werden (H-Muster), steht im Lehrbuch (Muchnick, 2008). Für diese digitale Näherung am Bildschirm – Verschieben des zweiten Bildes mit Finger oder Maus, Farben auf dem Bildschirm, Projektion auf eine ebene Fläche – gibt es keine Studie; die Werte sind nicht mit denen anderer Verfahren austauschbar, und die App deutet die Karte nicht. Eine Rot-Grün-Farbsehschwäche haben bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen (Birch, 2012); für sie passt die Übung nicht. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Die neun Blickrichtungen (Mitte und acht Randpunkte im eingestellten Winkel von 5 bis 35 Grad) liegen auf einer ebenen Fläche: Der Ort ist Abstand mal Tangens des Winkels, der Abstand kommt aus der Kalibrierung. Ist der Bildschirm zu klein, wird der Winkel verkleinert, und das Ergebnis nennt den tatsächlichen Winkel. Die Reihenfolge der Richtungen ist zufällig. Bei „Zwei Bilder“ siehst du das zweite Bild neben dem ersten und schiebst es durch Ziehen oder Tippen auf das erste; „Deckungsgleich“ gilt erst nach einer Bewegung. Gezeigt werden Übungswerte: wie viele Richtungen mit gemeldeten Doppelbildern, der Versatz des zweiten Bildes in Prismendioptrien Δ (waagerecht und senkrecht, nur als Beschreibung der Verschiebung) und eine Karte der geprüften Richtungen, die Kreise und Quadrate nutzt und nicht nur Farben. Die App deutet nichts als Befund und nennt keine Richtwerte. Das Prüfbild im Intro führt Schritt für Schritt durch Brille, Glas und Helligkeit je Farbe, ohne Wertung. Es gibt kein Flackern und keine Blitze. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen.',
    },
    it: {
      trains:
        'In nove direzioni dello sguardo, con gli occhiali rosso-verdi un occhio vede un bersaglio rosso, l’altro un bersaglio nel secondo colore. Dici se vedi una immagine o due e, con due immagini, sposti la seconda sulla prima; alla fine una mappa mostra tutte le direzioni.',
      daily:
        'L’esercizio non è un allenamento per la vita quotidiana, ma rende sperimentabile il principio di una mappa delle direzioni dello sguardo. Che serva nella lettura, nello sport o nel traffico non è dimostrato.',
      research:
        'Nella letteratura specialistica il campo della visione binoculare singola in caso di visione doppia viene determinato su un perimetro; un metodo di valutazione dà più peso alle zone funzionalmente importanti come la direzione principale dello sguardo e la posizione di lettura e mette i valori in relazione con la limitazione dei pazienti (Woodruff et al., 1987). In 51 persone con visione doppia il valore oggettivo era in generale superiore alla valutazione personale della limitazione e il metodo di valutazione è stato adattato (Fitzsimons & White, 1990). Affine è il test di Lancaster rosso-verde: un metodo binoculare, dissociante e soggettivo per le nove direzioni principali dello sguardo (Christoff & Guyton, 2006). Come si esaminano in pratica i movimenti oculari nelle diverse direzioni dello sguardo (schema a H) è descritto nel manuale (Muchnick, 2008). Per questa approssimazione digitale su schermo – spostare la seconda immagine con dito o mouse, colori su schermo, proiezione su una superficie piana – non esiste uno studio; i valori non sono intercambiabili con quelli di altri metodi e l’app non interpreta la mappa. Un’alterazione della visione dei colori rosso-verde ce l’hanno, nelle persone di origine europea, circa l’8 % degli uomini e circa lo 0,4 % delle donne (Birch, 2012); per loro l’esercizio non è adatto. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'Le nove direzioni dello sguardo (centro e otto punti periferici all’angolo impostato da 5 a 35 gradi) giacciono su una superficie piana: la posizione è distanza per tangente dell’angolo, la distanza viene dalla calibrazione. Se lo schermo è troppo piccolo l’angolo viene rimpicciolito e il risultato indica l’angolo effettivo. L’ordine delle direzioni è casuale. Con «Due immagini» vedi la seconda immagine accanto alla prima e la sposti sulla prima trascinando o toccando; «Sovrapposte» vale solo dopo un movimento. Si mostrano valori dell’esercizio: in quante direzioni è stata segnalata visione doppia, lo spostamento della seconda immagine in diottrie prismatiche Δ (orizzontale e verticale, solo come descrizione dello spostamento) e una mappa delle direzioni esaminate che usa cerchi e quadrati e non solo colori. L’app non interpreta nulla come referto e non indica valori di riferimento. L’immagine di controllo nell’introduzione guida passo dopo passo attraverso occhiali, lente e luminosità per colore, senza valutazione. Non ci sono sfarfallio né lampi. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni.',
    },
  },
  sources: [
    src('Woodruff, O’Reilly & Kraft (1987). Functional scoring of the field of binocular single vision in patients with diplopia. Ophthalmology', 'https://doi.org/10.1016/s0161-6420(87)33247-6'),
    src('Fitzsimons & White (1990). Functional scoring of the field of binocular single vision. Ophthalmology', 'https://doi.org/10.1016/s0161-6420(90)32631-3'),
    src('Christoff & Guyton (2006). The Lancaster red-green test. American Orthoptic Journal', 'https://doi.org/10.3368/aoj.56.1.157'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), S. 32–35 (H-Muster)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
