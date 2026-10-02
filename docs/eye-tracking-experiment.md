# Experiment: Blickschätzung über die Frontkamera (`/eye/`)

Eigener Versuchsbereich unter **`/eye/`**, genau wie das VR-Labor unter `/vr/` von der Haupt-App getrennt und **ganz entfernbar**
(siehe „So entfernst du das Experiment“). Er schätzt mit der **Frontkamera des Tablets** grob, in **welchem Viertel des Bildschirms**
jemand hinschaut. Daraus soll später eine Variante der Übung „4-Ziele-Wechsel“ (`vier-ziele-wechsel`) mit zusätzlichen Zeitmarken je
Durchgang werden.

## Phasen

| Phase | Inhalt | Stand |
|---|---|---|
| **1** | Tracker-Kern (`src/eye/tracker.ts` und reine Rechenmodule), Startseite `/eye/`, **Testumgebung `/eye/labor/`**, Header, Build, Entfern-Skript, Doku, Tests | fertig |
| 2 | Spielseite `/eye/spiel/` auf Basis von Phase 1 (importiert `src/exercises/vier-ziele-wechsel/logic.ts`; Zeitmarken `t_aktiv`, `t_blick`, `t_touch`) | offen, anderer Auftrag |

Die Startseite `/eye/` verlinkt auf die Testumgebung und zeigt das Spiel nur als nicht klickbaren „Kommt in Phase 2“-Platzhalter.
Die Vite-Eingabe enthält nur die Seiten, die es gibt.

**Rechtlich/ehrlich:** Training bzw. Experiment, **kein Medizinprodukt**. Es ist **kein Eye-Tracking im Sinne einer Messung der
Augenbewegung** und keine Diagnose; es gibt **keine Normwerte** und keine Vergleiche mit anderen Personen, keine Aussage zu
Sehkraft oder Gesundheit. Ergebnisse sind nur zum Vergleich mit sich selbst gedacht. Die Seiten sagen das.

## Funktionsweise

```
Kamera (getUserMedia, user, Wunsch-Auflösung wählbar: 640×480 · 1280×720 (Standard) · 1920×1080 · bis 3840×2160, ≤ 30 fps)
  → MediaPipe Face Landmarker (478 Punkte inkl. Iris, Transformationsmatrix)         [features.ts]
  → Merkmalsvektor: Iris relativ zu Augenwinkeln (je Auge, in Augenbreiten), Lidspalte,
    Kopfdrehung/-neigung/-rollen (aus der Matrix), Gesichtslage, Augenabstand-Skala
  → Kalibrierung: 9 Punkte, je 1,2 s (erste 0,4 s verworfen, Median je Punkt)        [calibration.ts]
  → Ridge-Regression (Modellwahl per Leave-one-out) → Bildschirmkoordinaten           [ridge.ts]
  → One-Euro-Filter (einstellbare Glättung)                                           [filters.ts]
  → Viertel + Dwell (≥ 150 ms und ≥ 4 Bilder im Zielviertel = „Blick angekommen“)     [quadrants.ts]
```

* **Merkmale:** Für jedes Auge wird die Iris in einem Augen-Koordinatensystem (Achse zwischen den Augenwinkeln, „oben“ senkrecht
  dazu) in Einheiten der Augenbreite ausgedrückt; Mittel beider Augen = `hAvg`, `vAvg`. Dazu `openAvg` (Lidspalte/Breite),
  `yaw`, `pitch`, `roll` (aus der 4×4-Matrix; spalten- oder zeilenweise Ablage wird erkannt), `faceX`, `faceY`, `scale`.
  Die Rechnung arbeitet in Bildpixeln (unabhängig vom Seitenverhältnis). Lidschlag (beide Augen < 0,12 Lidspalte/Breite) wird
  ausgelassen, ohne das Gesicht als verloren zu melden.
* **Abstand (grob):** aus dem Irisdurchmesser (≈ 11,7 mm) und einem *angenommenen* Sichtfeld der Kamera (65°). Reine Orientierung,
  ohne Zusicherung; der Export enthält zusätzlich den Abstand aus der Matrix zum Vergleich.
