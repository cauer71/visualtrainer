# Visual Trainer Labor (Prototyp)

Eigenständig entwickelte Sehtraining-Übungen als reine Browser-App. **Läuft komplett offline**: keine Bibliotheken von außen, keine Netzwerkzugriffe, keine Fremdinhalte.

## Herkunft (Clean-Room)
Der gesamte Code, alle Texte, Wortlisten und Parameter sind neu geschrieben. Grundlage sind nur *Funktionsbeschreibungen* von Übungstypen und allgemein bekannte Trainings- und Testprinzipien. Es wurde **nichts** aus kompilierten Programmen, Bildern, Tönen, Wortlisten, Texten oder Datenbankinhalten eines anderen Produkts übernommen.

## Einordnung im Repository
Dieses Verzeichnis ist unabhängig vom Blickfit-Build: Es hat eine eigene `package.json` (CommonJS, keine Abhängigkeiten) und wird weder von Vite, TypeScript noch Vitest erfasst und nicht deployt. Im Browser genügt ein Doppelklick auf `index.html`; die Tests laufen mit `npm test` in diesem Ordner (nur Node, kein Netzwerk).

## Starten
`index.html` im Browser öffnen (Doppelklick, kein Server nötig). Beim ersten Mal unter *Kalibrierung* die Bildschirmbreite eintragen oder mit einer Bankkarte abgleichen, damit die Größen in Zentimetern stimmen. Unter *Hilfe* steht die allgemeine Anleitung, in den Einstellungen jeder Übung die ausführliche Übungsanleitung.

## Übungen
| Übung | Gruppe | Prinzip |
|---|---|---|
| **Spot-Touch** | Wahrnehmung und Koordination | Zufällige Punkte schnell berühren, optional Peripherie mit Fixationskreuz |
| **Bewegte Ziele ordnen** | Wahrnehmung und Koordination | Bewegte Zahlen, Buchstaben, Wörter oder Rechenaufgaben der Reihe nach berühren (geradlinig, Kreis, Ellipse) |
| **Wahlreaktion** | Wahrnehmung und Koordination | Farbe oder Form erkennen und passende Schaltfläche drücken |
| **Start-Ziel-Reaktion** | Wahrnehmung und Koordination | Startfläche halten, bei Aufleuchten loslassen und Ziel berühren; Reaktions- und Bewegungszeit getrennt |
| **Ziel verfolgen** | Wahrnehmung und Koordination | Finger auf gleichmäßig bewegtem Ziel halten (Ellipse, Acht, Kurve) |
| **Takt-Sakkaden** | Blicksteuerung und Lesen | Zeichen springt im Metronom-Takt zwischen festen Punkten, optional im Takt berühren |
| **Buchstabentafel** | Blicksteuerung und Lesen | Zeichengruppen Schritt für Schritt lesen, selbst getaktet oder im Takt |
| **Blitz-Erkennung** | Peripheres Sehen und schnelle Erkennung | Kurz eingeblendete Zeichen eintippen; optional adaptive Schwellenbestimmung |
| **Peripheres Erkennen** | Peripheres Sehen und schnelle Erkennung | Buchstabe am Rand erkennen bei gehaltenem Blick; Abstand in Sehwinkel, optional adaptiv |
| **Doppelaufgabe** | Aufmerksamkeit | Zielzahl in der Mitte und Randpunkte gleichzeitig; Einzelmodi als Vergleichsbasis |
| **Sequenz-Gedächtnis** | Gedächtnis und Konzentration | Aufleuchtende Folge merken und nachtippen, wird länger |
| **Wörter bauen** | Gedächtnis und Konzentration | Durcheinandergewürfelte Buchstaben zum Wort ordnen |
| **Zeichen finden** | Gedächtnis und Konzentration | Alle Exemplare eines Zielzeichens in einem Raster ähnlicher Zeichen antippen |
| **Mentale Rotation** | Gedächtnis und Konzentration | Gedrehte Figur: gleich oder gespiegelt? Mit Anstieg der Antwortzeit je 90° |
| **Fusionstraining** | Binokulares Sehen (Rot-Blau-Brille) | Versatz der Bilder beider Augen wächst und schrumpft; Bruch- und Erholungspunkt in Prismendioptrien |
| **Tiefensehen (Zufallspunkte)** | Binokulares Sehen (Rot-Blau-Brille) | Schwebendes Quadrat in Zufallspunkten lokalisieren; adaptive Schwelle in Winkelsekunden |
| **Richtungsentscheidung** | Gleichgewicht und Körper (ohne Sensor) | Pfeilrichtung oder Gegenrichtung angeben, per Berührung oder mit bestätigender Hilfsperson |
| **Plattform-Orientierung** | Gleichgewicht und Körper (ohne Sensor) | Körper nach Reiz in eine Richtung orientieren; Hilfsperson bestätigt, App misst die Zeit |
| **Gleichgewicht und Touch** | Gleichgewicht und Körper (ohne Sensor) | Spot-Touch im Stand; Hilfsperson zählt Verluste des Gleichgewichts |
| **Slalom** | Gleichgewicht und Körper (ohne Sensor) | Kugel per Zeiger, Pfeiltasten oder Gerätekippen durch Tore steuern |
| **Invasoren** | Gleichgewicht und Körper (ohne Sensor) | Zielpunkt unter fallende Schiffe steuern und halten |
| **Hess-Schirm (digital)** | Funktionsprüfung (Fachperson) | Zielraster und Zeiger getrennt je Auge, Abweichungen und Flächenvergleich |
| **Worth-Vierpunkttest (digital)** | Funktionsprüfung (Fachperson) | Lichter zählen: Fusion, Unterdrückung oder Doppelbilder |
| **Schober-Test (digital)** | Funktionsprüfung (Fachperson) | Kreuz in Ring mittig schieben; Phorie in Prismendioptrien |
| **Diplopie-Karte (digital)** | Funktionsprüfung (Fachperson) | Neun Blickrichtungen: ein oder zwei Bilder, Versatz ausgleichen |
| **Subjektive visuelle Vertikale** | Funktionsprüfung (Fachperson) | Linie im Dunkeln senkrecht einstellen; Abweichung in Grad |
| **Orts-Projektion** | Funktionsprüfung (Fachperson) | Kurz gesehenen Punkt nach dem Verschwinden antippen; Fehlervektor und Bias |

