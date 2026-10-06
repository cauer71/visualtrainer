# Binocular Mine (Prototyp)

> **Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.**
>
> Wenn Doppelbilder, Kopfschmerzen, Übelkeit oder deutliche Augenbeschwerden auftreten, soll die Session beendet werden
> (Knopf „Beschwerden – Session beenden“, im Spiel jederzeit sichtbar).

Browserbasierter Prototyp eines **dichoptischen Binokulartrainings** mit Rot/Cyan- oder Rot/Grün-Anaglyphenbrille,
inspiriert vom Prinzip dichoptischer Spiele für Amblyopie. Eigenes Spiel, eigene Grafik, eigenes Leveldesign.

- **URL:** `https://visual.auer.page/binokular/` (eigene Test-URL, kein Link aus der Haupt-App, nicht in der Übungsliste)
- **Stand:** 10 Level – Startbildschirm, Kalibrierung, Auswahl amblyopes Auge, Rot/Cyan- bzw.
  Rot/Grün-Konfiguration, Levelauswahl mit Freischaltung, drei Objektklassen, adaptive Kontraststeuerung,
  Session-Protokoll mit Verlauf und CSV-Export, Therapeutenmenü, Debug-Modus, dezente Soundeffekte (Web Audio).

## Installation und Start

Teil des Repos (gemeinsames `package.json`, keine zusätzlichen Abhängigkeiten):

```bash
npm install
npm run dev                 # http://localhost:5173/binokular/
npm run build               # baut auch dist/binokular/index.html
npx vite preview            # http://localhost:4173/binokular/
```

URL-Parameter: `?autoplay=1` (das Level löst sich über die Spiellogik selbst – für Tests und Vorführungen; ohne Ton,
außer mit `&sound=1`), `?level=N` (direkt mit Level N beginnen, auch wenn es noch gesperrt ist; ändert die Freischaltung
nicht), `?debug=1` (Debug-Ansichten auch ohne Einstellung), `?checkIn=N` (nur Tests: erste Kontrollaufgabe nach N Sekunden).

**Technik:** TypeScript, Vite, Canvas 2D und **Preact** statt React. Preact hat dieselbe Komponenten-/Hook-API
(`preact/hooks`), ist deutlich kleiner (≈ 4 kB) und ist im Repo schon vorhanden – so kommt keine neue Abhängigkeit
dazu. Der gebaute Prototyp ist ≈ 45 kB (gzip) groß und lädt nichts aus der Haupt-App. Keine Netzwerkzugriffe, keine Anmeldung.

## Architektur

```
binokular/index.html            eigene Seite (Vite-Eingang „binokular“)
src/binokular/
  main.tsx                      Einstieg, URL-Parameter
  texts.ts                      alle Texte (Deutsch; Italienisch später als zweites Objekt)
  binokular.css                 dunkles, neutrales Erscheinungsbild
  game/      types.ts           GameObject { eyeVisibility: BOTH | AMBLYOPIC | FELLOW, contrast, … }, Ereignisse
             world.ts           Bewegungsregeln im Raster, Wegsuche (Breitensuche)
             engine.ts          Spiellogik: tap(x, y), tick(dt), scene(), drainEvents(); ohne DOM, ohne Farben, ohne Ton
             stars.ts           Sterne aus Abschluss, Zeit, Fehlversuchen
             solver.ts          automatischer Löser mit begrenztem Wissen = Binokular-Prüfer, Autoplay
  vision/    color.ts           Farbzuordnung je Auge/Filter/Kontrast, RGB/HSV-Umrechnung
             renderer.ts        Canvas-Renderer, Kamera für große Level, Debug-Ansichten, Anaglyphen-Simulation
  levels/    types.ts           Leveldaten und Schwierigkeitsparameter
             level01.ts … level10.ts   die zehn Level als Daten
             metrics.ts         nachrechenbare Werte (Objektanzahl, Paarabstand)
             index.ts           Levelliste
  audio/     sounds.ts          Klangdefinitionen je Ereignis (rein, getestet)
             player.ts          Web-Audio-Wiedergabe (Start erst nach Nutzergeste, Lautstärkegrenze)
             index.ts           Ereignisse der Spiellogik → Töne
  therapy/   contrast.ts        adaptive Kontraststeuerung (rein, getestet)
             suppression.ts     Suppressions-Kontrollen (rein, getestet)
             session.ts         Session-Protokoll
             pin.ts             Therapeuten-PIN
  data/      settings.ts        Einstellungen + Prüfung
             progress.ts        Fortschritt, Freischaltung, Migration (rein, getestet)
             storage.ts         localStorage `binokular:v1`
             csv.ts             CSV-Export
             transfer.ts        JSON-Export/-Import der Einstellungen
  calibration/calibration.ts    Kalibrierschritte, Antworten, Hinweise, Grundfarben
  components/                   Preact-Bildschirme (Start, Kalibrierung, Augen/Farben, Levelauswahl, Spiel, Ende,
                                Verlauf, Therapeut)
```

