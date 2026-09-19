// 5-post runway — CAROUSELS (1080x1350). Share the theme with the reel but show
// DIFFERENT, fuller data. 6 slides each. All figures verified 2026-09-19.

const AMBER  = { acc:'#f59e0b', deep:'#b45309', glow:'245,158,11' };
const TEAL   = { acc:'#14b8a6', deep:'#0f766e', glow:'20,184,166' };
const GREEN  = { acc:'#22c55e', deep:'#15803d', glow:'34,197,94'  };
const VIOLET = { acc:'#8b5cf6', deep:'#6d28d9', glow:'139,92,246' };
const ROSE   = { acc:'#f43f5e', deep:'#be123c', glow:'244,63,94'  };

module.exports = {

  // ---------- P1 · Builder Watch ----------
  p1: { ...AMBER, label:'Builder Watch', slides:[
    {type:'cover',kick:'Builder Watch',size:'sm',title:"One developer sold<br><span class='accent'>AED 65.8B in 2025.</span>",sub:"Dubai's builders, ranked by what they actually sold, and why the name on the contract is the asset."},
    {type:'bignum',kick:'Emaar · 2025 sales value',num:'AED 65.8B',subnum:'from a single developer',note:'That is nearly as much as DAMAC and Sobha sold combined.',src:'Engel & Völkers; DXB Properties (2025)',swipe:true},
    {type:'bars',kick:'2025 sales · AED billion',title:'Who is building Dubai',data:[
      {lbl:'Emaar',v:65.8,disp:'65.8'},
      {lbl:'DAMAC',v:35.9,disp:'35.9',muted:true},
      {lbl:'Sobha',v:30,disp:'30.0',muted:true},
      {lbl:'Binghatti',v:26,disp:'26.0',muted:true}],
      src:'Engel & Völkers; DXB Properties (2025)',swipe:true},
    {type:'bignum',kick:'The volume king',num:'17,061',subnum:'homes sold by Binghatti in 2025',note:'Binghatti led on transaction volume while Emaar led on value. Different developers, different games.',src:'Market data 2025',swipe:true},
    {type:'lesson',tag:'The read',tx:"Value picks the flagship.<br>Volume picks the churn.",note:"A developer's delivery record decides whether your off-plan handover lands on time. Buy the track record, not the render.",swipe:true},
    {type:'cta',title:'Follow for the UAE, decoded daily.',note:'We rank the builders so you buy with numbers, not brochures.',subfollow:'UAE real estate, decoded with data'},
  ]},

  // ---------- P2 · Yield Lab ----------
  p2: { ...TEAL, label:'Yield Lab', slides:[
    {type:'cover',kick:'Yield Lab',size:'sm',title:"Same city.<br><span class='accent'>Nearly double the yield.</span>",sub:"Where Dubai rent actually pays: gross rental yields ranked, and why prestige and cash flow rarely live together."},
    {type:'bignum',kick:'The high end of the range',num:'8.9%',subnum:'gross rental yield, International City',note:'One of the highest gross yields of any Dubai residential zone in 2025.',src:'Bayut; Engel & Völkers (2025)',swipe:true},
    {type:'bars',kick:'Gross rental yield · 2025',title:'Where Dubai actually pays',data:[
      {lbl:'Intl City',v:8.9,disp:'8.9%'},
      {lbl:'JVC',v:7.9,disp:'7.9%'},
      {lbl:'Downtown',v:6.0,disp:'6.0%',muted:true},
      {lbl:'Palm',v:5.0,disp:'5.0%',muted:true}],
      src:'Bayut; Engel & Völkers; Property Finder (2025)',swipe:true},
    {type:'bignum',kick:'The gap',num:'1.8x',subnum:'International City yield vs Palm Jumeirah',note:'Affordable zones throw off more monthly income; prime zones lean on capital growth instead.',src:'Derived from yields above',swipe:true},
    {type:'lesson',tag:'The read',tx:"Prime buys appreciation.<br>Affordable buys cash flow.",note:'Match the zone to your goal. If you need monthly income, chase yield. If you want long-term value, prime still leads on price growth.',swipe:true},
    {type:'cta',title:'Follow for the UAE, decoded daily.',note:'We price the yield so you buy for cash flow, not for the postcode.',subfollow:'UAE real estate, decoded with data'},
  ]},

  // ---------- P3 · Money Moves (Golden Visa) ----------
  p3: { ...GREEN, label:'Money Moves', slides:[
    {type:'cover',kick:'Money Moves',size:'sm',title:"AED 2M in property.<br><span class='accent'>A 10-year visa.</span>",sub:"How Dubai property turns into UAE residency for your whole family, and what quietly changed in 2025."},
    {type:'bignum',kick:'The threshold',num:'AED 2M',subnum:'property value for a 10-year Golden Visa',note:'Completed or off-plan, and it can be mortgaged with a bank NOC.',src:'Dubai Land Department (2025)',swipe:true},
    {type:'bignum',kick:'The 2025 change',num:'AED 1M',subnum:'down-payment minimum, now scrapped',note:'The previously interpreted AED 1M (or 50%) minimum down-payment was removed in 2025. Mortgaged and off-plan buyers can now qualify on the AED 2M value.',src:'DLD; legal guidance (2025)',swipe:true},
    {type:'lesson',tag:'Who it covers',tx:"You, your spouse,<br>children and parents.",note:'One qualifying property can sponsor your whole household. Renewable every 10 years for as long as you hold it.',swipe:true},
    {type:'lesson',tag:'The read',tx:"Residency is now<br>part of the deal.",note:'For a relocating buyer, the visa is part of the return, not a separate hurdle. Price the property and the residency together.',swipe:true},
    {type:'cta',title:'Follow for the UAE, decoded daily.',note:'We track the rules so your money buys more than four walls.',subfollow:'UAE real estate, decoded with data'},
  ]},

  // ---------- P4 · World vs Dubai ($1M buys) ----------
  p4: { ...VIOLET, label:'World vs Dubai', slides:[
    {type:'cover',kick:'World vs Dubai',size:'sm',title:"$1M buys 4x more home<br><span class='accent'>in Dubai.</span>",sub:"What a million dollars gets you in prime real estate across the world's most expensive cities."},
    {type:'bignum',kick:'What $1M buys in Dubai',num:'670 ft²',subnum:'of prime residential space',note:'Roughly four times what the same money buys in Monaco.',src:'Knight Frank Wealth Report 2026',swipe:true},
    {type:'bars',kick:'What $1M buys · sq ft',title:'Prime space, per $1M',data:[
      {lbl:'Dubai',v:670,disp:'670 ft²'},
      {lbl:'New York',v:365,disp:'365 ft²',muted:true},
      {lbl:'Hong Kong',v:242,disp:'242 ft²',muted:true},
      {lbl:'Monaco',v:172,disp:'172 ft²',muted:true}],
      src:'Knight Frank Wealth Report 2026',swipe:true},
    {type:'bignum',kick:'The gap',num:'3.9x',subnum:'more space than Monaco, same $1M',note:'Even after rising about 25% in 2025, prime Dubai still buys more than any of these markets.',src:'Knight Frank (2026); market data',swipe:true},
    {type:'lesson',tag:'The read',tx:"Dubai is still<br>the value play.",note:'Relative value, not just growth. Global money keeps arriving because the space per dollar has no peer among top cities.',swipe:true},
    {type:'cta',title:'Follow for the UAE, decoded daily.',note:'We benchmark Dubai against the world so you see the real value.',subfollow:'UAE real estate, decoded with data'},
  ]},

  // ---------- P5 · Price-to-Rent ----------
  p5: { ...ROSE, label:'Rent vs Buy', slides:[
    {type:'cover',kick:'Rent vs Buy',size:'sm',title:"Dubai pays a home off<br><span class='accent'>faster than New York.</span>",sub:"The price-to-rent math on buying in Dubai versus the world's major cities."},
    {type:'bignum',kick:'Dubai price-to-rent',num:'15x',subnum:'years of rent to equal the price',note:'Among the lowest ratios of any major global city.',src:'Numbeo; Property Finder (2025-26)',swipe:true},
    {type:'bars',kick:'Years of rent to equal price · lower is better',title:'How fast rent pays back',data:[
      {lbl:'Dubai',v:15,disp:'15x'},
      {lbl:'New York',v:22,disp:'22x',muted:true},
      {lbl:'London',v:27,disp:'27x',muted:true}],
      src:'Numbeo; Property Finder (2025-26)',swipe:true},
    {type:'bignum',kick:'By apartment type',num:'16x',subnum:'a Dubai studio, in years of rent',note:'Studios sit near 16x and one-beds near 19x, still well below New York or London.',src:'Property Finder; dataHabibi (2025-26)',swipe:true},
    {type:'lesson',tag:'The read',tx:"Owning pays back<br>faster here.",note:'A lower price-to-rent ratio means rent recovers the purchase price sooner. For a long stay, buying tilts favourable earlier than in most global cities.',swipe:true},
    {type:'cta',title:'Follow for the UAE, decoded daily.',note:'We run the rent-vs-buy math so you decide with numbers.',subfollow:'UAE real estate, decoded with data'},
  ]},

};
