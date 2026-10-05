# Blickfit – Übungen für Reaktion & Wahrnehmung

**Live:** https://visual.auer.page (Alternativ: https://blickfit.christian-auer-71.workers.dev)

Eine Web-Plattform mit kurzen visuellen Trainingsübungen, gedacht für die Homepage eines Optikers
(Name, Farben und Links in `src/config/brand.ts` einstellbar). Optimiert für Tablets mit Touchscreen,
funktioniert aber auch am Handy und am Computer. Sprachen: **Deutsch** und **Italienisch**.

- keine Anmeldung, keine Cookies, kein Tracking – Ergebnisse bleiben nur auf dem Gerät (localStorage)
- jede Übung hat einen **Intro-Film**: Die echte Übung läuft im Demo-Modus, eine animierte Hand macht vor, was zu tun ist
- adaptive Schwierigkeit (Staircase-Verfahren), Verlauf, Bestwerte, persönliche Tipps
- **Zwei Ansichten** (Knopf in der Kopfzeile, beim ersten Öffnen Auswahl):
  **Kunde** sieht nur drei vom Optiker gewählte Übungen (Voreinstellung: Blitzreaktion, Kugel-Detektiv, Suchbild);
  **Trainer** sieht alle 114 Übungen, „Hintergrund & Studien“, den **Übungskatalog** (115 Einträge mit Anforderungsprofil, Quellen)
  und wählt im Optiker-Bereich die Kunden-Übungen. Die Wahl ist eine Ansicht, **kein Zugangsschutz** (kein Login, alles im Browser gespeichert).
- **Trainer-Regler**: Bei den Übungen mit Rot-Grün-Brille (Rot-Grün-Lesen, Fusion, Tiefe sehen) kann die Trainer-Ansicht den Versatz bzw. die Disparität
  während der Übung in kleinen Schritten verändern (schmale Leiste außerhalb des Reizfelds, jede Änderung steht mit Zeitpunkt im Ergebnis); die Benutzer-Ansicht hat sie nicht.
- **Tagestraining**: jeden Tag 5 Übungen (eine je Bereich)
- statische Seite (~130 kB gzip JS), läuft auf jedem Webspace, in Unterordnern und im iframe

## Die Übungen

