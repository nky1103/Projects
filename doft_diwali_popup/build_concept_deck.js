// DOFT × ProMarcom: Diwali Pop-Up Boutique Kiosk : Concept Presentation
// Uses the client-supplied kiosk design renders (ref_imgs/P1_s*.jpg).
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";
p.author = "ProMarcom"; p.company = "ProMarcom";

// ---- palette (warm charcoal · brass · ivory: matched to the design renders) ----
const INK="1E1B17", CHAR="2B2621", GOLD="C6A24E", GOLDD="A9813A",
      CREAM="F7F1E6", IVORY="FBF7EF", WHITE="FFFFFF", TXT="2A2621", MUTE="857B6C", LINE="E6DECB", SOFT="EFEAE0";
const HEAD="Cambria", BODY="Calibri";
const W=13.333, H=7.5;

// design renders
const IMG={hero:"ref_imgs/P1_s2_2.jpg", h34:"ref_imgs/P1_s4_4.jpg", front:"ref_imgs/P1_s3_3.jpg",
           interior:"ref_imgs/P1_s1_1.jpg", plan:"ref_imgs/P1_s5_5.jpg"};

function footer(s, n, onDark){
  const c = onDark ? "B8AE9C" : MUTE;
  s.addText([{text:"DOFT", options:{bold:true,color:GOLD,fontFace:HEAD}},
             {text:"  ·  SCENTED MEMORIES  ·  Diwali Pop-Up Kiosk Concept", options:{color:c}}],
    {x:0.5, y:7.02, w:8, h:0.35, fontSize:9.5, fontFace:BODY, align:"left", valign:"middle", charSpacing:1});
  s.addText("ProMarcom", {x:11.0, y:7.02, w:1.85, h:0.35, fontSize:9.5, color:c, fontFace:BODY, align:"right", valign:"middle"});
  s.addShape(p.ShapeType.ellipse, {x:12.55, y:6.96, w:0.44, h:0.44, fill:{color: onDark?INK:WHITE}, line:{color:GOLD, width:1}});
  s.addText(String(n), {x:12.55, y:6.96, w:0.44, h:0.44, align:"center", valign:"middle", fontSize:11, color: onDark?GOLD:CHAR, fontFace:HEAD, bold:true});
}
function kicker(s, txt, x, y, color){
  s.addText(txt.toUpperCase(), {x, y, w:7, h:0.3, fontSize:12.5, color:color||GOLDD, fontFace:BODY, bold:true, charSpacing:3, align:"left"});
}
// design render on one side + charcoal spec panel on the other
function designSlide(n, side, img, title, kick, specs, sizing){
  const s=p.addSlide(); s.background={color:SOFT};
  const panelW=4.7, imgW=W-panelW;
  const panelX = side==="left" ? 0 : imgW;
  const imgX = side==="left" ? panelW : 0;
  s.addShape(p.ShapeType.rect,{x:imgX,y:0,w:imgW,h:H,fill:{color:"E7E2D8"}});
  s.addImage({path:img, x:imgX+0.1, y:0.35, w:imgW-0.2, h:6.55, sizing:{type:sizing||"contain", w:imgW-0.2, h:6.55}});
  s.addShape(p.ShapeType.rect,{x:panelX,y:0,w:panelW,h:H,fill:{color:CHAR}});
  s.addShape(p.ShapeType.rect,{x: side==="left"?panelW-0.04:panelX, y:0, w:0.04, h:H, fill:{color:GOLD}});
  const tx = panelX+0.55;
  kicker(s, kick, tx, 0.95, GOLD);
  s.addText(title,{x:tx, y:1.35, w:panelW-1.0, h:1.5, fontSize:29, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addShape(p.ShapeType.line,{x:tx, y:2.95, w:0.9, h:0, line:{color:GOLD, width:1.5}});
  let yy=3.25;
  specs.forEach(sp=>{
    s.addText([{text:"·   ",options:{color:GOLD}},{text:sp,options:{color:"E9E2D3"}}],
      {x:tx, y:yy, w:panelW-0.95, h:0.7, fontSize:14.5, fontFace:BODY, valign:"top", lineSpacingMultiple:1.02});
    yy+=0.72;
  });
  footer(s,n,true);
}

// ============ 1 · COVER ============
{
  const s=p.addSlide(); s.background={color:INK};
  s.addImage({path:IMG.hero, x:4.5, y:0, w:8.833, h:7.5, sizing:{type:"cover", w:8.833, h:7.5}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.4,h:H,fill:{color:INK}});
  s.addShape(p.ShapeType.rect,{x:6.4,y:0,w:2.4,h:H,fill:{color:INK,transparency:38}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:0.16,h:H,fill:{color:GOLD}});
  s.addText("DOFT",{x:0.85, y:1.15, w:6, h:1.2, fontSize:66, bold:true, color:GOLD, fontFace:HEAD, charSpacing:6});
  s.addText("SCENTED MEMORIES",{x:0.95, y:2.4, w:6, h:0.4, fontSize:16, color:"D8CDB6", fontFace:BODY, charSpacing:6});
  s.addShape(p.ShapeType.line,{x:0.9, y:3.1, w:2.4, h:0, line:{color:GOLD,width:1.5}});
  s.addText("Diwali Pop-Up\nBoutique Kiosk",{x:0.85, y:3.3, w:6.0, h:1.5, fontSize:38, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addText("Concept Design  ·  Premium home-fragrance salon",{x:0.87, y:5.35, w:6.0, h:0.5, fontSize:15.5, color:"C9BFAD", fontFace:BODY});
  s.addText([{text:"8 ft × 8 ft",options:{bold:true,color:GOLD}},{text:"   ·   14 malls   ·   ~6 weeks festive window",options:{color:"B8AE9C"}}],
    {x:0.87, y:5.85, w:6.0, h:0.4, fontSize:14, fontFace:BODY});
  s.addText("PRESENTED BY",{x:0.87, y:6.45, w:3, h:0.3, fontSize:11, color:"9A9184", fontFace:BODY, charSpacing:2});
  s.addText("ProMarcom",{x:0.85, y:6.72, w:4, h:0.5, fontSize:22, color:WHITE, fontFace:HEAD, bold:true});
  s.addNotes("Cover: DOFT Diwali Pop-Up boutique kiosk, premium home-fragrance salon, 8x8 ft, 14 malls, by ProMarcom.");
}

// ============ 2 · THE OPPORTUNITY ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"The Opportunity",0.6,0.6);
  s.addText("A premium festive stage\nfor Doft Candles",
    {x:0.55, y:0.95, w:7.4, h:1.5, fontSize:32, color:CHAR, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addText([
    {text:"Doft Candles is a premium home-fragrance brand. For the Diwali gifting season we take the brand into India's highest-footfall malls with a turnkey pop-up boutique kiosk, a warm and luminous salon that invites shoppers to sit, smell and gift.\n\n",options:{}},
    {text:"Product range:  ",options:{bold:true,color:GOLDD}},
    {text:"scented candles · reed diffusers · room sprays · wax melts · premium gift hampers.",options:{}}
  ],{x:0.55, y:2.55, w:6.7, h:2.6, fontSize:15, color:TXT, fontFace:BODY, lineSpacingMultiple:1.15, valign:"top"});
  const stats=[["14","Premium malls\nPan-India"],["8×8","Feet kiosk\n64 sq ft"],["~6","Weeks festive\n+ Xmas / NY"],["Turnkey","Design → build →\noperate"]];
  const bx=7.7, bw=2.55, bh=2.35, gap=0.35;
  stats.forEach((st,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=bx+col*(bw+gap), y=1.05+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x,y,w:bw,h:bh,fill:{color:IVORY},line:{color:LINE,width:1}});
    s.addText(st[0],{x:x, y:y+0.3, w:bw, h:0.95, align:"center", fontSize:40, color:GOLDD, fontFace:HEAD, bold:true});
    s.addText(st[1],{x:x+0.15, y:y+1.35, w:bw-0.3, h:0.85, align:"center", fontSize:12.5, color:CHAR, fontFace:BODY, lineSpacingMultiple:0.98});
  });
  footer(s,2);
  s.addNotes("The opportunity: premium home fragrance, Diwali gifting, 14 malls, 8x8 boutique kiosk, turnkey.");
}

// ============ 3 · DESIGN CONCEPT ============
{
  const s=p.addSlide(); s.background={color:SOFT};
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.2,h:H,fill:{color:WHITE}});
  kicker(s,"Design Concept",0.6,0.65);
  s.addText("The DOFT boutique kiosk",{x:0.55, y:1.0, w:5.4, h:1.4, fontSize:31, color:CHAR, fontFace:HEAD, bold:true, lineSpacingMultiple:0.95});
  s.addText("A warm, luminous fragrance salon with a backlit brand wall, brass gallery shelving and a place to sit, smell and gift.",
    {x:0.55, y:2.15, w:5.2, h:1.1, fontSize:14.5, color:TXT, fontFace:BODY, lineSpacingMultiple:1.12, valign:"top"});
  const feats=[
    ["Backlit brand-seal wall","The illuminated DOFT seal anchors the kiosk as a warm beacon across the mall court."],
    ["Brass gallery shelving","Warm-lit floating shelves stage candles, diffusers and gift sets like a boutique."],
    ["Consultation seating","A central table and chairs invite shoppers to sit, sample scents and choose gifts."],
    ["Digital brand screen","A screen at the aisle plays the Doft film and draws footfall in."],
  ];
  let yy=3.4;
  feats.forEach(f=>{
    s.addShape(p.ShapeType.ellipse,{x:0.55, y:yy+0.05, w:0.16, h:0.16, fill:{color:GOLD}});
    s.addText(f[0],{x:0.85, y:yy-0.1, w:5.1, h:0.35, fontSize:14.5, color:CHAR, fontFace:HEAD, bold:true});
    s.addText(f[1],{x:0.85, y:yy+0.24, w:5.1, h:0.55, fontSize:11.5, color:MUTE, fontFace:BODY, lineSpacingMultiple:1.0, valign:"top"});
    yy+=0.88;
  });
  s.addImage({path:IMG.h34, x:6.35, y:0.9, w:6.7, h:5.7, sizing:{type:"contain", w:6.7, h:5.7}});
  footer(s,3);
  s.addNotes("Design concept: warm boutique fragrance salon: backlit brand wall, brass shelving, consultation seating, digital screen.");
}

// ============ 4-6 · DESIGN VIEWS ============
designSlide(4,"right",IMG.h34,"Three-quarter view","Design · Perspective",
  ["Backlit MEMORIES DOFT SCENTED seal wall","Warm-lit brass gallery shelving","White counters with black-stone tops","Backlit seal counter fronts"]);
designSlide(5,"left",IMG.front,"Front elevation","Design · Storefront",
  ["Symmetrical premium storefront","Illuminated brand seal as the hero","Reed diffusers, candles & gift sets staged","Downlit header fascia & warm LED base"]);
designSlide(6,"right",IMG.interior,"Interior view","Design · Layout",
  ["Open-corner customer entry","U-counter wraps the display zone","Central table & seating for gifting consults","Digital brand screen at the aisle"], "cover");

// ============ 7 · TOP LAYOUT ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Top Layout · Plan",0.6,0.5);
  s.addText("8 ft × 8 ft kiosk footprint",{x:0.55, y:0.85, w:9, h:0.6, fontSize:28, color:CHAR, fontFace:HEAD, bold:true});
  s.addImage({path:IMG.plan, x:0.6, y:1.45, w:8.3, h:5.7, sizing:{type:"contain", w:8.3, h:5.7}});
  const pts=[["Backlit brand wall","Illuminated seal + gallery shelving"],
             ["Perimeter counters","U-display wraps three sides"],
             ["Consultation seating","Central table + four chairs"],
             ["Open-corner entries","Easy customer flow in & out"],
             ["Digital screen","Brand film at the aisle edge"]];
  s.addShape(p.ShapeType.rect,{x:9.3, y:1.5, w:3.5, h:5.4, fill:{color:IVORY}, line:{color:LINE,width:1}});
  s.addText("KEY ZONES",{x:9.6, y:1.72, w:3, h:0.35, fontSize:13, color:GOLDD, fontFace:BODY, bold:true, charSpacing:2});
  let yy=2.32;
  pts.forEach(pt=>{
    s.addShape(p.ShapeType.ellipse,{x:9.62, y:yy+0.04, w:0.14, h:0.14, fill:{color:GOLD}});
    s.addText(pt[0],{x:9.9, y:yy-0.12, w:2.75, h:0.32, fontSize:13.5, color:CHAR, fontFace:HEAD, bold:true});
    s.addText(pt[1],{x:9.9, y:yy+0.2, w:2.75, h:0.45, fontSize:11, color:MUTE, fontFace:BODY, lineSpacingMultiple:0.95});
    yy+=0.9;
  });
  footer(s,7);
  s.addNotes("Top layout: dimensioned 8x8 ft plan: backlit brand wall, perimeter U-counter, central seating, open-corner entries, digital screen.");
}

