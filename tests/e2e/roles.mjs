import { chromium } from 'playwright';
const base = 'http://localhost:4173/';
const out = '/tmp/claude-0/-home-user-visualtrainer/5dc0d85d-37c9-5d9e-a652-b93a4af9a804/scratchpad/roles';
import fs from 'node:fs'; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const errs = [];
const ctx = await b.newContext({ viewport: { width: 1180, height: 820 } });
const p = await ctx.newPage();
p.on('pageerror', (e) => errs.push('pageerror ' + e.message));
p.on('console', (m) => m.type() === 'error' && errs.push('console ' + m.text()));
await p.goto(base, { waitUntil: 'networkidle' });
await p.screenshot({ path: `${out}/1-gate.png` });
console.log('gate:', await p.locator('.role-gate').count());
// Kunde
await p.click('text=Ich bin Kunde');
await p.waitForTimeout(300);
console.log('kunde cards:', await p.locator('.ex-card').count(), 'daily:', await p.locator('.daily-item').count(), 'science link:', await p.locator('a[href="#/hintergrund"]').count(), 'copyright:', await p.locator('.footer-copy').count());
await p.screenshot({ path: `${out}/2-kunde.png`, fullPage: true });
// Kunde darf keine fremde Übung / keinen Katalog öffnen
await p.goto(base + '#/uebung/zielfang'); await p.waitForTimeout(300);
console.log('kunde -> zielfang blockiert:', await p.locator('.hero').count() > 0);
await p.goto(base + '#/katalog'); await p.waitForTimeout(300);
console.log('kunde -> katalog blockiert:', await p.locator('.catalog').count() === 0);
await p.goto(base + '#/'); 
// Trainer
await p.click('.role-btn'); await p.click('text=Ich bin Trainer'); await p.waitForTimeout(300);
console.log('optiker cards:', await p.locator('.ex-card').count());
await p.goto(base + '#/optiker'); await p.waitForTimeout(300);
await p.screenshot({ path: `${out}/3-optiker.png`, fullPage: true });
// drei wählen: abwählen + anderes
await p.locator('label.pick', { hasText: 'Blitzreaktion' }).click();
await p.locator('label.pick', { hasText: 'Zielfang' }).click();
console.log('gewählt:', await p.locator('.pick.is-on').count());
await p.goto(base + '#/katalog'); await p.waitForTimeout(800);
console.log('katalog items:', await p.locator('.catalog-item').count());
await p.screenshot({ path: `${out}/4-katalog.png` });
await p.goto(base + '#/katalog/405'); await p.waitForTimeout(1200);
console.log('entry h1:', await p.locator('h1').innerText(), 'md:', (await p.locator('.md').innerText()).length);
await p.screenshot({ path: `${out}/5-eintrag.png`, fullPage: true });
await p.goto(base + '#/katalog/101'); await p.waitForTimeout(1200);
console.log('101 play button:', await p.locator('text=Spielbare Blickfit-Übung öffnen').count());
// Kunde sieht nun geänderte Auswahl
await p.click('.role-btn'); await p.click('text=Ich bin Kunde'); await p.waitForTimeout(300);
console.log('kunde names:', (await p.locator('.daily-name').allInnerTexts()).join(' | '));
console.log('errors:', errs);
await b.close();
