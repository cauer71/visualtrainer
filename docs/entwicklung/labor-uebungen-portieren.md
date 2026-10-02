# Labor-Übungen in Blickfit portieren (Anleitung für Phase B)

Der Labor-Prototyp (Branch `origin/labor-offline-prototyp`, Ordner `labor/`, reines HTML/JS, CommonJS) hat 14 Übungen.
Sie werden in Blickfit **neu geschrieben** (TypeScript/Preact, Canvas-Modul wie die Übungen unter `src/exercises/`), nicht kopiert:
der Prototyp wird nicht ins Repository übernommen, nur portiert. Phase A hat die Grundlage gebaut und als Vorbild **eine**
Übung portiert: **`labor-spot-touch`** (aus `ex/spots.js` + `help/spots.js`). Orientiere dich an ihr, Datei für Datei.

Gelesen werden sollte zuerst: `docs/entwicklung/neue-uebung.md` (allgemeine Regeln: Lebenszyklus, virtuelle Zeit, `dt`,
`ctx.rng`, Touch-Ziele, Demo, Autoplay, Texte) – dieses Dokument ergänzt es um das, was bei Labor-Übungen anders ist.

## 1. Was Phase A bereitstellt

| Baustein | Datei | Kurz |
|---|---|---|
| Marke `labor` | `ExerciseDefinition.tags`, `registry.ts` (`TAG_LABOR`, `hasTag`, `byTag`, `matchesTagFilter`) | Marke „Labor“ auf Karten, Filter „Alle · Labor · Ohne Labor“, **nicht** im Tagestraining |
| Einstellungen | `ExerciseDefinition.params`, `ExerciseTexts.params`, `ctx.params`, `src/core/params.ts` | Zahl (Stepper + Regler) oder Auswahl (Chips), Speicherung je Übung, „Standard wiederherstellen“ |
| Vergleichbarkeit | `variantKey` (`params.ts`), `saveResult(…, variant)` (`storage.ts`) | Verlauf, Bestwert, „Letztes Mal“ nur bei gleichen Einstellungen |
| Kalibrierung | `ctx.calib`, `src/core/calib.ts`, Seite `#/kalibrieren` | cm ↔ Pixel ↔ Sehwinkel, Begrenzung auf die Bühne |
| Texte | `ExerciseTexts.metricHints`, `progression`, `cautions` | Erklärung der Werte, „So wird es leichter/schwerer“, „Gut zu wissen“ |
| Gemeinsame Helfer | `_shared/labor-adaptive.ts`, `_shared/labor-woerter.ts` | Wertetreppe (Prototyp `lib/adaptive.js`), Wortliste (`lib/words.js`) – bereits portiert und getestet |
| Referenz | `src/exercises/labor-spot-touch/` + `tests/unit/labor-spot-touch-*.test.ts` | Logik, Darstellung, Demo, Autoplay, Texte, science, Tests |

Alles ist abwärtskompatibel: Übungen ohne `tags`/`params`/`usesCalibration` laufen unverändert, `ctx.params` ist dann `{}`.

## 2. Schnittstellen (Typen in `src/core/types.ts`)

```ts
// Definition (index.ts)
export const laborXyz: ExerciseDefinition = {
  id: 'labor-…', category: '…', minutes: 1, color: '…', icon: '…',      // wie jede Übung
  texts: { de, it }, showsLevel: false,
  tags: ['labor'],                  // Pflicht für alle Labor-Übungen
  params: PARAMS,                   // readonly ParamDef[]  (siehe unten)
  usesCalibration: true,            // wenn die Übung cm/Sehwinkel nutzt → Hinweis „Bildschirm kalibrieren“ im Intro
  create: (ctx) => new Xyz(ctx),
};

type ParamDef =
  | { key; type: 'number'; default; min; max; step; unit?: 'cm'|'s'|'ms'|'bpm'|'count'|'deg'|'percent'; neutral?; summary? }
  | { key; type: 'select'; default: string; options: readonly string[]; neutral?; summary? };
```

- `neutral: true` = ändert die Vergleichbarkeit nicht (Ton). **Alle anderen** Einstellungen gehören zum Variantenschlüssel.
- `summary: true` = steht in der Kurzfassung auf der Ergebnisseite („5 cm · 1,5 s · 1 Punkt“); abweichende Einstellungen kommen automatisch dazu. Wähle 2–3 wichtige.
- Texte je Einstellung in `texts.params[key]`: `{ label, hint?, options?: Record<wert, name>, short?: '{v} Punkt|{v} Punkte' }`
  (`short` nur für Zahlen; `|` trennt Einzahl/Mehrzahl). Auswahlen erscheinen in der Kurzfassung als „Label: Name“.
