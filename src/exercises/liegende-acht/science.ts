import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'liegende-acht',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Einer gleichmäßig bewegten Kugel auf einer liegenden Acht mit den Augen folgen und dabei ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Gleichmäßig Bewegtes im Blick behalten: vorbeiziehende Schilder, Fahrzeuge, ein rollender Ball.',
      research:
        'Im Labor wurden vorhersagbare Bahnen schon nach wenigen Minuten Üben deutlich genauer mit den Augen verfolgt, und nach kurzem Training blieb ein Effekt einige Tage bestehen. Diese Studien arbeiteten mit Blickmessung, nicht mit dieser Übung. Für Lesen, Lernschwierigkeiten oder den Alltag ist ein Nutzen nicht belegt; Übungen zur Blickfolge gelten bei Lernschwierigkeiten ausdrücklich nicht als wirksam. Klinisch wird die Folgebewegung der Augen geprüft, indem sie einem nahen Ziel folgen, das in einem H geführt wird (Muchnick, 2008); diese Übung ist keine solche Prüfung.',
      improved:
        'In der Kugel erscheint kurz ein Landolt-Ring, den du mit einem großen Button meldest – so wird das Folgen verlangt und nicht nur behauptet. Ob die Augen wirklich folgen, wird trotzdem nicht gemessen, nur ob du das Zeichen erkennst. Tempo, Zeichengröße und Anzeigedauer passen sich Stufe für Stufe deinem Ergebnis an. Die Bewegung ist gleichmäßig und zeitbasiert, auch im Kreuzungspunkt, und die Bahn höchstens etwa 60 % der Bildschirmbreite breit, damit du den Kopf möglichst nicht drehen musst.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera che si muove in modo regolare su un otto sdraiato e riconoscere un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio ciò che si muove in modo regolare: cartelli che scorrono, veicoli, una palla che rotola.',
      research:
        'In laboratorio, traiettorie prevedibili sono state seguite con lo sguardo in modo nettamente più preciso già dopo pochi minuti di pratica, e dopo un breve allenamento un effetto è rimasto per alcuni giorni. Questi studi usavano la misurazione dello sguardo, non questo esercizio. Un beneficio per la lettura, per le difficoltà di apprendimento o per la vita quotidiana non è dimostrato; gli esercizi di inseguimento oculare non sono considerati efficaci nelle difficoltà di apprendimento. Dal punto di vista clinico, l’inseguimento oculare si valuta facendo seguire un bersaglio vicino spostato a forma di H (Muchnick, 2008); questo esercizio non è una valutazione di questo tipo.',
      improved:
        'Nella sfera compare per un attimo un anello di Landolt, che segnali con un grande pulsante: così seguire viene richiesto e non solo affermato. Se gli occhi seguono davvero, comunque non viene misurato, ma solo se riconosci il segno. Velocità, dimensione del segno e durata si adattano livello dopo livello al tuo risultato. Il movimento è regolare e basato sul tempo, anche nel punto di incrocio, e il percorso è largo al massimo circa il 60 % dello schermo, così non devi girare la testa.',
    },
  },
  sources: [
    src(
      'McHugh & Bahill (1985). Learning to track predictable target waveforms without a time delay. Investigative Ophthalmology & Visual Science',
      'https://pubmed.ncbi.nlm.nih.gov/4008209/',
    ),
    src(
      'Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-012-3009-8',
    ),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 32–35', 'https://openlibrary.org/isbn/9780323029612'),
    src('Barnes (2008). Cognitive processes involved in smooth pursuit eye movements. Brain and Cognition', 'https://doi.org/10.1016/j.bandc.2008.08.020'),
    src('Handler, Fierson et al. (2011). Learning disabilities, dyslexia, and vision. Pediatrics', 'https://doi.org/10.1542/peds.2010-3670'),
    src(
      'Han, Ciuffreda, Selenow & Ali (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. Investigative Ophthalmology & Visual Science',
      'https://doi.org/10.1167/iovs.02-0507',
    ),
  ],
};
