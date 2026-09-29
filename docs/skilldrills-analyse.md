# Analyse: skilldrills.online – Visuelle Drills (Code-Analyse)

Stand: 2026-09-29. Quelle: ausgelieferte, minifizierte Next.js-Chunks von
`https://skilldrills.online/de/drills/visual/*` (je Drill ein eigener Spiel-Chunk),
formatiert und gelesen. Dieses Dokument beschreibt **Mechaniken und Parameter**
als Grundlage für eine eigene Neu-Implementierung – es enthält keinen Originalcode.

## Kernerkenntnisse

1. **Einheitliches Grundgerüst**: Start-Karte → Countdown 3-2-1-GO (0/700/1400/2100 ms,
   Spielbeginn bei 2450 ms) → 45 s Spiel → Ergebnis. Immersiver Vollbildmodus mit
   Wake-Lock; Tab-Wechsel/Escape/Vollbild-Verlassen bricht ohne Speichern ab.
2. **Gemeinsame Schwierigkeitskurve** (Light Reaction, Go/No-Go, Moving Target):
   `p = (level-1)/14`, `curve(t) = t≤1 ? t(t+0.6)/1.6 : 1+1.375(t-1)`,
   `ease(start,end,p) = end + (start-end)·e^(-1.43·curve(p))` – zusätzlich durch Combo verschärft.
3. **Combo-Multiplikator**: ≥3→1.1, ≥5→1.25, ≥7→1.35, ≥10→1.5, ≥15→1.75, ≥20→2, ≥30→2.5, ≥50→3.
4. **Note** (alle Drills): `pct = min(100, 100·√(score/ref))` → S+ ≥95, S ≥85, A ≥75, B ≥60, C ≥45, D ≥30, sonst F.
5. **Bewegung ist simpel**: geradlinige Bewegung mit Wandreflexion (Moving Target),
   Geschwindigkeits-Random-Walk mit Kappung (Pursuit), elastische Stöße gleicher Masse (MOT),
   linear wachsender Radius ohne echte 3D-Projektion (Distance Judgment).
6. **Schwächen im Original**:
   - Moving Target & Pursuit bewegen **pro Frame ohne dt** → auf 120/144-Hz-Monitoren doppelt so schnell;
     Pursuit-Schwellen sind Frame-Zähler (60/120).
   - Kein Canvas nutzt devicePixelRatio (unscharf auf Retina), nur gecachte Sprites.
   - Regeltext ≠ Code (z. B. „-0.8s“ vs. real −1 s; Tiefentest „<5 %/<12 %“ vs. Prozentpunkt-Toleranzen;
     Go/No-Go „-1 Life“, Leben existieren nicht).
   - Zeitstrafe-Setting wirkungslos (`isEnabled(true)` ⇒ immer an).
   - Keine Mindest-Reaktionszeit (Antizipation wird nicht erkannt), Reaktionszeiten nur Mittelwert.
   - MOT: nur **ein** Durchgang pro Session, Schwierigkeit nur vom gespeicherten Bestwert abhängig.
   - Visual Search: Level ohne Wirkung; Doppel-Tap auf Ziel zählt doppelt.
   - Entropic Grid: Notenskala sehr leicht (7 Treffer = S+).
   - Countdown-Töne werden doppelt abgespielt.
   - „Tiefenwahrnehmung“ ist nur Looming (monokular), keine Stereopsis.

---

## 0. Gemeinsames Framework

| Aspekt | Wert |
|---|---|
| Phasen | `start → countdown → playing → gameOver` (Play Again → countdown, Exit → start) |
| Countdown | 3 @0 ms, 2 @700, 1 @1400, GO @2100, Spielstart @2450 ms |
| Session | 45 s; bei Light/GoNoGo/MovingTarget +2 s pro Treffer (max 60 s), −1 s pro Fehler |
| Spieluhr | rAF mit `dt = min(Δ/1000, 0.1)` oder `setInterval(100ms)`; Anzeige `ceil(timeLeft)`, rot+pulsierend ≤10 s |
| Punkte (mit Combo) | `round(base · comboMult(combo) · (1 + 0.5·p))`, combo vor Berechnung inkrementiert |
| Level | kontinuierlich `max(level, score/K + 1)` (K = 5250 Light/Moving, 6300 GoNoGo) bzw. `floor(score/750)+1` |
| Miss-Flash | Div `radial-gradient(rgba(239,68,68,.5), transparent 70%)`, Opazität 1→0 in 450 ms, entfernt nach 480 ms |
| Settings (localStorage "1"/"0") | `skilldrills_sound_enabled`, `skilldrills_flash_enabled`, `skilldrills_timeout_enabled`, `skilldrills_penalty_enabled` |
| Farben | Seite `#050508`, Spielfeld `#080811`, Karten `#0c0c16` |