- **Prototyp-Auswahlen** haben `options: [{ value, label }]` (auch Zahlen): übersetze zu `options: ['a','b']` (Strings) und Namen in `texts.params.<key>.options`; Zahlenwerte als Text ('3') und in der Logik `Number()` lesen.
- **Lesen in der Übung:** `const p = spotParams(paramsOf(ctx, PARAMS))` – `paramsOf` liefert `ctx.params` bzw. (ältere Test-Attrappen) die Standardwerte. Schreibe je Übung eine typisierte Lesefunktion wie `spotParams` in `logic.ts`.
- **Kalibrierung:** `const calib = calibOf(ctx)`:

```ts
calib.pxPerCm, calib.viewDistanceCm, calib.calibrated      // calibrated=false → Schätzung 38 px/cm, 40 cm
calib.cmToPx(cm) / pxToCm(px) / cmToDeg(cm) / degToCm(deg) // reine Umrechnung (Formeln wie makeCalib im Prototyp)
calib.sizePx(cm) / fitCm(cm) / isLimited(cm) / maxCm()     // begrenzt auf 0,9 × kürzere Bühnenseite (live)
```

  **Größen immer über `calib.sizePx`/`fitCm` zeichnen** (nie über `cmToPx`), sonst sprengt ein 15-cm-Punkt die Bühne eines Handys.
  Abstände zwischen Objekten, Wege und Winkel (`degToCm`) ebenso auf die Bühne prüfen: passt etwas nicht, **verkleinern/klemmen, nie ein Fehler**.
  Das Intro zeigt „… auf diesem Bildschirm auf … cm begrenzt“ automatisch für **Zahl-Einstellungen mit `unit: 'cm'`**, deren Wert die Bühne sprengt. Für andere Größen (Winkel in Grad, Abstände) bei Bedarf eigenen Hinweis in `cautions` ergänzen.
  Im Intro-Film hat `ctx.calib` eine eigene Skala (Bühne ≈ 13 cm hoch, `calibrated: false`) und `ctx.params` sind die Standardwerte – der Film ist unabhängig von den Einstellungen und der Kalibrierung der Person. Größen im Film also so wählen, dass sie in 13 cm Bühnenhöhe passen (in Spot-Touch: `DEMO_PARAMS`).
- **Ergebnis:** wie jede Übung (`ctx.finish({ primary, secondary, details?, score, level: 1, tip })`), dazu `texts.metricHints[key]` = Kurzerklärung je Kennzahl (erscheint einklappbar „Was bedeuten die Werte?“).
- **Speicher/Vergleich:** passiert in `ExercisePage` automatisch (Variantenschlüssel aus den beim Start gelesenen Einstellungen). Die Übung muss nichts tun.

## 3. Vorgehen Schritt für Schritt

