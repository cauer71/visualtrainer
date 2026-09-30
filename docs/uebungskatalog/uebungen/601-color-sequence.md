---
# ===== Kennung =====
nr: 601
kennung: color-sequence
name: "Farbfolge merken (Senso)"
name_original: "Senso-Spiel online – Farbenfolge merken und exakt wiederholen (Color Sequence Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "short-term-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence"
blickfit_umsetzung: {kennung: "leuchtfolge", name: "Leuchtfolge", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/leuchtfolge/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein großer Kreis in der Bildmitte leuchtet nacheinander in verschiedenen Farben auf. Danach tippt man die Farbfolge auf sechs Farbfeldern in derselben Reihenfolge nach; nach jedem Erfolg wird die Folge um eine Farbe länger, nach einem Fehler um eine kürzer."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich, kurzzeitgedaechtnis_verbal]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "1-up/1-down-Treppe (Code): Folgenlänge = Stufe + 2 (Start 3 Farben). Richtig → Stufe +1, Fehler oder 8 s ohne Tipp → Stufe −1 (Minimum 1). Mit der Stufe werden Anzeige (750 − 35 × Stufe ms, min. 250 ms) und Pause (300 − 15 × Stufe ms, min. 150 ms) kürzer. Jede Runde ist eine neue Zufallsfolge aus 6 Farben."
messgroessen: ["Original: Punkte (100 × (1 + 0,1 × Stufe) je fehlerfreie Folge), erreichte Stufe, Anteil fehlerfreier Runden, Note F–S+", "sinnvoll: längste fehlerfrei wiedergegebene Folge (Spanne) über mehrere Durchgänge je Länge", "sinnvoll: Fehlerposition in der Folge (Anfang/Mitte/Ende) und Fehlerart (Farbverwechslung vs. Reihenfolge)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 3
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 3
    kurzzeitgedaechtnis_visuell_raeumlich: 3
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
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
voraussetzungen: ["sicheres Unterscheiden von sechs Farben (Rot, Orange, Gelb, Grün, Blau, Lila) – die Farbe ist beim Einprägen die einzige Information", "Folgen von mindestens 3 Elementen kurz behalten können (kürzeste Folge = 3)", "Tippen oder Klicken auf große Felder (Tablet ≈ 26 mm, Smartphone ≈ 17 mm)"]
vorsicht_bei: [farbsehschwaeche, kognitive_einschraenkung, kinder_unter_6, aufmerksamkeitsprobleme, migraene_lichtempfindlich, photosensitive_epilepsie, tremor_parkinson]
geeignet_fuer: ["kurzes Behalten und geordnetes Wiedergeben von Reihenfolgen üben (serielles Erinnern)", "Merkstrategien ausprobieren: Farben innerlich benennen, in Zweier-/Dreiergruppen bündeln", "Gedächtnisübung ohne Lesen, ohne Zahlen und ohne feine Details", "Tablet mit Touch, auch bei Alterssichtigkeit ohne Nahkorrektur (große Reize)"]
weniger_geeignet_fuer: ["Menschen mit Farbsehschwäche (Blau/Lila bei Deuteranopie praktisch gleich, Rot/Orange erschwert)", "Personen, für die schon 3 Elemente zu viel sind (keine leichtere Stufe)", "Ziele im Bereich Blickmotorik, Reaktion oder Handgenauigkeit", "Fortschrittsmessung über Wochen (45 s ergeben nur ≈ 5–8 Runden, sehr unzuverlässig)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Geübte Aufgaben werden verlässlich besser, auch durch Strategien (Owen et al., 2010; Gathercole et al., 2019). Übertragung zeigt sich fast nur auf Aufgaben mit gleicher Struktur; ferner Transfer und Alltagsnutzen sind mit aktiven Kontrollgruppen nicht belegt (Melby-Lervåg et al., 2016). Zu dieser konkreten Senso-Variante gibt es keine Studien."
aehnliche_uebungen: [607, 602, 603, 605, 606, 604, 811]
stichworte: ["Senso", "Simon", "Farbfolge", "serielles Erinnern", "Merkspanne", "Kurzzeitgedächtnis", "Chunking", "Farbsehschwäche", "Treppenverfahren", "1-up/1-down"]
---

# 601 · Farbfolge merken (Senso)

> Original: „Senso-Spiel online – Farbenfolge merken und exakt wiederholen“ (Spielname „Color Sequence Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory/short-term-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Nach einem Countdown leuchtet ein großer Kreis in der Bildmitte nacheinander in verschiedenen Farben auf. Ist die Folge vorbei, erscheinen sechs Farbfelder (drei oben, drei unten), und man tippt die Farben in derselben Reihenfolge an. Stimmt alles, kommt eine neue, um eine Farbe längere Folge; nach einem Fehler wird sie um eine Farbe kürzer. Die Runde dauert 45 Sekunden. Anders als beim klassischen Senso wird die Folge **nicht fortgesetzt**: Jede Runde ist eine völlig neue Zufallsfolge.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `23629-…js`, Tonmodul in `71254-…js`, Stand 29.09.2026). Ausgewertet wurde nur die Mechanik, kein Code übernommen.

- **Ablauf (Code):** Start → Countdown 3-2-1-GO (≈ 2,5 s, nicht in den 45 s enthalten) → Runden bis Zeitende. Die Uhr läuft **durchgehend**, auch während die Folge gezeigt wird und während „Evaluating…“. Das Spiel endet mitten in der Runde, wenn die Zeit abläuft. Ergebnisbildschirm: Punkte, Stufe, Trefferquote, Note.
- **Reiz (Code):** Ein Kreis von 144 CSS-px (schmale Bildschirme) bzw. 192 CSS-px (ab 640 px Breite) auf fast schwarzem Grund (#080811). Farben (Tailwind): Rot #ef4444, Blau #3b82f6, Grün #10b981, Gelb #facc15, Lila #a855f7, Orange #f97316. Der Farbwechsel ist mit 200 ms weich überblendet. Die Farben werden **nur an einem Ort** gezeigt; der Ort trägt also keine Information.
- **Folge und Takt (Code):** Länge = Stufe + 2. Jede Farbe wird zufällig gezogen, Wiederholungen sind möglich (≈ 2,6 bit pro Element). Anzeige 715 ms / Pause 285 ms auf Stufe 1 (1,0 Farben/s), Stufe 5: 575/225 ms, Stufe 10: 400/150 ms (1,8/s), ab Stufe 15: 250/150 ms (2,5/s). Eine Folge dauert so 3,0 s (Stufe 1) bis ≈ 6,6 s (Stufe 10).
- **Eingabe (Code):** Sechs quadratische Felder in fester Anordnung (Rot, Blau, Grün / Gelb, Lila, Orange) mit kleinem **englischem** Schriftzug („Red“, „Blue“ …; auch auf der deutschen Seite). Ausgelöst wird beim Berühren (`pointerdown`), also Maus und Touch gleichermaßen; keine Tastatur. Oben zeigen kleine Punkte (12–14 px) den Fortschritt, nach der Runde grün/rot für richtig/falsch.
- **Wertung (Code):** Fehlerfreie Folge: +round(100 × (1 + 0,1 × Stufe)) Punkte, Stufe +1, neue Folge nach 400 ms. Falscher Tipp: sofort Abbruch, Stufe −1, roter Bildschirmschimmer (450 ms, abschaltbar), neue Folge nach 500 ms. 8 s ohne Tipp (nach der Anzeige bzw. seit dem letzten Tipp) zählen als Fehler, dann neue Folge nach 1 s. „Trefferquote“ = Anteil fehlerfreier Runden. Note: √(Punkte/1300) × 100 % (A ab 731, S ab 939, S+ ab 1 173 Punkten). Gespeichert wird nur lokal (Bestwert, beste Stufe, Zahl der Sitzungen).
- **Töne (Code):** Beim Aufleuchten erklingt **für jede Farbe derselbe** kurze 600-Hz-Ton, beim richtigen Tipp ein einheitlicher Treffer-Ton. Es gibt keine farbspezifischen Tonhöhen.

**Was in 45 s erreichbar ist (eigene Berechnung aus den Code-Parametern).** Bei fehlerfreiem Spiel und 0,2–0,4 s pro Tipp (gemittelt, einschließlich des ersten Tipps nach der Anzeige) schafft man **6 Runden** (Folgen mit 3 bis 8 Farben). Das ergibt Stufe 7 und 810 Punkte; bei 0,6 s pro Tipp sind es 5 Runden bzw. 650 Punkte. Nur bei durchgehend extrem schnellem Tippen (im Mittel unter ≈ 0,19 s pro Tipp) passt rechnerisch eine 7. Runde hinein: **absolutes Maximum 980 Punkte, Stufe 8**. Jeder Fehler kostet zusätzlich Zeit.

**Widersprüche Regeltext ↔ Code.**
- „Die ersten Farben der Kette wiederholen sich in jeder Runde“ (Tipp 4) und „Sequenz wird wiederholt“ (Regel 3): falsch, jede Runde ist eine neue Zufallsfolge.
- „Jede Farbe erzeugt einen charakteristischen Synthesizer-Ton“: falsch, der Ton ist für alle Farben gleich.
- „Kein Zeitabzug bei Fehlern“: formal richtig, aber die Uhr läuft während der Anzeige weiter, jede Fehlrunde kostet 3–7 s.
- „Erfasst die motorische Reaktionslatenz pro Eingabe“: Der Code misst keine Tippzeiten, `performance.now()` dient nur der Spieluhr.
- „Blicke auf den zentralen Farbring“, „Felder zu einer geometrischen Linie verbinden“: Es gibt keinen Ring und keine aufleuchtenden Felder, nur einen Kreis in der Mitte. Eine räumliche Linie entsteht nur, wenn man die Farben in Gedanken den festen Feldpositionen zuordnet.
- FAQ „Stufe 7–8 = Sequenzlänge 7–8 Farben“: Stufe 7 bedeutet 9 Farben.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** Das visuelle Arbeitsgedächtnis fasse „nur etwa vier Einheiten“ (Luck & Vogel, 1997; Cowan, 2001); jenseits von vier Elementen breche die Merkspanne „rapide ein“. Die Übung fordere den visuell-räumlichen Notizblock (Baddeley & Hitch, 1974; Logie, 1995). Duale Kodierung „verdopple die Pufferkapazität“, Chunking „halbiere die kognitive Belastung“, es werde „synaptische Plastizität im präfrontalen Kortex“ beansprucht. Die Übung helfe „ja“ gegen Alltagsvergesslichkeit (Telefonnummern, Codes). Die Messung sei ein „verlässlicher Benchmark für die Integrität des Arbeitsgedächtnisses“ (Woods et al., 2015), die Touch-Bedienung „latenzfrei“. Zielgruppen: Schüler:innen, Studierende, E-Sportler:innen, Senior:innen, Gedächtnissportler:innen. Eine Tabelle ordnet Stufen und Punkte Kategorien von „Einsteiger“ bis „Großmeister/Elite-Gedächtnis“ zu (Level 11+, > 1 500 Punkte).

**Einordnung.**
- **Kapazitätsgrenze:** Die ≈ 4 Einheiten gelten für *gleichzeitig* gezeigte Farbfelder (Luck & Vogel, 1997) bzw. wenn Benennen, Wiederholen und Langzeitwissen blockiert sind (Cowan, 2001; 2010). Hier kommen die Farben nacheinander, und sie lassen sich leicht benennen. Die Aufgabe dürfte deshalb eher einer Wortspanne ähneln (Herleitung); ein „rapider Einbruch ab 5“ ist für sie nicht belegt. Chunking entlastet, aber nicht um feste Anteile: Der Nutzen hängt von der Chunkgröße ab, setzt bekannte Einheiten aus dem Langzeitgedächtnis voraus (bei Zufallsfolgen selten), und Chunks am Listenende entlasten die übrigen Elemente nicht (Thalmann et al., 2019).
- **„Verdoppeln“, „halbieren“, „präfrontale Plastizität“:** ohne Beleg. Hörbare Farbnamen können eine Folge besser behaltbar machen (Redundanzgewinn bei normalhörenden Kindern; Cleary et al., 2001). Im Original fehlt dieser Kanal, weil alle Farben gleich klingen.
- **Alltag:** Online-Hirntraining verbessert die geübten Aufgaben, überträgt sich aber nicht auf ungeübte (Owen et al., 2010). Metaanalysen finden mit aktiven Kontrollgruppen keinen fernen Transfer (Melby-Lervåg et al., 2016). Die FAQ-Antwort „Ja, hilft gegen Alltagsvergesslichkeit“ ist **nicht belegt**.
- **Leistungsstufen ohne Grundlage:** Die Seite sammelt nach eigener Angabe keine Nutzerdaten, und keine der Quellen enthält Normen für dieses Spiel. Nach den Code-Parametern sind Tier 1 (> 1 500 P) und die Punktspanne von Tier 2 (1 100–1 499 P) in 45 s **rechnerisch unerreichbar** (realistisch ≈ 810 P / Stufe 7, absolutes Maximum 980 P / Stufe 8; Abschnitt 2), ebenso die Note S+ (ab 1 173 P). Die Note S (ab 939 P) und Stufe 8 sind nur mit einer fehlerfreien 7. Runde bei unter ≈ 0,19 s pro Tipp möglich, also praktisch kaum. Die Seite widerspricht sich zudem selbst: „Durchschnitt“ ist laut Tabelle Stufe 5–7, laut FAQ Stufe 7–8; „Elite“ laut FAQ ab Stufe 10, laut Tabelle ab 11.
- **„Latenzfrei“:** Touch-Web-Apps messen Zeiten um ≈ 58–70 ms zu lang (Pronk et al., 2020). Für diese Übung ist das nebensächlich, weil sie keine Reaktionszeit wertet.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße (Herleitung):** Am 10,9″-Tablet (≈ 0,19 mm pro CSS-px) misst der Kreis ≈ 37 mm, bei 40 cm Abstand also ≈ 5,3° Sehwinkel. Am Smartphone sind es ≈ 24 mm, bei 33 cm ≈ 4,1°. Die Tippfelder messen ≈ 26 bzw. 17 mm. Sehschärfe und Kontrast begrenzen die Leistung praktisch nie; auch unscharf (Alterssichtigkeit ohne Nahkorrektur, Gleitsichtglas nicht im Nahteil) bleibt eine Farbfläche dieser Größe erkennbar. Nur die 12-px-Schriftzüge auf den Feldern brauchen Schärfe, sind aber nicht nötig.
- **Blick:** Beim Einprägen fixiert man den Kreis, beim Wiedergeben springt der Blick zu den Feldern (kleine Sakkaden, visuelle Suche unter 6 Feldern). Die Felder liegen in der unteren Bildhälfte, Gleitsichtträger:innen sehen sie meist bequem durch den Nahteil; seitliche Unschärfe spielt bei dieser Feldbreite kaum eine Rolle.
- **Farbsehen – der entscheidende Punkt:** Rot-Grün-Farbsehschwäche betrifft ≈ 8 % der Männer und ≈ 0,4 % der Frauen in Europa (Birch, 2012). Eine Simulation der Palette nach Machado et al. (2009, volle Ausprägung) mit CIEDE2000-Farbabständen ergibt (eigene Rechnung):
  - normales Farbsehen: kleinste Abstände Rot/Orange ΔE ≈ 20 und Blau/Lila ≈ 23, also gut unterscheidbar;
  - Deuteranopie (Grünblindheit): **Blau/Lila ΔE ≈ 0,9**, praktisch gleich; Rot/Orange ≈ 9, Gelb/Orange ≈ 13;
  - Protanopie (Rotblindheit): Blau/Lila ≈ 5, Rot/Orange ≈ 16;
  - Tritanopie (selten): Rot/Orange ≈ 7.

  Die Simulation gilt für die volle Ausprägung (Dichromasie). Die meisten Betroffenen sind anomale Trichromat:innen mit milderer Einschränkung; für sie liegen die Abstände dazwischen (Herleitung).

  Weil die Farbe beim Einprägen die **einzige** Information ist, entscheiden solche Verwechslungen über die Leistung. Die Übung erfüllt damit WCAG 2.2, SC 1.4.1 nicht (Farbe nicht als einziges Unterscheidungsmerkmal). Mit dem Alter nimmt die Farbunterscheidung ab etwa 60 Jahren beschleunigt ab, vor allem auf der Blau-Gelb-Achse (Paramei & Oakley, 2014). Ältere Menschen können deshalb auch ohne angeborene Schwäche bei Blau/Lila oder Gelb/Orange unsicher sein (Vermutung, für diese Palette nicht untersucht).
- **Lichtreize:** Farbwechsel mit 1,0–1,4 pro Sekunde (in 45 s erreichbare Stufen), kleine Fläche (≈ 5°), weich überblendet; bei Fehlern ein einzelner roter Schimmer über den Bildschirm (abschaltbar). Das liegt unter der WCAG-Grenze von 3 Blitzen/s. Am stärksten provozierend sind 15–25 Hz; gesättigtes Rot ist ein Zusatzfaktor (Fisher et al., 2005). Das Risiko ist gering; kräftige, gesättigte Farben auf Schwarz (Gelb ≈ 13 : 1 Kontrast) können Lichtempfindliche aber stören.
- **Zeitliche Auflösung:** Folgen zwei gleiche Farben aufeinander, markiert nur die Pause (285 ms auf Stufe 1, 195 ms auf Stufe 7) die Wiederholung. Bei 200 ms Überblendung wird der Kreis in höheren Stufen kaum noch ganz dunkel, sodass Wiederholungen leichter übersehen werden (Herleitung aus dem Code).

## 5. Neurowissenschaftliche Grundlagen

- **Modell:** Im Mehrkomponentenmodell (Baddeley & Hitch, 1974; Baddeley, 2000) werden Farben visuell eingeprägt. Weil sie benennbar sind, übersetzen Erwachsene sie meist zusätzlich in Wörter („rot – blau – grün“), die phonologisch gespeichert und innerlich wiederholt werden. Bei Farbfolgen dürften also **beide Speicher** mitwirken; welcher überwiegt, hängt von der Strategie ab (Herleitung; für diese Aufgabe nicht direkt untersucht). Im Profil stehen deshalb `kurzzeitgedaechtnis_visuell_raeumlich` und `kurzzeitgedaechtnis_verbal` beide auf 3. Der visuelle Anteil ist hier reines Farbgedächtnis: Anders als bei 607 (Leuchtpfad) und 603 (Rastermuster) tragen die Orte beim Einprägen keine Information.
- **Visueller Anteil:** Die Aktivität im hinteren Parietalkortex (Todd & Marois, 2004) und die EEG-Kennwerte des visuellen Arbeitsgedächtnisses (Vogel & Machizawa, 2004) steigen bis zur persönlichen Kapazitätsgrenze. Das gilt für gleichzeitig gezeigte Farbfelder. Bei *sequenzieller* Darbietung werden Merkmale schlechter gebunden, vor allem die frühen Elemente (Allen et al., 2006).
- **Verbaler Anteil:** Phonologischer Speicher (linker Gyrus supramarginalis) und inneres Wiederholen (Broca-Areal) lassen sich auch bei visuell gezeigtem Material nachweisen (Paulesu et al., 1993).
- **Reihenfolge und Lernen:** Wiederholte oder regelhafte Folgen werden mit der Zeit gelernt (Hebb-Effekt, auch räumlich: Couture & Tremblay, 2006; regelhafte Farbknopf-Folgen: Karpicke & Pisoni, 2004). Im Original ist jede Folge neu und zufällig. Die Übung prüft deshalb eher die momentane Spanne als Sequenzlernen – im Unterschied zum klassischen Senso, dessen Kette wächst.
- Die Website-Aussage „synaptische Plastizität im präfrontalen Kortex“ ist nicht belegt. Eine Aussage „trainiert Region X“ lässt sich aus keiner dieser Studien ableiten.

## 6. Motorische Grundlagen

Motorisch ist die Übung anspruchslos: Man tippt 3–9 Felder nacheinander an, mit einem Finger oder der Maus, ohne Tempo- oder Genauigkeitsvorgabe (bis 8 s pro Tipp). Die Felder sind am Tablet ≈ 26 mm groß, am Smartphone ≈ 17 mm, also deutlich über üblichen Mindestgrößen. Tremor oder eingeschränkte Feinmotorik stören kaum, weil man jedes Feld in Ruhe antippen kann. Allerdings zählt jede Berührung sofort (`pointerdown`): Streift man versehentlich ein falsches Feld, bricht die Runde ab. Schnelles Tippen bringt nur mehr Runden in 45 s, keine Zusatzpunkte.

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Runden:** 45 s ergeben ≈ 5–8 Runden. Eine 1-up/1-down-Treppe schwankt um die Länge mit ≈ 50 % Erfolg (Levitt, 1971), braucht dafür aber viele Umkehrpunkte. Die „Stufe“ nach 45 s spiegelt daher vor allem Tippzeit und Zufall wider. Kurze Messungen des Arbeitsgedächtnisses sind wenig zuverlässig (vgl. Xu et al., 2018: sehr hohe Zuverlässigkeit, α > 0,9, mit 540 Durchgängen einer anderen Aufgabe, der Änderungserkennung; bei weniger Durchgängen entsprechend geringer).
- **Tempo verfälscht die Spanne:** Wer langsamer tippt, kommt bei gleicher Gedächtnisleistung auf weniger Stufen und Punkte. Eine Gedächtnismessung sollte nicht durch Zeit begrenzt werden.
- **Farbsehen, Alter, Müdigkeit:** Farbsehschwäche (Abschnitt 4) senkt die Punktzahl, ohne dass das Gedächtnis schlechter ist. Das visuelle Arbeitsgedächtnis ist mit ≈ 20 Jahren am besten und nimmt dann stetig ab (Brockmole & Logie, 2013). Bei jüngeren Kindern sind die Speicher deutlich kleiner; sie wachsen ab 4 Jahren bis in die Jugend etwa linear (Gathercole et al., 2004). Ob 3 Farben für Vorschulkinder schon zu viel sind, ist für diese Aufgabe nicht untersucht.
- **Sprache:** Benennen ist die naheliegende Strategie. Deutsche Farbnamen sind kurz (Rot, Blau, Grün, Gelb: 1 Silbe), italienische länger (rosso, verde, giallo, viola, arancione: 2–4 Silben). Nach dem Wortlängeneffekt ist mit italienischen Namen eine etwas kleinere Spanne zu *erwarten* (Herleitung, nicht untersucht). Die englischen Feldbeschriftungen sind nicht nötig, können aber verwirren.
- **Gerät:** Bildfrequenz und Touch-Latenz spielen keine Rolle, weil keine Zeiten gewertet werden. Die Anzeigedauern laufen über Timer und werden auf das Bildraster gerundet (60 Hz: ≈ 17 ms).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: stark.** Geübte Gedächtnisaufgaben werden zuverlässig besser (Owen et al., 2010). Nach Gathercole et al. (2019) beruht das zu einem wesentlichen Teil auf neu erlernten Vorgehensweisen (Routinen) für die Aufgabe; dass es hier konkret Benennen und Gruppieren sind, ist eine Vermutung.
- **Naher Transfer: schwach.** Übertragung zeigt sich vor allem auf Aufgaben mit gleicher Struktur, z. B. andere Folgen-Wiedergabe-Aufgaben. Für visuell-räumliches serielles Erinnern ist sie etwas größer als für verbales (Gathercole et al., 2019). Diese Übung zeigt aber keine Orte, und die Farben werden meist benannt; sie ähnelt deshalb eher dem verbalen seriellen Erinnern (Herleitung). Daher „schwach“ statt „mittel“ wie beim räumlichen Gegenstück 607. Für Senso-Varianten selbst gibt es keine Trainingsstudien.
- **Alltagstransfer: fehlend.** Mit aktiven Kontrollgruppen gibt es keinen Nachweis für Verbesserungen bei Intelligenz, Lesen, Rechnen oder im Alltag (Melby-Lervåg et al., 2016; Owen et al., 2010). Aussagen wie „gegen Vergesslichkeit“ oder „für Telefonnummern“ sind unzulässig.
- **Seriöse Formulierung:** „Du übst, dir kurze Farbfolgen zu merken. Mit etwas Übung wirst du in dieser Aufgabe besser; ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine kurze, leicht verständliche Merkübung ohne Lesen und Zahlen sucht; Reihenfolgen behalten oder Merkstrategien (Benennen, Gruppieren) ausprobiert werden sollen; ein Tablet mit Touch genutzt wird; Sehschärfe oder Nahsicht eingeschränkt sind (große Reize).
- **Weniger passend, wenn …** Blickmotorik, Reaktion oder Handgenauigkeit geübt werden sollen; ein verlässlicher Verlaufswert gewünscht ist; schon 3 Elemente überfordern.
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Blau/Lila ist bei ausgeprägter Grünschwäche praktisch nicht unterscheidbar, Rot/Orange erschwert; beim Einprägen gibt es kein anderes Merkmal. Eher 607 (Orte statt Farben) wählen.
  - `kognitive_einschraenkung`, `kinder_unter_6`: Die kürzeste Folge hat 3 Elemente, die Uhr läuft; das kann frustrieren.
  - `aufmerksamkeitsprobleme`: Ein kurzes Abschweifen während der Anzeige kostet die ganze Runde; Kinder mit ADHS zeigen im Mittel Nachteile im räumlichen Arbeitsgedächtnis (Martinussen et al., 2005). Kein Therapie- oder Testanspruch.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: kräftige Farbwechsel des Kreises (≈ 1–1,4/s) auf Schwarz und bei jedem Fehler ein roter Schimmer über der Spielfläche (0,45 s, Schalter „Miss Flash“, standardmäßig an). Die WCAG-Grenze von 3 Blitzen/s wird nicht erreicht. Beide Schlüssel stehen vorsorglich hier, so wie bei allen Übungen des Kapitels mit demselben Fehler-Schimmer (602–607). Den Schimmer vorher abschalten.
  - `tremor_parkinson`: Die Felder sind groß (≈ 26 mm am Tablet), aber jede Berührung zählt schon beim Aufsetzen (`pointerdown`). Eine versehentliche Berührung bricht die ganze Folge ab, wie bei 603, 605 und 607. Das Risiko ist hier wegen der großen Felder geringer.
- **Kombiniert gut mit …** 607 (Corsi-Pfad, räumliche Folge), 602 (Zahlenspanne, verbale Folge), 603 (statische Muster), 811 (Muster merken).
- **Abgrenzung in der Gruppe (keine Dublette):** Am nächsten verwandt ist 607. Beide zeigen eine Folge, die man in derselben Reihenfolge nachtippt. Bei 607 ist die Information aber der **Ort** (farbfrei, auch bei Farbsehschwäche), bei 601 allein die **Farbe** an einem festen Punkt. 602 hat denselben Ablauf mit Ziffern, die als ganze Zeile gleichzeitig erscheinen. Das klassische Senso mit aufleuchtenden, fest angeordneten Feldern wäre eine Mischung aus 601 und 607.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Farbe nicht allein:** Jede Farbe zusätzlich mit Form oder Symbol (●, ▲, ■ …) und fester Position zeigen, oder die Felder selbst aufleuchten lassen wie beim klassischen Senso. Palette auf Farbsehschwäche prüfen (Blau/Lila vermeiden).
- **Gedächtnis statt Tempo messen:** Uhr nur während der Eingabe laufen lassen, oder feste Zahl von Runden statt 45 s. Spanne als längste sicher wiedergegebene Länge angeben (mehrere Versuche je Länge).
- **Leichterer Einstieg:** Start mit 2 Elementen, wählbar 4 statt 6 Farben, langsameres Tempo für Ältere.
- **Wahlweise Kettenmodus:** Die Folge wie beim klassischen Senso fortsetzen (übt Sequenzlernen) und klar vom Zufallsmodus unterscheiden.
- **Sprache und Ton:** Farbnamen auf DE/IT beschriften, optional gesprochen oder mit eigener Tonhöhe je Farbe. Rückmeldung nicht nur rot/grün, sondern auch mit ✓/✗.
- **Versehentliche Berührungen:** Tipp erst beim Loslassen werten, kurze Sperre nach dem Tipp.
- **Keine Normtabellen, keine Elite-Stufen,** nur Selbstvergleich auf demselben Gerät; keine Gesundheitsversprechen.

## 11. Quellen

### Von der Website angegeben
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, 24(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (≈ 4 Chunks nur, wenn Strategien blockiert sind; kein „rapider Einbruch ab 5“ bei wiederholbaren, benennbaren Folgen).
- Luck, S. J., & Vogel, E. K. (1997). The capacity of visual working memory for features and conjunctions. *Nature*, 390(6657), 279–281. https://doi.org/10.1038/36846 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 Objekte bei gleichzeitiger Darbietung; für zeitliche Folgen nicht untersucht).
- Baddeley, A. D., & Hitch, G. (1974). Working memory. *Psychology of Learning and Motivation*, 8, 47–89. https://doi.org/10.1016/S0079-7421(08)60452-1 – **Prüfung:** DOI stimmt ✓ (Crossref ohne Bandangabe); **stützt:** ja (Modellebene).
- Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review*, 63(2), 81–97. https://doi.org/10.1037/h0043158 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (7 ± 2 und Umkodieren ja; die „4-Elemente-Grenze“ stammt nicht von Miller).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (nur einfache Reaktionszeit; nichts zu Gedächtnis, Timerrundung oder „Benchmark des Arbeitsgedächtnisses“; das Spiel misst zudem keine Tippzeiten).
- Nur im Fließtext: Baddeley (2000; https://doi.org/10.1016/S1364-6613(00)01538-2, CR ✓) belegt den episodischen Puffer, nicht eine „Verdopplung“ der Kapazität; Logie (1995), *Visuo-spatial working memory*, Erlbaum (Buch, keine DOI; Neuauflage https://doi.org/10.4324/9781315804743) – Theorie Visual Cache/Inner Scribe, ja als Modell; Baer & Morrison (1978) – Produktgeschichte, nicht geprüft.

### Weitere Fachliteratur
- Allen, R. J., Baddeley, A. D., & Hitch, G. J. (2006). Is the binding of visual features in working memory resource-demanding? *Journal of Experimental Psychology: General*, 135(2), 298–313. https://doi.org/10.1037/0096-3445.135.2.298 – schwächere Bindung bei sequenzieller Darbietung
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology*, 4, 12. https://doi.org/10.3389/fpsyg.2013.00012 – Altersverlauf
- Cleary, M., Pisoni, D. B., & Geers, A. E. (2001). Some measures of verbal and spatial working memory in eight- and nine-year-old hearing-impaired children with cochlear implants. *Ear and Hearing*, 22(5), 395–411. https://doi.org/10.1097/00003446-200110000-00004 – Senso-artige Farbknopf-Folgen; Redundanzgewinn durch gesprochene Farbnamen
- Couture, M., & Tremblay, S. (2006). Exploring the characteristics of the visuospatial Hebb repetition effect. *Memory & Cognition*, 34(8), 1720–1729. https://doi.org/10.3758/BF03195933 – Lernen wiederholter Folgen
- Cowan, N. (2010). The magical mystery four: How is working memory capacity limited, and why? *Current Directions in Psychological Science*, 19(1), 51–57. https://doi.org/10.1177/0963721409359277 – Kapazität 3–5 Einheiten
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills. *Journal of Memory and Language*, 105, 19–42. https://doi.org/10.1016/j.jml.2018.10.003 – Transfer nur bei gleicher Aufgabenstruktur
- Gathercole, S. E., Pickering, S. J., Ambridge, B., & Wearing, H. (2004). The structure of working memory from 4 to 15 years of age. *Developmental Psychology*, 40(2), 177–190. https://doi.org/10.1037/0012-1649.40.2.177 – Entwicklung bei Kindern
- Karpicke, J. D., & Pisoni, D. B. (2004). Using immediate memory span to measure implicit learning. *Memory & Cognition*, 32(6), 956–964. https://doi.org/10.3758/BF03196873 – Spanne für regelhafte Knopffolgen steigt durch implizites Lernen
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – 1-up/1-down-Treppe konvergiert auf 50 %
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics*, 15(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Simulationsmodell für die Palettenprüfung
- Martinussen, R., Hayden, J., Hogg-Johnson, S., & Tannock, R. (2005). A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder. *Journal of the American Academy of Child & Adolescent Psychiatry*, 44(4), 377–384. https://doi.org/10.1097/01.chi.0000153228.72591.73 – Vorsichtshinweis ADHS
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612 – kein ferner Transfer
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042 – Übungseffekt ohne Transfer
- Paramei, G. V., & Oakley, B. (2014). Variation of color discrimination across the life span. *Journal of the Optical Society of America A*, 31(4), A375–A384. https://doi.org/10.1364/JOSAA.31.00A375 – Farbunterscheidung im Alter
- Paulesu, E., Frith, C. D., & Frackowiak, R. S. J. (1993). The neural correlates of the verbal component of working memory. *Nature*, 362(6418), 342–345. https://doi.org/10.1038/362342a0 – phonologische Schleife
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz („latenzfrei“ widerlegt)
- Thalmann, M., Souza, A. S., & Oberauer, K. (2019). How does chunking help working memory? *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 45(1), 37–55. https://doi.org/10.1037/xlm0000578 – Grenzen des Chunkings
- Todd, J. J., & Marois, R. (2004). Capacity limit of visual short-term memory in human posterior parietal cortex. *Nature*, 428(6984), 751–754. https://doi.org/10.1038/nature02466 – Parietalkortex und Kapazität
- Vogel, E. K., & Machizawa, M. G. (2004). Neural activity predicts individual differences in visual working memory capacity. *Nature*, 428(6984), 748–751. https://doi.org/10.1038/nature02447 – EEG-Kennwert (CDA) und Kapazität
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1 Use of Color, SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
- Xu, Z., Adam, K. C. S., Fang, X., & Vogel, E. K. (2018). The reliability and stability of visual working memory capacity. *Behavior Research Methods*, 50(2), 576–588. https://doi.org/10.3758/s13428-017-0886-6 – Zuverlässigkeit braucht viele Durchgänge
