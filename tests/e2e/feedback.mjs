// Ende-zu-Ende-Test der Rückmeldungen gegen einen laufenden Worker (npx wrangler dev --local --port 8791)
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BASE ?? 'http://localhost:8791/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1180, height: 820 } });
const p = await ctx.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(String(e)));
const ok = (c, m) => { if (!c) { console.error('FAIL', m); process.exitCode = 1; } else console.log('ok  ', m); };

// Kunde sieht keinen Bewerten-Knopf
await p.goto(base + '#/uebung/blitzreaktion', { waitUntil: 'networkidle' });
await p.evaluate(() => localStorage.setItem('blickfit:v1', JSON.stringify({ v: 1, exercises: {}, days: [], settings: { sound: false, lang: 'de', role: 'kunde', customerIds: ['blitzreaktion', 'zielfang', 'suchbild'], fullscreen: false } })));
await p.reload({ waitUntil: 'networkidle' });
ok((await p.locator('text=Bewerten').count()) === 0, 'Kunde: kein Bewerten-Knopf');

// Trainer bewertet
await p.evaluate(() => localStorage.setItem('blickfit:v1', JSON.stringify({ v: 1, exercises: {}, days: [], settings: { sound: false, lang: 'de', role: 'optiker', customerIds: ['blitzreaktion', 'zielfang', 'suchbild'], fullscreen: false } })));
await p.reload({ waitUntil: 'networkidle' });
await p.click('button:has-text("Bewerten")');
const send = p.locator('.fb-actions .btn-primary');
ok(await send.isDisabled(), 'Senden gesperrt ohne Eingabe');
await p.click('button[aria-label="4 von 5 Sternen"]');
await p.fill('#fb-trainer', 'CA');
await p.fill('#fb-comment', 'Zu schnell am Anfang.\nZweite Zeile.');
await send.click();
await p.waitForSelector('.fb-thanks');
ok(true, 'Bewertung gesendet');
await p.click('.role-card >> text=Schließen');

// allgemeine Rückmeldung auf der Trainer-Seite (nur Kommentar)
await p.goto(base + '#/optiker', { waitUntil: 'networkidle' });
await p.click('button:has-text("Bewerten")');
await p.fill('#fb-comment', 'Die Startseite ist übersichtlich.');
await p.locator('.fb-actions .btn-primary').click();
await p.waitForSelector('.fb-thanks');
await p.click('.role-card >> text=Schließen');

// Entwickler-Bereich
await p.goto(base + '#/entwickler', { waitUntil: 'networkidle' });
await p.fill('#dev-pw', '000');
await p.click('button:has-text("Anmelden")');
await p.waitForSelector('.fb-error');
ok((await p.textContent('.fb-error')).includes('Falsches Passwort'), 'falsches Passwort abgewiesen');
await p.fill('#dev-pw', '726');
await p.click('button:has-text("Anmelden")');
await p.waitForSelector('.dev-table');
const tableText = await p.textContent('.dev-table');
ok(tableText.includes('Blitzreaktion') && tableText.includes('Allgemein'), 'Tabelle zeigt Übung und Allgemein');
ok(/4,0/.test(tableText), 'Ø 4,0 in der Tabelle');
await p.screenshot({ path: process.env.SHOT ?? '/tmp/dev.png' });

// Export + Löschen
const [dl] = await Promise.all([p.waitForEvent('download'), p.click('button:has-text("Kommentare exportieren")')]);
const file = '/tmp/export-test.txt';
await dl.saveAs(file);
const txt = fs.readFileSync(file, 'utf8');
console.log('--- Exportdatei ---\n' + txt + '--- Ende ---');
ok(txt.includes('Trainer CA'), 'Export nennt das Kürzel');
ok(/Kennung: blitzreaktion/.test(txt) && /Übung 101/.test(txt) && txt.includes('Zu schnell am Anfang.\n  Zweite Zeile.'), 'Export enthält Nummer, Kennung, Kritik');
await p.waitForSelector('.dev-exported');
await p.click('button:has-text("Nein, behalten")');
ok((await p.locator('.dev-exported').count()) === 0, 'Nein, behalten schließt die Frage');
await Promise.all([p.waitForEvent('download'), p.click('button:has-text("Kommentare exportieren")')]);
await p.click('button:has-text("Ja, Kommentare löschen")');
await p.waitForFunction(() => document.querySelector('.lead')?.textContent?.includes('0 Kommentare') || document.querySelector('.lead')?.textContent?.includes('0 Kommentar'));
ok(await p.locator('button:has-text("Kommentare exportieren")').isDisabled(), 'nach dem Löschen nichts mehr zu exportieren');
const after = await p.textContent('.dev-table');
ok(/4,0/.test(after), 'Sterne bleiben nach dem Löschen erhalten');

// Reload: Passwort bleibt in der Sitzung
await p.reload({ waitUntil: 'networkidle' });
await p.waitForSelector('.dev-table');
ok(true, 'Sitzung bleibt nach Reload angemeldet');
ok(errors.length === 0, 'keine Seitenfehler ' + errors.join('|'));
await browser.close();
