import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'wellenbahn',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'Einer Kugel auf einer laufenden Sinuswelle mit den Augen folgen und dabei ein kurz gezeigtes Zeichen erkennen.',
      daily: 'Auf-und-ab-Bewegungen im Blick behalten: ein Ball im Flug, ein Fahrzeug auf hügeliger Strecke, Wellen.',
      research:
        'Im Labor lernten Geübte, regelmäßig schwingende Ziele fast ohne Verzögerung mit den Augen zu verfolgen; die Vorhersage baut sich nach wenigen Schwingungen auf. Nach kurzem Training blieb ein Effekt einige Tage bestehen. Das waren Studien mit Blickmessung, nicht mit dieser Übung. Auf-und-ab-Folgen fällt meist schwerer als waagrechtes. Ein Nutzen für Sport oder Alltag ist nicht belegt.',
      improved:
        'Das Original misst nichts, läuft mit hartem Knick am Rand und wird bei hohem Tempo ruckelig. Hier erscheint kurz ein Landolt-Ring in der Kugel, den du mit einem großen Button meldest. Ob die Augen wirklich folgen, wird nicht gemessen, nur ob du das Zeichen erkennst. Die Kugel läuft mit gleichmäßigem Tempo entlang der Kurve, kehrt weich um und zeigt das Zeichen nur bei vollem Tempo. Amplitude und Wellenzahl steigen mit der Stufe, die Bahn ist höchstens etwa 60 % der Bildschirmbreite breit.',
    },
    it: {
      trains: 'Seguire con lo sguardo una sfera su un’onda sinusoidale in movimento e riconoscere un segno mostrato per un attimo.',
      daily: 'Tenere d’occhio movimenti su e giù: una palla in volo, un veicolo su una strada collinosa, le onde.',
      research:
        'In laboratorio chi si era esercitato ha imparato a seguire con lo sguardo bersagli oscillanti in modo regolare quasi senza ritardo; la previsione si costruisce dopo poche oscillazioni. Dopo un breve allenamento un effetto è rimasto per alcuni giorni. Erano studi con misurazione dello sguardo, non con questo esercizio. Seguire su e giù di solito è più difficile che in orizzontale. Un beneficio per lo sport o la vita quotidiana non è dimostrato.',
      improved:
        'L’originale non misura nulla, inverte bruscamente ai bordi e a velocità alta diventa a scatti. Qui compare per un attimo un anello di Landolt nella sfera, che segnali con un grande pulsante. Se gli occhi seguono davvero, non viene misurato, ma solo se riconosci il segno. La sfera corre a velocità regolare lungo la curva, inverte con dolcezza e mostra il segno solo a velocità piena. Ampiezza e numero di onde crescono con il livello; il percorso è largo al massimo circa il 60 % dello schermo.',
    },
  },
  sources: [
    src(
      'Bahill & McDonald (1983). Smooth pursuit eye movements in response to predictable target motions. Vision Research',
      'https://doi.org/10.1016/0042-6989(83)90171-2',
    ),
    src(
      'Barnes & Asselman (1991). The mechanism of prediction in human smooth pursuit eye movements. The Journal of Physiology',
      'https://doi.org/10.1113/jphysiol.1991.sp018675',
    ),
    src(
      'Barnes, Barnes & Chakraborti (2000). Ocular pursuit responses to repeated, single-cycle sinusoids reveal behavior compatible with predictive pursuit. Journal of Neurophysiology',
      'https://doi.org/10.1152/jn.2000.84.5.2340',
    ),
    src(
      'Eibenberger, Ring & Haslwanter (2012). Sustained effects for training of smooth pursuit plasticity. Experimental Brain Research',
      'https://doi.org/10.1007/s00221-012-3009-8',
    ),
    src(
      'Ke, Lam, Pai & Spering (2013). Directional asymmetries in human smooth pursuit eye movements. Investigative Ophthalmology & Visual Science',
      'https://doi.org/10.1167/iovs.12-11369',
    ),
  ],
};
