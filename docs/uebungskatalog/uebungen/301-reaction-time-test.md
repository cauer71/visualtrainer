---
# ===== Kennung =====
nr: 301
kennung: reaction-time-test
name: "Sekunden schätzen (Zeitintervall treffen)"
name_original: "Reaktionstest – Visuelle Reaktionszeit in Millisekunden messen"
kapitel: "Reaktionsgeschwindigkeit"
kapitel_original: "reaction-speed"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/reaction-speed/reaction-time-test"
blickfit_umsetzung: {kennung: "sekunden-gefuehl", name: "Sekundengefühl", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/sekunden-gefuehl/)."}
stand: 2026-09-30

# ===== Überblick =====
kurzbeschreibung: "Eine Zielzeit wie '3,482 s' wird kurz angezeigt und verschwindet; dann läuft die Zeit unsichtbar, und man tippt oder klickt in dem Moment, in dem man glaubt, dass genau diese Zeit vergangen ist. Trotz des Namens ist es kein Reaktionstest, sondern eine Übung für das Zeitgefühl (Zeitproduktion im Sekundenbereich)."
ziel_funktionen: [antizipation, zeitliche_aufloesung]
eingabe: [maus, touch, touchpad]
tablet_geeignet: ja
dauer_sekunden: null   # unbegrenzt ("Freier Modus"), Ende durch Nutzer:in
schwierigkeit_anpassung: "Level = ⌊Punkte/250⌋ + 1, steigt nur (nie zurück). Zielzeit zufällig zwischen 1,0 s und min(8 s; 1,8 s + 0,45 s × Level): Level 1 bis 2,25 s, ab Level 14 bis 8 s. Anzeigedauer der Zielzeit 1,55 s → 0,5 s (−0,05 s je Level). Toleranz fest ±(50 ms + 5 % der Zielzeit), relativ also 10 % (1 s) → 5,6 % (8 s). Nach ≈ 25–30 Treffern in Folge ist der volle Bereich erreicht (eigene Rechnung)."
messgroessen: ["Original: Punkte, Level, Trefferquote, mittlerer absoluter Fehler (nur Treffer)", "sinnvoll: vorzeichenbehafteter mittlerer Fehler (zu früh/zu spät) je Zielzeit", "sinnvoll: Streuung relativ zur Zielzeit (Variationskoeffizient in %)", "sinnvoll: Trefferquote getrennt nach kurzen (1–3 s) und langen (5–8 s) Intervallen"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 0
    fixation: 1
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 3
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 2
    kurzzeitgedaechtnis_verbal: 1
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 3
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
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
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Dezimalzahlen mit drei Nachkommastellen verstehen ('4,372 s')", "Ziffern von ≈ 1,2° Sehwinkel lesen (am Bildschirm in 40–60 cm unkritisch)", "Tipp/Klick irgendwo auf die Fläche genügt – kein Zielen nötig", "ruhige Umgebung; Ablenkung verlängert und streut die geschätzten Zeiten"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, trockenes_auge_bildschirm, farbsehschwaeche, kognitive_einschraenkung, kinder_unter_6, aufmerksamkeitsprobleme]
geeignet_fuer: ["Zeitgefühl im Bereich 1–8 s üben (innere Uhr, Zählen, Rhythmus) mit Rückmeldung in Millisekunden", "ruhige Übung ohne Zielbewegung, Blicksprünge oder Handgeschicklichkeit – auch für Gleitsichtträger:innen und bei Hand-/Armbeschwerden", "Ergänzung zu echten Reaktionsaufgaben (101, 503) und zu Timing auf bewegte Reize (107, 409)"]
weniger_geeignet_fuer: ["Ziel 'Reaktionszeit messen oder üben' – die Übung misst keine Reaktionszeit (dafür 101, 503, 802)", "Vergleich zwischen Personen oder Geräten (Geräteverzögerung verschiebt jedes Ergebnis um mehrere 10 ms)", "Kinder, die Dezimalzahlen noch nicht lesen", "Menschen, die bei Wartezeiten ohne sichtbares Geschehen schnell ungeduldig werden"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zeitproduktion wird mit intensivem Üben gleichmäßiger und überträgt sich teilweise auf benachbarte Dauern und von Ton auf Bild (Bartolo & Merchant 2009); beim Unterscheiden kurzer Intervalle blieb der Gewinn auf die geübte Dauer beschränkt (Wright et al. 1997). Studien zu dieser Browserübung oder zu Alltagsnutzen gibt es nicht; die Trainingszahl der Website (15–30 ms) beruft sich auf eine Actionspiel-Übersicht (Dye et al. 2009), die diesen Wert nicht nennt."
aehnliche_uebungen: [101, 503, 107, 409, 407, 109, 802, 102, 202]
stichworte: ["Zeitschätzung", "Zeitproduktion", "Intervall-Timing", "innere Uhr", "Zeitgefühl", "Weber-Gesetz", "Zählen", "Rückmeldung in ms", "kein Reaktionstest", "Timing"]
---

# 301 · Sekunden schätzen (Zeitintervall treffen)

> Original: „Reaktionstest – Visuelle Reaktionszeit in Millisekunden messen“ – skilldrills.online, Kapitel
> Reaktionsgeschwindigkeit (`reaction-speed`) · Blickfit: noch nicht umgesetzt (verwandt: „Punktlandung“, Umsetzung von 107)

## 1. Kurzbeschreibung

In der Bildmitte erscheint kurz eine Zielzeit, z. B. „3,482 s“. Verschwindet sie, läuft unsichtbar die Zeit; man tippt
oder klickt irgendwo, wenn man glaubt, dass genau diese Zeit vergangen ist, und sieht sofort die eigene Zeit und die
Abweichung („+37 ms“). In der Toleranz gibt es Punkte und Kombo, sonst wackelt das Bild und blitzt rot. Die Seite nennt
das „Reaktionstest“ – tatsächlich geht es um **Zeitgefühl** (Zeitproduktion), nicht um Schnelligkeit.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `11618-…js`, Hilfsmodule für Level und Effekte, CSS-Effektklassen;
29.09.2026). Nur Mechanik ausgewertet, kein Code übernommen.

- **Ablauf (Code):** Vollbild → Countdown (2,6 s) → Durchgänge ohne Zeit- oder Anzahlgrenze; Ende per Schaltfläche,
  Escape oder Verlassen des Vollbilds. Startlevel immer 1.
- **Durchgang (Code):** (1) Zielzeit (3 Nachkommastellen, weiß, 64 px) mit ablaufendem Balken für max(0,5 s; 1,6 s −
  0,05 s × Level); Klicks zählen hier nicht. (2) Messphase ab dem Ausblenden: Punkt (r = 12 px), zwei gestrichelte Ringe,
  die sich gegenläufig drehen (≈ 69 °/s und ≈ 34 °/s), und ein Ring, der sich **genau im 1-s-Takt** von r = 75 auf 117 px
  ausdehnt und verblasst. (3) Ergebnis (eigene Zeit, Abweichung in ms in der Farbe der Bewertungsstufe) für max(0,5 s;
  1,2 s − 0,05 s × Level) oder per Klick sofort weiter.
- **Zielzeit (Code):** gleichverteilt zwischen 1,000 s und min(8 s; 1,8 s + 0,45 s × Level).
- **Treffer, Punkte (Code):** Toleranz T = 50 ms + 5 % der Zielzeit. Stufen: ≤ 10 ms „EXACT“ (Basis 25), ≤ 0,2 T (10),
  ≤ 0,4 T (8), ≤ 0,6 T (5), ≤ 0,8 T (3), ≤ T (1). Punkte = Basis × Kombo-Faktor × 10; Faktor 1 + 0,1 je Treffer in Folge,
  höchstens 3,0. Level = ⌊Punkte/250⌋ + 1, sinkt nie.
- **Fehlversuch (Code):** Kombo auf 0, Bildwackeln (12 px, abklingend in ≈ 0,3 s bei 60 Hz), rote Vollflächen-Überlagerung
  (Deckkraft 0,25, 125 ms) und – bei eingeschalteten Effekten – roter Radialverlauf (Mitte 50 %, 0,45 s). Punkte bleiben.
- **Eingabe (Code):** `pointerdown` auf der ganzen Fläche (Maus, Touch, Stift), **Ort egal**; Zeit per `performance.now()`
  im Handler (nicht Ereignis-Zeitstempel). Tastatur nur Escape. Töne bei Zielanzeige, Treffer, Fehler – kein Sekundenton.
- **Auswertung (Code):** Trefferquote; „Durchschnittsfehler“ = mittlerer *Betrag* **nur über Treffer**. Die Schlussnote
  bezieht die Punkte auf 5.000 – sie wächst mit der Spieldauer, nicht mit der Genauigkeit.
- **Eigene Rechnung:** relative Toleranz 10 % (1 s), 7,5 % (2 s), 6,3 % (4 s), 5,6 % (8 s); „EXACT“ (±10 ms) ist schmaler
  als ein Bild bei 60 Hz (16,7 ms). Zehn „GOOD“-Treffer in Folge ergeben Level 4, zwanzig Level 9; nach ≈ 25–30 Treffern
  ist Level 14 und damit der volle Bereich 1–8 s erreicht.

**Widersprüche Regeltext ↔ Code:** (1) „Warte auf das Signal und klicke sofort“ – es gibt kein Signal. (2) „Misst die
Signalübertragung Netzhaut → Fingerklick“, Tabelle in Reaktionszeiten – gemessen wird der Fehler einer Zeitschätzung.
(3) Anleitung („Zielintervall beachten“) und FAQ („Zeitintervallschätzung“) beschreiben die Mechanik richtig – die Seite
widerspricht sich selbst. (4) Der 1-s-Puls ist ein sichtbarer Taktgeber: Wer mitzählt, schätzt nur noch den Bruchteil
der letzten Sekunde.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt einen klassischen Reaktionstest (Mittel 200–250 ms, „< 180 ms Elite“, Tabelle von „< 150 ms
Übermenschlich/Top 1 %/F1-Fahrer“ bis „> 300 ms Gelegenheitsspieler“), Hörreize, Tastreize, Reflexe, Koffein, 60/144/240-Hz-
Monitore, „Training verkürzt die RT um 15–30 ms“; Zielgruppe Esport, FPS, Motorsport. Daneben: „Temporale Kalibrierung –
exaktes Zeitgefühl“ und „mentale Chronometrie (Zeitintervallschätzung)“. **Einordnung** (Einzelprüfung in Abschnitt 11):

- **Der Großteil des Textes passt nicht zur Übung** – Reaktionsnormen, Ton-/Tastvergleiche und Koffein betreffen einfache
  Reaktionen, die hier nicht gemessen werden.
- **Stufentabelle ohne Datengrundlage:** keine Quelle enthält Perzentile, Gaming-Ränge oder F1-Werte; die Seite sammelt
  selbst keine Daten. Kalibriert gemessen: 231 ms im Mittel, 213 ms ohne Hardwareanteil (n = 1.469; Woods et al., 2015).
- **Falscher Tipp** „periphere Stäbchen erfassen Blitze schneller“: Stäbchen-Reaktionen sind bei Dämmerungsbeleuchtung ≈ 20 ms
  *langsamer* als Zapfen-Reaktionen (Cao et al., 2007); am hellen Bildschirm arbeiten ohnehin die Zapfen.
- **Begriff falsch:** *Mentale Chronometrie* heißt, aus Reaktionszeiten auf Verarbeitungsstufen zu schließen (Donders).
  Die Übung ist eine **Zeitproduktionsaufgabe** – dafür nennt die Seite keine Quelle.
- **„Sub-Millisekunden-Präzision“** irreführend: `performance.now()` löst (ohne Cross-Origin-Isolation) auf 100 µs auf
  (MDN), und „keine Verzögerung durch Server-Übertragungen“ stimmt – aber Anzeige- und Eingabekette verlängern im Browser
  gemessene Reaktionszeiten um ≈ 58–133 ms (Pronk et al., 2020) – für 301 ein fester Versatz (Abschnitt 7).
- **„15–30 ms Trainingsgewinn“:** Dye et al. (2009) untersuchen Actionspiele und nennen keinen solchen Wert.
- **Zutreffend** ist nur der kleinere Teil: „Zeitgefühl ohne vorschnelles Raten oder Verzögern“.

## 4. Optische und okulomotorische Grundlagen

- **Sehschärfe (eigene Rechnung):** Zielzahl (Ziffernhöhe ≈ 45 px) am 24″-Full-HD-Monitor in 60 cm ≈ 12,5 mm ≈ 1,2°, am
  11″-Tablet in 40 cm ≈ 1,2°; ms-Abweichung ≈ 0,5°. Auch bei deutlich herabgesetztem Visus lesbar.
- **Blick:** Alles liegt in der Mitte (≈ 3° um den Punkt); keine Blickfolge, keine Sakkaden, keine Suche. **Gleitsicht**
  unkritisch, wenn die Mitte durch den Zwischenbereich gesehen wird (Bildschirm eher tiefer; mit Gleitsicht hält man den
  Kopf ≈ 7° höher, Jaschinski et al., 2015). Alterssichtige dürften 1,2°-Ziffern in 60 cm meist auch ohne Zwischenkorrektur lesen (eigene
  Einschätzung, nicht geprüft).
- **Farbe:** Die Bewertungsstufe steckt nur in der Farbe der ms-Zahl (Gold, Grün, Blau, Cyan, Orange, Magenta, Rot). Bei
  Rot-Grün-Schwäche (≈ 8 % der Männer; Birch, 2012) bleiben ms-Zahl, Wackeln und Ton – Relevanz gering.
- **Lichtreize (grobe eigene Rechnung, keine Messung):** Bei Fehlern steigt die relative Leuchtdichte der Mitte kurz von
  ≈ 0,002 auf ≈ 0,09 (ΔL ≈ 0,085, knapp unter der WCAG-Schwelle 0,10); Rotanteil 0,63 (sRGB) bzw. 0,86 (linear), also
  Grenzbereich „roter Blitz“. Da nach jedem Fehler ≥ 0,5 s Zielanzeige folgt, sind höchstens ≈ 2 Blitze/s möglich (< 3/s;
  W3C, 2024). Rot bleibt ein Risikofaktor für lichtausgelöste Anfälle (Fisher et al., 2005).
- **Trockenes Auge:** Starren auf die Mitte bis 8 s; am Bildschirm fällt die Blinzelrate im Mittel auf ein Fünftel (Patel
  et al., 1991). **Stereosehen** wird nicht gebraucht.

## 5. Neurowissenschaftliche Grundlagen

- **Zeitnetzwerk:** Zeitverarbeitung im Sekundenbereich stützt sich auf Kleinhirn, supplementär-motorisches Areal,
  präfrontalen und parietalen Kortex und Basalganglien (Grondin, 2010); Merchant et al. (2013) beschreiben einen
  kortiko-thalamo-basalganglionären Kernmechanismus mit aufgabenabhängigen Arealen. Ein „Training“ bestimmter Regionen durch
  diese Übung ist nicht belegt.
- **Weber-Gesetz:** Die Streuung wächst grob proportional zur Dauer; zwischen 1 und 2 s ist der Weber-Bruch aber nicht
  konstant (bei 1,5–2 s höher als bei 1 s). Beim Unterscheiden von 500-ms-Intervallen lag er für Lichtsignale höher
  (≈ 7–28 %) als für Töne (≈ 4–10 %). Beim Unterscheiden hilft explizites Zählen ab ≈ 1,2 s (alles Grondin, 2010,
  Übersicht) – der 1-s-Puls liefert das Zählraster mit. Werte für Zeit*produktion* von 1–8 s nennt die Übersicht nicht.
- **Aufmerksamkeit/Gedächtnis:** Nebenaufgaben machten 2- und 5-s-Produktionen länger und/oder variabler, und über viele
  Durchgänge wurden Produktionen allmählich länger (Brown, 1997). Die Zielzahl muss im Arbeitsgedächtnis bleiben.
- Die von der Seite beschriebene Kette Netzhaut → V1 → Motorkortex bestimmt hier nur den konstanten Startversatz.

## 6. Motorische Grundlagen

Ein Tipp/Klick an beliebiger Stelle – keine Zielbewegung, kein Fitts'sches Gesetz, keine Präzision; Tremor stört kaum.
Relevant ist nur das Timing des Auslösens; Schalterweg bzw. Touch-Erkennung gehen als fester Versatz in die Abweichung ein.

## 7. Einflussfaktoren und Messgrenzen

- **Geräteversatz:** Die Messung startet beim programmseitigen Ausblenden; gesehen wird es erst nach der Anzeigeverzögerung,
  und der Klick zählt erst nach der Eingabeverzögerung – beide addieren sich zur gemessenen Zeit (eigene Analyse).
  Ende-zu-Ende-Latenz: 1000-Hz-Maus mit nativer Anwendung 36,6 ms (60 Hz) bzw. 21,1 ms (120 Hz); Tippen auf Smartphones
  und Tablets 48–276 ms je nach Gerät, System und Programmierumgebung; iPad Air 2, Safari mit Canvas 77 ms (Casiez et
  al., 2017). Wer exakt schätzt, wird „zu spät“ gewertet und gleicht das über die Rückmeldung aus –
  Ergebnisse sind **nur auf demselben Gerät vergleichbar**; „EXACT“ hängt stark von Zufall und Gerät ab.
- **Messgrößen:** Der „Durchschnittsfehler“ ignoriert Fehlversuche und Vorzeichen; die Schlussnote misst Spieldauer.
- **Strategie:** Mit Pulszählen und drehenden Ringen als „Uhr“ wird die Aufgabe teilweise extern getaktet.
- **Alter/Zustand:** Ablenkung verlängert und streut Produktionen (Brown, 1997); Ältere produzieren im Mittel kürzere Dauern und schätzen variabler (Meta-Analyse; Block et al., 1998).
- **Übungseffekt:** schnelle Verbesserung, teils durch Anpassen an Gerät und Pulsraster statt durch „besseres Zeitgefühl“.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Intensives Üben von 450-, 650- oder 850-ms-Produktionen senkte die Streuung deutlich (Bartolo
  & Merchant, 2009). Für 1–8 s mit visuellem Taktgeber fehlen passende Studien.
- **Naher Transfer – schwach:** Bei Bartolo & Merchant (2009) übertrug sich das Gelernte auf Bildreize und benachbarte
  Dauern, abnehmend mit dem Abstand; beim Unterscheiden von Intervallen blieb der Gewinn nach 10 × 1 h auf die geübte Dauer
  (100 ms) beschränkt (Wright et al., 1997).
- **Alltagstransfer – fehlend:** Keine Studie zeigt Nutzen dieser oder ähnlicher Übungen für Spiel, Sport oder Verkehr.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Zeitgefühl, Rhythmus oder geduldiges Abwarten mit präziser Rückmeldung gewünscht sind; eine ruhige
  Übung ohne Blicksprünge, Zielbewegungen und Handgeschick gesucht wird (Gleitsicht, Hand-/Armbeschwerden, Tremor); als
  ruhiger Kontrast zu schnellen Reaktionsübungen.
- **Weniger passend, wenn …** Reaktionsgeschwindigkeit das Ziel ist (101, 503, 802; Wahl/Hemmung 202, 102); Ergebnisse
  zwischen Personen oder Geräten verglichen werden sollen; Kinder noch keine Dezimalzahlen lesen.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (roter Blitz bei jedem Fehler,
  unter den WCAG-Grenzen, aber rot; Effekte abschalten); `trockenes_auge_bildschirm` (langes Fixieren, Blinzelpausen);
  `farbsehschwaeche` (Stufe nur per Farbe, gering); `kognitive_einschraenkung`, `kinder_unter_6` (abstrakte Zahlen);
  `aufmerksamkeitsprobleme` (bis 8 s Warten ohne Geschehen, Kombo-Frust; kurze Serien).
- **Kombiniert gut mit …** 101 (echte einfache Reaktion), 107 (Timing auf herankommende Kugel), 409/407 (Vorhersage bei
  Verdeckung), 109 (Takt-Unterschiede); als ruhiger Kontrast zu einer schnellen Übung aus 302–308.
- **Überschneidungen:** Mit 101 (Light Reaction) und 503 (Instant Response) teilt 301 nur den Namen „Reaktionstest“ und die
  ms-Rückmeldung – dort wird auf einen Reiz reagiert, hier gibt es keinen. Mit 102 (Go/No-Go) und 202 (Wahlreaktion) keine
  Gemeinsamkeit außer dem Klick; 802 (Lineal-Falltest) misst echte Reaktion. Inhaltlich am nächsten sind 107 (Timing auf einen
  sichtbar herankommenden Reiz) und 409/407 (Vorhersage während einer Verdeckung). Keine Dublette in 302–308: Diese nutzen eine
  gemeinsame Zeitdruck-Engine mit Zeigeaufgaben, 301 nicht.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Ehrlicher Name und Text** („Sekunden schätzen“), keine Reaktionszeit-Tabellen, Perzentile oder Gaming-Ränge.
- **Taktgeber als Stufe:** leicht mit 1-s-Puls, schwer ohne Puls und ohne drehende Ringe.
- **Messqualität:** `event.timeStamp` und tatsächlichen Anzeigezeitpunkt nutzen; Geräteversatz per kurzer Kalibrierung
  schätzen; Fehler mit Vorzeichen und Streuung (% der Zielzeit) getrennt zeigen, Fehlversuche einbeziehen.
- **Aufbau:** feste Serie (z. B. 12 Durchgänge), adaptive Toleranz (Staircase), Level auch abwärts, Note aus Genauigkeit.
- **Sicherheit/Barrierefreiheit:** kein roter Blitz, kein Wackeln; Bewertung als Text/Symbol; Tipp überall (Tablet ideal);
  Texte DE/IT; Blinzel-Hinweis.
- **Abgrenzung:** Blickfit hat mit „Blitzreaktion“ (101) eine echte Reaktionsaufgabe und mit „Punktlandung“ (107) Timing
  auf einen sichtbaren Reiz; 301 ergänzt *inneres* Timing ohne bewegten Reiz.

## 11. Quellen

### Von der Website angegeben

- Kosinski, R. J. (2008). *A literature review on reaction time*. Clemson University (ohne DOI). – **Prüfung:** nicht per
  DOI prüfbar, unbegutachtet; nur Fassung „Last updated September 2013“ gefunden und gelesen
  (http://www.cognaction.org/cogs105/readings/clemson.rt.pdf); **stützt:** teilweise (≈ 190 ms Licht, Computermessung
  ≈ 268 ms; keine „Elite“-Grenzen, Stäbchen-Reize *langsamer*). Für Zeitschätzung nicht einschlägig.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple
  reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI
  stimmt ✓ (Volltext PMC4374455); **stützt:** teilweise (231 ms; Hardware 17,8 ms mit 60-Hz-LCD + Gaming-Maus; 144/240 Hz,
  Perzentile und `performance.now()` kommen nicht vor).
- Jain, A., Bansal, R., Kumar, A., & Singh, K. D. (2015). A comparative study of visual and auditory reaction times on the
  basis of gender and physical activity levels of medical first year students. *International Journal of Applied and Basic
  Medical Research, 5*(2), 124–127. https://doi.org/10.4103/2229-516X.157168 – **Prüfung:** DOI stimmt ✓ (Volltext
  PMC4456887); **stützt:** teilweise (auditiv < visuell, n = 120; ms-Werte nur als Lehrbuchzitat).
