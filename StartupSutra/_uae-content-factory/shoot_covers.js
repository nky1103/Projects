const { chromium } = require('/opt/node22/lib/node_modules/playwright');const path=require('path');
const covers=require('./covers_runway.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const k of Object.keys(covers)){const pg=await b.newPage({viewport:{width:1080,height:1920}});
await pg.addInitScript(c=>{window.CONFIG=c;},covers[k]);
await pg.goto('file://'+path.resolve('cover_template.html'));await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(250);
await pg.locator('#s').screenshot({path:`out/cover_${k}.png`});await pg.close();console.log('cover',k);}
await b.close();})();