**Trennung von Spiellogik, Darstellung und Ton:** Die Spiellogik (`game/`) erzeugt nur eine Szene aus `GameObject`s
mit `eyeVisibility` und `contrast` (0–1) und meldet Ereignisse (`drainEvents()`). Welche Farbe daraus wird,
entscheidet allein `vision/` anhand der Einstellungen; welcher Ton erklingt, allein `audio/`. Ein Test stellt sicher,
dass die Szene in keinem Level Farbangaben enthält und jedes Objekt eine Augenklasse und einen Kontrast hat.

## Funktionsweise der dichoptischen Darstellung

- **Schwarzer Hintergrund, additive Farben.** Ein rotes Objekt auf Schwarz sieht nur das Auge hinter dem Rotfilter;
  ein cyanfarbenes (bzw. grünes) nur das Auge hinter dem Cyan-/Grünfilter.
- **Objektklassen:**
  - `AMBLYOPIC` → Farbe des Filters vor dem amblyopen Auge, Kontrast `amblyopicContrast`.
  - `FELLOW` → Farbe des Filters vor dem dominanten Auge, Kontrast `fellowEyeContrast`.
  - `BOTH` → neutrales Grau (Rot- und Grün/Blau-Anteil gleich), durch beide Filter sichtbar (Fels, Erde, Leitern,
    Lampen, Anzeige, Erzbrocken als Ablenker).
  - Neue Objektarten ab Level 2 haben ebenfalls `eyeVisibility` und `contrast`: Druckplatte (A), Bahn der wandernden
    Glut (A, halber Kontrast), wandernde Glut (A), Leitern nur für das amblyope Auge (A, Level 3 und 10),
    Erzbrocken (B), Kennzeichen an Schlüsseln/Türen (Punkte in der Farbe des Objekts).
- **Zuordnung:** amblyopes Auge links/rechts; Filter links Rot / rechts Cyan (bzw. Grün) oder umgekehrt; Brillentyp Rot/Cyan oder Rot/Grün.
- **Zeichenreihenfolge:** zuerst die neutrale Ebene deckend, danach die Augenobjekte **additiv** (`lighter`). Liegt ein
  Kristall (dominantes Auge) über grauer Erde, ändert sich das Bild im Kanal des amblyopen Auges nicht – der Kristall
  bleibt für dieses Auge unsichtbar. Details in Objekten entstehen nur über Helligkeitsstufen derselben Farbe, nie über Schwarz.
- **Kontrast:** Auf schwarzem Hintergrund ist „Kontrast“ hier der Anteil der **Leuchtdichte** der kalibrierten Vollfarbe
  (sRGB-Gammakurve berücksichtigt: 20 % bedeutet 20 % der linearen Lichtmenge, nicht 20 % des Zahlenwerts).
  Endwert = Augenkontrast × Objektkontrast aus dem Level. Der Bildschirm ist nicht photometrisch kalibriert.
- **Weich, ohne Flackern:** Einblendungen ≥ 150 ms (Plattform 700 ms, Roboter nach Fehlversuch 400 ms, Kontrollsymbol 300 ms),
  wandernde Glut gleitet in ≤ 600 ms von Feld zu Feld, keine Blitze.
- **Kamera (große Level):** Felder (= Trefferflächen) sind immer mindestens 48 px groß. Passt das Raster so nicht
  ganz auf den Bildschirm (Level 9 und 10 auf dem Handy, Level 1–8 nur auf sehr flachen Bildschirmen), zeigt die Kamera einen
  Ausschnitt: Sie hält den ausgewählten Roboter weich im Bild, Ziehen mit Finger oder Maus verschiebt den Ausschnitt,
  dezente graue Pfeile am Rand zeigen, wo es weitergeht. Kurzes Antippen bleibt Antippen (Ziehen erst ab 10 px).

## Kalibrierung

Erscheint vor dem ersten Spiel (danach über „Kalibrierung“ erneut):

1. **Farben:** Objekt A (nur Rot) – „Ich sehe Objekt A“; Objekt B (nur Cyan/Grün) – „Ich sehe Objekt B“;
   beide zugleich – „Ich sehe beide“ (jeweils auch „Ich sehe nichts“ / „nur eins“).
2. **Augen** (mit Brille, abwechselnd ein Auge zuhalten): Objekt nur für das linke Auge, nur für das rechte Auge,
   gemeinsames Objekt – Antwort „linkes Auge / rechtes Auge / beide / keines“.
3. **Hinweis** aus den Antworten (nur zur Einstellung, keine Bewertung der Person): Zuordnung vertauscht → „Zuordnung tauschen“;
   ein Augenobjekt mit beiden Augen gesehen → Übersprechen, Farben fein einstellen; etwas nicht gesehen → Helligkeit prüfen.
