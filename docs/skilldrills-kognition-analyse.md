# Analyse: skilldrills.online – Kategorie „Kognition“ (Code-Analyse)

Stand: 29.09.2026. Grundlage: ausgelieferte, minifizierte Next.js-Chunks der 8 Drills unter
`https://skilldrills.online/de/drills/cognitive/*`. Beschreibt Mechanik und Schwächen als Basis für eine
eigene, verbesserte Umsetzung – kein Originalcode.

## Gemeinsames Gerüst
- Countdown 3-2-1 (0/700/1400 ms), GO bei 2100 ms, Start bei 2450 ms; 45 s Sitzung, Vollbild.
- „Combo-Arcade“-Modell (Geteilte Aufmerksamkeit, Multitasking, Stroop, Wahlreaktion, Symbol):
  `level = max(level, score/1750 + 1)`; Kurve `end + (start−end)·e^(−1.43·g(t))`; Combo-Multiplikator 1…3;
  Treffer `+100·Combo·(1+0.5t)` und **+2 s (max 60 s)**; Fehler −1 s.
- Keine Reaktionszeiten erfasst (in keinem Drill), Startstufe immer 1.

**Übergreifende Schwächen:** Zeitstrafe nicht abschaltbar und 1 s statt der genannten 0,8 s; Sitzungen
werden durch Zeitbonus bei guter Leistung länger (Scores nicht vergleichbar); Combo verkürzt Zeitfenster um
25–30 % → nach Fehlern schlagartig leichter; Perzentil-Tabellen ohne Datengrundlage; fragwürdige FAQ-Aussagen;
kaum Tastatursupport; Genauigkeit ohne korrekte Zurückweisungen (kein d′).

## Die 8 Drills

| Drill | Mechanik | Wichtigste Schwächen |
|---|---|---|
| Konzentrationstest (CPT) | Einzelzeichen; Regel „Vokale“ ↔ „Primzahlen“ wechselt alle 10 s; Anzeige 1100→260 ms; Zielanteil 30–48 % | Regelwechsel mitten im Reiz wertet alte Regel; Wechselsignal = Trefferton; Tempo statt Vigilanz belohnt; kein CPT/SART im Sinne der Literatur |
| Geteilte Aufmerksamkeit | Kanal A: Kreis antippen (statisch, 1800→240 ms); Kanal B: bei gerader Ziffer „MATCH“ | versprochene Bewegung fehlt; keine Einzelaufgaben-Basislinie → keine Dual-Task-Kosten; nur Farbe als Feedback |
| Multitasking | zwei Symbolströme, Zielsymbol antippen; Vorgabe wechselt alle 20 s | Trennung der Ziele wirkt bis zu 20 s verspätet; Vorgabewechsel unangekündigt; Symbole fehlen in vielen Schriften; „Hemisphären“-Pseudowissenschaft |
| Schulte-Tabelle | Zahlen 1…n² der Reihe nach, 3×3 bis 8×8, Drehung ab 5×5 | gefundene Zahlen ausgegraut (verkleinert Suche); Schrift 12 px bei 8×8; Textschwellen ≠ Code; „peripheres Gesichtsfeld“ unbelegt |
| Stroop | Farbwort in anderer Tinte (immer inkongruent), 4–6 Textbuttons, Reihenfolge wechselt | keine kongruenten/neutralen Durchgänge und keine RT → kein Interferenzmaß; Buttons müssen gelesen werden; rein farbbasiert (Farbsehschwäche) |
| Wahlreaktion | zwei Kreise rot/blau, „Tippe ROT/BLAU“, Regelwechsel | keine Reaktionszeit gemessen; nur 2 Alternativen; nur Farbe; kein Vorlauf (Antizipation); Zielen vermischt |
| RSVP-Schnelllesen | fester englischer Absatz in Schleife, 250–850 WPM, Zielwort antippen | Antwortfenster kürzer als Reaktionszeit (240→71 ms); deterministisch; misst Erkennung, nicht Verständnis; Sakkaden-Aussagen widerlegt |
| Symbol-Zahlen | 6 griechische Buchstaben ↔ 1–6, Legende + Buttons in gleicher Reihenfolge | Aufgabe rein räumlich lösbar (kein SDMT); winzige Legende; verzerrtes Mischen |

## Empfehlungen (umgesetzt in der Kategorie „Konzentration & Denken“)
Reaktionszeiten frame-genau erfassen (Median, Antizipationen); feste Sitzungsdauer ohne Zeitbonus; Treffer,
Fehlalarme, Auslassungen und korrekte Zurückweisungen getrennt; Regelwechsel ankündigen; Stroop mit
kongruenten/inkongruenten Durchgängen und fester Tastenbelegung; nie nur Farbe als Merkmal; SDMT mit
zufälliger Legende und Ziffernantwort; RSVP nur mit realistischen Antwortfenstern bzw. Verständnis; keine
Perzentile ohne Normdaten.
