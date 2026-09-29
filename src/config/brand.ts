/**
 * Branding & Einstellungen für den Optiker.
 *
 * Hier Namen, Farben, Logo und Kontakt-Link anpassen – danach neu bauen
 * (`npm run build`). Alle Farben werden als CSS-Variablen übernommen.
 */
export interface BrandConfig {
  /** Name der Trainings-Plattform */
  appName: string;
  /** Name des Optikers (erscheint in Kopf- und Fußzeile). Leer = ausblenden. */
  opticianName: string;
  /** Optional: Pfad/URL zu einem Logo (SVG/PNG), z. B. "./logo.svg" */
  logoUrl: string;
  /** Link auf die Homepage des Optikers (Logo-Klick). Leer = kein Link. */
  homepageUrl: string;
  /** Termin-/Kontakt-Link für den Hinweis "Augen prüfen lassen". Leer = ausblenden. */
  appointmentUrl: string;
  /** Link zur Datenschutzerklärung der Homepage. Leer = ausblenden. */
  privacyUrl: string;
  /** Link zum Impressum der Homepage. Leer = ausblenden. */
  imprintUrl: string;
  colors: {
    /** Hauptfarbe für Buttons/Links mit weißer Schrift (Kontrast ≥ 4,5 : 1) */
    primary: string;
    /** Dunklere Variante für Hover/Text auf hellem Grund */
    primaryDark: string;
    /** Helle Tönung für Flächen */
    primarySoft: string;
    /** Original-Markenfarbe (Logo) – für Flächen, Symbole, Fortschrittsbalken */
    brand: string;
    /** Zweite Markenfarbe (Akzente) */
    accent: string;
    /** Helle Tönung der Akzentfarbe */
    accentSoft: string;
  };
  /** Präfix für den lokalen Speicher (bei mehreren Installationen auf einer Domain ändern) */
  storageKey: string;
}

export const brand: BrandConfig = {
  appName: 'Blickfit',
  opticianName: 'Bio-Optik Flaim',
  logoUrl: '',
  homepageUrl: 'https://www.optikflaim.com/',
  appointmentUrl: 'https://www.optikflaim.com/',
  privacyUrl: 'https://www.optikflaim.com/pages/privacy-policy',
  imprintUrl: '',
  // Farben von optikflaim.com: Grün #79AC2B (Logo/Buttons) und Holz-Braun #8C6D4A.
  // Für Buttons mit weißer Schrift wird ein tieferes Flaim-Grün verwendet (#5A7F20, Kontrast 4,7 : 1),
  // weil Weiß auf #79AC2B nur 2,7 : 1 erreicht (zu wenig für gute Lesbarkeit).
  colors: {
    primary: '#5A7F20',
    primaryDark: '#49671A',
    primarySoft: '#EEF5E3',
    brand: '#79AC2B',
    accent: '#8C6D4A',
    accentSoft: '#F4EEE6',
  },
  storageKey: 'blickfit',
};
