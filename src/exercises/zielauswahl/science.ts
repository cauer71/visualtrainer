import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zielauswahl',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Mehrere Ziele mit unterschiedlicher Dringlichkeit, erkennbar an Form und Muster, in der richtigen Reihenfolge antippen: erst hoch, dann mittel, dann niedrig.',
      daily: 'Entscheiden, was zuerst dran ist, wenn mehrere Dinge gleichzeitig Aufmerksamkeit verlangen – etwa beim Kochen, im Haushalt oder beim Organisieren.',
      research:
        'Einzelne Merkmale wie Farbe oder Form fallen früh und fast automatisch auf; wenn sich Ziel und Ablenker ähnlich sehen, wird die Suche langsamer (Treisman & Gelade 1980; Duncan & Humphreys 1989). Wer eine Reihenfolge einhalten soll, muss außerdem voreilige Antworten zurückhalten. Hemmungsübungen werden in der geübten Aufgabe besser, in einer Studie mit einer aktiven Vergleichsgruppe aber nicht stärker als diese und ohne Übertragung auf andere Aufgaben (Enge et al. 2014). Rot-Grün-Farbsehschwäche betrifft etwa 8 Prozent der Männer; deshalb trägt hier nicht die Farbe die Information (Birch 2012). Für genau diese Übung gibt es keine Studie; ein Nutzen für Alltag, Sport oder Straßenverkehr ist nicht belegt.',
      improved:
        'Das Original unterscheidet die Ziele nur über den Farbton, bestraft Fehler mit Zeit, lässt die Runde durch Zeitgutschriften länger laufen, wackelt und leuchtet rot bei Fehlern. Hier steckt die Dringlichkeit in Form und Muster (Dreieck voll, Kreis gestreift, Quadrat gepunktet), die Farbe kommt nur dazu, und eine Legende zeigt die Reihenfolge. Die Ziele ruhen, die Sitzung hat eine feste Zahl von Runden, Fehler erscheinen als kleines weiches ✗ ohne Blitz und Wackeln. Die Stufe richtet sich nach Erfolg. Angezeigt werden der Anteil richtiger Reihenfolge und die Zeit je Ziel (Median), nicht mehr.',
    },
    it: {
      trains: 'Toccare nell’ordine giusto più bersagli con urgenza diversa, riconoscibili da forma e motivo: prima alta, poi media, poi bassa.',
      daily: 'Decidere cosa viene prima quando più cose richiedono attenzione insieme – per esempio mentre si cucina, nelle faccende di casa o organizzando.',
      research:
        'Le caratteristiche singole come colore o forma saltano all’occhio presto e quasi da sole; quando bersaglio e distrattori si somigliano, la ricerca rallenta (Treisman e Gelade 1980; Duncan e Humphreys 1989). Chi deve rispettare un ordine deve inoltre trattenere le risposte affrettate. Gli esercizi di inibizione migliorano nel compito esercitato, ma in uno studio con un gruppo di controllo attivo non più di questo e senza trasferimento ad altri compiti (Enge et al. 2014). La cecità parziale ai colori rosso-verde riguarda circa l’8 per cento degli uomini; per questo qui l’informazione non è portata dal colore (Birch 2012). Per questo esercizio non esiste uno studio; un’utilità per vita quotidiana, sport o traffico non è dimostrata.',
      improved:
        'L’originale distingue i bersagli solo dal colore, punisce gli errori con il tempo, allunga il turno con bonus di tempo, scuote e illumina di rosso in caso di errore. Qui l’urgenza sta in forma e motivo (triangolo pieno, cerchio a strisce, quadrato a puntini), il colore si aggiunge soltanto e una legenda mostra l’ordine. I bersagli stanno fermi, la sessione ha un numero fisso di turni, gli errori compaiono come una piccola ✗ delicata senza lampi né scosse. Il livello dipende dal successo. Vengono mostrati la quota di ordine corretto e il tempo per bersaglio (mediana), nient’altro.',
    },
  },
  sources: [
    src('Treisman & Gelade (1980). A feature-integration theory of attention. Cognitive Psychology', 'https://doi.org/10.1016/0010-0285(80)90005-5'),
    src('Duncan & Humphreys (1989). Visual search and stimulus similarity. Psychological Review', 'https://doi.org/10.1037/0033-295X.96.3.433'),
    src('Posner & Petersen (1990). The attention system of the human brain. Annual Review of Neuroscience', 'https://doi.org/10.1146/annurev.ne.13.030190.000325'),
    src('Wessel (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. Psychophysiology', 'https://doi.org/10.1111/psyp.12871'),
    src('Enge et al. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. Journal of Experimental Psychology: Learning, Memory, and Cognition', 'https://doi.org/10.1037/a0036165'),
    src('Birch (2012). Worldwide prevalence of red-green color deficiency. Journal of the Optical Society of America A', 'https://doi.org/10.1364/JOSAA.29.000313'),
    src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
  ],
};
