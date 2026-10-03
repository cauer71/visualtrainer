import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'hoehenwechsel-bahn',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Einer Kugel mit den Augen folgen, die auf einer Treppenbahn hin und her läuft und dabei langsam die Höhe wechselt, und auf den geraden Stücken ein Zeichen erkennen.',
      daily: 'Dem Blick Zeile für Zeile folgen: über Seiten, Tabellen und Listen, und dabei langsam nach unten wandern.',
      research:
        'Läuft ein Ziel gleichmäßig hin und her, lernt das Auge im Labor nach wenigen Durchläufen (etwa 2 bis 4), die Umkehr vorauszuahnen, und kehrt dann schon vor dem Ziel um. Kommt die Umkehr unerwartet früh, reagiert es deutlich später. Abwärts gelingt die glatte Blickfolge etwas besser als aufwärts. In einer kleinen Studie (je 10 Personen) war die Blickfolge nach kurzem Üben mit einem unregelmäßig bewegten Ziel noch nach fünf Tagen etwas genauer, und mit Rückmeldung für genaues Folgen lernten Versuchspersonen in einer anderen Laborstudie mehr als ohne. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Bildschirmspiele oder den Alltag ist nicht belegt. Aus der Praxis der funktionellen Optometrie stammt die Regel, Blickfolge bei ruhigem Kopf nur mit den Augen zu üben und in kleinen, selbst gesteuerten Schritten zu steigern; belegt ist das nicht.',
      improved:
        'Die Kugel läuft gleichmäßig fast waagerecht hin und her und wird Strecke für Strecke ein Stück tiefer, unten angekommen geht sie denselben Weg wieder hinauf; die feste Bahn macht die Umkehr vorhersagbar, der Höhenwechsel bleibt langsam. Auf den geraden Stücken – nie in der Wende – erscheint in ihr ein Landolt-Ring, den du mit einem großen Button meldest: Das Folgen wird so verlangt statt nur behauptet. Ob die Augen wirklich folgen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Höhenwechsel je Strecke, Tempo und Zeichengröße passen sich an, und du bekommst sofort ✓/✗ als Rückmeldung.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che corre avanti e indietro su un percorso a gradini cambiando piano l’altezza, e riconoscere un segno sui tratti dritti.',
      daily: 'Seguire lo sguardo riga dopo riga: su pagine, tabelle ed elenchi, scendendo piano verso il basso.',
      research:
        'Se un bersaglio corre in modo regolare avanti e indietro, in laboratorio l’occhio impara dopo pochi passaggi (circa 2–4) a prevedere l’inversione e inverte già prima del bersaglio. Se l’inversione arriva inaspettatamente presto, reagisce molto più tardi. In discesa l’inseguimento regolare riesce un po’ meglio che in salita. In un piccolo studio (10 persone per gruppo) l’inseguimento era un po’ più preciso ancora dopo cinque giorni da un breve esercizio con un bersaglio dal movimento irregolare, e in un altro studio di laboratorio con un riscontro per l’inseguimento preciso i partecipanti imparavano di più che senza. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per lo sport, i videogiochi o la vita quotidiana non è dimostrato. Dalla pratica dell’optometria funzionale viene la regola di esercitare l’inseguimento con la testa ferma, solo con gli occhi, e di aumentare la difficoltà a piccoli passi, decisi da sé; non è dimostrato.',
      improved:
        'La sfera corre in modo regolare, quasi in orizzontale, avanti e indietro e a ogni tratto scende un po’ di più; arrivata in fondo risale lungo lo stesso percorso. Il percorso fisso rende l’inversione prevedibile, e il cambio di altezza resta lento. Sui tratti dritti – mai nella svolta – compare al suo interno un anello di Landolt che segnali con un grande pulsante: seguirla viene così richiesto invece di essere solo affermato. Se gli occhi seguono davvero, comunque non viene misurato, ma solo se riconosci il segno. Dislivello per tratto, velocità e dimensione del segno si adattano, e ricevi subito ✓/✗ come riscontro.',
    },
  },
  sources: [
    src('Barnes & Asselman (1991). The mechanism of prediction in human smooth pursuit eye movements. The Journal of Physiology', 'https://doi.org/10.1113/jphysiol.1991.sp018675'),
    src(
      'Jarrett & Barnes (2005). The use of non-motion-based cues to pre-programme the timing of predictive velocity reversal in human smooth pursuit. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-005-2260-7',
    ),
    src('Ke, Lam, Pai & Spering (2013). Directional asymmetries in human smooth pursuit eye movements. Investigative Ophthalmology & Visual Science', 'https://doi.org/10.1167/iovs.12-11369'),
    src('Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research', 'https://doi.org/10.1007/s00221-012-3009-8'),
    src(
      'Madelain & Krauzlis (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00869.2002',
    ),
  ],
};
