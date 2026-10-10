# Binokular – Sehspiele (Prototyp)

> **Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.**
>
> Wenn Doppelbilder, Kopfschmerzen, Übelkeit oder deutliche Augenbeschwerden auftreten, soll das Spiel sofort beendet werden
> (Knopf „Beschwerden – beenden“, im Spiel jederzeit sichtbar).

Browserbasierte Prototypen für **dichoptisches Binokulartraining** mit Rot/Cyan- oder Rot/Grün-Anaglyphenbrille:
drei einfache Spiele mit großen Flächen und kurzen Regeln – **„Nachzeichnen“**, **„Farbwechsel-Pong“** und **„Ziehen & Ablegen“**. Das frühere,
umfangreichere Grabungsspiel (zehn Level mit Levelauswahl, Lösungsprüfer, Sternen, adaptivem Kontrast und Kontrollaufgaben)
war zu kompliziert und wurde **entfernt**; die spielunabhängigen Teile blieben erhalten (Farbprofile und Kalibrierung,
Farbzuordnung je Auge, Ton, Therapeutenbereich, Speicher, Verlauf).

- **URL:** `https://visual.auer.page/binokular/` (eigene Test-URL, kein Link aus der Haupt-App, nicht in der Übungsliste;
  URL und Speicherschlüssel `binokular:v1` blieben unverändert)
- **Stand:** Startbildschirm mit drei Spielkarten, Kalibrierung mit Farbprofilen, gemeinsame Spielhülle (Vollbild, Pause,
  Zeit, Wake Lock, Automatik-Pause), Therapeutenbereich mit Spieleinstellungen, Session-Verlauf mit CSV-Export, Debug-Modus,
  dezente Soundeffekte (Web Audio).

## Installation und Start

Teil des Repos (gemeinsames `package.json`, keine zusätzlichen Abhängigkeiten):

```bash
npm install
npm run dev                 # http://localhost:5173/binokular/
npm run build               # baut auch dist/binokular/index.html
npx vite preview            # http://localhost:4173/binokular/
```

URL-Parameter (nur Tests und Vorführung): `?game=nachzeichnen|pong` (direkt ins Spiel, ohne Kalibrierung und Augenwahl –
es gilt das gespeicherte bzw. das Startprofil), `?seed=N` (fester Zufall: Pfad und Startfarbe bzw. Startfarbe und Anspiel),
`?debug=1` (Debug-Ansichten und Testzugriff `window.__binokular`, siehe unten).

**Technik:** TypeScript, Vite, Canvas 2D und **Preact** statt React (gleiche Komponenten-/Hook-API, ≈ 4 kB, im Repo schon
vorhanden – keine neue Abhängigkeit). Keine Netzwerkzugriffe, keine Anmeldung, alle Daten bleiben im Browser.

## Architektur

```
binokular/index.html            eigene Seite (Vite-Eingang „binokular“)
src/binokular/
  main.tsx                      Einstieg, URL-Parameter
  texts.ts                      alle Texte (Deutsch; Italienisch später als zweites Objekt)
  binokular.css                 dunkles, neutrales Erscheinungsbild
  games/     types.ts           gemeinsame Schnittstelle: GameModule, GameInstance, GameContext, GameSummary
             common.ts          Zufall mit Seed (mulberry32), Bühne (Canvas-Skalierung, Letterbox, Schleife, Debug-
                                Ansichten), Zeigerabsicherung, graues Aufblitz-Feedback
             index.ts           Spielregister
             nachzeichnen/      path.ts (Pfad, Spline), colorSchedule.ts (Farbwechsel), trace.ts (Zeichnen, Fehler,
                                Wertung), settings.ts, index.ts (Modul: Zeiger, Darstellung)
             pong/              logic.ts (Physik, Computergegner, Farbwechsel, Punkte), settings.ts, index.ts
  vision/    color.ts           Farbzuordnung je Auge/Glas/Kontrast aus der Profil-Palette, sRGB ↔ linear, Deltas
             renderer.ts        allgemeiner Canvas-Renderer (Zeichenobjekte, Ebenen, difference/lighter), Debug-Ansichten,
                                Anaglyphen-Simulation
  audio/     sounds.ts          Klangdefinitionen je Ereignis (rein, getestet)
             player.ts          Web-Audio-Wiedergabe (Start erst nach Nutzergeste, Lautstärkegrenze)
  therapy/   session.ts         Session-Protokoll (Recorder, Prüfung gespeicherter Datensätze)
             pin.ts             Therapeuten-PIN
  data/      settings.ts        allgemeine Einstellungen + strenge Prüfung (num/pick/bool)
             storage.ts         localStorage `binokular:v1`, Migration alter Stände
             csv.ts             CSV-Export
             transfer.ts        JSON-Export/-Import der Einstellungen (mit Spieleinstellungen und Farbprofilen)
  calibration/calibration.ts    Kalibrierschritte, Kontrolle der Zuordnung, Hinweise
             photometry.ts      Foto-Auswertung und Berechnung (rein, getestet)
             tuning.ts          Feinabstimmung: Regler ↔ Palette
             profiles.ts        Farbprofile (Startprofile, Prüfung, Export/Import, Zusammenführen)
  components/                   Preact-Bildschirme: App, StartScreen (Spielkarten), CalibrationScreen, SetupScreen,
                                GameShell (gemeinsame Spielhülle), EndScreen, HistoryScreen, TherapistScreen,
                                ProfilePicker, charts
```

