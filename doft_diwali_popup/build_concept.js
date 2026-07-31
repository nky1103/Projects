const fs = require("fs");
const PX = 96;
const CREAM="#F6F1E6",WWHITE="#FCFAF5",SAND="#EADFCE",GOLD="#B8924A",GOLDL="#D9B86B",ROSE="#C39A98",ROSEL="#DcC0BC",
      TERRA="#9E5A45",INK="#35302B",DARK="#4A343A",DARK2="#3A2830",MUTED="#8C7F72",LINE="#E3D8C7",CREAMT="#F3ECE0",MUTEDD="#C9B4AC",
      MARBLE="#F0EBE2",MARBLE2="#E0D6C6",WOOD="#C7A56A",BRASS="#C9A24C",GLASS="#FBFAF7";
const SERIF="'Bitstream Charter','DejaVu Serif',serif";
const SANS ="'Liberation Sans','DejaVu Sans',sans-serif";
const W=13.33,H=7.5,M=0.62;
const px=v=>(v*PX).toFixed(1)+"px";
let out=[];

function T(x,y,w,h,fs,o={}){const{t,f=SANS,c=INK,b=false,i=false,al="left",va="top",cs=0,lh=1.15}=o;
  const j=va==="middle"?"center":va==="bottom"?"flex-end":"flex-start";
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};display:flex;align-items:${j};overflow:hidden"><div style="width:100%;font-family:${f};font-size:${(fs*PX/72).toFixed(1)}px;color:${c};font-weight:${b?700:400};font-style:${i?'italic':'normal'};text-align:${al};letter-spacing:${cs}px;line-height:${lh}">${t}</div></div>`;}
function box(x,y,w,h,st){return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};${st}"></div>`;}
function rrect(x,y,w,h,fill,{line,rad=8,shadow=false}={}){return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${fill};border-radius:${rad}px;${line?`border:${line}`:''};${shadow?'box-shadow:2px 3px 8px rgba(160,140,120,.35)':''};box-sizing:border-box"></div>`;}
function card(x,y,w,h,fill=WWHITE,shadow=true){return rrect(x,y,w,h,fill,{line:`1px solid ${LINE}`,shadow});}
function tag(x,y,w=1.5){const h=w*104/456;return `<img src="assets/final/promarcom_logo.png" style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};border-radius:3px">`;}
function ctitle(k,t){return T(M,0.44,W-2*M-1.9,0.3,11,{t:k.toUpperCase(),c:GOLD,b:true,cs:2})+T(M,0.74,W-2*M-1.9,0.72,31,{t,f:SERIF,b:true});}
function foot(n,onDark=false){const c=onDark?MUTEDD:MUTED;return T(M,H-0.46,7,0.3,8,{t:"ProMarcom&nbsp;&nbsp;×&nbsp;&nbsp;Doft Candles&nbsp;&nbsp;·&nbsp;&nbsp;Kiosk Concept",c,cs:1})+T(W-1.1,H-0.46,0.6,0.3,11,{t:String(n).padStart(2,"0"),f:SERIF,c,al:"right"});}
let SN=0;const nn=()=>++SN;
function slide(bg,inner){out.push(`<section class="slide" style="background:${bg}">${inner.join('')}</section>`);}

// ---------------- KIOSK RENDER (inline SVG, oblique 3/4 view) ----------------
// opt: {niche:'arch'|'grid'|'ledge', fascia:'curve'|'flat'|'canopy', counter:'fluted'|'marble'|'round'}
function candle(cx, cy, s, lit=true){
  return `<g transform="translate(${cx},${cy})">
    <rect x="${-7*s}" y="${-14*s}" width="${14*s}" height="${20*s}" rx="${3*s}" fill="url(#glass)" stroke="#E7DDCB" stroke-width="0.6"/>
    <rect x="${-7*s}" y="${-2*s}" width="${14*s}" height="${3*s}" fill="${GOLDL}" opacity="0.8"/>
    ${lit?`<ellipse cx="0" cy="${-18*s}" rx="${2.2*s}" ry="${4*s}" fill="url(#flame)"/><rect x="${-0.5*s}" y="${-15*s}" width="${1*s}" height="${2*s}" fill="#6b4a2a"/>`:''}
  </g>`;
}
function kioskSVG(opt){
  const VB_W=860, VB_H=660;
  // oblique depth vector
  const d=120, ddx=d*0.55, ddy=-d*0.34;
  const P=(x,y)=>`${x.toFixed(1)},${y.toFixed(1)}`;
  // cabinet (display wall) front-face geometry
  const cabX=250, cabY=120, cabW=300, cabH=360;
  function boxFaces(x,y,w,h, cf, ct, cr){
    const top=`<polygon points="${P(x,y)} ${P(x+w,y)} ${P(x+w+ddx,y+ddy)} ${P(x+ddx,y+ddy)}" fill="${ct}"/>`;
    const right=`<polygon points="${P(x+w,y)} ${P(x+w,y+h)} ${P(x+w+ddx,y+h+ddy)} ${P(x+w+ddx,y+ddy)}" fill="${cr}"/>`;
    const front=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cf}"/>`;
    return top+right+front;
  }
  // ---- back cabinet body ----
  let s="";
  // soft floor shadow
  s+=`<ellipse cx="430" cy="600" rx="300" ry="46" fill="#000" opacity="0.10"/>`;
  // canopy option: roof slab above
  if(opt.fascia==='canopy'){
    s+=boxFaces(cabX-40,cabY-70,cabW+80,26, DARK,DARK2,DARK2);
  }
  // cabinet
  s+=boxFaces(cabX,cabY,cabW,cabH, "url(#cabF)", SAND, "#DCCDBA");
  // backlit inner glow panel
  s+=`<rect x="${cabX+22}" y="${cabY+58}" width="${cabW-44}" height="${cabH-150}" fill="url(#glow)" rx="6"/>`;
  // ---- display: niches / shelves ----
  const dispX=cabX+30, dispY=cabY+66, dispW=cabW-60, dispH=cabH-168;
  if(opt.niche==='arch'){
    const nW=(dispW-2*14)/3;
    for(let i=0;i<3;i++){const nx=dispX+i*(nW+14);
      s+=`<path d="M${nx},${dispY+dispH} L${nx},${dispY+nW/2} A${nW/2},${nW/2} 0 0 1 ${nx+nW},${dispY+nW/2} L${nx+nW},${dispY+dispH} Z" fill="#FBF6EC" stroke="${BRASS}" stroke-width="1.4"/>`;
      // two shelves of candles
      s+=`<rect x="${nx+4}" y="${dispY+dispH*0.55}" width="${nW-8}" height="2.5" fill="${BRASS}"/>`;
      s+=candle(nx+nW*0.35,dispY+dispH*0.55, .9)+candle(nx+nW*0.68,dispY+dispH*0.55,.9);
      s+=candle(nx+nW*0.5,dispY+dispH-3,1.0);
    }
  } else if(opt.niche==='grid'){
    const cols=3, rows=3, gx=10, gy=10;
    const cwd=(dispW-(cols-1)*gx)/cols, chd=(dispH-(rows-1)*gy)/rows;
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const nx=dispX+c*(cwd+gx), ny=dispY+r*(chd+gy);
      s+=`<rect x="${nx}" y="${ny}" width="${cwd}" height="${chd}" fill="#FBF6EC" stroke="${BRASS}" stroke-width="1.2" rx="2"/>`;
      s+=candle(nx+cwd/2, ny+chd-4, chd/34);
    }
  } else { // ledge (floating shelves)
    for(let i=0;i<4;i++){const ly=dispY+18+i*((dispH-18)/4);
      s+=`<rect x="${dispX}" y="${ly}" width="${dispW}" height="3" fill="${BRASS}"/>`;
      const n=4; for(let k=0;k<n;k++) s+=candle(dispX+ (k+0.5)*dispW/n, ly-1, .85);
    }
  }
  // ---- fascia / header sign ----
  if(opt.fascia==='curve'){
    s+=`<path d="M${cabX},${cabY+56} L${cabX},${cabY+18} Q${cabX+cabW/2},${cabY-14} ${cabX+cabW},${cabY+18} L${cabX+cabW},${cabY+56} Z" fill="${DARK}"/>`;
    s+=`<polygon points="${P(cabX,cabY+18)} ${P(cabX+cabW,cabY+18)} ${P(cabX+cabW+ddx,cabY+18+ddy)} ${P(cabX+ddx,cabY+18+ddy)}" fill="${DARK2}"/>`;
  } else if(opt.fascia==='canopy'){
    s+=`<rect x="${cabX}" y="${cabY+20}" width="${cabW}" height="36" fill="${DARK}"/>`;
  } else {
    s+=`<rect x="${cabX}" y="${cabY+16}" width="${cabW}" height="40" fill="${DARK}"/>`;
    s+=`<polygon points="${P(cabX,cabY+16)} ${P(cabX+cabW,cabY+16)} ${P(cabX+cabW+ddx,cabY+16+ddy)} ${P(cabX+ddx,cabY+16+ddy)}" fill="${DARK2}"/>`;
  }
  const fy = opt.fascia==='curve'? cabY+40 : cabY+38;
  s+=`<text x="${cabX+cabW/2}" y="${fy}" text-anchor="middle" font-family="${SERIF}" font-size="26" letter-spacing="7" fill="${GOLDL}" font-weight="700">DOFT</text>`;
  // canopy posts + pendants
  if(opt.fascia==='canopy'){
    s+=`<rect x="${cabX-30}" y="${cabY-44}" width="6" height="46" fill="${DARK2}"/>`;
    s+=`<line x1="${cabX+cabW*0.3}" y1="${cabY-44}" x2="${cabX+cabW*0.3}" y2="${cabY-16}" stroke="${BRASS}" stroke-width="1.5"/><circle cx="${cabX+cabW*0.3}" cy="${cabY-12}" r="6" fill="url(#bulb)"/>`;
    s+=`<line x1="${cabX+cabW*0.7}" y1="${cabY-44}" x2="${cabX+cabW*0.7}" y2="${cabY-24}" stroke="${BRASS}" stroke-width="1.5"/><circle cx="${cabX+cabW*0.7}" cy="${cabY-20}" r="6" fill="url(#bulb)"/>`;
  }
  // ---- counter (in front, closer/lower) ----
  const cnX=210, cnY=430, cnW=340, cnH=120;
  s+=boxFaces(cnX,cnY,cnW,cnH, "url(#cnF)", "url(#marble)", "#D8CBB6");
  // marble top thickness edge
  s+=`<rect x="${cnX}" y="${cnY-6}" width="${cnW}" height="8" fill="${MARBLE2}"/>`;
  s+=`<polygon points="${P(cnX,cnY-6)} ${P(cnX+cnW,cnY-6)} ${P(cnX+cnW+ddx,cnY-6+ddy)} ${P(cnX+ddx,cnY-6+ddy)}" fill="${MARBLE}"/>`;
  // counter face detail
  if(opt.counter==='fluted'){
    for(let i=0;i<14;i++){const fx=cnX+12+i*((cnW-24)/13); s+=`<line x1="${fx}" y1="${cnY+22}" x2="${fx}" y2="${cnY+cnH-14}" stroke="${GOLDL}" stroke-width="1" opacity="0.5"/>`;}
  } else if(opt.counter==='marble'){
    s+=`<rect x="${cnX+16}" y="${cnY+cnH-26}" width="${cnW-32}" height="3" fill="${BRASS}"/>`;
  } else {
    s+=`<rect x="${cnX+cnW/2-60}" y="${cnY+18}" width="120" height="${cnH-34}" rx="10" fill="none" stroke="${BRASS}" stroke-width="1.2" opacity="0.6"/>`;
  }
  // wordmark on counter
  s+=`<text x="${cnX+cnW/2}" y="${cnY+cnH/2+6}" text-anchor="middle" font-family="${SERIF}" font-size="20" letter-spacing="6" fill="${GOLD}" font-weight="700">DOFT</text>`;
  // billing point (small screen) on counter top right
  s+=`<rect x="${cnX+cnW-46}" y="${cnY-24}" width="26" height="18" rx="2" fill="${DARK}"/><rect x="${cnX+cnW-44}" y="${cnY-22}" width="22" height="12" rx="1" fill="#6f8fa0"/>`;
  // a couple of hero candles on the counter top
  s+=candle(cnX+40,cnY-6,1.1)+candle(cnX+70,cnY-4,0.95);
  // ---- dimensions ----
  s+=`<g stroke="${TERRA}" stroke-width="1.2" fill="${TERRA}" font-family="${SANS}" font-size="13">
    <line x1="${cnX}" y1="620" x2="${cnX+cnW+ddx}" y2="620"/>
    <polygon points="${cnX},620 ${cnX+7},616 ${cnX+7},624"/><polygon points="${cnX+cnW+ddx},620 ${cnX+cnW+ddx-7},616 ${cnX+cnW+ddx-7},624"/>
    <text x="${cnX+(cnW+ddx)/2}" y="636" text-anchor="middle">8'-0"</text>
    <line x1="600" y1="${cabY}" x2="600" y2="${cnY+cnH}"/>
    <polygon points="600,${cabY} 596,${cabY+7} 604,${cabY+7}"/><polygon points="600,${cnY+cnH} 596,${cnY+cnH-7} 604,${cnY+cnH-7}"/>
    <text x="614" y="${(cabY+cnY+cnH)/2}" transform="rotate(90 614 ${(cabY+cnY+cnH)/2})" text-anchor="middle">≈ 8'-0"</text>
  </g>`;

  return `<svg viewBox="0 0 ${VB_W} ${VB_H}" style="width:100%;height:100%">
    <defs>
      <linearGradient id="cabF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF7EF"/><stop offset="1" stop-color="#EFE7D6"/></linearGradient>
      <linearGradient id="cnF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3EDE0"/><stop offset="1" stop-color="#E6DAC6"/></linearGradient>
      <linearGradient id="marble" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F0E8"/><stop offset="1" stop-color="#E4DACB"/></linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#FBEAC9"/><stop offset="1" stop-color="#F3E3C4" stop-opacity="0.2"/></radialGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#F2ECE0"/><stop offset="1" stop-color="#FBFAF7"/></linearGradient>
      <radialGradient id="flame" cx="0.5" cy="0.6" r="0.6"><stop offset="0" stop-color="#FFF3C4"/><stop offset="0.6" stop-color="#F2B24C"/><stop offset="1" stop-color="#E88A2E" stop-opacity="0.7"/></radialGradient>
      <radialGradient id="bulb" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF6D8"/><stop offset="1" stop-color="${GOLDL}"/></radialGradient>
    </defs>${s}</svg>`;
}
function kioskPanel(x,y,w,h,opt,bg=CREAM){
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${bg};border-radius:8px;border:1px solid ${LINE};overflow:hidden">${kioskSVG(opt)}</div>`;
}

