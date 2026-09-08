const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
const FPS = 30;
(async () => {
  const cfg = require(path.resolve(process.argv[2]));
  const key = process.argv[3];
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport:{ width:1080, height:1920 } });
  await page.addInitScript(c => { window.CONFIG = c; }, cfg);
  await page.goto('file://' + path.resolve(__dirname, 'uae_reel_template.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const dir = path.resolve(__dirname, 'rframes_'+key);
  fs.rmSync(dir, { recursive:true, force:true }); fs.mkdirSync(dir, { recursive:true });
  const stage = page.locator('#stage');
  const total = Math.round(FPS*cfg.dur), t0=Date.now();
  for (let f=0; f<total; f++){
    await page.evaluate(t => window.seek(t), f/FPS);
    await stage.screenshot({ path: path.join(dir, `f${String(f).padStart(5,'0')}.jpg`), type:'jpeg', quality:92 });
  }
  console.log(`${key}: ${total} frames in ${((Date.now()-t0)/1000).toFixed(0)}s`);
  await browser.close();
})();