1. **Prototyp lesen:** `labor/ex/<alt>.js` (Parameterliste, `…Session`-Klasse, `run`), `labor/help/<alt>.js` (Texte, Literatur), `labor/test/<alt>.test.js`.
2. **Dateien anlegen** (`<neu>` = ID aus Abschnitt 5): `src/exercises/<neu>/{index.ts,texts.ts,logic.ts,science.ts}` und `tests/unit/<neu>-logic.test.ts` (+ optional `<neu>-sim.test.ts`).
3. **`logic.ts`:** `…Session`-Klasse nach TypeScript übertragen (reine Logik, Zeitbasis ms, Koordinaten in cm, kein DOM). Übersetzung der Prototyp-API:

   | Prototyp | Blickfit |
   |---|---|
   | `VT.makeRng(seed)` → `rng()` | `Rng` aus `src/core/rng`: `rng.next()` |
   | `rng.int(lo, hi)` (inklusiv) | `lo + rng.int(hi - lo + 1)` (`int(n)` = 0…n−1) |
   | `rng.pick(arr)` | `rng.pick(arr)` |
   | `rng.shuffle(arr)` (**Kopie**) | `rng.shuffle([...arr])` – **mischt in place**, deshalb vorher kopieren |
   | `VT.mean/median/sd` (`null` bei leer, `sd` null bei < 2) | `src/core/stats` (**`NaN` bei leer**, `sd` = 0 bei < 2): vorher auf Leere prüfen, wie `logic.ts` in Spot-Touch |
   | `VT.round(x, d)` | eigene `round` (siehe Spot-Touch `logic.ts`) |
   | `VT.sanitizeParams` / `defaultsOf` | `core/params.ts` (`sanitizeParams`, `defaultParams`) – der Runner bereinigt schon |
   | `VT.metric(key, label, value, unit)` | `Metric { key, value, unit }`; Label/Erklärung in `texts` |
   | `VT.makeStaircase` | `_shared/labor-adaptive.ts` (`makeValueStaircase`, gleiche Regeln, schon getestet) |
   | `VT.words` | `_shared/labor-woerter.ts` (`WOERTER`, `woerterMitLaenge`, `anagrammeVon`) |
   | `env.calib.pxPerCm`, `cmToDeg`, … | `calibOf(ctx)` (siehe oben) |
   | `env.audio.beep` | `ctx.sfx.good()/bad()/tap()/beat?.()` (Ton nur, wenn die Einstellung „Ton“ an ist, falls es sie gibt) |
   | `env.now()` | `t` aus `update(dt, t)` bzw. `p.t` aus `pointerDown` |
   | `finish({ metrics, trials })` | `ctx.finish(result)`; `trials`/CSV-Export entfallen (kein Export in Blickfit) |

   Zeitverhalten bleibt **bildratenunabhängig**: Bewegungen mit `dt` rechnen (Prototyp rechnet teils pro Frame!). `Math.random`/`Date.now` nirgends.
4. **`index.ts`:** Klasse `implements Exercise` (`start`, `update`, `render`, `pointerDown`, ggf. `pointerMove/pointerUp/keyDown/resize`).
   Vorlage ist `labor-spot-touch/index.ts` (Feld in px ↔ cm, Rückmeldung, HUD, Demo, Autoplay, Ergebnis). Regeln: `resize()` implementieren (Tablet drehen), Spielfeld live aus `ctx.stage`, Touch-Trefferradius ≥ 24 px, Doppeltipps robust, weiche ✓/✗ aus `_shared/weiche-marken.ts` (kein Rot-Blitz, Farbe nie allein), keine Blitze > 3/s, bei `ctx.reducedMotion` Effekte weglassen, HUD: `setProgress`, `setScore`, `setLabel`.
   Zeichnen: `src/core/draw.ts` ersetzt `labor/lib/draw.js` (`background`, `circle`, `ring`, `text`, `button`, `rrPath`, …); Spielfeld/Hand/Bildunterschrift im Film: `_shared/tippziele.ts` (`playField`, `restPoint`, `toastNear`, `captionTop`).