**Spiele als Module:** Jedes Spiel in `games/<id>/` liefert ein `GameModule`: Kennung, Titel, Beschreibung,
Spielfeldgröße, `defaults`, `normalize` (streng, auch für Import), `create(canvas, ctx, settings)` und `rows` (Zeilen für
Zusammenfassung und Verlauf). Die Instanz bietet `start`, `pause`, `resume`, `destroy`, `snapshot` (Live-Anzeige),
`summary` (Punkte, Fehler, Farbwechsel, spielspezifische Zahlen), `actions` (Knöpfe wie „Neuer Pfad“). Die Spiellogik
steht in reinen Modulen ohne DOM und ohne Farben (getestet); die Instanz verbindet sie mit Canvas, Zeigern und Tasten.
Die **GameShell** ist für alle Spiele gleich: Zeit, Live-Anzeige, Spielknöpfe, Ton, Vollbild, Pause, „Beschwerden –
beenden“, Pause-Überlagerung („Weiter“ / „Beenden“), Wake Lock (`navigator.wakeLock`, in try/catch, nach
`visibilitychange` erneut angefordert), Automatik-Pause bei `visibilitychange` und `blur`, Esc, Debug-Ansichten und das
Session-Protokoll. Am Ende zeigt der `EndScreen` die Zusammenfassung (Spielzeit und `rows`).

**Bühne und Eingabe:** Das Spiel rechnet in festen Innenkoordinaten (Nachzeichnen Querformat 1280 × 720, Pong Hochformat
720 × 1280), die Bühne passt sie eingepasst und zentriert ein (Letterbox, Rand in der Profil-Hintergrundfarbe).
Auflösung mit `devicePixelRatio`, höchstens 2. Zeigerereignisse (`pointerdown/move/up/cancel`) am Canvas mit
`touch-action: none`, `setPointerCapture`, `user-select: none`, unterdrücktem Kontextmenü, Gesten, Doppelklick und
Scrollen – kein Scrollen oder Zoomen im Spiel. Auf kleinen Bildschirmen im falschen Format erscheint ein grauer Hinweis
(„Besser: Gerät quer/hochkant halten“), das Spiel läuft trotzdem.

## Farbregeln (für beide Spiele)

- **Dunkler Hintergrund, kein Weiß.** Rote Objekte sieht nur das Auge hinter dem roten Glas, Objekte in der
  **Zweitfarbe** (Blau bei Rot-Cyan, Grün bei Rot-Grün) nur das Auge hinter dem zweiten Glas. Graue Objekte
  (#777–#888) sehen beide Augen. Keine weiteren Farben im Spielfeld; Texte und Symbole im Spiel (Live-Anzeige,
  Hinweise, Pause) sind grau.
- **Farben nur aus dem aktiven Profil** (`calibration/profiles.ts`, nie fest im Spielcode – ein Test prüft den
  Spielcode auf Farbangaben): Rot, Zweitfarbe, Hintergrund. Startwerte: Rot-Cyan `#FF0000` / `#0000FF` (reines Blau, kein
  Cyan) / `#160000`; Rot-Grün `#FF0000` / `#009600` / `#210000`. Die echten Werte kommen aus der Kalibrierung.
- **Warum ein leicht farbiger Hintergrund?** Kein Glas filtert perfekt. Der Hintergrund wird so gemischt, dass er
  durch das rote Glas genauso hell erscheint wie die Zweitfarbe und durch das zweite Glas genauso hell wie Rot – dann
  verschwindet jedes Objekt für das Auge, das es nicht sehen soll.
- **Objektklassen:** `AMBLYOPIC` → Farbe des Glases vor dem amblyopen Auge, Kontrast `amblyopicContrast`; `FELLOW` →
  Farbe des Glases vor dem dominanten Auge, Kontrast `fellowEyeContrast`; `BOTH` → neutrales Grau, bei vollem Kontrast
  `#888888`. Die „roten“ und „Zweitfarbe“-Objekte der Spiele (Pfad, Ball) gehören je einem Auge dieser Klassen; der
  Wechsel zwischen den Farben ist ein Wechsel der Augenklasse. Welche Farbe das ist, entscheidet nur `vision/color.ts`
  aus Profil und Zuordnung.
- **Kontrast pro Auge** (beide Spiele): `amblyopicEye`, `amblyopicContrast` (Standard 100 %), `fellowEyeContrast`
  (Standard 20 %) – von Hand im Therapeutenbereich einstellbar. Farbe = Hintergrund + k · (Vollfarbe − Hintergrund), in
  linearem Licht, k = Augenkontrast × Objektkontrast. Bei k = 0 verschwindet ein Objekt im Hintergrund – für beide Augen.
  Der Bildschirm ist nicht photometrisch kalibriert.
- **Zuordnung:** amblyopes Auge links/rechts; Glas links Rot / rechts Cyan (bzw. Grün) oder umgekehrt; der Brillentyp
  folgt dem aktiven Profil (eine Quelle).
- **Zeichenreihenfolge (`vision/renderer.ts`):** Das Spiel liefert `Item`s (Form, Augenklasse `eye`, Kontrast `k`, Ebene
  `layer`). Hintergrund in Profilfarbe (ganze Fläche), dann je Ebene die graue Klasse deckend, danach je Augenklasse die
  **Abweichung vom Hintergrund** (Objektfarbe − Hintergrund, je Kanal) auf einer Zwischenebene: erst der negative Teil
  mit `difference`, dann der positive mit `lighter`. Auf dem Hintergrund ergibt das exakt die Profilfarbe; über grauen
  Flächen ändern sich nur die Kanäle des Objekts. Graue Dinge, die über dem Pfad liegen sollen (Linie, Markierungen),
  liegen in einer höheren Ebene.
