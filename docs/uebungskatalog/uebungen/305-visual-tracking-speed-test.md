---
# ===== Kennung =====
nr: 305
kennung: visual-tracking-speed-test
name: "Zielverfolgung mit Abfangklick – abprallendes Ziel verfolgen und anklicken"
name_original: "Zielverfolgung testen (Seitentitel: Zielverfolgung testen | SkillDrills)"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test"
blickfit_umsetzung: null
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Feld taucht an zufälliger Stelle ein roter Punkt auf und gleitet geradlinig in eine zufällige Richtung, wobei er an unsichtbaren Rändern abprallt. Man verfolgt ihn mit den Augen und klickt bzw. tippt ihn an, bevor er nach einer mit dem Level schrumpfenden Zeit verschwindet."
ziel_funktionen: [bewegungswahrnehmung, antizipation, auge_hand_koordination, zielbewegung_tempo]
eingabe: [maus, touch, touchpad]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Automatisch, nie rückläufig: Level = Punkte / 1.750 + 1. Laut Code steigen von Level 1 bis 15 das Tempo 90 → 592 px/s (≈ 2,4 → 16 °/s am Monitor), und es sinken Zielradius 28 → 12 px, Lebensdauer 1.300 → 380 ms, Pause 550–750 → 147–206 ms und unsichtbare Trefferzugabe 14 → 5 px. Eine Serie (Combo bis 3,0×) verschärft zusätzlich bis +40 % Tempo, −25 % Radius, −32 % Lebensdauer, −50 % Trefferzugabe. Rundendauer variabel: 45 s Start, +2 s je Treffer (höchstens 60 s), −1 s je Fehlklick oder abgelaufenem Ziel."
messgroessen: ["Punkte", "Genauigkeit = Treffer / (Treffer + Fehlklicks + abgelaufene Ziele)", "'Ø Reaktion' = Zeit vom Erscheinen bis zum Treffer (Entdecken + Blick + Handbewegung + Abfangen, nur Treffer) – keine Reaktionszeit", "höchstes Level, maximale Combo", "sinnvoll: Abfangfehler vor/hinter dem Ziel, Trefferquote je Zieltempo, Fehlklicks vs. Abläufe"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 3
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
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
    antizipation: 3
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 2
    kontinuierliche_steuerung: 1
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; Maus auf ruhiger Unterlage", "ein kleines bewegtes Ziel (≈ 1,5° bis ≈ 0,6° Sehwinkel, 2–16 °/s, mit Combo bis ≈ 22 °/s) sicher sehen und verfolgen können", "scharfes Sehen über das ganze Spielfeld (Vollbild; am Monitor ≈ 40° breit, am Tablet ≈ 27°) in Bildschirmabstand", "kein Farbsehen nötig (roter Punkt mit weißem Kern auf fast Schwarz; bei Rotschwäche wirkt der rote Rand dunkler, der weiße Kern bleibt sichtbar)", "Vollbildmodus erlaubt; Runde dauert bei guter Trefferquote länger als 45 s"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, nystagmus, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["bewegte Ziele mit Blick und Hand abfangen (Interzeption) in zwei Dimensionen üben", "Vorausschätzen einer geradlinigen Bahn mit Abprallern", "spielerische Auge-Hand-Übung mit steigendem Tempo für Jugendliche und Erwachsene mit Freude an Zeitdruck", "Vorstufe zu FPS-Tracking-Übungen mit Haltezeit (505, 514)"]
weniger_geeignet_fuer: ["Messung von Reaktionszeit oder Blickfolge (keine Blickmessung; 'Ø Reaktion' enthält Blick- und Handbewegung und zählt nur Treffer)", "kontinuierliches Nachführen eines Zeigers (gewertet wird nur der Klick; dafür 707, 514)", "Menschen, die ohne Zeitdruck üben sollen oder möchten", "Gleitsichtträger:innen im Vollbild am großen Monitor", "Lichtempfindliche: roter Fehlerblitz bei jedem Fehler (abschaltbar)", "Ältere oder Einsteiger:innen ab etwa Level 8 (Lebensdauer < 0,85 s, Tempo > 9 °/s)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Abfang- und Zeigeaufgaben werden durch Übung deutlich besser (auch Gerätegewöhnung, Guo et al. 2025), die Mechanismen der Interzeption sind gut erforscht (Mrotek & Soechting 2007; de la Malla et al. 2017), ein Nutzen für Sport, E-Sport oder Alltag ist aber nicht belegt (Fransen 2024)."
aehnliche_uebungen: [304, 104, 306, 105, 410, 415, 505, 512, 514, 515, 303, 503, 101]
stichworte: ["Interzeption", "Abfangen bewegter Ziele", "Zielverfolgung", "Blickfolge", "smooth pursuit", "Aufholsakkaden", "Abprallen", "Antizipation", "Auge-Hand-Koordination", "Fitts'sches Gesetz für bewegte Ziele", "Zeitdruck", "Combo", "Test (Name des Originals)"]
---

# 305 · Zielverfolgung mit Abfangklick – abprallendes Ziel verfolgen und anklicken

> Original: „Zielverfolgung testen“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht
> umgesetzt (fachlich sehr nah: `zielfang`, die Blickfit-Umsetzung von 104)

## 1. Kurzbeschreibung

Auf fast schwarzem Feld erscheint an zufälliger Stelle ein roter Punkt mit weißem Kern und gleitet mit gleichbleibendem Tempo geradeaus;
an unsichtbaren Rändern prallt er ab. Man verfolgt ihn mit den Augen, führt Maus oder Finger heran und klickt/tippt ihn an, bevor er
verschwindet; kurz darauf erscheint der nächste. Mit dem Level werden die Punkte schneller, kleiner und kurzlebiger. Trotz des Namens
misst das Spiel keine Augenbewegung, sondern ob und wann der Abfangklick gelingt.

## 2. Ablauf im Original (Analyse)

Grundlage: Seitentext und Spielcode (Chunk `1163-…js` mit gemeinsamen Modulen für Schwierigkeit, Combo, Strafe, Fehlerblitz; geprüft am
29.09.2026, nur Mechanik übernommen). Winkel = **eigene Rechnung** (Monitor 24″ Full-HD, 60 cm, ≈ 37,8 px/°; iPad 11″ quer, 40 cm).

- **Ablauf/Eingabe:** Vollbild, Countdown 3-2-1-GO (≈ 2,45 s, Töne), erstes Ziel nach 200 ms; Escape/Vollbild-Ende bricht ab. Pointer
  beim Drücken (Maus, Stift, Finger), Fadenkreuz folgt der Maus, keine Tastatur.
- **Bewegung (Code):** Start zufällig mit 12 % (seitlich) bzw. 16 % (oben/unten) Randabstand, Richtung zufällig (0–360°), Tempo je Ziel
  fest. Abprall durch Spiegeln an einer **unsichtbaren** Grenze 8 % bzw. 10 % vor dem Rand (Gitter mit 2 % Weiß kaum sichtbar). Position
  mit vergangener Zeit (dt, max. 0,1 s) gerechnet – Tempo unabhängig von der Bildfrequenz; nur Partikel/Wackeln pro Bild (rein optisch).
- **Schwierigkeit (Code):** p = (Level − 1)/14, exponentieller Verlauf (Formel wie Literaturbasis W03), auch über Level 15 hinaus.
  Touch/Mobil/Fenster < 768 px: Radius +2 px, Trefferzugabe +10 px. Level = Punkte/1.750 + 1, steigt nur.

| Level (Punkte) | Ø Ziel Monitor | Trefferzone Ø | Tempo (max. Combo) | Lebensdauer (max. Combo) | Pause |
|---|---|---|---|---|---|
| 1 (0) | 56 px ≈ 1,5° | 84 px ≈ 2,2° | 90 px/s ≈ 2,4 °/s (126) | 1.300 ms (884) | 550–750 ms |
| 5 (7.000) | 47 px ≈ 1,3° | 71 px ≈ 1,9° | 224 px/s ≈ 5,9 °/s (313) | 1.055 ms (717) | 443–605 ms |
| 10 (15.750) | 35 px ≈ 0,9° | 50 px ≈ 1,3° | 427 px/s ≈ 11,3 °/s (598) | 682 ms (464) | 280–385 ms |
| 15 (24.500) | 24 px ≈ 0,6° | 34 px ≈ 0,9° | 592 px/s ≈ 15,7 °/s (829 ≈ 22 °/s) | 380 ms (258) | 147–206 ms |

- **Punkte/Zeit:** 100 × Combo-Faktor (1,1 ab 3 bis 3,0 ab 50 Treffern) × (1 + 0,5 p); fehlerfrei Level 10 nach 63, Level 15 nach 84
  Treffern (*eigene Rechnung*). Start 45 s, +2 s je Treffer (max. 60 s), −1 s je Fehlklick/Ablauf; wer schneller als ein Treffer pro 2 s
  ist, verlängert die Runde (*eigene Abschätzung:* meist 1–3 min). Note: √(Punkte/18.000) × 100 (S+ „LEGENDARY“ ab ≈ 16.250 Punkten).
- **Fehler:** Combo 0, Bildwackeln (6 px), Ton, roter Radialblitz (0,45 s, abschaltbar). Danach ist das nächste Ziel wieder langsamer und
  größer (Combo-Anteil entfällt), das Level bleibt. Abläufe sind global abschaltbar – dann prallt das Ziel endlos (Code).

**Widersprüche Regeltext ↔ Code:** (1) „+0,6 s“ je Treffer – Code +2 s. (2) „Standard ohne Zeitstrafe“ bzw. „−0,8 s“ – der Code zieht
**immer** 1 s ab. (3) „Geschwindigkeit und Richtung verändern sich“ – je Ziel bleibt das Tempo konstant, die Richtung ändert sich nur beim
Abprallen. (4) „Abprall-Druck“ ist kein eigener Parameter; Abpraller werden nur durch höheres Tempo häufiger.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt „visuelles Tracking, Zielvorhersage, Maussteuerung und Abfang-Timing“ für Gamer, Sportler und alle Interessierten und
ist zurückhaltend: kein klinischer Wert, keine Augenmessung, FPS-Transfer „nicht garantiert“, Hardware zählt, Stopp bei Schwindel oder
Doppelbildern. Die Stufen (> 330 ms … < 180 ms Ø Reaktion, < 72 % … 98 %+ Genauigkeit) heißen ausdrücklich „keine Normen“. Einordnung:
- **Stufen unrealistisch, ohne Datengrundlage.** „Ø Reaktion“ umfasst Entdecken (≈ 131 ms; Woods et al., 2015), Blicksprung (Median
  ≈ 177 ms; Bargary et al., 2017) und Handweg zu einem bewegten Ort; *eigene Fitts-Abschätzung* für Level 1 (≈ 600 px, Zone 84 px,
  ≈ 3 bit, 3,7–4,9 bit/s; Soukoreff & MacKenzie, 2004): Handbewegung ≈ 0,6–0,8 s, mit Entdecken insgesamt ≈ 0,8–1,0 s (für
  ruhende Ziele gerechnet, bei bewegten nur grob; Jagacinski et al., 1980). Unter 330 ms gelingt das nur bei Zielen nahe am Zeiger oder über den
  Auswahleffekt (Abschnitt 7). Kosinski und Woods behandeln einfache Reaktionen auf ruhende Reize.
- **Blicktipps teils widersprüchlich:** „Ziel im Blick halten“ ist belegt – Verfolgen verbessert die Bahnvorhersage (Spering et al., 2011)
  und vermeidet systematische Abfangfehler (de la Malla et al., 2017); „das gesamte Feld beobachten“ und „weiter Blick“ sind es nicht.
- **„Tracking ≠ Rückorientierung“** stimmt für Augen im Grundsatz (Folgebewegung vs. Aufhol-/Blicksprung; Rashbass, 1961); Krauzlis
  (2004) betont allerdings gerade die weitgehend gemeinsame Steuerung beider Systeme. Rashbass ist mit leicht falschem Titel zitiert.
  Gleiches Gerät, 5–10-min-Blöcke und Pausen sind vernünftige Ratschläge, eine optimale Dosis ist nicht belegt.

## 4. Optische und okulomotorische Grundlagen

- **Auge (Labordaten, im Spiel nicht gemessen):** Ziel erscheint oft > 10°, im Extrem ≈ 35° neben dem Blickort (*eigene Rechnung*, Monitor) → Sakkade (≈ 177 ms; Bargary et al., 2017)
  → Folgebewegung mit ≈ 100 ms Latenz (Carl & Gellman, 1987). Aufholsakkaden folgen dem vorhergesagten Positions-/Tempofehler (keine
  Sakkade bei „Eye-Crossing-Time“ 40–180 ms; de Brouwer et al., 2002). Bei 380 ms Lebensdauer (Level 15) bleibt dafür kaum Zeit.
- **Tempo:** 2–16 °/s (mit Combo ≈ 22 °/s) ist gut verfolgbar; Folgegewinn junger Erwachsener ≈ 0,80 (0,31–1,08; Bargary et al., 2017),
  bei 75–93-Jährigen bei allen Tempi niedriger, umso mehr, je schneller (Moschner & Baloh, 1994).
- **Abpraller:** Grenzen unsichtbar, Umkehr ohne Sichtmarke; jede Umkehr verlangt eine neue Folgebewegung. Bahnen nach einem Abprall
  werden mit Erfahrung vorhergesagt, der Blick geht vorab dorthin (Diaz et al., 2013, VR-Ballspiel).
- **Sehwinkel, Bildfrequenz:** Ziel 1,5° → 0,6°, roter Punkt mit weißem Kern auf fast Schwarz – Schärfe, Kontrast, Farbe kaum begrenzend.
  Bei 60 Hz springt das Ziel auf Level 15 ≈ 10 px pro Bild (Combo ≈ 14 px, gut ein Radius), bei 120 Hz halb so weit (*eigene Rechnung*).
- **Gleitsicht/Alterssichtigkeit:** Im Vollbild wandert das Ziel über ≈ 40° (Monitor) bzw. ≈ 27° (Tablet); die klare Zwischenzone ist
  horizontal nur ≈ 13–18° breit (Han et al., 2003), oben Fern-, unten Nahteil; der Kopf wird ≈ 7° stärker angehoben (Jaschinski et al.,
  2015). Empfehlung: Bildschirm-/Arbeitsplatzbrille, Kopfbewegung erlauben. **Trockenes Auge:** Blinzelrate am Bildschirm im Mittel auf
  ein Fünftel (Patel et al., 1991) – kurze Runden.

## 5. Neurowissenschaftliche Grundlagen

Folgebewegungen beruhen auf Bewegungssignalen des Areals MT (mittleres temporales Areal); Kleinhirn und Folgebewegungsfeld des frontalen
Augenfelds setzen sie um und stimmen sie ab (Lisberger, 2010). Krauzlis (2004) beschreibt ein mit den Sakkaden weitgehend gemeinsames
Netzwerk (frontales Augenfeld, Basalganglien, Colliculus superior, Kleinhirn). Beim Verfolgen liefert vermutlich eine Kopie des
Augenbewegungsbefehls zusätzliche Bewegungsinformation (Interpretation von Spering et al., 2011). Dass diese Übung bestimmte Hirnregionen
„trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Interzeption:** Das Auge folgt dem Ziel meist bis zum Abfangen, die Fingerrichtung „eilt“ ≈ 150 ms voraus (Mrotek & Soechting, 2007);
  visuomotorische Latenz ≈ 114 ms, gleich für Tippen und Wischen (Brenner et al., 2026). Ist der Trefferort frei, passt man eher den Ort
  als den Zeitpunkt an und ist zeitlich sehr präzise (Brenner & Smeets, 2015) – hier darf überall auf der Bahn geklickt werden.
- **Zwei Strategien:** Zeiger mitführen und klicken, wenn er auf dem Ziel liegt, oder „Hinterhalt“ auf der Bahn. Zeitfenster
  Trefferzone/Tempo: Level 10 ≈ 117 ms, Level 15 ≈ 57 ms, mit maximaler Combo ≈ 31 ms (*eigene Rechnung*).
- **Fitts für bewegte Ziele:** Bei Positionssteuerung (wie Maus/Finger) sagt der klassische Index die Erfassungszeit bewegter Ziele
  schlecht voraus, ein Geschwindigkeitsterm passt besser (Jagacinski et al., 1980); Klicks landen hinter dem Ziel, umso mehr, je
  schneller es ist (Huang et al., 2018; nur waagrechte 1D-Bewegung, Maus).
- **Touch:** Tippen verkürzte die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et al., 2013).
  Trefferzone bis Level 15 ≈ 11 mm, mit maximaler Combo ≈ 9,6 mm (Empfehlung 9,2 mm; Parhi et al., 2006), sichtbares Ziel dann nur
  ≈ 4–5 mm (*eigene Rechnung*); Hand und Arm verdecken Teile der Bahn. Tremor stört bei kleinen Zielen (McAuley & Marsden, 2000).

## 7. Einflussfaktoren und Messgrenzen

- **Latenz verschiebt Treffer nach hinten:** Maus → Bild ≈ 37 ms bei 60 Hz, ≈ 21 ms bei 120 Hz, Tablet-Tipps 48–276 ms (Casiez et al.,
  2017). Bei 592 px/s (Level 15) sind 37 ms ≈ 22 px – mehr als der Zielradius (12 px), nahe am Trefferradius (≈ 17 px) (*eigene
  Abschätzung*). Je nach Gerät und Browser werden Zeiten um ≈ 58–133 ms zu lang gemessen (Pronk et al., 2020) – nur Selbstvergleich am selben Gerät.
- **Auswahleffekt und Selbstregulierung:** „Ø Reaktion“ zählt nur Treffer; mit sinkender Lebensdauer gelingen nur noch Ziele nahe am
  Zeiger, der Mittelwert „verbessert“ sich allein durch den Level (*eigene Analyse*). Nach Fehlern wird das nächste Ziel leichter, das
  Level nie; die Rundendauer ist selbst ein Leistungsmaß.
- **Alter, Zuverlässigkeit:** Ältere streuen stärker (Moschner & Baloh, 1994). Aim-Trainer können sehr zuverlässig messen (ICC
  0,947–0,995; Rogers et al., 2024, Pilotstudie mit 10 E-Sportlern); diese Übung wurde nie geprüft.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Abfang- und Zeigeaufgaben werden durch Wiederholung besser; bei digitalem Sport-Sehtraining war der Effekt auf
  die Reaktionszeit in trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs. 0,50; Guo et al., 2025) –
  überwiegend Gewöhnung an Aufgabe und Gerät.
