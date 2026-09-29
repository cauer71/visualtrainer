# Wissenschaftliche Grundlagen – Block „Bewegung verfolgen & Augenbewegungen“

Stand: 29.09.2026 · Übungen: **Kugel-Detektiv** (Multiple Object Tracking), **Scharf in Bewegung**
(Augenfolgebewegung & dynamische Sehschärfe), **Zielfang** (Abfangen bewegter Ziele) · plus Umrechnung
Bildschirm → Sehwinkel.

**Methode:** Jede Quelle wurde über eine echte URL geprüft (PubMed/NCBI-E-Utilities, Crossref-API, PMC,
Verlags-, Hersteller- oder Normenseiten). Zahlen stammen aus Abstracts oder Volltexten. Wo nur die
bibliografischen Daten (nicht der Inhalt) geprüft werden konnten, steht das ausdrücklich dabei. Korrekturen
gegenüber dem Rechercheauftrag stehen im Anhang.

Verwandtes Dokument: [`../skilldrills-analyse.md`](../skilldrills-analyse.md) (technische Analyse der Vorlage).

---

## 0. Evidenzskala und Transfer-Problem

| Stufe | Bedeutung in diesem Dokument |
|---|---|
| **stark** | mehrere unabhängige, übereinstimmende Studien oder Reviews; gut replizierter Befund |
| **mittel** | einige kontrollierte Studien, überwiegend übereinstimmend, aber kleine Stichproben oder methodische Einschränkungen |
| **schwach** | Einzelstudien, kleine Stichproben, fehlende Kontrollgruppe/Randomisierung/Replikation oder widersprüchliche Befunde |
| **fehlend** | keine Studie prüft die Aussage direkt |

**Transfer** ist die zentrale Frage bei allen drei Übungen:

- *Nahtransfer*: Verbesserung in einer ähnlichen Laboraufgabe (z. B. anderer Aufmerksamkeitstest).
- *Ferntransfer*: Verbesserung im Alltag (Straßenverkehr, Sport).
- Übersichtsarbeiten zeigen durchgängig: Training verbessert die **geübte Aufgabe** zuverlässig, Belege für
  **Ferntransfer** sind selten und methodisch schwach (Simons et al., 2016; Harris, Wilson & Vine, 2018;
  Vater, Gray & Holcombe, 2021; Fransen, 2024; Gegenposition: Appelbaum et al., 2025, „Limited evidence is not
  no evidence“).
- Eine Metaanalyse zu digitalem Sport-Sehtraining (33 RCTs, 1 048 Teilnehmende) fand große Effekte vor allem
  dann, wenn Trainings- und Testaufgabe am selben Gerät/Format stattfanden („Lerneffekt“). Beispiel visuelle
  Aufmerksamkeit: SMD 1,65 mit Lerneffekt vs. 0,07 (95 %-KI −0,25 bis 0,38) ohne (Guo et al., 2025).
  **Konsequenz für uns:** Fortschritte in der App belegen *keinen* Nutzen außerhalb der App.

### Kurzüberblick

| Übung | Was verbessert sich sicher? | Was ist unbelegt? |
|---|---|---|
| Kugel-Detektiv | die Tracking-Leistung in der Aufgabe (**stark**, auch bei Älteren) | Transfer auf Sport (**schwach**), Autofahren (**fehlend**) |
| Scharf in Bewegung | Erkennen bewegter Details in der Laboraufgabe (**mittel**), Folgebewegung kurzfristig (**schwach–mittel**) | Transfer auf Alltag/Sport (**fehlend/schwach**) |
| Zielfang | Treffsicherheit und Timing in der Aufgabe (plausibel, **mittel** aus Motorik-Forschung) | Transfer auf Ballsport (**schwach**) |

---

## 1. Kugel-Detektiv (Multiple Object Tracking, MOT)

### Was wird trainiert

Die Übung trainiert, mehrere gleich aussehende, sich bewegende Objekte gleichzeitig nur anhand ihrer
Bewegungsbahn zu verfolgen („attentives Tracking“, verteilte und anhaltende visuelle Aufmerksamkeit).
Das Paradigma stammt von Pylyshyn & Storm (1988) und gilt als Laborbild für Situationen wie Straßenverkehr
oder Mannschaftssport (Meyerhoff, Papenmeier & Huff, 2017). Sehschärfe oder Augenmotorik werden nicht
direkt trainiert. Die Blickstrategie spielt aber eine Rolle (siehe 1.6).

### Was sagt die Forschung

**1.1 Grundlagen und Kapazitätsgrenzen – Evidenz: stark**

- Pylyshyn & Storm (1988): Versuchspersonen verfolgten **bis zu 5 von 10** identischen, zufällig bewegten
  Objekten. Die Trefferquote lag bei 87 %; ein serielles „Abtasten“ hätte nur ≈ 40 % vorhergesagt. Daraus
  folgt ein paralleler Tracking-Mechanismus.
- Die Kapazität ist **nicht fix**, sondern hängt von der Geschwindigkeit ab. Bei langsamer Bewegung sind bis
  zu **≈ 8 Objekte** verfolgbar, bei hoher Geschwindigkeit nur **eines**. Schon der Schritt von 1 auf 2 Ziele
  senkt die Grenzgeschwindigkeit um ≈ 30 % (Alvarez & Franconeri, 2007; N = 12; 16 Kreise à 1,25°,
  Geschwindigkeit 0–42°/s, 6 s Tracking). Ein einzelnes sehr schnelles Ziel kann die Ressource allein
  „aufbrauchen“ (Holcombe & Chen, 2012).
- Die zeitliche Auflösung sinkt mit der Zielanzahl: 7 Hz bei 1 Ziel, 4 Hz bei 2 und 2,6 Hz bei 3 Zielen
  (Holcombe & Chen, 2013).
- **Gesichtsfeldhälften arbeiten weitgehend unabhängig.** Verteilt man die Ziele auf die linke und rechte
  Hälfte, lassen sich doppelt so viele verfolgen wie in einer Hälfte (Alvarez & Cavanagh, 2005). Der
  schnelleren Kugel wird mehr Ressource zugeteilt (Chen, Howe & Holcombe, 2013).
- **Abstand und „Beinahe-Kollisionen“ sind die Hauptfehlerquelle.** Fehler entstehen vor allem als
  Ziel-Distraktor-Verwechslung bei Annäherung auf weniger als 4°. Die Häufigkeit solcher Begegnungen sagt die
  Leistung voraus (Bae & Flombaum, 2012). Franconeri, Jonathan & Scimeca (2010) sehen im Objektabstand sogar
  die eigentliche Ursache der Grenzen durch Geschwindigkeit und Dauer.

**1.2 Alters- und Expertiseeffekte – Evidenz: mittel bis stark (meist Querschnitt, kausal unklar)**

- **Alter:** Ältere Personen (M = 73 J.) verfolgten ≈ 3 Objekte, junge (M = 19 J.) ≈ 4. Statische Positionen
  merkten sich beide Gruppen zu 100 % (Trick, Perl & Sethi, 2005). Ältere (M = 75,3 J.) sind besonders bei
  **schnellerer Bewegung und längerer Trackingdauer** beeinträchtigt (Sekuler, McLaughlin & Yotsumoto, 2008).
- **Ältere lernen gleich gut:** 20 junge (18–35 J.) und 20 ältere Personen (64–73 J.) trainierten 5 Wochen
  3D-MOT (je 1 × 30 min/Woche). Beide gewannen gleich viel, und trainierte Ältere erreichten die Schwellen
  untrainierter Junger (Legault, Allard & Faubert, 2013).
- **Entwicklung:** Die Verarbeitung bewegter Mengen reift bis ins junge Erwachsenenalter. Beim Abzählen von
  6–9 Objekten, die sich in einem engen Bereich (1,14°) bewegten, sank die Verlangsamung durch Bewegung von
  788 ms (8-Jährige) auf 136 ms (20-Jährige) (Trick, Audet & Dales, 2003).
- **Expertise:** Profis (Premier League, NHL, Top 14; N = 102) starteten höher und lernten steiler als
  Elite-Amateure (N = 173) und Studierende (N = 33) (Faubert, 2013; insgesamt N = 308). Fußball- und
  Rugbyspieler trackten besser als Schwimmer, Ruderer und Läufer (ηp² = 0,16), ohne Unterschied in der
  Blickstrategie (Harris, Wilson, Crowe & Vine, 2020). Action-Videospieler verfolgten ≈ 2 Objekte mehr
  (Green & Bavelier, 2006).

**1.3 NeuroTracker-/3D-MOT-Trainingsstudien**

| Studie | Stichprobe | Design | Ergebnis | Einschränkung |
|---|---|---|---|---|
| Faubert & Sidebottom (2012) | – | Konzept-/Methodenartikel | beschreibt 3D-MOT-Training, postuliert Nutzen (Sport, Kollisionsvermeidung) | keine Wirksamkeitsdaten |
| Faubert (2013) | 308 | Lernkurven, bis 15 Sitzungen | Profis > Amateure > Studierende | kein Transfer geprüft |
| Legault & Faubert (2012) | Ältere 64–73 J., 3 Gruppen | 3D-MOT vs. anderes visuelles Training vs. keines | Wahrnehmung biologischer Bewegung in 4 m verbessert, Kontrollen nicht | klein; laut Vater et al. evtl. überlappend mit Legault 2013 |
| Legault et al. (2013) | 20 jung + 20 alt | 5 Wochen | gleiche Trainingsgewinne | nur die Aufgabe selbst |
| Parsons et al. (2016) | 20 Studierende | 10 Sitzungen vs. passive Kontrolle | Aufmerksamkeit, Verarbeitungsgeschwindigkeit, Arbeitsgedächtnis, qEEG verbessert | passive Kontrolle; Kritik an der Wahl p < .01 (Vater et al.) |
| Romeas, Guldner & Faubert (2016) | 23 Uni-Fußballer | 10 Sitzungen vs. aktive + passive Kontrolle | Passentscheidungen besser (nicht Dribbling/Schuss) | klein; Kontrollgruppen nachträglich zusammengelegt |
| Harris et al. (2020, Front. Psychol.) | 84 | randomisiert, 4 Gruppen | kein Nah-, kein Ferntransfer; evtl. Arbeitsgedächtnis | – |
| Harenberg et al. (2022) | 31 (NCAA D-III) | randomisiert, 10 Sitzungen/4 Wochen | MOT ↑ (ηp² = 0,43); Entscheidungen/Nahtransfer n. s. (ηp² = 0,01–0,03) | – |
| Michaels et al. (2022) | junge Erwachsene (23–33 J.) | 10 × 30 min vs. aktive Kontrolle | UFOV (Useful Field of View) verbessert | nur Labortest |
| Michaels et al. (2023) | 34 (20 jung, 14 alt) | Pilot-RCT, 10 × 30 min | Bremsdistanz im Simulator: nur Trend (p = 0,08); kein UFOV-Transfer | pandemiebedingt abgebrochen, klein |
| Romeas, Goujat, Faubert & Labbé (2025) | 62 Akademiespieler | randomisiert (30 vs. 32), Dual-Task-3D-MOT | MOT ↑; **kein** Nah-/Ferntransfer | Nicht-Replikation von Romeas 2016 |

Anwendung in klinischen Kontexten (nur zur Einordnung, keine Wirksamkeitsaussage für unsere App): Schüler mit
neurologischen Entwicklungsstörungen, 15 Sitzungen (Tullo et al., 2018); Pilotstudie bei Multipler Sklerose
(Harenberg et al., 2021).

**1.4 Kritische Übersichten – Evidenz für Ferntransfer: schwach**

- Vater, Gray & Holcombe (2021) werteten 29 Publikationen aus. Von 16 Interventionsstudien hatten nur 10
  Kontrollgruppe *und* Transfermaß, **keine** war präregistriert. Von drei Studien mit realitätsnahen Aufgaben
  fanden zwei keinen Effekt. Die zugrunde liegenden Fähigkeiten sind laut Review „nicht die vom Hersteller
  beworbenen“; die Halbfeld-Spezifität spricht gegen eine „Arbeitsgedächtnis-Überlastung“.
- Harris, Wilson & Vine (2018; 43 Studien zu kommerziellen kognitiven Trainingsgeräten) fanden kaum Belege
  für Ferntransfer auf Sportaufgaben, vor allem wegen fehlender Sportsimulation, kleiner Stichproben und
  fehlender unabhängiger Replikation.
