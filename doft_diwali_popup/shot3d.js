const { chromium } = require('playwright');
(async () => {
  const opt = process.argv[2] || 'B';
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport:{width:1600,height:1100}, deviceScaleFactor:1 });
  const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text());}); p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/threescene.html?opt='+opt);
  await p.waitForFunction('window.__done===true',{timeout:30000}).catch(()=>errs.push('render timeout'));
  await p.waitForTimeout(400);
  await p.locator('#c').screenshot({ path:'render3d_'+opt+'.png' });
  await b.close();
  console.log('done '+opt, errs.length?('ERRORS: '+errs.slice(0,3).join(' | ')):'clean');
})();
