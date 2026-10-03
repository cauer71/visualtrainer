---
# ===== Kennung =====
nr: 803
kennung: quick-dodge
name: "Ausweichen – langsamen Hindernissen mit der Figur entgehen"
name_original: "Maus-Ausweichspiel – Projektilen ausweichen, länger überleben (Quick Dodge)"
kapitel: "Körper & Reflexe"
kapitel_original: "physical"
unterkapitel_original: "reflex-training"
quelle_url: "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge"
blickfit_umsetzung: {kennung: "ausweichen", name: "Ausweichen", unterschiede: "Touch-Fassung für das Tablet: ohne Maus, Zeigersperre und Zeitstrafen, feste Dauer, große Trefferflächen, weiche Übergänge ohne Blitze, adaptive Stufen, Ergebnis nur als Vergleich mit sich selbst (siehe Quelltext src/exercises/ausweichen/)."}
stand: 2026-09-29

# ===== Überblick =====
kurzbeschreibung: "Man führt mit dem Finger eine Figur durch ein Feld, in das von den Seiten und von oben langsam Kugeln und Quader gleiten. Die Hindernisse bewegen sich geradlinig, ein Teil zielt auf die Stelle, an der die Figur beim Erscheinen war; man weicht ihnen aus. Eine Berührung ist nur eine kurze Pause. Mit der Stufe kommen mehr und etwas schnellere Hindernisse."
ziel_funktionen: [kontinuierliche_steuerung, antizipation, bewegungswahrnehmung]
eingabe: [maus, touchpad]
tablet_geeignet: nein
dauer_sekunden: 45
schwierigkeit_anpassung: "Level = max(bisher; Punkte/250 + 1 + ⌊Serie/4⌋), sinkt nie und ist nach oben offen. Tempo 300 px/s (Lv. 1) → 950 (Lv. 8) → 1.600 px/s (Lv. 15), darüber weiter steigend, plus bis 200 px/s bei langer Serie; Abstand neuer Kugeln 0,65 → 0,40 → 0,15 s (Untergrenze 0,10 s); höchstens 8 → 48 Kugeln gleichzeitig (+10 bei Serie); Kugeldurchmesser wächst mit dem Level. Ein Treffer setzt nur die Serie zurück, nicht das Level."
messgroessen: ["Punkte", "Ausweichquote (ausgewichene / ausgewichene + Treffer)", "Zahl der Treffer", "längste Serie", "erreichtes Level bzw. Höchsttempo (px/s)", "sinnvoll: Zeit bis zum ersten Treffer und Treffer pro Minute bei festem Tempo in °/s"]

# ===== Anforderungsprofil 0–3 (alle Schlüssel angeben) =====
anforderungsprofil:
  visuell:
    sehschaerfe_detail: 0
    kontrast: 0
    farbunterscheidung: 0
    stereosehen: 0
    peripheres_sehen: 2
    nutzbares_sehfeld: 2
    blickfolge: 1
    sakkaden: 1
    fixation: 1
    bewegungswahrnehmung: 3
    visuelle_suche: 0
    visuelle_verarbeitungsgeschwindigkeit: 2
    zeitliche_aufloesung: 0
    naharbeit_dauer: 1
  kognitiv:
    daueraufmerksamkeit: 1
    selektive_aufmerksamkeit: 1
    inhibition: 0
    geteilte_aufmerksamkeit: 2
    kognitive_flexibilitaet: 0
    arbeitsgedaechtnis: 1
    kurzzeitgedaechtnis_verbal: 0
    kurzzeitgedaechtnis_visuell_raeumlich: 1
    verarbeitungsgeschwindigkeit: 2
    antizipation: 3
    entscheidung_wahlreaktion: 2
    lesen_sprache: 0
    schlussfolgern: 0
  motorisch:
    einfache_reaktion: 1
    auge_hand_koordination: 2
    zielbewegung_tempo: 1
    zielbewegung_praezision: 1
    kontinuierliche_steuerung: 3
    ruhige_hand: 0
    fingergeschwindigkeit: 0
    fingersequenz_bimanual: 0
    ganzkoerper: 0
    gleichgewicht: 0
    ausdauer_belastung: 0
belastung:
  zeitdruck: 3
  flimmern_lichtreize: 1
  bewegungsreize_schwindel: 1
  koerperliche_belastung: 0
  sturzrisiko: 0
  sprachabhaengigkeit: 0

