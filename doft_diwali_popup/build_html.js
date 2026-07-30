const fs = require("fs");
const PX = 96;
// palette
const CREAM="#F6F1E6",CARD="#FCFAF5",SAND="#EADFCE",ROSE="#C39A98",ROSEL="#D9BDB9",DARK="#4A343A",DARK2="#3A2830",
      GOLD="#B8924A",GOLDL="#D9B86B",TERRA="#9E5A45",INK="#35302B",MUTED="#8C7F72",LINE="#E3D8C7",CREAMT="#F3ECE0",MUTEDD="#C9B4AC";
const SERIF="'Bitstream Charter','DejaVu Serif',serif";
const SANS ="'Liberation Sans','DejaVu Sans',sans-serif";
const A = "assets/final/";
const W=13.33, H=7.5, M=0.62;
const inpx = v => v*PX;

let out=[];
function px(x){return (x*PX).toFixed(1)+"px";}
function T(x,y,w,h,fs,o={}){
  const {t,f=SANS,c=INK,b=false,i=false,al="left",va="top",cs=0,lh=1.15}=o;
  const just = va==="middle"?"center":va==="bottom"?"flex-end":"flex-start";
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};display:flex;align-items:${just};overflow:hidden">
  <div style="width:100%;font-family:${f};font-size:${(fs*PX/72).toFixed(1)}px;color:${c};font-weight:${b?700:400};font-style:${i?'italic':'normal'};text-align:${al};letter-spacing:${cs}px;line-height:${lh}">${t}</div></div>`;
}
function box(x,y,w,h,st){return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};${st}"></div>`;}
function rrect(x,y,w,h,fill,{line,rad=8,shadow=false}={}){
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${fill};border-radius:${rad}px;${line?`border:${line}`:''};${shadow?'box-shadow:2px 3px 8px rgba(160,140,120,.35)':''};box-sizing:border-box"></div>`;
}
function card(x,y,w,h,fill=CARD,shadow=true){return rrect(x,y,w,h,fill,{line:`1px solid ${LINE}`,shadow});}
function circ(x,y,d,fill,{num="",fc="#fff",fs=18,ring}={}){
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(d)};height:${px(d)};background:${fill};border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:${SERIF};font-weight:700;color:${fc};font-size:${(fs*PX/72).toFixed(1)}px;${ring?`border:${ring}`:''};box-sizing:border-box">${num}</div>`;
}
function img(path,x,y,w,h,{frame=false,shadow=false}={}){
  return `<div style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background-image:url('${A}${path}');background-size:cover;background-position:center;background-repeat:no-repeat;${frame?'outline:2px solid #fff;outline-offset:-2px':''};${shadow?'box-shadow:2px 2px 6px rgba(120,100,80,.4)':''}"></div>`;
}
function tag(x,y,w=1.5,onDark=false){const h=w*104/456;
  return `<img src="${A}promarcom_logo_t.png" style="position:absolute;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};${onDark?'':'filter:drop-shadow(1px 1px 1px rgba(120,100,80,.4))'}">`;
}
function doft(x,y,w,h,onDark=false){
  return rrect(x,y,w,h,onDark?'rgba(255,255,255,0.06)':CARD,{line:`1px dashed ${onDark?MUTEDD:ROSE}`,rad:6})
    + T(x,y+0.06,w,h-0.34,22,{t:"D&nbsp;&nbsp;O&nbsp;&nbsp;F&nbsp;&nbsp;T",f:SERIF,c:onDark?CREAMT:INK,al:"center",va:"middle",cs:2})
    + T(x,y+h-0.32,w,0.26,7.5,{t:"client logo — placeholder",i:true,c:onDark?MUTEDD:MUTED,al:"center",va:"middle",cs:1});
}
function ctitle(k,t){return T(M,0.44,W-2*M-1.9,0.3,11,{t:k.toUpperCase(),c:GOLD,b:true,cs:2})+T(M,0.74,W-2*M-1.9,0.72,31,{t,f:SERIF,b:true});}
function foot(n,onDark=false){const c=onDark?MUTEDD:MUTED;
  return T(M,H-0.46,5,0.3,8,{t:"ProMarcom&nbsp;&nbsp;×&nbsp;&nbsp;Doft Candles",c,cs:1})+T(W-1.1,H-0.46,0.6,0.3,11,{t:String(n).padStart(2,"0"),f:SERIF,c,al:"right"});
}
let SN=0; const nn=()=>++SN;
function slide(bg,inner){out.push(`<section class="slide" style="background:${bg}">${inner.join('')}</section>`);}