// ============ 8 · MATERIALS & FINISHES ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Materials & Finishes",0.6,0.6);
  s.addText("A warm, premium material palette",{x:0.55, y:0.95, w:11, h:0.7, fontSize:30, color:CHAR, fontFace:HEAD, bold:true});
  const sw=[["Warm white lacquer","F0ECE3","Body & display walls"],
            ["Brushed brass","C6A24E","Shelving, trims & legs"],
            ["Black-stone top","20201E","Counter surfaces"],
            ["Backlit brand seal","F2E4C4","Illuminated acrylic panels"],
            ["Warm LED glow","F3D9A6","Perimeter & downlights"],
            ["Digital screen","2B2621","Brand film & catalogue"]];
  const bw=3.75, bh=2.15, gx=0.55, gy=2.0, gap=0.5;
  sw.forEach((c,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=gx+col*(bw+gap), y=gy+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x, y, w:bw, h:1.35, fill:{color:c[1]}, line:{color:LINE,width:0.75}});
    s.addText(c[0],{x, y:y+1.42, w:bw, h:0.35, fontSize:15, color:CHAR, fontFace:HEAD, bold:true});
    s.addText(c[2],{x, y:y+1.75, w:bw, h:0.3, fontSize:11.5, color:MUTE, fontFace:BODY});
  });
  footer(s,8);
  s.addNotes("Materials: warm white lacquer, brushed brass, black stone, backlit acrylic seal, warm LED, digital screen.");
}

