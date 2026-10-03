---
# ===== Kennung =====
nr: 404
kennung: constant-slow-pursuit
name: "Sanfte Blickfolge (Lissajous-Bahn)"
name_original: "Übung für sanfte Blickfolge – Langsames Ziel · Blickstabilität (Constant Slow Pursuit)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit"
blickfit_umsetzung: {kennung: "sanfte-blickfolge", name: "Sanfte Blickfolge", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sanfte-blickfolge/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Kugel gleitet auf einer weichen, sich wiederholenden Schlaufenbahn (Lissajous-Figur 2 : 3) über den Bildschirm. Man folgt ihr ruhig mit den Augen bei ruhigem Kopf und meldet ein kurz in der Kugel erscheinendes Zeichen (Landolt-Ring). Das Tempo steigt stufenweise. Ob die Augen wirklich folgen, wird nicht gemessen."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Manuell: Tempo 0,5–9× (Regler in 0,1-Schritten; 1× ≈ 10°/s im Mittel am 24″-Monitor in 60 cm, eine volle Figur in 28,6 s), Zielradius 10–50 px (Standard 16 px), 'Hide Line' (Bahn ausblenden; weniger Vorhersagehilfe), 'Random Speed' (Zufallstempo; Tempo schwankt zeitabhängig zwischen 0,4- und 1,9-fach). Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung – 'Score' ist nur das gewählte Tempo, dazu ein Zähler abgeschlossener Sitzungen", "sinnvoll mit Eyetracker: Folge-Gain, Aufholsakkaden pro Minute, Positionsfehler in Grad", "Ersatz ohne Eyetracker: Zeiger-/Fingerabstand zum Ziel in Grad und Anteil der Zeit im Ziel (manuelles Nachführen)", "Ersatz ohne Eyetracker: Erkennungsaufgabe im bewegten Ziel (kurz eingeblendetes Zeichen)", "subjektiv: Komfort/Beschwerden 0–10 bei gleichem Gerät und Abstand"]

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
    auge_hand_koordination: 1
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
voraussetzungen: ["Bildschirm oder Tablet (Querformat, Ständer) in 40–70 cm Abstand, Kopf möglichst ruhig", "Scharfes Sehen im Zwischenbereich über eine Bahn von ≈ 37° × 21° (Monitor) bzw. ≈ 25° × 17° (Tablet) – Arbeitsplatzbrille oder Einstärkenglas günstiger als Gleitsicht", "Maus oder Finger nur zum Starten; Mitführen freiwillig und ohne Wertung", "Bereitschaft, ohne Rückmeldung 30–120 s konzentriert zu folgen"]
vorsicht_bei: [presbyopie_gleitsicht, schwindel_vestibulaer, reisekrankheit, nystagmus, schielen_binokular, trockenes_auge_bildschirm, kopfschmerz_asthenopie, kinder_unter_6]
geeignet_fuer: ["ruhiger Einstieg in glatte Blickfolge auf den niedrigen Stufen (≈ 5–9°/s am Tablet in 40 cm) ohne Reaktions- und Handdruck", "zweidimensionale Blickfolge mit waagrechten und senkrechten Anteilen an einer gleichmäßig wiederkehrenden Kurve", "schrittweises Steigern in kleinen Stufen, die dem eigenen Ergebnis folgen (Tempo, Zeichengröße, Anzeigedauer, Hilfslinie)", "kurze Augenübung ohne Blitzreize, auch als Aufwärmen vor schwereren Blickfolge-Übungen (403, 405–407, 409)"]
weniger_geeignet_fuer: ["alle, die einen Leistungswert oder einen Fortschritt in Prozent erwarten (das Ergebnis gilt nur im Vergleich mit sich selbst)", "Gleitsichtträger:innen am großen Monitor ohne Kopfbewegung (die Bahn reicht weit über den scharfen Zwischenbereich hinaus, auch senkrecht)", "Ziel Reaktion, Peripherie, Handgenauigkeit oder 'besser lesen'", "hohe Stufen für Ungeübte und Ältere (Tempo bis ≈ 24°/s)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Vorhersagbare, niederfrequente Bahnen werden im Labor innerhalb von Minuten besser verfolgt (McHugh & Bahill, 1985), kurzes Pursuit-Training wirkte einige Tage nach (Eibenberger et al., 2012) – beides mit Eyetracker, nicht mit dieser Übung; Übertragung auf andere Bahnen ist kaum untersucht, ein Alltagsnutzen nie gezeigt."
aehnliche_uebungen: [402, 403, 405, 406, 407, 409, 412, 413, 105, 514, 707, 104]
stichworte: ["smooth pursuit", "glatte Blickfolge", "sanfte Blickfolge", "Lissajous-Figur", "2D-Blickfolge", "prädiktive Blickfolge", "Aufholsakkaden", "Blickstabilität", "Einsteigerübung", "langsames Ziel"]
---

# 404 · Sanfte Blickfolge (Lissajous-Bahn)

> Original: „Übung für sanfte Blickfolge – Langsames Ziel · Blickstabilität“ („Constant Slow Pursuit“) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf ruhigem, dunklem Grund läuft eine Kugel mit gleichmäßigem Tempo auf einer weichen, in sich geschlossenen Schlaufenbahn
(Lissajous-Figur im Verhältnis 2 : 3) mit waagrechten und senkrechten Anteilen; eine schwache Hilfslinie zeigt die Bahn und blendet auf
höheren Stufen aus. In den engsten Bögen bremst die Kugel nur leicht ab. Man folgt ihr ruhig mit den Augen und hält den Kopf still. In
unregelmäßigen Abständen erscheint kurz ein Landolt-Ring („C“) in der Kugel, nur bei fast vollem Tempo; mit einem großen Button unten
meldet man, wohin seine Öffnung zeigt (←, ↑, ↓, →). Eine Sitzung umfasst 20 Zeichen. Das Tempo steigt stufenweise (am Tablet in 40 cm
Abstand von etwa 5 auf etwa 24°/s), dazu werden Zeichengröße und Anzeigedauer (650 bis 240 ms) strenger. Die Bahn ist höchstens 60 % der
Bildschirmbreite breit. Ob die Augen wirklich folgen, wird nicht gemessen, nur ob das Zeichen erkannt wird.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunk `69204-…js`, Hilfsmodule in `90762-…js`, Stand 29.09.2026); nur Mechanik
ausgewertet. Grad-Angaben sind eigene Umrechnungen (24″-Full-HD in 60 cm ≈ 38 px/°; 11″-Tablet in 40 cm ≈ 36 px/°).

