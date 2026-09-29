# Wahrnehmen & Erfassen – wissenschaftliche Grundlagen der Übungen

**Stand:** 29.09.2026 · **Block:** „Wahrnehmen & Erfassen“ (Punktlandung, Suchbild, Blitzblick, Aus dem Takt; Ausblick Kontrast)
**Zweck:** Grundlage für Übungsdesign, Beratung im Geschäft und Texte auf der Website (Zielgruppe: Laien aller Altersgruppen, auch Senioren, Autofahrer, Hobbysportler).

> **Zur Methode.** Jede zitierte Quelle wurde über eine echte URL geprüft (PubMed/NCBI, Crossref-DOI-Auflösung, PMC-Volltext bzw. die Seite des Herausgebers wie W3C oder ITU). Zahlen stammen aus Abstracts oder Volltexten. Eigene Herleitungen und Vorschläge sind als **Herleitung** bzw. **Designvorschlag** gekennzeichnet – sie sind keine Studienergebnisse. Was nicht direkt prüfbar war, ist als „nicht verifiziert“ markiert.

## Evidenzskala

| Stufe | Bedeutung |
|---|---|
| **stark** | mehrere gut kontrollierte Studien bzw. Metaanalysen, im Wesentlichen übereinstimmend |
| **mittel** | einzelne größere RCTs oder mehrere kleinere, übereinstimmende Studien – mit klaren Einschränkungen |
| **schwach** | kleine, nicht randomisierte oder unkontrollierte Studien, Interessenkonflikte, widersprüchliche Befunde |
| **fehlend** | keine Studie gefunden, die genau diese Aussage prüft |

## Übersicht

| Übung | Was wird geübt | Besser in der Übung selbst? | Nutzen im Alltag (Transfer)? | Wichtigste Designänderung |
|---|---|---|---|---|
| **Punktlandung** | Zeit bis zum Kontakt aus der Bildvergrößerung schätzen (Looming, einäugig), Antizipations-Timing | **mittel** | **fehlend** (Verkehr) / **schwach** (Sport) | echte Perspektive (1/Radius sinkt linear), Verdeckung als Stufe, Toleranz proportional zur Verdeckungszeit |
| **Suchbild** | visuelle Suche, selektive Aufmerksamkeit | **stark** | **schwach** bei Gesunden; nur klinisch (Halbseitenblindheit) besser belegt | Ähnlichkeit und Anzahl adaptiv, Suchasymmetrie nutzen, Abstände gegen Crowding |
| **Blitzblick** | Verarbeitungsgeschwindigkeit, geteilte und selektive Aufmerksamkeit (UFOV) | **stark** | **mittel** für ältere Menschen mit dem Original-Studienprotokoll, mit deutlichen Einschränkungen; **fehlend** für unsere Web-Version | UFOV-Aufbau: Mitte + Rand + Ablenker + Maske, Staircase 17–500 ms |
| **Aus dem Takt** | Unterschiede im Pulstakt erkennen (zeitliche Frequenzunterscheidung) | **schwach** (kaum Trainingsstudien) | **fehlend** | gleiche Helligkeit, zufällige Phasen, Weber-Staircase, ≤ 2,5 Hz, Helligkeitshub ≤ 0,033 |
| *(Ausblick) Kontrast* | Kontrastempfindlichkeit (Perceptual Learning) | mittel (Amblyopie) / schwach (Normalsichtige) | schwach | nur mit Dithering und Kalibrierung, keine Heilversprechen |

### Grundproblem aller Übungen: der Transfer

- Die große Übersichtsarbeit von Simons et al. (2016) fand viel Evidenz dafür, dass man in den **geübten** Aufgaben besser wird, weniger Evidenz für eng verwandte Aufgaben und **wenig Evidenz** für entfernte Aufgaben oder den Alltag. Viele Studien hatten methodische Mängel.
- In einer Metaanalyse zum Sport-Sehtraining (33 RCTs, 1.048 Teilnehmende) waren die Effekte stark aufgebläht, wenn Trainings- und Testaufgabe ähnlich waren (z. B. visuelle Aufmerksamkeit SMD 1,65 gegenüber 0,07 bei unähnlichen Tests; Guo et al., 2025). Die Autoren deuten die Verbesserungen deshalb teilweise als Gewöhnung an die Aufgabe.
- Ein systematischer Review (126 Artikel) zu Sport-Sehtraining fand die stärksten Hinweise auf Leistungsverbesserung bei **naturnahem, sportartspezifischem** Training. Nur wenige Studien waren randomisiert, placebokontrolliert und verblindet (Lochhead et al., 2026, online 2024).
- Bei gesunden älteren Menschen war computergestütztes kognitives Training insgesamt nur **klein** wirksam (g = 0,22; 52 Studien, 4.885 Personen). Unbetreutes Training zu Hause und mehr als drei Einheiten pro Woche waren in dieser Analyse unwirksam; für Einheiten unter 30 Minuten gab es nur schwache Evidenz (Lampit et al., 2014).

**Folge für die Plattform:** Wir können ehrlich sagen, dass man in der Übung besser wird und welche Fähigkeit dahintersteht. Aussagen wie „verbessert Ihre Sehkraft“, „macht Sie zum sichereren Fahrer“ oder „beugt Demenz vor“ sind nicht gedeckt (siehe Anhang B).

### Übergreifende technische Hinweise

- **Sehwinkel statt Pixel:** Größe *s* = 2·*d*·tan(θ/2). Bei *d* = 40 cm entspricht 1° etwa 7,0 mm und 10° etwa 7,0 cm; bei 30 cm entspricht 1° etwa 5,2 mm. Auf einem typischen iPad (0,19 mm pro CSS-Pixel) sind das bei 40 cm etwa **36 CSS-px pro Grad**. Bildschirmgröße und Abstand lassen sich im Browser kalibrieren: mit einer Kreditkarte (85,60 mm breit), die man an ein Bild auf dem Schirm anpasst, plus dem Blinden-Fleck-Test („Virtual Chinrest“; mittlerer Abstandsfehler 3,25 cm; Li et al., 2020).
- **Timing im Browser:** Darstellung mit `requestAnimationFrame` war genauer als mit CSS. Auf Touch-Geräten wurden Reaktionszeiten systematisch **um ca. 58 ms (iOS) bis 66–70 ms (Android)** zu lang gemessen, mit einer Streuung von etwa 7 ms. Sehr kurze Darbietungen (≤ 100 ms) waren unter unkontrollierten Bedingungen teils ungenau (Pronk et al., 2020). Web-Plattformen erreichen insgesamt brauchbare, aber geräteabhängige Präzision (Bridges et al., 2020; Anwyl-Irvine et al., 2021). LCDs haben unpräzise Ein- und Ausschaltflanken und Eingabeverzögerungen (Elze & Tanner, 2012). **Folge:** Werte immer auf dem gleichen Gerät vergleichen und Zeiten in Bildern (Frames) planen, aber in Millisekunden protokollieren.
- **Brille:** Am Tablet (30–40 cm) brauchen Menschen ab etwa 45 die passende Nahkorrektur. Sonst trainiert man unscharf. Das ist ein natürlicher Beratungsanlass für den Optiker.

---

## 1. „Punktlandung“ – Zeit bis zum Kontakt (Looming, Antizipations-Timing)

### 1.1 Was wird trainiert

Eine Kugel kommt perspektivisch auf die Betrachterin zu. Sie tippt in dem Moment, in dem die Kugel den Zielring erreicht. Geübt wird die **Schätzung der Zeit bis zum Kontakt** (Time-to-Contact, TTC) aus der optischen Vergrößerung („Looming“) sowie das **Antizipations-Timing** (Coincidence-Anticipation Timing, CAT). In der Stufe mit **Verdeckung** (die Kugel verschwindet vor der Ankunft) wird daraus eine Prediction-Motion-Aufgabe (PM): Die Bewegung muss im Kopf weitergeführt werden.

**Wichtige Klarstellung zur „Tiefenwahrnehmung“:** Auf einem normalen 2D-Bildschirm sehen beide Augen dasselbe Bild. Die binokulare Disparität ist also null, und **Stereopsis (echtes beidäugiges räumliches Sehen) kann hier nicht trainiert werden**. Die Übung nutzt nur **einäugige (monokulare) Tiefenhinweise**: optische Expansion, Größe und Perspektive, optional auch Verdeckung und Texturgradienten. Stereo-Lernstudien brauchen eine getrennte Darstellung für jedes Auge. Ding & Levi (2011) etwa arbeiteten mit einem eigens gebauten Vier-Spiegel-Stereoskop und je nach Person 10.000–20.000 Durchgängen; trainiert wurden 5 Erwachsene. Laut dieser Arbeit sind 3–5 % der Bevölkerung stereoblind oder stark eingeschränkt. Bei schielbedingter Amblyopie wirkt dichoptisches Training bzw. direktes Stereotraining besser als einäugiges Training (Levi, Knill & Bavelier, 2015). Die Übung sollte deshalb „Zeit-bis-Kontakt“ heißen, **nicht** „3D-“ oder „Tiefensehen“.

### 1.2 Was sagt die Forschung

**Grundlagen (tau).** Lee (1976) zeigte: Bei konstanter Annäherungsgeschwindigkeit gibt das Verhältnis von Bildgröße zu deren Änderungsrate, τ = θ/(dθ/dt), die Zeit bis zum Kontakt an, und zwar unabhängig von Größe, Entfernung und Geschwindigkeit. Lee schlug τ auch zur Steuerung des Bremsens vor (über die Änderungsrate von τ, „tau-dot“). In Simulationen passten die Bremskorrekturen zu einer solchen tau-dot-Strategie; der kritische Wert lag bei −0,44 bis −0,52 bei erwarteten −0,5 (Yilmaz & Warren, 1995).

**Aber nicht nur tau.** Die Urteile folgten zwar zweidimensionalen, größenunabhängigen Größen. Die Zeit bis zum Kontakt wurde aber **deutlich unterschätzt**, und zwar umso mehr, je länger sie war; jenseits von etwa 10 s wurden die Urteile nichtlinear (Schiff & Detwiler, 1979). Tresilian (1999) hält die strenge tau-Hypothese für widerlegt: Welche Information genutzt wird, hängt von Aufgabe und Situation ab. Beim **Größe-Ankunfts-Effekt** wird ein großes, weit entferntes Objekt als früher ankommend beurteilt als ein kleines, nahes (DeLucia, 1991). In einer realistischen Verkehrsszene (Virtual Reality) nutzten die Teilnehmenden tau und zusätzlich heuristische Hinweise wie die Endgröße. In der audiovisuellen Bedingung gewichteten **ältere Menschen** diese Heuristiken etwa gleich stark wie tau, jüngere gaben tau das größte Gewicht (Keshavarz et al., 2017).

**Genauigkeit.** Mit nur einäugiger Information lag die Unterschiedsschwelle für die Kontaktzeit bei 5,8–12 %, der absolute Fehler bei 2–12 % (Unterschätzung). Waren binokulare und monokulare Information zusammen verfügbar, lag der Fehler nur bei 1,3–2,7 %. Für **kleine, nahe Objekte** (wenige Meter) ist binokulare Information entscheidend (Gray & Regan, 1998). Autofahrer konnten Kontaktzeiten sinnvoll schätzen, sobald die Winkelgeschwindigkeit über etwa 0,003 rad/s lag. Die Streuung wuchs linear mit der Kontaktzeit, und kurze Kontaktzeiten wurden unterschätzt (Hoffmann & Mortimer, 1994).

**Verdeckung (Prediction-Motion).** PM-Aufgaben enthalten kognitive Anteile. Das Ergebnis hängt davon ab, wie lange das Ziel sichtbar war, wie viel Kontaktzeit beim Antwortbeginn noch blieb, wie viel geübt wurde und ob zwischen Verschwinden und Antwort eine Pause liegt (Tresilian, 1995). DeLucia & Liddell (1998) deuten die Leistung als gedankliche Weiterführung der Bewegung, nicht als bloßes Herunterzählen. Bei Kontaktzeiten von 0,4–1,5 s wuchsen **konstanter und variabler Fehler mit der Kontaktzeit**; Mitverfolgen mit den Augen half (Bennett et al., 2010). Entscheidend war das **Verhältnis von sichtbarer zu verdeckter Zeit**: sichtbar 150–1.200 ms, verdeckt 100–1.600 ms; längere Sichtzeit verbesserte, längere Verdeckung verschlechterte die Leistung (Villavicencio et al., 2024). **Beschleunigung** wird dabei nicht berücksichtigt: Die Antworten folgten einer Schätzung erster Ordnung, also bei Verzögerung zu früh und bei Beschleunigung zu spät (Benguigui & Bennett, 2010).

**Antizipations-Timing am Bassin Anticipation Timer und Trainingsstudien.** Beim Bassin-Timer läuft ein Licht eine Lampenreihe entlang, und man drückt genau dann, wenn es am Ziel ankommt.
- Mit Übung wird man in dieser Aufgabe besser. Verbale Rückmeldung war überflüssig, solange man das Ergebnis selbst sehen konnte (n = 24; Williams & Jasiewicz, 2001).
- 10 Einheiten in 3 Wochen mit teilweise verdeckter Laufbahn senkten den mittleren absoluten Fehler (n = 12, ohne Kontrollgruppe; Koshizawa et al., 2014).
- In einem RCT mit 32 Volleyballerinnen (8–10 Jahre) verringerte ein 8-wöchiges Training mit sofortiger Ergebnisrückmeldung den absoluten Timingfehler. Bei 10 mph war der Effekt groß (partielles η² = 0,40), und er hielt nach 2 Monaten noch an (Amprasi et al., 2026).
- **Bewertung:** Übungseffekte in der Aufgabe selbst sind **mittel** belegt (kleine Studien). Ob sie sich auf andere Aufgaben übertragen, ist offen.