* **Kalibrierung:** 3×3-Raster inkl. der vier Ecken (Rand 8 %), Schlangenreihenfolge. Je Punkt 0,4 s verwerfen, 0,8 s sammeln,
  Median je Merkmal. Mindestens 6 gültige Punkte, mindestens 5 Bilder je Punkt, sonst Fehlermeldung. Wird über alle Punkte
  praktisch keine Augenbewegung gefunden (Spannweite von `hAvg` und `vAvg` < 0,02), lautet die Meldung „keine Augenbewegung erkannt“.
* **Modell:** sechs Kandidaten von einfach (nur Iris, linear) bis komplexer (mit Lidspalte, Kopfhaltung, Gesichtslage; quadratisch),
  je vier Stärken λ. Gewählt wird per **Leave-one-out** (geschlossene Form über die Hat-Matrix); bei Gleichstand (innerhalb 5 %)
  das einfachere Modell. Mit nur neun Punkten sind quadratische Modelle selten im Vorteil; das ist gewollt.
  Der Leave-one-out-Fehler wird als **Selbstprüfung** angezeigt (pessimistisch, weil Eckpunkte außerhalb des Rests liegen).
* **Glättung:** One-Euro-Filter (Casiez et al. 2012). Der Regler 0…1 verändert Grenzfrequenz in Ruhe (8 Hz → 0,4 Hz) **und** die
  Geschwindigkeitsanpassung (beta 3 → 0), damit man Ruhe und Verzögerung sichtbar gegeneinander abwägen kann.
* **Gesichtsverlust:** nach 300 ms ohne Gesicht Status `no-face` (Hinweisband, Tests warten); der Filter startet nach 600 ms Pause
  neu, damit der Punkt nicht aus der alten Lage „nachzieht“.
* **Kalibrierung veraltet:** Bei Drehung (Quer/Hoch) oder mehr als 12 % anderer Fenstergröße gilt sie als veraltet; Messknöpfe sind
  gesperrt und ein Hinweisband verlangt neues Kalibrieren. Die Zuordnung gilt für das *Fenster* der Seite, nicht für den ganzen
  Bildschirm.

## Datenschutz

* **Das Kamerabild bleibt im Gerät.** Es wird nichts hochgeladen, gespeichert oder gesendet. Das Bild wird nur in der Live-Ansicht
  gezeigt; die Helligkeitsprüfung liest ein 160-px-Bild im Arbeitsspeicher.
* **Einwilligung vor dem Kamerazugriff:** Der Start-Knopf ist gesperrt, bis das Häkchen mit Zweck und „Bild bleibt im Gerät“ gesetzt
  ist. Vorher werden weder Modell noch WASM geladen (im E2E-Test geprüft).
