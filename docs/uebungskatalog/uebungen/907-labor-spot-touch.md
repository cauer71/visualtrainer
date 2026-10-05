---
# ===== Kennung =====
nr: 907
kennung: labor-spot-touch
name: "Spot-Touch (zufällig auftauchende Punkte so schnell wie möglich antippen)"
name_original: "– (eigene Blickfit-Labor-Übung mit Einstellungen)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-spot-touch", name: "Spot-Touch", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Farbige Punkte erscheinen an zufälligen Stellen und bleiben nur kurz sichtbar. Man tippt jeden Punkt an, sobald er erscheint. Größe in Zentimetern, Sichtbarkeit, Zahl gleichzeitiger Punkte, Pause, Bereich (ganze Fläche, nur Rand, nur Mitte) und ein Kreuz in der Mitte stellt man selbst ein; gemessen wird nur das Tippen, nicht der Blick."
ziel_funktionen: [auge_hand_koordination, zielbewegung_tempo]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen und keine automatische Anpassung; alles über Einstellungen (maßgeblich ist PARAMS in src/exercises/labor-spot-touch/logic.ts): Dauer 10–600 s (Standard 60), Durchmesser der Punkte 1–15 cm (5; auf der Bühne höchstens 0,9 × kürzere Seite), Sichtbarkeit je Punkt 0,3–10 s (1,5), gleichzeitige Punkte 1–5 (1), Pause nach Treffer oder Ablauf 0–3000 ms (300), Bereich ganze Fläche / nur Rand (ab 60 % des Feldradius) / nur Mitte (bis 45 %), Kreuz in der Mitte ja/nein, Ton (ändert die Vergleichbarkeit nicht). Schwerer: kleinere Punkte, kürzere Sichtbarkeit, mehrere Punkte, kürzere Pause, nur Rand mit Kreuz. Faustregel der Übung (keine Vorgabe aus der Forschung): in drei Durchläufen über 90 % → eine Einstellung schwerer, unter 70 % → leichter, immer nur eine Einstellung ändern."
messgroessen: ["Hauptwert: getroffene Punkte", "verpasste Punkte", "Fehltipps (daneben)", "Trefferquote (Treffer an allen gezeigten Punkten)", "Reaktionszeit vom Erscheinen bis zur Berührung: Mittel, Median, Streuung (nur Treffer)", "Treffer pro Minute", "Vergleich nur mit Durchläufen gleicher Einstellungen auf demselben Gerät; keine Normwerte, keine Blickmessung"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Standard-Einstellungen (5 cm, 1,5 s, ein Punkt, ganze Fläche, ohne Kreuz); Werte geschätzt.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 1
    blickfolge: 0
    sakkaden: 2
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 1
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 2
    antizipation: 0
    entscheidung_wahlreaktion: 1
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 2
    auge_hand_koordination: 3
    zielbewegung_tempo: 3
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 1
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 1
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren (Karte im Scheckkartenformat), damit die Größen in Zentimetern stimmen", "Etwa 50–60 cm Abstand, jede Stelle des Bildschirms bequem mit dem Finger erreichbar; Hand locker über der Fläche, nicht aufgestützt", "Punkte von 1 bis 15 cm Durchmesser sehen und mit dem Finger treffen können (Trefferfläche mindestens 24 px bzw. Radius plus 0,3 cm)", "Für Vergleiche immer dieselbe Hand, derselbe Abstand, dasselbe Gerät und dieselben Einstellungen"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, gesichtsfeldausfall, tremor_parkinson, hand_arm_beschwerden]
geeignet_fuer: ["Auf plötzlich auftauchende Ziele schnell mit der Hand reagieren und sie treffen (Sehen, Entscheiden und Zielbewegung zusammen)", "Mit Kreuz in der Mitte und „nur Rand“: Punkte aus dem Augenwinkel bemerken und antippen, ohne hinzuschauen (Bitte, keine Kontrolle)", "Schwierigkeit selbst fein einstellen: Größe, Sichtbarkeit, Zahl gleichzeitiger Punkte, Pause und Bereich einzeln ändern", "Vergleich mit sich selbst: Treffer, Trefferquote und Reaktionszeit über mehrere Durchläufe mit gleichen Einstellungen"]
weniger_geeignet_fuer: ["Messung des Randsehens oder des Gesichtsfelds: der Blick wird nicht gemessen, Punkte am Rand können auch angeschaut werden", "Messung der reinen Reaktionszeit: die Zeit enthält Zielbewegung und Geräteverzögerung", "Diagnose, Normvergleich oder Ranglisten", "Menschen, die den Arm nicht über den ganzen Bildschirm führen können oder starke Beschwerden in Hand und Arm haben"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Für genau diese Übung gibt es keine Studie. Bei Seh- und Reaktionsübungen mit Handantwort fallen Verbesserungen deutlich größer aus, wenn die Prüfung der geübten Aufgabe ähnelt; ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Die Zeit für die Zielbewegung folgt dem Fitts'schen Gesetz (Fitts, 1954; MacKenzie, 1992). Übungen für das Randsehen mit Handantwort sind im Sport verbreitet, keine von 93 Studien prüfte den Blick per Eye-Tracking, ein Übertrag auf den Sport ist nicht nachgewiesen (Vater & Strasburger, 2021)."
aehnliche_uebungen: [501, 702, 302, 401, 503, 913, 926]
stichworte: ["Spot-Touch", "Reaktion und Zielbewegung", "Auge-Hand-Koordination", "Fitts'sches Gesetz", "Randsehen mit Kreuz", "Punkte antippen", "Einstellungen in Zentimetern", "Kalibrierung", "kein Eye-Tracking", "Labor"]
---

# 907 · Spot-Touch (zufällig auftauchende Punkte so schnell wie möglich antippen)

> Original: – (eigene Blickfit-Labor-Übung mit Einstellungen) · Blickfit: „Spot-Touch“ (`src/exercises/labor-spot-touch/`, Kategorie Reaktion, Labor)

## 1. Kurzbeschreibung

Auf dem Bildschirm erscheinen farbige Punkte an zufälligen Stellen. Man tippt jeden Punkt an, sobald man ihn sieht; bleibt er zu lange unberührt, verschwindet er und zählt als verpasst. Die Übung hat keine Stufen, sondern **Einstellungen**: Durchmesser der Punkte in Zentimetern (Standard 5 cm), Sichtbarkeit je Punkt (1,5 s), Zahl gleichzeitiger Punkte (1 bis 5), Pause bis zum nächsten Punkt (300 ms), Dauer (60 s) und Bereich (ganze Fläche, nur Rand oder nur Mitte). Wahlweise steht ein kleines **Kreuz in der Mitte**, auf dem der Blick bleiben soll, während man die Punkte aus dem Augenwinkel bemerkt. Gemessen werden Treffer, verpasste Punkte, Fehltipps und die Zeit vom Erscheinen bis zur Berührung – nicht, wohin man schaut. Verglichen wird nur mit eigenen Durchläufen mit gleichen Einstellungen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `index.ts`, `logic.ts` (`SpotSession`), `texts.ts`, `science.ts` in `src/exercises/labor-spot-touch/` (Stand 05.10.2026).

- **Sitzung:** Dauer laut Einstellung (10–600 s, Standard 60 s), vorher 0,5 s Anlauf. Schnellmodus (`?quick=1`): höchstens 8 s. Intro-Film: 14 s mit 3,5-cm-Punkten, vier Treffer und ein bewusst ausgelassener Punkt.
- **Punkte:** erscheinen zufällig (nur über `ctx.rng`) ganz im Feld, ohne Überlappung (Mindestabstand 0,5 cm zwischen gleichzeitigen Punkten), je nach Bereich: „Mitte“ = innerhalb 45 % des Feldradius (Ellipse), „Rand“ = ab 60 %. Mit Kreuz halten sie mindestens 1,2 cm plus Radius Abstand zur Mitte. Nach Treffer oder Ablauf folgt der nächste Punkt erst nach der Pause.
- **Treffer:** Tipp innerhalb Radius + 0,3 cm (Fingerkuppe), mindestens 24 px; bei mehreren Punkten zählt der nächstgelegene. Ein Punkt kann erst getroffen werden, wenn er gezeigt wurde. Ein zweiter Tipp auf dieselbe Stelle innerhalb 250 ms nach einem Treffer wird ignoriert. Tipp daneben = Fehltipp (kein Abzug, der Punkt bleibt).
- **Größen:** in cm über die Kalibrierung (`ctx.calib`); `fitCm` begrenzt auf 0,9 × kürzere Bühnenseite, beim Drehen des Tablets werden sichtbare Punkte ins neue Feld geschoben.
- **Darstellung und Rückmeldung:** Punkte in vier Farben ohne Bedeutung, mit weißem Ring; Einblenden in 110 ms; ✓ am getroffenen Punkt, ✗ am Fehltipp, verpasste Punkte lösen sich als gestrichelter Ring auf; kein Blitz, keine Vollflächeneffekte. Ton nur, wenn eingestellt.
- **Ergebnis:** Hauptwert getroffene Punkte; dazu verpasste Punkte, Fehltipps, Trefferquote (Treffer an allen gezeigten Punkten), Reaktionszeit Mittel/Median/Streuung, Treffer pro Minute. Persönlicher Tipp nach Faustregeln (viele Fehltipps → erst genau, dann schnell; Trefferquote < 70 % → leichter; ≥ 90 % → eine Einstellung schwerer). Punkte für die Motivation: 10 je Treffer.
- **Vergleich:** Verlauf, Bestwert und „Letztes Mal“ nur bei gleichen Einstellungen (Ton ausgenommen).

## 3. Herleitung aus der Forschung (keine Beschreibung eines Programms)

- **Reaktion plus Zielbewegung:** Schon die einfache Reaktionszeit besteht aus Erkennen des Reizes und Anlaufen der Bewegung (Woods et al., 2015). Beim Antippen kommt die Zielbewegung hinzu, deren Dauer mit dem Weg wächst und mit der Zielgröße sinkt (Fitts, 1954; MacKenzie, 1992). Deshalb sind Größe und Pause die Einstellungen, die die Werte am stärksten verändern.
- **Rand mit Kreuz:** Zum Rand nimmt die Sehschärfe ab (Anstis, 1974), und die Reaktionszeit auf einen einfachen Lichtreiz steigt mit dem Abstand von der Mitte stetig, aber mäßig (Strasburger et al., 2011). In 93 Studien zu Randseh-Übungen im Sport prüfte keine mit Eye-Tracking, ob wirklich am Rand gesehen wurde (Vater & Strasburger, 2021). Das Kreuz ist deshalb ausdrücklich eine Bitte, keine Kontrolle.
- **Ehrliche Werte:** Touchscreens messen Reaktionszeiten zu lang, je nach Gerät verschieden (Pronk et al., 2020); Verbesserungen fallen größer aus, wenn die Prüfung der Übung ähnelt (Guo et al., 2025). Daraus folgt: nur Vergleich mit sich selbst, gleiche Einstellungen, keine Normwerte.
- **Was nicht belegt ist:** Übertragung auf Sport, Verkehr oder Alltag, ein „größeres Blickfeld“ oder schnellere Nervenleitung. Solche Aussagen dürfen nicht gemacht werden.

## 4. Optische und okulomotorische Grundlagen

- **Reizgröße:** Bei 50 cm Abstand entspricht 1 cm etwa 1,15° Sehwinkel; der Standardpunkt (5 cm) misst etwa 5,7°, der kleinste (1 cm) etwa 1,1° (eigene Rechnung). Punkte mit weißem Ring auf dunklem Grund sind kontrastreich; Sehschärfe und Kontrastsehen begrenzen die Leistung kaum, solange die Punkte nicht sehr klein sind.
- **Wo auf dem Bildschirm „Rand“ liegt:** Ein 10,9-Zoll-Tablet ist im Querformat etwa 22,7 × 15,8 cm groß. Bei 50 cm Abstand liegt sein seitlicher Rand nur etwa 13°, die Ecken etwa 15° von der Mitte entfernt (eigene Rechnung). „Nur Rand“ heißt am Tablet also nahe Peripherie, nicht das weite Gesichtsfeld. Zum Rand hin nimmt die Sehschärfe stetig ab (Anstis, 1974); große, kontrastreiche Punkte bleiben in diesem Bereich gut sichtbar.
- **Blicksprünge:** Ohne Kreuz springt der Blick in der Regel zum neuen Punkt (Sakkade), die Hand folgt. Die mittlere Latenz einer Sakkade auf ein plötzlich erscheinendes Ziel liegt bei etwa 177 ms (Median; Bargary et al., 2017); im Gap-Paradigma, wenn der Fixierpunkt vorher verschwindet, kommen auch sehr kurze Latenzen um 100 ms vor (Fischer & Ramsperger, 1984). Mit Kreuz soll der Blick dort bleiben; plötzlich erscheinende Punkte ziehen ihn aber an, und das Unterdrücken des Blicksprungs gelingt nicht immer.
- **Mehrere Punkte:** Bei 2 bis 5 gleichzeitigen Punkten kommt eine kleine Such- und Auswahlaufgabe hinzu (welcher zuerst?).
- **Brillenträger:** Die Hand bewegt sich über den ganzen Bildschirm; bei Gleitsicht liegt der untere Bildschirmteil im Nahbereich, der obere im Zwischenbereich. Große Punkte sind auch leicht unscharf erkennbar. Wer bei 50–60 cm unscharf sieht, sollte die Arbeitsplatz- oder Nahbrille so verwenden wie im Alltag.
- **Bildschirmarbeit:** Am Bildschirm sinkt die Lidschlagrate (Portello et al., 2013); bei trockenen Augen zwischendurch blinzeln und Pausen machen.

## 5. Neurowissenschaftliche Grundlagen

- **Vom Sehen zur Handbewegung:** Ein plötzlich erscheinender Punkt muss erkannt, lokalisiert und in eine Zielbewegung umgesetzt werden. Die einfache Reaktionszeit setzt sich aus Wahrnehmungs- und Bewegungsanteilen zusammen (Woods et al., 2015); welche Hirnregionen eine einzelne Übung „trainiert“, lässt sich daraus nicht ableiten, und eine solche Aussage wird nicht gemacht.
- **Randsehen:** Wahrnehmung, Reaktionszeit und Zeichenerkennung verändern sich mit dem Abstand von der Blickmitte (Strasburger et al., 2011). Große, helle Punkte sind am Rand leichter zu bemerken als feine Zeichen; Spot-Touch verlangt nur das Bemerken und Lokalisieren, kein Erkennen.
- **Auswahl bei mehreren Zielen:** Bei mehreren Punkten muss man entscheiden, welchen man zuerst nimmt; das verlängert die Zeit (Entscheidungsanteil). Mit dem Kreuz kommt hinzu, den Blick bewusst ruhig zu halten.

## 6. Motorische Grundlagen

- **Fitts'sches Gesetz:** Die Bewegungszeit steigt mit dem Logarithmus des Verhältnisses von Weg zu Zielgröße (Fitts, 1954); das Gesetz gilt für Zeigegeräte und Touchscreens (MacKenzie, 1992). Kleine Punkte weit weg dauern länger; die Reaktionszeit der Übung enthält diesen Bewegungsanteil.
- **Tempo und Genauigkeit:** Hastiges Tippen erzeugt Fehltipps; die Übung bestraft sie nicht, zählt sie aber. Die Trefferfläche ist um 0,3 cm größer als der Punkt und mindestens 24 px; sichere Fingerziele liegen bei etwa 9 mm (Parhi et al., 2006), was auch der kleinste Punkt (1 cm) mit Zugabe erreicht.
- **Haltung:** Die Hand schwebt über der Fläche (nicht aufgestützt), der Arm wird über den ganzen Bildschirm geführt. Bei langen Durchläufen ermüden Schulter und Arm; Hand wechseln und lockern.
- **Maus:** Mit der Maus gilt ebenfalls das Fitts'sche Gesetz, die Wege sind aber anders; Ergebnisse mit Maus und Finger nicht vergleichen.

## 7. Einflussfaktoren und Messgrenzen

- **Keine Blickmessung:** Ob der Blick auf dem Kreuz bleibt, kann die App nicht prüfen. Die Werte „nur Rand mit Kreuz“ sind nur dann eine Randseh-Aufgabe, wenn man ehrlich in der Mitte bleibt.
- **Touch-Latenz:** Die Zeit vom Tippen bis zur Erkennung im Browser hängt vom Gerät ab; gemessene Ende-zu-Ende-Verzögerungen beim Tippen lagen je nach Gerät, System und Umgebung bei etwa 48–276 ms (Casiez et al., 2017). Web-Anwendungen auf Touchgeräten überschätzten Reaktionszeiten durchweg, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets nicht untersucht). Die Übung misst über die Zeitstempel der Eingabe; Werte sind nur auf demselben Gerät vergleichbar.
- **Kalibrierung:** Ohne Kalibrierung rechnet die App mit 38 px pro cm. Ein 10,9-Zoll-Tablet hat etwa 52 CSS-Pixel pro cm; ein „5-cm-Punkt“ wäre dann nur etwa 3,7 cm groß (eigene Rechnung). Deshalb einmal mit einer Karte im Scheckkartenformat kalibrieren.
- **Bühnengrenze:** Große Punkte werden auf 90 % der kürzeren Bühnenseite begrenzt; am Handy sind Punkte und Wege kleiner als am Tablet, die Werte deshalb nicht vergleichbar.
- **Einstellungen:** Treffer und Reaktionszeit hängen stark von Größe, Sichtbarkeit, Pause und Zahl gleichzeitiger Punkte ab; nur gleiche Einstellungen vergleichen. „Treffer pro Minute“ enthält die Pausen.
- **Person:** Hand (rechts/links), Haltung, Müdigkeit, Alter und Tagesform verändern die Werte. Ein einzelner Durchlauf streut; aussagekräftig ist der Verlauf über mehrere Durchläufe.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel (für die Aufgabenart):** In der geübten Aufgabe wird man mit Wiederholung meist schneller und sicherer. Eine Metaanalyse zu digitalen Sehübungen im Sport zeigt aber, dass Verbesserungen deutlich größer ausfallen, wenn die Prüfung der Übung ähnelt – ein großer Teil ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025). Für Spot-Touch selbst gibt es keine Studie.
- **Naher Transfer – schwach:** Ob sich ähnliche, nicht geübte Ziel- oder Reaktionsaufgaben verbessern, ist kaum untersucht; bei trainingsähnlichen Prüfungen werden Effekte überschätzt (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Übungen für den Rand mit Handantwort werden im Sport viel eingesetzt; ein Übertrag auf den Sport wird erwartet, ist aber nicht nachgewiesen, und keine der 93 Studien prüfte den Blick per Eye-Tracking (Vater & Strasburger, 2021).
- **Einordnung:** Spot-Touch ist eine frei einstellbare Reaktions- und Zielübung. Treffer und Zeiten sind Werte für den Vergleich mit sich selbst auf demselben Gerät, keine Normwerte.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** schnelles Reagieren und Treffen mit der Hand geübt werden soll; die Schwierigkeit fein und selbst eingestellt werden soll (z. B. große Punkte und lange Sichtbarkeit für Ältere oder Einsteiger); mit Kreuz und „nur Rand“ das Bemerken von Punkten aus dem Augenwinkel geübt werden soll; ein Tablet mit Touch genutzt wird.
- **Weniger passend, wenn …** Randsehen oder Gesichtsfeld gemessen werden sollen; eine reine Reaktionszeit ohne Bewegung gefragt ist (dann eher 503 oder 910); der Arm nicht frei über den Bildschirm geführt werden kann; ein Normvergleich gewünscht ist.
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Punkte erscheinen und verschwinden; bei kurzer Sichtbarkeit und mehreren Punkten wirkt das unruhig. Licht- und musterausgelöste Anfälle sind selten, aber möglich (Fisher et al., 2005); dann verzichten oder vorher ärztlich besprechen.
  - `gesichtsfeldausfall`: Punkte in einem ausgefallenen Bereich werden verpasst; das Ergebnis ist keine Gesichtsfeldprüfung. Neu bemerkte Ausfälle, plötzlicher Sehverlust oder Doppelbilder gehören ärztlich abgeklärt, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
  - `tremor_parkinson`, `hand_arm_beschwerden`: große Punkte, lange Sichtbarkeit, längere Pause; kurze Durchläufe, Hand wechseln.
- **Kombiniert gut mit …** 503 (Sofortreaktion ohne Zielbewegung), 910 (Reaktion und Bewegung getrennt), 401 (Mitte fixieren, Randpunkte bemerken), 913 (Doppelaufgabe mit denselben Randpunkten), 702 (Zielklicken auf bewegte Ziele).
- Keine Diagnosen, keine Heilversprechen; nicht als Prüfung des Gesichtsfelds oder der Reaktionsfähigkeit darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß:** Das Kreuz bleibt eine Bitte; ohne Eye-Tracking lässt sich „nur Rand“ nicht kontrollieren. Texte entsprechend ehrlich halten (so in `texts.ts` und `science.ts`).
- **Einstellungen statt Stufen:** Keine automatische Anpassung; wer die Faustregel nicht befolgt, bleibt evtl. lange zu leicht oder zu schwer. Eine optionale Treppe (z. B. auf Sichtbarkeit) wäre denkbar.
- **Exzentrizität nicht in Grad:** Der Rand ist als Anteil des Feldes definiert, nicht als Sehwinkel; auf verschiedenen Geräten liegt „Rand“ verschieden weit außen. Eine Angabe in Grad (wie bei 912) würde Vergleiche erleichtern.
- **Ort nicht ausgewertet:** Die Trefferorte werden gespeichert, aber nicht nach Richtung oder Abstand ausgewertet; eine einfache Karte (links/rechts, oben/unten) wäre aufschlussreich, ohne diagnostischen Anspruch.
- **Sicherheit:** Weiche Einblendung, keine Blitze; Hinweis auf Photosensitivität im Intro vorhanden.

## 11. Quellen

### Von der Website angegeben
(keine, eigene Übung)

### Weitere Fachliteratur
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – Fitts'sches Gesetz (Crossref geprüft).
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human–Computer Interaction*, *7*(1), 91–139. https://doi.org/10.1207/s15327051hci0701_3 – Fitts'sches Gesetz bei Zeigegeräten (Crossref geprüft).
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience*, *9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – Anteile der einfachen Reaktionszeit (Crossref geprüft).
- Strasburger, H., Rentschler, I., & Jüttner, M. (2011). Peripheral vision and pattern recognition: A review. *Journal of Vision*, *11*(5), 13. https://doi.org/10.1167/11.5.13 – Reaktionszeit und Erkennen in Abhängigkeit vom Abstand zur Mitte (Crossref geprüft).
- Anstis, S. (1974). A chart demonstrating variations in acuity with retinal position. *Vision Research*, *14*(7), 589–592. https://doi.org/10.1016/0042-6989(74)90049-2 – Sehschärfe nimmt zum Rand ab (Crossref geprüft).
- Vater, C., & Strasburger, H. (2021). Topical review: The top five peripheral vision tools in sport. *Optometry and Vision Science*, *98*(7), 704–722. https://doi.org/10.1097/OPX.0000000000001732 – 93 Studien, keine mit Eye-Tracking, Übertrag nicht nachgewiesen (Crossref geprüft).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touchgeräte messen Reaktionszeiten zu lang (Crossref geprüft).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Lerneffekt bei trainingsähnlicher Prüfung (Crossref geprüft).
- Casiez, G., Pietrzak, T., Marchal, D., Poulmane, S., Falce, M., & Roussel, N. (2017). Characterizing latency in touch and button-equipped interactive systems. In *Proceedings of the 30th Annual ACM Symposium on User Interface Software and Technology* (S. 29–39). ACM. https://doi.org/10.1145/3126594.3126606 – Geräteverzögerung beim Tippen (Crossref geprüft).
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260 – Größe sicherer Fingerziele (Crossref geprüft).
- Bargary, G., Bosten, J. M., Goodbourn, P. T., Lawrance-Owen, A. J., Hogg, R. E., & Mollon, J. D. (2017). Individual differences in human eye movements: An oculomotor signature? *Vision Research*, *141*, 157–169. https://doi.org/10.1016/j.visres.2017.03.001 – Sakkadenlatenz (Crossref geprüft).
- Fischer, B., & Ramsperger, E. (1984). Human express saccades: Extremely short reaction times of goal directed eye movements. *Experimental Brain Research*, *57*(1), 191–195. https://doi.org/10.1007/BF00231145 – sehr kurze Sakkadenlatenzen im Gap-Paradigma (Crossref geprüft).
- Portello, J. K., Rosenfield, M., & Chu, C. A. (2013). Blink rate, incomplete blinks and computer vision syndrome. *Optometry and Vision Science*, *90*(5), 482–487. https://doi.org/10.1097/OPX.0b013e31828f09a7 – Lidschlag bei Bildschirmarbeit (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Photosensitivität (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28).
