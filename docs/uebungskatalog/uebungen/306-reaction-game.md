---
# ===== Kennung =====
nr: 306
kennung: reaction-game
name: "Fallende Ziele abfangen – Klick auf herabfallende Punkte"
name_original: "Reaktionstest-Spiel (Seitentitel: Reaktionstest-Spiel | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/reaction-game"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Von oben fallen rote Punkte an zufälligen Stellen über das dunkle Spielfeld, mehrere gleichzeitig. Man klickt oder tippt sie an, bevor sie unten verschwinden; mit den Punkten steigt das Level, und die Punkte werden schneller, kleiner und kommen dichter."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code steigen von Level 1 bis 15 die Fallgeschwindigkeit 180 → 690 px/s (je Ziel zufällig ×0,85–1,15, während des Falls konstant), der Zielradius sinkt 28 → 12 px, der Abstand zwischen zwei neuen Zielen 600–850 → 159–230 ms, die unsichtbare Trefferzugabe 14 → 5 px. Eine Serie (Combo) verschärft zusätzlich bis +30 % Tempo, −25 % Radius, −30 % Abstand, −50 % Trefferzugabe. Rundendauer variabel: 45 s Start, +2 s je Treffer (max. 60 s), −1 s je Fehlklick oder entkommenem Ziel."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + entkommene Ziele)", "'Ø Reaktion' = Zeit vom Entstehen über dem Rand bis zum Treffer, nur Treffer (keine Reaktionszeit, enthält die selbst gewählte Fallzeit)", "höchstes Level, maximale Combo", "sinnvoll: Abfanghöhe (Anteil der Fallstrecke), Treffpunkt vor/hinter dem Ziel, entkommene Ziele je Level"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 2
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 2
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 2
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 1
    ruhige_hand: 1
    fingergeschwindigkeit: 1
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "Ziele von ≈ 1,5° bis ≈ 0,5° Sehwinkel erkennen, die mit ≈ 5 bis > 20 °/s nach unten fallen", "scharfes Sehen über die ganze Feldhöhe (≈ 17° in der Seite, ≈ 28° im Vollbild am Monitor)", "kein Farbsehen nötig (alle Ziele gleich rot, mit weißem Mittelpunkt)", "1–3 min ohne Pause schnell klicken oder tippen können"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, nystagmus, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["bewegte Ziele mit Blick und Zeiger abfangen (Interzeption) in spielerischer Form üben", "mehrere gleichzeitig fallende Ziele im Blick behalten und das dringendste (unterste) zuerst wählen", "Einstieg in Abfangaufgaben: die ersten Level sind langsam (Fallzeit ≈ 4 s), mit großer Trefferzone", "Aufwärmen vor FPS- oder Tracking-Übungen (304, 305, 515)"]
weniger_geeignet_fuer: ["Messung der Reaktionszeit (der Wert 'Ø Reaktion' enthält die Fallzeit bis zum selbst gewählten Klick)", "Impulskontrolle (es gibt keine Nicht-Klick-Reize; dafür 802 oder 102)", "Menschen, die ohne Zeitdruck üben sollen", "Lichtempfindliche: roter Fehlerblitz bei jedem Fehler, standardmäßig an", "Gleitsichtträger:innen im Vollbild (senkrechter Blickweg durch mehrere Glaszonen)", "Tablets mit hoher Tipp-Latenz ab mittleren Levels (Treffer rutschen systematisch hinter das Ziel)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Abfang- und Zeigeaufgaben werden durch Übung deutlich besser (auch durch Gewöhnung an Gerät und Strategie), Effekte auf unähnliche Tests sind viel kleiner, ein Nutzen für Sport, E-Sport oder Verkehr ist nicht belegt (Guo et al. 2025; Simons et al. 2016; Fransen 2024)."
aehnliche_uebungen: [802, 302, 304, 305, 104, 515, 413, 101, 503, 102, 202, 803, 702, 502]
stichworte: ["Interzeption", "fallende Ziele", "Abfangen", "Auge-Hand-Koordination", "vertikale Blickfolge", "Bewegungsvorhersage", "Fitts'sches Gesetz", "Latenz", "Zeitdruck", "Combo", "Touch", "Reaktionstest (Name des Originals)"]
---

# 306 · Fallende Ziele abfangen – Klick auf herabfallende Punkte

> Original: „Reaktionstest-Spiel“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) ·
> Blickfit: noch nicht umgesetzt (verwandt: `zielfang` = Umsetzung von 104, ein bewegtes Ziel abfangen)

