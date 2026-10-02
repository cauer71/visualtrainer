import type { ExerciseTexts } from '../../core/types';

// Quelle: Labor-Prototyp (help/follow.js), für Blickfit geglättet: du-Form, einfache Sprache, Fachwörter erklärt
// („Augen-Hand-Verfolgung“, „Toleranz“ → „Spielraum um das Ziel“, „Kennzahlen“ erklärt).
// Formulierungsregeln (Optiker-Seite): nur beschreiben, was man in der Übung tut; keine Wirk-, Heil- oder
// Sicherheitsversprechen, kein „Test“, keine Normwerte, Vergleich nur mit sich selbst auf diesem Gerät.
// Aus dem Prototyp NICHT übernommen: „trainiert das gleitende Verfolgen“ (Wirkversprechen), „Gleitende Augenbewegungen über
// längere Zeit sind ermüdend“ und „Schnelle Armbewegungen belasten Schulter und Ellenbogen“ (nicht belegt; als Pausenhinweis
// formuliert). Die Faustregeln unter „So wird es leichter/schwerer“ sind eigene Festlegungen, keine Vorgaben aus der Forschung.
// `short` in params: Vorlage für die Kurzfassung der Einstellungen auf der Ergebnisseite ({v} = Wert).

export const de: ExerciseTexts = {
  title: 'Ziel verfolgen',
  tagline: 'Halte den Finger auf einem Ziel, das gleichmäßig wandert.',
  steps: [
    'Finger auf das gelbe Ziel legen, dann bewegt es sich.',
    'Gleite mit. Verloren? Setze den Finger einfach wieder an.',
    'Gezählt wird die Zeit, in der dein Finger auf dem Ziel ist.',
  ],
  why:
    'Du verfolgst ein bewegtes Ziel mit den Augen und führst die Hand gleichzeitig mit – Sehen und Handbewegung müssen zusammenpassen. Gemessen wird nur, wo dein Finger ist; wohin du schaust, kann die App nicht erkennen. Ob sich das Üben auf Alltag, Sport oder Verkehr überträgt, ist nicht belegt.',
  goodFor: ['Auge und Hand', 'Verfolgen', 'Ruhige Führung'],
  captions: {
    wait: 'Gleich bewegt sich das Ziel',
    touch: 'Finger auf das Ziel legen',
    follow: 'Mitgleiten, ohne abzusetzen',
    lost: 'Verloren? Einfach wieder ansetzen',
    count: 'Gezählt wird die Zeit auf dem Ziel',
  },
  metrics: {
    on_pct: 'Zeit auf dem Ziel',
    on_s: 'Zeit auf dem Ziel (Sekunden)',
    mean_dist: 'Mittlere Abweichung',
    best_run: 'Längste Verfolgung am Stück',
    losses: 'Verlorene Verbindungen',
    touch_pct: 'Zeit mit Fingerkontakt',
  },
  metricHints: {
    on_pct:
      'Anteil der Zeit, in der dein Finger auf dem Ziel war – bezogen auf die ganze Zeit, auch auf die Zeit, in der du den Finger nicht aufgelegt hattest. Der Wert hängt stark von den Einstellungen ab (Bahn, Tempo, Größe).',
    on_s: 'Dieselbe Zeit in Sekunden.',
    mean_dist: 'Durchschnittlicher Abstand zwischen Finger und Mitte des Ziels, solange der Finger auf dem Bildschirm war. Kleinere Werte bedeuten: Du warst näher an der Mitte.',
    best_run: 'Die längste Zeitspanne, in der du ohne Unterbrechung auf dem Ziel warst.',
    losses: 'Wie oft du das Ziel verloren hast, nachdem du es schon erreicht hattest (Finger abgehoben oder zu weit weg).',
    touch_pct: 'Anteil der Zeit, in der dein Finger den Bildschirm berührt hat – egal wo.',
  },
  tips: {
    touch: 'Dein Finger war nur kurz auf dem Bildschirm. Leg ihn gleich zu Beginn auf das Ziel und bleib dran – hast du das Ziel verloren, setze einfach wieder an.',
    harder: 'Du warst fast die ganze Zeit auf dem Ziel. Wenn du magst, mach genau eine Einstellung schwerer, zum Beispiel ein etwas höheres Tempo oder ein kleineres Ziel.',
    easier: 'Das Ziel war oft außer Reichweite. Mach es dir leichter – langsameres Tempo, größeres Ziel oder mehr Spielraum – und ändere immer nur eine Einstellung.',
    lost: 'Du hast das Ziel öfter verloren. Spring nicht hektisch hinterher, sondern gleite ruhig zur Bahn zurück und fang das Ziel gezielt wieder ein.',
    compare: 'Vergleiche diesen Durchlauf nur mit Durchläufen, die dieselben Einstellungen hatten – auf diesem Gerät und mit derselben Hand.',
  },
  feedback: {
    live: '{s} s · {p} %',
    start: 'Lege den Finger auf das Ziel',
    cm: 'cm',
    moreTitle: 'Weitere Werte',
    moreNote: 'Gemessen wird nur dein Finger, nicht dein Blick. Vergleiche die Werte nur mit deinen eigenen auf diesem Gerät und mit denselben Einstellungen.',
  },
  progression: [
    'Leichter: Ellipse, langsames Tempo (3 bis 6 cm/s), großes Ziel (4 bis 6 cm), mehr Spielraum (1 cm), Bahn anzeigen.',
    'Schwerer: Liegende Acht oder verschlungene Kurve, höheres Tempo (12 bis 25 cm/s), kleineres Ziel (1,5 bis 2 cm), wenig Spielraum, Bahn ausblenden.',
    'Wechsle die Hand und vergleiche die Ergebnisse nur mit Durchläufen derselben Hand.',
    'Unser Vorschlag (keine Vorgabe aus der Forschung): erst den Anteil auf dem Ziel bei gleichem Tempo steigern, dann ein Stück schneller werden. Ändere immer nur eine Einstellung auf einmal.',
  ],
  cautions: [
    'Stell den Bildschirm einmal ein („Bildschirm kalibrieren“), damit Größe und Tempo in Zentimetern stimmen. Auf kleinen Bildschirmen wird die Bahn kleiner, das Tempo bleibt gleich.',
    'Sitz etwa 50 bis 60 cm vom Bildschirm entfernt, sodass du die ganze Bahn bequem erreichst. Der Bildschirm sollte sauber sein, damit der Finger gleitet. Stütze die Hand nicht auf dem Rahmen auf.',
    'Dein Finger liegt auf dem Ziel und verdeckt es zum Teil. Der Ring um das Ziel zeigt, wie nah du sein musst; ist der Finger daneben, führt eine gestrichelte Linie zum Ziel.',
    'Gemessen wird nur dein Finger. Ob du dem Ziel auch mit den Augen folgst, kann die App nicht messen – das liegt bei dir.',
    'Wird dir das Verfolgen auf die Dauer anstrengend oder werden Schulter und Arm müde, mach eine Pause. Bei Schwindel oder Augenbeschwerden brich ab.',
    'Für Vergleiche: immer dieselbe Hand, derselbe Abstand, dasselbe Gerät. Ergebnisse mit anderen Einstellungen werden nicht miteinander verglichen.',
  ],
  params: {
    durationS: {
      label: 'Dauer',
      hint: 'Wie lange das Ziel wandert und die Zeit gezählt wird. Vorher hast du einen Moment, um den Finger aufzulegen.',
    },
    path: {
      label: 'Bahn',
      hint: '„Ellipse“ ist gleichmäßig und gut vorhersehbar. „Liegende Acht“ und „Verschlungene Kurve“ haben wechselnde Kurven und sind schwerer.',
      options: { ellipse: 'Ellipse', eight: 'Liegende Acht', lissajous: 'Verschlungene Kurve' },
    },
    speedCmS: {
      label: 'Geschwindigkeit (cm/s)',
      hint: 'Wie schnell das Ziel wandert, in Zentimetern pro Sekunde – gleichmäßig, egal wie die Bahn verläuft.',
      short: '{v} cm/s',
    },
    diameterCm: {
      label: 'Größe des Ziels',
      hint: 'Durchmesser des Ziels in Zentimetern. Kleinere Ziele verlangen genaueres Führen.',
      short: '{v} cm',
    },
    toleranceCm: {
      label: 'Spielraum um das Ziel',
      hint: 'Dieser Streifen um das Ziel zählt noch als „auf dem Ziel“ (der gestrichelte Ring), damit der Finger nicht millimetergenau sein muss.',
    },
    showTrail: {
      label: 'Bahn anzeigen',
      hint: 'Zeigt die Bahn als dünne Linie. Ohne Bahn musst du vorhersehen, wohin das Ziel läuft.',
      options: { yes: 'Ja', no: 'Nein' },
    },
  },
};

