// DOFT × ProMarcom — Diwali Pop-Up Kiosk : Concept Presentation
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";
p.author = "ProMarcom"; p.company = "ProMarcom";

// ---- palette ----
const EMER="1E4D39", EMERD="123528", GOLD="C6A24E", GOLDD="A9813A",
      CREAM="F6F1E6", IVORY="FCF8EF", INK="2C2924", WHITE="FFFFFF", MUTE="7A7264", LINE="E4DCC9";
const HEAD="Cambria", BODY="Calibri";
const W=13.333, H=7.5;

// ---- reusable bits ----
function footer(s, n){
  s.addText([{text:"DOFT", options:{bold:true,color:GOLD,fontFace:HEAD}},
             {text:"  ·  SCENTED MEMORIES  ·  Diwali Pop-Up Kiosk Concept", options:{color:MUTE}}],
    {x:0.5, y:7.02, w:8, h:0.35, fontSize:9.5, fontFace:BODY, align:"left", valign:"middle", charSpacing:1});
  s.addText("ProMarcom", {x:11.0, y:7.02, w:1.85, h:0.35, fontSize:9.5, color:MUTE, fontFace:BODY, align:"right", valign:"middle"});
  // gold ring page number
  s.addShape(p.ShapeType.ellipse, {x:12.55, y:6.96, w:0.44, h:0.44, fill:{color:WHITE}, line:{color:GOLD, width:1}});
  s.addText(String(n), {x:12.55, y:6.96, w:0.44, h:0.44, align:"center", valign:"middle", fontSize:11, color:EMER, fontFace:HEAD, bold:true});
}
function kicker(s, txt, x, y, color){
  s.addText(txt.toUpperCase(), {x, y, w:6, h:0.3, fontSize:12.5, color:color||GOLDD, fontFace:BODY, bold:true, charSpacing:3, align:"left"});
}
// full-bleed-ish render on one side + emerald text panel on the other
function designSlide(n, side, img, title, kick, specs){
  const s=p.addSlide(); s.background={color:IVORY};
  const panelW=4.7, imgW=W-panelW;
  const panelX = side==="left" ? 0 : imgW;
  const imgX = side==="left" ? panelW : 0;
  // render area (light)
  s.addShape(p.ShapeType.rect,{x:imgX,y:0,w:imgW,h:H,fill:{color:"EFEBE1"}});
  s.addImage({path:img, x:imgX+0.15, y:0.5, w:imgW-0.3, h:6.2, sizing:{type:"contain", w:imgW-0.3, h:6.2}});
  // emerald panel
  s.addShape(p.ShapeType.rect,{x:panelX,y:0,w:panelW,h:H,fill:{color:EMER}});
  s.addShape(p.ShapeType.rect,{x: side==="left"?panelW-0.04:panelX, y:0, w:0.04, h:H, fill:{color:GOLD}});
  const tx = panelX+0.55;
  kicker(s, kick, tx, 0.95, GOLD);
  s.addText(title,{x:tx, y:1.35, w:panelW-1.0, h:1.5, fontSize:30, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addShape(p.ShapeType.line,{x:tx, y:2.95, w:0.9, h:0, line:{color:GOLD, width:1.5}});
  let yy=3.25;
  specs.forEach(sp=>{
    s.addText([{text:"—  ",options:{color:GOLD}},{text:sp,options:{color:"EDE7D8"}}],
      {x:tx, y:yy, w:panelW-0.95, h:0.7, fontSize:14.5, fontFace:BODY, valign:"top", lineSpacingMultiple:1.02});
    yy+=0.72;
  });
  footer(s,n);
  return s;
}

// ============ 1 · COVER ============
{
  const s=p.addSlide(); s.background={color:EMER};
  s.addImage({path:"r_D_hero.png", x:4.5, y:0, w:8.833, h:7.5, sizing:{type:"cover", w:8.833, h:7.5}});
  // emerald scrim over full, stronger on left
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.6,h:H,fill:{color:EMER}});
  s.addShape(p.ShapeType.rect,{x:6.6,y:0,w:2.6,h:H,fill:{color:EMER,transparency:35}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:0.16,h:H,fill:{color:GOLD}});
  s.addText([{text:"DOFT",options:{fontSize:66,bold:true,color:GOLD,fontFace:HEAD,charSpacing:6}}],
    {x:0.85, y:1.25, w:6, h:1.2, align:"left"});
  s.addText("SCENTED MEMORIES",{x:0.95, y:2.45, w:6, h:0.4, fontSize:16, color:"E7DFC9", fontFace:BODY, charSpacing:6});
  s.addShape(p.ShapeType.line,{x:0.9, y:3.15, w:2.4, h:0, line:{color:GOLD,width:1.5}});
  s.addText("Diwali Pop-Up Retail Kiosk",{x:0.85, y:3.4, w:6.0, h:1.4, fontSize:38, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addText("Concept Design  ·  Premium home-fragrance island",{x:0.87, y:4.75, w:6.0, h:0.5, fontSize:15.5, color:"D9E4DC", fontFace:BODY});
  s.addText([{text:"8 ft × 8 ft",options:{bold:true,color:GOLD}},{text:"   ·   14 malls   ·   ~6 weeks festive window",options:{color:"CFDAD1"}}],
    {x:0.87, y:5.3, w:6.0, h:0.4, fontSize:14, fontFace:BODY});
  s.addText("Presented by",{x:0.87, y:6.35, w:3, h:0.3, fontSize:11, color:"A9BBAE", fontFace:BODY, charSpacing:2});
  s.addText("ProMarcom",{x:0.85, y:6.62, w:4, h:0.5, fontSize:22, color:WHITE, fontFace:HEAD, bold:true});
  s.addNotes("Cover — DOFT Diwali Pop-Up Retail Kiosk concept, premium home-fragrance island, 8x8 ft, 14 malls, presented by ProMarcom.");
}

// ============ 2 · THE OPPORTUNITY ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"The Opportunity",0.6,0.6);
  s.addText("A premium festive stage for Doft Candles",
    {x:0.55, y:0.95, w:7.4, h:1.4, fontSize:32, color:EMER, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addText([
    {text:"Doft Candles is a premium home-fragrance brand. For the Diwali gifting season we take the brand into India's highest-footfall malls with a turnkey pop-up retail kiosk — a compact, luxurious island that sells and tells the Doft story.\n\n",options:{}},
    {text:"Product range:  ",options:{bold:true,color:EMER}},
    {text:"scented candles · reed diffusers · room sprays · wax melts · premium gift hampers.",options:{}}
  ],{x:0.55, y:2.5, w:6.7, h:2.6, fontSize:15, color:INK, fontFace:BODY, lineSpacingMultiple:1.15, valign:"top"});
  // stat cards (right)
  const stats=[["14","Premium malls\nPan-India"],["8×8","Feet island\n64 sq ft"],["~6","Weeks festive\n+ Xmas / NY"],["Turnkey","Design → build →\noperate"]];
  const bx=7.7, bw=2.55, bh=2.35, gap=0.35;
  stats.forEach((st,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=bx+col*(bw+gap), y=1.05+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x,y,w:bw,h:bh,fill:{color:IVORY},line:{color:LINE,width:1}});
    s.addText(st[0],{x:x, y:y+0.3, w:bw, h:0.95, align:"center", fontSize:40, color:GOLDD, fontFace:HEAD, bold:true});
    s.addText(st[1],{x:x+0.15, y:y+1.35, w:bw-0.3, h:0.85, align:"center", fontSize:12.5, color:EMER, fontFace:BODY, lineSpacingMultiple:0.98});
  });
  footer(s,2);
  s.addNotes("The opportunity — premium home fragrance brand, Diwali gifting, 14 malls, 8x8 kiosk, turnkey.");
}

// ============ 3 · DESIGN CONCEPT ============
{
  const s=p.addSlide(); s.background={color:IVORY};
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.2,h:H,fill:{color:WHITE}});
  kicker(s,"Design Concept",0.6,0.65);
  s.addText("The DOFT Island",{x:0.55, y:1.0, w:5.4, h:0.9, fontSize:34, color:EMER, fontFace:HEAD, bold:true});
  s.addText("A premium open island that reads unmistakably Doft from every aisle — luxury build language wrapped in the brand's own green-and-gold identity.",
    {x:0.55, y:1.95, w:5.2, h:1.3, fontSize:14.5, color:INK, fontFace:BODY, lineSpacingMultiple:1.12, valign:"top"});
  const feats=[
    ["Warm-backlit brand totem","Illuminated DOFT seal rising above the counter — a beacon across the mall court."],
    ["White lacquer + brushed gold","Fluted, backlit bases and gold-framed glass showcases for a jewellery-counter feel."],
    ["Emerald brand niches","Backlit green display bays carry Doft's signature retail colour and warm product glow."],
    ["Designed to sell & store","Lockable stock storage, cash safe and staff seating built in — clean front, working back."],
  ];
  let yy=3.35;
  feats.forEach(f=>{
    s.addShape(p.ShapeType.ellipse,{x:0.55, y:yy+0.05, w:0.16, h:0.16, fill:{color:GOLD}});
    s.addText(f[0],{x:0.85, y:yy-0.1, w:5.1, h:0.35, fontSize:14.5, color:EMER, fontFace:HEAD, bold:true});
    s.addText(f[1],{x:0.85, y:yy+0.24, w:5.1, h:0.55, fontSize:11.5, color:MUTE, fontFace:BODY, lineSpacingMultiple:1.0, valign:"top"});
    yy+=0.9;
  });
  s.addImage({path:"r_D_right.png", x:6.35, y:0.75, w:6.7, h:6.0, sizing:{type:"contain", w:6.7, h:6.0}});
  footer(s,3);
  s.addNotes("Design concept — the DOFT Island: premium build language + Doft green/gold identity + warm backlit totem + built-in storage.");
}

