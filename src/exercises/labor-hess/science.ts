// Quellen: jede Angabe einzeln per Crossref (Autoren, Jahr, Titel, Zeitschrift, Band, Seiten) und PubMed (Abstract) geprüft
// (03.10.2026); die Aussagen im Text wurden mit dem Abstract abgeglichen:
// - Roper-Hall (2006): Am Orthopt J 56, 166–174, „The Hess screen test“; Abstract bestätigt: 1908 von Walter Rudolf Hess entworfen;
//   Farbtrennung mit rot/grünen Komplementärfiltern; ein rotes Ziel an jedem Kreuzungspunkt, ein grünes Licht setzt die Person;
//   Wiederholung für das andere Auge ergibt eine Karte mit innerem und äußerem Bewegungsbereich je Auge.
// - Christoff & Guyton (2006): Am Orthopt J 56, 157–165, „The Lancaster red-green test“; Abstract bestätigt: 1939 von Lancaster
//   eingeführt, binokular, trennend und subjektiv, für die neun diagnostischen Blickrichtungen.
// - Armesto et al. (2008): Eur J Ophthalmol 18(2), 278–281, „Hess Lancaster screen test with the head tilted …“; Abstract bestätigt:
//   9 Personen (3 mit beidseitiger, 3 mit einseitiger Lähmung des vierten Hirnnervs, 3 Gesunde), als Hilfsmittel bei der Abklärung.
// - Birch (2012): J Opt Soc Am A 29(3), 313–320 (Crossref und PubMed bereits früher geprüft): etwa 8 % der Männer und etwa 0,4 % der
//   Frauen europäischer Herkunft.
// - Muchnick (2008), Lehrbuch (ISBN 9780323029612), S. 6 und 28 (Warnzeichen mit Abklärungsbedarf) sowie S. 32–35 (H-Muster der
//   Augenbewegungsprüfung): Seitenangaben wie im Auftrag vorgegeben und wie in den übrigen Übungen der App; das Lehrbuch selbst war
//   hier nicht einsehbar, daher nur allgemein („Lehrbuchwissen“) wiedergegeben.
// Nicht aufgenommen: jede Aussage zu Normbereichen, zur Deutung nach Muskeln oder zu einer Aussagekraft dieser Bildschirmfassung;
// für die digitale Näherung (Zeigen mit Finger oder Maus, Farben auf einem Bildschirm) gibt es keine Studie, ein Nutzen als
// Übung ist nicht belegt. Nicht bestätigt werden konnte: nichts Aufgenommenes.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-hess',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Mit der Rot-Grün-Brille sieht jedes Auge ein eigenes Zeichen: das eine nur einen Zielpunkt eines Rasters, das andere nur einen Zeiger. Du legst den Zeiger dorthin, wo er auf dem Ziel zu liegen scheint, Punkt für Punkt; danach tauschen die Augen die Rollen.',
      daily:
        'Die Übung ist kein Training für den Alltag, sondern macht das Prinzip eines klassischen Verfahrens zur Darstellung der Augenstellung erfahrbar. Ob sie beim Lesen, im Sport oder im Verkehr etwas bringt, ist nicht belegt.',
      research:
        'Der Hess-Schirm wurde 1908 von Walter Rudolf Hess entworfen. Eine Rot-Grün-Brille trennt die Bilder der beiden Augen: ein rotes Ziel an jedem Kreuzungspunkt eines Koordinatennetzes, ein grünes Licht, das die Person setzt; das Verfahren wird für das andere Auge wiederholt, und es entsteht eine Karte mit einem inneren und einem äußeren Bereich je Auge (Roper-Hall, 2006). Der verwandte Lancaster-Rot-Grün-Test wurde 1939 eingeführt; er ist ein beidäugiges, trennendes und subjektives Verfahren für die neun Hauptblickrichtungen (Christoff & Guyton, 2006). In einer kleinen Fallserie mit neun Personen (je drei mit beidseitiger und einseitiger Lähmung des vierten Hirnnervs und drei Gesunde) wurde das Verfahren mit geneigtem Kopf als Hilfsmittel bei der Abklärung beschrieben (Armesto et al., 2008). Wie die Augenbewegungen in verschiedenen Blickrichtungen in der Praxis geprüft werden (H-Muster), steht im Lehrbuch (Muchnick, 2008). Für diese digitale Näherung am Bildschirm – Zeigen mit Finger oder Maus statt mit einem Lichtzeiger, Farben auf dem Bildschirm, Projektion auf eine ebene Fläche – gibt es keine Studie; die Werte sind nicht mit denen des klassischen Verfahrens austauschbar, und die App deutet sie nicht. Eine Rot-Grün-Farbsehschwäche haben bei Menschen europäischer Herkunft etwa 8 % der Männer und etwa 0,4 % der Frauen (Birch, 2012); für sie passt die Übung nicht. Neu aufgetretene Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung und Schwindel gehören ärztlich abgeklärt (Lehrbuchwissen: Muchnick, 2008). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Verkehr ist nicht belegt.',
      improved:
        'Das Raster hat bis zu 25 Punkte (9 innen, 16 außen) bei einem größten Winkel von 10 bis 35 Grad; der Ort eines Punktes auf der ebenen Fläche ist Abstand mal Tangens des Winkels, der Abstand kommt aus der Kalibrierung. Ist der Bildschirm zu klein, wird das Raster verkleinert, und im Ergebnis steht der tatsächliche Winkel. Die Reihenfolge der Punkte ist zufällig. Im ersten Durchgang sieht das Auge hinter dem roten Glas das rote Ziel, das andere Auge den Zeiger in der zweiten Farbe; im zweiten Durchgang tauschen die Farben. Gezeigt werden Übungswerte: der mittlere Abstand zwischen gesetztem Ort und Ziel in Grad je Durchgang und die Fläche des Umrisses der gesetzten äußeren Punkte im Verhältnis zum Sollumriss. Nach den Durchgängen zeigt eine Karte den Sollumriss in Grau, Durchgang A durchgezogen und Durchgang B gestrichelt (nicht nur durch Farbe unterschieden). Der Zeiger beginnt immer in der Mitte und gilt erst nach einer Bewegung; so lässt sich nicht versehentlich bestätigen. Das Prüfbild im Intro führt Schritt für Schritt durch Brille, Glas und Helligkeit je Farbe, ohne Wertung. Die Bedienung hängt nicht an der Farbe, es gibt kein Flackern und keine Blitze. Weil das Ergebnis von den Einstellungen abhängt, vergleichen Verlauf und „Letztes Mal“ nur Durchläufe mit gleichen Einstellungen. Die App gibt keine Richtwerte an und gibt keine Deutung.',
    },
    it: {
      trains:
        'Con gli occhiali rosso-verdi ogni occhio vede un segno proprio: uno solo un punto bersaglio di una griglia, l’altro solo un cursore. Posi il cursore dove ti sembra che sia sul bersaglio, punto dopo punto; poi gli occhi si scambiano i ruoli.',
      daily:
        'L’esercizio non è un allenamento per la vita quotidiana, ma rende sperimentabile il principio di un metodo classico per rappresentare la posizione degli occhi. Che serva nella lettura, nello sport o nel traffico non è dimostrato.',
      research:
        'Lo schermo di Hess fu ideato nel 1908 da Walter Rudolf Hess. Gli occhiali rosso-verdi separano le immagini dei due occhi: un bersaglio rosso a ogni incrocio di una griglia di coordinate, una luce verde che la persona posiziona; il procedimento viene ripetuto per l’altro occhio e ne nasce una mappa con un campo interno e uno esterno per occhio (Roper-Hall, 2006). Il test affine di Lancaster rosso-verde fu introdotto nel 1939; è un metodo binoculare, dissociante e soggettivo per le nove direzioni principali dello sguardo (Christoff & Guyton, 2006). In una piccola serie di casi con nove persone (tre con paralisi bilaterale e tre con paralisi unilaterale del quarto nervo cranico e tre persone sane) il metodo con la testa inclinata è stato descritto come ausilio nell’accertamento (Armesto et al., 2008). Come si esaminano in pratica i movimenti oculari nelle diverse direzioni dello sguardo (schema a H) è descritto nel manuale (Muchnick, 2008). Per questa approssimazione digitale su schermo – puntare con il dito o il mouse invece che con un puntatore luminoso, colori su schermo, proiezione su una superficie piana – non esiste uno studio; i valori non sono intercambiabili con quelli del metodo classico e l’app non li interpreta. Un’alterazione della visione dei colori rosso-verde ce l’hanno, nelle persone di origine europea, circa l’8 % degli uomini e circa lo 0,4 % delle donne (Birch, 2012); per loro l’esercizio non è adatto. Visione doppia comparsa da poco, perdita improvvisa della vista, mal di testa con peggioramento della vista e vertigini vanno chiariti dal medico (manuale: Muchnick, 2008). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'La griglia ha fino a 25 punti (9 interni, 16 esterni) con un angolo massimo da 10 a 35 gradi; la posizione di un punto sulla superficie piana è distanza per tangente dell’angolo, la distanza viene dalla calibrazione. Se lo schermo è troppo piccolo la griglia viene rimpicciolita e nel risultato è indicato l’angolo effettivo. L’ordine dei punti è casuale. Nel primo giro l’occhio dietro la lente rossa vede il bersaglio rosso, l’altro occhio il cursore nel secondo colore; nel secondo giro i colori si scambiano. Si mostrano valori dell’esercizio: la distanza media tra posizione impostata e bersaglio in gradi per giro e l’area del contorno dei punti esterni posizionati rispetto al contorno ideale. Dopo i giri una mappa mostra il contorno ideale in grigio, il giro A a linea continua e il giro B tratteggiato (distinti non solo dal colore). Il cursore parte sempre dal centro e vale solo dopo un movimento; così non si conferma per sbaglio. L’immagine di controllo nell’introduzione guida passo dopo passo attraverso occhiali, lente e luminosità per colore, senza valutazione. L’uso non dipende dal colore, non ci sono sfarfallio né lampi. Poiché il risultato dipende dalle impostazioni, andamento e «ultima volta» confrontano solo giri con le stesse impostazioni. L’app non indica valori di riferimento e non dà alcuna interpretazione.',
    },
  },
  sources: [
    src('Roper-Hall (2006). The Hess screen test. American Orthoptic Journal', 'https://doi.org/10.3368/aoj.56.1.166'),
    src('Christoff & Guyton (2006). The Lancaster red-green test. American Orthoptic Journal', 'https://doi.org/10.3368/aoj.56.1.157'),
    src('Armesto, Ugrin, Travelletti, Schlaen & Piantanida (2008). Hess Lancaster screen test with the head tilted: A useful test in the diagnosis of bilateral fourth nerve palsies. European Journal of Ophthalmology', 'https://doi.org/10.1177/112067210801800217'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf), S. 32–35 (H-Muster)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
