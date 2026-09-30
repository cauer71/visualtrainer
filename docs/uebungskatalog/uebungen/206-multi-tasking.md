---
# ===== Kennung =====
nr: 206
kennung: multi-tasking
name: "Zwei-Ströme-Symbolsuche (Multitasking)"
name_original: "Multitasking-Test – Zwei Zielströme gleichzeitig verfolgen (Dual-Stream-Tracking)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "attention"
quelle_url: "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking"
blickfit_umsetzung: {kennung: "weichensteller", name: "Weichensteller", unterschiede: "Kein zweiter Symbolstrom, sondern echter Aufgabenwechsel: eine Ziffer wird je nach angekündigter Regel (Kreis: gerade/ungerade, Quadrat: kleiner/größer als 5) mit denselben zwei Tasten beurteilt. Regelwechsel immer mit Hinweisreiz (Form + Symbol + Frage, nie nur Farbe), einstellbare Vorwarnzeit 1000 bis 100 ms, Rein- und Mischblöcke, Wechsel- und Mischkosten in ms als Zusatzwerte; adaptive Stufe 1–20 statt Punkte-Combo, keine Zeitstrafe, Pfeiltasten und Touch."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Zwei Bildhälften (bei Hochformat oben und unten), in denen kleine Symbole (▲ ● ■ ★ ◆ …) in entgegengesetzter Richtung vorbeiziehen. Man tippt nur die Symbole an, die zum angezeigten Zielsymbol der jeweiligen Hälfte passen, und lässt alle anderen durchlaufen; nach 20 Sekunden ändert sich das Zielsymbol."
ziel_funktionen: [geteilte_aufmerksamkeit]
eingabe: [maus, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Stufe = Punkte / 1.750 + 1 (immer Start bei Stufe 1). Mit der Stufe steigen Tempo (Durchlaufzeit 1,25 s → etwa 0,5 s) und Symboldichte (Abstand 950 → 220 ms); ab Stufe 3 (ca. 3.500 Punkte) haben beide Hälften verschiedene Zielsymbole. Zusätzlich beschleunigt die Combo-Serie das Tempo um bis zu 25 %."
messgroessen: ["Punkte (Bestwert im Browser)", "Genauigkeit in % (Treffer / (Treffer + Fehler))", "längste Serie (Combo)", "erreichte Stufe", "sinnvoll ergänzt: Reaktionszeit je Treffer in ms, Fehlerarten getrennt (falsch angetippt / Ziel verpasst), Leistung je Hälfte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 2
    inhibition: 2
    geteilte_aufmerksamkeit: 3
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Symbole ca. 1–2° groß sicher unterscheidbar (Brille/Lesebrille für den Bildschirmabstand tragen)", "Maus oder Touchscreen; Vollbild empfohlen", "kein Farbsehen nötig (Symbole grau, Farbe nur als Rückmeldung)", "Schriftart muss alle acht Symbole darstellen (⬣ und ⏣ fehlen in manchen Schriften)"]
vorsicht_bei: [aufmerksamkeitsprobleme, kognitive_einschraenkung, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, schwindel_vestibulaer, reisekrankheit]
geeignet_fuer: ["zwei Bildbereiche gleichzeitig im Auge behalten und schnell zwischen ihnen wechseln (geteilte Aufmerksamkeit, Vergleich Mitte/Rand)", "kurze, spielerische Aufmerksamkeits- und Reaktionsübung unter Zeitdruck", "Erleben, wie schnell die Leistung bei zwei gleichzeitigen Aufgaben nachlässt"]
weniger_geeignet_fuer: ["Üben oder Messen von Aufgabenwechsel (Task Switching) – dafür ist Nr. 206 in der Blickfit-Umsetzung Weichensteller gedacht", "Personen, die ruhig und ohne Zeitdruck üben sollen", "Messung von Reaktionszeit oder Wechselkosten (Original erfasst keine Zeiten)", "Gleitsicht-Träger:innen ohne Anpassung (Ströme laufen bis in die Bildränder)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Für dieses Spiel selbst gibt es keine Studie; Übungseffekte in Aufmerksamkeitsaufgaben sind allgemein bekannt, Übertragung auf andere Aufgaben ist dort meist klein. Die starke Evidenz zu Wechselkosten gilt für den klassischen Aufgabenwechsel, den die Blickfit-Umsetzung nachbildet (dort: Übungseffekt stark, naher Transfer mittel)."
aehnliche_uebungen: [205, 408, 106, 201, 208, 510, 502]
stichworte: ["Multitasking", "geteilte Aufmerksamkeit", "Doppelstrom", "Aufgabenwechsel", "selektive Aufmerksamkeit", "divided attention", "task switching", "Go/No-Go"]
---

# 206 · Zwei-Ströme-Symbolsuche (Multitasking)

> Original: „Multitasking-Test – Dual-Stream-Tracking“ – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (cognitive/attention) · Blickfit: Weichensteller (Aufgabenwechsel, kein Doppelstrom)

## 1. Kurzbeschreibung
Der Bildschirm ist in zwei Hälften geteilt (Hochformat: oben und unten). In jeder Hälfte ziehen einzelne Symbole in Gegenrichtung vorbei, jede Hälfte zeigt oben ihr Zielsymbol („TARGET“). Man tippt oder klickt nur passende Symbole an; alles andere darf ungehindert durchlaufen. Wer richtig trifft, sammelt Punkte und Zeit, wer falsch tippt oder ein Ziel verpasst, verliert eine Sekunde. Die Übung fordert, beide Hälften abwechselnd im Blick zu behalten (geteilte Aufmerksamkeit) und schnell zu entscheiden, ob ein Symbol passt. Ein „Multitasking“ im strengen Sinn (zwei Aufgaben gleichzeitig ausführen) ist es nicht: Es ist immer dieselbe Aufgabe, nur in zwei Bereichen.

## 2. Ablauf im Original (Analyse)
Quelle: ausgelieferter Spielcode (Next.js-Chunk, Stand 29.09.2026; nur Mechanik beschrieben) plus Seitentext. Wo nur der Text spricht, ist es vermerkt.

- **Sitzung (Code):** Countdown 3-2-1 (700-ms-Takt), Start nach 2,45 s. 45 s Laufzeit, **jeder Treffer +2 s (max. 60 s)**, jeder Fehler −1 s (Zeitstrafe standardmäßig an, in den Einstellungen abschaltbar). Sitzungen guter Spieler:innen werden also länger, Punktzahlen sind damit nur eingeschränkt vergleichbar. Vollbild, Esc beendet.
- **Reize (Code):** Symbole aus acht Zeichen (▲ ● ■ ★ ◆ ⬣ ❖ ⏣), hellgrau auf Schwarz, Schriftgröße 4,5 rem (ca. 72 CSS-px) bzw. 2,8 rem (ca. 45 px) bei Fensterbreite unter 768 px. Sehwinkel grob 1,3–2° (Herleitung: 72 px ≈ 2° auf dem Tablet bei 40 cm, ≈ 1,9° am 24″-Monitor bei 60 cm; eigene Rechnung). Höhe zufällig, waagerechte Bewegung.
- **Ströme (Code):** Linke Hälfte läuft von rechts nach links, rechte Hälfte von links nach rechts (gegenläufig). Jeder Strom erzeugt Symbole im Takt „Abstand“; der rechte Strom startet 0,3 s später. Etwa 35 % der Symbole entsprechen dem Ziel der Hälfte, der Rest sind zufällige andere Zeichen (Ziel-Anteil ca. 35 %, sonst Ablenker).
- **Tempo (Code):** Durchlaufzeit einer Hälfte = 4.000 ms / Geschwindigkeit. Geschwindigkeit steigt mit der Stufe (Level = Punkte/1.750 + 1, Kurve über 15 Stufen) von 3,2 (Stufe 1: 1,25 s) auf rund 8 (Stufe 15: 0,5 s); die Combo-Serie erhöht sie zusätzlich um bis zu 25 % (dann 1,0 s bei Stufe 1). Erzeugungsabstand sinkt von 950 auf 220 ms (Untergrenze 160 ms); bei voller Combo zusätzlich −25 %. In Pixel pro Sekunde und Grad: keine Angabe der Website, Schätzung ca. 500 px/s (≈ 14°/s bei 60 cm) auf Stufe 1, das Vierfache auf hohen Stufen (eigene Schätzung, von Fensterbreite abhängig).
- **Zielwechsel (Code):** Alle 20 s werden die Zielsymbole neu gewürfelt, **nicht** mit jedem Level (Seitentext: „Tempo und Formen wechseln mit jedem Level“). Bis Stufe 2 haben beide Hälften dasselbe Ziel, **ab Stufe 3 verschiedene**. Der Wechsel wird nicht angekündigt; Symbole, die schon unterwegs sind, werden beim Antippen gegen das neue Ziel geprüft.
- **Wertung (Code):** Treffer: 100 × Combo-Faktor × (1 + 0,5 × Fortschritt), Combo-Faktor 1 (unter 3 Treffern) bis 3 (ab 50 in Folge). Fehler: Combo auf 0. **Als Fehler zählt auch ein Ziel-Symbol, das unangetippt den Rand erreicht** (im Regeltext nicht erwähnt); Ablenker dürfen ignoriert werden. Genauigkeit = Treffer / (Treffer + Fehler); richtig ignorierte Ablenker fließen nicht ein (kein d′). Rangnote aus Wurzel(Punkte / 24.000).
- **Eingabe (Code):** ein Zeiger-Ereignis (Maus oder Touch) direkt auf dem Symbol; keine Tastatursteuerung für Treffer. Bewegung läuft zeitbasiert (nicht bildfrequenzabhängig), Zeitmessung per Bild-Schleife; **keine Reaktionszeit wird erfasst**.
- **Widersprüche/Auffälligkeiten:** (1) Regeltext „mit jedem Level wechseln die Formen“ vs. Code (alle 20 s, ab Stufe 3 getrennt). (2) Fehler kosten 1 s, im Text keine Angabe. (3) Der englische Text nennt „100–300 ms Wechselstrafe“ für dieses Spiel, es misst aber keinerlei Wechselzeit. (4) Zwei Symbole (⬣ ⏣) fehlen in vielen Schriften und können als Leerkästchen erscheinen.

## 3. Was die Website sagt – und wie das einzuordnen ist
**Aussagen:** Der Test soll „multi-stream visual tracking“ und geteilte Aufmerksamkeit unter Zeitdruck prüfen, aus „Arbeitsbelastungs-Forschung in Luftfahrt und Motorsport“ abgeleitet; er übe „bilaterale Hemisphärenverarbeitung“ und Parietallappen/Corpus callosum zur „Synchronisierung beider Gesichtsfeldhälften“; er erhöhe „Aufgabenwechsel-Tempo“ und führe zu „Elite“-Durchsatz. Zielgruppe: Gamer, Lernende, Menschen mit vielen gleichzeitigen Informationen. Empfohlene Strategie: weicher Blick in die Mitte zwischen beiden Strömen. Leistungsstufen: Tier 1 (98 %+, „Top 1 %“) bis Tier 5 (< 78 %). Training: 10–15 min pro Tag „fördere synaptische Plastizität“. Das Original betont, es sei ein nicht-klinischer Selbstcheck.

**Einordnung:**
- **Belegt:** Gleichzeitige Entscheidungen konkurrieren um einen zentralen Engpass, sodass man meist zwischen ihnen umschaltet (Pashler, 1994; neuronale Grundlage: Dux et al., 2006). Wechselkosten sind robust (Rogers & Monsell, 1995; Monsell, 2003). Alle diese Studien untersuchen aber Wahlreaktions-Aufgaben mit Hinweisreiz, nicht ein Symbolsuchspiel.
- **Teilweise:** Die Spielart „Aufgabenwechsel“ trifft nicht zu: Es gibt immer dieselbe Regel („passt/passt nicht“); das Ziel wechselt selten und unangekündigt. Was der Test trainiert, ist eher ein Doppelstrom-Go/No-Go mit Zeitdruck.
- **Nicht belegt / überzogen:** „Hemisphären-Synchronisierung“, „Parietallappen/Corpus callosum“ und „synaptische Plastizität“ haben keine Trainingsstudie. Verwandt ist nur, dass bei aufmerksamem Verfolgen bewegter Objekte die linke und rechte Gesichtsfeldhälfte **getrennte Kapazitäten** haben (doppelt so viele Ziele, wenn auf beide Hälften verteilt; Alvarez & Cavanagh, 2005): das erklärt, warum zwei Hälften „einfacher“ sind, nicht dass man etwas synchronisiert. Die Aussage „Gewohnheits-Multitasker lassen sich leichter ablenken“ (Ophir et al., 2009) ist in Replikationen nur teilweise bestätigt (Wiradhany & Nieuwenstein, 2017; Uncapher & Wagner, 2018). „144 Hz verringern Schlieren drastisch“ ist durch Woods et al. (2015) nicht gestützt (laut Abstract ein Test der einfachen Reaktionszeit, keine Messung von Schlieren oder Bildwiederholraten).
- **Tier-/Perzentiltabelle:** ohne Datengrundlage – die Website schreibt selbst, sie erhebe keine Daten; keine der Quellen enthält Werte für dieses Spiel. „Top 1 %“ ist Dekoration. Auch die Genauigkeitsangabe zählt nur Treffer und Fehler, nicht richtig ignorierte Symbole.

## 4. Optische und okulomotorische Grundlagen
- **Blickstrategie:** Die zwei Hälften liegen links und rechts (oder oben/unten) der Blickmitte; wer die Mitte fixiert, sieht beide Ströme nur mit dem peripheren Gesichtsfeld. Symbole in 5–10° Exzentrizität werden schlechter aufgelöst, Nachbarn stören („Crowding“: kritischer Abstand ≈ halbe Exzentrizität; Pelli & Tillman, 2008). Bei Symbolabstand von 220 ms und Tempo 500+ px/s stehen mehrere Zeichen dicht hintereinander – das ist ein **Erkennungs-** und Hinsehproblem, nicht bloß ein Reaktionsproblem.
- **Sakkaden:** Wechsel zwischen den Hälften erfordert Blicksprünge (Latenz typisch 150–250 ms); Verfolgen einzelner Symbole ist bei ~14°/s und mehr nur teilweise als glatte Blickfolge möglich, hohe Stufen erzwingen Sakkaden. Diese Zahlen sind Erfahrungswerte aus dem Fachgebiet, hier nicht einzeln zitiert.
- **Sehwinkel und Abstand:** Symbole 1,3–2° (Herleitung Abschnitt 2) sind für normale Sehschärfe gut erkennbar; am Smartphone (Fensterbreite unter 768 px, 45 px) kleiner. Reale Abstände: Smartphone beim Lesen ≈ 32–36 cm (Bababekova et al., 2011), Presbyope halten weiter weg, ≈ 40 cm (Boccardo et al., 2023).
- **Brille:** Bei Gleitsicht liegen die Bildränder oft im Bereich seitlicher Unschärfe; Neulinge nutzen mehr Kopfbewegungen (Hutchings et al., 2007), und Gleitsichtdesigns unterscheiden sich stark in der Breite der Zonen (Sheedy, 2004). Für diese Übung: Bildschirm-/Arbeitsplatzbrille bzw. Blick durch den passenden Bereich prüfen, Bildschirm nicht zu groß/nah wählen, sonst muss der Kopf mitgedreht werden. Bei trockenem Auge sind lange Bildschirmphasen ohne Blinzeln ungünstig – hier nur 45–60 s.
- **Farbe:** Symbole sind grau, Rückmeldung blau/rot/Funken; Farbsehschwäche (≈ 8 % der Männer) betrifft die Wertung kaum, aber Rot als Fehler-Rückmeldung ist dann schwer zu erkennen.

## 5. Neurowissenschaftliche Grundlagen
- **Zentraler Engpass:** Bei zwei gleichzeitig zu treffenden Entscheidungen wird die zweite verzögert; als Ort gilt ein Netzwerk im hinteren seitlichen Präfrontalkortex (Dux et al., 2006, fMRT) – „Psychologische Refraktärperiode“ (Pashler, 1994). Das erklärt, warum zwei nahezu gleichzeitig erscheinende Ziele schwerer sind als eines.
- **Aufgabenwechsel:** Beim Umstellen zwischen Regeln sind ein frontoparietales Netzwerk (inferiore frontale Junktion, posteriorer Parietalkortex) über Aufgabentypen hinweg gemeinsam aktiv (Meta-Analyse, 36 Studien; Kim et al., 2012). Das gilt für klassische Wechselaufgaben, kaum für das Umschalten der Aufmerksamkeit zwischen zwei Strömen.
- **Selektion und Suche:** Aufmerksames Verfolgen mehrerer bewegter Objekte hängt von getrennten Kapazitäten je Gesichtsfeldhälfte ab (Alvarez & Cavanagh, 2005) – Verhalten, nicht Anatomie-Nachweis.
- **Zurückhaltung:** Ob das Spiel bestimmte Hirnregionen „trainiert“, ist nicht untersucht; Aussagen der Website zu Parietallappen und Corpus callosum sind Vermutung.

## 6. Motorische Grundlagen
- **Auge-Hand:** Jeder Treffer ist ein gezielter Fingerdruck bzw. Klick auf ein sich bewegendes ca. 2° großes Ziel; das Ziel muss daher in den ersten Zehntel­sekunden der Bewegung vorhergesagt werden (Fitts'sches Gesetz: kleinere Ziele und höheres Tempo → mehr Zeit oder mehr Fehler).
- **Speed-Accuracy:** Die Combo (Faktor bis 3, dazu Tempo +25 %) belohnt schnelle Serien, ein Fehler setzt sie zurück – Tempo wird stärker belohnt als Sorgfalt.
- **Tablet:** Touch-Geräte messen in Web-Apps Reaktionszeiten immer zu lang (Smartphones im Roboterversuch ca. 58–70 ms), Vergleich zwischen Geräten ist unzuverlässig, innerhalb einer Person verlässlicher (Pronk et al., 2020). Da das Original keine Zeiten erfasst, spielt das nur für Nachfolger eine Rolle.
- **Mindestgröße Touch-Ziele:** WCAG 2.2 fordert 24 px (AA) bzw. 44 px (AAA); die 45 px kleinen Symbole am Handy liegen an der Grenze, bewegen sich aber.

## 7. Einflussfaktoren und Messgrenzen
- **Gerät:** Punkte hängen von Fensterbreite/Bildschirmgröße ab (die Strecke in px ist die halbe Breite plus 80 px, Zeit fix) – gleiche Stufe ist auf Handy, Tablet und großem Monitor nicht gleich schwer.
- **Zeitbonus:** Treffer verlängern die Sitzung (+2 s), gute Leistung führt zu längeren Durchgängen; Score, Combo und Stufe sind kein reines Maß.
- **Kein Basiswert:** Es gibt keinen Einzelstrom-Durchgang; ohne diesen sind „Doppelaufgaben-Kosten“ nicht bestimmbar.
- **Zufall:** Zielanteil, Höhe und Abstand sind zufällig; keine feste Sequenz, keine Wiederholbarkeit. Schwankungen der Zieldichte verändern die Punkte stark.
- **Alter/Müdigkeit:** Wechselkosten sind bei Älteren größer, vor allem die Mischkosten beim Bereithalten mehrerer Regeln (Kray & Lindenberger, 2000; Wasylyshyn et al., 2011). Differenzwerte (z. B. Wechselkosten) sind als Gruppenwert robust, als Einzelwert oft unzuverlässig (Hedge et al., 2018).
- **Übung:** Der Punktestand steigt durch Kennenlernen von Symbolen und Muster; das ist kein Beleg für bessere Aufmerksamkeit.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Für dieses Spiel:** keine Studie.
- **Verwandter Aufgabenwechsel (Grundlage der Blickfit-Umsetzung):** Wechsel- und Mischkosten sinken deutlich durch Übung, meist mit Plateau nach 4–6 Sitzungen; naher Transfer auf andere Wechselaufgaben ja, fern (Hemmung, Arbeitsgedächtnis, Intelligenz) nicht (Zhao et al., 2020; Kray & Fehér, 2017). Eine frühere Studie fand auch fernen Transfer, besonders bei Kindern und Älteren (Karbach & Kray, 2009); er ließ sich später nicht durchgängig bestätigen.
- **Doppelaufgaben:** Training mit wechselnden Aufgabenkombinationen verbessert Doppelaufgaben; solche Effekte sind aufgabenspezifisch (siehe Eintrag 205).
- **Alltag:** Belegt ist nur, dass jeder Aufgabenwechsel Zeit kostet (Übersicht: Kiesel et al., 2010); die Faustregel „eins nach dem anderen“ ist eine naheliegende Schlussfolgerung daraus, keine Aussage dieser Studie. Ein Effekt dieses Spiels auf Verkehr, Beruf oder Lernen ist nicht belegt.
- **Einstufung:** Übungseffekt mittel (in der Aufgabe wird man besser, für dieses Spiel nicht geprüft), naher Transfer schwach, Alltag fehlend.

## 9. Auswahlhinweise für die KI
- **Passt, wenn** jemand zwei Bildbereiche gleichzeitig im Blick behalten und schnell entscheiden üben möchte, kurze Einheiten (45–60 s) gewünscht sind und Zeitdruck kein Problem ist; Profil: geteilte_aufmerksamkeit 3, selektive_aufmerksamkeit/inhibition/visuelle_suche 2.
- **Weniger passend, wenn** Aufgabenwechsel oder Wechselkosten geübt werden sollen (→ Blickfit Weichensteller), ruhig und ohne Zeitdruck geübt werden soll, keine Maus/Touch-Möglichkeit besteht oder eine zuverlässige Messung nötig ist.
- **Vorsicht / anpassen bei:** `aufmerksamkeitsprobleme` (hohe Reizdichte, Zeitdruck, Zeitstrafe abschalten); `presbyopie_gleitsicht` (Symbole reichen bis zu den Bildrändern, Bildschirm nicht zu nah; Arbeitsplatzbrille ggf. sinnvoll); `gesichtsfeldausfall` (Ströme in beiden Hälften); `sehbehinderung_niedriger_visus` (Symbole ca. 1,3–2°). Keine Aussage zu Eignung im medizinischen Sinn.
- **Kombiniert gut mit:** 205 (geteilte Aufmerksamkeit, Blickfit „Doppelt gefordert“), 408 (zwei Bildhälften verfolgen), 201 (Stroop, Hemmung), 208 (Daueraufmerksamkeit), 510 (Zielauswahl).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
**Was Blickfit anders macht:** Der Weichensteller ersetzt die Doppelstrom-Suche durch echten **Aufgabenwechsel** (Einzelreiz, zwei Regeln, gleiche zwei Tasten). Der Wechsel wird immer angekündigt (Rahmen Kreis/Quadrat + Symbol „2/3“ bzw. „< 5 >“ + Frage + passende Tastenform), Farbe (Okabe-Ito) nur zusätzlich. Ablauf: Hinweis → Vorwarnzeit → Ziffer (max. 3 s) → Rückmeldung; Antworten unter 150 ms gelten als geraten. Sitzung ≈ 90 s: 5 Durchgänge nur Regel A, 5 nur Regel B, dann 24 gemischt (50 % Wechsel, höchstens 4 gleiche Regeln in Folge). Schwierigkeit: eine Skala, Stufe 1–20 (3-down/1-up, ca. 79 %), Vorwarnzeit 1000 · 0,75^(Stufe−1) ms (bis 100 ms) und eine weiche Antwortfrist 2400 → 740 ms. Kennwerte: Wechselkosten (Median Wechsel − Median Wiederholung), Mischkosten (Median Wiederholung gemischt − Median Reinblock), Hauptwert = Stufe (Differenzwerte sind als Einzelwert wenig verlässlich, Hedge et al., 2018). Pfeiltasten und Touch, keine Zeitstrafe, keine Punkte-Combo, DE/IT. Der Doppelstrom-Charakter des Originals steckt in Blickfit „Doppelt gefordert“ (Nr. 205).

**Schwächen des Originals:**
- Fehler „Ziel verpasst“ wird nicht erklärt; Zeitstrafe (−1 s) statt der genannten Strafe, nicht schwierigkeitsneutral.
- Unangekündigter Zielwechsel alle 20 s; laufende Symbole werden nachträglich gegen das neue Ziel gewertet; kein Vorwarnsignal.
- Keine Reaktionszeit, keine getrennten Fehlerarten, kein d′, kein Einzelstrom-Basiswert: nicht als Messung nutzbar.
- Tempo hängt von der Fensterbreite ab; Zeitbonus verlängert Sitzungen; Combo verzerrt (Tempo wird nach Fehlern schlagartig leichter).
- Symbole fehlen in manchen Schriften, Rückmeldung nur über Farbe (rot/blau) bei Fehlern; kaum Tastatur-/Screenreader-Unterstützung; Regeltext und Verhalten weichen ab.
- Für Tablets: Symbolgröße an Bildschirm und Abstand koppeln (Sehwinkel ≥ 1,5°, Touch-Ziele ≥ 44 px), Zeitstrafe optional, Tempo nach Leistung statt nach Combo anpassen.

## 11. Quellen
### Von der Website angegeben
- Rogers, R. D., & Monsell, S. (1995). Costs of a predictable switch between simple cognitive tasks. *Journal of Experimental Psychology: General, 124*(2), 207–231. https://doi.org/10.1037/0096-3445.124.2.207 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel mit Tippfehler „predictible“); **stützt die Aussage der Website:** ja (Wechselkosten sinken mit Vorbereitungszeit bis ca. 0,6 s, bleiben auch bei 1,2 s als Restkosten, aber nur im ersten Durchgang der neuen Aufgabe) – gilt für Wahlreaktion mit Hinweis, nicht für das Spiel
- Monsell, S. (2003). Task switching. *Trends in Cognitive Sciences, 7*(3), 134–140. https://doi.org/10.1016/S1364-6613(03)00028-7 – **Prüfung:** DOI stimmt ✓ (Crossref/PubMed); **stützt die Aussage der Website:** ja (Wechselkosten durch Vorbereitung verringert, nicht beseitigt)
- Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. *Psychological Bulletin, 116*(2), 220–244. https://doi.org/10.1037/0033-2909.116.2.220 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Engpass betrifft die Handlungsauswahl, nicht die Wahrnehmung; „serielles Time-Sharing“ nur dafür)
- Wickens, C. D. (2002). Multiple resources and performance prediction. *Theoretical Issues in Ergonomics Science, 3*(2), 159–177. https://doi.org/10.1080/14639220210123806 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** kein konkreter Bezug im Seitentext
- Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. *Proceedings of the National Academy of Sciences, 106*(37), 15583–15587. https://doi.org/10.1073/pnas.0903620106 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Original ja; Replikationen nur zum Teil, Metaanalyse nach Korrektur nicht signifikant, siehe Wiradhany & Nieuwenstein, 2017)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website („144 Hz verringern Schlierenbildung drastisch“):** nein (laut Abstract keine Schlierenmessung und kein Vergleich von Bildwiederholraten; Studie: einfache Reaktionszeit, n = 1.469 in Experiment 1)
- *Ohne Quelle:* „Hemisphärenkoordination durch Parietallappen und Corpus callosum“, „synaptische Plastizität“, „Elite/Top 1 %“ – **nicht belegt** (siehe Abschnitt 3).

### Weitere Fachliteratur
- Dux, P. E., Ivanoff, J., Asplund, C. L., & Marois, R. (2006). Isolation of a central bottleneck of information processing with time-resolved fMRI. *Neuron, 52*(6), 1109–1120. https://doi.org/10.1016/j.neuron.2006.11.009 – neuronaler Engpass bei zwei gleichzeitigen Entscheidungen (Crossref ✓, PubMed-Abstract gelesen)
- Kim, C., Cilles, S. E., Johnson, N. F., & Gold, B. T. (2012). Domain general and domain preferential brain regions associated with different types of task switching: A meta-analysis. *Human Brain Mapping, 33*(1), 130–142. https://doi.org/10.1002/hbm.21199 – frontoparietales Netzwerk beim Aufgabenwechsel, 36 Studien (Crossref ✓, Abstract gelesen)
- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x – getrennte Kapazität je Gesichtsfeldhälfte (Crossref ✓, Abstract gelesen)
- Kiesel, A., Steinhauser, M., Wendt, M., Falkenstein, M., Jost, K., Philipp, A. M., & Koch, I. (2010). Control and interference in task switching – A review. *Psychological Bulletin, 136*(5), 849–874. https://doi.org/10.1037/a0019842 – Übersicht Wechselkosten (Crossref ✓)
- Kray, J., & Lindenberger, U. (2000). Adult age differences in task switching. *Psychology and Aging, 15*(1), 126–147. https://doi.org/10.1037/0882-7974.15.1.126 – Alter, Mischkosten (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Wasylyshyn, C., Verhaeghen, P., & Sliwinski, M. J. (2011). Aging and task switching: A meta-analysis. *Psychology and Aging, 26*(1), 15–20. https://doi.org/10.1037/a0020912 – Metaanalyse Alter (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Zhao, X., Wang, H., & Maes, J. H. R. (2020). Training and transfer effects of extensive task-switching training in students. *Psychological Research, 84*(2), 389–403. https://doi.org/10.1007/s00426-018-1059-7 – Übung, Plateau, kein ferner Transfer (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Kray, J., & Fehér, B. (2017). Age differences in the transfer and maintenance of practice-induced improvements in task switching: The impact of working-memory and inhibition demands. *Frontiers in Psychology, 8*, 410. https://doi.org/10.3389/fpsyg.2017.00410 – Training, Transfer, Erhalt nach 6 Monaten (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Karbach, J., & Kray, J. (2009). How useful is executive control training? Age differences in near and far transfer of task-switching training. *Developmental Science, 12*(6), 978–990. https://doi.org/10.1111/j.1467-7687.2009.00846.x – Transfer nach Wechseltraining (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten (Crossref ✓, Inhalt aus docs/wissenschaft/04)
- Wiradhany, W., & Nieuwenstein, M. R. (2017). Cognitive control in media multitaskers: Two replication studies and a meta-analysis. *Attention, Perception, & Psychophysics, 79*(8), 2620–2641. https://doi.org/10.3758/s13414-017-1408-4 – Replikation zu Ophir et al. (Crossref ✓, Abstract gelesen)
- Uncapher, M. R., & Wagner, A. D. (2018). Minds and brains of media multitaskers: Current findings and future directions. *Proceedings of the National Academy of Sciences, 115*(40), 9889–9896. https://doi.org/10.1073/pnas.1611612115 – Übersicht, Kausalrichtung offen (Crossref ✓, Abstract gelesen)
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Crowding, Exzentrizität (Crossref ✓, Abstract gelesen)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, mehr Kopfbewegung (Crossref ✓, Abstract gelesen)
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry, 75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Gleitsichtdesigns (Crossref ✓, Abstract gelesen)
- Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 – Sehabstand Smartphone (Crossref ✓, Abstract gelesen)
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Sehabstand nach Alter (Crossref ✓)
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitgenauigkeit Touch (Crossref ✓, Abstract gelesen)
