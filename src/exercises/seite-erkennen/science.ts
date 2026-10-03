import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'seite-erkennen',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Bei einer gezeigten Hand, einem Fuß oder Unterarm entscheiden, ob es die linke oder die rechte Seite ist – auch wenn das Bild gedreht ist.',
      daily: 'Links und rechts auseinanderhalten, etwa bei einer Skizze, einem Foto oder einer Anleitung, in der eine Hand oder ein Fuß in ungewohnter Lage gezeigt wird.',
      research:
        'Die Aufgabe entspricht der in der Forschung seit Langem genutzten Links-Rechts-Beurteilung von Händen und Füßen: Die Antwortzeit wächst mit dem Drehwinkel des Bildes und ist für körperlich unbequeme Drehungen länger; viele Menschen lösen sie, indem sie sich die eigene Hand oder den eigenen Fuß in der gezeigten Lage vorstellen. Gedreht wird dabei nur – die Seite ändert sich durch eine Drehung nie. Dass das Üben dieser Aufgabe sich auf Alltag, Sport oder Gesundheit überträgt, ist nicht belegt; Links-Rechts-Unsicherheit kommt auch bei Gesunden vor, und die Übung sagt darüber nichts aus. Einzelwerte am Menschen streuen von Mal zu Mal; aussagekräftig ist nur der Verlauf über mehrere Runden (Mountford et al. 2004).',
      improved:
        'Die Zeichnungen tragen eindeutige Merkmale (Daumen und große Zehe deutlich abgesetzt; Handfläche mit Falten, Handrücken mit Nägeln und Sehnen; Sohle mit Gewölbe, Fußrücken mit Zehennägeln) und werden sauber gedreht; die Seite ändert sich dabei nie. Links und rechts sowie jede Ansicht kommen gleich oft vor. Die Drehwinkel wachsen in der Reihenfolge, in der auch die Antwortzeiten wachsen: zuerst aufrecht und leicht schräg, ab Stufe 5 Vierteldrehungen, ab Stufe 8 auf den Kopf gestellt. Ab Stufe 7 tauschen die beiden Antwortfelder ihre Seiten, ab Stufe 10 kommen zwei Felder hinzu, die nie richtig sind. Die Stufe steigt nach drei richtigen Antworten in Folge und sinkt nach einem Fehler; eine weiche Antwortfrist gilt ohne Punktabzug. Die Rückmeldung ist sanft (✓/✗ statt Rotblitz), das Ergebnis zählt nur im Vergleich mit dir selbst.',
    },
    it: {
      trains: 'Decidere, davanti a una mano, un piede o un avambraccio mostrato, se è il lato sinistro o destro – anche con l’immagine ruotata.',
      daily: 'Distinguere destra e sinistra, per esempio in uno schizzo, in una foto o in un’istruzione in cui una mano o un piede sono mostrati in una posizione insolita.',
      research:
        'Il compito corrisponde alla valutazione destra-sinistra di mani e piedi usata da tempo nella ricerca: il tempo di risposta cresce con l’angolo di rotazione dell’immagine ed è più lungo per rotazioni fisicamente scomode; molte persone lo risolvono immaginando la propria mano o il proprio piede nella posizione mostrata. Si ruota soltanto – una rotazione non cambia mai il lato. Non è dimostrato che esercitare questo compito si trasferisca alla vita quotidiana, allo sport o alla salute; l’incertezza destra-sinistra capita anche a persone sane e l’esercizio non dice nulla in merito. I singoli valori sull’uomo variano di volta in volta; conta solo l’andamento su più giri (Mountford et al. 2004).',
      improved:
        'I disegni hanno caratteristiche chiare (pollice e alluce ben distinti; palmo con pieghe, dorso con unghie e tendini; pianta con arco, dorso del piede con unghie) e vengono ruotati in modo pulito; il lato non cambia mai con la rotazione. Sinistra e destra e ogni vista compaiono in ugual numero. Gli angoli crescono nell’ordine in cui crescono anche i tempi di risposta: prima in posizione eretta e leggermente inclinati, dal livello 5 rotazioni di un quarto di giro, dal livello 8 capovolti. Dal livello 7 i due campi di risposta si scambiano di posto, dal livello 10 si aggiungono due campi che non sono mai giusti. Il livello sale dopo tre risposte giuste di fila e scende dopo un errore; vale un tempo di risposta morbido, senza perdita di punti. Il riscontro è delicato (✓/✗ invece di lampi rossi), il risultato conta solo nel confronto con te stesso.',
    },
  },
  sources: [
    src('Cooper & Shepard (1975). Mental transformation in the identification of left and right hands. Journal of Experimental Psychology: Human Perception and Performance', 'https://doi.org/10.1037/0096-1523.1.1.48'),
    src('Sekiyama (1982). Kinesthetic aspects of mental representations in the identification of left and right hands. Perception & Psychophysics', 'https://doi.org/10.3758/BF03204268'),
    src('Parsons (1987). Imagined spatial transformations of one’s hands and feet. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(87)90011-9'),
    src('Shepard & Metzler (1971). Mental rotation of three-dimensional objects. Science', 'https://doi.org/10.1126/science.171.3972.701'),
    src('Uttal, D. H., Meadow, N. G., Tipton, E., Hand, L. L., Alden, A. R., Warren, C., & Newcombe, N. S. (2013). The malleability of spatial skills: A meta-analysis of training studies. Psychological Bulletin', 'https://doi.org/10.1037/a0028446'),
    src('ter Horst, A. C., van Lier, R., & Steenbergen, B. (2010). Mental rotation task of hands: Differential influence number of rotational axes. Experimental Brain Research', 'https://doi.org/10.1007/s00221-010-2235-1'),
    src('Breckenridge, J. D., Ginn, K. A., Wallwork, S. B., & McAuley, J. H. (2019). Do people with chronic musculoskeletal pain have impaired motor imagery? A meta-analytical systematic review of the left/right judgment task. The Journal of Pain', 'https://doi.org/10.1016/j.jpain.2018.07.004'),
    src('Bowering, K. J., O’Connell, N. E., Tabor, A., Catley, M. J., Leake, H. B., Moseley, G. L., & Stanton, T. R. (2013). The effects of graded motor imagery and its components on chronic pain: A systematic review and meta-analysis. The Journal of Pain', 'https://doi.org/10.1016/j.jpain.2012.09.007'),
    src('Mountford, J., Ruston, D., & Dave, T. (2004). Orthokeratology: Principles and Practice. Butterworth-Heinemann (S. 43–44)', 'https://openlibrary.org/isbn/9780750640077'),
  ],
};
