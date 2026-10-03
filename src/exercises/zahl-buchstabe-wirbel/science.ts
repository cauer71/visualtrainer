import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zahl-buchstabe-wirbel',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Zwischen einer Zahlen- und einer Buchstabenreihe wechseln, dabei bewegte, teils überlappende Zeichen im Blick behalten.',
      daily: 'Überall, wo man zwei Dinge abwechselnd verfolgt und die Übersicht behalten muss: Fahrpläne und Formulare, Küche, Werkstatt.',
      research:
        'Das abwechselnde Verbinden von Zahlen und Buchstaben ist das Prinzip des Trail Making Test B. In Studien hing die Zeit vor allem am Arbeitsgedächtnis und erst danach am Wechseln zwischen den Reihen; über viele Altersgruppen hinweg spiegelte sie vor allem das Verarbeitungstempo wider. Bei Wiederholung wird man deutlich schneller (Übungseffekt). Enge Abstände und Überdeckung erschweren das Erkennen (Crowding). Die Fassung mit bewegten, überlappenden Zeichen ist eine eigene Variante und nicht untersucht; dass sich Üben auf Alltag oder Sehen überträgt, ist nicht belegt. Einzelwerte am Menschen streuen von Mal zu Mal; aussagekräftig ist nur der Verlauf über mehrere Runden (Mountford et al. 2004).',
      improved:
        'Die Zeichen drehen ruhig auf Kreisen und Ellipsen um versetzte Mittelpunkte, alle gleich schnell; ab Stufe 3 läuft ein wachsender Teil gegenläufig, und mit jeder Stufe wachsen der Versatz der Mittelpunkte, die Dichte und die Zahl der Paare (bis 15). Getippte Zeichen bleiben blass sichtbar, damit die Suche nicht leichter wird, und bei Überlappung hat das gesuchte Zeichen Vorrang. Die Stufe steigt nach zwei erfolgreichen Runden in Folge und sinkt nach einer misslungenen; eine Runde gilt als erfolgreich bei höchstens einem Fehltipp und moderater Zeit je Zeichen. Fehltipps kosten keine Zeit, Hauptwert ist die Stufe statt eines Normwerts, und bei „Bewegung reduzieren“ stehen die Zeichen still.',
    },
    it: {
      trains: 'Passare da una serie di numeri a una di lettere, tenendo d’occhio simboli in movimento e in parte sovrapposti.',
      daily: 'Ovunque si seguano due cose in alternanza senza perdere il filo: orari e moduli, cucina, officina.',
      research:
        'Collegare in alternanza numeri e lettere è il principio del Trail Making Test B. Negli studi il tempo dipendeva soprattutto dalla memoria di lavoro e solo dopo dal passaggio tra le serie; in molte fasce d’età rifletteva soprattutto la velocità di elaborazione. Ripetendo il compito si diventa nettamente più veloci (effetto della pratica). Distanze ridotte e sovrapposizioni rendono più difficile il riconoscimento (crowding). La versione con simboli in movimento e sovrapposti è una variante propria e non è stata studiata; che l’esercizio si trasferisca alla vita quotidiana o alla vista non è dimostrato. I singoli valori sull’uomo variano di volta in volta; conta solo l’andamento su più giri (Mountford et al. 2004).',
      improved:
        'I simboli ruotano con calma su cerchi ed ellissi attorno a centri sfalsati, tutti alla stessa velocità; dal livello 3 una parte crescente gira in senso opposto, e a ogni livello crescono lo sfalsamento dei centri, la densità e il numero di coppie (fino a 15). I simboli toccati restano visibili ma più chiari, perché la ricerca non diventi più facile, e in caso di sovrapposizione ha la precedenza il simbolo cercato. Il livello sale dopo due giri riusciti di fila e scende dopo uno non riuscito; un giro è riuscito con al massimo un tocco sbagliato e un tempo moderato per simbolo. I tocchi sbagliati non costano tempo, il valore principale è il livello e non una norma, e con “Riduci movimento” i simboli restano fermi.',
    },
  },
  sources: [
    src('Reitan (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills', 'https://doi.org/10.2466/pms.1958.8.3.271'),
    src('Sánchez-Cubillo et al. (2009). Construct validity of the Trail Making Test: Role of task-switching, working memory, inhibition/interference control, and visuomotor abilities. J Int Neuropsychol Soc', 'https://doi.org/10.1017/S1355617709090626'),
    src('Salthouse (2011). What cognitive abilities are involved in trail-making performance? Intelligence', 'https://doi.org/10.1016/j.intell.2011.03.001'),
    src('Buck, Atkinson & Ryan (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. J Clin Exp Neuropsychology', 'https://doi.org/10.1080/13803390701390483'),
    src('Whitney & Levi (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. Trends in Cognitive Sciences', 'https://doi.org/10.1016/j.tics.2011.02.005'),
    src('Tombaugh, T. N. (2004). Trail Making Test A and B: Normative data stratified by age and education. Archives of Clinical Neuropsychology', 'https://doi.org/10.1016/S0887-6177(03)00039-8'),
    src('Bowie, C. R., & Harvey, P. D. (2006). Administration and interpretation of the Trail Making Test. Nature Protocols', 'https://doi.org/10.1038/nprot.2006.390'),
    src('Mountford, J., Ruston, D., & Dave, T. (2004). Orthokeratology: Principles and Practice. Butterworth-Heinemann (S. 43–44)', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
