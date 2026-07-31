const fs=require("fs");
// ---- Doft kiosk GA drawing sheet (Concept B) : Front / Side / Plan, dimensioned ----
const INK="#33302B",TERRA="#9E5A45",MAUVE="#4A343A",GOLD="#B8924A",ROSE="#C39A98",SAND="#EAE0CF",CREAM="#F7F2E9",LINE="#5b544c",HATCH="#C9B8A0";
const SERIF="Georgia,'DejaVu Serif',serif", SANS="Arial,'Liberation Sans',sans-serif";
const sc=0.20;                       // px per mm
const mm=v=>v*sc;
// real dims (mm)
const W=2440,D=2440,Hc=1050,Ho=2500,fasH=400,cnW=1600,cnD=600,dispW=1940,dispTop=1450,dispBot=760;
let S="";  // svg content

function rect(x,y,w,h,fill,stroke=LINE,sw=1.5,extra=""){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;}
function line(x1,y1,x2,y2,st=LINE,sw=1.2,dash=""){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${st}" stroke-width="${sw}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;}
function txt(x,y,t,s=15,c=INK,anchor="middle",f=SANS,w="normal",rot=0){return `<text x="${x}" y="${y}" font-family="${f}" font-size="${s}" fill="${c}" text-anchor="${anchor}" font-weight="${w}" ${rot?`transform="rotate(${rot} ${x} ${y})"`:''}>${t}</text>`;}
function tick(x,y,a){const d=5;return line(x-d*Math.cos(a),y-d*Math.sin(a),x+d*Math.cos(a),y+d*Math.sin(a),TERRA,1.4);}
// horizontal dimension between px x1..x2 at py, label
function dimH(x1,x2,py,label,ext1,ext2){let s="";if(ext1!=null)s+=line(x1,ext1,x1,py+6,TERRA,0.8);if(ext2!=null)s+=line(x2,ext2,x2,py+6,TERRA,0.8);
  s+=line(x1,py,x2,py,TERRA,1.2);s+=tick(x1,py,Math.PI/4)+tick(x2,py,Math.PI/4);
  s+=`<rect x="${(x1+x2)/2-52}" y="${py-11}" width="104" height="18" fill="${CREAM}"/>`+txt((x1+x2)/2,py+3,label,13,TERRA);return s;}
function dimV(y1,y2,px,label,ext1,ext2){let s="";if(ext1!=null)s+=line(ext1,y1,px-6,y1,TERRA,0.8);if(ext2!=null)s+=line(ext2,y2,px-6,y2,TERRA,0.8);
  s+=line(px,y1,px,y2,TERRA,1.2);s+=tick(px,y1,Math.PI/4)+tick(px,y2,Math.PI/4);
  s+=`<rect x="${px-9}" y="${(y1+y2)/2-52}" width="18" height="104" fill="${CREAM}"/>`+txt(px,(y1+y2)/2,label,13,TERRA,"middle",SANS,"normal",-90);return s;}
function label(x,y,t,s=13){return txt(x,y,t,s,INK,"middle",SANS);}
function heading(x,y,t){return txt(x,y,t,18,MAUVE,"start",SERIF,"bold");}

