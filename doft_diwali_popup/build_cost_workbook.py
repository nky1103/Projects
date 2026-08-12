#!/usr/bin/env python3
"""DOFT x ProMarcom - Diwali Pop-Up Kiosk : detailed cost workbook.
Figures sourced from the execution-agency ops sheet and the mall activation
rate card supplied by the client. Blank cells = details not yet available."""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

INR='₹#,##0'; PCT='0.0%'
CHAR="2B2621"; GOLD="C6A24E"; GOLDD="A9813A"; INK="1E1B17"
HEADF=PatternFill("solid",fgColor=CHAR); GOLDF=PatternFill("solid",fgColor="EFE0BC")
INPUTF=PatternFill("solid",fgColor="FBEFC8"); SUBF=PatternFill("solid",fgColor="F0ECE1")
TOTF=PatternFill("solid",fgColor=CHAR); BANDF=PatternFill("solid",fgColor="F7F3EA")
thin=Side(style="thin",color="D8D0BE"); BORD=Border(thin,thin,thin,thin)
med=Side(style="medium",color=GOLDD)
def F(sz=10,b=False,color="2A2621",name="Calibri"): return Font(name=name,size=sz,bold=b,color=color)

wb=openpyxl.Workbook()
try: wb.calculation.fullCalcOnLoad=True
except Exception: pass

def st(c,font=None,fill=None,align=None,fmt=None,border=True,wrap=False):
    if font: c.font=font
    if fill: c.fill=fill
    c.alignment=Alignment(horizontal=align or "left",vertical="center",wrap_text=wrap)
    if fmt: c.number_format=fmt
    if border: c.border=BORD
    return c

def title_block(ws, title, sub, span):
    ws.merge_cells(f"A1:{get_column_letter(span)}1")
    ws["A1"]=title; st(ws["A1"],F(16,True,"FFFFFF"),HEADF,"left",border=False)
    ws.row_dimensions[1].height=30
    ws.merge_cells(f"A2:{get_column_letter(span)}2")
    ws["A2"]=sub; st(ws["A2"],F(9,False,"6B6455"),None,"left",border=False)
    ws.row_dimensions[2].height=16

# order of tabs
summary=wb.active; summary.title="Summary"
cities=wb.create_sheet("Cities List")
setup=wb.create_sheet("Setup Cost")
manpower=wb.create_sheet("Manpower Cost")
location=wb.create_sheet("Location Charges")
cinema=wb.create_sheet("Cinema Activation")
other=wb.create_sheet("Other Elements")

NK="Summary!$C$4"

# ============================================================= SETUP COST
ws=setup
title_block(ws,"Setup Cost  -  Kiosk Design, Build & Install","8 ft x 8 ft kiosk. Headline build cost per execution-agency quote (Rs 3,50,000/kiosk); component split below is indicative.",7)
heads=["#","Component","Specification / Scope","Unit","Qty","Amount / kiosk (Rs)","Remarks"]
widths=[5,30,40,7,7,20,34]
r=4
for i,h in enumerate(heads):
    st(ws.cell(r,i+1,h),F(10,True,"FFFFFF"),HEADF,"center" if i in(0,3,4) else "left")
for i,w in enumerate(widths): ws.column_dimensions[get_column_letter(i+1)].width=w
comps=[
 ("Structure & framework","MS/GI frame, base platform, carcass","Lot",1,55000,"Core structure"),
 ("Body cladding & finish","Warm-white PU-lacquer panels, fluted detailing","Lot",1,60000,"Body finish"),
 ("Counters","Black-stone tops, lockable storage bodies","Lot",1,45000,"Display + billing counters"),
 ("Brass gallery shelving & display","Backlit floating shelves, brass fronts","Lot",1,45000,"Merchandising"),
 ("Backlit brand signage","Illuminated seal wall, fascia, backlit counter fronts","Lot",1,40000,"Hero signage"),
 ("Lighting","Warm LED strips, drivers, downlights","Lot",1,25000,"3000K"),
 ("Electrical","Concealed wiring, DB/MCB, sockets","Lot",1,15000,"Single power drop"),
 ("Flooring & platform","Deck finish, warm-LED perimeter","Lot",1,18000,""),
 ("Digital brand screen + stand","Screen for brand film / catalogue","Nos",1,12000,""),
 ("Furniture","Consultation table + 4 chairs","Set",1,15000,""),
 ("Graphics, styling & props","Vinyls, Diwali dressing","Lot",1,8000,""),
 ("Transport, install & dismantle","Delivery, on-site setup, dismantle","Lot",1,12000,"3-day buffer before go-live"),
]
r=5; first=r
for i,(el,spec,unit,qty,amt,rem) in enumerate(comps,1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,el),F(10,True))
    st(ws.cell(r,3,spec),F(9,color="55503f"),wrap=True)
    st(ws.cell(r,4,unit),F(9),None,"center")
    st(ws.cell(r,5,qty),F(9),None,"center")
    st(ws.cell(r,6,amt),F(10),INPUTF,"right",INR)
    st(ws.cell(r,7,rem),F(9,color="6B6455"),wrap=True)
    r+=1
