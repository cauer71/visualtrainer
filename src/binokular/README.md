# Binocular Mine (Prototyp)

> **Diese Software ist ein Forschungs-/Trainingsprototyp. Sie ersetzt keine augenärztliche oder optometrische Untersuchung und ist nicht als eigenständige Behandlung von Amblyopie validiert.**
>
> Wenn Doppelbilder, Kopfschmerzen, Übelkeit oder deutliche Augenbeschwerden auftreten, soll die Session beendet werden
> (Knopf „Beschwerden – Session beenden“, im Spiel jederzeit sichtbar).

Browserbasierter Prototyp eines **dichoptischen Binokulartrainings** mit Rot/Cyan- oder Rot/Grün-Anaglyphenbrille,
inspiriert vom Prinzip dichoptischer Spiele für Amblyopie. Eigenes Spiel, eigene Grafik, eigenes Leveldesign.

- **URL:** `https://visual.auer.page/binokular/` (eigene Test-URL, kein Link aus der Haupt-App, nicht in der Übungsliste)
- **Stand:** MVP – Startbildschirm, Kalibrierung, Auswahl amblyopes Auge, Rot/Cyan- bzw. Rot/Grün-Konfiguration,
  ein vollständig spielbares Level, drei Objektklassen, adaptive Kontraststeuerung, Session-Protokoll mit Verlauf
  und CSV-Export, Therapeutenmenü, Debug-Modus. Die Level 2–10 folgen in einer späteren Runde (Vorschlag unten).

## Installation und Start

Teil des Repos (gemeinsames `package.json`, keine zusätzlichen Abhängigkeiten):

```bash
npm install
npm run dev                 # http://localhost:5173/binokular/
npm run build               # baut auch dist/binokular/index.html
npx vite preview            # http://localhost:4173/binokular/
```

URL-Parameter: `?autoplay=1` (das Level löst sich über die Spiellogik selbst – für Tests und Vorführungen),
`?debug=1` (Debug-Ansichten auch ohne Einstellung), `?checkIn=N` (nur Tests: erste Kontrollaufgabe nach N Sekunden).

**Technik:** TypeScript, Vite, Canvas 2D und **Preact** statt React. Preact hat dieselbe Komponenten-/Hook-API
(`preact/hooks`), ist deutlich kleiner (≈ 4 kB) und ist im Repo schon vorhanden – so kommt keine neue Abhängigkeit
dazu. Der gebaute Prototyp ist ≈ 35 kB (gzip) groß und lädt nichts aus der Haupt-App. Keine Netzwerkzugriffe, keine Anmeldung.

## Architektur

```
binokular/index.html            eigene Seite (Vite-Eingang „binokular“)
src/binokular/
  main.tsx                      Einstieg, URL-Parameter
  texts.ts                      alle Texte (Deutsch; Italienisch später als zweites Objekt)
  binokular.css                 dunkles, neutrales Erscheinungsbild
  game/      types.ts           GameObject { eyeVisibility: BOTH | AMBLYOPIC | FELLOW, contrast, … }
             world.ts           Bewegungsregeln im Raster, Wegsuche (Breitensuche)
             engine.ts          Spiellogik: tap(x, y), tick(dt), scene(); ohne DOM, ohne Farben
             stars.ts           Sterne aus Abschluss, Zeit, Fehlversuchen
             solver.ts          automatischer Löser mit begrenztem Wissen = Binokular-Prüfer, Autoplay
  vision/    color.ts           Farbzuordnung je Auge/Filter/Kontrast, RGB/HSV
             renderer.ts        Canvas-Renderer, Debug-Ansichten, Anaglyphen-Simulation
  levels/    types.ts           Leveldaten und Schwierigkeitsparameter
             level01.ts         Level 1 „Der erste Schacht“
             index.ts           Levelliste
  therapy/   contrast.ts        adaptive Kontraststeuerung (rein, getestet)
             suppression.ts     Suppressions-Kontrollen (rein, getestet)
             session.ts         Session-Protokoll
             pin.ts             Therapeuten-PIN
  data/      settings.ts        Einstellungen + Prüfung
             storage.ts         localStorage `binokular:v1`
             csv.ts             CSV-Export
             transfer.ts        JSON-Export/-Import der Einstellungen
  calibration/calibration.ts    Kalibrierschritte, Antworten, Hinweise, Grundfarben
  components/                   Preact-Bildschirme (Start, Kalibrierung, Augen/Farben, Spiel, Ende, Verlauf, Therapeut)
```