// ============ 4-7 · DESIGN VIEWS ============
designSlide(4,"left","r_D_left.png","Left three-quarter","Design · Elevation A",
  ["White-lacquer body with brushed-gold reveals","Warm-backlit fluted base panels","Gold-framed glass showcases with candles","DOFT wordmark on every customer face"]);
designSlide(5,"right","r_D_right.png","Right three-quarter","Design · Elevation B",
  ["Backlit emerald display niches","Illuminated DOFT seal totem beacon","Marble counter tops, brushed-gold trim","Dried-floral styling — Doft's retail signature"]);
designSlide(6,"left","r_D_l45.png","Cross-section · 45° left","Design · Interior",
  ["Lockable under-counter stock storage","Two bar stools for staff seating","Emerald staff-zone floor","Front stays clean & fully branded"]);
designSlide(7,"right","r_D_r45.png","Cross-section · 45° right","Design · Interior",
  ["Lockable storage both sides","In-built cash safe","Clear staff entry to the rear","~ working island, premium storefront"]);

// ============ 8 · TOP LAYOUT ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Top Layout · Plan",0.6,0.5);
  s.addText("8 ft × 8 ft island footprint",{x:0.55, y:0.85, w:9, h:0.6, fontSize:28, color:EMER, fontFace:HEAD, bold:true});
  s.addImage({path:"view_kiosk_plan.png", x:0.5, y:1.5, w:8.55, h:5.6, sizing:{type:"contain", w:8.55, h:5.6}});
  const pts=[["U-shaped display counter","Wraps three customer faces"],
             ["Central totem","Backlit DOFT seal beacon"],
             ["Lockable storage","Both side runs + cash safe"],
             ["Staff entry","Clear opening to the rear"],
             ["Seating","Two bar stools inside"]];
  let yy=1.85;
  s.addShape(p.ShapeType.rect,{x:9.35, y:1.55, w:3.45, h:5.35, fill:{color:IVORY}, line:{color:LINE,width:1}});
  s.addText("KEY ZONES",{x:9.65, y:1.75, w:3, h:0.35, fontSize:13, color:GOLDD, fontFace:BODY, bold:true, charSpacing:2});
  yy=2.35;
  pts.forEach(pt=>{
    s.addShape(p.ShapeType.ellipse,{x:9.66, y:yy+0.04, w:0.14, h:0.14, fill:{color:GOLD}});
    s.addText(pt[0],{x:9.95, y:yy-0.12, w:2.7, h:0.32, fontSize:13.5, color:EMER, fontFace:HEAD, bold:true});
    s.addText(pt[1],{x:9.95, y:yy+0.2, w:2.7, h:0.4, fontSize:11, color:MUTE, fontFace:BODY});
    yy+=0.86;
  });
  footer(s,8);
  s.addNotes("Top layout — dimensioned 2D plan of the 8x8 island: U-counter, central totem, lockable storage, cash safe, staff entry, seating.");
}