const OPTS={
  A:{niche:'arch',fascia:'curve',counter:'fluted',name:'The Arch',tagline:'Arched alcoves, curved fascia, fluted counter',
     materials:['Curved MDF fascia, PU-lacquered ivory','3 arched display alcoves, warm backlit','Fluted front counter with brass reveals','Engineered-marble counter top']},
  B:{niche:'grid',fascia:'flat',counter:'marble',name:'The Gallery',tagline:'Open backlit shelf grid, marble counter',
     materials:['Flat fascia, brushed-gold DOFT lettering','3×3 open backlit cubby grid','Marble-top counter with brass inlay line','Ivory laminate body, brass edge profile']},
  C:{niche:'ledge',fascia:'canopy',counter:'round',name:'The Pavilion',tagline:'Canopy roof, floating ledges, pendant lights',
     materials:['Overhead canopy in deep mauve','Floating brass ledges, backlit wall','Pendant feature lights','Rounded island counter, brass trim']},
};

// ============================= SLIDES =============================
// 1 COVER
{let s=[];const pxi=7.4;
 s.push(box(0,0,W,H,`background:${DARK}`));
 s.push(`<div style="position:absolute;left:${px(pxi)};top:${px(0.6)};width:${px(W-pxi-0.4)};height:${px(H-1.2)};background:${CREAM};border-radius:10px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.35)">${kioskSVG(OPTS.A)}</div>`);
 s.push(T(M,1.35,6.4,0.3,11,{t:"KIOSK CONCEPT & DESIGN",c:GOLDL,b:true,cs:3}));
 s.push(T(M,1.8,6.6,1.9,46,{t:"Diwali Pop-Up Kiosk",f:SERIF,b:true,c:CREAMT,lh:1.05}));
 s.push(box(M+0.02,3.5,3.4,0.02,`background:${GOLD}`));
 s.push(T(M,3.7,6.4,0.5,15,{t:`<span style="color:${MUTEDD}">For </span><b style="color:${CREAMT}">Doft Candles</b><span style="color:${MUTEDD}">&nbsp;&nbsp;·&nbsp;&nbsp;8 ft × 8 ft premium kiosk</span>`}));
 s.push(T(M,4.35,6.2,0.9,13,{t:"Three design directions, material specification and an indicative costing sheet, prepared for your review.",c:MUTEDD}));
 s.push(T(M,6.05,1.4,0.5,9,{t:"Prepared by",i:true,c:MUTEDD,va:"middle"}));
 s.push(tag(M+1.15,6.0,1.7));
 slide(DARK,s);}