last=r-1
st(ws.cell(r,2,"Per-kiosk setup total"),F(11,True,"FFFFFF"),TOTF)
for cc in (1,3,4,5,7): st(ws.cell(r,cc),F(10,True,"FFFFFF"),TOTF)
pk_setup=f"F{r}"
st(ws.cell(r,6,f"=SUM(F{first}:F{last})"),F(11,True,"FFFFFF"),TOTF,"right",INR)
r+=1
st(ws.cell(r,2,f"Programme setup (x {14} kiosks)"),F(11,True),GOLDF)
for cc in (1,3,4,5,7): st(ws.cell(r,cc),F(10,True),GOLDF)
st(ws.cell(r,5,f"={NK}"),F(10,True),GOLDF,"center")
setup_prog=f"F{r}"
st(ws.cell(r,6,f"={pk_setup}*{NK}"),F(11,True,GOLDD),GOLDF,"right",INR)
ws.freeze_panes="A5"

# ============================================================= MANPOWER COST
ws=manpower
title_block(ws,"Manpower Cost","Per-kiosk deployment for the operating window; city-level roles added per city. Rates per execution-agency sheet.",7)
heads=["#","Role","Basis","Count","Rate (Rs)","Days / Units","Amount / kiosk (Rs)"]
for i,h in enumerate(heads):
    st(ws.cell(4,i+1,h),F(10,True,"FFFFFF"),HEADF,"center" if i in(0,3,5) else "left")
for i,w in enumerate([5,26,12,8,12,12,20]): ws.column_dimensions[get_column_letter(i+1)].width=w
ws.column_dimensions["H"].width=32
st(ws.cell(4,8,"Remarks"),F(10,True,"FFFFFF"),HEADF,"left")
rows=[
 ("Sales Executive","Daily",5,1600,45,"2 also handle billing; female, 22-25, fluent English"),
 ("Helper","Daily",2,1200,42,"Housekeeping, stock handling, refill"),
 ("Supervisor","Daily",1,1800,42,"Day-to-day kiosk operations"),
 ("Training Support","Lump",1,15000,1,"1-day product & sales training"),
 ("Store Operations & Cash","Lump",1,10000,1,"Open/close, billing, cash, reconciliation"),
 ("Reporting","Daily",1,150,45,"Sales/footfall/stock/attendance reports"),
]
r=5; first=r
for i,(role,basis,cnt,rate,days,rem) in enumerate(rows,1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,role),F(10,True))
    st(ws.cell(r,3,basis),F(9),None,"center")
    st(ws.cell(r,4,cnt),F(10),INPUTF,"center")
    st(ws.cell(r,5,rate),F(10),INPUTF,"right",INR)
    st(ws.cell(r,6,days),F(10),INPUTF,"center")
    st(ws.cell(r,7,f"=D{r}*E{r}*F{r}"),F(10),None,"right",INR)
    st(ws.cell(r,8,rem),F(9,color="6B6455"),wrap=True)
    r+=1
