---
# ===== Kennung =====
nr: 904
kennung: zahl-buchstabe-wirbel
name: "Zahlen-Buchstaben-Wirbel (bewegte Zeichen abwechselnd in Folge antippen)"
name_original: "– (Handyvideo einer Reha-/Neuro-Trainingssoftware, kein Titel erkennbar, keine Regel sichtbar)"
kapitel: "Eigene Blickfit-Übungen"
kapitel_original: ""
unterkapitel_original: ""
blickfit_umsetzung: {kennung: "zahl-buchstabe-wirbel", name: "Zahlen-Buchstaben-Wirbel", unterschiede: "Eigene Umsetzung nach einem Handyvideo (Beobachtung, keine Online-Quelle). Im Video war keine Regel zu sehen; Blickfit setzt die Annahme einer abwechselnden Folge um (1 - A - 2 - B ...; Trail-Making-B-artig) mit Zeichen, die sich um versetzte Mittelpunkte drehen und sich dabei teils überlappen (Bewegung nach der Beobachtung des Auftraggebers, der das Original gespielt hat), und dem Hinweis oben („Als Nächstes: B“). Getippte Zeichen bleiben blass sichtbar (kein Verschwinden). Stufen 1-12 (Treppe 2 richtig = schwerer, 1 Fehler = leichter): Paare 3 bis 15 (Zeichen 6 bis 30), Zeichen laufen auf Kreisen und Ellipsen gemischt (Ellipsenanteil 30 % bis 70 %), ab Stufe 3 dreht ein wachsender Anteil in Gegenrichtung (10 % bis 50 %), Versatz der Drehmittelpunkte von ±3 % (Stufe 1) bis ±28 % (Stufe 12) der Spielfläche in x und y getrennt, eine Umdrehung in 60 s (Stufe 1, sehr langsam) bis 20 s (Stufe 12), Überlappung ergibt sich aus der Geometrie (ab Stufe 6 darf teilweise überlappt werden); Buchstaben je Sprache (Deutsch A bis O, Italienisch ohne J und K); bei Überlappung gilt das nächste Ziel bevorzugt. Hauptwert Stufe; Zusatzwerte nur im Vergleich mit sich selbst. Keine Normen. Trail Making mit Bewegung ist kein validiertes Verfahren. Zahlen können sich noch ändern."}
stand: 2026-10-01

