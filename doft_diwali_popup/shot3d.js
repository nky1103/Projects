const { chromium } = require('playwright');
(async () => {
  const opt=process.argv[2]||'B', view=process.argv[3]||'hero';
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:2400,height:1650}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/threescene.html?opt='+opt+'&view='+view);
  await p.waitForFunction('window.__done===true',{timeout:90000}).catch(()=>errs.push('timeout'));
  await p.waitForTimeout(300);
  await p.locator('#c').screenshot({path:`r_${opt}_${view}.png`});
  await b.close(); console.log(`${opt}/${view}`, errs.length?('ERR: '+errs.join(' | ')):'ok');
})();