- **Formen:** Objekte in der Zweitfarbe sind groß und gefüllt, ihre Linien mindestens 4 px breit (`MIN_SECOND_LINE`; der
  Pfad ist ohnehin ≥ 8 px, der Ball mindestens 24 px Durchmesser).
- **Rückmeldung nie in Rot oder Zweitfarbe:** Treffer und Fehler zeigen nur ein kurzes **graues Aufblitzen** (Rahmen am
  Spielfeldrand als `BOTH`-Objekt in vollem Grau, 280 ms, der Rand wird schmaler), einen **Ton** und – wo unterstützt –
  **Vibration** (`navigator.vibrate`, in try/catch).
- **Weich, ohne Flackern:** Farbwechsel im Fade blenden aus und ein, nie zwei Farben zugleich.

## Spiel „Nachzeichnen“

Querformat 1280 × 720. Der **Grundpfad** ist eine dicke, glatte Kurve (Catmull-Rom-Spline durch ca. 6 zufällige
Stützpunkte von links nach rechts, Standardbreite 16 px). Start (gefüllter Kreis) und Ziel (Ring) sind grau, die gezeichnete
Linie der Person ist grau (6 px, für beide Augen sichtbar). Knöpfe „Neuer Pfad“ und „Linie löschen“.

- **Farbwechsel des Pfads:** Der Pfad wechselt ständig zwischen Rot und Zweitfarbe. Ein Wechsel erfolgt, sobald **eine**
  Bedingung erfüllt ist: Zeitintervall abgelaufen (Standard 2 s, 0,5–6 s) **oder** gezeichnete Strecke seit dem letzten
  Wechsel erreicht (Standard 150 px, 40–400 px). Danach werden beide Zähler zurückgesetzt. Option **„nur Strecke“** für
  langsame Patienten (kein Zeitintervall). Die Zeit läuft erst, wenn die Person angesetzt hat (`colorSchedule.ts`).
  - **Hart:** sofortiger Wechsel.
  - **Fade:** erst blendet die alte Farbe zum Hintergrund aus (Kontrastfaktor k 1 → 0, erste Hälfte der Dauer), dann die
    neue aus dem Hintergrund ein (k 0 → 1, zweite Hälfte) – nacheinander, nie gleichzeitig (eine Mischfarbe wäre für
    beide Augen sichtbar). Gesamtdauer einstellbar (Standard 0,8 s). Während des Fades laufen die Zähler nicht.
- **Zeichnen:** nur ab dem Startpunkt (Radius 24 px). Nach dem Absetzen geht es nur dort weiter, wo die Linie endete
  (Radius 30 px), sonst erscheint ein grauer Hinweis. Fortschritt über den nächstgelegenen Pfadpunkt (Pfad in 3-px-Schritten
  abgetastet); der Fortschrittsindex wächst nur in kleinen Schritten (höchstens 10 px Bogenlänge je Teilschritt, lange
  Stiftbewegungen werden in 4-px-Teilschritte zerlegt) – **Abkürzungen zählen nicht**. Zurückfahren auf der eigenen
  Linie ist kein Fehler. Ziel erreicht, wenn der Fortschritt am Pfadende ist und der Stift im Zielring liegt.
- **Fehler:** Abstand zum Pfad ≤ halbe Pfadbreite + 14 px zählt als genau (Toleranzzone); Fehlergrenze: Abstand >
  Fehlerabstand (Standard 28 px). Überschreitet der Stift sie, wird **genau ein** Fehler gezählt (nicht je Pixel), die Linie
  wird unterbrochen, Punkte außerhalb werden weder gezeichnet noch gewertet; Feedback grau + Fehlerton + Vibration.
  Weiter geht es erst, wenn der Stift im Rückkehrradius (30 px) um den letzten gültigen Punkt ist **und** höchstens den
  Fehlerabstand vom Pfad entfernt (sonst gäbe es sofort einen zweiten Fehler). Optional **Fehlerlimit** je Runde (0 = aus):
  danach ist die Runde zu Ende, mit Zusammenfassung.
- **Wertung (Live-Anzeige grau):** Genauigkeit in % (Anteil Punkte in der Toleranzzone), durchschnittliche Abweichung in
  px, Fehler, Anzahl Farbwechsel. Ende: Zusammenfassung mit diesen Werten und der Zeit. „Neuer Pfad“ übernimmt die Werte der
  alten Runde in die Session; „Linie löschen“ beginnt die Linie neu (Fehlerzähler bleiben).
- **Einstellbar (Therapeutenbereich):** Pfadbreite (8–40 px), Kurvigkeit (Anzahl 4–10 und Streuung 20–100 % der
  Stützpunkte), Zeitintervall, Wechselstrecke, „nur Strecke“, Wechselart, Fade-Dauer (0,2–3 s), Fehlerabstand (16–80 px,
  mindestens halbe Pfadbreite + Rand + 2), Fehlerlimit (0–20).

## Spiel „Farbwechsel-Pong“

Hochformat 720 × 1280. Unten der eigene Schläger, oben der Gegner (Computer oder zweite Person). Schläger, gestrichelte
Mittellinie und Punktestand sind grau. Der **Ball** (großer gefüllter Kreis, Radius 12–40 px, Standard 20) wechselt
zwischen Rot und Zweitfarbe; die Startfarbe ist zufällig (aus dem Seed).

