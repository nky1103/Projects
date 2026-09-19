const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path=require('path'),fs=require('fs');
const cars=require('./carousels_runway.js');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const dir=path.resolve(__dirname,'out');fs.mkdirSync(dir,{recursive:true});
  for(const key of Object.keys(cars)){
    const pg=await b.newPage({viewport:{width:1080,height:1350}});
    await pg.addInitScript(c=>{window.CONFIG=c;},cars[key]);
    await pg.goto('file://'+path.resolve(__dirname,'carousel_template.html'));
    await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(250);
    const n=await pg.evaluate(()=>window.NSLIDES);
    for(let i=0;i<n;i++){await pg.evaluate(k=>window.renderSlide(k),i);await pg.waitForTimeout(60);
      await pg.locator('#slide').screenshot({path:path.join(dir,`${key}_s${String(i).padStart(2,'0')}.png`)});}
    console.log(key,n,'slides');await pg.close();
  }
  await b.close();
})();