**Trennung von Spiellogik und Darstellung:** Die Spiellogik (`game/`) erzeugt nur eine Szene aus `GameObject`s mit
`eyeVisibility` und `contrast` (0–1). Welche Farbe daraus wird, entscheidet allein `vision/` anhand der Einstellungen.
Ein Test stellt sicher, dass die Szene keine Farbangaben enthält.

## Funktionsweise der dichoptischen Darstellung

- **Schwarzer Hintergrund, additive Farben.** Ein rotes Objekt auf Schwarz sieht nur das Auge hinter dem Rotfilter;
  ein cyanfarbenes (bzw. grünes) nur das Auge hinter dem Cyan-/Grünfilter.
- **Objektklassen:**
  - `AMBLYOPIC` → Farbe des Filters vor dem amblyopen Auge, Kontrast `amblyopicContrast`.
  - `FELLOW` → Farbe des Filters vor dem dominanten Auge, Kontrast `fellowEyeContrast`.
  - `BOTH` → neutrales Grau (Rot- und Grün/Blau-Anteil gleich), durch beide Filter sichtbar (Fels, Erde, Leitern, Lampen, Anzeige).
- **Zuordnung:** amblyopes Auge links/rechts; Filter links Rot / rechts Cyan (bzw. Grün) oder umgekehrt; Brillentyp Rot/Cyan oder Rot/Grün.
- **Zeichenreihenfolge:** zuerst die neutrale Ebene deckend, danach die Augenobjekte **additiv** (`lighter`). Liegt ein
  Kristall (dominantes Auge) über grauer Erde, ändert sich das Bild im Kanal des amblyopen Auges nicht – der Kristall
  bleibt für dieses Auge unsichtbar. Details in Objekten entstehen nur über Helligkeitsstufen derselben Farbe, nie über Schwarz.
- **Kontrast:** Auf schwarzem Hintergrund ist „Kontrast“ hier der Anteil der **Leuchtdichte** der kalibrierten Vollfarbe
  (sRGB-Gammakurve berücksichtigt: 20 % bedeutet 20 % der linearen Lichtmenge, nicht 20 % des Zahlenwerts).
  Endwert = Augenkontrast × Objektkontrast aus dem Level. Der Bildschirm ist nicht photometrisch kalibriert.
- **Weich, ohne Flackern:** Einblendungen ≥ 150 ms (Plattform 700 ms, Roboter nach Fehlversuch 400 ms, Kontrollsymbol 300 ms), keine Blitze.

## Kalibrierung

Erscheint vor dem ersten Spiel (danach über „Kalibrierung“ erneut):

1. **Farben:** Objekt A (nur Rot) – „Ich sehe Objekt A“; Objekt B (nur Cyan/Grün) – „Ich sehe Objekt B“;
   beide zugleich – „Ich sehe beide“ (jeweils auch „Ich sehe nichts“ / „nur eins“).
2. **Augen** (mit Brille, abwechselnd ein Auge zuhalten): Objekt nur für das linke Auge, nur für das rechte Auge,
   gemeinsames Objekt – Antwort „linkes Auge / rechtes Auge / beide / keines“.
3. **Hinweis** aus den Antworten (nur zur Einstellung, keine Bewertung der Person): Zuordnung vertauscht → „Zuordnung tauschen“;
   ein Augenobjekt mit beiden Augen gesehen → Übersprechen, Farben fein einstellen; etwas nicht gesehen → Helligkeit prüfen.