4. **Feinkalibrierung per Auswahl (statt Regler):** Für jede Grundfarbe (Rot, dann Cyan bzw. Grün) ein Raster
   aus 3 × 3 Kästen – Farbton leicht verschoben (Spalten) × Helligkeit (Zeilen), Sättigung immer 100 %.
   Schritt 1 „Verschwinden“: mit dem Auge hinter dem **anderen** Glas schauen und alle Kästen antippen, die man nicht
   oder kaum sieht (wenig Übersprechen). Schritt 2 „Deutlich“: mit dem Auge hinter dem **passenden** Glas unter den
   markierten den deutlichsten wählen. Runde 1 grob (±12°, 100/80/60 %), Runde 2 fein um die Wahl (±5°, ±8 %).
   „Keiner verschwindet“ nimmt den dunkelsten Kasten der mittleren Spalte. Logik: `calibration/fine.ts`,
   Oberfläche: `components/FineCalibration.tsx`. Für Fachleute bleiben die RGB-Werte unter „Experte“ direkt einstellbar.

Alles wird lokal gespeichert.

## Adaptive Kontraststeuerung

Das amblyope Auge bleibt standardmäßig bei 100 %, das dominante startet bei 20 % (`startFellowEyeContrast`).
Nach jedem Level wird `fellowEyeContrast` angepasst (`therapy/contrast.ts`, reine Funktion):

| Modus | Erfolg | wiederholter Misserfolg |
|---|---|---|
| `PERCENTUAL` (Standard) | + 10 % des aktuellen Werts (20 → 22 → 24,2 → 26,6) | − 5 % des aktuellen Werts |
| `LINEAR` | + 5 Prozentpunkte | − 5 Prozentpunkte |
| `MANUAL` | keine Änderung | keine Änderung |

- **Erfolg** = Level abgeschlossen mit **mindestens 2 Sternen**.
- **Misserfolg** = Level nicht abgeschlossen (maximale Leveldauer abgelaufen oder „Level neu starten“) oder nur 1 Stern.
- **Wiederholter Misserfolg** = **2 Misserfolge in Folge**; danach beginnt die Zählung neu, ein Erfolg setzt sie zurück.
- Abbruch wegen Beschwerden oder Sessionende mitten im Level zählt nicht.
- Grenzen 0–100 %, Rundung auf eine Nachkommastelle je Schritt. Abschaltbar (`adaptiveContrast` aus).
  Hinweis: Bei 0 % bleibt PERCENTUAL bei 0 (10 % von 0) – dann LINEAR wählen oder den Wert von Hand setzen.

## Suppressions-Kontrolle

Alle 60–90 s aktiver Spielzeit (nur wenn gerade kein Roboter läuft) erscheint in einem neutralen Rahmen ein Symbol
**nur für das amblyope Auge** (Kreis, Dreieck, Quadrat, Stern), weich eingeblendet, 2,5 s sichtbar. Antwort mit vier
Tasten (plus „Nicht gesehen“), höchstens 10 s. Protokolliert werden Symbol, Antwort, richtig/falsch und Reaktionszeit.
Bei **2 Kontrollen in Folge ohne richtige Antwort** wird `possibleSuppression = true` gesetzt und nur der Text
„Stimulus möglicherweise nicht wahrgenommen.“ gespeichert – **keine Diagnose**. Optional (Einstellung) wird danach
der Kontrast des dominanten Auges gesenkt (Abzug wie oben: LINEAR −5 Prozentpunkte, sonst −5 % des Werts).

## Session und Datenerfassung

Anzeige „Session 12:34 / 30:00“ (Zeit im Spielbildschirm ohne Pausen). Alle 10 Minuten optional ein Pausenangebot.
Am Ende: Spielzeit, Level, Erfolgsrate, aktueller Kontrast des dominanten Auges. Gespeichert je Session:
Datum, Startzeit, Dauer, aktive Spielzeit, Level (Versuche mit Ergebnis), Sterne, Erfolgsrate, Fehler (Fehlversuche),
`amblyopicContrast`, `fellowEyeContrast` (Start/Ende), Kontrastverlauf, Suppressionskontrollen, Reaktionszeiten, Pausenzeiten.
**Verlauf** mit vier SVG-Diagrammen (ohne Bibliothek, neutrale Farbe statt Rot/Cyan): Kontrast des dominanten Auges,
Erfolgsrate je Session, Trainingszeit pro Tag, Genauigkeit der Kontrollaufgaben; darunter eine Tabelle. CSV-Export
(Semikolon, Dezimalkomma, UTF-8). Es wird nichts automatisch bewertet.

Je Level wird ein Versuch mit Levelnummer, Ergebnis (geschafft / Zeit um / neu gestartet / abgebrochen), Sternen,
Fehlversuchen und aktiver Zeit gespeichert – die Session läuft über Levelwechsel weiter. Die CSV hat dafür die Spalte
„Level-Details“ (z. B. „L1 geschafft, 3 Sterne, 0 Fehler, 95 s | L2 …“), der Verlauf die Spalte „Level (Sterne)“.