- **Ablauf (Code):** Einstellungen → Vollbild → Countdown 3-2-1-GO (≈ 2,5 s) → 30/45/60/90/120 s (Standard 60 s)
  → Endbildschirm „Sanfte Blickfolge kalibriert“ mit Dauer, Grundtempo, Tempoänderung (Fest/Aktiv) und
  Sitzungszähler (nur im Browser gespeichert). Abbruch mit Escape oder Verlassen des Vollbilds.
- **Bahn (Code):** Lissajous-Figur 3 : 4 um die Bildmitte, x-Ausschlag ±38 % der Bildbreite, y-Ausschlag ±38 %
  der Bildhöhe (Form hängt vom Seitenverhältnis ab). Waagrechte Schwingung 0,105 Hz, senkrechte 0,140 Hz bei 1×;
  eine vollständige Figur dauert **28,6 s** – in 60 s läuft sie gut zweimal durch.
- **Tempo (Code):** zeitbasiert (Zeitschritt, begrenzt auf 100 ms), also unabhängig von der Bildrate. Trotz des
  Namens „Constant“ ist das Tempo entlang der Bahn **nicht konstant**: bei 1× am Monitor 3,3–15,9°/s (Faktor ≈ 5;
  langsam an den Umkehrpunkten, schnell beim Durchqueren der Mitte).

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 7× | 9× |
|---|---|---|---|---|---|---|---|
| 24″-Full-HD, 60 cm (Bahn 37° × 21°): mittel / Spitze °/s | 5 / 8 | 10 / 16 | 21 / 32 | 32 / 48 | 52 / 80 | 74 / 111 | 94 / 143 |
| 11″-Tablet quer, 40 cm (Bahn 25° × 17°): mittel / Spitze °/s | 4 / 6 | 8 / 11 | 15 / 23 | 23 / 34 | 38 / 56 | 53 / 79 | 68 / 102 |