**Sounds (WebAudio, Peak-Gain ≤ 0.17, exponentieller Ausklang auf 1e-4):**
- Hit: Sinus 880→1760 Hz, 0,12 s, Gain 0,16
- Penalty: 220 Hz 0,08 s + 165 Hz ab +0,06 s, Gain 0,12, Attack 10 ms
- Countdown-Tick: 440 Hz, 0,09 s · Tick: 600 Hz, 0,05 s · Go: Dreieck 523,25→784 Hz, 0,18 s
- Session-Ende: Akkord 523,25/659,25/783,99 Hz (je +80 ms, 0,24 s, Tiefpass 3200 Hz), dann 1046,5 Hz @+0,26 s (0,6 s, Tiefpass 4200 Hz); jede Stimme = 2 Sinus ±4 Cent

**Glow-Ball-Sprite** (offscreen gecacht, DPR ≤ 2): Ring r+5 (α .2, lw 1) · Ring r (α .55, lw 1.8) ·
Scheibe 0.82r (α .88, shadowBlur 14) · Glanzlicht bei (−0.2r, −0.2r) Radius 0.28r (weiß α .3) · Mittelpunkt max(2.5, 0.18r) weiß.

**Noten-Referenzwerte (`ref`)**: Light 15000 · Go/No-Go 16000 · Visual Search 1500 · Moving Target 16000 ·
Pursuit 180 · MOT 60 · Distance 1500 · Entropic 1000 · Rhythm 200. Mindestpunkte je Stufe = `ref·(min/100)²`.

---

## 1. Light Reaction (Canvas, keine Bewegung)

- Scheibe in der Mitte: Radius 52, idle `#151515`, aktiv `#FFFFFF` mit shadowBlur 30; Ring r=49 `rgba(255,255,255,.1)`; Mittelpunkt r=4.
  Hintergrundraster 1 px alle 40 px, `rgba(255,255,255,.03)`.
- Ablauf: Vorperiode `uniform[minDelay, maxDelay)` → Blitz → Antwortfenster `flashWindow`.
- Schwierigkeit (`r = (comboMult−1)/2`):
  - `flashWindow = max(50, ease(300, 70, p)·(1−0.30r))`
  - `minDelay = max(300, ease(1000, 400, p)·(1−0.25r))`
  - `maxDelay = max(500, ease(2500, 800, p)·(1−0.25r))`
  - Beispiele (Fenster/min/max ms): L1: 300/1000/2500 · L10: 183/694/1632 · L15: 125/544/1207
- Eingabe: Tap irgendwo (pointerdown). Fehlstart, Tap außerhalb Blitz oder <320 ms nach letztem Tap →
  Miss, −1 s, Combo 0, **1200 ms Sperre** (jeder weitere Tap verlängert). Verpasster Blitz → Miss, −1 s, 350 ms Pause.
- Treffer: RT = `performance.now() − onset`, +150·Combo·Levelbonus, +2 s, nächste Vorperiode sofort.
- Ergebnis: Accuracy, Ø-RT (nur Mittelwert), Peak Level, Max Combo. Key `skilldrills_visual_light_reaction_v5`
  = `{bestScore, bestCombo, bestLevel, totalSessions}`.

## 2. Go/No-Go (Canvas)

- Wie Light Reaction; Reiz 70 % GO (`#10b981`), 30 % NO-GO (`#ef4444`).
- Ablauf: ISI `uniform[minDelay, maxDelay)` → Reiz sichtbar für `flashWindow`.
  - `flashWindow = max(100, ease(600, 160, p)·(1−0.25r))`
  - `minDelay = max(120, ease(400, 150, p)·(1−0.20r))`, `maxDelay = max(200, ease(800, 280, p)·(1−0.20r))`
- GO getroffen: +150·M; NO-GO zurückgehalten: +100·M (jeweils +2 s); Klick auf NO-GO: −1 s, Combo 0 (keine Sperre);
  verpasstes GO: −1 s, Combo 0. Spam-Regel (<320 ms) wie oben mit 1200-ms-Sperre.