| Bereich | Übung | Was geübt wird |
|---|---|---|
| Reaktion | **Blitzreaktion** | schnell auf ein Licht reagieren – in der Mitte und am Rand |
| Reaktion | **Stopp & Los** | schnell reagieren und im richtigen Moment bremsen (Go/No-Go) |
| Bewegung verfolgen | **Zielfang** | bewegte Ziele antippen (Auge-Hand-Koordination, Vorhalt) |
| Bewegung verfolgen | **Scharf in Bewegung** | Details auf bewegten Objekten erkennen |
| Bewegung verfolgen | **Kugel-Detektiv** | mehrere bewegte Objekte gleichzeitig verfolgen |
| Wahrnehmen & Erfassen | **Punktlandung** | den Moment treffen, in dem etwas ankommt |
| Wahrnehmen & Erfassen | **Suchbild** | Gesuchtes zwischen ähnlichen Zeichen finden |
| Wahrnehmen & Erfassen | **Blitzblick** | Mitte und Rand auf einen Blick erfassen |
| Wahrnehmen & Erfassen | **Aus dem Takt** | feine zeitliche Unterschiede bemerken |
| Konzentration & Denken | **Pfeil-Duell** | nur auf die Pfeilrichtung achten, Platz und Nachbarn ausblenden |
| Konzentration & Denken | **Weichensteller** | zwischen zwei Regeln hin- und herschalten |
| Konzentration & Denken | **Wachposten** | ein paar Minuten auf ein seltenes Zeichen aufpassen |
| Konzentration & Denken | **Doppelt gefordert** | zwei Aufgaben gleichzeitig (Kugel steuern + Formen beantworten) |
| Konzentration & Denken | **Zeichen-Code** | Zeichen schnell in Zahlen übersetzen (Schlüssel jedes Mal neu) |
| Konzentration & Denken | **Zahlenjagd** | Zahlen (und Buchstaben) der Reihe nach finden |
| Konzentration & Denken | **Reihen-Rätsel** | die Regel hinter einer Reihe finden – ohne Zeitdruck |
| Gedächtnis | **Leuchtfolge** | Reihenfolge leuchtender Felder merken und nachtippen |
| Gedächtnis | **Zahlenspanne** | Ziffernfolgen merken (vorwärts, später rückwärts) |
| Gedächtnis | **Rastermuster** | Muster aus leuchtenden Feldern merken |
| Gedächtnis | **Rückblick** | „Gleich wie vor N Schritten?“ (N-Back mit Formen) |
| Gedächtnis | **Wo war es?** | Symbole und ihre Orte merken |
| Gedächtnis | **Leuchtpfad** | Pfad aus leuchtenden Blöcken nachtippen |
| Bewegung verfolgen | **Liegende Acht** | Kugel auf der Bahn verfolgen und ein Zeichen erkennen |
| Bewegung verfolgen | **Wellenbahn** | Kugel auf einer Wellenbahn verfolgen |
| Bewegung verfolgen | **Zwei Ziele** | zwei Hälften im Blick behalten, Veränderung melden |
| Bewegung verfolgen | **Blicksprung-Galerie** | Ziel an wechselnden Rasterplätzen antippen |
| Bewegung verfolgen | **Fünf Türen** | Ziel in einer von fünf Türen antippen |
| Bewegung verfolgen | **Fallende Ziele** | herabfallende Ziele abfangen |
| Bewegung verfolgen | **Ziehen & Ablegen** | Ball mit dem Finger in den wandernden Ring ziehen |
| Wahrnehmen & Erfassen | **Sekundengefühl** | eine Zeitspanne ohne Uhr treffen |
| Wahrnehmen & Erfassen | **Hellste Kugel** | die hellste von mehreren grauen Kugeln finden |
| Bewegung verfolgen | **Sanfte Blickfolge** | Kugel auf einer weichen Schleifenbahn verfolgen, ein Zeichen erkennen |
| Bewegung verfolgen | **Zickzack-Bahn** | Kugel auf einer Zickzacklinie verfolgen |
| Bewegung verfolgen | **Dreiecksbahn** | Kugel auf einer Dreiecksbahn verfolgen |
| Bewegung verfolgen | **Ausweichziel** | Kugel verfolgen, die weich ausweicht |
| Bewegung verfolgen | **Sprungziel** | Kugel nach einem Ortswechsel wiederfinden |
| Bewegung verfolgen | **Landepunkt** | vorhersehen, wo ein verdeckter Ball landet |
| Bewegung verfolgen | **Ziele abräumen** | mehrere Ziele vor Ablauf der Zeit antippen |
| Bewegung verfolgen | **Pendel-Fang** | ein pendelndes Ziel im richtigen Moment antippen |
| Bewegung verfolgen | **Hinter der Deckung** | kurz auftauchende Ziele hinter Deckungen antippen |
| Bewegung verfolgen | **Schwarm-Wechsel** | wandernde Ziele nach Dringlichkeit antippen |
| Bewegung verfolgen | **Ruhige Hand** | Ball mit dem Finger durch eine schmale Bahn führen |
| Bewegung verfolgen | **Spur folgen** | einer laufenden Wellenlinie mit dem Finger folgen |
| Wahrnehmen & Erfassen | **Rand-Ping** | Mitte im Blick, Orte am Rand merken |
| Reaktion | **Tipp-Tempo** | in 20-Sekunden-Runden so oft wie möglich tippen |
| Gedächtnis | **Wortliste** | gezeigte Wörter in einer Auswahl wiederfinden |
| Konzentration & Denken | **Wortstrom** | Erkenne dein Zielwort im ruhigen Wortstrom. |
| Bewegung verfolgen | **Abprall-Fang** | Sieh voraus, wo der Punkt am Rand abprallt – und tippe dorthin. |
| Bewegung verfolgen | **Dunkelphasen** | Die Kugel blendet weich aus – rechne damit, wo sie wieder auftaucht. |
| Bewegung verfolgen | **Tempo-Wechsel** | Bleib an der Kugel dran, wenn sie Tempo und Richtung wechselt. |
| Bewegung verfolgen | **Nachzieh-Spur** | Bleib am hellen Kopf der Kugel, auch wenn sie einen Schweif zieht. |
| Bewegung verfolgen | **Höhenwechsel-Bahn** | Folge der Kugel auf ihrer Treppenbahn und erkenne ein Zeichen. |
| Bewegung verfolgen | **Richtungschaos** | Bleib an der Kugel, die mal hierhin, mal dorthin driftet. |
| Bewegung verfolgen | **Flick-Ziele** | Ein Ziel taucht auf – tippe es an, bevor es wieder weg ist. |
| Reaktion | **Sofort-Reaktion** | Die Mitte leuchtet auf – tippe, so schnell du kannst. |
| Bewegung verfolgen | **Gegenhalten** | Halte die Marke auf dem Ziel, obwohl sie nach oben gezogen wird. |
| Bewegung verfolgen | **Seitwärts folgen** | Folge mit deiner Marke dem Ziel, das hin und her ausweicht. |
| Bewegung verfolgen | **Randziel-Flick** | Von der Mitte zum Rand: tippe das Ziel, sobald es auftaucht. |
| Bewegung verfolgen | **Kurvenbahn folgen** | Folge dem Ziel auf seiner weichen Kurvenbahn – ohne Halt. |
| Bewegung verfolgen | **Mikrokorrektur** | Großes Ziel antippen, dann das kleine Nachziel genau treffen. |
| Konzentration & Denken | **Zielauswahl** | Tippe zuerst das Dringendste an – dann das Nächste. |
| Reaktion | **Winkel halten** | Ruhig in der Mitte warten – und erst tippen, wenn das Ziel am Rand auftaucht. |
| Bewegung verfolgen | **Ausweich folgen** | Bleib mit deiner Marke an einem Ziel, das scheinbar ausweicht. |
| Bewegung verfolgen | **Zickzack folgen** | Bleib mit deiner Marke an einem Ziel, das im Zickzack läuft. |
| Bewegung verfolgen | **Glatt folgen** | Begleite ein Ziel auf einer weichen, langsamen Kurvenbahn. |
| Bewegung verfolgen | **Hoch und runter** | Folge einem Ziel, das in weichen Bögen hoch und wieder herunter springt. |
| Bewegung verfolgen | **Ziele erwischen** | Mehrere Kreise sind unterwegs – tippe sie im Vorbeiflug an. |
| Reaktion | **Tasten-Wahl** | Ein Zeichen erscheint – tippe die gleiche Taste. |
| Bewegung verfolgen | **Präzisions-Flick** | Tippe das schrumpfende Ziel schnell und mitten hinein. |
| Bewegung verfolgen | **Zielkette** | Tippe die Kreise der Reihe nach an – von Ziel zu Ziel. |
| Bewegung verfolgen | **Rand im Blick** | Punkte gleiten vom Rand zur Mitte – fang sie ab, bevor sie dort sind. |
| Reaktion | **Kugeln fangen** | Kreise antippen, Quadrate durchlassen – erst schauen, dann tippen. |
| Bewegung verfolgen | **Ausweichen** | Führ die Figur sanft an langsamen Hindernissen vorbei. |
| Bewegung verfolgen | **Schrumpfende Ziele** | Mehrere Kreise werden kleiner – tippe den kleinsten zuerst. |
| Bewegung verfolgen | **In die Bahn** | Setz den Finger dorthin, wo das Ziel gleich vorbeiläuft. |
| Konzentration & Denken | **Raster-Ausweichen** | Wechsle rechtzeitig auf ein freies Feld – bevor die schraffierten belegt sind. |
| Bewegung verfolgen | **Sprossen-Leiter** | Tippe die Felder der Leiter von unten nach oben – genau im Takt. |
| Bewegung verfolgen | **Gegen den Wind** | Halte die Marke im Ring, obwohl ein unsichtbarer Wind sie schiebt. |
| Bewegung verfolgen | **Sprungweite** | Zieh den Balken genau so weit, dass die Kugel auf der Zielmarke landet. |
| Bewegung verfolgen | **Diagonal-Korridor** | Zieh die Kugel durch einen schmalen, schrägen Gang – ohne die Wand zu berühren. |
| Gedächtnis | **Muster nachzeichnen** | Merk dir einen Linienzug und zeichne ihn mit dem Finger nach. |
| Konzentration & Denken | **Richtung & Wort** | Richtungszeichen lesen und das Feld mit dem passenden Wort antippen – auch wenn die Wörter nicht an ihrer Lage stehen |
| Wahrnehmen & Erfassen | **Welche Seite?** | bei Hand, Fuß oder Unterarm in verschiedenen Ansichten und Drehungen die linke oder rechte Seite erkennen |
| Konzentration & Denken | **Zahlen-Buchstaben-Wirbel** | treibende Zahlen und Buchstaben abwechselnd der Reihe nach antippen (1 – A – 2 – B …) |
| Bewegung verfolgen | **4-Ziele-Wechsel** | vier Buchstabentafeln in den Ecken: ein Buchstabe von jeder Tafel im Wechsel antippen, Zeit von Tipp zu Tipp (Touch-Version der Sehtherapie-Übung „4 Chart Saccades“; kein Eye-Tracking) |