**Speicherung:** `localStorage` unter `binokular:v1`. Begründung: kleine Datenmenge (wenige kB je Session, auch hunderte
Sessions weit unter ≈ 5 MB), synchrone API, in allen Zielbrowsern gleich verfügbar; IndexedDB wäre hier unnötig aufwendig.
Eine beim Schließen der Seite laufende Session wird beim nächsten Start als „unterbrochen“ abgelegt. Daten verlassen das Gerät nie.
**Migration:** Mit den Leveln 2–10 kamen nur Felder hinzu (`progress.unlocked`, `audio`, Ton-Voreinstellungen), der Schlüssel bleibt.
Ältere Daten werden beim Laden ergänzt: Freigeschaltet ist dann bis zum gespeicherten Level bzw. bis eins nach dem
höchsten Level mit Sternen (getestet in `binokular-levels.test.ts`).

## Therapieparameter (Therapeutenbereich)

Geschützt mit PIN (Standard **726**, im Therapeutenbereich änderbar, 3–8 Ziffern). Die PIN wird nur im Browser
geprüft und ist ein **leichter Schutz gegen versehentliches Verstellen**, keine Sicherheit gegen Personen mit Zugriff auf das Gerät.

| Parameter | Bedeutung | Standard |
|---|---|---|
| Patient-ID | Pseudonym, **keine Klarnamen**; nur lokal | leer |
| Alter | Jahre, nur lokal | leer |
| `amblyopicEye` | amblyopes Auge links/rechts | links |
| Brillentyp | Rot/Cyan oder Rot/Grün | Rot/Cyan |
| Anaglyphen-Zuordnung | links Rot / rechts Cyan (Grün) oder umgekehrt | links Rot |
| `amblyopicContrast` | Kontrast amblyopes Auge, 0–100 % | 100 |
| `fellowEyeContrast` | aktueller Kontrast dominantes Auge, 0–100 % (wird adaptiv verändert) | 20 |
| `startFellowEyeContrast` | Startwert für „Training zurücksetzen“ | 20 |
| `adaptiveContrast` | adaptive Kontraststeuerung an/aus | an |
| Modus | PERCENTUAL / LINEAR / MANUAL | PERCENTUAL |
| Sessiondauer | 5–90 min (z. B. 20, 30, 60) | 30 |
| maximale Leveldauer | 2–15 min; danach gilt das Level als nicht geschafft | 5 |
| Objektgröße | 50–150 % der Levelvorgabe | 100 |
| Schwierigkeitsgrad | leicht/mittel/schwer: Richtzeit-Faktor 1,5/1/0,75, zusätzliche Ablenkung 0/0,15/0,3, Größenfaktor 1/0,9/0,8, Tempo ×1/×1/×1,2 | leicht |
| Pausenangebot | alle 10 min | an |
| Kontrollaufgaben | Suppressions-Kontrollen | an |
| Kontrast bei „nicht wahrgenommen“ senken | optional | aus |
| Entwicklermodus | Debug-Ansichten | aus |
| Startlevel | mit diesem Level beginnt das nächste Spiel (schaltet es mit frei) | 1 |
| Alle Level freischalten | Knopf; sonst wird Level n + 1 nach Abschluss von n frei | – |
| Ton (Voreinstellung) | an/aus und Lautstärke leise/mittel/laut; die Person kann im Startbildschirm und im Spiel umstellen, ihre Wahl gilt, bis hier wieder etwas eingestellt wird | an, mittel |

Außerdem: **Training zurücksetzen** (Sessions löschen, Kontrast auf Startwert), **Export** (Sessions als CSV,
Einstellungen samt Kalibrierung als JSON, ohne PIN), **Import** (JSON; Format/Version werden geprüft, Werte begrenzt).

## Spiel und Level

2D-Seitenansicht einer Mine im Raster (Level 1–8: 16 × 7 Felder, Level 9: 24 × 10, Level 10: 20 × 7). Roboter antippen
(auswählen; bei zwei Robotern wechselt man so), Ziel antippen → der Roboter läuft den kürzesten Weg (über Leitern).
Erde antippen → hinlaufen und graben. Schlüssel/Kristall antippen → aufnehmen, Knopf „Ablegen“ → ablegen. Schalter
antippen → betätigen. Tür antippen → mit passendem Schlüssel aufschließen. Kristall zur Basis bringen → abliefern.
Gefahr (Glutnest, wandernde Glut) berührt → Fehlversuch, Roboter zurück zum letzten sicheren Punkt. Keine Eile:
Robotertempo 2,5 Felder/s in allen Leveln, keine Reaktionszeitgrenze je Aktion.

**Sterne (max. 3):** 1 für den Abschluss, +1 wenn die aktive Spielzeit höchstens die Richtzeit beträgt
(60 s × Levelkomplexität × Faktor des Schwierigkeitsgrads), +1 bei höchstens `maxFailuresForStar` Fehlversuchen (alle Level: 0).

