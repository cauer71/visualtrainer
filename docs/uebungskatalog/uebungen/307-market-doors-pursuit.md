---
# ===== Kennung =====
nr: 307
kennung: market-doors-pursuit
name: "Fünf Türen – Ziel an zufälliger Öffnung anklicken"
name_original: "Aim-Training: Winkel prüfen (Seitentitel: Aim-Training: Winkel prüfen | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In einer Reihe stehen fünf dunkle Türöffnungen. In einer zufällig gewählten Tür erscheint plötzlich ein roter Punkt; man bringt den Zeiger hin und klickt oder tippt ihn an, bevor er wieder verschwindet. Mit den Punkten werden die Ziele kleiner, kürzer sichtbar und folgen dichter aufeinander."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code sinken von Level 1 bis 15 die Anzeigedauer 1.300 → 380 ms, der Zielradius 28 → 12 px, die Pause bis zum nächsten Ziel 550–750 → 147–206 ms und die unsichtbare Trefferzugabe 14 → 5 px. Eine Serie (Combo, bis Faktor 3,0 ab 50 Treffern) verkürzt zusätzlich bis −32 % Anzeigedauer, −25 % Radius, −30 % Pause, −50 % Zugabe. Rundenuhr: Start 45 s, +2 s je Treffer (max. 60 s), −1 s je Fehlklick oder Timeout."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + Timeouts)", "'Ø Reaktion' = Zeit vom Erscheinen bis zum Treffer, nur Treffer (enthält Zeigerbewegung und Gerätelatenz)", "höchstes Level, maximale Combo", "sinnvoll: Zeit getrennt nach Abstand zur vorherigen Zeigerposition, Timeouts je Tür (links/rechts), Anteil der Treffer an äußeren Türen"]

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
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 1
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "ruhende Ziele von ≈ 1,5° bis ≈ 0,5° Sehwinkel erkennen", "waagrechtes Blickfeld von ≈ 23° (in der Seite) bzw. ≈ 39° (Vollbild am Monitor) überblicken", "kein Farbsehen nötig (Ziel immer rot mit weißem Kern auf Fast-Schwarz)", "Querformat: im Hochformat-Vollbild und am Handy hochkant nur 4 Türen im 2 × 2-Raster"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["auf ein plötzlich an einem von fünf bekannten Orten erscheinendes Ziel mit Blick und Zeiger reagieren (räumliche Wahlreaktion mit Zeigen)", "Auge-Hand-Koordination und schnelle, kurze Zielbewegungen in waagrechter Richtung üben", "Strategie üben: Zeiger in der Mitte auf Zielhöhe bereithalten statt zu raten", "Aufwärmen vor FPS-Übungen mit ruhenden Zielen (501, 508, 511)"]
weniger_geeignet_fuer: ["Messung der Reaktionszeit (Wert enthält Zeigerweg, Gerätelatenz und nur Treffer)", "visuelle Suche zwischen Ablenkern (es gibt nur ein Ziel, das sofort hervorsticht; dafür 103)", "Impulskontrolle (keine Nicht-Klick-Reize; dafür 102, 511)", "Menschen, die ohne Zeitdruck üben sollen", "Gleitsichtträger:innen im Vollbild (äußere Türen weit außerhalb der klaren Zwischenzone)", "Lichtempfindliche: roter Fehlerblitz bei jedem Fehler, standardmäßig an"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Zeige- und Reaktionsaufgaben werden durch Übung deutlich besser (auch durch Gewöhnung an Gerät und Strategie), Effekte auf unähnliche Tests sind viel kleiner, ein Nutzen für E-Sport, Sport oder Verkehr ist nicht belegt (Guo et al. 2025; Simons et al. 2016; Fransen 2024)."
aehnliche_uebungen: [303, 308, 511, 501, 508, 503, 101, 202, 702, 704, 302, 401, 306, 102]
stichworte: ["räumliche Wahlreaktion", "Zeigen", "Auge-Hand-Koordination", "abrupt erscheinendes Ziel", "Sakkaden waagrecht", "Fitts'sches Gesetz", "Vorab-Positionierung", "Crosshair Placement", "Winkel prüfen (Name des Originals)", "Zeitdruck", "Combo", "Touch"]
---

# 307 · Fünf Türen – Ziel an zufälliger Öffnung anklicken

> Original: „Aim-Training: Winkel prüfen“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) ·
> Blickfit: noch nicht umgesetzt (verwandt: `blitzreaktion` = 101, Reaktion in der Mitte und am Rand ohne Zielen)

