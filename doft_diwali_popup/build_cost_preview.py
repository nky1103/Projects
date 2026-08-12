#!/usr/bin/env python3
"""Render a visual preview (HTML) of the cost workbook, values computed in Python."""
def inr(n):
    if n is None or n=="": return ""
    return "₹"+format(int(round(n)),",d")

NK=14
# ---- data (mirrors build_cost_workbook.py) ----
setup=[("Structure & framework",55000),("Body cladding & finish",60000),("Counters",45000),
 ("Brass gallery shelving & display",45000),("Backlit brand signage",40000),("Lighting",25000),
 ("Electrical",15000),("Flooring & platform",18000),("Digital brand screen + stand",12000),
 ("Furniture (table + 4 chairs)",15000),("Graphics, styling & props",8000),("Transport, install & dismantle",12000)]
setup_pk=sum(v for _,v in setup); setup_prog=setup_pk*NK

manp=[("Sales Executive","5 × ₹1,600/day × 45",5*1600*45),("Helper","2 × ₹1,200/day × 42",2*1200*42),
 ("Supervisor","1 × ₹1,800/day × 42",1800*42),("Training Support","1-day training",15000),
 ("Store Operations & Cash","lump",10000),("Reporting","₹150/day × 45",6750)]
manp_pk=sum(v for *_,v in manp)
city=[("City Manager","1 per city",50000),("Trained Backup Bench","per city",20000)]
city_pc=sum(v for *_,v in city)
manp_prog=(manp_pk+city_pc)*NK

loc=[("Delhi NCR","Select City Walk","Mac Atrium",840000),("Noida","DLF Mall of India","Main Atrium",728000),
 ("Gurgaon","Ambience Mall","Uniqlo Atrium",840000),("Chandigarh","Elante Mall","Atrium",728000),
 ("Lucknow","Lulu Mall","Atrium",532000),("Mumbai (BKC)","Jio World Drive","GF Atrium",784000),
 ("Mumbai (LP)","Phoenix Palladium","Courtyard",840000),("Ahmedabad","Palladium","Atrium",784000),
 ("Nagpur","VR Mall","Atrium",308000),("Kolkata","South City Mall","Main Atrium",336000),
 ("Chennai","Phoenix Market City","Atrium",700000),("Bengaluru","Phoenix Market City","Main Atrium",560000),
 ("Hyderabad","Sarath City Capital","Main Atrium",532000),("Kochi","Lulu Intl Mall","Main Atrium",840000)]
loc_total=sum(v for *_,v in loc)

other=[("Logistics","Pickup, first fill, replenishment, return",25000),("Warehouse","Seasonal storage",15000),
 ("Insurance - Fire","Mall fire insurance",10000),("Insurance - Transport","Stock in transit",12000),
 ("Extended Trading","Select cities (Xmas & NY)",20000),("Dismantle & Stock Return","Post-season",10000),
 ("Final Reconciliation","Season review",0),("Billing Hardware","EDC / printer / tablet",None),
 ("Billing Software","POS / billing licence",None),("Security Deposit (refundable)","Mall / statutory",None)]
other_pk=sum(v for *_,v in other if isinstance(v,(int,float)))
other_prog=other_pk*NK

sub=setup_prog+manp_prog+other_prog+loc_total
mgmt=sub*0.10; sub2=sub+mgmt; gst=sub2*0.18; grand=sub2+gst; perk=grand/NK

cities=[("Delhi","Select Citywalk","North"),("Noida","DLF Mall of India","North"),("Gurgaon","Ambience Mall","North"),
 ("Chandigarh","Elante Mall","North"),("Lucknow","Lulu Mall","North"),("Mumbai (BKC)","Jio World Mall","West"),
 ("Mumbai (Lower Parel)","Phoenix Palladium","West"),("Ahmedabad","Phoenix / Palladium","West"),("Nagpur","VR Mall","West"),
 ("Kolkata","South City Mall","East"),("Chennai","Phoenix Marketcity","South"),("Bengaluru","Phoenix Marketcity","South"),
 ("Hyderabad","Phoenix / Sarath City","South"),("Kochi","Lulu International Mall","South")]

