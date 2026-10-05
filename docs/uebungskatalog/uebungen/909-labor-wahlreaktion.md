---
# ===== Kennung =====
nr: 909
kennung: labor-wahlreaktion
name: "Wahlreaktion (zu einem Zeichen schnell die passende von 2 bis 6 Tasten tippen)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-wahlreaktion", name: "Wahlreaktion", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Nach einer zufälligen Wartezeit erscheint in der Mitte ein Zeichen – eine Farbe mit Form oder eine weiße Form. Man tippt unten so schnell wie möglich die passende Taste. Anzahl der Tasten (2 bis 6), Zeichenart, Antwortzeit, Wartezeit, Zeichengröße und Anzahl der Zeichen stellt man selbst ein; Hauptwert ist die Genauigkeit, dazu die Reaktionszeit."
ziel_funktionen: [entscheidung_wahlreaktion]
eingabe: [touch, maus, tastatur]
tablet_geeignet: ja
dauer_sekunden: 120
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-wahlreaktion/logic.ts): Anzahl der Zeichen 10–200 (Standard 40, gleichmäßig auf die Tasten verteilt), Anzahl der Tasten 2–6 (4), Zeichenart Farben mit Form / Formen ohne Farbe, Antwortzeit je Zeichen 300–3000 ms (1500), Wartezeit mindestens 300–3000 ms (600) und höchstens 300–5000 ms (1800), Zeichengröße 2–12 cm (6), Ton. Schwerer: mehr Tasten, kürzere Antwortzeit, Formen, kürzere und stärker schwankende Wartezeit. Faustregel der Übung (keine Vorgabe aus der Forschung): mehrere Durchläufe über 95 % → eine Einstellung schwerer, unter 80 % → leichter, immer nur eine Einstellung ändern."
messgroessen: ["Hauptwert: Genauigkeit (richtige Antworten an allen gezeigten Zeichen)", "richtige und falsche Antworten, keine Antwort (Antwortzeit abgelaufen)", "zu früh getippt (vor dem Zeichen oder in den ersten 100 ms danach; nicht gewertet)", "Reaktionszeit bis zur richtigen Antwort: Mittel, Median, Streuung", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (4 Tasten, Farben mit Form, 1500 ms, 40 Zeichen); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 0
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 1
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 1
    entscheidung_wahlreaktion: 3
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
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
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren, damit die Zeichengröße in Zentimetern stimmt", "Formen (Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz) sicher unterscheiden; Farben sind nie allein entscheidend", "Hand locker über der Mitte der Tasten; Tasten mindestens 56 px groß, auf dem Handy bei vielen Tasten in zwei Reihen", "Wahlweise Tastatur: Ziffern 1 bis 6 statt Tippen"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, farbsehschwaeche, aufmerksamkeitsprobleme, kognitive_einschraenkung]
geeignet_fuer: ["Schnell und richtig zwischen mehreren Möglichkeiten wählen (Zeichen der passenden Taste zuordnen)", "Den Austausch zwischen Tempo und Genauigkeit erleben: Genauigkeit und Zeit werden zusammen gezeigt", "Schwierigkeit über die Zahl der Tasten (2 bis 6) und die Antwortzeit stufenlos einstellen", "Vergleich mit sich selbst: Genauigkeit und Reaktionszeit über mehrere Durchläufe mit gleichen Einstellungen"]
weniger_geeignet_fuer: ["Messung der Reaktionsfähigkeit, etwa für Verkehr oder Beruf: keine Normwerte, Touch misst Zeiten zu lang", "Zielbewegung oder Handgenauigkeit üben (Tasten sind groß und fest)", "Randsehen oder Blickbewegungen üben", "Menschen mit Lichtempfindlichkeit, wenn kurze Antwortzeiten gewählt werden"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Die Wahlreaktionszeit steigt ungefähr linear mit dem Logarithmus der Zahl der Möglichkeiten (Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011) und wird durch Übung beeinflusst (Proctor & Schneider, 2018); in der geübten Aufgabe wird man schneller. Bei trainingsähnlicher Prüfung werden Verbesserungen überschätzt (Guo et al., 2025). Für diese Übung gibt es keine Studie, ein Nutzen im Alltag ist nicht belegt."
aehnliche_uebungen: [202, 703, 102, 806, 503, 924]
stichworte: ["Wahlreaktion", "Hick-Hyman-Gesetz", "Tempo und Genauigkeit", "Zeichen-Tasten-Zuordnung", "Farben mit Form", "zufällige Wartezeit", "zu früh getippt", "Reaktionszeit", "Labor"]
---

# 909 · Wahlreaktion (zu einem Zeichen schnell die passende von 2 bis 6 Tasten tippen)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Wahlreaktion“ (`src/exercises/labor-wahlreaktion/`, Kategorie Reaktion, Labor)

## 1. Kurzbeschreibung

In der Mitte steht ein Kreuz; nach einer zufälligen Wartezeit erscheint dort ein Zeichen. Unten liegen 2 bis 6 Tasten mit denselben Zeichen, und man tippt so schnell wie möglich die passende. Bei „Farben“ trägt jede Farbe zusätzlich eine Form (Kreis, Dreieck, Quadrat, Stern, Raute, Kreuz), auf dem Zeichen wie auf der Taste; bei „Formen“ gibt es weiße Formen ohne Farbe. Wer vor dem Zeichen oder in den ersten 100 Millisekunden danach tippt, war „zu früh“ – das zählt nicht. Die Übung hat keine Stufen, sondern **Einstellungen**: Anzahl der Zeichen (Standard 40), Anzahl der Tasten (4), Zeichenart, Antwortzeit je Zeichen (1,5 s), kürzeste und längste Wartezeit (0,6 bis 1,8 s) und Zeichengröße in Zentimetern. Hauptwert ist die Genauigkeit; dazu kommen Reaktionszeit (Mittel, Median, Streuung) sowie falsche, verpasste und zu frühe Antworten.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`ChoiceSession`), `texts.ts`, `science.ts` in `src/exercises/labor-wahlreaktion/` (Stand 05.10.2026).

- **Ablauf je Zeichen:** Kreuz → zufällige Wartezeit zwischen `waitMinMs` und `waitMaxMs` (nur über `ctx.rng`) → Zeichen → Antwort. Keine Antwort innerhalb der Antwortzeit = „keine Antwort“.
- **Verteilung:** `makeStimuli` mischt die Zeichen blockweise, sodass jede Taste gleich oft drankommt.
- **Zu früh:** Tipp vor dem Zeichen oder in den ersten 100 ms danach kann keine Reaktion sein (auch Ereigniszeit und Bildzeit liegen bis zu einem Bild auseinander) → „zu früh“, nicht gewertet, das Zeichen bleibt stehen. Ein zweiter Tipp innerhalb 350 ms nach einer Antwort wird ignoriert.
- **Tasten:** Mindestkantenlänge 56 px, bei vielen Tasten auf schmalen Bildschirmen zwei Reihen (`answerLayout`); Tastatur: Ziffern 1 bis Zahl der Tasten.
- **Zeichen:** Größe in cm über die Kalibrierung, auf der Bühne begrenzt. Farben: Blau, Orange, Türkis, Flieder, Rosa, Gelb, jeweils mit eigener Form.
- **Rückmeldung:** ✓ oder ✗ am Zeichen; bei Fehler oder verpasstem Zeichen zusätzlich ein gestrichelter Ring um die richtige Taste; keine farbigen Blitze, keine Vollflächeneffekte; Ton nur, wenn eingestellt.
- **Schnellmodus** (`?quick=1`): 6 Zeichen, Wartezeit höchstens 1 s. Intro-Film: 4 Zeichen mit 3 Tasten, einmal absichtlich zu früh getippt.
- **Ergebnis:** Hauptwert Genauigkeit; dazu Reaktionszeit (nur richtige Antworten) Mittel/Median/Streuung, falsche, keine und zu frühe Antworten; persönlicher Tipp nach Faustregeln (≥ 95 % bei mindestens 20 Zeichen → schwerer). Vergleich nur bei gleichen Einstellungen (Ton ausgenommen).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Zahl der Möglichkeiten:** Je mehr Antwortmöglichkeiten, desto länger dauert die Wahlreaktion im Mittel; die Zeit steigt ungefähr linear mit dem Logarithmus der Zahl der Möglichkeiten (Hick, 1952; Hyman, 1953; Schneider & Anderson, 2011). Die Zahl der Tasten ist deshalb die wichtigste Einstellung.
- **Zuordnung:** Der Zusammenhang hängt davon ab, wie selbstverständlich Zeichen und Taste zusammenpassen, und wird von Übung und Wiederholungen beeinflusst (Proctor & Schneider, 2018). Deshalb tragen Zeichen und Taste dieselbe Form.
- **Tempo und Genauigkeit:** Wer schneller entscheidet, macht im Allgemeinen mehr Fehler (Heitz, 2014) – beide Werte werden zusammen gezeigt, die Genauigkeit ist Hauptwert.
- **Zufällige Wartezeit:** Ihre Dauer und die der vorigen Wartezeit beeinflussen die Reaktionszeit (Han & Proctor, 2022); die Zufälligkeit verhindert, dass man den Zeitpunkt errät.
- **Was nicht belegt ist:** schnelleres Reagieren im Verkehr, Sport oder Beruf durch diese Übung.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Bei 50 cm Abstand entspricht 1 cm etwa 1,15°; das Standardzeichen (6 cm) misst etwa 6,9°, das kleinste (2 cm) etwa 2,3° (eigene Rechnung). Sehschärfe und Kontrast begrenzen die Leistung kaum.
- **Blick:** Das Zeichen erscheint in der Mitte, auf die man schaut; ein Blick zu den Tasten ist nach wenigen Durchgängen meist nicht mehr nötig, weil man ihre Plätze kennt. Wer zu den Tasten schaut, verliert Zeit.
- **Farbe und Form:** Rot-Grün-Farbsehschwäche betrifft etwa 8 % der Männer und 0,4 % der Frauen in Europa (Birch, 2012). Weil jede Farbe zusätzlich eine Form trägt und „Formen“ ganz ohne Farbe auskommt, ist die Aufgabe ohne Farbsehen lösbar; mit Farbsehschwäche ist „Formen“ die faire Wahl.
- **Brillenträger:** Zeichen in der Mitte, Tasten unten; bei Gleitsicht liegen die Tasten im Nahteil. Große Zeichen bleiben auch leicht unscharf erkennbar.
- **Bildschirmarbeit:** Gespanntes Warten senkt die Lidschlagrate (Portello et al., 2013, für Bildschirmarbeit); zwischen Durchläufen blinzeln und pausieren.

## 5. Neurowissenschaftliche Grundlagen

- **Entscheiden:** Eine Wahlreaktion besteht aus Erkennen des Zeichens, Auswahl der passenden Antwort und Auslösen der Bewegung. Die Auswahl wächst mit der Zahl der Möglichkeiten (Hick-Hyman-Gesetz); ein gedächtnisbasiertes Modell erklärt den Anstieg über das Abrufen der Zuordnung (Schneider & Anderson, 2011).
- **Vorbereitung:** Die Wartezeit wirkt auf die Bereitschaft: Nach langen Wartezeiten ist man oft schneller, und die vorige Wartezeit wirkt nach (Han & Proctor, 2022). Zu frühes Tippen zeigt, dass die Vorbereitung in eine voreilige Antwort umgeschlagen ist.
- **Tempo-Genauigkeits-Austausch:** Er ist in Verhalten und Physiologie gut beschrieben (Heitz, 2014); Fehler bei sehr schnellen Antworten sind zu erwarten.
- Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.

## 6. Motorische Grundlagen

- **Antwort:** ein Tipp auf eine von 2 bis 6 festen, großen Tasten (mindestens 56 px); Zielgenauigkeit spielt kaum eine Rolle, eine kurze Fingerbewegung schon. Die Hand ruht am besten über der Mitte der Tasten, damit alle Wege kurz sind.
- **Einfache Reaktion als Grundlage:** Schon die einfache Reaktionszeit setzt sich aus Wahrnehmen und Bewegungsbeginn zusammen (Woods et al., 2015); die Wahl kommt hinzu.
- **Tastatur:** Mit den Ziffern 1–6 entfällt die Fingerbewegung über den Bildschirm, dafür braucht man die Zuordnung Taste–Ziffer; Ergebnisse mit Tastatur und Touch nicht vergleichen.

## 7. Einflussfaktoren und Messgrenzen

- **Touch-Latenz:** Web-Anwendungen auf Touchgeräten messen Reaktionszeiten durchweg zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets nicht untersucht); die Ende-zu-Ende-Verzögerung beim Tippen lag je nach Gerät bei etwa 48–276 ms (Casiez et al., 2017). Reaktionszeiten nur auf demselben Gerät vergleichen; die Genauigkeit ist davon kaum betroffen.
- **Streuung:** Messwerte am Menschen streuen von Durchgang zu Durchgang; deshalb sind Mehrfachmessung und Mittelung üblich (Mountford et al., 2004, S. 43–44, am Beispiel der Hornhautvermessung). Die Übung zeigt Mittel, Median und Streuung über viele Zeichen; mindestens 30 Zeichen sind sinnvoll.
- **Einstellungen:** Mehr Tasten oder kürzere Antwortzeit senken Genauigkeit und verlängern die Zeit; das ist zu erwarten und keine Verschlechterung. Nur gleiche Einstellungen vergleichen.
- **Alter und Tagesform:** In einer großen Bevölkerungsstichprobe wurde die Wahlreaktionszeit über das ganze Erwachsenenalter langsamer, die einfache kaum vor etwa 50 Jahren (Der & Deary, 2006). Müdigkeit und nachlassende Konzentration erhöhen Fehler und Streuung.
- **Kalibrierung:** Nur für die Zeichengröße nötig; ohne Kalibrierung sind die Zeichen auf Tablets etwas kleiner als eingestellt.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel (für die Aufgabenart):** Übung verändert die Wahlreaktionszeit (Proctor & Schneider, 2018); in der geübten Aufgabe wird man schneller, ein großer Teil davon ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Ob andere Zuordnungen oder andere Wahlaufgaben profitieren, ist für diese Form nicht untersucht; bei trainingsähnlicher Prüfung werden Effekte überschätzt (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Kein Beleg für Verkehr, Sport oder Beruf.
- **Einordnung:** Die Übung macht das Hick-Hyman-Gesetz und den Austausch zwischen Tempo und Genauigkeit erlebbar. Genauigkeit und Reaktionszeit sind Werte für den Vergleich mit sich selbst, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelles, richtiges Entscheiden zwischen mehreren Möglichkeiten geübt werden soll; die Schwierigkeit über die Zahl der Tasten fein gesteigert werden soll; ruhige, große Bedienelemente gefragt sind (auch für Ältere mit 2 bis 3 Tasten und langer Antwortzeit); ein Tablet mit Touch oder eine Tastatur genutzt wird.
- **Weniger passend, wenn …** Zielbewegung, Blickbewegung oder Randsehen geübt werden sollen; eine Reaktionszeit als Messwert für Fahr- oder Berufseignung gesucht wird; Lichtempfindlichkeit besteht und kurze Antwortzeiten gewünscht sind.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Das Zeichen erscheint plötzlich und wechselt jedes Mal (keine Vollflächenblitze). Licht- und musterausgelöste Anfälle sind selten, aber möglich (Fisher et al., 2005); dann verzichten oder vorher ärztlich besprechen.
  - `farbsehschwaeche`: „Formen (ohne Farbe)“ wählen; bei „Farben“ hilft die Form auf jedem Zeichen.
  - `aufmerksamkeitsprobleme`: viele zu frühe Tipps sind zu erwarten; kürzere Durchläufe (20 bis 30 Zeichen), längere Wartezeit.
  - `kognitive_einschraenkung`: mit 2 Tasten und langer Antwortzeit beginnen.
- **Kombiniert gut mit …** 202 (Wahlreaktion auf Pfeilrichtungen), 102 (Go/No-Go), 503 (Sofortreaktion, einfache Reaktion), 910 (Reaktion und Bewegung getrennt), 913 (Doppelaufgabe).
- Keine Diagnosen, keine Heilversprechen; nicht als Reaktionsprüfung darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Einstellungen statt Stufen:** keine automatische Anpassung, etwa der Antwortzeit; eine Treppe auf die Antwortzeit wäre möglich.
- **Feste Zuordnung:** Zeichen und Tasten stehen in fester Reihenfolge; ein Modus mit wechselnder Tastenreihenfolge würde die Zuordnung statt der Platzerinnerung üben.
- **Kein Vergleich der Tastenzahl:** Die Übung zeigt den Anstieg mit der Tastenzahl nicht selbst; eine Auswertung über Durchläufe mit 2, 4 und 6 Tasten könnte das Gesetz sichtbar machen.
- **Touch-Latenz:** Gerätevergleich bleibt unmöglich; Texte sagen das ehrlich (so in `texts.ts`).

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*, *4*(1), 11–26. https://doi.org/10.1080/17470215208416600 – Wahlreaktionszeit und Zahl der Möglichkeiten (Crossref geprüft).
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology*, *45*(3), 188–196. https://doi.org/10.1037/h0056940 – Hick-Hyman-Gesetz (Crossref geprüft).
- Schneider, D. W., & Anderson, J. R. (2011). A memory-based model of Hick’s law. *Cognitive Psychology*, *62*(3), 193–222. https://doi.org/10.1016/j.cogpsych.2010.11.001 – annähernd linearer Anstieg mit dem Logarithmus (Crossref geprüft).
- Proctor, R. W., & Schneider, D. W. (2018). Hick’s law for choice reaction time: A review. *Quarterly Journal of Experimental Psychology*, *71*(6), 1281–1299. https://doi.org/10.1080/17470218.2017.1322622 – Einflüsse von Zuordnung, Übung, Wiederholung (Crossref geprüft).
- Heitz, R. P. (2014). The speed-accuracy tradeoff: History, physiology, methodology, and behavior. *Frontiers in Neuroscience*, *8*, 150. https://doi.org/10.3389/fnins.2014.00150 – Tempo-Genauigkeits-Austausch (Crossref geprüft).
- Han, T., & Proctor, R. W. (2022). Revisiting variable-foreperiod effects: Evaluating the repetition priming account. *Attention, Perception, & Psychophysics*, *84*(4), 1193–1207. https://doi.org/10.3758/s13414-022-02476-5 – Wirkung der Wartezeit (Crossref geprüft).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – Anteile der einfachen Reaktionszeit (Crossref geprüft).
- Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: Results from the United Kingdom Health and Lifestyle Survey. *Psychology and Aging*, *21*(1), 62–73. https://doi.org/10.1037/0882-7974.21.1.62 – Alter und Wahlreaktionszeit (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchgeräte messen Reaktionszeiten zu lang (Crossref geprüft).
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Geräteverzögerung beim Tippen (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A*, *29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Häufigkeit der Farbsehschwäche (Crossref geprüft).
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science*, *90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag bei Bildschirmarbeit (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Streuung von Messwerten, Mehrfachmessung (S. 43–44).