- Shelton, J., & Kumar, G. P. (2010). Comparison between auditory and visual simple reaction times. *Neuroscience &
  Medicine, 1*(1), 30–32. https://doi.org/10.4236/nm.2010.11004 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:**
  teilweise (n = 14: 284 vs. 331 ms; nicht die absoluten 140–170 ms; „Hörrinde im Hirnstamm“ anatomisch falsch).
- Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). Increasing speed of processing with action video games. *Current
  Directions in Psychological Science, 18*(6), 321–326. https://doi.org/10.1111/j.1467-8721.2009.01660.x – **Prüfung:** DOI
  stimmt ✓ (Volltext PMC2871325); **stützt:** nein (Actionspiele: 50 h −13 % vs. −6 % RT; keine „15–30 ms“).
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom
  Health and Lifestyle Survey. *Psychology and Aging, 21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 –
  **Prüfung:** DOI stimmt ✓ (Abstract; Erratum 2009); **stützt:** teilweise (einfache RT bis ≈ 50 J. kaum langsamer;
  „18–24 J.“, „2–6 ms/Jahrzehnt“ und Trainingsaussage nicht im Abstract).
- Smith, A. (2002). Effects of caffeine on human behavior. *Food and Chemical Toxicology, 40*(9), 1243–1255.
  https://doi.org/10.1016/S0278-6915(02)00096-0 – **Prüfung:** DOI stimmt ✓ (Abstract); **stützt:** teilweise (mehr
  Wachheit, bessere einfache Aufgaben vor allem bei Müdigkeit; keine ms-Zahl).

