---
# ===== Kennung =====
nr: 916
kennung: labor-buchstabentafel
name: "Buchstabentafel (Zeichengruppen Schritt für Schritt lesen, im eigenen Tempo oder im Takt)"
name_original: "– (eigene Blickfit-Übung, Labor, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-buchstabentafel", name: "Buchstabentafel", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Eine Tafel aus Gruppen von Buchstaben oder Ziffern wird Zeichen für Zeichen gelesen: Ein Rahmen markiert das nächste Zeichen, man liest es laut und tippt irgendwo, dann springt die Marke weiter – oder sie springt im Takt von selbst. Tafelgröße, Zeichen je Gruppe, Zeichenhöhe, Abstände, Leseordnung und Tempo stellt man selbst ein. Gemessen wird die Zeit, nicht der Blick."
ziel_funktionen: [sakkaden, verarbeitungsgeschwindigkeit, selektive_aufmerksamkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Keine Stufen, keine automatische Anpassung: Die Schwierigkeit ergibt sich aus den Einstellungen. Zeilen und Spalten je 1–8 Gruppen (Standard 4 × 4); Zeichen je Gruppe 1–6 (Standard 3, innerhalb einer Gruppe verschieden); Buchstaben (Standard) oder Ziffern 1–9; Zeichenhöhe 0,8–8 cm (Standard 2 cm); Abstand zwischen Zeichen 0–3 cm (Standard 0,4 cm; klein = mehr Gedränge); Abstand zwischen Gruppen 0,5–10 cm (Standard 3 cm; groß = weitere Blickwechsel); Leseordnung „Gruppe für Gruppe“ (Standard) oder „erst alle ersten Zeichen, dann alle zweiten …“; Tempo eigenes Tempo (Standard, Tippen = weiter) oder Takt 20–140 Schläge/min (Standard 60); Ton an/aus. Passt die Tafel nicht ins Feld, wird sie verkleinert (Hinweis unter 90 %)."
messgroessen: ["Hauptwert: Gesamtzeit vom ersten bis zum letzten Zeichen (im Takt durch Zeichenzahl × Taktlänge festgelegt, keine Leistungsangabe)", "gelesene Zeichen und Zeichen pro Minute", "nur im eigenen Tempo: Zeit pro Zeichen (Mittel, Streuung) und Gleichmäßigkeit (Streuung zu Mittel, ab zwei Zeitabständen)", "nur im Takt: eingestellter Takt", "Verkleinerung der Tafel in Prozent (wenn unter 90 %)", "kein Blickmaß, keine Prüfung des Lesens, keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen im eigenen Tempo. sakkaden = 3 bezeichnet die Anforderung (Blickwechsel von Zeichen
# zu Zeichen und von Gruppe zu Gruppe), nicht die Messung. Im Takt steigen zeitdruck und antizipation.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 2
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 2
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 2
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 1
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren und den Abstand angeben, damit Zeichenhöhe und Abstände in cm stimmen", "etwa 50–60 cm Abstand, Kopf ruhig, nur die Augen wandern", "Buchstaben des lateinischen Alphabets oder Ziffern sicher lesen können", "Raum, in dem laut gelesen werden kann (sonst leise innerlich mitlesen)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, nystagmus, amblyopie, kopfschmerz_asthenopie, trockenes_auge_bildschirm, lese_rechtschreib_schwaeche, kinder_unter_6]
geeignet_fuer: ["viele eng gesetzte Zeichen der Reihe nach erfassen, mit Blickwechseln von Zeichen zu Zeichen und von Gruppe zu Gruppe", "Gedränge (dicht stehende Zeichen) und Abstände gezielt einstellen", "im eigenen Tempo einen ruhigen, gleichmäßigen Rhythmus finden oder im Takt mithalten", "Vergleich mit sich selbst bei gleicher Tafel, gleichem Abstand und auf demselben Gerät"]
weniger_geeignet_fuer: ["Messung oder Beurteilung von Blicksprüngen oder Lesefähigkeit: gemessen wird nur, wann getippt wird", "Menschen, die Buchstaben oder Ziffern nicht sicher lesen können", "Ersatz für eine Untersuchung der Sehschärfe oder der Augenbewegungen", "Übungen, bei denen Treffgenauigkeit der Hand gefordert ist"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Zu Buchstabentafeln dieser Art (Hart-Charts) und ihrer Wirkung auf Blickwechsel fand eine Fachdatenbank-Suche keine Studie; Wirkangaben aus der Sehtherapie sind Praxisangaben ohne Beleg. Belegt sind Grundlagen: Gedränge begrenzt Erkennen und Lesetempo (Pelli & Tillman 2008; Whitney & Levi 2011), enger Abstand vermehrt Verwechslungen (Liu & Arditi 2001). Verbesserung beim Wiederholen ist zum Teil Gewöhnung (Guo et al. 2025); ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [905, 204, 915, 103, 919]
stichworte: ["Buchstabentafel", "Hart-Chart", "Zeichengruppen", "Gedränge", "Crowding", "Blickwechsel", "laut lesen", "eigenes Tempo", "Metronom", "Gleichmäßigkeit", "Labor", "Einstellungen"]
---

# 916 · Buchstabentafel (Zeichengruppen Schritt für Schritt lesen, im eigenen Tempo oder im Takt)

> Original: – (eigene Labor-Übung ohne Vorbild) · Blickfit: „Buchstabentafel“ (`src/exercises/labor-buchstabentafel/`, Kategorie Bewegung, Labor)

## 1. Kurzbeschreibung

Auf dem Bildschirm steht eine Tafel aus Gruppen von Buchstaben oder Ziffern, zum Beispiel 4 × 4 Gruppen mit je drei Zeichen. Ein Rahmen markiert das nächste Zeichen (zusätzlich wird es gelb); man liest es laut. Im **eigenen Tempo** tippt man danach irgendwo auf die Bühne (oder drückt Leertaste/Enter), und die Marke springt weiter; gelesene Zeichen werden blass. Im **Takt** springt die Marke von selbst im eingestellten Metronom-Takt weiter. Die Blickfit-Übung hat keine Stufen, sondern **Einstellungen**: Zeilen und Spalten (je 1–8 Gruppen), Zeichen je Gruppe (1–6), Buchstaben oder Ziffern, Zeichenhöhe (0,8–8 cm, Standard 2 cm), Abstand zwischen den Zeichen (0–3 cm; kleine Abstände verstärken das Gedränge) und zwischen den Gruppen (0,5–10 cm; große Abstände verlangen weitere Blickwechsel), Leseordnung („Gruppe für Gruppe“ oder „erst alle ersten Zeichen, dann alle zweiten …“), Tempo (eigenes Tempo oder Takt bis 140 Schläge pro Minute) und Ton. Passt die Tafel nicht auf den Bildschirm, wird sie verkleinert und das wird angezeigt. Gemessen wird die Zeit für die Tafel und im eigenen Tempo die Gleichmäßigkeit von Zeichen zu Zeichen; ob jedes Zeichen wirklich gelesen wurde und wohin man schaut, wird nicht gemessen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `logic.ts`, `index.ts`, `texts.ts` (Stand 05.10.2026).

- **Tafel:** Zeilen × Spalten Gruppen mit je `groupSize` verschiedenen Zeichen (je Gruppe neu gemischt) aus 18 Großbuchstaben (A B D E F G H K L M N P R S T U V Z) oder den Ziffern 1–9. Zeichenzelle 0,8 Zeichenhöhen breit plus Zeichenabstand.
- **Verkleinerung:** Passt die Tafel nicht in 96 % der Breite bzw. 88 % der Höhe, wird sie gleichmäßig verkleinert; unter 90 % mit Hinweis und Ergebniszeile. Mit den Standardwerten (4 × 4 × 3, 2 cm, Abstände 0,4 und 3 cm) ist die Tafel etwa 31 cm breit und wird auf einem 11-Zoll-Tablet deutlich verkleinert (Herleitung aus den Maßen).
- **Eigenes Tempo:** erstes Tippen startet, jedes weitere schließt den aktuellen Schritt ab; ein Tipp unter 340 ms nach dem vorigen wird ignoriert (Doppeltipp, zugleich höchstens ≈ 2,9 Wechsel pro Sekunde). Tastatur: Leertaste oder Enter.
- **Takt:** erster Schlag eine Taktlänge nach dem Start; die Gesamtzeit zählt vom ersten markierten Zeichen bis zum Ende des letzten und steht damit fest. Höchstens 140 Schläge pro Minute, Marke wechselt weich (≥ 100 ms) und blinkt nicht.
- **Kennzahlen:** Gesamtzeit, Zeichen pro Minute; im eigenen Tempo Mittel, Streuung und Streuung/Mittel der Zeit je Zeichen (erst ab zwei Zeitabständen).
- **Tipp nach dem Lauf (eigene Faustregeln):** im Takt → Hinweis zum Takt; im eigenen Tempo: Mittel unter 400 ms → „jedes Zeichen lesen“; Streuung/Mittel über 40 % → „gleichmäßiger“; sonst Vergleichshinweis. Punkte: 5 je Zeichen (nur Motivation). `usesCalibration: true`.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Vorbilds)

Die Übung ist eine eigene Labor-Übung. Aussagen und Quellen stammen aus `science.ts` (einzeln per Crossref und Abstract geprüft, 02.10.2026; Suche „Hart chart“ in einer Fachdatenbank: 6 Treffer zu Akkommodation bzw. fachfremd, „Hart chart“ und saccad*: 0 Treffer); ergänzt wurden nur per Crossref geprüfte Grundlagen (Bouma 1970, Leigh & Kennard 2004, Fisher et al. 2005, Hutchings et al. 2007, Sheppard & Wolffsohn 2018, Muchnick 2008 nur für Warnzeichen). Nicht übernommen: „schult Blicksprünge, Lesefluss und das Erkennen im Gedränge“ (Wirkversprechen), „die Tafel wirkt besonders, wenn man die Zeichen im Augenwinkel mitnimmt“ und „Gleichmäßigkeit ist eine Kennzahl für flüssiges Lesen“ (nicht belegt).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei etwa 50 cm Abstand entspricht 1 cm etwa 1,15°. Ein 2 cm hohes Zeichen erscheint etwa 2,3° hoch, ein 0,8 cm hohes etwa 0,9°. Zum Vergleich: Bei voller Sehschärfe sind Buchstaben von etwa 5 Bogenminuten (≈ 0,08°) Höhe gerade noch lesbar; die Zeichen der Tafel liegen also auch klein weit darüber. Wird die Tafel verkleinert, werden Zeichen und Abstände kleiner als eingestellt.
- **Gedränge (Crowding):** Zeichen, die dicht nebeneinanderstehen, sind schwerer zu erkennen als einzelne. Der Abstand, den Zeichen mindestens brauchen, wächst mit der Entfernung von der Blickmitte – etwa die Hälfte dieser Entfernung (Bouma, 1970) – und begrenzt Lese- und Suchtempo (Pelli & Tillman, 2008); Gedränge ist in fast dem ganzen Gesichtsfeld eine Grenze des Erkennens (Whitney & Levi, 2011). Bei engem Abstand (0,1 statt 1,0 Buchstabenhöhe) kamen in einer Studie mit Fünf-Buchstaben-Reihen mehr zufällige Verwechslungen vor (Liu & Arditi, 2001) – deshalb ist der Zeichenabstand einstellbar.
- **Blickwechsel:** Innerhalb einer Gruppe sind die Blickwechsel klein, zwischen Gruppen größer (Gruppenabstand). Bei „erst alle ersten Zeichen …“ springt der Blick bei jedem Zeichen zur nächsten Gruppe. Vor einem Blicksprung wandert die Aufmerksamkeit zum Zielzeichen; dort gelingt das Erkennen am besten, an Nachbarzeichen nur noch etwa zufällig (Deubel & Schneider, 1996). Augenbewegungen beim Lesen und Suchen sind gut untersucht (Rayner, 1998).
- **Brillenträger:** Die Tafel füllt einen großen Teil der Bühne. Bei Gleitsicht liegen obere und untere Zeilen in verschiedenen Zonen der Brille; Neu-Träger zeigen sehr unterschiedliche Kopf- und Augenstrategien (Hutchings et al., 2007). Wer die Zeichen nicht scharf sieht, vergrößert sie, statt die Augen zusammenzukneifen.
- **Naharbeit:** Große Tafeln (bis 8 × 8 Gruppen mit je 6 Zeichen) bedeuten anhaltendes Lesen in Bildschirmnähe; Augenbeschwerden am Bildschirm sind häufig (Sheppard & Wolffsohn, 2018). Pausen und bewusstes Blinzeln helfen.
- **Licht:** Im Takt wechselt die Marke höchstens etwa 2,3-mal pro Sekunde, weich und ohne Blinken. Anfälle durch Lichtreize werden am stärksten durch Frequenzen um 15–25 Hz ausgelöst (Fisher et al., 2005); die Übung bleibt weit darunter.
- **Farbe:** Die Marke ist ein Rahmen (Form), Gelb ist nur Zugabe; die Übung ist bei Farbsehschwäche lösbar.

## 5. Neurowissenschaftliche Grundlagen

- **Blicksprünge:** An der Steuerung von Sakkaden sind frontale und parietale Augenfelder, Colliculus superior, Kleinhirn und Hirnstamm beteiligt (Leigh & Kennard, 2004).
- **Erkennen im Gedränge:** Gedränge entsteht nicht im Auge, sondern bei der Verarbeitung im Gehirn: Merkmale benachbarter Zeichen werden zusammengefasst, wenn sie zu nah beieinanderstehen (Pelli & Tillman, 2008; Whitney & Levi, 2011).
- **Aufmerksamkeit:** Die Marke lenkt die Aufmerksamkeit auf das nächste Zeichen; Nachbarzeichen müssen ausgeblendet werden. Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Lesen und Sprechen:** Lautes Lesen verbindet das Erkennen mit dem Sprechen; die Zeit pro Zeichen im eigenen Tempo enthält Lesen, Entscheiden und Tippen, nicht nur den Blickwechsel.

## 6. Motorische Grundlagen

Im eigenen Tempo genügt ein Tipp irgendwo auf der Bühne (oder Leertaste/Enter); Treffgenauigkeit ist nicht gefordert, Tremor stört kaum. Doppeltipps unter 0,34 s werden ignoriert. Wiederholtes Tippen über viele Zeichen ist eine leichte Fingerarbeit. Im Takt ist keine Handbewegung nötig. Wer einfach durchtippt, ohne zu lesen, erhält kurze Zeiten – das kann die Übung nicht erkennen.

## 7. Einflussfaktoren und Messgrenzen

- **Kein Blickmaß, kein Lesemaß:** Ob jedes Zeichen wirklich gelesen wurde, wohin man schaut und ob man laut liest, misst die Übung nicht (kein Eye-Tracking).
- **Im Takt steht die Zeit fest:** Die Gesamtzeit ergibt sich aus Zeichenzahl und Takt und sagt nichts über die Person.
- **Kalibrierung und Verkleinerung:** Zeichenhöhe und Abstände stimmen nur nach Kalibrierung; auf kleinen Bildschirmen wird die Tafel verkleinert – mit den Standardwerten fast immer. Gleiche Einstellungen auf verschiedenen Geräten ergeben deshalb verschiedene Zeichengrößen.
- **Touch-Zeit:** Touchscreens messen Zeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht).
- **Gleichmäßigkeit:** Streuung zu Mittel ist eine einfache Kennzahl der Übung, keine Bewertung des Lesens; bei wenigen Zeichen schwankt sie stark.
- **Gewöhnung:** Ein Teil der Verbesserung beim Wiederholen ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Vergleichbar sind nur Läufe mit gleicher Tafel, gleichem Abstand und auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Buchstabentafeln dieser Art (Hart-Charts) werden in der Sehtherapie verwendet; zu ihrer Wirkung auf Blickwechsel wurde in einer Fachdatenbank keine Studie gefunden. Dass man in der geübten Aufgabe schneller wird, ist durch Gewöhnung zu erwarten (Guo et al., 2025); für genau diese Übung gibt es keine Studie.
- **Naher Transfer – unklar:** Ob sich Verbesserungen auf andere Lese- oder Suchaufgaben übertragen, ist nicht untersucht.
- **Alltagstransfer – fehlend:** Ein Nutzen für Lesen, Sport oder Alltag ist nicht belegt. Dass größere Buchstaben- und Zeilenabstände das Lesen im Alltag erleichtern, wird in der Praxis angegeben und ist hier nicht belegt.
- **Einordnung:** Die Übung ist eine einstellbare Leseaufgabe mit Blickwechseln und Gedränge. Gesamtzeit und Gleichmäßigkeit sind Werte für den Vergleich mit sich selbst, keine Normwerte und keine Aussage über Augen oder Lesefähigkeit.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** viele Zeichen der Reihe nach mit Blickwechseln erfasst werden sollen; das Gedränge über Abstände gezielt eingestellt werden soll; jemand im eigenen Tempo ohne Zeitdruck üben oder im Takt mithalten möchte; laut gelesen werden kann.
- **Weniger passend, wenn …** Blicksprünge oder Lesefähigkeit gemessen werden sollen; Buchstaben oder Ziffern nicht sicher gelesen werden können; Handgenauigkeit geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: im Takt wechselt die Marke bis etwa 2,3-mal pro Sekunde, weich und ohne Blinken; bei bekannter Lichtempfindlichkeit eigenes Tempo wählen oder verzichten.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: große Zeichen, große Abstände, kleine Tafel; Arbeitsplatzbrille; nicht die Augen zusammenkneifen.
  - `nystagmus`, `amblyopie`: Erkennen im Gedränge kann deutlich erschwert sein; große Abstände wählen und das Ergebnis nicht als Aussage über das Auge lesen.
  - `kopfschmerz_asthenopie`, `trockenes_auge_bildschirm`: kleine Tafel, Pausen, bewusst blinzeln.
  - `lese_rechtschreib_schwaeche`, `kinder_unter_6`: Ziffern statt Buchstaben, wenige Zeichen je Gruppe; nicht untersucht.