# ===== Auswahlhilfe =====
voraussetzungen: ["Maus (oder Touchpad) am Computer; das Original nutzt Pointer-Lock und ein eigenes Fadenkreuz, Touch-Wischen wird nicht ausgewertet", "den ganzen Bildschirm (≈ 48° breit bei 24″ in 60 cm) ohne Kopfheben im Blick haben", "keine bekannte Lichtempfindlichkeit (rotes Aufblitzen und Bildschirmwackeln bei jedem Treffer)", "hohes und rasch steigendes Tempo tolerieren; es gibt keinen langsamen Modus"]
vorsicht_bei: [photosensitive_epilepsie, migraene_lichtempfindlich, schwindel_vestibulaer, reisekrankheit, presbyopie_gleitsicht, gesichtsfeldausfall, sehbehinderung_niedriger_visus, trockenes_auge_bildschirm, hand_arm_beschwerden, aufmerksamkeitsprobleme, kognitive_einschraenkung, kinder_unter_6]
geeignet_fuer: ["fortlaufende Steuerung einer Figur unter Zeitdruck üben (ausweichen statt treffen)", "Flugbahnen mehrerer bewegter Objekte abschätzen und freie Lücken vorausschauend wählen", "Aufmerksamkeit über das ganze Feld verteilen, neue Objekte am Rand früh bemerken", "kurze, ruhige Bewegungsaufgabe ohne Treffen und ohne Klicken"]
weniger_geeignet_fuer: ["Menschen, die bei vielen gleichzeitig bewegten Objekten schnell unsicher oder unwohl werden", "vergleichbare Leistungsmessung zwischen Geräten (Wege und Tempo hängen von der Bildschirmgröße ab)", "gezieltes Training der Zielgenauigkeit oder ruhigen Hand (dafür 702, 705)"]
evidenz:
  uebungseffekt: mittel
  naher_transfer: schwach
  alltag_transfer: fehlend
  kommentar: "Zu Ausweichaufgaben dieser Art gibt es keine Studie. Ähnliche Bildschirmaufgaben werden mit Übung besser, die Effekte schrumpfen aber stark, wenn Training und Test sich unterscheiden (Guo et al., 2025); Transfer von Actionspielen auf Aufmerksamkeit ist uneinheitlich (Green & Bavelier, 2003; Boot et al., 2008), auf Sport oder den Alltag nicht untersucht."
aehnliche_uebungen: [806, 106, 805, 707, 410, 801, 505, 104, 206, 802]
stichworte: ["Ausweichen", "Kollisionsvermeidung", "Flugbahn vorhersagen", "Antizipation", "kontinuierliche Steuerung", "Mehrfachobjekte", "Bewegungswahrnehmung", "Mausspiel", "Zeitdruck", "Bullet-Hell", "Skillshot-Dodging"]
---

# 803 · Ausweichen – langsamen Hindernissen mit der Figur entgehen

> Original: „Maus-Ausweichspiel“ (Spielname „Quick Dodge“) – skilldrills.online, Kapitel Körper & Reflexe (`physical`, Unterkapitel `reflex-training`) · Blickfit: noch nicht umgesetzt

## 1. Kurzbeschreibung

Man setzt den Finger unter eine Figur und zieht sie durch das Feld; die Figur sitzt etwas oberhalb des Fingers, sodass die Hand nichts verdeckt. Von links, rechts und oben gleiten Kugeln und Quader langsam und geradlinig herein; etwa die Hälfte zielt auf die Stelle, an der die Figur beim Erscheinen des Hindernisses war, sodass der Weg von Anfang an abschätzbar ist. Wer stillhält, wird berührt; wer in freie Lücken ausweicht, bleibt unberührt. Eine Berührung ist nur eine kurze Pause: Das Hindernis blendet weich aus, ein weiches Symbol erscheint, nach einer Sekunde geht es weiter. Eine Sitzung besteht aus 12 Abschnitten zu je 3,5 Sekunden Spielzeit; ein Abschnitt ohne Berührung gilt als Erfolg. Danach kommen mehr und etwas schnellere Hindernisse, nach Berührungen wird zurückgestuft. Hebt man den Finger ab, ist das eine Pause. Es ist keine Körperübung; geübt wird kontinuierliche Steuerung ohne Klicken.

## 2. Ablauf im Original (Analyse)

Quelle: Seitentext und ausgelieferter Spielcode (Chunk `43811-…js` plus gemeinsame Hilfsmodule für Level, Combo und
Note; Stand 29.09.2026). Nur Mechanik ausgewertet, kein Code übernommen. **[Code]** = aus dem Code, sonst Regeltext.

- **Ablauf und Eingabe [Code]:** Countdown 3-2-1-GO (≈ 2,5 s), dann Pointer-Lock: relative Mausbewegung × einstellbarer
  Empfindlichkeit, eigenes Fadenkreuz (Ring Ø 28 px, Kern Ø 14 px). Ohne Pointer-Lock folgt es der absoluten Mausposition.
  Escape oder Verlust des Pointer-Locks bricht ab. Nur Mausbewegungs-Ereignisse werden ausgewertet; Touch-only-Geräte werden
  erkannt und auf dem Startbildschirm gekennzeichnet – Wischen auf dem Tablet steuert nichts. Kein Klick nötig.
