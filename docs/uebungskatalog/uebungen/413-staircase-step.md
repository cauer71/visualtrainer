---
# ===== Kennung =====
nr: 413
kennung: staircase-step
name: "Zickzack-Blickfolge mit langsamem Höhenwechsel"
name_original: "Vertikale Blickverfolgung – Übung für Höhenwechsel und Zielwiedererfassung (Staircase Step)"
kapitel: "Blickverfolgung"
kapitel_original: "visual-tracking"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/visual-tracking/staircase-step"
blickfit_umsetzung: {kennung: "hoehenwechsel-bahn", name: "Höhenwechsel-Bahn", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/hoehenwechsel-bahn/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine helle Kugel läuft mit gleichmäßigem Tempo auf einer Treppenbahn fast waagerecht hin und her und wird Strecke für Strecke ein Stück tiefer, danach wieder hinauf. Man folgt ihr nur mit den Augen bei ruhigem Kopf. Auf den geraden Stücken erscheint in der Kugel kurz ein Landolt-Ring, dessen Öffnungsrichtung man über einen großen Button meldet. Höhenwechsel und Tempo passen sich an. Gemessen wird nur das Erkennen des Zeichens."
ziel_funktionen: [blickfolge]
eingabe: [maus, touch]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Kein Levelsystem, keine automatische Anpassung. Nur manuell: Tempo 0,5–9× (bei 1× 0,65 s je Zickzack-Abschnitt, bei 9× 72 ms), 'Random Speed' lässt das Tempo weich zwischen dem 0,4- und 1,9-Fachen schwanken, 'Hide Line' blendet die Führungslinie aus, Zielradius 10–50 px, Dauer 30/45/60/90/120 s."
messgroessen: ["Original: keine Leistungsmessung (nur Zähler abgeschlossener Sitzungen)", "sinnvoll mit Eyetracker: Folge-Gain auf den Geraden, Zahl und Größe der Aufholsakkaden nach jedem Wendepunkt, Vorlauf/Verzögerung der Augenumkehr (ms)", "Ersatz ohne Eyetracker: Finger/Zeiger folgen lassen und mittleren Abstand zum Ziel (Grad) sowie Umkehr-Verzögerung (ms) messen"]

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
    sakkaden: 2
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
  zeitdruck: 1
  flimmern_lichtreize: 0
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm oder Tablet in ruhiger Umgebung, Kopf möglichst ruhig, Abstand 40–70 cm", "Scharfes Sehen im Zwischenbereich über die ganze Breite (≈ 17–19° bei 60 cm) – Bildschirmbrille oder Einstärkenglas günstiger als Gleitsicht", "Maus oder Finger nur zum Starten; während der Übung keine Eingabe", "Tempo anfangs 0,5–1× (≈ 13–30°/s); ab ≈ 3× (≈ 80–90°/s, Umkehr alle 0,22 s) nahe an der Obergrenze der glatten Folgebewegung (≈ 100°/s bei 4 von 5 Laborpersonen; Meyer et al., 1985), das Auge folgt dann zunehmend mit Sakkaden"]
vorsicht_bei: [presbyopie_gleitsicht, trockenes_auge_bildschirm, kopfschmerz_asthenopie, nystagmus, schwindel_vestibulaer, kinder_unter_6]
geeignet_fuer: ["glatte Blickfolge auf einer festen, gut vorhersagbaren Bahn üben", "vorausschauendes Umkehren des Blicks an regelmäßig wiederkehrenden Wendepunkten (Timing-Vorhersage)", "ruhige Augenübung ohne Hand- oder Körpereinsatz und ohne Blinkreize", "Zwischenstufe zwischen weicher Welle (403) und unvorhersagbaren Richtungswechseln (415 → 410 → 411)", "waagrechtes Gegenstück zum überwiegend senkrechten Zickzack 405 (gleiche Mechanik, Achsen vertauscht)"]
weniger_geeignet_fuer: ["gezieltes Üben vertikaler Blickfolge oder der Auf-/Ab-Asymmetrie (die Bahn ist zu > 90 % waagerecht; dafür 405, dieselbe Zickzack-Mechanik überwiegend senkrecht)", "alle, die einen Messwert der Augenbewegung erwarten (die Übung prüft nur das Erkennen des Zeichens)", "Gleitsichtträger:innen an großen Monitoren ohne Kopfbewegung (Ränder und unterer Bereich unscharf)", "Übungsziel Hand-Auge-Koordination oder Reaktion (keine Handlung gefordert)", "Kinder, die abstrakte Aufgaben nicht durchhalten"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Das Folgen periodischer Dreieck-/Rampenbahnen wird im Labor schon innerhalb weniger Zyklen bzw. Minuten besser (Barnes & Asselman 1991; McHugh & Bahill 1985) – ein gut belegter, aber vor allem kurzfristiger Übungseffekt in der geübten Aufgabe (gleiche Einstufung wie der Zwilling 405 und 402–406); ob er auch ohne Blickmessung bleibt, ist offen. Naher Transfer nur als schwacher Laborhinweis (kurzes Folgetraining wirkte in einem anderen Test, Eibenberger et al. 2012), Lernen der Folgebewegung ist zudem teils richtungsspezifisch (Kahlon & Lisberger 1996, Affen). Transfer auf Sport, E-Sport oder Alltag ist nicht untersucht."
aehnliche_uebungen: [405, 406, 403, 404, 402, 407, 410, 105, 515, 707]
stichworte: ["smooth pursuit", "Blickfolge", "Zickzack", "Dreieckwelle", "Richtungsumkehr", "prädiktive Blickfolge", "Aufholsakkaden", "vertikale Blickfolge", "Auf-Ab-Asymmetrie", "Gleitsicht"]
---

# 413 · Zickzack-Blickfolge mit langsamem Höhenwechsel

> Original: „Vertikale Blickverfolgung – Übung für Höhenwechsel und Zielwiedererfassung“ (Staircase Step) – skilldrills.online, Kapitel Blickverfolgung (`visual-tracking`) · Blickfit: noch nicht umgesetzt · **Dublette:** 405 nutzt dieselbe Bahn-Mechanik (8 Punkte, 7 Abschnitte, gleiches Tempo), nur um 90° gedreht – 405 überwiegend senkrecht, 413 überwiegend waagerecht.

## 1. Kurzbeschreibung

Eine helle Kugel läuft mit gleichmäßigem Tempo auf einer Treppenbahn fast waagerecht hin und her und wird dabei Strecke für Strecke ein Stück tiefer; unten angekommen, läuft sie denselben Weg wieder hinauf. In den Wendepunkten kehrt sie ohne Abbremsen um. Man folgt ihr nur mit den Augen bei ruhigem Kopf. Auf den geraden Stücken, nie in der Wende, erscheint in der Kugel kurz ein Landolt-Ring („C“); man meldet über einen großen Button unten, wohin die Öffnung zeigt. Höhenwechsel je Strecke, Tempo und Zeichengröße steigen in Stufen und passen sich über die 20 Durchgänge einer Runde an das Ergebnis an; die blasse Hilfslinie der Bahn blendet bis Stufe 10 aus. Gemessen wird nur, ob das Zeichen erkannt wird, nicht, ob die Augen tatsächlich folgen.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und Spielcode (Chunks `26949-…js`, `90762-…js`, Stand 29.09.2026); nur Mechanik, kein Code übernommen.

- **Ablauf:** Einstellungen → Countdown ≈ 2,5 s → 30–120 s (Standard 60 s) → Endbildschirm mit Sitzungszähler
  (`localStorage`). Abbruch mit Escape oder beim Verlassen des Vollbilds. Maus/Touch nur zum Starten; am Zeiger wird ein
  Fadenkreuz gezeichnet, aber **nicht ausgewertet**.
- **Bahn:** 8 feste Punkte, x abwechselnd bei 20 % und 80 % der Spielfeldbreite, y in 7 gleichen Stufen von 15 % bis
  85 % der Höhe. Spielfeld 16 : 9 (unter 768 px Fensterbreite 3 : 4, also am Smartphone oder kleinen Tablet hochkant; ein 11″-iPad bleibt auch hochkant bei 16 : 9) → Steigung je Abschnitt ≈ 5° (bzw. ≈ 12°), Wendewinkel
  ≈ 169° (fast vollständige Umkehr), an den Enden 180° (Rückweg auf derselben Linie).
- **Tempo:** 0,22 Bahnlängen/s × Tempo, jeder Abschnitt 0,65 s bei 1×, **konstante Geschwindigkeit ohne Abbremsen**;
  zeitbasiert (dt), also bildfrequenzunabhängig. „Random Speed“: glatte, deterministische Sinusmischung, Faktor 0,40–1,90.
- **Reiz:** Grund #050508, Ziel Radius 16 px (10–50), Rot #ef4444 mit Leuchtsaum; Linie hellblau, 25 % Deckkraft;
  optional „Gaze Trail“ (letzte 15 Bilder), „Scanlines“ (statisch), „Day Mode“. **Keine Blinkreize.**

Eigene Umrechnung (24″-Full-HD in 60 cm ≈ 38 px/°, Spielfeld ≈ 1 100 × 620 px; iPad 11″ quer in 40 cm ≈ 36 px/°);
waagerechter Hub ≈ 17–19°, Höhenbereich ≈ 11–13°; bei 1× Hin-und-her-Periode 1,3 s (≈ 0,77 Hz, Dreieckwelle):

| Tempo | 0,5× | 1× | 2× | 3× | 5× | 9× |
|---|---|---|---|---|---|---|
| Dauer je Abschnitt | 1,30 s | 0,65 s | 0,32 s | 0,22 s | 0,13 s | 0,07 s |
| Zielgeschwindigkeit (24″ / iPad) | 13 / 15°/s | 27 / 30°/s | 54 / 59°/s | 81 / 89°/s | 135 / 148°/s | 240 / 270°/s |
| davon senkrecht | ≈ 1,3°/s | ≈ 2,5°/s | ≈ 5°/s | ≈ 7,5°/s | ≈ 12°/s | ≈ 22°/s |

**Widersprüche Regeltext ↔ Code:** „Stufenbahn“, „90-Grad-Kanten“, „vertikale Blickverfolgung“ – es gibt **keine Stufen
und keine senkrechten Abschnitte**, der senkrechte Anteil beträgt ≈ 9 % der Weglänge. „Blickverzögerung und
Zielverluste erfassen“, Gain-Stufen – **nichts wird gemessen**. „Vor der Kante abbremsen“ – das Ziel fährt ohne Abbremsen bis zum Wendepunkt, wer vorher abbremst, fällt zurück.
„144 Hz entscheidend“ – die Bildschleife verwirft Bilder mit < 13 ms Abstand (≤ ≈ 77 Bilder/s, vgl. 409).

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite verspricht ein „spezialisiertes okulomotorisches Trainingsprogramm“: Vertikale Blickfolge sei schwächer, weil
sie über Mittelhirnkerne (riMLF, Cajal-Kern) laufe und im Alltag „unterstimuliert“ bleibe; die Übung „stärke die
synaptische Plastizität des Mittelhirns“ und helfe im E-Sport und Ballsport. Empfohlen: 2–3 × 45–60 s täglich,
144-Hz-Monitor, 50–70 cm, Kopf „absolut ruhig“. Eine Tabelle ordnet „Vertikalen Gain 0,92–0,98 = Elite, Top 1,5 %“ zu.

- **Richtig:** Vertikal ist schwächer als horizontal (Rottach et al., 1996), aufwärts schwächer als abwärts (Ke et al.,
  2013); die Folgebewegung startet ≈ 100 ms nach Bewegungsbeginn (Lisberger, 2010 – korrigierte Quelle).
- **Überzogen:** Die Schwäche besteht schon bei Säuglingen mit 5–9 Monaten (Grönqvist et al., 2006) – das spricht eher
  für eine früh angelegte Asymmetrie; „Unterstimulation“ als Ursache ist nicht belegt; beim **Start** war die Beschleunigung vertikal sogar eher größer (Rottach et al., 1996).
- **Passt nicht zur Übung:** Mit ≈ 2,5°/s senkrechter Komponente (1×) wird vertikale Folgebewegung kaum gefordert; Kern
  ist waagerechte Folgebewegung mit regelmäßiger Umkehr.
- **Nicht belegt:** „stärkt Mittelhirnbahnen“, „vertikale Augenmuskeln ermüden rascher“, Sport-/E-Sport-Nutzen,
  144-Hz-Vorteile (Woods et al., 2015 behandeln Reaktionszeit). Die Gain-Tabelle hat **keine Datengrundlage**.
  „VOR zerstört den Trainingseffekt“ ist nicht belegt (ruhiger Kopf ist für eine Augenübung aber sinnvoll).

## 4. Optische und okulomotorische Grundlagen

- **Geraden:** Die Kugel ist groß und kontrastreich, die Sehschärfe unkritisch; schwierig wird nur das kleine Zeichen. Der Gain der glatten Komponente ist immer < 0,95, sinkt mit dem Tempo, Aufholsakkaden ergänzen (Collewijn & Tamminga, 1984). Bei 4 von 5 Personen folgte das Auge Rampen bis ≈ 100°/s mit ≈ 90 % des Zieltempos, darüber Sättigung (Meyer et al., 1985). Das Tempo der Übung steigt über die Stufen von ≈ 3,5 auf ≈ 15°/s (Tablet in 40 cm Abstand) und bleibt weit unter dieser Grenze. Horizontal ist der Gain höher als vertikal (Rottach et al., 1996, N = 5).
- **Wendepunkte:** Bei periodischer Bewegung kehrt das Auge **vor** dem Ziel um; das Timing lässt sich sogar willentlich vorprogrammieren, eine unerwartet frühe Umkehr wird viel später beantwortet (Jarrett & Barnes, 2005). Die Vorhersage baut sich über 2–4 Zyklen auf (≈ 300 → 200 ms bis zur Spitzengeschwindigkeit; Barnes & Asselman, 1991). Auf unerwartete Richtungswechsel sinkt das Folgetempo erst nach ≈ 90 ms, die Richtung ändert sich nach ≈ 130 ms (Soechting et al., 2005); der Restfehler wird per Aufholsakkade nach ≈ 125 ms ausgeglichen (de Brouwer et al., 2002). Die Reaktionslatenz auf unvorhersehbare Reizwechsel beträgt ≈ 100 ± 5 ms (Carl & Gellman, 1987). Feste Bahn und gleiches Timing machen die Übung **vorhersagbar** (anders als 410/415).
- **Vertikal/Alter:** Abwärts verläuft die glatte Folge glatter als aufwärts (Ke et al., 2013); da die Bahn überwiegend waagerecht verläuft (Neigung je nach Stufe ≈ 1° bis ≈ 6°), spielt das hier nur eine kleine Rolle. Im Alter sinken der Folge-Gain (Moschner & Baloh, 1994) und die maximale Blickhebung (≈ 33° statt 43°; Huaman & Sharpe, 1993); vertikale Sakkaden werden später, Aufwärtssakkaden langsamer (Bonnet et al., 2013, N = 145).
- **Gleitsicht:** Die Treppe nutzt bis zu 60 % der Bühnenbreite. Je nach Gerät und Abstand kann das den scharfen Zwischenbereich einer Gleitsichtbrille (13–18° gesamt; Han et al., 2003) übersteigen; dann erscheinen die Ränder unscharf, Kopfbewegung kann nötig werden, untere Zeilen führen Richtung Nahteil. Besser Bildschirmbrille, kleineres Fenster oder mehr Abstand; Oberkante des Bildschirms auf oder unter Augenhöhe.
- **Trockenes Auge:** Die Lidschlagrate am Bildschirm ist im Mittel auf ein Fünftel reduziert (Patel et al., 1991); Pausen einlegen.
- **Klinische Prüfung:** In der Praxis werden die Folgebewegungen qualitativ an einem nahen Ziel geprüft, das die untersuchende Person in einem „H“ führt (Muchnick, 2008, S. 32–35). Die Übung ist keine solche Prüfung und liefert keinen Befund.

## 5. Neurowissenschaftliche Grundlagen

Rund 100 ms Bewegungsinformation aus dem Bewegungsareal MT werden in eine Augenbewegung umgesetzt; gesteuert wird sie über das Folgebewegungsareal des frontalen Augenfelds und das Kleinhirn (Lisberger, 2010). Vorhersagbare Umkehr beruht auf gespeicherter Geschwindigkeit und einem „Periodizitätsschätzer“ (Barnes & Asselman, 1991); erwartete Wechsel lösen antizipatorisches Abbremsen aus, abhängig von vorherigen Durchgängen (de Hemptinne et al., 2010). riMLF und Cajal-Kern sind vor allem für vertikale **Sakkaden** und Blickhalten zuständig (Büttner-Ennever & Horn, 1997); bei vertikaler **Folgebewegung** wird der Flocculus abwärts stärker aktiviert als aufwärts (fMRT; Glasauer et al., 2009). Dass diese Übung Mittelhirn- oder Kleinhirnbahnen „stärkt“, ist nicht untersucht.

## 6. Motorische Grundlagen

Keine Handaufgabe: Gefordert sind nur Augenmuskeln und ein ruhiger Kopf; mit dem Finger wird lediglich über die Buttons unten geantwortet. Wer mit Maus oder Finger mitfährt, übt zusätzlich manuelles Tracking (vgl. 707), das hier nicht erfasst wird.

## 7. Einflussfaktoren und Messgrenzen

- **Gerät/Abstand:** Das Tempo ist in Bildschirmeinheiten festgelegt, die Winkelgeschwindigkeit hängt daher von Bildschirmgröße und Abstand ab. Touch- und Mausbedienung unterscheiden sich in Zeitbedarf und Streuung. Vergleiche nur am selben Gerät und Abstand.
- **Bildfrequenz:** Die Bewegung ist zeitbasiert. Bei 60 Hz und 15°/s verschmiert das folgende Auge das Ziel um ≈ 0,25° (Sample-and-hold, Tempo ÷ Bildfrequenz; eigene Ableitung), merklich, aber unkritisch.
- **Übungseffekt/Messung:** Periodische Bahnen werden in Minuten gelernt (McHugh & Bahill, 1985); Fortschritt spiegelt vor allem Gewöhnung an diese Bahn. Ohne Eyetracker ist die Augenbewegung nicht messbar, das Ergebnis zeigt nur das Erkennen des Zeichens. Das Alter senkt den Folge-Gain (Moschner & Baloh, 1994). Messungen am Menschen streuen von Durchgang zu Durchgang; erst mehrere Runden (Median) erlauben eine Einschätzung (Mountford et al., 2004, S. 43–44).

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel):** Besseres Folgen periodischer Bahnen nach wenigen Zyklen bzw. Minuten ist gut belegt (Barnes & Asselman, 1991; McHugh & Bahill, 1985), allerdings vor allem kurzfristig und im Labor mit Eyetracker; gleiche Einstufung wie bei der Zwillingsübung 405 und den übrigen vorhersagbaren Bahnen 402–406. Bleibende Verbesserungen gab es im Labor mit Belohnung (Gain bei kurz ausgeblendetem Ziel 0,59 → 0,89 nach 8–10 Trainingstagen; Madelain & Krauzlis, 2003) bzw. nach 2 × 6 min an drei Tagen mit quasi-zufälligem Ziel, 5 Tage später noch nachweisbar (Eibenberger et al., 2012, N = 10 + 10 Kontrollen); andere Bahnen, mit Eyetracker.
- **Naher Transfer (schwach):** Keine Studie zu dieser Bahn; kurzes Folgetraining (quasi-zufälliges Ziel) verbesserte die Folgebewegung in einem anderen Test (Step-Ramp; Eibenberger et al., 2012, N = 10), ein Laborhinweis wie bei 402–406 und 409–412/415. Lernen der Folgebewegung ist aber teils richtungsspezifisch (Affen; Kahlon & Lisberger, 1996); Übertrag auf vertikale oder unvorhersagbare Bewegung ist fraglich.
- **Alltag (fehlend):** Kein Beleg für Sport oder Verkehr; Training wirkt vor allem in der geübten Aufgabe (Simons et al., 2016).
- Erfahrungswissen aus der funktionellen Optometrie, nicht belegt: Blickfolge wird bei ruhigem Kopf geübt, und man beginnt am eigenen Arbeitspunkt und steigert in kleinen, selbst gesteuerten Schritten; die Stufen der Übung folgen diesem Vorgehen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** ruhige, vorhersagbare Blickfolge geübt werden soll (Aufbau nach 404/403, vor 410/415) und Blinkreize vermieden werden müssen; niedrige Stufen für den Einstieg.
- **Weniger passend, wenn …** gezielt vertikale Blickfolge geübt werden soll (dafür 405 – gleiche Zickzack-Mechanik, überwiegend senkrecht; mit Maus-Tracking 515) oder eine Messung der Augenbewegung gewünscht ist.
- **Vorsicht / anpassen bei …** `presbyopie_gleitsicht` (Breite und tiefe Zeilen außerhalb des scharfen Korridors → Fenster verkleinern, Bildschirmbrille); `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie` (seltenes Blinzeln → kurze Runden, Pausen; Kopfschmerz zusammen mit Sehverschlechterung ärztlich abklären lassen, Muchnick, 2008, S. 15–16, 28); `nystagmus` (Folgebewegung evtl. eingeschränkt); `schwindel_vestibulaer` (schnelles Hin und Her auf hohen Stufen → niedrige Stufe; wiederkehrender Schwindel gehört ärztlich abgeklärt, Muchnick, 2008, S. 18, 28); `kinder_unter_6` (abstrakte Aufgabe). Keine medizinischen Aussagen.
- **Photosensitivität geprüft:** kein Blinken, stetig bewegtes Ziel (wie 410–412, 415) → `flimmern_lichtreize` 0; das Zeichen erscheint einmal je Durchgang und bleibt stehen, die Kugel springt nie.
- **Kombiniert gut mit …** 405 (gleiche Mechanik mit vertauschten Achsen: senkrecht statt waagerecht – beide zusammen decken beide Hauptrichtungen ab), 406 (Dreieck), 403/404 (weichere Bahnen); danach unvorhersagbare Wechsel 415 → 410 → 411; 515, 707 (mit Hand).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Name ↔ Bahn:** Für „Höhenwechsel“ echte senkrechte Abschnitte oder eine Treppe verwenden und Auf-/Abwärts getrennt
  auswerten – sonst ehrlich „Zickzack-Blickfolge“ nennen.
- **Messung:** Ersatzaufgabe (Finger folgen, Abstand in Grad, Umkehr-Verzögerung in ms) oder Erkennungsaufgabe am
  bewegten Ziel wie „Scharf in Bewegung“; adaptives Tempo, keine Normtabellen ohne Daten.
- **Tempo in °/s** mit Abstand kalibrieren (Übungsbereich z. B. bis ≈ 60°/s als eigene, nicht belegte Festlegung; glatte Folge im Labor bis ≈ 100°/s mit ≈ 90 % Gain, Meyer et al., 1985); Hub einstellbar (±5–10°)
  für Tablet/Gleitsicht, Kopf-Modus erlauben; Umkehrzeit wahlweise fest oder leicht variiert.
- **Farbe:** hellere Standardfarbe (Rot auf Schwarz wirkt bei Protanopie dunkel; Rot-Grün-Schwäche ≈ 8 % der Männer,
  Birch, 2012); Pause jederzeit (WCAG 2.2.2).

## 11. Quellen

### Von der Website angegeben

- Rottach, K. G., Zivotofsky, A. Z., Das, V. E., Averbuch-Heller, L., DiScenna, A. O., Poonyathalang, A., & Leigh, R. J. (1996). Comparison of horizontal, vertical and diagonal smooth pursuit eye movements in normal human subjects. *Vision Research, 36*(14), 2189–2195. https://doi.org/10.1016/0042-6989(95)00302-9 – **Prüfung:** DOI stimmt ✓, Titel auf der Website falsch erweitert („…eye-head pursuit and saccades…“); **stützt die Aussage der Website:** teilweise – Gain horizontal > vertikal (N = 5); beim Start vertikal eher stärker; keine Gain-Normwerte, keine Auf-/Ab-Asymmetrie.
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242 – **Prüfung:** DOI falsch (…sp015243 gehört zu Miyashita & Nagao, 1984); richtig: https://doi.org/10.1113/jphysiol.1984.sp015242 ✓; **stützt:** teilweise – Gain < 0,95, vertikal stärker durch Hintergrund gestört (≈ 20 % vs. 10 %); zu Ecken nur: bei rautenförmiger Bahn antizipatorische Richtungsfehler; keine Aussage zu „Re-Targeting-Sakkaden“.
- Ke, S. R., Lam, J., Pai, D. K., & Spering, M. (2013). Directional asymmetries in human smooth pursuit eye movements. *Investigative Ophthalmology & Visual Science, 54*(6), 4409–4421. https://doi.org/10.1167/iovs.12-11369 – **Prüfung:** DOI falsch (…11396 gehört zu Pilch et al., 2013); richtig: https://doi.org/10.1167/iovs.12-11369 ✓; **stützt:** ja für abwärts > aufwärts; nein für die Muskel-/„Verstärkungs“-Erklärung.
- Büttner-Ennever, J. A., & Horn, A. K. E. (1997). Anatomical substrates of oculomotor control. *Current Opinion in Neurobiology, 7*(6), 872–879. https://doi.org/10.1016/S0959-4388(97)80149-3 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – getrennte Schaltkreise je Bewegungstyp; „exklusive Kontrolle“ und „Unterstimulation“ nicht belegt.
- Lisberger, S. G. (2010). Visual guidance of smooth-pursuit eye movements: Sensation, action, and what happens in between. *Neuron, 66*(4), 477–491. https://doi.org/10.1016/j.neuron.2010.03.027 – **Prüfung:** Website nennt „Visual tracking in primates“ mit falscher DOI (gehört zu Semaan & Kauffman, 2010); richtig ✓; **stützt:** ja für ≈ 100 ms Latenz; „kann Ecken nicht durchlaufen“ gilt nur für unvorhersagbare Ecken.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein – einfache Reaktionszeit, nichts zu 144-Hz-Monitoren oder „Burst-Neuronen“.

### Weitere Fachliteratur

- Barnes, G. R., & Asselman, P. T. (1991). The mechanism of prediction in human smooth pursuit eye movements. *The Journal of Physiology, 439*, 439–461. https://doi.org/10.1113/jphysiol.1991.sp018675 – Vorhersage bei periodischen/Dreieckwellen, Aufbau über 2–4 Zyklen (Crossref ✓, Abstract)
- Jarrett, C., & Barnes, G. (2005). The use of non-motion-based cues to pre-programme the timing of predictive velocity reversal in human smooth pursuit. *Experimental Brain Research, 164*(4), 423–430. https://doi.org/10.1007/s00221-005-2260-7 – antizipatorische Umkehr vs. reaktive Umkehr (Crossref ✓, Abstract)
- de Hemptinne, C., Barnes, G. R., & Missal, M. (2010). Influence of previous target motion on anticipatory pursuit deceleration. *Experimental Brain Research, 207*(3–4), 173–184. https://doi.org/10.1007/s00221-010-2437-6 – Abbremsen vor erwarteter Umkehr (Crossref ✓, Abstract)
- Soechting, J. F., Mrotek, L. A., & Flanders, M. (2005). Smooth pursuit tracking of an abrupt change in target direction: Vector superposition of discrete responses. *Experimental Brain Research, 160*(2), 245–258. https://doi.org/10.1007/s00221-004-2010-2 – Tempoabfall nach ≈ 90 ms, Richtungsänderung nach ≈ 130 ms
- de Brouwer, S., Yuksel, D., Blohm, G., Missal, M., & Lefèvre, P. (2002). What triggers catch-up saccades during visual tracking? *Journal of Neurophysiology, 87*(3), 1646–1650. https://doi.org/10.1152/jn.00432.2001 – Aufholsakkaden ≈ 125 ms
- Carl, J. R., & Gellman, R. S. (1987). Human smooth pursuit: Stimulus-dependent responses. *Journal of Neurophysiology, 57*(5), 1446–1463. https://doi.org/10.1152/jn.1987.57.5.1446 – Latenz 100 ± 5 ms
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze ≈ 100°/s
- Grönqvist, H., Gredebäck, G., & von Hofsten, C. (2006). Developmental asymmetries between horizontal and vertical tracking. *Vision Research, 46*(11), 1754–1761. https://doi.org/10.1016/j.visres.2005.11.007 – vertikal schon bei Säuglingen schwächer
- Glasauer, S., Stephan, T., Kalla, R., Marti, S., & Straumann, D. (2009). Up–down asymmetry of cerebellar activation during vertical pursuit eye movements. *The Cerebellum, 8*(3), 385–388. https://doi.org/10.1007/s12311-009-0109-5 – Flocculus abwärts stärker aktiv (Crossref ✓, Abstract)
- Bonnet, C., Hanuška, J., Rusz, J., Rivaud-Péchoux, S., Sieger, T., Majerová, V., Serranová, T., Gaymard, B., & Růžička, E. (2013). Horizontal and vertical eye movement metrics: What is important? *Clinical Neurophysiology, 124*(11), 2216–2229. https://doi.org/10.1016/j.clinph.2013.05.002 – Alterseffekte vertikaler Sakkaden, Auf-/Ab-Asymmetrie (Crossref ✓, Abstract)
- Huaman, A. G., & Sharpe, J. A. (1993). Vertical saccades in senescence. *Investigative Ophthalmology & Visual Science, 34*(8), 2588–2595. https://pubmed.ncbi.nlm.nih.gov/8325760/ – keine DOI; Blickhebung im Alter
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235 – Folge-Gain im Alter
- McHugh, D. E., & Bahill, A. T. (1985). Learning to track predictable target waveforms without a time delay. *Investigative Ophthalmology & Visual Science, 26*(7), 932–937. https://pubmed.ncbi.nlm.nih.gov/4008209/ – keine DOI; Fehler sinkt nach 100–200 s Zuschauen deutlich
- Kahlon, M., & Lisberger, S. G. (1996). Coordinate system for learning in the smooth pursuit eye movements of monkeys. *The Journal of Neuroscience, 16*(22), 7270–7283. https://doi.org/10.1523/JNEUROSCI.16-22-07270.1996 – Lernen richtungsspezifisch
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002 – Training mit Belohnung
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8 – kurzes Folgebewegungstraining
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht-Korridor 13–18°
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfergrenzen
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche ≈ 8 % der Männer
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – S. 15–16, 18, 28, 32–35: klinische Prüfung der Folgebewegungen („H-Muster“); Kopfschmerz mit Sehverschlechterung, Schwindel und andere Warnzeichen verlangen ärztliche Abklärung
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – S. 43–44: Wiederholbarkeit von Messungen am Menschen geringer als an Prüfkörpern