// 2 BRIEF & PARAMETERS
{let s=[];const n=nn();s.push(ctitle("The Brief","What we are designing"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,W-2*M,0.5,13,{t:"A compact, premium kiosk for Doft's Diwali pop-ups, built to read as a luxury home-fragrance destination and to work hard in a small footprint.",c:MUTED}));
 const items=[["8 ft × 8 ft","Compact island footprint (about 64 sq ft)"],["≈ 8 ft","Overall height, fascia included"],["Storage in kiosk","About 40 sq ft of secure stock within the unit"],["Backlit display","Warm-lit shelving for pearlescent candles"],["DOFT branding","Backlit fascia sign and counter wordmark"],["Billing point","Integrated counter station (hardware by ProMarcom)"]];
 const cw=(W-2*M-2*0.35)/3,ch=1.5,gy=0.32;
 items.forEach((it,i)=>{const cx=M+(i%3)*(cw+0.35),cy=2.2+Math.floor(i/3)*(ch+gy);s.push(card(cx,cy,cw,ch));
  s.push(T(cx+0.28,cy+0.22,cw-0.5,0.5,20,{t:it[0],f:SERIF,b:true,c:TERRA}));
  s.push(T(cx+0.28,cy+0.8,cw-0.5,0.6,11,{t:it[1],c:INK,va:"top"}));});
 s.push(foot(n));slide(CREAM,s);}

