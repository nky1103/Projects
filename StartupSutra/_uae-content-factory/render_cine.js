const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path=require('path'),fs=require('fs');const FPS=30;
(async()=>{
  const cfg=require(path.resolve(process.argv[2]));const key=process.argv[3];
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const pg=await b.newPage({viewport:{width:1080,height:1920}});
  await pg.addInitScript(c=>{window.CONFIG=c;},cfg);
  await pg.goto('file://'+path.resolve(__dirname,'cine_reel_template.html'));
  await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(300);
  const dir=path.resolve(__dirname,'cframes_'+key);fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
  const st=pg.locator('#stage');const total=Math.round(FPS*cfg.dur),t0=Date.now();
  for(let f=0;f<total;f++){await pg.evaluate(t=>window.seek(t),f/FPS);await st.screenshot({path:path.join(dir,`f${String(f).padStart(5,'0')}.jpg`),type:'jpeg',quality:92});}
  console.log(`${key}: ${total} frames ${((Date.now()-t0)/1000).toFixed(0)}s`);await b.close();
})();