## 1. Kurzbeschreibung

Auf einem fast schwarzen Feld stehen fünf schmale, kaum sichtbare Türöffnungen nebeneinander. Nach einer kurzen Pause erscheint in einer zufällig gewählten Tür plötzlich ein roter Punkt mit weißem Kern. Man führt den Zeiger dorthin und klickt oder tippt ihn an, bevor er wieder verschwindet. Treffer bringen Punkte und Zeit, Fehlklicks und verpasste Ziele kosten Zeit und brechen die Serie. Trotz des Titels „Winkel prüfen“ muss man nichts absuchen: Es ist eine räumliche Wahlreaktion mit schneller Zeigebewegung zu einem von fünf festen Orten.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und ausgelieferter Spielcode (Chunk `74130-…js`, gemeinsame Module für Schwierigkeit, Combo, Strafe und Effekte; geladen am 29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung**: Monitor 24″ Full-HD in 60 cm (≈ 37,8 px/°), Tablet 11″ in 40 cm (≈ 36,4 CSS-px/°).

- **Ablauf:** Start → Countdown 3-2-1-GO (≈ 2,45 s, Töne) → Spiel → Ergebnis (Punkte, Genauigkeit, Ø Reaktion, Treffer, Fehlklicks, Timeouts, höchstes Level, maximale Combo, Buchstabennote). Escape oder Verlassen des Vollbilds bricht ab.
- **Spielfeld:** 16:9 in der Seite (mind. 460–500 px hoch, typisch ≈ 1.120 × 630 px) oder Vollbild; Grund #050508 mit kaum sichtbarem 40-px-Raster. **Querformat:** 5 Türen je 96 × 160 px (≈ 2,5° × 4,2°; Obergrenzen, auch im Vollbild), Rahmen rot mit 35 % Deckkraft, Beschriftung „D-01“ … „D-05“ in 10-px-Schrift mit 20 % Deckkraft. Die Reihe nimmt 85 % der Breite ein und sitzt mittig in der Höhe. Abstand benachbarter Türmitten in der Seite ≈ 214 px ≈ 5,7°, äußere Türen ≈ 856 px ≈ 22,4° auseinander; im Vollbild (1.920 px) ≈ 10,1° bzw. ≈ 39°; am iPad quer ≈ 5,8° bzw. ≈ 22,8°. **Hochformat** (Höhe > Breite, also Handy hochkant oder Tablet-Vollbild hochkant): nur **4 Türen im 2 × 2-Raster** (je 25 % Breite × 20 % Höhe) – dann auch senkrechte Blickwechsel.
- **Ziel:** Kreis #ef4444 mit Leuchtsaum und weißem Kern, **erscheint schlagartig** (kein Herausschieben aus einer Kante) in einer gleich wahrscheinlich gewählten Tür, **Wiederholung derselben Tür möglich** (je 20 %). Position: Türmitte ± 15 % der Türbreite, fast immer auf 40 % der Türhöhe (± 10 %) – die Zielhöhe ist also praktisch fest. Das Ziel steht still. Bei Touch, Fenster < 768 px oder Mobilgerät: Radius +2 px, Trefferzugabe +10 px.
- **Schwierigkeit:** Fortschritt p = (Level − 1)/14, exponentieller Verlauf wie in 302–308 (Literaturbasis W03). Werte ohne Combo (Monitor, eigene Umrechnung):

| Level (Punkte) | Ø Ziel | Anzeigedauer | Pause bis nächstes Ziel | Trefferzone Ø (Maus) |
|---|---|---|---|---|
| 1 (0) | 56 px ≈ 1,5° | 1.300 ms | 550–750 ms | 84 px ≈ 2,2° |
| 5 (7.000) | 47 px ≈ 1,2° | 1.055 ms | 443–605 ms | 71 px ≈ 1,9° |
| 10 (15.750) | 35 px ≈ 0,9° | 683 ms | 280–385 ms | 50 px ≈ 1,3° |
| 15 (24.500) | 24 px ≈ 0,6° | 380 ms | 147–206 ms | 34 px ≈ 0,9° |

- **Combo:** Faktor 1,1/1,25/1,35/1,5/1,75/2/2,5/3,0 ab 3/5/7/10/15/20/30/50 Treffern in Folge; Punkte je Treffer = 100 × Faktor × (1 + 0,5 p). Bei Faktor 3,0: Anzeigedauer Level 1 884 ms, Level 15 258 ms; Ø Ziel Level 15 18 px ≈ 0,48°.
- **Fehler:** Klick daneben oder Ablauf der Anzeigedauer → Combo 0, **−1 s**, Bildwackeln (6 px, klingt pro Bild ab), Ton, **roter Fehlerblitz** (gemeinsame Effektkomponente wie in 306: radialer Verlauf, ≈ 0,45 s; standardmäßig an, in der Übung abschaltbar). Das Timeout hängt an einer globalen Einstellung (standardmäßig an, in dieser Übung nicht umschaltbar); ohne sie bliebe das Ziel bis zum Treffer stehen.
- **Zeit:** Start 45 s, **+2 s je Treffer** (max. 60 s). *Eigene Abschätzung:* Bei Level 1 dauert ein Zyklus (Pause ≈ 0,65 s + Reagieren und Zeigen ≈ 0,5–0,9 s) weniger als 2 s – wer sicher trifft, lässt die Uhr steigen, eine Runde kann dann mehrere Minuten dauern (≈ 70–90 Treffer bis Level 10). Sie endet erst, wenn Timeouts überwiegen.
- **Eingabe/Timing:** Pointer beim Drücken (Maus, Stift, Finger; ein Fadenkreuz folgt dem Zeiger, am Touchgerät nur am Berührpunkt). Keine Tastatur außer Escape. Die Anzeigedauer wird in Echtzeit ab dem Erscheinen gemessen (Zeitstempel beim Erzeugen des Ziels), die Rundenuhr mit der Bildzeit (dt, pro Bild höchstens 100 ms) → beides bildfrequenzunabhängig; nur Partikel und Wackeln laufen pro Bild (rein optisch).
- **Note:** 100 × √(Punkte/18.000) → „S+ LEGENDARY“ ab 16.245 Punkten.

**Widersprüche Regeltext ↔ Code:** (1) „+0,6 s“ je Treffer – Code +2 s. (2) „Combo zurück (−0,8 s)“ – Code −1 s, und zwar **immer** (die allgemeine Einstellung „ohne Zeitstrafe“ wird übergangen; der Rat, den „Strafmodus“ konstant zu halten, läuft ins Leere). (3) „Scanroute von links nach rechts festlegen“, „jeden Winkel einzeln prüfen“ – die Tür ist **zufällig**, es gibt keine Reihenfolge. (4) „An der Kante des nächsten Durchgangs warten“ – das Ziel erscheint in der Türmitte, nicht an einer Kante. (5) „fünf Durchgänge, horizontale Sichtwechsel“ – im Hochformat vier Türen im Raster.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt den Drill als „kompakte visuelle Suchschleife“ für FPS-Spieler: schnelle horizontale Sichtwechsel, Winkelprüfung, kleine Fadenkreuzkorrekturen statt „blinder Flicks“. Sie sagt korrekt, der Score sei „kein isolierter Wert für eine Gehirnfunktion“ und keine echte Reaktionszeit, nur gleiche Setups seien vergleichbar, und der Drill ersetze weder Map noch Netzwerk. Die Leistungsreferenz (Reaktionsfenster > 310 ms „Basis“ bis < 150 ms „Nur Referenz“, Genauigkeit < 78 % bis ≥ 98 %) ist als „keine Perzentile“ gekennzeichnet. Das ist zurückhaltend. Einordnung:

- **Keine Suche im engeren Sinn:** Es gibt nur ein Ziel, es erscheint schlagartig und hebt sich in Farbe und Helligkeit stark ab. Ein plötzlich erscheinendes Objekt zieht die Aufmerksamkeit von selbst auf sich (Yantis & Jonides, 1984). Die Leistung hängt daher kaum am Absuchen, sondern an Entdecken, Blicksprung und Zeigebewegung.
- **Die empfohlene Links-rechts-Scanroute schadet eher:** Da jede Tür gleich wahrscheinlich ist, verkürzt Warten **in der Mitte** den mittleren Zeigerweg gegenüber der linken Tür von ≈ 428 auf ≈ 257 px (−40 %, eigene Rechnung). Aufmerksamkeit lässt sich zudem kaum auf mehrere nicht benachbarte Orte zugleich vorbereiten (Posner et al., 1980). Sinnvoll ist dagegen der Rat, den Zeiger **auf Zielhöhe** zu halten – das Ziel erscheint fast immer auf derselben Höhe, die Bewegung wird dadurch rein waagrecht.
- **Reaktions-Bänder:** „Ø Reaktion“ enthält einfache Reaktionszeit (213–231 ms; Woods et al., 2015), Browser-/Geräteanteil (58–133 ms; Pronk et al., 2020) und die Zeigerbewegung. Werte < 310 ms sind nach dieser Summe (*eigene Abschätzung*) praktisch nur erreichbar, wenn der Zeiger schon an der richtigen Tür steht; < 150 ms ist bei zufälligem Ort und schwankendem Zeitpunkt als echte Reaktion kaum möglich (schon das reine Entdecken dauert ≈ 131 ms; Woods et al., 2015). Weil nur Treffer zählen und bei hohem Level vor allem die weit entfernten Ziele verfallen, „verbessert“ sich der Mittelwert zusätzlich von selbst (Auswahlverzerrung, eigene Analyse).
- **Hick/Donders:** Fünf Orte sind fünf Alternativen, aber das Zeigen auf einen sichtbaren Ort ist hoch kompatibel; der Hick-Anstieg ist dann nahezu flach (Proctor & Schneider, 2018), Blicksprünge zu sichtbaren Zielen folgen Hick gar nicht (Kveraga et al., 2002). Die Stufenlogik Wahrnehmen – Auswählen – Ausführen (Donders) ist korrekt.
- **„Kleine Korrektur statt großer Flick“:** passt zu Fitts (1954) und zum Zwei-Komponenten-Modell (Elliott et al., 2010): Kürzere Wege aus einer guten Ausgangslage sparen Zeit; schnelle weite Bewegungen erhöhen die Streuung (Speed-Accuracy-Trade-off; Heitz, 2014).
- **Noten „LEGENDARY“** beruhen nur auf dem Punktestand, ohne Datengrundlage. Die Quelle Krauzlis (2004, Folgebewegung) passt nicht, die Ziele stehen still.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Ziele 1,5° (Level 1) bis 0,6° (Level 15), bei hoher Combo ≈ 0,5°; für normale Sehschärfe groß und kontrastreich. Begrenzend ist das rasche Entdecken außerhalb der Blickmitte, nicht das Detail.
- **Exzentrizität und Blicksprünge:** Wartet man in der Mitte, liegen die Ziele in der Seite bei 0°, ≈ 5,7° oder ≈ 11,3° (Vollbild bis ≈ 20°). Die Sakkadenlatenz ist zwischen 0,75° und 12° am kürzesten und steigt nach außen langsam an (Kalesnykas & Hallett, 1994). Eine 10°-Sakkade dauert ≈ 40 ms (Gibaldi & Sabatini, 2021). Bis ≈ 20° dreht sich der Kopf kaum mit (< 5°), darüber zunehmend (Freedman, 2008) – im Vollbild werden Kopfbewegungen nötig.
- **Bildschirm:** Die Ziele stehen still, Bewegungsunschärfe spielt keine Rolle. Ende-zu-Ende-Latenz Maus → Bild 21–37 ms (120 bzw. 60 Hz), Tippen am Tablet 48–276 ms je nach Gerät und Toolkit (Casiez et al., 2017); das verlängert die gemessene Zeit, verschiebt aber anders als bei bewegten Zielen (306) nicht den Treffpunkt.
- **Gleitsicht/Alterssichtigkeit:** Die Türreihe ist in der Seite ≈ 23° breit, im Vollbild ≈ 39°. Der klare Zwischenbereich von Gleitsichtgläsern ist nur ≈ 13–18° breit (Han et al., 2003): Die äußeren Türen sieht man durch die unscharfen Seitenzonen, wenn man den Kopf nicht dreht. Gleitsichtträger halten den Kopf am Bildschirm zudem ≈ 7° höher (Jaschinski et al., 2015). Besser: Bildschirm-/Arbeitsplatzbrille, kein Vollbild, Reihe auf Augenhöhe oder leicht darunter. Am Tablet in ≈ 35–40 cm brauchen Alterssichtige eine Nahkorrektur (Presbyope halten schon Smartphones im Mittel weiter weg, ≈ 40 statt ≈ 33 cm; Boccardo et al., 2023).
- **Trockenes Auge:** Am Bildschirm sinkt die Blinzelrate im Mittel auf ≈ ein Fünftel (Patel et al., 1991); bei kurzen Anzeigezeiten blinzelt man plausibel eher noch seltener (für diese Übung nicht gemessen).
- **Farbe/Kontrast:** Rot auf Fast-Schwarz mit weißem Kern; bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) wirkt Rot dunkler, der weiße Kern bleibt gut sichtbar (eigene Einschätzung). Die Türen selbst sind sehr kontrastarm, für die Aufgabe aber unwichtig.

