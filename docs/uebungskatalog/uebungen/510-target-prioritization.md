---
# ===== Kennung =====
nr: 510
kennung: target-prioritization
name: "Zielauswahl – mehrere Ziele nach Dringlichkeit in der richtigen Reihenfolge antippen"
name_original: "Aim Trainer – Zielauswahl & Bedrohungspriorität (Seitentitel: Aim Trainer | Zielauswahl & Bedrohung | SkillDrills)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/target-prioritization"
blickfit_umsetzung: {kennung: "zielauswahl", name: "Zielauswahl", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/zielauswahl/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Mehrere ruhende Ziele liegen gleichzeitig auf dem Bildschirm; ihre Dringlichkeit erkennt man an Form und Muster (Dreieck voll = hoch, Kreis gestreift = mittel, Quadrat gepunktet = niedrig), die Farbe kommt nur dazu. Man tippt erst alle Dreiecke, dann die Kreise, dann die Quadrate an; eine falsche Reihenfolge zählt als Fehler. Mit dem Erfolg werden es mehr und kleinere Ziele mit weniger Zeit je Ziel. Angezeigt werden der Anteil richtiger Reihenfolge und die Zeit je Ziel (Median)."
ziel_funktionen: [farbunterscheidung, selektive_aufmerksamkeit, entscheidung_wahlreaktion]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = 1 + Punkte/1 400, ohne Obergrenze. Tempo und Zeiten nähern sich asymptotisch Grenzwerten an (auf Level 15 etwa drei Viertel des Wegs, nahezu erreicht erst um Level 25–30); Zielzahl und Farbanteile steigen linear bis zu einem Deckel: gleichzeitige Ziele 2 → 4 (ab ≈ Level 17), Rot-Anteil 25 → 65 % (Level 15: 55 %; Deckel ab ≈ Level 20), Grün-Anteil nominal 20 → 40 %; der Gelb-Anteil sinkt dadurch von 55 % (Level 1) auf 10 % (Level 15) und 0 % ab ≈ Level 18 (danach tatsächlich ≈ 65 % Rot, 35 % Grün; Gelb entsteht dann nicht mehr neu), Tempo 35 → Grenzwert 130 px/s (≈ 0,9 → 3,4°/s; Level 15: ≈ 107 px/s); es sinken Takt neuer Ziele 1,1 → 0,5 s (min. 0,4 s) und Lebensdauer Gelb 2,4 → 1,4 s bzw. Rot 2,2 → 1,4 s. Eine hohe Combo verschärft Takt, Lebensdauer und Tempo zusätzlich um bis zu 20 % und erhöht Rot-Anteil und Zielzahl."
messgroessen: ["Original: Punkte, Combo, erreichtes Level, Präzision (richtige Treffer/alle Klicks), Zähler für Friendly Fire, falsche Priorität, verfallene Rote, Fehlklicks, Note S+ bis F", "Original misst KEINE Entscheidungszeit, obwohl die Seite eine Latenztabelle zeigt", "sinnvoll: Zeit vom Erscheinen/Rotwerden bis zum Treffer (Median), Fehlalarmrate auf Grün, Prioritätsfehlerrate, getrennt nach Level"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 3
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 1
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 3
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 1
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["normales Farbsehen für Rot, Gelb und Grün (Farbe ist das einzige Unterscheidungsmerkmal)", "Maus und Desktop-Browser mit Pointer Lock (Mauszeigersperre)", "Monitor im Zwischenbereich (ca. 50–75 cm) scharf sehen", "Regelverständnis: Gelb nur, wenn kein Rot sichtbar ist"]
vorsicht_bei: [farbsehschwaeche, photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, hand_arm_beschwerden, tremor_parkinson]
geeignet_fuer: ["Auswahl nach Priorität unter mäßigem Zeitdruck üben (welches Ziel zuerst?)", "sich eine Reihenfolgeregel merken und nach ihr handeln, ohne voreilig zu tippen", "den Überblick über mehrere Ziele am ganzen Bildschirm behalten und dabei gezielt tippen", "Selbstvergleich auf demselben Gerät (richtige Reihenfolge, Zeit je Ziel)"]
weniger_geeignet_fuer: ["reines Go/No-Go- oder Hemmtraining mit Zeitmessung (dafür 102)", "Personen mit Gesichtsfeldausfall, bei denen Ziele im ganzen Feld übersehen werden könnten", "wer ruhige, präzise Motorik üben möchte (705, 509)", "Erwartung eines Seh-, Farbsehen- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Übungseffekte in ähnlichen Auswahl-, Hemm- und Zielaufgaben sind gut belegt (Enge et al., 2014; Listman et al., 2021); Hemmtraining übertrug sich nicht auf andere Aufgaben (Enge et al., 2014), Actionspiele zeigen nur kleine kausale Effekte (g = 0,30; Bediou et al., 2023). Zu dieser Übung und zum Transfer auf Spiel oder Alltag gibt es keine Studie."
aehnliche_uebungen: [102, 202, 103, 502, 508, 302, 801, 511]
stichworte: ["Zielpriorisierung", "Target Prioritization", "Go/No-Go", "Friendly Fire", "Farbkodierung", "Pop-out", "Priority Map", "Aim Trainer", "Schusshemmung", "Wahlreaktion"]
---

# 510 · Zielauswahl nach Bedrohungsfarbe – zuerst Rot, dann Gelb, nie Grün

> Original: „Aim Trainer – Zielauswahl & Bedrohungspriorität“ – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt (verwandt: „Stopp & Los“)

## 1. Kurzbeschreibung

Mehrere ruhende Ziele liegen gleichzeitig auf der Bühne. Die Dringlichkeit steckt in Form und Muster – Dreieck voll = hoch, Kreis gestreift = mittel, Quadrat gepunktet = niedrig –, die Farbe kommt nur dazu; eine Legende am unteren Rand zeigt die Reihenfolge. Man tippt zuerst alle Dreiecke an, dann die Kreise, dann die Quadrate (innerhalb einer Dringlichkeit beliebig). Ein Tipp in falscher Reihenfolge ist ein Fehler, markiert durch ein weiches Kreuz; das Ziel bleibt liegen, es gibt keine Zeitstrafe, keinen Blitz und kein Wackeln. Eine Sitzung hat 10 Runden, jede mit einer Orientierungszeit von 2 s plus einer Zeit je Ziel. Mit der Stufe (1–12; zwei geschaffte Runden in Folge steigern, eine misslungene senkt) steigt die Zahl der Ziele von 3 auf 8, ihr Radius sinkt von 6,2 auf 4,0 Einheiten (eine Einheit ist 1 % der kürzeren Bildschirmseite) und die Zeit je Ziel von 1,7 s auf knapp 0,9 s. Eine Runde ist geschafft, wenn alle Ziele in der Zeit und ohne falsche Reihenfolge getippt sind. Angezeigt werden der Anteil richtiger Reihenfolge, die Zeit je Ziel (Median), die Zahl geschaffter Runden und verpasste Ziele.

## 2. Ablauf im Original (Analyse)
Quelle: Regeltext der Seite und ausgelieferter Spielcode (Chunk der Seite, formatiert; Werte in Canvas-Pixeln, Umrechnung für 24″-FHD-Monitor in 60 cm ≈ 38 px/°, EIG).
- **Eingabe:** Nur Maus. Das Canvas fordert `requestPointerLock()` (ohne `unadjustedMovement`) an; das Fadenkreuz folgt `movementX/Y` × Empfindlichkeit (0,1–3, Standard 1). Reine Touch-Geräte werden erkannt und bekommen einen Hinweis; eine Touch-Steuerung gibt es nicht (Code).
- **Reize:** Kreise mit Leuchtrand auf fast schwarzem Grund (#050508). Radius rot 18 px, gelb 22 px, grün 24 px (Ø ≈ 0,95°/1,16°/1,26°); Trefferzone = Radius + 6 px (Ø ≈ 1,3–1,6°). Das wichtigste Ziel ist also das kleinste; ein rot gewordenes Gelb schrumpft von 22 auf 18 px. Farben: #ef4444, #eab308, #22c55e.
- **Bewegung:** zufällige Richtung, 35 px/s (≈ 0,9°/s) auf Level 1, ≈ 107 px/s (≈ 2,8°/s) auf Level 15, asymptotischer Grenzwert 130 px/s (Level ist nach oben offen), mit hoher Combo bis ≈ 156 px/s (≈ 4°/s). Die Bewegung wird mit der Bildzeit (dt, max. 100 ms) gerechnet und ist damit bildfrequenzunabhängig; nur die Trefferpartikel laufen pro Bild (kosmetisch).
- **Takt:** höchstens 2 → 4 Ziele gleichzeitig; ein neues Ziel alle 1,1 s → 0,5 s (min. 0,4 s). Rot-Anteil 25 → 65 %, Grün-Anteil nominal 20 → 40 %, Rest gelb (Deckel erst ab ≈ Level 20 oder mit hoher Combo). Weil Rot zuerst vergeben wird, schrumpft Gelb von 55 % (Level 1) auf 10 % (Level 15) und entfällt ab ≈ Level 18 ganz; danach erscheinen nur noch Rot (≈ 65 %) und Grün (≈ 35 %), und die Regel „Gelb nur ohne Rot“ spielt kaum noch eine Rolle (Code, EIG). Grüne verschwinden nach 3 s ohne Folgen. Das Verfallen roter Ziele hängt an der Einstellung „Timeout“ (Standard: an).
- **Wertung:** Rot 100 bzw. Gelb 50 Punkte × Combo-Faktor (1 bei < 3 Treffern in Folge bis 3 ab 50) × Level-Faktor (1 + 0,5 · (Level − 1)/14, also 1,5 auf Level 15 und darüber weiter steigend). Jeder richtige Treffer bringt **+2 s** (Uhr max. 60 s). Fehler setzen die Combo auf 0 und kosten **−1 s**: Fehlklick ins Leere, Treffer auf Grün („Friendly Fire“), Gelb getroffen, während ein Rot sichtbar ist („falsche Priorität“), rotes Ziel verfallen. Note am Ende nach √(Punkte/54 000) (S+ ab 95 %).
- **Rückmeldung:** Ton, Partikel, Bildschirmwackeln 6 px (Fehlklick, falsche Priorität), 8 px (verfallenes Rot), 12 px (Friendly Fire) und bei aktivierten Blitzeffekten (Einstellung ist standardmäßig an; gemeinsames Modul, auf einer anderen Seite ausgelesen) ein rotes, radiales Aufleuchten des Spielfelds (0,45 s; Deckkraft 50 %). Das Wackeln hängt nicht an dieser Einstellung.
- **Dauer:** 3-2-1-Countdown (2,45 s), Startzeit 45 s. Rechnerisch gewinnt man auf Level 1 bei fehlerfreiem Spiel bis ≈ 1,45 s Uhrzeit pro Sekunde (1 Ziel/1,1 s, 80 % schießbar, je +2 s), netto also ≈ +0,45 s je Spielsekunde; die Uhr ist bei 60 s gedeckelt. Die Runde kann daher weit über 45 s dauern und endet praktisch erst durch Fehler bzw. wenn Fehler und Verfall die Gutschrift übersteigen (EIG, Näherung).
- **Widersprüche Regeltext ↔ Code:** (1) Deutsche Regeln nennen „+0,4 s“ je Treffer, Code und englischer Regeltext +2 s (max. 60 s). (2) Der englische Regeltext nennt −0,6 s Strafe „mit aktivierter Zeitstrafe“; im Code sind es −1 s, und die Strafe greift immer, weil die Abfrage mit erzwungenem „an“ aufgerufen wird. (3) Falsche Priorität und verfallene Rote werden bestraft, stehen aber nicht in den deutschen Regeln. (4) Die Seite zeigt eine Tabelle zur „Entscheidungslatenz“ – der Code misst keine Reaktions- oder Entscheidungszeit.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Zielpriorisierung sei eine „exekutive Fähigkeit“; der Drill trainiere Bedrohungseinschätzung, Ablenkungsunterdrückung, Impulskontrolle und Entscheidungstempo und „konditioniere präfrontale Hemmungsbahnen“ (10 min täglich). Begründet wird das mit dem Stop-Signal-Wettlaufmodell (Logan & Cowan, 1984), Filtermodellen (Broadbent, 1958; Treisman, 1964), Aufmerksamkeitsnetzwerken (Posner & Petersen, 1990) und Donders’ Go/No-Go-Vorläufer. Zielgruppe: taktische FPS-Spielende (Valorant, CS2, Rainbow Six). Eine Tabelle ordnet Entscheidungslatenzen (< 280 ms bis > 520 ms) und Prioritätsgenauigkeiten (72–99 %) Rängen von „Einsteiger/Panikschütze“ bis „Profi/Global Elite“ zu.

**Einordnung:**
- **Belegt:** Farbe ist ein Merkmal, das parallel und schnell gefunden wird (Pop-out; Treisman & Gelade, 1980). Die Aufmerksamkeit wird über eine „Priority Map“ aus Salienz, Zielvorgabe, Vorgeschichte und Belohnung gelenkt (Wolfe, 2021); auch früher belohnte Farben ziehen Aufmerksamkeit an (Anderson et al., 2011) – Punktwerte je Farbe passen dazu. Unter Angst schießen Menschen häufiger auch auf Ungefährliche (Nieuwenhuys et al., 2012).
- **Falsch zugeordnet:** Die Übung ist **kein Stop-Signal-Paradigma** (dort wird eine bereits laufende Antwort abgebrochen), sondern eine Auswahl-/Go/No-Go-Aufgabe: Die Farbe steht vor dem Klick fest (Verbruggen & Logan, 2008). Broadbent und Treisman (1964) beschreiben auditive Filter beim dichotischen Hören; die Übertragung auf „kreuzende Teamkollegen“ ist eine Analogie.
- **Überzogen/unbelegt:** „Konditioniert präfrontale Hemmungsbahnen“ – adaptives Hemmtraining verbesserte nur die geübte Aufgabe und nicht stärker als eine aktive Kontrollgruppe, ohne Transfer (Enge et al., 2014). „Clutch-Chance −45 %“, „30–50 ms Bedrohungsprüfung vor dem Flick“ (Wahlreaktionen brauchen deutlich länger; Hick, 1952) und „30–42 cm/360° für Bremskraft“ (vgl. Casiez et al., 2008) haben keine Quelle.
- **Tier-Tabelle ohne Datengrundlage:** Keine der sechs Quellen enthält solche Werte, und der Drill misst die Latenz gar nicht (Abschnitt 2). Der Satz „Every figure quoted on this page comes from the published work listed above“ ist damit irreführend.
- **Messhinweise** (Bildintervall 16,7/6,9/4,1 ms, Polling) sind physikalisch weitgehend richtig (240 Hz = 4,2 ms), stehen aber nicht bei Woods et al. (2015); `performance.now()` ist laut MDN ohne Cross-Origin-Isolierung auf 100 µs vergröbert (isoliert 5 µs), nicht auf 1 ms; einzelne Browser können gröber runden.

## 4. Optische und okulomotorische Grundlagen

- **Form und Muster statt Farbe:** Unterschieden wird über Umriss und Füllung, die Farbe ist nur zusätzlich. Rot-Grün-Farbsehschwäche betrifft in Europa etwa 8 % der Männer und 0,4 % der Frauen (Birch, 2012); sie beeinträchtigt die Aufgabe daher nicht. Das entspricht der Gestaltungsregel, Farbe nicht als einziges Unterscheidungsmerkmal zu verwenden (WCAG 2.2, Kriterium 1.4.1). Farbwiedergabe-Einstellungen wie Nachtmodus oder Blaulichtfilter ändern die Farben, nicht aber Form und Muster.
- **Größe:** Der sichtbare Radius beträgt 4,0–6,2 Einheiten (mindestens 26 Pixel), der Trefferradius ist etwas größer (mindestens 28 Pixel). Die Umrisse liegen weit über der Sehschärfegrenze (≈ 1′ bei Visus 1,0); die Füllmuster (gestreift, gepunktet) sind feiner, sodass bei niedrigem Visus die Unterscheidung von Kreis und Quadrat schwerer fallen kann (Einschätzung). Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Blickmotorik:** Man springt mit Sakkaden zwischen 3–8 ruhenden Zielen und prüft, ob noch ein Ziel der höchsten Dringlichkeit offen ist. Die Suche wird schwerer, je ähnlicher sich Ziel und Ablenker sind (Duncan & Humphreys, 1989) – hier unterscheiden sie sich in Form und Muster. Es gibt keine Blickfolge (die Ziele ruhen); Stereosehen spielt keine Rolle (0).
- **Peripherie:** Die Ziele sind über das ganze Feld verteilt; Form und Muster müssen daher auch außerhalb der Blickmitte erkannt oder per Blicksprung geprüft werden.
- **Brille:** Mit Universal-Gleitsicht liegen Ziele am oberen oder seitlichen Rand im unscharfen Bereich; Kopf- statt Augenbewegungen verlangsamen das Absuchen. Bildschirm-Gleitsicht senkte die Kopfneigung um 2,3° und verbesserte die Monitorsicht (Jaschinski et al., 2015). Getönte oder farbige Gläser können Farbtöne verschieben; da die Farbe hier nur zusätzlich ist, bleibt die Übung auch dann lösbar. Der Lidschlag sinkt am Bildschirm deutlich (Patel et al., 1991) → trockenes Auge.

## 5. Neurowissenschaftliche Grundlagen

- **Auswahl nach Priorität:** Guided Search 6.0 beschreibt eine Prioritätskarte, in die Salienz, Zielvorgabe (hier „höchste Dringlichkeit zuerst“), Szenenwissen, Vorgeschichte und Belohnung eingehen (Wolfe, 2021). Posner und Petersen (1990) unterscheiden Netzwerke für Alarmierung, Ausrichtung und exekutive Kontrolle.
- **Regel halten und voreilige Antworten zurückhalten:** Die Reihenfolgeregel („erst Dreiecke“) muss im Arbeitsgedächtnis gehalten werden, und ein Tipp auf ein Ziel niedrigerer Dringlichkeit muss zurückgehalten werden, solange ein höheres offen ist. Echte Hemmung verlangen Go/No-Go-Aufgaben vor allem bei seltenen No-Go-Reizen und schnellem Takt (Wessel, 2018); hier gibt es keine No-Go-Reize und keinen Dauertakt, die Hemmanforderung ist daher gering bis mittel (Einschätzung).
- **Einordnung:** Diese Befunde beschreiben, welche Prozesse an Auswahl und Priorisierung beteiligt sind. Dass die Übung bestimmte Hirnregionen oder Netzwerke „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Zielbewegung:** Jeder Tipp ist eine kurze Zeigebewegung mit Primär- und Korrekturphase (Elliott et al., 2010). Die Ziele ruhen und die Trefferflächen sind groß; die Anforderung liegt weniger in der Präzision als im Auswählen. Die Hand korrigiert auf eine Zielverschiebung nach ≈ 110 ms (Brenner & Smeets, 1997) – für ruhende Ziele ohne Bedeutung.
- **Zeitbudget:** Wahlreaktionen brauchen länger als einfache Reaktionen (Informationsgewinn ≈ 5 bit/s; Hick, 1952), die einfache visuelle Reaktionszeit liegt bei 213–231 ms (Woods et al., 2015). Der Druck entsteht durch die wachsende Zahl der Ziele (3 → 8) und die kürzer werdende Zeit je Ziel (1,7 s → knapp 0,9 s), nicht durch einzelne Reizzeiten.
- **Dauertippen:** Tipps ins Leere werden nicht bewertet; schnelles Dauertippen lohnt sich nicht (Fingergeschwindigkeit 0).

## 7. Einflussfaktoren und Messgrenzen

- **Farbwiedergabe:** Nachtmodus, Blaulichtfilter und schlechte Monitorkalibrierung verändern die Farben, nicht aber Form und Muster, auf denen die Aufgabe beruht.
- **Alter:** Ältere hemmen gerade bei Go/No-Go und Stoppsignal schwächer (Metaanalyse, 176 Studien; Rey-Mermet & Gade, 2018). Nur der Vergleich mit sich selbst ist sinnvoll.
- **Gerät:** Die Verzögerung des Touchscreens und die Systemlatenz gehen in jede Zeit ein; Latenzen von 23–243 ms verschlechtern Zielaufgaben schon ab 41 ms messbar (Ivkovic et al., 2015). Die Fenstergröße bestimmt Sehwinkel und Distanzen (die Maße passen sich der Bühne an).
- **Messgüte:** „Zeit je Ziel“ enthält Suchen und Entscheiden und ist keine Reaktionszeit; eine reine Entscheidungszeit wird nicht gemessen. Der Anteil richtiger Reihenfolge zählt falsche Reihenfolgen, verpasste Ziele erscheinen getrennt. Einzelne Runden streuen, wie jede Messung am Menschen; aussagekräftig sind Mittelwerte bzw. Mediane über mehrere Runden und der Verlauf auf demselben Gerät (vgl. Mountford et al., 2004). Für Ränge oder Normen taugen die Werte nicht.
- **Übung:** Große Effekte zeigen sich vor allem, wenn Trainings- und Testgerät gleich sind (Guo et al., 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** In Go/No-Go- und Stopp-Aufgaben wird man mit Übung besser, allerdings nicht stärker als eine aktive Kontrollgruppe (Enge et al., 2014); die Leistung in Zielaufgaben am Bildschirm steigt über Tage (Listman et al., 2021; Beobachtungsdaten, vom Anbieter finanziert). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Hemmtraining ohne Transfer auf andere Hemmaufgaben (Enge et al., 2014). Actionspiele (nicht einzelne Zielübungen) zeigen kausal g = 0,30 auf kognitive Tests (Bediou et al., 2023), mit Nicht-Replikationen (Boot et al., 2008); Green & Bavelier (2003) belegt Aufmerksamkeitseffekte echter Actionspiele, nicht einer kurzen Übung.
- **Alltagstransfer – fehlend:** Keine kontrollierte Studie zu Priorisierungsübungen → Spiel, Verkehr oder Beruf. „Brain-Training“ allgemein: viel Evidenz für die geübte Aufgabe, wenig für den Alltag (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand spielerisch Priorisieren, das Halten einer Reihenfolgeregel und gezieltes Tippen unter mäßigem Zeitdruck üben möchte; ein Farbtest ist nicht nötig, die Übung ist auch bei Farbsehschwäche lösbar.
- **Weniger passend, wenn …** reines Hemmtraining mit Zeitmessung gewünscht ist (102); ruhige, präzise Motorik im Vordergrund steht (705, 509).
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Die Dringlichkeit steckt in Form und Muster; die Farbe ist nur zusätzlich. Die Übung bleibt lösbar.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung arbeitet ohne Blitze und ohne Wackeln; Fehler erscheinen als weiches Kreuz. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005; Blitzgrenze von 3 pro Sekunde nach WCAG 2.2, Kriterium 2.3.1).
  - `gesichtsfeldausfall`: Ziele liegen im ganzen Feld; bei Gesichtsfeldeinschränkungen werden Ziele übersehen und die Runde verfällt. Ausfälle folgen dem Verlauf der Sehbahn (Muchnick, 2008, S. 32); neue Lücken, Doppelbilder oder plötzliche Sehverschlechterung sind ein Anlass für ärztliche Abklärung und kein Übungsthema (S. 6, 28).
  - `presbyopie_gleitsicht`: Ziele am ganzen Bildschirm; Zwischenbereichs- oder Bildschirmbrille bevorzugen, Gerät etwas tiefer halten.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: bewusst Pausen und Lidschlag einplanen (Patel et al., 1991; Sheppard & Wolffsohn, 2018).
  - `hand_arm_beschwerden`, `tremor_parkinson`: viele Tippbewegungen, aber große Trefferflächen.
- **Kombiniert gut mit …** 102 (Go/No-Go mit Zeitmessung), 202 (Wahlreaktion), 103 (visuelle Suche), 502 (Zielwechsel), 511 (Köder am Bildrand), 801 (periphere Reize).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette; 510 ist die einzige Übung mit Priorisieren mehrerer Ziele nach einer Regel. 511 teilt die Nicht-Tippen-Komponente, dort aber bei einem einzelnen, kurz sichtbaren Ziel unter Reaktionsdruck. Die Grundmechanik (Ziele antippen) entspricht 502 – dort ohne Reihenfolgeregel. Keine Diagnose, kein Seh- oder Farbtest; die Ergebnisse sagen nichts über das Sehvermögen aus.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Farbe allein** (WCAG 2.2, SC 1.4.1 verlangt ein zweites Merkmal): Rot = Dreieck/Raute mit Muster, Gelb = Kreis, Grün = Quadrat mit Häkchen; Helligkeit so wählen, dass die Stufen auch in Graustufen unterscheidbar sind; Test mit CVD-Simulation (Machado et al., 2009).
- **Tablet/Touch:** direktes Antippen statt Fadenkreuz; Ziele ≥ 1,5–2° (bei 11″-Tablet in 40 cm ≈ 55–70 CSS-px), größere Trefferzone gegen Fingerverdeckung; Touch-Latenzen einkalkulieren (Pronk et al., 2020).
- **Messung:** Zeit vom Rotwerden bis zum Treffer (Median), Fehlalarmrate Grün, Prioritätsfehler und verfallene Rote getrennt ausweisen; feste Rundendauer statt Zeitgutschrift, damit Ergebnisse vergleichbar sind; keine Ränge.
- **Hemmung gezielt:** Für echte Hemmanforderung eine Variante mit seltenen (≤ 20 %) und kurz erscheinenden Grün-Zielen bei schnellem Takt (Wessel, 2018); dazu die sichtbare Restzeit gelber Ziele (Ring), statt sie im Kopf mitzuführen.
- **Sicherheit:** kein rotes Vollflächen-Aufleuchten, kein Wackeln (Fehler als kleines Symbol am Ort); `prefers-reduced-motion` beachten (Fisher et al., 2005).
- **Sprache/Thema:** neutrale Rahmung („sammeln/meiden“ statt „Bedrohung/Friendly Fire“), DE/IT-Texte, Regeltext = Code.
- **Blickfit-Bezug:** „Stopp & Los“ deckt Go/No-Go mit Formkodierung ab; 510 würde es um Priorisieren mehrerer bewegter Ziele erweitern.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein für die Entscheidungslatenz-Tabelle (misst nur einfache Reaktion; der Drill misst gar keine Latenz), teilweise für den allgemeinen Messhinweis.
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Aufmerksamkeitsnetzwerke ja; Top-down-Filter auf die „gefährlichste Bedrohungsachse“ steht dort nicht; Inhalt über Sekundärquellen).
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Effekte echter Actionspiele, Replikation umstritten; kein Beleg für diesen Drill).
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431 (Erstveröffentlichung 1868). https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (c-Reaktion als Vorläufer von Go/No-Go; „schließt die Lücke zur taktischen Entscheidungspräzision“ ist Werbung).
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Farb-Pop-out ja; der Text beruft sich aber auf Filtermodelle von 1958/1964, nicht auf diese Arbeit; kein „aktives Abschwächen von Teamkollegen“).
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review, 91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Wettlaufmodell korrekt; die Übung ist aber kein Stop-Signal-Paradigma, neuronale Details nicht aus 1984).
- Nur im Text: Broadbent, D. E. (1958). *Perception and communication*. Pergamon (Buch; Crossref-Eintrag https://doi.org/10.1037/10037-000, Inhalt nicht eingesehen) und Treisman (1964) – mehrdeutig, z. B. Selective attention in man, *British Medical Bulletin, 20*(1), 12–16, https://doi.org/10.1093/oxfordjournals.bmb.a070274. **Stützt:** nein bzw. nur als Analogie (auditive Filtermodelle).

### Weitere Fachliteratur
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – kausal g = 0,30.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *JOSA A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – ≈ 8 % der Männer.
- Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica, 129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 – Nicht-Replikation.
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433 – Ziel-Ablenker-Ähnlichkeit.
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *JEP: LMC, 40*(4), 987–1001. https://doi.org/10.1037/a0036165 – kein Transfer von Hemmtraining.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize.
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – Wahlreaktion.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review, 25*(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – Alter und Go/No-Go.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung.
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Kriterien 1.4.1 (Farbe nicht als einziges Merkmal) und 2.3.1 (höchstens 3 Blitze pro Sekunde) (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Farbe nicht als einziges Merkmal (1.4.1), Blitzgrenze (2.3.1).
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – No-Go ≤ 20 %, Takt ≤ 1 500 ms.
- Wolfe, J. M. (2021). Guided Search 6.0: An updated model of visual search. *Psychonomic Bulletin & Review, 28*(4), 1060–1092. https://doi.org/10.3758/s13423-020-01859-9 – Prioritätskarte.
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – Zielbewegung: Primär- und Korrekturphase
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI '15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz 23–243 ms
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the "wild" with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – einfache Reaktionszeit ≈ 213–231 ms
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32), Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
