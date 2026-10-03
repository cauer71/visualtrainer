---
# ===== Kennung =====
nr: 604
kennung: n-back
name: "N-Back (Form von vor N Schritten wiedererkennen)"
name_original: "N-Back Test online – Arbeitsgedächtnis (Dual N-Back Training Pro)"
kapitel: "Gedächtnis"
kapitel_original: "memory"
unterkapitel_original: "working-memory"
quelle_url: "https://skilldrills.online/de/drills/memory/working-memory/n-back"
blickfit_umsetzung: {kennung: "rueckblick", name: "Rückblick", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/rueckblick/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "In der Bildschirmmitte erscheint eine einfache Form nach der anderen. Bei jeder Form entscheidet man mit zwei Tasten, ob sie dieselbe ist wie die Form vor N Schritten (Start: 1 Schritt zurück) – man muss also laufend die letzten Formen im Kopf behalten und nachschieben."
ziel_funktionen: [arbeitsgedaechtnis]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Nur aufwärts, nach Punkten (Code): Start 3-Back mit 2.000 ms Antwortfenster; alle 1.200 Punkte (= 8 richtige Entscheidungen) N + 1 und Fenster −100 ms (min. 1.200 ms). Kein Abstieg, kein Hinweis und keine neue Einprägephase beim Stufenwechsel. Keine manuellen Einstellungen."
messgroessen: ["Punkte (+150 je richtiger Entscheidung, keine Abzüge)", "erreichte N-Stufe am Rundenende ('Peak Level'; steigt nur)", "Genauigkeit = richtige / (richtige + falsche + verpasste) Entscheidungen", "sinnvoll: Treffer- und Fehlalarmrate getrennt, Unterscheidungsmaß d′", "sinnvoll: Reaktionszeit richtiger Antworten je N-Stufe"]

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
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 1
    arbeitsgedaechtnis: 3
    kurzzeitgedaechtnis_verbal: 2
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 1
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
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Großbuchstaben A–Z sicher erkennen und benennen können", "Aufgabenregel 'gleich wie vor N Schritten?' verstehen (Einweisung mit 1- oder 2-Back hilfreich; das Original startet bei 3-Back)", "Touch oder Maus; zwei große Schaltflächen, keine Farbunterscheidung nötig"]
vorsicht_bei: [aufmerksamkeitsprobleme, kognitive_einschraenkung, lese_rechtschreib_schwaeche, photosensitive_epilepsie, migraene_lichtempfindlich, kinder_unter_6]
geeignet_fuer: ["kurzes, forderndes Üben des laufenden Aktualisierens im Arbeitsgedächtnis ('die letzten drei merken und nachschieben')", "Konzentration über mehrere Minuten ohne Pause auf einen einzigen Reizstrom halten", "sitzende Übung ohne Bewegungsreize, mit großen Formen – auch bei eingeschränkter Sehschärfe gut erkennbar", "Selbstvergleich über Wochen auf demselben Gerät (mit Vorsicht, siehe Messgrenzen)"]
weniger_geeignet_fuer: ["Einstufung von Arbeitsgedächtnis, 'fluider Intelligenz' oder IQ (nicht normiert, wenig reliabel, keine Diagnose)", "Menschen, die bei Überforderung schnell frustriert sind (die Stufe wechselt zwischen den Blöcken, die Regel ändert sich mitten in der Sitzung)", "wer Zeitdruck vermeiden will (feste Taktung: alle zwei Sekunden erscheint die nächste Form)", "Erwartung einer Alltagswirkung auf Gedächtnis, Konzentration oder Schule"]
evidenz:
  uebungseffekt: stark
  naher_transfer: mittel
  alltag_transfer: fehlend
  kommentar: "In N-Back-Trainingsstudien (meist 20+ Sitzungen) verbessert sich die geübte Aufgabe deutlich; auf ungeübte N-Back-Varianten überträgt sich das mittelgroß (g = 0,62), auf andere Arbeitsgedächtnisaufgaben nur klein (g = 0,24) und auf fluide Intelligenz sehr klein (g = 0,16; Soveri et al. 2017); gegen aktive Kontrollgruppen fehlt ferner Transfer (Redick et al. 2013; Melby-Lervåg et al. 2016). Für so kurze Durchgänge wie hier gibt es keine eigenen Studien."
aehnliche_uebungen: [602, 606, 601, 607, 603, 605, 208, 205, 206, 102, 201]
stichworte: ["N-Back", "3-Back", "Arbeitsgedächtnis", "working memory updating", "Aktualisieren", "Buchstabenfolge", "Wiedererkennen", "Kirchner", "Dual N-Back", "Lure", "d prime", "phonologische Schleife", "Daueraufmerksamkeit", "Zeitdruck"]
---

# 604 · N-Back (Form von vor N Schritten wiedererkennen)

> Original: „N-Back Test online – Arbeitsgedächtnis“ (Startbild „Dual N-Back Training Pro“) – skilldrills.online, Kapitel Gedächtnis (`memory`, Unterkapitel `working-memory`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Einfache Formen (Kreis, Quadrat, Dreieck, Stern, Kreuz, Herz, Mond) erscheinen nacheinander in der Bildmitte, eine alle zwei Sekunden, weich ein- und ausgeblendet. Bei jeder Form entscheidet man mit zwei großen Tasten („Gleich“ oder „Anders“), ob sie dieselbe ist wie die Form vor N Schritten. Man muss also laufend die letzten Formen im Kopf behalten und bei jeder neuen nachschieben. Die Übung beginnt bei einem Schritt zurück, eine kurze Erklärkarte nennt die Regel; die ersten N Formen werden nur angeschaut. Ausgewertet wird in Blöcken zu 20 Formen, von denen 30 % „gleich“ sind. Nach jedem Block geht es je nach Ergebnis eine Stufe weiter zurück (bis vier Schritte), eine Stufe zurück oder auf derselben Stufe weiter; eine Sitzung hat drei Blöcke.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `82858-…js`, Stand 29.09.2026); nur Mechanik beschrieben.

- **Reize (Code):** Zufallsbuchstaben A–Z, einzeln, fett, weiß (Schrift 96 px, ab 640 px Breite 140 px). Der Buchstabe
  bleibt bis zum nächsten stehen, **ohne Leerpause**; folgen zwei gleiche direkt aufeinander (≈ 4 % der Nicht-Treffer,
  Herleitung 1/25), zeigen nur Klickton und wieder freigegebene Knöpfe den neuen Durchgang.
- **Treffer und Köder (Code):** 35 % Treffer; Nicht-Treffer schließen den Buchstaben von vor N Schritten aus. „Lures“
  (Wiederholung vor N−1 oder N+1 Schritten) sind weder eingebaut noch vermieden, nur zufällig (je ≈ 4 %, Herleitung).
- **Takt (Code):** Einprägephase: erste 3 Buchstaben je 2.000 ms, die 45-s-Uhr **steht** dabei. Danach Antwortfenster =
  Reizdauer (Start 2.000 ms), nach der Antwort 400 ms (richtig) bzw. 600 ms (falsch) Pause, dann sofort der nächste
  Buchstabe – schnelle Antworten bringen mehr Durchgänge. Uhr über `performance.now()`, bildfrequenzunabhängig.
- **Eingabe (Code):** Zwei Knöpfe nebeneinander (Treffer links), Auslösung bei `pointerdown`, Touch und Maus;
  **keine Tastatursteuerung**.
- **Wertung (Code):** Jede richtige Entscheidung (Treffer *oder* Nicht-Treffer) +150 Punkte. Falsch und Zeitüberschreitung
  zählen gleich als Fehler (Fehlerton, abschaltbarer roter Vollbild-Blitz 480 ms), **ohne Abzug**. Genauigkeit = richtige /
  alle Entscheidungen. Eine „Serie“ (Regel 5) gibt es im Code nicht; „kein Verlust von Zeit“ (Regel 4) stimmt nur halb,
  die Uhr läuft im Antwortfenster weiter.
- **Level (Code):** N = 3 + ⌊Punkte / 1.200⌋ – alle 8 richtigen Antworten eine Stufe höher, unabhängig von der Genauigkeit,
  Fenster je Stufe −100 ms (1.200 ms erst bei 11-Back). Die Regel wechselt **mitten im Strom** ohne Hinweis außer der
  kleinen Stufenanzeige; kein Abstieg. Note 100 × √(Punkte/1.000): „S+ / LEGENDARY“ schon nach **7 richtigen Antworten**.
  Bestwerte im `localStorage`.
- **Was eine Runde misst (Herleitung aus dem Code):** Ehrlich gespielt (≈ 0,9 s je Antwort, 80 % richtig) ≈ 33
  Entscheidungen, ≈ 4.000 Punkte, Stufe 6-Back. Nur „Kein Treffer“ im Schnelltakt (≈ 0,35 s): ≈ 55 Entscheidungen,
  **≈ 65 % Genauigkeit ohne jedes Merken**, ≈ 5.400 Punkte, 7-Back, Note S+. Punkte und Stufe belohnen Tempo und die
  Mehrheitsantwort, nicht das Arbeitsgedächtnis.
- **Widersprüche:** Untertitel „2-Back-Training“, Start 3-Back; „Dual N-Back“, aber nur ein Buchstabenstrom (kein
  räumlicher oder gesprochener zweiter Kanal); Teilen-Text „3-Back Training Pro“.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite nennt N-Back den „Goldstandard“ zur Messung fluider Intelligenz, verspricht einen „erweiterten exekutiven
Kontrollpuffer“ sowie Vorteile für Multitasking, Programmieren, Textverständnis und Entscheidungen (Zielgruppen:
Schüler:innen, Berufstätige, Forschende, „kognitive Athlet:innen“); laut FAQ „belegen“ Jaeggi et al. (2008) „bedeutsame
Transfereffekte“. Eine Tabelle ordnet Punkte Perzentilen zu („1.200+ Punkte = Top 1 %“; „600–899 = 50. Perzentil,
normative Basislinie nach Kirchner 1958, 65–79 % Genauigkeit“).

- **Belegt:** Ursprung bei Kirchner (1958); verbreitetes Paradigma, v. a. in der Bildgebung (Owen et al., 2005).
  Aktualisieren ist eine eigene exekutive Teilfunktion (Miyake et al., 2000; Diamond, 2013). Mit steigendem N sinkt die
  Genauigkeit und steigt die Reaktionszeit (Meule, 2017).
- **Überzogen:** „Goldstandard“: N-Back korreliert mit Complex-Span-Aufgaben nur r = .20 (Redick & Lindsey, 2013) und ist
  als Maß individueller Unterschiede zu wenig reliabel (Jaeggi et al., 2010). „Einbruch bei 4-Back wegen biologischer
  Grenze 4 ± 1“: Cowan (2001) gilt nur ohne Strategien; N-Back fordert zudem Kontrolle über Vertrautheit (Kane et al., 2007).
- **Nicht belegt:** Transfer auf IQ und Alltag (Abschnitt 8). Die Tabelle hat keine Datengrundlage (die Seite sammelt
  keine Daten), eine Punkt- oder Perzentilnorm stammt nicht aus Kirchner (1958; Inhalt nur sekundär geprüft), und sie passt nicht zum Spiel: 1.200 Punkte sind 8 richtige
  Antworten, 65 % Genauigkeit liefert reines „Kein Treffer“-Tippen. „Signalentdeckungsmetriken“ (Woods et al., 2015) gibt
  es weder in der Studie noch im Spiel.
- **Tipps:** Inneres Mitsprechen ist plausibel (Abschnitt 5), „nach Fadenverlust sofort neu ansetzen“ sinnvoll; die
  Köder-Warnung betrifft hier nur wenige Durchgänge.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Die Formen sind groß und erscheinen einzeln in der Bildmitte; sie unterscheiden sich nur im Umriss, nicht in der Farbe. Zur Orientierung: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°. Eine Sehschärfe von 1,0 erkennt Zeichen ab etwa 0,08° (5′) Höhe; die Formen bleiben auch bei deutlich reduzierter Sehschärfe erkennbar. Sehschärfe, Kontrast und Farbe begrenzen die Leistung nicht.
- **Blick:** Ein Reiz an fester Stelle, keine Suche oder Blicksprünge nötig; kurze Blicke zu den Tasten darunter.
- **Brille:** Am Tablet blickt man durch den Nahteil, alles liegt zentral – die seitliche Unschärfe von Gleitsichtgläsern (Sheedy, 2004) spielt kaum eine Rolle. Am Monitor (60–70 cm) ist eine Arbeitsplatzbrille bequemer als Kopf-in-den-Nacken. Ab etwa 40 Jahren reicht die Akkommodation ohne Nahkorrektur oft nicht (Charman, 2008); große Formen verzeihen viel Unschärfe.
- **Licht:** Die Formen werden weich ein- und ausgeblendet, im Abstand von zwei Sekunden; es gibt kein Blitzen und kein rotes Aufleuchten bei Fehlern. Das liegt weit unter 3 Blitzen pro Sekunde (WCAG 2.2, SC 2.3.1); gesättigtes Rot gilt als Zusatzfaktor für Lichtempfindliche (Fisher et al., 2005) und kommt hier nicht vor.
- Kurze Sitzungen belasten wenig; der Lidschlag sinkt am Bildschirm (Tsubota & Nakamori, 1993) – bei trockenem Auge Pausen einlegen.

## 5. Neurowissenschaftliche Grundlagen

- **Netzwerk:** Eine Metaanalyse von 24 fMRT-Studien nennt lateralen prämotorischen Kortex, dorsales Cingulum/medialen prämotorischen Kortex, dorsolateralen und ventrolateralen präfrontalen Kortex, Frontalpole sowie medialen und lateralen hinteren Parietalkortex (Owen et al., 2005) – ein frontoparietales Netz, nicht „der DLPFC“ allein.
- **Phonologische Schleife:** Die Formen lassen sich benennen („Stern, Kreis“); die Namen werden innerlich mitgesprochen und aufgefrischt (Baddeley & Hitch, 1974). Speicher im linken Gyrus supramarginalis, Mitsprechen im Broca-Areal (PET mit visuell gezeigten Buchstaben; Paulesu et al., 1993). Ähnlich klingende Bezeichnungen werden leichter verwechselt (Conrad & Hull, 1964); die sieben Formnamen klingen auf Deutsch (Kreis, Quadrat, Dreieck, Stern, Kreuz, Herz, Mond) und auf Italienisch (cerchio, quadrato, triangolo, stella, croce, cuore, luna) deutlich verschieden (Herleitung).
- **Aktualisieren und Vertrautheit:** Aktualisieren ist eine eigene exekutive Teilfunktion (Miyake et al., 2000; Diamond, 2013). Man muss das Älteste ersetzen und „genau vor N“ von „nur bekannt“ trennen; Köder (gleich wie vor N − 1 oder N + 1 Schritten) erhöhen Fehlalarme (Kane et al., 2007), deshalb gibt es sie ab zwei Schritten zurück. Wenn Strategien blockiert sind, liegt die Kapazität bei etwa vier Einheiten (Cowan, 2001). Dass die Übung Hirnregionen „stärkt“, ist nicht belegt.
- **Ursprung des Verfahrens:** Die Aufgabe geht auf Kirchner (1958) zurück und ist besonders in der Bildgebung verbreitet (Owen et al., 2005). Mit steigendem N sinkt die Genauigkeit und steigt die Reaktionszeit (Meule, 2017).

## 6. Motorische Grundlagen

- Zweifach-Wahlreaktion mit zwei großen Tasten („Gleich“ mit Gleichheitszeichen, „Anders“ mit Ungleichzeichen; am Computer auch mit den Pfeiltasten), deutlich über den etwa 9 mm für Daumenziele (Parhi et al., 2006); Zielgenauigkeit und Handruhe begrenzen nicht.
- **Takt und Antwort:** Die Formen folgen in festem Abstand von zwei Sekunden. Es zählt nur die erste Antwort je Form; keine Antwort gilt als Fehler. Weil „Anders“ in 70 % der Fälle richtig ist, würde reines „Anders“-Tippen etwa 70 % richtig ergeben; die Wertung verlangt deshalb erkannte Treffer. Touch misst Zeiten etwa 58–70 ms zu lang (Pronk et al., 2020) – für den Takt von zwei Sekunden unerheblich.

## 7. Einflussfaktoren und Messgrenzen

- **Kennwert:** „Genauigkeit“ ist bei N-Back uneinheitlich; Treffer und Fehlalarme sollten getrennt bzw. als d′ berichtet werden (Meule, 2017). Bei Schizophrenie-Patient:innen bewährte sich das 2-Back-d′ als Arbeitsgedächtnismaß, unabhängig von demografischen Merkmalen und IQ (Haatveit et al., 2010). Deshalb weist die Übung Trefferquote, Fehlalarme und Gesamtgenauigkeit getrennt aus; ein Block gilt nur als geschafft, wenn mindestens 80 % richtig sind, mindestens die Hälfte der Treffer erkannt und höchstens 30 % Fehlalarme gegeben wurden.
- **Reliabilität:** Die Genauigkeit im räumlichen N-Back hatte Retest-Korrelationen von r = 0,49 / 0,54 / 0,73 für 1-/2-/3-Back (Hockey & Geffen, 2004; nur Sekundärangaben, unsicher). Eine Sitzung mit drei Blöcken zu je 20 Entscheidungen auf wechselnden Stufen ist weit unsicherer. N-Back korreliert mit Complex-Span-Aufgaben nur gering (r = 0,20; Redick & Lindsey, 2013) und ist als Maß individueller Unterschiede wenig reliabel (Jaeggi et al., 2010); sie taugt daher nicht als Test. Allgemein streuen Messungen am Menschen; aussagekräftiger ist der Verlauf über mehrere Sitzungen (zum Grundsatz der Wiederholmessung: Mountford et al., 2004, S. 44).
- **Alter:** Ältere fielen bei Kirchner (1958) früher ab (Sekundärangabe); Arbeitsgedächtnisspannen sind altersempfindlicher als einfache Spannen (Bopp & Verhaeghen, 2005). Deshalb beginnt die Übung bei einem Schritt zurück und passt die Stufe nach oben und unten an.
- **Sprache:** Die Formen sind sprachneutral; Namen und Mitsprechen unterscheiden sich zwischen Deutsch und Italienisch, werden aber nicht abgefragt. Verglichen wird nur mit sich selbst.
- **Zustand, Übung:** Schlafentzug senkt die Arbeitsgedächtnisleistung (Lim & Dinges, 2010), Wiederholung hebt Werte (Calamia et al., 2012). Sinnvoll ist nur der Selbstvergleich auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – stark:** Geübte Aufgaben verbessern sich zuverlässig (Owen et al., 2010).
- **Naher Transfer – mittel, eng begrenzt:** 33 RCTs mit gesunden Erwachsenen: ungeübte N-Back-Aufgaben g = 0,62, andere Arbeitsgedächtnisaufgaben g = 0,24, kognitive Kontrolle g = 0,16; Single = Dual (Soveri et al., 2017). Grundlage ist mehrwöchiges Training, nicht eine kurze Sitzung.
- **Ferner und Alltagstransfer – fehlend:** Der Matrizentest-Zuwachs bei Jaeggi et al. (2008; Kritik an verkürzter Testung: Moody, 2009) blieb mit aktiver Placebogruppe aus (Redick et al., 2013). Fluide Intelligenz g = 0,24 (Au et al., 2015) bzw. 0,16 (Soveri et al., 2017); gegen behandelte Kontrollgruppen kein ferner Transfer (Melby-Lervåg et al., 2016).
- **Zielgruppen:** Ältere: nahe Effekte, ferner Transfer klein (Karbach & Verhaeghen, 2014). ADHS: Arbeitsgedächtnistests besser, Symptome nach verblindeter Einschätzung nicht (Cortese et al., 2015) – kein Heilversprechen.

## 9. Auswahlhinweise

- **Passt, wenn …** jemand laufendes Aktualisieren konzentriert üben möchte – im Sitzen, ohne Bewegungsreize, mit großen, sprachneutralen Formen; als schwerere Stufe nach 602 oder 601.
- **Weniger passend, wenn …** ein fester Takt von zwei Sekunden je Form Stress macht; Frust bei Überforderung vermieden werden soll; eine Gedächtnis- oder IQ-Einschätzung erwartet wird (keine Normen, keine Diagnose); Punkte als Leistungsbeleg dienen sollen.
- **Vorsicht / anpassen bei …** `aufmerksamkeitsprobleme` (ununterbrochener Strom; bei ADHS häufige Arbeitsgedächtnisdefizite, d = 0,43–1,06; Martinussen et al., 2005); `kognitive_einschraenkung` (Regelwechsel zwischen den Blöcken, fester Takt); `lese_rechtschreib_schwaeche` (Formen statt Buchstaben, das Benennen ist aber auch hier die naheliegende Strategie; Arbeitsgedächtnisnachteil d ≈ −0,67; Swanson et al., 2009); `photosensitive_epilepsie` und `migraene_lichtempfindlich` (weich ein- und ausgeblendete Formen alle zwei Sekunden, kein rotes Aufleuchten; vorsorglich gelistet, bei Beschwerden abbrechen); `kinder_unter_6` (Formen- und Regelverständnis). Bei Doppelbildern, plötzlichem Sehverlust, Schwindel oder Kopfschmerz mit Sehverschlechterung die Übung abbrechen und ärztlich abklären lassen (vgl. Muchnick, 2008, S. 6, 28); die Übung ist weder Test noch Diagnose.
- **Kombiniert gut mit …** 602 (reines Behalten), 601 (Farbfolgen) und 607 (räumliche Folgen), 208 (Daueraufmerksamkeit), 102 (Go/No-Go), 205 (geteilte Aufmerksamkeit).
- **Abgrenzung in der Gruppe:** Die einzige Übung des Kapitels, die laufendes **Aktualisieren** statt reinem Behalten verlangt (`arbeitsgedaechtnis` 3; bei 601–603 und 605–607 nur 1). Nächste Verwandte sind 602 und 606 (ebenfalls benennbares Material, dort aber einmal einprägen und dann wiedergeben). Keine Dublette in der Gruppe.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- Start bei 1- oder 2-Back mit Einweisung; Stufe blockweise nach Genauigkeit auf *und* ab; Wechsel ankündigen und mit
  neuer Einprägephase beginnen.
- Wertung mit Treffer- und Fehlalarmrate bzw. d′ (Meule, 2017; Haatveit et al., 2010), damit Raten sich nicht lohnt;
  Runde nach Durchgängen statt Zeit, Uhr nicht während der Rückmeldung; keine Perzentil- oder IQ-Tabelle.
- Reiz kurz zeigen, dann Leerbild (klarer Durchgangsbeginn); Lures kontrolliert einbauen.
- Buchstabensatz je DE/IT ohne stark reimende und fremde Buchstaben; sprachfreie Variante (Positionen, Formen) anbieten;
  Farbe nie als einzige Information.
- Kein roter Blitz als Voreinstellung; zusätzlich zwei Tasten; „Dual“ nur mit echtem zweitem Kanal.

## 11. Quellen

### Von der Website angegeben

- Baddeley, A. D., & Hitch, G. (1974). Working memory. *Psychology of Learning and Motivation*, 8, 47–89. https://doi.org/10.1016/S0079-7421(08)60452-1 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Modellebene).
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*, 24(1), 87–114. https://doi.org/10.1017/S0140525X01003922 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (≈ 4 Chunks unter Randbedingungen; „biologische Grenze“ überzogen).
- Kirchner, W. K. (1958). Age differences in short-term retention of rapidly changing information. *Journal of Experimental Psychology*, 55(4), 352–358. https://doi.org/10.1037/h0043688 – **Prüfung:** auf der Seite ohne DOI, DOI per Crossref ✓; **stützt:** ja als Ursprung, nein als „Norm 65–79 %“.
- Diamond, A. (2013). Executive functions. *Annual Review of Psychology*, 64, 135–168. https://doi.org/10.1146/annurev-psych-113011-143750 – **Prüfung:** DOI ✓; **stützt:** ja (Kern-EF).
- Jaeggi, S. M., Buschkuehl, M., Jonides, J., & Perrig, W. J. (2008). Improving fluid intelligence with training on working memory. *PNAS*, 105(19), 6829–6833. https://doi.org/10.1073/pnas.0801268105 – **Prüfung:** DOI ✓; **stützt:** Befund korrekt wiedergegeben, „bedeutsamer Transfer“ nein (nicht repliziert).

### Weitere Fachliteratur

- Au, J., Sheehan, E., Tsai, N., Duncan, G. J., Buschkuehl, M., & Jaeggi, S. M. (2015). Improving fluid intelligence with training on working memory: A meta-analysis. *Psychonomic Bulletin & Review*, 22(2), 366–377. https://doi.org/10.3758/s13423-014-0699-x
- Bopp, K. L., & Verhaeghen, P. (2005). Aging and verbal memory span: A meta-analysis. *The Journals of Gerontology: Series B*, 60(5), P223–P233. https://doi.org/10.1093/geronb/60.5.P223 – Alter und Spannen
- Calamia, M., Markon, K., & Tranel, D. (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, 26(4), 543–570. https://doi.org/10.1080/13854046.2012.680913 – Testwiederholung hebt Werte
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry*, 91(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Akkommodation im Alter
- Conrad, R., & Hull, A. J. (1964). Information, acoustic confusion and memory span. *British Journal of Psychology*, 55(4), 429–432. https://doi.org/10.1111/j.2044-8295.1964.tb00928.x – Klangähnlichkeit (Crossref ✓, PubMed).
- Cortese, S., Ferrin, M., Brandeis, D., et al. (2015). Cognitive training for attention-deficit/hyperactivity disorder: Meta-analysis of clinical and neuropsychological outcomes from randomized controlled trials. *Journal of the American Academy of Child & Adolescent Psychiatry*, 54(3), 164–174. https://doi.org/10.1016/j.jaac.2014.12.010 – ADHS
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Blitzfrequenzen, Rot als Risikofaktor
- Haatveit, B. C., Sundet, K., Hugdahl, K., Ueland, T., Melle, I., & Andreassen, O. A. (2010). The validity of d prime as a working memory index: Results from the "Bergen n-back task". *Journal of Clinical and Experimental Neuropsychology*, 32(8), 871–880. https://doi.org/10.1080/13803391003596421 – d′ (Crossref ✓, PubMed).
- Hockey, A., & Geffen, G. (2004). The concurrent validity and test–retest reliability of a visuospatial working memory task. *Intelligence*, 32(6), 591–605. https://doi.org/10.1016/j.intell.2004.07.009 – Retest-Reliabilität (nur Sekundärangaben)
- Jaeggi, S. M., Buschkuehl, M., Perrig, W. J., & Meier, B. (2010). The concurrent validity of the N-back task as a working memory measure. *Memory*, 18(4), 394–412. https://doi.org/10.1080/09658211003702171 – Messgüte.
- Kane, M. J., Conway, A. R. A., Miura, T. K., & Colflesh, G. J. H. (2007). Working memory, attention control, and the n-back task: A question of construct validity. *JEP: Learning, Memory, and Cognition*, 33(3), 615–622. https://doi.org/10.1037/0278-7393.33.3.615
- Karbach, J., & Verhaeghen, P. (2014). Making working memory work: A meta-analysis of executive-control and working memory training in older adults. *Psychological Science*, 25(11), 2027–2037. https://doi.org/10.1177/0956797614548725 – Training bei Älteren
- Lim, J., & Dinges, D. F. (2010). A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. *Psychological Bulletin*, 136(3), 375–389. https://doi.org/10.1037/a0018883 – Schlafmangel
- Martinussen, R., Hayden, J., Hogg-Johnson, S., & Tannock, R. (2005). A meta-analysis of working memory impairments in children with attention-deficit/hyperactivity disorder. *Journal of the American Academy of Child & Adolescent Psychiatry*, 44(4), 377–384. https://doi.org/10.1097/01.chi.0000153228.72591.73 – Vorsichtshinweis ADHS
- Melby-Lervåg, M., Redick, T. S., & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*, 11(4), 512–534. https://doi.org/10.1177/1745691616635612
- Meule, A. (2017). Reporting and interpreting working memory performance in n-back tasks. *Frontiers in Psychology*, 8, 352. https://doi.org/10.3389/fpsyg.2017.00352 – Genauigkeit vs. d′ (Crossref ✓, Volltext PMC5339218).
- Miyake, A., Friedman, N. P., Emerson, M. J., Witzki, A. H., Howerter, A., & Wager, T. D. (2000). The unity and diversity of executive functions and their contributions to complex "frontal lobe" tasks: A latent variable analysis. *Cognitive Psychology*, 41(1), 49–100. https://doi.org/10.1006/cogp.1999.0734 – Aktualisieren als Teilfunktion
- Moody, D. E. (2009). Can intelligence be increased by training on a task of working memory? *Intelligence*, 37(4), 327–328. https://doi.org/10.1016/j.intell.2009.04.005 – Kritik an verkürzter Testung (Inhalt nur sekundär)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messwerte streuen, Wiederholmessung sinnvoll (S. 44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Owen, A. M., Hampshire, A., Grahn, J. A., Stenton, R., Dajani, S., Burns, A. S., Howard, R. J., & Ballard, C. G. (2010). Putting brain training to the test. *Nature*, 465(7299), 775–778. https://doi.org/10.1038/nature09042 – Übungseffekt ohne Transfer
- Owen, A. M., McMillan, K. M., Laird, A. R., & Bullmore, E. (2005). N-back working memory paradigm: A meta-analysis of normative functional neuroimaging studies. *Human Brain Mapping*, 25(1), 46–59. https://doi.org/10.1002/hbm.20131
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). https://doi.org/10.1145/1152215.1152260 – Mindestgröße für Daumenziele
- Paulesu, E., Frith, C. D., & Frackowiak, R. S. J. (1993). The neural correlates of the verbal component of working memory. *Nature*, 362(6418), 342–345. https://doi.org/10.1038/362342a0
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessgenauigkeit von Web-Anwendungen auf Touchgeräten
- Redick, T. S., & Lindsey, D. R. B. (2013). Complex span and n-back measures of working memory: A meta-analysis. *Psychonomic Bulletin & Review*, 20(6), 1102–1113. https://doi.org/10.3758/s13423-013-0453-9
- Redick, T. S., Shipstead, Z., Harrison, T. L., Hicks, K. L., Fried, D. E., Hambrick, D. Z., Kane, M. J., & Engle, R. W. (2013). No evidence of intelligence improvement after working memory training: A randomized, placebo-controlled study. *Journal of Experimental Psychology: General*, 142(2), 359–379. https://doi.org/10.1037/a0029082
- Sheedy, J. E. (2004). Progressive addition lenses – matching the specific lens to patient needs. *Optometry – Journal of the American Optometric Association*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – seitliche Unschärfe von Gleitsichtgläsern
- Soveri, A., Antfolk, J., Karlsson, L., Salo, B., & Laine, M. (2017). Working memory training revisited: A multi-level meta-analysis of n-back training studies. *Psychonomic Bulletin & Review*, 24(4), 1077–1096. https://doi.org/10.3758/s13423-016-1217-0
- Swanson, H. L., Zheng, X., & Jerman, O. (2009). Working memory, short-term memory, and reading disabilities: A selective meta-analysis of the literature. *Journal of Learning Disabilities*, 42(3), 260–287. https://doi.org/10.1177/0022219409331958 – Nachteil bei Leseschwäche
- Tsubota, K., & Nakamori, K. (1993). Dry eyes and video display terminals. *New England Journal of Medicine*, 328(8), 584. https://doi.org/10.1056/NEJM199302253280817 – Lidschlag am Bildschirm
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