## 1. Kurzbeschreibung

Auf einem fast schwarzen Feld fallen rote Punkte mit weißem Kern von oben nach unten, an zufälligen Stellen und meist mehrere zugleich. Man klickt oder tippt jeden Punkt an, bevor er unten aus dem Feld fällt. Treffer bringen Punkte und Zeit, Fehlklicks und entkommene Punkte kosten Zeit und brechen die Serie. Mit den Punkten steigt das Level: Die Punkte fallen schneller, werden kleiner und kommen dichter. Trotz des Namens ist es keine Reaktionszeitmessung, sondern eine Abfangaufgabe (Interzeption) mit Blick, Zeiger und Reihenfolge-Entscheidung.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `63062-…js` mit gemeinsamen Modulen für Schwierigkeit, Combo, Strafe und Effekte; geprüft am 29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung**: Monitor 24″ Full-HD in 60 cm (≈ 37,8 px/°), Tablet 11″ in 40 cm (≈ 36,4 CSS-px/°).

- **Ablauf:** Start → Countdown 3-2-1-GO (≈ 2,45 s, Töne) → Spiel → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, Treffer, Fehlklicks, entkommene Ziele, höchstes Level, maximale Combo, Buchstabennote). Escape oder Verlassen des Vollbilds bricht ab.
- **Spielfeld:** 16:9 in der Seite (mind. 460–500 px hoch; Handy hochkant 3:4) oder Vollbild; Grund #050508 mit kaum sichtbarem 40-px-Raster (2 % Deckkraft). Am Monitor typisch ≈ 1.120 × 630 px ≈ 29° × 17°, im Vollbild ≈ 48° × 28°; am iPad quer ≈ 30° × 17°. Eine rot gestrichelte Linie bei 88 % der Höhe ist **nur Dekoration** – ein Ziel entkommt erst, wenn es ganz unter den unteren Rand gefallen ist.
- **Ziele:** rote Kreise (#ef4444) mit weißem Kern. Sie entstehen knapp **über** dem oberen Rand an einer **zufälligen, stufenlosen** x-Position (10–90 % der Breite) und fallen **senkrecht mit konstanter Geschwindigkeit**. Bei Touch, Fenster < 768 px oder Mobilgerät: Radius +2 px, Trefferzugabe +10 px. Getroffen ist, wer innerhalb von Radius + Zugabe um die aktuelle Modellposition drückt; ein Druck daneben ist ein Fehlklick.
- **Schwierigkeit:** Fortschritt p = (Level − 1)/14, exponentieller Verlauf wie in den Übungen 302–308 (setzt sich über Level 15 fort). Werte ohne Combo, Fallzeit für 630 px Feldhöhe (eigene Rechnung):

| Level (Punkte) | Ø Ziel (Monitor) | Tempo (Mittel) | Fallzeit | neues Ziel alle | Trefferzone Ø | gleichzeitig ≈ |
|---|---|---|---|---|---|---|
| 1 (0) | 56 px ≈ 1,5° | 180 px/s ≈ 4,8 °/s | 3,8 s | 725 ms | 84 px | 5 |
| 5 (7.000) | 47 px ≈ 1,3° | 316 px/s ≈ 8,3 °/s | 2,2 s | 584 ms | 71 px | 4 |
| 9 (14.000) | 37 px ≈ 1,0° | 482 px/s ≈ 12,7 °/s | 1,4 s | 411 ms | 54 px | 3–4 |
| 15 (24.500) | 24 px ≈ 0,6° | 690 px/s ≈ 18 °/s | 0,95 s | 194 ms | 34 px | 5 |

- **Combo:** Faktor 1,1/1,25/1,35/1,5/1,75/2/2,5/3,0 ab 3/5/7/10/15/20/30/50 Treffern in Folge; Punkte je Treffer = 100 × Faktor × (1 + 0,5 p). Beim Faktor 3,0 und Level 15: Ø 18 px ≈ 0,48°, bis ≈ 1.030 px/s ≈ 27 °/s. Fehler/Entkommen: Combo 0, Bildwackeln (6 px), Ton, **roter Fehlerblitz** (radialer Verlauf, 50 % Deckkraft in der Mitte, 0,45 s; standardmäßig an, abschaltbar).
- **Zeit:** Start 45 s, **+2 s je Treffer** (max. 60 s), **−1 s je Fehlklick und je entkommenem Ziel**. *Eigene Rechnung:* Um die Uhr zu halten, braucht man (1 + Zielrate)/3 Treffer pro Sekunde – bei Level 1 ≈ 0,8/s, bei Level 9 ≈ 1,1/s, bei Level 15 ≈ 2,0/s. Ab etwa Level 10–12 läuft die Zeit daher meist rasch ab.
- **Eingabe/Timing:** Pointer beim Drücken (Maus, Stift, Finger; Fadenkreuz folgt dem Zeiger). Keine Tastatur außer Escape. Fallbewegung und Uhr rechnen mit der Bildzeit (dt, pro Bild höchstens 100 ms) → auf 60- und 144-Hz-Geräten gleich schnell; nur Partikel und Wackel-Abklingen laufen pro Bild (optisch).
- **Note:** 100 × √(Punkte/18.000) → „S+ LEGENDARY“ ab 16.245 Punkten; Teilen-Karte „ELITE REFLEX“.

**Widersprüche Regeltext ↔ Code:** (1) „Bahnen“ – es gibt keine Bahnen, die x-Position ist stufenlos zufällig. (2) „Folge beschleunigten Zielen“ – jedes Ziel fällt gleichmäßig; schneller wird es nur von Level zu Level. (3) „+0,6 s“ je Treffer – Code +2 s. (4) „Combo zurück (−0,8 s)“ – Code −1 s, und zwar **immer**: Die allgemeine Einstellung „ohne Zeitstrafe“ wird in dieser Übung übergangen; der Rat „Strafmodus konstant halten“ läuft ins Leere. (5) „Intervall zwischen Auftauchen im Frame und Pointerkontakt“ – gezählt wird ab Entstehen über dem Rand, also vor der Sichtbarkeit.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt das Spiel als Verbindung von visueller Suche, Tracking, Timing und Motorik für Gamer, Sportler „und alle“. Sie sagt korrekt, der Wert sei „keine reine Nervensystem-Geschwindigkeit“, Gerät und Browser wirkten mit, man solle nur gleiche Setups vergleichen, Tempo und Genauigkeit gemeinsam lesen, und der Transfer sei „aufgabenspezifisch“; die Leistungsreferenz (Ø Reaktion > 320 ms „Start“ bis < 170 ms „Nur Referenz“, Genauigkeit < 75 % bis ≥ 98 %) ist als „keine Populations- oder medizinische Norm“ gekennzeichnet. Das ist zurückhaltend. Einordnung:

- **Die Reaktions-Bänder sind mit dieser Mechanik kaum sinnvoll** (eigene Analyse): Bei Level 1 braucht ein Ziel 156 ms, bis seine Mitte den oberen Rand erreicht, und 311 ms, bis es ganz sichtbar ist. Werte unter 320 ms setzen also voraus, dass der Zeiger schon zufällig über der Eintrittsstelle steht – die einfache Reaktionszeit allein liegt bei 213–231 ms (Woods et al., 2015), dazu kommt die Zeigerbewegung. Da die Fallzeit mit dem Level sinkt (Level 15: ganze Strecke < 1 s) und nur Treffer zählen, „verbessert“ sich der Mittelwert automatisch mit dem Level. Der Wert misst vor allem die **Abfanghöhe**, nicht Reaktionsgeschwindigkeit.
- **Hick/Donders:** Mehrere sichtbare Ziele sind Alternativen, doch das Zeigen auf den sichtbaren Ort ist hoch kompatibel; dann steigt die Wahlzeit kaum mit der Zahl der Alternativen (Proctor & Schneider, 2018). Die eigentliche Entscheidung ist die **Reihenfolge** (unterstes bzw. schnellstes Ziel zuerst).
- **„Weit oben klicken“:** Früh abfangen schafft Reserve, ein Rateschuss kostet Zeit – das entspricht dem Speed-Accuracy-Trade-off (Heitz, 2014). Wer den Trefferort frei wählen darf, gleicht eher über den Ort als über den Zeitpunkt aus und erreicht so hohe zeitliche Präzision (Brenner & Smeets, 2015).
- **„Weicher Blick statt ein Ziel fixieren“:** hilft, neue Ziele am oberen Rand früh zu entdecken. Für den Treffer selbst ist es aber günstig, das Ziel mit den Augen zu verfolgen: Wer stattdessen einen festen Punkt fixiert, macht große systematische Abfangfehler (de la Malla et al., 2017); Menschen folgen Zielen bis zum Abfangen meist mit glatter Folgebewegung (Mrotek & Soechting, 2007). Der Tipp ist daher nur halb richtig.
- **Noten „LEGENDARY“/„ELITE REFLEX“** beruhen nur auf dem Punktestand, ohne Datengrundlage.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel und Tempo:** Ziele 1,5° (Level 1) bis 0,6° (Level 15), bei hoher Combo ≈ 0,5°; für normale Sehschärfe groß. Begrenzend sind Entdecken am oberen Rand, Blickfolge und Timing, nicht das Detail. Fallgeschwindigkeit ≈ 4–5 °/s (Level 1) bis ≈ 18–27 °/s (Level 15, mit Combo).
- **Senkrechte Blickfolge:** Die Folgebewegung setzt ≈ 100 ms nach Bewegungsbeginn ein (Carl & Gellman, 1987); fällt das Auge zu weit zurück, holt eine Aufholsakkade auf (de Brouwer et al., 2002). Senkrechte Folgebewegungen sind weniger genau als waagrechte (Rottach et al., 1996; Ke et al., 2013); **abwärts** folgten Erwachsene jedoch schneller und glatter als aufwärts (n = 20 bzw. 22; Ke et al., 2013) – die Fallrichtung ist also die „günstigere“ Senkrechte.
- **Bildschirm:** Bei 690 px/s springt ein Ziel bei 60 Hz ≈ 11,5 px pro Bild, bei 144 Hz ≈ 4,8 px (eigene Rechnung) – bei Ø 24 px sichtbar ruckelnd. Ende-zu-Ende-Latenz Maus → Bild 21–37 ms (120 bzw. 60 Hz), Tippen am Tablet 48–276 ms je nach Gerät und Toolkit (Casiez et al., 2017).
- **Gleitsicht/Alterssichtigkeit:** Die Ziele laufen über die ganze Feldhöhe (≈ 17° in der Seite, ≈ 28° im Vollbild). Mit Gleitsichtgläsern wandert der Blick dabei senkrecht durch Zonen unterschiedlicher Wirkung; die unteren Ziele sieht man durch den Nahteil, der für 60 cm oft zu stark ist, oder man hebt den Kopf – Gleitsichtträger halten den Kopf am Bildschirm ohnehin ≈ 7° höher (Jaschinski et al., 2015). Seitlich liegt der Entstehungsbereich (≈ 23° breit) über der klaren Zwischenzone von ≈ 13–18° (Han et al., 2003). Besser: Bildschirm-/Arbeitsplatzbrille, kein Vollbild, Monitor etwas tiefer. Am Tablet in ≈ 35–40 cm Nahkorrektur nötig (Presbyope halten Geräte weiter weg; Boccardo et al., 2023).
- **Trockenes Auge:** Am Bildschirm sinkt die Blinzelrate im Mittel auf ≈ ein Fünftel (Patel et al., 1991); bei schnellen Zielen blinzelt man eher noch seltener (plausibel, für diese Übung nicht gemessen).
- **Farbe:** Rot auf Fast-Schwarz mit weißem Kern; bei Rot-Grün-Schwäche (Protanopie) wirkt Rot dunkler, der weiße Kern bleibt gut sichtbar (eigene Einschätzung).

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie; die Website nennt auch keine Hirnregionen. Relevante Befunde aus der Grundlagenforschung:

- **Folgebewegung** wird von einem Netzwerk aus frontalem Augenfeld, Kleinhirn, Basalganglien und Colliculus superior gesteuert, ähnlich wie Sakkaden (Krauzlis, 2004).
- **Innere Modelle der Zielbewegung:** Bei einem auf einer Leinwand abwärts laufenden Ziel richteten Personen ihre Faustschläge nach der Schwerkraft aus, auch wenn das Ziel gar nicht beschleunigte. Sollten sie stattdessen per **Maustaste** abfangen, gingen sie von **gleichförmiger** Bewegung aus, selbst bei beschleunigten Zielen (Zago et al., 2004). Auch bei der Zeitschätzung wird Beschleunigung kaum genutzt; die Handlung wird ≈ 200 ms vor Bewegungsbeginn geplant (Benguigui et al., 2003). Die gleichförmig fallenden Bildschirmziele passen also zu dem, was man beim Klicken ohnehin erwartet – die Website-Angabe „beschleunigt“ ist falsch.
- **Erwartungen aus dem Vorgänger:** Die Geschwindigkeit des vorherigen Ziels verzerrt die Treffpunkte beim nächsten (de Lussanet et al., 2001). Da jedes Ziel zufällig 15 % schneller oder langsamer fällt, ist mit solchen Fehlern zu rechnen.
- **Laufende Korrektur:** Abfangbewegungen werden fortlaufend an die neueste Sehinformation angepasst; die visuomotorische Latenz betrug 114 ms, gleich für Tippen und Wischen (Brenner et al., 2026).

„Trainiert Region X“ lässt sich daraus nicht ableiten.

## 6. Motorische Grundlagen

- **Zielbewegung zu bewegtem Ziel:** schneller Anfangsimpuls plus visuelle Endkorrektur (Elliott et al., 2010); Bewegungszeit steigt mit log₂(2A/W) (Fitts, 1954), bei bewegten Zielen zusätzlich mit dem Tempo. Beim Anklicken bewegter Ziele liegen die Endpunkte hinter dem Ziel, umso mehr, je schneller es ist (Maus, n = 12; Huang et al., 2018).
- **Latenz verschiebt den Treffpunkt** (*grobe eigene Abschätzung*): Das Spiel prüft den Treffer an der Modellposition, die dem gesehenen Bild um Tempo × Ende-zu-Ende-Latenz vorausläuft. Am Monitor (≈ 37 ms bei 60 Hz; Casiez et al., 2017) sind das bei Level 9 ≈ 18 px (Trefferradius 27 px), bei Level 15 ≈ 25 px (Radius 17 px) – wer genau auf das gesehene Ziel klickt, verfehlt dann systematisch. Am iPad (Safari-Canvas ≈ 77 ms) wird es trotz Touch-Zuschlag schon ab ≈ Level 9 knapp (≈ 37 px bei Radius ≈ 39 px). Hohe Level belohnen also Vorhalten und prüfen das Gerät mit.
- **Touch vs. Maus:** Touch verkürzte die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013). Die Trefferzone am Tablet bleibt dank Zuschlag bis Level 15 über der Empfehlung von 9,2 mm (Parhi et al., 2006; ≈ 11 mm, mit hoher Combo ≈ 9,6 mm, eigene Rechnung), sichtbar sind dann aber nur ≈ 4–5 mm. Die tippende Hand verdeckt den unteren Feldteil, in den die Ziele hineinfallen.
- **Tremor:** physiologisch ≈ 8–12 Hz, Parkinson 3–6 Hz (McAuley & Marsden, 2000); kleine, schnelle Ziele und hohe Klickfolgen belasten zitternde oder schmerzende Hände.