- Wichtig: NeuroTracker-Studien nutzten stereoskopisches 3D auf großen Displays (≈ 42–46° Sehwinkel). Ein
  2D-Tablet bei 40 cm deckt nur ≈ 25–37° ab (Abschnitt 4). Die Ergebnisse sind daher nur eingeschränkt
  übertragbar. Studien zu genau unserer 2D-Tablet-Variante **fehlen**.

**1.5 Protokoll-Parameter aus der Literatur**

| Parameter | NeuroTracker / 3D-MOT | Quelle |
|---|---|---|
| Kugeln / Ziele | 8 Kugeln, 4 Ziele (Ältere im Labor: 9 Kugeln, 3 Ziele) | Faubert 2013; Vater et al. 2021; Legault et al. 2013 |
| Ablauf | statisch → Ziele 2 s markiert → Tracking → Auswahl → Feedback | Vater et al. 2021; Legault et al. 2013 (2,5 s statisch + 2 s Markierung) |
| Trackingdauer | **8 s** (Labor mit Älteren: 10 s; Alvarez & Franconeri: 6 s) | Faubert 2013; Legault et al. 2013 |
| Staircase | **1-up/1-down** auf Geschwindigkeit: schneller nach „alle richtig“, sonst langsamer | Faubert 2013 |
| Schrittweite | **0,05 log-Einheiten** (≈ ×1,12), Ende nach 8 Umkehrpunkten → 50-%-Schwelle | Legault et al. 2013 |
| Startgeschwindigkeit | 3,75 cm/s bei 57 cm ≈ **3,8°/s** | Legault et al. 2013 |
| Sitzung | ≈ 8 min; „Core Session“ = **20 Durchgänge**; 3 × 20 Durchgänge in 30 min | Faubert 2013; Mangine et al. 2014; Michaels et al. 2023 |
| Umfang | bis 15 Sitzungen, max. 3/Tag; in Studien 5 bis 76 Sitzungen (meist ≈ 10–15), Gesamttrainingszeit 90–600 min | Faubert 2013; Vater et al. 2021 (Tab. 5) |

**1.6 Blickstrategie (Zentroid-Fixation) – Evidenz: mittel**

- Beim Verfolgen von 3 aus 8 Punkten lag der Blick öfter nahe dem **Zentrum des Ziel-Dreiecks** als auf
  einzelnen Zielen (Fehd & Seiffert, 2008).
- Center-Looking tritt unabhängig von Geschwindigkeit und Objektgröße auf, bis an die Grenze der peripheren
  Sichtbarkeit. Probanden wechseln oft zwischen Zentrum und Zielen, und das Einbeziehen des Zentrums
  **verbessert** die Leistung (Fehd & Seiffert, 2010).
- **Ein vorgeschriebenes Blickmuster verschlechtert die Leistung** (Vater et al., 2021, mit Verweis auf Fehd &
  Seiffert, 2010). Adaptives Training veränderte die Blickstrategie nicht (Harris, Wilson, Crowe & Vine, 2020).
  Einen Blick-Tipp sollte man daher **anbieten, aber nicht erzwingen**.

**1.7 Relevanz für Autofahren und Sport**

- **Zusammenhang ja, Trainingswirkung nicht belegt.** In einer Doppelaufgabe im Fahrsimulator verschlechterte
  das Fahren das Tracking, und das Tracking verschlechterte Abstand und Spurhaltung (Lochner & Trick, 2014).
  3D-MOT-Schwellen korrelierten bei älteren Fahrenden mit Simulatormaßen (Woods-Fry et al., 2017). Als
  Screening sagte ein kurzer MOT-Test Risikofahrer aber nicht besser voraus als der UFOV-Test. Bester
  Einzelprädiktor war UFOV-Subtest 2 mit AUC = 0,84 (Bowers et al., 2013; N = 47, 58–95 J.).
- Die bisher stärkste Evidenz für „kognitives Training → weniger Unfälle“ stammt aus der ACTIVE-Studie
  (N = 908, M = 73 J.). Speed-of-Processing-Training senkte die Rate selbstverschuldeter Unfälle über ≈ 6 Jahre
  um ≈ 50 % (RR = 0,57; 95 %-KI 0,34–0,96) (Ball et al., 2010). Das war **UFOV-artiges** Training, kein MOT,
  und lässt sich **nicht** auf den Kugel-Detektiv übertragen.
- **Sport:** Die MOT-Geschwindigkeit korrelierte bei 12 NBA-Spielern mit Assists und Steals (r ≈ 0,77–0,78;
  Mangine et al., 2014). Das ist eine sehr kleine Korrelationsstudie. Zum Transfer siehe 1.3/1.4.

**Evidenzbewertung Kugel-Detektiv**

| Aussage | Evidenz |
|---|---|
| MOT ist ein valides Laborparadigma mit klaren Kapazitätsgrenzen (Tempo, Anzahl, Abstand) | **stark** |
| Üben verbessert die MOT-Leistung selbst, auch bei Älteren | **stark** (für 3D-MOT; für 2D-Tablet plausibel, nicht spezifisch geprüft) |
| Nahtransfer (Aufmerksamkeits-/Arbeitsgedächtnistests) | **schwach** (gemischt, methodische Mängel) |
| Ferntransfer auf Sportleistung | **schwach** (eine kleine positive Studie, ≥ 2 Nicht-Replikationen) |
| Ferntransfer auf reales Autofahren/Unfallrisiko | **fehlend** (nur ein Pilot mit Trend im Simulator) |
| Zentrumsblick hilft beim Tracking | **mittel** |

### Nutzen im Alltag

Mehrere Dinge gleichzeitig im Blick zu behalten ist alltagsnah: Fahrzeuge und Fußgänger an einer Kreuzung,
Mitspieler im Mannschaftssport, Kinder auf dem Spielplatz, Menschenmengen. MOT-Leistung hängt mit solchen
Situationen theoretisch zusammen und korreliert teils mit Fahrsimulator-Maßen. **Dass Üben am Tablet diese
Situationen verbessert, ist nicht gezeigt.** Realistischer Nutzen: ein fordernder, gut dosierbarer
Aufmerksamkeitsreiz mit sichtbarem Lernfortschritt, Motivation und Selbstbeobachtung (z. B. Tagesform).

### Empfehlungen für das Übungsdesign

Umrechnungen in CSS-px gelten für ein iPad mit 264 ppi bei 40 cm (≈ 36 CSS-px/°); Details in Abschnitt 4.

| Parameter | Einstieg / Senioren | Standard | Fortgeschritten | Begründung |
|---|---|---|---|---|
| Kugeln gesamt | 6 | 8 | 8–10 | NeuroTracker 8 |
| Ziele | 1–2 | 3 | 4 (danach 5) | Kapazität ≈ 3 (ältere) bzw. ≈ 4 (junge) Personen |
| Kugel-Ø | 12 mm (≈ 62 px, 1,7°) | 9–10 mm (≈ 47–52 px, 1,3–1,4°) | 9 mm | Touch-Minimum ≈ 9 mm (Abschnitt 3); Alvarez & Franconeri 1,25° |
| Markierung | 1 s statisch + 2,5 s Ziele markiert | 1 s + 2 s | 1 s + 2 s | NeuroTracker 2 s |
| Trackingdauer | 5–6 s | 8 s | 8–10 s | Ältere leiden besonders unter langer Dauer |
| Startgeschwindigkeit | 3°/s (≈ 110 px/s) | 4°/s (≈ 145 px/s) | letzte Schwelle × 0,8 | Legault: 3,8°/s |
| Max. Geschwindigkeit | 15°/s | 25°/s | 25–30°/s | Tablet-Breite ≈ 25–37° |
| Mindestabstand (Mitte–Mitte) | ≥ 3 Ø (≈ 4–5°) | ≥ 2,5 Ø | ≥ 2 Ø (enge Begegnungen als Schwierigkeitshebel) | Bae & Flombaum; Franconeri et al. |
| Ziele verteilt | links + rechts | zufällig | optional alle in einer Hälfte | Halbfeld-Effekt |

- **Bewegungsmodell:** konstante Geschwindigkeit pro Durchgang, sanfte zufällige Kurven (Drehrate
  ≤ 90°/s) und **weiche Abstoßung** von Rand und Nachbarn. Harte elastische Stöße (wie in der
  skilldrills-Vorlage) meiden, weil sie Ziel-Distraktor-Verwechslungen provozieren. Nur dt-basiert rechnen
  (px/s), unabhängig von der Bildwiederholrate.
- **Adaptive Schwierigkeit:** Staircase auf die Geschwindigkeit. Ein Durchgang zählt als richtig, wenn
  **alle** Ziele richtig sind (Raten bei 4 aus 8: 1/70).
  - *NeuroTracker-kompatibel:* 1-up/1-down, Schritt 0,05 log (×1,122 bzw. ÷1,122). Konvergiert auf 50 %
    „alle richtig“ (Levitt, 1971).
  - *Empfohlen für Laien und Senioren (motivierender):* gewichtetes Up-down (Kaernbach, 1991) mit Ziel
    ≈ 75 %: nach Erfolg ×1,059 (+0,025 log), nach Fehler ÷1,189 (−0,075 log). Das Verhältnis 3 : 1 folgt aus
    p/(1 − p) = 0,75/0,25.
  - Schwelle = geometrisches Mittel der letzten 6 von 8 Umkehrpunkten. Ist die Schwelle über 3 Sitzungen
    stabil, Ziele +1 und Startgeschwindigkeit × 0,7.
- **Sitzung:** 20 Durchgänge (≈ 5–7 min), höchstens 2–3 Sitzungen pro Tag. Als „Programm“ 10–15 Sitzungen
  über 3–5 Wochen mit Verlaufsgrafik (typische Studiendosis).
- **Antwortphase:** Kugeln stoppen, Ziele ohne Zeitdruck antippen (genau N Auswahlen, Rückgängig möglich),
  danach 1–1,5 s Auflösung (richtige, falsche und übersehene Kugeln markieren). Markierung nicht nur über Farbe,
  sondern zusätzlich über Ring/Pulsieren (Farbsehschwäche).
- **Blick-Tipp (optional):** „Lassen Sie den Blick locker in der Mitte der markierten Gruppe ruhen, statt
  jeder Kugel einzeln nachzuspringen.“ Keine Fixationspflicht.
- **Messgrößen speichern:** Geschwindigkeitsschwelle (°/s) je Zielanzahl, Anteil korrekt identifizierter
  Ziele, Anzahl enger Begegnungen (< 4°) pro Durchgang, dazu Gerät, Bildwiederholrate und angenommener Abstand.
  Den Verlauf speichern, nicht nur den Bestwert.

### Ehrliche Formulierung für Laien

> „Beim Kugel-Detektiv üben Sie, mehrere bewegte Objekte gleichzeitig im Blick zu behalten – darin werden Sie
> mit Übung nachweislich besser, in jedem Alter. Ob sich das auch auf Sport oder Straßenverkehr überträgt, ist
> wissenschaftlich bisher nicht belegt.“

### Quellen