last=r-1
st(ws.cell(r,2,"Per-kiosk manpower subtotal"),F(10,True),SUBF)
for cc in (1,3,4,5,6,8): st(ws.cell(r,cc),F(10,True),SUBF)
pk_mp=f"G{r}"
st(ws.cell(r,7,f"=SUM(G{first}:G{last})"),F(10,True),SUBF,"right",INR)
r+=2
st(ws.cell(r,2,"City-level roles"),F(10,True,"FFFFFF"),HEADF)
for cc in (1,3,4,5,6,7,8): st(ws.cell(r,cc),F(10,True,"FFFFFF"),HEADF)
r+=1; cfirst=r
for i,(role,basis,cnt,rate,days,rem) in enumerate([
 ("City Manager","Monthly",1,50000,1,"1 per city (cities with >2 kiosks)"),
 ("Trained Backup Bench","Lump",1,20000,1,"Replacement cover; per city"),
],1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,role),F(10,True))
    st(ws.cell(r,3,basis),F(9),None,"center")
    st(ws.cell(r,4,cnt),F(10),INPUTF,"center")
    st(ws.cell(r,5,rate),F(10),INPUTF,"right",INR)
    st(ws.cell(r,6,days),F(10),INPUTF,"center")
    st(ws.cell(r,7,f"=D{r}*E{r}*F{r}"),F(10),None,"right",INR)
    st(ws.cell(r,8,rem),F(9,color="6B6455"),wrap=True)
    r+=1
clast=r-1
st(ws.cell(r,2,"Per-city subtotal"),F(10,True),SUBF)
for cc in (1,3,4,5,6,8): st(ws.cell(r,cc),F(10,True),SUBF)
pc_mp=f"G{r}"
st(ws.cell(r,7,f"=SUM(G{cfirst}:G{clast})"),F(10,True),SUBF,"right",INR)
r+=1
st(ws.cell(r,2,f"Programme manpower  (per-kiosk + per-city) x {14}"),F(11,True),GOLDF)
for cc in (1,3,4,5,6,8): st(ws.cell(r,cc),F(10,True),GOLDF)
mp_prog=f"G{r}"
st(ws.cell(r,7,f"=({pk_mp}+{pc_mp})*{NK}"),F(11,True,GOLDD),GOLDF,"right",INR)
ws.freeze_panes="A5"

# ============================================================= LOCATION CHARGES
ws=location
title_block(ws,"Location Charges  -  Mall Space","Mall activation rate card (3-day Fri-Sun, ex-GST). 6-week festive licence to be negotiated (left blank). GST 18% extra.",9)
heads=["#","City","Mall","Activity Location","Weekend Footfall","Size","3-day rate (Rs, ex-GST)","6-wk licence (Rs)","Remarks"]
for i,h in enumerate(heads):
    st(ws.cell(4,i+1,h),F(9,True,"FFFFFF"),HEADF,"center" if i in(0,5,6,7) else "left",wrap=True)
for i,w in enumerate([4,14,22,16,15,7,18,16,30]): ws.column_dimensions[get_column_letter(i+1)].width=w
ws.row_dimensions[4].height=30
mall=[
 ("Delhi NCR","Select City Walk","Mac Atrium","50-60k","8x8ft",840000,"Incl. Police & MCD permission"),
 ("Noida","DLF Mall of India","Main Atrium","50-60k","8x8ft",728000,"DLF do's & don'ts apply"),
 ("Gurgaon","Ambience Mall","Uniqlo Atrium","50-60k","8x8ft",840000,"Incl. Police & MCG permission"),
 ("Chandigarh","Elante Mall","Atrium","50-60k","8x8ft",728000,""),
 ("Lucknow","Lulu Mall","Atrium","40-45k","8x8ft",532000,""),
 ("Mumbai (BKC)","Jio World Drive","GF Atrium","50-60k","8x8ft",784000,"Incl. Police & BMC permission"),
 ("Mumbai (Lower Parel)","Phoenix Palladium","Courtyard (open)","40-45k","8x8ft",840000,"Incl. Police & BMC permission"),
 ("Ahmedabad","Palladium Ahmedabad","Atrium","40-45k","8x8ft",784000,""),
 ("Nagpur","VR Mall","Atrium","30-35k","8x8ft",308000,""),
 ("Kolkata","South City Mall","Main Atrium","50-60k","8x8ft",336000,""),
 ("Chennai","Phoenix Market City","Atrium","50-60k","8x8ft",700000,""),
 ("Bengaluru","Phoenix Market City","Main Atrium","50-60k","8x8ft",560000,""),
 ("Hyderabad","Sarath City Capital","Main Atrium","50-60k","8x8ft",532000,"Inorbit alt: Rs 5,60,000"),
 ("Kochi","Lulu International Mall","Main Atrium","50-60k","8x8ft",840000,""),
]
r=5; first=r
for i,(city,mn,loc,ff,sz,rate,rem) in enumerate(mall,1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,city),F(10,True))
    st(ws.cell(r,3,mn),F(9))
    st(ws.cell(r,4,loc),F(9,color="55503f"))
    st(ws.cell(r,5,ff),F(9),None,"center")
    st(ws.cell(r,6,sz),F(9),None,"center")
    st(ws.cell(r,7,rate),F(10),INPUTF,"right",INR)
    st(ws.cell(r,8,None),F(10),INPUTF,"right",INR)   # 6-week negotiated: blank
    st(ws.cell(r,9,rem),F(9,color="6B6455"),wrap=True)
    r+=1