## 7. Einflussfaktoren und Messgrenzen

- **Feldgröße ändert die Aufgabe:** Das Tempo ist in px/s festgelegt; im Vollbild (1.080 px) ist die Fallzeit ≈ 65 % länger als in der Seite (630 px), am Handy hochkant anders als quer. Punkte und Level sind daher nur bei gleicher Darstellung vergleichbar.
- **Gerät:** Browser-Messungen enthalten 58–133 ms Geräteanteil (Pronk et al., 2020); Tablet-Latenz verschiebt zusätzlich die Treffer (Abschnitt 6). Nur Selbstvergleich am selben Gerät ist sinnvoll.
- **Rückkopplung:** Combo erhöht Punkte (bis × 3), damit Level und Schwierigkeit; das Level sinkt nie, und die Rundendauer hängt am Erfolg. Endlevel, Punkte und Dauer sind eng verknüpft; zufällige Positionen lassen die Schwierigkeit einzelner Ziele stark schwanken.
- **Messgrößen:** „Ø Reaktion“ ist verzerrt (Abschnitt 3). Aussagekräftiger wären Abfanghöhe, Treffpunkt vor/hinter dem Ziel und entkommene Ziele je Level. Aim-Trainer-Kennzahlen können sehr zuverlässig sein (ICC 0,947–0,995), zeigen aber Lerneffekte zwischen Terminen (Rogers et al., 2024).
- **Alter:** Das reine Entdecken ist altersunabhängig (≈ 131 ms), die motorischen Anteile verlangsamen sich (Woods et al., 2015). Ältere (> 55 J.) blicken beim Abfangen vorausschauender und starten früher, bei vergleichbarer Trefferleistung (Gerharz & Voudouris, 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Abfang- und Zeigeaufgaben werden durch Wiederholung schneller und genauer; ein Teil ist Gewöhnung an Gerät, Tempo und Strategie. Bei digitalem Sport-Sehtraining war der Reaktionseffekt in trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** keine Studie zu dieser Übung; Meta-Analysen zu Actionspielen widersprechen sich (Bediou et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte). Selbst das „Schwerkraftmodell“ passte sich beim Abfangen durch Übung nur an, statt sich abzuschalten (Zago et al., 2004) – Gelerntes bleibt eng an die Aufgabe gebunden.
- **Alltagstransfer (fehlend):** kein Beleg für Ballsport, E-Sport, Verkehr oder Beruf; Ferntransfer allgemeiner Wahrnehmungs-/Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** bewegte Ziele mit Blick und Zeiger abgefangen werden sollen, mehrere Ziele im Blick behalten und das dringendste gewählt werden soll, jemand Spaß an steigendem Tempo hat; als Einstieg in Abfangaufgaben (Level 1–5 langsam, große Zone).
- **Weniger passend, wenn …** eine echte Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle geübt werden soll (102/Stopp & Los, 802), eine symbolische Wahlreaktion gemeint ist (202/Pfeil-Duell) oder ruhig ohne Zeitdruck geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter radialer Fehlerblitz (standardmäßig an) bei jedem Fehlklick und jedem entkommenen Ziel. Ab ≈ Level 11 entstehen mehr als 3 Ziele/s; bei vielen Fehlern sind rechnerisch > 3 Blitze/s möglich (WCAG-2.3.1-Grenze; nicht gemessen). Blitz abschalten („Fehlblitz umschalten“).
  - `presbyopie_gleitsicht`: senkrechter Blickweg über das ganze Feld – kein Vollbild, Bildschirmbrille, Monitor tiefer.
  - `nystagmus`: Blickfolge bewegter Ziele ist Kernbestandteil; langsame Level wählen oder 302 (ruhende Ziele).
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Ziele entstehen am oberen Rand über fast die ganze Breite und werden bis ≈ 0,5° klein; ausfallseitige entkommen unbemerkt.
  - `trockenes_auge_bildschirm`: seltenes Blinzeln im Schnellspiel; kurze Runden, Pausen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: schnelle, kleine Ziele, keine Pausenfunktion.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: sich selbst verschärfender Zeitdruck, Rückmeldung mit Blitz, Ton und Wackeln – eher als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 413 (senkrechte Blickfolge ohne Hand), 104/Zielfang (ein bewegtes Ziel, Blickfit), 302 (gleiche Spielmechanik mit ruhenden Zielen), 101 (Reaktion ohne Zielbewegung).
- **Überschneidungen:** **802** ist fast dieselbe Aufgabe (fallende Kugeln abfangen) plus Go/No-Go-Regel – nicht beide hintereinander vorschlagen. **302** teilt Level-, Combo- und Zeitregeln, dort ruhen die Ziele. **304/305** fangen waagrecht bzw. zweidimensional bewegte Einzelziele ab, **515** senkrechte Flugbahnen mit Schwerkraft (FPS-Kapitel). **101** und **503** messen echte einfache Reaktion am festen Ort, **102** Impulskontrolle, **202** Wahlreaktion nach Regel – all das fehlt hier.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tempo in Sehwinkel bzw. Fallzeit** statt px/s, Feld auf feste Größe begrenzen (≈ 15–20° hoch) – sonst ändert jede Fenstergröße die Aufgabe; Gleitsicht profitiert von geringer Höhe.
- **Ehrliche Messgrößen:** Abfanghöhe, Treffpunkt vor/hinter dem Ziel (wie Zielfang), entkommene Ziele; keine „Reaktion“ aus Fallzeiten, keine Noten wie „LEGENDARY“.
- **Latenz berücksichtigen:** Trefferprüfung an der zuletzt gezeigten Position (oder mit gemessenem Vorlauf), damit Tablets nicht systematisch benachteiligt werden.
- **Feste Rundendauer** (z. B. 45–60 s), Stufe adaptiv in beide Richtungen (z. B. 3-down/1-up wie Zielfang) statt an Combo-Punkte gekoppelt; Zielzahl gleichzeitig begrenzen (2–3).
- **Kein roter Blitz, kein Wackeln:** dezente, farbunabhängige Rückmeldung (Symbol + Ton), WCAG 2.3.1 einhalten.
- **Tablet zuerst:** Trefferzone ≥ 10 mm, Ziele nicht unter ≈ 0,5°, untere Feldzone freihalten (Hand verdeckt sie); Texte DE/IT, „Übung“ statt „Reaktionstest“/„Reflexe“, keine Leistungsversprechen.

## 11. Quellen

### Von der Website angegeben

- Kosinski, R. J. (2008 laut Website). *A literature review on reaction time.* Clemson University – **Prüfung:** keine DOI, unbegutachtetes Online-Skript; auffindbar nur die Fassung 2013 (http://www.cognaction.org/cogs105/readings/clemson.rt.pdf); **stützt die Aussage der Website:** teilweise (≈ 190 ms für Licht, Computermessungen ≈ 268 ms; für die Übungsbänder und für Abfangaufgaben ohne Bezug).
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (gilt für symbolische Wahlreaktionen; bei direktem Zeigen auf sichtbare Ziele nahezu flach, Proctor & Schneider 2018).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Gerät beeinflusst den Wert“, nein für die Bänder (nur einfache RT, 231 bzw. 213 ms).
- Donders, F. C. (1969). On the speed of mental processes (Übersetzung des Originals von 1868). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (Übersetzung 1969; Website nennt 1868 und die Übersetzung korrekt); **stützt:** teilweise (einfache vs. Wahlreaktion als Verarbeitungsstufen; zu bewegten Zielen sagt Donders nichts; Inhalt über Sekundärquellen).

### Weitere Fachliteratur

Alle DOIs am 29.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts, das Dossier `docs/wissenschaft/02` bzw. die Literaturbasis W03.

- Benguigui, N., Ripoll, H., & Broderick, M. P. (2003). Time-to-contact estimation of accelerated stimuli is based on first-order information. *Journal of Experimental Psychology: Human Perception and Performance, 29*(6), 1083–1101. https://doi.org/10.1037/0096-1523.29.6.1083 – Beschleunigung kaum genutzt.
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3 – visuomotorische Latenz 114 ms.
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3), 8. https://doi.org/10.1167/15.3.8 – freier Trefferort, Ausgleich über den Ort.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Ende-zu-Ende-Latenz Maus/Tablet.
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – Blickfolge vs. Fixation beim Abfangen.
- de Lussanet, M. H. E., Smeets, J. B. J., & Brenner, E. (2001). The effect of expectations on hitting moving targets: Influence of the preceding target's speed. *Experimental Brain Research, 137*(2), 246–248. https://doi.org/10.1007/s002210000607 – Einfluss des vorherigen Ziels.
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of CHI 2018* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811 – Klicks liegen hinter bewegten Zielen.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – abwärts besser als aufwärts, waagrecht besser als senkrecht.
- Mrotek, L. A., & Soechting, J. F. (2007). Target interception: Hand–eye coordination and strategies. *The Journal of Neuroscience, 27*(27), 7297–7309. https://doi.org/10.1523/JNEUROSCI.2046-07.2007 – Blickfolge bis zum Abfangen.
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – geringerer Gain senkrecht (n = 5).
- Zago, M., Bosco, G., Maffei, V., Iosa, M., Ivanenko, Y. P., & Lacquaniti, F. (2004). Internal models of target motion: Expected dynamics overrides measured kinematics in timing manual interceptions. *Journal of Neurophysiology, 91*(4), 1620–1634. https://doi.org/10.1152/jn.00862.2003 – Schwerkraft- vs. Gleichförmigkeitsannahme beim Abfangen.
- Ergänzend zitiert (Kurzangaben, Details in der Literaturbasis W03 bzw. Dossier 02): Bediou et al. (2018), https://doi.org/10.1037/bul0000130 · Boccardo et al. (2023), https://doi.org/10.1371/journal.pone.0282947 · Carl & Gellman (1987), https://doi.org/10.1152/jn.1987.57.5.1446 · de Brouwer et al. (2002), https://doi.org/10.1152/jn.00432.2001 · Elliott et al. (2010), https://doi.org/10.1037/a0020958 · Findlater et al. (2013), https://doi.org/10.1145/2470654.2470703 · Fitts (1954), https://doi.org/10.1037/h0055392 · Fransen (2024), https://doi.org/10.1007/s40279-024-02060-x · Gerharz & Voudouris (2025), https://doi.org/10.1152/jn.00029.2025 · Guo et al. (2025), https://doi.org/10.3389/fphys.2025.1664572 · Han et al. (2003), https://doi.org/10.1167/iovs.02-0507 · Heitz (2014), https://doi.org/10.3389/fnins.2014.00150 · Jaschinski et al. (2015), https://doi.org/10.1111/cxo.12248 · Krauzlis (2004), https://doi.org/10.1152/jn.00801.2003 · McAuley & Marsden (2000), https://doi.org/10.1093/brain/123.8.1545 · Parhi et al. (2006), https://doi.org/10.1145/1152215.1152260 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Proctor & Schneider (2018), https://doi.org/10.1080/17470218.2017.1322622 · Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2 · Rogers et al. (2024), https://doi.org/10.3389/fspor.2024.1309991 · Sala et al. (2018), https://doi.org/10.1037/bul0000139 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983 · W3C (2024), *WCAG 2.2*, Kriterium 2.3.1, https://www.w3.org/TR/WCAG22/ (Norm, keine DOI).