## 5. Neurowissenschaftliche Grundlagen

Zu dieser Aufgabe gibt es keine Bildgebungs- oder Trainingsstudie; die Website nennt keine Hirnregionen. Relevante Befunde aus der Grundlagenforschung:

- **Aufmerksamkeitsfang durch plötzliches Erscheinen:** Objekte mit abruptem Beginn werden bevorzugt verarbeitet (Yantis & Jonides, 1984). Für das Entdecken ist ein Vorab-Absuchen der Türen deshalb unnötig.
- **Aufmerksamkeit und Blicksprung sind gekoppelt:** Vor einer Sakkade wird die Aufmerksamkeit zwingend auf das Sakkadenziel gelenkt; benachbarte Orte werden dann kaum verarbeitet (Deubel & Schneider, 1996). Das Auge springt meist zuerst, die Hand folgt ≈ 100 ms später (Prablanc et al., 1979).
- **Räumliche Erwartung:** Ein gültiger Hinweis auf den Reizort verkürzt die Entdeckungszeit; Aufmerksamkeit lässt sich aber kaum auf zwei nicht benachbarte Orte zugleich richten (Posner et al., 1980). Bei fünf gleich wahrscheinlichen Türen gibt es keinen gültigen Hinweis – nur die Zielhöhe und der ungefähre Zeitpunkt (Pause 550–750 ms bei Level 1) sind vorhersehbar.
- **Wahl mit hoher Reiz-Reaktions-Kompatibilität:** Zeigen und Blicken auf den Reizort brauchen kaum Zuordnungsarbeit (Proctor & Schneider, 2018; Kveraga et al., 2002) – anders als die symbolische Wahlreaktion in 202 (Pfeil-Duell).