- Keine RT-Messung. Key `skilldrills_visual_go_nogo_v5`.

## 3. Visual Search (DOM-Raster)

- 96 Buttons, `grid-template-columns: repeat(12,1fr)`, Größe `min(88vw, 44vh)` quadratisch.
- Zeichensätze (Ziel: Ablenker): C:OQG · E:FLP · P:RBD · N:MHW · V:UWY · Z:S27 · G:COQ · X:KYV · 6:890 · T:I7J · 5:SEB · 3:8BE.
  Jede Zelle zufällig um 0/90/180/270° gedreht (auch das Ziel).
- Treffer: +150 flach, grün, neue Runde nach 180 ms. Fehlklick: rot 400 ms, kein Abzug. Kein Combo/Zeitbonus.
- Keine Schwierigkeitsskalierung. Key `skilldrills_visual_search_v4`.

## 4. Moving Target (Canvas, Bewegung pro Frame!)

- Ein Ziel `#f97316`, Spawn gleichverteilt in `[r, W−r]×[r, H−r]`, Richtung θ gleichverteilt, `v = speed/60` px/Frame, geradlinig.
- Update: `x += vx; y += vy`; Wandreflexion mit Clamp. Nach `moveInterval` Sekunden: Relocation (+ Timeout-Miss, −1 s).
- Parameter (`ease` wie oben, `k = (comboMult−1)/2`):
  - `radius = max(8, ease(26, 8, p)·(1−0.25k))`
  - `speed = ease(120, 750, p)·(1+0.40k)` px/s
  - `moveInterval = max(0.12, ease(1, 0.2, p)·(1−0.30k))` s („Shift Pace“)
  - `hitTolerance = max(12, ease(32, 12, p)·(1−0.35k))`
  - L1: r 26, 120 px/s, 1,00 s · L10: r 16,8, 442 px/s, 0,59 s · L15: r 12,3, 599 px/s, 0,39 s
- Hit-Test: `dist ≤ max(r + hitTolerance, 20)`. Treffer: +150·M, +2 s, sofortiger Respawn.
- Timer-Ring um das Ziel: Radius r+6, Restbogen lw 3 (rot ab 75 %), Label `x.xs` 10 px mono über dem Ziel.
- Key `skilldrills_visual_moving_target_v5`.

## 5. Pursuit Tracker (Canvas, Bewegung pro Frame!)

- Start in der Mitte, `v = 6 px/Frame` (≈360 px/s @60 Hz), Richtung zufällig.
- Radius `max(9, 18 − 0.04·score)`.
- Pro Frame: `x += vx; y += vy`; mit 5 % Wahrscheinlichkeit Kick `vx,vy += uniform(−5, 5)` und Kappung auf
  `maxSpeed = 6 + 0.1·score + 0.5·streak` px/Frame; Wandreflexion + Clamp. Keine Mindestgeschwindigkeit.
- Kontakt: `dist(cursor, orb) < r + 35`. 60 Kontakt-Frames am Stück → Puls: +5 Punkte, streak++, Hit-Ton.
  120 Frames ohne Kontakt → „Lost Link“: streak = 0 (kein Punkt-/Zeitabzug).
- Farbe: grün `#10b981` bei Kontakt, sonst orange; Fortschrittsbogen r+8 `#34d399`. Raster alle 50 px, α .02.
- Touch: Finger muss liegen bleiben (pointerup → Cursor weg). Accuracy = Kontakt-Frames/Gesamt-Frames.
- Kein Zeitbonus. Key `skilldrills_visual_pursuit_tracker_v2`.

## 6. Multiple Object Tracking (Canvas, dt-basiert)

- **Ein Durchgang pro Session**: MEMORIZE 2 s (3 Ziele grün) → TRACKING 60 s → IDENTIFY (ungetimt, 3 wählen + „Confirm“) → Auflösung 2,5 s.
- Anzahl Bälle `min(20, 8 + floor(bestScore/30))`, Radius 12 (W<768) bzw. 22; Spawn zufällig, Richtung als Einheitsvektor.
- Bewegung: `step = 60·(5 + bestScore/30)·dt` (300–420 px/s), `dt ≤ 0.05`; Wandreflexion;
  paarweise elastische Stöße gleicher Masse (Überlappung halbieren, Normalkomponente tauschen).
