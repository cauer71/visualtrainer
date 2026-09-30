---
# ===== Kennung =====
nr: 402
kennung: infinity-pursuit
name: "Liegende Acht (Blickfolge auf einer Achterbahn)"
name_original: "Liegende Acht: Augentraining – Blickverfolgung und Mittellinienübergang (Infinity Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit"
blickfit_umsetzung: {kennung: "liegende-acht", name: "Liegende Acht", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/liegende-acht/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ein leuchtender Punkt läuft im Vollbild gleichmäßig auf einer liegenden Acht (∞) über den Bildschirm. Man folgt ihm nur mit den Augen, möglichst ohne Blicksprünge und ohne den Kopf zu drehen – auch durch den Kreuzungspunkt in der Mitte."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (Regler in 0,1-Schritten; 1× = eine Runde in 7,9 s), Zielradius 10–50 px (Standard 16 px = Radius), 'Hide Line' blendet die Bahnlinie aus (weniger Vorhersagehilfe), 'Random Speed' lässt das Tempo zeitabhängig zwischen 0,4- und 1,9-fach schwanken. Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: Folge-Gain, Zahl der Aufholsakkaden je Runde, Blickfehler am Kreuzungspunkt und an den Wendepunkten", "Ersatz ohne Eyetracker: Zeigerabstand zum Ziel beim Mitführen mit Finger/Maus (Grad, Anteil Zeit im Ziel)", "Ersatz ohne Eyetracker: Erkennungsaufgabe im bewegten Ziel (z. B. kurz eingeblendetes Zeichen)"]

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
    sakkaden: 1
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
voraussetzungen: ["Bildschirm oder Tablet auf fester Unterlage, Abstand 40–70 cm, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über die ganze Bildbreite (Arbeitsplatzbrille oder Einstärkenglas günstiger als Gleitsicht)", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe nötig", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert zu folgen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, lese_rechtschreib_schwaeche, kinder_unter_6]
geeignet_fuer: ["glatte Blickfolge an einer gleichmäßigen, vorhersagbaren Kurve üben (vor allem waagrecht, mit leichter senkrechter Komponente)", "ruhiger Einstieg in Blickfolge-Übungen bei 0,5–2× (≈ 5–20°/s am Monitor)", "Wahrnehmen eigener Blicksprünge an Wendepunkten und Kreuzung (Selbstbeobachtung)", "kurze Augenübung ohne Hand- oder Körpereinsatz, ohne Flackerreize"]
weniger_geeignet_fuer: ["alle, die Rückmeldung oder einen Leistungswert erwarten (das Original misst nichts)", "Gleitsichtträger:innen am großen Monitor (Bahn ≈ 35° breit, weit über den scharfen Zwischenbereich hinaus)", "Ziel 'Lesen verbessern' oder Unterstützung bei Legasthenie (nicht belegt, s. Abschnitt 3)", "Ziel Reaktion, Hand-Zielgenauigkeit oder Peripherie (nicht gefordert)", "Tempo ab ≈ 5× für Ungeübte und Ältere (Übergang in überwiegend sakkadisches Verfolgen)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Vorhersagbare Zielbahnen werden im Labor innerhalb von Minuten besser verfolgt (McHugh & Bahill, 1985), kurzes Pursuit-Training wirkte einige Tage nach (Eibenberger et al., 2012) – beides mit Eyetracker und nicht mit dieser Übung; ein Nutzen für Lesen oder Lernstörungen ist ausdrücklich nicht belegt (Handler & Fierson, 2011), ein Alltagstransfer wurde nie untersucht."
aehnliche_uebungen: [403, 404, 405, 406, 407, 105, 514, 409, 413, 707, 104]
stichworte: ["liegende Acht", "Lemniskate", "Figure-8", "Lazy 8", "smooth pursuit", "glatte Blickfolge", "prädiktive Blickfolge", "Aufholsakkaden", "Mittellinie", "2D-Blickfolge", "Zwei-Drittel-Gesetz"]
---

# 402 · Liegende Acht (Blickfolge auf einer Achterbahn)

> Original: „Liegende Acht: Augentraining – Blickverfolgung und Mittellinienübergang“ („Infinity Pursuit“) –
> skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf fast schwarzem Grund (wahlweise weiß) läuft ein roter Leuchtpunkt mit weißem Kern gleichmäßig auf einer
liegenden Acht; eine schwache blaue Linie zeigt die Bahn. Man folgt ihm nur mit den Augen, hält den Kopf ruhig und
gleitet möglichst ohne Blicksprünge durch Wendepunkte und Kreuzung. Keine Handaufgabe, keine Punkte, keine Rückmeldung.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `37832-…js`, Hilfsmodule `90762-…js`, `71254-…js`, Stand 29.09.2026); nur
Mechanik ausgewertet. Grad-Angaben sind eigene Umrechnungen.

- **Ablauf (Code):** Einstellungen → Vollbild → Countdown (≈ 2,5 s) → 30/45/60/90/120 s → Endbildschirm (Dauer,
  Tempo, Sitzungszähler). Abbruch mit Escape oder Verlassen des Vollbilds. Maus/Touch nur zum Starten.
- **Bahn (Code):** Bernoullische Lemniskate um die Bildmitte, Breite **70 % der Bildbreite**, Höhe ≈ **25 % der
  Bildhöhe**; die Achsen werden getrennt skaliert, die Form hängt vom Seitenverhältnis ab (16:9 quer ≈ 5 : 1 flach,
  Tablet hochkant ≈ 2 : 1). Die senkrechte Komponente schwingt doppelt so schnell wie die waagrechte.
- **Tempo (Code):** zeitbasiert (dt, begrenzt auf 100 ms). 1× = eine Runde in **7,9 s** (waagrecht 0,13 Hz,
  senkrecht 0,25 Hz), 9× = 0,87 s. Tempo entlang der Bahn **nicht konstant**: am langsamsten an den äußeren
  Wendepunkten und am Kreuzungspunkt, am schnellsten in den Flanken der Schleifen (≈ ±20 %).

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| 24″-Full-HD, 60 cm (Bahn 35° × 7°): mittel / Spitze °/s | 5 / 6 | 10 / 12 | 20 / 24 | 30 / 36 | 50 / 60 | 69 / 84 | 89 / 108 |
| 11″-Tablet quer, 40 cm (Bahn 23° × 6°): mittel / Spitze °/s | 3,5 / 4 | 7 / 8 | 14 / 17 | 21 / 25 | 35 / 42 | 49 / 58 | 63 / 75 |

- **Reiz (Code):** „Size 16 px“ ist der **Radius** (Ring Ø 32 px, Außenring Ø 42 px), einstellbar 10–50 px;
  Leuchtsaum standardmäßig an. Sechs Zielfarben ohne Informationsgehalt. Hintergrundraster 40 px (2 % Deckkraft),
  Bahnlinie 3 px (22 % Deckkraft). Optional Spur (14 Positionen), „Scanlines“, „Day Mode“. Keine Blitze.
- **„Random Speed“ (Code):** keine Zufallszahl, sondern eine feste Summe langsamer Sinusschwingungen (0,13–0,5 Hz),
  Tempofaktor ≈ 0,4–1,9.
- **Bildrate (Code):** Bilder < 13 ms nach dem vorigen werden verworfen → ≤ 77 Bilder/s (120 Hz → 60, 144 Hz → 72).
  Bei 9× springt das Ziel am Monitor (60 Bilder/s) bis ≈ 1,8° pro Bild – mehr als zwei Zieldurchmesser, die Bewegung ruckt.
- **Zeiger (Code):** Maus-/Fingerposition erscheint als Fadenkreuz, wird aber **nicht ausgewertet**.

**Widersprüche Regeltext ↔ Code:** (1) „Prüfe nach Abschluss deinen Tracking-Gain“ und die Tabelle „Zielverfolgung /
Verluste an der Mitte / Bahngenauigkeit“ – nichts davon wird gemessen; der Endbildschirm heißt dennoch „Smooth Pursuit
Calibrated“. (2) „Vor dem Zentrum kann die Kurve schneller wirken“ – am Kreuzungspunkt ist das Ziel fast am
langsamsten. (3) „Erratic acceleration“ ist eine glatte, wiederkehrende Schwingung. (4) Die empfohlene Bahnbreite
„30–40°“ entsteht nur am großen Monitor.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Acht „effektiver als Kreise oder Linien“; sie fordere „zerebelläre Vorsteuerung und
interhemisphärische Koordination“ beim „Überschreiten der Mittellinie“, beanspruche alle sechs Augenmuskeln, die schrägen „bis an
ihre anatomische Dehngrenze“ (FAQ: „physiologische Enddehnung“) und verbessere die Leseflüssigkeit („Ja“). Kopf ruhig halten „entkopple den VOR“.
Empfohlen: 2–3 × 60–90 s täglich, danach 20 s in die Ferne blicken. Zielgruppen: E-Sport, Rückschlagsport,
Bildschirmarbeit, „Sehachsenblockaden abbauen“. Stufentabelle von „Elite 0,96–1,02“ bis „Förderbedarf < 0,68“.
Positiv: mehrfach „kein Test, keine Diagnose“, für Sport und Spiele ausdrücklich kein Transferversprechen (für Lesen aber doch), Pause bei Doppelbildern oder Schwindel.

- **Stufentabelle ohne Datengrundlage:** Die Seite misst keine Augen und sammelt keine Daten; keine zitierte Quelle
  enthält solche Stufen. Im Labor liegt der glatte Gain Gesunder **unter 0,95** (Collewijn & Tamminga, 1984) –
  „Elite 0,96–1,02“ ist unrealistisch, „Grundlagentraining für Binokularsehen ratsam“ ist diagnoseähnlich.
- **„Effektiver als Kreis oder Linie“:** kein Vergleichsbeleg. 2D-Bahnen werden gut vorhergesagt (Soechting et al.,
  2010); eine zweite, schnellere Schwingung auf der anderen Achse senkt den Gain etwas (Affen; Kettner et al., 1996)
  – die Acht ist eher schwerer als ein Kreis, was nicht „wirksamer“ bedeutet.
- **„Mittellinie“/„interhemisphärisch“:** Bei guter Folge bleibt das Ziel auf der Fovea und wechselt gar nicht die
  Gesichtsfeldhälfte; über die Mitte laufen nur Blickrichtung und Drehsinn. Die Übertragung zwischen den Hirnhälften
  kostet Gesunde nur ≈ 4–6 ms (Schulte & Müller-Oehring, 2010). Das Argument entspricht Brain Gym® („Lazy 8s“),
  dessen Behauptungen nicht gestützt sind (Hyatt, 2007).
- **Lesen:** beruht auf Sakkaden und Fixationen (Rayner, 1998). Blickfolge-Übungen sind laut Konsenspapier der
  US-Kinder- und Augenärzte **keine** wirksame Behandlung von Lernstörungen/Legasthenie (Handler & Fierson, 2011).
- **Augenmuskeln:** Zusammenwirken aller sechs Muskeln bei schrägen Blickrichtungen ist Lehrbuchwissen (Leigh & Zee,
  2015); „Dehngrenze“ ist falsch – ±17° Auslenkung liegt weit im normalen Bewegungsbereich (Lehrbuchwissen).
- **VOR:** Bei ruhigem Kopf ist der vestibulookuläre Reflex nicht gefordert; Kopf ruhig halten isoliert die
  Augenfolge, „entkoppelt“ aber nichts. **20-20-20:** Pausen senkten Beschwerden kurzfristig, änderten Binokular- (außer
  Akkommodationsflexibilität) und Tränenfilmwerte nicht (Talens-Estarelles et al., 2023). „Sehachsenblockade“ ist kein Fachbegriff.
- **Quellen:** 5 Angaben, eine mit falscher DOI; keine stützt Stufen oder Lemniskaten-Vorzüge (Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziel Ø 32 px ≈ 0,84° (24″-Full-HD, 60 cm) bzw. ≈ 0,9° (11″-Tablet, 40 cm); Visus kaum gefordert.
  Ein kleines, in die Fovea passendes Ziel erzeugt mehr Aufholsakkaden als ein größeres (Heinen et al., 2016).
- **Glatte Folge:** Latenz ≈ 100 ms bei unvorhersehbarer Bewegung (Carl & Gellman, 1987), Gain < 0,95, Aufholsakkaden
  normal (Collewijn & Tamminga, 1984); periodische Bahnen werden nahezu ohne Verzögerung vorhergesagt (Soechting et
  al., 2010; Barnes, 2008). bei Rampenbewegung ≈ 90 % Gain bis 100°/s bei 4 von 5 Versuchspersonen, eine erreichte nur ≈ 60 % davon (Meyer et al., 1985); bei
  waagrechten Mehrfrequenz-Reizen fiel der Gain der langsamen Anteile auf 0,53, sobald die höchste Komponente 1,56 Hz erreichte (Barnes et al., 1987).
  Ab ≈ 5× ist zunehmend, bei 9× überwiegend sakkadisches Folgen zu erwarten (eigene Einschätzung).
- **Richtung:** horizontal besser als vertikal (Rottach et al., 1996). Am 16:9-Monitor ist die Acht sehr flach
  (senkrecht ±3,5°) – überwiegend waagrechte Blickfolge; am Tablet hochkant runder.
- **Kurven:** Das Auge folgt beim Verfolgen von Ellipsen dem Zwei-Drittel-Gesetz (langsam in starker Krümmung;
  de'Sperati & Viviani, 1997). Der Kreuzungspunkt ist ein Wendepunkt ohne Krümmung; dort ließe das Gesetz hohes Tempo
  erwarten, im Code ist es niedrig. Ob das stört, ist nicht untersucht (eigene Ableitung).
- **Hintergrund:** Rot auf Fast-Schwarz ist kontrastreich; strukturierte Hintergründe senken den Gain (Collewijn &
  Tamminga, 1984) (horizontal ≈ 10 %, durch Sakkaden ausgeglichen) – „Scanlines“ und Spur sind eher Störreize (eigene Einschätzung). **Alter:** Bei 75–93-Jährigen ist der Gain bei allen
  Tempi niedriger, besonders bei hohem Tempo (Moschner & Baloh, 1994) → 0,5–1× wählen.
- **Gleitsicht/Arbeitsplatz:** Der scharfe Zwischenbereich ist bei 60 cm nur ≈ 13–18° breit; beim Lesen am Bildschirm
  dauerten mit Gleitsicht Kopfbewegungen länger und der Blick stabilisierte sich später (11 Presbyope; Han et al., 2003). Die 35° breite Bahn läuft in die seitlichen Unschärfezonen – „Kopf
  absolut ruhig“ passt für sie nicht. Besser: Arbeitsplatzbrille, kleineres Gerät oder mehr Abstand, Kopf mitbewegen.
- **Nähe, Auge, Farbe:** In 40 cm (Tablet) ≈ 2,5 dpt Akkommodation bzw. Nahkorrektur nötig. Am Bildschirm sinkt die
  Lidschlagrate (beim Lesen am Bildschirm ≈ 11,6/min, davon im Mittel 16 % unvollständig; Portello et al., 2013) – bei trockenem Auge kurz üben.
  Farbe spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen

- Bewegungssignale aus MT/V5 und MST werden über das Folgeareal des frontalen Augenfelds (FEF), das supplementäre
  Augenfeld, Brückenkerne und Kleinhirn in Augenbewegung umgesetzt (Lencer & Trillenberg, 2008); Basalganglien und
  Colliculus superior sind beteiligt, Folge und Sakkaden teilen eine Architektur (Krauzlis, 2004).
- Bei periodischen Bahnen werden Geschwindigkeit und Zeitpunkt gespeichert und vorausschauend abgerufen
  (extraretinale Signale; Barnes, 2008). Affen verfolgten 2D-Summen aus Sinusschwingungen mit Gain ≈ 0,83 und ≈ 6°
  Phasenfehler – nur durch Vorhersage erklärbar (Kettner et al., 1996). Dass die Acht Kleinhirn oder
  Hirnhälften-Zusammenarbeit **stärker trainiert** als andere Bahnen, ist nicht belegt.

## 6. Motorische Grundlagen

Keine Handbewegung gefordert – alle motorischen Merkmale 0; die „Motorik“ ist die Augenbewegung (glatte Folge +
Aufholsakkaden). Wer mit Maus oder Finger mitfährt, übt eine andere Aufgabe: Mitführen der Hand glättet die Augenfolge
bei vorhersagbaren Zielen (Koken & Erkelens, 1992) – das Fadenkreuz wird aber nicht ausgewertet.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Messung:** Ohne Eyetracker bleibt offen, ob glatt gefolgt wurde; eigene Blicksprünge bemerkt man oft nicht.
- **Gerät:** Größe, Seitenverhältnis und Abstand ändern Bahnform und °/s stark (Tabelle Abschnitt 2) – „1×“ ist kein
  fester Reiz; ≤ 77 Bilder/s, bei hohem Tempo ruckendes Bild.
- **Person:** Alter, Müdigkeit, Konzentration; Vorhersage verbessert das Folgen schon innerhalb von Minuten (McHugh &
  Bahill, 1985) – die ersten Runden sind schwerer. Gleitsicht begünstigt zusätzliche Kopfbewegungen (Han et al., 2003).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Vorhersagbare Wellenformen wurden nach 100–200 s deutlich genauer verfolgt (Fehler 0,5 →
  0,1 deg²; McHugh & Bahill, 1985); 2 × 6 min Training an 3 Tagen wirkte 5 Tage nach (N = 10 + 10; Eibenberger et
  al., 2012). Laborbefunde mit Eyetracker, nicht mit dieser Übung.
- **Naher Transfer – schwach:** kaum Daten, ob eine feste Bahn andere Bahnen oder Tempi verbessert.
- **Alltagstransfer – fehlend:** kein Beleg für Lesen, Sport oder E-Sport; für Lernstörungen ausdrücklich verneint
  (Handler & Fierson, 2011).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** ruhige, vorhersagbare Blickfolge ohne Hand- und Reaktionsdruck geübt werden soll; als Einstieg
  bei 0,5–2× mit großem Zielradius; als kurze Augenübung ohne Blitzreize.
- **Weniger passend, wenn …** Rückmeldung gewünscht ist; Reaktion, Peripherie oder Handgenauigkeit das Ziel sind;
  „besser lesen“ erwartet wird.
- **Vorsicht / anpassen bei …** `presbyopie_gleitsicht` (breite Bahn durch Unschärfezonen → Kopf mitbewegen,
  Arbeitsplatzbrille, kleineres Feld); `schwindel_vestibulaer`, `reisekrankheit` (bewegte Reize, bei hohem Tempo Unwohlsein möglich; langsam beginnen, bei Übelkeit
  abbrechen); `nystagmus`, `schielen_binokular` (Folge oft verändert, Doppelbilder möglich – keine Rückschlüsse);
  `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (seltener Lidschlag → kurz, Pausen); `lese_rechtschreib_schwaeche`
  (nicht als Lesehilfe vorschlagen); `kinder_unter_6` (Folgebewegung reift bis ins Jugendalter, keine Rückmeldung).
- **Kombiniert gut mit …** 404 (langsame 2D-Folge), 403 (Sinus), 405/406 (Richtungswechsel), 409 (Folgen während
  echter Dunkelphasen), 407 (Blicksprung auf ein abbremsendes Ziel – keine Verdeckung), 105 (Details am bewegten Ziel),
  707 (Pfad mit der Maus nachfahren).
- **Fast gleich (Dubletten in der Gruppe):** 403 und 404 haben denselben Aufbau – ein Leuchtpunkt, gleiche Einstellungen,
  nur Augenfolge, keine Eingabe, keine Messung; es unterscheidet sich nur die Bahn: 402 flache, überwiegend waagrechte
  Acht (am Monitor ≈ 35° × 7°), 403 waagrechter Lauf mit senkrechter Welle und hartem Knick am Rand, 404 große
  2D-Lissajous-Figur mit dem größten senkrechten Anteil. Für eine Auswahl genügt meist eine davon; Abwechslung nur über
  die Bahnform.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Überprüfbare Aufgabe statt Scheinmessung:** kurz im Ziel eingeblendetes Zeichen (Landolt-C wie „Scharf in
  Bewegung“, 105) oder optionales Mitführen mit dem Finger mit Abstandswertung; keine „Gain“-Stufen ohne Messung.
- **Reiz in Grad:** Bahnbreite und Tempo (°/s) aus Bildschirmgröße und Abstand, echte Lemniskatenform unabhängig vom
  Seitenverhältnis; Bahnbreite für Gleitsicht wählbar (z. B. ≤ 15–20°).
- **Tempo und Stufen:** Standard 5–15°/s, höchstens ≈ 40°/s, adaptiv steigern; Bahnlinie sichtbar → ausgeblendet,
  gleichmäßiges → schwankendes Tempo; Bildraten-Drosselung entfernen. **Tablet:** Querformat mit Ständer, Radius ≥ 20 px.
- **Texte:** keine Aussagen zu Lesen, Muskel-„Dehnung“ oder Hemisphären; Pausen-, Blinzel- und Gleitsichthinweis.

## 11. Quellen

### Von der Website angegeben
- Robinson, D. A. (1965). The mechanics of human smooth pursuit eye movement. *The Journal of Physiology, 180*(3), 569–591. https://doi.org/10.1113/jphysiol.1965.sp007718 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Grundlagen der Folgemechanik; keine Stufen, keine Lemniskate)
- Leigh, R. J., & Zee, D. S. (2015). *The neurology of eye movements* (5th ed.). Oxford University Press. https://doi.org/10.1093/med/9780199969289.001.0001 – **Prüfung:** DOI falsch (Website …9780199969203…, bei Crossref und doi.org nicht auflösbar; richtig: …9780199969289…), Buch nur bibliografisch geprüft; **stützt:** teilweise (sechs Muskeln ja; „Dehngrenze“, Trainingsnutzen nein)
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Vorhersage allgemein; kein Vergleich Acht vs. Kreis, nichts zu „ungleich intensiver“)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (Netzwerk ja; „interhemisphärische Koordination“ nein)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (Reaktionszeitstudie, kein Bezug zur Blickfolge)

### Weitere Fachliteratur
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain-Einbruch bei hohen Frequenzanteilen
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, Hintergrund
- de'Sperati, C., & Viviani, P. (1997). The relationship between curvature and velocity in two-dimensional smooth pursuit eye movements. *The Journal of Neuroscience, 17*(10), 3932–3945. https://doi.org/10.1523/JNEUROSCI.17-10-03932.1997 – Zwei-Drittel-Gesetz
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Handler, S. M., Fierson, W. M., et al. (2011). Learning disabilities, dyslexia, and vision. *Pediatrics, 127*(3), e818–e856. https://doi.org/10.1542/peds.2010-3670 – Blickfolge-Übungen bei Lernstörungen unwirksam
- Heinen, S. J., Potapchuk, E., & Watamaniuk, S. N. J. (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. *Journal of Neurophysiology, 115*(3), 1220–1227. https://doi.org/10.1152/jn.00774.2015 – Zielgröße
- Hyatt, K. J. (2007). Brain Gym®: Building stronger brains or wishful thinking? *Remedial and Special Education, 28*(2), 117–124. https://doi.org/10.1177/07419325070280020201 – „Lazy 8s“ ohne Beleg (Inhalt über Kurzfassung geprüft)
- Kettner, R. E., Leung, H. C., & Peterson, B. W. (1996). Predictive smooth pursuit of complex two-dimensional trajectories in monkey: Component interactions. *Experimental Brain Research, 108*(2), 221–235. https://doi.org/10.1007/BF00228096 – 2D-Vorhersage (Affen)
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – Hand unterstützt Augenfolge
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – Netzwerk beim Menschen
- McHugh, D. E., & Bahill, A. T. (1985). Learning to track predictable target waveforms without a time delay. *Investigative Ophthalmology & Visual Science, 26*(7), 932–937. https://pubmed.ncbi.nlm.nih.gov/4008209/ – keine DOI (PubMed geprüft); schnelles Lernen
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Höchstgeschwindigkeit
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Lesen
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal > vertikal
- Schulte, T., & Müller-Oehring, E. M. (2010). Contribution of callosal connections to the interhemispheric integration of visuomotor and cognitive processes. *Neuropsychology Review, 20*(2), 174–190. https://doi.org/10.1007/s11065-010-9130-1 – Hirnhälften-Übertragung ≈ 4–6 ms
- Soechting, J. F., Rao, H. M., & Juveli, J. Z. (2010). Incorporating prediction in models for two-dimensional smooth pursuit. *PLoS ONE, 5*(9), e12574. https://doi.org/10.1371/journal.pone.0012574 – 2D-Vorhersage beim Menschen
- Talens-Estarelles, C., Cerviño, A., García-Lázaro, S., Fogelton, A., Sheppard, A., & Wolffsohn, J. S. (2023). The effects of breaks on digital eye strain, dry eye and binocular vision: Testing the 20-20-20 rule. *Contact Lens and Anterior Eye, 46*(2), 101744. https://doi.org/10.1016/j.clae.2022.101744 – 20-20-20
