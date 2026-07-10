// Renders a banner HTML file to a LinkedIn profile banner PNG (1584x396, exported at 2x).
// Usage: node render.mjs [input.html] [output.png]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const input = process.argv[2] ?? 'index.html';
const output = process.argv[3] ?? 'linkedin-banner.png';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.resolve(dir, input));
await page.waitForTimeout(400); // let fonts settle
await page.screenshot({ path: path.resolve(dir, output) });
await browser.close();
console.log('wrote ' + output);