last=r-1
st(ws.cell(r,3,"Total mall space (3-day basis, ex-GST)"),F(11,True,"FFFFFF"),TOTF)
for cc in (1,2,4,5,6,8,9): st(ws.cell(r,cc),F(10,True,"FFFFFF"),TOTF)
loc_total=f"G{r}"
st(ws.cell(r,7,f"=SUM(G{first}:G{last})"),F(11,True,"FFFFFF"),TOTF,"right",INR)
r+=2
for line in ["Notes:","- Rates are 3-day (Fri-Sun) activation rates, ex-GST, per the mall rate card; non-festive - festive rates may vary.",
             "- 6-week festive-season licence, CAM, electricity above 3-4 KVA and security deposits to be negotiated per mall (left blank).",
             "- Booking against 100% advance; rates valid 15 days; PPL/IPRS and special permissions extra."]:
    ws.merge_cells(f"A{r}:I{r}"); ws[f"A{r}"]=line; st(ws[f"A{r}"],F(9,line=='Notes:',"6B6455"),None,"left",border=False); r+=1
ws.freeze_panes="A5"

# ============================================================= CINEMA ACTIVATION
ws=cinema
title_block(ws,"Cinema / Multiplex Activation  -  Alternative Location","8x8 ft foyer activation in the PVR / INOX multiplexes at the same malls. 6-week cost per site; GST 18% extra. Managed by ProMarcom.",8)
heads=["#","City","Multiplex / Cinema","Network","Screens","Seats / show","Space","Cost - 6 weeks (Rs)"]
for i,h in enumerate(heads):
    st(ws.cell(4,i+1,h),F(9,True,"FFFFFF"),HEADF,"center" if i in(0,4,5,6,7) else "left",wrap=True)
for i,w in enumerate([4,16,26,10,8,11,8,18]): ws.column_dimensions[get_column_letter(i+1)].width=w
ws.row_dimensions[4].height=28
cin=[
 ("Mumbai (Lower Parel)","PVR Phoenix (Worli)","PVR",7,1275,"8x8",300000),
 ("Mumbai (BKC)","PVR Maison BKC","PVR",6,882,"6x6",300000),
 ("Ahmedabad","PVR Palladium","PVR",9,1283,"8x8",300000),
 ("Delhi (Saket)","PVR Select Citywalk","PVR",6,1056,"8x8",300000),
 ("Noida","PVR DT - Mall of India","PVR",7,1712,"8x8",300000),
 ("Gurgaon","PVR Ambience Mall","PVR",11,1122,"8x8",300000),
 ("Chandigarh","PVR Nexus Elante","PVR",8,1599,"6x6",300000),
 ("Lucknow","PVR Superplex - Lulu","PVR",11,1841,"8x8",300000),
 ("Kolkata","INOX City Centre","PVR INOX",4,1144,"8x8",300000),
 ("Kolkata","INOX City Centre II","PVR INOX",4,1190,"8x8",300000),
 ("Hyderabad","PVR Icon - Hitech City","PVR",5,936,"8x8",300000),
 ("Bengaluru","PVR Phoenix Market City","PVR",9,1401,"6x6",300000),
 ("Chennai","INOX Luxe - Phoenix","PVR INOX",11,2688,"6x6",300000),
 ("Cochin","PVR Lulu Mall","PVR",9,1926,"8x8",300000),
]
r=5; first=r
for i,(city,mn,net,scr,seat,sz,cost) in enumerate(cin,1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,city),F(10,True))
    st(ws.cell(r,3,mn),F(9))
    st(ws.cell(r,4,net),F(9),None,"center")
    st(ws.cell(r,5,scr),F(9),None,"center")
    st(ws.cell(r,6,seat),F(9),None,"center","#,##0")
    st(ws.cell(r,7,sz),F(9),None,"center")
    st(ws.cell(r,8,cost),F(10),INPUTF,"right",INR)
    r+=1
