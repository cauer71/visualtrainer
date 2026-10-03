---
# ===== Kennung =====
nr: 509
kennung: micro-correction-precision
name: "Mikrokorrektur – großes Ankerziel antippen, dann kleines Nachziel präzise treffen"
name_original: "Aim Trainer – Mikrokorrektur & Headshot-Präzision (Seitentitel: Aim Trainer | Mikrokorrektur & Headshots)"
kapitel: "Zielen (FPS)"
kapitel_original: "fps"
unterkapitel_original: ""
quelle_url: "https://skilldrills.online/de/drills/fps/micro-correction-precision"
blickfit_umsetzung: {kennung: "mikrokorrektur", name: "Mikrokorrektur", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/mikrokorrektur/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man tippt zuerst ein großes Ankerziel an; im selben Moment blendet in zufälliger Richtung daneben ein kleines Nachziel ein, das nur kurz sichtbar bleibt und mit einer kurzen, genauen Nachbewegung möglichst mittig getroffen werden soll. Mit dem Erfolg werden das Nachziel kleiner, der Abstand größer und die Sichtzeit kürzer. Die Trefferfläche entspricht dem sichtbaren Ziel; Fehler erscheinen als kleines weiches Kreuz. Angezeigt werden Trefferquote, Zeit zwischen den Tipps (Median) und der Abstand zur Mitte."
ziel_funktionen: [zielbewegung_praezision, auge_hand_koordination]
eingabe: [maus]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = Punkte/1 400 + 1 (Start immer Level 1). Mit Level und Combo schrumpfen laut Code Ankerradius 24 → ≈ 13 px, Mikroradius 10 → ≈ 5 px und Lebensdauer 1 800 → ≈ 600 ms (Level 15, Combo ≥ 50); der Abstand Anker–Mikroziel wächst von 55–90 auf ≈ 80–130 px. Jeder Treffer gibt +1 s Spielzeit, jeder Fehler/Timeout −1 s: Die Sitzung dauert nicht fest 45 s."
messgroessen: ["Punkte und Note (Wurzel aus Punkte/54 000)", "Trefferquote gesamt und Mikro-Trefferquote", "mittlere Korrekturzeit: Klick aufs Ankerziel bis Treffer aufs Mikroziel (ms)", "Präzisionswert 0–100 % (Abstand zur Mitte der Trefferfläche)", "Fehlklicks, Timeouts, beste Combo, erreichtes Level", "sinnvoll ergänzend: Reaktions- und Bewegungszeit getrennt, Streuung der Endpunkte (effektive Breite, Durchsatz)"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 0
    blickfolge: 0
    sakkaden: 2
    fixation: 2
    bewegungswahrnehmung: 0
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 1
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 0
    inhibition: 1
    geteilte_aufmerksamkeit: 0
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 0
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 0
    verarbeitungsgeschwindigkeit: 1
    antizipation: 0
    entscheidung_wahlreaktion: 0
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 3
    zielbewegung_tempo: 2
    zielbewegung_praezision: 3
    kontinuierliche_steuerung: 0
    ruhige_hand: 2
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 2
  flimmern_lichtreize: 2
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (oder Touchpad) mit relativer Bewegung und Pointer Lock; kein Tablet", "scharfes Sehen im Bildschirmabstand (Zwischenbereich ≈ 50–75 cm)", "Englische Bedienoberfläche im Spiel, deutscher Regeltext auf der Seite"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, tremor_parkinson, hand_arm_beschwerden, presbyopie_gleitsicht, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, kopfschmerz_asthenopie]
geeignet_fuer: ["kurze, genaue Zielbewegungen nach einem Stopp üben (Abbremsen, Nachsetzen, mittig treffen)", "Auge-Hand-Abstimmung bei kleinen, ruhenden Zielen unter mäßigem Zeitdruck", "in der geübten Aufgabe Genauigkeit vor Tempo verbessern", "Selbstvergleich auf demselben Gerät (Trefferquote, Abstand zur Mitte)"]
weniger_geeignet_fuer: ["Menschen mit Zittern, Hand- oder Handgelenkbeschwerden", "Blickfolge- oder Bewegungswahrnehmungsziele (die Ziele stehen still)", "Wunsch nach verlässlichen Norm- oder Leistungsvergleichen", "Erwartung eines Seh-, Sport- oder Alltagsnutzens"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Motorisches Lernen in Zielaufgaben und Übungszuwächse in Zieltrainings am Bildschirm sind belegt (Elliott et al., 2010; Listman et al., 2021); für diese Übung gibt es keine Studie. Für nahen Transfer gibt es nur indirekte Hinweise (gerätegleiche, ähnliche Testaufgaben: Guo et al., 2025); der Transfer von Zieltrainings auf Spiel oder Alltag ist nicht kontrolliert untersucht."
aehnliche_uebungen: [501, 508, 704, 702, 705, 808, 805, 502, 303]
stichworte: ["Mikrokorrektur", "Zielbewegung", "Fitts'sches Gesetz", "Korrekturbewegung", "Aim Trainer", "Präzision", "Auge-Hand-Koordination", "Maus"]
---

# 509 · Mikrokorrektur – großes Ankerziel antippen, dann kleines Nachziel präzise treffen

> Original: „Aim Trainer – Mikrokorrektur & Headshot-Präzision“ – skilldrills.online, Kapitel Zielen (FPS) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Man tippt ein großes Ankerziel an, das daraufhin weich verschwindet. Im selben Moment blendet in unvorhersehbarer Richtung daneben ein kleines Nachziel ein, das nur kurz sichtbar bleibt und mit einer kurzen, genauen Nachbewegung möglichst mittig getroffen werden soll. Die Trefferfläche ist das sichtbare Ziel (Radius mindestens 24 Pixel), ohne versteckten Zuschlag. Ein Tipp neben das Nachziel beendet die Runde mit einem weichen Kreuz, ein verpasstes Nachziel zählt als zu spät; es gibt weder Zeitbonus noch Zeitstrafe. Eine Sitzung hat 16 Runden. Die Stufe (1–12) steigt nach zwei Treffern in Folge und sinkt nach einem Fehler: Das Nachziel wird kleiner (Radius 4,6 → 2,4 Einheiten; eine Einheit ist 1 % der kürzeren Bildschirmseite), der Abstand zum Anker wächst (11 → 15 Einheiten) und die Sichtzeit sinkt von 2,2 s auf 0,88 s. Angezeigt werden die Trefferquote des Nachziels, der Median der Zeit zwischen den beiden Tipps und der Median des Abstands zur Mitte (in Prozent des Zielradius).

## 2. Ablauf im Original (Analyse)
Grundlage: Seitentext und ausgelieferter Spielcode (seitenspezifischer Chunk `49344-…js` und gemeinsame Module für Schwierigkeitskurve, Combo, Note und Einstellungen; gelesen am 29.09.2026, nur Mechanik übernommen). Winkel sind **eigene Umrechnungen** (24″-Full-HD-Monitor in 60 cm ≈ 38 px/°; eigene Rechnung).

- **Rahmen (Code):** Start-Karte → Countdown 3-2-1-GO (Start nach 2,45 s) → Spiel → Ergebnis. Das Spielfeld ist ein Canvas im 16:9-Container (mind. 460 px hoch) oder im Vollbild. Der Browser sperrt den Mauszeiger (Pointer Lock); das Fadenkreuz (Ring Ø 28 px ≈ 0,7°, Mittelpunkt Ø 4 px ≈ 6′) bewegt sich um die relative Mausbewegung × Empfindlichkeit (einstellbar 0,1–3, Standard 1). Geklickt wird mit `mousedown`. Reine Touch-Geräte werden erkannt und bekommen keine Touch-Steuerung.
- **Ankerziel (Code):** zufällige Lage mit 120 px Randabstand; Radius 24 px (Ø ≈ 1,3°) auf Level 1, ≈ 15 px auf Level 15; die Trefferfläche ist um einen Zuschlag größer (Level 1: +13 px, also effektiv Ø ≈ 74 px ≈ 2°). Treffer: +10 Punkte, **+1 s** Spielzeit.
- **Mikroziel (Code):** erscheint im selben Moment des Ankertreffers in gleichverteilt zufälliger Richtung, Abstand 55–90 px (≈ 1,4–2,4°) auf Level 1, ≈ 78–132 px (≈ 2–3,5°) auf Level 15, mindestens 60 px vom Rand. Radius 10 px (Ø 20 px ≈ 0,5°) → ≈ 6,6 px (Level 15) → min. 5 px (Ø ≈ 0,26°); Trefferzuschlag +6 px → +2 px. Anker und Mikroziel sind nie gleichzeitig sichtbar.
- **Punkte (Code):** Mikrotreffer = (100 + 50 × Präzision) × Combo-Faktor (1–3 ab Combo 3/5/7/10/15/20/30/50) × (1 + 0,5 × (Level − 1)/14). Präzision = 1 − Abstand/(Radius + Zuschlag), also 100 % in der Mitte und 0 % am Rand der erweiterten Trefferfläche. Die Angabe „bis +585 Pkt“ ist keine Obergrenze: Ab Level ≈ 9,4 bei Combo ≥ 50 sind mehr möglich (Level 15: 675). Mikrotreffer geben ebenfalls **+1 s**.
- **Schwierigkeit (Code):** Level = Punkte/1 400 + 1; Radien, Lebensdauer (1 800 ms → ≈ 810 ms auf Level 15) und Abstände folgen der gemeinsamen Exponentialkurve der Vorlage. Eine hohe Combo verkleinert zusätzlich Radien (bis −15 % bzw. −20 %) und Lebensdauer (bis −25 %; Level 15 + Combo ≥ 50 ≈ 600 ms). Nach einem Fehler wird es daher schlagartig leichter. Die Untergrenze von 380 ms greift nur zusammen mit dem Combo-Abzug und erst weit jenseits von Level 25 (die Kurve allein nähert sich 500 ms).
- **Fehler (Code):** Fehlklick oder Ablauf der Lebensdauer → Combo auf 0, **−1 s**, Fehlerton, kurzes Bildschirmwackeln (6 px, d. h. Versatz bis ±3 px, klingt in ≈ 15 Bildern ab) und – sofern die Bildeffekte aktiv sind (Standard: an) – ein roter, radial auslaufender Schimmer über das Spielfeld (gemeinsame Effektklasse `fx-flash-red`: Mitte 50 % Deckkraft, Ausblenden in 0,45 s; ohne Sperrzeit, bei schnellen Fehlklicks also mehrmals pro Sekunde möglich). Nach einem **Fehlklick bleibt das aktuelle Ziel stehen** (seine Lebensdauer läuft weiter); erst ein **Timeout** (Anker oder Mikroziel) startet einen neuen Zyklus mit neuem Ankerziel. Timeouts lassen sich in den Einstellungen abschalten; die Zeitstrafe wird in diesem Drill unabhängig von der Einstellung immer angewendet.
- **Zeitmessung (Code):** Lebensdauer und Uhr laufen mit der echten Bildzeit (dt; für die Spieluhr auf 100 ms pro Bild gekappt, für die Ziel-Lebensdauer nicht), nicht pro Bild – auf 60- und 144-Hz-Monitoren gleich. Korrekturzeit = `performance.now()` beim Ankerklick bis zum erfolgreichen Mikroklick; nur Treffer gehen ein. Ergebnis: Durchschnitt, Präzisionsstufe (> 85 % „Pixel-Perfect Master“, > 70 % „High Precision“), „Consistency“ = 100 − 8 × Fehlklicks. Bestwerte bleiben im Browser.
- **Widersprüche Regeltext ↔ Code:** Ankertreffer „+0,2 s“ → real +1 s; Mikrotreffer bringen ebenfalls +1 s (nicht erwähnt); Strafe „−0,6 s“ → real −1 s; „bis +585 Pkt“ → keine Obergrenze. Da jeder gelungene Zyklus +2 s bringt, verlängert sich die Sitzung bei guter Leistung (Uhr maximal 60 s, Spiel endet erst bei 0) – Punkte verschiedener Sitzungen sind daher schlecht vergleichbar.

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite verspricht „Endphasen-Bremskontrolle“ und „tödliche Headshot-Präzision“ für Valorant-, CS2- und Rainbow-Six-Spielende, beruft sich auf Woodworth (1899), Fitts (1954) und Meyer et al. (1988) sowie auf Mikrosakkaden (Rolfs, 2009; Martinez-Conde et al., 2004) und gibt Techniktipps (Fingerkuppen bei < 20 px, Mauspad-Reibung als Bremse, „Anker – Stopp – Klick“), eine fünfstufige Tier-Tabelle (Profi < 140 ms, 95–99 %) und 15–20 min Training täglich an.

**Einordnung:**
- **Belegt:** Schnelle Zielbewegungen bestehen aus einem vorgeplanten Anfangsimpuls und einer rückmeldungsgestützten Endsteuerung, heute als „zwei Komponenten, mehrere Prozesse“ verstanden (Elliott et al., 2010); Meyer et al. (1988) beschreiben Primär- plus optionale Korrekturbewegung. Fitts’ Formel ist richtig wiedergegeben, „umgekehrt proportional zur Zielbreite“ aber falsch: Die Zeit steigt linear mit log2(2D/W) (MacKenzie, 2018).
- **Mechanik passt nur bedingt zur Theorie:** Das Mikroziel ist kein Rest-Fehler der ersten Bewegung, sondern ein **neues Ziel** in unvorhersehbarer Richtung, das erst nach dem Klick erscheint. Geübt wird also eine zweite, kurze Zielbewegung aus dem Stand (eigene Reaktionszeit plus Bewegung), nicht die Korrekturphase innerhalb *einer* Bewegung, wie sie Woodworth und Meyer beschreiben (eigene Einordnung).
- **Tier-Tabelle ohne Datengrundlage:** Keine der Quellen enthält solche Werte; die Aussage der Seite, jede Zahl stamme aus den genannten Arbeiten, ist irreführend. „< 140 ms“ Korrekturzeit liegt sogar unter der mittleren einfachen Reaktionszeit ohne jede Zielbewegung (213–231 ms; Woods et al., 2015) und nahe der reinen Entdeckungszeit (≈ 131 ms; Woods et al., 2015). Da das Mikroziel in zufälliger Richtung mindestens 55 px entfernt erscheint und erst noch angefahren werden muss, ist dieser Wert praktisch nicht erreichbar (eigene Folgerung).
- **Übertrieben/falsch:** „Mikrosekundenschnelle visuelle Verifizierung“ (physiologisch unmöglich); „Raw-Pointer-Lock eliminiert Endphasen-Oszillationen“ – die Vorlage fordert keine Rohdaten an (`unadjustedMovement` fehlt; MDN, o. J.), Mausbeschleunigung des Betriebssystems bleibt aktiv, und Oszillationen sind motorisch bedingt. „Visuelles Feedback 120–160 ms“ ist als Größenordnung plausibel (Handkorrektur nach ≈ 110 ms; Brenner & Smeets, 1997), aber ohne Quelle. „USB-Polling +8 ms bei 125 Hz“: 8 ms ist das Intervall, im Mittel ≈ 4 ms Zusatzwartezeit.
- **Techniktipps unbelegt:** Pixelangaben ohne Empfindlichkeit und Sehwinkel sind nicht übertragbar; nur 6 von 13 Community-Annahmen über Profitechniken ließen sich bei CS:GO-Profis statistisch stützen (Park et al., 2021). „Verkrampfen vermeiden“ ist nicht so einfach: Mehr Co-Kontraktion ging bei kleinen Zielen mit **höherer** Endpunktgenauigkeit einher und nahm über die Übung tendenziell ab (Gribble et al., 2003; Arm-Zeigebewegungen, nicht Maus). Zur Trainingsdauer zeigen Aim-Lab-Daten ≈ 90 % des Tagesnutzens bei 30 min/Tag (Listman et al., 2021; Herstellerstudie).
- **Positiv:** Der Hinweis, zuerst auf Genauigkeit statt Tempo zu üben, und der Messhinweis (Vergleiche nur am selben Gerät) sind sinnvoll.

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Das Nachziel hat einen Radius von 2,4–4,6 Einheiten (mindestens 24 Pixel), das Ankerziel 6 Einheiten (mindestens 34 Pixel). Beides liegt weit über der Sehschärfegrenze (≈ 1′ bei Visus 1,0); anspruchsvoll ist das Zentrieren des Fingers auf das kleine Ziel → `sehschaerfe_detail` 1. Der Kontrast ist hoch, Farbunterscheidung ist nicht nötig. Als Faustwert: Bei 40 cm Abstand entspricht 1 cm auf dem Bildschirm etwa 1,4°.
- **Blickmotorik:** Pro Runde eine Sakkade zum Ankerziel (als einziges Ziel ohne Ablenker, also keine Suche → `visuelle_suche` 0) und eine kleine Sakkade zum Nachziel; dann ruhige Fixation bis zum Tipp. Bei Aufgaben mit hoher Detailanforderung verlagern Mikrosakkaden den Blick gezielt auf die relevante Stelle (Ko et al., 2010). In Zielaufgaben aus der Egoperspektive ging eine längere letzte Fixation vor dem Klick („Quiet Eye“) mit besserer Leistung einher (Dahl et al., 2021; korrelativ). Keine Blickfolge (Ziele ruhen), kein Stereosehen.
- **Brille:** Bei Gleitsichtgläsern liegt das klare Sehen im Zwischenbereich in einer schmalen Zone unterhalb der Blickmitte; Ziele am oberen Rand oder seitlich erfordern Kopfneigung oder liegen in der seitlichen Unschärfe – das stört das genaue Zentrieren. Bildschirm-Gleitsichtgläser senkten die Kopfneigung am Monitor im Mittel um 2,3° und wurden für die Monitorsicht besser bewertet; die Vorliebe war aber individuell verschieden (Jaschinski et al., 2015; N = 23). Eine passende Korrektur kann das Sehen am Bildschirm erleichtern, ändert aber nichts an der Handpräzision.
- **Trockenes Auge:** Konzentriertes Fixieren am Bildschirm senkt die Lidschlagrate deutlich (Patel et al., 1991); digitale Augenbelastung ist häufig (Sheppard & Wolffsohn, 2018) → Pausen zwischen den Runden.

## 5. Neurowissenschaftliche Grundlagen

Die Aufgabe verbindet Zielentdeckung, Blicksprung, visuomotorische Umrechnung und rückmeldungsgestützte Endsteuerung der Hand. Die rasche Anpassung einer laufenden Handbewegung an einen Zielsprung hängt vom hinteren Parietalkortex ab: Transkranielle Magnetstimulation dort störte solche Bahnkorrekturen (Zielsprung während einer Sakkade, Hand nicht sichtbar), ließ Bewegungen zu ruhenden Zielen aber unberührt (Desmurget et al., 1999; N = 5). Frühe Übung verbessert vor allem die Planung des Anfangsimpulses, später auch die Nutzung der Rückmeldung (Elliott et al., 2010). Mikrosakkaden sind real und funktionell (Ko et al., 2010); ein Zusammenhang mit dem Überschießen beim Zeigen ist nicht untersucht. Dass die Übung bestimmte Hirnregionen „trainiert“, ist nicht belegt.

## 6. Motorische Grundlagen

- **Fitts’sches Gesetz:** Für die Nachbewegung ergibt sich mit der Trefferfläche (= sichtbares Ziel) ein Schwierigkeitsindex von rechnerisch etwa 1,1 bit (Stufe 1) bis etwa 2,0 bit (Stufe 12; Shannon-Form log₂(D/W + 1), eigene Rechnung, auf kleinen Bildschirmen wegen der Mindestgröße von 24 Pixel Radius etwas niedriger) – das sind kurze, eher leichte Bewegungen. Die Maus erreicht in Normstudien einen Durchsatz von ≈ 3,7–4,9 bit/s (Soukoreff & MacKenzie, 2004); für das Antippen gelten andere Werte. Bei Profis einer Zielübung am Bildschirm beschrieb das Fitts-Gesetz die Leistung über Zielgrößen hinweg allerdings schlecht (Donovan et al., 2022; Beteiligung des Anbieters).
- **Zeitbudget:** Die Sichtzeit sinkt von 2,2 s auf 0,88 s. Darin müssen Reaktionszeit (≈ 213–231 ms; Woods et al., 2015), eine kurze Zielbewegung und gegebenenfalls eine Nachkorrektur (≈ 110 ms; Brenner & Smeets, 1997) Platz finden → auf hohen Stufen ein deutlicher Tempo-Genauigkeits-Konflikt (eigene Abschätzung).
- **Ruhige Hand:** Physiologischer Handtremor hat im Mittel eine Frequenz von 7,7 Hz (Raethjen et al., 2000; N = 117); seine Amplitude ist klein, doch bei kleinen Zielen kann schon ein Zittern von wenigen Pixeln den Tipp verschieben (eigene Einschätzung).
- **Touch:** Beim Antippen kommt eine eigene Ungenauigkeit des Fingers hinzu, die vom Tempo unabhängig ist (Bi et al., 2013); der wahrgenommene Berührpunkt hängt von der Fingerhaltung ab (Holz & Baudisch, 2010). Der Finger verdeckt beim Antippen kurz das Ziel – das gehört zur Aufgabe.
- **Übertragbarkeit auf Spiele:** Zielen mit schwenkender Egokamera und Zeigen mit dem Cursor sind kinematisch sehr ähnlich (Warburton et al., 2023); das spricht für die Aufgabenform, nicht für einen Transfer.

## 7. Einflussfaktoren und Messgrenzen

- **Die Zeit zwischen den Tipps ist keine reine Korrekturzeit:** Sie enthält Entdecken, Blicksprung, Bewegungsstart und Bewegung; nur Treffer zählen (Auswahleffekt). Sie ist nicht mit Werten aus der Motorikforschung vergleichbar.
- **Trefferquote und Abstand:** Die Trefferfläche entspricht dem sichtbaren Ziel (kein Zuschlag); der Abstand zur Mitte wird in Prozent des Zielradius angegeben und ist so geräteunabhängiger als Pixelwerte.
- **Gerät:** Die Zielgrößen hängen von der Bildschirmgröße ab (Einheiten der kürzeren Seite, mit Mindestgrößen in Pixeln); ihr Sehwinkel hängt außerdem von Auflösung und Abstand ab. Die Verzögerung des Touchscreens und die Systemlatenz gehen in jede Zeit ein; Latenzen realer Zielsysteme von 23–243 ms verschlechtern das Zielen messbar, schon ab 41 ms (Ivkovic et al., 2015). Bei Zeigegeräten verändern Übersetzung und Beschleunigung die Aufgabe (Casiez et al., 2008).
- **Sitzungslänge und Adaptivität:** Feste 16 Runden und eine Stufe, die sich nach Erfolg richtet, machen Sitzungen vergleichbar, aber die Stufe, nicht die Zeit, ist die Hauptgröße. Die Reproduzierbarkeit dieser Übung ist nicht untersucht. Einzelne Runden streuen, wie jede Messung am Menschen; mehrere Runden bündeln (Median) und Verläufe auf demselben Gerät vergleichen (vgl. Mountford et al., 2004, zu Mehrfachmessung).
- **Alter:** Ältere (60–75 J.) haben mehr Mühe mit Mausaufgaben, besonders beim Klicken (Smith et al., 1999); die Reaktionszeit steigt um ≈ 0,55 ms pro Lebensjahr (Woods et al., 2015).
- **Ermüdung:** Wiederholtes Zielen mit der Maus (6 × 5 min) ermüdete die Handgelenkstrecker messbar, ohne Leistungsabfall (Forman et al., 2025); für das Antippen auf dem Tablet nicht untersucht.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt – mittel:** Motorisches Lernen in Zielaufgaben ist gut belegt (Elliott et al., 2010). In Daten einer Online-Zielaufgabe (N = 7.174) stiegen die Treffer pro Sekunde über Tage deutlich, die Trefferquote nur mäßig (Listman et al., 2021; Beobachtungsdaten, Anbieterfinanzierung). Für diese Übung gibt es keine Studie.
- **Naher Transfer – schwach:** Es gibt nur indirekte Hinweise. Keine kontrollierte Studie prüft, ob Zieltrainings andere Zielaufgaben oder die Spielleistung verbessern. Bei digitalem Sehtraining entstehen große Effekte vor allem, wenn Übungs- und Testaufgabe am selben Gerät ähnlich sind (Guo et al., 2025) – das spricht für aufgabennahe, gerätegebundene Zugewinne. Actionspiele (nicht einzelne Zielübungen) zeigen kleine kausale Effekte auf kognitive Tests (g = 0,30; Bediou et al., 2023). Gleiche Einstufung wie bei den übrigen Übungen der Gruppe 509–515.
- **Alltagstransfer – fehlend:** Kein Beleg für Nutzen im Alltag, Sport oder Beruf; „Brain-Training“ zeigt allgemein viel Evidenz für die geübte Aufgabe und wenig für entfernte Aufgaben (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** jemand kurze, genaue Zielbewegungen und das Abbremsen vor kleinen Zielen üben möchte; Ziel „Genauigkeit vor Tempo“; ein kurzer, spielerischer Rahmen gewünscht ist; keine Farb- oder Leseanforderung besteht.
- **Weniger passend, wenn …** Blickfolge, Peripherie oder Aufmerksamkeit im Vordergrund stehen sollen; vergleichbare Messwerte gebraucht werden.
- **Vorsicht / anpassen bei …**
  - `tremor_parkinson`, `hand_arm_beschwerden`: kleine Trefferflächen und viele feine Korrekturen (Forman et al., 2025, Mausaufgabe) → kurze Runden, bei Beschwerden pausieren oder eine andere Übung wählen.
  - `presbyopie_gleitsicht`: genaues Zentrieren im Zwischenbereich, Ziele bis nahe an den Bildrand → Bildschirmbrille bzw. passende Zwischenkorrektur; Gerät tiefer halten.
  - `sehbehinderung_niedriger_visus`: kleines Nachziel auf hohen Stufen → Stufe anpassen.
  - `trockenes_auge_bildschirm`, `kopfschmerz_asthenopie`: intensives Fixieren, wenig Lidschlag → Pausen.
  - `photosensitive_epilepsie`, `migraene_lichtempfindlich`: Die Übung arbeitet ohne Blitze und ohne Wackeln; Fehler erscheinen als kleines weiches Kreuz. Bei bekannter Lichtempfindlichkeit dennoch Vorsicht (Fisher et al., 2005).
  - Doppelbilder, plötzliche Sehverschlechterung, Zittern, Kopfschmerz mit Sehverschlechterung oder Schwindel sind ein Anlass für ärztliche Abklärung und kein Übungsthema (Muchnick, 2008, S. 6, 28). Die Übung ist kein Test.
- **Kombiniert gut mit …** 501 und 704 (große Flicks), 508 (Auswahl nach Helligkeit), 705 und 808 (ruhige Hand), 303 (Blicksprünge ohne Gerät).
- **Überschneidungen:** In der Gruppe 509–515 keine Dublette. 511 teilt nur die Form (ruhendes Ziel, Lebensdauer), fordert aber vor allem Reaktion und weite Flicks statt Feinpräzision. Am nächsten liegt 704 (schrumpfende ruhende Ziele, Zentrumstreffer); 509 unterscheidet sich durch den festen Zwei-Schritt-Zyklus (Anker → kleines Nachziel in zufälliger Richtung).

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Tablet:** Original nicht bedienbar (Pointer Lock, nur Maus). Eine Touch-Fassung würde zur Tipp-Aufgabe: kein Fadenkreuz, der Finger verdeckt das Ziel, und Fingerberührungen haben eine eigene, tempounabhängige Ungenauigkeit (Bi et al., 2013) sowie haltungsabhängige Versätze (Holz & Baudisch, 2010). Mikroziele von 10–20 CSS-px (≈ 2–4 mm auf einem 11″-Tablet, eigene Rechnung) wären zu klein → Ziele in Millimetern bzw. Grad festlegen und deutlich vergrößern, Trefferzone ehrlich (= sichtbares Ziel) oder Zuschlag offen anzeigen.
- **Messung:** Reaktionszeit (Erscheinen → Bewegungsbeginn) und Bewegungszeit getrennt erfassen; Endpunktstreuung statt „Präzision“ auswerten; feste Sitzungsdauer ohne Zeitbonus; Median statt Mittelwert.
- **Regeltext:** Zeitbonus und -strafe korrekt angeben (+1 s/−1 s), keine Tier-Tabelle, keine Sicherheits- oder Leistungsversprechen; Mausbeschleunigung erwähnen bzw. `unadjustedMovement` anbieten.
- **Barrierefreiheit:** Größe, Lebensdauer und Timeout wählbar; Rückmeldung nicht nur über Ton/Wackeln; Wackeln und roten Fehler-Schimmer standardmäßig aus; Pausenhinweis nach mehreren Runden.

## 11. Quellen
### Von der Website angegeben
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – einfache RT im Labor (231/213 ms, Hardware 17,8 ms), nicht im Browser; Hz-Werte sind nur Physik (240 Hz = 4,2 ms); Korrekturzeit und Tier-Tabelle stammen nicht daher.
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** ja, mit Unschärfe – Formel korrekt, „umgekehrt proportional zur Zielbreite“ falsch.
- Meyer, D. E., Abrams, R. A., Kornblum, S., Wright, C. E., & Smith, J. E. K. (1988). Optimality in human motor performance: Ideal control of rapid aimed movements. *Psychological Review, 95*(3), 340–370. https://doi.org/10.1037/0033-295X.95.3.340 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Primär- plus optionale Korrekturbewegung ja; „landet strategisch kurz vor dem Rand“ und „Mikrokorrektur entscheidet“ nein.
- Martinez-Conde, S., Macknik, S. L., & Hubel, D. H. (2004). The role of fixational eye movements in visual perception. *Nature Reviews Neuroscience, 5*(3), 229–240. https://doi.org/10.1038/nrn1348 – **Prüfung:** DOI stimmt ✓ (Inhalt über Sekundärquellen); **stützt:** teilweise – Mikrosakkaden wirken dem Bildverblassen entgegen; kein Bezug zu Mausklicks oder „Overflick-Drift“.
- Rolfs, M. (2009). Microsaccades: Small steps on a long way. *Vision Research, 49*(20), 2415–2441. https://doi.org/10.1016/j.visres.2009.08.010 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise/nein – Review der Mikrosakkaden-Funktionen korrekt; „mikrosekundenschnelle Target Confirmation“ steht dort nicht und ist unmöglich.
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Website-Titel mit „The“ leicht abweichend); **stützt:** ja – Zwei-Komponenten-Modell (Inhalt über Elliott et al., 2010).

### Weitere Fachliteratur
- Bediou, B., Rodgers, M. A., Tipton, E., Mayer, R. E., Green, C. S., & Bavelier, D. (2023). Effects of action video game play on cognitive skills: A meta-analysis. *Technology, Mind, and Behavior, 4*(1), 28–48. https://doi.org/10.1037/tmb0000102 – kleine kausale Effekte von Actionspielen (g = 0,30).
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts’ law. In *Proceedings of CHI ’13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – eigene Ungenauigkeit von Fingereingaben (Tablet).
- Brenner, E., & Smeets, J. B. J. (1997). Fast responses of the human hand to changes in target position. *Journal of Motor Behavior, 29*(4), 297–310. https://doi.org/10.1080/00222899709600017 – Handkorrektur nach ≈ 110 ms.
- Casiez, G., Vogel, D., Balakrishnan, R., & Cockburn, A. (2008). The impact of control-display gain on user performance in pointing tasks. *Human–Computer Interaction, 23*(3), 215–250. https://doi.org/10.1080/07370020802278163 – Übersetzung und Beschleunigung bei Zeigegeräten (Abstract geprüft).
- Dahl, M., Tryding, M., Heckler, A., & Nyström, M. (2021). Quiet eye and computerized precision tasks in first-person shooter perspective esport games. *Frontiers in Psychology, 12*, 676591. https://doi.org/10.3389/fpsyg.2021.676591 – letzte Fixation vor dem Klick (Zielaufgaben in Egoperspektive).
- Desmurget, M., Epstein, C. M., Turner, R. S., Prablanc, C., Alexander, G. E., & Grafton, S. T. (1999). Role of the posterior parietal cortex in updating reaching movements to a visual target. *Nature Neuroscience, 2*(6), 563–567. https://doi.org/10.1038/9219 – Parietalkortex und Online-Korrektur (PubMed-Abstract geprüft).
- Donovan, I., Saul, M. A., DeSimone, K., Listman, J. B., Mackey, W. E., & Heeger, D. J. (2022). Assessment of human expertise and movement kinematics in first-person shooter games. *Frontiers in Human Neuroscience, 16*, 979293. https://doi.org/10.3389/fnhum.2022.979293 – Fitts bei Profis einer Zielübung (Beteiligung des Anbieters).
- Elliott, D., Hansen, S., Grierson, L. E. M., Lyons, J., Bennett, S. J., & Hayes, S. J. (2010). Goal-directed aiming: Two components but multiple processes. *Psychological Bulletin, 136*(6), 1023–1044. https://doi.org/10.1037/a0020958 – heutiger Stand des Zwei-Komponenten-Modells, Übung.
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize, Rot als Risikofaktor.
- Forman, G. N., Nikitin, S. A., Lang, C. J., Gabriel, D. A., Sonne, M. W., Kociolek, A. M., & Holmes, M. W. R. (2025). Impact of repetitive mouse aiming on muscle fatigue and fine motor performance of the distal upper limb. *Journal of Electromyography and Kinesiology, 82*, 102992. https://doi.org/10.1016/j.jelekin.2025.102992 – Ermüdung.
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the “learning effect” caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – gerätegebundene Lerneffekte.
- Holz, C., & Baudisch, P. (2010). The generalized perceived input point model and how to double touch accuracy by extracting fingerprints. In *Proceedings of CHI ’10* (S. 581–590). ACM. https://doi.org/10.1145/1753326.1753413 – Touch-Versätze je Fingerhaltung.
- Ivkovic, Z., Stavness, I., Gutwin, C., & Sutcliffe, S. (2015). Quantifying and mitigating the negative effects of local latencies on aiming in 3D shooter games. In *Proceedings of CHI ’15* (S. 135–144). ACM. https://doi.org/10.1145/2702123.2702432 – Systemlatenz 23–243 ms.
- Jaschinski, W., König, M., Mekontso, T. M., Ohlendorf, A., & Welscher, M. (2015). Comparison of progressive addition lenses for general purpose and for computer vision: An office field study. *Clinical and Experimental Optometry, 98*(3), 234–243. https://doi.org/10.1111/cxo.12259 – Bildschirm-Gleitsicht.
- Ko, H.-K., Poletti, M., & Rucci, M. (2010). Microsaccades precisely relocate gaze in a high visual acuity task. *Nature Neuroscience, 13*(12), 1549–1553. https://doi.org/10.1038/nn.2663 – Mikrosakkaden bei Feinaufgaben.
- Listman, J. B., Tsay, J. S., Kim, H. E., Mackey, W. E., & Heeger, D. J. (2021). Long-term motor learning in the “wild” with high volume video game data. *Frontiers in Human Neuroscience, 15*, 777779. https://doi.org/10.3389/fnhum.2021.777779 – Übungsverlauf in einer Klick-Zielaufgabe (Anbieterfinanzierung).
- MacKenzie, I. S. (2018). Fitts’ law. In K. L. Norman & J. Kirakowski (Hrsg.), *The Wiley handbook of human computer interaction* (S. 347–370). Wiley. https://doi.org/10.1002/9781118976005.ch17 – Formel (Crossref: online 2017, Druck 2018).
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm.
- Raethjen, J., Pawlas, F., Lindemann, M., Wenzelburger, R., & Deuschl, G. (2000). Determinants of physiologic tremor in a large normal population. *Clinical Neurophysiology, 111*(10), 1825–1837. https://doi.org/10.1016/S1388-2457(00)00384-9 – physiologischer Tremor.
- Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: Prevalence, measurement and amelioration. *BMJ Open Ophthalmology, 3*(1), e000146. https://doi.org/10.1136/bmjophth-2018-000146 – digitale Augenbelastung.
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do “brain-training” programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer allgemein.
- Smith, M. W., Sharit, J., & Czaja, S. J. (1999). Aging, motor control, and the performance of computer mouse tasks. *Human Factors, 41*(3), 389–396. https://doi.org/10.1518/001872099779611102 – Alter und Maus.
- Soukoreff, R. W., & MacKenzie, I. S. (2004). Towards a standard for pointing device evaluation, perspectives on 27 years of Fitts’ law research in HCI. *International Journal of Human-Computer Studies, 61*(6), 751–789. https://doi.org/10.1016/j.ijhcs.2004.09.001 – Maus-Durchsatz.
- Warburton, M., Campagnoli, C., Mon-Williams, M., Mushtaq, F., & Morehead, J. R. (2023). Kinematic markers of skill in first-person shooter video games. *PNAS Nexus, 2*(8), pgad249. https://doi.org/10.1093/pnasnexus/pgad249 – Kinematik FPS-Zielen vs. Cursorzeigen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – einfache Reaktionszeit ≈ 213–231 ms, Alterseffekt
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2. Aufl.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Warnzeichen mit Abklärungsbedarf (S. 6, 28)
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Wiederholbarkeit und Mehrfachmessung (Kap. 2, S. 17–18, 44)
