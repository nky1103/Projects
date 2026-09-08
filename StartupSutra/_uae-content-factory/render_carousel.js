const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');

(async () => {
  const cfgPath = path.resolve(process.argv[2]);   // config js
  const outPrefix = process.argv[3];               // e.g. day1  -> day1_s00.png
  const cfg = require(cfgPath);
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport:{ width:1080, height:1350 } });
  await page.addInitScript(c => { window.CONFIG = c; }, cfg);
  await page.goto('file://' + path.resolve(__dirname, 'carousel_template.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const n = await page.evaluate(() => window.NSLIDES);
  const dir = path.resolve(__dirname, 'out');
  fs.mkdirSync(dir, { recursive:true });
  for (let i=0;i<n;i++){
    await page.evaluate(k => window.renderSlide(k), i);
    await page.waitForTimeout(60);
    await page.locator('#slide').screenshot({ path: path.join(dir, `${outPrefix}_s${String(i).padStart(2,'0')}.png`) });
  }
  console.log(`${outPrefix}: ${n} slides`);
  await browser.close();
})();