„Trainiert Region X“ lässt sich daraus nicht ableiten.

## 6. Motorische Grundlagen

- **Zielbewegung:** Die Bewegungszeit steigt mit log₂(2A/W) (Fitts, 1954); schneller Anfangsimpuls plus visuelle Endkorrektur (Elliott et al., 2010). Maus-Durchsatz nach ISO-Methode 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004).
- **Schwierigkeitsindex je Weg** (*grobe eigene Abschätzung*, Trefferzone als Zielbreite, Monitor in der Seite): Level 1 → Nachbartür 2,4 bit, zwei Türen 3,4 bit, ganze Reihe 4,4 bit; Level 10 → 3,1 / 4,1 / 5,1 bit. Mit Bewegungszeit ≈ ID/Durchsatz (3,7–4,9 bit/s) plus Reaktion (≈ 0,3 s) ist ein Weg über die ganze Reihe schon bei Level 1 knapp (≈ 1,2–1,5 s gegenüber 1,3 s Anzeigedauer), Ziele zwei Türen entfernt reichen ab etwa Level 5–7 (Anzeigedauer ≈ 1,06–0,91 s) kaum noch; bei Level 15 (380 ms) praktisch nur noch Ziele an der Zeigerposition. Hohe Level belohnen also Ausgangslage und Glück beim Zufallsort.
- **Touch vs. Maus:** Touch verkürzte die Bewegungszeit bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013); am Tablet entfällt der Zeigerweg zum Teil, die Hand muss aber über die Reihe wandern und verdeckt Türen. Trefferzone am Tablet: Level 1 ≈ 21 mm, Level 15 ≈ 11 mm, mit maximaler Combo ≈ 9,6 mm – über der Empfehlung von 9,2 mm (Parhi et al., 2006); sichtbar sind dann aber nur ≈ 4–5 mm (eigene Rechnung).
- **Tremor:** physiologisch mit zentralem Anteil um ≈ 10 Hz, Parkinson 3–6 Hz (McAuley & Marsden, 2000); kleine Ziele unter Zeitdruck belasten zitternde oder schmerzende Hände.