- **Farbwechsel:** Grundstufe: bei jedem Schlägerkontakt. Option **„Farbwechsel im Flug“**: nach jedem Kontakt wird eine
  zufällige y-Position zwischen den Schlägern bestimmt (25–75 % der Strecke); beim Überqueren wechselt der Ball zusätzlich
  – genau einmal je Überquerung.
- **Steuerung:** Touch/Stift **relativ**: der Finger wischt irgendwo, der Schläger folgt der waagerechten Bewegung mit
  Verstärkungsfaktor (Standard 1,3), damit der Finger den Schläger nicht verdeckt. Maus: absolut (Schläger folgt der
  Mausposition). Tastatur: Pfeile links/rechts (unten), im Zwei-Spieler-Modus A/D (oben). **Zwei-Spieler-Modus:** obere
  und untere Bildschirmhälfte steuern je einen Schläger (Mehrfachtouch, Zeiger-IDs getrennt); kein Computergegner. Die Maus
  steuert nur den unteren Schläger.
- **Physik:** fester Zeitschritt 120 Hz (Akkumulator, höchstens 12 Schritte je Bild), durchflugsicher. Abprallwinkel
  abhängig von der Trefferposition auf dem Schläger (Mitte senkrecht, Rand bis 60° zur Senkrechten). Geschwindigkeit steigt
  je Schlag um den Faktor 1,04, begrenzt auf das 2,2-Fache der Startgeschwindigkeit. Der Computerschläger hat begrenzte
  Geschwindigkeit (je Gegnerstärke 1–5 von 220 bis 660 px/s), die mit den Punkten der Person um 6 % je Punkt steigt
  (Obergrenze 1100 px/s), und zielt je Schlag mit einer kleinen Ungenauigkeit.
- **Wertung:** Punkte bis Spielende (Standard 7, 1–21) oder Beenden über die Pause. Nach einem Punkt wird zum Verlierer
  des Punkts angespielt (nach 0,9 s). Live-Anzeige: Punkte, Schläge, Farbwechsel. Zusammenfassung: Punkte (du : Gegner),
  Schläge, längster Ballwechsel, Farbwechsel.
- **Einstellbar:** Ballradius, Startgeschwindigkeit (300–900 px/s), Schlägerbreite (80–260 px), Gegnerstärke,
  Farbwechsel im Flug, Zwei-Spieler-Modus, Verstärkungsfaktor (0,5–3), Punkte bis Spielende.

## Spiel „Ziehen & Ablegen“ (zwei Farben)

Dichoptische Variante der Übung „Ziehen & Ablegen“ der Haupt-App (Maße und Kurven aus `exercises/ziehen-ablegen/logic.ts`,
dort unverändert). Querformat 1280 × 720. Ein **Ball** (gefüllte Scheibe, Radius ≥ 22 px) und ein **wandernder Ring**
(Linie 14 px) gehören **verschiedenen Augen**: einer ist Rot, der andere die Zweitfarbe des aktiven Profils (Augenklasse
AMBLYOPIC/FELLOW, die Farbe kommt nur aus `vision/color.ts`). Nur beide Augen zusammen erkennen, ob der Ball im Ring liegt.
Rahmen, Level, Zähler und Hinweise sind grau (BOTH).

- **Steuerung:** irgendwo berühren (Touch, Stift oder Maus mit gedrückter Taste) → der Ball erscheint **versetzt über dem
  Finger** (relative Steuerung, der Finger verdeckt ihn nie); in den Ring ziehen und loslassen. Treffer = Ballmitte im Ring.
  Nur Antippen zählt nicht. Tastatur: Pfeiltasten bewegen den Ball, Leertaste oder Eingabe legt ihn ab.
- **Runde:** Ring wandert (Tempo und Kurven je Level, prallt am Rand ab; der Finger bleibt immer auf dem Bildschirm).
  Zeitfenster je Level (6,5 s → 3,2 s); danach „zu spät“ = Fehler. Rückmeldung nur grau: kurzer grauer Rahmen, Ton
  (`hit`/`error`), Vibration; bei „wechselnd“ zusätzlich Ton `colorChange` beim Rollenwechsel.
- **Level 1–16:** adaptiv, nach 3 Treffern in Folge +1, nach 2 Fehlern in Folge −1 (Ringgröße, Tempo, Zeitfenster, Kurvenrate
  und Punkte je Treffer wachsen mit dem Level). Das Level steht grau in der Live-Anzeige.
- **Rollen:** „wechselnd“ (Standard; Start zufällig aus dem Seed, danach nach jeder Runde getauscht, damit beide Augen
  abwechselnd den Ball führen), „Ball rot / Ring Zweitfarbe“ oder „Ball Zweitfarbe / Ring rot“.
- **Einstellungen** (Therapeutenbereich, streng begrenzt): Startlevel 1–16, Rollen, Runden pro Sitzung (Standard 20,
  0 = unbegrenzt), Ringgröße-, Tempo- und Zeitfenster-Faktor je 70–150 %, Ball-Offset über dem Finger (0 = automatisch,
  sonst 40–200 px). Gespeichert unter `games['ziehen-ablegen']`. Nicht umgesetzt: „Ball verschwindet kurz“.