// ============ 9 · PRODUCT STORY ============
{
  const s=p.addSlide(); s.background={color:INK};
  kicker(s,"The Range",0.6,0.6,GOLD);
  s.addText("Merchandising the Doft story",{x:0.55, y:0.95, w:9, h:0.7, fontSize:30, color:WHITE, fontFace:HEAD, bold:true});
  s.addText("Backlit brass shelving and counter displays stage the full gifting range at eye level.",
    {x:0.55, y:1.65, w:9, h:0.4, fontSize:14, color:"CFC6B5", fontFace:BODY});
  const imgs=[["brief_assets/DOFT/16871dda-65d9-4f51-acfd-b2b5ad6183e9.JPG","Scented candles"],
              ["brief_assets/DOFT/5dc4e2f7-31d9-4a47-ba1e-1ed1f98adf47.JPG","Gift hampers"],
              ["brief_assets/DOFT/14f3dd5c-717d-40c6-9314-74ee5f820af0.JPG","Reed diffusers & sprays"],
              ["brief_assets/DOFT/66d435a3-c7c1-44d9-b723-01f7df92b433.JPG","Festive gift boxes"]];
  const bw=2.85, gx=0.55, gy=2.35, gap=0.35, bh=2.55;
  imgs.forEach((im,i)=>{
    const x=gx+i*(bw+gap);
    s.addShape(p.ShapeType.rect,{x, y:gy, w:bw, h:bh, fill:{color:IVORY}, line:{color:GOLD,width:1}});
    s.addImage({path:im[0], x:x+0.12, y:gy+0.12, w:bw-0.24, h:bh-0.7, sizing:{type:"cover", w:bw-0.24, h:bh-0.7}});
    s.addText(im[1],{x:x, y:gy+bh-0.5, w:bw, h:0.4, align:"center", fontSize:12.5, color:CHAR, fontFace:HEAD, bold:true});
  });
  footer(s,9,true);
  s.addNotes("Product story: candles, gift hampers, reed diffusers, room sprays & wax melts on backlit shelving.");
}