**Alter.**
- Über die Lebensspanne waren nur die jüngsten Kinder (7–9 Jahre) deutlich schlechter. Eine eher bewegungsarme ältere Gruppe (64–86 Jahre) war weniger genau und schwankte stärker (Haywood, 1980).
- Bei der Schätzung heranfahrender Autos waren Jüngere am genauesten; ältere Frauen schätzten am kürzesten, also sehr vorsichtig (Schiff, Oldak & Shah, 1992).
- Ältere Tennisspieler (60–79 Jahre) waren im Timing so genau wie junge. Bei älteren Nichtspielern hing die altersbedingt längere visuomotorische Verzögerung mit den Timingfehlern zusammen (Querschnittsstudie; Lobjois, Benguigui & Bertsch, 2006).
- Ältere Fußgänger akzeptierten bei höherer Fahrzeuggeschwindigkeit immer kürzere Zeitlücken. Das deutet auf eine Entscheidung nach Entfernung statt nach Zeit hin (Lobjois & Cavallo, 2007).
- Ältere Fahrer mit den schlechtesten UFOV-Werten schätzten die Kontaktzeit beim Linksabbiegen am ungenauesten, besonders bei langsamen Fahrzeugen (Rusch et al., 2016).

**Straßenverkehr.** Die Zeit bis zum Kontakt ist für **Bremsen** (Lee, 1976; Yilmaz & Warren, 1995), **Auffahrsituationen** (Hoffmann & Mortimer, 1994), **Linksabbiegen** (Rusch et al., 2016) und **Überholen** relevant. Im Fahrsimulator entschieden Fahrer beim Überholen häufig falsch, ob die Zeit reicht; manche starteten, sobald der Gegenverkehr „weit genug weg“ schien, obwohl die Zeit nicht reichte. Die Gewöhnung an die Annäherungsgeschwindigkeit machte die Entscheidungen später, riskanter und variabler (Gray & Regan, 2005). Wir fanden **keine Studie, die zeigt, dass ein Zeit-bis-Kontakt-Training am 2D-Bildschirm das Verhalten im Verkehr verbessert.**

**Ballsport.** Gray & Regan (1998) nennen eine Genauigkeit von etwa ±2–2,5 ms, mit der Spitzenspieler den Schlagmoment treffen. Experten nehmen relevante Hinweise genauer und schneller auf (Metaanalyse mit 42 Studien; Mann et al., 2007). Allgemeines Sehtraining überträgt sich jedoch am ehesten dann auf die Leistung, wenn es sportartspezifisch ist (Lochhead et al., 2026).

**Evidenzbewertung Punktlandung**

| Aussage | Evidenz |
|---|---|
| Menschen nutzen die optische Expansion (u. a. tau) zur Schätzung der Kontaktzeit, mit typischen Verzerrungen (Unterschätzung, Größen-Heuristik) | **stark** |
| Übung verbessert die Leistung in CAT- und PM-Aufgaben | **mittel** |
| Ältere Menschen sind im Mittel ungenauer bzw. variabler oder nutzen andere Heuristiken; große individuelle Unterschiede | **mittel** |
| Das Training am 2D-Bildschirm verbessert das Verhalten im Straßenverkehr | **fehlend** |
| Das Training verbessert die Leistung im Ballsport | **schwach** |
| Stereopsis ist mit dieser Übung trainierbar | **nein** (physikalisch ausgeschlossen) |

### 1.3 Nutzen im Alltag

Die zugrunde liegende Fähigkeit ist alltagsrelevant: Bremsen, Abstand halten, Linksabbiegen, Überholen, Straße queren, Bälle fangen oder schlagen. Nachgewiesen ist aber nur, dass man in **dieser Art von Aufgabe** besser wird. Realistisch sind zwei Nutzen: bessere Leistung in der Übung und eine Rückmeldung über die **eigene Tendenz** („Ich tippe meist zu früh“). Daraus lässt sich im Gespräch ein Hinweis ableiten, etwa: mehr Sicherheitsabstand einplanen, wenn man eher spät reagiert. Ein Sicherheitsversprechen ergibt sich daraus nicht.

### 1.4 Empfehlungen für das Übungsdesign

**a) Echte perspektivische Expansion (Herleitung).** Eine Kugel mit Radius *R* in der Entfernung *Z(t) = Z₀ − v·t* hat den Bildradius *r(t) = f·R/Z(t)*. Daraus folgt eine sehr einfache, einheitenfreie Formel:

```
1/r(t) = 1/r0 − (1/r0 − 1/R_ring) · (t / T)      (T = Ankunftszeit am Ring)
τ(t)   = r / (dr/dt) = Z / v
Restzeit bis zum Ring = τ(t) · (1 − r(t)/R_ring)
```

Der **Kehrwert des Radius nimmt linear ab**. Die Restzeit bis zum Ring ist damit rein optisch bestimmt, die Aufgabe ist physikalisch stimmig. Beim bisherigen **linearen Wachstum** (*r = a + b·t*) läge dagegen ein Objekt vor, das immer stärker abbremst. Eine Schätzung erster Ordnung über tau liefert dann nur (*r/R_ring*) × die wahre Restzeit, also zu früh: bei halber Ringgröße nur die Hälfte. Das alte Modell belohnt deshalb eher „Größe beobachten“ und „Zählen“ als die natürliche Kontaktzeitwahrnehmung (Herleitung; zur Schätzung erster Ordnung vgl. Benguigui & Bennett, 2010).

Verlauf *r/R_ring* über der Zeit (Herleitung):

| Start r0/R_ring | t/T = 0 | 0,25 | 0,5 | 0,75 | 0,9 | 1,0 | τ am Ring (Anteil von T) |
|---|---|---|---|---|---|---|---|
| 0,10 („kommt von weit“) | 0,10 | 0,13 | 0,18 | 0,31 | 0,53 | 1,00 | 0,11 |
| 0,20 | 0,20 | 0,25 | 0,33 | 0,50 | 0,71 | 1,00 | 0,25 |
| 0,30 („kommt von nah“) | 0,30 | 0,36 | 0,46 | 0,63 | 0,81 | 1,00 | 0,43 |

**b) Parameter (Designvorschlag)**

| Parameter | Empfehlung | Begründung |
|---|---|---|
| Zielring | Radius 0,30 × min(Breite, Höhe) (Tablet bei 40 cm ≈ 6–7° Radius), dünn (2–3 px), gut sichtbar | große, klare Zielmarke |
| Startgröße r0 | zufällig 0,10–0,30 × R_ring; Einstieg eher 0,25–0,30 (sanfterer Verlauf), später 0,10–0,20 | Endgröße und Wachstum dürfen die Ankunft nicht verraten (Größe-Ankunfts-Effekt, Heuristiken: DeLucia 1991; Keshavarz et al. 2017) |
| Ankunftszeit T | jede Runde neu, gleichverteilt: Einstieg 1,2–2,5 s, später 0,8–3,5 s | verhindert Rhythmus- und Zählstrategien (Tresilian 1995) |
| Vorlauf | zufällig 0,6–1,5 s zwischen Rundenbeginn und Start der Kugel | kein Tippen „im Takt“ |
| Geschwindigkeit | konstant (keine Beschleunigung) | Menschen rechnen Beschleunigung nicht ein (Benguigui & Bennett 2010) |
| Nach der Ankunft | noch ~100 ms weiterwachsen, dann in ≤ 200 ms ausblenden; maximaler Radius ≤ 1,3 × R_ring, **nie bildschirmfüllend** | sichtbare Rückmeldung ohne großflächigen Helligkeitssprung (Abschnitt 4.7) |
| Verdeckung (Stufen) | 0 → letzte 200 → 400 → 600 → 900 → 1.200 ms unsichtbar; Sichtzeit vorher ≥ 600 ms; Einstieg mit Verhältnis sichtbar : verdeckt ≥ 1 | das Verhältnis sichtbar/verdeckt bestimmt die Schwierigkeit (Villavicencio et al. 2024) |
| Toleranz | „perfekt“ \|Fehler\| ≤ max(30 ms; 6 % der Verdeckungsdauer D), „gut“ ≤ max(60 ms; 12 % von D) | Fehler wachsen proportional zur Kontaktzeit bzw. Verdeckung (Bennett et al. 2010; Hoffmann & Mortimer 1994); Unterschiedsschwelle 6–12 % (Gray & Regan 1998); ±30 ms deckt Frame- und Touch-Unsicherheit ab |
| Adaptivität | 3-down-1-up über die Verdeckungsstufe (≈ 79 % „gut“) | Staircase-Logik (Levitt 1971) |
| Rückmeldung | nach jedem Tippen: vorzeichenbehafteter Fehler („38 ms zu früh“); nach jedem Block: Tendenz (Mittelwert), Konstanz (SD), Trefferquote | ohne Verdeckung sieht man das Ergebnis selbst (Williams & Jasiewicz 2001), mit Verdeckung braucht es explizite Rückmeldung |
| Zeitmessung | `pointerdown` mit `event.timeStamp`, Zeitbasis `performance.now()`, Ankunftszeit analytisch (nicht „erster Frame über dem Ring“) | präziser als Zeitstempel im Event-Handler |
| Gerätelatenz | Hinweis: Touchscreens messen im Mittel 58–70 ms zu spät (Pronk et al. 2020). Fortschritt nur auf demselben Gerät vergleichen; optional Offset-Kalibrierung (10 Taps bei voll sichtbarer, langsamer Annäherung, Median als Offset) mit Rohwert und korrigiertem Wert getrennt speichern | sonst sind Geräte unfair verglichen |
| Variante „Aufprall“ | ohne Ring: tippen, wenn die Kugel einen „treffen“ würde; die Kugel verschwindet vorher | klassisches Paradigma der Kontaktzeitschätzung (Schiff & Detwiler 1979) |
| Umfang | 3 Blöcke à 20 Versuche (~3–4 min) | kurze, konzentrierte Einheiten |

**Nicht tun:** keine lineare Größenzunahme, kein beschleunigtes oder abbremsendes Objekt als Normalfall, kein bildschirmfüllendes Aufblitzen, keine Bezeichnung als „3D-“ oder „Stereotraining“.

### 1.5 Ehrliche Formulierung für Laien

> „Bei der Punktlandung üben Sie, den Moment abzuschätzen, in dem etwas auf Sie zukommt – eine Fähigkeit, die auch im Straßenverkehr und beim Ballsport gebraucht wird. Sie werden in dieser Aufgabe mit Übung besser; ob sich das auf Verkehr oder Sport überträgt, ist wissenschaftlich nicht belegt.“

### 1.6 Quellen