- **Session:** `points`, `errors` (= Fehler: daneben oder zu spät), `colorChanges` (= Rollenwechsel), `details`: `hits`,
  `misses`, `late`, `rounds`, `maxLevel`, `avgRoundMs`, `roleSwaps`, `targetRounds`; erscheinen in Zusammenfassung, Verlauf
  und CSV. Ältere Sessions und Einstellungen laden unverändert (fehlende Einstellung → Standard).
- **Testzugriff** (`?game=ziehen-ablegen&seed=N&debug=1`): `window.__binokular.state()` liefert Ring (`x`, `y`, `R`), Ball,
  Rollen (`roles.ball`, `roles.ring` als Augenklasse), Level, Treffer, Fehler, Runden; `set({ ring, rest, speed, elapsedMs })`
  setzt Ring/Ruheplatz des Balls, hält den Ring an (`speed: 0`) bzw. verschiebt die Rundenzeit.
- Code: `games/ziehen-ablegen/` (`logic.ts` Spielkern ohne DOM, `settings.ts`, `index.ts`); Tests
  `tests/unit/binokular-ziehen-ablegen.test.ts` und Abschnitt 9 von `tests/e2e/binokular.mjs`.

## Session und Datenerfassung

Je Spielsitzung ein Datensatz (`therapy/session.ts`): Spiel, Datum, Startzeit, Gesamtdauer, aktive Spielzeit, Pausen,
**Punkte, Fehler, Farbwechsel**, spielspezifische Zahlen (`details`: Nachzeichnen `accuracy`, `avgDeviation`, `paths`;
Pong `opponent`, `hits`, `maxRally`, `won`, `target`, `twoPlayer`), Kontrasteinstellungen, amblyopes Auge, Brille, Filter
links, Grund des Endes (`goal`, `limit`, `score`, `user`, `complaints`, `interrupted`). Keine Diagnose, keine automatische
Bewertung. Gespeichert wird beim Ende (Ziel, Limit, Punktestand, „Beenden“, Beschwerden); höchstens 500 Sessions.

**Verlauf:** Diagramme (aktive Spielzeit pro Tag; Nachzeichnen: Genauigkeit je Session; Pong: eigene Punkte je Session) und
Tabelle (Datum, Start, Spiel, Spielzeit, Punkte, Fehler, Farbwechsel, weitere Werte, Ende); **CSV-Export** (Semikolon,
Dezimalkomma, UTF-8 mit BOM, Formel-Schutz).

## Therapeutenbereich

Startbildschirm → „Therapeutenbereich“, PIN **726** (änderbar, 3–8 Ziffern; nur leichter Schutz gegen versehentliches
Verstellen). Abschnitte: Patient (nur Pseudonym), Augen und Brille (amblyopes Auge, Farbprofil, Zuordnung), Kontrast
(`amblyopicContrast`, `fellowEyeContrast`, Debug-Modus), **Nachzeichnen** und **Farbwechsel-Pong** (alle Spielwerte, je
„Standardwerte“), Ton (Voreinstellung), Daten (CSV, JSON-Export/-Import der Einstellungen, Sessions löschen), PIN ändern.
Alle Werte werden beim Eintragen **streng begrenzt** (`num`/`pick`/`bool`, ungültige Typen → Standardwert) – ebenso beim
Import und beim Laden aus localStorage.

**Speicher:** `localStorage` unter `binokular:v1`, jeder Zugriff in try/catch, die App startet ohne gespeicherte Daten.
Aufbau: `settings`, `calibration`, `profiles`, `activeProfileId`, `games` (je Spiel), `sessions`, `pin`, `audio`.
**Migration alter Stände:** Felder des früheren Grabungsspiels (Fortschritt, Level, adaptiver Kontrast, Kontrollaufgaben,
Objektgröße, Schwierigkeit, laufende Session) und alle unbekannten Felder entfallen; alte Sessions (mit Leveln, ohne
Spiel-Kennung) lassen sich nicht sinnvoll abbilden und werden verworfen; Einstellungen, Kalibrierung, Profile, PIN und Ton
bleiben. Der Einstellungs-Export (Format `binokular-einstellungen`, Version 2) enthält zusätzlich `games`; Dateien ohne
`games` (und Version 1) werden weiter gelesen.

## Kalibrierung

Eigener Bereich (Startbildschirm „Kalibrierung“; beim ersten Spielstart automatisch, dort auch „Mit Startwerten
spielen“). Oben die **Profilleiste**: aktives Profil wählen, „Neue Kalibrierung“, umbenennen, löschen (Startprofile
nicht), Profile als JSON exportieren/importieren. Darunter Brillentyp und Zuordnung der Gläser, dann die Schritte:

0. **Vorbereitung:** Nachtmodus, Blaulichtfilter, f.lux und HDR aus, Helligkeit fest; Raum abdunkeln, Vollbild.
1. **Messbild:** fünf große quadratische Felder auf Schwarz – Weiß, Rot, Grün, Blau, Schwarz (gestrichelt umrandet),
   graue Beschriftung; Vollbild, Antippen oder Esc schließt. Mit dem Handy zweimal fotografieren (durch das rote und
   durch das zweite Glas, Glas direkt vor der Linse), Pro-Modus mit festem Weißabgleich/ISO/Belichtung, JPG statt HEIC,
   Belichtung so niedrig, dass kein Feld ausfrisst.
