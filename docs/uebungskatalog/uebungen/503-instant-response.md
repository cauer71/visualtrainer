---
# ===== Kennung =====
nr: 503
kennung: instant-response
name: "Sofortreaktion – beim grünen Aufleuchten in der Bildmitte klicken, Frühstarts und Täuschreize meiden"
name_original: "Instant Response Pro (Seitentitel: Reaktionszeit Test – FPS-Reflexe messen)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/instant-response"
blickfit_umsetzung: null
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In der Bildmitte liegt ein dunkler Punkt unter dem Fadenkreuz. Nach einer zufälligen Wartezeit leuchtet er grün auf, und man klickt so schnell wie möglich, bevor er wieder erlischt; wer vorher klickt oder auf ein schwächeres, sehr kurzes Täuschaufleuchten hereinfällt, verliert Zeit und Serie."
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
    fixation: 2
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
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Computer mit Maus (reine Touch-Geräte werden erkannt und nicht zugelassen; ohne Pointer Lock – z. B. iPad-Safari – werden Klicks ignoriert)", "Maus während der Runde ruhig liegen lassen (Treffer nur, wenn das Fadenkreuz ≤ 45 px von der Mitte entfernt ist)", "Bildschirm 50–70 cm, Vollbild empfohlen", "passende Korrektion für den Bildschirmabstand", "kein Farbsehen nötig (Aufleuchten und Täuschreiz unterscheiden sich in der Helligkeit)", "Toleranz für Zeitdruck, Aufblitzen und Fehler-Rückmeldung (roter Schimmer, Bildwackeln)"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, trockenes_auge_bildschirm, kopfschmerz_asthenopie, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, tremor_parkinson]
geeignet_fuer: ["einfache visuelle Reaktion auf einen zentralen Lichtreiz spielerisch üben", "Frühstarts unterdrücken (Warten auf den echten Reiz) und ab höheren Levels Täuschreize ignorieren (Go/No-Go-Anteil)", "Wachbleiben über wiederholte, unvorhersehbare Wartezeiten", "Selbstvergleich auf demselben Gerät, z. B. vor/nach Pausen", "kurzes Aufwärmen für Menschen, die ohnehin Ego-Shooter spielen"]
weniger_geeignet_fuer: ["Tablet- und Smartphone-Nutzung (Original nicht spielbar)", "genaue Messung der eigenen Reaktionszeit (Fenster schneidet langsame Antworten ab, Mittelwert statt Median, Geräte-Latenz)", "Übungsziel Zielen, Blickbewegungen, peripheres Sehen oder Suche", "Menschen, die unter Zeitdruck und Strafen rasch frustriert sind", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Einfache Reaktionszeit ist über Wiederholungen sehr stabil (Basner et al. 2018; Kida et al. 2005), Zugewinne sind überwiegend Gewöhnung an Aufgabe und Gerät (Guo et al. 2025); Punkte steigen eher durch Timing und weniger Fehler. Die Übung selbst und ein Transfer auf Spiel oder Alltag sind nicht untersucht."
aehnliche_uebungen: [101, 102, 202, 802, 306, 511, 508, 501, 208]
stichworte: ["Reaktionszeit", "einfache Reaktion", "Frühstart", "Antizipation", "Täuschreiz", "Go/No-Go", "Impulskontrolle", "Vorperiode", "Aufleuchten", "Ego-Shooter", "FPS", "Maus", "Pointer Lock", "Zeitdruck", "Combo"]
---

# 503 · Sofortreaktion – beim grünen Aufleuchten in der Bildmitte klicken, Frühstarts und Täuschreize meiden

> Original: „Instant Response Pro“ (Seitentitel „Reaktionszeit Test – FPS-Reflexe messen“) – skilldrills.online,
> Kapitel Zielen (`fps`) · Blickfit: noch nicht umgesetzt (verwandt: `blitzreaktion` zu 101, `stopp-los` zu 102)

## 1. Kurzbeschreibung

Auf fast schwarzem Grund liegt in der Bildmitte ein dunkelgrauer Punkt, darüber das weiße Fadenkreuz. Nach einer
zufälligen Wartezeit von rund 0,7–2,2 s leuchtet der Punkt hell grün auf; man klickt, so schnell es geht, und
bewegt die Maus dabei nicht. Wer vor dem Aufleuchten klickt, zu spät kommt oder – ab mittleren Levels – auf ein
schwächeres, nur 60 ms kurzes Täuschaufleuchten reagiert, verliert 1 s und die Trefferserie. Mit steigendem
Punktestand werden Wartezeit und Antwortfenster kürzer. Geübt wird also die einfache Reaktion mit
„Abzugsdisziplin“, nicht das Zielen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spiel-Chunk (`84331-…js`, formatiert; nur Mechanik gelesen) samt Hilfsmodulen
(Schwierigkeitskurve, Combo-Faktor, Einstellungen, Stylesheet). **[CODE]** = aus dem Code, [ER] = eigene Rechnung.

- **Eingabe [CODE]:** nur Maustaste (`mousedown`). Nach Countdown (2,45 s) Pointer Lock (ohne `unadjustedMovement`);
  nur mit gesperrtem Zeiger zählen Klicks. Treffer nur, wenn das Fadenkreuz ≤ 35 px + Zusatzzone (10 → 2 px) von der
  Mitte entfernt ist – die Maus muss also ruhig liegen. Reine Touch-Geräte werden erkannt (`pointer: fine` fehlt).
- **Reiz [CODE]:** 2D-Canvas. Ruhe: grauer Punkt (#1e293b, r = 24,5 px). Ziel: grüner Kreis (#10b981), r = 35 px,
  Deckkraft 0,88, Leuchtschein, weißer Kern. Täuschreiz: gleiche Farbe, Deckkraft 0,35, r = 30 px, ohne Schein,
  **60 ms**; Ignorieren wird nicht bestraft. Kein Ton beim Aufleuchten.
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
  Combo-Reset, Bildwackeln (8 px), roter radialer Schimmer (50 % Deckkraft, 0,45 s). Ein Zyklus dauert anfangs
  ≈ 1,7 s [ER] – sicheres Treffen verlängert die Runde. Sie endet, wenn das Fenster unter die eigene Reaktionszeit
  (inkl. Geräte-Latenz) fällt; dann kostet jeder Durchgang 2 s (Zeitüberschreitung + verspäteter Klick als „Frühstart“).
- **Auswertung [CODE]:** mittlere Reaktionszeit (Mittelwert nur der Treffer), Präzision, Frühstarts,
  Zeitüberschreitungen, Combo, Level; Note S+–F nach 100 × √(Punkte/48.000) – willkürlich, ohne Normdaten.
- **Widersprüche Regeltext ↔ Code:** „Treffer +0,6 s“ – Code +2 s; „Frühstart −0,8 s“ – Code −1 s; „Bonus < 150 ms“ –
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
  Action-Spieler sind im Querschnitt ≈ 11 % schneller in Wahlaufgaben (Dye et al., 2009) – kein Beleg für diese Übung.
  Der Tempobonus bis 150 ms belohnt Raten; im PVT gilt < 100 ms als Frühstart (Basner & Dinges, 2011).
- **Ohne Datengrundlage:** Tier-Tabelle samt „neurologischer Klassifikation“, „Profis 140–180 ms“, Schalterwerte,
  Finger-Vorspannung, „trockene Augen verlängern die Reizleitung“ (sie betreffen Bildqualität und Beschwerden).
- **Messhinweis:** `performance.now()` ist fein aufgelöst, die Messkette nicht: Start ist der Bildaufbau vor der Anzeige,
  Ende die Verarbeitung im Browser; dazwischen liegen Monitor-, Maus- und Browserlatenz (real 23–243 ms; Ivkovic et
  al., 2015). Geräteunterschiede übersteigen Altersunterschiede von Jahrzehnten (Woods et al., 2015).

## 4. Optische und okulomotorische Grundlagen

- **Reiz:** Ø 70 px ≈ 1,8° (24″-Monitor, 1.920 px, 60 cm) bzw. ≈ 1,1° am 14″-Laptop [ER], stets in der Blickmitte
  (höchste Zapfendichte; Curcio et al., 1990). Sehschärfe begrenzt kaum; keine Sakkaden, keine Peripherie, aber
  lange ruhige Fixation. Bei zentralem Gesichtsfeldausfall (z. B. Makula) liegt der Reiz im betroffenen Bereich.
- **Helligkeit statt Farbe:** Ziel und Täuschreiz unterscheiden sich in Deckkraft, Größe und Schein, nicht im Farbton →
  bei Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) lösbar. Die Reaktionszeit sinkt mit der Reizintensität
  (Piéron'sches Gesetz; Pins & Bonnet, 1996) – Monitorhelligkeit und Raumlicht verschieben den Messwert. Die im Alter
  sinkende Kontrastempfindlichkeit (Owsley et al., 1983) erschwert das Erkennen des gedimmten Täuschreizes.
- **Bildrate/Lidschlag:** 60 ms = 3–4 Bilder bei 60 Hz, Reizbeginn auf das Bildraster quantisiert (bis 16,7 ms) [ER].
  Bei schnellen Spielen sinkt der Lidschlag auf ≈ ⅓ des Ruhewerts (Cardona et al., 2011); starres Warten und lange
  Runden begünstigen Brennen und Ermüdung (Sheppard & Wolffsohn, 2018).
- **Brille:** Zentraler, großer Reiz – mit Gleitsicht unkritisch, wenn die Bildschirmmitte durch den Zwischenbereich
  gesehen wird (Monitor nicht zu hoch, sonst Kopf in den Nacken); Bedarf bei 60 cm ≈ 1,7 dpt (Charman, 2008).
- **Stereosehen:** 2D-Bildschirm → 0.

## 5. Neurowissenschaftliche Grundlagen

Die einfache Reaktion umfasst Reizentdeckung (≈ 131 ms), Auslösung und Ausführung; der Altersanstieg betrifft vor allem
den motorischen Teil (Woods et al., 2015). Magnozelluläre Bahnen und V1 antworten zuerst, höhere Areale bis zum
frontalen Augenfeld kurz danach (Schmolesky et al., 1998, Makaken). Das Warten beansprucht das **Alarmierungs-Netzwerk**
(Noradrenalin aus dem Locus coeruleus, rechtshemisphärische Wachsamkeitssysteme; Petersen & Posner, 2012). Die
Bereitschaft folgt der Hazardrate: Bei gleichverteilter Wartezeit steigt sie, je länger man wartet (Niemi & Näätänen,
1981) – das begünstigt hier Frühstarts am Ende der Wartezeit. Das Zurückhalten eines vorbereiteten Klicks wird einem
rechts-frontalen „Brems“-Netzwerk mit Basalganglien zugeschrieben (Aron et al., 2014); echte Hemmung wird nur
gefordert, wenn Stopp-Reize selten sind und das Tempo hoch ist (Wessel, 2018). „Stärkt synaptische Plastizität“ oder
„beschleunigt die Nervenleitung“ ist nicht belegt.

## 6. Motorische Grundlagen

- **Bewegung:** ein Tastendruck des Zeigefingers bei ruhiger Hand (45-px-Zone; bei Tremor gelegentlich Fehlklicks).
- **Speed-Accuracy-Trade-off:** Tempobonus und schrumpfende Fenster schieben zu Tempo und damit zu Frühstarts (Heitz,
  2014); FPS-/MOBA-Spieler waren im Stroop schneller, aber fehleranfälliger (Kowal et al., 2018).
- **Latenz:** USB-Abfrage 125 Hz bis 8 ms, 1.000 Hz 1 ms [ER]; geringere Gesamtlatenz nützt mehr als Bildraten über 60 Hz
  (Spjut et al., 2019). Web-Apps messen Touch-Reaktionen 58–70 ms zu lang (Pronk et al., 2020).
- **Alter:** +0,55 ms pro Lebensjahr (Woods et al., 2015), aber ab 60 deutlich mehr Schwankung von Durchgang zu Durchgang
  (Dykiert et al., 2012) – bei kurzen festen Fenstern mehr Zeitüberschreitungen.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Latenz, Bildrate, Maus-Abfrage, Browser, Helligkeit wirken stärker als Lernen → nur Selbstvergleich.
- **Zensierte Messung:** Nur Treffer innerhalb des Fensters zählen; je kürzer es wird, desto mehr langsame Antworten
  fallen heraus → die mittlere Reaktionszeit wird mit dem Level künstlich besser. Mittelwert statt Median, keine Streuung
  (robuste Kennwerte: Ratcliff, 1993).
- **Antizipation:** steigende Hazardrate und fehlende Frühstart-Grenze belohnen Raten; nach einem Klick auf einen
  Täuschreiz kommt das nächste Ziel vorhersehbar nach 350 ms.
- **Zustand:** Schlafmangel verschlechtert v. a. einfache Aufmerksamkeit (Lim & Dinges, 2010); frühe Gewinne sind
  großteils Gewöhnung (Guo et al., 2025). Punkte, Level, Rundendauer und Fenster hängen voneinander ab.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Punkte steigen mit Übung (Timing, weniger Frühstarts); die einfache Reaktionszeit selbst ist
  sehr stabil (PVT, 16 Durchgänge, N = 45; Basner et al., 2018). Go/No-Go-Reaktionen waren durch langjähriges
  Sporttraining veränderbar, einfache nicht (Kida et al., 2005).
- **Naher Transfer – schwach:** Effekte sind groß nur bei gleichartigen Tests (SMD 2,66 vs. 0,50; Guo et al., 2025);
  Querschnittsbefunde zu Action-Spielern (Dye et al., 2009) gelten nicht für diese Einzelübung.
- **Alltagstransfer – fehlend:** kein Nachweis für Spiel, Verkehr oder Beruf; Videospiel-Training zeigt kleinen bis
  keinen Ferntransfer (Sala et al., 2018; Bediou et al., 2023).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** einfache Reaktion und das Abwarten des echten Reizes spielerisch geübt werden sollen; die Person
  Maus und Tempo mag; ein kurzes, kognitiv einfaches Aufwärmen ohne Suche und Zielen gesucht wird.
- **Weniger passend, wenn …** nur ein Tablet vorhanden ist; eine verlässliche Messung gewünscht ist (→ Blickfit
  `blitzreaktion`); Hemmung gezielt geübt werden soll (→ 102); Ziel Blickbewegung, Zielen oder Gedächtnis.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (Kern ist ein Aufblitzen auf
  dunklem Grund, 60-ms-Täuschblitze, roter Schimmer und Bildwackeln bei jedem Fehler, bei Dauerklicken mehrmals pro
  Sekunde; Grenze ≤ 3 Blitze/s, Fisher et al., 2005); `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (starres
  Warten, Lidschlag ↓, Runden verlängern sich); `sehbehinderung_niedriger_visus` (zentraler Ausfall, Kontrast für den
  gedimmten Täuschreiz); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung` (Zeitdruck, Strafen, Täuschreize);
  `tremor_parkinson` (ruhiges Fadenkreuz, verlangsamte Auslösung vs. schrumpfende Fenster). Nur Auswahlhinweise.
- **Kombiniert gut mit …** 101 (Reaktion ohne Täuschung), 102 (Go/No-Go), 202 (Wahlreaktion), 208
  (Daueraufmerksamkeit), 511 (Warten auf ein Ziel mit Zielen).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet:** Zielbewegung ist unnötig – „irgendwo tippen“ ist gleichwertig; Touch-Latenz (50–200 ms; Deber et al.,
  2015) nicht bestrafen, Fenster adaptiv statt fest.
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
- Donders, F. C. (1969). On the speed of mental processes (W. G. Koster, Übers.). *Acta Psychologica, 30*, 412–431. https://doi.org/10.1016/0001-6918(69)90065-1 (Original 1868) – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (einfache vs. Wahlreaktion ja; „160–220 ms“ und Tier-Tabelle nicht daraus).
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
- Ebenfalls zitiert (alle Crossref ✓, Angaben in `lit-W06-fps-a` bzw. `docs/wissenschaft/01`): Basner & Dinges (2011) https://doi.org/10.1093/sleep/34.5.581 · Bediou et al. (2023) https://doi.org/10.1037/tmb0000102 · Birch (2012) https://doi.org/10.1364/JOSAA.29.000313 · Charman (2008) https://doi.org/10.1111/j.1444-0938.2008.00256.x · Curcio et al. (1990) https://doi.org/10.1002/cne.902920402 · Deber et al. (2015) https://doi.org/10.1145/2702123.2702300 · Fisher et al. (2005) https://doi.org/10.1111/j.1528-1167.2005.31405.x · Heitz (2014) https://doi.org/10.3389/fnins.2014.00150 · Ivkovic et al. (2015) https://doi.org/10.1145/2702123.2702432 · Kowal et al. (2018) https://doi.org/10.1016/j.chb.2018.07.010 · Lim & Dinges (2010) https://doi.org/10.1037/a0018883 · McLellan et al. (2016) https://doi.org/10.1016/j.neubiorev.2016.09.001 · Owsley et al. (1983) https://doi.org/10.1016/0042-6989(83)90210-9 · Pronk et al. (2020) https://doi.org/10.3758/s13428-019-01321-2 · Ratcliff (1993) https://doi.org/10.1037/0033-2909.114.3.510 · Sala et al. (2018) https://doi.org/10.1037/bul0000139 · Sheppard & Wolffsohn (2018) https://doi.org/10.1136/bmjophth-2018-000146 · Spjut et al. (2019) https://doi.org/10.1145/3355088.3365170