### Weitere Fachliteratur

- Bartolo, R., & Merchant, H. (2009). Learning and generalization of time production in humans: Rules of transfer across
  modalities and interval durations. *Experimental Brain Research, 197*(1), 91–100. https://doi.org/10.1007/s00221-009-1895-1
  – Übungseffekt und Transfer bei Zeitproduktion (Abstract, PubMed 19543720).
- Grondin, S. (2010). Timing and time perception: A review of recent behavioral and neuroscience findings and theoretical
  directions. *Attention, Perception, & Psychophysics, 72*(3), 561–582. https://doi.org/10.3758/APP.72.3.561 – Weber-Bruch,
  Zählen, Hirnregionen.
- Merchant, H., Harrington, D. L., & Meck, W. H. (2013). Neural basis of the perception and estimation of time. *Annual
  Review of Neuroscience, 36*, 313–336. https://doi.org/10.1146/annurev-neuro-062012-170349 – Zeitnetzwerk (Abstract).
- Brown, S. W. (1997). Attentional resources in timing: Interference effects in concurrent temporal and nontemporal working
  memory tasks. *Perception & Psychophysics, 59*(7), 1118–1140. https://doi.org/10.3758/BF03205526 – Ablenkung und
  Zeitproduktion (Abstract, PubMed 9360484).
