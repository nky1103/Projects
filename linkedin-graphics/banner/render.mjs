// Renders index.html to a LinkedIn profile banner PNG (1584x396, exported at 2x).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(dir, 'index.html'));
await page.waitForTimeout(400); // let fonts settle
await page.screenshot({ path: path.join(dir, 'linkedin-banner.png') });
await browser.close();
console.log('wrote linkedin-banner.png');
