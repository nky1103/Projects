const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const FPS = 30;
const T = [[0.0,3.4],[3.4,6.6],[6.6,9.8],[9.8,13.2],[13.2,16.2],[16.2,19.4]];
const OUTRO = { t0: 19.4 };
const DUR = 22.0;

const PILLARS = {
  amber:{acc:'#f59e0b',deep:'#b45309',glow:'245,158,11'},
  red:{acc:'#ef4444',deep:'#b91c1c',glow:'239,68,68'},
  blue:{acc:'#3b82f6',deep:'#1d4ed8',glow:'59,130,246'},
  violet:{acc:'#8b5cf6',deep:'#6d28d9',glow:'139,92,246'},
  teal:{acc:'#14b8a6',deep:'#0f766e',glow:'20,184,166'},
  rose:{acc:'#f43f5e',deep:'#be123c',glow:'244,63,94'},
  green:{acc:'#22c55e',deep:'#15803d',glow:'34,197,94'},
};

const EP = {
  sun: { color:'amber', label:'Case Study', lines:[
    "Millions build fantasy teams <span class='accent'>every night.</span>",
    "Dream11 doesn't play. It owns the <span class='accent'>ground they play on.</span>",
    "The users do the work. The platform <span class='accent'>keeps the value.</span>",
    "A player wins a match. An <span class='accent'>owner wins every match.</span>",
    "That's how it became a <span class='accent'>billion-dollar company.</span>",
    "Build the field. <span class='accent'>Don't just play on it.</span>",
  ], cta:"Send this to someone building a platform." },

  mon: { color:'red', label:'Startup Failure', lines:[
    "Dunzo could deliver anything <span class='accent'>in minutes.</span>",
    "Milk, medicine, a forgotten charger. <span class='accent'>Anything.</span>",
    "But every order was sold <span class='accent'>below what it cost.</span>",
    "Growth bought with discounts isn't growth. <span class='accent'>It's rented.</span>",
    "When the cash ran out, <span class='accent'>so did Dunzo.</span>",
    "If it can't survive without discounts, <span class='accent'>it was never a business.</span>",
  ], cta:"Send this to a founder burning cash for growth." },

  tue: { color:'blue', label:'Marketing Breakdown', lines:[
    "Mamaearth sells shampoo <span class='accent'>and lotions.</span>",
    "But that's not what <span class='accent'>parents were buying.</span>",
    "They were buying one word: <span class='accent'>safe.</span>",
    "A product competes on price. <span class='accent'>Trust doesn't.</span>",
    "That word built a <span class='accent'>₹10,000 crore brand.</span>",
    "Don't sell the bottle. <span class='accent'>Sell what people trust.</span>",
  ], cta:"Send this to someone competing on price." },

  wed: { color:'violet', label:'Seed Signal', lines:[
    "At 19, Ritesh Agarwal started a <span class='accent'>hotel company.</span>",
    "He didn't own a <span class='accent'>single hotel.</span>",
    "He owned the name on the door, and the <span class='accent'>standard behind it.</span>",
    "The rooms belonged to others. <span class='accent'>The brand was his.</span>",
    "That idea grew into a <span class='accent'>global chain.</span>",
    "Own the layer everyone needs. <span class='accent'>Not the bricks.</span>",
  ], cta:"Send this to someone who backs early." },

  thu: { color:'teal', label:'Growth Capital', lines:[
    "Every day, India <span class='accent'>taps to pay.</span>",
    "Most never ask who owns <span class='accent'>that moment.</span>",
    "PhonePe raised billions <span class='accent'>to own it.</span>",
    "Not your money — the place you <span class='accent'>reach for to move it.</span>",
    "Own where the money flows, and <span class='accent'>it flows through you.</span>",
    "Build the road. <span class='accent'>Let others take the trip.</span>",
  ], cta:"Send this to someone building infrastructure." },

  fri: { color:'rose', label:'Exit Stories', lines:[
    "Phanindra Sama missed a <span class='accent'>bus ticket home.</span>",
    "No app. No easy way to book. <span class='accent'>Just queues.</span>",
    "So he built redBus — one place to <span class='accent'>book any bus.</span>",
    "A worker earns a salary. An <span class='accent'>owner earns an exit.</span>",
    "He sold redBus for <span class='accent'>over ₹600 crore.</span>",
    "Build something you own. <span class='accent'>Not just a job you fill.</span>",
  ], cta:"Send this to someone stuck in a salary." },

  sat: { color:'green', label:'Founder Framework', lines:[
    "Narayana Murthy started Infosys with <span class='accent'>$250.</span>",
    "He could have kept <span class='accent'>all the equity.</span>",
    "Instead he gave shares to his <span class='accent'>employees.</span>",
    "Those shares made thousands of them <span class='accent'>millionaires.</span>",
    "He grew his wealth <span class='accent'>by sharing it.</span>",
    "Own less of more. <span class='accent'>Build with your team.</span>",
  ], cta:"Send this to someone building with a team." },
};

const sizeFor = html => {
  const txt = html.replace(/<[^>]+>/g,'');
  if (txt.length > 60) return 'xs';
  if (txt.length > 42) return 'sm';
  return '';
};
function buildConfig(key){
  const e=EP[key], pil=PILLARS[e.color];
  const scenes=e.lines.map((html,i)=>({t0:T[i][0],t1:T[i][1],html,size:sizeFor(html)}));
  return { ...pil, label:e.label, scenes, outro:OUTRO, dur:DUR, cta:e.cta };
}
(async () => {
  const only = process.argv.slice(2);
  const keys = only.length ? only : Object.keys(EP);
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const key of keys){
    const cfg=buildConfig(key);
    const page=await browser.newPage({viewport:{width:1080,height:1920}});
    await page.addInitScript(c=>{window.CONFIG=c;}, cfg);
    await page.goto('file://'+path.resolve(__dirname,'reel_template.html'));
    await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(250);
    const outDir=path.resolve(__dirname,'w7_frames_'+key);
    fs.rmSync(outDir,{recursive:true,force:true}); fs.mkdirSync(outDir,{recursive:true});
    const stage=page.locator('#stage'); const total=Math.round(FPS*DUR); const t0=Date.now();
    for(let f=0; f<total; f++){
      await page.evaluate(t=>window.seek(t), f/FPS);
      await stage.screenshot({path:path.join(outDir,`f${String(f).padStart(5,'0')}.jpg`),type:'jpeg',quality:92});
    }
    console.log(`${key}: ${total} frames in ${((Date.now()-t0)/1000).toFixed(0)}s`);
    await page.close();
  }
  await browser.close();
})();