// ============ 9 · MATERIALS & FINISHES ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Materials & Finishes",0.6,0.6);
  s.addText("A premium, warm material palette",{x:0.55, y:0.95, w:9, h:0.7, fontSize:30, color:EMER, fontFace:HEAD, bold:true});
  const sw=[["Emerald lacquer",EMER,"Brand niches & fascia"],
            ["Brushed gold",GOLD,"Frames, trims & reveals"],
            ["White lacquer","F0ECE3","Counter & totem body"],
            ["Cream marble","E7DECB","Counter tops"],
            ["Warm LED glow","F3D9A6","Backlit reveals & seal"],
            ["Charcoal","2C2924","Skirting & accents"]];
  const bw=3.75, bh=2.15, gx=0.55, gy=2.0, gap=0.5;
  sw.forEach((c,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=gx+col*(bw+gap), y=gy+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x, y, w:bw, h:1.35, fill:{color:c[1]}, line:{color:LINE,width:0.75}});
    s.addText(c[0],{x, y:y+1.42, w:bw, h:0.35, fontSize:15, color:EMER, fontFace:HEAD, bold:true});
    s.addText(c[2],{x, y:y+1.75, w:bw, h:0.3, fontSize:11.5, color:MUTE, fontFace:BODY});
  });
  footer(s,9);
  s.addNotes("Materials — emerald lacquer, brushed gold, white lacquer, cream marble, warm LED, charcoal.");
}