5. **Einstellungen (`PARAMS`)** aus dem Prototyp übernehmen (Schlüssel, Grenzen, Schritt, Standard unverändert), `unit` setzen (`cm`/`s`/`ms`/`bpm`/`count`/`deg`/`percent`), Ton `neutral: true`, 2–3 Einstellungen `summary: true`. Standardwerte = Prototyp.
6. **Kennzahlen:** `primary` = `headline[0]` des Prototyps (Tabelle in Abschnitt 5 nennt Einheit und `better`), `secondary` = übrige `headline` + 2–3 weitere (2–4 Werte), restliche `metricKeys` in `details` (Tabelle „Weitere Werte“) – **alle** `metricKeys` müssen in `texts.metrics` (Label) **und** `texts.metricHints` (Kurzerklärung aus `help.metrics`) stehen, DE und IT. Einheiten: Zeiten in **ms** (`ms`/`time`; Prototyp-Sekunden × 1000), Quoten `percent` (0–100), Zähler `count`. Fehlende Werte (nichts getroffen) **weglassen**, nie `NaN`/`null`. Prototyp-Einheiten wie „von 20“ gehören ins Label/den Hinweis. `level: 1`, `showsLevel: false`, `score` nur zur Motivation.
7. **Texte (`texts.ts`, DE/IT):** aus `help/<alt>.js` – `purpose` → `tagline`/`why`, `steps`+`setup` → `steps` (2–3 Schritte ≤ 60 Zeichen; das Übrige in `cautions`), `tips` → `tips` (Schlüssel für persönliche Tipps nach dem Lauf, Auswahl per `tipFor` in `logic.ts`), `progression` → `progression`, `cautions` → `cautions`, `params` → `texts.params`, `metrics` → `metricHints`. Die Labor-Texte sind **Entwürfe**: glätten (du-Form, einfache Sprache, Fachwörter erklären oder ersetzen: „Fixationskreuz“ → „Kreuz in der Mitte“, „Peripherie“ → „Rand“, „Median“/„Streuung“ erklären). Rechtlich wie bei allen Übungen: **keine Wirk-/Heil-/Sicherheitsversprechen, kein „Test“/„Diagnose“/„Normwert“**, kein Vergleich mit anderen; `why` **endet** mit „… ist nicht belegt.“; ehrlich sagen, was nicht gemessen wird (Blick ohne Eye-Tracking, laut Lesen/Aussprache). Faustregeln des Prototyps („über 90 % → schwerer“) als „unsere Faustregel, keine Vorgabe aus der Forschung“ kennzeichnen. Italienisch inhaltlich gleich, **gleiche Schlüssel und gleich lange Listen** (der Test in `labor-spot-touch-sim.test.ts` prüft das für Spot-Touch – kopieren und anpassen).
8. **Demo/Autoplay:** Intro-Film 8–14 s mit Geister-Hand und Bildunterschriften (≤ 42 Zeichen), Beispiel `demoSpawned`/`demoHit` in Spot-Touch; Autoplay im Spielmodus (`ctx.autoplay && mode === 'play'`): Hand spielt meist richtig, manchmal falsch, Sitzung endet sauber. Bei `ctx.quick` (`?quick=1`) Dauer/Zahl der Durchgänge stark kürzen (Ziel ≈ 8 s). **Immer `ctx.finish` aufrufen.** Eingaben, die der Prototyp per Tastatur/Maus kennt (Halten der Startfläche, Ziehen) laufen in Blickfit über `pointerDown/Move/Up`; Autoplay muss das mit `ctx.ghost` nachstellen (siehe `ziehen-ablegen`, `ruhige-hand`, `spur-folgen`).
9. **Tests:** `labor/test/<alt>.test.js` (node:test) nach vitest übertragen: `test(…)` → `it(…)`, `assert.equal(a,b)` → `expect(a).toBe(b)`, `assert.deepEqual` → `toEqual`, `assert.ok(x)` → `expect(x).toBeTruthy()`, `VT.makeRng(seed)` → `createRng(seed)` (**andere Zufallsfolge, nur Eigenschaften testen, keine festen Zufallswerte**), `null` → `toBeNull()`. Dann **erweitern**: Grenzfälle (leer, ein Wert), `resize`, Kennzahlen mit `NaN`-Wächter, Einstellungs-Bereinigung. Zusätzlich ein Durchlauf-Test nach dem Muster `tests/unit/labor-spot-touch-sim.test.ts` (Demo 8–14 s, Autoplay mit `quick`, alle `PARAMS`-Varianten, Hochformat, Drehen, DE/IT-Schlüssel, `metricHints` vollständig, Rechtswörter). Die Prototyp-Tests `docs.test.js`, `offline.test.js`, `ui-smoke.test.js`, `core.test.js` entfallen (Blickfit prüft das über `registry.test.ts` und die neuen Framework-Tests).
10. **`science.ts`:** siehe Abschnitt 6 (Quellenprüfung ist Pflicht).
11. **Registrierung:** in `src/exercises/registry.ts` importieren und an das Ende von `EXERCISES` setzen; in `src/content/science.ts` import + Eintrag in die `Object.fromEntries([...])`-Liste. (Beide Dateien ändern alle vier Helfer: Konflikte sind nur Zeilen am Listenende – beim Zusammenführen beide Zeilen behalten.)
12. **Prüfen:** Checkliste (Abschnitt 7).

## 4. Besonderheiten im Framework (Entscheidungen von Phase A)