- Amprasi, E., Koufou, N., Trigonis, I., Tsartsapakis, I., Zafeiroudi, A., & Kouli, O. (2026). The impact of an 8-week deliberate practice intervention on coincidence anticipation timing and long-term retention in youth female volleyball players. *Children, 13*(6), 822. https://doi.org/10.3390/children13060822
- Benguigui, N., & Bennett, S. J. (2010). Ocular pursuit and the estimation of time-to-contact with accelerating objects in prediction motion are controlled independently based on first-order estimates. *Experimental Brain Research, 202*(2), 327–339. https://doi.org/10.1007/s00221-009-2139-0
- Bennett, S. J., Baures, R., Hecht, H., & Benguigui, N. (2010). Eye movements influence estimation of time-to-contact in prediction motion. *Experimental Brain Research, 206*(4), 399–407. https://doi.org/10.1007/s00221-010-2416-y
- DeLucia, P. R. (1991). Pictorial and motion-based information for depth perception. *Journal of Experimental Psychology: Human Perception and Performance, 17*(3), 738–748. https://doi.org/10.1037/0096-1523.17.3.738
- DeLucia, P. R., & Liddell, G. W. (1998). Cognitive motion extrapolation and cognitive clocking in prediction motion tasks. *Journal of Experimental Psychology: Human Perception and Performance, 24*(3), 901–914. https://doi.org/10.1037/0096-1523.24.3.901
- Ding, J., & Levi, D. M. (2011). Recovery of stereopsis through perceptual learning in human adults with abnormal binocular vision. *PNAS, 108*(37), E733–E741. https://doi.org/10.1073/pnas.1105183108
- Gray, R., & Regan, D. (1998). Accuracy of estimating time to collision using binocular and monocular information. *Vision Research, 38*(4), 499–512. https://doi.org/10.1016/S0042-6989(97)00230-7
- Gray, R., & Regan, D. M. (2005). Perceptual processes used by drivers during overtaking in a driving simulator. *Human Factors, 47*(2), 394–417. https://doi.org/10.1518/0018720054679443
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572
- Haywood, K. M. (1980). Coincidence-anticipation accuracy across the life span. *Experimental Aging Research, 6*(5), 451–462. https://doi.org/10.1080/03610738008258380
- Hoffmann, E. R., & Mortimer, R. G. (1994). Drivers’ estimates of time to collision. *Accident Analysis & Prevention, 26*(4), 511–520. https://doi.org/10.1016/0001-4575(94)90042-6
- Keshavarz, B., Campos, J. L., DeLucia, P. R., & Oberfeld, D. (2017). Estimating the relative weights of visual and auditory tau versus heuristic-based cues for time-to-contact judgments in realistic, familiar scenes by older and younger adults. *Attention, Perception, & Psychophysics, 79*(3), 929–944. https://doi.org/10.3758/s13414-016-1270-9
- Koshizawa, R., Mori, A., Oki, K., Takayose, M., & Minakawa, N. T. (2014). Effects of training the coincidence-anticipation timing task on response time and activity in the cortical region. *NeuroReport, 25*(7), 527–531. https://doi.org/10.1097/WNR.0000000000000129
- Lee, D. N. (1976). A theory of visual control of braking based on information about time-to-collision. *Perception, 5*(4), 437–459. https://doi.org/10.1068/p050437
- Levi, D. M., Knill, D. C., & Bavelier, D. (2015). Stereopsis and amblyopia: A mini-review. *Vision Research, 114*, 17–30. https://doi.org/10.1016/j.visres.2015.01.002
- Levitt, H. (1971). Transformed up-down methods in psychoacoustics. *The Journal of the Acoustical Society of America, 49*(2B), 467–477. https://doi.org/10.1121/1.1912375
- Lobjois, R., Benguigui, N., & Bertsch, J. (2006). The effect of aging and tennis playing on coincidence-timing accuracy. *Journal of Aging and Physical Activity, 14*(1), 74–97. https://doi.org/10.1123/japa.14.1.74
- Lobjois, R., & Cavallo, V. (2007). Age-related differences in street-crossing decisions: The effects of vehicle speed and time constraints on gap selection in an estimation task. *Accident Analysis & Prevention, 39*(5), 934–943. https://doi.org/10.1016/j.aap.2006.12.013
- Lochhead, L., Feng, J., Laby, D. M., & Appelbaum, L. G. (2026). Training vision in athletes to improve sports performance: A systematic review of the literature. *International Review of Sport and Exercise Psychology, 19*(2), 333–355 (online 2024). https://doi.org/10.1080/1750984X.2024.2437385
- Mann, D. T., Williams, A. M., Ward, P., & Janelle, C. M. (2007). Perceptual-cognitive expertise in sport: A meta-analysis. *Journal of Sport and Exercise Psychology, 29*(4), 457–478. https://doi.org/10.1123/jsep.29.4.457
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2
- Rusch, M. L., Schall, M. C., Jr., Lee, J. D., Dawson, J. D., Edwards, S. V., & Rizzo, M. (2016). Time-to-contact estimation errors among older drivers with useful field of view impairments. *Accident Analysis & Prevention, 95*(Pt A), 284–291. https://doi.org/10.1016/j.aap.2016.07.008
- Schiff, W., & Detwiler, M. L. (1979). Information used in judging impending collision. *Perception, 8*(6), 647–658. https://doi.org/10.1068/p080647
- Schiff, W., Oldak, R., & Shah, V. (1992). Aging persons’ estimates of vehicular motion. *Psychology and Aging, 7*(4), 518–525. https://doi.org/10.1037/0882-7974.7.4.518
- Tresilian, J. R. (1995). Perceptual and cognitive processes in time-to-contact estimation: Analysis of prediction-motion and relative judgment tasks. *Perception & Psychophysics, 57*(2), 231–245. https://doi.org/10.3758/BF03206510
- Tresilian, J. R. (1999). Visually timed action: Time-out for ‘tau’? *Trends in Cognitive Sciences, 3*(8), 301–310. https://doi.org/10.1016/S1364-6613(99)01352-2
- Villavicencio, P., de la Malla, C., & López-Moliner, J. (2024). Prediction of time to contact under perceptual and contextual uncertainties. *Journal of Vision, 24*(6), 14. https://doi.org/10.1167/jov.24.6.14
- Williams, L. R., & Jasiewicz, J. M. (2001). Knowledge of results, movement type, and sex in coincidence timing. *Perceptual and Motor Skills, 92*(3 Pt 2), 1057–1068. https://doi.org/10.2466/pms.2001.92.3c.1057
- Yilmaz, E. H., & Warren, W. H., Jr. (1995). Visual control of braking: A test of the tau hypothesis. *Journal of Experimental Psychology: Human Perception and Performance, 21*(5), 996–1014. https://doi.org/10.1037/0096-1523.21.5.996

---

## 2. „Suchbild“ – visuelle Suche

### 2.1 Was wird trainiert

Ein Zielzeichen soll zwischen ähnlichen Ablenkern gefunden werden, z. B. ein C zwischen O. Dabei braucht es **gezielte Aufmerksamkeit**, **Blickbewegungen (Sakkaden)** und das **Unterscheiden ähnlicher Formen**. Neu werden die Anzahl der Elemente und ihre Ähnlichkeit adaptiv gesteuert.

### 2.2 Was sagt die Forschung

**Theorie.**
- **Merkmalsintegration:** Einfache Merkmale wie Farbe oder Ausrichtung werden parallel verarbeitet. Kombinationen von Merkmalen brauchen fokussierte Aufmerksamkeit (Treisman & Gelade, 1980).
- **Suchasymmetrie:** Ein Ziel **mit** einem zusätzlichen Merkmal wird effizient gefunden, ein Ziel, dem ein Merkmal **fehlt**, nicht. Linienenden („Terminatoren“) und Geschlossenheit wirken als solche Merkmale (Treisman & Souther, 1985).
  - **Folgerung für das Suchbild:** Ein C mit Lücke und Linienenden zwischen O ist die *leichte* Richtung. Ein O zwischen C ist die *schwere* Richtung. Je kleiner die Lücke, desto schwächer ist der Vorteil.
- **Guided Search:** Einfache Merkmale lenken die Aufmerksamkeit, der Rest wird mit begrenzter Kapazität abgearbeitet (Wolfe, 1994, 2021). Die Suche wird von fünf Faktoren gelenkt: Salienz, Zielmerkmal, Szenenwissen, Vorgeschichte (Priming) und Wert/Belohnung (Wolfe & Horowitz, 2017).
- **Mengeneffekt (Set Size):** Bei ineffizienter Suche (etwa T zwischen L) steigt die Suchzeit um etwa **25–35 ms pro Element**, wenn ein Ziel vorhanden ist, und um etwa das Doppelte, wenn es fehlt. Braucht es Blickbewegungen, wird die Suche noch deutlich ineffizienter (Wolfe, 2001).
- **Ähnlichkeit:** Die Suche wird schwerer, je ähnlicher Ziel und Ablenker sind **und** je unähnlicher die Ablenker untereinander sind. So entsteht ein Kontinuum der Sucheffizienz (Duncan & Humphreys, 1989).
- **Crowding:** Der kritische Abstand zwischen Objekten beträgt etwa **die Hälfte der Exzentrizität** (Bouma-Gesetz). Das „nicht gedrängte Fenster“ begrenzt Lese- und Suchgeschwindigkeit; unähnliche Nachbarn stören weniger (Bouma, 1970; Pelli & Tillman, 2008; Whitney & Levi, 2011). Kinder, ältere Menschen und Menschen mit Legasthenie zeigen mehr Crowding (Online-Studie mit 1.153 Personen; Li et al., 2020).

**Alter.** Bei 298 Personen zwischen 6 und 89 Jahren war die Suche früh und spät im Leben verlangsamt, bei Merkmalskombinationen stärker als bei einfachen Merkmalen. Im Alter litten besonders Durchgänge ohne Ziel und solche mit vielen Ablenkern (Hommel, Li & Li, 2004).

**Lernen und Transfer.**
- Anfangs serielle Suchen können nach **wenigen hundert Durchgängen** parallel werden. Das Gelernte blieb über Monate erhalten und übertrug sich auf andere Aufgaben, Orte im Gesichtsfeld und das andere Auge. Es war damit viel weniger spezifisch als klassisches Wahrnehmungslernen (Sireteanu & Rettenbach, 1995, 2000).
- Andere fanden **teilweise Spezifität**, fehlenden oder sogar negativen Transfer (Ellison & Walsh, 1998).
- Bei **konsistenter Zuordnung** (immer dieselben Ziele) entsteht automatisierte Entdeckung, die aber an die geübten Reize gebunden ist (Shiffrin & Schneider, 1977).
- Seltene Ziele werden häufiger übersehen („Prävalenzeffekt“; Wolfe, Horowitz & Kenner, 2005).
- Ältere Menschen verbesserten sich mit Strategieanweisung schon nach wenig Übung (Becic, Boot & Kramer, 2008).

**Klinischer Kontext (nicht unsere Zielgruppe).** Bei homonymer Hemianopsie (Halbseitenblindheit) verkürzte ein Suchtraining zu Hause (29 Patienten, 20 tägliche Sitzungen; Vorher-nachher-Vergleich, keine randomisierte Kontrollgruppe) die Suchzeiten und beschleunigte alltagsnahe Aufgaben; das Gesichtsfeld selbst wurde nicht größer (Pambakian et al., 2004). In einem RCT (n = 28) senkte ein exploratives Sakkadentraining die Suchzeit auf der blinden Seite um 47 % und die Suchzeit in natürlichen Szenen um 23 %; ein Flimmertraining wirkte nicht (Roth et al., 2009). Das zeigt, dass kompensatorische Suchstrategien trainierbar sind. Es handelt sich aber um eine andere Gruppe und ein anderes Protokoll.

**Evidenzbewertung Suchbild**

| Aussage | Evidenz |
|---|---|
| Mengeneffekt, Ähnlichkeit, Asymmetrie und Crowding bestimmen die Suchschwierigkeit | **stark** |
| Suchleistung verbessert sich mit Übung schnell und dauerhaft (in der Aufgabe und in ähnlichen Aufgaben) | **stark** (für die Aufgabe) / **mittel** (für ähnliche Aufgaben) |
| Nutzen für die Suche im Alltag bei Gesunden | **schwach** |
| Kompensatorisches Suchtraining bei Gesichtsfeldausfällen | **mittel** (klinisch, spezielles Protokoll – nicht übertragbar auf unsere Übung) |

### 2.3 Nutzen im Alltag

Gezieltes Suchen kommt ständig vor: Verkehrszeichen und Beschilderung, Regale, Fahrpläne, Bildschirme. Realistisch ist, dass die Suche in der Übung schneller und sicherer wird und dass man ähnliche Suchaufgaben etwas zügiger löst. Ein Nutzen im Alltag ist plausibel, aber **nicht belegt**. Für Senioren kann die Übung zugleich zeigen, wie viel **Abstand und Größe** beim Lesen und Finden helfen – ein guter Anlass zur Beratung über Beleuchtung und Nahkorrektur.

### 2.4 Empfehlungen für das Übungsdesign (Designvorschlag)

| Parameter | Empfehlung | Begründung |
|---|---|---|
| Elementgröße | Höhe ≥ 0,7° (≈ 5 mm bei 40 cm, ≈ 25 CSS-px auf dem iPad); Seniorenmodus 1,0° (≈ 7 mm). 0,7° liegt auch bei Visus 0,25 noch etwa doppelt über der Erkennungsschwelle (Herleitung) | Erkennbarkeit darf nicht der Engpass sein |
| Abstand (Mitte zu Mitte) | leicht ≥ 2,0 × Elementhöhe; schwer bis 1,3 ×, nie unter 1,1 × | Crowding (Bouma ≈ 0,5 × Exzentrizität; Pelli & Tillman 2008); Ältere zeigen mehr Crowding (Li et al. 2020) |
| Anordnung | Raster mit Zufallsversatz (±25 % der Zellgröße) statt starrer Reihen | weniger Streifenmuster (Sicherheit, Abschnitt 4.7), realistischere Suche |
| Anzahl N (adaptiv) | 6 → 12 → 20 → 30 → 42 → 56 (auf großen Tablets bis 96); pro Block 2–3 N-Werte mischen | Mengeneffekt messbar (Steigung in ms pro Element) |
| Ähnlichkeitsstufen | S1: C zwischen O, Lücke 30 % des Durchmessers · S2: Lücke 20 % (Landolt-typisch) · S3: Lücke 12 % · S4: **Umkehrung O zwischen C** · S5: ähnliche Zeichenpaare (E/F, P/R, N/M, 6/8), zufällig gedreht · S6: gemischte Ablenker (2–3 Sorten) plus Drehung | Asymmetrie (Treisman & Souther 1985) und Ähnlichkeitstheorie (Duncan & Humphreys 1989) |
| Adaptivität | Block à 10 Durchgänge: Trefferquote ≥ 90 % und Median-Suchzeit ≤ (1,5 s + 40 ms × N) → nächste Stufe; Trefferquote < 80 % → Stufe zurück. Erst N steigern, dann S, dabei N wieder auf mittlere Werte | Suchzeit wächst mit N; Richtwert aus Wolfe 2001 plus Aufschlag für Blickbewegungen |
| Kennwerte | Suchzeit, Fehler, **Steigung (ms pro Element)** per Regression über N, Exzentrizität des Ziels | Effizienzmaß statt nur Punkte |
| Durchgänge ohne Ziel | optional im Profi-Modus 10–20 % mit „Kein Ziel“-Knopf | trainiert gründliches Absuchen; macht den Prävalenzeffekt erlebbar (Wolfe et al. 2005) |
| Zeitlimit | 15 s; danach Ziel 1 s markieren | Frust vermeiden |
| Eingabe | nur den ersten Tipp werten; Tipps innerhalb von 150 ms danach ignorieren | im Original zählte ein Doppel-Tipp doppelt |
| Lernen vs. Generalisierung | Zeichensätze teils konstant (automatisiert schneller), teils rotierend (breiteres Lernen) | konsistente Zuordnung macht spezifisch (Shiffrin & Schneider 1977) |
| Rückmeldung | kleines, kurzes Aufleuchten nur der getippten Zelle, kein bildschirmweites rotes Blinken | Abschnitt 4.7 |

