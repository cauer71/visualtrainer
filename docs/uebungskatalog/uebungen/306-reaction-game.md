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
blickfit_umsetzung: {kennung: "fallende-ziele", name: "Fallende Ziele", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/fallende-ziele/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Von oben fallen Ziele herab, bis zu drei gleichzeitig. Man tippt sie an, bevor sie den Boden berühren; mit der Stufe fallen sie schneller und werden kleiner. Ab höheren Stufen erscheinen Quadrate mit Kreuz, die man nicht antippt. Gemessen wird, wie hoch die Ziele gefangen werden, keine Reaktionszeit."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code steigen von Level 1 bis 15 die Fallgeschwindigkeit 180 → 690 px/s (je Ziel zufällig ×0,85–1,15, während des Falls konstant), der Zielradius sinkt 28 → 12 px, der Abstand zwischen zwei neuen Zielen 600–850 → 159–230 ms, die unsichtbare Trefferzugabe 14 → 5 px. Eine Serie (Combo) verschärft zusätzlich bis +30 % Tempo, −25 % Radius, −30 % Abstand, −50 % Trefferzugabe. Rundendauer variabel: 45 s Start, +2 s je Treffer (max. 60 s), −1 s je Fehlklick oder entkommenem Ziel."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + entkommene Ziele)", "'Ø Reaktion' = Zeit vom Entstehen (Ziel berührt gerade den oberen Rand von außen, noch nicht sichtbar) bis zum Treffer, nur Treffer (keine Reaktionszeit, enthält die selbst gewählte Fallzeit)", "höchstes Level, maximale Combo", "sinnvoll: Abfanghöhe (Anteil der Fallstrecke), Treffpunkt vor/hinter dem Ziel, entkommene Ziele je Level"]

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
voraussetzungen: ["Maus, Touchpad oder Touchscreen", "fallende Ziele erkennen und mit dem Blick verfolgen können", "scharfes Sehen über die ganze Feldhöhe in Bildschirmabstand", "kein Farbsehen nötig (das Quadrat mit Kreuz ist an der Form erkennbar)", "etwa eine Minute ohne Pause schnell tippen können"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, nystagmus, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["bewegte Ziele mit Blick und Finger abfangen (Interzeption) in spielerischer Form üben", "mehrere gleichzeitig fallende Ziele im Blick behalten und das dringendste (unterste) zuerst wählen", "Einstieg in Abfangaufgaben: die ersten Level sind langsam (Fallzeit ≈ 4 s), mit großer Trefferzone", "Vorstufe zu Zielübungen mit bewegten Zielen (515, 505)"]
weniger_geeignet_fuer: ["Messung der Reaktionszeit (gemessen wird die Fanghöhe, nicht die Reaktion)", "Impulskontrolle als Hauptziel (Quadrate zum Nicht-Antippen gibt es nur als Beiwerk ab Stufe 9; dafür 802 oder 102)", "Menschen, die ohne Zeitdruck üben sollen", "Gleitsichtträger:innen im Vollbild (senkrechter Blickweg durch mehrere Glaszonen)", "Tablets mit hoher Tipp-Latenz auf hohen Stufen (der Fang verschiebt sich zeitlich)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Abfang- und Zeigeaufgaben werden durch Übung deutlich besser (auch durch Gewöhnung an Gerät und Strategie), Effekte auf unähnliche Tests sind viel kleiner, ein Nutzen für Sport, E-Sport oder Verkehr ist nicht belegt (Guo et al. 2025; Simons et al. 2016; Fransen 2024)."
aehnliche_uebungen: [802, 302, 304, 305, 104, 515, 413, 101, 503, 102, 202, 803, 702, 502]
stichworte: ["Interzeption", "fallende Ziele", "Abfangen", "Auge-Hand-Koordination", "vertikale Blickfolge", "Bewegungsvorhersage", "Fitts'sches Gesetz", "Latenz", "Zeitdruck", "Combo", "Touch", "kein Reaktionstest"]
---

# 306 · Fallende Ziele abfangen – Klick auf herabfallende Punkte

> Original: „Reaktionstest-Spiel“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: `zielfang` = Umsetzung von 104, ein bewegtes Ziel abfangen)

## 1. Kurzbeschreibung

Von oben fallen Ziele herab; man tippt sie an, bevor sie den Boden berühren. Die Fallzeit vom oberen Rand bis zum Boden
beträgt auf der ersten Stufe etwa 4,2 s und auf der höchsten etwa 1,3 s; ab Stufe 8 fallen die Ziele leicht beschleunigt,
die Gesamtfallzeit bleibt dabei erhalten. Mit der Stufe fallen die Ziele schneller, werden kleiner, und es sind bis zu
drei gleichzeitig unterwegs; man wählt selbst, welches man zuerst fängt. Ab Stufe 9 erscheinen Quadrate mit Kreuz, die
man nicht antippt (Go/No-Go); sie unterscheiden sich durch die Form, nicht nur durch die Farbe. Die Stufe steigt nach
drei gefangenen Zielen in Folge und sinkt nach einem verpassten Ziel oder einem angetippten Quadrat; die Sitzung dauert 50 s, ohne Zeitstrafe, ohne Wackeln und ohne
roten Blitz. Gemessen wird, wie hoch die Ziele gefangen werden (Anteil der Fallstrecke), keine Reaktionszeit.

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

**Widersprüche Regeltext ↔ Code:** (1) „Bahnen“ – es gibt keine Bahnen, die x-Position ist stufenlos zufällig. (2) „Folge beschleunigten Zielen“ – jedes Ziel fällt gleichmäßig; schneller wird es nur von Level zu Level. (3) „+0,6 s“ je Treffer – Code +2 s. (4) „Combo zurück (−0,8 s)“ – Code −1 s, und zwar **immer**: Die allgemeine Einstellung „ohne Zeitstrafe“ wird in dieser Übung übergangen; der Rat „Strafmodus konstant halten“ läuft ins Leere. (5) „Intervall zwischen Auftauchen im Frame und Pointerkontakt“ – gezählt wird ab Entstehen knapp über dem Rand (Mittelpunkt einen Radius über der Kante), also bevor das Ziel ins Bild rückt; ganz sichtbar ist es erst nach 2 × Radius / Tempo (Level 1: ≈ 311 ms).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt das Spiel als Verbindung von visueller Suche, Tracking, Timing und Motorik für Gamer, Sportler „und alle“. Sie sagt korrekt, der Wert sei „keine reine Nervensystem-Geschwindigkeit“, Gerät und Browser wirkten mit, man solle nur gleiche Setups vergleichen, Tempo und Genauigkeit gemeinsam lesen, und der Transfer sei „aufgabenspezifisch“; die Leistungsreferenz (Ø Reaktion > 320 ms „Start“ bis < 170 ms „Nur Referenz“, Genauigkeit < 75 % bis ≥ 98 %) ist als „keine Populations- oder medizinische Norm“ gekennzeichnet. Das ist zurückhaltend. Einordnung:

- **Die Reaktions-Bänder sind mit dieser Mechanik kaum sinnvoll** (eigene Analyse): Bei Level 1 braucht ein Ziel 156 ms, bis seine Mitte den oberen Rand erreicht, und 311 ms, bis es ganz sichtbar ist. Werte unter 320 ms setzen also voraus, dass der Zeiger schon zufällig über der Eintrittsstelle steht – die einfache Reaktionszeit allein liegt bei 213–231 ms (Woods et al., 2015), dazu kommt die Zeigerbewegung. Da die Fallzeit mit dem Level sinkt (Level 15: ganze Strecke < 1 s) und nur Treffer zählen, „verbessert“ sich der Mittelwert automatisch mit dem Level. Der Wert misst vor allem die **Abfanghöhe**, nicht Reaktionsgeschwindigkeit.
- **Hick/Donders:** Mehrere sichtbare Ziele sind Alternativen, doch das Zeigen auf den sichtbaren Ort ist hoch kompatibel; dann steigt die Wahlzeit kaum mit der Zahl der Alternativen (Proctor & Schneider, 2018). Die eigentliche Entscheidung ist die **Reihenfolge** (unterstes bzw. schnellstes Ziel zuerst).
- **„Weit oben klicken“:** Früh abfangen schafft Reserve, ein Rateschuss kostet Zeit – das entspricht dem Speed-Accuracy-Trade-off (Heitz, 2014). Wer den Trefferort frei wählen darf, gleicht eher über den Ort als über den Zeitpunkt aus und erreicht so hohe zeitliche Präzision (Brenner & Smeets, 2015).
- **„Weicher Blick statt ein Ziel fixieren“:** hilft, neue Ziele am oberen Rand früh zu entdecken. Für den Treffer selbst ist es aber günstig, das Ziel mit den Augen zu verfolgen: Wer stattdessen einen festen Punkt fixiert, macht große systematische Abfangfehler (de la Malla et al., 2017); Menschen folgen Zielen bis zum Abfangen meist mit glatter Folgebewegung (Mrotek & Soechting, 2007). Der Tipp ist daher nur halb richtig.
- **Noten „LEGENDARY“/„ELITE REFLEX“** beruhen nur auf dem Punktestand, ohne Datengrundlage.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel und Tempo:** Die Ziele sind für normale Sehschärfe groß. Begrenzend sind das Entdecken am oberen Rand, die
  Blickfolge und das Timing, nicht das Detail. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm
  etwa 1,4°. Neue Ziele erscheinen oben, oft außerhalb der Blickmitte, und müssen peripher bemerkt werden.
- **Senkrechte Blickfolge:** Die Folgebewegung setzt etwa 100 ms nach Bewegungsbeginn ein (Carl & Gellman, 1987); fällt das
  Auge zu weit zurück, holt eine Aufholsakkade auf (de Brouwer et al., 2002). Senkrechte Folgebewegungen sind weniger
  genau als waagrechte (Rottach et al., 1996; Ke et al., 2013); **abwärts** folgten Erwachsene jedoch schneller und
  glatter als aufwärts (n = 20 bzw. 22; Ke et al., 2013) – die Fallrichtung ist also die „günstigere“ Senkrechte.
- **Form statt Farbe:** Das Quadrat mit Kreuz unterscheidet sich durch die Form von den Zielen; bei Rot-Grün-Schwäche
  bleibt es erkennbar.
- **Bildschirm:** Ende-zu-Ende-Latenz vom Mausklick bis zum Bild 21–37 ms (120 bzw. 60 Hz), beim Tippen auf dem Tablet
  48–276 ms je nach Gerät und Programmierumgebung (Casiez et al., 2017).
- **Gleitsicht und Alterssichtigkeit:** Die Ziele laufen über die ganze Feldhöhe. Mit Gleitsichtgläsern wandert der Blick
  dabei senkrecht durch Zonen unterschiedlicher Wirkung; die unteren Ziele sieht man durch den Nahteil, der für 60 cm oft
  zu stark ist, oder man hebt den Kopf – Gleitsichtträger halten den Kopf am Bildschirm ohnehin etwa 7° höher (Jaschinski et
  al., 2015). Die klare Zwischenzone ist horizontal nur etwa 13–18° breit (Han et al., 2003). Besser sind eine Bildschirm-
  oder Arbeitsplatzbrille und ein etwas tiefer stehender Monitor; am Tablet in etwa 35–40 cm Nahkorrektur (Presbyope halten
  Geräte weiter weg; Boccardo et al., 2023).
- **Trockenes Auge:** Am Bildschirm sinkt die Blinzelrate im Mittel auf etwa ein Fünftel (Patel et al., 1991); bei
  schnellen Zielen blinzelt man eher noch seltener (plausibel, für diese Übung nicht gemessen).

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie. Relevante Befunde aus der Grundlagenforschung:

- **Folgebewegung** wird von einem Netzwerk aus frontalem Augenfeld, Kleinhirn, Basalganglien und Colliculus superior
  gesteuert, ähnlich wie Sakkaden (Krauzlis, 2004).
- **Innere Modelle der Zielbewegung:** Bei einem auf einer Leinwand abwärts laufenden Ziel richteten Personen ihre
  Faustschläge nach der Schwerkraft aus, auch wenn das Ziel gar nicht beschleunigte. Sollten sie stattdessen per
  **Maustaste** abfangen, gingen sie von **gleichförmiger** Bewegung aus, selbst bei beschleunigten Zielen (Zago et al.,
  2004). Auch bei der Zeitschätzung wird Beschleunigung kaum genutzt; die Handlung wird etwa 200 ms vor Bewegungsbeginn
  geplant (Benguigui et al., 2003). Die leichte Beschleunigung ab Stufe 8 kann daher dazu führen, dass man etwas zu spät
  tippt (eigene Deutung).
- **Erwartungen aus dem Vorgänger:** Die Geschwindigkeit des vorherigen Ziels verzerrt die Treffpunkte beim nächsten (de
  Lussanet et al., 2001); bei mehreren Zielen mit unterschiedlichem Tempo ist mit solchen Fehlern zu rechnen.
- **Laufende Korrektur:** Abfangbewegungen werden fortlaufend an die neueste Sehinformation angepasst; die
  visuomotorische Latenz betrug 114 ms, gleich für Tippen und Wischen (Brenner et al., 2026).

„Trainiert Region X“ lässt sich daraus nicht ableiten.

## 6. Motorische Grundlagen

- **Zielbewegung zu bewegtem Ziel:** schneller Anfangsimpuls plus visuelle Endkorrektur (Elliott et al., 2010); die
  Bewegungszeit steigt mit log₂(2A/W) (Fitts, 1954), bei bewegten Zielen zusätzlich mit dem Tempo. Beim Anklicken
  bewegter Ziele liegen die Endpunkte hinter dem Ziel, umso mehr, je schneller es ist (Maus, n = 12; Huang et al., 2018).
- **Latenz und Treffpunkt:** Der Treffer wird an der Position geprüft, die zuletzt gezeigt wurde; Geräte mit längerer
  Tipp-Latenz sind dadurch nicht systematisch benachteiligt. Die Verzögerung von Anzeige und Eingabe verschiebt dennoch den
  Zeitpunkt des Fangs (Casiez et al., 2017), weshalb nur der Vergleich mit sich selbst am selben Gerät sinnvoll ist.
- **Touch und Maus:** Touch verkürzte die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013).
  Die Trefferfläche ist größer als das sichtbare Ziel (Radius mindestens 26 px) und liegt bei üblicher Darstellung über
  der für Touch empfohlenen Zielgröße von 9,2 mm (Parhi et al., 2006). Die tippende Hand verdeckt den unteren Feldteil,
  in den die Ziele hineinfallen.