// ============ 10 · PRODUCT STORY ============
{
  const s=p.addSlide(); s.background={color:EMER};
  kicker(s,"The Range",0.6,0.6,GOLD);
  s.addText("Merchandising the Doft story",{x:0.55, y:0.95, w:9, h:0.7, fontSize:30, color:WHITE, fontFace:HEAD, bold:true});
  s.addText("Backlit shelving and glass showcases stage the full gifting range at eye level.",
    {x:0.55, y:1.65, w:9, h:0.4, fontSize:14, color:"D9E4DC", fontFace:BODY});
  const imgs=[["brief_assets/DOFT/16871dda-65d9-4f51-acfd-b2b5ad6183e9.JPG","Scented candles"],
              ["brief_assets/DOFT/5dc4e2f7-31d9-4a47-ba1e-1ed1f98adf47.JPG","Gift hampers"],
              ["brief_assets/DOFT/14f3dd5c-717d-40c6-9314-74ee5f820af0.JPG","Reed diffusers & sprays"],
              ["brief_assets/DOFT/66d435a3-c7c1-44d9-b723-01f7df92b433.JPG","Festive gift boxes"]];
  const bw=2.85, gx=0.55, gy=2.35, gap=0.35, bh=2.55;
  imgs.forEach((im,i)=>{
    const x=gx+i*(bw+gap);
    s.addShape(p.ShapeType.rect,{x, y:gy, w:bw, h:bh, fill:{color:IVORY}, line:{color:GOLD,width:1}});
    s.addImage({path:im[0], x:x+0.12, y:gy+0.12, w:bw-0.24, h:bh-0.7, sizing:{type:"cover", w:bw-0.24, h:bh-0.7}});
    s.addText(im[1],{x:x, y:gy+bh-0.5, w:bw, h:0.4, align:"center", fontSize:12.5, color:EMER, fontFace:HEAD, bold:true});
  });
  footer(s,10);
  s.addNotes("Product story — candles, gift hampers, reed diffusers, room sprays & wax melts merchandised on backlit shelving.");
}

// ============ 11 · CITIES & MALLS ============
{
  const s=p.addSlide(); s.background={color:WHITE};
  kicker(s,"Footprint",0.6,0.5);
  s.addText("14 premium malls, pan-India",{x:0.55, y:0.85, w:9, h:0.6, fontSize:30, color:EMER, fontFace:HEAD, bold:true});
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
    s.addText([{text:m[0]+"   ",options:{bold:true,color:EMER,fontFace:HEAD}},
               {text:m[1],options:{color:MUTE,fontFace:BODY}}],
      {x:x+0.28, y:y-0.03, w:colW-0.3, h:0.45, fontSize:13.5, valign:"middle"});
  });
  s.addShape(p.ShapeType.rect,{x:0.55, y:6.35, w:12.2, h:0.55, fill:{color:IVORY}, line:{color:LINE,width:1}});
  s.addText([{text:"Same festive window across all locations.  ",options:{bold:true,color:EMER}},
    {text:"Select high-performing malls extended through Christmas & New Year.",options:{color:INK}}],
    {x:0.75, y:6.35, w:11.8, h:0.55, fontSize:12.5, fontFace:BODY, valign:"middle"});
  footer(s,11);
  s.addNotes("14 malls pan-India as per revised client list. Same window; select extend to Xmas/NY.");
}