**Gleichgewichts-Übungen (Marke „Labor“):** `labor-richtungen`, `labor-orientierung`, `labor-balance-touch` (mit großen Bildschirmtasten für eine Hilfsperson plus Tastenkürzel), `labor-slalom` und `labor-invasoren` (Steuerung per Finger, Pfeiltasten oder Gerätekippen; Kippen nur nach Antippen, iOS fragt dann nach der Erlaubnis, die Sensorwerte bleiben auf dem Gerät). Sie messen weder Gleichgewicht noch Haltung, nur Zählwerte der Übung; Sicherheitshinweise stehen im Intro unter „Gut zu wissen“. Beschreibung: [`docs/entwicklung/labor-uebungen-portieren.md`](docs/entwicklung/labor-uebungen-portieren.md), Abschnitt 9.

**VR-Labor (Versuch):** unter `/vr/` liegt ein eigener Testbereich für VR-Brillen mit WebXR (Oculus/Meta Quest, Rift). Dort läuft **Kugel-Detektiv 3D** – Mehrfach-Objektverfolgung in einem Würfelraum, bei dem die räumliche Tiefe Teil der Aufgabe ist. Ohne Brille gibt es eine flache Vorschau. Beschreibung, Aufbau und Tests: [`docs/vr-labor.md`](docs/vr-labor.md). Aus dem Optiker-Bereich verlinkt.