- Alvarez, G. A., & Cavanagh, P. (2005). Independent resources for attentional tracking in the left and right visual hemifields. *Psychological Science, 16*(8), 637–643. https://doi.org/10.1111/j.1467-9280.2005.01587.x
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13):14, 1–10. https://doi.org/10.1167/7.13.14
- Bae, G. Y., & Flombaum, J. I. (2012). Close encounters of the distracting kind: Identifying the cause of visual tracking errors. *Attention, Perception, & Psychophysics, 74*(4), 703–715. https://doi.org/10.3758/s13414-011-0260-1
- Ball, K., Edwards, J. D., Ross, L. A., & McGwin, G., Jr. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. *Journal of the American Geriatrics Society, 58*(11), 2107–2113. https://doi.org/10.1111/j.1532-5415.2010.03138.x
- Bowers, A. R., Anastasio, R. J., Sheldon, S. S., O'Connor, M. G., Hollis, A. M., Howe, P. D., & Horowitz, T. S. (2013). Can we improve clinical prediction of at-risk older drivers? *Accident Analysis & Prevention, 59*, 537–547. https://doi.org/10.1016/j.aap.2013.06.037
- Chen, W.-Y., Howe, P. D., & Holcombe, A. O. (2013). Resource demands of object tracking and differential allocation of the resource. *Attention, Perception, & Psychophysics, 75*(4), 710–725. https://doi.org/10.3758/s13414-013-0425-1
- Faubert, J. (2013). Professional athletes have extraordinary skills for rapidly learning complex and neutral dynamic visual scenes. *Scientific Reports, 3*, 1154. https://doi.org/10.1038/srep01154
- Faubert, J., & Sidebottom, L. (2012). Perceptual-cognitive training of athletes. *Journal of Clinical Sport Psychology, 6*(1), 85–102. https://doi.org/10.1123/jcsp.6.1.85
- Fehd, H. M., & Seiffert, A. E. (2008). Eye movements during multiple object tracking: Where do participants look? *Cognition, 108*(1), 201–209. https://doi.org/10.1016/j.cognition.2007.11.008
- Fehd, H. M., & Seiffert, A. E. (2010). Looking at the center of the targets helps multiple object tracking. *Journal of Vision, 10*(4):19, 1–13. https://doi.org/10.1167/10.4.19
- Franconeri, S. L., Jonathan, S. V., & Scimeca, J. M. (2010). Tracking multiple objects is limited only by object spacing, not by speed, time, or capacity. *Psychological Science, 21*(7), 920–925. https://doi.org/10.1177/0956797610373935
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x
- Green, C. S., & Bavelier, D. (2006). Enumeration versus multiple object tracking: The case of action video game players. *Cognition, 101*(1), 217–245. https://doi.org/10.1016/j.cognition.2005.10.004
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Harenberg, S., McCarver, Z., Worley, J., Murr, D., Vosloo, J., Kakar, R. S., McCaffrey, R., Dorsch, K., & Höner, O. (2022). The effectiveness of 3D multiple object tracking training on decision-making in soccer. *Science and Medicine in Football, 6*(3), 355–362. https://doi.org/10.1080/24733938.2021.1965201
- Harenberg, S., St Onge, J., Robinson, J., Eguakun, O., Feinstein, A., Dorsch, K., Kakar, R. S., Abdulhakim, R., Rehman, Z., Shawush, M., & Pillay, V. (2021). Effectiveness of three-dimensional multiple-object tracking in patients with multiple sclerosis: A pilot trial. *International Journal of MS Care, 23*(4), 143–149. https://doi.org/10.7224/1537-2073.2020-007
- Harris, D. J., Wilson, M. R., & Vine, S. J. (2018). A systematic review of commercial cognitive training devices: Implications for use in sport. *Frontiers in Psychology, 9*, 709. https://doi.org/10.3389/fpsyg.2018.00709
- Harris, D. J., Wilson, M. R., Crowe, E. M., & Vine, S. J. (2020). Examining the roles of working memory and visual attention in multiple object tracking expertise. *Cognitive Processing, 21*(2), 209–222. https://doi.org/10.1007/s10339-020-00954-y
- Harris, D. J., Wilson, M. R., Smith, S. J. R., Meder, N., & Vine, S. J. (2020). Testing the effects of 3D multiple object tracking training on near, mid and far transfer. *Frontiers in Psychology, 11*, 196. https://doi.org/10.3389/fpsyg.2020.00196
- Holcombe, A. O., & Chen, W.-Y. (2012). Exhausting attentional tracking resources with a single fast-moving object. *Cognition, 123*(2), 218–228. https://doi.org/10.1016/j.cognition.2011.10.003
- Holcombe, A. O., & Chen, W.-Y. (2013). Splitting attention reduces temporal resolution from 7 Hz for tracking one object to <3 Hz when tracking three. *Journal of Vision, 13*(1):12. https://doi.org/10.1167/13.1.12
- Kaernbach, C. (1991). Simple adaptive testing with the weighted up-down method. *Perception & Psychophysics, 49*(3), 227–229. https://doi.org/10.3758/BF03214307
- Legault, I., Allard, R., & Faubert, J. (2013). Healthy older observers show equivalent perceptual-cognitive training benefits to young adults for multiple object tracking. *Frontiers in Psychology, 4*, 323. https://doi.org/10.3389/fpsyg.2013.00323
- Legault, I., & Faubert, J. (2012). Perceptual-cognitive training improves biological motion perception: Evidence for transferability of training in healthy aging. *NeuroReport, 23*(8), 469–473. https://doi.org/10.1097/WNR.0b013e328353e48a
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America, 49*(2B), 467–477. https://doi.org/10.1121/1.1912375
- Lochner, M. J., & Trick, L. M. (2014). Multiple-object tracking while driving: The multiple-vehicle tracking task. *Attention, Perception, & Psychophysics, 76*(8), 2326–2345. https://doi.org/10.3758/s13414-014-0694-3
- Mangine, G. T., Hoffman, J. R., Wells, A. J., Gonzalez, A. M., Rogowski, J. P., Townsend, J. R., Jajtner, A. R., Beyer, K. S., Bohner, J. D., Pruna, G. J., Fragala, M. S., & Stout, J. R. (2014). Visual tracking speed is related to basketball-specific measures of performance in NBA players. *Journal of Strength and Conditioning Research, 28*(9), 2406–2414. https://doi.org/10.1519/JSC.0000000000000550
- Meyerhoff, H. S., Papenmeier, F., & Huff, M. (2017). Studying visual attention using the multiple object tracking paradigm: A tutorial review. *Attention, Perception, & Psychophysics, 79*(5), 1255–1274. https://doi.org/10.3758/s13414-017-1338-1
- Michaels, J., Chaumillon, R., Mejia-Romero, S., Bernardin, D., & Faubert, J. (2022). Three-dimensional multiple object tracking improves young adult cognitive abilities associated with driving: Evidence for transfer to the useful field of view. *NeuroReport, 33*(12), 504–508. https://doi.org/10.1097/WNR.0000000000001807
- Michaels, J., Chaumillon, R., Mejia-Romero, S., Bernardin, D., & Faubert, J. (2023). Can three-dimensional multiple object tracking training be used to improve simulated driving performance? A pilot study in young and older adults. *Journal of Cognitive Enhancement, 7*(1–2), 112–127. https://doi.org/10.1007/s41465-023-00260-3
- Parsons, B., Magill, T., Boucher, A., Zhang, M., Zogbo, K., Bérubé, S., Scheffer, O., Beauregard, M., & Faubert, J. (2016). Enhancing cognitive function using perceptual-cognitive training. *Clinical EEG and Neuroscience, 47*(1), 37–47. https://doi.org/10.1177/1550059414563746
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122
- Romeas, T., Goujat, M., Faubert, J., & Labbé, D. (2025). No transfer of 3D-Multiple Object Tracking training on game performance in soccer: A follow-up study. *Psychology of Sport and Exercise, 76*, 102770. https://doi.org/10.1016/j.psychsport.2024.102770
- Romeas, T., Guldner, A., & Faubert, J. (2016). 3D-Multiple Object Tracking training task improves passing decision-making accuracy in soccer players. *Psychology of Sport and Exercise, 22*, 1–9. https://doi.org/10.1016/j.psychsport.2015.06.002
- Sekuler, R., McLaughlin, C., & Yotsumoto, Y. (2008). Age-related changes in attentional tracking of multiple moving objects. *Perception, 37*(6), 867–876. https://doi.org/10.1068/p5923
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983
- Trick, L. M., Audet, D., & Dales, L. (2003). Age differences in enumerating things that move: Implications for the development of multiple-object tracking. *Memory & Cognition, 31*(8), 1229–1237. https://doi.org/10.3758/BF03195806
- Trick, L. M., Perl, T., & Sethi, N. (2005). Age-related differences in multiple-object tracking. *The Journals of Gerontology: Series B, 60*(2), P102–P105. https://doi.org/10.1093/geronb/60.2.P102
- Tullo, D., Guy, J., Faubert, J., & Bertone, A. (2018). Training with a three-dimensional multiple object-tracking (3D-MOT) paradigm improves attention in students with a neurodevelopmental condition: A randomized controlled trial. *Developmental Science, 21*(6), e12670. https://doi.org/10.1111/desc.12670
- Vater, C., Gray, R., & Holcombe, A. O. (2021). A critical systematic review of the Neurotracker perceptual-cognitive training tool. *Psychonomic Bulletin & Review, 28*(5), 1458–1483. https://doi.org/10.3758/s13423-021-01892-2 (Volltext: https://pmc.ncbi.nlm.nih.gov/articles/PMC8500884/)
- Woods-Fry, H., Deut, S., Collin, C. A., Gagnon, S., Faubert, J., Bédard, M., & Marshall, S. (2017). Three-dimensional multiple object tracking speed thresholds are associated with measures of simulated driving performance in older drivers. *Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 61*(1), 42–45. https://doi.org/10.1177/1541931213601505 (bibliografisch und über Titel verifiziert, Volltext nicht eingesehen)

---

## 2. Scharf in Bewegung (glatte Augenfolgebewegung und dynamische Sehschärfe)

### Was wird trainiert

- **Glatte Augenfolgebewegung (Smooth Pursuit):** Die Augen folgen einem bewegten Ziel kontinuierlich, damit
  sein Bild möglichst ruhig auf der Netzhautmitte (Fovea) bleibt. Unvollständiges Folgen wird durch
  Aufholsakkaden korrigiert (Collewijn & Tamminga, 1984).
- **Dynamische Sehschärfe (DVA):** die Fähigkeit, feine Details eines *bewegten* Objekts zu erkennen, während
  die Augen folgen (Ludvigh & Miller, 1958). Sie unterscheidet sich von der **statischen Sehschärfe**
  (ruhendes Sehzeichen, Visus). Personen mit gleicher statischer Sehschärfe können sehr verschiedene DVA haben
  (Ludvigh & Miller, 1958; Burg, 1966).
- Abgrenzung: In der Klinik bezeichnet „DVA“ oft einen **Kopfbewegungs-Test** zur Prüfung des
  vestibulo-okulären Reflexes (Erdinest & London, 2022). Unsere Übung betrifft die **Objektbewegungs-DVA**
  bei ruhigem Kopf.

### Was sagt die Forschung

**2.1 Geschwindigkeitsabhängigkeit – Evidenz: stark**

- Die Sehschärfe verschlechtert sich mit steigender Winkelgeschwindigkeit deutlich (untersucht 10–170°/s).
  Die Schwelle folgt etwa *Schwelle = a + b·v³*, bei niedrigen Geschwindigkeiten also wenig Verlust, dann
  stark beschleunigt. Ursache ist die verbleibende Netzhautbewegung durch unvollkommenes Folgen (Ludvigh &
  Miller, 1958). Der Verlauf ist für horizontale, vertikale und Beobachterrotation ähnlich, und mehr
  Beleuchtung hilft (Miller, 1958).
- **Bereich, der auf Tablets erreichbar ist:** Im computerbasierten Test DinVA 3.0 (N = 33; Palomar-Landolt-C;
  2 m Abstand; 100-Hz-Monitor) sank der DVA-Dezimalwert von 0,584 (1,14°/s) über 0,496 (8,58°/s) auf 0,377
  (14,1°/s). Horizontal war besser als schräg, die Test-Retest-Korrelation lag bei r = 0,72–0,92 (Quevedo et
  al., 2012).
- Die Kontrastempfindlichkeit für mittlere und hohe Ortsfrequenzen sinkt mit der Geschwindigkeit (0–90°/s),
  besonders bei kurzer Darbietung (Long & Homolka, 1992). Kleine Ziele und kurze Darbietung sind bei hoher
  Geschwindigkeit überproportional schwierig (Long & Zavod, 2002).

**2.2 Trainierbarkeit der DVA – Evidenz: mittel (für die geübte Aufgabe), Transfer: fehlend**

- 54 männliche Studierende, DVA bei 60/90/120/150°/s und 200/400/600 ms. Nach vier 30-min-Übungssitzungen
  zeigten sich **hoch signifikante Trainingseffekte**, am stärksten bei anfangs Schwächeren (Long & Rourke,
  1989).
- Bei freier Kopfbewegung war Training „sehr effektiv“, besonders in den schwierigsten Bedingungen.
  Uni-Sportler unterschieden sich kaum von Nicht-Sportlern und profitierten gleich (Long & Riggs, 1991).
