const { chromium } = require('playwright');
(async () => {
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
  const p=await b.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/concept_preview.html',{waitUntil:'networkidle'});
  await p.waitForFunction('window.__done===true',{timeout:30000}).catch(()=>errs.push('timeout'));
  await p.pdf({path:'Doft_Kiosk_Concept_Presentation.pdf', width:'13.333in', height:'7.5in', printBackground:true, pageRanges:'1-18'});
  await b.close(); console.log('deck pdf', errs.length?('ERR: '+errs.join(' | ')):'ok');
})();