- **Variantenschlüssel** = `key=value`, nach Schlüsseln sortiert, mit `|` verbunden; alle `params` außer `neutral`. Läuft ein Übung ohne `params` → Schlüssel leer = alles wie bisher. Auf der Ergebnisseite: „Einstellungen: Standard/eigene · Kurzfassung“; gibt es nur Läufe mit anderen Einstellungen, steht ein Hinweis statt „Letztes Mal/Bestwert“. Der Bestwert der Startseiten-Karte gilt für die gerade gespeicherten Einstellungen. `storage.ts`: `HistoryEntry.v` (Variante), `ExerciseRecord.bv` (Bestwerte je Variante, höchstens 40), `best` gilt für die leere Variante.
- **Einstellungen speichern** in `settings.exerciseParams[id]`, Kalibrierung in `settings.calib` (`{ pxPerCm: number|null, viewDistanceCm }`); beides wird beim Lesen bereinigt (kaputte Werte → Standard/nicht kalibriert). „Meine Ergebnisse löschen“ lässt Einstellungen und Kalibrierung stehen.
- **Kalibrierseite** `#/kalibrieren` (ohne Anmeldung, in beiden Ansichten erreichbar; Link aus Optiker-Seite, Intro-Hinweis und Einstellungsbereich): Rechteck auf Bankkartenbreite (lange oder kurze Seite, auf schmalen Handys nur die kurze), Sehentfernung 30–100 cm, Kontrollquadrat 5 cm, Speichern/Zurücksetzen.
- **Tagestraining:** `dailySet` überspringt Labor-Übungen (und ergibt für die bisherigen Übungen dieselbe Auswahl wie vorher). Der Kunde kann Labor-Übungen wie jede andere für seine Ansicht wählen.
- **Filter:** `useTagFilter()` (`src/ui/tag-filter.ts`): `?tag=labor|nolabor|all` (Hash oder Seiten-URL) vor `sessionStorage` vor „Alle“.
- `ctx.params`/`ctx.calib` sind im Typ **optional** (ältere Test-Attrappen bauen `ExerciseContext` ohne sie); der Runner setzt sie immer. In Übungen immer `paramsOf(ctx, PARAMS)` und `calibOf(ctx)` nutzen.

## 5. Mapping der 14 Labor-Übungen

Titel der Labor-Übungen bleiben (die Marke „Labor“ unterscheidet sie von ähnlichen bestehenden, z. B. „Tasten-Wahl“, „Doppelt gefordert“). Alle: `tags: ['labor']`, `showsLevel: false`, `level: 1`. Farbe nach Kategorie (Varianten erlaubt): reaktion `#C8641E`, bewegung `#2E6DB4`, wahrnehmung `#8C6D4A`, konzentration `#7A5195`, gedaechtnis `#2F8F83`.

