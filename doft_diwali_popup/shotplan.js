const { chromium } = require('playwright');
(async () => {
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2400,height:1650},deviceScaleFactor:1});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/plan.html');
  await p.waitForFunction('window.__done===true',{timeout:30000}).catch(()=>errs.push('timeout'));
  await p.waitForTimeout(200);
  await p.locator('#sheet').screenshot({path:'view_kiosk_plan.png'});
  await b.close(); console.log('plan', errs.length?('ERR: '+errs.join(' | ')):'ok');
})();
