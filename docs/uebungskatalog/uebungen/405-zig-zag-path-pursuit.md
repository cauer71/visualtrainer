---
# ===== Kennung =====
nr: 405
kennung: zig-zag-path-pursuit
name: "Zickzack-Blickfolge (steile Schrägstrecken mit spitzen Knicken)"
name_original: "Zickzack-Blickverfolgung – Diagonale Blickfolge und schnelle Umkehr (Zig-Zag Path Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/zig-zag-path-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein roter Leuchtpunkt läuft mit gleichbleibendem Tempo auf einer festen Zickzacklinie aus sieben steilen Schrägstrecken von links unten nach rechts oben und wieder zurück; an jedem Knick ändert er schlagartig die Richtung. Man folgt ihm nur mit den Augen bei ruhigem Kopf – eine Eingabe oder Wertung gibt es nicht."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (Regler in 0,1-Schritten; bei 1× 0,65 s je Schrägstrecke, ≈ 26°/s am 24″-Monitor in 60 cm; bei 9× 72 ms und ≈ 240°/s), 'Zufallstempo' (Tempo schwankt weich zwischen dem 0,4- und 1,9-Fachen, im Mittel +15 %), 'Hilfslinie ausblenden', Zielradius 10–50 px (Standard 16 px), Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung – nur Zähler abgeschlossener Sitzungen; Zeiger/Finger werden gar nicht erfasst", "sinnvoll mit Eyetracker: Folge-Gain auf den Geraden, Verzögerung bzw. Vorlauf der Augenumkehr am Knick (ms), Zahl und Größe der Aufholsakkaden je Knick", "Ersatz ohne Eyetracker: Finger/Zeiger mitführen lassen und Abstand zum Ziel (Grad) sowie Umkehr-Verzögerung am Knick (ms) messen", "subjektiv: Komfort/Beschwerden 0–10 bei gleichem Gerät und Abstand"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
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
    verarbeitungsgeschwindigkeit: 0
    antizipation: 2
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
voraussetzungen: ["Bildschirm oder Tablet (am besten quer, mit Ständer) in 40–70 cm Abstand, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über eine Bahn von ≈ 39° × 17° (Monitor) bzw. ≈ 26° × 14° (Tablet quer) – die Bewegung ist überwiegend senkrecht, deshalb Arbeitsplatzbrille oder Einstärkenglas günstiger als Gleitsicht", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert zu folgen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["Blickfolge mit abrupten, regelmäßig wiederkehrenden Richtungswechseln üben (Wechsel von glatter Folge und Aufholsakkade an jedem Knick)", "überwiegend senkrechte Blickfolge (Auf-ab-Anteil ≈ 95 % der Geschwindigkeit) als Ergänzung zu waagrechten Bahnen", "Vorhersage eines festen Rhythmus: bei 0,5–1× (Knick alle 1,3 bzw. 0,65 s) Umkehr zunehmend vorwegnehmen", "kurze Augenübung ohne Hand- oder Körpereinsatz und ohne Blitzreize"]
weniger_geeignet_fuer: ["alle, die Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Gleitsichtträger:innen am großen Monitor ohne Kopfbewegung (senkrechte Wege von ≈ 17° führen durch Nah- und Fernzone, 39° Breite über den scharfen Zwischenbereich hinaus)", "Tempo ab ≈ 3× für Ungeübte und Ältere (Schrägstrecke ≤ 0,2 s, > 75°/s: kein glattes Folgen mehr möglich)", "Einstieg in Blickfolge überhaupt (404 oder 403 sind ruhiger)", "Ziel Reaktion, Handgenauigkeit, Peripherie, Lesen oder Sporttransfer"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Bei periodischen Dreieck- bzw. Rampenbahnen wird die Augenumkehr im Labor schon nach 2–4 Zyklen vorweggenommen (Barnes & Asselman, 1991), und die Augen bremsen vor erwarteten Umkehrpunkten (Collins & Barnes, 2009); kurzes Pursuit-Training wirkte einige Tage nach (Eibenberger et al., 2012) – alles mit Eyetracker, nicht mit dieser Übung. Übertragung auf andere Bahnen ist kaum untersucht, ein Nutzen für Sport oder Shooter nie gezeigt."
aehnliche_uebungen: [406, 413, 403, 404, 402, 407, 415, 410, 513, 505, 105, 515]
stichworte: ["Zickzack", "zig-zag pursuit", "smooth pursuit", "glatte Blickfolge", "Richtungswechsel", "Aufholsakkaden", "Dreieckswelle", "vertikale Blickfolge", "prädiktive Blickfolge", "Knickpunkt"]
---

# 405 · Zickzack-Blickfolge (steile Schrägstrecken mit spitzen Knicken)

> Original: „Zickzack-Blickverfolgung – Diagonale Blickfolge und schnelle Umkehr“ („Zig-Zag Path Pursuit“) –
> skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Im Vollbild zeigt eine schwache blaue Linie eine Zickzackbahn aus sieben gleich langen, steilen Schrägstrecken.
Ein roter Leuchtpunkt läuft mit gleichbleibendem Tempo von links unten nach rechts oben und denselben Weg zurück;
an jedem Knick wechselt er ohne Abbremsen die Richtung. Man folgt ihm nur mit den Augen bei ruhigem Kopf. Es gibt
keine Eingabe, keine Punkte und keine Fehlerwertung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `43444-…js`, Hilfsmodule `90762-…js`, `71254-…js`, Stand 29.09.2026); nur
Mechanik ausgewertet. Grad-Werte sind eigene Umrechnungen (24″-Full-HD in 60 cm ≈ 38–40 px/°; 11″-Tablet in 40 cm
≈ 37 px/°).

- **Ablauf (Code):** Vollbild (sonst bildschirmfüllende Ebene) → Countdown 3-2-1-GO (≈ 2,5 s, mit Tönen) → 30–120 s
  (Standard 60 s) → Endbildschirm „Smooth Pursuit Calibrated“ mit Dauer, Grundtempo, „Speed Acceleration“ und
  Sitzungszähler (nur im Browser). Abbruch mit Escape oder Verlassen des Vollbilds.
- **Bahn (Code):** 8 Eckpunkte von 10 % bis 90 % der Bildbreite in 7 gleichen Schritten, abwechselnd auf 80 % und
  20 % der Bildhöhe; jede Strecke ist 11,4 % der Breite × 60 % der Höhe (Full HD: 219 × 648 px, **71°** gegen die
  Waagrechte). Der Punkt läuft hin und zurück, an den Enden mit 180°-Umkehr.
- **Tempo (Code):** zeitbasiert (Zeitschritt ≤ 100 ms), bildratenunabhängig, überall gleich; 1×: Durchlauf 4,55 s.

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| Dauer einer Schrägstrecke (alle Geräte) | 1,30 s | 0,65 s | 0,32 s | 0,22 s | 0,13 s | 93 ms | 72 ms |
| 24″-Full-HD, 60 cm (Bahn 39° × 17°): °/s | 13 | 26 | 52 | 79 | 131 | 184 | 236 |
| 11″-Tablet quer, 40 cm (Bahn 26° × 14°): °/s | 11 | 21 | 43 | 64 | 107 | 150 | 193 |

- **Knick (eigene Rechnung aus dem Code):** Richtungsänderung ≈ **143°** am 16 : 9-Monitor, ≈ 150° am Tablet quer,
  ≈ 165° am Tablet hoch. Die Bewegung ist überwiegend **senkrecht** (1× Monitor: ≈ 25°/s auf-ab, ≈ 8°/s seitwärts);
  die Auf-ab-Komponente ist eine Dreieckswelle mit 0,77 Hz bei 1× (2,3 Hz bei 3×).
- **Reiz (Code):** „16 px“ ist der **Radius**: Außenring Ø 42 px, Ring Ø 32 px (≈ 0,8°), Kern Ø 26 px mit weißem
  Mittelpunkt; 10–50 px. Sechs Farben ohne Informationsgehalt (Standard Rot), Grund fast schwarz, Raster 2 %,
  Bahnlinie 25 % Deckkraft; optional Spur, Leuchtsaum (hier Standard aus), „Scanlines“, „Heller Modus“. Keine Blitze.
- **„Zufallstempo“ (Code):** feste Summe langsamer Schwingungen, Faktor 0,40–1,90, im Mittel **1,15**; die Knicke
  kommen in wechselnden Abständen, die Bahn bleibt gleich.
- **Bildrate und Eingabe (Code):** Bilder < 13 ms nach dem vorigen werden verworfen → 60 Bilder/s an 60/120/240 Hz,
  72 an 144 Hz; bei 9× springt der Punkt 3–4° pro Bild (≈ 5 Bilder je Strecke). Zeiger und Touch werden auf der
  Zeichenfläche **nicht erfasst**, es gibt kein Fadenkreuz (anders als 404).

**Widersprüche Regeltext ↔ Code:** (1) „prüfe Blickverluste und Fehler an den Knickpunkten“, Tabelle mit
„Landefehler in px“ und „Umkehr-Sakkadenlatenz“ – nichts wird gemessen, „Calibrated“ ist irreführend. (2)
„**120°**-Richtungsbrüche“ – tatsächlich 143–165°. (3) „Rectus medialis/lateralis“ (Seitwärtsmuskeln) – gefordert sind
vor allem Heber und Senker. (4) „Zufallstempo gegen starre Rhythmen“ – deterministisch, im Mittel 15 % schneller.
(5) „144/240 Hz überlegen“ – der Code zeichnet höchstens ≈ 72 Bilder/s.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Bahn den „ultimativen Härtetest“: an Knicken müssten „Antagonisten explosionsartig
kontrahieren“, Training baue im Kleinhirn „Vorwärtsmodelle“ auf, die 30–40 ms vor dem Knick bremsen, „Jitter“ werde
„dauerhaft eliminiert“ (FEF, SEF, Vermis VI–VII). Versprochen werden besseres „Strafe-Aiming“ in Shootern und eine auf
„wenige Millisekunden“ verkürzte Re-Zentrierung im Sport; empfohlen 2–3 Sätze à 45–60 s täglich. Eine Tabelle ordnet
Tempo, Landefehler (< 12 bis > 70 px) und Umkehrlatenz (< 110 bis > 250 ms) „Populationsanteilen“ zu („Top 1,5 %“).

- **Leistungstabelle – ohne Datengrundlage:** Keine angegebene Quelle enthält solche Stufen; px-Werte hängen vom Gerät
  ab, und die Übung misst weder Blick noch Zeiger. Die Werte sind als erfunden einzustufen.
- **Richtungswechsel – im Kern richtig:** Bei einem unvorhersehbaren Knick sinkt die Augengeschwindigkeit nach ≈ 90 ms,
  die neue Richtung setzt ab ≈ 130 ms ein (Soechting et al., 2005); Aufholsakkaden folgen aus Positions- und
  Geschwindigkeitsfehlern (de Brouwer et al., 2002). Das Überschießen ist **neuronale** Verzögerung, nicht „mechanische
  Trägheit“: Auge und Hand drehen trotz sehr verschiedener Trägheit gleich langsam um (Engel et al., 2000).
- **Bremsen vor dem Knick – belegt, aber nicht durch die zitierten Quellen:** Bei wiederkehrenden Umkehrpunkten bremsen
  die Augen von selbst vorausschauend, zeitlich gemittelt über die letzten 2–3 Strecken (Collins & Barnes, 2009).
  „30–40 ms“ und „Trainingsaufbau im Kleinhirn“ sind nicht belegt.
- **„Kurvenschneiden“** ist normales Vorhersageverhalten an Ecken (Collewijn & Tamminga, 1984), kein Mangel an
  „Fixationsdisziplin“; die dafür zitierte Heinen-Arbeit existiert nicht.
- **Hirnregionen, Sport, Quellen:** Die Areale gehören zum Pursuit-Netz (Abschnitt 5), eine Veränderung durch diese
  Übung ist nicht belegt; Sport-/Shooter-Nutzen unbelegt, „wenige Millisekunden“ unmöglich. Von 6 Quellen existieren 2
  in der zitierten Form nicht (Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ring ≈ 0,8–0,9° – Visus kaum gefordert. Kleine, in die Fovea passende Ziele erzeugen mehr
  Aufholsakkaden (Heinen et al., 2016); Radius 25–50 px ergibt ruhigeres Folgen.
- **Latenz am Knick:** Folgebewegung setzt nach ≈ 100 ms ein (Carl & Gellman, 1987), die neue Richtung nach ≈ 130 ms
  (Soechting et al., 2005). Bei 1× ist so das erste Fünftel jeder Strecke „Aufholen“; ab ≈ 5× (0,13 s) ist die
  Strecke vorbei, bevor eine reaktive Antwort greift – dann bleibt nur Vorhersage oder sakkadisches Mitspringen.
- **Vorhersage:** Verzögerungsfrei folgen lässt sich nur bei stetiger Geschwindigkeit und begrenzter Beschleunigung
  (Bahill & McDonald, 1983) – ein Knick ist das Gegenteil. Bei periodischen Dreieckbahnen wird die Antwort aber über
  2–4 Zyklen stärker und früher (300 → 200 ms bis zum Geschwindigkeitsgipfel; Barnes & Asselman, 1991). Dreieckbahnen
  werden bis ≈ 75°/s mit Gain ≈ 0,9 verfolgt (Buizza & Schmid, 1986) – bei 1–2× machbar, ab 3× am Monitor darüber.
- **Richtung:** senkrecht wird schlechter gefolgt als waagrecht, aufwärts schlechter als abwärts (Rottach et al., 1996;
  Ke et al., 2013) – diese fast senkrechte Bahn ist bei gleichem Tempo schwerer als 403 oder 413.
- **Gleitsicht/Arbeitsplatz:** unten Nahteil, oben Fernteil; der scharfe Zwischenbereich ist bei 60 cm nur
  ≈ 13–18° breit, Träger:innen bewegen am Bildschirm mehr den Kopf (Han et al., 2003). Die ständigen Auf-ab-Wege von
  ≈ 17° wechseln durch verschiedene Wirkungszonen, die Bahn ist 39° breit → Arbeitsplatz-/Bildschirmbrille, kleineres
  Fenster oder mehr Abstand, Kopf mitbewegen.
- **Nähe, Auge, Alter:** 60 cm ≈ 1,7 dpt, 40 cm = 2,5 dpt Akkommodation bzw. Nahkorrektur; seltener Lidschlag beim
  Verfolgen (≈ 11,6/min am Bildschirm; Portello et al., 2013). Ältere haben niedrigeren Gain, besonders bei schnellen
  Zielen (Moschner & Baloh, 1994); Kinder erreichen Erwachsenenwerte erst in der späten Jugend (Katsanis et al., 1998).

## 5. Neurowissenschaftliche Grundlagen

- MT/V5 und MST liefern die Bewegungssignale; FEF, SEF, Brückenkerne und Kleinhirn (Flocculus/Paraflocculus,
  hinterer Vermis) setzen sie um (Lencer & Trillenberg, 2008). Folge und Sakkaden teilen weitgehend eine Architektur
  (Krauzlis, 2004) und arbeiten als ein sensomotorischer Prozess zusammen (Orban de Xivry & Lefèvre, 2007).
- Vorhersage beruht auf gespeicherter Geschwindigkeits- und Zeitinformation (Barnes, 2008; Barnes & Asselman, 1991).
- Beim Affen senkten Läsionen des Vermis (VI–VII) den Gain bei Dreieckbahnen um ≈ 15 % (Takagi et al., 2000) – das
  zeigt seine Beteiligung, nicht, dass eine Browser-Übung ihn „optimiert“.

## 6. Motorische Grundlagen

Die einzige Motorik ist die Augenbewegung: glatte Folge auf den Geraden, Abbremsen und Aufholsakkade am Knick. Auge und
Hand folgen am Richtungswechsel derselben Dynamik, umso schneller, je größer der Wechsel (Engel et al., 2000);
Mitführen der Hand kann die Augenfolge bei vorhersagbaren Bahnen glätten (Koken & Erkelens, 1992). Das Original erfasst
keinen Zeiger – daher alle motorischen Werte 0.

## 7. Einflussfaktoren und Messgrenzen

Ohne Eyetracker bleibt offen, ob glatt gefolgt oder gesprungen wurde (eigene Blicksprünge bemerkt man oft nicht).
Seitenverhältnis bestimmt Knickwinkel und Steilheit, Bildgröße und Abstand die °/s – „1×“ ist kein fester Reiz. Dazu
kommen Alter, Müdigkeit und Tagesform; die feste Bahn ist nach wenigen Durchläufen vorhersagbar.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel (plausibel):** Periodische Dreieckbahnen werden binnen weniger Zyklen vorausschauender
  verfolgt (Barnes & Asselman, 1991); 2 × 6 min Pursuit-Training an 3 Tagen wirkte 5 Tage nach (n = 10 + 10;
  Eibenberger et al., 2012). Die reaktive Latenz am unerwarteten Knick (≈ 90–130 ms) ist kaum veränderbar.
- **Naher Transfer – schwach:** kaum Daten, ob eine feste Zickzackbahn andere Bahnen oder unregelmäßige Wechsel verbessert.
- **Alltagstransfer – fehlend:** kein Beleg für Sport, Shooter oder Verkehr; große Effekte digitaler Sehtrainings
  entstehen vor allem, wenn Training und Test gleich sind (Guo, Yuan et al., 2025; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickfolge mit abrupten, rhythmischen Richtungswechseln geübt werden soll; überwiegend senkrechte
  Blickfolge als Ergänzung zu waagrechten Bahnen; Steigerung nach 404/403; bei 0,5–1× mit großem Zielradius beginnen.
- **Weniger passend, wenn …** Rückmeldung erwartet wird; Einsteiger; Reaktion, Handgenauigkeit, Peripherie oder
  „besser lesen/zielen“ das Ziel sind; ≥ 3× für Ungeübte/Ältere.
- **Vorsicht / anpassen bei …** `presbyopie_gleitsicht` (Auf-ab-Wechsel durch Nah- und Fernzone → Arbeitsplatzbrille,
  kleineres Fenster, Kopf mitbewegen); `schwindel_vestibulaer`, `reisekrankheit` (schnelle Auf-ab-Bewegung; Menschen
  mit visuellem Schwindel reagieren auf Bewegungsreize, Bronstein 1995 → langsam beginnen, bei Übelkeit abbrechen);
  `nystagmus`, `schielen_binokular` (Folge oft verändert, keine Rückschlüsse); `trockenes_auge_bildschirm`,
  `kopfschmerz_asthenopie` (seltener Lidschlag, heller Modus blendet → kurze Blöcke); `kinder_unter_6`.
- **Kombiniert gut mit …** 404 (Einstieg), 403/413 (flachere Wellen bzw. Zickzack), 406 (Dreieck), 407 (Vorhersage
  ohne Sicht), 410/415 (unvorhersehbare Wechsel), 505/513 (Zickzack mit Zeigerwertung), 105 (Erkennen am bewegten Ziel).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Überprüfbare Aufgabe statt „Calibrated“:** kurz nach dem Knick im Ziel eingeblendetes Zeichen (Landolt-C wie 105)
  oder optionales Finger-Mitführen mit Abstands- und Umkehrwertung (Grad, ms).
- **Reiz in Grad:** Bahngröße und Tempo (°/s) aus Bildschirmgröße und Abstand; Knickwinkel wählbar statt vom
  Seitenverhältnis abhängig; Höhe für Gleitsicht auf ≤ 10° begrenzbar; Standard 10–25°/s, Strecke ≥ 0,3 s.
- **Sonstiges:** mittelwerttreues Zufallstempo, keine Bildraten-Drosselung; Tablet quer mit Ständer, Radius ≥ 20 px;
  keine Leistungstabelle ohne Daten; Pausen-, Blinzel-, Gleitsicht- und Abbruchhinweise; DE/IT; dunkel als Standard.

## 11. Quellen

### Von der Website angegeben
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – **Prüfung:** DOI stimmt ✓, Erstautorin falsch angegeben („A. J.“ statt S. = Sophie); **stützt die Aussage der Website:** teilweise (Auslöseregel für Aufholsakkaden belegt; Knickpunkte, FEF-Koordination und alle Tabellenwerte nicht)
- „Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and kinematics of saccadic decisions in smooth pursuit. *Journal of Neurophysiology, 94*(4), 2638–2648. doi.org/10.1152/jn.00282.2005“ – **Prüfung:** DOI falsch (gehört zu Bottjer, 2005, Zebrafinken-Gesangslernen); Titel existiert nicht. Einzige passende Arbeit derselben Autor:innen: Heinen, S. J., Badler, J. B., & Ting, W. (2005). Timing and velocity randomization similarly affect anticipatory pursuit. *Journal of Vision, 5*(6), 493–503. https://doi.org/10.1167/5.6.1; **stützt:** nein (Kurvenschneiden/FEF-Aussage; die reale Arbeit behandelt antizipatorische Folge bei zufälligem Startzeitpunkt)
- „Orban de Xivry, J. J., & Lefèvre, P. (2007). Saccades and the solution to the aperture problem for smooth pursuit. *Behavioral and Brain Functions, 3*, 33. doi.org/10.1186/1744-9081-3-33“ – **Prüfung:** DOI falsch (gehört zu Heijtz et al., 2007, Calcyon/ADHS), Titel und Zeitschrift existieren so nicht. Reale Arbeit: Orban de Xivry, J.-J., & Lefèvre, P. (2007). Saccades and pursuit: Two outcomes of a single sensorimotor process. *The Journal of Physiology, 584*(1), 11–23. https://doi.org/10.1113/jphysiol.2007.139881; **stützt:** teilweise (Zusammenspiel von Sakkade und Folge ja; „ohne Leitlinie antizipieren Kleinhirn und prämotorischer Kortex die Knicke“ nicht)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (beteiligtes Netzwerk ja; „Antagonisten kontrahieren explosionsartig“, Trainingseffekte und „Jitter dauerhaft eliminiert“ nicht)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Vorhersage über extraretinale Signale ja; „Bremsimpuls 30–40 ms vor dem Scheitel“ und Trainingsaufbau im Kleinhirn nicht)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Hardware-Verzögerungen belegt: 60-Hz-LCD 11 ms, 1-kHz-Maus 6,8 ms; die Frame-Dauern 16,7/6,9/4,1 ms sind einfache Rechnung, ein 125-Hz-Vergleich und ein Nutzen für Knickpunkte fehlen)
- Im Text zusätzlich genannt: „Bennett & Barnes (2006)“ (Vorwärtsmodelle an Winkeländerungen) – **Prüfung:** nicht auffindbar (Crossref, PubMed); **stützt:** nein

### Weitere Fachliteratur
- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions. *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2 – verzögerungsfreies Folgen nur bei stetiger Geschwindigkeit
- Barnes, G. R., & Asselman, P. T. (1991). The mechanism of prediction in human smooth pursuit eye movements. *The Journal of Physiology, 439*, 439–461. https://doi.org/10.1113/jphysiol.1991.sp018675 – Vorhersage bei periodischen Dreieckbahnen
- Bronstein, A. M. (1995). Visual vertigo syndrome: Clinical and posturography findings. *Journal of Neurology, Neurosurgery & Psychiatry, 59*(5), 472–476. https://doi.org/10.1136/jnnp.59.5.472 – visueller Schwindel
- Buizza, A., & Schmid, R. (1986). Velocity characteristics of smooth pursuit eye movements to different patterns of target motion. *Experimental Brain Research, 63*(2), 395–401. https://doi.org/10.1007/BF00236858 – Gain bei Dreieckbahnen
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – antizipatorische Richtungsfehler an Ecken
- Collins, C. J. S., & Barnes, G. R. (2009). Predicting the unpredictable: Weighted averaging of past stimulus timing facilitates ocular pursuit of randomly timed stimuli. *The Journal of Neuroscience, 29*(42), 13302–13314. https://doi.org/10.1523/JNEUROSCI.1636-09.2009 – vorausschauendes Bremsen vor Umkehrpunkten
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit
- Engel, K. C., Anderson, J. H., & Soechting, J. F. (2000). Similarity in the response of smooth pursuit and manual tracking to a change in the direction of target motion. *Journal of Neurophysiology, 84*(3), 1149–1156. https://doi.org/10.1152/jn.2000.84.3.1149 – Auge und Hand am Richtungswechsel
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt statt Transfer
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Heinen, S. J., Potapchuk, E., & Watamaniuk, S. N. J. (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. *Journal of Neurophysiology, 115*(3), 1220–1227. https://doi.org/10.1152/jn.00774.2015 – Zielgröße
- Katsanis, J., Iacono, W. G., & Harris, M. (1998). Development of oculomotor functioning in preadolescence, adolescence, and adulthood. *Psychophysiology, 35*(1), 64–72. https://doi.org/10.1111/1469-8986.3510064 – Entwicklung
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – Richtungsasymmetrien
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – Hand unterstützt Augenfolge
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – Netzwerk beim Menschen
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal > vertikal
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – kaum Ferntransfer
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Reaktion auf Richtungswechsel (90/130 ms)
- Takagi, M., Zee, D. S., & Tamargo, R. J. (2000). Effects of lesions of the oculomotor cerebellar vermis on eye movements in primate: Smooth pursuit. *Journal of Neurophysiology, 83*(4), 2047–2062. https://doi.org/10.1152/jn.2000.83.4.2047 – Vermis VI–VII bei Dreieckbahnen (Affe)