last=r-1
st(ws.cell(r,3,"Total - 14 multiplexes (ex-GST)"),F(11,True,"FFFFFF"),TOTF)
for cc in (1,2,4,7): st(ws.cell(r,cc),F(10,True,"FFFFFF"),TOTF)
st(ws.cell(r,5,f"=SUM(E{first}:E{last})"),F(10,True,"FFFFFF"),TOTF,"center")
st(ws.cell(r,6,f"=SUM(F{first}:F{last})"),F(10,True,"FFFFFF"),TOTF,"center","#,##0")
cin_total=f"H{r}"
st(ws.cell(r,8,f"=SUM(H{first}:H{last})"),F(11,True,"FFFFFF"),TOTF,"right",INR)
r+=1
st(ws.cell(r,3,"GST @ 18%"),F(10,True),SUBF)
for cc in (1,2,4,5,6,7): st(ws.cell(r,cc),F(10),SUBF)
cin_gst=f"H{r}"
st(ws.cell(r,8,f"={cin_total}*Summary!$C$8"),F(10),SUBF,"right",INR)
r+=1
st(ws.cell(r,3,"Total incl. GST"),F(11,True),GOLDF)
for cc in (1,2,4,5,6,7): st(ws.cell(r,cc),F(10,True),GOLDF)
cin_incl=f"H{r}"
st(ws.cell(r,8,f"={cin_total}+{cin_gst}"),F(11,True,GOLDD),GOLDF,"right",INR)
r+=2
for line in ["Terms (per the multiplex rate card, managed by ProMarcom):",
             "- 100% advance, in favour of ProMarcom.  18% Govt. service tax extra on the above rates.",
             "- Availability to be confirmed before booking; site once booked cannot be postponed or cancelled.",
             "- Billing from date of booking / availability; rates subject to change without prior notice.",
             "- Alternative to the mall-atrium location (see Location Charges); proposed as atrium space on long-term rental is limited."]:
    ws.merge_cells(f"A{r}:H{r}"); ws[f"A{r}"]=line; st(ws[f"A{r}"],F(9,line.startswith("Terms"),"6B6455"),None,"left",border=False); r+=1
ws.freeze_panes="A5"

# ============================================================= OTHER ELEMENTS
ws=other
title_block(ws,"Other Elements","Logistics, insurance, operations and pass-through items (per kiosk / season). Hardware & software left blank pending confirmation.",6)
heads=["#","Element","Specification / Scope","Amount / kiosk (Rs)","Basis","Remarks"]
for i,h in enumerate(heads):
    st(ws.cell(4,i+1,h),F(10,True,"FFFFFF"),HEADF,"center" if i==0 else "left")
for i,w in enumerate([5,28,42,20,12,30]): ws.column_dimensions[get_column_letter(i+1)].width=w
items=[
 ("Logistics","Stock pickup (Ghaziabad WH), first fill, replenishment, return of unsold",25000,"Per season",""),
 ("Warehouse","Seasonal storage / stockroom",15000,"Per season",""),
 ("Insurance - Fire","Mall fire insurance",10000,"Per season",""),
 ("Insurance - Transport","Stock in transit",12000,"Per season",""),
 ("Extended Trading","Extended ops in select cities (Christmas & New Year)",20000,"Select only",""),
 ("Dismantle & Stock Return","Dismantling, fixture removal, unsold-stock return",10000,"Post-season",""),
 ("Final Reconciliation","Commercial reconciliation & season review",0,"Project close",""),
 ("Billing Hardware","EDC / card machine, thermal printer, tablet, stand",None,"Per kiosk","To be confirmed (may be provided by Doft)"),
 ("Billing Software","POS / billing software licence",None,"Per kiosk","To be discussed"),
 ("Security Deposit (refundable)","Mall / statutory deposits",None,"Per mall","To be confirmed; refundable"),
]
r=5; first=r
for i,(el,spec,amt,basis,rem) in enumerate(items,1):
    st(ws.cell(r,1,i),F(9),None,"center")
    st(ws.cell(r,2,el),F(10,True))
    st(ws.cell(r,3,spec),F(9,color="55503f"),wrap=True)
    st(ws.cell(r,4,amt),F(10),INPUTF,"right",INR)
    st(ws.cell(r,5,basis),F(9),None,"center")
    st(ws.cell(r,6,rem),F(9,color="6B6455"),wrap=True)
    r+=1
