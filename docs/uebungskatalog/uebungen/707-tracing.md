---
# ===== Kennung =====
nr: 707
kennung: tracing
name: "Spur folgen – einer laufenden Wellenlinie mit der Fingerhöhe folgen"
name_original: "Maus-Tracking-Test (Seitentitel: Maus-Tracking-Test | Pfad folgen; engl. Mouse Tracing Game / Wave Tracing Trainer)"
kapitel: "Motorik"
kapitel_original: "motor"
unterkapitel_original: "precision-control"
quelle_url: "https://skilldrills.online/de/drills/motor/precision-control/tracing"
blickfit_umsetzung: {kennung: "spur-folgen", name: "Spur folgen", unterschiede: "Tablet-Umsetzung für Touch: große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/spur-folgen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Eine Wellenlinie läuft von rechts nach links über den Bildschirm. Eine Marke folgt der Höhe des Fingers; sie soll möglichst im hellen Toleranzband um die Linie bleiben. Mit jedem gelungenen Durchgang laufen die Wellen schneller, höher und dichter, nach Fehlschlägen wird es wieder leichter."
ziel_funktionen: [kontinuierliche_steuerung, auge_hand_koordination]
eingabe: [maus, touchpad, touch]
tablet_geeignet: mit_anpassung
dauer_sekunden: 45
schwierigkeit_anpassung: "Kein Levelsystem, fester linearer Anstieg über 45 s (Code): Laufgeschwindigkeit 2,2 → 3,8 px pro Bild (bei 60 Hz 132 → 228 px/s, bei 144 Hz 317 → 547 px/s – bildfrequenzabhängig), Amplitude der Hauptwelle 90 → 125 px, der Nebenwelle 8 → 32 px; Toleranz fest ±22 px senkrecht zur Bildschirmwaagrechten. Pfad in jeder Runde identisch."
messgroessen: ["Flow-Punkte (1 Punkt je Bild auf dem Pfad + Boni)", "Flow-Stabilität (Endwert 0–100 %, als 'Peak Flow' bezeichnet)", "längste Serie (in Bildern)", "Note C … S+", "sinnvoll ergänzend: Zeitanteil auf dem Pfad in %, mittlere Abweichung (RMS) in mm oder Grad, zeitlicher Nachlauf hinter der Welle, Zahl der Pfadverluste"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 1
    kontrast: 0
    farbunterscheidung: 1
    stereosehen: 0
    peripheres_sehen: 1
    nutzbares_sehfeld: 1
    blickfolge: 2
    sakkaden: 1
    fixation: 0
    bewegungswahrnehmung: 1
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 0
    zeitliche_aufloesung: 0
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
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 0
    auge_hand_koordination: 3
    zielbewegung_tempo: 0
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 3
    ruhige_hand: 1
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
voraussetzungen: ["Maus (oder Touchpad) mit Pointer Lock am Desktop; auf reinen Touch-Geräten startet das Original ohne Sperre und folgt dem Finger (Dauerberührung = Ziehen)", "Hand 45 s ohne Pause fortlaufend führen können", "Monitor ca. 50–70 cm, passende Korrektion für diesen Abstand", "kein Farbsehen zwingend nötig (Pfadverlust zusätzlich über Text, Ton und fehlendes Leuchten), Rot/Grün-Wechsel ist aber das schnellste Signal", "Esc oder Verlassen von Vollbild/Pointer Lock beendet die Runde"]
vorsicht_bei: [tremor_parkinson, hand_arm_beschwerden, photosensitive_epilepsie, migraene_lichtempfindlich, presbyopie_gleitsicht, gesichtsfeldausfall, trockenes_auge_bildschirm]
geeignet_fuer: ["fortlaufendes Nachführen einer Marke entlang einer sichtbaren, vorhersehbaren Bahn üben (manuelles Verfolgen mit Vorschau)", "Zusammenspiel von Blickfolge und Handführung bei langsamer bis mittlerer Bewegung üben", "kurze Zeit gleichmäßige Konzentration auf eine einzelne Bewegungsaufgabe ohne Entscheidungen", "Fortschritt mit sich selbst am selben Gerät vergleichen"]
weniger_geeignet_fuer: ["Menschen mit Tremor oder Handschmerzen (auf höheren Stufen schnelle Auf- und Abbewegungen)", "Vergleich zwischen Personen oder Geräten", "Übungsziel reine Blickmotorik ohne Hand (dafür 403/105)", "wer schnelle Zielbewegungen oder Reaktionen üben möchte (702, 704)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Manuelles Verfolgen und Auge-Hand-Kopplung werden mit Übung besser; Übertragung auf andere Aufgaben, Zeichnen, Spiele oder Tremor ist für diese Übung nicht untersucht."
aehnliche_uebungen: [705, 403, 505, 514, 515, 104, 105, 407, 706, 808]
stichworte: ["Tracing", "Pfad nachfahren", "manuelles Verfolgen", "pursuit tracking", "Vorschau", "Sinuswelle", "Auge-Hand-Koordination", "glatte Blickfolge", "Steering Law", "Bildfrequenzabhängigkeit", "Maus"]
---

# 707 · Wellenlinie nachfahren – Zeiger auf einer laufenden Sinuswelle halten

> Original: „Maus-Tracking-Test“ – skilldrills.online, Kapitel Motorik (`motor/precision-control`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung
Auf dunklem Grund läuft eine leuchtende Wellenlinie gleichmäßig von rechts nach links. Man legt den Finger irgendwo auf; eine Marke folgt der Höhe des Fingers und sitzt etwas oberhalb davon, sodass die Hand nichts verdeckt. Aufgabe ist, die Marke im hellen Toleranzband um die Linie zu halten; gezählt wird nur die Höhe, die waagrechte Fingerposition spielt keine Rolle. Die kommende Bahn ist sichtbar, wer vorausschaut, kann die Handbewegung vorwegnehmen. Jeder Durchgang dauert 11 Sekunden und hat eine neue Welle. Ein Durchgang gilt als gelungen, wenn die Marke mindestens 60 % der Zeit im Band war; danach laufen die Wellen schneller, höher und dichter, nach Fehlschlägen wieder langsamer. Hebt man den Finger ab, ist das eine Pause. Eine Sitzung besteht aus fünf Durchgängen.

## 2. Ablauf im Original (Analyse)
Quelle: Seitentext und ausgelieferter Spielcode (Chunk 77593, Stand 29.09.2026; nur Mechanik übernommen). [eigene Berechnung] = aus Code-Formeln abgeleitet.

- **Start/Eingabe (Code):** Countdown 3–2–1–GO (2,6 s), Vollbild; am Desktop **Pointer Lock** ohne Anforderung unbeschleunigter Mausdaten – die Zeigerbeschleunigung des Betriebssystems wirkt, Empfindlichkeit einstellbar 0,1–3 (Standard 1). Esc oder Verlassen von Sperre/Vollbild bricht ab. Geräte mit Touch **ohne** feinen Zeiger: keine Sperre, der Zeiger springt auf die Berührungsstelle (`pointerdown`/`pointermove`) – **auf dem Tablet spielbar**, aber nur bei Dauerberührung; hebt man den Finger, bleibt der Zeiger stehen, die Welle läuft weiter.
- **Pfad (Code):** Höhe y(x) = Bildmitte + sin(x′·2π/520)·(90 + 35·a) + sin(2,2·x′·2π/520 + 0,8)·(8 + 24·a), mit x′ = x + Verschiebung und a = verstrichene Zeit/45 s (0 → 1). Hauptwellenlänge 520 px, Nebenwelle 236 px; Spitze-zu-Spitze-Höhe 196 px → 314 px [eigene Berechnung]. Die Verschiebung beginnt jede Runde bei 0 – **der Pfad ist in jeder Runde gleich**. Gezeichnet wird nur die Linie (2,8 px breit, mit Leuchtschein), **das Toleranzband ist unsichtbar**.
- **Treffer (Code):** „Auf dem Pfad“, wenn der **senkrechte** Abstand zwischen Zeiger und Linie an der Zeigerposition ≤ 22 px ist. Das Band ist also 44 px hoch; senkrecht zur Linie gemessen schrumpft es an steilen Stellen auf ±13,5 px (Start) bzw. ±8,7 px (Ende) [eigene Berechnung]. Waagrecht darf der Zeiger frei stehen; praktisch ist es eindimensionales Verfolgen in der Senkrechten.
- **Tempo – bildfrequenzabhängig (Code):** Die Welle wird **pro Bild** um 2,2 + 1,6·a px verschoben (kein Zeitschritt), der Anstieg a dagegen läuft nach Zeit (Zeitschritt je Bild auf höchstens 33 ms begrenzt – fällt die Bildrate unter ≈ 30/s, laufen auch Anstieg und Flow-Änderung langsamer). Ergebnis [eigene Berechnung]:

  | Bildfrequenz | Laufgeschw. Start → Ende | senkrechte Spitzengeschw. Start → Ende | Frequenz Haupt-/Nebenwelle am Ende |
  |---|---|---|---|
  | 30 Hz | 66 → 114 px/s | 85 → 266 px/s | 0,22 / 0,48 Hz |
  | 60 Hz | 132 → 228 px/s | 170 → 533 px/s | 0,44 / 0,96 Hz |
  | 120/144 Hz | 264/317 → 456/547 px/s | 340/408 → 1.066/1.279 px/s | 0,88/1,05 / 1,93/2,32 Hz |

  An einem 144-Hz-Monitor (oder 120-Hz-Tablet) ist die Aufgabe also 2–2,4-mal schneller als an einem 60-Hz-Bildschirm.
- **Punkte und Flow (Code):** +1 Punkt **je Bild** auf dem Pfad (Serie zählt ebenfalls Bilder); je 4 s ununterbrochen auf dem Pfad „Super Flow“ +5 Punkte und +10 Flow; nach jedem Wiedereintritt „Re-engaged“ **+10 Punkte**. Flow steigt auf dem Pfad um 15 %/s und fällt daneben um 25 %/s. Beim Verlassen: Linie rot, roter radialer Vollbild-Blitz 450 ms (abschaltbar), Partikel, Strafton, Serie 0. Höchstpunktzahl ohne Wiedereintritte ≈ 2.755 (60 Hz) bzw. ≈ 6.535 (144 Hz) [eigene Berechnung].
- **Auswertung (Code):** Note aus **End**-Flow und Punkten: S+ ab Flow ≥ 90 und ≥ 1.400 Punkten, S ≥ 80, A ≥ 60, B ≥ 35, sonst C. Als „Peak Flow“ wird der Flow-Wert **am Ende** gespeichert und beim Teilen als „Genauigkeit %“ ausgegeben. Zeitanteil auf dem Pfad oder Abweichung werden nicht berechnet. Bestwert nur lokal.
- **Widersprüche Regeltext ↔ Code:** (1) „Desktop Exklusiv / 1:1 Rohe Mauseingabe“ – Touch wird unterstützt, Betriebssystem-Beschleunigung und Empfindlichkeitsfaktor wirken. (2) „22px tolerance band“ – tatsächlich ±22 px senkrecht, unsichtbar. (3) „Peak flow state percentage“ – es ist der Endwert. (4) Tabelle „Genauigkeit 98 %+“ – eine solche Genauigkeit wird nicht gemessen. (5) „Verlassen der Spur → Flow fällt drastisch“ – zugleich belohnt der Wiedereintritt mit +10 Punkten (= 10 Bilder auf dem Pfad): **Pendeln über den Bandrand bringt mehr Punkte als sauberes Folgen** und löst jedes Mal einen roten Blitz aus. (6) Punkte, Serie und S+-Schwelle hängen von der Bildfrequenz ab (S+ braucht ohne Wiedereintritts-Boni bei 60 Hz ≈ 50 %, bei 144 Hz ≈ 21 % der Zeit auf dem Pfad) [eigene Berechnung].

## 3. Was die Website sagt – und wie das einzuordnen ist
Die Seite beschreibt einen Präzisionstest für „dynamische Auge-Hand-Koordination, feinmotorische Pfadpräzision und glatte Blickfolge“, der die „mikrostabilisierenden Muskeln von Handgelenk und Unterarm isoliert“. Zielgruppen: E-Sportler:innen, Grafiker:innen, digitale Künstler:innen und Menschen, die „Handzittern reduzieren“ möchten. Begründet wird mit dem Steering Law (Accot & Zhai, 1997), Woodworths „Closed-Loop-Steuerung“ (1899), Krauzlis (2004) und Rashbass (1961); dazu eine Stufentabelle („Großmeister / Präzisions-Operator, Top 1 %, Genauigkeit 98 %+“). Einordnung (Quellenprüfung in Abschnitt 11, Literaturbasis W09 A7):
- **Belegt:** Nachfahren verlangt fortlaufende, rückmeldungsgestützte Korrektur; manuelles Verfolgen ist dabei nicht glatt, sondern intermittierend (Korrekturschübe im Bereich 0,5–1,8 Hz; der scheinbare Mindestabstand von ≈ 170 ms lässt sich nach den Autoren auch durch eine Fehler-Totzone erklären; Miall et al., 1993, Joystick-Aufgabe). Blick und Hand sind gekoppelt: Wer mit der Hand verfolgt, folgt auch mit den Augen besser (Gauthier et al., 1988; Danion & Flanagan, 2018).
- **Falsch zugeordnet:** Das Steering Law beschreibt selbst getaktetes Durchfahren eines Tunnels (T = a + b·A/W). Hier bestimmt die Welle das Tempo – das ist **manuelles Verfolgen mit Vorschau** (preview tracking; van der El et al., 2016), keine Steering-Aufgabe. Die FAQ-Aussage, das Gesetz begrenze die Geschwindigkeit über „Spurbreite und Krümmungsradius“, steht nicht in der Arbeit von 1997.
- **Zugespitzt:** „Genau bis ≈ 30°/s, darüber Aufholsakkaden“ ist keine harte Grenze; einzelne Personen erreichen ≈ 90 % Gain bis 100°/s (Meyer et al., 1985). Die Welle bewegt sich an 60 Hz nur mit 3,5–14°/s (Abschnitt 4) – die Blickfolge begrenzt hier kaum. „Getrennte neuronale Bahnen“ (Rashbass) ist verkürzt: Sakkaden reagieren vor allem auf Positionsfehler, die Folgebewegung auf Geschwindigkeit, beide Systeme teilen aber weitgehend ein Netzwerk (Krauzlis, 2004).
- **Nicht belegt:** „Isoliert Mikromuskeln des Handgelenks“, „reduziert Handzittern“, Nutzen für Zeichnen oder „Tracking-Aim“ in Apex, CS2 oder Overwatch. Für Tremor gibt es keinen Beleg einer Minderung durch solches Training.
- **Leistungstabelle:** Die Seite erhebt nach eigener Aussage keine Nutzerdaten; die zitierten Arbeiten enthalten keine Stufen – **keine Datengrundlage**. Die Spalte „Genauigkeit“ entspricht keinem gemessenen Wert (Abschnitt 2).
- **Sinnvoll:** Handballen abstützen und aus den Fingern steuern, keine Zeigerbeschleunigung (FAQ) – plausible Praxistipps, aber nicht untersucht.

## 4. Optische und okulomotorische Grundlagen
- **Sehwinkel:** Das Toleranzband beträgt ±3,6 % der kürzeren Bildschirmseite; bei 40 cm Abstand entspricht 1 cm etwa 1,4°. Die Linie ist hell auf dunklem Grund: Sehschärfe und Kontrast begrenzen bei korrigiertem Sehen nicht.
- **Bewegung:** Die Linie läuft je nach Stufe mit 8 bis 19 % der kürzeren Bildschirmseite pro Sekunde, die Wellenhöhe beträgt 5 bis etwa 14 %. Bei einer kürzeren Seite von 15 cm und 40 cm Abstand sind das etwa 1,7° bis 4,1° pro Sekunde Lauftempo, die senkrechte Spitzengeschwindigkeit des Schnittpunkts liegt bei etwa 1° bis 10° pro Sekunde (eigene Berechnung). Das liegt deutlich unter der Obergrenze der Folgebewegung (Meyer et al., 1985). Gebraucht werden glatte Folgebewegung mit der Marke plus Vorausblicke nach rechts auf den kommenden Verlauf (kleine Sakkaden). Bei periodischen Bahnen nutzt das Blicksystem Vorhersage und gespeicherte Bahninformation, um den Nachlauf zu verringern (Barnes, 2008).
- **Blick und Hand:** Mitgeführte Hand verkürzt die Auge-Ziel-Verzögerung von etwa 150 auf etwa 30 ms und erhöht die maximale Folgegeschwindigkeit (Gauthier et al., 1988); beim Verfolgen mit dem Cursor ist der Folge-Gain höher und es gibt weniger Aufholsakkaden (Danion & Flanagan, 2018).
- **Brille und Gleitsicht:** Die kommende Bahn reicht bis zum Bildrand. Bei Gleitsicht ist der Zwischenbereich schmal und seitlich unscharf – Kopf mitdrehen, Bildschirm tiefer stellen (Weidling & Jaschinski, 2015), gegebenenfalls Arbeitsplatzbrille. Der Akkommodationsbedarf beträgt bei 40 cm 2,5 dpt, bei 60 cm etwa 1,7 dpt.
- **Trockenes Auge:** Ein starrer, konzentrierter Blick; Bildschirmarbeit senkt die Lidschlagrate deutlich (Patel et al., 1991) – bei mehreren Durchgängen Pausen.
- **Farbe und Licht:** Das Toleranzband ist hell hinterlegt und wird weich ein- und ausgeblendet; es gibt keine Blitze. Farbe trägt keine Bedeutung. Stereosehen spielt keine Rolle.

## 5. Neurowissenschaftliche Grundlagen
Beim visuell geführten Verfolgen hängt die Kleinhirnaktivität von der Koordination zwischen Auge und Hand ab – sie steigt mit zunehmender Koordination, ist aber auch bei unabhängigen Auge-Hand-Bewegungen hoch (nicht-monotoner Zusammenhang; Miall et al., 2001, fMRT). Die Folgebewegung der Augen stützt sich auf ein Netzwerk aus bewegungsempfindlichen Arealen der Sehrinde (MT/MST), frontalem Augenfeld, Kleinhirn, Basalganglien und Colliculus superior, das mit dem Sakkadensystem eng verflochten ist (Krauzlis, 2004). Weil visuelle Verarbeitung Zeit kostet, braucht glattes Folgen Vorhersage: Vorwärtsmodelle sagen die Folgen des eigenen Bewegungsbefehls voraus (Shadmehr et al., 2010), und für periodische Bewegungen speichert das Blicksystem Teile der Bahn für die Vorwegnahme (Barnes, 2008). Dass die Übung bestimmte Hirnregionen oder „Mikromuskeln“ gezielt trainiert, ist nicht belegt.

## 6. Motorische Grundlagen
- **Aufgabentyp:** Verfolgen mit Vorschau (pursuit/preview tracking). Menschen nutzen sichtbare Vorschau, um vorausschauend zu steuern; Modelle beschreiben das mit zwei „Blickpunkten“ auf der kommenden Bahn (nah und fern; van der El et al., 2016, 1 s Vorschau). Hier ist die Vorschau lang – die Aufgabe ist gut vorhersehbar.
- **Intermittierende Korrektur:** Handverfolgung besteht aus Korrekturschüben (Signalleistung bei 0,5–1,8 Hz); bei langsamen Bahnen setzen Korrekturen erst ab einem Fehler von etwa 0,8° Sehwinkel ein, bei schnellen Bahnen passt die Verteilung zu etwa 170 ms Abstand (Miall et al., 1993, Joystick). Dass Bandverluste auch bei Gesunden häufig sind, ist damit gut vereinbar [eigene Einordnung].
- **Tempo und Genauigkeit:** Schnellere Steuersignale streuen stärker (signalabhängiges Rauschen; Harris & Wolpert, 1998). An den steilen Flanken ist das wirksame Band senkrecht zur Linie am schmalsten, an den Scheiteln muss abgebremst und umgekehrt werden.
- **Ruhige Hand:** Physiologischer Tremor (Anteil bei 8–12 Hz; Elble, 1986) ist gegenüber der Bandbreite bei Gesunden unbedeutend; krankhafter Tremor mit größerer Amplitude (z. B. essenzieller Tremor) kann dagegen Bandverluste verursachen [eigene Einordnung].
- **Gerät:** Beim Steuern entlang von Bahnen sind Maus und Grafiktablett deutlich besser als Touchpad und Trackball (Accot & Zhai, 1999). Touch hat keinen Schwebezustand (Buxton, 1990): Man zieht den Finger über das Glas; Finger und Hand verdecken Marke und Band (Vogel & Baudisch, 2007). Deshalb sitzt die Marke über dem Finger, und nur die Fingerhöhe zählt. Die Unschärfe der Fingerposition (beim Antippen: 4,8 mm breite Ziele → 11–14 % Fehler; Bi et al., 2013) ist gegenüber dem Band nicht vernachlässigbar – für Ziehen entlang einer Bahn nicht direkt untersucht.

## 7. Einflussfaktoren und Messgrenzen
- **Gerät und Bildschirm:** Tempo und Wellenform sind relativ zur Bildschirmgröße und in Zeit gerechnet, sodass sie auf Geräten mit unterschiedlicher Bildfrequenz gleich schnell laufen; Sehwinkel und Handweg ändern sich dennoch mit der Bildschirmgröße. Eingabelatenz schwankt je Gerät um bis zu mehrere Dutzend ms (Wimmer et al., 2019). Ergebnisse sind nur **mit sich selbst am selben Gerät** vergleichbar.
- **Kennzahlen:** Gemessen werden die Zeit im Band (in %) und die mittlere Abweichung von der Linie (in % der Bandbreite, geräteunabhängig), jeweils nur solange der Finger am Glas liegt. Die Punkte setzen sich aus Stufe und Anteil im Band zusammen und sind kein reines Leistungsmaß. Gemessen wird die Fingerhöhe gegen die Linie, nicht der Blick.
- **Streuung:** Messungen am Menschen streuen; ein einzelner Durchgang sagt wenig, und eine hohe Korrelation zweier Geräte oder Sitzungen heißt noch nicht, dass die Werte übereinstimmen (Mountford et al., 2004, S. 24, 43–44). Die Zuverlässigkeit der Kennzahlen ist für diese Übung nicht untersucht.
- **Wechselnde Bahn:** Jeder Durchgang hat eine neue Welle, sodass Verbesserungen nicht auf dem Wiedererkennen einer Bahn beruhen. Lernen wiederholter Abschnitte beim kontinuierlichen Verfolgen ist ohnehin schwerer nachzuweisen als bei diskreten Aufgaben (Chambaron et al., 2006) und gelingt vor allem, wenn die Regelmäßigkeit erkennbar ist (Lang et al., 2013).
- **Alter und Übung:** Ältere steuern mit mehr Teilbewegungen (Walker et al., 1997); Übungskurven steigen zunächst steil (Heathcote et al., 2000).
- **Haltung:** Praxisangabe, nicht belegt: Bei Folgeübungen wird üblicherweise empfohlen, den Kopf ruhig zu halten und nur mit den Augen zu folgen; eine entspannte, aufrechte Haltung und ein gleichbleibender Abstand zum Bildschirm erleichtern die Durchführung.

## 8. Studienlage: Trainierbarkeit und Übertragung
- **Übungseffekt – mittel:** Auge-Hand-Koordination beim Verfolgen verbessert sich mit Übung (Gauthier et al., 1988, „control learning“); Übungskurven steigen typischerweise anfangs steil und flachen dann ab (Heathcote et al., 2000). Eine Studie zu genau dieser Aufgabe gibt es nicht.
- **Naher Transfer – schwach:** Motorisches Lernen ist sehr aufgabenspezifisch (Karni et al., 1995); ob sich andere Bahnen, andere Geräte oder Tracking in Spielen verbessern, ist nicht untersucht.
- **Alltagstransfer – fehlend:** Kein Beleg für bessere Zeichen-, Büro- oder Spielleistung und keiner für weniger Tremor. Videospieltraining verbessert allgemeine kognitive Fähigkeiten nicht (Sala et al., 2018).
- **Praxisangabe, nicht belegt:** In der Sehtherapie sind bewegte Folgeziele eine übliche Übungsform – etwa ein an einer Schnur hängender Ball mit Buchstaben, den man in verschiedenen Richtungen und Kreisen schwingen lässt, oder eine drehende Scheibe mit Marke. Üblich ist, mit einfachen Bahnen und langsamem Tempo zu beginnen und in kleinen, selbst gesteuerten Schritten zu steigern. Wirksamkeitsbelege für diese Praxis liegen nicht vor.

## 9. Auswahlhinweise für die KI
- **Passt, wenn …** fortlaufendes Führen der Hand entlang einer **sichtbaren, vorhersehbaren** Bahn geübt werden soll; Blickfolge und Handführung gemeinsam gefordert sein dürfen; keine Entscheidungen gewünscht sind. Als ruhigere Vorstufe zu 505/514/515 (Tracking bewegter Ziele).
- **Weniger passend, wenn …** Ergebnisse zwischen Geräten verglichen werden sollen; das Ziel reine Augenbewegung ist (403, 105); Menschen schnell frustriert sind.
- **Vorsicht / anpassen bei …** `tremor_parkinson` (schnelle Auf- und Abbewegungen auf höheren Stufen; keine „Tremormessung“ ableiten); `hand_arm_beschwerden` (Dauerführung, Handgelenk – Pausen); `photosensitive_epilepsie`, `migraene_lichtempfindlich` (weich eingeblendetes Band, keine Blitze; dennoch Vorsicht bei starker Lichtempfindlichkeit); `presbyopie_gleitsicht` (Bahn bis zum Bildrand); `gesichtsfeldausfall` (die kommende Bahn liegt rechts von der Marke – bei Ausfall rechts fehlt die Vorschau); `trockenes_auge_bildschirm` (starrer Blick). Bei Doppelbildern, Schwindel, plötzlichem Sehverlust oder Kopfschmerz mit Sehverschlechterung nicht üben, sondern ärztlich abklären lassen.
- **Abgrenzung:** Die klinische Prüfung der Augenfolgebewegungen erfolgt mit einem nahen Ziel, das in einem „H“ geführt wird (Muchnick, 2008, S. 32–35). Die Übung ist keine solche Prüfung und liefert keine Aussage über die Qualität der Blickfolge.
- **Kombiniert gut mit …** 403 (Sinuswelle nur mit den Augen) und 105 (Blickfolge) als okulomotorisches Gegenstück, 705 (schmale Bahn, selbst getaktet), 808 (ruhig halten), 505/514/515 (Tracking bewegter Ziele), 706 (Ziehen zum bewegten Ziel).
- **Überschneidungen / Unterschiede:** Innerhalb der Gruppe teilt nur 705 die Kernfunktion `kontinuierliche_steuerung` – keine Dublette: 707 ist **fremd getaktet** (die Welle läuft, man muss mithalten und vorausschauen), 705 **selbst getaktet** mit schmaler Toleranz und ohne Zeitdruck. Ähnliche Wellenbahn, aber nur mit den Augen verfolgt: 403. Hand-Tracking eines bewegten Ziels ohne sichtbare Vorschau: 505, 514, 515.

Keine Diagnose, kein Heil-, Seh- oder Leistungsversprechen; Ergebnisse sind keine Messung von Krankheitszeichen.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung
- **Zeitbasiert rechnen:** Verschiebung mit Zeitschritt (mm/s bzw. °/s), Punkte als Zeit auf dem Pfad in Sekunden – unabhängig von der Bildfrequenz.
- **Tablet/Touch:** Dauerberührung als Ziehen ist möglich, aber Finger und Hand verdecken Zeiger und Bahn. Zeiger versetzt über dem Finger zeichnen (Versatz ≈ 10–15 mm, eigener Vorschlag; zur Verdeckung durch den Finger und versetzter Darstellung vgl. „Shift“, Vogel & Baudisch, 2007) oder Stift empfehlen; Laufrichtung wählbar (für Rechtshänder:innen Bahn von links kommend); Band ≥ ±5 mm; Abheben des Fingers als Pause behandeln statt weiterlaufen zu lassen.
- **Band sichtbar und fair:** Toleranzband halbtransparent zeigen, Abstand senkrecht zur Linie messen, Breite in mm/Grad statt Pixeln; Wiedereintritts-Bonus streichen.
- **Messqualität:** Zeitanteil auf dem Pfad, RMS-Abweichung (mm/Grad) und Nachlauf ausgeben; mehrere Pfade zufällig variieren (sonst lernt man die Bahn); adaptive Geschwindigkeit mit Rückstufung.
- **Sicherheit/Barrierefreiheit:** Kein roter Vollbild-Blitz, Rückmeldung über Form, Linienstärke und Ton statt nur Rot/Grün; Blitzrate ≤ 3/s garantieren; Einsteigerstufe langsam und flach; Hinweis auf Kopfhaltung und Pausen; keine Stufentabelle ohne Daten.

## 11. Quellen
### Von der Website angegeben
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise – das Gesetz beschreibt selbst getaktetes Durchfahren eines Tunnels; hier gibt die Welle das Tempo vor (Verfolgen). Krümmung ist nicht Teil des Modells von 1997 (FAQ-Aussage: nein).
- Krauzlis, R. J. (2004). Recasting the smooth pursuit eye movement system. *Journal of Neurophysiology, 91*(2), 591–603. https://doi.org/10.1152/jn.00801.2003 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise – Übersicht zum Folgenetzwerk und seiner Nähe zum Sakkadensystem; die „≈ 30°/s“-Grenze steht nicht im Abstract und ist keine harte Grenze (Meyer et al., 1985).
- Rashbass, C. (1961). The relationship between saccadic and smooth tracking eye movements. *The Journal of Physiology, 159*(2), 326–338. https://doi.org/10.1113/jphysiol.1961.sp006811 – **Prüfung:** DOI stimmt ✓, **Titel leicht falsch** (Website: „smooth pursuit“, Original: „smooth tracking“); **stützt:** teilweise – klassischer Befund: Sakkaden folgen dem Positionsfehler, Folgebewegung der Geschwindigkeit; „getrennte Bahnen“ ist zugespitzt.
- Woodworth, R. S. (1899). Accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Originaltitel ohne „The“); **stützt:** teilweise – rückmeldungsgestützte „current control“ wurde an Zielbewegungen beschrieben, nicht an fortlaufendem Verfolgen.
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** kein konkreter Bezug im Seitentext – die Arbeit betrifft einfache Reaktionszeit und Gerätelatenz (60-Hz-Monitor ≈ 11 ms); diese Übung misst keine Reaktionszeit.

### Weitere Fachliteratur
- Accot, J., & Zhai, S. (1999). Performance evaluation of input devices in trajectory-based tasks: An application of the steering law. In *Proceedings of CHI '99* (S. 466–472). ACM. https://doi.org/10.1145/302979.303133 – Geräte beim Steuern entlang von Bahnen
- Barnes, G. R. (2008). Cognitive processes involved in smooth pursuit eye movements. *Brain and Cognition, 68*(3), 309–326. https://doi.org/10.1016/j.bandc.2008.08.020 – Vorhersage bei periodischer Blickfolge (Crossref ✓, Abstract gelesen)
- Bi, X., Li, Y., & Zhai, S. (2013). FFitts law: Modeling finger touch with Fitts' law. In *Proceedings of CHI '13* (S. 1363–1372). ACM. https://doi.org/10.1145/2470654.2466180 – Fingerunschärfe
- Birch, J. (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A, 29*(3), 313–320. https://doi.org/10.1364/JOSAA.29.000313 – Farbsehschwäche
- Buxton, W. (1990). A three-state model of graphical input. In D. Diaper et al. (Hrsg.), *Human–Computer Interaction – INTERACT '90* (S. 449–456). Elsevier (North-Holland). – Tagungsband, keine DOI; Touch ohne Schwebezustand
- Chambaron, S., Ginhac, D., Ferrel-Chapus, C., & Perruchet, P. (2006). Implicit learning of a repeated segment in continuous tracking: A reappraisal. *Quarterly Journal of Experimental Psychology, 59*(5), 845–854. https://doi.org/10.1080/17470210500198585 – Lernen wiederholter Bahnabschnitte (Crossref ✓, Abstract gelesen)
- Danion, F. R., & Flanagan, J. R. (2018). Different gaze strategies during eye versus hand tracking of a moving target. *Scientific Reports, 8*, 10059. https://doi.org/10.1038/s41598-018-28434-6 – Blick beim Verfolgen mit der Hand
- Elble, R. J. (1986). Physiologic and essential tremor. *Neurology, 36*(2), 225–231. https://doi.org/10.1212/WNL.36.2.225 – Tremorfrequenzen
- Gauthier, G. M., Vercher, J.-L., Mussa Ivaldi, F., & Marchetti, E. (1988). Oculo-manual tracking of visual targets: Control learning, coordination control and coordination model. *Experimental Brain Research, 73*(1), 127–137. https://doi.org/10.1007/BF00279667 – Auge-Hand-Kopplung, Lernen
- Harding, G., Wilkins, A. J., Erba, G., Barkley, G. L., & Fisher, R. S. (2005). Photic- and pattern-induced seizures: Expert consensus of the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1423–1425. https://doi.org/10.1111/j.1528-1167.2005.31305.x – Blitze, rote Reize
- Harris, C. M., & Wolpert, D. M. (1998). Signal-dependent noise determines motor planning. *Nature, 394*(6695), 780–784. https://doi.org/10.1038/29528 – Tempo und Streuung
- Heathcote, A., Brown, S., & Mewhort, D. J. K. (2000). The power law repealed: The case for an exponential law of practice. *Psychonomic Bulletin & Review, 7*(2), 185–207. https://doi.org/10.3758/BF03212979 – Übungskurven
- Karni, A., Meyer, G., Jezzard, P., Adams, M. M., Turner, R., & Ungerleider, L. G. (1995). Functional MRI evidence for adult motor cortex plasticity during motor skill learning. *Nature, 377*(6545), 155–158. https://doi.org/10.1038/377155a0 – Lernspezifität
- Lang, A., Gapenne, O., Aubert, D., & Ferrel-Chapus, C. (2013). Implicit sequence learning in a continuous pursuit-tracking task. *Psychological Research, 77*(5), 517–527. https://doi.org/10.1007/s00426-012-0460-x – Lernen einer wiederholten Bahn (n = 56; Crossref ✓, Abstract gelesen)
- Meyer, C. H., Lasker, A. G., & Robinson, D. A. (1985). The upper limit of human smooth pursuit velocity. *Vision Research, 25*(4), 561–563. https://doi.org/10.1016/0042-6989(85)90160-9 – Obergrenze der Folgebewegung
- Miall, R. C., Reckess, G. Z., & Imamizu, H. (2001). The cerebellum coordinates eye and hand tracking movements. *Nature Neuroscience, 4*(6), 638–644. https://doi.org/10.1038/88465 – Kleinhirn, Auge-Hand
- Miall, R. C., Weir, D. J., & Stein, J. F. (1993). Intermittency in human manual tracking tasks. *Journal of Motor Behavior, 25*(1), 53–63. https://doi.org/10.1080/00222895.1993.9941639 – intermittierendes Verfolgen
- Patel, S., Henderson, R., Bradley, L., Galloway, B., & Hunter, L. (1991). Effect of visual display unit use on blink rate and tear stability. *Optometry and Vision Science, 68*(11), 888–892. https://doi.org/10.1097/00006324-199111000-00010 – Lidschlag am Bildschirm
- Sala, G., Tatlidil, K. S., & Gobet, F. (2018). Video game training does not enhance cognitive ability: A comprehensive meta-analytic investigation. *Psychological Bulletin, 144*(2), 111–139. https://doi.org/10.1037/bul0000139 – fehlender Ferntransfer
- Shadmehr, R., Smith, M. A., & Krakauer, J. W. (2010). Error correction, sensory prediction, and adaptation in motor control. *Annual Review of Neuroscience, 33*, 89–108. https://doi.org/10.1146/annurev-neuro-060909-153135 – Vorwärtsmodelle
- Spjut, J., Boudaoud, B., Binaee, K., Kim, J., Majercik, A., McGuire, M., Luebke, D., & Kim, J. (2019). Latency of 30 ms benefits first person targeting tasks more than refresh rate above 60 Hz. In *SIGGRAPH Asia 2019 Technical Briefs* (S. 110–113). ACM. https://doi.org/10.1145/3355088.3365170 – Latenz vs. Bildfrequenz
- van der El, K., Pool, D. M., Damveld, H. J., van Paassen, M. M., & Mulder, M. (2016). An empirical human controller model for preview tracking tasks. *IEEE Transactions on Cybernetics, 46*(11), 2609–2621. https://doi.org/10.1109/TCYB.2015.2482984 – Verfolgen mit Vorschau (Crossref ✓, Abstract gelesen)
- Vogel, D., & Baudisch, P. (2007). Shift: A technique for operating pen-based interfaces using touch. In *Proceedings of CHI '07* (S. 657–666). ACM. https://doi.org/10.1145/1240624.1240727 – Verdeckung durch den Finger, versetzter Zeiger
- W3C. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12.12.2024). https://www.w3.org/TR/WCAG22/ – keine DOI; SC 2.3.1 Blitze
- Walker, N., Philbin, D. A., & Fisk, A. D. (1997). Age-related differences in movement control: Adjusting submovement structure to optimize performance. *The Journals of Gerontology: Series B, 52B*(1), P40–P53. https://doi.org/10.1093/geronb/52B.1.P40 – Alter und Teilbewegungen
- Weidling, P., & Jaschinski, W. (2015). The vertical monitor position for presbyopic computer users with progressive lenses: How to reach clear vision and comfortable head posture. *Ergonomics, 58*(11), 1813–1829. https://doi.org/10.1080/00140139.2015.1035764 – Gleitsicht und Monitorhöhe
- Wimmer, R., Schmid, A., & Bockes, F. (2019). On the latency of USB-connected input devices. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (S. 1–12). ACM. https://doi.org/10.1145/3290605.3300650 – Eingabelatenz
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgenauigkeit, Streuung am Menschen, Korrelation und Übereinstimmung (S. 24, 43–44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – klinische Prüfung der Augenfolgebewegungen mit dem H-Muster (S. 32–35)