- **Reiz (Code):** „Größe 16 px“ ist der **Radius**; gezeichnet werden Außenring (Ø 42 px), Ring (Ø 32 px ≈ 0,85°)
  und gefüllter Kern mit weißem Mittelpunkt; einstellbar 10–50 px (Ø 0,5–2,6° am Monitor). Sechs Zielfarben ohne
  Informationsgehalt (Rot, Grün, Blau, Orange, Gelb, Weiß). Hintergrundraster 40 px (2 % Deckkraft), Bahnlinie 3 px
  (22 %). Optional Spur (14 Positionen), Leuchtsaum (Standard an), „Scanlines“ (1,5 %), „Heller Modus“. Keine Blitze.
- **„Zufallstempo“ (Code):** keine Zufallszahl, sondern eine feste Summe langsamer Schwingungen (≈ 0,13–0,51 Hz);
  Tempofaktor 0,40–1,90, im Mittel **1,15** – das Tempo steigt also im Schnitt um 15 %. Die Phase richtet sich nach
  der Zeit seit dem Laden der Seite, deshalb wirkt jeder Durchgang anders.
- **Bildrate (Code):** Bilder < 13 ms nach dem vorigen werden verworfen → höchstens ≈ 77 Bilder/s (120 Hz → 60).
  Bei 9× springt das Ziel am Monitor bis ≈ 2,4° pro Bild – fast drei Zieldurchmesser; die Bewegung ruckt.
- **Zeiger (Code):** Maus-/Fingerposition erscheint als Fadenkreuz, wird aber **nicht ausgewertet**. Der geteilte
  „Score“ ist das eingestellte Tempo („… mit 1,0× Tempo abgeschlossen“).

**Widersprüche Regeltext ↔ Code:** (1) „vergleiche, wie ruhig du der Bahn folgen kannst“ und „Score“ – gemessen wird
nichts; „kalibriert“ auf dem Endbildschirm ist irreführend (die Seite selbst sagt: kein Messwert). (2) „Constant“ und
„langsames Ziel“: Tempo schwankt entlang der Bahn um den Faktor ≈ 5 und reicht bis 9× (Spitze ≈ 140°/s).
(3) „Zufallstempo“ ist deterministisch und erhöht das Durchschnittstempo. (4) „Kontrast steuern“ – einstellbar sind
nur Farbe und heller Modus.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt sanfte Blickfolge korrekt (bewegtes Bild im zentralen Blick halten), erklärt Lissajous-Bahn und
Aufholsakkaden und betont mehrfach: keine Aufzeichnung der Augen, kein klinischer Messwert, keine Verbesserung der
Sehkraft, keine Behandlung. Empfohlen: 30–60 s bei niedrigem Tempo, nur **eine** Schwierigkeit auf einmal, Blöcke von
5–10 min mit Pausen, normal blinzeln, Abbruch bei Schmerzen, Schwindel, Übelkeit oder anhaltendem Verschwommensehen.
Die Referenztabelle („Orientierung 0,5–1,0× … Nur Referenz“) nennt ausdrücklich **Komfortbänder, keine Normen**.

- **Einordnung:** die sachlichste Seite der Gruppe – keine erfundenen Leistungsstufen, kein Transferversprechen, keine
  Hirnregionen-Behauptungen. Fachlich richtig: Ohne Eyetracker lässt sich Blickfolge nicht beurteilen.
- **Aufholsakkaden:** passt zur Forschung; ausgelöst über Positions- und Geschwindigkeitsfehler (de Brouwer et al.,
  2002), auch bei Gesunden normal, glatter Gain < 0,95 (Collewijn & Tamminga, 1984).
- **„Pointer als Hilfe“:** teilweise plausibel – beim Mitführen der Hand wurde die Augenfolge glatter, allerdings nur
  bei Sinusbewegungen über ≈ 1 Hz (Koken & Erkelens, 1992) bzw. bei einer unvorhersehbaren Bahn mit Cursor am
  Manipulandum (Danion & Flanagan, 2018). Für die langsamen Schwingungen hier (0,1–0,14 Hz bei 1×) ist das nicht
  gezeigt. Am Tablet verdeckt der Finger außerdem den Punkt.
- **Lissajous-Bahnen** sind ein Laborparadigma, z. B. in Studien zu klinischen Unterschieden der Blickfolge (Benson et
  al., 2012) – dort stets mit Eyetracker. Ohne Messung erlaubt die Übung keinen Rückschluss auf die eigene Blickfolge.
