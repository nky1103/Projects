const { chromium } = require('playwright');
(async () => {
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1180,height:1600}});
  await p.goto('file://'+process.cwd()+'/cost_preview.html',{waitUntil:'networkidle'});
  await p.pdf({path:'Doft_Kiosk_Cost_Workbook_preview.pdf', width:'12in', height:'16in', printBackground:true});
  await p.screenshot({path:'cost_preview.png', fullPage:true});
  await b.close(); console.log('cost preview ok');
})();