### Neue Mechaniken (Level 2–10, in `game/engine.ts`, ohne DOM/Farben)

- **Kennzeichen:** Schlüssel und Türen gehören über `group` zusammen; 1–3 Punkte am Schlüssel und an der Tür zeigen,
  was zusammengehört (Form statt Farbe – Farbe gehört der Brille). Der falsche Schlüssel öffnet nicht.
- **Druckplatte** (`plate`): Die Plattform ihrer Gruppe ist ausgefahren, solange ein Roboter auf der Platte steht.
  Verlässt er sie, fährt die Plattform zurück; ein Roboter darauf kehrt ohne Fehlversuch zum sicheren Punkt zurück.
  Damit müssen in Level 4 und 10 **zwei Roboter zusammenarbeiten** (einer hält, der andere läuft).
- **Gegenläufige Plattformen** (`inverted`): steht anfangs ausgefahren und fährt ein, wenn ihr Schalter umgelegt wird.
  Ein Schalter mit einer normalen und einer umgekehrten Plattform macht die **Reihenfolge** wichtig (Level 7, 10).
- **Wandernde Glut** (`hazard` mit `patrol`): wandert auf einer festen, sichtbaren Bahn hin und zurück, Tempo =
  Levelparameter `hazardSpeed` (0,5–0,65 Felder/s, also ein Feld alle 1,5–2 s), fester Zeitplan, weiches Gleiten.
  Sie trifft auch stehende Roboter (nach dem Zurücksetzen Schonzeit: mindestens 1,2 s und ein Schritt der Glut). Die Bahnen sind so gelegt, dass man sie
  nur quert oder von der Kreuzung bis zum Bahnende geht – nie die ganze Bahn entlang (das wäre unmöglich).
- **Leitern nur für ein Auge:** `ladderEye` für alle Leitern eines Levels oder einzelne Leiter-Objekte mit Augenklasse.
- **Objektkontrast je Objekt:** Klassenwert `difficulty.contrast.target` für Ziele (Kristalle, Basis) oder eigener
  `contrast` je Objekt.
- **Neutrale Ablenker:** Erzbrocken (für beide Augen gleich, geringer Kontrast, nicht benutzbar) auf freien
  Bodenfeldern, Anzahl 20 × (Ablenkung − 0,2); dazu wie bisher Deko-Steine (24 × Ablenkung).
- **Ereignisse** für Text und Ton: zusätzlich `moveStart`, `platformMoved`, `plateOn`, `plateOff`.

Der **Löser** (`game/solver.ts`) kennt alle Mechaniken: Er plant (Dijkstra über „interessante“ Felder statt jeder
Einzelzelle) mit mehreren Robotern, Druckplatten, Schalterstellungen und umgekehrten Plattformen; Züge, nach denen
ein Roboter keinen Halt hätte, plant er nicht. Kennt er die wandernde Glut, wartet er vor jedem Weg, bis dieser laut
Zeitplan frei ist (`engine.moveIsSafe`, Sicherheitsabstand 0,3 s); dieselbe Prüfung nutzt die Automatik im Browser.

### Die zehn Level

| Level | Idee | binokulare Paare (amblyopes Auge ↔ dominantes Auge) | Besonderheit |
|---|---|---|---|
| 1 „Der erste Schacht“ | Schlüssel, Tür, Schalter, Brücke | Roboter ↔ Kristalle/Basis · Schlüssel ↔ Tür · Schalter ↔ Plattform | große Objekte, ein Glutnest mit sicherem Bogen |
| 2 „Zwei Schlüssel“ | zwei Schlüssel/Tür-Paare mit Kennzeichen | Roboter ↔ Kristalle/Basis · Schlüssel 1/2 ↔ Tür 1/2 | Glutnest in der Erde neben den Kristallen |
| 3 „Unsichtbare Leitern“ | alle Leitern nur für das amblyope Auge, Ziele nur für das dominante | Roboter ↔ Basis · Leitern ↔ Kristalle · Schlüssel ↔ Tür · Schalter ↔ Brücke | kurze Leiter endet am Glutnest |
| 4 „Teamarbeit“ | zwei Roboter: einer hält die Druckplatte | Roboter ↔ Kristalle/Basis · Druckplatte ↔ Brücke · Schlüssel ↔ Tür | Roboter wechseln per Antippen; mit einem Roboter nicht lösbar |
| 5 „Glitzernde Wände“ | kleinere Objekte, mehr Ablenkung | Roboter ↔ Kristalle/Basis · Schlüssel 1/2 ↔ Tür 1/2 · Schalter ↔ Brücke | Erzbrocken als neutrale Ablenker |
| 6 „Wandernde Glut“ | langsam wandernde Glut auf sichtbarer Bahn | Roboter ↔ Kristalle/Basis · Schlüssel 1/2 ↔ Tür 1/2 · Schalter ↔ Brücke | Bahn an der Leiter queren, zum Schalter am Bahnende |
| 7 „Die Wippe“ | ein Schalter, zwei gegenläufige Brücken | Roboter ↔ Kristalle/Basis · Schalter ↔ beide Brücken · Schlüssel 1/2 ↔ Tür 1/2 | Reihenfolge: erst links holen, dann umlegen |
| 8 „Blasse Kristalle“ | Ziele mit 60 % Objektkontrast | Roboter ↔ blasse Kristalle/Basis · Schlüssel 1/2 ↔ Tür 1/2 · Schalter ↔ Brücke | vier Kristalle, Schalter am Ende der Glut-Bahn |
| 9 „Die große Mine“ | 24 × 10 Felder, weite Wege | Roboter ↔ Kristalle/Basis · Schlüssel 1/2 ↔ Tür 1/2 (15–21 Felder auseinander) · Schalter ↔ Brücke | Kamera auf kleinen Bildschirmen |
| 10 „Meisterprüfung“ | Kombination aus allem | Roboter ↔ Kristalle/Basis · rechte Leiter ↔ Kristall 2 · Druckplatte ↔ Brücke · Schalter ↔ zwei gegenläufige Plattformen · Schlüssel ↔ Tür | zwei Roboter, Wippe, Glut, blasse Ziele, kleine Objekte |