- **Quellen:** 4 Angaben; Rashbass-Titel leicht falsch, Kosinski ohne DOI und mit anderen Zahlen; Woods et al. und
  Kosinski betreffen Reaktionszeit und tragen zur Blickfolge nichts bei (Abschnitt 11).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Der Landolt-Ring misst 6 % der kürzeren Bildschirmseite (Stufe 1) und wird mit der Stufe kleiner (nie unter 30 px); die
  Öffnung ist ein Fünftel des Durchmessers. Am 11-Zoll-Tablet in 40 cm sind das etwa 1,4° bis etwa 0,8° – die Sehschärfe ist kaum gefordert.
  Kleine, in die Fovea passende Ziele – und ein zentraler Punkt auf größeren Objekten – gingen mit mehr Aufholsakkaden einher (Heinen et al.,
  2016).
- **Tempo:** Bei 5–24°/s folgen Gesunde gut glatt; Latenz bei unvorhersehbarem Start ≈ 100 ms (Carl & Gellman, 1987). Die Bahn wiederholt
  sich und ist gut vorhersagbar; bei pseudozufälligen Mehrfrequenzreizen hing der Gain an der höchsten Frequenz (0,92 bei 0,39 Hz, 0,53 bei
  1,56 Hz; Barnes et al., 1987) – eine periodische Bahn ist leichter vorhersagbar, die Werte sind nur grobe Orientierung. Bei gleichförmiger
  Rampenbewegung erreichten im Labor 4 von 5 Versuchspersonen ≈ 90 % Gain bis 100°/s, die fünfte nur ≈ 60 % dieser Werte (Meyer et al.,
  1985); das höchste Tempo dieser Übung liegt deutlich darunter.