// ============ 10 · CITIES & MALLS ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Footprint",0.6,0.5);
  s.addText("14 premium malls, pan-India",{x:0.55, y:0.85, w:9, h:0.6, fontSize:30, color:CHAR, fontFace:HEAD, bold:true});
  const malls=[["Delhi","Select Citywalk"],["Noida","DLF Mall of India"],["Gurgaon","Ambience Mall"],
    ["Chandigarh","Elante Mall"],["Lucknow","Lulu Mall"],["Mumbai · BKC","Jio World Mall"],
    ["Mumbai · Lower Parel","Phoenix Mall"],["Ahmedabad","Phoenix Mall"],["Nagpur","VR Mall"],
    ["Kolkata","South City Mall"],["Chennai","Phoenix Marketcity"],["Bengaluru","Phoenix Marketcity"],
    ["Hyderabad","Phoenix Mall"],["Kochi","Lulu International Mall"]];
  const colW=3.9, rowH=0.62, x0=0.55, y0=1.75, cols=3;
  const rows=Math.ceil(malls.length/cols);
  malls.forEach((m,i)=>{
    const col=Math.floor(i/rows), row=i%rows;
    const x=x0+col*(colW+0.35), y=y0+row*rowH;
    s.addShape(p.ShapeType.ellipse,{x, y:y+0.12, w:0.16, h:0.16, fill:{color:GOLD}});
    s.addText([{text:m[0]+"   ",options:{bold:true,color:CHAR,fontFace:HEAD}},
               {text:m[1],options:{color:MUTE,fontFace:BODY}}],
      {x:x+0.28, y:y-0.03, w:colW-0.3, h:0.45, fontSize:13.5, valign:"middle"});
  });
  s.addShape(p.ShapeType.rect,{x:0.55, y:6.35, w:12.2, h:0.55, fill:{color:IVORY}, line:{color:LINE,width:1}});
  s.addText([{text:"Same festive window across all locations.  ",options:{bold:true,color:GOLDD}},
    {text:"Select high-performing malls extended through Christmas & New Year.",options:{color:TXT}}],
    {x:0.75, y:6.35, w:11.8, h:0.55, fontSize:12.5, fontFace:BODY, valign:"middle"});
  footer(s,10);
  s.addNotes("14 malls pan-India per revised client list. Same window; select extend to Xmas/NY.");
}