### 2.5 Ehrliche Formulierung für Laien

> „Beim Suchbild üben Sie, gezielt etwas zwischen ähnlichen Dingen zu finden. Solche Suchaufgaben werden mit Übung nachweislich schneller – ein Nutzen für das Suchen im Alltag ist möglich, aber nicht bewiesen.“

### 2.6 Quellen

- Becic, E., Boot, W. R., & Kramer, A. F. (2008). Training older adults to search more effectively: Scanning strategy and visual search in dynamic displays. *Psychology and Aging, 23*(2), 461–466. https://doi.org/10.1037/0882-7974.23.2.461
- Bouma, H. (1970). Interaction effects in parafoveal letter recognition. *Nature, 226*(5241), 177–178. https://doi.org/10.1038/226177a0
- Duncan, J., & Humphreys, G. W. (1989). Visual search and stimulus similarity. *Psychological Review, 96*(3), 433–458. https://doi.org/10.1037/0033-295X.96.3.433
- Ellison, A., & Walsh, V. (1998). Perceptual learning in visual search: Some evidence of specificities. *Vision Research, 38*(3), 333–345. https://doi.org/10.1016/S0042-6989(97)00195-8
- Hommel, B., Li, K. Z. H., & Li, S.-C. (2004). Visual search across the life span. *Developmental Psychology, 40*(4), 545–558. https://doi.org/10.1037/0012-1649.40.4.545
- Li, Q., Joo, S. J., Yeatman, J. D., & Reinecke, K. (2020). Controlling for participants’ viewing distance in large-scale, psychophysical online experiments using a virtual chinrest. *Scientific Reports, 10*, 904. https://doi.org/10.1038/s41598-019-57204-1
- Pambakian, A. L. M., Mannan, S. K., Hodgson, T. L., & Kennard, C. (2004). Saccadic visual search training: A treatment for patients with homonymous hemianopia. *Journal of Neurology, Neurosurgery & Psychiatry, 75*(10), 1443–1448. https://doi.org/10.1136/jnnp.2003.025957
- Pelli, D. G., & Tillman, K. A. (2008). The uncrowded window of object recognition. *Nature Neuroscience, 11*(10), 1129–1135. https://doi.org/10.1038/nn.2187
- Roth, T., Sokolov, A. N., Messias, A., Roth, P., Weller, M., & Trauzettel-Klosinski, S. (2009). Comparing explorative saccade and flicker training in hemianopia: A randomized controlled study. *Neurology, 72*(4), 324–331. https://doi.org/10.1212/01.wnl.0000341276.65721.f2
- Shiffrin, R. M., & Schneider, W. (1977). Controlled and automatic human information processing: II. Perceptual learning, automatic attending and a general theory. *Psychological Review, 84*(2), 127–190. https://doi.org/10.1037/0033-295X.84.2.127
- Sireteanu, R., & Rettenbach, R. (1995). Perceptual learning in visual search: Fast, enduring, but non-specific. *Vision Research, 35*(14), 2037–2043. https://doi.org/10.1016/0042-6989(94)00295-W
- Sireteanu, R., & Rettenbach, R. (2000). Perceptual learning in visual search generalizes over tasks, locations, and eyes. *Vision Research, 40*(21), 2925–2949. https://doi.org/10.1016/S0042-6989(00)00145-0
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology, 12*(1), 97–136. https://doi.org/10.1016/0010-0285(80)90005-5
- Treisman, A., & Souther, J. (1985). Search asymmetry: A diagnostic for preattentive processing of separable features. *Journal of Experimental Psychology: General, 114*(3), 285–310. https://doi.org/10.1037/0096-3445.114.3.285
- Whitney, D., & Levi, D. M. (2011). Visual crowding: A fundamental limit on conscious perception and object recognition. *Trends in Cognitive Sciences, 15*(4), 160–168. https://doi.org/10.1016/j.tics.2011.02.005
- Wolfe, J. M. (1994). Guided Search 2.0: A revised model of visual search. *Psychonomic Bulletin & Review, 1*(2), 202–238. https://doi.org/10.3758/BF03200774
- Wolfe, J. M. (2001). Asymmetries in visual search: An introduction. *Perception & Psychophysics, 63*(3), 381–389. https://doi.org/10.3758/BF03194406
- Wolfe, J. M. (2021). Guided Search 6.0: An updated model of visual search. *Psychonomic Bulletin & Review, 28*(4), 1060–1092. https://doi.org/10.3758/s13423-020-01859-9
- Wolfe, J. M., & Horowitz, T. S. (2017). Five factors that guide attention in visual search. *Nature Human Behaviour, 1*, 0058. https://doi.org/10.1038/s41562-017-0058
- Wolfe, J. M., Horowitz, T. S., & Kenner, N. M. (2005). Rare items often missed in visual searches. *Nature, 435*(7041), 439–440. https://doi.org/10.1038/435439a

---

## 3. „Blitzblick“ – Useful Field of View (UFOV) und Verarbeitungsgeschwindigkeit

### 3.1 Was wird trainiert

Kurz erscheint in der Mitte ein Objekt (Auto oder Lkw) und gleichzeitig am Rand ein Zielsymbol. Danach folgt eine Maske, und der Nutzer gibt an, was in der Mitte war und wo am Rand das Symbol stand. Geübt werden:
- **Verarbeitungsgeschwindigkeit:** Wie kurz darf ein Bild sein, damit man es noch erkennt?
- **Geteilte Aufmerksamkeit:** Mitte und Rand gleichzeitig.
- **Selektive Aufmerksamkeit:** Ablenker ignorieren.

Das „nützliche Gesichtsfeld“ (UFOV) ist der Bereich, aus dem man während **einer** Fixation Information aufnehmen kann. Es wird im Alter kleiner und ließ sich durch Übung teilweise wieder vergrößern (Ball et al., 1988).

### 3.2 Was sagt die Forschung

**Der Test.** Der UFOV-Test wurde entwickelt, um altersbedingte Probleme mit visueller Aufmerksamkeit zu erfassen, die übliche Sehtests nicht abbilden (Ball & Owsley, 1993).
- **Unfallrisiko:** Bei 294 Fahrern (55–87 Jahre) war eine UFOV-Einschränkung um ≥ 40 % mit einem **2,2-fach höheren Unfallrisiko** über 3 Jahre verbunden (95 %-KI 1,2–4,1). Das lag vor allem an der geteilten Aufmerksamkeit bei kurzen Darbietungszeiten (Owsley et al., 1998).
- **Was die aktuelle Version misst:** Sie misst die Verarbeitungsgeschwindigkeit, nicht mehr die räumliche Ausdehnung, und prüft bei einer einzigen Exzentrizität von etwa 10° (Wood & Owsley, 2014).
- **Zuverlässigkeit:** Die PC-Version ist zuverlässig (Test-Retest r = 0,88 mit Maus, 0,74 mit Touch; Edwards et al., 2005). Normwerte gibt es für 2.759 Personen zwischen 65 und 94 Jahren (Edwards et al., 2006).

**Protokoll (verifiziert).** Laut Aust & Edwards (2016):

| Element | Umsetzung im UFOV-Test |
|---|---|
| Zentrales Objekt | Piktogramm Auto oder Lkw (1,91° × 1,43°) in einem Fixationskasten von 2,86° |
| Darbietungszeit | 16,67–500 ms in Schritten von 16,67 ms (1 Bild bei 60 Hz) |
| Peripheres Ziel | Auto an einer von 8 radialen Positionen, etwa 10,5° von der Mitte |
| Untertest 3 | 47 nach unten zeigende Dreiecke als Ablenker, gleich groß, gleich kontrastreich und gleich hell wie das Ziel |
| Untertest 4 | zwei zentrale Objekte (gleich oder verschieden) |
| Darstellung | weiße Reize auf schwarzem Grund, danach Maske |
| Schwelle | 75 % richtig, bestimmt per doppelter Staircase |

Andere Umsetzungen: Ross et al. (2019) nennen 17–500 ms für vier Untertests. Woutersen et al. (2018) nutzten 13,7° bei 50 cm und Ablenkerringe bei 4,6°, 9,1° und 13,7°. Bei Gesunden zwischen 19 und 70 Jahren (n = 41) lag Untertest 1 im Mittel bei 14 ms und Untertest 2 bei 30 ms (85 % unter 32 ms) – also am **Boden**. Untertest 3 lag im Mittel bei 88 ms (14–263 ms) und verschlechterte sich linear mit dem Alter (R² = 0,36).

**ACTIVE-Studie (RCT, 2.832 Personen zwischen 65 und 94 Jahren; Ball et al., 2002).**
- **Protokoll:** 10 Sitzungen à 60–75 Minuten in 5–6 Wochen, in Gruppen und betreut. Aufgaben: visuelle Suche und Identifikation, zunehmend komplex. Schwerer wurde es durch kürzere Darbietung, visuelle oder akustische Ablenkung, mehr gleichzeitige Aufgaben und ein größeres räumliches Feld. Die nächste Stufe folgte nach Erreichen eines Kriteriums. Einer zufälligen Teilstichprobe von 60 % wurden nach 11 Monaten 4 Auffrischsitzungen angeboten.
- **Sofortige Wirkung:** 87 % der Geschwindigkeitsgruppe verbesserten sich verlässlich; Effektstärke ≈ 1,46 SD. Nach 2 Jahren zeigten sich **keine** Effekte auf das Alltagsfunktionieren.
- **Nach 10 Jahren:** Die Geschwindigkeit war weiter verbessert (d = 0,66; 99 %-KI 0,43–0,88). Selbstberichtete Schwierigkeiten mit Alltagsaktivitäten (IADL) waren geringer (d = 0,36; 99 %-KI 0,01–0,72). Die Auffrischsitzungen brachten zusätzlich d = 0,62 (Rebok et al., 2014).
- **Unfälle:** Über etwa 6 Jahre hatten 908 Fahrer der Geschwindigkeitsgruppe **weniger selbst verschuldete Unfälle pro gefahrener Meile** (Rate Ratio 0,57; 95 %-KI 0,34–0,96; Ball et al., 2010).
- **Fahrverzicht:** Fahrer mit Verarbeitungsdefiziten gaben nach dem Training über 3 Jahre seltener das Autofahren auf (Hazard Ratio 0,60; 95 %-KI 0,36–0,995; p = 0,048; 9 % gegenüber 14 % bei ≥ 8 Sitzungen; Edwards, Delahunt & Mahncke, 2009). In einem RCT mit Risikofahrern blieb die Mobilität über 3 Jahre erhalten (Edwards et al., 2009).
- **Mobilität über 5 Jahre:** In der Intention-to-Treat-Analyse gab es **keinen signifikanten Effekt**, nur in Dosis- und Booster-Teilgruppen (Ross et al., 2016).
- **Demenz nach 10 Jahren:** Hazard Ratio 0,71 (95 %-KI 0,50–0,998; p = 0,049; 260 Fälle); jede zusätzliche Sitzung senkte das Risiko um 10 % (Edwards et al., 2017).
- **Demenz nach 20 Jahren (Krankenkassendaten, n = 2.021):** Geringeres Risiko nur bei Teilnahme an ≥ 1 Auffrischsitzung (HR 0,75; 95 %-KI 0,59–0,95); ohne Auffrischung HR 1,01. Gedächtnis- und Denktraining zeigten keinen Effekt. Offengelegter Interessenkonflikt: K. Ball berät das Unternehmen, das Test und Training vermarktet (Posit Science), und besitzt Anteile daran (Coe et al., 2026).
- **Lebensqualität:** Weniger starke Verschlechterung der gesundheitsbezogenen Lebensqualität über 5 Jahre (Wolinsky et al., 2006) und eine besser erhaltene selbst eingeschätzte Gesundheit (Wolinsky et al., 2010).

**IHAMS-RCT (681 Personen ab 50 Jahren; Wolinsky et al., 2013).** 10 Stunden Training – auch in einem Arm **zu Hause** – verbesserten den UFOV-Wert gegenüber einer aktiven Kontrolle (Kreuzworträtsel) klein bis mittel (d = 0,32–0,58), andere Tests nur klein (Trail Making, SDMT, Stroop).

**Übersichten.**
- **Pro:** Eine Metaanalyse fand 44 Arbeiten aus 17 RCTs. UFOV-Training verbesserte Verarbeitungsgeschwindigkeit und Aufmerksamkeit und übertrug sich auf Alltagsfunktionen. Adaptive Verfahren wirkten besser als nicht adaptive. Auf andere neuropsychologische Tests gab es keinen Transfer (Edwards et al., 2018).
- **Kritisch:** Simons et al. (2016) sehen wenig belastbare Evidenz für Transfer in den Alltag. Kontrollgruppen ohne Kontakt können Erwartungs- und Placeboeffekte nicht ausschließen, und selbst aktive Kontrollen reichen dafür oft nicht (Boot et al., 2013). Ein Cochrane-Review fand für computergestütztes Training über ≥ 12 Wochen bei gesunden Älteren nur Evidenz von **niedriger bis sehr niedriger Vertrauenswürdigkeit** (8 RCTs, 1.183 Personen; Gates et al., 2020).