last=r-1
st(ws.cell(r,2,"Per-kiosk other subtotal"),F(10,True),SUBF)
for cc in (1,3,5,6): st(ws.cell(r,cc),F(10,True),SUBF)
pk_other=f"D{r}"
st(ws.cell(r,4,f"=SUM(D{first}:D{last})"),F(10,True),SUBF,"right",INR)
r+=1
st(ws.cell(r,2,f"Programme other (x {14} kiosks)"),F(11,True),GOLDF)
for cc in (1,3,5,6): st(ws.cell(r,cc),F(10,True),GOLDF)
other_prog=f"D{r}"
st(ws.cell(r,4,f"={pk_other}*{NK}"),F(11,True,GOLDD),GOLDF,"right",INR)
ws.freeze_panes="A5"

# ============================================================= CITIES LIST
ws=cities
title_block(ws,"Cities & Malls  -  Revised List (14)","Per the client's revised preferred-mall list. Footfall & activity location per the mall rate card.",6)
heads=["#","City","Preferred Mall","Location / Zone","Region","Weekend Footfall"]
for i,h in enumerate(heads):
    st(ws.cell(4,i+1,h),F(10,True,"FFFFFF"),HEADF,"center" if i in(0,4,5) else "left")
for i,w in enumerate([5,20,26,18,10,16]): ws.column_dimensions[get_column_letter(i+1)].width=w
clist=[
 ("Delhi","Select Citywalk","Saket","North","50-60k"),
 ("Noida","DLF Mall of India","Noida","North","50-60k"),
 ("Gurgaon","Ambience Mall","Gurgaon","North","50-60k"),
 ("Chandigarh","Elante Mall","Industrial Area","North","50-60k"),
 ("Lucknow","Lulu Mall","Hariharpur","North","40-45k"),
 ("Mumbai (BKC)","Jio World Mall","BKC","West","50-60k"),
 ("Mumbai (Lower Parel)","Phoenix Palladium","Lower Parel","West","40-45k"),
 ("Ahmedabad","Phoenix / Palladium","Thaltej","West","40-45k"),
 ("Nagpur","VR Mall","Untkhana","West","30-35k"),
 ("Kolkata","South City Mall","Jadavpur","East","50-60k"),
 ("Chennai","Phoenix Marketcity","Velachery","South","50-60k"),
 ("Bengaluru","Phoenix Marketcity","Whitefield","South","50-60k"),
 ("Hyderabad","Phoenix / Sarath City","Gachibowli","South","50-60k"),
 ("Kochi","Lulu International Mall","Ernakulam","South","50-60k"),
]
r=5
for i,(city,mn,loc,reg,ff) in enumerate(clist,1):
    band = BANDF if i%2==0 else None
    st(ws.cell(r,1,i),F(9),band,"center")
    st(ws.cell(r,2,city),F(10,True),band)
    st(ws.cell(r,3,mn),F(10),band)
    st(ws.cell(r,4,loc),F(9,color="55503f"),band)
    st(ws.cell(r,5,reg),F(9),band,"center")
    st(ws.cell(r,6,ff),F(9),band,"center")
    r+=1
st(ws.cell(r,2,f"Total locations"),F(11,True,"FFFFFF"),TOTF)
for cc in (1,3,4,6): st(ws.cell(r,cc),F(10,True,"FFFFFF"),TOTF)
st(ws.cell(r,5,"=COUNTA(B5:B18)"),F(11,True,"FFFFFF"),TOTF,"center")
ws.freeze_panes="A5"

