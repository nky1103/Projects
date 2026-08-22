const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const FPS = 30;
// timing shared by all: 6 scenes + outro, ~22s
const T = [
  [0.0, 3.4], [3.4, 6.6], [6.6, 9.8], [9.8, 13.2], [13.2, 16.2], [16.2, 19.4]
];
const OUTRO = { t0: 19.4 };
const DUR = 22.0;

const PILLARS = {
  amber:  { acc:'#f59e0b', deep:'#b45309', glow:'245,158,11' },
  red:    { acc:'#ef4444', deep:'#b91c1c', glow:'239,68,68' },
  blue:   { acc:'#3b82f6', deep:'#1d4ed8', glow:'59,130,246' },
  violet: { acc:'#8b5cf6', deep:'#6d28d9', glow:'139,92,246' },
  teal:   { acc:'#14b8a6', deep:'#0f766e', glow:'20,184,166' },
  rose:   { acc:'#f43f5e', deep:'#be123c', glow:'244,63,94' },
  green:  { acc:'#22c55e', deep:'#15803d', glow:'34,197,94' },
};

const EP = {
  sun: { color:'amber', label:'Case Study', lines:[
    "Everyone sees a shop that sells <span class='accent'>glasses.</span>",
    "Lenskart didn't want the shop. It wanted <span class='accent'>everything behind it.</span>",
    "The lens. The frame. The factory. The app. <span class='accent'>All theirs.</span>",
    "A seller earns once. An <span class='accent'>owner earns at every step.</span>",
    "₹300 of plastic sells for ₹3,000. <span class='accent'>That gap is ownership.</span>",
    "Don't rush to sell. <span class='accent'>Ask what you can own.</span>",
  ], cta:"Send this to someone who's only selling." },

  mon: { color:'red', label:'Startup Failure', lines:[
    "Byju's was once worth <span class='accent'>$22 billion.</span>",
    "It looked like India's <span class='accent'>biggest asset.</span>",
    "But it grew by buying companies with <span class='accent'>borrowed money.</span>",
    "An asset puts money in. A <span class='accent'>liability takes it out.</span>",
    "Byju's took out <span class='accent'>more than it ever made.</span>",
    "Growth that eats cash isn't growth. <span class='accent'>It's a leak.</span>",
  ], cta:"Send this to a founder chasing valuation." },

  tue: { color:'blue', label:'Marketing Breakdown', lines:[
    "Sugar sells lipstick. <span class='accent'>That's what people think.</span>",
    "Vineeta Singh wasn't <span class='accent'>selling colour.</span>",
    "She sold women a brand that <span class='accent'>took them seriously.</span>",
    "A product is copied in a week. A <span class='accent'>brand isn't.</span>",
    "Same lipstick, higher price — because people <span class='accent'>trust the name.</span>",
    "Don't sell the thing. <span class='accent'>Sell why people believe in it.</span>",
  ], cta:"Send this to someone competing on price." },

  wed: { color:'violet', label:'Seed Signal', lines:[
    "Two teenagers started a <span class='accent'>grocery app.</span>",
    "Everyone asked: who needs milk in <span class='accent'>10 minutes?</span>",
    "They weren't selling groceries. They were <span class='accent'>selling time.</span>",
    "The best assets look small <span class='accent'>before everyone sees them.</span>",
    "Today Zepto is worth <span class='accent'>billions.</span>",
    "Spot the value <span class='accent'>before the crowd prices it.</span>",
  ], cta:"Send this to someone who backs early." },

  thu: { color:'teal', label:'Growth Capital', lines:[
    "An app that pays you to pay bills. <span class='accent'>People laughed.</span>",
    "CRED didn't want everyone. It wanted the <span class='accent'>top 1%.</span>",
    "India's most creditworthy users, <span class='accent'>in one place.</span>",
    "Sometimes the asset isn't revenue. It's <span class='accent'>who's watching.</span>",
    "That's why investors poured in <span class='accent'>crores.</span>",
    "Own the right audience. <span class='accent'>The money follows.</span>",
  ], cta:"Send this to someone building an audience." },

  fri: { color:'rose', label:'Exit Stories', lines:[
    "Sachin and Binny Bansal shared a surname, <span class='accent'>not a family.</span>",
    "They could have taken <span class='accent'>safe jobs.</span>",
    "Instead they built Flipkart — and <span class='accent'>owned it.</span>",
    "A worker earns a salary. An <span class='accent'>owner earns an exit.</span>",
    "Walmart bought Flipkart for <span class='accent'>$16 billion.</span>",
    "Build something you own. Not just <span class='accent'>something you're paid for.</span>",
  ], cta:"Send this to someone stuck in a salary." },

  sat: { color:'green', label:'Founder Framework', lines:[
    "She started at 50, when most people <span class='accent'>slow down.</span>",
    "Falguni Nayar left a top <span class='accent'>banking job.</span>",
    "She built Nykaa and <span class='accent'>kept control of it.</span>",
    "Most founders sell stakes till little is left. <span class='accent'>She didn't.</span>",
    "At the IPO, she became India's <span class='accent'>richest self-made woman.</span>",
    "It's never too late to <span class='accent'>own your work.</span>",
  ], cta:"Send this to someone who thinks they're too late." },
};

const sizeFor = html => {
  const txt = html.replace(/<[^>]+>/g,'');
  if (txt.length > 60) return 'xs';
  if (txt.length > 42) return 'sm';
  return '';
};

function buildConfig(key){
  const e = EP[key];
  const pil = PILLARS[e.color];
  const scenes = e.lines.map((html,i)=>({
    t0:T[i][0], t1:T[i][1], html, size:sizeFor(html)
  }));
  return { ...pil, label:e.label, scenes, outro:OUTRO, dur:DUR, cta:e.cta };
}

(async () => {
  const only = process.argv.slice(2);
  const keys = only.length ? only : Object.keys(EP);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const key of keys){
    const cfg = buildConfig(key);
    const page = await browser.newPage({ viewport:{ width:1080, height:1920 } });
    await page.addInitScript(c => { window.CONFIG = c; }, cfg);
    await page.goto('file://' + path.resolve(__dirname, 'reel_template.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const outDir = path.resolve(__dirname, 'frames_'+key);
    fs.rmSync(outDir, { recursive:true, force:true });
    fs.mkdirSync(outDir, { recursive:true });
    const stage = page.locator('#stage');
    const total = Math.round(FPS * DUR);
    const t0 = Date.now();
    for (let f=0; f<total; f++){
      await page.evaluate(t => window.seek(t), f/FPS);
      await stage.screenshot({ path: path.join(outDir, `f${String(f).padStart(5,'0')}.jpg`), type:'jpeg', quality:92 });
    }
    console.log(`${key}: ${total} frames in ${((Date.now()-t0)/1000).toFixed(0)}s`);
    await page.close();
  }
  await browser.close();
})();