// ============ 11 · MULTIPLEX RATIONALE ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Extending Reach  ·  Channel 2",0.6,0.6);
  s.addText("Adding multiplex activation",{x:0.55,y:0.95,w:11,h:0.7,fontSize:30,color:CHAR,fontFace:HEAD,bold:true});
  s.addText([{text:"Premium atrium space on a six-week rental is limited and highly contested. To secure reach across every target city we propose a parallel Doft activation inside the ",options:{}},
    {text:"PVR / INOX multiplexes located in the same malls",options:{bold:true,color:GOLDD}},
    {text:", a captive, premium, high-dwell audience already in a leisure and gifting mindset.",options:{}}],
    {x:0.55,y:1.75,w:12.2,h:1.4,fontSize:16,color:TXT,fontFace:BODY,lineSpacingMultiple:1.25,valign:"top"});
  const mstats=[["14","Multiplexes","PVR & INOX"],["107","Screens","across the network"],["~20,000","Seats / show","combined capacity"],["8×8 ft","Foyer stall","6-week window"]];
  const bw=2.95, bh=2.4, gx=0.55, gy=3.7, gap=0.33;
  mstats.forEach((st,i)=>{
    const x=gx+i*(bw+gap);
    s.addShape(p.ShapeType.rect,{x,y:gy,w:bw,h:bh,fill:{color:IVORY},line:{color:LINE,width:1}});
    s.addText(st[0],{x,y:gy+0.35,w:bw,h:0.9,align:"center",fontSize:38,color:GOLDD,fontFace:HEAD,bold:true});
    s.addText(st[1],{x,y:gy+1.35,w:bw,h:0.4,align:"center",fontSize:15,color:CHAR,fontFace:HEAD,bold:true});
    s.addText(st[2],{x,y:gy+1.78,w:bw,h:0.4,align:"center",fontSize:11.5,color:MUTE,fontFace:BODY});
  });
  footer(s,11);
  s.addNotes("Rationale: atrium space limited; propose PVR/INOX multiplex foyer activation in the same malls. 14 multiplexes, 107 screens, ~20,000 seats/show.");
}