// 3 DESIGN LANGUAGE
{let s=[];const n=nn();s.push(ctitle("Design Language","A calm, premium, botanical feel"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,W-2*M,0.5,13,{t:"The design takes its cues from Doft's own world: soft ivory and rose, warm gold, and clean glass, with quiet Diwali warmth.",c:MUTED}));
 // palette swatches
 s.push(T(M,2.15,3,0.3,11,{t:"PALETTE",c:GOLD,b:true,cs:2}));
 const sw=[["Ivory",CREAM],["Dusty Rose",ROSE],["Warm Gold",GOLD],["Terracotta",TERRA],["Deep Mauve",DARK],["Charcoal",INK]];
 sw.forEach((c,i)=>{const x=M+i*0.92; s.push(rrect(x,2.5,0.8,0.8,c[1],{rad:6,line:`1px solid ${LINE}`})); s.push(T(x,3.34,0.8,0.24,8,{t:c[0],c:INK,al:"center"}));});
 // materials
 s.push(T(M,4.0,4,0.3,11,{t:"MATERIALS & FINISHES",c:GOLD,b:true,cs:2}));
 const mats=[["Engineered marble","Counter tops, in warm ivory"],["Brushed brass","Edge profiles, reveals, shelf fronts"],["PU-lacquered MDF","Body panels, smooth ivory finish"],["Warm LED","Backlit shelving and fascia glow"],["Fluted detail","On counter and side panels"],["Glass & botanicals","Product display, dried-flower styling"]];
 const cw=(W-2*M-1*0.35)/2,ch=0.6,gy=0.16;
 mats.forEach((m,i)=>{const cx=M+(i%2)*(cw+0.35),cy=4.4+Math.floor(i/2)*(ch+gy);s.push(card(cx,cy,cw,ch,WWHITE,false));
  s.push(`<div style="position:absolute;left:${px(cx+0.18)};top:${px(cy+ch/2-0.07)};width:${px(0.14)};height:${px(0.14)};background:${BRASS};border-radius:3px"></div>`);
  s.push(T(cx+0.45,cy,2.0,ch,11,{t:m[0],b:true,va:"middle"}));
  s.push(T(cx+2.4,cy,cw-2.55,ch,10,{t:m[1],c:MUTED,va:"middle"}));});
 s.push(foot(n));slide(CREAM,s);}

