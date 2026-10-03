---
# ===== Kennung =====
nr: 503
kennung: instant-response
name: "Sofortreaktion – beim Aufleuchten in der Bildmitte tippen, Frühstarts vermeiden"
name_original: "Instant Response Pro (Seitentitel: Reaktionszeit Test – FPS-Reflexe messen)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/instant-response"
blickfit_umsetzung: {kennung: "sofort-reaktion", name: "Sofort-Reaktion", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sofort-reaktion/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In der Bildmitte liegt ein hohler Ring, der sich nach einer unvorhersehbaren Wartezeit weich mit warmweißem Licht füllt. Man tippt so schnell wie möglich irgendwo auf den Bildschirm; ein Tipp vor dem Licht zählt als Frühstart. Ausgewertet werden Reaktionszeit (Median), Streuung und Frühstarts im Vergleich mit sich selbst."
ziel_funktionen: [einfache_reaktion]
eingabe: [maus]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Laut Code stufenlos: Level = Punkte / 1.400 + 1. Mit dem Level schrumpfen Anzeige- und Antwortfenster 550 → 200 ms (Level 15) und weiter gegen 90 ms, Wartezeit 0,7–2,2 s → 0,4–1,3 s; ab Level 8 erscheinen Täuschreize (60 ms, gedimmt), Anteil bis 17,5 % (Level 15) bzw. höchstens 35 %. Eine Trefferserie (Combo) verkürzt Fenster und Wartezeit zusätzlich um bis zu 35–40 %. Die Runde verlängert sich um 2 s je Treffer und endet praktisch, wenn das Fenster kürzer wird als die eigene Reaktionszeit."
messgroessen: ["Punkte ((100 + Tempobonus 0–150) × Combo-Faktor 1–3 × Levelfaktor)", "mittlere Reaktionszeit (arithmetisches Mittel, nur Treffer innerhalb des Fensters)", "Präzision = Treffer / (Treffer + Fehlklicks + Frühstarts + Zeitüberschreitungen)", "Frühstarts (inkl. Klicks auf Täuschreize)", "Zeitüberschreitungen", "maximale Combo", "erreichtes Level", "sinnvoll zusätzlich: Median und Interquartilsabstand der Reaktionszeit bei festem Fenster, Frühstart-Quote (< 100 ms oder vor dem Reiz), Fehlalarmrate bei Täuschreizen (Signalentdeckung d′)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 1
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 0
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 3
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
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
voraussetzungen: ["Computer mit Maus (reine Touch-Geräte werden erkannt und nicht zugelassen; ohne Pointer Lock – z. B. iPad-Safari – werden Klicks ignoriert)", "Maus während der Runde ruhig liegen lassen (Treffer nur, wenn das Fadenkreuz ≤ 45 px von der Mitte entfernt ist)", "Bildschirm 50–70 cm, Vollbild empfohlen", "passende Korrektion für den Bildschirmabstand", "kein Farbsehen nötig (Aufleuchten und Täuschreiz unterscheiden sich in der Helligkeit)", "Toleranz für Zeitdruck, Aufblitzen und Fehler-Rückmeldung (roter Schimmer, Bildwackeln)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, trockenes_auge_bildschirm, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, tremor_parkinson]
geeignet_fuer: ["einfache visuelle Reaktion auf einen zentralen Lichtreiz üben", "Frühstarts unterdrücken (Warten auf den echten Reiz)", "Wachbleiben über wiederholte, unvorhersehbare Wartezeiten", "Selbstvergleich auf demselben Gerät, z. B. vor/nach Pausen", "kurzes Aufwärmen vor Übungen mit schneller Reaktion"]
weniger_geeignet_fuer: ["genaue Messung der eigenen Reaktionszeit (Touch und Anzeige addieren eine Verzögerung, das Gerät beeinflusst den Wert)", "Übungsziel Zielen, Blickbewegungen, peripheres Sehen oder Suche", "Menschen, die unter Zeitdruck rasch frustriert sind", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Einfache Reaktionszeit ist über Wiederholungen sehr stabil (Basner et al. 2018; Kida et al. 2005), Zugewinne sind überwiegend Gewöhnung an Aufgabe und Gerät (Guo et al. 2025); gleichmäßigere Antworten und weniger Frühstarts sind eher Timing als schnellere Wahrnehmung. Die Übung selbst und ein Transfer auf Spiel oder Alltag sind nicht untersucht."
aehnliche_uebungen: [101, 102, 202, 802, 306, 511, 501, 208]
stichworte: ["Reaktionszeit", "einfache Reaktion", "Frühstart", "Antizipation", "Täuschreiz", "Go/No-Go", "Impulskontrolle", "Vorperiode", "Aufleuchten", "Ego-Shooter", "FPS", "Maus", "Pointer Lock", "Zeitdruck", "Combo"]
---

# 503 · Sofortreaktion – beim Aufleuchten in der Bildmitte tippen, Frühstarts vermeiden

> Original: „Instant Response Pro“ (Seitentitel „Reaktionszeit Test – FPS-Reflexe messen“) – skilldrills.online, Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `blitzreaktion` zu 101, `stopp-los` zu 102)

## 1. Kurzbeschreibung

In der Bildmitte liegt ein hohler Ring. Nach einer unregelmäßigen, nicht vorhersagbaren Wartezeit (mindestens 0,9 s, höchstens 3,5 s) füllt er sich weich mit warmweißem Licht (Einblenden in 100 ms, kein Grün, kein Rot, kein Blitz). Sobald das Licht erscheint, tippt man so schnell wie möglich irgendwo auf den Bildschirm; gezielt getroffen werden muss nichts. Ein Tipp vor dem Licht oder in den ersten 100 ms danach zählt als Frühstart, wird nicht gewertet und löst eine neue Wartezeit aus. Eine Runde besteht aus 2 Aufwärm- und 16 gewerteten Durchgängen. Ausgewertet werden die Reaktionszeit (Median), ihre Streuung, die Frühstarts und die gültigen Durchgänge, als Vergleich mit sich selbst auf demselben Gerät. Geübt wird die einfache Reaktion mit „Abzugsdisziplin“: auf den echten Reiz warten, nicht raten.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spiel-Chunk (`84331-…js`, formatiert; nur Mechanik gelesen) samt Hilfsmodulen
(Schwierigkeitskurve, Combo-Faktor, Einstellungen, Stylesheet). **[CODE]** = aus dem Code, [ER] = eigene Rechnung.

- **Eingabe [CODE]:** nur Maustaste (`mousedown`). Nach Countdown (2,45 s) Pointer Lock (ohne `unadjustedMovement`);
  nur mit gesperrtem Zeiger zählen Klicks. Treffer nur, wenn das Fadenkreuz ≤ 35 px + Zusatzzone (10 → 2 px) von der
  Mitte entfernt ist – die Maus muss also ruhig liegen. Reine Touch-Geräte werden erkannt (`pointer: fine` fehlt).
- **Reiz [CODE]:** 2D-Canvas. Ruhe: grauer Punkt (#1e293b, r = 24,5 px). Ziel: grüner Kreis (#10b981), r = 35 px,
  Deckkraft 0,88, Leuchtschein, weißer Kern. Täuschreiz: gleiche Farbe, Deckkraft 0,35, r = 30 px, ohne Schein,
  **60 ms**; Ignorieren wird nicht bestraft. Kein Ton beim Aufleuchten, aber Treffer- und Strafton.
- **Zeitablauf [CODE]:** Wartezeit **gleichverteilt** zwischen Minimum und Maximum, frühestens 350 ms nach dem letzten
  Klick. Das Anzeigefenster ist zugleich die Antwortfrist; danach erlischt das Ziel (Zeitüberschreitung). Zeitrechnung
  mit dt bzw. `performance.now()` → nicht bildfrequenzabhängig.

  | Level | Fenster | Wartezeit | Täuschreiz-Anteil | Fenster bei Combo ≥ 50 |
  |---|---|---|---|---|
  | 1 | 550 ms | 700–2.200 ms | 0 % | 358 ms |
  | 5 | 457 ms | 619–1.957 ms | 0 % | 297 ms |
  | 10 | 315 ms | 496–1.588 ms | 5 % | 205 ms |
  | 15 | 200 ms | 396–1.287 ms | 17,5 % | 130 ms |
  | 20 | 145 ms | 347–1.142 ms | 30 % | 94 ms |

  [ER] aus der Code-Kurve; die Untergrenze 40 ms wird praktisch nie erreicht (Grenzwert ≈ 59 ms).
- **Punkte [CODE]:** (100 + Tempobonus) × Combo-Faktor (1,0; ab 3 Treffern 1,1 … ab 50: 3) × Levelfaktor
  (1 + 0,5 × (Level − 1)/14). Tempobonus linear 0 (≥ 500 ms) bis 150 (≤ 150 ms), z. B. 250 ms → +107.
- **Zeitkonto [CODE]:** Start 45 s, Treffer **+2 s** (max. 60 s); Frühstart, Fehlklick, Zeitüberschreitung je **−1 s**,
  Combo-Reset, Bildwackeln (8 px; kleine, kurze Bewegung des ganzen Bildes → `bewegungsreize_schwindel` 1 wie 501/502),
  roter radialer Schimmer (50 % Deckkraft, 0,45 s). Das Aufleuchten selbst ist hier der Kern der Aufgabe, dazu kommen
  60-ms-Täuschblitze → `flimmern_lichtreize` 2, höher als bei den übrigen Übungen der Gruppe (dort nur Fehler-Schimmer, 1). Ein Zyklus dauert anfangs
  ≈ 1,7 s [ER] – sicheres Treffen verlängert die Runde. Sie endet, wenn das Fenster unter die eigene Reaktionszeit
  (inkl. Geräte-Latenz) fällt; dann kostet jeder Durchgang 2 s (Zeitüberschreitung + verspäteter Klick als „Frühstart“).
- **Auswertung [CODE]:** mittlere Reaktionszeit (Mittelwert nur der Treffer), Präzision, Frühstarts,
  Zeitüberschreitungen, Combo, Level; Note S+–F nach 100 × √(Punkte/48.000) – willkürlich, ohne Normdaten.
- **Widersprüche Regeltext ↔ Code:** „Treffer +0,6 s“ (deutscher Seitentext) – Code +2 s (so auch die Regelkarte im
  Spiel-Chunk); „Frühstart −0,8 s“ – Code −1 s; „Bonus < 150 ms“ –
  anteilig schon ab < 500 ms; „3D-Canvas“ – 2D; „Rohdaten ohne Beschleunigung“ – nicht zutreffend. Es gibt **keine
  Frühstart-Grenze** nach dem Reiz: Ein geratener Klick 20 ms nach dem Aufleuchten ist ein Treffer mit vollem Bonus.
  Bei abgeschalteter Zeitüberschreitung (Standard: an) bliebe laut Code auch ein Täuschreiz stehen – vermutlich ein Fehler.

## 3. Was die Website sagt – und wie das einzuordnen ist

Versprochen werden die Messung „reiner visueller Verarbeitungslatenz“, „Trigger-Disziplin“ und Reaktionen „unter
200 ms“ für CS2, Valorant u. a.; dazu eine Latenzkette (Netzhaut 20–40, V1 30–50, Kortex 40–70, efferent 30–50 ms),
Hardware-Werte, eine Tier-Tabelle (Profi < 160 ms, „genetisch maximale Leitgeschwindigkeit“) und FAQ-Zahlen
(Training −15–40 ms dauerhaft, Schlafmangel +30–80 ms, Koffein −10–20 ms, Finger-Vorspannung −20–35 ms).

- **Belegt:** 200–250 ms sind typisch (231 ms, korrigiert 213 ms), Hardware-Verzögerung steckt im Messwert (Woods et
  al., 2015); Bildintervalle 16,7/4,2 ms bei 60/240 Hz [ER]. Richtung von Schlafmangel und Koffein stimmt (Lim & Dinges,
  2010; McLellan et al., 2016), die ms-Werte sind ohne Quelle.
- **Falsch zugeordnet:** Posner & Petersen (1990) behandeln Aufmerksamkeitsnetzwerke, nicht Zapfendichte oder
  Motorkortex; Hick (1952) betrifft Wahlreaktionen. Die Latenzkette ist nur in der Größenordnung plausibel
  (Reizentdeckung ≈ 131 ms, Woods et al., 2015; V1 vor höheren Arealen, Schmolesky et al., 1998).
- **Widerspricht der Evidenz:** „dauerhaft 15–40 ms schneller“ – der PVT blieb über 16 Wiederholungen stabil (Basner et
  al., 2018); Sporttraining änderte die einfache Reaktion nicht, die Go/No-Go-Reaktion schon (Kida et al., 2005).
  Action-Spieler waren über verschiedene Reaktionsaufgaben ≈ 11 % schneller bei gleicher Genauigkeit (Dye et al.,
  2009, überwiegend Querschnittsvergleiche) – kein Beleg für diese Übung.
  Der Tempobonus bis 150 ms belohnt Raten; im PVT gilt < 100 ms als Frühstart (Basner & Dinges, 2011).
- **Ohne Datengrundlage:** Tier-Tabelle samt „neurologischer Klassifikation“, „Profis 140–180 ms“, Schalterwerte,
  Finger-Vorspannung, „trockene Augen verlängern die Reizleitung“ (sie betreffen Bildqualität und Beschwerden);
  auch der Satz, alle Zahlen stammten aus den vier angegebenen Arbeiten, trifft nicht zu.
- **Messhinweis:** `performance.now()` ist fein aufgelöst, die Messkette nicht: Start ist der Bildaufbau vor der Anzeige,
  Ende die Verarbeitung im Browser; dazwischen liegen Monitor-, Maus- und Browserlatenz (zum Vergleich: lokale Latenz
  realer Spielsysteme 23–243 ms; Ivkovic et al., 2015). Schon die Hardware-Verzögerung der kalibrierten Woods-Messung
  (231 − 213 = 18 ms) entspricht rund 30 Jahren Altersanstieg (0,55 ms/Jahr) [ER].

## 4. Optische und okulomotorische Grundlagen

- **Reiz:** Das Licht erscheint stets in der Blickmitte (höchste Zapfendichte; Curcio et al., 1990). Die Sehschärfe begrenzt kaum; es gibt keine Sakkaden und keine Peripherie, der Blick ruht in der Mitte, eine präzise Fixation ist für den großen, hellen Reiz aber nicht nötig. Bei zentralem Gesichtsfeldausfall (z. B. Makula) liegt der Reiz im betroffenen Bereich; Gesichtsfeldausfälle lassen sich klinisch nach dem Verlauf der Sehbahn einordnen (Muchnick, 2008, S. 32), die Übung ist kein Gesichtsfeldtest.
- **Helligkeit statt Farbe:** Der Reiz unterscheidet sich vom Hintergrund in der Helligkeit, nicht im Farbton, daher ist die Übung auch bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) lösbar. Die Reaktionszeit sinkt mit der Reizintensität (Piéron'sches Gesetz, auch für Wahlreaktionen bestätigt; Pins & Bonnet, 1996); Monitorhelligkeit und Raumlicht verschieben den Messwert. Die im Alter sinkende Kontrastempfindlichkeit (Owsley et al., 1983; vor allem mittlere und hohe Ortsfrequenzen) betrifft den großen Reiz vermutlich wenig.
- **Bildrate/Lidschlag:** Der Reizbeginn ist auf das Bildraster quantisiert (bei 60 Hz bis 16,7 ms). Bei schnellen Bildschirmaufgaben sinkt der Lidschlag auf etwa ein Drittel des Ruhewerts (Cardona et al., 2011); starres Warten und lange Runden begünstigen Brennen und Ermüdung (Sheppard & Wolffsohn, 2018).
- **Brille:** Zentraler, großer Reiz, auch mit Gleitsicht unkritisch, wenn die Bildschirmmitte durch den Zwischenbereich gesehen wird (Bildschirm nicht zu hoch, sonst Kopf im Nacken); der Akkommodationsbedarf beträgt bei 40 cm 2,5 dpt, bei 60 cm ≈ 1,7 dpt (Charman, 2008).
- **Stereosehen:** 2D-Bildschirm, Profilwert 0.

## 5. Neurowissenschaftliche Grundlagen

Die einfache Reaktion umfasst Reizentdeckung (≈ 131 ms), Auslösung und Ausführung; der Altersanstieg betrifft vor allem den motorischen Teil (Woods et al., 2015). Magnozelluläre Bahnen und V1 antworten zuerst, höhere Areale bis zum frontalen Augenfeld kurz danach (Schmolesky et al., 1998, Makaken). Das Warten beansprucht das **Alarmierungs-Netzwerk** (Noradrenalin aus dem Locus coeruleus, rechtshemisphärische Wachsamkeitssysteme; Petersen & Posner, 2012). Die Bereitschaft folgt der Hazardrate: Bei gleichverteilter Wartezeit steigt sie, je länger man wartet (Niemi & Näätänen, 1981). Deshalb folgt auf eine feste Mindestwartezeit von 0,9 s ein exponentiell verteilter Anteil, bei dem die Wahrscheinlichkeit „jetzt kommt es“ konstant bleibt und sich der Zeitpunkt nicht erraten lässt. Das Zurückhalten eines vorbereiteten Tipps wird einem rechts-frontalen „Brems“-Netzwerk mit Basalganglien zugeschrieben (Aron et al., 2014); echte Hemmung wird nur gefordert, wenn Stopp-Reize selten sind und das Tempo hoch ist (Wessel, 2018). Belege für eine Verbesserung der Nervenleitung oder synaptische Plastizität durch diese Übung gibt es nicht.

## 6. Motorische Grundlagen

- **Bewegung:** ein Tipp mit dem Finger irgendwo auf dem Bildschirm; gemessen wird das Erkennen, nicht das Zielen. Bei Tremor ist die Auslösung unsicherer.
- **Speed-Accuracy-Trade-off:** Wer schneller sein will, riskiert mehr Frühstarts (Heitz, 2014); FPS- und MOBA-Spieler waren im Stroop-Test schneller, aber fehleranfälliger (Kowal et al., 2018).
- **Latenz:** Geringere Gesamtlatenz nützt mehr als Bildraten über 60 Hz (Spjut et al., 2019). Web-Apps messen Touch-Reaktionen 58–70 ms zu lang (Pronk et al., 2020); Touch und Anzeige addieren eine Verzögerung, die Zeit ist daher zu lang und nur als Vergleich mit sich selbst auf demselben Gerät zu lesen (zur Wahrnehmung von Touch-Latenz Deber et al., 2015).
- **Alter:** +0,55 ms pro Lebensjahr (Woods et al., 2015), aber ab 60 deutlich mehr Schwankung von Durchgang zu Durchgang (Dykiert et al., 2012).

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Latenz, Bildrate, Touch-Abtastung, Browser und Helligkeit wirken stärker als Lernen; nur Selbstvergleich auf demselben Gerät.
- **Robuste Kennwerte:** Median und Streuung (Interquartilsabstand) statt Mittelwert, weil einzelne Ausreißer den Mittelwert verzerren (Ratcliff, 1993). Antworten von 100–149 ms werden gewertet, aber als „auffallend schnell“ gezählt (Hinweis auf Raten). Messungen am Menschen streuen; Mehrfachmessung und Median sind sinnvoll (Mountford et al., 2004, S. 44). Das Licht bleibt bis zum Tipp, höchstens 1,5 s; danach gilt der Durchgang als verpasst.
- **Zustand:** Schlafmangel verschlechtert vor allem einfache Aufmerksamkeit (Lim & Dinges, 2010); frühe Gewinne sind großteils Gewöhnung (Guo et al., 2025).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Mit Übung werden die Antworten gleichmäßiger und Frühstarts seltener; die einfache Reaktionszeit selbst ist sehr stabil (PVT, 16 Durchgänge, N = 45; Basner et al., 2018). Go/No-Go-Reaktionen waren durch langjähriges Sporttraining veränderbar, einfache nicht (Kida et al., 2005).
- **Naher Transfer – schwach:** Effekte sind groß nur bei gleichartigen Tests (SMD 2,66 vs. 0,50; Guo et al., 2025); Querschnittsbefunde zu Action-Spielern (Dye et al., 2009) gelten nicht für diese Einzelübung.
- **Alltagstransfer – fehlend:** Kein Nachweis für Spiel, Verkehr oder Beruf; Videospiel-Training zeigt kleinen bis keinen Ferntransfer (Sala et al., 2018; Bediou et al., 2023). Die Übung sagt nichts über die Fahrtüchtigkeit aus.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** einfache Reaktion und das Abwarten des echten Reizes geübt werden sollen; ein kurzes, kognitiv einfaches Aufwärmen ohne Suche und Zielen gesucht wird.
- **Weniger passend, wenn …** eine verlässliche Messung der Reaktionszeit gewünscht ist (→ Blickfit `blitzreaktion`); Hemmung gezielt geübt werden soll (→ 102); das Ziel Blickbewegung, Zielen oder Gedächtnis ist.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (Kern ist ein Aufleuchten auf dunklem Grund; das Licht blendet weich warmweiß ein, ohne Blitz und ohne roten Schimmer, trotzdem sind es mehrere Lichtreize pro Minute; Richtwert ≤ 3 Blitze/s, vgl. Fisher et al., 2005; Anfallsleiden gehören zur Vorgeschichte, die ärztlich zu erfragen ist, Muchnick, 2008, S. 7); `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (starres Warten, Lidschlag ↓; Kopfschmerz zusammen mit Sehverschlechterung ärztlich abklären lassen, Muchnick, 2008, S. 28); `sehbehinderung_niedriger_visus` (zentraler Ausfall); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung` (Zeitdruck); `tremor_parkinson` (ruhige Auslösung). Nur Auswahlhinweise.
- **Kombiniert gut mit …** 101 (Reaktion ohne Täuschung), 102 (Go/No-Go), 202 (Wahlreaktion), 208 (Daueraufmerksamkeit), 511 (Warten auf ein Ziel mit Zielen).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet:** Zielbewegung ist unnötig – „irgendwo tippen“ ist gleichwertig; Touch-Latenz (Berührung bis Anzeige
  50–200 ms, Deber et al., 2015; Messaufschlag im Browser 58–70 ms, Pronk et al., 2020) nicht bestrafen, Fenster
  adaptiv statt fest.
- **Messqualität:** exponentielle (nicht alternde) Wartezeit, Frühstart-Grenze < 100 ms, Median und
  Interquartilsabstand bei fester Durchgangszahl, Reiz bis zur Antwort sichtbar (Frist nur für Punkte, wie
  `blitzreaktion`), `event.timeStamp`.
- **Täuschreize als echter Go/No-Go-Teil:** fester Anteil ≈ 20–25 % von Anfang an, Unterscheidung über Form und
  Helligkeit (wie `stopp-los`), Fehlalarme getrennt zählen, kein Bonus unter 150 ms.
- **Sicherheit/Texte:** kein roter Schimmer, kein Wackeln, ≤ 3 Blitze/s, Blinzelhinweis, feste Dauer, keine Tier-Tabellen.

## 11. Quellen

### Von der Website angegeben

- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (200–250 ms und Hardware-Anteil ja; Monitor-/Schalterwerte, Latenzkette und Tier-Tabelle stehen nicht darin).
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓ (im Text als „Posner, 1990“); **stützt:** nein (Aufmerksamkeitsnetzwerke; nichts zu Zapfendichte oder Motorkortex-Latenz).
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (erstmals 1868) – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (einfache vs. Wahlreaktion ja; „160–220 ms“ und Tier-Tabelle nicht daraus).
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology, 4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (gilt für Wahlreaktionen; für Latenzkette und einfache Reaktion ohne Bezug).

### Weitere Fachliteratur

- Aron, A. R., Robbins, T. W., & Poldrack, R. A. (2014). Inhibition and the right inferior frontal cortex: One decade on. *Trends in Cognitive Sciences, 18*(4), 177–185. https://doi.org/10.1016/j.tics.2013.12.003 – Hemm-Netzwerk als „Bremse“ (Crossref ✓, Abstract PubMed)
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – Stabilität der einfachen Reaktionszeit
- Cardona, G., García, C., Serés, C., Vilaseca, M., & Gispets, J. (2011). Blink rate, blink amplitude, and tear film integrity during dynamic visual display terminal tasks. *Current Eye Research, 36*(3), 190–197. https://doi.org/10.3109/02713683.2010.544442 – Lidschlag bei schnellen Spielen
- Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current Directions in Psychological Science, 18*(6), 321–326. https://doi.org/10.1111/j.1467-8721.2009.01660.x – ≈ 11 % schnellere Reaktionen bei Action-Spielern, überwiegend Querschnitt (Crossref ✓, Volltext PMC2871325)
- Dykiert, D., Der, G., Starr, J. M., & Deary, I. J. (2012). Age differences in intra-individual variability in simple and choice reaction time: Systematic review and meta-analysis. *PLoS ONE, 7*(10), e45759. https://doi.org/10.1371/journal.pone.0045759 – Schwankung im Alter
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Gewöhnung vs. Transfer
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research, 22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003 – einfache vs. Go/No-Go-Reaktion
- Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. *Psychological Bulletin, 89*(1), 133–162. https://doi.org/10.1037/0033-2909.89.1.133 – Wartezeit/Hazardrate
- Petersen, S. E., & Posner, M. I. (2012). The attention system of the human brain: 20 years after. *Annual Review of Neuroscience, 35*, 73–89. https://doi.org/10.1146/annurev-neuro-062111-150525 – Alarmierungs-Netzwerk, Noradrenalin (Crossref ✓, Volltext PMC3413263)
- Pins, D., & Bonnet, C. (1996). On the relation between stimulus intensity and processing time: Piéron's law and choice reaction time. *Perception & Psychophysics, 58*(3), 390–400. https://doi.org/10.3758/BF03206815 – Reaktionszeit und Helligkeit (Crossref ✓, Abstract PubMed)
- Schmolesky, M. T., Wang, Y., Hanes, D. P., Thompson, K. G., Leutgeb, S., Schall, J. D., & Leventhal, A. G. (1998). Signal timing across the macaque visual system. *Journal of Neurophysiology, 79*(6), 3272–3278. https://doi.org/10.1152/jn.1998.79.6.3272 – Latenzen im visuellen System
- Wessel, J. R. (2018). Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm. *Psychophysiology, 55*(3), e12871. https://doi.org/10.1111/psyp.12871 – wann Go/No-Go Hemmung fordert
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Rot-Grün-Schwäche
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – kleiner bis kein Ferntransfer
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodationsbedarf, Alterssichtigkeit
- Curcio, C. A., Sloan, K. R., Kalina, R. E., & Hendrickson, A. E. (1990). Human photoreceptor topography. *Journal of Comparative Neurology, 292*(4), 497–523. https://doi.org/10.1002/cne.902920402 – höchste Zapfendichte in der Fovea
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of CHI '15* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300 – Touch-Latenz
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience, 8*, 150. https://doi.org/10.3389/fnins.2014.00150 – Tempo und Fehler
- Kowal, M., Toth, A. J., Exton, C., & Campbell, M. J. (2018). Different cognitive abilities displayed by action video gamers and non-gamers. *Computers in Human Behavior, 88*, 255–262. https://doi.org/10.1016/j.chb.2018.07.010 – schnell, aber fehleranfälliger
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin, 136*(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel und einfache Aufmerksamkeit
- Owsley, C., Sekuler, R., & Siemsen, D. (1983). Contrast sensitivity throughout adulthood. *Vision Research, 23*(7), 689–699. https://doi.org/10.1016/0042-6989(83)90210-9 – Kontrastempfindlichkeit im Alter
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchscreen
- Ratcliff, R. (1993). Methods for dealing with reaction time outliers. *Psychological Bulletin, 114*(3), 510–532. https://doi.org/10.1037/0033-2909.114.3.510 – robuste Kennwerte
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – Ferntransfer
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – Bildschirmbeschwerden
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz wichtiger als Bildfrequenz
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – S. 7, 28, 32: Anfallsleiden gehören zur erfragten Vorgeschichte; Kopfschmerz mit Sehverschlechterung als neurologisches Warnzeichen; Gesichtsfeldausfälle nach Sehbahnverlauf
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – S. 44: Anzahl der Messwiederholungen hängt von der Streuung ab; Mehrfachmessung
