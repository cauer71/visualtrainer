# Eine neue Übung entwickeln

Jede Übung ist ein eigenständiges **Canvas-Modul** in `src/exercises/<id>/`. Die Engine
(`src/core/runner.ts`) übernimmt Canvas, Pixeldichte, Zeitschleife, Pause, Eingaben, die
animierte Hand im Intro-Film und das Einblenden von Texten. Die Oberfläche (Intro, Countdown,
Ergebnis, Verlauf, Speichern) ist für alle Übungen gleich – eine Übung liefert nur Logik,
Zeichnung, Texte und ein Ergebnis.

## Dateien

```
src/exercises/<id>/
  index.ts   – Logik + Definition (export const <name>: ExerciseDefinition)
  texts.ts   – Texte Deutsch (de) und Italienisch (it)
```

Danach in `src/exercises/registry.ts` importieren und in `EXERCISES` eintragen.
Referenz-Implementierung: `src/exercises/blitzreaktion/`.

## Lebenszyklus (`src/core/types.ts`)

```ts
interface Exercise {
  start(t: number): void;                 // einmal, Bühne hat bereits ihre Größe
  update(dt: number, t: number): void;    // pro Frame; dt in Sekunden (≤ 0,05), t = virtuelle Zeit in ms
  render(g: CanvasRenderingContext2D, t: number): void;  // pro Frame, Koordinaten in CSS-Pixeln
  pointerDown?(p: PointerInfo): void;     // p.x, p.y (CSS-px), p.t (virtuelle ms, aus event.timeStamp)
  pointerMove?(p: PointerInfo): void;
  pointerUp?(p: PointerInfo): void;
  resize?(w: number, h: number): void;    // Tablet gedreht → Layout neu berechnen
  destroy?(): void;
}
```

`ctx: ExerciseContext` (wird an `create(ctx)` übergeben):

| Feld | Bedeutung |
|---|---|
| `ctx.mode` | `'play'` (echte Übung) oder `'demo'` (Intro-Film) |
| `ctx.autoplay` | `true` im Demo-Modus **und** in automatischen Tests (`?autoplay=1`): Die Übung steuert dann selbst die Geister-Hand |
| `ctx.quick` | Test-Modus (`?quick=1`): extrem kurze Sitzung (2–3 Durchgänge bzw. ~8 s) |
| `ctx.startLevel` | gespeicherte Stufe der letzten Sitzung oder `null` |
| `ctx.stage` | Live-Maße: `w`, `h`, `u` (= 1 % der kürzeren Seite), `dpr` |
| `ctx.rng` | Zufallsgenerator (im Demo-Modus mit festem Startwert) – **immer diesen verwenden, nie `Math.random`** |
| `ctx.hud` | `setProgress(0..1)`, `setScore(n \| null)`, `setLabel(text \| null)`, `toast(text, kind, {x,y,ms,size})`, `caption(text, 'top' \| 'bottom')` |
| `ctx.ghost` | Geister-Hand: `tap(x, y, {delay, move})`, `moveTo(x, y, {delay, move})`, `clear()`, `idle` |
| `ctx.sfx` | `tick()`, `go()`, `good()`, `bad()`, `tap()`, `done()` (im Demo stumm) |
| `ctx.fmt` | `num(v, digits)`, `time(ms)` → „0,31 s“, `ms(ms)`, `msSigned(ms)`, `pct(v)` |
| `ctx.texts` | Texte der aktuellen Sprache |
| `ctx.finish(result)` | Übung beenden |

## Regeln

**Zeit:** Nur die übergebene virtuelle Zeit `t` bzw. `p.t` und `ctx.now()` verwenden (steht in der
Pause still). Bewegungen immer mit `dt` (Sekunden) rechnen – nie „pro Frame“, sonst läuft die Übung
auf 120-Hz-Tablets doppelt so schnell. Reaktionszeiten: Reizbeginn = `t` des Frames, in dem der Reiz
zum ersten Mal gezeichnet wird; Antwortzeit = `p.t`.

