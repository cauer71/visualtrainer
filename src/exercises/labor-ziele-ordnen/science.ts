// Quellen: jede Angabe einzeln per Crossref (Metadaten) und, wo vorhanden, über PubMed (Abstract) geprüft (02.10.2026).
// Aus dem Labor-Prototyp (help/ordering.js) stammt nur Reitan (1958): Metadaten bestätigt (Crossref; PubMed ohne Abstract,
// ältere Arbeit); aufgenommen nur als Herkunft der Zahlen-Verbindungsaufgabe, ohne Aussage über ihren Inhalt. Es gibt einen
// zweiten, fehlerhaften Crossref-Eintrag (10.2466/pms.8.7.271-276) – nicht verwendet.
// Ergänzt und geprüft (Abstract gelesen): Bowie & Harvey 2006 (Trail Making ist ein neuropsychologisches Verfahren, 5–10 min),
// Sánchez-Cubillo et al. 2009 (Teil A: vor allem Wahrnehmung, Teil B: Arbeitsgedächtnis; 41 gesunde ältere Personen),
// Salthouse 2011 (Variante: Tempo und flüssiges Denken; > 3.600 Erwachsene), Buck et al. 2008 (Übungseffekte bei wöchentlicher
// Wiederholung über 3 Wochen), Alvarez & Franconeri 2007 (Verfolgen: bei langsamem Tempo bis 8, bei schnellem 1 Objekt),
// Pronk et al. 2020 (Touchgeräte: Reaktionszeiten zu lang; geprüfte Geräte laut Volltext: Laptops, Samsung Galaxy S7, iPhone 6S –
// keine Tablets), Guo et al. 2025 (Lerneffekt, Titel korrekt).
// Nicht aus dem Prototyp übernommen: „Die Zeit pro Ziel steigt typischerweise mit der Zahl der Ziele und der Geschwindigkeit“ –
// für diese Übung nicht belegt (nur das Verfolgen mehrerer Punkte ist untersucht, Alvarez & Franconeri 2007).
// Nicht belegt / nicht gefunden: Studien zu bewegten Zahlen, Wörtern oder Rechnungen als Berührungsaufgabe.
import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'labor-ziele-ordnen',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Zahlen, Buchstaben, Wörter oder Rechnungen in der richtigen Reihenfolge berühren, während sie sich bewegen: Suchen, Ordnen im Kopf und Zielen mit dem Finger zusammen. Mit den Einstellungen lassen sich Inhalt, Anzahl, Bewegungsart, Tempo, Zeichengröße und ein Zeitlimit selbst festlegen.',
      daily:
        'Überall, wo man unter Zeitdruck das Nächste in einer Reihenfolge finden und erreichen muss: Listen und Tabellen auf dem Bildschirm, Tastenfelder, Handgriffe bei der Arbeit. Ob die Übung dabei hilft, ist nicht belegt.',
      research:
        'Verbindungsaufgaben mit Zahlen und Buchstaben (Trail Making, erstmals bei Reitan, 1958) sind ein neuropsychologisches Verfahren, das 5 bis 10 Minuten dauert (Bowie & Harvey, 2006). In einer Studie mit gesunden älteren Erwachsenen verlangte die reine Zahlenversion vor allem Wahrnehmen und Finden, die Version mit Zahlen und Buchstaben im Wechsel vor allem das Arbeitsgedächtnis (Sánchez-Cubillo et al., 2009); bei über 3.600 Erwachsenen spiegelte eine verwandte Variante vor allem Tempo und flüssiges Denken (Salthouse, 2011). Diese Übung ist keine solche Aufgabe: Die Ziele bewegen sich, es gibt keine Normwerte, und sie sagt nichts über deine Fähigkeiten aus. Mehrere bewegte Punkte gleichzeitig im Auge zu behalten, gelingt bei langsamem Tempo mit bis zu 8 Punkten, bei sehr schnellem nur mit einem (Alvarez & Franconeri, 2007); hier musst du Ziele nicht im Gedächtnis behalten, ob Anzahl und Tempo ebenso wirken, ist nicht untersucht. Für das Ordnen bewegter Wörter oder Rechnungen gibt es keine Studie. Bei wiederholten Verbindungsaufgaben treten Übungseffekte auf, auch bei wöchentlicher Wiederholung über drei Wochen (Buck et al., 2008): Ein Teil der Verbesserung ist Gewöhnung an Aufgabe und Gerät. Bei Seh- und Reaktionsübungen fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt (Guo et al., 2025). Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020); Tablets wurden dort nicht untersucht. Darum zählt nur der Vergleich mit dir selbst auf demselben Gerät und mit denselben Einstellungen.',
      improved:
        'Zeichenhöhe in Zentimetern statt Pixeln (nach Kalibrierung des Bildschirms); auf kleinen Bildschirmen werden Zeichen und Kästchen so verkleinert, dass alle Ziele ins Bild passen, nie kleiner als ein Fingertipp. Die Bewegung rechnet mit der Zeit, nicht mit der Bildzahl: auf 60- und 120-Hz-Geräten gleich schnell. Doppeltipps zählen nicht doppelt, die Trefferfläche ist mindestens so groß wie eine Fingerkuppe. Weiche Rückmeldung mit ✓/✗ statt rotem Aufblitzen des Bildes. Jeder Durchlauf merkt sich seine Einstellungen: Verlauf, Bestwert und „Letztes Mal“ vergleichen nur Läufe mit gleichen Einstellungen (der Ton zählt nicht dazu). Gezeigt werden Gesamtzeit, richtige und falsche Ziele, Fehltipps und Zeit pro Ziel – keine Noten, keine Normwerte, keine Ranglisten.',
    },
    it: {
      trains:
        'Toccare nell’ordine giusto numeri, lettere, parole o calcoli mentre si muovono: cercare, ordinare a mente e mirare con il dito insieme. Con le impostazioni si scelgono da soli contenuto, numero, tipo di movimento, ritmo, dimensione dei caratteri e limite di tempo.',
      daily:
        'Ovunque si debba trovare e raggiungere in fretta l’elemento successivo di una sequenza: elenchi e tabelle sullo schermo, tastiere numeriche, gesti al lavoro. Che l’esercizio aiuti non è dimostrato.',
      research:
        'I compiti di collegamento con numeri e lettere (Trail Making, descritto per la prima volta da Reitan, 1958) sono un procedimento neuropsicologico che dura da 5 a 10 minuti (Bowie & Harvey, 2006). In uno studio con adulti anziani sani la versione solo con numeri richiedeva soprattutto percepire e trovare, la versione con numeri e lettere alternati soprattutto la memoria di lavoro (Sánchez-Cubillo et al., 2009); in oltre 3.600 adulti una variante affine rifletteva soprattutto velocità e pensiero flessibile (Salthouse, 2011). Questo esercizio non è un compito di questo tipo: i bersagli si muovono, non esistono valori di riferimento e non dice nulla sulle tue capacità. Tenere d’occhio più punti in movimento contemporaneamente riesce con ritmo lento fino a 8 punti, con ritmo molto veloce solo con uno (Alvarez & Franconeri, 2007); qui non devi ricordare i bersagli, e se numero e ritmo abbiano lo stesso effetto non è stato studiato. Per l’ordinamento di parole o calcoli in movimento non esiste uno studio. Con compiti di collegamento ripetuti compaiono effetti di esercizio, anche con una ripetizione settimanale per tre settimane (Buck et al., 2008): una parte del miglioramento è abitudine al compito e al dispositivo. Negli esercizi visivi e di reazione i miglioramenti risultano nettamente maggiori quando la verifica somiglia al compito allenato (Guo et al., 2025). I touchscreen misurano i tempi sistematicamente un po’ in eccesso, in modo diverso a seconda del dispositivo (Pronk et al., 2020); i tablet non erano stati studiati. Per questo conta solo il confronto con te stesso sullo stesso dispositivo e con le stesse impostazioni.',
      improved:
        'Altezza dei caratteri in centimetri invece che in pixel (dopo la calibrazione dello schermo); sugli schermi piccoli caratteri e riquadri vengono ridotti perché tutti i bersagli stiano nell’immagine, mai più piccoli di un tocco di dito. Il movimento si calcola con il tempo, non con il numero di immagini: uguale su dispositivi a 60 e a 120 Hz. I tocchi doppi non contano due volte, l’area di tocco è almeno grande quanto la punta di un dito. Risposta morbida con ✓/✗ invece di far lampeggiare l’immagine di rosso. Ogni giro ricorda le sue impostazioni: andamento, record e “ultima volta” confrontano solo giri con le stesse impostazioni (il suono non conta). Vengono mostrati tempo totale, bersagli giusti e sbagliati, tocchi a vuoto e tempo per bersaglio – niente voti, niente valori di riferimento, niente classifiche.',
    },
  },
  sources: [
    src('Reitan (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills', 'https://doi.org/10.2466/pms.1958.8.3.271'),
    src('Bowie & Harvey (2006). Administration and interpretation of the Trail Making Test. Nature Protocols', 'https://doi.org/10.1038/nprot.2006.390'),
    src('Sánchez-Cubillo et al. (2009). Construct validity of the Trail Making Test: Role of task-switching, working memory, inhibition/interference control, and visuomotor abilities. Journal of the International Neuropsychological Society', 'https://doi.org/10.1017/S1355617709090626'),
    src('Salthouse (2011). What cognitive abilities are involved in trail-making performance? Intelligence', 'https://doi.org/10.1016/j.intell.2011.03.001'),
    src('Buck, Atkinson & Ryan (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. Journal of Clinical and Experimental Neuropsychology', 'https://doi.org/10.1080/13803390701390483'),
    src('Alvarez & Franconeri (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. Journal of Vision', 'https://doi.org/10.1167/7.13.14'),
    src('Pronk, Wiers, Molenkamp & Murre (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. Behavior Research Methods', 'https://doi.org/10.3758/s13428-019-01321-2'),
    src('Guo, Yuan, Yang & Qiu (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. Frontiers in Physiology', 'https://doi.org/10.3389/fphys.2025.1664572'),
  ],
};