# ===== Überblick =====
kurzbeschreibung: "Zahlen und Buchstaben drehen sich langsam auf einer hellen Fläche, jedes um einen eigenen, etwas versetzten Mittelpunkt (teils auf Kreisen, teils auf Ellipsen, mit steigender Stufe auch gegenläufig), und überlappen sich dabei zeitweise. Man tippt sie abwechselnd in aufsteigender Folge an (1 – A – 2 – B – 3 – C …); oben steht, was als Nächstes dran ist."
ziel_funktionen: [visuelle_suche, kognitive_flexibilitaet]
eingabe: [touch]
tablet_geeignet: ja
dauer_sekunden: 150
schwierigkeit_anpassung: "Blickfit (Stand der Spezifikation, Zahlen grob): 12 Stufen, Treppe 2 richtig in Folge = eine Stufe schwerer, 1 Fehler = leichter. Anzahl Paare 3 → 15 (Zeichen 6 → 30), Ellipsenanteil 30 % → 70 %, Gegenrichtung ab Stufe 3 (10 % → 50 % der Zeichen), Versatz der Drehmittelpunkte ±3 % → ±28 % der Spielfläche (x und y getrennt), eine Umdrehung in 60 s → 20 s (alle Zeichen gleich schnell, nur die Richtung kann wechseln), Überlappung ergibt sich aus der Geometrie und darf ab Stufe 6 teilweise sein. Erfolg einer Runde: höchstens 1 Fehltipp und Zeit je Zeichen unter einer Grenze (3,6 s minus 0,15 s je Stufe, mindestens 1,8 s). Original: im Video nicht erkennbar."
messgroessen: ["Hauptwert: erreichte Stufe (Schwelle der Treppe)", "Ø Sekunden je Zeichen (nur Vergleich mit früher auf diesem Gerät, keine Normen)", "Fehltipps", "Paare der letzten gelösten Runde", "Wechselkosten (Zahl → Buchstabe vs. Buchstabe → Zahl) nur, falls sinnvoll; ein klassischer Wechselzuschlag bräuchte eine Vergleichsrunde ohne Wechsel", "Original: im Video keine Auswertung erkennbar"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Das Profil beschreibt die Blickfit-Umsetzung (Stufen 1–12) mit der angenommenen abwechselnden Folge; das Original ist nur aus 3,6 s Video bekannt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 2
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 1
    visuelle_suche: 3
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 1
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 3
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 2
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Zahlen bis 15 und die ersten 15 Buchstaben des Alphabets (Deutsch A bis O, Italienisch A bis Q ohne J und K) in der Reihenfolge sicher kennen", "Zeichen von mindestens etwa 34 px (≈ 0,9° bei 40 cm Tablet-Abstand, eigene Rechnung) auch bei Überlappung erkennen", "Ein Spielfeld, das ohne Kopfdrehen überblickt werden kann (Tablet quer oder hoch)", "Mit dem Finger bewegte Zeichen treffen können (Trefferfläche mindestens 56 px)"]
vorsicht_bei: [kognitive_einschraenkung, aufmerksamkeitsprobleme, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, gesichtsfeldausfall, schwindel_vestibulaer, lese_rechtschreib_schwaeche]
geeignet_fuer: ["geordnetes Suchen und Wechseln zwischen zwei Folgen (Zahl, Buchstabe) üben", "Suchen und Tippen bei langsamer Bewegung und teilweiser Überlappung üben", "schrittweise steigende Zeichenzahl, zunächst stehend, ohne Zeitdruck im Display", "Selbstvergleich: Sekunden je Zeichen über mehrere Sitzungen auf demselben Gerät"]
weniger_geeignet_fuer: ["Messung oder Diagnose von Aufmerksamkeit, Exekutivfunktion oder Verarbeitungstempo (kein validiertes Verfahren, keine Normen)", "Menschen mit Schwindel bei bewegten Mustern, es sei denn der Modus „stehend“ ist aktiv", "Menschen ohne sichere Alphabetkenntnis", "Blickfolge, Reaktion oder Handgenauigkeit gezielt üben"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Beim klassischen Trail Making gibt es deutliche Übungseffekte, auch mit Parallelformen (Buck et al., 2008; Calamia et al., 2012), und die Zeiten spiegeln vor allem Verarbeitungstempo und fluide Fähigkeiten (Salthouse, 2011). Die bewegte, überlappende Variante ist nicht untersucht; Trail Making mit Bewegung ist kein validierter Test. Die Einstufung gilt für die Aufgabenart, nicht für diese Übung."
aehnliche_uebungen: [204, 708, 106, 202, 206]
stichworte: ["Trail Making", "Zahl-Buchstabe-Wechsel", "kognitive Flexibilität", "visuelle Suche", "Verdeckung", "Crowding", "bewegte Ziele", "Zahlenfolge", "ohne Normwerte"]
---

# 904 · Zahlen-Buchstaben-Wirbel (bewegte Zeichen abwechselnd in Folge antippen)

> Original: – (Handyvideo einer Reha-/Neuro-Trainingssoftware, 3,6 s, Querformat; keine Website, keine URL; **Regel im Video nicht sichtbar**) · Blickfit: „Zahlen-Buchstaben-Wirbel“ (`src/exercises/zahl-buchstabe-wirbel/`, Kategorie Konzentration; zum Zeitpunkt dieses Eintrags noch in Arbeit)

## 1. Kurzbeschreibung

Auf einer hellen Fläche drehen sich Zahlen und Buchstaben langsam, jedes Zeichen um einen eigenen, etwas versetzten Mittelpunkt. Die Bahnen sind Kreise und Ellipsen; mit steigender Stufe dreht ein wachsender Anteil der Zeichen in Gegenrichtung, die Mittelpunkte rücken weiter auseinander, und die Zahl der Paare steigt von 3 auf 15 (6 bis 30 Zeichen). Dabei überlappen sich Zeichen zeitweise, sodass manche halb verdeckt sind. Man tippt die Zeichen **abwechselnd in aufsteigender Folge** an – 1, A, 2, B, 3, C und so weiter –, und oben steht als Hinweis, was als Nächstes dran ist. Getippte Zeichen bleiben sichtbar, werden aber blass. Das Prinzip ist an den **Trail Making Test Teil B** der Neuropsychologie angelehnt (Zahlen und Buchstaben abwechselnd verbinden), nur mit kreisenden, teils überlappenden Zeichen. Trail Making mit Bewegung ist kein validiertes Verfahren; die Übung ist eine Such- und Wechselübung, kein Test.

## 2. Ablauf im Original (Analyse)

Quelle: **ein einziges Handyvideo** (3,6 s, Querformat, 848 × 474 px) des Auftraggebers von einem großen Touchmonitor mit Trainingssoftware. Name und Hersteller der Software sind unbekannt, es gibt keine Website und keinen Spielcode. Dieser Abschnitt beschreibt **nur, was in den 3,6 s zu sehen war**. Ob und wie die Software eine Folge verlangt, ist aus dem Video **nicht** erkennbar.

**Beobachtet (Video):**
- **Zeichen:** etwa 20 dunkelgraue Zeichen in einer serifenlosen Schrift auf hellem, fast weißem Grund. Erkennbar waren die **Zahlen 5 bis 14** (also 10 Zahlen) und die **Buchstaben E, F, G, H, I, L, M, N, O, P** (10 Buchstaben; J und K waren nicht zu sehen). Die Zeichen bleiben aufrecht, eine Drehung war nicht erkennbar.
- **Bewegung (im Video):** Alle Zeichen bewegen sich ruhig und gleichmäßig in **ganz unterschiedlichen Richtungen** (nach links, rechts, oben, unten) – das ist, wie sich jetzt zeigt, der Eindruck von Kreisbewegungen um verschiedene Mittelpunkte (siehe die Beobachtung des Auftraggebers unten). Nach einer groben Schätzung an zwei Zeichen aus den Standbildern legte ein Zeichen in 3,6 s etwa ein Viertel bis ein Drittel der sichtbaren Bildbreite zurück, also grob 7–10 % der Bildbreite pro Sekunde (ungenau: Bildausschnitt und Monitorgröße sind unbekannt). Einzelne Zeichen verlassen am oberen Bildrand den Ausschnitt des Videos und kommen wieder.
- **Überlappung:** Zeichen schieben sich zeitweise übereinander, zum Beispiel „13“ über „10“, „G“ und „O“, „11“ und „H“, „N“ und „14“. Die Zahl der Überlappungen ändert sich beim Drehen; manche Paare bleiben lange übereinander, weil alle Zeichen mit gleicher Winkelgeschwindigkeit drehen und ihre Mittelpunkte dicht beieinanderliegen.
- **Bildrand:** Am rechten Bildrand sind kleine Bedienelemente (Symbole, ein Anzeigefeld) zu erkennen; ihre Bedeutung ist nicht lesbar.

**Beobachtung des Auftraggebers** (er hat das Original selbst gespielt; mündliche Auskunft, nicht aus dem Video ablesbar): „Die Zeichen drehen alle um ein Zentrum. Jedes Zentrum ist etwas versetzt; je höher der Schwierigkeitsgrad, desto höher der Versatz (x und y).“ Das passt zu den Standbildern: Paare bleiben lange übereinander, weil sich alle Zeichen mit gleicher Winkelgeschwindigkeit drehen und ihre Zentren dicht beieinanderliegen. Blickfit setzt das als Bewegungsmodell um (siehe Abschnitt 10).

**Wunsch / Beobachtung des Auftraggebers nach Probespiel der ersten Blickfit-Fassung** („Das Feld ist zu klein“): „Bei steigender Schwierigkeit kann die Drehrichtung auch umgekehrt werden; Ellipsen und Kreis mischen; die Paarzahl steigt bis max. 15.“ Das ist ein Gestaltungswunsch für Blickfit, keine Beobachtung im Video; Ob das Original Ellipsen oder Gegenrichtung kennt, ist daraus nicht ableitbar. Die Zahlenwerte (Drehtempo, Größe des Versatzes je Stufe) sind **unsere Festlegung**, nicht gemessen.

**Nicht erkennbar (Video):** ob und wann ein Zeichen angetippt wird (keine Hand im Bild); welche Reihenfolge verlangt wird; ob getippte Zeichen verschwinden oder markiert werden; ob es Rückmeldung, Zeit, Punkte oder Stufen gibt; wie viele Zeichen ein Durchgang hat (es könnten mehr als die sichtbaren sein); wie das Drehtempo mit der Stufe wächst (der Versatz wächst laut Auftraggeber).

**Annahme (Hypothese, nicht belegt):**
- **Abwechselnde Folge Zahl – Buchstabe** (Trail-Making-B-artig), etwa 5 – E – 6 – F – 7 – G …, wobei Zahl *n* zum *n*-ten Buchstaben gehörte (5 ↔ E, 6 ↔ F, …).
- **Gegenprobe:** Die sichtbare Zeichenmenge passt **nicht lückenlos** dazu: Die Zahlen 10 und 11 wären mit J und K gepaart, die aber nicht zu sehen waren, während O und P (Paare zu 15 und 16) ohne passende Zahl erschienen. Das kann an Verdeckung, an einem anderen Durchgang oder an einer anderen Regel liegen.
- **Andere denkbare Regeln:** erst alle Zahlen, dann alle Buchstaben (zwei einfache Folgen), oder reines Aufsuchen/Verfolgen bestimmter Zeichen. Aus dem Video lässt sich keine davon ausschließen.
- Deshalb setzt Blickfit die abwechselnde Folge als **eigene Festlegung** um (siehe Abschnitt 10), nicht als Nachbau eines bekannten Ablaufs.

## 3. Was die Quelle sagt – und wie das einzuordnen ist

Es gibt **keinen Seitentext, keine Werbeaussage und keine Leistungsstufen** – nur 3,6 s Video. Eingeordnet wird deshalb, was die **angenommene Aufgabe** wissenschaftlich ist:

- **Trail Making ist ein klinisches Verfahren:** Der Trail Making Test (Teil A: Zahlen verbinden; Teil B: abwechselnd Zahlen und Buchstaben) wurde als Indikator für organische Hirnschäden geprüft (Reitan, 1958) und ist ein zugängliches neuropsychologisches Verfahren, das nach Angabe der Autoren über ein breites Spektrum kognitiver Fähigkeiten informiert und in 5–10 min bearbeitet werden kann (Bowie & Harvey, 2006).
- **Was Teil B misst:** In einer Studie mit 41 gesunden Älteren hing Teil A vor allem an visuell-wahrnehmenden Fähigkeiten, Teil B an erster Stelle am Arbeitsgedächtnis und erst an zweiter am Wechsel zwischen Aufgaben; die Differenz B−A war ein relativ „reiner“ Hinweis auf Handlungssteuerung (Sánchez-Cubillo et al., 2009). Teil B unterscheidet sich zudem von A in Motorik und Wahrnehmungskomplexität; das Verhältnis B/A hing mit dem Wechselaufwand in einer reinen Wechselaufgabe zusammen (Arbuthnott & Frank, 2000).
- **Verarbeitungstempo und fluide Fähigkeiten:** In einer Variante („Connections“, über 3.600 Erwachsene) spiegelten die Zeiten vor allem Geschwindigkeit und fluide Fähigkeiten; die Altersunterschiede überlappten fast vollständig damit (Salthouse, 2011).
- **Keine Normen übernehmen:** Zeitnormen gelten für die Papierform und hängen von Alter und Bildung ab (911 Personen, 18–89 J.; Tombaugh, 2004). Selbst eine Tablet-Fassung korreliert nur mäßig bis hoch mit Papier (rs = 0,54 für Teil A, 0,80 für Teil B; Fellows et al., 2017). Für bewegte, überlappende Zeichen gibt es **keine** Normen und keine Validierung. Blickfit nennt **keine** Normwerte.
- **Bewegung und Überlappung:** Dass bewegte, sich überlappende Zeichen die Suche erschweren, ist plausibel (**Annahme**): Überlappung verschärft das Gedränge, das das Erkennen im Blickfeld begrenzt („Crowding“; Pelli & Tillman, 2008; Whitney & Levi, 2011), und Suche in bewegten Anzeigen war weniger effizient als in statischen (Fu et al., 2025; Farb-Pop-out, nicht Trail Making). Eine Studie zu Trail Making mit bewegten Zeichen haben wir **nicht** gefunden (eigene PubMed-Suche 10/2026).
- **Nicht belegt:** dass die Übung Aufmerksamkeit, Exekutivfunktion oder Verarbeitungstempo „misst“, verbessert oder Krankheiten erkennt.

## 4. Optische und okulomotorische Grundlagen

- **Sehanforderung mittel:** Zeichen von etwa 34 px entsprechen am 10,9″-Tablet in 40 cm etwa 0,9° (rund 36 Bildschirmpunkte je Grad). Sie sind dunkelgrau auf hellem Grund gut sichtbar; kritisch wird es erst bei Überlappung (zwei Zeichen übereinander).
- **Crowding und Überlappung:** Objekte werden schlecht erkannt, wenn Nachbarn näher liegen als ein Bruchteil (etwa die Hälfte) des Abstands von der Blickmitte; dieser kritische Abstand wächst proportional zur Exzentrizität (Bouma-Gesetz; Bouma, 1970; Pelli & Tillman, 2008), und dieses „Gedränge“ begrenzt das Such- und Lesetempo. Dass echte Überlappung noch stärker stört als bloße Nachbarschaft, ist plausibel, aber **Annahme** (nicht untersucht). Beim Antippen wird ein Zeichen meist angeblickt, dann ist die Verdeckung wahrscheinlich weniger kritisch als in der Peripherie (nicht untersucht).
- **Blickverhalten:** Suchsprünge zwischen den Zeichen (Sakkaden) und, bei kreisenden Zeichen, kurze Folgebewegungen. Die Bahngeschwindigkeit ist Radius mal Winkelgeschwindigkeit (bei Ellipsen die größere Halbachse): bei Bahnradien von grob 100–500 px und einer Umdrehung in 60 s (Stufe 1) bis 20 s (Stufe 12) etwa 10–160 px/s, das sind grob 0,3–4°/s (Tablet quer, 40 cm; Rechnung mit rund 36 Bildschirmpunkten je Grad). Das ist langsam; die Augen können es voraussichtlich ohne Mühe verfolgen (Einschätzung, nicht untersucht). Bei „Bewegung reduzieren“ entfällt die Bewegung (Zeichen stehen).
- **Sehfeld:** Die Zeichen verteilen sich über die ganze Fläche; Gesichtsfeldausfälle können dazu führen, dass Zeichen im Ausfallbereich nicht gefunden werden (Auswahlhinweis).
- **Blendung:** Der helle Hintergrund ist großflächig; Bildschirmhelligkeit an die Umgebung anpassen (Bedienhinweis, keine Sehaussage).
- **Brillenträger:** Das Spielfeld füllt den Bildschirm; bei Gleitsicht liegen Zeichen auch in den seitlichen, unschärferen Bereichen, und mehr Kopfbewegung ist plausibel (neue Gleitsichtträger zeigten in einer kleinen Studie mehr Kopfbewegungen; Hutchings et al., 2007; nicht für diese Übung untersucht). Arbeitsplatz-/Nahbrille für den Bildschirmabstand ist eine Bedienhilfe, keine Sehaussage.
- **Farbe:** keine Farbunterscheidung nötig; Zeichen sind dunkelgrau auf hellem Grund.

## 5. Neurowissenschaftliche Grundlagen

Für Trail Making liegen vor allem Verhaltensbefunde vor (welche Fähigkeiten die Zeit bestimmen; Sánchez-Cubillo et al., 2009; Salthouse, 2011). Eine belastbare Zuordnung „Teil B trainiert Region X“ lässt sich daraus **nicht** ableiten und wird nicht gemacht. Das gilt erst recht für die bewegte Variante. In den Profilwerten stehen `visuelle_suche` und `kognitive_flexibilitaet` auf 3, `arbeitsgedaechtnis` und `verarbeitungsgeschwindigkeit` auf 2: Man muss die nächste Zielfolge im Kopf halten, zwischen zwei Folgen wechseln und zügig suchen. Das ist eine Gestaltungseinschätzung, kein Messergebnis.

## 6. Motorische Grundlagen

Man tippt kleine, bewegte Ziele nacheinander an: Auge-Hand-Koordination, Zieltempo und Zielgenauigkeit stehen auf 2. Bei Touch kann die Hand das nächste Zeichen verdecken. Die Trefferfläche ist deshalb mindestens 56 px; bei Überlappung wird das **nächste** Ziel bevorzugt (Fairness). Die Reaktionszeit auf Touchgeräten wird zu lang gemessen (Pronk et al., 2020); für den persönlichen Vergleich auf demselben Gerät hebt sich das weitgehend heraus. Ein Fehltipp zählt als Fehler, bringt aber keine Zeitstrafe.

## 7. Einflussfaktoren und Messgrenzen

- **Zufall im Layout:** Startpositionen und Mittelpunkte der Drehungen werden zufällig gewählt, und daraus ergibt sich, wann sich welche Zeichen überlappen; zwei Runden gleicher Stufe sind unterschiedlich schwer. Verlauf über mehrere Runden anzeigen.
- **Übung:** Beim klassischen Trail Making gibt es deutliche Übungseffekte, auch mit Parallelformen (Buck et al., 2008: Anstieg über drei Wochen bei Studierenden; Calamia et al., 2012: Metaanalyse mit rund 1.600 Effekten). Ein Lernen der Aufgabe verändert die Zeit, ohne dass sich etwas anderes verbessert hat.
- **Alter, Bildung, Gerät:** Zeiten steigen mit dem Alter und sinken mit höherer Bildung (Tombaugh, 2004, Papierform); Bildschirmgröße und Abstand verändern die Zeichengröße in Grad. Werte sind nur auf demselben Gerät vergleichbar. Messungen am Menschen streuen stärker als an Prüfkörpern (Mountford et al., 2004, S. 43–44), und eine hohe Korrelation zweier Verfahren heißt nicht, dass sie dieselben Werte liefern (ebd., S. 24); aussagekräftig ist deshalb nur der Verlauf über mehrere Runden.
- **Alphabetkenntnis und Zahlen:** Wer die Alphabetfolge unsicher beherrscht, wird langsamer, ohne dass die Suche schlechter ist.
- **Wechsel ist nicht gleich Wechselkosten:** Ein „Wechselkosten“-Wert aus Zahl → Buchstabe gegen Buchstabe → Zahl ist **kein** üblicher Wechselaufwand; üblich ist der Vergleich Wechsel gegen Wiederholung bzw. B−A bei gleichem Layout (Arbuthnott & Frank, 2000; Sánchez-Cubillo et al., 2009). Ohne Vergleichsrunde nur als Hinweis verwenden.
- **Differenzwerte:** als persönlicher Wert oft wenig zuverlässig (Hedge et al., 2018).
- **Bewegung und Verdeckung:** nicht untersucht; die Stufen für Drehtempo, Versatz und Mindestabstand sind eine Gestaltung, keine kalibrierte Skala.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: mittel (für die Aufgabenart).** Beim klassischen Trail Making werden Probanden mit Wiederholung schneller, auch mit Parallelformen (Buck et al., 2008; Calamia et al., 2012). Für die bewegte, überlappende Variante gibt es keine Studie.
- **Naher Transfer: schwach.** Für Trail Making gibt es kaum Trainingsstudien mit Transfer; die Fachliteratur nutzt es als Messaufgabe, nicht als Übung (Bowie & Harvey, 2006).
- **Alltagstransfer: fehlend.** Ein Nutzen im Alltag (Suche, Fahren, Orientierung) ist nicht belegt.
- **Kurzfassung für Anwender:** „Beim Zahlen-Buchstaben-Wirbel suchst du Zahlen und Buchstaben abwechselnd der Reihe nach, während sie sich langsam um versetzte Mittelpunkte drehen. Das übt geordnetes Suchen und das Wechseln zwischen zwei Folgen. Es ist kein Test und vergleicht dich mit niemandem; deine Zeiten gelten nur für dieses Gerät. Ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine abwechslungsreiche Such- und Wechselübung sucht; geordnetes Suchen und Zahl-Buchstaben-Wechsel geübt werden soll; Touch am Tablet genutzt wird; der eigene Verlauf wichtiger ist als ein Rang.
- **Weniger passend, wenn …** Verarbeitungstempo oder Exekutivfunktionen „gemessen“ werden sollen (kein validiertes Verfahren); Schwindel bei bewegten Mustern besteht; die Alphabetfolge nicht sicher ist; reine Blickfolge oder Reaktion geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: Viele Zeichen, Bewegung und Überlappung können überfordern; mit wenigen Paaren im Modus „stehend“ beginnen.
  - `sehbehinderung_niedriger_visus`, `presbyopie_gleitsicht`: Überlappende Zeichen und seitliche Bereiche; Zeichengröße, Tablet-Abstand und Nahteil beachten.
  - `gesichtsfeldausfall`: Zeichen im Ausfallbereich werden nicht gefunden.
  - `schwindel_vestibulaer`: bewegte Zeichen; „stehend“ wählen, Pausen.
  - `lese_rechtschreib_schwaeche`: Alphabetfolge als Voraussetzung.
  - **Warnzeichen (kein Schlüssel):** Doppelbilder, plötzlicher Sehverlust, Lichtblitze, Kopfschmerz mit nachlassender Sehschärfe, Schwindel oder Zittern gelten in der Lehrbuchliteratur als Anlass zur ärztlichen Abklärung (Muchnick, 2008, S. 6, 28). Dann zuerst abklären lassen und nicht üben; Pause und Rücksprache auch bei Beschwerden während der Übung.
- **Kombiniert gut mit …** 204 (Schulte-Tabelle, statische Zahlenfolge), 708 (Zielkette, ruhende Ziele in Reihenfolge), 106 (bewegte Objekte verfolgen), 202 (Wahlreaktion mit Regelwechsel), 206 (Zwei-Ströme-Symbolsuche).
- Keine Diagnosen, keine Heilversprechen; nicht als „Test“ darstellen; keine Normen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals (soweit aus 3,6 s Video erkennbar):** Die Regel ist nicht sichtbar; es ist unklar, ob und wie die Folge verlangt, bewertet und zeitlich begrenzt wird. Die starke Überlappung (zwei Zeichen übereinander) macht manche Zeichen zeitweise kaum lesbar; ein zufälliges Treffen der Überlappungen ist kein Schwierigkeitsmaß. Falls die Dauer die Auswertung ist (wie beim klassischen Trail Making), wären Normen nur für die Papierform belegt (Tombaugh, 2004). Der helle Hintergrund ist großflächig.

**Blickfit „Zahlen-Buchstaben-Wirbel“ (Stand der Spezifikation; Zahlen grob, Details können sich ändern):**
- **Aufgabe (eigene Festlegung der Folge):** Man tippt abwechselnd aufsteigend 1 – A – 2 – B – 3 – C …; oben steht der Hinweis („Als Nächstes: B“).
- **Bewegung (nach der Beobachtung und den Wünschen des Auftraggebers):** Alle Zeichen drehen mit **derselben Winkelgeschwindigkeit ω**, jedes um einen **eigenen, versetzten Mittelpunkt**. Zeichen *i* startet bei *b*ᵢ (relativ zur Mitte *C* der Spielfläche) und dreht um *c*ᵢ = *C* + *o*ᵢ mit zufälligem Versatz *o*ᵢ = (oxᵢ, oyᵢ): *p*ᵢ(*t*) = *c*ᵢ + *S*ᵢ·Rot(σᵢ·ω·*t*)·*S*ᵢ⁻¹·(*b*ᵢ − *c*ᵢ). Dabei ist σᵢ = +1 (Uhrzeigersinn) oder −1 (Gegenrichtung), und *S*ᵢ = diag(*k*ᵢ, 1) streckt die x-Achse: *k*ᵢ = 1 ergibt einen **Kreis**, *k*ᵢ = Breite : Höhe der Spielfläche eine **Ellipse**, die die Fläche ausfüllt (Halbachsen im Verhältnis der Fläche). Je Zeichen wird zufällig (`ctx.rng`) gewählt, ob Kreis oder Ellipse und ob gleich- oder gegensinnig; der **Anteil** je Stufe ist fest. Bei Versatz 0, nur Kreisen und einer Richtung dreht sich die ganze Anordnung starr um *C* (Karussell, alle Abstände bleiben gleich); mit wachsendem Versatz ändern sich die Abstände immer stärker, und dichtliegende Zeichen mit ähnlichem Versatz bleiben lange übereinander. Die Position hängt nur von der Zeit ab (bildratenunabhängig, für jeden Zeitpunkt exakt berechenbar), alle Bahnen liegen immer ganz in der Spielfläche – kein Abprall, keine Sprünge. Der Mindestabstand wird für jedes Paar über eine volle Umdrehung abgetastet (gilt auch für Ellipsen und gegensinnige Paare); der erste Ellipsenläufer bekommt immer eine große Bahn, damit die Fläche (mindestens etwa 70 % von Breite und Höhe) belegt wird.
- **Getippte Zeichen** bleiben sichtbar, werden aber blass und mit einem kleinen Punkt markiert (kein Verschwinden).
- **Stufen 1–12** (Treppe 2-down/1-up, Ziel ≈ 71 %; Levitt, 1971): Paare 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15 (6 → 30 Zeichen); Ellipsenanteil 30 % (Stufe 1) → 70 % (Stufe 12); Gegenrichtung: Stufe 1–2 keine, Stufe 3 10 % → Stufe 12 50 % der Zeichen; Versatz der Drehmittelpunkte ±3 % (Stufe 1) → ±28 % (Stufe 12) der Spielflächen-Breite (x) bzw. -Höhe (y), getrennt skaliert; eine Umdrehung in 60 s (Stufe 1, sehr langsam) → 20 s (Stufe 12), alle Zeichen gleich schnell; Mindestabstand der Zeichen über die ganze Umdrehung: Stufe 1–5 berühren sie sich nie, ab Stufe 6 darf teilweise überlappt werden (Überlappung ergibt sich aus der Geometrie, nicht aus gekoppelten Paaren); die Spielfläche wird mit der Stufe kleiner. Erfolg einer Runde: höchstens 1 Fehltipp und Zeit je Zeichen unter der Grenze (3,6 s − 0,15 s·Stufe, mindestens 1,8 s, plus 30 ms je Zeichen über 6, also 3,45 s auf Stufe 1 bis 2,52 s auf Stufe 12); sonst leichter.
- **Alphabet je Sprache:** Zahl *n* gehört zum *n*-ten Buchstaben; Deutsch A B C D E F G H I J K L M N O, Italienisch A B C D E F G H I L M N O P Q (italienisches Alphabet ohne J und K, 15 Buchstaben). Die Schrift ist serifenlos und fett; I und 1, O und 0 sind darin gut zu unterscheiden (Zahl 0 kommt nur in „10“ vor).
- **Treffer-Prüfung:** Liegen mehrere Zeichen unter dem Finger, gilt das **nächste Ziel** bevorzugt (Fairness bei Überlappung), sonst das Zeichen mit dem kleinsten Abstand. Fehltipp = Kreuz ohne Zeitstrafe, zählt aber.
- **Darstellung:** Schrift mindestens 34 px, Trefferfläche mindestens 56 px, Hintergrund hell, Zeichen dunkelgrau (Kontrast mindestens 4,5 : 1); Hochformat: Spielfläche folgt der Bühne, die Bahnen bleiben in der Fläche; `reducedMotion` → stehend; auf Stufe 12 (30 Zeichen) darf es dicht werden, aber kein Zeichen wird zu mehr als etwa der Hälfte verdeckt (Mindestabstand 0,45 der Zeichengröße).
- **Zusatzwerte nur im Vergleich mit sich selbst:** Ø Sekunden je Zeichen (im Vergleich zu früher auf diesem Gerät), Fehltipps, Paare der letzten gelösten Runde, „Mehrzeit für Buchstaben“ (Median Zeit zum Buchstaben minus Median Zeit zur Zahl, erst ab je 5 Werten; ausdrücklich keine Wechselkosten, siehe Abschnitt 7). **Keine Normen**, keine Altersvergleiche.
- **Abgrenzung** zur Zahlenjagd (statisch, einfache Folge): eigene Übung mit Bewegung und Wechsel; gemeinsame Helfer werden wiederverwendet.

**Empfehlungen:**
- **Keinen Anspruch auf Validität:** Trail Making mit Bewegung ist kein validierter Test; im Text nur „angelehnt an die bekannte Aufgabe Trail Making“.
- **Vergleichsrunde:** Wer einen Wechselaufwand zeigen will, braucht eine Runde ohne Wechsel (nur Zahlen) im selben Layout (B−A; Sánchez-Cubillo et al., 2009).
- **Überlappung dosieren:** Mindestlesbarkeit der Zeichen bei Überlappung festlegen (umgesetzt: Mindestabstand je Stufe, über die ganze Umdrehung geprüft; höchstens etwa 55 % Überdeckung auf Stufe 12); Überlappungsgrad protokollieren.
- **Ruhemodus:** „stehend“ als wählbare Option (nicht nur bei `reducedMotion`) für Schwindelneigung; Stufe 1–2 drehen mit einer Umdrehung in knapp einer Minute sehr langsam und alle gleich herum; Gegenrichtung und Ellipsen erhöhen den Bewegungsreiz (Profilwert `bewegungsreize_schwindel` 2).
- **Texte:** „… ist nicht belegt“ bei Wirkaussagen; keine Normen, keine Rangliste.

## 11. Quellen

### Von der Website angegeben
- Keine Online-Quelle; Aufbau und Stufen beruhen auf der unten genannten Fachliteratur. **stützt:** keine Aussage

### Weitere Fachliteratur
- Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. *Perceptual and Motor Skills*, *8*(3), 271–276. https://doi.org/10.2466/pms.1958.8.3.271 – Ausgangsarbeit zum Trail Making Test (**Prüfung:** Crossref ✓; Abstract nicht vorhanden, Inhalt über Titel und Übersichten).
- Bowie, C. R., & Harvey, P. D. (2006). Administration and interpretation of the Trail Making Test. *Nature Protocols*, *1*(5), 2277–2281. https://doi.org/10.1038/nprot.2006.390 – Aufbau, Durchführung, Auswertung (**Prüfung:** Crossref ✓; Abstract gelesen, PubMed).
- Sánchez-Cubillo, I., Periáñez, J. A., Adrover-Roig, D., Rodríguez-Sánchez, J. M., Ríos-Lago, M., Tirapu, J., & Barceló, F. (2009). Construct validity of the Trail Making Test: Role of task-switching, working memory, inhibition/interference control, and visuomotor abilities. *Journal of the International Neuropsychological Society*, *15*(3), 438–450. https://doi.org/10.1017/S1355617709090626 – Teil A visuell, Teil B Arbeitsgedächtnis und Wechsel (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Arbuthnott, K., & Frank, J. (2000). Trail Making Test, Part B as a measure of executive control: Validation using a set-switching paradigm. *Journal of Clinical and Experimental Neuropsychology*, *22*(4), 518–528. https://doi.org/10.1076/1380-3395(200008)22:4;1-0;FT518 – B/A-Verhältnis und Wechselaufwand (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Salthouse, T. A. (2011). What cognitive abilities are involved in trail-making performance? *Intelligence*, *39*(4), 222–232. https://doi.org/10.1016/j.intell.2011.03.001 – Geschwindigkeit und fluide Fähigkeiten, über 3.600 Erwachsene (**Prüfung:** Crossref ✓; Abstract gelesen, PubMed).
- Fellows, R. P., Dahmen, J., Cook, D., & Schmitter-Edgecombe, M. (2017). Multicomponent analysis of a digital Trail Making Test. *The Clinical Neuropsychologist*, *31*(1), 154–167. https://doi.org/10.1080/13854046.2016.1238510 – Tablet-Fassung, r = 0,54/0,80 mit Papier (**Prüfung:** Crossref ✓; Abstract gelesen).
- Tombaugh, T. N. (2004). Trail Making Test A and B: Normative data stratified by age and education. *Archives of Clinical Neuropsychology*, *19*(2), 203–214. https://doi.org/10.1016/S0887-6177(03)00039-8 – Normen hängen von Alter und Bildung ab, 911 Personen (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Buck, K. K., Atkinson, T. M., & Ryan, J. P. (2008). Evidence of practice effects in variants of the Trail Making Test during serial assessment. *Journal of Clinical and Experimental Neuropsychology*, *30*(3), 312–318. https://doi.org/10.1080/13803390701390483 – Übungseffekte (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, *26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Übungseffekte, rund 1.600 Effekte (**Prüfung:** Crossref ✓; Abstract gelesen, OpenAlex).
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature*, *226*(5241), 177–178. https://doi.org/10.1038/226177a0 – kritischer Abstand ≈ halbe Exzentrizität (**Prüfung:** Crossref ✓; Inhalt als Standardwissen, über Pelli & Tillman, 2008).
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience*, *11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Bouma-Gesetz, begrenzt Lese- und Suchtempo (**Prüfung:** Crossref ✓; Abstract gelesen).
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences*, *15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005 – Definition und Reichweite des Crowding (**Prüfung:** Crossref ✓; Abstract gelesen).
- Fu, M., Asabere, E., & Dodd, M. D. (2025). Attentional processing in a modified multiple object-tracking paradigm. *Attention, Perception, & Psychophysics*, *88*(1), 7. https://doi.org/10.3758/s13414-025-03195-3 – Suche in bewegten Anzeigen braucht fokale Aufmerksamkeit, weniger effizient als statisch (**Prüfung:** Crossref ✓; Abstract gelesen; Farb-Pop-out, nicht Trail Making).
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, *50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Differenzwerte als persönlicher Wert unzuverlässig (**Prüfung:** Crossref ✓; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch überschätzt Reaktionszeiten (**Prüfung:** Crossref ✓; Abstract gelesen).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, *49*(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenverfahren (2-down/1-up ≈ 71 %) (**Prüfung:** Crossref ✓; wie in 901 verwendet).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, Kopfbewegung (**Prüfung:** Crossref ✓; Abstract gelesen, Literaturbasis W02).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, die ärztliche Abklärung verlangen (S. 6, 28).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messungen am Menschen streuen; Korrelation ist keine Übereinstimmung (S. 24, 43–44).
