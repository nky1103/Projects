#!/usr/bin/env python3
# Presentation overlays for the DOFT premium island kiosk renders.
from PIL import Image, ImageDraw, ImageFont
import math

GREEN=(30,77,57); GREEND=(20,52,40); GOLD=(198,162,78); CREAM=(246,241,230)
INK=(48,45,40); WHITE=(250,247,240)
SERIF="/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIFB="/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANSB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def F(p,s):
    try: return ImageFont.truetype(p,s)
    except: return ImageFont.load_default()

def tsize(d,t,f):
    b=d.textbbox((0,0),t,font=f); return b[2]-b[0],b[3]-b[1]

def tracked(d,x,y,t,f,fill,track=0):
    for ch in t:
        d.text((x,y),ch,font=f,fill=fill); w,_=tsize(d,ch,f); x+=w+track
    return x

def brand_tag(d,W):
    # top-left brand + agency line
    f1=F(SERIFB,34); f2=F(SANS,22)
    x0,y0=58,46
    x=tracked(d,x0,y0,"DOFT",f1,GREEN,8)
    d.text((x+14,y0+8),"SCENTED MEMORIES",font=F(SANS,20),fill=GOLD)
    d.text((x0,y0+46),"ProMarcom  ·  Diwali Pop-Up Retail  ·  Kiosk Concept",font=f2,fill=INK)
    d.line([(x0,y0+42),(x0+430,y0+42)],fill=GOLD,width=2)

def caption(im,title,sub):
    d=ImageDraw.Draw(im,"RGBA"); W,H=im.size
    barH=150
    d.rectangle([0,H-barH,W,H],fill=GREEN+(238,))
    d.rectangle([0,H-barH,W,H-barH+6],fill=GOLD)
    ft=F(SERIFB,52); fs=F(SANS,28)
    tracked(d,64,H-barH+30,title,ft,CREAM,4)
    if sub: d.text((66,H-barH+100),sub,font=fs,fill=(226,215,196))
    # right-side dimension chip
    fc=F(SANSB,26)
    chip="8'-0\"  ×  8'-0\"   ·   2.44 × 2.44 m"
    cw,_=tsize(d,chip,fc)
    d.rectangle([W-cw-96,H-barH+52,W-40,H-barH+100],outline=GOLD,width=2)
    d.text((W-cw-78,H-barH+60),chip,font=fc,fill=CREAM)
    return d

def simple(src,dst,title,sub):
    im=Image.open(src).convert("RGB")
    d=caption(im,title,sub); brand_tag(d,im.size[0])
    im.save(dst); print(dst)

# ---------- PLAN overlay ----------
hH=1.55; hW=1.55*2400/1650; W=2400; H=1650
def X(x): return (x+hW)/(2*hW)*W
def Z(z): return (z+hH)/(2*hH)*H
def arrow(d,x1,y1,x2,y2,c,w=3):
    d.line([(x1,y1),(x2,y2)],fill=c,width=w); a=math.atan2(y2-y1,x2-x1)
    for e,(ex,ey) in [(1,(x2,y2)),(-1,(x1,y1))]:
        aa=a if e==1 else a+math.pi
        d.polygon([(ex,ey),(ex-16*math.cos(aa-0.4),ey-16*math.sin(aa-0.4)),(ex-16*math.cos(aa+0.4),ey-16*math.sin(aa+0.4))],fill=c)
def zone(d,x,z,t,sub=None,fs=26):
    f=F(SANSB,fs); fsub=F(SANS,20)
    cx,cy=X(x),Z(z)
    lines=[t]+([sub] if sub else [])
    ws=[tsize(d,l,f if i==0 else fsub)[0] for i,l in enumerate(lines)]
    bw=max(ws)+28; bh=(fs+16)+((26) if sub else 0)
    d.rectangle([cx-bw/2,cy-bh/2,cx+bw/2,cy+bh/2],fill=CREAM+(235,),outline=GOLD,width=2)
    d.text((cx-ws[0]/2,cy-bh/2+8),t,font=f,fill=GREEN)
    if sub: d.text((cx-ws[1]/2,cy-bh/2+8+fs+6),sub,font=fsub,fill=INK)