- N = 60, zwei Sitzungen: Die DVA verbesserte sich von Sitzung 1 zu 2, das Antizipations-Timing nicht. Beide
  Fähigkeiten korrelierten nicht. „Wo“ (Vorhersage) und „Was“ (Detailerkennung) sind also getrennte
  Fähigkeiten (Long & Vogel, 1998).
- Aktuelle digitale Programme: Ein randomisiert-doppelblindes digitales Sport-Sehtraining (N = 32,
  3 × 20 min/Woche über 3 Wochen) brachte **keine** signifikante Verbesserung gegenüber Placebo, auch nicht bei
  der DVA (Shekar et al., 2021). Eine Metaanalyse zu Videospielen (32 Studien) fand Prä-post-Effekte von
  g = 1,02, u. a. bei der DVA (Cantó-Cerdán & Martínez-Hergueta, 2026). Das sind Labortests, und der
  „Lerneffekt“ ist zu beachten (Guo et al., 2025).

**2.3 Sportler, Alter und der Zusammenhang mit der Folgebewegung**

- **Sportler – Evidenz: mittel (Querschnitt):** 53 Uni-Athleten und 46 Nicht-Athleten wurden mit einem
  Landolt-Ring bis 300°/s getestet. Bei Lücken von 14′ und 8′ erkannten Athleten die Lücke bei signifikant
  höheren Geschwindigkeiten (Ishigaki & Miyao, **1993**).
- **Der Vorteil liegt in den Augenbewegungen:** 8 Baseballspieler vs. 8 Nicht-Sportler. Mit freien
  Augenbewegungen lagen die Schwellen bei 404 ± 74 vs. 315 ± 69°/s (kleines C) bzw. 545 ± 74 vs. 417 ± 97°/s
  (großes C). Bei Fixation gab es keinen Unterschied (Uchida et al., 2012). Baseballspieler bewegen die Augen
  schneller und mit kürzerer Latenz (Uchida et al., 2013).
- **Pursuit-Gain allein ist nicht alles:** Bei 23 Baseballspielern (getestet mit 50 und 70°/s) ging gute DVA
  bei 70°/s mit kleinem Positionsfehler des Blicks und wenigen Rückwärtssakkaden einher. Der Zusammenhang mit dem Gain verschwand,
  wenn man den Positionsfehler kontrollierte (Palidis et al., 2017). Entscheidend ist, *das Auge aufs Ziel zu
  bekommen*, per Folgebewegung **und** Sakkaden.
- **Alter – Evidenz: mittel bis stark:** Bei 826 Personen (5–92 J.; Landolt-Lücke 40′) erreichte die DVA mit
  ≈ 15 Jahren ihr Maximum und sank ab ≈ 20 Jahren mit konstanter Rate (Ishigaki & Miyao, **1994**; vgl.
  Burg & Hulbert, 1961). Ältere (M = 67,6 J.) hatten fast überall schlechtere DVA als Junge (M = 19,6 J.;
  30–120°/s). **Mit Leuchtdichte-Ausgleich verschwand der Unterschied weitgehend.** Die Ursache ist also
  vermutlich weniger Licht auf der Netzhaut, nicht die Augenmotorik (Long & Crambert, 1990). Für die Übung
  heißt das: **hohe Helligkeit und hoher Kontrast** helfen Senioren.
- **Folgebewegung und Alter:** Ältere zeigen ab 10°/s geringere Folgegeschwindigkeit und längere Latenzen
  (Sharpe & Sylvester, 1978), geringeren Gain bei allen Geschwindigkeiten (75–93 vs. 18–43 J.; Moschner &
  Baloh, 1994) und eine schwächere Beschleunigung beim Start der Folgebewegung (Morrow & Sharpe, 1993).

**2.4 Glatte Folgebewegung: Grundlagen und Trainierbarkeit bei Gesunden**

- **Gain < 1, sinkt mit Geschwindigkeit und Unvorhersagbarkeit:** Der Gain lag immer unter 0,95 und sank
  monoton mit steigender Zielgeschwindigkeit. Sakkaden ergänzen die Folgebewegung. Ein strukturierter
  Hintergrund senkte den Gain um ≈ 10 % (horizontal) bzw. ≈ 20 % (vertikal) (Collewijn & Tamminga, 1984). Die
  individuelle Obergrenze ist hoch: ≈ 90 % Gain bis 100°/s bei 5 Personen, bei einer nur 60 % (Meyer,
  Lasker & Robinson, 1985).
- **Vorhersagbarkeit:** Trotz ≈ 150 ms Latenz können Menschen vorhersagbare Ziele *ohne Verzögerung* verfolgen
  (Bahill & McDonald, 1983). Der Tracking-Fehler sank innerhalb von 100–200 s Übung von 0,5 auf 0,1 deg²,
  und Profisportler hatten schon zu Beginn deutlich kleinere Fehler (McHugh & Bahill, 1985). Übersicht zur
  prädiktiven Folgebewegung: Kowler et al. (2019).
- **Summe von Sinuswellen = „unvorhersagbar“:** Bei einem Reiz aus vier Sinuskomponenten (0,11/0,24/0,37 Hz
  plus eine variable F4 von 0,39–2,08 Hz, Spitzengeschwindigkeit ±3,3°/s) lag der Gain bei F4 = 0,39 Hz im
  Mittel bei 0,92. Er fiel auf 0,53, sobald F4 = 1,56 Hz betrug (Barnes, Donnelly & Eason, 1987).
- **Trainierbarkeit – Evidenz: schwach bis mittel (kleine Laborstudien):** Kurzes Training mit einem
  quasi-zufällig bewegten Ziel („two 6-min training sessions on three subsequent days“) verbesserte die
  geschlossene Folgebewegung signifikant, auch 5 Tage nach der letzten Sitzung noch (N = 10; Kontrollgruppe
  N = 10 nur mit 20 min Pause) (Eibenberger, Ring & Haslwanter, 2012). Mit Belohnung
  stieg der Gain während kurzer Zielausblendung von 0,59 auf 0,89 nach 8–10 Sitzungen (Madelain & Krauzlis,
  2003). Das sind Effekte in Eyetracking-Laboraufgaben. Alltagsnutzen wurde nicht geprüft.

**2.5 Klinische Kontexte (nur erwähnen – keine Heilversprechen)**

Folgebewegungs-Training wird in der Neurorehabilitation erforscht: randomisierte Studien bei Neglect nach
Schlaganfall (Kerkhoff et al., 2013, 2014) sowie okulomotorisches Training nach leichtem Schädel-Hirn-Trauma
(Thiagarajan & Ciuffreda, 2014; N = 12). Diese Programme laufen unter fachlicher Anleitung und mit anderen
Protokollen. Unsere App ist **kein** Therapie- oder Diagnoseinstrument und darf nicht so beworben werden.
Formulierungen in Richtung Diagnose oder Therapie sollten vermieden werden; die Einordnung als Medizinprodukt
sollte gegebenenfalls rechtlich geprüft werden.

**2.6 Relevanz für Autofahren – Evidenz: schwach**

- In Burgs kalifornischer Studie (N = 17 769) war die DVA unter den Sehtests „bei Weitem“ am engsten mit der
  Fahrbilanz verknüpft (Burg, 1971). In der Reanalyse zeigten sich konsistente Zusammenhänge mit Unfallraten
  nur bei über 54-Jährigen, und der **Vorhersagewert für den einzelnen Fahrer blieb sehr gering** (Hills &
  Burg, 1977).
- Im Simulator sagte die „Geschwindigkeitsanfälligkeit“ der DVA die Gefahrenwahrnehmung am besten voraus
  (Wilkins et al., 2013; N = 60). Überblick zu Sehen und Fahren: Owsley & McGwin (2010).

**Evidenzbewertung Scharf in Bewegung**

| Aussage | Evidenz |
|---|---|
| DVA sinkt mit Geschwindigkeit und kurzer Darbietung; DVA ≠ statischer Visus | **stark** |
| Die DVA-Laboraufgabe verbessert sich mit Übung | **mittel** (ältere Studien, teils ohne Kontrollgruppe) |
| Sportler haben bessere DVA, vor allem durch bessere Augenbewegungen | **mittel** (Querschnitt, kleine N) |
| DVA und Folgebewegung nehmen mit dem Alter ab; Helligkeit gleicht teilweise aus | **mittel–stark** |
| Folgebewegung bei Gesunden kurzfristig trainierbar | **schwach–mittel** |
| Transfer auf Alltag, Verkehr oder Sport durch Tablet-Übung | **fehlend** |

### Nutzen im Alltag

Bewegte Details zu erkennen braucht man beim Lesen von Schildern aus dem fahrenden Auto, bei Hausnummern vom
Rad aus, beim Ball im Sport oder bei einer Anzeigetafel. Die Übung macht bewusst, dass „scharf sehen“ bei
Bewegung eine eigene Fähigkeit ist, und trainiert die geübte Aufgabe. **Eine Verbesserung im Alltag ist nicht
nachgewiesen.** Für Optiker relevant: Eine gut korrigierte Sehschärfe (bei Presbyopie inkl. Nahkorrektur für
≈ 40 cm) und gute Beleuchtung sind Voraussetzungen. Die Übung ersetzt keine Refraktionsbestimmung.

### Empfehlungen für das Übungsdesign

Umrechnungen gelten für ein iPad mit 264 ppi bei 40 cm (≈ 36 CSS-px/°); Details in Abschnitt 4.

| Parameter | Empfehlung | Begründung |
|---|---|---|
| Sehzeichen | Landolt-C mit ISO-8596-Proportionen: Strichbreite = Lücke = 1/5 Außendurchmesser | ISO 8596:2017 |
| Richtungen | 4 (↑ ↓ ← →) für Touch-Antwort; 8 (inkl. diagonal) optional für Geübte | ISO: 8 Orientierungen; 4-AFC bedeutet 25 % Rate-Wahrscheinlichkeit |
| Startgröße | Lücke **10′** (≈ 6 CSS-px, Ring ≈ 30 px; Visus-Äquivalent 0,1); Senioren 14–20′ | liegt sicher über der Pixel- und Bewegungsunschärfe |
| Minimalgröße | Lücke ≥ 3–4′, **nie unter 2 CSS-px** (≈ 3,3′ bei 40 cm) | Pixelraster und Anti-Aliasing |
| Träger-Ball | Ø ≥ 2 × Ringdurchmesser, mind. 12 mm; hell, C schwarz (Kontrast ≈ 100 %) | Kontrast; Senioren: Helligkeit (Long & Crambert) |
| Hintergrund | ruhig, einfarbig; Textur nur als Schwierigkeitsstufe | strukturierter Hintergrund senkt den Gain um 10–20 % |
| Geschwindigkeit | Start 4–5°/s (≈ 145–180 px/s), adaptiv 3–30°/s | ≥ 30°/s durchquert ein Tablet in < 1 s |
| Darbietung C | Start 500 ms, adaptiv bis 150–200 ms | Long & Rourke: 200–600 ms |
| C-Einsatz | zufällig 0,6–2,0 s nach Bewegungsbeginn; nicht in den 300 ms um Richtungswechsel oder Rand | Folgebewegung soll stabil laufen (Latenz ≈ 150 ms) |
| Antwort | 4 große Richtungstasten (≥ 12 mm) oder Wischgeste, ohne Zeitdruck, danach Feedback | Touch-Größen (Abschnitt 3) |
| Staircase | auf Geschwindigkeit bei fester C-Größe: 2-down/1-up (→ 70,7 %) oder gewichtet mit Ziel 75 %; Schritt 0,05–0,1 log | bei 4-AFC nicht 1-up/1-down (50 % liegt zu nah am Raten) |
| Block | 20–30 Durchgänge (≈ 3 min), 1–2 Blöcke | kurz halten, Ermüdung vermeiden |

**Pfadformen als Stufen (vorhersagbar → unvorhersagbar):**

1. Gerade horizontale Bahnen mit konstanter Geschwindigkeit (am leichtesten, horizontal besser als schräg).
2. Sinus in einer Achse, 0,2–0,4 Hz.
3. 2D-Lissajous-Figur (x und y mit unterschiedlichen Frequenzen).
4. **Summe von Sinuswellen:** pro Achse 3 nicht-harmonische Komponenten, z. B. x: 0,11/0,23/0,37 Hz,
   y: 0,13/0,29/0,41 Hz, mit zufälligen Phasen. Die Amplituden fallen mit der Frequenz, damit der Ball in
   ±40 % der Bildschirmfläche bleibt.