- **Reize [Code]:** Hintergrund #050508 mit schwachem 40-px-Raster. Kugeln rot (#ef4444: Ring 2,5 px, blasse Füllung,
  voller Kern), ab Level 7 mit Leuchtschein. Sie starten 50 px außerhalb eines zufälligen Rands, zielen **einmalig** auf die
  momentane Zeigerposition und fliegen dann gerade weiter (keine echte Zielsuche, obwohl die englische Karte „homing“ sagt).
  Radius wächst in ≈ 1 s von 10 px auf 25–40 px (Lv. 1) bzw. 37,5–60 px (Lv. 15), darüber weiter.
- **Treffer und Ausweichen [Code]:** Treffer, wenn der Abstand Kugelmitte–Zeiger kleiner als Kugelradius + 6 px ist.
  Ausgewichen gilt eine Kugel erst, wenn sie 150 px jenseits des Rands ist. Treffer: Serie und Combo auf null, Bildschirm-
  wackeln (16 px), rotes Aufblitzen (480 ms, abschaltbar über die Effekt-Einstellung), Straf-Ton – und **alle Kugeln
  verschwinden**. Keine Zeit- oder Punktabzüge; die Runde dauert immer 45 s.
- **Punkte [Code]:** je ausgewichener Kugel Grundwert 2 (Lv. 1) → 11 (Lv. 8) → 20 (Lv. 15), darüber weiter steigend, × Combo
  nach Serienlänge: 1,0 → 1,1 (ab 3) → 1,25/1,35/1,5/1,75/2,0/2,5 → 3,0 (ab 50 in Folge).
- **Level und Tempo [Code]:** siehe Kopffeld `schwierigkeit_anpassung`. Level-, Tempo-, Dichte- und Punkteformel sind nach
  oben offen und koppeln sich gegenseitig (mehr Punkte → höheres Level → mehr Punkte je Kugel). Eine grobe Simulation
  **[Herleitung]** ergibt: fehlerfreies Spiel erreicht nach ≈ 20 s Level ≈ 14–18 (> 1.600 px/s) und läuft danach davon;
  mit einem Treffer je 10 Kugeln bleibt man bei Level ≈ 4 und ≈ 300–400 Punkten. Jede Runde endet so faktisch in Treffern.
- **Note [Code]:** nur aus der Punktzahl, Anteil = √(Punkte/17.000): S+ ab ≈ 15.340, S ab ≈ 12.280, A ab ≈ 9.560, B ab 6.120,
  C ab ≈ 3.440, D ab 1.530 Punkten. Ausweichquote = ausgewichene/(ausgewichene + Treffer); beim Treffer gelöschte Kugeln
  zählen nicht.
- **Geräteabhängigkeit [Code, Herleitung]:** Flug und Wachstum mit Zeitschritt (dt, gedeckelt auf 0,1 s) – korrekt; das
  Abklingen des Wackelns pro Bild (≈ 0,36 s bei 60 Hz, ≈ 0,15 s bei 144 Hz). Kollision nur an Bildpositionen: bei 1.600 px/s
  springt eine Kugel 27 px pro Bild (60 Hz) bzw. 11 px (144 Hz); knappe Streifkontakte werden bei 60 Hz eher übersehen, bei
  sehr hohen Leveln (≈ 3.000 px/s, 50 px/Bild) auch frontale. Tempo und Kugelzahl sind absolut: im kleinen Fenster sind die
  Flugzeiten kürzer und das Feld dichter.
- **Widersprüche Regeltext ↔ Code:** „jede Sekunde Punkte“ (Code: nur je ausgewichener Kugel); „Close Shave“-Bonus für knappes
  Streifen (im Code nicht vorhanden); „bis 500 px/s“ (Code 300 → 1.600 px/s und offen; englische Karte „1600+“); Hitbox
  „4 px“ und Kugeln „10–25 px“ (Code 6 px; 10 → bis 60 px und mehr); „Überlebenszeit verringert sich“ (keine Zeitstrafe);
  Stufentabelle S = 24.000+ (Code S+ ab ≈ 15.340); „Mikro-Bewegungen unter 15 px“ genügen nicht – einer gezielten Kugel
  entgeht man erst mit ≈ 31–46 px Seitenversatz (Lv. 1), später bis > 66 px **[Herleitung]**.

## 3. Was die Website sagt – und wie das einzuordnen ist

