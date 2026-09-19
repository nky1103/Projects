// 5-post runway — REELS. Hook-first (frame-0 number, skyline dark) -> surprise
// -> reveal Dubai -> proof (bars) -> implication -> save/comment CTA. Silent.
// All figures verified 2026-09-19. No em dashes. Owl logo + @statupsutra persist.

const AMBER  = { acc:'#f59e0b', acc2:'#fcd34d', deep:'#b45309', glow:'245,158,11' };
const TEAL   = { acc:'#14b8a6', acc2:'#5eead4', deep:'#0f766e', glow:'20,184,166' };
const GREEN  = { acc:'#22c55e', acc2:'#86efac', deep:'#15803d', glow:'34,197,94'  };
const VIOLET = { acc:'#8b5cf6', acc2:'#c4b5fd', deep:'#6d28d9', glow:'139,92,246' };
const ROSE   = { acc:'#f43f5e', acc2:'#fda4af', deep:'#be123c', glow:'244,63,94'  };

module.exports = {

  // ---------- P1 · Builder Watch ----------
  p1: {
    ...AMBER, label:'UAE · Builder Watch', dur:20.0,
    scene:{kind:'skyline'}, palette:{}, reveal:{ at:5.2, dur:1.4 },
    scenes:[
      {type:'bignum',t0:0.0,t1:2.6,size:'sm',kick:'In 2025, one Dubai developer sold',num:'AED 65.8B',subnum:'of property. Just one.'},
      {type:'text',t0:2.6,t1:5.2,size:'sm',html:"That is nearly the <span class='accent'>next two builders combined.</span>"},
      {type:'text',t0:5.2,t1:8.2,size:'sm',html:"In Dubai, <span class='accent'>who you buy from is the asset.</span>"},
      {type:'bars',t0:8.2,t1:14.8,kick:'2025 sales · AED billion',title:'Who is building Dubai',data:[
        {lbl:'Emaar',v:65.8,disp:'65.8'},
        {lbl:'DAMAC',v:35.9,disp:'35.9',muted:true},
        {lbl:'Sobha',v:30,disp:'30.0',muted:true},
        {lbl:'Binghatti',v:26,disp:'26.0',muted:true}]},
      {type:'text',t0:14.8,t1:18.0,size:'sm',html:"Track record <span class='accent'>de-risks an off-plan buy.</span>"},
    ],
    outro:{t0:18.0,kick:'Your move',title:"Who would you<br>buy from?",sub:'Comment the name 👇'}
  },

  // ---------- P2 · Yield Lab ----------
  p2: {
    ...TEAL, label:'UAE · Yield Lab', dur:20.0,
    scene:{kind:'marina'}, palette:{}, reveal:{ at:5.2, dur:1.4 },
    scenes:[
      {type:'bignum',t0:0.0,t1:2.6,size:'sm',kick:'One Dubai zone pays',num:'8.9%',subnum:'gross rental yield.'},
      {type:'bignum',t0:2.6,t1:5.2,size:'sm',kick:'A famous one pays about',num:'5%',subnum:'Same city.'},
      {type:'text',t0:5.2,t1:8.2,size:'sm',html:"Prestige and <span class='accent'>yield are not the same thing.</span>"},
      {type:'bars',t0:8.2,t1:14.8,kick:'Gross rental yield · 2025',title:'Where Dubai actually pays',data:[
        {lbl:'Intl City',v:8.9,disp:'8.9%'},
        {lbl:'JVC',v:7.9,disp:'7.9%'},
        {lbl:'Downtown',v:6.0,disp:'6.0%',muted:true},
        {lbl:'Palm',v:5.0,disp:'5.0%',muted:true}]},
      {type:'text',t0:14.8,t1:18.0,size:'sm',html:"Cash flow lives <span class='accent'>where the hype doesn't.</span>"},
    ],
    outro:{t0:18.0,kick:'Your call',title:"Yield or<br>prestige?",sub:'Comment your pick 👇'}
  },

  // ---------- P3 · Money Moves (Golden Visa) ----------
  p3: {
    ...GREEN, label:'UAE · Money Moves', dur:19.6,
    scene:{kind:'creek'}, palette:{}, reveal:{ at:5.2, dur:1.4 },
    scenes:[
      {type:'bignum',t0:0.0,t1:2.6,size:'sm',kick:'Buy UAE property worth',num:'AED 2M',subnum:'and you unlock this.'},
      {type:'text',t0:2.6,t1:5.2,size:'sm',html:"A <span class='accent'>10-year renewable UAE visa.</span>"},
      {type:'text',t0:5.2,t1:8.2,size:'sm',html:"For you, your <span class='accent'>spouse, kids and parents.</span>"},
      {type:'bignum',t0:8.2,t1:11.4,size:'sm',kick:'And in 2025 they scrapped the',num:'AED 1M',subnum:'minimum down-payment rule.'},
      {type:'text',t0:11.4,t1:14.6,size:'sm',html:"Mortgaged or off-plan, <span class='accent'>you can still qualify.</span>"},
      {type:'text',t0:14.6,t1:17.6,size:'sm',html:"Residency is now <span class='accent'>part of the deal.</span>"},
    ],
    outro:{t0:17.6,kick:'Good to know',title:"Would this<br>move you?",sub:'Comment 👇'}
  },

  // ---------- P4 · World vs Dubai ($1M buys) ----------
  p4: {
    ...VIOLET, label:'UAE · World vs Dubai', dur:20.0,
    scene:{kind:'skyline'}, palette:{}, reveal:{ at:5.2, dur:1.4 },
    scenes:[
      {type:'bignum',t0:0.0,t1:2.6,size:'sm',kick:'In Monaco, $1M buys you',num:'172 ft²',subnum:'A studio. Maybe.'},
      {type:'bignum',t0:2.6,t1:5.2,size:'sm',kick:'The same $1M in Dubai buys',num:'670 ft²'},
      {type:'text',t0:5.2,t1:8.2,size:'sm',html:"Same money. <span class='accent'>Nearly 4x the home.</span>"},
      {type:'bars',t0:8.2,t1:14.8,kick:'What $1M buys · sq ft',title:'Prime space, per $1M',data:[
        {lbl:'Dubai',v:670,disp:'670 ft²'},
        {lbl:'New York',v:365,disp:'365 ft²',muted:true},
        {lbl:'Hong Kong',v:242,disp:'242 ft²',muted:true},
        {lbl:'Monaco',v:172,disp:'172 ft²',muted:true}]},
      {type:'text',t0:14.8,t1:18.0,size:'sm',html:"Dubai is still <span class='accent'>the world's value buy.</span>"},
    ],
    outro:{t0:18.0,kick:'Your move',title:"Where would<br>you buy?",sub:'Comment the city 👇'}
  },

  // ---------- P5 · Price-to-Rent (rent vs buy) ----------
  p5: {
    ...ROSE, label:'UAE · Rent vs Buy', dur:20.0,
    scene:{kind:'marina'}, palette:{}, reveal:{ at:5.2, dur:1.4 },
    scenes:[
      {type:'bignum',t0:0.0,t1:2.6,size:'sm',kick:'In New York, a home costs',num:'22x',subnum:'its annual rent.'},
      {type:'bignum',t0:2.6,t1:5.2,size:'sm',kick:'In Dubai it costs about',num:'15x',subnum:'annual rent.'},
      {type:'text',t0:5.2,t1:8.2,size:'sm',html:"Lower ratio means rent <span class='accent'>pays the home off faster.</span>"},
      {type:'bars',t0:8.2,t1:14.8,kick:'Years of rent to equal the price · lower is better',title:'How fast rent pays back',data:[
        {lbl:'Dubai',v:15,disp:'15x'},
        {lbl:'New York',v:22,disp:'22x',muted:true},
        {lbl:'London',v:27,disp:'27x',muted:true}]},
      {type:'text',t0:14.8,t1:18.0,size:'sm',html:"Dubai rewards owners <span class='accent'>faster than most cities.</span>"},
    ],
    outro:{t0:18.0,kick:'Rent or buy?',title:"Which are<br>you doing?",sub:'Comment 👇'}
  },

};