| Labor-ID | neue ID | Kategorie | Titel | Einstellungen | Hauptwert (`headline[0]`, Einheit, `better`) | Hinweise zum Portieren |
|---|---|---|---|---|---|---|
| `spots` | `labor-spot-touch` | reaktion | Spot-Touch | 8 | `hits` (count, higher) | **fertig (Referenz)** |
| `ordering` | `labor-ziele-ordnen` | konzentration | Bewegte Ziele ordnen | 8 | `total` (Gesamtzeit s → ms, `time`, lower) | bewegte Ziele (Geradeaus mit Abprall, Kreis, Ellipse), `dt`-Bewegung; Wortliste `_shared/labor-woerter.ts`; Zeitlimit-Option |
| `choice` | `labor-wahlreaktion` | reaktion | Wahlreaktion | 8 | `accuracy` (percent, higher) | Antwortknöpfe ≥ 56 px, Farben nie allein (Form/Beschriftung zusätzlich); zufällige Wartezeit nur über `ctx.rng`; Zu-früh-Zählung |
| `sprint` | `labor-start-ziel` | reaktion | Start-Ziel-Reaktion | 7 | `rt_mean` (Reaktionszeit Loslassen, `ms`, lower) | Startfläche **halten** und loslassen (`pointerDown`/`pointerUp`/`pointerMove`), Reaktions- und Bewegungszeit getrennt; Ziel-Abstand/-Größe in cm, an Bühne klemmen; Autoplay mit Geisterhand (halten, loslassen, tippen) |
| `follow` | `labor-ziel-verfolgen` | bewegung | Ziel verfolgen | 6 | `on_pct` (percent, higher) | Finger auf bewegtem Ziel (`pointerMove`); Bahn-Geschwindigkeit in cm/s über `dt`; Finger-Versatz beachten (Finger verdeckt Ziel); Muster `ruhige-hand`, `spur-folgen`, `_shared/folgen-bahn.ts` |
| `saccade` | `labor-takt-sakkaden` | bewegung | Takt-Sakkaden | 8 | `beats` ist **keine Leistung** (steht durch Dauer × Takt fest) → bei `touch=yes` `accuracy` (percent, higher), sonst `beats` (count) **und Abweichung in der Meldung begründen** | Metronom über `ctx.sfx.beat?.()` (nur Ton, Takt ≤ 3 Hz Lichtwechsel beachten: bei hohen bpm Hinweis); Takt-Genauigkeit ist bildratengebunden (README „Bekannte Grenzen“) ehrlich im Text; „Blick wird nicht gemessen“ |
| `chart` | `labor-buchstabentafel` | bewegung | Buchstabentafel | 10 | `total` (Gesamtzeit, `time`, lower) | Tafel aus Zeichengruppen, `groupSize`/Abstände in cm → Tafel muss in die Bühne passen (verkleinern, Hinweis), Crowding-Abstand; Lesen wird nur über Tippen/Takt geprüft (laut Lesen nicht messbar → ehrlich sagen); Vorbild `vier-ziele-wechsel`, `_shared/zeichenaufgabe.ts` |
| `flash` | `labor-blitz-erkennung` | wahrnehmung | Blitz-Erkennung | 7 | `accuracy` (percent, higher) | Anzeigedauer in ms (frame-gebunden, ≥ 1 Bild), Maske; adaptive Schwelle mit `_shared/labor-adaptive.ts`; Eingabe als Zeichenfeld/Tasten; **Flackern:** Warnhinweis (`warning: 'flicker'` prüfen) |
| `periphery` | `labor-peripheres-erkennen` | wahrnehmung | Peripheres Erkennen | 7 | `accuracy` (percent, higher) | Exzentrizität in **Grad** → `calib.degToCm` → Pixel; bei kleinen Bühnen begrenzen und im Ergebnis den **tatsächlichen** Abstand (`ecc`) ausweisen; Staircase aus `_shared/labor-adaptive.ts`; „Blick bleibt in der Mitte“ nicht messbar, ehrlich sagen |
| `dual` | `labor-doppelaufgabe` | konzentration | Doppelaufgabe | 9 | `c_hits` (count, higher) | Mitte (Zielzahl) + Rand (Punkte) gleichzeitig; Einzelmodi als Vergleichsbasis; Rand-Teil kann Spot-Touch-Logik nutzen (`labor-spot-touch/logic.ts` `SpotSession` importieren statt kopieren, Parameter-Mapping nötig) |
| `sequence` | `labor-sequenz-gedaechtnis` | gedaechtnis | Sequenz-Gedächtnis | 10 | `span` (count, higher) | Aufleuchtende Folge, Anzeige nicht schneller als 3 Wechsel/s; Raster passt in die Bühne; Vorbild `leuchtfolge`, `rastermuster`, `leuchtpfad` |
| `wordbuild` | `labor-woerter-bauen` | konzentration | Wörter bauen | 4 | `solved` ist durch `words` festgelegt → **besser `t_mean` (Zeit pro Wort, `ms`, lower)** als Hauptwert, Abweichung begründen | Wortliste `_shared/labor-woerter.ts`; Kacheln in cm → Bühne; Anagramm-Mehrdeutigkeit (`anagrammeVon`) beim Prüfen |
| `findchars` | `labor-zeichen-finden` | wahrnehmung | Zeichen finden | 6 | `accuracy` (percent, higher) | Raster ähnlicher Zeichen, `cellCm` passt sich der Bühne an (Mindestgröße der Zelle ≥ 24 px Trefferradius); Vorbild `zahl-buchstabe-wirbel` |
| `rotation` | `labor-mentale-rotation` | wahrnehmung | Mentale Rotation | 5 | `accuracy` (percent, higher) | Figuren aus Quadraten, Drehung/Spiegelung, `slope` (Anstieg je 90°) per Regression aus richtigen Antworten – bei < 3 Winkelstufen weglassen statt `NaN`; Antwortknöpfe „gleich“/„gespiegelt“ ≥ 56 px, Form nicht nur Farbe |

Bei der Wahl des Hauptwerts gilt die Vorgabe „`headline[0]` des Prototyps“. Bei `saccade` und `wordbuild` ist das keine Leistung (feststehende Zahl) – dort bitte den vorgeschlagenen Wert nehmen und die Abweichung in der Meldung nennen.

## 6. `science.ts`: Quellen prüfen (Pflicht)

Die Literaturangaben des Prototyps stammen laut dessen README **aus dem Gedächtnis**. Für jede Quelle einzeln:

1. **Crossref:** `curl -s "https://api.crossref.org/works?query.bibliographic=<Autor+Jahr+Titel>&rows=3"` bzw. `https://api.crossref.org/works/<doi>` – Autoren, Jahr, Titel, Zeitschrift, Band, Seiten stimmen? Dann DOI notieren.
2. **PubMed** (Abstract lesen): `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=<doi>[AID]` und `efetch … rettype=abstract&retmode=text` (höchstens 3 Anfragen je Sekunde). Ältere Arbeiten (vor ~1975) haben oft keinen Abstract: dann nur als „Metadaten bestätigt“ führen.
3. **Nur aufnehmen, was bestätigt ist** (mit `https://doi.org/…`-Link); **jede Aussage im Text muss zur Quelle passen** – „Quelle existiert“ heißt nicht „sie sagt das“. Nicht belegbare Aussagen streichen oder als „nicht belegt“ formulieren. Keine Zahlen als Normwerte.
4. 2–3 geprüfte Quellen **zum Thema ergänzen** (≥ 3 Quellen insgesamt, englische Originaltitel), `evidence` ehrlich einstufen (`'weak'` bei „für genau diese Übung keine Studie“).
5. Forschungsstand nicht übertreiben: Übertragung auf Alltag/Sport/Verkehr ist **nicht belegt**; Verbesserungen in der geübten Aufgabe sind zum Teil Gewöhnung (Guo et al., 2025); Touchscreens messen Reaktionszeiten zu lang, je nach Gerät (Pronk et al., 2020; Tablets nicht untersucht).
6. In den Kopfkommentar von `science.ts` schreiben, was geprüft wurde und was **nicht** bestätigt werden konnte; in der Meldung nennen.

**Bereits geprüft in Phase A (02.10.2026, Crossref; Titel, Zeitschrift, Band, Anfangsseite stimmen mit den Angaben des Prototyps überein).** Das bestätigt die Existenz der Arbeit, nicht den Inhalt der Prototyp-Aussage – den Inhalt bitte je Übung am Abstract/Volltext prüfen:

| Prototyp-Quelle (Übung) | DOI | Prüfstand |
|---|---|---|
| Fitts (1954), J Exp Psychol 47, 381–391 (`spots`, `sprint`) | `10.1037/h0055392` | Crossref ✓, PubMed ohne Abstract; Inhalt über MacKenzie (1992), `10.1207/s15327051hci0701_3` (Crossref ✓) |
| Hick (1952), Q J Exp Psychol 4, 11–26 (`choice`) | `10.1080/17470215208416600` | Crossref ✓ (Inhalt: Proctor & Schneider 2018, `10.1080/17470218.2017.1322622` ist im Repo schon belegt) |
| Hyman (1953), J Exp Psychol 45, 188–196 (`choice`) | `10.1037/h0056940` | Crossref ✓ |
| Pashler (1994), Psychol Bull 116, 220–244 (`dual`) | `10.1037/0033-2909.116.2.220` | Crossref ✓ |
| Sperling (1960), Psychol Monogr 74(11) (`flash`) | `10.1037/h0093759` | Crossref ✓ |
| Levitt (1971), J Acoust Soc Am 49, 467–477 (`flash`, `periphery`) | `10.1121/1.1912375` | Crossref ✓ (steht schon in den allgemeinen Quellen) |
| Ball et al. (1988), J Opt Soc Am A 5, 2210 ff. (`periphery`) | `10.1364/JOSAA.5.002210` | Crossref ✓ (Seitenende in Crossref nicht angegeben) |
| Reitan (1958), Percept Mot Skills 8, 271–276 (`ordering`) | `10.2466/pms.1958.8.3.271` | Crossref ✓ (Es gibt einen zweiten, fehlerhaften Crossref-Eintrag `10.2466/pms.8.7.271-276` – nicht verwenden). Der Trail Making Test ist ein neuropsychologisches Verfahren: die Übung **nicht** als Test/Diagnose darstellen |
| Shepard & Metzler (1971), Science 171, 701–703 (`rotation`) | `10.1126/science.171.3972.701` | Crossref ✓ |
| Milner (1971), Br Med Bull 27, 272–277 (`sequence`) | `10.1093/oxfordjournals.bmb.a070866` | Crossref ✓; ob die Aussage (Blockspanne/Corsi) wirklich dort steht, prüfen |
| Miller (1956), Psychol Rev 63, 81–97 (`sequence`) | `10.1037/h0043158` | Crossref ✓ |
| Cowan (2001), Behav Brain Sci 24, 87–114 (`sequence`) | `10.1017/S0140525X01003922` | Crossref ✓ |

