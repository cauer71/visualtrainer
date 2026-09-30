import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

export const science: ScienceEntry = {
  id: 'tipp-tempo',
  evidence: 'medium',
  texts: {
    de: {
      trains: 'So schnell wie möglich mit einem Finger tippen – in drei kurzen Runden mit Pausen – und sehen, wie gleichmäßig das Tempo bleibt.',
      daily: 'Schnelles Tippen auf Tablet und Handy, Spiele mit schnellem Tippen; Erleben, wie schnell eine Hand ermüdet.',
      research:
        'Gesunde Erwachsene tippen mit einem Finger etwa fünf- bis siebenmal pro Sekunde; das Tempo lässt sich zuverlässig messen und verbessert sich mit etwas Übung. Schon nach 10 bis 30 Sekunden Höchsttempo ermüdet das Tippen: In einer Studie mit vielen Smartphone-Nutzern sank die Rate über 30 Sekunden um rund 17 %. Dass Tipp-Training andere Fertigkeiten oder den Alltag verbessert, ist nicht belegt; Gesundheitswirkungen werden hier nicht versprochen. Das Ergebnis hängt von Gerät, Finger und Haltung ab – vergleiche dich nur mit dir selbst auf demselben Gerät, und hör bei Schmerzen in Hand oder Fingern auf.',
      improved:
        'Nur ein Finger wird gewertet (Mehrfinger-Trommeln zählt nicht), drei Runden mit Pausen statt einer langen Dauerbelastung, die Kugel ist groß und schrumpft nie, ein Tipp daneben wird nicht bestraft, keine roten Blitze, kein Wackeln, keine Noten oder Ranglisten; der Abfall zwischen erster und letzter Runde wird offen gezeigt, dazu die beste Runde.',
    },
    it: {
      trains: 'Toccare il più in fretta possibile con un solo dito – in tre brevi serie con pause – e vedere quanto resta regolare il ritmo.',
      daily: 'Toccare velocemente su tablet e smartphone, giochi con tocchi rapidi; sperimentare quanto in fretta si stanca una mano.',
      research:
        'Gli adulti sani toccano con un dito circa cinque-sette volte al secondo; il ritmo si misura in modo affidabile e migliora con un po’ di esercizio. Già dopo 10-30 secondi di velocità massima il tocco si affatica: in uno studio con molti utenti di smartphone la frequenza è calata di circa il 17 % in 30 secondi. Che l’allenamento al tocco migliori altre abilità o la vita quotidiana non è dimostrato; qui non si promettono effetti sulla salute. Il risultato dipende da dispositivo, dito e postura – confrontati solo con te stesso sullo stesso dispositivo e fermati se senti dolore alla mano o alle dita.',
      improved:
        'Viene valutato un solo dito (tamburellare con più dita non conta), tre serie con pause invece di un lungo sforzo continuo, la sfera è grande e non si rimpicciolisce mai, un tocco fuori non viene penalizzato, nessun lampo rosso, nessuno scuotimento, nessun voto o classifica; il calo tra la prima e l’ultima serie viene mostrato apertamente, insieme alla serie migliore.',
    },
  },
  sources: [
    src('Hubel, Reed, Yund, Herron & Woods (2013). Computerized measures of finger tapping: Effects of hand dominance, age, and sex. Perceptual and Motor Skills', 'https://doi.org/10.2466/25.29.PMS.116.3.929-952'),
    src('Hubel, Yund, Herron & Woods (2013). Computerized measures of finger tapping: Reliability, malingering and traumatic brain injury. Journal of Clinical and Experimental Neuropsychology', 'https://doi.org/10.1080/13803395.2013.824070'),
    src('Heimhofer, Neumann, Odermatt, Bächinger & Wenderoth (2024). Finger-specific effects of age on tapping speed and motor fatigability. Frontiers in Human Neuroscience', 'https://doi.org/10.3389/fnhum.2024.1427336'),
    src('Arias, Robles-García, Corral-Bergantiños, Madrid, Espinosa, Valls-Solé, Grieve, Oliviero & Cudeiro (2015). Central fatigue induced by short-lasting finger tapping and isometric tasks: A study of silent periods evoked at spinal and supraspinal levels. Neuroscience', 'https://doi.org/10.1016/j.neuroscience.2015.07.081'),
    src('Nutt, Lea, Van Houten, Schuff & Sexton (2000). Determinants of tapping speed in normal control subjects and subjects with Parkinson’s disease: Differing effects of brief and continued practice. Movement Disorders', 'https://doi.org/10.1002/1531-8257(200009)15:5<843::AID-MDS1013>3.0.CO;2-2'),
    src('Aoki, Francis & Kinoshita (2003). Differences in the abilities of individual fingers during the performance of fast, repetitive tapping movements. Experimental Brain Research', 'https://doi.org/10.1007/s00221-003-1552-z'),
    src('Sala, Tatlidil & Gobet (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. Psychological Bulletin', 'https://doi.org/10.1037/bul0000139'),
  ],
};