- **Tremor:** physiologisch etwa 8–12 Hz, bei Parkinson 3–6 Hz (McAuley & Marsden, 2000); kleine, schnelle Ziele belasten
  zitternde oder schmerzende Hände.

## 7. Einflussfaktoren und Messgrenzen

- **Feldgröße und Format:** Die Fallzeit ist in Sekunden festgelegt und von Bühnengröße und Bildrate unabhängig; Hoch- und
  Querformat fordern gleich viel Zeit. Die Strecke in Zentimetern und damit das Tempo in Grad je Sekunde hängen aber von der
  Bildschirmgröße ab; verglichen wird nur bei gleicher Darstellung.
- **Gerät:** Browser-Messungen enthalten 58–133 ms Geräteanteil (Pronk et al., 2020); Tablet-Latenz verschiebt zusätzlich
  den Zeitpunkt des Fangs. Messungen am Menschen streuen von Ziel zu Ziel; aussagekräftiger sind der Mittelwert über viele
  Ziele und der Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 43–44).
- **Selbstregulierung:** Die Stufe passt sich nach Erfolg an (steigt nach drei gefangenen Zielen in Folge, sinkt nach einem
  Fehler); zufällige Positionen lassen die Schwierigkeit einzelner Ziele schwanken.
- **Messgrößen:** Die Fanghöhe (100 % = gerade erschienen, 0 % = am Boden) sagt, wie früh man fängt; dazu kommen die Zahl
  der gefangenen Ziele und die Stufe. Eine Reaktionszeit wird nicht gemessen. Kennzahlen kommerzieller Zielübungs-Programme
  können sehr zuverlässig sein (ICC 0,947–0,995, Pilotstudie mit n = 10), in einer von vier Aufgaben verbesserten sich
  Genauigkeit und Treffer je Sekunde aber schon zwischen zwei Terminen (Rogers et al., 2024).