# ============================================================= SUMMARY
ws=summary
for i,w in enumerate([34,10,18,16,16,10]): ws.column_dimensions[get_column_letter(i+1)].width=w
ws.merge_cells("A1:F1"); ws["A1"]="DOFT  x  ProMarcom"; st(ws["A1"],F(18,True,GOLD),HEADF,"left",border=False)
ws.merge_cells("A2:F2"); ws["A2"]="Diwali Pop-Up Kiosk  -  Programme Cost Summary  -  14 malls, 8 ft x 8 ft"; st(ws["A2"],F(10,False,"D8CDB6"),HEADF,"left",border=False)
ws.row_dimensions[1].height=28
# assumptions
ws["A3"]="Assumptions (edit gold cells)"; st(ws["A3"],F(11,True,"FFFFFF"),HEADF);
for cc in "BCDEF": st(ws[f"{cc}3"],F(10,True),HEADF)
assum=[("No. of kiosks / malls",14,None),("Operating window (weeks)",6,None),("Operating days (per kiosk)",45,None),
       ("Management fee","=0.10",PCT),("GST","=0.18",PCT)]
r=4
for lab,val,fmt in assum:
    st(ws.cell(r,1,lab),F(10))
    st(ws.cell(r,3,val),F(10,True,"7a5b12"),INPUTF,"center",fmt or "0")
    r+=1
# cost roll-up
r=10
st(ws.cell(r,1,"Cost Head"),F(10,True,"FFFFFF"),HEADF)
st(ws.cell(r,2,"Ref"),F(10,True,"FFFFFF"),HEADF,"center")
st(ws.cell(r,3,"Per kiosk (Rs)"),F(10,True,"FFFFFF"),HEADF,"right")
st(ws.cell(r,4,"Programme (Rs)"),F(10,True,"FFFFFF"),HEADF,"right")
for cc in (5,6): st(ws.cell(r,cc),F(10,True,"FFFFFF"),HEADF)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,"Notes"),F(10,True,"FFFFFF"),HEADF,"left")
r+=1
rows=[
 ("A. Kiosk setup & build","Setup Cost",f"='Setup Cost'!{pk_setup}",f"='Setup Cost'!{setup_prog}","Design, fabrication, install, dismantle"),
 ("B. Manpower","Manpower Cost",f"='Manpower Cost'!{pk_mp}+'Manpower Cost'!{pc_mp}",f"='Manpower Cost'!{mp_prog}","Sales, billing, supervision, city mgr"),
 ("C. Other elements","Other Elements",f"='Other Elements'!{pk_other}",f"='Other Elements'!{other_prog}","Logistics, warehouse, insurance, ops"),
 ("D. Location / mall space","Location Charges","",f"='Location Charges'!{loc_total}","3-day rate card, ex-GST; 6-wk TBD"),
]
opsfirst=r
for lab,ref,pk,prog,note in rows:
    st(ws.cell(r,1,lab),F(10,True))
    st(ws.cell(r,2,ref),F(9,color="6B6455"),None,"center")
    st(ws.cell(r,3,pk if pk else "n/a"),F(10),None,"right",INR if pk else None)
    st(ws.cell(r,4,prog),F(10),None,"right",INR)
    ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,note),F(9,color="6B6455"),None,"left",wrap=True)
    r+=1
