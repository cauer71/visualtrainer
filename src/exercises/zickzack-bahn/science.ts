import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'zickzack-bahn',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Einer Kugel auf steilen Zickzack-Strecken mit abrupten Richtungswechseln mit den Augen folgen und dabei ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Plötzliche Richtungswechsel im Blick behalten: ein abprallender Ball, ein ausweichender Fußgänger, ein Vogel im Zickzackflug.',
      research:
        'Im Labor wurden wiederkehrende Bahnen mit Richtungswechseln nach wenigen Durchgängen vorausschauend verfolgt: Die Augen bremsen schon vor dem erwarteten Knick. Bei einem unerwarteten Knick dauert es dagegen etwa eine Zehntelsekunde, bis die Augen die neue Richtung aufnehmen. Senkrechtes Folgen fällt meist schwerer als waagrechtes, aufwärts schwerer als abwärts. Ein kurzes Training wirkte im Labor noch einige Tage nach. Das waren Studien mit Blickmessung, nicht mit dieser Übung. Ein Nutzen für Sport, Spiele oder Alltag ist nicht belegt.',
      improved:
        'Das Original misst nichts, und seine Knickwinkel hängen vom Bildschirm ab. Hier erscheint kurz ein Landolt-Ring in der Kugel, den du mit einem großen Button meldest, nur auf den geraden Strecken und nie im Knick. Ob die Augen wirklich folgen, wird nicht gemessen, nur ob du das Zeichen erkennst. Die Kugel läuft mit gleichmäßigem Tempo und kehrt an den Enden abrupt um. Mit der Stufe wird der Knick schärfer (etwa 110° bis 160°) und das Tempo steigt; die Bahn ist höchstens etwa 60 % der Bildschirmbreite breit.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera su ripidi tratti a zigzag con bruschi cambi di direzione e riconoscere un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio cambi di direzione improvvisi: una palla che rimbalza, un pedone che scarta, un uccello che vola a zigzag.',
      research:
        'In laboratorio percorsi ripetuti con cambi di direzione sono stati seguiti in modo previsionale dopo pochi passaggi: gli occhi frenano già prima della curva attesa. Con una curva inattesa, invece, passa circa un decimo di secondo prima che gli occhi prendano la nuova direzione. Seguire in verticale di solito è più difficile che in orizzontale, verso l’alto più che verso il basso. Un breve allenamento ha avuto effetto in laboratorio ancora per alcuni giorni. Erano studi con misurazione dello sguardo, non con questo esercizio. Un beneficio per lo sport, i giochi o la vita quotidiana non è dimostrato.',
      improved:
        'L’originale non misura nulla e i suoi angoli dipendono dallo schermo. Qui compare per un attimo un anello di Landolt nella sfera, che segnali con un grande pulsante, solo sui tratti dritti e mai nella curva. Se gli occhi seguono davvero, non viene misurato, ma solo se riconosci il segno. La sfera corre a velocità regolare e ai bordi inverte bruscamente. Con il livello la curva diventa più stretta (circa da 110° a 160°) e la velocità aumenta; il percorso è largo al massimo circa il 60 % dello schermo.',
    },
  },
  sources: [
    src(
      'Barnes & Asselman (1991). The mechanism of prediction in human smooth pursuit eye movements. The Journal of Physiology',
      'https://doi.org/10.1113/jphysiol.1991.sp018675',
    ),
    src(
      'Collins & Barnes (2009). Predicting the unpredictable: Weighted averaging of past stimulus timing facilitates ocular pursuit of randomly timed stimuli. The Journal of Neuroscience',
      'https://doi.org/10.1523/JNEUROSCI.1636-09.2009',
    ),
    src(
      'Soechting, Mrotek & Flanders (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-004-2010-2',
    ),
    src(
      'Ke, Lam, Pai & Spering (2013). Directional asymmetries in human smooth pursuit eye movements. Investigative Ophthalmology & Visual Science',
      'https://doi.org/10.1167/iovs.12-11369',
    ),
    src(
      'Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-012-3009-8',
    ),
  ],
};
