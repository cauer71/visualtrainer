---
# ===== Kennung =====
nr: 104
kennung: moving-target
name: "Zielfang (bewegten Punkt abfangen)"
name_original: "Zielverfolgung | Auge-Hand-Koordination – Moving Target Pro (Kinetic Target Intercept)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "tracking-accuracy"
quelle_url: "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target"
blickfit_umsetzung: {kennung: "zielfang", name: "Zielfang", unterschiede: "Tempo in Einheiten pro Sekunde mit Zeitschritt gerechnet (auf 60 und 120 Hz gleich schnell); Punkt bleibt 3,0 bis 1,6 s statt 1,0 bis 0,2 s und läuft weiter, statt zu springen; adaptive Treppe (3 richtig runter, 1 Fehler rauf) statt Punkte-Level; feste 45 s ohne Zeitbonus und ohne Zeitstrafe; große Fingertreffer-Zone (mind. 32 px Radius); Rückmeldung, ob man vor oder hinter den Punkt tippt; Tablet und Touch als Hauptgerät"}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein einzelner Leuchtpunkt erscheint an einem zufälligen Ort eines dunklen Feldes und wandert los; man tippt ihn an, bevor er nach höchstens 3 s entwischt. Mit der Stufe wird der Punkt schneller, kleiner und bleibt kürzer, ab Stufe 6 läuft er in weichen Kurven. Rückmeldung gibt es auch dazu, ob man eher hinter oder vor den Punkt tippt."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Kontinuierliches Level = max(Level, Punkte/5.250 + 1), ab Level 1 bis über 20; je Level kleineres Ziel, schnellere Bewegung, kürzere Zeit bis zum Ortssprung, kleinere Trefferzone. Zusätzlich verschärft eine Trefferserie (Combo ab 3) diese vier Werte. Fehlt der Treffer innerhalb der 'Shift-Pace'-Zeit (Start 1,00 s, Untergrenze 0,12 s), springt der Punkt weiter und kostet 1 s."
messgroessen: ["Punkte", "Treffer (Intercepts)", "Fehlklicks (inkl. Zeitüberschreitungen)", "Genauigkeit in %", "höchstes Level", "längste Serie (Combo)", "Endtempo (Shift Pace in s)", "Note S+ bis F (Punkte, Wurzelskala)", "sinnvoll ergänzt: Klickort relativ zur Bewegungsrichtung (vor/hinter dem Ziel), Zeit bis zum Treffer, Zielentfernung"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 1
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
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
    antizipation: 2
    entscheidung_wahlreaktion: 0
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
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus oder Touchscreen; ausreichend große Zeichenfläche (Vollbild)", "auf hohen Stufen Ziele unter 1° Durchmesser und Treffer in Bruchteilen einer Sekunde", "für Vergleiche von Sitzung zu Sitzung immer dasselbe Gerät und dieselbe Bildwiederholrate (Tempo hängt im Original an der Bildrate)"]
vorsicht_bei: [photosensitive_epilepsie, tremor_parkinson, hand_arm_beschwerden, sehbehinderung_niedriger_visus, presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, aufmerksamkeitsprobleme]
geeignet_fuer: ["Zusammenspiel von Auge und Hand bei bewegten Zielen üben (Ziel sehen, vorhalten, treffen)", "schnelles Zielen und Blickwechsel zwischen wechselnden Orten unter Zeitdruck", "Mausgeschick und Zeigerkontrolle am Bildschirm", "spielerisches Training mit sofortiger Punkterückmeldung"]
weniger_geeignet_fuer: ["ruhige, glatte Blickfolge bei gleichmäßiger Bewegung (dafür 105, 402–404)", "Menschen, die kein Zeitlimit wünschen (feste Runde von 45 s, der Punkt entwischt nach höchstens 3 s)", "kleine Touchgeräte oder Personen mit Handzittern auf hohen Stufen (Ziele bis ≈ 10 mm Durchmesser)", "Vergleichsmessungen zwischen Geräten (Eingabelatenz, Bildschirmgröße)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Grundlagenforschung zur Interzeption ist stark, und motorisches Lernen in der geübten Aufgabe ist plausibel; für genau diese Übung gibt es keine Studie, und Sehtraining überträgt sich meist nur auf ähnliche Aufgaben (Guo et al., 2025; Simons et al., 2016)."
aehnliche_uebungen: [105, 106, 501, 508, 509, 702, 305, 107]
stichworte: ["Zielfang", "Interzeption", "Auge-Hand-Koordination", "Vorhalt", "smooth pursuit", "Sakkaden", "Fitts", "Maus", "Touch", "Zeitdruck", "Combo"]
---

# 104 · Zielfang (bewegten Punkt abfangen)

> Original: „Zielverfolgung | Auge-Hand-Koordination" (Moving Target Pro) – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual`), Unterkapitel `tracking-accuracy` · Blickfit: umgesetzt als „Zielfang" (`src/exercises/zielfang/`)

## 1. Kurzbeschreibung

Ein einzelner Leuchtpunkt erscheint an einem zufälligen Ort eines dunklen Feldes und wandert los: geradlinig, an den Rändern abprallend, ab Stufe 6 in weichen Kurven. Man tippt ihn an, bevor er nach 3,0 s (auf hohen Stufen 1,6 s) entwischt; nach kurzer Pause folgt das nächste Ziel an einem anderen Ort. Mit der Stufe wird der Punkt schneller, etwas kleiner und bleibt kürzer; nach drei gefangenen Zielen wird es schwerer, nach einem verfehlten leichter. Die Runde dauert 45 s, Fehltipps und entwischte Ziele kosten keine Zeit. Geübt wird das Zusammenspiel von Auge und Hand beim Abfangen (Interzeption): erst per Blicksprung zum neuen Ort, dann dem Punkt kurz folgen und leicht vorhalten. Es ist keine reine Blickfolgeübung, sondern eine Zielübung mit Zeitdruck. Die Übung zeigt außerdem, ob man eher hinter oder vor den Punkt tippt.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunk `36265-…js`, formatiert gelesen; Auswertung in `docs/skilldrills-analyse.md`, Abschn. 4). Umrechnung in Grad: eigene Rechnung mit ≈ 36 px/° (iPad quer, 40 cm) bzw. ≈ 40 px/° (24″, 60 cm).

- **Ablauf (Code):** Start-Karte, Countdown 3-2-1-GO (Spielstart nach 2,45 s), Vollbild, dann 45 s. Ein Ziel (Farbe `#f97316`, Grund `#050508`) startet gleichverteilt zufällig auf der Fläche in zufälliger Richtung, bewegt sich geradlinig und wird an den Wänden gespiegelt. Ein Ring um das Ziel zeigt die Restzeit bis zum Ortssprung (rot ab 75 % verbraucht), darüber steht die Restzeit als Zahl (10-px-Schrift).
- **Zeit bis zum Sprung („Shift Pace"):** Start 1,00 s, laut Kurve bis 0,20 s, Untergrenze 0,12 s. Bei Ablauf springt das Ziel an einen neuen Zufallsort (Entfernung im Mittel gut die Hälfte der Bilddiagonale, also am Tablet grob 15–20°) und bekommt neue Richtung.
- **Kurve (Code):** Schwierigkeit p = (Level − 1)/14 mit Ease-Kurve. Radius 26 → 8 px, Tempo 120 → 750 px/s, Sprungzeit 1,0 → 0,2 s, Trefferzuschlag 32 → 12 px; Trefferzone = max(Radius + Zuschlag, 20 px) (Radius der Zone: Level 1 = 58 px, Level 10 ≈ 39 px, Level 15 ≈ 29 px, Level 20 ≈ 25 px). Combo verschärft alle vier Werte (Faktor k = (Multiplikator − 1)/2: Radius −25 %·k, Tempo +40 %·k, Zeit −30 %·k, Zuschlag −35 %·k).
- **Reizgröße und Tempo in Grad (eigene Rechnung, Tablet):** sichtbarer Durchmesser 1,4° (Level 1), 0,7° (Level 15), 0,44° (Minimum 16 px). Tempo ≈ 3°/s (Level 1), ≈ 12°/s (Level 10), ≈ 17°/s (Level 15), ≈ 19°/s (Level 20; ≈ 26°/s bei Combo ab 50). Auf dem Weg bis zum Sprung legt das Ziel nur ≈ 120–260 px (3–7°) zurück.
- **Treffer und Punkte (Code):** +150 × Combo-Multiplikator (ab 3 Treffern 1,1 … ab 50 Treffern 3,0) × (1 + 0,5·p), dazu **+2 s Restzeit** (Deckel 60 s); sofortiger Neustart des Ziels. Level = max(Level, Punkte/5.250 + 1). Note = 100·√(Punkte/16.000) (S+ ab 95 %).
- **Fehler (Code):** Fehlklick oder Ablauf der Frist = −1 s, Combo zurück auf 0, roter Blitz (abschaltbar), Fehlerton. Die Zeitüberschreitung zählt standardmäßig als Fehler (Einstellung standardmäßig an).
- **Eingabe (Code):** Zeiger-Ereignis auf der Zeichenfläche (Maus, Touch, Stift); der Treffer wird im Moment des Drückens gegen die aktuelle Position geprüft. Die Zeichenfläche berücksichtigt hochauflösende Displays nicht (auf Tablets etwas unscharf).
- **Bildrate (Code):** Bewegung wird **pro Bild** ohne Zeitschritt berechnet (`x += vx`). Das angegebene Tempo gilt nur bei 60 Hz; bei 120 Hz ist alles doppelt, bei 144 Hz 2,4-mal so schnell. Die Sprungzeit dagegen läuft in Echtzeit. Damit ändert sich auf schnellen Monitoren nur das Tempo, nicht die Frist.
- **Widersprüche Regeltext ↔ Code:** (1) Regeln „+0,6 s Zeitbonus" (Anleitung) vs. „+2 s je Treffer" (Regelkasten, Code). (2) „Zero Penalties (Default) – Zeitstrafe optional" (Seitentext im Ausgangs-HTML) vs. Code: Fehlklick kostet immer 1 s; nach dem Laden zeigt die Seite „−0,8 s", real sind es 1 s. (3) „Bouncing target spheres" / „Zielverfolgung": Ziel springt nach ≤ 1 s. (4) Tipp „Klick 5–15 px voraus" passt nicht zum eigenen Beispiel („500 px/s → über 100 px in 150–220 ms"). (5) Tabelle „Pacing-Zeitfenster < 0,25 s" bei „16.000+ Punkte" ist erst nach sehr vielen Treffern erreichbar (siehe Abschn. 3).
- **Sitzungslänge (eigene Simulation, grobe Annahmen):** Wegen +2 s je Treffer gegenüber −1 s je Fehler dauert eine Runde bei ≈ 60 % Genauigkeit oft mehrere Minuten (Größenordnung 3–4 min); „45 s" ist nur die Startzeit.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Behauptungen:** Hochgeschwindigkeits-Übung für Blickfolge und Interzeption; „Skills: Smooth Pursuit, Interzeptionsgenauigkeit, Auge-Hand-Koordination, Geschwindigkeitsvorhersage"; für FPS-Spieler, Sportler, Drohnenpiloten; „misst dynamische Sehschärfe"; „Verfolgungstraining optimiert kortikale Signalverarbeitung in MT/V5, verfeinert cerebelläre Kalibrierung". Fünf Leistungsbänder (Tier 1 „Apex, < 0,25 s, 16.000+ Punkte, Kampfjetpiloten" bis Tier 5).

**Einordnung:**
- *Belegt:* Blickfolge und Sakkaden sind getrennte, aber verknüpfte Steuerungen (Rashbass, 1961; Krauzlis, 2004); die Folgebewegung reagiert auf die Bildgeschwindigkeit, Sakkaden auf Positionsfehler (Rashbass, 1961). Bei Interzeption folgen gute Spieler dem Ziel mit den Augen (de la Malla et al., 2017) und springen bei erwartbaren Abprallpunkten voraus (Land & McLeod, 2000, Kricket).
- *Nicht belegt / überzogen:* (1) „Dynamische Sehschärfe" wird nicht gemessen; gemessen werden nur Treffer und Fehler. (2) „Trainiert MT/V5 und Kleinhirn" ist ohne Studie zu genau dieser Aufgabe (Abschn. 5). (3) „Pursuit bis 30°/s, dann Sakkaden" ist eine Vereinfachung: Die Obergrenze liegt individuell viel höher (Meyer et al., 1985: ≈ 90 % Gain bis 100°/s bei 4 von 5 Personen); die Nachführ-Sakkaden hängen von der vorhergesagten Position ab (de Brouwer et al., 2002). Bei Level 1–20 (3–19°/s am Tablet) bleibt die Blickfolge meist im normalen Bereich; die Schwierigkeit kommt aus Zeit, Größe und Sprung. (4) Die Tier-Tabelle hat keine Datengrundlage: Die Seite schreibt selbst, sie sammle keine Leistungsdaten; Rashbass, Krauzlis, Land & McLeod, Bahill und Woods enthalten keine Normen für dieses Spiel. Die Punktewerte sind zudem von Bildrate, Gerät und der Zeitgutschrift abhängig. (5) „Spitzen-Gamer und Kampfjetpiloten" – keine Quelle. (6) Bahill et al. (1980) behandelt unvorhersagbare Bewegung, nicht „30–40°/s"; Woods et al. (2015) behandelt nur die einfache Reaktionszeit, nicht Bildraten- oder Interzeptionseffekte. (7) Der Zusatz „Rashbass-Geschwindigkeitsanpassung" aus dem Tipp (Vorhalt 5–15 px) steht nicht bei Rashbass (1961; Step-Ramp-Experiment).
- Der Titel „Zielverfolgung" und der erste Satz beschreiben das Spiel falsch: Der Punkt wird nie länger als eine Sekunde verfolgt.

## 4. Optische und okulomotorische Grundlagen

- **Ablauf der Augenbewegung:** Zielsprung → Sakkade (Latenz ≈ 150 ms, Gap-Paradigma bis ≈ 100 ms „Express“; Fischer & Ramsperger, 1984) → Folgebewegung startet nach ≈ 100 ms (Carl & Gellman, 1987; Robinson et al., 1986: Gain knapp unter 1) → Korrektursakkaden, wenn der vorhergesagte Kreuzungszeitpunkt nicht passt (de Brouwer et al., 2002). Folgebewegung und Sakkaden sind getrennte, aber verknüpfte Steuerungen: Die Folgebewegung reagiert auf die Bildgeschwindigkeit, Sakkaden auf Positionsfehler (Rashbass, 1961; Krauzlis, 2004). Bei einer Lebensdauer von 1,6–3,0 s bleibt Zeit für Vorhersage und kurzes Folgen. Bei Interzeption folgen gute Spieler dem Ziel mit den Augen (de la Malla et al., 2017) und springen bei erwartbaren Abprallpunkten mit dem Blick voraus (Land & McLeod, 2000, Kricket). Die Kurven ab Stufe 6 machen die Bahn weniger vorhersagbar; Folgebewegungen auf unvorhersagbare Zielbewegungen sind ein eigenes Forschungsfeld (Bahill et al., 1980).
- **Reiz:** Ein hellblauer Punkt auf dunklem Grund hat hohen Kontrast; Farbunterscheidung wird nicht verlangt, die Farbe trägt keine Information (Farbsehschwäche ≈ 8 % der Männer). Der Punkt ist auf Stufe 1 etwa 17 mm, auf hohen Stufen etwa 10 mm groß (≈ 2,4° bzw. ≈ 1,4° am Tablet quer, 40 cm); es wird kein Detail erkannt (Vollscheibe), die Sehschärfe begrenzt die Leistung daher kaum.
- **Blickbereich:** Das Ziel erscheint zufällig im ganzen Feld, mindestens ein Viertel der Bildschirmdiagonale vom letzten Ort entfernt: Der Erstblick geht oft in die Peripherie (am Tablet bis ≈ 15–20° Exzentrizität); Kopfdrehung ist bei Monitoren und Tablets nicht nötig, wird aber bei Gleitsicht gern gemacht (Hutchings et al., 2007).
- **Bewegungsunschärfe und Bildrate:** 60 Hz = 16,7 ms je Bild; bei hohem Tempo wandert der Punkt mehrere Pixel je Bild, sichtbar als Ruckeln. Weil das Tempo in Echtzeit gerechnet wird, ist es auf 60- und 120-Hz-Geräten gleich; eher zählt die niedrige Gesamtlatenz (Spjut et al., 2019).
- **Alter und Optik:** Folgebewegung wird im Alter schwächer (Moschner & Baloh, 1994); Teile der schlechteren dynamischen Sehschärfe Älterer sind Beleuchtungseffekte (Long & Crambert, 1990). Presbyopie ab ≈ 40 Jahren (Charman, 2008): Bildschirm/Tablet-Abstand ohne passende Nah-/Arbeitsplatzbrille kann unscharf sein; bei Gleitsicht liegt die Zielfläche über das ganze Feld, seitliche Bereiche sind verzerrt.
- **Naharbeit:** Bildschirmarbeit senkt die Lidschlagrate (Patel et al., 1991); längere Folgen von Runden sind darum nicht ganz ohne Belastung für trockene Augen.

## 5. Neurowissenschaftliche Grundlagen

Bewegungsrichtung und -tempo werden in MT/MST verarbeitet und laufen zu frontalem Augenfeld, Parietalkortex, Pons, Kleinhirn (Flocculus/Vermis), Basalganglien und Colliculus superior (Thier & Ilg, 2005; Krauzlis, 2004). Krauzlis betont eine gemeinsame Kaskade für Blickfolge und Sakkaden, nicht zwei unabhängige Systeme. Für die Handbewegung kommen dorsaler Parietalkortex, prämotorischer Kortex und Kleinhirn dazu; die Vorhersage nutzt extraretinale Signale (Efferenzkopie) und laufende Nachsteuerung (Brenner & Smeets, 2018). Dass die Übung die Areale MT/V5 oder das Kleinhirn „trainiert“, ist eine Vermutung ohne Studie zu dieser Aufgabe.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Die Bewegungszeit steigt mit der Entfernung und sinkt mit der Zielbreite (Fitts, 1954); mit höherer Stufe werden Zone und Zeit kleiner. Tempo-Genauigkeits-Tausch: Wer schneller ist, streut mehr.
- **Interzeption:** Die visuomotorische Latenz beim Tippen/Wischen auf bewegte Ziele beträgt ≈ 114 ms (n = 22; Brenner et al., 2026), die Trefferpräzision ≈ 20 ms bzw. 5 mm Streuung (Brenner & Smeets, 2009). Bei schnelleren Zielen wird zwar weiter vorn getroffen, aber weniger weit als nötig, also relativ **hinter** dem Ziel (Brouwer et al., 2002); ein Vorhalt von wenigen Pixeln ist (eigene Abschätzung) erst bei ≥ 400 px/s spürbar, auf niedrigen Stufen also kaum relevant.
- **Zeiger und Touch:** Die Trefferzone ist mindestens 72 px (≈ 14 mm am Tablet) breit und damit größer als der sichtbare Punkt; sichere Fingerziele brauchen ≈ 9,2 mm (Parhi et al., 2006). Physiologischer Tremor ≈ 10 Hz (McAuley & Marsden, 2000) wirkt bei Zonen unter ≈ 8 mm.
- **Zeigen auf bewegte Ziele in der Praxis:** In der funktionellen Optometrie ist das Anpeilen oder Antippen bewegter Marken (etwa mit einem Stab auf eine rotierende Scheibe) eine klassische Übungsform zur Auge-Hand-Koordination; die Hand „führt“ dabei das Auge. Das ist Praxis- und Erfahrungswissen, eine Wirkung ist nicht belegt.
- **Abgrenzung zur Untersuchung:** Die Zielbewegung ähnelt dem Finger-Nase-Versuch, mit dem Ärzte die Kleinhirnfunktion klinisch prüfen (Muchnick, 2008, S. 30–31). Die Übung ist weder ein solcher Test noch ein Ersatz dafür.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Tempo und Fristen werden in Echtzeit gerechnet und sind deshalb bildratenunabhängig; die Eingabelatenz ist es nicht. Touch-Web-Apps messen Zeiten um 60–70 ms zu lang (Pronk et al., 2020); für Punktvergleiche unproblematisch, für „Reaktionszeit“ nicht.
- **Stufenlogik:** Drei gefangene Ziele machen es schwerer, ein verfehltes leichter (Zielquote ≈ 79 %). Die Punktzahl mischt Geschick, erreichte Stufe und Glück (der Zufallsort bestimmt die Sprungdistanz).
- **Feste Dauer:** Die Runde ist auf 45 s begrenzt, die Punkte hängen daher nur von Zahl und Stufe der Fänge ab, nicht von der Rundenlänge. Vergleiche zwischen Personen bleiben schwierig.
- **Vor oder hinter dem Ziel:** Die Rückmeldung wertet nur Tipps bis drei Trefferradien Abstand aus und erst ab acht Werten. Einzelne Tipps streuen stark; Messungen am Menschen streuen stärker als an Prüfkörpern, darum zählen mehrere Runden (Mountford et al., 2004, S. 43–44).
- **Ermüdung/Alter:** Reaktionszeit steigt mit dem Alter (Woods et al., 2015: ≈ 0,55 ms/Jahr); Müdigkeit und Anspannung erhöhen die Fehlerrate.
- **Übungseffekt:** Klare Lerneffekte innerhalb weniger Runden (Ort, Größe, Timing gewöhnen); unbekannt, welcher Teil Gewöhnung an Gerät und Aufgabe ist.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel):** Motorisches Lernen (Geschwindigkeit, Vorhalt) ist gut belegt; für diese Übung gibt es keine Studie. Dass zeitgenaues Treffen mit Übung besser wird, ist plausibel, für diese Aufgabe aber nicht direkt belegt (Brenner & Smeets, 2018, beschreiben nur die laufende Nachsteuerung, keine Lernkurve).
- **Naher Transfer (schwach):** Große Effekte im digitalen Sehtraining zeigen sich fast nur, wenn Trainings- und Testaufgabe ähnlich sind (Guo et al., 2025: SMD 1,65 vs. 0,07 für Aufmerksamkeit; 33 RCTs, n = 1.048).
- **Alltagstransfer (fehlend):** Überblicke sehen die stärksten Hinweise bei naturnahem, sportartspezifischem Training, nicht bei Bildschirmspielen (Lochhead et al., 2024; Laby & Appelbaum, 2021; Simons et al., 2016). Aussagen zu Straßenverkehr oder Sport sind nicht belegt.

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand Auge und Hand bei schnell wechselnden Zielen üben möchte, gern spielerisch und mit Zeitdruck; wenn Maus oder Touch verfügbar sind; wenn die Blickfolge nicht im Vordergrund steht (dafür 105, 402–404). Profil: Auge-Hand-Koordination 3, Zielbewegung_Tempo 3, Sakkaden 2, Blickfolge nur 1.
- **Weniger passend, wenn** kein Zeitdruck erwünscht ist, glatte Blickfolge (Kern von 105) gewünscht ist, oder das Gerät klein ist und Zittern oder Handbeschwerden bestehen.
- **Vorsicht / anpassen bei:** Handzittern/Parkinson und Hand-Arm-Beschwerden (kleine Ziele, schnelles Tippen); niedrigem Visus; Gleitsicht/Alterssichtigkeit (Abstand, Brille für Bildschirmabstand, Kopf statt Augen); trockenem Auge und Kopfschmerz bei Bildschirmarbeit (Pausen); Aufmerksamkeitsproblemen (Zeitdruck kann frustrieren). Die Rückmeldung bleibt am Ziel (kurze Markierung, kein Vollbildblitz); wegen schneller Bewegungen und Lichtwechsel steht `photosensitive_epilepsie` dennoch als Vorsichtshinweis.
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit:** 105 (glatte Blickfolge), 508/509 (Zielen), 702 (Mauspräzision), 305 (Zielverfolgung), 107 (Timing bei Annäherung, ohne Zielen).
Keine Diagnose, keine Heilversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Schwächen:** Bildratenabhängiges Tempo; Rundenlänge und Punkte hängen an der Zeitgutschrift; Regeltext und Code widersprechen sich (Bonus, Strafe, „Bouncing"); Zielgröße bis 16 px und Trefferzone bis 20 px sind auf Touch zu klein (< 9,2 mm; Parhi et al., 2006); Ziel als Punktscheibe ohne Hilfsmarke; Zeichenfläche nicht auflösungsskaliert; keine Aufschlüsselung (vor/hinter Ziel, Sprungentfernung, Reaktionszeit); Tier-Tabelle ohne Daten; englische Bedienoberfläche neben deutschem Text. Farbsehschwäche unkritisch (Orange auf Schwarz, Farbe nicht informativ).

**Blickfit-Umsetzung „Zielfang" (Code `src/exercises/zielfang/index.ts`, `texts.ts`):**
- **Zeitbasiert:** Tempo in Einheiten u = min(Breite, Höhe)/100 pro Sekunde mit Zeitschritt: 14 u/s (Level 1) × 1,12^(Level−1) bis ≈ 151 u/s (Level 22); am iPad (u ≈ 8,2 px) ≈ 3°/s bis ≈ 34°/s (eigene Rechnung). Je Ziel ±15 % Tempozufall, Tempo passt sich weich an (Zeitkonstante 0,35 s).
- **Lebensdauer 3,0 s → 1,6 s** (Level 22) statt 1,0 → 0,2 s; danach „Entwischt". Der Punkt springt nicht selbst, sondern läuft weiter; Pause zwischen zwei Zielen 0,25 s, neuer Ort mind. 25 % der Bühnendiagonale vom letzten. Weniger Sakkaden-Sprints, mehr Vorhersage und Blickfolge.
- **Kurven:** ab Level 6 alle 0,8–1,6 s weiche Kurve von ±20–50° (300 ms), sonst geradlinig mit Abprallen; verhindert, dass man sich auf eine feste Bahn einstellt.
- **Größe:** sichtbarer Radius max(26 px, 5,5 u·(1 − 0,02·(Level − 1))) ≈ 45 → 26 px am iPad (≈ 17 → 10 mm Durchmesser); Trefferradius max(Radius + 10, 32 px), also größer als das Ziel (fingerfreundlich).
- **Adaptiv:** Treppe 3-richtig-runter / 1-Fehler-rauf (Ziel ≈ 79 % Treffer; „85 %-Regel", Wilson et al., 2019), Level 1–22; Startstufe aus früheren Sitzungen. Punkte 10 + 2·(Level − 1) je Fang.
- **Feste 45 s ohne Zeitbonus/-strafe;** Fehlantippen und Entwischen zählen für die Treppe, kosten keine Zeit.
- **Rückmeldung vor/hinter dem Ziel:** Bei Tipps bis 3 Trefferradien Abstand wird die Lage entlang der Bewegungsrichtung gemessen (ab 8 Werten; Schwelle 0,3 Radien) und daraus der persönliche Tipp abgeleitet („du tippst oft hinter den Punkt"). Basis: Brouwer et al. (2002).
- **Texte** (DE/IT) sagen ausdrücklich, dass die Übertragung auf Sport/Alltag nicht belegt ist; Intro-Film zeigt Fangen, „knapp dahinter" und Vorhalt.
- **Offen:** Eine Version ohne Fehlerhinweise und ohne Stufenabstieg, Tempo-Kappung bei 60 Hz-Geräten und Pausenhinweis für trockene Augen könnten ergänzt werden.

## 11. Quellen
### Von der Website angegeben
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titel auf der Website leicht falsch („smooth pursuit"); **stützt die Aussage:** teilweise (Folgebewegung reagiert auf Geschwindigkeit, Sakkaden auf Position – ja; „150–220 ms → 5–15 px vorhalten" steht nicht dort); nur Metadaten.
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (Netzwerk MT/MST, FEF, Kleinhirn, Basalganglien, Colliculus superior – ja; Krauzlis nimmt eine gemeinsame Kaskade an, nicht „unabhängige Systeme"; „30°/s" nicht im Abstract).
- Land, M. F., & McLeod, P. (2000). From eye movements to actions: how batsmen hit the ball. *Nature Neuroscience, 3*(12), 1340–1345. https://doi.org/10.1038/81887 – **Prüfung:** Website-DOI 10.1038/81861 **falsch** (nicht registriert), korrekt ist 10.1038/81887 ✓; **stützt:** teilweise (Kricket: vorausschauende Sakkade zum Aufsprungpunkt – ja; „genau diese Fähigkeit schult der Drill" nicht belegt).
- Bahill, A. T., Iandolo, M. J., & Troost, B. T. (1980). Smooth pursuit eye movements in response to unpredictable target waveforms. *Vision Research, 20*(11), 923–931. https://doi.org/10.1016/0042-6989(80)90073-5 – **Prüfung:** DOI stimmt ✓ (nur Metadaten); **stützt:** unklar (Thema Unvorhersagbarkeit; die „30–40°/s"-Grenze ist dort nicht belegt).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (einfache Reaktionszeit und Hardware-Latenzen ja; Bildrate 60/144/240 Hz und Bahnvorhersage nicht Thema der Studie).

### Weitere Fachliteratur
Alle DOIs am 29.09.2026 über Crossref geprüft (Titel, Erstautor:in, Jahr, Zeitschrift, Band, Seiten stimmen).
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3 – Latenz ≈ 114 ms beim Abfangen.
- Brenner, E., & Smeets, J. B. J. (2009). Sources of variability in interceptive movements. *Experimental Brain Research, 195*(1), 117–133. https://doi.org/10.1007/s00221-009-1757-x – Präzision ≈ 20 ms / 5 mm.
- Brenner, E., & Smeets, J. B. J. (2018). Continuously updating one's predictions underlies successful interception. *Journal of Neurophysiology, 120*(6), 3257–3274. https://doi.org/10.1152/jn.00517.2018 – laufende Nachsteuerung, Vorhersage.
- Brouwer, A.-M., Brenner, E., & Smeets, J. B. J. (2002). Hitting moving objects: Is target speed used in guiding the hand? *Experimental Brain Research, 143*(2), 198–211. https://doi.org/10.1007/s00221-001-0980-x – Treffen hinter dem schnellen Ziel.
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – Blickfolge vermeidet Interzeptionsfehler.
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms.
- Robinson, D. A., Gordon, J. L., & Gordon, S. E. (1986). A model of the smooth pursuit eye movement system. *Biological Cybernetics, 55*(1), 43–57. https://doi.org/10.1007/BF00363977 – Modell der Folgebewegung.
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Grenze individuell weit über 30°/s.
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden.
- Thier, P., & Ilg, U. J. (2005). The neural basis of smooth-pursuit eye movements. *Current Opinion in Neurobiology, 15*(6), 645–652. https://doi.org/10.1016/j.conb.2005.10.013 – beteiligte Hirnstrukturen.
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of MobileHCI '06* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Touch-Zielgröße ≥ 9,2 mm.
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research, 57*(1), 191–195. https://doi.org/10.1007/BF00231145 – Sakkadenlatenz, Express-Sakkaden.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Tempo-Genauigkeits-Gesetz.
- McAuley, J. H., & Marsden, C. D. (2000). Physiological and pathological tremors and rhythmic central motor control. *Brain, 123*(8), 1545–1567. https://doi.org/10.1093/brain/123.8.1545 – Tremor.
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter und Folgebewegung.
- Long, G. M., & Crambert, R. F. (1990). The nature and basis of age-related changes in dynamic visual acuity. *Psychology and Aging, 5*(1), 138–143. https://doi.org/10.1037/0882-7974.5.1.138 – Alter und dynamische Sehschärfe.
- Spjut, J., Boudaoud, B., Kim, J., Greer, T., Albert, R., Stengel, M., Akşit, K., & Luebke, D. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildrate.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Zeitmessung im Browser.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Gehirntraining-Evidenz.
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2024). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355. https://doi.org/10.1080/1750984X.2024.2437385 – Sport-Sehtraining.
- Laby, D. M., & Appelbaum, L. G. (2021). Review: Vision and on-field performance: A critical review of visual assessment and training studies with athletes. *Optometry and Vision Science, 98*(7), 723–731. https://doi.org/10.1097/OPX.0000000000001729 – kritische Übersicht.
- Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). The Eighty Five Percent Rule for optimal learning. *Nature Communications, 10*, 4646. https://doi.org/10.1038/s41467-019-12552-4 – Zielquote der adaptiven Stufung in Blickfit.
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Presbyopie ab ≈ 40 Jahren.
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht und Kopfbewegung.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
