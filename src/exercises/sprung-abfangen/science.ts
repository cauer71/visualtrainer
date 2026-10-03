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
        'Wer ein bewegtes oder fliegendes Ziel trifft, muss seine Bahn vorhersagen. Die Forschung beschreibt dafür innere Modelle, die das Gesehene ergänzen. Bei zielgerichteten Bewegungen gibt es einen geplanten ersten Schwung und eine Feinkorrektur nach Rückmeldung. Mit Übung wird man in der geübten Aufgabe besser; dass sich das auf Sport, Sprungkraft oder den Alltag überträgt, ist nicht belegt. Für diese Übung gibt es keine eigene Studie. Doppelbilder, plötzliche Sehverschlechterung, Kopfschmerz mit Sehverschlechterung, Zittern oder Schwindel gehören ärztlich abgeklärt; die Übung ist weder Test noch Diagnose (Lehrbuchwissen: Muchnick, 2008).',
      improved:
        'Die Übung ist für den Finger gebaut: Die Weite bestimmst du durch die Länge des Ziehens an einer Kraftleiste, und die Kugel fliegt nach dem Loslassen auf einer echten Wurfparabel (feste Abwurfrichtung und Schwerkraft), unabhängig von der Bildrate. Der Finger bleibt unter dem Geschehen und verdeckt nichts. Nach jedem Sprung siehst du Landepunkt und Abweichung in Prozent der Bildschirmbreite, dazu „zu kurz“ oder „zu weit“ und ✓/✗. Mit den Stufen wird das Trefferfeld enger, die Hilfsmarke an der Leiste, die anfangs die richtige Kraft zeigt, blendet bis Stufe 8 aus, und die Zielabstände streuen stärker. Zwölf Sprünge ohne Zeitdruck; kein Rot, kein Blitz, kein Wackeln. Gemessen wird nur, wie weit du ziehst und wo die Kugel landet – nicht dein Blick und keine Körperkraft.',
    },
    it: {
      trains: 'Dosare una distanza con il dito: tirare tanto quanto basta perché una pallina atterri ad arco su un segnale.',
      daily: 'Ovunque si dosi un movimento a occhio e si preveda dove atterrerà qualcosa: lanciare una palla, appoggiare un oggetto, tenere premuto un tasto.',
      research:
        'Chi colpisce un bersaglio in movimento o in volo deve prevederne la traiettoria. La ricerca descrive a tal fine modelli interni che completano ciò che si vede. Nei movimenti mirati c’è un primo impulso pianificato e una correzione fine in base al riscontro. Con la pratica si migliora nel compito allenato; che questo si trasferisca a sport, forza nel salto o vita quotidiana non è dimostrato. Per questo esercizio non esiste uno studio specifico. Visione doppia, improvviso peggioramento della vista, mal di testa con peggioramento della vista, tremore o vertigini vanno chiariti dal medico; l’esercizio non è né un test né una diagnosi (manuale: Muchnick, 2008).',
      improved:
        'L’esercizio è pensato per il dito: la distanza la decidi con la lunghezza del tratto che tiri su una barra di forza, e dopo il rilascio la pallina vola su una vera parabola (direzione di lancio e gravità fisse), indipendentemente dalla frequenza dello schermo. Il dito resta sotto l’azione e non copre nulla. Dopo ogni salto vedi il punto di arrivo e lo scostamento in percentuale della larghezza dello schermo, oltre a «troppo corto» o «troppo lontano» e a ✓/✗. Con i livelli il campo di centro si restringe, il segno di aiuto sulla barra, che all’inizio mostra la forza giusta, sfuma fino al livello 8 e le distanze del bersaglio variano di più. Dodici salti senza pressione di tempo; niente rosso, niente lampi, niente scosse. Si misura solo quanto tiri e dove atterra la pallina – non lo sguardo né la forza fisica.',
    },
  },
  sources: [
    src('Zago, McIntyre, Senot & Lacquaniti (2009). Visuo-motor coordination and internal models for object interception. Experimental Brain Research', 'https://doi.org/10.1007/s00221-008-1691-3'),
    src('Kawato (1999). Internal models for motor control and trajectory planning. Current Opinion in Neurobiology', 'https://doi.org/10.1016/S0959-4388(99)00028-8'),
    src("Elliott, Helsen & Chua (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. Psychological Bulletin", 'https://doi.org/10.1037/0033-2909.127.3.342'),
    src('Brenner & Smeets (2015). How people achieve their amazing temporal precision in interception. Journal of Vision', 'https://doi.org/10.1167/15.3.8'),
    src('Simons et al. (2016). Do "brain-training" programs work? Psychological Science in the Public Interest', 'https://doi.org/10.1177/1529100616661983'),
    src('Muchnick (2008). Clinical Medicine in Optometric Practice, 2nd ed. Mosby/Elsevier, S. 6 und 28 (Warnzeichen mit Abklärungsbedarf)', 'https://openlibrary.org/isbn/9780323029612'),
  ],
};