// ============ 12 · MULTIPLEX CONCEPT ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Multiplex Activation",0.6,0.6);
  s.addText("Brand presence in the cinema foyer",{x:0.55,y:0.95,w:12,h:0.7,fontSize:30,color:CHAR,fontFace:HEAD,bold:true});
  s.addText("An 8x8 ft Doft activation stall in the foyer, seen by every patron entering, waiting and exiting: high dwell time, a festive gifting mindset, live sampling and direct sales.",
    {x:0.55,y:1.7,w:12.2,h:0.7,fontSize:14.5,color:TXT,fontFace:BODY,lineSpacingMultiple:1.1});
  const cim=["ref_imgs/cinema_s6.jpg","ref_imgs/cinema_s2.jpg","ref_imgs/cinema_s4.jpg"];
  const bw=3.95, gx=0.55, gy=2.55, gap=0.3, bh=3.5;
  cim.forEach((im,i)=>{
    const x=gx+i*(bw+gap);
    s.addShape(p.ShapeType.rect,{x,y:gy,w:bw,h:bh,fill:{color:"E7E2D8"},line:{color:LINE,width:1}});
    s.addImage({path:im,x:x+0.08,y:gy+0.08,w:bw-0.16,h:bh-0.16,sizing:{type:"cover",w:bw-0.16,h:bh-0.16}});
  });
  s.addText("Reference foyer activations  ·  PVR / INOX network",{x:0.55,y:gy+bh+0.12,w:12,h:0.35,fontSize:11.5,color:MUTE,fontFace:BODY,italic:true});
  footer(s,12);
  s.addNotes("Multiplex concept: 8x8 foyer activation stall, high dwell, sampling and direct sales. Reference activation photos.");
}

// ============ 13 · MULTIPLEX NETWORK ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"The Network",0.6,0.45);
  s.addText("14 premium multiplexes, pan-India",{x:0.55,y:0.8,w:12,h:0.6,fontSize:28,color:CHAR,fontFace:HEAD,bold:true});
  const net=[
    ["Mumbai · Lower Parel","PVR Phoenix (Worli)","7","1,275","8×8"],
    ["Mumbai · BKC","PVR Maison BKC","6","882","6×6"],
    ["Ahmedabad","PVR Palladium","9","1,283","8×8"],
    ["Delhi · Saket","PVR Select Citywalk","6","1,056","8×8"],
    ["Noida","PVR DT · Mall of India","7","1,712","8×8"],
    ["Gurgaon","PVR Ambience Mall","11","1,122","8×8"],
    ["Chandigarh","PVR Nexus Elante","8","1,599","6×6"],
    ["Lucknow","PVR Superplex · Lulu","11","1,841","8×8"],
    ["Kolkata","INOX City Centre","4","1,144","8×8"],
    ["Kolkata","INOX City Centre II","4","1,190","8×8"],
    ["Hyderabad","PVR Icon · Hitech City","5","936","8×8"],
    ["Bengaluru","PVR Phoenix Market City","9","1,401","6×6"],
    ["Chennai","INOX Luxe · Phoenix","11","2,688","6×6"],
    ["Kochi","PVR Lulu Mall","9","1,926","8×8"],
  ];
  const hdr=["City","Multiplex / Cinema","Screens","Seats / show","Space"];
  const rows=[hdr.map(t=>({text:t,options:{bold:true,color:"FFFFFF",fill:{color:CHAR},fontFace:BODY,align:"left",valign:"middle"}}))];
  net.forEach((rw,i)=>{
    rows.push(rw.map((t,ci)=>({text:t,options:{color:ci===0?CHAR:TXT,bold:ci===0,fill:{color:i%2?"F7F3EA":"FFFFFF"},
      fontFace:ci===1?HEAD:BODY,align:ci>=2?"center":"left",valign:"middle",fontSize:11}})));
  });
  s.addTable(rows,{x:0.55,y:1.55,w:12.2,colW:[3.0,3.9,1.7,1.9,1.7],border:{type:"solid",color:"E6DECB",pt:0.5},
    rowH:0.34,fontSize:11,valign:"middle"});
  s.addText([{text:"Totals:  ",options:{bold:true,color:GOLDD}},
    {text:"14 multiplexes  ·  107 screens  ·  ~20,000 seats per show  (PVR + INOX)",options:{color:TXT}}],
    {x:0.55,y:6.75,w:12,h:0.3,fontSize:12,fontFace:BODY});
  footer(s,13);
  s.addNotes("Network: 14 PVR/INOX multiplexes in the same malls; 107 screens; ~20,000 seats/show.");
}