// ---------- SLIDE 1 COVER ----------
{let s=[];const pxi=8.7,TW=pxi-M-0.3;
 s.push(img("doft_hero_left.png",pxi,0,W-pxi,H));
 s.push(box(pxi-0.02,0,0.03,H,`background:#fff`));
 s.push(doft(M,0.6,2.5,0.95));
 s.push(T(M,2.15,TW,0.3,11,{t:"CONTRACTOR EXECUTION &amp; PARTNERSHIP PROPOSAL",c:GOLD,b:true,cs:2}));
 s.push(T(M,2.5,TW,0.95,50,{t:"Diwali Pop-Up",f:SERIF,b:true,c:INK}));
 s.push(T(M,3.45,TW,0.95,50,{t:"Retail Operations",f:SERIF,b:true,c:TERRA}));
 s.push(box(M+0.02,4.6,3.6,0.02,`background:${ROSE}`));
 s.push(T(M,4.76,TW,0.4,13,{t:`<span style="color:${MUTED}">For </span><b style="color:${INK}">Doft Candles</b><span style="color:${MUTED}">&nbsp;&nbsp;·&nbsp;&nbsp; Diwali Seasons 2026 · 2027 · 2028</span>`}));
 s.push(T(M,5.5,TW,0.4,15,{t:"“Experiencing the world through scent.”",f:SERIF,i:true,c:ROSE}));
 s.push(T(M,6.28,1.4,0.5,9,{t:"Prepared by",i:true,c:MUTED,va:"middle"}));
 s.push(tag(M+1.15,6.24,1.7));
 slide(CREAM,s);}