- **Naher Transfer (schwach):** keine Studie zu diesem Aufgabentyp; Bahnvorhersage passt sich an Erfahrung an (Diaz et al., 2013).
- **Alltagstransfer (fehlend):** kein Ferntransfer allgemeiner Wahrnehmungstrainings auf Sport belegt (Fransen, 2024), ebenso wenig von
  „Brain Training“ auf den Alltag (Simons et al., 2016); nichts zu Verkehr oder E-Sport.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** bewegte Ziele mit Blick und Hand in zwei Dimensionen abgefangen und Bahnen vorausgeschätzt werden sollen, bei Freude
  an Punkten und Zeitdruck; als Aufwärmen vor FPS-Tracking-Übungen.
- **Weniger passend, wenn …** eine Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle (102) oder symbolische Wahlreaktion
  (202); reine Blickfolge ohne Hand (404, 105) oder ruhiges Nachführen (707, 514); Üben ohne Zeitdruck (104/`zielfang` niedrig, 404).
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Radialblitz je Fehler (Mitte 50 %
  Deckkraft, 0,45 s); *eigene Rechnung:* Leuchtdichteänderung ≈ 0,05 (WCAG-Schwelle 0,1), Rotanteil ≈ 0,6 (sRGB) bzw. ≈ 0,84 (linear);
  bei Fehlklickserien > 3 Blitze/s möglich (nicht gemessen) – Blitz abschalten. `presbyopie_gleitsicht`: Bahn über ≈ 40° – kleineres
  Fenster, Bildschirmbrille. `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`:
  anhaltendes Verfolgen über eine sich verlängernde Runde – kurze Runden, Pausen. `nystagmus`, `gesichtsfeldausfall`,
  `sehbehinderung_niedriger_visus`: Folgen und Wiederfinden kleiner, schneller Ziele erschwert. `tremor_parkinson`,
  `hand_arm_beschwerden`: schnelle Zeigebewegungen auf kleine, bewegte Ziele. `kognitive_einschraenkung`, `aufmerksamkeitsprobleme`:
  sich verschärfender Zeitdruck, Blitz, Ton, Wackeln – als Spiel auf niedriger Stufe, nicht als Test.
