---
# ===== Kennung =====
nr: 201
kennung: distraction-fighter
name: "Farbwort-Stroop (Schriftfarbe statt Wort)"
name_original: "Stroop-Test – Farb-Wort-Interferenz & Kognitive Inhibition (Distraction Fighter)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "focus"
quelle_url: "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter"
blickfit_umsetzung: {kennung: "pfeil-duell", name: "Pfeil-Duell", unterschiede: "Farb- und sprachfreie Neugestaltung: weißer Pfeil, dessen Richtung zählt, während Platz (räumlicher Stroop) oder Nachbarpfeile (Flanker) ablenken; 50 % kongruente und 50 % inkongruente Durchgänge; feste, räumlich passende Tasten statt jedes Mal neu gemischter Textknöpfe; Fixationskreuz 500 ms und Pause 500 ms; Antwortfrist adaptiv 2.000 → ≈ 500 ms (gewichtetes Up-Down, ≈ 80 % richtig); feste Dauer 66 s ohne Zeitbonus; erfasst Median-Reaktionszeit und Interferenz (inkongruent − kongruent); Touch, Maus und Pfeiltasten; kein Bildschirmblitzen."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein Farbwort wie „Blau“ erscheint in einer anderen Schriftfarbe, z. B. rot. Man tippt so schnell wie möglich auf den beschrifteten Knopf der Schriftfarbe („ROT“) und ignoriert, was das Wort bedeutet; die Knöpfe werden bei jedem Wort neu gemischt."
ziel_funktionen: [inhibition, selektive_aufmerksamkeit]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 45
schwierigkeit_anpassung: "Stufe = max(bisherige Stufe, Punkte/1.750 + 1), sinkt nie (Code). Zeitfenster je Wort 1.700 ms (Stufe 1) → ≈ 1.390 (5) → ≈ 910 (10) → ≈ 530 (15) → ≈ 340 ms (20), bei langer Trefferserie bis 30 % kürzer (min. 120 ms). Ab Stufe 4 sechs statt vier Antwortknöpfe. Jeder Treffer +2 s (Uhr max. 60 s), jeder Fehler und jede Zeitüberschreitung −1 s – die nominell 45 s lange Runde dauert daher je nach Tempo ≈ 0,5–3 min."
messgroessen: ["Original: Punkte (100 × Serien-Multiplikator 1–3 × Stufenfaktor 1,0–1,5), Stufe, Treffer, Fehlklicks, Zeitüberschreitungen, Trefferquote, längste Serie, Note F–S+", "sinnvoll: Median-Reaktionszeit richtiger Antworten getrennt für kongruente, inkongruente und neutrale Durchgänge", "sinnvoll: Interferenz = Median-RT inkongruent − kongruent und Fehlerquote je Bedingung, nur über mehrere Sitzungen gemittelt"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 3
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 0
    visuelle_suche: 2
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 3
    inhibition: 3
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 2
    lesen_sprache: 2
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 1
    zielbewegung_tempo: 1
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 3

# ===== Auswahlhilfe =====
voraussetzungen: ["sicheres Unterscheiden von sechs Farben (Rot, Blau, Grün, Gelb, Lila, Orange) – die Schriftfarbe ist die gesuchte Antwort", "flüssiges Lesen kurzer deutscher Farbwörter (andere Sprachversionen zeigen englische Wörter); die Antwortknöpfe sind nur beschriftet", "Antworten innerhalb von 1,7 s schon auf Stufe 1", "Nahsicht für ≈ 2 mm hohe Großbuchstaben auf den Knöpfen (Tablet, 40 cm)"]
vorsicht_bei: [farbsehschwaeche, lese_rechtschreib_schwaeche, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, photosensitive_epilepsie, migraene_lichtempfindlich, tremor_parkinson]
geeignet_fuer: ["den klassischen Stroop-Konflikt (Wort gegen Schriftfarbe) spielerisch erleben", "unter Zeitdruck Störendes ausblenden und schnell unter 4–6 Möglichkeiten wählen", "kurze, fordernde Konzentrationsaufgabe für geübte Leser:innen mit normalem Farbsehen"]
weniger_geeignet_fuer: ["Menschen mit Farbsehschwäche (Blau/Lila bei Grünschwäche praktisch gleich)", "Menschen mit Lese-Rechtschreib-Schwäche, Leseanfänger:innen, Kinder vor dem Lesealter", "Italienischsprachige Kundschaft ohne sichere Deutsch- oder Englischkenntnisse", "Ältere oder langsamere Personen (fixes Startfenster 1,7 s, keine leichtere Stufe)", "Verlaufsmessung der Hemmfähigkeit (keine Reaktionszeit, keine kongruenten Durchgänge, schwankende Rundendauer)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Stroop-Interferenz sinkt mit Übung, verschwindet aber nicht (Davidson et al., 2003); bei 60–84-Jährigen gab es keinen Transfer auf andere Aufgaben (Wilkinson & Yang, 2012), und Hemmtraining überträgt sich generell kaum (Enge et al., 2014). Die Original-Übung selbst ist nicht untersucht und misst keine Interferenz."
aehnliche_uebungen: [202, 102, 805, 208, 206, 204, 108]
stichworte: ["Stroop", "Farbwort-Interferenz", "Interferenzkontrolle", "Inhibition", "selektive Aufmerksamkeit", "Lesen", "Farbsehschwäche", "Wahlreaktion", "Zeitdruck", "Pfeil-Duell", "räumlicher Stroop", "Flanker"]
---

# 201 · Farbwort-Stroop (Schriftfarbe statt Wort)

> Original: „Stroop-Test – Farb-Wort-Interferenz & Kognitive Inhibition“ (Spielname „Distraction Fighter“) – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive/focus`) · Blickfit: **Pfeil-Duell** (farb- und sprachfreie Neugestaltung, siehe Abschnitt 10)

## 1. Kurzbeschreibung

In der Bildmitte steht groß ein Farbwort, etwa „Blau“, aber in einer anderen Farbe geschrieben, etwa rot. Darunter liegen vier, später sechs Knöpfe mit Farbnamen in weißer Schrift. Man soll den Knopf der **Schriftfarbe** antippen („ROT“) und die Bedeutung des Wortes ignorieren. Richtig getippt, kommt sofort das nächste Wort, und die Knöpfe werden neu gemischt. Serien ohne Fehler bringen mehr Punkte, mit steigender Stufe bleibt immer weniger Zeit pro Wort. Das ist eine vereinfachte Form des klassischen Stroop-Versuchs (Stroop, 1935).

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `88345-…js` mit Spiellogik, gemeinsame Kurvenfunktionen im selben Chunk; Stand 30.09.2026), ergänzt durch `docs/skilldrills-kognition-analyse.md`. Beschrieben wird nur die Mechanik; kein Code übernommen.

- **Ablauf (Code):** Start → Vollbild → Countdown 3-2-1 (≈ 2,5 s) → Durchgänge bis die Uhr bei 0 ist. Kein Fixationspunkt, keine Pause: Nach jeder Antwort erscheint **sofort** das nächste Wort mit neu gemischten Knöpfen.
- **Reiz (Code):** Farbwort in sehr fetter Schrift, 72 CSS-px (ab 640 px Bildschirmbreite, sonst 60 px), gemischte Groß-/Kleinschreibung („Blau“, nicht „BLAU“ wie im Regeltext), auf fast schwarzem Grund (#080811, im Vollbild #050508). Sechs Farben: Rot #ef4444, Blau #3b82f6, Grün #10b981, Gelb #eab308, Lila #a855f7, Orange #f97316. Wort und Schriftfarbe werden zufällig gezogen; stimmen sie überein, wird die Farbe auf die nächste der Liste verschoben. Damit sind **alle Durchgänge inkongruent**, und die in der Liste folgende Farbe ist doppelt so häufig wie jede andere (2/6 statt 1/6, eigene Rechnung). Wiederholungen von Wort oder Farbe in Folge sind nicht ausgeschlossen.
- **Antwortknöpfe (Code):** Stufe 1–3: vier Knöpfe (richtige Farbe + 3 zufällige), ab Stufe 4 alle sechs; Reihenfolge bei jedem Wort neu gemischt. Beschriftung in weißen Großbuchstaben, 14 px (unter 640 px: 12 px). Bei vier Knöpfen fehlt der Knopf mit dem Namen des Wortes in 40 % der Durchgänge (3 von 5 übrigen Farben werden gezogen), dann gibt es gar keine falsche „Lese-Antwort“. Farbwörter sind nur für Deutsch, Japanisch und Koreanisch übersetzt; alle anderen Sprachversionen zeigen Englisch („Red“, „Blue“ …).
- **Zeitfenster (Code):** 160 + 1.540 × e^(−1,43 · g) ms mit g aus (Stufe − 1)/14; das ergibt 1.700 ms auf Stufe 1, ≈ 1.390 ms auf Stufe 5, ≈ 910 ms auf 10, ≈ 530 ms auf 15, ≈ 340 ms auf 20. Eine lange Trefferserie verkürzt das Fenster um bis zu 30 % (Untergrenze 120 ms). Die Stufe ist Punkte/1.750 + 1 und **sinkt nie**.
- **Wertung (Code):** Treffer: +round(100 × Serien-Multiplikator × (1 + 0,5 × (Stufe − 1)/14)) Punkte; Multiplikator 1 (0–2 Treffer in Folge), 1,1 (ab 3), 1,25 (5), 1,35 (7), 1,5 (10), 1,75 (15), 2 (20), 2,5 (30), 3 (ab 50). Zusätzlich **+2 s** auf die Uhr (höchstens 60 s). Fehlklick oder abgelaufenes Fenster: Serie auf 0, **−1 s**, Fehlerton und roter Schimmer über dem Spielfeld (0,45 s, abschaltbar). Trefferquote = Treffer / (Treffer + Fehler + Zeitüberschreitungen). Note: √(Punkte/24.000); S+ ab ≈ 21.700 Punkten.
- **Eingabe (Code):** `pointerdown` auf den Knöpfen (Maus und Touch); Tastatur nur Escape zum Abbrechen. Die Uhr läuft über Bildzeit (dt, auf 0,1 s begrenzt), das Wortfenster über einen Timer; beides ist unabhängig von der Bildfrequenz. **Reaktionszeiten werden nicht gespeichert.**

**Was eine Runde tatsächlich dauert (eigene Simulation mit den Code-Parametern, Annahme: gleichbleibende Antwortzeit, 5 % Fehler).** Wer schneller als 2 s antwortet, gewinnt mit jedem Treffer Zeit; die Runde endet erst, wenn das schrumpfende Fenster kürzer ist als die eigene Antwortzeit und Zeitüberschreitungen die bis zu 60 s aufbrauchen. Bei mittleren Antwortzeiten von 0,6 / 0,9 / 1,3 s dauert eine Runde ≈ 2,2 / 2,6 / 2,7 min mit ≈ 26.400 / 18.500 / 10.200 Punkten (Stufe ≈ 16 / 11 / 6). Wer im Mittel über 1,7 s braucht, verliert fast jedes Wort und ist nach ≈ 30–40 s fertig. Die Trefferquote liegt wegen der Zeitüberschreitungen am Schluss **höchstens bei ≈ 70 %** (Median ≈ 65 %, bei Langsameren deutlich darunter).

**Widersprüche Regeltext ↔ Code.**
- „+0,6 s“ je Treffer: tatsächlich +2 s. „−0,8 s bei aktivierter Strafe“: tatsächlich −1 s, und der Strafschalter ist wirkungslos (die Abfrage liefert immer „an“).
- „+100 × Combo × Stufe“: Die Stufe erhöht die Punkte nur um den Faktor 1,0–1,5 (Stufe 15).
- „Höhere Stufen: mehr Farbauswahl“: nur ein Schritt, von 4 auf 6 Knöpfe ab Stufe 4.
- „45-Sekunden-Lauf“: Die Rundendauer hängt vom Tempo ab (siehe oben).
- „Jedes Reaktionsereignis wird über performance.now() erfasst“: Der Zeitgeber dient nur der Spieluhr; Reaktionszeiten werden weder gemessen noch angezeigt.
- „Längere Reaktionszeit oder mehr Fehler zeigen stärkere Interferenz“ (FAQ): Ohne kongruente oder neutrale Durchgänge lässt sich keine Interferenz berechnen.

## 3. Was die Website sagt – und wie das einzuordnen ist

**Aussagen.** Der Stroop-Effekt sei einer der verlässlichsten Befunde der Psychologie (Stroop, 1935; MacLeod, 1991). Nach dem „Horse-Race-Modell von Gordon D. Logan & Nelson J. Cowan (1984)“ gewinne der automatische Leseimpuls, wenn er nicht aktiv gehemmt werde. Den Konflikt lösten vorderer cingulärer Kortex (ACC) und dorsolateraler präfrontaler Kortex (DLPFC) (Posner & Petersen, 1990); der Orientierungsreflex laufe über Colliculus superior und Thalamus. Das Training helfe „Ja“ im Großraumbüro, senke den „neuronalen Energieaufwand“, Achtsamkeit erhöhe die graue Substanz im präfrontalen Kortex, und die Übung trainiere „genau“ die Flanker-Resistenz. Inhibition „verbrauche rasch Glukose“, 3–5 min täglich brächten den größten Effekt. Zielgruppen: Großraumbüro, Schüler:innen, Studierende, Wissensarbeiter:innen, E-Sportler:innen. Eine Tabelle ordnet Punkte und Trefferquote fünf Stufen zu (Tier 1 „Elite“: > 18.000 Punkte und > 96 %). Richtig und positiv: Die Seite sagt klar, dass die Übung ADHS weder feststellen noch behandeln kann.

**Einordnung.**
- **Effekt und Lesen:** Der Stroop-Effekt ist tatsächlich außerordentlich robust (MacLeod, 1991: ≈ 400 Studien, 18 verlässliche Befunde). Die Erklärung „das schnellere Lesen gewinnt das Rennen“ hat MacLeod aber als unzureichend bewertet. Besser passen Modelle mit abgestufter, durch Übung wachsender Automatisierung (Cohen et al., 1990). Wer neuen Formen Farbnamen zuordnen lernte, bei dem störten nach 20 h Übung die Formnamen das Farbbenennen, nicht mehr umgekehrt (MacLeod & Dunbar, 1988).
- **Logan & Cowan (1984):** Der Zweitautor heißt William B. Cowan. Das Rennmodell beschreibt das **Stop-Signal-Paradigma**, also das Abbrechen einer schon geplanten Handlung (Verbruggen & Logan, 2008), nicht die Stroop-Interferenz.
- **Hirnregionen:** Posner & Petersen (1990) beschreiben ein vorderes Aufmerksamkeitssystem mit ACC und ein hinteres Orientierungssystem (Parietallappen, Pulvinar des Thalamus, Colliculus superior); Stroop-Daten und eine DLPFC-Rolle stehen dort nicht. Richtige Belege siehe Abschnitt 5. „Training senkt den neuronalen Energieaufwand“ ist nicht belegt.
- **Transfer (Großraumbüro, Benachrichtigungen, Flanker):** nicht belegt. Stroop-Übung bei Älteren ergab keinen Transfer (Wilkinson & Yang, 2012). Elf Hemmaufgaben, darunter Farb-Stroop und Pfeil-Flanker, korrelierten nur schwach miteinander (Rey-Mermet et al., 2018). Wer Stroop übt, übt also nicht automatisch „Flanker-Resistenz“.
- **Achtsamkeit:** In der oft zitierten kleinen Studie (16 vs. 17 Personen) nahm die graue Substanz in Hippocampus, hinterem Cingulum, temporoparietalem Übergang und Kleinhirn zu, nicht im präfrontalen Kortex (Hölzel et al., 2011). Eine randomisierte Studie mit 218 Personen und aktiver Kontrollgruppe fand gar keine strukturellen Veränderungen (Kral et al., 2022).
- **Glukose und Dosis:** Das Glukose-Modell der Selbstkontrolle hat nur schwache Beweiskraft (Vadillo et al., 2016); der „Ego-Depletion“-Effekt war in 23 Laboren praktisch null (d = 0,04; Hagger et al., 2016). Für „3–5 min täglich“ gibt es keine Quelle. In einer Metaanalyse zu Computertraining bei Älteren waren mehr als 3 Einheiten pro Woche nicht wirksamer (Lampit et al., 2014).
- **Tipp „Buchstabenkanten fixieren“:** plausibel, denn die Interferenz ist bei Fixation der Wortmitte am stärksten (Rayner et al., 2016, nach Perret & Ducrot, 2010). Es ist aber eine Umgehung, die genau die geübte Anforderung senkt.
- **Leistungsstufen ohne Grundlage:** Die Seite erhebt nach eigener Angabe keine Nutzerdaten, keine Quelle enthält Werte für dieses Spiel. Zudem passen die Stufen nicht zum Code: Die Trefferquote erreicht rechnerisch höchstens ≈ 70 % (Abschnitt 2), die für Tier 1–4 geforderten 75–96 % sind praktisch unerreichbar. Die angebliche 45-s-Grundlage stimmt nicht.

## 4. Optische und okulomotorische Grundlagen

- **Reizgrößen (Herleitung, Tablet ≈ 0,19 mm pro CSS-px, 40 cm, 1° ≈ 7 mm):** Wort ≈ 1,4° hoch (Großbuchstabe ≈ 10 mm) und je nach Wort ≈ 4–8° breit – gut erkennbar. Kritisch ist die **Knopfbeschriftung**: 14-px-Großbuchstaben sind ≈ 1,9 mm hoch, ≈ 0,27° (≈ 16 Bogenminuten), grob 0,5 logMAR nach MNREAD-Konvention. Das liegt über der kritischen Schriftgröße gesunder 81-Jähriger (0,34 logMAR; Calabrèse et al., 2016), setzt aber **scharfe Nahsicht** voraus. Unkorrigierte Alterssichtigkeit oder ein Blick durch den falschen Glasbereich verlangsamt das Finden des Knopfes, nicht das Hemmen.
- **Blickbewegungen:** Pro Wort springt der Blick vom Wort zur Knopfreihe (am Tablet im Vollbild ≈ 6–8 cm tiefer, ≈ 9–11°) und sucht dort unter 4–6 **jedes Mal neu gemischten** Beschriftungen (Reihe bis ≈ 11 cm, ≈ 15° breit). Das ist visuelle Suche mit Lesen, bei ≈ 1 Wort pro Sekunde.
- **Brille:** Die Knöpfe unten werden am aufrecht stehenden Tablet meist durch den Nahteil eines Gleitsichtglases gesehen, das Wort in der Mitte eher durch die Zwischenzone. Die äußeren Knöpfe einer breiten Reihe können in die seitlichen Unschärfezonen fallen; Breite der Zonen und Randastigmatismus unterscheiden sich zwischen Glasdesigns um mehr als das Doppelte (Sheedy, 2004). Gleitsicht-Neulinge weichen auf Kopfbewegungen aus (Hutchings et al., 2007). Eine Arbeitsplatz- oder Nahbrille für den Tablet-Abstand ist hier günstiger.
- **Farbsehen – der entscheidende Punkt:** Die Schriftfarbe ist die gesuchte Antwort. Rot-Grün-Schwäche betrifft ≈ 8 % der Männer und ≈ 0,4 % der Frauen (Birch, 2012). Simulation der Palette nach Machado et al. (2009, volle Ausprägung) mit CIEDE2000-Abständen (eigene Rechnung): normal kleinster Abstand Rot/Orange ΔE ≈ 20, Blau/Lila ≈ 23; **Deuteranopie Blau/Lila ΔE ≈ 0,9** (praktisch gleich), Gelb/Orange ≈ 8, Rot/Orange ≈ 9; Protanopie Blau/Lila ≈ 5; Tritanopie Rot/Orange ≈ 7. Mildere Formen liegen dazwischen. Ab ≈ 60 Jahren nimmt die Farbunterscheidung beschleunigt ab, am stärksten auf der Blau-Gelb-Achse (Paramei & Oakley, 2014). Wer Farben schlechter trennt, wird langsamer, ohne schlechter zu hemmen: Die Übung misst dann Farbsehen. Sie erfüllt WCAG 2.2, SC 1.4.1 (Farbe nicht als einziges Merkmal) naturgemäß nicht (W3C, 2024).
- **Kontrast und Licht:** Alle Farben haben gegen den Hintergrund ≥ 5 : 1 Leuchtdichtekontrast (Lila 5,0 bis Gelb 10,4; eigene Rechnung), Kontrast begrenzt also nicht. Der rote Schimmer nach Fehlern kann in der Schlussphase bei Fenstern von 0,5–0,9 s etwa 1–2-mal pro Sekunde kommen (Herleitung). Das liegt unter der WCAG-Grenze von 3 Blitzen/s; gesättigtes Rot gilt aber als zusätzlicher Risikofaktor (Fisher et al., 2005).

## 5. Neurowissenschaftliche Grundlagen

- **Konfliktverarbeitung:** In einer frühen PET-Studie (n = 8) war der ACC bei inkongruenten minus kongruenten Wörtern am stärksten aktiv (Pardo et al., 1990). In einer fMRT-Studie war der linke DLPFC bei der Vorbereitung auf das Farbbenennen aktiv (Aufgabenziel halten), der ACC bei inkongruenten Reizen (Konflikt erkennen) (MacDonald et al., 2000). Eine Metaanalyse von 47 Bildgebungsstudien zu Stroop, Flanker, Go/No-Go, Simon und Stop-Signal fand gemeinsame Aktivität in ACC, DLPFC, unterem Frontalgyrus, hinterem Parietalkortex und vorderer Insel (Nee et al., 2007).
- **Warum das Wort stört:** Lesen ist bei geübten Erwachsenen weitgehend automatisiert (Cohen et al., 1990). Die Wortform wird im linken okzipitotemporalen Kortex schnell erkannt (Dehaene & Cohen, 2011), die Wortbedeutung konkurriert dann mit der Farbbenennung. Wie stark, hängt von der Lesegeläufigkeit in der gezeigten Sprache ab. Bei Zweisprachigen stören auch Wörter der anderen Sprache, das Ergebnis hängt von der Sprachbeherrschung ab (Rosselli et al., 2002).
- **Besonderheit dieser Variante (Herleitung):** Die Antwortknöpfe sind selbst Farbwörter. Das störende Wort passt Buchstabe für Buchstabe zu einem falschen Knopf, eine besonders leichte „Lese-Antwort“. Zugleich muss man lesen, um die richtige Antwort zu finden. Der Konflikt liegt hier also stark auf der Antwortebene; einen reinen Farbwort-Stroop mit Sprech- oder fester Tastenantwort bildet die Übung nicht ab.
- **Einordnung:** Hemmung gilt als eine von drei Kern-Exekutivfunktionen, neben Arbeitsgedächtnis und kognitiver Flexibilität (Diamond, 2013). Als einheitliche, messbare Fähigkeit ist sie aber umstritten (Rey-Mermet et al., 2018). Aussagen wie „trainiert ACC/DLPFC“ lassen sich aus diesen Aktivierungsstudien nicht ableiten.

## 6. Motorische Grundlagen

Man tippt pro Wort einen von 4–6 Knöpfen (am Tablet ≈ 17–23 × 10 mm, am Smartphone ≈ 44 px hoch) – motorisch einfach, die Knöpfe sind groß genug. Die Zeit geht vor allem in Lesen, Suchen und Entscheiden auf. Mit 4 bzw. 6 Möglichkeiten (2 bzw. 2,6 bit) ist es eine Wahlreaktion; weil die Knöpfe ständig neu gemischt werden, kann sich aber keine feste Zuordnung Farbe → Ort einschleifen, die die Wahl sonst mit Übung beschleunigt (Hick-Gesetz und Übung: Proctor & Schneider, 2018; Reiz-Antwort-Kompatibilität: Kornblum et al., 1990). Mit Tastendruck ist die Stroop-Interferenz kleiner als mit Sprechen (Augustinova et al., 2019). Jede Berührung zählt schon beim Aufsetzen (`pointerdown`), das nächste Wort kommt ohne Pause. Ein versehentlicher Doppeltipp oder ein Zittern trifft deshalb schon den neu gemischten Knopf des nächsten Wortes und zählt als Fehler. Touch-Web-Apps haben ≈ 58–70 ms zusätzliche Verzögerung (Pronk et al., 2020). Bei einem 500-ms-Fenster sind das 12–14 % der verfügbaren Zeit.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Interferenzmessung:** Ohne kongruente/neutrale Durchgänge und ohne Reaktionszeit misst die Übung Lese-, Such- und Wahltempo unter Konflikt, nicht den Stroop-Effekt. Selbst mit richtiger Messung ist die Interferenz als persönlicher Wert oft unzuverlässig (Test-Retest in 7 Aufgaben 0 bis 0,82; Hedge et al., 2018).
- **Punkte kaum vergleichbar:** Rundendauer 0,5–3 min, Serienbonus, ungleiche Farbverteilung (Folgefarbe doppelt so häufig) und Wiederholungen ohne Kontrolle erlauben Lern- und Bahnungseffekte, die für saubere Messung kontrolliert werden müssten (Braem et al., 2019). Dazu kommt das Gerät (Touch-Latenz, Bildschirmgröße bestimmt Knopf- und Schriftgröße).
- **Alter:** Der Stroop-Effekt selbst ist bei Älteren nicht spezifisch größer; der scheinbare Nachteil erklärt sich durch allgemeine Verlangsamung (20 Studien; Verhaeghen & De Meersman, 1998; Rey-Mermet & Gade, 2018). Das feste 1,7-s-Startfenster ohne leichtere Stufe benachteiligt ältere Spieler:innen trotzdem stark, ebenso die Farbunterscheidung und die kleine Beschriftung (Abschnitt 4).
- **Lesen und Sprache:** Kinder mit Legasthenie zeigten am Computer einen *größeren* Stroop-Effekt als gleichaltrige gute Leser:innen (24 Kinder, 2.–5. Klasse; Faccioli et al., 2008). Die Übung verlangt zusätzlich Lesen unter Zeitdruck. Für italienischsprachige Kundschaft zeigt die deutsche Seite Deutsch, andere Sprachversionen Englisch.
- **Aufmerksamkeitsprobleme:** Bei ADHS ist die Stroop-Interferenz im Mittel erhöht (19 Studien mit Quotientenmaß; Lansbergen et al., 2007). Die Übung ist kein Test dafür, und ein schlechtes Ergebnis sagt nichts über eine Diagnose.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: mittel.** Über Hunderte Durchgänge sinkt die Stroop-Interferenz bei Jüngeren und Älteren, verschwindet aber nicht (Davidson et al., 2003). 56 Personen zwischen 60 und 84 Jahren verringerten sie in 6 Sitzungen; Rückmeldung änderte das nicht (Wilkinson & Yang, 2012). Im Original steigen die Punkte vermutlich vor allem durch schnelleres Lesen und Suchen und durch Spielstrategie (Herleitung).
- **Naher Transfer: schwach.** Die Verbesserung bei Wilkinson & Yang (2012) war nicht an bestimmte Wort-Farb-Paare gebunden, übertrug sich aber nicht auf andere Aufgaben. Adaptives Go/No-Go- und Stop-Signal-Training übertrug sich nicht einmal auf Stroop (Enge et al., 2014). Bei Kindern ist ferner Transfer von Hemm-, Arbeitsgedächtnis- und Flexibilitätstraining nicht belegt (g = 0,11, n. s.; Kassai et al., 2019).
- **Alltagstransfer: fehlend.** Keine Studie zeigt, dass Stroop-Übung Ablenkbarkeit im Büro, im Verkehr oder durch Benachrichtigungen verringert. Computertraining wirkte bei gesunden Älteren insgesamt nur schwach, auf Aufmerksamkeit und Exekutivfunktionen nicht signifikant (g = 0,22 gesamt; 52 randomisierte Studien; Lampit et al., 2014).
- **Seriöse Formulierung:** „Du übst, die Schriftfarbe zu wählen und das Wort zu ignorieren. Mit Übung wirst du darin schneller; ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand den bekannten Stroop-Konflikt spielerisch erleben will; flüssig Deutsch (oder Englisch) liest; Farben sicher unterscheidet; eine kurze, fordernde Aufgabe unter Zeitdruck sucht.
- **Weniger passend, wenn …** eine verlässliche Verlaufsmessung gewünscht ist; langsamere oder ältere Personen üben sollen; Sprache oder Farbe nicht Teil der Aufgabe sein sollen. Dann ist die Blickfit-Umsetzung **Pfeil-Duell** die bessere Wahl (farb- und sprachfrei, adaptiv, misst Interferenz).
- **Vorsicht / anpassen bei …**
  - `farbsehschwaeche`: Die Antwort ist die Farbe; bei Grünschwäche sind Blau und Lila praktisch gleich. Pfeil-Duell wählen.
  - `lese_rechtschreib_schwaeche`, `kinder_unter_6`: Das Wort muss gelesen werden, die Knöpfe ebenfalls; bei Legasthenie ist die Interferenz größer (Faccioli et al., 2008). Vor dem Lesealter nicht lösbar.
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: ≈ 2 mm hohe Knopfschrift unten und breite Knopfreihe; Nahkorrektur für den Tablet-Abstand nötig, bei Gleitsicht Kopf statt Augen zu den äußeren Knöpfen drehen.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`: festes 1,7-s-Fenster, keine leichtere Stufe, sofort folgende Wörter; kann frustrieren. Kein Test- oder Therapieanspruch.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: roter Schimmer bei jedem Fehler, in der Schlussphase bis ≈ 2-mal pro Sekunde; gesättigte Farben auf Schwarz. Schimmer vorher abschalten.
  - `tremor_parkinson`: Berührung zählt beim Aufsetzen, ohne Pause zum nächsten Wort; versehentliche Tipps zählen als Fehler.
- **Kombiniert gut mit …** 202 (Wahlreaktion ohne Konflikt als Vergleich), 102 und 805 (Reaktionshemmung: Go/No-Go – eine andere Art von Hemmung), 204 (visuelle Suche in Reihenfolge), 208 (längere Konzentration).
- **Abgrenzung:** 202 verlangt eine Wahl ohne Konflikt, 102/805 das Unterdrücken einer Reaktion (Go/No-Go). Nur 201 enthält einen Konflikt zwischen Reizmerkmalen (Wort gegen Farbe); in Blickfit übernimmt das das Pfeil-Duell mit Richtung gegen Ort bzw. Nachbarn.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

**Schwächen des Originals.** Nur inkongruente Durchgänge und keine Reaktionszeit, also kein Interferenzmaß. Farbe als einziges Antwortmerkmal (Farbsehschwäche). Sprachabhängig: Deutsch bzw. Englisch, kein Italienisch. Beschriftete, ständig neu gemischte Knöpfe machen aus der Aufgabe eine Lese-Such-Aufgabe. Zeitbonus macht die Rundendauer unberechenbar. Strafschalter wirkungslos, Regeltext falsch (Abschnitt 2). Keine Einstiegsstufe für Langsamere. Leistungsstufen ohne Daten und rechnerisch unerreichbar. Roter Schimmer bei Fehlern.

**Blickfit-Umsetzung „Pfeil-Duell“ (`src/exercises/pfeil-duell/`)** – Unterschiede zum Original:
- **Farb- und sprachfrei:** Weißer Pfeil (#F1F5F9) auf dunklem Grund, gleich auf DE und IT. Es zählt die Richtung; der Platz ≈ 2° neben der Mitte (räumlicher Stroop) bzw. vier Nachbarpfeile (Flanker) lenken ab. Pfeil ≥ 54 px (≈ 1,5° bei 40 cm), bis 130 px (Viviani et al., 2024; `docs/wissenschaft/04`, Abschnitt 1).
- **Echte Bedingungen:** 50 % kongruent, 50 % inkongruent, höchstens 3 gleiche in Folge, keine direkte Wiederholung von Richtung oder Platz.
- **Feste, räumlich passende Tasten:** 2 bzw. 4 Ecktasten ≥ 80 px (≈ 15 mm), keine Beschriftung zu lesen; auch Pfeiltasten/Ziffernblock.
- **Stufenleiter 1–24:** 2 Richtungen → 4 Diagonalen (Hick: 2 → 4 Möglichkeiten) → Flanker → gemischt. Antwortfrist innerhalb einer Sprosse × 0,88 je Stufe (2.000 → ≈ 500 ms). Gewichtetes Up-Down (+0,25/−1) hält ≈ 80 % richtig; die Startstufe wird von Sitzung zu Sitzung übernommen.
- **Takt und Dauer:** Fixationskreuz 500 ms, Reiz bis Antwort/Frist, 500 ms Pause (+300 ms nach Fehlern), feste 66 s ohne Zeitbonus. Antworten unter 150 ms gelten als geraten und werden nicht gewertet.
- **Kennwerte:** erreichte Stufe (aus den Umkehrpunkten), Treffsicherheit, Median-Reaktionszeit richtiger Antworten und „Zeitverlust durch Täuschung“ (Median inkongruent − kongruent) als Zusatzwert.
- **Sicherheit und Texte:** kein bildschirmweites Blinken; Texte ohne Wirkversprechen („ob das im Alltag hilft, ist nicht belegt“).

**Weitere Empfehlungen.** Interferenz nur gemittelt über mehrere Sitzungen zeigen (Hedge et al., 2018). Getrennten „Check“ mit festen Parametern vom Spiel unterscheiden. Einen optionalen Farbwort-Modus nur mit farbsehschwäche-geprüfter Palette (kein Rot-Grün-Paar, kein Blau/Lila), Farbfeld **und** Wort auf festen Tasten und dem Hinweis „nicht geeignet bei Farbsehschwäche“ anbieten. Als weitere farbfreie Variante eignet sich ein Zahlen-Stroop (Schriftgröße gegen Zahlenwert), siehe `docs/wissenschaft/04`, Abschnitt 1.4.

## 11. Quellen

### Von der Website angegeben
- Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action: A theory of an act of control. *Psychological Review*, 91(3), 295–327. https://doi.org/10.1037/0033-295X.91.3.295 – **Prüfung:** DOI stimmt ✓ (im Fließtext falscher Vorname „Nelson J. Cowan“, richtig William B.); **stützt die Aussage der Website:** nein (Rennmodell des Stop-Signal-Paradigmas, nicht der Stroop-Interferenz; Verbruggen & Logan, 2008).
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience*, 13, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (ACC im vorderen, Colliculus superior und Pulvinar im hinteren System; keine Stroop-Daten, keine DLPFC-Rolle; nichts zu Training).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise für die Bildraten-Rechnung (stimmt, 240 Hz = 4,2 statt 4,1 ms, steht aber nicht bei Woods), nein als Beleg der Punktetabelle (einfache Reaktionszeit, n = 1.469, 60-Hz-LCD; keine Stroop-Werte).
- Nur im Fließtext: Stroop, J. R. (1935). Studies of interference in serial verbal reactions. *Journal of Experimental Psychology*, 18(6), 643–662. https://doi.org/10.1037/h0054651 – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Erstbeschreibung). MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. *Psychological Bulletin*, 109(2), 163–203. https://doi.org/10.1037/0033-2909.109.2.163 – **Prüfung:** DOI stimmt ✓; **stützt:** ja für „robuster Effekt, Lesen stark geübt“, teilweise für die Erklärung über Verarbeitungsgeschwindigkeit (von MacLeod als unzureichend bewertet).

### Weitere Fachliteratur
- Augustinova, M., Parris, B. A., & Ferrand, L. (2019). The loci of Stroop interference and facilitation effects with manual and vocal responses. *Frontiers in Psychology*, 10, 1786. https://doi.org/10.3389/fpsyg.2019.01786 – kleinere Interferenz bei manueller Antwort
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Braem, S., Bugg, J. M., Schmidt, J. R., Crump, M. J. C., Weissman, D. H., Notebaert, W., & Egner, T. (2019). Measuring adaptive control in conflict tasks. *Trends in Cognitive Sciences*, 23(9), 769–783. https://doi.org/10.1016/j.tics.2019.07.002 – Häufigkeits- und Wiederholungseffekte kontrollieren
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, 57(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 – kritische Schriftgröße im Alter
- Cohen, J. D., Dunbar, K., & McClelland, J. L. (1990). On the control of automatic processes: A parallel distributed processing account of the Stroop effect. *Psychological Review*, 97(3), 332–361. https://doi.org/10.1037/0033-295X.97.3.332 – abgestufte Automatisierung
- Davidson, D. J., Zacks, R. T., & Williams, C. C. (2003). Stroop interference, practice, and aging. *Aging, Neuropsychology, and Cognition*, 10(2), 85–98. https://doi.org/10.1076/anec.10.2.85.14463 – Übung verkleinert die Interferenz
- Dehaene, S., & Cohen, L. (2011). The unique role of the visual word form area in reading. *Trends in Cognitive Sciences*, 15(6), 254–262. https://doi.org/10.1016/j.tics.2011.04.003 – automatische Wortformerkennung
- Diamond, A. (2013). Executive functions. *Annual Review of Psychology*, 64, 135–168. https://doi.org/10.1146/annurev-psych-113011-143750 – Hemmung als Kern-Exekutivfunktion
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 40(4), 987–1001. https://doi.org/10.1037/a0036165 – kein Transfer von Hemmtraining
- Faccioli, C., Peru, A., Rubini, E., & Tassinari, G. (2008). Poor readers but compelled to read: Stroop effects in developmental dyslexia. *Child Neuropsychology*, 14(3), 277–283. https://doi.org/10.1080/09297040701290040 – größerer Stroop-Effekt bei Legasthenie
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize, Rot als Risikofaktor
- Hagger, M. S., Chatzisarantis, N. L. D., Alberts, H., Anggono, C. O., Batailler, C., Birt, A. R., … Zwienenberg, M. (2016). A multilab preregistered replication of the ego-depletion effect. *Perspectives on Psychological Science*, 11(4), 546–573. https://doi.org/10.1177/1745691616652873 – Ego-Depletion praktisch null
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, 50(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten
- Hölzel, B. K., Carmody, J., Vangel, M., Congleton, C., Yerramsetti, S. M., Gard, T., & Lazar, S. W. (2011). Mindfulness practice leads to increases in regional brain gray matter density. *Psychiatry Research: Neuroimaging*, 191(1), 36–43. https://doi.org/10.1016/j.pscychresns.2010.08.006 – Achtsamkeits-Aussage der Website (keine PFC-Zunahme)
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen bei Gleitsicht
- Kassai, R., Futo, J., Demetrovics, Z., & Takacs, Z. K. (2019). A meta-analysis of the experimental evidence on the near- and far-transfer effects among children's executive function skills. *Psychological Bulletin*, 145(2), 165–188. https://doi.org/10.1037/bul0000180 – kein ferner Transfer bei Kindern
- Kornblum, S., Hasbroucq, T., & Osman, A. (1990). Dimensional overlap: Cognitive basis for stimulus-response compatibility – A model and taxonomy. *Psychological Review*, 97(2), 253–270. https://doi.org/10.1037/0033-295X.97.2.253 – Reiz-Antwort-Kompatibilität
- Kral, T. R. A., Davis, K., Korponay, C., Hirshberg, M. J., Hoel, R., Tello, L. Y., Goldman, R. I., Rosenkranz, M. A., Lutz, A., & Davidson, R. J. (2022). Absence of structural brain changes from mindfulness-based stress reduction: Two combined randomized controlled trials. *Science Advances*, 8(20), eabk3316. https://doi.org/10.1126/sciadv.abk3316 – keine Strukturveränderung durch Achtsamkeitskurs
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine*, 11(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – Dosis und Wirkung von Computertraining
- Lansbergen, M. M., Kenemans, J. L., & van Engeland, H. (2007). Stroop interference and attention-deficit/hyperactivity disorder: A review and meta-analysis. *Neuropsychology*, 21(2), 251–262. https://doi.org/10.1037/0894-4105.21.2.251 – Interferenz bei ADHS
- MacDonald, A. W., III, Cohen, J. D., Stenger, V. A., & Carter, C. S. (2000). Dissociating the role of the dorsolateral prefrontal and anterior cingulate cortex in cognitive control. *Science*, 288(5472), 1835–1838. https://doi.org/10.1126/science.288.5472.1835 – DLPFC vs. ACC
- MacLeod, C. M., & Dunbar, K. (1988). Training and Stroop-like interference: Evidence for a continuum of automaticity. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 14(1), 126–135. https://doi.org/10.1037/0278-7393.14.1.126 – Interferenz entsteht durch Übung
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics*, 15(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Simulation für die Palettenprüfung
- Nee, D. E., Wager, T. D., & Jonides, J. (2007). Interference resolution: Insights from a meta-analysis of neuroimaging tasks. *Cognitive, Affective, & Behavioral Neuroscience*, 7(1), 1–17. https://doi.org/10.3758/CABN.7.1.1 – Netzwerk der Interferenzaufgaben
- Paramei, G. V., & Oakley, B. (2014). Variation of color discrimination across the life span. *Journal of the Optical Society of America A*, 31(4), A375–A384. https://doi.org/10.1364/JOSAA.31.00A375 – Farbunterscheidung im Alter
- Pardo, J. V., Pardo, P. J., Janer, K. W., & Raichle, M. E. (1990). The anterior cingulate cortex mediates processing selection in the Stroop attentional conflict paradigm. *Proceedings of the National Academy of Sciences*, 87(1), 256–259. https://doi.org/10.1073/pnas.87.1.256 – ACC im Stroop-Konflikt
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology*, 71(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Wahlreaktion, Übung und Kompatibilität
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest*, 17(1), 4–34. https://doi.org/10.1177/1529100615623267 – Fixationsort und Stroop-Stärke (nach Perret & Ducrot, 2010)
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review*, 25(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – Alter und Stroop
- Rey-Mermet, A., Gade, M., & Oberauer, K. (2018). Should we stop thinking about inhibition? Searching for individual and age differences in inhibition ability. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 44(4), 501–526. https://doi.org/10.1037/xlm0000450 – Hemmaufgaben korrelieren nur schwach
- Rosselli, M., Ardila, A., Santisi, M. N., Arecco, M. R., Salvatierra, J., Conde, A., & Lenis, B. (2002). Stroop effect in Spanish–English bilinguals. *Journal of the International Neuropsychological Society*, 8(6), 819–827. https://doi.org/10.1017/S1355617702860106 – Interferenz bei Zweisprachigen
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Zonenbreiten von Gleitsichtgläsern
- Vadillo, M. A., Gold, N., & Osman, M. (2016). The bitter truth about sugar and willpower: The limited evidential value of the glucose model of ego depletion. *Psychological Science*, 27(9), 1207–1214. https://doi.org/10.1177/0956797616654911 – Glukose-Aussage
- Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences*, 12(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 – Rennmodell gehört zum Stop-Signal
- Verhaeghen, P., & De Meersman, L. (1998). Aging and the Stroop effect: A meta-analysis. *Psychology and Aging*, 13(1), 120–126. https://doi.org/10.1037/0882-7974.13.1.120 – Alterseffekt durch Verlangsamung
- Viviani, G., Visalli, A., Finos, L., Vallesi, A., & Ambrosini, E. (2024). A comparison between different variants of the spatial Stroop task: The influence of analytic flexibility on Stroop effect estimates and reliability. *Behavior Research Methods*, 56(2), 934–951. https://doi.org/10.3758/s13428-023-02091-8 – Vorlage für das Pfeil-Duell
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1 Use of Color, SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI
- Wilkinson, A. J., & Yang, L. (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. *Psychology and Aging*, 27(3), 606–615. https://doi.org/10.1037/a0025926 – Übungseffekt ohne Transfer