5. Schwer: zusätzlich eine Komponente mit 0,8–1,2 Hz. Oberhalb von ≈ 1 Hz sinkt der Gain stark (Barnes et
   al., 1987).

Die Geschwindigkeit steuert man über eine **Zeitskalierung** *t′ = k·t*: Alle Frequenzen und Geschwindigkeiten
skalieren dann proportional. Mittlere und Spitzengeschwindigkeit in °/s protokollieren.

**Technik und Fairness:**

- **Bildwiederholrate ermitteln** (Median der `requestAnimationFrame`-Abstände) und speichern. Auf
  „Sample-and-hold“-Displays steht jedes Bild eine volle Frame-Dauer, während das Auge weiterläuft. Die
  Verschmierung pro Frame beträgt v/f: bei 60 Hz und 10°/s ≈ 10′, bei 120 Hz ≈ 5′. Das ist so groß wie die
  Lücke bei Visus 0,1. Physikalische Abschätzung; zum Grundprinzip vgl. Kurita, 2001, nur bibliografisch
  geprüft.
  - **Konsequenz:** Fortschritt **pro Gerät** führen, keine Vergleiche zwischen 60- und 120-Hz-Geräten.
    Faustregel (eigene Ableitung): Lücke (in ′) ≥ Geschwindigkeit (°/s) × 60 / Hz, damit das Zeichen
    lesbar bleibt.
- **Kopf ruhig halten**, nur mit den Augen folgen (Tablet aufstellen). So wird die Augenfolgebewegung
  geübt; mit Kopfbewegung ist DVA ebenfalls trainierbar (Long & Riggs, 1991).
- **Senioren:** maximale Helligkeit, hoher Kontrast, Nahkorrektur tragen, Start 3°/s, größere C-Größe,
  längere Darbietung (600 ms).
- **Aufwärmen „Folgen“** ohne Sehzeichen (10–20 s), damit die Folgebewegung „anläuft“. Vorhersagbare
  Bewegungen werden schnell gelernt (McHugh & Bahill, 1985).

### Ehrliche Formulierung für Laien

> „Bei ‚Scharf in Bewegung‘ üben Sie, einem bewegten Ziel ruhig mit den Augen zu folgen und dabei feine Details
> zu erkennen – mit Übung werden Sie in dieser Aufgabe besser. Die Übung ersetzt weder eine Brille noch eine
> augenärztliche Untersuchung, und eine Wirkung auf Alltag, Verkehr oder Sport ist nicht nachgewiesen.“

### Quellen

- Bahill, A. T., & McDonald, J. D. (1983). Smooth pursuit eye movements in response to predictable target motions. *Vision Research, 23*(12), 1573–1583. https://doi.org/10.1016/0042-6989(83)90171-2
- Barnes, G. R., Donnelly, S. F., & Eason, R. D. (1987). Predictive velocity estimation in the pursuit reflex response to pseudo-random and step displacement stimuli in man. *The Journal of Physiology, 389*, 111–136. https://doi.org/10.1113/jphysiol.1987.sp016649
- Burg, A. (1966). Visual acuity as measured by dynamic and static tests: A comparative evaluation. *Journal of Applied Psychology, 50*(6), 460–466. https://doi.org/10.1037/h0023982
- Burg, A. (1971). Vision and driving: A report on research. *Human Factors, 13*(1), 79–87. https://doi.org/10.1177/001872087101300110
- Burg, A., & Hulbert, S. (1961). Dynamic visual acuity as related to age, sex, and static acuity. *Journal of Applied Psychology, 45*(2), 111–116. https://doi.org/10.1037/h0044200
- Cantó-Cerdán, M., & Martínez-Hergueta, M. C. (2026). Effects of video game practice on visual and visuocognitive functions. *Clinical and Experimental Optometry.* Advance online publication. https://doi.org/10.1080/08164622.2026.2669524
- Collewijn, H., & Tamminga, E. P. (1984). Human smooth and saccadic eye movements during voluntary pursuit of different target motions on different backgrounds. *The Journal of Physiology, 351*, 217–250. https://doi.org/10.1113/jphysiol.1984.sp015242
- Eibenberger, K., Ring, M., & Haslwanter, T. (2012). Sustained effects for training of smooth pursuit plasticity. *Experimental Brain Research, 218*(1), 81–89. https://doi.org/10.1007/s00221-012-3009-8
- Erdinest, N., & London, N. (2022). Dynamic visual acuity and methods of measurement. *Journal of Optometry, 15*(3), 247–248. https://doi.org/10.1016/j.optom.2021.06.003
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Hills, B. L., & Burg, A. (1977). *A reanalysis of California driver vision data: General findings* (TRRL Laboratory Report 768). Transport and Road Research Laboratory. https://trid.trb.org/View/56035
- Ishigaki, H., & Miyao, M. (1993). Differences in dynamic visual acuity between athletes and nonathletes. *Perceptual and Motor Skills, 77*(3), 835–839. https://doi.org/10.2466/pms.1993.77.3.835
- Ishigaki, H., & Miyao, M. (1994). Implications for dynamic visual acuity with changes in age and sex. *Perceptual and Motor Skills, 78*(2), 363–369. https://doi.org/10.2466/pms.1994.78.2.363
- ISO. (2017). *ISO 8596:2017 Ophthalmic optics — Visual acuity testing — Standard and clinical optotypes and their presentation.* https://www.iso.org/standard/69042.html (Inhalt über die öffentliche Leseprobe geprüft)
- Kerkhoff, G., Bucher, L., Brasse, M., Leonhart, E., Holzgraefe, M., Völzke, V., Keller, I., & Reinhart, S. (2014). Smooth pursuit "bedside" training reduces disability and unawareness during the activities of daily living in neglect: A randomized controlled trial. *Neurorehabilitation and Neural Repair, 28*(6), 554–563. https://doi.org/10.1177/1545968313517757
- Kerkhoff, G., Reinhart, S., Ziegler, W., Artinger, F., Marquardt, C., & Keller, I. (2013). Smooth pursuit eye movement training promotes recovery from auditory and visual neglect: A randomized controlled study. *Neurorehabilitation and Neural Repair, 27*(9), 789–798. https://doi.org/10.1177/1545968313491012
- Kowler, E., Rubinstein, J. F., Santos, E. M., & Wang, J. (2019). Predictive smooth pursuit eye movements. *Annual Review of Vision Science, 5*, 223–246. https://doi.org/10.1146/annurev-vision-091718-014901
- Kurita, T. (2001). Moving picture quality improvement for hold-type AM-LCDs. *SID Symposium Digest of Technical Papers, 32*(1), 986–989. https://doi.org/10.1889/1.1832037 (nur bibliografisch verifiziert, Inhalt nicht eingesehen)
- Long, G. M., & Crambert, R. F. (1990). The nature and basis of age-related changes in dynamic visual acuity. *Psychology and Aging, 5*(1), 138–143. https://doi.org/10.1037/0882-7974.5.1.138
- Long, G. M., & Homolka, J. L. (1992). Contrast sensitivity during horizontal visual pursuit: Dynamic sensitivity functions. *Perception, 21*(6), 753–764. https://doi.org/10.1068/p210753
- Long, G. M., & Riggs, C. A. (1991). Training effects on dynamic visual acuity with free-head viewing. *Perception, 20*(3), 363–371. https://doi.org/10.1068/p200363
- Long, G. M., & Rourke, D. A. (1989). Training effects on the resolution of moving targets—Dynamic visual acuity. *Human Factors, 31*(4), 443–451. https://doi.org/10.1177/001872088903100407
- Long, G. M., & Vogel, C. A. (1998). Predicting the 'where' and resolving the 'what' of a moving target: A dichotomy of abilities. *Perception, 27*(4), 379–391. https://doi.org/10.1068/p270379
- Long, G. M., & Zavod, M. J. (2002). Contrast sensitivity in a dynamic environment: Effects of target conditions and visual impairment. *Human Factors, 44*(1), 120–132. https://doi.org/10.1518/0018720024494784
- Ludvigh, E., & Miller, J. W. (1958). Study of visual acuity during the ocular pursuit of moving test objects. I. Introduction. *Journal of the Optical Society of America, 48*(11), 799–802. https://doi.org/10.1364/JOSA.48.000799
- Madelain, L., & Krauzlis, R. J. (2003). Effects of learning on smooth pursuit during transient disappearance of a visual target. *Journal of Neurophysiology, 90*(2), 972–982. https://doi.org/10.1152/jn.00869.2002
- McHugh, D. E., & Bahill, A. T. (1985). Learning to track predictable target waveforms without a time delay. *Investigative Ophthalmology & Visual Science, 26*(7), 932–937. https://pubmed.ncbi.nlm.nih.gov/4008209/
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9
- Miller, J. W. (1958). Study of visual acuity during the ocular pursuit of moving test objects. II. Effects of direction of movement, relative movement, and illumination. *Journal of the Optical Society of America, 48*(11), 803–808. https://doi.org/10.1364/JOSA.48.000803
- Morrow, M. J., & Sharpe, J. A. (1993). Smooth pursuit initiation in young and elderly subjects. *Vision Research, 33*(2), 203–210. https://doi.org/10.1016/0042-6989(93)90158-S
- Moschner, C., & Baloh, R. W. (1994). Age-related changes in visual tracking. *Journal of Gerontology, 49*(5), M235–M238. https://doi.org/10.1093/geronj/49.5.M235
- Owsley, C., & McGwin, G., Jr. (2010). Vision and driving. *Vision Research, 50*(23), 2348–2361. https://doi.org/10.1016/j.visres.2010.05.021
- Palidis, D. J., Wyder-Hodge, P. A., Fooken, J., & Spering, M. (2017). Distinct eye movement patterns enhance dynamic visual acuity. *PLoS ONE, 12*(2), e0172061. https://doi.org/10.1371/journal.pone.0172061
- Quevedo, L., Aznar-Casanova, J. A., Merindano-Encina, D., Cardona, G., & Solé-Fortó, J. (2012). A novel computer software for the evaluation of dynamic visual acuity. *Journal of Optometry, 5*(3), 131–138. https://doi.org/10.1016/j.optom.2012.05.003
- Sharpe, J. A., & Sylvester, T. O. (1978). Effect of aging on horizontal smooth pursuit. *Investigative Ophthalmology & Visual Science, 17*(5), 465–468. https://pubmed.ncbi.nlm.nih.gov/640792/
- Shekar, S. U., Erickson, G. B., Horn, F., Hayes, J. R., & Cooper, S. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. *Optometry and Vision Science, 98*(7), 815–825. https://doi.org/10.1097/OPX.0000000000001740
- Thiagarajan, P., & Ciuffreda, K. J. (2014). Versional eye tracking in mild traumatic brain injury (mTBI): Effects of oculomotor training (OMT). *Brain Injury, 28*(7), 930–943. https://doi.org/10.3109/02699052.2014.888761
- Uchida, Y., Kudoh, D., Higuchi, T., Honda, M., & Kanosue, K. (2013). Dynamic visual acuity in baseball players is due to superior tracking abilities. *Medicine & Science in Sports & Exercise, 45*(2), 319–325. https://doi.org/10.1249/MSS.0b013e31826fec97
- Uchida, Y., Kudoh, D., Murakami, A., Honda, M., & Kitazawa, S. (2012). Origins of superior dynamic visual acuity in baseball players: Superior eye movements or superior image processing. *PLoS ONE, 7*(2), e31530. https://doi.org/10.1371/journal.pone.0031530
- Wilkins, L., Gray, R., Gaska, J., & Winterbottom, M. (2013). Motion perception and driving: Predicting performance through testing and shortening braking reaction times through training. *Investigative Ophthalmology & Visual Science, 54*(13), 8364–8374. https://doi.org/10.1167/iovs.13-12774

---

## 3. Zielfang (Abfangen bewegter Ziele, Auge-Hand-Koordination)

### Was wird trainiert

Ein bewegtes Ziel wird mit dem Finger angetippt. Dafür muss man die Bahn wahrnehmen, vorhersagen, wo das Ziel
beim Auftreffen des Fingers sein wird, die Bewegung zeitlich abstimmen und währenddessen nachsteuern
(Interzeption). Neu ist die Rückmeldung, ob jemand systematisch **vor** oder **hinter** das Ziel tippt, also zu
früh oder zu spät.