def plan(src,dst):
    im=Image.open(src).convert("RGB"); d=ImageDraw.Draw(im,"RGBA")
    f=F(SANSB,30)
    # dimension — width (top)
    yt=Z(-1.22)-74
    d.line([(X(-1.22),Z(-1.22)-8),(X(-1.22),yt-16)],fill=GOLD,width=2)
    d.line([(X(1.22),Z(-1.22)-8),(X(1.22),yt-16)],fill=GOLD,width=2)
    arrow(d,X(-1.22),yt,X(1.22),yt,GOLD)
    t="8'-0\"   (2.44 m)"; tw,_=tsize(d,t,f)
    d.rectangle([(X(0)-tw/2)-12,yt-20,(X(0)+tw/2)+12,yt+18],fill=CREAM,outline=GOLD,width=2)
    d.text((X(0)-tw/2,yt-16),t,font=f,fill=GREEN)
    # dimension — depth (left)
    xl=X(-1.22)-96
    d.line([(X(-1.22)-8,Z(-1.22)),(xl-16,Z(-1.22))],fill=GOLD,width=2)
    d.line([(X(-1.22)-8,Z(1.22)),(xl-16,Z(1.22))],fill=GOLD,width=2)
    arrow(d,xl,Z(-1.22),xl,Z(1.22),GOLD)
    vt=Image.new("RGBA",(260,44),(0,0,0,0)); vd=ImageDraw.Draw(vt)
    vd.rectangle([0,0,259,43],fill=CREAM,outline=GOLD,width=2)
    vd.text((22,8),"8'-0\"   (2.44 m)",font=f,fill=GREEN)
    vt=vt.rotate(90,expand=True); im.paste(vt,(int(xl-66),int(Z(0)-130)),vt)
    d=ImageDraw.Draw(im,"RGBA")
    # zones
    zone(d,0,0.02,"CENTRAL TOTEM","DOFT seal · backlit")
    zone(d,-0.97,-0.05,"LOCKABLE","STORAGE")
    zone(d,0.97,-0.05,"LOCKABLE STORAGE","+ cash safe")
    zone(d,0,1.05,"DISPLAY COUNTER","glass showcases")
    zone(d,0,0.52,"2 BAR STOOLS",None,24)
    zone(d,0,-1.05,"STAFF ENTRY",None,24)
    # front customer chip (kept clear of caption bar)
    fc=F(SERIF,24); ft="FRONT  ·  CUSTOMER SIDE  →  MALL AISLE"; fw,_=tsize(d,ft,fc)
    d.rectangle([X(0)-fw/2-14,Z(1.22)+18,X(0)+fw/2+14,Z(1.22)+58],fill=GREEN+(235,),outline=GOLD,width=2)
    d.text((X(0)-fw/2,Z(1.22)+24),ft,font=fc,fill=CREAM)
    # caption + brand
    d=caption(im,"TOP LAYOUT · PLAN","Open island footprint — U-counter, central totem, staff entry to rear")
    brand_tag(d,W)
    im.save(dst); print(dst)

simple("r_D_left.png","view_kiosk_left.png","LEFT ANGLE","Customer three-quarter view — display counters, backlit niches & totem")
simple("r_D_right.png","view_kiosk_right.png","RIGHT ANGLE","Customer three-quarter view — display counters, backlit niches & totem")
simple("r_D_l45.png","view_kiosk_xsec_left.png","CROSS-SECTION · 45° LEFT","Interior revealed — lockable stock storage, cash safe & staff seating")
simple("r_D_r45.png","view_kiosk_xsec_right.png","CROSS-SECTION · 45° RIGHT","Interior revealed — lockable stock storage, cash safe & staff seating")
# plan is produced as a dedicated 2D CAD sheet via shotplan.js (view_kiosk_plan.png)
simple("r_D_hero.png","view_kiosk_hero.png","HERO VIEW","DOFT premium island — white lacquer, brushed gold, emerald brand niches")
print("ALL OVERLAYS DONE")
