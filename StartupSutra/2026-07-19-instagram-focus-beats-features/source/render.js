const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto('file://' + path.resolve(__dirname, 'carousel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const outDir = path.resolve(__dirname, 'out');
  require('fs').mkdirSync(outDir, { recursive: true });

  for (let i = 1; i <= 7; i++) {
    const el = page.locator(`#s${i}`);
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: path.join(outDir, `slide-${i}.png`) });
    console.log(`slide-${i}.png done`);
  }
  await browser.close();
})();