**Binocular Mine (Prototyp):** unter `/binokular/` (`https://visual.auer.page/binokular/`) liegt ein eigenständiger Prototyp eines dichoptischen Binokulartrainings mit Anaglyphenbrille (Kalibrierung, ein spielbares Level, adaptive Kontraststeuerung, Session-Protokoll, Therapeutenbereich). Er ist von der Haupt-App getrennt (eigene Seite, eigener Code in `src/binokular/`, kein Link aus der App). Forschungs-/Trainingsprototyp, keine validierte Behandlung. Beschreibung, Architektur und Quellen: [`src/binokular/README.md`](src/binokular/README.md).

**Übungskatalog:** [`docs/uebungskatalog/`](docs/uebungskatalog/UEBERSICHT.md) beschreibt alle 81 Übungen der Vorlage skilldrills.online (Nummern 101–811) sowie das eigene Reihen-Rätsel (901) und vier Übungen nach Handyvideos bzw. Beschreibung des Auftraggebers (902–905: Richtung & Wort, Welche Seite?, Zahlen-Buchstaben-Wirbel, 4-Ziele-Wechsel) und die eigene Übung Pendelball (906) mit Anforderungsprofil, Vorsichtshinweisen und geprüften Quellen – als Grundlage für eine spätere KI-gestützte Übungsauswahl.

