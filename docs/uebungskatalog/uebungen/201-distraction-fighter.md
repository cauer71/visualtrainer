---
# ===== Kennung =====
nr: 201
kennung: distraction-fighter
name: "Pfeil-Duell: Richtung trotz Ablenkung (räumlicher Stroop und Flanker)"
name_original: "Stroop-Test – Farb-Wort-Interferenz & Kognitive Inhibition (Distraction Fighter)"
kapitel: "Kognition & Aufmerksamkeit"
kapitel_original: "cognitive"
unterkapitel_original: "focus"
quelle_url: "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter"
blickfit_umsetzung: {kennung: "pfeil-duell", name: "Pfeil-Duell", unterschiede: "Farb- und sprachfreie Neugestaltung: weißer Pfeil, dessen Richtung zählt, während Platz (räumlicher Stroop) oder Nachbarpfeile (Flanker) ablenken; 50 % kongruente und 50 % inkongruente Durchgänge; feste, räumlich passende Tasten statt jedes Mal neu gemischter Textknöpfe; Fixationskreuz 500 ms und Pause 500 ms; Antwortfrist adaptiv 2.000 → ≈ 500 ms (gewichtetes Up-Down, ≈ 80 % richtig); feste Dauer 66 s ohne Zeitbonus; erfasst Median-Reaktionszeit und Interferenz (inkongruent − kongruent); Touch, Maus und Pfeiltasten; kein Bildschirmblitzen."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Ein weißer Pfeil erscheint auf dunklem Grund. Man tippt die Taste, die seiner Richtung entspricht, und lässt sich weder von seinem Platz noch von Nachbarpfeilen beeinflussen. Die Aufgabe steigert sich von zwei Richtungen über vier Diagonalrichtungen bis zu Nachbarpfeilen und einer Mischung beider Störungen; die Antwortfrist passt sich der eigenen Trefferquote an. Die Übung kommt ohne Farben und ohne Text aus und dauert etwa eine Minute."
ziel_funktionen: [inhibition, selektive_aufmerksamkeit]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 66
schwierigkeit_anpassung: "Stufe = max(bisherige Stufe, Punkte/1.750 + 1), sinkt nie (Code). Zeitfenster je Wort 1.700 ms (Stufe 1) → ≈ 1.390 (5) → ≈ 910 (10) → ≈ 530 (15) → ≈ 340 ms (20), bei langer Trefferserie bis 30 % kürzer (min. 120 ms). Ab Stufe 4 sechs statt vier Antwortknöpfe. Jeder Treffer +2 s (Uhr max. 60 s), jeder Fehler und jede Zeitüberschreitung −1 s – die nominell 45 s lange Runde dauert daher je nach Tempo ≈ 0,5–3 min."
messgroessen: ["Original: Punkte (100 × Serien-Multiplikator 1–3 × Stufenfaktor 1,0–1,5), Stufe, Treffer, Fehlklicks, Zeitüberschreitungen, Trefferquote, längste Serie, Note F–S+", "sinnvoll: Median-Reaktionszeit richtiger Antworten getrennt für kongruente, inkongruente und neutrale Durchgänge", "sinnvoll: Interferenz = Median-RT inkongruent − kongruent und Fehlerquote je Bedingung, nur über mehrere Sitzungen gemittelt"]

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
    visuelle_suche: 1
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
    lesen_sprache: 0
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
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["sicheres Unterscheiden von sechs Farben (Rot, Blau, Grün, Gelb, Lila, Orange) – die Schriftfarbe ist die gesuchte Antwort", "flüssiges Lesen kurzer deutscher Farbwörter (andere Sprachversionen zeigen englische Wörter); die Antwortknöpfe sind nur beschriftet", "Antworten innerhalb von 1,7 s schon auf Stufe 1", "Nahsicht für ≈ 2 mm hohe Großbuchstaben auf den Knöpfen (Tablet, 40 cm)"]
vorsicht_bei: [presbyopie_gleitsicht, sehbehinderung_niedriger_visus, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6, photosensitive_epilepsie, migraene_lichtempfindlich, tremor_parkinson]
geeignet_fuer: ["unter Zeitdruck Störendes ausblenden: die Richtung zählt, nicht der Platz und nicht die Nachbarn (räumlicher Stroop- und Flanker-Konflikt)", "schnell zwischen zwei bis vier Möglichkeiten wählen, ohne Farben oder Wörter lesen zu müssen", "kurze, fordernde Konzentrationsaufgabe, die auch bei Farbsehschwäche und unabhängig von der Lesefähigkeit möglich ist"]
weniger_geeignet_fuer: ["Menschen, die ruhig und ohne Zeitdruck üben sollen (die Antwortfrist wird bis auf etwa 0,5 s kürzer)", "Verlaufsmessung der Hemmfähigkeit aus einer einzelnen Sitzung (der Zeitverlust durch widersprüchliche Reize schwankt von Tag zu Tag stark)", "Üben des Lesens oder der Farbunterscheidung (beides spielt hier keine Rolle)", "Menschen mit Tremor oder Hand-Arm-Beschwerden bei schnellem Tippen"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Stroop-Interferenz sinkt mit Übung, verschwindet aber nicht (Davidson et al., 2003); bei 60–84-Jährigen gab es keinen Transfer auf andere Aufgaben (Wilkinson & Yang, 2012), und Hemmtraining überträgt sich generell kaum (Enge et al., 2014). Für das Pfeil-Duell selbst liegt keine Trainingsstudie vor; der Zeitverlust durch widersprüchliche Reize ist als persönlicher Einzelwert wenig zuverlässig (Hedge et al., 2018)."
aehnliche_uebungen: [202, 102, 805, 208, 206, 204, 108]
stichworte: ["Stroop", "Farbwort-Interferenz", "Interferenzkontrolle", "Inhibition", "selektive Aufmerksamkeit", "Lesen", "Farbsehschwäche", "Wahlreaktion", "Zeitdruck", "Pfeil-Duell", "räumlicher Stroop", "Flanker"]
---

# 201 · Pfeil-Duell: Richtung trotz Ablenkung (räumlicher Stroop und Flanker)

> Original: „Stroop-Test – Farb-Wort-Interferenz & Kognitive Inhibition“ (Spielname „Distraction Fighter“) – skilldrills.online, Kapitel Kognition & Aufmerksamkeit (`cognitive/focus`) · Blickfit: **Pfeil-Duell** (farb- und sprachfreie Neugestaltung, siehe Abschnitt 10)

## 1. Kurzbeschreibung

Auf dunklem Grund erscheint ein weißer Pfeil. Man tippt die Taste, die der Richtung des Pfeils entspricht, und ignoriert alles andere. Zuerst gibt es zwei Richtungen (links, rechts); der Pfeil steht links oder rechts der Mitte, und sein Platz kann der Richtung widersprechen (räumlicher Stroop-Effekt). Auf den nächsten Stufen folgen vier Diagonalrichtungen mit Tasten in den vier Ecken, dann ein mittlerer Pfeil zwischen Nachbarpfeilen, die gleich oder entgegengesetzt zeigen (Flanker-Aufgabe), und schließlich eine Mischung beider Störungen. Die Hälfte der Durchgänge ist widerspruchsfrei, die andere Hälfte widersprüchlich. Die Antwortfrist verkürzt sich von etwa 2 Sekunden bis auf etwa 0,5 Sekunden und passt sich so an, dass etwa vier von fünf Antworten richtig sind. Eine Sitzung dauert 66 Sekunden; Farben oder Wörter werden nicht gebraucht.

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
- **Effekt und Lesen:** Der Stroop-Effekt ist tatsächlich außerordentlich robust (MacLeod, 1991: ≈ 400 Studien, 18 verlässliche Befunde). Die Erklärung „das schnellere Lesen gewinnt das Rennen“ hat MacLeod aber als unzureichend bewertet. Besser passen Modelle mit abgestufter, durch Übung wachsender Automatisierung (Cohen et al., 1990). Wer neuen Formen Farbnamen zuordnen lernte, bei dem entstand nach ausgiebiger Übung Stroop-artige Interferenz durch die gelernten Formnamen (MacLeod & Dunbar, 1988) – Automatisierung wächst also mit Übung.
- **Logan & Cowan (1984):** Der Zweitautor heißt William B. Cowan. Das Rennmodell beschreibt das **Stop-Signal-Paradigma**, also das Abbrechen einer schon geplanten Handlung (Verbruggen & Logan, 2008), nicht die Stroop-Interferenz.
- **Hirnregionen:** Posner & Petersen (1990) beschreiben ein vorderes Aufmerksamkeitssystem mit ACC und ein hinteres Orientierungssystem (Parietallappen, Pulvinar des Thalamus, Colliculus superior); Stroop-Daten und eine DLPFC-Rolle stehen dort nicht. Richtige Belege siehe Abschnitt 5. „Training senkt den neuronalen Energieaufwand“ ist nicht belegt.
- **Transfer (Großraumbüro, Benachrichtigungen, Flanker):** nicht belegt. Stroop-Übung bei Älteren ergab keinen Transfer (Wilkinson & Yang, 2012). Elf Hemmaufgaben, darunter Farb-Stroop und Pfeil-Flanker, korrelierten nur schwach miteinander (Rey-Mermet et al., 2018). Wer Stroop übt, übt also nicht automatisch „Flanker-Resistenz“.
- **Achtsamkeit:** In der oft zitierten kleinen Studie (16 vs. 17 Personen) nahm die graue Substanz in Hippocampus, hinterem Cingulum, temporoparietalem Übergang und Kleinhirn zu, nicht im präfrontalen Kortex (Hölzel et al., 2011). Eine randomisierte Studie mit 218 Personen und aktiver Kontrollgruppe fand gar keine strukturellen Veränderungen (Kral et al., 2022).
- **Glukose und Dosis:** Das Glukose-Modell der Selbstkontrolle hat nur schwache Beweiskraft (Vadillo et al., 2016); der „Ego-Depletion“-Effekt war in 23 Laboren praktisch null (d = 0,04; Hagger et al., 2016). Für „3–5 min täglich“ gibt es keine Quelle. In einer Metaanalyse zu Computertraining bei Älteren waren mehr als 3 Einheiten pro Woche nicht wirksamer (Lampit et al., 2014).
- **Tipp „Buchstabenkanten fixieren“:** plausibel, denn die Interferenz ist bei Fixation der Wortmitte am stärksten (Rayner et al., 2016, nach Perret & Ducrot, 2010). Es ist aber eine Umgehung, die genau die geübte Anforderung senkt.
- **Leistungsstufen ohne Grundlage:** Die Seite erhebt nach eigener Angabe keine Nutzerdaten, keine Quelle enthält Werte für dieses Spiel. Zudem passen die Stufen nicht zum Code: Die Trefferquote erreicht rechnerisch höchstens ≈ 70 % (Abschnitt 2), die für Tier 1–4 geforderten 75–96 % sind praktisch unerreichbar. Die angebliche 45-s-Grundlage stimmt nicht.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Der Pfeil ist weiß auf dunklem Grund und am Tablet mindestens etwa 1,5° groß (bei 40 cm Abstand entspricht 1 cm etwa 1,4°); die Antworttasten sind große Flächen von mindestens etwa 15 mm. Die Sehschärfe begrenzt die Aufgabe daher kaum; entscheidend ist, die Richtung der Pfeilspitze rasch zu erkennen. Bei unkorrigierter Alterssichtigkeit lohnt es sich dennoch, mit der Nahbrille zu üben, damit Pfeil und Tasten ohne Anstrengung scharf sind.
- **Blickführung:** Ein Fixationskreuz zeigt 500 ms lang, wohin man schaut. Der Pfeil erscheint in der Mitte, beim räumlichen Stroop-Effekt um etwa 2° versetzt, bei der Flanker-Aufgabe von vier Nachbarpfeilen umgeben. Platz und Nachbarn liegen wenige Grad um den Blickpunkt; für die Entscheidung sind keine größeren Blicksprünge nötig. Nachbarreize in unmittelbarer Nähe des Ziels beeinflussen die Antwort auch dann, wenn man sie ignorieren soll (Eriksen & Eriksen, 1974).
- **Farbsehen:** Die Übung verlangt keine Farbunterscheidung (weißer Pfeil, Rückmeldung nie nur über Farbe). Eine Rot-Grün-Schwäche, die etwa 8 % der Männer und 0,4 % der Frauen betrifft (Birch, 2012), spielt für die Aufgabe daher keine Rolle.
- **Brille:** Pfeil und Tasten liegen in einem Bereich von höchstens einigen Zentimetern bis zur Bildschirmbreite. Bei Gleitsichtbrillen können die äußeren Tasten in den seitlichen Unschärfezonen liegen; deren Breite unterscheidet sich zwischen Glasdesigns um mehr als das Doppelte (Sheedy, 2004), und Gleitsicht-Neulinge bewegen den Kopf mehr (Hutchings et al., 2007). Das Gerät so zu halten, dass Pfeil und Tasten durch den Nah- bzw. Zwischenbereich gesehen werden, ist meist günstiger.
- **Licht:** Es gibt keine Vollbildblitze und keine Alarmfarben; die Reize bleiben klein und weiß auf dunklem Grund. Eine Unbedenklichkeit für lichtempfindliche Personen wird dennoch nicht behauptet (Rot und großflächige Blitze gelten als Risikofaktoren; Fisher et al., 2005).

## 5. Neurowissenschaftliche Grundlagen

- **Konfliktverarbeitung:** In einer frühen PET-Studie (n = 8) war der vordere cinguläre Kortex (ACC) bei widersprüchlichen Reizen im Stroop-Versuch am stärksten aktiv (Pardo et al., 1990). In einer fMRT-Studie war der linke dorsolaterale präfrontale Kortex (DLPFC) bei der Vorbereitung auf die Aufgabe aktiv (Aufgabenziel halten), der ACC bei widersprüchlichen Reizen (Konflikt erkennen) (MacDonald et al., 2000). Eine Metaanalyse von 47 Bildgebungsstudien zu Stroop, Flanker, Go/No-Go, Simon und Stop-Signal fand gemeinsame Aktivität in ACC, DLPFC, unterem Frontalgyrus, hinterem Parietalkortex und vorderer Insel (Nee et al., 2007).
- **Räumlicher Stroop-Effekt und Flanker-Effekt:** Beim klassischen Farb-Wort-Versuch (Stroop, 1935) stört das automatisch gelesene Wort die Farbbenennung; der Effekt gehört zu den am besten belegten der Psychologie (MacLeod, 1991: etwa 400 Studien) und wächst mit der Automatisierung (Cohen et al., 1990; MacLeod & Dunbar, 1988). Farb- und sprachfreie Varianten nutzen stattdessen den Platz des Reizes (räumlicher Stroop-Effekt: eine zur Antwort passende Position beschleunigt, eine widersprechende bremst; Lu & Proctor, 1995) oder Nachbarreize (Flanker-Aufgabe; Eriksen & Eriksen, 1974). Das Pfeil-Duell verwendet beide Varianten. Eine Vier-Richtungen-Aufgabe, bei der man die Richtung eines Pfeils angibt und seine Position in einer Bildschirmecke ignoriert, wurde als farb- und sprachfreie Alternative zum Farb-Wort-Versuch vorgeschlagen und mit Varianten verglichen (Viviani et al., 2024).
- **Einordnung:** Hemmung gilt als eine von drei Kern-Exekutivfunktionen, neben Arbeitsgedächtnis und kognitiver Flexibilität (Diamond, 2013). Als einheitliche, messbare Fähigkeit ist sie aber umstritten: Elf Hemmaufgaben, darunter Farb-Stroop und Pfeil-Flanker, korrelierten nur schwach miteinander (Rey-Mermet et al., 2018). Wer eine Variante übt, übt also nicht automatisch alle anderen; aus Aktivierungsstudien lässt sich auch nicht ableiten, dass die Übung bestimmte Hirnregionen „trainiert“.

## 6. Motorische Grundlagen

Pro Durchgang tippt man eine große Taste: motorisch einfach, die Zeit geht vor allem in Wahrnehmen, Entscheiden und Auswählen auf. Mit zwei bzw. vier Möglichkeiten (1 bzw. 2 bit) ist es eine Wahlreaktion; die Zeit steigt mit der Zahl der Möglichkeiten (Hick-Gesetz), bei räumlich passender Zuordnung und mit Übung aber weniger stark (Proctor & Schneider, 2018; Kornblum et al., 1990). Deshalb stehen die Tasten fest und räumlich passend zur Richtung (links/rechts bzw. in den vier Ecken); alternativ lassen sich Pfeiltasten verwenden. Tipps unmittelbar nach einer Antwort werden ignoriert, sodass ein versehentlicher Doppeltipp nicht als Fehler zählt. Touch-Web-Apps messen Zeiten um etwa 58–70 ms zu lang (Pronk et al., 2020); bei Antwortfristen um 0,5 s sind das 12–14 % der verfügbaren Zeit, was den Vergleich zwischen Geräten unscharf macht.

## 7. Einflussfaktoren und Messgrenzen

- **Zuverlässigkeit des Zusatzwerts:** Der Zeitverlust durch widersprüchliche Reize (Interferenz) ist als persönlicher Wert oft unzuverlässig (Test-Retest in sieben Aufgaben von 0 bis 0,82; Hedge et al., 2018) und schwankt von Tag zu Tag stark. Das Pfeil-Duell weist ihn deshalb nur als Zusatzwert aus; verlässlicher wird er, wenn man ihn über mehrere Sitzungen mittelt. Hauptwerte sind die erreichte Stufe, die Treffsicherheit und die Median-Reaktionszeit richtiger Antworten.
- **Kontrollierte Abfolge:** Häufigkeits- und Wiederholungseffekte verzerren Konfliktmaße (Braem et al., 2019). Darum sind die Durchgänge zur Hälfte widerspruchsfrei und zur Hälfte widersprüchlich, höchstens drei gleichartige folgen aufeinander, und weder Richtung noch Platz wiederholen sich direkt. Antworten unter 150 ms nach Reizbeginn gelten als geraten und werden nicht gewertet.
- **Gerät:** Touch-Latenz und Bildschirmgröße (sie bestimmt Pfeil- und Tastengröße) beeinflussen die Zeiten; Vergleiche gelten nur auf demselben Gerät und mit derselben Eingabeart (Touch, Maus oder Pfeiltasten). Zeitmessungen am Menschen streuen stärker als an Prüfkörpern; eine hohe Korrelation zwischen zwei Verfahren bedeutet noch keine Übereinstimmung (Grundsatz aus der Hornhautvermessung: Mountford et al., 2004, S. 24 und 43–44).
- **Alter:** Der Stroop-Effekt ist bei Älteren in absoluten Zeiten größer (auch nach Übung: Davidson et al., 2003); der scheinbare Nachteil erklärt sich aber weitgehend durch allgemeine Verlangsamung (20 Studien; Verhaeghen & De Meersman, 1998). Ob Hemmung im Alter insgesamt nachlässt, ist je nach Aufgabe unterschiedlich und umstritten (Rey-Mermet & Gade, 2018). Die Antwortfrist beginnt großzügig bei etwa 2 s, und die Startstufe wird von Sitzung zu Sitzung übernommen.
- **Lesen und Sprache:** Beim klassischen Farb-Wort-Versuch zeigten Kinder mit Legasthenie einen größeren Stroop-Effekt als gleichaltrige gute Leser (24 Kinder, 2.–5. Klasse; Faccioli et al., 2008). Weil beim Pfeil-Duell weder Wörter noch Farben vorkommen, entfällt dieser Einfluss.
- **Aufmerksamkeitsprobleme:** Bei ADHS ist die Stroop-Interferenz im Mittel erhöht (19 Studien mit Quotientenmaß; Lansbergen et al., 2007). Die Übung ist kein Test dafür, und ein schwaches Ergebnis sagt nichts über eine Diagnose.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt: mittel.** Über Hunderte Durchgänge sinkt die Stroop-Interferenz bei Jüngeren und Älteren, verschwindet aber nicht (Davidson et al., 2003). 56 Personen zwischen 60 und 84 Jahren verringerten sie in 6 Sitzungen; Rückmeldung änderte das nicht (Wilkinson & Yang, 2012). Im Pfeil-Duell ist anzunehmen, dass die Antworten auch deshalb schneller werden, weil man Tasten, Ablauf und Strategie kennenlernt.
- **Naher Transfer: schwach.** Die Verbesserung bei Wilkinson & Yang (2012) war nicht an bestimmte Reiz-Paare gebunden, übertrug sich aber nicht auf andere Aufgaben. Adaptives Go/No-Go- und Stop-Signal-Training übertrug sich nicht einmal auf Stroop (Enge et al., 2014). Bei Kindern ließ sich keine Übertragung des Trainings einer Exekutivfunktion auf nicht trainierte Funktionen zeigen (g = 0,11, nicht signifikant; Kassai et al., 2019).
- **Alltagstransfer: fehlend.** Keine Studie zeigt, dass Hemmübungen Ablenkbarkeit im Büro, im Verkehr oder durch Benachrichtigungen verringern. Computertraining wirkte bei gesunden Älteren insgesamt nur schwach, auf Aufmerksamkeit und Exekutivfunktionen nicht signifikant (g = 0,22 gesamt; 52 randomisierte Studien; Lampit et al., 2014).
- **Praxisangabe, nicht belegt:** In der funktionellen Optometrie gilt es als sinnvoll, am eigenen Arbeitspunkt zu beginnen und in kleinen Schritten zu steigern; die selbstanpassende Antwortfrist folgt diesem Gedanken. Für Bildschirmübungen ist der Nutzen nicht untersucht.
- **Seriöse Formulierung:** „Du übst, auf die Richtung des Pfeils zu achten und Platz oder Nachbarn zu ignorieren. Mit Übung wirst du darin schneller; ob das im Alltag hilft, ist nicht belegt.“

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand den Konflikt zwischen Richtung und Ort bzw. Nachbarn kennenlernen und unter leichtem Zeitdruck üben möchte; keine Farben oder Wörter gelesen werden sollen; eine kurze, fordernde Aufgabe (etwa eine Minute) gesucht wird.
- **Weniger passend, wenn …** eine verlässliche Verlaufsmessung der Hemmfähigkeit gewünscht ist (der Zusatzwert schwankt stark), ruhig ohne Zeitdruck geübt werden soll oder motorische Beschwerden schnelles Tippen erschweren.
- **Vorsicht / anpassen bei …**
  - `presbyopie_gleitsicht`, `sehbehinderung_niedriger_visus`: Pfeil und Tasten sind groß; bei Gleitsicht Gerät so halten, dass Pfeil und Tasten im Nah- bzw. Zwischenbereich liegen; Nahkorrektur für den Tablet-Abstand.
  - `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6`: feste Dauer, die Frist passt sich an, folgt aber dicht aufeinander; kann frustrieren. Kein Test- oder Therapieanspruch.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: kein Blitz, aber rasche Reizfolge auf dunklem Grund; vorsichtshalber kurz probieren und bei Beschwerden abbrechen.
  - `tremor_parkinson`: Doppeltipps unmittelbar nach einer Antwort werden ignoriert; schnelles Tippen bleibt anstrengend.
  - Farbsehschwäche und Lese-Rechtschreib-Schwäche schränken diese Übung nicht ein (keine Farben, keine Wörter).
- **Warnzeichen:** Doppelbilder, plötzlicher einseitiger Sehverlust, Lichtblitze, neue Schleier, Kopfschmerz mit Sehverschlechterung oder neu auftretender Schwindel gehören ärztlich abgeklärt (Aufzählung der Warnsymptome in der Anamnese: Muchnick, 2008, S. 6, 17 und 28); ein Übungsprogramm ersetzt das nicht.
- **Kombiniert gut mit …** 202 (Wahlreaktion mit Zeitmessung als Vergleich), 102 und 805 (Reaktionshemmung, Go/No-Go – eine andere Art von Hemmung), 204 (geordnetes Suchen), 208 (längere Konzentration).
- **Abgrenzung:** 202 beschreibt die Wahlreaktion auf die Pfeilrichtung (zwei bzw. vier Möglichkeiten), 102 und 805 das Unterdrücken einer Reaktion (Go/No-Go). Nur 201 stellt den Konflikt zwischen Reizmerkmalen (Richtung gegen Ort bzw. Nachbarn) in den Mittelpunkt.

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
- Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. *Annual Review of Neuroscience*, 13, 25–42. https://doi.org/10.1146/annurev.ne.13.030190.000325 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise (ACC im vorderen, Colliculus superior und Pulvinar im hinteren System; keine Stroop-Daten, keine DLPFC-Rolle; nichts zu Training). – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, 9, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise für die Bildraten-Rechnung (stimmt, 240 Hz = 4,2 statt 4,1 ms, steht aber nicht bei Woods), nein als Beleg der Punktetabelle (einfache Reaktionszeit, n = 1.469, 60-Hz-LCD; keine Stroop-Werte). – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Stroop, J. R. (1935). Studies of interference in serial verbal reactions. *Journal of Experimental Psychology*, 18(6), 643–662. https://doi.org/10.1037/h0054651 – Erstbeschreibung des Stroop-Effekts – **Prüfung:** DOI stimmt ✓; **stützt:** ja (Erstbeschreibung).
- MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. *Psychological Bulletin*, 109(2), 163–203. https://doi.org/10.1037/0033-2909.109.2.163 – robuster Effekt, Lesen stark geübt – **Prüfung:** DOI stimmt ✓; **stützt:** ja für „robuster Effekt, Lesen stark geübt“.

### Weitere Fachliteratur
- Augustinova, M., Parris, B. A., & Ferrand, L. (2019). The loci of Stroop interference and facilitation effects with manual and vocal responses. *Frontiers in Psychology*, 10, 1786. https://doi.org/10.3389/fpsyg.2019.01786 – kleinere Interferenz bei manueller Antwort – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, 29(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche
- Braem, S., Bugg, J. M., Schmidt, J. R., Crump, M. J. C., Weissman, D. H., Notebaert, W., & Egner, T. (2019). Measuring adaptive control in conflict tasks. *Trends in Cognitive Sciences*, 23(9), 769–783. https://doi.org/10.1016/j.tics.2019.07.002 – Häufigkeits- und Wiederholungseffekte kontrollieren
- Calabrèse, A., Cheong, A. M. Y., Cheung, S.-H., He, Y., Kwon, M., Mansfield, J. S., Subramanian, A., Yu, D., & Legge, G. E. (2016). Baseline MNREAD measures for normally sighted subjects from childhood to old age. *Investigative Ophthalmology & Visual Science*, 57(8), 3836–3843. https://doi.org/10.1167/iovs.16-19580 – kritische Schriftgröße im Alter – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Cohen, J. D., Dunbar, K., & McClelland, J. L. (1990). On the control of automatic processes: A parallel distributed processing account of the Stroop effect. *Psychological Review*, 97(3), 332–361. https://doi.org/10.1037/0033-295X.97.3.332 – abgestufte Automatisierung
- Davidson, D. J., Zacks, R. T., & Williams, C. C. (2003). Stroop interference, practice, and aging. *Aging, Neuropsychology, and Cognition*, 10(2), 85–98. https://doi.org/10.1076/anec.10.2.85.14463 – Übung verkleinert die Interferenz
- Dehaene, S., & Cohen, L. (2011). The unique role of the visual word form area in reading. *Trends in Cognitive Sciences*, 15(6), 254–262. https://doi.org/10.1016/j.tics.2011.04.003 – automatische Wortformerkennung – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Diamond, A. (2013). Executive functions. *Annual Review of Psychology*, 64, 135–168. https://doi.org/10.1146/annurev-psych-113011-143750 – Hemmung als Kern-Exekutivfunktion
- Enge, S., Behnke, A., Fleischhauer, M., Küttler, L., Kliegel, M., & Strobel, A. (2014). No evidence for true training and transfer effects after inhibitory control training in young healthy adults. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 40(4), 987–1001. https://doi.org/10.1037/a0036165 – kein Transfer von Hemmtraining
- Eriksen, B. A., & Eriksen, C. W. (1974). Effects of noise letters upon the identification of a target letter in a nonsearch task. *Perception & Psychophysics*, 16(1), 143–149. https://doi.org/10.3758/BF03203267 – Flanker-Aufgabe
- Faccioli, C., Peru, A., Rubini, E., & Tassinari, G. (2008). Poor readers but compelled to read: Stroop effects in developmental dyslexia. *Child Neuropsychology*, 14(3), 277–283. https://doi.org/10.1080/09297040701290040 – größerer Stroop-Effekt bei Legasthenie
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, 46(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize, Rot als Risikofaktor
- Hagger, M. S., Chatzisarantis, N. L. D., Alberts, H., Anggono, C. O., Batailler, C., Birt, A. R., … Zwienenberg, M. (2016). A multilab preregistered replication of the ego-depletion effect. *Perspectives on Psychological Science*, 11(4), 546–573. https://doi.org/10.1177/1745691616652873 – Ego-Depletion praktisch null – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Hedge, C., Powell, G., & Sumner, P. (2018). The reliability paradox: Why robust cognitive tasks do not produce reliable individual differences. *Behavior Research Methods*, 50(3), 1166–1186. https://doi.org/10.3758/s13428-017-0935-1 – Zuverlässigkeit von Differenzwerten
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., Wells, K. A., & Lillakas, L. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, 27(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopfbewegungen bei Gleitsicht
- Hölzel, B. K., Carmody, J., Vangel, M., Congleton, C., Yerramsetti, S. M., Gard, T., & Lazar, S. W. (2011). Mindfulness practice leads to increases in regional brain gray matter density. *Psychiatry Research: Neuroimaging*, 191(1), 36–43. https://doi.org/10.1016/j.pscychresns.2010.08.006 – Achtsamkeits-Aussage der Website (keine PFC-Zunahme) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Kassai, R., Futo, J., Demetrovics, Z., & Takacs, Z. K. (2019). A meta-analysis of the experimental evidence on the near- and far-transfer effects among children's executive function skills. *Psychological Bulletin*, 145(2), 165–188. https://doi.org/10.1037/bul0000180 – keine Übertragung auf nicht trainierte Exekutivfunktionen bei Kindern
- Kornblum, S., Hasbroucq, T., & Osman, A. (1990). Dimensional overlap: Cognitive basis for stimulus-response compatibility – A model and taxonomy. *Psychological Review*, 97(2), 253–270. https://doi.org/10.1037/0033-295X.97.2.253 – Reiz-Antwort-Kompatibilität
- Kral, T. R. A., Davis, K., Korponay, C., Hirshberg, M. J., Hoel, R., Tello, L. Y., Goldman, R. I., Rosenkranz, M. A., Lutz, A., & Davidson, R. J. (2022). Absence of structural brain changes from mindfulness-based stress reduction: Two combined randomized controlled trials. *Science Advances*, 8(20), eabk3316. https://doi.org/10.1126/sciadv.abk3316 – keine Strukturveränderung durch Achtsamkeitskurs – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine*, 11(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756 – Dosis und Wirkung von Computertraining
- Lansbergen, M. M., Kenemans, J. L., & van Engeland, H. (2007). Stroop interference and attention-deficit/hyperactivity disorder: A review and meta-analysis. *Neuropsychology*, 21(2), 251–262. https://doi.org/10.1037/0894-4105.21.2.251 – Interferenz bei ADHS
- Lu, C.-H., & Proctor, R. W. (1995). The influence of irrelevant location information on performance: A review of the Simon and spatial Stroop effects. *Psychonomic Bulletin & Review*, 2(2), 174–207. https://doi.org/10.3758/BF03210959 – räumlicher Stroop-Effekt
- MacDonald, A. W., III, Cohen, J. D., Stenger, V. A., & Carter, C. S. (2000). Dissociating the role of the dorsolateral prefrontal and anterior cingulate cortex in cognitive control. *Science*, 288(5472), 1835–1838. https://doi.org/10.1126/science.288.5472.1835 – DLPFC vs. ACC
- Machado, G. M., Oliveira, M. M., & Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE Transactions on Visualization and Computer Graphics*, 15(6), 1291–1298. https://doi.org/10.1109/TVCG.2009.113 – Simulation für die Palettenprüfung – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- MacLeod, C. M., & Dunbar, K. (1988). Training and Stroop-like interference: Evidence for a continuum of automaticity. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 14(1), 126–135. https://doi.org/10.1037/0278-7393.14.1.126 – Interferenz entsteht durch Übung
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgrundsätze: Streuung am Menschen, Korrelation ist keine Übereinstimmung (S. 24, 43–44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnsymptome des Auges und neurologische Warnzeichen (S. 6, 17, 28)
- Nee, D. E., Wager, T. D., & Jonides, J. (2007). Interference resolution: Insights from a meta-analysis of neuroimaging tasks. *Cognitive, Affective, & Behavioral Neuroscience*, 7(1), 1–17. https://doi.org/10.3758/CABN.7.1.1 – Netzwerk der Interferenzaufgaben
- Paramei, G. V., & Oakley, B. (2014). Variation of color discrimination across the life span. *Journal of the Optical Society of America A*, 31(4), A375–A384. https://doi.org/10.1364/JOSAA.31.00A375 – Farbunterscheidung im Alter – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Pardo, J. V., Pardo, P. J., Janer, K. W., & Raichle, M. E. (1990). The anterior cingulate cortex mediates processing selection in the Stroop attentional conflict paradigm. *Proceedings of the National Academy of Sciences*, 87(1), 256–259. https://doi.org/10.1073/pnas.87.1.256 – ACC im Stroop-Konflikt
- Proctor, R. W., & Schneider, D. W. (2018). Hick's law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology*, 71(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Wahlreaktion, Übung und Kompatibilität
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, 52(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Latenz
- Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? *Psychological Science in the Public Interest*, 17(1), 4–34. https://doi.org/10.1177/1529100615623267 – Fixationsort und Stroop-Stärke (nach Perret & Ducrot, 2010) – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Rey-Mermet, A., & Gade, M. (2018). Inhibition in aging: What is preserved? What declines? A meta-analysis. *Psychonomic Bulletin & Review*, 25(5), 1695–1716. https://doi.org/10.3758/s13423-017-1384-7 – Alter und Stroop
- Rey-Mermet, A., Gade, M., & Oberauer, K. (2018). Should we stop thinking about inhibition? Searching for individual and age differences in inhibition ability. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 44(4), 501–526. https://doi.org/10.1037/xlm0000450 – Hemmaufgaben korrelieren nur schwach
- Rosselli, M., Ardila, A., Santisi, M. N., Arecco, M. R., Salvatierra, J., Conde, A., & Lenis, B. (2002). Stroop effect in Spanish–English bilinguals. *Journal of the International Neuropsychological Society*, 8(6), 819–827. https://doi.org/10.1017/S1355617702860106 – Interferenz bei Zweisprachigen – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Sheedy, J. E. (2004). Progressive addition lenses—matching the specific lens to patient needs. *Optometry*, 75(2), 83–102. https://doi.org/10.1016/S1529-1839(04)70021-4 – Zonenbreiten von Gleitsichtgläsern
- Vadillo, M. A., Gold, N., & Osman, M. (2016). The bitter truth about sugar and willpower: The limited evidential value of the glucose model of ego depletion. *Psychological Science*, 27(9), 1207–1214. https://doi.org/10.1177/0956797616654911 – Glukose-Aussage – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Verbruggen, F., & Logan, G. D. (2008). Response inhibition in the stop-signal paradigm. *Trends in Cognitive Sciences*, 12(11), 418–424. https://doi.org/10.1016/j.tics.2008.07.005 – Rennmodell gehört zum Stop-Signal – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Verhaeghen, P., & De Meersman, L. (1998). Aging and the Stroop effect: A meta-analysis. *Psychology and Aging*, 13(1), 120–126. https://doi.org/10.1037/0882-7974.13.1.120 – Alterseffekt durch Verlangsamung
- Viviani, G., Visalli, A., Finos, L., Vallesi, A., & Ambrosini, E. (2024). A comparison between different variants of the spatial Stroop task: The influence of analytic flexibility on Stroop effect estimates and reliability. *Behavior Research Methods*, 56(2), 934–951. https://doi.org/10.3758/s13428-023-02091-8 – farb- und sprachfreie Vier-Richtungen-Aufgabe mit Pfeilen
- W3C (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 1.4.1 Use of Color, SC 2.3.1 Three Flashes). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI – in der öffentlichen Beschreibung nicht zitiert; **stützt (öffentliche Fassung):** nein
- Wilkinson, A. J., & Yang, L. (2012). Plasticity of inhibition in older adults: Retest practice and transfer effects. *Psychology and Aging*, 27(3), 606–615. https://doi.org/10.1037/a0025926 – Übungseffekt ohne Transfer