// ============ 14-16 · ACTIVATION COST (client-facing, quoted only) ============
function rupee(n){n=Math.round(n);let s=String(Math.abs(n));let l3=s.slice(-3);let rest=s.slice(0,-3);
  if(rest)l3=","+l3; rest=rest.replace(/\B(?=(\d\d)+(?!\d))/g,","); return "₹"+rest+l3;}
function costSlide(n, sub, rows, note){
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"14-City  ·  42-Day Activation Program",0.6,0.6);
  s.addText(sub,{x:0.55,y:0.95,w:11,h:0.7,fontSize:30,color:CHAR,fontFace:HEAD,bold:true});
  let y=2.0; const lx=1.1, rx=8.2, rw=4.0;
  rows.forEach(r=>{
    const label=r[0],amt=r[1],ty=r[2]||'norm';
    if(ty==='total'){
      s.addShape(p.ShapeType.rect,{x:lx,y:y+0.05,w:11.1,h:0.76,fill:{color:CHAR}});
      s.addText(label,{x:lx+0.25,y:y+0.05,w:7,h:0.76,fontSize:16,color:WHITE,fontFace:HEAD,bold:true,valign:"middle"});
      s.addText(amt,{x:lx+7.3,y:y+0.05,w:3.55,h:0.76,fontSize:23,color:GOLD,fontFace:HEAD,bold:true,align:"right",valign:"middle"});
      y+=0.92;
    }else{
      const b=(ty==='sub');
      s.addText(label,{x:lx,y:y,w:7,h:0.46,fontSize:b?15:14.5,color:b?CHAR:TXT,fontFace:b?HEAD:BODY,bold:b,valign:"middle"});
      s.addText(amt,{x:rx,y:y,w:rw,h:0.46,fontSize:b?16:15,color:b?CHAR:TXT,fontFace:HEAD,bold:b,align:"right",valign:"middle"});
      s.addShape(p.ShapeType.line,{x:lx,y:y+0.48,w:11.1,h:0,line:{color:LINE,width:0.75}});
      y+=0.56;
    }
  });
  if(note)s.addText(note,{x:lx,y:y+0.16,w:11.1,h:0.55,fontSize:11.5,color:MUTE,fontFace:BODY,italic:true,lineSpacingMultiple:1.1,valign:"top"});
  footer(s,n);
  s.addNotes(sub+" : client-facing quoted figures only.");
}
costSlide(14,"Activation Cost",[
  ["Kiosk setup & build  (14 kiosks)", rupee(7757600)],
  ["Manpower  (sales, billing, supervision, city managers)", rupee(17038000)],
  ["Other elements  (logistics, insurance, hardware, operations)", rupee(6552000)],
  ["Sub-total  (ex-GST)", rupee(31347600),'sub'],
  ["Agency fee  (10%)", rupee(3134760)],
  ["GST  (18%)", rupee(6206825)],
  ["Total  (incl. GST)", rupee(40689185),'total'],
],"Turnkey operations for all 14 cities across the 42-day program. Add a media option (Multiplex or Atrium) for the all-in cost.");

costSlide(15,"Multiplex Option",[
  ["Cinema-foyer media  ·  14 PVR / INOX sites × ₹3,00,000 (6 wk)", rupee(4200000)],
  ["GST  (18%)", rupee(756000)],
  ["Media sub-total  (incl. GST)", rupee(4956000),'sub'],
  ["Operations  (incl. GST, from Activation Cost)", rupee(40689185)],
  ["Programme total, Multiplex  (incl. GST)", rupee(45645185),'total'],
],"PVR / INOX foyer activation, managed by ProMarcom. 100% advance; availability to be confirmed; rates subject to change.");