Ergebnisse werden nur lokal im Browser gespeichert (letzte 100) und lassen sich als CSV exportieren (Semikolon, UTF-8 mit BOM für Excel).

## Besondere Übungsgruppen
* **Rot-Blau-Brille:** Fusionstraining, Tiefensehen, Hess, Worth, Schober und Diplopie-Karte zeigen jedem Auge ein eigenes Bild (Rot und Blau auf dunklem Grund). Jede Übung beginnt auf Wunsch mit einem Brillentest (Seite des roten Glases, Helligkeit). Versatz wird in Prismendioptrien (Δ) bzw. Winkelsekunden aus Abstand und Kalibrierung berechnet.
* **Gleichgewicht ohne Sensor:** Die Plattform wird nicht ausgelesen. Eine Hilfsperson bestätigt per Taste (Leertaste = richtig, X = falsch, B = Gleichgewicht verloren) oder Knopf; „Slalom“ und „Invasoren“ nutzen Zeiger, Pfeiltasten oder Gerätekippen. Nicht enthalten: Messwerte der Plattform.
* **Funktionsprüfungen für Fachpersonen:** Hess, Worth, Schober, Diplopie-Karte, subjektive Vertikale und Orts-Projektion sind digitale Näherungen klassischer Verfahren. Sie liefern Messwerte, keine Befunde und keine Normbereiche. Vorzeichen und Umrechnungen (besonders beim Schober-Test) sind aus dem Prinzip hergeleitet und vor klinischer Nutzung gegen ein bekanntes Messverfahren zu prüfen. Die Verantwortung für Einsatz und Deutung liegt bei der anwendenden Fachperson.

## Dokumentation
* **In der App:** *Hilfe* (allgemein: Aufbau, Kalibrierung, Training planen, Ergebnisse lesen, Messgenauigkeit, Sicherheit, Datenschutz, Glossar), pro Übung eine aufklappbare *Anleitung* (Zweck, Vorbereitung, Ablauf, Tipps, Steigern, Sicherheit, Hintergrund, Literatur), Hilfetexte unter jeder Einstellung und die Bedeutung jeder Kennzahl in der Ergebnisansicht.
* **Als Datei:** [docs/ANLEITUNGEN.md](docs/ANLEITUNGEN.md), erzeugt mit `node tools/gen-docs.js` aus den Texten in `help/`.
* Ein Test stellt sicher, dass jede Übung, jede Einstellung und jede Kennzahl dokumentiert ist und dass die Markdown-Datei aktuell ist.
* Die Literaturangaben stammen aus dem Gedächtnis und müssen vor einer Weitergabe geprüft werden.

