---
# ===== Kennung =====
nr: 802
kennung: drop-catch
name: "Fallende Kugeln fangen – Grün anklicken, Rot durchlassen"
name_original: "Lineal-Falltest & Drop Catch – Fallende Ziele fangen, rote Fallen meiden (Seitentitel: Lineal-Falltest online | Reaktionszeit messen)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "reflex-training"
quelle_url: "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Von oben fallen grüne und rote Kugeln (rote mit weißem X) über den Bildschirm. Man fängt die grünen per Mausklick ab, bevor sie unten verschwinden, und lässt die roten fallen – mit jedem Level fallen die Kugeln schneller, dichter und häufiger rot. Trotz des Namens ist es kein Lineal-Falltest, sondern eine Maus-Abfangaufgabe mit Go/No-Go-Regel."
ziel_funktionen: [antizipation, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das Level stufenlos mit den Punkten (Level = Punkte/1.750 + 1). Grundtempo 400 → ≈ 1.047 px/s bei Level 15 (Grenzwert 1.250 px/s), Abstand neuer Kugeln 0,8 → 0,36 s, Rot-Anteil 15 → 40 % (max. 45 %), Kugelradius 28 → 17 px (min. 12 px). Eine hohe Combo macht zusätzlich bis 25 % schneller, 25 % dichter und 15 % kleiner. Start 45 s, +2 s je Fang (höchstens 60 s), −1 s je Fehler – die Rundendauer hängt daher von der Leistung ab."
messgroessen: ["Original: Punkte, Level, maximale Combo, Fänge, verpasste Grüne, angeklickte Rote, Trefferquote (ohne Klicks ins Leere), Spitzentempo, Note S+ bis F", "keine Reaktionszeit (obwohl die Seite Stufen nach Wahlreaktionszeit angibt)", "sinnvoll: Fangquote je Tempo in °/s, Fehlalarmrate bei Rot, zeitlicher Fehler zu früh/zu spät in ms, d′"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 2
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 2
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 3
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 1
    ruhige_hand: 0
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
voraussetzungen: ["Maus oder Touchpad (Original sperrt reine Touch-Geräte: 'Mouse Required for Pointer Lock')", "Rot und Grün unterscheiden oder das kleine weiße X auf roten Kugeln erkennen", "Pointer-Lock-fähiger Desktop-Browser"]
vorsicht_bei: [farbsehschwaeche, presbyopie_gleitsicht, hand_arm_beschwerden, tremor_parkinson, photosensitive_epilepsie, migraene_lichtempfindlich, schwindel_vestibulaer, trockenes_auge_bildschirm, gesichtsfeldausfall, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["bewegte Ziele vorausschauend abfangen (Zeitpunkt und Ort abschätzen) unter Tempo", "schnelle Zielbewegungen mit der Maus über das ganze Spielfeld", "Handeln nur auf ein Merkmal (Grün) und Zurückhalten beim anderen (Rot) in einer spielerischen, dynamischen Form", "Personen, die Abwechslung und Punktejagd motiviert"]
weniger_geeignet_fuer: ["Tablet ohne Maus (Original nicht spielbar)", "Rot-Grün-Farbsehschwäche (Hauptmerkmal ist die Farbe, Formhinweis sehr klein)", "Einsteiger:innen, ältere oder langsame Personen, die ruhiges Tempo brauchen (Tempo und Rot-Anteil steigen automatisch, kein Absenken)", "wer eine echte Reaktionszeit- oder Lineal-Falltest-Messung erwartet"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Keine Studie zu diesem Spiel; Übungseffekte in gerätegleichen Bildschirmaufgaben sind regelmäßig groß, in unähnlichen klein (Guo et al., 2025). Go/No-Go- und Stop-Signal-Training war einer aktiven Kontrolle nicht überlegen und ohne Transfer (Enge et al., 2014); Alltag-/Sport-Transfer ist nicht untersucht."
aehnliche_uebungen: [801, 104, 805, 102, 804, 302, 803, 515]
stichworte: ["Interzeption", "Abfangen bewegter Ziele", "Go/No-Go", "Reaktionshemmung", "Auge-Hand-Koordination", "Lineal-Falltest (nur Name)", "Farbsignal Rot/Grün", "Maus", "Pointer-Lock", "Combo"]
---

# 802 · Fallende Kugeln fangen – Grün anklicken, Rot durchlassen

> Original: „Lineal-Falltest & Drop Catch“ – skilldrills.online, Kapitel Körper & Reflexe (`physical`, Unterkapitel `reflex-training`) ·
> Blickfit: noch nicht umgesetzt (Bausteine vorhanden: „Zielfang“ zu 104, „Stopp & Los“ zu 102)

## 1. Kurzbeschreibung
Auf dunklem Grund fallen Kugeln von oben nach unten, an zufälliger Stelle über die Breite verteilt. Grüne Kugeln klickt man mit dem Fadenkreuz an („fangen“), rote Kugeln mit weißem X lässt man durchfallen. Jeder Fang bringt Punkte und Zeit, jeder Fehler kostet Zeit und setzt die Combo zurück. Mit steigenden Punkten wird alles schneller, dichter und öfter rot. Der Titel „Lineal-Falltest“ ist irreführend: Es wird kein Lineal gegriffen, keine Fallstrecke gemessen und keine Reaktionszeit ausgegeben – geübt wird das Abfangen bewegter Bildschirmziele mit Go/No-Go-Regel. Trotz Kapitelname **keine Körperübung**, sondern ein Maus-Spiel.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext (29.09.2026) und ausgelieferter Spielcode (Chunk 25193 + Hilfsmodule in 97313, formatiert gelesen). **[Code]** = aus dem Code, sonst Regeltext.

- **Eingabe [Code]:** Mausklick (linke Taste) mit Pointer-Lock und eigenem Fadenkreuz (Kreis 14 px Radius); Empfindlichkeit 0,1–3 (Standard 1). Ohne Pointer-Lock wird die Zeigerposition direkt übernommen. Reine Touch-Geräte (`pointer: fine` fehlt) sehen statt des Startknopfs „Mouse Required for Pointer Lock“. Esc oder Verlassen des Pointer-Locks bricht die Runde ab. Countdown 3-2-1-GO (2,45 s).
- **Spielfeld [Code]:** Canvas im 16:9-Rahmen (mind. 460/500 px hoch, höchstens 88 % der Fensterhöhe), Logik in CSS-Pixeln. Kugeln starten 50 px oberhalb des Rands bei x = 60 … Breite − 60 px.
- **Bewegung [Code]:** Jede Kugel fällt mit **konstanter** Geschwindigkeit (`y += Tempo · dt`, dt ≤ 0,1 s) – keine Schwerkraft, keine Beschleunigung. Tempo je Kugel = Grundtempo ± 7,5 %. Die Bewegung ist bildfrequenzunabhängig; nur Partikel und Bildschirmwackeln laufen pro Bild (rein kosmetisch).
- **Level [Code]:** Level = Punkte/1.750 + 1 (stufenlos), Fortschritt p = (Level − 1)/14; Kurven laufen exponentiell auf Grenzwerte zu (Werte **[Herleitung aus dem Code]**):

  | Level | Grundtempo | Abstand neuer Kugeln | Rot-Anteil | Radius |
  |---|---|---|---|---|
  | 1 | 400 px/s | 0,80 s | 15 % | 28 px |
  | 5 | 572 px/s | 0,68 s | 22 % | 25 px |
  | 10 | 834 px/s | 0,50 s | 31 % | 21 px |
  | 15 (≈ 24.500 Punkte) | 1.047 px/s | 0,36 s | 40 % | 17 px |
  | 20 | 1.149 px/s | 0,29 s | 45 % | 16 px |

  Eine hohe Combo verschärft zusätzlich: Tempo bis × 1,25, Abstand bis × 0,75 (min. 0,18 s), Radius bis × 0,85 (min. 12 px). Höchstes mögliches Kugeltempo ≈ 1.250 × 1,25 × 1,075 ≈ 1.680 px/s.
- **Treffer [Code]:** Klick zählt, wenn der Abstand Fadenkreuz–Kugelmitte ≤ Radius ist (kein Toleranzrand). Grün: +2 s (Zeitkonto höchstens 60 s), Combo + 1, Punkte = 100 × Combo-Faktor × (1 + 0,5 · p). Der Combo-Faktor steigt **in Stufen** (1,1 ab 3 Fängen, 1,25 ab 5, 1,35 ab 7, 1,5 ab 10, 1,75 ab 15, 2,0 ab 20, 2,5 ab 30, 3,0 ab 50). Ab Combo 10 wechselt Grün auf ein helleres Grün (#34d399).
- **Fehler [Code]:** Rote Kugel angeklickt, grüne unten verpasst **oder Klick ins Leere** → −1 s, Combo = 0, Bildschirmwackeln (12 px, abklingend) und – sofern Effekte aktiv – ein rotes Overlay für 480 ms. Ein knapp verfehlter Klick auf eine grüne Kugel wird so doppelt bestraft (Leerklick, später Verpassen).
- **Rundendauer [Herleitung]:** Das Zeitkonto sinkt 1 s pro s, steigt aber 2 s je Fang. Bei Level 1 (≈ 1,06 grüne Kugeln/s) reicht eine Fangquote von ≈ 65 %, bei Level 15 (≈ 1,67 grüne/s) von ≈ 53 %, damit die Runde nicht endet. Gute Spieler:innen spielen daher weit über 45 s; die Runde endet erst, wenn die Fehler überwiegen.
- **Auswertung [Code]:** Trefferquote = Fänge/(Fänge + Verpasste + angeklickte Rote); Leerklicks fehlen in der Quote. Note nach 100 · √(Punkte/24.000): S+ ab ≈ 21.660, S ab ≈ 17.340, A ab 13.500, B ab 8.640, C ab 4.860, D ab 2.160 Punkten. Gespeichert werden Rekord, beste Combo, bestes Level, Anzahl Runden (localStorage).
- **Widersprüche Regeltext ↔ Code:** Seite „+0,6 s je Fang“ – Code +2 s (bis 60 s); Seite „0,8 s Strafe bei aktiver Option“ – Code immer 1 s, keine Option, auch für Leerklicks; Seite „beschleunigen unter Erdbeschleunigung (s = ½gt²)“ – Code konstant; Seite „Multiplikator steigt kontinuierlich“ – Code in Stufen; Notenstufen der Seite (S ab 24.000, A ab 17.000 …) weichen von der Code-Note ab. Die englischen Regeln im Spiel („+2s per catch, max 60s“, „clicking empty space … deducts 1s“) stimmen mit dem Code überein.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite verspricht die „digitale Messung des Lineal-Falltests“ für Sportler:innen und Schüler:innen sowie „Schussdisziplin“ für E-Sport. Begründet wird mit Lees Tau-Theorie (Gehirn liest die retinale Expansionsrate), Logans Rennmodell (präfrontales „Veto“ „auf Spitzensport-Niveau“), Donders' „Typ-C-Wahlreaktion“, Woodworth/Fitts („85 % der Distanz ballistisch“) und Woods et al. 2015 (144/240 Hz für „verzögerungsfreie Reizdifferenzierung“). Eine Tabelle ordnet Punkte und „Wahlreaktionszeit < 190 ms / > 95 %“ Stufen wie „Top 0,1 % Niveau von Kampfpiloten“ zu. Empfohlen wird, den Blick im oberen Drittel zu halten und Farben „in den ersten 50 ms“ zu klassifizieren.

**Einordnung** (Prüftabelle der Literaturbasis, ergänzt um den Code):
- **Kein Lineal-Falltest.** Beim echten Test fällt ein Stab frei; aus der Fallstrecke d folgt t = √(2d/g), z. B. 20 cm ≈ 202 ms **[Herleitung]**. Der Stabtest ergab bei Football-Spielern 203 ± 20 ms, eine Computer-Messung 268 ± 44 ms, Korrelation nur r = 0,445 (Eckner et al., 2010). Das Spiel misst gar keine Reaktionszeit.
- **Keine Schwerkraft, kein Tau.** Die Kugeln fallen gleichförmig **[Code]** und vergrößern sich nicht; Lees Tau betrifft das Annähern, also Bildvergrößerung (Lee, 1976). Selbst bei beschleunigten Bildschirmzielen timen Menschen einen Mausklick wie bei gleichförmiger Bewegung (Zago et al., 2004); Beschleunigung wird bei der Kontaktzeitschätzung kaum verrechnet (Benguigui & Bennett, 2010).
- **Donders „Typ C“** entspricht dem Go/No-Go-Prinzip (Gomez et al., 2007) – das passt zur Rot-Regel; „Wahlreaktion“ wäre dagegen Donders' b-Reaktion. Das **Rennmodell** (Logan & Cowan, 1984) gilt für das Abbrechen einer begonnenen Handlung (Stop-Signal); hier entscheidet man vor dem Klick. Eine echte Steigerung der Hemmfähigkeit durch solches Training ist nicht belegt (Enge et al., 2014).
- **„Farben in 50 ms“** ist unrealistisch: Schon die reine Entdeckungszeit wurde auf im Mittel 131 ms geschätzt (einfache Reaktionszeit minus Bewegungsanlaufzeit; Woods et al., 2015). **„85 % ballistisch“** steht weder bei Woodworth noch bei Fitts. **Woods et al.** untersuchen keine Bildwiederholraten; die Rechnung 20,8 px pro Bild bei 60 Hz ist aber richtig (1.250/60).
- **Stufen „Top 0,1 %“, „Kampfpiloten“, „< 190 ms“: keine Datengrundlage** – die Seite erklärt selbst, keine Nutzerdaten zu sammeln, und das Spiel erfasst keine Reaktionszeiten. Gesundheits- oder Leistungsversprechen lassen sich daraus nicht ableiten.

## 4. Optische und okulomotorische Grundlagen
- **Reizgröße [Herleitung]** (24″-FHD, 60 cm, ≈ 37,8 px/°): Kugel-Ø 56 px ≈ 1,5° (Level 1), 35 px ≈ 0,9° (Level 15), min. 24 px ≈ 0,6°. Sehschärfe begrenzt kaum – außer beim Formhinweis: Das X ist bei 14 px Radius nur ≈ 10 px (≈ 0,26°) groß, Strichstärke 2 px ≈ 3′, und es bewegt sich.
- **Tempo [Herleitung]:** 400 px/s ≈ 11°/s, 1.047 px/s ≈ 28°/s, bis ≈ 44°/s. Der Folge-Gain liegt stets unter 0,95 und sinkt mit dem Tempo; Aufholsakkaden ergänzen (Collewijn & Tamminga, 1984). Bei hohem Tempo springt der Blick eher zur erwarteten Fangstelle, als der Kugel glatt zu folgen.
- **Bildwiederholrate:** 20,8 px pro Bild bei 60 Hz, 5,2 px bei 240 Hz für 1.250 px/s **[Herleitung]** – bei Kugeln von 30–35 px ein Sprung von über der Hälfte des Durchmessers. Schnelle Monitore glätten die Bewegung; eine bessere Farberkennung ist dadurch nicht belegt.
- **Farbe [Herleitung, WCAG-Formel]:** Grün (#10b981) und Rot (#ef4444) unterscheiden sich vor allem im Farbton, kaum in der Helligkeit (Kontrast untereinander 1,5 : 1, bei Combo ≥ 10 mit #34d399 2,0 : 1; gegen den Hintergrund 8,0 : 1 bzw. 5,4 : 1). Bei Rot-Grün-Schwäche (≈ 8 % der Männer, ≈ 0,4 % der Frauen; Birch, 2012) bleibt nur das kleine X. Rot-Grün-Empfindlichkeit fällt zudem zur Peripherie steiler ab als Helligkeits- und Blau-Gelb-Empfindlichkeit, bleibt aber bei ausreichend großen Reizen bis weit in die Peripherie erhalten (Hansen et al., 2009). Für die kleinen, schnellen Kugeln ist daher anzunehmen **[Vermutung, nicht untersucht]**, dass die Farbe am Rand des Blickfelds unsicherer erkannt wird als nach einem Blick zur Kugel.
- **Brille/Gleitsicht:** Die Kugeln durchqueren die ganze Spielfeldhöhe (≈ 13° bei 500 px in 60 cm **[Herleitung]**). Mit Gleitsichtgläsern führt der vertikale Blickweg durch Zonen unterschiedlicher Wirkung; der scharfe Zwischenbereich ist schmal (13–18° horizontal am Bildschirm; Han et al., 2003), Kopfbewegungen nehmen zu. Der empfohlene Blick ins „obere Drittel“ geht bei Gleitsicht in Richtung Fernteil und wird bei 50–70 cm eher unscharf. Sinnvoll: Arbeitsplatz-/Bildschirmbrille für den Zwischenabstand, Bildschirm etwas tiefer, Abstand ≈ 60 cm. Ab ≈ 40 Jahren reicht die Akkommodation für Naharbeit nicht mehr (Charman, 2008).

## 5. Neurowissenschaftliche Grundlagen
- **Abfangen bewegter Ziele** beruht auf Bewegungswahrnehmung und fortlaufender visuomotorischer Steuerung: Die Handbewegung wird laufend an die neueste Zielinformation angepasst, statt einmal vorausberechnet zu werden (Brenner & Smeets, 2015). Für echte fallende Objekte nutzt das Gehirn ein inneres Schwerkraftmodell; bei reinen Bildschirmzielen mit Mausklick wurde es nicht angewandt (Zago et al., 2004) – das Spiel spricht es also nicht an.
- **Go/No-Go:** Die Rot-Regel verlangt, eine vorbereitete Klickbewegung zurückzuhalten. Eine starke Antworttendenz entstand nur bei seltenen Stopp-Reizen (in der Studie 20 %) und schnellem Takt; bei gleich häufigen, langsamen Reizen war die hemmungsbezogene Hirnaktivität um 75 % geringer (Wessel, 2018). Die meisten Fehlalarme gab es bei Los:Stopp-Verhältnissen von 2:1 bis 4:1, also 67–80 % Los-Reizen, und kurzen Abständen (Young et al., 2018). Mit 15 % Rot zu Beginn wird Hemmung also gefordert; bei 40–45 % Rot sinkt der „Klickdruck“ vermutlich wieder **[Übertragung auf dieses Spiel nicht untersucht]** – dann wird eher Unterscheiden als Hemmen geübt.
- **Stoppen** aktiviert rechten inferioren Frontalkortex und Nucleus subthalamicus (Aron & Poldrack, 2006; Stop-Signal-Aufgabe). Dass dieses Spiel diese Regionen „trainiert“ oder verändert, ist nicht belegt.

## 6. Motorische Grundlagen
- **Zielbewegung zu einem bewegten Ziel:** Zwei-Komponenten-Modell (schneller Anfangsimpuls plus Korrektur; Elliott et al., 2001). Der klassische Fitts-Index gilt für bewegte Ziele nur eingeschränkt (Jagacinski et al., 1980). Beim Anklicken bewegter Ziele mit der Maus landen die Klicks systematisch **hinter** dem Ziel, umso mehr, je schneller es ist (Huang et al., 2018).
- **Zeitfenster [Herleitung]:** Wer das Fadenkreuz in die Fallbahn stellt und wartet, hat die Dauer Ø/Tempo zum Klicken: 140 ms (Level 1), 50 ms (Level 10), 33 ms (Level 15), ≈ 23 ms bei Level 15 mit Höchst-Combo. Die zeitliche Streuung beim Abfangen liegt bei ≈ 20 ms (Brenner & Smeets, 2009) – bei hohen Leveln wird das Zeitfenster also leistungsbegrenzend. Menschen passen lieber den Ort als den Zeitpunkt an (Brenner & Smeets, 2015); das Spiel erlaubt beides.
- **Geräte-Latenz:** Die End-to-End-Latenz (Mausbewegung bis Bildänderung) lag im Browser bei ≈ 62–83 ms (Chrome/Firefox auf einem Testrechner von 2015; gegenüber einer nativen Anwendung meist + 15–20 ms; Casiez et al., 2015). Bei 1.047 px/s bewegt sich eine Kugel in 70 ms um ≈ 73 px **[Herleitung]** – mehr als ihr Durchmesser. Man muss also „vorhalten“; Unterschiede zwischen Geräten gehen direkt in die Punkte ein.
- **Belastung:** Viele schnelle Mausbewegungen und Klicks (bis ≈ 2 grüne Kugeln/s) über lange Runden. Mausnutzungsdauer hängt mit Hand-Arm-Beschwerden zusammen (IJmker et al., 2007).

## 7. Einflussfaktoren und Messgrenzen
- **Alter:** Einfache Reaktionszeit + 0,55 ms/Lebensjahr (Woods et al., 2015); Hemmung speziell bei Go/No-Go und Stop-Signal im Alter schwächer (Rey-Mermet & Gade, 2018) → mehr Rot-Fehlklicks erwartbar.
- **Gerät:** Latenz (s. o.), Bildrate, Mausempfindlichkeit, Spielfeldgröße (logische Pixel = CSS-Pixel: auf größeren Rahmen dauert der Fall länger, °/s ändern sich mit Abstand und Pixeldichte).
- **Messqualität:** Die Punkte hängen stark von der Rundendauer ab, die sich selbst verlängert (Abschnitt 2); gute und sehr gute Leistungen lassen sich schlecht vergleichen. Leerklicks fehlen in der Trefferquote. Reaktionszeit wird nicht gemessen. Auch der echte Lineal-Falltest ist nur mäßig zuverlässig (einfach: ICC 0,645 über eine Saison, Eckner et al., 2011; ICC 0,57 bei Personen ≥ 60 J., Wahlvariante 0,81, Ferreira et al., 2024).
- **Übung:** Deutliche Lerneffekte durch Gewöhnung an Tempo, Gerät und Strategie (Vorhalten) sind zu erwarten.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Für dieses Spiel gibt es keine Studie. In gerätegleichen Bildschirmaufgaben sind Verbesserungen regelmäßig groß: Reaktionszeit SMD 2,66 bei ähnlicher, 0,50 bei unähnlicher Testaufgabe (33 RCTs; Guo et al., 2025).
- **Naher Transfer – schwach:** Adaptives Go/No-Go-/Stop-Signal-Training (n = 122, 3 Wochen) war einer aktiven Kontrolle nicht überlegen, ohne Transfer; besser wurde vor allem das Los-Tempo (Enge et al., 2014).
- **Alltag – fehlend:** Baseballtraining verbesserte die Go/No-Go-, nicht die einfache Reaktionszeit (Kida et al., 2005) – die Gegenrichtung (Bildschirmspiel → Sport) ist nicht gezeigt. „Brain Training“ allgemein: Evidenz vor allem für die geübte Aufgabe (Simons et al., 2016). Für „Schussdisziplin“ in E-Sport-Titeln gibt es keinen Beleg.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** jemand mit Maus spielerisch das vorausschauende Abfangen bewegter Ziele unter Tempo üben möchte, kombiniert mit einer einfachen Farbregel; für Geübte, die Punktejagd und steigende Schwierigkeit mögen.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; ein ruhiger, gleichbleibender Einstieg gebraucht wird (das Tempo zieht automatisch an); eine Reaktionszeitmessung oder ein „Lineal-Falltest“ gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Rot/Grün ist die Entscheidungsregel, Helligkeit fast gleich, Formhinweis sehr klein.
  - `presbyopie_gleitsicht`: vertikale Blickwege über die ganze Feldhöhe, Blick nach oben empfohlen – Bildschirmbrille und niedrigere Bildschirmposition erwägen.
  - `hand_arm_beschwerden`, `tremor_parkinson`: schnelle, genaue Klicks auf kleine bewegte Ziele, offene Rundendauer.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: rotes Overlay (480 ms) und Wackeln bei jedem Fehler; bei vielen Fehlern in kurzer Folge überlagern sich die Blitze (vgl. WCAG-Grenze 3 Blitze/s; W3C, 2024). Die Effekt-Einstellung schaltet laut Code nur das Overlay ab.
  - `schwindel_vestibulaer`: bei jedem Fehler wackelt das ganze Spielfeld (12 px, abklingend, nicht abschaltbar); bei Fehlerserien entsteht eine wiederholte großflächige Bildbewegung.
  - `trockenes_auge_bildschirm`: konzentriertes Starren auf schnelle Ziele über eine nach oben offene Rundendauer; Pausen und Blinzeln einplanen.
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Kugeln erscheinen an beliebiger Stelle über die ganze Spielfeldbreite, das X auf Rot ist nur ≈ 0,26° groß – Kugeln einer Seite werden spät bemerkt, das X ist bei niedrigem Visus als Zusatzmerkmal kaum nutzbar. Keine Aussage über Gesichtsfeld oder Sehschärfe ableiten (kein Test).
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: hoher, automatisch steigender Zeitdruck, Strafe auch für Leerklicks, schnelle Fehlerspirale.
  - Keine Sturz- oder Herz-Kreislauf-Vorsicht nötig (keine Körperbewegung).
  - Das sind Auswahl- und Anpassungshinweise, keine medizinischen Aussagen.
- **Kombiniert gut mit …** 102 (reines Go/No-Go mit Form + Farbe), 104 (Abfangen ohne Täuschziele, ruhiger), 804 (Zielgeschwindigkeit), 805 (Interzeption mit Stillhalten), 515 (vertikales Verfolgen).
- **Abgrenzung innerhalb 801–805:** keine echte Dublette, aber **801, 802 und 804 teilen dieselbe Spiel-Engine** (Level = Punkte/1.750 + 1, +2 s/−1 s-Zeitkonto, gleiche Combo-Stufen und Note) und ein fast gleiches Profil. Engste Verwandte ist **801** (bewegte Ziele per Klick abfangen, dort radial zur Mitte, langsamer, alle Ziele anklicken). 802 ist die **einzige Übung der Gruppe mit Farb-Entscheidung** (Go/No-Go) und damit die einzige mit Vorsicht bei Farbsehschwäche. **805** fordert ebenfalls Vorhalten auf eine gerade Bahn, aber ohne Klick und mit Stillhalten; 804 hat nur ein, dafür kleineres Ziel. Die drei Engine-Geschwister nicht als „Abwechslung“ hintereinander vorschlagen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Irreführender Name und falsche Physik:** Nicht „Lineal-Falltest“ nennen; wenn „Fallen“ versprochen wird, echte Beschleunigung (y = ½ a t²) verwenden oder ehrlich „gleichmäßig fallend“ sagen.
- **Tablet/Touch:** Original gesperrt. Umsetzung auf Basis von „Zielfang“: Tippen statt Mausklick, Trefferradius größer als das sichtbare Ziel (≥ 32 px), Touch-Verzögerung (Web-Apps auf Smartphones maßen Reaktionszeiten um ≈ 58–70 ms zu lang; Pronk et al., 2020) über Vorhalt-Rückmeldung statt über harte Zeitfenster abfangen.
- **Farbsehschwäche:** wie in „Stopp & Los“ Form **und** Helligkeit codieren (z. B. heller Kreis vs. dunkleres Achteck mit Balken), nicht nur ein kleines X (WCAG 1.4.1).
- **Go/No-Go sauber gestalten:** Rot-Anteil über alle Stufen konstant bei 20–25 % (Wessel, 2018; Young et al., 2018) statt auf 45 % steigen lassen; Schwierigkeit über Tempo/Größe adaptiv (3-down/1-up) regeln statt über eine sich selbst verlängernde Zeitkonto-Spirale; feste Dauer (z. B. 45 s).
- **Messung:** Fangquote je Tempo in °/s, Fehlalarme bei Rot, d′, Zeitfehler zu früh/zu spät in ms – keine Ranglisten oder „Top %“-Stufen ohne Normdaten.
- **Sicherheit:** kein rotes Vollbild-Overlay, kein Bildschirmwackeln; höchstens 3 Blitze/s.
- **Brille:** Spielfeldhöhe begrenzen und Fangzone in die Bildschirmmitte legen (weniger vertikale Blickwege bei Gleitsicht); Hinweis auf passenden Abstand.

## 11. Quellen
### Von der Website angegeben
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica*, *30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (c-Reaktion = Go/No-Go passt; „Typ-C-Wahlreaktion“ vermischt b- und c-Reaktion; das Spiel misst keine Reaktionszeit).
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception*, *5*(4), 437–459. https://doi.org/10.1068/p050437 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Tau betrifft Annäherung/Bildvergrößerung; die Kugeln fallen seitlich, gleichförmig und ohne Vergrößerung).
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review*, *91*(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – **Prüfung:** DOI stimmt ✓ (im Text teils „Logan (1984)“); **stützt:** teilweise (Rennmodell korrekt, gilt für Stop-Signal; kein Beleg für Training „auf Spitzensport-Niveau“).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements*, *3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Zwei-Komponenten-Modell ja; „85 % ballistisch“ nicht belegt, auf 804 steht „75 %“).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (gilt für ruhende Ziele; bei bewegten nur eingeschränkt).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Reaktionszeit-Komponenten und Hardware-Verzögerung, nichts zu 144/240 Hz oder Bewegungsunschärfe).

### Weitere Fachliteratur
- Aron, A. R., & Poldrack, R. A. (2006). Cortical and subcortical contributions to stop signal response inhibition: Role of the subthalamic nucleus. *The Journal of Neuroscience*, *26*(9), 2424–2433. https://doi.org/10.1523/JNEUROSCI.4682-05.2006 – Hirnregionen beim Stoppen
- Benguigui, N., & Bennett, S. J. (2010). Ocular pursuit and the estimation of time-to-contact with accelerating objects in prediction motion are controlled independently based on first-order estimates. *Experimental Brain Research*, *202*(2), 327–339. https://doi.org/10.1007/s00221-009-2139-0 – Beschleunigung kaum verrechnet
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, *29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Brenner, E., & Smeets, J. B. J. (2009). Sources of variability in interceptive movements. *Experimental Brain Research*, *195*(1), 117–133. https://doi.org/10.1007/s00221-009-1757-x – zeitliche Streuung ≈ 20 ms
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision*, *15*(3), 8. https://doi.org/10.1167/15.3.8 – Ort statt Zeitpunkt anpassen
- Casiez, G., Conversy, S., Falce, M., Huot, S., & Roussel, N. (2015). Looking through the eye of the mouse: A simple method for measuring end-to-end latency using an optical mouse. In *Proceedings of UIST '15* (S. 629–636). ACM. https://doi.org/10.1145/2807442.2807454 – End-to-End-Latenz
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, *91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Alterssichtigkeit
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology*, *351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Folge-Gain < 0,95
- Eckner, J. T., Kutcher, J. S., & Richardson, J. K. (2010). Pilot evaluation of a novel clinical test of reaction time in National Collegiate Athletic Association Division I football players. *Journal of Athletic Training*, *45*(4), 327–332. https://doi.org/10.4085/1062-6050-45.4.327 – echter Stab-Falltest vs. Computer
- Eckner, J. T., Kutcher, J. S., & Richardson, J. K. (2011). Between-seasons test-retest reliability of clinically measured reaction time in National Collegiate Athletic Association Division I athletes. *Journal of Athletic Training*, *46*(4), 409–414. https://doi.org/10.4085/1062-6050-46.4.409 – ICC 0,645
- Eckner, J. T., Richardson, J. K., Kim, H., Joshi, M. S., Oh, Y. K., & Ashton-Miller, J. A. (2015). Reliability and criterion validity of a novel clinical test of simple and complex reaction time in athletes. *Perceptual and Motor Skills*, *120*(3), 841–859. https://doi.org/10.2466/25.15.PMS.120v19x6 – echte Go/No-Go-Variante des Stab-Falltests (Lichtsignal)
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin*, *127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, *40*(4), 987–1001. https://doi.org/10.1037/a0036165 – kein Transfer von Hemmtraining
- Ferreira, S., Raimundo, A., del Pozo-Cruz, J., Leite, N., Pinto, A., & Marmeleira, J. (2024). Validity and reliability of a ruler drop test to measure dual-task reaction time, choice reaction time and discrimination reaction time. *Aging Clinical and Experimental Research*, *36*(1), 61. https://doi.org/10.1007/s40520-024-02726-6 – Lineal-Falltest ≥ 60 J.
- Gomez, P., Ratcliff, R., & Perea, M. (2007). A model of the go/no-go task. *Journal of Experimental Psychology: General*, *136*(3), 389–413. https://doi.org/10.1037/0096-3445.136.3.389 – Donders' c-Reaktion = Go/No-Go
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Übungs- vs. Transfereffekte
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science*, *44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Hansen, T., Pracejus, L., & Gegenfurtner, K. R. (2009). Color perception in the intermediate periphery of the visual field. *Journal of Vision*, *9*(4), 26. https://doi.org/10.1167/9.4.26 – Farbsehen in der Peripherie
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of CHI 2018* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – Klicks hinter bewegten Zielen
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine*, *64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausdauer und Beschwerden
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors*, *22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research*, *22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – Sport und Go/No-Go
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review*, *25*(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – Hemmung im Alter
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest*, *17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1, 2.3.1). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI; Farbe nicht allein, Blitzgrenze
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology*, *55*(3), e12871. https://doi.org/10.1111/psyp.12871 – seltene Stopp-Reize nötig
- Young, M. E., Sutherland, S. C., & McCoy, A. W. (2018). Optimal go/no-go ratios to maximize false alarms. *Behavior Research Methods*, *50*(3), 1020–1029. https://doi.org/10.3758/s13428-017-0923-5 – Los-Anteil 67–80 %
- Zago, M., Bosco, G., Maffei, V., Iosa, M., Ivanenko, Y. P., & Lacquaniti, F. (2004). Internal models of target motion: Expected dynamics overrides measured kinematics in timing manual interceptions. *Journal of Neurophysiology*, *91*(4), 1620–1634. https://doi.org/10.1152/jn.00862.2003 – Schwerkraftmodell nicht bei Mausklick