**Kritik und Grenzen (zusammengefasst)**
1. Der **nahe Transfer** (UFOV selbst) ist robust. Beim **fernen Transfer** (Unfälle, Mobilität, Demenz) liegen die Konfidenzintervalle oft knapp an 1 bzw. die p-Werte knapp bei 0,05. Es handelt sich meist um sekundäre Analysen, bei Mobilität war die ITT-Analyse ohne Befund.
2. Viele Endpunkte und Analysen erhöhen das Risiko falsch-positiver Ergebnisse. Der 20-Jahres-Befund zur Demenz beruht auf einer Teilgruppe nach Auffrischteilnahme; ohne Auffrischung zeigte sich kein Effekt.
3. Die Kontrollgruppe in ACTIVE hatte keinen Kontakt. Es gibt Interessenkonflikte.
4. Das untersuchte Training war **betreut, in Gruppen, 10 × 60–75 min**, bei Menschen **ab 65 Jahren**. Unbetreutes Heimtraining war in der Metaanalyse von Lampit et al. (2014) wirkungsschwächer; IHAMS zeigte aber auch zu Hause nahen Transfer.
5. **Unsere Web-Übung ist vom UFOV-Prinzip inspiriert, aber nicht das untersuchte Programm.** Die Studienergebnisse gelten nicht automatisch für sie.

**Evidenzbewertung Blitzblick**

| Aussage | Evidenz |
|---|---|
| Eingeschränktes UFOV geht bei älteren Fahrern mit höherem Unfallrisiko einher | **mittel bis stark** |
| Training verbessert die UFOV-Leistung (naher Transfer), dauerhaft | **stark** |
| Weniger selbst verschuldete Unfälle bzw. späterer Fahrverzicht (Ältere, Originalprotokoll) | **mittel** (ein großes RCT, sekundäre Analysen, knappe Intervalle) |
| Geringeres Demenzrisiko | **schwach bis mittel, vorläufig** (sekundärer Endpunkt, Teilgruppe, Interessenkonflikt) |
| Nutzen für junge Erwachsene oder Sportler | **fehlend/schwach** |
| Wirksamkeit unserer Web-Version | **fehlend** (nicht untersucht) |

### 3.3 Nutzen im Alltag

Die Blitzblick-Übung hat unter allen vier Übungen die **beste Evidenzbasis**: Bei älteren Autofahrern hängt die Fähigkeit, Mitte und Rand gleichzeitig schnell zu erfassen, mit dem Unfallrisiko zusammen, und ein ähnliches Training ging in Studien mit weniger selbst verschuldeten Unfällen einher. Wir dürfen daraus aber **keine Sicherheitsgarantie** für unsere Version ableiten. Die Übung ersetzt weder ärztliche Fahreignungsuntersuchungen noch Sehtests.

### 3.4 Empfehlungen für das Übungsdesign (Designvorschlag, angelehnt an das verifizierte UFOV-Protokoll)

| Parameter | Empfehlung |
|---|---|
| Gerät und Abstand | Tablet ab 10″; Abstand 40 cm annehmen oder kalibrieren (Kreditkarte + blinder Fleck; Li et al. 2020); Pixel pro Grad berechnen. Auf Smartphones ist die Exzentrizität kleiner – dort Ergebnisse als „nicht vergleichbar“ kennzeichnen |
| Fixation | Kreuz (0,5°) für zufällig 500–1.000 ms |
| Zentrales Objekt | 2 Piktogramme (Auto/Lkw) von ≈ 1,9° × 1,4° in einem Kasten von ≈ 2,9°, gleiche Fläche und Helligkeit; spätere Stufen mit ähnlicheren Paaren oder zwei Objekten (gleich/verschieden, wie Untertest 4) |
| Peripheres Ziel | Piktogramm an einer von 8 Richtungen; Exzentrizität in Stufen 5° → 7,5° → 10° (≈ UFOV 10,5°), auf großen Tablets quer optional 12,5–14°. Bei 40 cm entsprechen 10° ≈ 7 cm |
| Ablenker | ab Stufe 3: 24–47 Dreiecke in 3 Ringen (z. B. 4,5°, 7°, 10°), gleich groß, kontrastreich und hell wie das Ziel |
| Ablauf | Fixation → Reiz (N Frames) → **Maske 300–500 ms** (Zufallsmuster aus Blöcken, mittlere Helligkeit nahe dem Hintergrund, **kein** Streifengitter, nicht vollflächig weiß) → Antwort 1 (Mitte, 2 Knöpfe) → Antwort 2 (Rand, 8 Felder antippen) → kleine Rückmeldung → Pause ≥ 1 s. Richtig ist ein Durchgang nur, wenn beide Antworten stimmen (Ratewahrscheinlichkeit 1/16) |
| Darbietungszeiten | in ganzen Frames. Leiter bei 60 Hz: 500, 400, 333, 267, 217, 183, 150, 117, 100, 83, 67, 50, 33, 17 ms (30 … 1 Frame) |
| Staircase | gewichtetes Auf-Ab-Verfahren für 75 % (Kaernbach 1991): richtig → 1 Stufe kürzer, falsch → 3 Stufen länger. Start bei 500 ms (Senioren) bzw. 250 ms; Ende nach 10 Umkehrpunkten bzw. 40–60 Durchgängen; Schwelle = Mittel der letzten 6 Umkehrpunkte |
| Stufen | L1 nur Mitte → L2 Mitte + Rand → L3 + Ablenker → L4 zwei zentrale Objekte + Rand + Ablenker; innerhalb der Stufe die Exzentrizität steigern. Gesunde Jüngere direkt ab L2/L3 beginnen lassen (Bodeneffekte bei L1/L2; Woutersen et al. 2018) |
| Timing-Kontrolle | Bildwiederholrate messen (Median der rAF-Intervalle); Beginn und Ende mit rAF-Zeitstempeln protokollieren; Durchgänge mit > 1 Frame Abweichung verwerfen und wiederholen (Pronk et al. 2020; Elze & Tanner 2012). Bei 120-Hz-Geräten 8,3-ms-Schritte erlauben, aber Dauer in ms plus Wiederholrate speichern |
| Umfang | Studien: 10 × 60–75 min (ACTIVE) bzw. 10 h (IHAMS). Web: 20–30 min pro Einheit, höchstens 3 × pro Woche; kürzere Einheiten sind möglich, aber schwächer belegt (Lampit et al. 2014) |
| Ergebnisanzeige | persönliche Schwelle in ms und Verlauf; **keine** Risikokategorien, kein „fahrtauglich/nicht fahrtauglich“ |

### 3.5 Ehrliche Formulierung für Laien

> „Blitzblick ist an einen gut untersuchten Test (UFOV) angelehnt: Bei älteren Menschen ging ein ähnliches, betreutes Training in Studien mit weniger selbst verschuldeten Autounfällen einher. Unsere Online-Version ist davon inspiriert, aber selbst nicht wissenschaftlich geprüft – sie ersetzt keine Fahreignungs- oder Sehuntersuchung.“

### 3.6 Quellen

- Aust, F., & Edwards, J. D. (2016). Incremental validity of Useful Field of View subtests for the prediction of instrumental activities of daily living. *Journal of Clinical and Experimental Neuropsychology, 38*(5), 497–515. https://doi.org/10.1080/13803395.2015.1125453
- Ball, K., Berch, D. B., Helmers, K. F., Jobe, J. B., Leveck, M. D., Marsiske, M., Morris, J. N., Rebok, G. W., Smith, D. M., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2002). Effects of cognitive training interventions with older adults: A randomized controlled trial. *JAMA, 288*(18), 2271–2281. https://doi.org/10.1001/jama.288.18.2271
- Ball, K., Edwards, J. D., Ross, L. A., & McGwin, G., Jr. (2010). Cognitive training decreases motor vehicle collision involvement of older drivers. *Journal of the American Geriatrics Society, 58*(11), 2107–2113. https://doi.org/10.1111/j.1532-5415.2010.03138.x
- Ball, K., & Owsley, C. (1993). The useful field of view test: A new technique for evaluating age-related declines in visual function. *Journal of the American Optometric Association, 64*(1), 71–79. https://pubmed.ncbi.nlm.nih.gov/8454831/
- Ball, K. K., Beard, B. L., Roenker, D. L., Miller, R. L., & Griggs, D. S. (1988). Age and visual search: Expanding the useful field of view. *Journal of the Optical Society of America A, 5*(12), 2210–2219. https://doi.org/10.1364/JOSAA.5.002210
- Boot, W. R., Simons, D. J., Stothart, C., & Stutts, C. (2013). The pervasive problem with placebos in psychology: Why active control groups are not sufficient to rule out placebo effects. *Perspectives on Psychological Science, 8*(4), 445–454. https://doi.org/10.1177/1745691613491271
- Coe, N. B., Miller, K. E. M., Sun, C., Taggert, E., Gross, A. L., Jones, R. N., Felix, C., Albert, M. S., Rebok, G. W., Marsiske, M., Ball, K. K., & Willis, S. L. (2026). Impact of cognitive training on claims-based diagnosed dementia over 20 years: Evidence from the ACTIVE study. *Alzheimer’s & Dementia: Translational Research & Clinical Interventions, 12*(1), e70197. https://doi.org/10.1002/trc2.70197
- Edwards, J. D., Delahunt, P. B., & Mahncke, H. W. (2009). Cognitive speed of processing training delays driving cessation. *The Journals of Gerontology: Series A, 64A*(12), 1262–1267. https://doi.org/10.1093/gerona/glp131
- Edwards, J. D., Fausto, B. A., Tetlow, A. M., Corona, R. T., & Valdés, E. G. (2018). Systematic review and meta-analyses of useful field of view cognitive training. *Neuroscience & Biobehavioral Reviews, 84*, 72–91. https://doi.org/10.1016/j.neubiorev.2017.11.004
- Edwards, J. D., Myers, C., Ross, L. A., Roenker, D. L., Cissell, G. M., McLaughlin, A. M., & Ball, K. K. (2009). The longitudinal impact of cognitive speed of processing training on driving mobility. *The Gerontologist, 49*(4), 485–494. https://doi.org/10.1093/geront/gnp042
- Edwards, J. D., Ross, L. A., Wadley, V. G., Clay, O. J., Crowe, M., Roenker, D. L., & Ball, K. K. (2006). The useful field of view test: Normative data for older adults. *Archives of Clinical Neuropsychology, 21*(4), 275–286. https://doi.org/10.1016/j.acn.2006.03.001
- Edwards, J. D., Vance, D. E., Wadley, V. G., Cissell, G. M., Roenker, D. L., & Ball, K. K. (2005). Reliability and validity of useful field of view test scores as administered by personal computer. *Journal of Clinical and Experimental Neuropsychology, 27*(5), 529–543. https://doi.org/10.1080/13803390490515432
- Edwards, J. D., Xu, H., Clark, D. O., Guey, L. T., Ross, L. A., & Unverzagt, F. W. (2017). Speed of processing training results in lower risk of dementia. *Alzheimer’s & Dementia: Translational Research & Clinical Interventions, 3*(4), 603–611. https://doi.org/10.1016/j.trci.2017.09.002
- Gates, N. J., Rutjes, A. W., Di Nisio, M., Karim, S., Chong, L.-Y., March, E., Martínez, G., & Vernooij, R. W. (2020). Computerised cognitive training for 12 or more weeks for maintaining cognitive function in cognitively healthy people in late life. *Cochrane Database of Systematic Reviews, 2020*(2), CD012277. https://doi.org/10.1002/14651858.CD012277.pub3
- Kaernbach, C. (1991). Simple adaptive testing with the weighted up-down method. *Perception & Psychophysics, 49*(3), 227–229. https://doi.org/10.3758/BF03214307
- Lampit, A., Hallock, H., & Valenzuela, M. (2014). Computerized cognitive training in cognitively healthy older adults: A systematic review and meta-analysis of effect modifiers. *PLoS Medicine, 11*(11), e1001756. https://doi.org/10.1371/journal.pmed.1001756
- Owsley, C., Ball, K., McGwin, G., Jr., Sloane, M. E., Roenker, D. L., White, M. F., & Overley, E. T. (1998). Visual processing impairment and risk of motor vehicle crash among older adults. *JAMA, 279*(14), 1083–1088. https://doi.org/10.1001/jama.279.14.1083
- Rebok, G. W., Ball, K., Guey, L. T., Jones, R. N., Kim, H.-Y., King, J. W., Marsiske, M., Morris, J. N., Tennstedt, S. L., Unverzagt, F. W., & Willis, S. L. (2014). Ten-year effects of the Advanced Cognitive Training for Independent and Vital Elderly cognitive training trial on cognition and everyday functioning in older adults. *Journal of the American Geriatrics Society, 62*(1), 16–24. https://doi.org/10.1111/jgs.12607
- Ross, L. A., Edwards, J. D., O’Connor, M. L., Ball, K. K., Wadley, V. G., & Vance, D. E. (2016). The transfer of cognitive speed of processing training to older adults’ driving mobility across 5 years. *The Journals of Gerontology: Series B, 71*(1), 87–97. https://doi.org/10.1093/geronb/gbv022
- Ross, L. A., Webb, C. E., Whitaker, C., Hicks, J. M., Schmidt, E. L., Samimy, S., Dennis, N. A., & Visscher, K. M. (2019). The effects of useful field of view training on brain activity and connectivity. *The Journals of Gerontology: Series B, 74*(7), 1152–1162. https://doi.org/10.1093/geronb/gby041
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983
- Wolinsky, F. D., Mahncke, H., Vander Weg, M. W., Martin, R., Unverzagt, F. W., Ball, K. K., Jones, R. N., & Tennstedt, S. L. (2010). Speed of processing training protects self-rated health in older adults: Enduring effects observed in the multi-site ACTIVE randomized controlled trial. *International Psychogeriatrics, 22*(3), 470–478. https://doi.org/10.1017/S1041610209991281
- Wolinsky, F. D., Unverzagt, F. W., Smith, D. M., Jones, R., Stoddard, A., & Tennstedt, S. L. (2006). The ACTIVE cognitive training trial and health-related quality of life: Protection that lasts for 5 years. *The Journals of Gerontology: Series A, 61*(12), 1324–1329. https://doi.org/10.1093/gerona/61.12.1324
- Wolinsky, F. D., Vander Weg, M. W., Howren, M. B., Jones, M. P., & Dotson, M. M. (2013). A randomized controlled trial of cognitive training using a visual speed of processing intervention in middle aged and older adults. *PLoS ONE, 8*(5), e61624. https://doi.org/10.1371/journal.pone.0061624
- Wood, J. M., & Owsley, C. (2014). Useful field of view test. *Gerontology, 60*(4), 315–318. https://doi.org/10.1159/000356753
- Woutersen, K., van den Berg, A. V., Boonstra, F. N., Theelen, T., & Goossens, J. (2018). Useful field of view test performance throughout adulthood in subjects without ocular disorders. *PLoS ONE, 13*(5), e0196534. https://doi.org/10.1371/journal.pone.0196534