- **Alter:** Das reine Entdecken ist altersunabhängig (etwa 131 ms), die motorischen Anteile verlangsamen sich (Woods et
  al., 2015). Ältere (> 55 J.) blicken beim Abfangen vorausschauender und starten früher, bei vergleichbarer
  Trefferleistung (Gerharz & Voudouris, 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Abfang- und Zeigeaufgaben werden durch Wiederholung schneller und genauer; ein Teil ist
  Gewöhnung an Gerät, Tempo und Strategie. Bei digitalem Sport-Sehtraining war der Reaktionseffekt in
  trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** keine Studie zu dieser Übung; Meta-Analysen zu Actionspielen widersprechen sich (Bediou
  et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte). Zum Transfer von
  Abfangübung auf andere Aufgaben gibt es keine direkte Studie; dass sich eingefahrene Bewegungserwartungen durch Übung
  nur verschieben statt abschalten (Zago et al., 2004), ist ein Hinweis auf Aufgabengebundenheit, kein Transferbeleg
  (eigene Deutung).
- **Alltagstransfer (fehlend):** kein Beleg für Ballsport, E-Sport, Verkehr oder Beruf; ein Ferntransfer allgemeiner
  Wahrnehmungs- und Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise

- **Passt, wenn …** bewegte Ziele mit Blick und Hand abgefangen werden sollen, mehrere Ziele im Blick behalten und das
  dringendste gewählt werden soll, jemand Freude an steigendem Tempo hat; als Einstieg in Abfangaufgaben (die ersten
  Stufen sind langsam, mit großer Trefferfläche).
- **Weniger passend, wenn …** eine echte Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle im Mittelpunkt
  stehen soll (102/Stopp & Los, 802; hier nur als Beiwerk ab Stufe 9), eine symbolische Wahlreaktion gemeint ist
  (202/Pfeil-Duell) oder ruhig ohne Zeitdruck geübt werden soll.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung kommt ohne Blitze, Wackeln und rote Warneffekte
    aus; bei bekannter Lichtempfindlichkeit dennoch kurze Sitzungen.
  - `presbyopie_gleitsicht`: senkrechter Blickweg über das ganze Feld – Bildschirmbrille, Monitor tiefer.
  - `nystagmus`: Die Blickfolge bewegter Ziele ist Kernbestandteil; niedrige Stufen wählen oder 302 (ruhende Ziele).
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Ziele entstehen am oberen Rand über fast die ganze Breite;
    Ziele auf der Ausfallseite entkommen unbemerkt (Ausfälle lassen sich nach dem Verlauf der Sehbahn einordnen; Muchnick,
    2008, S. 32).
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: seltenes Blinzeln und anhaltendes Verfolgen fallender Ziele –
    kurze Sitzungen, Pausen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: schnelle, kleine Ziele.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: zunehmender Zeitdruck – eher als Spiel auf niedriger Stufe,
    nicht als Test.
  - Doppelbilder, plötzlicher einseitiger Sehverlust, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern sind
    Anlass zur ärztlichen Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28). Bei Beschwerden während der Übung
    pausieren oder abbrechen.