- **Kombiniert gut mit …** 404/105 (Blickfolge ohne Hand), 410/415 (Richtungswechsel, nur mit den Augen), 505/514 (Halten auf dem
  Ziel statt Klick), 101 (Reaktion ohne Bewegung).
- **Überschneidungen:** **Dublette:** 304 (dieselbe Abfang-Mechanik, nur waagrecht mit Richtungswechseln) – nie zusammen vorschlagen;
  104/`zielfang` (Blickfit) ist dasselbe Prinzip mit adaptiver Stufe und fester Dauer – als ruhigere Alternative, nicht zusätzlich.
  **Gleiche Engine:** 302–308 teilen Level-, Combo-, Zeit- und Fehlerregeln (Level alle 1.750 Punkte, Combo bis 3,0×, +2 s je Treffer,
  −1 s je Fehler, roter Fehlerblitz, Bildwackeln) – pro Einheit höchstens eine davon, allenfalls eine zweite mit anderem Schwerpunkt
  (ruhende Ziele 302/303/307/308, bewegte 304/305/306). 306 fängt mehrere fallende Ziele ab (zusätzlich Reihenfolge wählen). Mit 101
  und 503 nur das Reagieren auf ein erscheinendes (dort ruhendes) Ziel – dort wird echte Reaktionszeit gemessen, hier nicht; 301 misst
  trotz des Namens „Reaktionstest“ keine Reaktion, sondern Zeitschätzung. Mit 102 nur die Combo-Logik, mit 202 nichts Wesentliches.
  501 und 508 (FPS) sind ähnlich gebaut (1.800 bzw. 1.400 Punkte je Level), aber mit ruhenden Zielen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Keine eigene Umsetzung nötig:** `zielfang` (Blickfit zu 104) deckt den Kern ab – 2D-Bahn mit Abprallen an den Spielfeldrändern,
  dt-Tempo, Staircase 3-down/1-up (≈ 79 % Treffer), Tempo ±15 %, Kurven ab Stufe 6, Trefferradius ≥ 32 px, Vor/Hinter-Auswertung, feste
  45 s. Ergänzbar allenfalls: Rand des Abprallbereichs sichtbar markieren und eine Auswertung „Treffer kurz nach Abprall“.