---

## 4. „Aus dem Takt“ – zeitliche Verarbeitung / Flimmern (mit Sicherheitsabschnitt)

### 4.1 Was wird trainiert

In einem Raster pulsieren Felder langsam; eines pulsiert in einem **anderen Takt**. Geübt wird das Erkennen eines Unterschieds in der **zeitlichen Frequenz** bei verteilter Aufmerksamkeit – im Grunde ein „Suchbild in der Zeit“. Das ist **keine Messung und kein Training der Flimmerverschmelzungsfrequenz (CFF)**.

### 4.2 Was sagt die Forschung

**Was die CFF misst.** Die CFF ist die Frequenz, ab der ein flimmerndes Licht als gleichmäßig erscheint. Sie beschreibt die zeitliche Auflösung des Sehsystems.
- **Typische Werte:** Flimmern wird bis etwa **50–90 Hz** wahrgenommen; bei scharfen Kanten und Blicksprüngen sind Artefakte sogar über 500 Hz sichtbar (Mankowska et al., 2021; Davis, Hsieh & Lee, 2015).
- **Einflussgrößen:** Die CFF steigt mit der Leuchtdichte (Ferry-Porter-Gesetz). Wie steil sie steigt, hängt vom Netzhautort ab: Von der Foveola bis 35° Exzentrizität nimmt die Steigung um mehr als das Doppelte zu (Tyler & Hamer, 1990). Dazu kommen viele weitere Störgrößen (Muth et al., 2023).
- **Alter:** Die CFF nimmt über die ganze Lebensspanne linear ab (130 Personen zwischen 9 und 86 Jahren; Lachenmayr et al., 1994). Die foveale Flimmer-Kontrastempfindlichkeit sinkt erst ab etwa 44 Jahren, dann um ≈ 0,78 Dezilog pro Jahrzehnt (Kim & Mayer, 1994).
- **Messung:** In Studien wird die CFF mit **LEDs** gemessen (z. B. Staircase-Methode mit 5-mm-LED, 0,2° Reizgröße; Eisen-Enosh et al., 2017).

**Warum Tablets und Monitore die CFF nicht messen können**
1. **Abtastgrenze:** Ein 60-Hz-Display kann höchstens 30 Hz darstellen (ein Bild an, eins aus), ein 120-Hz-Display höchstens 60 Hz. Frequenzen dazwischen entstehen nur als unregelmäßige Bildfolgen.
2. **Displaytechnik:** Flanken, Übersteuerung (Overdrive) und Eingabeverzögerung von LCDs sind unpräzise (Elze & Tanner, 2012). Dazu kommen ausgelassene Frames im Browser und geräteabhängiges Timing (Bridges et al., 2020; Anwyl-Irvine et al., 2021; Pronk et al., 2020).
3. **Unbekannte Bedingungen:** Leuchtdichte, Reizgröße und Netzhautort sind unbekannt – alles Faktoren, von denen die CFF stark abhängt (Tyler & Hamer, 1990; Muth et al., 2023).
4. **Sicherheit:** Flimmern zwischen 15 und 25 Hz ist am stärksten anfallsauslösend (Fisher et al., 2005). CFF-nahe Tests wären also gerade im gefährlichen Bereich.

**Zeitliche Frequenzunterscheidung.**
- **Weber-Anteile:** Die relative Unterschiedsschwelle Δf/f war **am besten nahe 1,5, 4 und 30 Hz (0,08)** und am schlechtesten nahe 20 Hz (0,50). Die Reize waren dabei in der wahrgenommenen Modulationstiefe angeglichen, damit Helligkeitsunterschiede kein Hinweis sind (Mandler, 1984).
- **Fovea und Peripherie:** Die Schwellen sind in der Fovea und bei 30° Exzentrizität ähnlich (innerhalb eines Faktors 2; Waugh & Hess, 1994).
- **Flimmern als Suchmerkmal:** Flimmern ist ein grundlegendes Merkmal in der visuellen Suche, mit maximaler Empfindlichkeit bei etwa 10 Hz (Spalek, Kawahara & Di Lollo, 2009). Unterschiede **> 5 Hz** (1,3 gegenüber 12,1 Hz) „springen ins Auge“. Entscheidend war die **relative**, nicht die absolute Frequenz (Cass, Van der Burg & Alais, 2011).
- **Zeitliche Grenzen:** Es gibt schnelle Mechanismen für einfache Merkmale und langsame für das Verbinden getrennter Merkmale (Holcombe, 2009). Den Takt an verschiedenen Orten zu vergleichen, ist deshalb aufmerksamkeitsintensiv.

**Lernen.** In unserer Recherche (PubMed, Sept. 2026) fanden wir **keine Trainingsstudie**, die bei Gesunden gezielt das Unterscheiden **langsamer** Puls- bzw. Flimmerfrequenzen übt und einen Alltagsnutzen prüft. Das ist eine **Evidenzlücke**. Verwandte Befunde:
- Die CFF stieg nach einem Lernverfahren für Bewegungsrichtungen deutlich und blieb über ein Jahr erhöht (Laborstudie; Seitz et al., 2006).
- Ein CFF-ähnliches Training (5 Sitzungen, insgesamt ≈ 150 min) verbesserte die CFF im amblyopen Auge um 17 %. Bei den **Normalsichtigen** zeigte sich **kein** Effekt (je 6 Personen; Eisen-Enosh et al., 2023).
- Das Unterscheiden zeitlicher Intervalle ist lernbar; mit „Double Training“ übertrug es sich auch zwischen Sehen und Hören (Xiong, Guan & Yu, 2022).

**Ist die Übung sinnvoll? (ehrlich)** Als **Aufmerksamkeits- und Konzentrationsspiel** mit einer sauber messbaren Kennzahl (Weber-Schwelle in %) ist sie vertretbar. Einen Nutzen für das Sehen im Alltag gibt es **nicht belegt**. Mit „schneller sehen“ oder „Flimmerfrequenz trainieren“ darf nicht geworben werden.

**Evidenzbewertung Aus dem Takt**

| Aussage | Evidenz |
|---|---|
| Menschen unterscheiden zeitliche Frequenzen mit Weber-Anteilen um 8 % (Laborbestwert) bis 50 % je nach Frequenz | **stark** (Grundlagen) |
| Übung verbessert diese Unterscheidung | **schwach** (kaum direkte Studien) |
| Nutzen im Alltag | **fehlend** |
| CFF am Tablet messbar oder trainierbar | **nein** (technisch ausgeschlossen) |

### 4.3 Nutzen im Alltag

Kein belegter Alltagsnutzen. Die Übung ist ein ruhiges Konzentrationsspiel, das die Aufmerksamkeit für zeitliche Unterschiede fordert. Der praktische Wert liegt in Abwechslung und Motivation innerhalb der Plattform.

### 4.4 Empfehlungen für das Übungsdesign (Designvorschlag, innerhalb der Sicherheitsgrenzen aus 4.7)

| Parameter | Empfehlung | Begründung |
|---|---|---|
| Raster | 3 × 3 → 4 × 4 → 5 × 5 (6 × 6 nur auf großen Tablets); Feldgröße ≥ 1,5°, Lücken ≥ 0,5° | lösbar, gesamte pulsierende Fläche < 25 % des Bildschirms |
| Helligkeit (gleich für alle Felder) | in **linearer Leuchtdichte** rechnen (sRGB-Formel wie bei WCAG), dann in sRGB zurückwandeln. Standard: Hintergrund sRGB 20 (rel. Leuchtdichte ≈ 0,007), Feld pendelt zwischen sRGB 30 und 60 (0,013 ↔ 0,045; **ΔL ≈ 0,032**; Michelson-Kontrast ≈ 0,55) | gut sichtbar, aber weit unter der WCAG-Blitzschwelle (0,10) und bei ≤ 600 cd/m² Displayspitze ≤ ≈ 19 cd/m² (unter 20 cd/m² nach ITU/EFA) |
| Amplitude | für alle Felder gleich; optional „Roving“: jedes Feld ±15 % zufällig | Helligkeit darf kein Hinweis sein (im Original pulsierte die Anomalie doppelt so hell; vgl. die angeglichene Modulationstiefe bei Mandler 1984) |
| Wellenform | Sinus bzw. angehobener Kosinus, **kein** sin⁶-Puls und kein Rechteck | keine abrupten Helligkeitssprünge |
| Phase | pro Feld und Durchgang zufällig 0–2π | Synchronie oder Phase dürfen die Anomalie nicht verraten |
| Grundfrequenz f₀ | jede Runde zufällig 1,0–1,8 Hz | kein absoluter Takt lernbar; relevant ist die relative Frequenz (Cass et al. 2011) |
| Anomalie | f₁ = f₀ · (1 ± Δ), Vorzeichen zufällig; **Obergrenze 2,5 Hz** (sonst Minusvariante) | Sicherheit (4.7) |
| Δ (adaptiv) | Start 0,40; 2-down-1-up (≈ 71 % richtig); Schrittfaktor 1,25 (logarithmisch); Untergrenze 0,04; Schwelle = geometrisches Mittel der letzten 6 Umkehrpunkte. Realistische Bestwerte ≈ 0,08–0,15 | Weber-Anteil ≈ 0,08 bei 1,5 Hz unter Laborbedingungen (Mandler 1984); Staircase nach Levitt 1971 |
| Beobachtungszeit | Antwort erst nach ≥ 2 s möglich, höchstens 10 s pro Durchgang, danach ≥ 2 s ruhiges Standbild | Frequenzvergleich braucht mehrere Zyklen; Pausen (4.7) |
| Störreize | das „Entropie“-Aufblitzen des Originals weglassen oder nur langsam und unterschwellig | keine zusätzlichen Transienten |
| Zeitbasis | Helligkeit aus `performance.now()` berechnen, nicht aus der Frame-Anzahl | ausgelassene Frames verfälschen die Frequenz nicht |
| Kennwert | „Taktschwelle“: Unterschiede ab x % erkennbar; Verlauf | verständlich und ehrlich |

### 4.5 Ehrliche Formulierung für Laien

> „‚Aus dem Takt‘ ist ein Konzentrationsspiel für Ihr Zeitgefühl beim Sehen: Finden Sie das Feld, das anders pulsiert. Es fordert die Aufmerksamkeit – eine Verbesserung des Sehens oder eine medizinische Wirkung ist nicht belegt.“

### 4.6 Quellen (Aus dem Takt)

