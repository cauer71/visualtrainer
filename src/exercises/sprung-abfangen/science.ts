import type { ScienceEntry } from '../../content/science';

const src = (label: string, url: string) => ({ label, url });

// Quellen: docs/uebungskatalog/uebungen/809-jump-sequence.md und docs/uebungskatalog/literatur/lit-W11-koerper-b.md (DOI per Crossref geprüft)
export const science: ScienceEntry = {
  id: 'sprung-abfangen',
  evidence: 'weak',
  texts: {
    de: {
      trains: 'Eine Strecke mit dem Finger dosieren: so weit ziehen, dass eine Kugel im Bogen auf einer Zielmarke landet.',
      daily: 'Überall, wo man eine Bewegung nach Augenmaß dosiert und dabei vorausdenkt, wo etwas landen wird: einen Ball werfen, etwas ablegen, eine Taste gedrückt halten.',
      research:
        'Wer ein bewegtes oder fliegendes Ziel trifft, muss seine Bahn vorhersagen. Die Forschung beschreibt dafür innere Modelle, die das Gesehene ergänzen. Bei zielgerichteten Bewegungen gibt es einen geplanten ersten Schwung und eine Feinkorrektur nach Rückmeldung. Mit Übung wird man in der geübten Aufgabe besser; dass sich das auf Sport, Sprungkraft oder den Alltag überträgt, ist nicht belegt. Für diese Übung gibt es keine eigene Studie.',
      improved:
        'Das Original ist ein Maus-Spiel und als „Sprungkrafttraining“ beworben, misst aber keinen Sprung. Hier steht ehrlich, dass du mit dem Finger am Bildschirm spielst. Die Weite bestimmst du durch die Länge des Ziehens; die Kugel fliegt auf einer echten Wurfparabel, unabhängig von der Bildrate. Nach jedem Sprung siehst du Landepunkt und Abweichung in Prozent der Bildschirmbreite, dazu „zu kurz“ oder „zu weit“ und ✓/✗. Kein rotes Blitzen, kein Wackeln, kein Zeitdruck. Trefferfeld und Hilfsmarke passen sich an. Gemessen wird nur, wie weit du ziehst und wo die Kugel landet – nicht dein Blick und keine Körperkraft.',
    },
    it: {
      trains: 'Dosare una distanza con il dito: tirare tanto quanto basta perché una pallina atterri ad arco su un segnale.',
      daily: 'Ovunque si dosi un movimento a occhio e si preveda dove atterrerà qualcosa: lanciare una palla, appoggiare un oggetto, tenere premuto un tasto.',
      research:
        'Chi colpisce un bersaglio in movimento o in volo deve prevederne la traiettoria. La ricerca descrive a tal fine modelli interni che completano ciò che si vede. Nei movimenti mirati c’è un primo impulso pianificato e una correzione fine in base al riscontro. Con la pratica si migliora nel compito allenato; che questo si trasferisca a sport, forza nel salto o vita quotidiana non è dimostrato. Per questo esercizio non esiste uno studio specifico.',
      improved:
        'L’originale è un gioco con il mouse, presentato come «allenamento alla forza del salto», ma non misura alcun salto. Qui è chiaro che giochi con il dito sullo schermo. La distanza la decidi con la lunghezza del tratto che tiri; la pallina vola su una vera parabola, indipendentemente dalla frequenza dello schermo. Dopo ogni salto vedi il punto di arrivo e lo scostamento in percentuale della larghezza dello schermo, oltre a «troppo corto» o «troppo lontano» e a ✓/✗. Nessun lampo rosso, nessuna scossa, nessuna pressione di tempo. Campo di centro e segno di aiuto si adattano. Si misura solo quanto tiri e dove atterra la pallina – non lo sguardo né la forza fisica.',
    },
  },
  sources: [
    src('Zago, McIntyre, Senot & Lacquaniti (2009). Visuo-motor coordination and internal models for object interception. Experimental Brain Research', 'https://doi.org/10.1007/s00221-008-1691-3'),
    src('Kawato (1999). Internal models for motor control and trajectory planning. Current Opinion in Neurobiology', 'https://doi.org/10.1016/S0959-4388(99)00028-8'),
    src("Elliott, Helsen & Chua (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. Psychological Bulletin", 'https://doi.org/10.1037/0033-2909.127.3.342'),
    src('Brenner & Smeets (2015). How people achieve their amazing temporal precision in interception. Journal of Vision', 'https://doi.org/10.1167/15.3.8'),
    src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
  ],
};