- **Ehrlich messen:** „Abfangzeit“ statt „Reaktion“; Median und Trefferquote je Tempoband, Fehlklicks und Abläufe getrennt; keine
  ms-Stufen, keine Noten wie „LEGENDARY“. Tempo/Größe in Sehwinkel, Spielfeld ≈ 20–25° (Gleitsicht), Tablet quer.
- **Sicherheit:** kein roter Blitz, kein Wackeln (WCAG 2.3.1); feste Rundendauer, Pausenhinweis; DE/IT; „Übung“ statt „Test“.

## 11. Quellen

### Von der Website angegeben

- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338.
  https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Website-Titel ungenau („pursuit“ statt „tracking“), nur
  Metadaten; **stützt die Aussage der Website:** teilweise (Folgebewegung vs. Sakkade beim Auge; zur Mausaufgabe nichts).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603.
  https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (nur Augen-Folgebewegung; der Artikel betont eher Gemeinsamkeiten von
  Folgebewegung und Sakkaden als ihre Trennung).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time.
  *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Volltext); **stützt:**
  ja für „Hardware beeinflusst den Wert“, nein für die ms-Stufen (einfache Reaktion auf ruhenden Reiz: 231 ms, hardwarekorrigiert 213 ms).
- Kosinski, R. J. (2008). *A literature review on reaction time.* Clemson University. – **Prüfung:** keine DOI, unbegutachtetes Skript;
  geprüft wurde die Fassung von 2013 (http://www.cognaction.org/cogs105/readings/clemson.rt.pdf), 2008 nicht auffindbar; **stützt:**
  teilweise (dort ≈ 190 ms klassisch, ≈ 268 ms am Computer – für einfache Reaktionen, nicht für Abfangklicks auf bewegte Ziele).

### Weitere Fachliteratur

- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3),
  8. https://doi.org/10.1167/15.3.8 – freier Trefferort, Ort statt Zeitpunkt anpassen.
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target
  with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5 – Blickfolge verhindert Abfangfehler.