// 4-6 OPTIONS
["A","B","C"].forEach((k,idx)=>{const o=OPTS[k];let s=[];const n=nn();
 s.push(ctitle(`Concept ${k}`, `${o.name}`));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,7,0.35,13,{t:o.tagline,i:true,c:TERRA}));
 s.push(kioskPanel(M,1.95,7.1,4.7,o));
 // right column: description + materials
 const rx=8.0, rw=W-M-rx;
 s.push(T(rx,1.95,rw,0.3,11,{t:"THE IDEA",c:GOLD,b:true,cs:2}));
 const idea={A:"A warm, boutique feel. Three arched alcoves frame the candles like a fragrance gallery, with a curved header and a fluted counter that feels crafted and premium.",
             B:"Clean and modern. An open grid of backlit cubbies turns the whole back wall into a glowing display, paired with a marble counter and a brushed-gold wordmark.",
             C:"Light and airy. A canopy roof and pendant lights lift the kiosk in a busy mall, while floating brass ledges and a rounded island counter keep it open and inviting."}[k];
 s.push(T(rx,2.3,rw,1.5,12,{t:idea,c:INK,lh:1.25}));
 s.push(T(rx,3.75,rw,0.3,11,{t:"KEY MATERIALS",c:GOLD,b:true,cs:2}));
 o.materials.forEach((m,i)=>{const yy=4.1+i*0.5; s.push(card(rx,yy,rw,0.42,WWHITE,false));
  s.push(`<div style="position:absolute;left:${px(rx+0.16)};top:${px(yy+0.15)};width:${px(0.12)};height:${px(0.12)};background:${BRASS};border-radius:3px"></div>`);
  s.push(T(rx+0.4,yy,rw-0.55,0.42,10.5,{t:m,va:"middle"}));});
 s.push(T(M,6.75,7,0.3,9,{t:"Indicative concept render. Final finishes and dimensions confirmed at production drawing stage.",i:true,c:MUTED}));
 s.push(foot(n));slide(CREAM,s);});