- **Kombiniert gut mit …** 413 (senkrechte Blickfolge ohne Hand), 101 (Reaktion ohne Zielbewegung), 404 (ruhige
  Blickfolge ohne Zeitdruck).
- **Überschneidungen:** **802** ist fast dieselbe Aufgabe (fallende Kugeln abfangen) mit Go/No-Go-Regel – nicht beide
  hintereinander vorschlagen. Ruhende Ziele zeigen 302, 303, 307 und 308, bewegte 304, 305 und 306; pro Einheit
  höchstens eine davon, allenfalls eine zweite mit anderem Schwerpunkt. **302** ist am nächsten (mehrere Ziele
  gleichzeitig, dort ruhend). **104/Zielfang** übt das Abfangen eines bewegten Ziels mit adaptiver Stufe und fester Dauer –
  ruhigere Alternative, nicht zusätzlich. **304/305** fangen waagrecht schwingende bzw. abprallende Einzelziele ab,
  **515** senkrechte Flugbahnen mit Schwerkraft (Kapitel Zielen). **101** und **503** messen echte einfache Reaktion am
  festen Ort, **102** Impulskontrolle, **202** Wahlreaktion nach Regel.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tempo in Sehwinkel bzw. Fallzeit** statt px/s, Feld auf feste Größe begrenzen (≈ 15–20° hoch) – sonst ändert jede Fenstergröße die Aufgabe; Gleitsicht profitiert von geringer Höhe.
