---
# ===== Kennung =====
nr: 411
kennung: spatial-shift-pursuit
name: "Blickfolge bei zufälligen Tempo- und Richtungswechseln (Original: „Sichtfeldwechsel“)"
name_original: "Blickverfolgung bei Sichtfeldwechsel – Zielverfolgung trotz verschobenem Sichtfeld (Spatial Shift Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit"
blickfit_umsetzung: {kennung: "tempo-wechsel", name: "Tempo-Wechsel", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/tempo-wechsel/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt fliegt auf dunklem Grund schräg über den Bildschirm, prallt an den Rändern ab und kehrt etwa einmal pro Sekunde unangekündigt eine oder beide Bewegungsrichtungen um, wobei er im Lauf der Runde immer schneller wird. Man folgt ihm nur mit den Augen; anders als der Name sagt, springt oder dreht sich das Bild selbst nie, und es gibt keine Eingabe, Punkte oder Messung."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, nur manuelle Einstellungen: Tempo 0,5–9× (Regler, Schritt 0,1; wirkt linear), Zielgröße 10–50 px Radius, Dauer 30/45/60/90/120 s, 'Random Speed' (doppelte Wechselrate, schwankendes Tempo), 'Hide Line'. Innerhalb jeder Runde steigt das Tempo von selbst: bei 1× am 24-Zoll-Monitor in 60 cm von ≈ 15°/s beim Start auf ≈ 39°/s nach 60 s (weiche Obergrenze ≈ 42°/s, durch Randabpraller kurzzeitig leicht darüber; eigene Simulation des Spielcodes)."
messgroessen: ["Original: keine Leistungsmessung, nur Sitzungszähler (die Seite nennt 'Re-Zentrierungszeit' und 'Präzision', erhebt sie aber nicht)", "sinnvoll mit Eyetracker: Aufholsakkaden und Positionsfehler je Richtungswechsel, Folge-Gain über die Runde", "sinnvoll ohne Eyetracker: Erkennungsaufgabe kurz nach einem Wechsel (z. B. Landolt-Ring im Ziel), Anteil richtig je Tempo in °/s"]

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
voraussetzungen: ["30–120 s ohne Unterbrechung auf den Bildschirm schauen können", "ruhige Sitzposition: Monitor 50–70 cm, Tablet auf Ständer ca. 40 cm", "passende Korrektion für den Bildschirmabstand (bei Alterssichtigkeit Zwischen- bzw. Nahkorrektur)", "kein Farbsehen nötig (Zielfarbe frei wählbar)", "keine Hand-Eingabe während der Übung (nur Start per Klick/Tipp)", "Folgen von ≈ 40°/s muss bequem möglich sein, sonst kürzere Runden oder Tempo 0,5×"]
vorsicht_bei: [schwindel_vestibulaer, reisekrankheit, nystagmus, gesichtsfeldausfall, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["glatte Blickfolge mit unvorhersagbaren Umkehrungen und kleinen Aufholsakkaden üben (sinnvoll bei Tempo 0,5–1×, Runden 30–60 s)", "Steigerung innerhalb einer Runde erleben: ruhiger Beginn, zunehmend schnelle diagonale Bahnen", "Stufe nach 415 (sanftes Zufallsdriften) und 410 (harte Haken im festen Takt): zufällig getaktete Umkehrungen bei steigendem Tempo", "rein visuelles Aufwärmen der Augenfolge vor Aim- oder Tracking-Übungen"]
weniger_geeignet_fuer: ["Übungsziel 'Wiederfinden nach Bildsprung/Screen Shake' – das bietet die Übung nicht (dafür eher 414 Positionssprünge)", "wer Rückmeldung, Punkte oder Fortschrittswerte erwartet", "Einsteiger:innen und ältere Menschen bei Tempo ab 2× (Endtempo ≈ 80°/s) oder in 90–120-s-Runden", "Gleitsichtträger:innen im Vollbild bei streng ruhigem Kopf (seitliche Unschärfezonen)", "Übungsziel Auge-Hand-Koordination (dafür 104, 105, 505, 513)"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Übung wurde nie untersucht; die beste Analogie ist eine kleine Laborstudie mit quasi-zufällig bewegtem Ziel (Eibenberger et al. 2012, je N = 10), in der sich die Folgebewegung nach 3 Tagen × 12 min verbesserte und noch 5 Tage später messbar war. Die auf der Website zitierte Remapping-Literatur passt nicht zur Mechanik; ein Nutzen für Sport, E-Sport oder Alltag ist nicht belegt."
aehnliche_uebungen: [410, 415, 414, 405, 404, 407, 403, 412, 105, 513, 512, 303]
stichworte: ["smooth pursuit", "Aufholsakkaden", "catch-up saccades", "Richtungsumkehr", "Tempowechsel", "unvorhersagbare Bewegung", "Blickverfolgung", "rein visuell", "ohne Eingabe", "Sichtfeldwechsel (nur Name)"]
---

# 411 · Blickfolge bei zufälligen Tempo- und Richtungswechseln (Original: „Sichtfeldwechsel“)

> Original: „Blickverfolgung bei Sichtfeldwechsel – Zielverfolgung trotz verschobenem Sichtfeld“ (Spatial Shift Pursuit) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt (verwandt: `scharf-in-bewegung`, `zielfang`). Wichtig für die Auswahl: Der Name verspricht Bildsprünge und Drehungen des Bezugsrahmens – die Übung enthält **keine**.

## 1. Kurzbeschreibung

Auf fast schwarzem Grund fliegt ein roter, leuchtender Punkt (Standard ≈ 0,7–0,85°) schräg über den Bildschirm und prallt an den Rändern ab. Im Mittel etwa einmal pro Sekunde kehrt er ohne Vorwarnung eine oder beide Bewegungsrichtungen um und ändert leicht sein Tempo; insgesamt wird er während der Runde deutlich schneller und läuft am Ende fast nur noch auf 45°-Diagonalen. Man folgt ihm nur mit den Augen bei ruhigem Kopf. Das Original misst nichts und gibt keine Rückmeldung.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (seitenspezifischer Chunk `54003-…js` plus gemeinsame Module, geprüft 29.09.2026; nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** für 24-Zoll-Full-HD in 60 cm (≈ 38 px/°) bzw. 11-Zoll-Tablet in 40 cm (≈ 36 CSS-px/°); Zeitverläufe stammen aus einer eigenen Simulation des Bewegungsgesetzes (400 Läufe, 1 920 × 1 080 px).

- **Ablauf und Darstellung (Code, wie 410):** Einstellungen → Vollbild → Countdown 3-2-1-GO (≈ 2,45 s, mit Tönen) → Übung mit Restzeitanzeige → Endbildschirm. Escape, Vollbild-Ende oder Tab-Wechsel brechen ab; gespeichert wird nur ein Sitzungszähler. Hintergrund #050508 mit schwachem 40-px-Raster („Day Mode“: weiß). Ziel mit Radius „Size“ (Standard 16 px, Regler 10–50 px): Scheibe Ø ≈ 26 px, Ring Ø 32 px, Außenring ≈ 42 px, Leuchtschein („Neon Glow“, Standard an). Farben Rot (Standard), Grün, Blau, Orange, Gelb, Weiß.
- **Start (Code):** Bildmitte, je Achse zufällig ±5–8 px pro 16 ms → 450–710 px/s ≈ **12–19°/s**, immer schräg (32–58° zur Waagrechten).
- **Wechsel-Ereignis (Code):** In **jedem verarbeiteten Bild** tritt mit 1,5 % Wahrscheinlichkeit (mit „Random Speed“ 3 %) ein Ereignis ein: Jede Achsengeschwindigkeit wird mit zufälligem Vorzeichen und einem Faktor 0,8–1,3 multipliziert, dann auf ±18 px/16 ms je Achse begrenzt. Folge (eigene Ableitung): in 25 % der Fälle **annähernd volle Umkehr** (≈ 180°; nicht exakt, weil jede Achse einen eigenen Faktor bekommt), in 50 % Spiegelung einer Achse (meist 60–120° Richtungsänderung), in 25 % vor allem Tempoänderung (je Achse −20 bis +30 %, Richtung ändert sich dabei nur um wenige Grad). Median der Richtungsänderung **90°**. Randabpraller machen die jeweilige Achse 2 % schneller.
- **Tempo steigt von selbst (Code + Simulation):** Der Faktor 0,8–1,3 ist im Mittel > 1 und jeder Abpraller beschleunigt; deshalb driftet die Geschwindigkeit zur Obergrenze. Bei 1× Median ≈ 15°/s (Start) → 24°/s (10 s) → 36°/s (30 s) → **39°/s (60 s)**; bis 60 s erreichen ≈ 90 % der Läufe mindestens einmal beide Achsen am Anschlag (Median nach ≈ 31 s; ≈ 1 590 px/s ≈ **42°/s**, exakt diagonal). Die Grenze ist weich: Sie wird nur bei einem Wechsel-Ereignis gesetzt, Abpraller (× 1,02) können sie kurzzeitig leicht überschreiten, und Faktoren < 1 (40 % je Achse) senken das Tempo wieder. In der Nähe des Anschlags überwiegen daher 90°- und 180°-Wendungen bei annähernd gleichem Tempo – die späte Runde ist gleichförmiger, als der Name vermuten lässt.
- **Tempo-Regler (Code):** wirkt **linear** auf den Weg pro Zeit, **nicht** auf die Ereignisrate. Endtempo ≈ 42°/s × Tempo: 0,5× ≈ 20°/s, 2× ≈ 80°/s, 3× ≈ 125°/s, 9× ≈ 380°/s. Sprung pro Bild am Ende (60 Hz): 1× ≈ 0,7°, 2× ≈ 1,4°, 3× ≈ 2,1°.
- **„Random Speed“ (Code):** Ereignisrate verdoppelt; zusätzlich wird das Tempo mit einer festen Mehrfach-Sinusfunktion der Uhrzeit auf das ≈ 0,4- bis 1,9-Fache moduliert (kein „erratisches“ Beschleunigen, sondern ein gleichmäßig wiederkehrendes An- und Abschwellen).
- **Richtungslinie (Code):** Standardmäßig zeigt eine blasse Linie (Deckkraft 25 %) in die aktuelle Richtung, Länge = 7 × Schritt (≈ 112 ms Vorausschau bei 1×, am Ende ≈ 4,7° lang); sie dreht im selben Bild wie das Ziel, verrät also Richtung und Tempo, aber keinen kommenden Wechsel. „Hide Line“ entfernt sie. „Gaze Trail“ = Spur der letzten 15 Bilder.
- **Bildfrequenz (Code + eigene Rechnung):** Bewegung zeitbasiert (Schritt ≤ 100 ms), Bilder < 13 ms nach dem letzten werden übersprungen → 60 Hz: 60, 90 Hz: 45, 120 Hz: 60, 144 Hz: 72, 240 Hz: 60 verarbeitete Bilder/s. Weil das Ereignis **pro Bild** gewürfelt wird, hängt die Wechselrate vom Gerät ab: ≈ 0,9/s (60/120/240 Hz), **0,68/s (90 Hz)**, **1,08/s (144 Hz)** (ohne die 13-ms-Sperre wären es bei 144 Hz ≈ 2,2/s). Abstände sind zufällig (Mittel ≈ 1,1 s); ≈ 11 % folgen einander schneller als 130 ms, also schneller als das Auge überhaupt auf den ersten reagieren kann.
- **Eingabe (Code):** keine Auswertung; Maus/Finger zeichnen nur ein Fadenkreuz.
- **Widersprüche Regeltext ↔ Code:** „unangekündigte Sprünge und Drehungen des Koordinatenrahmens“, „Rotations-Shifts“, „Hintergrund-Verschiebungsvektor“ – nichts davon existiert: Raster und Bildausschnitt stehen still, das Ziel springt nie. „Adapt to velocity shifts“ trifft den Kern. „Durchschnittliche Wiederherstellungszeit (ms)“ und „Genauigkeitswerte“ werden nicht erhoben. „Random Speed – Disabled Velocity“ ist eine sinnlose Beschriftung.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Website:** Das Blickfeld verschiebe oder drehe sich „schlagartig“ (Screen Shake, Flinch, Motorsport-Curbs); retinotope Codes „brächen zusammen“, der posteriore Parietalkortex (PPC) rechne „binnen Millisekunden“ in kopf- und raumfeste Koordinaten um; danach folge eine „ballistische Sakkade bis 500°/s“ und ein nahtloser Übergang in die Folgebewegung. Die Übung „trainiere die parietalen Remapping-Schaltkreise“ bis zur „unterbrechungsfreien Zielkontrolle“, führe zu „dauerhaften neuroplastischen Verbesserungen“ in PPC und frontalen Augenfeldern. Tabelle mit fünf Stufen („Elite < 220 ms Re-Zentrierung, > 95 % Präzision … Basis > 450 ms“). Pensum 3–5 × 60 s an 3–4 Tagen pro Woche.

**Einordnung:**

- **Thema verfehlt:** Die Übung ist eine Folgeaufgabe mit zufälligen Tempo-/Richtungswechseln eines kleinen Ziels auf ruhigem Grund. Parietales Remapping bei eigenen Sakkaden gibt es (Duhamel et al., 1992, Affen), es wird hier aber nicht besonders gefordert – jede Blickaufgabe enthält Sakkaden.
- **Zitate passen nicht:** Findlay & Walker (1999, im Text als „Findlay & Gilchrist“ angegeben) ist ein Modell der Sakkadenauslösung, Kahlon & Lisberger (1996) zeigen bei Affen, dass Folgebewegungslernen richtungsspezifisch ist – beide sagen nichts über Bildsprünge oder den PPC.
- **„Eine Sakkade überträgt keine Geschwindigkeitsinformation“ – falsch:** Aufholsakkaden verrechnen Positionsfehler **und** Netzhautschlupf (de Brouwer et al., 2002b), nach Sakkaden ist der Folgebeginn sogar verstärkt (Lisberger, 1998, Affen). Sakkaden und Folge gelten als zwei Ergebnisse eines Prozesses (Orban de Xivry & Lefèvre, 2007).
- **Zahlen:** 500°/s Spitzengeschwindigkeit gilt nur für große Sakkaden; bei den hier nötigen Aufholsprüngen von wenigen Grad deutlich weniger (Lehrbuchwissen, nicht eigens belegt). Echte Reaktionszeiten auf einen Wechsel: Folgegeschwindigkeit sinkt nach ≈ 90 ms, Richtung ändert sich ab ≈ 130 ms (Soechting et al., 2005), Aufholsakkade ≈ 125 ms (de Brouwer et al., 2002a).
- **Leistungsstufen ohne Datengrundlage:** Die Seite misst weder Blick noch Zeigerposition; „Re-Zentrierungszeit“, „räumliche Präzision“ und „post-sakkadische Stabilität“ sind nicht erhebbar, der Hinweis „standardisierte Tests bei 1080p“ hat keine Quelle. „Vollständige parietale Remapping-Automatisierung“ ist erfunden.
- **144 Hz „30–50 ms früher“:** durch die Bildfrequenz allein nicht erklärbar – der Abstand zweier Bilder sinkt nur von 16,7 ms (60 Hz) auf 6,9 ms (144 Hz), also um ≈ 10 ms; größere Unterschiede hängen von der gesamten Systemlatenz ab (Eingabe, Puffer, Bildschirm), nicht von „Hz“ allein. Woods et al. (2015) behandeln einfache Reaktionszeit, nicht Monitore. Latenz zählt mehr als Bildfrequenz (Spjut et al., 2019). Hier verändert ein 144-Hz-Gerät sogar die Übung (mehr Wechsel, Abschnitt 2).
- **Neuroplastizität/Transfer:** Für „dauerhafte Automatisierung“, Screen-Shake-Festigkeit oder Motorsport gibt es keine Studie; allgemeine Wahrnehmungstrainings zeigen keinen Ferntransfer auf Sport (Fransen, 2024).
- **Rotations-Anker „Gleichgewicht“:** Da sich nichts dreht, entfällt der Grund. Das Pensum (3–5 kurze Runden, danach in die Ferne schauen) ist vernünftig, aber nicht belegt.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel ≈ 0,7–0,85° (Monitor 60 cm), ≈ 0,9° (Tablet 40 cm) – weit über der Auflösungsgrenze; Sehschärfe nicht leistungsbegrenzend.
- **Folgeleistung über die Runde:** Der glatte Gain ist immer < 0,95 und sinkt mit dem Tempo (Collewijn & Tamminga, 1984); in einer kleinen Laborstichprobe (5 Personen) erreichten 4 ≈ 90 % Gain bis ≈ 100°/s, die fünfte nur ≈ 60 % davon (Meyer et al., 1985; vorhersagbare Laborreize, bei unvorhersagbaren Wechseln eher weniger). Bei 1× (15 → 40°/s) ist die Aufgabe daher gut machbar, ab 2× (Endtempo ≈ 80°/s) nahe an der Grenze, ab 3× nur noch sakkadisches Hinterherspringen.
- **Reaktion auf einen Wechsel:** Nach einem abrupten Richtungswechsel sinkt die Folgegeschwindigkeit erst nach ≈ 90 ms, die Richtung ändert sich erst ab ≈ 130 ms (Soechting et al., 2005; gemessen an Richtungswechseln, hier auf Umkehrungen übertragen). Bei 40°/s läuft das Auge in dieser Zeit ≈ 4–5° weiter, während sich das Ziel ebenso weit in Gegenrichtung entfernt – zusammen **≈ 8–10° Abstand** (eigene Rechnung), der per Aufholsakkade ausgeglichen wird. Reine Tempoänderungen (25 % der Ereignisse) sind hier sprunghafte Geschwindigkeitswechsel um 20–30 %; auf solche Tempo-Sprünge antwortet die Folge mit kurzer Latenz (Soechting et al., 2005). Für allmähliche Beschleunigung liegen die Unterscheidungsschwellen von Wahrnehmung und Folge dagegen höher als für Geschwindigkeit (Watamaniuk & Heinen, 2003) – das betrifft hier vor allem das langsame Hochdrehen über die Runde, das kaum bemerkt werden dürfte (eigene Übertragung). Kleine Tempo-Schwankungen verfolgt das Auge mit nur ≈ 67 ms reiner Verzögerung (Tavassoli & Ringach, 2009).
- **Bewegungsunschärfe/Ruckeln:** Sprung pro Bild bei 1× am Ende ≈ 0,7° (60 Hz), etwa Zielgröße; Verschmierung ≈ Geschwindigkeit ÷ Bildfrequenz (eigene Rechnung, Prinzip siehe 410/412).
- **Blickfeld und Gleitsicht:** Vollbild 24 Zoll in 60 cm ≈ 48° × 28° (Tablet 40 cm ≈ 33° × 23°); das Ziel erreicht ständig die Ecken. Der scharfe Zwischenbereich einer Gleitsichtbrille ist seitlich nur ≈ 13–18° breit statt ≈ 60° bei Einstärkengläsern (Han et al., 2003); neue Träger:innen bewegen mehr den Kopf (Hutchings et al., 2007). Diagonalen führen zugleich nach unten (Nahteil) und oben (Fernteil) → Arbeitsplatzbrille, kleineres Feld oder Kopfbewegung erlauben.
- **Akkommodation/Kontrast:** 60 cm ≈ 1,7 dpt, 40 cm ≈ 2,5 dpt. Rot #ef4444 auf #050508 ≈ 5,4 : 1, Weiß 20 : 1 (Rechnung aus 410). Bei Protan-Schwäche wirkt Rot dunkler; ≈ 8 % der Männer haben eine Rot-Grün-Schwäche (Birch, 2012).
- **Trockenes Auge:** Bildschirmarbeit senkt die Lidschlagrate im Mittel etwa auf ein Fünftel (Patel et al., 1991); beim konzentrierten Folgen ist Ähnliches zu erwarten (Übertragung, nicht eigens untersucht).
- **Alter:** Folge-Gain sinkt im Alter bei allen Tempi, Unterschied wächst mit Tempo und Beschleunigung (Moschner & Baloh, 1994) – das automatische Hochdrehen trifft Ältere also besonders.

## 5. Neurowissenschaftliche Grundlagen

- Bewegungssignale aus MT/MST steuern die Folge über das Folgeareal des frontalen Augenfelds (FEF), Brückenkerne und Kleinhirn (Lisberger, 2010); FEF mit direktestem Einfluss, Basalganglien und Colliculus superior beteiligt (Krauzlis, 2004). Die Antwort auf einen Richtungswechsel lässt sich als Überlagerung „alte Bewegung stoppt“ + „neue beginnt“ beschreiben (Soechting et al., 2005).
- Unvorhersagbare Bahnen werden schlechter verfolgt als vorhersagbare: der glatte Gain ist bei Pseudo-Zufallsbewegung niedriger als bei einfachen Sinusbahnen (Collewijn & Tamminga, 1984; vgl. Bahill et al., 1980); Vorhersage und extraretinale Signale stützen die Folge (Barnes, 2008). Vorhersagbar sind hier nur die Randabpraller (≈ 1,3/s) – die zufälligen Wechsel nicht.
- Parietales Remapping (Duhamel et al., 1992) begleitet jede Sakkade; dass diese Übung es „trainiert“, ist nicht gezeigt. Lernen der Folgebewegung ist bei Affen richtungsspezifisch (Kahlon & Lisberger, 1996) – ein Hinweis, dass Übung eher aufgabennah wirkt.

## 6. Motorische Grundlagen

- Keine Hand-Eingabe; die „Motorik“ sind Augenbewegungen → motorische Profilwerte 0. Nicht die Augenmuskeln begrenzen: Auge und Hand reagieren auf Richtungswechsel fast gleich schnell (Engel et al., 2000).
- Wer Maus/Finger mitführt, macht daraus eine unbewertete Nachführaufgabe; am Tablet verdeckt der Finger das Ziel. Gerät stabil aufstellen, aufrecht sitzen.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung:** Fortschritt nur subjektiv. Die Schwierigkeit ist innerhalb einer Runde nicht konstant (Tempo steigt), zwischen Runden je nach Zufall unterschiedlich – selbst mit Eyetracker wären Runden schlecht vergleichbar.
- **Dauer verändert die Aufgabe:** 30-s-Runden enden bei ≈ 37°/s, 90–120-s-Runden laufen überwiegend nahe der Obergrenze (Median am Ende ≈ 39°/s, Grenze ≈ 42°/s × Tempo).
- **Gerät:** Wechselrate hängt von der Bildfrequenz ab (0,68–1,08/s); °/s hängt von Pixeldichte und Abstand ab (Tablet mit kleinerem Feld → mehr Abpraller). Vergleiche nur am selben Gerät und Abstand.
- **Person:** Ermüdung und nachlassende Aufmerksamkeit dürften die Folge verschlechtern (plausibel, hier nicht eigens belegt); Alter (Moschner & Baloh, 1994), Brillenversorgung.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Keine Studie zu dieser Übung. Beste Analogie: 2 × 6 min Folgen eines quasi-zufällig bewegten Ziels an 3 Tagen verbesserten die Folgebewegung noch nach 5 Tagen (Eibenberger et al., 2012; je N = 10, Eyetracker). Rückmeldung verstärkt das Lernen deutlich: mit Belohnung für genaues Folgen stieg der Gain bei kurz verdeckten Zielen nach 8–10 Sitzungen von 0,59 auf 0,89, mit zufälliger Belohnung blieb er praktisch gleich (0,60 → 0,63), ohne Belohnung stieg er leicht (0,63 → 0,71) (Madelain & Krauzlis, 2003) – das Original gibt keine Rückmeldung.
- **Naher Transfer – schwach:** Eibenberger et al. (2012) testeten mit einer anderen Aufgabe – ein Hinweis, mehr nicht. Richtungsspezifität des Lernens (Kahlon & Lisberger, 1996) spricht gegen breiten Transfer.
- **Alltagstransfer – fehlend:** Kein Beleg für Screen-Shake-Festigkeit, Motorsport, Kampfsport oder Verkehr (Fransen, 2024; Simons et al., 2016); große Effekte digitaler Sport-Sehtrainings zeigen sich vor allem am Trainingsgerät (Guo et al., 2025).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickfolge mit zufälligen Umkehrungen und Wiederfinden per kleiner Sakkade ohne Hand geübt werden soll; als Stufe nach 404/412, 415 und 410 – unter 409–415 die am wenigsten vorhersagbare Richtungswechsel-Übung. Einstellung: Tempo 0,5–1×, Runden 30–60 s, „Random Speed“ aus, Linie zuerst an, später aus; 3–5 Runden mit Pausen und bewusstem Blinzeln.
- **Weniger passend, wenn …** das Ziel „Orientierung nach Bildsprüngen/Kamerawackeln“ ist (die Übung hat keine; Positionssprünge: 414), Rückmeldung gewünscht ist oder Auge-Hand-Koordination geübt werden soll (104, 105, 505, 513).
- **Vorsicht / anpassen bei …**
  - **Photosensitivität geprüft (kein Vorsichtsschlüssel):** kein Blinken, keine Vollbildblitze, das Ziel bewegt sich stetig (wie 410, 412, 413, 415) → `flimmern_lichtreize` 0. Das helle Ziel liegt mit ≈ 2–8·10⁻⁴ sr (je nach Leuchtschein, eigene Abschätzung) weit unter der Flächenschwelle von 0,006 sr (WCAG 2.3.1; Harding et al., 2005); bei Size 50 px am Tablet aus 30 cm ≈ 2–4·10⁻³ sr (Scheibe und Ring), mit Außenring/Leuchtschein bis nahe an 0,006 sr – also knapp darunter (eigene Abschätzung wie bei 410). Ab ≈ 2–3× springt es pro Bild 1,4–2°; das ist kein Blitz im Sinn von WCAG, kann aber unruhig wirken → bei Licht- oder Reizempfindlichkeit Tempo ≤ 1×, „Neon Glow“/„Gaze Trail“ aus, Size klein halten, Day Mode meiden.
  - `schwindel_vestibulaer`, `reisekrankheit`: dauernde, unvorhersagbare Umkehrungen bei steigendem Tempo; großflächige Bewegung fehlt (ruhiger Hintergrund), daher gering, aber individuell unangenehm möglich (Keshavarz et al., 2015). Kurze Runden, niedriges Tempo.
  - `nystagmus`: Folge und Blickhalten können eingeschränkt sein, Frustgefahr.
  - `gesichtsfeldausfall`: Ziel läuft ständig in die Ecken und kann im ausgefallenen Bereich verloren gehen.
  - `presbyopie_gleitsicht`: Diagonalen durch Rand-, Nah- und Fernzone → kleineres Feld, Bildschirmbrille, Kopfbewegung erlauben.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: wenig Lidschlag beim Dauerfolgen; kurze Blöcke.
  - `kinder_unter_6`: abstrakte Aufgabe ohne Rückmeldung bei steigendem Tempo – nicht empfohlen.
- **Kombiniert gut mit …** 412/404 (gleichförmige Grundform) → 415 (sanftes Zufallsdriften) → 410 (harte Haken im festen Takt) → **411** (steigende Unvorhersagbarkeit). **Unterschied zu 410:** dort ≈ 2 Haken/s im festen 0,5-s-Takt bei gleichbleibendem Tempo, hier ≈ 0,9 Wechsel/s zu zufälligen Zeitpunkten (Umkehr, Achsenspiegelung oder Tempowechsel) bei von selbst steigendem Tempo. Daneben 414 (echte Positionssprünge), 407 (Vorhersage bei Verdeckung), 303 (Blicksprünge auf ruhende Ziele), 105/513 (gleiche Idee mit Hand).

Keine Diagnose, keine Heilversprechen: Trainingsaufgabe für gesunde Nutzer:innen, kein Test der Augenbeweglichkeit.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlicher Name und Inhalt:** als „Blickfolge mit Richtungswechseln“ führen; wenn „Sichtfeldwechsel“ gewünscht ist, echte, kleine Verschiebungen des ganzen Spielfelds (z. B. 2–5°, ohne Rotation, mit Schwindel-Hinweis) als eigene Variante bauen.
- **Konstante, steuerbare Schwierigkeit:** Tempo in °/s fest je Runde (kein selbsttätiges Hochdrehen), Wechsel zeitbasiert statt pro Bild (z. B. mittlerer Abstand 0,8–1,5 s, Mindestabstand 300 ms), Wechselwinkel wählbar (30–180°) statt nur Achsenspiegelung.
- **Prüfbar machen ohne Eyetracker:** 150–400 ms nach einem Wechsel kurz ein Sehzeichen im Ziel zeigen (wie `scharf-in-bewegung`); adaptiv über das Tempo, Ergebnis in °/s.
- **Technik:** keine 13-ms-Sperre, Bildfrequenz ermitteln und speichern; Sprung pro Bild ≤ 1°; kein Leuchtschein, sichtbarer Stopp-Knopf.
- **Tablet/Optiker:** Ständer, ≈ 40 cm, Querformat; kleineres Bewegungsfeld (20–30°) für Gleitsicht; „Kopf ruhig“ als Variante; Standardfarbe Weiß/Gelb auf Dunkel.
- **Texte:** keine Hirnregion-, Profi- oder Sportversprechen, keine erfundenen Stufen; DE/IT, große Bedienflächen.

## 11. Quellen

### Von der Website angegeben

- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Übergang Sakkade → Folge, gemeinsame Kaskade; „Sakkade überträgt keine Geschwindigkeit“ ist so nicht richtig, vgl. de Brouwer et al., 2002b).
- Findlay, J. M., & Walker, R. (1999). A model of saccade generation based on parallel processing and competitive inhibition. *Behavioral and Brain Sciences, 22*(4), 661–674. https://doi.org/10.1017/S0140525X99002150 – **Prüfung:** DOI stimmt ✓; im Fließtext als „Findlay & Gilchrist (1999)“ zitiert – diese Angabe steht nicht in der Quellenliste, gemeint ist offenbar Findlay & Walker; **stützt:** nein (Sakkadenauslösung; nichts zu Bildsprüngen oder PPC-Koordinatentransformation).
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓ (nur bibliografisch, kein Abstract); **stützt:** unklar (im Text nicht konkret verwendet).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website leicht falsch („pursuit“ statt „tracking“), nur bibliografisch; **stützt:** teilweise (Klassiker: Positionsfehler → Sakkade, Geschwindigkeitsfehler → Folge).
- Kahlon, M., & Lisberger, S. G. (1996). Coordinate system for learning in the smooth pursuit eye movements of monkeys. *The Journal of Neuroscience, 16*(22), 7270–7283. https://doi.org/10.1523/JNEUROSCI.16-22-07270.1996 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Folgelernen bei Affen ist richtungsspezifisch, generalisiert über 15–45°/s; nichts zu PPC oder Bildschirmerschütterungen).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein („30–50 ms früher mit 144 Hz“ steht dort nicht; allein durch die Bildfrequenz sind nur ≈ 10 ms erklärbar).
- Die Leistungsstufen-Tabelle nennt keine Quelle; keine der sechs Arbeiten enthält Normwerte für „Re-Zentrierung“.

### Weitere Fachliteratur

- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – unvorhersagbare Bahnen (nur bibliografisch geprüft, kein Abstract verfügbar)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – Vorhersage, extraretinale Signale
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, sinkt mit Tempo
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002a). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden ≈ 125 ms
- de Brouwer, S., Missal, M., Barnes, G., & Lefèvre, P. (2002b). Quantitative analysis of catch-up saccades during sustained pursuit. *Journal of Neurophysiology, 87*(4), 1772–1780. https://doi.org/10.1152/jn.00621.2001 – Aufholsakkaden rechnen Zielbewegung ein
- Duhamel, J.-R., Colby, C. L., & Goldberg, M. E. (1992). The updating of the representation of visual space in parietal cortex by intended eye movements. *Science, 255*(5040), 90–92. https://doi.org/10.1126/science.1553535 – parietales Remapping (Affen)
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Training mit quasi-zufälligem Ziel
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Muskeln nicht begrenzend
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x – kein Ferntransfer
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Effekte vor allem am Trainingsgerät
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – schmales Gleitsicht-Sehfeld
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitz-Grenzwerte
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegung mit Gleitsicht
- Keshavarz, B., Riecke, B. E., Hettinger, L. J., & Campos, J. L. (2015). Vection and visually induced motion sickness: How are they related? *Frontiers in Psychology, 6*, 472. https://doi.org/10.3389/fpsyg.2015.00472 – Vektion und Reisekrankheit
- Lisberger, S. G. (1998). Postsaccadic enhancement of initiation of smooth pursuit eye movements in monkeys. *Journal of Neurophysiology, 79*(4), 1918–1930. https://doi.org/10.1152/jn.1998.79.4.1918 – Folge nach Sakkaden verstärkt
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – Netzwerk MT, FEF, Kleinhirn
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Rückmeldung verstärkt Folgelernen
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s (4 von 5 Personen)
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge im Alter
- Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881 – Sakkade und Folge als ein Prozess
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm im Mittel auf ≈ 1/5 reduziert
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer von Hirntraining
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf Richtungs- und Tempo-Sprünge (online 2004)
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- Tavassoli, A., & Ringach, D. L. (2009). Dynamics of smooth pursuit maintenance. *Journal of Neurophysiology, 102*(1), 110–118. https://doi.org/10.1152/jn.91320.2008 – schnelle Antwort auf Tempo-Schwankungen (≈ 67 ms Verzögerung)
- Watamaniuk, S. N., & Heinen, S. J. (2003). Perceptual and oculomotor evidence of limitations on processing accelerating motion. *Journal of Vision, 3*(11), 698–709. https://doi.org/10.1167/3.11.5 – Beschleunigung schwerer unterscheidbar als Geschwindigkeit (Wahrnehmung und Folge)
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Erfolgskriterien 2.2.2, 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ – Blitz-Flächenschwelle, Pause-Pflicht
