---
# ===== Kennung =====
nr: 804
kennung: speed-drill
name: "Schrumpfende Ziele schnell anklicken"
name_original: "Reaktionstest – Schrumpfende Ziele schnell und präzise treffen (Speed Drill; Seitentitel: Reaktionstest | Klickgeschwindigkeit & Zieltrainer)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "fitness"
quelle_url: "https://skilldrills.online/de/drills/physical/fitness/speed-drill"
blickfit_umsetzung: {kennung: "schrumpfende-ziele", name: "Schrumpfende Ziele", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/schrumpfende-ziele/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund erscheint immer genau ein gelber Kreis, der langsam durchs Feld driftet und dabei schrumpft. Man klickt ihn mit dem Maus-Fadenkreuz an, bevor er verschwindet – sofort erscheint der nächste an anderer Stelle. Mit den Punkten werden die Ziele schneller, kleiner und schrumpfen rascher. Trotz des Namens ist es keine Reaktionszeitmessung und keine Körperübung, sondern eine Maus-Zielaufgabe unter Zeitdruck."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo, zielbewegung_praezision]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das Level stufenlos mit den Punkten (Level = Punkte/1.750 + 1, sinkt nie). Startradius 32 → 21 px (Level 10) → 15 px (Level 15, min. 10 px), Tempo 120 → 291 → 376 px/s, Schrumpfen 10,8 → 25,5 → 32,7 px/s; Lebensdauer eines Ziels dadurch 2,6 → 0,66 → 0,34 s. Eine lange Trefferserie (ab 50) macht zusätzlich bis 25 % schneller, 20 % rascher schrumpfend und 15 % kleiner. Start 45 s, +2 s je Treffer (Zeitkonto max. 60 s), −1 s je Fehlklick oder erloschenem Ziel – die Rundendauer hängt von der Leistung ab."
messgroessen: ["Original: Punkte, Trefferquote (Treffer/(Treffer + Fehlklicks + erloschene Ziele)), Treffer, 'Best Reaction' (kürzeste Zeit Erscheinen→Treffer in ms), höchstes Level, maximale Combo, Note S+ bis F", "keine echte Reaktionszeit (Erscheinen→Treffer enthält Bewegung), keine Einzelwerte je Ziel", "sinnvoll: Median Erfassungszeit je Fitts-Index, Durchsatz (bit/s), Fehlklickrate, Treffer-Radius bei Klick, Vorhalt bei bewegten Zielen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 2
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 1
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (oder Touchpad) und Desktop-Browser mit Pointer-Lock; reine Touch-Geräte werden erkannt und nicht zugelassen", "sicheres Sehen im Bildschirmabstand über die ganze Spielfeldbreite (≈ 29° bei 24″ in 60 cm)", "Bereitschaft zu hohem Tempo ohne Pause zwischen den Zielen"]
vorsicht_bei: [presbyopie_gleitsicht, hand_arm_beschwerden, tremor_parkinson, photosensitive_epilepsie, migraene_lichtempfindlich, schwindel_vestibulaer, trockenes_auge_bildschirm, sehbehinderung_niedriger_visus, gesichtsfeldausfall, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["schnelle, gezielte Mausbewegungen zu wechselnden Orten (Zielerfassung, 'Flicks')", "Auge-Hand-Koordination mit langsam bewegten Zielen (≈ 3–15°/s)", "Abwägen von Tempo und Genauigkeit (früh klicken, solange das Ziel groß ist, aber ohne Fehlklick)", "Menschen, die Punktejagd und Serien (Combo) motivieren; Ergänzung zu Aim-Übungen 702/501"]
weniger_geeignet_fuer: ["Tablet ohne Maus (Original nicht spielbar)", "Einsteiger:innen, ältere oder langsame Personen (kein Absenken der Schwierigkeit, keine Pausen, Zeitdruck steigt automatisch)", "wer eine Reaktionszeitmessung erwartet ('Best Reaction' enthält Bewegungszeit)", "Menschen mit Hand-/Armbeschwerden bei schneller Mausarbeit", "echte Körper-, Sprung- oder Fitnessübung (trotz Unterkapitel 'fitness')"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Keine Studie zu diesem Spiel. Aim-Trainer-Kennwerte sind bei Erfahrenen zuverlässig und teils schon nach Tagen besser (Rogers et al., 2024); Übungseffekte in gerätegleichen Aufgaben sind groß, in unähnlichen klein (Guo et al., 2025). Transfer auf Spiele, Sport oder Alltag ist nicht untersucht."
aehnliche_uebungen: [702, 501, 508, 704, 104, 302, 802, 801, 805, 301]
stichworte: ["Zielerfassung", "schrumpfende Ziele", "bewegte Ziele", "Fitts'sches Gesetz", "Woodworth", "Flick", "Aim-Training", "Auge-Hand-Koordination", "Speed-Accuracy-Trade-off", "Maus", "Pointer-Lock", "Combo"]
---

# 804 · Schrumpfende Ziele schnell anklicken

> Original: „Reaktionstest – Schrumpfende Ziele schnell und präzise treffen“ (Speed Drill) – skilldrills.online,
> Kapitel Körper & Reflexe (`physical`, Unterkapitel `fitness`) · Blickfit: noch nicht umgesetzt (Baustein vorhanden: „Zielfang“ zu 104)

## 1. Kurzbeschreibung
Auf fast schwarzem Grund mit feinem Raster erscheint ein gelber, leuchtender Kreis mit weißem Mittelpunkt. Er driftet in eine zufällige Richtung, prallt am Rand ab und schrumpft stetig. Man bewegt das gelbe Fadenkreuz mit der Maus hinein und klickt; bei einem Treffer erscheint sofort ein neues Ziel an anderer Stelle. Treffer bringen Punkte und Zeit, Fehlklicks und erloschene Ziele kosten Zeit und die Serie. Obwohl die Übung im Kapitel „Körper & Reflexe“ unter „fitness“ steht und „Reaktionstest“ heißt, ist sie eine reine Maus-Zielaufgabe wie ein Aim-Trainer – ohne Körperbewegung und ohne echte Reaktionszeitmessung.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext (29.09.2026) und ausgelieferter Spielcode (Chunk 11157 mit Hilfsmodulen, formatiert gelesen). **[Code]** = aus dem Code, **[Herleitung]** = eigene Rechnung, sonst Regeltext.

- **Eingabe [Code]:** linke Maustaste; Pointer-Lock mit eigenem Fadenkreuz (Kreis 14 px Radius), Zeiger folgt `movementX/Y` × Empfindlichkeit. Pointer-Lock wird ohne „unadjustedMovement“ angefordert, die Mausbeschleunigung des Betriebssystems wirkt also mit. Reine Touch-Geräte (`pointer: fine` fehlt) werden erkannt und an die Startmaske gemeldet (in den Schwesterübungen 801–805: „Mouse Required for Pointer Lock“). Esc oder Verlassen des Pointer-Locks bricht ab. Countdown 3-2-1-GO (2,45 s).
- **Spielfeld [Code]:** Canvas im 16:9-Rahmen (mind. 460/500 px hoch, höchstens 88 % der Fensterhöhe, Seitenbreite max. ≈ 1.120 px), Logik in CSS-Pixeln. Auf einem 24″-FHD-Monitor sind das ≈ 31 × 17,5 cm ≈ 29° × 17° in 60 cm **[Herleitung]**.
- **Ziel [Code]:** immer genau eines; erscheint mind. 60 px vom Rand und möglichst ≥ 100 px vom Fadenkreuz (mittlerer Abstand ≈ 420 px **[Herleitung, Simulation]**). Startgeschwindigkeit 120 px/s × Tempofaktor in zufälliger Richtung, dazu eine zufällige konstante Beschleunigung (je Achse ± 25 px/s²) – die Bahn krümmt sich leicht. Abprall an einem 20-px-Rand. Radius sinkt um 18 px/s × Schrumpffaktor; bei ≤ 4 px erlischt das Ziel. Ein Ring um neue Ziele weitet sich 1,5 s lang auf. Farbe gelb (#eab308), ab Combo 10 hellblau – nur Rückmeldung, nicht entscheidungsrelevant.
- **Bildfrequenz [Code]:** Bewegung, Schrumpfen und Zeitkonto werden mit dt gerechnet (dt ≤ 0,1 s) – bildfrequenzunabhängig. Nur Partikel und Bildschirmwackeln laufen pro Bild (kosmetisch).
- **Level [Code]:** Level = Punkte/1.750 + 1 (stufenlos, sinkt nie), Fortschritt p = (Level − 1)/14; die Werte laufen exponentiell auf Grenzwerte zu (Tabelle **[Herleitung aus dem Code]**, ohne Combo-Zuschlag):

  | Level (Punkte) | Startradius | Tempo | Schrumpfen | Lebensdauer | Punkte je Treffer × Combo |
  |---|---|---|---|---|---|
  | 1 (0) | 32 px | 120 px/s | 10,8 px/s | 2,6 s | 100 |
  | 5 (7.000) | 27,5 px | 188 px/s | 16,6 px/s | 1,4 s | 114 |
  | 8 (12.250) | 23,5 px | 250 px/s | 22,0 px/s | 0,89 s | 125 |
  | 10 (15.750) | 20,8 px | 291 px/s | 25,5 px/s | 0,66 s | 132 |
  | 15 (24.500) | 15,3 px | 376 px/s | 32,7 px/s | 0,34 s | 150 |

  Combo-Zuschlag: Combo-Faktor in Stufen 1,1 (ab 3) … 1,5 (ab 10) … 2,0 (ab 20) … 3,0 (ab 50); er vervielfacht die Punkte und verschärft ab Combo 3 das Ziel (bei 50: Radius × 0,85, Tempo × 1,25, Schrumpfen × 1,2; Radius nie < 10 px).
- **Treffer [Code]:** Klick zählt, wenn der Abstand Fadenkreuz–Zielmitte ≤ aktueller Radius ist (kein Toleranzrand). +2 s (Zeitkonto max. 60 s), Combo + 1, sofort neues Ziel (keine Pause – der Zeitpunkt ist vorhersagbar, der Ort nicht).
- **Fehler [Code]:** Klick daneben oder Ziel erloschen → −1 s, Combo = 0, Bildschirmwackeln (12 px, abklingend) und – bei aktiven Effekten – ein rotes Overlay für 480 ms. Bei ausgeschaltetem „Timeout“ (Einstellung, Standard an) schrumpfen die Ziele nicht und erlöschen nie; durch die konstante Beschleunigung werden sie dann mit der Zeit schneller.
- **Rundendauer [Herleitung]:** Das Zeitkonto sinkt 1 s pro s; ab ≈ 0,5 Treffern/s ohne Fehler wächst es. In frühen Levels liegt es daher oft am 60-s-Deckel, die Runde dauert deutlich länger als 45 s und endet erst, wenn Lebensdauern unter die eigene Erfassungszeit fallen und Fehler überwiegen.
- **Auswertung [Code]:** Note nach 100 · √(Punkte/24.000): S+ ab ≈ 21.660, S ab ≈ 17.340, A ab 13.500, B ab 8.640, C ab 4.860, D ab 2.160 Punkten. „Best Reaction“ = kürzeste Zeit vom Erscheinen bis zum Treffer (Minimum, enthält Bewegungszeit). Gespeichert werden Rekord, beste Combo, bestes Level, Rundenzahl (localStorage).
- **Widersprüche Regeltext ↔ Code:** Seite „+0,6 s je Treffer“, Rundendauer „60–90 s“ – Code +2 s, Konto max. 60 s, Gesamtdauer offen; Seite „0,8 s bei aktiver Option“ – Code immer 1 s (die Strafoption wird mit „an“ überschrieben); Seite „45 px → 12 px“ – Code 32 → min. 10 px; Seite „Tempo 1,0 → 3,8×, Schrumpfen 0,6 → 2,2×“ – das sind Grenzwerte, bei Level 15 erst 3,1× bzw. 1,8×; Seite „100 Punkte × Multiplikator“ – zusätzlich Level-Faktor bis 1,5 (Level 15); Seite „Multiplikator steigt kontinuierlich“ – Code in Stufen. Die Notenstufen der Seite (Tier 1 ab 24.000, Tier 2 ab 17.000 …) weichen von der Code-Note ab. Die englische Regel im Spiel („+2s per hit, max 60s“) stimmt mit dem Code, die „0.8s“-Angabe nicht.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite nennt den Speed Drill ein „hochintensives neuromuskuläres Trainingssystem“ für E-Sportler (CS2, Valorant, Apex, Overwatch) und alle, die „Reaktionszeit und Fingerfertigkeit“ trainieren wollen. Begründet wird mit Woodworth (Anfangsimpuls überbrückt „etwa 75 %“ der Distanz), Fitts (Schwierigkeitsindex steigt beim Schrumpfen), Treisman (vorattentive Salienzkarte „im parietalen Kortex und Colliculus superior“ bereitet die Hand vor, „noch bevor der Blick fokussiert“), Lee (Tau: Restzeit aus der Schrumpfrate „verhindert überhastete Klicks“) und Woods et al. (144/240 Hz und 1.000-Hz-Mäuse → Latenz „unter 4 ms“). Empfohlen werden Claw-/Fingertip-Griff und 800–1.600 DPI. Eine Tabelle ordnet Punkte, Trefferquote und „Reaktionszeit < 160 ms“ Stufen wie „Top 0,1 % der E-Sport-Elite“ zu.

**Einordnung:**
- **Belegt:** Zielbewegungen bestehen aus schnellem Anfangsimpuls und rückmeldungsgesteuerter Korrektur (Elliott et al., 2001); kleinere Ziele erhöhen nach Fitts die Bewegungszeit logarithmisch (Fitts, 1954). Die Bildzeiten 16,7 ms (60 Hz) bzw. 4,2 ms (240 Hz) sind richtige Physik.
- **Nicht belegt oder falsch:** Die „75 %“ stehen nicht in den Quellen (auf 801/802 heißt es „85 %“); der Anfangsimpuls endet typischerweise *vor* dem Ziel (Lyons et al., 2006). Für bewegte Ziele gilt der klassische Fitts-Index nur eingeschränkt (Jagacinski et al., 1980; Hoffmann, 1991). Treismans Theorie betrifft die Suche zwischen Ablenkern – hier gibt es keine; passender ist Aufmerksamkeitsfang durch plötzliches Erscheinen (Yantis & Jonides, 1984). Der Blick geht der Hand normalerweise voraus (Neggers & Bekkering, 2000). Lees Tau betrifft Annäherung/Kollision; dass Menschen die Schrumpfrate so auswerten und dadurch weniger hastig klicken, ist nicht untersucht. „< 4 ms Latenz“: Woods et al. maßen allein für eine 1-kHz-Maus 6,8 ms, End-to-End-Latenzen im Browser lagen auf einem Testrechner bei ≈ 62–83 ms (Chrome/Firefox; Casiez et al., 2015). Zu Griff und DPI gibt es keine Quelle; in einer Messstudie wurden nur 6 von 13 verbreiteten Profi-Annahmen zu Zielen, Bewegung, Körper und Geräteeinstellungen bestätigt (Park et al., 2021).
- **Leistungsstufen ohne Datengrundlage:** Die Website sammelt nach eigener Angabe keine Daten. „< 160 ms“ für Erscheinen bis Treffer ist praktisch unerreichbar, da schon die einfache Reaktionszeit ohne Zielbewegung im Mittel 213–231 ms beträgt (Woods et al., 2015). Auch 24.000 Punkte (Level 15, Lebensdauer 0,34 s) sind nur mit langen Serien in frühen Levels erreichbar **[Herleitung]**.
- **„Körper & Reflexe / fitness“:** Es gibt keine Körperbewegung; „neuromuskulär“ ist Werbesprache für Mausarbeit.

## 4. Optische und okulomotorische Grundlagen
- **Reizgrößen [Herleitung]** (24″-FHD, 60 cm, ≈ 37,8 px/°): Ziel-Ø 64 px ≈ 1,7° (Level 1), ≈ 1,1° (Level 10), ≈ 0,8° (Level 15), Minimum 0,53°; kurz vor dem Erlöschen ≈ 0,2°. Die Ziele sind groß gegenüber der Sehschärfegrenze; die Sehschärfe begrenzt kaum, wohl aber das Treffen des schrumpfenden Randes. Kontrast gelb auf fast schwarz ist hoch; Farbe trägt keine Entscheidung (Farbsehschwäche unproblematisch).
- **Blickfolge:** Zieltempo 120 px/s (Level 1) bis ≈ 470 px/s (Level 15 mit langer Serie), Grenzwert ≈ 570 px/s, zuzüglich der leichten Beschleunigung **[Herleitung aus dem Code]** ≈ 3–15°/s – ein Bereich, in dem die glatte Folgebewegung gut funktioniert, der Gain aber unter 0,95 liegt und mit dem Tempo sinkt; Sakkaden ergänzen (Collewijn & Tamminga, 1984). Die leicht gekrümmten Bahnen und Randabpraller machen die Bewegung weniger vorhersagbar.
- **Sakkaden:** Jedes neue Ziel erscheint an einem anderen Ort (≈ 11° entfernt **[Herleitung]**); reguläre Sakkadenlatenzen liegen bei ≈ 180–250 ms und hängen kaum von der Zielentfernung ab (Darrien et al., 2001); sie stecken in jeder Erfassungszeit.
- **Peripherie:** Neue Ziele können bis ≈ 14° seitlich der aktuellen Blickposition auftauchen; der aufweitende Ring und das plötzliche Erscheinen machen sie auffällig. Echte Sehfeld-Anforderung ist gering (nahe Peripherie); da immer nur **ein** Ziel sichtbar ist, müssen Mitte und Umgebung nie gleichzeitig überwacht werden (nutzbares Sehfeld im Profil 0).
- **Brille:** Mit Gleitsichtgläsern ist der scharfe Zwischenbereich am Bildschirm nur ≈ 13–18° breit (Han et al., 2003) – Ziele am Spielfeldrand (≈ 29° Breite) liegen in der seitlichen Unschärfe, man muss den Kopf mitdrehen, was bei 0,3–0,9 s Lebensdauer Zeit kostet. Ab ≈ 40 J. reicht die Akkommodation für Naharbeit nicht mehr (Charman, 2008); eine Arbeitsplatzbrille für 50–70 cm ist günstiger. Bevorzugter Bildschirmabstand im Mittel 63 cm (Jaschinski, 2002).
- **Bildschirm:** Bewegungsunschärfe durch Halten des Bildes: 570 px/s ergeben ≈ 9–10 px Versatz pro Bild bei 60 Hz, ≈ 2 px bei 240 Hz **[Herleitung]** – schnellere Monitore verringern, „eliminieren“ aber nichts.

## 5. Neurowissenschaftliche Grundlagen
- **Entdecken:** Plötzlich erscheinende Reize ziehen Aufmerksamkeit an (Yantis & Jonides, 1984); exogene Aufmerksamkeit erreicht ihr Maximum nach ≈ 100–120 ms (Carrasco, 2011). Blick und Aufmerksamkeit werden dann gemeinsam auf das Ziel gerichtet; eine „Vorbereitung der Hand vor dem Blick“ ist nicht der typische Ablauf (Neggers & Bekkering, 2000).
- **Online-Korrektur:** Der hintere Parietalkortex ist an der Korrektur laufender Greifbewegungen beteiligt, wenn sich das Ziel verschiebt: TMS über dem linken PPC störte Korrekturen auf springende, nicht aber auf ruhende Ziele (Desmurget et al., 1999). Bei 804 bewegt sich das Ziel ständig – solche Korrekturen sind Teil jeder Erfassung.
- **Motorprogramm:** Schnelle Einzelbewegungen folgen einem zentral programmierten Muster aus Agonisten- und Antagonisten-Salven; Basalganglien skalieren die erste Salve, das Kleinhirn trägt zum Timing bei (Berardelli et al., 1996). Dass das Spiel den „motorischen Kortex“ zwingt, sensorische Schleifen zu „überbrücken“, ist nicht belegt – visuelle Rückmeldung wird schon bei Bewegungen < 190 ms genutzt (Zelaznik et al., 1983).
- Aussagen wie „trainiert Colliculus superior/Tektum“ haben keinen Beleg für dieses Spiel.

## 6. Motorische Grundlagen
- **Zwei Phasen:** schneller Anfangsimpuls + Korrektur (Elliott et al., 2001); der Impuls endet meist knapp vor dem Ziel, weil Überschießen teurer ist (Lyons et al., 2006).
- **Fitts'sches Gesetz [Herleitung]:** Bei mittlerem Abstand ≈ 420 px ergibt die Shannon-Form log₂(D/W + 1) ≈ 2,9 bit (Level 1, W = 64 px), ≈ 3,5 bit (Level 10), ≈ 3,9 bit (Level 15), ≈ 4,5 bit (Minimum). Da das Ziel während der Bewegung schrumpft, ist die wirksame Breite beim Klick kleiner: bei ≈ 0,5–0,9 s Erfassungszeit auf Level 5 noch ≈ 13–19 px Radius, auf Level 10 (Lebensdauer 0,66 s) nur ≈ 5–8 px **[Herleitung aus Startradius und Schrumpfrate]**. Das sind die kleinsten wirksamen Ziele der Gruppe 801–805 (zum Vergleich Trefferradius 801: ≈ 20–26 px, Kugelradius 802: 12–28 px, Fangbereich 805: 14–23 px) – deshalb ist Zielgenauigkeit hier Kern der Übung (Profil 3), und der Zeiger darf beim Klick nicht verrutschen (ruhige Hand als Nebenrolle).
- **Bewegte Ziele:** Der klassische Fitts-Index sagt Erfassungszeiten bewegter Ziele schlecht voraus (Jagacinski et al., 1980); ein Modell mit Positionsfehler, der die wirksame Zielbreite verkleinert, passt gut und sagt eine kritische Geschwindigkeit voraus, oberhalb derer ein Ziel nicht mehr erfasst werden kann (Hoffmann, 1991). Für das zeitliche Treffen schneller Ziele integriert man mehrere visuelle Hinweise (Lee et al., 2018).
- **Tempo gegen Genauigkeit:** Frühes Klicken lohnt sich (Ziel noch groß), ein Fehlklick kostet aber 1 s und die Serie – ein klassischer Speed-Accuracy-Trade-off; ein Zögern zum Zielen „auf Sicherheit“ wird durch das Schrumpfen bestraft.
- **Zeitbudget [Herleitung, Schätzung]:** Reaktion (≈ 213–231 ms, Woods et al., 2015) + Sakkade + Bewegung ergeben realistisch ≈ 0,5–0,9 s je Ziel. Ab Level ≈ 8–10 (Lebensdauer ≤ 0,9 s) erlöschen daher viele Ziele; dort endet die Runde meist.
- **Eingabegerät:** Mit Touchpad sind alle Altersgruppen langsamer und fehleranfälliger als mit Maus, Ältere besonders (Hertzum & Hornbæk, 2010). Am Touchscreen war die Bewegungszeit Älterer über vier Aufgaben (u. a. Zeigen) um 35 % kürzer als mit Maus, bei Jüngeren um 16 % (Findlater et al., 2013); bei kleinen Zielen begrenzt aber die absolute Fingerpräzision (Bi et al., 2013), und ein Großteil der Touch-Ungenauigkeit entsteht durch Versatz zwischen gemeintem und gemeldetem Punkt (Holz & Baudisch, 2010). Die mitwirkende Betriebssystem-Mausbeschleunigung **[Code]** macht Bewegungsamplituden weniger konstant.
- Fingerklickgeschwindigkeit im Sinne schneller Tippfolgen ist nicht gefordert (ein Klick je Ziel), trotz „Klickgeschwindigkeit“ im Titel.

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** einfache Reaktionszeit +0,55 ms je Lebensjahr (Woods et al., 2015); Ältere bewegen sich langsamer und variabler (Ketcham et al., 2002). Die Übung passt sich nicht nach unten an – Ältere erreichen niedrigere Level und kürzere Runden.
- **Gerät:** End-to-End-Latenz ≈ 62–83 ms in Chrome/Firefox auf einem Testrechner, Browser +15–20 ms gegenüber nativer App (Casiez et al., 2015) liegt in der Größenordnung der Stufenunterschiede der Website. Radien und Tempo sind in CSS-Pixeln – physische Größe und Sehwinkel hängen von Bildschirm, Zoom und Abstand ab; die Spielfeldgröße vom Browserfenster. Empfindlichkeit und Mausbeschleunigung verändern die nötige Handbewegung.
- **Zufall:** Abstand zum nächsten Ziel (≥ 100 px bis Feldbreite) und Bahn schwanken stark; die Punkte hängen nichtlinear von der Serie ab (Combo-Faktor bis 3,0). Punkte sind daher ein grobes, streuendes Maß.
- **„Best Reaction“** ist ein Einzel-Minimum aus Erscheinen→Treffer, also ein Extremwert mit Bewegungsanteil – als Reaktionszeit nicht verwendbar.
- **Zuverlässigkeit:** Für vergleichbare Aim-Aufgaben (KovaaK's) lagen die ICC bei 0,947–0,995, allerdings bei 10 erfahrenen Spieler:innen (Rogers et al., 2024) – für dieses Spiel nicht geprüft.
- **Übungseffekt, Müdigkeit:** Vertrautheit mit Gerät und Aufgabe verbessert Werte schnell; lange Runden mit schnellen Mausbewegungen ermüden Hand und Augen.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Zielaufgaben verbessern sich mit Übung; bei Erfahrenen zeigte sich zwischen zwei Terminen (3–5 Tage) nur in einer von vier Aufgaben (Macro Flicking) eine signifikante Verbesserung (Rogers et al., 2024). Eine Studie zu diesem Spiel fehlt.
- **Naher Transfer (schwach):** Digitale Seh-/Reaktionstrainings zeigen große Effekte nur in ähnlichen Testaufgaben (Reaktionszeit SMD 2,66), in unähnlichen kleine (SMD 0,50) (Guo et al., 2025). „Brain Training“ allgemein: gute Evidenz für die geübte, wenig für entfernte Aufgaben (Simons et al., 2016).
- **Alltagstransfer (fehlend):** Kein Nachweis, dass das Spiel Leistungen in Shootern, Sport oder Alltag verbessert. Profis unterscheiden sich von Amateuren in einzelnen Zielkennwerten (Park et al., 2021), das ist aber kein Trainingsbeleg. Einfache Reaktionszeit unterscheidet sich zwischen Sportler:innen und Nichtsportler:innen nicht (Kida et al., 2005).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** schnelle Maus-Zielbewegungen, Auge-Hand-Koordination mit langsam bewegten Zielen und Tempo-Genauigkeits-Abwägung geübt werden sollen; bei Gamer:innen oder Menschen, die kurze, motivierende Punktejagden mögen; als Steigerung nach 702 (ruhende Ziele) oder 104 (bewegtes Ziel).
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist, ruhiges Tempo oder Pausen nötig sind, eine Reaktionszeit gemessen werden soll (besser 101/301) oder Körperbewegung gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Ziele über ≈ 29° Breite, scharfer Gleitsicht-Zwischenbereich nur 13–18°; Arbeitsplatzbrille, kleineres Spielfeld.
  - `hand_arm_beschwerden`: Dauer der Mausnutzung hängt mit Hand-Arm-Beschwerden zusammen (IJmker et al., 2007); Runden können sich auf mehrere Minuten verlängern.
  - `tremor_parkinson`: kleine, schrumpfende Ziele und Fehlklickstrafe; Zittern führt zu Fehlklicks.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: rotes Fehler-Overlay (480 ms) und Bildschirmwackeln; jeder Fehler startet ein eigenes Overlay; bei schnellen Fehlklickfolgen oder ab Level 15 (Lebensdauer ≤ 0,34 s) sind mehr als 3 rote Blitze/s denkbar (nicht gemessen) (WCAG-Grenze 3/s, W3C, 2024; Risikobereich 15–25 Hz, Fisher et al., 2005). Effekte abschalten – laut Code entfällt damit nur das rote Overlay, das Wackeln bleibt.
  - `schwindel_vestibulaer`: bei jedem Fehler wackelt das ganze Spielfeld (12 px, abklingend, nicht abschaltbar); bei Fehlerserien wiederholte großflächige Bildbewegung.
  - `trockenes_auge_bildschirm`: pausenlose Zielfolge mit konzentriertem Starren; Runden können sich auf mehrere Minuten verlängern – Pausen und bewusstes Blinzeln einplanen.
  - `sehbehinderung_niedriger_visus`: Zielränder bei 0,5–0,8° und Erlöschen bei 0,2° – Ziele größer darstellen.
  - `gesichtsfeldausfall`: neue Ziele erscheinen an beliebiger Stelle bis ≈ 14° seitlich; bei Ausfällen einer Seite werden sie spät entdeckt und erlöschen – kein Test des Gesichtsfelds, ggf. kleineres Spielfeld.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: pausenlose Zielfolge, steigender Zeitdruck ohne Absenken, Strafe für jeden Fehlklick.
  - Keine Sturz- oder Herz-Kreislauf-Vorsicht nötig (keine Körperbewegung).
- **Kombiniert gut mit …** 702 (ruhende Ziele, Präzision), 104 (bewegtes Ziel abfangen), 501/508 (Flick/Erstschuss), 302 (mehrere Ziele), 805 (Abbremsen am Ziel).
- **Abgrenzung innerhalb 801–805:** keine echte Dublette, aber **801, 802 und 804 teilen dieselbe Spiel-Engine** (Level = Punkte/1.750 + 1, +2 s/−1 s-Zeitkonto, gleiche Combo-Stufen und Note) und ein ähnliches Profil. 804 unterscheidet sich durch **genau ein Ziel zugleich** (keine geteilte Aufmerksamkeit, kein nutzbares Sehfeld, keine Farbregel) und die **kleinsten, schrumpfenden Ziele** (Zielgenauigkeit 3, bei 801/802 nur 2). Es ist damit die klassische Aim-Aufgabe der Gruppe und steht 702 (Motorik) näher als 801/802. 803 und 805 kommen ohne Klick aus. Die drei Engine-Geschwister nicht als „Abwechslung“ hintereinander vorschlagen.
Keine Diagnosen, keine Heilversprechen; Punkte und Noten sind keine Normwerte.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet/Touch:** Original sperrt Touch. Umsetzung mit direktem Tippen: Trefferfläche größer als das sichtbare Ziel (vgl. FFitts, Bi et al., 2013), Minimalgröße in mm statt px, kein Fadenkreuz; Touch-Latenz berücksichtigen. „Zielfang“ (zu 104) bietet bereits dt-Bewegung, Treffer-Toleranz und Treppenverfahren.
- **Adaptiv statt nur steigend:** Level sinkt nie, keine Einstiegsstufe. Besser Treppenverfahren (z. B. Lebensdauer oder Radius), Pausen von 250–500 ms zwischen Zielen mit leicht variablem Zeitpunkt.
- **Messqualität:** je Ziel Abstand, Radius, Erfassungszeit, Treffer/Fehler speichern; Median und Durchsatz statt Minimum; Reaktion (erste Zeigerbewegung) und Bewegungszeit trennen; Größen in Grad bei bekanntem Abstand.
- **Konsistenz:** Regeltext (0,6 s/0,8 s, 45 → 12 px) an den Code anpassen; Strafoption tatsächlich abschaltbar machen.
- **Sicherheit/Barrierefreiheit:** rote Fehlerblitze auf ≤ 3/s begrenzen oder durch ruhige Markierung ersetzen, Bildschirmwackeln abschaltbar; Farbe bleibt nicht entscheidungsrelevant (gut für Farbsehschwäche).
- **Ehrliche Texte:** keine „Top 0,1 %“-Stufen, keine „Reaktionszeit“ für Erscheinen→Treffer, nicht als Körper-/Fitnessübung einordnen.

## 11. Quellen
### Von der Website angegeben
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements*, 3(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt die Aussage der Website:** teilweise – Zwei-Komponenten-Modell ja, „75 % der Distanz“ und „Abbremsphase minimieren“ nicht belegt; Impulse enden eher vor dem Ziel (Lyons et al., 2006).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – ID steigt mit kleinerem Ziel (ja, für ruhende Ziele); die Ziele bewegen sich aber, dann gilt der Index nur eingeschränkt (Jagacinski et al., 1980; Hoffmann, 1991). Größenangaben 45 → 12 px stimmen nicht mit dem Code (32 → 10 px).
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, 12(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – Theorie der Merkmalssuche zwischen Ablenkern; hier gibt es keine Ablenker, Colliculus/Parietalkortex und „Hand vor dem Blick“ stehen nicht in der Arbeit.
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception*, 5(4), 437–459. https://doi.org/10.1068/p050437 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** nein – betrifft Annäherung und Bremsen; Übertragung auf schrumpfende Bildschirmziele und „verhindert überhastete Klicks“ ist nicht untersucht.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise/nein – Studie zu Reaktionszeit-Komponenten; Bildzeiten sind Physik, nicht aus Woods; gemessen wurden 6,8 ms für eine 1-kHz-Maus und bis 100 ms Gesamtverzögerung, nicht „unter 4 ms“.

### Weitere Fachliteratur
- Berardelli, A., Hallett, M., Rothwell, J. C., Agostino, R., Manfredi, M., Thompson, P. D., & Marsden, C. D. (1996). Single-joint rapid arm movements in normal subjects and in patients with motor disorders. *Brain*, 119(2), 661–674. https://doi.org/10.1093/brain/119.2.661 – dreiphasiges EMG, Rolle von Basalganglien/Kleinhirn
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '13)* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – absolute Fingerpräzision bei kleinen Touch-Zielen
- Carrasco, M. (2011). Visual attention: The past 25 years. *Vision Research*, 51(13), 1484–1525. https://doi.org/10.1016/j.visres.2011.04.012 – Zeitverlauf exogener Aufmerksamkeit
- Casiez, G., Conversy, S., Falce, M., Huot, S., & Roussel, N. (2015). Looking through the eye of the mouse: A simple method for measuring end-to-end latency using an optical mouse. In *Proceedings of UIST '15* (S. 629–636). ACM. https://doi.org/10.1145/2807442.2807454 – End-to-End-Latenz im Browser ≈ 62–83 ms (Testrechner, 2015)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Alterssichtigkeit
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology*, 351, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain < 0,95, sinkt mit Tempo
- Darrien, J. H., Herd, K., Starling, L.-J., Rosenberg, J. R., & Morrison, J. D. (2001). An analysis of the dependence of saccadic latency on target position and target characteristics in human subjects. *BMC Neuroscience*, 2, 13. https://doi.org/10.1186/1471-2202-2-13 – Sakkadenlatenz ≈ 180–250 ms (Personen-Mittelwerte ≈ 181–200 ms), unabhängig von der Zielentfernung
- Desmurget, M., Epstein, C. M., Turner, R. S., Prablanc, C., Alexander, G. E., & Grafton, S. T. (1999). Role of the posterior parietal cortex in updating reaching movements to a visual target. *Nature Neuroscience*, 2(6), 563–567. https://doi.org/10.1038/9219 – Parietalkortex und Online-Korrektur (TMS)
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin*, 127(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Findlater, L., Froehlich, J. E., Fattal, K., Wobbrock, J. O., & Dastyar, T. (2013). Age-related differences in performance with touchscreens compared to traditional mouse input. In *Proceedings of CHI '13* (S. 343–346). ACM. https://doi.org/10.1145/2470654.2470703 – Touch vs. Maus bei Älteren
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize und Anfallsrisiko
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, 16, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer ähnlich vs. unähnlich
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science*, 44(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Hertzum, M., & Hornbæk, K. (2010). How age affects pointing with mouse and touchpad: A comparison of young, adult, and elderly users. *International Journal of Human-Computer Interaction*, 26(7), 703–734. https://doi.org/10.1080/10447318.2010.487198 – Alter und Eingabegerät
- Hoffmann, E. R. (1991). Capture of moving targets: A modification of Fitts' law. *Ergonomics*, 34(2), 211–220. https://doi.org/10.1080/00140139108967307 – Fitts für bewegte Ziele, kritische Geschwindigkeit
- Holz, C., & Baudisch, P. (2010). The generalized perceived input point model and how to double touch accuracy by extracting fingerprints. In *Proceedings of CHI '10* (S. 581–590). ACM. https://doi.org/10.1145/1753326.1753413 – Ursachen der Touch-Ungenauigkeit
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine*, 64(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausdauer und Hand-Arm-Beschwerden
- Jaschinski, W. (2002). The proximity-fixation-disparity curve and the preferred viewing distance at a visual display as an indicator of near vision fatigue. *Optometry and Vision Science*, 79(3), 158–169. https://doi.org/10.1097/00006324-200203000-00010 – bevorzugter Bildschirmabstand 63 cm
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors*, 22(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B*, 57(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Zielbewegungen im Alter
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research*, 22(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – einfache Reaktionszeit Sportler vs. Nichtsportler
- Lee, B., Kim, S., Oulasvirta, A., Lee, J.-I., & Park, E. (2018). Moving target selection: A cue integration model. In *Proceedings of CHI '18* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173804 – zeitliche Auswahl bewegter Ziele
- Lyons, J., Hansen, S., Hurding, S., & Elliott, D. (2006). Optimizing rapid aiming behaviour: Movement kinematics depend on the cost of corrective modifications. *Experimental Brain Research*, 174(1), 95–100. https://doi.org/10.1007/s00221-006-0426-6 – Unterschießen des Ziels
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology*, 83(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick-Hand-Kopplung
- Park, E., Lee, S., Ham, A., Choi, M., Kim, S., & Lee, B. (2021). Secrets of Gosu: Understanding physical combat skills of professional players in first-person shooters. In *Proceedings of CHI '21* (S. 1–14). ACM. https://doi.org/10.1145/3411764.3445217 – nur 6 von 13 Profi-Annahmen belegt
- Rogers, E. J., Trotter, M. G., Johnson, D., Desbrow, B., & King, N. (2024). KovaaK's aim trainer as a reliable metrics platform for assessing shooting proficiency in esports players: A pilot study. *Frontiers in Sports and Active Living*, 6, 1309991. https://doi.org/10.3389/fspor.2024.1309991 – Zuverlässigkeit von Aim-Kennwerten
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, 17(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI; Blitzgrenze 3/s
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance*, 10(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – Aufmerksamkeitsfang durch plötzliches Erscheinen
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior*, 15(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – visuelle Rückmeldung < 190 ms