Die Seite beschreibt ein „sensomotorisches Trainingssystem“: Das Kleinhirn simuliere per Vorwärtsmodell (Kawato, 1999) „die
nächsten 200 ms“ der Kugeln und überbrücke die „visuelle Latenz von 100–150 ms“; Ausweichen folge Woodworths Impuls-plus-
Bremsung, der schrumpfende Fluchtraum Fitts' Gesetz; 144/240-Hz-Monitore und 1.000-Hz-Mäuse senkten die Latenz „unter 4 ms“
(Woods et al., 2015). Das Spiel verbessere Skillshot-Dodging in LoL, CS2 oder Valorant „signifikant“. Zielgruppe: Gamer;
Stufentabelle bis „Top 0,1 % Apex Kinetic Evader“.

**Einordnung.** (1) Vorwärtsmodelle im Kleinhirn sagen die Folgen der **eigenen** Bewegungen voraus, um Rückmeldeverzögerungen
auszugleichen (Kawato, 1999; Wolpert et al., 1998) – nicht die Bahn fremder Objekte; das ist Bewegungswahrnehmung und
Interzeption. „200 ms“ steht in keiner Quelle; die „100–150 ms“ stammen nicht von Woodworth, und Sichtrückmeldung beeinflusst die
Genauigkeit schon bei Bewegungen < 190 ms (Zelaznik et al., 1983). (2) Woodworth und Fitts beschreiben Zielbewegungen zu einem Ziel; beim Ausweichen gibt es
keins – passender sind Modelle, in denen Hindernisse die Bewegungsrichtung „abstoßen“ und der Weg online entsteht (Fajen &
Warren, 2003), für enge Korridore das Steuergesetz (Accot & Zhai, 1997). (3) Woods et al. (2015) messen bei einer 1-kHz-Spielemaus
6,8 ms Tastenverzögerung und für Monitor + Maus zusammen 17,8 ms; die End-to-End-Latenz der Mausbewegung im Browser lag bei
62–83 ms (Casiez et al., 2015, Hardware von 2015) – „< 4 ms“ ist nicht gedeckt. (4) Transfer auf andere Spiele ist nicht untersucht. (5) Die Stufentabelle hat keine
Datengrundlage (laut Website werden keine Daten gesammelt) und passt nicht zur Notenformel im Code. Plausibel ist der
Ergonomie-Tipp (lockerer Griff, Pausen).

## 4. Optische und okulomotorische Grundlagen

- **Sehwinkel:** Die Hindernisse haben je nach Stufe einen Radius von 3,4 bis 4,3 % der kürzeren Bildschirmseite, die Figur 2,1 %. Bei einer kürzeren Seite von 15 cm und 40 cm Abstand sind das Durchmesser von etwa 1,5° bis 1,9° für die Hindernisse (bei 40 cm entspricht 1 cm etwa 1,4°). Sehschärfe und Kontrast begrenzen bei korrigiertem Sehen nicht.
- **Tempo:** Die Hindernisse gleiten je nach Stufe mit 11 bis etwa 25 % der kürzeren Bildschirmseite pro Sekunde, bei 15 cm Seite und 40 cm Abstand also mit etwa 2,4° bis 5,4° pro Sekunde (eigene Berechnung). Geschwindigkeiten werden auch peripher fein unterschieden (Weber-Anteil etwa 6 %; McKee & Nakayama, 1984). Begrenzend ist die Zahl gleichzeitig verfolgbarer Objekte: bei langsamer Bewegung bis etwa 8, bei hoher nur noch eines (Alvarez & Franconeri, 2007; Paradigma: Pylyshyn & Storm, 1988). Mit zwei bis sieben langsamen Hindernissen liegt die Übung im günstigen Bereich; man verfolgt nicht jedes Hindernis, sondern überwacht neue Hindernisse und die freie Fläche um die Figur.
- **Blickstrategie:** Vorwiegend ruhiger Blick in der Nähe der Figur mit Aufmerksamkeit für den Rand; Sakkaden zu neu auftauchenden Hindernissen kosten Zeit. Praxisangabe, nicht belegt: Man soll den Blick „weiten“ und die Aufmerksamkeit über das ganze Feld verteilen. Wohin die Augen tatsächlich gehen, wird nicht gemessen.
- **Form statt Farbe:** Kugeln und Quader unterscheiden sich durch Form und Muster, nicht nur durch die Farbe; Farbsehschwäche ist kein Ausschlussgrund.
- **Brille:** Mit **Gleitsicht** ist der scharfe Zwischenbereich am Bildschirm nur etwa 13–18° breit (Han et al., 2003). Hindernisse am Rand werden trotzdem bemerkt, Kopfbewegungen stören aber die Führung; besser Arbeitsplatzbrille für 50–70 cm oder kleineres Feld. Ab etwa 40 Jahren reicht die Akkommodation für Nahsicht nicht mehr (Charman, 2008).
- **Bildrate:** Das Tempo ist in Sekunden vorgegeben und auf Geräten mit 60 oder 120 Hz gleich; die Berührung wird entlang der Strecke zwischen zwei Bildern geprüft, sodass nichts durchspringen kann.