Hintergrund, Studienlage und Quellen: Seite „Hintergrund & Studien“ in der App sowie
[`docs/wissenschaft/`](docs/wissenschaft/). Die Übungen sind ein Training, **kein Sehtest und kein Medizinprodukt**.

## Schnellstart (Entwicklung)

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # Unit-Tests (vitest)
npm run build        # Typecheck + Build nach dist/
npm run preview      # gebaute Seite lokal ansehen
```

Hilfreiche URL-Schalter: `?lang=it` (Sprache), `?embed=1` (kompakte Darstellung für iframes),
`?quick=1&autoplay=1` (Testmodus: kurze Sitzungen, die Übung spielt sich selbst).

## Anpassen an den Optiker (Branding)

Alles Wichtige steht in [`src/config/brand.ts`](src/config/brand.ts):

- `appName`, `opticianName`, `logoUrl` (z. B. Logo nach `public/logo.svg` legen und `'./logo.svg'` eintragen)
- `homepageUrl`, `appointmentUrl` (Button „Termin vereinbaren“), `privacyUrl`, `imprintUrl`
- `colors`: `brand` = Original-Markenfarbe (#79AC2B), `primary` = etwas tieferes Grün für Buttons mit
  weißer Schrift (#5A7F20, Kontrast 4,7 : 1 – Weiß auf #79AC2B hätte nur 2,7 : 1), `accent` = Holz-Braun (#8C6D4A)

Danach `npm run build`.

## Auf der Homepage einbinden

**Variante A – eigener Link/Unterseite (empfohlen):** Die Seite unter einer eigenen Adresse veröffentlichen
(z. B. `training.example.com`) und von der Homepage verlinken. Vollbild und „Bildschirm bleibt an“ funktionieren so am besten.

**Variante B – iframe:**

```html
<iframe
  src="https://visual.auer.page/?embed=1"
  title="Blickfit – Augen- und Reaktionstraining"
  style="width:100%; height:900px; border:0; border-radius:16px"
  allow="fullscreen; screen-wake-lock"
  allowfullscreen
  loading="lazy"></iframe>
```

Die Seite nutzt Hash-Routing (`#/uebung/…`) und relative Pfade – sie läuft ohne Server-Konfiguration
auch in einem Unterordner.

## Veröffentlichen (Cloudflare)

Die Seite ist als statischer Cloudflare Worker konfiguriert ([`wrangler.jsonc`](wrangler.jsonc)):

```bash
export CLOUDFLARE_API_TOKEN=…   # niemals ins Repository schreiben
npm run deploy
```

Sicherheits- und Cache-Header stehen in [`public/_headers`](public/_headers). Jeder andere statische
Webspace funktioniert ebenfalls: einfach den Inhalt von `dist/` hochladen.

**Automatisch per GitHub:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) prüft jeden Push
(Tests + Build). Wird auf `main` gepusht und sind im Repository die Secrets `CLOUDFLARE_API_TOKEN`
(Berechtigung „Workers Scripts: Edit“) und `CLOUDFLARE_ACCOUNT_ID` hinterlegt, wird automatisch veröffentlicht.

**Tests im Browser:** `npm run build && npx vite preview --port 4173` und dann
`npm run test:e2e` (spielt jede Übung im Schnellmodus in drei Bildschirmgrößen durch).

## Neue Übungen hinzufügen