// 7 PLAN & DIMENSIONS
{let s=[];const n=nn();s.push(ctitle("Layout","Plan & key dimensions"));s.push(tag(W-M-1.62,0.46));
 // plan drawing (top view) 8x8 grid
 const planX=M+0.2, planY=2.1, planS=3.9; // 8ft square
 s.push(`<div style="position:absolute;left:${px(planX)};top:${px(planY)};width:${px(planS)};height:${px(planS)}">
   <svg viewBox="0 0 400 400" style="width:100%;height:100%">
     <rect x="6" y="6" width="388" height="388" fill="#FBF7EF" stroke="${INK}" stroke-width="2"/>
     <!-- back display wall -->
     <rect x="6" y="6" width="388" height="60" fill="${SAND}" stroke="${BRASS}" stroke-width="1.5"/>
     <text x="200" y="42" text-anchor="middle" font-family="${SANS}" font-size="16" fill="${INK}">Backlit display wall + storage</text>
     <!-- counter -->
     <rect x="80" y="250" width="240" height="70" fill="${MARBLE2}" stroke="${BRASS}" stroke-width="1.5"/>
     <text x="200" y="292" text-anchor="middle" font-family="${SERIF}" font-size="15" fill="${INK}">Counter + billing</text>
     <!-- staff zone -->
     <text x="200" y="150" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${MUTED}">Staff &amp; stock zone</text>
     <text x="200" y="352" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${MUTED}">Customer side</text>
     <!-- dims -->
     <line x1="6" y1="384" x2="394" y2="384" stroke="${TERRA}" stroke-width="1.5"/>
     <text x="200" y="378" text-anchor="middle" font-family="${SANS}" font-size="14" fill="${TERRA}">8'-0"</text>
   </svg></div>`);
 s.push(T(planX,planY+planS+0.05,planS,0.3,10,{t:"Plan view — 8 ft × 8 ft island",i:true,c:MUTED,al:"center"}));
 // right notes
 const rx=5.1, rw=W-M-rx;
 s.push(T(rx,2.1,rw,0.3,11,{t:"HOW THE SPACE WORKS",c:GOLD,b:true,cs:2}));
 const notes=[["Display wall","Full-height backlit shelving across the back, with lockable stock storage built in behind and below."],["Counter & billing","A single counter runs the customer side, with the billing point and a small wrap/pack area."],["Staff zone","Two to three staff work comfortably between counter and wall; the rest of the team works the aisle."],["Circulation","Customers approach from the open mall side; the counter controls flow and cash."],["Services","Concealed electricals for lighting and billing; single power drop from mall supply."]];
 notes.forEach((nn2,i)=>{const yy=2.5+i*0.82; s.push(card(rx,yy,rw,0.72,WWHITE,false));
  s.push(T(rx+0.2,yy+0.08,rw-0.4,0.3,12,{t:nn2[0],f:SERIF,b:true,c:INK}));
  s.push(T(rx+0.2,yy+0.36,rw-0.4,0.36,10.5,{t:nn2[1],c:MUTED,va:"top"}));});
 s.push(foot(n));slide(CREAM,s);}