4. **Feineinstellung (Therapeut):** RGB- und HSV-Regler je Grundfarbe (Rot, Cyan bzw. Grün) mit Vorschau;
   Ziel: durch den Rotfilter verschwindet die zweite Form fast ganz und umgekehrt. Werkseinstellung per Knopf.

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

**Speicherung:** `localStorage` unter `binokular:v1`. Begründung: kleine Datenmenge (wenige kB je Session, auch hunderte
Sessions weit unter ≈ 5 MB), synchrone API, in allen Zielbrowsern gleich verfügbar; IndexedDB wäre hier unnötig aufwendig.
Eine beim Schließen der Seite laufende Session wird beim nächsten Start als „unterbrochen“ abgelegt. Daten verlassen das Gerät nie.

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

Außerdem: **Training zurücksetzen** (Sessions löschen, Kontrast auf Startwert), **Export** (Sessions als CSV,
Einstellungen samt Kalibrierung als JSON, ohne PIN), **Import** (JSON; Format/Version werden geprüft, Werte begrenzt).

## Spiel und Level

2D-Seitenansicht einer Mine im Raster (16 × 7 Felder). Roboter antippen (auswählen), Ziel antippen → der Roboter läuft
den kürzesten Weg (über Leitern). Erde antippen → hinlaufen und graben. Schlüssel/Kristall antippen → aufnehmen,
Knopf „Ablegen“ → ablegen. Schalter antippen → betätigen. Tür antippen → mit Schlüssel aufschließen. Kristall zur Basis
bringen → abliefern. Gefahr (Glutnest) berührt → Fehlversuch, Roboter zurück zum letzten sicheren Punkt. Keine Eile:
Robotertempo 2,5 Felder/s, keine Reaktionszeitgrenze. Die reinen Wege der kürzesten Lösung dauern ≈ 30 s; mit Suchen,
Planen und Umwegen sind 2–5 min erwartet – das ist eine Schätzung und muss mit Kindern geprüft werden.

**Sterne (max. 3):** 1 für den Abschluss, +1 wenn die aktive Spielzeit höchstens die Richtzeit beträgt
(60 s × Levelkomplexität × Faktor des Schwierigkeitsgrads), +1 bei höchstens `maxFailuresForStar` Fehlversuchen (Level 1: 0).

**Level 1 „Der erste Schacht“** (`levels/level01.ts`): Schlüssel holen, Erde vor der Tür wegräumen, Tür aufschließen,
Schalter betätigen (die Plattform fährt über die Grube), oben rechts zwei Kristalle freigraben und zur Basis bringen.
Binokulare Paare:

1. Roboter (amblyopes Auge) ↔ Kristalle und Basis (dominantes Auge)
2. Schlüssel (amblyopes Auge) ↔ Tür (dominantes Auge)
3. Schalter (amblyopes Auge) ↔ Plattform (dominantes Auge)
4. zusätzlich: Glutnest (Gefahr) nur für das amblyope Auge (kostet einen Stern, macht das Level aber nicht unlösbar)

**Schwierigkeitsparameter je Level** (`DifficultyParams`): Objektgröße, Kontraste je Klasse, Bewegungsgeschwindigkeit,
Objektanzahl, Abstand zusammengehöriger Objekte, visuelle Ablenkung, Levelkomplexität, Reaktionszeit, Dauer binokularer Nutzung.
Im MVP wirken Objektgröße, Kontraste, Tempo, Ablenkung (Deko-Steine, neutral und je Auge mit geringem Kontrast) und
Komplexität (Richtzeit); die übrigen sind als Daten vorbereitet. Level 1: Größe 0,9, Kontraste 1/1/1 (Ablenker 0,35),
Tempo 2,5, Ablenkung 0,15, Komplexität 3 – **geschätzte Werte**, nicht mit Probanden abgestimmt.