- Diaz, G., Cooper, J., Rothkopf, C., & Hayhoe, M. (2013). Saccades to future ball location reveal memory-based prediction in a
  virtual-reality interception task. *Journal of Vision, 13*(1), 20. https://doi.org/10.1167/13.1.20 – Vorhersage nach Abprall (Abstract).
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target
  selection. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM.
  https://doi.org/10.1145/3173574.3173811 – Klicks landen hinter schnellen Zielen.
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors,
  22*(2), 225–233. https://doi.org/10.1177/001872088002200211 – Fitts mit Geschwindigkeitsterm.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron,
  66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – MT, Kleinhirn, frontales Augenfeld (Abstract).
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238.
  https://doi.org/10.1093/geronj/49.5.M235 – Folgegewinn und Sakkaden im Alter (Abstract).
- Mrotek, L. A., & Soechting, J. F. (2007). Target interception: Hand–eye coordination and strategies. *The Journal of Neuroscience,
  27*(27), 7297–7309. https://doi.org/10.1523/JNEUROSCI.2046-07.2007 – Auge folgt bis zum Abfangen, Finger eilt voraus.
- Spering, M., Schütz, A. C., Braun, D. I., & Gegenfurtner, K. R. (2011). Keep your eyes on the ball: Smooth pursuit eye movements enhance
  prediction of visual motion. *Journal of Neurophysiology, 105*(4), 1756–1767. https://doi.org/10.1152/jn.00344.2010 – Bahnvorhersage.