## 5. Neurowissenschaftliche Grundlagen

Bewegungsrichtung und -tempo der Hindernisse werden in bewegungsempfindlichen Arealen (MT/MST) und parietalen Netzwerken verarbeitet; das gleichzeitige Überwachen mehrerer Objekte entspricht dem Paradigma der Mehrfachobjektverfolgung mit klaren Kapazitätsgrenzen (Meyerhoff et al., 2017). Die Bewegung der Figur beruht auf parietal-prämotorischen Schleifen; das Kleinhirn trägt nach gängiger Auffassung Vorwärtsmodelle der eigenen Bewegung bei (Wolpert et al., 1998). Bei manueller Interzeption nimmt die Hand die Zielbewegung um etwa 150 ms vorweg (Mrotek & Soechting, 2007) – Vorhersage fremder Bewegung ist also real, aber kein Beleg, dass diese Übung „zerebelläre Prädiktion“ trainiert. Aussagen über „neuromuskuläre Bahnen“ sind unbelegt. Schwindel und Gleichgewichtsstörungen gehören in ärztliche Abklärung; für das Gleichgewicht gibt es in der Praxis keinen brauchbaren einfachen Screeningtest (Muchnick, 2008, S. 36).

## 6. Motorische Grundlagen

Die Aufgabe ist **kontinuierliche Steuerung** ohne Zielpunkt: Weil ein Teil der Hindernisse auf die Position der Figur beim Erscheinen zielt, ist gleichmäßiges Weiterbewegen wirksamer als kurze Ruck-Ausweicher; Richtungswechsel kombinieren schnelle Anfangsimpulse mit Korrekturen (Elliott et al., 2001). Wege durch Lücken folgen eher dem Steuergesetz (Zeit ∝ Länge/Breite; Accot & Zhai, 1997) als Fitts' Gesetz. Stillhalten führt zur Berührung; physiologisches Zittern (etwa 8–12 Hz, wenige Pixel; allgemeines Wissen, nicht eigens belegt) spielt bei dem gebotenen Sicherheitsabstand keine Rolle. Ältere bewegen sich langsamer und variabler (Ketcham et al., 2002). Der Finger verdeckt Teile des Feldes; deshalb sitzt die Figur über dem Finger. Längere tägliche Mausnutzung hängt mit Hand-Arm-Beschwerden zusammen (mäßige Evidenz, Hinweis auf Dosis-Wirkung; IJmker et al., 2007); für kurze Durchgänge am Tablet ist das nicht untersucht.

## 7. Einflussfaktoren und Messgrenzen

- **Latenz:** Bei einer End-to-End-Latenz von etwa 62–83 ms im Browser (Messung an einem Testrechner; Casiez et al., 2015) legt ein Hindernis bis zur sichtbaren eigenen Reaktion bei einer Bühnenseite von 15 cm einen Weg von etwa 1 bis 3 mm zurück – Gerät und Browser verändern die Schwierigkeit leicht.
- **Bildschirmgröße:** Wege, Tempo und Abstände sind relativ zur Bühne gewählt; auf kleinen Bildschirmen ist das Feld enger und die Steuerung feiner. Ergebnisse sind nur **mit sich selbst am selben Gerät** vergleichbar. Messungen am Menschen streuen; ein einzelner Abschnitt sagt wenig, und eine hohe Korrelation zweier Geräte oder Sitzungen heißt noch nicht, dass die Werte übereinstimmen (Mountford et al., 2004, S. 24, 43–44).
- **Kennzahlen:** Gemessen werden die Berührungen und der Anteil der Zeit ohne Berührung; die Stufe ergibt sich aus dem Verlauf der Abschnitte ohne Berührung. Es gibt keine Einzelmaße wie Reaktionszeiten.
- **Person:** Erfahrung mit Touch-Geräten, Alter, Müdigkeit, Brille. Strategiewechsel (gleichmäßig kreisen, in der Mitte bleiben) steigern die Ergebnisse rasch – kein Nachweis besserer Wahrnehmung.

## 8. Studienlage: Trainierbarkeit und Übertragung

