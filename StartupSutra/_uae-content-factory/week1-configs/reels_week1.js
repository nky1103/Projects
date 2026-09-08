const STAIR=[
  {lbl:'2021',v:300,disp:'300B',muted:true},{lbl:'2022',v:528,disp:'528B',muted:true},
  {lbl:'2023',v:634,disp:'634B',muted:true},{lbl:'2024',v:761,disp:'761B',muted:true},
  {lbl:'2025',v:917,disp:'917B'}];
const CRASH_SKY={sky:'linear-gradient(180deg,#0a0f1c 0%,#141d30 30%,#33283a 52%,#5a3140 66%,#7a3a3a 76%,#4a2528 88%,#1a1016 100%)',
  sun:'radial-gradient(circle,rgba(255,180,150,.7),rgba(220,90,80,.3) 38%,transparent 64%)',sunY:66,haze:'rgba(230,120,110,.3)'};

module.exports = {
  d1:{ acc:'#f59e0b',acc2:'#ffd08a',deep:'#b45309',glow:'245,158,11',label:'UAE · Market Pulse',dur:21.0,
    scene:{kind:'skyline'},palette:{},
    scenes:[
      {type:'text',t0:0.0,t1:3.8,kick:'UAE · Market Pulse',html:"They keep calling it a <span class='accent'>bubble.</span>"},
      {type:'bignum',t0:3.8,t1:8.4,kick:'UAE property · 2025',num:'AED 917B',subnum:'Dubai alone — ≈ $250B in a year. A record.'},
      {type:'bars',t0:8.4,t1:14.4,kick:'Total transactions',title:"Five record years in a row",data:STAIR},
      {type:'text',t0:14.4,t1:18.0,size:'sm',html:"Five record years isn't a bubble. <span class='accent'>It's a market that grew up.</span>"},
    ],
    outro:{t0:18.0,kick:'The full breakdown',title:"Bubble or boom?<br>We ran the numbers."} },

  d2:{ acc:'#ef4444',acc2:'#ff9a9a',deep:'#b91c1c',glow:'239,68,68',label:'UAE · Crash Files',dur:19.5,
    scene:{kind:'skyline'},palette:CRASH_SKY,
    scenes:[
      {type:'text',t0:0.0,t1:3.8,kick:'UAE · Crash Files',html:"Dubai property crashed <span class='accent'>50%</span> in 2009."},
      {type:'text',t0:3.8,t1:7.8,size:'sm',html:"Everyone who panicked sold. Everyone who <span class='accent'>bought, won.</span>"},
      {type:'bignum',t0:7.8,t1:12.6,kick:'Price per sq ft',num:'+135%',subnum:'AED 794 (2021 low) → AED 1,863 (2025)'},
      {type:'text',t0:12.6,t1:16.2,html:"Fear is just a <span class='accent'>discount</span> on a good asset."},
    ],
    outro:{t0:16.2,kick:'Every cycle, charted',title:"How to survive<br>the next dip."} },

  d3:{ acc:'#22c55e',acc2:'#9be8b4',deep:'#15803d',glow:'34,197,94',label:'UAE · Boom Radar',dur:20.3,
    scene:{kind:'marina'},palette:{},
    scenes:[
      {type:'text',t0:0.0,t1:3.8,kick:'UAE · Boom Radar',html:"Everyone waited for a <span class='accent'>crash.</span>"},
      {type:'text',t0:3.8,t1:7.4,size:'sm',html:"These UAE areas quietly <span class='accent'>surged.</span>"},
      {type:'bars',t0:7.4,t1:13.4,kick:'Price growth · 2025',title:"The areas that ran",data:[
        {lbl:'Palm',v:31,disp:'+31%'},{lbl:'JVC',v:17,disp:'+17%',muted:true},
        {lbl:'Marina',v:15,disp:'+15%',muted:true},{lbl:'B. Bay',v:10,disp:'+10%',muted:true}]},
      {type:'text',t0:13.4,t1:17.0,size:'sm',html:"The market didn't crash. It <span class='accent'>rotated.</span>"},
    ],
    outro:{t0:17.0,kick:'Where the money moved',title:"The UAE's hottest<br>postcodes."} },

  d4:{ acc:'#14b8a6',acc2:'#7fe0d5',deep:'#0f766e',glow:'20,184,166',label:'UAE · Yield Lab',dur:20.0,
    scene:{kind:'skyline'},palette:{},
    scenes:[
      {type:'text',t0:0.0,t1:3.6,kick:'UAE · Yield Lab',html:"Your London flat earns <span class='accent'>3%.</span>"},
      {type:'text',t0:3.6,t1:7.2,size:'sm',html:"A Dubai flat earns <span class='accent'>double.</span>"},
      {type:'bars',t0:7.2,t1:13.2,kick:'Gross rental yield',title:"Dubai vs the world",data:[
        {lbl:'Dubai',v:6.8,disp:'6.8%'},{lbl:'N. York',v:4.2,disp:'4.2%',muted:true},
        {lbl:'London',v:3.4,disp:'3.4%',muted:true},{lbl:"S'pore",v:3.4,disp:'3.4%',muted:true}]},
      {type:'text',t0:13.2,t1:16.8,size:'sm',html:"Prestige doesn't pay rent. <span class='accent'>Cashflow does.</span>"},
    ],
    outro:{t0:16.8,kick:'The real math',title:"Where rent<br>actually pays."} },
};