def tbl(rows):
    return "".join("<tr>"+"".join(f"<td class='{c}'>{v}</td>" for v,c in r)+"</tr>" for r in rows)

def sheet(title, sub, headhtml, bodyhtml):
    return f"""<div class='sh'>
      <div class='hd'><b>{title}</b><span>{sub}</span></div>
      <table>{headhtml}{bodyhtml}</table></div>"""

def head(cols): return "<tr class='h'>"+"".join(f"<th class='{c}'>{t}</th>" for t,c in cols)+"</tr>"

# SUMMARY
sumrows=[
 [("A. Kiosk setup & build","l"),(inr(setup_pk),"r"),(inr(setup_prog),"r"),("Design, fabrication, install, dismantle","n")],
 [("B. Manpower","l"),(inr(manp_pk+city_pc),"r"),(inr(manp_prog),"r"),("Sales, billing, supervision, city mgr","n")],
 [("C. Other elements","l"),(inr(other_pk),"r"),(inr(other_prog),"r"),("Logistics, warehouse, insurance, ops","n")],
 [("D. Location / mall space","l"),("n/a","r"),(inr(loc_total),"r"),("3-day rate card, ex-GST; 6-wk TBD","n")],
 [("Programme sub-total (ex-GST)","lb"),("","r"),(inr(sub),"rb"),("","n")],
 [("Management fee (10%)","l"),("","r"),(inr(mgmt),"r"),("% of sub-total","n")],
 [("Sub-total incl. fee","lb"),("","r"),(inr(sub2),"rb"),("","n")],
 [("GST (18%)","l"),("","r"),(inr(gst),"r"),("on sub-total incl. fee","n")],
 [("GRAND TOTAL (incl. GST)","lt"),("","rt"),(inr(grand),"rt"),("","nt")],
 [("Per-kiosk average (incl. GST)","lg"),("","rg"),(inr(perk),"rg"),("","ng")],
]
sumhead=head([("Cost Head","l"),("Per kiosk","r"),("Programme (14)","r"),("Notes","n")])
S_sum=sheet("Summary","Programme cost roll-up · 14 malls · 8×8 ft · figures from your ops sheet + mall rate card",
  sumhead, tbl(sumrows))

# CITIES
crows=[[(str(i+1),"c"),(c[0],"l"),(c[1],"l"),(c[2],"c")] for i,c in enumerate(cities)]
S_cit=sheet("Cities List","Revised preferred-mall list (14)",
  head([("#","c"),("City","l"),("Preferred Mall","l"),("Region","c")]), tbl(crows))

# SETUP
srows=[[(str(i+1),"c"),(n,"l"),(inr(v),"r")] for i,(n,v) in enumerate(setup)]
srows.append([("","c"),("Per-kiosk setup total","lb"),(inr(setup_pk),"rb")])
srows.append([("","c"),("Programme setup (×14)","lg"),(inr(setup_prog),"rg")])
S_set=sheet("Setup Cost","Kiosk build ₹3.5L/kiosk · indicative component split",
  head([("#","c"),("Component","l"),("Amount / kiosk","r")]), tbl(srows))

# MANPOWER
mrows=[[(n,"l"),(b,"n"),(inr(v),"r")] for n,b,v in manp]
mrows.append([("Per-kiosk subtotal","lb"),("","n"),(inr(manp_pk),"rb")])
mrows+=[[(n,"l"),(b,"n"),(inr(v),"r")] for n,b,v in city]
mrows.append([("Per-city subtotal","lb"),("","n"),(inr(city_pc),"rb")])
mrows.append([("Programme manpower (×14)","lg"),("","ng"),(inr(manp_prog),"rg")])
S_mp=sheet("Manpower Cost","Per-kiosk team + city-level roles",
  head([("Role","l"),("Basis","n"),("Amount / kiosk","r")]), tbl(mrows))

