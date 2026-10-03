---
# ===== Kennung =====
nr: 206
kennung: multi-tasking
name: "Weichensteller: Aufgabenwechsel zwischen zwei Regeln (gerade/ungerade, kleiner/größer als 5)"
name_original: "Multitasking-Test – Zwei Zielströme gleichzeitig verfolgen (Dual-Stream-Tracking)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "attention"
quelle_url: "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking"
blickfit_umsetzung: {kennung: "weichensteller", name: "Weichensteller", unterschiede: "Kein zweiter Symbolstrom, sondern echter Aufgabenwechsel: eine Ziffer wird je nach angekündigter Regel (Kreis: gerade/ungerade, Quadrat: kleiner/größer als 5) mit denselben zwei Tasten beurteilt. Regelwechsel immer mit Hinweisreiz (Form + Symbol + Frage, nie nur Farbe), einstellbare Vorwarnzeit 1000 bis 100 ms, Rein- und Mischblöcke, Wechsel- und Mischkosten in ms als Zusatzwerte; adaptive Stufe 1–20 statt Punkte-Combo, keine Zeitstrafe, Pfeiltasten und Touch."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Ziffer erscheint in einem Rahmen: Beim Kreis gilt die Frage „gerade oder ungerade?“, beim Quadrat „kleiner oder größer als 5?“. Beide Regeln werden mit denselben zwei Tasten beantwortet; der Rahmen kündigt die Regel immer vorher an (Form, Symbol und Frage, nie nur Farbe). Eine Sitzung beginnt mit je einem kurzen Block pro Regel und geht dann in einen gemischten Block mit häufigem Regelwechsel über. Die Vorwarnzeit zwischen Hinweis und Ziffer verkürzt sich von 1 Sekunde auf bis zu 0,1 Sekunden und passt sich der eigenen Leistung an; als Zusatzwerte werden die Wechsel- und Mischkosten in Millisekunden ausgewiesen."
ziel_funktionen: [kognitive_flexibilitaet, entscheidung_wahlreaktion]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 90
schwierigkeit_anpassung: "Stufe = Punkte / 1.750 + 1 (immer Start bei Stufe 1). Mit der Stufe steigen Tempo (Durchlaufzeit 1,25 s → etwa 0,5 s) und Symboldichte (Abstand 950 → 220 ms); ab Stufe 3 (ca. 3.500 Punkte) haben beide Hälften verschiedene Zielsymbole. Zusätzlich beschleunigt die Combo-Serie das Tempo um bis zu 25 %."
messgroessen: ["Punkte (Bestwert im Browser)", "Genauigkeit in % (Treffer / (Treffer + Fehler))", "längste Serie (Combo)", "erreichte Stufe", "sinnvoll ergänzt: Reaktionszeit je Treffer in ms, Fehlerarten getrennt (falsch angetippt / Ziel verpasst), Leistung je Hälfte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
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
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 3
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 0
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Symbole ca. 1–2° groß sicher unterscheidbar (Brille/Lesebrille für den Bildschirmabstand tragen)", "Maus oder Touchscreen; Vollbild empfohlen", "kein Farbsehen nötig (Symbole grau, Farbe nur als Rückmeldung)", "Schriftart muss alle acht Symbole darstellen (⬣ und ⏣ fehlen in manchen Schriften)"]
vorsicht_bei: [aufmerksamkeitsprobleme, kognitive_einschraenkung, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, kinder_unter_6]
geeignet_fuer: ["zwischen zwei Regeln umschalten und beobachten, wie viel Zeit ein Wechsel kostet (Aufgabenwechsel)", "kurze Konzentrationsübung mit klarer Aufgabe, bei der der Rahmen die geltende Regel anzeigt", "erleben, dass jeder Regelwechsel einen kleinen Moment kostet – das geht allen so"]
weniger_geeignet_fuer: ["zwei Aufgaben gleichzeitig üben oder messen (dafür 205)", "Menschen, die ruhig und ohne Zeitdruck üben sollen (Vorwarnzeit und Antwortfrist werden kürzer)", "Vergleich der Wechselkosten als persönlicher Einzelwert oder mit anderen Personen (Differenzwerte sind als Einzelwert wenig zuverlässig)", "Kinder, die gerade/ungerade und kleiner/größer als 5 noch nicht sicher unterscheiden"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "Für diese Übung selbst gibt es keine Studie. Die starke Evidenz zu Wechselkosten gilt für den klassischen Aufgabenwechsel mit Hinweisreiz, den der Weichensteller nachbildet: Wechsel- und Mischkosten sinken mit Übung (Zhao et al., 2020), und ähnliche Wechselaufgaben profitieren mit; ein Transfer auf ferne Fähigkeiten wurde nicht durchgängig bestätigt (Karbach & Kray, 2009). Ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [205, 408, 106, 201, 208, 510, 502]
stichworte: ["Multitasking", "geteilte Aufmerksamkeit", "Doppelstrom", "Aufgabenwechsel", "selektive Aufmerksamkeit", "divided attention", "task switching", "Go/No-Go"]
---

# 206 · Weichensteller: Aufgabenwechsel zwischen zwei Regeln (gerade/ungerade, kleiner/größer als 5)

> Original: „Multitasking-Test – Dual-Stream-Tracking“ – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (cognitive/attention) · Blickfit: Weichensteller (Aufgabenwechsel, kein Doppelstrom)

## 1. Kurzbeschreibung

Eine Ziffer (1–4 oder 6–9) wird nach einer von zwei Regeln beurteilt: Beim Kreis lautet die Frage „gerade oder ungerade?“, beim Quadrat „kleiner oder größer als 5?“. Beide Regeln werden mit denselben zwei Tasten beantwortet (links: gerade bzw. kleiner, rechts: ungerade bzw. größer), sodass Reize und Antworten zweiwertig bleiben. Der Wechsel wird immer angekündigt: Rahmenform (Kreis oder Quadrat), Symbol („2/3“ bzw. „< 5 >“) und Frage zeigen die Regel, und auch Form und Beschriftung der Tasten passen dazu; Farbe dient nur als Zugabe. Ablauf eines Durchgangs: Hinweis, Vorwarnzeit, Ziffer (höchstens 3 Sekunden), Rückmeldung, kurze Pause. Eine Sitzung dauert etwa 90 Sekunden: je 5 Durchgänge nur mit Regel A und nur mit Regel B, danach 24 gemischte Durchgänge mit etwa 50 % Regelwechseln (höchstens 4 gleiche Regeln in Folge). Die Vorwarnzeit verkürzt sich von 1 Sekunde bis auf 0,1 Sekunden, und zugleich wird die weiche Antwortfrist von 2,4 auf 0,74 Sekunden kürzer; die Stufe (1–20) passt sich so an, dass etwa vier von fünf Durchgängen gelingen. Es ist ein klassischer Aufgabenwechsel, nicht das gleichzeitige Bearbeiten zweier Aufgaben.

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

- **Hinweis und Ziffer am selben Ort:** Rahmen, Symbol und Ziffer erscheinen in der Bildmitte; die Aufgabe verlangt keine Suche und keine größeren Blicksprünge. Die beiden Tasten stehen links und rechts neben dem Rahmen (auf schmalen Bildschirmen darunter) und zeigen mit Form und Beschriftung, was für die geltende Regel links und rechts bedeutet.
- **Zeitliche Abfolge:** Zwischen Hinweis und Ziffer liegt die Vorwarnzeit, die von 1 Sekunde auf 0,1 Sekunden schrumpft. Die Ziffer zählt erst ab dem Bild, in dem sie erstmals gezeichnet ist; Antworten unter 150 ms danach gelten als geraten.
- **Farbe:** Die Regel wird nie nur über Farbe angezeigt (Form, Symbol und Frage; Farbe aus der Okabe-Ito-Palette nur zusätzlich). Eine Farbsehschwäche (etwa 8 % der Männer; Birch, 2012) schränkt die Übung daher nicht ein.
- **Brille und Abstand:** Alle wichtigen Reize liegen nahe beieinander in der Mitte; nur die Tasten stehen daneben bzw. darunter. Gleitsicht-Neulinge bewegen den Kopf mehr (Hutchings et al., 2007), und die Zonenbreiten der Gläser unterscheiden sich stark (Sheedy, 2004); das Gerät so zu halten, dass Mitte und Tasten durch den Nah- bzw. Zwischenbereich gesehen werden, ist meist günstiger.
- **Bewegung und Licht:** Es gibt keine bewegten Reize und keine Blitze; die Übung ist für Menschen mit Bewegungsempfindlichkeit unkritisch.

## 5. Neurowissenschaftliche Grundlagen

- **Aufgabenwechsel:** Beim Umstellen zwischen Regeln ist ein frontoparietales Netzwerk (inferiore frontale Junktion, posteriorer Parietalkortex) über Aufgabentypen hinweg gemeinsam aktiv (Metaanalyse, 36 Studien; Kim et al., 2012). Wechselkosten sind robust: Sie sinken mit Vorbereitungszeit bis etwa 0,6 s, bleiben aber auch bei 1,2 s als Restkosten bestehen, und zwar im ersten Durchgang der neuen Aufgabe (Rogers & Monsell, 1995; Monsell, 2003: Vorbereitung verringert die Kosten, beseitigt sie nicht).
- **Zentraler Engpass:** Wenn zwei Entscheidungen nahezu gleichzeitig zu treffen sind, wird die zweite verzögert; als Ort gilt ein Netzwerk im hinteren seitlichen Präfrontalkortex (Dux et al., 2006, fMRT; „psychologische Refraktärperiode“: Pashler, 1994). Der Engpass betrifft die Handlungsauswahl, nicht die Wahrnehmung. Beim Weichensteller kommt immer nur ein Reiz auf einmal.
- **Zurückhaltung:** Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht untersucht.

## 6. Motorische Grundlagen

- **Zwei Tasten:** Beide Regeln werden mit denselben zwei Tasten beantwortet; möglich sind Berührung und Pfeiltasten. Die Antwort ist eine einfache Wahlreaktion mit zwei Alternativen, die Zeit geht in Hinweis-Auswertung und Regelanwendung auf, nicht in die Bewegung.
- **Frist und Genauigkeit:** Die Antwortfrist beendet den Durchgang nicht, damit die Reaktionszeit vollständig erhalten bleibt; „geschafft“ heißt richtig und innerhalb der Frist. Schnelleres Antworten kostet Genauigkeit; weder Tempo noch Treffer werden mit Punkten oder Combo belohnt, und es gibt keine Zeitstrafe.
- **Eingabe:** Touch-Geräte messen in Web-Apps Reaktionszeiten zu lang (Smartphones im Roboterversuch etwa 58–70 ms); der Vergleich zwischen Geräten ist unzuverlässig, innerhalb einer Person verlässlicher (Pronk et al., 2020).

## 7. Einflussfaktoren und Messgrenzen

- **Kennwerte:** Wechselkosten = Median der Reaktionszeit beim Wechsel minus Median bei Wiederholung der Regel; Mischkosten = Median bei Wiederholung im gemischten Block minus Median im Einzelblock. Gewertet werden nur richtige Antworten, ohne den ersten Durchgang eines Blocks und ohne Durchgänge direkt nach einem Fehler. Hauptwert ist die erreichte Stufe.
- **Zuverlässigkeit:** Differenzwerte wie Wechselkosten sind als Gruppenwert robust, als persönlicher Einzelwert aber oft unzuverlässig (Hedge et al., 2018); sie werden deshalb nur als Zusatzwerte gezeigt.
- **Abfolge:** Die Regeln folgen zufällig mit etwa 50 % Wechseln, höchstens vier gleiche Regeln in Folge; man kann die Wechsel daher nicht mitzählen.
- **Alter und Müdigkeit:** Wechselkosten sind bei Älteren größer, vor allem die Mischkosten beim Bereithalten mehrerer Regeln (Kray & Lindenberger, 2000; Wasylyshyn et al., 2011).
- **Übung:** Wechsel- und Mischkosten sinken deutlich durch Übung, meist mit einem Plateau nach vier bis sechs Sitzungen (Zhao et al., 2020; Kray & Fehér, 2017).
- **Gerät:** Touch-Latenz und Bildschirmgröße beeinflussen die Zeiten; Vergleiche gelten nur auf demselben Gerät mit derselben Eingabeart.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (stark):** Wechsel- und Mischkosten sinken deutlich durch Übung, meist mit einem Plateau nach vier bis sechs Sitzungen (Zhao et al., 2020; Kray & Fehér, 2017). Für diese Übung selbst gibt es keine Studie.
- **Naher Transfer (mittel):** Auf andere Wechselaufgaben überträgt sich das Training, auf ferne Fähigkeiten (Hemmung, Arbeitsgedächtnis, Intelligenz) nicht (Zhao et al., 2020; Kray & Fehér, 2017). Eine frühere Studie fand auch fernen Transfer, besonders bei Kindern und Älteren (Karbach & Kray, 2009); er ließ sich später nicht durchgängig bestätigen.
- **Alltag (fehlend):** Belegt ist nur, dass jeder Aufgabenwechsel Zeit kostet (Übersicht: Kiesel et al., 2010); die Faustregel „eins nach dem anderen“ ist eine naheliegende Schlussfolgerung daraus, keine Aussage einer Studie. Ein Effekt der Übung auf Verkehr, Beruf oder Lernen ist nicht belegt.
- **Seriöse Formulierung:** „Beim Weichensteller wechselt die Regel immer wieder. Jeder Wechsel kostet einen kleinen Moment – das geht allen so. Mit etwas Übung werden die Wechsel in dieser Übung flüssiger; dass sich das auf Konzentration oder Alltag überträgt, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand das Umschalten zwischen zwei klar angekündigten Regeln üben und die Mehrzeit beim Wechsel kennenlernen möchte; eine kurze Einheit (etwa 90 Sekunden) gewünscht ist und Zeitdruck kein Problem darstellt. Profil: kognitive Flexibilität 3, Arbeitsgedächtnis und Entscheidung 2.
- **Weniger passend, wenn** zwei Aufgaben gleichzeitig geübt werden sollen (→ 205), ruhig und ohne Zeitdruck geübt werden soll oder eine zuverlässige Einzelmessung der Wechselkosten nötig ist.
- **Vorsicht / anpassen bei:** `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6` (zwei Regeln merken, Vorwarnzeit und Frist werden kürzer; mit niedriger Stufe beginnen); `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus` (Nahkorrektur für den Tablet-Abstand, Rahmen und Symbol müssen mühelos erkennbar sein). Keine Aussage zur Eignung im medizinischen Sinn.
- **Warnzeichen:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung oder neu auftretender Schwindel gehören ärztlich abgeklärt (Aufzählung der Warnsymptome in der Anamnese: Muchnick, 2008, S. 6, 17 und 28); ein Übungsprogramm ersetzt das nicht.
- **Kombiniert gut mit:** 205 (zwei gleichzeitige Aufgaben), 408 (zwei Bildhälften verfolgen), 201 (Konflikt zwischen Richtung und Ort, Hemmung), 208 (Daueraufmerksamkeit), 510 (Zielauswahl).
- **Abgrenzung in der Gruppe:** 206 übt den Wechsel zwischen zwei Regeln nacheinander (Einzelreiz, Hinweis, Wechselkosten); 205 ist die Übung für zwei verschiedene Aufgaben gleichzeitig. Beide nicht in derselben Einheit.

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
- Wickens, C. D. (2002). Multiple resources and performance prediction. *Theoretical Issues in Ergonomics Science, 3*(2), 159–177. https://doi.org/10.1080/14639220210123806 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** kein konkreter Bezug im Seitentext – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. *Proceedings of the National Academy of Sciences, 106*(37), 15583–15587. https://doi.org/10.1073/pnas.0903620106 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (Original ja; Replikationen nur zum Teil, Metaanalyse nach Korrektur nicht signifikant, siehe Wiradhany & Nieuwenstein, 2017) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website („144 Hz verringern Schlierenbildung drastisch“):** nein (laut Abstract keine Schlierenmessung und kein Vergleich von Bildwiederholraten; Studie: einfache Reaktionszeit, n = 1.469 in Experiment 1)
- *Ohne Quelle:* „Hemisphärenkoordination durch Parietallappen und Corpus callosum“, „synaptische Plastizität“, „Elite/Top 1 %“ – **nicht belegt** (siehe Abschnitt 3). – Aussagen ohne Quelle, nur in der Arbeitsfassung; **stützt (öffentliche Fassung):** nein

### Weitere Fachliteratur
- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x – getrennte Kapazität je Gesichtsfeldhälfte (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 – Sehabstand Smartphone (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Sehabstand nach Alter (Crossref ✓) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Dux, P. E., Ivanoff, J., Asplund, C. L., & Marois, R. (2006). Isolation of a central bottleneck of information processing with time-resolved fMRI. *Neuron, 52*(6), 1109–1120. https://doi.org/10.1016/j.neuron.2006.11.009 – neuronaler Engpass bei zwei gleichzeitigen Entscheidungen – **Prüfung:** Crossref ✓, PubMed-Abstract gelesen
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, mehr Kopfbewegung – **Prüfung:** Crossref ✓, Abstract gelesen
- Karbach, J., & Kray, J. (2009). How useful is executive control training? Age differences in near and far transfer of task-switching training. *Developmental Science, 12*(6), 978–990. https://doi.org/10.1111/j.1467-7687.2009.00846.x – Transfer nach Wechseltraining – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Kiesel, A., Steinhauser, M., Wendt, M., Falkenstein, M., Jost, K., Philipp, A. M., & Koch, I. (2010). Control and interference in task switching – A review. *Psychological Bulletin, 136*(5), 849–874. https://doi.org/10.1037/a0019842 – Übersicht Wechselkosten – **Prüfung:** Crossref ✓
- Kim, C., Cilles, S. E., Johnson, N. F., & Gold, B. T. (2012). Domain general and domain preferential brain regions associated with different types of task switching: A meta-analysis. *Human Brain Mapping, 33*(1), 130–142. https://doi.org/10.1002/hbm.21199 – frontoparietales Netzwerk beim Aufgabenwechsel, 36 Studien – **Prüfung:** Crossref ✓, Abstract gelesen
- Kray, J., & Fehér, B. (2017). Age differences in the transfer and maintenance of practice-induced improvements in task switching: The impact of working-memory and inhibition demands. *Frontiers in Psychology, 8*, 410. https://doi.org/10.3389/fpsyg.2017.00410 – Training, Transfer, Erhalt nach 6 Monaten – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Kray, J., & Lindenberger, U. (2000). Adult age differences in task switching. *Psychology and Aging, 15*(1), 126–147. https://doi.org/10.1037/0882-7974.15.1.126 – Alter, Mischkosten – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnsymptome des Auges und neurologische Warnzeichen (S. 6, 17, 28)
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187 – Crowding, Exzentrizität (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitgenauigkeit Touch – **Prüfung:** Crossref ✓, Abstract gelesen
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry, 75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Gleitsichtdesigns – **Prüfung:** Crossref ✓, Abstract gelesen
- Uncapher, M. R., & Wagner, A. D. (2018). Minds and brains of media multitaskers: Current findings and future directions. *Proceedings of the National Academy of Sciences, 115*(40), 9889–9896. https://doi.org/10.1073/pnas.1611612115 – Übersicht, Kausalrichtung offen (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Wasylyshyn, C., Verhaeghen, P., & Sliwinski, M. J. (2011). Aging and task switching: A meta-analysis. *Psychology and Aging, 26*(1), 15–20. https://doi.org/10.1037/a0020912 – Metaanalyse Alter – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Wiradhany, W., & Nieuwenstein, M. R. (2017). Cognitive control in media multitaskers: Two replication studies and a meta-analysis. *Attention, Perception, & Psychophysics, 79*(8), 2620–2641. https://doi.org/10.3758/s13414-017-1408-4 – Replikation zu Ophir et al. (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Zhao, X., Wang, H., & Maes, J. H. R. (2020). Training and transfer effects of extensive task-switching training in students. *Psychological Research, 84*(2), 389–403. https://doi.org/10.1007/s00426-018-1059-7 – Übung, Plateau, kein ferner Transfer – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