- **Kombiniert gut mit …** 905 (4-Ziele-Wechsel, Tafeln in den Ecken), 204 (Zahlenjagd), 915 (Takt-Sakkaden), 103 (Suchzeichen im Feld), 919 (Zeichen finden).
- Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Sehschärfe-, Lese- oder Augenbewegungsprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Standardtafel zu groß für Tablets:** Mit den Standardwerten wird die Tafel fast immer verkleinert; ein kleinerer Standard (z. B. 3 × 3 Gruppen) würde Zeichenhöhe und Einstellung in Übereinstimmung bringen.
- **Durchtippen nicht erkennbar:** Ein Hinweis bei sehr kurzen Zeiten ist vorhanden; eine Stichprobe („Welches Zeichen war gerade markiert?“) könnte das Lesen gelegentlich prüfen.
- **Kein Blickmaß:** Texte halten das fest (`texts.ts`, `science.ts`).
- **Sehzeichenschrift:** Systemschrift ohne Serifen; eine fest eingebettete Schrift wäre gleichmäßiger.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Gedränge begrenzt Lese- und Suchtempo (Crossref geprüft; Abstract gelesen).
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Gedränge als Grenze des Erkennens (Crossref geprüft; Abstract gelesen).
- Liu, L., & Arditi, A. (2001). How crowding affects letter confusion. *Optometry and Vision Science*, *78*(1), 50–55. https://doi.org/10.1097/00006324-200101010-00014 – enger Abstand vermehrt Verwechslungen (Crossref geprüft; Abstract gelesen).
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0 – kritischer Abstand etwa die Hälfte der Entfernung von der Blickmitte (Crossref geprüft).
- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research*, *36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 – Aufmerksamkeit am Sakkadenziel (Crossref geprüft; Abstract gelesen).
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, *124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Übersicht zu Augenbewegungen beim Lesen und Suchen (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchgerät (Crossref geprüft; Abstract gelesen).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Gewöhnungseffekt bei trainingsähnlicher Prüfung (Crossref geprüft; Abstract gelesen).
- Leigh, R. J., & Kennard, C. (2004). Using saccades as a research tool in the clinical neurosciences. *Brain*, *127*(3), 460–477. https://doi.org/10.1093/brain/awh035 – Übersicht zur Sakkadensteuerung (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize und Anfälle (Crossref geprüft).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopf- und Augenbewegungen bei Gleitsicht (Crossref geprüft).
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, *3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Augenbelastung am Bildschirm (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28).