# LOCATION
lrows=[[(str(i+1),"c"),(c,"l"),(m,"l"),(a,"n"),(inr(v),"r"),("","r")] for i,(c,m,a,v) in enumerate(loc)]
lrows.append([("","c"),("Total mall space (3-day, ex-GST)","lb"),("","l"),("","n"),(inr(loc_total),"rb"),("","r")])
S_loc=sheet("Location Charges","Mall activation rate card · 3-day (Fri–Sun), ex-GST · 6-wk licence TBD",
  head([("#","c"),("City","l"),("Mall","l"),("Location","n"),("3-day rate","r"),("6-wk licence","r")]), tbl(lrows))

# OTHER
orows=[[(n,"l"),(s,"n"),(inr(v) if v is not None else "<i>blank (TBD)</i>","r")] for n,s,v in other]
orows.append([("Per-kiosk other subtotal","lb"),("","n"),(inr(other_pk),"rb")])
orows.append([("Programme other (×14)","lg"),("","ng"),(inr(other_prog),"rg")])
S_oth=sheet("Other Elements","Logistics, insurance, ops · hardware/software/deposits blank",
  head([("Element","l"),("Scope","n"),("Amount / kiosk","r")]), tbl(orows))

html=f"""<!doctype html><html><head><meta charset='utf-8'><style>
*{{margin:0;padding:0;box-sizing:border-box}} html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#2A2621;padding:26px 30px}}
.top{{border-bottom:2px solid #C6A24E;padding-bottom:10px;margin-bottom:16px}}
.top b{{font-family:Georgia,serif;font-size:22pt;color:#2B2621;letter-spacing:.04em}}
.top b span{{color:#C6A24E}}
.top .s{{font-size:10.5pt;color:#857B6C;margin-top:3px}}
.sh{{margin:0 0 20px}}
.hd{{background:#2B2621;color:#fff;padding:7px 12px;border-radius:4px 4px 0 0}}
.hd b{{font-family:Georgia,serif;font-size:12.5pt}} .hd span{{color:#C9BFAD;font-size:9.5pt;margin-left:10px}}
table{{width:100%;border-collapse:collapse;font-size:9.5pt}}
th,td{{border:1px solid #E4DCC9;padding:4px 8px;text-align:left;vertical-align:middle}}
tr.h th{{background:#F0ECE1;color:#2B2621;font-weight:700;font-size:9pt}}
td.r,th.r{{text-align:right;font-variant-numeric:tabular-nums}} td.c,th.c{{text-align:center}}
td.n,th.n{{color:#857B6C;font-size:8.7pt}}
td.l{{font-weight:600}}
td.lb,td.rb{{background:#F0ECE1;font-weight:700}}
td.lg,td.rg,td.ng{{background:#EFE0BC;font-weight:700;color:#7a5b12}}
td.lt,td.rt,td.nt{{background:#2B2621;color:#C6A24E;font-weight:700;font-size:11pt}}
i{{color:#b08a3c}}
</style></head><body>
<div class='top'><b>DOFT <span>×</span> ProMarcom</b><div class='s'>Diwali Pop-Up Kiosk · Detailed Cost Workbook · preview (values recalculate live in Excel)</div></div>
{S_sum}{S_set}{S_mp}{S_loc}{S_oth}{S_cit}
<div style='font-size:8.6pt;color:#857B6C;margin-top:6px;line-height:1.5'>
Basis: figures from the execution-agency ops sheet (build + manpower + logistics + insurance) and the mall activation rate card.
Location/mall space is a 3-day (Fri–Sun) rate card, ex-GST; 6-week festive licence, CAM, electricity & deposits to be negotiated (blank).
Management fee modelled at 10% of sub-total. All rates indicative; confirm against vendor, mall & statutory quotes.</div>
</body></html>"""
open("cost_preview.html","w").write(html)
print("grand total:",inr(grand),"| per-kiosk:",inr(perk),"| subtotal:",inr(sub))
print("A/B/C/D:",inr(setup_prog),inr(manp_prog),inr(other_prog),inr(loc_total))
