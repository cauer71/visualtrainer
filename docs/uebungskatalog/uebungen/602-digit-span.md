---
# ===== Kennung =====
nr: 602
kennung: digit-span
name: "Zahlenspanne (Ziffernfolgen merken)"
name_original: "Zahlenspanne-Test – Zahlenfolgen merken (Digit Span Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "short-term-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span"
blickfit_umsetzung: {kennung: "zahlenspanne", name: "Zahlenspanne", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/zahlenspanne/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Ziffern erscheinen nacheinander, etwa eine pro Sekunde; danach tippt man die Folge aus dem Gedächtnis in derselben Reihenfolge auf einem Zahlenfeld ein. Jede richtige Folge wird um eine Ziffer länger, jeder Fehler macht sie um eine Ziffer kürzer."
ziel_funktionen: [kurzzeitgedaechtnis_verbal]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Adaptive 1-up/1-down-Treppe je Durchgang (Code): Start mit 3 Ziffern, richtig → +1 Ziffer (max. 15) und Anzeigedauer −100 ms (min. 800 ms), falsch oder Zeitüberschreitung → −1 Ziffer (min. 3) und Anzeige +200 ms (max. 2.500 ms). Eingabefenster 8 s. Keine manuellen Einstellungen."
messgroessen: ["Punkte (100 × (1 + 0,1 × (Länge − 3)) je richtiger Folge)", "Länge am Rundenende (angezeigt als 'Spanne'/'Peak Digit Span')", "Trefferquote richtiger Folgen", "sinnvoll: längste fehlerfrei wiedergegebene Folge", "sinnvoll: mittlere Spanne (50-%-Punkt der Treppe) über mehrere Runden"]

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
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 3
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 0
    zielbewegung_praezision: 0
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 1
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Ziffern 0–9 sicher lesen und benennen können", "Ziffern in 30–60 cm Abstand schnell scharf sehen (bei Alterssichtigkeit passende Nahkorrektur)", "Touch-Ziffernfeld, Maus oder Zifferntasten; keine Farbunterscheidung nötig"]
vorsicht_bei: [lese_rechtschreib_schwaeche, aufmerksamkeitsprobleme, kognitive_einschraenkung, sehbehinderung_niedriger_visus, kinder_unter_6, migraene_lichtempfindlich, photosensitive_epilepsie]
geeignet_fuer: ["kurzes, spielerisches Üben des Merkens von Ziffernfolgen (Material ähnlich wie Telefon- oder PIN-Nummern; ein Alltagsnutzen ist nicht belegt)", "Merkstrategien ausprobieren: Gruppieren in 2er-/3er-Blöcke, inneres Mitsprechen", "sitzende, ruhige Übung ohne Bewegungsreize, gut am Tablet (weich ein- und ausgeblendete Ziffern, kein Blitzen)", "Selbstvergleich über Wochen auf demselben Gerät"]
weniger_geeignet_fuer: ["Einschätzung der 'Gedächtnisleistung' oder Vergleich mit Normen/IQ-Werten (nicht normiert, keine Diagnose)", "Arbeitsgedächtnis im engeren Sinn (Umordnen, Rückwärts): rückwärts gibt es nur wenige Runden und erst nach längeren Vorwärts-Folgen", "Menschen, denen die feste Anzeigedauer von etwa einer Sekunde je Ziffer zu knapp ist", "Menschen mit geringem Visus oder Leseschwäche (die Anzeigedauer lässt sich nicht verlängern, es gibt keine Vorlesefunktion)"]
evidenz:
  uebungseffekt: stark
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Spannenaufgaben verbessern sich mit Übung und Strategie deutlich (Zahlenspanne 7 → 79 Ziffern nach > 230 h Mnemonik-Training, Ericsson et al. 1980); Transfer tritt vor allem bei gleicher Aufgabenstruktur auf und ist beim verbalen seriellen Erinnern schwach (Gathercole et al. 2019); fernen oder Alltagstransfer zeigen Metaanalysen mit aktiven Kontrollgruppen nicht (Melby-Lervåg et al. 2016; Owen et al. 2010)."
aehnliche_uebungen: [606, 601, 604, 607, 603, 605, 207, 203]
stichworte: ["Zahlenspanne", "digit span", "Ziffernfolge", "verbales Kurzzeitgedächtnis", "phonologische Schleife", "serielles Erinnern", "Chunking", "Gruppieren", "adaptive Treppe", "1-up/1-down", "Ziffernfeld", "Zeitdruck"]
---

# 602 · Zahlenspanne (Ziffernfolgen merken)

> Original: „Zahlenspanne-Test – Zahlenfolgen merken“ („Digit Span Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory`, Unterkapitel `short-term-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Auf dunklem Grund erscheinen große weiße Ziffern nacheinander an derselben Stelle, etwa eine pro Sekunde, und werden weich ein- und ausgeblendet. Danach gibt man die Folge in derselben Reihenfolge über ein großes Zahlenfeld mit Löschen- und Bestätigen-Taste ein. Die Folgen sind zufällig, ohne Wiederholung einer Ziffer direkt hintereinander und ohne Zahlenmuster wie 1-2-3. Richtig → die nächste Folge ist eine Ziffer länger, falsch → eine kürzer; die Länge reicht von 3 bis 12 Ziffern. Eine Sitzung besteht aus sieben Runden vorwärts; gelingt dabei eine Folge mit mindestens sechs Ziffern, folgen am Ende zwei Runden rückwärts. Es gibt kein Zeitlimit für die Eingabe.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `1539-…js`, Stand 29.09.2026); nur Mechanik beschrieben.

- **Darbietung (Code):** Die ganze Folge steht **gleichzeitig** als eine Zeile da (Monospace, weiß; Schriftgröße
  max(32, 72 − 3 × Länge) px, also 63 px bei 3 und 32 px ab 14 Ziffern). Sie wird nicht Ziffer für Ziffer gezeigt oder
  vorgelesen. Ziffern 0–9 zufällig mit Zurücklegen; Wiederholungen und Muster („1 2 3“) sind möglich.
- **Anzeigedauer (Code):** Start 2.500 ms; −100 ms je Treffer (min. 800 ms), +200 ms je Fehler (max. 2.500 ms). Der
  Regeltext nennt eine „3-sekündige Präsentationsphase“ – **Widerspruch**.
- **Eingabe (Code):** Bildschirmfeld 3 × 3 mit **1-2-3 oben**, darunter Löschen, 0, Bestätigen; reagiert beim Aufsetzen
  (`pointerdown`). Alternativ Zifferntasten, Rück-/Eingabetaste. Max. 15 Zeichen; nach **8 s** ohne Bestätigen = Fehler.
- **Wertung (Code):** Nur exakt richtige Folgen zählen („Alles oder nichts“; der berechnete Editierabstand wird nur auf 0
  geprüft). Punkte je Treffer 100 × (1 + 0,1 × (Länge − 3)): 100 bei 3, 220 bei 15 Ziffern = „bis +120 %“. Fehler kosten
  keine Punkte (wie im Regeltext). Treppe 1-up/1-down zwischen 3 und 15 Ziffern. Die 45-s-Uhr läuft auch während Anzeige,
  Eingabe und Pausen (0,8 s nach Treffer, 1,0 s nach Fehler). Bei jedem Fehler und jeder Zeitüberschreitung erscheint
  ein roter Schimmer über der Spielfläche (zur Mitte hin Rot mit 50 % Deckkraft, blendet in 0,45 s aus; Schalter
  „Miss Flash“, standardmäßig an) – derselbe Effekt wie in den übrigen Gedächtnisübungen 601–607; der Regeltext nennt ihn nicht.
- **„Spanne“/„Peak Digit Span“ (Code):** Angezeigt und lokal gespeichert wird die **Länge beim Rundenende** – weder die
  längste richtige Folge noch der Höchstwert der Runde. Endnote S+ bis F aus 100 × √(Punkte/1.300).
- **Obergrenze durch die Rundenzeit (Herleitung):** Bei ≈ 0,35 s pro Tipp dauert ein fehlerfreier Durchgang ≈ 4,7–5,0 s
  (3 Ziffern) bis 6,2–6,5 s (9 Ziffern). In 45 s gelingen fehlerfrei nur ≈ 7–8 Folgen bis **9–10 Ziffern** (910–1.080
  Punkte, Note A bis S); die Note S+ (≥ 1.173 Punkte = 9 Treffer) ist praktisch unerreichbar, Spannen „12+“ ebenso. Weil
  die angezeigte „Spanne“ die Länge beim Rundenende ist, steht nach 7 fehlerfreien Folgen (längste richtige: 9) schon
  **10** da – der Wert liegt oft 1 über der längsten richtigen Folge. Das Ergebnis enthält **Tipptempo**.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt die Übung einen „Goldstandard“ aus WAIS und Klinik, verspricht ein „erweitertes“ Kurzzeitgedächtnis,
schnellere visuelle Verarbeitung und Vorteile für Konzentration, Mathematik und Studium (Zielgruppen: Schüler:innen,
Studierende, Berufstätige, Eignungstest-Kandidat:innen). Eine Tabelle ordnet Spannen Perzentilen und „WAIS-Skalenwerten“
zu („9–12+ Ziffern = Top 1 %, Skalenwert 16–19“) samt „Klicktakt“ < 350 bis > 950 ms.

- **Belegt:** Die Zahlenspanne ist ein altes Verfahren (Jacobs, 1887). Die Spanne liegt bei Erwachsenen um 7 ± 2
  Einheiten (Miller, 1956). Computerisiert und gehört lag der Median der mittleren Spanne bei 6,45 Ziffern (92 % zwischen 5 und 7;
  n = 763, 18–65 J.; Woods et al., 2011). Gruppieren hilft (Miller, 1956; Ryan, 1969).
- **Überzogen:** „Strikt 4 ± 1“, „zwingend Chunking“ (Cowan beschreibt Randbedingungen). Die „2-s-Zerfallszeit“ stammt
  aus Baddeley et al. (1975). Rhythmus-, Primacy- und Recency-Tipps setzen eine **serielle, gehörte** Darbietung voraus –
  das Original zeigt alle Ziffern auf einmal.
- **Nicht belegt:** Die Tabelle hat keine Datengrundlage (die Seite sammelt nach eigener Aussage keine Daten). Ein
  WAIS-Skalenwert ist altersnormiert und beruht auf mehreren Teilaufgaben, nicht auf der Vorwärtsspanne einer 45-s-Runde.
  Klicktakte sind geräteabhängig: Touch misst 58–70 ms zu lang (Pronk et al., 2020). „Konvergiert exakt auf deine
  Spanne“: Eine 1-up/1-down-Treppe schwankt um den 50-%-Punkt (Levitt, 1971); 7–9 Durchgänge sind nur eine grobe Schätzung.
- **Nicht im Spiel:** Die FAQ erklärt die Rückwärtsspanne, das Spiel hat nur vorwärts. Transfer auf Konzentration oder
  Studium ist nicht belegt (Abschnitt 8).

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Die Ziffern sind groß und erscheinen einzeln in der Bildmitte. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Eine Sehschärfe von 1,0 braucht für Zeichen eine Höhe von etwa 0,08°; die Sehschärfe begrenzt die Leistung deshalb kaum. Bei Unschärfe (fehlende Nahkorrektur) werden Ziffern wie 3/8 oder 6/9 aber leichter verwechselt, und das Erkennen dauert länger.
- **Blick:** Weil die Ziffern nacheinander an derselben Stelle erscheinen, braucht das Einprägen keine Blicksprünge; der Blick bleibt in der Bildmitte. Beim Eingeben springt er zwischen Anzeigebereich und Zahlenfeld (kleine Sakkaden).
- **Anzeigezeit pro Ziffer:** Jede Ziffer steht etwa eine Sekunde lang da (weich eingeblendet, gut 0,5 s voll sichtbar, weich ausgeblendet). Das ist deutlich länger, als das Erfassen einer einzelnen Ziffer braucht (beim Lesen dauert eine Fixation im Mittel etwa 225 ms; Rayner, 1998); begrenzend ist das Behalten, nicht das Ablesen.
- **Brille:** Am Tablet blickt man durch den Nahteil; Anzeige und Zahlenfeld liegen zentral, die seitliche Unschärfe von Gleitsichtgläsern (Sheedy, 2004) stört kaum. Am Monitor in 60–70 cm Abstand ist eine Arbeitsplatzbrille günstiger. Ab etwa 40 Jahren reicht die Akkommodation für Naharbeit ohne Nahkorrektur oft nicht (Charman, 2008).
- **Lichtreize:** Kein Farbsehen nötig, keine Bewegungsreize. Die Ziffern blenden mit etwa 1 Hz weich ein und aus, ohne Vollbild-Schimmer und ohne rotes Aufleuchten bei Fehlern; das liegt weit unter 3 Blitzen pro Sekunde (WCAG 2.2, SC 2.3.1). Am stärksten provozierend sind 15–25 Hz, gesättigtes Rot gilt als Zusatzfaktor (Fisher et al., 2005). Sitzungen sind kurz; bei trockenem Auge trotzdem Pausen einlegen, da der Lidschlag am Bildschirm sinkt (Tsubota & Nakamori, 1993).

## 5. Neurowissenschaftliche Grundlagen

- **Phonologische Schleife:** Gelesene Ziffern werden innerlich in Laute umgesetzt und durch stilles Mitsprechen aufgefrischt (Baddeley & Hitch, 1974). Bei visueller Darbietung hebt artikulatorische Unterdrückung den Wortlängeneffekt auf – die Umkodierung läuft über das innere Sprechen (Baddeley et al., 1975).
- **Kapazität:** Die Zahlenspanne ist ein altes Verfahren (Jacobs, 1887). Die Spanne liegt bei Erwachsenen um 7 ± 2 Einheiten (Miller, 1956); computerisiert und gehört lag der Median der mittleren Spanne bei 6,45 Ziffern (92 % zwischen 5 und 7; n = 763, 18–65 Jahre; Woods et al., 2011). Wenn Wiederholen und Gruppieren verhindert sind, bleiben etwa drei bis fünf Einheiten (Cowan, 2001). Gruppieren hilft (Miller, 1956; Ryan, 1969).
- **Hirnregionen:** Phonologischer Speicher im linken Gyrus supramarginalis, Mitsprechen im Broca-Areal (PET, visuell gezeigte Buchstaben; Paulesu et al., 1993). Dass die Übung diese Regionen „trainiert“, ist nicht belegt.
- **Langzeitwissen:** Die Spanne misst auch gelernte Ziffernkombinationen (Jones & Macken, 2015). Deshalb enthalten die Folgen keine auffälligen Muster wie Dreierreihen mit gleichem Abstand. Ein vertrautes Tastenfeld-Layout hilft beim Behalten, wenn es im Langzeitgedächtnis verankert ist (Darling et al., 2012).
- **Visuelle Anteile:** Die Ziffern erscheinen einzeln und nacheinander, es steht also kein Gesamtbild der Folge da, das man visuell festhalten könnte. Der visuelle Anteil dürfte klein sein (für diese Darbietung nicht untersucht).

## 6. Motorische Grundlagen

- Kurze Fingersequenz auf einem vertrauten Zahlenfeld mit großen Tasten (mindestens 56 Pixel, am Tablet deutlich größer; als Mindestgröße für Daumenziele werden etwa 9 mm genannt, Parhi et al., 2006). Präzision begrenzt nicht.
- Die Eingabe wird erst mit der Bestätigen-Taste gewertet, mit Löschen lässt sich korrigieren; ein versehentlicher Tipp beendet die Runde also nicht. Weil es kein Zeitlimit gibt, bringen schnelle Finger keinen Vorteil.
- Das Zahlenfeld hat die Anordnung eines Telefons (1-2-3 oben), der Nummernblock einer Tastatur hat 7-8-9 oben. Wer Tastenwege als Merkhilfe nutzt, sollte beim selben Gerät bleiben (Herleitung aus Darling et al., 2012).

## 7. Einflussfaktoren und Messgrenzen

- **Wenige Durchgänge:** Eine Sitzung hat sieben Folgen vorwärts. Computerisiert mit 14 Durchgängen lag die Retest-Korrelation der mittleren Vorwärtsspanne bei **0,67**, der klassischen Zwei-Fehler-Regel nur bei **0,39** (rückwärts 0,84 bzw. 0,67; n = 30, drei Sitzungen; Woods et al., 2011). Einzelne kurze Sitzungen schwanken also deutlich; eine 1-auf/1-ab-Treppe schwankt zudem um den 50-%-Punkt (Levitt, 1971). Allgemein streuen Messungen am Menschen; aussagekräftiger als ein Einzelwert ist der Verlauf über mehrere Sitzungen, etwa als Median (zum Grundsatz der Wiederholmessung: Mountford et al., 2004, S. 44).
- **Merken statt Tempo:** Es gibt kein Zeitlimit; die Tippgeschwindigkeit geht nicht in den Wert ein. Gewertet wird die längste richtig eingegebene Folge, dazu die Zahl der richtigen Folgen und der richtig erinnerten Ziffern.
- **Rückwärts-Runden:** Rückwärts eingeben verlangt zusätzlich, die Folge im Kopf umzuordnen. Diese Runden folgen erst, wenn vorwärts längere Folgen gelingen, und beginnen etwas kürzer; ihr Wert ist mit dem Vorwärtswert nicht vergleichbar.
- **Sprache:** Längere Zahlwörter verkleinern die Spanne (Ellis & Hennelly, 1980). Ziffernnamen 0–9: deutsch 11, italienisch 18 Silben → beim Mitsprechen auf Italienisch ist eine etwas kleinere Spanne zu *erwarten* (Herleitung, für DE/IT nicht direkt untersucht). Nur innerhalb einer Sprache vergleichen.
- **Alter und Bildung:** In Woods et al. (2011) hing die Vorwärtsspanne bei 18–65 Jahren kaum vom Alter ab (r = −0,02 bis −0,07); italienische Normen (20–90 Jahre) zeigen Alters- und Bildungseffekte (Monaco et al., 2013). Wer langsamer erfasst, hat bei einer festen Anzeigedauer von etwa einer Sekunde je Ziffer weniger Spielraum.
- **Modalität:** Normen stammen meist aus gehörten Folgen (etwa 1 Ziffer pro Sekunde); gesehene Folgen sind damit nicht ohne Weiteres vergleichbar (Woods et al., 2011, verweisen auf Modalitätsunterschiede).
- **Übung, Müdigkeit:** Wiederholtes Testen hebt Werte (Calamia et al., 2012); Schlafmangel senkt die Kurzzeitgedächtnisleistung (Lim & Dinges, 2010). Sinnvoll ist nur der Vergleich mit sich selbst auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Mit Mnemonik stieg die Zahlenspanne einer Person nach über 230 Stunden von 7 auf 79 Ziffern (Ericsson et al., 1980); auch im Online-Training wurden alle geübten Aufgaben besser (Owen et al., 2010). Das meiste ist **Strategie**, nicht größere Grundkapazität.
- **Naher Transfer – schwach:** Transfer zeigt sich vor allem bei gleicher Aufgabenstruktur und ist beim verbalen seriellen Erinnern schwächer als beim visuell-räumlichen (Gathercole et al., 2019).
- **Alltagstransfer – fehlend:** Gegen behandelte Kontrollgruppen gibt es keinen fernen Transfer auf Intelligenz, Lesen oder Rechnen (Melby-Lervåg et al., 2016). Bei Owen et al. (2010) stieg die Zahlenspanne der Gedächtnis-Trainingsgruppe nach 6 Wochen um 0,03 Ziffern, die der Kontrollgruppe ohne Gedächtnistraining um 0,2 Ziffern.

## 9. Auswahlhinweise

- **Passt, wenn …** jemand kurz und ruhig Ziffernfolgen merken oder Gruppierstrategien ausprobieren möchte; ohne Bewegungs- oder Farbreize; am Tablet mit Touch.
- **Weniger passend, wenn …** Arbeitsgedächtnis im engeren Sinn geübt werden soll (→ 604); die Anzeigedauer von etwa einer Sekunde je Ziffer zu knapp ist; eine Leistungs- oder Gedächtnis-„Einstufung“ erwartet wird (keine Normen, keine Diagnose).
- **Vorsicht / anpassen bei …** `lese_rechtschreib_schwaeche` (Kurzzeitgedächtnisnachteil d ≈ −0,61, besonders bei Ziffernfolgen; Swanson et al., 2009; die Anzeigedauer lässt sich nicht verlängern); `aufmerksamkeitsprobleme` (ein kurzes Abschweifen während der Anzeige kostet die Runde); `kognitive_einschraenkung` (Alles-oder-nichts-Wertung, keine Test-Anmutung); `sehbehinderung_niedriger_visus` (Ziffern müssen sicher erkannt werden); `kinder_unter_6` (Ziffernkenntnis); `migraene_lichtempfindlich`, `photosensitive_epilepsie` (weich ein- und ausgeblendete Ziffern, kein Blitzen, kein rotes Aufleuchten; vorsorglich gelistet; bei Beschwerden abbrechen). Bei Alterssichtigkeit mit passender Nahkorrektur üben. Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen; die Übung ist weder Test noch Diagnose.
- **Kombiniert gut mit …** 606 (Wortliste), 607 (Corsi-Pfad als räumliches Gegenstück), 604 (N-Back), 601 (Farbfolge), 207 (Zahlen-Symbol-Tempo).
- **Abgrenzung in der Gruppe (keine Dublette):** Am nächsten verwandt ist 606. Beide verlangen das Behalten einer Liste, werten nach „Alles oder nichts“ und haben eine 1-auf/1-ab-Treppe. 602 verlangt aber die **Reihenfolge** und ein Zahlenfeld, 606 **freie Reihenfolge** und Tippen ganzer Wörter; Lesen und Schreiben fallen bei 602 weg. 601 hat denselben Ablauf (Folge merken, in Reihenfolge nachtippen) mit Farben und Symbolen, 607 mit Orten; 604 fordert statt Behalten das laufende Aktualisieren.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Anzeige wählbar: seriell (≈ 1 Ziffer/s, optional gesprochen auf DE/IT) oder gleichzeitig.
- Runde nach Durchgängen (z. B. 12–14) statt nach Zeit; Eingabelimit großzügig oder abschaltbar.
- Messgrößen: längste richtige Folge und mittlere Spanne (Woods et al., 2011) statt Länge beim Rundenende; keine Tier-,
  Perzentil- oder WAIS-Tabelle.
- Optional rückwärts (dann `arbeitsgedaechtnis` höher). Anzeige nicht unter ≈ 150–200 ms pro Ziffer; Start mit 3–4 Ziffern.
- Folgen ohne vertraute Muster (keine „1 2 3“, keine Jahreszahlen; Jones & Macken, 2015).
- Kein roter Fehler-Schimmer als Voreinstellung; Rückmeldung mit ✓/✗.
- Tablet: Tasten ≥ 12 mm, weiß auf dunkel, Ziffern nicht unter ≈ 0,5° bei 40 cm; Layout wie Nummernblock anbieten oder
  kennzeichnen. Ergebnisse nur innerhalb derselben Sprache vergleichen.

## 11. Quellen

### Von der Website angegeben

- Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review*, 63(2), 81–97. https://doi.org/10.1037/h0043158 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (≈ 7, Recoding/Chunking).
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, 24(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 Chunks, 3–5, *wenn* Rehearsal und Chunking blockiert sind; „strikt“/„zwingend“ überzogen).
- Baddeley, A. D., & Hitch, G. (1974). Working memory. *Psychology of Learning and Motivation*, 8, 47–89. https://doi.org/10.1016/S0079-7421(08)60452-1 – **Prüfung:** DOI stimmt ✓ (Crossref ohne Band); **stützt:** teilweise (phonologische Schleife ja; „1,5–2 s“ stammt aus Baddeley et al., 1975).

### Weitere Fachliteratur

- Baddeley, A. D., Thomson, N., & Buchanan, M. (1975). Word length and the structure of short-term memory. *Journal of Verbal Learning and Verbal Behavior*, 14(6), 575–589. https://doi.org/10.1016/S0022-5371(75)80045-4 – ≈ 2-s-Regel.
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, 26(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Testwiederholung hebt Werte
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation im Alter
- Darling, S., Allen, R. J., Havelka, J., Campbell, A., & Rattray, E. (2012). Visuospatial bootstrapping: Long-term memory representations are necessary for implicit binding of verbal and visuospatial working memory. *Psychonomic Bulletin & Review*, 19(2), 258–263. https://doi.org/10.3758/s13423-011-0197-3 – Tastenfeld-Layout als Merkhilfe.
- Ellis, N. C., & Hennelly, R. A. (1980). A bilingual word-length effect: Implications for intelligence testing and the relative ease of mental calculation in Welsh and English. *British Journal of Psychology*, 71(1), 43–51. https://doi.org/10.1111/j.2044-8295.1980.tb02728.x – Sprachabhängigkeit der Zahlenspanne.
- Ericsson, K. A., Chase, W. G., & Faloon, S. (1980). Acquisition of a memory skill. *Science*, 208(4448), 1181–1182. https://doi.org/10.1126/science.7375930 – Strategietraining 7 → 79 Ziffern.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Gathercole, S. E., Dunning, D. L., Holmes, J., & Norris, D. (2019). Working memory training involves learning new skills. *Journal of Memory and Language*, 105, 19–42. https://doi.org/10.1016/j.jml.2018.10.003 – Transfer nur bei gleicher Struktur.
- Jacobs, J. (1887). Experiments on "prehension". *Mind*, os-12(45), 75–79. https://doi.org/10.1093/mind/os-12.45.75 – frühe Spanne.
- Jones, G., & Macken, B. (2015). Questioning short-term memory and its measurement: Why digit span measures long-term associative learning. *Cognition*, 144, 1–13. https://doi.org/10.1016/j.cognition.2015.07.009 – Langzeitwissen.
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America*, 49(2B), 467–477. https://doi.org/10.1121/1.1912375 – 1-up/1-down → 50-%-Punkt.
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin*, 136(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612 – kein ferner Transfer.
- Monaco, M., Costa, A., Caltagirone, C., & Carlesimo, G. A. (2013). Forward and backward span for verbal and visuo-spatial data: Standardization and normative data from an Italian adult population. *Neurological Sciences*, 34(5), 749–754. https://doi.org/10.1007/s10072-012-1130-x – italienische Normen (n = 362; Erratum 2015: https://doi.org/10.1007/s10072-014-2019-7).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042 – Übungseffekt ohne Transfer.
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). https://doi.org/10.1145/1152215.1152260 – Mindestgröße für Daumenziele
- Paulesu, E., Frith, C. D., & Frackowiak, R. S. J. (1993). The neural correlates of the verbal component of working memory. *Nature*, 362(6418), 342–345. https://doi.org/10.1038/362342a0 – Hirnregionen der Schleife.
- Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. *Psychological Bulletin*, 124(3), 372–422. https://doi.org/10.1037/0033-2909.124.3.372 – Fixations-/Sakkadenkennwerte.
- Ryan, J. (1969). Grouping and short-term memory: Different means and patterns of grouping. *Quarterly Journal of Experimental Psychology*, 21(2), 137–147. https://doi.org/10.1080/14640746908400206 – Gruppieren (Abstract via Crossref).
- Sheedy, J. E. (2004). Progressive addition lenses – matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – seitliche Unschärfe von Gleitsichtgläsern
- Swanson, H. L., Zheng, X., & Jerman, O. (2009). Working memory, short-term memory, and reading disabilities: A selective meta-analysis of the literature. *Journal of Learning Disabilities*, 42(3), 260–287. https://doi.org/10.1177/0022219409331958 – Nachteil bei Leseschwäche.
- Tsubota, K., & Nakamori, K. (1993). Dry eyes and video display terminals. *New England Journal of Medicine*, 328(8), 584. https://doi.org/10.1056/NEJM199302253280817 – Lidschlag am Bildschirm
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
- Woods, D. L., Kishiyama, M. M., Yund, E. W., Herron, T. J., Edwards, B., Poliva, O., Hink, R. F., & Reed, B. (2011). Improving digit span assessment of short-term verbal memory. *Journal of Clinical and Experimental Neuropsychology*, 33(1), 101–111. https://doi.org/10.1080/13803395.2010.493149 – adaptive Spanne, Median 6,45, Retest vorwärts 0,67 (PMC2978794).