costSlide(16,"Atrium Option",[
  ["Mall-atrium media  ·  14 malls, per rate card (ex-GST)", rupee(14511750)],
  ["GST  (18%)", rupee(2612115)],
  ["Media sub-total  (incl. GST)", rupee(17123865),'sub'],
  ["Operations  (incl. GST, from Activation Cost)", rupee(40689185)],
  ["Programme total, Atrium  (incl. GST)", rupee(57813050),'total'],
],"Mall-atrium activation at the 14 preferred malls. Several locations subject to availability; rates indicative, per the rate card.");

// ============ 17 · SCOPE / TURNKEY ============
{
  const s=p.addSlide(); s.background={color:SOFT};
  kicker(s,"Turnkey Scope",0.6,0.6);
  s.addText("ProMarcom runs the whole programme",{x:0.55, y:0.95, w:11, h:0.7, fontSize:30, color:CHAR, fontFace:HEAD, bold:true});
  const scope=[["Kiosk build","Fabrication to the approved design"],["Transport & install","Delivery, on-site setup & finishing"],
    ["Manpower","Sales, billing, supervision, city managers"],["Logistics","Stock movement & replenishment"],
    ["Licences","Mall space negotiation & permissions"],["Daily operations","Reporting, cash management, upkeep"]];
  const bw=3.85, bh=1.75, gx=0.55, gy=2.0, gap=0.35;
  scope.forEach((sc,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=gx+col*(bw+gap), y=gy+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x, y, w:bw, h:bh, fill:{color:WHITE}, line:{color:LINE,width:1}});
    s.addShape(p.ShapeType.ellipse,{x:x+0.3, y:y+0.35, w:0.5, h:0.5, fill:{color:CHAR}});
    s.addText(String(i+1),{x:x+0.3, y:y+0.35, w:0.5, h:0.5, align:"center", valign:"middle", fontSize:18, color:GOLD, fontFace:HEAD, bold:true});
    s.addText(sc[0],{x:x+1.0, y:y+0.28, w:bw-1.15, h:0.4, fontSize:16, color:CHAR, fontFace:HEAD, bold:true});
    s.addText(sc[1],{x:x+1.0, y:y+0.72, w:bw-1.15, h:0.75, fontSize:12, color:MUTE, fontFace:BODY, lineSpacingMultiple:1.0, valign:"top"});
  });
  footer(s,17);
  s.addNotes("Turnkey scope: build, transport/install, manpower, logistics, licences, daily operations & reporting.");
}

// ============ 12 · CLOSING ============
{
  const s=p.addSlide(); s.background={color:INK};
  s.addImage({path:IMG.hero, x:6.9, y:0, w:6.43, h:7.5, sizing:{type:"cover", w:6.43, h:7.5}});
  s.addShape(p.ShapeType.rect,{x:6.9,y:0,w:2.0,h:H,fill:{color:INK,transparency:32}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.9,h:H,fill:{color:INK}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:0.16,h:H,fill:{color:GOLD}});
  s.addText("DOFT",{x:0.85, y:1.2, w:5, h:0.9, fontSize:44, color:GOLD, fontFace:HEAD, bold:true, charSpacing:5});
  s.addText("Let's light up Diwali.",{x:0.83, y:2.35, w:5.6, h:1.4, fontSize:34, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addShape(p.ShapeType.line,{x:0.9, y:3.75, w:2.2, h:0, line:{color:GOLD,width:1.5}});
  s.addText([{text:"Next:  ",options:{bold:true,color:GOLD}},
    {text:"detailed commercial proposal & costing:\nsetup, manpower, location charges, logistics, insurance & hardware.",options:{color:"D8CDB6"}}],
    {x:0.85, y:4.05, w:5.7, h:1.4, fontSize:15, fontFace:BODY, lineSpacingMultiple:1.15, valign:"top"});
  s.addText("ProMarcom",{x:0.85, y:6.1, w:4, h:0.5, fontSize:22, color:WHITE, fontFace:HEAD, bold:true});
  s.addText("Retail activation · pop-up · experiential",{x:0.87, y:6.6, w:6, h:0.35, fontSize:12, color:"9A9184", fontFace:BODY});
  s.addNotes("Closing: next step is the detailed commercial proposal & costing (separate workbook).");
}

p.writeFile({ fileName: "Doft_Kiosk_Concept_Presentation.pptx" }).then(f=>console.log("WROTE", f));