2. **/ 3. Fotos auswerten:** Foto wählen (nur im Browser, kein Upload), der Reihe nach Weiß, Rot, Grün, Blau, Schwarz
   antippen (nummerierte Markierungen mit Messbox, „Zurücksetzen“). Je Tipp wird eine Box mit Kantenlänge
   `round(0,024 · kürzere Bildseite)` **in voller Auflösung** ausgewertet: Pixel sRGB → linear (exakte Formel), dann
   gemittelt. Warnung „überbelichtet“, wenn ein Feld außer Schwarz einen mittleren Rohwert ≥ 250 hat oder mehr als 10 %
   seiner Pixel ausgefressen sind. Y = 0,2126 R + 0,7152 G + 0,0722 B (linear) minus Y(Schwarz). Ergebnis: rotes Glas
   a_R, a_G, a_B, zweites Glas c_R, c_G, c_B. HEIC-Dateien (Name, Typ oder Dateikennung) bekommen eine verständliche Meldung.
4. **Berechnung** (`calibration/photometry.ts`): Zweitfarbe linear (0, g, b). Rot-Cyan: Kandidaten mit max(g, b) = 1,
   der andere Kanal 0 / 0,25 / 0,5 / 0,75 / 1; Rot-Grün: b = 0, g per Regler (Start 0,30 ≈ `#009600`). Je Kandidat
   L = a_G·g + a_B·b (durchs rote Glas), C = c_G·g + c_B·b (durchs zweite Glas); gewählt wird unter allen Kandidaten
   mit C/L ≥ 85 % des besten der mit dem größten C. **Hintergrund-Kompensation:** Hintergrund (r, t·g, t·b) mit
   a_R·r + L·t = L und c_R·r + C·t = c_R; det = a_R·C − L·c_R, r = L·(C − c_R)/det, t = c_R·(a_R − L)/det, auf 0 … 1
   begrenzt; bei det ≤ 0 oder nicht endlich gilt der Startwert (Hinweis). Dazu **Übersprechen** a_G/a_R, a_B/a_R und
   c_R/max(c_G, c_B): unter ca. 1 % sehr gut, über 5 % schwierig. „Werte übernehmen“ → Schritt 5.
5. **Feinabstimmung nach Auge (entscheidend):** Vorschau mit Hintergrundfläche, rotem Quadrat, Kreis in Zweitfarbe und
   einem Pfad wie im Spiel „Nachzeichnen“ (mit dem echten Renderer). Regler: Hintergrund rot (0–70), Hintergrund Zweitfarbe
   (0–40, im Verhältnis der Zweitfarbe), Helligkeit der Zweitfarbe, Rotwert (`calibration/tuning.ts`). Anleitung:
   1. durchs zweite Glas: Rot noch sichtbar → „Hintergrund Zweitfarbe“ erhöhen; 2. durchs rote Glas: Zweitfarbe noch
   sichtbar → erst ihre Helligkeit etwas senken, dann „Hintergrund rot“ erhöhen; 3. Objekte werden dunkle Löcher →
   Hintergrund zurücknehmen; 4. abwechselnd 2–3 Mal. „Startwerte“ setzt auf die Berechnung bzw. die Startwerte zurück.
   Name eingeben, **„Als Profil speichern“** – das Profil wird aktiv. Die Schritte 1–4 lassen sich überspringen
   („Ohne Fotos direkt zur Feinabstimmung“).
6. **Kontrolle der Zuordnung (optional):** Objekt nur für das linke, nur für das rechte Auge, gemeinsames Objekt – in den
   Profilfarben auf dem Profilhintergrund; Hinweis bei vertauschter Zuordnung oder Übersprechen (keine Bewertung der Person).

### Farbprofile

Ein Profil (Brille + Monitor) enthält Name, Modus (Rot-Cyan/Rot-Grün), Rot, Zweitfarbe, Hintergrund, Zeitpunkt,
Herkunft (Start/Foto/manuell) und gegebenenfalls die Messwerte a/c. Die zwei Startprofile sind immer vorhanden und
werden bei jedem Laden aus den Konstanten erzeugt (nicht lösch- oder überschreibbar). Gespeichert werden `profiles`
und `activeProfileId` im Store `binokular:v1`; jeder Zugriff auf localStorage steht in try/catch, die App startet
ohne gespeicherte Daten. Alte Speicherstände: Die früheren Grundfarben (`calibration.colors`) passen nicht zum neuen
Modell und werden verworfen; der frühere Brillentyp wählt das passende Startprofil; Antworten der Augenkontrolle
bleiben. **Auswahl beim Spielstart:** „Augen und Farben“ zeigt alle Profile mit Farbmustern. Export/Import der Profile
als eigene JSON-Datei (`binokular-farbprofile`, Version 1) in der Kalibrierung; zusätzlich enthält der
Einstellungs-Export im Therapeutenbereich (Version 2) die eigenen Profile und das aktive Profil – Dateien der Version 1
werden weiter gelesen. Importierte Daten werden Feld für Feld geprüft (IDs, Modus, Farben, Hintergrund dunkel begrenzt,
Messwerte), gleiche IDs ersetzen vorhandene Profile.

## Audio

Dezente **Soundeffekte**, synthetisiert mit der **Web Audio API** in `audio/` (keine Audiodateien, keine Netzwerkzugriffe):

| Ereignis | Klang |
|---|---|
| Treffer (Schläger trifft den Ball) | kurzer weicher Ton |
| Fehler (Pfad verlassen, Ball verpasst) | weiches, tiefes „Plopp“ nach unten (nicht erschreckend) |
| Farbwechsel im Flug / Farbwechsel des Pfads | zwei kurze helle Töne |
| Ziel erreicht | kurze Melodie (C–E–G–C) |
| Wandabprall | sehr leiser kurzer Ton |
| Punkt gemacht | heller Doppelton |
| Spielende | kurze Schlussmelodie |
| Pause / Weiter / Ton-Knopf | zwei Töne ab- bzw. aufwärts / kurzer Ton |