- Farben: Memorize Ziel `#10b981`/andere `#1f1f2e`; Tracking alle `#e2e8f0`; Auswahl `#f97316` + „✓“.
- Hit-Test `dist ≤ r + 20`. Punkte 20 pro richtigem Ziel (max 60), keine Strafe.
- Key `skilldrills_visual_multiple_targets_v1`.

## 7. Distance Judgment (Canvas, „Looming“ ohne 3D)

- `R_max = 0.35·min(W,H)`. Zielring-Radius `R_max·targetPct/100` (gestrichelt `[6,6]`, `#06b6d4`, lw 3).
- Kugelradius `R_max·max(0.1, progress/100)`, `progress = 100·min(1, (now−start)/durationMs)` → linear, konstant schnell.
- Pro Versuch (L = Level):
  - `targetPct ∈ [max(20, 35−2L), min(80, 65+2L))` ganzzahlig
  - `durationMs = max(400, round(max(500, 2200−130L)·(1 ± min(0.5, 0.08+0.04L))))`
- Wertung: `err = |progress − targetPct|` (Prozentpunkte). Perfekt `≤ max(4, 7−floor(0.3L))` → +150,
  nah `≤ max(10, 16−floor(0.5L))` → +100, sonst Miss. Timeout bei 100 % = Miss. Pausen 350/400/450 ms.
- Level `floor(score/750)+1`. Tunnel: 6 konzentrische Rechtecke (10…100 % von 0.85·W×H), `rgba(6,182,212,.15)`.
- Kugel: Radialverlauf `#e0f7ff → #38bdf8 → #0891b2 → #0e3a4d`, Halo r+12, Glanzlicht. Eingabe: Tap überall.
- Key `skilldrills_visual_distance_judgment_v4`.

## 8. Entropic Grid (DOM-Raster)

- 10×10, Zeichensatz `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (ohne I, O, 0, 1), Codes = 2 Zeichen.
- Zielanzahl `min(2 + floor(level/3), 6)`. Alle **700 ms** werden genau 3 Ablenker neu gewürfelt;
  alle **12 s** komplett neues Brett und neuer Code; alle Ziele gefunden → sofort neues Brett.
- Treffer +150 (Zelle bekommt neuen Code), Fehlklick ohne Abzug. 120 ms Tap-Debounce. Level alle 750 Punkte.
- Key `skilldrills_visual_entropic_grid_v4`.

## 9. Rhythm Anomaly (Canvas)

- 6×6-Raster, Größe `0.9·min(W,H)`, Hintergrund `#020202`.
- Puls `sin⁶(π·(now mod T)/T)`: normale Zellen `rgb(10+16·v)` mit T = basePeriod, Anomalie `rgb(10+32·v)` mit T = anomalyPeriod
  (schneller **und** doppelte Amplitude). Alle normalen Zellen phasengleich.
- Nach jedem Treffer (r = Treffer):
  - `basePeriod = max(600, 1600−40r)`, `anomalyPeriod = max(400, floor(0.72·basePeriod))`
  - `entropyInterval = max(200, 800−25r)`, `timeoutMs = max(1800, 6000−150r)`, Level `floor(r/3)+1`
- Rauschen: alle `entropyInterval` ms werden 3 zufällige Zellen für 150 ms auf `rgba(255,255,255,.04)` gesetzt.
- Treffer +10, neue Anomalie; Fehlklick: Combo 0; Timeout: neue Anomalie. Keine Punkt-/Zeitabzüge.
- Key `rhythmAnomalyBestScore_v8` (nur Integer).

---

## Empfehlungen für eine eigene Implementierung

- Alle Bewegungen **dt-basiert** (px/s) und Schwellen in Millisekunden statt Frames.
- Canvas mit `devicePixelRatio` skalieren.
- Rohmetriken getrennt vom Spiel-Score: Median/SD der RT, Antizipationen (<100 ms), d′ für Go/No-Go,
  Fehlerverteilung beim Tiefentest, Time-on-Target beim Pursuit.
- MOT als mehrere Durchgänge mit adaptivem Staircase (Anzahl Ziele/Geschwindigkeit).
- Verlauf pro Drill speichern (nicht nur Bestwert), Tastatur- und Touch-Unterstützung.
- Regeltext und Code konsistent halten.