**Binokular-Prüfer** (`game/solver.ts`): Ein Löser plant per Breitensuche mit dem Wissen nur eines Auges und führt die
Eingaben in der echten Spiellogik aus. Tests (`tests/unit/binokular-level.test.ts`): mit beiden Augen lösbar (3 Sterne),
nur amblyopes oder nur dominantes Auge **nicht** lösbar – auch nicht, wenn dem Löser die Roboterposition bzw. Kristalle
und Basis verraten werden; fehlt eine Hälfte irgendeines Paares, ist das Level nicht lösbar. Derselbe Löser liefert `?autoplay=1`.

## Debug-Modus

Im Therapeutenbereich einschalten (oder `?debug=1`). Tasten bzw. Umschalter am Bildschirm (für Tablets):
**1** nur amblyopes Auge, **2** nur dominantes Auge, **3** binokulares Gesamtbild, **4** Anaglyphen-Simulation
(Bild zweimal nebeneinander, mit idealem Rot- bzw. Cyan-/Grünfilter multipliziert: was jedes Auge sieht),
**5** Objektklassifikation (Umrandung durchgezogen = A, gestrichelt = F, gepunktet = B, mit Buchstabe).

## Tests

- `npx vitest run tests/unit/binokular-*.test.ts` – Farbzuordnung, Kalibrierung, Kontraststeuerung, Binokular-Prüfer,
  Sterne, Session-Log/CSV, Suppressions-Kontrolle, PIN, Export/Import, Speicher.
- `node tests/e2e/binokular.mjs` (Vorschau-Server auf Port 4173) – Start → Kalibrierung → Augen/Farben → Level mit
  Autoplay → Session-Ende → Verlauf/CSV → Therapeutenbereich mit PIN; Debug-Ansichten, Kontrollaufgabe, Beschwerden-Knopf;
  Querformat 1180×820, 1440×900, 844×390; keine Konsolenfehler, kein waagrechtes Scrollen; Hochformat-Hinweis.

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
- Schwierigkeitswerte, Richtzeit und Kontrollaufgaben-Takt sind **geschätzt**.
- „Kontrast“ ist relativ zur Vollfarbe definiert, nicht photometrisch gemessen.
- Italienisch ist vorbereitet (zentrale Texte), aber noch nicht übersetzt.

## Ausblick: Level 2–10 (Vorschlag)

Jedes Level als eigene Datei mit steigenden, getrennt verstellbaren Parametern (nicht nur Tempo):

| Level | Idee | Schwerpunkt der Steigerung |
|---|---|---|
| 2 | zwei Schlüssel/Türen-Paare, Kristall hinter Erde mit Glutnest daneben | Objektanzahl, Komplexität 3 |
| 3 | Wege (Leitern) nur für das amblyope Auge, Ziele nur für das dominante | Abstand der Paare, Leitern als Augenklasse |
| 4 | zwei Roboter müssen zusammenarbeiten (einer hält den Schalter) | Komplexität 4, Roboterauswahl |
| 5 | Objektgröße 0,8, mehr neutrale Deko | Objektgröße, Ablenkung 0,3 |
| 6 | langsam wandernde Gefahr (Takt, keine Hektik) | Bewegung, Reaktionszeit (großzügig) |
| 7 | Schalter mit zwei Plattformen, Reihenfolge wichtig | Komplexität 5 |
| 8 | Kristalle mit geringem Objektkontrast im dominanten Auge | Kontrast je Objekt |
| 9 | große Mine (Scrollen/Zoom), weite Wege | Abstand, Dauer binokularer Nutzung |
| 10 | Kombination, Objektgröße 0,7, Ablenkung 0,4 | alle Parameter moderat |

Für jedes neue Level gilt derselbe Binokular-Prüfer-Test (mit einem Auge nicht lösbar) und die Leveldauer 2–5 min.
