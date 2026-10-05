---
# ===== Kennung =====
nr: 915
kennung: labor-takt-sakkaden
name: "Takt-Sakkaden (Blickwechsel zu einem im Takt springenden Zeichen)"
name_original: "– (eigene Blickfit-Übung, Labor, kein Vorbild)"
kapitel: "Labor"
kapitel_original: ""
unterkapitel_original: ""
quelle_url: ""
blickfit_umsetzung: {kennung: "labor-takt-sakkaden", name: "Takt-Sakkaden", unterschiede: "eigene Labor-Übung mit Einstellungen"}
stand: 2026-10-05

# ===== Überblick =====
kurzbeschreibung: "Ein Zeichen (Ziffer, Buchstabe oder Silbe) springt im Takt eines Metronoms zwischen festen Punkten, zum Beispiel den vier Ecken. Man schaut bei ruhigem Kopf hin und liest es laut; auf Wunsch tippt man es zusätzlich an, solange es zu sehen ist. Takt, Anordnung, Reihenfolge, Zeichenart, Größe und Dauer stellt man selbst ein. Gemessen wird nur das Tippen, nicht der Blick."
ziel_funktionen: [sakkaden, visuelle_verarbeitungsgeschwindigkeit, antizipation]
eingabe: [touch, maus]
tablet_geeignet: ja
dauer_sekunden: 60
schwierigkeit_anpassung: "Keine Stufen, keine automatische Anpassung: Die Schwierigkeit ergibt sich aus den Einstellungen. Takt 20–140 Schläge/min (Standard 60; höchstens ≈ 2,3 Zeichenwechsel pro Sekunde); Dauer 10–300 s (Standard 60 s; Zahl der Schläge = Dauer × Takt ÷ 60); Zeichengröße 1–12 cm (Standard 3 cm, auf kleinen Bühnen verkleinert, damit sich Zeichen nicht überlappen); Anordnung vier Ecken (Standard), vier Ecken und Mitte, links/rechts, oben/unten, Raster 3 × 3; Reihenfolge der Reihe nach (Standard, vorhersehbar) oder zufällig (nie zweimal derselbe Punkt); Zeichen Ziffern (Standard), Buchstaben, Silben; „Berühren im Takt“ nein (Standard, nur lesen) oder ja; Metronom-Ton an/aus (ändert die Vergleichbarkeit nicht). Eigene Faustregel nach dem Lauf: mit Berühren über 90 % Treffer → eine Einstellung schwerer, unter 70 % → leichter."
messgroessen: ["ohne Berühren: Zahl der gezeigten Zeichen (steht durch Dauer und Takt fest, keine Leistungsangabe)", "mit Berühren: Trefferquote (berührte von gezeigten Zeichen)", "mit Berühren: im Takt berührt, nicht berührt, Fehltipps daneben", "mit Berühren: Verzögerung nach dem Schlag (Mittel und Streuung, nur Treffer)", "größter Sprung in cm und als Sehwinkel (aus dem eingestellten Abstand)", "kein Blickmaß, keine Prüfung des lauten Lesens, keine Normwerte"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
# Profil für die Übung mit „Berühren im Takt“; ohne Berühren (Standard) entfallen die motorischen Werte (alle 0) und
# einfache_reaktion. sakkaden = 3 bezeichnet die Anforderung (Blickwechsel bei jedem Schlag), nicht die Messung.
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 3
    fixation: 1
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 1
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 2
    selektive_aufmerksamkeit: 0
    inhibition: 0
    geteilte_aufmerksamkeit: 1
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 2
    entscheidung_wahlreaktion: 0
    lesen_sprache: 1
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 2
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 0
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 0
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 1

# ===== Auswahlhilfe =====
voraussetzungen: ["Bildschirm einmal kalibrieren und den Abstand angeben, damit Größen in cm und der Sprung als Sehwinkel stimmen", "etwa 50–60 cm Abstand, Kopf ruhig, nur die Augen bewegen", "Ziffern, Buchstaben oder Silben laut lesen können (oder leise innerlich mitlesen)", "Raum, in dem laut gesprochen werden kann; für den Takt Ton an oder Kopfhörer"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, nystagmus, gesichtsfeldausfall, presbyopie_gleitsicht, kopfschmerz_asthenopie, trockenes_auge_bildschirm, lese_rechtschreib_schwaeche]
geeignet_fuer: ["Blickwechsel zwischen weit auseinanderliegenden Punkten in einem gleichmäßigen Takt üben", "Zeichen beim Ankommen des Blicks rasch erfassen und laut lesen", "wahlweise zusätzlich im Takt antippen (Blick und Hand zusammen)", "Takt, Anordnung und Zeichenart selbst einstellen und mit sich selbst vergleichen"]
weniger_geeignet_fuer: ["Messung oder Beurteilung von Blicksprüngen: der Blick wird nicht gemessen", "Menschen mit Lichtempfindlichkeit oder epileptischen Anfällen in der Vorgeschichte", "Umgebungen, in denen nicht laut gelesen werden kann (dann leise mitlesen)", "Ersatz für die augenärztliche oder optometrische Untersuchung der Augenbewegungen"]
evidenz:
  uebungseffekt: schwach
  naher_transfer: unklar
  alltag_transfer: fehlend
  kommentar: "Für das Springen eines Zeichens im Takt mit lautem Lesen und Antippen gibt es keine Studie. Beim Wiederholen von Blicksprung-Aufgaben wurden gesunde Erwachsene genauer, schneller und gleichmäßiger (Karantinos et al. 2025, andere Aufgaben, mit Blickmessung). Gewöhnung an Aufgabe und Gerät überschätzt Effekte (Guo et al. 2025). Das Üben zu einem Metronom ist eine Praxisangabe der funktionellen Optometrie ohne Wirksamkeitsbeleg; ein Alltagsnutzen ist nicht belegt."
aehnliche_uebungen: [303, 905, 204, 506, 807, 916]
stichworte: ["Sakkaden", "Blickwechsel", "Metronom", "Takt", "laut lesen", "vier Ecken", "Raster 3 × 3", "Zeichen antippen", "Sehwinkel", "funktionelle Optometrie", "Labor", "Einstellungen"]
---

# 915 · Takt-Sakkaden (Blickwechsel zu einem im Takt springenden Zeichen)

> Original: – (eigene Labor-Übung ohne Vorbild) · Blickfit: „Takt-Sakkaden“ (`src/exercises/labor-takt-sakkaden/`, Kategorie Bewegung, Labor)

## 1. Kurzbeschreibung

Im Takt eines Metronoms erscheint ein Zeichen an einem festen Punkt und springt beim nächsten Schlag zum nächsten Punkt. Man hält den Kopf ruhig, wechselt nur mit den Augen zum Zeichen und liest es laut vor. Wahlweise tippt man es zusätzlich an, solange es zu sehen ist („Berühren im Takt“); dann misst die Übung Trefferquote und Verzögerung nach dem Schlag. Die Blickfit-Übung hat keine Stufen, sondern **Einstellungen**: Takt (20–140 Schläge pro Minute, Standard 60), Dauer (10–300 s, Standard 60 s), Zeichengröße (1–12 cm, Standard 3 cm), Anordnung (vier Ecken, vier Ecken und Mitte, links und rechts, oben und unten, Raster 3 × 3), Reihenfolge (der Reihe nach oder zufällig), Zeichen (Ziffern, Buchstaben, Silben aus Konsonant und Vokal), Berühren ja/nein und Metronom-Ton. Das Zeichen wird weich ein- und ausgeblendet und wechselt höchstens etwa 2,3-mal pro Sekunde. Der größte Sprung wird auch als Sehwinkel angegeben. Wohin man schaut und ob man laut liest, wird nicht gemessen.

## 2. Ablauf der Blickfit-Übung (Mechanik aus dem Code)

Quelle: `logic.ts`, `index.ts`, `texts.ts` (Stand 05.10.2026).

- **Takt:** Der erste Schlag kommt eine Taktlänge nach dem Start; die Zahl der Schläge ist fest (Dauer × Takt ÷ 60, abgerundet). Schläge sind exakt im Takt geplant, ein verspäteter Bildaufruf holt verpasste Schläge nach; sichtbar wird ein Schlag im nächsten Bild (bei 60 Hz bis ≈ 17 ms später), der Ton im selben Bild.
- **Reihenfolge:** „Der Reihe nach“ umkreist die Punkte; „zufällig“ nie zweimal derselbe Punkt und nie zweimal dasselbe Zeichen hintereinander. Zeichen: Ziffern 1–9, 18 Großbuchstaben, Silben aus 14 Konsonanten und 5 Vokalen.
- **Größe:** Abstand Mitte zu Mitte mindestens das 1,5-Fache der Zeichengröße; zu große Zeichen werden verkleinert (nie unter 0,3 cm), Rand = halbe Größe + 0,5 cm.
- **Berühren:** Ein Tipp trifft, wenn er innerhalb von Zeichenradius + 0,5 cm liegt (mindestens 24 px); Verzögerung = Tippzeit − Schlagzeit (nie negativ). Jedes Zeichen zählt höchstens einmal; Tipps daneben oder ein zweiter Tipp auf dasselbe Zeichen sind Fehltipps; ein Doppeltipp innerhalb von 250 ms nach einem Treffer wird ignoriert. Nicht berührte Zeichen gelten als verpasst.
- **Tipp nach dem Lauf (eigene Faustregeln):** ohne Berühren → laut lesen und Vergleichshinweis; mit Berühren: viele Fehltipps → erst genau, dann schnell; viele verpasste → langsamerer Takt; sehr sicher → eine Einstellung schwerer; stark schwankende Zeiten → ruhiger.
- **Punkte:** 10 je Treffer (mit Berühren) bzw. 5 je gezeigtem Zeichen (nur Motivation). `usesCalibration: true`.

## 3. Herleitung aus der Forschung (keine Beschreibung eines Vorbilds)

Die Übung ist eine eigene Labor-Übung. Aussagen und Quellen stammen aus `science.ts` (einzeln per Crossref und Abstract geprüft, 02.10.2026); ergänzt wurden nur per Crossref geprüfte Grundlagen (Leigh & Kennard 2004, Stahl 1999, Munoz et al. 1998, Fisher et al. 2005, Hutchings et al. 2007, Muchnick 2008 nur für Warnzeichen). Nicht übernommen: „schult präzise Blicksprünge“ (Wirkversprechen), „das Sprechen zwingt zum Fixieren“ und „stellt sicher, dass der Blick angekommen ist“ (nicht belegt; die Übung kann den Blick nicht messen). Das Üben zu einem Metronom, auch mit Sprech- oder Denkaufgabe, ist eine Praxisangabe der funktionellen Optometrie.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Bei etwa 50 cm Abstand entspricht 1 cm etwa 1,15°. Das Standardzeichen (3 cm) erscheint etwa 3,4° groß und ist leicht lesbar; erst kleine Zeichen (1 cm ≈ 1,1°) und Silben verlangen genaueres Hinsehen. Auf einem 11-Zoll-Tablet liegen die Ecken etwa 20–25 cm diagonal auseinander, also grob 20–25° Sehwinkel (Umrechnung; die Übung zeigt den eigenen Wert aus Kalibrierung und Abstand).
- **Blicksprünge:** Sakkaden sind schnelle Sprünge der Augen von einem Punkt zum nächsten. Je weiter der Sprung, desto länger dauert er – in einer Studie mit 25 Gesunden im Mittel 2,7 ms mehr je Grad (Baloh et al., 1975). Bei größeren waagrechten Blicksprüngen bewegt sich der Kopf zunehmend mit, unterschiedlich stark von Person zu Person (Stahl, 1999); die Übung bittet, den Kopf ruhig zu halten, kann das aber nicht prüfen.
- **Aufmerksamkeit vor dem Sprung:** Vor dem Sprung wandert die Aufmerksamkeit zum Ziel; dort gelingt das Erkennen am besten, an Nachbarobjekten nur noch etwa zufällig (Deubel & Schneider, 1996). Das Zeichen wird deshalb erst am Zielort sicher gelesen.
- **Takt und Lichtreize:** Höchstens 140 Schläge pro Minute entsprechen etwa 2,3 Zeichenwechseln pro Sekunde; jedes Zeichen wird weich (mindestens 100 ms) ein- und ausgeblendet und blinkt nicht im Takt. Anfälle durch Lichtreize werden am stärksten durch Frequenzen um 15–25 Hz ausgelöst (Fisher et al., 2005); die Übung bleibt weit darunter, ist aber ein wechselnder Lichtreiz.
- **Alter:** Die Reaktionszeit von Blicksprüngen ändert sich über die Lebensspanne; ältere Erwachsene reagieren im Mittel langsamer (Munoz et al., 1998). Niedrige Takte sind ein sinnvoller Einstieg.
- **Brillenträger:** Bei Gleitsicht liegen die oberen Ecken im Fernteil-Bereich, die unteren im Nahteil; Neu-Träger zeigen sehr unterschiedliche Kopf- und Augenstrategien (Hutchings et al., 2007). „Links und rechts“ vermeidet den senkrechten Wechsel durch die Zonen.
- **Farbe:** Spielt keine Rolle; Treffer und Fehler werden über Form angezeigt.

## 5. Neurowissenschaftliche Grundlagen

- **Sakkadensteuerung:** An Blicksprüngen sind unter anderem frontale und parietale Augenfelder, der Colliculus superior, Kleinhirn und Hirnstamm beteiligt; Sakkaden werden deshalb in der klinischen Forschung als Werkzeug genutzt (Leigh & Kennard, 2004). Eine Aussage „diese Übung trainiert Region X“ lässt sich daraus nicht ableiten und wird nicht gemacht.
- **Auge und Hand:** Beim Zeigen auf ein Ziel bleibt der Blick offenbar am Ziel verankert: Blicksprünge zu einem neuen Ziel während einer Zeigebewegung waren im Mittel 155 ms verzögert (Neggers & Bekkering, 2000, Laborversuch mit Zeigebewegungen). „Berühren im Takt“ ist deshalb vermutlich schwerer als nur Lesen; für diese Übung ist das nicht geprüft.
- **Takt halten:** Das Mitklopfen zu einem Ton (sensomotorische Synchronisation) ist als Aufgabe gut untersucht (Repp, 2005). Hier gibt der Takt den Zeitpunkt vor; bei „der Reihe nach“ sind auch Ort und Zeitpunkt vorhersehbar.
- **Lautes Lesen:** Das Lesen verbindet Erkennen und Sprechen; dass es den Blick am Ziel hält, ist nicht belegt.

## 6. Motorische Grundlagen

- **Ohne Berühren (Standard):** keine Handbewegung; die „Motorik“ ist die Augenbewegung und das Sprechen.
- **Mit Berühren:** In jeder Taktlänge (bei 60 Schlägen pro Minute 1 s, bei 140 nur ≈ 0,43 s) muss der Finger zum Zeichen und zurück in Bereitschaft. Die Trefferfläche ist Zeichenradius + 0,5 cm, mindestens 24 px; je weiter die Punkte auseinanderliegen, desto länger der Fingerweg (Fitts, 1954). Die Verzögerung nach dem Schlag enthält Erkennen, Fingerweg und die Verzögerung von Bildschirm und Touch-Sensor.
- **Rhythmus:** Die Streuung der Verzögerung zeigt, wie gleichmäßig man im Takt bleibt; kleine Werte bedeuten einen gleichmäßigeren Rhythmus, nicht eine bessere Blickbewegung.

## 7. Einflussfaktoren und Messgrenzen

- **Kein Blickmaß:** Wohin man schaut, ob der Kopf ruhig bleibt und ob man laut liest, misst die Übung nicht (kein Eye-Tracking). Ohne Berühren steht die Zahl der Zeichen durch Dauer und Takt fest und sagt nichts über die Leistung.
- **Bildgenau, nicht millisekundengenau:** Zeichen und Ton erscheinen im Bild nach dem Schlag (bei 60 Hz bis ≈ 17 ms später). Touchscreens messen Reaktionszeiten durchweg etwas zu lang, je nach Gerät unterschiedlich (Pronk et al., 2020; Tablets wurden dort nicht untersucht).
- **Kalibrierung und Abstand:** Größen in cm und der Sprung als Sehwinkel stimmen nur mit Kalibrierung und richtig eingestelltem Abstand. Auf kleinen Bildschirmen werden Zeichen und Abstände verkleinert.
- **Streuung:** Messwerte am Menschen streuen von Durchgang zu Durchgang; Mehrfachmessung und Mittelung sind üblich (Mountford et al., 2004, S. 43–44, am Beispiel der Hornhautvermessung). Deshalb zeigt die Übung Mittel und Streuung statt eines Einzelwerts.
- **Gewöhnung:** Ein Teil der Verbesserung ist Gewöhnung an Aufgabe und Gerät (Guo et al., 2025); vergleichbar sind nur Läufe mit gleichen Einstellungen auf demselben Gerät.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – schwach:** Beim Wiederholen von Blicksprung-Aufgaben wurden gesunde Erwachsene genauer, schneller und gleichmäßiger, unabhängig von der Tageszeit (Karantinos et al., 2025; mit Blickmessung an anderen Aufgaben). Für genau diese Übung gibt es keine Studie.
- **Naher Transfer – unklar:** Ob sich Verbesserungen auf andere Blickwechsel-Aufgaben übertragen, ist nicht untersucht; trainingsähnliche Prüfungen überschätzen Effekte (Guo et al., 2025).
- **Alltagstransfer – fehlend:** Ein Nutzen für Lesen, Sport, Verkehr oder Alltag ist nicht belegt.
- **Praxisangabe (nicht belegt):** In der funktionellen Optometrie wird das Üben zu einem Metronom, auch zusammen mit einer Sprech- oder Denkaufgabe, als Erfahrungswissen beschrieben; eine Wirkung ist nicht belegt.
- **Einordnung:** Die Übung ist eine einstellbare Blickwechsel-Aufgabe im Takt. Trefferquote und Verzögerung dienen dem Vergleich mit sich selbst, nicht als Normwert oder Aussage über die Augen.

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** Blickwechsel zwischen festen Punkten in einem gleichmäßigen Takt geübt werden sollen; jemand Zeichen laut lesen kann und möchte; wahlweise Blick und Hand im Takt verbunden werden sollen; ein Tablet auf einem Ständer bei ruhigem Kopf genutzt wird.
- **Weniger passend, wenn …** Blicksprünge gemessen oder beurteilt werden sollen; Lichtempfindlichkeit oder epileptische Anfälle bekannt sind; nicht laut gesprochen werden kann; jemand ohne Zeitdruck üben möchte (dann sehr langsamer Takt oder 916 im eigenen Tempo).
- **Vorsicht / anpassen bei …**
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Das Zeichen wechselt bis etwa 2,3-mal pro Sekunde, weich und ohne Blinken; bei bekannter Lichtempfindlichkeit oder Anfällen verzichten.
  - `nystagmus`, `gesichtsfeldausfall`: Blickwechsel und Erkennen in einzelnen Ecken können deutlich erschwert sein; Ergebnis nicht als Aussage über das Auge lesen; „links und rechts“ oder kleine Anordnungen wählen.
  - `presbyopie_gleitsicht`: senkrechte Wechsel führen durch die Zonen der Brille; Arbeitsplatzbrille oder „links und rechts“.
  - `kopfschmerz_asthenopie`, `trockenes_auge_bildschirm`: kurze Läufe, langsamer Takt, Pausen, bewusst blinzeln.
  - `lese_rechtschreib_schwaeche`: Ziffern statt Silben wählen.
- **Kombiniert gut mit …** 303 (Blicksprung-Galerie), 905 (4-Ziele-Wechsel), 204 (Zahlenjagd), 506 (Randziel-Flick), 807 (Sprossen-Leiter im Takt), 916 (Buchstabentafel im eigenen Tempo oder im Takt), 914 (Folgebewegung als Gegenstück).
- Treten beim Üben Doppelbilder, plötzlicher Sehverlust, Kopfschmerz mit Sehverschlechterung oder Schwindel auf, sollte das ärztlich abgeklärt werden, statt weiterzuüben (Muchnick, 2008, S. 6, 28).
- Keine Diagnosen, keine Heilversprechen; nicht als Prüfung der Augenbewegungen darstellen.

## 10. Schwächen und Empfehlungen (Blickfit-Umsetzung)

- **Kein Blickmaß, kein Sprachmaß:** Lesen und Blick lassen sich nicht prüfen; Texte halten das fest. Eine Spracheingabe wäre denkbar, ist aber datenschutzlich aufwendig.
- **Zeitgenauigkeit:** Planung über den Bildtakt; eine Audio-Planung könnte den Ton genauer setzen.
- **Ohne Berühren keine Kennzahl:** Ein einfacher Selbstbericht („alle gelesen?“) könnte den Lauf ergänzen.
- **Einstieg:** Ohne Stufen hängt viel an der Wahl der Einstellungen; Voreinstellungen „leicht/mittel/schwer“ wären hilfreich.

## 11. Quellen

### Von der Website angegeben
keine (eigene Übung)

### Weitere Fachliteratur
- Deubel, H., & Schneider, W. X. (1996). Saccade target selection and object recognition: Evidence for a common attentional mechanism. *Vision Research*, *36*(12), 1827–1837. https://doi.org/10.1016/0042-6989(95)00294-4 – Aufmerksamkeit und Sakkadenziel sind gekoppelt (Crossref geprüft; Abstract gelesen).
- Baloh, R. W., Sills, A. W., Kumley, W. E., & Honrubia, V. (1975). Quantitative measurement of saccade amplitude, duration, and velocity. *Neurology*, *25*(11), 1065. https://doi.org/10.1212/WNL.25.11.1065 – Sprungdauer wächst mit der Sprungweite (Crossref geprüft; Abstract gelesen).
- Neggers, S. F. W., & Bekkering, H. (2000). Ocular gaze is anchored to the target of an ongoing pointing movement. *Journal of Neurophysiology*, *83*(2), 639–651. https://doi.org/10.1152/jn.2000.83.2.639 – Blick bleibt am Ziel einer Zeigebewegung verankert (Crossref geprüft; Abstract gelesen).
- Repp, B. H. (2005). Sensorimotor synchronization: A review of the tapping literature. *Psychonomic Bulletin & Review*, *12*(6), 969–992. https://doi.org/10.3758/BF03206433 – Übersicht zum Mitklopfen zu einem Takt (Crossref geprüft).
- Karantinos, T., Kotsiou, E., Drouza, P., Mantas, A., Anderson, A. J., Klein, C., & Smyrnis, N. (2025). Diurnal variation and practice effects in saccade task performance. *Experimental Brain Research*, *243*(8), 188. https://doi.org/10.1007/s00221-025-07131-7 – Übungseffekte bei Sakkadenaufgaben (Crossref geprüft; Abstract gelesen).
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods*, *52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Zeitmessung am Touchgerät (Crossref geprüft; Abstract gelesen).
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology*, *16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – Gewöhnungseffekt bei trainingsähnlicher Prüfung (Crossref geprüft; Abstract gelesen).
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Lehrbuch: Wiederholbarkeit von Messungen am lebenden Auge (S. 43–44).
- Leigh, R. J., & Kennard, C. (2004). Using saccades as a research tool in the clinical neurosciences. *Brain*, *127*(3), 460–477. https://doi.org/10.1093/brain/awh035 – Übersicht zur Sakkadensteuerung (Crossref geprüft).
- Stahl, J. S. (1999). Amplitude of human head movements associated with horizontal saccades. *Experimental Brain Research*, *126*(1), 41–54. https://doi.org/10.1007/s002210050715 – Kopfbewegung bei größeren Blicksprüngen (Crossref geprüft).
- Munoz, D. P., Broughton, J. R., Goldring, J. E., & Armstrong, I. T. (1998). Age-related performance of human subjects on saccadic eye movement tasks. *Experimental Brain Research*, *121*(4), 391–400. https://doi.org/10.1007/s002210050473 – Sakkaden über die Lebensspanne (Crossref geprüft).
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia*, *46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize und Anfälle (Crossref geprüft).
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, *47*(6), 381–391. https://doi.org/10.1037/h0055392 – Weg und Zielgröße bestimmen die Bewegungszeit (Crossref geprüft).
- Hutchings, N., Irving, E. L., Jung, N., Dowling, L. M., & Wells, K. A. (2007). Eye and head movement alterations in naïve progressive addition lens wearers. *Ophthalmic and Physiological Optics*, *27*(2), 142–153. https://doi.org/10.1111/j.1475-1313.2006.00460.x – Kopf- und Augenbewegungen bei Gleitsicht (Crossref geprüft).
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Lehrbuch: Warnzeichen mit Abklärungsbedarf (S. 6, 28).