## Aufbau
```
index.html, style.css, app.js     Oberfläche (Menü, Anleitung, Einstellungen, Kalibrierung, Ergebnisse, Hilfe)
lib/core.js                       Registry, Kalibrierung (cm/Grad), Zufall mit Seed, Statistik, CSV, Speicher, Audio, Hilfe-Register
lib/draw.js                       Zeichenhilfen (Text, Schaltflächen, Formen, Raster)
lib/anaglyph.js                   Rot-Blau-Brille: Farben je Auge, Versatz in cm/Δ/Winkelsekunden, Brillentest
lib/gaze.js                       Blickraster (Hess, 3×3) und Umrechnung Winkel ↔ Bildschirmort
lib/input.js                      Steuerung: Zeiger, Pfeiltasten, Gerätekippen
lib/adaptive.js                   Adaptives Stufenverfahren (2 richtig → schwerer, 1 falsch → leichter)
lib/words.js                      Eigene Wortliste
ex/*.js                           eine Datei je Übung: Parameterliste, reine Logik-Klasse, Darstellung (run)
help/*.js                         Anleitungstexte je Übung und allgemein
tools/gen-docs.js                 erzeugt docs/ANLEITUNGEN.md
test/*.test.js                    Tests (Node)
```

## Neue Übung hinzufügen
1. Datei in `ex/` nach dem Muster einer vorhandenen anlegen:
```js
VT.register({
  id, title, group, summary, headline: ['kennzahl1', 'kennzahl2'], metricKeys: [/* alle möglichen Kennzahlen */],
  params: [{ key, label, type: 'number'|'select', min, max, step, default, options }],
  createSession(params, env) { /* reine Logik, testbar */ },
  run(env, params, finish) { /* Canvas-Darstellung; am Ende finish({ metrics, trials }) */ }
});
```
2. Anleitung in `help/<id>.js` mit `VT.addHelp(id, { purpose, setup, steps, tips, progression, cautions, background, references, params, metrics })` schreiben. Der Test `docs.test.js` verlangt Texte zu jeder Einstellung und jeder Kennzahl.
3. Beide Dateien in `index.html` einbinden, `node tools/gen-docs.js` ausführen, Tests laufen lassen.

Größen immer in cm angeben und über `env.calib` umrechnen. Einstellungsmaske, Ergebnisansicht, Speicherung und CSV-Export entstehen automatisch.

## Tests
```
node --test "test/*.test.js"
```
Die Tests (243) decken die Logik aller 27 Übungen ab (Zeitabläufe, Zufall mit festem Seed, Grenzfälle, Kennzahlen), Kalibrierung, Statistik, CSV, Speicher, das adaptive Verfahren und die Vollständigkeit der Dokumentation. Ein **Rauchtest** führt den Darstellungscode jeder Übung mit einem Fake-Canvas aus (Zeichnen, Eingaben, Aufräumen). Ein **Offline-Wächter** prüft, dass im Quellcode keine Netzwerkfunktionen (`fetch`, `XMLHttpRequest`, `WebSocket` …), keine `http(s)://`-Adressen und kein `innerHTML` vorkommen und dass `index.html` Verbindungen per Sicherheitsregel sperrt.

## Bekannte Grenzen
* Die Darstellung wurde **noch nicht in einem echten Browser** geprüft (Aussehen, Touch-Gefühl, Ton). Getestet sind die Logik und, mit Fake-Canvas, der Ablauf des Darstellungscodes.
* Die App kann Blickrichtung und Aussprache nicht messen. Wo die Übung davon abhängt (Fixation, lautes Lesen), beruht die Kontrolle auf der Person.
* Anzeigedauern sind an die Bildwiederholrate gebunden (60 Hz ≈ 17 ms); der Metronom-Ton kann bis etwa 16 ms abweichen.
* Reaktionszeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor und sind nur auf demselben Gerät vergleichbar.
* Keine Normwerte, keine medizinische Aussage, kein Medizinprodukt.
* Wortliste klein (rund 130 Substantive); bei häufigem Training wiederholen sich Wörter.