// 8 MATERIAL SCHEDULE (summary)
{let s=[];const n=nn();s.push(ctitle("Specification","Material & finish schedule"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,W-2*M,0.4,12,{t:"Summary below. A detailed, line-by-line specification with quantities is provided in the accompanying costing sheet (Excel).",c:MUTED}));
 const rows=[["Structure & body","MDF / ply frame, PU-lacquered ivory panels","Framework, cladding, base"],
   ["Counter","Engineered-marble top, fluted/laminate front, brass reveal","Billing counter + wrap area"],
   ["Display","Backlit shelves / arched alcoves, brass shelf fronts","Product merchandising"],
   ["Branding & signage","Backlit fascia sign, acrylic + brushed-gold lettering","Fascia + counter wordmark"],
   ["Lighting","Warm LED strips, drivers, pendants (Option C)","Shelf, fascia and ambient light"],
   ["Electrical","Concealed wiring, DBs, sockets for billing","Single mall power drop"],
   ["Flooring & finish","Raised deck / vinyl finish, edge trims","Kiosk floor"],
   ["Graphics & styling","Vinyl graphics, dried-flower styling props","Brand dressing"]];
 const tx=M,tw=W-2*M,ty=2.1,rh=0.52,c0=2.6,c1=4.4,c2=tw-c0-c1;
 s.push(box(tx,ty,c0,0.46,`background:${DARK}`));s.push(box(tx+c0,ty,c1,0.46,`background:${DARK}`));s.push(box(tx+c0+c1,ty,c2,0.46,`background:${DARK2}`));
 s.push(T(tx+0.15,ty,c0-0.2,0.46,10.5,{t:"ELEMENT",c:GOLDL,b:true,va:"middle",cs:1}));
 s.push(T(tx+c0+0.15,ty,c1-0.2,0.46,10.5,{t:"MATERIAL / FINISH",c:GOLDL,b:true,va:"middle",cs:1}));
 s.push(T(tx+c0+c1+0.15,ty,c2-0.2,0.46,10.5,{t:"USED FOR",c:GOLDL,b:true,va:"middle",cs:1}));
 rows.forEach((r,i)=>{const yy=ty+0.46+i*rh, bgc=i%2?WWHITE:SAND;
  s.push(box(tx,yy,tw,rh,`background:${bgc};border:0.5px solid ${LINE};box-sizing:border-box`));
  s.push(T(tx+0.15,yy,c0-0.2,rh,10.5,{t:r[0],f:SERIF,b:true,va:"middle"}));
  s.push(T(tx+c0+0.15,yy,c1-0.2,rh,10,{t:r[1],va:"middle"}));
  s.push(T(tx+c0+c1+0.15,yy,c2-0.2,rh,10,{t:r[2],c:MUTED,va:"middle"}));});
 s.push(foot(n));slide(CREAM,s);}