- **Übungseffekt (mittel):** keine Studie zu dieser Übung; ähnliche Bildschirmaufgaben werden besser, die Effekte sind aber stark aufgebläht, wenn Training und Test ähnlich sind (Reaktionszeit SMD 2,66 vs. 0,50; Guo et al., 2025).
- **Naher Transfer (schwach):** Actionspiele gingen mit besserer visueller Aufmerksamkeit einher (Green & Bavelier, 2003), eine Replikation fand nach über 20 h kaum Verbesserungen (Boot et al., 2008). Für die Mehrfachobjektverfolgung gilt nach üblicher Darstellung, dass Training vor allem diese Aufgabe selbst verbessert (Überblick, hier nicht einzeln belegt).
- **Alltag und Sport (fehlend):** kein Beleg für Transfer auf Ausweichbewegungen im Sport oder auf den Alltag; allgemein zeigt „Brain Training“ wenig entfernten Transfer (Simons et al., 2016).

## 9. Auswahlhinweise für die KI

- **Passt, wenn …** fortlaufende Steuerung, Vorausschau auf Flugbahnen und Überwachen des ganzen Feldes geübt werden sollen; ein ruhiger Einstieg ohne Treffen und ohne Klicken gewünscht ist.
- **Weniger passend, wenn …** Zielgenauigkeit oder vergleichbare Messwerte zwischen Geräten gewünscht sind; viele gleichzeitig bewegte Objekte unangenehm sind.
- **Vorsicht / anpassen bei …** `photosensitive_epilepsie`, `migraene_lichtempfindlich` (weiche Rückmeldung, keine Blitze und kein Bildwackeln; dennoch Vorsicht bei starker Lichtempfindlichkeit; Fisher et al., 2005; WCAG 2.2 SC 2.3.1); `schwindel_vestibulaer`, `reisekrankheit` (mehrere bewegte Objekte – bei Unwohlsein abbrechen; wiederkehrender Schwindel gehört in ärztliche Abklärung, Muchnick, 2008, S. 18, 28); `presbyopie_gleitsicht` (Kopfbewegung statt Blick); `gesichtsfeldausfall`, `sehbehinderung_niedriger_visus` (Hindernisse einer Seite evtl. zu spät bemerkt – keine Aussage über das Gesichtsfeld ableiten, kein Test); `trockenes_auge_bildschirm` (konzentriertes Starren, Pausen); `hand_arm_beschwerden` (Dauerbewegung); `aufmerksamkeitsprobleme`, `kognitive_einschraenkung`, `kinder_unter_6` (mehrere gleichzeitige Hindernisse, steigende Zahl). Sturz- oder Kreislauf-Vorsicht ist mangels Körperbewegung nicht nötig. Bei Doppelbildern, plötzlichem Sehverlust oder neuen Gesichtsfeldausfällen nicht üben, sondern ärztlich abklären lassen.
- **Kombiniert gut mit …** 806 (Ausweichen im Raster), 106 (Mehrfachobjektverfolgung ohne Motorik), 707 (Pfad nachfahren, ruhige Steuerung), 104/505 (einem bewegten Ziel folgen), 801 (Abfangen statt Ausweichen), 805 (Gegenstück: in die Bahn hinein statt aus ihr heraus).
- **Abgrenzung innerhalb 801–805:** 803 ist die einzige Übung der Gruppe mit **kontinuierlicher Steuerung als Kern** und ohne Ziel, das getroffen werden muss (kein Tippen auf Ziele). Spiegelbild ist 805: Dort wird die Figur in die gerade Bahn eines Knotens gestellt und stillgehalten, hier aus den Bahnen heraus bewegt – beide fordern Bahnvorhersage. 801, 802 und 804 sind Abfangübungen und fordern vor allem Zielbewegungstempo; 803 fordert es kaum. Dublette innerhalb der Gruppe: keine.

## 10. Schwächen des Originals und Empfehlungen für eine Blickfit-Umsetzung

- **Tablet/Touch:** Finger ziehen statt Maus; der Finger verdeckt die Umgebung – Steuerpunkt versetzt über dem Finger oder
  Steuerung über ein Pad am Rand. Touch-Verzögerung einplanen (Reaktionszeiten auf Touchgeräten im Browser ≈ 58–70 ms zu lang gemessen; Pronk et al., 2020).
- **Geräteunabhängig:** Tempo in °/s bzw. relativ zur Feldgröße, Kugelzahl pro Fläche, Kollision entlang der Bahn prüfen.
- **Schwierigkeit:** Obergrenze und Absenkung nach Treffern; stufenweise Tempo (z. B. 5 → 10 → 20°/s), getrennt von der Punktzahl.
- **Messqualität:** Zeit bis Treffer und Treffer je Minute pro Tempostufe speichern, feste Rundenlänge beibehalten.
- **Ehrliche Texte:** keine Kleinhirn-, E-Sport- oder Latenzversprechen; offen als Ausweich- und Vorausschau-Spiel benennen.
- **Sicherheit/Barrierefreiheit:** kein rotes Vollbild-Blitzen, kein Wackeln; Kugeln zusätzlich durch Form kennzeichnen.

## 11. Quellen

