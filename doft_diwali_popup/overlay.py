#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import math

TERRA=(158,90,69); INK=(53,48,43); CREAM=(246,241,230); MAUVE=(74,52,58)
def font(sz,bold=True):
    p="/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf"%("-Bold" if bold else "")
    try: return ImageFont.truetype(p,sz)
    except: return ImageFont.load_default()

# ---- ortho mapping (must match threescene.html elev camera) ----
hH=1.6; cy=1.35; hW=1.6*2400/1650; W=2400; Hp=1650
def X(x): return (x+hW)/(2*hW)*W
def Y(y): return (cy+hH-y)/(2*hH)*Hp

def arrow(d,x1,y1,x2,y2,c,w=4):
    d.line([(x1,y1),(x2,y2)],fill=c,width=w)
    ang=math.atan2(y2-y1,x2-x1)
    for e,(ex,ey) in [(1,(x2,y2)),(-1,(x1,y1))]:
        a=ang if e==1 else ang+math.pi
        d.polygon([(ex,ey),(ex-14*math.cos(a-0.4),ey-14*math.sin(a-0.4)),(ex-14*math.cos(a+0.4),ey-14*math.sin(a+0.4))],fill=c)

def label(d,cx,cy2,txt,fs=34,c=TERRA):
    f=font(fs); tb=d.textbbox((0,0),txt,font=f); tw=tb[2]-tb[0]; th=tb[3]-tb[1]
    x=cx-tw/2; y=cy2-th/2
    d.rectangle([x-10,y-6,x+tw+10,y+th+8],fill=CREAM,outline=c,width=2)
    d.text((x,y-tb[1]),txt,font=f,fill=c)

def dims():
    im=Image.open("r_B_elevdim.png").convert("RGB"); d=ImageDraw.Draw(im,"RGBA")
    HALF=1.22; topY=2.57; cntY=1.08
    # width (bottom)
    yb=Y(-0.10)
    d.line([(X(-HALF),Y(0.02)),(X(-HALF),yb+18)],fill=TERRA,width=2)
    d.line([(X(HALF),Y(0.02)),(X(HALF),yb+18)],fill=TERRA,width=2)
    arrow(d,X(-HALF),yb,X(HALF),yb,TERRA)
    label(d,(X(-HALF)+X(HALF))/2,yb,"8'-0\"  (2.44 m)")
    # overall height (right)
    xr=X(HALF)+70
    d.line([(X(HALF),Y(0.0)),(xr+18,Y(0.0))],fill=TERRA,width=2)
    d.line([(X(HALF),Y(topY)),(xr+18,Y(topY))],fill=TERRA,width=2)
    arrow(d,xr,Y(0.0),xr,Y(topY),TERRA)
    label(d,xr+120,(Y(0.0)+Y(topY))/2,"~ 8'-0\"",32)
    # counter height (left)
    xl=X(-HALF)-70
    d.line([(X(-HALF),Y(0.0)),(xl-18,Y(0.0))],fill=TERRA,width=2)
    d.line([(X(-HALF),Y(cntY)),(xl-18,Y(cntY))],fill=TERRA,width=2)
    arrow(d,xl,Y(0.0),xl,Y(cntY),TERRA)
    label(d,xl-120,(Y(0.0)+Y(cntY))/2,"Counter 3'-6\"",30)
    # title
    d.text((60,50),"CONCEPT B — THE GALLERY  ·  FRONT ELEVATION",font=font(34),fill=MAUVE)
    im.save("view_B_elevation_dim.png"); print("elevdim overlay ok")

def storage():
    im=Image.open("r_B_storage.png").convert("RGB"); d=ImageDraw.Draw(im,"RGBA")
    # caption bar
    txt1="Lockable stock storage within the counter"
    txt2="Approx. 40 sq ft total, with back-wall base units"
    f1=font(40); f2=font(30,False)
    d.rectangle([60,1470,1360,1610],fill=MAUVE+(235,))
    d.text((90,1492),txt1,font=f1,fill=CREAM)
    d.text((90,1548),txt2,font=f2,fill=(220,200,190))
    d.text((60,50),"CONCEPT B — THE GALLERY  ·  STORAGE / CUTAWAY",font=font(34),fill=MAUVE)
    im.save("view_B_storage.png"); print("storage overlay ok")

def titleonly(src,dst,title):
    im=Image.open(src).convert("RGB"); d=ImageDraw.Draw(im)
    d.text((60,50),title,font=font(34),fill=MAUVE); im.save(dst); print(dst)

dims(); storage()
titleonly("r_B_hero.png","view_B_hero.png","CONCEPT B — THE GALLERY  ·  HERO VIEW")
titleonly("r_B_rev.png","view_B_reverse.png","CONCEPT B — THE GALLERY  ·  REVERSE ANGLE")
titleonly("r_B_elev.png","view_B_elevation.png","CONCEPT B — THE GALLERY  ·  FRONT ELEVATION")
print("all overlays done")