// ======= FRONT ELEVATION (top-left) =======
{const ox=130,oy=160, w=mm(W),h=mm(Ho),base=oy+h;
 S+=heading(ox,oy-24,"FRONT ELEVATION");
 // plinth
 S+=rect(ox,base-mm(120),w,mm(120),SAND);
 // body
 S+=rect(ox,oy+mm(fasH),w,h-mm(fasH)-mm(120),CREAM);
 // fascia
 S+=rect(ox,oy,w,mm(fasH),MAUVE,LINE,1.5);
 S+=txt(ox+w/2,oy+mm(fasH)/2+7,"D O F T",20,"#E9CD82","middle",SERIF,"bold");
 // display grid 3x3
 const gx=ox+(w-mm(dispW))/2, gy=oy+mm(fasH)+mm(120), gw=mm(dispW), gh=mm(dispTop-dispBot+ (dispTop-dispBot));
 const gH=mm(1050), gW=mm(dispW);
 const dgy=oy+mm(fasH)+mm(180);
 S+=rect(gx,dgy,gW,gH,"#FBF6EC",GOLD,2);
 for(let i=1;i<3;i++){S+=line(gx+i*gW/3,dgy,gx+i*gW/3,dgy+gH,GOLD,1.4);S+=line(gx,dgy+i*gH/3,gx+gW,dgy+i*gH/3,GOLD,1.4);}
 // counter
 const cnx=ox+(w-mm(cnW))/2, cny=base-mm(120)-mm(Hc), cw=mm(cnW);
 S+=rect(cnx,cny,cw,mm(Hc),CREAM,LINE,1.5);
 S+=rect(cnx-mm(40),cny-mm(60),cw+mm(80),mm(60),SAND,LINE,1.5);   // marble top
 S+=txt(cnx+cw/2,cny+mm(Hc)/2+6,"DOFT",15,GOLD,"middle",SERIF,"bold");
 // lock handles
 S+=rect(cnx+mm(300),cny+mm(300),4,20,GOLD,GOLD,1)+rect(cnx+cw-mm(300),cny+mm(300),4,20,GOLD,GOLD,1);
 // dims
 S+=dimH(ox,ox+w,base+34,"2440  (8'-0\")",base,base);
 S+=dimV(oy,base,ox-40,"2500  (8'-2\")",ox,ox);
 S+=dimV(cny,base-mm(120),ox+w+40,"1050",ox+w,ox+w);
 S+=txt(ox+w+70,(cny+base-mm(120))/2+120,"counter",12,INK,"middle",SANS,"normal",-90);
 S+=dimV(oy,oy+mm(fasH),ox+w+40,"400",ox+w,ox+w);
}

// ======= SIDE ELEVATION (top-right) =======
{const ox=1050,oy=160, dpx=mm(D),h=mm(Ho),base=oy+h;
 S+=heading(ox,oy-24,"SIDE ELEVATION");
 S+=rect(ox,base-mm(120),dpx,mm(120),SAND);                       // plinth
 // back cabinet (at back = left here), full height under fascia
 S+=rect(ox,oy+mm(fasH),mm(420),h-mm(fasH)-mm(120),CREAM,LINE,1.5);
 S+=rect(ox,oy,mm(420),mm(fasH),MAUVE,LINE,1.5);                  // fascia over back
 // counter at front (right)
 const cnx=ox+dpx-mm(cnD);
 S+=rect(cnx,base-mm(120)-mm(Hc),mm(cnD),mm(Hc),CREAM,LINE,1.5);
 S+=rect(cnx-mm(40),base-mm(120)-mm(Hc)-mm(60),mm(cnD)+mm(80),mm(60),SAND,LINE,1.5);
 // storage hatch inside counter
 S+=rect(cnx+8,base-mm(120)-mm(Hc)+8,mm(cnD)-16,mm(Hc)-16,"none",HATCH,1,'fill="url(#hatch)"');
 S+=txt(cnx+mm(cnD)/2,base-mm(120)-mm(Hc)/2,"storage",11,TERRA,"middle",SANS);
 // staff zone label
 S+=txt(ox+mm(420)+ (dpx-mm(420)-mm(cnD))/2, base-mm(500),"staff zone",12,INK);
 // dims
 S+=dimH(ox,ox+dpx,base+34,"2440  (8'-0\") depth",base,base);
 S+=dimH(cnx,ox+dpx,base+70,"600 counter",base,base);
 S+=dimV(oy,base,ox-40,"2500",ox,ox);
}