- Anwyl-Irvine, A., Dalmaijer, E. S., Hodges, N., & Evershed, J. K. (2021). Realistic precision and accuracy of online experiment platforms, web browsers, and devices. *Behavior Research Methods, 53*(4), 1407–1425. https://doi.org/10.3758/s13428-020-01501-5
- Bridges, D., Pitiot, A., MacAskill, M. R., & Peirce, J. W. (2020). The timing mega-study: Comparing a range of experiment generators, both lab-based and online. *PeerJ, 8*, e9414. https://doi.org/10.7717/peerj.9414
- Cass, J., Van der Burg, E., & Alais, D. (2011). Finding flicker: Critical differences in temporal frequency capture attention. *Frontiers in Psychology, 2*, 320. https://doi.org/10.3389/fpsyg.2011.00320
- Davis, J., Hsieh, Y.-H., & Lee, H.-C. (2015). Humans perceive flicker artifacts at 500 Hz. *Scientific Reports, 5*, 7861. https://doi.org/10.1038/srep07861
- Eisen-Enosh, A., Farah, N., Burgansky-Eliash, Z., Polat, U., & Mandel, Y. (2017). Evaluation of critical flicker-fusion frequency measurement methods for the investigation of visual temporal resolution. *Scientific Reports, 7*, 15621. https://doi.org/10.1038/s41598-017-15034-z
- Eisen-Enosh, A., Farah, N., Polat, U., & Mandel, Y. (2023). Perceptual learning based on a temporal stimulus enhances visual function in adult amblyopic subjects. *Scientific Reports, 13*, 7643. https://doi.org/10.1038/s41598-023-34421-3
- Elze, T., & Tanner, T. G. (2012). Temporal properties of liquid crystal displays: Implications for vision science experiments. *PLoS ONE, 7*(9), e44048. https://doi.org/10.1371/journal.pone.0044048
- Holcombe, A. O. (2009). Seeing slow and seeing fast: Two limits on perception. *Trends in Cognitive Sciences, 13*(5), 216–221. https://doi.org/10.1016/j.tics.2009.02.005
- Kim, C. B., & Mayer, M. J. (1994). Foveal flicker sensitivity in healthy aging eyes. II. Cross-sectional aging trends from 18 through 77 years of age. *Journal of the Optical Society of America A, 11*(7), 1958–1969. https://doi.org/10.1364/JOSAA.11.001958
- Lachenmayr, B. J., Kojetinsky, S., Ostermaier, N., Angstwurm, K., Vivell, P. M., & Schaumberger, M. (1994). The different effects of aging on normal sensitivity in flicker and light-sense perimetry. *Investigative Ophthalmology & Visual Science, 35*(6), 2741–2748. https://pubmed.ncbi.nlm.nih.gov/8188467/
- Mandler, M. B. (1984). Temporal frequency discrimination above threshold. *Vision Research, 24*(12), 1873–1880. https://doi.org/10.1016/0042-6989(84)90020-8
- Mankowska, N. D., Marcinkowska, A. B., Waskow, M., Sharma, R. I., Kot, J., & Winklewski, P. J. (2021). Critical flicker fusion frequency: A narrative review. *Medicina, 57*(10), 1096. https://doi.org/10.3390/medicina57101096
- Muth, T., Schipke, J. D., Brebeck, A. K., & Dreyer, S. (2023). Assessing critical flicker fusion frequency: Which confounders? A narrative review. *Medicina, 59*(4), 800. https://doi.org/10.3390/medicina59040800
- Seitz, A. R., Nanez, J. E., Sr., Holloway, S. R., & Watanabe, T. (2006). Perceptual learning of motion leads to faster flicker perception. *PLoS ONE, 1*(1), e28. https://doi.org/10.1371/journal.pone.0000028
- Spalek, T. M., Kawahara, J., & Di Lollo, V. (2009). Flicker is a primitive visual attribute in visual search. *Canadian Journal of Experimental Psychology, 63*(4), 319–322. https://doi.org/10.1037/a0015716
- Tyler, C. W., & Hamer, R. D. (1990). Analysis of visual modulation sensitivity. IV. Validity of the Ferry–Porter law. *Journal of the Optical Society of America A, 7*(4), 743–758. https://doi.org/10.1364/JOSAA.7.000743
- Waugh, S. J., & Hess, R. F. (1994). Suprathreshold temporal-frequency discrimination in the fovea and the periphery. *Journal of the Optical Society of America A, 11*(4), 1199–1212. https://doi.org/10.1364/JOSAA.11.001199
- Xiong, Y.-Z., Guan, S.-C., & Yu, C. (2022). A supramodal and conceptual representation of subsecond time revealed with perceptual learning of temporal interval discrimination. *Scientific Reports, 12*, 10668. https://doi.org/10.1038/s41598-022-14698-6

### 4.7 Sicherheit: Flimmern, Blitze, photosensitive Epilepsie (gilt für **alle** Übungen)

**Hintergrund.** Eine Fotosensibilität, also eine auffällige EEG-Reaktion auf Licht oder Muster, betrifft etwa 0,3–3 % der Bevölkerung. Durch Licht ausgelöste Anfälle treten bei etwa **1 von 10.000** Menschen auf, bei 5- bis 24-Jährigen bei etwa **1 von 4.000**. Menschen mit Epilepsie haben zu 2–14 % licht- oder musterausgelöste Anfälle. Am stärksten provozierend sind **15–25 Hz**, der Bereich reicht aber von **1 bis 65 Hz**; auch Rot ist ein Faktor. Beim Pokémon-Vorfall in Japan kamen 685 Kinder ins Krankenhaus, und nur 24 % derer mit Anfall hatten schon früher einen gehabt (Fisher et al., 2005). **Viele Betroffene wissen es also nicht** – ein Warnhinweis ist Pflicht.

**Regelwerke (verifiziert)**

- **WCAG 2.2** (W3C-Empfehlung, Fassung vom 12.12.2024):
  - **SC 2.3.1 (Stufe A):** Nichts darf mehr als dreimal pro Sekunde blitzen, *oder* der Blitz liegt unter der allgemeinen und der roten Blitzschwelle.
    - **Allgemeiner Blitz:** gegenläufige Änderungen der relativen Leuchtdichte um **≥ 10 %** des Maximums, wobei der dunklere Zustand **< 0,80** ist.
    - **Fläche:** Unbedenklich ist eine gleichzeitig blitzende Fläche von höchstens **0,006 sr** in einem beliebigen 10°-Feld (≈ 25 %).
    - **Roter Blitz:** jeder Wechsel mit gesättigtem Rot; nach der Arbeitsdefinition in WCAG 2.2 R/(R+G+B) ≥ 0,8 bei einem Farbabstand > 0,2 in der CIE-1976-UCS-Tafel.
    - **Ausnahme:** feine, ausgeglichene Muster (z. B. Karos < 0,1°).
    - **Faustregel:** Ein Rechteck von 341 × 256 px bei 1024 × 768 px entspricht einem 10°-Feld am klassischen Monitor. Laut Understanding-Dokument sind Nutzer, die näher am Bildschirm sitzen, auch durch normativ zulässige Flächen gefährdet.
  - **SC 2.3.2 (AAA):** höchstens 3 Blitze pro Sekunde, ohne Ausnahme.
  - **SC 2.3.3 (AAA):** Durch Interaktion ausgelöste Bewegungsanimationen müssen abschaltbar sein, außer sie sind wesentlich.
  - **SC 2.2.2 (A):** Bewegtes oder Blinkendes, das automatisch startet und länger als 5 s läuft, muss pausier- bzw. stoppbar sein.
- **ITU-R BT.1702-3** (11/2023):
  - **Potenziell schädlicher Blitz:** Leuchtdichteänderung um **≥ 20 cd/m²**, wenn das dunklere Bild unter 160 cd/m² liegt. Wechsel zu oder von gesättigtem Rot sind immer potenziell schädlich.
  - **Unzulässig** ist eine Folge, wenn die Blitze gleichzeitig **> 25 % der Bildfläche** einnehmen **und** es **> 3 Blitze pro Sekunde** sind. Blitze, deren Vorderflanken ≥ 334 ms auseinanderliegen, sind bei 60 Hz immer akzeptabel (≥ 360 ms bei 50 Hz).
  - Flimmerfolgen von **> 5 s** könnten auch innerhalb der Grenzen ein Risiko sein.
  - **Muster** (informativer Anhang, „von einigen Behörden genutzt“): mehr als 5 Hell-Dunkel-Streifenpaare auf > 40 % der Fläche (ruhend) bzw. > 25 % (bewegt oder blinkend).
- **Expertenkonsens der Epilepsy Foundation of America** (Harding et al., 2005): Ein Blitz ist potenziell gefährlich bei **≥ 20 cd/m²**, **≥ 3 Hz** und **≥ 0,006 sr**. Rot ist ein Risiko. Streifenmuster mit mehr als 5 Hell-Dunkel-Paaren sind kritisch.
- **„Harding“-Kriterien in der Praxis:** Der Harding Flash and Pattern Analyser prüft nach Ofcom- und japanischen Vorgaben: Übergänge ≥ 20 cd/m², Fläche > 25 %, > 3 Hz; Muster ab 6 ruhenden Paaren auf > 40 % bei > 0,5 s; erweiterte Analyse über 5-s-Fenster (Herstellerseite). Das Ofcom-Originaldokument war beim Abruf gesperrt (HTTP 403) und ist deshalb **nicht direkt verifiziert**; die Kriterien sind über ITU und EFA belegt.
- **Lückenanalyse:** Die Annahmen zum Betrachtungsabstand sind veraltet. Tablets werden (von Kindern) aus etwa 29 cm genutzt, Smartphones aus 19 cm. Beim CSS-Referenzpixel entspricht ein 10°-Feld etwa 470 CSS-px Durchmesser. Die Autoren empfehlen, sich an den **strengsten** Grenzwerten zu orientieren (Jordan & Vanderheiden, 2024).

**Unsere verbindlichen Grenzwerte (Designvorgabe, bewusst strenger als die Normen)**

| Größe | Norm | **Plattform-Grenzwert** |
|---|---|---|
| Frequenz wiederholter Helligkeitswechsel | WCAG: ≤ 3 Blitze/s · ITU: > 3/s unzulässig · EFA: gefährlich ab ≥ 3 Hz | **Dauerpulsieren ≤ 2,5 Hz**; einzelne Rückmelde-Blitze mit ≥ 500 ms Abstand |
| Helligkeitshub pulsierender Elemente | WCAG: Blitz ab ΔL ≥ 0,10 · ITU/EFA: ≥ 20 cd/m² | **ΔL ≤ 0,033** (relative Leuchtdichte, linear gerechnet) ⇒ ≤ ≈ 20 cd/m² auch bei 600 cd/m² Displayspitze |
| Fläche von Blitzen über der Schwelle | WCAG: ≤ 0,006 sr pro 10°-Feld · ITU: ≤ 25 % Bildfläche | bei angenommenen **30 cm** entsprechen 0,006 sr ≈ **540 mm² (≈ 2,3 × 2,3 cm)**, bei 40 cm ≈ 960 mm² (≈ 3,1 × 3,1 cm). Gesamte pulsierende Fläche < 25 % des Bildschirms. **Nie vollflächig aufblitzen** |
| Rot | WCAG/ISO: gesättigtes Rot · ITU: jeder Wechsel zu/von gesättigtem Rot | **kein gesättigtes Rot** für Blitze, Fehlermeldungen oder Pulse (Fehler z. B. als Symbol oder Rahmen in Orange/Weiß, klein) |
| Muster | ITU/EFA: > 5 Streifenpaare, > 40 % (ruhend) bzw. > 25 % (bewegt) | keine kontrastreichen Streifengitter; Suchraster mit Zufallsversatz; Masken als Blockrauschen |
| Dauer | ITU: Flimmerfolgen > 5 s können riskant sein | Pulsieren höchstens 10 s pro Durchgang **und** unter der Blitzschwelle; danach ≥ 2 s Standbild; Sitzungen ≤ 15 min mit Pausenangebot |
| Kontrolle | WCAG 2.2.2 / 2.3.3 | Start nur per Knopf, **Pause/Stopp jederzeit**, Stopp bei Tab-Wechsel; `prefers-reduced-motion` respektieren (ruhigere Varianten, keine Effektanimationen) |

**Prüfliste pro Übung**
- **Punktlandung:** kein Flimmern; die Kugel nie bildschirmfüllend (≤ 1,3 × Ring), weiches Ausblenden. Großflächige, schnell expandierende Bewegung kann empfindlichen Personen unangenehm sein, daher gibt es eine ruhigere Variante bei `prefers-reduced-motion`. Die Bewegung selbst ist für die Aufgabe wesentlich (SC 2.3.3).
- **Suchbild:** das ganze Raster nie aufblitzen lassen; Rückmeldung nur in der Zelle, kurz, nicht rot gesättigt; Raster mit Versatz, moderater Kontrast (z. B. hellgrau auf dunkelgrau).
- **Blitzblick:** pro Durchgang höchstens 2 Helligkeitswechsel-Paare (Reiz, Maske), dazwischen Antwortphase und Pause ≥ 1 s. Die Maske soll aus Blockrauschen bestehen, mit mittlerer Helligkeit nahe dem Hintergrund, nicht weiß und nicht gestreift.
- **Aus dem Takt:** Grenzwerte siehe Tabelle (≤ 2,5 Hz, ΔL ≤ 0,033, Sinus, Pausen).
- **Alle:** Die rote bildschirmweite „Miss-Flash“-Rückmeldung des Vorbilds (radialer roter Verlauf, 450 ms) entfällt.

**Warnhinweis (Vorschlag, vor dem ersten Start und in den Einstellungen):**

> „Hinweis: Bei sehr wenigen Menschen können flackernde oder blinkende Bilder epileptische Anfälle auslösen – auch wenn sie noch nie einen Anfall hatten. Unsere Übungen sind so gestaltet, dass sie anerkannte Grenzwerte deutlich unterschreiten. Wenn Sie oder Ihre Familie an Epilepsie leiden, fragen Sie vor der Nutzung Ihren Arzt. Brechen Sie sofort ab, wenn Ihnen schwindlig oder unwohl wird, Sie Sehstörungen, Zuckungen oder Orientierungsprobleme bemerken.“