### Von der Website angegeben
- Kawato, M. (1999). Internal models for motor control and trajectory planning. *Current Opinion in Neurobiology, 9*(6), 718–727. https://doi.org/10.1016/S0959-4388(99)00028-8 – **Prüfung:** DOI stimmt ✓; **stützt die Aussage der Website:** teilweise (interne Modelle der eigenen Motorik ja; Vorhersage fremder Flugbahnen und „200 ms“ nein)
- Woodworth, R. S. (1899). The accuracy of voluntary movement. *The Psychological Review: Monograph Supplements, 3*(3), i–114. https://doi.org/10.1037/h0092992 – **Prüfung:** DOI stimmt ✓ (Crossref-Titel ohne „The“); **stützt:** teilweise (Zwei-Komponenten-Modell für Zielbewegungen; Ausweichen und „100–150 ms Feedback-Verzögerung“ stehen dort nicht)
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology, 47*(6), 381–391. https://doi.org/10.1037/h0055392 – **Prüfung:** DOI stimmt ✓; **stützt:** teilweise/nein (Treffen eines Ziels; Durchgangsbreite beim Ausweichen ist kein Fitts-Ziel)
- Woods, D. L., Wyma, J. M., Yund, E. W., Herron, T. J., & Reed, B. (2015). Factors influencing the latency of simple reaction time. *Frontiers in Human Neuroscience, 9*, 131. https://doi.org/10.3389/fnhum.2015.00131 – **Prüfung:** DOI stimmt ✓; **stützt:** nein (keine Bildraten-/Bewegungsunschärfe-Daten; 1-kHz-Maus 6,8 ms, Summe 17,8 ms – „< 4 ms“ nicht gedeckt)

