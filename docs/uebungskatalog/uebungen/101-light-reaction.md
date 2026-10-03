---
# ===== Kennung =====
nr: 101
kennung: light-reaction
name: "Lichtreaktion – bei einem aufleuchtenden Licht so schnell wie möglich tippen"
name_original: "Reaktionstest: Visuelle Reaktionszeit („Light Reaction Pro“; Seitentitel: Reaktionstest online | Visuelle Reaktionszeit)"
kapitel: "Visuelle Wahrnehmung"
kapitel_original: "visual"
unterkapitel_original: "reaction-speed"
quelle_url: "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction"
blickfit_umsetzung: {kennung: "blitzreaktion", name: "Blitzreaktion", unterschiede: "Messblock statt Punktejagd: 2 Aufwärm- + 24 gewertete Reize, je 8 in der Mitte, auf einem mittleren und einem äußeren Ring (8 Richtungen, bis ≈ 13° seitlich); nicht alternde Wartezeit 1 s + Exponentialanteil (Mittel 1 s) mit ≈ 5 % Durchgängen ohne Licht; Reiz bleibt bis 1,5 s; Tipp < 100 ms = Frühstart; Median, Interquartilsabstand, Mitte/Rand getrennt; adaptives Zeitziel (−10/+40 ms, ≈ 80 %) nur für Punkte; warmweißes Licht, kein roter Vollflächenblitz, keine Sperren oder Zeitstrafen; Tipp irgendwo oder Leertaste."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Auf dunklem Grund liegt in der Mitte ein Fixationskreuz. Nach einer zufälligen Wartezeit leuchtet in der Mitte oder am Rand eine warmweiße Kugel auf, und man tippt oder klickt irgendwo, sobald man sie sieht. Zu frühe Tipps werden gezählt, ein persönliches Zeitziel passt sich an; ausgewertet werden Median, Schwankung sowie Mitte und Rand getrennt."
ziel_funktionen: [einfache_reaktion]
eingabe: [touch, maus, touchpad]
tablet_geeignet: ja
dauer_sekunden: 45   # nominal; +2 s je Treffer (Uhr max. 60 s) → real ≈ 45 s bis mehrere Minuten (Abschnitt 2)
schwierigkeit_anpassung: "Stufenlos: Level = Punkte/5.250 + 1 (Start immer 1, sinkt nie). Mit dem Level und zusätzlich mit der Trefferserie (bis −30 %) schrumpfen Antwortfenster 300 → 183 ms (L10) → 125 ms (L15, Untergrenze 50 ms) und Wartezeit 1,0–2,5 s → 0,69–1,63 s (L10) → 0,54–1,21 s (L15). Jeder Treffer verlängert die Runde um 2 s; sie endet praktisch erst, wenn das Fenster kürzer wird als die eigene Reaktionszeit."
messgroessen: ["Original: Punkte (150 × Combo-Faktor 1–3 × Levelfaktor)", "Original: Ø-Reaktionszeit (arithmetisches Mittel, nur Treffer im Fenster)", "Original: Genauigkeit = Treffer/(Treffer + Fehler), höchstes Level, maximale Combo, Note S+ bis F", "sinnvoll: Median und Interquartilsabstand bei fester Wartezeitverteilung und ohne Fenster", "sinnvoll: Frühstarts (vor dem Reiz oder < 100 ms) und Aussetzer getrennt zählen", "sinnvoll: Reaktionstempo (Mittel von 1/RT), Verlauf pro Gerät"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
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
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 2
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 3
    auge_hand_koordination: 0
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
  zeitdruck: 3
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Touch, Maus oder Touchpad; Tippen an beliebiger Stelle genügt (kein Zielen)", "Reiz groß (≈ 2,6–2,9° Sehwinkel), hell und zentral – keine Anforderung an Sehschärfe, Farbsehen oder Nahkorrektur", "Toleranz für wiederholte weiße Blitze auf Schwarz und eine rote Überblendung bei Fehlern (abschaltbar)", "Regelkarten teils englisch; Ablauf ohne Lesen verständlich"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, trockenes_auge_bildschirm, aufmerksamkeitsprobleme, tremor_parkinson]
geeignet_fuer: ["einfache Reaktion auf einen plötzlichen Lichtreiz in der Mitte und am Rand üben", "Warten können: erst tippen, wenn das Licht wirklich da ist", "kurze Aufwärmübung; Selbstvergleich der Tagesform auf demselben Gerät", "Menschen mit herabgesetzter Sehschärfe, Gleitsicht oder Farbsehschwäche, da der Reiz groß, hell und farbneutral ist", "Tablet ohne Feinmotorik (Tippen irgendwo)"]
weniger_geeignet_fuer: ["genaue Messung oder Normvergleich der Reaktionszeit (Geräteversatz, Streuung von Durchgang zu Durchgang)", "Übungsziele Peripherie-Wahrnehmung im engeren Sinn, Blicksprünge, Suche oder Wahlreaktion (dafür 401, 108, 103, 202)", "Menschen, die bei Zeitdruck und gespanntem Warten rasch ungeduldig werden", "Erwartung eines Nutzens für Straßenverkehr, Sport oder das Sehen"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Einfache Reaktionszeit ist über Wiederholungen sehr stabil (Mittel- und Medianwert änderten sich über 16 Durchgänge des 3-min-PVT nicht systematisch, nur Randgrößen wie Frühstarts minimal, Basner et al. 2018; Sportler nicht schneller, Kida et al. 2005); in der Übung verbessern sich die Werte vor allem durch Gewöhnung an Gerät und Rhythmus. Große Zugewinne gibt es in Studien nur bei aufgabenähnlichen Tests (SMD 2,66 vs. 0,50; Guo et al. 2025). Die Übung selbst ist nicht untersucht, ein Alltagsnutzen nicht belegt."
aehnliche_uebungen: [503, 102, 202, 208, 401, 301, 703, 107]
stichworte: ["einfache Reaktionszeit", "Simple Reaction Time", "Lichtreiz", "Blitz", "Vorperiode", "Hazardrate", "Frühstart", "Antizipation", "Daueraufmerksamkeit", "PVT", "Combo", "Antwortfenster", "Tippen irgendwo", "Photosensitivität", "Blitzreaktion"]
---

# 101 · Lichtreaktion – beim weißen Aufblitzen in der Bildmitte tippen

> Original: „Reaktionstest: Visuelle Reaktionszeit“ („Light Reaction Pro“) – skilldrills.online, Kapitel Visuelle Wahrnehmung (`visual`, Unterkapitel `reaction-speed`) · Blickfit: umgesetzt als **„Blitzreaktion“** (`src/exercises/blitzreaktion/`), mit deutlich anderem Aufbau (Abschnitt 10)

## 1. Kurzbeschreibung

Auf dunklem Grund steht in der Mitte ein Fixationskreuz. Nach einer zufälligen Wartezeit (meist 1–3 s) leuchtet eine warmweiße Kugel in der Mitte oder am Rand auf; man tippt oder klickt irgendwo (oder drückt die Leertaste), sobald man sie sieht. Der Blick bleibt auf dem Kreuz. Ein Messblock besteht aus 2 Aufwärmreizen und 24 gewerteten Reizen, je 8 in der Mitte, auf einem mittleren und auf einem äußeren Ring. Gelegentlich folgt auf die Wartezeit gar kein Licht; wer vor dem Licht oder innerhalb von 100 ms danach tippt, hat zu früh getippt, und der Durchgang wird mit neuer Wartezeit wiederholt. Geübt wird die **einfache Reaktion** und das **Warten-Können**, nicht das Sehen selbst.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spiel-Chunk (`75095-…js`, formatiert) samt Hilfsmodulen (Schwierigkeitskurve, Combo, Einstellungen, Stylesheet), gelesen 29./30.09.2026; vgl. docs/skilldrills-analyse.md §0–1. Nur Mechanik ausgewertet. **[Code]** = aus dem Code, **[ER]** = eigene Rechnung/Simulation.

- **Reiz [Code]:** 2D-Canvas; Scheibe r = 52 CSS-px (feste Pixelgröße), Ruhe #151515, Blitz #FFFFFF mit Leuchtsaum (shadowBlur 30), Mittelpunkt r = 4 px; Grund #080811 mit 1-px-Raster (3 % Weiß). [ER] Ø 104 px ≈ 2,6° (Monitor 96 ppi, 60 cm) bzw. ≈ 2,9° (iPad, 40 cm); Sprung der relativen Leuchtdichte 0,0075 → 1,0.
- **Ablauf [Code]:** Countdown 2,45 s, Startlevel immer 1. Wartezeit gleichverteilt in [min, max) → Blitz → Antwortfenster; nach einem Treffer beginnt sofort die nächste Wartezeit.
- **Schwierigkeit [Code]:** p = (Level − 1)/14 in der gemeinsamen Kurve `ease` (docs/skilldrills-analyse.md), Combo-Anteil r = (Combo-Faktor − 1)/2. Fenster = max(50, ease(300 → 70)·(1 − 0,3r)); Wartezeit min = max(300, ease(1000 → 400)·(1 − 0,25r)), max = max(500, ease(2500 → 800)·(1 − 0,25r)). Fenster/min/max in ms: L1 300/1000/2500 · L5 253/879/2156 · L10 183/694/1632 · L15 125/544/1207 · L15 mit Combo ≥ 50: 88/408/905.
- **Punkte und Zeit [Code]:** Treffer = 150 × Combo-Faktor (≥ 3 → 1,1 … ≥ 50 → 3,0) × (1 + 0,5p); +2 s, Uhr höchstens 60 s. Level = Punkte/5.250 + 1, stufenlos, sinkt nie.
- **Fehler [Code]:** Verpasster Blitz → −1 s, Combo 0, 350 ms Pause. Tipp vor dem Blitz, < 320 ms nach dem vorigen Tipp oder während der Sperre → −1 s, Combo 0, **1.200 ms Sperre**; jeder weitere Tipp in der Sperre zählt erneut als Fehler und startet sie neu. Bei jedem Fehler rote Überblendung des ganzen Spielfelds (Radialverlauf, Mitte 50 % #ef4444, Ausklang 0,45 s; abschaltbar). Mit der Einstellung „Timeout aus“ (Standard: an) bleibt der Blitz bis zum Tipp.
- **Eingabe und Zeitmessung [Code]:** `pointerdown` auf der ganzen Fläche (Maus, Touch, Stift), keine Tastatur. Die Reaktionszeit läuft von `performance.now()` beim *Auslösen* des Blitzes (vor dem Zeichnen) bis `performance.now()` im Handler – Zeichen-, Anzeige- und Eingabeverzug werden mitgemessen. Keine Frühstartgrenze nach Reizbeginn.
- **Ergebnis [Code]:** Genauigkeit, Ø-Reaktionszeit (Mittel der Treffer), höchstes Level, maximale Combo, Note aus √(Punkte/15.000) (S+ ab ≈ 13.540 Punkten); Bestwerte nur lokal im Browser.
- **Rundendauer und Punkte [ER]:** Simulation mit ex-Gauß-verteilten Reaktionszeiten (ohne Frühstarts, je 400 Läufe):

  | gemessenes Mittel (inkl. Gerät) | angezeigtes Ø (nur Treffer) | Punkte (Median) | Level | Rundendauer |
  |---|---|---|---|---|
  | 230 ms | ≈ 219 ms | ≈ 21.400 | ≈ 5 | ≈ 4 min |
  | 250 ms | ≈ 235 ms | ≈ 11.600 | ≈ 3 | ≈ 2,7 min |
  | 270 ms (≈ 213 ms + Touch-Versatz) | ≈ 248 ms | ≈ 6.200 | ≈ 2 | ≈ 1,8 min |
  | 300 ms | ≈ 260 ms | ≈ 2.500 | ≈ 1,5 | ≈ 1 min |

**Widersprüche Regeltext ↔ Code:** (1) „Zero Penalties (Default) … time penalty is opt-in“ – der Abzug von 1 s ist immer aktiv, die Einstellung wirkungslos. (2) „45-Sekunden-Sitzung“ – gute Spieler:innen spielen mehrere Minuten. (3) „Verzögerung 300–2.500 ms“ – auf Level 1 sind es 1.000–2.500 ms. (4) „Hardware-Latenzen werden nach Woods et al. berücksichtigt“ – der Code korrigiert nichts. (5) Dass auch Tipps *in* der Sperre bestraft werden, steht nirgends.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt einen Test der „visuomotorischen Latenz“ mit Vier-Phasen-Kaskade (Netzhaut „Rhodopsin-Isomerisierung“ 20–40 ms, Sehbahn 30–50, Kortex 50–80, Pyramidenbahn 30–50 ms), Piéron-Gesetz, einer Stufentabelle („Tier 1 Apex-Reflex < 180 ms | 15.000+ Punkte | Combo 28x+ … Tier 5 > 320 ms“), Tipps (Mitte fixieren, Zimmer abdunkeln, Finger vorspannen, 144/240-Hz-Monitor) und verspricht, die Reaktionslatenz „für Athletik und E-Sport“ zu senken; Zielgruppen: E-Sport, Sprint, Kampfsport, Motorsport, Piloten, Autofahrer. **Einordnung** (Einzelprüfung in Abschnitt 11):

- **Zutreffend:** Reaktion ist kein Reflex; einfache visuelle Reaktionszeit gesunder Erwachsener ≈ 200–250 ms (kalibriert 231 ms, ohne Hardwareanteil 213 ms, n = 1.469; Woods et al., 2015); hellere Reize werden schneller beantwortet (Pins & Bonnet, 1996 – eine Potenzfunktion); auditiv schneller als visuell; Daten bleiben lokal.
- **Kaskade falsch bzw. unbelegt:** Die Isomerisierung von Rhodopsin dauert ≈ 200 Femtosekunden (Schoenlein et al., 1991); am hellen Bildschirm arbeiten ohnehin die Zapfen. Die „20–40 ms“ stammen aus Kosinski (Zeit, bis ein Lichtreiz das Gehirn erreicht). Gemessen beginnt die Antwort im visuellen Kortex nach ≈ 56 ms, frontal nach ≈ 80 ms (Foxe & Simpson, 2002). Die übrigen Phasenzahlen stehen in keiner genannten Quelle.
- **Stufentabelle ohne Datengrundlage und in sich widersprüchlich:** Die Seite sammelt nach eigener Aussage keine Daten; keine Quelle enthält Punkte- oder Combo-Normen. [ER] Wer im Mittel 230 ms braucht („Tier 3“), erreicht ≈ 21.400 Punkte („Tier 1“), weil die Punkte vor allem die Rundendauer abbilden. „Kortikospinale Erregbarkeit“, „synaptische Verzögerung“ als Stufenmerkmal: ohne Beleg.
- **Trainingsversprechen überzogen:** Die einfache Reaktionszeit ändert sich bei Wiederholung kaum (PVT: Mittel/Median stabil, Basner et al., 2018) und bei Sportlern nicht kürzer (Kida et al., 2005). Posner (1980) und Dye et al. (2009) belegen die „Trainierbarkeit dieses Systems“ nicht.
- **Tipps:** „Fixieren spart 20–30 ms Aufmerksamkeitsverlagerung (Posner)“ – bei einem einzigen zentralen Reiz gibt es keine Verlagerung. „Zimmer abdunkeln, damit sich die Pupillen weiten“ – kein Beleg für schnellere Reaktion; ein weißer Blitz in dunkler Umgebung blendet stärker, für Lichtempfindliche nicht empfehlenswert (Einschätzung, keine Messung). „Finger vorspannen“ – bei der Maus plausibel (kein Leerweg), bei Touch bedeutungslos. „60 Hz bis 16,7 ms, 240 Hz 4,1 ms“ – Bilddauer (Physik, nicht Woods); wichtiger ist die Gesamtlatenz (Spjut et al., 2019).
- **Nicht geprüft:** „Schlafmangel +30–80 ms, Koffein −10–20 ms“, „Profis 160–190 ms“. Belegt ist nur, dass solche Aufgaben empfindlich auf Schlafmangel reagieren (PVT; Basner & Dinges, 2011).

## 4. Optische und okulomotorische Grundlagen

- **Sehfunktionen:** Entdecken eines großen, hellen Reizes auf dunklem Grund – kaum Anforderung an Sehschärfe, Kontrastempfindlichkeit oder Farbsehen; auch bei herabgesetztem Visus, Linsentrübung oder ohne Nahkorrektur gut sichtbar. Farbsehschwäche (≈ 8 % der Männer) spielt keine Rolle (warmweißer Reiz; Farbe trägt keine Information).
- **Blick:** Die Mitte zu fixieren ist Teil der Aufgabe; die Reize erscheinen aber auch bis ≈ 13° neben der Blickmitte (Tablet quer, 40 cm). Ob wirklich fixiert wird, prüft die Übung nicht (Vater & Strasburger, 2021). Verlangt werden keine gezielten Sakkaden, keine Folgebewegung und kein Stereosehen. Gesichtsfeldausfälle entstehen je nach Ort der Schädigung entlang der Sehbahn: vor der Kreuzung meist einäugig, an der Kreuzung ungleichseitige (heteronyme), dahinter gleichseitige (homonyme) Halbseitenausfälle (Muchnick, 2008, S. 32). Bei einem zentralen Ausfall (z. B. Makuladegeneration) kann der Reiz in der Mitte teils im Ausfall liegen; Randreize in einem Ausfallbereich bleiben unbeantwortet. Das ist kein Übungsfehler und kein Test; unklare Ausfälle gehören augenärztlich abgeklärt.
- **Brille:** Gleitsicht unkritisch, weil nichts scharf gesehen werden muss; bequemer mit tiefer gestelltem Monitor (mit Gleitsicht hält man den Kopf ≈ 7° höher; Jaschinski et al., 2015) bzw. Tablet in Blickhöhe. Alterssichtigkeit beeinflusst das Entdecken nicht.
- **Lichtreize:** Gezeigt wird immer nur ein einzelner, kleiner Reiz (Ø ≥ ≈ 1 cm), höchstens einer pro Sekunde; es gibt keine vollflächigen oder roten Blitze, die Rückmeldung am Reizort dauert 140 ms. Licht- und musterausgelöste Anfälle sind selten (≈ 1 : 10.000; 5–24 J. ≈ 1 : 4.000), Rot ist ein Risikofaktor (Fisher et al., 2005).
- **Trockenes Auge:** Wer beim gespannten Warten das Blinzeln unterdrückt, verstärkt den ohnehin ≈ 5-fachen Rückgang der Lidschlagrate am Bildschirm (Patel et al., 1991).
- **Bildschirm:** Jede Anzeige wartet auf das nächste Bild – bei 60 Hz im Mittel ≈ 8 ms, höchstens 16,7 ms Zusatzverzug.

## 5. Neurowissenschaftliche Grundlagen

- **Weg des Signals:** Netzhaut → Sehnerv → seitlicher Kniehöcker → okzipitaler visueller Kortex (C1, Beginn ≈ 56 ms; nur der erste Teil ist V1-dominiert) → parietale und frontale Areale (frontal ≈ 80 ms; Foxe & Simpson, 2002) → prämotorischer/motorischer Kortex → Pyramidenbahn → Fingermuskeln. Das reine Entdecken dauert ≈ 131 ms und altert nicht; der Altersanstieg der Reaktionszeit liegt im motorischen Teil (Woods et al., 2015). Die einfache visuelle Reaktionszeit gesunder Erwachsener liegt bei ≈ 213 ms ohne und ≈ 231 ms mit Geräteanteil (n = 1.469; Woods et al., 2015; Übersichten nennen 180–200 ms, Kosinski, 2008) und ist bei akustischen Reizen kürzer (Jain et al., 2015).
- **Zeitliche Erwartung:** Bei gleichverteilter Wartezeit steigt mit jeder verstrichenen Millisekunde die bedingte Wahrscheinlichkeit, dass der Reiz jetzt kommt (Hazardrate) – man wird schneller und neigt zum Vorwegnehmen (Niemi & Näätänen, 1981). Neurone im Parietalareal LIP bilden diese Wahrscheinlichkeit ab (Affen, Blicksprungaufgabe; Janssen & Shadlen, 2005). In der Übung ist die Hazardrate konstant (1 s plus exponentieller Anteil) und etwa jeder zwanzigste Durchgang enthält kein Licht; Raten lohnt sich daher nicht.
- **Hemmung:** Eine vorbereitete Antwort zurückzuhalten ist hier der eigentliche Anspruch an die Hemmung: Tipps vor dem Licht oder weniger als 100 ms danach gelten als zu früh (Konvention aus dem PVT; Basner & Dinges, 2011). Anders als bei 102 gibt es keinen Reiz, auf den man gezielt nicht reagieren soll.
- **Intensität:** Ein heller Reiz auf dunklem Grund liegt nahe am Optimum der Piéron-Kurve (Pins & Bonnet, 1996); dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- Einfache Reaktion ohne Wahl und ohne Zielbewegung (Tipp irgendwo): Fitts'sches Gesetz und Zielgenauigkeit spielen keine Rolle; motorisch zählen Auslösen der Fingerbewegung und Schalterweg (Maus) bzw. Touch-Erkennung.
- **Touch vs. Maus:** Web-Apps überschätzen die Reaktionszeit auf Touchgeräten im Mittel um ≈ 58 ms (iPhone) bis ≈ 66–70 ms (Android), auf Laptops um ≈ 62–133 ms; innerhalb eines Geräts streut der Versatz meist nur ≈ 2–8 ms (Ausnahme MacOS/Firefox ≈ 16 ms; Pronk et al., 2020). Ende-zu-Ende-Latenz iPad Air 2, Safari mit Canvas ≈ 77 ms (Casiez et al., 2017).
- **Tempo-Genauigkeits-Abwägung:** Wer schneller sein will, tippt eher zu früh. Deshalb bleibt der Reiz unverändert; nur das persönliche Zeitziel für die Punkte passt sich an.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät:** Die gemessene Zeit enthält Zeichnen (1–2 Bilder), Anzeige und Eingabe; Unterschiede zwischen Geräten von Dutzenden ms übersteigen den Alterseffekt eines Jahrzehnts (≈ 5–6 ms; Woods et al., 2015). Stufen, Normen und Ranglisten sind daher nicht seriös – nur Selbstvergleich auf demselben Gerät. Zwei Verfahren können hoch korrelieren und trotzdem verschiedene Werte liefern: Korrelation ist keine Übereinstimmung (Mountford et al., 2004, S. 24).
- **Streuung am Menschen:** Messungen am lebenden Menschen streuen stärker als an Prüfkörpern, weil Person und Situation mitmessen; darum zählen mehrere Durchgänge und der Median, nicht der Einzelwert (Mountford et al., 2004, S. 43–44). Der Median ist robust gegen einzelne Aussetzer, die Schwankung (Interquartilsabstand) zeigt, wie gleichmäßig die Antworten sind.
- **Vergleichbare Runden:** Die Wartezeit beeinflusst die Reaktionszeit direkt (Niemi & Näätänen, 1981); sie folgt deshalb in jeder Runde derselben Verteilung, und der Reiz bleibt gleich. Zu frühe Tipps werden getrennt gezählt und fließen nicht in die Zeiten ein.
- **Alter:** Einfache Reaktionszeit bis ≈ 50 J. kaum langsamer, danach deutlicher (Der & Deary, 2006); die Schwankung steigt ab ≈ 60 (Dykiert et al., 2012). Bei älteren Nutzer:innen am Tablet addieren sich langsamere Reaktion und Geräteversatz; Vergleiche mit Jüngeren oder mit Normwerten sind nicht sinnvoll.
- **Zustand:** Müdigkeit und Schlafmangel verlangsamen und erzeugen Aussetzer (Basner & Dinges, 2011); anfangs wirkt vor allem Gewöhnung an Gerät und Rhythmus.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** In einem 1-min-Lichtwand-Reaktionstest stieg die Leistung nur in den ersten ≈ 15 von 30 Tests, danach nicht mehr; 1–2 Wochen Pause kosteten nichts (n = 24; Wells & Johnson, 2022); Mittel und Median der einfachen Reaktionszeit änderten sich über 16 PVT-Durchgänge nicht systematisch, nur Randgrößen (schnellste 10 %, Frühstarts) minimal (n = 45; Basner et al., 2018). Die Punkte der Übung beruhen auf einem persönlichen Zeitziel und sind kein Maß für einen Trainingseffekt.
- **Naher Transfer – schwach:** Digitales Sehtraining zeigt bei der Reaktionszeit SMD 2,66, wenn Trainings- und Testaufgabe ähnlich sind, aber nur 0,50 bei unähnlichen Tests (Guo et al., 2025); Actionspiele: kleiner Effekt (g = 0,34) mit Publikationsbias (Bediou et al., 2018; Dye et al., 2009). Zwei Jahre Schlagtraining verbesserten die Go/No-Go-, nicht die einfache Reaktionszeit (Kida et al., 2005).
- **Alltagstransfer – fehlend:** Keine Studie zeigt einen Nutzen solcher Tippaufgaben für Verkehr oder Sport; die besten Hinweise gibt es für naturnahes, sportartspezifisches Training (Lochhead et al., 2026). Bremsreaktionen im Verkehr dauern 0,7–1,5 s und hängen vor allem von der Erwartung ab (Green, 2000) – ein Tipp auf ein Licht bildet das nicht ab.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** eine einfache, schnell verständliche Reaktionsübung gesucht wird; Frühstarts/Ungeduld Thema sind; schlechte Sehschärfe, Gleitsicht oder Farbsehschwäche andere Übungen erschweren; ein Tablet ohne Maus genutzt wird.
- **Weniger passend, wenn …** die Reaktionszeit verlässlich gemessen oder verglichen werden soll, gezielte Blickbewegungen, Peripherie-Wahrnehmung im engeren Sinn oder Entscheidungen geübt werden sollen, oder Zeitdruck belastet.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (einzelne Lichtreize auf dunklem Grund; in hellem Raum üben und Rücksprache mit der Ärztin oder dem Arzt halten); `trockenes_auge_bildschirm` (gespanntes Warten; bewusst blinzeln, Pausen); `aufmerksamkeitsprobleme` (zu frühe Tipps verlängern die Wartezeit und werden gezählt; kurze Blöcke); `tremor_parkinson` (ungewollte Tipps vor dem nächsten Licht zählen als zu früh; langsamere Reaktionen sind kein Fehler, das Zeitziel passt sich an).
- **Abklärung vor dem Üben:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung, Schwindel oder Zittern gehören ärztlich abgeklärt; sie sind kein Anlass zum Üben (Muchnick, 2008, S. 6, 28).
- **Kombiniert gut mit …** 102 (gleiche Mechanik mit Stopp-Reizen), 202 (Wahlreaktion), 208 (Daueraufmerksamkeit), 401 oder Blitzblick (Reize am Rand), 107 (Timing bei sichtbarer Annäherung), 301 (Zeitgefühl ohne Reiz).
- **Überschneidungen:** Ähnlich zu 503 (einfache Reaktion mit der Maus); für Touchgeräte ist 101 besser geeignet.
- **Besonderheiten dieser Umsetzung:** Zusätzlich zur Reaktion wird das Entdecken am Rand geübt (Reize bis ≈ 13° seitlich) bei Fixation der Mitte; der Zeitdruck ist gering (der Reiz bleibt bis zu 1,5 s), Vorwegnehmen lohnt sich nicht (gleichbleibende Wartezeitverteilung, Durchgänge ohne Licht), die Lichtreize sind schwach (warmweiß, kein roter Blitz). Sie eignet sich für die Selbstbeobachtung und für lichtempfindliche oder ältere Nutzer:innen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals:** Stufentabelle ohne Daten und im Widerspruch zu den Punkten; Mittelwert nur über Treffer; Wartezeitverteilung und Fenster ändern sich mit dem Level (Runden nicht vergleichbar); keine Frühstartgrenze nach Reizbeginn; Zeitmessung ab Programmauslösung statt Bildzeitpunkt, `performance.now()` statt Ereignis-Zeitstempel; wirkungslose Straf-Einstellung; eskalierende Sperre; großflächiges rotes Fehlersignal; „Zimmer abdunkeln“-Tipp; Rundendauer von 45 s bis mehrere Minuten; englisch-deutscher Mischtext.

**Blickfit „Blitzreaktion“ – so ist es umgesetzt (Code/Kopfkommentar `src/exercises/blitzreaktion/index.ts`):**
- **Messblock:** 2 Aufwärmreize + 24 gewertete (8 Mitte, 8 mittlerer Ring bei 50 %, 8 äußerer Ring bei 90 % des Randabstands, je 8 Richtungen; [ER] auf dem iPad quer in 40 cm ≈ 4–7° bzw. ≈ 7–13°), Dauer ≈ 1–1,5 min.
- **Wartezeit:** 1 s + exponentieller Anteil (Mittel 1 s), bei Anteil > 3 s ein Durchgang ohne Licht (≈ 5 %) – konstante Hazardrate, Raten lohnt nicht (Niemi & Näätänen, 1981). Tipp vor dem Licht oder < 100 ms danach = „zu früh“ (PVT-Konvention; Basner & Dinges, 2011), neuer Durchgang mit +0,4 s, ohne Zeitstrafe oder Sperre.
- **Reiz:** warmweiße Kugel (#FFF4C2) auf dunkelblauem Grund, Ø ≥ ≈ 1 cm (≈ 2–2,4° auf dem iPad quer), bleibt bis zur Antwort, höchstens 1,5 s (dann „verpasst“); Rückmeldung 140 ms grün/gelb am Reizort, kein roter Blitz; < 1 Reiz/s.
- **Auswertung:** Median, Interquartilsabstand, Mitte und Rand getrennt, Frühstarts, Verpasste; Tipps nach Muster (z. B. Rand > 60 ms langsamer). Zeit über `event.timeStamp` und Bildzeitpunkt; Tipp irgendwo, Leertaste/Enter.
- **Motivation:** persönliches Zeitziel nach gewichtetem Up-Down (−10 ms nach Treffer, +40 ms sonst → ≈ 80 % Treffer; Kaernbach, 1991), 250–1.500 ms; es bestimmt nur Punkte, nicht den Reiz.

**Offene Empfehlungen für Blickfit:** (1) Die Angabe „gut für: Bremsen im Verkehr“ in `texts.ts` kann als Transferversprechen gelesen werden – besser „schnell auf Plötzliches reagieren“; der Hinweis „nicht belegt“ steht bereits im Text. (2) Randreize decken nur die nahe Peripherie ab, und die Reizgröße wirkt in der Peripherie stärker auf die Reaktionszeit als in der Mitte (Osaka, 1976) – Mitte/Rand nicht als „Sehfeldmessung“ darstellen; ob wirklich fixiert wird, prüft die Übung nicht (Vater & Strasburger, 2021). (3) Verlauf pro Gerät führen, Gerätewechsel als neue Basislinie. (4) Ergebnisse nie als Normwert oder Aussage zur Fahrtüchtigkeit zeigen.

## 11. Quellen

### Von der Website angegeben

- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓ (Abstract, Volltext); **stützt:** teilweise (231/213 ms, Entdecken 131 ms; Hardwareverzug 17,8 ms – korrigiert wird im Spiel nichts; Hz-Werte nicht aus Woods).
- Kosinski, R. J. (2008). *A literature review on reaction time*. Clemson University (keine DOI; Fassung „Last updated September 2013“, http://www.cognaction.org/cogs105/readings/clemson.rt.pdf) – **Prüfung:** graue Literatur, korrekt ohne DOI angegeben; **stützt:** teilweise (visuell 180–200 ms, nicht 200–250 ms; 20–40 ms = Zeit bis zum Gehirn, keine „Rhodopsin-Isomerisierung“).
- Pins, D., & Bonnet, C. (1996). On the relation between stimulus intensity and processing time: Piéron's law and choice reaction time. *Perception & Psychophysics, 58*(3), 390–400. https://doi.org/10.3758/BF03206815 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (Potenzgesetz ja; „maximale Ganglienzellen-Depolarisation“, „Zimmer abdunkeln“ nein).
- Posner, M. I. (1980). Orienting of attention. *Quarterly Journal of Experimental Psychology, 32*(1), 3–25. https://doi.org/10.1080/00335558008248231 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** nein (verdeckte Aufmerksamkeitsverlagerung bei Hinweisreizen; weder „20–30 ms“ noch Trainierbarkeit; hier nur ein zentraler Reiz).
- Jain, A., Bansal, R., Kumar, A., & Singh, K. D. (2015). A comparative study of visual and auditory reaction times on the basis of gender and physical activity levels of medical first year students. *International Journal of Applied and Basic Medical Research, 5*(2), 124–127. https://doi.org/10.4103/2229-516X.157168 – **Prüfung:** DOI stimmt ✓ (Abstract, Volltext); **stützt:** teilweise (n = 120, auditiv schneller; Vier-Phasen-Zahlen stehen dort nicht).
- Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current Directions in Psychological Science, 18*(6), 321–326. https://doi.org/10.1111/j.1467-8721.2009.01660.x – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (Actionspiele, vor allem Wahlaufgaben; keine einfache Licht-Reaktion, kein „E-Sport-Training“; spätere Metaanalysen: kleine bzw. kaum Effekte).
- *Nur im Fließtext:* Shelton, J., & Kumar, G. P. (2010). Comparison between auditory and visual simple reaction times. *Neuroscience & Medicine, 1*(1), 30–32. https://doi.org/10.4236/nm.2010.11004 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** nein (n = 14, visuell ≈ 331 ms – widerspricht „200–250 ms“). Piéron (1952, *The Sensations*, Buch) – nicht geprüft, Inhalt über Pins & Bonnet indirekt bestätigt.

### Weitere Fachliteratur

- Basner, M., & Dinges, D. F. (2011). Maximizing sensitivity of the Psychomotor Vigilance Test (PVT) to sleep loss. *Sleep, 34*(5), 581–591. https://doi.org/10.1093/sleep/34.5.581 – Frühstart < 100 ms, Aussetzer, Schlafmangel.
- Basner, M., Hermosillo, E., Nasrini, J., McGuire, S., Saxena, S., Moore, T. M., Gur, R. C., & Dinges, D. F. (2018). Repeated administration effects on Psychomotor Vigilance Test performance. *Sleep, 41*(1), zsx187. https://doi.org/10.1093/sleep/zsx187 – keine systematischen Übungseffekte auf Mittel/Median der einfachen Reaktionszeit (kleine Änderungen nur bei Randgrößen).
- Bediou, B., Adams, D. M., Mayer, R. E., Tipton, E., Green, C. S., & Bavelier, D. (2018). Meta-analysis of action video game impact on perceptual, attentional, and cognitive skills. *Psychological Bulletin, 144*(1), 77–110. https://doi.org/10.1037/bul0000130 – kleiner Effekt, Publikationsbias.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Touch-/Mauslatenz.
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Alter.
- Dykiert, D., Der, G., Starr, J. M., & Deary, I. J. (2012). Age differences in intra-individual variability in simple and choice reaction time: Systematic review and meta-analysis. *PLoS ONE, 7*(10), e45759. https://doi.org/10.1371/journal.pone.0045759 – Schwankung im Alter.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität, Rot.
- Foxe, J. J., & Simpson, G. V. (2002). Flow of activation from V1 to frontal cortex in humans: A framework for defining "early" visual processing. *Experimental Brain Research, 142*(1), 139–150. https://doi.org/10.1007/s00221-001-0906-7 – kortikale Latenzen.
- Green, M. (2000). "How long does it take to stop?" Methodological analysis of driver perception-brake times. *Transportation Human Factors, 2*(3), 195–216. https://doi.org/10.1207/STHF0203_1 – Bremsreaktion.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Transfer nur bei ähnlichen Aufgaben.
- Janssen, P., & Shadlen, M. N. (2005). A representation of the hazard rate of elapsed time in macaque area LIP. *Nature Neuroscience, 8*(2), 234–241. https://doi.org/10.1038/nn1386 – Hazardrate im Parietalkortex.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Computer vision syndrome in presbyopia and beginning presbyopia: Effects of spectacle lens type. *Clinical and Experimental Optometry, 98*(3), 228–233. https://doi.org/10.1111/cxo.12248 – Kopfhaltung mit Gleitsicht.
- Kaernbach, C. (1991). Simple adaptive testing with the weighted up-down method. *Perception & Psychophysics, 49*(3), 227–229. https://doi.org/10.3758/BF03214307 – Zeitziel der Blickfit-Version.
- Kida, N., Oda, S., & Matsumura, M. (2005). Intensive baseball practice improves the Go/Nogo reaction time, but not the simple reaction time. *Cognitive Brain Research, 22*(2), 257–264. https://doi.org/10.1016/j.cogbrainres.2004.09.003
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2026). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355. https://doi.org/10.1080/1750984X.2024.2437385 – Sport-Sehtraining (online 2024).
- Niemi, P., & Näätänen, R. (1981). Foreperiod and simple reaction time. *Psychological Bulletin, 89*(1), 133–162. https://doi.org/10.1037/0033-2909.89.1.133 – Vorperiode, zeitliche Erwartung.
- Osaka, N. (1976). Reaction time as a function of peripheral retinal locus around fovea: Effect of stimulus size. *Perceptual and Motor Skills, 43*(2), 603–606. https://doi.org/10.2466/pms.1976.43.2.603 – Reizgröße × Exzentrizität.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Geräteversatz im Browser.
- Schoenlein, R. W., Peteanu, L. A., Mathies, R. A., & Shank, C. V. (1991). The first step in vision: Femtosecond isomerization of rhodopsin. *Science, 254*(5030), 412–415. https://doi.org/10.1126/science.1925597 – 200 fs.
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildrate.
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science, 98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – Blickkontrolle bei Peripherie-Tools.
- Wells, A. J., & Johnson, B. D. I. (2022). Test–retest reliability, training, and detraining effects associated with the Dynavision D2™ Mode A visuomotor reaction time test. *Journal of Sport Rehabilitation, 31*(2), 253–261. https://doi.org/10.1123/jsr.2020-0550 – Übungseffekt und Plateau.
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*, Kriterium 2.3.1 und Definition „general flash and red flash thresholds“ (Norm, keine DOI). https://www.w3.org/TR/WCAG22/
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28), Prüfung der Augenfolgebewegungen (S. 32–35), Gesichtsfeldausfälle nach Sehbahnverlauf (S. 32).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Genauigkeit und Wiederholbarkeit von Messungen am Menschen, Mehrfachmessung (S. 17–18, 24, 43–44).
