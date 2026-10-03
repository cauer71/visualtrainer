---
# ===== Kennung =====
nr: 603
kennung: grid-memorization
name: "Rastermuster merken"
name_original: "Visueller Gedächtnistest online – Memory Matrix (Grid Memorization Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "spatial-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization"
blickfit_umsetzung: {kennung: "rastermuster", name: "Rastermuster", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/rastermuster/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In einem Raster leuchten einige Felder kurz weich auf. Danach tippt man alle Felder an, die geleuchtet haben (Reihenfolge egal). Gelingen zwei Muster in Folge, wird das nächste umfangreicher; zwei falsche Tipps beenden ein Muster."
ziel_funktionen: [kurzzeitgedaechtnis_visuell_raeumlich]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Nur aufwärts (Code): Start 4×4 mit 5 Feldern; jedes fehlerfreie Muster +1 Feld bis 7, dann 5×5 mit wieder 5 Feldern, +1 je Treffer bis max. 12. Fehler → neues Zufallsmuster auf derselben Stufe, kein Abstieg. Einprägezeit fest 1,5 s. Die 60-s-Uhr läuft nur während der Eingabephase (Gesamtdauer real ≈ 1,5–2 min)."
messgroessen: ["Punkte (150 je fehlerfreiem Muster)", "Endstufe = Zahl der Felder im nächsten Muster ('Peak Grid Level')", "Trefferquote = fehlerfreie / alle Versuche", "sinnvoll: größtes fehlerfrei wiedergegebenes Muster je Rastergröße", "sinnvoll: Anteil richtig getippter Felder je Versuch (statt Alles-oder-nichts)"]

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
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
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
    zielbewegung_praezision: 0
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
voraussetzungen: ["ein ≈ 7–14 cm großes Raster (≈ 10–14° bei 40 cm) auf einen Blick erfassen können", "Touch oder Maus; keine Tastatur, kein Lesen, keine Farbunterscheidung für die Aufgabe nötig", "1,5 s Einprägezeit ohne Wiederholung akzeptieren"]
vorsicht_bei: [gesichtsfeldausfall, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, photosensitive_epilepsie, migraene_lichtempfindlich, tremor_parkinson]
geeignet_fuer: ["kurzes, sprachfreies Üben, ein gleichzeitig gezeigtes Muster aus Orten zu behalten (DE/IT gleich)", "Merkstrategien ausprobieren: Felder zu Formen gruppieren, Muster benennen ('L', 'Treppe')", "sitzende, ruhige Übung am Tablet mit großen Tippflächen", "Selbstvergleich über Wochen auf demselben Gerät"]
weniger_geeignet_fuer: ["Einstufung des 'visuellen Gedächtnisses' oder Normvergleich (keine Normen, kein Test im diagnostischen Sinn)", "Reihenfolge-/Sequenzgedächtnis (→ 607, 601)", "Menschen, denen die Anzeigedauer von rund zwei Sekunden zu knapp ist (sie lässt sich nicht verlängern)", "Blickmotorik- oder Tempotraining (Augen- und Handbewegungen sind Nebensache)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Geübte Gedächtnisaufgaben verbessern sich regelmäßig (Owen et al. 2010; Kable et al. 2017), vieles davon ist aufgabenspezifisches Lernen (Kemps 2001: kein Transfer auf neue Pfade); Transfer tritt eher bei gleicher Aufgabenstruktur auf (Gathercole et al. 2019); ferner oder Alltagstransfer ist mit aktiven Kontrollgruppen nicht belegt (Melby-Lervåg et al. 2016; Kable et al. 2017)."
aehnliche_uebungen: [605, 607, 811, 601, 606, 602, 604, 106]
stichworte: ["Memory Matrix", "Rastergedächtnis", "Mustergedächtnis", "Visual Patterns Test", "Pattern Span", "visuell-räumliches Kurzzeitgedächtnis", "Visual Cache", "Chunking", "Gestalt", "statisches Muster", "Touch", "sprachfrei"]
---

# 603 · Rastermuster merken

> Original: „Visueller Gedächtnistest online – Memory Matrix“ („Grid Memorization Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory`, Unterkapitel `spatial-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

In einem dunklen Raster (von 3×3 bis 6×6 Feldern, je nach Stufe) leuchten einige Felder weich auf: etwa 1,6 Sekunden plus 0,1 Sekunden je Feld. Danach tippt man genau die Felder an, die geleuchtet haben; die Reihenfolge ist egal, und ein Zähler zeigt, wie viele noch fehlen. Richtige Tipps zeigen einen Haken, falsche ein Kreuz. Zwei falsche Tipps beenden das Muster, ein einzelner Fehltipp nicht. Die Muster sind zufällig, mit höchstens zwei Feldern je Zeile und Spalte. Zwei gemeisterte Muster in Folge führen eine der zwölf Stufen höher (mehr Felder oder größeres Raster), ein nicht gemeistertes eine Stufe tiefer. Eine Sitzung besteht aus einer festen Zahl von Mustern, ohne Zeitlimit.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `9373-…js`, Stand 29.09.2026); nur Mechanik beschrieben.

- **Muster (Code):** rein zufällig gezogene Felder ohne Struktur; Linien oder „L“ entstehen nur zufällig. Dichte immer
  < 50 % (max. 7/16 = 44 %, 12/25 = 48 %).
- **Stufen (Code):** 4×4 mit 5 → 6 → 7 Feldern, dann 5×5 mit 5 → … → 12 (Obergrenze). **Kein Abstieg:** Nach einem Fehler
  kommt ein *neues* Zufallsmuster derselben Stufe (der Regeltext „Runde wird wiederholt“ lässt das offen).
- **Zeit (Code):** Countdown 2,45 s; Einprägen fest **1.500 ms** (150 ms Einblenden); Eingabe ohne Zeitlimit pro Versuch;
  danach 0,6 s (Treffer) bzw. 1,0 s (Fehler) Rückmeldung: Muster grün, falsches Feld rot. Die **60-s-Uhr läuft nur
  während der Eingabe** (`performance.now()`, 100-ms-Takt, bildfrequenzunabhängig). Real dauert eine Runde mit 12–18
  Versuchen ≈ 1,5–2 min (eigene Schätzung).
- **Eingabe (Code):** Touch oder Maus, Auslösung beim Aufsetzen (`pointerdown`), keine Tastatur. Das erste falsche Feld
  beendet den Versuch; doppeltes Tippen auf ein richtiges Feld wird ignoriert. Getippte Felder werden cyan, und Punkte
  über dem Raster zeigen, **wie viele Felder** zu tippen sind – eine Hilfe, die der Regeltext nicht nennt.
- **Wertung (Code):** +150 Punkte je fehlerfreiem Muster, unabhängig von der Größe; Fehler ohne Abzug. Trefferquote =
  fehlerfreie / alle Versuche. Note aus 100 × √(Punkte/1.150); S+ ab 1.050 Punkten (7 Treffer). „Peak Grid Level“ ist die
  Feldzahl des *nächsten* Musters bei Rundenende, nicht die größte gelöste (nach dem Wechsel auf 5×5 fällt sie von 7 auf 5).
- **Widersprüche:** Timer 60 s vs. „45-Sekunden-Durchgang“ in der Tabelle; „Timeout“ (Regel 3) gibt es nicht; „adaptiv, um
  die Kapazitätsgrenze exakt zu bestimmen“ stimmt nicht – die Stufe steigt nur, und beliebig viele Versuche je Stufe
  erhöhen die Chance auf ein zufällig leichtes Muster. Der Regeltext spricht von „weißen Kacheln“, der Code zeigt lila. Fehler lösen ein rotes Vollbild-Aufblitzen (≈ 0,5 s) aus
  (abschaltbar, ebenso die Töne).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung „wissenschaftlich fundiert“ und „kalibriert“, einen Test des „Visual Cache“, der sich durch
Chunking „erweitern“ lasse. Zielgruppen: Gamer (Minikarte), MINT-Studierende, Schachspieler:innen, Radiolog:innen. Eine
Tabelle ordnet Felder und Punkte Stufen zu („10–14+ Felder, 1.150+ Punkte = Top 1 %“, „6–7 Felder = Erwachsenen-Basis“)
samt „Klickfrequenzen“.

- **Belegt:** Statische Muster (Visual Patterns Test, VPT) und Sequenzen (Corsi) sind trennbare Komponenten (Della Sala et
  al., 1999); visuelle und räumliche Anteile dissoziieren auch bei Gesunden (Klauer & Zhao, 2004), passend zu Logies (1995) Visual Cache und Inner Scribe. Benennen hilft: Leicht
  benennbare VPT-Muster wurden ≈ 16 % besser behalten (10,1 vs. 8,7 Felder; n = 60; Brown et al., 2006). Strukturierte Anordnungen (Symmetrie,
  Fortsetzung) werden besser behalten (Kemps, 2001, Corsi-Pfade).
- **Überzogen:** „Strikt 3–4 Objekte“ – Cowan (2001) und Luck & Vogel (1997) zählen Chunks bzw. Objekte, keine Rasterfelder;
  im VPT schaffen Erwachsene (20–40 J.) im Mittel 8,7–10,1 Felder (3 s Anzeige, 10 s Pause; Brown et al., 2006). „−60 % kognitive Last durch Chunking“ ist ohne
  Beleg. „Negativraum merken“ spart hier wenig, weil nie mehr als die Hälfte der Felder leuchtet.
- **Nicht belegt / falsch:** Die Tabelle hat keine Datengrundlage (die Seite sammelt keine Daten) und widerspricht dem Code:
  Mehr als 12 Felder sind unmöglich, 1.150 Punkte (8 Treffer) heißen zuletzt 9 Felder auf 5×5. VPT-Normen (3 s Anzeige,
  anderes Material) sind nicht übertragbar; ein „standardisiertes 1,5-s-Fenster“ gibt es nicht (VPT: 3 s; Brown et al.,
  2006). Woods et al. (2015) untersuchen nur die einfache Reaktionszeit. „Klickfrequenzen“ misst das Spiel nicht; sie wären
  geräteabhängig (Touch +58–70 ms; Pronk et al., 2020). Nutzen für Minikarte oder Radiologie ist nicht belegt (Abschnitt 8).

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Die Felder sind große, einfache Flächen (Mittenabstand mindestens etwa 52, höchstens 128 Pixel); auf kleinen Bildschirmen wird das Raster verkleinert, damit die Felder groß genug bleiben. Leuchtende Felder sind hell und tragen zusätzlich eine Raute. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. **Sehschärfe und Kontrast begrenzen die Leistung nicht**, leichte Unschärfe stört kaum.
- **Erfassen in knapp zwei bis drei Sekunden:** Fixationen dauern bei Szenen etwa 330 ms, Sakkadenlatenzen betragen mindestens 150–175 ms (Rayner, 1998). In der Anzeigezeit bleiben daher grob fünf bis acht Fixationen (Herleitung). Das Muster muss weitgehend als Ganzes aus Blickmitte und naher Peripherie aufgenommen werden. Crowding spielt bei den Feldabständen und Feldern ohne Detail kaum eine Rolle.
- **Blick:** Augenbewegungen beim Behalten stören vor allem das Orts-, weniger das Formgedächtnis (Postle et al., 2006); beim Abruf hilft eher der Blick zum Ort (Johansson & Johansson, 2014). „Blick ruhig in der Mitte“ ist als Strategie nicht geprüft.
- **Brille:** Das Raster liegt zentral; die seitliche Unschärfe von Gleitsichtgläsern (Sheedy, 2004) fällt bei großen, hellen Feldern wenig ins Gewicht. Ab etwa 40 Jahren ist eine Nahkorrektur für Text und Bedienelemente trotzdem angenehm (Charman, 2008); am Monitor (60–70 cm) ist eine Arbeitsplatzbrille günstiger als der Gleitsicht-Nahteil.
- **Farbe und Licht:** Die Aufgabe braucht keine Farbunterscheidung, sondern nur Helligkeit. Rückmeldungen erscheinen nie nur in Farbe (Haken, Kreuz, Umriss). Die Felder blenden weich ein und aus (etwa 0,2 bzw. 0,3 s), es gibt ein Aufleuchten pro Versuch, kein Blitzen, kein Vollbild-Aufleuchten und kein Rot. Das liegt weit unter 3 Blitzen pro Sekunde (WCAG 2.2, SC 2.3.1); gesättigtes Rot gilt als Zusatzfaktor für Lichtempfindliche (Fisher et al., 2005) und kommt hier nicht vor.

## 5. Neurowissenschaftliche Grundlagen

- **Kapazität:** Das visuelle Kurzzeitgedächtnis ist begrenzt, abhängig von der Information je Objekt (Alvarez & Cavanagh, 2004) und individuell verschieden (etwa 1,5–5 Objekte; Vogel & Machizawa, 2004; Luck & Vogel, 1997). Gezählt werden dabei Objekte bzw. Einheiten (Cowan, 2001), keine Rasterfelder. Wie viele „Objekte“ ein Muster aus n Feldern ist, hängt von seiner Struktur ab (Herleitung aus Brown et al., 2006; Kemps, 2001).
- **Statisch vs. sequenziell:** Muster-Aufgaben (Visual Patterns Test, VPT) und Folgen-Aufgaben (Corsi) dissoziieren bei Patient:innen und unter selektiver Interferenz (Della Sala et al., 1999); visuelles und räumliches Kurzzeitgedächtnis sind auch bei Gesunden trennbar (Klauer & Zhao, 2004), passend zu den Komponenten Visual Cache und Inner Scribe (Logie, 1995). Die Übung liegt nahe am VPT, verlangt aber das Wiedergeben von Orten im Raster.
- **Benennen und Gestalt:** Leicht benennbare Muster wurden etwa 16 % besser behalten (10,1 gegenüber 8,7 Feldern; n = 60; Brown et al., 2006). Strukturierte Anordnungen (Symmetrie, Fortsetzung) werden besser behalten (Kemps, 2001, Corsi-Pfade). Die Muster dieser Übung sind zufällig, haben aber höchstens zwei Felder je Zeile und Spalte, damit sich nicht einzelne Muster als „Strich“ merken lassen.
- **Sensorischer Speicher:** Bei Matrixmustern wirkt ein hochkapazitiver, maskierbarer Speicher nur etwa 100 ms, danach ein begrenztes, komplexitätsabhängiges Kurzzeitgedächtnis (Phillips, 1974; Inhalt über Sekundärquellen).
- **Hirnregionen:** Die Aktivität im hinteren Parietalkortex folgt der begrenzten Menge gespeicherter Szeneninformation (fMRT; Todd & Marois, 2004). Dass die Übung Regionen „trainiert“ oder den Speicher „erweitert“, ist nicht belegt.

## 6. Motorische Grundlagen

- Einzel-Tipps auf große Ziele; als Mindestgröße für Daumenziele werden etwa 9 mm genannt (Parhi et al., 2006), die Felder liegen am Tablet deutlich darüber. Präzision begrenzt nicht.
- Es gibt kein Zeitlimit; zügiges Tippen bringt keinen Vorteil.
- Bereits markierte Felder werden ignoriert, ein doppeltes Antippen schadet also nicht, und ein einzelner Fehltipp beendet das Muster noch nicht. Das mindert die Folgen eines versehentlichen Aufsetzens (Tremor, Handballen); ein zweiter falscher Tipp beendet das Muster dennoch, und es gibt kein Rückgängig.

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Muster, Zufall:** Eine Sitzung hat nur wenige Muster mit unterschiedlich strukturierten Zufallsmustern. Stabile Kapazitätsschätzungen brauchen Hunderte Durchgänge (α > 0,9 bei 540; Xu et al., 2018). Die Treppe (zwei gemeisterte Muster → eine Stufe höher, ein nicht gemeistertes → eine tiefer) konvergiert auf etwa 71 % Erfolg (Levitt, 1971), braucht dafür aber viele Umkehrpunkte. Die Stufe nach einer Sitzung ist daher ein grobes Maß. Allgemein streuen Messungen am Menschen; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Sitzungen, etwa als Median (zum Grundsatz der Wiederholmessung: Mountford et al., 2004, S. 44).
- **Alter:** Das visuelle Arbeitsgedächtnis erreicht seinen Gipfel um etwa 20 Jahre und nimmt danach deutlich ab; 55-Jährige lagen im Mittel unter 8- bis 9-Jährigen (N = 55.753; Brockmole & Logie, 2013). Keine Alters- oder Normvergleiche. Kinder: Komponenten ab etwa 6 Jahren trennbar, Wachstum bis in die Jugend (Gathercole et al., 2004).
- **Gerät und Strategie:** Die Rastergröße hängt vom Bildschirm ab; auf kleinen Bildschirmen wird das Raster verkleinert, und Hoch- und Querformat ändern den Sehwinkel. Ergebnisse deshalb nur auf demselben Gerät und in derselben Ausrichtung vergleichen. Wer Muster benennt („Treppe links oben“), nutzt verbale Kodierung mit (Brown et al., 2006).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Im Online-Training wurde jede geübte Aufgabe besser (N = 11.430; Owen et al., 2010), ebenso nach 10 Wochen kommerziellem Training (Kable et al., 2017). Eingeübte Muster werden gezielt besser (Kemps, 2001).
- **Naher Transfer – schwach:** Übertragung vor allem bei gleicher Aufgabenstruktur, beim visuell-räumlichen *seriellen* Erinnern eher als beim verbalen (Gathercole et al., 2019). Das betrifft Corsi-artige Folgen (→ 607, dort „mittel“); diese Übung zeigt ein statisches Muster ohne Reihenfolge. Ein eigener Trainingsnachweis für Rastermuster-Aufgaben fehlt.
- **Alltagstransfer – fehlend:** Kein ferner Transfer gegen behandelte Kontrollgruppen (Melby-Lervåg et al., 2016). Nach 10 Wochen kommerziellem Training verbesserten sich Standardtests nicht stärker als nach Videospielen (n = 128; Kable et al., 2017). Eine Studie mit 49 gemischten Übungen fand einen kleinen Vorteil gegenüber Kreuzworträtseln (d = 0,26; N = 4.715; Hardy et al., 2015); fünf der sieben Autor:innen waren beim Anbieter angestellt, und Einzelübungen lassen sich daraus nicht bewerten.

## 9. Auswahlhinweise

- **Passt, wenn …** jemand ruhig und sprachfrei (DE/IT gleich) das kurze Merken räumlicher Muster üben oder Gruppier- und Benennstrategien ausprobieren möchte; am Tablet mit Touch; ohne Bewegungs- oder Flimmerreize.
- **Weniger passend, wenn …** Reihenfolgen geübt werden sollen (→ 607, 601); Blickmotorik oder Reaktion im Vordergrund stehen; eine „Gedächtnis-Einstufung“ erwartet wird (keine Normen, keine Diagnose); die Anzeigedauer von rund zwei Sekunden zu knapp ist.
- **Vorsicht / anpassen bei …**
  - `gesichtsfeldausfall`: Das Muster verteilt sich über das Raster; Randfelder werden eventuell übersehen. Gesichtsfeldausfälle folgen dem Verlauf der Sehbahn (einäugig vor, halbseitig am und hinter dem Chiasma; Muchnick, 2008, S. 32). Wer einen Ausfall kennt, sollte die Übung nur nach Rücksprache nutzen; die Übung ersetzt keine Untersuchung.
  - `aufmerksamkeitsprobleme`: Eine verpasste Anzeige bedeutet ein verlorenes Muster; räumliches Speichern ist bei Kindern mit ADHS deutlich schwächer (Effektstärke 0,85; Martinussen et al., 2005).
  - `kognitive_einschraenkung`, `kinder_unter_6`: Das kleinste Muster hat drei Felder; es gibt keine leichtere Stufe.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: weich ein- und ausgeblendete Felder, kein Blitzen, kein rotes Aufleuchten; vorsorglich gelistet, bei Beschwerden abbrechen.
  - `tremor_parkinson`: Ein zweiter falscher Tipp beendet das Muster (siehe Motorische Grundlagen).
  - Allgemein: Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28). Alterssichtigkeit und Gleitsicht sind hier wenig kritisch.
- **Kombiniert gut mit …** 607 (Corsi-Pfad, sequenzielles Gegenstück), 605 (Objekt-Ort), 811 (Muster merken), 601 (Farbfolge), 106 (Mehrfach-Objektverfolgung, dynamisch statt statisch).
- **Abgrenzung in der Gruppe (keine Dublette):** Am nächsten verwandt ist 605. Beide nutzen ein Raster und zeigen die Anordnung für kurze Zeit. Bei 603 merkt man sich nur, *wo* Felder geleuchtet haben, und tippt alle an. Bei 605 muss man sich merken, *was wo* lag (Symbole unterscheiden), und beantwortet nur eine Frage je Anordnung. 607 zeigt die Orte nacheinander und verlangt die Reihenfolge. 606 hat denselben Aufbau („alles gleichzeitig zeigen, alles in beliebiger Reihenfolge wiedergeben“) mit Wörtern.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Treppe mit Abstieg statt Einbahnstraße, z. B. 2 fehlerfreie Muster in Folge → +1 Feld, 1 Fehler → −1 Feld (konvergiert auf ≈ 71 % Erfolg; Levitt, 1971); Start mit 3 Feldern;
  Runde nach Versuchen (z. B. 14) statt nach Uhrzeit.
- Messgrößen: größtes fehlerfreies Muster und Anteil richtiger Felder je Versuch; angezeigte Stufe = tatsächlich gelöste;
  keine Tier-, Perzentil- oder „Top 1 %“-Angaben.
- Einprägezeit wählbar (1,5 / 2 / 3 s; 3 s wie im VPT); Zählpunkte optional. Muster mit kontrollierter Struktur, damit die
  Schwierigkeit je Stufe weniger vom Zufall abhängt.
- Rückmeldung farbunabhängig (✓/✗, Umriss), kein Rot-Grün, kein Vollbild-Aufblitzen; Rastergrenzen mit Kontrast ≥ 3:1
  (WCAG 2.2, SC 1.4.11; im Original Zellfläche 4 %, Rand 10 % Weiß).
- Touch: Auslösen beim Loslassen, damit Fehlberührungen den Versuch nicht beenden; Rastergröße unabhängig von der
  Ausrichtung (z. B. ≈ 12–14° bei 40 cm).

## 11. Quellen

### Von der Website angegeben

- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, 24(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise/nein (≈ 4 Chunks unter Randbedingungen; „5 Felder = physiologische Grenze“ folgt nicht).
- Logie, R. H. (1995). *Visuo-spatial working memory*. Lawrence Erlbaum. – **Prüfung:** Buch, keine DOI (Neuauflage 2014: https://doi.org/10.4324/9781315804743 ✓); **stützt:** ja (Modell; empirisch gestützt durch Della Sala et al., 1999).
- Luck, S. J., & Vogel, E. K. (1997). The capacity of visual working memory for features and conjunctions. *Nature*, 390(6657), 279–281. https://doi.org/10.1038/36846 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 einfache Objekte; nicht auf Rasterfelder übertragbar).

### Weitere Fachliteratur

- Alvarez, G. A., & Cavanagh, P. (2004). The capacity of visual short-term memory is set both by visual information load and by number of objects. *Psychological Science*, 15(2), 106–111. https://doi.org/10.1111/j.0963-7214.2004.01502006.x
- Brockmole, J. R., & Logie, R. H. (2013). Age-related change in visual working memory: A study of 55,753 participants aged 8–75. *Frontiers in Psychology*, 4, 12. https://doi.org/10.3389/fpsyg.2013.00012 – Altersverlauf.
- Brown, L. A., Forbes, D., & McConnell, J. (2006). Limiting the use of verbal coding in the Visual Patterns Test. *Quarterly Journal of Experimental Psychology*, 59(7), 1169–1176. https://doi.org/10.1080/17470210600665954 – VPT-Werte, 3 s.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation im Alter
- Della Sala, S., Gray, C., Baddeley, A., Allamano, N., & Wilson, L. (1999). Pattern span: A tool for unwelding visuo-spatial memory. *Neuropsychologia*, 37(10), 1189–1199. https://doi.org/10.1016/S0028-3932(98)00159-6 – Muster und Folgen sind trennbar
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills. *Journal of Memory and Language*, 105, 19–42. https://doi.org/10.1016/j.jml.2018.10.003 – Transfer bei gleicher Struktur.
- Gathercole, S. E., Pickering, S. J., Ambridge, B., & Wearing, H. (2004). The structure of working memory from 4 to 15 years of age. *Developmental Psychology*, 40(2), 177–190. https://doi.org/10.1037/0012-1649.40.2.177 – Entwicklung bei Kindern
- Hardy, J. L., Nelson, R. A., Thomason, M. E., Sternberg, D. A., Katovich, K., Farzin, F., & Scanlon, M. (2015). Enhancing cognitive abilities with comprehensive training: A large, online, randomized, active-controlled trial. *PLOS ONE*, 10(9), e0134467. https://doi.org/10.1371/journal.pone.0134467 – Anbieterstudie, d = 0,26 (Abstract via Europe PMC).
- Johansson, R., & Johansson, M. (2014). Look here, eye movements play a functional role in memory retrieval. *Psychological Science*, 25(1), 236–242. https://doi.org/10.1177/0956797613498260 – Blick zum Ort beim Abruf
- Kable, J. W., Caulfield, M. K., Falcone, M., et al. (2017). No effect of commercial cognitive training on brain activity, choice behavior, or cognitive performance. *The Journal of Neuroscience*, 37(31), 7390–7402. https://doi.org/10.1523/JNEUROSCI.2832-16.2017 – nur geübte Aufgaben besser (PM).
- Kemps, E. (2001). Complexity effects in visuo-spatial working memory: Implications for the role of long-term memory. *Memory*, 9(1), 13–27. https://doi.org/10.1080/09658210042000012 – Gestaltstruktur, musterspezifisches Lernen (PM).
- Klauer, K. C., & Zhao, Z. (2004). Double dissociations in visual and spatial short-term memory. *Journal of Experimental Psychology: General*, 133(3), 355–381. https://doi.org/10.1037/0096-3445.133.3.355
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – Treppenverfahren, Konvergenzpunkt
- Martinussen, R., Hayden, J., Hogg-Johnson, S., & Tannock, R. (2005). A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder. *Journal of the American Academy of Child & Adolescent Psychiatry*, 44(4), 377–384. https://doi.org/10.1097/01.chi.0000153228.72591.73
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32)
- Owen, A. M., Hampshire, A., Grahn, J. A., et al. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). https://doi.org/10.1145/1152215.1152260 – Mindestgröße für Daumenziele
- Phillips, W. A. (1974). On the distinction between sensory storage and short-term visual memory. *Perception & Psychophysics*, 16(2), 283–290. https://doi.org/10.3758/BF03203943 – Inhalt über Sekundärquellen.
- Postle, B. R., Idzikowski, C., Della Sala, S., Logie, R. H., & Baddeley, A. D. (2006). The selective disruption of spatial working memory by eye movements. *Quarterly Journal of Experimental Psychology*, 59(1), 100–120. https://doi.org/10.1080/17470210500151410
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372
- Sheedy, J. E. (2004). Progressive addition lenses – matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – seitliche Unschärfe von Gleitsichtgläsern
- Todd, J. J., & Marois, R. (2004). Capacity limit of visual short-term memory in human posterior parietal cortex. *Nature*, 428(6984), 751–754. https://doi.org/10.1038/nature02466 (PM)
- Vogel, E. K., & Machizawa, M. G. (2004). Neural activity predicts individual differences in visual working memory capacity. *Nature*, 428(6984), 748–751. https://doi.org/10.1038/nature02447
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
- Xu, Z., Adam, K. C. S., Fang, X., & Vogel, E. K. (2018). The reliability and stability of visual working memory capacity. *Behavior Research Methods*, 50(2), 576–588. https://doi.org/10.3758/s13428-017-0886-6