## 7. Einflussfaktoren und Messgrenzen

- **Feldgröße ändert die Aufgabe:** Türgröße ist auf 96 × 160 px begrenzt, der Abstand wächst mit der Breite. Im Vollbild sind die Wege fast doppelt so lang wie in der Seite, im Hochformat gibt es nur vier Türen. Punkte und Level sind nur bei gleicher Darstellung vergleichbar.
- **Gerät:** Browser-Messungen enthalten 58–133 ms Geräteanteil (Pronk et al., 2020); geringere lokale Latenz verbesserte in einem Shooter die Trefferquote (Liu et al., 2021). Nur Selbstvergleich am selben Gerät ist sinnvoll.
- **Strategie statt Fähigkeit:** Wo der Zeiger wartet (Mitte, Zielhöhe), bestimmt einen großen Teil der Zeit; der Zufallsort lässt einzelne Durchgänge stark schwanken.
- **Rückkopplung:** Combo erhöht Punkte (bis × 3), damit Level und Schwierigkeit; das Level sinkt nie, die Rundendauer hängt am Erfolg. „Ø Reaktion“ ist durch die Auswahl der Treffer verzerrt (Abschnitt 3). Aim-Trainer-Kennzahlen können sehr zuverlässig sein (ICC 0,947–0,995 bei nur 10 Esportlern an 2 Terminen, anderes Programm), zeigen aber teils Lerneffekte zwischen Terminen (Rogers et al., 2024).
- **Alter:** Das reine Entdecken ist altersunabhängig (≈ 131 ms), die motorischen Anteile werden langsamer (Woods et al., 2015); die Wahl-RT verlangsamt sich über das ganze Erwachsenenalter (Der & Deary, 2006).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Zeige- und Reaktionsaufgaben werden durch Wiederholung schneller und genauer; ein Teil ist Gewöhnung an Gerät, Regeln und Wartestrategie. Bei digitalem Sport-Sehtraining war der Reaktionseffekt in trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025). Die einfache Reaktionszeit selbst ist kaum übbar (Basner et al., 2018).
- **Naher Transfer (schwach):** keine Studie zu dieser Übung. Sakkaden-Latenztraining wirkte in einer Einzelfallübung nur an der geübten Position (Di Russo et al., 2003); Meta-Analysen zu Actionspielen widersprechen sich (Bediou et al., 2018: g = 0,34 mit Publikationsbias; Sala et al., 2018: kleine bis keine Effekte).
- **Alltagstransfer (fehlend):** kein Beleg für E-Sport („Ecken checken“ im Spiel), Sport, Verkehr oder Beruf; Ferntransfer allgemeiner Wahrnehmungs-/Kognitionstrainings auf Sport ist nicht belegt (Fransen, 2024; Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelle Reaktion mit Blick und Zeiger auf einen von wenigen bekannten Orten geübt werden soll, waagrechte Auge-Hand-Folgen gefragt sind oder jemand eine einfache, gut verständliche Spielregel mit steigendem Tempo mag; auch als Strategieübung („bereit in der Mitte, auf Zielhöhe“).
- **Weniger passend, wenn …** eine saubere Reaktionszeit gefragt ist (101/Blitzreaktion, 503), Impulskontrolle geübt werden soll (102/Stopp & Los, 511), eine symbolische Wahlreaktion gemeint ist (202/Pfeil-Duell), echte Suche zwischen Ablenkern (103/Suchbild) oder ruhiges Üben ohne Zeitdruck.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Fehlerblitz (standardmäßig an) bei jedem Fehlklick und Timeout; meist einzeln, bei Dauerklicken rechnerisch > 3/s möglich (WCAG-2.3.1-Grenze; nicht gemessen). Blitz abschalten.
  - `presbyopie_gleitsicht`: äußere Türen außerhalb der klaren Zwischenzone – kein Vollbild, Bildschirmbrille, Kopf mitdrehen.
  - `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`: Ziele bis ≈ 11° (Vollbild ≈ 20°) seitlich und bis ≈ 0,5° klein; Ziele auf der Ausfallseite verfallen unbemerkt.
  - `trockenes_auge_bildschirm`: seltenes Blinzeln im Schnellspiel; kurze Runden, Pausen.
  - `tremor_parkinson`, `hand_arm_beschwerden`: kleine Ziele unter Zeitdruck, Runden ohne Pausenfunktion, die sich bei Erfolg verlängern.
  - `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`: sich verschärfender Zeitdruck, Rückmeldung mit Blitz, Ton und Wackeln – eher als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 101 (Reaktion ohne Zielen, Mitte/Rand), 303 (gleiche Idee mit 12 Orten und größeren Sprüngen), 511/308 (Warten an einer Kante, Pre-Aim), 702 (Zielen ohne Zeitlimit je Ziel).
- **Überschneidungen:** **303** ist fast dieselbe Aufgabe (ein Ziel an einem von 12 Rasterpunkten, gleiche Level-, Combo- und Zeitregeln) – nicht beide hintereinander vorschlagen. **308** und **511** lassen das Ziel an einer Kante auftauchen und belohnen Vorab-Positionierung, 511 zusätzlich mit Köder-Zielen und Frühklick-Strafe. **501/508** (FPS) sind Flicks zu völlig zufälligen Orten. **101** und **503** messen einfache Reaktion am festen Ort ohne Zeigerweg, **102** Impulskontrolle, **202** symbolische Wahlreaktion – all das fehlt hier.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrliche Messung:** Reaktionsbeginn (erste Zeigerbewegung) und Bewegungszeit getrennt erfassen, Zeiten nach Weglänge und Seite auswerten, Timeouts mitzählen; keine „Reaktionszeit“ nur aus Treffern, keine Noten wie „LEGENDARY“.
- **Feste Geometrie in Sehwinkel:** Türabstand und Reihenbreite begrenzen (z. B. ≤ 15–18° gesamt), damit Fenstergröße und Vollbild die Aufgabe nicht ändern; kommt Gleitsichtträger:innen entgegen.
- **Regeltext und Mechanik angleichen:** entweder echte Reihenfolge (Scanroute) oder klar „zufällige Tür“; Tipps zur Wartestrategie (Mitte, Zielhöhe) statt „Kante“.
- **Feste Rundendauer** (45–60 s), Stufe adaptiv in beide Richtungen (z. B. 3-down/1-up wie Zielfang) statt an Combo-Punkte gekoppelt.
- **Kein roter Blitz, kein Wackeln:** dezente, farbunabhängige Rückmeldung (Symbol + Ton), WCAG 2.3.1 einhalten.
- **Tablet zuerst:** Querformat erzwingen oder Hochformat gleichwertig gestalten, Trefferzone ≥ 10 mm; Texte DE/IT, „Übung“ statt „Aim-Training/Test“, keine Leistungsversprechen.

## 11. Quellen

### Von der Website angegeben

- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin, 124*(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – **Prüfung:** DOI stimmt ✓ (nur Abstract); **stützt die Aussage der Website:** teilweise (allgemeine Übersicht zu Augenbewegungen bei Lesen und Informationsverarbeitung; zu dieser Aufgabe mit einem auffälligen Einzelziel nicht spezifisch).
- Donders, F. C. (1969). On the speed of mental processes (Übersetzung des Originals von 1868). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 – **Prüfung:** DOI stimmt ✓ (Website nennt 1868 und die Übersetzung 1969 korrekt; Inhalt über Sekundärquellen); **stützt:** teilweise (Verarbeitungsstufen Wahrnehmen – Auswählen – Ausführen korrekt; Zeigebewegung und Browserlatenz behandelt Donders nicht).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** nein (Folgebewegung; die Ziele dieser Übung stehen still).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:** ja für „Gerät und Bedingungen beeinflussen den Wert“; nein für die Reaktions-Bänder (nur einfache RT, 231 bzw. 213 ms; keine Zeigeaufgabe).

### Weitere Fachliteratur

Alle DOIs am 29.09.2026 per Crossref geprüft; Inhalte über PubMed-Abstracts bzw. die Literaturbasis W03 und die Dossiers `docs/wissenschaft/01–04`.

- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research, 36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 – Kopplung von Aufmerksamkeit und Sakkadenziel (Abstract).
- Yantis, S., & Jonides, J. (1984). Abrupt visual onsets and selective attention: Evidence from visual search. *Journal of Experimental Psychology: Human Perception and Performance, 10*(5), 601–621. https://doi.org/10.1037/0096-1523.10.5.601 – plötzlich erscheinende Objekte ziehen Aufmerksamkeit auf sich (Abstract).
- Posner, M. I., Snyder, C. R. R., & Davidson, B. J. (1980). Attention and the detection of signals. *Journal of Experimental Psychology: General, 109*(2), 160–174. https://doi.org/10.1037/0096-3445.109.2.160 – räumliche Erwartung, keine Aufteilung auf nicht benachbarte Orte.
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – flacher Hick-Anstieg bei kompatiblem Zeigen.
- Kveraga, K., Boucher, L., & Hughes, H. C. (2002). Saccades operate in violation of Hick's law. *Experimental Brain Research, 146*(3), 307–314. https://doi.org/10.1007/s00221-002-1168-8 – Prosakkaden unabhängig von der Zahl der Alternativen.
- Prablanc, C., Echallier, J. F., Komilis, E., & Jeannerod, M. (1979). Optimal response of eye and hand motor systems in pointing at a visual target. I. *Biological Cybernetics, 35*(2), 113–124. https://doi.org/10.1007/BF00337436 – Auge vor Hand (≈ 100 ms).
- Kalesnykas, R. P., & Hallett, P. E. (1994). Retinal eccentricity and the latency of eye saccades. *Vision Research, 34*(4), 517–531. https://doi.org/10.1016/0042-6989(94)90165-1 – Latenzplateau 0,75–12°.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts' law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Maus-Durchsatz 3,7–4,9 bit/s.
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – klare Zwischenzone 13–18°.
- Freedman, E. G. (2008). Coordination of the eyes and head during visual orienting. *Experimental Brain Research, 190*(4), 369–387. https://doi.org/10.1007/s00221-008-1504-8 – Kopfbeteiligung ab ≈ 20°.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Browser-Zuschlag 58–133 ms.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Ende-zu-Ende-Latenz Maus/Tablet.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – ähnliche vs. unähnliche Tests.
- Ergänzend zitiert (Kurzangaben, Details in der Literaturbasis W03): Basner et al. (2018), https://doi.org/10.1093/sleep/zsx187 · Bediou et al. (2018), https://doi.org/10.1037/bul0000130 · Birch (2012), https://doi.org/10.1364/JOSAA.29.000313 · Boccardo et al. (2023), https://doi.org/10.1371/journal.pone.0282947 · Der & Deary (2006), https://doi.org/10.1037/0882-7974.21.1.62 · Di Russo et al. (2003), https://doi.org/10.1016/S0042-6989(03)00299-2 · Elliott et al. (2010), https://doi.org/10.1037/a0020958 · Findlater et al. (2013), https://doi.org/10.1145/2470654.2470703 · Fransen (2024), https://doi.org/10.1007/s40279-024-02060-x · Gibaldi & Sabatini (2021), https://doi.org/10.3758/s13428-020-01388-2 · Heitz (2014), https://doi.org/10.3389/fnins.2014.00150 · Jaschinski et al. (2015), https://doi.org/10.1111/cxo.12248 · Liu et al. (2021), https://doi.org/10.1145/3411764.3445245 · McAuley & Marsden (2000), https://doi.org/10.1093/brain/123.8.1545 · Parhi et al. (2006), https://doi.org/10.1145/1152215.1152260 · Patel et al. (1991), https://doi.org/10.1097/00006324-199111000-00010 · Rogers et al. (2024), https://doi.org/10.3389/fspor.2024.1309991 · Sala et al. (2018), https://doi.org/10.1037/bul0000139 · Simons et al. (2016), https://doi.org/10.1177/1529100616661983 · W3C (2024), *WCAG 2.2*, Kriterium 2.3.1, https://www.w3.org/TR/WCAG22/ (Norm, keine DOI).