### Was sagt die Forschung

**3.1 Mechanismen der Interzeption – Evidenz: stark (Grundlagenforschung)**

- **Kontinuierliche Steuerung statt einmaliger Vorhersage:** Bewegungen werden laufend an die neueste
  Zielinformation angepasst. Die anfängliche Schätzung ist ungenau und wird im Verlauf durch
  Sinnesinformation ersetzt (Brenner & Smeets, 2011, 2018). Die Handbeschleunigung folgt Änderungen der
  Zielgeschwindigkeit mit ≈ 200 ms Verzögerung (Brenner, Smeets & de Lussanet, 1998). Für Tippen und Wischen
  beträgt die visuomotorische Latenz gleichermaßen **114 ms** (N = 22; Brenner, Bom & Smeets, 2026).
- **Präzision:** Beim Schlagen virtueller Ziele liegen die Standardabweichungen bei ≈ **20 ms** zeitlich und
  ≈ **5 mm** räumlich. Die Grenze setzt vor allem die visuelle Auflösung (Brenner & Smeets, 2009). Die zeitliche
  Präzision ist am höchsten bei schnellen Zielen, die man *irgendwo* auf ihrer Bahn treffen darf; ist der
  Trefferort vorgegeben, wird sie deutlich schlechter. Wer die Wahl hat, passt eher den *Ort* als den
  *Zeitpunkt* an (Brenner & Smeets, 2015).
- **Systematische Fehler: eher „hinter“ dem Ziel bei schneller Bewegung.** Bei schnelleren Zielen trafen
  Personen weiter vorn, aber **weniger weit, als nötig gewesen wäre** (Brouwer, Brenner & Smeets, 2002). Beim
  Anklicken bewegter Ziele fielen Endpunkte hinter das Ziel, umso mehr, je schneller es sich bewegte
  (Maus, N = 12; Huang et al., 2018). Auch die Geschwindigkeit des *vorherigen* Ziels verzerrt die
  Treffpunkte (de Lussanet, Smeets & Brenner, 2001).
- **Blick:** Wer das Ziel mit den Augen verfolgt, ist weniger anfällig für Täuschungen der
  Bewegungswahrnehmung. Bei Fixation eines festen Punkts entstanden große systematische Fehler (de la Malla,
  Smeets & Brenner, 2017). Personen folgen einem Ziel meist bis zum Abfangen mit glatter Folgebewegung, und
  die Fingerrichtung „eilt“ der Zielbewegung um ≈ 150 ms voraus (Mrotek & Soechting, 2007). Die
  Extrapolation beruht auf lokalen Bewegungsinformationen, Bahnkrümmung wird unterschätzt (Soechting &
  Flanders, 2008, Touchscreen). Ist der *Trefferort* vorhersagbar, geht der Blick früh dorthin (de la Malla et
  al., 2019).
- **Alter:** Ältere (> 55 J.) starten früher und blicken vorausschauender, erreichen aber vergleichbar hohe
  Trefferleistung (Gerharz & Voudouris, 2025). Bei beschleunigten oder abgebremsten Objekten nehmen
  Zeitfehler mit dem Alter zu, bei Tennisspielern jedoch nicht (Lobjois, Benguigui & Bertsch, 2005).

**3.2 Fitts' Law für bewegte Ziele – Evidenz: mittel**

- Der klassische Fitts-Schwierigkeitsindex sagt die Erfassungszeit für bewegte Ziele bei direkter
  Positionssteuerung (wie beim Finger) **nicht** zuverlässig voraus. Ein Index mit Geschwindigkeitsterm passt
  besser (Jagacinski et al., 1980; Hoffmann, 1991, nur bibliografisch geprüft).
- Die Endpunktverteilung beim Selektieren bewegter Ziele ist annähernd normalverteilt. Mittelwert (Versatz)
  und Streuung hängen hauptsächlich von **Zielgröße und Geschwindigkeit** ab, R² ≈ 0,95 (Huang et al., 2018).
- **Praktische Heuristik (eigene Ableitung):** Die Zeit, in der ein Punkt der Bahn vom Ziel überdeckt ist,
  beträgt *W / v*. Bei 9 mm Zielbreite und 10°/s (≈ 70 mm/s bei 40 cm) sind das ≈ 130 ms, bei 20°/s nur
  ≈ 65 ms. Die typische Timing-Streuung von 20 ms entspricht bei 10°/s etwa 1,4 mm und bei 20°/s etwa 2,8 mm.

**3.3 Touch-Zielgrößen – Evidenz: stark (Studien und Plattform-Richtlinien übereinstimmend)**

| Quelle | Empfehlung | Physisch auf iPad (264 ppi) |
|---|---|---|
| Parhi, Karlson & Bederson (2006), N = 20, Daumen einhändig | **9,2 mm** (Einzelziele), 9,6 mm (Serien) | – |
| Apple HIG (iOS/iPadOS) | Standard **44 × 44 pt**, Minimum 28 × 28 pt | 44 pt ≈ 8,5 mm (iPad mini: ≈ 6,9 mm) |
| Google/Android | **48 × 48 dp** (Google: „etwa 9 mm“), 7–10 mm empfohlen, ≥ 8 dp Abstand | nominell 48/160 Zoll ≈ 7,6 mm; real geräteabhängig |
| WCAG 2.2 SC 2.5.8 (AA) / 2.5.5 (AAA) | ≥ 24 × 24 / ≥ 44 × 44 CSS-px | 24 px ≈ 4,6 mm; 44 px ≈ 8,5 mm |
| Chen et al. (2013), N = 53 | Leistung ohne Einschränkung plateaut bei **20 mm**; mit motorischer Einschränkung weitere Verbesserung | – |

- Touchscreens messen den Berührungspunkt **systematisch versetzt**. Der Versatz hängt von Person und
  Fingerhaltung ab, und ein entsprechendes Modell erklärte 67 % der bisher dem „dicken Finger“
  zugeschriebenen Ungenauigkeit (Holz & Baudisch, 2010). Deshalb braucht es eine **Offset-Kalibrierung pro
  Person**, bevor man „vor/hinter“ auswertet.
- **Latenz:** Kommerzielle Touchgeräte hatten 50–200 ms Latenz von Berührung bis Anzeige. Tipp-Latenzen unter
  ≈ 24 ms werden nicht wahrgenommen, beim Ziehen leidet die Leistung ab ≈ 25 ms (Deber et al., 2015, mit
  Verweis auf Ng et al., 2012, und Jota et al., 2013). Geräte- und Browserlatenz verschiebt Tipps
  **scheinbar nach hinten**.

**3.4 Sport-Sehtraining und Transfer – Evidenz: schwach**

- **Reviews:** Für klassische „Augen-Fitness“-Drills gibt es nur „begrenzte und gemischte“ Belege.
  Dynavision-Studien zeigen teils Effekte, aber stets vermischt mit anderen Trainingsbestandteilen. Für weitere
  Auge-Hand-Geräte (z. B. Vision Coach, Batak, FITLIGHT) gibt es kaum Forschung zur Wirksamkeit als
  *Trainings*werkzeug (Appelbaum & Erickson, 2018). Laby & Appelbaum (2021) fordern größere Stichproben, einheitliche Endpunkte und randomisierte,
  placebokontrollierte, präregistrierte Studien. Ein präregistrierter systematischer Review (126 Artikel)
  findet „vielversprechende vorläufige Evidenz“, aber wenige rigorose Studien. Am robustesten wirken
  **sportspezifische, naturalistische** Trainings (Lochhead et al., 2024).
- **Positive Einzelstudien mit Schwächen:** Das Baseballteam der University of Cincinnati steigerte den
  Schlagdurchschnitt nach Sehtraining von 0,251 auf 0,285. Es gab aber **keine Kontrollgruppe** und
  gleichzeitig eine neue Schlägerregel (Clark et al., 2012). Beim Perceptual Learning (30 × 25 min Gabor-Training)
  verbesserte sich die Sehschärfe um 31 % und die Strikeouts sanken von 22,1 % auf 17,7 %. Die Kontrollgruppe
  bestand aber aus nicht randomisierten Pitchern, und die Schlaganalyse beruhte nur auf 11 Spielern (Deveau,
  Ozer & Seitz, 2014).
- **Zusammenhang, nicht Wirkung:** Bei 252 Profis sagten sensomotorische Testwerte On-Base-Percentage,
  Walk- und Strikeout-Rate voraus (Burris et al., 2018).
- **Negative/kritische Befunde:** Zwei generalisierte Sehtrainings (N = 40) verbesserten weder Sehen noch
  Motorik über Test-Gewöhnung hinaus (Abernethy & Wood, 2001). Ein digitales Programm (RCT, N = 32) zeigte
  keinen Effekt (Shekar et al., 2021). Große Effekte treten vor allem bei gerätegleichem Test auf (Guo et
  al., 2025). Fransen (2024) sieht keine Belege für Ferntransfer; Appelbaum et al. (2025) halten dagegen:
  „begrenzte Evidenz ist nicht keine Evidenz“.

**Evidenzbewertung Zielfang**

| Aussage | Evidenz |
|---|---|
| Interzeption beruht auf Blickfolge, Vorhersage und laufender Korrektur; Tendenz zu Treffern hinter schnellen Zielen | **stark** |
| Zielgröße ≥ 9 mm ist für Touch nötig; größer für Senioren und motorisch Eingeschränkte | **stark** |
| Leistung in der Aufgabe verbessert sich mit Übung und Rückmeldung | **mittel** (motorisches Lernen plausibel, für genau diese Aufgabe nicht geprüft) |
| Transfer auf Ballsport und Alltag | **schwach** |

### Nutzen im Alltag

Bewegte Dinge treffen oder greifen: einen Ball fangen, nach einem rollenden Gegenstand greifen, im Spiel mit
Kindern oder Enkeln, im Rückschlagsport. Die „vor/hinter“-Rückmeldung macht den eigenen Timing-Stil
sichtbar (z. B. „ich tippe eher zu spät“), was motivierend und lehrreich sein kann. **Dass dadurch Sport oder
Alltagsgeschick messbar besser werden, ist nicht belegt.**

### Empfehlungen für das Übungsdesign

Umrechnungen gelten für ein iPad mit 264 ppi bei 40 cm (≈ 36 CSS-px/°, 1°/s ≈ 7 mm/s); Details in Abschnitt 4.

| Parameter | Einstieg / Senioren | Standard | Fortgeschritten | Begründung |
|---|---|---|---|---|
| Ziel-Ø | 15–20 mm (≈ 78–104 px) | 10–12 mm (≈ 52–62 px) | min. **9 mm** (≈ 47 px) | Parhi 9,2 mm; Google ≈ 9 mm; Chen: Plateau bei 20 mm |
| Treffertoleranz | Radius + 3 mm | Radius + 2 mm | Radius + 1,5 mm | Touch-Versatz (Holz & Baudisch) |
| Geschwindigkeit | 3–5°/s (≈ 110–180 px/s) | 8–15°/s | bis 30°/s (≈ 1 090 px/s) | Zeitfenster W/v |
| Bahn | gerade, konstant | gerade mit Wandreflexion, gelegentliche Kurven | Kurven, Richtungswechsel | Krümmung wird unterschätzt (Soechting & Flanders) |
| Beschleunigung | keine | keine | optional, als eigene Stufe | Beschleunigung schlecht genutzt; altersabhängige Zeitfehler |
| Lebensdauer | 3 s | 2 s | 1,5 s | skilldrills-Vorlage bis 0,2 s: zu hart für Laien |
| Geschwindigkeiten mischen | nein | ja, zufällig aus einem Band ±20 % | ja | Carry-over-Effekt (de Lussanet et al.) |

- **Blick-Anweisung:** „Folgen Sie dem Ziel mit den Augen und tippen Sie, wenn Sie bereit sind.“
  (de la Malla et al., 2017; Mrotek & Soechting, 2007).
- **Haltung:** Tablet aufstellen oder hinlegen, nicht in der Hand halten; mit dem Zeigefinger der dominanten
  Hand tippen.
- **Block:** 30–40 Ziele oder 60 s; 2–3 Blöcke.

**Auswertung „vor oder hinter dem Ziel“ (Algorithmus)**

1. **Offset-Kalibrierung** (einmal pro Sitzung): 8–10 Tipps auf **ruhende** Ziele. Der Median des
   Versatzes in x und y ist der persönliche Touch-Offset *o*.