**Quellen (Sicherheit)**

- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x
- HardingFPA (Cambridge Research Systems / Whitedot Scientific). (o. J.). *How to interpret HardingFPA results*. https://www.hardingfpa.com/technical-support/how-to-interpret-hardingfpa-results/ (Herstellerangaben)
- International Telecommunication Union. (2023). *Recommendation ITU-R BT.1702-3: Guidance for the reduction of photosensitive epileptic seizures caused by television*. https://www.itu.int/rec/R-REC-BT.1702/en
- Jordan, J. B., & Vanderheiden, G. C. (2024). International guidelines for photosensitive epilepsy: Gap analysis and recommendations. *ACM Transactions on Accessible Computing, 17*(3), 1–35. https://doi.org/10.1145/3694790
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12 December 2024). https://www.w3.org/TR/WCAG22/ – dazu: *Understanding SC 2.3.1*. https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html
- World Wide Web Consortium. (o. J.). *Media Queries Level 5 – prefers-reduced-motion* (Working Draft). https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion

---

## 5. Ausblick: Kontrastempfindlichkeit und Perceptual Learning (mögliche zukünftige Übung)

### 5.1 Was würde trainiert

Das Erkennen schwacher Kontraste, meist mit Gabor-Reizen (verwaschene Streifenflecken). Oft kommen „laterale Maskierung“ (flankierende Reize) und Rückwärtsmaskierung hinzu, wie in den Protokollen von Polat und Kollegen.

### 5.2 Was sagt die Forschung

| Studie | Gruppe / Design | Ergebnis | Bewertung |
|---|---|---|---|
| Polat et al. (2004) | Amblyopie, 9–55 Jahre; prospektiv, randomisiert, maskiert, kontrolliert; insgesamt 77 Patienten, 14 davon mit Schein- bzw. Kontrolltraining; ≈ 45 Sitzungen à ≈ 30 min | Kontrastempfindlichkeit etwa verdoppelt; Sehschärfe +0,25 log-Einheiten nach ≈ 48 Sitzungen; 68 % ≥ 2 Zeilen besser; nach 12 Monaten erhalten | **mittel** (Amblyopie) |
| Tsirlin et al. (2015) | Metaanalyse, 24 Studien bei erwachsener Amblyopie (Perceptual Learning, dichoptisch, Videospiele) | Sehschärfe im Mittel +0,17 logMAR; 32 % ≥ 0,2 logMAR; klinische Studien nötig | **mittel** – gehört in fachliche Betreuung |
| Polat et al. (2012) | Alterssichtigkeit, 30 Personen (51 ± 4 Jahre), nur 3 untrainierte Kontrollen, **nicht randomisiert**; ≈ 37 Sitzungen in 3 Monaten | Nahvisus 2,44 → 1,56 Bogenminuten (Faktor ≈ 1,6); Lesen +17 Wörter/min; Kontrast +19–34 %; Optik unverändert. **Interessenkonflikt** (Ucansi) | **schwach** |
| Tan & Fong (2008) | geringe Myopie, **Fallserie ohne Kontrollgruppe**, n = 20; kommerzielles NeuroVision-Verfahren | unkorrigierter Visus +2,1 Zeilen; Kontrast besser; Refraktion unverändert | **schwach** |
| Camilleri et al. (2014) | geringe Myopie; 2 Wochen Perceptual Learning mit Hirnstimulation (tRNS) im Vergleich zu 8 Wochen ohne; kleine Gruppen | unkorrigierter Visus +0,15 logMAR (mit tRNS), Kontrast nur mit tRNS verbessert | **schwach**; tRNS ist zu Hause nicht anwendbar |
| Deveau, Ozer & Seitz (2014) | Baseball: 19 trainierte Spieler gegenüber 18 Pitchern als Kontrolle, **nicht randomisiert**; 30 × 25 min | Sehschärfe +31 % (20/13 → 20/10); Strikeout-Quote 22,1 % → 17,7 % | **schwach** |
| Li et al. (2009) | Action-Videospiele, 50 h in 9 Wochen; Training nur n = 6 gegenüber 7 Kontrollen | Kontrastempfindlichkeit +43–58 % (0,16–0,2 log-Einheiten), über Monate erhalten | **schwach bis mittel** (plausibel, sehr klein) |

Übersicht: Levi & Li (2009) sehen Perceptual Learning als **mögliche** Amblyopie-Behandlung. Für **Normalsichtige** und geringe Fehlsichtigkeiten fehlen große, randomisierte und unabhängige Studien. Bei Myopie und Presbyopie ersetzt es die optische Korrektur nicht.

### 5.3 Umsetzbarkeit im Browser (ehrliche Einschätzung)

1. **8 Bit reichen nicht für die Schwelle:** Um das mittlere Grau (sRGB 128) ist die kleinste Stufe ein Michelson-Kontrast von ≈ **0,84 %** (Sinusgitter ±1 Stufe ≈ 1,7 %; bei sRGB 192 ≈ 0,58 %; Herleitung aus der sRGB-Formel). Die Kontrastschwelle liegt für viele Reize bei etwa 1 % (Pelli & Bex, 2013), bei guten Beobachtern und optimaler Ortsfrequenz noch darunter. **Ohne Tricks** lassen sich die schwellennahen Kontraste von Normalsichtigen also nicht fein genug abstufen.
2. **Lösungen:** Dithering per „Noisy-Bit“-Methode, die perzeptiv einer kontinuierlichen Auflösung entspricht (Allard & Faubert, 2008), oder „Bit-Stealing“ über Farbkanäle (Tyler, 1997). 10-Bit-Ausgabe ist im Browser kaum kontrollierbar.
3. **Gamma und Leuchtdichte sind unbekannt:** Man kann nur sRGB annehmen. Automatische Helligkeit, Nachtmodus bzw. True Tone, Umgebungslicht und Reflexe verändern den Kontrast. Deshalb **nur relative Werte**, keine Normwerte und kein „Kontrasttest“.
4. **Betrachtungsabstand bestimmt die Ortsfrequenz:** Zyklen pro Grad hängen direkt vom Abstand ab. Nötig ist eine Kalibrierung mit Kreditkarte und blindem Fleck (±3,25 cm ≈ ±8 % bei 40 cm; Li et al., 2020). Das Canvas muss mit `devicePixelRatio` skaliert werden, ohne Nachskalierung. Auf dem iPad sind es bei 40 cm ≈ 36 CSS-px bzw. ≈ 72 Geräte-px pro Grad.
5. **Optische Korrektur:** Mit falscher Nahkorrektur trainiert man Unschärfe. Das ist ein guter Anlass, zum Sehtest beim Optiker einzuladen.
6. **Empfehlung:** Wenn umgesetzt, dann als **„Kontrast-Challenge“** mit Dithering, Kalibrierung und reinen Fortschrittswerten – ohne Heil- oder Diagnoseversprechen, mit einem Hinweis auf professionelle Kontrastmessung beim Optiker oder Augenarzt.

### 5.4 Ehrliche Formulierung für Laien (Entwurf)

> „Die Kontrast-Challenge fordert Ihr Auge mit sehr blassen Mustern heraus. Bei bestimmten Sehstörungen wurden ähnliche Trainings unter fachlicher Betreuung erforscht; für gesunde Augen ist ein Nutzen nicht gesichert – und eine Brille oder ein Sehtest wird dadurch nicht ersetzt.“

### 5.5 Quellen

- Allard, R., & Faubert, J. (2008). The noisy-bit method for digital displays: Converting a 256 luminance resolution into a continuous resolution. *Behavior Research Methods, 40*(3), 735–743. https://doi.org/10.3758/BRM.40.3.735
- Camilleri, R., Pavan, A., Ghin, F., Battaglini, L., & Campana, G. (2014). Improvement of uncorrected visual acuity and contrast sensitivity with perceptual learning and transcranial random noise stimulation in individuals with mild myopia. *Frontiers in Psychology, 5*, 1234. https://doi.org/10.3389/fpsyg.2014.01234
- Deveau, J., Ozer, D. J., & Seitz, A. R. (2014). Improved vision and on-field performance in baseball through perceptual learning. *Current Biology, 24*(4), R146–R147. https://doi.org/10.1016/j.cub.2014.01.004
- Levi, D. M., & Li, R. W. (2009). Perceptual learning as a potential treatment for amblyopia: A mini-review. *Vision Research, 49*(21), 2535–2549. https://doi.org/10.1016/j.visres.2009.02.010
- Li, Q., Joo, S. J., Yeatman, J. D., & Reinecke, K. (2020). Controlling for participants’ viewing distance in large-scale, psychophysical online experiments using a virtual chinrest. *Scientific Reports, 10*, 904. https://doi.org/10.1038/s41598-019-57204-1
- Li, R., Polat, U., Makous, W., & Bavelier, D. (2009). Enhancing the contrast sensitivity function through action video game training. *Nature Neuroscience, 12*(5), 549–551. https://doi.org/10.1038/nn.2296
- Pelli, D. G., & Bex, P. (2013). Measuring contrast sensitivity. *Vision Research, 90*, 10–14. https://doi.org/10.1016/j.visres.2013.04.015
- Polat, U., Ma-Naim, T., Belkin, M., & Sagi, D. (2004). Improving vision in adult amblyopia by perceptual learning. *PNAS, 101*(17), 6692–6697. https://doi.org/10.1073/pnas.0401200101
- Polat, U., Schor, C., Tong, J.-L., Zomet, A., Lev, M., Yehezkel, O., Sterkin, A., & Levi, D. M. (2012). Training the brain to overcome the effect of aging on the human eye. *Scientific Reports, 2*, 278. https://doi.org/10.1038/srep00278
- Tan, D. T. H., & Fong, A. (2008). Efficacy of neural vision therapy to enhance contrast sensitivity function and visual acuity in low myopia. *Journal of Cataract & Refractive Surgery, 34*(4), 570–577. https://doi.org/10.1016/j.jcrs.2007.11.052
- Tsirlin, I., Colpa, L., Goltz, H. C., & Wong, A. M. F. (2015). Behavioral training as new treatment for adult amblyopia: A meta-analysis and systematic review. *Investigative Ophthalmology & Visual Science, 56*(6), 4061–4075. https://doi.org/10.1167/iovs.15-16583
- Tyler, C. W. (1997). Colour bit-stealing to enhance the luminance resolution of digital displays on a single pixel basis. *Spatial Vision, 10*(4), 369–377. https://doi.org/10.1163/156856897X00294

---

## Anhang A: Übergreifende Technikquellen

- Anwyl-Irvine et al. (2021), Bridges et al. (2020), Elze & Tanner (2012), Li et al. (2020) und Pronk et al. (2020): siehe Abschnitte 1.6, 4.6 und 5.5.
- sRGB-Formel für die relative Leuchtdichte: L = 0,2126 R + 0,7152 G + 0,0722 B. Jeder Kanal wird zuvor linearisiert: bis 0,04045 durch Teilen durch 12,92, darüber mit ((c + 0,055)/1,055)^2,4. Quelle: WCAG 2.2, Definition „relative luminance“ (https://www.w3.org/TR/WCAG22/).

## Anhang B: Aussagen, die wir auf der Website **nicht** machen

| Nicht sagen | Warum | Stattdessen |
|---|---|---|
| „Verbessert Ihre Sehkraft / Ihren Visus“ | für Normalsichtige nicht belegt; optische Probleme brauchen Korrektur | „trainiert Wahrnehmungsaufgaben; bei Sehproblemen: Sehtest bei uns“ |
| „Macht Sie zum sichereren Autofahrer“ / „senkt das Unfallrisiko“ | nur für das Original-UFOV-Training bei Älteren und mit Einschränkungen belegt; unsere Version ist nicht untersucht | „angelehnt an Forschung zur Verkehrswahrnehmung älterer Menschen“ |
| „Beugt Demenz vor“ | sekundäre, knappe und teils Teilgruppen-Befunde mit Interessenkonflikt | gar nicht verwenden |
| „Trainiert räumliches Sehen / 3D / Stereo“ | am 2D-Bildschirm physikalisch unmöglich | „Zeit-bis-Kontakt-Schätzung“ |
| „Misst / trainiert Ihre Flimmerfrequenz“ | am Display technisch unmöglich und sicherheitlich unvertretbar | „Konzentrationsspiel mit Pulsrhythmen“ |
| Risikobewertungen („Ihr Unfallrisiko ist erhöht“) | kein validierter Test; das kann verunsichern | persönliche Fortschrittswerte |

**Regulatorischer Hinweis (keine Rechtsberatung):** Software, die der Hersteller ausdrücklich für medizinische Zwecke bestimmt (z. B. Diagnose oder Therapie), kann in der EU ein Medizinprodukt sein. Software für Lifestyle- und Wellness-Zwecke ist nach Erwägungsgrund 19 der Verordnung (EU) 2017/745 kein Medizinprodukt (https://eur-lex.europa.eu/eli/reg/2017/745/oj). Eine Einordnungshilfe bietet die Leitlinie MDCG 2019-11 (https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2019_11_guidance_en_0.pdf). Maßgeblich ist die **Zweckbestimmung**, also auch die Werbeaussagen. Formulierungen wie oben halten die Plattform klar im Bereich „Training/Spiel“.