// 9 RECOMMENDATION / NEXT STEPS (dark)
{let s=[];const n=nn();
 s.push(T(M,0.6,10,0.3,11,{t:"NEXT STEPS",c:GOLDL,b:true,cs:3}));
 s.push(T(M,0.95,12,0.8,30,{t:"From concept to build",f:SERIF,b:true,c:CREAMT}));
 const steps=[["1","Pick a direction","You shortlist one concept (or a mix of elements) to take forward."],
   ["2","Production drawings","We prepare working drawings and confirm final dimensions and finishes."],
   ["3","Costing sign-off","We firm up the costing sheet against vendor quotes and lock the budget."],
   ["4","Prototype & roll-out","We build a first unit for sign-off, then produce for all cities."]];
 const cw=(W-2*M-3*0.3)/4,cy=2.1,ch=2.5;
 steps.forEach((it,i)=>{const cx=M+i*(cw+0.3);s.push(rrect(cx,cy,cw,ch,DARK2,{line:`1px solid #5C4048`}));
  s.push(`<div style="position:absolute;left:${px(cx+0.28)};top:${px(cy+0.3)};width:${px(0.55)};height:${px(0.55)};background:${GOLD};border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:${SERIF};font-weight:700;color:${DARK2};font-size:20px">${it[0]}</div>`);
  s.push(T(cx+0.28,cy+1.05,cw-0.56,0.5,15,{t:it[1],f:SERIF,b:true,c:CREAMT}));
  s.push(T(cx+0.28,cy+1.55,cw-0.56,0.9,10.5,{t:it[2],c:MUTEDD,va:"top"}));});
 s.push(box(M,5.15,W-2*M,0.02,`background:${GOLD}`));
 s.push(T(M,5.4,W-2*M,0.5,13,{t:"Our recommendation: Concept B (The Gallery) for its strong shelf presence and simple, cost-efficient build, with brass and marble cues carried across all cities.",c:CREAMT,i:true}));
 s.push(T(M,6.1,1.4,0.5,9,{t:"Prepared by",i:true,c:MUTEDD,va:"middle"}));s.push(tag(M+1.15,6.05,1.7));
 slide(DARK,s);}

const html=`<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${W}in ${H}in;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:#ccc}
.slide{position:relative;width:${W*PX}px;height:${H*PX}px;overflow:hidden;page-break-after:always;break-after:page}
</style></head><body>${out.join("")}</body></html>`;
fs.writeFileSync("concept.html",html);
console.log("wrote concept.html,",SN+1,"slides");
