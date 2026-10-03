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
blickfit_umsetzung: {kennung: "leuchtpfad", name: "Leuchtpfad", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/leuchtpfad/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Neun Blöcke an festen, unregelmäßigen Orten leuchten nacheinander weich auf. Danach tippt man sie in derselben Reihenfolge nach; jede gelungene Folge ist einen Block länger, nach einem Fehler wird sie kürzer, der zweite Fehler beendet die Runde."
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
geeignet_fuer: ["kurzes, sprachfreies Üben, eine Reihenfolge von Orten zu behalten (DE/IT gleich)", "Gruppierstrategien ausprobieren: die Folge als Form oder Richtungsfolge merken ('zwei rechts, eins hoch')", "sitzende, ruhige Übung am Tablet mit Touch", "Selbstvergleich über Wochen auf demselben Gerät"]
weniger_geeignet_fuer: ["Einstufung des räumlichen Gedächtnisses oder Vergleich mit Corsi-Normen (anderes Material, keine Normen, kein Test im diagnostischen Sinn)", "statische Muster (→ 603) oder Objekt-Ort-Bindung (→ 605)", "Menschen, die nach Fehlern schnell frustriert sind (der zweite Fehler beendet die Runde)", "Blickmotorik-, Reaktions- oder Tempotraining", "sehr kleine Bildschirme (die Blöcke werden dann klein)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "Geübte Gedächtnisaufgaben verbessern sich regelmäßig (Owen et al. 2010); Übertragung zeigt sich vor allem auf strukturgleiche Aufgaben, beim visuell-räumlichen seriellen Erinnern eher als beim verbalen (Gathercole et al. 2019); ferner oder Alltagstransfer ist mit aktiven Kontrollgruppen nicht belegt (Melby-Lervåg et al. 2016). Für diese Variante selbst gibt es keine Trainingsstudie."
aehnliche_uebungen: [601, 603, 811, 605, 602, 604, 606]
stichworte: ["Corsi-Block-Tapping", "Pfadgedächtnis", "räumliche Spanne", "serielles räumliches Erinnern", "Reihenfolgegedächtnis", "Inner Scribe", "visuell-räumliches Kurzzeitgedächtnis", "Chunking", "Pfadstruktur", "Touch", "sprachfrei"]
---

# 607 · Leuchtpfad nachtippen (Corsi-artige Sequenz)

> Original: „Corsi-Block-Test online – Sequenzgedächtnis“ („Path Tracing Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory`, Unterkapitel `spatial-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Neun Blöcke liegen an festen, unregelmäßig verteilten Orten in einem quadratischen Feld. Nacheinander leuchten einzelne Blöcke weich auf, jeder etwa 0,8 Sekunden, danach 0,25 Sekunden Pause. Die Folge springt frei zwischen den Blöcken, jeder Block kommt höchstens einmal vor. Danach tippt man die Blöcke in derselben Reihenfolge an; für das Tippen gibt es kein Zeitlimit. Gelingt die Folge, wird die nächste um einen Block länger, nach einem Fehler um einen kürzer; der zweite Fehler beendet die Runde. Ab einer Länge von fünf Blöcken wird eine freiwillige Bonusrunde „rückwärts“ angeboten, in der man die Folge von hinten nach vorn tippt.

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

- **Reizgröße:** Die Blöcke sind große, helle Flächen auf dunklem Grund; die Abstände zwischen ihnen betragen mindestens etwa 30 % der Feldkante, die Trefferflächen (Radius mindestens 26 Pixel) überlappen nie. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. **Sehschärfe und Kontrast begrenzen nicht.** Leuchtende Blöcke unterscheiden sich in Helligkeit, dickem Rand und einem hellen Punkt in der Mitte, nicht nur in der Farbe.
- **Blick:** Bei Fixation der Feldmitte liegen alle Blöcke in der näheren Peripherie. Etwa eine Sekunde je Schritt reicht für eine Sakkade (Latenz mindestens 150–175 ms; Rayner, 1998), doch Augenbewegungen beim Behalten stören räumliches und Reihenfolgegedächtnis (Postle et al., 2006; Pearson & Sahraie, 2003). „Mitte fixieren“ ist als Strategie plausibel, hier aber ungeprüft; beim Abruf kann der Blick zum Ort helfen (Johansson & Johansson, 2014).
- **Brille:** Das Feld liegt zentral – die seitliche Gleitsicht-Unschärfe (Sheedy, 2004) spielt kaum eine Rolle. Etwa ab 40–45 Jahren ist eine Nahkorrektur für 30–40 cm nötig (Alterssichtigkeit; Charman, 2008); das Tablet tief genug halten, um ohne Nackenbeugung durch den Nahteil zu sehen. Am Monitor ist eine Arbeitsplatzbrille günstiger; ein kleines Fenster vermeiden.
- **Farbe, Licht, Auge:** Keine Farbunterscheidung nötig. Die Blöcke blenden weich auf und ab, höchstens etwa einmal pro Sekunde, ohne Blitzen und ohne rotes Aufleuchten bei Fehlern; das liegt unter 3 Blitzen pro Sekunde (WCAG 2.2, SC 2.3.1). Gesättigtes Rot gilt als Zusatzfaktor für Lichtempfindliche (Fisher et al., 2005) und kommt hier nicht vor. Am Bildschirm sinkt die Lidschlagrate (Sheppard & Wolffsohn, 2018).

## 5. Neurowissenschaftliche Grundlagen

- **Modell:** Logie (1995) trennt den passiven „Visual Cache“ und den aktiven räumlich-sequenziellen „Inner Scribe“. Längere Blockfolgen beanspruchen zusätzlich die zentrale Exekutive (Vandierendonck et al., 2004; `arbeitsgedaechtnis` 1). Dass die Folge frei zwischen den Blöcken springt, hält die Aufgabe nahe am Corsi-Paradigma (Milner, 1971; Berch et al., 1998).
- **Struktur der Folge:** Die Form der Folge bestimmt die Leistung stark: Kreuzungen, Weglänge und Winkel (Parmentier et al., 2005), Cluster (De Lillo et al., 2016), komplizierte Pfade (Busch et al., 2005). Richtungs- und Gruppen-Strategien („links oben, dann zwei nach rechts“) sind daher sinnvoll; sie entlasten abhängig von Chunkgröße und Position in der Folge, nicht um eine feste Größe (Thalmann et al., 2019). Gezählt werden Chunks, nicht Blöcke (Cowan, 2001).
- **Statisch vs. sequenziell:** Sequenzielles räumliches Behalten und statische Muster sind trennbar (Della Sala et al., 1999; Klauer & Zhao, 2004). Artikulatorische Unterdrückung stört das Vorwärts-Nachtippen nicht, räumliche Zusatzaufgaben schon (Vandierendonck et al., 2004).
- **Aufmerksamkeit als Rehearsal:** Räumliches Behalten nutzt Mechanismen der räumlichen Aufmerksamkeit bis in frühe visuelle Areale (Awh & Jonides, 2001) – passend dazu stören Augenbewegungen.
- **Hirnregionen:** Eine niedrige Corsi-Spanne hing bei Patient:innen mit Läsionen im mittleren okzipitalen Gyrus beidseits, im **rechten hinteren Parietalkortex** und in rechten parieto-temporalen Faserbahnen zusammen (Chechlacz et al., 2014). Dass die Übung Regionen „trainiert“ oder einen Speicher „erweitert“, ist nicht belegt.

## 6. Motorische Grundlagen

- Einzel-Tipps auf große Trefferflächen in vorgegebener Reihenfolge; als Mindestgröße für Daumenziele werden etwa 9 mm genannt (Parhi et al., 2006). Zielgenauigkeit begrenzt kaum.
- Der Tipp zählt sofort; ein Doppelkontakt auf demselben Block innerhalb von 250 ms wird ignoriert. Ein versehentliches Aufsetzen (Handballen, Tremor) auf einen falschen Block zählt als Fehler. Es gibt kein Zeitlimit; zügiges Tippen bringt keinen Vorteil.
- Touch- und klassischer Corsi-Test ergaben übereinstimmende Ergebnisse (je 45 Patient:innen mit Psychose und Gesunde; Siddi et al., 2020). Tippzeiten würden am Touchscreen systematisch zu lang gemessen (etwa 58–70 ms; Pronk et al., 2020); sie werden hier nicht gewertet.
- Rückwärts-Runden verlangen zusätzlich das Umordnen im Kopf (zur Rückwärts-Spanne im Corsi-Paradigma: Kessels et al., 2008).

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Folgen:** Jede Folge ist anders geformt; schon beim Corsi schwankt die Leistung innerhalb einer Stufe mit der Pfadform (Busch et al., 2005). Weil nur wenige Versuche je Sitzung zustande kommen und die Treppe (1-auf/1-ab) um den 50-%-Punkt schwankt (Levitt, 1971), sind Länge und Spanne ein grobes Maß. Allgemein streuen Messungen am Menschen; aussagekräftiger ist der Verlauf über mehrere Sitzungen (zum Grundsatz der Wiederholmessung: Mountford et al., 2004, S. 44).
- **Alter:** Die Corsi-Spanne steigt bis in die frühe Jugend (8. Klasse M = 6,9, junge Erwachsene 7,1; Farrell Pagulayan et al., 2006) und sinkt im Erwachsenenalter mit dem Alter; mehr Bildung geht mit höherer Corsi-Spanne vorwärts einher (n = 362, 20–90 Jahre; Monaco et al., 2013). Das visuelle Arbeitsgedächtnis gipfelt um etwa 20 Jahre (Brockmole & Logie, 2013). Keine Alters- oder Normvergleiche.
- **Zustand und Gerät:** Schlafmangel beeinträchtigt Arbeits- und Kurzzeitgedächtnis (Lim & Dinges, 2010). Die Feldgröße hängt von der Bildschirmausrichtung ab; Übungseffekte bei Wiederholung (Calamia et al., 2012). Nur Selbstvergleich auf demselben Gerät.
- **Corsi-Normen:** Normwerte aus dem klassischen Test sind nicht übertragbar: Material, Takt und Durchführung unterscheiden sich, und Corsi-Versionen sind untereinander kaum vergleichbar (Berch et al., 1998).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Im Online-Training wurde jede geübte Aufgabe besser (N = 11.430; Owen et al., 2010). Strategien wirken hier vermutlich besonders, weil sich Richtungs- und Gruppenmuster anbieten (Herleitung, ungeprüft).
- **Naher Transfer – mittel:** Übertragung vor allem auf strukturgleiche Aufgaben, beim visuell-räumlichen seriellen Erinnern stärker als beim verbalen (Gathercole et al., 2019); visuell-räumliche Gewinne hielten eventuell länger (Melby-Lervåg & Hulme, 2013). Für diese Blockfolgen-Variante selbst fehlt eine Studie.
- **Alltagstransfer – fehlend:** Kein ferner Transfer gegenüber behandelten Kontrollgruppen (Melby-Lervåg et al., 2016); kaum Belege für Alltagseffekte von „Brain Training“ (Simons et al., 2016). Wegfindung oder Spielleistung wurden nicht untersucht.

## 9. Auswahlhinweise

- **Passt, wenn …** jemand ruhig und sprachfrei (DE/IT gleich) eine räumliche Reihenfolge behalten oder Gruppierstrategien üben möchte; am Tablet mit Touch; ohne großflächige Bewegung, Lichtreize gering; als Einstieg in Corsi-artige Folgen.
- **Weniger passend, wenn …** statische Muster (→ 603), Objekt-Ort-Bindung (→ 605) oder Blickmotorik geübt werden sollen; eine „Gedächtnis-Einstufung“ erwartet wird (keine Normen, keine Diagnose); ein sehr kleiner Bildschirm genutzt wird.
- **Vorsicht / anpassen bei …** `gesichtsfeldausfall` (zentrale oder parazentrale Ausfälle treffen das Feld; Gesichtsfeldausfälle folgen dem Verlauf der Sehbahn, Muchnick, 2008, S. 32; die Übung ersetzt keine Untersuchung); `aufmerksamkeitsprobleme` (ein verpasster Schritt kostet die Folge; räumliches Arbeitsgedächtnis bei ADHS deutlich schwächer, Effektstärke 0,85; Martinussen et al., 2005); `kognitive_einschraenkung`, `kinder_unter_6` (festes Tempo der Anzeige); `tremor_parkinson` (der Tipp zählt sofort); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (weich auf- und abblendende Blöcke etwa einmal pro Sekunde, kein rotes Aufleuchten; vorsorglich gelistet, bei Beschwerden abbrechen). Alterssichtigkeit und Farbsehschwäche sind wenig kritisch. Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 603 (statisches Gegenstück), 601 (Farbfolge), 602 (verbale Folge), 605 (Objekt-Ort), 811 (Linienzug aus dem Gedächtnis nachziehen); als motorische Ergänzung ohne Gedächtnisanteil 707 (sichtbarem Pfad mit dem Zeiger folgen).
- **Abgrenzung in der Gruppe (keine Dublette):** Am nächsten verwandt ist 601 (Folge merken und in derselben Reihenfolge nachtippen). Bei 607 trägt der **Ort** die Information (farb- und sprachfrei), bei 601 die Kombination aus Farbe, Symbol und Position der Felder. 603 zeigt Orte gleichzeitig und ohne Reihenfolge; 811 verlangt einen ähnlichen Weg als Zeichenbewegung mit der Maus statt als Einzel-Tipps. 602 ist das verbale Gegenstück (Ziffernfolge).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Ehrlicher Name („Leuchtpfad“), kein „Test/Assessment“, keine Tier-, Perzentil- oder Corsi-Norm-Angaben.
- Treppe mit Abstieg (z. B. 2 Versuche je Länge oder 2 fehlerfreie Wege in Folge → +1 Schritt, 1 Fehler → −1 Schritt, konvergiert auf ≈ 71 % Erfolg; Levitt, 1971); Runde nach Versuchen statt Uhr;
  Messgröße = längste fehlerfreie Folge.
- Modi „Pfad“ (Nachbarschritte) und „Sprung“ (freie Orte wie Corsi); Nummern optional; Takt wählbar (0,5 / 0,75 / 1 s).
- Raster unabhängig von der Ausrichtung (≈ 10–12° bei 40 cm), Felder ≥ 10 mm; Auslösen beim Loslassen.
- Rückmeldung ohne Aufblitzen und ohne reine Farbcodierung (✓/✗, Umriss); Rastergrenzen mit Kontrast ≥ 3:1 (WCAG 2.2).

## 11. Quellen

### Von der Website angegeben

- Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. *British Medical Bulletin*, 27(3), 272–277. https://doi.org/10.1093/oxfordjournals.bmb.a070866 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise („5–7 Schritte“ hängt von Version ab; Berch et al., 1998; junge Erwachsene 7,1, Farrell Pagulayan et al., 2006).
- Logie, R. H. (1995). *Visuo-spatial working memory*. Lawrence Erlbaum. – **Prüfung:** Buch, keine DOI (Neuauflage 2014, https://doi.org/10.4324/9781315804743 ✓); **stützt:** ja (Theorie; getrennter räumlicher Faktor bei Kessels et al., 2008).
- Cowan, N. (2001). The magical number 4 in short-term memory. *Behavioral and Brain Sciences*, 24(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 Chunks, nicht Felder).

### Weitere Fachliteratur

- Awh, E., & Jonides, J. (2001). Overlapping mechanisms of attention and spatial working memory. *Trends in Cognitive Sciences*, 5(3), 119–126. https://doi.org/10.1016/S1364-6613(00)01593-X – Aufmerksamkeit als Rehearsal (PM).
- Berch, D. B., Krikorian, R., & Huha, E. M. (1998). The Corsi block-tapping task: Methodological and theoretical considerations. *Brain and Cognition*, 38(3), 317–338. https://doi.org/10.1006/brcg.1998.1039 – Corsi-Versionen kaum vergleichbar
- Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology*, 4, 12. https://doi.org/10.3389/fpsyg.2013.00012 – Altersverlauf
- Busch, R. M., Farrell, K., Lisdahl-Medina, K., & Krikorian, R. (2005). Corsi Block-Tapping task performance as a function of path configuration. *Journal of Clinical and Experimental Neuropsychology*, 27(1), 127–134. https://doi.org/10.1080/138033990513681 – Pfadform, n = 94 (PM).
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, 26(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Testwiederholung hebt Werte
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation im Alter
- Chechlacz, M., Rotshtein, P., & Humphreys, G. W. (2014). Neuronal substrates of Corsi Block span. *Neuropsychologia*, 64, 240–251. https://doi.org/10.1016/j.neuropsychologia.2014.09.038 – Läsionskartierung (PM).
- De Lillo, C., Kirby, M., & Poole, D. (2016). Spatio-temporal structure, path characteristics, and perceptual grouping in immediate serial spatial recall. *Frontiers in Psychology*, 7, 1686. https://doi.org/10.3389/fpsyg.2016.01686 – (PM).
- Della Sala, S., Gray, C., Baddeley, A., Allamano, N., & Wilson, L. (1999). Pattern span: A tool for unwelding visuo-spatial memory. *Neuropsychologia*, 37(10), 1189–1199. https://doi.org/10.1016/S0028-3932(98)00159-6 – Muster und Folgen sind trennbar
- Farrell Pagulayan, K., Busch, R. M., Medina, K. L., Bartok, J. A., & Krikorian, R. (2006). Developmental normative data for the Corsi block-tapping task. *Journal of Clinical and Experimental Neuropsychology*, 28(6), 1043–1052. https://doi.org/10.1080/13803390500350977 – Entwicklungsverlauf der Corsi-Spanne
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills. *Journal of Memory and Language*, 105, 19–42. https://doi.org/10.1016/j.jml.2018.10.003
- Johansson, R., & Johansson, M. (2014). Look here, eye movements play a functional role in memory retrieval. *Psychological Science*, 25(1), 236–242. https://doi.org/10.1177/0956797613498260 – Blick zum Ort beim Abruf
- Kessels, R. P. C., van den Berg, E., Ruis, C., & Brands, A. M. A. (2008). The backward span of the Corsi block-tapping task and its association with the WAIS-III digit span. *Assessment*, 15(4), 426–434. https://doi.org/10.1177/1073191108315611 – Rückwärts-Spanne
- Klauer, K. C., & Zhao, Z. (2004). Double dissociations in visual and spatial short-term memory. *Journal of Experimental Psychology: General*, 133(3), 355–381. https://doi.org/10.1037/0096-3445.133.3.355 – visuell und räumlich trennbar
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenverfahren, Konvergenzpunkt
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin*, 136(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel
- Martinussen, R., Hayden, J., Hogg-Johnson, S., & Tannock, R. (2005). A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder. *Journal of the American Academy of Child & Adolescent Psychiatry*, 44(4), 377–384. https://doi.org/10.1097/01.chi.0000153228.72591.73 – Vorsichtshinweis ADHS
- Melby-Lervåg, M., & Hulme, C. (2013). Is working memory training effective? A meta-analytic review. *Developmental Psychology*, 49(2), 270–291. https://doi.org/10.1037/a0028228 – Haltbarkeit von Trainingsgewinnen
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612
- Monaco, M., Costa, A., Caltagirone, C., & Carlesimo, G. A. (2013). Forward and backward span for verbal and visuo-spatial data: Standardization and normative data from an Italian adult population. *Neurological Sciences*, 34(5), 749–754. https://doi.org/10.1007/s10072-012-1130-x – italienische Normen (n = 362)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042 – Übungseffekt ohne Transfer
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). https://doi.org/10.1145/1152215.1152260 – Mindestgröße für Daumenziele
- Parmentier, F. B. R., Elford, G., & Maybery, M. (2005). Transitional information in spatial serial memory: Path characteristics affect recall performance. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 31(3), 412–427. https://doi.org/10.1037/0278-7393.31.3.412 – (PM).
- Pearson, D. G., & Sahraie, A. (2003). Oculomotor control and the maintenance of spatially and temporally distributed events in visuo-spatial working memory. *The Quarterly Journal of Experimental Psychology Section A*, 56(7), 1089–1111. https://doi.org/10.1080/02724980343000044 – Augenbewegungen stören die räumliche Spanne
- Postle, B. R., Idzikowski, C., Della Sala, S., Logie, R. H., & Baddeley, A. D. (2006). The selective disruption of spatial working memory by eye movements. *Quarterly Journal of Experimental Psychology*, 59(1), 100–120. https://doi.org/10.1080/17470210500151410 – Augenbewegungen beim Behalten stören das Ortsgedächtnis
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessgenauigkeit von Web-Anwendungen auf Touchgeräten
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixations- und Sakkadenkennwerte
- Sheedy, J. E. (2004). Progressive addition lenses – matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – seitliche Unschärfe von Gleitsichtgläsern
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology*, 3(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Lidschlagrate am Bildschirm
- Siddi, S., Preti, A., Lara, E., Brébion, G., Vila, R., Iglesias, M., Cuevas-Esteban, J., López-Carrilero, R., Butjosa, A., & Haro, J. M. (2020). Comparison of the touch-screen and traditional versions of the Corsi block-tapping test in patients with psychosis and healthy controls. *BMC Psychiatry*, 20. https://doi.org/10.1186/s12888-020-02716-8 – Touch- und klassische Version vergleichbar
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Übersicht zu Gehirntraining
- Thalmann, M., Souza, A. S., & Oberauer, K. (2019). How does chunking help working memory? *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 45(1), 37–55. https://doi.org/10.1037/xlm0000578 – Grenzen des Chunkings
- Vandierendonck, A., Kemps, E., Fastame, M. C., & Szmalec, A. (2004). Working memory components of the Corsi blocks task. *British Journal of Psychology*, 95(1), 57–79. https://doi.org/10.1348/000712604322779460
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
