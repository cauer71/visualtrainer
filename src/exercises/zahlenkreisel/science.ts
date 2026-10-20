import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zahlenkreisel',
  evidence: 'weak',
  texts: {
    de: {
      trains:
        'Zahlen der Reihe nach finden, während sie sich auf gegenläufig drehenden Ringen bewegen: Blicksprünge planen, die gesuchte Zahl im Kopf behalten, bewegte Zahlen kurz scharf erfassen und sich von der Gegenbewegung nicht ablenken lassen.',
      daily: 'Überall, wo man in einer bewegten, unübersichtlichen Szene etwas Bestimmtes sucht: Anzeigetafeln, Menschenmengen, Verkehr, Ballsport.',
      research:
        'Zahlen der Reihe nach zu suchen ist das Prinzip der Zahlentafel nach Schulte und des Trail Making Test A; die Zeit hängt dort vor allem am Verarbeitungstempo, und mit Wiederholung wird man deutlich schneller (Übungseffekt). Visuelle Suche dauert länger, je mehr und je ähnlichere Ablenker es gibt – hier sind alle Ablenker Zahlen. In einer bekannten Laborstudie blieb die Suche ähnlich effizient, auch wenn die Zeichen ständig umgestellt wurden – ein Gedächtnis für schon abgesuchte Stellen spielt also eine kleinere Rolle als oft angenommen. Wer Zeichen auf bewegten Zielen erkennen soll, sieht schlechter als bei ruhenden (dynamische Sehschärfe), und enge Abstände erschweren das Erkennen (Crowding). Mehrere bewegte Objekte lassen sich nur begrenzt gleichzeitig im Blick behalten. Die Fassung mit gegenläufig drehenden Ringen ist eine eigene Variante und nicht eigens untersucht; dass sich Üben auf Alltag, Sport oder das Sehen überträgt, ist nicht belegt. Einzelwerte streuen von Mal zu Mal; aussagekräftig ist der Verlauf über mehrere Runden auf demselben Gerät.',
      improved:
        'Die Zahlen stehen auf Ringen mit festem Mindestabstand: Sie berühren sich zu keinem Zeitpunkt, und jede Trefferfläche ist mindestens 44 px groß (am Tablet deutlich größer); die Ziffern bleiben aufrecht und schaukeln nur leicht (je nach Stufe und Einstellung bis 18°). Jede Runde wird neu gemischt, aufeinanderfolgende Zahlen stehen nie direkt nebeneinander im selben Ring. Gefundene Zahlen bleiben sichtbar und bekommen nur einen Punkt, damit die Suche nicht mit jeder Zahl leichter wird; die nächste Zahl wird im Feld nie hervorgehoben. Fehltipps kosten keine Zeit, zählen aber. Die Stufe steigt nach einer zügigen Runde mit höchstens 5 % Fehltipps und sinkt bei deutlich zu langsamer Runde oder vielen Fehltipps; Hauptwert ist die Stufe, kein Normwert. Anzahl, Drehtempo, Gegenlauf und Schaukeln lassen sich einstellen und werden nur mit gleichen Einstellungen verglichen. Bei „Bewegung reduzieren“ stehen die Ringe still.',
    },
    it: {
      trains:
        'Trovare i numeri in ordine mentre si muovono su anelli che girano in senso opposto: pianificare i salti dello sguardo, tenere a mente il numero cercato, cogliere nitidamente per un attimo numeri in movimento e non farsi distrarre dal movimento contrario.',
      daily: 'Ovunque si cerchi qualcosa di preciso in una scena in movimento e confusa: tabelloni, folla, traffico, sport con la palla.',
      research:
        'Cercare i numeri in ordine è il principio della tabella dei numeri di Schulte e del Trail Making Test A; lì il tempo dipende soprattutto dalla velocità di elaborazione e ripetendo il compito si diventa nettamente più veloci (effetto della pratica). La ricerca visiva richiede più tempo quanto più numerosi e simili sono i distrattori – qui tutti i distrattori sono numeri. In un noto studio di laboratorio la ricerca è rimasta simile in efficienza anche quando i simboli venivano continuamente ricollocati – una memoria dei punti già esplorati conta quindi meno di quanto si pensi spesso. Riconoscere simboli su bersagli in movimento è più difficile che su bersagli fermi (acuità visiva dinamica), e distanze ridotte rendono più difficile il riconoscimento (crowding). Si possono tenere d’occhio contemporaneamente solo pochi oggetti in movimento. La versione con anelli che girano in senso opposto è una variante propria e non è stata studiata in modo specifico; che l’esercizio si trasferisca alla vita quotidiana, allo sport o alla vista non è dimostrato. I singoli valori variano di volta in volta; conta l’andamento su più giri sullo stesso dispositivo.',
      improved:
        'I numeri stanno su anelli con una distanza minima fissa: non si toccano mai, e ogni area di tocco misura almeno 44 px (sul tablet molto di più); le cifre restano dritte e oscillano solo leggermente (secondo livello e impostazione fino a 18°). Ogni giro viene rimescolato, i numeri consecutivi non stanno mai uno accanto all’altro sullo stesso anello. I numeri trovati restano visibili e ricevono solo un puntino, così la ricerca non diventa più facile a ogni numero; il numero successivo non viene mai evidenziato nel campo. I tocchi sbagliati non costano tempo, ma contano. Il livello sale dopo un giro rapido con al massimo il 5 % di tocchi sbagliati e scende se il giro è nettamente troppo lento o con molti errori; il valore principale è il livello, non una norma. Quantità, velocità, senso opposto e oscillazione si possono impostare e vengono confrontati solo a parità di impostazioni. Con “Riduci movimento” gli anelli restano fermi.',
    },
  },
  sources: [
    src('Treisman & Gelade (1980). A feature-integration theory of attention. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(80)90005-5'),
    src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295X.96.3.433'),
    src('Horowitz & Wolfe (1998). Visual search has no memory. Nature', 'https://doi.org/10.1038/29068'),
    src('Reitan (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills', 'https://doi.org/10.2466/pms.1958.8.3.271'),
    src('Salthouse (2011). What cognitive abilities are involved in trail-making performance? Intelligence', 'https://doi.org/10.1016/j.intell.2011.03.001'),
    src('Buck, Atkinson & Ryan (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803390701390483'),
    src('Ludvigh & Miller (1958). Study of visual acuity during the ocular pursuit of moving test objects. I. Introduction. Journal of the Optical Society of America', 'https://doi.org/10.1364/josa.48.000799'),
    src('Whitney & Levi (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. Trends in Cognitive Sciences', 'https://doi.org/10.1016/j.tics.2011.02.005'),
    src('Pylyshyn & Storm (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. Spatial Vision', 'https://doi.org/10.1163/156856888X00122'),
    src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
    src('Mountford, Ruston & Dave (2004). Orthokeratology: Principles and Practice, S. 43–44. Butterworth-Heinemann', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