// ============ 12 · SCOPE / TURNKEY ============
{
  const s=p.addSlide(); s.background={color:IVORY};
  kicker(s,"Turnkey Scope",0.6,0.6);
  s.addText("ProMarcom runs the whole programme",{x:0.55, y:0.95, w:11, h:0.7, fontSize:30, color:EMER, fontFace:HEAD, bold:true});
  const scope=[["Kiosk design","Concept, 3D & GA drawings"],["Build & install","Fabrication, transport, on-site setup"],
    ["Manpower","Sales, billing, supervision, city managers"],["Logistics","Stock movement & replenishment"],
    ["Licences","Mall space negotiation & permissions"],["Daily operations","Reporting, cash management, upkeep"]];
  const bw=3.85, bh=1.75, gx=0.55, gy=2.0, gap=0.35;
  scope.forEach((sc,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=gx+col*(bw+gap), y=gy+row*(bh+gap);
    s.addShape(p.ShapeType.rect,{x, y, w:bw, h:bh, fill:{color:WHITE}, line:{color:LINE,width:1}});
    s.addShape(p.ShapeType.ellipse,{x:x+0.3, y:y+0.35, w:0.5, h:0.5, fill:{color:EMER}});
    s.addText(String(i+1),{x:x+0.3, y:y+0.35, w:0.5, h:0.5, align:"center", valign:"middle", fontSize:18, color:GOLD, fontFace:HEAD, bold:true});
    s.addText(sc[0],{x:x+1.0, y:y+0.28, w:bw-1.15, h:0.4, fontSize:16, color:EMER, fontFace:HEAD, bold:true});
    s.addText(sc[1],{x:x+1.0, y:y+0.72, w:bw-1.15, h:0.75, fontSize:12, color:MUTE, fontFace:BODY, lineSpacingMultiple:1.0, valign:"top"});
  });
  footer(s,12);
  s.addNotes("Turnkey scope — design, build/install, manpower, logistics, licences, daily operations & reporting.");
}

// ============ 13 · CLOSING ============
{
  const s=p.addSlide(); s.background={color:EMER};
  s.addImage({path:"r_D_left.png", x:6.9, y:0, w:6.43, h:7.5, sizing:{type:"cover", w:6.43, h:7.5}});
  s.addShape(p.ShapeType.rect,{x:6.9,y:0,w:2.2,h:H,fill:{color:EMER,transparency:30}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:6.9,h:H,fill:{color:EMER}});
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:0.16,h:H,fill:{color:GOLD}});
  s.addText("DOFT",{x:0.85, y:1.2, w:5, h:0.9, fontSize:44, color:GOLD, fontFace:HEAD, bold:true, charSpacing:5});
  s.addText("Let's light up Diwali.",{x:0.83, y:2.35, w:5.6, h:1.4, fontSize:34, color:WHITE, fontFace:HEAD, bold:true, lineSpacingMultiple:0.98});
  s.addShape(p.ShapeType.line,{x:0.9, y:3.75, w:2.2, h:0, line:{color:GOLD,width:1.5}});
  s.addText([{text:"Next  ",options:{bold:true,color:GOLD}},
    {text:"— detailed commercial proposal & costing:\nsetup, manpower, location charges, logistics, insurance & hardware.",options:{color:"E7DFC9"}}],
    {x:0.85, y:4.05, w:5.7, h:1.4, fontSize:15, fontFace:BODY, lineSpacingMultiple:1.15, valign:"top"});
  s.addText("ProMarcom",{x:0.85, y:6.1, w:4, h:0.5, fontSize:22, color:WHITE, fontFace:HEAD, bold:true});
  s.addText("Retail activation · pop-up · experiential",{x:0.87, y:6.6, w:6, h:0.35, fontSize:12, color:"A9BBAE", fontFace:BODY});
  s.addNotes("Closing — next step is the detailed commercial proposal & costing (separate workbook).");
}

p.writeFile({ fileName: "Doft_Kiosk_Concept_Presentation.pptx" }).then(f=>console.log("WROTE", f));
