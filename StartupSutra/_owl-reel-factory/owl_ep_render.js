const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  for (const ep of process.argv.slice(2)) {
    const cfg = fs.readFileSync(`config_${ep}.js`,'utf8')+fs.readFileSync(`timeline_${ep}.js`,'utf8')+fs.readFileSync(`env_${ep}.js`,'utf8');
    const dir=`owlframes_${ep}`; fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir);
    const p = await b.newPage({ viewport:{width:1080,height:1920}, deviceScaleFactor:1 });
    await p.addInitScript(cfg);
    await p.goto('file://'+__dirname+'/owl_template.html', { waitUntil:'networkidle' });
    await p.evaluate(()=>document.fonts.ready);
    const dur = await p.evaluate(()=>window.TOTAL);
    const N = Math.round(dur*30);
    for (let f=0; f<N; f++){ await p.evaluate(t=>window.seek(t), f/30); await p.screenshot({ path:`${dir}/f${String(f).padStart(4,'0')}.png` }); }
    await p.close(); console.log(ep,'frames',N);
  }
  await b.close(); console.log('ALL DONE');
})();