Gefahren (Glutnester, wandernde Glut, ihre Bahn) sieht in allen Leveln nur das amblyope Auge.

### Schwierigkeitsparameter je Level (`levels/levelNN.ts`, Feld `difficulty`)

| Level | Objektgröße | Kontrast Ziele (Ablenker) | Tempo Glut (Felder/s) | Objekte | Paarabstand (Felder) | Ablenkung | Komplexität | Reaktionszeit (ms) | Dauer binokular (s) | geschätzte Dauer (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0,90 | 1,00 (0,35) | – | 9 | 6 | 0,15 | 3 | – | 180 | 135 |
| 2 | 0,90 | 1,00 (0,35) | – | 9 | 6 | 0,15 | 3 | – | 180 | 124 |
| 3 | 0,85 | 1,00 (0,35) | – | 9 | 8 | 0,20 | 3 | – | 200 | 134 |
| 4 | 0,85 | 1,00 (0,35) | – | 10 | 8 | 0,20 | 4 | – | 210 | 132 |
| 5 | 0,75 | 1,00 (0,45) | – | 12 | 8 | 0,40 | 4 | – | 220 | 179 |
| 6 | 0,75 | 1,00 (0,45) | 0,50 | 12 | 8 | 0,40 | 4 | 2000 | 230 | 171 |
| 7 | 0,75 | 1,00 (0,45) | 0,50 | 13 | 9 | 0,40 | 5 | 2000 | 240 | 134 |
| 8 | 0,75 | 0,60 (0,50) | 0,55 | 13 | 9 | 0,45 | 5 | 1818 | 250 | 201 |
| 9 | 0,70 | 0,60 (0,50) | 0,60 | 14 | 15 | 0,45 | 5 | 1667 | 280 | 278 |
| 10 | 0,70 | 0,55 (0,50) | 0,65 | 14 | 12 | 0,50 | 5 | 1538 | 300 | 158 |

Bedeutung (alle Werte **geschätzt**, nicht mit Probanden abgestimmt):

- **Objektgröße** relativ zum Feld; dazu Therapeuten-Einstellung Objektgröße und Schwierigkeitsgrad.
- **Kontrast:** Objektkontrast der Ziele (Kristalle, Basis) im dominanten Auge, in Klammern der Deko-Steine; wird mit
  dem Augenkontrast multipliziert. Alle übrigen Objekte haben 1,0 (der Augenkontrast steuert die Hauptsache).
- **Bewegungsgeschwindigkeit:** Roboter in allen Leveln ruhig 2,5 Felder/s; ab Level 6 wandert eine Glut (Tempo steigt langsam).
- **Objektanzahl:** Roboter, Kristalle, Schlüssel, Türen, Schalter, Druckplatten, Plattformen, Gefahren (`levels/metrics.ts`, Test prüft).
- **Paarabstand:** Mittel der Abstände Schlüssel ↔ Tür und Schalter/Druckplatte ↔ Plattform (`metrics.ts`, Test prüft).
  Steigt bis Level 9 (Level der weiten Wege); Level 10 bewusst mittel, weil dort alles andere zusammenkommt (dokumentierte Ausnahme).
- **Ablenkung:** Deko-Steine und Erzbrocken (siehe oben).
- **Komplexität:** Zahl der Arbeitsschritte, bestimmt die Richtzeit (60 s × Komplexität).
- **Reaktionszeit:** so lange bleibt die wandernde Glut auf einem Feld (= 1000 / Tempo) – Zeit zum Erkennen und Losschicken.
- **Dauer binokular:** Richtwert für die durchgehende binokulare Nutzung je Level (2–5 min).
- **Geschätzte Dauer:** aus dem Löser: reine Wege × 1,5 (Umwege) + 4 s Planen/Suchen je Eingabe; der Test verlangt
  2–5 min. Das ist eine grobe Schätzung, keine Messung – Kinder brauchen vermutlich länger.

Schwierigkeit steigt also nicht nur über Tempo: zuerst große Ziele und einfache Wege, später kleinere Ziele, blassere
Ziele, mehr Elemente, unsichtbare Wege, zwei Roboter, Reihenfolge-Aufgaben und eine langsam wandernde Gefahr.

### Freischaltung und Levelauswahl

Nach „Augen und Farben“ kommt die **Levelauswahl** (10 Karten mit besten Sternen; gesperrte Level grau). Level 1 ist
immer frei; wer Level n abschließt, schaltet Level n + 1 frei. Nach jedem Level: „Nächstes Level“ (bzw. „Level nochmal
spielen“), „Level wählen“ (Übersicht im Spiel) oder „Session beenden“ – die Session läuft über Levelwechsel weiter,
adaptive Kontraststeuerung und Kontrollaufgaben laufen über alle Level. Im Therapeutenbereich: **Startlevel** wählen
(schaltet es mit frei) und **alle Level freischalten**. „Training zurücksetzen“ setzt auch die Freischaltung zurück.
Logik rein und getestet in `data/progress.ts`.

**Binokular-Prüfer** (`game/solver.ts`): Ein Löser plant mit dem Wissen nur eines Auges und führt die Eingaben in der
echten Spiellogik aus. Tests (`tests/unit/binokular-levels.test.ts`, alle 10 Level): mit beiden Augen lösbar
(3 Sterne), nur amblyopes oder nur dominantes Auge **nicht** lösbar – auch nicht, wenn dem Löser die Roboterposition
bzw. Kristalle und Basis verraten werden; fehlt eine Hälfte irgendeines Paares, ist das Level nicht lösbar. Zusätzlich:
Level 3 und 10 ohne die Leitern des amblyopen Auges nicht lösbar, Level 4 und 10 mit nur einem Roboter nicht lösbar.
Derselbe Löser liefert `?autoplay=1`.

## Audio

Dezente **Soundeffekte** für alle Aktionen und Ereignisse, synthetisiert mit der **Web Audio API** in `audio/`
(keine Audiodateien, keine Netzwerkzugriffe, keine Abhängigkeit zur Haupt-App):

| Ereignis | Klang |
|---|---|
| Roboter auswählen | kurzer heller Ton |
| Loslaufen | sehr leiser kurzer Ton (nur beim Start, kein Schrittgeräusch) |
| Graben | drei tiefe, weiche Töne |
| Aufnehmen (Schlüssel) / Kristall eingesammelt | kurzer Aufwärtston / zwei helle Töne |
| Ablegen | kurzer Abwärtston |
| Schalter / Druckplatte gedrückt, losgelassen | zwei kurze Klicktöne / weicher Auf- bzw. Abwärtston |
| Plattform bewegt sich | leises, weiches Gleiten (0,55 s) |
| Tür öffnet | zwei Töne aufwärts |
| Kristall an der Basis abgeliefert | heller Doppelton |
| Gefahr berührt / Fehlversuch | weiches, tiefes „Plopp“ nach unten (nicht erschreckend) |
| geht nicht (kein Weg, Schlüssel fehlt …) | sehr leiser tiefer Ton |
| Kontrollaufgabe erscheint | leiser Hinweis-Doppelton – immer gleich, verrät das Symbol nicht |
| Level geschafft | kurze Melodie (C–E–G), danach ein Glockenton je Stern; Zeit um: zwei Töne abwärts |
| Pause / Weiterspielen / Session-Ende | zwei Töne ab- bzw. aufwärts / kurze Schlussmelodie |

- Nur Sinus und Dreieck, weiche Hüllkurve (15 ms Einschwingen, exponentielles Ausklingen), 140–1400 Hz, jeder Ton
  ≤ 0,6 s, jeder Effekt ≤ 1,4 s, keine Dauertöne, höchstens 8 Töne gleichzeitig.
- Lautstärke in **3 Stufen** (leise/mittel/laut = Faktor 0,05/0,10/0,16), nach oben begrenzt (0,18).
- Der **AudioContext** entsteht erst bei der ersten Nutzergeste (Antippen/Taste) – Pflicht in iOS/Safari.
- **Ton an/aus und Lautstärke** im Startbildschirm und im Spiel (Lautsprecher-Knopf schaltet aus → leise → mittel →
  laut), lokal gespeichert; **Voreinstellung** im Therapeutenbereich (Standard: an, mittel).
- **Getrennt von der Spiellogik:** Die Engine meldet Ereignisse (`drainEvents()`), `audio/` reagiert darauf
  (`GAME_SOUND`, `playGameEvents`). Die Automatik läuft stumm (außer `?sound=1`), Tests laufen ohne Browser-Audio;
  ohne Web-Audio-Unterstützung passiert einfach nichts.

## Debug-Modus

Im Therapeutenbereich einschalten (oder `?debug=1`). Tasten bzw. Umschalter am Bildschirm (für Tablets):
**1** nur amblyopes Auge, **2** nur dominantes Auge, **3** binokulares Gesamtbild, **4** Anaglyphen-Simulation
(Bild zweimal nebeneinander, mit idealem Rot- bzw. Cyan-/Grünfilter multipliziert: was jedes Auge sieht),
**5** Objektklassifikation (Umrandung durchgezogen = A, gestrichelt = F, gepunktet = B, mit Buchstabe). Jedes
Objekt der Szene bekommt eine Klasse – auch die neuen (Druckplatte, Bahn, wandernde Glut, Erzbrocken); Leitern,
Bahn, Deko-Steine und Erzbrocken nur mit kleinem Buchstaben, damit die Ansicht ruhig bleibt (`classMarks`, getestet).

## Tests

- `npx vitest run tests/unit/binokular-*.test.ts` – Farbzuordnung, Kalibrierung, Kontraststeuerung, Binokular-Prüfer,
  Sterne, Session-Log/CSV, Suppressions-Kontrolle, PIN, Export/Import, Speicher.
- `tests/unit/binokular-levels.test.ts` – für **alle 10 Level**: Leveldaten gültig (Raster, Roboter auf festem Boden,
  Basis/Schalter/Platten erreichbar stehend, Bahn der Glut zusammenhängend), Schwierigkeitswerte stimmen und steigen
  wie dokumentiert, Binokular-Prüfer (beide Augen: 3 Sterne; je ein Auge – auch mit verratener Roboterposition bzw.
  verratenen Zielen – nicht; jede fehlende Paarhälfte → nicht), Automatik schafft jedes Level (Wiedergabe mit
  unregelmäßigen Bildzeiten, ohne Fehlversuch, Schwierigkeitsgrad leicht und schwer), geschätzte Dauer 2–5 min,
  neue Mechaniken (Druckplatte, Wippe, wandernde Glut, Kennzeichen, Ablenker, Objektkontrast), Kamera ≥ 48 px,
  Freischaltung, Migration alter Daten, Level-Details in Log und CSV.
- `tests/unit/binokular-audio.test.ts` – jedes Ereignis hat einen Effekt, Töne kurz und weich, stumm erzeugt nichts,
  Lautstärkegrenze, Start erst nach Geste (AudioContext-Attrappe), keine Fehler ohne Audio-Unterstützung.
- `node tests/e2e/binokular.mjs` (Vorschau-Server auf Port 4173, sonst `BASE=…`) – Start mit Ton-Einstellung →
  Kalibrierung → Augen/Farben → Levelauswahl → Level 1 und „Nächstes Level“ 2 mit Autoplay (Session läuft weiter) →
  Session-Ende → Verlauf/CSV → Therapeutenbereich mit PIN (alle Level freischalten, Ton-Voreinstellung) →
  Levelauswahl; danach **jedes der 10 Level** mit `?autoplay=1&level=N&sound=1` bis zum Abschluss (3 Sterne, Felder
  ≥ 48 px, mit Ton); Debug-Ansichten in Level 10, Kontrollaufgabe, Ton-Knopf, Beschwerden-Knopf; Kamera ziehen
  (Handy, Level 9); Querformat 1180×820, 1440×900, 844×390; keine Konsolenfehler, kein waagrechtes Scrollen;
  Hochformat-Hinweis. Optional `LEVELS=1,6` und `SIZES=tablet` zum Eingrenzen.

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

- **Mit echter Brille ungetestet:** Übersprechen hängt von Brille, Bildschirm und Raumlicht ab; die Standardfarben sind
  reine Primärfarben, die Feineinstellung muss am Gerät erfolgen. Neutrale BOTH-Objekte wirken durch die beiden Filter
  unterschiedlich hell (Grau ist nicht für jede Brille gleich hell).
- Schwierigkeitswerte, Richtzeit und Kontrollaufgaben-Takt sind **geschätzt**. Leveldauer und Schwierigkeit der
  Level 2–10 sind **nur simuliert** (Löser + grobe Schätzformel), nicht mit Kindern oder Erwachsenen erprobt.
- Töne sind nur im Browser ohne echte Lautsprecherprüfung getestet (Attrappe, Headless-Chromium); Lautstärke und
  Klangfarbe auf Tablets/iPads bitte vor Ort anhören.
- „Kontrast“ ist relativ zur Vollfarbe definiert, nicht photometrisch gemessen.
- Italienisch ist vorbereitet (zentrale Texte), aber noch nicht übersetzt.
