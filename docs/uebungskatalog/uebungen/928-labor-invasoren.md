---
# ===== Kennung =====
nr: 928
kennung: labor-invasoren
name: "Invasoren (Zielpunkt unter fallende Raumschiffe steuern und dort halten)"
name_original: "– (eigene Labor-Übung, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-invasoren", name: "Invasoren", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Raumschiffe fallen von oben. Man steuert einen Zielpunkt am unteren Rand seitlich unter ein Schiff und hält ihn dort, bis sich ein Ring um das Schiff gefüllt hat; dann ist es getroffen. Schiffe, die unten ankommen, zählen als verpasst. Gesteuert wird mit dem Finger, der Maus, den Pfeiltasten oder durch Kippen des Geräts; Tempo, Haltezeit und Toleranz stellt man selbst ein."
ziel_funktionen: [auge_hand_koordination, kontinuierliche_steuerung, antizipation]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen; alles über Einstellungen (Standard in Klammern): Dauer 20–180 s (60 s), neues Schiff alle 800–5000 ms (2200 ms), Fallgeschwindigkeit 3–25 cm/s (8 cm/s), Haltezeit 100–1500 ms (400 ms), seitliche Toleranz 0,5–6 cm (2 cm, höchstens ein Viertel der Feldbreite), Steuerung Finger/Maus, Pfeiltasten (auch A/D) oder Gerät kippen (voller Ausschlag ab ±20°, Totzone ±2°, Mitte = Haltung beim Start). Größen in cm nach Kalibrierung; Schiffsgröße etwa 8 % der kürzeren Feldseite (0,6–1,6 cm). Leichter: langsame Schiffe (4–6 cm/s), seltener neue Schiffe, kurze Haltezeit, große Toleranz, Finger. Schwerer: schnellere und häufigere Schiffe, längere Haltezeit, kleine Toleranz; Pfeiltasten oder Kippen sind schwerer als der Finger. Faustregel der App (keine Vorgabe aus der Forschung): über 90 % in drei Durchläufen → eine Einstellung schwerer, unter 60 % → leichter."
messgroessen: ["Hauptwert: getroffene Schiffe", "verpasste Schiffe", "Trefferquote (getroffene an allen gewerteten Schiffen)", "Zeit vom Erscheinen bis zum Treffer (Mittel und Median; enthält die Touch-Verzögerung)", "tatsächlich geltende Toleranz in cm", "Vergleich nur mit gleichen Einstellungen und gleicher Steuerung; keine Normwerte; keine Messung von Haltung oder Gleichgewicht"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 1
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 3
    ruhige_hand: 2
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 1
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibriert, damit Toleranz und Fallgeschwindigkeit in Zentimetern stimmen", "Am besten im Sitzen; wer steht oder auf einer Unterlage balanciert, braucht Wand oder festen Stuhl in Reichweite und eine Hilfsperson", "Für „Gerät kippen“: Gerät mit Lagesensor, mit beiden Händen fest gehalten; der Browser fragt erst nach dem Antippen nach der Erlaubnis", "Seitliche Fingerbewegung über die Breite des Feldes oder Pfeiltasten"]
vorsicht_bei: [sturzgefahr, schwindel_vestibulaer, reisekrankheit, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden]
geeignet_fuer: ["Einen Zielpunkt seitlich unter bewegte Ziele führen und die Ausrichtung kurz ruhig halten (Auge-Hand-Abstimmung mit Haltezeit)", "Das nächste Ziel wählen (tiefstes Schiff zuerst) bei einstellbarem Tempo", "Vergleich der Steuerarten Finger, Pfeiltasten und Kippen mit sich selbst", "Vergleich mit sich selbst über mehrere Durchläufe mit gleichen Einstellungen auf demselben Gerät"]
weniger_geeignet_fuer: ["Messung von Gleichgewicht, Haltung oder Reaktionsfähigkeit (die App misst nur Zählwerte der Übung)", "Gleichgewichts- oder Sturzvorbeugungstraining: das Kippen des Geräts ist kein Gleichgewichtstraining", "Menschen, die ohne Sicherung stehen oder balancieren würden", "Diagnose, Normvergleich, Therapie oder Reha"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: fehlend
  alltag_transfer: fehlend
  kommentar: "Für genau diese Übung gibt es keine Studie. Dass man in einer Bildschirmaufgabe besser wird, ist zu erwarten; in Studien zu Bildschirmübungen fallen Verbesserungen aber deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt (Guo et al. 2025). Sturzvorbeugung ist für betreute Programme mit echter Bewegung belegt (Sherrington et al. 2019), Exergames wirkten bei Älteren nur auf kognitive Funktionen, die körperliche Wirkung ist umstritten (Gallou-Guyot et al. 2020) – das lässt sich nicht auf diese Steuerung am Bildschirm übertragen."
aehnliche_uebungen: [306, 505, 512, 808]
stichworte: ["fallende Ziele", "Ausrichten und Halten", "Haltezeit", "Auge-Hand-Koordination", "manuelles Nachführen", "Gerät kippen", "Pfeiltasten", "Fitts'sches Gesetz", "Labor-Übung", "kein Gleichgewichtstraining"]
---

# 928 · Invasoren (Zielpunkt unter fallende Raumschiffe steuern und dort halten)

> Original: – (eigene Labor-Übung, kein Vorbild) · Blickfit: „Invasoren“ (`src/exercises/labor-invasoren/`, Kategorie Reaktion)

## 1. Kurzbeschreibung

Raumschiffe (umgekehrte Dreiecke mit Cockpit) fallen von oben ins Feld. Am unteren Rand steht ein Zielpunkt (ein aufrechtes Dreieck mit Strahl), den man seitlich unter ein Schiff fährt. Steht er lange genug innerhalb der Toleranz unter dem Schiff, füllt sich ein Ring um das Schiff im Uhrzeigersinn; ist er voll, ist das Schiff getroffen (✓). Erreicht ein Schiff den unteren Rand, zählt es als verpasst (✗). Halten lässt sich ein Schiff erst ab dem oberen Viertel des Feldes; eine gestrichelte Linie zeigt die Grenze. Gesteuert wird mit dem Finger bzw. der Maus (der Zielpunkt folgt der waagrechten Position), mit den Pfeiltasten (auch A und D) oder durch Kippen des Geräts nach links und rechts. Die wichtigsten Einstellungen sind Dauer (Standard 60 s), Abstand der Schiffe (2,2 s), Fallgeschwindigkeit (8 cm/s), Haltezeit (400 ms), seitliche Toleranz (2 cm) und Steuerung. Gezeigt werden getroffene und verpasste Schiffe, Trefferquote und Zeit bis zum Treffer – ohne Noten und ohne Normwerte.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts`, `texts.ts`, `science.ts` in `src/exercises/labor-invasoren/` und `_shared/labor-steuerung.ts` (Stand 05.10.2026).

- **Feld und Größen:** Koordinaten in cm (Kalibrierung, `usesCalibration: true`). Halbe Schiffsbreite 8 % der kürzeren Feldseite, begrenzt auf 0,6–1,6 cm. Toleranz = Einstellung, aber höchstens ein Viertel der Feldbreite (mindestens 0,3 cm); im Ergebnis steht die geltende Toleranz. Schiffe erscheinen ganz im Feld, der Zielpunkt bleibt ganz im Feld. Dreht man das Tablet, werden Schiffe und Zielpunkt umgerechnet.
- **Takt:** Erstes Schiff 600 ms nach dem Start, danach alle `spawnMs`. Bewegung mit `dt` (bildratenunabhängig, höchstens 50 ms je Bild). Ein Schiff gilt als verpasst bei `max(H/2, H − 1 cm)`.
- **Halten:** Ausgerichtet heißt: waagrechter Abstand ≤ Toleranz und Schiff unterhalb von 25 % der Feldhöhe. Die Haltezeit wächst, solange man ausgerichtet ist, und baut sich bei Abweichung doppelt so schnell ab. Mehrere Schiffe können gleichzeitig im Feld sein.
- **Steuerung:** Zeiger = absolute Position; Pfeiltasten und Kippen = Geschwindigkeit (0,9 Feldbreiten je Sekunde bei Vollausschlag). Kippen: relativ zur Haltung beim Start, Totzone ±2°, voller Ausschlag ab ±20°; nur nach Antippen von „Kippen einschalten“; ohne Erlaubnis oder Sensor Rückfall auf Finger/Pfeiltasten. Sensorwerte werden weder gespeichert noch gesendet. Eine Balance-Plattform wird nicht ausgelesen; nur Tastendrücke eines angeschlossenen Geräts kämen an.
- **Ergebnis:** getroffene (Hauptwert) und verpasste Schiffe, Trefferquote, Zeit bis zum Treffer (Mittel, Median), geltende Toleranz; Tipp nach eigenen Faustregeln (kein Treffer → leichter; < 60 % bei ≥ 8 Schiffen → leichter; ≥ 90 % bei ≥ 12 Treffern → eine Einstellung schwerer). Punkte nur zur Motivation (10 je Treffer). Keine Stufen.
- **Darstellung:** Form statt nur Farbe; ✓ und ✗ ruhig, kein Blitz, kein Rot. Schnellmodus 8 s; Intro-Film mit langsamen Schiffen (3 cm/s), ein Schiff wird absichtlich durchgelassen.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Zielen mit Haltezeit:** Die Zeit, ein Ziel zu erreichen, wächst mit dem Weg und sinkt mit der Größe des Ziels (Fitts 1954; MacKenzie 1992). Die Toleranz wirkt hier wie die Zielbreite; die Haltezeit verlangt, die Ausrichtung zu halten, statt nur vorbeizufahren.
- **Bewegte Ziele:** Die Schiffe fallen gleichmäßig; ihre Bahn ist vorhersagbar, damit Vorausplanen (welches Schiff zuerst) möglich ist.
- **Steuerarten:** Finger (Position) ist am direktesten; Pfeiltasten und Kippen steuern die Geschwindigkeit und sind deshalb schwerer. Das Kippen ist eine Bedienform, keine Gleichgewichtsaufgabe.
- **Sicherheit:** Hinweise wie bei den übrigen Gleichgewichts-Übungen der App (eher sitzen, Sturzgefahr im Stand, Warnzeichen nach Muchnick 2008, S. 6 und 28).

## 4. Optische und okulomotorische Grundlagen

- **Größen:** Bei 40 cm Abstand entspricht 1 cm etwa 1,4°. Ein Schiff ist 1,2–3,2 cm breit (halbe Breite 8 % der kürzeren Feldseite), auf einem 11-Zoll-Tablet etwa 2 cm (≈ 3°, gerechnet); die Standard-Toleranz von 2 cm entspricht ≈ 2,9° zu jeder Seite. Feine Details müssen nicht erkannt werden; Schiffe und Zielpunkt unterscheiden sich durch die Form.
- **Fallgeschwindigkeit:** 8 cm/s sind bei 40 cm etwa 11°/s, 25 cm/s etwa 35°/s. Langsame Schiffe lassen sich mit glatter Folgebewegung begleiten; bei mehreren Schiffen wechselt der Blick mit Sakkaden zwischen Zielpunkt und Schiff.
- **Blickverteilung:** Der Zielpunkt steht unten, die Schiffe kommen von oben; beides gleichzeitig im Blick zu haben, verlangt etwas Überblick über das Feld (Mitte und Umgebung).
- **Bewegte Bilder:** Die Schiffe bewegen sich nur in einem Teil des Feldes; großflächige Bewegung gibt es nicht. Dennoch können bewegte Bilder bei Empfindlichen Schwindel oder Übelkeit auslösen.
- **Brille und Nähe:** In 40 cm sind etwa 2,5 dpt Akkommodation bzw. eine Nahkorrektur nötig; bei Gleitsicht liegt der Zielpunkt unten im Nahteil, die Schiffe oben eher im Zwischenbereich. Abstand und Neigung des Geräts so wählen, dass beides scharf ist.

## 5. Neurowissenschaftliche Grundlagen

- **Reaktionszeit:** Schon die einfache Reaktionszeit besteht aus dem Erkennen des Reizes und dem Beginn der Bewegung. In einer Studie mit 1469 Personen von 18 bis 65 Jahren lag die mittlere einfache Reaktionszeit bei 231 ms; das Erkennen des Reizes dauerte im Mittel 131 ms und war altersunabhängig, der Anstieg mit dem Alter ging vor allem auf eine langsamere Bewegungsausgabe zurück (Woods et al. 2015).
- **Auge-Hand-Abstimmung:** Der Blick liefert Ort und Tempo des Schiffs, die Hand führt den Zielpunkt nach. Bei Steuerung über Pfeiltasten oder Kippen muss zusätzlich die Geschwindigkeit dosiert werden (Steuerung zweiter Ordnung statt direkter Position).
- **Auswahl:** Bei mehreren Schiffen muss entschieden werden, welches zuerst gehalten wird; die Übung belohnt das tiefste Schiff.
- **Keine Aussage über Hirnregionen:** Eine Aussage „diese Übung trainiert Region X“ lässt sich aus den Studien nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Zeit für eine Zielbewegung wächst mit dem Weg und sinkt mit der Zielbreite (Fitts 1954; MacKenzie 1992). Toleranz, Fallgeschwindigkeit und Abstand der Schiffe verändern die Werte daher stark; Einstellungen nie nebenbei ändern.
- **Halten:** Die Haltezeit verlangt eine ruhige Hand am Ende der Bewegung; da der Fortschritt bei Abweichung doppelt so schnell sinkt, lohnt sich ruhiges Halten mehr als schnelles Hin- und Herfahren.
- **Finger vs. Tasten vs. Kippen:** Der Finger setzt die Position direkt, verdeckt aber den unteren Feldrand. Pfeiltasten und Kippen steuern die Geschwindigkeit; der Zielpunkt folgt nicht augenblicklich. Beim Kippen wird das Gerät mit beiden Händen gehalten; Handgelenke und Unterarme arbeiten mit.
- **Haltung:** Am besten im Sitzen. Wer im Stand oder auf einer Unterlage übt, muss Sturzgefahr bedenken: Wand oder fester Stuhl in Reichweite, Hilfsperson dabei, nie auf wackligen Unterlagen ohne Sicherung.

## 7. Einflussfaktoren und Messgrenzen

- **Touch-Latenz:** Touchscreens und Browser messen Zeiten je nach Gerät zu lang und unterschiedlich (Pronk et al. 2020); die „Zeit bis zum Treffer“ ist nur ein Vergleich mit sich selbst auf demselben Gerät.
- **Kalibrierung:** Ohne Kalibrierung stimmen Zentimeter, Toleranz und Fallgeschwindigkeit nicht; auf kleinen Bildschirmen wird die Toleranz begrenzt (im Ergebnis steht der geltende Wert), die Schiffe sind kleiner.
- **Pixel und Bildrate:** Die Bewegung rechnet mit der Zeit, nicht mit der Bildrate; bei 60 Hz bewegt sich ein Schiff mit 8 cm/s je Bild um etwa 0,13 cm. Bildschirme mit niedriger Bildrate zeigen ruckeligere Bewegung.
- **Steuerung:** Finger, Tasten und Kippen sind nicht vergleichbar; Verlauf und „Letztes Mal“ vergleichen deshalb nur Durchläufe mit gleicher Steuerung und gleichen Einstellungen. Kippen hängt von der Haltung beim Start und vom Sensor des Geräts ab.
- **Zufall:** Die Lage der Schiffe ist zufällig; bei kurzen Durchläufen (wenige Schiffe) schwanken Trefferquote und Zeiten stark.
- **Nicht gemessen:** Blick, Haltung, Gleichgewicht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Für genau diese Übung gibt es keine Studie. In Bildschirmaufgaben wird man durch Gewöhnung an Aufgabe und Gerät meist besser; in Studien zu Bildschirmübungen im Sport fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt (Guo et al. 2025).
- **Naher Transfer – fehlend:** Keine Daten, ob sich andere Zielaufgaben verbessern.
- **Alltagstransfer – fehlend:** Bei älteren Menschen, die zu Hause leben, senken Bewegungsprogramme die Sturzrate, am deutlichsten Gleichgewichts- und Funktionsübungen (Rate Ratio 0,76; 108 Studien, 23.407 Personen; Sherrington et al. 2019). Ein Überblick über 18 Übersichten fand bei kognitiv gesunden Älteren positive Effekte kognitiv-motorischer Doppelaufgaben-Programme; Exergames wirkten nur auf kognitive Funktionen, die Wirkung auf körperliche Funktionen ist umstritten, Sicherheit, Übertragung und Erhalt sind unklar (Gallou-Guyot et al. 2020). Das waren Programme mit Bewegung des ganzen Körpers, keine Steuerung am Bildschirm wie diese. Für gesunde Menschen ist ein Nutzen dieser Übung nicht belegt.
- **Einordnung:** Getroffene Schiffe, Trefferquote und Zeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand eine spielerische Auge-Hand-Übung mit bewegten Zielen und kurzem Halten sucht; Tempo und Toleranz fein eingestellt werden sollen; verschiedene Steuerarten (Finger, Tasten, Kippen) ausprobiert werden sollen; ein Tablet mit Touch genutzt wird.
- **Weniger passend, wenn …** Gleichgewicht oder Haltung geübt oder gemessen werden sollen; jemand nur ohne Sicherung stehen oder balancieren würde; kein Zeitdruck gewünscht ist; ein Normvergleich gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `sturzgefahr`: im Sitzen üben; im Stand oder auf einer Plattform nur mit Wand oder festem Stuhl in Reichweite und Hilfsperson. Bei Schwindel, Gleichgewichtsstörungen, Herz-Kreislauf-Beschwerden, Schwangerschaft, nach Operationen oder bei Medikamenten, die schwindlig machen, nur nach Rücksprache.
  - `schwindel_vestibulaer`, `reisekrankheit`, `kopfschmerz_asthenopie`: bewegte Bilder; langsame Schiffe, kurze Durchläufe, Pausen. Schwindel, Doppelbilder, Kopf- oder Augenschmerz gehören abgeklärt, statt weiterzuüben (Muchnick 2008, S. 6, 28).
  - `tremor_parkinson`, `hand_arm_beschwerden`: große Toleranz und kurze Haltezeit; Pfeiltasten statt Finger; beim Kippen Gerät gut abstützen.
- **Kombiniert gut mit …** 306 (fallende Ziele abfangen), 505 und 512 (seitliches Nachführen und Halten), 808 (Marke im Ring halten); innerhalb der Labor-Übungen mit 927 (Slalom, gleiche Steuerarten).
- Keine Diagnosen, keine Heilversprechen; nicht als Gleichgewichts- oder Reaktionstest darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Keine Stufen:** Die Schwierigkeit hängt ganz an den Einstellungen; eine automatische Anpassung gibt es nicht. Die Faustregeln (90 %/60 %) sind nicht an Menschen geprüft.
- **Finger verdeckt den Rand:** Beim Touch verdeckt der Finger den Zielpunkt teilweise; die Steuerung über die waagrechte Position (überall im Feld) mildert das.
- **Kippen:** abhängig von Sensor und Startlage; keine Aussage über Haltung möglich, und das soll auch so kommuniziert werden.
- **Zählwerte statt Messung:** Zeit bis zum Treffer enthält Touch-Latenz und Wahl des Schiffs; nur als Selbstvergleich nutzen.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Zeit wächst mit dem Weg, sinkt mit der Zielgröße (Crossref geprüft)
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction, 7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – Fitts'sches Gesetz bei Bildschirm-Eingaben (Crossref geprüft)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – Bestandteile der Reaktionszeit, Alter (Crossref geprüft)
- Gallou-Guyot, M., Mandigout, S., Bherer, L., & Perrochon, A. (2020). Effects of exergames and cognitive-motor dual-task training on cognitive, physical and dual-task functions in cognitively healthy older adults: An overview. *Ageing Research Reviews, 63*, 101135. https://doi.org/10.1016/j.arr.2020.101135 – Exergames und Doppelaufgaben bei Älteren (Crossref geprüft)
- Sherrington, C., Fairhall, N. J., Wallbank, G. K., Tiedemann, A., Michaleff, Z. A., Howard, K., Clemson, L., Hopewell, S., & Lamb, S. E. (2019). Exercise for preventing falls in older people living in the community. *Cochrane Database of Systematic Reviews, 2019*(1), CD012424. https://doi.org/10.1002/14651858.CD012424.pub2 – Sturzvorbeugung durch echte Bewegungsprogramme (Crossref geprüft)
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte (Crossref geprüft)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchscreens messen Zeiten zu lang (Crossref geprüft)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