### Weitere Fachliteratur
- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. In *Proceedings of the ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '97)* (S. 295–302). ACM. https://doi.org/10.1145/258549.258760 – Steuergesetz für Korridore
- Alvarez, G. A., & Franconeri, S. L. (2007). How many objects can you track? Evidence for a resource-limited attentive tracking mechanism. *Journal of Vision, 7*(13), 14. https://doi.org/10.1167/7.13.14 – Verfolgbare Objektzahl sinkt mit dem Tempo
- Boot, W. R., Kramer, A. F., Simons, D. J., Fabiani, M., & Gratton, G. (2008). The effects of video game playing on attention, memory, and executive control. *Acta Psychologica, 129*(3), 387–398. https://doi.org/10.1016/j.actpsy.2008.09.005 – Actionspiel-Training ohne breiten Transfer
- Casiez, G., Conversy, S., Falce, M., Huot, S., & Roussel, N. (2015). Looking through the eye of the mouse: A simple method for measuring end-to-end latency using an optical mouse. In *Proceedings of UIST '15* (S. 629–636). ACM. https://doi.org/10.1145/2807442.2807454 – End-to-End-Latenz, im Browser 62–83 ms (Tabelle 3)
- Charman, W. N. (2008). The eye in focus: Accommodation and presbyopia. *Clinical and Experimental Optometry, 91*(3), 207–225. https://doi.org/10.1111/j.1444-0938.2008.00256.x – Alterssichtigkeit
- Elliott, D., Helsen, W. F., & Chua, R. (2001). A century later: Woodworth's (1899) two-component model of goal-directed aiming. *Psychological Bulletin, 127*(3), 342–357. https://doi.org/10.1037/0033-2909.127.3.342 – Zwei-Komponenten-Modell
- Fajen, B. R., & Warren, W. H. (2003). Behavioral dynamics of steering, obstacle avoidance, and route selection. *Journal of Experimental Psychology: Human Perception and Performance, 29*(2), 343–362. https://doi.org/10.1037/0096-1523.29.2.343 – Hindernisse „stoßen“ die Bewegungsrichtung ab, Route entsteht online (Crossref-Titel mit Tippfehler „obstable“)
- Fisher, R. S., Harding, G., Erba, G., Barkley, G. L., & Wilkins, A. (2005). Photic- and pattern-induced seizures: A review for the Epilepsy Foundation of America Working Group. *Epilepsia, 46*(9), 1426–1441. https://doi.org/10.1111/j.1528-1167.2005.31405.x – Lichtreize
- Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. *Nature, 423*(6939), 534–537. https://doi.org/10.1038/nature01647 – Actionspiele und Aufmerksamkeit
- Guo, Y., Yuan, T., Yang, M., & Qiu, J. (2025). Does the "learning effect" caused by digital devices exaggerate sports visual training outcomes? A systematic review and meta-analysis. *Frontiers in Physiology, 16*, 1664572. https://doi.org/10.3389/fphys.2025.1664572 – aufgeblähte Effekte bei ähnlichem Test
- Han, Y., Ciuffreda, K. J., Selenow, A., & Ali, S. R. (2003). Dynamic interactions of eye and head movements when reading with single-vision and progressive lenses in a simulated computer-based environment. *Investigative Ophthalmology & Visual Science, 44*(4), 1534–1545. https://doi.org/10.1167/iovs.02-0507 – Gleitsicht am Bildschirm
- IJmker, S., Huysmans, M. A., Blatter, B. M., van der Beek, A. J., van Mechelen, W., & Bongers, P. M. (2007). Should office workers spend fewer hours at their computer? A systematic review of the literature. *Occupational and Environmental Medicine, 64*(4), 211–222. https://doi.org/10.1136/oem.2006.026468 – Dauer der Mausnutzung und Hand-Arm-Beschwerden (mäßige Evidenz)
- Ketcham, C. J., Seidler, R. D., Van Gemmert, A. W. A., & Stelmach, G. E. (2002). Age-related kinematic differences as influenced by task difficulty, target size, and movement amplitude. *The Journals of Gerontology: Series B, 57*(1), P54–P64. https://doi.org/10.1093/geronb/57.1.P54 – Alterseffekte bei Zeigerbewegungen
- McKee, S. P., & Nakayama, K. (1984). The detection of motion in the peripheral visual field. *Vision Research, 24*(1), 25–32. https://doi.org/10.1016/0042-6989(84)90140-8 – Bewegungswahrnehmung in der Peripherie
- Meyerhoff, H. S., Papenmeier, F., & Huff, M. (2017). Studying visual attention using the multiple object tracking paradigm: A tutorial review. *Attention, Perception, & Psychophysics, 79*(5), 1255–1274. https://doi.org/10.3758/s13414-017-1338-1 – MOT-Paradigma
- Mrotek, L. A., & Soechting, J. F. (2007). Target interception: Hand–eye coordination and strategies. *The Journal of Neuroscience, 27*(27), 7297–7309. https://doi.org/10.1523/JNEUROSCI.2046-07.2007 – Hand nimmt Zielbewegung ≈ 150 ms vorweg
- Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371–1382. https://doi.org/10.3758/s13428-019-01321-2 – Touch-Reaktionszeiten im Browser ≈ 58–70 ms zu lang gemessen
- Pylyshyn, Z. W., & Storm, R. W. (1988). Tracking multiple independent targets: Evidence for a parallel tracking mechanism. *Spatial Vision, 3*(3), 179–197. https://doi.org/10.1163/156856888X00122 – Mehrfachobjektverfolgung (Grundparadigma)
- Simons, D. J., Boot, W. R., Charness, N., Gathercole, S. E., Chabris, C. F., Hambrick, D. Z., & Stine-Morrow, E. A. L. (2016). Do "brain-training" programs work? *Psychological Science in the Public Interest, 17*(3), 103–186. https://doi.org/10.1177/1529100616661983 – Transfer
- Wolpert, D. M., Miall, R. C., & Kawato, M. (1998). Internal models in the cerebellum. *Trends in Cognitive Sciences, 2*(9), 338–347. https://doi.org/10.1016/S1364-6613(98)01221-2 – Vorwärtsmodelle sagen Folgen eigener Bewegungen voraus
- Zelaznik, H. N., Hawkins, B., & Kisselburgh, L. (1983). Rapid visual feedback processing in single-aiming movements. *Journal of Motor Behavior, 15*(3), 217–236. https://doi.org/10.1080/00222895.1983.10735298 – Sichtrückmeldung wirkt schon bei Bewegungen < 190 ms
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (SC 2.3.1). https://www.w3.org/TR/WCAG22/ – Norm, keine DOI

Prüfvermerk: Alle DOIs am 29.09.2026 per Crossref geprüft; Inhalte über Abstracts/Volltexte (Gruppen-Literaturbasis W10;
Fajen & Warren 2003, Mrotek & Soechting 2007, Wolpert et al. 1998 per PubMed-Abstract; MOT-Quellen aus docs/wissenschaft/02).
Sehwinkel, Pixelsprünge, Latenzwege und die Level-Simulation sind eigene Herleitungen aus Code und Formeln.
- Mountford, J., Ruston, D., & Dave, T. (2004). *Orthokeratology: Principles and Practice*. Butterworth-Heinemann. https://openlibrary.org/isbn/9780750640077 – Messgenauigkeit, Streuung am Menschen, Korrelation und Übereinstimmung (S. 24, 43–44)
- Muchnick, B. G. (2008). *Clinical Medicine in Optometric Practice* (2nd ed.). Mosby/Elsevier. https://openlibrary.org/isbn/9780323029612 – Schwindel als Beschwerde mit Abklärungsbedarf (S. 18, 28); kein brauchbarer Screeningtest für das Gleichgewicht (S. 36)
