---
# ===== Kennung =====
nr: 207
kennung: symbol-matching
name: "Zeichen-Code: Zeichen anhand eines Schlüssels in Zahlen übersetzen (Symbol-Zahl-Zuordnung)"
name_original: "Zahlen-Symbol-Test – Symbol-Ziffern-Zuordnungen schnell erkennen und Verarbeitungsgeschwindigkeit trainieren (Symbol Matching)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "processing-speed"
quelle_url: "https://skilldrills.online/de/drills/cognitive/processing-speed/symbol-matching"
blickfit_umsetzung: {kennung: "zeichen-code", name: "Zeichen-Code", unterschiede: "Schlüssel steht nie in der Reihenfolge der Tasten (Derangement), sodass man die Zahl wirklich ablesen muss; pro Sitzung und Stufenwechsel neu gemischt, 22 eigene abstrakte Formen statt griechischer Buchstaben. Stufen mit 3, 6 und 9 Paaren (Blöcke zu 8 Zeichen: ab 7 richtig hoch, bis 4 richtig runter). Feste Sitzung 75 s ohne Zeitbonus und ohne Combo, keine Zeitstrafe bei Fehlern, kein Timeout je Zeichen. Hauptwert richtige Zuordnungen pro Minute auf der Endstufe, dazu Treffsicherheit und Median-Zeit pro Zeichen. Ziffern 1–9 auch per Tastatur, Touch-Tasten mit Schutz vor Doppeltipp, Hinweis nach 7 s, DE/IT."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Oben steht ein Schlüssel mit 3, 6 oder 9 abstrakten Zeichen und je einer Zahl; in der Mitte erscheint ein Zielzeichen, unten tippt man die passende Zahl (oder drückt die Ziffer auf der Tastatur). Der Schlüssel steht nie in der Reihenfolge der Tasten, sodass die Zahl wirklich abgelesen werden muss, und wird bei jeder Sitzung und bei jedem Stufenwechsel neu gemischt. Gewertet wird in Blöcken zu acht Zeichen: bei mindestens sieben richtigen folgt die nächste Stufe, bei höchstens vier eine leichtere. Eine Sitzung dauert 75 Sekunden ohne Zeitbonus; Hauptwert sind die richtigen Zuordnungen pro Minute auf der Endstufe."
ziel_funktionen: [verarbeitungsgeschwindigkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 75
schwierigkeit_anpassung: "Stufe = Punkte / 1.750 + 1 (Start immer Stufe 1). Mit der Stufe sinkt die Zeit je Zeichen von 2,2 s (Stufe 1) über ≈ 1,4 s (Stufe 8) auf ≈ 0,7 s (Stufe 15); eine lange Treffer-Serie verkürzt sie um bis zu 30 %. Die Zahl der Zeichen (6) und ihre Darstellung bleiben gleich. Startzeit 45 s, jeder Treffer +2 s (max. 60 s), jeder Fehler oder jedes Zeitüberschreiten −1 s."
messgroessen: ["Original: Punkte (Bestwert im Browser), Genauigkeit in % (Treffer / (Treffer + Fehler + Zeitüberschreitungen)), Treffer, Fehler, erreichte Stufe, längste Serie", "sinnvoll ergänzt: richtige Zuordnungen pro Minute auf fester Stufe, Median-Antwortzeit je Zeichen (nur richtige), Fehler getrennt nach falscher Taste und Zeitüberschreitung, Zahl der Blicke in den Schlüssel (nur mit Eyetracker)", "Verlauf über mehrere Sitzungen (erste 1–2 als Eingewöhnung, Plateau nach ca. 8 Sitzungen erwartbar)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 3
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
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
voraussetzungen: ["Zeichen und Zahlen in kleiner Schrift erkennen: Schlüsselzeichen ≈ 0,4–0,5°, Schlüsselzahlen ≈ 0,25–0,33° (Herleitung Abschnitt 4), also Brille bzw. Lesebrille für den Bildschirmabstand tragen", "Maus oder Touchscreen (Tastatureingabe gibt es im Original nicht)", "Grundkenntnis der Ziffern 1–6; die griechischen Buchstaben müssen nicht benannt werden können", "Bereitschaft zu Zeitdruck: jedes Zeichen verschwindet nach spätestens 2,2 s und zählt dann als Fehler"]
vorsicht_bei: [sehbehinderung_niedriger_visus, presbyopie_gleitsicht, kognitive_einschraenkung, aufmerksamkeitsprobleme]
geeignet_fuer: ["Tempo beim Nachschlagen und Zuordnen üben (Legenden, Symbolfelder, Bedienfelder) und dabei die eigene Ausgangsleistung von Sitzung zu Sitzung beobachten", "kurze Konzentrationsübung (75 s) mit klarer Aufgabe und sofortiger Rückmeldung, ohne Zeitstrafe", "Einstieg in Wahlreaktions- und Suchaufgaben mit drei, sechs oder neun Alternativen (Hick-Prinzip)", "Arbeit an der Blickökonomie: Wie oft muss ich zum Schlüssel zurückschauen?"]
weniger_geeignet_fuer: ["Menschen, die ruhig und ohne Zeitdruck üben sollen (feste Dauer, steigende Stufen)", "Personen mit kleiner Sehschärfe oder ohne passende Nahbrille (die Zeichen im Schlüssel sind am kleinsten)", "Vergleich zwischen Personen oder Geräten (Alter, Bildung, Geschlecht und Gerät beeinflussen die Werte stark)", "Auswahl nach Normwerten oder als „Test“ im Sinne einer Diagnose"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Für Symbol-Zahl-Aufgaben allgemein sind Übungseffekte gut belegt (Plateau bei wöchentlichem Üben nach ca. 8 Sitzungen; Pham et al., 2021; Calamia et al., 2012), für diese Übung gibt es keine Studie. Dass Symbol-Zahl-Üben andere Fähigkeiten oder den Alltag verbessert, ist nicht gezeigt; Computertraining bei Älteren verbessert das Tempo nur klein bis mäßig (Lampit et al., 2014)."
aehnliche_uebungen: [202, 204, 103, 108, 703, 604, 205, 901]
stichworte: ["SDMT", "DSST", "Symbol-Zahl-Test", "Zahlen-Symbol-Test", "Verarbeitungsgeschwindigkeit", "Wahlreaktion", "visuelle Suche", "Zuordnung", "Schlüssel", "Legende"]
---

# 207 · Zeichen-Code: Zeichen anhand eines Schlüssels in Zahlen übersetzen (Symbol-Zahl-Zuordnung)

> Original: „Zahlen-Symbol-Test – Symbol-Ziffern-Zuordnungen schnell erkennen und Verarbeitungsgeschwindigkeit trainieren“ („Symbol Matching“) – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive`, Unterkapitel `processing-speed`) · Blickfit: Zeichen-Code

## 1. Kurzbeschreibung

Am oberen Rand steht ein Schlüssel: jedes Zeichen (aus einem Vorrat von 22 abstrakten Formen, nie Buchstaben oder Ziffern) steht über einer Zahl. In der Mitte erscheint ein einzelnes Zielzeichen; man tippt darunter die Zahl, die im Schlüssel zu diesem Zeichen gehört, oder drückt die Ziffer auf der Tastatur. Der Schlüssel steht nie in der Reihenfolge der Tasten, sodass die Zahl wirklich abgelesen werden muss und sich die Aufgabe nicht über die Position lösen lässt. Die Stufen haben 3, 6 und 9 Zeichen-Zahl-Paare; gewertet wird in Blöcken zu acht Zeichen: Bei mindestens sieben richtigen folgt die nächste Stufe mit neuem Schlüssel, bei höchstens vier richtigen eine leichtere. Eine Sitzung dauert 75 Sekunden, ohne Zeitbonus, ohne Combo und ohne Frist je Zeichen. Nach einer falschen Zahl wird die richtige Taste kurz gezeigt, dann folgt das nächste Zeichen. Hauptwert sind die richtigen Zuordnungen pro Minute auf der Stufe, auf der die Sitzung endet; dazu kommen Treffsicherheit und Median-Zeit pro Zeichen. Die Übung erinnert an den Symbol Digit Modalities Test (SDMT), ist aber eine Übung und kein Testverfahren.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Next.js-Chunk `84982-…js`, Hilfsmodule, Stand 29.09.2026; nur Mechanik
beschrieben). Grad-Werte sind eigene Umrechnungen (Tablet ≈ 36 px/° bei 40 cm; Monitor 24″ in 60 cm ≈ 39 px/°).

- **Ablauf (Code):** Start-Karte → Countdown 3-2-1-GO (0/700/1.400/2.100 ms), Beginn bei 2,45 s → Sitzung ab 45 s → Ergebnis mit Rangnote
  (Wurzel aus Punkten / 24.000). Vollbild; Escape oder Verlassen des Vollbilds bricht ohne Wertung ab.
- **Schlüssel (Code):** Sechs Zeichen aus einem Vorrat von genau sechs griechischen Großbuchstaben, **zufällig gemischt**; Zahl *i* steht immer an
  Position *i*, also stets 1–6 von links nach rechts. Die Zuordnung wechselt bei jeder Sitzung, **nicht** während der Sitzung.
- **Reiz und Antwort (Code):** Das Zielzeichen wird zufällig aus den sechs gewählt (dasselbe Zeichen kann direkt zweimal hintereinander kommen). Antwort: sechs Tasten 1–6 unten, **in derselben Reihenfolge wie der Schlüssel**.
- **Größen (Code, Schriftgrößen):** Zielzeichen 48 px (schmal) bzw. 60 px (breit) in einem Kasten von 96 bzw. 128 px (≈ 1,3–1,7° Schrifthöhe);
  Schlüsselzeichen 14 bzw. 18 px (≈ 0,4–0,5°), Schlüsselzahlen 9 bzw. 12 px (≈ 0,25–0,33°); Tasten je ca. 45–65 px breit und ≈ 45–56 px hoch
  (Leiste 320 bzw. 448 px breit). Weiß auf Schwarz, hoher Kontrast.
- **Zeit je Zeichen (Code):** Jedes Zeichen bleibt, bis man antwortet oder die Frist abläuft: 2.200 ms auf Stufe 1, dann exponentiell abnehmend
  (ca. 1.420 ms auf Stufe 8, ca. 680 ms auf Stufe 15, Untergrenze 120 ms); bei voller Combo (Faktor 3) um 30 % kürzer. Abgelaufen = Fehler,
  Combo weg, −1 s, roter Bildschirmblitz (abschaltbar), nächstes Zeichen.
- **Wertung (Code):** Treffer 100 × Combo-Faktor × (1 + 0,5 × Fortschritt); Combo-Faktor 1 (unter 3 Treffern) bis 3 (ab 50 in Folge). Stufe = Punkte / 1.750 + 1.
  **Treffer +2 s (max. 60 s), Fehler und Zeitüberschreitung −1 s.** Genauigkeit = Treffer / (Treffer + Fehler + Zeitüberschreitungen).
- **Sitzungsdauer (eigene Folgerung aus dem Code):** Wer im Schnitt schneller als 2 s pro Zeichen antwortet, gewinnt mehr Zeit, als er verbraucht;
  die Uhr bleibt dann bei 60 s. Die Sitzung endet nur durch Fehler oder Langsamkeit und ist deshalb für gute Spieler:innen beliebig lang – Punkte sind nicht
  vergleichbar. Treffer und Fehler zählen, Antwortzeiten werden **nicht** erfasst.
- **Eingabe (Code):** ein Zeiger-Ereignis (`pointerdown`, Maus oder Touch) auf den Tasten. **Keine Zifferntasten-Steuerung** (nur Escape). Zeitmessung per Bild-Schleife
  mit Zeitschritt (nicht bildfrequenzabhängig).
- **Widersprüche Text ↔ Code:** (1) Seitentext „Aktiv: −0,8 Sekunden“ bei Strafmodus, Code: 1 s, und die Strafe lässt sich im Spiel nicht abschalten. (2) Text „per Tastatur oder
  Touchpad“ (FAQ zum Ziffernfeld), Code: keine Tastaturziffern. (3) Der Text „Der Schlüssel wechselt pro Sitzung und belohnt aktives Nachschlagen statt
  Auswendiglernen“ stimmt nur halb: Weil Legende und Tasten in gleicher Reihenfolge stehen, genügt die **Position** (das Zeichen links im Schlüssel = linke Taste); man muss
  weder die Zahl lesen noch sich Paare merken. Das ist keine SDMT-Aufgabe mehr (siehe Abschnitt 3). (4) Die deutsche FAQ formuliert die Aufgabenrichtung von DSST und SDMT missverständlich
  (Abschnitt 3).

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen:** Die Übung trainiere Verarbeitungsgeschwindigkeit, visuelle Suche, Symbol-Ziffern-Gedächtnis und Auswahlreaktion; sie orientiere sich am Zuordnungsformat von SDMT und
DSST und sei „ein Übungsspiel und kein klinisches Verfahren“. Zielgruppe: Studierende, Berufstätige, Gamer. Erwachsene von 20–34 Jahren erreichten im SDMT „typischerweise 65–75 korrekte
Zuordnungen in 90 s“ (Smith, 1973; Der & Deary, 2006). Strategien: Legende früh einprägen, Chunking, wenig Augenwege. Die Verarbeitungsgeschwindigkeit nehme „leicht“ ab und lasse sich
„durch geistige und körperliche Aktivität lange erhalten“; „10 Minuten täglich fordern die Zuordnungsfähigkeit spürbar“. Tier-Tabelle von „Tier 1 Großmeister, Top 1 %“ bis „Tier 5 Einsteiger“.

**Einordnung:**
- **Belegt:** Symbol-Zahl-Aufgaben sind ein gut untersuchtes, empfindliches Maß für das Verarbeitungstempo; sie reagieren auf Alter, Müdigkeit und viele Störungen, sagen aber nicht,
  *welche* Fähigkeit betroffen ist (Jaeger, 2018). Der SDMT dauert 90 s und existiert schriftlich und mündlich (Sheridan et al., 2006; Benedict et al., 2017). Der Hinweis „kein klinisches Verfahren,
  keine Diagnose“ ist richtig und wichtig.
- **Teilweise / falsch:** (1) **Normwert 65–75:** nicht prüfbar. Smith (1973) ist ein Testmanual ohne DOI, das Normen vor allem für klinische Gruppen enthielt (Sheridan et al., 2006). Der & Deary (2006)
  untersuchen Reaktionszeiten, nicht den SDMT. Aktuelle Normen hängen stark von Alter, Geschlecht und Bildung ab (Kiely et al., 2014, n = 14.456; Strober et al., 2020). Und: **Die Punkte hier sind
  mit dem 90-s-Test nicht vergleichbar** (6 statt 9 Zeichen, Frist je Zeichen, Combo, Zeitbonus). (2) **Aufgabenrichtung:** Die deutsche FAQ schreibt, beim DSST „schreibe man Symbole zu Ziffern“, beim SDMT „ordne man Ziffern zu Symbolen zu“. Das ist knapp und missverständlich
formuliert, aber nicht eindeutig falsch; der englische Text der Seite erklärt es klar (DSST: Zahl gezeigt, Symbol gesucht; SDMT: Symbol gezeigt, Zahl gesucht, so auch die Literatur). Das Spiel selbst verlangt die SDMT-Richtung. „Feinmotorische
Einschränkungen minimieren“ stimmt nur für die mündliche Variante; hier wird getippt. (3) **„Nimmt leicht ab“:** Der Altersunterschied in Symbol-Zahl-Aufgaben ist groß (d = −2,07; Alter erklärt 86 % der Varianz in 141 Studien; Hoyer
  et al., 2004). „Lange erhalten“ ist nicht gezeigt; aerobes Training hat kleine Effekte auf Aufmerksamkeit und Tempo (g = 0,16; Smith et al., 2010). (4) „Assoziatives Gedächtnis“, „geteilte Aufmerksamkeit“: bei
  6 Zeichen in fester Anordnung eher Nebenrollen. (5) **„10 Minuten täglich … spürbar“:** ohne Quelle; Übungseffekte in der Aufgabe sind belegt, ein spürbarer Alltagseffekt nicht.
- **Tier-/Perzentiltabelle:** ohne Datengrundlage; die Website schreibt selbst, sie erhebe keine Nutzerdaten. „Top 1 %“ ist Dekoration.

## 4. Optische und okulomotorische Grundlagen

- **Zeichengröße:** Die Zeichen im Schlüssel sind etwa 30–64 px groß, das Zielzeichen 48–180 px (bei 40 cm Abstand am Tablet entspricht das grob 0,8–1,8° bzw. 1,3–5°; 1 cm entspricht etwa 1,4°). Das reicht bei voller Sehschärfe und gut korrigierter Nähe mit Reserve; ohne passende Lese- oder Bildschirmbrille (Alterssichtigkeit) werden die Zeichen im Schlüssel dennoch verwaschen. Die Formen stammen aus verschiedenen Formfamilien (höchstens eine je Familie) und sind daher gut zu unterscheiden.
- **Blickwege:** Drei Zonen: Schlüssel oben, Zielzeichen in der Mitte, Tasten unten. Weil der Schlüssel nie in der Reihenfolge der Tasten steht, muss man das Zeichen im Schlüssel suchen und die Zahl ablesen; jeder Rückblick in den Schlüssel ist ein zusätzlicher Blicksprung. Mit Übung merkt man sich einzelne Paare und schaut seltener nach oben.
- **Sehabstand:** Am Smartphone wird typisch bei etwa 32–36 cm gelesen (Bababekova et al., 2011), Presbyope halten weiter weg (etwa 40 cm; Boccardo et al., 2023): Bei gleicher Pixelgröße wird der Sehwinkel damit kleiner. Je kürzer der Abstand, desto größer der Akkommodationsaufwand: 40 cm entsprechen 2,5 dpt, 20 cm 5 dpt, 10 cm 10 dpt (Rechenregel: 100 geteilt durch den Abstand in cm).
- **Brille:** Bei Gleitsicht verteilt sich die Szene über mehrere Zonen: Schlüssel oben durch den Zwischenbereich, Tasten unten im Nahteil. Erstträger setzten in einer kleinen Studie (n = 10) mehr Kopfbewegungen ein (Hutchings et al., 2007), und die Zonenbreiten unterscheiden sich stark zwischen Designs (Sheedy, 2004). Das Gerät in Leseabstand und bequemer Höhe zu halten und den Kopf statt der Augen zu bewegen, ist meist günstiger; eine Arbeitsplatzbrille ist zu prüfen.
- **Farbe und Licht:** Die Aufgabe braucht keine Farbunterscheidung, die Zeichen unterscheiden sich in der Form. Bei einer falschen Zahl färbt sich nur die gewählte Taste kurz rot und zeigt ein Kreuz; es gibt keinen Vollbildblitz.

## 5. Neurowissenschaftliche Grundlagen

- **Verarbeitungstempo als Sammelbegriff:** Symbol-Zahl-Aufgaben kombinieren Suchen, Erkennen, Gedächtnisabruf und Antwortauswahl; deshalb erfassen sie „Tempo“ breit und unspezifisch (Jaeger, 2018). Die Theorie, dass allgemein langsamere Verarbeitung viele Alterseffekte in Denkaufgaben erklärt, stammt von Salthouse (1996).
- **Beteiligte Netzwerke (allgemein, für diese Übung nicht untersucht):** Für Orientierung der Aufmerksamkeit und Zielauswahl wird ein Netzwerk aus Parietalkortex, frontalen Regionen und Thalamus beschrieben (Posner & Petersen, 1990, Übersicht); für die Wahl unter mehreren Antworten steigt die Antwortzeit mit dem Logarithmus der Alternativenzahl (Hick-Hyman-Gesetz; Proctor & Schneider, 2018). Wie sich das auf Teile der Symbol-Zahl-Aufgabe verteilt, ist unsicher.
- **Zurückhaltung:** „Trainiert Region X“ oder „stärkt die Verbindung“ ist für diese Übung nicht belegt.

## 6. Motorische Grundlagen

- **Tippen:** Große Zahlentasten (im Querformat als Reihe, auf schmaler Bühne als Raster mit drei Spalten); die Wege sind kurz, das Fitts'sche Gesetz spielt wegen der Größe kaum eine begrenzende Rolle. Begrenzend sind Erkennen und Auswahl, nicht die Motorik. Bei der mündlichen Testvariante entfällt die Motorik weitgehend (Sheridan et al., 2006). Die Ziffern 1–9 lassen sich auch über die Tastatur eingeben.
- **Falschtipp:** Ein Schutz gegen Doppeltipps (120 ms) verhindert, dass ein versehentliches zweites Tippen als Fehler zählt.
- **Touch-Zeit:** Web-Apps messen auf Touchgeräten immer zu lang (Größenordnung 60–70 ms, Pronk et al., 2020); die Median-Zeit je Zeichen ist daher nur innerhalb desselben Geräts und derselben Eingabeart vergleichbar.

## 7. Einflussfaktoren und Messgrenzen

- **Schlüssel und Position:** Weil der Schlüssel nie in der Reihenfolge der Tasten steht, misst die Übung das Ablesen der Zahl und nicht das Finden einer Position. Er wird in jeder Sitzung und bei jedem Stufenwechsel neu gemischt, sodass man nichts über Sitzungen hinweg auswendig lernen kann (Pham et al., 2021); Parallelformen mit neu gemischtem Schlüssel sind gleich schwer (Benedict et al., 2012).
- **Stufen und Wertung:** Stufenwechsel gibt es nur nach vollen Blöcken zu acht Zeichen und nicht mehr in den letzten 20 Sekunden, damit der Hauptwert auf genügend Daten beruht. Es gibt keinen Zeitbonus, keine Combo und keine Zeitstrafe; der Hauptwert (richtige Zuordnungen pro Minute) bezieht sich auf die Endstufe, sodass die leichten Einstiegsstufen den Vergleich nicht verfälschen.
- **Alter, Geschlecht, Bildung:** Es gibt erhebliche Unterschiede (Hoyer et al., 2004; Kiely et al., 2014; Strober et al., 2020: Frauen im Mittel +5,1 Punkte im mündlichen SDMT). Deshalb kein Vergleich mit anderen Personen, nur mit sich selbst.
- **Gerät und Format:** Smartphone-Varianten des SDMT korrelieren hoch mit Papier (ICC 0,84), liegen aber im Mittel darunter (−12 %; van Oirschot et al., 2020; etwa 7,8 Punkte, Pham et al., 2021); ein iPad-Selbsttest ist zuverlässig (Rao et al., 2017). Der Zeichen-Code ist keine dieser validierten Testfassungen. Am Menschen streuen Messwerte stärker als an Prüfkörpern, und eine hohe Korrelation zweier Verfahren bedeutet noch keine Übereinstimmung; Mehrfachmessung und Mittelung sind sinnvoll (Grundsatz aus der Hornhautvermessung: Mountford et al., 2004, S. 24 und 43–44).
- **Übung:** Deutlicher Zuwachs in den ersten Sitzungen, Plateau nach etwa 8 Sitzungen (Pham et al., 2021); die Wiederholung derselben Aufgabe erzeugt Übungseffekte (Calamia et al., 2012).
- **Zuverlässigkeit:** Einzelwerte schwanken; Differenzwerte sind als Gruppenwert robust, als Einzelwert oft unzuverlässig (Hedge et al., 2018). Für Vergleiche über die Zeit eignet sich der Mittelwert mehrerer Sitzungen.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt:** stark für Symbol-Zahl-Aufgaben allgemein (Plateau nach etwa 8 Sitzungen, Pham et al., 2021); für diese Übung gibt es keine Studie.
- **Naher Transfer:** schwach. Computertraining bei gesunden Älteren verbesserte das Tempo mäßig (g = 0,31), Aufmerksamkeit und Exekutivfunktionen nicht signifikant; Gesamt-g = 0,22 (52 Studien; Lampit et al., 2014).
- **Alltag:** fehlend. Ein Effekt auf Verkehr, Beruf, Sport oder Lesen ist nicht belegt. Die Übung ist ein anschaulicher „Tempo-Spiegel“, aber kein Gesundheitstest.
- **Was als bedeutsam gilt:** In der MS-Forschung gelten etwa 4 Punkte bzw. 10 % Veränderung im SDMT als relevant (Benedict et al., 2017); das gilt für den echten Test, nicht für diese Übung.
- **Seriöse Formulierung:** „Mit etwas Übung wirst du hier schneller; nach einigen Sitzungen flacht der Fortschritt ab – das ist normal. Dass sich das auf den Alltag überträgt, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn** jemand kurz und mit klarem Ziel Tempo beim Zuordnen und Nachschlagen üben will; Profil: verarbeitungsgeschwindigkeit 3, visuelle_suche/sakkaden/entscheidung_wahlreaktion 2. Mit Tablet und passender Nahbrille gut machbar.
- **Weniger passend, wenn** kein Zeitdruck erwünscht ist, die Sehschärfe niedrig ist oder ein aussagekräftiger Vergleichswert zwischen Personen gebraucht wird.
- **Vorsicht / anpassen bei:** `sehbehinderung_niedriger_visus` (Zeichen im Schlüssel am kleinsten); `presbyopie_gleitsicht` (Blickwege über mehrere Zonen, Bildschirm in Leseabstand, Kopf statt Augen bewegen); `kognitive_einschraenkung` (mehrere Paare gleichzeitig); `aufmerksamkeitsprobleme` (fortlaufende Zeichen unter Zeitdruck, neuer Schlüssel bei jedem Stufenwechsel; kann ermüden oder frustrieren). Keine Aussage zur Eignung im medizinischen Sinn; kein Test, keine Diagnose.
- **Warnzeichen:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung oder neu auftretender Schwindel gehören ärztlich abgeklärt (Aufzählung der Warnsymptome in der Anamnese: Muchnick, 2008, S. 6, 17 und 28); ein Übungsprogramm ersetzt das nicht.
- **Kombiniert gut mit:** 202 (Wahlreaktion), 204 (geordnetes Suchen), 103 (visuelle Suche), 604 (N-Back, Arbeitsgedächtnis), 901 (ruhige Denkübung ohne Zeitdruck als Ausgleich).
- **Abgrenzung in der Gruppe:** 207 verlangt Nachschlagen im Schlüssel und Zuordnen (Verarbeitungstempo 3); 204 geordnetes Suchen ohne Entscheidung; 202 die Wahl nach Pfeilrichtung.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Was Blickfit anders macht (Zeichen-Code, `src/exercises/zeichen-code/`):** Oben steht der Schlüssel (Zeichen über Zahl), in der Mitte das gesuchte Zeichen, unten die Zahlentasten 1 … n. Der Schlüssel steht **nie** in der Reihenfolge der Tasten
(zufällige Anordnung ohne Übereinstimmung), sodass die Zahl wirklich abgelesen werden muss; er wird jede Sitzung und bei jedem Stufenwechsel neu gemischt, mit Zeichen aus einem Vorrat von 22 abstrakten Formen (nie Buchstaben oder Ziffern). Stufen mit 3, 6 und 9 Paaren
(Hick-Prinzip), gewertet in Blöcken zu 8 Zeichen: ≥ 7 richtig → nächste Stufe, ≤ 4 richtig → leichter; in den letzten 20 s kein Stufenwechsel. Feste Sitzung 75 s ohne Zeitbonus (Pham et al., 2021: Zuverlässigkeit steigt danach kaum), keine Combo, keine Zeitstrafe (falsche Taste: kurz rot, richtige Taste
kurz markiert). Kein Timeout je Zeichen. Hauptwert: richtige Zuordnungen pro Minute auf der Endstufe; dazu Treffsicherheit und Median-Zeit (nur richtige). Reizbeginn = erster Frame, in dem das Zeichen gezeichnet ist; kein direkter Wiederholer. Ziffern 1–9 auch per Tastatur; Doppeltipp-Schutz (120 ms); Hinweis nach 7 s. Symbole ≈ 30–64 px im Schlüssel, Zielzeichen 48–180 px. DE/IT.

**Schwächen des Originals:**
- **Rein räumlich lösbar** (gleiche Reihenfolge von Schlüssel und Tasten) – kein SDMT im Sinne der Literatur; nur sechs Paare; Zeichen ohne Namensbezug.
- Zeitstrafe (1 s statt genannter 0,8 s) nicht abschaltbar; Zeitbonus verlängert die Sitzung, Combo verkürzt die Frist; keine Antwortzeiten, keine Fehlerarten; Genauigkeit mit Zeitüberschreitungen vermischt.
- Schlüssel sehr klein (Zahlen ≈ 9–12 px); Rückmeldung nur als roter Blitz; keine Tastaturziffern, obwohl im Text erwähnt; Aufgabenrichtung DSST/SDMT in der deutschen FAQ missverständlich formuliert.
- Normwerte (65–75) und Tier-Tabelle ohne Datengrundlage; Behauptungen zu Transfer und „lange erhalten“ übertrieben.
- Für Tablets: Schlüsselzeichen ≥ 1,5°, Zahlen mindestens so groß wie die Zeichen, Tasten ≥ 44 px, keine Zeitstrafe, feste Dauer, Rückmeldung nicht nur über Farbe; Tastatursteuerung ergänzen, Blitz optional.

## 11. Quellen
### Von der Website angegeben
- Smith, A. (1973). *Symbol Digit Modalities Test (SDMT) manual*. Western Psychological Services (Testmanual; meist zitiert als Smith, 1982, revidierte Auflage). – **Prüfung:** Buch/Testmanual, **keine DOI**; Existenz über Verlagsangaben und Zitate (Sheridan et al., 2006) bestätigt, Inhalt nicht eingesehen; **stützt die Aussage der Website:** teilweise („Maß für Verarbeitungstempo, 90 s“ ja; Norm „65–75 richtige in 90 s“ nicht prüfbar) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – **Prüfung:** DOI stimmt ✓ (Crossref); **stützt die Aussage der Website (SDMT-Normen):** nein (Studie zu einfacher und Wahl-Reaktionszeit, enthält keinen SDMT)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** kein konkreter Bezug im Seitentext (Studie: einfache Reaktionszeit n = 1.469, 60-Hz-LCD, keine Symbol-Zahl-Aufgabe) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- *Ohne Quelle:* „Verarbeitungstempo nimmt leicht ab, lässt sich lange erhalten“; „10 Minuten täglich fordern spürbar“; „Elite/Top 1 %“; „Ziffern statt Symbole schreiben minimiert feinmotorische Einschränkungen“ – **teilweise/nicht belegt** (siehe Abschnitt 3). – Aussagen ohne Quelle, nur in der Arbeitsfassung; **stützt (öffentliche Fassung):** nein

### Weitere Fachliteratur
- Bababekova, Y., Rosenfield, M., Hue, J. E., & Huang, R. R. (2011). Font size and viewing distance of handheld smart phones. *Optometry and Vision Science, 88*(7), 795–797. https://doi.org/10.1097/OPX.0b013e3182198792 – Sehabstand am Smartphone – **Prüfung:** Crossref ✓, Abstract gelesen
- Benedict, R. H. B., DeLuca, J., Phillips, G., LaRocca, N., Hudson, L. D., Rudick, R., & Multiple Sclerosis Outcome Assessments Consortium. (2017). Validity of the Symbol Digit Modalities Test as a cognition performance outcome measure for multiple sclerosis. *Multiple Sclerosis Journal, 23*(5), 721–733. https://doi.org/10.1177/1352458517690821 – Validität als Tempo-Maß, ~4 Punkte bzw. 10 % – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Benedict, R. H. B., Smerbeck, A., Parikh, R., Rodgers, J., Cadavid, D., & Erlanger, D. (2012). Reliability and equivalence of alternate forms for the Symbol Digit Modalities Test: Implications for multiple sclerosis clinical trials. *Multiple Sclerosis Journal, 18*(9), 1320–1325. https://doi.org/10.1177/1352458511435717 – Parallelformen gleich schwer – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947 – Sehabstand nach Alter – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/02
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist, 26*(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Übungseffekte bei Wiederholung – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04 und nur allgemein zitiert
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods, 50*(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Hoyer, W. J., Stawski, R. S., Wasylyshyn, C., & Verhaeghen, P. (2004). Adult age and digit symbol substitution performance: A meta-analysis. *Psychology and Aging, 19*(1), 211–214. https://doi.org/10.1037/0882-7974.19.1.211 – Alterseffekt d = −2,07, 141 Studien – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics, 27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Gleitsicht, mehr Kopfbewegung – **Prüfung:** Crossref ✓, Abstract gelesen
- Jaeger, J. (2018). Digit Symbol Substitution Test: The case for sensitivity over specificity in neuropsychological testing. *Journal of Clinical Psychopharmacology, 38*(5), 513–519. https://doi.org/10.1097/JCP.0000000000000941 – empfindlich, aber unspezifisch – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Kiely, K. M., Butterworth, P., Watson, N., & Wooden, M. (2014). The Symbol Digit Modalities Test: Normative data from a large nationally representative sample of Australians. *Archives of Clinical Neuropsychology, 29*(8), 767–775. https://doi.org/10.1093/arclin/acu055 – Normen nach Alter, Geschlecht, Bildung – **Prüfung:** n = 14.456; Crossref ✓, Abstract gelesen
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine, 11*(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – Tempo g = 0,31, Gesamt g = 0,22 – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Streuung am Menschen, Korrelation ist keine Übereinstimmung (S. 24, 43–44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnsymptome des Auges und neurologische Warnzeichen (S. 6, 17, 28)
- Pham, L., Harris, T., Varosanec, M., Morgan, V., Kosa, P., & Bielekova, B. (2021). Smartphone-based symbol-digit modalities test reliably captures brain damage in multiple sclerosis. *npj Digital Medicine, 4*, 36. https://doi.org/10.1038/s41746-021-00401-y – neu gemischter Schlüssel, 75 s, Plateau nach ca. 8 Sitzungen – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience, 13*, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – Aufmerksamkeitsnetzwerke, keine SDMT-Daten – **Prüfung:** Crossref ✓, Volltext laut Literaturbasis W02 gelesen
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology, 71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Wahl-RT und Alternativenzahl – **Prüfung:** Crossref ✓, Abstract gelesen
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitgenauigkeit Touch – **Prüfung:** Crossref ✓, Abstract gelesen
- Rao, S. M., Losinski, G., Mourany, L., Schindler, D., Mamone, B., Reece, C., Kemeny, D., Narayanan, S., Miller, D. M., Bethoux, F., Bermel, R. A., Rudick, R., & Alberts, J. (2017). Processing speed test: Validation of a self-administered, iPad-based tool for screening cognitive dysfunction in a clinic setting. *Multiple Sclerosis Journal, 23*(14), 1929–1937. https://doi.org/10.1177/1352458516688955 – iPad-Selbsttest zuverlässig, eng mit SDMT verbunden – **Prüfung:** Crossref ✓, PubMed-Abstract gelesen
- Salthouse, T. A. (1996). The processing-speed theory of adult age differences in cognition. *Psychological Review, 103*(3), 403–428. https://doi.org/10.1037/0033-295X.103.3.403 – Verarbeitungstempo und Altersunterschiede – **Prüfung:** Crossref ✓; nur Metadaten, Standardreferenz
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry, 75*(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Gleitsichtdesigns, Zonenbreiten – **Prüfung:** Crossref ✓, Abstract gelesen
- Sheridan, L. K., Fitzgerald, H. E., Adams, K. M., Nigg, J. T., Martel, M. M., Puttler, L. I., Wong, M. M., & Zucker, R. A. (2006). Normative Symbol Digit Modalities Test performance in a community-based sample. *Archives of Clinical Neuropsychology, 21*(1), 23–28. https://doi.org/10.1016/j.acn.2005.07.003 – SDMT-Normen, Manual, mündliche Variante – **Prüfung:** Crossref ✓, Abstract gelesen
- Smith, P. J., Blumenthal, J. A., Hoffman, B. M., Cooper, H., Strauman, T. A., Welsh-Bohmer, K., Browndyke, J. N., & Sherwood, A. (2010). Aerobic exercise and neurocognitive performance: A meta-analytic review of randomized controlled trials. *Psychosomatic Medicine, 72*(3), 239–252. https://doi.org/10.1097/PSY.0b013e3181d14633 – aerobes Training, kleine Effekte (Crossref ✓, Abstract gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Strober, L. B., Bruce, J. M., Arnett, P. A., Alschuler, K. N., Lebkuecher, A., Di Benedetto, M., Cozart, J., Thelen, J., Guty, E., & Roman, C. (2020). A new look at an old test: Normative data of the symbol digit modalities test – Oral version. *Multiple Sclerosis and Related Disorders, 43*, 102154. https://doi.org/10.1016/j.msard.2020.102154 – Normen mündlich, Frauen +5,1 Punkte – **Prüfung:** Crossref ✓, Abstract gelesen
- van Oirschot, P., Heerings, M., Wendrich, K., den Teuling, B., Martens, M. B., & Jongen, P. J. (2020). Symbol Digit Modalities Test variant in a smartphone app for persons with multiple sclerosis: Validation study. *JMIR mHealth and uHealth, 8*(10), e18160. https://doi.org/10.2196/18160 – Smartphone vs. Papier, ICC 0,84, −12 % – **Prüfung:** Crossref ✓, Inhalt aus docs/wissenschaft/04
- World Wide Web Consortium (W3C). (2024, 12. Dezember). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation). https://www.w3.org/TR/WCAG22/ – Webdokument, keine DOI; Blitzgrenze 3/s, Mindestgröße Touch-Ziele (Erfolgskriterien 2.3.1, 2.5.5, 2.5.8 laut Literaturbasis W02 im Originaltext gelesen) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