Siehe [`docs/entwicklung/neue-uebung.md`](docs/entwicklung/neue-uebung.md). Kurz: Ordner
`src/exercises/<id>/` mit Logik (`index.ts`) und Texten (`texts.ts`, de + it) anlegen, in
`src/exercises/registry.ts` eintragen – Intro, Countdown, Ergebnis, Verlauf und Speichern gibt es automatisch.

## Aufbau

```
src/
  config/brand.ts        Branding (Name, Farben, Links)
  core/                  Engine: runner.ts (Canvas, Zeit, Eingabe, Demo-Hand), staircase.ts, draw.ts, storage.ts, sound.ts …
  exercises/             eine Übung pro Ordner + registry.ts
  i18n/                  Oberflächentexte de/it
  content/science.ts     Hintergrundtexte & Quellen
  ui/                    Preact-Oberfläche (Startseite, Intro, Übung, Ergebnis, Hintergrund)
docs/
  wissenschaft/          Recherche zu den Übungen (mit Quellen)
  entwicklung/           Anleitung für neue Übungen
tests/
  unit/                  vitest
  e2e/                   Playwright-Skripte (Screenshots, Autoplay-Durchläufe)
```

## Datenschutz & Sicherheit

- Keine Server-Kommunikation, keine externen Schriften oder Skripte (DSGVO-freundlich).
- Gespeichert werden nur Ergebnisse und Einstellungen im `localStorage` des Geräts; Löschen über „Meine Ergebnisse löschen“.
- Flackernde Inhalte bleiben unter 3 Hz (WCAG 2.3.1); die Übung „Aus dem Takt“ zeigt zusätzlich einen Hinweis.
- Unterscheidungen nie nur über Farbe (Rot-Grün-Schwäche).

## Rückmeldungen der Trainer (Bewertung 1–5 Sterne + Kommentar)

- In der Ansicht **Trainer** gibt es bei jeder Übung (Einstieg und Ergebnisseite) und auf der Trainer-Seite (allgemein) den Knopf **Bewerten**: Sterne 1–5 und ein Kommentar für den Entwickler. Gespeichert wird ohne Namen und ohne Gerätedaten; ein freiwilliges **Kürzel** des Trainers (höchstens 20 Zeichen, nur Buchstaben, Ziffern, Leerzeichen und . _ -) hilft, Rückmeldungen mehrerer Trainer an einem Gerät zu unterscheiden. **Jede Bewertung zählt einzeln** (Durchschnitt und Anzahl); Kommentare erscheinen mit Kürzel in Tabelle und Export.
- **Entwickler-Bereich:** dritte Auswahl auf der Startseite (Benutzer · Trainer · Entwickler), danach Passwort; direkt erreichbar über `#/entwickler`. Das Passwort wird vom Server geprüft. Dort: Tabelle je Übung (Katalognummer, Ø Sterne, Anzahl, Kommentare), Kommentare einzeln lesen, **alle Kommentare als Textdatei exportieren** (mit Katalognummer, Kennung und Kritik, zum Einfügen in Claude Code) und danach **die exportierten Kommentare löschen** (die Sterne bleiben).
- **Technik:** `worker/index.ts` (Cloudflare Worker, läuft nur für `/api/*`) und die D1-Datenbank `blickfit-feedback` (Bindung `DB` in `wrangler.jsonc`; die Tabellen legt der Worker beim ersten Aufruf selbst an). Gemeinsame Logik: `src/feedback/logic.ts`.
- **Passwort:** Standard `726`; ändern mit `npx wrangler secret put ADMIN_PASSWORD` (überschreibt den Standard). Nach 8 Fehlversuchen ist die Adresse 15 Minuten gesperrt. Das ist ein leichter Schutz für unkritische Rückmeldungen, kein Hochsicherheits-Login.
- **Lokal testen:** `npm run build && npx wrangler dev --local --port 8791`, dann `node tests/e2e/feedback.mjs`. Ohne Worker (`npm run dev`, `vite preview`) lässt sich die Rückmeldung nicht senden.