- **Richtung und Kurven:** Waagrecht wird besser gefolgt als senkrecht (Rottach et al., 1996); die 2 : 3-Figur hat einen größeren senkrechten
  Anteil als die flache Acht (402). In engen Kurven verlangsamt das Auge gesetzmäßig (Zwei-Drittel-Gesetz; de'Sperati & Viviani, 1997); die
  Kugel bremst deshalb in den engsten Bögen leicht ab (nie unter 55 % des Tempos) und läuft sonst mit vollem Tempo.
- **Hintergrund:** Der Hintergrund bleibt ruhig und ohne Struktur; strukturierte Hintergründe senken den Gain (Collewijn & Tamminga, 1984).
- **Gleitsicht/Arbeitsplatz:** Das scharfe Sehfeld im Zwischenbereich war bei 60 cm mit zwei Gleitsichtgläsern nur ≈ 13° bzw. 18° breit
  (Einstärkenglas 60°); Kopfbewegungen dauerten länger, der Blick kam später zur Ruhe (Han et al., 2003; waagrechtes Lesen, n = 11). Die Bahn
  führt durch seitliche Unschärfezonen und senkrecht durch verschiedene Wirkungszonen (unten Nahteil, oben Fernteil) → Arbeitsplatzbrille,
  kleineres Gerät oder mehr Abstand, Kopf bewusst mitbewegen.
- **Nähe, Auge, Farbe, Alter:** 40 cm ≈ 2,5 dpt, 60 cm ≈ 1,7 dpt Akkommodation bzw. Nahkorrektur (Rechenregel: 20 cm = 5 dpt, 10 cm = 10 dpt). Lidschlag
  am Bildschirm ≈ 11,6/min (Portello et al., 2013) – bei trockenem Auge kurze Blöcke. Farbe trägt keine Information. Bei 75–93-Jährigen ist
  der Gain bei allen Tempi niedriger (Moschner & Baloh, 1994) → niedrige Stufen.

## 5. Neurowissenschaftliche Grundlagen

- Bewegungssignale aus MT/V5 und MST werden über frontales und supplementäres Augenfeld, Brückenkerne und Kleinhirn in Folgebewegung
  umgesetzt (Lencer & Trillenberg, 2008); Basalganglien und Colliculus superior sind beteiligt, Folge und Sakkaden teilen eine Architektur
  (Krauzlis, 2004).
- Bei wiederkehrenden Bahnen nutzt das System gespeicherte Geschwindigkeits- und Zeitinformation (Barnes, 2008). Affen folgten 2D-Summen
  aus Sinusschwingungen (Lissajous-ähnlich) mit Gain ≈ 0,83 und ≈ 6° Phasenfehler – nur durch Vorhersage erklärbar; eine schnellere
  Schwingung auf der anderen Achse senkte den Gain etwas (Kettner et al., 1996). Beim Menschen ist der Vorhersageanteil bei einfachen
  2D-Summen am größten (Soechting et al., 2010).
- Dass die Übung bestimmte Hirnareale „trainiert“, ist nicht belegt.
- **Klinischer Hintergrund:** Die äußeren Augenmuskeln werden klinisch geprüft, indem die Augen einem nahen Ziel folgen, das in einem „H“
  geführt wird; die Prüfung betrifft die Hirnnerven III, IV und VI (Muchnick, 2008, S. 32–35). Diese Übung ist keine solche Prüfung.

## 6. Motorische Grundlagen

Die „Motorik“ der Übung ist die Augenbewegung (glatte Folge + Aufholsakkaden); gefordert ist nur ein Tipp auf einen großen Button unten.
Wer freiwillig mit Maus oder Finger mitfährt (nicht gefordert, nicht gewertet), führt manuell nach, mit intermittierenden Korrekturen
(Leistungsspitze 0,5–1,8 Hz, ≈ 170 ms Abstand; Miall et al., 1993). Mitführen der Hand glättete im Labor die Augenfolge bei Sinusbewegungen
über ≈ 1 Hz (Koken & Erkelens, 1992) bzw. bei einer unvorhersehbaren Bahn mit Cursor am Manipulandum (Danion & Flanagan, 2018); für langsame
Schwingungen wie hier ist das nicht gezeigt. Am Tablet hinkt ein Zeiger wegen Touch-Latenz (Safari-Canvas ≈ 77 ms; Casiez et al., 2017)
hinterher, und die Fingerkuppe verdeckt das Ziel.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob glatt gefolgt wurde, bleibt offen; das Zeichen lässt sich auch mit einzelnen Blicksprüngen erkennen, und eigene
  Blicksprünge bemerkt man oft nicht.
- **Gerät:** Bildgröße, Seitenverhältnis und Abstand ändern Bahnform und °/s stark – „Stufe 5“ ist kein fester Reiz. Ergebnisse verschiedener
  Geräte (Touch, Maus, Tablet, Monitor) nicht gleichsetzen: Zwei Verfahren können ähnliche Tendenzen zeigen, ohne dieselben Werte zu liefern
  (Mountford et al., 2004, S. 24).
- **Person:** Alter, Müdigkeit, Konzentration. Eine Sitzung umfasst nur 20 Zeichen; Lernen der ganzen Figur ist begrenzt, lokal sind die
  langsamen Schwingungen aber gut vorhersagbar.
- **Streuung:** Messungen am Menschen streuen stärker als an Prüfkörpern; ein einzelner Durchgang sagt wenig, und aussagekräftig ist nur der
  Verlauf über mehrere Sitzungen (Mountford et al., 2004, S. 43–44).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Vorhersagbare Wellenformen wurden nach 100–200 s deutlich genauer verfolgt (Fehler 0,5 → 0,1 deg²; McHugh &
  Bahill, 1985); 2 × 6 min Training an 3 Tagen wirkte 5 Tage nach (n = 10 + 10; Eibenberger et al., 2012) – Laborbefunde mit Eyetracker,
  nicht mit dieser Übung. Lissajous-Bahnen sind ein Laborparadigma der Blickfolgeforschung (z. B. Benson et al., 2012), dort stets mit
  Eyetracker.
- **Naher Transfer – schwach:** kaum Daten, ob eine feste Bahn andere Bahnen, Tempi oder Richtungen verbessert.
- **Alltagstransfer – fehlend:** kein Beleg für Lesen, Sport oder Verkehr. Große Effekte digitaler Sehtrainings entstehen vor allem, wenn
  Training und Test gleich sind (Guo, Yuan et al., 2025); „Brain-Training“ verbessert meist nur die geübte Aufgabe (Simons et al., 2016).
  Ohne Eyetracker lässt sich Blickfolge nicht beurteilen; die Übung erlaubt keinen Rückschluss auf die eigene Blickfolge.
- **Praxisangaben (Erfahrungswissen, nicht belegt):** In der Sehtherapie werden Folgebewegungen klassisch an einem an einer Schnur hängenden
  Ball mit Buchstaben geübt, der in verschiedene Richtungen und im Kreis schwingt, bei ruhigem Kopf. Man beginnt am eigenen Arbeitspunkt und
  steigert in kleinen, selbst gesteuerten Schritten (Tempo, Richtungen, Zeichen auf dem Ziel). Wirksamkeitsbelege dafür liegen nicht vor.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** ruhige 2D-Blickfolge ohne Reaktions- und Handdruck geübt werden soll; als Einstieg oder Aufwärmen auf den niedrigen Stufen
  mit großem Zeichen; als kurze Augenübung ohne Blitzreize; bei Steigerung in kleinen Schritten.
- **Weniger passend, wenn …** ein Leistungswert erwartet wird; Reaktion, Peripherie oder Handgenauigkeit das Ziel sind; „besser lesen“ oder
  „bessere Sehkraft“ erwartet wird (nicht belegt).
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`: Bahn durch Unschärfezonen → Kopf mitbewegen, Arbeitsplatzbrille.
  - `schwindel_vestibulaer`, `reisekrankheit`: großflächige Bewegung; Menschen mit visuellem Schwindel reagieren auf Bewegungsreize (Bronstein,
    1995) → langsam beginnen, bei Übelkeit abbrechen.
  - `nystagmus`, `schielen_binokular`: Folge oft verändert – keine Rückschlüsse ziehen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: seltener Lidschlag → kurze Blöcke.
  - `kinder_unter_6`: Die Folgebewegung reift bis ins Jugendalter.
  - Warnzeichen: Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze oder neue Schleier, Kopfschmerz mit Sehverschlechterung,
    Schwindel oder neu auftretendes Zittern gehören in eine ärztliche Abklärung (Muchnick, 2008, S. 6, 28); dann nicht üben. Bei Schmerzen,
    Schwindel, Übelkeit oder anhaltendem Verschwommensehen abbrechen.
- **Kombiniert gut mit …** 402 (Acht), 403 (Sinus), 405/406 (Richtungswechsel), 409 (Folgen während Dunkelphasen), 407 (Blicksprung auf ein
  abbremsendes Ziel), 412 (Nachzieh-Spur), 105 „Scharf in Bewegung“ (überprüfbare Erkennung am bewegten Ziel), 707/514 (Nachführen mit Wertung).
- **Abgrenzung in der Gruppe:** 402–406 teilen den Aufbau (Kugel mit Landolt-Ring, Antwort per Button) und unterscheiden sich in der Bahn:
  404 weiche Lissajous-Schlaufe (2 : 3) mit dem größten senkrechten Anteil und nahezu gleichmäßigem Tempo, 402 flache Acht, 403 Sinuswelle mit
  steigender Wellenzahl, 405 Zickzack mit schärfer werdendem Knick, 406 Dreieck mit abrupten Ecken. Für eine Auswahl genügt meist eine davon.

Keine Diagnose, kein Heil- oder Sehversprechen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Überprüfbare Aufgabe statt „kalibriert“:** kurz im Ziel eingeblendetes Landolt-C (wie 105) oder optionales
  Mitführen mit Abstandswertung in Grad.
- **Reiz in Grad:** Bahngröße und Tempo (°/s) aus Bildschirmgröße und Abstand; Bahnmaße wählbar (≤ 15–20° für
  Gleitsicht); echtes konstantes Bahntempo als Option, damit der Name stimmt.
- **Tempo:** Standard 5–15°/s, Obergrenze ≈ 40°/s, klare Stufen; „Zufallstempo“ ohne Anhebung des Mittelwerts;
  keine Bildraten-Drosselung. **Tablet:** Querformat mit Ständer, Radius ≥ 20 px, Antwort über große Tasten.
- **Texte:** Sicherheitshinweise der Website übernehmen, Gleitsicht- und Abstandshinweis ergänzen; DE/IT; dunkler Modus
  als Standard.

## 11. Quellen

### Von der Website angegeben
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, Titelwort falsch (Website „pursuit“ statt „tracking“), Inhalt nur bibliografisch geprüft; **stützt die Aussage der Website:** ja (Konzept: Zusammenspiel von Sakkaden und glatter Folge bzw. Aufholsakkaden; genauer belegt bei de Brouwer et al., 2002)
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Definition und Netzwerk der Blickfolge; keine Trainingsaussagen)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (belegt Hardware-Verzögerungen, z. B. 17,8 ms im kalibrierten Aufbau; nichts zu Sichtbarkeit oder Verfolgbarkeit des Punkts; Reaktionszeitstudie)
- Kosinski, R. J. (2013). *A literature review on reaction time* (zuletzt aktualisiert September 2013). Clemson University. https://facultypsy.hope.edu/psychlabs/exp/reactiontime/docs/RT_Literature_Review.pdf – **Prüfung:** keine DOI (so auch angegeben); Website nennt 2008 und „200–250 ms“, die abrufbare Fassung nennt 180–200 ms; nicht begutachtet; **stützt:** nein (Reaktionszeit ist für eine Folgeaufgabe ohne Reaktion kaum relevant)

### Weitere Fachliteratur
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – Vorhersage, extraretinale Signale
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649 – Gain hängt an der höchsten Frequenz
- Benson, P. J., Beedie, S. A., Shephard, E., Giegling, I., Rujescu, D., & St Clair, D. (2012). Simple viewing tests can detect eye movement abnormalities that distinguish schizophrenia cases from controls with exceptional accuracy. *Biological Psychiatry, 72*(9), 716–724. https://doi.org/10.1016/j.biopsych.2012.04.019 – Lissajous-Blickfolge als Laborparadigma (mit Eyetracker)
- Bronstein, A. M. (1995). Visual vertigo syndrome: Clinical and posturography findings. *Journal of Neurology, Neurosurgery & Psychiatry, 59*(5), 472–476. https://doi.org/10.1136/jnnp.59.5.472 – visueller Schwindel
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz ≈ 100 ms
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology (UIST '17)* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Touch-Latenz
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – Gain < 0,95, Hintergrund
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Handnachführen erhöht den Folge-Gain (unvorhersehbare Bahn)
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Auslöser von Aufholsakkaden
- de'Sperati, C., & Viviani, P. (1997). The relationship between curvature and velocity in two-dimensional smooth pursuit eye movements. *The Journal of Neuroscience, 17*(10), 3932–3945. https://doi.org/10.1523/JNEUROSCI.17-10-03932.1997 – Kurven, Zwei-Drittel-Gesetz
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – Trainierbarkeit
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt statt Transfer
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- Heinen, S. J., Potapchuk, E., & Watamaniuk, S. N. J. (2016). A foveal target increases catch-up saccade frequency during smooth pursuit. *Journal of Neurophysiology, 115*(3), 1220–1227. https://doi.org/10.1152/jn.00774.2015 – Zielgröße
- Kettner, R. E., Leung, H. C., & Peterson, B. W. (1996). Predictive smooth pursuit of complex two-dimensional trajectories in monkey: Component interactions. *Experimental Brain Research, 108*(2), 221–235. https://doi.org/10.1007/BF00228096 – 2D-Summen von Sinusschwingungen (Affen)
- Koken, P. W., & Erkelens, C. J. (1992). Influences of hand movements on eye movements in tracking tasks in man. *Experimental Brain Research, 88*(3), 657–664. https://doi.org/10.1007/BF00228195 – Hand glättet Augenfolge (Sinus > 1 Hz)
- Lencer, R., & Trillenberg, P. (2008). Neurophysiology and neuroanatomy of smooth pursuit in humans. *Brain and Cognition, 68*(3), 219–228. https://doi.org/10.1016/j.bandc.2008.08.013 – Netzwerk beim Menschen
- McHugh, D. E., & Bahill, A. T. (1985). Learning to track predictable target waveforms without a time delay. *Investigative Ophthalmology & Visual Science, 26*(7), 932–937. https://pubmed.ncbi.nlm.nih.gov/4008209/ – keine DOI (PubMed geprüft); schnelles Lernen
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Höchstgeschwindigkeit
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – manuelles Nachführen
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Alter
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science, 90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag
- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., Discenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – horizontal > vertikal
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – kaum Ferntransfer
- Soechting, J. F., Rao, H. M., & Juveli, J. Z. (2010). Incorporating prediction in models for two-dimensional smooth pursuit. *PLoS ONE, 5*(9), e12574. https://doi.org/10.1371/journal.pone.0012574 – 2D-Vorhersage beim Menschen
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen, Augenbewegungsprüfung, Sehbahn (S. 6, 28, 32–35)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Wiederholbarkeit, Mehrfachmessung (S. 24, 43–44)
