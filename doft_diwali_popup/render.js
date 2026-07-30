const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.goto('file://' + process.cwd() + '/deck.html', { waitUntil: 'networkidle' });
  await pg.waitForTimeout(500);
  // PDF
  await pg.pdf({ path: 'Doft_Diwali_PopUp_ProMarcom_Pitch.pdf', width: '13.33in', height: '7.5in', printBackground: true, preferCSSPageSize: true });
  // PNG per slide
  const slides = await pg.$$('.slide');
  for (let i=0;i<slides.length;i++){
    await slides[i].screenshot({ path: `slide-${String(i+1).padStart(2,'0')}.png` });
  }
  await b.close();
  console.log('rendered PDF +', slides.length, 'PNGs');
})();