2. **Positionen protokollieren:** pro Frame den `requestAnimationFrame`-Zeitstempel und die gezeichnete
   Zielposition *p(t)* in einen Ringpuffer der letzten ≈ 1 s schreiben.
3. **Beim Tipp** (`pointerdown`): *t_tap* = `event.timeStamp` (gleiche Uhr wie `performance.now()`),
   Tippposition *q*. Referenz ist die **zuletzt vor t_tap gezeichnete** Zielposition *p_disp*, also das, was
   die Person gesehen hat, nicht die interne Physik-Position.
4. **Fehlervektor** *e = q − o − p_disp*. Längskomponente *e∥ = e · v̂* (Einheitsvektor der
   Bewegungsrichtung): **> 0 = vor dem Ziel (zu früh/zu weit vorgehalten), < 0 = hinter dem Ziel (zu
   spät)**. Querkomponente *e⊥ = e · n̂*.
5. **Zeitäquivalent** *Δt = e∥ / |v|* in ms, anschaulich z. B. „40 ms zu spät“.
6. **Ausschlüsse:** Tipps mit Richtungswechsel oder Wandreflexion in den letzten 300 ms vor dem Tipp;
   Tipps weiter als 3 Zielradien entfernt (kein echter Versuch).
7. **Aggregation:** Median von *e∥* und *Δt* über ≥ 10–15 gültige Tipps je Geschwindigkeitsband, mit
   Bootstrap-95 %-Intervall. „Eher davor“ bzw. „eher dahinter“ nur melden, wenn |Median e∥| >
   max(1,5 mm; 0,15 × Zielradius) **und** das Intervall die 0 nicht einschließt; sonst „ausgewogen“.
8. **Interpretation:** Eine Tendenz „hinter das Ziel“ bei schnellen Zielen ist **normal** (Brouwer et al.,
   2002; Huang et al., 2018) und enthält auch Geräte- und Browserlatenz. Ergebnisse daher nur **relativ zur
   eigenen Ausgangsmessung und zum selben Gerät** darstellen, keine Normwerte.
9. **Rückmeldung:** Nach jedem Tipp kurz einen „Geisterkreis“ an der gesehenen Zielposition und einen Punkt
   an der Tippstelle zeigen. Nach dem Block den Satz „Sie tippen im Mittel ca. X mm / Y ms hinter das Ziel“
   mit Verlauf über die Sitzungen.

### Ehrliche Formulierung für Laien

> „Beim Zielfang üben Sie das Zusammenspiel von Auge und Hand und sehen, ob Sie bewegte Ziele eher zu früh oder
> zu spät antippen – mit Übung werden Sie darin treffsicherer. Dass dadurch Ballsport oder Autofahren besser
> gelingen, ist wissenschaftlich nicht belegt.“

### Quellen