// ---------- SLIDE 2 ----------
{let s=[];const n=nn();s.push(ctitle("The Ask","Understanding your brief"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.52,W-2*M,0.4,12.5,{t:"Premium seasonal pop-up kiosks in leading malls — staffed and run end-to-end, as a long-term partner for Diwali 2026–28.",c:MUTED}));
 const items=[["3–5 wks","Operating window before Diwali, each season"],["~300 sq ft","Kiosk footprint, plus a ~90 sq ft stockroom"],["2–4","Pop-ups per region, across multiple cities"],["12 / kiosk","Full staffing team at every pop-up"],["1-day","Doft product &amp; sales training, 100% attendance"],["Doft supplies","Stock, furniture, POS/EDC, returnable uniforms"]];
 const cw=(W-2*M-2*0.35)/3,ch=1.5,gy=0.32;
 items.forEach((it,i)=>{const cx=M+(i%3)*(cw+0.35),cy=2.15+Math.floor(i/3)*(ch+gy);s.push(card(cx,cy,cw,ch));
  s.push(circ(cx+0.28,cy+0.36,0.1,ROSE));
  s.push(T(cx+0.45,cy+0.2,cw-0.6,0.5,24,{t:it[0],f:SERIF,b:true,c:TERRA}));
  s.push(T(cx+0.28,cy+0.78,cw-0.5,0.6,11,{t:it[1]}));});
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 3 (dark) ----------
{let s=[];const n=nn();
 s.push(T(M,0.56,10,0.3,11,{t:"WHY PROMARCOM",c:GOLDL,b:true,cs:2}));
 s.push(T(M,0.88,12,0.7,31,{t:"A partner built for premium mall retail",f:SERIF,b:true,c:CREAMT}));
 s.push(T(M,1.62,12,0.5,12.5,{t:"ProMarcom delivers below-the-line, retail and experiential marketing end to end — concept, design, fabrication, manpower, operations and reporting.",c:MUTEDD}));
 const pil=[["Mall & Retail Promotions","Multi-month mall activations and in-shop demonstrations for global brands."],["Premium Retail VM","Show-windows & VM for Burberry, Louis Vuitton, LG, Samsung across 90+ cities."],["Manpower at Scale","Recruit, train, deploy and manage large field teams with tracking and reporting."],["Exhibitions & Events","1,000–24,000 sqm exhibitions; events for LG, Samsung, HP, ICC World Cup."]];
 const cw=(W-2*M-3*0.3)/4,cy=2.5,ch=3.5;
 pil.forEach((it,i)=>{const cx=M+i*(cw+0.3);s.push(rrect(cx,cy,cw,ch,DARK2,{line:`1px solid #5C4048`}));
  s.push(circ(cx+0.3,cy+0.35,0.55,GOLD,{num:i+1,fc:DARK2,fs:20}));
  s.push(T(cx+0.28,cy+1.15,cw-0.56,0.85,16,{t:it[0],f:SERIF,b:true,c:CREAMT}));
  s.push(T(cx+0.28,cy+2.0,cw-0.56,1.3,10.5,{t:it[1],c:MUTEDD}));});
 s.push(foot(n,true));slide(DARK,s);}

// ---------- SLIDE 4 ----------
{let s=[];const n=nn();s.push(ctitle("Credentials","A proven track record"));s.push(tag(W-M-1.62,0.46));
 const stats=[["90+","Cities covered for retail VM & activations"],["3,000","Man-days on one multi-city retail rollout"],["24,000","Sqm of exhibition floor managed (max)"],["6+ yrs","As LG's BTL / retail / digital partner"]];
 const cw=(W-2*M-3*0.3)/4,cy=1.65,ch=1.85;
 stats.forEach((it,i)=>{const cx=M+i*(cw+0.3);s.push(card(cx,cy,cw,ch));
  s.push(T(cx+0.22,cy+0.24,cw-0.4,0.7,33,{t:it[0],f:SERIF,b:true,c:TERRA}));
  s.push(T(cx+0.22,cy+1.0,cw-0.4,0.75,10.5,{t:it[1]}));});
 s.push(T(M,3.85,11,0.35,12,{t:"Trusted by leading brands",c:MUTED,b:true,cs:1}));
 const cl=["LG","Samsung","Hewlett-Packard","Bajaj","Castrol","Pepsi","ITC","Burberry","Louis Vuitton","Panasonic","Pearson","ICC World Cup"];
 const per=6,gap=0.2,chh=0.62,chw=(W-2*M-(per-1)*gap)/per;
 cl.forEach((c,i)=>{const cx=M+(i%per)*(chw+gap),cy=4.3+Math.floor(i/per)*(chh+gap);
  s.push(rrect(cx,cy,chw,chh,CARD,{line:`1px solid ${LINE}`,rad:5}));
  s.push(T(cx+0.05,cy,chw-0.1,chh,12,{t:c,f:SERIF,b:true,al:"center",va:"middle"}));});
 s.push(T(M,6.35,10,0.3,8.5,{t:"Illustrative selection from ProMarcom credentials.",i:true,c:MUTED}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 5 (photos) ----------
{let s=[];const n=nn();s.push(ctitle("Relevant Experience","We have run exactly this before"));s.push(tag(W-M-1.62,0.46));
 const cases=[["hp_mall_promo.png","HP — Mall Promotions","Mumbai & Bengaluru","3-month mall promotion: fabrication, manpower, props, merchandising, logistics & reporting."],["burberry_window.png","Burberry & Louis Vuitton","Premium Retail VM","Luxury show-windows, in-shop props & merchandise — the premium standard Doft demands."],["hp_veg_cart.png","LG Cookie Pep Carnival","70+ cities · 3,000 man-days","Shop-to-shop retail activation across India — multi-city manpower at scale."]];
 const cw=(W-2*M-2*0.35)/3,cy=1.68,ch=4.5,ih=2.0;
 cases.forEach((it,i)=>{const cx=M+i*(cw+0.35);s.push(card(cx,cy,cw,ch));
  s.push(img(it[0],cx+0.12,cy+0.12,cw-0.24,ih,{cover:true,frame:true}));
  s.push(T(cx+0.22,cy+ih+0.22,cw-0.44,0.5,15,{t:it[1],f:SERIF,b:true}));
  s.push(T(cx+0.22,cy+ih+0.68,cw-0.44,0.3,10,{t:it[2],i:true,c:TERRA}));
  s.push(T(cx+0.22,cy+ih+1.02,cw-0.44,1.2,10.5,{t:it[3]}));});
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 6 ----------
{let s=[];const n=nn();s.push(ctitle("Our Approach","One accountable partner, end to end"));s.push(tag(W-M-1.62,0.46));
 const steps=[["Kiosk Build","On-site fabrication & install to Doft design"],["Mall & Legal","Liaison, licences, permits, approvals"],["Logistics","Ghaziabad pickup, replenishment, returns"],["Recruit & Staff","Hire, BGV, payroll, statutory compliance"],["Training","100% attendance + a trained bench"],["Store Ops","Open–close, sales, POS, VM, cash"],["Reporting","Daily sales, footfall, stock, attendance"]];
 const cw=2.85,chh=1.6,topX=[M,M+3.05,M+6.1,M+9.15],botX=[M+1.5,M+4.55,M+7.6];
 steps.slice(0,4).forEach((it,i)=>{const cx=topX[i],cy=1.95;s.push(card(cx,cy,cw,chh));
  s.push(T(cx+0.2,cy+0.16,0.5,0.4,17,{t:i+1,f:SERIF,b:true,c:GOLD}));
  s.push(T(cx+0.2,cy+0.52,cw-0.4,0.4,15,{t:it[0],f:SERIF,b:true}));
  s.push(T(cx+0.2,cy+0.92,cw-0.4,0.6,10,{t:it[1]}));});
 steps.slice(4).forEach((it,i)=>{const cx=botX[i],cy=3.9;s.push(card(cx,cy,cw,chh,DARK));
  s.push(T(cx+0.2,cy+0.16,0.5,0.4,17,{t:i+5,f:SERIF,b:true,c:GOLDL}));
  s.push(T(cx+0.2,cy+0.52,cw-0.4,0.4,15,{t:it[0],f:SERIF,b:true,c:CREAMT}));
  s.push(T(cx+0.2,cy+0.92,cw-0.4,0.6,10,{t:it[1],c:MUTEDD}));});
 s.push(T(M,5.8,W-2*M,0.5,13,{t:"A single Team Leader on ProMarcom's payroll owns daily operations at every kiosk — your one point of contact.",f:SERIF,i:true,c:TERRA,al:"center"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 7 ----------
{let s=[];const n=nn();s.push(ctitle("Staffing","12 people per kiosk — exactly to brief"));s.push(tag(W-M-1.62,0.46));
 const roles=[["6","Sales Executives","Female, 22–25, fluent English, retail experience"],["2","Sales Support","Merchandising, stock, queue management"],["1","Helper","Housekeeping & material handling"],["1","Cashier","Experienced on POS / EDC machines"],["1","Driver","Stock transport & replenishment runs"],["1","Team Leader","Permanent ProMarcom employee — ops owner"]];
 const cw=(W-2*M-2*0.35)/3,ch=1.72,gy=0.3;
 roles.forEach((it,i)=>{const cx=M+(i%3)*(cw+0.35),cy=1.72+Math.floor(i/3)*(ch+gy);s.push(card(cx,cy,cw,ch));
  s.push(circ(cx+0.24,cy+0.3,0.82,i===5?DARK:CREAM,{num:it[0],fc:i===5?GOLDL:TERRA,fs:25,ring:`1.5px solid ${GOLD}`}));
  s.push(T(cx+1.25,cy+0.32,cw-1.45,0.5,15,{t:it[1],f:SERIF,b:true}));
  s.push(T(cx+1.25,cy+0.8,cw-1.45,0.8,9.5,{t:it[2]}));});
 s.push(rrect(M,5.85,W-2*M,0.72,DARK,{}));
 s.push(T(M+0.3,5.85,W-2*M-0.6,0.72,14,{t:`<b style="color:${GOLDL}">12 per kiosk</b><span style="color:${CREAMT}">&nbsp;&nbsp;&nbsp;×&nbsp;&nbsp;&nbsp;pop-ups&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;your deployed field force.&nbsp;&nbsp;&nbsp;Illustrative 9-kiosk rollout&nbsp;&nbsp;=&nbsp;&nbsp;</span><b style="color:${GOLDL}">108 trained staff</b>`,va:"middle"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 8 ----------
{let s=[];const n=nn();s.push(ctitle("People","Recruit  ·  Train  ·  Guarantee"));s.push(tag(W-M-1.62,0.46));
 const cols=[["Recruit & Verify",["City-level sourcing & referrals","Prioritise proven prior-season staff","Background verification before deploy","Onboard to payroll, full compliance"]],["Train to Doft Standard",["100% attendance at Doft's 1-day training","Scheduled 10–21 days before go-live","Completion tracked per candidate","Replacements trained too — always equal"]],["Zero-Gap Guarantee",["~15% trained bench held per city","Immediate same-day replacement","Attrition covered at no extra cost","Trading never stops for a vacancy"]]];
 const cw=(W-2*M-2*0.35)/3,cy=1.68,ch=3.65;
 cols.forEach((c,i)=>{const cx=M+i*(cw+0.35);s.push(card(cx,cy,cw,ch));
  s.push(circ(cx+0.25,cy+0.3,0.5,ROSE,{num:i+1,fs:18}));
  s.push(T(cx+0.9,cy+0.3,cw-1.1,0.5,15,{t:c[0],f:SERIF,b:true,va:"middle"}));
  const bl=c[1].map(t=>`<div style="margin-bottom:7px;padding-left:14px;text-indent:-14px">•&nbsp;&nbsp;${t}</div>`).join('');
  s.push(T(cx+0.3,cy+1.05,cw-0.55,2.45,10.5,{t:bl}));});
 s.push(rrect(M,5.7,W-2*M,0.82,TERRA,{}));
 s.push(T(M+0.3,5.7,W-2*M-0.6,0.82,12.5,{t:"Contractual commitment:  any attrition after training or during operations is replaced immediately with equally-trained staff — at no additional cost to Doft.",c:"#fff",b:true,al:"center",va:"middle"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 9 ----------
{let s=[];const n=nn();s.push(ctitle("Setup","Kiosk, mall coordination & compliance"));s.push(tag(W-M-1.62,0.46));
 const rows=[["Kiosk fabrication & install","On-site fabrication to Doft-approved design; transport, install, maintain, dismantle & return fixtures — with a 3-day buffer before go-live."],["Mall coordination","Liaison with mall management; electricity, access passes, loading/unloading and operational approvals."],["Legal & licensing","All permissions, licences and documentation — started at T-7 weeks to de-risk go-live."],["Compliance sign-off","Shops & Establishment, GST/e-invoicing, PF/ESIC, insurance, fire & electrical, staff BGV — signed before opening."]];
 const cy0=1.75,rh=1.12,gap=0.12;
 rows.forEach((it,i)=>{const cy=cy0+i*(rh+gap);s.push(card(M,cy,W-2*M,rh,CARD,false));
  s.push(circ(M+0.3,cy+0.31,0.5,DARK,{num:i+1,fc:GOLDL,fs:18}));
  s.push(T(M+1.05,cy+0.12,3.2,rh-0.24,15,{t:it[0],f:SERIF,b:true,va:"middle"}));
  s.push(T(M+4.35,cy+0.12,W-2*M-4.65,rh-0.24,11,{t:it[1],va:"middle"}));});
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 10 ----------
{let s=[];const n=nn();s.push(ctitle("Supply Chain","Logistics & stock replenishment"));s.push(tag(W-M-1.62,0.46));
 const flow=[["Ghaziabad Warehouse","Collect from Doft's warehouse; insured in transit"],["Stockroom · ~90 sq ft","Local buffer beside each kiosk for fast refill"],["Kiosk Shelf","Daily fill to plan; reorder at minimum levels"],["Reconcile & Return","Daily counts; unsold stock returned & reconciled"]];
 const gapx=0.55,cy=2.15,ch=2.75,cw=(W-2*M-3*gapx)/4;
 flow.forEach((it,i)=>{const cx=M+i*(cw+gapx);s.push(card(cx,cy,cw,ch));
  s.push(circ(cx+cw/2-0.35,cy+0.4,0.7,ROSE,{num:i+1,fs:22}));
  s.push(T(cx+0.12,cy+1.35,cw-0.24,0.7,13.5,{t:it[0],f:SERIF,b:true,al:"center"}));
  s.push(T(cx+0.15,cy+1.95,cw-0.3,0.7,9.5,{t:it[1],c:MUTED,al:"center"}));
  if(i<3)s.push(T(cx+cw+0.03,cy+0.55,gapx-0.06,0.7,22,{t:"→",c:GOLD,b:true,al:"center",va:"middle"}));});
 s.push(rrect(M,5.55,W-2*M,0.82,SAND,{}));
 s.push(T(M+0.3,5.55,W-2*M-0.6,0.82,14,{t:"Timely replenishment protects peak-day sales — no stock-outs when footfall is highest.",f:SERIF,i:true,c:TERRA,al:"center",va:"middle"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 11 ----------
{let s=[];const n=nn();s.push(ctitle("Operations","Daily operations & reporting"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.52,W-2*M,0.4,12,{t:"Consistent open-to-close execution, with a standard daily report to Doft per kiosk — consolidated by city.",c:MUTED}));
 const reports=["Sales","Footfall","Conversion","Inventory","Replenishment","Attendance","Customer Feedback","Operational Issues"];
 const cw=(W-2*M-3*0.3)/4,ch=1.2,gy=0.3;
 reports.forEach((r,i)=>{const cx=M+(i%4)*(cw+0.3),cy=2.2+Math.floor(i/4)*(ch+gy);s.push(card(cx,cy,cw,ch));
  s.push(circ(cx+0.26,cy+ch/2-0.09,0.18,GOLD));
  s.push(T(cx+0.52,cy,cw-0.66,ch,12.5,{t:r,f:SERIF,b:true,va:"middle"}));});
 s.push(rrect(M,5.5,W-2*M,1.02,DARK,{}));
 s.push(T(M+0.35,5.63,5,0.32,10,{t:"GOVERNANCE CADENCE",c:GOLDL,b:true,cs:2}));
 s.push(T(M+0.35,5.98,W-2*M-0.7,0.42,12.5,{t:`<b style="color:${GOLDL}">Daily</b> <span style="color:${CREAMT}">written report</span>&nbsp;&nbsp;&nbsp;<span style="color:${GOLD}">·</span>&nbsp;&nbsp;&nbsp;<b style="color:${GOLDL}">Weekly</b> <span style="color:${CREAMT}">city review call</span>&nbsp;&nbsp;&nbsp;<span style="color:${GOLD}">·</span>&nbsp;&nbsp;&nbsp;<b style="color:${GOLDL}">End-of-season</b> <span style="color:${CREAMT}">reconciliation</span>`,va:"middle"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 12 timeline ----------
{let s=[];const n=nn();s.push(ctitle("Plan","Project timeline"));s.push(tag(W-M-1.62,0.46));
 const ly=3.45,lw=1.7,sX=M+lw/2,eX=W-M-lw/2;
 s.push(box(sX,ly-0.015,eX-sX,0.03,`background:${ROSE}`));
 const ph=[["T-8w","Award & kick-off",1],["T-7w","Malls & licences",0],["T-6w","Recruit & BGV",1],["T-3w","Kiosk fit-out",0],["T-2w","Doft training",1],["T-1w","Stock & first fill",0],["T","Go-live — ops",1],["T+6w","Dismantle & review",0]];
 ph.forEach((it,i)=>{const cx=sX+(eX-sX)*(i/(ph.length-1)),up=it[2]===1,boxY=up?ly-1.5:ly+0.5,bx=cx-lw/2;
  s.push(T(bx,boxY,lw,0.3,14,{t:it[0],f:SERIF,b:true,c:TERRA,al:"center"}));
  s.push(T(bx,boxY+0.32,lw,0.6,10.5,{t:it[1],al:"center",va:up?"bottom":"top"}));
  const cly=up?boxY+0.92:ly,clh=up?ly-(boxY+0.92):boxY-ly;
  s.push(box(cx-0.006,cly,0.012,clh,`background:${LINE}`));
  s.push(circ(cx-0.11,ly-0.11,0.22,DARK));});
 s.push(T(M,6.25,W-2*M,0.4,10,{t:"Relative to go-live (T). Operations run 3–5 weeks per the brief. Full per-region Gantt is in the operations workbook.",i:true,c:MUTED,al:"center"}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 13 (dark rollout) ----------
{let s=[];const n=nn();
 s.push(T(M,0.56,10,0.3,11,{t:"ROLLOUT",c:GOLDL,b:true,cs:2}));
 s.push(T(M,0.88,12,0.7,31,{t:"An illustrative first-season footprint",f:SERIF,b:true,c:CREAMT}));
 s.push(T(M,1.62,12,0.4,12.5,{t:"A starting scenario for a premium brand — fully scalable. Final cities & kiosk counts are yours to set.",c:MUTEDD}));
 const cities=[["Delhi-NCR","3 kiosks"],["Mumbai","3 kiosks"],["Bengaluru","3 kiosks"]];
 const cw=(W-2*M-2*0.4)/3,cy=2.5,ch=1.85;
 cities.forEach((c,i)=>{const cx=M+i*(cw+0.4);s.push(rrect(cx,cy,cw,ch,DARK2,{line:`1px solid #5C4048`}));
  s.push(T(cx+0.3,cy+0.35,cw-0.6,0.6,22,{t:c[0],f:SERIF,b:true,c:CREAMT}));
  s.push(T(cx+0.3,cy+1.05,cw-0.6,0.5,13,{t:c[1],c:GOLDL}));});
 const stats=[["9","Total kiosks"],["108","Trained staff"],["3–5 wks","Operating window"],["2028","Committed through"]];
 const sw=(W-2*M-3*0.4)/4,sy=4.75;
 stats.forEach((c,i)=>{const cx=M+i*(sw+0.4);s.push(box(cx,sy,0.03,1.45,`background:${GOLD}`));
  s.push(T(cx+0.2,sy,sw-0.2,0.85,38,{t:c[0],f:SERIF,b:true,c:GOLDL}));
  s.push(T(cx+0.2,sy+0.92,sw-0.2,0.5,11.5,{t:c[1],c:MUTEDD}));});
 s.push(T(M,6.5,W-2*M,0.4,10,{t:"Scenario only — the brief specifies 2–4 pop-ups per region across multiple cities. Change two inputs in the workbook to re-scope.",i:true,c:MUTEDD}));
 s.push(foot(n,true));slide(DARK,s);}

// ---------- SLIDE 14 (commercial + donut) ----------
{let s=[];const n=nn();s.push(ctitle("Commercials","A transparent, built-up cost model"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,W-2*M,0.4,12,{t:"Priced bottom-up per kiosk, then rolled up. Every line is an editable input in the workbook.",c:MUTED}));
 const vals=[393,250,225,100,55,102],labs=["Manpower","Mall licence*","Kiosk fabrication","Logistics & stockroom","Welfare & incentives","Other setup & compliance"],cols=[TERRA,ROSE,DARK,GOLD,"#C9B9A6","#E0D4C1"];
 const tot=vals.reduce((a,b)=>a+b,0);let acc=0,seg=[];vals.forEach((v,i)=>{const a0=acc/tot*360,a1=(acc+v)/tot*360;seg.push(`${cols[i]} ${a0}deg ${a1}deg`);acc+=v;});
 const dsz=3.5,dx=M+0.7,dy=2.15;
 s.push(`<div style="position:absolute;left:${px(dx)};top:${px(dy)};width:${px(dsz)};height:${px(dsz)};border-radius:50%;background:conic-gradient(${seg.join(',')})"></div>`);
 s.push(`<div style="position:absolute;left:${px(dx+dsz*0.28)};top:${px(dy+dsz*0.28)};width:${px(dsz*0.44)};height:${px(dsz*0.44)};border-radius:50%;background:${CREAM}"></div>`);
 // legend (2 cols x 3 rows) beneath donut
 const legItems=labs.map((l,i)=>({l,c:cols[i],v:vals[i]}));
 legItems.forEach((it,i)=>{const c0=i%2,r0=Math.floor(i/2);const lx=M+c0*2.75,yy=5.85+r0*0.24;
  s.push(`<div style="position:absolute;left:${px(lx)};top:${px(yy+0.02)};width:10px;height:10px;background:${it.c};border-radius:2px"></div>`);
  s.push(T(lx+0.18,yy,2.5,0.24,8.5,{t:it.l,c:INK,va:"middle"}));});
 // build-up rows
 const bx=6.7,bw=W-M-bx,rows=[["Direct cost / kiosk","₹ 11.3 L",INK],["+ Management margin (15%)","₹ 1.7 L",INK],["Contract value / kiosk (pre-GST)","₹ 12.9 L",TERRA],["× 9 kiosks (illustrative)","₹ 1.16 Cr",TERRA],["+ GST (18%)","₹ 0.21 Cr",INK],["Total programme (incl. GST)","₹ 1.37 Cr",GOLD]];
 const rh=0.62;
 rows.forEach((r,i)=>{const cy=2.1+i*(rh+0.06),strong=i===5;s.push(rrect(bx,cy,bw,rh,strong?DARK:CARD,{line:`1px solid ${LINE}`,rad:5}));
  s.push(T(bx+0.2,cy,bw-2.0,rh,11.5,{t:r[0],b:i>=2,c:strong?CREAMT:INK,va:"middle"}));
  s.push(T(bx+bw-1.9,cy,1.7,rh,14,{t:r[1],f:SERIF,b:true,c:strong?GOLDL:r[2],al:"right",va:"middle"}));});
 s.push(T(M,6.5,W-2*M,0.4,8.5,{t:"* Mall licence / space fee is the biggest swing item and is often reimbursed by the brand. Figures illustrative at placeholder rates.",i:true,c:MUTED}));
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 15 (risk table) ----------
{let s=[];const n=nn();s.push(ctitle("Assurance","How we protect the season"));s.push(tag(W-M-1.62,0.46));
 const risks=[["Staff attrition after training","15% trained bench; same-day no-cost replacement"],["Mall permission delays","Licensing kicked off at T-7w; parallel mall shortlist"],["Stock-out on peak days","Reorder levels + daily replenishment from stockroom"],["POS / EDC downtime","Backup EDC + connectivity failover; trained cashier"],["Kiosk fabrication delay","Vendor SLA + 3-day buffer before go-live"]];
 const tx=M,tw=W-2*M,rh=0.9,ty=1.8,split=4.5,hh=0.52;
 s.push(box(tx,ty,split,hh,`background:${DARK}`));s.push(box(tx+split,ty,tw-split,hh,`background:${DARK2}`));
 s.push(T(tx+0.28,ty,split-0.4,hh,11,{t:"RISK",c:GOLDL,b:true,va:"middle",cs:2}));
 s.push(T(tx+split+0.28,ty,tw-split-0.4,hh,11,{t:"MITIGATION",c:GOLDL,b:true,va:"middle",cs:2}));
 risks.forEach((r,i)=>{const cy=ty+hh+i*rh;s.push(box(tx,cy,tw,rh,`background:${i%2?CARD:SAND};border:0.5px solid ${LINE};box-sizing:border-box`));
  s.push(T(tx+0.28,cy,split-0.45,rh,12.5,{t:r[0],f:SERIF,b:true,va:"middle"}));
  s.push(T(tx+split+0.28,cy,tw-split-0.55,rh,11.5,{t:r[1],va:"middle"}));});
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 16 (workbook tabs) ----------
{let s=[];const n=nn();s.push(ctitle("Toolkit","The operations workbook"));s.push(tag(W-M-1.62,0.46));
 s.push(T(M,1.5,W-2*M,0.4,12,{t:"This deck ships with a live Excel workbook — the operating system for the engagement. Edit the assumptions; everything recalculates.",c:MUTED}));
 const tabs=["Assumptions","Project Timeline","Staffing Plan","Manpower Cost","Budget Summary","Recruitment Tracker","Attendance","Daily Sales","Inventory & Replenish","Footfall & Conversion","Customer Feedback","Compliance Checklist","Risk Register"];
 const cols=4,cw=(W-2*M-3*0.3)/cols,ch=0.92,gy=0.24;
 tabs.forEach((t,i)=>{const cx=M+(i%cols)*(cw+0.3),cy=2.2+Math.floor(i/cols)*(ch+gy);s.push(card(cx,cy,cw,ch,CARD,false));
  s.push(T(cx+0.2,cy,0.7,ch,18,{t:String(i+1).padStart(2,"0"),f:SERIF,b:true,c:GOLD,va:"middle"}));
  s.push(T(cx+0.85,cy,cw-1.0,ch,10.5,{t,b:true,va:"middle"}));});
 s.push(foot(n));slide(CREAM,s);}

// ---------- SLIDE 17 (closing dark) ----------
{let s=[];const pxi=8.9;
 s.push(img("doft_giftbox.png",pxi,0,W-pxi,H));
 s.push(box(pxi-0.02,0,0.03,H,`background:${DARK}`));
 s.push(T(M,1.3,8.1,1.7,38,{t:"Let's make Doft's Diwali unmissable.",f:SERIF,b:true,c:CREAMT,lh:1.1}));
 s.push(T(M,3.05,7.6,0.9,13,{t:"A premium retail partner with proven mall, VM and multi-city manpower experience — committed to Doft for Diwali 2026, 2027 and 2028.",c:MUTEDD}));
 s.push(box(M+0.02,4.2,7.7,0.02,`background:${GOLD}`));
 s.push(T(M,4.4,1.4,0.5,9,{t:"Prepared by",i:true,c:MUTEDD,va:"middle"}));
 s.push(tag(M+1.1,4.4,1.8,true));
 s.push(doft(M+3.2,4.32,2.1,0.7,true));
 const contacts=[["Prashant","+91 99538 88889","prashant@eventsactive.com"],["Web  ·  USA","www.eventsactive.com","Padma  ·  +1 (408) 679-7148"]];
 contacts.forEach((c,i)=>{const cx=M+i*4.0;
  s.push(T(cx,5.3,3.8,0.32,10,{t:c[0],c:GOLDL,b:true,cs:1}));
  s.push(T(cx,5.62,3.8,0.32,15,{t:c[1],f:SERIF,c:CREAMT}));
  s.push(T(cx,5.96,3.8,0.32,10.5,{t:c[2],c:MUTEDD}));});
 s.push(T(M,6.95,8,0.3,8,{t:"Prepared as a planning response to the Doft Candles Request for Contractor. Figures illustrative at placeholder rates.",i:true,c:"#8A7078"}));
 slide(DARK,s);}

const html=`<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${W}in ${H}in;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#ccc}
.slide{position:relative;width:${W*PX}px;height:${H*PX}px;overflow:hidden;page-break-after:always;break-after:page}
</style></head><body>${out.join("")}</body></html>`;
fs.writeFileSync("deck.html",html);
console.log("wrote deck.html with",SN+1,"slides (17 total)");