- Wright, B. A., Buonomano, D. V., Mahncke, H. W., & Merzenich, M. M. (1997). Learning and generalization of auditory
  temporal-interval discrimination in humans. *The Journal of Neuroscience, 17*(10), 3956–3963.
  https://doi.org/10.1523/JNEUROSCI.17-10-03956.1997 – Spezifität von Zeittraining.
- Block, R. A., Zakay, D., & Hancock, P. A. (1998). Human aging and duration judgments: A meta-analytic review. *Psychology
  and Aging, 13*(4), 584–596. https://doi.org/10.1037/0882-7974.13.4.584 – Alter.
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and
  button-equipped interactive systems. In *Proceedings of UIST '17* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606
  – Latenz Maus/Touch.
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web
  applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382.
  https://doi.org/10.3758/s13428-019-01321-2 – Browser-Verzögerung.
- Cao, D., Zele, A. J., & Pokorny, J. (2007). Linking impulse response functions to reaction time: Rod and cone reaction
  time data and a computational model. *Vision Research, 47*(8), 1060–1074. https://doi.org/10.1016/j.visres.2006.11.027 –
  Stäbchen langsamer.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Computer vision syndrome in presbyopia
  and beginning presbyopia: Effects of spectacle lens type. *Clinical and Experimental Optometry, 98*(3), 228–233.
  https://doi.org/10.1111/cxo.12248 – Kopfhaltung mit Gleitsicht.
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate
  and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 –
  Blinzelrate.
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3),
  313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review
  for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441.
  https://doi.org/10.1111/j.1528-1167.2005.31405.x – Rot als Risikofaktor.
- W3C (2024). *WCAG 2.2*, Kriterium 2.3.1 (Norm, keine DOI). https://www.w3.org/TR/WCAG22/ · MDN Web Docs (o. J.).
  *Performance: now()* (technische Dokumentation, abgerufen 29.09.2026).
  https://developer.mozilla.org/en-US/docs/Web/API/Performance/now – Blitzgrenzen; Zeitauflösung 100 µs.