- Abernethy, B., & Wood, J. M. (2001). Do generalized visual training programmes for sport really work? An experimental investigation. *Journal of Sports Sciences, 19*(3), 203–222. https://doi.org/10.1080/026404101750095376
- Apple Inc. (o. J.). *Human Interface Guidelines: Accessibility* (Abschnitt „Offer sufficiently sized controls“). Abgerufen am 29.09.2026 von https://developer.apple.com/design/human-interface-guidelines/accessibility
- Appelbaum, L. G., & Erickson, G. (2018). Sports vision training: A review of the state-of-the-art in digital training techniques. *International Review of Sport and Exercise Psychology, 11*(1), 160–189. https://doi.org/10.1080/1750984X.2016.1266376
- Appelbaum, L. G., Lochhead, L., Feng, J., Erickson, G., Liu, S., & Laby, D. M. (2025). Limited evidence is not no evidence: A rebuttal to Fransen, 2024. *Sports Medicine, 55*(1), 241–242. https://doi.org/10.1007/s40279-024-02141-x
- Brenner, E., Bom, S., & Smeets, J. B. J. (2026). Intercepting moving targets: Does the visuomotor latency depend on whether one taps on the target or slides through it? *Experimental Brain Research, 244*(4), 70. https://doi.org/10.1007/s00221-026-07264-3
- Brenner, E., & Smeets, J. B. J. (2009). Sources of variability in interceptive movements. *Experimental Brain Research, 195*(1), 117–133. https://doi.org/10.1007/s00221-009-1757-x
- Brenner, E., & Smeets, J. B. J. (2011). Continuous visual control of interception. *Human Movement Science, 30*(3), 475–494. https://doi.org/10.1016/j.humov.2010.12.007
- Brenner, E., & Smeets, J. B. J. (2015). How people achieve their amazing temporal precision in interception. *Journal of Vision, 15*(3):8. https://doi.org/10.1167/15.3.8
- Brenner, E., & Smeets, J. B. J. (2018). Continuously updating one's predictions underlies successful interception. *Journal of Neurophysiology, 120*(6), 3257–3274. https://doi.org/10.1152/jn.00517.2018
- Brenner, E., Smeets, J. B. J., & de Lussanet, M. H. E. (1998). Hitting moving targets: Continuous control of the acceleration of the hand on the basis of the target's velocity. *Experimental Brain Research, 122*(4), 467–474. https://doi.org/10.1007/s002210050535
- Brouwer, A.-M., Brenner, E., & Smeets, J. B. J. (2002). Hitting moving objects: Is target speed used in guiding the hand? *Experimental Brain Research, 143*(2), 198–211. https://doi.org/10.1007/s00221-001-0980-x
- Burris, K., Vittetoe, K., Ramger, B., Suresh, S., Tokdar, S. T., Reiter, J. P., & Appelbaum, L. G. (2018). Sensorimotor abilities predict on-field performance in professional baseball. *Scientific Reports, 8*, 116. https://doi.org/10.1038/s41598-017-18565-7
- Chen, K. B., Savage, A. B., Chourasia, A. O., Wiegmann, D. A., & Sesto, M. E. (2013). Touch screen performance by individuals with and without motor control disabilities. *Applied Ergonomics, 44*(2), 297–302. https://doi.org/10.1016/j.apergo.2012.08.004
- Clark, J. F., Ellis, J. K., Bench, J., Khoury, J., & Graman, P. (2012). High-performance vision training improves batting statistics for University of Cincinnati baseball players. *PLoS ONE, 7*(1), e29109. https://doi.org/10.1371/journal.pone.0029109
- de la Malla, C., Rushton, S. K., Clark, K., Smeets, J. B. J., & Brenner, E. (2019). The predictability of a target's motion influences gaze, head, and hand movements when trying to intercept it. *Journal of Neurophysiology, 121*(6), 2416–2427. https://doi.org/10.1152/jn.00917.2017
- de la Malla, C., Smeets, J. B. J., & Brenner, E. (2017). Potential systematic interception errors are avoided when tracking the target with one's eyes. *Scientific Reports, 7*, 10793. https://doi.org/10.1038/s41598-017-11200-5
- de Lussanet, M. H. E., Smeets, J. B. J., & Brenner, E. (2001). The effect of expectations on hitting moving targets: Influence of the preceding target's speed. *Experimental Brain Research, 137*(2), 246–248. https://doi.org/10.1007/s002210000607
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. In *Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15)* (S. 1827–1836). ACM. https://doi.org/10.1145/2702123.2702300
- Deveau, J., Ozer, D. J., & Seitz, A. R. (2014). Improved vision and on-field performance in baseball through perceptual learning. *Current Biology, 24*(4), R146–R147. https://doi.org/10.1016/j.cub.2014.01.004
- Fransen, J. (2024). There is no supporting evidence for a far transfer of general perceptual or cognitive training to sports performance. *Sports Medicine, 54*(11), 2717–2724. https://doi.org/10.1007/s40279-024-02060-x
- Gerharz, L., & Voudouris, D. (2025). Aging leads to predictive gaze allocation during interception. *Journal of Neurophysiology, 134*(2), 728–740. https://doi.org/10.1152/jn.00029.2025
- Google. (o. J.). *Touch target size* (Android Accessibility Help). Abgerufen am 29.09.2026 von https://support.google.com/accessibility/android/answer/7101858
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Hoffmann, E. R. (1991). Capture of moving targets: A modification of Fitts' law. *Ergonomics, 34*(2), 211–220. https://doi.org/10.1080/00140139108967307 (nur bibliografisch verifiziert)
- Holz, C., & Baudisch, P. (2010). The generalized perceived input point model and how to double touch accuracy by extracting fingerprints. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '10)* (S. 581–590). ACM. https://doi.org/10.1145/1753326.1753413
- Huang, J., Tian, F., Fan, X., Zhang, X. (L.), & Zhai, S. (2018). Understanding the uncertainty in 1D unidirectional moving target selection. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3173574.3173811
- Jagacinski, R. J., Repperger, D. W., Ward, S. L., & Moran, M. S. (1980). A test of Fitts' law with moving targets. *Human Factors, 22*(2), 225–233. https://doi.org/10.1177/001872088002200211
- Laby, D. M., & Appelbaum, L. G. (2021). Review: Vision and on-field performance: A critical review of visual assessment and training studies with athletes. *Optometry and Vision Science, 98*(7), 723–731. https://doi.org/10.1097/OPX.0000000000001729
- Lobjois, R., Benguigui, N., & Bertsch, J. (2005). Aging and tennis playing in a coincidence-timing task with an accelerating object: The role of visuomotor delay. *Research Quarterly for Exercise and Sport, 76*(4), 398–406. https://doi.org/10.1080/02701367.2005.10599312
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2024). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355. https://doi.org/10.1080/1750984X.2024.2437385
- Mrotek, L. A., & Soechting, J. F. (2007). Target interception: Hand–eye coordination and strategies. *The Journal of Neuroscience, 27*(27), 7297–7309. https://doi.org/10.1523/JNEUROSCI.2046-07.2007
- Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. In *Proceedings of the 8th Conference on Human-Computer Interaction with Mobile Devices and Services (MobileHCI '06)* (S. 203–210). ACM. https://doi.org/10.1145/1152215.1152260
- Shekar, S. U., Erickson, G. B., Horn, F., Hayes, J. R., & Cooper, S. (2021). Efficacy of a digital sports vision training program for improving visual abilities in collegiate baseball and softball athletes. *Optometry and Vision Science, 98*(7), 815–825. https://doi.org/10.1097/OPX.0000000000001740
- Soechting, J. F., & Flanders, M. (2008). Extrapolation of visual motion for manual interception. *Journal of Neurophysiology, 99*(6), 2956–2967. https://doi.org/10.1152/jn.90308.2008
- W3C. (2023). *Understanding SC 2.5.8: Target Size (Minimum)* und *Understanding SC 2.5.5: Target Size (Enhanced)* (WCAG 2.2). https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html

---

## 4. Umrechnung Bildschirm → Sehwinkel

### 4.1 Formeln

- **Sehwinkel eines Objekts** der Größe *s* im Abstand *d* (Blick senkrecht auf die Bildmitte):
  **θ = 2 · atan(s / (2d))**
- **Kleinwinkel-Näherung:** θ [°] ≈ 57,3 · s / d. Merkregel: **1 cm in 57 cm ≈ 1°**.
- **Pixel pro Grad** (nahe der Bildmitte): **px/° = d · tan(1°) / p**, mit *p* = physische Größe eines
  CSS-Pixels in mm. Für *d* = 400 mm ist d · tan(1°) ≈ 6,98 mm.
- **Geschwindigkeit:** px/s = (°/s) · px/°; mm/s = (°/s) · d · tan(1°). Bei 40 cm gilt **1°/s ≈ 7 mm/s**.
- **Exzentrizität:** Außerhalb der Mitte deckt ein Pixel weniger Winkel ab (Faktor cos²θ). Die lineare
  Näherung überschätzt Winkel bei ±10° um ≈ 3 %, am Tabletrand (±15°) um ≈ 7 %. Genau: θ = atan(x₂/d) −
  atan(x₁/d).
- **Sehzeichen:** Eine Landolt-Lücke von *g* Bogenminuten misst s = d · tan(g/60°) ≈ d · g · 0,000291. Der
  Ring ist 5-mal so groß. Dezimalvisus-Äquivalent = 1/g (ISO 8596:2017).
- **CSS-Pixel physisch:** p = 25,4 mm · devicePixelRatio / ppi. `window.devicePixelRatio` ist das Verhältnis
  physischer Pixel zu CSS-Pixeln (MDN). Achtung: Die W3C-„Referenzpixel“-Definition (1 px = 1/96 Zoll
  ≈ 0,26 mm bzw. ≈ 0,0213° bei 28 Zoll Armlänge) gilt auf Tablets **nicht** physisch. Rechnet man damit,
  liegt man auf einem iPad um ≈ 38 % daneben, auf einem iPad mini um ≈ 70 %.

### 4.2 Typische Tablets (CSS-Pixel, Sehwinkel)

| Gerät | Auflösung / ppi | DPR | CSS-Viewport | 1 CSS-px | px/° bei 30 / 40 / 50 cm | Bildbreite (quer) bei 30 / 40 / 50 cm |
|---|---|---|---|---|---|---|
| iPad 11″ (A16) | 2360 × 1640 / 264 | 2 | 1180 × 820 | 0,192 mm | 27 / **36** / 45 | 41,5° / 31,7° / 25,6° |
| iPad Pro 13″ (M4) | 2752 × 2064 / 264 | 2 | 1376 × 1032 | 0,192 mm | 27 / 36 / 45 | 47,6° / 36,6° / 29,7° |
| iPad mini (A17 Pro) | 2266 × 1488 / 326 | 2 | 1133 × 744 | 0,156 mm | 34 / **45** / 56 | 32,8° / 24,9° / 20,0° |
| Galaxy Tab S9 (11″) | 2560 × 1600 / ≈ 274 | 2 (Annahme, nicht verifiziert) | 1280 × 800 | 0,185 mm | 28 / 38 / 47 | 43,2° / 33,0° / 26,7° |

Auflösungen und ppi stammen aus Apple-Tech-Specs bzw. GSMArena (Samsung). Das iPad Pro unterstützt
10–120 Hz (ProMotion), das Galaxy Tab S9 120 Hz. Android: 1 dp ≈ 1 px bei 160 dpi („mdpi“),
Dichtestufen 1×/1,5×/2×/3×/4× (Android Developers). **Das DPR eines Android-Tablets ist geräteabhängig** und
muss zur Laufzeit gelesen werden.

**Geschwindigkeiten (iPad 11″, CSS-px/s):**

| °/s | 2 | 4 | 5 | 10 | 15 | 20 | 30 | 40 |
|---|---|---|---|---|---|---|---|---|
| bei 30 cm | 54 | 109 | 136 | 272 | 408 | 544 | 816 | 1088 |
| **bei 40 cm** | **73** | **145** | **181** | **363** | **544** | **726** | **1088** | **1451** |
| bei 50 cm | 91 | 181 | 227 | 454 | 680 | 907 | 1361 | 1814 |

Folge: Ab ≈ 30°/s quert ein Objekt ein 11″-Tablet in etwa 1 s. Die in DVA-Laborstudien üblichen 60–150°/s
(Long & Rourke, 1989) oder bis 900°/s (Uchida et al., 2012) sind am Tablet nicht sinnvoll darstellbar.

**Landolt-C bei 40 cm (iPad, 0,192 mm/CSS-px):**

| Lücke | 1′ | 2′ | 3′ | 4′ | 5′ | 8′ | 10′ | 14′ | 20′ | 40′ |
|---|---|---|---|---|---|---|---|---|---|---|
| Visus-Äquivalent | 1,0 | 0,5 | 0,33 | 0,25 | 0,2 | 0,125 | 0,1 | 0,07 | 0,05 | 0,025 |
| Lücke (CSS-px) | 0,6 | 1,2 | 1,8 | 2,4 | 3,0 | 4,8 | 6,0 | 8,5 | 12,1 | 24,2 |
| Ring-Ø (CSS-px) | 3 | 6 | 9 | 12 | 15 | 24 | 30 | 42 | 60 | 121 |

Ein Visus von 1,0 ist am Tablet bei 40 cm **nicht** darstellbar (Lücke < 1 CSS-px). Praktisches Minimum: Lücke
≈ 2 CSS-px (≈ 3,3′).

**Größen (iPad bei 40 cm):** 7 mm = 36 px = 1,0° · 9 mm = 47 px = 1,3° · 10 mm = 52 px = 1,4° · 12 mm =
62 px = 1,7° · 15 mm = 78 px = 2,1° · 20 mm = 104 px = 2,9°. Auf dem iPad mini entspricht 9 mm ≈ 58 CSS-px.

**Bewegungsunschärfe pro Frame** (Sample-and-hold, folgendes Auge): Schritt = v / Hz. Bei 60 Hz ergeben
5/10/20/30°/s einen Schritt von 5′/10′/20′/30′, bei 120 Hz die Hälfte.

### 4.3 Betrachtungsabstand

- Junge Erwachsene lasen am Tablet anfangs in 31,6 cm, nach 10 min in 28,9 cm, danach blieb der Abstand stabil
  (Sharvit & Rosenfield, 2025; N = 30; objektiv gemessen).
- Tablet-Studien geben oft ≈ 40 cm vor, z. B. iPad Air bei ≈ 40 cm (Kim et al., 2017).
- Smartphone-Studie aus Italien (N = 217): Nicht-Presbyope (14–39 J.) 33,4 ± 7,6 cm, Presbyope (41–70 J.)
  39,7 ± 6,3 cm (Boccardo, Gurioli & Grasso, 2023). **Ältere halten Geräte weiter weg.**
- **Folgerung:** 40 cm als Standard annehmen; realistisch sind 30–50 cm. Das verschiebt px/° um −25 % bis
  +25 %. Für Übungen, deren Schwierigkeit in °/s definiert ist, Abstand und Gerät mitspeichern.

### 4.4 Kalibrierung im Browser (empfohlen)

1. **Pixel pro mm:** Die Person legt eine Scheckkarte (ID-1-Format **85,60 × 53,98 mm**) auf den Bildschirm
   und zieht einen Rahmen auf Kartengröße (Li et al., 2020; jsPsych-Plugin „virtual-chinrest“).
2. **Abstand (optional):** Blindfleck-Test; der blinde Fleck liegt ≈ **13,5°** temporal. Der mittlere Fehler
   betrug 3,25 cm (Li et al., 2020). Für Laien einfacher: „Tablet aufstellen, ca. 40 cm Abstand, einmal mit
   dem Maßband prüfen“.
3. **Fallback ohne Kalibrierung:** `p = 25,4 · devicePixelRatio / ppi` für bekannte Geräte, sonst 0,19 mm
   (iPad-typisch) annehmen und das Ergebnis als „nicht kalibriert“ markieren.
4. **Bildwiederholrate:** Median der `requestAnimationFrame`-Intervalle über ≈ 1 s messen und mitspeichern.

```js
// Umrechnung Grad -> CSS-Pixel (Näherung nahe der Bildmitte)
const CARD_WIDTH_MM = 85.6;                       // ISO/IEC 7810 ID-1
const cssPxPerMm = cardWidthCssPx / CARD_WIDTH_MM; // aus der Karten-Kalibrierung
const distanceMm = 400;                           // Standard 40 cm oder Blindfleck-Schätzung
const pxPerDeg = distanceMm * Math.tan(Math.PI / 180) * cssPxPerMm;
const speedPxPerS = speedDegPerS * pxPerDeg;      // Bewegung immer dt-basiert (px/s * dt)
const gapPx = distanceMm * Math.tan((gapArcmin / 60) * Math.PI / 180) * cssPxPerMm;
```

### Quellen (Abschnitt 4)

- Android Developers. (o. J.). *Support different pixel densities.* Abgerufen am 29.09.2026 von https://developer.android.com/training/multiscreen/screendensities
- Apple Inc. (o. J.). *iPad 11-inch – Technical Specifications.* https://www.apple.com/ipad-11/specs/ · *iPad mini – Tech Specs.* https://www.apple.com/ipad-mini/specs/ · *iPad Pro – Tech Specs.* https://www.apple.com/ipad-pro/specs/ (abgerufen am 29.09.2026)
- Boccardo, L., Gurioli, M., & Grasso, P. A. (2023). Viewing distance and character size in the use of smartphones across the lifespan. *PLoS ONE, 18*(4), e0282947. https://doi.org/10.1371/journal.pone.0282947
- GSMArena. (o. J.). *Samsung Galaxy Tab S9 – Full phone specifications.* https://www.gsmarena.com/samsung_galaxy_tab_s9_fe-12439.php (Drittquelle; die Seite zeigt das Galaxy Tab S9)
- ISO. (2017). *ISO 8596:2017 Ophthalmic optics — Visual acuity testing — Standard and clinical optotypes and their presentation.* https://www.iso.org/standard/69042.html
- jsPsych. (o. J.). *virtual-chinrest plugin.* https://www.jspsych.org/v7/plugins/virtual-chinrest/
- Kim, D. J., Lim, C.-Y., Gu, N., & Park, C. Y. (2017). Visual fatigue induced by viewing a tablet computer with a high-resolution display. *Korean Journal of Ophthalmology, 31*(5), 388–393. https://doi.org/10.3341/kjo.2016.0095
- Li, Q., Joo, S. J., Yeatman, J. D., & Reinecke, K. (2020). Controlling for participants' viewing distance in large-scale, psychophysical online experiments using a virtual chinrest. *Scientific Reports, 10*, 904. https://doi.org/10.1038/s41598-019-57204-1
- MDN Web Docs. (o. J.). *Window: devicePixelRatio property.* https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
- Sharvit, E., & Rosenfield, M. (2025). Cognitive demand, concurrent viewing distances, and digital eyestrain. *Optometry and Vision Science, 102*(4), 189–195. https://doi.org/10.1097/OPX.0000000000002238
- W3C. (o. J.). *CSS Values and Units Module Level 4* (Abschnitt „reference pixel“). https://www.w3.org/TR/css-values-4/

---

## Anhang: Korrekturen und Unsicherheiten

1. **Ishigaki & Miyao (1994)** untersucht **Alter und Geschlecht** (N = 826, 5–92 J.), nicht Sportler. Der
   Sportler-Vergleich ist **Ishigaki & Miyao (1993)**, *Percept Mot Skills, 77*(3), 835–839.
2. **Parhi, Karlson & Bederson (2006):** Die Empfehlung lautet **9,2 mm** (Einzelziele) und **9,6 mm**
   (Serienaufgaben). Das Abstract nennt zusätzlich, dass sich die Fehlerraten ab ≥ 9,6 mm (diskret) bzw.
   ≥ 7,7 mm (seriell) nicht mehr unterscheiden. Getestet wurde einhändige Daumenbedienung auf einem PDA.
3. **Long & Rourke (1989):** Die korrekte DOI lautet `10.1177/001872088903100407`.
4. **NeuroTracker-Parameter:** 8 Kugeln/4 Ziele, 2 s Markierung, 8 s, 1-up/1-down, ≈ 8 min, 20 Durchgänge
   sind durch Studien belegt (Faubert 2013; Vater et al. 2021; Mangine et al. 2014; Michaels et al. 2023).
   Die Schrittweite 0,05 log und die Startgeschwindigkeit stammen aus der Laborversion (Legault et al. 2013).
   Die aktuelle kommerzielle Software kann abweichen.
5. **Nur bibliografisch geprüft**, Inhalt nicht eingesehen: Hoffmann (1991), Kurita (2001). Woods-Fry et al.
   (2017) nur über Titel/Metadaten; Ng et al. (2012) und Jota et al. (2013) nur über die Zusammenfassung bei
   Deber et al. (2015).
6. **Bewusst weggelassen:** Jin, Plocher & Kiff (2007, Knopfgrößen für Senioren). Sekundärquellen nennen
   widersprüchliche Werte (11,4 mm bzw. 16,5–19 mm), das Original war nicht zugänglich. Stattdessen stehen hier
   Chen et al. (2013) und Parhi et al. (2006).
7. **Android-DPR** (Galaxy Tab S9 = 2) ist eine Annahme; zur Laufzeit per `devicePixelRatio` prüfen.
8. **Eigene Ableitungen** (keine Literaturwerte, als solche gekennzeichnet): Zeitfenster W/v, Faustregel
   „Lücke ≥ v·60/Hz“, Schwellen für „vor/hinter“ (1,5 mm bzw. 0,15 × Radius) und alle Stufenwerte der
   Designtabellen. Diese Werte sollten im Pilotbetrieb mit echten Nutzern justiert werden.