- **Ehrliche Messgrößen:** Abfanghöhe, Treffpunkt vor/hinter dem Ziel (wie Zielfang), entkommene Ziele; keine „Reaktion“ aus Fallzeiten, keine Noten wie „LEGENDARY“.
- **Latenz berücksichtigen:** Trefferprüfung an der zuletzt gezeigten Position (oder mit gemessenem Vorlauf), damit Tablets nicht systematisch benachteiligt werden.
- **Feste Rundendauer** (z. B. 45–60 s), Stufe adaptiv in beide Richtungen (z. B. 3-down/1-up wie Zielfang) statt an Combo-Punkte gekoppelt; Zielzahl gleichzeitig begrenzen (2–3).
- **Kein roter Blitz, kein Wackeln:** dezente, farbunabhängige Rückmeldung (Symbol + Ton), WCAG 2.3.1 einhalten.
- **Tablet zuerst:** Trefferzone ≥ 10 mm, Ziele nicht unter ≈ 0,5°, untere Feldzone freihalten (Hand verdeckt sie); Texte DE/IT, „Übung“ statt „Reaktionstest“/„Reflexe“, keine Leistungsversprechen.

## 11. Quellen

### Von der Website angegeben

- Kosinski, R. J. (2008). *A literature review on reaction time.* Clemson University – **Prüfung:** keine DOI, unbegutachtetes Online-Skript; auffindbar nur die Fassung 2013 (http://www.cognaction.org/cogs105/readings/clemson.rt.pdf); **stützt die Aussage der Website:** teilweise (≈ 190 ms für Licht, Computermessungen ≈ 268 ms; für die Übungsbänder und für Abfangaufgaben ohne Bezug).
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (gilt für symbolische Wahlreaktionen; bei direktem Zeigen auf sichtbare Ziele nahezu flach, Proctor & Schneider 2018).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Gerät beeinflusst den Wert“, nein für die Bänder (nur einfache RT, 231 bzw. 213 ms).
- Donders, F. C. (1969). On the speed of mental processes (Übersetzung der Arbeit von 1868). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (Übersetzung 1969; Website nennt 1868 und die Übersetzung korrekt); **stützt:** teilweise (einfache vs. Wahlreaktion als Verarbeitungsstufen; zu bewegten Zielen sagt Donders nichts; Inhalt über Sekundärquellen).

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
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Gesichtsfeldausfälle nach Sehbahnverlauf, Warnzeichen mit ärztlichem Abklärungsbedarf (Kap. 1, S. 6; Kap. 3, S. 28, 32)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit von Messungen am Auge, Mehrfachmessung (S. 43–44)