`chart`, `findchars`, `follow`, `saccade`, `wordbuild` haben im Prototyp **keine** Quellen (`references: []`): Quellen selbst suchen und prüfen. Nützliche, schon im Repo geprüfte Quellen (Titel dort nachlesen, nicht neu erfinden): `docs/wissenschaft/*.md`, `docs/uebungskatalog/literatur/*.md`. **Achtung:** Beim DOI `10.3389/fphys.2025.1664572` (Guo et al., 2025) steht in `src/exercises/vier-ziele-wechsel/science.ts` ein falscher Titel; richtig (Crossref/PubMed): „Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis“.

## 7. Checkliste je Übung

- [ ] `index.ts`, `texts.ts`, `logic.ts`, `science.ts`, `tests/unit/<id>-logic.test.ts` (+ Durchlauf-Test) angelegt; ID/Kategorie/Titel wie in Abschnitt 5; `tags: ['labor']`, `usesCalibration` gesetzt, wenn cm/Grad genutzt werden
- [ ] Logik rein (kein DOM, kein `Math.random`/`Date.now`), Zeitbasis ms, `Rng` aus `src/core/rng`, Prototyp-Tests übertragen und erweitert, keine festen Zufallswerte
- [ ] `PARAMS` = Prototyp (Schlüssel, Grenzen, Schritt, Standard), `unit`, `neutral` (Ton), `summary` (2–3); Texte (`label`, `hint`, `options`, `short`) in DE/IT
- [ ] Größen über `calib.sizePx/fitCm` (nie die Bühne sprengen, auch im Hochformat 390 × 844), `resize()` geht, Intro-Film nutzt kleine Größen
- [ ] Hauptwert nach Tabelle (`primary`, `better`), `secondary` 2–4, restliche Kennzahlen in `details`; **alle** `metricKeys` in `texts.metrics` und `texts.metricHints`; kein `NaN`; `level` = 1
- [ ] Texte: du-Form, einfach, Fachwörter erklärt; `steps` 2–3 je ≤ 60 Zeichen; `tagline` ≤ 80; Bildunterschriften ≤ 42; `progression`/`cautions` vorhanden; `why` endet „… ist nicht belegt.“; keine Wirk-/Heil-/Sicherheitsversprechen, kein „Test“/„Diagnose“/„Normwert“; DE/IT gleiche Schlüssel
- [ ] Rückmeldung weich (✓/✗, Formen), Farbe nie allein, keine Blitze/Rotblitze, > 100 ms Übergänge, `reducedMotion` beachtet, Touch-Ziele ≥ 24 px Radius, Buttons ≥ 56 px, Doppeltipps robust
- [ ] Intro-Film 8–14 s endet mit `ctx.finish`; Autoplay im Spielmodus endet sauber; `?quick=1` ≈ 8 s
- [ ] `science.ts`: ≥ 3 Quellen, jede einzeln per Crossref/PubMed geprüft, DOI-Links; nicht Bestätigtes gestrichen; `evidence` ehrlich; Prüfstand im Kopfkommentar
- [ ] Registriert in `registry.ts` und `src/content/science.ts`
- [ ] `npx tsc --noEmit` ohne Fehler, `npx vitest run` grün (alle bestehenden Tests unverändert)
- [ ] Browser (Playwright): `npx vite build --outDir /tmp/dist-<x>`, `npx vite preview --outDir /tmp/dist-<x> --port <p>`, `ONLY=<id> node tests/e2e/smoke.mjs http://localhost:<p>/` (3 Viewports: 1180 × 820, 820 × 1180, 390 × 844); Intro mit Einstellungen (zu/auf, DE/IT), Lauf bis Ergebnis, Ergebnisseite mit „Was bedeuten die Werte?“, zweiter Lauf mit geänderter Einstellung zeigt „kein Vergleich“
- [ ] Keine Wegwerfdateien im Repository; `node_modules` nur als Symlink (nicht committen)

## 8. Bekannte Grenzen (ehrlich im Text und in der Meldung nennen)

- Blickrichtung, Aussprache und „im Takt gelesen“ kann die App nicht messen; Kontrolle liegt bei der Person.
- Anzeigedauern sind an die Bildwiederholrate gebunden (60 Hz ≈ 17 ms); Reaktionszeiten enthalten die Verzögerung von Bildschirm und Touch-Sensor und sind nur auf demselben Gerät vergleichbar.
- Die Kalibrierung ist eine Eingabe der Person (Bankkartenvergleich), keine Messung; falsche Kalibrierung verfälscht Größen und Winkel, nicht Zeiten.
- Keine Normwerte, keine medizinische Aussage, kein Medizinprodukt.