opslast=r-1
# subtotal
st(ws.cell(r,1,"Programme sub-total (ex-GST)"),F(11,True),SUBF)
st(ws.cell(r,2,None),F(10,True),SUBF); st(ws.cell(r,3,None),F(10,True),SUBF)
sub=f"D{r}"
st(ws.cell(r,4,f"=SUM(D{opsfirst}:D{opslast})"),F(11,True),SUBF,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,None),None,SUBF)
r+=1
st(ws.cell(r,1,"Management fee"),F(10,True))
st(ws.cell(r,2,"=C7",),F(9),None,"center",PCT)
st(ws.cell(r,3,None)); mgmt=f"D{r}"
st(ws.cell(r,4,f"={sub}*$C$7"),F(10),None,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,"% of programme sub-total"),F(9,color="6B6455"),None,"left")
r+=1
st(ws.cell(r,1,"Sub-total incl. management fee"),F(10,True),SUBF)
st(ws.cell(r,2,None),F(10),SUBF); st(ws.cell(r,3,None),F(10),SUBF)
sub2=f"D{r}"; st(ws.cell(r,4,f"={sub}+{mgmt}"),F(10,True),SUBF,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,None),None,SUBF)
r+=1
st(ws.cell(r,1,"GST"),F(10,True))
st(ws.cell(r,2,"=C8"),F(9),None,"center",PCT)
st(ws.cell(r,3,None)); gst=f"D{r}"
st(ws.cell(r,4,f"={sub2}*$C$8"),F(10),None,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,"18% on sub-total incl. fee",),F(9,color="6B6455"),None,"left")
r+=1
st(ws.cell(r,1,"GRAND TOTAL (incl. GST)"),F(12,True,"FFFFFF"),TOTF)
st(ws.cell(r,2,None),F(10,True,"FFFFFF"),TOTF); st(ws.cell(r,3,None),F(10,True,"FFFFFF"),TOTF)
st(ws.cell(r,4,f"={sub2}+{gst}"),F(12,True,GOLD),TOTF,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,None),None,TOTF)
r+=2
st(ws.cell(r,1,"Per-kiosk average (incl. GST)"),F(10,True),GOLDF)
st(ws.cell(r,2,None),F(10),GOLDF); st(ws.cell(r,3,None),F(10),GOLDF)
st(ws.cell(r,4,f"=D{r-2}/$C$4"),F(10,True,GOLDD),GOLDF,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,None),None,GOLDF)
r+=2
# alternative location channel: multiplex
st(ws.cell(r,1,"Alternative location channel  -  Multiplex activation"),F(10,True,"FFFFFF"),HEADF)
for cc in (2,3,4,5,6): st(ws.cell(r,cc),F(10,True,"FFFFFF"),HEADF)
ws.merge_cells(f"E{r}:F{r}"); r+=1
st(ws.cell(r,1,"D2. Multiplex activation (14 PVR/INOX, 6 wk)"),F(10,True))
st(ws.cell(r,2,"Cinema Activation"),F(9,color="6B6455"),None,"center")
st(ws.cell(r,4,f"='Cinema Activation'!{cin_total}"),F(10),None,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,"Alternative to atrium (D); ex-GST"),F(9,color="6B6455"),None,"left",wrap=True); r+=1
st(ws.cell(r,1,"GRAND TOTAL  -  multiplex option (incl. fee & GST)"),F(11,True,"FFFFFF"),TOTF)
st(ws.cell(r,2,None),F(10,True,"FFFFFF"),TOTF); st(ws.cell(r,3,None),F(10,True,"FFFFFF"),TOTF)
st(ws.cell(r,4,f"=(D11+D12+D13+'Cinema Activation'!{cin_total})*(1+$C$7)*(1+$C$8)"),F(11,True,GOLD),TOTF,"right",INR)
ws.merge_cells(f"E{r}:F{r}"); st(ws.cell(r,5,"A + B + C + multiplex, then fee & GST"),F(9,color="D8CDB6"),TOTF,"left",wrap=True); r+=2
notes=["Basis & notes:",
 "- Figures sourced from the execution-agency ops sheet (build + manpower + logistics + insurance) and the mall activation rate card.",
 "- Location / mall space (D) is a 3-day (Fri-Sun) rate card, ex-GST; the 6-week festive licence, CAM, electricity and deposits are to be negotiated per mall (blank).",
 "- Management fee modelled at 10% of programme sub-total (the source sheet contained an apparent calculation error on this line).",
 "- Billing hardware/software and security deposits left blank pending confirmation.",
 "- All rates indicative placeholders; confirm against vendor, mall and statutory quotes before commercial submission."]
for i,n in enumerate(notes):
    ws.merge_cells(f"A{r}:F{r}"); ws[f"A{r}"]=n; st(ws[f"A{r}"],F(9,i==0,"6B6455"),None,"left",border=False); r+=1
ws.freeze_panes="A4"

wb.save("Doft_Kiosk_Cost_Workbook.xlsx")
print("WROTE Doft_Kiosk_Cost_Workbook.xlsx")
