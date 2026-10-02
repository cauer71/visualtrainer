import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/saccade.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// („Sakkaden“ → Blickwechsel/Blicksprünge, „Sehwinkel“ erklärt, „Streuung“ erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// Aus dem Prototyp NICHT übernommen: „Das schult präzise Blicksprünge (Sakkaden), das Halten eines Rhythmus …“ (Wirkversprechen),
// „Das Sprechen zwingt dazu, wirklich zu fixieren“ und „stellt sicher, dass der Blick tatsächlich dort angekommen ist“ (nicht
// belegt, die App kann den Blick nicht prüfen), „bei Lichtempfindlichkeit vorher ärztlichen Rat einholen“ (ersetzt durch die
// Formulierung der anderen Übungen). Die Faustregeln unter „So wird es leichter/schwerer“ sind eigene Festlegungen.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert).

export const de: ExerciseTexts = {
  title: 'Takt-Sakkaden',
  tagline: 'Ein Zeichen springt im Takt – schau hin und lies es laut.',
  steps: [
    'Ein Zeichen springt im Takt – schau hin, lies es laut.',
    'Optional: Tippe es an, solange es zu sehen ist.',
    'Kopf ruhig halten, nur die Augen bewegen.',
  ],
  why:
    'Ein Zeichen springt im Takt eines Metronoms zwischen festen Punkten; du schaust es an und liest es laut vor – die Blickwechsel folgen dem Takt. Gemessen wird nur, was du antippst; wohin du schaust und ob du laut liest, kann die App nicht erkennen. Ob sich das Üben auf Lesen, Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Blickwechsel', 'Takt halten', 'Zeichen erfassen'],
  captions: {
    wait: 'Gleich springt ein Zeichen',
    jump: 'Das Zeichen springt im Takt',
    read: 'Ansehen und laut lesen',
    touch: 'Optional: im Takt antippen',
    late: 'Zu spät? Dann zählt es als verpasst',
    count: 'Gezählt wird, was du triffst',
  },
  metrics: {
    beats: 'Gezeigte Zeichen',
    bpm: 'Takt (Schläge pro Minute)',
    amp_cm: 'Größter Sprung (cm)',
    amp_deg: 'Größter Sprung (Sehwinkel)',
    hits: 'Im Takt berührt',
    misses: 'Nicht berührt',
    stray: 'Fehltipps (daneben)',
    accuracy: 'Trefferquote',
    lat_mean: 'Verzögerung nach dem Schlag (Mittel)',
    lat_sd: 'Verzögerung (Streuung)',
    positions: 'Zahl der Positionen',
  },
  metricHints: {
    beats: 'Anzahl der Zeichen, die im Durchlauf gezeigt wurden. Sie steht durch Dauer und Takt fest und sagt nichts über deine Leistung.',
    bpm: 'Der eingestellte Takt: Schläge pro Minute. Er steht hier, damit du den Durchlauf später mit gleichem Takt vergleichen kannst.',
    amp_cm: 'Größte Entfernung zwischen zwei Positionen des Musters in Zentimetern. Auf kleinen Bildschirmen ist sie kürzer.',
    amp_deg: 'Dieselbe Strecke als Sehwinkel in Grad (wie groß sie von deinem Platz aus erscheint), berechnet aus dem eingestellten Abstand zum Bildschirm. Größere Winkel bedeuten weiter auseinanderliegende Positionen.',
    hits: 'Nur mit Berühren im Takt: Zeichen, die du berührt hast, solange sie zu sehen waren.',
    misses: 'Nur mit Berühren im Takt: Zeichen, die nicht berührt wurden, bevor das nächste kam.',
    stray: 'Nur mit Berühren im Takt: Berührungen neben dem Zeichen oder ein zweiter Tipp auf dasselbe Zeichen.',
    accuracy: 'Nur mit Berühren im Takt: Anteil der berührten an allen gezeigten Zeichen. Fehltipps sind darin nicht enthalten.',
    lat_mean: 'Nur mit Berühren im Takt: durchschnittliche Zeit vom Schlag bis zur Berührung, nur für berührte Zeichen. Sie enthält die Verzögerung von Bildschirm und Touch-Sensor und ist nur auf demselben Gerät vergleichbar.',
    lat_sd: 'Nur mit Berühren im Takt: wie stark diese Zeiten schwanken (Standardabweichung). Kleinere Werte bedeuten einen gleichmäßigeren Rhythmus.',
    positions: 'Wie viele verschiedene Positionen das gewählte Muster hat.',
  },
  tips: {
    read: 'Lies jedes Zeichen vollständig laut, auch wenn es leicht scheint: Das Sprechen hilft dir, bei der Sache zu bleiben. Ob du es tust, kann die App nicht prüfen – das liegt bei dir.',
    slower: 'Viele Zeichen hast du nicht rechtzeitig erreicht. Probiere einen langsameren Takt (zum Beispiel 40 bis 50) oder größere Zeichen – und ändere immer nur eine Einstellung.',
    stray: 'Du tippst öfter neben das Zeichen. Erst genau hinschauen und zielen, dann schneller werden.',
    faster: 'Du triffst fast alle Zeichen. Wenn du magst, mach genau eine Einstellung schwerer: schnellerer Takt, kleinere Zeichen oder das Raster 3 × 3.',
    steady: 'Deine Zeiten nach dem Schlag schwanken ziemlich. Bleib locker, atme ruhig und steig, wenn du den Takt verlierst, beim nächsten Schlag wieder ein.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät.',
  },
  feedback: {
    beatsLeft: 'Noch: {n}',
    ready: 'Gleich geht es los. Lies jedes Zeichen laut.',
    cm: 'cm',
    moreTitle: 'Weitere Werte',
    moreNote:
      'Gemessen wird nur dein Tippen, nicht dein Blick und nicht dein lautes Lesen. Die Schläge liegen im Takt, erscheinen aber erst im nächsten Bild (bei 60 Hz bis etwa 17 ms später); die Verzögerung enthält auch die Zeit von Bildschirm und Touch-Sensor. Vergleiche nur mit deinen eigenen Werten auf diesem Gerät.',
  },
  progression: [
    'Leichter: langsamerer Takt (30 bis 50), „Links und rechts“, größere Zeichen, Ziffern, „Der Reihe nach“.',
    'Schwerer: schnellerer Takt (80 bis 120), Raster 3 × 3, kleinere Zeichen, Silben oder Buchstaben, „Zufällig“.',
    'Mit „Berühren im Takt“ ist die Aufgabe deutlich anspruchsvoller; starte dort mit 40 bis 60 Schlägen pro Minute.',
    'Unsere Faustregel (keine Vorgabe aus der Forschung): Triffst du mit Berühren über 90 %, mach genau eine Einstellung schwerer; unter 70 % mach sie leichter. Ohne Berühren: Geh erst weiter, wenn du jedes Zeichen vor dem nächsten Schlag lesen kannst.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“) und gib deinen Abstand an, damit Größen in Zentimetern und der Sprung als Sehwinkel stimmen. Auf kleinen Bildschirmen werden Zeichen und Abstände bei Bedarf verkleinert.',
    'Sitz bequem etwa 50 bis 60 cm vor dem Bildschirm; der Kopf bleibt ruhig, nur die Augen bewegen sich. Mit Ton hörst du den Takt (bei lauter Umgebung mit Kopfhörern). Ist der Ton der App aus, bleibt der Takt still – das Zeichen springt trotzdem.',
    'Das Zeichen wechselt im Takt, höchstens etwa 2,3 Mal pro Sekunde, weich ein- und ausgeblendet und ohne Blinken. Bist du lichtempfindlich oder hattest du schon einmal einen epileptischen Anfall, verzichte bitte darauf.',
    'Gemessen wird nur dein Tippen. Wohin du schaust, ob du den Kopf ruhig hältst und ob du laut liest, kann die App nicht messen – das liegt bei dir.',
    'Der Takt ist bildgenau, nicht millisekundengenau: Zeichen und Ton erscheinen im Bild nach dem Schlag. Für Vergleiche: dasselbe Gerät, dieselbe Hand, derselbe Abstand.',
    'Brennen die Augen oder entsteht Kopfschmerz, mach eine Pause und blinzle bewusst. Bei Schwindel oder Übelkeit brich ab.',
  ],
  params: {
    bpm: {
      label: 'Takt (Schläge pro Minute)',
      hint: 'Schläge pro Minute: 60 ist ein Schlag pro Sekunde. Höhere Werte verlangen schnellere Wechsel. Höchstens 140 – das sind etwa 2,3 Zeichenwechsel pro Sekunde.',
      short: '{v} Schläge/min',
    },
    durationS: {
      label: 'Dauer',
      hint: 'Dauer des Durchlaufs in Sekunden. Daraus ergibt sich die Zahl der Schläge (Dauer × Takt ÷ 60).',
    },
    sizeCm: {
      label: 'Zeichengröße',
      hint: 'Höhe der Zeichen in Zentimetern. Kleinere Zeichen sind schwerer zu erkennen. Auf kleinen Bildschirmen werden sie bei Bedarf verkleinert.',
    },
    pattern: {
      label: 'Anordnung',
      hint: 'Wo die Zeichen erscheinen: in den vier Ecken, in den vier Ecken plus Mitte, links und rechts, oben und unten oder in einem Raster aus 3 × 3 Punkten.',
      options: { corners4: 'Vier Ecken', corners5: 'Vier Ecken und Mitte', horizontal: 'Links und rechts', vertical: 'Oben und unten', grid9: 'Raster 3 × 3' },
    },
    order: {
      label: 'Reihenfolge',
      hint: '„Der Reihe nach“ läuft die Punkte in fester Reihenfolge ab (vorhersehbar). „Zufällig“ wählt den nächsten Punkt zufällig, nie zweimal denselben hintereinander.',
      options: { cycle: 'Der Reihe nach', random: 'Zufällig' },
    },
    symbols: {
      label: 'Zeichen',
      hint: 'Ziffern 1 bis 9, Buchstaben oder zufällige Silben aus Konsonant und Vokal. Silben sind am anspruchsvollsten.',
      options: { digits: 'Ziffern', letters: 'Buchstaben', syllables: 'Silben' },
    },
    touch: {
      label: 'Berühren im Takt',
      hint: 'Bei „Ja“ tippst du das Zeichen an, solange es zu sehen ist. Das misst zusätzlich Trefferquote und Verzögerung. Ohne Berühren zählt nur, wie viele Zeichen gezeigt wurden.',
      options: { no: 'Nein (nur lesen)', yes: 'Ja' },
    },
    sound: {
      label: 'Metronom-Ton',
      hint: 'Ein leiser, gleichmäßiger Ton bei jedem Schlag. Wir empfehlen ihn, weil der Takt die Aufgabe trägt. Ist der Ton der App ausgeschaltet, bleibt es still. Der Ton ändert die Vergleichbarkeit nicht.',
      options: { yes: 'An', no: 'Aus' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Saccadi a ritmo',
  tagline: 'Un segno salta a ritmo – guardalo e leggilo a voce alta.',
  steps: [
    'Un segno salta a ritmo – guardalo, leggilo a voce alta.',
    'Facoltativo: toccalo finché è visibile.',
    'Testa ferma, muovi solo gli occhi.',
  ],
  why:
    'Un segno salta a ritmo di metronomo tra punti fissi; lo guardi e lo leggi a voce alta – i cambi di sguardo seguono il ritmo. Viene misurato solo ciò che tocchi; dove guardi e se leggi a voce alta, l’app non può rilevarlo. Non è dimostrato che l’allenamento si trasferisca alla lettura, alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Cambi di sguardo', 'Tenere il ritmo', 'Cogliere i segni'],
  captions: {
    wait: 'Tra poco salta un segno',
    jump: 'Il segno salta a ritmo',
    read: 'Guardalo e leggilo a voce alta',
    touch: 'Facoltativo: toccalo a ritmo',
    late: 'Troppo tardi? Conta come mancato',
    count: 'Contano i segni che colpisci',
  },
  metrics: {
    beats: 'Segni mostrati',
    bpm: 'Ritmo (battiti al minuto)',
    amp_cm: 'Salto più grande (cm)',
    amp_deg: 'Salto più grande (angolo visivo)',
    hits: 'Toccati a ritmo',
    misses: 'Non toccati',
    stray: 'Tocchi a vuoto (fuori)',
    accuracy: 'Percentuale di colpi',
    lat_mean: 'Ritardo dopo il battito (media)',
    lat_sd: 'Ritardo (variazione)',
    positions: 'Numero di posizioni',
  },
  metricHints: {
    beats: 'Numero di segni mostrati nel giro. È fissato da durata e ritmo e non dice nulla sulla tua prestazione.',
    bpm: 'Il ritmo impostato: battiti al minuto. È indicato qui per poter confrontare il giro più tardi con lo stesso ritmo.',
    amp_cm: 'Distanza massima tra due posizioni del modello in centimetri. Sugli schermi piccoli è più corta.',
    amp_deg: 'La stessa distanza come angolo visivo in gradi (quanto appare grande dal tuo posto), calcolata dalla distanza impostata dallo schermo. Angoli più grandi significano posizioni più lontane tra loro.',
    hits: 'Solo con tocco a ritmo: segni che hai toccato finché erano visibili.',
    misses: 'Solo con tocco a ritmo: segni non toccati prima che comparisse il successivo.',
    stray: 'Solo con tocco a ritmo: tocchi accanto al segno o un secondo tocco sullo stesso segno.',
    accuracy: 'Solo con tocco a ritmo: quota dei segni toccati su tutti quelli mostrati. I tocchi a vuoto non sono inclusi.',
    lat_mean: 'Solo con tocco a ritmo: tempo medio dal battito al tocco, solo per i segni toccati. Comprende il ritardo di schermo e sensore touch ed è confrontabile solo sullo stesso dispositivo.',
    lat_sd: 'Solo con tocco a ritmo: quanto variano questi tempi (deviazione standard). Valori più piccoli indicano un ritmo più regolare.',
    positions: 'Quante posizioni diverse ha il modello scelto.',
  },
  tips: {
    read: 'Leggi ogni segno per intero a voce alta, anche se sembra facile: parlare ti aiuta a restare concentrato. Se lo fai davvero, l’app non può verificarlo – dipende da te.',
    slower: 'Molti segni non li hai raggiunti in tempo. Prova un ritmo più lento (per esempio da 40 a 50) o segni più grandi – e cambia sempre una sola impostazione.',
    stray: 'Tocchi spesso accanto al segno. Prima guarda con attenzione e mira, poi diventa più veloce.',
    faster: 'Colpisci quasi tutti i segni. Se vuoi, rendi più difficile una sola impostazione: ritmo più veloce, segni più piccoli o la griglia 3 × 3.',
    steady: 'I tuoi tempi dopo il battito variano parecchio. Resta rilassato, respira con calma e, se perdi il ritmo, rientra al battito successivo.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo.',
  },
  feedback: {
    beatsLeft: 'Ancora: {n}',
    ready: 'Si parte tra poco. Leggi ogni segno a voce alta.',
    cm: 'cm',
    moreTitle: 'Altri valori',
    moreNote:
      'Viene misurato solo il tuo tocco, non il tuo sguardo e non la tua lettura a voce alta. I battiti sono a ritmo, ma compaiono solo nell’immagine successiva (a 60 Hz fino a circa 17 ms dopo); il ritardo comprende anche il tempo di schermo e sensore touch. Confronta solo con i tuoi valori su questo dispositivo.',
  },
  progression: [
    'Più facile: ritmo più lento (da 30 a 50), “Sinistra e destra”, segni più grandi, cifre, “In ordine”.',
    'Più difficile: ritmo più veloce (da 80 a 120), griglia 3 × 3, segni più piccoli, sillabe o lettere, “A caso”.',
    'Con “Tocco a ritmo” il compito è nettamente più impegnativo; inizia con 40–60 battiti al minuto.',
    'La nostra regola pratica (non è un’indicazione della ricerca): se con il tocco colpisci oltre il 90 %, rendi più difficile una sola impostazione; sotto il 70 % rendila più facile. Senza tocco: procedi solo quando riesci a leggere ogni segno prima del battito successivo.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”) e indica la tua distanza, così le dimensioni in centimetri e il salto come angolo visivo sono corretti. Sugli schermi piccoli segni e distanze vengono ridotti se necessario.',
    'Siediti comodo a circa 50–60 cm dallo schermo; la testa resta ferma, si muovono solo gli occhi. Con il suono senti il ritmo (se l’ambiente è rumoroso, con le cuffie). Se il suono dell’app è spento, il ritmo resta muto – il segno salta comunque.',
    'Il segno cambia a ritmo, al massimo circa 2,3 volte al secondo, con dissolvenza morbida e senza lampeggiare. Se sei fotosensibile o hai già avuto una crisi epilettica, non eseguire l’esercizio.',
    'Viene misurato solo il tuo tocco. Dove guardi, se tieni ferma la testa e se leggi a voce alta, l’app non può misurarlo – dipende da te.',
    'Il ritmo è preciso al fotogramma, non al millisecondo: segno e suono compaiono nell’immagine dopo il battito. Per i confronti: stesso dispositivo, stessa mano, stessa distanza.',
    'Se gli occhi bruciano o viene mal di testa, fai una pausa e sbatti le palpebre di proposito. In caso di vertigini o nausea, interrompi.',
  ],
  params: {
    bpm: {
      label: 'Ritmo (battiti al minuto)',
      hint: 'Battiti al minuto: 60 è un battito al secondo. Valori più alti richiedono cambi più rapidi. Al massimo 140 – circa 2,3 cambi di segno al secondo.',
      short: '{v} battiti/min',
    },
    durationS: {
      label: 'Durata',
      hint: 'Durata del giro in secondi. Ne risulta il numero di battiti (durata × ritmo ÷ 60).',
    },
    sizeCm: {
      label: 'Dimensione dei segni',
      hint: 'Altezza dei segni in centimetri. I segni più piccoli sono più difficili da riconoscere. Sugli schermi piccoli vengono ridotti se necessario.',
    },
    pattern: {
      label: 'Disposizione',
      hint: 'Dove compaiono i segni: nei quattro angoli, nei quattro angoli più il centro, a sinistra e a destra, in alto e in basso o in una griglia di 3 × 3 punti.',
      options: { corners4: 'Quattro angoli', corners5: 'Quattro angoli e centro', horizontal: 'Sinistra e destra', vertical: 'In alto e in basso', grid9: 'Griglia 3 × 3' },
    },
    order: {
      label: 'Ordine',
      hint: '“In ordine” percorre i punti in sequenza fissa (prevedibile). “A caso” sceglie il punto successivo a caso, mai lo stesso due volte di seguito.',
      options: { cycle: 'In ordine', random: 'A caso' },
    },
    symbols: {
      label: 'Segni',
      hint: 'Cifre da 1 a 9, lettere o sillabe casuali di consonante e vocale. Le sillabe sono le più impegnative.',
      options: { digits: 'Cifre', letters: 'Lettere', syllables: 'Sillabe' },
    },
    touch: {
      label: 'Tocco a ritmo',
      hint: 'Con “Sì” tocchi il segno finché è visibile. Questo misura in più percentuale di colpi e ritardo. Senza tocco conta solo quanti segni sono stati mostrati.',
      options: { no: 'No (solo leggere)', yes: 'Sì' },
    },
    sound: {
      label: 'Suono del metronomo',
      hint: 'Un suono lieve e regolare a ogni battito. Lo consigliamo perché il ritmo regge il compito. Se il suono dell’app è spento, resta silenzio. Il suono non cambia la confrontabilità.',
      options: { yes: 'Sì', no: 'No' },
    },
  },
};
