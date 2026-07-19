const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FPS = 30, DUR = 36;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(__dirname, 'reel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const outDir = path.resolve(__dirname, 'frames');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const stage = page.locator('#stage');
  const total = FPS * DUR;
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.seek(t), f / FPS);
    await stage.screenshot({ path: path.join(outDir, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
    if (f % 150 === 0) console.log(`frame ${f}/${total} (${((Date.now()-t0)/1000).toFixed(0)}s)`);
  }
  console.log(`done: ${total} frames in ${((Date.now()-t0)/1000).toFixed(0)}s`);
  await browser.close();
})();
