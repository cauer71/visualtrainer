# VR-Labor: Kugel-Detektiv 3D

Eigener Testbereich unter **`/vr/`** (Datei `vr/index.html`, Code in `src/vr/`). Er ist von der Haupt-App getrennt:
`three.js` (≈ 135 kB gzip) wird nur dort geladen. Aus dem Optiker-Bereich gibt es eine Karte „VR-Labor (Versuch)“.

## Warum diese Übung?

Von den 81 Übungen nutzt keine echte Tiefe (im Katalog steht `stereosehen: 0`). **Mehrfach-Objektverfolgung (MOT)
in 3D** ist die Aufgabe, bei der Tiefe inhaltlich zählt: Kugeln bewegen sich nah und fern, verdecken einander und
kreuzen sich in der Tiefe. Quellen siehe Katalog-Eintrag 106 (Pylyshyn & Storm 1988; Faubert 2013; Legault et al. 2013).
Ein Nutzen außerhalb der Aufgabe ist **nicht belegt**; die Seite sagt das auch.

## Ablauf

1. 8 Kugeln in einem Würfel (1,6 m Kante, 2,4 m vor dem Kopf). 4 sind 2,2 s lang orange **und** mit Ring markiert (nie nur Farbe).
2. 0,6 s sanfte Überblendung, danach sehen alle gleich aus und bewegen sich 7 s (konstantes Tempo, weiche Wandabpraller,
   Kugeln stoßen einander ab, leichte Richtungsdrift).
3. Alle stehen still: mit dem Controller auf 4 Kugeln zeigen, Abzug drücken (Häkchen/Kreuz/Ring in der Rückmeldung).
4. Treppe: 2 × alle richtig → schneller, 1 × nicht alle richtig → langsamer (Stufen 1–20, 0,15 … 1,3 m/s).
   Sitzung = 10 Durchgänge (≈ 4 min). Ergebnis und „höchste Stufe“ liegen nur im Browser (`localStorage`).
5. Option **„Nur Stereo-Tiefe“**: die scheinbare Größe aller Kugeln bleibt konstant (Größe ∝ Entfernung zum Kopf);
   die Entfernung ist dann nur noch an Stereo, Verdeckung und Bewegung ablesbar. Nur in der Brille wirksam.

## Brillen und Browser

- **Oculus/Meta Quest (auch Quest 1):** Meta Quest Browser → `https://visual.auer.page/vr/` → „In VR starten“.
  Controller-Strahl + Abzug (Handtracking-Pinch sollte ebenfalls als „select“ ankommen – ungetestet).
- **Rift CV1:** WebXR-fähiger Desktop-Browser mit Oculus/OpenXR-Runtime – ungetestet.
- **Ohne Brille:** „Vorschau am Bildschirm“ (Mono, Mausparallaxe, Klick wählt).
- Parameter: `?lang=it`, nur für Tests `?test=1` (Debug-Objekt `window.__vr`) und `?fast=N` (Zeitraffer bis 10).

## Komfort und Sicherheit

Keine künstliche Kamerabewegung, kein Blinken, weiche Bewegungen, Start zentriert auf Kopfposition/Blickrichtung
(„Neu ausrichten“ im Menü), Pause wenn der System-Dialog der Brille die Sitzung verdeckt. Hinweise (Oculus Quest 1: Mindestalter 13 Jahre laut
Hersteller, Abbruch bei Beschwerden, Vorsicht bei Schielen/Amblyopie/Epilepsie/Migräne/Gleichgewicht) stehen auf der Seite.
Keine Test-, Diagnose-, Norm- oder Wirkversprechen.

## Technik

- `src/vr/logic.ts` – Spielphysik, Treppe, Auswertung (rein, getestet: `tests/unit/vr-logic.test.ts`).
- `src/vr/game.ts` – three.js-Szene, Zustandsautomat, Controller-/Mauseingabe, Bedienflächen in der Szene.
- `src/vr/panel.ts` – Canvas-Textur-Flächen mit Knöpfen (Strahl-Treffer über UV).
- Leicht gehalten für die Quest 1 (Snapdragon 835): 8 Kugeln (≈ 900 Dreiecke je Kugel bei 26×18 Segmenten), keine Schatten,
  Framebuffer-Skalierung 1,0.

## Tests

- `npm test` – Logik.
- `node tests/e2e/vr-preview.mjs` – flache Vorschau, kompletter Durchlauf mit echten Klicks (Vorschau-Server auf Port 4173).
- `node tests/e2e/vr-xr.mjs` – WebXR mit emulierter Brille ([IWER](https://github.com/meta-quest/immersive-web-emulation-runtime),
  Quest-2-Profil): Sitzung, zwei Augen (≈ 63 mm), Controller-Zeigen und Abzug.

## Offen

Echter Test auf der Brille (Tempostufen, Würfelgröße, Abstand, Lesbarkeit der Bedienfläche auf der Quest 1, Handtracking),
Kalibrierung mit Probanden, Eintrag in den Übungskatalog (Nummer 9xx) mit Anforderungsprofil `stereosehen`.