- Nur Sinus und Dreieck, weiche Hüllkurve (15 ms Einschwingen, exponentielles Ausklingen), 140–1400 Hz, jeder Ton
  ≤ 0,6 s, jeder Effekt ≤ 1,4 s, keine Dauertöne, höchstens 8 Töne gleichzeitig.
- Lautstärke in **3 Stufen** (leise/mittel/laut = Faktor 0,05/0,10/0,16), nach oben begrenzt (0,18).
- Der **AudioContext** entsteht erst bei der ersten Nutzergeste – Pflicht in iOS/Safari.
- **Ton an/aus und Lautstärke** im Startbildschirm und im Spiel (Lautsprecher-Knopf), lokal gespeichert;
  **Voreinstellung** im Therapeutenbereich (Standard: an, mittel).
- Die Spiele melden Ereignisse über `ctx.play(...)`; ohne Web-Audio-Unterstützung passiert einfach nichts.

## Debug-Modus

Im Therapeutenbereich einschalten (oder `?debug=1`). Tasten bzw. Umschalter am Bildschirm: **1** nur amblyopes Auge,
**2** nur dominantes Auge, **3** binokulares Gesamtbild, **4** Anaglyphen-Simulation (Bild zweimal nebeneinander, mit
idealem Rot- bzw. Cyan-/Grünfilter multipliziert: was jedes Auge sieht).

Mit `?debug=1` gibt es zusätzlich den Testzugriff `window.__binokular` (`state()` = Zustand des Spiels, z. B. Pfadpunkte,
Fortschritt, Fehler, Farbe und `k`, Ball und Schläger; `toClient(x, y)` = Spielkoordinaten → Bildschirm; `set(…)` = Ball
und Schläger setzen, nur Pong; `shellPhase()`), zusammen mit `?seed=N` für einen festen Pfad. Das nutzt der E2E-Test.

## Tests

