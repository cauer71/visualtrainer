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
blickfit_umsetzung: {kennung: "abprall-fang", name: "Abprall-Fang", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/abprall-fang/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein Punkt gleitet mit gleichmäßigem Tempo geradeaus durch ein sichtbar umrahmtes Feld und prallt an den Rändern ab. Man verfolgt ihn mit den Augen und tippt vorab auf die Stelle am Rand, an der er als Nächstes (später als Übernächstes) abprallen wird. Danach zeigt die Übung, wo er wirklich abprallt. Die Zeit bis zum gefragten Abprall wird mit der Stufe kürzer."
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
voraussetzungen: ["Maus, Touchpad oder Touchscreen; ein Tipp je Durchgang genügt", "einen gleitenden Punkt sicher sehen und verfolgen können", "scharfes Sehen über das ganze Feld in Bildschirmabstand", "kein Farbsehen nötig", "Verständnis für das Abprallen am Rand (Einfallswinkel gleich Ausfallswinkel)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, nystagmus, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie, tremor_parkinson, hand_arm_beschwerden, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["die Bahn eines gleitenden Ziels mit Abprallen am Rand vorausschätzen und den Abprallort antippen", "einem bewegten Ziel mit dem Blick folgen und die Bahn vorausdenken", "spielerische Auge-Hand-Übung mit steigendem Tempo für Jugendliche und Erwachsene mit Freude an Zeitdruck", "Vorstufe zu Tracking-Übungen mit Haltezeit (505, 514)"]
weniger_geeignet_fuer: ["Messung von Reaktionszeit oder Blickfolge (keine Blickmessung; gewertet wird, wohin getippt wird)", "kontinuierliches Nachführen eines Zeigers (gewertet wird nur ein Tipp je Durchgang; dafür 707, 514)", "Menschen, die ohne Zeitdruck üben sollen oder möchten", "Gleitsichtträger:innen im Vollbild am großen Monitor", "Ältere oder Einsteiger:innen auf hohen Stufen (kurze Zeit bis zum Abprall, zwei Abpralle vorausdenken)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Diese Übung wurde nie untersucht; Abfang- und Zeigeaufgaben werden durch Übung deutlich besser (auch Gerätegewöhnung, Guo et al. 2025), die Mechanismen der Interzeption sind gut erforscht (Mrotek & Soechting 2007; de la Malla et al. 2017), ein Nutzen für Sport, E-Sport oder Alltag ist aber nicht belegt (Fransen 2024)."
aehnliche_uebungen: [304, 104, 306, 105, 410, 415, 505, 512, 514, 515, 303, 503, 101]
stichworte: ["Interzeption", "Abfangen bewegter Ziele", "Zielverfolgung", "Blickfolge", "smooth pursuit", "Aufholsakkaden", "Abprallen", "Antizipation", "Auge-Hand-Koordination", "Fitts'sches Gesetz für bewegte Ziele", "Zeitdruck", "Combo", "Abprallort vorhersagen"]
---

# 305 · Zielverfolgung mit Abfangklick – abprallendes Ziel verfolgen und anklicken

> Original: „Zielverfolgung testen“ – skilldrills.online, Kapitel Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (fachlich sehr nah: `zielfang`, die Blickfit-Umsetzung von 104)

## 1. Kurzbeschreibung

Ein Punkt gleitet mit gleichmäßigem Tempo geradeaus durch ein sichtbar umrahmtes Feld und prallt an den Rändern ab
(Einfallswinkel gleich Ausfallswinkel). Man sieht ihn die ganze Zeit und tippt vorab auf die Stelle am Rand, an der er
als Nächstes abprallen wird; auf den höheren Stufen ist der übernächste Abprall gefragt. Danach zeigt die Übung, wo der
Punkt wirklich abprallt, und wie nah der Tipp war (Abweichung in Prozent der kürzeren Feldseite). Die Zeit bis zum
gefragten Abprall ist die Schwierigkeit: Sie sinkt von 3,2 auf 1,3 s (nächster Abprall) bzw. von 4,6 auf 2,3 s
(übernächster Abprall); Hoch- und Querformat fordern gleich viel. Eine Sitzung besteht aus 14 Durchgängen ohne Zeitbonus
und ohne Zeitstrafe, ohne Blitz und ohne Wackeln. Gemessen wird nur, wohin getippt wird, nicht, wohin die Augen schauen.

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

- **Folgebewegung (Labordaten, in der Übung nicht gemessen):** Das Ziel bleibt die ganze Zeit sichtbar. Die Folgebewegung
  der Augen startet etwa 100 ms nach Beginn einer Bewegung (Carl & Gellman, 1987); Aufholsakkaden folgen dem
  vorhergesagten Positions- und Tempofehler und werden ausgelöst, wenn dieser nicht binnen 40–180 ms von selbst schrumpft
  (de Brouwer et al., 2002). Der Gain (Augen- ÷ Zielgeschwindigkeit) junger Erwachsener lag in einem Standardversuch bei
  0,80 (Spanne 0,31–1,08; Bargary et al., 2017); bei 75–93-Jährigen ist er bei allen Tempi niedriger, umso mehr, je
  schneller das Ziel ist (Moschner & Baloh, 1994).
- **Bahnvorhersage:** Das Verfolgen eines Ziels mit den Augen verbessert die Vorhersage seiner Bahn (Spering et al., 2011)
  und vermeidet systematische Abfangfehler (de la Malla et al., 2017). Nach einem Abprall geht der Blick mit
  Erfahrung schon vorab dorthin, wo das Ziel gleich sein wird (Diaz et al., 2013; Ballspiel in virtueller Realität).
  Ein weiter Blick über das gesamte Feld statt des Verfolgens ist dafür nicht belegt.
- **Abprall:** Der Rand ist als Rahmen sichtbar; jede Umkehr verlangt eine neue Spiegelung der Richtung im Kopf. Auf den
  höheren Stufen müssen zwei Spiegelungen vorausgedacht werden.
- **Klinische Prüfung der Folgebewegung:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen
  Ziel folgen, das in einem „H“ geführt wird (Hirnnerven III, IV und VI; Muchnick, 2008, S. 32–35). Das Lehrbuch macht
  keine Aussage zur Qualität der Folgebewegung und keine zu Training.
- **Praxisangaben (Erfahrungswissen, nicht belegt):** Bei Blickfolge-Übungen gilt als Hinweis, den Kopf ruhig zu halten
  und nur die Augen zu bewegen. Eine klassische Übungsform der Sehtherapie ist das Folgen eines an einer Schnur hängenden
  Balls, oft mit aufgedruckten Buchstaben, den man in verschiedenen Richtungen anstößt (waagrecht, senkrecht, schräg,
  kreisend); gesteigert wird über das Lesen der Buchstaben und die Körperhaltung. Ein Wirksamkeitsbeleg liegt dafür nicht
  vor.
- **Gleitsicht und Alterssichtigkeit:** Das Feld kann breiter sein als die klare Zwischenzone von Gleitsichtgläsern (etwa
  13–18° horizontal; Han et al., 2003), oben liegt der Fern-, unten der Nahteil; mit Gleitsicht wird der Kopf im Mittel etwa
  7° höher gehalten (Jaschinski et al., 2015). Hilfreich sind eine Bildschirm- oder Arbeitsplatzbrille, ein kleineres
  Fenster und freie Kopfbewegung. **Trockenes Auge:** Die Blinzelrate sinkt am Bildschirm im Mittel auf etwa ein Fünftel
  (Patel et al., 1991) – kurze Sitzungen.

## 5. Neurowissenschaftliche Grundlagen

Folgebewegungen beruhen auf Bewegungssignalen des Areals MT (mittleres temporales Areal); Kleinhirn und das
Folgebewegungsfeld des frontalen Augenfelds setzen sie um und stimmen sie ab (Lisberger, 2010). Krauzlis (2004) beschreibt
ein mit den Sakkaden weitgehend gemeinsames Netzwerk (frontales Augenfeld, Basalganglien, Colliculus superior,
Kleinhirn). Beim Verfolgen liefert vermutlich eine Kopie des Augenbewegungsbefehls zusätzliche Bewegungsinformation
(Interpretation von Spering et al., 2011). Dass diese Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Interzeption:** Beim Abfangen bewegter Ziele folgt das Auge dem Ziel meist bis zum Treffen, und die Richtung des
  Fingers „eilt“ etwa 150 ms voraus (Mrotek & Soechting, 2007); die visuomotorische Latenz beträgt etwa 114 ms, gleich für
  Tippen und Wischen (Brenner et al., 2026). Ist der Trefferort frei, passt man eher den Ort als den Zeitpunkt an und ist
  zeitlich sehr präzise (Brenner & Smeets, 2015). In dieser Übung ist umgekehrt der Ort die gefragte Größe: Der Tipp gilt
  der vorausgesagten Stelle am Rand, nicht dem Ziel selbst.
- **Eine Bewegung je Durchgang:** Es zählt der erste Tipp; es gibt keine Zeigebahn zu verfolgen und kein Nachführen. Damit
  hängt das Ergebnis weniger von der Handgeschwindigkeit ab als von der Vorhersage.
- **Touch:** Tippen verkürzte die Bewegungszeit gegenüber der Maus bei Älteren um 35 %, bei Jüngeren um 16 % (Findlater et
  al., 2013). Der Trefferkreis hat mindestens 28 px Radius und liegt damit bei üblicher Darstellung über der für Touch
  empfohlenen Zielgröße von 9,2 mm (Parhi et al., 2006). Tremor stört bei dieser Aufgabe wenig (McAuley & Marsden, 2000).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät und Format:** Die Abweichung wird in Prozent der kürzeren Feldseite angegeben, damit Hoch- und Querformat und
  verschiedene Bildschirmgrößen vergleichbar bleiben; die Zeit bis zum Abprall ist von der Bildrate unabhängig. Da die
  Stelle und nicht der Zeitpunkt zählt, spielen Anzeige- und Eingabeverzögerung kaum eine Rolle. Verglichen wird dennoch
  nur mit sich selbst unter gleichen Bedingungen.
- **Zufall und Selbstregulierung:** Die Bahnen sind zufällig; manche sind einfacher (kurzer Weg, flacher Winkel). Die
  mittlere Abweichung streut deshalb von Durchgang zu Durchgang; aussagekräftiger sind der Mittelwert über die 14
  Durchgänge und der Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 43–44). Die Stufe steigt nach drei
  Treffern in Folge und sinkt nach einem Fehler.
- **Alter und Zuverlässigkeit:** Ältere streuen stärker (Moschner & Baloh, 1994). Kennzahlen kommerzieller
  Zielübungs-Programme können sehr zuverlässig sein (ICC 0,947–0,995; Rogers et al., 2024, Pilotstudie mit 10
  E-Sportlern); für diese Übung liegen keine Zuverlässigkeitsdaten vor.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Abfang- und Zeigeaufgaben werden durch Wiederholung besser; bei digitalem Sport-Sehtraining
  war der Effekt auf die Reaktionszeit in trainingsähnlichen Tests gut fünfmal so groß wie in unähnlichen (SMD 2,66 vs.
  0,50; Guo et al., 2025) – überwiegend Gewöhnung an Aufgabe und Gerät.
- **Naher Transfer (schwach):** keine Studie zu diesem Aufgabentyp; die Bahnvorhersage passt sich an Erfahrung an (Diaz et
  al., 2013).
- **Alltagstransfer (fehlend):** Ein Ferntransfer allgemeiner Wahrnehmungstrainings auf Sport ist nicht belegt (Fransen,
  2024), ebenso wenig von „Brain Training“ auf den Alltag (Simons et al., 2016); nichts zu Verkehr oder E-Sport.

## 9. Auswahlhinweise

- **Passt, wenn …** Bahnen vorausgeschätzt werden sollen (Spiegelung am Rand, später zwei Abpralle voraus), mit gleichmäßig
  gleitendem Ziel und ohne Zeigebahn; als Aufwärmen vor Blickfolge-Übungen mit Zielvorhersage.
- **Weniger passend, wenn …** eine Reaktionszeit gefragt ist (101/Blitzreaktion), Impulskontrolle (102) oder symbolische
  Wahlreaktion (202); reine Blickfolge ohne Handaufgabe (404, 105) oder ruhiges Nachführen (707, 514); echtes Abfangen
  des bewegten Ziels selbst (104/Zielfang).
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung kommt ohne Blitze,
  Wackeln und rote Warneffekte aus; bei bekannter Lichtempfindlichkeit dennoch kurze Sitzungen. `presbyopie_gleitsicht`:
  breites Feld – kleineres Fenster, Bildschirmbrille. `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`:
  anhaltendes Verfolgen – kurze Sitzungen, Pausen. `nystagmus`, `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus`:
  Folgen und Vorausschätzen der Bahn erschwert; bei einem Gesichtsfeldausfall kann ein Teil der Bahn unbemerkt bleiben
  (Ausfälle lassen sich nach dem Verlauf der Sehbahn einordnen; Muchnick, 2008, S. 32). `tremor_parkinson`,
  `hand_arm_beschwerden`: kaum betroffen, da nur ein Tipp je Durchgang nötig ist. `kognitive_einschraenkung`,
  `aufmerksamkeitsprobleme`: Vorausdenken von zwei Abprallen – als Spiel auf niedriger Stufe, nicht als Test. Doppelbilder,
  Lichtblitze, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern sind Anlass zur ärztlichen Abklärung und kein
  Übungsthema (Muchnick, 2008, S. 6, 28). Bei Beschwerden während der Übung pausieren oder abbrechen.
- **Kombiniert gut mit …** 404/105 (Blickfolge ohne Hand), 410/415 (Richtungswechsel, nur mit den Augen), 505/514
  (Halten auf dem Ziel statt Tipp), 101 (Reaktion ohne Bewegung).
- **Überschneidungen:** 304 (Abfangen eines waagrecht schwingenden Ziels, Fangmoment statt Fangort) – nicht zusammen
  vorschlagen; 104/Zielfang übt das Abfangen eines bewegten Ziels mit adaptiver Stufe und fester Dauer – als Alternative,
  nicht zusätzlich. Ruhende Ziele zeigen 302, 303, 307 und 308, bewegte 304, 305 und 306; pro Einheit höchstens eine davon,
  allenfalls eine zweite mit anderem Schwerpunkt. 306 fängt mehrere fallende Ziele ab (zusätzlich Reihenfolge wählen). Mit
  101 und 503 nur das Reagieren auf ein erscheinendes Ziel – dort wird echte Reaktionszeit gemessen, hier nicht; 301 misst
  Zeitschätzung. Mit 102 und 202 nichts Wesentliches. 501 und 508 sind ähnlich gebaut, aber mit ruhenden Zielen.

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
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Prüfung der Augenfolgebewegung (H-Muster), Gesichtsfeldausfälle nach Sehbahnverlauf, Warnzeichen mit ärztlichem Abklärungsbedarf (Kap. 1, S. 6; Kap. 3, S. 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit von Messungen am Auge, Mehrfachmessung (S. 43–44)
