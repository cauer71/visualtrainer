---
# ===== Kennung =====
nr: 303
kennung: saccadic-gallery
name: "Blicksprung-Galerie – Ziel an wechselnden Rasterpunkten anklicken"
name_original: "Augentraining Online · Blicksprünge trainieren (Seitentitel: Augentraining Online · Blicksprünge trainieren | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Feld leuchtet immer nur ein roter Punkt auf, jedes Mal an einem anderen von 12 festen Rasterpunkten (am Touchgerät 9). Man springt mit dem Blick hin und klickt bzw. tippt ihn an, bevor er nach einer mit dem Level schrumpfenden Zeit wieder verschwindet."
ziel_funktionen: [sakkaden, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code sinken von Level 1 bis 15 Zielradius 28 → 12 px, Lebensdauer 1.300 → 380 ms, Pause bis zum nächsten Ziel 550–750 → 147–206 ms und unsichtbare Trefferzugabe 14 → 5 px. Eine Serie (Combo bis 3,0×) verschärft zusätzlich bis −25 % Radius, −32 % Lebensdauer, −30 % Pause, −50 % Trefferzugabe. Rundendauer variabel: 45 s Start, +2 s je Treffer (höchstens 60 s), −1 s je Fehlklick oder abgelaufenem Ziel."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + abgelaufene Ziele)", "'Ø Reaktion' = Zeit vom Erscheinen bis zum Treffer (Entdecken + Blicksprung + Handbewegung, nur Treffer) – keine Sakkadenlatenz", "höchstes Level, maximale Combo", "sinnvoll: Klickzeit getrennt nach Sprungweite und Richtung, Abläufe je Level, Fehlklicks"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 0
    ruhige_hand: 1
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "scharfes Sehen über das ganze Spielfeld (am Monitor bis ≈ 35° breit, am Tablet ≈ 23°) in Bildschirmabstand", "Ziele von anfangs ≈ 1,5° bis ≈ 0,6° Sehwinkel (Level 15) erkennen", "kein Farbsehen nötig (ein roter Punkt mit weißem Kern auf fast Schwarz)", "Blick und Hand ohne Pause über 1–3 min schnell wechseln können"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, nystagmus, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["große, schnelle Blick-Zeige-Sprünge zwischen festen Bildschirmpositionen üben", "Blick und Hand auf ein plötzlich erscheinendes Ziel ausrichten (Zielerfassung ohne Ablenker)", "spielerische Übung mit steigendem Tempo für Jugendliche und Erwachsene mit Freude an Zeitdruck", "Aufwärmen vor Flick- und Zielerfassungsübungen (501, 508, 704)"]
weniger_geeignet_fuer: ["Messung von Sakkadenlatenz oder -genauigkeit (keine Blickmessung, Klickzeit enthält die Handbewegung)", "reine Blickübung ohne Handeinsatz", "Menschen, die ohne Zeitdruck üben sollen oder möchten", "Gleitsichtträger:innen am großen Monitor im Vollfenster", "Lichtempfindliche: roter Fehlerblitz bei jedem Fehler (abschaltbar)", "Ältere oder Einsteiger:innen ab etwa Level 8 (Lebensdauer < 0,85 s bei weiten Sprüngen)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Zeige- und Blickaufgaben werden durch Übung deutlich besser (auch Gerätegewöhnung), Sakkaden-Latenztraining wirkte aber nur an der geübten Position, und ein Nutzen für Sport, E-Sport, Lesen oder Alltag ist nicht belegt (Di Russo et al. 2003; Guo et al. 2025; Fransen 2024)."
aehnliche_uebungen: [401, 501, 508, 704, 302, 307, 101, 503, 801, 414, 411, 702]
stichworte: ["Sakkaden", "Blicksprung", "Zielerfassung", "Auge-Hand-Koordination", "Fitts'sches Gesetz", "Kopf-Auge-Koordination", "Gleitsicht", "Express-Sakkaden (Behauptung der Website)", "Zeitdruck", "Combo", "Augentraining (Name des Originals)"]
---

# 303 · Blicksprung-Galerie – Ziel an wechselnden Rasterpunkten anklicken

> Original: „Augentraining Online · Blicksprünge trainieren“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit
> (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `blitzreaktion` mit Randreizen, `zielfang`)

## 1. Kurzbeschreibung

Auf fast schwarzem Feld leuchtet an einem von 12 schwach markierten Rasterpunkten (Touch: 9) ein roter Punkt auf, nie zweimal am selben
Ort. Man springt mit dem Blick hin und klickt/tippt ihn an, bevor er verschwindet; dann folgt der nächste. Mit dem Level werden Ziele
kleiner und kurzlebiger. Trotz des Namens misst das Spiel keine Augenbewegung, sondern die Zeit bis zum Klick.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (Chunk `7211-…js` mit gemeinsamen Modulen für Schwierigkeit, Combo, Strafe, Blitz; geprüft am
29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung** (Monitor 24″ Full-HD, 60 cm, ≈ 37,8 px/°; Tablet 11″ quer, 40 cm).

- **Ablauf:** Countdown 3-2-1-GO (≈ 2,45 s, Töne) → erstes Ziel nach 200 ms → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, Treffer,
  Fehlklicks, Abläufe, Level, Combo, Buchstabennote). Beim Spielen füllt das Feld das ganze Browserfenster; Escape/Tabwechsel bricht ab.
- **Raster (Code):** 4 × 3 Knoten; bei Touch, Mobil-Kennung oder Fenster < 768 px **3 × 3** (dann mit Mittelpunkt). Spalten zwischen
  14 % und 86 % der Breite, Zeilen bei 18/50/82 % der Höhe, Versatz ±6 px. Die Knoten sind dauerhaft schwach markiert (3 px, 5 % Weiß),
  mögliche Orte also bekannt; der nächste Knoten ist zufällig, nur nie derselbe. **Sprungweiten:** Monitor im Vollfenster bis ≈ 35°
  waagrecht (diagonal ≈ 38°), eine Spalte ≈ 12°, eine Zeile ≈ 8–9°; Tablet quer (3 Spalten) bis ≈ 23°, eine Spalte ≈ 12°.
- **Schwierigkeit (Code):** p = (Level − 1)/14, Werte fallen exponentiell (Formel wie Literaturbasis W03). Touch: Radius +2 px,
  Trefferzugabe +10 px. Level = Punkte/1.750 + 1, steigt nur.

| Level (Punkte) | Ø Ziel Monitor | Trefferzone Ø | Lebensdauer (max. Combo) | Pause bis nächstes Ziel |
|---|---|---|---|---|
| 1 (0) | 56 px ≈ 1,5° | 84 px ≈ 2,2° | 1.300 ms (884) | 550–750 ms |
| 5 (7.000) | 47 px ≈ 1,3° | 70 px ≈ 1,9° | 1.055 ms (717) | 443–605 ms |
| 10 (15.750) | 35 px ≈ 0,9° | 50 px ≈ 1,3° | 682 ms (464) | 280–385 ms |
| 15 (24.500) | 24 px ≈ 0,6° | 34 px ≈ 0,9° | 380 ms (258) | 147–206 ms |

- **Punkte/Zeit:** 100 × Combo-Faktor (1,1 ab 3 bis 3,0 ab 50 Treffern) × (1 + 0,5 p); fehlerfrei ist Level 10 nach 63, Level 15 nach
  84 Treffern erreicht (*eigene Rechnung*). Start 45 s, +2 s je Treffer (max. 60 s), −1 s je Fehlklick/Ablauf; wer schneller als ein
  Treffer pro 2 s ist, verlängert die Runde (*eigene Abschätzung:* meist 1–3 min, nicht gemessen).
- **Fehler:** Combo 0, Bildwackeln (6 px), Fehlerton, roter Vollflächenblitz (Modul wie 302, abschaltbar). Abläufe lassen sich über eine
  globale Einstellung abschalten (Code; Bedienelement nicht geprüft). **Eingabe:** Pointer beim Drücken (Maus, Stift, Finger), keine
  Tastatur; Uhr mit dt, nur Partikel pro Bild (rein optisch).

**Widersprüche Regeltext ↔ Code:** (1) „+0,6 s pro Treffer“ – Code +2 s (englische Ersatzbeschriftung: „+2s per hit, max 60s“).
(2) „Keine Abzüge (Standard)“ – der Code zieht **immer** 1 s ab. (3) „Zentraler Startpunkt“ – gibt es nicht; im 4 × 3-Raster liegt kein
Knoten in der Mitte. (4) „Blicksprung-Latenz analysieren“ – angezeigt wird die Klickzeit.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite verspricht Gamern, Esportlern, Rennfahrern und Sportlern schnellere Zielerfassung, „Fovealisierung ohne Überschießen“ und
schnelleres Lesen; sie nennt 200–700 °/s, sakkadische Suppression und eine Tabelle von „Tier 1 < 130 ms (Express-Sakkaden / Profi-Esports &
Kampfpiloten)“ bis „Tier 5 > 280 ms (Dysmetrie)“. Positiv: Hinweise auf Display-/Mauslatenz und „ersetzt keine augenärztliche
Untersuchung“. Einordnung (Prüfung aus Literaturbasis W03, A.2):
- **Tabelle nicht anwendbar, „Dysmetrie“ irreführend.** Sie listet Augen-Latenzen, gemessen wird aber Entdecken + Sakkade (Median ≈ 177 ms;
  Bargary et al., 2017) + Handbewegung, die ≈ 100 ms nach der Sakkade beginnt (Prablanc et al., 1979). Praktisch jede:r landet so in
  „Tier 5“. Dysmetrie ist ein klinischer Begriff für Fehlgenauigkeit, nicht für Latenz; leichtes Unterschießen ist normal (49 % der
  Prosakkaden; Bargary et al., 2017). Esportler oder Piloten kommen in keiner Quelle vor.
- **Express-Sakkaden** (≈ 100 ms) entstehen beim Menschen vor allem im Gap-Paradigma, auch bei Untrainierten (Fischer & Ramsperger, 1984);
  Fischer & Boch (1984) ist eine Affenstudie. Formal entsteht nach jedem Treffer eine Lücke (550 → 150 ms), doch der Trefferring bleibt
  ≈ 0,3 s als Blickfang, und ohne Blickmessung ist nichts darüber auszusagen (*eigene Analyse*).
- **Zahlen/Tipps:** 700 °/s nicht belegt (bei ≈ 9° ≈ 410 °/s; Gibaldi & Sabatini, 2021); „20–40 ms“ gilt nur bis ≈ 10°; Suppression ≈ 50 ms
  vor bis nach der Sakkade (Diamond et al., 2000); Blinzeln sinkt am Bildschirm sogar um ≈ 80 % (Patel et al., 1991). „Kopf stabil halten“
  („doppelt so schnell“ ohne Quelle): ab ≈ 20° beteiligt sich der Kopf zunehmend (Freedman, 2008) – bei 35° und Gleitsicht ungünstig.
- **Lesen, „echte neurophysiologische Fortschritte“, „5–10 min genügen“:** unbelegt; Lesetempo hängt vor allem an der Sprachkompetenz
  (Rayner et al., 2016). „Sub-Millisekunden-Präzision“ gilt nur für die Uhr (Browser-Messkette +58 bis +133 ms; Pronk et al., 2020).

## 4. Optische und okulomotorische Grundlagen

- **Sprungweite und Latenz:** Die Sakkadenlatenz ist zwischen ≈ 0,75° und 12° am kürzesten, steigt zur Peripherie langsam und wird
  jenseits ≈ 35° unregelmäßig (Kalesnykas & Hallett, 1994). Nahe Knoten (8–12°) sind günstig, weite Sprünge am Monitor (bis ≈ 38°) liegen
  am Rand und landen oft in zwei Schritten (Hauptsakkade + Korrektur).
- **Bekannte Orte:** Nur 11 markierte Orte → kleine räumliche Unsicherheit. Prosakkaden-Latenz hängt kaum von der Zahl der Alternativen
  ab (Kveraga et al., 2002); zufällige Seitenwahl kostet im Gap-Versuch ≈ 15 ms (Fischer & Ramsperger, 1986).
- **Peripheres Entdecken:** Ziel bis ≈ 35° neben dem Blickort, aber groß (≥ 0,6°), kontrastreich, weißer Kern – Sehschärfe/Farbe kaum begrenzend.
- **Gleitsicht/Alterssichtigkeit:** Die klare Zwischenzone ist horizontal nur ≈ 13–18° breit (Han et al., 2003): Äußere Spalten werden
  unscharf oder verlangen Kopfdrehung, die obere Zeile fällt in den Fern-, die untere in den Nahteil; mit Gleitsicht wird der Kopf ≈ 7°
  stärker angehoben (Jaschinski et al., 2015). Empfehlung: Bildschirmbrille, kleineres Fenster, Kopfbewegung erlauben; Tablet ≈ 35–40 cm.
- **Trockenes Auge, Bildschirm:** seltenes Blinzeln (Patel et al., 1991) – kurze Runden. Bei 60 Hz ≤ 17 ms Bildwartezeit (*eigene Rechnung*).

## 5. Neurowissenschaftliche Grundlagen

Sakkaden steuert ein verteiltes Netzwerk aus parietalen und frontalen Rindenfeldern (u. a. frontales Augenfeld), Basalganglien, Thalamus,
Colliculus superior, Kleinhirn und Formatio reticularis; Funktionen sind meist nicht einem Areal allein zuzuordnen (Munoz, 2002).
Sakkaden sind zu kurz für visuelle Rückmeldung während des Sprungs; ihre Weite wird vorab geplant und bei anhaltender Fehlgenauigkeit
über das okulomotorische Kleinhirn nachjustiert (Hopp & Fuchs, 2004) – ausgelöst im Labor durch unbemerktes Verschieben des Ziels
während der Sakkade, was das Spiel weder tut noch messen kann. Beim Zeigen bleibt der Blick bis zum Ende der Handbewegung am Ziel
„verankert“ (Neggers & Bekkering, 2000). „Subkortikale Direktauslösung“ für schnelle Klicks ist durch nichts belegt.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Bewegungszeit steigt mit log₂(2A/W) (Fitts, 1954). *Grobe eigene Abschätzung* mit 3,7–4,9 bit/s Maus-Durchsatz
  (Soukoreff & MacKenzie, 2004), Level 1 (Trefferzone 84 px): eine Spalte (≈ 460 px, 3,5 bit) ≈ 0,7–0,9 s, drei Spalten (≈ 1.380 px,
  5,0 bit) ≈ 1,0–1,4 s – plus ≈ 0,2–0,3 s bis Bewegungsbeginn; weite Sprünge sind am Monitor schon bei 1,3 s knapp. Die Hand startet
  ≈ 100 ms nach der Sakkade, Latenzen schwach gekoppelt (Prablanc et al., 1979) – die Klickzeit bestimmt überwiegend die Handbewegung.
- **Touch:** Tippen verkürzte die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013). Die
  Touch-Trefferzone bleibt bis Level 15 ≈ 11 mm, bei maximaler Combo ≈ 9,6 mm (Empfehlung 9,2 mm; Parhi et al., 2006; *eigene Rechnung*).
  Hand und Arm verdecken Teile des Rasters. Kleine Ziele belasten zitternde Hände (Parkinson-Tremor 3–6 Hz; McAuley & Marsden, 2000).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Browser-Zeiten enthalten 58–133 ms Geräteanteil (Pronk et al., 2020), Tablet-Tipplatenzen 48–276 ms (Casiez et al., 2017).
  Fenstergröße und Gerät ändern Sprungweiten, Sehwinkel und Raster (4 × 3 vs. 3 × 3) – nur Selbstvergleich unter gleichen Bedingungen.
- **Auswahleffekt:** „Ø Reaktion“ zählt nur Treffer; mit sinkender Lebensdauer fallen langsame Sprünge heraus, der Mittelwert „verbessert“
  sich allein durch den Levelanstieg (*eigene Analyse*). Zufällige Sprungweiten (≈ 12–38°) streuen die Klickzeit zusätzlich.
- **Alter, Stabilität:** 60–79-Jährige haben längere Sakkadenlatenzen und -dauern als 20–30-Jährige (Munoz et al., 1998). Sakkadenmaße
  sind stabil (Retest r = 0,685–0,884; Bargary et al., 2017); die Klickzeit dieses Spiels wurde nie auf Zuverlässigkeit geprüft.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Zeige- und Zielerfassungsaufgaben werden durch Wiederholung schneller; in digitalem Sport-Sehtraining sind
  Effekte in trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** Übung erhöht den Anteil von Express-Sakkaden, senkt deren Latenz aber nur von 105 auf 98 ms (Fischer &
  Ramsperger, 1986); Sakkaden-Latenztraining wirkte in einem Einzelfall nur an der geübten Position (Di Russo et al., 2003).
- **Alltagstransfer (fehlend):** Kein Beleg für Lesen (Rayner et al., 2016), Sport, E-Sport oder Verkehr; für allgemeine
  Wahrnehmungstrainings fehlt Evidenz für Ferntransfer auf Sportleistung (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** große, schnelle Blick-Zeige-Sprünge zu einem einzelnen, plötzlich erscheinenden Ziel geübt werden sollen; jemand Tempo
  und Punkte mag; als Aufwärmen vor Flick-/Zielerfassungsübungen.
- **Weniger passend, wenn …** eine Reaktionszeit bestimmt werden soll (101 bzw. Blitzreaktion); Blickbewegungen ohne Hand geübt werden
  sollen; Impulskontrolle (102) oder symbolische Wahlreaktion (202) gemeint ist; ohne Zeitdruck geübt werden soll (204).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Vollflächenblitz bei jedem Fehler (Details 302) – Blitz abschalten.
  - `presbyopie_gleitsicht`: Sprünge bis ≈ 35° übersteigen die klare Gleitsichtzone – kleineres Fenster, Bildschirmbrille.
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`, `nystagmus`: Randziele werden übersehen, kurze Fixationen auf kleine Ziele
    (ab Level 10) sind erschwert – eher Übungen ohne Zeitdruck. `trockenes_auge_bildschirm`: seltenes Blinzeln – kurze Runden.
  - `tremor_parkinson`, `hand_arm_beschwerden`: weite, schnelle Zeigebewegungen über Minuten. `kognitive_einschraenkung`,
    `aufmerksamkeitsprobleme`: sich verschärfender Zeitdruck, Blitz, Ton, Wackeln – als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 101 (Reaktion am festen Ort), 401/801 (Randreize bei ruhigem Blick), 302 (mehrere Ziele), 501/508/704 (Flick,
  Zielerfassung), 404 (langsame Folgebewegung als Gegenpol).
- **Überschneidungen:** Mit 101 und 503 teilt 303 das Reagieren auf ein plötzlich erscheinendes Ziel, dort aber am festen Ort ohne weite
  Zeigebewegung; mit 102 nur die Combo-Mechanik; mit 202 die Ortswahl, die hier räumlich kompatibel und daher kaum Hick-belastet ist
  (Kveraga et al., 2002). 302, 304–308 und FPS-Übungen wie 501, 508, 704 nutzen dieselbe Engine (Ablauf-Ziele, Combo bis 3,0×, Level alle
  1.750 Punkte) – nicht mehrere davon hintereinander vorschlagen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlich benennen:** „Blick-Zeige-Sprung“ statt „Sakkaden-Latenz“; Tier-Tabelle, „Dysmetrie“ und Noten wie „LEGENDARY“ streichen.
  Messgröße: Median-Klickzeit je Sprungweite (nah/mittel/weit) und Richtung, Abläufe, Fehlklicks.
- **Sprungweite steuern:** Spielfeld auf ≈ 20–25° begrenzen (Gleitsicht), Weiten gezielt wählen; am Tablet Raster nicht unter die Hand legen.
- **Adaptiv statt nur steigend:** Lebensdauer per Staircase an die Trefferquote koppeln (wie `zielfang`), feste Rundendauer, Combo nicht an
  Zielgröße/Tempo koppeln.
- **Blickvariante ohne Hand (optional):** Ziel kurz zeigen, dann ein Zeichen am Zielort abfragen (trotzdem keine Latenz-Aussage).
  Kein roter Blitz, kein Wackeln (WCAG 2.3.1); DE/IT; „Übung“ statt „Augentraining“, keine Gesundheitsversprechen.

## 11. Quellen

### Von der Website angegeben

- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422.
  https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI stimmt ✓ (nur Abstract zugänglich); **stützt die Aussage der Website:**
  teilweise (allgemeine Beschreibung von Sakkaden; 700 °/s, Tier-Stufen und Lesegewinn durch Training nicht belegbar).
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5. Aufl.). Oxford University Press.
  https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** DOI falsch (Website …9780199969203…, Crossref 404; richtig
  …9780199969289…), Buch, Inhalt nicht eingesehen; **stützt:** nein für „> 280 ms = Dysmetrie“ (Latenz ≠ Zielgenauigkeit).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time.
  *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:**
  teilweise (Hardware verlängert Reaktionszeiten; 144/240-Hz-Werte sind Arithmetik, gemessen wurde nur ein 60-Hz-Display; keine Sakkaden).
- Fischer, B., & Boch, R. (1984). Express-saccades of the monkey: A new type of visually guided rapid eye movements after extremely short
  reaction times. *Advances in Psychology, 22*, 403–408. https://doi.org/10.1016/S0166-4115(08)61860-9 – **Prüfung:** nur im Text genannt,
  nicht im Quellenverzeichnis; über Crossref ermittelt ✓; **stützt:** nein (Affenstudie, nichts zu Esportlern/Piloten; Übung misst keine Augen).

### Weitere Fachliteratur

- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human
  eye movements: An oculomotor signature? *Vision Research, 141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Normwerte, Retest.
- Di Russo, F., Pitzalis, S., & Spinelli, D. (2003). Fixation stability and saccadic latency in élite shooters. *Vision Research, 43*(17),
  1837–1845. https://doi.org/10.1016/S0042-6989(03)00299-2 – ortsgebundener Trainingseffekt.
- Fischer, B., & Ramsperger, E. (1986). Human express saccades: Effects of randomization and daily practice. *Experimental Brain Research,
  64*(3), 569–578. https://doi.org/10.1007/BF00340494 – Übung und Zufallsort.
- Freedman, E. G. (2008). Coordination of the eyes and head during visual orienting. *Experimental Brain Research, 190*(4), 369–387.
  https://doi.org/10.1007/s00221-008-1504-8 – Kopfbeteiligung ab ≈ 20°.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with
  single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4),
  1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm.
- Hopp, J. J., & Fuchs, A. F. (2004). The characteristics and neuronal substrate of saccadic eye movement plasticity. *Progress in
  Neurobiology, 72*(1), 27–53. https://doi.org/10.1016/j.pneurobio.2003.12.002 – Sakkadenadaptation, Kleinhirn (Abstract).
- Kalesnykas, R. P., & Hallett, P. E. (1994). Retinal eccentricity and the latency of eye saccades. *Vision Research, 34*(4), 517–531.
  https://doi.org/10.1016/0042-6989(94)90165-1 – Latenz nach Sprungweite.
- Kveraga, K., Boucher, L., & Hughes, H. C. (2002). Saccades operate in violation of Hick's law. *Experimental Brain Research, 146*(3),
  307–314. https://doi.org/10.1007/s00221-002-1168-8 – Zahl der Orte kaum relevant.
- Munoz, D. P. (2002). Commentary: Saccadic eye movements: Overview of neural circuitry. *Progress in Brain Research, 140*, 89–96.
  https://doi.org/10.1016/S0079-6123(02)40044-1 – Netzwerk der Sakkadensteuerung (Abstract).
- Ergänzend (DOIs am 29.09.2026 per Crossref geprüft, Inhalte laut Literaturbasis W03): Fischer & Ramsperger (1984), https://doi.org/10.1007/BF00231145;
  Gibaldi & Sabatini (2021), https://doi.org/10.3758/s13428-020-01388-2; Munoz et al. (1998), https://doi.org/10.1007/s002210050473;
  Neggers & Bekkering (2000), https://doi.org/10.1152/jn.2000.83.2.639; Prablanc et al. (1979), https://doi.org/10.1007/BF00337436;
  Rayner et al. (2016), https://doi.org/10.1177/1529100615623267; Casiez et al. (2017), https://doi.org/10.1145/3126594.3126606;
  Diamond et al. (2000), https://doi.org/10.1523/JNEUROSCI.20-09-03449.2000; Findlater et al. (2013), https://doi.org/10.1145/2470654.2470703;
  Fitts (1954), https://doi.org/10.1037/h0055392; Fransen (2024), https://doi.org/10.1007/s40279-024-02060-x; Guo et al. (2025),
  https://doi.org/10.3389/fphys.2025.1664572; Jaschinski et al. (2015), https://doi.org/10.1111/cxo.12248; McAuley & Marsden (2000),
  https://doi.org/10.1093/brain/123.8.1545; Parhi et al. (2006), https://doi.org/10.1145/1152215.1152260; Patel et al. (1991),
  https://doi.org/10.1097/00006324-199111000-00010; Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2; Simons et al. (2016),
  https://doi.org/10.1177/1529100616661983; Soukoreff & MacKenzie (2004), https://doi.org/10.1016/j.ijhcs.2004.09.001.
