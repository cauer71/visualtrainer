---
# ===== Kennung =====
nr: 807
kennung: agility-ladder
name: "Sprossen-Leiter: Felder im Zickzack genau im Takt antippen"
name_original: "Koordinationsleiter Übungen (Seitentitel: Koordinationsleiter Übungen | SkillDrills; engl. Spielname: Motor Sequencing (Agility Ladder))"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "fitness"
quelle_url: "https://skilldrills.online/de/drills/physical/fitness/agility-ladder"
blickfit_umsetzung: {kennung: "sprossen-leiter", name: "Sprossen-Leiter", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sprossen-leiter/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine ruhende Leiter aus vier bis sieben nummerierten Feldern steht im Zickzack auf dem Bildschirm; ein sanfter Taktgeber gibt den Rhythmus vor. Man tippt die Sprossen von unten nach oben an, jede genau auf ihren Schlag, und sieht bei jedem Feld die Abweichung in Millisekunden (zu früh oder zu spät). Der Takt wird mit den Stufen schneller, aber nie über zwei Schläge pro Sekunde; kein Blitzen, kein Rot, kein Wackeln. Eine Tipp-Aufgabe am Bildschirm, keine Beinarbeit."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code steigt das (intern stufenlose) Level mit Punkte/250 + 1 plus 1 Level je 4 Leitern Serie; es sinkt nie. Scrolltempo = 150 + 600·(Level−1)/14 px/s (Level 15 = 750 px/s, ohne Obergrenze darüber hinaus), Trefferradius 18 → 10 px (ab Level 15 fest), Sprossenabstand 50 → 75 px (Level 1–6), ab Level 4 seitlicher Zufallsversatz der Leiter ±10 px. Start immer bei Level 1."
messgroessen: ["Punkte", "abgeschlossene und verpasste Leitern", "Genauigkeit = abgeschlossene / alle Leitern in %", "längste Serie (Combo)", "erreichtes Level und Spitzentempo in px/s", "sinnvoll: Tempo in °/s, bei dem 80 % der Leitern gelingen; Zeit zwischen den Sprossenkontakten"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 1
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
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
voraussetzungen: ["Maus (oder Touchpad) am Computer; auf reinen Touch-Geräten lässt sich das Original nicht starten", "45 s konzentriert auf die Bildschirmmitte schauen können", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischenbereich)", "kein Farbsehen zwingend nötig (Reihenfolge ist immer oben links → unten rechts)"]
vorsicht_bei: [hand_arm_beschwerden, tremor_parkinson, presbyopie_gleitsicht, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["Rhythmus halten und mehrere Orte nacheinander zu einem vorgegebenen Zeitpunkt antippen", "rhythmische, vorausgeplante kleine Zeigebewegungen (Zickzack) bei steigendem Tempo", "Timing-Aufgaben mit einfacher, gleichbleibender Regel", "Menschen, die gern kurze, klar strukturierte Übungen mit direkter Rückmeldung in Millisekunden mögen"]
weniger_geeignet_fuer: ["Training von Beinarbeit, Schnelligkeit, Gleichgewicht oder Sturzprävention (dafür echte Schritt- und Gleichgewichtsübungen im Stehen)", "Menschen mit Tremor oder Hand- und Armbeschwerden bei schnellen Tippfolgen", "wer ohne Takt und ohne Zeitvorgabe üben möchte", "wer eine Reaktionszeitmessung erwartet (gemessen wird die Abweichung vom Taktschlag, einschließlich der Verzögerung des Touchscreens)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Übungseffekte in geübten sensomotorischen Aufgaben und Chunking von Sequenzen sind gut belegt, für diese Übung gibt es keine Studie; selbst echtes Koordinationsleiter-Training verbesserte Sprint, Agility und Dribbling bei Jugendfußballern nicht stärker als normales Training (kleine Studie, n = 18; Padrón-Cabo et al., 2020); ein Transfer der Tippübung auf Beinarbeit ist unbelegt."
aehnliche_uebungen: [809, 802, 810, 708, 707, 104, 405]
stichworte: ["Koordinationsleiter", "Agility Ladder", "Auge-Hand-Koordination", "Abfangen bewegter Ziele", "Interzeption", "motorische Sequenz", "Chunking", "Rhythmus", "Maus", "Zickzack"]
---

# 807 · Sprossen-Leiter: Felder im Zickzack genau im Takt antippen

> Original: „Koordinationsleiter Übungen“ – skilldrills.online, Kapitel „physical“ / „fitness“ · Blickfit-Übung: Sprossen-Leiter (`sprossen-leiter`)

## 1. Kurzbeschreibung
Eine ruhende Leiter aus vier bis sieben nummerierten Feldern (Sprossen) steht im Zickzack links und rechts, unten beginnend, auf dem Bildschirm. Ein Taktgeber oben schwingt sanft, jeder Schlag ist zu sehen und zu hören; die Sprosse, die an der Reihe ist, „atmet“ im selben Takt, und ein Ring schrumpft zum Schlag hin. Drei Schläge laufen zum Einschwingen vorab. Danach tippt man die Sprossen von unten nach oben an, jede genau auf ihren Schlag. Bei jedem Feld erscheint die Abweichung in Millisekunden mit ✓ oder ✗, zu früh oder zu spät. Eine Leiter gelingt, wenn mindestens drei Viertel der Sprossen im Takt getroffen sind. Der Takt wird mit den Stufen von 1,0 auf 0,5 s verkürzt, nie schneller als zwei Schläge pro Sekunde; eine Sitzung hat acht Leitern. Erfasst werden mittlere Abweichung, Tendenz (früh oder spät) und Fehler. Es ist eine Tipp-Aufgabe am Bildschirm, keine Beinarbeit.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Next.js-Chunks, abgerufen und formatiert 29.09.2026; nur Mechanik notiert). **[Code]** = aus dem Code, **[Text]** = nur Regeltext.

- **Spielfeld [Code]:** Canvas in Containergröße (Vorgabe 800 × 450 logische px), Leiter immer mittig: Holme bei Mitte ±50 px, Sprossen bei ±40 px (seitlicher Hub 80 px). Sprossenabstand 45 + 5·min(6, Level) px = 50 px (Level 1) bis 75 px (ab Level 6). Eine neue Leiter entsteht oberhalb des Bildes, sobald die vorige 300 px weitergelaufen ist → eine Leiter alle 2,0 s bei 150 px/s, alle 0,4 s bei 750 px/s.
- **Treffer [Code]:** Eine Sprosse gilt als „betreten“, wenn der Zeigermittelpunkt in einem Kreis mit Radius max(10; 18 − 8·t) px liegt (t = (Level−1)/14), also Durchmesser 36 → 20 px; gezeichnet wird ein Quadrat mit 1,5 × Radius Kantenlänge (27 → 15 px). Nur die aktuelle Sprosse zählt (grün umrandet), andere werden ignoriert – falsche Berührungen kosten nichts. Geprüft wird einmal pro Bild.
- **Fehler [Code]:** Erreicht die oberste Sprosse einer unvollständigen Leiter den unteren Rand (−20 px), gilt sie als verpasst: Serie = 0, Bildschirm-Wackeln 12 px, Strafton, roter Vollbild-Blitz (480 ms, über die Effekt-Einstellung abschaltbar). Keine Punkt- oder Zeitstrafe (wie im Regeltext).
- **Punkte [Code]:** Nur vollständige Leitern zählen: 100 × Multiplikator. Der Multiplikator steigt stufenweise mit der Serie: ab 3 Leitern 1,1×, 5 → 1,25×, 7 → 1,35×, 10 → 1,5×, 15 → 1,75×, 20 → 2,0×, 30 → 2,5×, **50 → 3,0×**. Der im Text genannte 3,0-Faktor verlangt also 50 fehlerfreie Leitern in Folge.
- **Level und Tempo [Code]:** Level = max(bisher; Punkte/250 + 1 + ⌊Serie/4⌋), stufenlos, sinkt nie; Scrolltempo 150 + 600·t px/s. Ab Level 4 wird jede Leiter zufällig um ±10 px seitlich versetzt. Rechnerisch erreicht eine fehlerfreie Person Level 15 (750 px/s) schon nach ≈ 18 Leitern (≈ 17 s). **Nutzbares Zeitfenster (eigene Rechnung aus dem Code):** Der Zeiger ist auf das Spielfeld begrenzt, die unterste Sprosse muss also vor dem unteren Rand getroffen werden, die oberste erst nach ihrem Eintritt oben. Bei 450 px Höhe bleiben für alle vier Sprossen ≈ (450 + 2·Radius − 3·Sprossenabstand)/Tempo: ≈ 2,2 s bei Level 1 (150 px/s), ≈ 0,33 s bei Level 15 (750 px/s) – formal „verpasst“ wird die Leiter erst später, wenn die oberste Sprosse den Rand erreicht.
- **Dauer [Code]:** Countdown ≈ 2,5 s, dann 45 s. Start immer bei Level 1.
- **Eingabe [Code]:** Maus mit Pointer-Lock (relative Bewegung × Empfindlichkeit), sonst absolute Zeigerposition. Keine Kamera, keine Lagesensoren. Auf reinen Touch-Geräten (Touch vorhanden, aber kein „feiner Zeiger“ laut `pointer: fine`) ersetzt der gemeinsame Startbildschirm aller sechs Spiele 806–811 den Startknopf durch „Mouse Required for Pointer Lock“ – ohne Maus lässt sich das Original nicht starten (Code geprüft 30.09.2026); ob ein Tablet mit angeschlossener Maus als feiner Zeiger gilt, hängt vom Browser ab (nicht getestet). Fortlaufendes Fingerziehen würde ohnehin keine Zeigerbewegung erzeugen.
- **Bildfrequenz [Code]:** Bewegung zeitbasiert (Zeitschritt, max. 0,1 s) → Tempo unabhängig von der Bildrate. Der Treffertest prüft aber nur die Position je Bild: bei 60 Hz und 750 px/s springt die Sprosse 12,5 px pro Bild; bei schnellem Querschwung kann der Zeiger die 20-px-Zone zwischen zwei Bildern „überspringen“. Niedrige Bildraten erschweren das Spiel daher etwas (eigene Ableitung).
- **Bewertung [Code]:** Note aus 100·√(Punkte/17.000): S+ ab ≈ 15.300, S ≈ 12.300, A ≈ 9.600, B ≈ 6.100, C ≈ 3.400 Punkte. Die „Normtabelle“ der Website folgt dieser willkürlichen Referenz 17.000.

**Widersprüche Regeltext ↔ Code:** (1) „15 Level, bis 750 px/s“ – im Code gibt es keine Obergrenze: Level und Tempo steigen weiter (Level 20 ≈ 964 px/s, Level 30 ≈ 1.393 px/s). (2) „Alle 250 Punkte ein Level“ – zusätzlich +1 Level je 4 Leitern Serie. (3) „Trefferbreite 18 → 10 px“ ist der **Radius**. (4) Der Regeltext sagt nicht, dass Überfahren genügt; „flicken“ meint einen schnellen Mausschwung (Flick), keinen Klick – ein Klick ist tatsächlich nie nötig. (5) Der englische Beschreibungstext im Code sagt selbst: „it trains the sequencing and the rhythm, not the footwork itself“.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Die Übung beruhe auf Lashleys (1951) serieller Ordnung und Schmidts (1975) generalisiertem motorischem Programm; sie schule „motorisches Chunking“, eine „invariante zeitliche Taktung“ bei 150–750 px/s, „Fußschnelligkeit“ und „Counter-Strafing“ im eSport. Laut FAQ nutzen Hände und Füße „identische neuronale Taktgeber“, deshalb verbessere das Spiel Richtungswechsel und Beinarbeit auf dem Spielfeld. Zielgruppen: Fußball, Handball, Tennis, Kampfsport, FPS-Gamer. Dazu eine „wissenschaftliche 5-Stufen-Normtabelle“ (Top 0,1 % ab 17.000 Punkten, Top 3 % …).

**Einordnung:**
- **Belegt (allgemein):** Schnelle Bewegungsfolgen werden vorausgeplant und hierarchisch organisiert (Lashley über Rosenbaum et al., 2007); Sequenzen werden spontan in „Chunks“ gegliedert (Sakai et al., 2003). Das beschreibt das Spiel plausibel – geprüft wurde es an diesem Spiel nicht.
- **Überzogen:** „Schmidt beweist“ die Invarianz des relativen Timings – es ist eine Theorie; bei konservativer Auswertung stützt die Mehrheit der Befunde die Invarianz **nicht** (Gentner 1987, zit. n. Beek, 1992). Zudem ist die Schematheorie für diskrete Bewegungen formuliert.
- **Unbelegt:** Transfer auf Beinarbeit oder Sport. Selbst **echtes** Leitertraining (6 Wochen, 3×/Woche) verbesserte bei 12-jährigen Fußballern Sprint, Agility und Dribbling nicht stärker als die Kontrollgruppe (randomisiert, aber nur n = 18; Padrón-Cabo et al., 2020). „Agility“ meint zudem reizabhängige Richtungswechsel (Sheppard & Young, 2006) – eine vorgeplante Folge ist das gerade nicht. „Identische Taktgeber“ für Hand und Fuß: keine Quelle. Counter-Strafing geschieht mit Tasten (A/D), nicht mit Mausschwüngen.
- **Falsch:** „Foveale Blickverfolgung bricht über 550 px/s zusammen“ – 550 px/s sind ≈ 11–15°/s, weit unter der Grenze der Augenfolgebewegung (Meyer et al., 1985). „Sakkadenverzögerung 30–50 ms“ verwechselt vermutlich Dauer und Latenz; selbst im Gap-Paradigma liegt der Gipfel regulärer Sakkaden bei ≈ 150 ms, der von Express-Sakkaden bei ≈ 100 ms (Fischer & Ramsperger, 1984).
- **Normtabelle ohne Datengrundlage:** Die Seite erklärt selbst, keine Nutzerdaten zu sammeln; keine zitierte Arbeit enthält Normen für dieses Spiel. Die Stufen entsprechen der Notenfunktion (Referenz 17.000 Punkte) – Prozentränge sind erfunden. „Level 12–15 = Elite“ passt auch nicht zur Levelmechanik, die fehlerfreie Spieler:innen nach ≈ 17 s über Level 15 hinaus treibt.

## 4. Optische und okulomotorische Grundlagen
- **Reize:** Die Leiter steht still; die Felder sind groß (mindestens etwa 44 px hoch und 90 px breit), tragen ihre Nummer und füllen den größten Teil der Bühnenhöhe. Als Umrechnung gilt: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Der Taktgeber schwingt sanft mit höchstens zwei Schlägen pro Sekunde, ohne Blitzen. Rückmeldung erfolgt mit ✓/✗ und Zahlen, nicht nur mit Farbe; eine Rot-Grün-Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) ist deshalb kein Hindernis.
- **Blickstrategie:** Die Reihenfolge ist immer gleich (von unten nach oben im Zickzack) und lässt sich daher vorausplanen; der Blick wechselt von Feld zu Feld. Während einer Zeigebewegung bleibt der Blick am Ziel „verankert“ (Neggers & Bekkering, 2000). Die Blickwechsel zwischen den Feldern müssen sich in den Takt einfügen: Bei 0,5 s je Schlag bleibt dafür wenig Spielraum.
- **Brille:** Mit Gleitsichtgläsern ist der scharfe Zwischenbereich am Bildschirm nur etwa 13–18° breit (Han et al., 2003; dort ging es um Lesen am Bildschirm). Die Leiter ist schmal genug, die senkrechte Blickwanderung über die ganze Höhe kann aber dazu führen, dass Teile unscharf erscheinen; ob das hier stört, ist nicht untersucht. Eine Arbeitsplatzbrille oder ein etwas tiefer gestellter Bildschirm kann angenehmer sein (Beratung beim Optiker). Der Akkommodationsaufwand beträgt 1 geteilt durch den Abstand in Metern (2,5 dpt bei 40 cm). Stereosehen ist nicht nötig.

## 5. Neurowissenschaftliche Grundlagen
- **Sequenzlernen:** Motorisches Fertigkeitslernen stützt sich auf frontoparietale Areale und zwei Schleifensysteme, Kortex–Basalganglien und Kortex–Kleinhirn (Hikosaka et al., 2002). Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.
- **Rhythmisch und diskret:** Rhythmische Handgelenksbewegungen aktivieren weniger höhere kortikale Planungsareale als diskrete, auch im selben Gelenk (fMRT, Schaal et al., 2004). Die Übung liegt dazwischen: Die Folge ist rhythmisch, aber jeder Tipp ist ein diskretes Ziel zu einem festen Zeitpunkt.
- **Timing:** Wegen sensomotorischer Verzögerungen (visuelle Online-Korrekturen nach im Mittel etwa 160 ms; Saunders & Knill, 2003) muss ein Tipp im Voraus geplant werden; bei kurzen Takten bleibt kaum Zeit für Korrekturen. Beim Abfangen bewegter Ziele ist die zeitliche Präzision am höchsten, wenn man den Treffort frei wählen darf (Brenner & Smeets, 2015); hier sind Ort und Zeit durch Leiter und Takt festgelegt, gewertet wird die Abweichung vom Schlag.

## 6. Motorische Grundlagen
- **Bewegungsart:** kleine, schnelle Zickzack-Bewegungen von Hand und Finger von Feld zu Feld, je Schlag ein Tipp; fortlaufendes Nachführen ist nicht nötig. Schnelle Bewegungsfolgen werden vorausgeplant und hierarchisch organisiert (Lashley, 1951, nach Rosenbaum et al., 2007); Sequenzen gliedern sich mit Übung spontan in „Chunks“ (Sakai et al., 2003).
- **Zielgenauigkeit:** Die Felder sind groß; nach Fitts (1954) bleibt der Schwierigkeitsindex niedrig, die Genauigkeit des Treffens begrenzt kaum. Entscheidend ist das Timing.
- **Zwei Komponenten:** schneller Anfangsimpuls plus visuell geführte Endkorrektur (Woodworth, 1899; Elliott et al., 2001). Bei kurzen Takten bleibt kaum Zeit für Korrekturen, daher zählt die Vorausplanung. Die Schematheorie (Schmidt, 1975) nimmt ein invariantes relatives Timing von Bewegungsfolgen an; empirisch wird das überwiegend nicht bestätigt (Beek, 1992).
- **Belastung:** Die Dauer der Zeigearbeit hängt mit Hand-Arm-Beschwerden zusammen (mäßige Evidenz, IJmker et al., 2007). Eine Sitzung ist kurz, Wiederholungen summieren sich.

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Die gemessene Abweichung enthält die Verzögerung des Touchscreens; Browser-Anwendungen überschätzen Zeiten auf Touch- und Tastaturgeräten je nach Gerät unterschiedlich (Pronk et al., 2020). Eine gleichbleibende Tendenz zu „spät“ kann deshalb teilweise vom Gerät stammen und ist keine Eigenschaft der Person. Bildschirmgröße und Abstand verändern die Wege zwischen den Feldern; nur Vergleiche mit sich selbst auf demselben Gerät sind sinnvoll.
- **Messgrößen:** Mittlere Abweichung (Betrag), Tendenz (Vorzeichen) und Fehler sind aus wenigen Tipps je Leiter berechnet und streuen. Messungen am Menschen streuen allgemein; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Leitern und Sitzungen (Median), und hohe Korrelation zweier Verfahren heißt nicht, dass sie dieselben Werte liefern (Mountford et al., 2004, S. 24).
- **Alter:** Ältere haben mehr Schwierigkeiten bei Mausaufgaben (Smith et al., 1999); für das Tippen im Takt ist das nicht untersucht. Die Stufe passt sich an.
- **Übung:** Schnelle Lerneffekte in den ersten Leitern; die Zuverlässigkeit der Messwerte ist nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt (mittel):** Menschen werden in geübten sensomotorischen Aufgaben zuverlässig besser; Sequenzen werden mit Übung in Chunks organisiert (Sakai et al., 2003). Für diese Übung gibt es keine Studie.
- **Naher Transfer (schwach):** auf ähnliche Tipp- und Timing-Aufgaben am Bildschirm plausibel, aber ungeprüft.
- **Alltagstransfer (fehlend):** Hirntraining verbessert vor allem die geübten Aufgaben, kaum Alltagsleistungen (Simons et al., 2016). Für Beinarbeit gab es nicht einmal beim echten Leitertraining einen Zusatznutzen gegenüber normalem Training (Padrón-Cabo et al., 2020; kleine Studie, n = 18). Wer Beweglichkeit oder Sturzprävention im Blick hat, ist mit echten Bewegungsübungen besser beraten: Schritttraining im Stehen senkte bei Älteren die Sturzrate um etwa 50 % (Rate Ratio 0,48, Metaanalyse von 7 RCTs; Okubo et al., 2017).

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** Rhythmus, die Abfolge mehrerer Orte und das genaue Antippen zu einem vorgegebenen Zeitpunkt geübt werden sollen; eine einfache, gleichbleibende Regel und eine kurze, klar strukturierte Tipp-Übung gewünscht sind.
- **Weniger passend, wenn …** Beinarbeit, Gleichgewicht, Sturzprävention oder Sportschnelligkeit das Ziel sind (keine Körperübung; dafür echte Schritt- und Gleichgewichtsübungen), schnelle Reaktionen gewünscht sind (besser 101/301) oder ganz ohne Takt geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `hand_arm_beschwerden`: viele schnelle Tipps in kurzer Folge; Pausen einplanen.
  - `tremor_parkinson`: Das Antippen im Takt verlangt gezielte, zeitlich genaue Bewegungen; die Felder sind groß, Zittern kann dennoch zu Abweichungen führen.
  - `presbyopie_gleitsicht`: senkrechte Blickwanderung über die Leiter; Bildschirm tiefer stellen, Arbeitsplatzbrille erwägen.
  - `migraene_lichtempfindlich`, `photosensitive_epilepsie`: Der Taktgeber schwingt sanft mit höchstens zwei Schlägen pro Sekunde, es gibt kein Blitzen, kein Rot und kein Wackeln; gesättigtes Rot gilt als besonders ungünstige Blitzfarbe (Harding et al., 2005). Dennoch bei bekannter Lichtempfindlichkeit zurückhaltend sein; die Schläge sind auch hörbar.
  - Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 104 (Zielverfolgung), 405 (Zickzack-Blickfolge, ohne Hand), 707 (Pfad folgen), 708 (Finger-Sequenzen), 802 (fallende Kugeln abfangen), 809 (Abfangen auf Flugbahnen), 810 (Weg durch einen Korridor). **Abgrenzung in der Gruppe 806–811:** keine Dublette; nächstverwandt ist 809 (ebenfalls zeitliches Treffen, dort aber Abfangen auf Flugbahnen ohne festen Rhythmus statt festem Zickzack im Takt). Keine Diagnosen, keine Heil- oder Leistungsversprechen; Ergebnisse sind keine Normwerte.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Touch:** Das Original ist auf dem Tablet nicht steuerbar. Blickfit: Finger ziehen lassen, Zonen größer (≥ Ø 1°, bei 40 cm ≈ 7 mm, z. B. ≈ 36 CSS-px auf einem iPad mit ≈ 132 CSS-px je Zoll; die CSS-Pixelgröße schwankt zwischen Geräten) und leicht versetzte Fingermarke, damit der Finger die Sprosse nicht verdeckt.
- **Messqualität:** Tempo in °/s statt px/s angeben; Obergrenze und festes Levelende; Treffertest als Strecke zwischen zwei Bildern (kein „Überspringen“); Messwert z. B. „Tempo mit 80 % Erfolg“.
- **Fairness:** Level nicht allein über Serienbonus hochtreiben; Level darf nach Fehlern wieder sinken (adaptiv), damit Einsteiger:innen und Ältere im passenden Bereich bleiben.
- **Sicherheit:** kein roter Vollbild-Blitz und kein Wackeln; Rückmeldung an der Sprosse selbst.
- **Farbsehschwäche:** erledigte Sprossen zusätzlich mit Form/Haken statt nur Grün, verpasste mit Symbol.
- **Ehrliche Texte:** klar sagen, dass es eine Auge-Hand-Übung ist, keine Beinarbeit. Eine echte Schrittvariante (Muster auf dem Boden) wäre möglich, bräuchte aber eigene Sicherheitshinweise (fester Halt, rutschfester Boden, Mehrstärkenbrille beim Treten ungünstig: Lord et al., 2002).
- **Barrierefreiheit:** höherer Kontrast der offenen Sprossen, wählbares Tempo, Pausenfunktion.

## 11. Quellen
### Von der Website angegeben
- Lashley, K. S. (1951). The problem of serial order in behavior. In L. A. Jeffress (Hrsg.), *Cerebral mechanisms in behavior: The Hixon Symposium* (S. 112–131). Wiley. – **Prüfung:** DOI falsch – die angegebene DOI 10.1037/11147-006 existiert nicht (Crossref/doi.org); Buchkapitel ohne DOI (Buch, keine DOI); Seitenangabe uneinheitlich: 112–131 laut Literaturverzeichnis von Rosenbaum et al. (2007), andere Verzeichnisse nennen 112–146 (vermutlich mit Diskussion); die Website-Angabe 112–136 konnte nicht bestätigt werden – nicht abschließend geprüft; **stützt die Aussage der Website:** teilweise (Vorausplanung schneller Folgen ja; „prämotorischer Kortex“, „100–150 ms Rückkopplung“, Chunk aus 4 Sprossen nein).
- Schmidt, R. A. (1975). A schema theory of discrete motor skill learning. *Psychological Review, 82*(4), 225–260. https://doi.org/10.1037/h0076770 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Theorie des GMP, kein „Beweis“; Invarianz des relativen Timings empirisch überwiegend nicht bestätigt, Beek, 1992; für diskrete Bewegungen formuliert).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (gilt für ruhende Ziele; bei bewegten Sprossen nur grobe Näherung; „Fitts-Abbremskurven“ ist kein Begriff der Quelle).
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt die Aussage der Website:** teilweise (Zwei-Komponenten-Modell; keine Aussage zu Leitern, Vorhaltewinkeln oder Normen).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (131 = Artikelnummer); **stützt die Aussage der Website:** nein (misst einfache Reaktionszeit; keine Normen für dieses Spiel, „normiert nach … Woods“ ungedeckt).

### Weitere Fachliteratur
- Beek, P. J. (1992). Inadequacies of the proportional duration model: Perspectives from a dynamical analysis of juggling. *Human Movement Science, 11*(1–2), 227–237. https://doi.org/10.1016/0167-9457(92)90063-H – relatives Timing nicht invariant
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit Farbsehschwäche
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3), 8. https://doi.org/10.1167/15.3.8 – Abfangen, freie Ortswahl
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Zeigerbeschleunigung
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenz
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte
- Hikosaka, O., Nakamura, K., Sakai, K., & Nakahara, H. (2002). Central mechanisms of motor skill learning. *Current Opinion in Neurobiology, 12*(2), 217–222. https://doi.org/10.1016/S0959-4388(02)00307-0 – Basalganglien-/Kleinhirn-Schleifen (CR ✓, Abstract PubMed 12015240)
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine, 64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Mausnutzung und Beschwerden
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts bei bewegten Zielen (CR ✓)
- Lord, S. R., Dayhew, J., & Howland, A. (2002). Multifocal glasses impair edge-contrast sensitivity and depth perception and increase the risk of falls in older people. *Journal of the American Geriatrics Society, 50*(11), 1760–1766. https://doi.org/10.1046/j.1532-5415.2002.50502.x – Mehrstärkenbrille bei echten Schrittübungen
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Folgegrenze
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology, 83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick-Hand-Kopplung
- Okubo, Y., Schoene, D., & Lord, S. R. (2017). Step training improves reaction time, gait and balance and reduces falls in older people: A systematic review and meta-analysis. *British Journal of Sports Medicine, 51*(7), 586–593. https://doi.org/10.1136/bjsports-2015-095452 – echtes Schritttraining
- Padrón-Cabo, A., Rey, E., Kalén, A., & Costa, P. B. (2020). Effects of training with an agility ladder on sprint, agility, and dribbling performance in youth soccer players. *Journal of Human Kinetics, 73*, 219–228. https://doi.org/10.2478/hukin-2019-0146 – echtes Leitertraining ohne Zusatznutzen
- Rosenbaum, D. A., Cohen, R. G., Jax, S. A., Weiss, D. J., & van der Wel, R. (2007). The problem of serial order in behavior: Lashley's legacy. *Human Movement Science, 26*(4), 525–554. https://doi.org/10.1016/j.humov.2007.04.001 – Lashley-Inhalt und -Angabe
- Sakai, K., Kitaguchi, K., & Hikosaka, O. (2003). Chunking during human visuomotor sequence learning. *Experimental Brain Research, 152*(2), 229–242. https://doi.org/10.1007/s00221-003-1548-8 – Chunking
- Saunders, J. A., & Knill, D. C. (2003). Humans use continuous visual feedback from the hand to control fast reaching movements. *Experimental Brain Research, 152*(3), 341–352. https://doi.org/10.1007/s00221-003-1525-2 – Korrekturlatenz ≈ 160 ms
- Schaal, S., Sternad, D., Osu, R., & Kawato, M. (2004). Rhythmic arm movement is not discrete. *Nature Neuroscience, 7*(10), 1136–1143. https://doi.org/10.1038/nn1322 – rhythmisch vs. diskret (CR ✓, Abstract PubMed 15452580)
- Sheppard, J. M., & Young, W. B. (2006). Agility literature review: Classifications, training and testing. *Journal of Sports Sciences, 24*(9), 919–932. https://doi.org/10.1080/02640410500457109 – Definition Agility
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Maus
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Genauigkeit und Wiederholbarkeit von Messungen, Korrelation ist keine Übereinstimmung (S. 17–18, 24)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Messgrenzen im Browser bei Touch und Tastatur