// ======= PLAN (bottom, wide) =======
{const ox=130,oy=820, w=mm(W),d=mm(D),base=oy+d;
 S+=heading(ox,oy-24,"PLAN  (looking down)");
 S+=rect(ox,oy,w,d,CREAM,LINE,2);                                  // footprint
 // display + base storage wall (back = top)
 S+=rect(ox,oy,w,mm(420),SAND,GOLD,1.6);
 S+=txt(ox+w/2,oy+mm(210)+5,"Backlit display wall + base storage",13,INK);
 // counter front-left
 const cnx=ox+(w-mm(cnW))/2-mm(160), cny=base-mm(cnD);
 S+=rect(cnx,cny,mm(cnW),mm(cnD),SAND,LINE,1.6);
 S+=rect(cnx+8,cny+8,mm(cnW)-16,mm(cnD)-16,"none",HATCH,1,'fill="url(#hatch)"');
 S+=txt(cnx+mm(cnW)/2,cny+mm(cnD)/2+5,"Counter + lockable storage",12,TERRA);
 // billing screen mark
 S+=rect(cnx+mm(cnW)-mm(220),cny-8,mm(180),8,MAUVE,MAUVE,1);
 // entry gap (front-right)
 const gapx=cnx+mm(cnW)+mm(40);
 S+=line(gapx,base,gapx,base-mm(600),TERRA,1.4,"6 4");
 S+=txt((gapx+ox+w)/2, base-mm(300),"STAFF",12,TERRA)+txt((gapx+ox+w)/2, base-mm(300)+16,"ENTRY",12,TERRA);
 // 2 stools
 const st=(x,z)=>`<circle cx="${x}" cy="${z}" r="${mm(160)}" fill="none" stroke="${ROSE}" stroke-width="1.6"/>`+txt(x,z+4,"stool",10,ROSE);
 S+=st(cnx+mm(300),cny-mm(360))+st(cnx+mm(900),cny-mm(340));
 // fire ext + bin marks
 S+=`<circle cx="${ox+mm(160)}" cy="${oy+mm(560)}" r="7" fill="#8E3B32"/>`+txt(ox+mm(160)+34,oy+mm(560)+4,"FE",9,INK,"start");
 // dims
 S+=dimH(ox,ox+w,base+34,"2440  (8'-0\")",base,base);
 S+=dimV(oy,base,ox-40,"2440  (8'-0\")",ox,ox);
 S+=dimH(cnx,cnx+mm(cnW),cny-mm(500),"1600 counter",cny,cny);
 S+=dimH(gapx,ox+w,base-mm(700),"~600 entry",base-mm(600),base);
}

// ======= TITLE BLOCK (bottom-right) =======
{const bx=1120,by=770,bw=710,bh=430;
 S+=rect(bx,by,bw,bh,"#FFFFFF",LINE,1.5);
 S+=rect(bx,by,bw,44,MAUVE,MAUVE,1);
 S+=txt(bx+16,by+29,"DOFT CANDLES — DIWALI POP-UP KIOSK",16,"#F3ECE0","start",SERIF,"bold");
 const rows=[["Drawing","General Arrangement — Concept B (The Gallery)"],["Footprint","2440 × 2440 mm  (8'-0\" × 8'-0\")"],["Overall height","≈ 2500 mm  (8'-2\")"],["Counter","1600 × 600 mm, top at 1050 mm (3'-5\")"],["Storage","Lockable, within counter + back-wall base units (≈ 40 sq ft)"],["Seating","2 × bar stools in staff zone"],["Units","mm (feet-inches in brackets).  Not to scale — indicative."]];
 rows.forEach((r,i)=>{const y=by+72+i*40;S+=txt(bx+16,y,r[0],12,TERRA,"start",SANS,"bold");S+=txt(bx+150,y,r[1],12,INK,"start");S+=line(bx+8,y+14,bx+bw-8,y+14,"#E4DBCE",0.8);});
 S+=txt(bx+16,by+bh-14,"Prepared by ProMarcom",11,INK,"start",SANS,"italic");
}

const SVG=`<svg width="1900" height="1520" viewBox="0 0 1900 1520" xmlns="http://www.w3.org/2000/svg">
 <defs><pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="8" stroke="${HATCH}" stroke-width="1"/></pattern></defs>
 <rect width="1900" height="1520" fill="#FBF7EF"/>
 <rect x="30" y="30" width="1840" height="1460" fill="none" stroke="${LINE}" stroke-width="2"/>
 ${S}
</svg>`;
fs.writeFileSync("drawings.html","<!doctype html><html><body style='margin:0'>"+SVG+"</body></html>");
console.log("wrote drawings.html");
