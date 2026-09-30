---
# ===== Kennung =====
nr: 415
kennung: directional-chaos-pursuit
name: "Richtungschaos verfolgen – Blickfolge bei unregelmäßig driftender Bahn"
name_original: "Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung (Seitentitel: Dynamisches Sehen | Reaktive Blickverfolgung; englisch: Directional Chaos Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit"
blickfit_umsetzung: {kennung: "richtungschaos", name: "Richtungschaos", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/richtungschaos/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt treibt auf dunklem Grund in leicht schlingernden, mit der Zeit schneller werdenden Bahnen über den Bildschirm und prallt an den Rändern ab. Man folgt ihm nur mit den Augen bei ruhigem Kopf; es gibt keine Eingabe, keine Punkte und keine Leistungsmessung."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, nur manuelle Einstellungen: Tempo 0,5–9× (Schnellwahl 0,5/1/2/3/5/7/9×), Zielgröße (Standard 16 px Radius), Dauer 30/45/60/90/120 s, 'Random Speed', 'Hide Line'. Laut Code wirkt das Tempo im Lauf der Runde etwa quadratisch (Obergrenze 750 px/s × Tempo² je Achse): am 24-Zoll-Monitor in 60 cm Median ≈ 15 → 18°/s bei 1×, ≈ 42 → 88°/s bei 2× (Rundenbeginn → Rundenende)."
messgroessen: ["Original: keine Leistungsmessung, nur Sitzungszähler", "sinnvoll mit Eyetracker: Folge-Gain, Zahl und Größe der Aufholsakkaden, Positionsfehler nach Randabprallern", "sinnvoll ohne Eyetracker: manuelles Nachführen mit Finger/Zeiger (mittlerer Abstand, Verzögerung per Kreuzkorrelation) oder kurz eingeblendete Sehzeichen im Ziel, jeweils je Tempo in °/s"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 3
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 1
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
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
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["30–120 s ohne Unterbrechung auf den Bildschirm schauen können", "ruhige Sitzposition: Monitor 50–70 cm, Tablet auf Ständer ca. 40 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen- bzw. Nahkorrektur)", "kein Farbsehen nötig (Zielfarbe frei wählbar)", "keine Hand-Eingabe während der Übung (nur Start per Klick/Tipp)"]
vorsicht_bei: [nystagmus, schwindel_vestibulaer, reisekrankheit, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["glatte Blickfolge über eine ganze Minute bei langsam wechselnder Richtung und Geschwindigkeit üben (sinnvoll bei Tempo 0,5–1,2×, ca. 4–25°/s)", "Wiederfinden des Ziels nach Randabprallern mit kleinen Aufholsakkaden", "Übergang von der vorhersagbaren, sich wiederholenden Kurvenbahn (404, Lissajous-Figur) zu Bahnen mit harten Haken (410) und Sprüngen (414)", "Personen, die für eine Übung keine Hand einsetzen können oder wollen"]
weniger_geeignet_fuer: ["wer Rückmeldung, Punkte oder einen Fortschrittswert erwartet (das Original misst nichts)", "wer gezielt harte, unvorhersagbare Richtungswechsel üben will (die Bahn schlingert nur sanft; harte Wechsel gibt es fast nur am Rand – dafür 410)", "Übungsziel Auge-Hand-Koordination oder manuelles Nachführen (dafür 105, 505, 513, 514)", "Gleitsichtträger:innen im Vollbild bei streng ruhigem Kopf (seitliche Unschärfezonen)", "Einsteiger:innen und ältere Menschen ab Tempo 1,5× (bis ≈ 45°/s, steigend) oder höher"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung selbst wurde nie untersucht; beste Analogie ist eine kleine Laborstudie (Eibenberger et al. 2012, je N = 10), in der 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen die Folgebewegung noch 5 Tage später messbar verbesserte; ein Nutzen für Sport, E-Sport oder Alltag ist nicht belegt."
aehnliche_uebungen: [410, 404, 411, 414, 412, 405, 403, 105, 514, 513, 505, 303]
stichworte: ["smooth pursuit", "Zufallsbewegung", "random walk", "Aufholsakkaden", "catch-up saccades", "unvorhersagbare Bewegung", "Randabpraller", "Blickverfolgung", "rein visuell", "ohne Eingabe"]
---

# 415 · Richtungschaos verfolgen – Blickfolge bei unregelmäßig driftender Bahn

> Original: „Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung“ (Seitentitel „Dynamisches Sehen | Reaktive Blickverfolgung“, englisch „Directional Chaos Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`). Nr. 410 trägt denselben Seitentitel, ist aber eine andere Übung (410 = gerade Strecken mit harten Haken im 500-ms-Takt, 415 = ständiges sanftes Zufallsdriften).

## 1. Kurzbeschreibung

Auf fast schwarzem Grund bewegt sich ein roter, leuchtender Punkt (Standard ≈ 0,7–0,9°) und prallt an den Bildrändern ab. Seine Geschwindigkeit wird in jedem Bild ein wenig zufällig verändert: Die Bahn schlingert leicht, und im Lauf der Runde wird der Punkt meist schneller. Man folgt ihm nur mit den Augen bei ruhigem Kopf. Das Original misst nichts und gibt keine Rückmeldung.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (seitenspezifischer Chunk `38156-…js` plus gemeinsame Module `90762-…js`, geprüft 29.09.2026; nur Mechanik übernommen). Winkel und Häufigkeiten sind **eigene Umrechnungen und Simulationen** (je 60–100 simulierte Runden) für 24-Zoll-Full-HD in 60 cm (≈ 38 px/°, Vollbild 1920 × 1080) bzw. 11-Zoll-Tablet in 40 cm (≈ 36 CSS-px/°, 1180 × 820).

- **Ablauf (Code):** Einstellungen → Start → Vollbild → Countdown 3-2-1-GO (≈ 2,45 s, mit Tönen) → Übung mit Restzeit → Endbildschirm „Smooth Pursuit Calibrated“ (kalibriert wird nichts). Escape oder Verlassen des Vollbilds bricht ab. Gespeichert wird nur ein Sitzungszähler im Browser.
- **Darstellung (Code):** wie 410 – Hintergrund #050508, schwaches 40-px-Raster (Day Mode: weiß), Ziel mit Radius „Size“ (Standard 16 px) aus Scheibe, Ring und Leuchtschein („Neon Glow“ standardmäßig an), Standardfarbe Rot #ef4444. Eine blasse Linie zeigt standardmäßig die **aktuelle** Bewegungsrichtung (≈ 80 ms ÷ Tempo voraus); „Hide Line“ blendet sie aus. „Gaze Trail“ = Spur der letzten 15 Bilder. Maus/Finger zeichnen nur ein Fadenkreuz.
- **Bewegung (Code):** Start in Bildmitte mit je Achse 4–7 px pro 16 ms (Richtung immer schräg). In jedem Bild wird zu jeder Geschwindigkeitskomponente ein gleichverteilter Zufallswert addiert („Zufallsweg der Geschwindigkeit“), Obergrenze je Achse 12 px/16 ms × Tempo. Randabprall kehrt die Komponente um (× 1,05). Tempo steckt sowohl im Zufallsschritt und in der Obergrenze als auch im Zeitschritt → Geschwindigkeit wächst mit Tempo², Obergrenze 750 px/s × Tempo² je Achse (1×: ≈ 20°/s je Achse, ≈ 28°/s schräg).
- **„Random Speed“ (Code):** kein Zufall, sondern eine feste Mehrfach-Sinusfunktion der Uhrzeit, die das Tempo auf das 0,4- bis 1,9-Fache moduliert (wie 410); die Geschwindigkeit schwankt damit etwa um das 0,15- bis 3,7-Fache.
- **Bildfrequenz (Code):** Bewegung zeitbasiert (Schritt ≤ 100 ms), aber Bilder < 13 ms nach dem letzten werden verworfen (≤ ≈ 77 Aktualisierungen/s; 60 Hz → 60, 90 Hz → 45, 144 Hz → 72, 240 Hz → 60). Die Stärke des Zufallswegs hängt von der Schrittlänge ab: bei 144 Hz ≈ 0,83-fach, bei 90 Hz ≈ 1,33-fach gegenüber 60 Hz. In der Simulation ändert das die Bahnstatistik kaum (Median 1×: 16,6–17,5°/s). Ohne die 13-ms-Sperre wäre der Zufallsweg bei 144 Hz nur ≈ 0,42-fach so stark.

| Tempo | Geschwindigkeit, Median (Beginn → Ende der 60-s-Runde) | Randabpraller pro s (Monitor / Tablet) | Richtungsänderung je 250 ms ohne Rand (Median / 90 %) |
|---|---|---|---|
| 0,5× | ≈ 5 → 4°/s | 0,16 / – | ≈ 4° / 11° |
| 1× (Standard) | ≈ 15 → 18°/s | 0,6 / 0,9 | ≈ 4° / 12° |
| 1,5× | ≈ 27 → 45°/s | 1,5 / – | ≈ 4° / 12° |
| 2× | ≈ 42 → 88°/s | 2,8 / 4,5 | ≈ 4° / 15° |
| 3× | ≈ 230°/s (meist an der Obergrenze) | 7,4 / – | ≈ 4° / 12° |

- **Kernbefund (eigene Simulation):** Abseits der Ränder ändert sich die Richtung nur um ≈ 4° je 250 ms; nach 250 ms weicht das Ziel bei 1× im Median nur ≈ 16′ (≈ 0,27°) von einer geraden Fortsetzung ab – weniger als sein Radius. Harte Richtungswechsel entstehen fast nur an den Rändern, und die sind sichtbar angekündigt. Das „Chaos“ ist also ein sanftes Schlingern mit Tempozuwachs plus Randabpraller.
- **Widersprüche Regeltext ↔ Code:** „stochastisch wechselnde Abbiegewinkel“, „jede Antizipation versagt“ – kurzfristig ist die Bahn gut vorhersagbar, die Richtungslinie zeigt die Richtung sogar an; „0,5× bis 2,0×“ – Regler bis 9×; „Random Speed = erratische Beschleunigung“ – deterministische Sinusmodulation; „Pure Visual“ – Fadenkreuz lädt zum Mitführen ein; „Blickkonstanz analysieren“ – keine Daten; 144/240-Hz-Empfehlung – der Code selbst begrenzt auf ≈ 77 Bilder/s.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Website:** Chaotische Richtungswechsel schalteten das „prädiktive Vorwärtsmodell des Kleinhirns“ aus und erzwängen rein reaktive Rückkopplung. Beim Abbiegen übersteige das Ziel die „Arbeitsgrenze der Folgebewegung (ca. 30°/s)“, nach 150–200 ms folge eine Korrektursakkade; das Wiederaufnehmen „definiere die dynamische Sehkraft“. Das Training konditioniere Augenmuskeln und frontale Augenfelder, helfe in FPS-Spielen und Ballsport; der Kopf müsse fixiert sein (sonst VOR); 144/240-Hz-Monitore ließen den neuen Bewegungsvektor „bis zu 12 ms früher“ wahrnehmen. Empfehlung 3–5 × 60 s mit 30 s Pause. Eine Tabelle mit fünf „Leistungsstufen“ ordnet das **gewählte Tempo** Profilen zu („Apex Reaktiv“ ab 2×, „typischer Leistungsbereich gesunder Erwachsener“ 1,0–1,3×).

**Einordnung:**

- **Grundidee richtig:** Unvorhersagbare Bahnen werden schlechter verfolgt als vorhersagbare (Bahill et al., 1980; Kurzfassung nicht frei zugänglich, Inhalt nur über Titel und Sekundärzitate erschlossen). Selbst pseudo-zufällige Reize werden aber teilweise vorhergesagt (Barnes et al., 1987); Vorhersage ist Normalfall der Folgebewegung (Barnes, 2008; Kowler et al., 2019). Bei **dieser** Bahn (Abschnitt 2) ist kurzfristige Vorhersage gut möglich – „jede Antizipation versagt“ trifft auf die Übung nicht zu.
- **30°/s-Grenze falsch:** Der Gain sinkt stetig mit dem Tempo (Collewijn & Tamminga, 1984); in einer kleinen Studie hielten 4 von 5 Personen ≈ 90 % Gain bis ≈ 100°/s bei gleichförmiger Rampenbewegung (Meyer et al., 1985; N = 5). Ein Richtungswechsel erhöht die Geschwindigkeit nicht.
- **Latenz eher hoch angesetzt und nicht mit den genannten Quellen belegt:** Nach einem abrupten Richtungswechsel bremst die Folge nach ≈ 90 ms, die Richtung ändert sich ab ≈ 130 ms (Soechting et al., 2005); Aufholsakkaden folgen ≈ 125 ms, nachdem das Auslösekriterium (vorhergesagte Kreuzungszeit von Blick und Ziel) erfüllt ist (de Brouwer et al., 2002). 150–200 ms ab dem Richtungswechsel sind damit nicht abwegig, aber als feste Zahl nicht belegt.
- **„Konditioniert Augenmuskeln/FEF“ – unbelegt:** Auge und Hand reagieren auf Richtungswechsel ähnlich schnell; begrenzend ist die neuronale Verarbeitung, nicht der Muskel (Engel et al., 2000).
- **Kopf fixieren wegen VOR:** Kopf-Augen-Folge ist ebenso genau (Lanman et al., 1978, Affen), Spitzenschlagleute im Cricket führen den Kopf mit (Mann et al., 2013). Ruhiger Kopf ist sinnvoll, wenn gezielt die **Augen**folge geübt werden soll – „Trainingseffekt geht verloren“ ist unbelegt.
- **144/240 Hz:** Das Bildraster verzögert eine Änderung bei 60 Hz im Mittel ≈ 8 ms, bei 144 Hz ≈ 3,5 ms (eigene Abschätzung); die Seite selbst rendert höchstens ≈ 77-mal/s. Latenz zählt mehr als Bildfrequenz über 60 Hz (Spjut et al., 2019); Woods et al. (2015) behandeln Reaktionszeit, nicht Monitore.
- **Leistungsstufen ohne Datengrundlage:** Die Seite misst nichts; die „Stufe“ ist der eingestellte Regler. Ab 2× liegt das Ziel zum Rundenende meist nahe an oder über der Folgegrenze – „Apex“ heißt dann vor allem Hinterherspringen. Normwerte für 1,0–1,3× existieren nicht.
- **Transfer E-Sport/Ballsport:** Yang et al. (2025) ist ein Querschnitt ohne Training; Übersichten finden für Augen-Übungen nur gemischte Belege (Appelbaum & Erickson, 2018) und keinen Ferntransfer (Fransen, 2024). „Dynamische Sehschärfe“ (Details an bewegten Objekten erkennen) wird nicht geprüft.
- **3–5 × 60 s mit Pausen:** ohne Quelle, aber vernünftig kurz.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel ≈ 0,7–1,1° (Monitor 60 cm), Kern ≈ 9′ – weit über der Auflösungsgrenze; Sehschärfe nicht leistungsbegrenzend.
- **Folgebewegung:** Anlauf ≈ 100 ms (Carl & Gellman, 1987), glatter Gain stets < 0,95 (Collewijn & Tamminga, 1984). Bei 1× (≈ 9–28°/s, sanft gekrümmt) bleibt die Aufgabe überwiegend glatte Folge mit gelegentlichen Aufholsakkaden – daher `blickfolge` 3, `sakkaden` 2. Nach einem Randabprall (Richtungsumkehr einer Achse) läuft das Auge ≈ 90–130 ms weiter (Soechting et al., 2005): bei 18°/s ≈ 1,5–2,5° Fehler, der per Sakkade korrigiert wird.
- **Folgerung für das Tempo (eigene Ableitung):** Ab 1,5× steigt die Geschwindigkeit innerhalb der Runde auf ≈ 45°/s, ab 2× auf ≈ 80–110°/s mit ≈ 3 (Monitor) bis 4,5 (Tablet) Abprallern/s – nahe bzw. über der Folgegrenze (Meyer et al., 1985). Sinnvoll: **≈ 0,5–1,2×**.
- **Bewegungsunschärfe:** Verschmierung am Sample-and-hold-Display ≈ Geschwindigkeit ÷ Bildfrequenz: 1×/60 Hz ≈ 15–18′, 2× bis ≈ 90′ (größer als das Ziel; eigene Rechnung).
- **Blickfeld und Gleitsicht:** Vollbild 24 Zoll in 60 cm ≈ 48° × 28° (Tablet 40 cm ≈ 33° × 23°), das Ziel erreicht die Ränder regelmäßig. Der scharfe Zwischenbereich einer Gleitsichtbrille ist seitlich nur ≈ 13–18° breit statt ≈ 60° bei Einstärkengläsern (Han et al., 2003); neue Träger:innen bewegen mehr den Kopf (Hutchings et al., 2007). Bei ruhigem Kopf gerät das Ziel seitlich in die Unschärfezone, unten in den Nahteil, oben in den Fernteil → Arbeitsplatzbrille, kleineres Feld oder Kopfbewegung erlauben.
- **Akkommodation:** 60 cm ≈ 1,7 dpt, 40 cm ≈ 2,5 dpt – bei Alterssichtigkeit passende Zwischen-/Nahkorrektur.
- **Kontrast/Farbe:** Rot #ef4444 auf #050508 ≈ 5,4 : 1 (eigene WCAG-Rechnung, wie 410). Bei Protan-Schwäche wirkt Rot dunkler (≈ 8 % der Männer mit Rot-Grün-Schwäche; Birch, 2012) → Weiß oder Gelb robuster.
- **Trockenes Auge:** Bildschirmarbeit senkte die Lidschlagrate im Mittel etwa auf ein Fünftel (Patel et al., 1991).
- **Alter:** Bei 75- bis 93-Jährigen ist der Folge-Gain bei allen Geschwindigkeiten niedriger als bei Jüngeren (Unterschied wächst mit Tempo und Beschleunigung), die Sakkaden-Reaktionszeit ist verlängert (Moschner & Baloh, 1994).
- **Photosensitivität:** Kein Blinken; Standard-Leuchtfläche ≈ 2–8·10⁻⁴ sr (mit Schein), weit unter der Flächenschwelle 0,006 sr (Harding et al., 2005; WCAG 2.3.1). Bei Size 50 px am Tablet in 30 cm nähert sich der Schein der Schwelle, bleibt aber darunter; ab ≈ 2–3× springt das helle Ziel pro Bild um mehr als seinen Durchmesser (eigene Abschätzung) – das ist kein Blitz im Sinn von WCAG, kann aber unruhig wirken. Stetig bewegtes Ziel ohne Blinken wie 410–413 → `flimmern_lichtreize` 0.

## 5. Neurowissenschaftliche Grundlagen

- Bewegungssignale aus MT/MST steuern die Folge über das Folgeareal des FEF, Brückenkerne und Kleinhirn; ≈ 100 ms Bewegung werden in den Start übersetzt (Lisberger, 2010). Das FEF hat den direktesten Einfluss, Basalganglien und Colliculus superior sind beteiligt (Krauzlis, 2004); im Colliculus superior kodieren Neurone einen gemeinsamen Fehler für Sakkade und Folge (Affen; Krauzlis et al., 1997). Sakkaden und Folge gelten als zwei Ergebnisse eines gemeinsamen Prozesses (Orban de Xivry & Lefèvre, 2007).
- Extraretinale Signale (Efferenzkopie, Geschwindigkeitsgedächtnis) und Aufmerksamkeit stützen die Folge (Barnes, 2008). Bei langsam driftender Bahn wie hier kann das System kurzfristig extrapolieren; „das Kleinhirn wird ausgeschaltet“ ist nicht belegt. Eine „Stärkung“ bestimmter Areale durch die Übung ist nicht gezeigt.

## 6. Motorische Grundlagen

- Keine Hand-Eingabe; die „Motorik“ sind die Augenbewegungen selbst → motorische Profilwerte 0. Augenmuskeln sind nicht der Engpass (Engel et al., 2000).
- Wer Maus oder Finger mitführt, macht daraus eine unbewertete Nachführaufgabe (vgl. 105, 505, 514); am Tablet verdeckt der Finger das Ziel. Gerät stabil aufstellen (Ständer), aufrecht sitzen.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung:** Fortschritt nur subjektiv; die „Stufe“ ist das gewählte Tempo. Gain und Sakkaden wären nur mit Eyetracker erfassbar.
- **Innerhalb der Runde nicht konstant:** Tempo steigt mit der Zeit (Abschnitt 2); Rundenlänge verändert die Schwierigkeit mit – Vergleiche nur bei gleicher Dauer.
- **Gerät/Abstand:** px/s → °/s hängt von Pixeldichte und Abstand ab; kleinere Bildflächen (Tablet) bringen ≈ 50 % mehr Abpraller. Bildfrequenz 90/165 Hz: weniger Aktualisierungen als 60 Hz (13-ms-Sperre). Vergleiche nur am selben Gerät.
- **Zufall:** Jede Runde verläuft anders (Zufallsweg); zwei Runden gleicher Einstellung sind unterschiedlich schwer.
- **Person:** Ermüdung, Alter (Moschner & Baloh, 1994), Aufmerksamkeit, Brillenversorgung. Subjektive Besserung kann Gewöhnung an die Aufgabe sein.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Keine Studie zu dieser Übung. Beste Analogie: 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen verbesserten die glatte Folgebewegung (geschlossene Regelschleife) noch nach 5 Tagen; eine Kontrollgruppe mit nur 20 min Pause statt Training zeigte keinen Effekt (Eibenberger et al., 2012; je N = 10, Eyetracker). Die Autor:innen betonen, dass das Folgesystem im Training ausreichend gefordert sein muss. Lernen braucht Rückmeldung: mit Belohnung für genaues Folgen stieg der Gain bei kurz verdeckten Zielen von 0,59 auf 0,89, mit zufälliger Belohnung nur auf 0,63 (Madelain & Krauzlis, 2003). Das Original gibt **keine** Rückmeldung.
- **Naher Transfer – schwach:** Bei Eibenberger et al. (2012) wurde mit einem anderen Paradigma getestet – ein Hinweis, mehr nicht.
- **Alltagstransfer – fehlend:** Kein Beleg für Sport, E-Sport oder Verkehr (Fransen, 2024; Simons et al., 2016); große Effekte digitaler Sport-Sehtrainings entstehen vor allem, wenn am Trainingsgerät getestet wird (Guo et al., 2025).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** längere, gleichmäßig fordernde Blickfolge mit leichten Richtungs- und Tempowechseln geübt werden soll, ohne Hand-Eingabe; als Stufe zwischen 404 (vorhersagbare, sich wiederholende Kurve) und 410 (harte Haken). Einstellung: Tempo 0,5–1,0× zum Einstieg, bis 1,2× für Geübte; „Random Speed“ aus; Richtungslinie erst an, später aus; 3–5 × 60 s (oder 30 s) mit Pausen und bewusstem Blinzeln.
- **Weniger passend, wenn …** Rückmeldung/Fortschritt gewünscht ist, harte unvorhersagbare Wechsel das Ziel sind (410, 411; Positionssprünge 414), Auge-Hand-Koordination gefragt ist (105, 505, 513, 514) oder hohe Tempi gewählt würden (ab 1,5× für Einsteiger:innen und Ältere, ab 2× für alle).
- **Vorsicht / anpassen bei …**
  - **Photosensitivität geprüft (kein Vorsichtsschlüssel):** kein Blinken, stetig bewegtes Ziel (Abschnitt 4) → `flimmern_lichtreize` 0; bei Licht- oder Reizempfindlichkeit trotzdem Tempo ≤ 1,2×, kleine Zielgröße, „Neon Glow“/„Gaze Trail“ aus, Day Mode meiden.
  - `nystagmus`: Folge und Blickhalten können eingeschränkt sein, Frustgefahr.
  - `schwindel_vestibulaer`, `reisekrankheit`: ständig wechselnde Bewegung im Vollbild; kleines Ziel auf ruhigem Grund, daher eher gering, bei hohem Tempo mehr.
  - `gesichtsfeldausfall`: Ziel kann im ausgefallenen Bereich verloren gehen, v. a. nach Randabprallern.
  - `presbyopie_gleitsicht`: seitliche Unschärfe im Vollbild → kleineres Feld, Bildschirmbrille, Kopfbewegung erlauben.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: wenig Lidschlag bei 60 s Dauerfolgen; kurze Blöcke, Pausen.
  - `kinder_unter_6`: abstrakte Aufgabe ohne Rückmeldung über 60 s – nicht empfohlen.
- **Kombiniert gut mit …** 412/404 (gleichförmige Grundform) → **415** (sanftes Driften) → 410 (harte Haken im festen Takt) → 411 (zufällig getaktete Umkehrungen, Tempo steigt): steigende Unvorhersagbarkeit. **Unterschied zu 410** (gleicher Seitentitel): dort gerade Strecken mit harten Haken alle 0,5 s, hier kaum merkliche Richtungsänderung (≈ 4° je 250 ms) und harte Wechsel fast nur am Rand. Daneben 414 (Positionssprünge), 303 (Blicksprünge auf ruhende Ziele), 105/514 (gleiche Idee mit Hand).

Keine Diagnose, keine Heilversprechen: Trainingsaufgabe für gesunde Nutzer:innen, kein Test der Augenbeweglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Zufallsbahn kontrollieren:** Geschwindigkeit in °/s konstant oder in festem Band halten (nicht mit der Zeit wachsend), Krümmung und Wechselrate getrennt einstellbar (z. B. glatt gefiltertes Rauschen oder Summe von Sinuswellen mit wählbarer Bandbreite, vgl. Barnes et al., 1987); Tempo linear statt quadratisch; seltener an den Rand führen.
- **Prüfbar machen ohne Eyetracker:** Zufallsbahnen eignen sich gut zur Messung per manuellem Nachführen – beim Maus-Nachführen eines Zufallsweg-Ziels korrelierte die per Modell (Kalman-Filter) geschätzte Wahrnehmungsunsicherheit eng mit klassischer Schwellenmessung (R² > 97 %), einfache Kennwerte wie die Kreuzkorrelation Ziel–Zeiger sagten die relative Empfindlichkeit voraus (Bonnen et al., 2015; Übersicht Burge & Bonnen, 2025). Gemessen wird dabei Wahrnehmung plus Handsteuerung, nicht die Augenfolge selbst. Alternativ kurz eingeblendete Sehzeichen im Ziel (wie `scharf-in-bewegung`).
- **Technik:** keine 13-ms-Sperre, Bildfrequenz ermitteln und speichern; Sprung pro Bild ≤ 1° (bei 60 Hz ≤ 60°/s, am Tablet eher 30–40°/s); kein Leuchtschein; sichtbarer Stopp-Knopf.
- **Tablet/Optiker:** Ständer, ≈ 40 cm, Querformat; wählbar kleineres Bewegungsfeld (20–30°) für Gleitsicht; „Kopf ruhig“ als Variante statt Pflicht; Standardfarbe Weiß oder Gelb auf Dunkel.
- **Ehrliche Texte** (keine Profi-Stufen, Hirnregion- oder Sportversprechen, kein „Test“); große Bedienflächen, DE/IT, kurze Blöcke mit Blinzelpause.

## 11. Quellen

### Von der Website angegeben

- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – Titel und Sekundärzitate belegen, dass unvorhersagbare Bahnen (Pseudozufallsfolge gerader Rampen) schlechter verfolgt werden; eine Kurzfassung ist in PubMed/Crossref nicht hinterlegt, Volltext nicht eingesehen. „Raten verdoppelt den Zeitverlust“, 150–200 ms und 30°/s sind daher **nicht geprüft** und in der Sekundärliteratur nicht mit dieser Arbeit verbunden.
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für Vorhersage bei periodischen Bahnen und extraretinale Signale; nein für „dynamische Sehkraft“ und Leistungsstufen.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Netzwerk, FEF, gemeinsame Kaskade von Sakkade und Folge; keine „Arbeitsgrenze 30°/s“).
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (nur bibliografisch, Inhalt nicht eingesehen); **stützt:** unklar (Aussage zum „internen Vorwärtsmodell des Kleinhirns“ nicht prüfbar).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website leicht falsch („pursuit“ statt „tracking“); **stützt:** teilweise (Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folge; Inhalt nur über Titel/Sekundärliteratur, Latenz 150–200 ms nicht geprüft).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (einfache Reaktionszeit; nichts zu 144-Hz-Monitoren oder „12 ms früher“).
- Nur im Fließtext: „Yang et al., 2025“ – vermutlich Yang, L., Zhang, W., Li, P., Tang, H., Chen, S., & Jin, X. (2025). The aiming advantages in experienced first-person shooter gamers: Evidence from eye movement patterns. *Computers in Human Behavior, 165*, 108573. https://doi.org/10.1016/j.chb.2025.108573 – **Prüfung:** DOI stimmt ✓, Zuordnung **unsicher**; **stützt:** teilweise (Querschnitt, N = 63; kein Training, keine Ausweichmanöver).
- Nur im Fließtext: „Appelbaum & Erickson, 2018“ – Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160–189. https://doi.org/10.1080/1750984X.2016.1266376 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (nur begrenzte, gemischte Belege; kein Transfer auf Tennis/Fußball gezeigt).
- Nur im Fließtext: „Leigh & Zee, 2015“ – Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** Buch, DOI stimmt ✓ (Inhalt nicht eingesehen); **stützt:** unklar/nein („Kopfbewegung → Trainingseffekt verloren“ unbelegt).
- Die Leistungsstufen-Tabelle beruft sich auf Bahill et al. (1980), Barnes (2008), Krauzlis (2004) und Robinson (1965) – **keine** dieser Arbeiten enthält Tempo-Stufen oder Normwerte.

### Weitere Fachliteratur

- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – auch pseudo-zufällige Bewegung wird teilweise vorhergesagt; Gain fällt mit Bandbreite
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Bonnen, K., Burge, J., Yates, J., Pillow, J., & Cormack, L. K. (2015). Continuous psychophysics: Target-tracking to measure visual sensitivity. *Journal of Vision, 15*(3), 14. https://doi.org/10.1167/15.3.14 – Maus-Nachführen eines Zufallsweg-Ziels als Messverfahren (Kalman-Modell: R² > 97 % mit klassischer Schwellenmessung)
- Burge, J., & Bonnen, K. (2025). Continuous psychophysics: Past, present, future. *Trends in Cognitive Sciences, 29*(5), 481–493. https://doi.org/10.1016/j.tics.2025.01.005 – Übersicht Tracking-Psychophysik
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Anlaufzeit ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit Tempo
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser und Latenz (≈ 125 ms) von Aufholsakkaden
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Training mit quasi-zufälligem Ziel
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Auge und Hand gleich; Muskeln nicht begrenzend
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein Ferntransfer auf Sport
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem am Trainingsgerät
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – schmales Gleitsicht-Sehfeld am Bildschirm
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte (≥ 3 Hz, ≥ 0,006 sr)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – mehr Kopfbewegung mit neuer Gleitsichtbrille
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901 – Vorhersage als Normalfall
- Krauzlis, R. J., Basso, M. A., & Wurtz, R. H. (1997). Shared motor error for multiple eye movements. *Science, 276*(5319), 1693–1695. https://doi.org/10.1126/science.276.5319.1693 – gemeinsamer Fehler im Colliculus superior (Affen)
- Lanman, J., Bizzi, E., & Allum, J. (1978). The coordination of eye and head movement during smooth pursuit. *Brain Research, 153*(1), 39–53. https://doi.org/10.1016/0006-8993(78)91127-7 – Kopf-Augen-Folge genauso genau (Affen)
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Netzwerk MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Lernen braucht Rückmeldung
- Mann, D. L., Spratford, W., & Abernethy, B. (2013). The head tracks and gaze predicts: How the world's best batters hit a ball. *PLoS ONE, 8*(3), e58289. https://doi.org/10.1371/journal.pone.0058289 – Kopfbewegung beim Verfolgen im Spitzensport
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge und Sakkaden im Alter
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkade und Folge als gemeinsamer Prozess
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf Richtungswechsel (≈ 90 ms)
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Erfolgskriterien 2.2.2, 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitz-Flächenschwelle, Pause-Pflicht