- `npx vitest run tests/unit/binokular-*.test.ts`:
  - `binokular-nachzeichnen.test.ts` – Pfad (Seed, links → rechts, Anzahl), Spline und Bogenlänge, Fortschritt (monoton,
    kleine Schritte, Abkürzung zählt nicht), Fehler-Zustandsautomat (genau ein Fehler je Ausflug, Weiterzeichnen nur im
    Rückkehrradius, Punkte außerhalb nicht gewertet, Fehlerlimit, Absetzen), Genauigkeit und Abweichung, Farbwechsel-Planer
    (Zeit **oder** Strecke, Zähler zurückgesetzt, „nur Strecke“, Fade nacheinander – nie zwei Farben, Zähler stehen im
    Fade, Zufallstest), Einstellungen.
  - `binokular-pong.test.ts` – Abprallwinkel nach Trefferposition, Geschwindigkeit × 1,04 mit Obergrenze, Computergegner
    (Geschwindigkeit begrenzt, steigt mit dem Spielstand), Farbwechsel bei Kontakt und im Flug (genau einmal je
    Überquerung, Simulation), Startfarbe aus dem Seed, Punkte und Spielende, Zwei-Spieler-Modus, Einstellungen.
  - `binokular-games.test.ts` – Register und Schnittstelle, Farbregeln (Spielcode ohne feste Farben, Rückmeldung grau),
    Migration alter Speicherstände, keine Reste des früheren Spiels, Textregeln.
  - `binokular-vision.test.ts` – Farbzuordnung (Kontrast Richtung Hintergrund, Grau #777–#888, Delta-Zerlegung), Renderer
    mit Attrappe (Hintergrund = Profil, Augenobjekte nur mit difference/lighter, Rückmeldung grau), Kontrolle der Zuordnung.
  - `binokular-calibration.test.ts` – Foto-Auswertung, Kandidaten, Kompensation, Feinabstimmung, Profile, Migration,
    App ohne bzw. mit gesperrtem localStorage, Einstellungs-Export Version 2 und Import Version 1.
  - `binokular-therapy.test.ts` – Session-Log, CSV, PIN, Export/Import (inkl. strenger Prüfung der Spieleinstellungen),
    Speicher. `binokular-audio.test.ts` – Töne kurz und weich, stumm erzeugt nichts, Lautstärkegrenze, Start nach Geste.
- `node tests/e2e/binokular.mjs` (Vorschau-Server auf Port 4173, sonst `BASE=…`; `SIZES=tablet,tabletP,phone,phoneP`):
  Startbildschirm (zwei Karten, keine Reste des früheren Spiels) → Kalibrierung (nur in der ersten Größe) → Nachzeichnen
  (Pfad per Testzugriff, Ziehen, Farbwechsel, genau ein Fehler, Rückkehrradius, graues Aufblitzen, Ziel →
  Zusammenfassung) → Pong (Ball bewegt sich, relative Touch-Steuerung mit Verstärkung über CDP-Touch, Maus, Pfeiltaste,
  Farbwechsel beim Kontakt, Pause bei `visibilitychange`, Wake Lock) → Therapeutenbereich (Spieleinstellungen, Export) →
  Nachzeichnen mit Fade und Fehlerlimit → Pong mit Zwei-Spieler-Modus (zwei Touchpunkte), Flugwechsel, Spielende → Verlauf
  und CSV; Pixelprüfungen (Hintergrund, Pfad/Ball in der Profilfarbe des Auges, Linie und Rückmeldung grau, im Fade nie
  beide Farben); `devicePixelRatio` 3 → Auflösung ×2; Tablet quer und hoch, Handy quer und hoch; keine Konsolenfehler.

## Wissenschaftlicher Hintergrund (ehrlich, gemischte Studienlage)

Dichoptische Verfahren zeigen jedem Auge andere Bildteile und senken den Kontrast für das bessere Auge, damit das
amblyope Auge nicht unterdrückt wird und beide Augen zusammenarbeiten müssen (Hess, Mansouri & Thompson 2010).
Kleine Studien bei Erwachsenen berichteten Verbesserungen nach dichoptischem Training (Li et al. 2013). In größeren
randomisierten Studien bei Kindern war ein binokulares Tablet-Spiel jedoch dem stundenweisen Abkleben unterlegen
(Holmes et al. 2016, PEDIG); eine kleinere, kurze Studie fand über zwei Wochen eine mit dem Abkleben vergleichbare
Verbesserung (Kelly et al. 2016). Bei älteren Kindern, Jugendlichen und Erwachsenen zeigte ein binokulares Spiel keinen
Vorteil gegenüber einem Placebo-Spiel (Gao et al. 2018). Eine Übersicht der American Academy of Ophthalmology
(Pineles et al. 2020) kommt zu dem Schluss, dass die Datenlage einen Ersatz der etablierten Behandlung durch binokulare
Verfahren derzeit nicht stützt. Dieser Prototyp macht deshalb **keine Wirkversprechen**; die Therapieentscheidung
liegt bei Augenärztin/Augenarzt bzw. Optometristin/Optometrist.

Quellen (Titel und DOI per Crossref geprüft):

- Hess, R. F., Mansouri, B. & Thompson, B. (2010). A binocular approach to treating amblyopia: antisuppression therapy. *Optometry and Vision Science*, 87(9), 697–704. https://doi.org/10.1097/OPX.0b013e3181ea18e9
- Li, J., Thompson, B., Deng, D., Chan, L. Y. L., Yu, M. & Hess, R. F. (2013). Dichoptic training enables the adult amblyopic brain to learn. *Current Biology*, 23(8), R308–R309. https://doi.org/10.1016/j.cub.2013.01.059
- Holmes, J. M., Manh, V. M., Lazar, E. L., Beck, R. W., Birch, E. E., Kraker, R. T. et al. (Pediatric Eye Disease Investigator Group) (2016). Effect of a binocular iPad game vs part-time patching in children aged 5 to 12 years with amblyopia: a randomized clinical trial. *JAMA Ophthalmology*, 134(12), 1391–1400. https://doi.org/10.1001/jamaophthalmol.2016.4262
- Kelly, K. R., Jost, R. M., Dao, L., Beauchamp, C. L., Leffler, J. N. & Birch, E. E. (2016). Binocular iPad game vs patching for treatment of amblyopia in children: a randomized clinical trial. *JAMA Ophthalmology*, 134(12), 1402–1408. https://doi.org/10.1001/jamaophthalmol.2016.4224
- Gao, T. Y., Guo, C. X., Babu, R. J., Black, J. M., Bobier, W. R., Chakraborty, A. et al. (2018). Effectiveness of a binocular video game vs placebo video game for improving visual functions in older children, teenagers, and adults with amblyopia: a randomized clinical trial. *JAMA Ophthalmology*, 136(2), 172–181. https://doi.org/10.1001/jamaophthalmol.2017.6090
- Pineles, S. L., Aakalu, V. K., Hutchinson, A. K., Galvin, J. A., Heidary, G., Binenbaum, G. et al. (2020). Binocular treatment of amblyopia: a report by the American Academy of Ophthalmology. *Ophthalmology*, 127(2), 261–272. https://doi.org/10.1016/j.ophtha.2019.08.024

## Grenzen und offene Punkte

- **Mit echter Brille ungetestet:** Übersprechen hängt von Brille, Bildschirm und Raumlicht ab; die Startwerte sind nur
  ein Ausgangspunkt, Foto-Messung und vor allem die Feinabstimmung nach Auge müssen am Gerät erfolgen. Neutrale
  BOTH-Objekte wirken durch die beiden Gläser unterschiedlich hell.
- Die Verrechnung „Objekt minus Hintergrund“ über grauen Flächen geschieht in sRGB-Zahlenwerten (Canvas), nicht in
  linearem Licht: Auf dem Hintergrund stimmt die Farbe exakt, über Grau ist die Kompensation nur näherungsweise.
- Teilkontraste grauer Objekte mischen den (leicht getönten) Hintergrund ein; das graue Aufblitzen nutzt deshalb nur
  vollen Kontrast.
- Wege, Geschwindigkeiten, Fehlerabstände, Intervalle und Computergegner sind **geschätzt** und nicht mit Kindern oder
  Erwachsenen erprobt.
- Wake Lock und Vibration gibt es nicht in jedem Browser (iPhone: keine Vibration); die Spiele laufen ohne.
- Töne sind nur im Browser ohne echte Lautsprecherprüfung getestet; Lautstärke und Klangfarbe auf Tablets bitte vor Ort anhören.
- „Kontrast“ ist relativ zur Vollfarbe definiert, nicht photometrisch gemessen.
- Italienisch ist vorbereitet (zentrale Texte), aber noch nicht übersetzt.
