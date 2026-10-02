# Anleitungen – Visual Trainer Labor

Diese Datei wird mit `node tools/gen-docs.js` aus den Texten in `help/` erzeugt und nicht von Hand bearbeitet. Dieselben Texte erscheinen in der App unter „Hilfe“, in den Einstellungen jeder Übung und in der Ergebnisansicht.

## Inhalt

- [Allgemeine Anleitung](#allgemeine-anleitung)
- [1. Buchstabentafel](#ex-chart)
- [2. Wahlreaktion](#ex-choice)
- [3. Spot-Touch](#ex-spots)
- [4. Doppelaufgabe](#ex-dual)
- [5. Zeichen finden](#ex-findchars)
- [6. Blitz-Erkennung](#ex-flash)
- [7. Ziel verfolgen](#ex-follow)
- [8. Bewegte Ziele ordnen](#ex-ordering)
- [9. Peripheres Erkennen](#ex-periphery)
- [10. Mentale Rotation](#ex-rotation)
- [11. Takt-Sakkaden](#ex-saccade)
- [12. Sequenz-Gedächtnis](#ex-sequence)
- [13. Start-Ziel-Reaktion](#ex-sprint)
- [14. Wörter bauen](#ex-wordbuild)

## Übersicht der Übungen

| Übung | Gruppe | Kurzbeschreibung |
|---|---|---|
| Buchstabentafel | Blicksteuerung und Lesen | Zeichengruppen im Raster Schritt für Schritt lesen, selbst getaktet oder im Metronom-Takt. |
| Wahlreaktion | Wahrnehmung und Koordination | Reiz erkennen und die passende Schaltfläche so schnell wie möglich drücken. |
| Spot-Touch | Wahrnehmung und Koordination | Farbige Punkte erscheinen zufällig und müssen schnell berührt werden. |
| Doppelaufgabe | Aufmerksamkeit | Mitte: Zielzahl erkennen und berühren. Rand: Punkte berühren, ohne hinzuschauen. |
| Zeichen finden | Gedächtnis und Konzentration | Alle Exemplare eines Zielzeichens in einem Raster ähnlicher Zeichen antippen. |
| Blitz-Erkennung | Peripheres Sehen und schnelle Erkennung | Sehr kurz eingeblendete Zeichen erfassen und eintippen, optional mit automatischer Schwellenbestimmung. |
| Ziel verfolgen | Wahrnehmung und Koordination | Den Finger auf einem gleichmäßig bewegten Ziel halten. |
| Bewegte Ziele ordnen | Wahrnehmung und Koordination | Bewegte Zahlen, Buchstaben, Wörter oder Rechenaufgaben in der richtigen Reihenfolge berühren. |
| Peripheres Erkennen | Peripheres Sehen und schnelle Erkennung | Blick in der Mitte halten und kurz am Rand aufblitzende Buchstaben erkennen. |
| Mentale Rotation | Gedächtnis und Konzentration | Entscheiden, ob eine gedrehte Figur dieselbe oder ihr Spiegelbild ist. |
| Takt-Sakkaden | Blicksteuerung und Lesen | Ein Zeichen springt im Metronom-Takt zwischen festen Punkten. |
| Sequenz-Gedächtnis | Gedächtnis und Konzentration | Eine Folge aufleuchtender Felder merken und in gleicher Reihenfolge antippen. |
| Start-Ziel-Reaktion | Wahrnehmung und Koordination | Startfläche halten, bei Aufleuchten des Ziels loslassen und das Ziel berühren. |
| Wörter bauen | Gedächtnis und Konzentration | Durcheinandergewürfelte Buchstaben zu einem Wort ordnen. |

## Allgemeine Anleitung

### Wofür die Übungen gedacht sind – und wofür nicht

Das Visual Trainer Labor ist ein Trainings- und Messwerkzeug für Wahrnehmung, Aufmerksamkeit, Blicksteuerung, Reaktion und Arbeitsgedächtnis. Es zeigt dir, wie du bei bestimmten Aufgaben abschneidest und wie sich das über die Zeit verändert.

Es ist kein Medizinprodukt und stellt keine Diagnose. Die Ergebnisse ersetzen keine Untersuchung beim Augenarzt, Optometristen oder Orthoptisten. Wenn du Beschwerden hast (verschwommenes Sehen, Doppelbilder, häufige Kopfschmerzen beim Lesen, Schielen), lass sie fachlich abklären, bevor du trainierst.

Wie stark sich ein Training auf Alltagsleistungen überträgt (Lesen, Sport, Konzentration), ist je nach Übung unterschiedlich gut belegt. Sicher messbar ist vor allem, dass man in genau der geübten Aufgabe besser wird. Erwarte deshalb keine Wunder und bewerte Fortschritte vor allem anhand deiner eigenen Kennzahlen.

### Aufbau: Gerät, Abstand, Licht, Haltung

- Gerät: Ein Touchscreen (Tablet, Laptop mit Touch, Touch-Monitor) eignet sich am besten. Mit Maus funktionieren die Übungen auch, die Zeiten sind dann aber nicht mit Touch-Messungen vergleichbar.
- Abstand: Sitze etwa 50 bis 70 cm vom Bildschirm entfernt, so dass du den ganzen Bildschirm ohne Kopfbewegung überblickst und mit dem Arm gut jede Stelle erreichst. Trage den tatsächlichen Abstand in der Kalibrierung ein (Standard: 60 cm).
- Bildschirm: Stelle ihn so auf, dass der Blick leicht nach unten geht und der Bildschirm senkrecht zur Blickrichtung steht. Nutze eine mittlere bis hohe Helligkeit und schalte Bildschirmschoner, Nachtmodus und Farbfilter aus, weil sie Kontraste verändern.
- Raum: Gleichmäßiges Licht ohne Spiegelungen oder Blendung auf dem Bildschirm. Kein helles Fenster im Hintergrund.
- Haltung: Aufrecht sitzen, Füße flach am Boden, Unterarm nicht aufstützen, wenn schnelle Berührungen verlangt werden. Der Kopf bleibt ruhig, wenn die Aufgabe nur Augenbewegungen verlangt.
- Sehhilfen: Trage deine gewohnte Brille oder Kontaktlinsen. Für Vergleiche immer unter denselben Bedingungen trainieren (mit oder ohne Sehhilfe, gleiches Gerät, gleicher Abstand).
- Störungen vermeiden: Benachrichtigungen und Hintergrundprogramme ausschalten. Laptop am Strom betreiben, weil der Energiesparmodus die Zeitmessung verschlechtern kann.

### Kalibrierung: warum Zentimeter wichtig sind

Alle Größen und Abstände der Übungen sind in Zentimetern angegeben, nicht in Pixeln. Nur so bedeutet „5 cm großer Punkt“ auf jedem Gerät dasselbe, und nur so lassen sich Größen in Sehwinkel umrechnen. Dafür muss die App wissen, wie viele Pixel pro Zentimeter dein Bildschirm hat.

Öffne dazu den Bereich „Kalibrierung“. Es gibt zwei Wege, die sich gegenseitig abgleichen: Entweder misst du die Breite der Anzeigefläche (nur das leuchtende Bild, ohne Rahmen) mit einem Lineal und trägst sie ein, oder du hältst eine Bankkarte an den Bildschirm und ziehst den Regler, bis das Rechteck genauso groß ist wie die Karte. Das zweite Verfahren ist meist genauer, weil Karten genormt sind (85,6 × 54,0 mm).

Trage außerdem den Abstand zwischen Auge und Bildschirm ein. Daraus berechnet die App Sehwinkel: Bei 60 cm Abstand entspricht ein Grad etwa 1,05 cm auf dem Bildschirm. Ein Daumen bei ausgestrecktem Arm deckt ungefähr 2 Grad ab.

Eine falsche Kalibrierung verfälscht alle Größen und Winkelangaben, aber nicht die Reaktionszeiten. Kalibriere neu, sobald du das Gerät, die Bildschirmeinstellung (Skalierung, Auflösung) oder deinen Sitzabstand deutlich änderst.

### So läuft eine Übung ab

- Im Menü eine Übung wählen. Dort stehen Anleitung, Einstellungen und – nach dem Training – die Bedeutung der Kennzahlen.
- Einstellungen anpassen. Jede Einstellung hat einen kurzen Hilfetext. Für den ersten Durchlauf genügen die Standardwerte.
- „Start“ drücken. Es folgt ein Countdown von drei Sekunden, dabei wird (wenn möglich) in den Vollbildmodus gewechselt. Nutze die Zeit, um Haltung und Abstand zu prüfen.
- Übung ausführen. Mit „Abbrechen“ oben rechts kannst du jederzeit zurück zu den Einstellungen; ein abgebrochener Durchlauf wird nicht gespeichert.
- Ergebnis ansehen. Die Kennzahlen werden mit Erklärung angezeigt und automatisch lokal gespeichert. Du kannst die Einzelwerte als CSV-Datei exportieren (Semikolon-getrennt, öffnet sich direkt in Excel).
- „Nochmal“ startet mit denselben Einstellungen. Für Vergleiche über mehrere Tage die Einstellungen nicht ändern.

### Training planen und steigern

- Häufigkeit und Dauer: Besser kurz und regelmäßig als lang und selten. Bewährt haben sich 2 bis 4 Einheiten pro Woche mit 10 bis 20 Minuten, verteilt auf zwei bis vier Übungen.
- Aufwärmen: Beginne mit einer leichten Übung (z. B. große Ziele, lange Sichtbarkeit), bevor du zu schwierigen Einstellungen wechselst.
- Steigerungsregel: Liegt die Trefferquote in drei Durchläufen hintereinander über etwa 90 %, mache eine Stufe schwerer (kleiner, schneller, kürzer, mehr gleichzeitig). Liegt sie unter etwa 70 %, mache es leichter. Verändere immer nur einen Parameter auf einmal, sonst weißt du nicht, was die Veränderung bewirkt hat.
- Abwechslung: Kombiniere Übungsgruppen (Reaktion, Blicksteuerung, Gedächtnis, Peripherie). Eine einzelne Aufgabe kann man mit der Zeit „auswendig“, ohne dass sich die zugrunde liegende Fähigkeit verbessert.
- Protokoll: Die App speichert die letzten 100 Durchläufe. Notiere zusätzlich Tageszeit, Müdigkeit und Besonderheiten, wenn du Unterschiede erklären willst.
- Pausen: Mache nach etwa 15 bis 20 Minuten Bildschirmarbeit eine Pause und schaue 20 Sekunden lang in die Ferne (mindestens 6 m). Beende das Training, wenn du müde wirst: Dann sinken Genauigkeit und Tempo und die Werte sind nicht mehr aussagekräftig.

### Ergebnisse richtig lesen

- Mittelwert und Median: Der Mittelwert wird von einzelnen Ausreißern (zum Beispiel einer Ablenkung) nach oben gezogen, der Median nicht. Weichen beide stark voneinander ab, gab es Ausreißer.
- Streuung: Sie zeigt, wie gleichmäßig du reagierst. Kleinere Streuung bei gleichem Mittelwert bedeutet stabilere Leistung.
- Trefferquote und Tempo gehören zusammen: Wer schneller wird und dabei mehr Fehler macht, hat nur ein anderes Verhältnis gewählt, nicht unbedingt besser geworden. Beurteile beides gemeinsam.
- Schwankungen: Einzelne Durchläufe schwanken natürlich um einige Prozent. Vergleiche Durchschnitte aus mindestens drei Durchläufen und achte auf einen Trend über mehrere Wochen.
- Lerneffekt: Die ersten Durchläufe einer neuen Übung verbessern sich oft schnell, weil du die Aufgabe kennenlernst, nicht weil sich das Sehen verbessert. Beginne mit der Auswertung erst nach zwei bis drei Probeläufen.
- Gerätevergleich: Reaktionszeiten enthalten die Verzögerung von Bildschirm, Touch-Sensor und Browser. Sie sind nur auf demselben Gerät miteinander vergleichbar und keine absoluten Werte.

### Messgenauigkeit und Grenzen der Technik

- Bildwiederholrate: Ein 60-Hz-Bildschirm aktualisiert das Bild etwa alle 16,7 ms. Anzeigedauern werden deshalb in Vielfachen dieses Rasters dargestellt; sehr kurze Zeiten (unter 50 ms) sind nur grob einstellbar.
- Zeitmessung: Die Zeitpunkte stammen vom Browser-Zeitgeber. Reaktionszeiten sind daher auf wenige Millisekunden genau, aber um die Eingabeverzögerung des Geräts verschoben.
- Metronom: Der Ton wird im Bildtakt ausgelöst und kann um bis zu etwa 16 ms abweichen. Für das Training des Rhythmus reicht das, für Messungen im Millisekundenbereich nicht.
- Farben: Bildschirme geben Farben unterschiedlich wieder. Die Übungen verlassen sich deshalb nicht auf feine Farbunterschiede.
- Eingabe: Mehrfachberührung wird in dieser Version nicht ausgewertet; es zählt jeweils eine Berührung.

### Sicherheit und Hinweise

- Lichtempfindlichkeit: Einige Übungen zeigen kurze Einblendungen und schnelle Wechsel (z. B. Blitz-Erkennung, Peripheres Erkennen, Takt-Sakkaden). Wenn bei dir oder in deiner Familie Anfälle durch Licht oder Muster aufgetreten sind, sprich vorher mit einem Arzt und trainiere nur mit ärztlicher Freigabe.
- Abbrechen bei Beschwerden: Brich sofort ab bei Schwindel, Übelkeit, Kopfschmerz, Augenschmerz, Flimmern oder Doppelbildern, die nicht schnell verschwinden. Wenn sie wiederkehren, lass dich untersuchen.
- Augenbelastung: Häufiges Blinzeln, genügend Pausen und eine ruhige Umgebung beugen trockenen, müden Augen vor.
- Kinder: Nur mit Aufsicht und kürzeren Einheiten (5 bis 10 Minuten). Schwierigkeit so wählen, dass Erfolgserlebnisse überwiegen.
- Hände und Handgelenke: Schnelle Berührungsübungen belasten die Sehnen. Lockere Haltung, Pausen und Wechsel der Hand.
- Keine Leistungsversprechen: Die App gibt keine Normwerte vor und bewertet nicht, ob ein Wert „gut“ oder „schlecht“ ist. Maßstab bist du selbst im Zeitverlauf.

### Datenschutz

Alle Ergebnisse werden ausschließlich im Browser deines Geräts gespeichert (lokaler Speicher). Es gibt keine Anmeldung, keine Übertragung ins Internet und keine Nachverfolgung; die Seite kann Netzwerkverbindungen technisch gar nicht aufbauen.

Die gespeicherten Daten bleiben, bis du sie unter „Ergebnisse“ löscht oder die Websitedaten des Browsers entfernst. Auf gemeinsam genutzten Geräten solltest du Ergebnisse nach dem Training löschen oder exportieren. Exportierte CSV-Dateien liegen im Download-Ordner und können Rückschlüsse auf deine Leistung zulassen; gehe damit sorgfältig um.

### Glossar

- **Sehwinkel**: Größe eines Objekts, gemessen als Winkel am Auge. Ein Objekt von 1,05 cm Größe hat in 60 cm Abstand etwa 1 Grad. Sehwinkel machen Größen unabhängig vom Abstand vergleichbar.
- **Fixation**: Ruhiges Halten des Blicks auf einen Punkt.
- **Sakkade**: Schneller Blicksprung von einem Punkt zum nächsten, beim Lesen etwa alle Viertelsekunde.
- **Gleitende Augenfolgebewegung**: Langsame, flüssige Augenbewegung, mit der ein bewegtes Ziel verfolgt wird.
- **Peripherie / Gesichtsfeldrand**: Bereich des Sehens außerhalb des Blickzentrums. Dort sind Schärfe und Farbwahrnehmung geringer, Bewegung wird aber gut bemerkt.
- **Crowding (Gedränge)**: Zeichen am Rand oder dicht nebeneinander sind schwerer zu erkennen, als wenn sie allein stehen.
- **Reaktionszeit**: Zeit von Erscheinen eines Reizes bis zur Reaktion.
- **Wahlreaktion**: Reaktion, bei der zwischen mehreren Antworten gewählt werden muss; dauert länger als eine einfache Reaktion.
- **Schwelle**: Geringste Reizstärke (hier: kürzeste Anzeigedauer), bei der du noch zuverlässig richtig antwortest.
- **Arbeitsgedächtnis**: Kurzzeitiger Speicher, in dem Information gehalten und bearbeitet wird; die Kapazität ist begrenzt (oft um 4 bis 7 Elemente).
- **Maske**: Reiz, der unmittelbar nach einer kurzen Einblendung gezeigt wird und das Nachwirken des Bildes im Auge unterbindet.
- **Persistenz**: Wie lange ein Reiz sichtbar bleibt.
- **Adaptives Verfahren**: Die Schwierigkeit passt sich automatisch an deine Antworten an, bis sich ein stabiler Schwellenwert ergibt.

<a id="ex-chart"></a>

## 1. Buchstabentafel

*Gruppe: Blicksteuerung und Lesen*

### Wofür die Übung gedacht ist

Du liest eine Tafel aus Zeichengruppen Schritt für Schritt. Eine Markierung zeigt das jeweils nächste Zeichen, du sprichst es laut aus. Selbst getaktet misst die App deinen Lesefluss; im Metronom-Takt trainierst du gleichmäßiges Tempo. Die Übung schult Blicksprünge, Lesefluss und das Erkennen von Zeichen im Gedränge.

### Vorbereitung

- Kalibrierung durchführen, damit Zeichen- und Abstandsgrößen stimmen.
- Sitz etwa 50 bis 60 cm vor dem Bildschirm; der Kopf bleibt ruhig, nur die Augen wandern.
- Wähle einen Raum, in dem du laut sprechen kannst. Wer nicht laut sprechen kann, liest leise innerlich mit, das Training ist dann aber weniger kontrolliert.

### So läuft die Übung ab

1. Tafelgröße, Zeichen je Gruppe und Abstände einstellen. Für den Einstieg: 4×4 Gruppen mit je 3 Buchstaben.
2. Tempo wählen: „Selbst bestimmt“ (Tippen = weiter) oder „Metronom-Takt“.
3. Selbst bestimmt: Tippe oder drücke die Leertaste zum Starten. Das erste Zeichen wird markiert. Lies es laut und tippe anschließend, damit die Markierung zum nächsten springt.
4. Metronom: Nach einer Taktlänge springt die Markierung im Takt von selbst weiter. Lies jedes markierte Zeichen laut, bevor der nächste Schlag kommt.
5. Nach dem letzten Zeichen erscheinen die Kennzahlen.

### Tipps

- Schau in die Mitte des markierten Zeichens und lies es vollständig. Nicht schon zum nächsten schielen.
- Beim Tippen im Selbsttempo nicht hetzen: Ein gleichmäßiger Rhythmus ist wertvoller als einzelne schnelle Schritte.
- Bei Leseordnung „Erst alle ersten Zeichen, dann alle zweiten“ zwingt die Tafel zu größeren Sprüngen und stärkerem Gedränge; sie ist anspruchsvoller als „Gruppe für Gruppe“.
- Vergleiche Durchläufe nur bei gleicher Tafel und gleichem Abstand.
- Zu enge Zeichen: Ein größerer Abstand zwischen den Zeichen erleichtert das Erkennen (weniger Gedränge).

### Leichter und schwerer machen

- Leichter: weniger Gruppen (3×3), nur 1 oder 2 Zeichen je Gruppe, größere Zeichen (3 cm), größere Abstände, „Gruppe für Gruppe“, Selbsttempo oder langsamer Takt (40 bis 50).
- Schwerer: größere Tafel (5×6), 4 bis 5 Zeichen je Gruppe, kleinere Zeichen (1 bis 1,5 cm), kleine Abstände zwischen den Zeichen (Gedränge), „Erst alle ersten …“, schneller Takt (70 bis 100).
- Wenn die Tafel nicht ins Feld passt, wird sie automatisch verkleinert; das erkennst du am Hinweis unten.
- Ziel: Gesamtzeit verkürzen und die Gleichmäßigkeit verbessern (kleinerer Wert bei „Streuung / Mittel“).

### Hinweise zur Sicherheit

- Bei Augenermüdung, Brennen oder Kopfschmerz sofort pausieren.
- Bei sehr kleinen Zeichen nicht zusammenkneifen; lieber die Zeichen vergrößern.
- Wenn Doppelbilder auftreten, abbrechen und fachlich abklären lassen.

### Hintergrund

Das Lesen von Zeichentafeln in fester Reihenfolge ist ein klassisches Verfahren, um Blicksprünge und Lesefluss zu üben und zu vergleichen. Zeichen, die dicht nebeneinander stehen, sind schwerer zu erkennen als einzelne (Crowding). Dieser Effekt nimmt mit dem Abstand von der Blickmitte zu, deshalb wirkt die Tafel besonders, wenn man die Zeichen im Augenwinkel „mitnimmt“. Die Gleichmäßigkeit des Tempos (Streuung geteilt durch Mittel) ist eine einfache Kennzahl für flüssiges Lesen.

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Zeilen (Gruppen) | 1 bis 8 (Schritt 1) | 4 | Zeilen mit Zeichengruppen. |
| Spalten (Gruppen) | 1 bis 8 (Schritt 1) | 4 | Spalten mit Zeichengruppen. |
| Zeichen je Gruppe | 1 bis 6 (Schritt 1) | 3 | Zeichen je Gruppe. Mehr Zeichen verlängern die Tafel und verstärken das Gedränge. |
| Zeichen | Buchstaben / Ziffern | Buchstaben | Buchstaben oder Ziffern 1 bis 9. Innerhalb einer Gruppe kommt jedes Zeichen nur einmal vor. |
| Zeichenhöhe (cm) | 0.8 bis 8 (Schritt 0.2) | 2 | Zeichenhöhe in Zentimetern. |
| Abstand zwischen Zeichen einer Gruppe (cm) | 0 bis 3 (Schritt 0.1) | 0.4 | Abstand zwischen den Zeichen einer Gruppe. Kleinere Abstände verstärken das Gedränge (Crowding). |
| Abstand zwischen Gruppen (cm) | 0.5 bis 10 (Schritt 0.5) | 3 | Abstand zwischen den Gruppen. Größere Abstände verlangen größere Blicksprünge. |
| Leseordnung | Gruppe für Gruppe / Erst alle ersten Zeichen, dann alle zweiten … | Gruppe für Gruppe | „Gruppe für Gruppe“: erst alle Zeichen der ersten Gruppe, dann der zweiten und so weiter. „Erst alle ersten Zeichen, dann alle zweiten …“: pro Durchgang durch die Tafel jeweils eine Position jeder Gruppe. |
| Tempo | Selbst bestimmt (Tippen = weiter) / Metronom-Takt | Selbst bestimmt (Tippen = weiter) | „Selbst bestimmt“: du tippst, wenn du ein Zeichen gelesen hast. „Metronom-Takt“: die Markierung springt im eingestellten Takt. |
| Takt (Schläge pro Minute, nur Metronom) | 20 bis 140 (Schritt 2) | 60 | Schläge pro Minute beim Metronom-Takt. Nur wirksam bei „Metronom-Takt“. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `symbols` | Anzahl der gelesenen Zeichen auf der Tafel. |
| `total` | Gesamtzeit vom ersten bis zum letzten Zeichen. |
| `per_min` | Gelesene Zeichen pro Minute (Lesegeschwindigkeit). |
| `step_mean` | Nur Selbsttempo: mittlere Zeit pro Zeichen. |
| `step_sd` | Nur Selbsttempo: Streuung der Zeit pro Zeichen. |
| `step_cv` | Nur Selbsttempo: Streuung geteilt durch Mittelwert in Prozent. Kleinere Werte bedeuten gleichmäßigeres Lesen. |
| `bpm` | Nur Metronom-Takt: der eingestellte Takt. |

<a id="ex-choice"></a>

## 2. Wahlreaktion

*Gruppe: Wahrnehmung und Koordination*

### Wofür die Übung gedacht ist

Du trainierst, einen Reiz schnell zu erkennen und die passende Antwort zu wählen. In der Mitte erscheint eine Farbe oder Form, unten drückst du die Schaltfläche mit derselben Farbe oder Form. Die Übung misst, wie schnell und wie genau du unter Zeitdruck zwischen mehreren Möglichkeiten entscheidest.

### Vorbereitung

- Sitz bequem, der Zeigefinger der dominanten Hand schwebt über der Mitte der Schaltflächen.
- Prüfe, dass du alle Farben gut unterscheiden kannst. Bei Farbsehschwäche die Reizart „Formen“ wählen.
- Die Einstellung „Reizgröße“ hängt von der Kalibrierung ab; sonst ist keine besondere Vorbereitung nötig.

### So läuft die Übung ab

1. Anzahl der Reize, Antwortmöglichkeiten und Reizart einstellen. Der Einstieg gelingt mit 4 Farben und 40 Reizen.
2. „Start“ drücken. In der Mitte steht zunächst ein kleines Kreuz.
3. Nach einer zufälligen Wartezeit erscheint ein Reiz. Drücke so schnell wie möglich die passende Schaltfläche.
4. Wartest du zu lange, verschwindet der Reiz und zählt als „keine Antwort“. Drückst du bevor ein Reiz erscheint, zählt das als „zu früh“.
5. Nach dem letzten Reiz erscheinen Genauigkeit und Reaktionszeiten.

### Tipps

- Schau auf die Mitte, nicht auf die Schaltflächen. Die Position der Schaltflächen lernst du nach wenigen Durchgängen.
- Nicht vorher raten und drücken: Zu frühe Antworten werden gezählt, aber nicht gewertet.
- Bleib mit dem Finger nahe an der Mitte der Schaltflächenreihe, damit alle Wege gleich kurz sind.
- Wenn du viele Fehler machst, lass dir mehr Zeit. Wenn du fast keine machst, kannst du schneller werden.

### Leichter und schwerer machen

- Leichter: 2 oder 3 Antwortmöglichkeiten, lange Antwortzeit (1.500 ms und mehr), Farben.
- Schwerer: 5 oder 6 Möglichkeiten, kürzere Antwortzeit (600 bis 900 ms), Formen, kürzere und stärker schwankende Wartezeiten.
- Die Reaktionszeit steigt mit der Zahl der Möglichkeiten; das ist normal und kein Zeichen von Verschlechterung.
- Ziel: Genauigkeit über 95 % halten und dabei die Reaktionszeit senken.

### Hinweise zur Sicherheit

- Die Übung zeigt abrupt wechselnde Farben. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.
- Bei Ermüdung oder Konzentrationsabfall abbrechen; die Werte werden dann unzuverlässig.

### Hintergrund

Je mehr Antwortmöglichkeiten es gibt, desto länger dauert die Entscheidung. Dieser Zusammenhang wird als Hick-Hyman-Gesetz beschrieben: Die Reaktionszeit wächst etwa mit dem Logarithmus der Zahl gleich wahrscheinlicher Möglichkeiten. Zusätzlich gibt es einen Austausch zwischen Tempo und Genauigkeit: Wer schneller antwortet, macht mehr Fehler. Deshalb werden beide Kennzahlen zusammen ausgewertet.

### Literatur

- Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4, 11–26.
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45, 188–196.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Anzahl der Reize | 10 bis 200 (Schritt 5) | 40 | Anzahl der Reize im Durchlauf. Die Reize sind gleichmäßig auf die Möglichkeiten verteilt. |
| Anzahl der Antwort-Schaltflächen | 2 bis 6 (Schritt 1) | 4 | Anzahl der Farben beziehungsweise Formen und damit der Schaltflächen. Mehr Möglichkeiten verlangen längere Entscheidungen. |
| Reizart | Farben / Formen | Farben | „Farben“: ein farbiger Kreis, passende Farb-Schaltfläche drücken. „Formen“: eine weiße Form, die Schaltfläche mit derselben Form drücken. |
| Antwortzeit je Reiz (ms) | 300 bis 3000 (Schritt 50) | 1500 | Wie lange du für die Antwort Zeit hast, bevor sie als fehlend gewertet wird. |
| Wartezeit mindestens (ms) | 300 bis 3000 (Schritt 50) | 600 | Kürzeste Wartezeit zwischen zwei Reizen. |
| Wartezeit höchstens (ms) | 300 bis 5000 (Schritt 50) | 1800 | Längste Wartezeit zwischen zwei Reizen. Die tatsächliche Wartezeit liegt zufällig zwischen Minimum und Maximum, damit du den Zeitpunkt nicht erraten kannst. |
| Reizgröße (cm) | 2 bis 12 (Schritt 0.5) | 6 | Größe des Reizes in Zentimetern. |
| Ton bei Antwort | Aus / An | Aus | Kurzer Ton bei jeder Antwort (hoch bei richtig, tief sonst). |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `correct` | Anzahl der richtigen Antworten. |
| `wrong` | Antworten mit der falschen Schaltfläche. |
| `omissions` | Reize, bei denen du innerhalb der Antwortzeit nichts gedrückt hast. |
| `early` | Schaltflächen, die vor Erscheinen eines Reizes gedrückt wurden. Nicht in der Wertung. |
| `accuracy` | Anteil richtiger Antworten an allen Reizen. |
| `rt_mean` | Mittlere Zeit vom Erscheinen des Reizes bis zur richtigen Antwort. Enthält die Verzögerung von Bildschirm und Touch. |
| `rt_median` | Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer. |
| `rt_sd` | Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren. |

<a id="ex-spots"></a>

## 3. Spot-Touch

*Gruppe: Wahrnehmung und Koordination*

### Wofür die Übung gedacht ist

Du trainierst, wie schnell du auf plötzlich auftauchende Ziele reagierst und sie mit der Hand erreichst (Auge-Hand-Koordination). Mit Fixationskreuz und der Zone „Nur Peripherie“ übst du zusätzlich, Reize im Augenwinkel wahrzunehmen, ohne hinzuschauen.

### Vorbereitung

- Kalibrierung durchführen (Bildschirmbreite und Abstand), damit der Punktdurchmesser in Zentimetern stimmt.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, so dass du jede Stelle mit dem Zeigefinger bequem erreichst, ohne dich zu verrenken.
- Hand locker über der Fläche halten und nicht aufstützen, damit du in alle Richtungen schnell ausholen kannst.
- Für Vergleiche immer dieselbe Hand, denselben Abstand und dasselbe Gerät benutzen. Trainiere gelegentlich auch mit der anderen Hand.

### So läuft die Übung ab

1. Einstellungen wählen; für den ersten Durchlauf genügen die Standardwerte (60 s, 5 cm, 1,5 s Sichtbarkeit).
2. „Start“ drücken und den Countdown abwarten.
3. Sobald ein Punkt erscheint, berührst du ihn so schnell wie möglich mit der Fingerspitze. Der Punkt verschwindet beim Treffer und nach einer kurzen Pause erscheint der nächste.
4. Wird ein Punkt nicht innerhalb der Sichtbarkeitszeit berührt, verschwindet er und zählt als verpasst. Berührungen neben einem Punkt zählen als Fehltipp.
5. Mit Fixationskreuz: Der Blick bleibt die ganze Zeit auf dem Kreuz in der Mitte. Du nimmst die Punkte aus dem Augenwinkel wahr und berührst sie, ohne den Blick zu verlagern.
6. Nach Ablauf der Zeit erscheinen die Kennzahlen. „Nochmal“ wiederholt mit denselben Einstellungen.

### Tipps

- Zuerst Treffsicherheit, dann Tempo: Wer hastig tippt, produziert Fehltipps und verliert Zeit.
- Berühre die Mitte des Punktes. Ein Treffer am Rand wird zwar noch gezählt (kleine Toleranz), aber genaues Zielen schult die Koordination.
- Bleib locker und atme ruhig. Verspannte Schultern machen die Bewegung langsamer.
- Vergleiche Durchläufe nur bei gleichen Einstellungen; ändere immer nur eine Einstellung auf einmal.
- Bei der Peripherie-Variante ist es normal, dass die Quote anfangs deutlich sinkt. Nimm größere Punkte oder mehr Sichtbarkeit, bis du sicher triffst.

### Leichter und schwerer machen

- Leichter: größere Punkte (7 bis 9 cm), längere Sichtbarkeit (2 bis 3 s), ein einzelner Punkt, ganze Fläche, längere Pause zwischen den Punkten.
- Schwerer: kleinere Punkte (3 bis 4 cm), kürzere Sichtbarkeit (0,8 bis 1,0 s), mehrere gleichzeitige Punkte, kurze oder keine Pause.
- Peripherie: erst „Gesamte Fläche“ mit Fixationskreuz, dann „Nur Peripherie“. Erhöhe die Schwierigkeit erst, wenn die Quote über etwa 90 % liegt.
- Faustregel: Über 90 % Treffer in drei Läufen hintereinander → eine Stufe schwerer. Unter 70 % → eine Stufe leichter.

### Hinweise zur Sicherheit

- Die Übung blinkt nicht, zeigt aber plötzliche Wechsel. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.
- Handgelenk und Finger schonen: alle 5 bis 10 Minuten kurz lockern, Hand wechseln.
- Bei Schwindel oder Augenbeschwerden abbrechen und pausieren.

### Hintergrund

Die Reaktionszeit setzt sich aus Wahrnehmen, Entscheiden und Bewegen zusammen. Die Bewegungszeit hängt nach dem Fittsschen Gesetz vom Abstand und von der Zielgröße ab: kleinere und weiter entfernte Ziele dauern länger. Zum Rand des Gesichtsfelds nehmen Schärfe und Kontrastempfinden ab, deshalb müssen Ziele in der Peripherie größer oder länger sichtbar sein. Die gemessene Zeit enthält auch die Verzögerung von Bildschirm und Touch-Sensor (typisch einige zehn Millisekunden) und ist daher nur auf demselben Gerät vergleichbar.

### Literatur

- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47, 381–391.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Dauer (s) | 10 bis 600 (Schritt 5) | 60 | Wie lange der Durchlauf dauert. 30 bis 60 Sekunden eignen sich zum Testen, 2 bis 5 Minuten zum Trainieren. Bei langen Läufen sinkt die Leistung durch Ermüdung. |
| Durchmesser der Spots (cm) | 1 bis 15 (Schritt 0.5) | 5 | Durchmesser der Punkte in Zentimetern. Kleinere Punkte verlangen genaueres Zielen und sind schwerer. 5 cm ist ein guter Startwert. |
| Sichtbarkeit je Spot (s) | 0.3 bis 10 (Schritt 0.1) | 1.5 | Wie lange ein Punkt sichtbar bleibt, bevor er als verpasst gilt. Kürzere Zeiten erhöhen den Zeitdruck. |
| Gleichzeitige Spots | 1 bis 5 (Schritt 1) | 1 | Wie viele Punkte gleichzeitig sichtbar sind. Bei mehreren musst du entscheiden, welchen du zuerst nimmst; das erschwert die Aufgabe deutlich. |
| Pause bis zum nächsten Spot (ms) | 0 bis 3000 (Schritt 50) | 300 | Pause in Millisekunden zwischen einem Treffer und dem nächsten Punkt. Eine kurze Pause erhöht das Tempo, eine längere gibt Zeit zum Zurückführen der Hand. |
| Zone | Gesamte Fläche / Nur Peripherie / Nur Zentrum | Gesamte Fläche | „Gesamte Fläche“: überall. „Nur Peripherie“: nur im äußeren Bereich, weit weg von der Mitte. „Nur Zentrum“: nur im mittleren Bereich. Die Peripherie-Zone ist besonders sinnvoll mit Fixationskreuz. |
| Fixationskreuz in der Mitte | Nein / Ja | Nein | Zeigt ein kleines Kreuz in der Mitte und hält die Punkte davon fern. Der Blick soll auf dem Kreuz bleiben, die Punkte werden aus dem Augenwinkel wahrgenommen. |
| Ton bei Treffer/Fehltipp | Aus / An | Aus | Kurzer Ton bei einem Treffer (hoch) und bei einem Fehltipp (tief). Hilft beim Lernen; für reine Messungen kann er ausgeschaltet bleiben. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `hits` | Anzahl der Punkte, die du rechtzeitig getroffen hast. Je höher, desto besser; hängt von Tempo und Einstellungen ab. |
| `misses` | Punkte, die verschwunden sind, bevor du sie berührt hast. Hohe Werte sprechen für zu wenig Zeit oder zu hohes Tempo der Einstellung. |
| `stray` | Berührungen, die keinen Punkt getroffen haben. Viele Fehltipps deuten auf hastiges oder ungenaues Zielen hin. |
| `accuracy` | Anteil der getroffenen an allen gezeigten Punkten (Treffer plus verpasste). Fehltipps sind hier nicht enthalten. |
| `rt_mean` | Mittlere Zeit vom Erscheinen eines Punktes bis zur Berührung, nur für Treffer. Enthält die Verzögerung des Geräts; nur auf demselben Gerät vergleichen. |
| `rt_median` | Mittlere Zeit nach Sortierung der Einzelwerte. Weniger empfindlich gegen Ausreißer als der Mittelwert. |
| `rt_sd` | Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren. |
| `rate` | Getroffene Punkte pro Minute. Berücksichtigt auch die Pausen, vergleichbar nur bei gleicher Pausen- und Sichtbarkeitseinstellung. |

<a id="ex-dual"></a>

## 4. Doppelaufgabe

*Gruppe: Aufmerksamkeit*

### Wofür die Übung gedacht ist

Du trainierst geteilte Aufmerksamkeit. In der Mitte läuft eine Folge von Zahlen; sobald die Zielzahl erscheint, berührst du die Mitte. Gleichzeitig tauchen am Rand Punkte auf, die du ebenfalls berührst, ohne den Blick von der Mitte zu lösen. Mit den Modi „Nur Mitte“ und „Nur Rand“ kannst du außerdem messen, wie viel Leistung durch die zweite Aufgabe verloren geht.

### Vorbereitung

- Kalibrierung durchführen, damit die Punktgröße am Rand stimmt.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt. Der Blick bleibt in der Mitte; die Hand wechselt zwischen Mitte und Rand.
- Plane einen ersten Durchlauf in jedem der drei Modi ein, um eine Vergleichsbasis zu haben.

### So läuft die Übung ab

1. Modus und Zielzahl wählen. Standard: beide Aufgaben gleichzeitig, Zielzahl 7, Wechsel alle 900 ms.
2. „Start“ drücken. In der Mitte erscheinen Zahlen im Wechsel; rundherum liegt ein Kreis.
3. Erscheint die Zielzahl, berührst du innerhalb ihrer Anzeigezeit den Kreis in der Mitte. Andere Zahlen berührst du nicht.
4. Gleichzeitig erscheinen am Rand farbige Punkte. Berühre sie, während du die Mitte im Blick behältst.
5. Nach der Zeit erscheinen die Kennzahlen für beide Aufgaben getrennt.

### Tipps

- Der Blick bleibt in der Mitte. Wer zu den Randpunkten schaut, verpasst Zielzahlen.
- Die Hand wartet über der Mitte; für Randpunkte kurze, direkte Bewegungen.
- Du musst nicht alles schaffen. Zuerst die Mitte sichern, dann so viele Randpunkte wie möglich.
- Wenn sich beide Aufgaben gegenseitig stören, trainiere erst „Nur Mitte“ und „Nur Rand“, dann kombiniert.
- Mit der Zeit werden Teilbewegungen automatischer; das ist das Ziel des Trainings.

### Leichter und schwerer machen

- Leichter: Zahlenwechsel langsamer (1.200 bis 1.800 ms), seltene Zielzahlen (10 bis 15 %), große Randpunkte (7 bis 9 cm), lange Sichtbarkeit.
- Schwerer: Zahlenwechsel schneller (500 bis 700 ms), häufigere Zielzahlen (30 bis 40 %), kleinere Randpunkte (3 bis 4 cm), kurze Sichtbarkeit, kurze Pause.
- Messe die „Kosten“ der Doppelaufgabe: Vergleiche die Ergebnisse von „Beide“ mit „Nur Mitte“ bzw. „Nur Rand“ bei sonst gleichen Einstellungen. Je kleiner der Unterschied, desto besser gelingt die Aufteilung.
- Wenn die Mitte zu leicht ist, erhöhe das Tempo oder die Häufigkeit der Zielzahl.

### Hinweise zur Sicherheit

- Die Zahlen wechseln schnell, die Punkte erscheinen plötzlich. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.
- Die Doppelaufgabe ist anstrengend; maximal 10 Minuten am Stück.
- Bei Schwindel oder Augenbeschwerden abbrechen.

### Hintergrund

Wenn zwei Aufgaben gleichzeitig bearbeitet werden, sinkt die Leistung meist in mindestens einer, weil sie um dieselben Kapazitäten (Aufmerksamkeit, Antwortauswahl) konkurrieren. Dieser Doppelaufgaben-Effekt ist ein Standardmaß für Aufmerksamkeitskapazität. Die Randpunkte in dieser Übung nutzen die Wahrnehmung im Gesichtsfeldrand, während die Mitte das Fixieren fordert. Die App kann nicht prüfen, ob der Blick wirklich in der Mitte bleibt.

### Literatur

- Pashler, H. (1994). Dual-task interference in simple tasks: Data and theory. Psychological Bulletin, 116, 220–244.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Aufgaben | Beide gleichzeitig / Nur Mitte (Zahlenfolge) / Nur Rand (Punkte) | Beide gleichzeitig | „Beide gleichzeitig“ ist die Doppelaufgabe. „Nur Mitte“ und „Nur Rand“ messen jede Aufgabe einzeln als Vergleichsbasis. |
| Dauer (s) | 20 bis 300 (Schritt 10) | 60 | Dauer des Durchlaufs in Sekunden. |
| Zahlenwechsel alle (ms) | 400 bis 2500 (Schritt 50) | 900 | Alle wie viele Millisekunden die Zahl in der Mitte wechselt. Kürzere Zeiten verlangen schnelleres Erkennen. |
| Zielzahl | 1 bis 9 (Schritt 1) | 7 | Die Zahl, bei der die Mitte berührt werden soll. |
| Anteil der Zielzahlen (%) | 5 bis 50 (Schritt 5) | 20 | Anteil der Zahlen, die Zielzahlen sind. Höhere Anteile erhöhen die Zahl der nötigen Reaktionen. |
| Durchmesser der Randpunkte (cm) | 1 bis 12 (Schritt 0.5) | 5 | Durchmesser der Randpunkte in Zentimetern. |
| Sichtbarkeit der Randpunkte (s) | 0.4 bis 6 (Schritt 0.1) | 1.5 | Wie lange ein Randpunkt sichtbar bleibt. |
| Pause zwischen Randpunkten (ms) | 0 bis 3000 (Schritt 50) | 400 | Pause zwischen zwei Randpunkten. |
| Ton bei Berührung | Aus / An | Aus | Kurzer Ton bei Treffer (hoch) und Fehlberührung (tief). |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `c_hits` | Zielzahlen, bei denen du die Mitte rechtzeitig berührt hast. |
| `c_misses` | Zielzahlen, bei denen du nicht reagiert hast, solange sie sichtbar war. |
| `c_false` | Berührungen der Mitte, obwohl keine Zielzahl zu sehen war oder obwohl du bereits reagiert hattest. |
| `c_rt` | Mittlere Zeit vom Erscheinen einer Zielzahl bis zur Berührung der Mitte. |
| `p_hits` | Randpunkte, die du rechtzeitig berührt hast. |
| `p_misses` | Randpunkte, die verschwunden sind, bevor du sie berührt hast. |
| `p_stray` | Berührungen, die weder die Mitte noch einen Randpunkt getroffen haben. |
| `p_rt` | Mittlere Zeit vom Erscheinen eines Randpunktes bis zur Berührung. |

<a id="ex-findchars"></a>

## 5. Zeichen finden

*Gruppe: Gedächtnis und Konzentration*

### Wofür die Übung gedacht ist

Du suchst in einem Raster ähnlicher Zeichen alle Exemplare eines Zielzeichens und tippst sie an. Die Übung trainiert genaues Unterscheiden ähnlicher Zeichen (zum Beispiel b, d, p, q), systematisches Absuchen und Aufmerksamkeit.

### Vorbereitung

- Kalibrierung durchführen, damit die Feldgröße in Zentimetern stimmt.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt; der Kopf bleibt ruhig.
- Das Zielzeichen steht oben groß in Grün; die gesuchten Zeichen sind genau dieses Zeichen, nicht Spiegelungen davon.

### So läuft die Übung ab

1. Zeichenvorrat, Rastergröße und Anteil der Zielzeichen einstellen. Für den Einstieg: b d p q, 5×8, 20 %.
2. „Start“ drücken. Oben steht das Zielzeichen, darunter das Raster.
3. Tippe jedes Exemplar des Zielzeichens an. Richtige werden grün markiert, falsche rot.
4. Sobald alle gefunden sind, kommt automatisch die nächste Tafel. Wenn du sicher bist, alle gefunden zu haben, oder aufgeben möchtest, drückst du „Fertig“. Übersehene Zeichen zählen als verpasst.
5. Nach der letzten Tafel erscheinen die Kennzahlen.

### Tipps

- Suche systematisch, zum Beispiel Zeile für Zeile von links nach rechts. Wer wild springt, übersieht mehr.
- Achte auf das Merkmal, das das Zeichen von den ähnlichen unterscheidet: Bei b und d ist es die Seite des Bogens, bei p und q die Richtung des Striches.
- Hake gedanklich ab, welche Zeilen du schon geprüft hast.
- Tippe nur, wenn du sicher bist. Falsche Zeichen senken die Genauigkeit.
- Bei Zeichenverwechslungen eine Pause einlegen und die Tafelgröße verringern.

### Leichter und schwerer machen

- Leichter: weniger Felder (4×6), höherer Anteil an Zielzeichen (30 bis 40 %), größere Felder, Zeichenvorrat „Ziffern“.
- Schwerer: mehr Felder (8×12), geringer Anteil (10 %), kleinere Felder (1,5 bis 2 cm), Vorrat „b d p q“ oder „Gemischt“.
- Wechsle zwischen den Zeichenvorräten, damit sich keine Gewöhnung einstellt.
- Ziel: Genauigkeit über 95 % und kürzere Zeit pro gefundenem Zeichen.

### Hinweise zur Sicherheit

- Ähnliche Zeichen sind anstrengend für die Augen. Nach 10 Minuten pausieren.
- Wenn Buchstaben bei dir häufig gespiegelt oder vertauscht erscheinen, dies fachlich abklären lassen.
- Kinder: kleine Tafeln und Erfolgserlebnisse. Nicht unter Zeitdruck setzen.

### Hintergrund

Aufgaben, in denen Zielzeichen aus ähnlichen Zeichen herausgesucht werden, gehören zu den visuellen Such- und Streichungsaufgaben. Sie verlangen Selektion nach Merkmalen und systematisches Absuchen. Verwechslungen von Zeichen, die sich nur durch Spiegelung oder Drehung unterscheiden (b/d, p/q), sind in der Lesentwicklung häufig und werden hier gezielt geübt. Ein aussagekräftiges Maß ist die Zeit pro gefundenem Zeichen zusammen mit der Genauigkeit.

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Zeichenvorrat | b d p q / Ziffern (1 7 4 9 …) / Ähnliche Buchstaben (O Q C G D …) / Gemischt | b d p q | „b d p q“: spiegelähnliche Buchstaben. „Ziffern“: 1 7 4 9 6 2 5 3. „Ähnliche Buchstaben“: O Q C G D U E F. „Gemischt“: eine Auswahl aus allen. |
| Zeilen | 2 bis 12 (Schritt 1) | 5 | Zeilen des Rasters. Mehr Zeilen bedeuten mehr Felder und eine längere Suche. |
| Spalten | 2 bis 16 (Schritt 1) | 8 | Spalten des Rasters. Mehr Spalten bedeuten mehr Felder und eine längere Suche. |
| Anteil der Zielzeichen (%) | 5 bis 50 (Schritt 5) | 20 | Anteil der Felder, die das Zielzeichen enthalten. Weniger Zielzeichen erschweren die Suche. |
| Feldgröße (cm) | 1 bis 6 (Schritt 0.5) | 2.5 | Kantenlänge eines Feldes in Zentimetern. Passt sich an, wenn das Raster nicht in den Bildschirm passt. |
| Anzahl der Tafeln | 1 bis 20 (Schritt 1) | 5 | Anzahl der Tafeln im Durchlauf. Das Zielzeichen wechselt von Tafel zu Tafel. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `found` | Anzahl der gefundenen Zielzeichen im ganzen Durchlauf. |
| `missed` | Zielzeichen, die bei „Fertig“ noch nicht gefunden waren. |
| `false_taps` | Angetippte Zeichen, die nicht das Zielzeichen waren. |
| `accuracy` | Gefundene geteilt durch (gefundene + übersehene + falsche). Je näher an 100 %, desto besser. |
| `per_target` | Gesamtzeit aller Tafeln geteilt durch die Zahl der gefundenen Zeichen. |
| `total` | Gesamtzeit des Durchlaufs. |

<a id="ex-flash"></a>

## 6. Blitz-Erkennung

*Gruppe: Peripheres Sehen und schnelle Erkennung*

### Wofür die Übung gedacht ist

Du trainierst und misst, wie viel du mit einem sehr kurzen Blick erfassen kannst. Ziffern oder Buchstaben erscheinen für Bruchteile einer Sekunde in der Mitte; danach tippst du sie über ein Tastenfeld ein. Mit der automatischen Anpassung ermittelt die App deine persönliche Schwelle der Anzeigedauer.

### Vorbereitung

- Kalibrierung durchführen, damit die Zeichenhöhe stimmt.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt und halte den Blick ruhig auf die Mitte.
- Die Anzeigezeit ist auf die Bildwiederholrate des Bildschirms gerundet (bei 60 Hz in Schritten von etwa 17 ms). Wähle für aussagekräftige Messungen Zeiten über 50 ms.
- Raum abdunkeln oder zumindest Spiegelungen vermeiden, weil kurze Einblendungen davon besonders beeinträchtigt werden.

### So läuft die Übung ab

1. Zeichenart, Anzahl der Zeichen und Anzeigedauer wählen. Starte zum Beispiel mit 3 Ziffern und 200 ms.
2. „Start“ drücken. In der Mitte erscheint kurz ein Fixationskreuz, dort bleibt dein Blick.
3. Dann blitzen die Zeichen für die eingestellte Dauer auf. Optional folgt eine Maske, die das Nachbild löscht.
4. Tippe die Zeichen in der gezeigten Reihenfolge über das Tastenfeld. Mit „Löschen“ korrigierst du. Nach der letzten Taste wird automatisch ausgewertet.
5. Du siehst kurz, ob die Antwort richtig war und was gezeigt wurde. Nach allen Durchgängen erscheinen die Kennzahlen.

### Tipps

- Nicht suchen: Der Blick bleibt in der Mitte. Wer erst zu den Zeichen springen will, verpasst sie.
- Fasse die Zeichen als Ganzes auf, wie ein Wort oder eine Zahl, statt sie einzeln abzulesen.
- Rate, wenn du unsicher bist, aber mit Verstand: ein Teil richtig zählt für die Zeichenquote.
- Die ersten Durchgänge dienen zum Eingewöhnen; lass sie nicht in die Bewertung einfließen.
- Mache regelmäßig Pausen, weil die Konzentration schnell nachlässt.

### Leichter und schwerer machen

- Leichter: weniger Zeichen (2 bis 3), längere Dauer (300 bis 500 ms), Ziffern, mit Maske aus.
- Schwerer: mehr Zeichen (4 bis 6), kürzere Dauer (50 bis 120 ms), Buchstaben, Maske ein.
- Mit „Dauer automatisch anpassen“ wird die Dauer nach zwei richtigen Antworten kürzer und nach jedem Fehler länger. Die geschätzte Schwelle gibt die Dauer an, bei der du ungefähr 70 % der Durchgänge richtig löst.
- Ziel: Schwelle über Wochen senken oder bei gleicher Dauer mehr Zeichen sicher erfassen.

### Hinweise zur Sicherheit

- Sehr kurze Einblendungen und die Maske erzeugen schnelle Helligkeitswechsel. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.
- Bei Kopfschmerz, Flimmern oder Augenschmerz abbrechen.
- Die Übung ist anstrengend. Halte die Einheit kurz (maximal 10 Minuten).

### Hintergrund

Kurze Einblendungen mit anschließender Abfrage (Tachistoskop-Prinzip) zeigen, wie viel visuelle Information in einem Blick erfasst und kurz gespeichert wird. Klassische Versuche zeigten, dass man mehr sieht, als man danach berichten kann (Sperling). Das adaptive Verfahren folgt dem bekannten „2-aufwärts-1-abwärts“-Prinzip und konvergiert auf eine Schwelle von etwa 71 % richtiger Antworten (Levitt). Die Genauigkeit der gemessenen Schwelle hängt von der Zahl der Umkehrpunkte ab; mindestens 20 Durchgänge sind sinnvoll.

### Literatur

- Sperling, G. (1960). The information available in brief visual presentations. Psychological Monographs, 74 (11).
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. Journal of the Acoustical Society of America, 49, 467–477.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Anzahl der Durchgänge | 5 bis 100 (Schritt 5) | 20 | Anzahl der Durchgänge. Für eine zuverlässige Schwellenschätzung mindestens 20. |
| Zeichen | Ziffern / Buchstaben | Ziffern | Ziffern oder Buchstaben. Innerhalb eines Durchgangs wiederholt sich kein Zeichen. |
| Zeichen pro Durchgang | 1 bis 6 (Schritt 1) | 3 | Wie viele Zeichen pro Durchgang gezeigt werden. Mehr Zeichen sind schwerer. |
| Anzeigedauer (ms, Startwert) | 16 bis 2000 (Schritt 10) | 200 | Anzeigedauer in Millisekunden. Bei automatischer Anpassung ist das der Startwert. |
| Dauer automatisch anpassen | Nein (feste Dauer) / Ja (Schwelle bestimmen) | Nein (feste Dauer) | Bei „Ja“ verkürzt sich die Dauer nach zwei richtigen Durchgängen in Folge und verlängert sich nach jedem Fehler. So findet die App deine Schwelle. |
| Maske nach der Anzeige | Ja / Nein | Ja | Eine Fläche aus Balken direkt nach der Anzeige löscht das Nachbild im Auge. Ohne Maske sehen die Zeichen länger nach als sie gezeigt werden. |
| Zeichenhöhe (cm) | 1 bis 12 (Schritt 0.5) | 3 | Höhe der Zeichen in Zentimetern. Bei sehr kurzen Zeiten helfen größere Zeichen. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `correct` | Durchgänge, bei denen alle Zeichen an der richtigen Stelle eingegeben wurden. |
| `accuracy` | Anteil vollständig richtiger Durchgänge an allen Durchgängen. |
| `symbol_accuracy` | Anteil der Zeichen, die an der richtigen Stelle eingegeben wurden. Milder als die Gesamtquote. |
| `entry_mean` | Mittlere Zeit für die Eingabe, vom Tastenfeld bis zur letzten Taste. |
| `threshold` | Geschätzte kürzeste Anzeigedauer, bei der du noch etwa 70 % richtig löst (Mittel der letzten Umkehrpunkte). Nur bei automatischer Anpassung und wenn genug Umkehrpunkte vorliegen. |
| `final_duration` | Die Anzeigedauer des letzten Durchgangs. Hinweis auf die Leistung zum Ende. |
| `duration` | Die fest eingestellte Anzeigedauer. |

<a id="ex-follow"></a>

## 7. Ziel verfolgen

*Gruppe: Wahrnehmung und Koordination*

### Wofür die Übung gedacht ist

Du hältst den Finger auf einem gleichmäßig bewegten Ziel. Die Übung trainiert das gleitende Verfolgen mit den Augen und die gleichzeitige Führung der Hand (Augen-Hand-Verfolgung) und zeigt, wie lange und wie genau du das Ziel hältst.

### Vorbereitung

- Kalibrierung durchführen, damit Größe und Geschwindigkeit in Zentimetern stimmen.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt; der Arm ist so entspannt, dass die ganze Bahn erreichbar ist.
- Der Bildschirm sollte sauber sein, weil der Finger darüber gleitet.
- Lege die Hand nicht auf den Rahmen auf; sie soll frei beweglich bleiben.

### So läuft die Übung ab

1. Bahn, Geschwindigkeit und Zielgröße einstellen. Einstieg: Ellipse, 8 cm/s, 3 cm Durchmesser, 30 s.
2. „Start“ drücken. Das gelbe Ziel setzt sich in Bewegung.
3. Setze den Finger auf das Ziel und gleite mit, ohne abzusetzen. Wenn du das Ziel triffst, färbt es sich grün.
4. Verlierst du das Ziel, setze den Finger wieder an und hole auf.
5. Nach der Zeit erscheinen die Kennzahlen.

### Tipps

- Folge dem Ziel mit den Augen und führe die Hand nach; Blick und Finger bleiben beieinander.
- Bewege dich mit dem ganzen Arm, nicht nur mit dem Finger. Das macht die Bewegung flüssiger.
- Wenn du das Ziel verloren hast, springe nicht hektisch hinterher, sondern fange es gezielt wieder ein.
- Wähle bei Anfängern die sichtbare Bahn. Ohne Bahn musst du die Bewegung vorhersagen.
- Lockere die Schulter und atme gleichmäßig.

### Leichter und schwerer machen

- Leichter: Ellipse, langsame Geschwindigkeit (3 bis 6 cm/s), großes Ziel (4 bis 6 cm), größere Toleranz (1 cm).
- Schwerer: Liegende Acht oder verschlungene Kurve, höhere Geschwindigkeit (12 bis 25 cm/s), kleineres Ziel (1,5 bis 2 cm), geringe Toleranz, Bahn ausblenden.
- Wechsle die Hand und vergleiche die Ergebnisse.
- Ziel: Anteil der Zeit auf dem Ziel steigern, bei gleichzeitig höherer Geschwindigkeit.

### Hinweise zur Sicherheit

- Gleitende Augenbewegungen über längere Zeit sind ermüdend. Halte die Einheiten kurz (10 Minuten).
- Bei Schwindel, Übelkeit oder Augenbrennen sofort abbrechen.
- Schnelle Armbewegungen belasten Schulter und Ellenbogen. Pausen einlegen.

### Hintergrund

Beim gleitenden Verfolgen (Smooth Pursuit) folgen die Augen einem bewegten Ziel ohne Sprünge. Bei höheren Geschwindigkeiten oder unvorhersehbaren Bewegungen schalten die Augen auf kleine Aufholsprünge (Sakkaden) um. Die gemeinsame Führung von Auge und Hand ist eine zusammengesetzte Fähigkeit. Die App misst nur die Handführung; was die Augen tun, kann sie nicht erfassen.

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Dauer (s) | 10 bis 180 (Schritt 5) | 30 | Dauer des Durchlaufs in Sekunden. |
| Bahn | Ellipse / Liegende Acht / Verschlungene Kurve | Ellipse | „Ellipse“ ist gleichmäßig und vorhersehbar. „Liegende Acht“ und „Verschlungene Kurve“ haben wechselnde Krümmungen und sind schwerer. |
| Geschwindigkeit (cm/s) | 2 bis 40 (Schritt 1) | 8 | Geschwindigkeit des Ziels in Zentimetern pro Sekunde (gleichmäßig, unabhängig von der Kurvenform). |
| Zieldurchmesser (cm) | 1 bis 10 (Schritt 0.5) | 3 | Durchmesser des Ziels. Kleinere Ziele verlangen mehr Genauigkeit. |
| Toleranz (cm) | 0 bis 3 (Schritt 0.1) | 0.5 | Zusätzlicher Spielraum um das Ziel, der noch als „auf dem Ziel“ zählt, damit der Finger nicht pixelgenau sein muss. |
| Bahn anzeigen | Ja / Nein | Ja | Zeigt die Bahn als dünne Linie. Ohne Bahn musst du die Bewegung vorhersagen. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `on_pct` | Anteil der Zeit, in der der Finger auf dem Ziel war (bezogen auf die gesamte Zeit, auch die ohne Finger). |
| `on_s` | Dieselbe Zeit in Sekunden. |
| `mean_dist` | Mittlerer Abstand zwischen Finger und Zielmitte, solange der Finger auf dem Bildschirm war. Kleinere Werte bedeuten genaueres Führen. |
| `best_run` | Längste Zeitspanne ohne Unterbrechung auf dem Ziel. |
| `losses` | Wie oft du das Ziel verloren hast, nachdem du es erreicht hattest. |
| `touch_pct` | Anteil der Zeit, in der der Finger den Bildschirm berührt hat, egal wo. |

<a id="ex-ordering"></a>

## 8. Bewegte Ziele ordnen

*Gruppe: Wahrnehmung und Koordination*

### Wofür die Übung gedacht ist

Zahlen, Buchstaben, Wörter oder Rechenaufgaben bewegen sich über den Bildschirm. Du berührst sie in der richtigen Reihenfolge (zum Beispiel von klein nach groß oder nach Alphabet). Die Übung verbindet Verfolgen bewegter Ziele, Suchen und gedankliches Ordnen unter Zeitdruck.

### Vorbereitung

- Kalibrierung durchführen, damit die Zeichenhöhe in Zentimetern stimmt.
- Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, Hand frei beweglich über dem Bildschirm.
- Für Wörter und Rechenaufgaben ausreichend Zeichenhöhe (3 cm und mehr) wählen, damit Texte schon im Bewegungsmoment gelesen werden können.

### So läuft die Übung ab

1. Inhalt, Anzahl und Bewegungsart wählen. Beginne zum Beispiel mit 8 Zahlen, geradliniger Bewegung und 6 cm/s.
2. „Start“ drücken. Die Ziele beginnen sich zu bewegen. Oben links steht die Aufgabe, zum Beispiel „Zahlen von klein nach groß“.
3. Finde das nächste Ziel in der Reihenfolge (zum Beispiel die 1) und berühre es. Berührte Ziele verschwinden.
4. Berührst du ein falsches Ziel, zählt das als Fehler und es passiert nichts weiter. Berührungen neben ein Ziel zählen als „Danebengetippt“.
5. Sind alle Ziele berührt, endet die Übung und zeigt Gesamtzeit und Fehler. Mit Zeitlimit endet sie nach Ablauf der Zeit.

### Tipps

- Lege dir die Reihenfolge schon vor dem Start im Kopf zurecht (bei Wörtern: Anfangsbuchstaben vergleichen). Dann suchst du nur noch das nächste Ziel.
- Beobachte das gesuchte Ziel zuerst und berühre es dort, wo es in einem Moment sein wird, nicht dort, wo es gerade ist (vorausschauend zielen).
- Bei Kreisbahnen warte einfach auf das gesuchte Ziel; die Bahn ist vorhersehbar.
- Bei Rechenaufgaben die Ergebnisse im Kopf rechnen und das niedrigste zuerst suchen. Das fordert das Arbeitsgedächtnis besonders.
- Falsche Berührungen kosten Zeit; lieber einen Moment länger suchen.

### Leichter und schwerer machen

- Leichter: weniger Ziele (3 bis 6), niedrige Geschwindigkeit (2 bis 4 cm/s), Zahlen aufsteigend, größere Zeichen.
- Schwerer: mehr Ziele (10 bis 15), höhere Geschwindigkeit (8 bis 15 cm/s), Wörter oder Rechenaufgaben, absteigende Zahlen, kleinere Zeichen.
- Bewegungsarten: Kreis- und Ellipsenbahn sind gleichmäßig und vorhersehbar, die geradlinige Bewegung mit Abprallen ist unregelmäßiger.
- Ziel: Gesamtzeit senken, ohne Fehler zu erhöhen.

### Hinweise zur Sicherheit

- Bewegte Schrift kann bei längerem Betrachten die Augen belasten. Alle 5 bis 10 Minuten pausieren.
- Bei Schwindel oder Übelkeit abbrechen; langsamere Bewegung wählen.
- Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.

### Hintergrund

Das Ordnen von Zahlen und Buchstaben gleicht klassischen Verbindungsaufgaben der Neuropsychologie (Trail Making), die Aufmerksamkeit, Suchgeschwindigkeit und das Wechseln zwischen Regeln messen. Hier kommen bewegte Ziele hinzu, was das Vorausschätzen von Bewegungen verlangt. Die Zeit pro Ziel steigt typischerweise mit der Zahl der Ziele und der Geschwindigkeit.

### Literatur

- Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills, 8, 271–276.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Inhalt | Zahlen aufsteigend / Zahlen absteigend / Buchstaben alphabetisch / Wörter alphabetisch / Summen nach Ergebnis aufsteigend / Produkte nach Ergebnis aufsteigend | Zahlen aufsteigend | Was geordnet wird: Zahlen auf- oder absteigend, Buchstaben oder Wörter alphabetisch, Summen oder Produkte nach dem Ergebnis (kleinstes zuerst). |
| Anzahl der Ziele | 3 bis 15 (Schritt 1) | 8 | Anzahl der Ziele. Mehr Ziele machen die Aufgabe länger und schwerer. |
| Bewegung | Geradlinig (prallt ab) / Kreisbahn / Ellipsenbahn | Geradlinig (prallt ab) | „Geradlinig“: Ziele bewegen sich geradeaus und prallen am Rand ab. „Kreisbahn“ und „Ellipsenbahn“: Ziele laufen gleichmäßig verteilt auf einer Bahn. |
| Geschwindigkeit (cm/s) | 1 bis 30 (Schritt 0.5) | 6 | Geschwindigkeit in Zentimetern pro Sekunde (bei Bahnen als Bahngeschwindigkeit). Höhere Werte erschweren das Treffen. |
| Zeichenhöhe (cm) | 1.5 bis 8 (Schritt 0.5) | 3 | Zeichenhöhe in Zentimetern. Die Kästchen werden bei Wörtern entsprechend breiter. |
| Umlaufrichtung (Bahnen) | Im Uhrzeigersinn / Gegen den Uhrzeigersinn | Im Uhrzeigersinn | Nur bei Kreis- und Ellipsenbahn: Umlaufrichtung im oder gegen den Uhrzeigersinn. |
| Zeitlimit (s, 0 = keines) | 0 bis 300 (Schritt 5) | 0 | Optionales Zeitlimit in Sekunden. 0 bedeutet kein Zeitlimit. |
| Ton bei Berührung | Aus / An | Aus | Kurzer Ton bei richtiger (hoch) und falscher (tief) Berührung. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `solved` | Anzahl der Ziele, die du in der richtigen Reihenfolge berührt hast. |
| `total` | Gesamtzeit vom Start bis zum letzten Ziel (oder bis zum Zeitlimit). |
| `wrong` | Wie oft du ein Ziel berührt hast, das nicht an der Reihe war. |
| `stray` | Berührungen, die kein Ziel getroffen haben. |
| `t_mean` | Mittlere Zeit zwischen zwei richtigen Berührungen. Enthält Suchen und Treffen. |
| `t_sd` | Streuung dieser Zeiten. Hohe Werte deuten auf einzelne schwer zu findende Ziele hin. |

<a id="ex-periphery"></a>

## 9. Peripheres Erkennen

*Gruppe: Peripheres Sehen und schnelle Erkennung*

### Wofür die Übung gedacht ist

Du trainierst und misst das Erkennen am Rand des Gesichtsfelds. Der Blick bleibt auf einer wechselnden Zahl in der Mitte. Kurz blitzt am Rand ein Buchstabe auf, den du danach aus mehreren Möglichkeiten auswählst. Abstand und Anzeigedauer sind einstellbar; mit der automatischen Anpassung ermittelt die App die kürzeste Dauer, bei der du noch zuverlässig antwortest.

### Vorbereitung

- Kalibrierung unbedingt gewissenhaft durchführen: Der Abstand von der Mitte wird in Sehwinkelgrad angegeben und hängt vom eingetragenen Sitzabstand ab.
- Sitz in dem eingetragenen Abstand (Standard 60 cm), den Kopf mittig vor dem Bildschirm. Bei einem kleinen Bildschirm kann der gewünschte Winkel nicht erreicht werden; die App begrenzt ihn und zeigt in den Kennzahlen den tatsächlichen Abstand.
- Halte den Kopf ruhig und die Augen in der Mitte. Eine Kopfstütze (Kinnstütze) verbessert die Messung.
- Wähle ein Umfeld ohne Ablenkung, weil die Aufgabe hohe Konzentration verlangt.

### So läuft die Übung ab

1. Abstand, Richtungen und Dauer einstellen. Beginne mit 10 Grad, links und rechts, 150 ms.
2. „Start“ drücken. In der Mitte wechseln Zahlen im Takt; dort bleibt dein Blick die ganze Zeit.
3. Nach einer zufälligen Zeit blitzt am Rand ein Buchstabe auf. Schau nicht hin, sondern nimm ihn aus dem Augenwinkel wahr.
4. Wähle danach aus den Antwortfeldern den Buchstaben, den du gesehen hast. Raten ist erlaubt.
5. Du erfährst kurz das Ergebnis. Nach allen Durchgängen erscheinen die Kennzahlen mit Zufallsniveau zum Vergleich.

### Tipps

- Wenn du merkst, dass du zum Rand geschaut hast, ist der Durchgang eigentlich ungültig. Die App kann die Blickrichtung nicht prüfen; sei ehrlich zu dir selbst.
- Konzentriere dich auf die Zahlen in der Mitte. Das hilft, die Augen dort zu halten.
- Die Wahrnehmung am Rand funktioniert eher als Gesamteindruck. Achte auf die Form des Buchstabens, nicht auf Einzelheiten.
- Lass dich nicht von der Quote entmutigen: In größerer Entfernung ist sie normalerweise deutlich niedriger.

### Leichter und schwerer machen

- Leichter: geringer Abstand (4 bis 8 Grad), lange Dauer (200 bis 400 ms), große Buchstaben (4 bis 5 cm), nur links/rechts, 3 Antwortmöglichkeiten.
- Schwerer: größerer Abstand (12 bis 25 Grad), kurze Dauer (50 bis 100 ms), kleine Buchstaben, alle vier Richtungen, mehr Antwortmöglichkeiten.
- Nutze die adaptive Dauer, um die Schwelle bei einem bestimmten Abstand zu bestimmen und über Wochen zu vergleichen.
- Vergleiche nur Durchläufe mit gleichem Abstand, gleicher Größe und gleichem Sitzabstand.

### Hinweise zur Sicherheit

- Kurze Einblendungen können bei Lichtempfindlichkeit problematisch sein. Vorher ärztlichen Rat einholen.
- Die Übung ist anstrengend für die Augen. Nach 10 Minuten pausieren.
- Schwindel, Flimmern oder Kopfschmerzen sind ein Grund zum sofortigen Abbruch.
- Die Übung ist kein Gesichtsfeldtest und ersetzt keine augenärztliche Untersuchung.

### Hintergrund

Zum Rand des Gesichtsfelds nehmen Schärfe und Erkennungsleistung stark ab. Wie weit man in einem kurzen Blick mit Aufmerksamkeit erfassen kann, wird als „nützliches Sehfeld“ (Useful Field of View) beschrieben und ist unter anderem für Verkehr und Sport relevant. Die Dauer wird mit demselben adaptiven Verfahren bestimmt wie bei der Blitz-Erkennung. Als Zufallsniveau gilt 100 % geteilt durch die Zahl der Antwortmöglichkeiten.

### Literatur

- Ball, K., Beard, B., Roenker, D., Miller, R., & Griggs, D. (1988). Age and visual search: Expanding the useful field of view. Journal of the Optical Society of America A, 5, 2210–2219.
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. Journal of the Acoustical Society of America, 49, 467–477.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Anzahl der Durchgänge | 8 bis 120 (Schritt 4) | 32 | Anzahl der Durchgänge. Für eine Schwellenschätzung mindestens 24. |
| Abstand von der Mitte (Sehwinkel in °) | 2 bis 40 (Schritt 1) | 10 | Abstand des Buchstabens von der Mitte als Sehwinkel in Grad, berechnet über den eingestellten Sitzabstand. Größere Winkel sind schwerer. |
| Richtungen | Links und rechts / Links, rechts, oben, unten | Links und rechts | „Links und rechts“ oder zusätzlich „oben und unten“. Die Wahrnehmung ist in den Richtungen nicht gleich gut; die Kennzahlen trennen sie. |
| Anzeigedauer (ms, Startwert) | 16 bis 1500 (Schritt 10) | 150 | Dauer der Einblendung in Millisekunden. Bei automatischer Anpassung ist das der Startwert. |
| Dauer automatisch anpassen | Nein (feste Dauer) / Ja (Schwelle bestimmen) | Nein (feste Dauer) | Bei „Ja“ verkürzt sich die Dauer nach zwei richtigen Antworten in Folge und verlängert sich nach jedem Fehler. So wird die Schwelle bestimmt. |
| Buchstabenhöhe (cm) | 1 bis 12 (Schritt 0.5) | 3 | Höhe des Buchstabens in Zentimetern. Je weiter außen, desto größer sollte er sein. |
| Antwortmöglichkeiten | 2 bis 6 (Schritt 1) | 4 | Anzahl der Antwortmöglichkeiten. Mehr Möglichkeiten senken die Trefferchance durch Raten. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `correct` | Anzahl richtig erkannter Buchstaben. |
| `accuracy` | Anteil richtiger Antworten. Vergleiche ihn mit dem Zufallsniveau. |
| `chance` | Trefferquote, die du durch reines Raten erwarten würdest. |
| `acc_horizontal` | Quote bei Buchstaben links oder rechts. |
| `acc_vertical` | Quote bei Buchstaben oben oder unten (nur wenn alle vier Richtungen eingestellt waren). |
| `ecc` | Tatsächlicher mittlerer Abstand von der Mitte in Grad. Kann kleiner als eingestellt sein, wenn der Bildschirm nicht groß genug ist. |
| `rt_mean` | Mittlere Zeit vom Erscheinen der Antwortfelder bis zur Wahl. |
| `threshold` | Geschätzte kürzeste Anzeigedauer, bei der du noch zuverlässig antwortest (Mittel der letzten Umkehrpunkte). Nur bei automatischer Anpassung und wenn genug Umkehrpunkte vorliegen. |
| `duration` | Die fest eingestellte Anzeigedauer. |

<a id="ex-rotation"></a>

## 10. Mentale Rotation

*Gruppe: Gedächtnis und Konzentration*

### Wofür die Übung gedacht ist

Du trainierst räumliches Vorstellungsvermögen. Zwei Figuren aus Quadraten stehen nebeneinander; die rechte ist gedreht und entweder dieselbe Figur oder ihr Spiegelbild. Du entscheidest, ob sie „gleich (gedreht)“ oder „gespiegelt“ ist. Die Übung zeigt außerdem, wie stark die Antwortzeit mit dem Drehwinkel zunimmt.

### Vorbereitung

- Kalibrierung ist hier nur für die Figurengröße wichtig.
- Sitz bequem; du brauchst Ruhe und Konzentration, keine schnelle Hand.
- Der Kopf bleibt gerade, damit du die Drehung nicht durch Kopfneigung „löst“.

### So läuft die Übung ab

1. Anzahl der Aufgaben, Quadrate pro Figur und Drehwinkel einstellen. Einstieg: 24 Aufgaben, 6 Quadrate, Drehung in 90°-Schritten.
2. „Start“ drücken. Links steht die Vorlage in Blau, rechts die Vergleichsfigur in Gelb.
3. Stelle dir vor, du drehst die Vergleichsfigur zurück. Liegt sie danach genau auf der Vorlage, drücke „Gleich (gedreht)“.
4. Ergibt die Drehung nie die Vorlage, weil sie spiegelverkehrt ist, drücke „Gespiegelt“.
5. Nach der letzten Aufgabe erscheinen Genauigkeit, Antwortzeiten und der Anstieg der Antwortzeit je 90° Drehung.

### Tipps

- Orientiere dich an Merkmalen wie einem Ausläufer, einer Ecke oder einem Loch und verfolge, wo sie nach der Drehung landen müssten.
- Wenn du die Figur mit den Händen „mitdrehst“, ist das erlaubt; es hilft vielen Menschen.
- Nicht zu schnell antworten: Bei Unsicherheit lieber kurz länger überlegen, damit die Genauigkeit stimmt.
- Der Drehwinkel verlängert die Antwort. Das ist normal.

### Leichter und schwerer machen

- Leichter: 4 bis 5 Quadrate pro Figur, nur Vielfache von 90°, größere Quadrate.
- Schwerer: 7 bis 9 Quadrate, Vielfache von 45°, Zeitlimit je Aufgabe (zum Beispiel 10 s).
- Ziel: Genauigkeit über 90 % und kleinerer Anstieg der Antwortzeit je 90° (Hinweis auf effizientere mentale Drehung).

### Hinweise zur Sicherheit

- Bei Kopfschmerz oder Schwindel abbrechen.
- Frustrierend schwere Einstellungen vermeiden; Erfolgsquote nicht zu weit unter 70 % fallen lassen.
- Die Figuren sind bewusst nicht symmetrisch, damit die Aufgabe eindeutig lösbar ist.

### Hintergrund

Die Aufgabe geht auf klassische Versuche zur mentalen Rotation zurück: Versuchspersonen entscheiden, ob zwei gedrehte Figuren gleich oder spiegelbildlich sind. Die Antwortzeit steigt dabei annähernd linear mit dem Drehwinkel, als würde man das Objekt gedanklich drehen. Der Anstieg ist ein Maß für die Geschwindigkeit der mentalen Rotation. Die Kennzahl „Anstieg je 90°“ wird aus den richtigen Antworten berechnet (Winkel von 0 bis 180°, falls größer als 180° wird der kürzere Weg gewertet).

### Literatur

- Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. Science, 171, 701–703.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Anzahl der Aufgaben | 6 bis 80 (Schritt 2) | 24 | Anzahl der Aufgaben. Für einen aussagekräftigen Anstieg mindestens 20. |
| Quadrate pro Figur | 4 bis 9 (Schritt 1) | 6 | Wie viele Quadrate jede Figur hat. Mehr Quadrate sind schwerer. |
| Drehwinkel | Vielfache von 90° / Vielfache von 45° | Vielfache von 90° | Drehwinkel der Vergleichsfigur: nur Vielfache von 90° oder auch von 45°. 45°-Schritte sind schwerer. |
| Quadratgröße (cm) | 0.6 bis 3 (Schritt 0.1) | 1.2 | Kantenlänge eines Quadrates in Zentimetern. |
| Zeitlimit je Aufgabe (s, 0 = keines) | 0 bis 60 (Schritt 1) | 0 | Optionales Zeitlimit je Aufgabe. 0 bedeutet kein Limit. Bei Überschreitung zählt die Aufgabe als falsch. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `correct` | Richtige Entscheidungen. |
| `accuracy` | Anteil richtiger Entscheidungen. 50 % wäre Raten. |
| `rt_mean` | Mittlere Antwortzeit bei richtigen Antworten. |
| `rt_median` | Mittlere Antwortzeit nach Sortierung, weniger empfindlich gegen Ausreißer. |
| `slope` | Um wie viele Millisekunden die Antwortzeit pro 90° Drehung zunimmt (lineare Regression über richtige Antworten). Kleinere Werte bedeuten schnellere mentale Drehung. Nur bei mindestens drei richtigen Antworten mit verschiedenen Winkeln. |

<a id="ex-saccade"></a>

## 11. Takt-Sakkaden

*Gruppe: Blicksteuerung und Lesen*

### Wofür die Übung gedacht ist

Du übst schnelle, rhythmische Blickwechsel. Ein Zeichen springt im Takt eines Metronoms zwischen festen Punkten, du folgst ihm mit den Augen und liest es laut vor. Das schult präzise Blicksprünge (Sakkaden), das Halten eines Rhythmus und das schnelle Erfassen eines Zeichens nach dem Sprung.

### Vorbereitung

- Kalibrierung durchführen, damit die Blicksprung-Strecke in Zentimetern und Grad stimmt.
- Sitz bequem etwa 50 bis 60 cm vor dem Bildschirm. Der Kopf bleibt ruhig; nur die Augen bewegen sich.
- Ton einschalten, damit du den Takt hörst. Bei lauter Umgebung Kopfhörer benutzen.
- Für den Berührungsmodus die dominante Hand bereit halten; sonst reicht lautes Lesen.

### So läuft die Übung ab

1. Takt, Anordnung und Zeichenart wählen. Beginne mit 60 Schlägen pro Minute und den vier Ecken.
2. „Start“ drücken. Nach dem Countdown folgt ein Vorlauf von einer Taktlänge.
3. Bei jedem Schlag erscheint ein Zeichen an einem der Punkte. Schau sofort hin und sprich es laut aus, bevor der nächste Schlag kommt.
4. Im Berührungsmodus tippst du das Zeichen zusätzlich noch während es sichtbar ist an. Nicht berührte Zeichen zählen als verpasst.
5. Nach der letzten Wiederholung erscheinen die Kennzahlen.

### Tipps

- Bewege die Augen, nicht den Kopf. Schiebe das Kinn nicht mit.
- Lies jedes Zeichen vollständig laut, auch wenn es leicht erscheint. Das Sprechen zwingt dazu, wirklich zu fixieren.
- Wenn du den Takt verlierst, steige beim nächsten Schlag wieder ein, statt hinterherzuhetzen.
- Entspannte Schultern und ruhige Atmung erleichtern den Rhythmus.
- Starte mit sehr langsamem Takt, wenn du unsicher bist. Genauigkeit vor Tempo.

### Leichter und schwerer machen

- Leichter: langsamerer Takt (30 bis 50 Schläge), Muster „Links und rechts“, größere Zeichen, Ziffern, Reihenfolge „Der Reihe nach“.
- Schwerer: schnellerer Takt (80 bis 120 Schläge), Raster 3×3, kleinere Zeichen, Silben oder Buchstaben, Reihenfolge „Zufällig“.
- Mit Berührung ist die Aufgabe deutlich anspruchsvoller; starte dort mit 40 bis 60 Schlägen.
- Wenn du dich sicher fühlst, vergrößere die Strecke der Blicksprünge (kleinere Zeichen erlauben weitere Positionen im Feld).

### Hinweise zur Sicherheit

- Das Zeichen wechselt im Takt; bei Lichtempfindlichkeit vorher ärztlichen Rat einholen und mit langsamem Takt beginnen.
- Wenn die Augen brennen oder Kopfschmerz entsteht, sofort pausieren. Blinzle bewusst.
- Bei Schwindel oder Übelkeit abbrechen.

### Hintergrund

Beim Lesen und Suchen springen die Augen in kurzen, ruckartigen Bewegungen (Sakkaden) von Punkt zu Punkt; erst in der Ruhe dazwischen (Fixation) wird Information aufgenommen. Die Übung nutzt einen äußeren Takt, um Sprünge gleichmäßig und zielgenau zu machen. Ein Zeichen nach dem Sprung sofort laut zu benennen, stellt sicher, dass der Blick tatsächlich dort angekommen ist. Die App kann die Blickbewegung selbst nicht messen: Im Berührungsmodus wird nur die Hand-Antwort erfasst, ansonsten beruht die Kontrolle auf dir.

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Takt (Schläge pro Minute) | 20 bis 140 (Schritt 2) | 60 | Schläge pro Minute. 60 entspricht einem Schlag pro Sekunde. Höhere Werte verlangen schnellere Blicksprünge. |
| Dauer (s) | 10 bis 300 (Schritt 5) | 60 | Dauer des Durchlaufs in Sekunden. Daraus ergibt sich die Zahl der Schläge (Dauer × Takt ÷ 60). |
| Zeichenhöhe (cm) | 1 bis 12 (Schritt 0.5) | 3 | Höhe der Zeichen in Zentimetern. Kleinere Zeichen sind schwerer zu erkennen und verlangen genaueres Fixieren. |
| Anordnung | Vier Ecken / Vier Ecken und Mitte / Links und rechts / Oben und unten / Raster 3 × 3 | Vier Ecken | Wo die Zeichen erscheinen: vier Ecken, vier Ecken plus Mitte, links und rechts, oben und unten oder ein Raster aus 3×3 Punkten. |
| Reihenfolge | Der Reihe nach / Zufällig | Der Reihe nach | „Der Reihe nach“ läuft die Punkte in fester Reihenfolge ab (vorhersehbar). „Zufällig“ wählt den nächsten Punkt zufällig, nie zweimal denselben hintereinander. |
| Zeichen | Ziffern / Buchstaben / Silben | Ziffern | Ziffern 1 bis 9, Buchstaben oder zufällige Silben aus Konsonant und Vokal. Silben sind am anspruchsvollsten. |
| Berühren im Takt | Nein (nur lesen) / Ja | Nein (nur lesen) | Bei „Ja“ muss das Zeichen im Takt berührt werden. Das misst zusätzlich Trefferquote und Verzögerung. |
| Metronom-Ton | An / Aus | An | Metronom-Ton bei jedem Schlag. Wird empfohlen, weil der Takt die Aufgabe trägt. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `beats` | Anzahl der gezeigten Zeichen im Durchlauf. |
| `bpm` | Der eingestellte Takt zum Dokumentieren des Durchlaufs. |
| `amp_cm` | Größte Entfernung zwischen zwei Punkten des gewählten Musters in Zentimetern. Zeigt, wie weit der Blick maximal springen musste. |
| `amp_deg` | Dieselbe Strecke als Sehwinkel in Grad, berechnet aus dem eingestellten Abstand. Größere Winkel bedeuten größere Sprünge. |
| `hits` | Nur im Berührungsmodus: Zeichen, die innerhalb ihres Schlags berührt wurden. |
| `misses` | Nur im Berührungsmodus: Zeichen, die nicht berührt wurden, bevor das nächste kam. |
| `stray` | Nur im Berührungsmodus: Berührungen neben dem Zeichen oder doppelte Berührungen. |
| `accuracy` | Nur im Berührungsmodus: Anteil der berührten an allen gezeigten Zeichen. |
| `lat_mean` | Nur im Berührungsmodus: mittlere Zeit vom Schlag bis zur Berührung. Kleinere Werte bedeuten schnelleres Erfassen und Greifen. |
| `lat_sd` | Nur im Berührungsmodus: Streuung dieser Zeiten. Kleinere Werte zeigen einen gleichmäßigeren Rhythmus. |

<a id="ex-sequence"></a>

## 12. Sequenz-Gedächtnis

*Gruppe: Gedächtnis und Konzentration*

### Wofür die Übung gedacht ist

Du trainierst das visuell-räumliche Arbeitsgedächtnis. Felder eines Rasters leuchten nacheinander auf, du merkst dir die Folge und tippst sie in derselben Reihenfolge an. Die Folge wird mit jeder richtigen Wiederholung länger; gemessen wird, wie viele Felder du dir merken kannst.

### Vorbereitung

- Sitz bequem vor dem Bildschirm. Der Kopf bleibt ruhig; die Aufgabe braucht keine Eile, aber Konzentration.
- Störungen ausschalten: Benachrichtigungen aus, keine Gespräche im Raum.
- Kalibrierung ist hier nur für die Anzeige wichtig, die Aufgabe selbst hängt nicht von Zentimetern ab.

### So läuft die Übung ab

1. Raster (Zeilen × Spalten) und Startlänge wählen. Die Standardwerte (3×3, Startlänge 2) sind für den Einstieg geeignet.
2. „Start“ drücken. Nach einer kurzen Pause leuchten die Felder der Folge nacheinander gelb auf. Schau zu, ohne mitzutippen.
3. Sobald „Du bist dran“ erscheint, tippst du die Felder in derselben Reihenfolge an. Richtige Eingaben leuchten grün.
4. Bei jeder richtig wiederholten Folge geht es mit einer längeren weiter (je nach Einstellung wird dieselbe Folge um ein Feld verlängert oder eine ganz neue gezeigt).
5. Bei einem Fehler wird das richtige Feld blau markiert und es geht gemäß der gewählten Fehlerregel weiter. Die Übung endet nach der festgelegten Zahl Fehler, bei der Zielänge oder nach dem Zeitlimit.

### Tipps

- Bilde Gruppen („Ecke – Mitte – Rand“) oder Wege (eine Linie, ein Dreieck). Gliedern hilft mehr als bloßes Wiederholen.
- Sprich die Positionen leise mit („links oben, Mitte, rechts unten“), wenn dir das hilft.
- Schau beim Zeigen ruhig auf die Mitte des Rasters und lass die Felder in der Peripherie erscheinen, statt jedes Feld einzeln anzustarren.
- Nicht raten: Bei Unsicherheit lieber kurz nachdenken. Es gibt kein Zeitlimit für die Eingabe, außer du stellst eines ein.
- Ausgeruht trainieren. Müdigkeit senkt die Merkspanne deutlich.

### Leichter und schwerer machen

- Leichter: kleineres Raster (2×3 oder 3×3), längere Anzeige (900 bis 1.200 ms), Fehlerregel „Eine Länge kürzer“.
- Schwerer: größeres Raster (4×4 oder 5×5), kürzere Anzeige (300 bis 500 ms), kürzere Pausen, „Komplett neue Folge“, Fehlerregel „Von vorn beginnen“.
- Als Ziel eignet sich die Merkspanne: Viele Erwachsene erreichen in einfachen Rastern etwa 5 bis 7 Felder, mit Übung und Gruppierung oft mehr.
- Wenn du über 90 % richtige Eingaben hast, erhöhe das Raster oder verkürze die Anzeige.

### Hinweise zur Sicherheit

- Die Übung blinkt in Gelb; die Felder wechseln aber langsam. Bei Lichtempfindlichkeit vorher ärztlichen Rat einholen.
- Bei Kopfschmerz oder Augenbeschwerden abbrechen.
- Frust vermeiden: Wenn du mehrere Fehler in Folge machst, mache eine Pause oder wähle eine leichtere Einstellung.

### Hintergrund

Die Aufgabe ähnelt dem bekannten Blockspannen-Test (Corsi). Er misst, wie viele räumliche Positionen man gleichzeitig im Arbeitsgedächtnis halten und in der Reihenfolge wiedergeben kann. Die Kapazität des Arbeitsgedächtnisses ist begrenzt; klassische Angaben liegen bei etwa sieben (Miller), neuere Schätzungen eher bei vier Einheiten, wenn Gruppieren und Wiederholen verhindert werden (Cowan). Gruppieren („Chunking“) erhöht die effektive Spanne.

### Literatur

- Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. British Medical Bulletin, 27, 272–277.
- Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63, 81–97.
- Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24, 87–114.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Zeilen | 2 bis 8 (Schritt 1) | 3 | Zahl der Zeilen im Raster. Mehr Felder erschweren die Aufgabe. |
| Spalten | 2 bis 10 (Schritt 1) | 3 | Zahl der Spalten im Raster. |
| Startlänge der Folge | 1 bis 10 (Schritt 1) | 2 | Länge der ersten Folge. Wähle 2 für den Einstieg, größere Werte für Fortgeschrittene. |
| Aufleuchtdauer je Feld (ms) | 150 bis 3000 (Schritt 50) | 700 | Wie lange jedes Feld aufleuchtet. Kürzere Zeiten sind schwerer. |
| Pause zwischen Feldern (ms) | 0 bis 1500 (Schritt 50) | 250 | Pause zwischen zwei aufleuchtenden Feldern. Kürzere Pausen erschweren das Verfolgen. |
| Nächste Folge | Alte Folge plus ein Feld / Komplett neue Folge | Alte Folge plus ein Feld | „Alte Folge plus ein Feld“ verlängert dieselbe Folge (du kannst auf Bekanntes aufbauen). „Komplett neue Folge“ erzeugt jedes Mal eine neue und prüft die reine Merkleistung. |
| Nach einem Fehler | Gleiche Länge, neue Folge / Eine Länge kürzer / Von vorn beginnen | Gleiche Länge, neue Folge | Was nach einem Fehler passiert: gleiche Länge mit neuer Folge, eine Länge kürzer oder von vorn mit der Startlänge. |
| Ende nach Fehlern (0 = unbegrenzt) | 0 bis 20 (Schritt 1) | 3 | Nach wie vielen Fehlern die Übung endet. 0 bedeutet unbegrenzt (dann endet sie bei der Zielänge, dem Zeitlimit oder durch Abbrechen). |
| Ende bei Länge | 3 bis 40 (Schritt 1) | 20 | Bei dieser Länge der richtig wiederholten Folge endet die Übung als bestanden. |
| Zeitlimit (s, 0 = keines) | 0 bis 900 (Schritt 10) | 0 | Optionales Zeitlimit für die gesamte Übung in Sekunden. 0 bedeutet kein Zeitlimit. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `span` | Länge der längsten Folge, die du vollständig richtig wiederholt hast. Das ist die wichtigste Kennzahl (Merkspanne). |
| `rounds` | Wie viele Folgen insgesamt richtig wiederholt wurden. |
| `errors` | Zahl der Fehler. Jede falsche Eingabe beendet die aktuelle Runde. |
| `accuracy` | Anteil richtiger Eingaben an allen Eingaben. |
| `rt_mean` | Mittlere Zeit zwischen zwei richtigen Eingaben. Lange Zeiten zeigen Unsicherheit, sehr kurze Zeiten ein sicheres Abrufen. |
| `total` | Gesamtdauer der Übung in Sekunden. |

<a id="ex-sprint"></a>

## 13. Start-Ziel-Reaktion

*Gruppe: Wahrnehmung und Koordination*

### Wofür die Übung gedacht ist

Du trennst Reaktion und Bewegung: Zuerst hältst du den Finger auf einer Startfläche. Sobald das Ziel aufleuchtet, löst du den Finger so schnell wie möglich (Reaktionszeit) und berührst das Ziel (Bewegungszeit). So siehst du getrennt, wie schnell du startest und wie schnell du ankommst.

### Vorbereitung

- Kalibrierung durchführen, damit Abstand und Zielgröße in Zentimetern stimmen.
- Der Bildschirm liegt entweder flach oder steht leicht geneigt; die Startfläche befindet sich unten in der Mitte, das Ziel darüber.
- Stütze die Hand so, dass der Zeigefinger mühelos auf der Startfläche ruht, ohne dass Druck entsteht.
- Für Vergleiche immer dieselbe Hand und dieselbe Haltung benutzen.

### So läuft die Übung ab

1. Anzahl der Durchgänge, Wartezeit, Abstand und Zielgröße einstellen. Standard: 15 Durchgänge, 1–3,5 s Wartezeit, 20 cm Abstand.
2. „Start“ drücken und den Finger auf die runde Startfläche legen und halten. Die Fläche färbt sich grün.
3. Warte ruhig. Nach einer zufälligen Zeit leuchtet das gelbe Ziel auf.
4. Löse den Finger sofort von der Startfläche und berühre das Ziel.
5. Lässt du zu früh los (bevor das Ziel erscheint), ist das ein Fehlstart und der Durchgang beginnt neu. Nach dem letzten Durchgang erscheinen die Kennzahlen.

### Tipps

- Warte nicht auf das Ziel „mit angespanntem Finger“. Entspannt halten, dann reagieren.
- Berühre das Ziel in der Mitte. Das spart die Korrektur am Ende.
- Nach einem Fehlstart kurz durchatmen und mit ruhigem Finger erneut beginnen.
- Reaktionszeit und Bewegungszeit sind getrennte Fähigkeiten. Eine schnelle Reaktion bringt wenig, wenn der Weg zum Ziel lang dauert und umgekehrt.

### Leichter und schwerer machen

- Leichter: großes Ziel (6 bis 8 cm), kürzerer Abstand (10 bis 15 cm), Ziel immer oben.
- Schwerer: kleines Ziel (2 bis 3 cm), größerer Abstand (25 bis 35 cm), Zielposition zufällig im Halbkreis.
- Variiere die Wartezeit zwischen 1 und 5 s, damit du dich nicht auf einen Rhythmus einstellst.
- Ziel: Reaktionszeit stabil senken und die Bewegungszeit bei gleicher Genauigkeit verkürzen.

### Hinweise zur Sicherheit

- Schnelle, kurze Bewegungen: Handgelenk und Finger regelmäßig lockern.
- Bei Lichtempfindlichkeit beachten: Das Ziel leuchtet plötzlich auf.
- Bei Beschwerden in Hand oder Arm abbrechen.

### Hintergrund

Die Reaktionszeit beschreibt die Zeitspanne vom Reiz bis zum Beginn der Bewegung. Die Bewegungszeit hängt nach dem Fittsschen Gesetz von Entfernung und Zielgröße ab: Je weiter und kleiner das Ziel, desto länger dauert die Bewegung. Die Trennung beider Anteile ist aus der Sportwissenschaft bekannt. Die App misst die Reaktion über das Loslassen der Startfläche; die Verzögerung von Touch-Sensor und Bildschirm ist darin enthalten.

### Literatur

- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47, 381–391.

*Die Literaturangaben stammen aus dem Gedächtnis des Autors und sollten vor einer Weitergabe geprüft werden.*

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Anzahl der Durchgänge | 5 bis 60 (Schritt 1) | 15 | Anzahl der Durchgänge. Für aussagekräftige Mittelwerte mindestens 10 bis 15. |
| Wartezeit mindestens (ms) | 500 bis 5000 (Schritt 100) | 1000 | Kürzeste Wartezeit zwischen Halten der Startfläche und Aufleuchten des Ziels. |
| Wartezeit höchstens (ms) | 500 bis 8000 (Schritt 100) | 3500 | Längste Wartezeit. Die tatsächliche Wartezeit liegt zufällig dazwischen, damit der Zeitpunkt nicht erraten werden kann. |
| Abstand Start–Ziel (cm) | 5 bis 60 (Schritt 1) | 20 | Abstand zwischen Startfläche und Ziel. Größere Abstände verlängern die Bewegungszeit. |
| Zieldurchmesser (cm) | 1.5 bis 12 (Schritt 0.5) | 4 | Durchmesser des Ziels. Kleinere Ziele verlangen genaueres Zielen. |
| Zielposition | Immer oben / Zufällig im Halbkreis | Immer oben | „Immer oben“: das Ziel liegt senkrecht über der Startfläche. „Zufällig im Halbkreis“: Richtung wechselt bis etwa 60 Grad nach links oder rechts. |
| Ton bei Start | Aus / An | Aus | Kurzer Ton, wenn das Ziel aufleuchtet, und bei Treffern bzw. Fehlern. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `hits` | Anzahl erfolgreicher Durchgänge (Ziel berührt). |
| `false_starts` | Wie oft du die Startfläche vor dem Aufleuchten losgelassen hast. Hohe Werte zeigen Ungeduld oder Anspannung. |
| `error_taps` | Berührungen neben das Ziel, nachdem du die Startfläche losgelassen hattest. |
| `rt_mean` | Mittlere Zeit vom Aufleuchten bis zum Loslassen der Startfläche. Enthält die Verzögerung des Geräts. |
| `rt_median` | Mittlere Zeit nach Sortierung der Einzelwerte, weniger empfindlich gegen Ausreißer. |
| `rt_sd` | Streuung der Reaktionszeiten. Kleinere Werte bedeuten gleichmäßigeres Reagieren. |
| `mt_mean` | Mittlere Zeit vom Loslassen bis zur Berührung des Ziels. Hängt von Abstand und Zielgröße ab. |

<a id="ex-wordbuild"></a>

## 14. Wörter bauen

*Gruppe: Gedächtnis und Konzentration*

### Wofür die Übung gedacht ist

Du setzt durcheinandergewürfelte Buchstaben zu einem Wort zusammen. Die Übung trainiert das Wortbild, die Reihenfolge der Buchstaben und schnelles Umordnen im Kopf.

### Vorbereitung

- Kalibrierung ist hier nur für die Kachelgröße wichtig.
- Sitz bequem; die Hand tippt auf die Kacheln, der Blick wandert zwischen Kacheln und Feldern.
- Wörter stammen aus einer kleinen eigenen Liste häufiger deutscher Substantive.

### So läuft die Übung ab

1. Wortlänge und Anzahl der Wörter einstellen. Für den Einstieg: Länge 5, 8 Wörter.
2. „Start“ drücken. Unten liegen die Buchstabenkacheln, oben die leeren Felder.
3. Tippe die Kacheln in der Reihenfolge an, in der sie das Wort ergeben. Sie wandern in die Felder.
4. Mit „Zurück“ oder durch Antippen des letzten gefüllten Feldes nimmst du den letzten Buchstaben zurück.
5. Ist das letzte Feld gefüllt, wird automatisch geprüft. Ein falsches Wort wird verworfen (Fehler), die Kacheln gehen zurück. Ein richtiges Wort zeigt direkt das nächste.

### Tipps

- Suche zuerst den Anfang und das Ende des Wortes: Viele Wörter beginnen mit Konsonanten und enden auf -e, -er oder -en.
- Achte auf typische Buchstabenfolgen (sch, ch, ei, au, st).
- Nicht probieren, bis es klappt: Jeder falsche Versuch zählt als Fehler.
- Das Wort darf auch eine andere Lösung sein, wenn die Buchstaben ein anderes Wort der Liste ergeben (Anagramm).

### Leichter und schwerer machen

- Leichter: kurze Wörter (3 bis 4 Buchstaben), große Kacheln.
- Schwerer: längere Wörter (6 bis 8 Buchstaben), mehr Wörter am Stück.
- Ziel: Zeit pro Wort senken und Fehler vermeiden.

### Hinweise zur Sicherheit

- Bei Lese-Rechtschreib-Schwierigkeiten Erfolgserlebnisse sichern: kurze Wörter, wenige Wörter, Pausen.
- Kinder: nur mit Begleitung. Kürzere Einheiten.
- Bei Kopfschmerzen oder Augenbrennen abbrechen.

### Hintergrund

Das Umordnen von Buchstaben (Anagramme) beansprucht das Arbeitsgedächtnis und den Zugriff auf das innere Wortlexikon. Wer häufig vorkommende Buchstabengruppen als Einheit erkennt, löst schneller. Die Wortliste ist klein; bei häufigem Training wiederholen sich Wörter, was den Übungseffekt auf das Wort statt auf die Fähigkeit verschieben kann.

### Einstellungen

| Einstellung | Wertebereich | Standard | Bedeutung |
|---|---|---|---|
| Wortlänge (Buchstaben) | 3 bis 8 (Schritt 1) | 5 | Anzahl der Buchstaben je Wort. Für jede Länge gibt es mehrere Wörter. |
| Anzahl der Wörter | 3 bis 30 (Schritt 1) | 8 | Wie viele Wörter pro Durchlauf gelöst werden müssen. |
| Kachelgröße (cm) | 1.5 bis 5 (Schritt 0.5) | 2.5 | Größe der Kacheln in Zentimetern. Passt sich bei schmalem Bildschirm an. |
| Ton bei Eingabe | Aus / An | Aus | Ton bei Eingaben und bei Fehlern. |

### Kennzahlen

| Kennzahl (Schlüssel) | Bedeutung |
|---|---|
| `solved` | Anzahl der gelösten Wörter. |
| `errors` | Wie oft ein Wort falsch zusammengesetzt wurde. |
| `t_mean` | Mittlere Zeit pro Wort. |
| `t_median` | Mittlere Zeit nach Sortierung, weniger empfindlich gegen einzelne schwere Wörter. |
| `total` | Gesamtzeit vom Start bis zum letzten gelösten Wort, in Sekunden. |
| `lpm` | Gelöste Buchstaben pro Minute, ein Maß für das Gesamttempo. |

