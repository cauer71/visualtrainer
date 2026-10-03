import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'sanfte-blickfolge',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Einer Kugel auf einer weichen, gleichmäßig durchlaufenen Schlaufenbahn mit den Augen folgen und dabei ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Gleichmäßig Bewegtes im Blick behalten: ein Vogel am Himmel, ein Boot auf dem See, ein Zug in der Ferne.',
      research:
        'Im Labor wurden vorhersagbare, regelmäßig wiederkehrende Bahnen schon nach wenigen Minuten deutlich genauer verfolgt, und bei Bahnen aus zwei Schwingungen baut das Auge früh eine Vorhersage auf. Ein kurzes Training wirkte im Labor noch einige Tage nach. Das waren Studien mit Blickmessung, nicht mit dieser Übung. Senkrechtes Folgen fällt meist schwerer als waagrechtes. Ein Nutzen für Lesen, Sport oder Alltag ist nicht belegt. Klinisch wird die Folgebewegung der Augen geprüft, indem sie einem nahen Ziel folgen, das in einem H geführt wird (Muchnick, 2008); diese Übung ist keine solche Prüfung.',
      improved:
        'In der Kugel erscheint kurz ein Landolt-Ring, den du mit einem großen Button meldest. Ob die Augen wirklich folgen, wird nicht gemessen, nur ob du das Zeichen erkennst. Die Kugel läuft mit gleichmäßigem Tempo entlang der Bahn und bremst nur in den engsten Bögen leicht ab, so wie auch das Auge in Kurven langsamer wird. Das Tempo steigt stufenweise, und die Bahn ist höchstens etwa 60 % der Bildschirmbreite breit, damit der Kopf ruhig bleiben kann.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera su un percorso morbido a cappio, percorso a velocità regolare, e riconoscere un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio ciò che si muove in modo regolare: un uccello nel cielo, una barca sul lago, un treno in lontananza.',
      research:
        'In laboratorio percorsi prevedibili e ripetuti con regolarità sono stati seguiti in modo nettamente più preciso già dopo pochi minuti, e con percorsi formati da due oscillazioni l’occhio costruisce presto una previsione. Un breve allenamento ha avuto effetto in laboratorio ancora per alcuni giorni. Erano studi con misurazione dello sguardo, non con questo esercizio. Seguire in verticale di solito è più difficile che in orizzontale. Un beneficio per la lettura, lo sport o la vita quotidiana non è dimostrato. Dal punto di vista clinico, l’inseguimento oculare si valuta facendo seguire agli occhi un bersaglio vicino, mosso a forma di H (Muchnick, 2008); questo esercizio non è una valutazione di questo tipo.',
      improved:
        'Nella sfera compare per un attimo un anello di Landolt, che segnali con un grande pulsante. Se gli occhi seguono davvero, non viene misurato, ma solo se riconosci il segno. La sfera corre a velocità regolare lungo il percorso e rallenta leggermente solo nelle curve più strette, come fa anche l’occhio nelle curve. La velocità cresce a gradini e il percorso è largo al massimo circa il 60 % dello schermo, così la testa può restare ferma.',
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
    src(
      'Soechting, Rao & Juveli (2010). Incorporating prediction in models for two-dimensional smooth pursuit. PLoS ONE',
      'https://doi.org/10.1371/journal.pone.0012574',
    ),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice. 2nd ed. Mosby/Elsevier. S. 32–35', 'https://openlibrary.org/isbn/9780323029612'),
    src(
      'Rottach et al. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. Vision Research',
      'https://doi.org/10.1016/0042-6989(95)00302-9',
    ),
    src(
      'Heinen, Potapchuk & Watamaniuk (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.00774.2015',
    ),
  ],
};
