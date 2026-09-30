---
# ===== Kennung =====
nr: 607
kennung: path-tracing
name: "Leuchtpfad nachtippen (Corsi-artige Sequenz)"
name_original: "Corsi-Block-Test online – Sequenzgedächtnis (Path Tracing Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "spatial-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In einem Raster leuchtet ein Feld nach dem anderen auf und bildet einen zusammenhängenden Weg. Danach tippt man die Felder in derselben Reihenfolge nach; jeder fehlerfreie Weg ist einen Schritt länger, das Raster wächst von 3×3 bis (theoretisch) 7×7."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Nur aufwärts (Code): Start mit 3 Schritten; jeder fehlerfreie Weg +1 Schritt. Raster nach Weglänge: 3–5 → 3×3, 6–8 → 4×4, 9–12 → 5×5, 13–16 → 6×6, ab 17 → 7×7. Fehler oder 10 s ohne Abschluss → neuer Zufallsweg gleicher Länge, kein Abstieg. Takt fest 500 ms je Schritt. Die 60-s-Uhr läuft nur während der Eingabe (real ≈ 1,5–2 min)."
messgroessen: ["Punkte (150 je fehlerfreiem Weg; längster gelöster Weg = Punkte/150 + 2)", "Level (= Weglänge − 2)", "Trefferquote = fehlerfreie / alle Versuche", "sinnvoll: längste fehlerfrei wiedergegebene Folge (Spanne) über mehrere Versuche je Länge", "sinnvoll: Position des ersten Fehlers im Weg"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 1
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
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["eine Folge einzeln aufleuchtender Felder im Takt von 0,5 s verfolgen können (Raster ≈ 8–11° bei 40 cm am Tablet)", "Touch oder Maus; kein Lesen, keine Farbunterscheidung, keine Sprache nötig", "Einzel-Tipps auf Felder von ≈ 10–25 mm (Tablet, bis 5×5)"]
vorsicht_bei: [gesichtsfeldausfall, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, tremor_parkinson, photosensitive_epilepsie, migraene_lichtempfindlich]
geeignet_fuer: ["kurzes, sprachfreies Üben, eine Reihenfolge von Orten zu behalten (DE/IT gleich)", "Gruppierstrategien ausprobieren: Weg als Form oder Richtungsfolge merken ('zwei rechts, eins hoch')", "sitzende, ruhige Übung am Tablet mit Touch", "Selbstvergleich über Wochen auf demselben Gerät"]
weniger_geeignet_fuer: ["Einstufung des räumlichen Gedächtnisses oder Vergleich mit Corsi-Normen (anderes Material, keine Normen, kein Test im diagnostischen Sinn)", "statische Muster (→ 603) oder Objekt-Ort-Bindung (→ 605)", "Menschen, die ohne Rückstufung schnell frustriert sind (Stufe sinkt nie)", "Blickmotorik-, Reaktions- oder Tempotraining", "Smartphone quer (Raster ≈ 2 cm, Felder zu klein)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "Geübte Gedächtnisaufgaben verbessern sich regelmäßig (Owen et al. 2010); Übertragung zeigt sich vor allem auf strukturgleiche Aufgaben, beim visuell-räumlichen seriellen Erinnern eher als beim verbalen (Gathercole et al. 2019); ferner oder Alltagstransfer ist mit aktiven Kontrollgruppen nicht belegt (Melby-Lervåg et al. 2016). Für diese Pfad-Variante selbst gibt es keine Trainingsstudie."
aehnliche_uebungen: [601, 603, 605, 811, 602, 707, 604]
stichworte: ["Corsi-Block-Tapping", "Pfadgedächtnis", "räumliche Spanne", "serielles räumliches Erinnern", "Reihenfolgegedächtnis", "Inner Scribe", "visuell-räumliches Kurzzeitgedächtnis", "Chunking", "Pfadstruktur", "Touch", "sprachfrei"]
---

# 607 · Leuchtpfad nachtippen (Corsi-artige Sequenz)

> Original: „Corsi-Block-Test online – Sequenzgedächtnis“ („Path Tracing Pro“) – skilldrills.online, Kapitel Gedächtnis
> (`memory`, Unterkapitel `spatial-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf einem dunklen Raster leuchten nacheinander einzelne Felder bernsteinfarben auf, jedes direkt neben dem vorigen – ein
Weg wie eine Schlange. Danach tippt man die Felder in derselben Reihenfolge nach. Ein fehlerfreier Weg bringt beim nächsten
Mal einen Schritt mehr, ab 6 und 9 Schritten ein größeres Raster. Ein Fehler kostet nichts; es folgt ein neuer Weg gleicher Länge.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `7993-…js`, Stand 29.09.2026); nur Mechanik beschrieben.

- **Weg (Code):** Startfeld zufällig, dann je Schritt ein zufälliges **waagrecht oder senkrecht benachbartes, unbesuchtes**
  Feld – keine Diagonalen, Sprünge oder Kreuzungen; bei einer Sackgasse endet der Weg (selten) früher. **Kein
  Corsi-Material:** Dort liegen die Blöcke unregelmäßig, und die Folge springt beliebig.
- **Stufen (Code):** Weglänge = Level + 2 (Start 3), ohne Obergrenze. Raster 3×3 (3–5 Schritte), 4×4 (6–8), 5×5 (9–12),
  6×6 (13–16), 7×7 (ab 17). **Kein Abstieg**; nach Fehler neuer Zufallsweg gleicher Länge („Runde wird wiederholt“).
- **Darbietung (Code):** Schritt *k* leuchtet ab 500·(k−1) ms für **350 ms** (2 Hz, Tick-Ton); im Feld steht die
  **Schrittnummer**. Bei der Eingabe zeigen Punkte die Weglänge; getippte Felder bleiben farbig und nummeriert.
- **Eingabe und Wertung (Code):** Touch oder Maus, Auslösung beim Aufsetzen (`pointerdown`), kein Rückgängig. Fehler =
  erstes falsches Feld oder **10 s ohne Abschluss**; dann 1 s Rückmeldung (Feld rot, richtiger Weg mit Nummern), nach Erfolg
  0,6 s. +150 Punkte je fehlerfreiem Weg, gleich welcher Länge. Trefferquote = fehlerfreie / alle Versuche; Note
  100 × √(Punkte/1.000), S+ ab 903 Punkten (7 Erfolge); Rekord nur im `localStorage`.
- **Zeit (Code):** Die **60-s-Uhr läuft nur während der Eingabe** (`performance.now()`, bildfrequenzunabhängig); mit
  Darbietung und Pausen dauert eine Runde ≈ 1,5–2 min. Tippzeiten werden nicht erfasst.
- **Erreichbar (Herleitung):** Längster gelöster Weg = Punkte/150 + 2. Für 6×6 wären Wege von 3 bis 12 Schritten fehlerfrei
  nötig (75 Tipps), für 7×7 bis 16 (133 Tipps) – bei angenommenen 0,4–0,5 s je Tipp über 60 s. **7×7 ist praktisch unerreichbar.**
- **Widersprüche:** „45-Sekunden-Fenster“ vs. 60-s-Uhr; „keine Strafpunkte“ stimmt, aber jeder Fehler löst ein **rotes
  Aufblitzen der Spielfläche (480 ms)** aus (Standard an, abschaltbar wie die Töne); „Abruf unter 400 ms“ wird nicht gemessen.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung ein „neuropsychologisches Assessment“ im Corsi-Paradigma (Milner, 1971; Corsi, 1972) mit
Logies (1995) „Inner Scribe“. Sie empfiehlt Richtungs-Chunking („senkt die Last um mehr als 60 %“), Nachziehen mit den
Fingern, Zentralfixation und rhythmisches Tippen – für MOBA-Gamer, MINT-Studierende, Tänzer:innen. Eine Tabelle nennt
„1.200+ Punkte, 10–14+ Schritte auf 6×6–7×7 = Top 1 %“ und einen Median von „5,4 ± 0,9“ (Kessels et al., 2000).

- **Belegt:** Sequenzielles räumliches Behalten und statische Muster sind trennbar (Della Sala et al., 1999; Klauer & Zhao,
  2004). Artikulatorische Unterdrückung stört Corsi vorwärts nicht, räumliche Zusatzaufgaben schon (Vandierendonck et al.,
  2004). Die **Struktur** einer Folge bestimmt die Leistung stark: Kreuzungen, Weglänge, Winkel (Parmentier et al., 2005),
  Cluster (De Lillo et al., 2016), komplizierte Pfade (Busch et al., 2005) – Richtungs-Chunking ist daher sinnvoll.
- **Überzogen:** „−60 %“ ohne Quelle; Chunking entlastet zwar, aber abhängig von Chunkgröße und Position in der Folge, nicht um eine feste Größe (Thalmann et al., 2019). Cowan (2001)
  zählt Chunks, nicht Felder („Spur zerfällt nach 4–5 Schritten“ folgt nicht). Handbewegungen stören die räumliche Spanne
  weniger als Augenbewegungen (Pearson & Sahraie, 2003); ein Nutzen des Finger-Nachziehens ist nicht gezeigt.
- **Nicht belegt / falsch:** Die Tabelle hat keine Datengrundlage (die Seite sammelt keine Daten) und widerspricht dem Code:
  1.200 Punkte = zuletzt 10 Schritte auf **5×5**. Corsi-Normen sind **nicht übertragbar**: Kreuzungsfreie Nachbarschritte
  mit Nummern sind vermutlich deutlich leichter (Herleitung aus Parmentier et al., 2005; Busch et al., 2005), und Corsi-Versionen
  sind untereinander kaum vergleichbar (Berch et al., 1998). 5,4 ± 0,9 steht nicht im Abstract von Kessels et al. (2000);
  DOI und Zeitschrift sind falsch. Ein einheitlicher Standardtakt von 500 ms ist nicht belegt (Durchführung uneinheitlich;
  Berch et al., 1998); Woods et al. (2015) betrifft nur die einfache Reaktionszeit. Nutzen für Gaming, Tanz oder Wegfindung ist nicht belegt (Abschnitt 8).

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße (Herleitung; Raster = min(70 vw, 35 vh), Vollbild):** 10,9″-Tablet bei 40 cm **quer**: Raster ≈ 55 mm ≈ 7,9°,
  Feld 3×3 ≈ 17 mm (2,4°), 5×5 ≈ 10 mm (1,4°), 7×7 ≈ 7 mm (1,0°); **hochkant** ≈ 79 mm ≈ 11,3°. Smartphone hochkant (33 cm):
  ≈ 45 mm, 5×5-Feld ≈ 8,5 mm; quer nur ≈ 23 mm. Helle Felder auf fast Schwarz: **Sehschärfe und Kontrast begrenzen nicht**;
  die kleinen Schrittnummern sind redundant (die Reihenfolge ergibt sich aus der Zeit).
- **Blick:** Bei Fixation der Mitte liegen alle Felder innerhalb ≈ ±4–6°. Benachbarte Schritte (≤ 2,4°) wirken wie ein
  wandernder Lichtpunkt (`bewegungswahrnehmung` 1). 500 ms reichen für eine Sakkade je Schritt (Latenz ≥ 150–175 ms; Rayner,
  1998), doch Augenbewegungen beim Behalten stören räumliches und Reihenfolgegedächtnis (Postle et al., 2006; Pearson &
  Sahraie, 2003). „Mitte fixieren“ ist plausibel, hier aber ungeprüft; beim Abruf kann der Blick zum Ort helfen
  (Johansson & Johansson, 2014).
- **Brille:** Kleines, zentrales Raster – seitliche Gleitsicht-Unschärfe (Sheedy, 2004) spielt kaum eine Rolle. Etwa ab
  40–45 Jahren Nahkorrektur für 30–40 cm (Alterssichtigkeit; Charman, 2008); Tablet tief genug halten, um ohne Nackenbeugung durch den Nahteil zu
  sehen. Am Monitor ist eine Arbeitsplatzbrille günstiger; das Raster ist dort 35 % der Fensterhöhe (Herleitung: 13″-Laptop bei 50 cm ≈ 6°, 24″-Monitor bei 60 cm ≈ 9°) – kleines Fenster vermeiden.
- **Farbe, Licht, Auge:** Keine Farbunterscheidung nötig (Helligkeit; Fehler zusätzlich per Ton und Aufblitzen). 2 Hz auf
  kleiner Fläche liegt unter 3 Blitzen/s (WCAG 2.2, SC 2.3.1); das rote Fehler-Aufblitzen (480 ms, ganze Spielfläche) kann Lichtempfindliche stören (gesättigtes Rot
  als Zusatzfaktor; Fisher et al., 2005) – vorsorglich abschalten. Am Bildschirm sinkt die Lidschlagrate (Sheppard & Wolffsohn, 2018).

## 5. Neurowissenschaftliche Grundlagen

- **Modell:** Logie (1995) trennt passiven „Visual Cache“ und aktiven räumlich-sequenziellen „Inner Scribe“. Längere
  Corsi-Folgen beanspruchen zusätzlich die zentrale Exekutive (Vandierendonck et al., 2004; `arbeitsgedaechtnis` 1).
- **Aufmerksamkeit als Rehearsal:** Räumliches Behalten nutzt Mechanismen der räumlichen Aufmerksamkeit bis in frühe
  visuelle Areale (Awh & Jonides, 2001) – passend dazu stören Augenbewegungen.
- **Hirnregionen:** Niedrige Corsi-Spanne hing bei Patient:innen mit Läsionen im mittleren okzipitalen Gyrus beidseits, im
  **rechten hinteren Parietalkortex** und rechten parieto-temporalen Faserbahnen zusammen (Chechlacz et al., 2014). Dass die
  Übung Regionen „trainiert“ oder einen Speicher „erweitert“, ist nicht belegt.

## 6. Motorische Grundlagen

- Einzel-Tipps in vorgegebener Reihenfolge auf benachbarte Felder; am Tablet bis 5×5 ≥ 10 mm, über den ≈ 9,2 mm für
  Daumenziele (Parhi et al., 2006). Smartphone (5×5 ≈ 8,5 mm) und Tablet quer ab 6×6 (≈ 7–8 mm) liegen darunter.
- `pointerdown` ohne Rückgängig: Ein versehentliches Aufsetzen (Handballen, Tremor) beendet den Versuch. Da die Uhr nur
  beim Tippen läuft, bringt zügiges Tippen mehr Versuche (`zielbewegung_tempo` 1).
- Touch- und klassischer Corsi-Test ergaben übereinstimmende Ergebnisse (je 45 Patient:innen mit Psychose und Gesunde; Siddi et al., 2020). Tippzeiten würden am
  Touchscreen systematisch zu lang gemessen (+58–70 ms; Pronk et al., 2020).

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Zufallswege:** geschätzt 8–15 Versuche je Runde (Herleitung), jeder Weg anders geformt; schon beim Corsi
  schwankt die Leistung innerhalb einer Stufe mit der Pfadform (Busch et al., 2005). Ein Versuch je Länge,
  Alles-oder-nichts und kein Abstieg machen Punkte und Level zu einem groben, eher optimistischen Maß.
- **Alter:** Corsi-Spanne steigt bis in die frühe Jugend (8. Klasse M = 6,9, junge Erwachsene 7,1; Farrell Pagulayan et
  al., 2006) und sinkt im Erwachsenenalter mit dem Alter; mehr Bildung geht mit höherer Corsi-Spanne vorwärts einher (n = 362, 20–90 Jahre; Monaco et al., 2013). Visuelles AG gipfelt
  um ≈ 20 Jahre (Brockmole & Logie, 2013). Keine Alters- oder Normvergleiche anzeigen.
- **Zustand und Gerät:** Schlafmangel beeinträchtigt AG und KZG (Lim & Dinges, 2010). Raster je nach Ausrichtung ±40 %,
  Übungseffekte bei Wiederholung (Calamia et al., 2012) – nur Selbstvergleich auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Im Online-Training wurde jede geübte Aufgabe besser (N = 11.430; Owen et al., 2010). Strategien
  wirken hier vermutlich besonders, weil nach dem ersten Schritt jeder weitere höchstens 3 Möglichkeiten hat (Herleitung, ungeprüft).
- **Naher Transfer – mittel:** Übertragung vor allem auf strukturgleiche Aufgaben, beim visuell-räumlichen seriellen
  Erinnern stärker als beim verbalen (Gathercole et al., 2019); visuell-räumliche Gewinne hielten eventuell länger
  (Melby-Lervåg & Hulme, 2013). Für diese Pfad-Variante selbst fehlt eine Studie.
- **Alltagstransfer – fehlend:** Kein ferner Transfer gegenüber behandelten Kontrollgruppen (Melby-Lervåg et al., 2016);
  kaum Belege für Alltagseffekte von „Brain Training“ (Simons et al., 2016). Wegfindung oder Spielleistung nicht untersucht.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand ruhig und sprachfrei (DE/IT gleich) eine räumliche Reihenfolge behalten oder Gruppierstrategien
  üben möchte; am Tablet mit Touch; ohne großflächige Bewegung, Lichtreize gering (rotes Fehler-Aufblitzen abschaltbar); als leichter Einstieg vor Corsi-artigen Folgen.
- **Weniger passend, wenn …** statische Muster (→ 603), Objekt-Ort-Bindung (→ 605) oder Blickmotorik geübt werden sollen;
  eine „Gedächtnis-Einstufung“ erwartet wird (keine Normen, keine Diagnose); Smartphone quer.
- **Vorsicht / anpassen bei …** `gesichtsfeldausfall` (zentrale/parazentrale Ausfälle treffen das kleine Raster);
  `aufmerksamkeitsprobleme` (verpasster 0,5-s-Schritt = verlorener Versuch; räumliches AG bei ADHS deutlich schwächer,
  Effektstärke 0,85; Martinussen et al., 2005); `kognitive_einschraenkung`, `kinder_unter_6` (kein Abstieg, festes Tempo);
  `tremor_parkinson` (Auslösen beim Aufsetzen, kleine Felder); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (Felder blinken im 2-Hz-Takt, rotes Aufblitzen der Spielfläche bei Fehlern – abschalten).
  Alterssichtigkeit und Farbsehschwäche sind wenig kritisch.
- **Kombiniert gut mit …** 603 (statisches Gegenstück), 601 (Senso), 602 (verbale Folge), 605 (Objekt-Ort), 811 (Linienzug
  nachziehen), 707 (Pfad mit dem Zeiger folgen).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Ehrlicher Name („Leuchtpfad“), kein „Test/Assessment“, keine Tier-, Perzentil- oder Corsi-Norm-Angaben.
- Treppe mit Abstieg (z. B. 2 Versuche je Länge oder 2 fehlerfreie Wege in Folge → +1 Schritt, 1 Fehler → −1 Schritt, konvergiert auf ≈ 71 % Erfolg; Levitt, 1971); Runde nach Versuchen statt Uhr;
  Messgröße = längste fehlerfreie Folge.
- Modi „Pfad“ (Nachbarschritte) und „Sprung“ (freie Orte wie Corsi); Nummern optional; Takt wählbar (0,5 / 0,75 / 1 s).
- Raster unabhängig von der Ausrichtung (≈ 10–12° bei 40 cm), Felder ≥ 10 mm; Auslösen beim Loslassen.
- Rückmeldung ohne Aufblitzen und ohne reine Farbcodierung (✓/✗, Umriss); Rastergrenzen mit Kontrast ≥ 3:1 (WCAG 2.2).

## 11. Quellen

### Von der Website angegeben

- Corsi, P. M. (1972). *Human memory and the medial temporal region of the brain* [Dissertation, McGill University]. –
  **Prüfung:** Hochschulschrift, keine DOI, nicht eingesehen; **stützt:** ja (Ursprung des Paradigmas).
- Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. *British Medical
  Bulletin*, 27(3), 272–277. https://doi.org/10.1093/oxfordjournals.bmb.a070866 – **Prüfung:** DOI stimmt ✓; **stützt:**
  teilweise („5–7 Schritte“ hängt von Version ab; Berch et al., 1998; junge Erwachsene 7,1, Farrell Pagulayan et al., 2006).
- Logie, R. H. (1995). *Visuo-spatial working memory*. Lawrence Erlbaum. – **Prüfung:** Buch, keine DOI (Neuauflage 2014,
  https://doi.org/10.4324/9781315804743 ✓); **stützt:** ja (Theorie; getrennter räumlicher Faktor bei Kessels et al., 2008).
- Cowan, N. (2001). The magical number 4 in short-term memory. *Behavioral and Brain Sciences*, 24(1), 87–114.
  https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 Chunks, nicht Felder).
- Baddeley, A. (2000). The episodic buffer: A new component of working memory? *Trends in Cognitive Sciences*, 4(11),
  417–423. https://doi.org/10.1016/S1364-6613(00)01538-2 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (nicht Inner Scribe).
- Miller, G. A. (1956). The magical number seven, plus or minus two. *Psychological Review*, 63(2), 81–97.
  https://doi.org/10.1037/h0043158 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Chunk-Konzept), „−60 % Last“ nein.
- Simon, H. A. (1974). How big is a chunk? *Science*, 183(4124), 482–488. https://doi.org/10.1126/science.183.4124.482 –
  **Prüfung:** DOI stimmt ✓; **stützt:** ja (Chunking; Simon schätzte 5–7 Chunks, nicht 4).
- Kessels, R. P. C., van Zandvoort, M. J. E., Postma, A., Kappelle, L. J., & de Haan, E. H. F. (2000). The Corsi
  Block-Tapping Task: Standardization and normative data. *Applied Neuropsychology*, 7(4), 252–258. – **Prüfung:** **DOI und
  Zeitschrift falsch** (Website-DOI bei Crossref nicht auffindbar); richtig https://doi.org/10.1207/S15324826AN0704_8 ✓;
  **stützt:** unsicher/nein (Abstract: n = 70 Gesunde, 70 Patient:innen, Perzentile und Grenzwerte; 5,4 ± 0,9 und „computerisiert“ stehen nicht darin; Volltext nicht eingesehen).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓; **stützt:** kaum (einfache Reaktionszeit; nennt Hardware-Verzögerungen nur allgemein, nicht den 500-ms-Takt; Tippzeiten misst das Spiel ohnehin nicht).

### Weitere Fachliteratur

- Awh, E., & Jonides, J. (2001). Overlapping mechanisms of attention and spatial working memory. *Trends in Cognitive
  Sciences*, 5(3), 119–126. https://doi.org/10.1016/S1364-6613(00)01593-X – Aufmerksamkeit als Rehearsal (PM).
- Busch, R. M., Farrell, K., Lisdahl-Medina, K., & Krikorian, R. (2005). Corsi Block-Tapping task performance as a function
  of path configuration. *Journal of Clinical and Experimental Neuropsychology*, 27(1), 127–134.
  https://doi.org/10.1080/138033990513681 – Pfadform, n = 94 (PM).
- Chechlacz, M., Rotshtein, P., & Humphreys, G. W. (2014). Neuronal substrates of Corsi Block span. *Neuropsychologia*, 64,
  240–251. https://doi.org/10.1016/j.neuropsychologia.2014.09.038 – Läsionskartierung (PM).
- De Lillo, C., Kirby, M., & Poole, D. (2016). Spatio-temporal structure, path characteristics, and perceptual grouping in
  immediate serial spatial recall. *Frontiers in Psychology*, 7, 1686. https://doi.org/10.3389/fpsyg.2016.01686 – (PM).
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills.
  *Journal of Memory and Language*, 105, 19–42. https://doi.org/10.1016/j.jml.2018.10.003
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of
  intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534.
  https://doi.org/10.1177/1745691616635612
- Parmentier, F. B. R., Elford, G., & Maybery, M. (2005). Transitional information in spatial serial memory: Path
  characteristics affect recall performance. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 31(3),
  412–427. https://doi.org/10.1037/0278-7393.31.3.412 – (PM).
- Vandierendonck, A., Kemps, E., Fastame, M. C., & Szmalec, A. (2004). Working memory components of the Corsi blocks task.
  *British Journal of Psychology*, 95(1), 57–79. https://doi.org/10.1348/000712604322779460
- Aus der geprüften Literaturbasis (DOI per Crossref): Berch et al. (1998), 10.1006/brcg.1998.1039 · Farrell Pagulayan et
  al. (2006), 10.1080/13803390500350977 · Monaco et al. (2013), 10.1007/s10072-012-1130-x · Owen et al. (2010),
  10.1038/nature09042 · Pearson & Sahraie (2003), 10.1080/02724980343000044 · Siddi et al. (2020),
  10.1186/s12888-020-02716-8 · Brockmole & Logie (2013), 10.3389/fpsyg.2013.00012 · Calamia et al. (2012),
  10.1080/13854046.2012.680913 · Charman (2008), 10.1111/j.1444-0938.2008.00256.x · Della Sala et al. (1999),
  10.1016/S0028-3932(98)00159-6 · Fisher et al. (2005), 10.1111/j.1528-1167.2005.31405.x · Johansson & Johansson (2014),
  10.1177/0956797613498260 · Kessels et al. (2008), 10.1177/1073191108315611 · Klauer & Zhao (2004),
  10.1037/0096-3445.133.3.355 · Levitt (1971), 10.1121/1.1912375 · Lim & Dinges (2010), 10.1037/a0018883 · Martinussen et
  al. (2005), 10.1097/01.chi.0000153228.72591.73 · Melby-Lervåg & Hulme (2013), 10.1037/a0028228 · Parhi et al. (2006),
  10.1145/1152215.1152260 · Postle et al. (2006), 10.1080/17470210500151410 · Pronk et al. (2020),
  10.3758/s13428-019-01321-2 · Rayner (1998), 10.1037/0033-2909.124.3.372 · Sheedy (2004), 10.1016/S1529-1839(04)70021-4 ·
  Sheppard & Wolffsohn (2018), 10.1136/bmjophth-2018-000146 · Simons et al. (2016), 10.1177/1529100616661983 · Thalmann et
  al. (2019), 10.1037/xlm0000578 · W3C (2024), WCAG 2.2, https://www.w3.org/TR/WCAG22/