**Größen:** In Vielfachen von `u` (1 % der kürzeren Seite) planen. Touch-Ziele: Trefferradius
mindestens 24 px bzw. Buttons mindestens 56 px hoch – auch wenn das sichtbare Objekt kleiner ist.
Die Bühne kann Quer- (Tablet), Hochformat (Handy) oder 16:11 (Intro-Film) haben.
Positionen am besten normiert (0..1) speichern oder in `resize()` neu berechnen.

**Eingabe:** `pointerDown` ist die Antwort (keine Klick-Verzögerung). Mehrere Finger sind möglich –
Übungen müssen mit Doppel-Taps robust umgehen (z. B. nur die erste Antwort pro Reiz werten).

**Barrierefreiheit & Sicherheit:** Nie nur über Farbe unterscheiden (Rot-Grün-Schwäche betrifft ca.
8 % der Männer) – immer zusätzlich Form/Symbol. Flackern/Blinken höchstens 3-mal pro Sekunde,
weiche (sinusförmige) Übergänge, keine großflächigen harten Hell-Dunkel-Wechsel, kein rotes Blitzen.

**Schwierigkeit:** Adaptiv mit `Staircase` (`src/core/staircase.ts`): Stufe höher = schwerer.
`n-down/1-up`: 2 → ≈71 %, 3 → ≈79 %, 4 → ≈84 % richtige Antworten. Startstufe aus
`ctx.startLevel`, nächste Startstufe mit `nextStartLevel(threshold, min, max)` zurückgeben.

**Ergebnis:**

```ts
ctx.finish({
  primary: { key: 'level', value: 7, unit: 'level', better: 'higher' },   // Stufen immer ganzzahlig
  secondary: [{ key: 'accuracy', value: 86, unit: 'percent' }],            // 2–4 Werte
  score: 1234,                  // Punkte (Motivation)
  level: 6.5,                   // Startstufe nächstes Mal
  tip: 'slow',                  // Schlüssel in texts.tips
});
```

Einheiten: `time` (ms → „0,31 s“), `ms`, `percent`, `count`, `points`, `level`.

**Demo-Modus (Intro-Film):** Ein kurzer, fest geskripteter Ablauf (8–14 s) mit leichten Parametern,
der zeigt, *was* zu tun ist. Die Geister-Hand macht es vor (`ctx.ghost.tap(...)` rechtzeitig vorher
planen; `move` = Fahrzeit in ms). Erklärtexte über `ctx.hud.caption(...)` – maximal ~40 Zeichen,
Alltagssprache. Am Ende `ctx.finish(...)` aufrufen (irgendein Ergebnis) – der Film startet dann neu.
Die Hand nicht dauerhaft über wichtigen Inhalten oder der Bildunterschrift parken.

**Autoplay im Spielmodus** (`ctx.autoplay && ctx.mode === 'play'`, nur für Tests): Die Hand soll
plausibel mitspielen (meist richtig, manchmal falsch), damit die Sitzung sauber endet.

## Texte (Ton!)

Die Nutzer lesen ungern. Also: **du**, kurz, konkret, alltagsnah, kein Fachjargon
(nicht „peripher“, „kognitiv“, „Sakkade“, „Stimulus“ …).

- `title`: 1–3 Wörter
- `tagline`: Nutzen in einem Satz (≤ 80 Zeichen), z. B. „Schneller reagieren – beim Autofahren, beim Sport und im Alltag.“
- `steps`: 2–3 Schritte, je ≤ 60 Zeichen
- `why`: 2–3 einfache Sätze („Für Neugierige“)
- `goodFor`: 2–3 Stichworte
- `captions`, `metrics`, `tips`, `feedback`: siehe Referenz

Italienisch muss inhaltlich gleich sein (gleiche Schlüssel).

## Testen

```bash
npx vite --port 5180 &                         # Dev-Server
node tests/e2e/flow.mjs http://localhost:5180/ /tmp/shots <id> 2500,5000     # Autoplay-Durchlauf + Screenshots
VP=port node tests/e2e/flow.mjs …              # Hochformat
node tests/e2e/shots.mjs http://localhost:5180/ /tmp/shots '#/uebung/<id>|6000|0'   # Intro-Film
npx tsc --noEmit
```