- Ergänzend (DOIs am 29.09.2026 per Crossref geprüft, Inhalte laut Literaturbasis W03 bzw. Dossier 02): Bargary et al. (2017),
  https://doi.org/10.1016/j.visres.2017.03.001; Brenner, Bom & Smeets (2026), https://doi.org/10.1007/s00221-026-07264-3; Carl & Gellman
  (1987), https://doi.org/10.1152/jn.1987.57.5.1446; Casiez et al. (2017), https://doi.org/10.1145/3126594.3126606; de Brouwer et al.
  (2002), https://doi.org/10.1152/jn.00432.2001; Findlater et al. (2013), https://doi.org/10.1145/2470654.2470703; Fransen (2024),
  https://doi.org/10.1007/s40279-024-02060-x; Guo et al. (2025), https://doi.org/10.3389/fphys.2025.1664572; Han et al. (2003),
  https://doi.org/10.1167/iovs.02-0507; Jaschinski et al. (2015), https://doi.org/10.1111/cxo.12248; McAuley & Marsden (2000),
  https://doi.org/10.1093/brain/123.8.1545; Parhi et al. (2006), https://doi.org/10.1145/1152215.1152260; Patel et al. (1991),
  https://doi.org/10.1097/00006324-199111000-00010; Pronk et al. (2020), https://doi.org/10.3758/s13428-019-01321-2; Rogers et al. (2024),
  https://doi.org/10.3389/fspor.2024.1309991; Simons et al. (2016), https://doi.org/10.1177/1529100616661983; Soukoreff & MacKenzie
  (2004), https://doi.org/10.1016/j.ijhcs.2004.09.001.