export const it: ExerciseTexts = {
  title: 'Segui il bersaglio',
  tagline: 'Tieni il dito su un bersaglio che si muove in modo regolare.',
  steps: [
    'Appoggia il dito sul bersaglio giallo: poi si muove.',
    'Scorri insieme. Perso? Riappoggia semplicemente il dito.',
    'Conta il tempo in cui il dito è sul bersaglio.',
  ],
  why:
    'Segui con gli occhi un bersaglio in movimento e guidi insieme la mano – vista e movimento della mano devono andare d’accordo. Viene misurato solo dove si trova il tuo dito; dove guardi, l’app non può rilevarlo. Non è dimostrato che l’allenamento si trasferisca alla vita quotidiana, allo sport o al traffico.',
  goodFor: ['Occhio e mano', 'Seguire', 'Guida calma'],
  captions: {
    wait: 'Tra poco il bersaglio si muove',
    touch: 'Appoggia il dito sul bersaglio',
    follow: 'Scorri senza staccare il dito',
    lost: 'Perso? Riappoggia il dito',
    count: 'Conta il tempo sul bersaglio',
  },
  metrics: {
    on_pct: 'Tempo sul bersaglio',
    on_s: 'Tempo sul bersaglio (secondi)',
    mean_dist: 'Scostamento medio',
    best_run: 'Inseguimento più lungo di fila',
    losses: 'Contatti persi',
    touch_pct: 'Tempo con il dito sullo schermo',
  },
  metricHints: {
    on_pct:
      'Quota del tempo in cui il tuo dito era sul bersaglio – rispetto al tempo totale, compreso quello in cui non avevi il dito appoggiato. Il valore dipende molto dalle impostazioni (percorso, velocità, dimensione).',
    on_s: 'Lo stesso tempo in secondi.',
    mean_dist: 'Distanza media tra il dito e il centro del bersaglio, finché il dito era sullo schermo. Valori più piccoli significano: eri più vicino al centro.',
    best_run: 'Il periodo più lungo in cui sei rimasto sul bersaglio senza interruzione.',
    losses: 'Quante volte hai perso il bersaglio dopo averlo già raggiunto (dito staccato o troppo lontano).',
    touch_pct: 'Quota del tempo in cui il tuo dito ha toccato lo schermo – non importa dove.',
  },
  tips: {
    touch: 'Il tuo dito è rimasto sullo schermo solo per poco. Appoggialo subito all’inizio sul bersaglio e resta con lui – se lo perdi, riappoggia semplicemente il dito.',
    harder: 'Sei rimasto sul bersaglio quasi sempre. Se vuoi, rendi più difficile una sola impostazione, per esempio una velocità un po’ maggiore o un bersaglio più piccolo.',
    easier: 'Il bersaglio era spesso fuori portata. Rendilo più facile – velocità minore, bersaglio più grande o più margine – e cambia sempre una sola impostazione.',
    lost: 'Hai perso il bersaglio più volte. Non rincorrerlo in fretta: torna con calma sul percorso e riprendilo con precisione.',
    compare: 'Confronta questo giro solo con giri che avevano le stesse impostazioni – su questo dispositivo e con la stessa mano.',
  },
  feedback: {
    live: '{s} s · {p} %',
    start: 'Appoggia il dito sul bersaglio',
    cm: 'cm',
    moreTitle: 'Altri valori',
    moreNote: 'Viene misurato solo il tuo dito, non il tuo sguardo. Confronta i valori solo con i tuoi su questo dispositivo e con le stesse impostazioni.',
  },
  progression: [
    'Più facile: ellisse, velocità bassa (da 3 a 6 cm/s), bersaglio grande (da 4 a 6 cm), più margine (1 cm), percorso visibile.',
    'Più difficile: otto orizzontale o curva intrecciata, velocità più alta (da 12 a 25 cm/s), bersaglio più piccolo (da 1,5 a 2 cm), poco margine, percorso nascosto.',
    'Cambia mano e confronta i risultati solo con giri della stessa mano.',
    'La nostra proposta (non è un’indicazione della ricerca): prima aumenta la quota sul bersaglio a pari velocità, poi diventa un po’ più veloce. Cambia sempre una sola impostazione alla volta.',
  ],
  cautions: [
    'Calibra lo schermo una volta (“Calibra lo schermo”), così dimensioni e velocità in centimetri sono corrette. Sugli schermi piccoli il percorso diventa più piccolo, la velocità resta uguale.',
    'Siediti a circa 50–60 cm dallo schermo, in modo da raggiungere comodamente tutto il percorso. Lo schermo dovrebbe essere pulito, così il dito scivola. Non appoggiare la mano sul bordo.',
    'Il tuo dito sta sul bersaglio e lo copre in parte. L’anello intorno al bersaglio mostra quanto devi essere vicino; se il dito è fuori, una linea tratteggiata porta al bersaglio.',
    'Viene misurato solo il tuo dito. Se segui il bersaglio anche con gli occhi, l’app non può misurarlo – dipende da te.',
    'Se a lungo andare seguire diventa faticoso o spalla e braccio si stancano, fai una pausa. In caso di vertigini o disturbi agli occhi, interrompi.',
    'Per i confronti: sempre la stessa mano, la stessa distanza, lo stesso dispositivo. I risultati con impostazioni diverse non vengono confrontati tra loro.',
  ],
  params: {
    durationS: {
      label: 'Durata',
      hint: 'Per quanto tempo il bersaglio si muove e il tempo viene contato. Prima hai un momento per appoggiare il dito.',
    },
    path: {
      label: 'Percorso',
      hint: '“Ellisse” è regolare e ben prevedibile. “Otto orizzontale” e “Curva intrecciata” hanno curve variabili e sono più difficili.',
      options: { ellipse: 'Ellisse', eight: 'Otto orizzontale', lissajous: 'Curva intrecciata' },
    },
    speedCmS: {
      label: 'Velocità (cm/s)',
      hint: 'Quanto in fretta si muove il bersaglio, in centimetri al secondo – in modo regolare, qualunque sia il percorso.',
      short: '{v} cm/s',
    },
    diameterCm: {
      label: 'Dimensione del bersaglio',
      hint: 'Diametro del bersaglio in centimetri. I bersagli più piccoli richiedono una guida più precisa.',
      short: '{v} cm',
    },
    toleranceCm: {
      label: 'Margine intorno al bersaglio',
      hint: 'Questa fascia intorno al bersaglio conta ancora come “sul bersaglio” (l’anello tratteggiato), così il dito non deve essere preciso al millimetro.',
    },
    showTrail: {
      label: 'Mostra il percorso',
      hint: 'Mostra il percorso come linea sottile. Senza percorso devi prevedere dove va il bersaglio.',
      options: { yes: 'Sì', no: 'No' },
    },
  },
};