* Modell und WASM werden **von der Seite selbst** ausgeliefert (`/eye-models/`), kein CDN, kein Drittserver.
* **MediaPipe-Telemetrie:** Die Bibliothek `@mediapipe/tasks-vision` versucht von sich aus, anonyme Nutzungsstatistik (Aufgabe,
  Betriebssystem-Art, Version, Laufzeiten) an `https://odml.pa.googleapis.com/v1/log` zu schicken (Hinweis dazu in der
  Paketbeschreibung: <https://goo.gle/mediapipe-privacy>). Das wird **doppelt verhindert**: (1) die CSP `connect-src 'self' blob: data:`
  blockt jede Fremdverbindung, (2) ein kleiner **Netzwächter** (`src/eye/netguard.ts`) beantwortet Fremd-Anfragen von `fetch` lokal
  mit 204, bevor sie das Gerät verlassen (dadurch auch keine Konsolenfehler). Der E2E-Test prüft „keine CSP-Verletzung“.
* **„Kamera beenden“** stoppt alle Spuren des Videostroms (Kamera-Anzeige geht aus), schließt das Modell und löscht die Zeitgeber.
* Speicher: Einstellungen (Abstand, Zoll, Glättung, Auswertungsart, Güte der letzten Kalibrierung) unter `localStorage`
  `blickfit.eye:v1`; die Kalibrierung selbst nur im Arbeitsspeicher oder – nur auf Wunsch – in `sessionStorage`
  (`blickfit.eye:v1:calibration`, endet mit dem Tab). Die Haupt-App-Historie (`saveResult`) wird nie berührt.
* Der Export („Messwerte kopieren“) schreibt nur in die Zwischenablage; es wird nichts gesendet.

## Genauigkeitsgrenzen

Webcam-Blickschätzung ist **grob**. Typische Größenordnungen aus der Literatur: mehrere Grad Abweichung, deutlich schlechter als
Infrarot-Eyetracker, abhängig von Licht, Abstand, Kopfbewegung, Brille und Kalibrierung (Papoutsaki et al. 2016; Kar & Corcoran 2017;
Semmelmann & Weigelt 2018). Selbst bei dedizierten Geräten hängt die Datenqualität von Person und Versuchsaufbau ab (Holmqvist et al.
2012; Blignaut & Wium 2014; Feit et al. 2017). Deshalb:

* Die Auswertung bleibt auf **Viertel** beschränkt; **keine Pixelgenauigkeit** wird versprochen.
* **Zeitauflösung:** Kamera ≈ 30 Bilder/s ⇒ ≈ 33 ms Bildabstand, dazu Verarbeitungs- und Glättungsverzögerung. Es wird **keine
  „Sakkadenlatenz“** angegeben; „Blick angekommen nach … ms“ enthält Reaktionszeit der Person, Kamera, Auswertung und Glättung.
* Ortsfehler und Zeitfehler stehen im Ergebnis (Bereiche 4 und 7).

### Literatur (Angaben und DOIs geprüft)

* Papoutsaki, A., Sangkloy, P., Laskey, J., Daskalova, N., Huang, J., & Hays, J. (2016). *WebGazer: Scalable Webcam Eye Tracking Using
  User Interactions.* IJCAI 2016. <https://www.ijcai.org/Proceedings/16/Papers/540.pdf>
* Kar, A., & Corcoran, P. (2017). A Review and Analysis of Eye-Gaze Estimation Systems, Algorithms and Performance Evaluation Methods
  in Consumer Platforms. *IEEE Access, 5*, 16495–16519. <https://doi.org/10.1109/ACCESS.2017.2735633>
* Semmelmann, K., & Weigelt, S. (2018). Online webcam-based eye tracking in cognitive science: A first look. *Behavior Research
  Methods, 50*, 451–465. <https://doi.org/10.3758/s13428-017-0913-7>
* Holmqvist, K., Nyström, M., & Mulvey, F. (2012). Eye tracker data quality: what it is and how to measure it. *Proc. ETRA ’12*.
  <https://doi.org/10.1145/2168556.2168563>
* Blignaut, P., & Wium, D. (2014). Eye-tracking data quality as affected by ethnicity and experimental design. *Behavior Research
  Methods, 46*, 67–80. <https://doi.org/10.3758/s13428-013-0343-0>
* Feit, A. M., Williams, S., Toledo, A., Paradiso, A., Kulkarni, H., Kane, S., & Morris, M. R. (2017). Toward Everyday Gaze Input:
  Accuracy and Precision of Eye Tracking and Implications for Design. *Proc. CHI ’17*. <https://doi.org/10.1145/3025453.3025599>
* Casiez, G., Roussel, N., & Vogel, D. (2012). 1 € Filter: A Simple Speed-based Low-pass Filter for Noisy Input in Interactive Systems.
  *Proc. CHI ’12*. <https://doi.org/10.1145/2207676.2208639>
* Ablavatski, A., Vakunov, A., Grishchenko, I., Raveendran, K., & Zhdanovich, M. (2020). Real-time Pupil Tracking from Monocular Video
  for Digital Puppetry. arXiv:2006.11341 (Iris-Landmarks des Face Mesh).
* Kartynnik, Y., Ablavatski, A., Grishchenko, I., & Grundmann, M. (2019). Real-time Facial Surface Geometry from Monocular Video on
  Mobile GPUs. arXiv:1907.06724 (Face Mesh).

## Die Testumgebung `/eye/labor/`

Eine Seite mit neun nummerierten Bereichen (Querformat zwei Spalten, Hochformat eine), bedienbar am Tablet. Messungen laufen auf
einer **Vollfenster-Bühne**; Koordinaten sind Fensterkoordinaten. Überall: „Das prüft die Technik, nicht dich.“

1. **Einwilligung & Start** – Zweck, „Kamerabild bleibt im Gerät“, Hinweise zur Aufstellung (Ständer, mittig, 40–50 cm, Licht von
   vorn, Brille, Kopf ruhig), „Kamera freigeben“, Fortschrittsanzeige (Kamera → Modell mit Prozent → Auswertung). Fehler (verweigert,
   keine Kamera, belegt, unsicherer Kontext, kein WebAssembly/SIMD, Modell nicht ladbar) werden erklärt, mit Rückweg zu den Übungen ohne Kamera.
2. **Live-Ansicht** – gespiegeltes Kamerabild mit Gesichtsrahmen, Augen- und Iris-Punkten; Gesicht ja/nein, Bildrate der Kamera,
   Bildrate der Auswertung, Verarbeitungszeit je Bild (Mittel/Max), Kopfdrehung/-neigung (als Betrag), Abstand (grob), Auflösung,
   Auswertung über GPU/CPU; Hinweise: zu dunkel, überstrahlt, „Brille/Spiegelung?“ nur als vorsichtiger Tipp, starke Kopfdrehung.
3. **Kalibrierung** – 9 Punkte mit Fortschritt, wiederholbar, abbrechbar (Esc/Knopf), nur im Speicher; optional „für diese Sitzung
   merken“. Ergebnis: Leave-one-out-Selbstprüfung, Modell, verwendete Punkte.
4. **Genauigkeitsprüfung** – 9 Kontrollpunkte (versetzt zu den Kalibrierpunkten, 3×3-Raster); mittlere/mediane Abweichung und
   95. Perzentil in **px und Grad**; Abstand 30–70 cm (Standard 45), Bildschirmdiagonale optional in Zoll. **Annahmen sind gekennzeichnet:**
   Ohne Eingabe wird die Diagonale nach Fenstergröße geschätzt (Tablet ≈ 10,5″, Handy ≈ 6″) – bewusst *nicht* aus
   `devicePixelRatio`, weil CSS-Pixel auf Tablets keine feste Größe haben. Dazu Einschätzung gut/ausreichend/zu ungenau (Faustwert),
   Heatmap 3×3 der Abweichung (mit Zahlen), Versatz und Streuung, und der **Ruhetest** (Blick 5 s auf einen Punkt: Standardabweichung in px und Grad).
5. **Viertel-Test** – Zielviereck in den vier Ecken, 20 Aufforderungen (je Ecke 5, gemischt, nie dieselbe Ecke zweimal hintereinander),
   die Ecke leuchtet weich auf (kein Blinken); live „erkannt: oben links“; Treffer = ≥ 150 ms im Viertel (Aufforderung läuft 3 s;
   bei Gesichtsverlust wartet sie); Trefferquote und mittlere Ankunftszeit je Ecke, Verwechslungsmatrix.
6. **Blickpunkt-Ansicht** – schaltbarer Punkt mit Spur der letzten 2 s auf dunklem Grund, Regler für die Glättung.
7. **Zeitverhalten** – Wechsel zwischen zwei Ecken (waagerecht, diagonal, senkrecht), 12 Wechsel; gezeigt wird die **Übergangszeit der
   Schätzung (10 % → 90 % der Strecke)** als Eigenschaft der Technik (Kamera + Glättung), plus Zeit bis „im Viertel angekommen“ (enthält
   Reaktionszeit, deshalb getrennt und so beschriftet).
8. **Export** – „Messwerte kopieren“: JSON in die Zwischenablage (Schema `blickfit-eye-labor/1`): Gerät (User-Agent, Fenster,
   Bildschirm, Pixeldichte), Kamera (Auflösung, fps-Einstellung, Auswertung GPU/CPU), Annahmen, Verarbeitungszeiten, Kalibrierung,
   Genauigkeit, Ruhetest, Viertel-Test, Zeittest. Es wird nichts gesendet.
9. **Kamera** – Kamera wechseln (falls mehrere; Kalibrierung wird verworfen), Auswertung automatisch/CPU/GPU, **Kamera beenden**.

Parameter: `?lang=it`; nur für Tests `?test=1` (Test-Hook `window.__eye`, siehe unten) und `?delegate=cpu|gpu`.

### Wie testet man ein Tablet?

1. Tablet auf einen Ständer, mittig, 40–50 cm, Licht von vorn, Seite über **https** öffnen (`https://visual.auer.page/eye/labor/`).
2. Bereich 1: Haken setzen, „Kamera freigeben“. Bereich 2: Gesicht ja? Bildrate der Auswertung ≥ 15 fps? Keine Helligkeitswarnung?
3. Bereich 3 kalibrieren (Kopf ruhig, nur die Augen bewegen). Bereich 4: Genauigkeit messen; **Zoll-Wert des Geräts eintragen** und den
   tatsächlichen Abstand einstellen, sonst sind die Grad-Werte nur Annahmen.
4. Bereich 5 (Viertel-Test) und 7 (Zeitverhalten) laufen lassen, Bereich 6 zum Anschauen.
5. Bereich 8: „Messwerte kopieren“ und je Tablet in eine Datei einfügen. Mit anderer Brille/Licht/Abstand wiederholen. Auch „nur CPU“
   gegen „GPU“ vergleichen (Bereich 9).

### Welche Werte sind gut genug für den 4-Ziele-Wechsel?

**Nur ein Vorschlag (Faustwert), kein Normwert.** Bezugslänge ist der Abstand vom Viertelmittelpunkt zur Viertelgrenze auf der kürzeren
Fensterseite, `d = min(Breite, Höhe) / 4` (Tablet quer 1180×820: d ≈ 205 px).

| Einschätzung | mittlere Abweichung | 95. Perzentil |
|---|---|---|
| gut | ≤ 0,5 · d | ≤ 1,0 · d |
| ausreichend | ≤ 0,8 · d | ≤ 1,6 · d |
| zu ungenau | darüber | darüber |

Weitere Anhaltspunkte (ebenfalls Faustwerte): Bildrate der Auswertung ≥ 15 fps, Ruhe-Streuung deutlich kleiner als d, Viertel-Trefferquote
≥ 90 % je Ecke (bei Ecken-Zielen; Ziele nahe der Viertelgrenzen wären kritischer), Übergangszeit der Schätzung ≲ 200 ms. Wo die Schwellen
tatsächlich liegen müssen, zeigt erst die Erprobung auf echten Tablets.

## Tracker-API (`src/eye/tracker.ts`)

Unabhängig von der Seite (kein HTML, kein Spiel); die Testumgebung und später das Spiel sind nur Nutzerinnen.

```ts
const tracker = new EyeTracker({ modelBase: '../../eye-models/', viewport?, delegate?: 'auto'|'GPU'|'CPU', smoothing?: 0..1 });
await tracker.start({ deviceId?, synthetic?, onProgress? });   // Kamera + Modell; wirft TrackerError (code)
tracker.stop();                                                 // Videostrom stoppen, Modell freigeben
tracker.status      // 'idle'|'starting'|'loading-model'|'running'|'no-face'|'error'|'stopped'
tracker.onStatus(cb) / onGaze(cb) / onFrame(cb)                 // geben die Abmeldefunktion zurück
const out = await tracker.calibrate({ points?, viewport?, settleMs?, collectMs?, onPoint?, signal? });  // 9 Punkte
const data = await tracker.collectGaze(points, { settleMs?, collectMs?, onPoint?, signal? });           // Messung an Orten
tracker.calibration / setCalibration(model|null) / isCalibrated / isStale()
tracker.setSmoothing(0..1);  tracker.stats();  tracker.listCameras();  tracker.video;
```

* `GazeSample`: `{ t, x, y, nx, ny, rawNx, rawNy, quadrant }` – `t` = Zeit des Kamerabilds (`performance.now()`-Zeitbasis, nach Möglichkeit
  `captureTime` des Bildes), `x/y` geglättet in Fensterpixeln, `quadrant` ∈ `tl|tr|bl|br`.
* Die Seite zeichnet die Kalibrierpunkte selbst (`onPoint`); der Tracker misst und rechnet. Ohne Kalibrierung gibt es keine `GazeSample`.
* Reine Module (ohne DOM, per Unit-Test geprüft): `features.ts`, `ridge.ts`, `calibration.ts`, `filters.ts`, `quadrants.ts`
  (Viertel, `DwellDetector`), `accuracy.ts` (Perzentile, Grad, Heatmap, Jitter, Einschätzung), `quarterTest.ts` (Reihenfolge, Zähler,
  Übergangszeit), `luma.ts`, `meters.ts`, `exportData.ts`, `synthetic.ts`, `netguard.ts`.
* **Für Phase 2:** Spiel importiert `EyeTracker`, `DwellDetector`, `quadrantOf`, `cornerTarget`; Modellpfad relativ zur Spielseite
  (`../../eye-models/`); Ergebnisse nicht in der Haupt-App-Historie speichern.

## Aufbau (alles Experimentelle, nur hier)

| Ort | Inhalt |
|---|---|
| `eye/index.html`, `eye/labor/index.html` | Einstiegsseiten |
| `src/eye/` | Code, Texte (DE/IT), CSS |
| `public/eye-models/` | `face_landmarker.task` (3,76 MB, float16; Quelle: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`), `vision_wasm_internal.{js,wasm}` (aus `@mediapipe/tasks-vision` 1.0.1, 0,32 + 11,8 MB; nur die SIMD-Variante) |
| `tests/unit/eye-*.test.ts`, `tests/e2e/eye-*.mjs` | Tests |
| `docs/eye-tracking-experiment.md`, `scripts/remove-eye-experiment.sh` | diese Datei, Entfern-Skript |
| `vite.config.ts` | **eine** Zeile (zwei Einträge in `rollupOptions.input`) |
| `public/_headers` | **ein** Block |
| `src/ui/pages/OpticianPage.tsx`, `src/i18n/optiker.ts` | eine Karte, je ein Textpaar (DE/IT) |
| `README.md` | **eine** Zeile |
| `package.json` | Abhängigkeit `@mediapipe/tasks-vision` und der Kommentar-Schlüssel `"//"` |

Alle diese Stellen tragen den Kommentar `EYE-EXPERIMENT` (`grep -rn "EYE-EXPERIMENT" . --exclude-dir=node_modules --exclude-dir=dist` findet sie).
Die Haupt-App und die Übung `vier-ziele-wechsel` hängen **nicht** von `src/eye/` ab (Abhängigkeit nur andersherum).

Nur die SIMD-Variante des WASM wird ausgeliefert (spart ≈ 11 MB). Browser ohne WebAssembly-SIMD (Safari < 16.4, Chrome < 91) bekommen
eine verständliche Fehlermeldung (`no-simd`). Zum Aktualisieren: `@mediapipe/tasks-vision` erneuern und die beiden Dateien aus
`node_modules/@mediapipe/tasks-vision/wasm/` nach `public/eye-models/` kopieren (ein Unit-Test prüft, dass beide identisch sind).

### Größen (Build)

* Haupt-Bundle: kein MediaPipe darin. Er wächst nur um die Karte im Optiker-Bereich (≈ +0,7 kB, gzip ≈ +0,2 kB: 1469,79 → 1470,48 kB).
* Eye-Seiten: Startseite ≈ 1,6 kB JS + gemeinsame Texte 27,8 kB (gzip 10,1) + CSS 8,7 kB; Testumgebung ≈ 56,7 kB JS (gzip 19,8);
  die MediaPipe-Bibliothek (`vision_bundle`) ≈ 153,8 kB (gzip 45,5) wird **erst nach der Einwilligung** beim Kamerastart nachgeladen.
  Dazu beim Kamerastart Modell 3,76 MB und WASM 11,8 MB.

## Sicherheitsheader (Cloudflare `_headers`)

Die Haupt-App sendet global `Permissions-Policy: camera=()` und eine strenge CSP (`script-src 'self'`). Die Eye-Seiten brauchen
`camera=(self)` und `script-src 'self' 'wasm-unsafe-eval'` (WebAssembly), `worker-src 'self' blob:`, `connect-src 'self' blob: data:`,
`media-src 'self' blob:`. Cloudflare **führt die Header aller passenden Regeln zusammen** (zwei CSP = beide gelten, die strengere
gewinnt, die Kamera bliebe gesperrt). Lösung: Die Regel `/eye/*` steht **nach** der globalen Regel `/*`, löst mit `! Content-Security-Policy`
und `! Permissions-Policy` die globalen Header ab und setzt eigene (Syntax laut Cloudflare-Dokumentation „Detach a header“:
<https://developers.cloudflare.com/workers/static-assets/headers/>). Ein zweiter Block `/eye-models/*` ersetzt die CSP auch dort
(falls MediaPipe das Rechenprogramm in einem Worker lädt, gilt die CSP der Skriptantwort) und setzt `Cache-Control: max-age=86400`.
Kein `'unsafe-eval'`. Die Hauptseite und `/vr/` bleiben unverändert streng.

**Geprüft** (1) gegen die echte Auslieferung mit `wrangler dev` (workerd): `/` und `/vr/` streng, `/eye/`, `/eye/labor/` mit genau einer
CSP und `camera=(self)`, `.wasm` als `application/wasm`; (2) mit dem Testserver `tests/e2e/eye-server.mjs`, der `public/_headers` nach den
Cloudflare-Regeln nachbildet (Reihenfolge, Platzhalter, Ablösen, Zusammenführen) und im E2E-Test für alle Prüfungen mit den echten
Produktionsheadern benutzt wird. Ob die Browser-Anzeige „Kamera erlauben“ auf einem echten Tablet erscheint, hängt zusätzlich von
Browser und Betriebssystem ab.

## Tests

* `npx vitest run` – Unit-Tests `tests/unit/eye-*.test.ts` (Merkmale aus synthetischen Landmarks und Matrizen, Ridge und
  Kalibrierung mit bekannter Abbildung, Rauschen, Leave-one-out gegen echtes Auslassen, One-Euro-Filter, Dwell mit Aussetzern,
  Perzentile, Grad-Umrechnung, Heatmap, Jitter, Viertel-Test-Zähler und -Reihenfolge, Übergangszeit, Helligkeit, Netzwächter,
  Export, Auslieferungsdateien).
* `node tests/e2e/eye-labor.mjs` (Playwright, Fake-Kamera `--use-fake-ui-for-media-stream --use-fake-device-for-media-stream`;
  gebaute Seite nötig, z. B. `npx vite build --outDir /tmp/dist-eye`, dann `DIST=/tmp/dist-eye node tests/e2e/eye-labor.mjs`):
  * Header-Prüfung, Seiten ohne Konsolen-/CSP-Fehler, Modell und WASM über `'self'`, Einwilligung vor Modellladen,
    Kamerafreigabe, „kein Gesicht“ (Testbild der Fake-Kamera), Fehlerfälle (abgelehnt, keine Kamera, DE und IT),
    „Kamera beenden“ stoppt den Videostrom wirklich;
  * mit **synthetischem Blick** (`?test=1`, Hook `window.__eye`): Kalibrierung, Abbruch, Genauigkeit, Heatmap, Ruhetest,
    Viertel-Test inkl. Gesichtsverlust, Blickpunkt-Ansicht und Glättungsregler, Zeittest, Export in die Zwischenablage,
    veraltete Kalibrierung bei Drehung, „für diese Sitzung merken“;
  * Screenshots in `OUT` (Tablet quer 1180×820 und hoch 820×1180 vollständig, Handy 390×844 nur Stabilitätscheck);
  * optional `EYE_FAKE_VIDEO=/pfad/gesicht.y4m`: echte Gesichtserkennung (Gesichtsrahmen, Merkmale, Abstand, Overlay) und
    „Standbild kalibrieren → keine Augenbewegung erkannt“. Das Video liegt nicht im Repo; erzeugt wurde es einmalig aus dem
    gemeinfreien NASA-Foto `astronaut` (Python-Paket scikit-image, `skimage/data/astronaut.png`), auf 640×480 skaliert und als
    `.y4m` (YUV 4:2:0, 30 Bilder, Wiederholung) geschrieben.
* **Test-Hook `?test=1`:** `window.__eye = { tracker, lab, results, truth, gone, startSynthetic(), follow({noisePx, reactionMs, biasPx}),
  faceGone(bool), busy() }`. `startSynthetic()` startet den Tracker ohne Kamera und Modell; `follow()` lässt einen künstlichen Blick
  dem aktuellen Ziel (`lab.currentTarget`) folgen (mit Reaktionsverzögerung und Rauschen). Die künstlichen Blickpunkte werden **als
  Merkmale** eingespeist (bekannte Abbildung, `synthetic.ts`), sodass Kalibrierung, Regression, Filter und Viertel-Erkennung wirklich
  durchlaufen werden.

## So entfernst du das Experiment

**Mit Skript:** `scripts/remove-eye-experiment.sh` (vorher `--dry-run` zeigt, was passieren würde; `--no-build` überspringt den Build).
Es löscht Ordner und Dateien (`eye/`, `src/eye/`, `public/eye-models/`, `tests/unit/eye-*.test.ts`, `tests/e2e/eye-*.mjs`, diese Datei –
auch Dateien späterer Phasen in `eye/` und `src/eye/`), entfernt die markierten Zeilen und Blöcke, deinstalliert
`@mediapipe/tasks-vision`, prüft, dass kein `EYE-EXPERIMENT` mehr vorkommt, führt `npm run build` aus und löscht sich selbst.

**Von Hand (Alternative):**

1. `rm -rf eye src/eye public/eye-models docs/eye-tracking-experiment.md scripts/remove-eye-experiment.sh tests/unit/eye-*.test.ts tests/e2e/eye-*.mjs`
2. `vite.config.ts`: die Zeile mit `eye: 'eye/index.html', eyeLabor: …` löschen.
3. `public/_headers`: den Block von `# EYE-EXPERIMENT begin` bis `# EYE-EXPERIMENT end` löschen.
4. `src/ui/pages/OpticianPage.tsx`: den Block `{/* EYE-EXPERIMENT begin */}` … `{/* EYE-EXPERIMENT end */}` löschen;
   `src/i18n/optiker.ts`: die vier Zeilen `shortcutEye…` (je zwei in DE und IT) löschen; `README.md`: den Absatz „Blickschätzung (Experiment)“ löschen.
5. `package.json`: den Schlüssel `"//"` löschen und `npm uninstall @mediapipe/tasks-vision` ausführen.
6. `grep -rn "EYE-EXPERIMENT" . --exclude-dir=node_modules --exclude-dir=dist` muss leer sein; dann `npx tsc --noEmit`, `npx vitest run`, `npm run build`.

Das Skript wurde im Trockenlauf in einer Kopie des Arbeitsverzeichnisses geprüft: danach grün (`tsc`, `vitest`, `npm run build`) und
`grep -rn EYE-EXPERIMENT` leer.

## Offen

* **Die Blickgenauigkeit auf einem echten Tablet mit echten Augen ist nicht geprüft.** Alle Genauigkeitswerte in den Tests stammen aus
  *synthetischen* Merkmalen (bekannte Abbildung + Rauschen); die Bildverarbeitung wurde nur mit einem Standbild (Gesichtserkennung,
  Iris-/Kopfwerte, Overlay) und einem Testbild ohne Gesicht erprobt. Ob die Merkmale (Iris relativ zu Augenwinkeln, Lidspalte, Kopfwinkel)
  bei echten Blickwechseln genügend Signal liefern und welches Modell sich durchsetzt, zeigen erst Messungen auf Tablets.
* Vorzeichen der Kopfwinkel (links/rechts, oben/unten) sind nicht an einem echten Gesicht verifiziert; die Oberfläche zeigt deshalb nur
  Beträge, der Export die Merkmale. Für die Regression ist nur Stetigkeit nötig.
* Der Abstand aus dem Irisdurchmesser beruht auf einem angenommenen Kamera-Sichtfeld (65°); Weitwinkel-Frontkameras (Center Stage u. ä.) weichen ab.
* Auf echten Tablets ungeprüft: Browser-Dialog zur Kamerafreigabe, GPU-Delegate (Safari/iPadOS), Zeit pro Bild und Bildrate der
  Auswertung (in der Test-Sandbox: CPU-Delegate ≈ 15–20 fps, deutlich langsamer als auf einem Tablet zu erwarten), Verhalten mit Brille,
  `captureTime` der Kamera-Bilder in Safari (sonst wird die Anzeigezeit benutzt), Hochformat mit Adressleiste (Fensterhöhe ändert sich → „veraltet“).
* Kalibrierung gilt für das Fenster, nicht für den Bildschirm; Wechsel der Adressleiste oder des Fensters verlangt neue Kalibrierung.
* Ältere Geräte ohne WebAssembly-SIMD: kein Rückfall auf die Nicht-SIMD-Variante (würde ≈ 11 MB mehr ausliefern).
* Phase 2 (Spielseite `/eye/spiel/`).
